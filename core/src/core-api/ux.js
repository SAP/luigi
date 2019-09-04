import { APP_LOADING_INDICATOR } from './../utilities/constants';

/**
 * Use these functions to get DOM elements.
 * @namespace Elements
 */
class LuigiUX {
  /**
   * Hides the app loading indicator.
   * @memberof Configuration
   */
  hideAppLoadingIndicator() {
    const appLoadingIndicator = document.querySelector(
      APP_LOADING_INDICATOR.cssSelector
    );
    if (appLoadingIndicator) {
      appLoadingIndicator.classList.add('hidden');
      setTimeout(() => {
        appLoadingIndicator.parentNode.removeChild(appLoadingIndicator);
      }, 500);
    }
  }
}

export const ux = new LuigiUX();
