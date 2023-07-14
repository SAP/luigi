import { DefaultCompoundRenderer, resolveRenderer, registerEventListeners } from '../web-component-helpers';
import { ContainerService } from '../container.service';
import { AbstractWCService } from './abstract-web-components.service';

/** Methods for dealing with web components based micro frontend handling */
export class CompoundContainerWCService extends AbstractWCService {
  thisComponent: any;

  dispatchLuigiEvent(msg, data, callback) {
    this.containerService.dispatch(msg, this.thisComponent, data, callback);
  }

  createClientAPI(eventBusElement, nodeId: string, wc_id: string) {
    return {
      linkManager: () => { }, //window.Luigi.navigation,
      uxManager: () => {
        return {
          showAlert: alertSettings => {
            this.dispatchLuigiEvent('alert-request', alertSettings, {});
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
      getCurrentLocale: () => { }, //() => window.Luigi.i18n().getCurrentLocale(),
      publishEvent: ev => {
        if (eventBusElement && eventBusElement.eventBus) {
          eventBusElement.eventBus.onPublishEvent(ev, nodeId, wc_id);
        }
      }
    };
  }
}
