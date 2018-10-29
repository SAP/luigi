import { getConfigValue } from './config';
import { findMatchingNode } from './navigation';
import { getChildren } from './navigation_children';

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

export const isLoggedIn = () => {
  const getStoredAuthData = () =>
    JSON.parse(localStorage.getItem('luigi.auth'));
  const isAuthValid = () =>
    getStoredAuthData().accessTokenExpirationDate > Number(new Date());
  return getStoredAuthData() && isAuthValid();
};
