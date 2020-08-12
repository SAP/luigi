/** Methods for dealing with web components based micro frontend handling */
class WebComponentSvcClass {
  constructor() {}

  dynamicImport(viewUrl) {
    /** __luigi_dyn_import() is replaced by import() after webpack is done,
         *    because webpack can't let his hands off imports ;) */
    return __luigi_dyn_import(viewUrl);
  }

  /** Creates a web component with tagname wc_id and adds it to wcItemContainer, if attached to wc_container*/
  attachWC(wc_id, wcItemContainer, wc_container, ctx) {
    if(wc_container && wc_container.contains(wcItemContainer)) {
      const wc = document.createElement(wc_id);
      wc.context = ctx;
      wc.luigi = window.Luigi;
      wcItemContainer.appendChild(wc);
    }
  }

  /** Generates a unique web component id (tagname) based on the viewUrl
   * returns a string that can be used as part of a tagname, only alphanumeric
   * characters and no whitespaces.
   */
  generateWCId(viewUrl) {
    let charRep = '';
    for(let i = 0; i < viewUrl.length; i++) {
      charRep += viewUrl.charCodeAt(i).toString(16);
    }
    return 'luigi-wc-' + charRep;
  }

  /** Does a module import from viewUrl and defines a new web component
   * with the default export of the module.
   * returns a promise that gets resolved after successfull import */
  registerWCFromUrl(viewUrl, wc_id) {
    return new Promise((resolve, reject) => {
      this.dynamicImport(viewUrl).then(module => {
        try {
          if(!window.customElements.get(wc_id)) {
            window.customElements.define(wc_id, module.default);
          }
          resolve();
        } catch(e) {
          reject(e);
        }
      }).catch(err => reject(err));
    });
  }

  /** Adds a web component defined by viewUrl to the wc_container and sets the node context.
   * If the web component is not defined yet, it gets imported.
   */
  renderWebComponent(viewUrl, wc_container, context) {
    const wc_id = this.generateWCId(viewUrl);
    const wcItemCnt = document.createElement('div');
    wc_container.appendChild(wcItemCnt);

    if (window.customElements.get(wc_id)) {
      this.attachWC(wc_id, wcItemCnt, wc_container, context);
    } else {
      /** Custom import function, if defined */
      if(window.luigiWCFn) {
        window.luigiWCFn(viewUrl, wc_id, wcItemCnt, () => {
          this.attachWC(wc_id, wcItemCnt, wc_container, context);
        });
      } else {
        this.registerWCFromUrl(viewUrl, wc_id).then(() => {
          this.attachWC(wc_id, wcItemCnt, wc_container, context);
        });
      }
    }
  }

  renderWebComponentGrid(navNode, wc_container, context) {
    const containerClass = '__lui_grid_' + new Date().getTime();
    const gridCnt = document.createElement('div');
    gridCnt.classList.add(containerClass);
    gridCnt.innerHTML = /*html*/`
        <style scoped>
          .${containerClass} {
            display: grid;
            grid-template-columns: ${navNode.grid.columns || 'auto'};
            grid-template-rows: ${navNode.grid.rows || 'auto'};
            grid-gap: ${navNode.grid.gap || '0'};
          }
        </style>
    `;
    navNode.grid.children.forEach(wc=>{
      const ctx = {...context, ...wc.context};
      const gridItemCnt = document.createElement('div');
      const grid = wc.grid || {};
      gridItemCnt.setAttribute('style', `grid-row: ${grid.row || 'auto'}; grid-column: ${grid.column || 'auto'}`);
      gridCnt.appendChild(gridItemCnt);
      WebComponentService.renderWebComponent(wc.viewUrl, gridItemCnt, ctx);
    });
    wc_container.appendChild(gridCnt);
  }
}

export const WebComponentService = new WebComponentSvcClass();
