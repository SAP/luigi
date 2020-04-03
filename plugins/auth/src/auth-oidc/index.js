import Oidc from 'oidc-client';
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
      silent_redirect_uri:
        window.location.origin + '/assets/auth-oidc/silent-callback.html'
    };
    const mergedSettings = Helpers.deepMerge(defaultSettings, settings);

    // Prepend current url to redirect_uri, if it is a relative path
    ['redirect_uri', 'post_logout_redirect_uri'].forEach(key => {
      mergedSettings[key] = Helpers.prependOrigin(mergedSettings[key]);
    });

    this.settings = mergedSettings;

    this.client = new Oidc.UserManager(this.settings);

    this.client.events.addUserLoaded(async payload => {
      let profile = payload.profile;
      if (
        payload.profile &&
        Luigi.getConfigValue('auth.openIdConnect.profileStorageInterceptorFn')
      ) {
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
      Luigi.auth().store.setAuthData(data);

      window.postMessage(
        { msg: 'luigi.auth.tokenIssued', authData: data },
        window.location.origin
      );
    });

    return Promise.all([
      this._processLoginResponse(),
      this._processLogoutResponse()
    ]).then(() => {
      return this;
    });
  }

  login() {
    return this.client.signinRedirect(this.settings).catch(err => {
      console.error(err);
      return err;
    });
  }

  logout(authData, authOnLogoutFn) {
    const signoutData = {
      id_token_hint: authData && authData.idToken,
      state: window.location.href
    };
    return this.client
      .createSignoutRequest(signoutData)
      .then(req => {
        authOnLogoutFn();
        window.location = req.url;
      })
      .catch(function(err) {
        console.error(err);
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
          console.error(e);
          redirectUrl =
            this.settings.logoutUrl +
            '?error=tokenExpired&errorDescription=' +
            e.message;
      }
      Luigi.auth().handleAuthEvent(
        'onAuthError',
        this.settings,
        e,
        redirectUrl
      );
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
            log('signout response', response);
            resolve(response);
          })
          .catch(function(err) {
            reject(response);
            log(err);
          });
      }
      resolve(true);
    });
  }

  _processLoginResponse() {
    return new Promise((resolve, reject) => {
      if (window.location.hash.indexOf('access_token') === -1) {
        return resolve(true);
      }

      this.client
        .signinRedirectCallback()
        .then(authenticatedUser => {
          if (authenticatedUser.error) {
            return console.error(
              'Error',
              authenticatedUser.error,
              authenticatedUser.error_description,
              authenticatedUser
            );
          }

          // since auth storages have no callback we need to wait couple of ms before proceeding
          // else persistence might fail.
          setTimeout(() => {
            if (authenticatedUser.state) {
              history.pushState(
                '',
                document.title,
                decodeURIComponent(authenticatedUser.state)
              );
            } else {
              history.pushState(
                '',
                document.title,
                window.location.pathname + window.location.search
              );
            }
            resolve(true);
          }, 50);
        })
        .catch(err => {
          console.error(err);
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
}
