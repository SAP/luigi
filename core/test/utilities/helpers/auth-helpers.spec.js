const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

const GenericHelpers = require('../../../src/utilities/helpers/generic-helpers');
const AuthHelpers = require('../../../src/utilities/helpers/auth-helpers');
const LuigiAuth = require('../../../src/core-api').LuigiAuth;

describe('Auth-helpers', () => {
  let windowLocationImplementation;
  beforeEach(() => {
    windowLocationImplementation = window.location;
    delete window.location;
    window.location = {
      search: function() {
        return '';
      }
    };
  });
  afterEach(() => {
    window.location = windowLocationImplementation;
  });

  describe('handleUrlAuthErrors', () => {
    beforeEach(() => {
      sinon.stub(LuigiAuth, 'handleAuthEvent');
    });
    afterEach(() => {
      sinon.restore();
    });

    const mockProviderInstanceSettings = {
      logoutUrl: 'http://auth.luigi.domain/api/logout',
      post_logout_redirect_uri: 'http://luigi.domain/logout.html'
    };

    it('without error', async () => {
      assert.isTrue(await AuthHelpers.handleUrlAuthErrors({}));
      assert.isTrue(LuigiAuth.handleAuthEvent.notCalled);
    });

    it('with error param', async () => {
      sinon
        .stub(GenericHelpers, 'getUrlParameter')
        .onFirstCall()
        .returns('mockError')
        .onSecondCall()
        .returns(undefined);

      await AuthHelpers.handleUrlAuthErrors(mockProviderInstanceSettings);
      assert.isTrue(LuigiAuth.handleAuthEvent.calledOnce);
      GenericHelpers.getUrlParameter.reset();
    });

    it('with error and error param', async () => {
      const error = 'mockError';
      const errorDescription = 'An error description';
      sinon
        .stub(GenericHelpers, 'getUrlParameter')
        .onFirstCall()
        .returns(error)
        .onSecondCall()
        .returns(errorDescription);

      await AuthHelpers.handleUrlAuthErrors(mockProviderInstanceSettings);
      assert.isTrue(LuigiAuth.handleAuthEvent.calledOnce);
      assert.isTrue(
        LuigiAuth.handleAuthEvent.calledWith(
          'onAuthError',
          mockProviderInstanceSettings,
          { error, errorDescription },
          mockProviderInstanceSettings.logoutUrl +
            '?post_logout_redirect_uri=' +
            mockProviderInstanceSettings.post_logout_redirect_uri +
            '&error=' +
            error +
            '&errorDescription=' +
            error
        )
      );
      GenericHelpers.getUrlParameter.reset();
    });
  });
});
