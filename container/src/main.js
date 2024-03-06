import LuigiContainer from './LuigiContainer.svelte';
import LuigiCompoundContainer from './LuigiCompoundContainer.svelte';
import { Events } from './constants/communication';
// import  PathExistsEvent   from './constants/event-type.ts';
export { default as LuigiContainer } from './LuigiContainer.svelte';
export { default as LuigiCompoundContainer } from './LuigiCompoundContainer.svelte';
// export { default as PathExistsEvent } from './constants/event-type.ts';

// export { PathExistsEvent }  from './constants/event-type';

export default Events;

if (!customElements.get('luigi-container')) {
  customElements.define('luigi-container', LuigiContainer.element);
}

if (!customElements.get('luigi-compound-container')) {
  customElements.define('luigi-compound-container', LuigiCompoundContainer.element);
}
