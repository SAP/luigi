import { UserManager, WebStorageStateStore, InMemoryWebStorage } from 'oidc-client';
import { Helpers } from '../helpers';
import { thirdPartyCookiesStatus } from '../third-party-cookies-check';

export default class openIdConnect {
  constructor(settings = {}) {
    const defaultSettings = {
      redirect_uri: window.location.origin,
      post_logout_redirect_uri: window.location.origin + '/logout.html',
      response_type: 'id_token token',
      filterProtocolClaims: true,
      loadUserInfo: false,
      automaticSilentRenew: false,
      accessTokenExpiringNotificationTime: 60,
      thirdPartyCookiesScriptLocation: '',
      logoutUrl: window.location.origin + '/logout.html',
      silent_redirect_uri: window.location.origin + '/assets/auth-oidc-pkce/silent-callback.html'
    };

    const mergedSettings = Helpers.deepMerge(defaultSettings, settings);

    // Prepend current url to redirect_uri, if it is a relative path
    ['redirect_uri', 'post_logout_redirect_uri'].forEach(key => {
      mergedSettings[key] = Helpers.prependOrigin(mergedSettings[key]);
    });

    // set storage type
    const storageType = Luigi.getConfigValue('auth.storage');
    const isValidStore = ['none', 'sessionStorage', 'localStorage'].includes(storageType);
    if (isValidStore && storageType == 'none') {
      mergedSettings.userStore = new WebStorageStateStore({
        store: new InMemoryWebStorage()
      });
      mergedSettings.stateStore = new WebStorageStateStore({
        store: window.sessionStorage
      });
    } else if (isValidStore) {
      mergedSettings.stateStore = new WebStorageStateStore({
        store: window[storageType]
      });
    } // else fall back to OIDC default

    this.settings = mergedSettings;

    this.client = new UserManager(this.settings);

    this.client.events.addUserLoaded(async payload => {
      let profile = payload.profile;
      if (payload.profile && Luigi.getConfigValue('auth.openIdConnect.profileStorageInterceptorFn')) {
        profile = await Luigi.executeConfigFnAsync(
          'auth.openIdConnect.profileStorageInterceptorFn',
          true,
          payload.profile
        );
      }

      const data = {
        accessToken: payload.access_token,
        accessTokenExpirationDate: payload.expires_at * 1000,
        scope: payload.scope,
        idToken: payload.id_token,
        profile
      };

      if (!data.accessToken && data.idToken) {
        try {
          data.idTokenExpirationDate = JSON.parse(atob(data.idToken.split('.')[1])).exp * 1000;
          data.accessTokenExpirationDate = data.idTokenExpirationDate;
        } catch (e) {
          console.error(e);
        }
      }

      Luigi.auth().store.setAuthData(data);

      window.postMessage({ msg: 'luigi.auth.tokenIssued', authData: data }, window.location.origin);
    });

    return Promise.all([this._processLoginResponse(), this._processLogoutResponse()]).then(() => {
      return this;
    });
  }

  login() {
    return this.client.signinRedirect({ state: window.location.href }).catch(err => {
      console.error('[OIDC Legacy] login() Error', err);
      return err;
    });
  }

  logout(authData, authOnLogoutFn) {
    const signoutData = {
      id_token_hint: authData && authData.idToken,
      state: encodeURI(window.location.href)
    };

    return this.client
      .createSignoutRequest(signoutData)
      .then(req => {
        authOnLogoutFn();
        window.location = req.url;
      })
      .catch(function(err) {
        console.error('[OIDC Legacy] logout() Error', err);
        authOnLogoutFn();
      });
  }

