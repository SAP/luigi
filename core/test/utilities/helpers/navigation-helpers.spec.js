//TODO: make some tests here
const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { AuthHelpers, NavigationHelpers, GenericHelpers, RoutingHelpers } from '../../../src/utilities/helpers';
import { LuigiAuth, LuigiConfig } from '../../../src/core-api';
import { Routing } from '../../../src/services/routing';
import { Navigation } from '../../../src/navigation/services/navigation';

describe('Navigation-helpers', () => {
  describe('isNodeAccessPermitted', () => {
    let permissionCheckerFn;
    beforeEach(() => {
      permissionCheckerFn = sinon.spy();
      sinon.stub(LuigiAuth, 'isAuthorizationEnabled');
      sinon.stub(AuthHelpers, 'isLoggedIn');
      sinon.stub(LuigiConfig, 'getConfigValue');
    });
    afterEach(() => {
      permissionCheckerFn = undefined;
      sinon.restore();
    });

    it('without permissionCheckerFn', () => {
      LuigiConfig.getConfigValue.returns(null);
      assert.isTrue(NavigationHelpers.isNodeAccessPermitted());
    });

    it('logged in, normal anonymousAccess', () => {
      const checkNode = {
        anonymousAccess: true
      };

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(true);

      assert.isTrue(NavigationHelpers.isNodeAccessPermitted(checkNode));
    });

    it('logged out, normal anonymousAccess', () => {
      const checkNode = {
        anonymousAccess: true
      };

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(false);

      assert.isTrue(NavigationHelpers.isNodeAccessPermitted(checkNode));
    });

    it('logged in, exclusive anonymousAccess', () => {
      const checkNode = {
        anonymousAccess: 'exclusive'
      };

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(true);
      LuigiConfig.getConfigValue.returns(permissionCheckerFn);

      assert.isFalse(NavigationHelpers.isNodeAccessPermitted(checkNode));
    });

    it('logged out, exclusive anonymousAccess, without permissionCheckerFn', () => {
      const checkNode = {
        anonymousAccess: 'exclusive'
      };

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(false);
      LuigiConfig.getConfigValue.returns(undefined);

      assert.isTrue(NavigationHelpers.isNodeAccessPermitted(checkNode));
    });

    it('logged out, no anonymousAccess', () => {
      const checkNode = {
        anonymousAccess: false
      };

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(false);

      assert.isFalse(NavigationHelpers.isNodeAccessPermitted(checkNode));
    });

    it('with permissionCheckerFn', () => {
      const checkNode = { viewUrl: 'current' };
      const parentNode = { viewUrl: 'parent' };
      const context = { data: '' };
      const permissionCheckerFn = sinon.stub().returns(true);

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(true);
      LuigiConfig.getConfigValue.returns(permissionCheckerFn);

      assert.isTrue(NavigationHelpers.isNodeAccessPermitted(checkNode, parentNode, context));
      assert(
        permissionCheckerFn.calledWith(checkNode, parentNode, context),
        'permissionCheckerFn called with proper arguments'
      );
    });
  });
  describe('isOpenUIiconName', () => {
    it('should return true for valid icon names', async () => {
      assert.equal(NavigationHelpers.isOpenUIiconName('settings'), true);
      assert.equal(NavigationHelpers.isOpenUIiconName('add-activity-2'), true);
      assert.equal(NavigationHelpers.isOpenUIiconName('back-to-top'), true);
    });

    it('should return false for invalid icon names', async () => {
      assert.equal(NavigationHelpers.isOpenUIiconName('./relative.path'), false);
      assert.equal(NavigationHelpers.isOpenUIiconName('http://niceicons.com/that-one-icon.png'), false);
      assert.equal(NavigationHelpers.isOpenUIiconName('https://google.com'), false);
    });
  });

  describe('getProductSwitcherColumnsNumber', () => {
    beforeEach(() => {
      sinon.stub(LuigiConfig, 'getConfigValue');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return number from config file if columns are defined', () => {
      LuigiConfig.getConfigValue.returns({
        icon: 'grid',
        label: 'Products',
        columns: 3
      });
      const columns = NavigationHelpers.getProductSwitcherColumnsNumber();
      assert.equal(columns, 3);
    });
    it('should return number from config file even if columns are not defined', () => {
      LuigiConfig.getConfigValue.returns({ icon: 'grid', label: 'Products' });
      const columns = NavigationHelpers.getProductSwitcherColumnsNumber();
      assert.equal(columns, 4);
    });
  });

  it('getNodePath', () => {
    const node = {
      parent: {
        pathSegment: 'parent'
      },
      pathSegment: 'pathSegment'
    };
    assert.equal(NavigationHelpers.getNodePath(node), 'parent/pathSegment', 'path should match');
  });

  describe('handleUnresponsiveClient', () => {
    let node;
    beforeEach(() => {
      node = {
        category: 'External Views',
        viewId: 'viewX',
        label: 'This is X',
        viewUrl: 'https://this.is.x/index.html'
      };
      Routing.navigateTo = sinon.spy();
    });
    afterEach(() => {
      sinon.restore();
    });

    it('default redirection', () => {
      // given
      node.errorPageHandler = {
        timeout: 1000
      };
      const defaultPath = '/';

      // when
      NavigationHelpers.handleUnresponsiveClient(node.errorPageHandler);

      // then
      sinon.assert.calledWithExactly(Routing.navigateTo, defaultPath);
    });

    it('redirection to the specified path', async () => {
      // given
      node.errorPageHandler = {
        timeout: 1000,
        redirectPath: '/somewhere'
      };
      const expectedPath = node.errorPageHandler.redirectPath;

      // when
      NavigationHelpers.handleUnresponsiveClient(node.errorPageHandler);

      // then
      sinon.assert.calledWithExactly(Routing.navigateTo, expectedPath);
    });

    it('test when errorFn takes effect', async () => {
      // given
      node.errorPageHandler = {
        timeout: 1000,
        redirectPath: '/somewhere',
        errorFn: sinon.spy()
      };

      // when
      NavigationHelpers.handleUnresponsiveClient(node.errorPageHandler);

      // then
      sinon.assert.calledOnce(node.errorPageHandler.errorFn);
    });
  });

  describe('burger tooltip', () => {
    beforeEach(() => {
      sinon.stub(LuigiConfig, 'getConfigValue');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Burger tooltip with defined collapsed and expanded label', () => {
      LuigiConfig.getConfigValue.returns({
        navExpanded: 'Collapse navigation test',
        navCollapsed: 'Expand navigation test'
      });
      const [collapseLabel, expandLabel] = NavigationHelpers.getBurgerTooltipConfig();
      assert.equal(collapseLabel, 'Expand navigation test');
      assert.equal(expandLabel, 'Collapse navigation test');
    });

    it('Burger tooltip without defining a label, just use boolean', () => {
      LuigiConfig.getConfigValue.returns(true);
      const [collapseLabel, expandLabel] = NavigationHelpers.getBurgerTooltipConfig();
      assert.equal(collapseLabel, 'Expand navigation');
      assert.equal(expandLabel, 'Collapse navigation');
    });
  });

  describe('shouldPreventNavigationForPath', () => {
    afterEach(() => {
      sinon.restore();
      sinon.reset();
    });

    it('returns true when navigation should be prevented for path', async () => {
      sinon.stub(Navigation, 'getNavigationPath').returns('testPreventNavigation');
      sinon.stub(RoutingHelpers, 'getLastNodeObject').returns({
        pathSegment: 'testPreventNavigation',
        label: 'Prevent navigation conditionally',
        onNodeActivation: () => {
          return false;
        }
      });
      const actual = await NavigationHelpers.shouldPreventNavigationForPath('testPreventNavigation');
      assert.equal(actual, true);
    });

    it('returns false when navigation should not be prevented for path', async () => {
      sinon.stub(Navigation, 'getNavigationPath').returns('testNotPreventNavigation');
      sinon.stub(RoutingHelpers, 'getLastNodeObject').returns({
        pathSegment: 'testNotPreventNavigation',
        label: 'Do not prevent navigation conditionally',
        onNodeActivation: () => {
          return true;
        }
      });
      const actual = await NavigationHelpers.shouldPreventNavigationForPath('testNotPreventNavigation');
      assert.equal(actual, false);
    });
  });
});
