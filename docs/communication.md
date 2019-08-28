# Communication

## Custom messages

Luigi Core and Luigi Client can exchange custom messages in two possible ways.

#### Luigi Client sends a custom message to Luigi Core

For Luigi Client, you need to use the [*sendCustomMessage*](luigi-client-api.md#sendCustomMessage) method from Client API.
For Luigi Core, you need to set something similar to the following on the root level of your Luigi configuration object:

```javascript
{
  ...
  communication: {
    customMessagesListeners: {
      'my-custom-message.update-top-nav': () => {
        Luigi.navigation().updateTopNavigation();
      }
    }
  }
  ...
}
```
where the key `'my-custom-message.update-top-nav` is the message id and the value is the listener function for the custom message. The listener receives the following input parameters:
- **customMessage** the [*message*](luigi-client-api.md#sendCustomMessage) sent by the client.
- **microfrontend** a microfrontend object as specified [here](luigi-core-api.md#getMicrofrontends).
- **navigation node** a [navigation node object](navigation-parameters-reference.md#Node-parameters).

#### Luigi Core sends a custom message to Luigi Client

For Luigi Core, you need to use the [*customMessages*](luigi-core-api.md#customMessages) section from Core API. It is possible to send a custom message to all the rendered micro frontends, or to a specific one. For the latter, you can make use of the Core API [*elements*](luigi-core-api.md#elements) methods to retrieve the micro frontends and select the one you want to send the custom message to.

For Luigi Client, you can add and remove message listeners as described [here](luigi-client-api.md#addCustomMessageListener).