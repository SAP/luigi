import { LuigiFeatureToggles } from '../../src/core-api';
const chai = require('chai');
const assert = chai.assert;

describe('Feature Toggle', () => {
  it('Set and unset feature toggle to list', async () => {
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
      'bar'
    ]);

    LuigiFeatureToggles.unsetFeatureToggle('test');
    assert.deepEqual(LuigiFeatureToggles.getActiveFeatureToggleList(), [
      'test2',
      'bar'
    ]);

    assert.equal(LuigiFeatureToggles.isDuplicatedOrDisabled('bar'), true);
    assert.equal(LuigiFeatureToggles.isDuplicatedOrDisabled('foo'), false);
  });

  it('check feature toggle is valid with a string', () => {
    const actual = LuigiFeatureToggles.isValid('foo');
    const expect = true;

    assert.equal(actual, expect);
  });
  it('check feature toggle is valid with a number', () => {
    const actual = LuigiFeatureToggles.isValid(123);
    const expect = false;

    assert.equal(actual, expect);
  });
});
