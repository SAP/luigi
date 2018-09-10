const rewire = require('rewire');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const routing = require('../src/services/routing');
import { deepMerge } from '../src/utilities/helpers.js';
import { afterEach } from 'mocha';

describe('Routing', () => {
  let component;
  beforeEach(() => {
    component = {
      set: obj => {
        component.get = () => obj;
      },
      get: () => ({})
    };
  })
  afterEach(() => {
    if (document.createElement.restore) {
      document.createElement.restore();
    }
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
              }
            ],
            context: {
              varA: 'tets'
            }
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

      // when
      window.Luigi = {};
      window.Luigi.config = sampleLuigiConfig;
      sinon.stub(document, 'createElement').callsFake(() => ({ src: null }));
      await routing.handleRouteChange(path, component, node, config, window);

      // then
      assert.equal(component.get().viewUrl, expectedViewUrl);
      assert.equal(
        component.get().hideNav,
        window.Luigi.config.settings.hideNavigation
      );
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
      window.Luigi = {};
      window.Luigi.config = sampleLuigiConfig;
      const docMock = sinon.mock(document);
      docMock
        .expects('createElement')
        .returns({ src: null })
        .once();

      await routing.handleRouteChange(path, componentSaved, node, config, window);

      // then
      assert.equal(componentSaved.get().viewUrl, expectedViewUrl);
      assert.equal(
        componentSaved.get().hideNav,
        window.Luigi.config.settings.hideNavigation
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
      window.Luigi = {};
      window.Luigi.config = sampleLuigiConfig;
      const iframeMock = { src: null };
      sinon.stub(document, 'createElement').callsFake(() => iframeMock);
      await routing.handleRouteChange(path, component, node, config, window);

      // then
      assert.equal(component.get().viewUrl, expectedViewUrl);
      assert.equal(iframeMock.src, expectedProcessedViewUrl);
      assert.equal(
        component.get().hideNav,
        window.Luigi.config.settings.hideNavigation
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
      window.Luigi = {};
      window.Luigi.config = sampleLuigiConfig;
      const iframeMock = { src: null };
      sinon.stub(document, 'createElement').callsFake(() => iframeMock);
      await routing.handleRouteChange(path, component, node, config, window);

      // then
      assert.equal(component.get().viewUrl, expectedViewUrl);
      assert.equal(iframeMock.src, expectedProcessedViewUrl);
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
      window.Luigi = {
        config: sampleLuigiConfig
      };
      window.Luigi.config.navigation.hideNav = false;
      await routing.handleRouteChange(path, component, node, config, window);

      // then
      sinon.assert.calledWith(
        window.history.pushState,
        sinon.match.any,
        sinon.match.any,
        expectedPath
      );
    });
  });

  describe('#handleRouteClick()', () => {
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

      // when
      window.Luigi = {
        config: {
          routing: {
            useHashRouting: true
          }
        }
      };
      routing.handleRouteClick(nodeWithParent, window, document);

      // then
      assert.equal(window.location.hash, expectedRoute);
    });

    it('should set proper location hash with normal node', () => {
      // given
      const expectedRoute = '#/projects';

      // when
      window.Luigi = {
        config: {
          routing: {
            useHashRouting: true
          }
        }
      };

      routing.handleRouteClick(nodeWithoutParent, window, document);

      // then
      assert.equal(window.location.hash, expectedRoute);
    });

    it('should call pushState with proper path (with parent node)', () => {
      // given
      const expectedRoute = '/projects/project-one';
      const expectedPushStateCallsNum = 1;

      window.history.pushState = sinon.spy();
      const pushStateCallsNum = window.history.pushState.callCount;

      // when
      window.Luigi = {
        config: {
          routing: {
            useHashRouting: false
          }
        }
      };
      routing.handleRouteClick(nodeWithParent, window, document);

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

      // when
      window.Luigi = {
        config: {
          routing: {
            useHashRouting: false
          }
        }
      };
      routing.handleRouteClick(nodeWithoutParent, window, document);

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

      // when
      window.Luigi = {
        config: {
          routing: {
            useHashRouting: false
          }
        }
      };
      routing.handleRouteClick(nodeWithoutParent, window, document);

      // then
      const pushStateArgs = window.history.pushState.args[0];
      const singleStateWithPath = pushStateArgs[0];

      assert.equal(singleStateWithPath.path, expectedRoute);
      assert.equal(dispatchCallsNum + 1, expectedDispatchCallsNum);
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

  it('isNotSameDomain', () => {
    const config = {
      iframe: {
        src: 'http://url.com/app.html!#/prevUrl'
      }
    };
    component.set({ viewUrl: 'http://url.com/app.html!#/someUrl', previousNodeValues: { viewUrl: config.iframe.src } });
    assert.isFalse(routing.isNotSameDomain(config, component));

    component.set({ viewUrl: 'http://otherurl.de/app.html!#/someUrl', previousNodeValues: { viewUrl: config.iframe.src } });
    assert.isTrue(routing.isNotSameDomain(config, component));
  });

  it('hasIframeIsolation', () => {
    // no node is set to isolateView
    component.set({ isolateView: false, previousNodeValues: { isolateView: false } });
    assert.isFalse(routing.hasIframeIsolation(component));

    // new node is set to isolateView
    component.set({ isolateView: true, previousNodeValues: { isolateView: false } });
    assert.isTrue(routing.hasIframeIsolation(component));

    // current node is set to isolateView
    component.set({ isolateView: false, previousNodeValues: { isolateView: true } });
    assert.isTrue(routing.hasIframeIsolation(component));
  });

  describe('defaultChildNodes', () => {
    const routing = rewire('../src/services/routing');
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

    it('should return first child if no defaultChildNode is set', () => {
      let pathData = getPathData();

      assert.equal(getDefaultChildNode(pathData), 'stakeholders');
    });

    it('should return child with pathSegment equal to defaultChildNode', () => {
      let pathData = getPathData();
      pathData.navigationPath[1].defaultChildNode = 'customers';

      assert.equal(getDefaultChildNode(pathData), 'customers');
    });

    it('should return first child if given defaultChildNode does not exist', () => {
      const pathData = getPathData();
      pathData.navigationPath[1].defaultChildNode = 'NOSUCHPATH';

      assert.equal(getDefaultChildNode(pathData), 'stakeholders');
    });
  });
});
