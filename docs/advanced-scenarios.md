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

This example shows you how to keep an existing routing strategy and use an existing micro frontend as drop-in without the need to refactor everything to `LuigiClient.linkManager()`. To update the Luigi Core URL when routing internally with the micro frontend router, without updating the URL on the Luigi Client side, use the `linkManager()` [withoutSync](luigi-client-api.md#withoutsync) method.

<!-- add-attribute:class:warning -->
> **NOTE**: This is a very simple example for navigation. Special cases like modals, split views and other functionalities still require the use of [Luigi Client](luigi-client-api.md).

#### Steps

1. Configure the Luigi navigation node:

<!-- add-attribute:class:success -->
> **NOTE**: To keep the example simple, we use [virtualTree](navigation-parameters-reference.md#virtualtree) to allow any nested navigation, but this is not mandatory. You can always specify the node tree yourself and still use automatic navigation with router events.

```javascript
    {
      pathSegment: 'Orders',
      label: 'orders',
      viewUrl: 'https://orders.microfrontend/',
      navigationContext: 'orders',
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
    import { linkManager } from '@kyma-project/luigi-client';

    @Injectable()
    export class LuigiAutoNavigationService implements OnDestroy {
      private subscriptions: Subscription = new Subscription();
      constructor(private router: Router) {}
      public init(): void {
        this.subscriptions.add(
          this.router.events
            .pipe(filter(ev => ev instanceof NavigationEnd))
            .subscribe((ev: NavigationEnd) => {
              if (ev instanceof NavigationEnd) {
                linkManager()
                  .fromClosestContext()
                  .withoutSync()
                  .navigate(ev.url);
              }
            })
        );
      }

      ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
      }
    }
```

#### Result

Other than the added service, which you can also implement as a `RouteGuard` or similar, the micro frontend is unchanged and uses `[routerLink='']` or other functionality to navigate.

### Authenticate Luigi with Google Cloud Identity

#### Overview

This example shows you how to use Luigi with a Google account.

#### Steps

1. Register a project and generate an OAuth2 Web Client based on [Google Developers Identity - OAuth2UserAgent](https://developers.google.com/identity/protocols/OAuth2UserAgent).
2. To get your app running locally, set the Authorized JavaScript Origins URIs to `http://localhost:4200` and Authorized redirect URIs to `http://localhost:4200/luigi-core/auth/oauth2/callback.html?storageType=localStorage`.
3. Copy the Client ID on the right side, ending with `apps.googleusercontent.com`
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
        logoutCallback();
        location.href = '/logout.html';
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

<!-- accordion:end -->
