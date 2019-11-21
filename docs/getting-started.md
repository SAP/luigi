<!-- meta
{
  "node": {
    "label": "Getting started",
    "category": {
      "label": "Basics"
    },
    "metaData": {
      "categoryPosition": 1,
      "position": 1
    }
  }
}
meta -->

# Getting started

## What is Luigi?

Luigi is an open source JavaScript framework for micro frontends. It enables you to:
* create a unified user interface for a web application using **Luigi Core**.
* create micro frontends and connect them to the Luigi Core app using **Luigi Client**.

## What are micro frontends?

Micro frontends are small frontend web applications implemented on one global user interface. They allow you to:

* **break up big, monolithic UIs**: decompose your frontend into smaller chunks and make it more manageable, all while maintaining consistent user experience.
* **give autonomy to individual teams**: every team in your project can develop their own end-to-end application which exists on the same core user interface. This gives teams full autonomy over release dates and updates, while at the same time reducing code dependencies.
* **extend functionality**: integrate external micro frontends to utilize functions provided by third-party sources.
* **scale**: add new features with ease without having to rely on only one UI team.
* **make your website fast and resilient**: even if a micro frontend underperforms, the main user interface is not affected.
* **be technology agnostic**: you can develop each micro frontend using a separate framework without having to synchronize with the main application. This allows you to quickly react to trends and adopt new technologies.

This diagram illustrates the structure of Luigi:

![Overview diagram](assets/luigi-overview-diagram.jpg)

## Prerequisites

All you need to get started with Luigi is basic knowledge of HTML and JavaScript.

You can build an application in Luigi without a framework, or use different frameworks such as:
* Angular 6
* SAPI5/OpenUI5
* VUE.JS

## Next steps

### Luigi Core

Follow these steps to create a global user interface and host a full web application in Luigi:

1. [Set up a Luigi Core application](https://github.com/SAP/luigi/blob/master/docs/application-setup.md).
2. Configure the application. To do so, use the [Luigi Core documentation](https://github.com/SAP/luigi/blob/master/docs/README.md#luigi-core).


### Luigi Client

Follow these steps to develop micro frontends and connect them to an already existing Luigi Core app:

1. [Install Luigi Client](luigi-client-setup.md).
2. Use the functions and parameters provided by the Luigi Client API. You can find them in the [Luigi Client API documentation](luigi-client-api.md).