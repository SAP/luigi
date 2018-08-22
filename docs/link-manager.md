## Link Manager

Use the Link Manager instead of an internal router to: 

- route inside micro front-ends 
- reflect the route 
- keep the navigation state in Luigi

Here is a code sample and a definition of the different parameters:

````
// navigation
LuigiClient.linkManager().navigate('/overview')
LuigiClient.linkManager().navigate('users/groups/stakeholders')
LuigiClient.linkManager().fromClosestContext().navigate('/users/groups/stakeholders')
LuigiClient.linkManager().fromContext('project').navigate('/settings')
 
 
// additionally send parameters to route
LuigiClient.linkManager().fromClosestContext().withParams({foo: 'bar'}).navigate('settings')
 
 
// feature: preserve view to go back afterwards
LuigiClient.linkManager().fromContext('project').navigate('/settings', null, true) // preserve view
LuigiClient.linkManager().hasBack()
LuigiClient.linkManager().goBack({foo: 'bar})
````

## Navigation

- **navigate(path)** contains either a full absolute path or a relative path without a leading slash that uses the active route as a base. This is a classical navigation.
- **fromClosestContext()** navigates from the closest parent node that has the ****navigationContext** declared in its navigation configuration. The node is usually one with a dynamic path segment.
- **fromContext(contextName)** navigates from a specific parent node that has the **navigationContext** declared in its navigation configuration.

### Navigation with additional parameters

There is one additional **withParams({some: 'value'})** interface, which sends extra parameters to the route. Use it optionally in combination with any of the navigation functions and receive it with as part of the context object in **LuigiClient**

### Navigation with preserved views

**preserve view** sends `true` as the third parameter when navigating to keep the current view opened in the background and open the new route in a new frame. You must use the functions **hasBack()** and **goBack()**  to navigate back afterwards. You can use this feature at unlimited levels. The preserved views are discarded as soon as the standard **navigate()** function is in use in place of **goBack()**.
- **hasBack()** returns a boolean with the information if there is a preserved view available to which a user can return.
- **goBack(returnObj)** discards the active view and shows the previous view again. This paramater also sends the **returnObj** as updated content to the preserved view.