import { Events } from '../constants/communication';
import { LuigiMessageID } from '../constants/internal-communication';

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

  dispatch(msg: string, targetCnt: HTMLElement, data: any, callback?: Function): void {
    let ev = new CustomEvent(msg, { detail: data });
    (ev as any).luigiCallback = data => {
      if (callback) {
        callback(data);
      }
    };
    targetCnt.dispatchEvent(ev);
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
                target.postMessage({ msg: Events.GET_CONTEXT, context: targetCnt.context || {}, internal: {} }, '*');
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
