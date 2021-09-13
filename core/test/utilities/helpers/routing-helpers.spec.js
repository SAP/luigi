const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
import { GenericHelpers, RoutingHelpers } from '../../../src/utilities/helpers';
import { LuigiConfig, LuigiFeatureToggles, LuigiI18N, LuigiRouting } from '../../../src/core-api';
import { Routing } from '../../../src/services/routing';
import { config } from '../../../src/core-api/config';

describe('Routing-helpers', () => {
  describe('substituteDynamicParamsInObject', () => {
    let input, input2, paramMap, expectedOutput;
    beforeEach(() => {
      input = {
        key1: 'something',
        key2: ':group'
      };
      input2 = {
        key1: 'something',
        key2: 'sth:group/sth'
      };
      paramMap = {
        group: 'mygroup'
      };

      expectedOutput = {
        key1: 'something',
        key2: 'mygroup'
      };
    });

    it('substitutes an object', () => {
      expect(RoutingHelpers.substituteDynamicParamsInObject(input, paramMap)).to.deep.equal(expectedOutput);
      expect(input.key2).to.equal(':group');
    });
    it('substitutes an object using custom prefix', () => {
      input.key2 = '#group';

      expect(RoutingHelpers.substituteDynamicParamsInObject(input, paramMap, '#')).to.deep.equal(expectedOutput);
      expect(input.key2).to.equal('#group');
    });
    it('does not substitutes an object without contains', () => {
      expect(RoutingHelpers.substituteDynamicParamsInObject(input2, paramMap, undefined, false).key2).to.equal(
        input2.key2
      );
    });
    it('substitutes an object with contains', () => {
      expect(RoutingHelpers.substituteDynamicParamsInObject(input2, paramMap, undefined, true).key2).to.equal(
        'sthmygroup/sth'
      );
    });
  });

  describe('mapPathToNode', () => {
    let node;
    beforeEach(() => {
      node = {
        pathSegment: ':id',
        parent: {
          pathSegment: 'home'
        }
      };
    });
    it('happy path', () => {
      expect(RoutingHelpers.mapPathToNode('/home/234/subpage', node)).to.equal('/home/234');
      expect(RoutingHelpers.mapPathToNode('/home/234/', node)).to.equal('/home/234');
    });
    it('node not an ancestor', () => {
      expect(RoutingHelpers.mapPathToNode('/home2/234/subpage', node)).to.be.undefined;
      expect(RoutingHelpers.mapPathToNode('/home', node)).to.be.undefined;
    });
    it('wrong input corner cases', () => {
      expect(RoutingHelpers.mapPathToNode(undefined, undefined)).to.be.undefined;
      expect(RoutingHelpers.mapPathToNode('/home', undefined)).to.be.undefined;
      expect(RoutingHelpers.mapPathToNode(undefined, node)).to.be.undefined;
    });
  });

  describe('substitute locale variable', () => {
    beforeEach(() => {
      global['sessionStorage'] = {
        getItem: sinon.stub(),
        setItem: sinon.stub()
      };
      sinon.stub(config, 'configChanged');
    });
    afterEach(() => {
      sinon.restore();
    });

    it('substitutes {i18n.currentLocale} variable to current locale', () => {
      sinon.stub(LuigiI18N, '_notifyLocaleChange');
      LuigiI18N.setCurrentLocale('en');
      const viewUrl = '/{i18n.currentLocale}/microfrontend.html';
      const expected = '/en/microfrontend.html';

      expect(RoutingHelpers.substituteViewUrl(viewUrl, {})).to.equal(expected);
    });
  });
  describe('substitute search query params', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('substitutes search query parameter', () => {
      sinon.stub(LuigiRouting, 'getSearchParams').returns({ luigi: 'rocks' });
      const viewUrl = '/microfrontend.html?luigi={routing.queryParams.luigi}';
      const expected = '/microfrontend.html?luigi=rocks';

      expect(RoutingHelpers.substituteViewUrl(viewUrl, {})).to.equal(expected);
    });
    it('substitutes search query parameter', () => {
      sinon.stub(LuigiRouting, 'getSearchParams').returns({ mario: 'rocks' });
      const viewUrl = '/microfrontend.html?luigi={routing.queryParams.luigi}';
      const expected = '/microfrontend.html';

      expect(RoutingHelpers.substituteViewUrl(viewUrl, {})).to.equal(expected);
    });
  });

  describe('defaultChildNodes', () => {
    let mockPathData;
    beforeEach(() => {
      mockPathData = {
        navigationPath: [
          {
            // DOESN'T MATTER
          },
          {
            pathSegment: 'groups',
            children: [
              {
                pathSegment: 'stakeholders',
                viewUrl: '/sampleapp.html#/projects/1/users/groups/stakeholders'
              },
              {
                pathSegment: 'customers',
                viewUrl: '/sampleapp.html#/projects/1/users/groups/customers'
              }
            ]
          }
        ],
        context: {}
      };
    });

    it('should return first child if no defaultChildNode is set', async () => {
      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'stakeholders');
    });

    it('should return child with pathSegment equal to defaultChildNode', async () => {
      mockPathData.navigationPath[1].defaultChildNode = 'customers';

      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'customers');
    });

    it('should return first child if given defaultChildNode does not exist', async () => {
      mockPathData.navigationPath[1].defaultChildNode = 'NOSUCHPATH';

      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'stakeholders');
    });

    it('should return first child asynchronous if no defaultChildNode is set', async () => {
      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'stakeholders');
    });

    it('should return first child that has viewUrl defined', async () => {
      mockPathData.navigationPath = [
        {
          // DOESN'T MATTER
        },
        {
          pathSegment: 'myPath',
          children: [
            {
              pathSegment: 'home',

              label: 'go back'
            },
            {
              pathSegment: 'maskopatol',
              label: 'still no viewUrl'
            },
            {
              pathSegment: 'child',
              label: 'This should be the default child',
              viewUrl: '/sampleapp.html#/myPath/child'
            }
          ]
        }
      ];

      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'child');
    });

    it('should return first child that has externalLink.url defined', async () => {
      mockPathData.navigationPath = [
        {
          // DOESN'T MATTER
        },
        {
          pathSegment: 'myPath',
          children: [
            {
              pathSegment: 'home',

              label: 'go back'
            },
            {
              pathSegment: 'maskopatol',
              label: 'still no viewUrl'
            },
            {
              pathSegment: 'child',
              label: 'This should be the default child',
              externalLink: {
                url: 'https://google.com'
              }
            }
          ]
        }
      ];

      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'child');
    });

    it('should return first node that has pathSegment defined', async () => {
      mockPathData.navigationPath = [
        {
          pathSegment: 'myPath',
          children: [
            {
              pathSegment: 'pathToHome',
              viewUrl: 'http://site.url/home',
              label: 'go back'
            },
            {
              pathSegment: 'maskopatol',
              label: 'still no viewUrl'
            },
            {
              pathSegment: 'child',
              label: 'This should be the default child',
              externalLink: {
                url: 'https://google.com'
              }
            }
          ]
        }
      ];

      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'pathToHome');
    });

    it('should return undefined if at least one of children has no pathsegment defined', async () => {
      mockPathData.navigationPath = [
        {
          pathSegment: 'myPath',
          children: [
            {
              viewUrl: 'http://site.url/home',
              label: 'go back'
            },
            {
              label: 'still no viewUrl'
            },
            {
              label: 'This should be the default child',
              externalLink: {
                url: 'https://google.com'
              }
            }
          ]
        }
      ];
      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), undefined);
    });

    it('should return child that has pathSegment and viewUrl defined', async () => {
      mockPathData.navigationPath = [
        {
          // DOESN'T MATTER
        },
        {
          pathSegment: 'myPath',
          children: [
            {
              pathSegment: 'home',
              viewUrl: 'http://site.url/home',
              label: 'go back'
            },
            {
              pathSegment: 'maskopatol',
              label: 'still no viewUrl'
            },
            {
              pathSegment: 'child',
              label: 'This should be the default child',
              externalLink: {
                url: 'https://google.com'
              }
            }
          ]
        }
      ];

      assert.equal(await RoutingHelpers.getDefaultChildNode(mockPathData), 'home');
    });
  });

  describe('applyPathParams', () => {
    it('empty path should not fail', () => {
      expect(RoutingHelpers.applyPathParams('', {})).to.equal('');
    });
    it('replace two parameters', () => {
      expect(
        RoutingHelpers.applyPathParams('/projects/:project/details/:entry', {
          project: 'pr1',
          entry: 'e23'
        })
      ).to.equal('/projects/pr1/details/e23');
    });
  });

  describe('buildRoute', () => {
    const node = {
      pathSegment: 'one',
      parent: {
        pathSegment: 'projects',
        parent: {
          pathSegment: 'home'
        }
      }
    };
    it('without params', () => {
      assert.equal(RoutingHelpers.buildRoute(node, '/' + node.pathSegment), '/home/projects/one');
    });
    it('with params', () => {
      const params = 'sort=desc&filter=false';
      assert.equal(RoutingHelpers.buildRoute(node, '/' + node.pathSegment, params), '/home/projects/one?' + params);
    });
  });
  describe('getRouteLink', () => {
    beforeEach(() => {
      sinon.stub(LuigiConfig, 'getConfigBooleanValue');
      sinon.stub(Routing, 'buildFromRelativePath');
      sinon.stub(RoutingHelpers, 'buildRoute');
      sinon.stub(GenericHelpers, 'replaceVars');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('externalLink', () => {
      const expected = { url: 'https://luigi-project.io' };
      const given = {
        externalLink: expected,
        link: 'something',
        pathSegment: 'something-else'
      };

      assert.equal(RoutingHelpers.getRouteLink(given), expected);
    });
    it('when it starts with /', () => {
      const expected = '/projects';
      const given = {
        link: expected,
        pathSegment: 'something-else'
      };

      assert.equal(RoutingHelpers.getRouteLink(given), expected);
      sinon.assert.notCalled(Routing.buildFromRelativePath);
    });
    it('calls build function for relative links', () => {
      const given = {
        link: 'projects',
        pathSegment: 'something-else'
      };
      Routing.buildFromRelativePath.returns(`/${given.link}`);

      assert.equal(RoutingHelpers.getRouteLink(given), '/projects');
      sinon.assert.calledWith(Routing.buildFromRelativePath, given);
    });
    it('on pathSegment calls getRoute and replaceVars', () => {
      const expected = '/projects/something-else';
      const given = {
        pathSegment: 'something-else'
      };

      RoutingHelpers.buildRoute.returns(expected);
      GenericHelpers.replaceVars.returns(expected);

      assert.equal(RoutingHelpers.getRouteLink(given), expected);

      sinon.assert.notCalled(Routing.buildFromRelativePath);
      sinon.assert.calledWith(RoutingHelpers.buildRoute, given, '/' + given.pathSegment);
      sinon.assert.calledWith(GenericHelpers.replaceVars, expected, undefined, ':', false);
    });
  });
  describe('getNodeHref', () => {
    beforeEach(() => {
      sinon.stub(LuigiConfig, 'getConfigBooleanValue');
      sinon.stub(RoutingHelpers, 'getRouteLink');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('js:void on falsy config value', () => {
      LuigiConfig.getConfigBooleanValue.returns(false);

      expect(RoutingHelpers.getNodeHref({}, {})).to.equal('javascript:void(0)');
      sinon.assert.notCalled(RoutingHelpers.getRouteLink);
      sinon.assert.calledWith(LuigiConfig.getConfigBooleanValue, 'navigation.addNavHrefs');
    });
    it('returns valid link on url object', () => {
      LuigiConfig.getConfigBooleanValue.returns(true);
      RoutingHelpers.getRouteLink.returns({ url: '/test' });
      expect(RoutingHelpers.getNodeHref({ pathSegment: 'test' }, {})).to.equal('/test');
      sinon.assert.calledOnce(RoutingHelpers.getRouteLink);
    });
    it('returns valid link on string received', () => {
      LuigiConfig.getConfigBooleanValue.returns(true);
      RoutingHelpers.getRouteLink.returns('/test');
      expect(RoutingHelpers.getNodeHref({ pathSegment: 'test' }, {})).to.equal('/test');
      sinon.assert.calledOnce(RoutingHelpers.getRouteLink);
    });
  });
  describe('getLastNodeObject', () => {
    let mockPathData;

    it('return last node of navigationPath', () => {
      mockPathData = {
        navigationPath: [
          {
            pathSegment: 'project1'
          },
          {
            pathSegment: 'project2'
          },
          {
            pathSegment: 'project3'
          }
        ]
      };
      assert.deepEqual(RoutingHelpers.getLastNodeObject(mockPathData), {
        pathSegment: 'project3'
      });
    });

    it('should not fail on empty navigationPath', () => {
      mockPathData = {
        navigationPath: []
      };
      expect(RoutingHelpers.getLastNodeObject(mockPathData)).to.deep.equal({});
    });
  });

  describe('parseParams', () => {
    let mockParams;

    it('return pairs of params', () => {
      mockParams = 'test=true&foo=bar';
      assert.deepEqual(RoutingHelpers.parseParams(mockParams), {
        test: 'true',
        foo: 'bar'
      });
    });

    it('should not fail on empty params', () => {
      mockParams = '';
      expect(RoutingHelpers.parseParams(mockParams)).to.deep.equal({});
    });
  });

  describe('findViewGroup', () => {
    const noViewGroupInNode = {
      link: 'child-node',
      parent: {
        pathSegment: 'parent-node'
      }
    };

    const viewGroupInNode = {
      link: 'child-node',
      viewGroup: 'tets 1',
      parent: {
        pathSegment: 'parent-node'
      }
    };

    const viewGroupInNodeParent = {
      link: 'child-node',
      parent: {
        pathSegment: 'parent-node',
        viewGroup: 'tets 1-1'
      }
    };

    const viewGroupInParentOfNodeParent = {
      link: 'child-node',
      parent: {
        pathSegment: 'parent-node',
        parent: {
          pathSegment: 'parent-parent-node',
          viewGroup: 'tets 1-1-1'
        }
      }
    };

    it('return viewGroup from node', () => {
      assert.deepEqual(RoutingHelpers.findViewGroup(viewGroupInNode), 'tets 1');
    });

    it('return viewGroup from node.parent', () => {
      assert.deepEqual(RoutingHelpers.findViewGroup(viewGroupInNodeParent), 'tets 1-1');
    });

    it('return viewGroup from parent at node.parent', () => {
      assert.deepEqual(RoutingHelpers.findViewGroup(viewGroupInParentOfNodeParent), 'tets 1-1-1');
    });

    it('return undefined if viewGroup is not inside node', () => {
      assert.deepEqual(RoutingHelpers.findViewGroup(noViewGroupInNode), undefined);
    });
  });
  describe('set feature toggle from url', () => {
    beforeEach(() => {
      sinon.stub(LuigiFeatureToggles, 'setFeatureToggle');
    });
    afterEach(() => {
      sinon.restore();
    });
    let mockPath = '/projects/pr1/settings?ft=test';
    it('setFeatureToggle will be called', () => {
      RoutingHelpers.setFeatureToggles('ft', mockPath);
      sinon.assert.calledWith(LuigiFeatureToggles.setFeatureToggle, 'test');
    });
    it('setFeatureToggle will be called with two featureToggles', () => {
      mockPath = '/projects/pr1/settings?ft=test,test2';
      RoutingHelpers.setFeatureToggles('ft', mockPath);
      sinon.assert.calledWith(LuigiFeatureToggles.setFeatureToggle, 'test');
      sinon.assert.calledWith(LuigiFeatureToggles.setFeatureToggle, 'test2');
    });
    it("setFeatureToggle won't be called with wrong queryParam name", () => {
      RoutingHelpers.setFeatureToggles('fft', mockPath);
      sinon.assert.notCalled(LuigiFeatureToggles.setFeatureToggle);
    });
  });

  it('getHashQueryParamSeparator', () => {
    assert.equal(RoutingHelpers.getHashQueryParamSeparator(), '?');
  });

  describe('getModalViewParamName', () => {
    beforeEach(() => {
      sinon.stub(LuigiConfig, 'getConfigValue');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('without config value', () => {
      assert.equal(RoutingHelpers.getModalViewParamName(), 'modal');
    });
    it('without config value', () => {
      LuigiConfig.getConfigValue.returns('custom');
      assert.equal(RoutingHelpers.getModalViewParamName(), 'custom');
    });
  });

  describe('getModalPathFromPath & getModalParamsFromPath', () => {
    beforeEach(() => {
      sinon.stub(RoutingHelpers, 'getModalViewParamName').returns('modal');
      sinon.stub(RoutingHelpers, 'getQueryParams');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('without modal param', () => {
      RoutingHelpers.getQueryParams.returns({});
      assert.equal(RoutingHelpers.getModalPathFromPath('/path/one'), null);
    });
    it('with modal', () => {
      const allQueryParams = {
        modal: '%2Fhome%2Fchild-2'
      };
      RoutingHelpers.getQueryParams.returns(allQueryParams);
      assert.equal(RoutingHelpers.getModalPathFromPath('defined through stub'), '/home/child-2');
    });
    it('with modal params', () => {
      const allQueryParams = {
        modal: '%2Fhome%2Fchild-2',
        modalParams: '%7B%22title%22%3A%22Real%20Child%22%7D'
      };
      RoutingHelpers.getQueryParams.returns(allQueryParams);
      assert.equal(RoutingHelpers.getModalPathFromPath('defined through stub'), '/home/child-2');
      assert.deepEqual(RoutingHelpers.getModalParamsFromPath('defined through stub'), { title: 'Real Child' });
    });
    it('with custom modal param name', () => {
      const allQueryParams = {
        custom: '%2Fhome%2Fchild-2',
        customParams: '%7B%22title%22%3A%22Real%20Child%22%7D'
      };
      RoutingHelpers.getModalViewParamName.returns('custom');
      RoutingHelpers.getQueryParams.returns(allQueryParams);

      assert.equal(RoutingHelpers.getModalPathFromPath('defined through stub'), '/home/child-2');
      assert.deepEqual(RoutingHelpers.getModalParamsFromPath('defined through stub'), { title: 'Real Child' });
    });
  });

  describe('encodeParams', () => {
    it('empty params', () => {
      assert.equal(RoutingHelpers.encodeParams({}), '');
    });
    it('simple params', () => {
      assert.equal(
        RoutingHelpers.encodeParams({
          one: 'eins',
          two: 'zwei'
        }),
        'one=eins&two=zwei'
      );
    });
    it('advanced params', () => {
      assert.equal(
        RoutingHelpers.encodeParams({
          ['a-key']: JSON.stringify({ key: 'value' })
        }),
        'a-key=%7B%22key%22%3A%22value%22%7D'
      );
    });
  });

  describe('Handle core search params from client', () => {
    let currentNode;
    beforeEach(() => {
      currentNode = {
        clientPermissions: {
          urlParameters: {
            luigi: {
              read: true,
              write: true
            }
          }
        }
      };
      sinon.stub(LuigiRouting, 'getSearchParams').returns({ luigi: 'rocks', test: 'tets' });
      LuigiRouting.addSearchParams = sinon.spy();
      console.warn = sinon.spy();
    });
    afterEach(() => {
      sinon.restore();
      sinon.reset();
    });
    it('Client can read allowed search param', () => {
      assert.deepEqual(RoutingHelpers.prepareSearchParamsForClient(currentNode), { luigi: 'rocks' });
    });
    it('Client can write allowed search params', () => {
      RoutingHelpers.addSearchParamsFromClient(currentNode, { luigi: 'rocks', test: 'tets' });
      sinon.assert.calledWith(LuigiRouting.addSearchParams, { luigi: 'rocks' });
    });
    it('Client can not read luigi url parameter', () => {
      currentNode.clientPermissions.urlParameters.luigi.read = false;
      assert.deepEqual(RoutingHelpers.prepareSearchParamsForClient(currentNode), {});
    });
    it('Client can not write luigi url parameter', () => {
      currentNode.clientPermissions.urlParameters.luigi.write = false;
      RoutingHelpers.addSearchParamsFromClient(currentNode, { luigi: 'rocks', test: 'tets' });
      sinon.assert.calledWith(console.warn, 'No permission to add "luigi" to the url');
    });
    it('Client can only write specific url parameter', () => {
      currentNode.clientPermissions.urlParameters = {
        test: {
          write: true,
          read: true
        },
        luigi: {
          write: false,
          read: false
        }
      };
      RoutingHelpers.addSearchParamsFromClient(currentNode, { luigi: 'rocks', test: 'tets' });
      sinon.assert.calledWith(LuigiRouting.addSearchParams, { test: 'tets' });
      sinon.assert.calledWith(console.warn, 'No permission to add "luigi" to the url');
    });
  });
});
