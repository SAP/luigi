import { LuigiClientBase } from './baseClass';
import { helpers } from './helpers';

/**
 * Use the functions and parameters to define the Lifecycle of listeners, navigation nodes, and Event data.
 * @name Lifecycle
 */
class LifecycleManager extends LuigiClientBase {
  /** @private */
  constructor() {
    super();
    this.luigiInitialized = false;
    this.defaultContextKeys = [
      'context',
      'internal',
      'nodeParams',
      'pathParams'
    ];
    this.setCurrentContext(
      this.defaultContextKeys.reduce(function(acc, key) {
        acc[key] = {};
        return acc;
      }, {})
    );

    this._onContextUpdatedFns = {};
    this._onInitFns = {};
    this.authData = {};

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
        for (let index = 0; index < this.defaultContextKeys.length; index++) {
          let key = this.defaultContextKeys[index];
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
        this.setCurrentContext(rawData);
      };

      const setAuthData = eventPayload => {
        if (eventPayload) {
          this.authData = eventPayload;
        }
      };

      helpers.addEventListener('luigi.init', e => {
        setContext(e.data);
        setAuthData(e.data.authData);
        this.luigiInitialized = true;
        this.notifyInit();
      });

      helpers.addEventListener('luigi.auth.tokenIssued', e => {
        setAuthData(e.data.authData);
      });

      helpers.addEventListener('luigi.navigate', e => {
        setContext(e.data);
        if (!this.currentContext.internal.isNavigateBack) {
          window.location.replace(e.data.viewUrl);
        }

        // execute the context change listener if set by the microfrontend
        this.notifyUpdate();

        window.parent.postMessage(
          {
            msg: 'luigi.navigate.ok'
          },
          '*'
        );
      });

      /**
       * Get context once initially
       * @private
       */
      window.parent.postMessage(
        {
          msg: 'luigi.get-context'
        },
        '*'
      );
    };

    luigiClientInit();
  }

  /**
   * Iterates over an object and executes all top-level functions
   * with a given payload.
   * @private
   * @memberof Lifecycle
   */
  _callAllFns(objWithFns, payload) {
    for (let id in objWithFns) {
      if (objWithFns.hasOwnProperty(id) && helpers.isFunction(objWithFns[id])) {
        objWithFns[id](payload);
      }
    }
  }

  /**
   * Notifies all context init listeners.
   * @private
   * @memberof Lifecycle
   */
  notifyInit() {
    this._callAllFns(this._onInitFns, this.currentContext.context);
  }

  /**
   * Notifies all context update listeners.
   * @private
   * @memberof Lifecycle
   */
  notifyUpdate() {
    this._callAllFns(this._onContextUpdatedFns, this.currentContext.context);
  }

  /**
   * @private
   * @memberof Lifecycle
   */
  setCurrentContext(value) {
    this.currentContext = value;
  }

  /**
   * Registers a listener called with the context object as soon as Luigi is instantiated. Defer your application bootstrap if you depend on authentication data coming from Luigi.
   * @param {function} initFn the function that is called once Luigi is initialized
   * @memberof Lifecycle
   */
  addInitListener(initFn) {
    var id = helpers.getRandomId();
    this._onInitFns[id] = initFn;
    if (this.luigiInitialized && helpers.isFunction(initFn)) {
      initFn(this.currentContext.context);
    }
    return id;
  }
  /**
   * Removes an init listener.
   * @param {string} id the id that was returned by the `addInitListener` function
   * @memberof Lifecycle
   */
  removeInitListener(id) {
    if (this._onInitFns[id]) {
      this._onInitFns[id] = undefined;
      return true;
    }
    return false;
  }
  /**
   * Registers a listener called with the context object upon any navigation change.
   * @param {function} contextUpdatedFn the listener function called each time Luigi context changes
   * @memberof Lifecycle
   */
  addContextUpdateListener(contextUpdatedFn) {
    var id = helpers.getRandomId();
    this._onContextUpdatedFns[id] = contextUpdatedFn;
    if (this.luigiInitialized && helpers.isFunction(contextUpdatedFn)) {
      contextUpdatedFn(this.currentContext.context);
    }
    return id;
  }
  /**
   * Removes a context update listener.
   * @param {string} id the id that was returned by the `addContextUpdateListener` function
   * @memberof Lifecycle
   */
  removeContextUpdateListener(id) {
    if (this._onContextUpdatedFns[id]) {
      this._onContextUpdatedFns[id] = undefined;
      return true;
    }
    return false;
  }

  /**
   * Returns the currently valid access token.
   * @returns {string} current access token
   * @memberof Lifecycle
   */
  getToken() {
    return this.authData.accessToken;
  }

  /**
   * Returns the context object. Typically it is not required as the {@link #addContextUpdateListener addContextUpdateListener()} receives the same values.
   * @returns {Object} current context data
   * @memberof Lifecycle
   */
  getEventData() {
    return this.currentContext.context;
  }
  /**
   * Returns the context object. It is an alias function for getEventData().
   * @returns {Object} current context data
   * @memberof Lifecycle
   */
  getContext() {
    return this.getEventData();
  }
  /**
   * Returns the node parameters of the active URL.
   * Node parameters are defined like URL query parameters but with a specific prefix allowing Luigi to pass them to the micro front-end view.  The default prefix is **~** and you can use it in the following way: `https://my.luigi.app/home/products?~sort=asc~page=3`.
   * >**NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in node parameters are HTML-encoded.
   * @returns {Object} node parameters, where the object property name is the node parameter name without the prefix, and its value is the value of the node parameter. For example `{sort: 'asc', page: 3}`
   * @memberof Lifecycle
   */
  getNodeParams() {
    return this.currentContext.nodeParams;
  }
  /**
   * Returns the dynamic path parameters of the active URL.
   * Path parameters are defined by navigation nodes with a dynamic **pathSegment** value starting with **:**, such as **productId**.
   * All path parameters in the current navigation path (as defined by the active URL) are returned.
   * >**NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in path parameters are HTML-encoded.
   * @returns {Object} path parameters, where the object property name is the path parameter name without the prefix, and its value is the actual value of the path parameter. For example ` {productId: 1234, ...}`
   * @memberof Lifecycle
   */
  getPathParams() {
    return this.currentContext.pathParams;
  }
}
export const lifecycleManager = new LifecycleManager();
