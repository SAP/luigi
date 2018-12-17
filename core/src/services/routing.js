// Methods related to the routing. They mostly end up changing the iframe view which is handled by `iframe.js` file;
// Please consider adding any new methods to 'routing-helpers' if they don't require anything from this file.
import * as Navigation from '../navigation/services/navigation';
import * as RoutingHelpers from '../utilities/helpers/routing-helpers';
import { LuigiConfig } from './config';
import * as GenericHelpers from '../utilities/helpers/generic-helpers';
import * as Iframe from './iframe';

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
  if (window.location.pathname === route) {
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

export const handleRouteChange = async (path, component, node, config) => {
  const defaultPattern = [/access_token=/, /id_token=/];
  const patterns =
    LuigiConfig.getConfigValue('routing.skipRoutingForUrlPatterns') ||
    defaultPattern;
  const hasSkipMatches =
    patterns.filter(p => window.location.href.match(p)).length !== 0;
  if (hasSkipMatches) {
    return;
  }
  try {
    const pathUrl =
      path && path.length ? GenericHelpers.getPathWithoutHash(path) : '';
    const pathData = await Navigation.getNavigationPath(
      LuigiConfig.getConfigValueAsync('navigation.nodes'),
      pathUrl.split('?')[0]
    );

    const hideNav = LuigiConfig.getConfigBooleanValue(
      'settings.hideNavigation'
    );

    const {
      viewUrl = '',
      isolateView = false,
      hideSideNav = false
    } = RoutingHelpers.getLastNodeObject(pathData);
    const params = RoutingHelpers.parseParams(pathUrl.split('?')[1]);
    const nodeParams = RoutingHelpers.getNodeParams(params);
    const pathParams = RoutingHelpers.getPathParams(pathData.navigationPath);
    const viewGroup = RoutingHelpers.findViewGroup(
      RoutingHelpers.getLastNodeObject(pathData)
    );

    if (!viewUrl) {
      const routeExists = RoutingHelpers.isExistingRoute(path, pathData);

      if (routeExists) {
        const defaultChildNode = await RoutingHelpers.getDefaultChildNode(
          pathData
        );
        navigateTo(`${pathUrl ? `/${pathUrl}` : ''}/${defaultChildNode}`);
      } else {
        const alert = {
          message: 'Could not find the requested route',
          link: pathUrl
        };

        component.set({ alert });
        navigateTo('/');
        //error 404
      }
      return;
    }

    if (!GenericHelpers.containsAllSegments(pathUrl, pathData.navigationPath)) {
      const matchedPath = await matchPath(pathUrl);

      const alert = {
        message: 'Could not map the exact target node for the requested route',
        link: pathUrl
      };

      component.set({ alert });
      navigateTo(matchedPath);
    }

    const previousCompData = component.get();
    component.set({
      hideNav,
      hideSideNav,
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
      viewGroup,
      previousNodeValues: previousCompData
        ? {
            viewUrl: previousCompData.viewUrl,
            isolateView: previousCompData.isolateView,
            viewGroup: previousCompData.viewGroup
          }
        : {}
    });

    Iframe.navigateIframe(config, component, node);
  } catch (err) {
    console.info('Could not handle route change', err);
  }
};

export const handleRouteClick = node => {
  if (node.externalLink && node.externalLink.url) {
    node.externalLink.sameWindow
      ? (window.location.href = node.externalLink.url)
      : window.open(node.externalLink.url).focus();
    // externalLinkUrl property is provided so there's no need to trigger routing mechanizm
    return;
  } else if (node.link) {
    const link = node.link.startsWith('/')
      ? node.link
      : buildFromRelativePath(node);
    navigateTo(link);
    return;
  } else {
    const route = RoutingHelpers.buildRoute(node, `/${node.pathSegment}`);
    navigateTo(route);
  }
};
