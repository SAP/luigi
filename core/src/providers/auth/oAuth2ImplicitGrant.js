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

    document.getElementById('authorization').appendChild(formElem);
    document.querySelector('form#signIn').submit();
  }

  logout(authData, logoutCallback) {
    // yaas logout
    const settings = this.settings;
    const logoutreq = `${settings.logoutUrl}?id_token_hint=${
      authData.idToken
    }&client_id=${settings.oAuthData.client_id}&post_logout_redirect_uri=${
      window.location.origin
    }`;

    const request = new XMLHttpRequest();
    request.open('GET', logoutreq);
    request.addEventListener('load', event => {
      if (request.status >= 200 && request.status < 300) {
        console.info(request.responseText);
        return logoutCallback();
      }

      console.warn(request.statusText, request.responseText);
      logoutCallback();
    });
    request.send();
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
