import { uxManager } from './uxManager';

let luigiInitialized = false;
const defaultContextKeys = ['context', 'internal', 'nodeParams', 'pathParams'];
let currentContext = defaultContextKeys.reduce(function(acc, key) {
  acc[key] = {};
  return acc;
}, {});

const _onContextUpdatedFns = {};
const _onInitFns = {};
let authData = {};
const pathExistsPromises = {};

/**
 * Creates a random Id
 * @private
 */
const _getRandomId = () => Math.floor(Math.random() * 1e9) + '';

/**
 * Simple function check.
 * @private
 * @param item mixed
 * @returns {boolean}
 */
const isFunction = item => typeof item === 'function';

/**
 * Iterates over an object and executes all top-level functions
 * with a given payload.
 * @private
 */
const _callAllFns = (objWithFns, payload) => {
  for (var id in objWithFns) {
    if (objWithFns.hasOwnProperty(id) && isFunction(objWithFns[id])) {
      objWithFns[id](payload);
    }
  }
};

/**
 * Adds event listener for communication with Luigi Core and starts communication
 * @private
 */
const luigiClientInit = () => {
  /**
   * Save context data every time navigation to a different node happens
   * @private
   */
  const setContext = rawData => {
    for (var index = 0; index < defaultContextKeys.length; index++) {
      var key = defaultContextKeys[index];
      try {
        if (typeof rawData[key] === 'string') {
          rawData[key] = JSON.parse(rawData[key]);
        }
      } catch (e) {
        console.info(
          'unable to parse luigi context data for',
          key,
          rawData[key],
          e
        );
      }
    }
    currentContext = rawData;
  };

  const setAuthData = eventPayload => {
    if (eventPayload) {
      authData = eventPayload;
    }
  };

  window.addEventListener('message', function messageListener(e) {
    if ('luigi.init' === e.data.msg) {
      setContext(e.data);
      setAuthData(e.data.authData);
      luigiInitialized = true;
      _callAllFns(_onInitFns, currentContext.context);
    } else if ('luigi.navigate' === e.data.msg) {
      setContext(e.data);
      if (!currentContext.internal.isNavigateBack) {
        window.location.replace(e.data.viewUrl);
      }

      // execute the context change listener if set by the microfrontend
      _callAllFns(_onContextUpdatedFns, currentContext.context);

      window.parent.postMessage(
        {
          msg: 'luigi.navigate.ok'
        },
        '*'
      );
    } else if ('luigi.auth.tokenIssued' === e.data.msg) {
      setAuthData(e.data.authData);
    }

    if ('luigi.navigation.pathExists.answer' === e.data.msg) {
      var data = e.data.data;
      pathExistsPromises[data.correlationId].resolveFn(data.pathExists);
      delete pathExistsPromises[data.correlationId];
    }

    if ('luigi.ux.confirmationModal.hide' === e.data.msg) {
      const data = e.data.data;
      const promise = uxManager().getPromise('confirmationModal');
      if (promise) {
        data.confirmed ? promise.resolveFn() : promise.rejectFn();
        uxManager().setPromise('confirmationModal', undefined);
      }
    }

    if ('luigi.ux.alert.hide' === e.data.msg) {
      const { id } = e.data;
      const alerts = uxManager().getPromise('alerts');
      if (id && alerts[id]) {
        alerts[id].resolveFn(id);
        delete alerts[id];
        uxManager().setPromise('alerts', alerts);
      }
    }
  });

  window.parent.postMessage(
    {
      msg: 'luigi.get-context'
    },
    '*'
  );
};

luigiClientInit();

