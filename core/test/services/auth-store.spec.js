import { GenericHelpers } from '../../src/utilities/helpers';
import { config } from '../../src/core-api/config';

const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

import { LuigiAuth } from '../../src/core-api';
import { LuigiConfig } from '../../src/core-api';

describe('Auth Store', function() {
  this.retries(1);

  beforeEach(() => {
    global['sessionStorage'] = {
      getItem: sinon.stub(),
      setItem: sinon.stub()
    };
    global['localStorage'] = {
      getItem: sinon.stub(),
      setItem: sinon.stub()
    };
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('current locale', () => {
    it('should return default locale', () => {
      const locale = LuigiI18N.getCurrentLocale();
      assert.equal(locale, 'en');
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
