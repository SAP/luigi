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
    templateBtn2.innerHTML = '<button id="publishEvent">Publish event</button>';

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
    empty.innerHTML = `<section><p>Test-----!</p><br/><br/></section>`;

    const getUserSettingsBtn = document.createElement('template');
    getUserSettingsBtn.innerHTML = '<button id="getUserSettings">getUserSettings</button>';

    const getAnchorBtn = document.createElement('template');
    getAnchorBtn.innerHTML = '<button id="getAnchor">getAnchor</button>';

    const setViewGroupDataBtn = document.createElement('template');
    setViewGroupDataBtn.innerHTML = '<button id="setViewGroupData">setViewGroupData</button>';

    const getDirtyStatusBtn = document.createElement('template');
    getDirtyStatusBtn.innerHTML = '<button id="getDirtyStatus">getDirtyStatus</button>';

    const updateContextBtn = document.createElement('template');
    updateContextBtn.innerHTML = '<button id="updateContext">updateContext</button>';

    const getCurrentRouteBtn = document.createElement('template');
    getCurrentRouteBtn.innerHTML = '<button id="getCurrentRoute">getCurrentRoute</button>';

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

    const linkManagerUpdateTopPathExistsBackBtn = document.createElement('template');
    linkManagerUpdateTopPathExistsBackBtn.innerHTML = `<button id="linkManagerUpdateTopPathExistsBack">linkManager().
    hasBack(), updateTopNavigation(), goBack(), pathExists()
    </button>`;

    const goBackBtn = document.createElement('template');
    goBackBtn.innerHTML = '<button id="goBackBtn">lm.GOBACK()</button>';

    const updateTopNavigationBtn = document.createElement('template');
    updateTopNavigationBtn.innerHTML = '<button id="updateTopNavigationBtn">lm.UPDATETOPNAV</button>';

    const openAsModalBtn = document.createElement('template');
    openAsModalBtn.innerHTML = '<button id="openAsModalBtn">lm.openAsModal</button>';

    const openAsDrawerBtn = document.createElement('template');
    openAsDrawerBtn.innerHTML = '<button id="openAsDrawerBtn">lm.openAsDrawer</button>';

    const openAsSplitviewBtn = document.createElement('template');
    openAsSplitviewBtn.innerHTML = '<button id="openAsSplitviewBtn">lm.openAsSplitview</button>';

    const navigateBtn = document.createElement('template');
    navigateBtn.innerHTML = '<button id="navigateBtn">---navigate---</button>';

    const alertBtn = document.createElement('template');
    alertBtn.innerHTML = '<button id="alertBtn">uxManager.showAlert()</button';

    const navigateToIntentBtn = document.createElement('template');
    navigateToIntentBtn.innerHTML = '<button id="navigateToIntent">navigateToIntent</button>';

    const confirmationModalBtn = document.createElement('template');
    confirmationModalBtn.innerHTML = '<button id="confirmationModal">showConfirmationModal</button>';

    const customMessageDiv = document.createElement('template');
    customMessageDiv.innerHTML = '<div id="customMessageDiv">Received Custom Message: </div>';

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
    this._shadowRoot.appendChild(updateContextBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(uxManagerMultipleRequestsBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(linkManagerChainedFunctionsRequestsBtn.content.cloneNode(true));

    this._shadowRoot.appendChild(goBackBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(updateTopNavigationBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(openAsModalBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(openAsDrawerBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(openAsSplitviewBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(navigateBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(alertBtn.content.cloneNode(true));
    
    this._shadowRoot.appendChild(linkManagerUpdateTopPathExistsBackBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(setViewGroupDataBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(getCurrentRouteBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(navigateToIntentBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(confirmationModalBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(customMessageDiv.content.cloneNode(true));
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
    this._shadowRoot.querySelector('#publishEvent').addEventListener('click', () => {
      if (this.LuigiClient) {
        // send a custom event (similar to sendCustomMessage)
        this.LuigiClient.publishEvent(new CustomEvent('sendMSG', { detail: 'My Custom Message from Microfrontend' }));
      }
    });

    this.$addNodeParamsBtn = this._shadowRoot.querySelector('#addNodeParams');
    this.$addNodeParamsBtn.addEventListener('click', () => {
      if (this.LuigiClient) {
        this.LuigiClient.addNodeParams({ Luigi: 'rocks' }, true);
      }
    });
    this.$getNodeParamsBtn = this._shadowRoot.querySelector('#getNodeParams');
    this.$getNodeParamsBtn.addEventListener('click', () => {
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

    this.$updateContextBtn = this._shadowRoot.querySelector('#updateContext');
    this.$updateContextBtn.addEventListener('click', () => {
      this.LuigiClient.uxManager().showAlert({
        text: `WC.ctx=${JSON.stringify(this.ctx)}`,
        type: 'info'
      });
    });

    this.$uxManagerManyRequests = this._shadowRoot.querySelector('#uxManagerManyRequests');
    this.$uxManagerManyRequests.addEventListener('click', () => {
      this.LuigiClient.uxManager().openUserSettings();
      this.LuigiClient.uxManager().closeUserSettings();
      this.LuigiClient.uxManager().removeBackdrop();
      this.LuigiClient.uxManager().collapseLeftSideNav();
      this.LuigiClient.uxManager().hideAppLoadingIndicator();
      this.LuigiClient.uxManager().setDocumentTitle('my-title');
      this.LuigiClient.uxManager().showAlert({
        text: 'LuigiClient.uxManager().getDocumentTitle()=' + this.LuigiClient.uxManager().getDocumentTitle(),
        type: 'info'
      });
    });

    this.$linkManagerChainRequests = this._shadowRoot.querySelector('#linkManagerChainRequests');
    this.$linkManagerChainRequests.addEventListener('click', () => {
      const path = 'hello-world-wc';
      const ctx = { ctx: 123 };

      this.LuigiClient.linkManager()
        .fromContext(ctx)
        .navigate();
      this.LuigiClient.linkManager()
        .fromClosestContext()
        .navigate(path);
      this.LuigiClient.linkManager()
        .fromVirtualTreeRoot()
        .navigate(path);
      this.LuigiClient.linkManager()
        .fromParent(ctx)
        .navigate(path);
      this.LuigiClient.linkManager()
        .withParams('my-params')
        .navigate(path);
      this.LuigiClient.linkManager().navigate(path);
      this.LuigiClient.uxManager().showAlert({
        text: 'LuigiClient.linkManager().navigate()',
        type: 'info'
      });
    });

    this.$openAsModalBtn = this._shadowRoot.querySelector('#openAsModalBtn');
    this.$openAsModalBtn.addEventListener('click', () => {
      this.LuigiClient.linkManager().openAsModal('openAsModal-wc', {
        title:'Modal Title',
        size: 'm'
      });
    });
    this.$openAsDrawerBtn = this._shadowRoot.querySelector('#openAsDrawerBtn');
    this.$openAsDrawerBtn.addEventListener('click', () => {
      this.LuigiClient.linkManager().openAsDrawer('openAsDrawer-wc', {
        size: 's'
      });
    });
    this.$openAsSplitviewBtn = this._shadowRoot.querySelector('#openAsSplitviewBtn');
    this.$openAsSplitviewBtn.addEventListener('click', () => {
      this.LuigiClient.linkManager().openAsSplitView('openAsSplitview-wc', {
        size: 'l'
      });
    });

    this.$alertBtn = this._shadowRoot.querySelector('#alertBtn');
    this.$alertBtn.addEventListener('click', () => {
      this.LuigiClient.uxManager().showAlert({
        text: "showAlert test",
        type: 'info'
      });
    })

    this.$navigateBtn = this._shadowRoot.querySelector('#navigateBtn');
    this.$navigateBtn.addEventListener('click', () => {
      const path = "AAA.html";
      const modalSettings = {
        title:'Modal Title',
        size: 'm'
      }
      this.LuigiClient.linkManager().navigate(path, 0, true, modalSettings);
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

    this.$goBackBtn = this._shadowRoot.querySelector('#goBackBtn');
    this.$goBackBtn.addEventListener('click', () => {
      this.LuigiClient.linkManager().goBack();
      console.log("goBack() CLICKED");
    });

    this.$updateTopNavigationBtn = this._shadowRoot.querySelector('#updateTopNavigationBtn');
    this.$updateTopNavigationBtn.addEventListener('click', () => {
      console.log("updateTopNavigation() CLICKED 1");
      this.LuigiClient.linkManager().updateTopNavigationBtn();
      console.log("updateTopNavigation() CLICKED 2");
    });

    this.$setViewGroupData = this._shadowRoot.querySelector('#setViewGroupData');
    this.$setViewGroupData.addEventListener('click', () => {
      this.LuigiClient.setViewGroupData({ vg: 'some data' });
    });

    this.$getCurrentRoute = this._shadowRoot.querySelector('#getCurrentRoute');
    this.$getCurrentRoute.addEventListener('click', () => {
      this.LuigiClient.linkManager()
        .getCurrentRoute()
        .then(result => {
          console.log(result);
          alert('current route: ' + result);
        });
    });

    this.$navigateToIntent = this._shadowRoot.querySelector('#navigateToIntent');
    this.$navigateToIntent.addEventListener('click', () => {
      if (this.LuigiClient) {
        this.LuigiClient.linkManager().navigateToIntent('Sales-settings');
        alert('navigated to: #?intent=Sales-settings');
      }
    });

    this.addEventListener('custom-message-id', event => {
      console.log('custom message received: ', event.detail);
      const customMessageDiv = this._shadowRoot.querySelector('#customMessageDiv');
      customMessageDiv.textContent = `Received Custom Message: ${event.detail.dataToSend}`;
      customMessageDiv.style = 'color: red;';
    });

    this.$confirmationModalBtn = this._shadowRoot.querySelector('#confirmationModal');
    this.$confirmationModalBtn.addEventListener('click', () => {
      const settings = {
        type: 'confirmation',
        header: 'Confirmation',
        body: 'Are you sure you want to do this?',
        buttonConfirm: 'Yes',
        buttonDismiss: 'No'
      };

      this.LuigiClient.uxManager()
        .showConfirmationModal(settings)
        .then(() => {
          this.LuigiClient.uxManager().showAlert({
            text: 'LuigiClient.uxManager().showConfirmationModal()',
            type: 'info'
          });
        });
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
