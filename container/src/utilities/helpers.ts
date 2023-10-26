export class GenericHelpersClass {
  /**
   * DUPLICATE: Duplicate of 'core/src/utilities/helpers/generic-helpers.js > isFunction'
   * Keep one in the end
   *
   * Checks if input is a function.
   * @param {any} functionToCheck function to check
   * @returns {boolean}
   */
  isFunction(functionToCheck: any): boolean {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }
  /**
   * Checks if input is an object.
   * @param objectToCheck mixed
   * @returns {boolean}
   */
  isObject(objectToCheck) {
    return !!(objectToCheck && typeof objectToCheck === 'object' && !Array.isArray(objectToCheck));
  }

  /**
   * Checks whether web component is an attribute or property. In case of attribute, it returns the parsed value.
   * @param webcomponent 
   * @returns returns the parsed webcomponent value.
   */
  checkWebcomponentValue(webcomponent: any): object | boolean {
    if (typeof webcomponent === 'string') {
      let parsedValue = JSON.parse(webcomponent);
      if (this.isObject(parsedValue)) {
        if ('selfRegistered' in parsedValue) {
          parsedValue.selfRegistered = parsedValue.selfRegistered === 'true';
        }
      }
      return parsedValue;
    } else if (typeof webcomponent === 'boolean' || typeof webcomponent === 'object') {
      return webcomponent;
    }
  }
}

export const GenericHelperFunctions = new GenericHelpersClass();
