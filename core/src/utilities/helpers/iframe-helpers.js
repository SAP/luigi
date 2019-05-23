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
  const children = [...node.children];
  children.forEach(child => {
    if (!child.vg) {
      node.removeChild(child);
    }
  });
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
  //TODO rename to reflect the fact that it checks for URL till hash (which is more than just domain)
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
  const element = document.createElement('a');
  element.href = url;
  return element.origin;
};

export const getVisibleIframes = () => {
  return Array.prototype.slice
    .call(document.querySelectorAll('iframe'))
    .filter(item => item.style.display !== 'none');
};

export const urlMatchesTheDomain = (viewUrl = '', domain) => {
  return getLocation(viewUrl) === domain;
};

export const iframeIsSameDomain = (viewUrl, domain) => {
  return urlMatchesTheDomain(viewUrl, domain);
};

export const sendMessageToIframe = (iframe, message) => {
  if (!(iframe.luigi && iframe.luigi.viewUrl)) return;
  const trustedIframeDomain = getLocation(iframe.luigi.viewUrl);
  iframe.contentWindow.postMessage(message, trustedIframeDomain);
};

export const createIframe = viewUrl => {
  const activeSandboxRules = [
    'allow-forms', // Allows the resource to submit forms. If this keyword is not used, form submission is blocked.
    // 'allow-modals', // Lets the resource open modal windows.
    // 'allow-orientation-lock', // Lets the resource lock the screen orientation.
    // 'allow-pointer-lock', // Lets the resource use the Pointer Lock API.
    'allow-popups', // Allows popups (such as window.open(), target="_blank", or showModalDialog()). If this keyword is not used, the popup will silently fail to open.
    'allow-popups-to-escape-sandbox', // Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.
    // 'allow-presentation', // Lets the resource start a presentation session.
    'allow-same-origin', // If this token is not used, the resource is treated as being from a special origin that always fails the same-origin policy.
    'allow-scripts', // Lets the resource run scripts (but not create popup windows).
    // 'allow-storage-access-by-user-activation', // Lets the resource request access to the parent's storage capabilities with the Storage Access API.
    // 'allow-top-navigation', // Lets the resource navigate the top-level browsing context (the one named _top).
    // 'allow-top-navigation-by-user-activation', // Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.
    'allow-downloads-without-user-activation' // Allows for downloads to occur without a gesture from the user.
  ];

  const iframe = document.createElement('iframe');
  iframe.src = viewUrl;
  iframe.sandbox = activeSandboxRules.join(' ');
  iframe.luigi = {
    viewUrl
  };
  return iframe;
};

export const isMessageSource = (event, iframe) => {
  return iframe && iframe.contentWindow === event.source;
};
