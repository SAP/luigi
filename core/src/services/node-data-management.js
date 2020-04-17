class NodeDataManagementStorageClass {
  constructor() {
    this.dataManagement = new Map();
  }
  /**
   *
   * @param {any} node
   * @param {any} value
   * Node will be stored as key and value as value.
   *
   */
  setChildren(node, value) {
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
      return this.buildNavigationPath(navPathRaw, node.parent);
    }
    return navPathRaw; // projects/pr1/users/groups/:OTHER/settings/:DYNNODES1
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

  /**
   * since NEXTRELEASE
   * @param {*} node
   */
  deleteNodesRecursively(node) {
    if (this.hasChildren(node)) {
      let children = this.getChildren(node).children;
      for (let i = 0; i < children.length; i++) {
        this.deleteNodesRecursively(children[i]);
      }
    }
    this.dataManagement.delete(node);
  }
}
export const NodeDataManagementStorage = new NodeDataManagementStorageClass();
