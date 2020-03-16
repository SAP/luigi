import { GenericHelpers } from '../utilities/helpers/generic-helpers';
class NodeDataManagementStorageClass {
  constructor() {
    this.dataManagement = new Map();
    this.lastUrl;
    this.lastPathData;
  }
  /**
   *
   * @param {any} node
   * @param {any} value
   * Node will be stored as key and value as value.
   *
   */
  setChildren(node, value) {
    // pathSegment: ":environmentId"
    // viewUrl: "/sampleapp.html#/environments/:environmentId"
    // parent: {hideFromNav: true, pathSegment: "environments", viewUrl: "/sampleapp.html#/environments", children: Array(1)}
    // __proto__: Object
    if (node && node.pathSegment && node.pathSegment !== undefined) {
    }

    //baue den path zusammen rekursiv über parent
    this.dataManagement.set(node, value);
  }

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
