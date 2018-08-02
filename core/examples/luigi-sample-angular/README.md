# Sample luigi application written in Angular

## Development

Linking and building with [Lerna](https://lernajs.io/) is the preferred development method. This mono repository uses Lerna  for project management. 

To have this application running, follow these steps:

1. Install Lerna globally.
    ```bash
    npm install -g lerna
    ```

2. Install dependencies.
    ```bash
    # Lerna bootstrap makes npm install and links cross-dependencies.

    lerna bootstrap
    ```

3. Bundle luigi core.
    ```bash
    # Lerna runs the bundle script in every package where the script exists.

    lerna run bundle
    ```

4. Start the example application.
    ```bash
    npm start
    ```

5. Open it in your browser.

    In your favourite browser, go to http://localhost:4200/

6. Reflect changes on luigi code on the example app

    a. For Luigi Core you have to let it bundle again on every change you apply to it. The easiest approach is to open Luigi´s root folder in another tab in your terminal window and have the following running: 
    ```bash    
    cd core && npm run bundle -- --watch
    ```
    b. Luigi Client is not bundled, so you are fine just updating it without bundling. 
    
    c. The autoreload of your application only updates the application. Type CMD + R to reflect the changes of the linked modules (Luigi Core and Luigi Client) on the website.


<!-- ## Run server
* Using Angular CLI (standard): `npm run start`

> If you want to enable path routing instead of hash, run the app without Angular CLI.

* Without Angular CLI: `npm run startWebpack`


## Use OpenID Connect

For running OpenID Connect (OIDC) locally, for example with DEX, follow these steps:

1. Run your app locally
2. Add `127.0.0.1 your.address` to `/etc/hosts` 
3. Set __LuigiConfig.auth.use__ to `openIdConnect`
4. Run using `npm run start -- --host your.address`
5. Open [your.address:4200](http://your.address:4200) -->
