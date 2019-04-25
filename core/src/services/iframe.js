// Methods related to managing the view in the iframe.
// Please consider adding any new methods to 'iframe-helpers' if they don't require anything from this file.
import * as IframeHelpers from '../utilities/helpers/iframe-helpers';
import * as GenericHelpers from '../utilities/helpers/generic-helpers';
import * as RoutingHelpers from '../utilities/helpers/routing-helpers';
import { createIframe } from '../utilities/helpers/iframe-helpers';

const iframeNavFallbackTimeout = 2000;
let timeoutHandle;

export const getActiveIframe = node => {
  return node.firstChild;
};

export const getAllIframes = modalIframe => {
  const iframes = Array.from(
    document.querySelectorAll('.iframeContainer iframe')
  );
  if (modalIframe) iframes.push(modalIframe);
  return iframes;
};

export const setActiveIframeToPrevious = node => {
  const iframesInDom = Array.from(node.children);
  if (iframesInDom.length === 0) {
    return;
  } else if (iframesInDom.length === 1) {
    iframesInDom[0].style.display = 'block';
    return;
  }
  IframeHelpers.hideElementChildren(node);
  node.removeChild(iframesInDom[0]);
  iframesInDom[1].style.display = 'block';
};

export const removeInactiveIframes = node => {
  const children = Array.from(node.children);
  children.forEach((child, index) => {
    if (child.style.display === 'none' && !child.vg) {
      node.removeChild(child);
    }
  });
};

export const navigateIframe = (config, component, node) => {
  clearTimeout(timeoutHandle);
  const componentData = component.get();
  let viewUrl = componentData.viewUrl;
  if (viewUrl) {
    viewUrl = RoutingHelpers.substituteViewUrl(viewUrl, componentData);
  }

  const iframes = Array.from(
    document.querySelectorAll('.iframeContainer iframe')
  );
  const sameViewGroupIframes = iframes.filter(iframe => {
    return iframe.vg && iframe.vg === componentData.viewGroup; //TODO filter out iframes belonging to goback stack
  });
  let needNewIframeAnyway = false;
  if (sameViewGroupIframes.length > 0) {
    const targetIframe = sameViewGroupIframes[0];
    if (targetIframe !== config.iframe) {
      config.iframe.style.display = 'none';
      config.iframe = targetIframe;
      config.iframe.style.display = 'block';
    }
  } else if (config.iframe && config.iframe.vg) {
    needNewIframeAnyway = true;
  }

  const isSameViewGroup = IframeHelpers.isSameViewGroup(config, component);
  const canReuseIframe = IframeHelpers.canReuseIframe(config, component);
  if (
    needNewIframeAnyway ||
    (!componentData.isNavigateBack &&
      (IframeHelpers.hasIframeIsolation(component) ||
        !canReuseIframe ||
        Boolean(config.builderCompatibilityMode))) ||
    (config.isolateAllViews &&
      !(componentData.isolateView === false) &&
      !isSameViewGroup)
  ) {
    const componentData = component.get();
    // preserveView, hide other frames, else remove
    if (config.iframe === null) {
      IframeHelpers.hideElementChildren(node);
    } else {
      IframeHelpers.removeElementChildren(node);
      // to avoid to have to iframes display=block with to viewgroups (in initial face)
      if (config.iframe) {
        config.iframe.style.display = 'none';
      }
    }
    if (componentData.viewUrl) {
      if (
        GenericHelpers.getConfigValueFromObject(
          componentData,
          'currentNode.loadingIndicator.enabled'
        ) !== false
      ) {
        component.set({ showLoadingIndicator: true });
      } else {
        component.set({ showLoadingIndicator: false });
      }
      config.navigateOk = undefined;
      config.iframe = createIframe(viewUrl);
      if (componentData.viewGroup) {
        config.iframe['vg'] = componentData.viewGroup;
      }

      node.insertBefore(config.iframe, node.firstChild);

      if (config.builderCompatibilityMode) {
        config.iframe.addEventListener('load', () => {
          const message = ['init', JSON.stringify(componentData.context)];
          IframeHelpers.sendMessageToIframe(config.iframe, message);
        });
      }
    }
  } else {
    const goBackContext = component.get().goBackContext;
    config.iframe.style.display = 'block';
    config.iframe.luigi.nextViewUrl = viewUrl;
    config.iframe['vg'] = componentData.viewGroup;
    const message = {
      msg: 'luigi.navigate',
      viewUrl: viewUrl,
      context: JSON.stringify(
        Object.assign({}, componentData.context, { goBackContext })
      ),
      nodeParams: JSON.stringify(Object.assign({}, componentData.nodeParams)),
      pathParams: JSON.stringify(Object.assign({}, componentData.pathParams)),
      internal: JSON.stringify(component.prepareInternalData())
    };
    IframeHelpers.sendMessageToIframe(config.iframe, message);
    // clear goBackContext and reset navigateBack after sending it to the client
    component.set({ goBackContext: undefined, isNavigateBack: false });

    /**
     * check if luigi responded
     * if not, callback again to replace the iframe
     */
    timeoutHandle = setTimeout(() => {
      if (config.navigateOk) {
        config.navigateOk = undefined;
      } else {
        config.iframe = undefined;
        console.info(
          'navigate: luigi-client did not respond, using fallback by replacing iframe'
        );
        navigateIframe(config, component, node);
      }
    }, iframeNavFallbackTimeout);
  }
};

export const reloadActiveIframe = () => {
  const visibleIframe = IframeHelpers.getVisibleIframes().pop();

  if (visibleIframe) {
    if (
      visibleIframe.contentDocument &&
      visibleIframe.contentDocument.location
    ) {
      visibleIframe.contentDocument.location.reload(true);
    } else {
      visibleIframe.src = visibleIframe.src;
    }
  }
};
