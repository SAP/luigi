// Main methods used to display and handle the navigation.
// Please consider adding any new methods to 'navigation-helpers' if they don't require anything from this file.
import {
  AsyncHelpers,
  EscapingHelpers,
  GenericHelpers,
  NavigationHelpers,
  RoutingHelpers
} from '../../utilities/helpers';
import { LuigiConfig } from '../../core-api';

class NavigationClass {
  async getNavigationPath(rootNavProviderPromise, path = '') {
    try {
      const activePath = GenericHelpers.getTrimmedUrl(path);

      if (!rootNavProviderPromise) {
        console.error('No navigation nodes provided in the configuration.');
        return [{}];
      }

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
      await this.getChildren(rootNode); // keep it, mutates and filters children
      const nodeNamesInCurrentPath = activePath.split('/');
      const navObj = await this.buildNode(
        nodeNamesInCurrentPath,
        [rootNode],
        rootNode.children,
        rootNode.context || {}
      );

      const navPathSegments = navObj.navigationPath
        .filter(x => x.pathSegment)
        .map(x => x.pathSegment);

      navObj.isExistingRoute =
        !activePath || nodeNamesInCurrentPath.length === navPathSegments.length;

      const pathSegments = activePath.split('/');
      navObj.matchedPath = pathSegments
        .filter((segment, index) => {
          return (
            (navPathSegments[index] &&
              navPathSegments[index].startsWith(':')) ||
            navPathSegments[index] === segment
          );
        })
        .join('/');

      return navObj;
    } catch (err) {
      console.error('Failed to load top navigation nodes.', err);
    }
  }

  async getChildren(node, context) {
    if (!node) {
      return [];
    }

    if (!node._childrenProvider) {
      node._childrenProvider = node.children;
    }

    if (
      node._childrenProvider &&
      (!node._childrenProviderUsed ||
        node._childrenProviderUsed < LuigiConfig._configModificationTimestamp)
    ) {
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
        this.bindChildrenToParent(node);
        node._childrenProviderUsed = new Date();
        return node.children;
      } catch (err) {
        console.error('Could not lazy-load children for node', err);
      }
    } else if (node.children) {
      this.bindChildrenToParent(node);
      return node.children;
    } else {
      return [];
    }
  }

  bindChildrenToParent(node) {
    // Checking for pathSegment to exclude virtual root node
    if (node && node.pathSegment && node.children) {
      node.children.forEach(child => {
        child.parent = node;
      });
    }
  }

  async buildNode(
    nodeNamesInCurrentPath,
    nodesInCurrentPath,
    childrenOfCurrentNode,
    context,
    pathParams = {}
  ) {
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
      const urlPathElement = nodeNamesInCurrentPath[0];
      const node = this.findMatchingNode(urlPathElement, childrenOfCurrentNode);
      if (node) {
        nodesInCurrentPath.push(node);
        let newContext = NavigationHelpers.applyContext(
          context,
          node.context,
          node.navigationContext
        );
        if (node.pathSegment.startsWith(':')) {
          pathParams[
            node.pathSegment.replace(':', '')
          ] = EscapingHelpers.sanitizeParam(urlPathElement);
        }
        newContext = RoutingHelpers.substituteDynamicParamsInObject(
          newContext,
          pathParams
        );
        try {
          let children = await this.getChildren(node, newContext);
          const newNodeNamesInCurrentPath = nodeNamesInCurrentPath.slice(1);
          result = this.buildNode(
            newNodeNamesInCurrentPath,
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
  }

  findMatchingNode(urlPathElement, nodes) {
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
  }

  getNodes(children, pathData) {
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
  }

  getGroupedChildren(children, current) {
    const nodes = this.getNodes(children, current.pathData);
    return NavigationHelpers.groupNodesBy(nodes, 'category', true);
  }

  /**
   * getTruncatedChildren
   *
   * Returns an array of children without the childs below
   * a node that has keepSelectedForChildren enabled
   * @param array children
   * @returns array children
   */
  getTruncatedChildren(children) {
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
  }

  async getLeftNavData(current, componentData) {
    const updatedCompData = {};
    if (current.pathData && 1 < current.pathData.length) {
      const pathDataTruncatedChildren = this.getTruncatedChildren(
        componentData.pathData
      );
      let lastElement = [...pathDataTruncatedChildren].pop();
      let selectedNode;
      if (lastElement.keepSelectedForChildren) {
        selectedNode = lastElement;
        pathDataTruncatedChildren.pop();
        lastElement = [...pathDataTruncatedChildren].pop();
      }

      const children = await this.getChildren(
        lastElement,
        componentData.context
      );
      const groupedChildren = this.getGroupedChildren(children, current);
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
  }
}

export const Navigation = new NavigationClass();
