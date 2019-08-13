const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { afterEach } from 'mocha';

import { SplitViewSvc } from '../../src/services';
import {
  GenericHelpers,
  IframeHelpers,
  RoutingHelpers
} from '../../src/utilities/helpers';
import { Navigation } from '../../src/navigation/services/navigation';
import { LuigiConfig, LuigiElements } from '../../src/core-api';

describe('SplitViewSvc', () => {
  let node;
  let component;
  let preloadingAllowed;

  beforeEach(() => {
    let lastObj = {};
    component = {
      set: obj => {
        Object.assign(lastObj, obj);
      },
      get: () => lastObj,
      prepareInternalData: () => {}
    };

    sinon.stub(component, 'set').callThrough();
    sinon.stub(component, 'get').callThrough();
    sinon.stub(LuigiConfig);
    sinon.stub(LuigiElements);
    sinon.stub(RoutingHelpers);
    sinon.stub(IframeHelpers);
    sinon.stub(GenericHelpers);
    sinon.stub(Navigation);
    sinon.stub(document, 'querySelector');
  });

  afterEach(() => {
    if (document.querySelector.restore) {
      document.querySelector.restore();
    }
    sinon.restore();
  });

  describe('elements', () => {
    const mockElem = 'some-div';
    beforeEach(() => {
      sinon.stub(document, 'getElementById').returns(mockElem);
    });
    afterEach(() => {
      if (document.getElementById.restore) {
        document.getElementById.restore();
      }
    });
    it('getContainer()', () => {
      const res = SplitViewSvc.getContainer();

      sinon.assert.calledWith(document.getElementById, 'splitViewContainer');
      assert.equal(res, mockElem);
    });
    it('getDragger()', () => {
      const res = SplitViewSvc.getDragger();

      sinon.assert.calledWith(document.getElementById, 'splitViewDragger');
      assert.equal(res, mockElem);
    });
    it('getDraggerBackdrop()', () => {
      const res = SplitViewSvc.getDraggerBackdrop();

      sinon.assert.calledWith(
        document.getElementById,
        'splitViewDraggerBackdrop'
      );
      assert.equal(res, mockElem);
    });
  });
  it('getDefaultData', () => {
    assert.deepEqual(SplitViewSvc.getDefaultData(), {
      mfSplitView: {
        displayed: false,
        settings: {}
      }
    });
  });

  describe('setIframe', () => {
    it('without viewUrl', () => {
      const frame = { frame: 1 };
      const splitFrame = { frame: 2 };
      document.querySelector.returns({ appendChild: sinon.spy() });
      IframeHelpers.createIframe.returns(splitFrame);

      const res = SplitViewSvc.setIframe(null, 'componentData', component);

      sinon.assert.calledWith(IframeHelpers.createIframe, null);
      sinon.assert.notCalled(RoutingHelpers.substituteViewUrl);
      assert.deepEqual(res, splitFrame);
    });

    it('with viewUrl', () => {
      const frame = { frame: 1 };
      const splitFrame = { frame: 2 };
      document.querySelector.returns({ appendChild: sinon.spy() });
      IframeHelpers.createIframe.returns(splitFrame);
      RoutingHelpers.substituteViewUrl.returns('otherUrl');

      const res = SplitViewSvc.setIframe('viewUrl', 'componentData', component);

      sinon.assert.calledWith(
        RoutingHelpers.substituteViewUrl,
        'viewUrl',
        'componentData'
      );
      sinon.assert.calledWith(IframeHelpers.createIframe, 'otherUrl');
      assert.deepEqual(res, splitFrame);
    });

    describe('calculateInitialValues', () => {
      it('with default size', () => {
        GenericHelpers.computePxFromPercent
          .onFirstCall()
          .returns(400)
          .onSecondCall()
          .returns(600);

        const res = SplitViewSvc.calculateInitialValues(undefined, 1000);
        assert.deepEqual(res, {
          top: 600,
          bottom: 400,
          percent: 40
        });
      });
      it('with size', () => {
        GenericHelpers.computePxFromPercent
          .onFirstCall()
          .returns(200)
          .onSecondCall()
          .returns(400);

        const res = SplitViewSvc.calculateInitialValues(33, 600);
        assert.deepEqual(res, {
          top: 400,
          bottom: 200,
          percent: 33
        });
      });
    });

    it('calculateAndSetSplitViewValues', () => {
      // given
      const mockCalculated = {
        top: 600,
        bottom: 400,
        percent: 40
      };
      window.innerHeight = 1000;
      const shellbarHeight = 30;
      const rightContentHeight = 970;
      LuigiElements.getShellbar.returns({
        clientHeight: shellbarHeight
      });

      GenericHelpers.computePxFromPercent.onFirstCall().returns(400); // 40% of 1000px

      sinon.stub(SplitViewSvc, 'enforceTresholds').returns(mockCalculated);

      SplitViewSvc.splitViewValues = {};

      // then
      SplitViewSvc.calculateAndSetSplitViewValues(40, { rightContentHeight });

      // when
      sinon.assert.calledWithExactly(
        GenericHelpers.computePxFromPercent,
        rightContentHeight,
        60
      );
      const newBottom = 400 + shellbarHeight;
      sinon.assert.calledWithExactly(SplitViewSvc.enforceTresholds, 430, 570, {
        rightContentHeight
      });
      assert.deepEqual(SplitViewSvc.splitViewValues, mockCalculated);
    });

    describe('prepareSplitViewData', () => {
      let pathUrlRaw,
        navigationNodes,
        pathData,
        params,
        nodeParams,
        lastNode,
        splitViewSettings;

      const setMockReturns = () => {
        GenericHelpers.getPathWithoutHash.returns(pathUrlRaw);
        LuigiConfig.getConfigValueAsync.returns(navigationNodes);
        Navigation.getNavigationPath.returns(pathData);
        RoutingHelpers.parseParams.returns(params);
        RoutingHelpers.getNodeParams.returns(nodeParams);
        RoutingHelpers.getLastNodeObject.returns(lastNode);
      };

      beforeEach(() => {
        pathUrlRaw = '/projects?order=asc';
        navigationNodes = 'mockNavNodes';
        pathData = 'mockObject';
        params = 'mockParams';
        nodeParams = 'mockNodeParams';
      });

      it('with splitviewsettings, without title, collapsed', async () => {
        // given
        lastNode = { label: 'mock title' };
        const splitViewSettings = {
          collapsed: true
        };
        component.get.restore();
        sinon.stub(component, 'get').returns({ splitViewSettings });
        const testPath = 'http:/#!' + pathUrlRaw;
        setMockReturns();

        // then
        await SplitViewSvc.prepareSplitViewData(component, testPath);

        // when
        sinon.assert.calledWithExactly(
          GenericHelpers.getPathWithoutHash,
          testPath
        );
        sinon.assert.calledWithExactly(
          Navigation.getNavigationPath,
          navigationNodes,
          testPath
        );
        sinon.assert.calledWithExactly(RoutingHelpers.parseParams, 'order=asc');
        sinon.assert.calledWithExactly(RoutingHelpers.getNodeParams, params);
        sinon.assert.calledWithExactly(
          RoutingHelpers.getLastNodeObject,
          pathData
        );
        sinon.assert.calledWithExactly(component.set, {
          splitViewSettings: {
            collapsed: true,
            title: 'mock title'
          },
          lastNode,
          pathData,
          nodeParams,
          collapsed: true,
          isDataPrepared: true
        });
      });

      it('with splitviewsettings, with title, collapsed', async () => {
        // given
        lastNode = 'mockLastNode';
        const splitViewSettings = {
          collapsed: true,
          title: 'other title'
        };
        component.get.restore();
        sinon.stub(component, 'get').returns({ splitViewSettings });
        const testPath = 'http:/#!' + pathUrlRaw;
        setMockReturns();

        // then
        await SplitViewSvc.prepareSplitViewData(component, testPath);

        // when
        sinon.assert.calledWithExactly(
          GenericHelpers.getPathWithoutHash,
          testPath
        );
        sinon.assert.calledWithExactly(
          Navigation.getNavigationPath,
          navigationNodes,
          testPath
        );
        sinon.assert.calledWithExactly(RoutingHelpers.parseParams, 'order=asc');
        sinon.assert.calledWithExactly(RoutingHelpers.getNodeParams, params);
        sinon.assert.calledWithExactly(
          RoutingHelpers.getLastNodeObject,
          pathData
        );
        sinon.assert.calledWithExactly(component.set, {
          splitViewSettings: {
            collapsed: true,
            title: 'other title'
          },
          lastNode,
          pathData,
          nodeParams,
          collapsed: true,
          isDataPrepared: true
        });
      });

      it('without specific splitviewsettings', async () => {
        // given
        const splitViewSettings = {};
        component.get.restore();
        sinon.stub(component, 'get').returns({ splitViewSettings });
        const testPath = 'http:/#!' + pathUrlRaw;
        setMockReturns();

        // then
        await SplitViewSvc.prepareSplitViewData(component, testPath);

        // when
        sinon.assert.calledWithExactly(
          GenericHelpers.getPathWithoutHash,
          testPath
        );
        sinon.assert.calledWithExactly(
          Navigation.getNavigationPath,
          navigationNodes,
          testPath
        );
        sinon.assert.calledWithExactly(RoutingHelpers.parseParams, 'order=asc');
        sinon.assert.calledWithExactly(RoutingHelpers.getNodeParams, params);
        sinon.assert.calledWithExactly(
          RoutingHelpers.getLastNodeObject,
          pathData
        );
        sinon.assert.calledWithExactly(component.set, {
          splitViewSettings,
          lastNode,
          pathData,
          nodeParams,
          collapsed: false,
          isDataPrepared: true
        });
      });
    });

    describe('enforceTresholds', () => {
      beforeEach(() => {
        GenericHelpers.computePxFromPercent.returns(0);
        window.innerHeight = 400;
        SplitViewSvc.internalValues = {
          thresholdTop: 20,
          thresholdBottom: 20
        };
      });
      it('with valid settings', () => {
        const res = SplitViewSvc.enforceTresholds(100, 300);
        assert.equal(res.top, 100);
        assert.equal(res.bottom, 300);
      });
      it('with to low top value', () => {
        const res = SplitViewSvc.enforceTresholds(10, 390);
        assert.equal(res.top, 20);
        assert.equal(res.bottom, 380);
      });
      it('with to bottom top value', () => {
        const res = SplitViewSvc.enforceTresholds(395, 5);
        assert.equal(res.top, 380);
        assert.equal(res.bottom, 20);
      });
    });
    it('sendMessageToClients', () => {
      const mockData = 'someData';

      SplitViewSvc.sendMessageToClients('test', mockData);

      sinon.assert.calledWithExactly(
        IframeHelpers.sendMessageToVisibleIframes,
        {
          msg: `luigi.navigation.splitview.test`,
          data: mockData
        }
      );
    });
  });
});
