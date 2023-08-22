import LuigiContainer from './LuigiContainer.svelte';
import LuigiCompoundContainer from './LuigiCompoundContainer.svelte';
import { Events } from './constants/communication';
export { default as LuigiContainer } from './LuigiContainer.svelte';
export { default as LuigiCompoundContainer } from './LuigiCompoundContainer.svelte';
export default Events;

if (!customElements.get('luigi-container')) {
  customElements.define('luigi-container', LuigiContainer.element);
}

if (!customElements.get('luigi-compound-container')) {
  customElements.define('luigi-compound-container', LuigiCompoundContainer.element);
}
