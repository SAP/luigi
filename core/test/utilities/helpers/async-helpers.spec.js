const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;

import { AsyncHelpers, GenericHelpers } from './../../../src/utilities/helpers';

describe('Async-helpers', () => {
  let clock;
  let obj;
  beforeEach(() => {
    // sinon.stub(LuigiConfig, 'getConfigValue');
    obj = {
      client: 'here'
    };
    clock = sinon.useFakeTimers();
  });
  afterEach(() => {
    //   sinon.restore();
    clock.restore();
  });

  describe('waitForKeyExistency', () => {
    it('returns true if key exists immediately', done => {
      AsyncHelpers.waitForKeyExistency(obj, 'client').then(result => {
        assert.equal(result, true);
        done();
      });
      clock.tick(1000);
    });
    it('returns true if key exists after some time', done => {
      obj.client = undefined;
      AsyncHelpers.waitForKeyExistency(obj, 'client').then(result => {
        assert.equal(result, true);
        done();
      });
      setTimeout(() => {
        obj.client = 'yes';
      }, 500);
      clock.tick(1000);
    });
    it('returns message if key does not exist after timeout', done => {
      AsyncHelpers.waitForKeyExistency(obj, 'client2')
        .then(result => {})
        .catch(e => {
          assert.equal(
            e,
            'client2 did not appear in object within 20 seconds.'
          );
          done();
        });
      clock.tick(21000);
    });
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
      };
      const thirdParam = 'hello';
      const prom = AsyncHelpers.applyFunctionPromisified(plainFunc, [
        undefined,
        undefined,
        thirdParam
      ]);

      assert.isTrue(GenericHelpers.isPromise(prom), 'is a promise');
      assert.equal(await prom, thirdParam, 'value is equal');
    });

    it('executes an async function and returns its promise', async () => {
      const promiseFunc = (one, two, three) => {
        return new Promise(resolve => {
          resolve(three);
        });
      };
      const thirdParam = 'hello';
      const prom = AsyncHelpers.applyFunctionPromisified(promiseFunc, [
        undefined,
        undefined,
        thirdParam
      ]);

      assert.isTrue(GenericHelpers.isPromise(prom), 'is a promise');
      assert.equal(await prom, thirdParam, 'value is equal');
    });
  });
});
