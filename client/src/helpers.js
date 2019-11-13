/** @private */
class Helpers {
  /** @private */
  constructor() {
    this.listeners = [];
    this.origin = '';

    const helperListener = function(evt) {
      if (!evt.data.msg) {
        return;
      }
      if (evt.data.msg === 'custom') {
        const message = this.convertCustomMessageInternalToUser(evt.data);
        this.listeners
          .filter(listener => listener.name === message.id)
          .map(listener => listener.eventFn(message, listener.listenerId));
      } else {
        this.listeners
          .filter(listener => listener.name === evt.data.msg)
          .map(listener => listener.eventFn(evt, listener.listenerId));
      }
    }.bind(this);

    window.addEventListener('message', helperListener);
    window.onunload = () =>
      window.removeEventListener('message', helperListener);
  }

  convertCustomMessageInternalToUser(internalMessage) {
    return internalMessage.data;
  }

  convertCustomMessageUserToInternal(message) {
    return {
      msg: 'custom',
      data: message
    };
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
    const listenerExists = Boolean(
      this.listeners.find(l => l.listenerId === id)
    );
    if (listenerExists) {
      this.listeners = this.listeners.filter(l => l.listenerId !== id);
      return true;
    }
    return false;
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

  getLuigiCoreDomain() {
    return this.origin;
  }

  setLuigiCoreDomain(origin) {
    if (origin) {
      this.origin = origin;
    }
  }

  sendPostMessageToLuigiCore(msg) {
    window.parent.postMessage(msg, this.origin);
  }

  setThirdPartyCookieCheck() {
    document.cookie = 'luigiCookie=true';
  }
}

export const helpers = new Helpers();
