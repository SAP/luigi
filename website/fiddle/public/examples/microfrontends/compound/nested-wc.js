export default class extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .wc-container {
          border: 3px solid DarkBlue;
          padding: 10px;
        }
        #aButton {
          background-color: #3498db;
          color: #ffffff;
          border-radius: 5px;
          padding: 5px 10px;
          margin-bottom: 10px;
        }
      </style>
      <div class="wc-container">
        <p>This is a compound webcomponent</p>
        <button id="aButton">Click me!</button>
        <div>
          <slot name="slot-1"></slot>
          <slot name="slot-2"></slot>
        </div>
      </div>
    `;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    let clone = template.content.cloneNode(true);
    shadowRoot.append(clone);

    this.$button = shadowRoot.querySelector('#aButton');
    this.$button.addEventListener('click', () => {
        this.LuigiClient.uxManager().showAlert({
            text: 'Hello from compound WC',
            type: 'info'
          });
    })
  }
}