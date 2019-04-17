// Helper methods for 'navigation.js' file. They don't require any method from 'navigation.js` but are required by them.
import { LuigiConfig } from '../../services/config';
import * as AuthHelpers from './auth-helpers';

const EXP_CAT_KEY = 'luigi.preferences.navigation.expandedCategories';

export const isNodeAccessPermitted = (
  nodeToCheckPermissionFor,
  parentNode,
  currentContext
) => {
  if (LuigiConfig.isAuthorizationEnabled()) {
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
};

export const applyContext = (context, addition, navigationContext) => {
  if (addition) {
    for (var p in addition) {
      context[p] = addition[p];
    }
  }
  if (navigationContext) {
    context.parentNavigationContexts.unshift(navigationContext);
  }
  return context;
};

// TODO: use one extracted generic helper function here and in routing.js
export const getNodePath = node => {
  if (node.parent) {
    return getNodePath(node.parent) + '/' + node.pathSegment;
  } else {
    return node.pathSegment;
  }
};

const orderNodes = nodes => {
  nodes.sort((a, b) => {
    const oa = a.order || 0;
    const ob = b.order || 0;
    return oa - ob;
  });
};

export const groupNodesBy = (nodes, property, useVirtualGroups) => {
  const result = {};
  let virtualGroupCounter = 0;

  nodes.forEach(node => {
    let key;
    let metaInfo;
    const category = node[property];
    if (category && typeof category === 'object') {
      key = category.label;
      metaInfo = Object.assign({}, category);
    } else {
      key = category;
      if(useVirtualGroups && !category) {
        key = "___" + virtualGroupCounter;
      }
      metaInfo = {
        label: key,
        icon: 'lui-blank'
      };
    }

    let arr = result[key];
    if (!arr) {
      if(useVirtualGroups && category) {
        virtualGroupCounter++;
      }
      arr = [];
      result[key] = arr;
    }
    if (!arr.metaInfo) {
      arr.metaInfo = metaInfo;
    }
    if (!arr.metaInfo.categoryUid && key && arr.metaInfo.collapsible) {
      arr.metaInfo.categoryUid = node.parent
        ? getNodePath(node.parent) + ':' + key
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
};

export const loadExpandedCategories = () => {
  let expandedList = [];
  const expString = localStorage.getItem(EXP_CAT_KEY);
  if (expString) {
    try {
      expandedList = JSON.parse(expString);
    } catch (e) {
      console.warn('Preference data corrupted, using default');
    }
  }
  return expandedList;
};

export const storeExpandedState = (key, value) => {
  const expandedList = loadExpandedCategories();
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
  localStorage.setItem(EXP_CAT_KEY, JSON.stringify(expandedList));
  return expandedList;
};

export const isOpenUIiconName = string => /^[a-z0-9\-]+$/i.test(string);
