class LuigiNavigationManager {
  /**
   * Use these functions for navigation-related features.
   * @name LuigiNavigation
   */
  constructor() {}

  /**
   * Refreshes top navigation badge counters by rendering the navigation again.
  
   * @memberof LuigiNavigation
   * @example
   * Luigi.navigation().updateTopNavigation();
   */
  updateTopNavigation() {
    window.postMessage({ msg: 'luigi.navigation.update-badge-counters' }, '*');
  }
}

export const navigation = new LuigiNavigationManager();
