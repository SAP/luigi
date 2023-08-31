export class GenericHelpersClass {
  /**
   * DUPLICATE: Duplicate of 'core/src/utilities/helpers/generic-helpers.js > isFunction'
   * Keep one in the end
   *
   * Checks if input is a function.
   * @param {any} functionToCheck function to check
   * @returns {boolean}
   */
  isFunction (functionToCheck: any): boolean {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }
}

export const GenericHelperFunctions = new GenericHelpersClass();
