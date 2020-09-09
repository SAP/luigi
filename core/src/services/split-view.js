import { LuigiConfig, LuigiElements } from '../core-api';
import { Navigation } from '../navigation/services/navigation';
import {
  GenericHelpers,
  IframeHelpers,
  RoutingHelpers
} from '../utilities/helpers';

class SplitViewSvcClass {
  constructor() {
    this.splitViewValues;
    this.internalValues = {
      innerHeight: null,
      rightContentHeight: null,
      thresholdTop: null,
      thresholdBottom: null,
      m_pos_prev: null
    };
  }

  getContainer() {
    return document.getElementById('splitViewContainer');
  }
  getDragger() {
    return document.getElementById('splitViewDragger');
  }
  getDraggerButton() {
    return document.querySelector('#splitViewDragger>.lui-collapse-btn');
  }
  getCollapsedDraggerButton() {
    return document.querySelector(
      '#splitViewDraggerCollapsed>.lui-collapse-btn'
    );
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
    const iframe = IframeHelpers.createIframe(
      viewUrl,
      undefined,
      component.get().lastNode,
      'split-view'
    );
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

    const iframeInfo = {
      splitViewIframe: iframe,
      splitViewIframeData: { ...pathData, nodeParams }
    };
    component.set(iframeInfo);
    component.dispatch('iframeCreated', {
      ...iframeInfo,
      ...{ collapsed: false }
    });

    this.fixIOSscroll();
  }

  // required for iOS to force repaint, else scrolling does not work
  /* istanbul ignore next */
  fixIOSscroll() {
    const iOS =
      !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if (!iOS) {
      return;
    }
    const splitIframe = document.querySelector('.iframeSplitViewCnt iframe');
    if (splitIframe) {
      splitIframe.addEventListener('load', () => {
        document.querySelector('.iframeSplitViewCnt').style.overflow = 'hidden';
        setTimeout(() => {
          document.querySelector('.iframeSplitViewCnt').style.overflow = 'auto';
        });
      });
    }
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

  calculateAndSetSplitViewValues(percentBottom, values) {
    const newBottom =
      parseInt(
        GenericHelpers.computePxFromPercent(
          values.rightContentHeight,
          100 - percentBottom
        )
      ) + LuigiElements.getShellbar().clientHeight;

    this.splitViewValues = this.enforceTresholds(
      newBottom,
      values.innerHeight - newBottom,
      values
    );
  }

  enforceTresholds(top, bottom) {
    const iv = this.internalValues;
    if (top <= iv.thresholdTop) {
      top = iv.thresholdTop;
      bottom = iv.innerHeight - iv.thresholdTop;
    } else if (bottom <= iv.thresholdBottom) {
      top = iv.innerHeight - iv.thresholdBottom;
      bottom = iv.thresholdBottom;
    }

    return {
      top,
      bottom,
      percent: GenericHelpers.computePercentFromPx(
        iv.rightContentHeight,
        bottom
      )
    };
  }

  open(comp, nodepath, settings) {
    const mfSplitView = {
      displayed: true,
      collapsed: settings.collapsed === true,
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

  close(comp) {
    if (comp.get().splitViewIframe) {
      comp
        .getUnsavedChangesModalPromise(comp.get().splitViewIframe.contentWindow)
        .then(() => {
          if (comp.get().mfSplitView) {
            comp.get().mfSplitView.displayed = false;
            comp.get().mfSplitView.collapsed = false;
            comp.set({ mfSplitView: comp.get().mfSplitView });
          }
          comp.dispatch('statusChanged', {
            displayed: false
          });
          IframeHelpers.getIframeContainer().style.paddingBottom = '';
          SplitViewSvc.sendMessageToClients('close.ok');
        });
    }
  }

  async expand(comp) {
    this.sendMessageToClients('internal', {
      exists: true,
      size: this.splitViewValues.percent,
      collapsed: false
    });
    this.sendMessageToClients('expand.ok');

    comp.dispatch('statusChanged', {
      displayed: true,
      collapsed: false
    });

    this.getContainer().style.top = `${this.splitViewValues.top}px`;
    IframeHelpers.getIframeContainer().style.paddingBottom = `${this.splitViewValues.bottom}px`;
    setTimeout(() => {
      this.getDragger().style.top = `${this.splitViewValues.top}px`;
    });
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
          comp.dispatch('statusChanged', {
            displayed: true,
            collapsed: true
          });
          this.getContainer().style.top = '';
          IframeHelpers.getIframeContainer().style.paddingBottom = '';
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