  setTokenExpirationAction() {
    if (!this.settings.automaticSilentRenew) {
      this.client.events.addAccessTokenExpired(() => {
        Luigi.auth().handleAuthEvent(
          'onAuthExpired',
          this.settings,
          undefined,
          this.settings.logoutUrl + '?error=tokenExpired'
        );
      });
    }

    if (this.settings.thirdPartyCookiesScriptLocation) {
      const iframe = document.createElement('iframe');
      iframe.src = this.settings.thirdPartyCookiesScriptLocation;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    this.client.events.addSilentRenewError(e => {
      let redirectUrl;
      switch (e.message) {
        case 'interaction_required':
        case 'login_required':
        case 'account_selection_required':
        case 'consent_required': // possible cause: disabled third party cookies in the browser
          redirectUrl =
            this.settings.logoutUrl +
            '?error=tokenExpired&thirdPartyCookies=' +
            thirdPartyCookiesStatus() +
            '&errorDescription=' +
            e.message;
          break;
        default:
          console.error('[OIDC Legacy] addSilentRenewError Error', e);
          redirectUrl = this.settings.logoutUrl + '?error=tokenExpired&errorDescription=' + e.message;
      }
      Luigi.auth().handleAuthEvent('onAuthError', this.settings, e, redirectUrl);
    });
  }

  setTokenExpireSoonAction() {
    this.client.events.addAccessTokenExpiring(() => {
      Luigi.auth().handleAuthEvent('onAuthExpireSoon', this.settings);
    });
  }

  _processLogoutResponse() {
    return new Promise((resolve, reject) => {
      // TODO: dex logout does not yet support proper logout
      if (window.location.href.indexOf('?logout') >= 0) {
        this.client
          .processSignoutResponse()
          .then(response => {
            Luigi.auth().store.removeAuthData();
            resolve(response);
          })
          .catch(function(err) {
            reject(response);
            console.error('[OIDC Legacy] Logout Error', err);
          });
      }
      resolve(true);
    });
  }

  _processLoginResponse() {
    return new Promise((resolve, reject) => {
      let responseType = this.settings.response_type;
      let responseMode = this.settings.response_mode;
      let toCheck, fromWhere;
      if (responseType.indexOf('code') > -1) {
        toCheck = 'code';
        if (!responseMode) {
          fromWhere = 'search';
        } else {
          fromWhere = responseMode === 'fragment' ? 'hash' : 'search';
        }
      } else {
        // check id_token, else defaulting to access token
        toCheck = responseType.indexOf('id_token') > -1 ? 'id_token' : 'access_token';
        if (!responseMode) {
          fromWhere = 'hash';
        } else {
          fromWhere = responseMode === 'fragment' ? 'hash' : 'search';
        }
      }

      if (window.location[fromWhere].indexOf(toCheck) === -1) {
        return resolve(true);
      }

      this.tryToSignIn()
        .then((authenticatedUser = {}) => {
          if (authenticatedUser.error) {
            return console.error(
              '[OIDC Legacy] Error',
              authenticatedUser.error,
              authenticatedUser.error_description,
              authenticatedUser
            );
          }

          // since auth storages have no callback we need to wait couple of ms before proceeding
          // else persistence might fail.
          setTimeout(() => {
            if (authenticatedUser.state) {
              history.pushState('', document.title, decodeURIComponent(authenticatedUser.state));
            } else {
              let url;
              if (fromWhere === 'search') {
                url = window.location.pathname + window.location.hash;
              } else {
                url = window.location.pathname + window.location.search;
              }
              history.pushState('', document.title, url);
            }
            resolve(true);
          }, 50);
        })
        .catch(err => {
          console.error('[OIDC Legacy] tryToSignIn Error', err);
          Luigi.auth().store.removeAuthData();
          Luigi.auth().handleAuthEvent(
            'onAuthExpired',
            this.settings,
            err,
            this.settings.logoutUrl + '?error=loginError'
          );
        });
    });
  }

  async tryToSignIn() {
    try {
      // If the user was just redirected here from the sign in page, sign them in.
      console.debug('[OIDC Legacy] User was redirected via the sign-in page. Now signed in.');
      return await this.client.signinRedirectCallback();
    } catch (error) {
      console.debug("[OIDC Legacy] Error. Sign-in redirect callback doesn't work. Let's try a silent sign-in.", error);
      // Barring that, if the user chose to have the Identity Server remember their
      // credentials and permission decisions, we may be able to silently sign them
      // back in via a background iframe.
      console.debug('[OIDC Legacy] Silent sign-in completed.');
      return await this.client.signinSilent();
    }
  }
}
