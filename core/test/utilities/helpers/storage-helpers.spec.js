const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { StorageHelper } from '../../../src/utilities/helpers';
import 'mock-local-storage'


describe('Storage-helpers', () => {

  describe('process', () => {
    let microfrontendId='mockMicroId';
    let hostname= 'luigi.core.test';
    let key = 'key_';
    let value = "value_";


    beforeEach(() => {
      key = 'key_' + Math.random();
      value = 'value_' + Math.random();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('setItem', () => {
      let id = 'messageId';
      StorageHelper.process(microfrontendId, hostname, id, 'setItem', { key, value })

      let luigiKey = "Luigi#"+hostname + "#"+key;
      assert.exists(window.localStorage.getItem(luigiKey), "Luigi key does not exist!");
      assert.equal(window.localStorage.getItem(luigiKey), value, "Luigi value is different");
    });

  });


});
