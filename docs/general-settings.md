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
  sideNavFooterText: 'MyLovelyApp 1.0.0',
  customTranslationImplementation = () => {
    return {
      getTranslation: (key, interpolations, locale) => {
        return translatedText;
      }
    };
  }
}
```` 

* **hideNavigation** disables Luigi's default out-of-the-box navigation when set to `true`. As a result, neither the left nor top navigation is visible in your application, and you can implement your own navigation UI. By default, the parameter is set to `false`, which means the navigation is enabled.
* **backdropDisabled** prevents the backdrop layer from covering the top and left navigation when showing modal windows. By default, the backdrop is set to `true`.
* **header.logo** defines the top left navigation logo. It has a fixed height of 28px.
* **header.title** defines the top left navigation title.
* **header.favicon** defines the favicon. It requires a standard favicon file with the `.ico` extension, and 16x16px or 32x32px dimensions.
* **responsiveNavigation** allows customizing the navigation display settings. For example, you can define a button which shows or completely hides the left navigation, or a button which collapses the navigation to only show the icons. 
You can set the following values:
  * `simple` displays the button on the left side of the top navigation regardless of the browser window´s size.
  * `simpleMobileOnly` displays the button on the left side of the top navigation when the browser window is narrower than `600px`. 
  * `semiCollapsible` displays the arrow button at the bottom of the left side navigation. Once you click the button, the navigation shows up or collapses.<br>
If you don't specify any value for  **responsiveNavigation**, the buttons remain hidden. The same applies when you enable **hideSideNav** for the currently active navigation node. 
* **sideNavFooterText** is a string displayed in a sticky footer inside the side navigation. It is a good place to display the version of your application.
* **customTranslationImplementation** provides a custom localization implementation. It can be an Object or a Function returning an Object. This Object must provide the **getTranslation** Function as property:
```` 
    {
        getTranslation: (key, interpolations, locale) => {
            // should return translationn of the 'key' in the 'locale' or current locale
    }
````
