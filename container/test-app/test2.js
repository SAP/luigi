import { LuigiElement } from './luigi-element.js';
export default class extends LuigiElement {
  constructor() {
    super({ openShadow: 'open', deferLuigiClientWCInit: true });
  }
  render() {
    this._shadowRoot.innerHTML = `<div>Das ist ein Test2</div`;
  }

  connectedCallback() {
    setTimeout(() => {
      this.LuigiClient.luigiClientInit();
      console.log('LuigiClient initialized for LuigiElement WC');
    }, 3000);
  }
}
