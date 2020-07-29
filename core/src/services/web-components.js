class WebComponentSvcClass {
  constructor() {}

  attachWC(wc_id, wc_container, ctx) {
    const wc = document.createElement(wc_id);
    wc.context = ctx;
    wc.luigi = Luigi;
    wc_container.appendChild(wc);
  }

  generateWCId(viewUrl) {
    let charRep = '';
    for(let i = 0; i < viewUrl.length; i++) {
      charRep += viewUrl.charCodeAt(i).toString(16);
    }
    return 'luigi-wc-' + charRep;
  }

  registerWCFromUrl(viewUrl, wc_id) {
    return new Promise((resolve, reject) => {
      /** __luigi_dyn_import is replaced by import after webpack is done,
         *    because webpack can't let his hands off imports ;) */
      __luigi_dyn_import(viewUrl).then(module => {
        try {
          window.customElements.define(wc_id, module.default);
          resolve();
        } catch(e) {
          reject(e);
        }
      }).catch(err => reject(err));
    });
  }

  renderWebComponent(viewUrl, wc_container, context) {
    const wc_id = this.generateWCId(viewUrl);

    if (window.customElements.get(wc_id)) {
      this.attachWC(wc_id, wc_container, context);
    } else {
      /** Custom import function, if defined */
      if(window.luigiWCFn) {
        window.luigiWCFn(viewUrl, wc_id, wc_container, () => {
          this.attachWC(wc_id, wc_container, context);
        })
      } else {
        this.registerWCFromUrl(viewUrl, wc_id).then(() => {
          this.attachWC(wc_id, wc_container, context);
        });
      }
    }
  }
}

export const WebComponentService = new WebComponentSvcClass();
