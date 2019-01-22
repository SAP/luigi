const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const routing = require('../../src/services/routing');
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const GenericHelpers = require('../../src/utilities/helpers/generic-helpers');
import { afterEach } from 'mocha';
import { LuigiConfig } from '../../src/services/config';

describe('Routing', () => {
  let component;
  beforeEach(() => {
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

  describe('buildFromRelativePath', () => {
    beforeEach(() => {
      window.dispatchEvent = sinon.spy();
    });

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
                viewUrl: '{context.varA1}/a1.html#p={nodeParams.param1}'
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
                    viewUrl: 't1.html'
                  },
                  {
                    pathSegment: 't2',
                    style: {
                      display: null
                    },
                    viewUrl: 't2.html'
                  }
                ]
              },
              {
                pathSegment: 'categories',
                children: [
                  {
                    pathSegment: ':category',
                    viewUrl: 'cats/:category#details',
                    children: [
                      {
                        pathSegment: ':sub',
                        viewUrl: 'cats/:category/:sub'
                      }
                    ]
                  }
                ]
              }
            ],
            context: {
              varA: 'tets'
            },
            hideSideNav: true
          }
        ]
      },
      settings: {
        hideNavigation: false
      }
    };

    it('should set component data with hash path', async () => {
      // given
      const path = '#/projects';
      const expectedViewUrl = '/aaa.html';

      const node = {
        pathSegment: '#/projects',
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
            }
          },
          {
            pathSegment: 'a2',
            style: {
              display: null
            }
          }
        ],
        context: {
          varA: 'tets'
        },
        prepend: sinon.spy(),
        insertBefore: sinon.spy()
      };

      const config = {
        iframe: null,
        builderCompatibilityMode: false,
        navigateOk: null
      };

      LuigiConfig.config = sampleLuigiConfig;

      // when
      sinon.stub(document, 'createElement').callsFake(() => ({ src: null }));

      await routing.handleRouteChange(path, component, node, config);

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

      const node = {
        pathSegment: 'projects',
        label: 'AAA',
        viewUrl: '/aaa.html',
        loadingIndicator: {
          enabled: false
        },
        prepend: sinon.spy(),
        insertBefore: sinon.spy()
      };

      const config = {
        iframe: null,
        builderCompatibilityMode: false,
        navigateOk: null
      };

      // when
      LuigiConfig.config = {
        navigation: {
          nodes: () => [node]
        }
      };
      sinon.stub(document, 'createElement').callsFake(() => ({ src: null }));
      await routing.handleRouteChange(path, component, node, config);

      // then
      assert.equal(component.get().viewUrl, expectedViewUrl);
      assert.equal(component.get().showLoadingIndicator, false);
    });

    it('should set component data without hash path', async () => {
      // given
      const path = '#/projects';
      const expectedViewUrl = '/aaa.html';
      const mockBrowser = new MockBrowser();
      const window = mockBrowser.getWindow();
      global.window = window;
      const document = mockBrowser.getDocument();
      global.document = document;

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

      const node = {
        pathSegment: '#/projects',
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
            }
          },
          {
            pathSegment: 'a2',
            style: {
              display: null
            }
          }
        ],
        context: {
          varA: 'tets'
        },
        prepend: sinon.spy(),
        insertBefore: sinon.spy()
      };

      const config = {
        iframe: null,
        builderCompatibilityMode: false,
        navigateOk: null
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
      LuigiConfig.config = sampleLuigiConfig;
      const docMock = sinon.mock(document);
      docMock
        .expects('createElement')
        .returns({ src: null })
        .once();

      await routing.handleRouteChange(
        path,
        componentSaved,
        node,
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
      const expectedViewUrl = '{context.varA1}/a1.html#p={nodeParams.param1}';
      const expectedProcessedViewUrl = 'maskopatol/a1.html#p=tets';

      const node = {
        pathSegment: '#/projects',
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
            viewUrl: '{context.varA1}/a1.html#p={nodeParams.param1}'
          },
          {
            pathSegment: 'a2',
            style: {
              display: null
            }
          }
        ],
        context: {
          varA: 'tets'
        },
        prepend: sinon.spy(),
        insertBefore: sinon.spy()
      };

      const config = {
        iframe: null,
        builderCompatibilityMode: false,
        navigateOk: null
      };

      // when
      LuigiConfig.config = sampleLuigiConfig;
      const iframeMock = { src: null };
      sinon.stub(document, 'createElement').callsFake(() => iframeMock);
      await routing.handleRouteChange(path, component, node, config);

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
      const mockBrowser = new MockBrowser();
      const window = mockBrowser.getWindow();
      global.window = window;
      const document = mockBrowser.getDocument();
      global.document = document;

      const node = {
        pathSegment: '#/projects',
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
            viewUrl: '{context.varA1}/a1.html#p={nodeParams.param1}'
          },
          {
            pathSegment: 'a2',
            style: {
              display: null
            },
            viewUrl: '{context.varA2}/a1.html#p={nodeParams.param2}'
          }
        ],
        context: {
          varA: 'tets'
        },
        prepend: sinon.spy(),
        insertBefore: sinon.spy()
      };

      const config = {
        iframe: null,
        builderCompatibilityMode: false,
        navigateOk: null
      };

      // when
      LuigiConfig.config = sampleLuigiConfig;
      const iframeMock = { src: null };
      sinon.stub(document, 'createElement').callsFake(() => iframeMock);
      await routing.handleRouteChange(path, component, node, config);

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
      const expectedViewUrl = 'cats/cat1#details';
      const mockBrowser = new MockBrowser();
      const window = mockBrowser.getWindow();
      global.window = window;
      const document = mockBrowser.getDocument();
      global.document = document;

      const node = {
        style: {},
        prepend: sinon.spy(),
        insertBefore: sinon.spy()
      };

      const config = {
        iframe: null,
        builderCompatibilityMode: false,
        navigateOk: null
      };

      // when
      window.Luigi = {};
      window.Luigi.config = sampleLuigiConfig;
      const iframeMock = { src: null };
      sinon.stub(document, 'createElement').callsFake(() => iframeMock);
      await routing.handleRouteChange(path, component, node, config);

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
      const expectedViewUrl = 'cats/cat1/sub23';
      const mockBrowser = new MockBrowser();
      const window = mockBrowser.getWindow();
      global.window = window;
      const document = mockBrowser.getDocument();
      global.document = document;

      const node = {
        style: {},
        prepend: sinon.spy(),
        insertBefore: sinon.spy()
      };

      const config = {
        iframe: null,
        builderCompatibilityMode: false,
        navigateOk: null
      };

      // when
      window.Luigi = {};
      window.Luigi.config = sampleLuigiConfig;
      const iframeMock = { src: null };
      sinon.stub(document, 'createElement').callsFake(() => iframeMock);
      await routing.handleRouteChange(path, component, node, config);

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
      const mockBrowser = new MockBrowser();
      const window = mockBrowser.getWindow();
      global.window = window;

      const component = {
        shouldShowUnsavedChangesModal: () => false
      };
      const node = {};
      const config = {};

      window.history.pushState = sinon.spy();

      // when
      LuigiConfig.config = sampleLuigiConfig;
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

    it("should set component's 'hideSideNav' property", async () => {
      // given
      const path = '#/projects';
      const mockBrowser = new MockBrowser();
      const window = mockBrowser.getWindow();
      global.window = window;

      const node = { insertBefore: sinon.spy() };
      const config = {};

      // when
      LuigiConfig.config = sampleLuigiConfig;

      assert.equal(component.get().hideSideNav, undefined);

      await routing.handleRouteChange(path, component, node, config);

      assert.equal(component.get().hideSideNav, true);
    });
  });

  describe('handleRouteClick', () => {
    beforeEach(() => {
      window.dispatchEvent = sinon.spy();
    });

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
      routing.handleRouteClick(nodeWithParent, mockComponentData);

      // then
      assert.equal(window.location.hash, expectedRoute);
    });

    it('should set proper location hash with normal node', () => {
      // given
      const expectedRoute = '#/projects';
      LuigiConfig.getConfigValue.returns(true);

      // when
      routing.handleRouteClick(nodeWithoutParent, mockComponentData);

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
      routing.handleRouteClick(nodeWithParent, mockComponentData);

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
      routing.handleRouteClick(nodeWithoutParent, mockComponentData);

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
      routing.handleRouteClick(nodeWithoutParent, mockComponentData);

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

      routing.handleRouteClick(inputNode, mockComponentData);

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

      routing.handleRouteClick(inputNode, mockComponentData);

      // then
      assert.equal(window.location.hash, expectedRoute);
    });
  });
});
