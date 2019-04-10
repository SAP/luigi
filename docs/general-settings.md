# General settings

The configuration file contains a section called **Settings** in which you can configure additional Luigi options.

````
settings: {
  hideNavigation: false
  backdropDisabled : false,
  header: {  object / function / Promise
    logo: 'path/to/image.png',
    title: 'Luigi Demo',
    favicon: 'path/to/favicon.ico'
  }
}
```` 

* **hideNavigation** disables Luigi's default out-of-the-box navigation when set to `true`. As a result, neither the left nor top navigation is visible in your application, and you can implement your own navigation UI. By default, the parameter is set to `false`, which means the navigation is enabled.
* **backdropDisabled** prevents the backdrop layer from covering the top and left navigation when showing modal windows. By default, the backdrop is set to `true`.
* **header.logo** defines the top left navigation logo. It has a fixed height of 28px.
* **header.title** defines the top left navigation title.
* **header.favicon** defines the favicon. It rquires a standard favicon file with the `.ico` extension, and 16x16px or 32x32px dimensions.
* **responsiveNavigation** allows to add a button to the very left of the top navigation which will show or hide the left navigation when clicked. Possible values are `simple` and `simpleMobileOnly`. `simple` will display the button regardless of the browser window´s size, while `simpleMobileOnly` will show the button when the width is lower than _600px_. If `responsiveNavigation` is not specified with one of these values the button will not be displayed. The same applies when `hideNavigation` is enabled in [general settings](#general-settings), or hideNav is set in the current active navigation node. 
