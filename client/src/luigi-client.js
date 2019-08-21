import { lifecycleManager } from './lifecycleManager';
import { linkManager } from './linkManager';
import { uxManager } from './uxManager';

/**
 * @name LuigiClient
 * @private
 */
class LuigiClient {
  addInitListener(initFn) {
    return lifecycleManager.addInitListener(initFn);
  }
  removeInitListener(id) {
    return lifecycleManager.removeInitListener(id);
  }
  addContextUpdateListener(contextUpdatedFn) {
    return lifecycleManager.addContextUpdateListener(contextUpdatedFn);
  }
  removeContextUpdateListener(id) {
    return lifecycleManager.removeContextUpdateListener(id);
  }
  getToken() {
    return lifecycleManager.getToken();
  }
  getEventData() {
    return lifecycleManager.getEventData();
  }
  getContext() {
    return lifecycleManager.getContext();
  }
  getNodeParams() {
    return lifecycleManager.getNodeParams();
  }
  getPathParams() {
    return lifecycleManager.getPathParams();
  }
  getClientPermissions() {
    return lifecycleManager.getClientPermissions();
  }
  sendCustomEventToCore(msg, data) {
    return lifecycleManager.sendCustomEventToCore(msg, data);
  }
  addCustomEventListener(msg, data) {
    return lifecycleManager.addCustomEventListener(msg, data);
  }
  removeCustomEventListener(id) {
    return lifecycleManager.removeCustomEventListener(id, data);
  }
  /**
   * @private
   */
  linkManager() {
    return new linkManager({
      currentContext: lifecycleManager.currentContext
    });
  }
  /**
   * @private
   */
  uxManager() {
    return uxManager;
  }
  /**
   * @private
   */
  lifecycleManager() {
    return lifecycleManager;
  }
}
export default (LuigiClient = new LuigiClient());
