import { LuigiAuth } from "../../core-api";
import * as GenericHelpers from "./generic-helpers"

export const getStoredAuthData = () =>
  JSON.parse(localStorage.getItem('luigi.auth'));

export const isLoggedIn = () => {
  const storedAuthData = JSON.parse(localStorage.getItem('luigi.auth'));
  const isAuthValid = () =>
    storedAuthData.accessTokenExpirationDate > Number(new Date());
  return storedAuthData && isAuthValid();
};

/**
 * Checks if there is a reason parameter in the url
 * and triggers onAuthError event with the found reason
 * and error parameters.
 * @param {object} providerInstanceSettings 
 */
export const handleUrlAuthErrors = async (providerInstanceSettings) => {
  const reason = GenericHelpers.getUrlParameter('reason');
  const error = GenericHelpers.getUrlParameter('error');
  if (reason) {
    return await LuigiAuth.handleAuthEvent('onAuthError', providerInstanceSettings, { reason, error }, providerInstanceSettings.logoutUrl + '?post_logout_redirect_uri=' + providerInstanceSettings.post_logout_redirect_uri + '&reason=' + reason + '&error=' + error);
  }
  return true;
};