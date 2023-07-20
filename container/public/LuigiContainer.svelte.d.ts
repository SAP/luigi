export default class LuigiContainer extends HTMLElement {
  /**
   * The URL of the microfrontend to be rendered
   */
  viewurl: string;

  /**
   * The context to be passed to the microfrontend
   */
  context: any;

  /**
   * Label information for the microfrontend
   */
  label: string;

  /**
   * Predicate that sets whether the microfrontend is to be rendered in a web component or not
   */
  webcomponent: boolean;

  /**
   * If set to `true` a microfrontend will be immediately initialized. LuigiContainer sends an event `initialized` to the microfrontend.
   */
  initialize_mfe_directly: boolean;

  /**
   * Once the microfrontend is initialized, this value is set to `true`.
   */
  is_mfe_initialized: boolean;

  /**
   * Updates the context of the microfrontend
   * @param contextObj The context object to be updated
   * @param internal internal microfrotend data
   */
  updateContext(contextObj: any, internal?: any): Function;

  /**
   * Notifies the microfrontend that the opened alert has been closed
   * @param id the id of the opened alert
   * @param dismissKey the key specifying which dismiss link was clicked on the alert message
   */
  closeAlert(id: any, dismissKey: any): Function;
}
