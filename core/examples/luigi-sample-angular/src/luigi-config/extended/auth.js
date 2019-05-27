class Auth {
  /**
   * auth identity provider settings
   *
   * use: enum of already implemented providers:
   *  - openIdConnect (eg. DEX)
   *  - oAuth2ImplicitGrant
   * custom:
   *  - customIdpProvider (if you provide a class to Luigi.config.auth.customIdpProvider)
   *
   */
  use = 'mockAuth';

  disableAutoLogin = false;

  mockAuth = {
    authorizeUrl: `${window.location.origin}/assets/auth-mock/login-mock.html`,
    logoutUrl: `${window.location.origin}/assets/auth-mock/logout-mock.html`,
    post_logout_redirect_uri: '/logout.html',
    authorizeMethod: 'GET',
    oAuthData: {
      client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp'
    },
    accessTokenExpiringNotificationTime: 60, //in seconds
    expirationCheckInterval: 5,
    userInfoFn: () => {
      return new Promise(resolve => {
        resolve({
          name: 'Luigi User',
          email: 'luigi.user@example.com'
        });
      });
    }
  };

  openIdConnect = {
    authority: 'https://example-authority.com',
    client_id: 'client',
    scope: 'openid profile email',
    logoutUrl: 'https://example-url.com/logout'
    // optional parameters
    // redirect_uri: '',
    // post_logout_redirect_uri: '/logout.html',
    // automaticSilentRenew: true,
    // loadUserInfo: false // returned metadata must contain userinfo_endpoint
  };

  oAuth2ImplicitGrant = {
    authorizeUrl: 'https://example-url.com/authorize',
    logoutUrl: 'https://example-url.com/logout',
    post_logout_redirect_uri: '/logout.html',
    authorizeMethod: 'GET',
    oAuthData: {
      client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp',
      redirect_uri: '/luigi-core/auth/oauth2/callback.html',
      scope: 'openid profile email groups'

      // optional: redirect_uri and response_type are provided by default
      // scope: '',
      // redirect_uri: '/luigi-core/auth/oauth2/callback.html'
      // response_type: 'id_token token',

      // all specified values inside oAuthData will be added to the oauth call, i.e display="popup",
    }

    // optional , will be provided by default
    // nonceFn: () => {
    //   console.log('custom nonce function called');
    //   return 1;
    // },
    // logoutFn: (settings, authData, logoutCallback) => {
    //   console.log('logoutFn called');
    //   // auth example
    //   var logoutreq = `${settings.logoutUrl}?id_token_hint=${
    //     authData.idToken
    //     }&client_id=${settings.oauthData.client_id}&post_logout_redirect_uri=${
    //     window.location.origin
    //     }/auth/logout.html`;
    //   var request = new XMLHttpRequest();
    //   request.open('GET', logoutreq);
    //   request.addEventListener('load', function (event) {
    //     if (request.status >= 200 && request.status < 300) {
    //       console.log(request.responseText);
    //       logoutCallback();
    //     } else {
    //       console.warn(request.statusText, request.responseText);
    //       logoutCallback();
    //     }
    //   });
    //   request.send();
    // }
    // TODO: logout parameters (GET/POST?)
  };

  events = {
    onLogout: settings => {
      console.log('onLogout', settings);
    },
    onAuthSuccessful: (settings, authData) => {
      console.log('onAuthSuccessful', settings, authData);
    },
    onAuthExpired: settings => {
      console.log('onAuthExpired', settings);
      // return false; // prevent redirect to logoutUrl
    },
    onAuthError: (settings, err) => {
      console.log('authErrorHandler 1', err, settings);
      // return false; // prevent redirect to logoutUrl, but go to /
    },
    onAuthExpireSoon: settings => {
      console.log('onAuthExpireSoon ', settings);
      Luigi.showAlert({
        text: 'Token expires soon',
        type: 'warning'
      });
    }
  };
}

export const auth = new Auth();
