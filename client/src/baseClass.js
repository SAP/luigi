export class LuigiClientBase {
  constructor() {
    this.promises = {};
  }
  /**
   * Returns the promises object
   * @private
   */
  setPromise(name, value) {
    this.promises[name] = value;
  }
  /**
   * Sets the promises object
   * @private
   */
  getPromise(name) {
    return this.promises[name];
  }
}
