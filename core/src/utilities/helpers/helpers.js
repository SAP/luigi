export const isFunction = anyParam =>
  anyParam && {}.toString.call(anyParam) === '[object Function]';

export const isPromise = anyParam => anyParam && isFunction(anyParam.then);

export const isIE = () => {
  const ua = navigator.userAgent;
  /* MSIE used to detect old browsers and Trident used to newer ones*/
  return Boolean(ua.includes('MSIE ') || ua.includes('Trident/'));
};

/**
 * Simple object check.
 * @param item mixed
 * @returns {boolean}
 */
export const isObject = item =>
  item && typeof item === 'object' && !Array.isArray(item);

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export const deepMerge = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
};

export const getUrlWithoutHash = url => {
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
};

/**
 * Checks if a given input string begins a hash with slash
 * @param {path} string
 */
export const hasHash = path => path && path.search(/^[#\/].*$/) === 0;

export const getPathWithoutHash = path => {
  while (hasHash(path)) {
    path = path.substr(1);
  }
  return path;
};

/**
 * Prepend current url to redirect_uri, if it is a relative path
 * @param {path} string full url, relative or absolute path
 */
export const prependOrigin = path => {
  if (path.startsWith('http')) {
    return path;
  }
  const hasLeadingSlash = path.startsWith('/');
  if (path.length) {
    return window.location.origin + (hasLeadingSlash ? '' : '/') + path;
  }
  return window.location.origin;
};

/**
 * Returns the negated string value from a bool string
 * @param {str} string 'true' or 'false'
 */
export const getNegatedBoolString = str => {
  return str === 'true' ? 'false' : 'true';
};

export const containsAllSegments = (sourceUrl, targetPathSegments) => {
  if (!sourceUrl || !targetPathSegments || !targetPathSegments.length) {
    console.error(
      'Ooops, seems like the developers have misconfigured something'
    );
    return false;
  }

  const pathSegmentsUrl = targetPathSegments
    .slice(1)
    .map(x => x.pathSegment)
    .join('/');
  const mandatorySegmentsUrl = trimTrailingSlash(sourceUrl.split('?')[0]);
  return pathSegmentsUrl === mandatorySegmentsUrl;
};

/**
 * Adds a leading slash to a string if it has none
 * @param {str} string
 * @returns {string} string with a leading slash
 */
export const addLeadingSlash = str => (!str.startsWith('/') ? '/' : '') + str;

/**
 * Adds a trailing slash to a string if it has none
 * @param {str} string
 * @returns {string} string with a trailing slash
 */
export const addTrailingSlash = str => {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/\/?$/, '/');
};

/**
 * Removes leading slash of a string
 * @param {str} string
 * @returns {string} string without leading slash
 */
export const trimLeadingSlash = str => str.replace(/^\/+/g, '');

/**
 * Prepend current url to redirect_uri, if it is a relative path
 * @param {str} string from which any number of trailing slashes should be removed
 * @returns string string without any trailing slash
 */
export const trimTrailingSlash = str => str.replace(/\/+$/, '');

/**
 * Returns a path that starts and end with one (and only one) slash,
 * regardless of the slashes being already present in the path given as input
 * @param {str} string path to normalize
 * @returns string path that starts and ends with a slash
 */

export const normalizePath = str => {
  if (typeof str !== 'string') {
    return str;
  }
  return addLeadingSlash(addTrailingSlash(str));
};

/*
 * Gets value of the given property on the given object.
 */
export const getConfigValueFromObject = (object, property) => {
  let propIndex = 0;
  let nextValue = object;
  const propertyPath = property.split('.');
  while (nextValue && propIndex < propertyPath.length) {
    nextValue = nextValue[propertyPath[propIndex++]];
  }
  return nextValue;
};
