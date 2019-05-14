const chai = require('chai');
const assert = chai.assert;
const AsyncHelpers = require('../../../src/utilities/helpers/async-helpers');
const GenericHelpers = require('../../../src/utilities/helpers/generic-helpers');
const sinon = require('sinon');

describe('Async-helpers', () => {
  beforeEach(() => {
    // sinon.stub(LuigiConfig, 'getConfigValue');
  });
  afterEach(() => {
    // sinon.restore();
  });

  describe('wrapAsPromise', () => {
    it('returns a wrapped promise', async () => {
      const value = 'my value';

      const prom = AsyncHelpers.wrapAsPromise(value);

      assert.isTrue(GenericHelpers.isPromise(prom), 'is a promise');
      assert.equal(await prom, value, 'value is equal');
    });
  });

  describe('applyFunctionPromisified', () => {
    it('executes a pure function and returns a new promise', async () => {
      const plainFunc = (one, two, three) => {
        return three;
      }
      const thirdParam = 'hello';
      const prom = AsyncHelpers.applyFunctionPromisified(plainFunc, [undefined, undefined, thirdParam]);

      assert.isTrue(GenericHelpers.isPromise(prom), 'is a promise');
      assert.equal(await prom, thirdParam, 'value is equal');
    });

    it('executes an async function and returns its promise', async () => {
      const promiseFunc = (one, two, three) => {
        return new Promise((resolve) => { resolve(three); });
      }
      const thirdParam = 'hello';
      const prom = AsyncHelpers.applyFunctionPromisified(promiseFunc, [undefined, undefined, thirdParam]);

      assert.isTrue(GenericHelpers.isPromise(prom), 'is a promise');
      assert.equal(await prom, thirdParam, 'value is equal');
    });
  });
});
