import { LuigiClientBase } from './baseClass';
const maxValueSize = 32768;
const reservedKey4Luigi = [/^luigi.auth$/,/^luigi.preferences/]

/**
 * Storoge manager allows you to use browser local storage (key/value); Luigi is using some dedicated keys (for preferences and authentication): if you try to use them, you will get an error.
 * @name StorageManager
 */
class StorageManager extends LuigiClientBase {
  /** @private */
  constructor() {
    super();

    this.storageValueValidator = new StorageValueValidator();
    this.storageUtil = new StorageUtil();
    this.browseSupported = this.storageUtil.supportLocalStorage();
    this.storage = window.localStorage
  }

  /**
   * Asynchronously store a value for a specific key.
   * @param {string} key used to identify the value
   * @param {Object} object to store; object must be stringifyable
   * @returns {Promise<void>} resolves an empty value when storage operation is over; it will launch an error if storage is no supported, value cannot be stringify or you are using a luigi reserved key
   * @example
   * LuigiClient.storageManager().setItem('keyExample','valueExample').then(() => console.log('Value stored'))
   */
  setItem(key, value) {
    return new Promise((resolve, reject) => {
        try{
          this.setItemSync(key, value);
          resolve();
        }catch (error){
          reject(error);
        }
    });
  }

  /**
   * Synchronously store a value for a specific key.
   * @param {string} key used to identify the value
   * @param {Object} object to store; object must be stringifyable
   * @returns {void} it will launch an error if storage is no supported, value cannot be stringify or you using a luigi reserved key
   * @example
   * LuigiClient.storageManager().setItemSync('keyExample','valueExample')
   */
  setItemSync(key, value) {
    this.storageValueValidator.checkIfKeyIsReserved(key);
    this.storageUtil.checkStorageBrowserSupport();
    const value2store = this.storageValueValidator.stringifyValue(value);
    this.storageValueValidator.checkSize(value2store);
    this.storage.setItem(key, value2store);
  }

  /**
   * Asynchronously retrieve a value for a specific key.
   * @param {string} key used to identify the value
   * @returns {Promise<Object>} resolves item retrieved from storage; it will launch an error if storage is no supported
   * @example
   * LuigiClient.storageManager().getItem('keyExample').then((value) => console.log);
   */
  getItem(key){
    return new Promise((resolve, reject) => {
      try{
        const item = this.getItemSync(key);
        resolve(item);
      }catch (error){
        reject(error);
      }
    });
  }

  /**
   * Asynchronously retrieve a value for a specific key.
   * @param {string} key used to identify the value
   * @returns {Object} item retrieved from storage; it will launch an error if storage is no supported
   * @example
   * LuigiClient.storageManager().getItemSync('keyExample')
   */
  getItemSync(key){
    this.storageUtil.checkStorageBrowserSupport();
    let item = this.storage.getItem(key);
    if (item){
      return this.storageValueValidator.parseJsonIfPossible(item);
    }else{
      return undefined;
    }
  }

  /**
   * Asynchronously remove a value for a specific key.
   * @param {string} key used to identify the value
   * @returns {Promise<Object>} resolves item just removed from storage; it will launch an error if storage is no supported or you are using a luigi reserved key
   * @example
   * LuigiClient.storageManager().removeItem('keyExample').then((value) => console.log(value + ' just removed')
   */
  removeItem(key){
    return new Promise((resolve, reject) => {
      try{
        const item = this.removeItemSync(key);
        resolve(item);
      }catch (error){
        reject(error);
      }
    });
  }

  /**
   * Synchronously remove a value for a specific key.
   * @param {string} key used to identify the value
   * @returns {Object}  item just removed from storage; it will launch an error if storage is no supported or you are using a luigi reserved key
   * @example
   * LuigiClient.storageManager().removeItemSync('keyExample')
   */
  removeItemSync(key) {
    this.storageUtil.checkStorageBrowserSupport();
    this.storageValueValidator.checkIfKeyIsReserved(key);
    let item = this.getItemSync(key);
    if (!item){
      return undefined;
    }
    this.storage.removeItem(key);
    return item;
  }

  /**
   * Asynchronously clear all the storage key/values; all Luigi values used by core application will not be deleted
   * @returns {Promise<void>} resolves when storage clear is over
   * @example
   * LuigiClient.storageManager().clear().then(() => console.log('storage cleared'))
   */
  clear() {
    return new Promise((resolve, reject) => {
      try{
        this.clearSync();
        resolve();
      }catch (error){
        reject(error);
      }
    });
  }

  /**
   * Synchronously clear all the storage key/values; all Luigi values used by core application will not be deleted
   * @returns {void}
   * @example
   * LuigiClient.storageManager().clearSync()
   */
  clearSync(){
    this.storageUtil.checkStorageBrowserSupport();
    let luigiReserveStorageValues = this.storageUtil.getLuigiReserveStorageValues()
    this.storage.clear();
    Object.keys(luigiReserveStorageValues)
      .forEach(key => this.storage.setItem(key, luigiReserveStorageValues[key]));


  }

  /**
   * Check if a key is present in storage
   * @param {string} key in the storage
   * @returns {boolean} true if key is present, false if is not
   * @example
   * LuigiClient.storageManager().has()
   */
  has(key){
    this.storageUtil.checkStorageBrowserSupport();
    return Object.keys(this.storage).includes(key);
  }

  /**
   * Get all the keys used in the storage
   * @returns {string[]}
   */
  getAllKeys(){
    this.storageUtil.checkStorageBrowserSupport();
    return Object.keys(this.storage);
  }

}

class StorageUtil{

  getLuigiReserveStorageValues(){
    let reserveValues = {};
    Object.keys(this.storage)
      .filter(key => this.storageValueValidator.isKeyIsReserved(key))
      .forEach(key => reserveValues[key]=this.storage.getItem(key));
    return reserveValues;
  }

  checkStorageBrowserSupport(){
    if (!this.browseSupported){
      throw "Browser does not support local storage"
    }
  }
  supportLocalStorage(){
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch(e) {
      return false;
    }
  }

}

class StorageValueValidator{

  isValueString(value) {
    return typeof value === 'string' || value instanceof String;
  }
  parseJsonIfPossible(text){
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  }
  stringSize(text){
    return new Blob([text]).size;
  }
  checkSize(text){
    let textSize = this.stringSize(text);
    if (textSize > maxValueSize){
      throw "Item too big to be stored: it size is " + textSize+ ". The max size is "+this.maxValueSize;
    }
  }
  stringifyValue(value){
    if (this.isValueString(value)){
      return value;
    }
    try {
      return JSON.stringify(value);
    } catch (error) {
      throw "Value cannot be stringify, error: "+error;
    }
  }
  checkIfKeyIsReserved(key){
    if (this.isKeyIsReserved(key)){
      throw "Key "+ key+" cannot be used, it is a Luigi reserved storage Key";
    }
  }
  isKeyIsReserved(key){
    return reservedKey4Luigi.some(regex => regex.test(key));
  }

}

export const storageManager = new StorageManager();
