import { GenericHelpers } from '.';

class CustomListenerHelpersClass {
  constructor() {
    this.listeners = [];
    window.onunload = () => this.removeAllEventListeners();
  }

  addEventListener(name, eventFn) {
    const listenerId = GenericHelpers.getRandomId();
    this.listeners.push({ name, eventFn, listenerId });
    return listenerId;
  }

  removeEventListener(listenerId) {
    this.listeners = this.listeners.filter(l => l.listenerId !== listenerId);
  }

  removeAllEventListeners(name) {
    this.listeners = [].filter(l => l.name !== name || false);
  }

  dispatchEvent(name, data) {
    this.listeners
      .filter(listener => listener.name === name)
      .map(listener => listener.eventFn(data));
  }
}

export const CustomListenerHelpers = new CustomListenerHelpersClass();
