import { IframeHelpers } from '../utilities/helpers';
import { MessagesListeners } from '../services/messages-listeners';

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
   * Sends a custom message to all opened microfrontends
   * @param {Object} message an object containing data to be sent to the micro frontend for further processing. This object will be set as input parameter of the custom message listener on the micro frontend side.
   * @param {string} message.id the id of the message 
   * @param {mixed} message.YOUR_DATA_FIELD
   * @example
    Luigi.microfrontends().sendCustomMessageToAll({
      id: 'myprefix.my-custom-message-for-client',
      dataField1: 'here goes some data'
      moreData: 'here goes some more'
    });
   * @memberof Microfrontends
   */
  sendCustomMessageToAll(message) {
    const internalMessage = MessagesListeners.convertCustomMessageUserToInternal(
      message
    );
    IframeHelpers.getMicrofrontends()
      .map(microfrontendObj => microfrontendObj.container)
      .map(mfContainer =>
        IframeHelpers.sendMessageToIframe(mfContainer, internalMessage)
      );
  }

  /**
   * Sends a message to specific microfrontend identified by an id
   * Use Luigi.microfrontends().getMicrofrontends() to get the iframe id.
   * @param {Object} message an object containing data to be sent to the micro frontend for further processing. This object will be set as input parameter of the custom message listener on the micro frontend side.
   * @param {string} message.id the id of the message
   * @param {mixed} message.YOUR_DATA_FIELD
   * @example
    Luigi.microfrontends().sendCustomMessage(microfrontend.id, {
      id: 'myprefix.my-custom-message-for-client',
      dataField1: 'here goes some data'
      moreData: 'here goes some more'
    });
   * @memberof Microfrontends
   */
  sendCustomMessage(microfrontendId, message) {
    const internalMessage = MessagesListeners.convertCustomMessageUserToInternal(
      message
    );
    IframeHelpers.getMicrofrontends()
      .filter(microfrontendObj => microfrontendObj.id === microfrontendId)
      .map(microfrontendObj => microfrontendObj.container)
      .map(mfContainer =>
        IframeHelpers.sendMessageToIframe(mfContainer, internalMessage)
      );
  }
}

export const microfrontends = new MicrofrontendsManager();
