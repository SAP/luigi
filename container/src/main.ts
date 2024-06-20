import LuigiContainer from './LuigiContainer.svelte';
import LuigiCompoundContainer from './LuigiCompoundContainer.svelte';
import { Events } from './constants/communication';
export { default as LuigiContainer } from './LuigiContainer.svelte';
export { default as LuigiCompoundContainer } from './LuigiCompoundContainer.svelte';
export type { PathExistsEvent } from './constants/event-type';

export default Events;

if (!customElements.get('luigi-container')) {
  customElements.define('luigi-container', (LuigiContainer as any).element);
}

if (!customElements.get('luigi-compound-container')) {
  customElements.define('luigi-compound-container', (LuigiCompoundContainer as any).element);
}

if (!customElements.get('luigi-container-light')) {
  customElements.define('luigi-container-light', class extends ((LuigiContainer as any).element as CustomElementConstructor){
    getNoShadow(){
      return true;
    }
  });
}

if (!customElements.get('luigi-compound-container-light')) {
  customElements.define('luigi-compound-container-light', class extends ((LuigiCompoundContainer as any).element as CustomElementConstructor){
    getNoShadow(){
      return true;
    }
  });
}