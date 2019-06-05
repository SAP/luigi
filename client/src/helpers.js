/**
 * Creates a random Id
 * @private
 */
export const getRandomId = () => {
  // window.msCrypto for IE 11
  return (window.crypto || window.msCrypto).getRandomValues(
    new Uint32Array(1)
  )[0];
};

/**
 * Simple function check.
 * @private
 * @param item mixed
 * @returns {boolean}
 */
export const isFunction = item => typeof item === 'function';
