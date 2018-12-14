import * as Routing from './routing';
import * as Iframe from './iframe';
import { LuigiConfig } from '../services/config';

import * as GenericHelpers from '../utilities/helpers/generic-helpers';
import * as Navigation from '../navigation/services/navigation';
import * as RoutingHelpers from '../utilities/helpers/routing-helpers';

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
        Routing.navigateTo(
          `${pathUrl ? `/${pathUrl}` : ''}/${defaultChildNode}`
        );
      } else {
        const alert = {
          message: 'Could not find the requested route',
          link: pathUrl
        };

        component.set({ alert });
        Routing.navigateTo('/');
        //error 404
      }
      return;
    }

    if (!GenericHelpers.containsAllSegments(pathUrl, pathData.navigationPath)) {
      const matchedPath = await Routing.matchPath(pathUrl);

      const alert = {
        message: 'Could not map the exact target node for the requested route',
        link: pathUrl
      };

      component.set({ alert });
      Routing.navigateTo(matchedPath);
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
      : Routing.buildFromRelativePath(node);
    Routing.navigateTo(link);
    return;
  } else {
    const route = RoutingHelpers.buildRoute(node, `/${node.pathSegment}`);
    Routing.navigateTo(route);
  }
};
