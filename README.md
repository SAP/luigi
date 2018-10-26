# Luigi

## Overview

Luigi is a micro front-end JavaScript framework that enables the creation of an administrative user interface which is driven by local and distributed views. Luigi enables the communication between a web application and content-views which the application contains such as routing, navigation, authorization, and user experience elements.

Luigi consists of two components: **Luigi core** and **Luigi client**.

 **Luigi core** is installed in the web application while **Luigi client** is installed in the application(s) running in the content-view. Both of these components interact with one another to leverage communication between both the web application and the content-view, without compromising the security principles behind the iframe pattern.

## Installation

### Luigi core

Luigi core is the part of Luigi that enables navigation, security and routing. To get started with Luigi, read [this](docs/application-setup.md) document.

- [Application setup](docs/application-setup.md) shows you the first steps to prepare your application for development.
- [Navigation configuration](docs/navigation-configuration.md) shows you how to configure navigation.
- [Authorization configuration](docs/authorization-configuration.md) shows you how to secure Luigi.
- [General settings](docs/general-settings.md) provides you with configuration parameters.

### Luigi client

Luigi client enables integration of Luigi in views. You can easily configure the lifecycle and links of the client, as well as customize the appearance of your navigation.

- [Lifecycle](docs/luigi-client-api.md#lifecycle) gives you details on the life cycle of listeners, navigation nodes and event data.
- [Link Manager](docs/luigi-client-api.md#linkmanager) allows you to navigate to a specific route.
- [UX Manager](docs/luigi-client-api.md#uxmanager) helps you to manage the appearance in Luigi.

See [this](https://github.com/kyma-project/luigi/blob/master/client/README.md) document to learn more about the Luigi client. 

View [example applications](/core/examples).

### Code formatting for contributors

All projects in the repository use [Prettier](https://prettier.io) to format source code. Run the `npm install` command in the root folder to install it along with [husky](https://github.com/typicode/husky), the Git hooks manager. Both tools ensure proper codebase formatting before committing it.

## Tests

To ensure that existing features still work as expected after your changes, run UI tests from the [Angular example application](/core/examples/luigi-sample-angular). Before running the tests, start the sample application by using the `npm start` command in the application folder.

When the application is ready:

- Run `npm run e2e:run` in the `core/examples/luigi-sample-angular` folder to start tests in the headless browser.
- Run `npm run e2e:open` in the `core/examples/luigi-sample-angular` folder to start tests in the interactive mode.