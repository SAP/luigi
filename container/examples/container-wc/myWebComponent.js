/**
 * This class is used to test LuigiClient webcomponent based functionality
 */
export default class extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `<h1 style="border: solid blue 2px;" id="paragraph">Hello World !!! </h1>`;
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.$paragraph = shadowRoot.getElementById('paragraph');
  }
    
  set context(ctx) {
    this.$paragraph.innerHTML += ctx.content;
  }
}
