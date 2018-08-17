# Luigi

## Overview

Luigi is a micro front-end JavaScript framework that enables the creation of an administrative dashboard which is driven by local and distributed views. Luigi enables the communication between a web application and iframes which the application contains such as for routing, navigation, authorization and user experience elements.

Luigi consists of two components: **luigi core** and **luigi client**.

 **luigi core** is installed in the web application while **luigi client** is installed in the application running in the iframe. Both of these components interact with one another to leverage communication between both the web application and the iframe, without compromising the security principles behind the iframe pattern.

## Installation

To get started with Luigi, familiarize yourself with **[luigi core](https://github.com/kyma-project/luigi/blob/master/core/README.md)**.

- [Application setup](docs/application-setup.md)
- [Navigation configuration](docs/navigation-configuration.md)
- [Authorization configuration](docs/authorization-configuration.md)
- [Routing mechanism configuration](docs/router-configuration.md)
- [General settings](docs/general-settings.md)

Learn about the **[luigi client](https://github.com/kyma-project/luigi/blob/master/client/README.md)**.

- [Lifecycle](docs/lifecycle.md)
- [Link Manager](docs/link-manager.md)
- [UX Manager](docs/ux-manager.md)

## Development

To run Luigi during your development phase, use the [Angular example application](/core/examples/luigi-sample-angular).

### Code formatting for contributors

All projects in the repository use [Prettier](https://prettier.io) to format source code. Run `npm install` in the root folder to install it along with [husky](https://github.com/typicode/husky), the Git hooks manager. Both tools ensure proper codebase formatting before committing it.
