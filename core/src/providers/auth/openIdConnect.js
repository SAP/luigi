import { deepMerge, prependOrigin } from '../../utilities/helpers.js';
import { waitForKeyExistency } from '../../utilities/async-helpers.js';

export class openIdConnect {
  constructor(settings = {}) {
    const defaultSettings = {
      redirect_uri: window.location.origin,
      post_logout_redirect_uri:
        window.location.origin + '/luigi-core/auth/oauth2/logout.html',
      response_type: 'id_token token',
      filterProtocolClaims: true,
      loadUserInfo: true,
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
    waitForKeyExistency(window, 'Oidc').then(res => {
      this.client = new Oidc.OidcClient(settings);
      // Oidc.Log.logger = console;
      // Oidc.Log.level = Oidc.Log.INFO;
      this._processLoginResponse();
      this._processLogoutResponse();
    });
  }

  login() {
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
  }

  logout(authData, callback) {
    callback();
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
    // TODO: dex logout is not yet supported
    // if (window.location.href.indexOf("?") >= 0) {
    //   this.client.processSignoutResponse().then((response) => {
    //     localStorage.removeItem('luigi.auth');
    //     log("signout response", response);
    //   }).catch(function (err) {
    //     log(err);
    //   });
    // }
  }

  _processLoginResponse() {
    if (window.location.hash.indexOf('access_token') === -1) {
      return;
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
        window.location.href = hashParams.state
          ? decodeURIComponent(hashParams.state)
          : this.settings.post_logout_redirect_uri;
      })
      .catch(err => {
        console.error(err);
      });
  }
}
