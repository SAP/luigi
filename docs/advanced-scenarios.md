<!-- meta
{
  "node": {
    "label": "Expert scenarios",
    "category": {
      "label": "Advanced"
    },
    "metaData": {
      "categoryPosition": 4,
      "position": 1
    }
  }
}
meta -->

# Expert scenarios

This is a collection of advanced use cases and example implementations. If you are new to Luigi, take a look at our [Getting Started](getting-started.md) section first.

<!-- accordion:start -->

### Use a SPA router and keep Luigi Core URL in sync

#### Overview


This example shows you how to keep an existing routing strategy and use an existing micro frontend as drop-in without the need to refactor everything to [`LuigiClient.linkManager()`](https://docs.luigi-project.io/docs/luigi-client-api?section=linkmanager). To update the Luigi Core URL when routing internally with the micro frontend router, without updating the URL on the Luigi Client side, use the `linkManager()` [withoutSync](luigi-client-api.md#withoutsync) and [fromVirtualTreeRoot](luigi-client-api.md#fromvirtualtreeroot) methods. 

If you are running Luigi Core v0.7.7+, you can use [fromClosestContext](luigi-client-api.md#fromclosestcontext) instead of `fromVirtualTreeRoot`, which requires a [navigationContext](luigi-client-api.md#navigationcontext) at the `virtualTree` node configuration.

<!-- add-attribute:class:warning -->
> **NOTE**: This is a very simple example. For cases like modals or split views, you still require the use of [Luigi Client](luigi-client-api.md).

#### Steps

1. Configure the Luigi navigation node:

<!-- add-attribute:class:warning -->
> **NOTE**: To keep the example simple, we use [virtualTree](navigation-parameters-reference.md#virtualtree) to allow any nested navigation, but this is not mandatory. You can always specify the node tree yourself and still use automatic navigation with router events.


```javascript
    {
      pathSegment: 'Orders',
      label: 'orders',
      viewUrl: 'https://orders.microfrontend/',
      virtualTree: true
    }
```

2. Use an Angular Router for navigation.

Angular provides [Router events](https://angular.io/guide/router#router-events). We are reacting on `NavigationEnd` to update the URL after a successful route change.

We assume that the whole Angular app is one micro frontend and has its routes declared on the root level:

```javascript
  { path: 'preload', component: PreloadComponent },
  { path: '', component: OrderListComponent },
  { path: ':id', component: OrderComponent },
  { path: ':id/details', component: OrderDetailsComponent },
```

Use this code to implement `luigi-auto-navigation.service.ts`, which is globally imported in our `app.module.ts`:

```javascript
import { Router, NavigationEnd } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { linkManager } from '@luigi-project/client';

@Injectable({ providedIn: 'root' })
export class LuigiAutoNavigationService implements OnDestroy {
  private subscriptions: Subscription = new Subscription();
  constructor(private router: Router) {
    this.subscriptions.add(
      router.events
        .pipe(filter(ev => ev instanceof NavigationEnd))
        .subscribe((ev: NavigationEnd) => {
          linkManager()
            .fromVirtualTreeRoot()
            .withoutSync()
            .navigate(ev.url);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
```
`app.module.ts`:
```javascript
@NgModule({
    providers: [LuigiAutoNavigationService],
```


#### Result

Other than the added service, which you can also implement as a `RouteGuard` or similar, the micro frontend is unchanged and uses `[routerLink='']` or other functionality to navigate.

### Authenticate Luigi with Google Cloud Identity

#### Overview

This example shows you how to use Luigi with a Google account.

#### Steps

1. Register a project and generate an OAuth2 Web Client based on [Google Developers Identity - OAuth2UserAgent](https://developers.google.com/identity/protocols/OAuth2UserAgent).
2. To get your app running locally, set the Authorized JavaScript Origins URIs to `http://localhost:4200` and Authorized redirect URIs to `http://localhost:4200/luigi-core/auth/oauth2/callback.html?storageType=localStorage`.
3. Copy the Client ID which ends with `apps.googleusercontent.com`.
4. Update the LuigiConfig auth section. In this example, we have also provided a configuration for logout and getting user information:

```javascript
  {
    auth: {
      use: 'oAuth2ImplicitGrant',
      oAuth2ImplicitGrant: {
        authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        oAuthData: {
          response_type: 'id_token token',
          client_id: 'YOUR_CLIENT_ID...apps.googleusercontent.com',
          scope: 'openid https://www.googleapis.com/auth/userinfo.email profile',
        }
      },
      logoutFn: async (settings, authData, logoutCallback) => {
        console.log('revoking token');
        await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${authData.accessToken}`);
        logoutCallback('/logout.html');
      }
    }
  }
```

Google's `id_token` contains basic identity data like name and user ID, which allows for this data to be shown in the profile.
5. If you would also like to show the user picture, add the following code to enrich the user profile information:

```javascript
  userInfoFn: async (settings, authData) => {
    const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + authData.accessToken
      }
    });
    const json = await response.json();
    return json;
  },
