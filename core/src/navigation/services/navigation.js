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
  childrenProviderRequiresEvaluation(node) {
    const result =
      node &&
      node._childrenProvider &&
      (!node._childrenProviderUsed ||
        !LuigiConfig._configModificationTimestamp ||
        node._childrenProviderUsed <
          new Date(LuigiConfig._configModificationTimestamp.getTime()));

    if (result) {
      node._childrenProviderUsed = new Date();
    }
    return result;
  }
  rootNodeRequiresEvaluation() {
    const result =
      !this.rootNode ||
      !this._rootNodeProviderUsed ||
      this._rootNodeProviderUsed <
        new Date(LuigiConfig._configModificationTimestamp.getTime());
    if (result) {
      this._rootNodeProviderUsed = new Date();
    }
    return result;
  }
  async getNavigationPath(rootNavProviderPromise, path = '') {
    try {
      const activePath = GenericHelpers.getTrimmedUrl(path);

      if (!rootNavProviderPromise) {
        console.error('No navigation nodes provided in the configuration.');
        return [{}];
      }

      if (
        this.rootNodeRequiresEvaluation() ||
        this.childrenProviderRequiresEvaluation(this.rootNode)
      ) {
        const topNavNodes = await rootNavProviderPromise;
        if (GenericHelpers.isObject(topNavNodes)) {
          this.rootNode = topNavNodes;
          if (this.rootNode.pathSegment) {
            this.rootNode.pathSegment = '';
            console.warn(
              'Root node must have an empty path segment. Provided path segment will be ignored.'
            );
          }
        } else {
          this.rootNode = { children: topNavNodes };
        }

        await this.getChildren(this.rootNode, null, activePath); // keep it, mutates and filters children
      }

      const nodeNamesInCurrentPath = activePath.split('/');
      const navObj = await this.buildNode(
        nodeNamesInCurrentPath,
        [this.rootNode],
        this.rootNode.children,
        this.rootNode.context || {}
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
    if (this.childrenProviderRequiresEvaluation(node)) {
      try {
        node._children =
          (await AsyncHelpers.getConfigValueFromObjectAsync(
            node,
            '_childrenProvider',
            context || node.context
          ))
            .map(n => this.getExpandStructuralPathSegment(n))
            .map(n => this.bindChildToParent(n, node)) || [];

        node.children = this.getAccessibleNodes(node, context);
        return node.children;
      } catch (err) {
        console.error('Could not lazy-load children for node', err);
      }
    } else if (node._children) {
      node.children = this.getAccessibleNodes(node, context);
      return node.children;
    } else {
      return [];
    }
  }

  getAccessibleNodes(node, context) {
    return node._children.filter(child =>
      NavigationHelpers.isNodeAccessPermitted(child, node, context)
    );
  }

  bindChildToParent(child, node) {
    // Checking for pathSegment to exclude virtual root node
    // node.pathSegment check is also required for virtual nodes like categories
    if (node && node.pathSegment) {
      child.parent = node;
    }
    return child;
  }

  getExpandStructuralPathSegment(node) {
    // Checking for pathSegment to exclude virtual root node
    if (node && node.pathSegment && node.pathSegment.indexOf('/') !== -1) {
      const segs = node.pathSegment.split('/');
      const clonedNode = { ...node };
      const buildStructuralNode = (segs, node) => {
        const seg = segs.shift();
        let child = {};
        if (segs.length) {
          child.pathSegment = seg;
          if (node.hideFromNav) child.hideFromNav = node.hideFromNav;
          child.children = [buildStructuralNode(segs, node)];
        } else {
          // set original data to last child
          child = clonedNode;
          child.pathSegment = seg;
        }
        return child;
      };
      return buildStructuralNode(segs, node);
    }
    return node;
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
          /**
           * If its a virtual tree,
           * build static children
           */
          this.buildVirtualTree(node, nodeNamesInCurrentPath, pathParams);

          // STANDARD PROCEDURE
          let children = await this.getChildren(
            node,
            newContext,
            nodeNamesInCurrentPath
          );
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

  /**
   * Requires str to include :virtualPath
   * and pathParams consist of :virtualSegment_N
   * for deep nested virtual tree building
   *
   * @param {string} str
   * @param {Object} pathParams
   * @param {number} _virtualPathIndex
   */
  buildVirtualViewUrl(str, pathParams, _virtualPathIndex) {
    let newStr = '';
    for (const key in pathParams) {
      if (key.startsWith('virtualSegment')) {
        newStr += ':' + key + '/';
      }
    }
    newStr += ':virtualSegment_' + _virtualPathIndex + '/';
    return str + '/' + newStr;
  }

  buildVirtualTree(node, nodeNamesInCurrentPath, pathParams) {
    const virtualTreeRoot = node.virtualTree;
    // Temporary store values that will be cleaned up when creating a copy
    const virtualTreeChild = node._virtualTree;
    const _virtualViewUrl = node._virtualViewUrl || node.viewUrl;
    if ((virtualTreeRoot || virtualTreeChild) && nodeNamesInCurrentPath[0]) {
      let _virtualPathIndex = node._virtualPathIndex;
      if (virtualTreeRoot) {
        _virtualPathIndex = 0;
        node.keepSelectedForChildren = true;
      }

      // Allowing maximum of 50 path segments to avoid memory issues
      const maxPathDepth = 50;
      if (_virtualPathIndex > maxPathDepth) {
        return;
      }

      _virtualPathIndex++;
      const keysToClean = [
        '_*',
        'virtualTree',
        'parent',
        'children',
        'keepSelectedForChildren',
        'navigationContext'
      ];
      const newChild = GenericHelpers.removeProperties(node, keysToClean);
      Object.assign(newChild, {
        pathSegment: ':virtualSegment_' + _virtualPathIndex,
        label: ':virtualSegment_' + _virtualPathIndex,
        viewUrl: this.buildVirtualViewUrl(
          _virtualViewUrl,
          pathParams,
          _virtualPathIndex
        ),
        _virtualTree: true,
        _virtualPathIndex,
        _virtualViewUrl
      });

      node.children = [newChild];
    }
  }

  findMatchingNode(urlPathElement, nodes) {
    let result = null;
    const segmentsLength = nodes.filter(n => !!n.pathSegment).length;
    const dynamicSegmentsLength = nodes.filter(
      n => n.pathSegment && n.pathSegment.startsWith(':')
    ).length;
    if (segmentsLength > 1) {
      if (dynamicSegmentsLength === 1) {
        console.warn(
          'Invalid node setup detected. \nStatic and dynamic nodes cannot be used together on the same level. Static node gets cleaned up. \nRemove the static node from the configuration to resolve this warning. \nAffected pathSegment:',
          urlPathElement,
          'Children:',
          nodes
        );
        nodes = nodes.filter(
          n => n.pathSegment && n.pathSegment.startsWith(':')
        );
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
      if (node.keepSelectedForChildren || node.tabNav) {
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
      if (lastElement.keepSelectedForChildren || lastElement.tabNav) {
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

  /**
   * Returns an array of the navigation path segments.
   * After tabNav is found on a node, the children of this node will added to the array.
   * @param {*} children
   */
  getTruncatedChildrenForTabNav(children) {
    const res = [];
    for (let i = 0; i < children.length; i++) {
      res.push(children[i]);
      if (children[i].tabNav) {
        if (i < children.length - 1) {
          res.push(children[i + 1]);
        }
        break;
      }
    }
    return res;
  }

  async getTabNavData(current, componentData) {
    const updatedCompData = {};
    if (current.pathData && 1 < current.pathData.length) {
      const pathDataTruncatedChildren = this.getTruncatedChildrenForTabNav(
        componentData.pathData
      );
      let selectedNode = [...pathDataTruncatedChildren].pop();
      const children = await this.getChildren(
        selectedNode.tabNav ? selectedNode : selectedNode.parent,
        componentData.context
      );
      const groupedChildren = this.getGroupedChildren(children, current);
      updatedCompData.selectedNode = selectedNode;
      updatedCompData.selectedNodeForTabNav = selectedNode;
      updatedCompData.children = groupedChildren;
    }
    return updatedCompData;
  }

  async extractDataFromPath(path) {
    const pathData = await this.getNavigationPath(
      LuigiConfig.getConfigValueAsync('navigation.nodes'),
      path
    );
    const nodeObject = RoutingHelpers.getLastNodeObject(pathData);
    return { nodeObject, pathData };
  }

  async shouldPreventNavigation(node) {
    if (
      node &&
      GenericHelpers.isFunction(node.onNodeActivation) &&
      (await node.onNodeActivation(node)) === false
    ) {
      return true;
    }
    return false;
  }
}

export const Navigation = new NavigationClass();
