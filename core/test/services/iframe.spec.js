const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { Iframe } from '../../src/services/iframe';
import {
  GenericHelpers,
  RoutingHelpers,
  IframeHelpers
} from '../../src/utilities/helpers';
import { LuigiConfig } from '../../src/core-api';

describe('Iframe', () => {
  let node;
  let component;

  beforeEach(() => {
    let lastObj = {};
    component = {
      set: obj => {
        Object.assign(lastObj, obj);
      },
      get: () => lastObj,
      prepareInternalData: () => {}
    };
    sinon.stub(LuigiConfig, 'getConfigValue').callsFake();
    sinon.stub(GenericHelpers);
    GenericHelpers.getRandomId.returns('abc');
    sinon.stub(RoutingHelpers, 'substituteViewUrl');
    GenericHelpers.isElementVisible.callsFake(element => element.visible);

    node = {
      children: [
        {
          style: {},
          visible: true,
          id: 1,
          vg: 'tets1',
          tagName: 'IFRAME'
        },
        {
          style: {},
          visible: true,
          pv: 'pv',
          id: 2,
          tagName: 'IFRAME'
        },
        {
          style: {},
          visible: true,
          id: 3,
          tagName: 'IFRAME'
        },
        {
          style: {},
          visible: false,
          id: 4,
          tagName: 'IFRAME'
        },
        {
          style: {},
          visible: true,
          id: 5,
          tagName: 'IFRAME'
        }
      ],
      removeChild: child => {
        node.children.forEach((c, i) => {
          if (c === child) {
            node.children.splice(i, 1);
          }
        });
      },
      firstChild: () => {
        node.children[0];
      },
      insertBefore: (iframe, child) => {
        node.children.unshift(iframe);
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
      sinon
        .stub(IframeHelpers, 'getMainIframes')
        .callsFake(() => node.children);
      Iframe.setActiveIframeToPrevious(node);

      assert.equal(node.children.length, 4);
      assert.equal(node.children[0].style.display, 'block');
    });
  });

  it('removeInactiveIframes', () => {
    node.removeChild = sinon.spy();
    Iframe.removeInactiveIframes(node);
    sinon.assert.calledOnce(node.removeChild);
    sinon.assert.calledWithExactly(node.removeChild, {
      id: 4,
      style: {},
      visible: false,
      tagName: 'IFRAME'
    });
  });

  it('removeIframe', () => {
    const testNode = {
      children: ['one', 'two', 'three', 'four'],
      removeChild: sinon.spy()
    };
    Iframe.removeIframe('two', testNode);
    assert.equal(testNode.removeChild.callCount, 1, 'removeChild call count');
    assert(
      testNode.removeChild.calledWith('two'),
      'correct node child was deleted'
    );
  });

  describe('create new iframe with different viewgroup and dont delete the previous one (cache)', () => {
    it('navigate', () => {
      sinon.stub(IframeHelpers, 'getMainIframes').callsFake(() => [
        {
          src: 'http://url.com/app.html!#/prevUrl',
          style: { display: 'block' },
          vg: 'tets1'
        }
      ]);
      const config = {
        iframe: {
          src: 'http://luigi.url.de',
          vg: 'tets2'
        }
      };
      component.set({
        viewUrl: 'http://luigi.url.de/1',
        viewGroup: 'tets2',
        previousNodeValues: {
          viewUrl: 'http://luigi.url.desdf/1'
        },
        currentNode: {}
      });

      Iframe.navigateIframe(config, component, node);
      assert.equal(node.children.length, 2);
    });
  });

  describe('use cached iframe with same viewgroup and change viewUrl', () => {
    it('navigate', () => {
      sinon.stub(IframeHelpers, 'getMainIframes').callsFake(() => [
        {
          src: 'http://luigi.url.de',
          vg: 'tets1',
          luigi: {
            nextViewUrl: 'http://luigi.url.de/2'
          },
          style: { display: 'block' }
        }
      ]);
      const config = {
        iframe: {
          src: 'http://luigi.url.de',
          vg: 'tets1',
          luigi: {
            nextViewUrl: 'http://luigi.url.de/2'
          }
        },
        navigateOk: true
      };
      component.set({
        viewUrl: 'http://luigi.url.de/1',
        viewGroup: 'tets1',
        previousNodeValues: {
          viewUrl: 'http://luigi.url.de/previous'
        },
        currentNode: {}
      });
      RoutingHelpers.substituteViewUrl.returns('http://luigi.url.de/1m');

      assert.equal(config.iframe.luigi.nextViewUrl, 'http://luigi.url.de/2');
      Iframe.navigateIframe(config, component, node);
      assert.equal(config.iframe.luigi.nextViewUrl, 'http://luigi.url.de/1m');
    });
  });
});
