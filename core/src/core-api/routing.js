import { LuigiConfig } from '.';
import { GenericHelpers } from '../utilities/helpers';
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
   * @since NEXTRELEASE
   * @returns {Object}
   * @example
   * Luigi.routing().getSearchParams();
   */
  getSearchParams() {
    const queryParams = {};
    const url = new URL(location);
    if (LuigiConfig.getConfigValue('routing.useHashRouting')) {
      const queryParamsString = url.hash.split('?')[1];
      if (!queryParamsString) return {};
      return this._stringSearchParamsToObject(queryParamsString);
    } else {
      for (const [key, value] of url.searchParams.entries()) {
        queryParams[key] = value;
      }
      return queryParams;
    }
  }

  /**
   * Add search parameters to the URL.
   * If [hash routing](navigation-parameters-reference.md#usehashrouting) is enabled, the search parameters will be set after the hash.
   * @memberof Routing
   * @since NEXTRELEASE
   * @param {Object} params
   * @example
   * Luigi.routing().addSearchParams({luigi:'rocks'});
   */
  addSearchParams(params) {
    if (!GenericHelpers.isObject(params)) {
      console.log('Params argument must be an object');
      return;
    }
    const url = new URL(location);
    if (LuigiConfig.getConfigValue('routing.useHashRouting')) {
      let [hashvalue, givenQueryParamsString] = url.hash.split('?');
      let queryParamsString = '';
      if (givenQueryParamsString) {
        const givenQueryParams = this._stringSearchParamsToObject(givenQueryParamsString);
        params = Object.assign(givenQueryParams, params);
      }
      for (const [key, value] of Object.entries(params)) {
        if (queryParamsString !== '' && queryParamsString !== undefined) {
          queryParamsString += '&';
        }
        queryParamsString += `${key}=${value}`;
      }
      url.hash = `${hashvalue}?${queryParamsString}`;
    } else {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
      }
    }
    window.history.pushState({}, '', url.href);
    LuigiConfig.configChanged();
  }

  _stringSearchParamsToObject(queryParamsString) {
    return queryParamsString.split('&').reduce((queryParams, param) => {
      let [key, value] = param.split('=');
      queryParams[key] = value;
      return queryParams;
    }, {});
  }

  _prepareSearchParamsForClient(currentNode) {
    let filteredObj = {};
    if (currentNode && currentNode.clientPermissions && currentNode.clientPermissions.urlParameters) {
      Object.keys(currentNode.clientPermissions.urlParameters).forEach(key => {
        if (key in this.getSearchParams() && currentNode.clientPermissions.urlParameters[key].read === true) {
          filteredObj[key] = this.getSearchParams()[key];
        }
      });
    }
    return filteredObj;
  }

  _addSearchParamsFromClient(currentNode, searchParams) {
    if (currentNode && currentNode.clientPermissions && currentNode.clientPermissions.urlParameters) {
      let filteredObj = {};
      Object.keys(currentNode.clientPermissions.urlParameters).forEach(key => {
        if (key in searchParams && currentNode.clientPermissions.urlParameters[key].write === true) {
          filteredObj[key] = searchParams[key];
        }
      });
      if (Object.keys(filteredObj).length > 0) {
        this.addSearchParams(filteredObj);
      }
    }
  }
}

export const routing = new LuigiRouting();
