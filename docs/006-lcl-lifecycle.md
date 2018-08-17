---
title: Life Cycle
type: CLI reference
---

## Overview

There are various parameters and functions available to Luigi pertaining the life cycle of listeners, navigation nodes and event data.  

Here is a code sample and a definition of the different parameters:

````
LuigiClient.addInitListener(initFn)
LuigiClient.addContextUpdateListener(contextUpdatedFn)
LuigiClient.getNodeParams()
LuigiClient.getEventData()
````

- **addInitListener(initFn)** - Registers a listener that gets called as soon as Luigi is instantiated. Gets called with a context object. Useful to defer your app bootstrap, if you are dependent on auth Data from Luigi
- **addContextUpdateListener(contextUpdatedFn)** - Registers a listener that gets called upon navigation change, calls contextUpdatedFn with a new context object
- **getNodeParams()** - Returns the configuration object of the currently active navigation node
- **getEventData()** - Returns the context object, usually not required to be called, as the addContextUpdateListener receives the same values 