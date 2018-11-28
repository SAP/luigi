import { LuigiConfig } from '../../services/config';
import { getConfigValueFromObjectAsync } from '../../utilities/async-helpers';

const isNodeAccessPermitted = (
  nodeToCheckPermissionFor,
  parentNode,
  currentContext
) => {
  if (LuigiConfig.isAuthorizationEnabled() && !isLoggedIn()) return false;
  const permissionCheckerFn = LuigiConfig.getConfigValue(
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

export const getNavigationPath = async (rootNavProviderPromise, activePath) => {
  const rootNode = {};
  if (!rootNavProviderPromise) {
    return [rootNode];
  }
  try {
    const topNavNodes = await rootNavProviderPromise;
    rootNode.children = topNavNodes;
    await getChildren(rootNode); // keep it, mutates and filters children
    const nodeNamesInCurrentPath = (activePath || '').split('/');
    return buildNode(nodeNamesInCurrentPath, [rootNode], rootNode.children, {});
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
    // Static nodes
    if (node.pathSegment === urlPathElement) {
      result = node;
      return true;
    }

    // Dynamic nodes
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
        Object.entries(node.context).map(entry => {
          const dynKey = entry[1];
          if (dynKey === node.pathParam.key) {
            node.context[entry[0]] = dynKey.replace(dynKey, urlPathElement);
          }
        });
      }

      result = node;
      return true;
    }
  });
  return result;
};

const isLoggedIn = () => {
  const getStoredAuthData = () =>
    JSON.parse(localStorage.getItem('luigi.auth'));
  const isAuthValid = () =>
    getStoredAuthData().accessTokenExpirationDate > Number(new Date());
  return getStoredAuthData() && isAuthValid();
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
    let key;
    let metaInfo;
    const category = node[property];
    if (category && typeof category === 'object') {
      key = category.label;
      metaInfo = Object.assign({}, category);
    } else {
      key = category;
      metaInfo = {
        label: key,
        icon: 'lui-blank'
      };
    }
    let arr = result[key];
    if (!arr) {
      arr = [];
      result[key] = arr;
    }
    if (!arr.metaInfo) {
      arr.metaInfo = metaInfo;
    }
    arr.push(node);
  });
  return result;
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
