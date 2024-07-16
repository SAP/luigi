/**
 * This class is used to test LuigiClient webcomponent based functionality
 */
export default class extends HTMLElement {
  constructor() {
    super();

    this.ctx = {};

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

    const setViewGroupDataBtn = document.createElement('template');
    setViewGroupDataBtn.innerHTML = '<button id="setViewGroupData">setViewGroupData</button>';

    const getDirtyStatusBtn = document.createElement('template');
    getDirtyStatusBtn.innerHTML = '<button id="getDirtyStatus">getDirtyStatus</button>';

    const uxManagerMultipleRequestsBtn = document.createElement('template');
    uxManagerMultipleRequestsBtn.innerHTML = `<button id="uxManagerManyRequests">uxManager().closeUserSettings,
    openUserSettings,
    collapseLeftSideNav,
    setDocumentTitle,
    getDocumentTitle,
    removeBackdrop,
    hideAppLoadingIndicator,
    </button>`;

    const linkManagerChainedFunctionsRequestsBtn = document.createElement('template');
    linkManagerChainedFunctionsRequestsBtn.innerHTML = `<button id="linkManagerChainRequests">
    linkManager().fromClosestContext,
    fromContext,
    fromVirtualTreeRoot,
    withParams().navigate()
    </button>`;

    const linkManagerOpenAsRequestsBtn = document.createElement('template');
    linkManagerOpenAsRequestsBtn.innerHTML = `<button id="linkManagerOpenAsRequests">linkManager().
    openAsDrawer,
    openAsModal,
    openAsSplitView,
    </button>`;

    const linkManagerUpdateTopPathExistsBackBtn = document.createElement('template');
    linkManagerUpdateTopPathExistsBackBtn.innerHTML = `<button id="linkManagerUpdateTopPathExistsBack">linkManager().
    hasBack(), updateTopNavigation(), goBack(), pathExists()
    </button>`;

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
    this._shadowRoot.appendChild(getDirtyStatusBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(uxManagerMultipleRequestsBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(linkManagerChainedFunctionsRequestsBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(linkManagerOpenAsRequestsBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(linkManagerUpdateTopPathExistsBackBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(setViewGroupDataBtn.content.cloneNode(true));

    this._shadowRoot.appendChild(empty.content.cloneNode(true));

    this.$paragraph = this._shadowRoot.querySelector('p');
    this.$button = this._shadowRoot.querySelector('#aButton');
    this.$button.addEventListener('click', () => {
      if (this.LuigiClient) {
        this.LuigiClient.uxManager().showAlert({
          text: 'LuigiClient.getCurrentLocale()=' + this.LuigiClient.getCurrentLocale(),
          type: 'info'
        });

        const featureToggles = this.LuigiClient.getActiveFeatureToggles();
        this.LuigiClient.uxManager().showAlert({
          text: 'LuigiClient.getActiveFeatureToggles()=' + featureToggles + ',' + featureToggles.length,
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

    this.$getDirtyStatusBtn = this._shadowRoot.querySelector('#getDirtyStatus');
    this.$getDirtyStatusBtn.addEventListener('click', () => {
      let dirtyStatus = this.LuigiClient.uxManager().getDirtyStatus();
      console.log('getDirtyStatus', dirtyStatus);
      this.LuigiClient.uxManager().showAlert({
        text: 'LuigiClient.uxManager().getDirtyStatus()=' + dirtyStatus,
        type: 'info'
      });
    });

    this.$uxManagerManyRequests = this._shadowRoot.querySelector('#uxManagerManyRequests');
    this.$uxManagerManyRequests.addEventListener('click', () => {
      this.LuigiClient.uxManager().closeUserSettings();
      this.LuigiClient.uxManager().openUserSettings();
      this.LuigiClient.uxManager().collapseLeftSideNav();
      this.LuigiClient.uxManager().setDocumentTitle('my-title');
      this.LuigiClient.uxManager().removeBackdrop();
      this.LuigiClient.uxManager().hideAppLoadingIndicator();
      this.LuigiClient.uxManager().showAlert({
        text: 'LuigiClient.uxManager().getDocumentTitle()=' + this.LuigiClient.uxManager().getDocumentTitle(),
        type: 'info'
      });
    });

    this.$linkManagerChainRequests = this._shadowRoot.querySelector('#linkManagerChainRequests');
    this.$linkManagerChainRequests.addEventListener('click', () => {
      this.LuigiClient.linkManager()
        .fromContext({ ctx: 123 })
        .navigate('hello-world-wc');
      this.LuigiClient.linkManager()
        .fromClosestContext()
        .navigate('hello-world-wc');
      this.LuigiClient.linkManager()
        .fromVirtualTreeRoot()
        .navigate('hello-world-wc');
      this.LuigiClient.linkManager()
        .withParams('my-params')
        .navigate('hello-world-wc');
    });

    this.$linkManagerOpenAsRequests = this._shadowRoot.querySelector('#linkManagerOpenAsRequests');
    this.$linkManagerOpenAsRequests.addEventListener('click', () => {
      this.LuigiClient.linkManager().openAsDrawer('hello-world-wc', { size: 's' });
      this.LuigiClient.linkManager().openAsModal('hello-world-wc', { size: 'm' });
      this.LuigiClient.linkManager().openAsSplitView('hello-world-wc', { size: 'l' });
    });

    this.$linkManagerUpdateTopPathExistsBack = this._shadowRoot.querySelector('#linkManagerUpdateTopPathExistsBack');
    this.$linkManagerUpdateTopPathExistsBack.addEventListener('click', () => {
      this.LuigiClient.linkManager().updateTopNavigation();
      this.LuigiClient.linkManager()
        .pathExists()
        .then(result => {
          console.log('PATH EXISTS');
          this.LuigiClient.uxManager().showAlert({
            text:
              'LuigiClient.linkManager().pathExists()=' +
              result +
              '\nthis.LuigiClient.linkManager().hasBack()=' +
              this.LuigiClient.linkManager().hasBack(),
            type: 'info'
          });
        });
      this.LuigiClient.linkManager().goBack();
    });

    this.$setViewGroupData = this._shadowRoot.querySelector('#setViewGroupData');
    this.$setViewGroupData.addEventListener('click', () => {
      this.LuigiClient.setViewGroupData({ vg: 'some data' });
    });
  }

  get context() {
    return this.ctx;
  }

  set context(ctx) {
    this.ctx = ctx;
    this.$paragraph.innerHTML = ctx.title;
  }
}
