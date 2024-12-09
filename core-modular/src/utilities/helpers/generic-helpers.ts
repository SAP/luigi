class GenericHelperClass{
    constructor(){}
    /**
   * Creates a random Id
   * @returns random numeric value {number}
   * @private
   */
  getRandomId /* istanbul ignore next */() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0];
  }
}
export const GenericHelpers = new GenericHelperClass();