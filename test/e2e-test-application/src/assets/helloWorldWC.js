export default class extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `<section><p>Hello World!</p></section>`;

    const templateBtn = document.createElement('template');
    templateBtn.innerHTML = '<button id="clickme">Click me!</button>';

    const empty = document.createElement('template');
    empty.innerHTML = `<section><p>Test!</p><br/><br/></section>`;

    const setAnchorBtn = document.createElement('template');
    setAnchorBtn.innerHTML = `<button id="setAnchor">setAnchor</button>`;
    const getNodeParamsBtn = document.createElement('template');
    getNodeParamsBtn.innerHTML = `<button id="getNodeParams">getNodeParams</button>`;

    const addNodeParamsBtn = document.createElement('template');
    addNodeParamsBtn.innerHTML = `<button id="addNodeParams">addNodeParams</button>`;

    this._shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: false
    });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._shadowRoot.appendChild(templateBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(setAnchorBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(getNodeParamsBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(addNodeParamsBtn.content.cloneNode(true));

    for (let index = 0; index < 20; index++) {
      this._shadowRoot.appendChild(empty.content.cloneNode(true));
    }

    this.$paragraph = this._shadowRoot.querySelector('p');
    this.$button = this._shadowRoot.querySelector('#clickme');
    this.$button.addEventListener('click', () => {
      if (this.LuigiClient) {
        this.LuigiClient.uxManager().showAlert({
          text: 'Hello from uxManager in Web Component, Language:' + this.LuigiClient.getCurrentLocale(),
          type: 'info'
        });

        window.Luigi.featureToggles().setFeatureToggle('ft1');

        this.LuigiClient.uxManager().showAlert({
          text: 'Active feature toggles list: ' + this.LuigiClient.getActiveFeatureToggleList(),
          type: 'info'
        });

        this.LuigiClient.uxManager().showAlert({
          text: 'Active feature toggles: ' + this.LuigiClient.getActiveFeatureToggles(),
          type: 'info'
        });
      }
    });

    this.$button2 = this._shadowRoot.querySelector('#setAnchor');
    this.$button2.addEventListener('click', () => {
      this.LuigiClient.setAnchor('LuigiRocks');
    });
    this.$button3 = this._shadowRoot.querySelector('#getNodeParams');
    this.$button3.addEventListener('click', () => {
      let nodeParams = this.LuigiClient.getNodeParams();
      alert(JSON.stringify(nodeParams));
    });
    this.$button4 = this._shadowRoot.querySelector('#addNodeParams');
    this.$button4.addEventListener('click', () => {
      this.LuigiClient.addNodeParams({ Luigi: 'rocks' });
    });
  }

  set context(ctx) {
    this.$paragraph.innerHTML = ctx.title;
  }
}
