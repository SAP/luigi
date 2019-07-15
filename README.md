[![Build Status](https://travis-ci.org/SAP/luigi.svg?branch=master)](https://travis-ci.org/SAP/luigi)
# Luigi
<p align="center">
 <img src="https://raw.githubusercontent.com/sap/luigi/master/logo.png" width="235">
</p>

## Overview

Luigi is a micro front-end JavaScript framework that enables you to create an administrative user interface driven by local and distributed views. Luigi allows a web application to communicate with the micro front-ends which the application contains. To make sure the communication runs smoothly, you can easily configure the settings such as routing, navigation, authorization, and user experience elements.

Luigi consists of Luigi Core and Luigi Client libraries. They interact with each other to leverage communication between the core application and the micro front-end, without compromising the security principles behind the iframe pattern.

## Installation

Follow the instructions in [this](docs/application-setup.md) document to get started with Luigi. Read [this](client/README.md) document to install the Luigi Client.


## Usage

### Examples

View the [application examples](core/examples) to explore Luigi's features.

### Documentation

For details, see [Luigi documentation](docs/README.md).

## Browser support

If you want to support Internet Explorer 11 in your application, update your Luigi imports as follows:
### Luigi Core
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel='stylesheet' href='/luigi-core/luigi-ie11.css'>
    <!-- <link rel='stylesheet' href='/luigi-core/luigi.css'> -->
  </head>
  <body>
    <script type="module" src="/luigi-core/luigi.js"></script>
    <script nomodule src="/luigi-core/luigi-ie11.js"></script>
    <!-- <script src="/luigi-core/luigi.js"></script> -->
  </body>
</html>
``` 

### Luigi Client
```javascript
import {
  linkManager,
  uxManager
} from '@kyma-project/luigi-client/luigi-client-ie11';
// } from '@kyma-project/luigi-client';
``` 

>**NOTE**: The angular example application is not fully compatible with IE11.

## Development

### Development guidelines for micro frontend developers

For security reasons, follow these guidelines when developing a micro frontend:

- Make the micro frontend accessible only through HTTPS.
- Add Content Security Policies (CSPs).
- Make the Access-Control-Allow-Origin HTTP header as restrictive as possible.
- Maintain a whitelist with trusted domains and compare it with the origin of luigi core app. The origin will be passed when you call the init listener in your micro frontend. Stop further processing in case of a non-matching origin.

>**NOTE**: Luigi follows these [sandbox rules for iframes](https://github.com/SAP/luigi/blob/af1deebb392dcec6490f72576e32eb5853a894bc/core/src/utilities/helpers/iframe-helpers.js#L140).



### Code formatting for contributors

All projects in the repository use [Prettier](https://prettier.io) to format source code. Run the `npm install` command in the root folder to install it along with [husky](https://github.com/typicode/husky), the Git hooks manager. Both tools ensure proper codebase formatting before committing it.

### Unit tests

To ensure that existing features still work as expected after your changes, run unit tests using the `npm run test` command in the [core](/core) folder.

### E2E tests

To ensure that existing features still work as expected after your changes, run UI tests from the [Angular example application](/core/examples/luigi-sample-angular). Before running the tests, start the sample application by using the `npm start` command in the application folder.

When the application is ready:

- Run `npm run e2e:open` in the `core/examples/luigi-sample-angular` folder to start tests in the interactive mode.
- Run `npm run e2e:run` in the `core/examples/luigi-sample-angular` folder to start tests in the headless browser.

### Backward compatibility tests

Use these tests to ensure that applications written for previous versions of Luigi still work after Luigi gets updated with npm. Before running the tests, bundle Luigi by running `lerna run bundle` in the main repository folder.

Install [jq](https://stedolan.github.io/jq/) using the `brew install jq` command. It is required for the script to work, however, you can omit it if the command you are using to run your tests is tagged `latest`. 

- Run `npm run test:compatibility` in the main repository folder to start regression testing. The system will prompt you to select the previous version. 
- Run `npm run test:compatibility -- --tag latest` in the main repository folder to start regression testing with the last version preselected. 
- On the CI, run `npm run test:compatibility -- --install --tag latest` in the main repository folder to install dependencies, bundle Luigi and run the tests with the last version preselected. 

## License

Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache-2.0 license except as noted otherwise in the [LICENSE](/LICENSE) file.
