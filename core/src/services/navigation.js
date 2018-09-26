import { getConfigValue, getConfigValueFromObjectAsync } from './config';
import { isFunction } from '../utilities/helpers';

const isNodeAccessPermitted = (nodeToCheckPermissionFor, parentNode, currentContext) => {
  const permissionCheckerFn = getConfigValue('navigation.nodeAccessibilityResolver');
  if (typeof permissionCheckerFn !== 'function') {
    return true;
  }
  return permissionCheckerFn(nodeToCheckPermissionFor, parentNode, currentContext);
}

export const getNavigationPath = async (rootNavProviderPromise, activePath) => {
  const rootNode = {};
  if (!rootNavProviderPromise) {
    return [rootNode];
  }
  try {
    const topNavNodes = await rootNavProviderPromise;
    rootNode.children = topNavNodes;
    await getChildren(rootNode); // keep it, mutates and filters children

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
  // Checking for pathSegment to exclude virtual root node
  if (node && node.pathSegment && node.children) {
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

export const findMatchingNode = (urlPathElement, nodes) => {
  let result = null;
  const hasInvalidPathSegments = (nodes.length > 1) ? nodes.filter(n => n.pathSegment.startsWith(':')).length !== 0 : false;
  if (hasInvalidPathSegments) {
    console.warn('Static and dynamic Nodes or multiple dynamic Nodes are not allowed on the same level. Remove the static Node, if you want to use the dynamic one.', urlPathElement, nodes);
    return false;
  }
  nodes.some(node => {
    // Static Nodes
    if (node.pathSegment === urlPathElement) {
      result = node;
      return true;
    }

    // Dynamic Nodes
    if (node.pathSegment.startsWith(':')) {
      const key = node.pathSegment.slice(0);
      node.pathParam = {
        key: key,
        value: urlPathElement
      };

      // path substitutions
      node.pathSegment = node.pathSegment.replace(key, urlPathElement);
      node.viewUrl = node.viewUrl.replace(key, urlPathElement);
      if (node.context) {
        Object.entries(node.context).map((entry) => {
          const dynKey = entry[1];
          if (dynKey.startsWith(':')) {
            node.context[entry[0]] = dynKey.replace(key, urlPathElement);
          }
        });
      }

      result = node;
      return true;
    }
  });
  return result;
};


export const getNodes = (children, pathData) => {
  if (children && 0 < children.length) {
    return children;
  }

  if (2 < pathData.length) {
    const lastElement = pathData[pathData.length - 1];
    const oneBeforeLast = pathData[pathData.length - 2];
    const nestedNode = pathData.length > 1 ? oneBeforeLast : lastElement;

    if (nestedNode && nestedNode.children) {
      return nestedNode.children;
    }
  }

  return [];
};

export const groupBy = (nodes, property) => {
  const result = {};
  nodes.forEach(node => {
    const key = node[property];
    let arr = result[key];
    if (!arr) {
      arr = [];
      result[key] = arr;
    }
    arr.push(node);
  });

  return result;
};

export const getGroupedChildren = (children, current) => {
  const nodes = getNodes(children, current.pathData);
  return groupBy(nodes, 'category');
};

export const getTruncatedVirtualChildren = (children) => {
  let virtualChildFound = false;
  const res = [];
  children.forEach(node => {
    if (virtualChildFound) {
      return;
    }
    if (node.keepSelectedForChildren) {
      virtualChildFound = true;
    }
    res.push(node);
  });
  return res;
}

export const getLeftNavData = async (current, componentData) => {
  const updatedCompData = {};
  if (current.pathData && 1 < current.pathData.length) {
    const pathDataTruncatedVirtualChildren = getTruncatedVirtualChildren(componentData.pathData);
    console.log('TCL: getLeftNavData -> componentData.pathData', current, componentData.pathData, componentData.context);
    let lastElement = [...pathDataTruncatedVirtualChildren].pop();
    let selectedNode;
    if (lastElement.keepSelectedForChildren) {
      selectedNode = lastElement;
      pathDataTruncatedVirtualChildren.pop();
      lastElement = [...pathDataTruncatedVirtualChildren].pop();
    }

    const children = await getChildren(lastElement, componentData.context);
    const groupedChildren = getGroupedChildren(children, current);
    if (groupedChildren && 1 < pathDataTruncatedVirtualChildren.length) {
      updatedCompData.selectedNode = selectedNode || lastElement;
    }

    updatedCompData.children = groupedChildren;
  }
  return updatedCompData;
};