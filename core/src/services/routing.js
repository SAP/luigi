import { getNavigationPath, navigateIframe, navigateTo } from './navigation';
import { getConfigValueAsync, getConfigBooleanValue } from './config';
import {
  parseParams,
  getPathWithoutHash,
  hideElementChildren
} from '../utilities/helpers-general';
import {
  getNodeParams,
  getPathParams,
  getLastNodeObject,
  getDefaultChildNode,
  isExistingRoute,
  buildRoute
} from '../utilities/helpers-routing';

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

export const getActiveIframe = node => {
  return node.firstChild;
};

export const getNodePath = node => {
  return node
    ? buildRoute(node, node.pathSegment ? '/' + node.pathSegment : '')
    : '';
};

export const handleRouteChange = async (path, component, node, config) => {
  try {
    const pathUrl = path && path.length ? getPathWithoutHash(path) : '';
    const pathData = await getNavigationPath(
      getConfigValueAsync('navigation.nodes'),
      pathUrl.split('?')[0]
    );

    const hideNav = getConfigBooleanValue('settings.hideNavigation');
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

export const handleRouteClick = (node, windowElem = window) => {
  if (node.externalLink && node.externalLink.url) {
    node.externalLink.sameWindow
      ? (windowElem.location.href = node.externalLink.url)
      : windowElem.open(node.externalLink.url).focus();
    // externalLinkUrl property is provided so there's no need to trigger routing mechanizm
    return;
  }
  const route = buildRoute(node, `/${node.pathSegment}`);
  navigateTo(route, windowElem);
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

export const removeInactiveIframes = node => {
  const children = Array.from(node.children);
  children.forEach((child, index) => {
    if (index > 0) {
      node.removeChild(child);
    }
  });
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
