/**
 * @private
 * @abstract
 */
export class LuigiClientBase {
  private promises: Record<string, any>;

  /**
   * @private
   */
  constructor() {
    this.promises = {};
  }

  /**
   * Returns the promises object
   * @private
   */
  setPromise(name: string, value: any) {
    this.promises[name] = value;
  }

  /**
   * Sets the promises object
   * @private
   */
  getPromise(name: string): any {
    return this.promises[name];
  }
}
