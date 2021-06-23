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
* [LuigiRouteStrategy](#LuigiRouteStrategy)
* [LuigiMockModule](#LuigiMockModule) - an Angular module that listens to Luigi Client calls and messages and sends a mocked response back. See also [LuigiMockUtil](https://docs.luigi-project.io/docs/framework-support-libraries/?section=luigi-testing-utilities). 


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


### LuigiMockModule

In the normal Luigi workflow messages coming from Luigi Client to Luigi Core are processed on the Core and a proper response is sent back. However, in many systems where testing of micro frontends standalone is a necessity, the absence of Luigi Core to send back needed responses to Client micro frontends becomes a case of high coupling. To remove this coupling we introduce **LuigiMockModule** for **Angular** applications. This module is attached to the start of your application where it intercepts all the Client calls and sends a mocked Core response back. This enables users to test their micro frontends standalone without depending on the Core. 
To use **LuigiMockModule**, simply add it to the list of imports of your applications entry point. A good practice is to include it in the main testing module of your application as given in the example below:

 ```javascript
import {LuigiMockModule} from '@luigi-project/client-support-angular';

/**
 * This module is used to run the application for e2e tests.
 */
@NgModule({
  imports: [
    AppModule,
    LuigiMockModule,
  ],
  bootstrap: [AppComponent]
})
export class AppTestingModule {}

 ```

To make mocking of Luigi Core easier, you can use a range of utility functions and assertions. Our lightweight [Luigi Testing Utilities](https://docs.luigi-project.io/docs/framework-support-libraries/?section=luigi-testing-utilities) library provides the necessary basic utility functions needed for your application. 



## Luigi Testing Utilities

Luigi Testing Utilities is a set of auxiliary functions used to enhance the user experience while testing Luigi based micro frontends. The functions abstract away Luigi specific logic from the tester so that it is easier for them to mock and assert Luigi functionality. 

### LuigiMockUtil 
This class contains certain utility helper functions needed when writing [protractor](https://www.npmjs.com/package/protractor) based e2e tests. You can simply import this module into you project and then use an instance of it to test microfrontend functionality. 

### How to use the library

**Prerequisites:**
_In order to use this utility library you need to import LuigiMockModule into your Angular applications entry point. See more [here](https://docs.luigi-project.io/docs/framework-support-libraries/?section=luigicontextservice)_


1. Import the library in the `package.json`:
```javascript
npm install @luigi-project/testing-utilities -s
```

2. Once the library is imported and saved in your Angular project, you can now import the module `LuigiMockUtil` into your test:
```javascript
import { LuigiMockUtil } from "@luigi-project/testing-utilities";
```

#### Example

```javascript
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
}
```

#### Functions provided
- **mockContext**: Mocks the context by sending Luigi context messages with the desired mocked context as parameter. 
- **mockPathExists**: This method serves as a mock for the Luigi Client `pathExists()` function. It is used in e2e tests when component being tested utilizes a call to `LuigiClient.linkManager().pathExists()`
- **modalOpenedWithTitle**: Checks on the printed DOM Luigi message responses for a modal with given title being opened. In such a case, a message would be printed containing a `modal.title`. Returns `false` if such element was not found.
- **getMSG**: Returns list of messages, representing message elements added in the DOM for testing. 
- **parseLuigiMockedMessages**: Parses the elements added by LuigiMockModule into the DOM and assigns them to the local messages variable
