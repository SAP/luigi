import { GenericHelpers } from '../utilities/helpers';

/**
 * Localization related functions.
 * @name LuigiI18N
 */
class LuigiI18NManager {
  constructor() {
    this.currentLocaleStorageKey = 'luigi.currentLocale';
    this.defaultLocale = 'en';
    this.listeners = {};
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
   * @returns {number} listener ID associated with the given listener; use it when removing the listener
   * @since 0.5.3
   * @memberof LuigiI18N
   */
  addCurrentLocaleChangeListener(listener) {
    if (GenericHelpers.isFunction(listener)) {
      const listenerId = GenericHelpers.getRandomId();
      this.listeners[listenerId] = listener;
      return listenerId;
    } else {
      console.error('Provided locale change listener is not a function.');
    }
  }

  /**
   * De-register a listener for locale changes
   * @param {number} listenerId listener ID associated with the listener to be removed, returned by addCurrentLocaleChangeListener
   * @since 0.5.3
   * @memberof LuigiI18N
   */
  removeCurrentLocaleChangeListener(listenerId) {
    if (listenerId && this.listeners[listenerId]) {
      delete this.listeners[listenerId];
    } else {
      console.error(
        'Unable to remove locale change listener - no listener registered for given ID.'
      );
    }
  }

  /**
   * @private
   * @memberof LuigiI18N
   */
  notifyLocaleChange(locale) {
    Object.getOwnPropertyNames(this.listeners).forEach(listenerId => {
      this.listeners[listenerId](locale);
    });
  }
}

export const i18n = new LuigiI18NManager();
