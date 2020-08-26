import { lifecycleManager } from './lifecycleManager';
import { linkManager } from './linkManager';
import { uxManager } from './uxManager';

/**
 * @name LuigiClient
 * @private
 */
class LuigiClient {
  constructor() {}

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
  getActiveFeatureToggles() {
    return lifecycleManager.getActiveFeatureToggles();
  }
  getPathParams() {
    return lifecycleManager.getPathParams();
  }
  getClientPermissions() {
    return lifecycleManager.getClientPermissions();
  }
  sendCustomMessage(message) {
    return lifecycleManager.sendCustomMessage(message);
  }
  addCustomMessageListener(messageId, listener) {
    return lifecycleManager.addCustomMessageListener(messageId, listener);
  }
  removeCustomMessageListener(listenerId) {
    return lifecycleManager.removeCustomMessageListener(listenerId);
  }
  addInactiveListener(messageId, listener) {
    return lifecycleManager.addInactiveListener(messageId, listener);
  }
  removeInactiveListener(listenerId) {
    return lifecycleManager.removeInactiveListener(listenerId);
  }
  setTargetOrigin(origin) {
    return lifecycleManager.setTargetOrigin(origin);
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
export default LuigiClient = new LuigiClient();
