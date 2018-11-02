import {
  getConfigValueFromObject,
  isFunction,
  isPromise,
  wrapAsPromise
} from '../utilities/helpers.js';

const handles = {};

export const keyExistencyTimeout = 2000;
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
        return reject(false);
      }
    }, keyExistencyCheckInterval);
  });
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
  let value = getConfigValueFromObject(object, property);
  if (isFunction(value)) {
    value = value.apply(this, parameters);
    if (isPromise(value)) {
      return value;
    }
  }
  return wrapAsPromise(value);
};
