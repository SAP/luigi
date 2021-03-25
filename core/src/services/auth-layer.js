import { LuigiAuth, LuigiConfig } from '../core-api';
import { AuthHelpers, GenericHelpers } from '../utilities/helpers';
import { AuthStoreSvc } from './';
import { get, writable } from 'svelte/store';

class AuthLayerSvcClass {
  constructor() {
    this._userInfoStore = writable({});
    this._loggedInStore = writable(false);
    return this;
  }

  setUserInfo(uInfo) {
    this._userInfoStore.set(uInfo);
  }
  setLoggedIn(loggedIn) {
    this._loggedInStore.set(loggedIn);
  }

  getUserInfoStore() {
    return this._userInfoStore;
  }

  getLoggedInStore() {
    return this._loggedInStore;
  }

  setProfileLogoutFn(fn) {
    this._profileLogoutFn = fn;
  }

  async init() {
    const idpProviderName = LuigiConfig.getConfigValue('auth.use');
    if (!idpProviderName) {
      // No Authentication active
      return Promise.resolve(true);
    }
    const idpProviderSettings = LuigiConfig.getConfigValue(`auth.${idpProviderName}`);

    /**
     * Prevent IDP Provider initialization, if an error is present
     * in the url params and onAuthError is defined in the user config.
     * errors are represented by `error` and `errorDescription` param.
     */
    const uaError = AuthHelpers.parseUrlAuthErrors() || {};
    const noError = await AuthHelpers.handleUrlAuthErrors(idpProviderSettings, uaError.error, uaError.errorDescription);
    if (!noError) {
      return;
    }

    this.idpProviderInstance = this.getIdpProviderInstance(idpProviderName, idpProviderSettings);
    if (GenericHelpers.isPromise(this.idpProviderInstance)) {
      return this.idpProviderInstance
        .then(resolved => {
          this.idpProviderInstance = resolved;
          return this.checkAuth(idpProviderSettings);
        })
        .catch(err => {
          const errorMsg = `Error: ${err.message || err}`;
          console.error(errorMsg, err.message && err);
          LuigiConfig.setErrorMessage(errorMsg);
        });
    }
    return this.checkAuth(idpProviderSettings);
  }

  async checkAuth(idpProviderSettings) {
    const authData = AuthHelpers.getStoredAuthData();
    if (!authData || !AuthHelpers.isLoggedIn()) {
      if (LuigiConfig.getConfigValue('auth.disableAutoLogin')) {
        return;
      }

      /**
       * onAuthExpired
       * If onAuthExpired exists, it will be evaluated.
       * Continues with the standard authorization flow,
       * if `onAuthExpired` it returns undefined or truthy value.
       */
      let startAuth = true;
      if (authData) {
        startAuth = await LuigiAuth.handleAuthEvent('onAuthExpired', idpProviderSettings);
      }
      if (startAuth) {
        return this.startAuthorization();
      }
      return;
    }

    if (this.idpProviderInstance.settings && GenericHelpers.isFunction(this.idpProviderInstance.settings.userInfoFn)) {
      this.idpProviderInstance.settings.userInfoFn(this.idpProviderInstance.settings, authData).then(userInfo => {
        this.setUserInfo(userInfo);
        this.setLoggedIn(true);
      });
    } else {
      if (GenericHelpers.isFunction(this.idpProviderInstance.userInfo)) {
        this.idpProviderInstance.userInfo(idpProviderSettings).then(userInfo => {
          this.setUserInfo(userInfo);
          this.setLoggedIn(true);
        });
      } else {
        this.setLoggedIn(true);
        this.setUserInfo(get(this._userInfoStore));
      }
    }

    const hasAuthSuccessFulFn = GenericHelpers.isFunction(LuigiConfig.getConfigValue('auth.events.onAuthSuccessful'));

    if (hasAuthSuccessFulFn && AuthStoreSvc.isNewlyAuthorized()) {
      await LuigiAuth.handleAuthEvent('onAuthSuccessful', idpProviderSettings, authData);
    }
    AuthStoreSvc.removeNewlyAuthorized();

    if (GenericHelpers.isFunction(this.idpProviderInstance.setTokenExpirationAction)) {
      this.idpProviderInstance.setTokenExpirationAction();
    }
    if (GenericHelpers.isFunction(this.idpProviderInstance.setTokenExpireSoonAction)) {
      this.idpProviderInstance.setTokenExpireSoonAction();
    }
  }

  async startAuthorization() {
    if (this.idpProviderInstance) {
      return this.idpProviderInstance.login().then(res => {
        AuthStoreSvc.setNewlyAuthorized();
        if (res) {
          // TODO: is not required for secure usecases, only if auth is done within core.
          // Normally the login() redirects to external idp and errors are shown there.
          console.error(res);
        }
        return;
      });
    }
  }

  logout() {
    const authData = AuthHelpers.getStoredAuthData();
    const logoutCallback = async redirectUrl => {
      await LuigiAuth.handleAuthEvent('onLogout', this.idpProviderInstance.settings, undefined, redirectUrl);
      AuthStoreSvc.removeAuthData();
    };
    const customLogoutFn = LuigiConfig.getConfigValue(`auth.${LuigiConfig.getConfigValue('auth.use')}.logoutFn`);
    if (GenericHelpers.isFunction(customLogoutFn)) {
      customLogoutFn(this.idpProviderInstance.settings, authData, logoutCallback);
    } else if (GenericHelpers.isFunction(this.idpProviderInstance.logout)) {
      this.idpProviderInstance.logout(authData, logoutCallback);
    } else if (this._profileLogoutFn) {
      // TODO: Is this being reached at all? similar code is in Authorization.html
      // TODO: PROFNAVLOGOUT: three smiliar implementations. profilen
      this._profileLogoutFn(authData, logoutCallback);
    } else {
      logoutCallback(this.idpProviderInstance.settings.logoutUrl);
    }
  }

  IdpProviderException(message) {
    return { message, name: 'IdpProviderException' };
  }

  async getIdpProviderInstance(idpProviderName, idpProviderSettings) {
    // custom provider provided via config:
    const idpProvider = GenericHelpers.getConfigValueFromObject(idpProviderSettings, 'idpProvider');
    if (idpProvider) {
      const customIdpInstance = await new idpProvider(idpProviderSettings);
      ['login'].forEach(requiredFnName => {
        if (!GenericHelpers.isFunction(customIdpInstance[requiredFnName])) {
          throw this.IdpProviderException(
            `${requiredFnName} function does not exist in custom IDP Provider ${idpProviderName}`
          );
        }
      });

      return customIdpInstance;
    }

    // handle non-existing providers
    const onAuthConfigError = GenericHelpers.isFunction(LuigiConfig.getConfigValue('auth.events.onAuthConfigError'));
    if (onAuthConfigError) {
      await LuigiAuth.handleAuthEvent('onAuthConfigError', {
        idpProviderName: idpProviderName,
        type: 'IdpProviderException',
      });
    } else {
      throw this.IdpProviderException(`IDP Provider ${idpProviderName} does not exist.`);
    }
  }

  unload() {
    if (this.idpProviderInstance && GenericHelpers.isFunction(this.idpProviderInstance.unload)) {
      this.idpProviderInstance.unload();
    }
  }
}

export const AuthLayerSvc = new AuthLayerSvcClass();
