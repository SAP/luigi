import { LuigiElement } from './luigi-element.js';
export default class extends LuigiElement {
  constructor() {
    super({ openShadow: 'open', deferLuigiClientWCInit: false });

    const template = document.createElement('template');

    template.innerHTML = `
        <section style="display: flex; height: 100%; flex-direction: column">
          <header><slot name="header">header</slot></header>
          <main style="flex: auto; overflow: auto"><slot name="content">content</slot><slot></slot></main>
          <footer><slot name="footer">footer</slot></footer>
        </section>
      `;
    // this._shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: false });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    // this.$paragraph = this._shadowRoot.querySelector('p');
  }

  // set context(ctx) {
  //     this.$paragraph.innerHTML = ctx.label
  // }

  connectedCallback() {
    // setTimeout(() => {
    //     this.LuigiClient.luigiClientInit();
    //     console.log('LuigiClient initialized for LuigiElement WC');
    // }, 8000);
  }
}
