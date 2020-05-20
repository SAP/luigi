<!-- meta
{
  "node": {
    "label": "Luigi out-of-the-box features",
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

# Luigi out-of-the-box features

Luigi does more than help you implement micro frontends - it also provides many additional out-of-the-box features. Their aim is to make your app as consistent and easy to develop as possible. Read more about these additional benefits below:


## Pre-set UI
![Pre-set UI](assets/ui.jpg)

Do you want a standardized UI for your app which is easy to use and configure? Luigi comes with an out-of-the-box L-shaped shell bar with a variety of different menus, dropdowns and switchers. The navigation built with [Fundamental Styles](https://sap.github.io/fundamental-styles/) allows all your micro frontends to be embedded in a consistent UI. Learn more about Luigi navigation [here](navigation-configuration.md).

## Responsive design
![Responsive design](assets/Devices.jpg)

Luigi can help you quickly adapt your application to render well on a variety of devices and automatically scale the content and elements to match the screen size on which it is viewed. You can create a responsive app in two simple steps. Find out more [here](luigi-ux-features.md).

## Security/ID provider abstraction​
![Security and ID](assets/Security_ID.jpg)

 Security is an important feature, so Luigi has simplified the process of authenticating users with a unique login password. Luigi Core provides ready-to-use [plugins](authorization-configuration.md) for OpenID Connect and OAuth2. We also describe how to use [Google Cloud Identity](advanced-scenarios.md) with Luigi or set up your own [custom authorization provider](authorization-configuration.md#custom-authorization-provider).

## Role-based visibility restrictions
![Visibility restrictions](assets/Role-based.jpg)

Another way to use Luigi's [authorization](authorization-configuration.md) and Core/Client API features is to make certain parts of your application only visible to some users. You can show a different view to admins and regular users, for example. This allows for more flexibility and security in your app.

## Notification management​
![Notifications](assets/alert.jpg)

Luigi allows you to set up notifications and alerts for your application. The alerts are displayed in the main app, which means that you save time and effort by developing them globally, and they all have a consistent user-friendly look. Find out more about alerts [here](luigi-core-api.md#showAlert). Notifications can also be displayed by using the [badge counter](navigation-parameters-reference.md#badgeCounter) for top navigation items.

## Form- and modal management​
![Forms and modals](assets/Form-and-Modal.jpg)

Besides alerts, you can also add input forms, messages, and modals via your Luigi configuration. Modals are designed to look like a part of the Luigi Core app, but receive data from the micro frontend. Thus, your app looks consistent and not like a patchwork of different micro frontends. For more information check out the [Luigi Core](luigi-core-api.md#showConfirmationModal) and [Luigi Client](luigi-client-api.md#showConfirmationModal) API documentation.

## Multi language ​support​
![Language support](assets/Multi-language.jpg)

Offering your app in different languages allows you to reach more people. Luigi is the only micro frontend framework which also offers localization and translation features. For more information, refer to our localization example [here](i18n.md).

