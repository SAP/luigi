(function(l, r) {
  if (!l || l.getElementById('livereloadscript')) return;
  r = l.createElement('script');
  r.async = 1;
  r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1';
  r.id = 'livereloadscript';
  l.getElementsByTagName('head')[0].appendChild(r);
})(self.document);
function noop() {}
function add_location(element, file, line, column, char) {
  element.__svelte_meta = {
    loc: { file, line, column, char }
  };
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === 'function';
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement('a');
  }
  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function empty() {
  return text('');
}
function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
function children(element) {
  return Array.from(element.childNodes);
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
function attribute_to_object(attributes) {
  const result = {};
  for (const attribute of attributes) {
    result[attribute.name] = attribute.value;
  }
  return result;
}

let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) throw new Error('Function called outside component initialization');
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
  const saved_component = current_component;
  do {
    // first, call beforeUpdate functions
    // and update components
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const outroing = new Set();
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}

const globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;
function mount_component(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        // Edge case - component was destroyed immediately,
        // most likely as a result of a binding initialising
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = (component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  });
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance
    ? instance(component, options.props || {}, (i, ret, ...rest) => {
        const value = rest.length ? rest[0] : ret;
        if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
          if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
          if (ready) make_dirty(component, i);
        }
        return ret;
      })
    : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  // `false` as a special case of no DOM component
  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }
    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }
  set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === 'function') {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      // @ts-ignore todo: improve typings
      for (const key in this.$$.slotted) {
        // @ts-ignore todo: improve typings
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      // TODO should this delegate to addEventListener?
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}

function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
}
function insert_dev(target, node, anchor) {
  dispatch_dev('SvelteDOMInsert', { target, node, anchor });
  insert(target, node, anchor);
}
function detach_dev(node) {
  dispatch_dev('SvelteDOMRemove', { node });
  detach(node);
}
function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null) dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
  else dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function validate_slots(name, slot, keys) {
  for (const slot_key of Object.keys(slot)) {
    if (!~keys.indexOf(slot_key)) {
      console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
    }
  }
}

class ContainerService {
  constructor() {}
  isVisible(component) {
    return !!(component.offsetWidth || component.offsetHeight || component.getClientRects().length);
  }
  dispatch(msg, targetCnt, data, callback) {
    let ev = new CustomEvent(msg, { detail: data });
    ev.luigiCallback = data => {
      if (callback) {
        callback(data);
      }
    };
    targetCnt.dispatchEvent(ev);
    console.log('Dispatch WC event:', msg, targetCnt, data);
  }
  getTargetContainer(event) {
    let cnt;
    globalThis.__luigi_container_manager.container.forEach(element => {
      var _a;
      if (
        ((_a = element.iframeHandle) === null || _a === void 0 ? void 0 : _a.iframe) &&
        element.iframeHandle.iframe.contentWindow === event.source
      ) {
        cnt = element;
      }
    });
    return cnt;
  }
  getContainerManager() {
    if (!globalThis.__luigi_container_manager) {
      globalThis.__luigi_container_manager = {
        container: [],
        messageListener: event => {
          var _a, _b, _c, _d;
          const targetCnt = this.getTargetContainer(event);
          const target =
            (_b =
              (_a = targetCnt === null || targetCnt === void 0 ? void 0 : targetCnt.iframeHandle) === null ||
              _a === void 0
                ? void 0
                : _a.iframe) === null || _b === void 0
              ? void 0
              : _b.contentWindow;
          console.log('Container event', event, targetCnt);
          if (
            target === event.source &&
            ((_d = (_c = event.data) === null || _c === void 0 ? void 0 : _c.msg) === null || _d === void 0
              ? void 0
              : _d.indexOf('luigi.')) === 0
          ) {
            const msg = event.data.msg;
            switch (msg) {
              case 'luigi.get-context':
                target.postMessage({ msg: 'luigi.init', context: targetCnt.context, internal: {} }, '*');
                break;
              case 'luigi.navigation.open':
                this.dispatch('navigation-request', targetCnt, event.data.params);
                break;
              case 'luigi.ux.alert.show':
                this.dispatch('alert-request', targetCnt, event.data.params);
                break;
              default:
                console.warn('Functionality not yet implemented: ', msg);
                break;
            }
          }
        }
      };
      window.addEventListener('message', globalThis.__luigi_container_manager.messageListener);
    }
    return globalThis.__luigi_container_manager;
  }
  registerContainer(container) {
    this.getContainerManager().container.push(container);
  }
}