/** @namespace */
const LuigiClient = {
  /**
   * Use the functions and parameters to define the lifecycle of listeners, navigation nodes, and Event data.
   * @name lifecycle
   */
  /**
   * Registers a listener called with the context object as soon as Luigi is instantiated. Defer your application bootstrap if you depend on authentication data coming from Luigi.
   * @param {function} initFn the function that is called once Luigi is initialized
   * @memberof lifecycle
   */
  addInitListener: function addInitListener(initFn) {
    var id = _getRandomId();
    _onInitFns[id] = initFn;
    if (luigiInitialized && isFunction(initFn)) {
      initFn(currentContext.context);
    }
    return id;
  },
  /**
   * Removes an init listener.
   * @param {string} id the id that was returned by the `addInitListener` function
   * @memberof lifecycle
   */
  removeInitListener: function removeInitListener(id) {
    if (_onInitFns[id]) {
      _onInitFns[id] = undefined;
      return true;
    }
    return false;
  },
  /**
   * Registers a listener called with the context object upon any navigation change.
   * @param {function} contextUpdatedFn the listener function called each time Luigi context changes
   * @memberof lifecycle
   */
  addContextUpdateListener: function addContextUpdateListener(
    contextUpdatedFn
  ) {
    var id = _getRandomId();
    _onContextUpdatedFns[id] = contextUpdatedFn;
    if (luigiInitialized && isFunction(contextUpdatedFn)) {
      contextUpdatedFn(currentContext.context);
    }
    return id;
  },
  /**
   * Removes a context update listener.
   * @param {string} id the id that was returned by the `addContextUpdateListener` function
   * @memberof lifecycle
   */
  removeContextUpdateListener: id => {
    if (_onContextUpdatedFns[id]) {
      _onContextUpdatedFns[id] = undefined;
      return true;
    }
    return false;
  },
  getToken: () => authData.accessToken,
  /**
   * Returns the context object. Typically it is not required as the {@link #addContextUpdateListener addContextUpdateListener()} receives the same values.
   * @returns {Object} current context data
   * @memberof lifecycle
   */
  getEventData: () => currentContext.context,
  /**
   * Returns the node parameters of the active URL.
   * Node parameters are defined like URL query parameters but with a specific prefix allowing Luigi to pass them to the micro front-end view.  The default prefix is **~** and you can use it in the following way: `https://my.luigi.app/home/products?~sort=asc~page=3`.
   * >**NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in node parameters are HTML-encoded.
   * @returns {Object} node parameters, where the object property name is the node parameter name without the prefix, and its value is the value of the node parameter. For example `{sort: 'asc', page: 3}`
   * @memberof lifecycle
   */
  getNodeParams: () => currentContext.nodeParams,
  /**
   * Returns the dynamic path parameters of the active URL.
   * Path parameters are defined by navigation nodes with a dynamic **pathSegment** value starting with **:**, such as **productId**.
   * All path parameters in the current navigation path (as defined by the active URL) are returned.
   * >**NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in path parameters are HTML-encoded.
   * @returns {Object} path parameters, where the object property name is the path parameter name without the prefix, and its value is the actual value of the path parameter. For example ` {productId: 1234, ...}`
   * @memberof lifecycle
   */
  getPathParams: () => currentContext.pathParams,
  /**
     * The Link Manager allows you to navigate to another route. Use it instead of an internal router to:
      - Route inside micro front-ends.
      - Reflect the route.
      - Keep the navigation state in Luigi.
     */
  /** @name linkManager */
  linkManager: function linkManager() {
    var options = {
      preserveView: false,
      nodeParams: {},
      errorSkipNavigation: false,
      fromContext: null,
      fromClosestContext: false,
      relative: false,
      link: ''
    };

    return {
      /** @lends linkManager */
      /**
       * Navigates to the given path in the application hosted by Luigi. It contains either a full absolute path or a relative path without a leading slash that uses the active route as a base. This is the standard navigation.
       * @param {string} path path to be navigated to
       * @param {string} [sessionId] current Luigi **sessionId**
       * @param {boolean} [preserveView] preserve a view by setting it to `true`. It keeps the current view opened in the background and opens the new route in a new frame. Use the {@link #goBack goBack()} function to navigate back. You can use this feature across different levels. Preserved views are discarded as soon as the standard {@link #navigate navigate()} function is used instead of {@link #goBack goBack()}
       * @param {Object} [modalSettings] opens a view in a modal. Use these settings to configure the modal's title and size
       * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
       * @param {('l'|'m'|'s')} [modalSettings.size="l"] size of the modal
       * @example
       * LuigiClient.linkManager().navigate('/overview')
       * LuigiClient.linkManager().navigate('users/groups/stakeholders')
       * LuigiClient.linkManager().navigate('/settings', null, true) // preserve view
       */
      navigate: function navigate(
        path,
        sessionId,
        preserveView,
        modalSettings
      ) {
        if (options.errorSkipNavigation) {
          options.errorSkipNavigation = false;
          return;
        }
        options.preserveView = preserveView;
        var relativePath = path[0] !== '/';
        var navigationOpenMsg = {
          msg: 'luigi.navigation.open',
          sessionId: sessionId,
          params: Object.assign(options, {
            link: path,
            relative: relativePath,
            modal: modalSettings
          })
        };
        window.parent.postMessage(navigationOpenMsg, '*');
      },
      /**
       * Opens a view in a modal. You can specify the modal's title and size. If you don't specify the title, it is the node label. If there is no node label, the title remains empty.  The default size of the modal is `l`, which means 80%. You can also use `m` (60%) and `s` (40%) to set the modal size. Optionally, use it in combination with any of the navigation functions.
       * @param {string} path navigation path
       * @param {Object} [modalSettings] opens a view in a modal. Use these settings to configure the modal's title and size
       * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
       * @param {('l'|'m'|'s')} [modalSettings.size="l"] size of the modal
       * @example
       * LuigiClient.linkManager().openAsModal('projects/pr1/users', {title:'Users', size:'m'});
       */
      openAsModal: function(path, modalSettings) {
        this.navigate(path, 0, true, modalSettings || {});
      },
      /**
       * Sets the current navigation context to that of a specific parent node which has the {@link navigation-configuration.md navigationContext} field declared in the navigation configuration. This navigation context is then used by the `navigate` function.
       * @param {string} navigationContext
       * @returns {linkManager} link manager instance
       * @example
       * LuigiClient.linkManager().fromContext('project').navigate('/settings')
       */
      fromContext: function fromContext(navigationContext) {
        var navigationContextInParent =
          currentContext.context.parentNavigationContexts.indexOf(
            navigationContext
          ) !== -1;
        if (navigationContextInParent) {
          options.fromContext = navigationContext;
        } else {
          options.errorSkipNavigation = true;
          console.error(
            'Navigation not possible, navigationContext ' +
              navigationContext +
              ' not found.'
          );
        }
        return this;
      },

      /**
       * Sets the current navigation context which is then used by the `navigate` function. This has to be a parent navigation context, it is not possible to use the child navigation contexts.
       * @returns {linkManager} link manager instance
       * @example
       * LuigiClient.linkManager().fromClosestContext().navigate('/users/groups/stakeholders')
       */
      fromClosestContext: function fromClosestContext() {
        var hasParentNavigationContext =
          currentContext.context.parentNavigationContexts.length > 0;
        if (hasParentNavigationContext) {
          options.fromContext = null;
          options.fromClosestContext = true;
        } else {
          console.error(
            'Navigation not possible, no parent navigationContext found.'
          );
        }
        return this;
      },

      /**
       * Sends node parameters to the route. The parameters are used by the `navigate` function. Use it optionally in combination with any of the navigation functions and receive it as part of the context object in Luigi Client.
       * @param {Object} nodeParams
       * @returns {linkManager} link manager instance
       * @example
       * LuigiClient.linkManager.withParams({foo: "bar"}).navigate("path")
       *
       * // Can be chained with context setting functions such as:
       * LuigiClient.linkManager.fromContext("currentTeam").withParams({foo: "bar"}).navigate("path")
       */
      withParams: function withParams(nodeParams) {
        if (nodeParams) {
          Object.assign(options.nodeParams, nodeParams);
        }
        return this;
      },

      /** @lends linkManager */
      /**
       * Checks if the path you can navigate to exists in the main application. For example, you can use this helper method conditionally to display a DOM element like a button.
       * @param {string} path path which existence you want to check
       * @returns {promise} a promise which resolves to a Boolean variable specifying whether the path exists or not
       * @example
       *  let pathExists;
       *  this.luigiClient
       *  .linkManager()
       *  .pathExists('projects/pr2')
       *  .then(
       *    (pathExists) => {  }
       *  );
       */
      pathExists: function pathExists(path) {
        var currentId = Date.now();
        pathExistsPromises[currentId] = {
          resolveFn: function() {},
          then: function(resolveFn) {
            this.resolveFn = resolveFn;
          }
        };
        var pathExistsMsg = {
          msg: 'luigi.navigation.pathExists',
          data: {
            id: currentId,
            link: path,
            relative: path[0] !== '/'
          }
        };
        window.parent.postMessage(pathExistsMsg, '*');
        return pathExistsPromises[currentId];
      },

      /**
       * Checks if there is one or more preserved views. You can use it to show a **back** button.
       * @returns {boolean} indicating if there is a preserved view you can return to
       */
      hasBack: function hasBack() {
        return (
          !!currentContext.internal.modal ||
          currentContext.internal.viewStackSize !== 0
        );
      },

      /**
       * Discards the active view and navigates back to the last visited view (preserved view), if a preserved view was set before.
       * @param {any} goBackValue data that is passed in the `goBackContext` field to the last visited view
       * @example
       * LuigiClient.linkManager().goBack({ foo: 'bar' });
       * LuigiClient.linkManager().goBack(true);
       */
      goBack: function goBack(goBackValue) {
        if (this.hasBack()) {
          window.parent.postMessage(
            {
              msg: 'luigi.navigation.back',
              goBackContext: goBackValue && JSON.stringify(goBackValue)
            },
            '*'
          );
        }
      }
    };
  },
  uxManager
};
export default LuigiClient;
