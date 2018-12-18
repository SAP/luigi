import * as GenericHelpers from '../../utilities/helpers/generic-helpers.js';

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
      post_logout_redirect_uri: window.location.origin + '/logout.html'
    };
    const mergedSettings = GenericHelpers.deepMerge(defaultSettings, settings);

    this.settings = mergedSettings;
  }

  login() {
    return new Promise((resolve, reject) => {
      const settings = this.settings;
      const generatedNonce =
        (settings.nonceFn && settings.nonceFn()) || this._generateNonce();

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

      settings.oAuthData.redirect_uri = GenericHelpers.prependOrigin(
        settings.oAuthData.redirect_uri
      );
      settings.oAuthData.state = window.location.href;

      for (const name in settings.oAuthData) {
        const node = createInputElement(name, settings.oAuthData[name]);
        formElem.appendChild(node.cloneNode());
      }

      const node = createInputElement('nonce', generatedNonce);
      formElem.appendChild(node.cloneNode());

      document.getElementsByTagName('body')[0].appendChild(formElem);
      setTimeout(() => {
        document.querySelector('form#signIn').submit();
      });

      // TODO: We're not resolving the promise at any time,
      // since oauth2 is redirecting off the page
      // maybe it is possible to catch errors
      document.querySelector('form#signIn').addEventListener('load', e => {
        console.log('load, e', e, this);
      });
    });
  }

  logout(authData, logoutCallback) {
    const settings = this.settings;
    const logouturl = `${settings.logoutUrl}?id_token_hint=${
      authData.idToken
    }&client_id=${
      settings.oAuthData.client_id
    }&post_logout_redirect_uri=${GenericHelpers.prependOrigin(
      settings.post_logout_redirect_uri
    )}`;
    logoutCallback && logoutCallback();

    setTimeout(function() {
      window.location.href = logouturl;
    });
  }

  setTokenExpirationAction() {
    const expirationCheckInterval = 5000;
    const logoutBeforeExpirationTime = 60000;

    setInterval(() => {
      let authData;
      try {
        authData = JSON.parse(localStorage.getItem('luigi.auth'));
      } catch (e) {
        console.warn(
          'Error parsing authorization data. Auto-logout might not work!'
        );
      }
      const tokenExpirationDate = authData.accessTokenExpirationDate;
      const currentDate = new Date();

      if (tokenExpirationDate - currentDate - logoutBeforeExpirationTime < 0) {
        localStorage.removeItem('luigi.auth');
        window.location = `${
          this.settings.logoutUrl
        }?reason=tokenExpired&post_logout_redirect_uri=${GenericHelpers.prependOrigin(
          this.settings.post_logout_redirect_uri
        )}`;
      }
    }, expirationCheckInterval);
  }

  _generateNonce() {
    const nonceKey = 'luigiNonceCnt';
    let cnt = parseInt(
      encodeURIComponent(localStorage.getItem('luigiNonceCnt'))
    );
    if (!cnt || isNaN(cnt) || cnt >= 999999) {
      cnt = 0;
    }
    localStorage.setItem('luigiNonceCnt', ++cnt);
    const rndstr = Math.floor(Math.random() * 1e9) + '';
    let nonce = rndstr;
    for (var i = 0; i < 9 - rndstr.length; i++) {
      nonce = 'X' + nonce;
    }
    const cntstr = cnt + '';
    for (var i = 0; i < 6 - cntstr.length; i++) {
      nonce = nonce + 'X';
    }
    return nonce + cntstr;
  }
}
