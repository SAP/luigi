import { LuigiClientBase } from './baseClass';
import { helpers } from './helpers';

const pendingOperation = new Map();

/**
 * StorageManager allows you to use browser local storage (key/value); every storage operation is sent to managed by Luigi core.
 * The idea is that different micro frontends can share/persist items using local storage.
 * Since all storage operations are asynchronous (send vent to Luigi core that will reply once operation is finished), all the methods return Promises.
 * @name storageManager
 */
class StorageManager extends LuigiClientBase {
  /** @private */
  constructor() {
    super();
    this.storageEventProcessor = new StorageEventProcessor();
    helpers.addEventListener('storage', (evt, listenerId) =>
      this.storageEventProcessor.processEvent(evt, listenerId)
    );
  }

  /**
   * Store an item for a specific key.
   * @memberof storageManager
   * @param {string} key key used to identify the value
   * @param {Object} value item to store; object must be stringifyable
   * @returns {Promise<void>} resolves an empty value when storage operation is over; it will launch an error if storage is no supported, value cannot be stringify or you are using a luigi reserved key
   * @example
   * LuigiClient.storageManager().setItem('keyExample','valueExample').then(() => console.log('Value stored'))
   * @since NEXTRELEASE
   */
  setItem(key, value) {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'setItem', {
        key,
        value
      });
    });
  }

  /**
   * Retrieve an item for a specific key.
   * @memberof storageManager
   * @param {string} key used to identify the value
   * @returns {Promise<Object>} resolves item retrieved from storage; it will launch an error if storage is no supported
   * @example
   * LuigiClient.storageManager().getItem('keyExample').then((value) => console.log);
   * @since NEXTRELEASE
   */
  getItem(key) {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'getItem', { key });
    });
  }

  /**
   * Remove an item for a specific key.
   * @memberof storageManager
   * @param {string} key used to identify the value
   * @returns {Promise<Object>} resolves item just removed from storage; it will launch an error if storage is no supported or you are using a luigi reserved key
   * @example
   * LuigiClient.storageManager().removeItem('keyExample').then((value) => console.log(value + ' just removed')
   * @since NEXTRELEASE
   */
  removeItem(key) {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'removeItem', {
        key
      });
    });
  }

  /**
   * Clear all the storage key/values.
   * @memberof storageManager
   * @returns {Promise<void>} resolves when storage clear is over
   * @example
   * LuigiClient.storageManager().clear().then(() => console.log('storage cleared'))
   * @since NEXTRELEASE
   */
  clear() {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'clear', {});
    });
  }

  /**
   * Check if a key is present in storage.
   * @memberof storageManager
   * @param {string} key in the storage
   * @returns {Promise<boolean>} true if key is present, false if is not
   * @example
   * LuigiClient.storageManager().has(key).then((present) => console.log('item is present '+present))
   * @since NEXTRELEASE
   */
  has(key) {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'has', { key });
    });
  }

  /**
   * Get all the keys used in the storage.
   * @memberof storageManager
   * @returns {Promise<string[]>} keys currently present in the storage
   * @example
   * LuigiClient.storageManager().getAllKeys().then((keys) => console.log('keys are '+keys))
   * @since NEXTRELEASE
   */
  getAllKeys() {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'getAllKeys', {});
    });
  }
}

class StorageEventProcessor {
  processEvent(evt, listenerId) {
    try {
      const data = evt.data.data;
      if (!pendingOperation.has(data.id)) {
        console.log('Impossible to find Promise method for message ' + data.id);
        return;
      }
      const promiseOperations = pendingOperation.get(data.id);
      if (data.status === 'ERROR') {
        promiseOperations.reject(data.result);
      } else {
        promiseOperations.resolve(data.result);
      }
      pendingOperation.delete(data.id);
    } catch (e) {
      console.error(e);
    }
  }

  waitForSyncResult(id) {
    let start = new Date().getTime();
    while (!syncOperation.has(id)) {
      let exec = new Date().getTime() - start;
      if (exec > 10000) {
        throw 'Storage operation is taking more than 1 second...Some problem with Luigi Core communication';
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

  createPendingOperation(id, resolve, reject) {
    pendingOperation.set(id, {
      resolve,
      reject
    });
  }
  sendMessage(id, operation, params) {
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
