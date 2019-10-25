# Luigi Documentation

The aim of this documentation is to provide step-by-step instructions for Luigi as well as to provide a comprehensive reference of all the features you can use.

If you are new to Luigi, read the [Getting started guide](getting-started.md) to learn more about its structure and key functions.

## Luigi Core

Luigi Core enables you to create a web application with an easily configurable and consistent user interface.

[Installation](application-setup.md) shows you the first steps to prepare your application for development.

### Configuration

> **TIP:** The [Luigi Fiddle](fiddle.luigi-project.io) allows you to configure a very simple application and get a feel for the process.

To configure your Luigi application, simply edit the files in the `luigi-config` folder of your project.

Luigi configuration is divided into several sections, which are outlined in the guides below:

* [Navigation (basic)](navigation-configuration.md) shows you how to configure basic top and side navigation, links, and categories.
* [Navigation (advanced)](navigation-advanced.md) explains how to create a dynamic path, reuse micro frontends with the same origin, and configure additional navigation elements. 
* [Routing](navigation-parameters-reference.md#routing) shows you how to define routing options for your application.
* [Authorization](authorization-configuration.md) allows you to configure login and security features for your application.
    * [Authorization events](authorization-events.md) guides you through the event configuration to react to Luigi authorization events.
* [General settings](general-settings.md) outlines features such as fully customizing a micro frontend, defining a header, and making your application responsive.
* [Lifecycle hooks](lifecycle-hooks.md) allows you to execute custom logic on any of the Luigi lifecycle steps.

The following guides outline Luigi Core API features and additional UI options that exist outside the configuration files:

* [Core API](luigi-core-api.md) provides you with API features that help you enrich and use Luigi Core.
* [Luigi UI features](luigi-ux-features.md) provides different customization options for some of the Luigi UI components.

## Luigi Client

Luigi Client enables you to connect micro frontends to an already existing Luigi Core application.

[Installation](client/readme.md) shows you how to install the Luigi Client.

Read the Luigi Client API documentation to learn more about the functions and parameters you can use to communicate with the core application:

* [Lifecycle](luigi-client-api.md#lifecycle) gives you details on the lifecycle of listeners, navigation nodes, and Event data.
* [Link Manager](luigi-client-api.md#linkmanager) allows you to navigate to a specific route.
* [UX Manager](luigi-client-api.md#uxmanager) helps you manage appearance options such as the behaviour of backdrop or loading indicators.

## Advanced
* [Communication](communication.md) describes how to send custom messages between Luigi Core and Client.

## Examples

Follow the Luigi [application examples](../core/examples/README.md) for an in-depth look at Luigi capabilities.

## Development

Read the [development and code formatting guidelines](https://github.com/SAP/luigi#development) if you are interested in contributing.