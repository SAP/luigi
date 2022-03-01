import { LuigiConfig } from '.';
import { GenericHelpers, RoutingHelpers } from '../utilities/helpers';
/**
 * @name Routing
 */
class LuigiRouting {
  /**
   * Use these functions for navigation-related features.
   * @name Routing
   */
  constructor() {}

  /**
   * Get search parameter from URL as an object.
   * @memberof Routing
   * @since 1.16.1
   * @returns {Object}
   * @example
   * Luigi.routing().getSearchParams();
   */
  getSearchParams() {
    const queryParams = {};
    const url = new URL(location);
    if (LuigiConfig.getConfigValue('routing.useHashRouting')) {
      for (const [key, value] of new URLSearchParams(url.hash.split('?')[1])) {
        queryParams[key] = value;
      }
    } else {
      for (const [key, value] of url.searchParams.entries()) {
        queryParams[key] = value;
      }
    }
    return queryParams;
  }

  /**
   * Add search parameters to the URL.
   * If [hash routing](navigation-parameters-reference.md#usehashrouting) is enabled, the search parameters will be set after the hash.
   * In order to delete a search query param you can set the value of the param to undefined.
   * @memberof Routing
   * @since 1.16.1
   * @param {Object} params
   * @param {boolean} keepBrowserHistory
   * @example
   * Luigi.routing().addSearchParams({luigi:'rocks', mario:undefined}, false);
   */
  addSearchParams(params, keepBrowserHistory) {
    if (!GenericHelpers.isObject(params)) {
      console.log('Params argument must be an object');
      return;
    }
    const url = new URL(location);
    if (LuigiConfig.getConfigValue('routing.useHashRouting')) {
      url.hash = RoutingHelpers.addParamsOnHashRouting(params, url.hash);
    } else {
      RoutingHelpers.modifySearchParams(params, url.searchParams);
    }

    this.handleBrowserHistory(keepBrowserHistory, url.href);
    LuigiConfig.configChanged();
  }

  addNodeParams(params, keepBrowserHistory) {
    if (!GenericHelpers.isObject(params)) {
      console.log('Params argument must be an object');
      return;
    }

    const paramPrefix = RoutingHelpers.getContentViewParamPrefix();
    const url = new URL(location);
    if (LuigiConfig.getConfigValue('routing.useHashRouting')) {
      url.hash = RoutingHelpers.addParamsOnHashRouting(params, url.hash, paramPrefix);
    } else {
      RoutingHelpers.modifySearchParams(params, url.searchParams, paramPrefix);
    }

    this.handleBrowserHistory(keepBrowserHistory, url.href);
    LuigiConfig.configChanged();
  }

  handleBrowserHistory(keepBrowserHistory, href) {
    if (keepBrowserHistory) {
      window.history.pushState({}, '', href);
    } else {
      window.history.replaceState({}, '', href);
    }
  }

  getAnchor() {
    const { hash } = new URL(location);
    const useHashRouting = LuigiConfig.getConfigValue('routing.useHashRouting');

    return (useHashRouting && hash.split('#').length === 2) ? '' : hash.split('#').pop();
  }

  setAnchor(value) {
    const { hash } = new URL(location);
    if (LuigiConfig.getConfigValue('routing.useHashRouting')) {
      const arr = hash.split('#').slice(0, -1);
      window.location.hash = [...arr, value].join('#');;
    } else {
      window.location.hash = value;
    }

    LuigiConfig.configChanged();
  }
}

export const routing = new LuigiRouting();
