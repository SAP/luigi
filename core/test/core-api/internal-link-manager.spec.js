import { GenericHelpers } from '../../src/utilities/helpers';

const sinon = require('sinon');

import { linkManager } from '../../src/core-api/_internalLinkManager';

let lm;

describe('linkManager', function() {
  beforeEach(() => {
    lm = new linkManager();
  });

  afterEach(() => {
    sinon.reset();
    sinon.restore();
  });

  describe('navigate', () => {
    beforeEach(() => {
      sinon.stub(lm, 'sendPostMessageToLuigiCore');
      console.warn = sinon.spy();
    });

    // it('should not open a drawer if path is absolute', () => {
    //   lm.openAsDrawer('/');

    //   sinon.assert.notCalled(lm.sendPostMessageToLuigiCore);
    //   sinon.assert.calledOnce(console.warn);
    // });
    // it('should not open a modal if path is absolute', () => {
    //   lm.openAsModal('/');

    //   sinon.assert.notCalled(lm.sendPostMessageToLuigiCore);
    //   sinon.assert.calledOnce(console.warn);
    // });

    it('should navigate if path starts with a "/" but is not an absolute path', () => {
      lm.navigate('/pr1');

      sinon.assert.calledOnce(lm.sendPostMessageToLuigiCore);
    });

    // it('should not navigate if errorSkipNavigation is true', () => {
    //   lm.options.errorSkipNavigation = true;
    //   lm.navigate('http://google.co');

    //   sinon.assert.notCalled(lm.sendPostMessageToLuigiCore);
    //   sinon.assert.match(lm.options.errorSkipNavigation, false);
    // });

    it('should call sendPostMessageToLuigiCore', () => {
      this.options = {
        preserveView: false,
        nodeParams: {},
        errorSkipNavigation: false,
        fromContext: null,
        fromClosestContext: false,
        relative: false,
        link: ''
      };
      const modalSettings = { modalSetting: 'modalValue' };
      const splitViewSettings = { splitViewSetting: 'splitViewValue' };
      const drawerSettings = { drawerSetting: 'drawerValue' };
      const path = '/path';
      const relativePath = path[0] !== '/';
      const navigationOpenMsg = {
        msg: 'luigi.navigation.open',
        params: Object.assign(this.options, {
          link: path,
          relative: relativePath,
          modal: modalSettings,
          splitView: splitViewSettings,
          drawer: drawerSettings
        })
      };

      lm.navigate(path, true, modalSettings, splitViewSettings, drawerSettings);
      lm.sendPostMessageToLuigiCore.calledOnceWithExactly(navigationOpenMsg);
    });

    it('should call sendPostMessageToLuigiCore with Promise', () => {
      this.options = {
        preserveView: false,
        nodeParams: {},
        errorSkipNavigation: false,
        fromContext: null,
        fromClosestContext: false,
        relative: false,
        link: ''
      };
      const remotePromise = GenericHelpers.createRemotePromise();
      const modalSettings = { modalSetting: 'modalValue' };
      const splitViewSettings = { splitViewSetting: 'splitViewValue' };
      const drawerSettings = { drawerSetting: 'drawerValue' };
      const path = '/path';
      const relativePath = path[0] !== '/';
      const navigationOpenMsg = {
        msg: 'luigi.navigation.open',
        params: Object.assign(this.options, {
          link: path,
          relative: relativePath,
          modal: modalSettings,
          splitView: splitViewSettings,
          drawer: drawerSettings
        }),
        remotePromiseId: remotePromise.id
      };

      lm.navigate(path, true, modalSettings, splitViewSettings, drawerSettings);
      lm.sendPostMessageToLuigiCore.calledOnceWithExactly(navigationOpenMsg);
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
    it('should assign passed value to this.options.nodeParams', () => {
      lm.withParams({ param: 'value' });

      sinon.assert.match(lm.options.nodeParams, { param: 'value' });
    });
  });

  describe('goBack', () => {
    beforeEach(() => {
      sinon.stub(lm, 'sendPostMessageToLuigiCore');
    });

    it('should call sendPostMessageToLuigiCore', () => {
      const goBackValue = 'message';
      const message = {
        msg: 'luigi.navigation.back',
        goBackContext: '"message"'
      };

      lm.goBack(goBackValue);

      sinon.assert.calledOnceWithExactly(lm.sendPostMessageToLuigiCore, message);
    });
  });

  describe('sendPostMessageToLuigiCore', () => {
    beforeEach(() => {
      sinon.stub(window, 'postMessage');
    });

    it('should call window.postMessage with the msg', () => {
      const msg = 'message';

      lm.sendPostMessageToLuigiCore(msg);

      sinon.assert.calledOnceWithExactly(window.postMessage, msg, '*');
    });
  });
});
