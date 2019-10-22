import { LuigiConfig } from './';
import { AuthStoreSvc } from '../services';

/**
 * Authorization helpers
 * @name Authorization
 */
class LuigiAuth {
  /**
   * @private
   * @memberof Authorization
   */
  constructor() {}

  /**
   * Detects if authorization is enabled via configuration.
   * Read more about [custom authorization providers](authorization-configuration.md).
   * @memberof Authorization
   * @returns {boolean} true if authorization is enabled. Otherwise returns false.
   * @example
   * Luigi.auth().isAuthorizationEnabled();
   */
  isAuthorizationEnabled() {
    return !!LuigiConfig.getConfigValue('auth.use');
  }

  /**
   * @private
   * @memberof Authorization
   * @param {string} eventName
   * @param {Object} providerInstanceSettings
   * @param {*} data
   * @param {string} redirectUrl
   */
  async handleAuthEvent(
    eventName,
    providerInstanceSettings,
    data,
    redirectUrl
  ) {
    const result = await LuigiConfig.executeConfigFnAsync(
      'auth.events.' + eventName,
      false,
      providerInstanceSettings,
      data
    );
    let redirect = result === undefined || !!result;
    if (redirect && redirectUrl) {
      window.location.href = redirectUrl;
      return;
    }
    return redirect;
  }
  /**
   * Authorization Storage helpers, to be used in your custom authorization provider.
   * Read more about [custom authorization providers](authorization-configuration.md#Implement a custom authorization provider).
   * @name AuthorizationStore
   */
  get store() {
    return {
      /**
       * Retrieves the key name that is used to store the auth data.
       * @memberof AuthorizationStore
       * @returns {string} name of the store key
       * @example Luigi.auth().store.storageKey
       */
      storageKey: AuthStoreSvc.storageKey,
      /**
       * Retrieves the storage type that is used to store the auth data.
       * @memberof AuthorizationStore
       * @returns {('localStorage'|'sessionStorage'|'none')} storage type
       * @example Luigi.auth().store.storageType
       */
      storageType: AuthStoreSvc.storageType,
      /**
       * Retrieves the current auth object.
       * @memberof AuthorizationStore
       * @returns {*} auth data
       * @example Luigi.auth().store.authData
       */
      authData: AuthStoreSvc.authData,

      setAuthData: values => AuthStoreSvc.setAuthData(values),
      removeAuthData: () => AuthStoreSvc.removeAuthData(),
      isNewlyAuthorized: AuthStoreSvc.isNewlyAuthorized,
      setNewlyAuthorized: () => AuthStoreSvc.setNewlyAuthorized(),
      removeNewlyAuthorized: () => AuthStoreSvc.removeNewlyAuthorized()
    };
  }
}

export const auth = new LuigiAuth();
