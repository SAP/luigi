import { GenericHelpers } from '../../src/utilities/helpers';
import { LuigiConfig } from '../../src/core-api';

const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

import { AuthStoreSvc } from '../../src/services';

describe('AuthStore', () => {
  // this.retries(1);
  describe('Store fns', () => {
    let storeReturnValue = null;
    before(() => {
      function mockStorage() {
        return {
          getItem: function(key) {
            return JSON.stringify(storeReturnValue);
          }
        };
      }

      global['localStorage'] = mockStorage();
      global['sessionStorage'] = mockStorage();
    });
    beforeEach(() => {
      global['sessionStorage'] = {
        getItem: sinon.stub(),
        setItem: sinon.stub()
      };
      global['localStorage'] = {
        getItem: sinon.stub(),
        setItem: sinon.stub()
      };
      sinon.stub(AuthStoreSvc, 'getStorageType').returns('localStorage');
    });
    afterEach(() => {
      sinon.restore();
      storeReturnValue = null;
    });

    describe('_setStore', () => {
      xit('default: stores a value in localStorage', () => {
        const mockKey = 'mock.auth';
        const mockData = { key: 'something' };

        // ERROR opaque origins
        AuthStoreSvc._setStore(mockKey, mockData);

        sinon.assert.calledWithExactly(
          global.localStorage.setItem,
          mockKey,
          JSON.stringify(mockData)
        );
      });
      xit('sessionStorage: stores a value in sessionStorage', () => {
        // ERROR opaque origins
      });
      it('none: stores a value in the service', () => {
        const mockKey = 'mock.auth';
        const mockData = 'something';
        AuthStoreSvc.getStorageType.returns('none');

        // ERROR opaque origins
        AuthStoreSvc._setStore(mockKey, mockData);

        sinon.assert.notCalled(global.localStorage.setItem);
        assert.equal(AuthStoreSvc[mockKey], mockData);
      });
      it('invalid: shows console.error on wrong setting', () => {
        sinon.stub(console, 'error');
        const mockKey = 'mock.auth';
        const mockData = 'something';
        AuthStoreSvc.getStorageType.returns('invalid');

        // ERROR opaque origins
        AuthStoreSvc._setStore(mockKey, mockData);

        sinon.assert.calledOnce(console.error);
      });
    });
    describe('_getStore', () => {
      xit('default: localStorage', () => {
        // ERROR opaque origins
      });
      xit('sessionStorage', () => {
        AuthStoreSvc.getStorageType.returns('sessionStorage');
        // ERROR opaque origins
      });
      it('none: from memory', () => {
        AuthStoreSvc.getStorageType.returns('none');
        const mockKey = 'mock.auth';
        const mockData = 'something';
        AuthStoreSvc[mockKey] = mockData;

        // ERROR opaque origins
        const result = AuthStoreSvc._getStore(mockKey);

        sinon.assert.notCalled(global.localStorage.getItem);
        sinon.assert.notCalled(global.sessionStorage.getItem);
        assert.equal(result, mockData);
      });
      it('invalid: shows console.error on wrong setting', () => {
        sinon.stub(console, 'error');
        const mockKey = 'mock.auth';
        AuthStoreSvc.getStorageType.returns('invalid');

        // ERROR opaque origins
        AuthStoreSvc._getStore(mockKey);

        sinon.assert.calledOnce(console.error);
      });
    });
  });

  describe('Methods', () => {
    beforeEach(() => {
      sinon.stub(AuthStoreSvc, '_setStore');
      sinon.stub(AuthStoreSvc, '_getStore');
    });
    afterEach(() => {
      sinon.restore();
    });
    describe('getStorageKey', () => {
      it('retrieves the internal key', () => {
        assert.equal(AuthStoreSvc.getStorageKey(), 'luigi.auth');
      });
    });
    describe('getStorageType', () => {
      beforeEach(() => {
        AuthStoreSvc._storageType = undefined;
        sinon.stub(LuigiConfig, 'getConfigValue');
      });
      it('no config', () => {
        assert.equal(AuthStoreSvc.getStorageType(), 'localStorage');
        sinon.assert.calledOnce(LuigiConfig.getConfigValue);
      });
      it('config defined', () => {
        LuigiConfig.getConfigValue.returns('sessionStorage');
        assert.equal(AuthStoreSvc.getStorageType(), 'sessionStorage');
        sinon.assert.calledOnce(LuigiConfig.getConfigValue);
      });
      it('subsequent calls with cached config value', () => {
        AuthStoreSvc._storageType = 'localStorage';
        assert.equal(AuthStoreSvc.getStorageType(), 'localStorage');
        assert.equal(AuthStoreSvc.getStorageType(), 'localStorage');
        sinon.assert.notCalled(LuigiConfig.getConfigValue);
      });
    });
    describe('storageKey and -type based methods', () => {
      beforeEach(() => {
        sinon.stub(AuthStoreSvc, 'getStorageKey').returns('luigi.auth');
        sinon.stub(AuthStoreSvc, 'getStorageType').returns('localStorage');
      });
      afterEach(() => {
        sinon.restore();
      });

      describe('getAuthData', () => {
        it('calls the store with the internal storage key', () => {
          const mockKey = 'some.key';
          AuthStoreSvc.getStorageKey.returns(mockKey);

          AuthStoreSvc.getAuthData();

          sinon.assert.calledWithExactly(AuthStoreSvc._getStore, mockKey);
        });
      });
      describe('setAuthData', () => {});
      describe('removeAuthData', () => {});
      describe('isNewlyAuthorized', () => {});
      describe('setNewlyAuthorized', () => {});
      describe('removeNewlyAuthorized', () => {});
    });
  });
  // describe('current locale', () => {
  //   it('should return default locale', () => {
  //     const locale = LuigiI18N.getCurrentLocale();
  //     assert.equal(locale, 'en');
  //   });

  //   it('should return previously set locale', () => {
  //     global.sessionStorage.getItem.returns('mock-locale');
  //     const locale = LuigiI18N.getCurrentLocale();
  //     assert.equal(locale, 'mock-locale');
  //   });

  //   it('sets locale', () => {
  //     sinon.stub(LuigiI18N, '_notifyLocaleChange');
  //     LuigiI18N.setCurrentLocale('de');
  //     sinon.assert.calledWithExactly(
  //       global.sessionStorage.setItem,
  //       'luigi.currentLocale',
  //       'de'
  //     );
  //     sinon.assert.calledWithExactly(LuigiI18N._notifyLocaleChange, 'de');
  //   });

  //   it('should not set empty locale', () => {
  //     sinon.stub(LuigiI18N, '_notifyLocaleChange');
  //     LuigiI18N.setCurrentLocale('');
  //     sinon.assert.notCalled(global.sessionStorage.setItem);
  //     sinon.assert.notCalled(LuigiI18N._notifyLocaleChange);
  //   });
  // });
});
