import { LuigiFeatureToggles } from '../../src/core-api';
const chai = require('chai');
const assert = chai.assert;

describe('Feature Toggle', () => {
  it('Set and unset feature toggle to list', async () => {
    //given
    let featureToggleList = LuigiFeatureToggles.getActiveFeatureToggleList();
    assert.equal(featureToggleList, 0);
    LuigiFeatureToggles.setFeatureToggle('test');
    assert.equal(featureToggleList[0], 'test');
    LuigiFeatureToggles.unsetFeatureToggle('test');

    LuigiFeatureToggles.setFeatureToggle('test');
    LuigiFeatureToggles.setFeatureToggle('test2');
    assert.equal(featureToggleList[0], 'test');
    assert.equal(featureToggleList[1], 'test2');
    LuigiFeatureToggles.unsetFeatureToggle('test');
    assert.equal(featureToggleList[0], ['test2']);
  });
});
