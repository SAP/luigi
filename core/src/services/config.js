import { isFunction, isPromise } from '../utilities/helpers.js';

(function() {
  window.Luigi = {
    setConfig: configInput => {
      window.Luigi.config = configInput;
    },
    getConfig: () => {
      return window.Luigi.config;
    }
  };
})();
/*
 * Gets value of the given property on the given object.
 */
export const getConfigValueFromObject = (object, property) => {
  let propIndex = 0;
  let nextValue = object;
  const propertyPath = property.split('.');
  while (nextValue && propIndex < propertyPath.length) {
    nextValue = nextValue[propertyPath[propIndex++]];
  }
  return nextValue;
};

/*
 * Gets value of the given property on Luigi config object.
 */
export const getConfigValue = property => {
  return getConfigValueFromObject(window.Luigi.config, property);
};

/*
 * Gets boolean value of the given property on Luigi config object.
 * Function return true if the property value is equal true or 'true'. Otherwise the function returns false.
 */
export const getConfigBooleanValue = property => {
  const configuredValue = getConfigValueFromObject(
    window.Luigi.config,
    property
  );
  if (configuredValue === true || configuredValue === 'true') {
    return true;
  }
  return false;
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

/*
 * Gets value of the given property on the Luigi config object.
 * If the value is a Function it is called (with the given parameters) and the result of that call is the value.
 * If the value is not a Promise it is wrapped to a Promise so that the returned value is definitely a Promise.
 */
export const getConfigValueAsync = (property, ...parameters) => {
  return getConfigValueFromObjectAsync(
    window.Luigi.config,
    property,
    parameters
  );
};

const wrapAsPromise = value => {
  return new Promise(resolve => {
    resolve(value);
  });
};
