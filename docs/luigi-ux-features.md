<!-- meta
{
  "node": {
    "label": "UI features",
    "category": {
      "label": "Luigi Core",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 2
    }
  }
}
meta -->


# Luigi UX features

- [Rendering of Luigi application in the DOM](#rendering-of-luigi-application-in-the-dom)
- [Responsive application setup](#responsive-application-setup)
- [Custom CSS variables](#custom-css-variables)
- [App loading indicator](#app-loading-indicator)
- [Collapsed left side navigation](#collapsed-left-side-navigation)

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

* Define and apply [**responsiveNavigation**](general-settings.md#responsivenavigation) settings to make the left navigation responsive.

* Define and apply [**profileType**](general-settings.md#profiletype) **'simple'**  or **'Fiori3'** to change the Profile Menu layout and design.

* Set the [**header.responsiveShellbarPaddings**](general-settings.md#headerresponsiveshellbarpaddings) parameter to `true` to make the Shellbar responsive for different screen sizes. 

## Custom CSS variables

The CSS variables listed below allow you to adjust Luigi elements individually and define their width/height.

<!-- add-attribute:class:success -->
>**NOTE:** Customizing Luigi is not limited to these variables and can be also achieved with your own CSS code. You can find a small example [here](faq.md#ui-questions) under the question "How can I style Luigi differently?"

#### Left-side navigation width 

Define a custom width for the left side navigation by adding the `--luigi__left-sidenav--width:` variable to the top of your `index.html`. The default width is 15rem.

```html
:root{
  --luigi__left-sidenav--width: yourCustomWidth;
}
```

#### App title width 

Define a custom width for the App Title on desktop and mobile simultaneously by adding the code below to the top of your `index.html`. The default width is `--luigi__app-title--width: 60vw;` and `--luigi__multi-app-dropdown--width: 50vw;`

```html
:root{
  --luigi__app-title--width: yourCustomSingleAppTitleWidth;
  --luigi__multi-app-dropdown--width: yourCustomMultiAppDropdownWidth;
}
```
#### Top navigation height

Define a custom height for the top navigation/Shellbar by adding the `--luigi__shellbar--height:` variable to the top of your `index.html`. The default height is 2.75rem.

```html
    :root {
      --luigi__shellbar--height: yourCustomShellbarHeight;
    }
```

#### Horizontal navigation/tabNav height

You can define a custom height for the horizontal navigation/[tabNav](navigation-parameters-reference.md#tabnav) by using the `--luigi__horizontal-nav--height` variable. The default value is 2.75rem.

```html
:root{
  --luigi__horizontal-nav--height: yourCustomHorizontalNavHight
}
```

## App loading indicator

To show a loading indicator before Luigi Core or your first micro frontend is ready, add a container with the `luigi-app-loading-indicator` attribute to your `index.html` body or inside your `luigi-app-root` container.

```html
<div luigi-app-loading-indicator>
  <div class="fd-busy-indicator fd-busy-indicator--m" aria-hidden="false" aria-label="Loading"
    data-testid="luigi-loading-spinner">
    <div class="fd-busy-indicator__circle"></div>
    <div class="fd-busy-indicator__circle"></div>
    <div class="fd-busy-indicator__circle"></div>
  </div>
</div>
```

To automatically remove the loading indicator after Luigi initialization phase you can set [settings.appLoadingIndicator.hideAutomatically](navigation-parameters-reference.md#loadingindicatorhideautomatically) to `true`.

To keep the loading indicator until the first micro frontend is usable, follow these steps:

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

## Collapsed left-side navigation

If you use [responsiveNavigation](general-settings.md#responsivenavigation) with **'semiCollapsible'** or **'Fiori3'** mode in your settings, you can adjust the collapsed state of the left-side navigation by using the **collapseLeftSideNav** function.

* To close the left-side navigation, execute **Luigi.ux().collapseLeftSideNav(true)** in Luigi Core once your initial micro frontend has finished loading. It will set the collapsed state to `true` in **Local Storage**, which closes the left side navigation by showing only icons.

* Set the value to `false` if you want to open left-side navigation.
