import { LuigiConfig } from '.';
import { Iframe } from '../services';
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
   * @since NEXTRELEASE
   * @returns {Object}
   * @example
   * Luigi.routing().getSearchParams();
   */
  getSearchParams() {
    const queryParams = {};
    const url = new URL(location);
    if (LuigiConfig.getConfigValue('routing.useHashRouting')) {
      let queryParamsString = url.hash.split('?')[1];
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
    } else {
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
    }
  }

  _stringSearchParamsToObject(queryParamsString) {
    let queryParams = queryParamsString.split('&');
    if (queryParams.length === 1) {
      let [key, value] = queryParams[0].split('=');
      return { [key]: value };
    } else {
      return queryParamsString.split('&').reduce((queryParams, param) => {
        let [key, value] = param.split('=');
        queryParams[key] = value;
        return queryParams;
      }, {});
    }
  }
}

export const routing = new LuigiRouting();
