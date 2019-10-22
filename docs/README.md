# Luigi Documentation

The aim of this documentation is to provide step-by-step instructions for Luigi as well as to provide a comprehensive reference of all the features you can use.

If you are new to Luigi, read the [Getting started guide](getting-started.md) to learn more about its structure and key functions.

## Luigi Core

Set up your main Luigi application by following the Luigi Core guides.

### Installation

[Installation](application-setup.md) shows you the first steps to prepare your application for development.

### Configuration

With Luigi, you can change the look and functionality of your application through a simple configuration file. Click [here](navigation-configuration-example.md) to see an example. The configuration file is divided into several sections, which are outlined in the guides below:

* [**Navigation**](navigation-overview.md) this section contains navigation options for Luigi.
    * [Basic setup](navigation-configuration.md) shows you how to configure basic top and side navigation, links, categories, and more.
    * [Advanced setup](navigation-parameters-reference.md) shows you how to configure navigation elements such as modals, contexts, and more. It also includes information on how to create a dynamic path and hide Luigi navigation if you want to use your own. 
* [**Routing**](routing.md) enables you to define routing options your application.
* [**Authorization**](authorization-configuration.md) guides you through the configuration to secure Luigi.
    * [Authorization events](authorization-events.md) guides you through the event configuration to react to Luigi authorization events.
* [General settings](general-settings.md) provides you with additional configuration parameters for Luigi.
* [Profile](profile.md) shows you how to use the profile tool.
* [Context switcher](context-switcher.md) allows you to create an additional navigation structure for contexts.
* [Product switcher](product-switcher.md)  shows you how to configure a drop down for switching between products.
* [App switcher](app-swticher.md) explains how to configure a feature that switches between applications while maintaining a consistent UI.

The following guides outline Luigi Core API features and additional UI options outside the configuration file.

* [Luigi lifecycle hooks](lifecycle-hooks.md) allows you to execute custom logic on any of the Luigi lifecycle steps.
* [Core API](luigi-core-api.md) provides you with API features that help you enrich and use Luigi Core.
* [Luigi UI features](luigi-ux-features.md) provides different customization options for some of the Luigi UI components.

## Luigi Client

Luigi Client enables you to connect micro frontends or views to the main Luigi Core application.

Find the Luigi Client API documentation here and learn more about the functions and parameters used to define lifecycles, links,and the appearance of the application.

* [Installation](client/readme.md)
* [Lifecycle](luigi-client-api.md#lifecycle) gives you details on the lifecycle of listeners, navigation nodes, and Event data.
* [Link Manager](luigi-client-api.md#linkmanager) allows you to navigate to a specific route.
* [UX Manager](luigi-client-api.md#uxmanager) helps you manage the appearance features in Luigi, such as the behaviour of backdrop or loading indicators.

## Advanced
* [Communication](communication.md) describes how to send custom messages between Luigi Core and Client.

## Examples

Follow the Luigi [application examples](../core/examples/README.md) for an in-depth look at Luigi capabilities.

## Development

Read the [development and code formatting guidelines](https://github.com/SAP/luigi#development) if you are interested in contributing.