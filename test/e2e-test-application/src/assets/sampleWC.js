import { LuigiElement } from '/luigi-client/luigi-element.js';
export default class extends LuigiElement {
  constructor() {
    super({ openShadow: true });
    let themeColor;
    const template = document.createElement('template');

    template.innerHTML = `
      <section>
        <p>Hello World!</p>
       <button id="red" class="red" style="color:red">
           Red
       </button>
       <button id="green" class="green" style="color:green">
           Green
       </button>
      </section>
    `;

    // Event Listener setzen
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$paragraph = this._shadowRoot.querySelector('p');
    this.$buttonRed = this._shadowRoot.querySelector('#red');
    this.$buttonGreen = this._shadowRoot.querySelector('#green');
    this.$buttonGreen.addEventListener('click', () => {
      this.themeColor = 'green';
      console.log('this.$buttonGreen', this.$buttonGreen);
      this.$buttonGreen.style.fontSize = '30px';
      this.$buttonRed.style.fontSize = '13px';
      this.$buttonGreen.classList.add('active');
      this.$buttonRed.classList.remove('active');
      this.LuigiClient.publishEvent(
        new CustomEvent('luigi.updateUserSettings', { detail: { themeWC: this.themeColor } })
      );
    });
    this.$buttonRed.addEventListener('click', () => {
      this.themeColor = 'red';
      this.$buttonGreen.style.fontSize = '13px';
      this.$buttonRed.style.fontSize = '30px';
      this.$buttonGreen.classList.remove('active');
      this.$buttonRed.classList.add('active');
      this.LuigiClient.publishEvent(
        new CustomEvent('luigi.updateUserSettings', { detail: { themeWC: this.themeColor } })
      );
    });
  }

  afterInit(ctx) {
    console.log('afterInit', ctx);
    if (ctx.userSettingsdata.themeWC === 'green') {
      this._shadowRoot.querySelector('#green').style.fontSize = '30px';
      this._shadowRoot.querySelector('#green').classList.add('active');
      this._shadowRoot.querySelector('#red').classList.remove('active');
    } else if (ctx.userSettingsdata.themeWC === 'red') {
      this._shadowRoot.querySelector('#red').style.fontSize = '30px';
      this._shadowRoot.querySelector('#green').classList.remove('active');
      this._shadowRoot.querySelector('#red').classList.add('active');
    }
  }

  onContextUpdate(ctx) {
    console.log('onContextUpdate', ctx);
  }
}
