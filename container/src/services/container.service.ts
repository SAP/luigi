export class ContainerService {
  constructor() {}

  isVisible(component: HTMLElement) {
    return !!(component.offsetWidth || component.offsetHeight || component.getClientRects().length);
  }

  dispatch(msg: string, targetCnt: HTMLElement, data: any, callback?: Function): void {
    let ev = new CustomEvent(msg, { detail: data });
    (ev as any).luigiCallback = data => {
      if (callback) {
        callback(data);
      }
    };
    targetCnt.dispatchEvent(ev);
    console.log('Dispatch WC event:', msg, targetCnt, data);
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
          console.log('Container event', event, targetCnt);
          if (target === event.source && event.data?.msg?.indexOf('luigi.') === 0) {
            const msg = event.data.msg;

            switch (msg) {
              case 'luigi.get-context':
                target.postMessage({ msg: 'luigi.init', context: targetCnt.context, internal: {} }, '*');
                break;
              case 'luigi.navigation.open':
                this.dispatch('navigation-request', targetCnt, event.data.params);
                break;
              case 'luigi.ux.alert.show':
                this.dispatch('alert-request', targetCnt, event.data.params);
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

  registerContainer(container: HTMLElement) {
    this.getContainerManager().container.push(container);
  }
}
