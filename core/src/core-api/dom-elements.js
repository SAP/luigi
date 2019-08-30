import { CUSTOM_LUIGI_CONTAINER } from './../utilities/constants';

import { IframeHelpers } from './../utilities/helpers';

/**
 * Use these functions to get DOM elements.
 * @namespace Elements
 */
class LuigiElements {
  /**
   * Returns the container of the Luigi content.
   * @returns {HTMLElement} the DOM element that wraps the Luigi content.
   * @memberof Elements
   * @since 0.6.0
   * @example
   * Luigi.elements().getLuigiContainer();
   */
  getLuigiContainer() {
    return this.getCustomLuigiContainer() || this.getDefaultLuigiContainer();
  }

  /**
   * Returns a boolean that indicates if Luigi is being rendered in a custom container or not.
   * @returns {Boolean} _true_ if Luigi content is wrapped in a custom html tag, _false_ otherwise.
   * @memberof Elements
   * @private
   * @since 0.6.0
   * @example
   * Luigi.elements().isCustomLuigiContainer();
   */
  isCustomLuigiContainer() {
    return Boolean(this.getLuigiContainer() === this.getCustomLuigiContainer());
  }

  /**
   * Returns the custom container for the Luigi content
   * @memberof Elements
   * @private
   */
  getCustomLuigiContainer() {
    return document.querySelector(CUSTOM_LUIGI_CONTAINER.cssSelector);
  }

  /**
   * Returns the default container for the Luigi content
   * @memberof Elements
   * @private
   */
  getDefaultLuigiContainer() {
    return document.querySelector('body');
  }

  /**
   * Returns the shellbar component.
   * @returns {HTMLElement} the shellbar DOM element.
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
   * @returns {HTMLElement} the shellbar actions DOM element.
   * @memberof Elements
   * @since 0.4.12
   * @example
   * Luigi.elements().getShellbarActions();
   */
  getShellbarActions() {
    return document.getElementsByClassName('fd-shellbar__actions')[0];
  }

  /**
   * Returns a list of all available micro frontends.
   * @returns {{id: string, active: boolean, container: HTMLElement, type: ('main'|'split-view'|'modal')}[]} list of objects defining all micro frontends from the DOM
   * @example
   * Luigi.elements().getMicrofrontends();
   * @memberof Elements
   */
  getMicrofrontends() {
    return IframeHelpers.getMicrofrontendsInDom();
  }

  /**
   * Returns all micro frontend iframes including the iframe from the modal if it exists.
   * @returns {HTMLElement[]} an array of all micro frontend iframes from the DOM.
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
   * @returns {HTMLElement} the active micro frontend iframe DOM element.
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
