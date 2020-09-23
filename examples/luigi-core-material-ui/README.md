# Sample Luigi CORE application written in React with Material-UI

## Overview

Example on how to create a Luigi Core based interface from scratch by disabling all built-in interfaces.
Be aware this is only a MVP with navigation and a simple profile, currently also only a limited amount of events are available publicly from Core. Please get in touch with us, if you want to build a Core app from scratch. We are happy to get to know what you are creating and give support by exposing required events.

Read the [How to create a Luigi Core interface from scratch](#how-to-create-a-luigi-core-interface-from-scratch) below, which is framework agnostic.

This example was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and integrates [Material-UI](https://material-ui.com/), as well as Luigi Core and Client.

## Development

1. Install dependencies:

```bash
cd luigi-core-material-ui
npm install
```
The page will reload if you make edits.<br />
You will also see any lint errors in the console.

2. Run npm start to run this application:

```bash
npm run start
PORT=3000 npm run start // pick a different port
```

Open it in your browser by going to [localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## How to create a Luigi Core interface from scratch

1. Create a base application which will be used for building the interface. It should not contain any router, since the routing will be done by Luigi. In this example we have specified a layout which consists of top and left navigation.

2. Inject `@luigi-project/core` to the `index.html` or the application itself, to be able to use `window.Luigi` later. See our [index.html:32](public/index.html#L32). Additionally add a container which will be used to render Luigi iframes, it should not interfer with our application: [`<div luigi-app-root></div>`](public/index.html#L38). 

3. Create a Luigi configuration. We have used webpack to compile the configuration which can be found in `src/luigi-config/`. It gets built by running `npm run config`.

4. Retrieving Luigi events for navigation updates: 
Each Luigi router update triggers a rebuild of the navigation elements, which you can receive through `Luigi.navigation().addEventListener('topNav')` or its complementary values `leftNav`, `tabNav`, also further events like `routeChanged` or `userInfo` can be received. Show the full list of [navigation events](luigi-core-api.md#addeventlistener).

Example: 
```javascript
const id = Luigi.navigation().addEventListener('topNav', data => setTopNavData(data));
window.onbeforeunload = () => Luigi.navigation().removeEventListener(id); // apply also on component destroy
```

5. Build your navigation based on the data received through the events
Based on the `data` received above, use `data.topNavData` to build the navigation items, apply category logic, or anything else you want to see implemented. To utilize navigation, use a function that handles navigation clicks. See our [Header.js:38 and :66](src/components/Header.js#L38)

Example:
```javascript
// template
<a class="nav-link" onClick="navigateTo(node.pathSegment)">{node.label}</a>

// navigation component
function navigateTo(pathSegment) {
  // for top nav
  Luigi.navigation().navigate(`/${pathSegment}`);
  // possible usecase on side nav, if each top nav node with children has a `navigationContext` defined
  Luigi.navigation().fromClosestContext().navigate(pathSegment);
}
```

6. Build a Profile navigation
In our example we have specified the static profile in [luigi-config/navigation.js:67](src/luigi-config/navigation.js:67) and use the name, email and picture received from the event listener above in combination with `Luigi.getConfigValue('navigation.profile')` to build the [ProfileMenu.js:54-130](src/components/ProfileMenu.js#L54).
`Luigi.navigation().addEventListener('userInfo')` receives an object and gets triggered either through authentication or a static profile using [staticUserInfoFn](navigation-parameters-reference.md#staticuserinfofn).
