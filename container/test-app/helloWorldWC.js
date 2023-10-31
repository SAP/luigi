/**
 * This class is used to test LuigiClient webcomponent based functionality
 */
export default class extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `<section><p>Hello World!</p></section>`;

    const templateBtn = document.createElement('template');
    templateBtn.innerHTML = '<button id="aButton">Click me!</button>';

    const templateBtn2 = document.createElement('template');
    templateBtn2.innerHTML = '<button class="button2">Publish event</button>';

    const addNodeParamsBtn = document.createElement('template');
    addNodeParamsBtn.innerHTML = '<button id="addNodeParams">add node params</button>';

    const getNodeParamsBtn = document.createElement('template');
    getNodeParamsBtn.innerHTML = '<button id="getNodeParams">get node params</button>';

    const setAnchorBtn = document.createElement('template');
    setAnchorBtn.innerHTML = '<button id="setAnchor">setAnchor</button>';

    const getCoreSearchParamsBtn = document.createElement('template');
    getCoreSearchParamsBtn.innerHTML = '<button id="coreSearchParams">getCoreSearchParams</button>';

    const getPathParamsBtn = document.createElement('template');
    getPathParamsBtn.innerHTML = '<button id="getPathParams">getPathParams</button>';

    const getClientPermissionsBtn = document.createElement('template');
    getClientPermissionsBtn.innerHTML = '<button id="getClientPermissions">getClientPermissions</button>';

    const empty = document.createElement('template');
    empty.innerHTML = `<section><p>Test!</p><br/><br/></section>`;

    const getUserSettingsBtn = document.createElement('template');
    getUserSettingsBtn.innerHTML = '<button id="getUserSettings">getUserSettings</button>';

    const getAnchorBtn = document.createElement('template');
    getAnchorBtn.innerHTML = '<button id="getAnchor">getAnchor</button>';

    this._shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: false
    });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._shadowRoot.appendChild(templateBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(templateBtn2.content.cloneNode(true));
    this._shadowRoot.appendChild(addNodeParamsBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(getNodeParamsBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(setAnchorBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(getCoreSearchParamsBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(getPathParamsBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(getClientPermissionsBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(getUserSettingsBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(getAnchorBtn.content.cloneNode(true));

    for (let index = 0; index < 10; index++) {
      this._shadowRoot.appendChild(empty.content.cloneNode(true));
    }

    this.$paragraph = this._shadowRoot.querySelector('p');
    this.$button = this._shadowRoot.querySelector('#aButton');
    this.$button.addEventListener('click', () => {
      if (this.LuigiClient) {
        this.LuigiClient.uxManager().showAlert({
          text: 'LuigiClient.getCurrentLocale()=' + this.LuigiClient.getCurrentLocale(),
          type: 'info'
        });

        this.LuigiClient.uxManager().showAlert({
          text: 'LuigiClient.getActiveFeatureToggles()=' + this.LuigiClient.getActiveFeatureToggles(),
          type: 'info'
        });

        this.LuigiClient.uxManager().showAlert({
          text: 'LuigiClient.uxManager().getCurrentTheme()=' + this.LuigiClient.uxManager().getCurrentTheme(),
          type: 'info'
        });
      }
    });
    this._shadowRoot.querySelector('.button2').addEventListener('click', () => {
      if (this.LuigiClient) {
        this.LuigiClient.publishEvent(new CustomEvent('btnClick'));
      }
    });

    this.$button2 = this._shadowRoot.querySelector('#addNodeParams');
    this.$button2.addEventListener('click', () => {
      if (this.LuigiClient) {
        this.LuigiClient.addNodeParams({ Luigi: 'rocks' }, true);
      }
    });
    this.$button3 = this._shadowRoot.querySelector('#getNodeParams');
    this.$button3.addEventListener('click', () => {
      if (this.LuigiClient) {
        let nodeParams = this.LuigiClient.getNodeParams(false);
        this.LuigiClient.uxManager().showAlert({
          text: 'LuigiClient.getNodeParams()=' + JSON.stringify(nodeParams),
          type: 'info'
        });
      }
    });
    this.$setAnchorBtn = this._shadowRoot.querySelector('#setAnchor');
    this.$setAnchorBtn.addEventListener('click', () => {
      if (this.LuigiClient) {
        this.LuigiClient.setAnchor('#myAnchor');
      }
    });

    this.$coreSearchParamsBtn = this._shadowRoot.querySelector('#coreSearchParams');
    this.$coreSearchParamsBtn.addEventListener('click', () => {
      if (this.LuigiClient) {
        alert(JSON.stringify(this.LuigiClient.getCoreSearchParams()));
      }
    });

    this.$getPathParamsBtn = this._shadowRoot.querySelector('#getPathParams');
    this.$getPathParamsBtn.addEventListener('click', () => {
      if (this.LuigiClient) {
        alert(JSON.stringify(this.LuigiClient.getPathParams()));
      }
    });

    this.$getClientPermissionsBtn = this._shadowRoot.querySelector('#getClientPermissions');
    this.$getClientPermissionsBtn.addEventListener('click', () => {
      if (this.LuigiClient) {
        alert(JSON.stringify(this.LuigiClient.getClientPermissions()));
      }
    });

    this.$getUserSettingsBtn = this._shadowRoot.querySelector('#getUserSettings');
    this.$getUserSettingsBtn.addEventListener('click', () => {
      if (this.LuigiClient) {
        let userSettings = this.LuigiClient.getUserSettings();
        this.LuigiClient.uxManager().showAlert({
          text: 'LuigiClient.getUserSettings()=' + JSON.stringify(userSettings),
          type: 'info'
        });
      }
    });
    this.$getAnchorBtn = this._shadowRoot.querySelector('#getAnchor');
    this.$getAnchorBtn.addEventListener('click', () => {
      let getAnchor = this.LuigiClient.getAnchor();
      this.LuigiClient.uxManager().showAlert({
        text: 'LuigiClient.getAnchor()=' + JSON.stringify(getAnchor),
        type: 'info'
      });
    });
  }

  set context(ctx) {
    this.$paragraph.innerHTML = ctx.title;
  }
}