/**
 * Default compound renderer.
 */
class DefaultCompoundRenderer {
  constructor(rendererObj) {
    if (rendererObj) {
      this.rendererObject = rendererObj;
      this.config = rendererObj.config || {};
    } else {
      this.config = {};
    }
  }
  createCompoundContainer() {
    return document.createElement('div');
  }
  createCompoundItemContainer(layoutConfig) {
    return document.createElement('div');
  }
  attachCompoundItem(compoundCnt, compoundItemCnt) {
    compoundCnt.appendChild(compoundItemCnt);
  }
}
/**
 * Compound Renderer for custom rendering as defined in luigi config.
 */
class CustomCompoundRenderer extends DefaultCompoundRenderer {
  constructor(rendererObj) {
    super(rendererObj || { use: {} });
    if (rendererObj && rendererObj.use && rendererObj.use.extends) {
      this.superRenderer = resolveRenderer({
        use: rendererObj.use.extends,
        config: rendererObj.config
      });
    }
  }
  createCompoundContainer() {
    if (this.rendererObject.use.createCompoundContainer) {
      return this.rendererObject.use.createCompoundContainer(this.config, this.superRenderer);
    } else if (this.superRenderer) {
      return this.superRenderer.createCompoundContainer();
    }
    return super.createCompoundContainer();
  }
  createCompoundItemContainer(layoutConfig) {
    if (this.rendererObject.use.createCompoundItemContainer) {
      return this.rendererObject.use.createCompoundItemContainer(layoutConfig, this.config, this.superRenderer);
    } else if (this.superRenderer) {
      return this.superRenderer.createCompoundItemContainer(layoutConfig);
    }
    return super.createCompoundItemContainer(layoutConfig);
  }
  attachCompoundItem(compoundCnt, compoundItemCnt) {
    if (this.rendererObject.use.attachCompoundItem) {
      this.rendererObject.use.attachCompoundItem(compoundCnt, compoundItemCnt, this.superRenderer);
    } else if (this.superRenderer) {
      this.superRenderer.attachCompoundItem(compoundCnt, compoundItemCnt);
    } else {
      super.attachCompoundItem(compoundCnt, compoundItemCnt);
    }
  }
}
/**
 * Compound Renderer for a css grid compound view.
 */
class GridCompoundRenderer extends DefaultCompoundRenderer {
  createCompoundContainer() {
    const containerClass = '__lui_compound_' + new Date().getTime();
    const compoundCnt = document.createElement('div');
    compoundCnt.classList.add(containerClass);
    let mediaQueries = '';
    if (this.config.layouts) {
      this.config.layouts.forEach(el => {
        if (el.minWidth || el.maxWidth) {
          let mq = '@media only screen ';
          if (el.minWidth != null) {
            mq += `and (min-width: ${el.minWidth}px) `;
          }
          if (el.maxWidth != null) {
            mq += `and (max-width: ${el.maxWidth}px) `;
          }
          mq += `{
            .${containerClass} {
              grid-template-columns: ${el.columns || 'auto'};
              grid-template-rows: ${el.rows || 'auto'};
              grid-gap: ${el.gap || '0'};
            }
          }
          `;
          mediaQueries += mq;
        }
      });
    }
    compoundCnt.innerHTML = /*html*/ `
        <style scoped>
          .${containerClass} {
            display: grid;
            grid-template-columns: ${this.config.columns || 'auto'};
            grid-template-rows: ${this.config.rows || 'auto'};
            grid-gap: ${this.config.gap || '0'};
            min-height: ${this.config.minHeight || 'auto'};
          }
          ${mediaQueries}
        </style>
    `;
    return compoundCnt;
  }
  createCompoundItemContainer(layoutConfig) {
    const config = layoutConfig || {};
    const compoundItemCnt = document.createElement('div');
    compoundItemCnt.setAttribute('style', `grid-row: ${config.row || 'auto'}; grid-column: ${config.column || 'auto'}`);
    return compoundItemCnt;
  }
}
/**
 * Returns the compound renderer class for a given config.
 * If no specific one is found, {DefaultCompoundRenderer} is returned.
 *
 * @param {*} rendererConfig the renderer config object defined in luigi config
 */
