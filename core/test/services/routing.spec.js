const rewire = require('rewire');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const routing = require('../../src/services/routing');
import { deepMerge } from '../../src/utilities/helpers.js';
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
      get: () => lastObj
    };

    sinon.stub(LuigiConfig, 'getConfigValue');
  });
  afterEach(() => {
    if (document.createElement.restore) {
      document.createElement.restore();
    }
    sinon.restore();
  });
  describe('#handleRouteChange()', () => {
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
        prepend: sinon.spy()
      };

      const config = {
        iframe: null,
        builderCompatibilityMode: false,
        navigateOk: null
      };

      LuigiConfig.config = sampleLuigiConfig;

      // when
      sinon.stub(document, 'createElement').callsFake(() => ({ src: null }));
      await routing.handleRouteChange(path, component, node, config, window);

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
        prepend: sinon.spy()
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
      await routing.handleRouteChange(path, component, node, config, window);

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
          savedObj = deepMerge(savedObj, obj);
          componentSaved.get = () => {
            return savedObj;
          };
        }
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
        prepend: sinon.spy()
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
        prepend: sinon.spy()
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
      await routing.handleRouteChange(path, component, node, config, window);

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
        prepend: sinon.spy()
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
      await routing.handleRouteChange(path, component, node, config, window);

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
        prepend: sinon.spy()
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
      await routing.handleRouteChange(path, component, node, config, window);

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
        prepend: sinon.spy()
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
      await routing.handleRouteChange(path, component, node, config, window);

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

      const component = {};
      const node = {};
      const config = {};

      window.history.pushState = sinon.spy();

      // when
      LuigiConfig.config = sampleLuigiConfig;
      LuigiConfig.config.navigation.hideNav = false;
      await routing.handleRouteChange(path, component, node, config, window);

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

      const node = {};
      const config = {};

      // when
      LuigiConfig.config = sampleLuigiConfig;

      assert.equal(component.get().hideSideNav, undefined);

      await routing.handleRouteChange(path, component, node, config, window);

      assert.equal(component.get().hideSideNav, true);
    });
  });

  describe('#buildFromRelativePath()', () => {
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

  describe('#handleRouteClick()', () => {
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

    it('should set proper location hash with parent node', () => {
      // given
      const expectedRoute = '#/projects/project-one';
      LuigiConfig.getConfigValue.returns(true);

      // when
      routing.handleRouteClick(nodeWithParent);

      // then
      assert.equal(window.location.hash, expectedRoute);
    });

    it('should set proper location hash with normal node', () => {
      // given
      const expectedRoute = '#/projects';
      LuigiConfig.getConfigValue.returns(true);

      // when
      routing.handleRouteClick(nodeWithoutParent);

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
      routing.handleRouteClick(nodeWithParent);

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
      routing.handleRouteClick(nodeWithoutParent);

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
      routing.handleRouteClick(nodeWithoutParent);

      // then
      const pushStateArgs = window.history.pushState.args[0];
      const singleStateWithPath = pushStateArgs[0];

      assert.equal(singleStateWithPath.path, expectedRoute);
      assert.equal(dispatchCallsNum + 1, expectedDispatchCallsNum);
    });

    it('link with absolute path', () => {
      // given
      const expectedRoute = '#/projects';
      window.location.hash = '#/some/path';
      const inputNode = {
        label: 'Absolute link',
        link: '/projects'
      };

      // when
      LuigiConfig.getConfigValue.returns(true);

      routing.handleRouteClick(inputNode, window);

      console.log('​window.location.hash', window.location.hash);
      // then
      assert.equal(window.location.hash, expectedRoute);
    });

    it('link with relative path', () => {
      // given
      const expectedRoute = '#/some/path/projects';
      window.location.hash = '#/some/path';
      const inputNode = {
        label: 'Relative link',
        link: 'projects'
      };

      // when
      LuigiConfig.getConfigValue.returns(true);

      routing.handleRouteClick(inputNode, window);

      // then
      assert.equal(window.location.hash, expectedRoute);
    });
  });

  describe('setActiveIframeToPrevious', () => {
    it('standard', () => {
      let node = {
        children: [
          {
            style: {
              display: null
            }
          }
        ],
        removeChild: child => {
          node.children.forEach((c, i) => {
            if (c === child) {
              node.children.splice(i, 1);
            }
          });
        }
      };

      routing.setActiveIframeToPrevious(node);

      assert.equal(node.children.length, 1);
      assert.equal(node.children[0].style.display, 'block');
    });

    it('goBack', () => {
      let node = {
        children: [
          {
            style: {
              display: null
            },
            id: 1
          },
          {
            style: {
              display: null
            },
            id: 2
          }
        ],
        removeChild: child => {
          node.children.forEach((c, i) => {
            if (c === child) {
              node.children.splice(i, 1);
            }
          });
        }
      };

      routing.setActiveIframeToPrevious(node);

      assert.equal(node.children.length, 1);
      assert.equal(node.children[0].style.display, 'block');
      assert.equal(node.children[0].id, 2);
    });
  });

  it('removeInactiveIframes', () => {
    let node = {
      removeChild: sinon.spy(),
      children: [
        {
          style: {
            display: null
          }
        },
        {
          style: {
            display: null
          }
        },
        {
          style: {
            display: null
          }
        }
      ]
    };

    routing.removeInactiveIframes(node);

    assert.equal(node.removeChild.callCount, 2);
  });

  describe('isSameViewGroup', () => {
    const config = {
      iframe: {
        src: 'http://url.com/app.html!#/prevUrl'
      }
    };

    it('should return true if views have the same domain but different hash', () => {
      component.set({
        viewUrl: 'http://url.com/app.html!#/someUrl',
        previousNodeValues: { viewUrl: config.iframe.src }
      });
      assert.isTrue(routing.isSameViewGroup(config, component));
    });

    it('should return false if views have different domains', () => {
      component.set({
        viewUrl: 'http://otherurl.de/app.html!#/someUrl',
        previousNodeValues: { viewUrl: config.iframe.src }
      });
      assert.isFalse(routing.isSameViewGroup(config, component));
    });

    const noHashConfig = {
      iframe: {
        src: 'http://url.com/oneSite'
      }
    };

    it('should return true if views have the same viewGroup', () => {
      component.set({
        viewUrl: 'http://url.com/SomeUrl',
        viewGroup: 'firstSPA',
        previousNodeValues: {
          viewUrl: noHashConfig.iframe.src,
          viewGroup: 'firstSPA'
        }
      });
      assert.isTrue(routing.isSameViewGroup(config, component));
    });

    it('should return false if views have different viewGroups', () => {
      component.set({
        viewUrl: 'http://url.com/someUrl',
        viewGroup: 'firstSPA',
        previousNodeValues: {
          viewUrl: noHashConfig.iframe.src,
          viewGroup: 'secondSPA'
        }
      });
      assert.isFalse(routing.isSameViewGroup(config, component));
    });

    it('should return false if views have no viewGroup defined', () => {
      component.set({
        viewUrl: 'http://url.com/someUrl',
        previousNodeValues: {
          viewUrl: noHashConfig.iframe.src
        }
      });
      assert.isFalse(routing.isSameViewGroup(config, component));
    });

    it('should return false if views have the same viewGroup but different domains', () => {
      component.set({
        viewUrl: 'http://otherDomain.com/someUrl',
        viewGroup: 'firstSPA',
        previousNodeValues: {
          viewUrl: noHashConfig.iframe.src,
          viewGroup: 'firstSPA'
        }
      });
      assert.isFalse(routing.isSameViewGroup(config, component));
    });
  });

  it('hasIframeIsolation', () => {
    // no node is set to isolateView
    component.set({
      isolateView: false,
      previousNodeValues: { isolateView: false }
    });
    assert.isFalse(routing.hasIframeIsolation(component));

    // new node is set to isolateView
    component.set({
      isolateView: true,
      previousNodeValues: { isolateView: false }
    });
    assert.isTrue(routing.hasIframeIsolation(component));

    // current node is set to isolateView
    component.set({
      isolateView: false,
      previousNodeValues: { isolateView: true }
    });
    assert.isTrue(routing.hasIframeIsolation(component));
  });

  describe('defaultChildNodes', () => {
    const routing = rewire('../../src/services/routing');
    const getDefaultChildNode = routing.__get__('getDefaultChildNode');
    const getPathData = function() {
      return {
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
    };

    it('should return first child if no defaultChildNode is set', async () => {
      let pathData = getPathData();

      assert.equal(await getDefaultChildNode(pathData), 'stakeholders');
    });

    it('should return child with pathSegment equal to defaultChildNode', async () => {
      let pathData = getPathData();
      pathData.navigationPath[1].defaultChildNode = 'customers';

      assert.equal(await getDefaultChildNode(pathData), 'customers');
    });

    it('should return first child if given defaultChildNode does not exist', async () => {
      const pathData = getPathData();
      pathData.navigationPath[1].defaultChildNode = 'NOSUCHPATH';

      assert.equal(await getDefaultChildNode(pathData), 'stakeholders');
    });

    it('should return first child asynchronous if no defaultChildNode is set', async () => {
      let pathData = {
        navigationPath: [
          {
            // DOESN'T MATTER
          },
          {
            pathSegment: 'groups',
            children: () =>
              Promise.resolve([
                {
                  pathSegment: 'stakeholders',
                  viewUrl:
                    '/sampleapp.html#/projects/1/users/groups/stakeholders'
                },
                {
                  pathSegment: 'customers',
                  viewUrl: '/sampleapp.html#/projects/1/users/groups/customers'
                }
              ])
          }
        ],
        context: {}
      };

      assert.equal(await getDefaultChildNode(pathData), 'stakeholders');
    });
  });
});
