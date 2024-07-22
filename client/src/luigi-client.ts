import {
  AuthData,
  ClientPermissions,
  Context,
  CoreSearchParams,
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
      if (window.document.head.getAttribute('disable-luigi-history-handling') !== 'true') {
        history.pushState = history.replaceState.bind(history);
      }

      if (window.document.head.getAttribute('disable-luigi-runtime-error-handling') !== 'true') {
        window.addEventListener('error', ({ filename, message, lineno, colno, error }: ErrorEvent) => {
          const msg: Record<string, any> = {
            errorObj: { filename, message, lineno, colno, error },
            msg: 'luigi-runtime-error-handling'
          };

          helpers.sendPostMessageToLuigiCore(msg);
        });
      }
    }
  }

  addInitListener(initFn: (context: Context, origin?: string) => void): number {
    return lifecycleManager.addInitListener(initFn);
  }

  removeInitListener(id: string): boolean {
    return lifecycleManager.removeInitListener(id);
  }

  addContextUpdateListener(contextUpdatedFn: (context: Context) => void): string {
    return lifecycleManager.addContextUpdateListener(contextUpdatedFn);
  }

  removeContextUpdateListener(id: string): boolean {
    return lifecycleManager.removeContextUpdateListener(id);
  }

  getToken(): AuthData['accessToken'] {
    return lifecycleManager.getToken();
  }

  getEventData(): Context {
    return lifecycleManager.getEventData();
  }

  getContext(): Context {
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

  addCoreSearchParams(searchParams: CoreSearchParams, keepBrowserHistory: boolean): void {
    return lifecycleManager.addCoreSearchParams(searchParams, keepBrowserHistory);
  }

  getClientPermissions(): ClientPermissions {
    return lifecycleManager.getClientPermissions();
  }

  sendCustomMessage(message: Object): void {
    return lifecycleManager.sendCustomMessage(message);
  }

  addCustomMessageListener(messageId: string, listener: (customMessage: Object, listenerId: string) => void): string {
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

const _luigiClient = new LuigiClient();

(window as any).LuigiClient = _luigiClient;

export default _luigiClient;

export const addInitListener = (initFn: (context: Context, origin?: string) => void): number =>
  _luigiClient.addInitListener(initFn);

export const removeInitListener = (id: string): boolean => _luigiClient.removeInitListener(id);

export const addContextUpdateListener = (contextUpdatedFn: (context: Context) => void): string =>
  _luigiClient.addContextUpdateListener(contextUpdatedFn);

export const removeContextUpdateListener = (id: string): boolean => _luigiClient.removeContextUpdateListener(id);

export const addInactiveListener = (inactiveFn: () => void): string => _luigiClient.addInactiveListener(inactiveFn);

export const removeInactiveListener = (id: string): boolean => _luigiClient.removeInactiveListener(id);

export const addCustomMessageListener = (
  customMessageId: string,
  customMessageListener: (customMessage: Object, listenerId: string) => void
): string => _luigiClient.addCustomMessageListener(customMessageId, customMessageListener);

export const removeCustomMessageListener = (id: string): boolean => _luigiClient.removeCustomMessageListener(id);

export const getToken = (): AuthData['accessToken'] => _luigiClient.getToken();

export const getEventData = (): Context => _luigiClient.getEventData();

export const getContext = (): Context => _luigiClient.getContext();

export const addNodeParams = (params: NodeParams, keepBrowserHistory: boolean): void =>
  _luigiClient.addNodeParams(params, keepBrowserHistory);

export const getNodeParams = (shouldDesanitise?: boolean): NodeParams => _luigiClient.getNodeParams(shouldDesanitise);

export const getActiveFeatureToggles = (): string[] => _luigiClient.getActiveFeatureToggles();

export const getPathParams = (): PathParams => _luigiClient.getPathParams();

export const getAnchor = (): string => _luigiClient.getAnchor();

export const setAnchor = (anchor: string): void => _luigiClient.setAnchor(anchor);

export const setViewGroupData = (value: Object): void => _luigiClient.setViewGroupData(value);

export const getCoreSearchParams = (): CoreSearchParams => _luigiClient.getCoreSearchParams();

export const addCoreSearchParams = (searchParams: CoreSearchParams, keepBrowserHistory: boolean): void =>
  _luigiClient.addCoreSearchParams(searchParams, keepBrowserHistory);

export const getClientPermissions = (): ClientPermissions => _luigiClient.getClientPermissions();

export const setTargetOrigin = (targetOrigin: string): void => _luigiClient.setTargetOrigin(targetOrigin);

export const sendCustomMessage = (message: object): void => _luigiClient.sendCustomMessage(message);

export const getUserSettings = (): UserSettings => _luigiClient.getUserSettings();

export const isLuigiClientInitialized = (): boolean => _luigiClient.isLuigiClientInitialized();

export const luigiClientInit = (): void => _luigiClient.luigiClientInit();
