// Methods related to the routing. They mostly end up changing the iframe view which is handled by `iframe.js` file;
// Please consider adding any new methods to 'routing-helpers' if they don't require anything from this file.
import * as Navigation from '../navigation/services/navigation';
import * as RoutingHelpers from '../utilities/helpers/routing-helpers';
import { LuigiConfig } from './config';
import * as GenericHelpers from '../utilities/helpers/generic-helpers';
import * as Iframe from './iframe';

export const getNodePath = (node, params) => {
  return node
    ? RoutingHelpers.buildRoute(
        node,
        node.pathSegment ? '/' + node.pathSegment : '',
        params
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

/**
  navigateTo used for navigation
  Triggers a frame reload if we are on the same route (eg. if we click on same navigation item again)
  @param route string  absolute path of the new route
 */
export const navigateTo = async route => {
  const windowPath = GenericHelpers.trimLeadingSlash(getWindowPath());
  if (windowPath === GenericHelpers.trimLeadingSlash(route)) {
    Iframe.reloadActiveIframe();
    return;
  }

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
  if (GenericHelpers.isIE()) {
    event = document.createEvent('Event');
    event.initEvent('popstate', true, true);
  } else {
    event = new CustomEvent('popstate');
  }

  window.dispatchEvent(event);
};

const getWindowPath = () =>
  LuigiConfig.getConfigValue('routing.useHashRouting')
    ? GenericHelpers.getPathWithoutHash(window.location.hash)
    : window.location.pathname;

export const buildFromRelativePath = node => {
  let windowPath = getWindowPath();
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
    : window.location.search
    ? GenericHelpers.trimLeadingSlash(window.location.pathname) +
      window.location.search
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
    const pathData = await Navigation.getNavigationPath(
      LuigiConfig.getConfigValueAsync('navigation.nodes'),
      path
    );
    const lastNode = RoutingHelpers.getLastNodeObject(pathData);
    const viewUrl = lastNode.viewUrl || '';

    if (!viewUrl) {
      const defaultChildNode = await RoutingHelpers.getDefaultChildNode(
        pathData
      );
      if (pathData.isExistingRoute) {
        //normal navigation can be performed
        const trimmedPathUrl = GenericHelpers.getTrimmedUrl(path);
        navigateTo(
          `${trimmedPathUrl ? `/${trimmedPathUrl}` : ''}/${defaultChildNode}`
        );
      } else {
        if (defaultChildNode && pathData.navigationPath.length > 1) {
          //last path segment was invalid but a default node could be in its place
          showPageNotFoundError(
            component,
            GenericHelpers.trimTrailingSlash(pathData.matchedPath) +
              '/' +
              defaultChildNode,
            pathUrlRaw,
            true
          );
          return;
        }
        //ERROR  404
        //the path is unrecognized at all and cannot be fitted to any known one
        const rootPathData = await Navigation.getNavigationPath(
          LuigiConfig.getConfigValueAsync('navigation.nodes'),
          '/'
        );
        const rootPath = await RoutingHelpers.getDefaultChildNode(rootPathData);
        showPageNotFoundError(component, rootPath, pathUrlRaw);
      }
      return;
    }

    if (!pathData.isExistingRoute) {
      showPageNotFoundError(component, pathData.matchedPath, pathUrlRaw, true);
      return;
    }

    const hideNav = LuigiConfig.getConfigBooleanValue(
      'settings.hideNavigation'
    );
    const params = RoutingHelpers.parseParams(pathUrlRaw.split('?')[1]);
    const nodeParams = RoutingHelpers.getNodeParams(params);
    const viewGroup = RoutingHelpers.findViewGroup(lastNode);
    const urlParamsRaw = decodeURIComponent(pathUrlRaw.split('?')[1] || '');
    const currentNode =
      pathData.navigationPath && pathData.navigationPath.length > 0
        ? pathData.navigationPath[pathData.navigationPath.length - 1]
        : null;

    const newNodeData = {
      hideNav,
      viewUrl,
      nodeParams,
      viewGroup,
      urlParamsRaw,
      currentNode,
      navigationPath: pathData.navigationPath,
      context: RoutingHelpers.substituteDynamicParamsInObject(
        Object.assign({}, pathData.context, currentNode.context),
        pathData.pathParams
      ),
      pathParams: pathData.pathParams,
      hideSideNav: lastNode.hideSideNav || false,
      isolateView: lastNode.isolateView || false
    };

    const previousCompData = component.get();
    component.set(
      Object.assign({}, newNodeData, {
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

export const handleRouteClick = (node, componentData) => {
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
    navigateTo(
      GenericHelpers.replaceVars(route, componentData.pathParams, ':', false)
    );
  }
};

const showPageNotFoundError = async (
  component,
  pathToRedirect,
  notFoundPath,
  isAnyPathMatched = false
) => {
  const pageNotFoundHandler = LuigiConfig.getConfigValue(
    'routing.pageNotFoundHandler'
  );

  if (typeof pageNotFoundHandler === 'function') {
    //custom 404 handler is provided, use it
    pageNotFoundHandler(notFoundPath, isAnyPathMatched);
    return;
  }

  const alert = {
    message: isAnyPathMatched
      ? 'Could not map the exact target node for the requested route'
      : 'Could not find the requested route',
    link: notFoundPath,
    ttl: 1 //how many redirections the alert will 'survive'.
  };
  component.set({ alert });
  navigateTo(GenericHelpers.addLeadingSlash(pathToRedirect));
};
