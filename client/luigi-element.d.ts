/**
 * Base class for Luigi web component micro frontends.
 */
export declare interface Options {
  /**
   *
   *if `true` shadowRoot mode is "open" otherwise shadowRoot mode is "closed".
   */
  openShadow: boolean;

  /**
   * if `true` LuigiClient initialization will be defered, until `LuigiClient.luigiClientInit()` will be called.
   */
  deferLuigiClientWCInit: boolean;
}

declare class LuigiElement extends HTMLElement {
    private deferLuigiClientWCInit;
    private LuigiClient;
    private luigiConfig;
    private _shadowRoot;
    private __initialized;
    private __lui_ctx;

    constructor(options: Record<string, any>);

    /**
     * Invoked by luigi core if present, internal, don't override.
     * @private
     */
    __postProcess(ctx: Record<string, any>, luigiClient: any, module_location_path: string): void;

    /**
     * Override to execute logic after initialization of the web component, i.e.
     * after internal rendering and all context data set.
     *
     * @param {*} ctx The context object passed by luigi core
     */
    afterInit(ctx: Record<string, any>): void;

    /**
     * Override to return the html template string defining the web component view.
     *
     * @param {*} ctx The context object passed by luigi core
     */
    render(ctx: Record<string, any>): string;

    /**
     * Override to execute logic after an attribute of this web component has changed.
     */
    update(): void;

    /**
     * Override to execute logic when a new context object is set.
     *
     * @param {*} ctx The new context object passed by luigi core
     */
    onContextUpdate(ctx: Record<string, any>): void;

    /**
     * Query selector operating on shadow root.
     *
     * @see ParentNode.querySelector
     */
    querySelector(selector: string): HTMLElement | null;

    /**
     * Handles changes on the context property.
     *
     * @private
     */
    set context(ctx: Record<string, any>);
    get context(): Record<string, any>;

    /**
     * Handles changes on attributes.
     *
     * @private
     */
    attributeChangedCallback(name?: string, oldVal?: any, newVal?: any): void;

    /**
     * Html string processing according to luigi functionality.
     * Also useful in combination with LitElement VS Code plugins.
     *
     * @param {String} literal The literal to process.
     * @returns {String} Returns the processed literal.
     */
    html(literal: string, ...keys: any[]): string;
}

export default LuigiElement;
