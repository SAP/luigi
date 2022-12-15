// Type definitions for Luigi Client web components

export declare interface ConfirmationModalSettings {
  type?: string;
  header?: string;
  body?: string;
  buttonConfirm?: string | boolean;
  buttonDismiss?: string;
}

export declare interface ModalSettings {
  title?: string;
  size?: 'fullscreen' | 'l' | 'm' | 's';
  width?: string;
  height?: string;
}

export declare interface SplitViewSettings {
  title?: string;
  size?: number;
  collapsed?: boolean;
}

export declare enum SplitViewEvents {
  'expand',
  'collapse',
  'resize',
  'close'
}

export declare interface SplitViewInstance {
  collapse: () => void;
  expand: () => void;
  setSize: (value: number) => void;
  on: (key: SplitViewEvents, callback: () => void) => string;
  exists: () => boolean;
  getSize: () => number;
  isCollapsed: () => boolean;
  isExpanded: () => boolean;
}

export declare interface DrawerSettings {
  header?: any;
  size?: 'l' | 'm' | 's' | 'xs';
  backdrop?: boolean;
  overlap?: boolean;
}

export declare interface AlertSettings {
  text?: string;
  type: 'info' | 'success' | 'warning' | 'error';
  links?: {
    [key: string]: { text: string; url?: string; dismissKey?: string };
  };
  closeAfter?: number;
}

export declare interface NodeParams {
  [key: string]: string;
}

export declare interface UxManager {
  /**
   * Hides the app loading indicator.
   * @memberof uxManager
   */
  hideAppLoadingIndicator: () => void;

  /**
   * Shows an alert.
   * @memberof uxManager
   * @param {Object} settings the settings for the alert
   * @param {string} settings.text the content of the alert. To add a link to the content, you have to set up the link in the `links` object. The key(s) in the `links` object must be used in the text to reference the links, wrapped in curly brackets with no spaces. If you don't specify any text, the alert is not displayed
   * @param {('info'|'success'|'warning'|'error')} settings.type sets the type of alert
   * @param {Object} settings.links provides links data
   * @param {Object} settings.links.LINK_KEY object containing the data for a particular link. To properly render the link in the alert message refer to the description of the **settings.text** parameter
   * @param {string} settings.links.LINK_KEY.text text which replaces the link identifier in the alert content
   * @param {string} settings.links.LINK_KEY.url URL to navigate when you click the link. Currently, only internal links are supported in the form of relative or absolute paths
   * @param {string} settings.links.LINK_KEY.dismissKey dismissKey which represents the key of the link.
   * @param {number} settings.closeAfter (optional) time in milliseconds that tells Luigi when to close the Alert automatically. If not provided, the Alert will stay on until closed manually. It has to be greater than `100`
   * @returns {promise} which is resolved when the alert is dismissed
   * @example
   * import LuigiClient from '@luigi-project/client';
   * const settings = {
   *  text: "Ut enim ad minim veniam, {goToHome} quis nostrud exercitation ullamco {relativePath}. Duis aute irure dolor {goToOtherProject}",
   *  type: 'info',
   *  links: {
   *    goToHome: { text: 'homepage', url: '/overview' },
   *    goToOtherProject: { text: 'other project', url: '/projects/pr2' },
   *    relativePath: { text: 'relative hide side nav', url: 'hideSideNav' },
   *    neverShowItAgain: { text: 'Never show it again', dismissKey: 'neverShowItAgain' }
   *  },
   *  closeAfter: 3000
   * }
   * LuigiClient
   *  .uxManager()
   *  .showAlert(settings)
   *  .then(() => {
   *     // Logic to execute when the alert is dismissed
   *  });
   */
  showAlert: (settings: AlertSettings) => Promise<Object>;

  /**
   * Shows a confirmation modal.
   * @memberof uxManager
   * @param {Object} settings the settings of the confirmation modal. If you don't provide any value for any of the fields, a default value is used
   * @param {string} [settings.header="Confirmation"] the content of the modal header
   * @param {string} [settings.body="Are you sure you want to do this?"] the content of the modal body
   * @param {string} [settings.buttonConfirm="Yes"] the label for the modal confirm button
   * @param {string} [settings.buttonDismiss="No"] the label for the modal dismiss button
   * @returns {promise} which is resolved when accepting the confirmation modal and rejected when dismissing it
   * @example
   * import LuigiClient from '@kyma-project/luigi-client';
   * const settings = {
   *  header: "Confirmation",
   *  body: "Are you sure you want to do this?",
   *  buttonConfirm: "Yes",
   *  buttonDismiss: "No"
   * }
   * LuigiClient
   *  .uxManager()
   *  .showConfirmationModal(settings)
   *  .then(() => {
   *     // Logic to execute when the confirmation modal is dismissed
   *  });
   */
  showConfirmationModal: (settings: ConfirmationModalSettings) => Promise<void>;

