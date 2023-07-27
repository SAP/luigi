import { LuigiElement } from './luigi-element.js';
export default class extends LuigiElement {
  constructor() {
    super({ openShadow: 'open', deferLuigiClientWCInit: true });
  }
  render() {
    this._shadowRoot.innerHTML = `<div>This WC is used to test manual initialization of a WebComponent when deferLuigiClientWCInit is set to <b>true</b></div`;
  }

  connectedCallback() {
    setTimeout(() => {
      this.LuigiClient.luigiClientInit();
      console.log('LuigiClient initialized for LuigiElement WC');
    }, 3000);
  }
}
