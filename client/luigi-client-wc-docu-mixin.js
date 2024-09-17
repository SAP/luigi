/**
 * <!-- label-success: Only available for Web Component based microfrontend -->
 * Publish an event that can be listened to from the container host.
 *
 * Similar to  {@link luigi-client-api.md#sendCustomMessage sendCustomMessage} but for WebComponent based microfrontends only.
 *
 * @param {CustomEvent} event Custom event to be published
 * @memberof Lifecycle
 *
 * @example
 * ** WC Container Scenario **
 * Sending a message from a WC based microfrontend to parent host
 *
 * // wcComponent.js
 * this.LuigiClient.publishEvent(new CustomEvent('sendSomeMsg', { detail: 'My own message' }));
 *
 * // host.html
 * myContainer.addEventListener('custom-message', event => {
 *   console.log('My custom message from microfrontend', event.detail.data);
 * }
 *
 *
 * ** Compound Container Scenario **
 *
 * // Sending a message from child compound microfrontend (secondChild.js) to its parent (main.html) and siblings (firstChild.js) through the event bus
 *
 *
 * // secondChild.js
 * // Set the custom event name = sendInput
 * this.LuigiClient.publishEvent(new CustomEvent('sendInput', { detail: 'My own message' }));
 *
 * // main.html
 * myContainer.addEventListener('custom-message', event => {
 *   console.log('My custom message from microfrontend', event.detail.data);
 * }
 *
 * // *Note:* eventListeners.name must match CustomEvent name above
 * // eventListeners.source = input1 = id of sibling.js, which is where the message being sent from
 * compoundConfig = {
 *  ...
 *  children: [
 *   {
 *     viewUrl: 'firstChild.js'
 *     ...
 *     eventListeners: [
 *           {
 *             source: 'input1',
 *             name: 'sendInput',
 *             action: 'update',
 *             dataConverter: data => {
 *               console.log(
 *                 'dataConverter(): Received Custom Message from "input1" MF ' + data
 *               );
 *               return 'new text: ' + data;
 *             }
 *           }
 *      ]
 *   },
 *   {
 *     viewUrl: 'secondChild.js',
 *     id: 'input1',
 *   }
 *
 */
export function publishEvent(event) {}
