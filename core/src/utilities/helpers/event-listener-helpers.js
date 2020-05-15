class EventListenerHelpersClass {
  constructor() {
    this.listeners = [];
    window.onunload = () => this.removeAllEventListeners();
  }

  addEventListener(type, listenerFn) {
    this.listeners.push({ type, listenerFn });
    window.addEventListener(type, listenerFn);
  }

  removeAllEventListeners() {
    this.listeners.forEach(l => {
      window.removeEventListener(l.type, l.listenerFn);
    });
    this.listeners = [];
  }
}

export const EventListenerHelpers = new EventListenerHelpersClass();
