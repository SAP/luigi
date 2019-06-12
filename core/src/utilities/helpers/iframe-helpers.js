// Helper methods for 'iframe.js' file. They don't require any method from 'ifram.js` but are required by them.
import { GenericHelpers } from './generic-helpers';

class IframeHelpersClass {
  hideElementChildren(node) {
    if (node.children) {
      Array.from(node.children).forEach(child => {
        child.style.display = 'none';
      });
    }
  }

  removeElementChildren(node) {
    const children = [...node.children];
    children.forEach(child => {
      if (!child.vg) {
        node.removeChild(child);
      }
    });
  }

  replaceVars(viewUrl, params, prefix, parenthesis = true) {
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
  }

  isSameDomain(config, component) {
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
  }

  isSameViewGroup(config, component) {
    if (config.iframe) {
      const componentData = component.get();
      const previousUrl = GenericHelpers.getUrlWithoutHash(
        componentData.previousNodeValues.viewUrl
      );
      const nextUrl = GenericHelpers.getUrlWithoutHash(componentData.viewUrl);
      const previousUrlOrigin = this.getLocation(previousUrl);
      const nextUrlOrigin = this.getLocation(nextUrl);
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
  }

  canReuseIframe(config, component) {
    return (
      this.isSameDomain(config, component) ||
      this.isSameViewGroup(config, component)
    );
  }

  hasIframeIsolation(component) {
    const componentData = component.get();
    return (
      componentData.isolateView || componentData.previousNodeValues.isolateView
    );
  }

  getLocation(url) {
    const element = document.createElement('a');
    element.href = url;
    return element.origin;
  }

  getVisibleIframes() {
    return Array.prototype.slice
      .call(document.querySelectorAll('iframe'))
      .filter(item => item.style.display !== 'none');
  }

  urlMatchesTheDomain(viewUrl = '', domain) {
    return this.getLocation(viewUrl) === domain;
  }

  iframeIsSameDomain(viewUrl, domain) {
    return this.urlMatchesTheDomain(viewUrl, domain);
  }

  sendMessageToIframe(iframe, message) {
    if (!(iframe.luigi && iframe.luigi.viewUrl)) return;
    const trustedIframeDomain = this.getLocation(iframe.luigi.viewUrl);
    iframe.contentWindow.postMessage(message, trustedIframeDomain);
  }

  createIframe(viewUrl) {
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
  }

  isMessageSource(event, iframe) {
    return iframe && iframe.contentWindow === event.source;
  }
}

export const IframeHelpers = new IframeHelpersClass();
