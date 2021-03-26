const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { Routing } from '../../src/services/routing';
import { GenericHelpers, RoutingHelpers } from '../../src/utilities/helpers';
import { LuigiConfig, LuigiI18N, LuigiNavigation } from '../../src/core-api';
import { Navigation } from '../../src/navigation/services/navigation';
import { NodeDataManagementStorage } from '../../src/services/node-data-management';
import { Iframe, ViewUrlDecorator } from '../../src/services';

describe('Routing', function() {
  this.retries(1);

  let component;
  beforeEach(() => {
    sinon.spy(window, 'dispatchEvent');
    let lastObj = {};
    component = {
      set: obj => {
        Object.assign(lastObj, obj);
      },
      get: () => lastObj,
      shouldShowUnsavedChangesModal: () => false
    };

    sinon.stub(LuigiConfig, 'getConfigValue');
    sinon.stub(GenericHelpers, 'getRandomId').returns('123');
    Navigation._rootNodeProviderUsed = undefined;
    Navigation.rootNode = undefined;

    sinon.stub(ViewUrlDecorator);
    ViewUrlDecorator.applyDecorators.callsFake(url => url);
  });
  afterEach(() => {
    if (document.createElement.restore) {
      document.createElement.restore();
    }
    sinon.restore();
    NodeDataManagementStorage.deleteCache();
    // sinon.reset();
  });

  describe('getNodePath()', () => {
    let node;
    let params;
    beforeEach(() => {
      node = {
        pathSegment: 'projects',
        label: 'AAA',
        viewUrl: '/aaa.html'
      };
      params = '~test=true&foo=bar';
    });

    it('should not fail if node is not defined', () => {
      node = undefined;
      const result = Routing.getNodePath(node, params);
      assert.equal(result, '');
    });

    it('should not fail if params are not defined', () => {
      params = undefined;
      const result = Routing.getNodePath(node, params);
      assert.equal(result, '/projects');
    });

    it('returns node path', () => {
      const result = Routing.getNodePath(node, params);
      assert.equal(result, '/projects?~test=true&foo=bar');
    });
  });

  describe('navigateTo', () => {
    beforeEach(() => {
      window.history.replaceState = sinon.spy();
      window.history.pushState = sinon.spy();
      window.dispatchEvent = sinon.spy();
      sinon.stub(Navigation, 'extractDataFromPath').returns({});
      sinon.stub(Navigation, 'shouldPreventNavigation').returns(false);
      sinon.stub(Routing, 'getWindowPath');
      sinon.stub(GenericHelpers, 'trimLeadingSlash').returnsArg(0);
      sinon.stub(GenericHelpers, 'isIE').returns(false);
    });

    it('with path routing, does a browser history replace', async () => {
      // given
      const path = '/projects/teams';

      // when
      await Routing.navigateTo(path, false);

      // then
      sinon.assert.calledWithExactly(
        window.history.replaceState,
        { path },
        '',
        path
      );
      sinon.assert.notCalled(window.history.pushState);
    });

    it('should dispatch an event', async () => {
      // given
      LuigiConfig.getConfigValue.returns(false);

      // when
      await Routing.navigateTo('/projects');

      // then
      sinon.assert.calledWithExactly(
        window.dispatchEvent,
        new CustomEvent('popstate')
      );
    });
  });

  describe('getIntentObject()', () => {
    beforeEach(() => {
      LuigiConfig.getConfigValue.restore();
      sinon
        .stub(LuigiConfig, 'getConfigValue')
        .withArgs('navigation.intentMapping')
        .returns([
          {
            semanticObject: 'Sales',
            action: 'settings',
            pathSegment: '/projects/pr2/settings'
          }
        ]);
    });

    it('returns intentObject from provided intent link with params', () => {
      const actual = RoutingHelpers.getIntentObject(
        '#?intent=Sales-settings?param1=luigi&param2=mario'
      );
      const expected = {
        semanticObject: 'Sales',
        action: 'settings',
        params: [{ param1: 'luigi' }, { param2: 'mario' }]
      };
      assert.deepEqual(actual, expected);
    });

    it('returns intentObject from provided intent link without params', () => {
      const actual = RoutingHelpers.getIntentObject('#?intent=Sales-settings');
      const expected = {
        semanticObject: 'Sales',
        action: 'settings',
        params: undefined
      };
      assert.deepEqual(actual, expected);
    });

    it('falsy intentObject from provided intent link with illegal characters', () => {
      const actual = RoutingHelpers.getIntentObject(
        '#?intent=Sales-$et$$tings'
      );
      assert.isNotOk(actual);
    });
  });

  describe('getIntentPath()', () => {
    beforeEach(() => {
      LuigiConfig.getConfigValue.restore();
      sinon
        .stub(LuigiConfig, 'getConfigValue')
        .withArgs('navigation.intentMapping')
        .returns([
          {
            semanticObject: 'Sales',
            action: 'settings',
            pathSegment: '/projects/pr2/settings'
          }
        ]);
    });

    it('checks intent path parsing with illegal characters', () => {
      const actual = RoutingHelpers.getIntentPath(
        '#?intent=Sa#les-sett!@ings?param1=luigi&param2=mario'
      );
      assert.isNotOk(actual);
    });

    it('checks intent path parsing with illegal hyphen character', () => {
      const actual = RoutingHelpers.getIntentPath(
        '#?intent=Sa-les-sett-ings?param1=luigi&param2=mario'
      );
      assert.isNotOk(actual);
    });

    it('returns path from provided intent link without params', () => {
      const actual = RoutingHelpers.getIntentPath('#?intent=Sales-settings');
      const expected = '/projects/pr2/settings';
      assert.equal(actual, expected);
    });

    it('returns path from provided intent link with params', () => {
      const actual = RoutingHelpers.getIntentPath(
        '#?intent=Sales-settings?param1=hello&param2=world'
      );
      const expected = '/projects/pr2/settings?~param1=hello&~param2=world';
      assert.equal(actual, expected);
    });

    it('returns path from intent link with params and case insensitive start pattern ', () => {
      const actual = RoutingHelpers.getIntentPath(
        '#?iNteNT=Sales-settings?param1=hello&param2=world'
      );
      const expected = '/projects/pr2/settings?~param1=hello&~param2=world';
      assert.equal(actual, expected);
    });
  });

  describe('getHashPath()', () => {
    beforeEach(() => {
      LuigiConfig.getConfigValue.restore();
      sinon
        .stub(LuigiConfig, 'getConfigValue')
        .withArgs('navigation.intentMapping')
        .returns([
          {
            semanticObject: 'Sales',
            action: 'settings',
            pathSegment: '/projects/pr2/settings'
          }
        ]);
    });
    it('returns hash path from default param', () => {
      window.location.hash = '#/projects/pr3';
      const actual = Routing.getHashPath();
      const expected = 'projects/pr3';
      assert.equal(actual, expected);
    });

    it('returns hash path from provided input param', () => {
      const actual = Routing.getHashPath('my-url#/projects/pr3');
      const expected = 'projects/pr3';
      assert.equal(actual, expected);
    });

    it('returns path from provided intent link with params', () => {
      const actual = Routing.getHashPath(
        '#?intent=Sales-settings?param1=luigi&param2=mario'
      );
      const expected = '/projects/pr2/settings?~param1=luigi&~param2=mario';
      assert.equal(actual, expected);
    });

    it('returns path from provided intent link without params', () => {
      const actual = Routing.getHashPath('#?intent=Sales-settings');
      const expected = '/projects/pr2/settings';
      assert.equal(actual, expected);
    });

    it('returns path from provided intent link with case insensitive starting pattern', () => {
      const actual = Routing.getHashPath('#?iNteNT=Sales-settings');
      const expected = '/projects/pr2/settings';
      assert.equal(actual, expected);
    });
  });

  describe('buildFromRelativePath', () => {
    const nodeWithParent = {
      link: 'child-node',
      parent: {
        pathSegment: 'parent-node'
      }
    };

    const nodeWithLink = {
      link: '../..'
    };

    it('should return proper route', () => {
      // given
      const expectedRoute = '/parent-node/child-node';
      LuigiConfig.getConfigValue.returns(true);

      // when
      window.location.hash = '/parent-node';
      const route = Routing.buildFromRelativePath(nodeWithParent);

      // then
      assert.equal(route, expectedRoute);
    });

    it('should return proper normalized route from link ', () => {
      // given
      const expectedRoute = '/parent-node/';
      LuigiConfig.getConfigValue.returns(true);

      // when
      window.location.hash = '/parent-node/a/b';
      const route = Routing.buildFromRelativePath(nodeWithLink);

      // then
      assert.equal(route, expectedRoute);
    });

    it("should return proper route even if it's relative to a different node in the tree than the current one", () => {
      // given
      const expectedRoute = '/parent-node/child-node';
      LuigiConfig.getConfigValue.returns(true);

      // when
      window.location.hash = '/parent-node/different-node';
      const route = Routing.buildFromRelativePath(nodeWithParent);

      // then
      assert.equal(route, expectedRoute);
    });
  });

  describe('handleRouteChange', () => {
    let currentLuigiConfig = {};
    let config;

    beforeEach(() => {
      sinon.stub(Iframe, 'setOkResponseHandler');
      const sampleLuigiConfig = {
        navigation: {
          nodes: () => [
            {
              pathSegment: 'projects',
              label: 'AAA',
              viewUrl: '/aaa.html',
              children: [
                {
                  pathSegment: 'a1',
                  context: {
                    varA1: 'maskopatol'
                  },
                  style: {
                    display: null
                  },
                  viewUrl: '/{context.varA1}/a1.html#p={nodeParams.param1}'
                },
                {
                  pathSegment: 'a2',
                  style: {
                    display: null
                  },
                  viewUrl: '{context.varA2}/a2.html#p={nodeParams.param2}'
                },
                {
                  pathSegment: 'teams',
                  defaultChildNode: 't2',
                  children: [
                    {
                      pathSegment: 't1',
                      style: {
                        display: null
                      },
                      viewUrl: '/t1.html'
                    },
                    {
                      pathSegment: 't2',
                      style: {
                        display: null
                      },
                      viewUrl: '/t2.html'
                    }
                  ],
                  style: {}
                },
                {
                  pathSegment: 'categories',
                  children: [
                    {
                      pathSegment: ':category',
                      viewUrl: '/cats/:category#details',
                      children: [
                        {
                          pathSegment: ':sub',
                          viewUrl: '/cats/:category/:sub',
                          style: {}
                        }
                      ]
                    }
                  ],
                  style: {}
                }
              ],
              removeChild: sinon.spy(),
              context: {
                varA: 'tets'
              },
              loadingIndicator: {},
              hideSideNav: true,
              prepend: sinon.spy(),
              insertBefore: sinon.spy()
            }
          ]
        },
        settings: {
          hideNavigation: false
        }
      };
      window.Luigi = { config: currentLuigiConfig };
      currentLuigiConfig = Object.assign({}, sampleLuigiConfig);
      LuigiConfig.config = currentLuigiConfig;
      config = {
        iframe: null,
        builderCompatibilityMode: false,
        navigateOk: null
      };
      sinon.stub(Routing, 'navigateTo');
      sinon
        .stub(GenericHelpers, 'isElementVisible')
        .callsFake(element => element);
    });

    it('should set component data with hash path', async () => {
      // given
      const path = '#/projects';
      const expectedViewUrl = '/aaa.html';

      // when
      sinon.stub(document, 'createElement').callsFake(() => ({ src: null }));
      await Routing.handleRouteChange(
        path,
        component,
        currentLuigiConfig.navigation.nodes()[0],
        config
      );

      // then
      assert.equal(component.get().viewUrl, expectedViewUrl);
      assert.equal(
        component.get().hideNav,
        LuigiConfig.config.settings.hideNavigation
      );
      assert.equal(component.get().showLoadingIndicator, true);
    });

    it('should set component data with hash path using disabled loadingIndicator', async () => {
      // given
      const path = '#/projects';
      const expectedViewUrl = '/aaa.html';

      // adjust some properties for this test
      const allNodes = currentLuigiConfig.navigation.nodes();
      allNodes[0].loadingIndicator = {
        enabled: false
      };
      currentLuigiConfig.navigation.nodes = () => allNodes;

      // when
      sinon.stub(document, 'createElement').callsFake(() => ({ src: null }));
      await Routing.handleRouteChange(
        path,
        component,
        currentLuigiConfig.navigation.nodes()[0],
        config
      );

      // then
      assert.equal(component.get().viewUrl, expectedViewUrl);
      assert.equal(component.get().showLoadingIndicator, false);
    });

    it('should set component data without hash path', async () => {
      // given
      const path = '#/projects';
      const expectedViewUrl = '/aaa.html';

      let savedObj = {};
      const componentSaved = {
        set: obj => {
          savedObj = GenericHelpers.deepMerge(savedObj, obj);
          componentSaved.get = () => {
            return savedObj;
          };
        },
        shouldShowUnsavedChangesModal: () => false
      };

      const preservedViews = [
        {
          path: 'sample.html#!/one',
          nextPath: 'sample.html#!/two',
          context: {}
        }
      ];
      componentSaved.set({ preservedViews });

      // when
      const docMock = sinon.mock(document);
      docMock
        .expects('createElement')
        .returns({ src: null })
        .once();

      await Routing.handleRouteChange(
        path,
        componentSaved,
        currentLuigiConfig.navigation.nodes()[0],
        config
      );

      // then
      assert.equal(componentSaved.get().viewUrl, expectedViewUrl);
      assert.equal(
        componentSaved.get().hideNav,
        LuigiConfig.config.settings.hideNavigation
      );

      assert.equal(componentSaved.get().preservedViews.length, 1);
      docMock.restore();
      docMock.verify();
    });

    it('should set component data with hash path and node params', async () => {
      // given
      const path = '#/projects/a1?~param1=tets';
      const expectedViewUrl = '/{context.varA1}/a1.html#p={nodeParams.param1}';
      const expectedProcessedViewUrl = '/maskopatol/a1.html#p=tets';

      // when
      const iframeMock = { src: null };
      sinon.stub(document, 'createElement').callsFake(() => iframeMock);
      await Routing.handleRouteChange(
        path,
        component,
        currentLuigiConfig.navigation.nodes()[0],
        config
      );

      // then
      assert.equal(component.get().viewUrl, expectedViewUrl);
      assert.equal(iframeMock.src, expectedProcessedViewUrl);
      assert.equal(
        component.get().hideNav,
        LuigiConfig.config.settings.hideNavigation
      );
    });

    it('should set component data with hash path and clear unused context/node params', async () => {
      // given
      const path = '#/projects/a2?~param1=tets';
      const expectedViewUrl = '{context.varA2}/a2.html#p={nodeParams.param2}';
      const expectedProcessedViewUrl = '/a2.html#p=';

      // when
      const iframeMock = { src: null };
      sinon.stub(document, 'createElement').callsFake(() => iframeMock);
      await Routing.handleRouteChange(
        path,
        component,
        currentLuigiConfig.navigation.nodes()[0],
        config
      );

      // then
      assert.equal(component.get().viewUrl, expectedViewUrl);
      assert.equal(iframeMock.src, expectedProcessedViewUrl);
      assert.equal(
        component.get().hideNav,
        LuigiConfig.config.settings.hideNavigation
      );
    });

    it('should set component data with path param', async () => {
      // given
      const path = '#/projects/categories/cat1';
      const expectedViewUrl = '/cats/cat1#details';

      // when
      const iframeMock = { src: null };
      sinon.stub(document, 'createElement').callsFake(() => iframeMock);
      await Routing.handleRouteChange(
        path,
        component,
        currentLuigiConfig.navigation.nodes()[0],
        config
      );

      // then
      assert.equal(iframeMock.src, expectedViewUrl);
      assert.equal(
        component.get().hideNav,
        window.Luigi.config.settings.hideNavigation
      );
    });

    it('should set component data with multiple path params', async () => {
      // given
      const path = '#/projects/categories/cat1/sub23';
      const expectedViewUrl = '/cats/cat1/sub23';

      // when
      const iframeMock = { src: null };
      sinon.stub(document, 'createElement').callsFake(() => iframeMock);
      await Routing.handleRouteChange(
        path,
        component,
        currentLuigiConfig.navigation.nodes()[0],
        config
      );

      // then
      assert.equal(iframeMock.src, expectedViewUrl);
      assert.equal(
        component.get().hideNav,
        window.Luigi.config.settings.hideNavigation
      );
    });

    it('should get DefaultChildNode if viewUrl is not defined', async () => {
      // given
      const path = '#/projects/teams';
      const expectedPath = '/projects/teams/t2';
      component.shouldShowUnsavedChangesModal = () => false;
      const node = {};

      // when
      LuigiConfig.config.navigation.hideNav = false;
      await Routing.handleRouteChange(path, component, node, config);

      // then
      sinon.assert.calledWithExactly(Routing.navigateTo, expectedPath, false);
    });

    it("should set component's 'hideSideNav' property ", async () => {
      // given
      const path = '#/projects';
      //when
      const node = { insertBefore: sinon.spy(), children: [] };
      sinon.stub(document, 'querySelectorAll').callsFake(() => node);

      //then
      assert.equal(component.get().hideSideNav, undefined);

      await Routing.handleRouteChange(path, component, node, config);

      assert.equal(component.get().hideSideNav, true);
    });
  });

  describe('handleRouteClick', () => {
    const nodeWithParent = {
      pathSegment: 'project-one',
      parent: {
        pathSegment: 'projects'
      }
    };
    const nodeWithoutParent = {
      pathSegment: 'projects'
    };

    beforeEach(() => {
      sinon.stub(Navigation, 'extractDataFromPath').returns({});
      sinon.stub(Navigation, 'shouldPreventNavigation').returns(false);
      sinon.stub(Routing, 'navigateTo');
    });

    it('node with parent, navigation to proper route', () => {
      // given
      const expectedRoute = '/projects/project-one';
      LuigiConfig.getConfigValue.returns(true);

      // when
      Routing.handleRouteClick(nodeWithParent, component);

      // then
      sinon.assert.calledWithExactly(Routing.navigateTo, expectedRoute);
    });

    it('node without parent, navigation to proper route', () => {
      // given
      const expectedRoute = '/projects';
      LuigiConfig.getConfigValue.returns(true);

      // when
      Routing.handleRouteClick(nodeWithoutParent, component);

      // then
      sinon.assert.calledWithExactly(Routing.navigateTo, expectedRoute);
    });

    it('should consume link with absolute path', () => {
      // given
      const expectedRoute = '/projects';
      const inputNode = {
        link: '/projects'
      };

      // when
      Routing.handleRouteClick(inputNode, component);

      // then
      sinon.assert.calledWithExactly(Routing.navigateTo, expectedRoute);
    });

    it('should consume link with relative path', () => {
      // given
      const expectedRoute = 'path-built-from-relative';
      const inputNode = {
        link: 'projects'
      };
      sinon.stub(Routing, 'buildFromRelativePath').returns(expectedRoute);

      // when
      Routing.handleRouteClick(inputNode, component);

      // then
      sinon.assert.calledOnce(Routing.buildFromRelativePath);
      sinon.assert.calledWithExactly(Routing.navigateTo, expectedRoute);
    });
  });

  describe('getModifiedPathname()', () => {
    beforeEach(() => {
      LuigiConfig.getConfigValue.restore();
      sinon
        .stub(LuigiConfig, 'getConfigValue')
        .withArgs('navigation.intentMapping')
        .returns([
          {
            semanticObject: 'Sales',
            action: 'settings',
            pathSegment: '/projects/pr2/settings'
          }
        ]);
    });

    it('without state, falls back to location', () => {
      const mockPathName = 'projects';
      sinon.stub(window.history, 'state').returns(null);
      sinon.stub(window, 'location').value({
        pathname: '/' + mockPathName
      });
      assert.equal(Routing.getModifiedPathname(), mockPathName);
    });

    it('with state path', () => {
      sinon.stub(window.history, 'state').value({
        path: '/this/is/some/'
      });
      assert.equal(Routing.getModifiedPathname(), 'this/is/some/');
    });

    it('from intent based link with params', () => {
      window.location.hash =
        '#?intent=Sales-settings?param1=luigi&param2=mario';
      assert.equal(
        Routing.getModifiedPathname(),
        '/projects/pr2/settings?~param1=luigi&~param2=mario'
      );
    });

    it('from intent based link without params', () => {
      window.location.hash = '#?intent=Sales-settings';
      assert.equal(Routing.getModifiedPathname(), '/projects/pr2/settings');
    });

    it('from intent based link with case insensitive pattern', () => {
      window.location.hash = '#?inTeNT=Sales-settings';
      assert.equal(Routing.getModifiedPathname(), '/projects/pr2/settings');
    });

    it('from faulty intent based link', () => {
      window.location.hash = '#?intent=Sales-sett-ings';
      assert.equal(Routing.getModifiedPathname(), '/');
    });

    it('from intent based link with illegal characters', () => {
      window.location.hash = '#?intent=Sales-sett$ings';
      assert.equal(Routing.getModifiedPathname(), '/');
    });
  });

  describe('navigateToLink()', () => {
    beforeEach(() => {
      sinon.stub(Routing, 'navigateToExternalLink');
      sinon.stub(Routing, 'navigateTo');
    });

    it('calls proper function if item is an external link with url', () => {
      const url = 'https://github.com/SAP/luigi';
      Routing.navigateToLink({ externalLink: { url } });
      sinon.assert.calledOnce(Routing.navigateToExternalLink);
      sinon.assert.calledWithExactly(Routing.navigateToExternalLink, { url });
      sinon.assert.notCalled(Routing.navigateTo);
    });

    it('calls proper function if item is NOT an external link with url', () => {
      const link = 'https://my-app/projects';
      Routing.navigateToLink({ link });
      sinon.assert.notCalled(Routing.navigateToExternalLink);
      sinon.assert.calledOnce(Routing.navigateTo);
      sinon.assert.calledWithExactly(Routing.navigateTo, link);
    });
  });

  describe('navigateToExternalLink()', () => {
    it('open external link in same tab', () => {
      const externalLink = { url: 'http://localhost', sameWindow: true };
      sinon.stub(window, 'focus');
      sinon.stub(window, 'open').returns(window);
      Routing.navigateToExternalLink(externalLink);
      sinon.assert.calledOnce(window.open);
      sinon.assert.calledWithExactly(window.open, 'http://localhost', '_self');
      sinon.assert.calledOnce(window.focus);
    });

    it('open external link in new tab', () => {
      const externalLink = { url: 'http://localhost', sameWindow: false };
      sinon.stub(window, 'focus');
      sinon.stub(window, 'open').returns(window);
      Routing.navigateToExternalLink(externalLink);
      sinon.assert.calledOnce(window.open);
      sinon.assert.calledWithExactly(window.open, 'http://localhost', '_blank');
      sinon.assert.calledOnce(window.focus);
    });
  });

  describe('showPageNotFoundError()', () => {
    let component = {
      showAlert: () => {}
    };
    let pathToRedirect = '/go/here';
    let pathToRedirect2 = '/go/there';
    let notFoundPath = '/this/does/not/exist';
    beforeEach(() => {
      sinon.stub(Routing, 'navigateTo');
      sinon.stub(LuigiI18N, 'getTranslation');
      sinon.stub(component, 'showAlert');
    });

    it('navigate to redirect path', () => {
      LuigiConfig.getConfigValue.returns(null);

      Routing.showPageNotFoundError(component, pathToRedirect, notFoundPath);

      sinon.assert.calledWithExactly(Routing.navigateTo, pathToRedirect);
    });

    it('navigate to path specified by custom handler', () => {
      let custom = {
        handler: () => {
          return {
            redirectTo: pathToRedirect2
          };
        }
      };
      LuigiConfig.getConfigValue.returns(custom.handler);

      Routing.showPageNotFoundError(component, pathToRedirect, notFoundPath);

      sinon.assert.calledWithExactly(Routing.navigateTo, pathToRedirect2);
    });
  });
  describe('dynamicNode', () => {
    let nodeData = {
      pathParam: {
        dynNode1: 'dyn1'
      }
    };
    let node = {
      pathSegment: ':dynNode1'
    };
    it('check if it is dynamic Node', () => {
      let isDynamic = RoutingHelpers.isDynamicNode(node);
      assert.isTrue(isDynamic);
    });
    it('check if it is dynamic Node', () => {
      let pathParamValue = RoutingHelpers.getDynamicNodeValue(
        node,
        nodeData.pathParam
      );
      assert.equal(pathParamValue, 'dyn1');
    });
  });

  describe('handleBookmarkableModalPath', async () => {
    // given
    const modalPath = encodeURIComponent('/project-modal');
    const modalParams = { hello: 'world' };

    beforeEach(() => {
      sinon.stub(RoutingHelpers, 'getModalPathFromPath').returns(modalPath);
      sinon.stub(RoutingHelpers, 'getModalParamsFromPath').returns(modalParams);
      sinon.stub(Navigation, 'extractDataFromPath').returns({ nodeObject: {} });
      sinon.stub(LuigiNavigation, 'openAsModal');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('with modalParams (from url or withParams())', async () => {
      //when
      try {
        await Routing.handleBookmarkableModalPath();
      } catch (error) {
        // console.log('err', error);
      }

      //then
      sinon.assert.calledWith(Navigation.extractDataFromPath, modalPath);
      sinon.assert.calledOnce(LuigiNavigation.openAsModal);
      sinon.assert.calledWithExactly(
        LuigiNavigation.openAsModal,
        modalPath,
        modalParams
      );
    });
    it('with node setting openNodeInModal', async () => {
      const mockNodeModalSettings = {
        openNodeInModal: { title: 'My Modal' }
      };
      Navigation.extractDataFromPath.returns({
        nodeObject: mockNodeModalSettings
      });

      //when
      try {
        await Routing.handleBookmarkableModalPath();
      } catch (error) {
        // console.log('err', error);
      }

      //then
      sinon.assert.calledWith(Navigation.extractDataFromPath, modalPath);
      sinon.assert.calledOnce(LuigiNavigation.openAsModal);
      sinon.assert.calledWithExactly(
        LuigiNavigation.openAsModal,
        modalPath,
        mockNodeModalSettings.openNodeInModal
      );
    });
  });
  describe('append and remove modal data from URL using path routing', () => {
    const modalPath = encodeURIComponent('/project-modal');
    const modalParams = { hello: 'world' };
    const params = {
      '~luigi': 'mario'
    };
    const modalParamName = 'mySpecialModal';
    let globalLocationRef = global.location;

    beforeEach(() => {
      history.replaceState = sinon.spy();
      sinon.stub(RoutingHelpers, 'getModalPathFromPath').returns(modalPath);
      sinon.stub(RoutingHelpers, 'getHashQueryParamSeparator').returns('?');
      sinon.stub(RoutingHelpers, 'getModalParamsFromPath').returns(modalParams);
      sinon
        .stub(RoutingHelpers, 'getModalViewParamName')
        .returns(modalParamName);

      sinon.stub(Navigation, 'extractDataFromPath').returns({ nodeObject: {} });

      sinon.stub(LuigiNavigation, 'openAsModal');
    });

    afterEach(() => {
      sinon.restore();
      global.location = globalLocationRef;
    });

    it('append modal data to url with path routing', () => {
      sinon.stub(RoutingHelpers, 'getQueryParams').returns(params);
      global.location = {
        href: 'http://some.url.de/settings'
      };
      window.state = {};
      console.log('path routing ', global.location);
      sinon
        .stub(LuigiConfig, 'getConfigBooleanValue')
        .withArgs('routing.useHashRouting')
        .returns(false);
      try {
        Routing.appendModalDataToUrl(modalPath, modalParams);
      } catch (error) {
        console.log('error', error);
      }
      // then
      sinon.assert.calledWith(
        history.replaceState,
        window.state,
        '',
        'http://some.url.de/settings?~luigi=mario&mySpecialModal=%252Fproject-modal&mySpecialModalParams=%7B%22hello%22%3A%22world%22%7D'
      );
    });

    it('remove modal data from url with path routing', () => {
      sinon.stub(RoutingHelpers, 'getQueryParams').returns(params);
      global.location = {
        href:
          'http://some.url.de/settings?~luigi=mario&mySpecialModal=%252Fproject-modal&mySpecialModalParams=%7B%22hello%22%3A%22world%22%7D',
        search:
          '?~luigi=mario&mySpecialModal=%252Fproject-modal&mySpecialModalParams=%7B%22hello%22%3A%22world%22%7D'
      };
      window.state = {};
      sinon
        .stub(LuigiConfig, 'getConfigBooleanValue')
        .withArgs('routing.useHashRouting')
        .returns(false);
      try {
        Routing.removeModalDataFromUrl();
      } catch (error) {
        console.log('error', error);
      }
      sinon.assert.calledWithExactly(
        window.history.replaceState,
        {},
        '',
        'http://some.url.de/settings?~luigi=mario'
      );
    });
  });

  describe('append and remove modal data from URL using hash routing', () => {
    const modalPath = encodeURIComponent('/project-modal');
    const modalParams = { hello: 'world' };
    const params = {
      '~luigi': 'mario'
    };
    const modalParamName = 'mySpecialModal';
    let globalLocationRef = global.location;

    beforeEach(() => {
      history.replaceState = sinon.spy();
      sinon.stub(RoutingHelpers, 'getModalPathFromPath').returns(modalPath);
      sinon.stub(RoutingHelpers, 'getHashQueryParamSeparator').returns('?');
      sinon.stub(RoutingHelpers, 'getModalParamsFromPath').returns(modalParams);
      sinon
        .stub(RoutingHelpers, 'getModalViewParamName')
        .returns(modalParamName);

      sinon.stub(Navigation, 'extractDataFromPath').returns({ nodeObject: {} });

      sinon.stub(LuigiNavigation, 'openAsModal');
    });

    afterEach(() => {
      sinon.restore();
      global.location = globalLocationRef;
    });

    it('append modal data to url with hash routing', () => {
      sinon.stub(RoutingHelpers, 'getQueryParams').returns(params);
      global.location = {
        href: 'http://some.url.de/#/settings',
        hash: '#/settings'
      };
      window.state = {};
      sinon
        .stub(LuigiConfig, 'getConfigBooleanValue')
        .withArgs('routing.useHashRouting')
        .returns(true);
      try {
        Routing.appendModalDataToUrl(modalPath, modalParams);
      } catch (error) {
        console.log('error', error);
      }
      // then
      sinon.assert.calledWith(
        history.replaceState,
        window.state,
        '',
        'http://some.url.de/#/settings?~luigi=mario&mySpecialModal=%252Fproject-modal&mySpecialModalParams=%7B%22hello%22%3A%22world%22%7D'
      );
    });

    it('remove modal data from url with hash routing', () => {
      sinon.stub(RoutingHelpers, 'getQueryParams').returns(params);
      global.location = {
        href:
          'http://some.url.de/#/settings?~luigi=mario&mySpecialModal=%252Fproject-modal&mySpecialModalParams=%7B%22hello%22%3A%22world%22%7D',
        hash:
          '#/settings?~luigi=mario&mySpecialModal=%252Fproject-modal&mySpecialModalParams=%7B%22hello%22%3A%22world%22%7D'
      };
      window.state = {};
      sinon
        .stub(LuigiConfig, 'getConfigBooleanValue')
        .withArgs('routing.useHashRouting')
        .returns(true);
      try {
        Routing.removeModalDataFromUrl();
      } catch (error) {
        console.log('error', error);
      }
      sinon.assert.calledWithExactly(
        window.history.replaceState,
        {},
        '',
        'http://some.url.de/#/settings?~luigi=mario'
      );
    });
  });

  describe('normalizePath', () => {
    it('should normalize path', () => {
      const path = Routing.normalizePath('/bla/blub/x/y/../../a');
      assert.equal(path, '/bla/blub/a');
    });

    it('should not add leading slash', () => {
      const path = Routing.normalizePath('bla/blub/x/y/../../a');
      assert.equal(path, 'bla/blub/a');
    });

    it('should leave query params and hash untouched', () => {
      const path = Routing.normalizePath(
        'bla/blub/../x/?~a=b&~c=d#/something?~e=f&~g=h'
      );
      assert.equal(path, 'bla/x/?~a=b&~c=d#/something?~e=f&~g=h');
    });
  });
});
