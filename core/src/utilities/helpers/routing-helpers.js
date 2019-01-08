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

// TODO: probably not required anymore
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

export const processDynamicNode = (node, pathParams) => {
  console.log('​processDynamicNode -> pathParams', pathParams);
  if (
    (node.pathSegment && node.pathSegment.startsWith(':')) ||
    (node.pathParam && node.pathParam.key)
  ) {
    // Substitute all path params
    let urlPathElement;
    Object.entries(pathParams).forEach(param => {
      const key = param[0];
      const value = param[1];
      const segments = node.viewUrl.split('/');

      node.viewUrl = segments
        .map(segment => {
          return segment.startsWith(':')
            ? segment.replace(':' + key, value)
            : segment;
        })
        .join('/');

      urlPathElement = value;
      console.log('​processDynamicNode -> param', key, value, node.viewUrl);
    });

    if (node.pathParam && node.pathParam.key) {
      node.viewUrl = node.pathParam.viewUrl;
      node.context = node.pathParam.context
        ? Object.assign({}, node.pathParam.context)
        : undefined;
      node.pathSegment = node.pathParam.pathSegment;
      console.log('pathParm exists', node);
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

    if (node.context) {
      console.log('​node.context pre', node.context, node);
      node.context = processContext(
        node.context,
        node.pathParam,
        urlPathElement
      );
      console.log('​node.context pos', node.context, node);
    }
  }
  console.log('​processDynamicNode -> node', node);
  return node;
};

export const processDynamicNodes = (rawNodes, pathData) => {
  return [...rawNodes].map(node => processDynamicNode(node, pathData));
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
