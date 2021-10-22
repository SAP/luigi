// Helper methods for 'routing.js' file. They don't require any method from 'routing.js' but are required by them.
// They are also rarely used directly from outside of 'routing.js'
import { LuigiConfig, LuigiFeatureToggles, LuigiI18N, LuigiRouting } from '../../core-api';
import { AsyncHelpers, EscapingHelpers, EventListenerHelpers, GenericHelpers } from './';
import { Routing } from '../../services/routing';

class RoutingHelpersClass {
  constructor() {
    this.defaultContentViewParamPrefix = '~';
    this.defaultQueryParamSeparator = '?';
    this.defaultModalViewParamName = 'modal';
  }

  getLastNodeObject(pathData) {
    const lastElement = [...pathData.navigationPath].pop();
    return lastElement ? lastElement : {};
  }

  async getDefaultChildNode(pathData, childrenResolverFn) {
    const lastElement = pathData.navigationPath[pathData.navigationPath.length - 1];

    const children = childrenResolverFn
      ? await childrenResolverFn(lastElement, pathData.context)
      : await AsyncHelpers.getConfigValueFromObjectAsync(lastElement, 'children', pathData.context);
    const pathExists = children.find(childNode => childNode.pathSegment === lastElement.defaultChildNode);

    if (lastElement.defaultChildNode && pathExists) {
      return lastElement.defaultChildNode;
    } else if (children && children.length) {
      const rootPath = pathData.navigationPath.length === 1;
      if (rootPath) {
        const firstNodeWithPathSegment = children.find(child => child.pathSegment);
        return (
          (firstNodeWithPathSegment && firstNodeWithPathSegment.pathSegment) ||
          console.error('At least one navigation node in the root hierarchy must have a pathSegment.')
        );
      }
      const validChild = children.find(
        child => child.pathSegment && (child.viewUrl || (child.externalLink && child.externalLink.url))
      );
      if (validChild) return validChild.pathSegment;
    }

    return '';
  }

  parseParams(paramsString) {
    const result = {};
    const viewParamString = paramsString;
    const pairs = viewParamString ? viewParamString.split('&') : null;
    if (pairs) {
      pairs.forEach(pairString => {
        const keyValue = pairString.split('=');
        if (keyValue && keyValue.length > 0) {
          result[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
        }
      });
    }
    return result;
  }

  encodeParams(dataObj) {
    let queryArr = [];
    for (let key in dataObj) {
      queryArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(dataObj[key]));
    }
    return queryArr.join('&');
  }

  getNodeParams(params) {
    const result = {};
    const paramPrefix = this.getContentViewParamPrefix();
    if (params) {
      Object.entries(params).forEach(entry => {
        if (entry[0].startsWith(paramPrefix)) {
          const paramName = entry[0].substr(paramPrefix.length);
          result[paramName] = entry[1];
        }
      });
    }
    return this.sanitizeParamsMap(result);
  }

  applyPathParams(path, pathParams) {
    let result = path;
    if (pathParams) {
      Object.entries(pathParams).forEach(([param, value]) => {
        result = result.replace(new RegExp(':' + param, 'g'), value);
      });
    }
    return result;
  }

  findViewGroup(node) {
    if (node.viewGroup) {
      return node.viewGroup;
    } else if (node.parent) {
      return this.findViewGroup(node.parent);
    }
  }

  getContentViewParamPrefix() {
    let prefix = LuigiConfig.getConfigValue('routing.nodeParamPrefix');
    if (prefix === false) {
      prefix = '';
    } else if (!prefix) {
      prefix = this.defaultContentViewParamPrefix;
    }
    return prefix;
  }

  getModalViewParamName() {
    let paramName = LuigiConfig.getConfigValue('routing.modalPathParam');
    if (!paramName) {
      paramName = this.defaultModalViewParamName;
    }
    return paramName;
  }

