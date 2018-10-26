export const isFunction = anyParam =>
  anyParam && {}.toString.call(anyParam) === '[object Function]';

export const isPromise = anyParam => anyParam && isFunction(anyParam.then);

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
 *  Prepend current url to redirect_uri, if it is a relative path
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

export const containsAllSegments = (sourceUrl, targetPathSegments) => {
  if (!sourceUrl || !targetPathSegments || !targetPathSegments.length) {
    console.error(
      'Ooops, seems like the developers have misconfigured something'
    );
    return false;
  }
  const mandatorySegments = sourceUrl.split('/');
  let result = true;

  if (targetPathSegments.length !== mandatorySegments.length + 1) {
    return false; //we can already tell segments will not match so no loop is needed
  }

  mandatorySegments.forEach((segment, index) => {
    if (
      !targetPathSegments[index + 1] ||
      !targetPathSegments[index + 1].pathSegment ||
      (targetPathSegments[index + 1].pathSegment[0] !== ':' &&
        targetPathSegments[index + 1].pathSegment !== segment)
    ) {
      result = false;
    }
  });

  return result;
};
