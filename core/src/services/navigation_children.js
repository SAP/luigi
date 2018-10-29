import { getConfigValueFromObjectAsync } from './config';
import { isNodeAccessPermitted } from './navigation_helpers';
import { getNodes, groupBy } from './navigation';

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

export const bindChildrenToParent = node => {
  // Checking for pathSegment to exclude virtual root node
  if (node && node.pathSegment && node.children) {
    node.children.forEach(child => {
      child.parent = node;
    });
  }
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
