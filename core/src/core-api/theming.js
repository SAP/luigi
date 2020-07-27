import { LuigiConfig } from '.';
import { GenericHelpers, StateHelpers } from '../utilities/helpers';
import { ViewUrlDecorator } from '../services';
/**
 * Functions to use Luigi Core Theming features.
 * @namespace Theming
 */
class LuigiTheming {
  constructor() {
    this.currentTheme;
    this.defaultTheme;
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
   * @param {Object} themeObj a theming object, has the same structure as retrieved from **getAvailableThemes**
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
   * @param {string} themeName a theme name
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
    const themes = await this.getAvailableThemes();
    return themes && themes.find(t => t.name === themeName);
  }
  /**
   * Retrieves the current active theme. Falls back to **defaultTheme** if none explicitly specified before. Returns `false` if no theme selected and no defaultTheme defined.
   * @memberof Theming
   * @returns {promise} resolves to a theming object
   * @since NEXTRELEASE
   * @example
   * Luigi
   *  .theming()
   *  .getCurrentTheme()
   *  .then((themeObj => {
   *    // Logic
   *  }))
   */
  async getCurrentTheme() {
    if (this.currentTheme) {
      return this.currentTheme;
    }
    if (this.defaultTheme) {
      return this.defaultTheme;
    }
    const theming = LuigiConfig.getConfigValue('settings.theming');
    if (theming && theming.defaultTheme) {
      this.defaultTheme = await this.getThemeObject(theming.defaultTheme);
      return this.defaultTheme;
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

  /**
   * Initialize Theming Core API
   * @memberof Theming
   * @private
   */
  _init() {
    const setupViewUrlDecorator = () => {
      /**
       * Registers the viewUrl decorator
       * @memberof Theming
       * @private
       */
      const theming = LuigiConfig.getConfigValue('settings.theming');
      if (
        theming &&
        theming.nodeViewURLDecorator &&
        theming.nodeViewURLDecorator.queryStringParameter
      ) {
        ViewUrlDecorator.add({
          type: 'queryString',
          uid: 'theming',
          key: theming.nodeViewURLDecorator.queryStringParameter.keyName,
          valueFn: async () => {
            const value = await this.getCurrentTheme();
            console.log(
              'valueFn()',
              value,
              theming.nodeViewURLDecorator.queryStringParameter.value(value)
            );
            return theming.nodeViewURLDecorator.queryStringParameter.value(
              value
            );
          }
        });
      }
    };

    StateHelpers.doOnStoreChange(
      window.Luigi._store,
      () => {
        this.defaultTheme = null;
        setupViewUrlDecorator();
      },
      ['settings.theming']
    );
  }
}

export const theming = new LuigiTheming();
