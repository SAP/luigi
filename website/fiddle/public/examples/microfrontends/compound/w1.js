export default class extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .wc-container {
          border: 2px solid DarkBlue;
          padding: 10px;
          margin-bottom: 5px;
        }
      </style>
      <div class="wc-container">
        <p>This is Webcomponent 1</p>
        <button id="aButton">Click me!</button>
      </div>
    `;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    let clone = template.content.cloneNode(true);
    shadowRoot.append(clone);

    this.$button = shadowRoot.querySelector('#aButton');
    this.$button.addEventListener('click', () => {
        this.LuigiClient.uxManager().showAlert({
            text: 'Hello from wc 1',
            type: 'info'
          });
    })
  }
}