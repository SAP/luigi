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
   * @param {object | boolean | string} webcomponent value can either be an object, boolean or a stringified object, e.g webcomponent='{"selfregistered":"true"}'
   * @returns {object | boolean} webcomponent returns the parsed webcomponent value.
   */
  checkWebcomponentValue(webcomponent: object | boolean | string): object | boolean {
    if (typeof webcomponent === 'string') {
      try {
        return JSON.parse(webcomponent);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else if (typeof webcomponent === 'boolean' || typeof webcomponent === 'object') {
      return webcomponent;
    } else {
      console.warn('Webcomponent value has a wrong type.')
    }
  }
}

export const GenericHelperFunctions = new GenericHelpersClass();
