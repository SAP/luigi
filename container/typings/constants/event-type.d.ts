/**
 * ParamsEvent interface is used to make the handling of listener parameter easier
 */
export interface ParamsEvent extends Event {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * PathExistsEvent interface is used to make it easier to use the `linkManager().pathExists()` promise based function
 * on the core application side.
 *
 * It enforces the use of the callback function, since the latter is hardcoded to be **'callback'**.
 * This allows to send back the boolean value if the path exists or not.
 * @Example
 * ```
 * addEventListener(Events.PATH_EXISTS_REQUEST, event: PathExistsEvent => {
 *      event.callback(true);
 *   }
 * };
 * ```
 */
export interface PathExistsEvent extends Event {
  /**
   *
   * @param value the boolean value that is to be sent back to the the path exists promise i.e.: `linkManager().pathExists().then(value...)
   * @returns void
   */
  callback: (value: boolean) => void;
}
