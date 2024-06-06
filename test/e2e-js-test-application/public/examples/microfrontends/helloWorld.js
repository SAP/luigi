export default class ExampleWC extends HTMLElement {
  constructor() {
    super();
    const getCurrentThemeBtn = document.createElement('template');
    getCurrentThemeBtn.innerHTML = '<button id="getCurrentTheme">getCurrentTheme</button>';

    const templateSpan = document.createElement('template');
    templateSpan.innerHTML = '<span class="wc-testing-span"></span>';

    this._shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: false
    });
    this._shadowRoot.appendChild(getCurrentThemeBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(templateSpan.content.cloneNode(true));

    this.$currentTheme = this._shadowRoot.querySelector('#getCurrentTheme');
    this.$currentTheme.addEventListener('click', async () => {
      if (this.LuigiClient) {
        try {
          this._shadowRoot.querySelector('span').innerHTML = JSON.stringify(
            this.LuigiClient.uxManager().getCurrentTheme()
          );
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
}
