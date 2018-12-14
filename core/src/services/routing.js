import * as Navigation from '../navigation/services/navigation';
import * as RoutingHelpers from '../utilities/helpers/routing-helpers';
import { LuigiConfig } from './config';
import * as GenericHelpers from '../utilities/helpers/generic-helpers';

export const getNodePath = node => {
  return node
    ? RoutingHelpers.buildRoute(
        node,
        node.pathSegment ? '/' + node.pathSegment : ''
      )
    : '';
};

export const concatenatePath = (basePath, relativePath) => {
  let path = GenericHelpers.getPathWithoutHash(basePath);
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
    const pathUrl =
      0 < path.length ? GenericHelpers.getPathWithoutHash(path) : path;
    const pathData = await Navigation.getNavigationPath(
      LuigiConfig.getConfigValueAsync('navigation.nodes'),
      GenericHelpers.trimTrailingSlash(pathUrl.split('?')[0])
    );
    if (pathData.navigationPath.length > 0) {
      const lastNode =
        pathData.navigationPath[pathData.navigationPath.length - 1];
      return RoutingHelpers.buildRoute(
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
  if (GenericHelpers.isIE()) {
    event = document.createEvent('Event');
    event.initEvent('popstate', true, true);
  } else {
    event = new CustomEvent('popstate');
  }

  window.dispatchEvent(event);
};

export const buildFromRelativePath = node => {
  let windowPath = LuigiConfig.getConfigValue('routing.useHashRouting')
    ? GenericHelpers.getPathWithoutHash(window.location.hash)
    : window.location.pathname;
  if (node.parent && node.parent.pathSegment) {
    // use only this part of the current path that refers to the parent of the node (remove additional parts refering to the sibiling)
    // remove everything that is after the parents pathSegment 'parent/keepSelectedForChildren/something' -> 'parent'
    const nodePathSegments = GenericHelpers.trimLeadingSlash(
      getNodePath(node.parent)
    ).split('/');
    const windowPathSegments = GenericHelpers.trimLeadingSlash(
      windowPath
    ).split('/');
    if (windowPathSegments.length > nodePathSegments.length) {
      windowPath = windowPathSegments
        .slice(0, nodePathSegments.length)
        .join('/');
    }
  }
  return GenericHelpers.addLeadingSlash(concatenatePath(windowPath, node.link));
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
    ? window.location.hash.replace('#', '') // TODO: GenericHelpers.getPathWithoutHash(window.location.hash) fails in ContextSwitcher
    : GenericHelpers.trimLeadingSlash(window.location.pathname);
