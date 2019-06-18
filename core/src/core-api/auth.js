import { config } from './config';

class LuigiAuthManager {
  constructor() {}

  /*
   * Detects if authorization is enabled via configuration.
   * @returns {boolean} returns true if authorization is enabled. Otherwise returns false.
   */
  isAuthorizationEnabled() {
    return !!config.getConfigValue('auth.use');
  }

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

export const auth = new LuigiAuthManager();
