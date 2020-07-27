<!-- meta
{
  "node": {
    "label": "Authorization",
    "category": {
      "label": "Luigi Core"
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 4
    }
  }
}
meta -->

# Authorization configuration

To configure authorization in Luigi:

1. Configure the [general authorization options](#general-authorization-options).

2. Choose an authorization provider:
    * [OpenID Connect](#openid-connect-configuration)
    * [OAuth2 Implicit Grant](#oauth2-implicit-grant-configuration)
    * [Custom authorization provider](#custom-authorization-provider)

## General authorization options

* [General authorization configuration in Luigi](#how-do-i-configure-authorization-in-luigi)
* [Show content to logged out users / allow anonymous access](#how-do-i-show-some-navigation-nodes-only-to-non-authenticated-users) 

### How do I configure authorization in Luigi?

You can configure Luigi authorization using the `auth:` section of your Luigi configuration file.

This is an example of a simplified authorization structure:

```javascript
import oidcProvider from '@luigi-project/plugin-auth-oidc';
auth: {
  use: 'openIdConnect',
  openIdConnect: {
    idpProvider: oidcProvider,
    ...
  },
  disableAutoLogin: true
}
```

- **use** defines the active authorization provider.
- **disableAutoLogin** allows you to disable the automatic login flow that is provided by default.

Optionally, you can also add:
- **storage** parameter which allows you to set the storage type. It can be set to `localStorage`, `sessionStorage` or `none`. For example:
```javascript
auth: {
   storage: 'sessionStorage'
```


### How do I show some navigation nodes only to non-authenticated users?

To show certain nodes only to users who are not logged-in, use the [anonymousAccess](navigation-parameters-reference.md#anonymousaccess) parameter.

Make sure **disableAutoLogin** is set to `true`. Add the **anonymousAccess** parameter to the nodes you want to hide and their children:

```javascript
anonymousAccess: `exclusive` // show nodes only when logged out
// OR
anonymousAccess: true // always show nodes
```

## OpenID Connect configuration

This code snippet demonstrates how to configure authorization using OpenID Connect in Luigi. Note that you must install the [OpenID Plugin](https://github.com/SAP/luigi/tree/master/plugins/auth/public/auth-oidc) first.

```javascript
import oidcProvider from '@luigi-project/plugin-auth-oidc';
auth: {
  use: 'openIdConnect',
  openIdConnect: {
    idpProvider: oidcProvider,
    authority: 'https://example.com',
    client_id: 'client',
    scope: 'audience:server:client_id:client openID profile email groups',
    redirect_uri: '',
    post_logout_redirect_uri: '/logout.html',
    automaticSilentRenew: true,
    userInfoFn:(authSettings, authData)=>{},
    accessTokenExpiringNotificationTime: 60
    profileStorageInterceptorFn:(jwtProfile)=>{}
  },
  disableAutoLogin: false
}
```

- **authority** contains the OpenID Connect server address used to authenticate.
- **client_id** contains your app client ID.
- **scope** defines the permissions to request at login.
- **redirect_uri** sets the URL to return to after login. The default application root is `/`.
- **post_logout_redirect_uri** sets the URL to return after logout. The default URL is `/logout.html`.
- **automaticSilentRenew** enables the automatic silent renewal of the token if it is supported by the server. The default value is `false`. For this mechanism to work, the browser must have third-party cookies support enabled.
- **accessTokenExpiringNotificationTime** is the number of seconds before an access token expires and triggers silent token refresh. The default value is `60` seconds.
- **thirdPartyCookiesScriptLocation** is the URL to the page containing third-party cookies support check. For details, see [Third-party cookies and silent token refresh section](#Third-party-cookies-and-silent-token-refresh).
- **userInfoFn** provides a function to get user information. It returns a promise of a **userinfo** object which can contain **name**, **email** and **picture** (value is a URL to the image). **Name** or **email** are displayed in the profile drop-down menu and the user’s profile picture is displayed in the top navigation.
- **profileStorageInterceptorFn** provides a function to mutate the profile values of the [JSON Web Token (JWT)](https://jwt.io) before it gets stored in Luigi. It allows the removal of values like **email** to comply with data privacy restrictions. Since it is async, you could use it to enrich the profile data, but it should not get mixed up with **userInfoFn** which is specifically designed to define user information.

### Third-party cookies and silent token refresh

The OpenID Connect configuration allows you to specify the **automaticSilentRenew** option. When set to `true`, Luigi attempts to automatically renew the token in the background before it expires. Be aware that this mechanism requires the browser to support [third-party cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Third-party_cookies).

To detect whether the user's browser supports the mechanism, use the script in the [`third-party-cookies`](https://github.com/SAP/luigi/tree/master/core/third-party-cookies) catalog. Deploy this file on a domain different from your main application's and set **thirdPartyCookiesScriptLocation** to the `init.html` file. During initialization, Luigi detects the cookies support and produces a warning in the console if cookies are disabled in the user's browser.

When Luigi fails to renew the token and then logs the user out, it adds the `?reason=tokenExpired&thirdPartyCookies=[VALUE]` query parameters to the logout page redirect URL. Luigi replaces **[VALUE]**  with one of these options:
- `disabled` means that third party cookies are disabled.
- `enabled` means that the browser supports third party cookies.
- `not_checked` means that the script was not provided in **thirdPartyCookiesScriptLocation** or it could not be loaded.

Use these parameters to set a logout page.

## OAuth2 Implicit Grant configuration

This code snippet demonstrates how to configure authorization using OAuth2 Implicit Grant in Luigi.

```javascript
import oAuth2ImplicitGrant from '@luigi-project/plugin-auth-oauth2';

auth: {
  use: 'oAuth2ImplicitGrant',
  oAuth2ImplicitGrant: {
    idpProvider: oAuth2ImplicitGrant,
    authorizeUrl: 'https://example.com/authorize',
    logoutUrl: 'https://example.com/logout',
    oAuthData: {
      client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp'
      scope: '',
      // optional parameters
      redirect_uri: '/assets/auth-oauth2/callback.html'
      response_type: 'id_token token',
      // all specified values inside oAuthData will be added to the oauth call, i.e display="popup",
    }
    // optional functions
    nonceFn: () => {},
    logoutFn: (settings, authData, logoutCallback) => { ...; logoutCallback('logout.html'); },
    userInfoFn:(settings, authData)=>{},
    accessTokenExpiringNotificationTime: 60,
    expirationCheckInterval: 5
  },
  disableAutoLogin: false
```

- **authorizeUrl** contains the URL or address of the OAuth2 authorization server.
- **logoutUrl** contains the endpoint to terminate the authorization session.
- **oAuthData** comprises the object with data sent to the **authorizeUrl**.
- **client_id** holds your application client ID.
- **scope** defines permissions that are requested at login.
- **redirect_uri** contains the URL to return to after login. The default application root is `/`.
- **response_type** defaults to the **id_token**. Any other parameter that is added to oAuthData is also added to the authorization payload.
- **nonceFn** provides a function that returns a string in order to override the default **nonce**.
- **logoutFn** provides the function to override the **logoutUrl** functionality for a custom logout. It needs to execute the **logoutCallback(redirectUri)** function after logout. Its parameter **redirectUri** is an URL or path to redirect to after executing **logoutCallback**. If no **redirectUri** is defined, Luigi stays in the current state.
- **userInfoFn** provides a function to get user information. It returns a promise of a **userinfo** object which can contain **name**, **email** and **picture** (value is a URL to the image). **Name** or **email** are displayed in the profile drop-down menu and the user’s profile picture is displayed in the top navigation.
- **accessTokenExpiringNotificationTime** number of seconds that pass before an access token expires and the **onAuthExpireSoon** event is fired. The default value is `60` seconds.
- **expirationCheckInterval** the number of seconds to pass between each check if the token is about to expire. The default value is `5` seconds.


## Custom authorization provider

You can write your own authorization provider that meets your requirements. This is an example of what a custom authorization provider may look like:

```javascript
export class CustomAuthenticationProvider {

  constructor(configSettings = {}) {
    const defaultSettings = {
      redirect_uri: window.location.origin + '/custom-auth-callback.html';
    }
    this.settings = Object.assign({}, defaultSettings, configSettings);
  }
​
  login(){
    // logic to handle the login mechanism
    // returns a promise which contains an error message if something went wrong
  }

  logout(authData, logoutLuigiCore){
    // call logoutLuigiCore() to reset stored data in Luigi Core
    // logic to handle the logout mechanism
  }

  setTokenExpirationAction(){
  }

  setTokenExpireSoonAction() {}

  generateNonce(){
    // returns a string
  }

  userInfo(){
    // logic to get some user information
    // returns a promise of a userinfo object which contains an object with `name`, `email` and `picture` properties to display in the profile dropdown menu
    return { name, email, picture };
  }

  unload() {
    // logic that is called if you use Luigi.unload() in order to remove event listeners and intervals.
  }
}
```
Read more about [Luigi.unload()](luigi-core-api.md#unload).
​
To use the custom authentication provider in your Luigi app, include this code in the `auth:` section of the configuration file:

```javascript
Luigi.setConfig({
  auth: {
    use: 'myProviderConfig',
    myProviderConfig: {
      idpProvider: myProvider,
      redirect_uri: '/another-callback.html'
    }
  }
})
```
​
[oAuth2ImplicitGrant.js](../core/src/providers/auth/oAuth2ImplicitGrant.js) is a good starting point if you don't use an external authorization library.
​
After authorization is successful on the authorization provider's side, it redirects back to `Luigi callback.html` **redirect_uri**. The provider verifies the authorization data, saves it in  **localStorage** for Luigi, and redirects to the Luigi main page.
​
[openIdConnect.js](../core/src/providers/auth/openIdConnect.js) lazy loads the official `oidc-client` library and is a good starting point if you also depend on external authorization libraries.

<!-- add-attribute:class:warning -->
>**NOTE:** Read more about authorization helpers in the [Core API: AuthorizationStore](luigi-core-api.md#AuthorizationStore) section.

​
### Persisting auth data
​
Make sure to set this data in your authorization provider implementation. Most of the time it is used in a `callback.html` so that its data is available for Luigi after successful authorization:
​
```javascript
// partial content of callback.html
const data = {
  accessToken: hashParams['access_token'],
  accessTokenExpirationDate: hashParams['expiry_timestamp'],
  scope: hashParams['scope'],
  idToken: hashParams['id_token']
};
​
Luigi.auth().store.setAuthData(data);
Luigi.auth().store.setNewlyAuthorized();
​
// redirect back to Luigi
window.location.href = '/';
```

### Additional options ​

Additionally, if you process authorization data during Luigi runtime (inside the custom provider, similarly to using the`openIdConnect` provider), dispatch the `luigi.auth.tokenIssued` Event to update the currently opened micro frontends with the latest authorization data. This is not required when processing authorization outside Luigi, for example when `oAuth2ImplicitGrant` provider processes the data in `callback.html` and redirects to Luigi afterward.
​
```javascript
window.postMessage(
  { msg: 'luigi.auth.tokenIssued', authData: data },
  '*'
);
```
