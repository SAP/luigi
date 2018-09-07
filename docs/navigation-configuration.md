# Navigation Configuration

Navigation parameters allow you to specify routing configuration, set the appearance of navigation, and define navigation structure. 

## A basic example

When navigating between Nodes that are located on the same domain, Luigi triggers a hash or path change. Then, it sends an updated context in order not to fully reload the view. This is to the advantage of a single-page application based micro front-end. Navigation between domains triggers a full page load in order to comply with cross domain security concepts.

These are the elements of the Luigi navigation:

- A top navigation
- A side navigation
- A main content window

The image shows where you can use various methods and parameters to fill the navigation or display a micro front-end.  

![Navigation layout](assets/navigation-structure.png)

This code sample demonstrates your options when configuring navigation for Luigi. 

````
window.Luigi.setConfig({
  routing: {
    // uses hash based navigation if set to true
    useHashRouting: true,
    nodeParamPrefix: '~'
  },
  // navigation structure and settings
  navigation: {
    nodes: [
        // STATIC navigation Node
      {
        pathSegment: 'settings',
        label: 'Settings',
        viewUrl: 'https://admin.mydomain.com/settings',
        // optional
        children: [node, node, node],
        hideFromNav: false,
        isolateView: false,
      },
        // DYNAMIC navigation Node
      {
        navigationContext: 'contextName',
        pathSegment: project.id,
        context: {
          currentProject: project.id
        }
        children: [node, node, node]
      }
    ]
  }
});
````
### Routing

- **useHashRouting** defines either hash-based (`url.com/#/yourpath`) or path-based (`url.com/yourpath`) routing.
- **nodeParamPrefix** sets the prefix character when using the `LuigiClient.linkManager().withParam()` function, which provides a way to simply attach query parameters to the view URL for activities such as sorting and filtering.  The URL contains the parameters to allow deep linking. If you want to use a different character prefix, define yours here. The default character is `~`.

### Navigation parameters

- **pathSegment** specifies the partial URL of the current segment. A static settings example reflects `luigidomain.test/settings`, while a dynamic one loads on any other value.
- **label** contains the display name of the navigation Node.
- **hideFromNav** shows or hides a navigation Node. You can still navigate to the Node but it will not show up in the top or left pane.
- **viewUrl** contains the URL or path to a view that renders when entering the navigation Node. Use either a full URL or a relative path. This value may consist of variables if you have specified a **navigationContext** with a dynamic **pathSegment**.
- **navigationContext** contains a named Node that is mainly for use in combination with a dynamic **pathSegment** to start navigation from a dynamic Node using ` LuigiClient.navigationManager().fromContext('contextname')`.
- **context** sends the specified object as context to the view. Use this parameter in combination with the dynamic **pathSegment** to receive the context through the context listeners of **Luigi client**. This is an alternative to using the dynamic value in the **viewUrl**.
- **isolateView** renders the view in a new frame when you enter and leave the Node. This setting overrides the same-domain frame re-usage. The **isolateView** is disabled by default.

### A dynamic viewURL

In this example, the web application is accessible at a URL such as `https://Luigi.corp/something/sample_1/products`. The micro front-end loads using a second URL such as `https://admin.my.test/project/sample_1/products?sort=asc`.

The view loads with these dynamic URL parameters:

- `project.id = sample_1`
- `sort = asc`

````
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
        children: [
          // DYNAMIC navigation Node
          {
            navigationContext: 'project',
            pathSegment: project.id,
            viewUrl: 'https://admin.my.test/project/' + project.id,
            context: {
              currentProject: project.id
            },
            children: [
              {
                pathSegment: 'products',
                label: 'Products',
                viewUrl: 'https://admin.my.test/project/' + project.id + '/products'
              }
            ]
          }
        ]
      }
    ]
  }
});
````
If you start navigating form within a **navigationContext**'s child, navigate to the specific product route with **Luigi client**.

````
LuigiClient.linkManager().fromContext('project').withParam({sort: 'asc'}).navigate('/products');
````

You can also navigate directly from any other Node:

````
LuigiClient.linkManager().withParam({sort: 'asc'}).navigate('/something/sample_1/products');
````
