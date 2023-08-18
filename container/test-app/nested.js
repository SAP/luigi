import { LuigiElement } from './luigi-element.js';
export default class extends LuigiElement {
  constructor() {
    super({ openShadow: 'open', deferLuigiClientWCInit: false });

    const template = document.createElement('template');
    //remove buttons after review/AC
    template.innerHTML = `
        <section style="display: flex; height: 100%; flex-direction: column">
          <button id="addNodeParams">addNodeParams</button>
          <button id="getNodeParams">getNodeParams</button>
          <header><slot name="header">header</slot></header>
          <main style="flex: auto; overflow: auto"><slot name="content">content</slot><slot></slot></main>
          <footer><slot name="footer">footer</slot></footer>
        </section>
      `;
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$button = this._shadowRoot.querySelector('#addNodeParams');
    this.$button.addEventListener('click', () => {
      this.LuigiClient.addNodeParams({ Luigi: 'rocks' }, true);
    });
    this.$button2 = this._shadowRoot.querySelector('#getNodeParams');
    this.$button2.addEventListener('click', () => {
      console.log('getNodeParams', this.LuigiClient.getNodeParams());
    });
  }

  connectedCallback() {
    setTimeout(() => {
      this.LuigiClient.luigiClientInit();
      console.log('LuigiClient initialized for LuigiElement Compount WC');
    }, 8000);
  }
}
