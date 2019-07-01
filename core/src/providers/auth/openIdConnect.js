import { AsyncHelpers, GenericHelpers } from '../../utilities/helpers';
import { thirdPartyCookiesStatus } from '../../utilities/third-party-cookies-check';
import { LuigiAuth } from '../../core-api';

export class openIdConnect {
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
        window.location.origin + '/luigi-core/auth/oidc/silent-callback.html'
    };
    const mergedSettings = GenericHelpers.deepMerge(defaultSettings, settings);

    // Prepend current url to redirect_uri, if it is a relative path
    ['redirect_uri', 'post_logout_redirect_uri'].forEach(key => {
      mergedSettings[key] = GenericHelpers.prependOrigin(mergedSettings[key]);
    });

    this.settings = mergedSettings;

    return AsyncHelpers.waitForKeyExistency(window, 'Oidc', 60000).then(res => {
      this.client = new Oidc.UserManager(this.settings);

      this.client.events.addUserLoaded(authenticatedUser => {
        const data = {
          accessToken: authenticatedUser.access_token,
          accessTokenExpirationDate: authenticatedUser.expires_at * 1000,
          scope: authenticatedUser.scope,
          idToken: authenticatedUser.id_token,
          profile: authenticatedUser.profile
        };
        localStorage.setItem('luigi.auth', JSON.stringify(data));

        window.postMessage(
          { msg: 'luigi.auth.tokenIssued', authData: data },
          '*'
        );
      });

      return Promise.all([
        this._processLoginResponse(),
        this._processLogoutResponse()
      ]).then(() => {
        return this;
      });
    });
  }

  login() {
    return AsyncHelpers.waitForKeyExistency(this, 'client').then(res => {
      return this.client.signinRedirect(this.settings).catch(err => {
        console.error(err);
        return err;
      });
    });
  }

  logout(authData, authOnLogoutFn) {
    authOnLogoutFn();
    window.location.href = this.settings.logoutUrl;
    // TODO: dex logout is not yet supported
    // const signoutData = {
    //   id_token_hint: authData && authData.idToken,
    //   state: window.location.href
    // };
    // return this.client.createSignoutRequest(signoutData).then((req) => {
    //    callback();
    //   window.location = req.url;
    // }).catch(function (err) {
    //   console.log(err);
    // });
  }

  setTokenExpirationAction() {
    if (!this.settings.automaticSilentRenew) {
      this.client.events.addAccessTokenExpired(() => {
        LuigiAuth.handleAuthEvent(
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
      LuigiAuth.handleAuthEvent('onAuthError', this.settings, e, redirectUrl);
    });
  }

  setTokenExpireSoonAction() {
    this.client.events.addAccessTokenExpiring(() => {
      LuigiAuth.handleAuthEvent('onAuthExpireSoon', this.settings);
    });
  }

  _processLogoutResponse() {
    return new Promise((resolve, reject) => {
      // TODO: dex logout does not yet support proper logout
      if (window.location.href.indexOf('?logout') >= 0) {
        this.client
          .processSignoutResponse()
          .then(response => {
            localStorage.removeItem('luigi.auth');
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

          // since localStorage has no callback we need to wait couple of ms before proceeding
          // else persistence might fail.
          setTimeout(() => {
            if (authenticatedUser.state) {
              window.location.href = decodeURIComponent(
                authenticatedUser.state
              );
            } else {
              window.location.href = window.location.origin;
            }
          }, 50);
        })
        .catch(err => {
          console.error(err);
          localStorage.removeItem('luigi.auth');
          LuigiAuth.handleAuthEvent(
            'onAuthExpired',
            this.settings,
            err,
            this.settings.logoutUrl + '?error=loginError'
          );
        });
    });
  }
}
