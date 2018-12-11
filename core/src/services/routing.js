import { getNavigationPath } from '../navigation/services/navigation';
import {
  hideElementChildren,
  removeElementChildren,
  replaceVars,
  buildRoute,
  isSameViewGroup,
  hasIframeIsolation
} from '../utilities/helpers/routing-helpers';
import { LuigiConfig } from './config';
import {
  getPathWithoutHash,
  trimLeadingSlash,
  isIE,
  getConfigValueFromObject,
  addLeadingSlash,
  trimTrailingSlash
} from '../utilities/helpers/generic-helpers';

const iframeNavFallbackTimeout = 2000;
const contextVarPrefix = 'context.';
const nodeParamsVarPrefix = 'nodeParams.';
let timeoutHandle;

export const getActiveIframe = node => {
  return node.firstChild;
};

export const setActiveIframeToPrevious = node => {
  const iframesInDom = Array.from(node.children);
  if (iframesInDom.length === 0) {
    return;
  } else if (iframesInDom.length === 1) {
    iframesInDom[0].style.display = 'block';
    return;
  }
  hideElementChildren(node);
  node.removeChild(iframesInDom[0]);
  iframesInDom[1].style.display = 'block';
};

export const removeInactiveIframes = node => {
  const children = Array.from(node.children);
  children.forEach((child, index) => {
    if (index > 0) {
      node.removeChild(child);
    }
  });
};

export const navigateIframe = (config, component, node) => {
  clearTimeout(timeoutHandle);
  const componentData = component.get();
  let viewUrl = componentData.viewUrl;
  if (viewUrl) {
    viewUrl = replaceVars(viewUrl, componentData.pathParams, ':', false);
    viewUrl = replaceVars(viewUrl, componentData.context, contextVarPrefix);
    viewUrl = replaceVars(
      viewUrl,
      componentData.nodeParams,
      nodeParamsVarPrefix
    );
  }

  if (
    !componentData.isNavigateBack &&
    (!isSameViewGroup(config, component) ||
      hasIframeIsolation(component) ||
      Boolean(config.builderCompatibilityMode))
  ) {
    const componentData = component.get();
    // preserveView, hide other frames, else remove
    if (config.iframe === null) {
      hideElementChildren(node);
    } else {
      removeElementChildren(node);
    }

    if (componentData.viewUrl) {
      if (
        getConfigValueFromObject(
          componentData,
          'currentNode.loadingIndicator.enabled'
        ) !== false
      ) {
        component.set({ showLoadingIndicator: true });
      } else {
        component.set({ showLoadingIndicator: false });
      }
      config.navigateOk = undefined;
      config.iframe = document.createElement('iframe');
      config.iframe.src = viewUrl;

      node.insertBefore(config.iframe, node.firstChild);

      if (config.builderCompatibilityMode) {
        config.iframe.addEventListener('load', () => {
          window.postMessage({ msg: 'luigi.hide-loading-indicator' }, '*');
          config.iframe.contentWindow.postMessage(
            ['init', JSON.stringify(componentData.context)],
            '*'
          );
        });
      }
    }
  } else {
    const goBackContext = component.get().goBackContext;
    config.iframe.style.display = 'block';
    config.iframe.contentWindow.postMessage(
      {
        msg: 'luigi.navigate',
        viewUrl: viewUrl,
        context: JSON.stringify(
          Object.assign({}, componentData.context, { goBackContext })
        ),
        nodeParams: JSON.stringify(Object.assign({}, componentData.nodeParams)),
        pathParams: JSON.stringify(Object.assign({}, componentData.pathParams)),
        internal: JSON.stringify(component.prepareInternalData())
      },
      '*'
    );
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

export const getNodePath = node => {
  return node
    ? buildRoute(node, node.pathSegment ? '/' + node.pathSegment : '')
    : '';
};

export const concatenatePath = (basePath, relativePath) => {
  let path = getPathWithoutHash(basePath);
  if (!path) {
    return relativePath;
  }
  if (!relativePath) {
    return path;
  }
  if (path.endsWith('/')) {
    path = path.substring(0, path.length - 1);
  }
  if (!relativePath.startsWith('/')) {
    path += '/';
  }
  path += relativePath;
  return path;
};

export const matchPath = async path => {
  try {
    const pathUrl = 0 < path.length ? getPathWithoutHash(path) : path;
    const pathData = await getNavigationPath(
      LuigiConfig.getConfigValueAsync('navigation.nodes'),
      trimTrailingSlash(pathUrl.split('?')[0])
    );
    if (pathData.navigationPath.length > 0) {
      const lastNode =
        pathData.navigationPath[pathData.navigationPath.length - 1];
      return buildRoute(
        lastNode,
        '/' + (lastNode.pathSegment ? lastNode.pathSegment : ''),
        pathUrl.split('?')[1]
      );
    }
  } catch (err) {
    console.error('Could not match path', err);
  }
  return null;
};

/**
  navigateTo used for navigation
  @param route string  absolute path of the new route
  @param options object  navi options, eg preserveView
 */
export const navigateTo = async route => {
  if (LuigiConfig.getConfigValue('routing.useHashRouting')) {
    window.location.hash = route;
    return;
  }

  // Avoid infinite loop on logout + login whith path routing
  if (route === '/') {
    return;
  }

  window.history.pushState(
    {
      path: route
    },
    '',
    route
  );

  // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Browser_compatibility
  // https://developer.mozilla.org/en-US/docs/Web/API/Event#Browser_compatibility
  // https://developer.mozilla.org/en-US/docs/Web/API/Event/createEvent
  let event;
  if (isIE()) {
    event = document.createEvent('Event');
    event.initEvent('popstate', true, true);
  } else {
    event = new CustomEvent('popstate');
  }

  window.dispatchEvent(event);
};

export const buildFromRelativePath = node => {
  let windowPath = LuigiConfig.getConfigValue('routing.useHashRouting')
    ? getPathWithoutHash(window.location.hash)
    : window.location.pathname;
  if (node.parent && node.parent.pathSegment) {
    // use only this part of the current path that refers to the parent of the node (remove additional parts refering to the sibiling)
    // remove everything that is after the parents pathSegment 'parent/keepSelectedForChildren/something' -> 'parent'
    const nodePathSegments = trimLeadingSlash(getNodePath(node.parent)).split(
      '/'
    );
    const windowPathSegments = trimLeadingSlash(windowPath).split('/');
    if (windowPathSegments.length > nodePathSegments.length) {
      windowPath = windowPathSegments
        .slice(0, nodePathSegments.length)
        .join('/');
    }
  }
  return addLeadingSlash(concatenatePath(windowPath, node.link));
};

export const getModifiedPathname = () => {
  if (!window.history.state) {
    return '';
  }

  return window.history.state.path
    .split('/')
    .slice(1)
    .join('/');
};

export const getCurrentPath = () =>
  LuigiConfig.getConfigValue('routing.useHashRouting')
    ? window.location.hash.replace('#', '') // TODO: getPathWithoutHash(window.location.hash) fails in ContextSwitcher
    : trimLeadingSlash(window.location.pathname);
