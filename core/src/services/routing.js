// Methods related to the routing. They mostly end up changing the iframe view which is handled by `iframe.js` file;
// Please consider adding any new methods to 'routing-helpers' if they don't require anything from this file.
import { Navigation } from '../navigation/services/navigation';
import { GenericHelpers, RoutingHelpers, IframeHelpers, EventListenerHelpers } from '../utilities/helpers';
import { LuigiConfig, LuigiI18N, LuigiNavigation } from '../core-api';
import { Iframe } from './';
import { NAVIGATION_DEFAULTS } from './../utilities/luigi-config-defaults';
import { NodeDataManagementStorage } from './node-data-management';
import { WebComponentService } from './web-components';

class RoutingClass {
  getNodePath(node, params) {
    return node ? RoutingHelpers.buildRoute(node, node.pathSegment ? '/' + node.pathSegment : '', params) : '';
  }

  normalizePath(path) {
    const hasLeadingSlash = path.indexOf('/') === 0;
    let url = new URL(path, 'http://valid.url');
    const ret = url.pathname + url.search + url.hash;
    if (!hasLeadingSlash && ret.indexOf('/') === 0) {
      return ret.substr(1);
    }
    return ret;
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
  async navigateTo(route, pushState = true, navSync = true) {
    const { nodeObject } = await Navigation.extractDataFromPath(route);
    if (await Navigation.shouldPreventNavigation(nodeObject)) {
      return;
    }

    const windowPath = GenericHelpers.trimLeadingSlash(this.getWindowPath());
    if (windowPath === GenericHelpers.trimLeadingSlash(route)) {
      return;
    }
    const hashRouting = LuigiConfig.getConfigValue('routing.useHashRouting');
    let url = new URL(location.href);
    hashRouting ? (url.hash = route) : (url.pathname = route);

    const chosenHistoryMethod = pushState ? 'pushState' : 'replaceState';
    const method = LuigiConfig.getConfigValue('routing.disableBrowserHistory') ? 'replaceState' : chosenHistoryMethod;
    window.history[method](
      {
        path: hashRouting ? url.hash : decodeURIComponent(url.pathname)
      },
      '',
      hashRouting ? url.hash : decodeURIComponent(url.pathname)
    );

    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Browser_compatibility
    // https://developer.mozilla.org/en-US/docs/Web/API/Event#Browser_compatibility
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/createEvent
    let event;
    if (GenericHelpers.isIE()) {
      event = document.createEvent('Event');
      event.initEvent('popstate', true, true);
    } else {
      event = navSync ? new CustomEvent('popstate') : new CustomEvent('popstate', { detail: { withoutSync: true } });
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
      const nodePathSegments = GenericHelpers.trimLeadingSlash(this.getNodePath(node.parent)).split('/');
      const windowPathSegments = GenericHelpers.trimLeadingSlash(windowPath).split('/');
      if (windowPathSegments.length > nodePathSegments.length) {
        windowPath = windowPathSegments.slice(0, nodePathSegments.length).join('/');
      }
    }
    return this.normalizePath(GenericHelpers.addLeadingSlash(this.concatenatePath(windowPath, node.link)));
  }

  getHashPath(url = window.location.hash) {
    // check for intent, if any
    if (url && /\?intent=/i.test(url)) {
      const hash = url.replace('#/#', '#'); // handle default hash and intent specific hash
      const intentHash = RoutingHelpers.getIntentPath(hash.split('#')[1]);
      if (intentHash) {
        return intentHash;
      }
    }

    return url.split('#/')[1];
  }

  getModifiedPathname() {
    // check for intent, if any
    if (window.location.hash && /\?intent=/i.test(window.location.hash)) {
      const hash = window.location.hash.replace('#/#', '').replace('#', '');
      const intentPath = RoutingHelpers.getIntentPath(hash);
      return intentPath ? intentPath : '/';
    }
    const path = (window.history.state && window.history.state.path) || window.location.pathname;
    return path
      .split('/')
      .slice(1)
      .join('/');
  }

  getCurrentPath() {
    if (/\?intent=/i.test(window.location.hash)) {
      const hash = window.location.hash.replace('#/#', '').replace('#', '');
      const intentPath = RoutingHelpers.getIntentPath(hash);
      if (intentPath) {
        // if intent faulty or illegal then skip
        return intentPath;
      }
    }
    return LuigiConfig.getConfigValue('routing.useHashRouting')
      ? window.location.hash.replace('#', '') // TODO: GenericHelpers.getPathWithoutHash(window.location.hash) fails in ContextSwitcher
      : window.location.search
      ? GenericHelpers.trimLeadingSlash(window.location.pathname) + window.location.search
      : GenericHelpers.trimLeadingSlash(window.location.pathname);
  }

  async handleRouteChange(path, component, iframeElement, config, withoutSync) {
    const defaultPattern = [/access_token=/, /id_token=/];
    const patterns = LuigiConfig.getConfigValue('routing.skipRoutingForUrlPatterns') || defaultPattern;
    const hasSkipMatches = patterns.filter(p => window.location.href.match(p)).length !== 0;
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

      const featureToggleProperty = LuigiConfig.getConfigValue('settings.featureToggles.queryStringParam')
        ? LuigiConfig.getConfigValue('settings.featureToggles.queryStringParam')
        : undefined;
      if (featureToggleProperty) {
        RoutingHelpers.setFeatureToggles(featureToggleProperty, path);
      }

      await this.handleBookmarkableModalPath();

      const previousCompData = component.get();
      this.checkInvalidateCache(previousCompData, path);
      const pathUrlRaw = path && path.length ? GenericHelpers.getPathWithoutHash(path) : '';
      const { nodeObject, pathData } = await Navigation.extractDataFromPath(path);
      const viewUrl = nodeObject.viewUrl || '';

      if (!viewUrl && !nodeObject.compound) {
        const defaultChildNode = await RoutingHelpers.getDefaultChildNode(pathData, async (node, ctx) => {
          return await Navigation.getChildren(node, ctx);
        });

        if (pathData.isExistingRoute) {
          //normal navigation can be performed
          const trimmedPathUrl = GenericHelpers.getTrimmedUrl(path);
          this.navigateTo(`${trimmedPathUrl ? `/${trimmedPathUrl}` : ''}/${defaultChildNode}`, false);
          // reset comp data
          component.set({ navigationPath: [] });
        } else {
          if (defaultChildNode && pathData.navigationPath.length > 1) {
            //last path segment was invalid but a default node could be in its place
            this.showPageNotFoundError(
              component,
              GenericHelpers.trimTrailingSlash(pathData.matchedPath) + '/' + defaultChildNode,
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
          this.showPageNotFoundError(component, rootPath, pathUrlRaw);
        }
        return;
      }

      if (!pathData.isExistingRoute) {
        this.showPageNotFoundError(component, pathData.matchedPath, pathUrlRaw, true);
        return;
      }

      const hideNav = LuigiConfig.getConfigBooleanValue('settings.hideNavigation');
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

      const ctx = RoutingHelpers.substituteDynamicParamsInObject(
        Object.assign({}, pathData.context, currentNode.context),
        pathData.pathParams
      );
      pathData.navigationPath._context = ctx;
      const newNodeData = {
        hideNav,
        viewUrl,
        nodeParams,
        viewGroup,
        urlParamsRaw,
        currentNode,
        navigationPath: pathData.navigationPath,
        context: ctx,
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
          const { nodeObject, pathData } = await Navigation.extractDataFromPath(prevUrl);
          const previousNode = nodeObject;
          Navigation.onNodeChange(previousNode, currentNode);
        }
      }
      if (nodeObject.compound && GenericHelpers.requestExperimentalFeature('webcomponents', true)) {
        if (iContainer) {
          iContainer.classList.add('lui-webComponent');
        }
        Iframe.switchActiveIframe(iframeElement, undefined, false);
        this.navigateWebComponentCompound(config, component, iframeElement, nodeObject, iContainer);
      } else if (nodeObject.webcomponent && GenericHelpers.requestExperimentalFeature('webcomponents', true)) {
        if (iContainer) {
          iContainer.classList.add('lui-webComponent');
        }
        Iframe.switchActiveIframe(iframeElement, undefined, false);
        this.navigateWebComponent(config, component, iframeElement, nodeObject, iContainer);
      } else {
        if (iContainer) {
          iContainer.classList.remove('lui-webComponent');
        }
        if (!withoutSync) {
          await Iframe.navigateIframe(config, component, iframeElement);
        } else {
          const componentData = component.get();
          const internalData = await component.prepareInternalData(config);
          // send a message to the iFrame to trigger a context update listener when withoutSync enabled
          IframeHelpers.sendMessageToIframe(config.iframe, {
            msg: 'luigi.navigate',
            viewUrl: viewUrl,
            context: JSON.stringify(componentData.context),
            nodeParams: JSON.stringify(Object.assign({}, componentData.nodeParams)),
            pathParams: JSON.stringify(Object.assign({}, componentData.pathParams)),
            internal: JSON.stringify(internalData),
            withoutSync: true
          });
        }
      }
    } catch (err) {
      console.info('Could not handle route change', err);
    }
  }

  async handleBookmarkableModalPath() {
    const additionalModalPath = RoutingHelpers.getModalPathFromPath();
    if (additionalModalPath) {
      const modalParams = RoutingHelpers.getModalParamsFromPath();
      const { nodeObject } = await Navigation.extractDataFromPath(additionalModalPath);
      LuigiNavigation.openAsModal(additionalModalPath, nodeObject.openNodeInModal || modalParams);
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
    if (previousCompData.navigationPath && previousCompData.navigationPath.length > 0) {
      let previousNavPathWithoutRoot = previousCompData.navigationPath.slice(1);

      let isSamePath = true;
      for (let i = 0; i < previousNavPathWithoutRoot.length; i++) {
        let newPathSegment = newPathArray.length > i ? newPathArray[i] : undefined;
        let previousPathNode = previousNavPathWithoutRoot[i];

        if (newPathSegment !== previousPathNode.pathSegment || !isSamePath) {
          if (RoutingHelpers.isDynamicNode(previousPathNode)) {
            if (
              !isSamePath ||
              newPathSegment !== RoutingHelpers.getDynamicNodeValue(previousPathNode, previousCompData.pathParams)
            ) {
              NodeDataManagementStorage.deleteNodesRecursively(previousPathNode);
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
        if (activeIframe && activeIframe.vg && Iframe.canCache(activeIframe.vg)) {
          Iframe.switchActiveIframe(IframeHelpers.getIframeContainer(), undefined, false);
          setTimeout(() => {
            Iframe.switchActiveIframe(IframeHelpers.getIframeContainer(), activeIframe, false);
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

  async showPageNotFoundError(component, pathToRedirect, notFoundPath, isAnyPathMatched = false) {
    const pageNotFoundHandler = LuigiConfig.getConfigValue('routing.pageNotFoundHandler');

    if (typeof pageNotFoundHandler === 'function') {
      //custom 404 handler is provided, use it
      const result = pageNotFoundHandler(notFoundPath, isAnyPathMatched);
      if (result && result.redirectTo) {
        this.navigateTo(result.redirectTo);
      }
      return;
    }

    const alertSettings = {
      text: LuigiI18N.getTranslation(isAnyPathMatched ? 'luigi.notExactTargetNode' : 'luigi.requestedRouteNotFound', {
        route: notFoundPath
      }),
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
    window.open(updatedExternalLink.url, updatedExternalLink.sameWindow ? '_self' : '_blank').focus();
  }

  navigateWebComponent(config, component, node, navNode, iframeContainer) {
    const componentData = component.get();
    const wc_container = document.querySelector('.wcContainer');

    while (wc_container.lastChild) {
      wc_container.lastChild.remove();
    }

    WebComponentService.renderWebComponent(componentData.viewUrl, wc_container, componentData.context, navNode);
  }

  navigateWebComponentCompound(config, component, node, navNode, iframeContainer) {
    const componentData = component.get();
    const wc_container = document.querySelector('.wcContainer');

    while (wc_container.lastChild) {
      wc_container.lastChild.remove();
    }

    WebComponentService.renderWebComponentCompound(navNode, wc_container, componentData.context);
  }

  appendModalDataToUrl(modalPath, modalParams) {
    // global setting for persistence in url .. default false
    let queryParamSeparator = RoutingHelpers.getHashQueryParamSeparator();
    const params = RoutingHelpers.getQueryParams();
    const modalParamName = RoutingHelpers.getModalViewParamName();

    const prevModalPath = params[modalParamName];
    if (prevModalPath !== modalPath) {
      params[modalParamName] = modalPath;
      if (modalParams && Object.keys(modalParams).length) {
        params[`${modalParamName}Params`] = JSON.stringify(modalParams);
      }
      const url = new URL(location.href);
      const hashRoutingActive = LuigiConfig.getConfigBooleanValue('routing.useHashRouting');
      if (hashRoutingActive) {
        const queryParamIndex = location.hash.indexOf(queryParamSeparator);
        if (queryParamIndex !== -1) {
          url.hash = url.hash.slice(0, queryParamIndex);
        }
        url.hash = `${url.hash}${queryParamSeparator}${RoutingHelpers.encodeParams(params)}`;
      } else {
        url.search = `?${RoutingHelpers.encodeParams(params)}`;
      }
      history.replaceState(window.state, '', url.href);
    }
  }

  removeModalDataFromUrl() {
    const params = RoutingHelpers.getQueryParams();
    const modalParamName = RoutingHelpers.getModalViewParamName();
    let url = new URL(location.href);
    const hashRoutingActive = LuigiConfig.getConfigBooleanValue('routing.useHashRouting');
    if (hashRoutingActive) {
      let modalParamsObj = {};

      if (params[modalParamName]) {
        modalParamsObj[modalParamName] = params[modalParamName];
      }
      if (params[`${modalParamName}Params`]) {
        modalParamsObj[`${modalParamName}Params`] = params[`${modalParamName}Params`];
      }
      let prevModalPath = RoutingHelpers.encodeParams(modalParamsObj);
      if (url.hash.includes(`?${prevModalPath}`)) {
        url.hash = url.hash.replace(`?${prevModalPath}`, '');
      } else if (url.hash.includes(`&${prevModalPath}`)) {
        url.hash = url.hash.replace(`&${prevModalPath}`, '');
      }
    } else {
      let searchParams = new URLSearchParams(url.search.slice(1));
      searchParams.delete(modalParamName);
      searchParams.delete(`${modalParamName}Params`);
      let finalUrl = '';
      Array.from(searchParams.keys()).forEach(searchParamKey => {
        finalUrl += (finalUrl === '' ? '?' : '&') + searchParamKey + '=' + searchParams.get(searchParamKey);
      });
      url.search = finalUrl;
    }
    history.replaceState(window.state, '', url.href);
  }
}

export const Routing = new RoutingClass();
