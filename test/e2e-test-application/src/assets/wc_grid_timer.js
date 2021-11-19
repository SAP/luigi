export default class extends HTMLElement {
  constructor() {
    super();

    const templatetimer = document.createElement('template');
    templatetimer.innerHTML = '<p class="timer">00:00</p>';

    this._shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: false
    });
    this._shadowRoot.appendChild(templatetimer.content.cloneNode(true));

    this.$paragraph = this._shadowRoot.querySelector('p.timer');
    this.addEventListener('update', ev => {
      this.$paragraph.innerHTML = ev.detail;
    });
  }

  set context(ctx) {
    this.$paragraph.innerHTML = `${ctx.s}`;
  }
}
