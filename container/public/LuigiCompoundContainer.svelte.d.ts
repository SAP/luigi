export default class LuigiCompoundContainer extends HTMLElement {
  compoundConfig: any;

  /**
   * If set to `true`, a micro frontend will be immediately initialized. LuigiContainer sends an event `initialized` to the micro frontend.
   */
  initimmediate: boolean;

  /**
   * The URL of the microfrontend to be rendered
   */
  viewurl: string;
}
