import { buildNode } from './navigation_helpers';
import * as CHILDREN from './navigation_children';

export const getNavigationPath = async (rootNavProviderPromise, activePath) => {
  const rootNode = {};
  if (!rootNavProviderPromise) {
    return [rootNode];
  }
  try {
    const topNavNodes = await rootNavProviderPromise;
    rootNode.children = topNavNodes;
    await CHILDREN.getChildren(rootNode); // keep it, mutates and filters children
    const nodeNamesInCurrentPath = (activePath || '').split('/');
    return buildNode(nodeNamesInCurrentPath, [rootNode], rootNode.children, {});
  } catch (err) {
    console.error('Failed to load top navigation nodes.', err);
  }
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
    if (node.pathSegment && node.pathSegment.startsWith(':')) {
      const key = node.pathSegment.slice(0);
      node.pathParam = {
        key: key,
        value: urlPathElement
      };

      // path substitutions
      node.pathSegment = node.pathSegment.replace(key, urlPathElement);
      node.viewUrl = node.viewUrl.replace(key, urlPathElement);
      if (node.context) {
        Object.entries(node.context).map(entry => {
          const dynKey = entry[1];
          if (dynKey === key) {
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

export const getLeftNavData = async (current, componentData) => {
  const updatedCompData = {};
  if (current.pathData && 1 < current.pathData.length) {
    const pathDataTruncatedChildren = CHILDREN.getTruncatedChildren(
      componentData.pathData
    );
    let lastElement = [...pathDataTruncatedChildren].pop();
    let selectedNode;
    if (lastElement.keepSelectedForChildren) {
      selectedNode = lastElement;
      pathDataTruncatedChildren.pop();
      lastElement = [...pathDataTruncatedChildren].pop();
    }

    const children = await CHILDREN.getChildren(
      lastElement,
      componentData.context
    );
    const groupedChildren = CHILDREN.getGroupedChildren(children, current);
    updatedCompData.selectedNode = selectedNode || lastElement;
    updatedCompData.children = groupedChildren;
  }
  return updatedCompData;
};
