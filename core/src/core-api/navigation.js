import { linkManager } from './_internalLinkManager';

class LuigiNavigationManager {
  /**
   * Use these functions for navigation-related features.
   * @name LuigiNavigation
   */
  constructor() {}

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
   * @example
   * Luigi.navigation().navigate('/overview')
   * Luigi.navigation().navigate('users/groups/stakeholders')
   * Luigi.navigation().navigate('/settings', null, true) // preserve view
   */
  navigate(path, preserveView, modalSettings) {
    return new linkManager().navigate(path, preserveView, modalSettings);
  }

  /**
   * Opens a view in a modal. You can specify the modal's title and size. If you don't specify the title, it is the node label. If there is no node label, the title remains empty.  The default size of the modal is `l`, which means 80%. You can also use `m` (60%) and `s` (40%) to set the modal size. Optionally, use it in combination with any of the navigation functions.
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
}

export const navigation = new LuigiNavigationManager();
