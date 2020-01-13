import {
  AsyncHelpers,
  GenericHelpers,
  StateHelpers
} from '../utilities/helpers';
import { LuigiAuth, LuigiElements, LuigiI18N } from '.';
import { LifecycleHooks } from '../services';
/**
 * @name Configuration
 */
class LuigiConfig {
  /**
   * @private
   * @memberof Configuration
   */
  constructor() {
    this.configReadyCallback = function() {};
    this.initialized = false;
  }

  /**
   * @private
   * @memberof Configuration
   */
  setConfigCallbacks(configReadyCallback) {
    this.configReadyCallback = configReadyCallback;
  }

  /**
   * Sets the configuration for Luigi initially. Can also be called at a later point in time again to update the configuration.
   * @memberof Configuration
   * @param {Object} configInput the Luigi Core configuration object
   * @example
   * Luigi.setConfig({
   *   navigation: {
   *     nodes: () => [
   *       {
   *         pathSegment: 'home',
   *         label: 'Home',
   *         children: [
   *           {
   *             pathSegment: 'hello',
   *             label: 'Hello Luigi!',
   *             viewUrl: '/assets/basicexternal.html'
   *           }
   *         ]
   *       }
   *     ]
   *   },
   *   routing: {
   *     useHashRouting: true
   *   }
   * })
   */
  async setConfig(configInput) {
    this.config = configInput;
    window.Luigi._store.update(() => {
      return { config: configInput };
    });
    this._configModificationTimestamp = new Date();
    if (!this.initialized) {
      this.initialized = true;
      this.configReadyCallback().then(async () => {
        LifecycleHooks.luigiAfterInit();
        await this.executeConfigFnAsync('lifecycleHooks.luigiAfterInit');
      });
    }
  }

  /**
   * Returns the current active configuration
   * @returns {Object} configuration object
   * @memberof Configuration
   * @example
   * Luigi.getConfig()
   */
  getConfig() {
    return this.config;
  }

  /**
   * Tells Luigi that the configuration has been changed. Luigi will update the application or parts of it based on the specified scope.
   * @param {...string} scope one or more scope selectors specifying what parts of the configuration were changed. If no scope selector is provided, the whole configuration is considered changed.
   * <p>
   * The supported scope selectors are:
   * <p>
   * <ul>
   *   <li><code>navigation</code>: the navigation part of the configuration was changed. This includes navigation nodes, the context switcher, the product switcher and the profile menu.</li>
   *   <li><code>navigation.nodes</code>: navigation nodes were changed.</li>
   *   <li><code>navigation.contextSwitcher</code>: context switcher related data were changed.</li>
   *   <li><code>navigation.productSwitcher</code>: product switcher related data were changed.</li>
   *   <li><code>navigation.profile</code>: profile menu was changed.</li>
   *   <li><code>settings</code>: settings were changed.</li>
   *   <li><code>settings.header</code>: header settings (title, icon) were changed.</li>
   *   <li><code>settings.footer</code>: left navigation footer settings were changed.</li>
   * </ul>
   * @memberof Configuration
   */
  configChanged(...scope) {
    const optimizedScope = StateHelpers.optimizeScope(scope);
    if (optimizedScope.length > 0) {
      optimizedScope.forEach(s => {
        window.Luigi._store.fire(s, { current: window.Luigi._store });
      });
    } else {
      window.Luigi._store.update(config => config);
    }
  }

  /**
   * @private
   * @memberof Configuration
   */
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
    LuigiElements.getLuigiContainer().appendChild(fd_ui);
  }

  /**
   * Gets value of the given property on Luigi config object. Target can be a value or a synchronous function.
   * @memberof Configuration
   * @param {string} property the object traversal path
   * @example
   * Luigi.getConfigValue('auth.use')
   * Luigi.getConfigValue('settings.sideNavFooterText')
   */
  getConfigValue(property) {
    return GenericHelpers.getConfigValueFromObject(this.getConfig(), property);
  }

  /**
   * Gets boolean value of the given property on Luigi config object.
   * Function return true if the property value is equal true or 'true'. Otherwise the function returns false.
   * @memberof Configuration
   * @param {string} property the object traversal path
   * @example
   * Luigi.getConfigBooleanValue('settings.hideNavigation')
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

  /**
   * Gets value of the given property on the Luigi config object.
   * If the value is a Function it is called (with the given parameters) and the result of that call is the value.
   * If the value is not a Promise it is wrapped to a Promise so that the returned value is definitely a Promise.
   * @memberof Configuration
   * @param {string} property the object traversal path
   * @param {*} parameters optional parameters that are used if the target is a function
   * @example
   * Luigi.getConfigValueAsync('navigation.nodes')
   * Luigi.getConfigValueAsync('navigation.profile.items')
   * Luigi.getConfigValueAsync('navigation.contextSwitcher.options')
   */
  getConfigValueAsync(property, ...parameters) {
    return AsyncHelpers.getConfigValueFromObjectAsync(
      this.getConfig(),
      property,
      parameters
    );
  }

  /**
   * Executes the function of the given property on the Luigi config object.
   * Fails if property is not a function.
   *
   * If the value is a Function it is called (with the given parameters) and the result of that call is the value.
   * If the value is not a Promise it is wrapped to a Promise so that the returned value is definitely a Promise.
   * @private
   * @memberof Configuration
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
  /**
   * Detects if authorization is enabled via configuration.
   * @memberof Configuration
   * @returns {boolean} returns true if authorization is enabled. Otherwise returns false.
   * @deprecated now located in Luigi.auth() instead of Luigi
   */
  isAuthorizationEnabled() {
    return LuigiAuth.isAuthorizationEnabled();
  }
}

export const config = new LuigiConfig();
