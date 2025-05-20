import { IframeHelpers } from '../../src/utilities/helpers';
import { LuigiConfig, LuigiElements } from '../../src/core-api';
import { AuthLayerSvc } from '../../src/services';
import { EventListenerHelpers } from '../../src/utilities/helpers';
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;

describe('updateContextValues', () => {
  let sendMessageToIframeStub;
  let getMicrofrontendIframesStub;
  let querySelectorStub;

  beforeEach(() => {
    sendMessageToIframeStub = sinon.stub(IframeHelpers, 'sendMessageToIframe');
    getMicrofrontendIframesStub = sinon.stub(IframeHelpers, 'getMicrofrontendIframes');
    querySelectorStub = sinon.stub(document, 'querySelector');
  });

  afterEach(() => {
    sendMessageToIframeStub.restore();
    getMicrofrontendIframesStub.restore();
    querySelectorStub.restore();
  });

  it('should update context values correctly', () => {
    sinon.stub(IframeHelpers, 'applyCoreStateData').returns('{}');
    const mockIframe = {
      luigi: {
        _lastUpdatedMessage: {
          context: '{"parentNavigationContexts":[],"initCtx":"init ctx","test":"context"}',
          nodeParams: '{}',
          internal: '{}'
        }
      }
    };

    const mockVisibleIframes = [mockIframe];
    const mockCtx = { newContext: 'new context' };

    getMicrofrontendIframesStub.returns(mockVisibleIframes);

    LuigiConfig.updateContextValues(mockCtx);

    sinon.assert.calledOnce(getMicrofrontendIframesStub);
    sinon.assert.calledOnce(sendMessageToIframeStub);

    const expectedMessage = {
      msg: 'luigi.navigate',
      context: '{"parentNavigationContexts":[],"initCtx":"init ctx","test":"context","newContext":"new context"}',
      nodeParams: '{}',
      pathParams: '{}',
      searchParams: '{}',
      internal: '{}'
    };

    sinon.assert.calledWith(sendMessageToIframeStub, sinon.match.same(mockIframe), expectedMessage);
  });

  it('should not update context if there are no visible iframes or LUI web components', () => {
    getMicrofrontendIframesStub.returns([]);
    querySelectorStub.returns(null);

    const ctx = { test: 'context' };
    LuigiConfig.updateContextValues(ctx);

    sinon.assert.notCalled(sendMessageToIframeStub);
  });

  it('should update context property of luiWebComponents', () => {
    const mockContainer = document.createElement('div');
    mockContainer.className = 'wcContainer';

    const mockLuiWebComponents = [
      { context: { initialContext: 'initial' } },
      { context: { initialContext: 'initial' } }
    ];

    querySelectorStub.withArgs('.wcContainer').returns(mockContainer);

    sinon.stub(document, 'querySelectorAll').withArgs('[lui_web_component=true]').returns(mockLuiWebComponents);

    const newContext = { updatedContext: 'updated' };

    LuigiConfig.updateContextValues(newContext);

    sinon.assert.calledWith(querySelectorStub, '.wcContainer');
    sinon.assert.calledWith(document.querySelectorAll, '[lui_web_component=true]');

    mockLuiWebComponents.forEach((component) => {
      assert.deepEqual(component.context, { initialContext: 'initial', updatedContext: 'updated' });
    });
  });

  it('Luigi unload', () => {
    window.Luigi = {
      _store: {
        clear: sinon.spy()
      }
    };
    let containerStub = sinon.stub(LuigiElements, 'getLuigiContainer').returns({
      firstChild: {},
      removeChild: sinon.spy(function () {
        this.firstChild = null;
      })
    });
    let authUnloadStub = sinon.stub(AuthLayerSvc, 'unload');
    let removeAllListenersStub = sinon.stub(EventListenerHelpers, 'removeAllEventListeners');

    LuigiConfig.unload();
    sinon.assert.called(containerStub.returnValues[0].removeChild);
    sinon.assert.calledOnce(containerStub.returnValues[0].removeChild);
    sinon.assert.calledOnce(window.Luigi._store.clear);
    sinon.assert.calledOnce(authUnloadStub);
    sinon.assert.calledOnce(removeAllListenersStub);

    authUnloadStub.restore();
    removeAllListenersStub.restore();
    containerStub.restore();
  });
});
