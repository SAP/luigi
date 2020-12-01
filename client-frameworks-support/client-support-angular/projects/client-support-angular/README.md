# ClientSupportAngular

This library provides several features to run your Angular application inside the Luigi micro frontend framework.  
If you want to know more about Luigi, please have a look at the [Luigi homepage](https://luigi-project.io/).

## How to use the library
1. Import the library in the `package.json`:
```javascript
npm install @luigi-project/fundamental-ngx-sample-apps-master -s
```

2. Once the library is imported and saved in your Angular project, you need to import the module `LuigiAngularSupportModule`:

```javascript
imports: [
  ........
  ,LuigiAngularSupportModule
],
```

## Features
Here the main features provided by the libraries:
* LuigiContextService
* LuigiAutoRoutingService

### LuigiContextService
You can inject this service inside your Angular items in order to:
* Get the current Context (latest) that received from Luigi Core
* Provide an Observable<Context> where through subscribing, you can get any Context change     
    
LuigiContextService is an abstract class, its implementation is in LuigiContextServiceImpl class.  
If you need to change/extend the implementation, you can easily create a new class via extending LuigiContextServiceImpl:

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
This service cannot be referenced directly, but it will provide useful features for synchronizing your Angular application with Luigi navigation.

If the user navigates to different components or pages inside the micro frontend, this feature allows you to detect it and synchronize the Angular route with your Luigi navigation. In the Angular route configuration, you can now add these attributes to the data:

 ```javascript
{path: 'luigi-client-support-preload',component: Sample1Component,data: { fromVirtualTreeRoot: true }}
{path: 'luigi-client-support-preload',component: Sample2Component,data: { luigiRoute: '/home/sample2' }}
 ```

With `data: { fromVirtualTreeRoot: true }`, once we load `Sample1Component`, we will call Luigi Client:
 ```javascript
  luigiClient.linkManager().fromVirtualTreeRoot().withoutSync().navigate({route url});
 ```
With `data: { luigiRoute: '/home/sample2'' }`, the Luigi Client API is used in this way:
 ```javascript
  luigiClient.linkManager().withoutSync().navigate(data.luigiRoute);
 ```
More information about linkManager can be found [here](https://docs.luigi-project.io/docs/luigi-client-api/?section=linkmanager).


## LuigiRouteStrategy
To use [LuigiAutoRoutingService](#LuigiAutoRoutingService), this library defines a new RouteReuseStrategy named **LuigiRouteStrategy**.  
If you need to define your own RouteReuseStrategy, you can extend LuigiRouteStrategy by overriding it next way:

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

We also provide an example of how to extend LuigiRouteStrategy in class LuigiReuseRouteStrategy.  
In this class, we added the possibility to "reuse" a component without re-initializing it on load every time (it could be useful to keep the component state.)  

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




 
 
