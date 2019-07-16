import { LuigiConfig, LuigiElements } from '../core-api';
import { Navigation } from '../navigation/services/navigation';
import { Iframe } from '../services';
import {
  GenericHelpers,
  IframeHelpers,
  RoutingHelpers
} from '../utilities/helpers';

class SplitViewSvcClass {
  constructor() {
    this.splitViewValues;
    this.storedSplitViewValues;
  }

  getSplitViewContainer() {
    return document.getElementById('splitViewContainer');
  }
  getSplitViewDragger() {
    return document.getElementById('splitViewDragger');
  }
  getSplitViewDraggerBackdrop() {
    return document.getElementById('splitViewDraggerBackdrop');
  }

  getDefaultData() {
    return {
      mfSplitView: {
        isDisplayed: false,
        settings: {}
      }
    };
  }

  setSplitViewIframe(viewUrl, componentData, component) {
    if (viewUrl) {
      viewUrl = RoutingHelpers.substituteViewUrl(viewUrl, componentData);
    }
    const iframe = IframeHelpers.createIframe(viewUrl);
    const iframeCtn = document.querySelector('.iframeSplitViewCnt');
    iframeCtn.appendChild(iframe);
    return iframe;
  }

  async prepareSplitViewData(component, path) {
    const pathUrlRaw =
      path && path.length ? GenericHelpers.getPathWithoutHash(path) : '';
    const pathData = await Navigation.getNavigationPath(
      LuigiConfig.getConfigValueAsync('navigation.nodes'),
      path
    );
    const params = RoutingHelpers.parseParams(pathUrlRaw.split('?')[1]);
    const nodeParams = RoutingHelpers.getNodeParams(params);
    const lastNode = RoutingHelpers.getLastNodeObject(pathData);
    const splitViewSettings = component.get().splitViewSettings;
    if (!splitViewSettings.title) {
      splitViewSettings.title = lastNode.label;
    }
    const isCollapsed = splitViewSettings.isCollapsed || false;
    component.set({
      splitViewSettings,
      lastNode,
      pathData,
      nodeParams,
      isCollapsed,
      isDataPrepared: true
    });
  }

  createAndSetSplitView(component) {
    const { nodeParams, lastNode, pathData } = component.get();

    const iframe = SplitViewSvc.setSplitViewIframe(
      lastNode.viewUrl,
      {
        context: pathData.context,
        pathParams: pathData.pathParams,
        nodeParams
      },
      component
    );

    component.root.set({
      splitViewIframe: iframe,
      splitViewIframeData: { ...pathData, nodeParams }
    });
  }

  calculateInitialValues(size, rightContentHeight) {
    if (rightContentHeight) {
      const percentBottom = size || 40;
      const bottom = parseInt(
        GenericHelpers.computePxFromPercent(rightContentHeight, percentBottom)
      );

      const percentTop = size ? 100 - size : 60;
      const top = parseInt(
        GenericHelpers.computePxFromPercent(rightContentHeight, percentTop)
      );
      console.log('setting percentBottom', percentTop);
      return {
        percent: percentTop,
        bottom,
        top
      };
    }
  }

  enforceTreshHolds(top, bottom, thresholdTop, thresholdBottom) {
    if (top <= thresholdTop) {
      top = thresholdTop;
      bottom = window.innerHeight - thresholdTop;
    } else if (bottom <= thresholdBottom) {
      top = window.innerHeight - thresholdBottom;
      bottom = thresholdBottom;
    }
    return { top, bottom };
  }

  setDeep(comp, key, value) {
    comp.set({
      [key]: Object.assign({}, comp.get()[key], value)
    });
  }

  openViewInSplitView(comp, nodepath, settings) {
    const mfSplitView = {
      isDisplayed: true,
      isCollapsed: false, // settings.collapsed === true, // TODO: separate ticket
      nodepath,
      settings
    };

    this.splitViewValues = this.calculateInitialValues(
      mfSplitView.settings && mfSplitView.settings.size,
      GenericHelpers.getRightContentHeight()
    );

    this.sendClientEvent('internal', {
      exists: true,
      size: this.splitViewValues.percent,
      isCollapsed: mfSplitView.isCollapsed,
      isExpanded: !mfSplitView.isCollapsed
    });
    comp.set({ mfSplitView, splitViewValues: this.splitViewValues });
  }

  expandSplitView(comp) {
    if (comp.get().splitViewIframe) {
      this.sendClientEvent('internal', {
        exists: true,
        size: this.storedSplitViewValues.percent,
        isCollapsed: false,
        isExpanded: true
      });
      this.sendClientEvent('expand');

      this.setDeep(comp, 'mfSplitView', {
        isDisplayed: true,
        isCollapsed: false
      });

      this.getSplitViewContainer().style.top = `${
        this.storedSplitViewValues.top
      }px`;
      Iframe.getIframeContainer().style.paddingBottom = `${
        this.storedSplitViewValues.bottom
      }px`;
      this.getSplitViewDragger().style.top = `${
        this.storedSplitViewValues.top
      }px`;
      this.storedSplitViewValues = undefined;
    }
  }

  collapseSplitView(comp) {
    if (comp.get().splitViewIframe) {
      comp
        .getUnsavedChangesModalPromise(comp.get().splitViewIframe.contentWindow)
        .then(() => {
          console.log(
            'collapse',
            this.splitViewValues,
            this.storedSplitViewValues
          );
          this.sendClientEvent('internal', {
            exists: true,
            size: this.splitViewValues.percent,
            isCollapsed: true,
            isExpanded: false
          });
          this.sendClientEvent('collapse');
          this.setDeep(comp, 'mfSplitView', {
            isDisplayed: true,
            isCollapsed: true
          });
          this.storedSplitViewValues = Object.assign({}, this.splitViewValues);
          this.getSplitViewContainer().style.top = '';
          Iframe.getIframeContainer().style.paddingBottom = '';
        });
    }
  }

  closeSplitView(comp) {
    if (comp.get().splitViewIframe) {
      comp
        .getUnsavedChangesModalPromise(comp.get().splitViewIframe.contentWindow)
        .then(() => {
          this.setDeep(comp, 'mfSplitView', {
            isDisplayed: false,
            isCollapsed: false
          });
          Iframe.getIframeContainer().style.paddingBottom = '';
          this.sendClientEvent('close');
        });
    }
  }

  sendClientEvent(name, data) {
    console.log('sending event ' + name + ' to client');
    IframeHelpers.sendMessageToVisibleIframes({
      msg: `luigi-client.navigation.splitview.${name}`,
      data
    });
  }
}

export const SplitViewSvc = new SplitViewSvcClass();
