# General Settings

The configuration file also contains a section called **Settings** in which you can configure additional Luigi options.

````
settings: {
  hideNavigation: false
  backdropDisabled : false
}
````
**hideNavigation** disables Luigi's default out-of-the-box navigation when set to `true`. Subsequently, neither the left nor top navigation are visible in your application. You are then free to provide your own navigation UI. By default, the navigation is enabled. If you want to keep it, set the value to `false` or leave this option unconfigured.

**backdropDisabled** prevents the backdrop layer from covering the top and left navigation when showing modal windows, when set to `true`. By default, the backdrop is enabled and covers the top and left navigation when showing modal windows. To keep the default configuration, set the value to `false` or leave this option unconfigured.