## Overview

Navigation parameters allow you to specify routing configuration, set the appearance of navigation, and define navigation structure. 

## A basic example

When navigating between nodes that are located on the same domain, Luigi triggers a hash or path change. Then, it sends an updated context in order not to fully reload the view. This is to the advantage of a single-page application based micro frontend. Navigation between domains triggers a full page load in order to comply with cross domain security concepts.

This image shows where the how the Luigi navigation is positioned.  There is 

- A top navigation
- A side navigation
- A main content window

The image shows where you can use various methods and parameters to fill the navigation or display a micro frontend.  

![Navigation layout](assets/navigation-structure.png)

This code sample demonstrates your options when configuring navigation for Luigi. 

````
window.Luigi.setConfig({
  routing: {
    // uses hash based navigation if set to true
    useHashRouting: true,
    nodeParamPrefix: '~'
  }
  // navigation structure and settings
  navigation: {
    nodes: [
        // STATIC navigation node
      {
        pathSegment: 'settings',
        label: 'Settings',
        viewUrl: 'https://admin.mydomain.com/settings',
        // optional
        children: [node, node, node],
        hideFromNav: false,
      },
        // DYNAMIC navigation node
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

- **useHashRouting** - Defines either hash-based or path-based routing. Hash-based routing uses the classic shebang. For example, `url.com/#/yourpath`. Path-based routing is uses the common path structure. For example, ` url.com/yourpath`. 
- **nodeParamPrefix** - The function `LuigiClient.linkManager().withParam()`, found in the Luigi client, provides a way to simply attach query parameters to the view URL for activities such as sorting and filtering.  The URL contains the parameters to allow deep linking. If you want to use a different character prefix, define yours here. The default character is `~`.

### Navigation parameters

- **pathSegment** - Specifies the partial URL of the current segment. A static settings example would reflect  luigidomain.test/settings, while a dynamic one would get loaded on any other value.
- **label** - Contains the display name of the navigation node.
- **hideFromNav** - Shows or hides a navigation node. You can still navigate to the node. But, it will not show up in the top or left pane.
- **viewUrl** - Contains the URL or path to a view that renders when entering the navigation node. Use either a full URL or a relative path. This value may consist of variables if you have specified a **navigationContext** with a dynamic **pathSegment**
- **navigationContext** - Contains a named node that is mainly for use in combination with a dynamic **pathSegment** to start navigation from a dynamic node using ` LuigiClient.navigationManager().fromContext('contextname')`.
- **context** - Sends the specified object as context to the view. Use this parameter in combination with the dynamic **pathSegment** to receive the context through the context listeners of **luigi client**. This is an alternative to using the dynamic value in the **viewUrl**.

### A dynamic viewURL

In this example, the web application is accessible at a URL such as `https://luigi.corp/something/sample_1/products`. The micro frontend loads using a second URL such as `https://admin.my.test/project/sample_1/products?sort=asc`.

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
          // DYNAMIC navigation node
          {
            navigationContext: 'project',
            pathSegment: project.id,
            viewUrl: 'https://admin.my.test/project/' + project.id,
            context: {
              currentProject: project.id
            }
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
If you start navigating form within a navigationContext's child, navigate to the specific product route with **luigi client**.

````
LuigiClient.linkManager().fromContext('project').withParam({sort: 'asc'}).navigate('/products');
````

Or to navigate directly from any other node:

````
LuigiClient.linkManager().withParam({sort: 'asc'}).navigate('/something/sample_1/products');
````
