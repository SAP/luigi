export default class extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    *{
      padding: 5px;
      margin: 5px;
    }
    </style>
    <div>
        <slot name="slot-1"></slot>
        <slot name="slot-2"></slot>
    </div>
    `;
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const templateBtn = document.createElement('template');
    templateBtn.innerHTML = '<button id="aButton">nested WC</button>';

    shadowRoot.appendChild(templateBtn.content.cloneNode(true));
    let clone = template.content.cloneNode(true);
    shadowRoot.append(clone);
    

    this.$button = shadowRoot.querySelector('#aButton');
    this.$button.addEventListener('click', () => {
        this.LuigiClient.uxManager().showAlert({
            text: 'Hello from nested WC',
            type: 'info'
          });
    })
  }
}