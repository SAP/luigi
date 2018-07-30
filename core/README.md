# Luigi Core

## Overview

Luigi core is a micro front-end framework written in Svelte. To learn how it works, read [this](examples/README.md) document.

## Usage

Read the subsections to learn how to use the project.

### Build and deploy locally

Build and deploy the project using one of the following approaches:

**Simple one-time approach**

Go to the `{luigi-core-root-folder}` folder and run the following command:

`npm run-script bundle && cp -r ./public/ {PATH_TO_SAMPLEAPP}/node_modules/luigi-core/`

**Build and deploy in the development mode**

Go to the `{luigi-core-root-folder}` folder and run the following command:

`npm run-script bundle-develop && cp -r ./public/ {PATH_TO_SAMPLEAPP}/node_modules/luigi-core/`

**Link and build with Lerna**

This mono repository uses [Lerna](https://lernajs.io/) for project management. Check that Lerna is installed. If not, run `npm install --global lerna`

Follow these steps:

1. Install dependencies. 
The `lerna bootstrap` command executes npm install and links cross-dependencies.
```bash
lerna bootstrap
```

2. Bundle cross-dependencies.  
The `lerna run` command runs the given script in every package referenced in the `lerna.json` file.
```bash
lerna run bundle
// or with watch mode:
lerna run bundle-develop
```


**Link manually and build**

Follow these steps:

1. Go to `cd {luigi-core-root-folder}`.
2. Go to `cd public` and run `npm link` once. It links `@kyma-project/luigi-core` to the global `node_modules`.
3. Run `npm run bundle -- --watch`. It builds and updates on change.
4. Navigate to `cd {app-folder}/node_modules`.
5. Remove or move the `@kyma-project/luigi-core` and `@kyma-project/luigi-client` folders.
6. Run `npm link luigi-core`. This links `@kyma-project/luigi-core` to the global `node_modules`.
7. The autoreload of your application only updates the application. Select the CMD + R key combination to reflect the changes of the linked module on the website.

Follow the same steps to apply changes in the `@kyma-project/luigi-client` module.

### Run tests

To perform the unit test on JavaScript files, run `npm test`.

To test svelte components using cypress-svelte-unit-test, run `npm run cypress-test`. It runs all tests headlessly in the Electron browser.

To test svelte components in an interactive mode using cypress-svelte-unit-test, run `npm run cypress-open`.
