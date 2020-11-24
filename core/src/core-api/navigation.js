import { linkManager } from './_internalLinkManager';
import { CustomListenerHelpers } from '../utilities/helpers';
import { EVENT_PREFIXES } from '../utilities/constants';

class LuigiNavigationManager {
  /**
   * Use these functions for navigation-related features.
   * @name LuigiNavigation
   */
  constructor() { }

  /**
   * Refreshes top navigation badge counters by rendering the navigation again.

   * @memberof LuigiNavigation
   * @example
   * Luigi.navigation().updateTopNavigation();
   */
  updateTopNavigation() {
    window.postMessage({ msg: 'luigi.navigation.update-badge-counters' }, '*');
  }

  /**
   * Navigates to the given path in the application. It contains either a full absolute path or a relative path without a leading slash that uses the active route as a base. This is the standard navigation.
   * @memberof LuigiNavigation
   * @param {string} path path to be navigated to
   * @param {boolean} preserveView preserve a view by setting it to `true`. It keeps the current view opened in the background and opens the new route in a new frame. Use the {@link #goBack goBack()} function to navigate back. You can use this feature across different levels. Preserved views are discarded as soon as you use the standard {@link #navigate navigate()} function instead of {@link #goBack goBack()}
   * @param {Object} modalSettings opens a view in a modal. Use these settings to configure the modal's title and size
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
   * @param {('l'|'m'|'s')} [modalSettings.size="l"] size of the modal
   * @param {Object} splitViewSettings opens a view in a split view. Use these settings to configure the split view's behaviour
   * @param {string} splitViewSettings.title split view title. By default, it is the node label. If there is no label, it is left empty
   * @param {number} [splitViewSettings.size=40] height of the split view in percent
   * @param {boolean} [splitViewSettings.collapsed=false] opens split view in collapsed state
   * @param {Object} drawerSettings opens a view in a drawer. Use these settings to configure if the drawer has a header, backdrop and size.
   * @param {any} drawerSettings.header By default, the header is visible. The default title is the node label, but the header could also be an object with a `title` attribute allowing you to specify your own title.  An 'x' icon is displayed to close the drawer view.
   * @param {boolean} drawerSettings.backdrop By default, it is set to `false`. If it is set to `true` the rest of the screen has a backdrop.
   * @param {('l'|'m'|'s'|'xs')} [drawerSettings.size="s"] size of the drawer
   * @example
   * Luigi.navigation().navigate('/overview')
   * Luigi.navigation().navigate('users/groups/stakeholders')
   * Luigi.navigation().navigate('/settings', null, true) // preserve view
   */
  navigate(path, preserveView, modalSettings, splitViewSettings, drawerSettings) {
    return new linkManager().navigate(
      path,
      preserveView,
      modalSettings,
      splitViewSettings,
      drawerSettings
    );
  }

  /**
   * Opens a view in a modal. You can specify the modal's title and size. If you do not specify the title, it is the node label. If there is no node label, the title remains empty.  The default size of the modal is `l`, which means 80%. You can also use `m` (60%) and `s` (40%) to set the modal size. Optionally, use it in combination with any of the navigation functions.
   * @memberof LuigiNavigation
   * @param {string} path navigation path
   * @param {Object} [modalSettings] opens a view in a modal. Use these settings to configure the modal's title and size
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
   * @param {('l'|'m'|'s')} [modalSettings.size="l"] size of the modal
   * @example
   * Luigi.navigation().openAsModal('projects/pr1/users', {title:'Users', size:'m'});
   */
  openAsModal(path, modalSettings) {
    return new linkManager().openAsModal(path, modalSettings);
  }

  /**
   * Opens a view in a split view. You can specify the split view's title and size. If you don't specify the title, it is the node label. If there is no node label, the title remains empty. The default size of the split view is 40, which means 40% height of the split view.
   * @memberof LuigiNavigation
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
   * Luigi.navigation().openAsSplitView('projects/pr1/users', {title:'Users', size:'40'});
   */
  openAsSplitView(path, splitViewSettings = {}) {
    Luigi.splitView.openAsSplitView(path, splitViewSettings);
    return Luigi.splitView.splitViewHandle;
  }

  /**
   * Opens a view in a drawer. You can specify if the drawer has a header, if a backdrop is active in the background and configure the size of the drawer. By default the header is shown. The backdrop is not visible and has to be activated. The size of the drawer is by default set to `s` which means 25% of the micro frontend size. You can also use `l`(75%), `m`(50%) or `xs`(15.5%). Optionally, use it in combination with any of the navigation functions.
   * @memberof LuigiNavigation
   * @param {string} path navigation path
   * @param {Object} [drawerSettings] opens a view in a drawer. Use these settings to configure if the drawer has a header, backdrop and size.
   * @param {any} drawerSettings.header By default, the header is visible. Title is node label and 'x' is displayed to close the drawer view. The header could also be an object with a `title` attribute to specify an own title for the drawer component.
   * @param {boolean} drawerSettings.backdrop By default, it is set to `false`. If it is set to `true` the rest of the screen has a backdrop.
   * @param {('l'|'m'|'s'|'xs')} [drawerSettings.size="s"] size of the drawer
   * @since NEXTRELEASE
   * @example
   * Luigi.navigation().openAsDrawer('projects/pr1/drawer', {header:true, backdrop:true, size:'s'});
   * Luigi.navigation().openAsDrawer('projects/pr1/drawer', {header:{title:'My drawer component'}, backdrop:true, size:'xs'});
   */
  openAsDrawer(path, drawerSettings) {
    return new linkManager().openAsDrawer(path, drawerSettings);
  }

