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

export const getLastPathSegment = pathUrl => {
  const segments = GenericHelpers.trimTrailingSlash(
    pathUrl.split('?')[0]
  ).split('/');
  return segments[segments.length - 1];
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

export const isExistingRoute = (path, pathData) => {
  if (!path) {
    return true;
  }

  const lastElement =
    pathData.navigationPath[pathData.navigationPath.length - 1];
  const routeSplit = path.replace(/\/$/, '').split('/');
  const lastPathSegment = routeSplit[routeSplit.length - 1];
  console.log(
    '%cTO TEST: last_startswith',
    'color: red',
    lastElement.pathSegment && lastElement.pathSegment.startsWith(':')
  );
  return (
    (lastElement.pathSegment && lastElement.pathSegment.startsWith(':')) ||
    lastElement.pathSegment === lastPathSegment
  );
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

export const getPathParams = nodes => {
  const params = {};
  nodes
    .filter(n => n.pathParam)
    .map(n => n.pathParam)
    .forEach(pp => {
      params[pp.key.replace(':', '')] = pp.value;
    });
  return params;
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

export const processDynamicNode = (node, urlPathElement) => {
  if (
    (node.pathSegment && node.pathSegment.startsWith(':')) ||
    (node.pathParam && node.pathParam.key)
  ) {
    if (node.pathParam && node.pathParam.key) {
      node.viewUrl = node.pathParam.viewUrl;
      node.context = node.pathParam.context
        ? Object.assign({}, node.pathParam.context)
        : undefined;
      node.pathSegment = node.pathParam.pathSegment;
    } else {
      node.pathParam = {
        key: node.pathSegment.slice(0),
        pathSegment: node.pathSegment,
        viewUrl: node.viewUrl,
        context: node.context ? Object.assign({}, node.context) : undefined
      };
    }
    node.pathParam.value = urlPathElement;

    // path substitutions
    node.pathSegment = node.pathSegment.replace(
      node.pathParam.key,
      urlPathElement
    );

    if (node.viewUrl) {
      node.viewUrl = node.viewUrl.replace(node.pathParam.key, urlPathElement);
    }

    if (node.context) {
      node.context = processContext(
        node.context,
        node.pathParam,
        urlPathElement
      );
    }
  }
  return node;
};

export const processDynamicNodes = (rawNodes, urlPathElement) => {
  return [...rawNodes].map(node => processDynamicNode(node, urlPathElement));
};

const processContext = (inputContext, pathParam, urlPathElement) => {
  const context = Object.assign({}, inputContext);
  Object.entries(context).map(entry => {
    const dynKey = entry[1];
    if (dynKey === pathParam.key) {
      context[entry[0]] = dynKey.replace(dynKey, urlPathElement);
    }
  });
  return context;
};
