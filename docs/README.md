# Luigi Documentation

The aim of this documentation is to provide step-by-step instructions for Luigi as well as to provide a comprehensive reference of all the features you can use.

If you are new to Luigi, go to the [Getting started guide](getting-started.md) to learn more about its structure and key functions.

## Luigi Core

Set up and configure your main Luigi application by following these guides. The Luigi Core libraries allow you to create a user interface where you can configure navigation, authorization, and more.

* [Application setup](application-setup.md) shows you the first steps to prepare your application for development.
* [Navigation configuration](navigation-configuration.md) shows you how to configure navigation in Luigi.
* [Navigation parameters reference](navigation-parameters-reference.md) lists the parameters you can use to configure the top and side navigation.
* [Authorization configuration](authorization-configuration.md) guides you through the configuration to secure Luigi.
* [Authorization events](authorization-events.md) guides you through the event configuration to react to Luigi authorization events.
* [General settings](general-settings.md) provides you with additional configuration parameters for Luigi.
* [Luigi lifecycle hooks](lifecycle-hooks.md) allows you to execute custom logic on any of the Luigi lifecycle steps.
* [Core API](luigi-core-api.md) provides you with API features that help you enrich and use Luigi Core.
* [Luigi UI features](luigi-ux-features.md) provides different customization options for some of the Luigi UI components.

## Luigi Client

Luigi Client enables you to connect micro frontends or views to the main Luigi Core application. Find the Luigi Client API documentation here and learn more about the functions and parameters used to define lifecycles, links, and the appearance of the application.

* [Lifecycle](luigi-client-api.md#lifecycle) gives you details on the lifecycle of listeners, navigation nodes, and Event data.
* [Link Manager](luigi-client-api.md#linkmanager) allows you to navigate to a specific route.
* [UX Manager](luigi-client-api.md#uxmanager) helps you manage the appearance features in Luigi, such as the behaviour of backdrop or loading indicators.

## Core/Client communication
* [Communication](communication.md) describes how to configure features related to communication between Luigi Core and Client.

## Examples

Follow the Luigi [application examples](../core/examples/README.md) for an in-depth look at Luigi capabilities.

## Development

Read the [development and code formatting guidelines](https://github.com/SAP/luigi#development) if you are interested in contributing.
