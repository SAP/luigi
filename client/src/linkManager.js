import { LuigiClientBase } from './baseClass';
import { helpers } from './helpers';

/**
 * The Link Manager allows you to navigate to another route. Use it instead of an internal router to:
  - Provide routing inside micro front-ends.
  - Reflect the route.
  - Keep the navigation state in Luigi.
  * @name linkManager
  */
export class linkManager extends LuigiClientBase {
  /**
   * @private
   */
  constructor(values) {
    // @param {Object} values TODO: is it necessary at all, where is it used?
    super();
    Object.assign(this, values);

    this.options = {
      preserveView: false,
      nodeParams: {},
      errorSkipNavigation: false,
      fromContext: null,
      fromClosestContext: false,
      relative: false,
      link: ''
    };
  }

  /**
   * Navigates to the given path in the application hosted by Luigi. It contains either a full absolute path or a relative path without a leading slash that uses the active route as a base. This is the standard navigation.
   * @memberof linkManager
   * @param {string} path path to be navigated to
   * @param {string} sessionId current Luigi **sessionId**
   * @param {boolean} preserveView preserve a view by setting it to `true`. It keeps the current view opened in the background and opens the new route in a new frame. Use the {@link #goBack goBack()} function to navigate back. You can use this feature across different levels. Preserved views are discarded as soon as the standard {@link #navigate navigate()} function is used instead of {@link #goBack goBack()}
   * @param {Object} modalSettings opens a view in a modal. Use these settings to configure the modal's title and size
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
   * @param {('l'|'m'|'s')} [modalSettings.size="l"] size of the modal
   * @example
   * LuigiClient.linkManager().navigate('/overview')
   * LuigiClient.linkManager().navigate('users/groups/stakeholders')
   * LuigiClient.linkManager().navigate('/settings', null, true) // preserve view
   */
  navigate(path, sessionId, preserveView, modalSettings) {
    if (this.options.errorSkipNavigation) {
      this.options.errorSkipNavigation = false;
      return;
    }
    this.options.preserveView = preserveView;
    const relativePath = path[0] !== '/';
    const navigationOpenMsg = {
      msg: 'luigi.navigation.open',
      sessionId: sessionId,
      params: Object.assign(this.options, {
        link: path,
        relative: relativePath,
        modal: modalSettings
      })
    };
    window.parent.postMessage(navigationOpenMsg, '*');
  }

  /**
   * Opens a view in a modal. You can specify the modal's title and size. If you don't specify the title, it is the node label. If there is no node label, the title remains empty.  The default size of the modal is `l`, which means 80%. You can also use `m` (60%) and `s` (40%) to set the modal size. Optionally, use it in combination with any of the navigation functions.
   * @memberof linkManager
   * @param {string} path navigation path
   * @param {Object} [modalSettings] opens a view in a modal. Use these settings to configure the modal's title and size
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
   * @param {('l'|'m'|'s')} [modalSettings.size="l"] size of the modal
   * @example
   * LuigiClient.linkManager().openAsModal('projects/pr1/users', {title:'Users', size:'m'});
   */
  openAsModal(path, modalSettings) {
    this.navigate(path, 0, true, modalSettings || {});
  }

  /**
   * Sets the current navigation context to that of a specific parent node which has the {@link navigation-configuration.md navigationContext} field declared in the navigation configuration. This navigation context is then used by the `navigate` function.
   * @memberof linkManager
   * @param {string} navigationContext
   * @returns {linkManager} link manager instance
   * @example
   * LuigiClient.linkManager().fromContext('project').navigate('/settings')
   */
  fromContext(navigationContext) {
    const navigationContextInParent =
      this.currentContext.context.parentNavigationContexts.indexOf(
        navigationContext
      ) !== -1;
    if (navigationContextInParent) {
      this.options.fromContext = navigationContext;
    } else {
      this.options.errorSkipNavigation = true;
      console.error(
        'Navigation not possible, navigationContext ' +
          navigationContext +
          ' not found.'
      );
    }
    return this;
  }

  /**
   * Sets the current navigation context which is then used by the `navigate` function. This has to be a parent navigation context, it is not possible to use the child navigation contexts.
   * @memberof linkManager
   * @returns {linkManager} link manager instance
   * @example
   * LuigiClient.linkManager().fromClosestContext().navigate('/users/groups/stakeholders')
   */
  fromClosestContext() {
    const hasParentNavigationContext =
      this.currentContext.context.parentNavigationContexts.length > 0;
    if (hasParentNavigationContext) {
      this.options.fromContext = null;
      this.options.fromClosestContext = true;
    } else {
      console.error(
        'Navigation not possible, no parent navigationContext found.'
      );
    }
    return this;
  }

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
  withParams(nodeParams) {
    if (nodeParams) {
      Object.assign(this.options.nodeParams, nodeParams);
    }
    return this;
  }

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
  pathExists(path) {
    const currentId = Date.now();
    const pathExistsPromises = this.getPromise('pathExistsPromises') || {};
    pathExistsPromises[currentId] = {
      resolveFn: function() {},
      then: function(resolveFn) {
        this.resolveFn = resolveFn;
      }
    };
    this.setPromise('pathExistsPromises', pathExistsPromises);

    // register event listener, which will be cleaned up after this usage
    helpers.addEventListener(
      'luigi.navigation.pathExists.answer',
      function(e, listenerId) {
        const data = e.data.data;
        const pathExistsPromises = this.getPromise('pathExistsPromises') || {};
        if (pathExistsPromises[data.correlationId]) {
          pathExistsPromises[data.correlationId].resolveFn(data.pathExists);
          delete pathExistsPromises[data.correlationId];
          this.setPromise('pathExistsPromises', pathExistsPromises);
        }
        helpers.removeEventListener(listenerId);
      }.bind(this)
    );

    const pathExistsMsg = {
      msg: 'luigi.navigation.pathExists',
      data: {
        id: currentId,
        link: path,
        relative: path[0] !== '/'
      }
    };
    window.parent.postMessage(pathExistsMsg, '*');
    return pathExistsPromises[currentId];
  }

  /**
   * Checks if there is one or more preserved views. You can use it to show a **back** button.
   * @memberof linkManager
   * @returns {boolean} indicating if there is a preserved view you can return to
   */
  hasBack() {
    return (
      !!this.currentContext.internal.modal ||
      this.currentContext.internal.viewStackSize !== 0
    );
  }

  /**
   * Discards the active view and navigates back to the last visited view. Works with preserved views, and also acts as the substitute of the browser **back** button. **goBackContext** is only available when using preserved views.
   * @memberof linkManager
   * @param {any} goBackValue data that is passed in the **goBackContext** field to the last visited view when using preserved views.
   * @example
   * LuigiClient.linkManager().goBack({ foo: 'bar' });
   * LuigiClient.linkManager().goBack(true);
   */
  goBack(goBackValue) {
    window.parent.postMessage(
      {
        msg: 'luigi.navigation.back',
        goBackContext: goBackValue && JSON.stringify(goBackValue)
      },
      '*'
    );
  }
}
