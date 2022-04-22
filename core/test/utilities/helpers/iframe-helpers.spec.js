const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { IframeHelpers, GenericHelpers } from '../../../src/utilities/helpers';
import { LuigiConfig, LuigiI18N, LuigiTheming, LuigiFeatureToggles } from '../../../src/core-api';
import { ViewUrlDecorator } from '../../../src/services';

describe('Iframe-helpers', () => {
  let component;
  let customSandboxRules = ['allow-scripts', 'rules1', 'rules2'];
  let allowRules = ['microphone', 'geolocation'];

  beforeEach(() => {
    let lastObj = {};
    component = {
      set: obj => {
        Object.assign(lastObj, obj);
      },
      get: () => lastObj
    };

    sinon.stub(GenericHelpers);
    sinon.stub(ViewUrlDecorator);
    GenericHelpers.getRandomId.returns('abc');
    GenericHelpers.isFunction.callThrough();
    ViewUrlDecorator.hasDecorators.returns(false);
    ViewUrlDecorator.applyDecorators.callsFake(url => url);
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
      sinon.assert.notCalled(ViewUrlDecorator.applyDecorators);
    });

    it('createIframe with view group', () => {
      const iframe = IframeHelpers.createIframe('http://luigi.url.de/', 'ananas');
      assert.equal(iframe.src, 'http://luigi.url.de/');
      assert.equal(iframe.vg, 'ananas');
    });

    it('createIframe with customrules', () => {
      sinon.stub(LuigiConfig, 'getConfigValue').returns(customSandboxRules);
      const iframe = IframeHelpers.createIframe('http://luigi.url.com/');
      assert.equal(
        iframe.sandbox,
        'allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts rules1 rules2'
      );
    });

    it('createIframe with allowrules', () => {
      sinon.stub(LuigiConfig, 'getConfigValue').returns(allowRules);
      const iframe = IframeHelpers.createIframe('http://luigi.url.com/');
      assert.equal(iframe.allow, 'microphone geolocation');
    });

    it('createIframe with interceptor', () => {
      const icf = () => {};
      const interceptor = sinon.spy(icf);
      sinon
        .stub(LuigiConfig, 'getConfigValue')
        .withArgs('settings.iframeCreationInterceptor')
        .returns(interceptor);
      const node = {
        pathSegment: 'tets'
      };
      const iframe = IframeHelpers.createIframe('http://luigi.url.com/', 'vg1', node, 'main');
      assert(interceptor.calledWith(iframe, 'vg1', node, 'main'));
    });
    it('createIframe with viewUrlDecorator', () => {
      const mockUrl = 'http://luigi.url.com/';
      ViewUrlDecorator.hasDecorators.returns(true);

      const iframe = IframeHelpers.createIframe(mockUrl);

      assert.equal(iframe.src, mockUrl);

      sinon.assert.calledOnce(ViewUrlDecorator.hasDecorators);
      sinon.assert.calledWithExactly(ViewUrlDecorator.applyDecorators, mockUrl);
    });
  });

  it('removeIframe', () => {
    const testNode = {
      children: ['one', 'two', 'three', 'four'],
      removeChild: sinon.spy()
    };
    IframeHelpers.removeIframe('two', testNode);
    assert.equal(testNode.removeChild.callCount, 1, 'removeChild call count');
    assert(testNode.removeChild.calledWith('two'), 'correct node child was deleted');
  });

  describe('ie fix for domain check', () => {
    const sb = sinon.createSandbox();
    const href = 'https://luigi.url.com/sdf/sdf';

    afterEach(() => {
      sb.restore();
    });

    it('urlMatchesTheDomain', () => {
      let domain = 'https://luigi.url.com/fd';
      assert.isTrue(IframeHelpers.urlMatchesTheDomain(href, domain));
    });

    it('!urlMatchesTheDomain', () => {
      let domain = 'http://luigi.url.com/fd';
      assert.isFalse(IframeHelpers.urlMatchesTheDomain(href, domain));
    });

    it('ie11 urlMatchesTheDomain', () => {
      let domain = 'https://luigi.url.com/bla/bli';
      let a1 = document.createElement('a');
      let a2 = document.createElement('a');
      sb.stub(document, 'createElement')
        .callThrough()
        .withArgs('a')
        .callsFake(() => {
          if (a1.stubReturned) {
            return a2;
          } else {
            a1.stubReturned = true;
            return a1;
          }
        });
      // Mimic IE11 behaviour
      // no origin
      sb.stub(a1, 'origin').value(undefined);
      sb.stub(a2, 'origin').value(undefined);
      // add port to https urls
      sb.stub(a1, 'host').get(() => {
        return a1.protocol === 'https:' ? a1.hostname + ':443' : a1.hostname;
      });
      sb.stub(a2, 'host').get(() => {
        return a2.protocol === 'https:' ? a2.hostname + ':443' + a2.port : a2.hostname;
      });
      assert.isTrue(IframeHelpers.urlMatchesTheDomain(href, domain));
      expect(a1.host).to.equal('luigi.url.com:443');
      expect(a2.host).to.equal('luigi.url.com:443');
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

  it('getIframeContainer', () => {
    sinon
      .stub(document, 'querySelectorAll')
      .onFirstCall()
      .returns([])
      .onSecondCall()
      .returns(['firstIframe', 'secondIframe']);

    // first
    assert.equal(IframeHelpers.getIframeContainer(), undefined, 'no iframe found');
    // second
    assert.equal(IframeHelpers.getIframeContainer(), 'firstIframe', 'returns first iframe');
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
        .withArgs('.iframeModalCtn._modal iframe') // 'modal'
        .returns([mockContainer('modal')])
        .withArgs('.iframeModalCtn._drawer iframe') // 'drawer'
        .returns([mockContainer('drawer')])
        .withArgs('.iframeUserSettingsCtn iframe') // 'usersettings'
        .returns([mockContainer('usersettings')]);

      GenericHelpers.isElementVisible.callsFake(container => {
        // second container is not active
        return container.luigi.id !== 'main_2';
      });
      const iframes = IframeHelpers.getMicrofrontendsInDom();
      assert.equal(iframes.length, 6, 'total iframes');
      assert.equal(iframes.filter(i => i.active).length, 5, 'active iframes');

      const expectedKeys = ['id', 'container', 'active', 'type'];
      assert.deepEqual(Object.keys(iframes[0]), expectedKeys, 'contains all required keys');

      const mainIframes = IframeHelpers.getMainIframes('main');
      assert.equal(mainIframes.length, 2);
      const modalIframes = IframeHelpers.getModalIframes('modal');
      assert.equal(modalIframes.length, 1);
    });
  });
  describe('applyCoreStateData', () => {
    it('applyCoreStateData', () => {
      sinon.stub(LuigiTheming, 'getCurrentTheme').returns('any');
      sinon.stub(LuigiFeatureToggles, 'getActiveFeatureToggleList').returns(['featureToggle']);
      sinon
        .stub(LuigiI18N, 'getCurrentLocale')
        .returns({ currentLocaleStorageKey: 'luigi.currentluigi', defaultLocale: 'luigi' });
      const internalData = { context: 'luigi' };
      const expected = {
        activeFeatureToggleList: ['featureToggle'],
        currentLocale: {
          currentLocaleStorageKey: 'luigi.currentluigi',
          defaultLocale: 'luigi'
        },
        currentTheme: 'any'
      };
      assert.deepEqual(IframeHelpers.applyCoreStateData(internalData), {
        context: 'luigi',
        ...expected
      });
      assert.deepEqual(IframeHelpers.applyCoreStateData(undefined), expected);
    });
  });

  describe('disable/enable keyboard accessibility on background elements', () => {
    /**
     * Ths function produces this html containing 6 DOM elements inside the body tag
     * <html>
     * <head>
     *    <title>Mocked DOM</title>
     * </head>
     * <body>
     *   <div>
     *     <span class="outsideModal">I am some text</span>
     *     <span tabindex="0" class="oldTabIndexOutsideModal">I am a text span with existing tabindex value</span>
     *     <div class="modalElement">
     *        <button>Click me</button>
     *        <button class="oldTabIndexInModal" tabindex="1">Click that</button>
     *     </div>
     *   </div>
     * </body>
     * </html>
     *
     * @returns mocked data
     */
    const getMockedDocument = () => {
      let doc = document.implementation.createHTMLDocument('Mocked DOM');

      const divParent = doc.createElement('div');
      divParent.className = 'divParent';
      doc.body.appendChild(divParent);

      const spanChild = doc.createElement('span');
      spanChild.textContent = 'I am some text';
      spanChild.className = 'spanChild';
      divParent.appendChild(spanChild);

      const spanChild2 = doc.createElement('span');
      spanChild2.textContent = 'I am a text span with existing tabindex value';
      spanChild2.setAttribute('tabindex', '0');
      spanChild2.className = 'oldTabIndexOutsideModal';

      divParent.appendChild(spanChild2);
      divParent.appendChild(spanChild2);

      const divChild = doc.createElement('div');
      divChild.className = 'modalElement';

      const childButton1 = doc.createElement('button');
      childButton1.textContent = 'Click me';
      childButton1.className = 'childButton1';

      const childButton2 = doc.createElement('button');
      childButton2.textContent = 'Click that';
      childButton2.className = 'oldTabIndexInModal';
      childButton2.setAttribute('tabindex', '1');

      divChild.appendChild(childButton1);
      divChild.appendChild(childButton2);
      divParent.appendChild(divChild);
      return doc;
    };

    describe('disableA11YKeyboardExceptClassName', () => {
      beforeEach(() => {
        global.document = getMockedDocument();
      });

      it('saves old tabindex value properly', () => {
        IframeHelpers.disableA11YKeyboardExceptClassName('.modalElement');
        assert.equal(global.document.getElementsByClassName('oldTabIndexOutsideModal')[0].getAttribute('oldtab'), 0);
        assert.isNull(global.document.getElementsByClassName('oldTabIndexInModal')[0].getAttribute('oldtab'));
      });

      it('set tabindex properly on all but specified classname element', () => {
        IframeHelpers.disableA11YKeyboardExceptClassName('.modalElement');
        assert.equal(global.document.getElementsByClassName('divParent')[0].getAttribute('tabindex'), -1);
        assert.equal(global.document.getElementsByClassName('spanChild')[0].getAttribute('tabindex'), -1);
        assert.equal(global.document.getElementsByClassName('oldTabIndexOutsideModal')[0].getAttribute('tabindex'), -1);
        assert.isNull(global.document.getElementsByClassName('modalElement')[0].getAttribute('tabindex'));
        assert.isNull(global.document.getElementsByClassName('childButton1')[0].getAttribute('tabindex'));
        assert.equal(global.document.getElementsByClassName('oldTabIndexInModal')[0].getAttribute('tabindex'), 1);
      });
    });

    describe('enableA11YKeyboardBackdrop', () => {
      beforeEach(() => {
        global.document = getMockedDocument();
        IframeHelpers.disableA11YKeyboardExceptClassName('.modalElement');
      });

      it('check oldtab property properly removed', () => {
        IframeHelpers.enableA11YKeyboardBackdropExceptClassName('.modalElement');
        assert.isNull(global.document.getElementsByClassName('divParent')[0].getAttribute('oldtab'));
        assert.isNull(global.document.getElementsByClassName('spanChild')[0].getAttribute('oldtab'));
        assert.isNull(global.document.getElementsByClassName('oldTabIndexOutsideModal')[0].getAttribute('oldtab'));
        assert.isNull(global.document.getElementsByClassName('modalElement')[0].getAttribute('oldtab'));
        assert.isNull(global.document.getElementsByClassName('childButton1')[0].getAttribute('oldtab'));
        assert.isNull(global.document.getElementsByClassName('oldTabIndexInModal')[0].getAttribute('oldtab'));
      });

      it('check oldtabindex value properly restored', () => {
        IframeHelpers.enableA11YKeyboardBackdropExceptClassName('.modalElement');
        assert.isNull(global.document.getElementsByClassName('divParent')[0].getAttribute('tabindex'));
        assert.isNull(global.document.getElementsByClassName('spanChild')[0].getAttribute('tabindex'));
        assert.equal(global.document.getElementsByClassName('oldTabIndexOutsideModal')[0].getAttribute('tabindex'), 0);
        assert.isNull(global.document.getElementsByClassName('modalElement')[0].getAttribute('tabindex'));
        assert.isNull(global.document.getElementsByClassName('childButton1')[0].getAttribute('tabindex'));
        assert.equal(global.document.getElementsByClassName('oldTabIndexInModal')[0].getAttribute('tabindex'), 1);
      });
    });
  });
});
