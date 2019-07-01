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
  },
  sideNavFooterText: 'MyLovelyApp 1.0.0'
}
```` 

* **hideNavigation** disables Luigi's default out-of-the-box navigation when set to `true`. As a result, neither the left nor top navigation is visible in your application, and you can implement your own navigation UI. By default, the parameter is set to `false`, which means the navigation is enabled.
* **backdropDisabled** prevents the backdrop layer from covering the top and left navigation when showing modal windows. By default, the backdrop is set to `true`.
* **header.logo** defines the top left navigation logo. It has a fixed height of 28px.
* **header.title** defines the top left navigation title.
* **header.favicon** defines the favicon. It rquires a standard favicon file with the `.ico` extension, and 16x16px or 32x32px dimensions.
* **responsiveNavigation** allows customizing the navigation display settings. For example, you can define buttons which show or hide the left navigation completely, or collapse it to only show the icons. 
You can set the following values:
* `simple` displays the button regardless of the browser window´s size.
* `simpleMobileOnly` displays the button when the width is lower than `600px`. 
* `semiCollapsible` displays the arrow button at the bottom of the left side navigation. Upon click, the button displays the navigation or collapses it.<br>
If you don't specify any value for  **responsiveNavigation**, the buttons will not be displayed. The same applies when you enable **hideSideNav** for the current active navigation node. 
* **sideNavFooterText** is a string displayed in a sticky footer inside the side navigation. It is a good place to display the version of your application.
