// Main methods used to display and handle the navigation.
// Please consider adding any new methods to 'navigation-helpers' if they don't require anything from this file.
import * as NavigationHelpers from '../../utilities/helpers/navigation-helpers';
import * as AsyncHelpers from '../../utilities/helpers/async-helpers';
import * as GenericHelpers from '../../utilities/helpers/generic-helpers';

export const getNavigationPath = async (rootNavProviderPromise, activePath) => {
  if (!rootNavProviderPromise) {
    console.error('No navigation nodes provided in the configuration.');
    return [{}];
  }
  try {
    let rootNode;
    const topNavNodes = await rootNavProviderPromise;
    if (GenericHelpers.isObject(topNavNodes)) {
      rootNode = topNavNodes;
      if (rootNode.pathSegment) {
        rootNode.pathSegment = '';
        console.warn(
          'Root node must have an empty path segment. Provided path segment will be ignored.'
        );
      }
    } else {
      rootNode = { children: topNavNodes };
    }
    await getChildren(rootNode); // keep it, mutates and filters children
    const nodeNamesInCurrentPath = (activePath || '').split('/');
    const navObj = await buildNode(
      [...nodeNamesInCurrentPath], // spread operator, because buildNode is mutating this input
      [rootNode],
      rootNode.children,
      rootNode.context || {}
    );
    navObj.isExistingRoute =
      !activePath ||
      nodeNamesInCurrentPath.length ==
        navObj.navigationPath.filter(x => x.pathSegment).length;
    return navObj;
  } catch (err) {
    console.error('Failed to load top navigation nodes.', err);
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
        (await AsyncHelpers.getConfigValueFromObjectAsync(
          node,
          '_childrenProvider',
          context || node.context
        )) || []
      ).filter(child =>
        NavigationHelpers.isNodeAccessPermitted(child, node, context)
      );
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

const bindChildrenToParent = node => {
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
  context,
  pathParams = {}
) => {
  if (!context.parentNavigationContexts) {
    context.parentNavigationContexts = [];
  }
  let result = {
    navigationPath: nodesInCurrentPath,
    context: context,
    pathParams: pathParams
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
      const newContext = NavigationHelpers.applyContext(
        context,
        node.context,
        node.navigationContext
      );
      try {
        let children = await getChildren(node, newContext);

        if (node.pathSegment.startsWith(':')) {
          pathParams[node.pathSegment.replace(':', '')] = urlPathElement;
        }
        result = buildNode(
          nodeNamesInCurrentPath,
          nodesInCurrentPath,
          children,
          newContext,
          pathParams
        );
      } catch (err) {
        console.error('Error getting nodes children', err);
      }
    }
  }
  return result;
};

export const findMatchingNode = (urlPathElement, nodes) => {
  let result = null;
  const dynamicSegmentsLength = nodes.filter(
    n => n.pathSegment && n.pathSegment.startsWith(':')
  ).length;
  if (nodes.length > 1) {
    if (dynamicSegmentsLength === 1) {
      console.warn(
        'Invalid node setup detected. \nStatic and dynamic nodes cannot be used together on the same level. Static node gets cleaned up. \nRemove the static node from the configuration to resolve this warning. \nAffected pathSegment:',
        urlPathElement,
        'Children:',
        nodes
      );
      nodes = nodes.filter(n => n.pathSegment.startsWith(':'));
    }
    if (dynamicSegmentsLength > 1) {
      console.error(
        'Invalid node setup detected. \nMultiple dynamic nodes are not allowed on the same level. Stopped navigation. \nInvalid Children:',
        nodes
      );
      return null;
    }
  }
  nodes.some(node => {
    if (
      // Static nodes
      node.pathSegment === urlPathElement ||
      // Dynamic nodes
      (node.pathSegment && node.pathSegment.startsWith(':'))
    ) {
      // Return last matching node
      result = node;
      return true;
    }
  });
  return result;
};

const getNodes = (children, pathData) => {
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

const getGroupedChildren = (children, current) => {
  const nodes = getNodes(children, current.pathData);
  return NavigationHelpers.groupNodesBy(nodes, 'category');
};

/**
 * getTruncatedChildren
 *
 * Returns an array of children without the childs below
 * a node that has keepSelectedForChildren enabled
 * @param array children
 * @returns array children
 */
const getTruncatedChildren = children => {
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

export const getLeftNavData = async (current, componentData) => {
  const updatedCompData = {};
  if (current.pathData && 1 < current.pathData.length) {
    const pathDataTruncatedChildren = getTruncatedChildren(
      componentData.pathData
    );
    let lastElement = [...pathDataTruncatedChildren].pop();
    let selectedNode;
    if (lastElement.keepSelectedForChildren) {
      selectedNode = lastElement;
      pathDataTruncatedChildren.pop();
      lastElement = [...pathDataTruncatedChildren].pop();
    }

    const children = await getChildren(lastElement, componentData.context);
    const groupedChildren = getGroupedChildren(children, current);
    updatedCompData.hasCategoriesWithIcon = false;
    Object.values(groupedChildren).forEach(value => {
      if (
        !updatedCompData.hasCategoriesWithIcon &&
        value &&
        value.metaInfo &&
        value.metaInfo.icon
      ) {
        updatedCompData.hasCategoriesWithIcon = true;
      }
    });
    updatedCompData.selectedNode = selectedNode || lastElement;
    updatedCompData.children = groupedChildren;
  }
  return updatedCompData;
};
