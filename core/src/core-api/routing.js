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
   * @since NEXTRELEASE
   * @param {Object} params
   * @example
   * Luigi.routing().addSearchParams({luigi:'rocks', mario:undefined});
   */
  addSearchParams(params) {
    if (!GenericHelpers.isObject(params)) {
      console.log('Params argument must be an object');
      return;
    }
    const url = new URL(location);
    if (LuigiConfig.getConfigValue('routing.useHashRouting')) {
      let [hashValue, givenQueryParamsString] = url.hash.split('?');
      let searchParams = new URLSearchParams(givenQueryParamsString);
      this._modifySearchParam(params, searchParams);
      url.hash = hashValue;
      if (searchParams.toString() !== '') {
        url.hash += `?${decodeURIComponent(searchParams.toString())}`;
      }
    } else {
      this._modifySearchParam(params, url.searchParams);
    }
    window.history.pushState({}, '', url.href);
    LuigiConfig.configChanged();
  }

  //Adds and remove properties from searchParams
  _modifySearchParam(params, searchParams) {
    for (const [key, value] of Object.entries(params)) {
      searchParams.set(key, value);
      if (value === undefined) {
        searchParams.delete(key);
      }
    }
  }
}

export const routing = new LuigiRouting();
