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
  var _onContextUpdatedFn;
  var _onInitFn;
  var pathExistsPromises = {};

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

    window.addEventListener('message', function messageListener(e) {
      if ('luigi.init' === e.data.msg) {
        setContext(e.data);
        luigiInitialized = true;
        if (_onInitFn) {
          _onInitFn(currentContext.context);
        }
      }
      if ('luigi.navigate' === e.data.msg) {
        setContext(e.data);
        var hashRoutingModeActive =
          e.data.viewUrl.indexOf('#') !== -1 &&
          window.location.href.indexOf('#') !== -1;
        if (hashRoutingModeActive) {
          window.location.hash = e.data.viewUrl.split('#')[1];
        } else {
          window.location.replace(e.data.viewUrl);
        }

        // execute the context change listener if set by the microfrontend
        if (_onContextUpdatedFn) {
          _onContextUpdatedFn(currentContext.context);
        }

        window.parent.postMessage({ msg: 'luigi.navigate.ok' }, '*');
      }

      if ('luigi.navigation.pathExists.answer' === e.data.msg) {
        var data = e.data.data;
        if (data.pathExists) {
          pathExistsPromises[data.correlationId].success(data);
        } else {
          pathExistsPromises[data.correlationId].error(data);
        }
      }
    });

    window.parent.postMessage({ msg: 'luigi.get-context' }, '*');
  }

  luigiClientInit();

  return {
    /**
     * There are various parameters and functions available to Luigi pertaining to the lifecycle of listeners, navigation nodes, and Event data.
     * @name lifecycle
     */
    /**
     * Registers a listener that is called with a context object as soon as Luigi is instantiated. Defer your application bootstrap if you depend on authentication data from Luigi.
     * @param {function} initFn the function that is called once Luigi is initialized
     * @memberof lifecycle
     */
    addInitListener: function addInitListener(initFn) {
      _onInitFn = initFn;
      if (luigiInitialized && _onInitFn) {
        _onInitFn(currentContext.context);
      }
    },
    /**
     * Registers a listener that is called upon any navigation change.
     * @param {function} contextUpdatedFn the listener function that is called every time Luigi context was changed
     * @memberof lifecycle
     */
    addContextUpdateListener: function addContextUpdateListener(
      contextUpdatedFn
    ) {
      _onContextUpdatedFn = contextUpdatedFn;
      if (luigiInitialized && _onContextUpdatedFn) {
        _onContextUpdatedFn(currentContext.context);
      }
    },
    /**
     * Returns the context object. Typically it is not required as the {@link #addContextUpdateListener addContextUpdateListener()} receives the same values.
     * @returns {{idToken: string, sessionId: string, currentEnvironmentId: string} } node parameters.
     * @memberof lifecycle
     */
    getEventData: function getEventData() {
      return currentContext.context;
    },
    /**
     * Returns the configuration object of the active navigation node.
     * @returns {Object} node parameters.
     * @memberof lifecycle
     */
    getNodeParams: function getNodeParams() {
      return currentContext.nodeParams;
    },
    /**
     * Returns the dynamic path parameters of the active URL.
     * @returns {Object} path parameters.
     * @memberof lifecycle
     */
    getPathParams: function getPathParams() {
      return currentContext.pathParams;
    },
    /**
     * Lets you navigate to another route. Use the Link Manager instead of an internal router to:
      - route inside micro front-ends
      - reflect the route
      - keep the navigation state in Luigi
     */
    linkManager: function linkManager() {
      var options = {
        preserveView: false,
        nodeParams: {},
        errorSkipNavigation: false,
        fromContext: null,
        fromClosestContext: false,
        relativePath: false,
        link: ''
      };

      return {
        /** @lends linkManager */
        pathExists: function pathExists(path) {
          var currentId = Date.now();
          pathExistsPromises[currentId] = {
            success: function() {},
            error: function() {},
            then: function(success, error) {
              this.success = success;
              this.error = error;
            }
          };
          var pathExistsMsg = {
            msg: 'luigi.navigation.pathExists',
            data: {
              path: path,
              id: currentId
            }
          };
          window.parent.postMessage(pathExistsMsg, '*');
          return pathExistsPromises[currentId];
        },

        /** @lends linkManager */
        /**
         * Navigates to the given path in the hosting Luigi app. Contains either a full absolute path or a relative path without a leading slash that uses the active route as a base. This is a classical navigation.
         * @param {string} path path to be navigated to
         * @param {string} sessionId  current Luigi sessionId
         * @param {boolean} preserveView Preserve a view by setting it to `true`. It keeps the current view opened in the background and opens the new route in a new frame. Use the {@link #goBack goBack()} function to navigate back afterwards. You can use this feature at unlimited levels. The preserved views are discarded as soon as the standard {@link #navigate navigate()} function is used in place of {@link #goBack goBack()}.
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
         * Sets the current navigation context to that of a specific parent node that has the {@link navigation-configuration.md navigationContext} field declared in its navigation configuration. This navigation context is then used by navigate function.
         * @param {Object} navigationContext
         * @returns {linkManager} link manager instance.
         * @example
         * LuigiClient.linkManager().fromContext('project').navigate('/settings')
         */
        fromContext: function fromContext(navigationContext) {
          var navigationContextInParent = currentContext.context.parentNavigationContexts.includes(
            navigationContext
          );
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
         * Sets the current navigation context, which is then used by the navigate function. This has to be a parent navigation context, it is not possible to go to child navigation contexts.
         * @returns {linkManager} link manager instance.
         * @example
         * LuigiClient.linkManager().fromClosestContext().navigate('/users/groups/stakeholders')
         */
        fromClosestContext: function fromClosestContext() {
          var hasParentNavigationContext =
            currentContext.context.parentNavigationContexts.length === 0;
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
         * Sends node parameters to the route, which are then used by the navigate function. Use it optionally in combination with any of the navigation functions and receive it as part of the context object in Luigi Client.
         * @param {Object} nodeParams
         * @returns {linkManager} link manager instance.
         * @example
         * LuigiClient.linkManager.withParams({foo: "bar"}).navigate("path")
         *
         * // Can be chained with context settings functions like this:
         * LuigiClient.linkManager.fromContext("currentTeam").withParams({foo: "bar"}).navigate("path")
         */
        withParams: function withParams(nodeParams) {
          if (nodeParams) {
            Object.assign(options.nodeParams, nodeParams);
          }
          return this;
        },

        /**
         * Checks if there are one or more preserved views. Can be used to show a back button.
         * @returns {boolean} a boolean with the information if there is a preserved view available to which a user can return.
         */
        hasBack: function hasBack() {
          return Boolean(currentContext.internal.viewStackSize !== 0);
        },

        /**
         * Discards the active view and navigates back to the last visited view (preserved view), if a preserved view was set before.
         * @param {any} goBackValue data that is handed over in `goBackContext` field to the last visited view
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
     * Use the UX Manager to manage the appearance in Luigi.
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
         * Adds a backdrop to block the top and side navigation. It is based on Fundamental UI Modal, which you can use in your micro front-end to achieve the same behavior.
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
