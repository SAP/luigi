import { getConfigValue } from '../services/config';

export const buildRoute = (node, path, params) =>
  !node.parent
    ? path + (params ? '?' + params : '')
    : buildRoute(node.parent, `/${node.parent.pathSegment}${path}`, params);

export const getDefaultChildNode = function(pathData) {
  const lastElement =
    pathData.navigationPath[pathData.navigationPath.length - 1];

  const pathExists = lastElement.children.find(
    childNode => childNode.pathSegment === lastElement.defaultChildNode
  );

  if (lastElement.defaultChildNode && pathExists) {
    return lastElement.defaultChildNode;
  } else {
    return lastElement.children[0].pathSegment;
  }
};

export const getLastNodeObject = pathData => {
  const lastElement = [...pathData.navigationPath].pop();
  return lastElement ? lastElement : {};
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

export const isExistingRoute = function(path, pathData) {
  if (!path) {
    return true;
  }

  const lastElement =
    pathData.navigationPath[pathData.navigationPath.length - 1];
  const routeSplit = path.replace(/\/$/, '').split('/');
  const lastPathSegment = routeSplit[routeSplit.length - 1];

  return lastElement.pathSegment === lastPathSegment;
};

const defaultContentViewParamPrefix = '~';
const getContentViewParamPrefix = () => {
  return (
    getConfigValue('routing.contentViewParamPrefix') ||
    defaultContentViewParamPrefix
  );
};

export const replaceVars = (viewUrl, params, prefix) => {
  let processedUrl = viewUrl;
  if (params) {
    Object.entries(params).forEach(entry => {
      processedUrl = processedUrl.replace(
        new RegExp(escapeRegExp('{' + prefix + entry[0] + '}'), 'g'),
        encodeURIComponent(entry[1])
      );
    });
  }
  processedUrl = processedUrl.replace(
    new RegExp('\\{' + escapeRegExp(prefix) + '[^\\}]+\\}', 'g'),
    ''
  );
  return processedUrl;
};
