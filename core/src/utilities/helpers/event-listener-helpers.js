class EventListenerHelpersClass {
  constructor() {
    this.listeners = [];
    window.onunload = () => this.removeAllEventListeners();
  }

  addEventListener(type, listenerFn) {
    this.listeners.push({ type, listenerFn });
    window.addEventListener(type, listenerFn);
  }

  removeEventListener(type, listenerFn) {
    this.listeners = this.listeners.filter(
      l => !(l.type === type && l.listenerFn === listenerFn)
    );
    window.removeEventListener(type, listenerFn);
  }

  removeAllEventListeners() {
    this.listeners.forEach(l => {
      window.removeEventListener(l.type, l.listenerFn);
    });
    this.listeners = [];
  }
}

export const EventListenerHelpers = new EventListenerHelpersClass();
