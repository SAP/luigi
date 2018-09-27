# Lifecycle

There are various parameters and functions available to Luigi pertaining the lifecycle of listeners, navigation Nodes and Event data.  

Here is a code sample and a definition of the different parameters:

````
LuigiClient.addInitListener(initFn)
LuigiClient.addContextUpdateListener(contextUpdatedFn)
LuigiClient.getNodeParams()
LuigiClient.getEventData()
LuigiClient.getPathParams()
````

- **addInitListener(initFn)** registers a listener that is called with a context object as soon as Luigi is instantiated. Defer your application bootstrap if you are dependent on authentication data from Luigi.
- **addContextUpdateListener(contextUpdatedFn)** registers a listener that is called upon any navigation change, and calls the **contextUpdatedFn** with a new context object.
- **getNodeParams()** returns the configuration object of the active navigation Node.
- **getEventData()** returns the context object. Usually it is not required as the **addContextUpdateListener** receives the same values.
- **getPathParams()** returns the dynamic path parameters of the active URL.