  /**
   * Sets the current navigation context to that of a specific parent node which has the {@link navigation-configuration.md navigationContext} field declared in the navigation configuration. This navigation context is then used by the `navigate` function.
   * @memberof LuigiNavigation
   * @param {string} navigationContext
   * @returns {linkManager} link manager instance
   * @example
   * Luigi.navigation().fromContext('project').navigate('/settings')
   */
  fromContext(navigationContext) {
    return new linkManager().fromContext(navigationContext);
  }

  /**
   * Sets the current navigation context which is then used by the `navigate` function. This has to be a parent navigation context, it is not possible to use the child navigation contexts.
   * @memberof LuigiNavigation
   * @returns {linkManager} link manager instance
   * @example
   * Luigi.navigation().fromClosestContext().navigate('/users/groups/stakeholders')
   */
  fromClosestContext() {
    return new linkManager().fromClosestContext();
  }

  /**
   * Sets the current navigation base to the parent node that is defined as virtualTree. This method works only when the currently active micro frontend is inside a virtualTree.
   * @memberof LuigiNavigation
   * @returns {linkManager} link manager instance
   * @since 1.0.1
   * @example
   * Luigi.navigation().fromVirtualTreeRoot().navigate('/users/groups/stakeholders')
   */
  fromVirtualTreeRoot() {
    return new linkManager().fromVirtualTreeRoot();
  }

  /**
   * Sends node parameters to the route. The parameters are used by the `navigate` function. Use it optionally in combination with any of the navigation functions and receive it as part of the context object in Luigi Client.
   * @memberof LuigiNavigation
   * @param {Object} nodeParams
   * @returns {linkManager} link manager instance
   * @example
   * Luigi.navigation().withParams({foo: "bar"}).navigate("path")
   *
   * // Can be chained with context setting functions such as:
   * Luigi.navigation().fromContext("currentTeam").withParams({foo: "bar"}).navigate("path")
   */
  withParams(nodeParams) {
    return new linkManager().withParams(nodeParams);
  }

  /** @lends linkManager */
  /**
   * Checks if the path you can navigate to exists in the main application. For example, you can use this helper method conditionally to display a DOM element like a button.
   * @memberof LuigiNavigation
   * @param {string} path path which existence you want to check
   * @returns {promise} a promise which resolves to a Boolean variable specifying whether the path exists or not
   * @example
   *  let pathExists;
   *  Luigi
   *  .navigation()
   *  .pathExists('projects/pr2')
   *  .then(
   *    (pathExists) => {  }
   *  );
   */
  pathExists(path) {
    return new linkManager().pathExists(path);
  }

  /**
   * Checks if there is one or more preserved views. You can use it to show a **back** button.
   * @memberof LuigiNavigation
   * @returns {boolean} indicating if there is a preserved view you can return to
   */
  hasBack() {
    return new linkManager().hasBack();
  }

  /**
   * Discards the active view and navigates back to the last visited view. Works with preserved views, and also acts as the substitute of the browser **back** button. **goBackContext** is only available when using preserved views.
   * @memberof LuigiNavigation
   * @param {any} goBackValue data that is passed in the **goBackContext** field to the last visited view when using preserved views
   * @example
   * Luigi.navigation().goBack({ foo: 'bar' });
   * Luigi.navigation().goBack(true);
   */
  goBack(goBackValue) {
    return new linkManager().goBack(goBackValue);
  }

  /**
   * Adds a navigation or profile event listener
   * @memberof LuigiNavigation
   * @param {string} name leftNav, topNav, tabNav, routeChanged, userInfo
   * @param {function} callbackFn gets called on event received
   * @returns {string} listener id
   * @since NEXTRELEASE
   * @example
   * Luigi.navigation().addEventListener('leftNav', (data) => {})
   */
  addEventListener(name, callbackFn) {
    return CustomListenerHelpers.addEventListener(
      EVENT_PREFIXES.navigation + name,
      callbackFn
    );
  }

  /**
   * Removes a navigation event listener
   * @memberof LuigiNavigation
   * @param {string} id listener id
   * @example
   * Luigi.navigation().removeEventListener(listenerId)
   */
  removeEventListener(id) {
    CustomListenerHelpers.removeEventListener(id);
  }
}

export const navigation = new LuigiNavigationManager();
