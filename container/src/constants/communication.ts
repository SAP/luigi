export namespace Events {
  /**
   * Event fired when the micro frontend requests a custom message.
   */
  export const CUSTOM_MESSAGE = 'custom-message';

  /**
   * Event fired when the micro frontend requests the context data.
   */
  export const GET_CONTEXT_REQUEST = 'get-context-request';

  /**
   * Event fired when a navigation has been requested by the micro frontend.
   */
  export const NAVIGATION_REQUEST = 'navigation-request';

  /**
   * Event fired when the micro frontend requests to show an alert.
   */
  export const ALERT_REQUEST = 'show-alert-request';

  /**
   * Event fired when the micro frontend requests to close an alert.
   */
  export const ALERT_CLOSED = 'close-alert-request';

  /**
   * Event fired when the micro frontend has been initialized.
   */
  export const INITIALIZED = 'initialized';

  /**
   * Event fired when the micro frontend requests the addition of search parameters to the URL.
   */
  export const ADD_SEARCH_PARAMS_REQUEST = 'add-search-params-request';

  /**
   * Event fired when the micro frontend requests the addition of node parameters to the URL.
   */
  export const ADD_NODE_PARAMS_REQUEST = 'add-node-params-request';

  /**
   * Event fired when the micro frontend requests to show a confirmation modal.
   */
  export const SHOW_CONFIRMATION_MODAL_REQUEST = 'show-confirmation-modal-request';

  /**
   * Event fired when the micro frontend requests to show a loading indicator.
   */
  export const SHOW_LOADING_INDICATOR_REQUEST = 'show-loading-indicator-request';

  /**
   * Event fired when the micro frontend requests to hide the loading indicator.
   */
  export const HIDE_LOADING_INDICATOR_REQUEST = 'hide-loading-indicator-request';

  /**
   * Event fired when the micro frontend requests to set the current locale.
   */
  export const SET_CURRENT_LOCALE_REQUEST = 'set-current-locale-request';

  /**
   * Event fired when the micro frontend requests to modify the local storage.
   */
  export const LOCAL_STORAGE_SET_REQUEST = 'set-storage-request';

  /**
   * Event fired when the micro frontend requests to handle errors that might happen during the runtime of the micro frontend.
   */
  export const RUNTIME_ERROR_HANDLING_REQUEST = 'runtime-error-handling-request';

  /**
   * Event fired when the micro frontend requests to set the anchor of the URL.
   */
  export const SET_ANCHOR_LINK_REQUEST = 'set-anchor-request';

  /**
   * Event fired when the micro frontend requests to set third-party cookies.
   */
  export const SET_THIRD_PARTY_COOKIES_REQUEST = 'set-third-party-cookies-request';

  /**
   * Event fired when the micro frontend requests to navigate back.
   */
  export const BACK_NAVIGATION_REQUEST = 'navigate-back-request';

  /**
   * Event fired when the micro frontend requests the current app route.
   */
  export const GET_CURRENT_ROUTE_REQUEST = 'get-current-route-request';

  /**
   * Event fired to report that the micro frontend's navigation has completed.
   */
  export const NAVIGATION_COMPLETED_REPORT = 'report-navigation-completed-request';

  /**
   * Event fired when the micro frontend requests to update the modal path parameters.
   */
  export const UPDATE_MODAL_PATH_DATA_REQUEST = 'update-modal-path-data-request';

  /**
   * Event fired when the micro frontend requests to check the validity of a path.
   */
  export const CHECK_PATH_EXISTS_REQUEST = 'check-path-exists-request';

  /**
   * Event fired when the micro frontend requests to set the 'dirty status' which, for example, avoids closing when there are any unsaved changes.
   */
  export const SET_DIRTY_STATUS_REQUEST = 'set-dirty-status-request';

  /**
   * Event fired when the micro frontend requests to set the view group data.
   */
  export const SET_VIEW_GROUP_DATA_REQUEST = 'set-viewgroup-data-request';

  /**
   * Event fired when the micro frontend requests to set the document title.
   */
  export const SET_DOCUMENT_TITLE_REQUEST = 'set-document-title-request';

  /**
   * Event fired when the micro frontend requests to open the user settings.
   */
  export const OPEN_USER_SETTINGS_REQUEST = 'open-user-settings-request';

  /**
   * Event fired when the micro frontend requests to close the user settings.
   */
  export const CLOSE_USER_SETTINGS_REQUEST = 'close-user-settings-request';

  /**
   * Event fired when the micro frontend requests to collapse left side navigation.
   */
  export const COLLAPSE_LEFT_NAV_REQUEST = 'collapse-leftnav-request';

  /**
   * Event fired when the micro frontend requests to update the top navigation.
   */
  export const UPDATE_TOP_NAVIGATION_REQUEST = 'update-top-navigation-request';

  /**
   * Event fired when the micro frontend requests to check if the path exists.
   */
  export const PATH_EXISTS_REQUEST = 'path-exists-request';

  /**
   * Event fired when the micro frontend requests to navigate back.
   */
  export const GO_BACK_REQUEST = 'go-back-request';

  /**
   * Event fired when the micro frontend requests to check if there are any preserved views.
   */
  export const HAS_BACK_REQUEST = 'has-back-request';

  /**
   * Event fired when the micro frontend requests to remove the backdrop.
   */
  export const REMOVE_BACKDROP_REQUEST = 'remove-backdrop-request';
}
