import { AuthHelpers, GenericHelpers } from '../../src/utilities/helpers';
import { LuigiAuth, LuigiConfig } from '../../src/core-api';

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');

import { AuthLayerSvc, AuthStoreSvc } from '../../src/services';

// let AuthLayerSvc;

describe('AuthLayer', () => {
  const authConfigMock = () => ({
    use: 'mock',
    mock: {
      redirect_uri: 'about:blank'
    }
  });

  let errorStub;

  beforeEach(() => {
    // AuthLayerSvc = Object.assign(Object.create(Object.getPrototypeOf(OrigAuthLayerSvc)), OrigAuthLayerSvc);
    errorStub = sinon.stub(console, 'error');
    AuthLayerSvc.idpProviderInstance = undefined;
    AuthLayerSvc.setProfileLogoutFn();
    sinon.stub(LuigiAuth, 'handleAuthEvent');
    sinon.stub(AuthStoreSvc, 'isNewlyAuthorized');
    sinon.stub(AuthStoreSvc, 'removeAuthData');
    sinon.stub(AuthStoreSvc, 'removeNewlyAuthorized');
    sinon.stub(AuthStoreSvc, 'setNewlyAuthorized');
    sinon.stub(AuthHelpers, 'parseUrlAuthErrors');
    sinon.stub(AuthHelpers, 'handleUrlAuthErrors').returns(true);
    sinon.stub(LuigiConfig, 'setErrorMessage');
    sinon.stub(LuigiConfig, 'getConfigValue').returns(authConfigMock());
  });
  afterEach(() => {
    sinon.restore();
    errorStub.resetHistory();
  });
  describe('Methods', () => {
    it('constructor values', () => {
      assert.exists(AuthLayerSvc._userInfoStore);
      assert.exists(AuthLayerSvc._loggedInStore);
    });
    describe('init', () => {
      beforeEach(() => {
        sinon.stub(AuthLayerSvc, 'checkAuth').returns('called');
        sinon.stub(AuthLayerSvc, 'getIdpProviderInstance').returns({});
      });
      it('on url auth error, returns void', async () => {
        // given
        const mockError = {
          error: 'MockError',
          errorDescription: 'An error occurred.'
        };
        AuthHelpers.parseUrlAuthErrors.returns(mockError);
        AuthHelpers.handleUrlAuthErrors.returns(false);

        // when
        const result = await AuthLayerSvc.init();

        // then
        sinon.assert.notCalled(AuthLayerSvc.getIdpProviderInstance);
        sinon.assert.calledWith(
          AuthHelpers.handleUrlAuthErrors,
          authConfigMock(),
          mockError.error,
          mockError.errorDescription
        );
        assert.isUndefined(result, 'check init() result');
      });
      it('non-promise provider', async () => {
        // given
        LuigiConfig.getConfigValue.returns(authConfigMock().mock);

        // when
        const result = await AuthLayerSvc.init();

        // then
        sinon.assert.calledWith(AuthLayerSvc.checkAuth, authConfigMock().mock);
        assert.equal(result, 'called');
      });
      it('promise provider success', async () => {
        // given
        LuigiConfig.getConfigValue.returns(authConfigMock().mock);
        const thisMock = Object.assign(authConfigMock().mock, {
          clientid: 'foo'
        });
        AuthLayerSvc.getIdpProviderInstance.resolves(thisMock);

        // when
        const result = await AuthLayerSvc.init();

        // then
        sinon.assert.calledWith(AuthLayerSvc.checkAuth, authConfigMock().mock);
        // does not work because of the stub, but I would like to check that "resolved" was set as this.idpProviderInstance
        // assert.deepEqual(AuthLayerSvc.idpProviderInstance, thisMock);
        assert.equal(result, 'called');
      });
      it('promise provider failure', async () => {
        // given
        LuigiConfig.getConfigValue.returns(authConfigMock().mock);
        AuthLayerSvc.getIdpProviderInstance.rejects({
          message: 'Something failed'
        });

        // when
        const result = await AuthLayerSvc.init();

        // then
        sinon.assert.calledOnce(LuigiConfig.setErrorMessage);
        sinon.assert.notCalled(AuthLayerSvc.checkAuth);
        assert.isUndefined(result);
      });
    });
    describe('startAuthorization', () => {
      it('no instance', async () => {
        AuthLayerSvc.idpProviderInstance = undefined;

        const result = await AuthLayerSvc.startAuthorization();

        assert.isUndefined(result);
      });
      it('valid instance, success', async () => {
        AuthLayerSvc.idpProviderInstance = {
          login: sinon.stub().resolves(undefined)
        };

        const authPromise = AuthLayerSvc.startAuthorization();
        expect(authPromise).to.be.a('promise');

        const result = await authPromise;
        sinon.assert.calledOnce(AuthStoreSvc.setNewlyAuthorized);
        sinon.assert.notCalled(console.error);
        assert.isUndefined(result);
      });
      it('valid instance, error', async () => {
        const providerError = 'Error';
        AuthLayerSvc.idpProviderInstance = {
          login: sinon.stub().resolves(providerError)
        };

        const authPromise = AuthLayerSvc.startAuthorization();
        expect(authPromise).to.be.a('promise');

        const result = await authPromise;
        sinon.assert.calledOnce(AuthStoreSvc.setNewlyAuthorized);
        sinon.assert.calledWith(console.error, providerError);
        assert.isUndefined(result);
      });
    });
    describe('logout', () => {
      it('with custom logout function', () => {
        // given
        const mockAuthData = { token: '...' };
        AuthLayerSvc.idpProviderInstance = {
          settings: 'something'
        };
        sinon.stub(AuthHelpers, 'getStoredAuthData').returns(mockAuthData);
        const customLogoutFn = sinon.spy();
        LuigiConfig.getConfigValue.returns(customLogoutFn);

        // when
        AuthLayerSvc.logout();

        // then
        sinon.assert.calledWith(customLogoutFn, AuthLayerSvc.idpProviderInstance.settings, mockAuthData);
      });
      it('with provider logout function', () => {
        // given
        const mockAuthData = { token: '...' };
        AuthLayerSvc.idpProviderInstance = {
          settings: 'something',
          logout: sinon.spy()
        };
        sinon.stub(AuthHelpers, 'getStoredAuthData').returns(mockAuthData);
        LuigiConfig.getConfigValue.returns(undefined);

        // when
        AuthLayerSvc.logout();

        // then
        sinon.assert.calledWith(AuthLayerSvc.idpProviderInstance.logout, mockAuthData);
      });
      it('with profile logout function', () => {
        // given
        const mockAuthData = { token: '...' };
        AuthLayerSvc.idpProviderInstance = {
          settings: 'something'
        };
        sinon.stub(AuthHelpers, 'getStoredAuthData').returns(mockAuthData);
        LuigiConfig.getConfigValue.returns(undefined);
        const profileLogoutFn = sinon.stub();

        // when
        AuthLayerSvc.setProfileLogoutFn(profileLogoutFn);
        AuthLayerSvc.logout();

        // then
        sinon.assert.calledOnce(profileLogoutFn);
      });
      it('without any custom using default logoutCallback', () => {
        // given
        const mockAuthData = { token: '...' };
        sinon.stub(AuthHelpers, 'getStoredAuthData').returns(mockAuthData);
        AuthLayerSvc.idpProviderInstance = {
          settings: { logoutUrl: 'something' }
        };
        LuigiConfig.getConfigValue.returns(undefined);

        // when
        AuthLayerSvc.logout();

        // then
        sinon.assert.calledOnce(LuigiAuth.handleAuthEvent);
        sinon.assert.calledWith(
          LuigiAuth.handleAuthEvent,
          'onLogout',
          AuthLayerSvc.idpProviderInstance.settings,
          undefined,
          AuthLayerSvc.idpProviderInstance.settings.logoutUrl
        );
      });
    });
    describe('getIdpProviderInstance', () => {
      beforeEach(() => {
        sinon.stub(GenericHelpers, 'getConfigValueFromObject');
      });
      it('with idp, but missing login function', async () => {
        class MockIdpProviderClass {
          constructor() {
            return this;
          }
        }
        GenericHelpers.getConfigValueFromObject.returns(MockIdpProviderClass);

        // when
        let error;
        try {
          await AuthLayerSvc.getIdpProviderInstance('mock', 'settings');
        } catch (e) {
          error = e;
        }

        // then
        assert.deepEqual(error, {
          message: 'login function does not exist in custom IDP Provider mock',
          name: 'IdpProviderException'
        });
      });
      it('with idp, but missing login function', async () => {
        class MockIdpProviderClass {
          constructor() {
            return this;
          }
          login() {}
        }
        GenericHelpers.getConfigValueFromObject.returns(MockIdpProviderClass);

        // when
        let error;
        let result;
        try {
          result = await AuthLayerSvc.getIdpProviderInstance('mock', 'settings');
        } catch (e) {
          error = e;
        }

        // then
        assert.isUndefined(error);
        assert.isDefined(result);
      });
      it('without idp, and defined onAuthConfigError event', async () => {
        GenericHelpers.getConfigValueFromObject.returns(undefined);
        LuigiConfig.getConfigValue.returns(() => {});
        // when
        let error;
        let result;
        try {
          result = await AuthLayerSvc.getIdpProviderInstance('mock', 'settings');
        } catch (e) {
          error = e;
        }

        // then
        sinon.assert.calledWith(LuigiConfig.getConfigValue, 'auth.events.onAuthConfigError');
        sinon.assert.calledWithExactly(LuigiAuth.handleAuthEvent, 'onAuthConfigError', {
          idpProviderName: 'mock',
          type: 'IdpProviderException'
        });
        assert.isUndefined(error);
        assert.isUndefined(result);
      });
      it('without idp, standard IdpProviderException', async () => {
        GenericHelpers.getConfigValueFromObject.returns(undefined);
        LuigiConfig.getConfigValue.returns(undefined);
        // when
        let error;
        let result;
        try {
          result = await AuthLayerSvc.getIdpProviderInstance('mock', 'settings');
        } catch (e) {
          error = e;
        }

        // then
        sinon.assert.calledWith(LuigiConfig.getConfigValue, 'auth.events.onAuthConfigError');

        assert.deepEqual(error, {
          message: 'IDP Provider mock does not exist.',
          name: 'IdpProviderException'
        });
        assert.isUndefined(result, 'result');
      });
    });
    describe('checkAuth', () => {
      beforeEach(() => {
        sinon.stub(AuthHelpers, 'getStoredAuthData');
        sinon.stub(AuthHelpers, 'isLoggedIn');
      });
      describe('non-auth', () => {
        it('not logged in, enabled disableAutoLogin', async () => {
          AuthHelpers.getStoredAuthData.returns(null);
          AuthHelpers.isLoggedIn.returns(false);
          LuigiConfig.getConfigValue.returns(true);

          const result = await AuthLayerSvc.checkAuth({});

          sinon.assert.calledWith(LuigiConfig.getConfigValue, 'auth.disableAutoLogin');
          assert.isUndefined(result);
        });
        it('no authData, not logged in, default with autologin', async () => {
          AuthHelpers.getStoredAuthData.returns(null);
          AuthHelpers.isLoggedIn.returns(false);
          LuigiConfig.getConfigValue.returns(undefined);
          sinon.stub(AuthLayerSvc, 'startAuthorization').returns(true);

          const mockIdpSettings = { redirect_uri: '' };

          const result = await AuthLayerSvc.checkAuth(mockIdpSettings);

          sinon.assert.calledWith(LuigiConfig.getConfigValue, 'auth.disableAutoLogin');
          sinon.assert.calledOnce(AuthLayerSvc.startAuthorization);
          assert.isTrue(result);
        });
        it('authData, not logged in, onAuthExpired is skipping startAuthorization', async () => {
          AuthHelpers.getStoredAuthData.returns({});
          AuthHelpers.isLoggedIn.returns(false);
          LuigiConfig.getConfigValue.returns(undefined);
          sinon.stub(AuthLayerSvc, 'startAuthorization').returns(true);
          LuigiAuth.handleAuthEvent.returns(false);

          const mockIdpSettings = { redirect_uri: '' };

          const result = await AuthLayerSvc.checkAuth(mockIdpSettings);

          sinon.assert.calledWith(LuigiConfig.getConfigValue, 'auth.disableAutoLogin');
          sinon.assert.notCalled(AuthLayerSvc.startAuthorization);
          assert.isUndefined(result);
        });
        it('authData, logged in, onAuthExpired allows startAuthorization', async () => {
          AuthHelpers.getStoredAuthData.returns({});
          AuthHelpers.isLoggedIn.returns(false);
          LuigiConfig.getConfigValue.returns(undefined);
          sinon.stub(AuthLayerSvc, 'startAuthorization').returns(true);
          LuigiAuth.handleAuthEvent.returns(true);

          const mockIdpSettings = { redirect_uri: '' };

          const result = await AuthLayerSvc.checkAuth(mockIdpSettings);

          sinon.assert.calledWith(LuigiConfig.getConfigValue, 'auth.disableAutoLogin');
          sinon.assert.calledOnce(AuthLayerSvc.startAuthorization);
          assert.isTrue(result);
        });
        it('authData, logged in, onAuthExpired allows startAuthorization', async () => {
          AuthHelpers.getStoredAuthData.returns({});
          AuthHelpers.isLoggedIn.returns(false);
          LuigiConfig.getConfigValue.returns(undefined);
          sinon.stub(AuthLayerSvc, 'startAuthorization').returns(true);
          LuigiAuth.handleAuthEvent.returns(true);
        });
      });
      describe('auth setting loggedIn and userInfo', () => {
        it('user defined userInfoFn', async () => {
          const mockUserInfo = 'user';
          AuthLayerSvc.idpProviderInstance = {
            settings: {
              userInfoFn: sinon.stub().returns(Promise.resolve(mockUserInfo))
            }
          };
          const mockAuthData = 'luigiauthdata';
          AuthHelpers.getStoredAuthData.returns(mockAuthData);
          AuthHelpers.isLoggedIn.returns(true);
          sinon.stub(AuthLayerSvc, 'setUserInfo');
          sinon.stub(AuthLayerSvc, 'setLoggedIn');

          // when
          await AuthLayerSvc.checkAuth();

          // then
          sinon.assert.calledOnce(AuthLayerSvc.idpProviderInstance.settings.userInfoFn);
          sinon.assert.calledWith(
            AuthLayerSvc.idpProviderInstance.settings.userInfoFn,
            AuthLayerSvc.idpProviderInstance.settings,
            mockAuthData
          );
          sinon.assert.calledWith(AuthLayerSvc.setUserInfo, mockUserInfo);
          sinon.assert.calledWith(AuthLayerSvc.setLoggedIn, true);
        });
        it('provider defined userInfo', async () => {
          const mockUserInfo = 'user';
          const mockAuthData = 'luigiauthdata';
          const mockSettings = 'mocksettings';
          AuthLayerSvc.idpProviderInstance = {
            settings: {},
            userInfo: sinon.stub().returns(Promise.resolve(mockUserInfo))
          };
          AuthHelpers.getStoredAuthData.returns(mockAuthData);
          AuthHelpers.isLoggedIn.returns(true);
          sinon.stub(AuthLayerSvc, 'setUserInfo');
          sinon.stub(AuthLayerSvc, 'setLoggedIn');

          // when
          await AuthLayerSvc.checkAuth(mockSettings);

          // then
          sinon.assert.calledOnce(AuthLayerSvc.idpProviderInstance.userInfo);
          sinon.assert.calledWith(AuthLayerSvc.idpProviderInstance.userInfo, mockSettings);
          sinon.assert.calledWith(AuthLayerSvc.setUserInfo, mockUserInfo);
          sinon.assert.calledWith(AuthLayerSvc.setLoggedIn, true);
        });
        it('provider default', async () => {
          const mockAuthData = 'luigiauthdata';
          const mockSettings = 'mocksettings';
          AuthLayerSvc.idpProviderInstance = {
            settings: {}
          };
          AuthHelpers.getStoredAuthData.returns(mockAuthData);
          AuthHelpers.isLoggedIn.returns(true);
          sinon.stub(AuthLayerSvc, 'setUserInfo');
          sinon.stub(AuthLayerSvc, 'setLoggedIn');

          // when
          await AuthLayerSvc.checkAuth(mockSettings);

          // then
          sinon.assert.calledWith(AuthLayerSvc.setLoggedIn, true);
          sinon.assert.calledWith(AuthLayerSvc.setUserInfo, {});
        });
      });
      it('events.onAuthSuccessful', async () => {
        AuthLayerSvc.idpProviderInstance = {
          settings: {}
        };
        const mockAuthData = 'luigiauthdata';
        const mockSettings = 'mocksettings';
        AuthHelpers.getStoredAuthData.returns(mockAuthData);
        AuthHelpers.isLoggedIn.returns(true);
        sinon.stub(AuthLayerSvc, 'setUserInfo');
        sinon.stub(AuthLayerSvc, 'setLoggedIn');

        // event if values
        LuigiConfig.getConfigValue.returns(() => {});
        AuthStoreSvc.isNewlyAuthorized.returns(true);
        // when
        await AuthLayerSvc.checkAuth(mockSettings);

        // then
        sinon.assert.calledWith(LuigiConfig.getConfigValue, 'auth.events.onAuthSuccessful');
        sinon.assert.calledOnce(AuthStoreSvc.removeNewlyAuthorized);
        sinon.assert.calledWith(LuigiAuth.handleAuthEvent, 'onAuthSuccessful', mockSettings, mockAuthData);
      });
      describe('expiration handling', () => {
        const mockAuthData = 'luigiauthdata';
        const mockSettings = 'mocksettings';
        beforeEach(() => {
          AuthHelpers.getStoredAuthData.returns(mockAuthData);
          AuthHelpers.isLoggedIn.returns(true);
          sinon.stub(AuthLayerSvc, 'setUserInfo');
          sinon.stub(AuthLayerSvc, 'setLoggedIn');
        });
        it('actions are being set', async () => {
          AuthLayerSvc.idpProviderInstance = {
            setTokenExpirationAction: sinon.stub(),
            setTokenExpireSoonAction: sinon.stub()
          };
          // when
          await AuthLayerSvc.checkAuth(mockSettings);

          // then
          sinon.assert.calledOnce(AuthLayerSvc.idpProviderInstance.setTokenExpirationAction);
          sinon.assert.calledOnce(AuthLayerSvc.idpProviderInstance.setTokenExpireSoonAction);
        });
      });
    });
  });
});
