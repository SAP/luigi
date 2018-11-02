const chai = require('chai');
const assert = chai.assert;
const config = require('../../src/services/config');

describe('Config', () => {
  describe('getConfigBooleanValue()', () => {
    it('should return correct boolean value', async () => {
      //given
      window.Luigi = {
        config: {}
      };

      //when
      window.Luigi.config.truthyAttribute = 'true';
      window.Luigi.config.truthAttribute = true;
      window.Luigi.config.falseAttribute = false;

      // then
      assert.equal(config.getConfigBooleanValue('truthyAttribute'), true);
      assert.equal(config.getConfigBooleanValue('truthAttribute'), true);
      assert.equal(config.getConfigBooleanValue('falseAttribute'), false);
    });

    it('should fallback to false in case if invalid value', async () => {
      // given
      window.Luigi = {
        config: {}
      };

      //when
      window.Luigi.config.foo = 'bar';

      // then
      assert.equal(config.getConfigBooleanValue('foo'), false);
    });

    it('should fallback to false in case if undefined value', async () => {
      // given
      window.Luigi = {
        config: {}
      };

      // then
      assert.equal(config.getConfigBooleanValue('whatever'), false);
      assert.equal(
        config.getConfigBooleanValue('whateverparent.whateverchild'),
        false
      );
    });
  });
});
