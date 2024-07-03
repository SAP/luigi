import {
  AuthData,
  ClientPermissions,
  CoreSearchParams,
  InternalContext,
  InternalMessageData,
  LinkManager,
  NodeParams,
  PathParams,
  StorageManager,
  UserSettings,
  UxManager
} from '../luigi-client';
import { helpers } from './helpers';
import { lifecycleManager } from './lifecycleManager';
import { linkManager } from './linkManager';
import { storageManager } from './storageManager';
import { uxManager } from './uxManager';

/**
 * @name LuigiClient
 * @private
 */
class LuigiClient {
  constructor() {
    if (window !== window.top) {
      if (
        window.document.head.getAttribute('disable-luigi-history-handling') !==
        'true'
      ) {
        history.pushState = history.replaceState.bind(history);
      }

      if (
        window.document.head.getAttribute(
          'disable-luigi-runtime-error-handling'
        ) !== 'true'
      ) {
        window.addEventListener(
          'error',
          ({ filename, message, lineno, colno, error }: ErrorEvent) => {
            const msg: InternalMessageData = {
              errorObj: { filename, message, lineno, colno, error },
              msg: 'luigi-runtime-error-handling'
            };

            helpers.sendPostMessageToLuigiCore(msg);
          }
        );
      }
    }
  }

  addInitListener(
    initFn: (context: InternalContext, origin?: string) => void
  ): number {
    return lifecycleManager.addInitListener(initFn);
  }

  removeInitListener(id: string): boolean {
    return lifecycleManager.removeInitListener(id);
  }

  addContextUpdateListener(
    contextUpdatedFn: (context: InternalContext) => void
  ): string {
    return lifecycleManager.addContextUpdateListener(contextUpdatedFn);
  }

  removeContextUpdateListener(id: string): boolean {
    return lifecycleManager.removeContextUpdateListener(id);
  }

  getToken(): AuthData['accessToken'] {
    return lifecycleManager.getToken();
  }

  getEventData(): InternalContext {
    return lifecycleManager.getEventData();
  }

  getContext(): InternalContext {
    return lifecycleManager.getContext();
  }

  addNodeParams(params: NodeParams, keepBrowserHistory: boolean): void {
    return lifecycleManager.addNodeParams(params, keepBrowserHistory);
  }

  getNodeParams(shouldDesanitise?: boolean): NodeParams {
    return lifecycleManager.getNodeParams(shouldDesanitise);
  }

  getActiveFeatureToggles(): string[] {
    return lifecycleManager.getActiveFeatureToggles();
  }

  getPathParams(): PathParams {
    return lifecycleManager.getPathParams();
  }

  getCoreSearchParams(): CoreSearchParams {
    return lifecycleManager.getCoreSearchParams();
  }

  addCoreSearchParams(
    searchParams: CoreSearchParams,
    keepBrowserHistory: boolean
  ): void {
    return lifecycleManager.addCoreSearchParams(
      searchParams,
      keepBrowserHistory
    );
  }

  getClientPermissions(): ClientPermissions {
    return lifecycleManager.getClientPermissions();
  }

  sendCustomMessage(message: Object): void {
    return lifecycleManager.sendCustomMessage(message);
  }

  addCustomMessageListener(
    messageId: string,
    listener: (customMessage: Object, listenerId: string) => void
  ): string {
    return lifecycleManager.addCustomMessageListener(messageId, listener);
  }

  removeCustomMessageListener(listenerId: string): boolean {
    return lifecycleManager.removeCustomMessageListener(listenerId);
  }

  addInactiveListener(inactiveFn: () => void): string {
    return lifecycleManager.addInactiveListener(inactiveFn);
  }

  removeInactiveListener(listenerId: string): boolean {
    return lifecycleManager.removeInactiveListener(listenerId);
  }

  setTargetOrigin(origin: string): void {
    return lifecycleManager.setTargetOrigin(origin);
  }

  getUserSettings(): UserSettings {
    return lifecycleManager.getUserSettings();
  }

  isLuigiClientInitialized(): boolean {
    return lifecycleManager.isLuigiClientInitialized();
  }

  luigiClientInit(): void {
    return lifecycleManager.luigiClientInit();
  }

  getAnchor(): string {
    return lifecycleManager.getAnchor();
  }

  setAnchor(value: string): void {
    return lifecycleManager.setAnchor(value);
  }

  setViewGroupData(value: Object): void {
    return lifecycleManager.setViewGroupData(value);
  }

  /**
   * @private
   */
  linkManager(): LinkManager {
    return new linkManager({
      currentContext: lifecycleManager.currentContext
    });
  }

  /**
   * @private
   */
  uxManager(): UxManager {
    return uxManager;
  }

  /**
   * @private
   */
  lifecycleManager(): any {
    return lifecycleManager;
  }

  /**
   * @private
   */
  storageManager(): StorageManager {
    return storageManager;
  }
}

window.LuigiClient = new LuigiClient();
