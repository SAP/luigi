import {isFunction, isPromise} from '../utilities/helpers.js';

export class Luigi {

  constructor(configReadyCallback) {
    this.configReadyCallback = configReadyCallback || function () {
    };
  }

  setConfig(configInput) {
    this.config = configInput
    // if (this.config.auth && this.config.auth.use === 'oAuth2ImplicitGrant' && this.config.auth.useDefaultTokenHandler !== false) {
    //   oauthHandler();
    // }
    this.configReadyCallback();
  }

  getConfig() {
    return this.config;
  }

  setReadyCallback(foo) {
    this.readyCallback = foo;
  }

  /*
   * Gets value of the given property on Luigi config object.
   */
  getConfigValue(property) {
    return this.getConfigValueFromObjectAsync(this.config, property);
  };


  /*
   * Gets boolean value of the given property on Luigi config object.
   * Function return true if the property value is equal true or 'true'. Otherwise the function returns false.
   */
  getConfigBooleanValue(property) {
    const configuredValue = this.getConfigValueFromObjectAsync(
      this.config,
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
  getConfigValueFromObjectAsync(object, property, ...parameters) {
    let value = this.getConfigValueFromObjectAsync(object, property);
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
  getConfigValueAsync(property, ...parameters) {
    return this.getConfigValueFromObjectAsync(
      this.config,
      property,
      parameters
    );
  };

  wrapAsPromise(value) {
    return new Promise(resolve => {
      resolve(value);
    });
  };

  getConfigValueFromObjectAsync(object, property) {
    let propIndex = 0;
    let nextValue = object;
    const propertyPath = property.split('.');
    while (nextValue && propIndex < propertyPath.length) {
      nextValue = nextValue[propertyPath[propIndex++]];
    }
    return nextValue;
  }
}
