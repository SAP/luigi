import { LuigiConfig } from '../core-api';
import { GenericHelpers } from '../utilities/helpers';

class ThemingClass {
  constructor() {
    this.currentTheme;
    this.themes = {};
  }

  async getAvailableThemes() {
    const themingObj = await LuigiConfig.getConfigValueAsync(
      'settings.theming'
    );
    console.log('[Theming] getAvailableThemes()', themingObj);
    this.themes = GenericHelpers.isObject(themingObj)
      ? themingObj.themes
      : false;
    return this.themes;
  }

  setCurrentTheme(themeObj) {
    console.log('[Theming] setCurrentTheme()', themeObj);
    this.currentTheme = themeObj;
  }

  async getThemeObject(themeName) {
    const themingObj = await LuigiConfig.getConfigValueAsync(
      'settings.theming'
    );
    const themeObject = themingObj.themes.find(t => t.name === themeName);
    console.log('[Theming] getThemeObject(', themeName, ')', themeObject);
    return themeObject;
  }

  async getCurrentTheme() {
    if (this.currentTheme) {
      console.log(
        '[Theming] getCurrentTheme() return selected theme',
        this.currentTheme
      );
      return this.currentTheme;
    }
    const theming = await LuigiConfig.getConfigValueAsync('settings.theming');
    if (theming.defaultTheme) {
      const defaultTheme = theming.defaultTheme;
      console.log(
        '[Theming] getCurrentTheme() fallback to default theme',
        theming.defaultTheme
      );
      return this.getThemeObject(defaultTheme);
    }
    console.error(
      '[Theming] getCurrentTheme() error. No theme set and no defaultTheme found in configuration',
      theming
    );
    return false;
  }

  isThemingAvailable() {
    console.log(
      '[Theming] isThemingAvailable()',
      !!LuigiConfig.getConfigValue('settings.theming')
    );
    return !!LuigiConfig.getConfigValue('settings.theming');
  }
}

export const Theming = new ThemingClass();
