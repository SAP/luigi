(function (root, factory) { // UMD wrapper
  if (typeof define === 'function' && define.amd) {
    define([], factory);
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

    var eventData = {};
    var nodeParams = {};
    var Luigi = {};
    var internalData = {};
    var _contextUpdated;

    function requestContext() {
      window.parent.postMessage({ msg: 'luigi.get-context' }, '*');
    }

    function setInternalData(rawData) {
      if (typeof rawData === 'string') {
        try {
          internalData = JSON.parse(rawData);
        } catch (e) {
          console.info('unable to parse luigi context data', e);
        }
      } else {
        internalData = rawData;
      }
    }

    function setContext(rawData, rawParams) {
      if (typeof rawData === 'string') {
        try {
          eventData = JSON.parse(rawData);
        } catch (e) {
          console.info('unable to parse luigi context data', e);
        }
      } else {
        eventData = rawData;
      }

      Luigi.token = eventData.idToken;
      Luigi.linkManagerData = eventData.linkManagerData;
      Luigi.currentEnvironmentId = eventData.currentEnvironmentId;
      Luigi.sessionId = eventData.sessionId;

      if (typeof rawParams === 'string') {
        try {
          nodeParams = JSON.parse(rawParams);
        } catch (e) {
          console.info('unable to parse luigi context data', e);
        }
      } else {
        nodeParams = rawParams;
      }

      // let the app know that context was updated
      if (_contextUpdated) {
        _contextUpdated(eventData);
      }
    }

    function hasHash(string) {
      return string.indexOf('#') !== -1;
    }

    window.addEventListener('message', function (e) {
      if ('luigi.init' === e.data.msg) {
        setInternalData(e.data.internal);
        setContext(e.data.context, e.data.nodeParams);
        Luigi.initialized = true;
        if (window._init) {
          window._init(eventData);
        }
      }
      if ('luigi.navigate' === e.data.msg) {
        setInternalData(e.data.internal);
        setContext(e.data.context, e.data.nodeParams);

        if (hasHash(e.data.viewUrl) && hasHash(window.location.href)) {
          window.location.hash = e.data.viewUrl.split('#')[1];
        } else {
          window.location.replace(e.data.viewUrl);
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
      addInitListener: function(initFn) {
        window._init = initFn;
        if (Luigi.initialized && window._init) {
          window._init(eventData);
        }
      },
      /**
       * Use it to get Luigi context changes
       * @param contextUpdatedFn a function that will be called every time Luigi context was changed
       */
      addContextUpdateListener: function(contextUpdatedFn) {
        _contextUpdated = contextUpdatedFn;
        if (Luigi.initialized && _contextUpdated) {
          _contextUpdated(eventData);
        }
      },
      /**
       * Fetch context object containing:
       * idToken
       * sessionId
       * currentEnvironmentId
       */
      getEventData: function() {
        return eventData;
      },
      /**
       * Fetch node parameters
       */
      getNodeParams: function() {
        return nodeParams;
      },
      /**
       * Navigate to another route.
       * Lets you navigate to another route.
       */
      linkManager: function() {
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
        var _navigate = function(sessionId, path) {
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
          navigate: function(path, sessionId, preserveView) {
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
          fromContext: function(navigationContext) {
            if (!eventData.parentNavigationContexts.includes(navigationContext)) {
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
          fromClosestContext: function() {
            if (eventData.parentNavigationContexts.length === 0) {
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
          withParams: function(nodeParams) {
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
          hasBack: function() {
            return Boolean(
              internalData.viewStackSize && internalData.viewStackSize !== 0
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
          goBack: function(goBackValue) {
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
      uxManager: function() {
        return {
          /**
           * Adds a backdrop for Core to block the UI
           */
          addBackdrop: function() {
            window.parent.postMessage({ msg: 'luigi.add-backdrop' }, '*');
          },
          /**
           * Removes the backdrop
           */
          removeBackdrop: function() {
            window.parent.postMessage({ msg: 'luigi.remove-backdrop' }, '*');
          }
        };
      }
    };
}));
