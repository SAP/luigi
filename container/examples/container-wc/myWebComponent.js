/**
 * This class is used to test LuigiClient webcomponent based functionality
 */
export default class extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `<section><h2 style="border: solid blue 2px;" id="paragraph">This is a webcomponent based microfrontend container </h2></section>`;
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.$paragraph = shadowRoot.getElementById('paragraph');
  }

  set context(ctx) {
    this.$paragraph.innerHTML += ctx.content;
  }
}
