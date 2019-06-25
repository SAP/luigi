/** @namespace */
class LuigiI18NManager {
  constructor() {
    this.currentLocaleStorageKey = 'luigi.currentLocale';
    this.defaultLocale = 'en';
  }

  /**
   * Gets the current locale.
   * @returns {string} current locale
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
   * @memberof LuigiI18N
   */
  setCurrentLocale(locale) {
    if (locale) {
      sessionStorage.setItem(this.currentLocaleStorageKey, locale);
    }
  }
}

export const i18n = new LuigiI18NManager();
