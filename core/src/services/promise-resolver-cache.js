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
  execPromise(promiseFn) {
    if (!GenericHelpers.isFunction(promiseFn)) {
      console.error(
        'execPromise awaits a function that returns a Promise. Falling back to non-caching.'
      );
      return promiseFn;
    }
    let tmpPromise;
    if (!this.cache.has(promiseFn)) {
      // not yet existing, create new promise with resolve
      tmpPromise = new Promise(resolve => {
        this.cache.set(promiseFn, [resolve]);
      });

      // resolve original promise
      const promise = promiseFn();
      if (!GenericHelpers.isPromise(promise)) {
        console.error(
          'execPromise awaits a function that returns a Promise, it is a function, but does not return a promise',
          typeof promise,
          promise,
          'falling back to non-caching.'
        );
        return promise;
      }
      promise
        .then(result => {
          // resolve all listeners
          this.cache.get(promiseFn).forEach(resolve => resolve(result));
          this.cache.delete(promiseFn);
        })
        .catch(e => {
          console.error('Error occured:', e);
        });
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
