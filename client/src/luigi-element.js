/**
 * Base class for Luigi web component micro frontends.
 */
export class LuigiElement extends HTMLElement {
    constructor() {
        super();        
        const template = document.createElement('template');
        template.innerHTML = this.render ? this.render() : '';
        this._shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: false });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /**
     * Query selector operating on shadow root.
     *
     * @see ParentNode.querySelector 
     */
    querySelector(selector) {
        return this._shadowRoot.querySelector(selector);
    }

    /**
     * Handles changes on the context property.
     *
     * @private
     */
    set context(ctx) {
        if(this.onContextUpdate) {
            this.onContextUpdate(ctx);
        }
        this.attributeChangedCallback();
    }

    /**
     * Handles changes on attributes.
     *
     * @private
     */
    attributeChangedCallback(name, oldVal, newVal) {
        if (this.update) {
            this.update();
        }
    }
}

/**
 * Html string processing according to luigi functionality.
 * Also useful in combination with LitElement VS Code plugins.
 *
 * @param {String} literal The literal to process.
 * @returns {String} Returns the processed literal.
 */
export function html(literal) {
    return literal;
}
