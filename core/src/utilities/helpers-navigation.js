import {
  getConfigValueFromObjectAsync,
  getConfigValue
} from '../services/config';
import { getNodes, groupBy, findMatchingNode } from '../services/navigation';

const applyContext = (context, addition, navigationContext) => {
  if (addition) {
    for (var p in addition) {
      context[p] = addition[p];
    }
  }
  if (navigationContext) {
    context.parentNavigationContexts.unshift(navigationContext);
  }
  return context;
};

export const bindChildrenToParent = node => {
  // Checking for pathSegment to exclude virtual root node
  if (node && node.pathSegment && node.children) {
    node.children.forEach(child => {
      child.parent = node;
    });
  }
};

export const buildNode = async (
  nodeNamesInCurrentPath,
  nodesInCurrentPath,
  childrenOfCurrentNode,
  context
) => {
  if (!context.parentNavigationContexts) {
    context.parentNavigationContexts = [];
  }
  let result = {
    navigationPath: nodesInCurrentPath,
    context: context
  };
  if (
    nodeNamesInCurrentPath.length > 0 &&
    childrenOfCurrentNode &&
    childrenOfCurrentNode.length > 0
  ) {
    const urlPathElement = nodeNamesInCurrentPath.splice(0, 1)[0];
    const node = findMatchingNode(urlPathElement, childrenOfCurrentNode);
    if (node) {
      nodesInCurrentPath.push(node);
      const newContext = applyContext(
        context,
        node.context,
        node.navigationContext
      );
      try {
        let children = await getChildren(node, newContext);

        result = buildNode(
          nodeNamesInCurrentPath,
          nodesInCurrentPath,
          children,
          newContext
        );
      } catch (err) {
        console.error('Error getting nodes children', err);
      }
    }
  }
  return result;
};

export const getChildren = async (node, context) => {
  if (!node) {
    return [];
  }

  if (!node._childrenProvider) {
    node._childrenProvider = node.children;
  }

  if (node._childrenProvider && !node._childrenProviderUsed) {
    try {
      node.children = (
        (await getConfigValueFromObjectAsync(
          node,
          '_childrenProvider',
          context || node.context
        )) || []
      ).filter(child => isNodeAccessPermitted(child, node, context));
      bindChildrenToParent(node);
      node._childrenProviderUsed = true;
      return node.children;
    } catch (err) {
      console.error('Could not lazy-load children for node', err);
    }
  } else if (node.children) {
    bindChildrenToParent(node);
    return node.children;
  } else {
    return [];
  }
};

export const getGroupedChildren = (children, current) => {
  const nodes = getNodes(children, current.pathData);
  return groupBy(nodes, 'category');
};

/**
 * getTruncatedChildren
 *
 * Returns an array of children without the childs below
 * a node that has keepSelectedForChildren enabled
 * @param array children
 * @returns array children
 */
export const getTruncatedChildren = children => {
  let childToKeepFound = false;
  const res = [];
  children.forEach(node => {
    if (childToKeepFound) {
      return;
    }
    if (node.keepSelectedForChildren) {
      childToKeepFound = true;
    }
    res.push(node);
  });
  return res;
};

export const isLoggedIn = () => {
  const getStoredAuthData = () =>
    JSON.parse(localStorage.getItem('luigi.auth'));
  const isAuthValid = () =>
    getStoredAuthData().accessTokenExpirationDate > Number(new Date());
  return getStoredAuthData() && isAuthValid();
};

export const isNodeAccessPermitted = (
  nodeToCheckPermissionFor,
  parentNode,
  currentContext
) => {
  if (!isLoggedIn()) return false;
  const permissionCheckerFn = getConfigValue(
    'navigation.nodeAccessibilityResolver'
  );
  if (typeof permissionCheckerFn !== 'function') {
    return true;
  }
  return permissionCheckerFn(
    nodeToCheckPermissionFor,
    parentNode,
    currentContext
  );
};
