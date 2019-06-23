const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { Iframe } from '../../src/services/iframe';
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
    sinon.stub(LuigiConfig, 'getConfigValue').callsFake(key => {
      if (key === 'navigation.viewGroupSettings') {
        return {
          ham: {
            preloadUrl: 'ham.html'
          },
          cheese: {
            preloadUrl: 'cheese.html'
          },
          ananas: {
            preloadUrl: 'ananas.html'
          }
        };
      }
    });

    node = {
      children: [
        {
          style: {
            display: null
          },
          id: 1,
          vg: 'tets1'
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
            display: null
          },
          id: 4
        },
        {
          style: {
            display: 'none'
          },
          id: 5
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

  describe('create new iframe with different viewgroup and dont delete the previous one (cache)', () => {
    it('navigate', () => {
      sinon.stub(document, 'querySelectorAll').callsFake(() => [
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
        }
      });

      Iframe.navigateIframe(config, component, node);
      assert.equal(node.children.length, 2);
    });
  });

  describe('use cached iframe with same viewgroup and change viewUrl', () => {
    it('navigate', () => {
      sinon.stub(document, 'querySelectorAll').callsFake(() => [
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
        }
      });
      assert.equal(config.iframe.luigi.nextViewUrl, 'http://luigi.url.de/2');
      Iframe.navigateIframe(config, component, node);
      assert.equal(config.iframe.luigi.nextViewUrl, 'http://luigi.url.de/1');
    });
  });

  describe('preload view groups', () => {
    it('preload', () => {
      const iframes = [
        {
          src: 'http://luigi.url.de',
          vg: 'tets1',
          luigi: {
            viewUrl: 'http://luigi.url.de'
          },
          style: { display: 'block' }
        }
      ];
      const container = {
        appendChild: child => {
          iframes.push(child);
        }
      };
      sinon.stub(document, 'querySelectorAll').callsFake(sel => {
        if (sel === '.iframeContainer') {
          return [container];
        } else if (sel === '.iframeContainer iframe') {
          return [...iframes];
        }
      });

      Iframe.preloadViewGroups(2);

      assert.equal(iframes.length, 3);
      assert.equal(iframes[0].src, 'http://luigi.url.de');
      assert.equal(iframes[0].luigi.viewUrl, 'http://luigi.url.de');
      assert.equal(iframes[0].luigi.preloading, undefined);
      assert.equal(iframes[0].style.display, 'block');
      assert.equal(iframes[0].vg, 'tets1');
      assert.equal(iframes[1].src, 'ham.html');
      assert.equal(iframes[1].luigi.viewUrl, 'ham.html');
      assert.equal(iframes[1].luigi.preloading, true);
      assert.equal(iframes[1].style.display, 'none');
      assert.equal(iframes[1].vg, 'ham');
      assert.equal(iframes[2].src, 'cheese.html');
      assert.equal(iframes[2].luigi.viewUrl, 'cheese.html');
      assert.equal(iframes[2].luigi.preloading, true);
      assert.equal(iframes[2].style.display, 'none');
      assert.equal(iframes[2].vg, 'cheese');

      Iframe.preloadViewGroups(2);

      assert.equal(iframes.length, 3);

      iframes.forEach(i => (i.luigi.preloading = false));

      Iframe.preloadViewGroups(2);

      assert.equal(iframes.length, 4);
      assert.equal(iframes[3].src, 'ananas.html');
      assert.equal(iframes[3].luigi.viewUrl, 'ananas.html');
      assert.equal(iframes[3].luigi.preloading, true);
      assert.equal(iframes[3].style.display, 'none');
      assert.equal(iframes[3].vg, 'ananas');
    });
  });
});
