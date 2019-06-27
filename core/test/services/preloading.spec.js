const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { Iframe } from '../../src/services/iframe';
import { ViewGroupPreloading } from '../../src/services/preloading';
import { LuigiConfig } from '../../src/core-api';

describe('Iframe', () => {
  let component;
  let preloadingAllowed;
  let clock;
  let container;
  let iframes;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    let lastObj = {};
    component = {
      set: obj => {
        Object.assign(lastObj, obj);
      },
      get: () => lastObj,
      prepareInternalData: () => {}
    };
    preloadingAllowed = false;
    sinon.stub(LuigiConfig, 'getConfigValue').callsFake(key => {
      if (key === 'navigation.preloadViewGroups') {
        return preloadingAllowed ? undefined : false;
      }
    });
    iframes = [
      {
        src: 'http://luigi.url.de',
        vg: 'tets1',
        luigi: {
          viewUrl: 'http://luigi.url.de'
        },
        style: { display: 'block' }
      }
    ];
    container = {
      appendChild: child => {
        iframes.push(child);
      }
    };
    sinon.stub(Iframe, 'getAllViewGroupSettings').callsFake(() => {
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
    });
    sinon.stub(Iframe, 'getIframeContainer').callsFake(() => {
      return container;
    });
    sinon.stub(Iframe, 'getAllIframes').callsFake(() => {
      return [...iframes];
    });
  });

  afterEach(() => {
    clock.restore();
    if (document.createElement.restore) {
      document.createElement.restore();
    }
    sinon.restore();
  });

  describe('preload view groups', () => {
    it('preloading disabled', () => {
      ViewGroupPreloading.preloadViewGroups(2);

      assert.equal(iframes.length, 1);
      assert.equal(iframes[0].src, 'http://luigi.url.de');
      assert.equal(iframes[0].luigi.viewUrl, 'http://luigi.url.de');
      assert.equal(iframes[0].luigi.preloading, undefined);
      assert.equal(iframes[0].style.display, 'block');
      assert.equal(iframes[0].vg, 'tets1');
    });

    it('initial preloading', () => {
      preloadingAllowed = true;

      ViewGroupPreloading.preloadViewGroups(2);

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
    });

    it('preloading with partially already existing frames', () => {
      preloadingAllowed = true;

      iframes.push({
        vg: 'ham',
        src: 'ham2.html',
        luigi: {
          viewUrl: 'ham2.html'
        }
      });
      iframes.push({
        vg: 'cheese',
        src: 'cheese2.html',
        luigi: {
          viewUrl: 'cheese2.html'
        }
      });

      ViewGroupPreloading.preloadViewGroups(2);

      assert.equal(iframes.length, 4);
      assert.equal(iframes[0].src, 'http://luigi.url.de');
      assert.equal(iframes[0].luigi.viewUrl, 'http://luigi.url.de');
      assert.equal(iframes[0].luigi.preloading, undefined);
      assert.equal(iframes[0].style.display, 'block');
      assert.equal(iframes[0].vg, 'tets1');
      assert.equal(iframes[1].vg, 'ham');
      assert.equal(iframes[1].luigi.viewUrl, 'ham2.html');
      assert.equal(iframes[1].src, 'ham2.html');
      assert.equal(iframes[1].luigi.preloading, undefined);
      assert.equal(iframes[2].src, 'cheese2.html');
      assert.equal(iframes[2].luigi.viewUrl, 'cheese2.html');
      assert.equal(iframes[2].luigi.preloading, undefined);
      assert.equal(iframes[2].vg, 'cheese');
      assert.equal(iframes[3].src, 'ananas.html');
      assert.equal(iframes[3].luigi.viewUrl, 'ananas.html');
      assert.equal(iframes[3].luigi.preloading, true);
      assert.equal(iframes[3].style.display, 'none');
      assert.equal(iframes[3].vg, 'ananas');
    });

    it('loaded', () => {
      const iframe = {
        src: 'http://luigi.url.de',
        vg: 'tets1',
        luigi: {
          viewUrl: 'http://luigi.url.de',
          preloading: true,
          createdAt: new Date().getTime() - 600
        },
        style: { display: 'block' }
      };

      ViewGroupPreloading.viewGroupLoaded(iframe);

      assert.equal(ViewGroupPreloading.preloadBatchSize, 2);
      assert.equal(iframe.luigi.preloading, true);

      clock.tick(1100);

      assert.equal(iframe.luigi.preloading, false);
    });
  });
});
