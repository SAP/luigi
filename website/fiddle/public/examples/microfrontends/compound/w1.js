export default class ExampleWC extends HTMLElement {
    constructor() {
      super();
      //const template = document.createElement('template');
      //template.innerHTML = `<section><p>Hello World!</p></section>`;
  
      const templateBtn = document.createElement('template');
      templateBtn.innerHTML = `
      <style>
      *{
        padding: 5px;
        margin: 5px;
      }
      </style>
      <button>Click me 1</button>`;
  
      this._shadowRoot = this.attachShadow({
        mode: 'open',
        delegatesFocus: false
      });
      //this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._shadowRoot.appendChild(templateBtn.content.cloneNode(true));
  
      //this.$paragraph = this._shadowRoot.querySelector('p');
      this.$button = this._shadowRoot.querySelector('button');
      this.$button.addEventListener('click', () => {
        if (this.LuigiClient) {
          this.LuigiClient.uxManager().showAlert({
            text: 'Hello from WC1',
            type: 'info'
          });
        }
      });
    }
  
    set context(ctx) {
      //this.$paragraph.innerHTML = ctx.title;
      //this.$paragraph.innerHTML = ctx.content;
    }
  }