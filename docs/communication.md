# Communication

>NOTE: For testing and learning purposes, you can use the [Luigi Fiddle page](https://fiddle.luigi-project.io) where you can configure a sample Luigi application.

## Custom messages

Luigi Core and Luigi Client can exchange custom messages in both directions.

### Luigi Client to Luigi Core

For Luigi Client to send messages to Luigi Core, use the [*sendCustomMessage*](luigi-client-api.md#sendCustomMessage) method from Client API.

For Luigi Core to process custom messages, define a configuration similar to the following at the root level of your Luigi configuration object:

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
where the `my-custom-message.update-top-nav` key is the message id, and the value is the listener function for the custom message. The listener receives the following input parameters:
- **customMessage** the [*message*](luigi-client-api.md#sendCustomMessage) sent by Luigi Client.
- **microfrontend** a micro frontend object as specified [here](luigi-core-api.md#getMicrofrontends).
- **navigation node** a [navigation node object](navigation-parameters-reference.md#Node-parameters).

### Luigi Core to Luigi Client

For Luigi Core to send messages, use the [*customMessages*](luigi-core-api.md#customMessages) section from Core API. You can send a custom message to all rendered micro frontends, or to a specific one. For the latter, use the Core API [*elements*](luigi-core-api.md#elements) methods to retrieve micro frontends and select the one you want to send the custom message to.

For Luigi Client to process the message, add and remove message listeners as described [here](luigi-client-api.md#addCustomMessageListener).
