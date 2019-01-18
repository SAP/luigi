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

export const groupNodesBy = (nodes, property) => {
  const result = {};
  nodes.forEach(node => {
    if (node.hideFromNav) {
      return;
    }
    let key;
    let metaInfo;
    const category = node[property];
    if (category && typeof category === 'object') {
      key = category.label;
      metaInfo = Object.assign({}, category);
    } else {
      key = category;
      metaInfo = {
        label: key,
        icon: 'lui-blank'
      };
    }
    let arr = result[key];
    if (!arr) {
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
    arr.push(node);
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
