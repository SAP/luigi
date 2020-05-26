// Standalone or partly-standalone methods that are used widely through the whole app and are synchronous.
import { LuigiElements } from '../../core-api';

class GenericHelpersClass {
  /**
   * Creates a random Id
   * @returns random numeric value {number}
   * @private
   */
  getRandomId() {
    // window.msCrypto for IE 11
    return (window.crypto || window.msCrypto).getRandomValues(
      new Uint32Array(1)
    )[0];
  }

  isFunction(anyParam) {
    return anyParam && {}.toString.call(anyParam) === '[object Function]';
  }

  isPromise(anyParam) {
    return anyParam && this.isFunction(anyParam.then);
  }

  isIE() {
    const ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    return Boolean(ua.includes('MSIE ') || ua.includes('Trident/'));
  }

  /**
   * Simple object check.
   * @param item mixed
   * @returns {boolean}
   */
  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  /**
   * Deep merge two objects.
   * @param target
   * @param ...sources
   */
  deepMerge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.deepMerge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return this.deepMerge(target, ...sources);
  }

  getUrlWithoutHash(url) {
    if (!url) {
      return false;
    }
    const urlWithoutHash = url.split('#')[0];

    // We assume that any URL not starting with
    // http is on the current page's domain
    if (!urlWithoutHash.startsWith('http')) {
      return (
        window.location.origin +
        (urlWithoutHash.startsWith('/') ? '' : '/') +
        urlWithoutHash
      );
    }
    return urlWithoutHash;
  }

  /**
   * Checks if a given input string begins a hash with slash
   * @param {path} string
   */
  hasHash(path) {
    return path && path.search(/^[#\/].*$/) === 0;
  }

  getPathWithoutHash(path) {
    while (this.hasHash(path)) {
      path = path.substr(1);
    }
    return path;
  }

  /**
   * Returns the value of a given url parameter name
   * @param {string} name
   */
  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var result = regex.exec(window.location.search);
    return (result && decodeURIComponent(result[1].replace(/\+/g, ' '))) || '';
  }

  /**
   * Prepend current url to redirect_uri, if it is a relative path
   * @param {path} string full url, relative or absolute path
   */
  prependOrigin(path) {
    if (path.startsWith('http')) {
      return path;
    }
    const hasLeadingSlash = path.startsWith('/');
    if (path.length) {
      return window.location.origin + (hasLeadingSlash ? '' : '/') + path;
    }
    return window.location.origin;
  }

  /**
   * Adds a leading slash to a string if it has none
   * @param {str} string
   * @returns {string} string with a leading slash
   */
  addLeadingSlash(str) {
    return (!str.startsWith('/') ? '/' : '') + str;
  }

  /**
   * Adds a trailing slash to a string if it has none
   * @param {str} string
   * @returns {string} string with a trailing slash
   */
  addTrailingSlash(str) {
    if (typeof str !== 'string') {
      return str;
    }
    return str.replace(/\/?$/, '/');
  }

  /**
   * Removes leading slash of a string
   * @param {str} string
   * @returns {string} string without leading slash
   */
  trimLeadingSlash(str) {
    return str.replace(/^\/+/g, '');
  }

  /**
   * Prepend current url to redirect_uri, if it is a relative path
   * @param {str} string from which any number of trailing slashes should be removed
   * @returns string string without any trailing slash
   */
  trimTrailingSlash(str) {
    return str.replace(/\/+$/, '');
  }

  getTrimmedUrl(path) {
    const pathUrl = 0 < path.length ? this.getPathWithoutHash(path) : path;
    return this.trimTrailingSlash(pathUrl.split('?')[0]);
  }

  /**
   * Returns a path that starts and end with one (and only one) slash,
   * regardless of the slashes being already present in the path given as input
   * @param {str} string path to normalize
   * @returns string path that starts and ends with a slash
   */

  normalizePath(str) {
    if (typeof str !== 'string') {
      return str;
    }
    return this.addLeadingSlash(this.addTrailingSlash(str));
  }

  /*
   * Gets value of the given property on the given object.
   */
  getConfigValueFromObject(object, property) {
    let propIndex = 0;
    let nextValue = object;
    const propertyPath = property.split('.');
    while (nextValue && propIndex < propertyPath.length) {
      nextValue = nextValue[propertyPath[propIndex++]];
    }
    return nextValue;
  }

  canComponentHandleModal(component) {
    return component && typeof component.get === 'function';
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  replaceVars(inputString, params, prefix, parenthesis = true) {
    let processedString = inputString;
    if (params) {
      Object.entries(params).forEach(entry => {
        processedString = processedString.replace(
          new RegExp(
            this.escapeRegExp(
              (parenthesis ? '{' : '') +
                prefix +
                entry[0] +
                (parenthesis ? '}' : '')
            ),
            'g'
          ),
          encodeURIComponent(entry[1])
        );
      });
    }
    if (parenthesis) {
      processedString = processedString.replace(
        new RegExp('\\{' + this.escapeRegExp(prefix) + '[^\\}]+\\}', 'g'),
        ''
      );
    }
    return processedString;
  }

  getInnerHeight() {
    return LuigiElements.isCustomLuigiContainer()
      ? LuigiElements.getLuigiContainer().clientHeight
      : window.innerHeight;
  }

  getContentAreaHeight() {
    return this.getInnerHeight() - LuigiElements.getShellbar().clientHeight;
  }

  computePxFromPercent(fullPixels, requestedPercent) {
    return (fullPixels / 100) * requestedPercent;
  }

  computePercentFromPx(fullPixels, partialPixels) {
    return Math.floor((100 * partialPixels) / fullPixels);
  }

  isElementVisible(element) {
    const cssDisplayValue = window
      .getComputedStyle(element, null)
      .getPropertyValue('display');
    return cssDisplayValue !== 'none';
  }

  removeInternalProperties(input) {
    return (
      (input &&
        Object.keys(input)
          .filter(key => !key.startsWith('_'))
          .reduce((obj, key) => {
            obj[key] = input[key];
            return obj;
          }, {})) ||
      input
    );
  }

  /**
   * Returns a new Object with the same object,
   * without the keys that were given.
   * References still stay.
   * Allows wildcard ending keys
   *
   * @param {Object} input any given object
   * @param {Array} of keys, allows also wildcards at the end, like: _*
   */
  removeProperties(input, keys) {
    const res = {};
    if (!keys instanceof Array || !keys.length) {
      console.error(
        '[ERROR] removeProperties requires second parameter: array of keys to remove from object.'
      );
      return input;
    }
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        const noFullMatch = keys.filter(k => key.includes(k)).length === 0;
        const noPartialMatch =
          keys
            .filter(k => k.endsWith('*'))
            .map(k => k.slice(0, -1))
            .filter(k => key.startsWith(k)).length === 0;
        if (noFullMatch && noPartialMatch) {
          res[key] = input[key];
        }
      }
    }
    return res;
  }

  /**
   * Compares two semver versions and returns 1, 0 or -1
   * Can be used as sort function.
   * Limited to full number comparisons, ignores dev, rc, next versions.
   * @param {string} a source
   * @param {string} b target
   * @example
   * semverCompare('1.0.0', '0.7.7')
   * ['1.3', '1.2', '1.4', '1.1'].sort(semverCompare)
   */
  semverCompare(a, b) {
    var pa = a.split('-')[0].split('.');
    var pb = b.split('-')[0].split('.');
    for (var i = 0; i < 3; i++) {
      var na = Number(pa[i]);
      var nb = Number(pb[i]);
      if (na > nb) return 1;
      if (nb > na) return -1;
      if (!isNaN(na) && isNaN(nb)) return 1;
      if (isNaN(na) && !isNaN(nb)) return -1;
    }
    return 0;
  }
}

export const GenericHelpers = new GenericHelpersClass();
