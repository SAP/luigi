// TODO: Add and extend event to inclide custom typings/interface to make it easier to use on the listener parameter
export interface ParamsEvent extends Event {}

/**
 * PathExistsEvent interface is used to make it easier to use the linkManager().pathExists() promise based function
 * on the core application side.
 * It enforces the use of the callback function, since the latter is hardcoded to be 'callback'.
 * This allows to send back the boolean value if the path exists or not.
 * Example Usage:
 * addEventListener('my-event-id' event: PathExistsEvent => {
 *      event.callback(true);
 *   }
 * };
 */
export interface PathExistsEvent extends Event {
  callback: (value: boolean) => void;
}
