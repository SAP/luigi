import {
  Context,
  DrawerSettings,
  ModalSettings,
  NodeParams,
  RouteChangingOptions,
  SplitViewInstance,
  SplitViewSettings
} from '../luigi-client';
import { LuigiClientBase } from './baseClass';
import { helpers } from './helpers';
import _lifecycleManager from './lifecycleManager';
import { splitViewHandle } from './splitViewHandle';

/**
 * The Link Manager allows you to navigate to another route. Use it instead of an internal router to:
  - Provide routing inside micro frontends.
  - Reflect the route.
  - Keep the navigation state in Luigi.
  * @name linkManager
  */
class LinkManager extends LuigiClientBase {
  currentContext!: Context;
  private options: Record<string, any>;

  /**
   * @private
   */
  constructor(values: Record<string, any>, options?: Record<string, any>) {
    super();

    Object.assign(this, values);

    this.options = {
      anchor: '',
      errorSkipNavigation: false,
      fromClosestContext: false,
      fromContext: null,
      fromParent: false,
      fromVirtualTreeRoot: false,
      link: '',
      newTab: false,
      nodeParams: {},
      preserveQueryParams: false,
      preserveView: false,
      preventContextUpdate: false,
      preventHistoryEntry: false,
      relative: false
    };

    if (options) {
      Object.assign(this.options, options);
    }
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Navigates to the given path in the application hosted by Luigi. It contains either a full absolute path or a relative path without a leading slash that uses the active route as a base. This is the standard navigation.
   * @memberof linkManager
   * @param {string} path path to be navigated to
   * @param {string} sessionId current Luigi **sessionId**
   * @param {boolean} preserveView preserve a view by setting it to `true`. It keeps the current view opened in the background and opens the new route in a new frame. Use the {@link #goBack goBack()} function to navigate back. You can use this feature across different levels. Preserved views are discarded as soon as you use the standard {@link #navigate navigate()} function instead of {@link #goBack goBack()}
   * @param {Object} modalSettings opens a view in a modal. Use these settings to configure the modal's title and size
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
   * @param {('fullscreen'|'l'|'m'|'s')} [modalSettings.size="l"] size of the modal
   * @param {string} modalSettings.width updates the `width` of the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @param {string} modalSettings.height updates the `height` of the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @param {boolean} modalSettings.keepPrevious Lets you open multiple modals. Keeps the previously opened modal and allows to open another modal on top of the previous one. By default the previous modals are discarded.
   * @param {string} modalSettings.closebtn_data_testid lets you specify a `data_testid` for the close button. Default value is `lui-modal-index-0`. If multiple modals are opened the index will be increased per modal.
   * @param {Object} splitViewSettings opens a view in a split view. Use these settings to configure the split view's behaviour
   * @param {string} splitViewSettings.title split view title. By default, it is the node label. If there is no label, it is left empty
   * @param {number} [splitViewSettings.size=40] height of the split view in percent
   * @param {boolean} [splitViewSettings.collapsed=false] creates split view but leaves it closed initially
   * @param {Object} drawerSettings opens a view in a drawer. Use these settings to configure if the drawer has a header, backdrop and size.
   * @param {any} drawerSettings.header By default, the header is visible. The default title is the node label, but the header could also be an object with a `title` attribute allowing you to specify your own title.  An 'x' icon is displayed to close the drawer view.
   * @param {boolean} drawerSettings.backdrop By default, it is set to `false`. If it is set to `true` the rest of the screen has a backdrop.
   * @param {('l'|'m'|'s'|'xs')} [drawerSettings.size="s"] size of the drawer
   * @example
   * LuigiClient.linkManager().navigate('/overview')
   * LuigiClient.linkManager().navigate('users/groups/stakeholders')
   * LuigiClient.linkManager().navigate('/settings', null, true) // preserve view
   * LuigiClient.linkManager().navigate('#?Intent=Sales-order?id=13') // intent navigation
   */
  navigate(
    path: string,
    sessionId?: string,
    preserveView?: boolean,
    modalSettings?: ModalSettings,
    splitViewSettings?: SplitViewSettings,
    drawerSettings?: DrawerSettings
  ): void {
    if (this.options['errorSkipNavigation']) {
      this.options['errorSkipNavigation'] = false;

      return;
    }

    if (modalSettings && splitViewSettings && drawerSettings) {
      console.warn(
        'modalSettings, splitViewSettings and drawerSettings cannot be used together. Only modal setting will be taken into account.'
      );
    }

    this.options['preserveView'] = preserveView;

    const relativePath: boolean = path[0] !== '/';

    if (path === '/' && (modalSettings || splitViewSettings || drawerSettings)) {
      console.warn('Navigation with an absolute path prevented.');
      return;
    }

    const navigationOpenMsg: Record<string, any> = {
      msg: 'luigi.navigation.open',
      sessionId: sessionId,
      params: Object.assign(this.options, {
        link: path,
        relative: relativePath,
        intent: helpers.hasIntent(path),
        modal: modalSettings,
        splitView: splitViewSettings,
        drawer: drawerSettings
      })
    };

    helpers.sendPostMessageToLuigiCore(navigationOpenMsg);
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Updates path of the modalPathParam when internal navigation occurs.
   * @memberof linkManager
   * @param {string} path
   * @param {boolean} addHistoryEntry adds an entry in the history
   * @param {Object} [modalSettings] opens a view in a modal. Use these settings to configure the modal's title and size
   * @since 1.21.0
   * @example
   * LuigiClient.linkManager().updateModalPathInternalNavigation('microfrontend')
   */
  updateModalPathInternalNavigation(path: string, modalSettings = {}, addHistoryEntry = false): void {
    if (!path) {
      console.warn('Updating path of the modal upon internal navigation prevented. No path specified.');
      return;
    }

    const navigationOpenMsg: Record<string, any> = {
      msg: 'luigi.navigation.updateModalDataPath',
      params: Object.assign(this.options, {
        link: path,
        modal: modalSettings,
        history: addHistoryEntry
      })
    };

    helpers.sendPostMessageToLuigiCore(navigationOpenMsg);
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Offers an alternative way of navigating with intents. This involves specifying a semanticSlug and an object containing
   * parameters.
   * This method internally generates a URL of the form `#?intent=<semantic object>-<action>?<param_name>=<param_value>` through the given
   * input arguments. This then follows a call to the original `linkManager.navigate(...)` function.
   * Consequently, the following calls shall have the exact same effect:
   * - linkManager().navigateToIntent('Sales-settings', {project: 'pr2', user: 'john'})
   * - linkManager().navigate('/#?intent=Sales-settings?project=pr2&user=john')
   * @param {string} semanticSlug concatenation of semantic object and action connected with a dash (-), i.e.: `<semanticObject>-<action>`
   * @param {Object} params an object representing all the parameters passed, i.e.: `{param1: '1', param2: 2, param3: 'value3'}`.
   * @example
   * LuigiClient.linkManager().navigateToIntent('Sales-settings', {project: 'pr2', user: 'john'})
   * LuigiClient.linkManager().navigateToIntent('Sales-settings')
   */
  navigateToIntent(semanticSlug: string, params = {}): void {
    let newPath = '#?intent=';

    newPath += semanticSlug;

    if (params && Object.keys(params)?.length) {
      const paramList: [string, unknown][] = Object.entries(params);

      // append parameters to the path if any
      if (paramList.length > 0) {
        newPath += '?';

        for (const [key, value] of paramList) {
          newPath += key + '=' + value + '&';
        }

        // trim potential excessive ampersand & at the end
        newPath = newPath.slice(0, -1);
      }
    }

    this.navigate(newPath);
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Opens a view in a modal. You can specify the modal's title and size. If you don't specify the title, it is the node label. If there is no node label, the title remains empty.  The default size of the modal is `l`, which means 80%. You can also use `m` (60%) and `s` (40%) to set the modal size. Optionally, use it in combination with any of the navigation functions.
   * @memberof linkManager
   * @param {string} path navigation path
   * @param {Object} [modalSettings] opens a view in a modal. Use these settings to configure the modal's title and size
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
   * @param {('fullscreen'|'l'|'m'|'s')} [modalSettings.size="l"] size of the modal
   * @param {string} modalSettings.width updates the `width` of the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @param {string} modalSettings.height updates the `height` of the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @param {boolean} modalSettings.keepPrevious Lets you open multiple modals. Keeps the previously opened modal and allows to open another modal on top of the previous one. By default the previous modals are discarded.
   * @param {string} modalSettings.closebtn_data_testid lets you specify a `data_testid` for the close button. Default value is `lui-modal-index-0`. If multiple modals are opened the index will be increased per modal.
   * @returns {promise} which is resolved when closing the modal. By using LuigiClient.linkManager().goBack({ foo: 'bar' }) to close the modal you have access to the `goBackContext` when the promise will be resolved.
   * @example
   * LuigiClient.linkManager().openAsModal('projects/pr1/users', {title:'Users', size:'m'}).then((res) => {
   *     // Logic to execute when the modal will be closed
   *     console.log(res.data) //=> {foo: 'bar'}
   *  });
   */
  openAsModal(path: string, modalSettings = {}): Promise<void> {
    helpers.addEventListener('luigi.navigation.modal.close', (event: any, listenerId: string) => {
      const promise = this.getPromise('modal');

      if (promise) {
        promise.resolveFn(event.data);
        this.setPromise('modal', undefined);
      }

      helpers.removeEventListener(listenerId);
    });

    const modalPromise: Record<string, any> = {};

    modalPromise['promise'] = new Promise((resolve, reject) => {
      modalPromise['resolveFn'] = resolve;
      modalPromise['rejectFn'] = reject;
    });

    this.setPromise('modal', modalPromise);
    this.navigate(path, '0', true, modalSettings);

    return modalPromise['promise'];
  }

 /**
   * <!-- label-success: Web Component API  -->
   * Updates the current title and size of a modal. If `routing.showModalPathInUrl` is set to `true`, the URL will be updated with the modal settings data.
   * In addition, you can specify if a new history entry will be created with the updated URL.
   * @memberof linkManager
   * @param {Object} updatedModalSettings possibility to update the active modal.
   * @param {Object} updatedModalSettings.title update the `title` of the active modal.
   * @param {Object} updatedModalSettings.size update the `size` of the active modal.
   * @param {string} updatedModalSettings.width updates the `width` of the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @param {string} updatedModalSettings.height updates the `height` of the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @param {boolean} addHistoryEntry adds an entry in the history, by default it's `false`.
   * @example
   * LuigiClient.linkManager().updateModalSettings({title:'LuigiModal', size:'l'});
   */
  updateModalSettings(updatedModalSettings = {}, addHistoryEntry = false): void {
    const message: Record<string, any> = {
      msg: 'luigi.navigation.updateModalSettings',
      updatedModalSettings,
      addHistoryEntry
    };

    helpers.sendPostMessageToLuigiCore(message);
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Opens a view in a split view. You can specify the split view's title and size. If you don't specify the title, it is the node label. If there is no node label, the title remains empty. The default size of the split view is `40`, which means 40% height of the split view.
   * @memberof linkManager
   * @param {string} path navigation path
   * @param {Object} splitViewSettings opens a view in a split view. Use these settings to configure the split view's behaviour
   * @param {string} splitViewSettings.title split view title. By default, it is the node label. If there is no label, it is left empty
   * @param {number} [splitViewSettings.size=40] height of the split view in percent
   * @param {boolean} [splitViewSettings.collapsed=false] opens split view in collapsed state
   * @returns {Object} instance of the SplitView. It provides Event listeners and you can use the available functions to control its behavior.
   * @see {@link splitView} for further documentation about the returned instance
   * @since 0.6.0
   * @example
   * const splitViewHandle = LuigiClient.linkManager().openAsSplitView('projects/pr1/logs', {title: 'Logs', size: 40, collapsed: true});
   */
  openAsSplitView(path: string, splitViewSettings = {}): SplitViewInstance {
    this.navigate(path, '0', true, undefined, splitViewSettings);

    return (new splitViewHandle(splitViewSettings) as unknown) as SplitViewInstance;
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Opens a view in a drawer. You can specify the size of the drawer, whether the drawer has a header, and whether a backdrop is active in the background. By default, the header is shown. The backdrop is not visible and has to be activated. The size of the drawer is set to `s` by default, which means 25% of the micro frontend size. You can also use `l`(75%), `m`(50%) or `xs`(15.5%). Optionally, use it in combination with any of the navigation functions.
   * @memberof linkManager
   * @param {string} path navigation path
   * @param {Object} drawerSettings opens a view in a drawer. Use these settings to configure if the drawer has a header, backdrop and size.
   * @param {any} drawerSettings.header By default, the header is visible. The default title is the node label, but the header could also be an object with a `title` attribute allowing you to specify your own title.  An 'x' icon is displayed to close the drawer view.
   * @param {boolean} drawerSettings.backdrop By default, it is set to `false`. If it is set to `true` the rest of the screen has a backdrop.
   * @param {('l'|'m'|'s'|'xs')} [drawerSettings.size="s"] size of the drawer
   * @param {boolean} [drawerSettings.overlap=true] enable resizing of main microfrontend iFrame after drawer open
   * @since 1.6.0
   * @example
   * LuigiClient.linkManager().openAsDrawer('projects/pr1/drawer', {header:true, backdrop:true, size:'s'});
   * LuigiClient.linkManager().openAsDrawer('projects/pr1/drawer', {header:{title:'My drawer component'}, backdrop:true, size:'xs'});
   */
  openAsDrawer(path: string, drawerSettings = {}): void {
    this.navigate(path, '0', true, undefined, undefined, drawerSettings);
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Sets the current navigation context to that of a specific parent node which has the {@link navigation-configuration.md navigationContext} field declared in the navigation configuration. This navigation context is then used by the `navigate` function.
   * @memberof linkManager
   * @param {string} navigationContext
   * @returns {linkManager} link manager instance
   * @example
   * LuigiClient.linkManager().fromContext('project').navigate('/settings')
   */
  fromContext(navigationContext: string): LinkManager {
    const navigationContextInParent: boolean = !!(
      _lifecycleManager.currentContext?.context?.parentNavigationContexts?.indexOf(navigationContext) !== -1
    );

    if (navigationContextInParent) {
      this.options['fromContext'] = navigationContext;
    } else {
      this.options['errorSkipNavigation'] = true;
      console.error('Navigation not possible, navigationContext ' + navigationContext + ' not found.');
    }

    return new LinkManager({ currentContext: _lifecycleManager.currentContext }, structuredClone(this.options));
  }

  /**
   * Sets the current navigation context which is then used by the `navigate` function. This has to be a parent navigation context, it is not possible to use the child navigation contexts.
   * @memberof linkManager
   * @returns {linkManager} link manager instance
   * @example
   * LuigiClient.linkManager().fromClosestContext().navigate('/users/groups/stakeholders')
   */
  fromClosestContext(): LinkManager {
    const hasParentNavigationContext: boolean = !!_lifecycleManager.currentContext.context?.parentNavigationContexts?.length;

    if (hasParentNavigationContext) {
      this.options['fromContext'] = null;
      this.options['fromClosestContext'] = true;
    } else {
      console.error('Navigation not possible, no parent navigationContext found.');
    }

    return new LinkManager({ currentContext: _lifecycleManager.currentContext }, structuredClone(this.options));
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Sets the current navigation base to the parent node that is defined as virtualTree. This method works only when the currently active micro frontend is inside a virtualTree.
   * @memberof linkManager
   * @returns {linkManager} link manager instance
   * @since 1.0.1
   * @example
   * LuigiClient.linkManager().fromVirtualTreeRoot().navigate('/users/groups/stakeholders')
   */
  fromVirtualTreeRoot(): LinkManager {
    this.options['fromContext'] = null;
    this.options['fromClosestContext'] = false;
    this.options['fromVirtualTreeRoot'] = true;

    return new LinkManager({ currentContext: _lifecycleManager.currentContext }, structuredClone(this.options));
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Enables navigating to sibling nodes without knowing the absolute path.
   * @memberof linkManager
   * @returns {linkManager} link manager instance
   * @since 1.0.1
   * @example
   * LuigiClient.linkManager().fromParent().navigate('/sibling')
   */
  fromParent(): LinkManager {
    this.options['fromParent'] = true;

    return new LinkManager({ currentContext: _lifecycleManager.currentContext }, structuredClone(this.options));
  }

  /**
   * <!-- label-success: Web Component API  -->
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
  withParams(nodeParams: NodeParams): LinkManager {
    if (nodeParams) {
      Object.assign(this.options['nodeParams'], nodeParams);
    }

    return new LinkManager({ currentContext: _lifecycleManager.currentContext }, structuredClone(this.options));
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Sets options to customise route changing behaviour. The parameters are used by the `navigate` function. Use it optionally in combination with any of the navigation functions and receive it as part of the context object in Luigi Client.
   * @memberof linkManager
   * @param {Object} options navigation options
   * @param {boolean} options.preventHistoryEntry By default, it is set to `false`. If it is set to `true`, there is no browser history being kept.
   * @param {boolean} options.preventContextUpdate By default, it is set to `false`. If it is set to `true`, there is no context update being triggered.
   * @returns {linkManager} link manager instance
   * @since 1.25.0
   * @example
   * LuigiClient.linkManager().withOptions(
   * { preventContextUpdate:true, preventHistoryEntry: true }
   * ).navigate('/overview')
   */
  withOptions(options: RouteChangingOptions): LinkManager {
    if (!helpers.isObject(options)) return new LinkManager({ currentContext: _lifecycleManager.currentContext });

    if (options['preventHistoryEntry'] !== undefined) {
      this.options['preventHistoryEntry'] = options['preventHistoryEntry'];
    }

    if (options['preventContextUpdate'] !== undefined) {
      this.options['preventContextUpdate'] = options['preventContextUpdate'];
    }

    return new LinkManager({ currentContext: _lifecycleManager.currentContext }, structuredClone(this.options));
  }

  /** @lends linkManager */
  /**
   * <!-- label-success: Web Component API  -->
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
  pathExists(path: string): Promise<boolean> {
    const currentId: number = helpers.getRandomId();
    const pathExistsPromises = this.getPromise('pathExistsPromises') || {};

    pathExistsPromises[currentId] = {
      resolveFn: function() {},
      then: function(resolveFn: () => void) {
        this.resolveFn = resolveFn;
      }
    };
    this.setPromise('pathExistsPromises', pathExistsPromises);

    // register event listener, which will be cleaned up after this usage
    helpers.addEventListener('luigi.navigation.pathExists.answer', (event, listenerId) => {
      const data = event.data.data;
      const pathExistsPromises = this.getPromise('pathExistsPromises') || {};

      if (data.correlationId === currentId) {
        if (pathExistsPromises[data.correlationId]) {
          pathExistsPromises[data.correlationId].resolveFn(data.pathExists);
          delete pathExistsPromises[data.correlationId];
          this.setPromise('pathExistsPromises', pathExistsPromises);
        }

        helpers.removeEventListener(listenerId);
      }
    });

    const pathExistsMsg: Record<string, any> = {
      msg: 'luigi.navigation.pathExists',
      data: Object.assign(this.options, {
        id: currentId,
        link: path,
        intent: helpers.hasIntent(path),
        relative: path[0] !== '/'
      })
    };

    helpers.sendPostMessageToLuigiCore(pathExistsMsg);

    return pathExistsPromises[currentId];
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Checks if there is one or more preserved views. You can use it to show a **back** button.
   * @memberof linkManager
   * @returns {boolean} indicating if there is a preserved view you can return to
   */
  hasBack(): boolean {
    return (
      !!(_lifecycleManager.currentContext.internal as Record<string, any>)['modal'] ||
      (_lifecycleManager.currentContext.internal as Record<string, any>)['viewStackSize'] !== 0
    );
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Discards the active view and navigates back to the last visited view. Works with preserved views, and also acts as the substitute of the browser **back** button. **goBackContext** is only available when using preserved views.
   * @memberof linkManager
   * @param {any} goBackValue data that is passed in the **goBackContext** field to the last visited view when using preserved views
   * @example
   * LuigiClient.linkManager().goBack({ foo: 'bar' });
   * LuigiClient.linkManager().goBack(true);
   */
  goBack(goBackValue: any): void {
    helpers.sendPostMessageToLuigiCore({
      msg: 'luigi.navigation.back',
      goBackContext: goBackValue && JSON.stringify(goBackValue)
    });
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Disables the navigation handling for a single navigation request.
   * It prevents Luigi Core from handling the URL change after `navigate()`.
   * Used for auto-navigation.
   * @since 0.7.7
   * @example
   * LuigiClient.linkManager().withoutSync().navigate('/projects/xy/foobar');
   * LuigiClient.linkManager().withoutSync().fromClosestContext().navigate('settings');
   */
  withoutSync(): LinkManager {
    this.options['withoutSync'] = true;

    return new LinkManager({ currentContext: _lifecycleManager.currentContext }, structuredClone(this.options));
  }

  /**
   * Enables navigating to a new tab.
   * @since 1.16.0
   * @example
   * LuigiClient.linkManager().newTab().navigate('/projects/xy/foobar');
   */
  newTab(): LinkManager {
    this.options['newTab'] = true;

    return new LinkManager({ currentContext: _lifecycleManager.currentContext }, structuredClone(this.options));
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Keeps the URL's query parameters for a navigation request.
   * @param {boolean} preserve By default, it is set to `false`. If it is set to `true`, the URL's query parameters will be kept after navigation.
   * @since 1.19.0
   * @example
   * LuigiClient.linkManager().preserveQueryParams(true).navigate('/projects/xy/foobar');
   * LuigiClient.linkManager().preserveQueryParams(false).navigate('/projects/xy/foobar');
   */
  preserveQueryParams(preserve = false): LinkManager {
    this.options['preserveQueryParams'] = preserve;

    return new LinkManager({ currentContext: _lifecycleManager.currentContext }, structuredClone(this.options));
  }

  /**
   * <!-- label-success: Web Component API  -->
   * Gets the luigi route associated with the current micro frontend.
   * @returns {promise} a promise which resolves to a String value specifying the current luigi route
   * @since 1.23.0
   * @example
   * LuigiClient.linkManager().getCurrentRoute();
   * LuigiClient.linkManager().fromContext('project').getCurrentRoute();
   * LuigiClient.linkManager().fromVirtualTreeRoot().getCurrentRoute();
   */
  getCurrentRoute(): Promise<string> {
    const currentId: number = helpers.getRandomId();

    const currentRoutePromise = this.getPromise('getCurrentRoute') || {};

    currentRoutePromise[currentId] = {
      resolveFn: function() {},
      then: function(resolveFn: () => void) {
        this.resolveFn = resolveFn;
      }
    };

    this.setPromise('getCurrentRoute', currentRoutePromise);

    helpers.addEventListener('luigi.navigation.currentRoute.answer', (event, listenerId) => {
      const data = event.data.data;
      const currentRoutePromise = this.getPromise('getCurrentRoute') || {};

      if (data.correlationId === currentId) {
        if (currentRoutePromise[data.correlationId]) {
          currentRoutePromise[data.correlationId].resolveFn(data.route);
          delete currentRoutePromise[data.correlationId];
          this.setPromise('getCurrentRoute', currentRoutePromise);
        }

        helpers.removeEventListener(listenerId);
      }

      helpers.removeEventListener(listenerId);
    });

    helpers.sendPostMessageToLuigiCore({
      msg: 'luigi.navigation.currentRoute',
      data: Object.assign(this.options, {
        id: currentId
      })
    });

    return currentRoutePromise[currentId];
  }
}

const _linkManager = new LinkManager({
  currentContext: _lifecycleManager.currentContext
});

export default _linkManager;
