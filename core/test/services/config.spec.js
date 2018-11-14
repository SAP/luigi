const chai = require('chai');
const assert = chai.assert;
import { LuigiConfig } from '../src/services/config';

describe('Config', () => {
  ś;
  describe('getConfigBooleanValue()', () => {
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
});
