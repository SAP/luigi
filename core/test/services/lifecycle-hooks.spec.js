const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { LifecycleHooks } from '../../src/services/lifecycle-hooks';
import { LuigiConfig, LuigiUX } from '../../src/core-api';

describe('LifecycleHooks', function() {
  this.retries(2);
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    sinon.stub(LuigiConfig, 'getConfigBooleanValue');
    sinon.spy(LuigiUX, 'hideAppLoadingIndicator');
  });
  afterEach(() => {
    sinon.restore();
    clock.restore();
  });

  describe('luigiAfterInit', () => {
    it('hideAutomatically set to true', () => {
      // given
      LuigiConfig.getConfigBooleanValue.returns(true);

      // when
      LifecycleHooks.luigiAfterInit();
      clock.tick(1e3);

      // then
      sinon.assert.called(LuigiUX.hideAppLoadingIndicator);
    });

    it('hideAutomatically set to false', () => {
      // given
      LuigiConfig.getConfigBooleanValue.returns(false);

      // when
      LifecycleHooks.luigiAfterInit();
      clock.tick(1e3);

      // then
      sinon.assert.notCalled(LuigiUX.hideAppLoadingIndicator);
    });
  });
});
