# Luigi

## Overview

Luigi is a micro front-end JavaScript framework that enables the creation of an administrative dashboard which is driven by local and distributed views. Luigi enables the communication between a web application and content-views which the application contains such as routing, navigation, authorization, and user experience elements.

Luigi consists of two components: **Luigi core** and **Luigi client**.

 **Luigi core** is installed in the web application while **Luigi client** is installed in the application(s) running in the content-view. Both of these components interact with one another to leverage communication between both the web application and the content-view, without compromising the security principles behind the iframe pattern.

## Installation

To get started with Luigi, read the [Luigi core](https://github.com/kyma-project/luigi/blob/master/core/README.md) document.

- [Application setup](docs/application-setup.md)
- [Navigation configuration](docs/navigation-configuration.md)
- [Authorization configuration](docs/authorization-configuration.md)
- [Routing mechanism configuration](docs/router-configuration.md)
- [General settings](docs/general-settings.md)

See [this](https://github.com/kyma-project/luigi/blob/master/client/README.md) document to learn more about the Luigi client.

- [Lifecycle](docs/lifecycle.md)
- [Link Manager](docs/link-manager.md)
- [UX Manager](docs/ux-manager.md)

## Development

To run Luigi during your development phase, use the [Angular example application](/core/examples/luigi-sample-angular).

### Code formatting for contributors

All projects in the repository use [Prettier](https://prettier.io) to format source code. Run the `npm install` command in the root folder to install it along with [husky](https://github.com/typicode/husky), the Git hooks manager. Both tools ensure proper codebase formatting before committing it.
