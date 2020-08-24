import { get, writable } from 'svelte/store';
/**
 * Functions to use feature toggles in Luigi
 * @name FeatureToggles
 */
class LuigiFeatureToggles {
  constructor() {
    this.featureToggleList = writable([]);
  }
  /**
   * Add a feature toggle to an active feature toggles list
   * @memberof FeatureToggles
   * @since NEXTRELEASE
   * @example Luigi.featureToggles().setFeatureToggle('featureToggleName');
   */
  setFeatureToggle(featureToggleName) {
    if (featureToggleName && typeof featureToggleName === 'string') {
      if (!get(this.featureToggleList).includes(featureToggleName)) {
        get(this.featureToggleList).push(featureToggleName);
      } else {
        console.warn('Feature toggle name already exists');
      }
    } else {
      console.warn('Feature toggle name is empty or not a type of string');
    }
  }

  /**
   * Remove a feature toggle from the list
   * @memberof FeatureToggles
   * @since NEXTRELEASE
   * @example Luigi.featureToggles().unsetFeatureToggle('featureToggleName');
   */
  unsetFeatureToggle(featureToggleName) {
    if (featureToggleName && typeof featureToggleName === 'string') {
      if (get(this.featureToggleList).includes(featureToggleName)) {
        let index = get(this.featureToggleList).indexOf(featureToggleName);
        if (index > -1) {
          get(this.featureToggleList).splice(index, 1);
        }
      } else {
        console.warn('Feature toggle name is not in the list.');
      }
    } else {
      console.warn('Feature toggle name is empty or not a type of string');
    }
  }

  /**
   * Get a list of active feature toggles
   * @memberof FeatureToggles
   * @since NEXTRELEASE
   * @return {Array} of active feature toggles
   * @example Luigi.featureToggles().getActiveFeatureToggleList();
   */
  getActiveFeatureToggleList() {
    return [...get(this.featureToggleList)];
  }
}
export const featureToggles = new LuigiFeatureToggles();
