export namespace Events {
    /**
     * A message emmitted from the Microfrontend when a custom message is sent
     */
    export const CUSTOM_MESSAGE = 'custom-message';
    /**
     * A message emmitted from the Microfrontend when the context data is sent
     */
    export const GET_CONTEXT_REQUEST = 'get-context-request';
    /**
     * A message emmitted from the Microfrontend when a navigation request is sent
     */
    export const NAVIGATION_REQUEST = 'navigation-request';
    /**
     * A message emmitted from the Microfrontend when a request to show an alert is sent
     */
    export const ALERT_REQUEST = 'show-alert-request';
    /**
     * A message emmitted from the Microfrontend when it is first initialized
     */
    export const INITIALIZED = 'initialized';
    /**
     * A message emmitted from the Microfrontend to request adding search parameters to the URL
     */
    export const ADD_SEARCH_PARAMS_REQUEST = 'add-search-params-request';
    /**
     * A message emmitted from the Microfrontend to request adding node parameters to the URL
     */
    export const ADD_NODE_PARAMS_REQUEST = 'add-node-params-request';
    /**
     * A message emmitted from the Microfrontend when a request to show an confirmation modal is sent
     */
    export const SHOW_CONFIRMATION_MODAL_REQUEST = 'show-confirmation-modal-request';
    /**
     * A message emmitted from the Microfrontend when a request to show loading indicator is sent
     */
    export const SHOW_LOADING_INDICATOR_REQUEST = 'show-loading-indicator-request';
    /**
     * A message emmitted from the Microfrontend when a request to hide the loading indicator is sent
     */
    export const HIDE_LOADING_INDICATOR_REQUEST = 'hide-loading-indicator-request';

    /**
     * A message emmitted from the Microfrontend when a request to set the current locale is sent
     */
    export const SET_CURRENT_LOCALE_REQUEST = 'set-current-locale-request';

    /**
     * A message emmitted from the Microfrontend when a request to modify the local storage is sent
     */
    export const LOCAL_STORAGE_SET_REQUEST = 'set-storage-request';

    /**
     * A message emmitted from the Microfrontend when a request to handle an error that happened during the runtime on the microfrontend is sent
     */
    export const RUNTIME_ERROR_HANDLING_REQUEST = 'runtime-error-handling-request';

    /**
     * A message emmitted from the Microfrontend when a request to set the anchor of the URL is sent
     */
    export const SET_ANCHOR_LINK_REQUEST = 'set-anchor-request';

    /**
     * A message emmitted from the Microfrontend when a request to set third party cookies is sent
     */
    export const SET_THIRD_PARTY_COOKIES_REQUEST = 'set-third-party-cookies-request';

    /**
     * A message emmitted from the Microfrontend when a request to navigate back is sent
     */
    export const BACK_NAVIGATION_REQUEST = 'navigate-back-request';

    /**
     * A message emmitted from the Microfrontend when a request to receive the current app route is sent
     */
    export const GET_CURRENT_ROUTE_REQUEST = 'get-current-route-request';

    /**
     * A message emmitted from the Microfrontend to report that the navigation is completed is sent
     */
    export const NAVIGATION_COMPLETED_REPORT = 'report-navigation-completed-request';

    /**
     * A message emmitted from the Microfrontend when a request to update the modal path parameters is sent
     */
    export const UPDATE_MODAL_PATH_DATA_REQUEST = 'update-modal-path-data-requesst';

    /**
     * A message emmitted from the Microfrontend when a request to check on the validity of a path is sent
     */
    export const CHECK_PATH_EXISTS_REQUEST = 'check-path-exists-request';

    /**
     * A message emmitted from the Microfrontend when a request to set the 'dirty status' (ex: avoid closing if usaved changes) is sent
     */
    export const SET_DIRTY_STATUS_REQUEST = 'set-dirty-status-request';
}