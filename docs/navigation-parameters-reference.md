<!-- meta
{
  "node": {
    "label": "Navigation parameters reference",
    "category": {
      "label": "Luigi Core"
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 3
    }
  }
}
meta -->

# Navigation parameters reference

<!-- add-attribute:class:success -->
> **TIP:** To see the navigation parameters in use, see the [navigation configuration example](navigation-configuration-example.md) or configure a test application in the [Luigi Fiddle](https://fiddle.luigi-project.io).

Use the parameters and functions in this reference to configure your Luigi navigation structure.

* [Routing parameters](#routing-parameters)
* [Navigation parameters](#navigation-parameters)
* [Node parameters](#node-parameters)
* [Profile](#profile)
* [Context switcher](#context-switcher)
* [Product switcher](#product-switcher)
* [App switcher](#app-switcher)


## Routing parameters
You can configure the way Luigi tackles routing in your application in the `routing:` section of the configuration file. For example, you can choose the routing strategy to apply in your application as either hash or path location routing.

### useHashRouting
- **type**: boolean
- **description**: defines either hash-based (`example.com/#/yourpath`) or path-based (`example.com/yourpath`) routing.
- **default**: the default is `false`, which means path routing is used.

### nodeParamPrefix
- **type**: string
- **description**: sets the prefix character when using the `LuigiClient.linkManager().withParam()` function, which provides a simple way to attach query parameters to a view URL for activities such as sorting and filtering. Only this prefix can pass query parameters to micro frontends. A different prefix has to be used to pass parameters to the Luigi app itself to avoid potential conflicts between the two.
- **default**: the default prefix character is `~`, but you may also define a custom one.

### skipRoutingForUrlPatterns
- **type**: RegExp[]
- **description**: defines regex patterns the router will skip when listening for path changes. This parameter is used for excluding **redirect_uri** parameters.
- **default**: the default patterns are `[/access_token=/, '/id_token=/]`.

### pageNotFoundHandler
- **type**: any
- **description**: defines custom behavior when a `404` error occurs.  Luigi handles it by default. Leave its body empty if you have an external `404` handling. You can return an Object with **redirectTo** parameter if you want Luigi to redirect to a specific navigation path after execution.
- **attributes**:
  - **wrongPath** (string): the path that the user tried navigating to.
  - **wasAnyPathFitted** (bool): it is true if Luigi managed to fit a valid path which means **wrongPath** was only partially wrong. Otherwise it is false.


## Navigation parameters
The navigation parameters allow you to configure **global** navigation settings directly under the `navigation:` section in the configuration file.

### nodeAccessibilityResolver
- **type**: any
- **description**: receives all values defined in the node configuration. It allows you to define a permission checker function that gets executed on every node. If it returns `false`, Luigi removes the node and its children from the navigation structure. See [angular navigation.js](../core/examples/luigi-sample-angular/src/luigi-config/extended/navigation.js) for an example.

### defaults.isolateView
- **type**: boolean
- **description**: renders all views in new frames. This setting overrides the same-domain frame reuse.
- **default**: the parameter **defaults.isolateView** is `false` by default, and you can overwrite it using the **isolateView** value on a single node level.

### preloadViewGroups
- **type**: boolean
- **description**: allows deactivating the default preloading of [view groups](navigation-advanced.md#view-groups) iframes.

### viewGroupsSettings
- **type**: object
- **description**: contains key-object pairs, where the key is the view group name as specified in the node parameters, and the object contains key-value pairs. In each key-value pair, the key is the feature name and the value is the actual setting. The following options are supported:
- **attributes**:
  - **preloadUrl**(string): needs to be an absolute URL of a micro frontend belonging to a view group. It cannot be an URL of a node. It is recommended that you use a dedicated small, visually empty view, which imports Luigi Client and is fine with getting an empty context, for example, without an access token. The **preloadUrl** parameter
 is also required for view group caching in case you need a view group iframe to refresh whenever you navigate back to it.


## Node parameters
Node parameters are all the parameters that can be added to an individual navigation node in the `nodes:` section of the Luigi configuration file.

### pathSegment
- **type**: string
- **description**: specifies the partial URL of the current segment. **pathSegment** must not contain slashes.
- **examples**:
  - A static **pathSegment** of value `settings` results in `example.com/settings`.
  - A dynamic **pathSegment** is prefixed with a colon and can load any value. Find out more about dynamic paths in Luigi [here](navigation-advanced.md#dynamically-changeable-paths).

### link
- **type**: string
- **description**: refers to an absolute path in the navigation structure or a relative path to a grandchild of the current path. If this parameter is defined, **pathSegment** is ignored.

### externalLink
- **type**: object
- **description**: indicates that the node links to an external URL. If this parameter is defined, **pathSegment** and **link** parameters are ignored.
- **attributes**:
  - **sameWindow** defines if the external URL is opened in a new or current tab. The default value for this parameter
 is `false`.
  - **url** is the external URL that the node leads to.

### label
- **type**: string
- **description**: contains the display name of the navigation node.

### testId
- **type**: string
- **description**: allows you to define your own custom **testId** to be used in E2E tests. If you do not specify it, it is a combination of the node's **pathSegment** followed by an underscore and the label, written as one word in lower case. If the **pathSegment** does not exist, the **testId** includes the label only. This way, you can have `pathsegment_label` or `label`.

### hideFromNav
- **type**: boolean
- **description**: shows or hides a navigation node. You can still navigate to the node but it does not show up in the top or left pane.

### viewUrl
- **type**: string
- **description**: contains the URL or path to a view which renders when you click the navigation node. Use either a full URL or a relative path. If **viewUrl** is undefined, Luigi activates the child node specified in **defaultChildNode**. When both **viewUrl** and **defaultChildNode** are undefined, Luigi opens the first child of the current node. **viewUrl** can contain variables from:
  * dynamic path segments
  * node parameters
  * contexts


### navigationContext
- **type**: string
- **description**: contains a named node that is mainly for use in combination with a dynamic **pathSegment** to start navigation from a dynamic node using ` LuigiClient.linkManager().fromContext('contextname')`.

### context
- **type**: object
- **description**: sends the specified object as context to the view. Use this parameter in combination with the dynamic **pathSegment** to receive the context through the context listeners of **Luigi Client**. This is an alternative to using the dynamic value in the **viewUrl**.

### defaultChildNode
- **type**: string
- **description**: sets the child node that Luigi activates automatically if the current node has no **viewUrl** defined. Provide **pathSegment** of the child node you want to activate as a string.

<!-- add-attribute:class:warning -->
>**NOTE:** To define a root-level **defaultChildNode** which is different than the first header navigation node, set an object with **defaultChildNode** and **children** set to `navigation.nodes` instead of an array of nodes.

- **example**:
```javascript
settings: {
  navigation: {
    nodes: {
      defaultChildNode: 'overview',
      children: [
        {
          pathSegment: 'docs',
          label: 'Documentation',
          viewUrl: '...'
        },
        {
          pathSegment: 'overview',
          label: 'Overview',
          viewUrl: '...'
        }
      ]
    }
  }
```

### isolateView
- **type**: boolean
- **description**: renders the view in a new frame when you enter and leave the node. This setting overrides the same-domain frame re-usage.
- **default**: `false`

### viewGroup
- **type**: string
- **description**: allows you to associate nodes to be rendered in the same iframe, as long as they belong to the same origin. The value of this parameter is considered as the view group id. For further explanations, see [this section](navigation-configuration.md#view-groups).

### keepSelectedForChildren
- **type**: boolean
- **description**: focuses the navigation on its current hierarchy, omitting the display of children.

### loadingIndicator.enabled
- **type**: boolean
- **description**: shows a loading indicator when switching between micro frontends. If you have a fast micro frontend, you can disable this feature to prevent flickering of the loading indicator.
- **default**: `true`
- **example**:
    ```javascript
    loadingIndicator: {
      enabled: false
    }
   ```
### loadingIndicator.hideAutomatically
- **type**: boolean
- **description**: if set to `false`, it disables the automatic hiding of the loading indicator once the micro frontend is loaded. It is only considered if the loading indicator is enabled. It does not apply if the loading indicator is activated manually with the `LuigiClient.uxManager().showLoadingIndicator()` function. If the loading indicator is enabled and automatic hiding is disabled, use `LuigiClient.uxManager().hideLoadingIndicator()` to hide it manually in your micro frontend during the startup.
- **default**: `true`
- **example**:
    ```javascript
    loadingIndicator: {
      hideAutomatically: false
    }
    ```
### icon
- **type**: string
- **description**: the name of an icon, without the `sap-icon--` prefix. Its source may be [OpenUI](https://openui5.hana.ondemand.com/1.40.10/iconExplorer.html) or a custom link (relative or absolute) to an image. The icon is displayed next to the node label in the side navigation or instead of the label in the top navigation.

### altText
- **type**: string
- **description**: adds the HTML `alt` attribute to an icon. Note that this property only applies to icons with a defined absolute or relative path.

### hideSideNav
- **type**: boolean
- **description**: if set to `true`, the left navigation disappears when you click the affected node.
- **default**: `false`

### badgeCounter
- **type**: object
- **description**: adds a badge with a number and a label to a node. Nodes that are part of a category show a cumulated number of all badges in this category. **badgeCounter** is only available for top navigation items.
- **attributes**:
  - **label** is the label of the badge.
  - **count** is a function or asynchronous function that returns a number.
  Gets updated when you click the navigation. Use `Luigi.navigation().updateTopNavigation()` in Luigi Core or trigger it in Luigi Client by using the custom message feature.

### category
- **type**: string or object
- **description**: defines a group of views separated with a headline and an icon. You should define at least one node in a group as an Object with **label** and **icon** attributes. For all other nodes, you can set **category** as a string with the `label` value.
- **attributes**:
  - **label** is a string that represents the title of the category.
  - **icon** is the name of an icon, without the `sap-icon--` prefix. Its source may be [OpenUI](https://openui5.hana.ondemand.com/1.40.10/iconExplorer.html) or a custom link (relative or absolute) to an image. The icon is displayed next to the node label in the side navigation or instead of the label in the top navigation. In case you accidentally define different icons in a category group, only the first one is used.
  - **altText** adds the HTML `alt` attribute to an icon. Note that this property only applies to icons with a defined absolute or relative path.
  - **collapsible** if set to `true`, category items are hidden at first. To expand them, click the main category node.
  - **testId** is a string where you can define your own custom `testId` for  E2E tests. If nothing is specified, it is the node's label written as one word in lower case, for example`label`.

### openNodeInModal
- **type**: boolean or object
- **description**:  configures the settings of a view which opens in a modal. You can set the **openNodeInModal** parameter to `true` to use the default modal title and size, or you can specify them using these attributes:
- **attributes**:
  - **title** is the modal title. By default, it is the node label. If there is no label, it is left empty.
  - **size** specifies the size of the modal. The default size is `l`, which means 80% of the main window size. You can also use `m` (60%) and `s` (40%) to set the modal size.

### onNodeActivation
- **type**: function
- **description**: executed when a request to navigate to the node occurs. As an input parameter, the function receives the node object as described in the configuration. This function can return results synchronously or asynchronously. If the function returns boolean `false`, the navigation is not triggered, otherwise, navigation renders as usual.

### clientPermissions.changeCurrentLocale
- **type**: boolean
- **description**: current locale can be changed from client using the corresponding API if this is set to `true`
- **example**:
    ```javascript
    clientPermissions: {
      changeCurrentLocale: true
    }
    ```

### tabNav
- **type**: boolean
- **description**: renders the children of the node as a horizontal navigation bar. Sub-children are not supported. When you categorize nodes you will get a drop-down menu in the horizontal navigation.

### anonymousAccess
- **type**: boolean or "exclusive"
- **description**: when set to `true`, the node is always accessible. When set to `exclusive`, the node is only visible in logged-out state. Requires **auth.disableAutoLogin** to be set to `true`. **anonymousAccess** needs to be defined both on parent and child nodes.

## Context switcher

The context switcher is a drop-down list available in the top navigation bar. It allows you to switch between a curated list of navigation elements such as Environments. To do so, add the **contextSwitcher** parameter to the **navigation** object using the following optional parameters:

### defaultLabel
- **type**: string
- **description**: specifies the default label that is shown if no context is selected.

### parentNodePath
- **type**: string
- **description**: specifies the base path, that is prepended to **options[].pathValue**. It must be an absolute path.

### lazyloadOptions
- **type**: boolean
- **description**: defines when to fetch **options**. When set to `true`, loads **options** when you click the context switcher. It doesn't involve any caching. When set to `false`, loads **options** once the page loads.
- **default**: `true`

### options
- **type**: array
- **description**: defines the list of context element.
- **attributes**:
  - **label** defines the context element label. If not defined, the **pathValue** is passed to **fallbackLabelResolver** to set its value. The default value is **pathValue**, if **fallbackLabelResolver** is not defined.
  - **pathValue** defines the context element path that is appended to **parentNodePath** and reflects a **pathSegment**.

### customOptionsRenderer
- **type**: function
- **parameters**: [option](navigation-parameters-reference.md#options), isSelected
- **description**: - **description**: enables you to add custom items to the context switcher by rendering code inside a `<li>` element. The function take an **option** object and a boolean **isSelected** as a parameter. It is recommended to use this function carefully because it is possible to inject JavaScript code.


### actions
- **type**: array
- **description**: defines a list of additional elements that are shown on above or below the context switcher **options**.
- **attributes**:
  - **label** defines the action element label.
  - **testId** is a string where you can define your own custom `testId` for E2E tests. If nothing is specified, it is the node's label written as one word and lower case (e.g. `label`).
  - **position** defines the action element position. Can be `top` or `bottom`. The default value is `top`. This parameter
 is optional.
  - **link** defines an absolute Link to a **node**. This parameter
 is optional.
  - **clickHandler** specifies a function and is executed on click and should return a boolean. If it returns `true`, **link** is opened afterwards.

### fallbackLabelResolver
- **type**: any
- **description**: specifies a function used to fetch the **label** for **options** with no **label** defined. Additionally, it fetches the drop-down label for non-existing **options**.

### preserveSubPathOnSwitch
- **type**: boolean
- **description**: if set to `true`, the sub-path is preserved on context switch.

### alwaysShowDropdown
- **type**: boolean
- **description**: if set to `false`, the drop-down is not shown on click if there is only one option and no actions.
- **default**: `true`

## Profile

The profile section is a configurable drop-down list available in the top navigation bar. Within the configuration, you can override the logout item content (if authorization is configured) and/or add links to Luigi navigation nodes. To do so, add the **profile** parameter to the **navigation** object using the following optional parameters:

### logout
- **type**: object
- **description**: defines a list of additional elements that are shown on above or below the context switcher **options**.
- **attributes**:
  - **label** overrides the text for the logout item. The default value is `Sign Out`.
  - **testId** is a string where you can define your own custom `testId` for E2E tests. If nothing is specified, it is the node's label written as one word and lower case (e.g. `label`).
  - **icon** overrides the icon for the logout item. The default value is the [SAP UI5 log icon](https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons/?tag=logout).
  - **altText** adds the HTML `alt` attribute to an icon. Note that this property only applies to icons with a defined absolute or relative path.
  - **customLogoutFn** defines a function to implement your own logout functionality. Use this function only if no IDP is configured. If you define IDP with a corresponding [logout function](authorization-configuration.md), the **customLogoutFn** set for a profile is ignored.

### items
- **type**: array
- **description**: an array of objects, each one being a link to a Luigi navigation node or an external URL.
- **attributes**:
  - **label** defines the text for the link.
  - **testId** is a string where you can define your own custom `testId` for E2E tests. If nothing is specified, it is the node's label written as one word and lower case (e.g. `label`).
  - **icon** is the name of an icon from the [OpenUI](https://openui5.hana.ondemand.com/1.40.10/iconExplorer.html) or a custom link (relative or absolute) to an image displayed next to the label or instead of it.
  - **altText** adds the HTML `alt` attribute to an icon. Note that this property only applies to icons with a defined absolute or relative path.
  - **link** defines an absolute link to a **node**.
  - **externalLink** is an object which indicates that the node links to an external URL. If this parameter
 is defined, the **link** parameter
 is ignored. It has the following attributes:
    - **sameWindow** defines if the external URL is opened in the current tab or in a new one. The default value for this attribute
   is `false`.
    - **url** is the external URL that the link leads to.

### staticUserInfoFn
- **type**: function
- **description**: used to retrieve a user's name and email to simulate logging in. It can be used when authorization is disabled and also gets called if the defined IDP provider does not have **settings.userInfoFn** defined or does not provide a `userInfo` function internally. It can be asynchronous and should return an object with **name**, **email** and **picture** parameters.

<!-- add-attribute:class:warning -->
>**NOTE:** Neither **authorization** nor **profile** parameter is configured if the profile section in the top navigation bar is not visible.

## Product switcher

The product switcher is a pop-up window available in the top navigation bar. It allows you to switch between the navigation elements displayed in the pop-up. To do so, add the **productSwitcher** parameter to the **navigation** object using the following optional parameters:

### label
- **type**: string
- **description**: defines the label of the product switcher. It is displayed as a title attribute on hover in the top navigation and as a headline in the mobile pop-up.

### testId
- **type**: string
- **description**: enables you to define your own custom `testId` for E2E tests. If nothing is specified, it is the node's label written as one word and lower case (e.g. `label`).

### icon
- **type**: string
- **description**: the name of an icon, without the `sap-icon--` prefix. Its source may be [OpenUI](https://openui5.hana.ondemand.com/1.40.10/iconExplorer.html) or a custom link (relative or absolute) to an image. The icon is displayed without label in the top navigation.

### altText
- **type**: string
- **description**: adds the HTML `alt` attribute to an icon. Note that this property only applies to icons with a defined absolute or relative path.

### items
- **type**: array
- **description**: an array of objects, each one being a link to a Luigi navigation node or an external URL. An item can have several attributes.
- **attributes**:
  - **label** defines the text for the link.
  - **testId** is a string where you can define your own custom `testId` for E2E tests. If nothing is specified, it is the node's label written as one word and lower case (e.g. `label`).
  - **icon** is the name of an icon from the [OpenUI](https://openui5.hana.ondemand.com/1.40.10/iconExplorer.html) or a custom link (relative or absolute) to an image displayed next to the label or instead of it.
  - **altText** adds the HTML `alt` attribute to an icon. Note that this property only applies to icons with a defined absolute or relative path.
  - **link** defines an absolute link to a **node**.
  - **externalLink** is an object which indicates that the node links to an external URL. If this parameter
 is defined, the **link** parameter
 is ignored. It has the following attributes:
    - **sameWindow** defines if the external URL is opened in the current tab or in a new one. The default value for this attribute
   is `false`.
    - **url** is the external URL that the link leads to.

## App switcher

The app switcher is a drop-down list available in the top navigation bar. It allows you to switch between application elements displayed in the drop-down. To do so, add the **appSwitcher** parameter to the **navigation** object using the following optional parameters:

### showMainAppEntry
- **type**: boolean
- **description**: includes the link to the root of the Luigi application in the drop-down using the **title** specified in the **settings/header** section of the configuration as a label.

### items
- **type**: array
- **description**: defines the list of application elements.
- **attributes**:
  - **title** defines the application title. This is shown in the **appSwitcher** drop-down as well as the title in the header of the Luigi application if a user is in the context of the app.
  - **subTitle** defines the application sub-title. This is shown as the sub-title in the header of the Luigi application if a user is in the context of the app.
  - **link** is a link within the Luigi application that defines the root of the app. It is used to switch to the application if the drop-down entry is selected. It is also used to determine if a user is within the app's scope, so that the corresponding title and sub-title can be rendered in the header.
