import { DefaultCompoundRenderer, resolveRenderer, registerEventListeners } from '../web-component-helpers';
import { AbstractWebComponentService } from './abstract-web-components.service';

/** Methods for dealing with web components based micro frontend handling */
export class ContainerWebComponentService extends AbstractWebComponentService {
  thisComponent: any;

  dispatchLuigiEvent(msg: string, data: any, callback?: Function) {
    this.containerService.dispatch(msg, this.thisComponent, data, callback);
  }

  createClientAPI(eventBusElement, nodeId: string, wc_id: string) {
    return {
      linkManager: () => {
        return {
          navigate: route => {
            this.dispatchLuigiEvent('navigation-request', { link: route });
          }
        };
      },
      uxManager: () => {
        return {
          showAlert: alertSettings => {
            this.dispatchLuigiEvent('alert-request', alertSettings);
          },
          showConfirmationModal: async settings => {
            return new Promise((resolve, reject) => {
              this.dispatchLuigiEvent('confirmation-request', settings, data => {
                if (data) {
                  resolve(data);
                } else {
                  reject();
                }
              });
            });
          }
        };
      }, //window.Luigi.ux,
      getCurrentLocale: () => {}, //() => window.Luigi.i18n().getCurrentLocale(),
      publishEvent: ev => {
        // if (eventBusElement.eventBus) {
        // eventBusElement.eventBus.onPublishEvent(ev, nodeId, wc_id);
        // }
      }
    };
  }
}
