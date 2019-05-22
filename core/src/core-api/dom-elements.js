/** @namespace */
class LuigiElementsManager {
  /**
   * Use the functions to get important DOM elements.
   * @name LuigiElements
   */
  /**
   * Returns the shellbar component.
   * @returns {Object} the shellbar DOM element.
   * @memberof LuigiElements
   */
  getShellbar() {
    return document.getElementsByClassName('fd-shellbar')[0];
  }

  /**
   * Returns the shellbar actions component.
   * @returns {Object} the shellbar actions DOM element.
   * @memberof LuigiElements
   */
  getShellbarActions() {
    return document.getElementsByClassName('fd-shellbar__actions')[0];
  }

  /**
   * Returns all microfrontend iframes including iframe from the modal if it exists.
   * @returns {Object} an array of all microfrontend iframes from the DOM.
   * @memberof LuigiElements
   */
  getMicrofrontendIframes() {
    return [...document.querySelectorAll('.iframeContainer iframe')].concat([
      ...document.querySelectorAll('.iframeModalCtn iframe')
    ]);
  }

  /**
   * Returns the active microfrontend iframe. If there is a modal, which includes the microfrontend iframe, the function will return this iframe.
   * @returns {Object} the active microfrontend iframe DOM element.
   * @memberof LuigiElements
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

export const elements = new LuigiElementsManager();
