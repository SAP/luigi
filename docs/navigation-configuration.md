# Navigation Configuration

Navigation parameters allow you to specify routing configuration, set the appearance of navigation, and define navigation structure.

## A basic example

When navigating between nodes that are located on the same domain, Luigi triggers a hash or path change. Then, it sends an updated context in order not to fully reload the view. This is to the advantage of a single-page application based micro front-end. Navigation between domains triggers a full page load in order to comply with cross domain security concepts.

These are the elements of the Luigi navigation:

- A top navigation
- A side navigation
- A main content window

The image shows where you can use various methods and parameters to fill the navigation or display a micro front-end.

![Navigation layout](assets/navigation-structure.png)

This code sample demonstrates your options when configuring navigation for Luigi.

```
window.Luigi.setConfig({
  routing: {
    // uses hash-based navigation if set to true
    useHashRouting: true,
    nodeParamPrefix: '~'
  },
  // navigation structure and settings
  navigation: {
    nodeAccessibilityResolver: function (nodeToCheckPermissionFor, parentNode, currentContext) {}
    nodes: [
        // STATIC navigation node
      {
        pathSegment: 'settings',
        label: 'Settings',
        viewUrl: 'https://admin.mydomain.com/settings',
        // optional
        children: [node, node, node],
        hideFromNav: false,
        isolateView: false,
      },
        // DYNAMIC navigation node
      {
        navigationContext: 'contextName',
        pathSegment: ':projectId',
        viewUrl: '/some/path/:projectId',
        context: {
          projectId: ':projectId'
        },
        children: [node, node, node]
      }
    ]
  }
});
```

### Routing

You can configure the way Luigi tackles routing in your application in the **Routing** section of the configuration file. In the example, you can choose the routing strategy to apply in your application as either hash or path location routing.

- **useHashRouting** defines either hash-based (`url.com/#/yourpath`) or path-based (`url.com/yourpath`) routing. Set it to `true` if you prefer to use the hash location routing. Otherwise path location routing is the default strategy.
- **nodeParamPrefix** sets the prefix character when using the `LuigiClient.linkManager().withParam()` function, which provides a way to simply attach query parameters to the view URL for activities such as sorting and filtering. The URL contains the parameters to allow deep linking. If you want to use a different character prefix, define yours here. The default character is `~`.

### Navigation parameters

- **nodeAccessibilityResolver** allows you to define a permission checker function that gets executed on every node. If it returns `false`, Luigi removes the node and its children from the navigation structure.
  **nodeAccessibilityResolver** receives all values defined in the node configuration. See [angular sampleconfig.js](../core/examples/luigi-sample-angular/src/assets/extendedConfiguration.js) for the **constraints** example.

## Nodes

- **pathSegment** specifies the partial URL of the current segment. A static settings example reflects `luigidomain.test/settings`, while a dynamic one, prefixed with a colon, loads on any other value. **pathSegments** must not contain slashes.
- **externalLink** is an object which specifies that the node links to an external URL. If this property is set, **pathSegment** is ignored. It consists of the following properties:
  - **sameWindow** defines if the external URL is opened in a new or current tab.
  - **url** is the external URL that the node leads to.

* **label** contains the display name of the navigation node.
* **hideFromNav** shows or hides a navigation node. You can still navigate to the node but it will not show up in the top or left pane.
* **viewUrl** contains the URL or path to a view that renders when you enter the navigation node. Use either a full URL or a relative path. This value may consist of variables if you have specified a **navigationContext** with a dynamic **pathSegment**. If **viewUrl** is undefined, Luigi activates the child node specified in **defaultChildNode**. When both **viewUrl** and **defaultChildNode** are undefined, Luigi opens the first child of the current node.
* **navigationContext** contains a named node that is mainly for use in combination with a dynamic **pathSegment** to start navigation from a dynamic node using `LuigiClient.navigationManager().fromContext('contextname')`.
* **context** sends the specified object as context to the view. Use this parameter in combination with the dynamic **pathSegment** to receive the context through the context listeners of **Luigi client**. This is an alternative to the dynamic value in the **viewUrl**.
* **defaultChildNode** sets the child node that Luigi activates automatically if the current node has no **viewUrl** defined. Provide **pathSegment** of the child node you want to activate as a string.
* **isolateView** renders the view in a new frame when you enter and leave the node. This setting overrides the same-domain frame re-usage. The **isolateView** is disabled by default.

### A dynamic viewURL

In this example, the web application is accessible at a URL such as `https://Luigi.corp/something/sample_1/products`. The micro front-end loads using a second URL such as `https://admin.my.test/project/sample_1/products?sort=asc`.

The view loads with these dynamic URL parameters:

- `:projectId = sample_1`
- `sort = asc`

```
Luigi.setConfig({
  routing: {
    nodeParamPrefix: '~'
  },
  navigation: {
    nodes: [
      {
        pathSegment: 'something',
        label: 'Something',
        viewUrl: 'https://admin.my.test/project',
        children: [{
          navigationContext: 'project',
          pathSegment: ':projectId',
          viewUrl: 'https://admin.my.test/project/:projectId',
          // Optional, you can always call LuigiClient.getPathParams() to get the parameters
          // context: {
          //  currentProject: ':projectId'
          // },
          children: [
            {
              pathSegment: 'products',
              label: 'Products',
              viewUrl: 'https://admin.my.test/project/:projectId/products'
            }
          ]
        }
      }
    ]
  }
});
```

If you start navigating form within a **navigationContext**'s child, navigate to the specific product route with **Luigi client**.

```
LuigiClient.linkManager().fromContext('project').withParam({sort: 'asc'}).navigate('sample_1/products');
```

You can also navigate directly from any other node:

```
LuigiClient.linkManager().withParam({sort: 'asc'}).navigate('/something/sample_1/products');
```
