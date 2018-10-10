# UX Manager

Use the UX Manager to manage the appearance in Luigi.   

Here is a code sample and a definition of the different parameters:

````
LuigiClient.uxManager().addBackdrop()
LuigiClient.uxManager().removeBackdrop()
LuigiClient.uxManager().showLoadingIndicator()
LuigiClient.uxManager().hideLoadingIndicator()
````


- **addBackdrop()** adds a backdrop to block the top and side navigation. It is based on Fundamental UI Modal, which you can use in your micro front-end to achieve the same behaviour.
- **removeBackdrop()** removes the backdrop.
- **showLoadingIndicator()** adds a backdrop with a loading indicator for the micro front-end frame. This overrides the **loadingIndicator.enabled** setting.
- **hideLoadingIndicator()** removes the loading indicator. Use it after calling **showLoadingIndicator()** or to hide the indicator when you use the `loadingIndicator.hideAutomatically: false` Node configuration.