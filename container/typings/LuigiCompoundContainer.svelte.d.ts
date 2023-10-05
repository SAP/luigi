export declare interface UserSettings {
  [key: string]: number | string | boolean;
}
export default class LuigiCompoundContainer extends HTMLElement {
  compoundConfig: any;

  /**
   * Manually triggers the micro frontend rendering process when using defer-init attribute
   */
  init(): Function;
  /**
   * The user settings to be passed to the web-component-based micro frontend
   */
  userSettings: UserSettings;

  /**
   * The ancor value to be passed to the web-component-based micro frontend.
   */
  anchor: string;
}
