import { Iframe } from '../../../src/services/iframe';

const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { IframeHelpers, GenericHelpers } from '../../../src/utilities/helpers';
import { LuigiConfig } from '../../../src/core-api';

describe('Iframe-helpers', () => {
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
    sinon.stub(GenericHelpers);
    GenericHelpers.getRandomId.returns('abc');
  });
  afterEach(() => {
    if (document.createElement.restore) {
      document.createElement.restore();
    }
    sinon.restore();
  });

  describe('createIframe', () => {
    it('createIframe', () => {
      const iframe = IframeHelpers.createIframe('http://luigi.url.com/');
      assert.equal(iframe.src, 'http://luigi.url.com/');
    });

    it('createIframe with view group', () => {
      const iframe = IframeHelpers.createIframe(
        'http://luigi.url.de/',
        'ananas'
      );
      assert.equal(iframe.src, 'http://luigi.url.de/');
      assert.equal(iframe.vg, 'ananas');
    });
  });

  describe('canReuseIframe', () => {
    const config = {
      iframe: {
        src: 'http://url.com/app.html!#/prevUrl'
      }
    };

    it('getLocation', () => {
      const url = 'http://.luigi.url.com';
      const iframeOrigin = IframeHelpers.getLocation(url);
      assert.equal(iframeOrigin, url);
    });

    it('getVisibleIframes', () => {
      sinon.stub(document, 'querySelectorAll').callsFake(() => [
        {
          src: 'http://url.com/app.html!#/prevUrl',
          style: { display: 'block' }
        }
      ]);
      const visibleIframes = IframeHelpers.getVisibleIframes();
      assert.equal(visibleIframes.length, 1);
    });

    it('isSameViewGroup', () => {
      config.iframe.src = 'http://otherurl.de/app.html!#/someUrl';
      config.viewGroup = 'tets';
      component.set({
        viewUrl: 'http://otherurl.de/app.html!#/someUrl',
        viewGroup: 'tets',
        previousNodeValues: { viewUrl: config.iframe.src, viewGroup: 'tets' }
      });
      const tets = IframeHelpers.isSameViewGroup(config, component);
      assert.equal(tets, true);
    });

    it('should return true if views have the same domain and different hash', () => {
      config.iframe.src = 'http://url.com/app.html!#/prevUrl';
      component.set({
        viewUrl: 'http://url.com/app.html!#/someUrl',
        previousNodeValues: { viewUrl: config.iframe.src }
      });
      assert.isTrue(IframeHelpers.canReuseIframe(config, component));
    });

    it('should return false if views have different domains', () => {
      component.set({
        viewUrl: 'http://otherurl.de/app.html!#/someUrl',
        previousNodeValues: { viewUrl: config.iframe.src }
      });
      assert.isFalse(IframeHelpers.canReuseIframe(config, component));
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
      assert.isTrue(IframeHelpers.canReuseIframe(config, component));
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
      assert.isFalse(IframeHelpers.canReuseIframe(config, component));
    });

    it('should return false if views have the same domain and no viewGroup defined', () => {
      component.set({
        viewUrl: 'http://url.com/someUrl',
        previousNodeValues: {
          viewUrl: noHashConfig.iframe.src
        }
      });
      assert.isFalse(IframeHelpers.canReuseIframe(config, component));
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
      assert.isFalse(IframeHelpers.canReuseIframe(config, component));
    });
  });

  it('hasIframeIsolation', () => {
    // no node is set to isolateView
    component.set({
      isolateView: false,
      previousNodeValues: { isolateView: false }
    });
    assert.isFalse(IframeHelpers.hasIframeIsolation(component));

    // new node is set to isolateView
    component.set({
      isolateView: true,
      previousNodeValues: { isolateView: false }
    });
    assert.isTrue(IframeHelpers.hasIframeIsolation(component));

    // current node is set to isolateView
    component.set({
      isolateView: false,
      previousNodeValues: { isolateView: true }
    });
    assert.isTrue(IframeHelpers.hasIframeIsolation(component));
  });

  it('getIframeContainer', () => {
    sinon
      .stub(document, 'querySelectorAll')
      .onFirstCall()
      .returns([])
      .onSecondCall()
      .returns(['firstIframe', 'secondIframe']);

    // first
    assert.equal(
      IframeHelpers.getIframeContainer(),
      undefined,
      'no iframe found'
    );
    // second
    assert.equal(
      IframeHelpers.getIframeContainer(),
      'firstIframe',
      'returns first iframe'
    );
  });

  describe('getAllIframes', () => {
    it('should return an array of active iframes with no modal iframe', () => {
      const iframes = IframeHelpers.getAllIframes();

      assert.equal(iframes.length, 0);
    });

    it('should return an array of active iframes including active modal iframe', () => {
      const iframes = IframeHelpers.getAllIframes({});

      assert.equal(iframes.length, 1);
    });
  });
});
