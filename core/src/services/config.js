import { isFunction, isPromise, wrapAsPromise } from '../utilities/helpers.js';
class LuigiConfigManager {
  constructor() {
    this.configReadyTimeout = {
      valueMs: 2000,
      id: undefined
    };
    this.config;

    this.configReadyCallback = function() {};
  }

  setConfigCallbacks(configReadyCallback) {
    this.configReadyCallback = configReadyCallback;
    this.configReadyTimeout.id = setTimeout(() => {
      // Avoid Luigi initialization if timeout reached
      this.configReadyCallback = function() {};
      this.configNotReadyCallback();
    }, 2000);
  }

  setConfig(configInput) {
    // console.log("Set config");
    clearTimeout(this.configReadyTimeout.id);
    this.config = configInput;
    this.configReadyCallback();
  }

  getConfig() {
    return this.config;
  }

  configNotReadyCallback() {
    const errorMsg =
      'Ups.. Looks like Luigi was not configured. Please use Luigi.setConfig(config) function to configure Luigi.';
    console.error(errorMsg);
    var errorTextNode = document.createTextNode(errorMsg);
    var fd_ui = document.createElement('div');
    fd_ui.setAttribute('class', 'fd-ui');
    fd_ui.setAttribute('style', 'text-align: center;');

    var errorDiv = document.createElement('div');
    errorDiv.setAttribute('class', 'fd-alert fd-alert--error');
    errorDiv.setAttribute(
      'style',
      'max-width: 800px; display: inline-block; margin-top: 40px;'
    );
    errorDiv.appendChild(errorTextNode);

    fd_ui.appendChild(errorDiv);
    document.body.appendChild(fd_ui);
  }

  /*
   * Gets value of the given property on the given object.
   */
  getConfigValueFromObject(object, property) {
    let propIndex = 0;
    let nextValue = object;
    const propertyPath = property.split('.');
    while (nextValue && propIndex < propertyPath.length) {
      nextValue = nextValue[propertyPath[propIndex++]];
    }
    return nextValue;
  }

  /*
  * Gets value of the given property on the given object.
  * If the value is a Function it is called and the result of that call is the value.
  * If the value is not a Promise it is wrapped to a Promise so that the returned value is definitely a Promise.
  */
  getConfigValueFromObjectAsync(object, property, ...parameters) {
    let value = this.getConfigValueFromObject(object, property);
    if (isFunction(value)) {
      value = value.apply(this, parameters);
      if (isPromise(value)) {
        return value;
      }
    }
    return wrapAsPromise(value);
  }

  /*
   * Gets value of the given property on Luigi config object.
   */
  getConfigValue(property) {
    return this.getConfigValueFromObject(this.getConfig(), property);
  }

  /*
   * Gets boolean value of the given property on Luigi config object.
   * Function return true if the property value is equal true or 'true'. Otherwise the function returns false.
   */
  getConfigBooleanValue(property) {
    const configuredValue = this.getConfigValueFromObject(
      this.getConfig(),
      property
    );
    if (configuredValue === true || configuredValue === 'true') {
      return true;
    }
    return false;
  }

  /*
   * Gets value of the given property on the Luigi config object.
   * If the value is a Function it is called (with the given parameters) and the result of that call is the value.
   * If the value is not a Promise it is wrapped to a Promise so that the returned value is definitely a Promise.
   */
  getConfigValueAsync(property, ...parameters) {
    return this.getConfigValueFromObjectAsync(
      this.getConfig(),
      property,
      parameters
    );
  }
}
const LuigiInstance = new LuigiConfigManager();

// Expose it window for user app to call Luigi.setConfig()
window.Luigi = LuigiInstance;

export const LuigiConfig = LuigiInstance;
