/**
 * Creates a random Id
 * @private
 */
export const getRandomId = () => Math.floor(Math.random() * 1e9) + '';

/**
 * Simple function check.
 * @private
 * @param item mixed
 * @returns {boolean}
 */
export const isFunction = item => typeof item === 'function';
