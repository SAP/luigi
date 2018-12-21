# Navigation configuration

Navigation parameters allow you to specify routing configuration, set the appearance of navigation, and define navigation structure.

## Navigation elements

The image shows the elements of Luigi navigation: 

1. Top navigation, where the main navigation path is displayed.
2. Side navigation, where the applications are defined.
3. Main content window, where the micro front-end is rendered.
 

![Navigation layout](assets/navigation-structure.png)


## Navigation structure

The navigation structure is a recursive tree-like data structure that defines all possible navigation paths within the application.

A navigation path is any existing path in the navigation tree. It connects the following elements together:

- The path of the main application, that is, the path in the browser URL. The path is defined in a Luigi navigation node through one of the following parameters, listed in order of precedence: **externalLink**, **link**, and **pathSegment**.
- The **viewUrl** of a micro front-end rendered in the content area of the main application.
- If you set **hideSideNav** property to `true`, the left navigation becomes hidden when you click the affected node. It is set to `false` by default.

A sample navigation structure looks as follows:

````
{
  navigation: {
    nodes: [
      {
        pathSegment: 'home',
        label: 'Home',
        viewUrl: 'https://my.microfrontend.com/',
        children: [
          {
            link: '/home',
            label: 'Go back home'
          },
          {
            link: 'projects/pr2/settings',
            label: 'Go to Project 2 Settings'
          },
          {
            pathSegment: 'settings',
            label: 'Settings',
            viewUrl: 'https://my.microfrontend.com/general/settings.html'
          },
          {
            pathSegment: 'projects',
            label: 'Projects',
            viewGroup: 'projectsGroup',
            viewUrl: 'https://my.microfrontend.com/projects/list.html',
            children: [
              {
                pathSegment: 'pr1',
                label: 'Project one',
                viewUrl: 'https://my.microfrontend.com/projects/details.html#id=pr1',
                hideSideNav: true
              },
              {
                pathSegment: 'pr2',
                label: 'Project two',
                viewUrl: 'https://my.microfrontend.com/projects/details.html#id=pr2'
              }
            ]
          }
        ]
      }
    ]
  }
}
````
### Node navigation

When you navigate between nodes that are located in the same domain, Luigi triggers a hash or path change. Then it sends the updated context in order not to fully reload the view for a single-page application based micro front-end. Navigation between domains triggers a full page load in order to comply with cross-domain security concepts.

If you start navigating from a child node level, navigate to the specific product route using [Luigi Client API](luigi-client-api.md) as shown in the example:

````
LuigiClient.linkManager().fromContext('project').withParam({sort: 'asc'}).navigate('/products');
````

You can also navigate directly from any other node:

````
LuigiClient.linkManager().withParam({sort: 'asc'}).navigate('/something/sample_1/products');
````

### Application path

