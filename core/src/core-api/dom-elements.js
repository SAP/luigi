/**
 * Use these functions to get DOM elements.
 * @namespace Elements
 */
class LuigiElements {
  /**
   * Returns the shellbar component.
   * @returns {Object} the shellbar DOM element.
   * @memberof Elements
   * @since 0.4.12
   * @example
   * Luigi.elements().getShellbar();
   */
  getShellbar() {
    return document.getElementsByClassName('fd-shellbar')[0];
  }

  /**
   * Returns the shellbar actions component.
   * @returns {Object} the shellbar actions DOM element.
   * @memberof Elements
   * @since 0.4.12
   * @example
   * Luigi.elements().getShellbarActions();
   */
  getShellbarActions() {
    return document.getElementsByClassName('fd-shellbar__actions')[0];
  }

  /**
   * Returns all micro frontend iframes including the iframe from the modal if it exists.
   * @returns {Object} an array of all micro frontend iframes from the DOM.
   * @memberof Elements
   * @since 0.4.12
   * @example
   * Luigi.elements().getMicrofrontendIframes();
   */
  getMicrofrontendIframes() {
    return [...document.querySelectorAll('.iframeContainer iframe')].concat([
      ...document.querySelectorAll('.iframeModalCtn iframe')
    ]);
  }

  /**
   * Returns the active micro frontend iframe.
   * If there is a modal, which includes the micro frontend iframe, the function returns this iframe.
   * @returns {Object} the active micro frontend iframe DOM element.
   * @memberof Elements
   * @since 0.4.12
   * @example
   * Luigi.elements().getCurrentMicrofrontendIframe();
   */
  getCurrentMicrofrontendIframe() {
    let modalIframes = document.querySelectorAll('.iframeModalCtn iframe');
    let mainIframes = [
      ...document.querySelectorAll('.iframeContainer iframe')
    ].filter(iframe => iframe.style.display !== 'none');

    return modalIframes.length > 0
      ? modalIframes[0]
      : mainIframes.length > 0
      ? mainIframes[0]
      : null;
  }
}

export const elements = new LuigiElements();
