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
import _clientBuilder from './clientBuilder';

/**
 * @name LuigiClient
 * @private
 */
namespace LuigiClient {
  export const addInitListener = (initFn: (context: Context, origin?: string) => void): number =>
    _clientBuilder.addInitListener(initFn as any);

  export const removeInitListener = (id: string): boolean => _clientBuilder.removeInitListener(id);

  export const addContextUpdateListener = (contextUpdatedFn: (context: Context) => void): string =>
    _clientBuilder.addContextUpdateListener(contextUpdatedFn as any);

  export const removeContextUpdateListener = (id: string): boolean => _clientBuilder.removeContextUpdateListener(id);

  export const addInactiveListener = (inactiveFn: () => void): string => _clientBuilder.addInactiveListener(inactiveFn);

  export const removeInactiveListener = (id: string): boolean => _clientBuilder.removeInactiveListener(id);

  export const addCustomMessageListener = (
    customMessageId: string,
    customMessageListener: (customMessage: Object, listenerId: string) => void
  ): string => _clientBuilder.addCustomMessageListener(customMessageId, customMessageListener);

  export const removeCustomMessageListener = (id: string): boolean => _clientBuilder.removeCustomMessageListener(id);

  export const getToken = (): AuthData['accessToken'] => _clientBuilder.getToken();

  export const getEventData = (): Context => _clientBuilder.getEventData();

  export const getContext = (): Context => _clientBuilder.getContext();

  export const addNodeParams = (params: NodeParams, keepBrowserHistory: boolean): void =>
    _clientBuilder.addNodeParams(params, keepBrowserHistory);

  export const getNodeParams = (shouldDesanitise?: boolean): NodeParams =>
    _clientBuilder.getNodeParams(shouldDesanitise);

  export const getActiveFeatureToggles = (): string[] => _clientBuilder.getActiveFeatureToggles();

  export const getPathParams = (): PathParams => _clientBuilder.getPathParams();

  export const getAnchor = (): string => _clientBuilder.getAnchor();

  export const setAnchor = (anchor: string): void => _clientBuilder.setAnchor(anchor);

  export const setViewGroupData = (value: Object): void => _clientBuilder.setViewGroupData(value);

  export const getCoreSearchParams = (): CoreSearchParams => _clientBuilder.getCoreSearchParams();

  export const addCoreSearchParams = (searchParams: CoreSearchParams, keepBrowserHistory: boolean): void =>
    _clientBuilder.addCoreSearchParams(searchParams, keepBrowserHistory);

  export const getClientPermissions = (): ClientPermissions => _clientBuilder.getClientPermissions();

  export const setTargetOrigin = (targetOrigin: string): void => _clientBuilder.setTargetOrigin(targetOrigin);

  export const sendCustomMessage = (message: object): void => _clientBuilder.sendCustomMessage(message);

  export const getUserSettings = (): UserSettings => _clientBuilder.getUserSettings();

  export const isLuigiClientInitialized = (): boolean => _clientBuilder.isLuigiClientInitialized();

  export const luigiClientInit = (): void => _clientBuilder.luigiClientInit();

  export const lifecycleManager = (): any => _clientBuilder.lifecycleManager();

  export const linkManager = (): LinkManager => _clientBuilder.linkManager();

  export const uxManager = (): UxManager => _clientBuilder.uxManager();

  export const storageManager = (): StorageManager => _clientBuilder.storageManager();
}

(window as any).LuigiClient = LuigiClient || {};

export default _clientBuilder;
