export default class extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');

    template.innerHTML = /*html*/ `
      <style>
        .unnamedslotcnt {
          width: 40%;
          background: linear-gradient(120deg, rgba(51,145,202,1) 10%, rgba(60,69,83,1) 68%);
        }
      </style>
      <section style="display: flex; height: 100%; flex-direction: column">

        <footer><slot name="footer">footer</slot></footer>

        <main style="flex: auto; overflow: auto">
          <div style="display:flex">
            <div style="width: 60%">
              <slot name="content">content</slot>
            </div>
            <div class="unnamedslotcnt">
              <slot></slot>
            </div>
          </div>
        </main>

        <header><slot name="header">header</slot></header>

      </section>
    `;
    this._shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: false });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$paragraph = this._shadowRoot.querySelector('p');

    this.addEventListener('changeColor', (event) => {
      console.log(event.detail);
      let c1 = event.detail.color1;
      let c2 = event.detail.color2;
      this.shadowRoot
        .querySelector('.unnamedslotcnt')
        .setAttribute('style', `background: linear-gradient(120deg, rgba(${c1},1) 10%, rgba(${c2},1) 68%);`);
    });
  }

  set context(ctx) {
    if (this.$paragraph) {
      this.$paragraph.innerHTML = ctx.title;
    }
  }
}
