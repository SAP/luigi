// Methods related to the routing. They mostly end up changing the iframe view which is handled by `iframe.js` file;
// Please consider adding any new methods to 'routing-helpers' if they don't require anything from this file.
import { Navigation } from '../navigation/services/navigation';
import {
  GenericHelpers,
  RoutingHelpers,
  IframeHelpers
} from '../utilities/helpers';
import { LuigiConfig, LuigiI18N } from '../core-api';
import { Iframe } from './iframe';
import { NAVIGATION_DEFAULTS } from './../utilities/luigi-config-defaults';
import { NodeDataManagementStorage } from './node-data-management';
import { WebComponentService } from './web-components';

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
  async navigateTo(route, pushState = true) {
    const { nodeObject } = await Navigation.extractDataFromPath(route);
    if (await Navigation.shouldPreventNavigation(nodeObject)) {
      return;
    }

    const windowPath = GenericHelpers.trimLeadingSlash(this.getWindowPath());
    if (windowPath === GenericHelpers.trimLeadingSlash(route)) {
      return;
    }

    if (LuigiConfig.getConfigValue('routing.useHashRouting')) {
      window.location.hash = route;
      return;
    }

    const method = pushState ? 'pushState' : 'replaceState';
    window.history[method](
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
      : window.location.pathname.concat(window.location.search);
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
    const path =
      (window.history.state && window.history.state.path) ||
      window.location.pathname;

    return path
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

      const featureToggleProperty = LuigiConfig.getConfigValue(
        'settings.featureToggles.queryStringParam'
      )
        ? LuigiConfig.getConfigValue('settings.featureToggles.queryStringParam')
        : undefined;
      if (featureToggleProperty) {
        RoutingHelpers.setFeatureToggles(featureToggleProperty, path);
      }

      const previousCompData = component.get();
      this.checkInvalidateCache(previousCompData, path);
      const pathUrlRaw =
        path && path.length ? GenericHelpers.getPathWithoutHash(path) : '';
      const { nodeObject, pathData } = await Navigation.extractDataFromPath(
        path
      );
      const viewUrl = nodeObject.viewUrl || '';

      if (!viewUrl) {
        const defaultChildNode = await RoutingHelpers.getDefaultChildNode(
          pathData,
          async (node, ctx) => {
            return await Navigation.getChildren(node, ctx);
          }
        );

        if (pathData.isExistingRoute) {
          //normal navigation can be performed
          const trimmedPathUrl = GenericHelpers.getTrimmedUrl(path);
          this.navigateTo(
            `${trimmedPathUrl ? `/${trimmedPathUrl}` : ''}/${defaultChildNode}`,
            false
          );
          // reset comp data
          component.set({ navigationPath: [] });
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
      const viewGroup = RoutingHelpers.findViewGroup(nodeObject);
      const urlParamsRaw = decodeURIComponent(pathUrlRaw.split('?')[1] || '');
      const currentNode =
        pathData.navigationPath && pathData.navigationPath.length > 0
          ? pathData.navigationPath[pathData.navigationPath.length - 1]
          : null;

      let tabNavInherited = false;
      let cnode = currentNode;
      while (cnode) {
        if (cnode.tabNav === true) {
          tabNavInherited = true;
          break;
        } else if (cnode.tabNav === false) {
          tabNavInherited = false;
          break;
        }
        cnode = cnode.parent;
      }

      let cNode2 = currentNode;
      let hideSideNavInherited = nodeObject.hideSideNav;
      while (cNode2) {
        if (cNode2.tabNav && cNode2.hideSideNav === true) {
          hideSideNavInherited = true;
          break;
        }
        if (cNode2.hideSideNav === false) {
          hideSideNavInherited = false;
          break;
        }
        cNode2 = cNode2.parent;
      }

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
        hideSideNav: hideSideNavInherited || false,
        isolateView: nodeObject.isolateView || false,
        tabNav: tabNavInherited
      };

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

      let iContainer = document.getElementsByClassName('iframeContainer')[0];
      if (iContainer) {
        if (tabNavInherited) {
          //document.body.classList.add('lui-simpleSlideInNav');
          iContainer.classList.add('iframeContainerTabNav');
        } else {
          if (iContainer.classList.contains('iframeContainerTabNav')) {
            iContainer.classList.remove('iframeContainerTabNav');
          }
        }
      }
      if (config.iframe !== null) {
        const prevUrl = config.iframe.luigi.viewUrl.split('/').pop();
        if (path !== prevUrl) {
          const { nodeObject, pathData } = await Navigation.extractDataFromPath(
            prevUrl
          );
          const previousNode = nodeObject;
          Navigation.onNodeChange(previousNode, currentNode);
        }
      }
      if (nodeObject.webcomponent) {
        if (iContainer) {
          iContainer.classList.add('lui-webComponent');
        }
        this.navigateWebComponent(
          config,
          component,
          iframeElement,
          nodeObject,
          iContainer
        );
      } else {
        if (iContainer) {
          iContainer.classList.remove('lui-webComponent');
        }
        Iframe.navigateIframe(config, component, iframeElement);
      }
    } catch (err) {
      console.info('Could not handle route change', err);
    }
  }

  /**
      This function takes the previous node data and the new node path and compares
      if the navigation path of both contains a dynamic node.
        - If the path of the previous node (which contains a dynamic node) and the new node is different, the previous node
        will be removed from cache, because when you come back to the previous node (which would be in the cache)
        you can not ensure that it is up to date.
        - If the dynamic node value of the new node is different from the previous node, the previous node will be removed
        from cache with all its children.
      */
  checkInvalidateCache(previousCompData, newPath) {
    let newPathArray = newPath.split('/');
    if (
      previousCompData.navigationPath &&
      previousCompData.navigationPath.length > 0
    ) {
      let previousNavPathWithoutRoot = previousCompData.navigationPath.slice(1);

      let isSamePath = true;
      for (let i = 0; i < previousNavPathWithoutRoot.length; i++) {
        let newPathSegment =
          newPathArray.length > i ? newPathArray[i] : undefined;
        let previousPathNode = previousNavPathWithoutRoot[i];

        if (newPathSegment !== previousPathNode.pathSegment || !isSamePath) {
          if (RoutingHelpers.isDynamicNode(previousPathNode)) {
            if (
              !isSamePath ||
              newPathSegment !==
                RoutingHelpers.getDynamicNodeValue(
                  previousPathNode,
                  previousCompData.pathParams
                )
            ) {
              NodeDataManagementStorage.deleteNodesRecursively(
                previousPathNode
              );
              break;
            }
          } else {
            isSamePath = false;
          }
        }
      }
    }
  }

  handleRouteClick(node, component) {
    const route = RoutingHelpers.getRouteLink(node, component.get().pathParams);
    if (node.externalLink && node.externalLink.url) {
      this.navigateToExternalLink(route);
      // externalLinkUrl property is provided so there's no need to trigger routing mechanizm
    } else if (node.link) {
      this.navigateTo(route);
    } else {
      const windowPath = GenericHelpers.trimLeadingSlash(this.getWindowPath());
      if (windowPath === GenericHelpers.trimLeadingSlash(route)) {
        const iframeContainer = IframeHelpers.getIframeContainer();
        const activeIframe = Iframe.getActiveIframe(iframeContainer);
        if (
          activeIframe &&
          activeIframe.vg &&
          Iframe.canCache(activeIframe.vg)
        ) {
          Iframe.switchActiveIframe(
            IframeHelpers.getIframeContainer(),
            undefined,
            false
          );
          setTimeout(() => {
            Iframe.switchActiveIframe(
              IframeHelpers.getIframeContainer(),
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
      const result = pageNotFoundHandler(notFoundPath, isAnyPathMatched);
      if (result && result.redirectTo) {
        this.navigateTo(result.redirectTo);
      }
      return;
    }

    const alertSettings = {
      text: LuigiI18N.getTranslation(
        isAnyPathMatched
          ? 'luigi.notExactTargetNode'
          : 'luigi.requestedRouteNotFound',
        { route: notFoundPath }
      ),
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

  navigateWebComponent(config, component, node, navNode, iframeContainer) {
    const componentData = component.get();
    const wc_container = document.querySelector('.wcContainer');

    while (wc_container.lastChild) {
      wc_container.lastChild.remove();
    }

    WebComponentService.renderWebComponent(
      componentData.viewUrl,
      wc_container,
      componentData.context
    );
  }
}

export const Routing = new RoutingClass();
