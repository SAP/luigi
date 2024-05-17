# Container Test App

This folder contains the a composition of several different HTML files which serve the purpose of testing out our Luigi Container package features.


The app is split up in several different parts with simple examples for all the Container features:

- **compound** : Luigi Compound Container features
    - **clientAPI** : LuigiClient API features 
    - **nested** :  nested compound component feature
    - **selfRegistered** : for testing selfRegistered feature

- **iframe** -> iframe based Luigi Container

- **wc** -> web component based Luigi Container


The above features are tested with e2e Cypress tests (`container/cypress/e2e`). 

To run the test suite:
Go to `container` folder:

1. Start the app:
    `npm run start`

2. Start the cypress tests with User Interface:
    - `npm run cypress-browser`

    or in headless mode

    - `npm run cypress-headless` (For this you also need to run the `examples` app : `npm run start-examples-test` on another Terminal)
