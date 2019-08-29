class Communication {
  customMessagesListeners = {
    'my-custom-message.update-top-nav': () => {
      Luigi.navigation().updateTopNavigation();
    },
    'my-custom-message.test-example': (customMessage, mfObject, mfNodeObj) => {
      console.info(
        `Core has received custom message: ${JSON.stringify(
          customMessage
        )} from microfrontend ${JSON.stringify(
          mfObject
        )}. Node information: ${JSON.stringify(mfNodeObj)}`
      );

      Luigi.showAlert({
        text: `Custom message received: ${JSON.stringify(customMessage)}`,
        type: 'success',
        closeAfter: 3000
      });

      setTimeout(() => {
        const newCustomMessage = {
          id: 'luigi.my-custom-message-for-client',
          description: 'here goes the message description'
        };
        Luigi.customMessage().send(mfObject.id, newCustomMessage);
      }, 2000);
    }
  };
}

export const communication = new Communication();
