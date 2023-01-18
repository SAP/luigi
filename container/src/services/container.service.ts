import { Events } from '../constants/communication';
import { LuigiMessageID } from '../constants/internal-communication';
import { GenericHelperFunctions } from '../utilities/helpers';
import { LuigiCoreApi } from '../constants/core-api';

export class ContainerService {
  constructor() { }

  isVisible(component: HTMLElement) {
    return !!(component.offsetWidth || component.offsetHeight || component.getClientRects().length);
  }

  sendCustomMessageToIframe(iframeHandle: any, msg: any) {
    if (iframeHandle.iframe.contentWindow) {
      const iframeUrl = new URL(iframeHandle.iframe.src);
      iframeHandle.iframe.contentWindow.postMessage({ msg: 'custom', data: msg }, iframeUrl.origin);
    } else {
      console.error('Message target could not be resolved');
    }
  }

  dispatch(msg: string, targetCnt: HTMLElement, data: any, callback?: Function, callbackName?: string): void {
    let customEvent = new CustomEvent(msg, { detail: data });
    if (callback && GenericHelperFunctions.isFunction(callback) && callbackName) {
      (customEvent as any)[callbackName] = data => {
        callback(data);
      };
    }
    targetCnt.dispatchEvent(customEvent);
  }

  getTargetContainer(event) {
    let cnt;
    globalThis.__luigi_container_manager.container.forEach(element => {
      if (element.iframeHandle?.iframe && element.iframeHandle.iframe.contentWindow === event.source) {
        cnt = element;
      }
    });

    return cnt;
  }

  getContainerManager() {
    if (!globalThis.__luigi_container_manager) {
      globalThis.__luigi_container_manager = {
        container: [],
        messageListener: event => {
          const targetCnt = this.getTargetContainer(event);
          const target = targetCnt?.iframeHandle?.iframe?.contentWindow;
          if (target === event.source && (event.data?.msg?.indexOf('luigi.') === 0 || event.data?.msg === 'custom')) {
            // messages emitted from microfrontends
            const msg = event.data.msg;

            // dispatch an event depending on message
            switch (msg) {
              case LuigiMessageID.CUSTOM_MESSAGE:
                this.dispatch(Events.CUSTOM_MESSAGE, targetCnt, event.data.data);
                break;
              case LuigiMessageID.GET_CONTEXT:
                // re-evaluate whether to use postMessage vs this.dispatch and why ?
                // target.postMessage({ msg: Events.GET_CONTEXT_REQUEST, context: targetCnt.context || {}, internal: {} }, '*');
                this.dispatch(Events.GET_CONTEXT_REQUEST, targetCnt, event.data, (data: any) => {
                  console.log('Callback called: Received data from Core sending inside MF', data);
                  target.postMessage({ msg: LuigiMessageID.SEND_CONTEXT, context: data }, '*')
                }, LuigiCoreApi.SEND_CONTEXT_TO_MICROFRONTEND);
                break;
              case LuigiMessageID.NAVIGATION_REQUEST:
                this.dispatch(Events.NAVIGATION_REQUEST, targetCnt, event.data.params);
                break;
              case LuigiMessageID.ALERT_REQUEST:
                this.dispatch(Events.ALERT_REQUEST, targetCnt, event.data.params);
                break;
              case LuigiMessageID.INITIALIZED:
                this.dispatch(Events.INITIALIZED, targetCnt, event.data.params);
                break;
              case LuigiMessageID.ADD_SEARCH_PARAMS_REQUEST:
                this.dispatch(Events.ADD_SEARCH_PARAMS_REQUEST, targetCnt, { data: event.data.data, keepBrowserHistory: event.data.keepBrowserHistory });
                break;
              case LuigiMessageID.ADD_NODE_PARAMS_REQUEST:
                this.dispatch(Events.ADD_NODE_PARAMS_REQUEST, targetCnt, { data: event.data.data, keepBrowserHistory: event.data.keepBrowserHistory });
                break;
              case LuigiMessageID.SHOW_CONFIRMATION_MODAL_REQUEST:
                this.dispatch(Events.SHOW_CONFIRMATION_MODAL_REQUEST, targetCnt, event.data.data);
                break;
              case LuigiMessageID.SHOW_LOADING_INDICATOR_REQUEST:
                this.dispatch(Events.SHOW_LOADING_INDICATOR_REQUEST, targetCnt, event);
                break;
              case LuigiMessageID.HIDE_LOADING_INDICATOR_REQUEST:
                this.dispatch(Events.HIDE_LOADING_INDICATOR_REQUEST, targetCnt, event);
                break;
              case LuigiMessageID.SET_CURRENT_LOCALE_REQUEST:
                this.dispatch(Events.SET_CURRENT_LOCALE_REQUEST, targetCnt, event);
                break;
              case LuigiMessageID.LOCAL_STORAGE_SET_REQUEST:
                this.dispatch(Events.LOCAL_STORAGE_SET_REQUEST, targetCnt, event);
                break;
              case LuigiMessageID.RUNTIME_ERROR_HANDLING_REQUEST:
                this.dispatch(Events.RUNTIME_ERROR_HANDLING_REQUEST, targetCnt, event);
                break;
              case LuigiMessageID.SET_ANCHOR_LINK_REQUEST:
                this.dispatch(Events.SET_ANCHOR_LINK_REQUEST, targetCnt, event);
                break;
              case LuigiMessageID.SET_THIRD_PARTY_COOKIES_REQUEST:
                this.dispatch(Events.SET_THIRD_PARTY_COOKIES_REQUEST, targetCnt, event);
                break;
              case LuigiMessageID.BACK_NAVIGATION_REQUEST:
                this.dispatch(Events.BACK_NAVIGATION_REQUEST, targetCnt, event);
                break;
              case LuigiMessageID.GET_CURRENT_ROUTE_REQUEST:
                this.dispatch(Events.GET_CURRENT_ROUTE_REQUEST, targetCnt, event);
                break;
              case LuigiMessageID.NAVIGATION_COMPLETED_REPORT:
                this.dispatch(Events.NAVIGATION_COMPLETED_REPORT, targetCnt, event);
                break;
              case LuigiMessageID.UPDATE_MODAL_PATH_DATA_REQUEST:
                this.dispatch(Events.UPDATE_MODAL_PATH_DATA_REQUEST, targetCnt, event);
                break;
              case LuigiMessageID.CHECK_PATH_EXISTS_REQUEST:
                this.dispatch(Events.CHECK_PATH_EXISTS_REQUEST, targetCnt, event);
                break;
              case LuigiMessageID.SET_DIRTY_STATUS_REQUEST:
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

  registerContainer(container: HTMLElement): void {
    this.getContainerManager().container.push(container);
  }
}
