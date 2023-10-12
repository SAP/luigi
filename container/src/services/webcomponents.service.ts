/* eslint no-prototype-builtins: 0 */
import {
  DefaultCompoundRenderer,
  resolveRenderer,
  registerEventListeners,
  deSanitizeParamsMap
} from './web-component-helpers';
import { ContainerService } from './container.service';
import { Events } from '../constants/communication';

/** Methods for dealing with web components based micro frontend handling */
export class WebComponentService {
  containerService: ContainerService;
  thisComponent: any;

  constructor() {
    this.containerService = new ContainerService();
  }

  dynamicImport(viewUrl: string) {
    // Object.freeze() used as potential marker for bundlers other than webpack
    return Object.freeze(import(/* webpackIgnore: true */ viewUrl));
  }

  processViewUrl(viewUrl: string, data?: any): string {
    return viewUrl;
  }

  /** Creates a web component with tagname wc_id and adds it to wcItemContainer,
   * if attached to wc_container
   */
  attachWC(
    wc_id: string,
    wcItemPlaceholder: HTMLDivElement,
    wc_container,
    ctx,
    viewUrl: string,
    nodeId: string,
    isSpecialMf?: boolean
  ) {
    if (wc_container && wc_container.contains(wcItemPlaceholder)) {
      const wc = document.createElement(wc_id);
      if (nodeId) {
        wc.setAttribute('nodeId', nodeId);
      }

      this.initWC(wc, wc_id, wc_container, viewUrl, ctx, nodeId, isSpecialMf);
      wc_container.replaceChild(wc, wcItemPlaceholder);
      if (wc_container._luigi_node) {
        wc_container._luigi_mfe_webcomponent = wc;
      }
      wc_container.dispatchEvent(new Event('wc_ready'));
    }
  }

  /**
   * Function that uses the current instance of the containerService to dispatch a Luigi event to the current instance of the container
   * that is 'thisComponent'
   * @param msg the message to be delivered
   * @param data the data to be sent
   * @param callback the callback function to be called
   */
  dispatchLuigiEvent(msg: string, data: any, callback?: Function) {
    this.containerService.dispatch(msg, this.thisComponent, data, callback);
  }

  /**
   * This function is used to create the Luigi Client API for the web-component-based micro frontend.
   * As the function expands with more functionality, it might be moved to a separate class.
   * @param eventBusElement the event bus to be used for cross web component communication, i.e.: for compound micro frontends container scenario
   * @param nodeId refers to an attribute of the web component to be identified from the rest
   * @param wc_id a tagname that is used when creating the web component element
   * @returns an object with the Luigi Client API
   */
  createClientAPI(eventBusElement, nodeId: string, wc_id: string, component: HTMLElement, isSpecialMf?: boolean) {
    return {
      linkManager: () => {
        return {
          navigate: route => {
            this.dispatchLuigiEvent(Events.NAVIGATION_REQUEST, { link: route });
          }
        };
      },
      uxManager: () => {
        return {
          showAlert: alertSettings => {
            this.dispatchLuigiEvent(Events.ALERT_REQUEST, alertSettings);
          },
          showConfirmationModal: async settings => {
            return new Promise((resolve, reject) => {
              this.dispatchLuigiEvent(Events.SHOW_CONFIRMATION_MODAL_REQUEST, settings, data => {
                if (data) {
                  resolve(data);
                } else {
                  reject(new Error('No data'));
                }
              });
            });
          },
          getCurrentTheme: () => {
            return this.thisComponent.getAttribute('theme');
          }
        };
      },
      getCurrentLocale: () => {
        return this.thisComponent.getAttribute('locale');
      },
      getActiveFeatureToggles: () => {
        return this.thisComponent.getAttribute('active-feature-toggle-list');
      },
      publishEvent: ev => {
        if (eventBusElement && eventBusElement.eventBus) {
          eventBusElement.eventBus.onPublishEvent(ev, nodeId, wc_id);
        }
        const payload = {
          id: ev.type,
          _metaData: {
            nodeId,
            wc_id,
            src: component
          },
          data: ev.detail
        };
        this.dispatchLuigiEvent(Events.CUSTOM_MESSAGE, payload);
      },
      luigiClientInit: () => {
        this.dispatchLuigiEvent(Events.INITIALIZED, {});
      },
      addNodeParams: (params, keepBrowserHistory) => {
        if (isSpecialMf) {
          return;
        }
        this.dispatchLuigiEvent(Events.ADD_NODE_PARAMS_REQUEST, { params, keepBrowserHistory });
      },
      getNodeParams: shouldDesanitise => {
        if (isSpecialMf) {
          return {};
        }
        let result = this.thisComponent.getAttribute('node-params') || {};
        result = JSON.parse(result);
        if (shouldDesanitise) {
          return deSanitizeParamsMap(result);
        }
        return result;
      },
      setAnchor: anchor => {
        if (isSpecialMf) {
          return;
        }
        this.dispatchLuigiEvent(Events.SET_ANCHOR_LINK_REQUEST, anchor);
      },
      getAnchor: () => {
        return this.thisComponent.getAttribute('anchor') || '';
      },
      getCoreSearchParams: () => {
        let result = this.thisComponent.getAttribute('search-params') || {};
        result = JSON.parse(result);
        return result;
      },
      getPathParams: () => {
        let result = this.thisComponent.getAttribute('path-params') || {};
        result = JSON.parse(result);
        return result;
      },
      getClientPermissions: () => {
        let result = this.thisComponent.getAttribute('client-permissions') || {};
        result = JSON.parse(result);
        return result;
      },
      getUserSettings: () => {
        return JSON.parse(this.thisComponent.getAttribute('user-settings')) || {};
      }
    };
  }

