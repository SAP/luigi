# Luigi Client UI5 Support Library
​
The Luigi Client UI5 Support Library offers a set [features](#features) which make it easier to use the [Luigi micro frontend framework](https://luigi-project.io/) with UI5 applications. 
​
## How to use the library 
​
1. Import the library in your `package.json` file:
```javascript
npm install @luigi-project/client-support-ui5
```

2. Use [ui5 tooling](https://sap.github.io/ui5-tooling/stable/) to consume the ui5-support-lib in your ui5 application.
​
3. Once the library is imported and saved in your UI5 application, you need to add `ComponentSupport` to the `index.html` as well as to allow the `data-sap-ui-frameOptions`.
```javascript
<script id="sap-ui-bootstrap" src="resources/sap-ui-core.js" data-sap-ui-resourceroots='{
				"luigi.ui5-demoapp": "./"
			}' data-sap-ui-oninit="module:sap/ui/core/ComponentSupport" data-sap-ui-compatVersion="edge"
		data-sap-ui-async="true" data-sap-ui-frameOptions="allow" data-sap-ui-theme="sap_horizon"
		data-sap-ui-xx-waitForTheme="true" data-sap-ui-xx-supportedLanguages="en,de">
		</script>
```

4. In the last step you need to register the library in your `Component.js` file:
```javascript
sap.ui.define([
	"sap/ui/core/UIComponent",
    ....
	"@luigi-project/client-support-ui5/ui5-support-lib",
], function (UIComponent,...., Ui5SupportLib) {
    return UIComponent.extend("com.sap.luigiclient.Component", {
		....
		init: function () {
			.....			
			// connect client-support-ui5 lib to the application
			Ui5SupportLib.connectTo(this);
            
            this.LuigiClient = Ui5SupportLib.LuigiClient;
​
			this.getRouter().initialize();
		},
```
In addition, the LuigiClient API is available through the ui5 support lib. LuigiClient can be used in a controller like 
```javascript
this.getOwnerComponent().LuigiClient.uxManager().showAlert(settings).then(() => {
          // Logic to execute when the alert is dismissed
        });
```
​
## Features
​
The main features offered by the Luigi Client UI5 support library are:
- [Context](#context) - allows you to receive a context object from Luigi
- [Auto routing](#auto-routing) - provides an easier way to keep your UI5 app and Luigi routing in sync
- [Auto routing for modals](#auto-routing-for-modals) - enables synchronization of routing between Luigi Core and a modal
- [Preload](#preload) - special view that can help you when using Luigi's [viewGroups](https://docs.luigi-project.io/docs/navigation-advanced?section=view-groups) feature
​
### Context
​
The current (latest) context object that the UI5 application receives from Luigi Core is available on the UI5 model.
​
The context object is accessible in the controller by calling:
```javascript
this.getView().getModel('$luigiCtx').getData()
```
​
In a view file, it can be used like this:
```javascript
<Button
    text="{$luigiCtx>/<CONTEXT_PROPERTY_KEY>}"/>
```
​
### Auto routing
​
With the auto routing feature, we provide an easy way of synchronizing UI5 application routes with Luigi navigation. In the `routes` definition of the manifest file, you can add these attributes in the `data` object:
​
```javascript
{
    "pattern": "",
    "name": "products",
    "target": "products",
    "data": {
        "luigiRoute": "/app1/products"
    }
},
{
    "pattern": "settings/userSettings/developer",
    "name": "developer",
    "target": "developer",
    "data": {
        "fromContext": "usersettings",
        "luigiRoute": "developer"
    }
},
{
    "pattern": "settings",
    "name": "settings",
    "target": "settings",
    "data": {
        "fromVirtualTreeRoot": true
    }
},
{
    "pattern": "products/{productId}/sites/{siteId}",
    "name": "site",
    "target": "site",
    "data": {
        "fromVirtualTreeRoot": {
            "truncate": "*/sites"
        }
    }
}
```
​
If data `"data": {"luigiRoute": "/app1/products"}` is defined on a route, Luigi Client will be called with:
```javascript
    luigiClient.linkManager().withoutSync().navigate(data.luigiRoute);
```
with `data: { fromVirtualTreeRoot: true }`, Luigi Client API will be called in this way:
```javascript
    luigiClient.linkManager().fromVirtualTreeRoot().withoutSync().navigate({route url});
```
Additionally, it is possible to truncate the URL. Everything before and including the specified value is truncated from the URL.
For example, all but `/{sitesId}` are removed from the URL with the above configuration.
​
More information about Luigi's linkManager can be found [here](https://docs.luigi-project.io/docs/luigi-client-api/?section=linkmanager).
​
​
​
### Auto routing for modals
​
Similarly to other views, modals which have a [modalPathParam](https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=modalpathparam) which can trigger a change in the URL when navigation occurs. In the UI5 router of your Luigi app, you can enable auto-routing for modals using these parameters: 
- `updateModalDataPath` - if set to `true`, the URL will be updated automatically every time the user navigates within a modal. 
- `addHistoryEntry` - if set to `true`, changes in the modal will also add a history element in the history of the tab.
​
For example: 
```javascript
{
    "pattern": "products/{productId}",
    "name": "product",
    "target": "product",
    "data": {
        "updateModalDataPath": true,
        "addHistoryEntry": true,
        "luigiRoute":'/products/:productId'
    }
}
```
​
### Preload
​
If you are using [view groups](https://docs.luigi-project.io/docs/navigation-advanced/?section=viewgroupsettings) in your Luigi configuration, this library provides a view which you can use as a Luigi `preloadUrl` attribute in your configuration.
The route to this view is `https://your.domain.name/__luigi_preload_view__`