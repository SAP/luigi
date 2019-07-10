import { LuigiConfig } from '../core-api';
import { Navigation } from '../navigation/services/navigation';
import {
  GenericHelpers,
  IframeHelpers,
  RoutingHelpers
} from '../utilities/helpers';

class SplitViewSvcClass {
  constructor() {
    this.splitViewValues;
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
      const percentBottom = mfSplitView.settings.height
        ? mfSplitView.settings.height
        : 40;
      const bottom = GenericHelpers.computePxFromPercent(
        rightContentHeight,
        percentBottom
      );

      const percentTop = mfSplitView.settings.height
        ? 100 - mfSplitView.settings.height
        : 60;
      const top = GenericHelpers.computePxFromPercent(
        rightContentHeight,
        percentTop
      );

      return {
        bottom,
        top
      };
    }
  }
  getIframeSplitViewBottom(mfSplitView, splitViewValues) {
    // sets .lui-split.iframeContainer style: bottom
    if (
      mfSplitView.isDisplayed &&
      !mfSplitView.isCollapsed &&
      this.splitViewValues
    ) {
      return `bottom: ${this.splitViewValues.bottom}px`;
    }
    return '';
  }
  getIframeSplitViewContainerTop(mfSplitView) {
    // sets .iframeSplitViewContainer style: top
    if (
      mfSplitView.isDisplayed &&
      !mfSplitView.isCollapsed &&
      this.splitViewValues
    ) {
      return `top: ${this.splitViewValues.top}px`;
    }
    return '';
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
    comp.set({ mfSplitView });
  }

  expandSplitView(comp) {
    if (comp.get().splitViewIframe) {
      this.setDeep(comp, 'mfSplitView', {
        isDisplayed: true,
        isCollapsed: false
      });
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
        });
    }
  }
}

export const SplitViewSvc = new SplitViewSvcClass();
