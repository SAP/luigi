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
    const trimmedPathUrl = GenericHelpers.trimTrailingSlash(
      pathUrl.split('?')[0]
    );
    const pathData = await Navigation.getNavigationPath(
      LuigiConfig.getConfigValueAsync('navigation.nodes'),
      trimmedPathUrl
    );

    if (pathData.navigationPath.length > 0) {
      const navPathSegments = pathData.navigationPath
        .filter(x => x.pathSegment)
        .map(x => x.pathSegment);
      const pathSegments = trimmedPathUrl.split('/');
      const matchedPath = pathSegments
        .filter((segment, index) => {
          return (
            (navPathSegments[index] &&
              navPathSegments[index].startsWith(':')) ||
            navPathSegments[index] === segment
          );
        })
        .join('/');

      return {
        pathData,
        matchedPath
      };
    }
  } catch (err) {
    console.error('Could not match path', err);
  }
  return null;
};

/**
  navigateTo used for navigation
  @param route string  absolute path of the new route
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

export const handleRouteChange = async (
  path,
  component,
  iframeElement,
  config
) => {
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
    // just used for browser changes, like browser url manual change or browser back/forward button click
    if (component.shouldShowUnsavedChangesModal()) {
      const newUrl = window.location.href;
      const oldUrl = component.get().unsavedChanges.persistUrl;

      //pretend the url hasn't been changed
      oldUrl && history.replaceState(window.state, '', oldUrl);

      component.showUnsavedChangesModal().then(
        () => {
          path &&
            handleRouteChange(path, component, iframeElement, config) &&
            history.replaceState(window.state, '', newUrl);
        },
        () => {}
      );
      return;
    }

    const pathUrlRaw =
      path && path.length ? GenericHelpers.getPathWithoutHash(path) : '';
    const pathUrl = GenericHelpers.trimTrailingSlash(pathUrlRaw.split('?')[0]);
    const pathData = await Navigation.getNavigationPath(
      LuigiConfig.getConfigValueAsync('navigation.nodes'),
      pathUrl
    );
    const lastPathSegment = RoutingHelpers.getLastPathSegment(pathUrl);

    const hideNav = LuigiConfig.getConfigBooleanValue(
      'settings.hideNavigation'
    );

    const {
      viewUrl = '',
      isolateView = false,
      hideSideNav = false
    } = RoutingHelpers.processDynamicNode(
      RoutingHelpers.getLastNodeObject(pathData),
      lastPathSegment
    );
    const params = RoutingHelpers.parseParams(pathUrlRaw.split('?')[1]);
    const nodeParams = RoutingHelpers.getNodeParams(params);
    const viewGroup = RoutingHelpers.findViewGroup(
      RoutingHelpers.getLastNodeObject(pathData)
    );

    if (!viewUrl) {
      if (pathData.isExistingRoute) {
        const defaultChildNode = await RoutingHelpers.getDefaultChildNode(
          pathData
        );
        navigateTo(`${pathUrl ? `/${pathUrl}` : ''}/${defaultChildNode}`);
      } else {
        const alert = {
          message: 'Could not find the requested route',
          link: pathUrlRaw
        };

        component.set({ alert });
        navigateTo('/');
        //error 404
      }
      return;
    }

    if (!pathData.isExistingRoute) {
      const matched = await matchPath(pathUrlRaw);
      const alert = {
        message: 'Could not map the exact target node for the requested route',
        link: pathUrlRaw
      };

      component.set({ alert });
      navigateTo(GenericHelpers.addLeadingSlash(matched.matchedPath));
    }

    const newNodeData = {
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
      pathParams: pathData.pathParams,
      isolateView,
      viewGroup
    };

    // MTODO: IframeHelpers.replaceVars for:
    // substitute viewUrl modify nodeParams, pathParams, etc
    // substitute context

    const previousCompData = component.get();
    component.set(
      Object.assign({}, newNodeData, {
        context: Object.assign(
          {},
          newNodeData.context,
          newNodeData.currentNode.context
        ),
        previousNodeValues: previousCompData
          ? {
              viewUrl: previousCompData.viewUrl,
              isolateView: previousCompData.isolateView,
              viewGroup: previousCompData.viewGroup
            }
          : {}
      })
    );

    Iframe.navigateIframe(config, component, iframeElement);
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
  } else if (node.link) {
    const link = node.link.startsWith('/')
      ? node.link
      : buildFromRelativePath(node);
    navigateTo(link);
  } else {
    const route = RoutingHelpers.buildRoute(node, `/${node.pathSegment}`);
    navigateTo(route);
  }
};