  /**
   * Get the query param separator which is used with hashRouting
   * Default: :
   * @example /home?modal=(urlencoded)/some-modal?modalParams=(urlencoded){...}&otherParam=hmhm
   * @returns the first query param separator (like ? for path routing)
   */
  getHashQueryParamSeparator() {
    return this.defaultQueryParamSeparator;
  }

  getQueryParam(paramName) {
    return this.getQueryParams()[paramName];
  }
  getQueryParams() {
    const hashRoutingActive = LuigiConfig.getConfigBooleanValue('routing.useHashRouting');
    return hashRoutingActive ? this.getLocationHashQueryParams() : this.getLocationSearchQueryParams();
  }
  getLocationHashQueryParams() {
    const queryParamIndex = location.hash.indexOf(this.defaultQueryParamSeparator);
    return queryParamIndex !== -1 ? RoutingHelpers.parseParams(location.hash.slice(queryParamIndex + 1)) : {};
  }
  getLocationSearchQueryParams() {
    return location.search ? RoutingHelpers.parseParams(location.search.slice(1)) : {};
  }

  getModalPathFromPath() {
    const path = this.getQueryParam(this.getModalViewParamName());
    return path && decodeURIComponent(path);
  }

  getModalParamsFromPath() {
    const modalParamsStr = this.getQueryParam(`${this.getModalViewParamName()}Params`);
    return modalParamsStr && JSON.parse(decodeURIComponent(modalParamsStr));
  }

  addRouteChangeListener(callback) {
    const hashRoutingActive = LuigiConfig.getConfigValue('routing.useHashRouting');

    EventListenerHelpers.addEventListener('message', e => {
      if ('refreshRoute' === e.data.msg && e.origin === window.origin) {
        const path = hashRoutingActive ? Routing.getHashPath() : Routing.getModifiedPathname();
        callback(path);
      }
    });

    EventListenerHelpers.addEventListener('popstate', e => {
      const method = hashRoutingActive ? Routing.getHashPath(location.href) : Routing.getModifiedPathname();
      callback(method, e.detail && e.detail.withoutSync);
    });
  }

  buildRoute(node, path, params) {
    return !node.parent
      ? path + (params ? '?' + params : '')
      : this.buildRoute(node.parent, `/${node.parent.pathSegment}${path}`, params);
  }

  getRouteLink(node, pathParams, relativePathPrefix) {
    const pp = relativePathPrefix || '';
    if (node.externalLink && node.externalLink.url) {
      return node.externalLink;
      // externalLinkUrl property is provided so there's no need to trigger routing mechanizm
    } else if (node.link) {
      const link = node.link.startsWith('/') ? node.link : Routing.buildFromRelativePath(node);
      return pp + link;
    }

    let route = RoutingHelpers.buildRoute(node, `/${node.pathSegment}`);
    return pp + GenericHelpers.replaceVars(route, pathParams, ':', false);
  }

  getNodeHref(node, pathParams) {
    if (LuigiConfig.getConfigBooleanValue('navigation.addNavHrefs')) {
      const link = RoutingHelpers.getRouteLink(
        node,
        pathParams,
        LuigiConfig.getConfigValue('routing.useHashRouting') ? '#' : ''
      );
      return this.getI18nViewUrl(link.url) || link;
    }
    return 'javascript:void(0)';
  }

  substituteDynamicParamsInObject(object, paramMap, paramPrefix = ':', contains = false) {
    return Object.entries(object)
      .map(([key, value]) => {
        const foundKey = contains
          ? Object.keys(paramMap).find(key2 => value && value.indexOf(paramPrefix + key2) >= 0)
          : Object.keys(paramMap).find(key2 => value === paramPrefix + key2);
        return [
          key,
          foundKey ? (contains ? value.replace(paramPrefix + foundKey, paramMap[foundKey]) : paramMap[foundKey]) : value
        ];
      })
      .reduce((acc, [key, value]) => {
        return Object.assign(acc, { [key]: value });
      }, {});
  }

