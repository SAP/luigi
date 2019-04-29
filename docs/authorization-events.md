# Authorization events

Luigi provides life-cycle events that can be triggered by Luigi internally, or by authorization providers.
Events are part of the **auth** configuration object and require to be functions, they can be executed asynchronous.

By returning `false` value in those functions, the default behaviour can be disabled and lifecycle execution stops with the function. Be aware that this might lead to blank pages in logged out state, since most of the time there is a redirect to either a logout, login or main page.

```
auth: {
  events: {
    onAuthSuccessful: (settings, authData) => {},
    onAuthError: (settings, err) => {}
    onAuthExpired: (settings) => {},
    onLogout: (settings) => {}
  }
}
```

## Events

First parameter is always the current settings object of the currently active auth provider, which consists of the user provider configuration and the default values of that provider.
Second parameter is optional and are either `authData` or `error`.

-   `onAuthSuccessful` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** is executed after login with `authData` object parameter. It is not being executed after auth rehydration from the local storage if valid auth data was found.
-   `onAuthError` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** is executed:
  - by Luigi `reason` url parameter with optional `error` url parameter for detailed description was found on Luigi initialization. OAuth2Provider uses this approach, by redirecting from the auth provider to `luigi.domain/?reason=someError&error=Error detail describe`.
  - by the OIDC provider if silent access token renewal fails
  Return `false` to prevent redirect to `logoutUrl` after executing this function.
-   `onAuthExpired` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** is executed if token expires during runtime, or if Luigi is opened with outdated auth data in the local storage. Return `false` to prevent redirect to `logoutUrl` after executing this function.
-   `onLogout` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** is executed after logging out. Return `false` to prevent redirect to `logoutUrl` after executing this function.
