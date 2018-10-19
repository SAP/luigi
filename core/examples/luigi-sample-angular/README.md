# Sample Luigi application written in Angular

## Overview

This is the Angular-based sample application which runs with Luigi framework.

## Development

Linking and building with [Lerna](https://lernajs.io/) is the preferred development method. This monorepo uses Lerna for project management. 

To have this application running, follow these steps:

1. Install Lerna globally.
    ```bash
    npm install -g lerna
    ```

2. Install dependencies. Execute the following command in the root `luigi` folder.
    ```bash
    # The `lerna bootstrap` command executes the Node Package Manager (NPM) installation and links cross-dependencies.

    lerna bootstrap
    ```

3. Bundle the Luigi core by executing the following in the `luigi/core` folder.
    ```bash
    # Lerna runs the bundle script in every package where the script exists.

    lerna run bundle
    ```

4. Start the example application from the `luigi/core/examples/luigi-sample-angular` folder.

    `/assets/sampleConfiguration.js` is the default configuration with a showcase of all available features. If you want to try out a much simpler example, change the configuration reference in `index.html` to `basicConfiguration.js`.

    - To run Luigi with hash based routing, change the **routing.useHashrouting** configuration to `true` and run the following command:
        ```bash
        npm run start
        ```

    - To run Luigi with path based routing, change the **routing.useHashrouting** configuration to `false` and run the following command:
        ```bash
        npm run startWebpack
        ```

5. Open it in your browser by going to [http://localhost:4200/](http://localhost:4200/).

6. Optional: Reflect changes in the Luigi Core code on the exemplary application.

    - You must let the Luigi core to bundle every change you apply to it. The easiest approach is to open the Luigi root folder in another tab of your terminal window and run the following command: 
      ```bash    
      lerna run bundle-develop
      ```
    - The Luigi Client is not bundled, so you are able to update it without bundling.
    
    - The auto-reload of your application only updates the application. Type `CMD + R` to reflect the changes of the linked Luigi Core and Luigi Client modules in the website.


## Tests

To run UI tests locally, the sample application has to be running. When the application is ready:

- Run `npm run e2e:run` to start tests in the headless browser.
- Run `npm run e2e:open` to start tests in the interactive mode.
<!-- ## Run server
* Using Angular CLI (standard): `npm run start`

> If you want to enable path routing instead of hash, run the app without Angular CLI.

* Without Angular CLI: `npm run startWebpack`


## Use OpenID Connect

For running OpenID Connect (OIDC) locally, for example with DEX, follow these steps:

1. Run your app locally
2. Add `127.0.0.1 your.address` to `/etc/hosts` 
3. Set __Luigi.config.auth.use__ to `openIdConnect`
4. Run using `npm run start -- --host your.address`
5. Open [your.address:4200](http://your.address:4200) -->
