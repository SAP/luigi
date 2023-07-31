/**
 * This class is used to test LuigiClient webcomponent based functionality
 */
export default class extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `<section><p>Hello World!</p></section>`;

    const templateBtn = document.createElement('template');
    templateBtn.innerHTML = '<button class="button1">Click me!</button>';

    const templateBtn2 = document.createElement('template');
    templateBtn2.innerHTML = '<button class="button2">Publish event</button>';

    const empty = document.createElement('template');
    empty.innerHTML = `<section><p>Test!</p><br/><br/></section>`;

    this._shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: false
    });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._shadowRoot.appendChild(templateBtn.content.cloneNode(true));
    this._shadowRoot.appendChild(templateBtn2.content.cloneNode(true));

    for (let index = 0; index < 10; index++) {
      this._shadowRoot.appendChild(empty.content.cloneNode(true));
    }

    this.$paragraph = this._shadowRoot.querySelector('p');
    this.$button = this._shadowRoot.querySelector('.button1');
    this.$button.addEventListener('click', () => {
      if (this.LuigiClient) {
        this.LuigiClient.uxManager().showAlert({
          text: 'Hello from uxManager in Web Component, Language:' + this.LuigiClient.getCurrentLocale(),
          type: 'info'
        });

        this.LuigiClient.uxManager().showAlert({
          text: 'Active feature toggles list: ' + this.LuigiClient.getActiveFeatureToggles(),
          type: 'info'
        });

        this.LuigiClient.uxManager().showAlert({
          text: 'Active feature toggles: ' + this.LuigiClient.uxManager().getCurrentTheme(),
          type: 'info'
        });
      }
    });
    this.$button2 = this._shadowRoot.querySelector('.button2');
    this.$button2.addEventListener('click', () => {
      if (this.LuigiClient) {
        this.LuigiClient.publishEvent(new CustomEvent('btnClick'));
      }
    });
  }

  set context(ctx) {
    this.$paragraph.innerHTML = ctx.title;
  }
}
