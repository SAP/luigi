import {
  DefaultCompoundRenderer,
  resolveRenderer,
  registerEventListeners
} from '../utilities/helpers/web-component-helpers';
import { LuigiConfig } from '../core-api';

/** Methods for dealing with web components based micro frontend handling */
class WebComponentSvcClass {
  constructor() {}

  dynamicImport(viewUrl) {
    /** __luigi_dyn_import() is replaced by import() after webpack is done,
     *    because webpack can't let his hands off imports ;) */
    return __luigi_dyn_import(viewUrl);
  }

  /** Creates a web component with tagname wc_id and adds it to wcItemContainer,
   * if attached to wc_container
   */
  attachWC(wc_id, wcItemPlaceholder, wc_container, ctx, viewUrl, nodeId) {
    if (wc_container && wc_container.contains(wcItemPlaceholder)) {
      const wc = document.createElement(wc_id);
      if (nodeId) {
        wc.setAttribute('nodeId', nodeId);
      }

      const clientAPI = {
        linkManager: window.Luigi.navigation,
        uxManager: window.Luigi.ux,
        publishEvent: ev => {
          if (wc_container.eventBus) {
            wc_container.eventBus.onPublishEvent(ev, nodeId, wc_id);
          }
        }
      };

      if (wc.__postProcess) {
        const url = new URL('./', viewUrl);
        wc.__postProcess(ctx, clientAPI, url.origin + url.pathname);
      } else {
        wc.context = ctx;
        wc.LuigiClient = clientAPI;
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
    for (let i = 0; i < viewUrl.length; i++) {
      charRep += viewUrl.charCodeAt(i).toString(16);
    }
    return 'luigi-wc-' + charRep;
  }

  /** Does a module import from viewUrl and defines a new web component
   * with the default export of the module or the first export extending HTMLElement if no default is
   * specified.
   * @returns a promise that gets resolved after successfull import */
  registerWCFromUrl(viewUrl, wc_id) {
    return new Promise((resolve, reject) => {
      if (this.checkWCUrl(viewUrl)) {
        this.dynamicImport(viewUrl)
          .then(module => {
            try {
              if (!window.customElements.get(wc_id)) {
                let cmpClazz = module.default;
                if (!HTMLElement.isPrototypeOf(cmpClazz)) {
                  let props = Object.keys(module);
                  for (let i = 0; i < props.length; i++) {
                    cmpClazz = module[props[i]];
                    if (HTMLElement.isPrototypeOf(cmpClazz)) {
                      break;
                    }
                  }
                }
                window.customElements.define(wc_id, cmpClazz);
              }
              resolve();
            } catch (e) {
              reject(e);
            }
          })
          .catch(err => reject(err));
      } else {
        console.warn(`View URL '${viewUrl}' not allowed to be included`);
        reject(`View URL '${viewUrl}' not allowed`);
      }
    });
  }

  /**
   * Handles the import of self registered web component bundles, i.e. the web component
   * is added to the customElements registry by the bundle code rather than by luigi.
   *
   * @param {*} node the corresponding navigation node
   * @param {*} viewUrl the source of the wc bundle
   * @param {*} onload callback function executed after script attached and loaded
   */
  includeSelfRegisteredWCFromUrl(node, viewUrl, onload) {
    if (this.checkWCUrl(viewUrl)) {
      /** Append reg function to luigi object if not present */
      if (!window.Luigi._registerWebcomponent) {
        window.Luigi._registerWebcomponent = (srcString, el) => {
          window.customElements.define(this.generateWCId(srcString), el);
        };
      }

      let scriptTag = document.createElement('script');
      scriptTag.setAttribute('src', viewUrl);
      if (node.webcomponent.type === 'module') {
        scriptTag.setAttribute('type', 'module');
      }
      scriptTag.setAttribute('defer', true);
      scriptTag.addEventListener('load', () => {
        onload();
      });
      document.body.appendChild(scriptTag);
    } else {
      console.warn(`View URL '${viewUrl}' not allowed to be included`);
    }
  }

  /**
   * Checks if a url is allowed to be included, based on 'navigation.validWebcomponentUrls' in luigi config.
   * Returns true, if allowed.
   *
   * @param {*} url the url string to check
   */
  checkWCUrl(url) {
    if (url.indexOf('://') > 0 || url.trim().indexOf('//') === 0) {
      const ur = new URL(url);
      if (ur.host === window.location.host) {
        return true; // same host is okay
      }

      const valids = LuigiConfig.getConfigValue(
        'navigation.validWebcomponentUrls'
      );
      if (valids && valids.length > 0) {
        for (let el of valids) {
          try {
            if (new RegExp(el).test(url)) {
              return true;
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
      return false;
    }
    // relative URL is okay
    return true;
  }

  /** Adds a web component defined by viewUrl to the wc_container and sets the node context.
   * If the web component is not defined yet, it gets imported.
   */
  renderWebComponent(viewUrl, wc_container, context, node, nodeId) {
    const wc_id =
      node.webcomponent && node.webcomponent.tagName
        ? node.webcomponent.tagName
        : this.generateWCId(viewUrl);
    const wcItemPlaceholder = document.createElement('div');
    wc_container.appendChild(wcItemPlaceholder);

    if (window.customElements.get(wc_id)) {
      this.attachWC(
        wc_id,
        wcItemPlaceholder,
        wc_container,
        context,
        viewUrl,
        nodeId
      );
    } else {
      /** Custom import function, if defined */
      if (window.luigiWCFn) {
        window.luigiWCFn(viewUrl, wc_id, wcItemPlaceholder, () => {
          this.attachWC(
            wc_id,
            wcItemPlaceholder,
            wc_container,
            context,
            viewUrl,
            nodeId
          );
        });
      } else if (node.webcomponent && node.webcomponent.selfRegistered) {
        this.includeSelfRegisteredWCFromUrl(node, viewUrl, () => {
          this.attachWC(
            wc_id,
            wcItemPlaceholder,
            wc_container,
            context,
            viewUrl,
            nodeId
          );
        });
      } else {
        this.registerWCFromUrl(viewUrl, wc_id).then(() => {
          this.attachWC(
            wc_id,
            wcItemPlaceholder,
            wc_container,
            context,
            viewUrl,
            nodeId
          );
        });
      }
    }
  }

  /**
   * Creates a compound container according to the given renderer.
   * Returns a promise that gets resolved with the created container DOM element.
   *
   * @param {DefaultCompoundRenderer} renderer
   */
  createCompoundContainerAsync(renderer) {
    return new Promise(resolve => {
      if (renderer.viewUrl) {
        const wc_id = this.generateWCId(renderer.viewUrl);
        this.registerWCFromUrl(renderer.viewUrl, wc_id).then(() => {
          resolve(document.createElement(wc_id));
        });
      } else {
        resolve(renderer.createCompoundContainer());
      }
    });
  }

  /**
   * Responsible for rendering web component compounds based on a renderer or a nesting
   * micro frontend.
   *
   * @param {*} navNode the navigation node defining the compound
   * @param {*} wc_container the web component container dom element
   * @param {*} context the luigi node context
   */
  renderWebComponentCompound(navNode, wc_container, context) {
    let renderer;

    if (navNode.webcomponent && navNode.viewUrl) {
      renderer = new DefaultCompoundRenderer();
      renderer.viewUrl = navNode.viewUrl;
      renderer.createCompoundItemContainer = layoutConfig => {
        var cnt = document.createElement('div');
        if (layoutConfig && layoutConfig.slot) {
          cnt.setAttribute('slot', layoutConfig.slot);
        }
        return cnt;
      };
    } else if (navNode.compound.renderer) {
      renderer = resolveRenderer(navNode.compound.renderer);
    }

    renderer = renderer || new DefaultCompoundRenderer();

    return new Promise(resolve => {
      this.createCompoundContainerAsync(renderer).then(compoundCnt => {
        const ebListeners = {};
        compoundCnt.eventBus = {
          listeners: ebListeners,
          onPublishEvent: (event, srcNodeId, wcId) => {
            const listeners = ebListeners[srcNodeId + '.' + event.type] || [];
            listeners.push(...(ebListeners['*.' + event.type] || []));

            listeners.forEach(listenerInfo => {
              const target =
                listenerInfo.wcElement ||
                compoundCnt.querySelector(
                  '[nodeId=' + listenerInfo.wcElementId + ']'
                );
              if (target) {
                target.dispatchEvent(
                  new CustomEvent(listenerInfo.action, {
                    detail: listenerInfo.converter
                      ? listenerInfo.converter(event.detail)
                      : event.detail
                  })
                );
              } else {
                console.debug('Could not find event target', listenerInfo);
              }
            });
          }
        };
        navNode.compound.children.forEach((wc, index) => {
          const ctx = { ...context, ...wc.context };
          const compoundItemCnt = renderer.createCompoundItemContainer(
            wc.layoutConfig
          );
          compoundItemCnt.eventBus = compoundCnt.eventBus;
          renderer.attachCompoundItem(compoundCnt, compoundItemCnt);

          const nodeId = wc.id || 'gen_' + index;
          this.renderWebComponent(wc.viewUrl, compoundItemCnt, ctx, wc, nodeId);
          registerEventListeners(ebListeners, wc, nodeId);
        });
        wc_container.appendChild(compoundCnt);

        // listener for nesting wc
        registerEventListeners(
          ebListeners,
          navNode.compound,
          undefined,
          compoundCnt
        );
        resolve(compoundCnt);
      });
    });
  }
}

export const WebComponentService = new WebComponentSvcClass();
