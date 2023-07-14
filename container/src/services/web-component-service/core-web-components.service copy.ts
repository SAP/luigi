import { DefaultCompoundRenderer, resolveRenderer, registerEventListeners } from './../web-component-helpers';
import { ContainerService } from './../container.service';
import { AbstractWCService } from './abstract-web-components.service';

/** Methods for dealing with web components based micro frontend handling */
export class CoreWCService extends AbstractWCService {
  createClientAPI(eventBusElement, nodeId: string, wc_id: string) {
    return {
      linkManager: () => {}, //window.Luigi.navigation,
      uxManager: () => {
        return {
          showAlert: alertSettings => {},
          showConfirmationModal: async settings => {
            return new Promise((resolve, reject) => {
              resolve(true);
            });
          }
        };
      }, //window.Luigi.ux,
      getCurrentLocale: () => {
        // return webComponent.locale;
      }, //() => window.Luigi.i18n().getCurrentLocale(),
      publishEvent: ev => {
        // if (eventBusElement.eventBus) {
        // eventBusElement.eventBus.onPublishEvent(ev, nodeId, wc_id);
        // }
      }
    };
  }
}
