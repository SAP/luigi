// Helper methods for 'routing.js' file. They don't require any method from 'routing.js' but are required by them.
// They are also rarely used directly from outside of 'routing.js'
import * as AsyncHelpers from './async-helpers';
import * as GenericHelpers from './generic-helpers';
import { LuigiConfig } from '../../services/config';
import * as Routing from '../../services/routing';

export const getLastNodeObject = pathData => {
  const lastElement = [...pathData.navigationPath].pop();
  return lastElement ? lastElement : {};
};

export const getDefaultChildNode = async pathData => {
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
  } else if (children && children.length > 0) {
    return children[0].pathSegment;
  } else {
    return '';
  }
};

export const parseParams = paramsString => {
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
};

export const getNodeParams = params => {
  const result = {};
  const paramPrefix = getContentViewParamPrefix();
  if (params) {
    Object.entries(params).forEach(entry => {
      if (entry[0].startsWith(paramPrefix)) {
        const paramName = entry[0].substr(paramPrefix.length);
        result[paramName] = entry[1];
      }
    });
  }
  return result;
};

export const findViewGroup = node => {
  if (node.viewGroup) {
    return node.viewGroup;
  } else if (node.parent) {
    return findViewGroup(node.parent);
  }
};
const defaultContentViewParamPrefix = '~';
export const getContentViewParamPrefix = () => {
  return (
    LuigiConfig.getConfigValue('routing.contentViewParamPrefix') ||
    defaultContentViewParamPrefix
  );
};

export const addRouteChangeListener = callback => {
  if (LuigiConfig.getConfigValue('routing.useHashRouting')) {
    const getModifiedHash = s => s.newURL.split('#/')[1];
    return window.addEventListener('hashchange', event => {
      callback(getModifiedHash(event));
    });
  }

  window.addEventListener('popstate', () => {
    callback(Routing.getModifiedPathname());
  });
};

export const buildRoute = (node, path, params) =>
  !node.parent
    ? path + (params ? '?' + params : '')
    : buildRoute(node.parent, `/${node.parent.pathSegment}${path}`, params);

export const processDynamicNode = (node, pathParams) => {
  if (
    (node.pathSegment && node.pathSegment.startsWith(':')) ||
    (node.pathParam && node.pathParam.key)
  ) {
    Object.entries(pathParams).forEach(param => {
      const key = ':' + param[0];
      const value = param[1];
      const segments = node.viewUrl.split('/');

      // viewUrl substitutions
      node.viewUrl = segments
        .map(segment => {
          return segment.startsWith(':')
            ? segment.replace(key, value)
            : segment;
        })
        .join('/');

      // path substitutions
      node.pathSegment = node.pathSegment === key ? value : node.pathSegment;

      // context substitutions
      if (node.context) {
        Object.entries(node.context).forEach(ctx => {
          const ctxKey = ctx[0];
          const ctxValue = ctx[1];
          if (ctxValue === key) {
            node.context[ctxKey] = value;
          }
        });
      }
    });
  }
  return node;
};
