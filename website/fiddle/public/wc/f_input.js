import EcEvent from "./wcEvent.js";

'use strict';
(function() {
  class F_Input extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });

      const style = document.createElement('div');
      style.innerHTML = `
      <link href="//unpkg.com/fundamental-styles@latest/dist/fundamental-styles.css" rel="stylesheet">
      <style>
      
      </style>
      `;
      this.shadow.appendChild(style);
      const container = document.createElement('div');
      const label = this.label;
      const value = this.defaultValue;
      const placeholder = this.placeholder;
      const width = this.width;
      const labelWidth = this.labelWidth;

      const id = this.id;
      let labelWidthStyle = '';
      if (labelWidth.length > 0){
        labelWidthStyle = ' style="width:' + labelWidth+ ';"'
      }
      container.innerHTML = `
        
        <div class="fd-form-item fd-form-item--horizontal" id="${id}">
            ${label.length === 0 ? '' : '<label class="fd-form-label" for="input-08" '+ labelWidthStyle+ '>' + label+ '</label>'}
            <input class="fd-input fd-input--compact" type="text" id="input-08" 
              placeholder="${placeholder}" aria-label="Image label" 
              ${value.length === 0 ? '': "value='" + value + "'"} 
              ${width.length === 0 ? '': "style='width:" + width + ";'"} 
             >
        </div>

      `;

      this.shadow.appendChild(container);
      let inputElem = this.shadow.querySelector('input');
      inputElem.addEventListener('keyup', (event) => {
        EcEvent.fire(id, inputElem.value);
        event.stopPropagation();
      }, false);

      if (!!value && value.trim().length > 0){
        EcEvent.fire(id, inputElem.value);
      }
    }

    get label() {
      return this.getAttribute('label') || '';
    }

    get defaultValue() {
      return this.getAttribute('defaultValue') || '';
    }

    get placeholder() {
      return this.getAttribute('placeholder') || '';
    }

    get width() {
      return this.getAttribute('width') || '';
    }

    get labelWidth() {
      return this.getAttribute('labelWidth') || '';
    }
  }

  customElements.define('fundamental-input', F_Input);
})();


