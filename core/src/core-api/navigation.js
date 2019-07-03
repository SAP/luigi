class LuigiNavigationManager {
  /**
   * Use these functions for navigation related features
   * @name LuigiNavigation
   */
  constructor() {}

  /**
   * Refreshes top navigation badge counters
   * Basically triggeres a re-render of the navigation.
   * @memberof LuigiNavigation
   * @private
   */
  updateTopNavigation() {
    window.postMessage({ msg: 'luigi.navigation.update-badge-counters' }, '*');
  }
}

export const nav = new LuigiNavigationManager();
