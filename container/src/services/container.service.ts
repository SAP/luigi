import { Events } from '../constants/communication';
import type { IframeHandle, ContainerElement } from '../constants/container.model';
import { LuigiInternalMessageID } from '../constants/internal-communication';
import { GenericHelperFunctions } from '../utilities/helpers';

export class ContainerService {
  /**
   * Checks if the given HTML element is visible in the DOM by considering both
   * its width/height and any client rectangles it may have.
   *
   * @param {HTMLElement} component - The HTML element to check for visibility.
   * @returns {boolean} Returns true if the element is visible, otherwise false.
   */
  isVisible(component: HTMLElement): boolean {
    return !!(component.offsetWidth || component.offsetHeight || component.getClientRects().length);
  }

  /**
   * Sends a message to the iframe either with the custom keyword or any other message name
   * @param iframeHandle the iframe to send the message to
   * @param msg the message to be sent
   * @param msgName the optional message name
   */
  sendCustomMessageToIframe(iframeHandle: IframeHandle, msg: object, msgName?: string) {
    const messageName = msgName || 'custom';

    if (iframeHandle?.iframe?.contentWindow) {
      const iframeUrl = new URL(iframeHandle.iframe.src);
      if (messageName === 'custom') {
        iframeHandle.iframe.contentWindow.postMessage({ msg: messageName, data: msg }, iframeUrl.origin);
      } else {
        iframeHandle.iframe.contentWindow.postMessage({ msg: messageName, ...msg }, iframeUrl.origin);
      }
    } else {
      console.error('Message target could not be resolved');
    }
  }

  /**
   * Dispatch an event to the given target container
   * @param {string} msg the event message
   * @param {ContainerElement} targetCnt the targeted HTML element onto which the event is dispatched
   * @param {Object} data custom data added to the event to be dispatched
   * @param {Function} callback
   * @param {string} callbackName
   */
  dispatch(
    msg: string,
    targetCnt: ContainerElement,
    data: object,
    callback?: (arg?) => void,
    callbackName?: string
  ): void {
    const customEvent = new CustomEvent(msg, { detail: data });

    if (callback && GenericHelperFunctions.isFunction(callback) && callbackName) {
      customEvent[callbackName] = (data) => {
        callback(data);
      };
    }

    targetCnt.dispatchEvent(customEvent);
  }

  /**
   * Retrieves the target container based on the event source.
   *
   * @param event The event object representing the source of the container.
   * @returns {ContainerElement | undefined} The target container object or undefined if not found.
   */
  getTargetContainer(event): ContainerElement | undefined {
    let cnt;

    globalThis.__luigi_container_manager.container.forEach((element) => {
      if (element.iframeHandle?.iframe && element.iframeHandle.iframe.contentWindow === event.source) {
        cnt = element;
      }
    });

    return cnt;
  }

