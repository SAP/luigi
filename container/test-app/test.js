import { LuigiElement } from './luigi-element.js';
export default class extends LuigiElement {
  constructor() {
    super({ openShadow: 'open', deferLuigiClientWCInit: false });
  }
  render() {
    this._shadowRoot.innerHTML = `<div>This WC has <b>deferLuigiClientWCInit</b> set to <b>false</b></div`;
  }

  connectedCallback() {}
}
