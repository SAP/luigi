<!-- meta
{
  "node": {
    "label": "Expert scenarios",
    "category": {
      "label": "Advanced",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 7,
      "position": 0
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

> **NOTE**: If your app is not using Angular, but SvelteKit for routing, read the instructions [here](#keep-luigi-core-url-in-synch-with-routing-from-sveltekit).

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

### Keep Luigi Core URL in sync with routing from SvelteKit

#### Overview

This example shows the steps to use Luigi with routing based on SvelteKit. It is also meant to show how to keep Luigi Core in sync with a Svelte micro frontend similarly to the [previous example for Angular](#use-a-spa-router-and-keep-luigi-core-url-in-sync).

#### Steps 

1. Create a SvelteKit app by following the steps [here](https://kit.svelte.dev/docs/introduction#getting-started).

2. Include the Luigi Client script somewhere in your app. In this example, include the CDN version in your `app.html`:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<script src="https://unpkg.com/@luigi-project/client/luigi-client.js"></script>
		%sveltekit.head%
	</head>
	<body>
		<div>%sveltekit.body%</div>
	</body>
</html>
```

3. Connect inbound and outbound routing channels in an always-present Svelte component in order to have two-way route sync. In this example, paste the following inside `__layout.svelte`: 

```html
<script>
	import Header from '$lib/header/Header.svelte';
	import '../app.css';

	import { onMount } from 'svelte';
	import  { goto, afterNavigate } from '$app/navigation';

	
	onMount(async () => {
		// react on Luigi-induced route changes
		window.addEventListener('popstate', () => {
			goto(window.location.href, { replaceState: true });
		});
	});

	afterNavigate(navigation => {
		// sync Luigi route after internal navigation
		if( navigation.to && navigation.from && navigation.to.href !== navigation.from.href ) {
			let luigiRoute = navigation.to.pathname;
			if(luigiRoute === '/') {
				luigiRoute += 'home';
			}
			LuigiClient.linkManager().withoutSync().fromParent().navigate(luigiRoute);
		}
	});
</script>
...
```

4. Now your micro frontend is configured and you can include it in your application. Below is an example configuration that you can test by going to [Luigi Fiddle](https://fiddle.luigi-project.io/) and clicking on "Modify Config". You need to replace `sveltekitMFEUrl` with the URL to your own micro frontend. 

```javascript
let sveltekitMFEUrl = 'http://127.0.0.1:5173/';

Luigi.setConfig({
    navigation: { 
            nodes: [{ 
                pathSegment: 'home', 
                label: 'h', 
                globalNav: true,
                hideFromNav: true, 
                children: [{ 
                    pathSegment: 'home', 
                    label: 'Home', 
                    icon: sveltekitMFEUrl + 'src/lib/header/svelte-logo.svg',
                    viewUrl: sveltekitMFEUrl,
                    viewGroup: 'svelte'
                },{ 
                    pathSegment: 'about', 
                    label: 'About', 
                    icon: sveltekitMFEUrl + 'src/lib/header/svelte-logo.svg',
                    viewUrl: sveltekitMFEUrl + 'about',
                    viewGroup: 'svelte'
                },{ 
                    pathSegment: 'todos', 
                    label: 'Todos', 
                    icon: sveltekitMFEUrl + 'src/lib/header/svelte-logo.svg',
                    viewUrl: sveltekitMFEUrl + 'todos',
                    viewGroup: 'svelte'
                }] 
            }]
        }, 
        
        routing: { 
            useHashRouting: true 
        }, 
        settings: { 
            responsiveNavigation: 'semiCollapsible',
            header: { 
                logo: 'img/luigi.png', 
                title: 'Svelte kit poc'
            }
        }
    });    
```

5. If you don't want to specify each subsequent navigation node in your application, you can use Luigi's [virtualTree](navigation-parameters-reference.md#virtualtree) feature.

### Authenticate Luigi with Google Cloud Identity

#### Overview

This example shows you how to use Luigi with a Google account.

#### Steps

1. Register a project and generate an OAuth2 Web Client based on [Google Developers Identity - OAuth2UserAgent](https://developers.google.com/identity/protocols/OAuth2UserAgent).
2. To get your app running locally, set the Authorized JavaScript Origins URIs to `http://localhost:[PORT]` (replace PORT by the port of your locally running luigi app, e.g. `4200` for Angular). Then, set Authorized redirect URIs to `http://localhost:[PORT]/luigi-core/auth/oauth2/callback.html?storageType=localStorage`.
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
There are two possibilities to add feature toggles to the active feature toggles list. On the one hand, you can use the Core API and on the other hand, it is possible to add a feature toggle through URL parameters.

#### Overview
Luigi allows you to implement and configure feature toggles. They can be used to organize and compartmentalize your code.

#### Usage
* Before using feature toggles, you first have to include the feature toggle query parameter in the [general settings](general-settings.md) part of your Luigi configuration file. This allows you to enable setting the feature toggles via URL :
  ```
  featureToggles = { queryStringParam: 'ft' };
  ```
* To **set** feature toggles, you have two possibilities:
   1. Set feature toggles to the active feature toggle list through [Luigi Core API](luigi-core-api.md#featuretoggles):
  ```javascript
    Luigi.featureToggles().setFeatureToggle('ft1');
  ```
  2. Set feature toggles to the active feature toggle list via URL parameters by appending a comma-separated list of strings. The parameter name is the predefined **featureToggles.queryStringParam** :
  ```
  http://localhost:4200/projects/pr1?ft=ft1,ft2
  ```

* To **unset** feature toggles, you have to use the Core API:
  ```javascript
    Luigi.featureToggles().unsetFeatureToggle('ft1');
  ```
* To **restrict node visiblity with feature toggles**:
  You can define a list of feature toggles for a particular top or left navigation node. For that you can use the [visibleForFeatureToggles](navigation-parameters-reference.md#visibleForFeatureToggles) parameter in order to display the node for certain feature toggles.
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
  If you define a list of multiple feature toggles, the node will be restricted and it will be shown only if **all** of the specified feature toggles are set.

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

### Defer Luigi Client Initialization

#### Overview

In some scenarios, the micro frontend application needs to decide when to finalize the Luigi Client initialization. By default, Luigi Client is initialized when you import the library in your micro frontend application.
However, it can be the case that a complex application takes too long to load all the modules. Since Luigi Client initialization is done automatically when it is imported, Luigi Core will assume that the micro frontend is fully loaded and ready for further actions when it is not.
This may lead to some problems, such as UI synchronization issues where the side menu highlights an item, but the micro-frontend application shows different content.

#### Usage

These are the steps you can use to defer Luigi Client initialization :

  1. In your micro frontend HTML that serves as entry file, you must add the `defer-luigi-init` attribute into the `<head>` element as follows:
  ```html
      <html>
        <head defer-luigi-init>
        ....
        </head>
        .....
      </html>
    ```
  2. Then, you can use the Luigi Client API inside your micro frontend:
  ```javascript
      LuigiClient.luigiClientInit();
  ```
 <!-- add-attribute:class:warning -->
> **NOTE**: This will only initialize Luigi Client if it hasn't already been initialized.

<!-- accordion:end -->
