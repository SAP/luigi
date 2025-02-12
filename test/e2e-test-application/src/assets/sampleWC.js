export default class extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');

    template.innerHTML = `
      <section>
        <p>Hello World!</p>
        <button>Send event</button>
      </section>
    `;
    this._shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: false });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$paragraph = this._shadowRoot.querySelector('p');
    this.$button = this._shadowRoot.querySelector('button');
    this.$button.addEventListener('click', () => {
      this.LuigiClient.uxManager().showAlert({
        text: 'Hello from WC',
        type: 'info'
      });
      this.LuigiClient.publishEvent(new CustomEvent('buttonPressed', { detail: 'Hello from WC' }));
    });
  }
}
