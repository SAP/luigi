const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const Iframe = require('../../src/services/iframe');
import { afterEach } from 'mocha';
import { LuigiConfig } from '../../src/services/config';

describe('Iframe', () => {
  let node;

  beforeEach(() => {
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
          pv: 'pv',
          id: 2
        },
        {
          style: {
            display: null
          },
          id: 3
        },
        {
          style: {
            display: 'none'
          },
          id: 4
        },
        {
          style: {
            display: 'none'
          },
          vg: 'tets',
          id: 4
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
    it('goBack with preserved view situation', () => {
      sinon.stub(document, 'querySelectorAll').callsFake(() => node.children);
      Iframe.setActiveIframeToPrevious(node);

      assert.equal(node.children.length, 4);
      assert.equal(node.children[0].style.display, 'block');
    });
  });

  describe('getAllIframes', () => {
    it('should return an array of active iframes with no modal iframe', () => {
      const iframes = Iframe.getAllIframes();

      assert.equal(iframes.length, 0);
    });

    it('should return an array of active iframes including active modal iframe', () => {
      const iframes = Iframe.getAllIframes({});

      assert.equal(iframes.length, 1);
    });
  });

  it('removeInactiveIframes', () => {
    node.removeChild = sinon.spy();
    Iframe.removeInactiveIframes(node);

    assert.equal(node.removeChild.callCount, 1);
  });
});
