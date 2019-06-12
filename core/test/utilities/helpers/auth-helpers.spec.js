const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

const GenericHelpers = require('../../../src/utilities/helpers/generic-helpers');
import { AuthHelpers } from '../../../src/utilities/helpers/auth-helpers';
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

  describe('parseUrlAuthErrors', () => {
    it('returns complete error object', () => {
      sinon
        .stub(GenericHelpers, 'getUrlParameter')
        .onFirstCall()
        .returns('mockError')
        .onSecondCall()
        .returns('an error description');

      const err = AuthHelpers.parseUrlAuthErrors();
      assert.equal(err.error, 'mockError');
      assert.equal(err.errorDescription, 'an error description');

      GenericHelpers.getUrlParameter.restore();
    });

    it('returns only error without description', () => {
      sinon
        .stub(GenericHelpers, 'getUrlParameter')
        .onFirstCall()
        .returns('mockError')
        .onSecondCall()
        .returns(undefined);

      const err = AuthHelpers.parseUrlAuthErrors();
      assert.equal(err.error, 'mockError');
      assert.equal(err.errorDescription, undefined);

      GenericHelpers.getUrlParameter.restore();
    });

    it('without error', () => {
      sinon
        .stub(GenericHelpers, 'getUrlParameter')
        .onFirstCall()
        .returns(undefined)
        .onSecondCall()
        .returns(undefined);

      assert.equal(AuthHelpers.parseUrlAuthErrors(), undefined);

      GenericHelpers.getUrlParameter.restore();
    });
  });

  describe('handleUrlAuthErrors', () => {
    beforeEach(() => {
      sinon.spy(LuigiAuth, 'handleAuthEvent');
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
      await AuthHelpers.handleUrlAuthErrors(
        mockProviderInstanceSettings,
        'mockError'
      );
      assert.isTrue(LuigiAuth.handleAuthEvent.calledOnce);
    });

    it('with error and error param', async () => {
      const error = 'mockError';
      const errorDescription = 'An error description';

      await AuthHelpers.handleUrlAuthErrors(
        mockProviderInstanceSettings,
        error,
        errorDescription
      );

      assert.isTrue(LuigiAuth.handleAuthEvent.calledOnce, 'called once');
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
          error,
        'called with valid data'
      );
    });
  });
});
