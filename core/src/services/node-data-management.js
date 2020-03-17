import { GenericHelpers } from '../utilities/helpers/generic-helpers';
class NodeDataManagementStorageClass {
  constructor() {
    this.dataManagement = new Map();
    this.lastUrl;
    this.lastPathData;
    this.navPath = '';
  }
  /**
   *
   * @param {any} node
   * @param {any} value
   * Node will be stored as key and value as value.
   *
   */
  setChildren(node, value) {
    //baue den path zusammen rekursiv über parent
    if (node.pathSegment) {
      value.rawNavPath = this.buildNavigationPath(node.pathSegment, node);
    }
    this.dataManagement.set(node, value);
    this.navPath = '';
  }

  buildNavigationPath(pathSegment, node) {
    let navPathRaw = pathSegment;
    if (node.parent) {
      navPathRaw = node.parent.pathSegment.concat('/' + navPathRaw);
      this.buildNavigationPath(navPathRaw, node.parent);
    } else if (navPathRaw !== node.pathSegment) {
      navPathRaw = node.pathSegment.concat('/' + navPathRaw);
    }

    return navPathRaw;
  }

  // if (this.navPath !== '') {
  //   console.log('schau ma mal');
  //   return this.navPath;
  // }

  /**
   *
   * @param {any} node
   * return the map entry which belongs to the node, stored as key
   */
  getChildren(node) {
    return node ? this.dataManagement.get(node) : {};
  }

  /**
   *
   * @param {any} node
   * Checks if there is a entry of given node
   */
  hasChildren(node) {
    const data = this.getChildren(node);
    return data && data.hasOwnProperty('children');
  }

  /**
   *
   * @param {any} node
   * Stores root node as object with key '_luigiRootNode'.
   */
  setRootNode(node) {
    this.dataManagement.set('_luigiRootNode', { node });
  }

  /**
   * Returns the root node
   */
  getRootNode() {
    return this.dataManagement.get('_luigiRootNode');
  }

  hasRootNode() {
    return !!this.getRootNode();
  }

  /* 
      Clear the map and remove all key/values from map.
      */
  deleteCache() {
    this.dataManagement.clear();
  }

  deleteCacheEntry(node) {
    this.dataManagement.delete(node);
  }
}
export const NodeDataManagementStorage = new NodeDataManagementStorageClass();
