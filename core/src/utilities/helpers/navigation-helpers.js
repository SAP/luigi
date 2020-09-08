// Helper methods for 'navigation.js' file. They don't require any method from 'navigation.js` but are required by them.
import { LuigiAuth, LuigiConfig, LuigiFeatureToggles } from '../../core-api';
import { AuthHelpers } from './';
import { Navigation } from '../../navigation/services/navigation';
import { Routing } from '../../services/routing';

class NavigationHelpersClass {
  constructor() {
    this.EXP_CAT_KEY = 'luigi.preferences.navigation.expandedCategories';
    this.COL_NAV_KEY = 'luigi.preferences.navigation.collapsedNavigation';
    this.virtualGroupPrefix = '___';
  }

  getProductSwitcherConfig() {
    const userConfig = LuigiConfig.getConfigValue('navigation.productSwitcher');
    return Object.assign({ icon: 'grid', label: 'My Products' }, userConfig);
  }

  getProductSwitcherColumnsNumber() {
    const productSwitcherConfig = this.getProductSwitcherConfig();
    return productSwitcherConfig.columns === 3 ? 3 : 4;
  }

  prepareForTests(...parts) {
    let result = '';
    parts.forEach(p => {
      if (p) {
        result +=
          (result ? '_' : '') +
          encodeURIComponent(
            p
              .toLowerCase()
              .split(' ')
              .join('')
          );
      }
    });
    return result;
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
    if (
      nodeToCheckPermissionFor &&
      nodeToCheckPermissionFor.visibleForFeatureToggles
    ) {
      let activeFeatureToggles = LuigiFeatureToggles.getActiveFeatureToggleList();
      for (let ft of nodeToCheckPermissionFor.visibleForFeatureToggles) {
        if (ft.startsWith('!')) {
          if (activeFeatureToggles.includes(ft.slice(1))) {
            return false;
          }
        } else {
          if (!activeFeatureToggles.includes(ft)) {
            return false;
          }
        }
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
          label: key
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

  async generateTopNavNodes(pathData) {
    const rawChildren = await Navigation.getFilteredChildren(pathData[0]);
    let selectedNode = null;
    let visibleNodeCount = 0;
    let cats = {};
    const children = [];
    let badgeCountsToSumUp = [];

    for (const node of rawChildren) {
      pathData.forEach(n => {
        if (!selectedNode && n === node) {
          selectedNode = node;
        }
      });

      if (!node.hideFromNav) {
        visibleNodeCount++;
      }
      let badgeCount;
      const hasBadge = !!node.badgeCounter;
      if (hasBadge) {
        badgeCount = await node.badgeCounter.count();
      }

      if (node.category) {
        const catLabel = node.category.label || node.category;
        if (cats[catLabel]) {
          if (!cats[catLabel].icon) {
            cats[catLabel].icon = node.category.icon;
            cats[catLabel].altText = node.category.altText;
          }
          if (hasBadge && !cats[catLabel].badgeCounter) {
            cats[catLabel].badgeCounter = {
              label: '',
              count: () => badgeCount
            };
          } else if (hasBadge) {
            const updatedCount =
              cats[catLabel].badgeCounter.count() + badgeCount;
            cats[catLabel].badgeCounter.count = () => updatedCount;
          }
        } else {
          cats[catLabel] = {
            isCat: true,
            label: catLabel,
            icon: node.category.icon,
            altText: node.category.altText,
            children: [],
            badgeCounter: hasBadge && { label: '', count: () => badgeCount }
          };
          children.push(cats[catLabel]);
        }
        cats[catLabel].children.push(node);
      } else {
        children.push(node);
      }

      if (badgeCount) {
        badgeCountsToSumUp.push(badgeCount);
      }
    }
    const tnd = {
      children,
      selectedNode,
      visibleNodeCount
    };

    if (badgeCountsToSumUp.length) {
      const badgeCountSum = badgeCountsToSumUp.reduce((a, b) => a + b);
      tnd.totalBadgeNode = {
        badgeCounter: {
          count: () => badgeCountSum,
          label: ''
        }
      };
    }
    return tnd;
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

  handleUnresponsiveClient(node) {
    if (node.errorFn) {
      node.errorFn();
    } else {
      console.warn(
        'Something went wrong with a client! You will be redirected to another page.'
      );
      const path = node.redirectPath || '/';
      Routing.navigateTo(path);
    }
  }
}

export const NavigationHelpers = new NavigationHelpersClass();
