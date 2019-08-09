import { IframeHelpers } from '../utilities/helpers';

/**
 * Microfrontends-related functions.
 * @name Microfrontends
 */
class MicrofrontendsManager {
  /**
   * Returns a list of all available microfrontends
   * @returns {array} list of objects containing the id, the active state (visible, not preserved) and the type (iframe, modal, split-view)
   * @example
    Luigi.microfrontends().getMicrofrontends();
   * @memberof Microfrontends
   */
  getMicrofrontends() {
    return IframeHelpers.getMicrofrontends().map(obj => ({
      id: obj.id,
      active: obj.active,
      type: obj.type
    }));
  }

  /**
   * Sends a message to all opened microfrontends which is typically
   * retrieved by LuigiClient.addCustomEventListener(msg, callback).
   * @param {string} messageData.msg the name of the message 
   * @param {mixed} messageData.data
   * @example
    Luigi.microfrontends().sendMessageToAll({
      msg: 'myprefix.my-custom-message-for-client',
      data: 'here goes the data'
    });
   * @memberof Microfrontends
   */
  sendMessageToAll(messageData) {
    IframeHelpers.getMicrofrontends()
      .map(microfrontendObj => microfrontendObj.container)
      .map(mfContainer =>
        IframeHelpers.sendMessageToIframe(mfContainer, messageData)
      );
  }

  /**
   * Sends a message to specific microfrontend identified by an id
   * Use Luigi.microfrontends().getMicrofrontends() to get the iframe id.
   * @param {string} messageData.msg the name of the message 
   * @param {mixed} messageData.data
   * @example
    Luigi.microfrontends().sendMessage(microfrontend.id, {
      msg: 'myprefix.my-custom-message-for-client',
      data: 'here goes the data'
    });
   * @memberof Microfrontends
   */
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
