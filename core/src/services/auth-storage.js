import { LuigiConfig } from '../core-api';

class AuthStorageSvcClass {
  constructor() {
    this._defaultStorage = 'localStorage';
    this._storageKey = 'luigi.auth';
    this._invalidStorageMsg = 'Configuration Error: Invalid auth.storage value defined. Must be one of localStorage, sessionStorage or none.'
  }

  storageKey() {
    return this._storageKey;
  }

  storageType() {
    if (!this._storageType) {
      this._storageType = LuigiConfig.getConfigValue('auth.storage') || this._defaultStorage;
    }
    return this._storageType;
  }

  getAuth() {
    try {
      switch (this.storageType()) {
        case 'localStorage':
        case 'sessionStorage':
          return JSON.parse(window[this.storageType()].getItem(this.storageKey()));

        case 'none':
          return this._authValues;

        default:
          console.error(this._invalidStorageMsg);
      }
    } catch (e) {
      console.warn(
        'Error parsing authorization data. Auto-logout might not work!'
      );
    }
  }

  setAuth(values) {
    switch (this.storageType()) {
      case 'localStorage':
      case 'sessionStorage':
        window[this.storageType()].setItem(this.storageKey(), JSON.stringify(values));
        break;

      case 'none':
        this._authValues = values;
        break;

      default:
        console.error(this._invalidStorageMsg);
    }
  }

  removeAuth() {
    switch (this.storageType()) {
      case 'localStorage':
      case 'sessionStorage':
        window[this.storageType()].removeItem(this.storageKey());
        break;

      case 'none':
        this._authValues = null;
        break;

      default:
        console.error(this._invalidStorageMsg);
    }
  }
}

export const AuthStorageSvc = new AuthStorageSvcClass();
