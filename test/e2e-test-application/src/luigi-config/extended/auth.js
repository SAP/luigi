import oAuth2ImplicitGrant from '@luigi-project/plugin-auth-oauth2';
import openIdConnect from '@luigi-project/plugin-auth-oidc';
class Auth {
  use = 'mockAuth';

  storage = 'localStorage'; // localStorage, sessionStorage, none

  disableAutoLogin = false;

  mockAuth = {
    idpProvider: oAuth2ImplicitGrant,
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
          initials: 'LU',
          email: 'luigi.user@example.com',
          avatar: '/assets/favicon-sap.ico',
          description: 'Luigi Expert'
          //icon: true
        });
      });
    }
  };

  openIdConnect = {
    idpProvider: openIdConnect,
    // To run OIDC Mock Server, go to scripts/oidc-mockserver
    // and run docker-compose up. Default user: Luigi , password: pwd
    authority: 'http://localhost:4011',
    logoutUrl: 'http://localhost:4011/connect/endsession',
    scope: 'openid profile email',
    // optional parameters
    // redirect_uri: '',
    // post_logout_redirect_uri: '/logout.html',
    // options settings
    // automaticSilentRenew: true,

    // for PKCE flow
    client_id: 'authorisation-code-pkce-mock-client', // oidc-mockserver client id
    response_type: 'code', // for PKCE
    response_mode: 'fragment', // change between `query` and `fragment`

    // for implicit grant flow
    // client_id: 'implicit-mock-client', // oidc-mockserver client id

    profileStorageInterceptorFn: profile => {
      profile.email = undefined;
      return profile;
    }
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

  // google = {
  //   idpProvider: oAuth2ImplicitGrant,
  //   authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  //   oAuthData: {
  //     response_type: 'id_token token',
  //     client_id: 'APP_ID.apps.googleusercontent.com',
  //     scope: 'openid https://www.googleapis.com/auth/userinfo.email profile',
  //   }
  //   logoutFn: async (settings, authData, logoutCallback) => {
  //     await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${authData.accessToken}`);
  //     logoutCallback();
  //     location.href = '/logout.html';
  //   }
  // };

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
