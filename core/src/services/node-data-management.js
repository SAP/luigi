import { GenericHelpers } from '../utilities/helpers/generic-helpers';
class NodeDataManagementStorageClass {
  constructor() {
    this.dataManagement = new Map();
  }

  addData(k, v) {
    if (k && v) {
      if (GenericHelpers.isObject(v)) {
        let tmpStorage = this.dataManagement.get(k);
        if (tmpStorage) {
          Object.keys(v).forEach(item => {
            tmpStorage[item] = v[item];
          });
          this.dataManagement.set(k, tmpStorage);
        } else {
          this.dataManagement.set(k, v);
        }
      } else {
        this.dataManagement.set(k, v);
      }
    }
  }

  getData(k) {
    if (k) {
      this.dataManagement.get(k);
      return this.dataManagement.get(k);
    }
  }

  deleteCache() {
    this.dataManagement.clear();
  }

  hasChildren(node) {
    let data = this.getData(node);
    return data && data.hasOwnProperty('children');
  }

  setRootNode(node) {
    this.dataManagement.set('_luigiRootNode', { node });
  }
}
export const NodeDataManagementStorage = new NodeDataManagementStorageClass();
