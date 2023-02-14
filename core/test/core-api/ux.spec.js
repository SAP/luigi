import { LuigiUX } from '../../src/core-api';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe('Core API - UX', function() {
  jest.retryTimes(2);
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
      document.querySelector.returns(null);

      expect(() => {
        LuigiUX.hideAppLoadingIndicator();
        clock.tick(1e3);
      }).not.to.throw();
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
      sinon.assert.calledWithExactly(mockIndicatorElem.parentNode.removeChild, mockIndicatorElem);
    });
  });

  describe('removeBackdrop', () => {
    it('post message sent properly', () => {
      window.top.postMessage = sinon.spy();
      LuigiUX.removeBackdrop();
      sinon.assert.calledWithExactly(window.top.postMessage, { msg: 'luigi.remove-backdrop' }, '*');
    });
  });
});
