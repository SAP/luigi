import { LuigiFeatureToggles } from '../../src/core-api';
const chai = require('chai');
const assert = chai.assert;

describe('Feature Toggle', () => {
  it('Set and unset feature toggle to list', async () => {
    //given

    assert.equal(LuigiFeatureToggles.getActiveFeatureToggleList(), 0);
    LuigiFeatureToggles.setFeatureToggle('test');
    LuigiFeatureToggles.setFeatureToggle(12345);
    LuigiFeatureToggles.unsetFeatureToggle('foo');
    assert.equal(LuigiFeatureToggles.getActiveFeatureToggleList(), 'test');
    LuigiFeatureToggles.unsetFeatureToggle('test');

    assert.equal(LuigiFeatureToggles.getActiveFeatureToggleList(), 0);
    LuigiFeatureToggles.setFeatureToggle('!bar');
    LuigiFeatureToggles.setFeatureToggle('test2');
    LuigiFeatureToggles.setFeatureToggle('test');

    assert.deepEqual(LuigiFeatureToggles.getActiveFeatureToggleList(), [
      'test2',
      'test'
    ]);

    LuigiFeatureToggles.setFeatureToggle('bar');
    assert.deepEqual(LuigiFeatureToggles.getActiveFeatureToggleList(), [
      'test2',
      'test',
    ]);

    LuigiFeatureToggles.unsetFeatureToggle('test');
    assert.deepEqual(LuigiFeatureToggles.getActiveFeatureToggleList(), [
      'test2'
    ]);
  });
});
