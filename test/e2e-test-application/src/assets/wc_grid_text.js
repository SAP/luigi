export default class extends HTMLElement {
  connectedCallback() {
    const template = document.createElement('template');

    template.innerHTML = `
            <style>
                section {
                    border: 1px solid black;
                    margin: 0.5em;
                    padding: 0.5em;
                }
            </style>
            <section>
                <h1>Web Component With Some Text</h1>
                <p>This web component is built to have a demo web component with a bit more content and height.</p>
            </section>
        `;

    this.attachShadow({
      mode: 'open',
      delegatesFocus: false
    }).appendChild(template.content.cloneNode(true));
  }
}
