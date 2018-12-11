import {
  navigateTo,
  buildFromRelativePath,
  navigateIframe,
  matchPath
} from './routing';
import { LuigiConfig } from '../services/config';
import {
  getPathWithoutHash,
  containsAllSegments
} from '../utilities/helpers/generic-helpers';
import { getNavigationPath } from '../navigation/services/navigation';
import {
  getNodeParams,
  getPathParams,
  findViewGroup,
  parseParams,
  getLastNodeObject,
  getDefaultChildNode,
  isExistingRoute,
  buildRoute
} from '../utilities/helpers/routing-helpers';

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
    const pathUrl = path && path.length ? getPathWithoutHash(path) : '';
    const pathData = await getNavigationPath(
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
    } = getLastNodeObject(pathData);
    const params = parseParams(pathUrl.split('?')[1]);
    const nodeParams = getNodeParams(params);
    const pathParams = getPathParams(pathData.navigationPath);
    const viewGroup = findViewGroup(getLastNodeObject(pathData));

    if (!viewUrl) {
      const routeExists = isExistingRoute(path, pathData);

      if (routeExists) {
        const defaultChildNode = await getDefaultChildNode(pathData);
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

    if (!containsAllSegments(pathUrl, pathData.navigationPath)) {
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

    navigateIframe(config, component, node);
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
    const route = buildRoute(node, `/${node.pathSegment}`);
    navigateTo(route);
  }
};
