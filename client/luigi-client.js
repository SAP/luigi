(function(root, factory) {
  // UMD wrapper
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LuigiClient = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {
  // Object.assign polyfill
  if (typeof Object.assign != 'function') {
    Object.defineProperty(Object, 'assign', {
      value: function assign(target, varArgs) {
        'use strict';
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource != null) {
            for (var nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }

  // actual Luigi code
  var luigiInitialized = false;
  var defaultContextKeys = ['context', 'internal', 'nodeParams', 'pathParams'];
  var currentContext = defaultContextKeys.reduce(function(acc, key) {
    acc[key] = {};
    return acc;
  }, {});

  var _onContextUpdatedFns = {};
  var _onInitFns = {};
  var authData = {};
  var pathExistsPromises = {};

  /**
   * Creates a random Id
   * @private
   */
  function _getRandomId() {
    return Math.floor(Math.random() * 1e9) + '';
  }

  /**
   * Iterates over an object and executes all top-level functions
   * with a given payload.
   * @private
   */
  function _callAllFns(objWithFns, payload) {
    for (var id in objWithFns) {
      if (
        objWithFns.hasOwnProperty(id) &&
        typeof objWithFns[id] == 'function'
      ) {
        objWithFns[id](payload);
      }
    }
  }

  /**
   * Adds event listener for communication with Luigi Core and starts communication
   * @private
   */
  function luigiClientInit() {
    /**
     * Save context data every time navigation to a different node happens
     * @private
     */
    function setContext(rawData) {
      for (var index = 0; index < defaultContextKeys.length; index++) {
        var key = defaultContextKeys[index];
        try {
          rawData[key] = JSON.parse(rawData[key]);
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
    }

    function setAuthData(eventPayload) {
      if (eventPayload) {
        authData = eventPayload;
      }
    }

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

        window.parent.postMessage({ msg: 'luigi.navigate.ok' }, '*');
      } else if ('luigi.auth.tokenIssued' === e.data.msg) {
        setAuthData(e.data.authData);
      }

      if ('luigi.navigation.pathExists.answer' === e.data.msg) {
        var data = e.data.data;
        pathExistsPromises[data.correlationId].resolveFn(data.pathExists);
        delete pathExistsPromises[data.correlationId];
      }
    });

    window.parent.postMessage({ msg: 'luigi.get-context' }, '*');
  }

  luigiClientInit();

  return {
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
      if (luigiInitialized) {
        _callAllFns(_onInitFns, currentContext.context);
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
      if (luigiInitialized) {
        _callAllFns(_onContextUpdatedFns, currentContext.context);
      }
      return id;
    },
    /**
     * Removes a context update listener.
     * @param {string} id the id that was returned by the `addContextUpdateListener` function
     * @memberof lifecycle
     */
    removeContextUpdateListener: function removeContextUpdateListener(id) {
      if (_onContextUpdatedFns[id]) {
        _onContextUpdatedFns[id] = undefined;
        return true;
      }
      return false;
    },
    getToken: function getToken() {
      return authData.accessToken;
    },
    /**
     * Returns the context object. Typically it is not required as the {@link #addContextUpdateListener addContextUpdateListener()} receives the same values.
     * @returns {Object} current context data.
     * @memberof lifecycle
     */
    getEventData: function getEventData() {
      return currentContext.context;
    },
    /**
     * Returns the node parameters of the active URL.
     * Node parameters are defined like URL query parameters but with a specific prefix allowing Luigi to pass them to the micro front-end view.  The default prefix is **~** and you can use it in the following way: `https://my.luigi.app/home/products?~sort=asc~page=3`.
     * @returns {Object} node parameters, where the object property name is the node parameter name without the prefix, and its value is the value of the node parameter. For example `{sort: 'asc', page: 3}`.
     * @memberof lifecycle
     */
    getNodeParams: function getNodeParams() {
      return currentContext.nodeParams;
    },
    /**
     * Returns the dynamic path parameters of the active URL.
     * Path parameters are defined by navigation nodes with a dynamic **pathSegment** value starting with **:**, such as **productId**.
     * All path parameters in the current navigation path (as defined by the active URL) are returned.
     * @returns {Object} path parameters, where the object property name is the path parameter name without the prefix, and its value is the actual value of the path parameter. For example ` {productId: 1234, ...}`.
     * @memberof lifecycle
     */
    getPathParams: function getPathParams() {
      return currentContext.pathParams;
    },
    /**
     * The Link Manager allows you to navigate to another route. Use it instead of an internal router to:
      - Route inside micro front-ends.
      - Reflect the route.
      - Keep the navigation state in Luigi.
     */
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
         * Navigates to the given path in application hosted by Luigi. It contains either a full absolute path or a relative path without a leading slash that uses the active route as a base. This is the standard navigation.
         * @param {string} path path to be navigated to
         * @param {string} sessionId current Luigi **sessionId**
         * @param {boolean} preserveView Preserve a view by setting it to `true`. It keeps the current view opened in the background and opens the new route in a new frame. Use the {@link #goBack goBack()} function to navigate back. You can use this feature across different levels. Preserved views are discarded as soon as the standard {@link #navigate navigate()} function is used instead of {@link #goBack goBack()}.
         * @example
         * LuigiClient.linkManager().navigate('/overview')
         * LuigiClient.linkManager().navigate('users/groups/stakeholders')
         * LuigiClient.linkManager().navigate('/settings', null, true) // preserve view
         */
        navigate: function navigate(path, sessionId, preserveView) {
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
              relative: relativePath
            })
          };
          window.parent.postMessage(navigationOpenMsg, '*');
        },

        /**
         * Sets the current navigation context to that of a specific parent node which has the {@link navigation-configuration.md navigationContext} field declared in the navigation configuration. This navigation context is then used by the `navigate` function.
         * @param {Object} navigationContext
         * @returns {linkManager} link manager instance.
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
         * @returns {linkManager} link manager instance.
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
         * @returns {linkManager} link manager instance.
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
         * Checks if the path you can navigate to exists in the main application. For example, you can use this helper method conditionally display a DOM element like a button.
         * @param {string} path path which existence you want to check
         * @returns {promise} A promise which resolves to a Boolean variable specifying whether the path exists or not.
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
         * @returns {boolean} indicating if there is a preserved view you can return to.
         */
        hasBack: function hasBack() {
          return Boolean(currentContext.internal.viewStackSize !== 0);
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
    /**
     * Use the UX Manager to manage the appearance features in Luigi.
     */
    uxManager: function uxManager() {
      return {
        /** @lends uxManager */
        /**
         * Adds a backdrop with a loading indicator for the micro front-end frame. This overrides the {@link navigation-configuration.md#nodes loadingIndicator.enabled} setting.
         */
        showLoadingIndicator: function showLoadingIndicator() {
          window.parent.postMessage(
            { msg: 'luigi.show-loading-indicator' },
            '*'
          );
        },
        /**
         * Removes the loading indicator. Use it after calling {@link #showLoadingIndicator showLoadingIndicator()} or to hide the indicator when you use the {@link navigation-configuration.md#nodes loadingIndicator.hideAutomatically: false} node configuration.
         */
        hideLoadingIndicator: function hideLoadingIndicator() {
          window.parent.postMessage(
            { msg: 'luigi.hide-loading-indicator' },
            '*'
          );
        },
        /**
         * Adds a backdrop to block the top and side navigation. It is based on the Fundamental UI Modal, which you can use in your micro front-end to achieve the same behavior.
         */
        addBackdrop: function addBackdrop() {
          window.parent.postMessage({ msg: 'luigi.add-backdrop' }, '*');
        },
        /**
         * Removes the backdrop.
         */
        removeBackdrop: function removeBackdrop() {
          window.parent.postMessage({ msg: 'luigi.remove-backdrop' }, '*');
        }
      };
    }
  };
});
