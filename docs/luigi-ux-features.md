
# Luigi UX features

### Rendering of Luigi application in the DOM

By default, the Luigi content, including the top navigation, the left navigation, and the content iframed area, are rendered in the body tag of your Luigi Core application. As a result, the Luigi content takes the whole space from your browser window.

However, you can render the Luigi content in any other HTML container. It can be useful if you want to add a header or a footer on top of the Luigi content. To use this feature, add the `luigi-app-root` custom HTML attribute to the HTML tag in which you want to render the Luigi content.

>**NOTE:** If you render the Luigi content in a custom container, the container is positioned relatively when you apply your own CSS. Also, set the height of the Luigi custom container either in **px** or **vh**.


### Responsive app setup

There are a couple quick adjustments that can be applied to the Luigi application, that will improve the user experience on mobile devices like smartphones or tables.

In first place, it is recommended to add following to your _index.html_, for the Luigi app to be best rendered on a mobile device.

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1">
```

Apart from that, it is also possible to make the left navigation responsive. To do so, some additional settings need to be applied as specified [here](./general-settings.md)
