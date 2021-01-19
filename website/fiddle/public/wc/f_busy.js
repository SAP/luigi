import EcEvent from "./wcEvent.js";

'use strict';
(function() {
  class F_Busy extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });

      const style = document.createElement('div');
      style.innerHTML = `
      <link href="//unpkg.com/fundamental-styles@latest/dist/fundamental-styles.css" rel="stylesheet">
      <style>
        .fd-list--dropdown .fd-list__item.is-hover, .fd-list--dropdown .fd-list__item:hover {
             background: #d8e9f8;!important;
      }
      </style>
      `;
      this.shadow.appendChild(style);

      const container = document.createElement('div');
      const show = this.show;
      const id = this.id;

      container.innerHTML = `
        <div style="text-align: center" id="${id}">
          <div class="fd-busy-indicator--m" aria-hidden="false" aria-label="Loading">
            <div class="fd-busy-indicator--circle-0"></div>
            <div class="fd-busy-indicator--circle-1"></div>
            <div class="fd-busy-indicator--circle-2"></div>
          </div><br /><br />
        </div>     
      `;

      if (!show){
        container.style.display = "none";
      }

      this.shadow.appendChild(container);
      EcEvent.register(id, event => {
        const show = event.detail;
        const display = show ? 'block' : 'none';
        container.style.display = display;
      });
    }

    get show() {
      const attrValue = (this.getAttribute('show') || 'false').toLowerCase();
      return attrValue === 'false' || attrValue === 'no';
    }
  }

  customElements.define('fundamental-busy', F_Busy);
})();


