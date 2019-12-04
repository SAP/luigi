class LuigiNavigationManager {
  /**
   * Use these functions for navigation-related features.
   * @name LuigiNavigation
   */
  constructor(values) {
    Object.assign(this, values);

    this.options = {
      preserveView: false,
      nodeParams: {},
      errorSkipNavigation: false,
      fromContext: null,
      fromClosestContext: false,
      relative: false,
      link: ''
    };
  }

  /**
   * Refreshes top navigation badge counters by rendering the navigation again.
  
   * @memberof LuigiNavigation
   * @example
   * Luigi.navigation().updateTopNavigation();
   */
  updateTopNavigation() {
    window.postMessage({ msg: 'luigi.navigation.update-badge-counters' }, '*');
  }

  navigate(path, preserveView, modalSettings, splitViewSettings) {
    if (this.options.errorSkipNavigation) {
      this.options.errorSkipNavigation = false;
      return;
    }
    if (modalSettings && splitViewSettings) {
      console.warn(
        'modalSettings and splitViewSettings cannot be used together. Only modal setting will be taken into account.'
      );
    }

    this.options.preserveView = preserveView;
    const relativePath = path[0] !== '/';
    const navigationOpenMsg = {
      msg: 'luigi.navigation.open',
      params: Object.assign(this.options, {
        link: path,
        relative: relativePath,
        modal: modalSettings,
        splitView: splitViewSettings
      })
    };
    window.postMessage(navigationOpenMsg, '*');
  }
}

export const navigation = new LuigiNavigationManager();
