# Luigi

## Overview

Luigi is a micro front-end JavaScript framework that enables you to create an administrative user interface driven by local and distributed views. Luigi allows a web application to communicate with the micro front-ends which the application contains. To make sure the communication runs smoothly, you can easily configure the settings such as routing, navigation, authorization, and user experience elements.

Luigi consists of Luigi Core and Luigi Client applications. The main application uses Luigi Core, and the application running in the micro front-end uses the Luigi Client to communicate with the main application. Both of them interact with each another to leverage communication between the main web application and the micro front-end, without compromising the security principles behind the iframe pattern.

## Installation

Follow the instructions in [this](docs/application-setup.md) document to get started with Luigi. Read [this](client/README.md) document to install the Luigi Client.

View the [application examples](core/examples) to explore Luigi's features.

## Documentation

For Luigi documentation, see [Luigi documentation](docs/README.md).

## Code formatting for contributors

All projects in the repository use [Prettier](https://prettier.io) to format source code. Run the `npm install` command in the root folder to install it along with [husky](https://github.com/typicode/husky), the Git hooks manager. Both tools ensure proper codebase formatting before committing it.

## Tests

To ensure that existing features still work as expected after your changes, run UI tests from the [Angular example application](/core/examples/luigi-sample-angular). Before running the tests, start the sample application by using the `npm start` command in the application folder.

When the application is ready:

- Run `npm run e2e:run` in the `core/examples/luigi-sample-angular` folder to start tests in the headless browser.
- Run `npm run e2e:open` in the `core/examples/luigi-sample-angular` folder to start tests in the interactive mode.