import { getNavigationPath } from '../navigation/services/navigation';
import { LuigiConfig } from './config';
import {
  getPathWithoutHash,
  getUrlWithoutHash,
  isIE,
  getConfigValueFromObject
} from '../utilities/helpers';

const iframeNavFallbackTimeout = 2000;
let timeoutHandle;
const defaultContentViewParamPrefix = '~';

const getLastNodeObject = pathData => {
  const lastElement = [...pathData.navigationPath].pop();
  return lastElement ? lastElement : {};
};

const getDefaultChildNode = function(pathData) {
  const lastElement =
    pathData.navigationPath[pathData.navigationPath.length - 1];

  const pathExists = lastElement.children.find(
    childNode => childNode.pathSegment === lastElement.defaultChildNode
  );

  if (lastElement.defaultChildNode && pathExists) {
    return lastElement.defaultChildNode;
  } else if (lastElement.children && lastElement.children.length > 0) {
    return lastElement.children[0].pathSegment;
  } else {
    return '';
  }
};

const isExistingRoute = function(path, pathData) {
  if (!path) {
    return true;
  }

  const lastElement =
    pathData.navigationPath[pathData.navigationPath.length - 1];
  const routeSplit = path.replace(/\/$/, '').split('/');
  const lastPathSegment = routeSplit[routeSplit.length - 1];

  return lastElement.pathSegment === lastPathSegment;
};

const hideElementChildren = node => {
  if (node.children) {
    Array.from(node.children).forEach(child => {
      child.style.display = 'none';
    });
  }
};

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

const removeElementChildren = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
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

export const getContentViewParamPrefix = () => {
  return (
    LuigiConfig.getConfigValue('routing.contentViewParamPrefix') ||
    defaultContentViewParamPrefix
  );
};

const contextVarPrefix = 'context.';
const nodeParamsVarPrefix = 'nodeParams.';

const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const replaceVars = (viewUrl, params, prefix, parenthesis = true) => {
  let processedUrl = viewUrl;
  if (params) {
    Object.entries(params).forEach(entry => {
      processedUrl = processedUrl.replace(
        new RegExp(
          escapeRegExp(
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
      new RegExp('\\{' + escapeRegExp(prefix) + '[^\\}]+\\}', 'g'),
      ''
    );
  }
  return processedUrl;
};

const navigateIframe = (config, component, node) => {
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
    (isNotSameDomain(config, component) ||
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

      node.prepend(config.iframe);

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

const parseParams = paramsString => {
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

const getNodeParams = params => {
  const result = {};
  const paramPrefix = getContentViewParamPrefix();
  if (params) {
    Object.entries(params).forEach(entry => {
      if (entry[0].startsWith(paramPrefix)) {
        const paramName = entry[0].substr(paramPrefix.length);
        result[paramName] = entry[1];
      }
    });
  }
  return result;
};

const getPathParams = nodes => {
  const params = {};
  nodes
    .filter(n => n.pathParam)
    .map(n => n.pathParam)
    .forEach(pp => {
      params[pp.key.replace(':', '')] = pp.value;
    });
  return params;
};

const buildRoute = (node, path, params) =>
  !node.parent
    ? path + (params ? '?' + params : '')
    : buildRoute(node.parent, `/${node.parent.pathSegment}${path}`, params);

export const handleRouteChange = async (path, component, node, config) => {
  try {
    const pathUrl = path && path.length ? getPathWithoutHash(path) : '';
    const pathData = await getNavigationPath(
      LuigiConfig.getConfigValueAsync('navigation.nodes'),
      pathUrl.split('?')[0]
    );

    const hideNav = LuigiConfig.getConfigBooleanValue(
      'settings.hideNavigation'
    );
    const viewUrl = getLastNodeObject(pathData).viewUrl || '';
    const isolateView = getLastNodeObject(pathData).isolateView || false;
    const params = parseParams(pathUrl.split('?')[1]);
    const nodeParams = getNodeParams(params);
    const pathParams = getPathParams(pathData.navigationPath);

    if (!viewUrl) {
      const routeExists = isExistingRoute(path, pathData);

      if (routeExists) {
        const defaultChildNode = getDefaultChildNode(pathData);
        navigateTo(`${pathUrl ? `/${pathUrl}` : ''}/${defaultChildNode}`);
      } // TODO else display 404 page
      return;
    }

    const previousCompData = component.get();
    component.set({
      hideNav,
      viewUrl,
      navigationPath: pathData.navigationPath,
      currentNode:
        pathData.navigationPath && pathData.navigationPath.length > 0
          ? pathData.navigationPath[pathData.navigationPath.length - 1]
          : null,
      context: pathData.context,
      nodeParams,
      pathParams,
      isolateView,
      previousNodeValues: previousCompData
        ? {
            viewUrl: previousCompData.viewUrl,
            isolateView: previousCompData.isolateView
          }
        : {}
    });

    navigateIframe(config, component, node);
  } catch (err) {
    console.info('Could not handle route change', err);
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
      pathUrl.split('?')[0]
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
export const navigateTo = route => {
  if (LuigiConfig.getConfigValue('routing.useHashRouting')) {
    window.location.hash = route;
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

export const handleRouteClick = node => {
  if (node.externalLink && node.externalLink.url) {
    node.externalLink.sameWindow
      ? (window.location.href = node.externalLink.url)
      : window.open(node.externalLink.url).focus();
    // externalLinkUrl property is provided so there's no need to trigger routing mechanizm
    return;
  }
  const route = buildRoute(node, `/${node.pathSegment}`);
  navigateTo(route);
};
