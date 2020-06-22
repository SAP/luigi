/**
 * Intercepts a promise and caches it to allow multiple equal promise calls
 * which resolve at the same time with just one request.
 * Prevents duplicate fetch requests and behaves similar to a rxjs take(1).subscribe()
 */

import { GenericHelpers } from '../utilities/helpers';

class PromiseResolverCacheClass {
  constructor() {
    this.cache = new Map();
  }
  /**
   * Promise cache handler
   * @param {function} promiseFn a function that returns promise in question
   * @returns {promise} a new promise which resolves after the input promise has been resolved
   */
  async execAsPromise(promiseFn) {
    if (!GenericHelpers.isFunction(promiseFn)) {
      console.error(
        'execAsPromise awaits a function that returns a Promise. Falling back to non-caching.'
      );
      return promiseFn;
    }
    let tmpPromise;
    if (!this.cache.has(promiseFn)) {
      // not yet existing, create new promise with resolve
      tmpPromise = new Promise(resolve => {
        this.cache.set(promiseFn, [resolve]);
      });

      try {
        // resolve original promise
        const result = await promiseFn();
        // resolve all listeners
        this.cache.get(promiseFn).forEach(resolve => resolve(result));
      } catch (error) {
        console.error('execAsPromise: Error occured:', e);
      } finally {
        // cleanup
        this.cache.delete(promiseFn);
      }
    } else {
      // already existing, just add another resolver
      tmpPromise = new Promise(resolve => {
        const existingListeners = this.cache.get(promiseFn);
        existingListeners.push(resolve);
        this.cache.set(promiseFn, existingListeners);
      });
    }
    return tmpPromise;
  }
}

export const PromiseResolverCache = new PromiseResolverCacheClass();
