import { deepMerge, prependOrigin } from '../../utilities/helpers.js';
import { waitForKeyExistency } from '../../utilities/async-helpers.js';

export class openIdConnect {
  constructor(settings = {}) {
    const defaultSettings = {
      redirect_uri: window.location.origin,
      post_logout_redirect_uri: window.location.origin + '/logout.html',
      response_type: 'id_token token',
      filterProtocolClaims: true,
      loadUserInfo: false,
      automaticSilentRenew: false
      // silentRequestTimeout:10000,
      // silent_redirect_uri: '/luigi-core/auth/oidc/silent-callback.html', // not yet implemented
    };
    const mergedSettings = deepMerge(defaultSettings, settings);

    // Prepend current url to redirect_uri, if it is a relative path
    ['redirect_uri', 'post_logout_redirect_uri'].forEach(key => {
      mergedSettings[key] = prependOrigin(mergedSettings[key]);
    });

    this.settings = mergedSettings;

    return waitForKeyExistency(window, 'Oidc').then(res => {
      this.client = new Oidc.OidcClient(this.settings);
      // Oidc.Log.logger = console;
      // Oidc.Log.level = Oidc.Log.INFO;
      return Promise.all([
        this._processLoginResponse(),
        this._processLogoutResponse()
      ]).then(() => {
        return this;
      });
    });
  }

  login() {
    return waitForKeyExistency(this, 'client').then(res => {
      return this.client
        .createSigninRequest(this.settings)
        .then(req => {
          window.location = req.url;
          return;
        })
        .catch(err => {
          console.error(err);
          return err;
        });
    });
  }

  logout(authData, callback) {
    callback();
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
          .catch(function (err) {
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

      window.location.hash = decodeURIComponent(window.location.hash);
      this.client
        .processSigninResponse()
        .then(hashParams => {
          if (hashParams.error) {
            return console.error(
              'Error',
              hashParams.error,
              hashParams.error_description,
              hashParams
            );
          }
          const data = {
            accessToken: hashParams.access_token,
            accessTokenExpirationDate: hashParams.expires_at * 1000,
            scope: hashParams.scope,
            idToken: hashParams.id_token,
            profile: hashParams.profile
          };
          localStorage.setItem('luigi.auth', JSON.stringify(data));

          // since localStorage has no callback we need to wait couple of ms before proceeding
          // else persistence might fail.
          setTimeout(() => {
            if (hashParams.state) {
              window.location.href = decodeURIComponent(hashParams.state);
            } else {
              window.location.href = window.location.origin;
            }
            // resolve(true); // not resolving in order to not interrupt window.location.href
          }, 50);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  }
}
