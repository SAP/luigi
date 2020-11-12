import { LuigiClientBase } from './baseClass';
import { helpers } from './helpers';

const pendingOperation = new Map();

/**
 * Storage manager allows you to use browser local storage (key/value); Luigi is using some dedicated keys (for preferences and authentication): if you try to use them, you will get an error.
 * @name StorageManager
 */
class StorageManager extends LuigiClientBase {
  /** @private */
  constructor() {
    super();
    this.storageEventProcessor = new StorageEventProcessor();
    helpers.addEventListener('storage',
      (evt, listenerId) => this.storageEventProcessor.processEvent(evt, listenerId)
    );
  }

  /**
   * Asynchronously store a value for a specific key.
   * @param {string} key used to identify the value
   * @param {Object} item to store; object must be stringifyable
   * @returns {Promise<void>} resolves an empty value when storage operation is over; it will launch an error if storage is no supported, value cannot be stringify or you are using a luigi reserved key
   * @example
   * LuigiClient.storageManager().setItem('keyExample','valueExample').then(() => console.log('Value stored'))
   */
  setItem(key, value) {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'setItem', {key, value});
    });
  }

  /**
   * Synchronously store a value for a specific key.
   * @param {string} key used to identify the value
   * @param {Object} item to store; object must be stringifyable
   * @returns {void} it will launch an error if storage is no supported, value cannot be stringify or you using a luigi reserved key
   * @example
   * LuigiClient.storageManager().setItemSync('keyExample','valueExample')
   */
  setItemSync(key, value) {
  //  return await this.setItem(key, value);
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
      this.storageEventProcessor.execute(resolve, reject, 'getItem', {key});
    });
  }

  /**
   * Synchronously retrieve a value for a specific key.
   * @param {string} key used to identify the value
   * @returns {Object} item retrieved from storage; it will launch an error if storage is no supported
   * @example
   * LuigiClient.storageManager().getItemSync('keyExample')
   */
  getItemSync(key){
    //return await this.getItemSync(key);
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
      this.storageEventProcessor.execute(resolve, reject, 'removeItem', {key});
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
    // return await this.removeItem(key);
  }

  /**
   * Asynchronously clear all the storage key/values; all Luigi values used by core application will not be deleted
   * @returns {Promise<void>} resolves when storage clear is over
   * @example
   * LuigiClient.storageManager().clear().then(() => console.log('storage cleared'))
   */
  clear() {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'clear', {});
    });
  }

  /**
   * Synchronously clear all the storage key/values; all Luigi values used by core application will not be deleted
   * @returns {void}
   * @example
   * LuigiClient.storageManager().clearSync()
   */
  clearSync(){
    // return await this.clear();
  }

  /**
   * Check if a key is present in storage
   * @param {string} key in the storage
   * @returns {Promise<boolean>} true if key is present, false if is not
   * @example
   * LuigiClient.storageManager().has(key).then((present) => console.log('item is present '+present))
   */
  has(key){
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'has', {key});
    });
  }

  /**
   * Synchronously check if a key is present in storage
   * @param {string} key in the storage
   * @returns {boolean} true if key is present, false if is not
   * @example
   * LuigiClient.storageManager().has(key)
   */
   has(key){
    // return await this.has(key);
  }

  /**
   * Get all the keys used in the storage
   * @returns {Promise<string[]>} keys currently present in the storage
   * @example
   * LuigiClient.storageManager().getAllKeys().then((keys) => console.log('keys are '+keys))
   */
  getAllKeys(){
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'getAllKeys', {});
    });
  }

  /**
   * Synchronously get all the keys used in the storage
   * @returns {string[]} keys currently present in the storage
   * @example
   * LuigiClient.storageManager().getAllKeys()
   */
  getAllKeysSync(){
    // return await this.getItemSync();
  }
}

class StorageEventProcessor{

  processEvent(evt, listenerId){
    try {
      const data = evt.data.data;
      if (!pendingOperation.has(data.id)) {
        console.log("Impossible to find Promise method for message " + data.id);
        return;
      }
      const promiseOperations = pendingOperation.get(data.id);
      if (data.status === 'ERROR') {
        promiseOperations.reject(data.result);
      } else {
        promiseOperations.resolve(data.result);
      }
      pendingOperation.delete(data.id);
    }catch (e){
      console.error(e);
    }
  }

  waitForSyncResult(id){
    let start = new Date().getTime();
    while(!syncOperation.has(id)){
      let exec = new Date().getTime() - start;
      if (exec > 10000){
        throw "Storage operation is taking more than 1 second...Some problem with Luigi Core communication"
      }
    }
    const result = syncOperation.get(id);
    pendingOperation.delete(id);
    return result;
  }

  execute(resolve, reject, operation, params) {
    let id = helpers.getRandomId();
    this.createPendingOperation(id, resolve, reject);
    this.sendMessage(id, operation, params);
  }

  createPendingOperation(id, resolve, reject){
    pendingOperation.set(id, {
      resolve,
      reject
    });
  }
  sendMessage(id, operation, params){
    helpers.sendPostMessageToLuigiCore({
      msg: 'storage',
      data: {
        id,
        operation,
        params
      }
    });
  }

}


export const storageManager = new StorageManager();
