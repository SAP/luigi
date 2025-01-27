import { LuigiElement } from './../luigi-element.js';
export default class extends LuigiElement {
  constructor() {
    super({ openShadow: 'open', deferLuigiClientWCInit: false });
    const template = document.createElement('template');

    //remove buttons after review/AC
    template.innerHTML = `
        <section style="display: flex; height: 100%; flex-direction: column">
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem">
            <button id="addNodeParams">addNodeParams</button>
            <button id="getNodeParams">getNodeParams</button>
            <button id="getCurrentTheme">getCurrentTheme</button>
            <button id="getDirtyStatus">getDirtyStatus</button>
            <button id="removeBackdrop">removeBackdrop</button>
            <button id="getAnchor">getAnchor</button>
            <button id="getUserSettings">getUserSettings</button>
            <button id="setViewGroupData">setViewGroupData</button>
            <button id="navigateToIntent">navigateToIntent</button>
            <button id="fromParent">fromParent</button>
          </div>
          <header><slot name="header">header</slot></header>
          <main style="flex: auto; overflow: auto">
            <slot name="content">content</slot>
            <slot name="helloWorldSelfRegistered"></slot>
          </main>
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
    this.$button3 = this._shadowRoot.querySelector('#getCurrentTheme');
    this.$button3.addEventListener('click', () => {
      console.log('getCurrentTheme', this.LuigiClient.uxManager().getCurrentTheme());
    });
    this.$button4 = this._shadowRoot.querySelector('#getDirtyStatus');
    this.$button4.addEventListener('click', () => {
      console.log('getDirtyStatus', this.LuigiClient.uxManager().getDirtyStatus());
    });
    this.$button5 = this._shadowRoot.querySelector('#removeBackdrop');
    this.$button5.addEventListener('click', () => {
      this.LuigiClient.uxManager().removeBackdrop();
      console.log('removeBackdrop has been called');
    });
    this.$button6 = this._shadowRoot.querySelector('#getAnchor');
    this.$button6.addEventListener('click', () => {
      console.log('getAnchor', this.LuigiClient.getAnchor());
    });
    this.$button7 = this._shadowRoot.querySelector('#getUserSettings');
    this.$button7.addEventListener('click', () => {
      console.log('getUserSettings', this.LuigiClient.getUserSettings());
    });
    this.$button8 = this._shadowRoot.querySelector('#setViewGroupData');
    this.$button8.addEventListener('click', () => {
      this.LuigiClient.setViewGroupData({ vg: 'some data' });
      console.log('setViewGroupData has been called');
    });
    this.$button9 = this._shadowRoot.querySelector('#navigateToIntent');
    this.$button9.addEventListener('click', () => {
      this.LuigiClient.linkManager().navigateToIntent('Sales-setting');
      console.log('navigateToIntent has been called');
    });
    this.$button10 = this._shadowRoot.querySelector('#fromParent');
    this.$button10.addEventListener('click', () => {
      this.LuigiClient.linkManager().fromParent().getCurrentRoute();
      console.log('fromParent has been called');
    });
  }

  connectedCallback() {
    setTimeout(() => {
      this.LuigiClient.luigiClientInit();
      console.log('LuigiClient initialized for LuigiElement Compount WC');
    }, 8000);
  }

  set context(ctx) {
    console.log('context', ctx);
  }
}