  /**
   * Set the document title
   * @memberof UX
   * @param {string} documentTitle
   * @since 1.4.0
   * @example LuigiClient.uxManager().setDocumentTitle('Luigi');
   */
  setDocumentTitle: (documentTitle: string) => void;

  /**
   * Get the document title
   * @memberof UX
   * @since 1.4.0
   * @returns a string, which is displayed in the tab.
   * @example LuigiClient.uxManager().getDocumentTitle();
   */
  getDocumentTitle: () => string;

  /**
   * Set the collapsed state of the left side navigation
   * @memberof UX
   * @param {boolean} state
   * @since 1.5.0
   */
  collapseLeftSideNav: (state: boolean) => void;

  /**
   * Open user settings dialog
   * @memberof UX
   * @since 1.7.1
   */
  openUserSettings: () => void;

  /**
   * Close user settings dialog
   * @memberof UX
   * @since 1.7.1
   */
  closeUserSettings: () => void;
}

export declare interface LinkManager {
  /**
   * Refreshes top navigation badge counters by rendering the navigation again.
   * @memberof linkManager
   * @example
   * LuigiClient.linkManager().updateTopNavigation();
   */
  updateTopNavigation: () => void;

  /**
   * Navigates to the given path in the application. It contains either a full absolute path or a relative path without a leading slash that uses the active route as a base. This is the standard navigation.
   * @memberof LuigiNavigation
   * @param {string} path path to be navigated to
   * @param {boolean} preserveView preserve a view by setting it to `true`. It keeps the current view opened in the background and opens the new route in a new frame. Use the {@link #goBack goBack()} function to navigate back. You can use this feature across different levels. Preserved views are discarded as soon as you use the standard {@link #navigate navigate()} function instead of {@link #goBack goBack()}
   * @param {Object} modalSettings opens a view in a modal. Use these settings to configure the modal's title and size
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
   * @param {('fullscreen'|'l'|'m'|'s')} [modalSettings.size="l"] size of the modal
   * @param {string} modalSettings.width lets you specify a precise width for the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @param {string} modalSettings.height lets you specify a precise height for the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @param {Object} splitViewSettings opens a view in a split view. Use these settings to configure the split view's behaviour
   * @param {string} splitViewSettings.title split view title. By default, it is the node label. If there is no label, it is left empty
   * @param {number} [splitViewSettings.size=40] height of the split view in percent
   * @param {boolean} [splitViewSettings.collapsed=false] opens split view in collapsed state
   * @param {Object} drawerSettings opens a view in a drawer. Use these settings to configure if the drawer has a header, backdrop and size.
   * @param {any} drawerSettings.header By default, the header is visible. The default title is the node label, but the header could also be an object with a `title` attribute allowing you to specify your own title.  An 'x' icon is displayed to close the drawer view.
   * @param {boolean} drawerSettings.backdrop By default, it is set to `false`. If it is set to `true` the rest of the screen has a backdrop.
   * @param {('l'|'m'|'s'|'xs')} [drawerSettings.size="s"] size of the drawer
   * @example
   * LuigiClient.linkManager().navigate('/overview')
   * LuigiClient.linkManager().navigate('users/groups/stakeholders')
   * LuigiClient.linkManager().navigate('/settings', null, true) // preserve view
   */
  navigate: (
    path: string,
    preserveView?: boolean,
    modalSettings?: ModalSettings,
    splitViewSettings?: SplitViewSettings,
    drawerSettings?: DrawerSettings
  ) => void;

