// import * as AsyncHelpers from '../utilities/helpers/async-helpers';
// import * as GenericHelpers from '../utilities/helpers/generic-helpers';
import { config } from './config';

class LuigiAuthManager {
  constructor() { }

  /*
   * Detects if authorization is enabled via configuration.
   * @returns {boolean} returns true if authorization is enabled. Otherwise returns false.
   */
  isAuthorizationEnabled() {
    const idpProviderName = config.getConfigValue('auth.use');
    const idpProviderSettings = config.getConfigValue(
      `auth.${idpProviderName}`
    );
    return !!idpProviderSettings;
  }

  async handleAuthEvent(eventName, providerInstanceSettings, data, redirectUrl) {
    const result = await config.executeConfigFnAsync('auth.events.' + eventName, providerInstanceSettings, data);
    let redirect = result === undefined || !!result;
    if (redirect && redirectUrl) {
      window.location.href = redirectUrl;
      return;
    }
    return redirect;
  }
}

export const auth = new LuigiAuthManager();
