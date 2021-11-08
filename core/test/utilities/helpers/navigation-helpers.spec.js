/* eslint-disable camelcase */
//TODO: make some tests here
const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { AuthHelpers, NavigationHelpers, GenericHelpers, RoutingHelpers } from '../../../src/utilities/helpers';
import { LuigiAuth, LuigiConfig } from '../../../src/core-api';
import { Routing } from '../../../src/services/routing';
import { Navigation } from '../../../src/navigation/services/navigation';

describe('Navigation-helpers', () => {
  describe('isNodeAccessPermitted', () => {
    let permissionCheckerFn;
    beforeEach(() => {
      permissionCheckerFn = sinon.spy();
      sinon.stub(LuigiAuth, 'isAuthorizationEnabled');
      sinon.stub(AuthHelpers, 'isLoggedIn');
      sinon.stub(LuigiConfig, 'getConfigValue');
    });
    afterEach(() => {
      permissionCheckerFn = undefined;
      sinon.restore();
    });

    it('without permissionCheckerFn', () => {
      LuigiConfig.getConfigValue.returns(null);
      assert.isTrue(NavigationHelpers.isNodeAccessPermitted());
    });

    it('logged in, normal anonymousAccess', () => {
      const checkNode = {
        anonymousAccess: true
      };

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(true);

      assert.isTrue(NavigationHelpers.isNodeAccessPermitted(checkNode));
    });

    it('logged out, normal anonymousAccess', () => {
      const checkNode = {
        anonymousAccess: true
      };

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(false);

      assert.isTrue(NavigationHelpers.isNodeAccessPermitted(checkNode));
    });

    it('logged in, exclusive anonymousAccess', () => {
      const checkNode = {
        anonymousAccess: 'exclusive'
      };

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(true);
      LuigiConfig.getConfigValue.returns(permissionCheckerFn);

      assert.isFalse(NavigationHelpers.isNodeAccessPermitted(checkNode));
    });

    it('logged out, exclusive anonymousAccess, without permissionCheckerFn', () => {
      const checkNode = {
        anonymousAccess: 'exclusive'
      };

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(false);
      LuigiConfig.getConfigValue.returns(undefined);

      assert.isTrue(NavigationHelpers.isNodeAccessPermitted(checkNode));
    });

    it('logged out, no anonymousAccess', () => {
      const checkNode = {
        anonymousAccess: false
      };

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(false);

      assert.isFalse(NavigationHelpers.isNodeAccessPermitted(checkNode));
    });

    it('with permissionCheckerFn', () => {
      const checkNode = { viewUrl: 'current' };
      const parentNode = { viewUrl: 'parent' };
      const context = { data: '' };
      const permissionCheckerFn = sinon.stub().returns(true);

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(true);
      LuigiConfig.getConfigValue.returns(permissionCheckerFn);

      assert.isTrue(NavigationHelpers.isNodeAccessPermitted(checkNode, parentNode, context));
      assert(
        permissionCheckerFn.calledWith(checkNode, parentNode, context),
        'permissionCheckerFn called with proper arguments'
      );
    });
  });
  describe('isOpenUIiconName', () => {
    it('should return true for valid icon names', async () => {
      assert.equal(NavigationHelpers.isOpenUIiconName('settings'), true);
      assert.equal(NavigationHelpers.isOpenUIiconName('add-activity-2'), true);
      assert.equal(NavigationHelpers.isOpenUIiconName('back-to-top'), true);
    });

    it('should return false for invalid icon names', async () => {
      assert.equal(NavigationHelpers.isOpenUIiconName('./relative.path'), false);
      assert.equal(NavigationHelpers.isOpenUIiconName('http://niceicons.com/that-one-icon.png'), false);
      assert.equal(NavigationHelpers.isOpenUIiconName('https://google.com'), false);
    });
  });

  describe('getProductSwitcherColumnsNumber', () => {
    beforeEach(() => {
      sinon.stub(LuigiConfig, 'getConfigValue');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return number from config file if columns are defined', () => {
      LuigiConfig.getConfigValue.returns({
        icon: 'grid',
        label: 'Products',
        columns: 3
      });
      const columns = NavigationHelpers.getProductSwitcherColumnsNumber();
      assert.equal(columns, 3);
    });
    it('should return number from config file even if columns are not defined', () => {
      LuigiConfig.getConfigValue.returns({ icon: 'grid', label: 'Products' });
      const columns = NavigationHelpers.getProductSwitcherColumnsNumber();
      assert.equal(columns, 4);
    });
  });

  it('getNodePath', () => {
    const node = {
      parent: {
        pathSegment: 'parent'
      },
      pathSegment: 'pathSegment'
    };
    assert.equal(NavigationHelpers.getNodePath(node), 'parent/pathSegment', 'path should match');
  });

  describe('handleUnresponsiveClient', () => {
    let node;
    beforeEach(() => {
      node = {
        category: 'External Views',
        viewId: 'viewX',
        label: 'This is X',
        viewUrl: 'https://this.is.x/index.html'
      };
      Routing.navigateTo = sinon.spy();
    });
    afterEach(() => {
      sinon.restore();
    });

    it('default redirection', () => {
      // given
      node.errorPageHandler = {
        timeout: 1000
      };
      const defaultPath = '/';

      // when
      NavigationHelpers.handleUnresponsiveClient(node.errorPageHandler);

      // then
      sinon.assert.calledWithExactly(Routing.navigateTo, defaultPath);
    });

    it('redirection to the specified path', async () => {
      // given
      node.errorPageHandler = {
        timeout: 1000,
        redirectPath: '/somewhere'
      };
      const expectedPath = node.errorPageHandler.redirectPath;

      // when
      NavigationHelpers.handleUnresponsiveClient(node.errorPageHandler);

      // then
      sinon.assert.calledWithExactly(Routing.navigateTo, expectedPath);
    });

    it('test when errorFn takes effect', async () => {
      // given
      node.errorPageHandler = {
        timeout: 1000,
        redirectPath: '/somewhere',
        errorFn: sinon.spy()
      };

      // when
      NavigationHelpers.handleUnresponsiveClient(node.errorPageHandler);

      // then
      sinon.assert.calledOnce(node.errorPageHandler.errorFn);
    });
  });

  describe('burger tooltip', () => {
    beforeEach(() => {
      sinon.stub(LuigiConfig, 'getConfigValue');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Burger tooltip with defined collapsed and expanded label', () => {
      LuigiConfig.getConfigValue.returns({
        navExpanded: 'Collapse navigation test',
        navCollapsed: 'Expand navigation test'
      });
      const [collapseLabel, expandLabel] = NavigationHelpers.getBurgerTooltipConfig();
      assert.equal(collapseLabel, 'Expand navigation test');
      assert.equal(expandLabel, 'Collapse navigation test');
    });

    it('Burger tooltip without defining a label, just use boolean', () => {
      LuigiConfig.getConfigValue.returns(true);
      const [collapseLabel, expandLabel] = NavigationHelpers.getBurgerTooltipConfig();
      assert.equal(collapseLabel, 'Expand navigation');
      assert.equal(expandLabel, 'Collapse navigation');
    });
  });

  describe('shouldPreventNavigationForPath', () => {
    afterEach(() => {
      sinon.restore();
      sinon.reset();
    });

    it('returns true when navigation should be prevented for path', async () => {
      sinon.stub(Navigation, 'getNavigationPath').returns('testPreventNavigation');
      sinon.stub(RoutingHelpers, 'getLastNodeObject').returns({
        pathSegment: 'testPreventNavigation',
        label: 'Prevent navigation conditionally',
        onNodeActivation: () => {
          return false;
        }
      });
      const actual = await NavigationHelpers.shouldPreventNavigationForPath('testPreventNavigation');
      assert.equal(actual, true);
    });

    it('returns false when navigation should not be prevented for path', async () => {
      sinon.stub(Navigation, 'getNavigationPath').returns('testNotPreventNavigation');
      sinon.stub(RoutingHelpers, 'getLastNodeObject').returns({
        pathSegment: 'testNotPreventNavigation',
        label: 'Do not prevent navigation conditionally',
        onNodeActivation: () => {
          return true;
        }
      });
      const actual = await NavigationHelpers.shouldPreventNavigationForPath('testNotPreventNavigation');
      assert.equal(actual, false);
    });
  });

  describe('node title data', () => {
    let object;

    beforeEach(() => {
      sinon.stub(LuigiConfig, 'getConfigValue');
      sinon.stub(NavigationHelpers, '_fetch');
      object = {
        some: {
          nested: {
            value: 'value'
          },
          other: {
            key: 'otherkey',
            value: 'othervalue'
          }
        }
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    it('getPropertyChainValue', () => {
      assert.equal(NavigationHelpers.getPropertyChainValue(object, 'some.nested.value'), 'value');
      assert.equal(NavigationHelpers.getPropertyChainValue(object, 'some.nested.value2', 'fallback'), 'fallback');
      assert.equal(NavigationHelpers.getPropertyChainValue(undefined, 'some.nested.value2', 'fallback'), 'fallback');
      assert.equal(NavigationHelpers.getPropertyChainValue(object, undefined, 'fallback'), 'fallback');
      assert.equal(NavigationHelpers.getPropertyChainValue(undefined, undefined, 'fallback'), 'fallback');

      assert.equal(NavigationHelpers.getPropertyChainValue(object, 'some'), object.some);
      assert.equal(NavigationHelpers.getPropertyChainValue(object, '', 'fallback'), 'fallback');
    });

    it('substituteVars', () => {
      const resolver = {
        a: {
          b: {
            value: 'xyz_${some.nested.value}_andbeyond'
          },
          c: {
            '${some.other.key}': 'keyrep_${some.other.value}'
          }
        }
      };
      const subs = NavigationHelpers.substituteVars(resolver, object);
      assert.equal(subs.a.b.value, 'xyz_value_andbeyond');
      assert.equal(subs.a.c.otherkey, 'keyrep_othervalue');
    });

    describe('fetchNodeTitleData', () => {
      const samplenode = {
        context: {
          token: '123456789',
          projectId: 'pr1'
        },
        titleResolver: {
          request: {
            method: 'POST',
            url: 'http://localhost/test',
            headers: {
              authorization: 'Bearer ${token}',
              'content-type': 'application/json'
            },
            body: {
              operationName: 'project',
              query:
                'query project($projectId: ID!) {\n  project(projectId: $projectId) {\n    projectId\n    displayName\n    owner\n    description\n    created\n    __typename\n  }\n}\n',
              variables: {
                projectId: '${projectId}'
              }
            }
          },
          titlePropertyChain: 'data.project.displayName',
          iconPropertyChain: 'data.img',
          prerenderFallback: true,
          titleDecorator: 'decorate %s end',
          fallbackTitle: 'Project',
          fallbackIcon: 'curriculum'
        }
      };

      it('should reject if no titleResolver set', done => {
        NavigationHelpers.fetchNodeTitleData({ titleResolver: undefined }, {})
          .then(() => {
            assert.fail('Should not be here');
          })
          .catch(() => {
            // should fail
            done();
          });
      });

      it('should get data from cache', done => {
        const node = {
          titleResolver: {
            url: 'http://localhost'
          }
        };

        const value = {
          some: 'value'
        };

        node.titleResolver._cache = {
          key: JSON.stringify(node.titleResolver),
          value: value
        };

        NavigationHelpers.fetchNodeTitleData(node, node.context).then(data => {
          assert.equal(data, value);
          done();
        });
      });

      it('should use correct request data and properly process response data', done => {
        const node = JSON.parse(JSON.stringify(samplenode));

        let fetchUrl, fetchOptions;
        NavigationHelpers._fetch.callsFake((url, options) => {
          fetchUrl = url;
          fetchOptions = options;
          return new Promise((resolve, reject) => {
            resolve(
              new Response(JSON.stringify({}), {
                status: 200,
                headers: { 'Content-type': 'application/json' }
              })
            );
          });
        });

        const assertRequestData = () => {
          assert.equal(fetchUrl, 'http://localhost/test');
          assert.equal(fetchOptions.headers.authorization, 'Bearer 123456789');
          assert.equal(JSON.parse(fetchOptions.body).variables.projectId, 'pr1');
        };

        NavigationHelpers.fetchNodeTitleData(node, node.context)
          .then(() => {
            assertRequestData();
            done();
          })
          .catch(e => {
            assertRequestData();
            done();
          });
      });

      it('should process server response correctly', () => {
        const node = JSON.parse(JSON.stringify(samplenode));
        const mockedResponse = {
          data: {
            img: 'imgurl',
            project: {
              displayName: 'display'
            }
          }
        };

        const titleData = NavigationHelpers.processTitleData(mockedResponse, node.titleResolver);
        assert.equal(titleData.icon, 'imgurl');
        assert.equal(titleData.label, 'decorate display end');
      });

      it('should return fallback', () => {
        const node = JSON.parse(JSON.stringify(samplenode));
        const mockedResponse = {};

        const titleData = NavigationHelpers.processTitleData(mockedResponse, node.titleResolver);
        assert.equal(titleData.icon, 'curriculum');
        assert.equal(titleData.label, 'Project');
      });
    });

    describe('groupNodesBy', () => {
      let nodes;
      beforeEach(() => {
        nodes = [
          {
            category: '1',
            pathSegment: 'luigi',
            label: 'luigi',
            viewUrl: '/microfrontend.html'
          },
          {
            pathSegment: 'amfe',
            label: 'a mfe',
            viewUrl: '/microfrontend.html',
            category: { label: 'test' }
          },
          {
            pathSegment: 'amfe',
            label: 'a mfe',
            viewUrl: '/microfrontend.html',
            category: { label: 'luigi' }
          },
          {
            category: 'luigi',
            pathSegment: 'luigi',
            label: 'luigi',
            viewUrl: '/microfrontend.html'
          }
        ];
      });
      it('group nodes by category id', () => {
        nodes[1].category.id = '1';
        nodes[1].category.collapsible = true;
        const result = NavigationHelpers.groupNodesBy(nodes, 'category', true);
        assert.deepEqual(Object.keys(result), ['luigi', 'test']);
        assert.deepEqual(result.luigi['metaInfo'], { label: 'luigi', order: 1 });
        assert.deepEqual(result.test['metaInfo'], {
          label: 'test',
          order: 0,
          id: '1',
          collapsible: true,
          categoryUid: '1'
        });
      });
      it('group nodes by category label', () => {
        nodes[1].category.collapsible = true;
        const result = NavigationHelpers.groupNodesBy(nodes, 'category', true);
        console.log('result ', result.test['metaInfo']);
        assert.deepEqual(Object.keys(result), ['1', 'test', 'luigi']);
        assert.deepEqual(result.test['metaInfo'], { categoryUid: 'test', label: 'test', collapsible: true, order: 1 });
      });
    });
  });
});
