import { LuigiConfig } from '../core-api';

class ThemingClass {
  constructor() {
    this.isAvailable = false;
    this.defaultTheme = "not specified";
    this.themes = {};
  }

  async getAvailableThemes() {
    const themingObject = await LuigiConfig.getConfigValueAsync('settings.theming');
    console.log("themingObject : " + JSON.stringify(themingObject));
    themingObject !== undefined ? this.themes = themingObject.themes : this.themes = false;
    return this.themes;
  }

  setCurrentTheme(themeObject) {}

  getThemeObject(themeName) {
    const themingObject = await LuigiConfig.getConfigValueAsync('settings.theming');
    const themeObject = themingObject.themes.find(t => t.name === themeName);
    console.log("Theme Object is " + themeObject);
    return themeObject;
  }

  getCurrentTheme() {
    const theming = LuigiConfig.getConfigValue('settings.theming');
    if(theming.defaultTheme) {
      this.defaultTheme = theming.defaultTheme;
      const to = this.getThemeObject(this.defaultTheme);
      console.log("TO : " + JSON.stringify(to));
    }
    return this.defaultTheme;
  }

  isThemingAvailable() {
    const isAvailableTheming = LuigiConfig.getConfigValue('settings.theming');
    console.log("isAvailableTheming : " + isAvailableTheming);
    if(isAvailableTheming) {
      this.isAvailable = true;
    } 
    return this.isAvailable;
  }

}

export const Theming = new ThemingClass();
