import { LuigiConfig } from '../core-api';

class AuthStorageSvcClass {
  constructor() {
    this._defaultStorage = 'localStorage';
    this._authKey = 'luigi.auth';
    this._newlyAuthorizedKey = 'luigi.newlyAuthorized';
    this._invalidStorageMsg = 'Configuration Error: Invalid auth.storage value defined. Must be one of localStorage, sessionStorage or none.'
  }

  get storageKey() {
    return this._authKey;
  }

  get storageType() {
    if (!this._storageType) {
      this._storageType = LuigiConfig.getConfigValue('auth.storage') || this._defaultStorage;
    }
    return this._storageType;
  }

  getAuth() {
    return this._getStore(this.storageKey) {
  }

  setAuth(values) {
    this._setStore(this.storageKey, values) {
  }

  isNewlyAuthorized() {
    this._getStore(this._newlyAuthorizedKey);
  }

  setNewlyAuthorized() {
    this._setStore(this._newlyAuthorizedKey, true);
  }

  removeNewlyAuthorized() {
    this._setStore(this._newlyAuthorizedKey, undefined);
  }

  removeAuth() {
    this._setStore(this.storageType, undefined);
  }

  _setStore(key, data) {
    switch (this.storageType) {
      case 'localStorage':
      case 'sessionStorage':
        if (data !== undefined) {
          window[this.storageType].setItem(key, JSON.stringify(data));
        } else {
          window[this.storageType].removeItem(key);
        }
        break;

      case 'none':
        this[key] = data;
        break;

      default:
        console.error(this._invalidStorageMsg);
    }
  }

  _getStore(key) {
    try {
      switch (this.storageType) {
        case 'localStorage':
        case 'sessionStorage':
          return JSON.parse(window[this.storageType].getItem(key));

        case 'none':
          return this[key];

        default:
          console.error(this._invalidStorageMsg);
      }
    } catch (e) {
      console.warn(
        'Error parsing authorization data. Auto-logout might not work!'
      );
    }
  }
}

export const AuthStorageSvc = new AuthStorageSvcClass();
