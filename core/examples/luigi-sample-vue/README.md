# Sample Luigi application written in Vue.JS

## Overview

This is the Vue.JS-based sample application which runs with Luigi framework.

## Development

Linking and building with [Lerna](https://lernajs.io/) is the preferred development method. This monorepo uses Lerna for project management. 

To have this application running, follow these steps:

1. Ensure that you have installed Lerna. If not, run the following command.
    
    Install Lerna globally
    
    ```bash
    npm install -g lerna
    ```

2. Install dependencies.
    ```bash
    # The `lerna bootstrap` command executes the Node Package Manager (NPM) installation and links cross-dependencies.

    lerna bootstrap
    ```

3. Bundle the Luigi core.
    ```bash
    # Lerna runs the bundle script in every package where the script exists and were referenced in the lerna.json.

    lerna run bundle
    ```
    
4. Start the example application.
    ```bash
    cd core/examples/luigi-sample-vue
    npm run serve
    ```
    
5. Open it in your browser by going to [http://localhost:8081/](http://localhost:8081/)`.

### Testing

This example contains basic unit test which you can execute with `npm run test:unit`
Additionally this example contains a small e2e integration test suit which can be executed with `npm run test:e2e`.

### Build

```
npm run build
```

The build compiles and minifies the source files for production usage.
The build generates a `dist` folder which can be served via a webserver.
