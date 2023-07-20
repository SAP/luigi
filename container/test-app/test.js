import { LuigiElement } from './luigi-element.js';
export default class extends LuigiElement {
  constructor() {
    super({ openShadow: 'open', deferLuigiClientWCInit: false });
  }
  render() {
    this._shadowRoot.innerHTML = `<div>Das ist ein TESt</div`;
  }

  connectedCallback() {}
}
