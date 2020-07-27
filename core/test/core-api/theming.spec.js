const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const sinon = require('sinon');

import { LuigiConfig, LuigiTheming } from '../../src/core-api';

describe('Core API - Theming', function() {
  this.retries(1);
  const getMockTheming = () => {
    return {
      themes: [
        { id: 1, name: 'light' },
        { id: 2, name: 'dark' },
        { id: 3, name: 'blue' },
        { id: 4, name: 'green' },
        { id: 5, name: 'red' },
        { id: 6, name: 'orange' },
        { id: 7, name: 'yellow' }
      ],
      defaultTheme: 'light'
    };
  };
  beforeEach(() => {
    sinon.stub(LuigiConfig);
    LuigiConfig.getConfigValue.returns(getMockTheming());
    LuigiConfig.getConfigValueAsync.returns(getMockTheming().themes);
  });
  afterEach(() => {
    sinon.reset();
    sinon.restore();
  });

  describe('getAvailableThemes', () => {
    it('has themes', async () => {
      const res = await LuigiTheming.getAvailableThemes();
      assert.deepEqual(res, getMockTheming().themes);
    });
    it('no theming defined', async () => {
      LuigiConfig.getConfigValueAsync.returns(undefined);
      const res = await LuigiTheming.getAvailableThemes();
      assert.isUndefined(res);
    });
  });
  it('setCurrentTheme', () => {
    const mockTheme = { id: 1, name: 'light' };
    assert.isUndefined(LuigiTheming.currentTheme);

    LuigiTheming.setCurrentTheme(mockTheme);

    assert.deepEqual(LuigiTheming.currentTheme, mockTheme);
  });
  describe('getThemeObject', () => {
    it('theme not found', async () => {
      const res = await LuigiTheming.getThemeObject('notexistingtheme');
      assert.isUndefined(res);
    });
    it('no theming defined', async () => {
      LuigiConfig.getConfigValueAsync.returns(undefined);

      const res = await LuigiTheming.getThemeObject('dark');
      assert.isUndefined(res);
    });
  });
});
