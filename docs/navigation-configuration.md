# Navigation configuration

Navigation parameters allow you to specify routing configuration, set the appearance of navigation, and define navigation structure.

## Navigation elements

The image shows the elements of Luigi navigation: 

1. Top navigation which displays the main navigation path.
2. Side navigation which displays the defined applications.
3. Main content window which renders the micro frontend.
 

![Navigation layout](assets/navigation-structure.png)


## Navigation structure

The navigation structure is a recursive tree-like data structure that defines all possible navigation paths within the application. 

>**NOTE:** This document describes the navigation structure along with the options you can use to create it. For a full list of available parameters, see the [parameter reference](navigation-parameters-reference.md) document.

A navigation path is any existing path in the navigation tree. It connects the following elements together:

- The path of the main application, that is, the path in the browser URL. The path is defined in a Luigi navigation node through one of the following parameters, listed in order of precedence: **externalLink**, **link**, and **pathSegment**.
- The **viewUrl** property of a micro frontend rendered in the content area of the main application.

If you set the **hideSideNav** property to `true`, the left navigation disappears when you click the affected node. It is set to `false` by default.

If you want to group some navigation nodes into a separate parent node, you can use the **category** property. The grouped navigation nodes are rendered in a dropdown. The **category** property needs a **label** and, optionally, an **icon**.


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
          },
          {
            category: {label:'Misc', icon:'miscellaneous'},
            pathSegment: 'miscellaneous',
            label: 'Miscellaneous',
            viewUrl: 'https://my.microfrontend.com/general/miscellaneous.html'
          },
          {
            category:'Misc',
            pathSegment: 'miscellaneous2',
            label: 'Miscellaneous2',
            viewUrl: 'https://my.microfrontend.com/general/miscellaneous2.html'
          }
        ]
      }
    ]
  }
}
````


## Node navigation

When you navigate between nodes that are located in the same domain, Luigi triggers a hash or path change. Then it sends the updated context in order not to fully reload the view for a single-page application based micro frontend. Navigation between domains triggers a full page load in order to comply with cross-domain security concepts.

If you start navigating from a child node level, navigate to the specific product route using the [Luigi Client API](luigi-client-api.md) as shown in the example:

````
LuigiClient.linkManager().fromContext('project').withParam({sort: 'asc'}).navigate('/products');
````

You can also navigate directly from any other node:

````
LuigiClient.linkManager().withParam({sort: 'asc'}).navigate('/something/sample_1/products');
````

## Application path

The main application path is built from **pathSegment** values in the navigation path, joined with the **/** character. You can override this setting using either **externalLink** or **link** parameters.

The micro frontend view URL is the value of the **viewUrl** property of the last node in the navigation path.

The following example shows the structure of different navigation paths. If the URL of the main application is `https://luigiexample.com`, then:

- `https://luigiexample.com/home/projects/pr1` reflects the `home/projects/pr1` navigation path. It is a valid navigation path as it exists in the defined navigation tree structure. The micro frontend view URL rendered in the content area is `https://my.microfrontend.com/projects/details.html#id=pr1`.

- `https://luigiexample.com/home/maskopatol` defines an invalid `home/maskopatol` navigation path.

- `https://luigiexample.com/projects/pr1` defines the `projects/pr1` navigation path. It is not a valid navigation path, since a valid navigation path always starts from the root.


## Path parameters

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

- Add the parameters to the **viewUrl** by placing them anywhere in the **viewUrl** value. For example, if the main application URL is `https://luigiexample.com/home/projects/pr23`, then the **viewUrl** of the micro frontend in the content area is `https://my.microfrontend.com/projects/details.html#id=pr23`. 
- Use the [Luigi Client API](luigi-client-api.md) to access the node parameter values from the micro frontend. Use the `LuigiClient.getPathParams()` function. 
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


## Node parameters

You can use node parameters to build the **viewUrl** and pass them to the micro frontend specified in the navigation node selected in the navigation path. 
You can specify them in the main application URL, similarly to URL query parameters with a specific prefix. The prefix is `~` by default, but you can reconfigure it using the global **nodeParamPrefix** setting. 

All parameters without the prefix are not passed to the micro frontend and are consumed by the main application. 

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
        children: [
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

- Build the **viewUrl** by placing them anywhere in the **viewUrl** value using the following syntax: `nodeParams.{node param name}`. For example, if the main application URL is `https://luigiexample.com/home/projects/?~sorting=asc&~page=2` then the **viewUrl** of a micro frontend is `https://my.microfrontend.com/projects/list.html#pagenr=2;sort=asc`.

- Use the [Luigi Client API](luigi-client-api.md) to access the node parameter values from within the micro frontend. Use the `LuigiClient.getNodeParams()` function. 
For example, to get the value of the sorting parameter, use `LuigiClient.getNodeParams().sorting`. 


## Dynamic viewUrl

Use the node parameters and path parameters to build a dynamic **viewUrl**.

In this example, the web application URL is `https://Luigi.corp/something/sample_1/products?~sort=asc`. The micro frontend loads using a different URL, such as `https://admin.my.test/project/sample_1/products?sort=asc`.

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
```

## View Groups
You can use the view groups feature to override the default iframes management policy. Imagine you have in your app the following microfrontend views: `http://mysite.com/a#e` and  `http://mysite.com/b#f`. Due to hash routing they don´t belong to the same domain, since the domain is the path until the `#` and therefore they will be rendered in different iframes by default. Nevertheless both views might have the **same origin** (in the example `mysite.com`) and belong to the **same microfrontend** and you will want to render them in the same iframe. The view groups feature makes that possible just by setting the `viewGroup` parameter in the most upper nodes, as their children nodes are automatically considered part of the same view group. 

View group nodes are always rendered in their own iframe. Nodes not belonging to any view group will default to the same-origin iframe rendering policy. 

The view groups feature also offers caching. Caching of view groups is provided out of the box. Everytime you navigate to another view group, either a new iframe is created or if the iframe already exists, it is reused. In both cases, the iframe you are navigating from is not destroyed, but hidden and available to be used again. If you navigate back to the first iframe, and the view in that frame should be updated (e.g. in the second iframe you just added a new entry to a table that should be displayed in the first iframe), you need to set a preload url to any view from the view group to ensure that the view is refreshed when you navigate back to it. 

We offer also preloading for view groups. You just need to setup which url you want to preload, and Luigi will preload the view after some user interactions when the browser is most likely to be idle. This option is active by default, but can be deactivated via a [configuration flag](navigation-parameters-reference.md#node-parameters).

For more information about how to set caching with view refresh and preloading for view groups, please read [here](navigation-parameters-reference.md#node-parameters).