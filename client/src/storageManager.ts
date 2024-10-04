import { LuigiClientBase } from './baseClass';
import { helpers } from './helpers';

const pendingOperation: Map<number, any> = new Map();
const syncOperation: Map<number, any> = new Map();

/**
 * <!-- label-success: Web App API only  -->
 * StorageManager allows you to use browser local storage of key/values. Every storage operation is sent to be managed by Luigi Core.
 * The idea is that different micro frontends can share or persist items using local storage, as long as they come from the same domain and follow the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).
 * Since all storage operations are asynchronous (sending an event to Luigi Core that will reply once operation is finished), all the methods return Promises.
 * @name storageManager
 */
class StorageManager extends LuigiClientBase {
  private storageEventProcessor: StorageEventProcessor;

  /** @private */
  constructor() {
    super();

    this.storageEventProcessor = new StorageEventProcessor();
    helpers.addEventListener('storage', (event: any) => this.storageEventProcessor.processEvent(event));
  }

  /**
   * Stores an item for a specific key.
   * @memberof storageManager
   * @param {string} key key used to identify the value
   * @param {Object} value item to store; object must be stringifyable
   * @returns {Promise<void>} resolves an empty value when the storage operation is over. It will launch an error if storage is not supported, the value cannot be stringified, or if you are using a Luigi reserved key.
   * @example
   * LuigiClient.storageManager().setItem('keyExample','valueExample').then(() => console.log('Value stored'))
   * @since 1.6.0
   */
  setItem(key: string, value: Record<string, any>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'setItem', {
        key,
        value
      });
    });
  }

  /**
   * Retrieves an item for a specific key.
   * @memberof storageManager
   * @param {string} key used to identify the value
   * @returns {Promise<Object>} resolves an item retrieved from storage. It will launch an error if storage is not supported.
   * @example
   * LuigiClient.storageManager().getItem('keyExample').then((value) => console.log);
   * @since 1.6.0
   */
  getItem(key: string): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'getItem', { key });
    });
  }

  /**
   * Removes an item for a specific key.
   * @memberof storageManager
   * @param {string} key used to identify the value
   * @returns {Promise<Object>} resolves an item just removed from storage. It will launch an error if storage is not supported or if you are using a Luigi reserved key.
   * @example
   * LuigiClient.storageManager().removeItem('keyExample').then((value) => console.log(value + ' just removed')
   * @since 1.6.0
   */
  removeItem(key: string): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'removeItem', {
        key
      });
    });
  }

  /**
   * Clears all the storage key/values.
   * @memberof storageManager
   * @returns {Promise<void>} resolves when storage clear is over.
   * @example
   * LuigiClient.storageManager().clear().then(() => console.log('storage cleared'))
   * @since 1.6.0
   */
  clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'clear', {});
    });
  }

  /**
   * Checks if a key is present in storage.
   * @memberof storageManager
   * @param {string} key key in the storage
   * @returns {Promise<boolean>} `true` if key is present, `false` if it is not
   * @example
   * LuigiClient.storageManager().has(key).then((present) => console.log('item is present '+present))
   * @since 1.6.0
   */
  has(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'has', { key });
    });
  }

  /**
   * Gets all the keys used in the storage.
   * @memberof storageManager
   * @returns {Promise<string[]>} keys currently present in the storage
   * @example
   * LuigiClient.storageManager().getAllKeys().then((keys) => console.log('keys are '+keys))
   * @since 1.6.0
   */
  getAllKeys(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.storageEventProcessor.execute(resolve, reject, 'getAllKeys', {});
    });
  }
}

class StorageEventProcessor {
  processEvent(event: any) {
    try {
      const data: Record<string, any> = event.data.data;

      if (!pendingOperation.has(data['id'])) {
        console.log('Impossible to find Promise method for message ' + data['id']);
        return;
      }

      const promiseOperations: any = pendingOperation.get(data['id']);

      if (data['status'] === 'ERROR') {
        promiseOperations.reject(data['result']);
      } else {
        promiseOperations.resolve(data['result']);
      }

      pendingOperation.delete(data['id']);
    } catch (error) {
      console.error(error);
    }
  }

  waitForSyncResult(id: number): any {
    const start: number = new Date().getTime();

    while (!syncOperation.has(id)) {
      const exec: number = new Date().getTime() - start;

      if (exec > 10000) {
        throw 'Storage operation is taking more than 1 second... Some problem with Luigi Core communication';
      }
    }

    const result: any = syncOperation.get(id);

    pendingOperation.delete(id);

    return result;
  }

  execute(resolve: (value?: any) => void, reject: () => void, operation: any, params: any): void {
    let id: number = helpers.getRandomId();

    this.createPendingOperation(id, resolve, reject);
    this.sendMessage(id, operation, params);
  }

  createPendingOperation(id: number, resolve: (value?: any) => void, reject: () => void): void {
    pendingOperation.set(id, {
      resolve,
      reject
    });
  }

  sendMessage(id: number, operation: any, params: any): void {
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

const _storageManager = new StorageManager();

export default _storageManager;
