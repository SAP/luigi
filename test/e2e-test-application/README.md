# Luigi sample and e2e test application written in Angular

## Overview

This is the Angular-based sample application which runs with Luigi framework.

> **NOTE:** The authorization flow `mockAuth` in this application is a mock implementation for local development. **DO NOT USE IN PRODUCTION!**

## Development

Use  [Lerna](https://lerna.js.org) to link the dependencies and bundle scripts within the packages.

To have this application running, follow these steps:

1. Install Lerna globally.
    ```bash
    npm install -g lerna
    ```

2. Install dependencies by running the following command in the root `luigi` folder.
    ```bash
    # The `lerna bootstrap --force-local` command executes the npm package manager installation and links cross-dependencies.

    lerna bootstrap --force-local
    ```

3. Bundle Luigi Core by running the following command in the `luigi/core` folder.
    ```bash
    # Lerna runs the bundle script in every package where the script exists.

    lerna run bundle
    ```

4. Start the example application from the `luigi/test/e2e-test-application` folder.

   The [`src/luigi-config/extended`](src/luigi-config/extended) folder contains the default configuration that includes all available features. If you want to try out a simpler example, change the configuration reference in the [`index.html`](src/index.html) file to `<script src="/assets/basicConfiguration.bundle.js"></script>`. You can edit the `basicConfiguration.bundle.js` file [here](src/luigi-config/basic/basicConfiguration.js).

   You can use hash-based routing or path-based routing in your application:

    - To run Luigi with hash-based routing, set the **routing.useHashrouting** configuration to `true`.
    - To run Luigi with path-based routing, set the **routing.useHashrouting** configuration to `false`.

    Run the server with the following command:
    ```bash
    npm run start
    ```

5. Go to [http://localhost:4200/](http://localhost:4200/) to start the application.

6. Optional: Reflect the changes introduced to the Luigi Core code in the sample application.

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

## How to use OpenID Connect

To run OpenID Connect (OIDC) with a mock server, follow these steps:

1. Start the oidc-mockserver in `scripts/oidc-mockserver` with `docker-compose up`
2. Set __Luigi.config.auth.use__ to `openIdConnect`
3. Run using `npm run start`
4. Open [localhost:4200](http://localhost:4200)
5. Default login credentials are:
   - username: Luigi
   - password: pwd
