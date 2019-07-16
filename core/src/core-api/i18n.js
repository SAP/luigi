/**
 * Localization related functions.
 * @name LuigiI18N
 */
class LuigiI18NManager {
  constructor() {
    this.currentLocaleStorageKey = 'luigi.currentLocale';
    this.defaultLocale = 'en';
    this.listeners = new Set();
  }

  /**
   * Gets the current locale.
   * @returns {string} current locale
   * @since 0.5.3
   * @memberof LuigiI18N
   */
  getCurrentLocale() {
    return (
      sessionStorage.getItem(this.currentLocaleStorageKey) || this.defaultLocale
    );
  }

  /**
   * Sets current locale to the given one.
   * @param {string} locale locale to be set as the current locale
   * @since 0.5.3
   * @memberof LuigiI18N
   */
  setCurrentLocale(locale) {
    if (locale) {
      sessionStorage.setItem(this.currentLocaleStorageKey, locale);
      this.notifyLocaleChange(locale);
    }
  }

  /**
   * Register a listener for locale changes
   * @param {Function} listener function called on every locale change with the new locale as argument
   * @since 0.5.3
   * @memberof LuigiI18N
   */
  addCurrentLocaleChangeListener(listener) {
    this.listeners.add(listener);
  }

  /**
   * De-register a listener for locale changes
   * @param {Function} listener function previously registered for locale changes
   * @since 0.5.3
   * @memberof LuigiI18N
   */
  removeCurrentLocaleChangeListener(listener) {
    this.listeners.delete(listener);
  }

  /**
   * @private
   * @memberof LuigiI18N
   */
  notifyLocaleChange(locale) {
    this.listeners.forEach(listener => {
      listener(locale);
    });
  }
}

export const i18n = new LuigiI18NManager();
