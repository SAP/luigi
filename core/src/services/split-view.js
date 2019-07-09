import { GenericHelpers } from '../utilities/helpers';

class SplitViewSvcClass {
  get iframeTypes() {
    return [
      {
        iframeKey: 'modalIframe',
        dataKey: 'modalIframeData'
      },
      {
        iframeKey: 'splitViewIframe',
        dataKey: 'splitViewIframeData'
      }
    ];
  }

  getDefaultData() {
    return {
      mfSplitView: {
        isDisplayed: false,
        settings: {}
      }
    };
  }

  getIframeSplitViewBottom(mfSplitView, rightContentHeight) {
    // sets .lui-split.iframeContainer style: bottom
    if (
      mfSplitView.isDisplayed &&
      !mfSplitView.isCollapsed &&
      mfSplitView.settings
    ) {
      const percent = mfSplitView.settings.height
        ? mfSplitView.settings.height
        : 40;
      const topHeightPx = GenericHelpers.computePxFromPercent(
        rightContentHeight,
        percent
      );
      return `bottom: ${topHeightPx}px`;
    }
    return '';
  }
  getIframeSplitViewContainerTop(mfSplitView, rightContentHeight) {
    // sets .iframeSplitViewContainer style: top
    if (
      mfSplitView.isDisplayed &&
      !mfSplitView.isCollapsed &&
      mfSplitView.settings
    ) {
      const percent = mfSplitView.settings.height
        ? 100 - mfSplitView.settings.height
        : 60;
      const topHeightPx = GenericHelpers.computePxFromPercent(
        rightContentHeight,
        percent
      );
      return `top: ${topHeightPx}px`;
    }
    return '';
  }

  assignDeep(comp, key, value) {
    comp.set({
      [key]: Object.assign({}, comp.get()[key], value)
    });
  }

  openViewInSplitView(comp, nodepath, settings) {
    comp.set({
      mfSplitView: {
        isDisplayed: true,
        isCollapsed: settings.collapsed === true,
        nodepath,
        settings
      }
    });
  }

  expandSplitView(comp) {
    if (comp.get().splitViewIframe) {
      this.assignDeep(comp, 'mfSplitView', {
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
          this.assignDeep(comp, 'mfSplitView', {
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
          this.assignDeep(comp, 'mfSplitView', {
            isDisplayed: false
          });
        });
    }
  }
}

export const SplitViewSvc = new SplitViewSvcClass();
