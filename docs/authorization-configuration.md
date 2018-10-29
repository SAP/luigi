# Authorization Configuration

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
- **automaticSilentRenew** enables the automatic silent renewal of the token if it is supported by the server. The default value is `false`. For this mechanism to work, browser must have third-party cookies support enabled.
- **accessTokenExpiringNotificationTime** is the number of seconds before an access token is to expire and triggers silent token refresh. The default value is 60.
- **thirdPartyCookiesScriptLocation** is the URL to the page containing third-party cookies support check. See more about it in [Third-party cookies and silent token refresh section](#Third-party-cookies-and-silent-token-refresh). 

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
- **logoutFn** provides a function to override **logoutUrl** functionality for a custom logout. It needs to execute the function **logoutCallback()** after logout.

### Third-party cookies and silent token refresh

OpenID connect configuration lets you specify **automaticSilentRenew** option. When it is set to `true` Luigi will try to automatically renew the token in the background before it expires. Be aware that this mechanism requires the browser to support [third-party cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Third-party_cookies).
It is possible to detect whether user's browser supports it by using the script in [`third-party-cookies`](https://github.com/kyma-project/luigi/tree/master/core/third-party-cookies) catalog. Deploy these files on a **different domain** than your main application and set `thirdPartyCookiesScriptLocation` to the `init.html` file. Luigi will then detect the cookies support at the initialization and warn in the console if user's browser has it disabled.

In addition, when Luigi fails to renew the token and then logs out the user, it will add query params `?reason=tokenExpired&thirdPartyCookies=[VALUE]`, where `VALUE` is one of (`disabled`, `enabled`, `not_checked`) to the logout page redirect. Application developer can read these params and provide proper logout page based on them. 
- `disabled` means that third party cookies is disabled
- `enabled` means third party cookies are supported by the browser
- `not_checked` means that the script was not provided in `thirdPartyCookiesScriptLocation` or it could not be loaded