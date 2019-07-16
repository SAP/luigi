import { GenericHelpers } from '../../src/utilities/helpers';

const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

import { LuigiI18N } from '../../src/core-api';

describe('I18N', () => {
  beforeEach(() => {
    global['sessionStorage'] = {
      getItem: sinon.stub(),
      setItem: sinon.stub()
    };
  });
  beforeEach(() => {
    sinon.restore();
  });

  describe('current locale', () => {
    it('should return default locale', () => {
      const locale = LuigiI18N.getCurrentLocale();
      assert.equal(locale, 'en');
    });

    it('should return previously set locale', () => {
      global.sessionStorage.getItem.returns('mock-locale');
      const locale = LuigiI18N.getCurrentLocale();
      assert.equal(locale, 'mock-locale');
    });

    it('sets locale', () => {
      sinon.stub(LuigiI18N, 'notifyLocaleChange');
      LuigiI18N.setCurrentLocale('de');
      sinon.assert.calledWithExactly(
        global.sessionStorage.setItem,
        'luigi.currentLocale',
        'de'
      );
      sinon.assert.calledWithExactly(LuigiI18N.notifyLocaleChange, 'de');
    });

    it('should not set empty locale', () => {
      sinon.stub(LuigiI18N, 'notifyLocaleChange');
      LuigiI18N.setCurrentLocale('');
      sinon.assert.notCalled(global.sessionStorage.setItem);
      sinon.assert.notCalled(LuigiI18N.notifyLocaleChange);
    });
  });

  describe('current locale listeners', () => {
    it('does not add listener when it is not a function', () => {
      sinon.stub(GenericHelpers, 'isFunction').callsFake(fnOrNot => false);
      const listenerId = LuigiI18N.addCurrentLocaleChangeListener(
        'mock-listener'
      );
      sinon.assert.calledWithExactly(
        GenericHelpers.isFunction,
        'mock-listener'
      );
      assert.equal(Object.getOwnPropertyNames(LuigiI18N.listeners).length, 0);
      assert.equal(listenerId, undefined);
    });

    it('add listener when it is a function', () => {
      sinon.stub(GenericHelpers, 'isFunction').callsFake(fnOrNot => true);
      sinon.stub(GenericHelpers, 'getRandomId').callsFake(() => 123);
      const mockListener = () => 'mock-method';
      const listenerId = LuigiI18N.addCurrentLocaleChangeListener(mockListener);
      sinon.assert.calledWithExactly(GenericHelpers.isFunction, mockListener);
      sinon.assert.calledWithExactly(GenericHelpers.getRandomId);
      assert.equal(LuigiI18N.listeners[123], mockListener);
      assert.equal(listenerId, 123);
    });

    it('remove a listener', () => {
      LuigiI18N.listeners[123] = () => {};
      const listenerId = LuigiI18N.removeCurrentLocaleChangeListener(123);
      assert.equal(LuigiI18N.listeners[123], undefined);
    });

    it('does not remove a listener when called with a wrong id', () => {
      const listener = () => {};
      LuigiI18N.listeners[123] = listener;
      const listenerId = LuigiI18N.removeCurrentLocaleChangeListener(456);
      assert.equal(LuigiI18N.listeners[123], listener);
    });

    it('should be notified by locale change', () => {
      sinon.stub(GenericHelpers, 'isFunction').callsFake(fnOrNot => true);
      sinon.stub(GenericHelpers, 'getRandomId').callsFake(() => 123);
      let notified = false;
      let newLocale = '';
      const listener = l => {
        notified = true;
        newLocale = l;
      };
      const listenerId = LuigiI18N.addCurrentLocaleChangeListener(listener);
      sinon.assert.calledWithExactly(GenericHelpers.isFunction, listener);
      sinon.assert.calledWithExactly(GenericHelpers.getRandomId);
      LuigiI18N.setCurrentLocale('pl');
      assert.equal(notified, true);
      assert.equal(newLocale, 'pl');
    });
  });
});
