# Navigation parameters reference
You can use the listed parameters and functions to configure your navigation structure. The examples show how to use selected options.

## Navigation configuration example

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
      options: [{label,pathValue}, {label,pathValue}],
      actions: [{label,link,position,clickHandler?}]
    },
    profile: {
      logout: {
        label: 'End session'
        // icon: "sys-cancel",
      },
      items: [
        {
          icon: '',
          label: 'Luigi in Github',
          externalLink: {
            url: 'https://github.com/SAP/luigi',
            sameWindow: false
          }
        },
        {
          icon: '',
          label: 'Project 1',
          link: '/projects/pr1'
        }
      ]
    }
  }
});
```

## Routing

You can configure the way Luigi tackles routing in your application in the **Routing** section of the configuration file. For example, you can choose the routing strategy to apply in your application as either hash or path location routing.

- **useHashRouting** defines either hash-based (`url.com/#/yourpath`) or path-based (`url.com/yourpath`) routing.
- **nodeParamPrefix** sets the prefix character when using the `LuigiClient.linkManager().withParam()` function, which provides a way to simply attach query parameters to the view URL for activities such as sorting and filtering. The URL contains the parameters to allow deep linking. If you want to use a different character prefix, define yours here. The default character is `~`.
- **skipRoutingForUrlPatterns** defines regex patterns to be skipped by the router when listening for path changes. This parameter is used for excluding **redirect_uri** parameters. Default patterns are `[/access_token=/, '/id_token=/]`.
- **pageNotFoundHandler** is a function defining custom behavior when the 404 (page not found) error occurs.  Luigi handles it by default. Leave its body empty if you have an external 404 handling. This function takes the following parameters: 
  - **wrongPath**(string): the path that user tried to navigate to
  - **wasAnyPathFitted**(bool): it is true if Luigi managed to fit a valid path which means **wrongPath** was only partially wrong. Otherwise it is false.

## Node navigation parameters

The node navigation parameters are as follows:

- **nodeAccessibilityResolver** allows you to define a permission checker function that gets executed on every node. If it returns `false`, Luigi removes the node and its children from the navigation structure.
- **nodeAccessibilityResolver** receives all values defined in the node configuration. See [angular basicConfiguration.js](../core/examples/luigi-sample-angular/src/assets/basicConfiguration.js) for the **constraints** example.
- **defaults.isolateView** renders all views in new frames. This setting overrides the same-domain frame reuse. The **defaults.isolateView** is disabled by default, and you can overwrite it using the **isolateView** value on a single node level.

## Node parameters

The node parameters are as follows:

- **pathSegment** specifies the partial URL of the current segment. **pathSegment** must not contain slashes.
  - A static settings example reflects `luigidomain.test/settings`.
  - A dynamic settings example, prefixed with a colon, loads on any other value. 
- **link** is a string which refers to an absolute path in the navigation structure or a relative path to a grandchild of the current path. If this parameter is defined, **pathSegment** is ignored.
 - **externalLink** is an object which indicates that the node links to an external URL. If this parameter is defined, **pathSegment** and **link** parameters are ignored. It has the following properties:
   - **sameWindow** defines if the external URL is opened in a new or current tab. The default value for this parameter is `false`.
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
- **icon** is the name of an icon from the [OpenUI](https://openui5.hana.ondemand.com/1.40.10/iconExplorer.html) or a custom link (relative or absolute) to an image displayed next to the Node label in the side navigation or instead of the label in the top navigation.
- **hideSideNav** if set to `true`, the left navigation disappears when you click the affected node. It is set to `false` by default.
- **badgeCounter** adds a badge with a number and a label to a Node. Nodes that are part of a category will show a cumulated number of all badges in this category. **badgeCounter** is only available for top navigation items.
  - **label** is the label of the badge
  - **count** is a function or asynchronous function that returns a number.
  Gets updated when clicked on the navigation. Use `Luigi.navigation().updateTopNavigation()` in Luigi Core or execute `window.parent.postMessage({msg: 'luigi.navigation.update-badge-counters'}, '*');` from within a micro-frontend to trigger a manual update.

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
- **fallbackLabelResolver** specifies a function used to fetch the **label** for **options** with no **label** defined. Additionally, it fetches the drop-down label for non-existing **options**.


## Profile

The profile section is a configurable drop-down list available in the top navigation bar. Within the configuration, you can override the logout item content and/or add links to Luigi navigation nodes. To do so, add the **profile** property to the **navigation** object using the following optional properties:

- **logout** overrides the content of the logout item.
  - **label** overrides the text for the logout item. The default value is "Sign Out".
  - **icon** overrides the icon for the logout item. The default value is [SAP UI5 log icon](https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons/?tag=logout).
- **items** is an array of objects, each one being a link to a Luigi navigation node or an external URL. An item can have the following parameters:
  - **label** defines the text for the link. 
  - **icon** is the name of an icon from the [OpenUI](https://openui5.hana.ondemand.com/1.40.10/iconExplorer.html) or a custom link (relative or absolute) to an image displayed next to the label or instead of it.
  - **link** defines an absolute link to a **node**.
  - **externalLink** is an object which indicates that the node links to an external URL. If this parameter is defined, the **link** parameter is ignored. It has the following properties:
    - **sameWindow** defines if the external URL is opened in the current tab or in a new one. The default value for this parameter is `false`.
    - **url** is the external URL that the link leads to.
