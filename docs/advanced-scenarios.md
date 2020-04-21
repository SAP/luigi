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
                  .fromVirtualTreeRoot()
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

### Setup and use translation / internationalization (i18n)

#### Overview

This example shows you how to use Luigi with a centrally implemented translation dictionary.

Luigi Core provides a generic [API for I18N](luigi-core-api.md#luigii18n). We will write a custom translation provider that gathers translation strings from static files hosted either on Core or on micro-frontend side.

#### Steps

1. Create a custom translation function
2. Configure `settings.customTranslationImplementation`
3. Load translations before `Luigi.setConfig()`
4. Add locale change listener after Luigi initialization
5. Use translation as a node label

#### 1. Custom translation function

Create a internationalization provider that will expose the `getTranslation` method for `settings.customTranslationImplementation` configuration.

File `i18n-provider.js`:
```javascript
class I18nProvider {
  init() {
    // Could also be some ajax based implementation.
    this.translationTable = {
      "en": {
        "COMMON": {
          "SELECT_ENVIRONMENT": "Select EN Environment ..."
        },
        "LABEL1": 'Label EN',
        "ENVIRONMENT_NUM": "Environment {num} EN"
      },
      "de": {
        "COMMON": {
          "SELECT_ENVIRONMENT": "Select DE Environment ..."
        },
        "LABEL1": "Label DE",
        "ENVIRONMENT_NUM": "Environment {num} DE"
      },
    };
    return Promise.resolve();
  }

  afterInit() {
    this.currentLanguage = Luigi.i18n().getCurrentLocale();
    Luigi.i18n().addCurrentLocaleChangeListener((locale) => {
      this.currentLanguage = locale;
    });
  }

  // This function will be used by Luigi Core for translation
  getTranslation(key, interpolations = undefined, locale = undefined) {
    if (!key) return '';
    this.currentLanguage = locale || this.currentLanguage || Luigi.i18n().getCurrentLocale();
    const result = this.findTranslation(
      key,
      this.translationTable[this.currentLanguage],
      interpolations
    );
    return result ? result : key;
  }

  /**
   * @private
   * Finds the translated value based on given key.
   * @param {string} key key to be translated
   * @param {*} obj translation table
   */
  findTranslation(key, obj, interpolations) {
    let splitted = key.split('.');
    for (let i = 0; i < splitted.length; i++) {
      let key = splitted[i];
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
        obj = obj[key];
      } else {
        if (interpolations)
          return this.findInterpolations(obj[key], interpolations);
        return obj[key];
      }
    }
  }

  /**
   * @private
   * Replaces values that are defiend in translation strings
   * @param {string} key key to be translated
   * @param {*} interpolations translation table
   * @example
   * findInterpolations('Environment {num}', {num: 1})
   */
  findInterpolations(value, interpolations) {
    Object.keys(interpolations).forEach(item => {
      value = value.replace(
        new RegExp('{' + EscapingHelpers.escapeKeyForRegexp(item) + '}', 'gi'),
        interpolations[item]
      );
    });
    return value;
  }
}

export const i18nProvider = new I18nProvider();
```

#### 2. Configure `customTranslationImplementation`

Specify `settings.customTranslationImplementation`:

```javascript
import { i18nProvider } from './i18n-provider';
const coreConfig = {
  // ... partial setting ...
  settings: {
    customTranslationImplementation = i18nProvider
  }
}
```

#### 3. Load translations before `Luigi.setConfig()`

Since translations may come from external sources, loaded asynchronously, we should load them ahead, before `Luigi.setConfig` is triggered. Be aware that other Luigi Core API functionality is only available after initialization.

```javascript
import { i18nProvider } from './i18n-provider';
const coreConfig = { /* the whole configuration */ }

i18nProvider.init().then(() => {
  Luigi.setConfig(coreConfig);
})
```

#### 4. Add locale change listener after Luigi initialization

Specify `customTranslationImplementation`:

```javascript
import { i18nProvider } from './i18n-provider';
const coreConfig = {
  // ... partial setting ...
  lifecycleHooks: {
    luigiAfterInit: () => {
      i18nProvider.afterInit();
    }
  }
}
```

#### 5. Use translation as a node label

You can use the translation keys as `node.label`, on other labels in the configuration or programmatically.

```javascript
const coreConfig = {
  navigation: {
    nodes: [{
      label: 'MF1.LABEL1',
      pathSegment: 'overview',
      // ...
    }],
    contextSwitcher: {
      defaultLabel: 'COMMON.SELECT_ENVIRONMENT',
      options: () => [1,2,3,4,5].map(num => ({
        label: Luigi.i18n().getTranslation('ENVIRONMENT_NUM', {num}),
        pathValue: 'env' + num
      }))
    },
  }
}
```

#### Result

<!-- accordion:end -->
