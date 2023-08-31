import { Events } from '../constants/communication';
import { LuigiInternalMessageID } from '../constants/internal-communication';
import { GenericHelperFunctions } from '../utilities/helpers';

export class ContainerService {
  isVisible (component: HTMLElement) {
    return !!(component.offsetWidth || component.offsetHeight || component.getClientRects().length);
  }

  /**
   * Sends a message to the iframe either with the custom keyword or any other message name
   * @param iframeHandle the iframe to send the message to
   * @param msg the message to be sent
   * @param msgName the optional message name
   */
  sendCustomMessageToIframe (iframeHandle: any, msg: any, msgName?: string) {
    const messageName = msgName || 'custom';
    if (iframeHandle.iframe.contentWindow) {
      const iframeUrl = new URL(iframeHandle.iframe.src);
      messageName === 'custom'
        ? iframeHandle.iframe.contentWindow.postMessage({ msg: messageName, data: msg }, iframeUrl.origin)
        : iframeHandle.iframe.contentWindow.postMessage({ msg: messageName, ...msg }, iframeUrl.origin);
    } else {
      console.error('Message target could not be resolved');
    }
  }

  /**
   * Dispatch an event to the given target container
   * @param {string} msg the event message
   * @param {HTMLElement} targetCnt the targeted HTML element onto which the event is dispatched
   * @param {any} data custom data added to the event to be dispatched
   * @param {Function} callback
   * @param {string} callbackName
   */
  dispatch (msg: string, targetCnt: HTMLElement, data: any, callback?: Function, callbackName?: string): void {
    const customEvent = new CustomEvent(msg, { detail: data });
    if (callback && GenericHelperFunctions.isFunction(callback) && callbackName) {
      (customEvent as any)[callbackName] = data => {
        callback(data);
      };
    }
    targetCnt.dispatchEvent(customEvent);
  }

  getTargetContainer (event) {
    let cnt;
    globalThis.__luigi_container_manager.container.forEach(element => {
      if (element.iframeHandle?.iframe && element.iframeHandle.iframe.contentWindow === event.source) {
        cnt = element;
      }
    });

    return cnt;
  }

  getContainerManager () {
    if (!globalThis.__luigi_container_manager) {
      globalThis.__luigi_container_manager = {
        container: [],
        messageListener: event => {
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
                    internal: {}
                  },
                  '*'
                );
                break;
              case LuigiInternalMessageID.NAVIGATION_REQUEST:
                this.dispatch(Events.NAVIGATION_REQUEST, targetCnt, event.data.params);
                break;
              // TODO 1: handle alerts with ids on next iteration
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
              // TODO: discuss if actually needed as the only scenario is when microfrontend initially starts
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
              case 'luigi.third-party-cookie':
                // TODO: check if needed
                break;
              default:
                console.warn('Functionality not yet implemented: ', msg);
                break;
            }
          }
        }
      };
      window.addEventListener('message', globalThis.__luigi_container_manager.messageListener);
    }
    return globalThis.__luigi_container_manager;
  }

  registerContainer (container: HTMLElement): void {
    this.getContainerManager().container.push(container);
  }
}

export const containerService = new ContainerService();
