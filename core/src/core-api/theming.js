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
  }

  /**
   * Retrieves the available themes
   * @memberof Theming
   * @returns {promise} resolves an array of theming objects
   * @since 1.4.0
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
   * Sets the current theme id
   * @memberof Theming
   * @param {string} id of a theme object
   * @since 1.4.0
   * @example
   * Luigi.theming().setCurrentTheme('light')
   */
  setCurrentTheme(id) {
    this.currentTheme = id;
  }

  /**
   * Retrieves a theme object by name.
   * @memberof Theming
   * @param {string} id a theme id
   * @returns {promise} resolves a theme object
   * @since 1.4.0
   * @example
   * Luigi
   *  .theming()
   *  .getThemeObject('light')
   *  .then((id => {
   *    // Logic
   *  }))
   */
  async getThemeObject(id) {
    const themes = await this.getAvailableThemes();
    return themes && themes.find(t => t.id === id);
  }
  /**
   * Retrieves the current active theme. Falls back to **defaultTheme** if none explicitly specified before.
   * @memberof Theming
   * @returns {string} theme id
   * @since 1.4.0
   * @example
   * Luigi.theming().getCurrentTheme()
   */
  getCurrentTheme() {
    if (!this.isThemingAvailable()) {
      return false;
    }
    if (this.currentTheme) {
      return this.currentTheme;
    }
    const theming = LuigiConfig.getConfigValue('settings.theming');
    if (!theming.defaultTheme) {
      console.error(
        '[Theming] getCurrentTheme() error. No theme set and no defaultTheme found in configuration',
        theming
      );
    }
    return theming.defaultTheme;
  }
  /**
   * The general status about the Theming configuration.
   * @memberof Theming
   * @returns {boolean} `true` if **settings.theming** configuration object is defined
   * @since 1.4.0
   * @example
   * Luigi.theming().isThemingAvailable()
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
      if (theming && theming.nodeViewURLDecorator && theming.nodeViewURLDecorator.queryStringParameter) {
        ViewUrlDecorator.add({
          type: 'queryString',
          uid: 'theming',
          key: theming.nodeViewURLDecorator.queryStringParameter.keyName,
          valueFn: () => {
            const value = this.getCurrentTheme();
            const configValueFn = theming.nodeViewURLDecorator.queryStringParameter.value;
            return configValueFn ? configValueFn(value) : value;
          },
        });
      }
    };

    StateHelpers.doOnStoreChange(
      window.Luigi._store,
      () => {
        setupViewUrlDecorator();
      },
      ['settings.theming']
    );
  }
}

export const theming = new LuigiTheming();
