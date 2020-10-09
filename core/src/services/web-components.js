import {DefaultCompoundRenderer, resolveRenderer} from '../utilities/helpers/web-component-helpers';

/** Methods for dealing with web components based micro frontend handling */
class WebComponentSvcClass {
  constructor() {}

  dynamicImport(viewUrl) {
    /** __luigi_dyn_import() is replaced by import() after webpack is done,
         *    because webpack can't let his hands off imports ;) */
    return __luigi_dyn_import(viewUrl);
  }

  /** Creates a web component with tagname wc_id and adds it to wcItemContainer, if attached to wc_container*/
  attachWC(wc_id, wcItemPlaceholder, wc_container, ctx, viewUrl, nodeId) {
    if(wc_container && wc_container.contains(wcItemPlaceholder)) {
      const wc = document.createElement(wc_id);
      if(nodeId) {
        wc.setAttribute('nodeId', nodeId);
      }
      const luigiObj = Object.assign({
        publishEvent : (ev) => {
          if(wc_container.eventBus) {
            wc_container.eventBus.onPublishEvent(ev, nodeId, wc_id);
          }
        }
      }, window.Luigi);
      if(wc.__postProcess) {
        const url = new URL('./', viewUrl);
        wc.__postProcess(ctx, luigiObj, url.origin + url.pathname);
      } else {
        wc.context = ctx;
        wc.luigi = luigiObj;
      }
      wc_container.replaceChild(wc, wcItemPlaceholder);
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
  renderWebComponent(viewUrl, wc_container, context, nodeId, node) {
    const wc_id = (node.webcomponent && node.webcomponent.tagName) ?
          node.webcomponent.tagName : this.generateWCId(viewUrl);
    const wcItemPlaceholder = document.createElement('div');
    wc_container.appendChild(wcItemPlaceholder);

    if (window.customElements.get(wc_id)) {
      this.attachWC(wc_id, wcItemPlaceholder, wc_container, context, viewUrl, nodeId);
    } else {
      /** Custom import function, if defined */
      if(window.luigiWCFn) {
        window.luigiWCFn(viewUrl, wc_id, wcItemCnt, () => {
          this.attachWC(wc_id, wcItemPlaceholder, wc_container, context, viewUrl, nodeId);
        });
      } else if (node.webcomponent && node.webcomponent.selfRegistered) {
        let scriptTag = document.createElement('script');
        scriptTag.setAttribute('src', viewUrl);
        if(node.webcomponent.type === 'module') {
          scriptTag.setAttribute('type', 'module');
        }
        scriptTag.setAttribute('defer', true);
        scriptTag.addEventListener('load', ()=>{
          this.attachWC(wc_id, wcItemPlaceholder, wc_container, context, viewUrl, nodeId);
        });
        document.body.appendChild(scriptTag);
      } else {
        this.registerWCFromUrl(viewUrl, wc_id).then(() => {
          this.attachWC(wc_id, wcItemPlaceholder, wc_container, context, viewUrl, nodeId);
        });
      }
    }
  }

  createCompoundContainerAsync(renderer) {
    return new Promise(resolve => {
      if(renderer.viewUrl) {
        const wc_id = this.generateWCId(renderer.viewUrl);
        this.registerWCFromUrl(renderer.viewUrl, wc_id).then(()=>{
          resolve(document.createElement(wc_id));
        });
      } else {
        resolve(renderer.createCompoundContainer());
      }
    });
  }

  renderWebComponentCompound(navNode, wc_container, context) {
    let renderer;

    if(navNode.webcomponent && navNode.viewUrl) {
      renderer = new DefaultCompoundRenderer();
      renderer.viewUrl = navNode.viewUrl;
      renderer.createCompoundItemContainer = (layoutConfig) => {
        var cnt = document.createElement('div');
        if(layoutConfig && layoutConfig.slot) {
          cnt.setAttribute('slot', layoutConfig.slot);
        }
        return cnt;
      };
    } else if(navNode.compound.renderer) {
      renderer = resolveRenderer(navNode.compound.renderer);
    }

    renderer = renderer || new DefaultCompoundRenderer();

    //const compoundCnt = renderer.createCompoundContainer();
    this.createCompoundContainerAsync(renderer).then(compoundCnt => {
      const ebListeners = {};
      compoundCnt.eventBus = {
        listeners: ebListeners,
        onPublishEvent: (event, srcNodeId, wcId) => {
          const listeners = ebListeners[srcNodeId + '.' + event.type] || [];
          listeners.push(...(ebListeners['*.' + event.type] || []));

          listeners.forEach(listenerInfo => {
            const target = compoundCnt.querySelector('[nodeId=' + listenerInfo.wcElementId + ']');
            if(target) {
              target.dispatchEvent(new CustomEvent(listenerInfo.action,
                {
                  detail: listenerInfo.converter ? listenerInfo.converter(event.detail) : event.detail
                }));
            } else {
              console.debug("Could not find event target", listenerInfo);
            }
          });
        }
      };
      navNode.compound.children.forEach((wc, index)=>{
        const ctx = {...context, ...wc.context};
        const compoundItemCnt = renderer.createCompoundItemContainer(wc.layoutConfig);
        compoundItemCnt.eventBus = compoundCnt.eventBus;
        renderer.attachCompoundItem(compoundCnt, compoundItemCnt);

        const nodeId = wc.id || ('gen_' + index);
        WebComponentService.renderWebComponent(wc.viewUrl, compoundItemCnt, ctx, nodeId, wc);
        if(wc.eventListeners) {
          wc.eventListeners.forEach(el => {
            const evID = el.source + '.' + el.name;
            const listenerList = ebListeners[evID];
            const listenerInfo = {
              wcElementId: nodeId,
              action: el.action,
              converter: el.dataConverter
            };
            if(listenerList) {
              listenerList.push(listenerInfo);
            } else {
              ebListeners[evID] = [listenerInfo];
            }
          });
        }
      });
      wc_container.appendChild(compoundCnt);
    });
  }
}

export const WebComponentService = new WebComponentSvcClass();
