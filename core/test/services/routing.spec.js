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
});
