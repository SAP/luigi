// Helper methods for 'iframe.js' file. They don't require any method from 'ifram.js` but are required by them.
import { GenericHelpers } from './';
import { MICROFRONTEND_TYPES } from './../constants';

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

  getIframeContainer() {
    const container = Array.from(document.querySelectorAll('.iframeContainer'));
    return container && container.length > 0 ? container[0] : undefined;
  }

  getVisibleIframes() {
    return Array.prototype.slice
      .call(document.querySelectorAll('iframe'))
      .filter(item => item.style.display !== 'none');
  }

  urlMatchesTheDomain(viewUrl = '', domain) {
    return this.getLocation(viewUrl) === domain;
  }

  /*
  [
    {id: "id-1", selector: '.iframeContainer iframe' container: IFRAME_DO_ELEM_1, active: true, type:"main"},
    {id: "id-2", selector: '.iframeContainer iframe' container: IFRAME_DO_ELEM_1, active: false, type:"main"},
    {id: "id-3", selector: '.iframeModalCtn iframe' container: IFRAME_DO_ELEM_3, active: false, type:"modal"},
    {id: "id-4", selector: '.iframeContainer iframe' container: IFRAME_DO_ELEM_4, active: false, type:"main"},
    {id: "id-5", selector: '.iframeSplitViewCnt iframe' container: IFRAME_DO_ELEM_5, active: false, type:"split-view"},
    {id: "id-6", selector: '.iframeContainer iframe' container: IFRAME_DO_ELEM_6, active: false, type:"main"}
  ]*/
  getMicrofrontends() {
    const visibleIframesIds = [...document.querySelectorAll('iframe')]
      .filter(iframe => iframe.style.display !== 'none')
      .map(iframe => iframe.luigi.id);

    return MICROFRONTEND_TYPES.map(item => {
      return Array.from(document.querySelectorAll(item.selector)).map(
        container => Object.assign({ container }, item)
      );
    })
      .filter(iframeTypeArray => Boolean(iframeTypeArray.length))
      .reduce((acc, val) => acc.concat(val), []) // flatten
      .map(mfObj => Object.assign({ id: mfObj.container.luigi.id }, mfObj))
      .map(mfObj =>
        Object.assign({ active: visibleIframesIds.includes(mfObj.id) }, mfObj)
      );
  }

  iframeIsSameDomain(viewUrl, domain) {
    return this.urlMatchesTheDomain(viewUrl, domain);
  }

  getAllIframes(additionalIframes) {
    const iframes = Array.from(
      document.querySelectorAll('.iframeContainer iframe')
    );
    if (Array.isArray(additionalIframes)) {
      iframes.push(...additionalIframes);
    } else if (additionalIframes) {
      iframes.push(additionalIframes);
    }
    return iframes;
  }

  sendMessageToIframe(iframe, message) {
    if (!(iframe.luigi && iframe.luigi.viewUrl)) return;
    const trustedIframeDomain = this.getLocation(iframe.luigi.viewUrl);
    iframe.contentWindow.postMessage(message, trustedIframeDomain);
  }

  sendMessageToVisibleIframes(message) {
    this.getVisibleIframes().forEach(iframe =>
      this.sendMessageToIframe(iframe, message)
    );
  }

  broadcastMessageToAllIframes(message, additionalIframes) {
    const allIframes = IframeHelpers.getAllIframes(additionalIframes);
    allIframes.forEach(iframe => this.sendMessageToIframe(iframe, message));
  }

  createIframe(viewUrl, viewGroup, clientPermissions) {
    const activeSandboxRules = [
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

    const iframe = document.createElement('iframe');
    iframe.src = viewUrl;
    iframe.sandbox = activeSandboxRules.join(' ');
    iframe.luigi = {
      viewUrl,
      createdAt: new Date().getTime(),
      id: GenericHelpers.getRandomId()
    };
    if (viewGroup) {
      iframe.vg = viewGroup;
    }
    if (clientPermissions) {
      iframe.luigi.clientPermissions = clientPermissions;
    }
    return iframe;
  }

  isMessageSource(event, iframe) {
    return iframe && iframe.contentWindow === event.source;
  }

  getValidMessageSource(e, component) {
    const allMessagesSources = [
      ...IframeHelpers.getAllIframes(
        this.specialIframeTypes
          .map(t => component.get()[t.iframeKey])
          .filter(Boolean)
      ),
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
