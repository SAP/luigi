
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

If you want to support additionally legacy browsers like Internet Explorer 11 in your application, you just need to update your Luigi imports as follows:
### Luigi Core
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel='stylesheet' href='core/public/luigi-legacy.css'>
    <!-- <link rel='stylesheet' href='core/public/luigi.css'> -->
  </head>
  <body>
    <script type="module" src="luigi.js"></script>
    <script nomodule src="luigi-legacy.js"></script>
    <!-- <script src="/luigi-core/luigi.js"></script> -->
  </body>
</html>
``` 

### Luigi Client
```javascript
import {
  linkManager,
  uxManager
} from '@kyma-project/luigi-client/luigi-client-legacy';
<!-- } from '@kyma-project/luigi-client'; -->

### Luigi Client
``` 
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <link rel='stylesheet' href='core/public/luigi-legacy.css'>
    ...
  </head>

  <body>
    ...
    <script src="core/public/luigi-legacy.js"></script>
    ...
  <body>
</html>

## Development

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
