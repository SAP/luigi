const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const routing = require('../../src/services/routing');
import { GenericHelpers } from '../../src/utilities/helpers/generic-helpers';
import { afterEach } from 'mocha';
import { LuigiConfig } from '../../src/core-api';

describe('Routing', () => {
  let component;
  beforeEach(() => {
    window.dispatchEvent = sinon.spy();
    let lastObj = {};
    component = {
      set: obj => {
        Object.assign(lastObj, obj);
      },
      get: () => lastObj,
      shouldShowUnsavedChangesModal: () => false
    };

    sinon.stub(LuigiConfig, 'getConfigValue');
  });
  afterEach(() => {
    if (document.createElement.restore) {
      document.createElement.restore();
    }
    sinon.restore();
  });

  describe('getHashPath()', () => {
    it('returns hash path from default param', () => {
      window.location.hash = '#/projects/pr3';
      const actual = routing.getHashPath();
      const expected = 'projects/pr3';
      assert.equal(actual, expected);
    });

    it('returns hash path from provided input param', () => {
      const actual = routing.getHashPath('my-url#/projects/pr3');
      const expected = 'projects/pr3';
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

    it('should return proper route', () => {
      // given
      const expectedRoute = '/parent-node/child-node';
      LuigiConfig.getConfigValue.returns(true);

      // when
      window.location.hash = '/parent-node';
      const route = routing.buildFromRelativePath(nodeWithParent);

      // then
      assert.equal(route, expectedRoute);
    });

    it("should return proper route even if it's relative to a different node in the tree than the current one", () => {
      // given
      const expectedRoute = '/parent-node/child-node';
      LuigiConfig.getConfigValue.returns(true);

      // when
      window.location.hash = '/parent-node/different-node';
      const route = routing.buildFromRelativePath(nodeWithParent);

      // then
      assert.equal(route, expectedRoute);
    });
  });

  describe('handleRouteChange', () => {
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
    let currentLuigiConfig = {};
    let config;

    beforeEach(() => {
      window.Luigi = { config: currentLuigiConfig };
      currentLuigiConfig = Object.assign({}, sampleLuigiConfig);
      LuigiConfig.config = currentLuigiConfig;
      config = {
        iframe: null,
        builderCompatibilityMode: false,
        navigateOk: null
      };
    });

    it('should set component data with hash path', async () => {
      // given
      const path = '#/projects';
      const expectedViewUrl = '/aaa.html';

      // when
      sinon.stub(document, 'createElement').callsFake(() => ({ src: null }));
      await routing.handleRouteChange(
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
      await routing.handleRouteChange(
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

      await routing.handleRouteChange(
        path,
        componentSaved,
        currentLuigiConfig.navigation.nodes()[0],
        config,
        window
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
      await routing.handleRouteChange(
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
      await routing.handleRouteChange(
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
      await routing.handleRouteChange(
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
      await routing.handleRouteChange(
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
      const component = {
        shouldShowUnsavedChangesModal: () => false
      };
      const node = {};
      window.history.pushState = sinon.spy();

      // when
      LuigiConfig.config.navigation.hideNav = false;
      await routing.handleRouteChange(path, component, node, config);

      // then
      sinon.assert.calledWith(
        window.history.pushState,
        sinon.match.any,
        sinon.match.any,
        expectedPath
      );
    });

    it("should set component's 'hideSideNav' property ", async () => {
      // given
      const path = '#/projects';
      //when
      const node = { insertBefore: sinon.spy(), children: [] };
      sinon.stub(document, 'querySelectorAll').callsFake(() => node);

      //then
      assert.equal(component.get().hideSideNav, undefined);

      await routing.handleRouteChange(path, component, node, config);

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
    const mockComponentData = {
      pathParams: {},
      nodeParams: {},
      context: {}
    };

    it('should set proper location hash with parent node', () => {
      // given
      const expectedRoute = '#/projects/project-one';
      LuigiConfig.getConfigValue.returns(true);

      // when
      routing.handleRouteClick(nodeWithParent, component);

      // then
      assert.equal(window.location.hash, expectedRoute);
    });

    it('should set proper location hash with normal node', () => {
      // given
      const expectedRoute = '#/projects';
      LuigiConfig.getConfigValue.returns(true);

      // when
      routing.handleRouteClick(nodeWithoutParent, component);

      // then
      assert.equal(window.location.hash, expectedRoute);
    });

    it('should call pushState with proper path (with parent node)', () => {
      // given
      const expectedRoute = '/projects/project-one';
      const expectedPushStateCallsNum = 1;

      window.history.pushState = sinon.spy();
      const pushStateCallsNum = window.history.pushState.callCount;

      LuigiConfig.getConfigValue.returns(false);

      // when
      routing.handleRouteClick(nodeWithParent, component);

      // then
      const pushStateArgs = window.history.pushState.args[0];
      const singleStateWithPath = pushStateArgs[0];

      assert.equal(singleStateWithPath.path, expectedRoute);
      assert.equal(pushStateCallsNum + 1, expectedPushStateCallsNum);
    });

    it('should call pushState with proper path (with normal node)', () => {
      // given
      const expectedRoute = '/projects';
      const expectedPushStateCallsNum = 1;

      window.history.pushState = sinon.spy();
      const pushStateCallsNum = window.history.pushState.callCount;

      LuigiConfig.getConfigValue.returns(false);

      // when
      routing.handleRouteClick(nodeWithoutParent, component);

      // then
      const pushStateArgs = window.history.pushState.args[0];
      const singleStateWithPath = pushStateArgs[0];

      assert.equal(singleStateWithPath.path, expectedRoute);
      assert.equal(pushStateCallsNum + 1, expectedPushStateCallsNum);
    });

    it('should dispatch an event', () => {
      // given
      const expectedRoute = '/projects';
      const expectedDispatchCallsNum = 1;

      window.history.pushState = sinon.spy();
      window.dispatchEvent = sinon.spy();
      const dispatchCallsNum = window.dispatchEvent.callCount;
      LuigiConfig.getConfigValue.returns(false);

      // when
      routing.handleRouteClick(nodeWithoutParent, component);

      // then
      const pushStateArgs = window.history.pushState.args[0];
      const singleStateWithPath = pushStateArgs[0];

      assert.equal(singleStateWithPath.path, expectedRoute);
      assert.equal(dispatchCallsNum + 1, expectedDispatchCallsNum);
    });

    it('should consume link with absolute path', () => {
      // given
      const expectedRoute = '#/projects';
      window.location.hash = '#/some/path';
      const inputNode = {
        label: 'Absolute link',
        link: '/projects'
      };

      // when
      LuigiConfig.getConfigValue.returns(true);
      routing.handleRouteClick(inputNode, component);

      // then
      assert.equal(window.location.hash, expectedRoute);
    });

    it('should consume link with relative path', () => {
      // given
      const expectedRoute = '#/some/path/projects';
      window.location.hash = '#/some/path';
      const inputNode = {
        label: 'Relative link',
        link: 'projects'
      };

      // when
      LuigiConfig.getConfigValue.returns(true);
      routing.handleRouteClick(inputNode, component);

      // then
      assert.equal(window.location.hash, expectedRoute);
    });
  });

  describe('navigateToExternalLink()', () => {
    it('open external link in same tab', () => {
      const externalLink = { url: 'http://localhost', sameWindow: true };
      sinon.stub(window, 'focus');
      sinon.stub(window, 'open').returns(window);
      routing.navigateToExternalLink(externalLink);
      sinon.assert.calledOnce(window.open);
      sinon.assert.calledWithExactly(window.open, 'http://localhost', '_self');
      sinon.assert.calledOnce(window.focus);
    });

    it('open external link in new tab', () => {
      const externalLink = { url: 'http://localhost', sameWindow: false };
      sinon.stub(window, 'focus');
      sinon.stub(window, 'open').returns(window);
      routing.navigateToExternalLink(externalLink);
      sinon.assert.calledOnce(window.open);
      sinon.assert.calledWithExactly(window.open, 'http://localhost', '_blank');
      sinon.assert.calledOnce(window.focus);
    });
  });
});
