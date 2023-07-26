import { LuigiElement } from './luigi-element.js';
export default class extends LuigiElement {
  constructor() {
    super({ openShadow: 'open', deferLuigiClientWCInit: true });

    const template = document.createElement('template');

    template.innerHTML = `
        <section style="display: flex; height: 100%; flex-direction: column">
          <header><slot name="header">header</slot></header>
          <main style="flex: auto; overflow: auto"><slot name="content">content</slot><slot></slot></main>
          <footer><slot name="footer">footer</slot></footer>
        </section>
      `;
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  set context(ctx) {
    console.log('ctx', ctx);
  }

  connectedCallback() {
    setTimeout(() => {
      this.LuigiClient.luigiClientInit();
      console.log('LuigiClient initialized for LuigiElement Compount WC');
    }, 8000);
  }
}
