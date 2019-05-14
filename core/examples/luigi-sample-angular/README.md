# Sample Luigi application written in Angular

## Overview

This is the Angular-based sample application which runs with Luigi framework.

## Development

Use  [Lerna](https://lernajs.io/) to link the dependencies and bundle scripts within the packages.

To have this application running, follow these steps:

1. Install Lerna globally.
    ```bash
    npm install -g lerna
    ```

2. Install dependencies by running the following command in the root `luigi` folder.
    ```bash
    # The `lerna bootstrap` command executes the npm package manager installation and links cross-dependencies.

    lerna bootstrap
    ```

3. Bundle Luigi Core by running the following command in the `luigi/core` folder.
    ```bash
    # Lerna runs the bundle script in every package where the script exists.

    lerna run bundle
    ```

4. Start the example application from the `luigi/core/examples/luigi-sample-angular` folder.

   The  [`src/luigi-config/extended`](src/luigi-config/extended) folder contains the default configuration including all available features. If you want to try out a simpler example, change the configuration reference in the [`index.html`](src/index.html) file to `<script src="/assets/basicConfiguration.bundle.js"></script>`.

   You can use hash-based routing or path-based routing in your application:

    - To run Luigi with hash-based routing, set the **routing.useHashrouting** configuration to `true`.
    - To run Luigi with path-based routing, set the **routing.useHashrouting** configuration to `false`.
    
    Run the server with the following command: 
    ```bash
    npm run start
    ```

5. Go to [http://localhost:4200/](http://localhost:4200/) to start the application.

6. Optional: Reflect the changes introducted to the Luigi Core code in the sample application.

    - Allow the Luigi Core to bundle every change you apply to it. The easiest approach is to open the Luigi `root` folder in another tab of your terminal window and run the following command: 
  
      ```bash    
      lerna run bundle-develop
      ```
    - The Luigi Client is not bundled, so you can update it without bundling.
    
    - The auto-reload of your application updates only the application. Type `CMD + R` to reflect the changes in the linked Luigi Core and Luigi Client modules on the website.


## Tests

Run the sample application to perform the tests. When the application is ready:

- Run `npm run e2e:run` to start tests in the headless browser.
- Run `npm run e2e:open` to start tests in the interactive mode.
<!-- ## Run server
* Using Angular CLI (standard): `npm run start`

## Use OpenID Connect

For running OpenID Connect (OIDC) locally, for example with DEX, follow these steps:

1. Run your app locally
2. Add `127.0.0.1 your.address` to `/etc/hosts` 
3. Set __Luigi.config.auth.use__ to `openIdConnect`
4. Run using `npm run start -- --host your.address`
5. Open [your.address:4200](http://your.address:4200) -->
