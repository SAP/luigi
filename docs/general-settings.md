<!-- meta
{
  "node": {
    "label": "General settings",
    "category": {
      "label": "Luigi Core"
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 6
    }
  }
}
meta -->

# General settings

<!-- add-attribute:class:success -->
>**TIP:** For learning and testing purposes, use the [Luigi Fiddle](https://fiddle.luigi-project.io) page where you can configure a sample Luigi application.

The configuration file contains a section called **Settings** in which you can configure additional Luigi options.

```javascript
settings: {
  hideNavigation: false
  backdropDisabled : false,
  header: {  object / function / Promise
    logo: 'path/to/image.png',
    title: 'Luigi Demo',
    favicon: 'path/to/favicon.ico'
  },
  sideNavFooterText: 'MyLovelyApp 1.0.0',
  sideNavCompactMode: false,
  customTranslationImplementation: () => {
    return {
      getTranslation: (key, interpolations, locale) => {
        return translatedText;
      }
    };
  },
  customSandboxRules: ['allow-downloads-without-user-activation'],
  allowRules: ['microphone'],
  appLoadingIndicator: {
    hideAutomatically: true
  },
  thirdPartyCookieCheck = {
    //thirdPartyCookieScriptLocation: 'https://domain/init.html',
    thirdPartyCookieErrorHandling: () => {
      const alert = {
        text: 'Third Party Cookies are not enabled. Please check your browser settings.',
        type: 'warning'
      };
      Luigi.ux().showAlert(alert);
    }
  }
}
```

* **hideNavigation** disables Luigi's default out-of-the-box navigation when set to `true`. This means that top, side, and tab navigation is no longer visible and you can implement your own navigation UI. By default, the parameter is set to `false`, which means the navigation is enabled.
* **backdropDisabled** prevents the backdrop layer from covering the top and left navigation when showing modal windows. By default, the backdrop is set to `true`.
* **header.logo** defines the top left navigation logo. It has a fixed height of 28px.
* **header.altText** adds the HTML `alt` attribute to the logo image.
* **header.title** defines the top left navigation title.
* **header.favicon** defines the favicon. It requires a standard favicon file with the `.ico` extension, and 16x16px or 32x32px dimensions.
* **responsiveNavigation** allows customizing the navigation display settings. For example, you can define a button which shows or completely hides the left navigation, or a button which collapses the navigation to only show the icons.
You can set the following values:
  * `simple` displays the button on the left side of the top navigation regardless of the browser window´s size.
  * `simpleMobileOnly` displays the button on the left side of the top navigation when the browser window is narrower than `600px`.
  * `semiCollapsible` displays the arrow button at the bottom of the left side navigation. Once you click the button, the navigation shows up or collapses.
  * `Fiori3` displays the button on the left side of the top navigation. Once you click the button, the navigation shows up or collapses.<br>
If you don't specify any value for  **responsiveNavigation**, the buttons remain hidden. The same applies when you enable **hideSideNav** for the currently active navigation node.
* **sideNavFooterText** is a string displayed in a sticky footer inside the side navigation. It is a good place to display the version of your application.
* **sideNavCompactMode** reduces the dimensions of the side navigation and allows you to display more information.
* **customTranslationImplementation** provides a custom localization implementation. It can be an Object or a Function returning an Object. This Object must provide the **getTranslation** Function as property:
```javascript
{
  getTranslation: (key, interpolations, locale) => {
    // should return translation of the 'key' in the 'locale' or current locale
  }
}
```
Take a look at our [i18n](i18n.md) section for an implementation suggestion.
<!-- add-attribute:class:warning -->
> **NOTE:** You can translate Luigi internal messages by providing translation for [these keys](../core/src/utilities/defaultLuigiTranslationTable.js).

* **customSandboxRules** is an array of custom rules for the content in the iframe. You can extend the [Luigi default sandbox rules](https://github.com/SAP/luigi/blob/af1deebb392dcec6490f72576e32eb5853a894bc/core/src/utilities/helpers/iframe-helpers.js#L140) by adding further rules.
* **iframeCreationInterceptor** is a function called on iframe creation. It gives you full control over the created iframe DOM element. You can modify it to your needs just before it is added to the DOM tree.
This function is called with these parameters:
  * `iframe` is the iframe DOM element. It is not yet added to the DOM tree, but all attributes are already set.
  * `viewGroup` is the view group associated with this iframe, if applicable.
  * `navigationNode` is the navigation node associated with this iframe. NOTE: the interceptor is called only once per iframe creation. If two or more navigation nodes share the same iframe (because they belong to the same view group) the interceptor is called with the first navigated node only.
  * `microFrontendType`, which is `main`, `modal` or `split-view` depending on where it is going to be rendered.

For example, to allow 'fullscreen' for non-modal iframes:
```javascript
{
  iframeCreationInterceptor: (iframe, viewGroup, navigationNode, microFrontendType) => {
    if (microFrontendType !== 'modal')
      iframe.allowFullscreen = true;
  }
}
```
* **allowRules** is an array of rules for the content in the iframe, managed by the HTML **allow** attribute. You can use one or more rules by adding them to the array, for example `allowRules: ['microphone', 'camera']`. Be aware that this mechanism requires the browser to support [Feature Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy).
* **appLoadingIndicator.hideAutomatically** allows you to disable automatic hiding of the app loading indicator, which is enabled by default in case the app loading indicator is being used. Take a look at the [App loading indicator](luigi-ux-features.md#app-loading-indicator) section on how to use this feature.

* **theming.themes** is an array of available themes, for example `themes: ['light', 'dark']`.

### Third-party cookies support check

There are two ways to check whether the user's browser supports third-party cookies:

**thirdPartyCookieCheck** is an object which expects a function called `thirdPartyCookieErrorHandling` and an optional **thirdPartyCookiesScriptLocation** parameter. When **thirdPartyCookiesScriptLocation** is set, the Luigi Core application checks third-party cookie support only once and not on every micro frontend call. If it is *not* set, the Luigi Core application checks third-party cookie support whenever a micro frontend is loaded.
  * `thirdPartyCookieErrorHandling` is a function where you could call an alert like `Luigi.ux().showAlert({})`.
  * **thirdPartyCookieScriptLocation** is the URL to the page containing third-party cookies support check.
To detect whether the user's browser supports the mechanism, use the script in the [`third-party-cookies`](https://github.com/SAP/luigi/tree/master/core/third-party-cookies) catalog. Deploy this file on a domain different from your main application's and set `thirdPartyCookieScriptLocation` to the `init.html` file. During initialization, Luigi detects cookies support and produces an alert if cookies are disabled in the user's browser.

### User settings

In order to display a user settings dialog and manage data it is neccessary to define a user settings schema. The schema is defined in a `userSettingGroups` object.
Each `userSettingGroup` could have the following meta data:

```javascript
userSettingGroup: {
  label: 'Label',
  sublabel: 'Sublabel',
  icon: 'account',
  title: 'Title',
  settings: {
    inputField: { type: 'string', label: 'label' , isEditable: true},
    checkbox: { type: 'boolean', label: 'Checkbox', isEditable: true },
    enum: 
      {
        type: 'enum',
        label: 'Label',
        options: ['option1', 'option2', 'option3', 'option3'],
        description: 'Description'
      }
  }
}
```

#### Write a custom editor
This user setting group will be displayed in a user settings dialog and the data will be rendered in a default editor.
It is possible to write a custom editor using a custom micro frontend. In that case the `userSettingGroup` needs a `viewUrl` property with an url to the micro frontend.
The micro frontend has to register the `addInitListener` from the Luigi Client. The stored user settings data object is part of the context object which comes with the init and update listener (`context.userSettingsData`).
The micro frontend gets only the stored data object which belongs to its `userSettingGroup`.
To update the user settings data (not store!) a special custom message has to be send to the Luigi core.
The custom message sends the `userSettingsData` object with the reserved `id: 'luigi.updateUserSettings'`, e.g.:

```javascript
window.LuigiClient.addInitListener((context, origin) => {
    context.userSettingsData.theme = 'red';
    window.LuigiClient.sendCustomMessage({ id: 'luigi.updateUserSettings', data: context.userSettingsData });
});
```
> **NOTE:** This is a very simple example where the user settings data object will be imidiatly updated without any user interaction. 

#### Customize the user settings dialog
These parameters can be used to configure the user settings menu in Luigi. You may also want to take a look at the [Luigi Core API](luigi-core-api.md) for additional options.

* **userSettingsProfileMenuEntry.label** defines the profile navigation entry. By default it is `Settings`.
* **userSettingsProfileMenuEntry.icon** defines the profile navigation entry icon. By default it is SAP icon `settings`.

* **userSettingsDialog.dialogHeader** defines user settings dialog header. By default it is `User Settings`.
* **userSettingsDialog.saveBtn** defines user settings dialog save button. By default it is `Save`.
* **userSettingsDialog.dismissBtn** defines user settings dialog dismiss button. By default it is `Dismiss`.

#### Override default read and store functionality
By implementing the `storeUserSettings` and `readUserSettings` the default mechanism can be overriden.

* **storeUserSettings** if this function is implemented, the default mechanism will be overridden and you can choose a custom storage to store the user settings object (for example, using a custom third party Rest API). The function should return a promise and takes two parameters. The first one is the user settings which will be stored. The second one is the previous stored user settings. On resolve the user settings dialog will be closed.
If an error appears, you have the possibility to close the user settings dialog by adding a `closeDialog` boolean flag to the error object. In addition, you can implement a `message` to display the error on the browser console log.
```javascript
return new Promise((resolve, reject) => {
        if (JSON.stringify(obj) !== JSON.stringify(previous)) {
          const settings = {
            header: "Confirmation",
            body: "Are you sure you want to do this?",
            buttonConfirm: "Yes",
            buttonDismiss: "No"
          }
          Luigi
            .ux()
            .showConfirmationModal(settings).then(() => {
              sessionStorage.setItem('luigi.usersettings', JSON.stringify(obj));
              resolve();
            }).catch(() => {
              reject({ closeDialog: true, message: 'error ' });
            });
        }
      });
```      

* **readUserSettings** if this function is implemented, the default mechanism will be overridden and you can choose a custom storage to read the user settings object. The function should return a promise. The resolve function gets the user settings object as parameter.
If an error appears, you have the possibility to close the user settings dialog by adding a `closeDialog` boolean flag to the error object to close it. In addition, you can implement a `message` to display the error on the browser console log.
```javascript
readUserSettings: () => {
      return new Promise((resolve, reject) => {
        try{
            resolve(JSON.parse(sessionStorage.getItem('luigi.usersettings')));
        }catch{
           reject({ closeDialog: true, message: 'some error' });
        }
      })
    }
```

<!-- document the schema-->
