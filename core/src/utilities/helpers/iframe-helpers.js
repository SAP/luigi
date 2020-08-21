// Helper methods for 'iframe.js' file. They don't require any method from 'iframe.js` but are required by them.
import { GenericHelpers } from './';
import { MICROFRONTEND_TYPES } from './../constants';
import { LuigiConfig } from '../../core-api';

class IframeHelpersClass {
  get specialIframeTypes() {
    return [
      {
        iframeKey: 'modalIframe',
        dataKey: 'modalIframeData',
        iframeConfigKey: 'modal'
      },
      {
        iframeKey: 'splitViewIframe',
        dataKey: 'splitViewIframeData',
        iframeConfigKey: 'splitView'
      }
    ];
  }

  hideElementChildren(node) {
    if (node.children) {
      Array.from(node.children).forEach(child => {
        if (child.tagName === 'IFRAME') {
          child.style.display = 'none';
        }
      });
    }
  }

  removeElementChildren(node) {
    const children = [...node.children];
    children.forEach(child => {
      if (!child.vg && child.tagName === 'IFRAME') {
        node.removeChild(child);
      }
    });
  }

  removeIframe(iframe, node) {
    const children = Array.from(node.children);
    children.forEach(child => {
      if (child === iframe) {
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
      const previousViewGroup = componentData.previousNodeValues.viewGroup;
      const nextViewGroup = componentData.viewGroup;
      if (previousUrl === nextUrl && !previousViewGroup && !nextViewGroup) {
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

  getLocation(url) {
    const element = document.createElement('a');
    element.href = url;

    if (element.origin) {
      return element.origin;
    } else if (element.protocol && element.host) {
      // IE11, url contains domain
      return `${element.protocol}//${element.host}`;
    } else {
      // IE11, url does not contain domain
      return window.location.origin;
    }
  }

  urlMatchesTheDomain(viewUrl = '', domain) {
    return this.getLocation(viewUrl) === domain;
  }

  iframeIsSameDomain(viewUrl, domain) {
    return this.urlMatchesTheDomain(viewUrl, domain);
  }

  getIframeContainer() {
    const container = Array.from(document.querySelectorAll('.iframeContainer'));
    return container.length > 0 ? container[0] : undefined;
  }

  /*
  [
    {id: "id-1", container: IFRAME_DO_ELEM_1, active: true, type:"main"},
    {id: "id-2", container: IFRAME_DO_ELEM_1, active: false, type:"main"},
    {id: "id-3", container: IFRAME_DO_ELEM_3, active: false, type:"modal"},
    {id: "id-4", container: IFRAME_DO_ELEM_4, active: false, type:"main"},
    {id: "id-5", container: IFRAME_DO_ELEM_5, active: false, type:"split-view"},
    {id: "id-6", container: IFRAME_DO_ELEM_6, active: false, type:"main"}
  ]*/
  getMicrofrontendsInDom() {
    return MICROFRONTEND_TYPES.map(({ type, selector }) => {
      return Array.from(document.querySelectorAll(selector)).map(container => ({
        id: container.luigi.id,
        container,
        active: GenericHelpers.isElementVisible(container),
        type
      }));
    }).reduce((acc, val) => acc.concat(val), []); // flatten
  }

  getMicrofrontendIframes() {
    return this.getMicrofrontendsInDom().map(mfObj => mfObj.container);
  }

  getCurrentMicrofrontendIframe() {
    const modalIframes = this.getModalIframes();
    const mainIframes = this.getMainIframes().filter(
      GenericHelpers.isElementVisible
    );

    return modalIframes[0] || mainIframes[0] || null;
  }

  getIframesWithType(type) {
    return this.getMicrofrontendsInDom()
      .filter(mfObj => mfObj.type === type)
      .map(mfObj => mfObj.container);
  }

  getMainIframes() {
    return this.getIframesWithType('main');
  }

  getModalIframes() {
    return this.getIframesWithType('modal');
  }

  getVisibleIframes() {
    return this.getMicrofrontendsInDom()
      .filter(mfObj => mfObj.active)
      .map(mfObj => mfObj.container);
  }

  sendMessageToIframe(iframe, message) {
    if (!(iframe.luigi && iframe.luigi.viewUrl && iframe._ready)) {
      return;
    }
    const trustedIframeDomain = this.getLocation(iframe.luigi.viewUrl);
    if (trustedIframeDomain !== '' && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, trustedIframeDomain);
    }
  }

  sendMessageToVisibleIframes(message) {
    this.getVisibleIframes().forEach(iframe =>
      this.sendMessageToIframe(iframe, message)
    );
  }

  broadcastMessageToAllIframes(message) {
    IframeHelpers.getMicrofrontendIframes().forEach(iframe =>
      this.sendMessageToIframe(iframe, message)
    );
  }

  createIframe(viewUrl, viewGroup, currentNode, microFrontendType) {
    const luigiDefaultSandboxRules = [
      'allow-forms', // Allows the resource to submit forms. If this keyword is not used, form submission is blocked.
      'allow-modals', // Lets the resource open modal windows.
      // 'allow-orientation-lock', // Lets the resource lock the screen orientation.
      // 'allow-pointer-lock', // Lets the resource use the Pointer Lock API.
      'allow-popups', // Allows popups (such as window.open(), target="_blank", or showModalDialog()). If this keyword is not used, the popup will silently fail to open.
      'allow-popups-to-escape-sandbox', // Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.
      // 'allow-presentation', // Lets the resource start a presentation session.
      'allow-same-origin', // If this token is not used, the resource is treated as being from a special origin that always fails the same-origin policy.
      'allow-scripts' // Lets the resource run scripts (but not create popup windows).
      // 'allow-storage-access-by-user-activation', // Lets the resource request access to the parent's storage capabilities with the Storage Access API.
      // 'allow-top-navigation', // Lets the resource navigate the top-level browsing context (the one named _top).
      // 'allow-top-navigation-by-user-activation', // Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.
      // 'allow-downloads-without-user-activation' // Allows for downloads to occur without a gesture from the user.
    ];
    const customSandboxRules = LuigiConfig.getConfigValue(
      'settings.customSandboxRules'
    );
    const allowRules = LuigiConfig.getConfigValue('settings.allowRules');
    const activeSandboxRules = customSandboxRules
      ? [...new Set([...luigiDefaultSandboxRules, ...customSandboxRules])]
      : luigiDefaultSandboxRules;

    const iframe = document.createElement('iframe');
    iframe.src = viewUrl;
    if (allowRules) {
      iframe.allow = allowRules.join(' ');
    }
    iframe.sandbox = activeSandboxRules.join(' ');
    iframe.luigi = {
      viewUrl,
      currentNode,
      createdAt: new Date().getTime(),
      id: GenericHelpers.getRandomId()
    };
    if (viewGroup) {
      iframe.vg = viewGroup;
    }
    if (currentNode && currentNode.clientPermissions) {
      iframe.luigi.clientPermissions = currentNode.clientPermissions;
    }
    const iframeInterceptor = LuigiConfig.getConfigValue(
      'settings.iframeCreationInterceptor'
    );
    if (GenericHelpers.isFunction(iframeInterceptor)) {
      try {
        iframeInterceptor(iframe, viewGroup, currentNode, microFrontendType);
      } catch (err) {
        console.error('Error applying iframe creation interceptor: ', err);
      }
    }
    return iframe;
  }

  isMessageSource(event, iframe) {
    return iframe && iframe.contentWindow === event.source;
  }

  getValidMessageSource(e) {
    const allMessagesSources = [
      ...IframeHelpers.getMicrofrontendIframes(),
      { contentWindow: window, luigi: { viewUrl: window.location.href } }
    ];
    const iframe = allMessagesSources.find(iframe =>
      this.isMessageSource(e, iframe)
    );

    if (!iframe || !iframe.luigi || !iframe.luigi.viewUrl) {
      return undefined;
    }

    const navigateOkMsg = 'luigi.navigate.ok' === e.data.msg;
    if (navigateOkMsg && !iframe.luigi.nextViewUrl) {
      return undefined;
    }

    const viewUrl = navigateOkMsg
      ? iframe.luigi.nextViewUrl
      : iframe.luigi.viewUrl;
    if (!this.iframeIsSameDomain(viewUrl, e.origin)) {
      return undefined;
    }

    return iframe;
  }
}

export const IframeHelpers = new IframeHelpersClass();
