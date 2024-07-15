/**
 * This class is used to test Compound Container defer-init functionality
 */
export default class extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `<section><h3 style="border: solid blue 2px;" id="defer-init-flag"> Hello From Web Component 1 </h3></section>`;
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.$paragraph = shadowRoot.getElementById('defer-init-flag');
  }

  set context(ctx) {
    this.$paragraph.innerHTML += ctx.content;
  }
}
