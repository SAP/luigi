//TODO: make some tests here
const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { AuthHelpers, NavigationHelpers } from '../../../src/utilities/helpers';
import { LuigiAuth, LuigiConfig } from '../../../src/core-api';

describe('Navigation-helpers', () => {
  describe('isNodeAccessPermitted', () => {
    beforeEach(() => {
      sinon.stub(LuigiAuth, 'isAuthorizationEnabled');
      sinon.stub(AuthHelpers, 'isLoggedIn');
      sinon.stub(LuigiConfig, 'getConfigValue');
    });
    afterEach(() => {
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
      const permissionCheckerFn = sinon.spy();

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
      const permissionCheckerFn = sinon.spy();

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(true);
      LuigiConfig.getConfigValue.returns(permissionCheckerFn);

      assert.isFalse(NavigationHelpers.isNodeAccessPermitted(checkNode));
    });

    it('logged out, exclusive anonymousAccess', () => {
      const checkNode = {
        anonymousAccess: 'exclusive'
      };
      const permissionCheckerFn = sinon.spy();

      LuigiAuth.isAuthorizationEnabled.returns(true);
      AuthHelpers.isLoggedIn.returns(true);
      LuigiConfig.getConfigValue.returns(permissionCheckerFn);

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

      assert.isTrue(
        NavigationHelpers.isNodeAccessPermitted(checkNode, parentNode, context)
      );
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
      assert.equal(
        NavigationHelpers.isOpenUIiconName('./relative.path'),
        false
      );
      assert.equal(
        NavigationHelpers.isOpenUIiconName(
          'http://niceicons.com/that-one-icon.png'
        ),
        false
      );
      assert.equal(
        NavigationHelpers.isOpenUIiconName('https://google.com'),
        false
      );
    });
  });

  it('getNodePath', () => {
    const node = {
      parent: {
        pathSegment: 'parent'
      },
      pathSegment: 'pathSegment'
    };
    assert.equal(
      NavigationHelpers.getNodePath(node),
      'parent/pathSegment',
      'path should match'
    );
  });
});
