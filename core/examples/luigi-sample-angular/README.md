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

4. Start the example application from `luigi/core/examples/luigi-sample-angular` folder.
    ```bash
    npm start
    ```

5. Open it in your browser by going to [http://localhost:4200/](http://localhost:4200/)`.

6. Reflect changes in the Luigi code on the exemplary application.

    - You must let the Luigi core to bundle every change you apply to it. The easiest approach is to open the Luigi root folder in another tab of your terminal window and run the following command: 
    ```bash    
    lerna run bundle-develop
    ```
    - The Luigi Client is not bundled, so you are able to update it without bundling.
    
    - The auto-reload of your application only updates the application. Type `CMD + R` to reflect the changes of the linked Luigi Core and Luigi Client modules in the website.


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
