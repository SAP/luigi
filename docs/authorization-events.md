# Authorization events

>NOTE: For testing and learning purposes, you can use the [Luigi Fiddle page](https://fiddle.luigi-project.io) where you can configure a sample Luigi application.

Luigi provides life cycle events which it can trigger internally or by authorization providers.
Events are part of the **auth** configuration object and have to be functions. They can be executed asynchronously.

An example events configuration looks as follows:

```
auth: {
  events: {
    onAuthSuccessful: (settings, authData) => {},
    onAuthError: (settings, err) => {}
    onAuthExpired: (settings) => {},
    onLogout: (settings) => {},
    onAuthExpireSoon: (settings) => {}
  }
}
```

The first parameter is always the current **settings** object of the currently active authorization provider.  This object contains the user provider configuration with the default values.
The second parameter is optional and it is either **authData** or **error**.

You can disable the default behavior of `onAuthExpired` and `onAuthError` by making the function return `false`. As a result, the lifecycle execution stops with this function. This, however, may lead to blank pages after the user logs out since typically the page redirects to a logout, login or home page.

## Events

-   `onAuthSuccessful` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** is executed after logging in with the **authData** object parameter. If valid authorization data was found in the local storage, the function is not executed.
-   `onAuthError` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** is executed:
    - by Luigi **reason** URL parameter with optional **error** URL parameter for detailed description was found on Luigi initialization. The OAuth2Provider uses this approach by redirecting from the authorization provider to `luigi.domain/?reason=someError&error=Error detail describe`.
    - by the OIDC provider if silent access token renewal fails    

    Return `false` to prevent redirecting to `logoutUrl` after executing this function. It goes to the Luigi main route `/` instead.
-   `onAuthExpired` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** is executed if the token expires during runtime, or if Luigi is opened with outdated authorization data in the local storage. Return `false` to prevent redirecting to `logoutUrl` after executing this function.
-   `onLogout` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** is executed after the user logs out.
- `onAuthExpireSoon` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** is executed before the token expires. For OAuth2 and OIDC you can set the **accessTokenExpiringNotificationTime** to specify the number of seconds required to pass before the event is fired. The default value is `60` seconds.
    - by using oAuth2ImplicitGrant you can specify **expirationCheckInterval** which is the number of seconds to pass between each check if the token is about to expire. The default value is `5` seconds.
