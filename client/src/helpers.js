/** @private */
class Helpers {
  /** @private */
  constructor() {
    this.listeners = [];

    window.addEventListener(
      'message',
      function(evt) {
        this.listeners
          .filter(listener => listener.name == evt.data.msg)
          .map(listener => listener.eventFn(evt));
      }.bind(this)
    );
  }

  /**
   * Registers a post message listener
   * @private
   * @param name string event name
   * @param eventFn function callback function
   * @returns {boolean}
   */
  addEventListener(name, eventFn) {
    this.listeners.push({
      name,
      eventFn
    });
  }

  /**
   * Creates a random Id
   * @private
   */
  getRandomId() {
    return Math.floor(Math.random() * 1e9) + '';
  }

  /**
   * Simple function check.
   * @private
   * @param item mixed
   * @returns {boolean}
   */
  isFunction(item) {
    return typeof item === 'function';
  }
}

export const helpers = new Helpers();
