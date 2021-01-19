import EcEvent from "./wcEvent.js";

'use strict';
(function() {
  class F_Selectbox extends HTMLElement {
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
      const items = this.items;
      const defaultValue = this.defaultValue;
      const placeholder = this.placeholder;
      const id = this.id;

      container.innerHTML = `
                <div style="display:flex;flex-direction:column" class="f_selectBox" id="${id}">
                    <div class="fd-popover">
                      <div class="fd-popover__control" aria-controls="F4GcX34" aria-expanded="true" aria-haspopup="true" id="emi2qudh" onclick="">
                        <div class="fd-input-group fd-input-group--control">
                          <input type="text" class="fd-input fd-input--compact fd-input-group__input" id="compactCombobox" placeholder="${placeholder !== undefined ? placeholder : ''}">
                          <span class="fd-input-group__addon fd-input-group__addon--compact fd-input-group__addon--button">
                                        <button aria-controls="F4GcX34" aria-expanded="true" aria-haspopup="true"
                                            class="fd-input-group__button fd-button fd-button--compact fd-button--transparent fd-select__button">
                                            <i class="sap-icon--navigation-down-arrow"></i>
                                        </button>
                                    </span>
                        </div>
                      </div>
                      <div class="fd-popover__body fd-popover__body--no-arrow fd-popover__body--dropdown fd-popover__body--dropdown-fill" aria-hidden="true" id="F4GcX34">
                        <div class="fd-popover__wrapper">
                          <ul aria-label="fruit options" class="fd-list fd-list--dropdown fd-list--compact" role="listbox">
                            ${items.map(item => `
                                <li role="option" tabindex="0" class="fd-list__item">
                                  <span class="fd-list__title">${item}</span>
                                </li>
                              `).join('')}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
      `;

      container.style.display = "none";
      this.shadow.appendChild(container);
      this.container = container;

      let optionContainer = this.shadowRoot.querySelector('.f_selectBox .fd-popover__body');
      let openButton = this.shadowRoot.querySelector('.f_selectBox .fd-input-group__button');
      openButton.addEventListener('click', (event) => {
        optionContainer.setAttribute('aria-hidden','false');
        event.stopPropagation();
      }, false);

      let inputField = this.shadowRoot.querySelector('.f_selectBox .fd-input-group__input');
      let optionValues = this.shadowRoot.querySelectorAll('.f_selectBox .fd-list__item');
      optionValues.forEach(optionValue => {
        let value = optionValue.querySelector('span').innerHTML.trim();
        optionValue.addEventListener('click', (event) => {
          inputField.value = value;
          optionContainer.setAttribute('aria-hidden','true');
          event.stopPropagation();
          if (id !== undefined && id.trim().length > 0){
            EcEvent.fire(id, value);
          }
        }, false);

      });

      document.addEventListener('click', function(event) {
        optionContainer.setAttribute('aria-hidden','true');
      });

    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
      setTimeout(() => this.container.style.display = "block", 200);
    }

    get placeholder() {
      return this.getAttribute('placeholder') || '';
    }

    get defaultValue() {
      return this.getAttribute('default_option') || '';
    }

    get items() {
      const items = [];
      [...this.attributes].forEach(attr => {
        if (attr.name.startsWith('option')) {
          items.push(attr.value);
        }
      });
      return items;
    }

  }

  customElements.define('fundamental-list-box', F_Selectbox);
})();


