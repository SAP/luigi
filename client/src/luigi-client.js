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
  sendCustomMessage(message) {
    return lifecycleManager.sendCustomMessage(message);
  }
  addCustomMessageListener(messageId, listener) {
    return lifecycleManager.addCustomMessageListener(messageId, listener);
  }
  removeCustomMessageListener(listenerId) {
    return lifecycleManager.removeCustomMessageListener(listenerId);
  }
  afterInit() {
    return lifecycleManager.afterInit();
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
