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

export const replaceVars = (viewUrl, params, prefix) => {
  let processedUrl = viewUrl;
  if (params) {
    Object.entries(params).forEach(entry => {
      processedUrl = processedUrl.replace(
        new RegExp(escapeRegExp('{' + prefix + entry[0] + '}'), 'g'),
        encodeURIComponent(entry[1])
      );
    });
  }
  processedUrl = processedUrl.replace(
    new RegExp('\\{' + escapeRegExp(prefix) + '[^\\}]+\\}', 'g'),
    ''
  );
  return processedUrl;
};

export const isNotSameDomain = (config, component) => {
  if (config.iframe) {
    const componentData = component.get();
    const previousUrl = getUrlWithoutHash(
      componentData.previousNodeValues.viewUrl
    );
    const nextUrl = getUrlWithoutHash(componentData.viewUrl);
    return previousUrl != nextUrl;
  }
  return true;
};

export const hasIframeIsolation = component => {
  const componentData = component.get();
  return (
    componentData.isolateView || componentData.previousNodeValues.isolateView
  );
};

export const removeElementChildren = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

export const hideElementChildren = node => {
  if (node.children) {
    Array.from(node.children).forEach(child => {
      child.style.display = 'none';
    });
  }
};

export const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const parseParams = paramsString => {
  const result = {};
  const viewParamString = paramsString;
  const pairs = viewParamString ? viewParamString.split('&') : null;
  if (pairs) {
    pairs.forEach(pairString => {
      const keyValue = pairString.split('=');
      if (keyValue && keyValue.length > 0) {
        result[decodeURIComponent(keyValue[0])] = decodeURIComponent(
          keyValue[1]
        );
      }
    });
  }
  return result;
};
