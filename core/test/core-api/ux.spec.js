const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { LuigiUX } from '../../src/core-api';

describe('Core API - UX', function() {
  this.retries(2);
  let clock;

  const buildMockElement = () => {
    return {
      classList: {
        add: sinon.spy()
      },
      parentNode: {
        removeChild: sinon.spy()
      }
    };
  };

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    sinon.stub(document, 'querySelector');
    sinon.spy(LuigiUX, 'hideAppLoadingIndicator');
  });
  afterEach(() => {
    sinon.restore();
    clock.restore();
  });

  describe('hideAppLoadingIndicator', () => {
    it('without indicator', () => {
      // given
      document.querySelector.returns(null);

      // when
      LuigiUX.hideAppLoadingIndicator();
      clock.tick(1e3);

      // then, it should just not fail
    });

    it('with app loading indicator', () => {
      // given
      const mockIndicatorElem = buildMockElement();
      document.querySelector.returns(mockIndicatorElem);

      // when
      LuigiUX.hideAppLoadingIndicator();
      clock.tick(1e3);

      // then
      sinon.assert.calledWithExactly(mockIndicatorElem.classList.add, 'hidden');
      sinon.assert.calledWithExactly(
        mockIndicatorElem.parentNode.removeChild,
        mockIndicatorElem
      );
    });
  });
});
