import { APP_LOADING_INDICATOR } from './../utilities/constants';

/**
 * Functions to use Luigi Core UX features.
 * @namespace UX
 */
class LuigiUX {
  /**
   * Hides the app loading indicator.
   * @memberof UX
   * @since 0.6.3
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
