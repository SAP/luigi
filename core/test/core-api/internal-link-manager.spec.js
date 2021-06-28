const sinon = require('sinon');

import { linkManager } from '../../src/core-api/_internalLinkManager';

let lm;

describe('linkManager', function() {
  beforeEach(() => {
    lm = new linkManager();
    sinon.stub(lm, 'sendPostMessageToLuigiCore');
    window.Luigi['hasBack'] = sinon.spy();
  });

  afterEach(() => {
    sinon.reset();
    sinon.restore();
  });

  describe('navigate', () => {
    it('should not navigate if path is absolute', () => {
      // debugger;
      console.warn = sinon.spy();

      lm.navigate('/');

      sinon.assert.notCalled(lm.sendPostMessageToLuigiCore);
      sinon.assert.calledOnce(console.warn);
    });

    it('should not navigate if errorSkipNavigation is true', () => {
      console.warn = sinon.spy();

      lm.navigate('http://google.co');

      sinon.assert.calledOnce(lm.sendPostMessageToLuigiCore);
      sinon.assert.notCalled(console.warn);
    });
  });

  describe('openAsModal', () => {
    beforeEach(() => {
      sinon.stub(lm, 'navigate');
    });

    it('calls navigate', () => {
      lm.openAsModal('path');

      sinon.assert.calledOnce(lm.navigate);
    });
  });

  describe('openAsDrawer', () => {
    beforeEach(() => {
      sinon.stub(lm, 'navigate');
    });

    it('calls navigate', () => {
      lm.openAsDrawer('path');

      sinon.assert.calledOnce(lm.navigate);
    });
  });

  describe('fromContext', () => {
    beforeEach(() => {
      sinon.stub(lm, 'fromContext');
    });

    it('should set fromContext option to passed parameter navigationContext', () => {
      const navigationContext = '';

      lm.fromContext(navigationContext);

      sinon.assert.calledOnce(lm.fromContext);
    });
  });

  describe('fromClosestContext', () => {
    it('should set fromContext to null and fromClosestContext to true', () => {
      lm.fromClosestContext();

      sinon.assert.match(lm.options.fromContext, null);
      sinon.assert.match(lm.options.fromClosestContext, true);
    });
  });

  describe('fromVirtualTreeRoot', () => {
    beforeEach(() => {
      // sinon.stub(lm, 'fromVirtualTreeRoot');
    });

    it('should set fromContext to null', () => {
      lm.fromVirtualTreeRoot();

      sinon.assert.match(lm.options.fromContext, null);
    });

    it('should set fromClosestContext to false', () => {
      lm.fromVirtualTreeRoot();

      sinon.assert.match(lm.options.fromClosestContext, false);
    });

    it('should set fromVirtualTreeRoot to true', () => {
      lm.fromVirtualTreeRoot();

      sinon.assert.match(lm.options.fromVirtualTreeRoot, true);
    });
  });

  describe('withParams', () => {
    beforeEach(() => {
      sinon.stub(lm, 'withParams');
    });

    it('should ', () => {});
  });

  describe('pathExists', () => {
    beforeEach(() => {
      // sinon.stub(lm, 'pathExists');
      sinon.stub(console, 'error');
    });

    it('should log error if Luigi.pathExists is not a function', () => {
      lm.pathExists('/pr1');

      sinon.assert.calledOnce(console.error);
    });
  });

  // describe('hasBack', () => {
  //   beforeEach(() => {
  //     // sinon.stub(window.Luigi, 'hasBack');
  //   });

  //   it('should ', () => {
  //     debugger;
  //     lm.hasBack();
  //     sinon.assert.calledOnce(lm.hasBack);
  //   });
  // });

  // describe('goBack', () => {
  //   beforeEach(() => {
  //     sinon.spy(window.Luigi, 'hasBack');
  //   });

  //   it('should call Luigi.hasBack', () => {

  //   });
  // });

  // describe('sendPostMessageToLuigiCore', () => {
  //   beforeEach(() => {
  //     sinon.spy(window, 'postMessage');
  //   });

  //   it('should call window.postMessage with the msg', () => {
  //     const msg = 'message';
  //     debugger;

  //     lm.sendPostMessageToLuigiCore(msg);

  //     sinon.assert.calledOnceWithExactly(window.postMessage, msg, '*')
  //   });
  // });
});
