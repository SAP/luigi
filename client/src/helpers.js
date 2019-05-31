/** @private */
class Helpers {
  /** @private */
  constructor() {
    this.listeners = [];

    window.addEventListener(
      'message',
      function(evt) {
        this.listeners
          .filter(listener => listener.name === evt.data.msg)
          .map(listener => listener.eventFn(evt, listener.listenerId));
      }.bind(this)
    );
  }

  /**
   * Registers a post message listener
   * Don't forget to remove the event listener at the end of
   * your eventFn if you do not need it anymore.
   * @private
   * @param {string} name event name
   * @param {function} eventFn callback function
   * @returns {boolean}
   */
  addEventListener(name, eventFn) {
    this.listeners.push({
      name,
      eventFn,
      listenerId: this.getRandomId()
    });
  }

  /**
   * Removes a post message listener
   * @private
   * @param {string} id listenerId
   */
  removeEventListener(id) {
    this.listeners = this.listeners.filter(l => l.listenerId !== id);
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
   * @param {function} item
   * @returns {boolean}
   */
  isFunction(item) {
    return typeof item === 'function';
  }
}

export const helpers = new Helpers();
