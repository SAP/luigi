<!-- meta
{
  "node": {
    "label": "Framework support libraries",
    "category": {
      "label": "Luigi Client"
    },
    "metaData": {
      "categoryPosition": 3,
      "position": 2
    }
  }
}
meta -->

# Luigi Client framework support libraries

On this page, you can find more information about Luigi Client support libraries for web application frameworks.

## Angular support Library

The [ClientSupportAngular](https://github.com/SAP/luigi/tree/master/client-frameworks-support/client-support-angular/projects/client-support-angular) library provides several features to run your Angular application inside the Luigi micro frontend framework.


### How to use the library

1. Import the library in the `package.json`:
```javascript
npm install @luigi-project/client-support-angular -s
```

2. Once the library is imported and saved in your Angular project, you need to import the module `LuigiAngularSupportModule`:

```javascript
imports: [
  ........
  ,LuigiAngularSupportModule
],
```

### Features

These are the main features provided by the library:
* [LuigiContextService](#LuigiContextService)
* [LuigiAutoRoutingService](#LuigiAutoRoutingService)
* [Preload component](#preload-component-example) - an empty Angular component that can be used to build a preload route. See also [preloadUrl](https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=viewgroupsettings).


#### LuigiContextService

You can inject this service inside your Angular items in order to:
* Get the current (latest) Context that we received from Luigi Core
* Provide an Observable<Context> where through subscribing, you can get any Context change

**LuigiContextService** is an abstract class. Its implementation is in the **LuigiContextServiceImpl** class.
If you need to change or extend the implementation, you can easily create a new class extending **LuigiContextServiceImpl**:

In this class, we added the possibility to "reuse" a component and not initialize it every time you load it (it could be useful to keep component state.)

```javascript
export class YourContextService extends  LuigiContextServiceImpl {
    ....
}

```
Inside your module, redefine the provider:
 ```javascript
providers: [
    {
        provide: LuigiContextService,
        useClass: YourContextService
    }
]
 ```

#### LuigiAutoRoutingService

This service cannot be used directly, but it will provide useful features on how to synchronize your Angular application with Luigi navigation.
It can happen that in your micro frontend, user can navigate through different components/pages.
With this feature, we provide an easy way of synchronizing Angular route with Luigi navigation. In the Angular route configuration, you can now add in data these attributes:

#### Preload component example

 ```javascript
{path: 'luigi-client-support-preload',component: Sample1Component,data: { fromVirtualTreeRoot: true }}
{path: 'luigi-client-support-preload',component: Sample2Component,data: { luigiRoute: '/home/sample2' }}
{path: 'luigi-client-support-preload',component: Sample2Component,data: { luigiRoute: '/home/sample2', fromContext: true}}
{path: 'luigi-client-support-preload',component: Sample2Component,data: { luigiRoute: '/home/sample2', fromContext: 'localContext'}}
 ```

With `data: { fromVirtualTreeRoot: true }`, once we load Sample1Component, we will call Luigi Client:

 ```javascript
  luigiClient.linkManager().fromVirtualTreeRoot().withoutSync().navigate({route url});
 ```

With `data: { luigiRoute: '/home/sample2' }`, uses luigiClient API in this way:
 ```javascript
  luigiClient.linkManager().withoutSync().navigate(data.luigiRoute);
 ```

With `data: { luigiRoute: '/home/sample2', fromContext: true }`, uses luigiClient API in this way:
 ```javascript
  luigiClient.linkManager().fromClosestContext().withoutSync().navigate(data.luigiRoute);
 ```

With `data: { luigiRoute: '/home/sample2', fromContext: 'localContext' }`, uses luigiClient API in this way:
 ```javascript
  luigiClient.linkManager().fromContext('localContext').withoutSync().navigate(data.luigiRoute);
 ```

More information about linkManager can be found [here](https://docs.luigi-project.io/docs/luigi-client-api/?section=linkmanager).


### LuigiRouteStrategy

To use **LuigiAutoRoutingService**, this library defines a new **RouteReuseStrategy** named **LuigiRouteStrategy**.
If you need to define your own **RouteReuseStrategy**, you can extend **LuigiRouteStrategy** by overriding it in this way:

 ```javascript
export class YourRouteStrategy extends LuigiRouteStrategy {

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        super.retrieve(route);
        // Your code
    }

}
 ```
and define the provider:
 ```javascript
 {
      provide: RouteReuseStrategy,
      useClass: YourRouteStrategy
 }
 ```


## Luigi Testing Utilities

Luigi Testing Utilities is a set of auxiliary functions used to enhance the user experience while testing Luigi based microfrontends. The functions abstract away Luigi specific logic from the tester so that it is easier for them to test. 

### LuigiMockUtil 
This class contains certain utility helper functions needed especially in e2e-testing with [protractor](https://www.npmjs.com/package/protractor). You can simply import this module into you project and then use an instance of it to test microfrontend functionality. 

### How to use the library

1. Import the library in the `package.json`:
```javascript
npm install @luigi-project/testing-utilities -s
```

2. Once the library is imported and saved in your Angular project, you can now import the module `LuigiMockUtil` into your test:
```javascript
import { LuigiMockUtil } from "@luigi-project/testing-utilities";
```

#### Example

```
import { browser } from 'protractor'; // <-- target e2e testing library
import { LuigiMockUtil } from "@luigi-project/testing-utilities";

describe('Another test', () => {
  let luigiMockUtil: LuigiMockUtil;

  beforeAll(async () => {
    luigiMockUtil = new LuigiMockUtil(browser);
  });

  it('should load the page if correct luigi context provided', async () => {
    await luigiMockUtil.mockContext({
      someData: '1',
      someOtherData: 'randomInfo',
    });
  }
```

#### Functions provided
- _mockContext_: Mocks the context by sending luigi context messegaes with the desired mocked context as parameter. 
- _mockPathExists_: This method serves as a mock for the luigi client pathExists() function. It is used in e2e tests when component being tested utilizes a call to `LuigiClient.linkManager().pathExists()`
- _modalOpenedWithTitle_: Checks on the printed DOM Luigi message responses for a modal with given title having been opened. In such a case a message would be printed containing a modal.title. Returns false if not such element was found.
- _getMSG_: Return list of messages, representing message elements added in the DOM for testing. 
- _parseLuigiMockedMessages_: Parses the elements added by LuigiMockModule into the DOM and assigns them to the local messages variable