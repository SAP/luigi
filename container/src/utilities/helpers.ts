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
   * Checks weather webcomponent is an attribute or property. In case of attribute it returns the parsed value.
   * @param webcomponent 
   * @returns returns the correct webcomponent value.
   */
  checkWebcomponentValue(webcomponent: any): object | boolean {
    if (typeof webcomponent === 'string') {
      return JSON.parse(webcomponent);
    } else if (typeof webcomponent === 'boolean' || typeof webcomponent === 'object') {
      return webcomponent;
    }
  }
}

export const GenericHelperFunctions = new GenericHelpersClass();
