import { linkManager } from './linkManager';
import { uxManager } from './uxManager';

const uxManagerInstance = new uxManager();

let luigiInitialized = false;
const defaultContextKeys = ['context', 'internal', 'nodeParams', 'pathParams'];
let currentContext = defaultContextKeys.reduce(function(acc, key) {
  acc[key] = {};
  return acc;
}, {});

const _onContextUpdatedFns = {};
const _onInitFns = {};
let authData = {};

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
    } else if ('luigi.ux.confirmationModal.hide' === e.data.msg) {
      console.log('hide confirmationModal', e.data.data);
      uxManagerInstance.hideConfirmationModal(e.data.data);
    } else if ('luigi.ux.alert.hide' === e.data.msg) {
      console.log('hideAlert', e.data.id);
      uxManagerInstance.hideAlert(e.data.id);
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

/** @private */
const LuigiClient = {
  /**
   * Use the functions and parameters to define the Lifecycle of listeners, navigation nodes, and Event data.
   * @name Lifecycle
   */
  /**
   * Registers a listener called with the context object as soon as Luigi is instantiated. Defer your application bootstrap if you depend on authentication data coming from Luigi.
   * @param {function} initFn the function that is called once Luigi is initialized
   * @memberof Lifecycle
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
   * @memberof Lifecycle
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
   * @memberof Lifecycle
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
   * @memberof Lifecycle
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
   * @memberof Lifecycle
   */
  getEventData: () => currentContext.context,
  /**
   * Returns the node parameters of the active URL.
   * Node parameters are defined like URL query parameters but with a specific prefix allowing Luigi to pass them to the micro front-end view.  The default prefix is **~** and you can use it in the following way: `https://my.luigi.app/home/products?~sort=asc~page=3`.
   * >**NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in node parameters are HTML-encoded.
   * @returns {Object} node parameters, where the object property name is the node parameter name without the prefix, and its value is the value of the node parameter. For example `{sort: 'asc', page: 3}`
   * @memberof Lifecycle
   */
  getNodeParams: () => currentContext.nodeParams,
  /**
   * Returns the dynamic path parameters of the active URL.
   * Path parameters are defined by navigation nodes with a dynamic **pathSegment** value starting with **:**, such as **productId**.
   * All path parameters in the current navigation path (as defined by the active URL) are returned.
   * >**NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in path parameters are HTML-encoded.
   * @returns {Object} path parameters, where the object property name is the path parameter name without the prefix, and its value is the actual value of the path parameter. For example ` {productId: 1234, ...}`
   * @memberof Lifecycle
   */
  getPathParams: () => currentContext.pathParams,
  /**
   * @private
   */
  linkManager: () => new linkManager({ currentContext }),
  /**
   * @private
   */
  uxManager: () => uxManagerInstance
};
export default LuigiClient;