  /**
   * Opens a view in a modal. You can specify the modal's title and size. If you do not specify the title, it is the node label. If there is no node label, the title remains empty.  The default size of the modal is `l`, which means 80%. You can also use `m` (60%) and `s` (40%) to set the modal size. Optionally, use it in combination with any of the navigation functions.
   * @memberof linkManager
   * @param {string} path navigation path
   * @param {Object} [modalSettings] opens a view in a modal. Use these settings to configure the modal's title and size
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
   * @param {('fullscreen'|'l'|'m'|'s')} [modalSettings.size="l"] size of the modal
   * @param {string} modalSettings.width lets you specify a precise width for the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @param {string} modalSettings.height lets you specify a precise height for the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @param {Function} onCloseCallback callback function called upon closing the openened modal
   * @example
   * LuigiClient.linkManager().openAsModal('projects/pr1/users', {title:'Users', size:'m'});
   */
  openAsModal: (nodepath: string, modalSettings?: ModalSettings, onCloseCallback?: Function) => void;

  /**
   * Opens a view in a split view. You can specify the split view's title and size. If you don't specify the title, it is the node label. If there is no node label, the title remains empty. The default size of the split view is 40, which means 40% height of the split view.
   * @memberof linkManager
   * @param {string} path navigation path
   * @param {Object} splitViewSettings opens a view in a split view. Use these settings to configure the split view's behaviour
   * @param {string} splitViewSettings.title split view title. By default, it is the node label. If there is no label, it is left empty
   * @param {number} [splitViewSettings.size=40] height of the split view in percent
   * @param {boolean} [splitViewSettings.collapsed=false] opens split view in collapsed state
   * @returns {Object} an instance of the SplitView. It provides functions to control its behavior.
   * @see {@link https://docs.luigi-project.io/docs/luigi-client-api?section=splitview|SplitView Client} for further documentation. These methods from the Client SplitView are also implemented for Luigi Core: `close`, `collapse`, `expand`, `isCollapsed`, `isExpanded`, `exists`
   *
   * @since 0.7.6
   * @example
   * LuigiClient.linkManager().openAsSplitView('projects/pr1/users', {title:'Users', size:'40'});
   */
  openAsSplitView: (path: string, splitViewSettings?: SplitViewSettings) => SplitViewInstance;

  /**
   * Opens a view in a drawer. You can specify if the drawer has a header, if a backdrop is active in the background and configure the size of the drawer. By default the header is shown. The backdrop is not visible and has to be activated. The size of the drawer is by default set to `s` which means 25% of the micro frontend size. You can also use `l`(75%), `m`(50%) or `xs`(15.5%). Optionally, use it in combination with any of the navigation functions.
   * @memberof linkManager
   * @param {string} path navigation path
   * @param {Object} [drawerSettings] opens a view in a drawer. Use these settings to configure if the drawer has a header, backdrop and size.
   * @param {any} drawerSettings.header By default, the header is visible. Title is node label and 'x' is displayed to close the drawer view. The header could also be an object with a `title` attribute to specify an own title for the drawer component.
   * @param {boolean} drawerSettings.backdrop By default, it is set to `false`. If it is set to `true` the rest of the screen has a backdrop.
   * @param {('l'|'m'|'s'|'xs')} [drawerSettings.size="s"] size of the drawer
   * @since 1.6.0
   * @example
   * LuigiClient.linkManager().openAsDrawer('projects/pr1/drawer', {header:true, backdrop:true, size:'s'});
   * LuigiClient.linkManager().openAsDrawer('projects/pr1/drawer', {header:{title:'My drawer component'}, backdrop:true, size:'xs'});
   */
  openAsDrawer: (nodepath: string, drawerSettings?: DrawerSettings) => void;

  /**
   * Sets the current navigation context to that of a specific parent node which has the {@link navigation-configuration.md navigationContext} field declared in the navigation configuration. This navigation context is then used by the `navigate` function.
   * @memberof linkManager
   * @param {string} navigationContext
   * @returns {linkManager} link manager instance
   * @example
   * LuigiClient.linkManager().fromContext('project').navigate('/settings')
   */
  fromContext: (navigationContext: string) => this;

  /**
   * Sets the current navigation context which is then used by the `navigate` function. This has to be a parent navigation context, it is not possible to use the child navigation contexts.
   * @memberof linkManager
   * @returns {linkManager} link manager instance
   * @example
   * LuigiClient.linkManager().fromClosestContext().navigate('/users/groups/stakeholders')
   */
  fromClosestContext: () => this;

