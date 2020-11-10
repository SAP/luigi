export default class extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `<section><p>Hello World!</p></section>`;
    this._shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: false
    });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$paragraph = this._shadowRoot.querySelector('p');
  }
  set context(ctx) {
    this.$paragraph.innerHTML = ctx.title;
  }
}