  /**
   * Maps a path to the nodes route, replacing all dynamic pathSegments with the concrete values in path.
   * Example: path='/object/234/subobject/378/some/node', node with path '/object/:id/subobject/:subid' results in
   * '/object/234/subobject/378/'.
   * @param {*} path a concrete node path, typically the current app route.
   * @param {*} node a node which must be an ancestor of the resolved node from path.
   *
   * @returns a string with the route or undefined, if node is not an ancestor of path-node
   */
  mapPathToNode(path, node) {
    if (!path || !node) {
      return;
    }
    const pathSegments = GenericHelpers.trimLeadingSlash(path).split('/');
    const nodeRoute = RoutingHelpers.buildRoute(node, `/${node.pathSegment}`);
    const nodeRouteSegments = GenericHelpers.trimLeadingSlash(nodeRoute).split('/');
    if (pathSegments.length < nodeRouteSegments.length) {
      return;
    }
    let resultingRoute = '';
    for (let i = 0; i < nodeRouteSegments.length; i++) {
      if (pathSegments[i] !== nodeRouteSegments[i] && nodeRouteSegments[i].indexOf(':') !== 0) {
        return;
      }
      resultingRoute += '/' + pathSegments[i];
    }
    return resultingRoute;
  }

  /**
   * Returns true or false whether the passed node is a dynamic node or not
   * @param {*} node
   */
  isDynamicNode(node) {
    return node.pathSegment && node.pathSegment.length > 0 && node.pathSegment[0] === ':';
  }

  /**
   * Returns the value from the passed node's pathSegment, e.g. :groupId -> yourGroupId
   * @param {*} node
   * @param {*} pathParams
   */
  getDynamicNodeValue(node, pathParams) {
    return this.isDynamicNode(node) ? pathParams[node.pathSegment.substring(1)] : undefined;
  }

  /**
   * Returns the viewUrl with current locale, e.g. luigi/{i18n.currentLocale}/ -> luigi/en
   * if viewUrl contains {i18n.currentLocale} term, it will be replaced by current locale
   * @param {*} viewUrl
   */
  getI18nViewUrl(viewUrl) {
    const i18n_currentLocale = '{i18n.currentLocale}';
    const locale = LuigiI18N.getCurrentLocale();
    const hasI18n = viewUrl && viewUrl.includes(i18n_currentLocale);

    return hasI18n ? viewUrl.replace(i18n_currentLocale, locale) : viewUrl;
  }

  substituteViewUrl(viewUrl, componentData) {
    const contextVarPrefix = 'context.';
    const nodeParamsVarPrefix = 'nodeParams.';
    const searchQuery = 'routing.queryParams';

    viewUrl = GenericHelpers.replaceVars(viewUrl, componentData.pathParams, ':', false);
    viewUrl = GenericHelpers.replaceVars(viewUrl, componentData.context, contextVarPrefix);
    viewUrl = GenericHelpers.replaceVars(viewUrl, componentData.nodeParams, nodeParamsVarPrefix);
    viewUrl = this.getI18nViewUrl(viewUrl);

    if (viewUrl.includes(searchQuery)) {
      const viewUrlSearchParam = viewUrl.split('?')[1];
      if (viewUrlSearchParam) {
        const key = viewUrlSearchParam.split('=')[0];
        if (LuigiRouting.getSearchParams()[key]) {
          viewUrl = viewUrl.replace(`{${searchQuery}.${key}}`, LuigiRouting.getSearchParams()[key]);
        } else {
          viewUrl = viewUrl.replace(`?${key}={${searchQuery}.${key}}`, '');
        }
      }
    }

    return viewUrl;
  }

  sanitizeParamsMap(paramsMap) {
    return Object.entries(paramsMap).reduce((sanitizedMap, paramPair) => {
      sanitizedMap[EscapingHelpers.sanitizeParam(paramPair[0])] = EscapingHelpers.sanitizeParam(paramPair[1]);
      return sanitizedMap;
    }, {});
  }

