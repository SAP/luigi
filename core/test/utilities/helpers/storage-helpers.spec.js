const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { IframeHelpers, StorageHelper } from '../../../src/utilities/helpers';
import 'mock-local-storage'


describe('Storage-helpers', () => {
  describe('process', () => {
    let microfrontendId='mockMicroId';
    let hostname= 'luigi.core.test';
    let key = 'key_';
    let value = "value_";
    let id = 'messageId_';
    let sendBackOperationSpy;
    let sendMessageToIframeSpy;
    const buildLuigiKey = () =>{
      return "Luigi#"+hostname + "#"+key;
    }
    const assertSendMessage = (status, result) => {
      assert(sendBackOperationSpy.calledOnce);
      let args = sendBackOperationSpy.getCalls()[0].args
      assert(sendBackOperationSpy.calledOnce);
      assert.equal(args[0], microfrontendId, "sendBackOperation argument microfrontendId is different from  expected");
      assert.equal(args[1], id, "sendBackOperation argument id is different from  expected");
      assert.equal(args[2], status, "sendBackOperation argument status is different from  expected");
      if (!result){
        assert.isTrue(!args[3], "sendBackOperation argument result shuld be undefined for this operation");
        return ;
      }
      if (Array.isArray(result)){
        assert.deepEqual(args[3], result, "sendBackOperation argument result is different from  expected");
        return;
      }
      assert.equal(args[3], result, "sendBackOperation argument result is different from  expected");
    }

    const assertsendMessageToIframe = () => {
      assert(sendMessageToIframeSpy.calledOnce);
    }

    beforeEach(() => {
      key = 'key_' + Math.random();
      value = 'value_' + Math.random();
      id = 'messageId_' + Math.random();
      sendBackOperationSpy = sinon.spy(StorageHelper, 'sendBackOperation');
      sendMessageToIframeSpy = sinon.spy(IframeHelpers, 'sendMessageToIframe');
      sinon.stub(IframeHelpers, "getMicrofrontendsInDom").callsFake(() => [{ id: microfrontendId, container: {} }]);
      window.localStorage.clear();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('setItem', () => {
      StorageHelper.process(microfrontendId, hostname, id, 'setItem', { key, value })
      let luigiKey = buildLuigiKey();
      assert.equal(window.localStorage.getItem(luigiKey), value, "Luigi value is different for setItem");
      assertSendMessage("OK", undefined);
      assertsendMessageToIframe();
    });

    it('getItem', () => {
      let luigiKey = buildLuigiKey();
      window.localStorage.setItem(luigiKey, value);
      StorageHelper.process(microfrontendId, hostname, id, 'getItem', { key })
      assertSendMessage("OK", value);
      assertsendMessageToIframe();
    });

    it('getItem no value', () => {
      StorageHelper.process(microfrontendId, hostname, id, 'getItem', { key })
      assertSendMessage("OK", undefined);
      assertsendMessageToIframe();
    });

    it('has', () => {
      let luigiKey = buildLuigiKey();
      window.localStorage.setItem(luigiKey, value);
      StorageHelper.process(microfrontendId, hostname, id, 'has', { key })
      assertSendMessage("OK", true);
      assertsendMessageToIframe();
    });

    it('has no value', () => {
      StorageHelper.process(microfrontendId, hostname, id, 'has', { key })
      assertSendMessage("OK", false);
      assertsendMessageToIframe();
    });


    it('clear', () => {
      let luigiKey = buildLuigiKey();
      window.localStorage.setItem(luigiKey, value);
      StorageHelper.process(microfrontendId, hostname, id, 'clear', { })
      assert.isTrue(!window.localStorage.getItem(luigiKey), "After clear, item should not be present");
      assertSendMessage("OK", undefined);
      assertsendMessageToIframe();
    });

    it('removeItem', () => {
      let luigiKey = buildLuigiKey();
      window.localStorage.setItem(luigiKey, value);
      StorageHelper.process(microfrontendId, hostname, id, 'removeItem', { key })
      assert.isTrue(!window.localStorage.getItem(luigiKey), "After removed, item should not be present");
      assertSendMessage("OK", value);
      assertsendMessageToIframe();
    });

    it('removeItem no value', () => {
      StorageHelper.process(microfrontendId, hostname, id, 'removeItem', { key })
      assertSendMessage("OK", undefined);
      assertsendMessageToIframe();
    });

    it('getAllKeys', () => {
      let luigiKey = buildLuigiKey();
      window.localStorage.setItem(luigiKey, value);
      StorageHelper.process(microfrontendId, hostname, id, 'getAllKeys', {  })
      assertSendMessage("OK", [key]);
      assertsendMessageToIframe();
    });

  });

});


