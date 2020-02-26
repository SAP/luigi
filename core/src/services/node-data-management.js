import { GenericHelpers } from '../utilities/helpers/generic-helpers';
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
    if (node && value) {
      if (GenericHelpers.isObject(value)) {
        let tmpStorage = this.dataManagement.get(node);
        if (tmpStorage) {
          Object.keys(value).forEach(item => {
            tmpStorage[item] = value[item];
          });
          this.dataManagement.set(node, tmpStorage);
        } else {
          this.dataManagement.set(node, value);
        }
      } else {
        this.dataManagement.set(node, value);
      }
    } else {
      console.log(
        "Something went wrong!If you talk about cache, it's not cache anymore!"
      );
    }
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
    let data = this.getChildren(node);
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
    return this.getRootNode() ? true : false;
  }

  /* 
      Clear the map and remove all key/values from map.
      */
  deleteCache() {
    this.dataManagement.clear();
  }
}
export const NodeDataManagementStorage = new NodeDataManagementStorageClass();
