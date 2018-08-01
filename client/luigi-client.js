var client = (function() {
  var eventData = {};
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
        console.log('unable to parse luigi context data', e);
      }
    } else {
      internalData = rawData;
    }
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
      _contextUpdated(eventData);
    }
  }

  window.addEventListener('message', function(e) {
    if ('luigi.init' === e.data.msg) {
      setInternalData(e.data.internal);
      setContext(e.data.context);
      Luigi.initialized = true;

      if (window._init) {
        window._init(eventData);
      }
    }
    if ('luigi.navigate' === e.data.msg) {
      setInternalData(e.data.internal);
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
     * Navigate to another route.
     */
    linkManager: function() {
      /**
       * Internal function which creates the navigation postMessage for Luigi Core
       *
       * @param {string} path path to be navigated to
       * @param {string} sessionId  current Luigi sessionId
       * @param {object} contextParams  route specific parameters
       * @param {boolean} preserveView open route in a new view window to goBack to last state afterwards
       */
      var _navigate = function(sessionId, path, contextParams, preserveView) {
        var relativePath = path[0] !== '/';
        var navigation = {
          msg: 'luigi.navigation.open',
          sessionId: sessionId,
          params: Object.assign(
            { link: path },
            { relative: relativePath },
            { preserveView: preserveView },
            contextParams
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
          _navigate(sessionId, path, {}, preserveView);
        },

        /**
         * Sets the current navigation context, which is then be used by navigate function
         * Usage: linkManager.fromContext("currentTeam").navigate("path")
         * @param {object} navigationContext
         * */
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
             * @param {string} path path to be navigated to, relative to the node in the current path having the given navigation context
             * @param {string} sessionId current Luigi sessionId
             * @param {boolean} preserveView open route in a new view window to goBack to last state afterwards
             */
            navigate: (path, sessionId, preserveView) => {
              _navigate(
                sessionId,
                path,
                { fromContext: navigationContext },
                preserveView
              );
            }
          };
        },

        /**
         * Sets the current navigation context, which is then be used by navigate function
         * This has to be a parent navigation context, it is not possible to go to child navigation contexts
         * Usage: linkManager.fromClosestContext().navigate("path")
         */
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
             * @param {string} path path to be navigated to, relative to the closest node in the current path having a navigation context
             * @param {string} sessionId current Luigi sessionId
             * @param {boolean} preserveView create an additional view window to goBack to last state afterwards
             */
            navigate: (path, sessionId, preserveView) => {
              _navigate(
                sessionId,
                path,
                { fromClosestContext: true },
                preserveView
              );
            }
          };
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
              { msg: 'luigi.navigation.back', goBackContext: goBackValue },
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
})();

export { client as LuigiClient };
