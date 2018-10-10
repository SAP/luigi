(function (root, factory) { // UMD wrapper
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LuigiClient = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () { // actual Luigi code

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

  var Luigi = {};
  var currentContext = {};
  var defaultContextKeys = ['context', 'internal', 'nodeParams', 'pathParams'];
  var _contextUpdated;

  // Setting default context as empty objects.
  for (var i = 0; i < defaultContextKeys.length; i++) {
    currentContext[defaultContextKeys[i]] = {};
  }

  function requestContext() {
    window.parent.postMessage({ msg: 'luigi.get-context' }, '*');
  }

  function setContext(rawData) {
    for (var index = 0; index < defaultContextKeys.length; index++) {
      var key = defaultContextKeys[index];
      try {
        rawData[key] = JSON.parse(rawData[key]);
      } catch (e) {
        console.info('unable to parse luigi context data for', key, rawData[key], e);
      }
    }
    currentContext = rawData;

    Luigi.token = currentContext.context.idToken;
  }

  function hasHash(string) {
    return string.indexOf('#') !== -1;
  }

  window.addEventListener('message', function messageListener(e) {
    if ('luigi.init' === e.data.msg) {
      setContext(e.data);
      Luigi.initialized = true;
      if (window._init) {
        window._init(currentContext.context);
      }
    }
    if ('luigi.navigate' === e.data.msg) {
      setContext(e.data);

      if (hasHash(e.data.viewUrl) && hasHash(window.location.href)) {
        window.location.hash = e.data.viewUrl.split('#')[1];
      } else {
        window.location.replace(e.data.viewUrl);
      }

      // let the app know that context was updated
      if (_contextUpdated) {
        _contextUpdated(currentContext.context);
      }

      window.parent.postMessage({ msg: 'luigi.navigate.ok' }, '*');
    }
  });

  requestContext();

  return {
    /**
     * Adds a listener that will react once Luigi is initialized.
     * @param {function} initFn - a function that will be called once Luigi is initialized
     */
    addInitListener: function addInitListener(initFn) {
      window._init = initFn;
      if (Luigi.initialized && window._init) {
        window._init(currentContext.context);
      }
    },
    /**
     * Use it to get Luigi context changes
     * @param contextUpdatedFn a function that will be called every time Luigi context was changed
     */
    addContextUpdateListener: function addContextUpdateListener(contextUpdatedFn) {
      _contextUpdated = contextUpdatedFn;
      if (Luigi.initialized && _contextUpdated) {
        _contextUpdated(currentContext.context);
      }
    },
    /**
     * Fetch context object containing:
     * idToken
     * sessionId
     * currentEnvironmentId
     */
    getEventData: function getEventData() {
      return currentContext.context;
    },
    /**
     * Fetch node parameters
     */
    getNodeParams: function getNodeParams() {
      return currentContext.nodeParams;
    },
    /**
     * Fetch node parameters
     */
    getPathParams: function getPathParams() {
      return currentContext.pathParams;
    },
    /**
     * Navigate to another route.
     * Lets you navigate to another route.
     */
    linkManager: function linkManager() {
      var options = {
        preserveView: false,
        nodeParams: {}
      };

      /**
       * Internal function which creates the navigation postMessage for Luigi Core
       *
       * @param {string} path path to be navigated to
       * @param {string} sessionId  current Luigi sessionId
       */
      var _navigate = function _navigate(sessionId, path) {
        var relativePath = path[0] !== '/';
        var navigation = {
          msg: 'luigi.navigation.open',
          sessionId: sessionId,
          params: Object.assign(
            { link: path },
            { relative: relativePath },
            options
          )
        };
        window.parent.postMessage(navigation, '*');
      };

      return {
        /**
         * Navigates to the given path in the hosting Luigi app.
         * @param {string} path path to be navigated to
         * @param {string} sessionId  current Luigi sessionId
         * @param {boolean} preserveView open route in a new view window to goBack to last state afterwards
         */
        navigate: function navigate(path, sessionId, preserveView) {
          if (options.errorSkipNavigation) {
            options.errorSkipNavigation = undefined;
            return;
          }
          options.preserveView = preserveView;
          _navigate(sessionId, path);
        },

        /**
         * Sets the current navigation context, which is then be used by navigate function
         * Usage: linkManager.fromContext("currentTeam").navigate("path")
         * @param {object} navigationContext
         * */
        fromContext: function fromContext(navigationContext) {
          if (!currentContext.context.parentNavigationContexts.includes(navigationContext)) {
            options.errorSkipNavigation = true;
            console.error(
              'Navigation not possible, navigationContext ' +
              navigationContext +
              ' not found.'
            );
          } else {
            options.fromContext = navigationContext;
          }
          return this;
        },

        /**
         * Sets the current navigation context, which is then be used by navigate function
         * This has to be a parent navigation context, it is not possible to go to child navigation contexts
         * Usage: linkManager.fromClosestContext().navigate("path")
         */
        fromClosestContext: function fromClosestContext() {
          if (currentContext.context.parentNavigationContexts.length === 0) {
            console.error(
              'Navigation not possible, no parent navigationContext found.'
            );
          } else {
            delete options.fromContext;
            options.fromClosestContext = true;
          }
          return this;
        },

        /**
         * Adds node parameters, which are then used by the navigate function
         * Usage: linkManager.withParams({foo: "bar"}).navigate("path")
         * Can be chained with context settings functions like this: linkManager.fromContext("currentTeam").withParams({foo: "bar"}).navigate("path")
         * @param {object} nodeParams
         * */
        withParams: function withParams(nodeParams) {
          if (nodeParams) {
            Object.assign(options.nodeParams, nodeParams);
          }
          return this;
        },

        /**
         * If navigate was called with preserveView, this function
         * returns truthy. Can be used to show a back button
         * @return boolean
         */
        hasBack: function hasBack() {
          return Boolean(
            currentContext.internal.viewStackSize !== 0
          );
        },

        /**
         * Goes back to the last state, if preserveView was set before
         *
         * LuigiClient.linkManager().goBack({ foo: 'bar' });
         * LuigiClient.linkManager().goBack(true);
         *
         * @param {mixed} goBackValue data that is handed over as goBackContext after going back
         * @return void
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
     * Manage UX specific options.
     */
    uxManager: function uxManager() {
      return {
        /**
         * Shows a spinner with backdrop to block the micro front-end frame
         */
        showLoadingIndicator: function showLoadingIndicator() {
          window.parent.postMessage({ msg: 'luigi.show-loading-indicator' }, '*');
        },
        /**
         * Hides the spinner
         */
        hideLoadingIndicator: function hideLoadingIndicator() {
          window.parent.postMessage({ msg: 'luigi.hide-loading-indicator' }, '*');
        },
        /**
         * Adds a backdrop for Core to block the UI
         */
        addBackdrop: function addBackdrop() {
          window.parent.postMessage({ msg: 'luigi.add-backdrop' }, '*');
        },
        /**
         * Removes the backdrop
         */
        removeBackdrop: function removeBackdrop() {
          window.parent.postMessage({ msg: 'luigi.remove-backdrop' }, '*');
        }
      };
    }
  };
}));
