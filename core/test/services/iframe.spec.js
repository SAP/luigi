const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const Iframe = require('../../src/services/iframe');
import { afterEach } from 'mocha';
import { LuigiConfig } from '../../src/services/config';

describe('Iframe', () => {
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

      Iframe.setActiveIframeToPrevious(node);

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

      Iframe.setActiveIframeToPrevious(node);

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

    Iframe.removeInactiveIframes(node);

    assert.equal(node.removeChild.callCount, 2);
  });
});
