# Lifecycle hooks

You can use any of the Luigi lifecycle hooks by adding additional setup to the root of the Luigi configuration object. Here is an example:

```javascript
{
  ...
  lifecycleHooks: {
    luigiAfterInit: () => {
      const newCustomMessage = {
        id: 'luigi.my-custom-message-for-client',
        description: 'here goes the message description'
      };
      Luigi.customMessages().send('MY_MICRO_FRONTEND_ID', newCustomMessage);
    }
  }
  ...
}
```

### luigiAfterInit()

This method will be called after `Luigi.setConfig({})` is executed. 

