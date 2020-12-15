<!-- meta
{
  "node": {
    "label": "UI features",
    "category": {
      "label": "Luigi Core"
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 9
    }
  }
}
meta -->


# Luigi UX features

- [Rendering of Luigi application in the DOM](#rendering-of-luigi-application-in-the-dom)
- [Responsive application setup](#responsive-application-setup)
- [App loading indicator](#app-loading-indicator)
- [Collapsed left side navigation](#collapsed-left-side-navigation)
- [Web component based micro frontends](#web-component-based-micro-frontends)

## Rendering of Luigi application in the DOM

By default, Luigi content, including the top navigation, left navigation, and the content iframe area, are rendered in the `body` tag of your Luigi Core application. As a result, Luigi content takes the whole space of your browser window.

However, you can render Luigi content in any other HTML container. It can be useful if you want to add a header or a footer on top of the Luigi content. To use this feature, add the `luigi-app-root` custom HTML attribute to the HTML tag in which you want to render the Luigi content.

<!-- add-attribute:class:warning -->
>**NOTE:** If you render the Luigi content in a custom container, the container is positioned relatively when you apply your own CSS. Also, set the height of the Luigi custom container either in **px** or **vh**.

<!-- keywords: render in div, load in custom container, add own header or footer -->

## Responsive application setup

You can quickly adjust the Luigi application to improve user experience on mobile devices, such as smartphones or tablets. Here are some examples:

* Add the following line to your `index.html` file for the Luigi application to render well on a mobile device:

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1">
```

* Define and apply [**responsiveNavigation**](general-settings.md) settings to make the left navigation responsive.

* Define a custom width for the left side navigation. To do so, simply add the code below to the top of your `index.html`. The default width is 15rem.

```html
:root{
  --luigi__left-sidenav--width: yourCustomWidth;
}
```

## App loading indicator

To show a loading indicator before Luigi Core or your first micro frontend is ready, add a container with the `luigi-app-loading-indicator` attribute to your `index.html` body or inside your `luigi-app-root` container.

```html
<div luigi-app-loading-indicator>
  <div class="fd-busy-indicator--m" aria-hidden="false" aria-label="Loading">
    <div class="fd-busy-indicator--circle-0"></div>
    <div class="fd-busy-indicator--circle-1"></div>
    <div class="fd-busy-indicator--circle-2"></div>
  </div>
</div>
```

By default, the loading indicator is removed after [Luigi.setConfig({})](luigi-core-api.md#setconfig) has been executed.

Alternatively, to keep the loading indicator until the first micro frontend is usable, follow these steps:

1. Set the app loading indicator parameter **hideAutomatically** to `false`

```javascript
{
  ...
  settings: {
    appLoadingIndicator: {
      hideAutomatically: false
    }
  }
  ...
}
```
2. To remove the loading indicator, call [Luigi.ux().hideAppLoadingIndicator()](./luigi-core-api.md#hideAppLoadingIndicator) in Luigi Core once your initial micro frontend has finished loading. You can, for example, use the [custom messages](./communication.md#custom-messages) feature to allow the Luigi Client micro frontend to communicate with the Core when this function should be executed.

## Collapsed left side navigation

If you use **responsiveNavigation = 'semiCollapsible'**  or **'Fiori3'** mode in your settings, you can adjust collapsed state of the left side navigation by using the **collapseLeftSideNav** function.

* To close the left side navigation, execute **Luigi.ux().collapseLeftSideNav(true)** in Luigi Core once your initial micro frontend has finished loading. It will set the collapsed state to `true` in **Local Storage**. Which closes the left side navgation, by showing only icons.

* Set the value to `false` if you want to open left side navigation.


## Web component based micro frontends

Web components allow you to include more than one micro frontend per page. This can help you create more complex and modular UIs.

It is possible to open a web component based micro frontend in a [modal](navigation-parameters-reference.md#opennodeinmodal) or a [splitView](luigi-client-api.md#splitview). You can use the [Luigi Client API](luigi-client-api.md) to configure web component based micro frontends in the same way as regular micro frontends.

You can take a look at our [e2e example](https://github.com/SAP/luigi/tree/master/test/e2e-test-application) to see how web components can be used.

To use this feature, you need to include the `webcomponents` parameter in your navigation node, for example:

```javascript
{
    pathSegment: 'webcomponent',
    label: 'Webcomponent',
    icon: 'along-stacked-chart',
    loadingIndicator: {
      enabled: false
    },
    context: {
      title: 'Hello WebComponent!'
    },
    viewUrl: '/helloWorldWC.js',
    webcomponent: true,
    openNodeInModal: true
  },
```

Luigi's web component example configuration to show 3 web components in a grid layout. In addition you'll see the configuration for the event bus. The "input" web component sends the typed input. The "header" web component listen listen to a "sendInput" event from a web component with the id "input1". In addition received data will be converted. An "update" event will be triggered and something will changed in the "header" web component where a "update" event listener is registered.

```javascript
{
        pathSegment: 'wc_grid',
        label: 'Grid',
        category: {
          label: 'Compound',
          icon: 'attachment-html',
          collapsible: true
        },
        compound: {
          renderer:
          {
            use: 'grid',
            config: {
              columns: '1fr 1fr 1fr',
              /*rows: '150px',*/
              /*gap: '30px',*/
              layouts: [{
                minWidth: 0,
                maxWidth: 600,
                columns: '1fr',
                gap: 0
              }, {
                minWidth: 600,
                maxWidth: 1024,
                columns: '1fr 1fr',
                gap: '30px'
              }]
            }
          },
          children: [{
            viewUrl: 'URL_TO_HEADER_WEBCOMPONENT/panelHeader.js',
            context: {
              title: 'My Awesome Grid',
              description: 'Really awesome'
            },
            layoutConfig: {
              row: "1",
              column: "1 / -1"
            },
            eventListeners: [{
              source: 'input1',
              name: 'sendInput',
              action: 'update',
              dataConverter: (data) => {
                return 'new text: ' + data;
              }
            }]
          }, {
            id: 'input1',
            viewUrl: 'URL_TO_SOME_WEBCOMPONENT/input.js',
            context: {
              title: 'Some input test',
              instant: true
            }
          },
          {
            viewUrl: 'URL_TO_FOOTER_WEBCOMPONENT/panelFooter.js',
            context: {
              footer: 'This is the end of awesomeness'
            },
            layoutConfig: {
              column: "1 / -1"
            }
          }]
        }
      }
```
