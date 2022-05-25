import { get, writable } from 'svelte/store';
import { GenericHelpers } from '../utilities/helpers';
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
   * @since 1.4.0
   * @example Luigi.featureToggles().setFeatureToggle('featureToggleName');
   */
  setFeatureToggle(featureToggleName, fromUrlQuery = false) {
    if (!this.isValid(featureToggleName)) return;
    if (featureToggleName.startsWith('!') && !fromUrlQuery) return;
    if (this.isDuplicateOrDisabled(featureToggleName)) return;

    get(this.featureToggleList).push(featureToggleName);
  }

  /**
   * Remove a feature toggle from the list
   * @memberof FeatureToggles
   * @since 1.4.0
   * @example Luigi.featureToggles().unsetFeatureToggle('featureToggleName');
   */
  unsetFeatureToggle(featureToggleName) {
    if (!this.isValid(featureToggleName)) return;

    const index = get(this.featureToggleList).indexOf(featureToggleName);
    if (index === -1) {
      console.warn('Feature toggle name is not in the list.');
      return;
    }
    get(this.featureToggleList).splice(index, 1);
  }

  /**
   * Get a list of active feature toggles
   * @memberof FeatureToggles
   * @since 1.4.0
   * @return {Array} of active feature toggles
   * @example Luigi.featureToggles().getActiveFeatureToggleList();
   */
  getActiveFeatureToggleList() {
    return [...get(this.featureToggleList)].filter(ft => !ft.startsWith('!'));
  }

  isValid(featureToggleName) {
    if (GenericHelpers.isString(featureToggleName)) return true;

    console.warn('Feature toggle name is not valid or not a type of string');
    return false;
  }

  isDuplicateOrDisabled(featureToggleName) {
    if (get(this.featureToggleList).includes(featureToggleName)) {
      console.warn('Feature toggle name already exists');
      return true;
    }

    if (get(this.featureToggleList).includes(`!${featureToggleName}`)) {
      console.warn('Disabled feature toggle can not be activated');
      return true;
    }
    return false;
  }
}
export const featureToggles = new LuigiFeatureToggles();
