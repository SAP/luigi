class EventWC {
  constructor() {
    this._bus = document.createElement('div');
    this.eventFunction = {};
  }

  register(eventType, callback) {
    this._bus.addEventListener(eventType, callback);
  }

  remove(eventType, callback) {
    this._bus.removeEventListener(eventType, callback);
  }

  remove(eventType) {
    this._bus.removeEventListener(eventType, () => {});
  }

  fire(eventType, detail = {}) {
    this._bus.dispatchEvent(new CustomEvent(eventType, { detail }));
  }

  removeAllListeners(){
    this._bus = document.createElement('div');
  }

}

var eventWC = new EventWC();
export default eventWC;
