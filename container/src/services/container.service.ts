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
              case 'custom':
                console.log('Test', targetCnt, event)
                this.dispatch('custom-message', targetCnt, event.data.data);
                break;
              case 'luigi.get-context':
                target.postMessage({ msg: 'luigi.init', context: targetCnt.context || {}, internal: {} }, '*');
                break;
              case 'luigi.navigation.open':
                this.dispatch('navigation-request', targetCnt, event.data.params);
                break;
              case 'luigi.ux.alert.show':
                this.dispatch('alert-request', targetCnt, event.data.params);
                break;
              case 'luigi.init.ok':
                this.dispatch('initialized', targetCnt, event.data.params);
                break;


              // what it is
              case 'luigi.addSearchParams':
                this.dispatch('add-search-params-request', targetCnt, event.data.params);
                break;

              // what it is
              case 'luigi.addNodeParams':
                this.dispatch('add-node-params-request', targetCnt, event.data.params);
                break;

              // what it is
              case 'luigi.ux.confirmationModal.show':
                this.dispatch('show-confirmation-modal-request', targetCnt, event.data.params);
                break;

              // what it is
              case 'luigi.show-loading-indicator ':
                this.dispatch('show-loading-indicator', targetCnt, event.data.params);
                break;

              // what it is
              case 'luigi.hide-loading-indicator ':
                this.dispatch('hide-loading-indicator', targetCnt, event.data.params);
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
