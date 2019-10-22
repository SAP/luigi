/* istanbul ignore file */
import { GenericHelpers } from '../../utilities/helpers';
import { LuigiAuth } from '../../core-api';
import { AuthStoreSvc } from '../../services';

export class oAuth2ImplicitGrant {
  constructor(settings = {}) {
    const defaultSettings = {
      oAuthData: {
        redirect_uri:
          window.location.origin + '/luigi-core/auth/oauth2/callback.html',
        response_type: 'id_token token',
        scope: ''
      },
      authorizeMethod: 'GET',
      logoutUrl: '',
      post_logout_redirect_uri: window.location.origin + '/logout.html',
      accessTokenExpiringNotificationTime: 60,
      expirationCheckInterval: 5
    };
    const mergedSettings = GenericHelpers.deepMerge(defaultSettings, settings);

    this.settings = mergedSettings;
  }

  getAuthData() {
    return AuthStoreSvc.authData;
  }

  parseIdToken(token) {
    const payload = token
      .split('.')[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    return JSON.parse(window.atob(payload));
  }

  userInfo() {
    return new Promise((resolve, reject) => {
      let authData = this.getAuthData();
      const tokenInfo = this.parseIdToken(authData.idToken);
      const userInfo = {
        email: tokenInfo.email ? tokenInfo.email : '',
        name: tokenInfo.name ? tokenInfo.name : ''
      };
      resolve(userInfo);
    });
  }

  login() {
    return new Promise((resolve, reject) => {
      const settings = this.settings;
      const generatedNonce =
        (settings.nonceFn && settings.nonceFn()) || this.generateNonce();
      sessionStorage.setItem('luigi.nonceValue', generatedNonce);

      const createInputElement = (name, value) => {
        const inputElem = document.createElement('input');
        inputElem.name = name;
        inputElem.id = name;
        inputElem.value = value;
        inputElem.type = 'hidden';
        return inputElem;
      };

      const formElem = document.createElement('form');
      formElem.name = 'signIn';
      formElem.id = 'signIn';
      formElem.action = settings.authorizeUrl;
      formElem.method = settings.authorizeMethod;
      formElem.target = '_self';

      settings.oAuthData.redirect_uri = `${GenericHelpers.prependOrigin(
        settings.oAuthData.redirect_uri
      )}?storageType=${AuthStoreSvc.storageType}`;
      settings.oAuthData.state = btoa(
        window.location.href + '_luigiNonce=' + generatedNonce
      );

      for (const name in settings.oAuthData) {
        const node = createInputElement(name, settings.oAuthData[name]);
        formElem.appendChild(node.cloneNode());
      }

      document.getElementsByTagName('body')[0].appendChild(formElem);
      setTimeout(() => {
        document.querySelector('form#signIn').submit();
      });

      // TODO: We're not resolving the promise at any time,
      // since oauth2 is redirecting off the page
      // maybe it is possible to catch errors
      document.querySelector('form#signIn').addEventListener('load', e => {
        console.info('load, e', e, this);
      });
    });
  }

  logout(authData, authEventLogoutFn) {
    const settings = this.settings;
    const logouturl = `${settings.logoutUrl}?id_token_hint=${
      authData.idToken
    }&client_id=${
      settings.oAuthData.client_id
    }&post_logout_redirect_uri=${GenericHelpers.prependOrigin(
      settings.post_logout_redirect_uri
    )}`;
    authEventLogoutFn && authEventLogoutFn();

    setTimeout(() => {
      window.location.href = logouturl;
    });
  }

  setTokenExpirationAction() {
    const expirationCheckInterval = 5000;
    const expirationCheckIntervalInstance = setInterval(() => {
      let authData = this.getAuthData();
      if (!authData) {
        return clearInterval(expirationCheckIntervalInstance);
      }

      const tokenExpirationDate =
        (authData && authData.accessTokenExpirationDate) || 0;
      const currentDate = new Date();
      if (tokenExpirationDate - currentDate < expirationCheckInterval) {
        clearInterval(expirationCheckIntervalInstance);
        AuthStoreSvc.removeAuthData();
        // TODO: check if valid (mock-auth requires it), post_logout_redirect_uri is an assumption, might not be available for all auth providers
        const redirectUrl = `${
          this.settings.logoutUrl
        }?error=tokenExpired&post_logout_redirect_uri=${GenericHelpers.prependOrigin(
          this.settings.post_logout_redirect_uri
        )}`;
        LuigiAuth.handleAuthEvent(
          'onAuthExpired',
          this.settings,
          undefined,
          redirectUrl
        );
      }
    }, expirationCheckInterval);
  }

  setTokenExpireSoonAction() {
    const accessTokenExpiringNotificationTime =
      this.settings.accessTokenExpiringNotificationTime * 1000;
    const expirationCheckInterval =
      this.settings.expirationCheckInterval * 1000;
    let authData = this.getAuthData();
    if (authData) {
      const expirationCheckIntervalInstance = setInterval(() => {
        const tokenExpirationDate =
          (authData && authData.accessTokenExpirationDate) || 0;
        const currentDate = new Date();
        if (
          tokenExpirationDate - currentDate.getTime() <
          accessTokenExpiringNotificationTime
        ) {
          LuigiAuth.handleAuthEvent('onAuthExpireSoon', this.settings);
          clearInterval(expirationCheckIntervalInstance);
        }
      }, expirationCheckInterval);
    }
  }

  generateNonce() {
    const validChars =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz';

    const crypto = window.crypto || window.msCrypto;
    const random = Array.from(crypto.getRandomValues(new Uint8Array(20)));

    return random.map(x => validChars[x % validChars.length]).join('');
  }
}
