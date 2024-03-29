<!-- meta
{
  "node": {
    "label": "Lifecycle hooks",
    "category": {
      "label": "Luigi Core",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 3
    }
  }
}
meta -->

# Lifecycle hooks

You can use any of the Luigi lifecycle hooks by adding additional setup to the root of the Luigi configuration object. Here is an example:

```javascript
{
  ...
  lifecycleHooks: {
    luigiAfterInit: () => {
      // initializing with a different language
      myGeoLocationService.getLanguage().then(lang => {
        Luigi.i18n().setCurrentLocale(lang);
      })
    }
  }
  ...
}
```

### luigiAfterInit()

This method will be called after [Luigi.setConfig({})](luigi-core-api.md#setconfig) is executed. 

Keep in mind that `luigiAfterInit`is only triggered after the first `setConfig` instance. If you need it to be fired again, you can use [Luigi.reset()](luigi-core-api.md#reset) to trigger a new Luigi re-initialization.

