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

  getContainer() {
    return document.getElementById('splitViewContainer');
  }
  getDragger() {
    return document.getElementById('splitViewDragger');
  }
  getDraggerBackdrop() {
    return document.getElementById('splitViewDraggerBackdrop');
  }

  getDefaultData() {
    return {
      mfSplitView: {
        displayed: false,
        settings: {}
      }
    };
  }

  setIframe(viewUrl, componentData, component) {
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
    const collapsed = splitViewSettings.collapsed || false;
    component.set({
      splitViewSettings,
      lastNode,
      pathData,
      nodeParams,
      collapsed,
      isDataPrepared: true
    });
  }

  createAndSetView(component) {
    const { nodeParams, lastNode, pathData } = component.get();

    const iframe = this.setIframe(
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

      return {
        percent: percentBottom,
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

  open(comp, nodepath, settings) {
    const mfSplitView = {
      displayed: true,
      collapsed: false, // settings.collapsed === true, // TODO: separate ticket
      nodepath,
      settings
    };

    this.splitViewValues = this.calculateInitialValues(
      mfSplitView.settings && mfSplitView.settings.size,
      GenericHelpers.getContentAreaHeight()
    );

    this.sendMessageToClients('internal', {
      exists: true,
      size: this.splitViewValues.percent,
      collapsed: mfSplitView.collapsed
    });
    comp.set({ mfSplitView, splitViewValues: this.splitViewValues });
  }

  expand(comp) {
    if (comp.get().splitViewIframe) {
      this.sendMessageToClients('internal', {
        exists: true,
        size: this.storedSplitViewValues.percent,
        collapsed: false
      });
      this.sendMessageToClients('expand.ok');

      this.setDeep(comp, 'mfSplitView', {
        displayed: true,
        collapsed: false
      });

      this.getContainer().style.top = `${this.storedSplitViewValues.top}px`;
      Iframe.getIframeContainer().style.paddingBottom = `${
        this.storedSplitViewValues.bottom
      }px`;
      this.getDragger().style.top = `${this.storedSplitViewValues.top}px`;
      this.storedSplitViewValues = undefined;
    }
  }

  collapse(comp) {
    if (comp.get().splitViewIframe) {
      comp
        .getUnsavedChangesModalPromise(comp.get().splitViewIframe.contentWindow)
        .then(() => {
          this.sendMessageToClients('internal', {
            exists: true,
            size: this.splitViewValues.percent,
            collapsed: true
          });
          this.sendMessageToClients('collapse.ok');
          this.setDeep(comp, 'mfSplitView', {
            displayed: true,
            collapsed: true
          });
          this.storedSplitViewValues = Object.assign({}, this.splitViewValues);
          this.getContainer().style.top = '';
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
            displayed: false,
            collapsed: false
          });
          Iframe.getIframeContainer().style.paddingBottom = '';
          this.sendMessageToClients('close.ok');
        });
    }
  }

  sendMessageToClients(name, data) {
    IframeHelpers.sendMessageToVisibleIframes({
      msg: `luigi.navigation.splitview.${name}`,
      data
    });
  }
}

export const SplitViewSvc = new SplitViewSvcClass();
