# Container Test App

The several HTML files in this folder test the Luigi Container package features.

The app is split up into different parts with simple examples for all the Container features:

- **compound** : Luigi Compound Container features
    - **clientAPI** : LuigiClient API features 
    - **nested** :  nested compound component feature
    - **selfRegistered** : selfRegistered feature

- **iframe** -> iframe based Luigi Container

- **wc** -> web component based Luigi Container


The above features are tested with e2e Cypress tests (`container/cypress/e2e`). 

To run the test suite:

1. Go to `container` folder:

2. Start the app:
    - `npm run start`

3. Start the cypress tests with User Interface:
    - `npm run cypress-browser`

    or in headless mode

    - Make sure that `examples` app is running: `npm run start-examples-test`
    - then, in another terminal run `npm run cypress-headless`
