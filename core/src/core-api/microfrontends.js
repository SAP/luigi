import { IframeHelpers } from '../utilities/helpers';

/**
 * Microfrontends-related functions.
 * @name Microfrontends
 */
class MicrofrontendsManager {
  getMicrofrontends() {
    return IframeHelpers.getMicrofrontends().map(obj => ({
      id: obj.id,
      active: obj.active,
      type: obj.type
    }));
  }

  sendMessageToAll(messageData) {
    IframeHelpers.getMicrofrontends()
      .map(microfrontendObj => microfrontendObj.container)
      .map(mfContainer =>
        IframeHelpers.sendMessageToIframe(mfContainer, messageData)
      );
  }

  sendMessage(microfrontendId, messageData) {
    IframeHelpers.getMicrofrontends()
      .filter(microfrontendObj => microfrontendObj.id === microfrontendId)
      .map(microfrontendObj => microfrontendObj.container)
      .map(mfContainer =>
        IframeHelpers.sendMessageToIframe(mfContainer, messageData)
      );
  }
}

export const microfrontends = new MicrofrontendsManager();
