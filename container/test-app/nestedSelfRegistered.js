class Nested extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    //remove buttons after review/AC
    template.innerHTML = `
    <section style="display: flex; height: 100%; flex-direction: column">
          <header><slot name="header">header</slot></header>
          <main style="flex: auto; overflow: auto">
            <slot name="content">content</slot>
            <slot name="helloWorldSelfRegistered"></slot>
          </main>
          <footer><slot name="footer">footer</slot></footer>
        </section>
      `;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    let clone = template.content.cloneNode(true);
    shadowRoot.append(clone);
  }

  set context(ctx) {
    console.log('context', ctx);
  }
}
window.Luigi._registerWebcomponent(new URL(document.currentScript?.getAttribute('src'), location), Nested);
