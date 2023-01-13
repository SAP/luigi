export namespace LuigiMessageID {
    /**
     * A message emmitted from the Microfrontend when a custom message is sent
     */
    export const CUSTOM_MESSAGE = 'custom';
    /**
     * A message emmitted from the Microfrontend when the context data is sent
     */
    export const GET_CONTEXT = 'luigi.get-context';
    /**
     * A message emmitted from the Microfrontend when a navigation request is sent
     */
    export const NAVIGATION_REQUEST = 'luigi.navigation.open';
    /**
     * A message emmitted from the Microfrontend when a request to show an alert is sent
     */
    export const ALERT_REQUEST = 'luigi.ux.alert.show';
    /**
     * A message emmitted from the Microfrontend when it is first initialized
     */
    export const INITIALIZED = 'luigi.init.ok';
    /**
     * A message emmitted from the Microfrontend to request adding search parameters to the URL
     */
    export const ADD_SEARCH_PARAMS_REQUEST = 'luigi.addSearchParams';
    /**
     * A message emmitted from the Microfrontend to request adding node parameters to the URL
     */
    export const ADD_NODE_PARAMS_REQUEST = 'luigi.addNodeParams';
    /**
     * A message emmitted from the Microfrontend when a request to show an confirmation modal is sent
     */
    export const SHOW_CONFIRMATION_MODAL_REQUEST = 'luigi.ux.confirmationModal.show';
    /**
     * A message emmitted from the Microfrontend when a request to show loading indicator is sent
     */
    export const SHOW_LOADING_INDICATOR_REQUEST = 'luigi.show-loading-indicator';
    /**
     * A message emmitted from the Microfrontend when a request to hide the loading indicator is sent
     */
    export const HIDE_LOADING_INDICATOR_REQUEST = 'luigi.hide-loading-indicator';
}