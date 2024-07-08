const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const sinon = require('sinon');

import { LuigiConfig, LuigiTheming } from '../../src/core-api';

describe('Core API - Theming', function() {
  jest.retryTimes(2);

  describe('getAvailableThemes', () => {
    const getMockTheming = () => {
      return {
        themes: [
          { id: 'light', name: 'Light Theme' },
          { id: 'dark', name: 'Dark Theme' }
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
    const mockTheme = { id: 'light', name: 'Light Theme' };
    assert.isUndefined(LuigiTheming.currentTheme);

    LuigiTheming.setCurrentTheme(mockTheme);

    assert.deepEqual(LuigiTheming.currentTheme, mockTheme);
  });
  describe('getThemeObject', () => {
    const getMockTheming = () => {
      return {
        themes: [
          { id: 'light', name: 'Light Theme' },
          { id: 'dark', name: 'Dark Theme' }
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
    it('theme not found', async () => {
      const res = await LuigiTheming.getThemeObject('notexistingtheme');
      assert.isUndefined(res);
    });
    it('no theming defined', async () => {
      LuigiConfig.getConfigValueAsync.returns(undefined);

      const res = await LuigiTheming.getThemeObject('dark');
      assert.isUndefined(res);
    });
    it('get theme object', async () => {
      const res = await LuigiTheming.getThemeObject('dark');
      assert.deepEqual(res, { id: 'dark', name: 'Dark Theme' });
    });
  });

  describe('getCSSVariables', () => {
    beforeEach(() => {
      sinon.stub(LuigiConfig);
    });
    afterEach(() => {
      sinon.reset();
      sinon.restore();
      delete window.Luigi.__cssVars;
    });
    it('getCSSVariables fiori style', async () => {
      window.__luigiThemeVars = ['sapBackgroundColor'];
      LuigiConfig.getConfigValue.withArgs('settings.theming.variables').returns('fiori');
      sinon.stub(window, 'getComputedStyle').callsFake(() => {
        return {
          getPropertyValue: sinon.stub().returns('green')
        };
      });
      assert.equal(window.Luigi.__cssVars, undefined);
      await LuigiTheming.getCSSVariables();
      assert.equal(window.Luigi.__cssVars.sapBackgroundColor, 'green');
    });
    it('getCSSVariables own file', async () => {
      LuigiConfig.getConfigValue.withArgs('settings.theming.variables.file').returns('/path/to/file');
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ root: { myOwnCSSVar: 'red' } })
        })
      );
      sinon.stub(window, 'getComputedStyle').callsFake(() => {
        return {
          getPropertyValue: sinon.stub().returns('green')
        };
      });
      assert.equal(window.Luigi.__cssVars, undefined);
      await LuigiTheming.getCSSVariables();
      assert.equal(window.Luigi.__cssVars.myOwnCSSVar, 'green');
    });
    it('getCSSVariables own file with error', async () => {
      LuigiConfig.getConfigValue.withArgs('settings.theming.variables.file').returns('/path/to/file');
      console.error = sinon.spy();
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.reject('error')
        })
      );
      sinon.stub(window, 'getComputedStyle').callsFake(() => {
        return {
          getPropertyValue: sinon.stub().returns('green')
        };
      });
      assert.equal(window.Luigi.__cssVars, undefined);
      await LuigiTheming.getCSSVariables();
      assert.equal(window.Luigi.__cssVars, undefined);
      sinon.assert.calledOnce(console.error);
    });
    it('getCSSVariables own file with custom error handling', async () => {
      LuigiConfig.getConfigValue.withArgs('settings.theming.variables.file').returns('/path/to/file');
      LuigiConfig.getConfigValue.withArgs('settings.theming.variables.errorHandling').returns(() => {
        console.log('This is my custom error');
      });
      console.log = sinon.spy();
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.reject('error')
        })
      );
      sinon.stub(window, 'getComputedStyle').callsFake(() => {
        return {
          getPropertyValue: sinon.stub().returns('green')
        };
      });
      assert.equal(window.Luigi.__cssVars, undefined);
      await LuigiTheming.getCSSVariables();
      assert.equal(window.Luigi.__cssVars, undefined);
      sinon.assert.calledOnce(console.log);
    });
  });
});
