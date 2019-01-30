const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const Iframe = require('../../src/services/iframe');
import { afterEach } from 'mocha';
import { LuigiConfig } from '../../src/services/config';

describe('Iframe', () => {
  let component;
  let node;

  beforeEach(() => {
    let lastObj = {};
    component = {
      set: obj => {
        Object.assign(lastObj, obj);
      },
      get: () => lastObj
    };

    sinon.stub(LuigiConfig, 'getConfigValue');

    node = {
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
        },
        {
          style: {
            display: null
          },
          id: 3
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
  });

  afterEach(() => {
    if (document.createElement.restore) {
      document.createElement.restore();
    }
    sinon.restore();
  });

  describe('setActiveIframeToPrevious', () => {
    it('standard', () => {
      Iframe.setActiveIframeToPrevious(node);

      assert.equal(node.children.length, 2);
      assert.equal(node.children[0].style.display, 'block');
    });

    it('goBack', () => {
      Iframe.setActiveIframeToPrevious(node);

      assert.equal(node.children.length, 2);
      assert.equal(node.children[0].style.display, 'block');
      assert.equal(node.children[0].id, 2);
    });
  });

  it('removeInactiveIframes', () => {
    node.removeChild = sinon.spy();
    Iframe.removeInactiveIframes(node);

    assert.equal(node.removeChild.callCount, 2);
  });
});