  initWC(wc: HTMLElement | any, wc_id, eventBusElement, viewUrl: string, ctx, nodeId: string, isSpecialMf?: boolean) {
    const clientAPI = this.createClientAPI(eventBusElement, nodeId, wc_id, wc, isSpecialMf);

    if (wc.__postProcess) {
      const url =
        new URL(document.baseURI).origin === new URL(viewUrl, document.baseURI).origin // TODO: check if needed
          ? new URL('./', new URL(viewUrl, document.baseURI))
          : new URL('./', viewUrl);
      wc.__postProcess(ctx, clientAPI, url.origin + url.pathname);
    } else {
      wc.context = ctx;
      wc.LuigiClient = clientAPI;
    }
  }

  /** Generates a unique web component id (tagname) based on the viewUrl
   * returns a string that can be used as part of a tagname, only alphanumeric
   * characters and no whitespaces.
   */
  generateWCId(viewUrl: string) {
    let charRep = '';
    const normalizedViewUrl = new URL(viewUrl, location.href).href;
    for (let i = 0; i < normalizedViewUrl.length; i++) {
      charRep += normalizedViewUrl.charCodeAt(i).toString(16);
    }
    return 'luigi-wc-' + charRep;
  }

  /** Does a module import from viewUrl and defines a new web component
   * with the default export of the module or the first export extending HTMLElement if no default is
   * specified.
   * @returns a promise that gets resolved after successfull import */
  registerWCFromUrl(viewUrl: string, wc_id: string) {
    const i18nViewUrl = this.processViewUrl(viewUrl);
    return new Promise((resolve, reject) => {
      if (this.checkWCUrl(i18nViewUrl)) {
        this.dynamicImport(i18nViewUrl)
          .then(module => {
            try {
              if (!window.customElements.get(wc_id)) {
                let cmpClazz = module.default;
                if (!HTMLElement.isPrototypeOf(cmpClazz)) {
                  const props = Object.keys(module);
                  for (let i = 0; i < props.length; i++) {
                    cmpClazz = module[props[i]];
                    if (HTMLElement.isPrototypeOf(cmpClazz)) {
                      break;
                    }
                  }
                }
                window.customElements.define(wc_id, cmpClazz);
              }
              resolve(1);
            } catch (err) {
              reject(err);
            }
          })
          .catch(err => {
            reject(err);
          });
      } else {
        const message = `Error: View URL '${i18nViewUrl}' not allowed to be included`;
        reject(message);
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
      if (!this.containerService.getContainerManager()._registerWebcomponent) {
        this.containerService.getContainerManager()._registerWebcomponent = (srcString, el) => {
          window.customElements.define(this.generateWCId(srcString), el);
        };
      }

      const scriptTag = document.createElement('script');
      scriptTag.setAttribute('src', viewUrl);
      if (node.webcomponent.type === 'module') {
        scriptTag.setAttribute('type', 'module');
      }
      scriptTag.setAttribute('defer', 'true');
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
  checkWCUrl(url: string) {
    // if (url.indexOf('://') > 0 || url.trim().indexOf('//') === 0) {
    //   const ur = new URL(url);
    //   if (ur.host === window.location.host) {
    //     return true; // same host is okay
    //   }

    //   const valids = LuigiConfig.getConfigValue('navigation.validWebcomponentUrls');
    //   if (valids && valids.length > 0) {
    //     for (let el of valids) {
    //       try {
    //         if (new RegExp(el).test(url)) {
    //           return true;
    //         }
    //       } catch (e) {
    //         console.error(e);
    //       }
    //     }
    //   }
    //   return false;
    // }
    // relative URL is okay
    // if (url === 'test.js') {
    //   return false;
    // }
    return true;
  }

  /** Adds a web component defined by viewUrl to the wc_container and sets the node context.
   * If the web component is not defined yet, it gets imported.
   */
  renderWebComponent(
    viewUrl: string,
    wc_container: HTMLElement | any,
    context: any,
    node: any,
    nodeId?: any,
    isSpecialMf?: boolean
  ) {
    const i18nViewUrl = this.processViewUrl(viewUrl, { context });
    const wc_id =
      node.webcomponent && node.webcomponent.tagName ? node.webcomponent.tagName : this.generateWCId(i18nViewUrl);
    const wcItemPlaceholder = document.createElement('div');
    wc_container.appendChild(wcItemPlaceholder);
    wc_container._luigi_node = node;

    if (window.customElements.get(wc_id)) {
      this.attachWC(wc_id, wcItemPlaceholder, wc_container, context, i18nViewUrl, nodeId, isSpecialMf);
    } else {
      /** Custom import function, if defined */
      if ((window as any).luigiWCFn) {
        (window as any).luigiWCFn(i18nViewUrl, wc_id, wcItemPlaceholder, () => {
          this.attachWC(wc_id, wcItemPlaceholder, wc_container, context, i18nViewUrl, nodeId, isSpecialMf);
        });
      } else if (node.webcomponent && node.webcomponent.selfRegistered) {
        this.includeSelfRegisteredWCFromUrl(node, i18nViewUrl, () => {
          this.attachWC(wc_id, wcItemPlaceholder, wc_container, context, i18nViewUrl, nodeId, isSpecialMf);
        });
      } else {
        this.registerWCFromUrl(i18nViewUrl, wc_id)
          .then(() => {
            this.attachWC(wc_id, wcItemPlaceholder, wc_container, context, i18nViewUrl, nodeId, isSpecialMf);
          })
          .catch(error => {
            console.warn('ERROR =>', error);
            // dispatch an error event to be handled core side
            this.containerService.dispatch(Events.RUNTIME_ERROR_HANDLING_REQUEST, this.thisComponent, error);
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
  createCompoundContainerAsync(renderer: any, ctx: any): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
      // remove after review
      // if (1) {
      //   reject({ test: 'error' });
      // }
      if (renderer.viewUrl) {
        try {
          const wc_id = this.generateWCId(renderer.viewUrl);
          this.registerWCFromUrl(renderer.viewUrl, wc_id)
            .then(() => {
              const wc = document.createElement(wc_id);
              this.initWC(wc, wc_id, wc, renderer.viewUrl, ctx, '_root');
              resolve(wc);
            })
            .catch(error => {
              console.warn('Error: ', error);
              // dispatch an error event to be handled core side
              this.containerService.dispatch(Events.RUNTIME_ERROR_HANDLING_REQUEST, this.thisComponent, error);
            });
        } catch (error) {
          reject(error);
        }
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
   * @param {HTMLElement} wc_container the web component container dom element
   * @param {*} context the luigi node context
   */
  renderWebComponentCompound(navNode, wc_container: HTMLElement, context) {
    let renderer;
    if (navNode.webcomponent && navNode.viewUrl) {
      renderer = new DefaultCompoundRenderer();
      renderer.viewUrl = this.processViewUrl(navNode.viewUrl, { context });
      renderer.createCompoundItemContainer = layoutConfig => {
        const cnt = document.createElement('div');
        if (layoutConfig && layoutConfig.slot) {
          cnt.setAttribute('slot', layoutConfig.slot);
        }
        return cnt;
      };
    } else if (navNode.compound?.renderer) {
      renderer = resolveRenderer(navNode.compound.renderer);
    }

    renderer = renderer || new DefaultCompoundRenderer();
    return new Promise(resolve => {
      this.createCompoundContainerAsync(renderer, context)
        .then((compoundCnt: HTMLElement) => {
          const ebListeners = {};
          (compoundCnt as any).eventBus = {
            listeners: ebListeners,
            onPublishEvent: (event, srcNodeId, wcId) => {
              const listeners = ebListeners[srcNodeId + '.' + event.type] || [];
              listeners.push(...(ebListeners['*.' + event.type] || []));

              listeners.forEach(listenerInfo => {
                const target =
                  listenerInfo.wcElement || compoundCnt.querySelector('[nodeId=' + listenerInfo.wcElementId + ']');
                if (target) {
                  target.dispatchEvent(
                    new CustomEvent(listenerInfo.action, {
                      detail: listenerInfo.converter ? listenerInfo.converter(event.detail) : event.detail
                    })
                  );
                } else {
                  console.debug('Could not find event target', listenerInfo);
                }
              });
            }
          };
          navNode.compound?.children.forEach((wc, index) => {
            const ctx = { ...context, ...wc.context };
            const compoundItemCnt = renderer.createCompoundItemContainer(wc.layoutConfig);

            compoundItemCnt.eventBus = (compoundCnt as any).eventBus;
            renderer.attachCompoundItem(compoundCnt, compoundItemCnt);

            const nodeId = wc.id || 'gen_' + index;
            this.renderWebComponent(wc.viewUrl, compoundItemCnt, ctx, wc, nodeId, true);
            registerEventListeners(ebListeners, wc, nodeId);
          });
          wc_container.appendChild(compoundCnt);
          // listener for nesting wc
          registerEventListeners(ebListeners, navNode.compound, '_root', compoundCnt);
          resolve(compoundCnt);
        })
        .catch(error => {
          // dispatch an error event to be handled core sid
          console.warn('Error: ', error);
          this.containerService.dispatch(Events.RUNTIME_ERROR_HANDLING_REQUEST, this.thisComponent, error);
        });
    });
  }
}
