import { linkManager } from './linkManager';
import { uxManager } from './uxManager';
import { lifecycleManager } from './lifecycleManager';

const uxManagerInstance = new uxManager();
const lifecycleManagerInstance = new lifecycleManager();

/** @private */
const LuigiClient = {
  /**
   * Registers a listener called with the context object as soon as Luigi is instantiated. Defer your application bootstrap if you depend on authentication data coming from Luigi.
   * @param {function} initFn the function that is called once Luigi is initialized
   * @memberof Lifecycle
   */
  addInitListener: initFn => lifecycleManagerInstance.addInitListener(initFn),
  /**
   * Removes an init listener.
   * @param {string} id the id that was returned by the `addInitListener` function
   * @memberof Lifecycle
   */
  removeInitListener: id => lifecycleManagerInstance.removeInitListener(id),
  /**
   * Registers a listener called with the context object upon any navigation change.
   * @param {function} contextUpdatedFn the listener function called each time Luigi context changes
   * @memberof Lifecycle
   */
  addContextUpdateListener: contextUpdatedFn =>
    lifecycleManagerInstance.addContextUpdateListener(contextUpdatedFn),
  /**
   * Removes a context update listener.
   * @param {string} id the id that was returned by the `addContextUpdateListener` function
   * @memberof Lifecycle
   */
  removeContextUpdateListener: id =>
    lifecycleManagerInstance.removeContextUpdateListener(id),
  /**
   * Returns the currently valid access token.
   * @returns {string} current access token
   * @memberof Lifecycle
   */
  getToken: () => lifecycleManagerInstance.getToken(),
  /**
   * Returns the context object. Typically it is not required as the {@link #addContextUpdateListener addContextUpdateListener()} receives the same values.
   * @returns {Object} current context data
   * @memberof Lifecycle
   */
  getEventData: () => lifecycleManagerInstance.getEventData(),
  /**
   * Returns the node parameters of the active URL.
   * Node parameters are defined like URL query parameters but with a specific prefix allowing Luigi to pass them to the micro front-end view.  The default prefix is **~** and you can use it in the following way: `https://my.luigi.app/home/products?~sort=asc~page=3`.
   * >**NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in node parameters are HTML-encoded.
   * @returns {Object} node parameters, where the object property name is the node parameter name without the prefix, and its value is the value of the node parameter. For example `{sort: 'asc', page: 3}`
   * @memberof Lifecycle
   */
  getNodeParams: () => lifecycleManagerInstance.getNodeParams(),
  /**
   * Returns the dynamic path parameters of the active URL.
   * Path parameters are defined by navigation nodes with a dynamic **pathSegment** value starting with **:**, such as **productId**.
   * All path parameters in the current navigation path (as defined by the active URL) are returned.
   * >**NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in path parameters are HTML-encoded.
   * @returns {Object} path parameters, where the object property name is the path parameter name without the prefix, and its value is the actual value of the path parameter. For example ` {productId: 1234, ...}`
   * @memberof Lifecycle
   */
  getPathParams: () => lifecycleManagerInstance.getPathParams(),
  /**
   * @private
   */
  linkManager: () =>
    new linkManager({
      currentContext: lifecycleManagerInstance.currentContext
    }),
  /**
   * @private
   */
  uxManager: () => uxManagerInstance
};
export default LuigiClient;
