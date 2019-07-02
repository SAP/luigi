const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

import { LuigiI18N } from '../../src/core-api';

describe('I18N', () => {
  before(() => {
    const storage = new Map();
    function mockStorage() {
      return {
        getItem: function(key) {
          return storage.get(key);
        },
        setItem: function(key, value) {
          storage.set(key, value);
        },
        removeItem: function(key) {
          return storage.delete(key);
        },
        clear: function() {
          return storage.clear();
        }
      };
    }
    global['sessionStorage'] = mockStorage();
  });
  describe('current locale', () => {
    it('should return default locale', async () => {
      const locale = LuigiI18N.getCurrentLocale();

      assert.equal(locale, 'en');
    });

    it('should return previously set locale', async () => {
      LuigiI18N.setCurrentLocale('de');
      const locale = LuigiI18N.getCurrentLocale();

      assert.equal(locale, 'de');
    });

    it('should not set empty locale', async () => {
      LuigiI18N.setCurrentLocale('de');
      let locale = LuigiI18N.getCurrentLocale();

      assert.equal(locale, 'de');

      LuigiI18N.setCurrentLocale('');

      assert.equal(locale, 'de');
    });
  });

  describe('current locale listeners', () => {
    it('should be notified by locale change', async () => {
      let notified = false;
      let newLocale = '';
      const listener = l => {
        notified = true;
        newLocale = l;
      };
      LuigiI18N.addCurrentLocaleChangeListener(listener);
      LuigiI18N.setCurrentLocale('pl');

      assert.equal(notified, true);
      assert.equal(newLocale, 'pl');
    });

    it('should not be notified by locale change after de-registering', async () => {
      let notified = false;
      let newLocale = '';
      const listener = l => {
        notified = true;
        newLocale = l;
      };
      LuigiI18N.addCurrentLocaleChangeListener(listener);
      LuigiI18N.setCurrentLocale('pl');

      assert.equal(notified, true);
      assert.equal(newLocale, 'pl');
      notified = false;
      newLocale = '';

      LuigiI18N.removeCurrentLocaleChangeListener(listener);
      LuigiI18N.setCurrentLocale('hu');

      assert.equal(notified, false);
      assert.equal(newLocale, '');
    });
  });
});
