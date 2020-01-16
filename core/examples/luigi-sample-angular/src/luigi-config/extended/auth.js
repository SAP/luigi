import oAuth2ImplicitGrant from '@luigi-project/plugin-auth-oauth2';
import openIdConnect from '@luigi-project/plugin-auth-oidc';
class Auth {
  /**
   * auth identity provider settings
   *
   * use: enum of already implemented providers:
   *  - openIdConnect (eg. DEX)
   *  - oAuth2ImplicitGrant
   * custom:
   *  - idpProvider (if you provide a class to Luigi.config.auth.[providerName].idpProvider)
   *
   */
  use = 'mockAuth';

  storage = 'localStorage'; // localStorage, sessionStorage, none

  disableAutoLogin = false;

  mockAuth = {
    customIdpProvider: oAuth2ImplicitGrant,
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
          // picture: '/assets/github-logo.png'
        });
      });
    }
  };

  openIdConnect = {
    idpProvider: openIdConnect,
    // To run OIDC Mock Server, go to luigi/scripts/oidc-mockserver
    // and run docker-compose up. Default user: Luigi , password: pwd
    authority: 'http://localhost:4011',
    logoutUrl: 'http://localhost:4011/connect/endsession',
    client_id: 'implicit-mock-client',
    scope: 'openid profile email',
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
    //   console.info('custom nonce function called');
    //   return 1;
    // },
    // logoutFn: (settings, authData, logoutCallback) => {
    //   console.info('logoutFn called');
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
      console.info('onLogout', settings);
    },
    onAuthSuccessful: (settings, authData) => {
      console.info('onAuthSuccessful', settings, authData);
    },
    onAuthExpired: settings => {
      console.info('onAuthExpired', settings);
      // return false; // prevent redirect to logoutUrl
    },
    onAuthError: (settings, err) => {
      console.info('authErrorHandler', err, settings);
      // return false; // prevent redirect to logoutUrl, but go to /
    },
    onAuthExpireSoon: settings => {
      console.info('onAuthExpireSoon ', settings);
      Luigi.showAlert({
        text: 'Token expires soon',
        type: 'warning'
      });
    },
    onAuthConfigError: err => {
      console.error(`IDP Provider ${err.idpProviderName} does not exist`);
      Luigi.showAlert({
        text: `IDP Provider ${err.idpProviderName} does not exist`,
        type: 'error'
      });
    }
  };
}

export const auth = new Auth();
