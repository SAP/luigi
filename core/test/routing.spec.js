const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const routing = require('../src/services/routing');
import { deepMerge } from '../src/utilities/helpers.js';

describe('Routing', () => {
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
            }
          }
        ]
      }
    };

    it('should set component data with hash path', async () => {
      // given
      const path = '#/projects';
      const expectedViewUrl = '/aaa.html';
      const mockBrowser = new MockBrowser();
      const window = mockBrowser.getWindow();
      global.window = window;
      const document = mockBrowser.getDocument();
      global.document = document;

      const component = {
        set: obj => {
          component.get = () => obj;
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

      // when
      window.LuigiConfig = sampleLuigiConfig;
      window.LuigiConfig.navigation.hideNav = false;
      sinon.stub(document, 'createElement').callsFake(() => ({ src: null }));
      await routing.handleRouteChange(path, component, node, config, window);

      // then
      assert.equal(component.get().viewUrl, expectedViewUrl);
      assert.equal(
        component.get().hideNav,
        window.LuigiConfig.navigation.hideNav
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
      const component = {
        set: obj => {
          savedObj = deepMerge(savedObj, obj);
          component.get = () => {
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
      component.set({ preservedViews });

      // when
      window.LuigiConfig = sampleLuigiConfig;
      window.LuigiConfig.navigation.hideNav = false;
      const docMock = sinon.mock(document);
      docMock
        .expects('createElement')
        .returns({ src: null })
        .once();

      await routing.handleRouteChange(path, component, node, config, window);

      // then
      assert.equal(component.get().viewUrl, expectedViewUrl);
      assert.equal(
        component.get().hideNav,
        window.LuigiConfig.navigation.hideNav
      );

      assert.equal(component.get().preservedViews.length, 1);
      docMock.restore();
      docMock.verify();
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
      const mockBrowser = new MockBrowser();
      const window = mockBrowser.getWindow();
      const document = mockBrowser.getDocument();

      // when
      window.isHashRoute = true;
      routing.handleRouteClick(nodeWithParent, window, document);

      // then
      assert.equal(window.location.hash, expectedRoute);
    });

    it('should set proper location hash with normal node', () => {
      // given
      const expectedRoute = '#/projects';
      const mockBrowser = new MockBrowser();
      const window = mockBrowser.getWindow();
      const document = mockBrowser.getDocument();

      // when
      window.isHashRoute = true;
      routing.handleRouteClick(nodeWithoutParent, window, document);

      // then
      assert.equal(window.location.hash, expectedRoute);
    });

    it('should call pushState with proper path (with parent node)', () => {
      // given
      const expectedRoute = '/projects/project-one';
      const expectedPushStateCallsNum = 1;
      const mockBrowser = new MockBrowser();
      const window = mockBrowser.getWindow();
      const document = mockBrowser.getDocument();

      window.history.pushState = sinon.spy();
      const pushStateCallsNum = window.history.pushState.callCount;

      // when
      window.isHashRoute = false;
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
      const mockBrowser = new MockBrowser();
      const window = mockBrowser.getWindow();
      const document = mockBrowser.getDocument();

      window.history.pushState = sinon.spy();
      const pushStateCallsNum = window.history.pushState.callCount;

      // when
      window.isHashRoute = false;
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
      const mockBrowser = new MockBrowser();
      const window = mockBrowser.getWindow();
      const document = mockBrowser.getDocument();

      window.history.pushState = sinon.spy();
      window.dispatchEvent = sinon.spy();
      const dispatchCallsNum = window.dispatchEvent.callCount;

      // when
      window.isHashRoute = false;
      routing.handleRouteClick(nodeWithoutParent, window, document);

      // then
      const pushStateArgs = window.history.pushState.args[0];
      const singleStateWithPath = pushStateArgs[0];

      assert.equal(singleStateWithPath.path, expectedRoute);
      assert.equal(dispatchCallsNum + 1, expectedDispatchCallsNum);
    });
  });

  describe('Unit tests', () => {
    describe('setActiveIframeToPrevious', () => {
      it('standard', () => {
        const removeChild = sinon.spy();
        let node = {
          removeChild: sinon.spy(),
          children: [
            {
              style: {
                display: null
              }
            }
          ]
        };

        routing.setActiveIframeToPrevious(node);

        assert.equal(node.children[0].style.display, 'block');
        assert.equal(node.children.length, 1);
      });

      it('goBack', () => {
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
            }
          ]
        };

        routing.setActiveIframeToPrevious(node);

        assert.equal(node.children[0].style.display, 'none');
        assert.equal(node.children[1].style.display, 'block');
        assert.isTrue(node.removeChild.calledWith(node.children[0]));
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
      const component = {
        set: obj => {
          component.get = () => obj;
        }
      };
      const config = {
        iframe: {
          src: 'http://url.com/app.html!#/prevUrl'
        }
      };
      component.set({ viewUrl: 'http://url.com/app.html!#/someUrl' });
      assert.isFalse(routing.isNotSameDomain(config, component));

      component.set({ viewUrl: 'http://otherurl.de/app.html!#/someUrl' });
      assert.isTrue(routing.isNotSameDomain(config, component));
    });
  });
});
