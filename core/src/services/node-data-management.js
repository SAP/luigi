import { GenericHelpers } from '../utilities/helpers/generic-helpers';
class NodeDataManagementStorageClass {
  constructor() {
    this.dataManagement = new Map();
  }

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

  getChildren(node) {
    return node ? this.dataManagement.get(node) : [];
  }

  hasChildren(node) {
    let data = this.getChildren(node);
    return data && data.hasOwnProperty('children');
  }

  setRootNode(node) {
    this.dataManagement.set('_luigiRootNode', { node });
  }

  /*
    Get the rootNode 
    */
  getRootNode() {
    this.dataManagement.get('_luigiRootNode');
  }

  /* 
    Clear the map and remove all key/values from map.
    */
  deleteCache() {
    this.dataManagement.clear();
  }
}
export const NodeDataManagementStorage = new NodeDataManagementStorageClass();
