var client = (function() {
  var eventData = {};

  var Luigi = {};
  var _contextUpdated;

  function requestContext() {
    window.parent.postMessage({ msg: 'luigi.get-context' }, '*');
  }

  function setContext(rawData) {
    if (typeof rawData === 'string') {
      try {
        eventData = JSON.parse(rawData);
      } catch (e) {
        console.log('unable to parse luigi context data', e);
      }
    } else {
      eventData = rawData;
    }

    Luigi.token = eventData.idToken;
    Luigi.linkManagerData = eventData.linkManagerData;
    Luigi.currentEnvironmentId = eventData.currentEnvironmentId;
    Luigi.sessionId = eventData.sessionId;

    // let the app know that context was updated
    if (_contextUpdated) {
      _contextUpdated();
    }
  }

  window.addEventListener('message', function(e) {
    if ('luigi.init' === e.data.msg) {
      setContext(e.data.context);
      Luigi.initialized = true;

      if (window._init) {
        window._init();
      }
    }
    if ('luigi.navigate' === e.data.msg) {
      setContext(e.data.context);
      window.location.replace(e.data.viewUrl);
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
        window._init();
      }
    },
    /**
     * Use it to get Luigi context changes
     * @param contextUpdatedFn a function that will be called every time Luigi context was changed
     */
    addContextUpdateListener: function(contextUpdatedFn) {
      _contextUpdated = contextUpdatedFn;
      if (Luigi.initialized && _contextUpdated) {
        _contextUpdated();
      }
    },
    /**
     * Use it to fetch context object containing:
     * idToken
     * sessionId
     * currentEnvironmentId
     */
    getEventData: function() {
      return eventData;
    },
    /**
     * Lets you navigate to another route.
     */
    linkManager: function() {
      var _navigate = function(sessionId, path, contextParams) {
        var relativePath = path[0] !== '/';
        var navigation = {
          msg: 'luigi.navigation.open',
          sessionId: sessionId,
          params: Object.assign(
            { link: path },
            { relative: relativePath },
            contextParams
          )
        };
        window.parent.postMessage(navigation, '*');
      };

      return {
        /**
         * Navigates to the given path in the hosting Luigi app.
         * @param path path to be navigated to
         * @param sessionId current Luigi sessionId
         */
        navigate: function(path, sessionId) {
          _navigate(sessionId, path);
        },

        /**
         * Sets the current navigation context, which is then be used by navigate function
         * Usage: linkManager.fromContext("currentTeam").navigate("path")
         * @param navigationContext */
        fromContext(navigationContext) {
          if (!eventData.parentNavigationContexts.includes(navigationContext)) {
            console.error(
              `Navigation not possible, navigationContext '${navigationContext}' not found.`
            );
            return { navigate: () => {} };
          }
          return {
            /**
             * Navigates to the given path in the hosting Luigi app, relative to the node in the current path having the given navigation context.
             * @param path path to be navigated to, relative to the node in the current path having the given navigation context
             * @param sessionId current Luigi sessionId
             */
            navigate: (path, sessionId) => {
              _navigate(sessionId, path, { fromContext: navigationContext });
            }
          };
        },

        /**
         * Sets the current navigation context, which is then be used by navigate function
         * This has to be a parent navigation context, it is not possible to go to child navigation contexts
         * Usage: linkManager.fromClosestContext().navigate("path")
         * @param navigationContext */
        fromClosestContext() {
          if (eventData.parentNavigationContexts.length === 0) {
            console.error(
              'Navigation not possible, no parent navigationContext found.'
            );
            return { navigate: () => {} };
          }

          return {
            /**
             * Navigates to the given path in the hosting Luigi app, relative to the closest node in the current path having a navigation context.
             * @param path path to be navigated to, relative to the closest node in the current path having a navigation context
             * @param sessionId current Luigi sessionId
             */
            navigate: (path, sessionId) => {
              _navigate(sessionId, path, { fromClosestContext: true });
            }
          };
        }
      };
    },
    /**
     * Lets you manage UX specific options.
     */
    uxManager: function() {
      return {
        /**
         * Adds a backdrop for core to block the UI
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
})();

export { client as LuigiClient };
