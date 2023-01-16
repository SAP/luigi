export namespace Events {
    /**
     * A message emmitted from the Microfrontend when a custom message is sent
     */
    export const CUSTOM_MESSAGE = 'custom-message';
    /**
     * A message emmitted from the Microfrontend when the context data is sent
     */
    export const GET_CONTEXT = 'luigi.init';
    /**
     * A message emmitted from the Microfrontend when a navigation request is sent
     */
    export const NAVIGATION_REQUEST = 'navigation-request';
    /**
     * A message emmitted from the Microfrontend when a request to show an alert is sent
     */
    export const ALERT_REQUEST = 'alert-request';
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
}