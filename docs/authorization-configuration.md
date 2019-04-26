# Authorization configuration

Luigi provides OpenID Connect and OAuth2 Implicit Grant authorization out of the box. The **use** key defines the active authorization provider and the **disableAutoLogin** key allows you to disable the automatic login flow that is provided by default.

````
auth: {
  use: 'openIdConnect',
  openIdConnect: {
    ...
  },
  disableAutoLogin: true
}
````

## OpenID Connect configuration

The following code snippet demonstrates how to configure authorization using OpenID Connect in Luigi. 

````
auth: {
  use: 'openIdConnect',
  openIdConnect: {
    authority: 'https://example-authority.com',
    client_id: 'client',
    scope: 'audience:server:client_id:client openid profile email groups',
    redirect_uri: '',
    post_logout_redirect_uri: '/logout.html',
    automaticSilentRenew: true
  },
  disableAutoLogin: false
}
````

- **authority** contains the OpenID Connect server address used to authenticate.
- **client_id** contains your app client ID.
- **scope** defines the permissions to request at login.
- **redirect_uri** sets the URL to return to after login. The default application root is `/`.
- **post_logout_redirect_uri** sets the URL to return after logout. The default URL is `/logout.html`.
- **automaticSilentRenew** enables the automatic silent renewal of the token if it is supported by the server. The default value is `false`. For this mechanism to work, the browser must have third-party cookies support enabled.
- **accessTokenExpiringNotificationTime** is the number of seconds before an access token is to expire and triggers silent token refresh. The default value is 60.
- **thirdPartyCookiesScriptLocation** is the URL to the page containing third-party cookies support check. For details, see [Third-party cookies and silent token refresh section](#Third-party-cookies-and-silent-token-refresh).

## OAuth2 Implicit Grant configuration

The following code snippet demonstrates how to configure authorization using OAuth2 Implicit Grant in Luigi. 

````
auth: {
  use: 'oAuth2ImplicitGrant',
  oAuth2ImplicitGrant: {
    authorizeUrl: 'https://example-url.com/authorize',
    logoutUrl: 'https://example-url.com/logout',
    oAuthData: {
      client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp'
      scope: '',
      // optional parameters
      redirect_uri: '/luigi-core/auth/oauth2/callback.html'
      response_type: 'id_token token',
      // all specified values inside oAuthData will be added to the oauth call, i.e display="popup",
    }
    // optional functions
    nonceFn: () => {},
    logoutFn: (settings, authData, logoutCallback) => {}
  },
  disableAutoLogin: false
````

- **authorizeUrl** contains the URL or address of the OAuth2 authorization server.
- **logoutUrl** contains the endpoint to terminate the authorization session.
- **oAuthData** comprises the object with data sent to the **authorizeUrl**.
- **client_id** holds your application client ID.
- **scope** defines permissions that are requested at login.
- **redirect_uri** contains the URL to return to after login. The default application root is `/`.
- **response_type** defaults to the **id_token**. Any other parameter that is added to oAuthData is also added to the authorization payload.
- **nonceFn** provides a function that returns a string in order to override the default **nonce**.
- **logoutFn** provides the function to override the **logoutUrl** functionality for a custom logout. It needs to execute the **logoutCallback()** function after logout.

### Third-party cookies and silent token refresh

The OpenID Connect configuration allows you to specify the **automaticSilentRenew** option. When set to `true`, Luigi attempts to automatically renew the token in the background before it expires. Be aware that this mechanism requires the browser to support [third-party cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Third-party_cookies).
It is possible to detect whether the user's browser supports the mechanism by using the script in [`third-party-cookies`](https://github.com/kyma-project/luigi/tree/master/core/third-party-cookies) catalog. Deploy these files on a **different domain** than your main application and set **thirdPartyCookiesScriptLocation** to `init.html` file. During initialization, Luigi detects the cookies support and produces a warning in the console if cookies are disabled in the user's browser.                                         

When Luigi fails to renew the token and then logs out the user, it adds the following query parameters to the logout page redirect URL: `?reason=tokenExpired&thirdPartyCookies=[VALUE]`. Luigi replaces the **VALUE**  with one of the following:
- `disabled` means that third party cookies is disabled.
- `enabled` means third party cookies are supported by the browser.
- `not_checked` means that the script was not provided in **thirdPartyCookiesScriptLocation** or it could not be loaded.

The application developer can read these parameters and set a logout page based on them.

### Custom Auth Provider

You can write your own Auth Provider that meets your requirements. 

[src/providers/oAuth2ImplicitGrant.js](oAuth2ImplicitGrant.js) is be a good starting point if you are not using an external authentication library.
After authorization on auth provider side, it redirects back to `callback.html`, which sets the auth data to localStorage for Luigi and redirects to the main page. 

[src/providers/openIdConnect.js](openIdConnect.js) lazy loads an official oidc client library and can be a good starting point if you also depend on external authentication libraries.

Be sure to set the following data in your Auth Provider implementation after authentication.
```
const data = {
  accessToken: hashParams['access_token'],
  accessTokenExpirationDate: hashParams['expiry_timestamp'],
  scope: hashParams['scope'],
  idToken: hashParams['id_token']
};

localStorage.setItem('luigi.auth', JSON.stringify(data));
localStorage.setItem('luigi.newlyAuthorized', true);
```