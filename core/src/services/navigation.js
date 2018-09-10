import { getConfigValue, getConfigValueFromObjectAsync } from './config';

const isNodeAccessPermitted = (currentPath, currentNavigationStructure, node) => {
  const permissionCheckerFn = getConfigValue('navigation.nodeAccessibilityResolver');
  if (typeof permissionCheckerFn !== 'function') {
    return true;
  }
  return permissionCheckerFn(currentPath, currentNavigationStructure, node);
}

export const getNavigationPath = async (rootNavProviderPromise, activePath) => {
  const rootNode = {};
  if (!rootNavProviderPromise) {
    return [rootNode];
  }
  try {
    const topNavNodes = await rootNavProviderPromise;
    rootNode.children = topNavNodes;
    getChildren(rootNode); // keep it, it mutates rootNode

    if (!activePath) {
      activePath = '';
    }
    const nodeNamesInCurrentPath = activePath.split('/');
    return buildNode(nodeNamesInCurrentPath, [rootNode], rootNode.children, {});
  } catch (err) {
    console.error('Failed to load top navigation nodes.', err);
  }
};

export const getChildren = async (node, context) => {
  if (node && !node._childrenProvider) {
    node._childrenProvider = node.children;
  }

  if (node && node._childrenProvider && !node._childrenProviderUsed) {
    try {
      const children = await getConfigValueFromObjectAsync(
        node,
        '_childrenProvider',
        context ? context : node.context
      );
      node.children = (children instanceof Array) && children.filter((child) => isNodeAccessPermitted(child, node, context)) || [];
      bindChildrenToParent(node);
      node._childrenProviderUsed = true;
      return node.children;
    } catch (err) {
      console.error('Could not lazy-load children for node', err);
    }
  } else if (node && node.children) {
    bindChildrenToParent(node);
    return node.children;
  } else {
    return [];
  }
};

export const bindChildrenToParent = node => {
  if (node && node.children) {
    node.children.forEach(child => {
      child.parent = node;
    });
  }
};

const buildNode = async (
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

const findMatchingNode = (urlPathElement, nodes) => {
  let result = null;
  nodes.some(node => {
    if (node.pathSegment === urlPathElement) {
      result = node;
      return true;
    }
  });
  return result;
};
