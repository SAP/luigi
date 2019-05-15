const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

import { LuigiConfig } from '../../src/core-api';
const AsyncHelpers = require('../../src/utilities/helpers/async-helpers');

describe('Config', () => {
  describe('getConfigBooleanValue', () => {
    it('should return correct boolean value', async () => {
      //given
      LuigiConfig.config = {
        truthyAttribute: 'true',
        truthAttribute: true,
        falseAttribute: false
      };

      // then
      assert.equal(LuigiConfig.getConfigBooleanValue('truthyAttribute'), true);
      assert.equal(LuigiConfig.getConfigBooleanValue('truthAttribute'), true);
      assert.equal(LuigiConfig.getConfigBooleanValue('falseAttribute'), false);
    });

    it('should fallback to false in case if invalid value', async () => {
      // given
      LuigiConfig.config = {
        foo: 'bar'
      };

      // then
      assert.equal(LuigiConfig.getConfigBooleanValue('foo'), false);
    });

    it('should fallback to false in case if undefined value', async () => {
      // given
      LuigiConfig.config = {};

      // then
      assert.equal(LuigiConfig.getConfigBooleanValue('whatever'), false);
      assert.equal(
        LuigiConfig.getConfigBooleanValue('whateverparent.whateverchild'),
        false
      );
    });
  });

  describe('executeConfigFnAsync', () => {
    it('returns correct value', async () => {
      //given
      LuigiConfig.config = {
        truthyFn: (param1, param2) => 'value' + param1 + param2,
        truthyFnAsync: (param1, param2) =>
          Promise.resolve('value' + param1 + param2)
      };

      const resultTruthyFn = await LuigiConfig.executeConfigFnAsync(
        'truthyFn',
        false,
        'foo',
        'bar'
      );
      assert.equal(resultTruthyFn, 'valuefoobar');

      const resultTruthyFnAsync = await LuigiConfig.executeConfigFnAsync(
        'truthyFnAsync',
        false,
        'foo',
        'bar'
      );
      assert.equal(resultTruthyFnAsync, 'valuefoobar');
    });

    it('returns undefined on non-existing fn', async () => {
      //given
      LuigiConfig.config = {};

      const resultUndefined = await LuigiConfig.executeConfigFnAsync(
        'not.existing.value'
      );
      assert.isUndefined(resultUndefined, 'async fn result is not undefined');
    });

    it('returns undefined on error/rejected promise', async () => {
      //given
      LuigiConfig.config = {
        rejectFnAsync: (param1, param2) =>
          Promise.reject(new Error('rejected')),
        errFnAsync: (param1, param2) => {
          throw new Error({
            name: 'someError',
            message: 'something went wrong'
          });
        }
      };

      const resultRejectFnAsync = await LuigiConfig.executeConfigFnAsync(
        'rejectFnAsync'
      );
      assert.isUndefined(resultRejectFnAsync, 'rejection did not return');

      const resultErrFnAsync = await LuigiConfig.executeConfigFnAsync(
        'errFnAsync'
      );
      assert.isUndefined(resultErrFnAsync, 'error did not return');
    });

    it('throws an error if throwError flag is set', async () => {
      sinon
        .stub(AsyncHelpers, 'applyFunctionPromisified')
        .returns(Promise.reject(new Error('rejected')));
      //given
      LuigiConfig.config = {
        rejectFnAsync: (param1, param2) => {}
      };

      // second parameter throws an error and we want it to throw an error on failure
      // catching it here to be able to evaluate the error message
      let res;
      try {
        res = await LuigiConfig.executeConfigFnAsync('rejectFnAsync', true);
      } catch (error) {
        res = error;
      }
      assert.equal(res.message, 'rejected', 'return error does not equal');
    });
  });
});
