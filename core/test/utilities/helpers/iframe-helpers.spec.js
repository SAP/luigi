const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { IframeHelpers, GenericHelpers } from '../../../src/utilities/helpers';
import { LuigiConfig } from '../../../src/core-api';

describe('Iframe-helpers', () => {
  let component;
  let customSandboxRules = ['allow-scripts', 'rules1', 'rules2'];

  beforeEach(() => {
    let lastObj = {};
    component = {
      set: obj => {
        Object.assign(lastObj, obj);
      },
      get: () => lastObj
    };

    sinon.stub(GenericHelpers);
    GenericHelpers.getRandomId.returns('abc');
    sinon.stub(LuigiConfig, 'getConfigValue').returns(customSandboxRules);
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

    it('createIframe with cutomrules', () => {
      const iframe = IframeHelpers.createIframe('http://luigi.url.com/');
      assert.equal(
        iframe.sandbox,
        'allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts rules1 rules2'
      );
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
      sinon.stub(IframeHelpers, 'getMicrofrontendsInDom').callsFake(() => [
        {
          id: 1223,
          active: true,
          container: 'mock-html-element',
          type: 'main'
        }
      ]);
      const visibleIframes = IframeHelpers.getVisibleIframes();
      assert.deepEqual(visibleIframes, ['mock-html-element']);
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
      const prevUrl = 'http://otherurl.de/app.html';
      const nextUrl = 'http://nexturl.de/app.html';
      component.set({
        viewUrl: 'nextUrl',
        previousNodeValues: { viewUrl: 'prevUrl' }
      });
      GenericHelpers.getUrlWithoutHash.resetHistory();
      GenericHelpers.getUrlWithoutHash.withArgs('prevUrl').returns(prevUrl);
      GenericHelpers.getUrlWithoutHash.withArgs('nextUrl').returns(nextUrl);

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
      const nextUrl = 'http://nexturl.de/app.html';
      GenericHelpers.getUrlWithoutHash.resetHistory();
      GenericHelpers.getUrlWithoutHash.returns(nextUrl);

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

    it('should return false if views have different domains and the same viewGroup', () => {
      const prevUrl = 'http://otherurl.de/app.html';
      const nextUrl = 'http://nexturl.de/app.html';

      GenericHelpers.getUrlWithoutHash.resetHistory();
      GenericHelpers.getUrlWithoutHash.withArgs('prevUrl').returns(prevUrl);
      GenericHelpers.getUrlWithoutHash.withArgs('nextUrl').returns(nextUrl);
      component.set({
        viewUrl: 'nextUrl',
        viewGroup: 'firstSPA',
        previousNodeValues: {
          viewUrl: 'prevUrl',
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

  describe('getMicrofrontendsInDom', () => {
    it('gets list of visible mfs', () => {
      const mockContainer = id => ({
        luigi: { id }
      });
      sinon
        .stub(document, 'querySelectorAll')
        .withArgs('.iframeContainer iframe') // 'main'
        .returns([mockContainer('main_1'), mockContainer('main_2')])
        .withArgs('.iframeSplitViewCnt iframe') // 'split-view'
        .returns([mockContainer('split_1')])
        .withArgs('.iframeModalCtn iframe') // 'modal'
        .returns([mockContainer('modal')]);

      GenericHelpers.isElementVisible.callsFake(container => {
        // second container is not active
        return container.luigi.id !== 'main_2';
      });

      const iframes = IframeHelpers.getMicrofrontendsInDom();
      assert.equal(iframes.length, 4, 'total iframes');
      assert.equal(iframes.filter(i => i.active).length, 3, 'active iframes');

      const expectedKeys = ['id', 'container', 'active', 'type'];
      assert.deepEqual(
        Object.keys(iframes[0]),
        expectedKeys,
        'contains all required keys'
      );
    });
  });
});
