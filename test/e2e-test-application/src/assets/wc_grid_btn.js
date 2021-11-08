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
      if (this.$button.innerHTML === 'Start') {
        this.$button.innerHTML = 'Stop';
        this.LuigiClient.publishEvent(new CustomEvent('sendBtn', { detail: 1 }));
      } else {
        this.$button.innerHTML = 'Start';
        this.LuigiClient.publishEvent(new CustomEvent('sendBtn', { detail: 2 }));
      }
    });
  }

  set context(ctx) {
    this.$button.innerHTML = ctx.text;
  }
}
