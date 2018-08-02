# Luigi

## Overview

Luigi is a micro front-end framework written in Svelte.

### Table of contents

This is the table of contents for all `README.md` documents in the `luigi` repository:
* [Core](core/README.md)
    * [Examples](core/examples/README.md)
* [Client](client/README.md)

Read them to learn more about each project in this repository.

## Development

Linking and building with [Lerna](https://lernajs.io/) is the preferred development method. This monorepo uses Lerna for project management. 

The best way to see Luigi up and running is by using the [Angular example app](/core/examples/luigi-sample-angular/README.md). In order to do so, follow these steps:

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
    cd core/examples/luigi-sample-angular && npm start
    ```

5. Open it in your browser.
    
    In your favourite browser, go to http://localhost:4200/

6. Reflect changes on luigi code on the example app

    a. For Luigi Core you have to let it bundle again on every change you apply to it. The easiest approach is to open Luigi´s root folder in another tab in your terminal window and have the following running: 
    ```bash    
    cd core && npm run bundle -- --watch
    ```
    b. Luigi Client is not bundled, so you are fine just updating it without bundling.
    
    c. *The autoreload of your application only updates the application code*. Type CMD + R to reflect the changes of the linked modules (Luigi Core and Luigi Client) on the website.

### Code formatting rules
All projects in the repository use [Prettier](https://prettier.io) to format source code. Run `npm install` in the root folder to install it along with [husky](https://github.com/typicode/husky), the Git hooks manager. Both tools ensure proper codebase formatting before committing it.