const resolveRenderer = rendererConfig => {
  const rendererDef = rendererConfig.use;
  if (!rendererDef) {
    return new DefaultCompoundRenderer(rendererConfig);
  } else if (rendererDef === 'grid') {
    return new GridCompoundRenderer(rendererConfig);
  } else if (
    rendererDef.createCompoundContainer ||
    rendererDef.createCompoundItemContainer ||
    rendererDef.attachCompoundItem
  ) {
    return new CustomCompoundRenderer(rendererConfig);
  }
  return new DefaultCompoundRenderer(rendererConfig);
};
/**
 * Registers event listeners defined at the navNode.
 *
 * @param {*} eventbusListeners a map of event listener arrays with event id as key
 * @param {*} navNode the web component node configuration object
 * @param {*} nodeId the web component node id
 * @param {*} wcElement the web component element - optional
 */
const registerEventListeners = (eventbusListeners, navNode, nodeId, wcElement) => {
  if (navNode === null || navNode === void 0 ? void 0 : navNode.eventListeners) {
    navNode.eventListeners.forEach(el => {
      const evID = el.source + '.' + el.name;
      const listenerList = eventbusListeners[evID];
      const listenerInfo = {
        wcElementId: nodeId,
        wcElement: wcElement,
        action: el.action,
        converter: el.dataConverter
      };
      if (listenerList) {
        listenerList.push(listenerInfo);
      } else {
        eventbusListeners[evID] = [listenerInfo];
      }
    });
  }
};

