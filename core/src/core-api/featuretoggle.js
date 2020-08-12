import { get, writable } from 'svelte/store';
/**
 * Functions to use the feature toggle of Luigi
 * @name FeatureToggle
 */
class LuigiFeatureToggle {
  constructor() {
    this.featureToggleList = writable([]);
  }
  /**
   * Add the name of a feature toggle to a list
   * @memberof Feature Toggle
   * @since NEXTRELEASE
   * @example Luigi.featureToggle().setFeatureToggle();
   */
  setFeatureToggle(featureToggleName) {
    if (featureToggleName && typeof featureToggleName === 'string') {
      if (!get(this.featureToggleList).includes(featureToggleName)) {
        get(this.featureToggleList).push(featureToggleName);
      } else {
        console.log('Feature toggle name already exists');
      }
    } else {
      console.log('Feature toggle name is empty or not a type of string');
    }
  }

  unsetFeatureToggle(featureToggleName) {
    if (featureToggleName && typeof featureToggleName === 'string') {
      if (get(this.featureToggleList).includes(featureToggleName)) {
        let index = get(this.featureToggleList).indexOf(featureToggleName);
        if (index > -1) {
          get(this.featureToggleList).splice(index, 1);
        }
      } else {
        console.log('Feature toggle name is not in the list.');
      }
    } else {
      console.log('Feature toggle name is empty or not a type of string');
    }
  }

  /**
   * Get a list of feature toggles
   * @memberof Feature Toggle
   * @since NEXTRELEASE
   * @example Luigi.featureToggle().getActiveFeatureToggleList();
   */
  getActiveFeatureToggleList() {
    return this.featureToggleList;
  }
}
export const featureToggle = new LuigiFeatureToggle();
