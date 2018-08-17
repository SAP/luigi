## Overview

The configuration file also contains a section called **Settings**. You can configure addition options for Luigi in it.

````
settings: {
  hideNavigation: false
  backdropDisabled : false
}
````
**hideNavigation** - Set to `true` to disable use of the UI with Luigi's default, out-of-the-box navigation. Subsequently, neither the left nor top navigation are visible in your application. You are then free to provide your own navigation UI. By default, the navigation is enabled. If you want to keep it, set the value to `false` or leave this option unconfigured.

**backdropDisabled** - Set this flag to `true` to prevent the backdrop layer from covering the top and left navigation when showing modal windows. By default, the backdrop is enabled and covers the entire application including the top and left navigation when showing modal windows. To keep the default configuration, set the value to `false` or leave this parameter unconfigured.