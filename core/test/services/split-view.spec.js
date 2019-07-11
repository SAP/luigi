const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { SplitViewSvc } from '../../src/services';
import {
  GenericHelpers,
  IframeHelpers,
  RoutingHelpers
} from '../../src/utilities/helpers';
import { LuigiConfig } from '../../src/core-api';

describe('SplitViewSvc', () => {
  let node;
  let component;
  let preloadingAllowed;

  beforeEach(() => {
    let lastObj = {};
    component = {
      set: obj => {
        Object.assign(lastObj, obj);
      },
      get: () => lastObj,
      prepareInternalData: () => {}
    };

    sinon.stub(component);
    sinon.stub(LuigiConfig);
    sinon.stub(RoutingHelpers);
    sinon.stub(IframeHelpers);
    sinon.stub(GenericHelpers);
    sinon.stub(document, 'querySelector');
  });

  afterEach(() => {
    if (document.querySelector.restore) {
      document.querySelector.restore();
    }
    sinon.restore();
  });

  it('getDefaultData', () => {
    assert.deepEqual(SplitViewSvc.getDefaultData(), {
      mfSplitView: {
        isDisplayed: false,
        settings: {}
      }
    });
  });

  describe('setSplitViewIframe', () => {
    it('without viewUrl', () => {
      const frame = { frame: 1 };
      const splitFrame = { frame: 2 };
      document.querySelector.returns({ appendChild: sinon.spy() });
      IframeHelpers.createIframe.returns(splitFrame);

      const res = SplitViewSvc.setSplitViewIframe(
        null,
        'componentData',
        'component'
      );

      sinon.assert.calledWith(IframeHelpers.createIframe, null);
      sinon.assert.notCalled(RoutingHelpers.substituteViewUrl);
      assert.deepEqual(res, splitFrame);
    });

    it('with viewUrl', () => {
      const frame = { frame: 1 };
      const splitFrame = { frame: 2 };
      document.querySelector.returns({ appendChild: sinon.spy() });
      IframeHelpers.createIframe.returns(splitFrame);
      RoutingHelpers.substituteViewUrl.returns('otherUrl');

      const res = SplitViewSvc.setSplitViewIframe(
        'viewUrl',
        'componentData',
        'component'
      );

      sinon.assert.calledWith(
        RoutingHelpers.substituteViewUrl,
        'viewUrl',
        'componentData'
      );
      sinon.assert.calledWith(IframeHelpers.createIframe, 'otherUrl');
      assert.deepEqual(res, splitFrame);
    });
  });
});
