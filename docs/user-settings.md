<!-- meta
{
  "node": {
    "label": "User settings",
    "category": {
      "label": "Luigi Core"
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 13
    }
  }
}
meta -->


# User Settings

Luigi allows you to display a user settings dialog and manage user data. In order to do that, it is neccessary to define a user settings schema. The schema is defined in a `userSettingGroups` object.
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

This user setting group will be displayed by the default editor, under the form of a user setting dialog.
It is possible to write a custom editor using a custom micro frontend. In that case the `userSettingGroup` needs a `viewUrl` property with an URL to the micro frontend.
The micro frontend has to register the `addInitListener` from the Luigi Client. The stored user settings data object is part of the context object which comes with the init and update listener (`context.userSettingsData`).
The micro frontend gets only the stored data object which belongs to its `userSettingGroup`.
To update the user settings data (not store!) a special custom message has to be send to the Luigi Core.
The custom message sends the `userSettingsData` object with the reserved `id: 'luigi.updateUserSettings'`, for example:

```javascript
let luigiContext={};
window.LuigiClient.addInitListener((context, origin) => {
    luigiContext=context;
)};
function onThemeChange(value){
    luigiContext.userSettingsData.theme = value;
    window.LuigiClient.sendCustomMessage({ id: 'luigi.updateUserSettings', data: luigiContext.userSettingsData });
};
```
> **NOTE:** This is a very simple example to get the user settings data from the context and update the changed user settings data via a custom message.

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