  setFeatureToggles(featureToggleProperty, path) {
    let featureTogglesFromUrl;
    let paramsMap = this.sanitizeParamsMap(this.parseParams(path.split('?')[1]));

    if (paramsMap[featureToggleProperty]) {
      featureTogglesFromUrl = paramsMap[featureToggleProperty];
    }
    if (!featureTogglesFromUrl) {
      return;
    }
    let featureToggleList = featureTogglesFromUrl.split(',');
    if (featureToggleList.length > 0 && featureToggleList[0] !== '') {
      featureToggleList.forEach(ft => LuigiFeatureToggles.setFeatureToggle(ft));
    }
  }

  /**
   * This function takes an intentLink and parses it conforming certain limitations in characters usage.
   * Limitations include:
   *  - `semanticObject` allows only alphanumeric characters
   *  - `action` allows alphanumeric characters and the '_' sign
   *
   * Example of resulting output:
   * ```
   *  {
   *    semanticObject: "Sales",
   *    action: "order",
   *    params: [{param1: "value1"},{param2: "value2"}]
   *  };
   * ```
   * @param {string} link  the intent link represents the semantic intent defined by the user
   *                        i.e.: #?intent=semanticObject-action?param=value
   */
  getIntentObject(intentLink) {
    const intentParams = intentLink.split('?intent=')[1];
    if (intentParams) {
      const elements = intentParams.split('-');
      if (elements.length === 2) {
        // avoids usage of '-' in semantic object and action
        const semanticObject = elements[0];
        const actionAndParams = elements[1].split('?');
        // length 2 involves parameters, length 1 involves no parameters
        if (actionAndParams.length === 2 || actionAndParams.length === 1) {
          let action = actionAndParams[0];
          let params = actionAndParams[1];
          // parse parameters, if any
          if (params) {
            params = params.split('&');
            let paramObjects = [];
            params.forEach(item => {
              const param = item.split('=');
              param.length === 2 && paramObjects.push({ [param[0]]: param[1] });
            });
            params = paramObjects;
          }
          const alphanumeric = /^[0-9a-zA-Z]+$/;
          const alphanumericOrUnderscores = /^[0-9a-zA-Z_]+$/;
          // TODO: check for character size limit
          if (semanticObject.match(alphanumeric) && action.match(alphanumericOrUnderscores)) {
            return {
              semanticObject,
              action,
              params
            };
          } else {
            console.warn(
              'Intent found contains illegal characters. Semantic object must be alphanumeric, action must be (alphanumeric+underscore)'
            );
          }
        }
      }
    }
    return false;
  }

  /**
   * This function compares the intentLink parameter with the configuration intentMapping
   * and returns the path segment that is matched together with the parameters, if any
   *
   * Example:
   *
   * For intentLink = `#?intent=Sales-order?foo=bar`
   * and Luigi configuration:
   * ```
   * intentMapping: [{
   *                     semanticObject: 'Sales',
   *                     action: 'order',
   *                     pathSegment: '/projects/pr2/order'
   * }]
   * ```
   * the given intentLink is matched with the configuration's same semanticObject and action,
   * resulting in pathSegment `/projects/pr2/order` being returned. The parameter is also added in
   * this case resulting in: `/projects/pr2/order?~foo=bar`
   * @param {string} intentLink  the intentLink represents the semantic intent defined by the user
   *                        i.e.: #?intent=semanticObject-action?param=value
   */
  getIntentPath(intentLink) {
    const mappings = LuigiConfig.getConfigValue('navigation.intentMapping');
    if (mappings && mappings.length > 0) {
      const caseInsensitiveLink = intentLink.replace(/\?intent=/i, '?intent=');
      const intentObject = this.getIntentObject(caseInsensitiveLink);
      if (intentObject) {
        let realPath = mappings.find(
          item => item.semanticObject === intentObject.semanticObject && item.action === intentObject.action
        );
        if (!realPath) {
          return false;
        }
        realPath = realPath.pathSegment;
        if (intentObject.params) {
          // resolve dynamic parameters in the path if any
          realPath = this.resolveDynamicIntentPath(realPath, intentObject.params);
          // get custom node param prefixes if any or default to ~
          let nodeParamPrefix = LuigiConfig.getConfigValue('routing.nodeParamPrefix');
          nodeParamPrefix = nodeParamPrefix ? nodeParamPrefix : '~';
          realPath = realPath.concat(`?${nodeParamPrefix}`);
          intentObject.params.forEach(param => {
            realPath = realPath.concat(Object.keys(param)[0]); // append param name
            realPath = realPath.concat('=');
            // append param value and prefix in case of multiple params
            realPath = realPath.concat(param[Object.keys(param)[0]]).concat(`&${nodeParamPrefix}`);
          });
          realPath = realPath.slice(0, -(nodeParamPrefix.length + 1)); // slice extra prefix
        }
        return realPath;
      } else {
        console.warn('Could not parse given intent link.');
      }
    } else {
      console.warn('No intent mappings are defined in Luigi configuration.');
    }
    return false;
  }