/** Methods for dealing with web components based micro frontend handling */
class WebComponentService {
  constructor() {
    this.containerService = new ContainerService();
  }
  dynamicImport(viewUrl) {
    return import(viewUrl);
  }
  processViewUrl(viewUrl, data) {
    return viewUrl;
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
      this.initWC(wc, wc_id, wc_container, viewUrl, ctx, nodeId);
      wc_container.replaceChild(wc, wcItemPlaceholder);
    }
  }
  createClientAPI(eventBusElement, nodeId, wc_id) {
    return {
      linkManager: () => {},
      uxManager: () => {
        return {
          showAlert: alertSettings => {},
          showConfirmationModal: async settings => {
            return new Promise((resolve, reject) => {
              resolve(true);
            });
          }
        };
      },
      getCurrentLocale: () => {},
      publishEvent: ev => {
        // if (eventBusElement.eventBus) {
        // eventBusElement.eventBus.onPublishEvent(ev, nodeId, wc_id);
        // }
      }
    };
  }
  initWC(wc, wc_id, eventBusElement, viewUrl, ctx, nodeId) {
    const clientAPI = this.createClientAPI(eventBusElement, nodeId, wc_id);
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
    const i18nViewUrl = this.processViewUrl(viewUrl);
    return new Promise((resolve, reject) => {
      if (this.checkWCUrl(i18nViewUrl)) {
        this.dynamicImport(i18nViewUrl)
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
              resolve(1);
            } catch (e) {
              reject(e);
            }
          })
          .catch(err => reject(err));
      } else {
        console.warn(`View URL '${i18nViewUrl}' not allowed to be included`);
        reject(`View URL '${i18nViewUrl}' not allowed`);
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
      let scriptTag = document.createElement('script');
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
  checkWCUrl(url) {
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
    return true;
  }
  /** Adds a web component defined by viewUrl to the wc_container and sets the node context.
   * If the web component is not defined yet, it gets imported.
   */
  renderWebComponent(viewUrl, wc_container, context, node, nodeId) {
    const i18nViewUrl = this.processViewUrl(viewUrl, { context });
    const wc_id =
      node.webcomponent && node.webcomponent.tagName ? node.webcomponent.tagName : this.generateWCId(i18nViewUrl);
    const wcItemPlaceholder = document.createElement('div');
    wc_container.appendChild(wcItemPlaceholder);
    wc_container._luigi_node = node;
    if (window.customElements.get(wc_id)) {
      this.attachWC(wc_id, wcItemPlaceholder, wc_container, context, i18nViewUrl, nodeId);
    } else {
      /** Custom import function, if defined */
      if (window.luigiWCFn) {
        window.luigiWCFn(i18nViewUrl, wc_id, wcItemPlaceholder, () => {
          this.attachWC(wc_id, wcItemPlaceholder, wc_container, context, i18nViewUrl, nodeId);
        });
      } else if (node.webcomponent && node.webcomponent.selfRegistered) {
        this.includeSelfRegisteredWCFromUrl(node, i18nViewUrl, () => {
          this.attachWC(wc_id, wcItemPlaceholder, wc_container, context, i18nViewUrl, nodeId);
        });
      } else {
        this.registerWCFromUrl(i18nViewUrl, wc_id).then(() => {
          this.attachWC(wc_id, wcItemPlaceholder, wc_container, context, i18nViewUrl, nodeId);
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
  createCompoundContainerAsync(renderer, ctx) {
    return new Promise((resolve, reject) => {
      if (renderer.viewUrl) {
        try {
          const wc_id = this.generateWCId(renderer.viewUrl);
          this.registerWCFromUrl(renderer.viewUrl, wc_id).then(() => {
            const wc = document.createElement(wc_id);
            this.initWC(wc, wc_id, wc, renderer.viewUrl, ctx, '_root');
            resolve(wc);
          });
        } catch (e) {
          reject(e);
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
   * @param {*} wc_container the web component container dom element
   * @param {*} context the luigi node context
   */
  renderWebComponentCompound(navNode, wc_container, context) {
    var _a;
    let renderer;
    if (navNode.webcomponent && navNode.viewUrl) {
      renderer = new DefaultCompoundRenderer();
      renderer.viewUrl = this.processViewUrl(navNode.viewUrl, { context });
      renderer.createCompoundItemContainer = layoutConfig => {
        var cnt = document.createElement('div');
        if (layoutConfig && layoutConfig.slot) {
          cnt.setAttribute('slot', layoutConfig.slot);
        }
        return cnt;
      };
    } else if ((_a = navNode.compound) === null || _a === void 0 ? void 0 : _a.renderer) {
      renderer = resolveRenderer(navNode.compound.renderer);
    }
    renderer = renderer || new DefaultCompoundRenderer();
    return new Promise(resolve => {
      this.createCompoundContainerAsync(renderer, context).then(compoundCnt => {
        var _a;
        const ebListeners = {};
        compoundCnt.eventBus = {
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
        (_a = navNode.compound) === null || _a === void 0
          ? void 0
          : _a.children.forEach((wc, index) => {
              const ctx = Object.assign(Object.assign({}, context), wc.context);
              const compoundItemCnt = renderer.createCompoundItemContainer(wc.layoutConfig);
              compoundItemCnt.eventBus = compoundCnt.eventBus;
              renderer.attachCompoundItem(compoundCnt, compoundItemCnt);
              const nodeId = wc.id || 'gen_' + index;
              this.renderWebComponent(wc.viewUrl, compoundItemCnt, ctx, wc, nodeId);
              registerEventListeners(ebListeners, wc, nodeId);
            });
        wc_container.appendChild(compoundCnt);
        // listener for nesting wc
        registerEventListeners(ebListeners, navNode.compound, '_root', compoundCnt);
        resolve(compoundCnt);
      });
    });
  }
}

/* src/LuigiContainer.svelte generated by Svelte v3.46.4 */

const { console: console_1$1 } = globals;
const file$1 = 'src/LuigiContainer.svelte';

// (87:1) {#if !deferInit}
function create_if_block(ctx) {
  let show_if = !(/*isWebComponent*/ ctx[5]());
  let if_block_anchor;
  let if_block = show_if && create_if_block_1(ctx);

  const block = {
    c: function create() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (show_if) if_block.p(ctx, dirty);
    },
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };

  dispatch_dev('SvelteRegisterBlock', {
    block,
    id: create_if_block.name,
    type: 'if',
    source: '(87:1) {#if !deferInit}',
    ctx
  });

  return block;
}

// (88:2) {#if !isWebComponent()}
function create_if_block_1(ctx) {
  let iframe;
  let iframe_src_value;

  const block = {
    c: function create() {
      iframe = element('iframe');
      if (!src_url_equal(iframe.src, (iframe_src_value = /*viewurl*/ ctx[0])))
        attr_dev(iframe, 'src', iframe_src_value);
      attr_dev(iframe, 'title', /*label*/ ctx[1]);
      add_location(iframe, file$1, 88, 3, 2288);
    },
    m: function mount(target, anchor) {
      insert_dev(target, iframe, anchor);
      /*iframe_binding*/ ctx[8](iframe);
    },
    p: function update(ctx, dirty) {
      if (dirty & /*viewurl*/ 1 && !src_url_equal(iframe.src, (iframe_src_value = /*viewurl*/ ctx[0]))) {
        attr_dev(iframe, 'src', iframe_src_value);
      }

      if (dirty & /*label*/ 2) {
        attr_dev(iframe, 'title', /*label*/ ctx[1]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(iframe);
      /*iframe_binding*/ ctx[8](null);
    }
  };

  dispatch_dev('SvelteRegisterBlock', {
    block,
    id: create_if_block_1.name,
    type: 'if',
    source: '(88:2) {#if !isWebComponent()}',
    ctx
  });

  return block;
}

function create_fragment$1(ctx) {
  let main;
  let if_block = !(/*deferInit*/ ctx[4]) && create_if_block(ctx);

  const block = {
    c: function create() {
      main = element('main');
      if (if_block) if_block.c();
      this.c = noop;
      attr_dev(main, 'class', /*isWebComponent*/ ctx[5]() ? undefined : 'lui-isolated');
      add_location(main, file$1, 85, 0, 2154);
    },
    l: function claim(nodes) {
      throw new Error('options.hydrate only works if the component was compiled with the `hydratable: true` option');
    },
    m: function mount(target, anchor) {
      insert_dev(target, main, anchor);
      if (if_block) if_block.m(main, null);
      /*main_binding*/ ctx[9](main);
    },
    p: function update(ctx, [dirty]) {
      if (!(/*deferInit*/ ctx[4])) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(main, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(main);
      if (if_block) if_block.d();
      /*main_binding*/ ctx[9](null);
    }
  };

  dispatch_dev('SvelteRegisterBlock', {
    block,
    id: create_fragment$1.name,
    type: 'component',
    source: '',
    ctx
  });

  return block;
}

function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots('undefined', slots, []);
  let { viewurl } = $$props;
  let { context } = $$props;
  let { label } = $$props;
  let { webcomponent } = $$props;
  let iframeHandle = {};
  let mainComponent;
  const containerService = new ContainerService();
  const webcomponentService = new WebComponentService();

  webcomponentService.createClientAPI = (eventBusElement, nodeId, wc_id) => {
    return {
      linkManager: () => {
        return {
          navigate: route => {
            dispatchLuigiEvent('navigation-request', { link: route });
          }
        };
      },
      uxManager: () => {
        return {
          showAlert: alertSettings => {
            dispatchLuigiEvent('alert-request', alertSettings);
          },
          showConfirmationModal: async settings => {
            return new Promise((resolve, reject) => {
              dispatchLuigiEvent('confirmation-request', settings, data => {
                if (data) {
                  resolve(data);
                } else {
                  reject();
                }
              });
            });
          }
        };
      }, //window.Luigi.ux,
      getCurrentLocale: () => {}, //() => window.Luigi.i18n().getCurrentLocale(),
      publishEvent: ev => {} // if (eventBusElement.eventBus) {
      // eventBusElement.eventBus.onPublishEvent(ev, nodeId, wc_id);
      // }
    };
  };

  const thisComponent = get_current_component();
  thisComponent.iframeHandle = iframeHandle;
  let deferInit = !!thisComponent.attributes['defer-init'];

  thisComponent.init = () => {
    $$invalidate(4, (deferInit = false));
  };

  containerService.registerContainer(thisComponent);

  function dispatchLuigiEvent(msg, data, callback) {
    containerService.dispatch(msg, thisComponent, data, callback);
  }

  function isWebComponent() {
    return !!webcomponent;
  }

  onMount(async () => {
    const ctx = context ? JSON.parse(context) : undefined;
    console.log(ctx);

    if (isWebComponent()) {
      $$invalidate(3, (mainComponent.innerHTML = ''), mainComponent);
      webcomponentService.renderWebComponent(viewurl, mainComponent, ctx, {});
    }
  });

  onDestroy(async () => {});

  const writable_props = ['viewurl', 'context', 'label', 'webcomponent'];

  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot')
      console_1$1.warn(`<undefined> was created with unknown prop '${key}'`);
  });

  function iframe_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
      iframeHandle.iframe = $$value;
      $$invalidate(2, iframeHandle);
    });
  }

  function main_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
      mainComponent = $$value;
      $$invalidate(3, mainComponent);
    });
  }

  $$self.$$set = $$props => {
    if ('viewurl' in $$props) $$invalidate(0, (viewurl = $$props.viewurl));
    if ('context' in $$props) $$invalidate(6, (context = $$props.context));
    if ('label' in $$props) $$invalidate(1, (label = $$props.label));
    if ('webcomponent' in $$props) $$invalidate(7, (webcomponent = $$props.webcomponent));
  };

  $$self.$capture_state = () => ({
    viewurl,
    context,
    label,
    webcomponent,
    iframeHandle,
    mainComponent,
    onMount,
    onDestroy,
    get_current_component,
    ContainerService,
    WebComponentService,
    containerService,
    webcomponentService,
    thisComponent,
    deferInit,
    dispatchLuigiEvent,
    isWebComponent
  });

  $$self.$inject_state = $$props => {
    if ('viewurl' in $$props) $$invalidate(0, (viewurl = $$props.viewurl));
    if ('context' in $$props) $$invalidate(6, (context = $$props.context));
    if ('label' in $$props) $$invalidate(1, (label = $$props.label));
    if ('webcomponent' in $$props) $$invalidate(7, (webcomponent = $$props.webcomponent));
    if ('iframeHandle' in $$props) $$invalidate(2, (iframeHandle = $$props.iframeHandle));
    if ('mainComponent' in $$props) $$invalidate(3, (mainComponent = $$props.mainComponent));
    if ('deferInit' in $$props) $$invalidate(4, (deferInit = $$props.deferInit));
  };

  if ($$props && '$$inject' in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [
    viewurl,
    label,
    iframeHandle,
    mainComponent,
    deferInit,
    isWebComponent,
    context,
    webcomponent,
    iframe_binding,
    main_binding
  ];
}

class LuigiContainer extends SvelteElement {
  constructor(options) {
    super();
    this.shadowRoot.innerHTML = `<style>main,iframe{width:100%;height:100%;border:none}main.lui-isolated{line-height:0}</style>`;

    init(
      this,
      {
        target: this.shadowRoot,
        props: attribute_to_object(this.attributes),
        customElement: true
      },
      instance$1,
      create_fragment$1,
      safe_not_equal,
      {
        viewurl: 0,
        context: 6,
        label: 1,
        webcomponent: 7
      },
      null
    );

    const { ctx } = this.$$;
    const props = this.attributes;

    if (/*viewurl*/ ctx[0] === undefined && !('viewurl' in props)) {
      console_1$1.warn("<undefined> was created without expected prop 'viewurl'");
    }

    if (/*context*/ ctx[6] === undefined && !('context' in props)) {
      console_1$1.warn("<undefined> was created without expected prop 'context'");
    }

    if (/*label*/ ctx[1] === undefined && !('label' in props)) {
      console_1$1.warn("<undefined> was created without expected prop 'label'");
    }

    if (/*webcomponent*/ ctx[7] === undefined && !('webcomponent' in props)) {
      console_1$1.warn("<undefined> was created without expected prop 'webcomponent'");
    }

    if (options) {
      if (options.target) {
        insert_dev(options.target, this, options.anchor);
      }

      if (options.props) {
        this.$set(options.props);
        flush();
      }
    }
  }

  static get observedAttributes() {
    return ['viewurl', 'context', 'label', 'webcomponent'];
  }

  get viewurl() {
    return this.$$.ctx[0];
  }

  set viewurl(viewurl) {
    this.$$set({ viewurl });
    flush();
  }

  get context() {
    return this.$$.ctx[6];
  }

  set context(context) {
    this.$$set({ context });
    flush();
  }

  get label() {
    return this.$$.ctx[1];
  }

  set label(label) {
    this.$$set({ label });
    flush();
  }

  get webcomponent() {
    return this.$$.ctx[7];
  }

  set webcomponent(webcomponent) {
    this.$$set({ webcomponent });
    flush();
  }
}

/* src/LuigiCompoundContainer.svelte generated by Svelte v3.46.4 */

const { console: console_1 } = globals;
const file = 'src/LuigiCompoundContainer.svelte';

function create_fragment(ctx) {
  let main;

  const block = {
    c: function create() {
      main = element('main');
      this.c = noop;
      add_location(main, file, 77, 0, 2189);
    },
    l: function claim(nodes) {
      throw new Error('options.hydrate only works if the component was compiled with the `hydratable: true` option');
    },
    m: function mount(target, anchor) {
      insert_dev(target, main, anchor);
      /*main_binding*/ ctx[2](main);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(main);
      /*main_binding*/ ctx[2](null);
    }
  };

  dispatch_dev('SvelteRegisterBlock', {
    block,
    id: create_fragment.name,
    type: 'component',
    source: '',
    ctx
  });

  return block;
}

function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots('undefined', slots, []);
  let { context } = $$props;

  // export let label;
  let compoundConfig;

  let initialized = false;
  let mainComponent;
  let eventBusElement;
  const containerService = new ContainerService();
  const webcomponentService = new WebComponentService();

  webcomponentService.createClientAPI = (eventBusElement, nodeId, wc_id) => {
    return {
      linkManager: () => {}, //window.Luigi.navigation,
      uxManager: () => {
        return {
          showAlert: alertSettings => {
            dispatchLuigiEvent('alert-request', alertSettings);
          },
          showConfirmationModal: async settings => {
            return new Promise((resolve, reject) => {
              dispatchLuigiEvent('confirmation-request', settings, data => {
                if (data) {
                  resolve(data);
                } else {
                  reject();
                }
              });
            });
          }
        };
      }, //window.Luigi.ux,
      getCurrentLocale: () => {}, //() => window.Luigi.i18n().getCurrentLocale(),
      publishEvent: ev => {
        console.log('pub', ev);

        if (eventBusElement && eventBusElement.eventBus) {
          eventBusElement.eventBus.onPublishEvent(ev, nodeId, wc_id);
        }
      }
    };
  };

  const thisComponent = get_current_component();
  let deferInit = !!thisComponent.attributes['defer-init'];

  thisComponent.init = () => {
    if (!thisComponent.compoundConfig || initialized) return;
    deferInit = false;
    console.log('init compound');
    const node = { compound: thisComponent.compoundConfig }; // TODO: fill with sth

    webcomponentService.renderWebComponentCompound(node, mainComponent, context).then(compCnt => {
      eventBusElement = compCnt;
    });

    initialized = true;
  };

  containerService.registerContainer(thisComponent);

  function dispatchLuigiEvent(msg, data, callback) {
    containerService.dispatch(msg, thisComponent, data, callback);
  }

  onMount(async () => {
    const ctx = context ? JSON.parse(context) : undefined;
    console.log(ctx);
  });

  const writable_props = ['context'];

  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot')
      console_1.warn(`<undefined> was created with unknown prop '${key}'`);
  });

  function main_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
      mainComponent = $$value;
      $$invalidate(0, mainComponent);
    });
  }

  $$self.$$set = $$props => {
    if ('context' in $$props) $$invalidate(1, (context = $$props.context));
  };

  $$self.$capture_state = () => ({
    context,
    compoundConfig,
    initialized,
    mainComponent,
    eventBusElement,
    onMount,
    get_current_component,
    ContainerService,
    WebComponentService,
    containerService,
    webcomponentService,
    thisComponent,
    deferInit,
    dispatchLuigiEvent
  });

  $$self.$inject_state = $$props => {
    if ('context' in $$props) $$invalidate(1, (context = $$props.context));
    if ('compoundConfig' in $$props) compoundConfig = $$props.compoundConfig;
    if ('initialized' in $$props) initialized = $$props.initialized;
    if ('mainComponent' in $$props) $$invalidate(0, (mainComponent = $$props.mainComponent));
    if ('eventBusElement' in $$props) eventBusElement = $$props.eventBusElement;
    if ('deferInit' in $$props) deferInit = $$props.deferInit;
  };

  if ($$props && '$$inject' in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [mainComponent, context, main_binding];
}

class LuigiCompoundContainer extends SvelteElement {
  constructor(options) {
    super();
    this.shadowRoot.innerHTML = `<style>main{width:100%;height:100%;border:none}</style>`;

    init(
      this,
      {
        target: this.shadowRoot,
        props: attribute_to_object(this.attributes),
        customElement: true
      },
      instance,
      create_fragment,
      safe_not_equal,
      { context: 1 },
      null
    );

    const { ctx } = this.$$;
    const props = this.attributes;

    if (/*context*/ ctx[1] === undefined && !('context' in props)) {
      console_1.warn("<undefined> was created without expected prop 'context'");
    }

    if (options) {
      if (options.target) {
        insert_dev(options.target, this, options.anchor);
      }

      if (options.props) {
        this.$set(options.props);
        flush();
      }
    }
  }

  static get observedAttributes() {
    return ['context'];
  }

  get context() {
    return this.$$.ctx[1];
  }

  set context(context) {
    this.$$set({ context });
    flush();
  }
}

export { LuigiCompoundContainer, LuigiContainer };
//# sourceMappingURL=bundle.js.map
