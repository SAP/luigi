import { IframeHelpers } from './iframe-helpers';

class StorageHelperClass {
  constructor() {
    this.init = false;
    this.storage = undefined;
    this.browseSupported = undefined;
  }

  checkInit() {
    if (this.init) {
      return;
    }
    this.storage = window.localStorage;
    this.browseSupported = this.supportLocalStorage();
    this.init = true;
  }

  supportLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }

  checkStorageBrowserSupport() {
    if (!this.browseSupported) {
      throw 'Browser does not support local storage';
    }
  }

  process(microfrontendId, hostname, id, operation, params) {
    try {
      this.checkInit();
      this.checkStorageBrowserSupport();
      const operationFunction = this[operation];
      if (typeof operationFunction !== 'function') {
        throw operation + ' is not a supported operation for the storage';
      }
      const result = operationFunction.bind(this, this.cleanHostname(hostname), params)();
      this.sendBackOperation(microfrontendId, id, 'OK', result);
    } catch (error) {
      console.log(error);
      this.sendBackOperation(microfrontendId, id, 'ERROR', error);
    }
  }

  cleanHostname(hostname) {
    return hostname.replace('http://', '').replace('https://', '');
  }

  setItem(hostname, params) {
    this.checkKey(params);
    const value = this.stringifyValue(params.value);
    const key = this.buildKey(hostname, params.key);
    this.storage.setItem(key, value);
  }

  getItem(hostname, params) {
    this.checkKey(params);
    const key = this.buildKey(hostname, params.key);
    const item = this.storage.getItem(key);
    if (item) {
      return this.parseJsonIfPossible(item);
    } else {
      return undefined;
    }
  }

  buildKey(hostname, subKey) {
    return this.buildPrefix(hostname) + subKey.trim();
  }

  buildPrefix(hostname) {
    return 'Luigi#' + hostname + '#';
  }

  removeItem(hostname, params) {
    this.checkKey(params);
    const key = this.buildKey(hostname, params.key);
    const item = this.storage.getItem(key);
    if (item) {
      this.storage.removeItem(key);
      return item;
    } else {
      return undefined;
    }
  }

  clear(hostname, params) {
    const keyPrefix = this.buildPrefix(hostname);
    Object.keys(this.storage)
      .filter(key => key.startsWith(keyPrefix))
      .forEach(key => this.storage.removeItem(key));
  }

  has(hostname, params) {
    this.checkKey(params);
    const key = this.buildKey(hostname, params.key);
    const item = this.storage.getItem(key);
    if (item) {
      return true;
    } else {
      return false;
    }
  }

  getAllKeys(hostname, params) {
    const keyPrefix = this.buildPrefix(hostname);
    return Object.keys(this.storage)
      .filter(key => key.startsWith(keyPrefix))
      .map(key => key.substring(keyPrefix.length));
  }

  checkKey(params) {
    if (!params.key || params.key.trim().length === 0) {
      throw 'Missing key, we cannot execute storage operation';
    }
  }

  parseJsonIfPossible(text) {
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  }

  stringifyValue(value) {
    if (!value) {
      throw 'Value is empty';
    }
    if (typeof value === 'string' || value instanceof String) {
      return value;
    }
    try {
      return JSON.stringify(value);
    } catch (error) {
      throw 'Value cannot be stringify, error: ' + error;
    }
  }

  sendBackOperation(microfrontendId, id, status, result) {
    let message = {
      msg: 'storage',
      data: {
        id,
        status,
        result,
      },
    };
    IframeHelpers.getMicrofrontendsInDom()
      .filter(microfrontendObj => microfrontendObj.id === microfrontendId)
      .map(microfrontendObj => microfrontendObj.container)
      .map(mfContainer => IframeHelpers.sendMessageToIframe(mfContainer, message));
  }
}

export const StorageHelper = new StorageHelperClass();
