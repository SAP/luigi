import { LuigiConfig } from '.';
import { GenericHelpers } from '../utilities/helpers';
/**
 * Functions to use Luigi Core Theming features.
 * @namespace Theming
 */
class LuigiTheming {
  constructor() {
    this.currentTheme;
  }

  /**
   * Retrieves the available themes
   * @memberof Theming
   * @returns {promise} resolves an array of theming objects
   * @since NEXTRELEASE
   * @example
   * Luigi
   *  .theming()
   *  .getAvailableThemes()
   *  .then((themes) => {
   *     // Logic to generate theme selector
   *  });
   */
  async getAvailableThemes() {
    return await LuigiConfig.getConfigValueAsync('settings.theming.themes');
  }

  /**
   * Sets the current theming object
   * @memberof Theming
   * @param {Object} a theming object, has the same structure as retrieved from **getAvailableThemes**
   * @since NEXTRELEASE
   * @example
   * Luigi
   *  .theming()
   *  .setCurrentTheme({id: 1, name: 'light'})
   */
  setCurrentTheme(themeObj) {
    this.currentTheme = themeObj;
  }

  /**
   * Retrieves a theme object by name. Returns `false` on trying to access a non-existing theme.
   * @memberof Theming
   * @param {string} a theme name
   * @returns {promise} resolves a theming object
   * @since NEXTRELEASE
   * @example
   * Luigi
   *  .theming()
   *  .getThemeObject('light')
   *  .then((themeObj => {
   *    // Logic
   *  }))
   */
  async getThemeObject(themeName) {
    const themes = await LuigiConfig.getConfigValueAsync(
      'settings.theming.themes'
    );
    return themes && themes.find(t => t.name === themeName);
  }
  /**
   * Retrieves the current active theme. Falls back to **defaultTheme** if none explicitly specified before. Returns `false` if no theme selected and no defaultTheme defined.
   * @memberof Theming
   * @returns {Object} a theming object
   * @since NEXTRELEASE
   * @example
   * Luigi
   *  .theming()
   *  .getCurrentTheme()
   *  .then((themeObj => {
   *    // Logic
   *  }))
   */
  getCurrentTheme() {
    if (this.currentTheme) {
      return this.currentTheme;
    }
    const theming = LuigiConfig.getConfigValue('settings.theming');
    if (theming.defaultTheme) {
      const defaultTheme = theming.defaultTheme;
      return this.getThemeObject(defaultTheme);
    }
    console.error(
      '[Theming] getCurrentTheme() error. No theme set and no defaultTheme found in configuration',
      theming
    );
    return false;
  }
  /**
   * The general status about the Theming configuration.
   * @memberof Theming
   * @returns {boolean} `true` if **settings.theming** configuration object is defined.
   * @since NEXTRELEASE
   * @example
   * Luigi
   *  .theming()
   *  .isThemingAvailable()
   */
  isThemingAvailable() {
    return !!LuigiConfig.getConfigValue('settings.theming');
  }
}

export const theming = new LuigiTheming();
