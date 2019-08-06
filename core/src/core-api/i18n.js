import { config } from './config';
import { GenericHelpers, StateHelpers } from '../utilities/helpers';

const luigi = {
  auth2_nonce_error: 'Something went wrong. Try to log in again.',
  configNotReadyCallback:
    'Ups.. Looks like Luigi was not configured. Please use Luigi.setConfig(config) function to configure Luigi.',

  unsafedChangesAlert: {
    header: 'Unsaved changes detected',
    body: 'Unsaved changes will be lost. Do you want to continue?'
  },
  button: {
    dismiss: 'No',
    confirm: 'Yes'
  }
};
/**
 * Localization-related functions.
 * @name LuigiI18N
 */
class LuigiI18NManager {
  constructor() {
    this.currentLocaleStorageKey = 'luigi.currentLocale';
    this.defaultLocale = 'en';
    this.listeners = {};
  }

  _init() {
    StateHelpers.doOnStoreChange(window.Luigi._store, () => {
      this._initCustomImplementation();
    });
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
   * Sets current locale to the specified one.
   * @param {string} locale locale to be set as the current locale
   * @since 0.5.3
   * @memberof LuigiI18N
   */
  setCurrentLocale(locale) {
    if (locale) {
      sessionStorage.setItem(this.currentLocaleStorageKey, locale);
      this._notifyLocaleChange(locale);
    }
  }

  /**
   * Registers a listener for locale changes.
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
   * Unregisters a listener for locale changes.
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
  _notifyLocaleChange(locale) {
    Object.getOwnPropertyNames(this.listeners).forEach(listenerId => {
      this.listeners[listenerId](locale);
    });
    config.setConfig(config.getConfig());
  }

  /**
   * @private
   * @memberof LuigiI18N
   */
  _initCustomImplementation() {
    this.translationImpl = config.getConfigValue(
      'settings.customTranslationImplementation'
    );
    if (GenericHelpers.isFunction(this.translationImpl)) {
      this.translationImpl = this.translationImpl();
    }
  }

  /**
   * Gets translated text for the specified key in the current locale or in the specified one.
   * Property values for token replacement in the localization key will be taken from the specified interpolations object.
   * @param {string} key key to be translated
   * @param {Object} interpolations objects with properties that will be used for token replacements in the localization key
   * @param {locale} locale optional locale to get the translation for; default is the current locale
   * @memberof LuigiI18N
   */
  getTranslation(key, interpolations, locale) {
    if (this.translationImpl) {
      return this.translationImpl.getTranslation(key, interpolations, locale);
    }
    if (key?.split('.')[0] === 'luigi') {
      return this.findTranslation(key, luigi);
    } else {
      return key;
    }
  }

  findTranslation(key, obj) {
    let splitted = key.split('.');
    if (splitted[0] === 'luigi') splitted.shift();
    for (let i = 0; i < splitted.length; i++) {
      let key = splitted[i];
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
        obj = obj[key];
      } else {
        return obj[key];
      }
    }
  }
}

export const i18n = new LuigiI18NManager();
