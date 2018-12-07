const chai = require('chai');

const assert = chai.assert;
const sinon = require('sinon');

const routing = require('../../src/services/routing');

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

  describe('buildFromRelativePath()', () => {
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

    it('should return true if views have the same domain and different hash', () => {
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

    it('should return true if views have the same domain and viewGroup', () => {
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

    it('should return false if views have the same domian and different viewGroups', () => {
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

    it('should return false if views have the same domain and no viewGroup defined', () => {
      component.set({
        viewUrl: 'http://url.com/someUrl',
        previousNodeValues: {
          viewUrl: noHashConfig.iframe.src
        }
      });
      assert.isFalse(routing.isSameViewGroup(config, component));
    });

    it('should return false if views have different domains and the same viewGroup', () => {
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
});
