// Helper methods for 'iframe.js' file. They don't require any method from 'ifram.js` but are required by them.
import * as GenericHelpers from './generic-helpers';
export const hideElementChildren = node => {
  if (node.children) {
    Array.from(node.children).forEach(child => {
      child.style.display = 'none';
    });
  }
};

export const removeElementChildren = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

export const replaceVars = (viewUrl, params, prefix, parenthesis = true) => {
  let processedUrl = viewUrl;
  if (params) {
    Object.entries(params).forEach(entry => {
      processedUrl = processedUrl.replace(
        new RegExp(
          GenericHelpers.escapeRegExp(
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
    processedUrl = processedUrl.replace(
      new RegExp(
        '\\{' + GenericHelpers.escapeRegExp(prefix) + '[^\\}]+\\}',
        'g'
      ),
      ''
    );
  }
  return processedUrl;
};

export const isSameDomain = (config, component) => {
  if (config.iframe) {
    const componentData = component.get();
    const previousUrl = GenericHelpers.getUrlWithoutHash(
      componentData.previousNodeValues.viewUrl
    );
    const nextUrl = GenericHelpers.getUrlWithoutHash(componentData.viewUrl);
    if (previousUrl === nextUrl) {
      return true;
    }
  }
  return false;
};

export const isSameViewGroup = (config, component) => {
  if (config.iframe) {
    const componentData = component.get();
    const previousUrl = GenericHelpers.getUrlWithoutHash(
      componentData.previousNodeValues.viewUrl
    );
    const nextUrl = GenericHelpers.getUrlWithoutHash(componentData.viewUrl);
    const previousUrlOrigin = getLocation(previousUrl);
    const nextUrlOrigin = getLocation(nextUrl);
    if (previousUrlOrigin === nextUrlOrigin) {
      const previousViewGroup = componentData.previousNodeValues.viewGroup;
      const nextViewGroup = componentData.viewGroup;
      if (
        previousViewGroup &&
        nextViewGroup &&
        previousViewGroup === nextViewGroup
      ) {
        return true;
      }
    }
  }
  return false;
};

export const canReuseIframe = (config, component) => {
  return isSameDomain(config, component) || isSameViewGroup(config, component);
};

export const hasIframeIsolation = component => {
  const componentData = component.get();
  return (
    componentData.isolateView || componentData.previousNodeValues.isolateView
  );
};

export const getLocation = url => {
  var element = document.createElement('a');
  element.href = url;
  return element.origin;
};

export const getVisibleIframes = () => {
  return Array.prototype.slice
    .call(document.querySelectorAll('iframe'))
    .filter(item => item.style.display !== 'none');
};

export const getValidIframe = (event, window) => {
  const iframes = document.querySelectorAll('.iframeContainer iframe');
  const isOriginWindow = iframe =>
    iframe &&
    (event.source === iframe.contentWindow || event.source === window);
  return Array.from(iframes).find(isOriginWindow);
};

export const ulrMatchesTheDomain = (viewUrl, domain) => {
  if (viewUrl.startsWith('/')) {
    return domain === window.location.origin;
  } else {
    return viewUrl.startsWith(domain);
  }
};

export const iframeIsSameDomain = (iframe, domain) => {
  const sameDomain = ulrMatchesTheDomain(iframe.luigi.viewUrl, domain);
  iframe.luigi.trustedDomain = sameDomain ? domain : '';
  return sameDomain;
};

export const sendPostMessage = (iframe, message) => {
  if (!(iframe.luigi && iframe.luigi.trustedDomain)) return;
  iframe.contentWindow.postMessage(message, iframe.luigi.trustedDomain);
};
