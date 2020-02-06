<!-- meta
{
  "node": {
    "label": "Getting started",
    "category": {
      "label": "Basics"
    },
    "metaData": {
      "categoryPosition": 1,
      "position": 0
    }
  }
}
meta -->

# Getting started

## Overview

Luigi is an open source JavaScript framework for micro frontends. It enables you to:
* create a unified user interface for a web application using **Luigi Core**.
* create micro frontends and connect them to the Luigi Core app using **Luigi Client**.

This diagram illustrates the structure of Luigi:

<img src="https://github.com/SAP/luigi/blob/master/docs/assets/luigi-overview-diagram.jpg?raw=true" width="600"/>

 Do you want to try out Luigi without installing it on your machine? Try one of these options:

<!-- accordion:start -->

 ### HTML file

It is possible to create a Luigi application using a single HTML file. This example aims to show the simplicity of Luigi, but is not intended for real life use.

Copy and paste this code in a text editor, then save it as an HTML file:

```html
 <!DOCTYPE html>
<html lang="en">

<head>
	<title>Hello Luigi</title>
	<link rel='stylesheet' href='https://unpkg.com/@kyma-project/luigi-core/luigi.css'>
    <meta charset="utf-8">
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script src="https://unpkg.com/@kyma-project/luigi-core/luigi.js"></script>
	<script>
        Luigi.setConfig({
            navigation: {
                nodes: [{
                    pathSegment: 'home',
                    hideFromNav: true,
                    children: [{
                        pathSegment: 'hello',
                        label: 'Hello Luigi',
                        viewUrl: 'https://fiddle.luigi-project.io/examples/microfrontends/multipurpose.html',
                        isolateView: true,
                        context: {
                            title: 'Hello Luigi!',
                            content: " ",
                            imgUrl: "https://fiddle.luigi-project.io/img/logos/Luigi-logo_rgb.svg",
                            imgWidth: "300",
                            imgTopMargin: true
                        }
                    },{
                        pathSegment: 'hello2',
                        label: 'Hello Mario',
                        viewUrl: 'https://fiddle.luigi-project.io/examples/microfrontends/multipurpose.html',
                        isolateView: true,
                        context: {
                            title: 'Hello Mario!',
                            content: " ",
                            imgUrl: "https://fiddle.luigi-project.io/img/logos/Luigi-logo_rgb.svg",
                            imgWidth: "300",
                            imgTopMargin: true
                        }
                    }]
                }]
            },
            routing: {
                useHashRouting: true
            },
            settings: {
                responsiveNavigation: 'semiCollapsible',
                header: {
                    title: 'Hello Luigi',
                    logo: 'https://fiddle.luigi-project.io/img/luigi.png'
                }
            }
        });
    </script>
</body>

</html>
```

### Luigi Fiddle
Go to the [Luigi Fiddle](https://fiddle.luigi-project.io/) website. Click on `Modify Config` at the bottom right to make changes to the Luigi application.

<!-- accordion:end -->

## Prerequisites

* Basic knowledge of HTML
* Basic knowledge of JavaScript

## Setup

### Luigi Core

Follow these steps to create a global user interface and host a **full web application** in Luigi:

1. Set up a Luigi Core application on one of the following frameworks:
  * [No framework](application-setup.md#application-setup-for-an-application-not-using-a-framework)
  * [Angular 6](application-setup.md#application-setup-for-angular-6)
  * [SAPUI5/OpenUI5](application-setup.md#application-setup-for-sapui5openui5)
  * [VUE.JS](application-setup.md#application-setup-for-vuejs)
  * [React](application-setup.md#application-setup-for-react)

2. Configure the application according to your needs. For example, you can begin by configuring the [basic navigation](navigation-configuration.md) of your application.

### Luigi Client

Follow these steps to develop **micro frontends** and connect them to an already existing Luigi Core app:

1. [Install Luigi Client](luigi-client-setup.md).
2. Use the functions and parameters provided by the Luigi Client API. You can find them in the [Luigi Client API documentation](luigi-client-api.md).
