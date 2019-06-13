import * as AsyncHelpers from '../utilities/helpers/async-helpers';
import * as GenericHelpers from '../utilities/helpers/generic-helpers';
import { auth } from './auth';

class LuigiConfigManager {
  constructor() {
    this.configReadyTimeout = {
      valueMs: 65000,
      id: undefined
    };

    this.configReadyCallback = function() {};

    this.initialized = false;
  }

  setConfigCallbacks(configReadyCallback) {
    this.configReadyCallback = configReadyCallback;
    this.configReadyTimeout.id = setTimeout(() => {
      // Avoid Luigi initialization if timeout reached
      this.configReadyCallback = function() {};
      this.configNotReadyCallback();
    }, this.configReadyTimeout.valueMs);
  }

  setConfig(configInput) {
    clearTimeout(this.configReadyTimeout.id);
    this.config = configInput;
    window.Luigi._store.set({ config: configInput });
    this._configModificationTimestamp = new Date();
    if (!this.initialized) {
      this.initialized = true;
      this.configReadyCallback();
    }
  }

  getConfig() {
    return this.config;
  }

  configNotReadyCallback() {
    const errorMsg =
      'Ups.. Looks like Luigi was not configured. Please use Luigi.setConfig(config) function to configure Luigi.';
    console.error(errorMsg);
    this.setErrorMessage(errorMsg);
  }

  setErrorMessage(errorMsg) {
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
   * Gets value of the given property on Luigi config object.
   */
  getConfigValue(property) {
    return GenericHelpers.getConfigValueFromObject(this.getConfig(), property);
  }

  /*
   * Gets boolean value of the given property on Luigi config object.
   * Function return true if the property value is equal true or 'true'. Otherwise the function returns false.
   */
  getConfigBooleanValue(property) {
    const configuredValue = GenericHelpers.getConfigValueFromObject(
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
    return AsyncHelpers.getConfigValueFromObjectAsync(
      this.getConfig(),
      property,
      parameters
    );
  }

  /*
   * Executes the function of the given property on the Luigi config object.
   * Fails if property is not a function.
   *
   * If the value is a Function it is called (with the given parameters) and the result of that call is the value.
   * If the value is not a Promise it is wrapped to a Promise so that the returned value is definitely a Promise.
   */
  async executeConfigFnAsync(property, throwError = false, ...parameters) {
    const fn = this.getConfigValue(property);
    if (GenericHelpers.isFunction(fn)) {
      try {
        return await AsyncHelpers.applyFunctionPromisified(fn, parameters);
      } catch (error) {
        if (throwError) {
          return Promise.reject(error);
        }
      }
    }

    // Promise.reject(property + ' is not a function.');
    return Promise.resolve(undefined);
  }
  /*
   * Detects if authorization is enabled via configuration.
   * @returns {boolean} returns true if authorization is enabled. Otherwise returns false.
   * @deprecated now located in Luigi.auth() instead of LuigiConfig
   */
  isAuthorizationEnabled() {
    return auth.isAuthorizationEnabled();
  }
}

export const config = new LuigiConfigManager();
