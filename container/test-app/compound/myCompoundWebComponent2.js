/**
 * This class is used to test LuigiClient webcomponent based functionality
 */
export default class extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `<section><h3 style="border: solid blue 2px;" id="paragraph"> Hello From Web Component 2 </h3></section>`;
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.$paragraph = shadowRoot.getElementById('paragraph');
  }
}
