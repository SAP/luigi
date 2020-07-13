import { LuigiConfig } from '../core-api';

class ThemingClass {
  constructor() {
    this.currentTheme;
    this.themes = {};
  }

  async getAvailableThemes() {
    const themingObject = await LuigiConfig.getConfigValueAsync(
      'settings.theming'
    );
    console.log('[Theming] getAvailableThemes', themingObject);
    this.themes =
      typeof themingObject !== 'undefined' ? themingObject.themes : false;
    return this.themes;
  }

  async setCurrentTheme(themeName) {
    const theme = await this.getThemeObject(themeName);
    this.currentTheme;
  }

  async getThemeObject(themeName) {
    const themingObject = await LuigiConfig.getConfigValueAsync(
      'settings.theming'
    );
    const themeObject = themingObject.themes.find(t => t.name === themeName);
    console.log('[Theming] getThemeObject for', themeName, themeObject);
    return themeObject;
  }

  async getCurrentTheme() {
    if (this.currentTheme) {
      return this.currentTheme;
    }
    const theming = await LuigiConfig.getConfigValueAsync('settings.theming');
    if (theming.defaultTheme) {
      const defaultTheme = theming.defaultTheme;
      console.log('[Theming] fallback to default theme', theming.defaultTheme);
      return this.getThemeObject(defaultTheme);
    }
    return false;
  }

  isThemingAvailable() {
    console.log(
      '[Theming] isThemingAvailable',
      !!LuigiConfig.getConfigValue('settings.theming')
    );
    return !!LuigiConfig.getConfigValue('settings.theming');
  }
}

export const Theming = new ThemingClass();
