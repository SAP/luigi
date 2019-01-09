// Helper methods for 'navigation.js' file. They don't require any method from 'navigation.js` but are required by them.
import { LuigiConfig } from '../../services/config';
import * as AuthHelpers from './auth-helpers';
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

export const groupNodesBy = (nodes, property) => {
  const result = {};
  nodes.forEach(node => {
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
    arr.push(node);
  });
  return result;
};

export const isOpenUIiconName = string => /^[a-z0-9\-]+$/i.test(string);
