import { GenericHelpers } from '../../src/utilities/helpers';
import { config } from '../../src/core-api/config';

const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

import { LuigiI18N } from '../../src/core-api';
import { LuigiConfig } from '../../src/core-api';

describe('I18N', function() {
  this.retries(5);

  beforeEach(() => {
    global['sessionStorage'] = {
      getItem: sinon.stub(),
      setItem: sinon.stub()
    };
    sinon.stub(config, 'getConfig');
    sinon.stub(config, 'setConfig');
  });
  afterEach(() => {
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
      sinon.stub(LuigiI18N, '_notifyLocaleChange');
      LuigiI18N.setCurrentLocale('de');
      sinon.assert.calledWithExactly(
        global.sessionStorage.setItem,
        'luigi.currentLocale',
        'de'
      );
      sinon.assert.calledWithExactly(LuigiI18N._notifyLocaleChange, 'de');
    });

    it('should not set empty locale', () => {
      sinon.stub(LuigiI18N, '_notifyLocaleChange');
      LuigiI18N.setCurrentLocale('');
      sinon.assert.notCalled(global.sessionStorage.setItem);
      sinon.assert.notCalled(LuigiI18N._notifyLocaleChange);
    });
  });

  describe('current locale listeners', () => {
    it('does not add listener when it is not a function', () => {
      sinon.stub(GenericHelpers, 'isFunction').returns(false);
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
      sinon.stub(GenericHelpers, 'isFunction').returns(true);
      sinon.stub(GenericHelpers, 'getRandomId').returns(123);
      const mockListener = () => 'mock-method';
      const listenerId = LuigiI18N.addCurrentLocaleChangeListener(mockListener);
      sinon.assert.calledWithExactly(GenericHelpers.isFunction, mockListener);
      sinon.assert.calledWithExactly(GenericHelpers.getRandomId);
      assert.equal(LuigiI18N.listeners[123], mockListener);
      assert.equal(listenerId, 123);
    });

    it('remove a listener', () => {
      LuigiI18N.listeners[123] = () => {};
      LuigiI18N.removeCurrentLocaleChangeListener(123);
      assert.equal(LuigiI18N.listeners[123], undefined);
    });

    it('does not remove a listener when called with a wrong id', () => {
      const listener = () => {};
      LuigiI18N.listeners[123] = listener;
      LuigiI18N.removeCurrentLocaleChangeListener(456);
      assert.equal(LuigiI18N.listeners[123], listener);
    });

    it('should be notified by locale change', () => {
      LuigiI18N.listeners = {
        id1: sinon.stub(),
        id2: sinon.stub(),
        id3: sinon.stub()
      };
      LuigiI18N._notifyLocaleChange('pl');
      sinon.assert.calledWithExactly(LuigiI18N.listeners.id1, 'pl');
      sinon.assert.calledWithExactly(LuigiI18N.listeners.id2, 'pl');
      sinon.assert.calledWithExactly(LuigiI18N.listeners.id3, 'pl');
      sinon.assert.called(config.getConfig);
      sinon.assert.called(config.setConfig);
    });
  });

  describe('custom translation', () => {
    let mockConfig;
    //custom config
    let luigi = {
      en: {
        tets: 'tests'
      },
      de: {
        project: 'luigi'
      },
      luigi: {
        it: {
          da: 'Toni'
        }
      }
    };
    const getMockConfig = () => ({
      getTranslation: (key, interpolations, locale) => {
        if (luigi[locale]) {
          return luigi[locale][key];
        }
      }
    });
    beforeEach(() => {
      mockConfig = getMockConfig();
    });

    it('_initCustomImplementation: get custom translation from config', () => {
      sinon.stub(LuigiConfig, 'getConfigValue').returns(mockConfig);
      LuigiI18N._initCustomImplementation();
      assert.equal(LuigiI18N.translationImpl, mockConfig);
    });

    it('findTranslation test', () => {
      sinon.stub(Object, 'hasOwnProperty').returns(true);
      const translationTable = {
        luigi: {
          luigiModal: {
            header: 'Luigi status modal',
            body: {
              error: 'Luigi is sad!',
              success: 'Luigi is happy!'
            }
          },
          button: {
            dismiss: 'no',
            confirm: 'yes'
          }
        }
      };
      LuigiI18N.translationTable = translationTable;
      assert.equal(
        LuigiI18N.findTranslation(
          'luigi.luigiModal.body.success',
          LuigiI18N.translationTable
        ),
        'Luigi is happy!'
      );
      assert.equal(
        LuigiI18N.findTranslation(
          'luigi.button.confirm',
          LuigiI18N.translationTable
        ),
        'yes'
      );
    });

    it('custom translation test', () => {
      LuigiI18N.translationImpl = mockConfig;
      assert.equal(LuigiI18N.getTranslation('tets', null, 'en'), 'tests');
      assert.equal(LuigiI18N.getTranslation('project', null, 'de'), 'luigi');

      LuigiI18N.translationImpl = null;
      LuigiI18N.translationTable = luigi;
      assert.equal(LuigiI18N.getTranslation('tets'), 'tets');
      assert.equal(LuigiI18N.getTranslation('luigi.it.da'), 'Toni');
      // //not matching key
      assert.equal(
        LuigiI18N.getTranslation('luigi.de.project'),
        'luigi.de.project'
      );
    });
  });
});
