const chai = require('chai');
const assert = chai.assert;

import {
  isNotSameDomain,
  hasIframeIsolation
} from '../../src/utilities/helpers-general.js';

describe('Helpers-general', () => {
  let component;
  beforeEach(() => {
    let lastObj = {};
    component = {
      set: obj => {
        Object.assign(lastObj, obj);
      },
      get: () => lastObj
    };
  });
  afterEach(() => {
    if (document.createElement.restore) {
      document.createElement.restore();
    }
  });
  it('isNotSameDomain', () => {
    const config = {
      iframe: {
        src: 'http://url.com/app.html!#/prevUrl'
      }
    };
    component.set({
      viewUrl: 'http://url.com/app.html!#/someUrl',
      previousNodeValues: { viewUrl: config.iframe.src }
    });
    assert.isFalse(isNotSameDomain(config, component));

    component.set({
      viewUrl: 'http://otherurl.de/app.html!#/someUrl',
      previousNodeValues: { viewUrl: config.iframe.src }
    });
    assert.isTrue(isNotSameDomain(config, component));
  });

  it('hasIframeIsolation', () => {
    // no node is set to isolateView
    component.set({
      isolateView: false,
      previousNodeValues: { isolateView: false }
    });
    assert.isFalse(hasIframeIsolation(component));

    // new node is set to isolateView
    component.set({
      isolateView: true,
      previousNodeValues: { isolateView: false }
    });
    assert.isTrue(hasIframeIsolation(component));

    // current node is set to isolateView
    component.set({
      isolateView: false,
      previousNodeValues: { isolateView: true }
    });
    assert.isTrue(hasIframeIsolation(component));
  });
});
