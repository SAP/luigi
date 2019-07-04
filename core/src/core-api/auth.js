import { config } from './config';

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
   * @memberof Authorization
   * @returns {boolean} true if authorization is enabled. Otherwise returns false.
   * @example
   * Luigi.auth().isAuthorizationEnabled();
   */
  isAuthorizationEnabled() {
    return !!config.getConfigValue('auth.use');
  }

  /**
   * @private
   * @memberof Authorization
   * @param {string} eventName
   * @param {Object} providerInstanceSettings
   * @param {mixed} data
   * @param {string} redirectUrl
   */
  async handleAuthEvent(
    eventName,
    providerInstanceSettings,
    data,
    redirectUrl
  ) {
    const result = await config.executeConfigFnAsync(
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
}

export const auth = new LuigiAuth();
