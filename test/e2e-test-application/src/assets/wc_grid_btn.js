export default class extends HTMLElement {
  constructor() {
    super();

    const templateBtn = document.createElement('template');
    templateBtn.innerHTML = '<button>Start</button>';

    this._shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: false
    });
    this._shadowRoot.appendChild(templateBtn.content.cloneNode(true));

    this.$button = this._shadowRoot.querySelector('button');
    this.$button.addEventListener('click', () => {
      if (this.LuigiClient) {
      }
    });
  }

  set context(ctx) {
    this.$button.innerHTML = ctx.text;
  }
}
