export function html(literal) {
    return literal;
}

export class LuigiElement extends HTMLElement {
    constructor() {
        super();        
        const template = document.createElement('template');
        template.innerHTML = this.render ? this.render() : '';
        this._shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: false });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    querySelector(selector) {
        return this._shadowRoot.querySelector(selector);
    }

    set context(ctx) {
        if(this.onContextUpdate) {
            this.onContextUpdate(ctx);
        }
        this.attributeChangedCallback();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (this.update) {
            this.update();
        }
    }
}