```

### Use Feature Toggles in Luigi
There are two possibilities to add feature toggles to the active feature toggles list. On the one hand you can use the core api and on the other hand it is possible to add a feature toggle through url parameters.

#### Overview 
Luigi allows you to implement and configure feature toggles. They can be used to organize and compartmentalize your code. 

#### Usage
* To **set** feature toggles, you have two possibilities:
   1. Set feature toggles to the active feature toggle list through [Luigi Core API](luigi-core-api.md#featuretoggles):
  ```javascript
    Luigi.featureToggles().setFeatureToggle('ft1');
  ```
  2. Set feature toggles to the active feature toggle list via URL parameters:
  ```
  http://localhost:4200/projects/pr1?ft=ft1,ft2
  ```
* To **unset** feature toggles, you have to use the Core API:
  ```javascript
    Luigi.featureToggles().unsetFeatureToggle('ft1');
  ```
* To **restrict node visiblity with feature toggles**:
  You can define a list of feature toggles for a particular top or left navigation node. Then, you can use the [visibleForFeatureToggles](navigation-parameters-reference.md#visibleForFeatureToggles) parameter in order to display the node for certain feature toggles.
  For example, this node will be visible if `ft1` is added to the active feature toggle list:
  ```javascript
  {
      category: { label: 'Feature Toggle: Settings 2', icon: 'action-settings' },
      pathSegment: 'settings_ft',
      label: 'Project Settings 2',
      viewUrl: '/sampleapp.html#/projects/' + projectId + '/settings',
      icon: 'settings',
      visibleForFeatureToggles: ['ft1']
  }
  ```
  It is also possible to negate the visibility of a node by adding an exclamation mark at the beginning of the feature toggle name.
  In this example, the node is always visible except if `ft1` is set as an active feature toggle:
  ```javascript
  {
      category: { label: 'Feature Toggle: Settings 2', icon: 'action-settings' },
      pathSegment: 'settings_ft',
      label: 'Project Settings 2',
      viewUrl: '/sampleapp.html#/projects/' + projectId + '/settings',
      icon: 'settings',
      visibleForFeatureToggles: ['!ft1']
  }
  ```
* To **use feature toggles in a micro frontend**:
  It is possible to restrict content in a micro frontend using feature toggles. The active feature toggle list is available in the Luigi [Client API](luigi-client-api.md#getActiveFeatureToggles).
  ```javascript
    if (LuigiClient.getActiveFeatureToggles().includes('ft1')) {
      //display content
    }
  ``` 


### Use Intent-Based Navigation in Luigi Client

#### Overview 
Luigi Client allows you to navigate through micro frontends by using an intent-based navigation. This type of navigation decouples navigation triggers from the actual navigation targets. Rather than directly encoding the name of the target app into the URL fragment, app developers provide a navigation intent such as `display` or `edit` as shown in the examples below.

#### Usage
* To **enable** intent-based navigation, you need to first identify the necessary target mappings. This can be done by defining `intentMapping` in the Luigi configuration under `navigation` as in the example below:
  ```javascript
  intentMapping = [
    {
      semanticObject: 'Sales',
      action: 'display',
      pathSegment: '/projects/sap/munich/database/sales/display'
    },
    {
      semanticObject: 'Sales',
      action: 'edit',
      pathSegment: '/projects/sap/munich/database/sales/edit'
    }
  ];
  ```
  1. The intent link is built using the `semanticObject`, `action` and optional parameters in the following format:
  `#?intent=semanticObject-action?params`. 
  An example of an intent link would be as follows:
  ```javascript
    #?intent=Sales-edit?id=100
  ```
  2. Navigation to a micro frontend through this intent is then made possible by using the [linkManager navigate method](luigi-client-api.md#navigate) from Luigi Client API:
  ```javascript
    LuigiClient.linkManager().navigate('#?intent=Sales-edit?id=100');
  ```

  3. This method would then be navigating to the translated real path segment:
  ```javascript
    https://example.com/projects/sap/munich/database/sales/edit?~id=100;
  ```

  4. Alternatively, the intent link can also be accessed through the browser URL and accessed from outside:
  ```javascript
    https://example.com/#?intent=Sales-edit?id=100;
  ```



### Write a Luigi Core interface from scratch

#### Overview

An introduction on how to create a Luigi Core based interface from scratch by disabling all built-in graphical interfaces.
You might want to have a look at our [example using React and Material-UI](https://github.com/SAP/luigi/tree/master/core/examples/luigi-core-material-ui), which is based on this guide.

In general, it consists of:

- Reading configuration data with [`Luigi.getConfigValue('navigation.profile')`](luigi-core-api.md#getconfigvalue) or [`Luigi.getConfigValueAsync('navigation.profile.items')`](luigi-core-api.md#getconfigvalueasync)
- Listening to events like [`Luigi.navigation().addEventListener('topNav', (data) => {})`](luigi-core-api.md#addeventlistener)
- Using this data to build and update navigation trees

Be aware this is only a MVP with navigation and a simple profile, and only a limited amount of events are currently available publicly from Core. Please get in touch with us on [Slack](slack.luigi-project.io) if you want to build a Core app from scratch. We are happy to get to know what you are creating and support you with exposing required events.

#### Implementation Steps

- Create a base application which will be used for building the interface. It should not contain any routers, since the routing will be handled by Luigi. In this example we have specified a layout which consists of top and left navigation.

- Inject `@luigi-project/core` to the `index.html` or the application itself, to be able to use `window.Luigi` later. See our [example index.html:32](https://github.com/SAP/luigi/tree/master/core/examples/luigi-core-material-ui/public/index.html#L32). Additionally, add a container which will be used to render Luigi iframes; it should not interfere with our application: [`<div luigi-app-root></div>`](https://github.com/SAP/luigi/tree/master/core/examples/luigi-core-material-ui/public/index.html#L38). 

- Create a Luigi configuration. We have used webpack to compile the configuration which can be found in `src/luigi-config/`. It gets built by running `npm run config`.

- Add CSS styling to position the view container of Luigi.
Specify the left navigation width and position, and style the view container. We additionally add a `.spinnerContainer`, which is the view loading indicator backdrop:
```css
:root {
  --luigi__left-sidenav--width: 256px;
}
.iframeContainer,
.spinnerContainer {
  position: absolute;
  top: $topNavHeight;
  left: var(--luigi__left-sidenav--width);
  bottom: 0;
  right: 0;
  width: auto;
  min-width: auto;
  min-height: auto;
  display: block;
}
.iframeContainer {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.iframeContainer iframe {
  border: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-bottom: -5px;
}
.spinnerContainer {
  background: rgba(243, 244, 245, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}
```
If you intend to use [tab navigation](navigation-advanced.md#tab-navigation), it also makes sense to specify the new top view container positioning `.iframeContainerTabNav`:
```css
.iframeContainerTabNav {
  top: calc(#{$topNavHeight} + #{$topNavHeightTab}); // header navigation height PLUS tab navigation height
}
```
In case you are missing more styles and want to have a look at our Luigi code base, take a look at [App.html:1380](https://github.com/SAP/luigi/blob/master/core/src/App.html#L1380)

- Retrieving Luigi events for navigation updates: 
Each Luigi router update triggers a rebuild of the navigation elements, which you can receive through `Luigi.navigation().addEventListener('topNav')` or its complementary values `leftNav`, `tabNav`, also further events like `routeChanged` or `userInfo` can be received. Show the full list of [navigation events](luigi-core-api.md#addeventlistener).

Example: 
```javascript
const id = Luigi.navigation().addEventListener('topNav', data => setTopNavData(data));
window.onbeforeunload = () => Luigi.navigation().removeEventListener(id); // apply also on component destroy
```


- Build your navigation based on the data received through the events.
Based on the `data` received above, use `data.topNavData` to build the navigation items, apply category logic, or anything else you want to implement. To utilize navigation, use a function that handles navigation clicks. See our [Header.js:38 and :66](https://github.com/SAP/luigi/tree/master/core/examples/luigi-core-material-ui/src/components/Header.js#L38)

  - Example:
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

- Build a Profile navigation.
In our example, we have the static profile in [luigi-config/navigation.js:67](https://github.com/SAP/luigi/tree/master/core/examples/luigi-core-material-ui/src/luigi-config/navigation.js:67) and use the name, email and picture received from the event listener above in combination with `Luigi.getConfigValue('navigation.profile')` to build the [ProfileMenu.js:54-130](https://github.com/SAP/luigi/tree/master/core/examples/luigi-core-material-ui/src/components/ProfileMenu.js#L54).
`Luigi.navigation().addEventListener('userInfo')` receives an object and gets triggered either through authentication or a static profile using [staticUserInfoFn](navigation-parameters-reference.md#staticuserinfofn).

<!-- accordion:end -->
