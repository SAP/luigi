import { getNavigationPath } from './navigation';
import { getConfigValue, getConfigValueAsync } from './config';
import { getPathWithoutHash, getUrlWithoutHash } from '../utilities/helpers';

const iframeNavFallbackTimeout = 2000;
let timeoutHandle;
const defaultContentViewParamPrefix = '~';

const getViewUrl = pathData => {
  const lastElement = [...pathData.navigationPath].pop();
  return lastElement ? lastElement.viewUrl : '';
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
    const previousUrl = getUrlWithoutHash(config.iframe.src);
    const nextUrl = getUrlWithoutHash(component.get().viewUrl);
    return previousUrl != nextUrl;
  }
  return true;
};

export const getContentViewParamPrefix = () => {
  return (
    getConfigValue('routing.contentViewParamPrefix') ||
    defaultContentViewParamPrefix
  );
};

const contextVarPrefix = 'context.';
const nodeParamsVarPrefix = 'nodeParams.';

const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const replaceVars = (viewUrl, params, prefix) => {
  let processedUrl = viewUrl;
  if (params) {
    Object.entries(params).forEach(entry => {
      processedUrl = processedUrl.replace(
        '{' + prefix + entry[0] + '}',
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

const navigateIframe = (config, component, node) => {
  clearTimeout(timeoutHandle);
  const componentData = component.get();
  let viewUrl = componentData.viewUrl;
  if (viewUrl) {
    viewUrl = replaceVars(viewUrl, componentData.context, contextVarPrefix);
    viewUrl = replaceVars(
      viewUrl,
      componentData.nodeParams,
      nodeParamsVarPrefix
    );
  }

  if (isNotSameDomain(config, component) || config.builderCompatibilityMode) {
    const componentData = component.get();
    // preserveView, hide other frames, else remove
    if (config.iframe === null) {
      hideElementChildren(node);
    } else {
      removeElementChildren(node);
    }

    if (componentData.viewUrl) {
      config.iframe = document.createElement('iframe');
      config.iframe.src = viewUrl;

      node.prepend(config.iframe);

      if (config.builderCompatibilityMode) {
        config.iframe.addEventListener('load', () => {
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
        viewUrl: component.get().viewUrl,
        context: JSON.stringify(
          Object.assign({}, componentData.context, { goBackContext })
        ),
        nodeParams: JSON.stringify(Object.assign({}, componentData.nodeParams)),
        internal: JSON.stringify(component.prepareInternalData())
      },
      '*'
    );
    // clear goBackContext after sending it to the client
    component.set({ goBackContext: undefined });

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

const buildRoute = (node, path, params) =>
  !node.parent
    ? path + (params ? '?' + params : '')
    : buildRoute(node.parent, `/${node.parent.pathSegment}${path}`, params);

export const handleRouteChange = async (path, component, node, config) => {
  try {
    const pathUrl = path && path.length ? getPathWithoutHash(path) : path;
    const pathData = await getNavigationPath(
      getConfigValueAsync('navigation.nodes'),
      pathUrl.split('?')[0]
    );
    const hideNav = getConfigValue('navigation.hideNav');
    const viewUrl = getViewUrl(pathData);
    const params = parseParams(pathUrl.split('?')[1]);
    const nodeParams = getNodeParams(params);

    component.set({
      hideNav: hideNav,
      viewUrl: viewUrl,
      navigationPath: pathData.navigationPath,
      currentNode:
        pathData.navigationPath && pathData.navigationPath.length > 0
          ? pathData.navigationPath[pathData.navigationPath.length - 1]
          : null,
      context: pathData.context,
      nodeParams: nodeParams
    });

    navigateIframe(config, component, node);
  } catch (err) {
    console.error('Could not handle route change', err);
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
      getConfigValueAsync('navigation.nodes'),
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
  @param windowElem object  defaults to window
  @param documentElem object  defaults to document
 */
export const navigateTo = (
  route,
  windowElem = window,
  documentElem = document
) => {
  const event = documentElem.createEvent('Event');
  event.initEvent('popstate', true, true);
  if (windowElem.isHashRoute) {
    return (windowElem.location.hash = route);
  }

  windowElem.history.pushState(
    {
      path: route
    },
    '',
    route
  );

  windowElem.dispatchEvent(event);
};

export const handleRouteClick = (
  node,
  windowElem = window,
  documentElem = document
) => {
  const route = buildRoute(node, `/${node.pathSegment}`);
  navigateTo(route, windowElem, documentElem);
};