  /**
   * Sets the current navigation base to the parent node that is defined as virtualTree. This method works only when the currently active micro frontend is inside a virtualTree.
   * @memberof linkManager
   * @returns {linkManager} link manager instance
   * @since 1.0.1
   * @example
   * LuigiClient.linkManager().fromVirtualTreeRoot().navigate('/users/groups/stakeholders')
   */
  fromVirtualTreeRoot: () => this;

  /**
   * Sends node parameters to the route. The parameters are used by the `navigate` function. Use it optionally in combination with any of the navigation functions and receive it as part of the context object in Luigi Client.
   * @memberof linkManager
   * @param {Object} nodeParams
   * @returns {linkManager} link manager instance
   * @example
   * LuigiClient.linkManager().withParams({foo: "bar"}).navigate("path")
   *
   * // Can be chained with context setting functions such as:
   * LuigiClient.linkManager().fromContext("currentTeam").withParams({foo: "bar"}).navigate("path")
   */
  withParams: (nodeParams: NodeParams) => this;

  /** @lends linkManager */
  /**
   * Checks if the path you can navigate to exists in the main application. For example, you can use this helper method conditionally to display a DOM element like a button.
   * @memberof linkManager
   * @param {string} path path which existence you want to check
   * @returns {promise} a promise which resolves to a Boolean variable specifying whether the path exists or not
   * @example
   *  let pathExists;
   *  LuigiClient
   *  .linkManager()
   *  .pathExists('projects/pr2')
   *  .then(
   *    (pathExists) => {  }
   *  );
   */
  pathExists: (path: string) => Promise<boolean>;

  /**
   * Discards the active view and navigates back to the last visited view. Works with preserved views, and also acts as the substitute of the browser **back** button. **goBackContext** is only available when using preserved views.
   * @memberof linkManager
   * @param {any} goBackValue data that is passed in the **goBackContext** field to the last visited view when using preserved views
   * @example
   * LuigiClient.linkManager().goBack({ foo: 'bar' });
   * LuigiClient.linkManager().goBack(true);
   */
  goBack: (goBackValue: any) => this;

  /**
   * Checks if there is one or more preserved views. You can use it to show a **back** button.
   * @memberof linkManager
   * @returns {boolean} indicating if there is a preserved view you can return to
   */
  hasBack: () => boolean;
}

export declare class LuigiElement extends HTMLElement {
  constructor(options?: Options);
  /**
   * Override to return the html template string defining the web component view.
   *
   * @param {*} ctx The context object passed by luigi core
   */
  render(ctx?: Object): string;
  /**
   * Override to execute logic after an attribute of this web component has changed.
   */
  update(): void;
  /**
   * Override to execute logic when a new context object is set.
   *
   * @param {*} ctx The new context object passed by luigi core
   */
  onContextUpdate(ctx: Object): void;
  /**
   * Override to execute logic after initialization of the web component, i.e.
   * after internal rendering and all context data set.
   *
   * @param {*} ctx The context object passed by luigi core
   */
  afterInit(ctx: Object): void;

  /**
   * Query selector operating on shadow root.
   *
   * @see ParentNode.querySelector
   */
  querySelector(selector: string): any;

  /**
   * LuigiClient instance
   */
  LuigiClient: LuigiClient;

  /**
   * Context object
   * @returns {Object} context object
   */
  get context(): Object;
}

export declare interface Options {
  /**
   *
   *if `true` shadowRoot mode is "open" otherwise shadowRoot mode is "closed".
   */
  openShadow: boolean;
}

/**
 * Html string processing according to luigi functionality.
 * Also useful in combination with LitElement VS Code plugins.
 *
 * @param {String} literal The literal to process.
 * @returns {String} Returns the processed literal.
 */
export declare const html: (strings: TemplateStringsArray, ...keys: unknown[]) => string;

export interface LuigiClient {
  /**
   * @returns {Object} node parameters, where the object property name is the node parameter name without the prefix, and its value is the value of the node parameter. For example `{sort: 'asc', page: 3}`
   * @memberof LuigiClient
   */
  getActiveFeatureToggles: () => Array<String>;
  /**
   * Gets the current locale.
   * @returns {string} current locale
   * @memberof LuigiClient
   */
  getCurrentLocale: () => string;
  linkManager: () => LinkManager;
  uxManager: () => UxManager;
  publishEvent: (event: Event) => void;
}
