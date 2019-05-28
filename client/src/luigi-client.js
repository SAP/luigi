import { lifecycleManager } from './lifecycleManager';
import { linkManager } from './linkManager';
import { uxManager } from './uxManager';

/**
 * Create as less instances as possible, so we
 * instantiate once here and reuse.
 * @private
 */
const uxManagerInstance = new uxManager();
const lifecycleManagerInstance = new lifecycleManager();

/**
 * @name LuigiClient
 * @private
 */
class LuigiClient {
  addInitListener(initFn) {
    return lifecycleManagerInstance.addInitListener(initFn);
  }
  removeInitListener(id) {
    return lifecycleManagerInstance.removeInitListener(id);
  }
  addContextUpdateListener(contextUpdatedFn) {
    return lifecycleManagerInstance.addContextUpdateListener(contextUpdatedFn);
  }
  removeContextUpdateListener(id) {
    return lifecycleManagerInstance.removeContextUpdateListener(id);
  }
  getToken() {
    return lifecycleManagerInstance.getToken();
  }
  getEventData() {
    return lifecycleManagerInstance.getEventData();
  }
  getNodeParams() {
    return lifecycleManagerInstance.getNodeParams();
  }
  getPathParams() {
    return lifecycleManagerInstance.getPathParams();
  }
  /**
   * @private
   */
  linkManager() {
    return new linkManager({
      currentContext: lifecycleManagerInstance.currentContext
    });
  }
  /**
   * @private
   */
  uxManager() {
    return uxManagerInstance;
  }
  /**
   * @private
   */
  lifecycleManager() {
    return lifecycleManagerInstance;
  }
}
export default (LuigiClient = new LuigiClient());
