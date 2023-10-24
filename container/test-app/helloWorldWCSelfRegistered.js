/**
 * This class is used to test LuigiClient webcomponent based functionality
 */
class HelloWorldSelfRegistered extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `<section><p>Hello World (self registered)!</p></section>`;

    this._shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: false
    });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
window.Luigi._registerWebcomponent(new URL(document.currentScript?.getAttribute('src'), location), HelloWorldSelfRegistered);