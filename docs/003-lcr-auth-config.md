---
title: Authorization Configuration
type: CLI reference
---

## Overview

Luigi provides OpenID Connect and OAuth2 Implicit Grant authorization out of the box. The `use` key defines the currently active authorization provider.

````
auth: {
  use: 'openIdConnect',
  openIdConnect: {
    ...
  }
}
````

## Open ID Connect configuration

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
}
````

- **authority** - Contains the OpenID Connect server address used to authenticate.
- **client_id** - Contains your app client id.
- **scope** - Defines the permissions to request at login.
- **redirect_uri** - Sets the URL to return to after login. The default is the app root `/`.
- **post_logout_redirect_uri** - Sets the URL to return after logout. The default is `/logout.html`.
- **automaticSilentRenew** - Enables the renewal of the automatic token if it is supported by the server. This value defaults to false.

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
````

- **authorizeUrl** - Contains the URL or address of the OAuth2 authorization server.
- **logoutUrl** - Contains the endpoint to terminate the auth session.
- **oAuthData** - Comprises the object with data sent to authorizeUrl.
- **client_id** - Holds your app client id
- **scope** - Defines permissions that are requested at login.
- **redirect_uri** - Contains the URL to return to after login. The default is the app root `/`.
- **response_type** - Defaults to the **id_token**. Any other parameter that is added to oAuthData is also added to the authorization payload.
- **nonceFn** - Provides a function that returns a string in order to override the default **nonce**.
- **logoutFn** - Provides a function to override **logoutUrl** functionality for a custom logout. It needs to execute the function **logoutCallback()** after logout. 