// Methods related to the routing. They mostly end up changing the iframe view which is handled by `iframe.js` file;
// Please consider adding any new methods to 'routing-helpers' if they don't require anything from this file.
import { Navigation } from '../navigation/services/navigation';
import { GenericHelpers, RoutingHelpers } from '../utilities/helpers';
import { LuigiConfig } from '../core-api';
import { Iframe } from './iframe';
import { NAVIGATION_DEFAULTS } from './../utilities/luigi-config-defaults';

class RoutingClass {
  getNodePath(node, params) {
    return node
      ? RoutingHelpers.buildRoute(
          node,
          node.pathSegment ? '/' + node.pathSegment : '',
          params
        )
      : '';
  }

  concatenatePath(basePath, relativePath) {
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
  }

  /**
    navigateTo used for navigation
    Triggers a frame reload if we are on the same route (eg. if we click on same navigation item again)
    @param route string  absolute path of the new route
   */
  async navigateTo(route) {
    const windowPath = GenericHelpers.trimLeadingSlash(this.getWindowPath());
    if (windowPath === GenericHelpers.trimLeadingSlash(route)) {
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
  }

  getWindowPath() {
    return LuigiConfig.getConfigValue('routing.useHashRouting')
      ? GenericHelpers.getPathWithoutHash(window.location.hash)
      : window.location.pathname;
  }

  buildFromRelativePath(node) {
    let windowPath = this.getWindowPath();
    if (node.parent && node.parent.pathSegment) {
      // use only this part of the current path that refers to the parent of the node (remove additional parts refering to the sibiling)
      // remove everything that is after the parents pathSegment 'parent/keepSelectedForChildren/something' -> 'parent'
      const nodePathSegments = GenericHelpers.trimLeadingSlash(
        this.getNodePath(node.parent)
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
    return GenericHelpers.addLeadingSlash(
      this.concatenatePath(windowPath, node.link)
    );
  }

  getHashPath(url = window.location.hash) {
    return url.split('#/')[1];
  }

  getModifiedPathname() {
    if (!window.history.state) {
      return '';
    }

    return window.history.state.path
      .split('/')
      .slice(1)
      .join('/');
  }

  getCurrentPath() {
    return LuigiConfig.getConfigValue('routing.useHashRouting')
      ? window.location.hash.replace('#', '') // TODO: GenericHelpers.getPathWithoutHash(window.location.hash) fails in ContextSwitcher
      : window.location.search
      ? GenericHelpers.trimLeadingSlash(window.location.pathname) +
        window.location.search
      : GenericHelpers.trimLeadingSlash(window.location.pathname);
  }

  async handleRouteChange(path, component, iframeElement, config) {
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
              this.handleRouteChange(path, component, iframeElement, config) &&
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
          this.navigateTo(
            `${trimmedPathUrl ? `/${trimmedPathUrl}` : ''}/${defaultChildNode}`
          );
        } else {
          if (defaultChildNode && pathData.navigationPath.length > 1) {
            //last path segment was invalid but a default node could be in its place
            this.showPageNotFoundError(
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
          const rootPath = await RoutingHelpers.getDefaultChildNode(
            rootPathData
          );
          this.showPageNotFoundError(component, rootPath, pathUrlRaw);
        }
        return;
      }

      if (!pathData.isExistingRoute) {
        this.showPageNotFoundError(
          component,
          pathData.matchedPath,
          pathUrlRaw,
          true
        );
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
  }

  handleRouteClick(node, component) {
    const componentData = component.get();
    if (node.externalLink && node.externalLink.url) {
      this.navigateToExternalLink(node.externalLink);
      // externalLinkUrl property is provided so there's no need to trigger routing mechanizm
    } else if (node.link) {
      const link = node.link.startsWith('/')
        ? node.link
        : this.buildFromRelativePath(node);
      this.navigateTo(link);
    } else {
      let route = RoutingHelpers.buildRoute(node, `/${node.pathSegment}`);
      route = GenericHelpers.replaceVars(
        route,
        componentData.pathParams,
        ':',
        false
      );

      const windowPath = GenericHelpers.trimLeadingSlash(this.getWindowPath());
      if (windowPath === GenericHelpers.trimLeadingSlash(route)) {
        const iframeContainer = Iframe.getIframeContainer();
        const activeIframe = Iframe.getActiveIframe(iframeContainer);
        if (
          activeIframe &&
          activeIframe.vg &&
          Iframe.canCache(activeIframe.vg)
        ) {
          Iframe.switchActiveIframe(
            Iframe.getIframeContainer(),
            undefined,
            false
          );
          setTimeout(() => {
            Iframe.switchActiveIframe(
              Iframe.getIframeContainer(),
              activeIframe,
              false
            );
            window.postMessage({ msg: 'refreshRoute' }, '*');
          });
        } else {
          if (activeIframe) {
            iframeContainer.removeChild(activeIframe);
          }
          window.postMessage({ msg: 'refreshRoute' }, '*');
        }
      } else {
        this.navigateTo(route);
      }
    }
  }

  async showPageNotFoundError(
    component,
    pathToRedirect,
    notFoundPath,
    isAnyPathMatched = false
  ) {
    const pageNotFoundHandler = LuigiConfig.getConfigValue(
      'routing.pageNotFoundHandler'
    );

    if (typeof pageNotFoundHandler === 'function') {
      //custom 404 handler is provided, use it
      pageNotFoundHandler(notFoundPath, isAnyPathMatched);
      return;
    }

    const alertSettings = {
      text:
        (isAnyPathMatched
          ? 'Could not map the exact target node for the requested route '
          : 'Could not find the requested route ') + notFoundPath,
      type: 'error',
      ttl: 1 //how many redirections the alert will 'survive'.
    };
    component.showAlert(alertSettings, false);
    this.navigateTo(GenericHelpers.addLeadingSlash(pathToRedirect));
  }

  navigateToLink(item) {
    if (item.externalLink && item.externalLink.url) {
      this.navigateToExternalLink(item.externalLink);
    } else {
      this.navigateTo(item.link);
    }
  }

  navigateToExternalLink(externalLink) {
    const updatedExternalLink = {
      ...NAVIGATION_DEFAULTS.externalLink,
      ...externalLink
    };
    window
      .open(
        updatedExternalLink.url,
        updatedExternalLink.sameWindow ? '_self' : '_blank'
      )
      .focus();
  }
}

export const Routing = new RoutingClass();
