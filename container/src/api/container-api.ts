import { LuigiInternalMessageID } from '../constants/internal-communication';
import { containerService } from '../services/container.service';

export class ContainerAPIFunctions {
  /**
   * Updates the context of the microfrontend by sending a message to the iframe that sets the context of the microfrontend
   * @param contextObj The context data
   * @param internal internal luigi legacy data
   * @param iframeHandle a reference to the iframe that is needed to send a message to it internally
   */
  updateContext = (contextObj: any, internal?: any, iframeHandle?: any) => {
    if (iframeHandle) {
      const internalParameter = internal || {};
      containerService.sendCustomMessageToIframe(
        iframeHandle,
        {
          context: contextObj,
          internal: internalParameter
        },
        LuigiInternalMessageID.SEND_CONTEXT_OBJECT
      );
    } else {
      console.warn('Attempting to update context on inexisting iframe');
    }
  };

  /**
   * Send a custom message to the referenced iframe or web component
   * @param id the id of the web component
   * @param mainComponent a reference to the web component to be affected
   * @param isWebcomponent predicate showing if currently referencing a web component or not
   * @param iframeHandle a reference to the iframe to be affected
   * @param data data to be sent alongside the custom message
   */
  sendCustomMessage = (id: string, mainComponent: any, isWebcomponent: boolean, iframeHandle: any, data?: any) => {
    if (isWebcomponent && (mainComponent as any)._luigi_mfe_webcomponent) {
      containerService.dispatch(id, (mainComponent as any)._luigi_mfe_webcomponent, data);
    } else {
      const msg = { ...data };
      if (msg.id) {
        console.warn('Property "id" is reserved and can not be used in custom message data');
      }
      msg.id = id;
      containerService.sendCustomMessageToIframe(iframeHandle, msg);
    }
  };

  /**
   * Send a message to the microfrontend notifying the alert has been closed
   * @param id the id of the alert being closed
   * @param dismissKey the dismiss key being sent if any
   * @param iframeHandle the handle of the iframe to send the message to
   */
  closeAlert (id: any, dismissKey: any, iframeHandle: any) {
    containerService.sendCustomMessageToIframe(iframeHandle, { id, dismissKey }, LuigiInternalMessageID.ALERT_CLOSED);
  }
}

export const ContainerAPI = new ContainerAPIFunctions();