  /**
   * Initializes the Luigi Container Manager responsible for managing communication
   * between microfrontends and dispatching events accordingly. Also adds 'message' listener to the window object with
   * the defined messageListener list
   * @returns __luigi_container_manager which has the added container array and message listeners
   */
  getContainerManager() {
    if (!globalThis.__luigi_container_manager) {
      globalThis.__luigi_container_manager = {
        container: [],
        messageListener: (event) => {
          // Handle incoming messages and dispatch events based on the message type
          // (Custom messages, navigation requests, alert requests, etc.)
          const targetCnt = this.getTargetContainer(event);
          const target = targetCnt?.iframeHandle?.iframe?.contentWindow;
          if (target && target === event.source) {
            // messages emitted from microfrontends
            const msg = event.data.msg;

            // dispatch an event depending on message
            switch (msg) {
              case LuigiInternalMessageID.CUSTOM_MESSAGE:
                {
                  const evData = event.data.data;
                  const id = evData.id;
                  delete evData.id;
                  this.dispatch(Events.CUSTOM_MESSAGE, targetCnt, {
                    id: id,
                    _metaData: {},
                    data: evData
                  });
                }
                break;
              case LuigiInternalMessageID.GET_CONTEXT:
                // Automatically send a luigi.init message to complete the initial handshake with the microfrontend
                target.postMessage(
                  {
                    msg: LuigiInternalMessageID.SEND_CONTEXT_HANDSHAKE,
                    context: targetCnt.context || {},
                    internal: {
                      thirdPartyCookieCheck: {
                        disabled: targetCnt.skipCookieCheck === 'true'
                      }
                    },
                    authData: targetCnt.authData || {}
                  },
                  event.origin
                );
                break;
              case LuigiInternalMessageID.NAVIGATION_REQUEST:
                this.dispatch(Events.NAVIGATION_REQUEST, targetCnt, event.data.params);
                break;
              case LuigiInternalMessageID.ALERT_REQUEST:
                this.dispatch(Events.ALERT_REQUEST, targetCnt, event);
                break;
              case LuigiInternalMessageID.INITIALIZED:
                this.dispatch(Events.INITIALIZED, targetCnt, event.data.params);
                break;
              case LuigiInternalMessageID.ADD_SEARCH_PARAMS_REQUEST:
                this.dispatch(Events.ADD_SEARCH_PARAMS_REQUEST, targetCnt, {
                  data: event.data.data,
                  keepBrowserHistory: event.data.keepBrowserHistory
                });
                break;
              case LuigiInternalMessageID.ADD_NODE_PARAMS_REQUEST:
                this.dispatch(Events.ADD_NODE_PARAMS_REQUEST, targetCnt, {
                  data: event.data.data,
                  keepBrowserHistory: event.data.keepBrowserHistory
                });
                break;
              case LuigiInternalMessageID.SHOW_CONFIRMATION_MODAL_REQUEST:
                this.dispatch(Events.SHOW_CONFIRMATION_MODAL_REQUEST, targetCnt, event.data.data);
                break;
              case LuigiInternalMessageID.SHOW_LOADING_INDICATOR_REQUEST:
                this.dispatch(Events.SHOW_LOADING_INDICATOR_REQUEST, targetCnt, event);
                break;
              case LuigiInternalMessageID.HIDE_LOADING_INDICATOR_REQUEST:
                this.dispatch(Events.HIDE_LOADING_INDICATOR_REQUEST, targetCnt, event);
                break;
              case LuigiInternalMessageID.SET_CURRENT_LOCALE_REQUEST:
                this.dispatch(Events.SET_CURRENT_LOCALE_REQUEST, targetCnt, event);
                break;
              case LuigiInternalMessageID.LOCAL_STORAGE_SET_REQUEST:
                this.dispatch(Events.LOCAL_STORAGE_SET_REQUEST, targetCnt, event);
                break;
              case LuigiInternalMessageID.RUNTIME_ERROR_HANDLING_REQUEST:
                this.dispatch(Events.RUNTIME_ERROR_HANDLING_REQUEST, targetCnt, event);
                break;
              case LuigiInternalMessageID.SET_ANCHOR_LINK_REQUEST:
                this.dispatch(Events.SET_ANCHOR_LINK_REQUEST, targetCnt, event);
                break;
              case LuigiInternalMessageID.SET_THIRD_PARTY_COOKIES_REQUEST:
                this.dispatch(Events.SET_THIRD_PARTY_COOKIES_REQUEST, targetCnt, event);
                break;
              case LuigiInternalMessageID.BACK_NAVIGATION_REQUEST:
                this.dispatch(Events.BACK_NAVIGATION_REQUEST, targetCnt, event);
                break;
              case LuigiInternalMessageID.GET_CURRENT_ROUTE_REQUEST:
                this.dispatch(Events.GET_CURRENT_ROUTE_REQUEST, targetCnt, event);
                break;
              case LuigiInternalMessageID.NAVIGATION_COMPLETED_REPORT:
                this.dispatch(Events.NAVIGATION_COMPLETED_REPORT, targetCnt, event);
                break;
              case LuigiInternalMessageID.UPDATE_MODAL_PATH_DATA_REQUEST:
                this.dispatch(Events.UPDATE_MODAL_PATH_DATA_REQUEST, targetCnt, event);
                break;
              case LuigiInternalMessageID.CHECK_PATH_EXISTS_REQUEST:
                this.dispatch(Events.CHECK_PATH_EXISTS_REQUEST, targetCnt, event);
                break;
              case LuigiInternalMessageID.SET_DIRTY_STATUS_REQUEST:
                this.dispatch(Events.SET_DIRTY_STATUS_REQUEST, targetCnt, event);
                break;
            }
          }
        }
      };
      window.addEventListener('message', globalThis.__luigi_container_manager.messageListener);
    }

    return globalThis.__luigi_container_manager;
  }

  /**
   * Adds thisComponent's object reference the the __luigi_container_manager container list
   *
   * @param {HTMLElement} thisComponent - The HTML element that represents the current rendered container (thisComponent)
   */
  registerContainer(thisComponent: HTMLElement): void {
    this.getContainerManager().container.push(thisComponent);
  }
}

export const containerService = new ContainerService();
