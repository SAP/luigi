import { LuigiElement } from 'https://unpkg.com/@luigi-project/client@2.2.2-dev.202307191937/luigi-element.js';
export default class extends LuigiElement {
  constructor() {
    super({ openShadow: 'open', deferLuigiClientWCInit: true });
  }
  render() {
    this._shadowRoot.innerHTML = `<div>Das ist ein TESt</div`;
  }

  connectedCallback() {
    setTimeout(() => {
      this.LuigiClient.luigiClientInit();
      console.log('LuigiClient initialized for LuigiElement WC');
    }, 3000);
  }
}
