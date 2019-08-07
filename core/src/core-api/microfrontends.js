import { IframeHelpers } from '../utilities/helpers';

/**
 * Microfrontends-related functions.
 * @name Microfrontends
 */
class MicrofrontendsManager {
  getMicrofrontendObjects() {
    return IframeHelpers.getMicrofrontendObjects().map(obj => ({
      id: obj.id,
      active: obj.active,
      type: obj.type
    }));
  }

  sendMessageToAll(msg, data) {
    const messageObj = { msg, data };
    this.getMicrofrontendObjects
      .map(microfrontendObj => microfrontendObj.container)
      .map(mfContainer =>
        IframeHelpers.sendMessageToIframe(mfContainer, messageObj)
      );
  }

  sendMessage(microfrontendId, msg, data) {
    const messageObj = { msg, data };
    this.getMicrofrontendObjects
      .filter(microfrontendObj => microfrontendObj.id === microfrontendId)
      .map(microfrontendObj => microfrontendObj.container)
      .map(mfContainer =>
        IframeHelpers.sendMessageToIframe(mfContainer, messageObj)
      );
  }
}

export const microfrontends = new MicrofrontendsManager();
