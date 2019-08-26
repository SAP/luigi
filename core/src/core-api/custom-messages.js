import { IframeHelpers } from '../utilities/helpers';
import { MessagesListeners } from '../services/messages-listeners';

/**
 * Custom messages related functions.
 * @name CustomMessages
 */
class CustomMessagesManager {
  /**
   * Sends a custom message to all opened microfrontends
   * @param {Object} message an object containing data to be sent to the micro frontend for further processing. This object will be set as input parameter of the custom message listener on the micro frontend side.
   * @param {string} message.id the id of the message 
   * @param {mixed} message.MY_DATA_FIELD any other message data field
   * @example
    Luigi.customMessages().sendToAll({
        id: 'myprefix.my-custom-message-for-client',
        dataField1: 'here goes some data'
        moreData: 'here goes some more'
    });
   * @memberof CustomMessages
   */
  sendToAll(message) {
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
   * Use Luigi.elements().getMicrofrontends() to get the iframe id.
   * @param {microfrontendId} number the id of the micro frontend.
   * @param {Object} message an object containing data to be sent to the micro frontend for further processing. This object will be set as input parameter of the custom message listener on the micro frontend side.
   * @param {string} message.id the id of the message
   * @param {mixed} message.MY_DATA_FIELD any other message data field
   * @example
    Luigi.customMessages().send(microfrontend.id, {
        id: 'myprefix.my-custom-message-for-client',
        dataField1: 'here goes some data'
        moreData: 'here goes some more'
    });
   * @memberof CustomMessages
   */
  send(microfrontendId, message) {
    const internalMessage = MessagesListeners.convertCustomMessageUserToInternal(
      message
    );
    IframeHelpers.getMicrofrontendsInDom()
      .filter(microfrontendObj => microfrontendObj.id === microfrontendId)
      .map(microfrontendObj => microfrontendObj.container)
      .map(mfContainer =>
        IframeHelpers.sendMessageToIframe(mfContainer, internalMessage)
      );
  }
}

export const customMessages = new CustomMessagesManager();
