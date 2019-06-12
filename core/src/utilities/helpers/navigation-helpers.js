// Helper methods for 'navigation.js' file. They don't require any method from 'navigation.js` but are required by them.
import { LuigiAuth, LuigiConfig } from '../../core-api';
import { AuthHelpers } from './';

class NavigationHelpersClass {
  constructor() {
    this.EXP_CAT_KEY = 'luigi.preferences.navigation.expandedCategories';
    this.virtualGroupPrefix = '___';
  }

  isNodeAccessPermitted(nodeToCheckPermissionFor, parentNode, currentContext) {
    if (LuigiAuth.isAuthorizationEnabled()) {
      const loggedIn = AuthHelpers.isLoggedIn();
      const anon = nodeToCheckPermissionFor.anonymousAccess;

      if (
        (loggedIn && anon === 'exclusive') ||
        (!loggedIn && anon !== 'exclusive' && anon !== true)
      ) {
        return false;
      }
    }
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
  }

  applyContext(context, addition, navigationContext) {
    if (addition) {
      for (var p in addition) {
        context[p] = addition[p];
      }
    }
    if (navigationContext) {
      context.parentNavigationContexts.unshift(navigationContext);
    }
    return context;
  }

  // TODO: use one extracted generic helper function here and in routing.js
  getNodePath(node) {
    if (node.parent) {
      return this.getNodePath(node.parent) + '/' + node.pathSegment;
    } else {
      return node.pathSegment;
    }
  }

  groupNodesBy(nodes, property, useVirtualGroups) {
    const result = {};
    let groupCounter = 0;
    let virtualGroupCounter = 0;

    const orderNodes = nodes => {
      nodes.sort((a, b) => {
        const oa = a.order || 0;
        const ob = b.order || 0;
        return oa - ob;
      });
    };

    nodes.forEach(node => {
      let key;
      let metaInfo;
      const category = node[property];
      if (category && typeof category === 'object') {
        key = category.label;
        metaInfo = Object.assign({}, category);
      } else {
        key = category;
        if (useVirtualGroups && !category) {
          key = this.virtualGroupPrefix + virtualGroupCounter;
        }
        metaInfo = {
          label: key,
          icon: 'lui-blank'
        };
      }

      let arr = result[key];
      if (!arr) {
        if (useVirtualGroups && category) {
          virtualGroupCounter++;
        }
        if (
          metaInfo.order === undefined ||
          metaInfo.order === null ||
          metaInfo.order === ''
        ) {
          metaInfo.order = key ? groupCounter++ : -1;
        }
        arr = [];
        result[key] = arr;
      }
      if (!arr.metaInfo) {
        arr.metaInfo = metaInfo;
      }
      if (!arr.metaInfo.categoryUid && key && arr.metaInfo.collapsible) {
        arr.metaInfo.categoryUid = node.parent
          ? this.getNodePath(node.parent) + ':' + key
          : key;
      }
      if (!node.hideFromNav) {
        arr.push(node);
      }
    });
    Object.keys(result).forEach(category => {
      orderNodes(result[category]);
      if (result[category].length === 0) {
        delete result[category];
      }
    });
    return result;
  }

  loadExpandedCategories() {
    let expandedList = [];
    const expString = localStorage.getItem(this.EXP_CAT_KEY);
    if (expString) {
      try {
        expandedList = JSON.parse(expString);
      } catch (e) {
        console.warn('Preference data corrupted, using default');
      }
    }
    return expandedList;
  }

  storeExpandedState(key, value) {
    const expandedList = this.loadExpandedCategories();
    if (value) {
      if (expandedList.indexOf(key) < 0) {
        expandedList.push(key);
      }
    } else {
      let index = expandedList.indexOf(key);
      if (index >= 0) {
        expandedList.splice(index, 1);
      }
    }
    localStorage.setItem(this.EXP_CAT_KEY, JSON.stringify(expandedList));
    return expandedList;
  }

  isOpenUIiconName(string) {
    return /^[a-z0-9\-]+$/i.test(string);
  }
}

export const NavigationHelpers = new NavigationHelpersClass();
