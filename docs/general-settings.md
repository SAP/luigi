# General Settings

The configuration file also contains a section called **Settings** in which you can configure additional Luigi options.

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
**hideNavigation** disables Luigi's default out-of-the-box navigation when set to `true`. Subsequently, neither the left nor top navigation are visible in your application. You are then free to provide your own navigation UI. By default, the navigation is enabled. If you want to keep it, set the value to `false` or leave this option unconfigured.

**backdropDisabled** prevents the backdrop layer from covering the top and left navigation when showing modal windows, when set to `true`. By default, the backdrop is enabled and covers the top and left navigation when showing modal windows. To keep the default configuration, set the value to `false` or leave this option unconfigured.

**header.logo** defines the top left navigation logo. It has a fixed height of 28px.
**header.title** defines the top left navigation title.
**header.favicon** defines the favicon. Requires a standard favicon file with .ico file ending and 16x16px or 32x32px dimensions.
