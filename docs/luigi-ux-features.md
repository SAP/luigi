
# Luigi UX features

### Rendering of Luigi application in the DOM

By default, the Luigi content, including the top navigation, the left navigation, and the content iframed area, are rendered in the body tag of your Luigi Core application. As a result, the Luigi content takes the whole space from your browser window.

However, you can render the Luigi content in any other HTML container. It can be useful if you want to add a header or a footer on top of the Luigi content. To use this feature, add the `luigi-app-root` custom HTML attribute to the HTML tag in which you want to render the Luigi content.

>**NOTE:** If you render the Luigi content in a custom container, the container is positioned relatively when you apply your own CSS. Also, set the height of the Luigi custom container either in **px** or **vh**.


### Responsive application setup

You can quickly adjust the Luigi application to improve user experience on mobile devices, such as smartphones or tablets. Here are some examples:

* Add the following line to your `index.html` file for the Luigi application to render well on a mobile device:

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1">
```

* Define and apply [responsiveNavigation](./general-settings.md) settings to make the left navigation responsive.

### App loading indicator

To show a loading indicator before Luigi Core or your first micro frontend is ready, add a container with the `luigi-app-loading-indicator` attribute to your _index.html_ body or inside your [`luigi-app-root`](#rendering-of-luigi-application-in-the-dom) container.

```html
<div luigi-app-loading-indicator>
  <div class="fd-spinner">
    <div></div>
  </div>
</div>
```

By default, the loading indicator is removed after `Luigi.setConfig({})` has been executed. 

Alternatively, to keep the loading indicator until the first micro frontend is usable, follow the following steps:

1. Set the app loading indicator parameter `hideAutomatically` to `false`

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

2. Call [`Luigi.ux().hideAppLoadingIndicator()`](./luigi-core-api.md#hideAppLoadingIndicator) in the Luigi Core once your initial micro frontend has finished loading to remove the loading indicator. You can for example use the [custom messages](./communication.md#custom-messages) feature for the micro frontend using Luigi Client to communicate the Core when this function should be executed.