The main application path is built from **pathSegment** values in the navigation path, joined with the **/** character. This can be overriden by using either **externalLink** or **link** values.

The micro front-end view URL is the value of the **viewUrl** property of the last node in the navigation path.

The following example shows the structure of different navigation paths. If the URL of the main application is `https://luigiexample.com`, then:

- `https://luigiexample.com/home/projects/pr1` reflects the `home/projects/pr1` navigation path. It is a valid navigation path as it exists in the defined navigation tree structure. The micro front-end view URL rendered in the content area is `https://my.microfrontend.com/projects/details.html#id=pr1`.

- `https://luigiexample.com/home/maskopatol` defines an invalid `home/maskopatol` navigation path.

- `https://luigiexample.com/projects/pr1` defines the `projects/pr1` navigation path. It is not a valid navigation path, since a valid navigation path always starts from the root.


### Path parameters

Use path parameter values to define the **pathSegment** in your configuration. You can either use a static value for your **pathSegment**, or add a colon to this value as in `:projectId`, to make it act as a parameter. This tells Luigi to accept any value for this **pathSegment** of the main application URL. The value replaces the parameter when it is further processed by the application.

A sample structure with a parametrized **pathSegment** is as follows:
```
{
  navigation: {
    nodes: [
      {
        pathSegment: 'home',
        label: 'Home',
        viewUrl: 'https://my.microfrontend.com/',
        children: [
          {
            pathSegment: 'projects',
            label: 'Projects',
            viewUrl: 'https://my.microfrontend.com/projects/list.html',
            children: [
              {
                pathSegment: ':projectId',
                label: 'Project Details',
                viewUrl: 'https://my.microfrontend.com/projects/details.html#id=:projectId;'
              }            
			]
          }
        ]
      }
    ]
  }
}

```

 Use the following options to work with path parameters:

- Add the parameters to the **viewUrl** by placing them anywhere in the **viewUrl** value. For example, if the main application URL is `https://luigiexample.com/home/projects/pr23`, then the **viewUrl** of the micro front-end in the content area is `https://my.microfrontend.com/projects/details.html#id=pr23`. 
- Use the [Luigi Client API](luigi-client-api.md) to access the node parameter values from the micro front-end. Use the `LuigiClient.getPathParams()` function. 
For example, to get the value of the sample project parameter, use `LuigiClient.getPathParams().projectId`. 
- Add a parameter to the context part of your configuration:
  ```
  {
    pathSegment: ':projectId',
    label: 'Project Details',
    viewUrl: 'https://my.microfrontend.com/projects/details.html#id=:projectId;',
    context: {
    	project: ':projectId'
    }
  } 
  ```
In all cases, the parameter is automatically replaced by the real value.


### Node parameters

You can use node parameters to build the **viewUrl** and pass them to the micro front-end specified in the navigation node selected in the navigation path. 
You can specify them in the main application URL, similarly to URL query parameters with a specific prefix. The prefix is `~` by default, but you can reconfigure it using the global **nodeParamPrefix** setting. 

All parameters without the prefix are not passed to the micro front-end and are consumed by the main application. 

A sample **viewUrl** `https://luigiexample.com/home/projects/pr23?~sorting=asc&~page=2` supports sorting and paging by introducing the **sort** and **page** node parameters.

The navigation structure with the project list view using such sample node parameters looks as follows:

````
{
  navigation: {
    nodes: [
      {
        pathSegment: 'home',
        label: 'Home',
        viewUrl: 'https://my.microfrontend.com/',
        children: [The
          {
            pathSegment: 'projects',
            label: 'Projects',
            viewGroup: 'projectsGroup',
            viewUrl: 'https://my.microfrontend.com/projects/list.html#pagenr={nodeParams.page};sort={nodeParams.sorting}',
            children: [
              {
                pathSegment: ':projectId',
                label: 'Project Details',
                viewUrl: 'https://my.microfrontend.com/projects/details.html#id=:projectId;'
              }            
			]
          }
        ]
      }
    ]
  }
} 

````

 Use the following options to work with node parameters:

- Build the **viewUrl** by placing them anywhere in the **viewUrl** value using the following syntax: `nodeParams.{node param name}`. For example, if the main application URL is `https://luigiexample.com/home/projects/?~sorting=asc&~page=2` then the **viewUrl** of a micro front-end is `https://my.microfrontend.com/projects/list.html#pagenr=2;sort=asc`.

- Use the [Luigi Client API](luigi-client-api.md) to access the node parameter values from within the micro front-end. Use the `LuigiClient.getNodeParams()` function. 
For example, to get the value of the sorting parameter, use `LuigiClient.getNodeParams().sorting`. 


## Navigation configuration parameters reference 

You can use the listed parameters and functions to configure your navigation structure. The examples show how to use selected options.

### Routing

You can configure the way Luigi tackles routing in your application in the **Routing** section of the configuration file. For example, you can choose the routing strategy to apply in your application as either hash or path location routing.

- **useHashRouting** defines either hash-based (`url.com/#/yourpath`) or path-based (`url.com/yourpath`) routing.
- **nodeParamPrefix** sets the prefix character when using the `LuigiClient.linkManager().withParam()` function, which provides a way to simply attach query parameters to the view URL for activities such as sorting and filtering. The URL contains the parameters to allow deep linking. If you want to use a different character prefix, define yours here. The default character is `~`.
- **skipRoutingForUrlPatterns** defines regex patterns to be skipped by the router when listening for path changes. This parameter is used for excluding **redirect_uri** parameters. Default patterns are `[/access_token=/, '/id_token=/]`.

### Node navigation parameters

The node navigation parameters are as follows:

- **nodeAccessibilityResolver** allows you to define a permission checker function that gets executed on every node. If it returns `false`, Luigi removes the node and its children from the navigation structure.
- **nodeAccessibilityResolver** receives all values defined in the node configuration. See [angular basicConfiguration.js](../core/examples/luigi-sample-angular/src/assets/basicConfiguration.js) for the **constraints** example.

### Node parameters

The node parameters are as follows:

- **pathSegment** specifies the partial URL of the current segment. **pathSegment** must not contain slashes.
  - A static settings example reflects `luigidomain.test/settings`.
  - A dynamic settings example, prefixed with a colon, loads on any other value. 
- **link** is a string which refers to an absolute path in the navigation structure or a relative path to a grandchild of the current path. If this parameter is defined, **pathSegment** is ignored.
 - **externalLink** is an object which indicates that the node links to an external URL. If this parameter is defined, **pathSegment** and **link** parameters are ignored. It has the following properties:
  - **sameWindow** defines if the external URL is opened in a new or current tab.
  - **url** is the external URL that the node leads to.
- **label** contains the display name of the navigation node.
- **hideFromNav** shows or hides a navigation node. You can still navigate to the node but it does not show up in the top or left pane.
- **viewUrl** contains the URL or path to a view which renders when you click the navigation node. Use either a full URL or a relative path. This value may consist of variables if you have specified a **navigationContext** with a dynamic **pathSegment**. If **viewUrl** is undefined, Luigi activates the child node specified in **defaultChildNode**. When both **viewUrl** and **defaultChildNode** are undefined, Luigi opens the first child of the current node.
- **navigationContext** contains a named node that is mainly for use in combination with a dynamic **pathSegment** to start navigation from a dynamic node using ` LuigiClient.linkManager().fromContext('contextname')`.
- **context** sends the specified object as context to the view. Use this parameter in combination with the dynamic **pathSegment** to receive the context through the context listeners of **Luigi Client**. This is an alternative to using the dynamic value in the **viewUrl**.
- **defaultChildNode** sets the child node that Luigi activates automatically if the current node has no **viewUrl** defined. Provide **pathSegment** of the child node you want to activate as a string.
- **isolateView** renders the view in a new frame when you enter and leave the node. This setting overrides the same-domain frame re-usage. The **isolateView** is disabled by default.
- **keepSelectedForChildren** focuses the navigation on its current hierarchy, omitting the display of children.
- **loadingIndicator.enabled** shows a loading indicator when switching between micro front-ends. If you have a fast micro front-end, you can disable this feature to prevent flickering of the loading indicator. This parameter is enabled by default.
- **loadingIndicator.hideAutomatically** disables the automatic hiding of the loading indicator once the micro front-end is loaded. It is only considered if the loading indicator is enabled. It does not apply if the loading indicator is activated manually with the `LuigiClient.uxManager().showLoadingIndicator()` function. If the loading indicator is enabled and automatic hiding is disabled, use `LuigiClient.uxManager().hideLoadingIndicator()` to hide it manually in your micro front-end during the startup. This parameter is enabled by default.
- **viewGroup** defines a group of views in the same domain sharing a common security context. This improves performance through reusing the frame. Use **viewGroup** only for the views that use path routing internally.
- **icon** is the name if an icon from [OpenUI](https://openui5.hana.ondemand.com/1.40.10/iconExplorer.html) that will be shown next to the Node's label (side navigation) or instead of it (top navigation).


### Navigation configuration example

This code sample demonstrates a sample structure with the parameters you can use when configuring navigation for Luigi.

```
Luigi.setConfig({
  routing: {
    // uses hash-based navigation if set to true
    useHashRouting: true,
    nodeParamPrefix: '~',
    skipRoutingForUrlPatterns: [/access_token=/, /id_token=/]
  },
  // navigation structure and settings
  navigation: {
    nodeAccessibilityResolver: function (nodeToCheckPermissionFor, parentNode, currentContext) {},
    nodes: [
        // STATIC navigation node
      {
        pathSegment: 'settings',
        label: 'Settings',
        viewUrl: 'https://admin.mydomain.com/settings',
        viewGroup: 'settingsGroup',
        // optional
        children: [node, node, node],
        hideFromNav: false,
        isolateView: false,
        icon: 'settings'
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
    ],
    contextSwitcher: {
      defaultLabel: 'Select Environment ...',
      parentNodePath: '/environments',
      lazyloadOptions: false,
      fallbackLabelResolver: (id) => (id.toUpperCase()),
      options: [{label,pathValue}, {label,pathValue}]
      },
      actions: [{label,link,position,clickHandler?}]
    }
  }
});
```


## Context switcher

The context switcher is a drop-down list available in the top navigation bar. It allows you to switch between a curated list of navigation elements such as Environments.

- **defaultLabel** specifies the default label that is shown if no context is selected.
- **parentNodePath** specifies the base path, that is prepended to **options[].pathValue**. It must be an absolute path.
- **lazyloadOptions** defines when to fetch **options**. When set to `true`, loads **options** when you click the context switcher. It doesn't involve any caching. When set to `false`, loads **options** once the page loads. The default value is `true`. 
- **options** defines the list of context element. Context element properties are:
  - **label** defines the context element label. If not defined, the **pathValue** is passed to **fallbackLabelResolver** to set its value. The default value is **pathValue**, if **fallbackLabelResolver** is not defined.
  - **pathValue** defines the context element path that is appended to **parentNodePath** and reflects a **pathSegment**.
- **actions** defines a list of additional elements that are shown on above or below the context switcher **options**. Each action contains the following parameters:
  - **label** defines the action element label.
  - **position** defines the action element position. Can be `top` or `bottom`. The default value is `top`. This parameter is optional.
  - **link** defines an absolute Link to a **node**. This parameter is optional.
  - **clickHandler** specifies a function and is executed on click and should return a boolean. If it returns `true`, **link** is opened afterwards.
- **fallbackLabelResolver** specifies a function that is used to fetch the **label** for **options** that do not have a **label** defined. Additionally it fetches the dropdown label for non-existing **options**.


### Dynamic **viewUrl** example

Use the node parameters and path parameters to build a dynamic **viewUrl**.

In this example, the web application URL is `https://Luigi.corp/something/sample_1/products?~sort=asc`. The micro front-end loads using a different URL, such as `https://admin.my.test/project/sample_1/products?sort=asc`.

When loading, the **viewUrl** uses the following dynamic URL parameters:

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
