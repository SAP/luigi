class MessagesListenersClass {
  convertCustomMessageInternalToUser(internalMessage) {
    return internalMessage.data;
  }

  convertCustomMessageUserToInternal(message) {
    return {
      msg: 'custom',
      data: message
    };
  }
}

export const MessagesListeners = new MessagesListenersClass();
