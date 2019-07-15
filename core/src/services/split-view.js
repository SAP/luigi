import { LuigiConfig } from '../core-api';
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
    const {
      nodeParams,
      lastNode,
      splitViewSettings,
      pathData
    } = component.get();

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

  calculateInitialValues(mfSplitView, rightContentHeight) {
    if (mfSplitView.settings && rightContentHeight) {
      const percentBottom = mfSplitView.settings.size || 40;
      const bottom = parseInt(
        GenericHelpers.computePxFromPercent(rightContentHeight, percentBottom)
      );

      const percentTop = mfSplitView.settings.size
        ? 100 - mfSplitView.settings.size
        : 60;
      const top = parseInt(
        GenericHelpers.computePxFromPercent(rightContentHeight, percentTop)
      );

      return {
        bottom,
        top
      };
    }
  }

  setDeep(comp, key, value) {
    comp.set({
      [key]: Object.assign({}, comp.get()[key], value)
    });
  }

  openViewInSplitView(comp, nodepath, settings) {
    const mfSplitView = {
      isDisplayed: true,
      isCollapsed: settings.collapsed === true,
      nodepath,
      settings
    };
    this.splitViewValues = this.calculateInitialValues(
      mfSplitView,
      GenericHelpers.getRightContentHeight()
    );
    comp.set({ mfSplitView, splitViewValues: this.splitViewValues });
  }

  expandSplitView(comp) {
    if (comp.get().splitViewIframe) {
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
      this.sendClientEvent('expand');
    }
  }

  collapseSplitView(comp) {
    if (comp.get().splitViewIframe) {
      comp
        .getUnsavedChangesModalPromise(comp.get().splitViewIframe.contentWindow)
        .then(() => {
          this.setDeep(comp, 'mfSplitView', {
            isDisplayed: true,
            isCollapsed: true
          });
          this.storedSplitViewValues = Object.assign({}, this.splitViewValues);
          this.getSplitViewContainer().style.top = '';
          Iframe.getIframeContainer().style.paddingBottom = '';
          this.sendClientEvent('collapse');
        });
    }
  }

  closeSplitView(comp) {
    if (comp.get().splitViewIframe) {
      comp
        .getUnsavedChangesModalPromise(comp.get().splitViewIframe.contentWindow)
        .then(() => {
          this.setDeep(comp, 'mfSplitView', {
            isDisplayed: false
          });
          this.sendClientEvent('close');
        });
    }
  }

  sendClientEvent(name, data) {
    window.parent.postMessage(
      {
        msg: `luigi-client.navigation.splitview.${name}`,
        data
      },
      '*'
    );
  }
}

export const SplitViewSvc = new SplitViewSvcClass();
