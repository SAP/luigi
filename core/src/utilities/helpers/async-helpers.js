// Standalone or partly-standalone methods that are used widely through the whole app and are asynchronous.
import * as GenericHelpers from './generic-helpers.js';

const handles = {};

export const keyExistencyTimeout = 20000;
export const keyExistencyCheckInterval = 50;

export const waitForKeyExistency = (
  obj,
  name,
  timeout = keyExistencyTimeout
) => {
  const startTimer = Date.now();
  return new Promise((resolve, reject) => {
    handles[name] = setInterval(() => {
      if (obj[name]) {
        return resolve(true);
      }
      if (Date.now() - startTimer > timeout) {
        clearInterval(handles[name]);
        return reject(
          `${name} did not appear in object within ${timeout / 1000} seconds.`
        );
      }
    }, keyExistencyCheckInterval);
  });
};

export const wrapAsPromise = value => {
  return new Promise(resolve => {
    resolve(value);
  });
};

/**
 * Executes a function with a set of parameters
 * and returns its value as promise
 *
 * @param {function} value  a function
 * @param {array} args an array of arguments
 * @returns {promise}
 */
export const applyFunctionPromisified = (fn, args) => {
  fn = fn.apply(this, args);
  if (GenericHelpers.isPromise(fn)) {
    return fn;
  }
  return wrapAsPromise(fn);
};

/*
 * Gets value of the given property on the given object.
 * If the value is a Function it is called and the result of that call is the value.
 * If the value is not a Promise it is wrapped to a Promise so that the returned value is definitely a Promise.
 */
export const getConfigValueFromObjectAsync = (
  object,
  property,
  ...parameters
) => {
  let value = GenericHelpers.getConfigValueFromObject(object, property);
  if (GenericHelpers.isFunction(value)) {
    return applyFunctionPromisified(value, parameters);
  }
  return wrapAsPromise(value);
};
