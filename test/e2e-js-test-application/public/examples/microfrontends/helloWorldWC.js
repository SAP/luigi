export default class ExampleWC extends HTMLElement {
    constructor() {
      super();
      const getCurrentThemeBtn = document.createElement('template');
      getCurrentThemeBtn.innerHTML = '<button id="getCurrentTheme">getCurrentTheme</button>';

      const getCurrentRouteFromClosestContextBtn = document.createElement('template');
      getCurrentRouteFromClosestContextBtn.innerHTML = '<button id="getCurrentRouteFromClosestContextBtn">getCurrentRouteFromClosestContext</button>';

      const getCurrentRouteFromContextBtn = document.createElement('template');
      getCurrentRouteFromContextBtn.innerHTML = '<button id="getCurrentRouteFromContextBtn">getCurrentRouteFromContext</button>';

      const getCurrentRouteFromParentBtn = document.createElement('template');
      getCurrentRouteFromParentBtn.innerHTML = '<button id="getCurrentRouteFromParentBtn">getCurrentRouteFromParent</button>';
      
      const getCurrentRouteFromVirtualTreeBtn = document.createElement('template');
      getCurrentRouteFromVirtualTreeBtn.innerHTML = '<button id="getCurrentRouteFromVirtualTreeBtn">getCurrentRouteFromVirtualTree</button>';
  
      const templateSpan = document.createElement('template');
      templateSpan.innerHTML = '<span class="wc-testing-span"></span>';
  
      this._shadowRoot = this.attachShadow({
        mode: 'open',
        delegatesFocus: false
      });
      this._shadowRoot.appendChild(getCurrentThemeBtn.content.cloneNode(true));
      this._shadowRoot.appendChild(getCurrentRouteFromClosestContextBtn.content.cloneNode(true));
      this._shadowRoot.appendChild(getCurrentRouteFromContextBtn.content.cloneNode(true));
      this._shadowRoot.appendChild(getCurrentRouteFromParentBtn.content.cloneNode(true));
      this._shadowRoot.appendChild(getCurrentRouteFromVirtualTreeBtn.content.cloneNode(true));
      this._shadowRoot.appendChild(templateSpan.content.cloneNode(true));
  
      this.$currentTheme = this._shadowRoot.querySelector('#getCurrentTheme');
      this.$currentTheme.addEventListener('click', async () => {
        if (this.LuigiClient) {
          try {
            this._shadowRoot.querySelector('span').innerHTML = JSON.stringify(
            //   this.LuigiClient.uxManager().getCurrentTheme()
            );
          } catch (err) {
            console.log(err);
          }
        }
      });
      this.$getCurrentRouteFromClosestContextBtn = this._shadowRoot.querySelector('#getCurrentRouteFromClosestContextBtn');
      this.$getCurrentRouteFromClosestContextBtn.addEventListener('click', async () => {
        if (this.LuigiClient) {
            this._shadowRoot.querySelector('span').innerHTML='';
          try {
            this._shadowRoot.querySelector('span').innerHTML = JSON.stringify(
              this.LuigiClient.linkManager().fromClosestContext().getCurrentRoute()
            );
          } catch (err) {
            console.log(err);
          }
        }
      });
      this.$getCurrentRouteFromContextBtn = this._shadowRoot.querySelector('#getCurrentRouteFromContextBtn');
      this.$getCurrentRouteFromContextBtn.addEventListener('click', async () => {
        if (this.LuigiClient) {
        this._shadowRoot.querySelector('span').innerHTML='';
          try {
            this._shadowRoot.querySelector('span').innerHTML = JSON.stringify(
              this.LuigiClient.linkManager().fromContext('home').getCurrentRoute()
            );
          } catch (err) {
            console.log(err);
          }
        }
      });
      this.$getCurrentRouteFromParentBtn = this._shadowRoot.querySelector('#getCurrentRouteFromParentBtn');
      this.$getCurrentRouteFromParentBtn.addEventListener('click', async () => {
        if (this.LuigiClient) {
            this._shadowRoot.querySelector('span').innerHTML='';
          try {
            this._shadowRoot.querySelector('span').innerHTML = JSON.stringify(
              this.LuigiClient.linkManager().fromParent().getCurrentRoute()
            );
          } catch (err) {
            console.log(err);
          }
        }
      });
      this.$getCurrentRouteFromVirtualTreeBtn = this._shadowRoot.querySelector('#getCurrentRouteFromVirtualTreeBtn');
      this.$getCurrentRouteFromVirtualTreeBtn.addEventListener('click', async () => {
        if (this.LuigiClient) {
            this._shadowRoot.querySelector('span').innerHTML='';
          try {
            this._shadowRoot.querySelector('span').innerHTML = JSON.stringify(
              this.LuigiClient.linkManager().fromVirtualTreeRoot().getCurrentRoute()
            );
          } catch (err) {
            console.log(err);
          }
        }
      });
    }
  }