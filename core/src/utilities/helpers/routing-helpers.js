// Helper methods for 'routing.js' file. They don't require any method from 'routing.js' but are required by them.
// They are also rarely used directly from outside of 'routing.js'
import { LuigiConfig } from '../../core-api';
import { sanitizeParam } from './escaping-helpers';
import { AsyncHelpers, GenericHelpers } from './';
import { Routing } from '../../services/routing';

class RoutingHelpersClass {
  constructor() {
    this.defaultContentViewParamPrefix = '~';
  }

  getLastNodeObject(pathData) {
    const lastElement = [...pathData.navigationPath].pop();
    return lastElement ? lastElement : {};
  }

  async getDefaultChildNode(pathData) {
    const lastElement =
      pathData.navigationPath[pathData.navigationPath.length - 1];

    const children = await AsyncHelpers.getConfigValueFromObjectAsync(
      lastElement,
      'children'
    );
    const pathExists = children.find(
      childNode => childNode.pathSegment === lastElement.defaultChildNode
    );

    if (lastElement.defaultChildNode && pathExists) {
      return lastElement.defaultChildNode;
    } else if (children && children.length) {
      const rootPath = pathData.navigationPath.length === 1;
      if (rootPath) return children[0].pathSegment;

      const validChild = children.find(
        child =>
          child.pathSegment &&
          (child.viewUrl || (child.externalLink && child.externalLink.url))
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
          result[decodeURIComponent(keyValue[0])] = decodeURIComponent(
            keyValue[1]
          );
        }
      });
    }
    return result;
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
    return this.sanitizeParams(result);
  }

  findViewGroup(node) {
    if (node.viewGroup) {
      return node.viewGroup;
    } else if (node.parent) {
      return this.findViewGroup(node.parent);
    }
  }

  getContentViewParamPrefix() {
    return (
      LuigiConfig.getConfigValue('routing.nodeParamPrefix') ||
      this.defaultContentViewParamPrefix
    );
  }

  addRouteChangeListener(callback) {
    const hashRoutingActive = LuigiConfig.getConfigValue(
      'routing.useHashRouting'
    );

    window.addEventListener('message', e => {
      if ('refreshRoute' === e.data.msg && e.origin === window.origin) {
        const path = hashRoutingActive
          ? Routing.getHashPath()
          : Routing.getModifiedPathname();
        callback(path);
      }
    });

    if (hashRoutingActive) {
      return window.addEventListener('hashchange', event => {
        callback(Routing.getHashPath(event.newURL));
      });
    }

    window.addEventListener('popstate', () => {
      callback(Routing.getModifiedPathname());
    });
  }

  buildRoute(node, path, params) {
    return !node.parent
      ? path + (params ? '?' + params : '')
      : this.buildRoute(
          node.parent,
          `/${node.parent.pathSegment}${path}`,
          params
        );
  }

  substituteDynamicParamsInObject(object, paramMap, paramPrefix = ':') {
    return Object.entries(object)
      .map(([key, value]) => {
        let foundKey = Object.keys(paramMap).find(
          key2 => value === paramPrefix + key2
        );
        return [key, foundKey ? paramMap[foundKey] : value];
      })
      .reduce((acc, [key, value]) => {
        return Object.assign(acc, { [key]: value });
      }, {});
  }

  substituteViewUrl(viewUrl, componentData) {
    const contextVarPrefix = 'context.';
    const nodeParamsVarPrefix = 'nodeParams.';

    viewUrl = GenericHelpers.replaceVars(
      viewUrl,
      componentData.pathParams,
      ':',
      false
    );
    viewUrl = GenericHelpers.replaceVars(
      viewUrl,
      componentData.context,
      contextVarPrefix
    );
    viewUrl = GenericHelpers.replaceVars(
      viewUrl,
      componentData.nodeParams,
      nodeParamsVarPrefix
    );
    return viewUrl;
  }

  sanitizeParams(paramsMap) {
    return Object.entries(paramsMap).reduce((sanitizedMap, paramPair) => {
      sanitizedMap[sanitizeParam(paramPair[0])] = sanitizeParam(paramPair[1]);
      return sanitizedMap;
    }, {});
  }
}

export const RoutingHelpers = new RoutingHelpersClass();
