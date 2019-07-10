import { lifecycleManager } from './lifecycleManager';
import { linkManager } from './linkManager';
import { uxManager } from './uxManager';
import { helpers } from './helpers';

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
  getNodeParams() {
    return lifecycleManager.getNodeParams();
  }
  getPathParams() {
    return lifecycleManager.getPathParams();
  }
  setTrustedDomainList(arr) {
    return helpers.setTrustedDomainList(arr);
  }
  /**
   * @private
   */
  linkManager() {
    return new linkManager({
      currentContext: lifecycleManager.currentContext,
      origin: helpers.getTrustedOrigin()
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