  /**
   * This function takes a path which contains dynamic parameters and a list parameters and replaces the dynamic parameters
   * with the given parameters if any. The input path remains unchanged if the parameters list
   * does not contain the respective dynamic parameter name.
   * e.g.:
   * Assume either of these two calls are made:
   * 1. `linkManager().navigateToIntent('Sales-settings', {project: 'pr2', user: 'john'})`
   * 2. `linkManager().navigate('/#?intent=Sales-settings?project=pr2&user=john')`
   * For both 1. and 2., the following dynamic input path: `/projects/:project/details/:user`
   * is resolved through this method to `/projects/pr2/details/john`
   *
   * @param {string} path the path containing the potential dynamic parameter
   * @param {Object} parameters a list of objects consisting of passed parameters
   */
  resolveDynamicIntentPath(path, parameters) {
    if (!parameters) {
      return path;
    }
    let newPath = path;
    // merge list of objects into one single object for easier iteration
    const mergedParams = Object.assign({}, ...parameters);
    for (const [key, value] of Object.entries(mergedParams)) {
      // regular expression to detect dynamic parameter patterns:
      // /some/path/:param1/example/:param2/sample
      // /some/path/example/:param1
      const regex = new RegExp('/:' + key + '(/|$)', 'g');
      newPath = newPath.replace(regex, `/${value}/`);
    }
    // strip trailing slash
    newPath = newPath.replace(/\/$/, '');
    return newPath;
  }

  prepareSearchParamsForClient(currentNode) {
    let filteredObj = {};
    if (currentNode && currentNode.clientPermissions && currentNode.clientPermissions.urlParameters) {
      Object.keys(currentNode.clientPermissions.urlParameters).forEach(key => {
        if (key in LuigiRouting.getSearchParams() && currentNode.clientPermissions.urlParameters[key].read === true) {
          filteredObj[key] = LuigiRouting.getSearchParams()[key];
        }
      });
    }
    return filteredObj;
  }

  addSearchParamsFromClient(currentNode, searchParams) {
    if (currentNode && currentNode.clientPermissions && currentNode.clientPermissions.urlParameters) {
      let filteredObj = {};
      Object.keys(currentNode.clientPermissions.urlParameters).forEach(key => {
        if (key in searchParams && currentNode.clientPermissions.urlParameters[key].write === true) {
          filteredObj[key] = searchParams[key];
        } else {
          console.warn(`No permission to add "${key}" to the url`);
        }
      });
      if (Object.keys(filteredObj).length > 0) {
        LuigiRouting.addSearchParams(filteredObj);
      }
    }
  }

  /**
   * Checks if given path contains intent navigation special syntax
   * @param {string} path to check
   */
  hasIntent(path) {
    return !!path && path.toLowerCase().includes('#?intent=');
  }
}

export const RoutingHelpers = new RoutingHelpersClass();
