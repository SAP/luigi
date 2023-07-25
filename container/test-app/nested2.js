export default class extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');

    template.innerHTML = `
        <section style="display: flex; height: 100%; flex-direction: column">
          <header><slot name="header">header</slot></header>
          <main style="flex: auto; overflow: auto"><slot name="content">content</slot><slot></slot></main>
          <footer><slot name="footer">footer</slot></footer>
        </section>
      `;
    this._shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: false });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$paragraph = this._shadowRoot.querySelector('p');
  }

  set context(ctx) {
    // this.$paragraph.innerHTML = 'test';
  }
}
