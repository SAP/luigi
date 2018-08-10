import { deepMerge } from '../../utilities/helpers.js';

export class oAuth2ImplicitGrant {
  constructor(settings = {}) {
    const defaultSettings = {
      oAuthData: {
        redirect_uri:
          window.location.origin + '/luigi-core/auth/oauth2/callback.html',
        response_type: 'id_token token',
        scope: ''
      }
    };
    const mergedSettings = deepMerge(defaultSettings, settings);

    // Prepend current url to redirect_uri, if it is a relative path
    if (!mergedSettings.oAuthData.redirect_uri.startsWith('http')) {
      const hasLeadingSlash = mergedSettings.oAuthData.redirect_uri.startsWith(
        '/'
      );
      mergedSettings.oAuthData.redirect_uri =
        window.location.origin +
        (hasLeadingSlash ? '' : '/') +
        mergedSettings.oAuthData.redirect_uri;
    }
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
      formElem.method = 'POST';
      // formElem.target = 'signInTarget';
      formElem.target = '_self';
      formElem.action = settings.authorizeUrl;

      settings.oAuthData.state = window.location.href;

      for (const name in settings.oAuthData) {
        const node = createInputElement(name, settings.oAuthData[name]);
        formElem.appendChild(node.cloneNode());
      }

      const node = createInputElement('nonce', generatedNonce);
      formElem.appendChild(node.cloneNode());

      document.getElementsByTagName('body')[0].appendChild(formElem);
      document.querySelector('form#signIn').submit();
      // TODO: We're not resolving the promise at any time,
      // since oauth2 is redirecting off the page
      // maybe it is possible to catch errors
      document.querySelector('form#signIn').addEventListener('load', e => {
        console.log('load, e', e, this);
      });
    });
  }

  logout(authData) {
    const settings = this.settings;
    const logouturl = `${settings.logoutUrl}?id_token_hint=${
      authData.idToken
    }&client_id=${settings.oAuthData.client_id}&post_logout_redirect_uri=${
      window.location.origin
    }/luigi-core/auth/oauth2/logout.html`;
    window.location.href = logouturl;
  }

  renewToken() {
    console.error('​renewToken is not implemented yet');
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
