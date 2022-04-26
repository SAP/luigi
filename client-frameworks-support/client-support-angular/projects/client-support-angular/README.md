# ClientSupportAngular

This library provides several features to run your Angular application inside the Luigi micro frontend framework.  
If you want to know more about Luigi, please have a look at the [Luigi homepage](https://luigi-project.io/).

## How to use the library
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

## Features
These are the main features provided by the library:
* [LuigiContextService](#LuigiContextService)
* [LuigiAutoRoutingService](#LuigiAutoRoutingService) 

### LuigiContextService
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
    
### LuigiAutoRoutingService
This service cannot be used directly, but it will provide useful features on how to synchronize your angular application with Luigi navigation.  
It can happen that in your microfrontend, user can navigate through different components/pages.  
With this feature we provide an easy way of synchronizing angular route with Luigi navigation; in angular route configuration, you can now add in data these attributes:

 ```javascript
{path: 'luigi-client-support-preload',component: Sample1Component,data: { fromVirtualTreeRoot: true }}
{path: 'luigi-client-support-preload',component: Sample2Component,data: { luigiRoute: '/home/sample2' }}
 ```

with `data: { fromVirtualTreeRoot: true }`, once we load Sample1Component, we will call Luigi Client:
 ```javascript
  luigiClient.linkManager().fromVirtualTreeRoot().withoutSync().navigate({route url});
 ```
with `data: { luigiRoute: '/home/sample2' }`, uses luigiClient API in this way:
 ```javascript
  luigiClient.linkManager().withoutSync().navigate(data.luigiRoute);
 ```
More information about linkManager can be found [here](https://docs.luigi-project.io/docs/luigi-client-api/?section=linkmanager).


## LuigiRouteStrategy
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

We also provide an example of how to extend **LuigiRouteStrategy** in class **LuigiReuseRouteStrategy**.  
In this class, we added the possibility to "reuse" a component and not initialize it every time you load it (it could be useful to keep component state.)  

**LuigiReuseRouteStrategy** can be configured in the following way:
 ```javascript
{path: 'luigi-client-support-preload',component: Sample1Component,data: { reuse: true }}
 ```

If you want to use **LuigiReuseRouteStrategy** (it is not enabled by default), you need to configure in your application:
 ```javascript
 {
      provide: RouteReuseStrategy,
      useClass: LuigiReuseRouteStrategy
 }
 ```

### AutoRouting for modals

Similarly to other components, modals which have a [modalPathParam](https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=modalpathparam) can trigger a change in the URL when navigation occurs. In the Angular router of your Luigi app, you can enable auto-routing for modals using these parameters: 
- `updateModalDataPath` - if set to `true`, the URL will be updated automatically every time the user navigates within a modal. 
- `addHistoryEntry` - if set to `true`, changes in the modal will also add a history element in the history of the tab.

For example: 
```javascript
{
    path: 'luigi-client-support-preload',
    component: LuigiPreloadComponent,
    data: { updateModalPathParam: true, addHistoryEntry: true }
  }
```
