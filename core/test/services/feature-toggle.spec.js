import { LuigiFeatureToggle } from '../../src/core-api';
const chai = require('chai');
const assert = chai.assert;

describe('Feature Toggle', () => {
  it('Set and unset feature toggle to list', async () => {
    //given
    let featureToggleList = [];
    LuigiFeatureToggle.getActiveFeatureToggleList().subscribe(
      featureToggles => {
        featureToggleList = featureToggles;
      }
    );
    assert.equal(featureToggleList, 0);
    LuigiFeatureToggle.setFeatureToggle('test');
    assert.equal(featureToggleList[0], 'test');
    LuigiFeatureToggle.unsetFeatureToggle('test');

    LuigiFeatureToggle.setFeatureToggle('test');
    LuigiFeatureToggle.setFeatureToggle('test2');
    assert.equal(featureToggleList[0], 'test');
    assert.equal(featureToggleList[1], 'test2');
    LuigiFeatureToggle.unsetFeatureToggle('test');
    assert.equal(featureToggleList[0], ['test2']);
  });
});
