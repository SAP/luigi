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
   * @returns {string} listener id
   */
  addEventListener(name, eventFn) {
    const listenerId = this.getRandomId();
    this.listeners.push({
      name,
      eventFn,
      listenerId
    });
    return listenerId;
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
    // window.msCrypto for IE 11
    return (window.crypto || window.msCrypto).getRandomValues(
      new Uint32Array(1)
    )[0];
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
