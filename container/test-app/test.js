import { LuigiElement } from 'https://unpkg.com/@luigi-project/client@2.2.1/luigi-element.js';
export default class extends LuigiElement {
  constructor() {
    super({ openShadow: 'open', deferLuigiClientWCInit: false });
  }
  render() {
    this._shadowRoot.innerHTML = `<div>Das ist ein TESt</div`;
  }

  connectedCallback() {
    setTimeout(() => {
      this.LuigiClient.luigiClientInit();
    }, 3000);
  }
}
