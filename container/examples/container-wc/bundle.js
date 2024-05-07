function t() {}
function e(t) {
  return t();
}
function n() {
  return Object.create(null);
}
function i(t) {
  t.forEach(e);
}
function s(t) {
  return 'function' == typeof t;
}
function r(t, e) {
  return t != t ? e == e : t !== e || (t && 'object' == typeof t) || 'function' == typeof t;
}
let o, a;
function c(t, e) {
  return t === e || (o || (o = document.createElement('a')), (o.href = e), t === o.href);
}
function u(t) {
  return null == t ? '' : t;
}
function l(t, e, n) {
  const i = (function(t) {
    if (!t) return document;
    const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
    if (e && e.host) return e;
    return t.ownerDocument;
  })(t);
  if (!i.getElementById(e)) {
    const t = m('style');
    (t.id = e),
      (t.textContent = n),
      (function(t, e) {
        (function(t, e) {
          t.appendChild(e);
        })(t.head || t, e),
          e.sheet;
      })(i, t);
  }
}
function d(t, e, n) {
  t.insertBefore(e, n || null);
}
function h(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function m(t) {
  return document.createElement(t);
}
function p() {
  return (t = ''), document.createTextNode(t);
  var t;
}
function E(t, e, n) {
  null == n ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function _(t) {
  a = t;
}
function g() {
  if (!a) throw new Error('Function called outside component initialization');
  return a;
}
function $(t) {
  g().$$.on_mount.push(t);
}
const T = [],
  f = [];
let S = [];
const C = [],
  R = Promise.resolve();
let b = !1;
function A(t) {
  S.push(t);
}
const I = new Set();
let w = 0;
function v() {
  if (0 !== w) return;
  const t = a;
  do {
    try {
      for (; w < T.length; ) {
        const t = T[w];
        w++, _(t), O(t.$$);
      }
    } catch (t) {
      throw ((T.length = 0), (w = 0), t);
    }
    for (_(null), T.length = 0, w = 0; f.length; ) f.pop()();
    for (let t = 0; t < S.length; t += 1) {
      const e = S[t];
      I.has(e) || (I.add(e), e());
    }
    S.length = 0;
  } while (T.length);
  for (; C.length; ) C.pop()();
  (b = !1), I.clear(), _(t);
}
function O(t) {
  if (null !== t.fragment) {
    t.update(), i(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(A);
  }
}
const U = new Set();
function N(t, e) {
  const n = t.$$;
  null !== n.fragment &&
    (!(function(t) {
      const e = [],
        n = [];
      S.forEach(i => (-1 === t.indexOf(i) ? e.push(i) : n.push(i))), n.forEach(t => t()), (S = e);
    })(n.after_update),
    i(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []));
}
function y(t, e) {
  -1 === t.$$.dirty[0] && (T.push(t), b || ((b = !0), R.then(v)), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function L(r, o, c, u, l, d, m = null, p = [-1]) {
  const E = a;
  _(r);
  const g = (r.$$ = {
    fragment: null,
    ctx: [],
    props: d,
    update: t,
    not_equal: l,
    bound: n(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(o.context || (E ? E.$$.context : [])),
    callbacks: n(),
    dirty: p,
    skip_bound: !1,
    root: o.target || E.$$.root
  });
  m && m(g.root);
  let $ = !1;
  if (
    ((g.ctx = c
      ? c(r, o.props || {}, (t, e, ...n) => {
          const i = n.length ? n[0] : e;
          return (
            g.ctx && l(g.ctx[t], (g.ctx[t] = i)) && (!g.skip_bound && g.bound[t] && g.bound[t](i), $ && y(r, t)), e
          );
        })
      : []),
    g.update(),
    ($ = !0),
    i(g.before_update),
    (g.fragment = !!u && u(g.ctx)),
    o.target)
  ) {
    if (o.hydrate) {
      const t = (function(t) {
        return Array.from(t.childNodes);
      })(o.target);
      g.fragment && g.fragment.l(t), t.forEach(h);
    } else g.fragment && g.fragment.c();
    o.intro && (T = r.$$.fragment) && T.i && (U.delete(T), T.i(f)),
      (function(t, n, r) {
        const { fragment: o, after_update: a } = t.$$;
        o && o.m(n, r),
          A(() => {
            const n = t.$$.on_mount.map(e).filter(s);
            t.$$.on_destroy ? t.$$.on_destroy.push(...n) : i(n), (t.$$.on_mount = []);
          }),
          a.forEach(A);
      })(r, o.target, o.anchor),
      v();
  }
  var T, f;
  _(E);
}
let P;
function x(t, e, n, i) {
  const s = n[t]?.type;
  if (((e = 'Boolean' === s && 'boolean' != typeof e ? null != e : e), !i || !n[t])) return e;
  if ('toAttribute' === i)
    switch (s) {
      case 'Object':
      case 'Array':
        return null == e ? null : JSON.stringify(e);
      case 'Boolean':
        return e ? '' : null;
      case 'Number':
        return null == e ? null : e;
      default:
        return e;
    }
  else
    switch (s) {
      case 'Object':
      case 'Array':
        return e && JSON.parse(e);
      case 'Boolean':
      default:
        return e;
      case 'Number':
        return null != e ? +e : e;
    }
}
function D(t, e, n, i, s, r) {
  let o = class extends P {
    constructor() {
      super(t, n, s), (this.$$p_d = e);
    }
    static get observedAttributes() {
      return Object.keys(e).map(t => (e[t].attribute || t).toLowerCase());
    }
  };
  return (
    Object.keys(e).forEach(t => {
      Object.defineProperty(o.prototype, t, {
        get() {
          return this.$$c && t in this.$$c ? this.$$c[t] : this.$$d[t];
        },
        set(n) {
          (n = x(t, n, e)), (this.$$d[t] = n), this.$$c?.$set({ [t]: n });
        }
      });
    }),
    i.forEach(t => {
      Object.defineProperty(o.prototype, t, {
        get() {
          return this.$$c?.[t];
        }
      });
    }),
    r && (o = r(o)),
    (t.element = o),
    o
  );
}
'function' == typeof HTMLElement &&
  (P = class extends HTMLElement {
    $$ctor;
    $$s;
    $$c;
    $$cn = !1;
    $$d = {};
    $$r = !1;
    $$p_d = {};
    $$l = {};
    $$l_u = new Map();
    constructor(t, e, n) {
      super(), (this.$$ctor = t), (this.$$s = e), n && this.attachShadow({ mode: 'open' });
    }
    addEventListener(t, e, n) {
      if (((this.$$l[t] = this.$$l[t] || []), this.$$l[t].push(e), this.$$c)) {
        const n = this.$$c.$on(t, e);
        this.$$l_u.set(e, n);
      }
      super.addEventListener(t, e, n);
    }
    removeEventListener(t, e, n) {
      if ((super.removeEventListener(t, e, n), this.$$c)) {
        const t = this.$$l_u.get(e);
        t && (t(), this.$$l_u.delete(e));
      }
    }
    async connectedCallback() {
      if (((this.$$cn = !0), !this.$$c)) {
        if ((await Promise.resolve(), !this.$$cn)) return;
        function t(t) {
          return () => {
            let e;
            return {
              c: function() {
                (e = m('slot')), 'default' !== t && E(e, 'name', t);
              },
              m: function(t, n) {
                d(t, e, n);
              },
              d: function(t) {
                t && h(e);
              }
            };
          };
        }
        const e = {},
          n = (function(t) {
            const e = {};
            return (
              t.childNodes.forEach(t => {
                e[t.slot || 'default'] = !0;
              }),
              e
            );
          })(this);
        for (const s of this.$$s) s in n && (e[s] = [t(s)]);
        for (const r of this.attributes) {
          const o = this.$$g_p(r.name);
          o in this.$$d || (this.$$d[o] = x(o, r.value, this.$$p_d, 'toProp'));
        }
        for (const a in this.$$p_d) a in this.$$d || void 0 === this[a] || ((this.$$d[a] = this[a]), delete this[a]);
        this.$$c = new this.$$ctor({
          target: this.shadowRoot || this,
          props: { ...this.$$d, $$slots: e, $$scope: { ctx: [] } }
        });
        const i = () => {
          this.$$r = !0;
          for (const t in this.$$p_d)
            if (((this.$$d[t] = this.$$c.$$.ctx[this.$$c.$$.props[t]]), this.$$p_d[t].reflect)) {
              const e = x(t, this.$$d[t], this.$$p_d, 'toAttribute');
              null == e
                ? this.removeAttribute(this.$$p_d[t].attribute || t)
                : this.setAttribute(this.$$p_d[t].attribute || t, e);
            }
          this.$$r = !1;
        };
        this.$$c.$$.after_update.push(i), i();
        for (const c in this.$$l)
          for (const u of this.$$l[c]) {
            const l = this.$$c.$on(c, u);
            this.$$l_u.set(u, l);
          }
        this.$$l = {};
      }
    }
    attributeChangedCallback(t, e, n) {
      this.$$r ||
        ((t = this.$$g_p(t)), (this.$$d[t] = x(t, n, this.$$p_d, 'toProp')), this.$$c?.$set({ [t]: this.$$d[t] }));
    }
    disconnectedCallback() {
      (this.$$cn = !1),
        Promise.resolve().then(() => {
          this.$$cn || (this.$$c.$destroy(), (this.$$c = void 0));
        });
    }
    $$g_p(t) {
      return (
        Object.keys(this.$$p_d).find(
          e => this.$$p_d[e].attribute === t || (!this.$$p_d[e].attribute && e.toLowerCase() === t)
        ) || t
      );
    }
  });
class k {
  $$ = void 0;
  $$set = void 0;
  $destroy() {
    N(this, 1), (this.$destroy = t);
  }
  $on(e, n) {
    if (!s(n)) return t;
    const i = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return (
      i.push(n),
      () => {
        const t = i.indexOf(n);
        -1 !== t && i.splice(t, 1);
      }
    );
  }
  $set(t) {
    var e;
    this.$$set &&
      ((e = t), 0 !== Object.keys(e).length) &&
      ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
  }
}
var Q, M;
'undefined' != typeof window && (window.__svelte || (window.__svelte = { v: new Set() })).v.add('4'),
  (function(t) {
    (t.CUSTOM_MESSAGE = 'custom-message'),
      (t.GET_CONTEXT_REQUEST = 'get-context-request'),
      (t.NAVIGATION_REQUEST = 'navigation-request'),
      (t.ALERT_REQUEST = 'show-alert-request'),
      (t.ALERT_CLOSED = 'close-alert-request'),
      (t.INITIALIZED = 'initialized'),
      (t.ADD_SEARCH_PARAMS_REQUEST = 'add-search-params-request'),
      (t.ADD_NODE_PARAMS_REQUEST = 'add-node-params-request'),
      (t.SHOW_CONFIRMATION_MODAL_REQUEST = 'show-confirmation-modal-request'),
      (t.SHOW_LOADING_INDICATOR_REQUEST = 'show-loading-indicator-request'),
      (t.HIDE_LOADING_INDICATOR_REQUEST = 'hide-loading-indicator-request'),
      (t.SET_CURRENT_LOCALE_REQUEST = 'set-current-locale-request'),
      (t.LOCAL_STORAGE_SET_REQUEST = 'set-storage-request'),
      (t.RUNTIME_ERROR_HANDLING_REQUEST = 'runtime-error-handling-request'),
      (t.SET_ANCHOR_LINK_REQUEST = 'set-anchor-request'),
      (t.SET_THIRD_PARTY_COOKIES_REQUEST = 'set-third-party-cookies-request'),
      (t.BACK_NAVIGATION_REQUEST = 'navigate-back-request'),
      (t.GET_CURRENT_ROUTE_REQUEST = 'get-current-route-request'),
      (t.NAVIGATION_COMPLETED_REPORT = 'report-navigation-completed-request'),
      (t.UPDATE_MODAL_PATH_DATA_REQUEST = 'update-modal-path-data-request'),
      (t.CHECK_PATH_EXISTS_REQUEST = 'check-path-exists-request'),
      (t.SET_DIRTY_STATUS_REQUEST = 'set-dirty-status-request'),
      (t.SET_VIEW_GROUP_DATA_REQUEST = 'set-viewgroup-data-request'),
      (t.SET_DOCUMENT_TITLE_REQUEST = 'set-document-title-request'),
      (t.OPEN_USER_SETTINGS_REQUEST = 'open-user-settings-request'),
      (t.CLOSE_USER_SETTINGS_REQUEST = 'close-user-settings-request'),
      (t.COLLAPSE_LEFT_NAV_REQUEST = 'collapse-leftnav-request'),
      (t.UPDATE_TOP_NAVIGATION_REQUEST = 'update-top-navigation-request'),
      (t.PATH_EXISTS_REQUEST = 'path-exists-request'),
      (t.GO_BACK_REQUEST = 'go-back-request'),
      (t.HAS_BACK_REQUEST = 'has-back-request'),
      (t.REMOVE_BACKDROP_REQUEST = 'remove-backdrop-request');
  })(Q || (Q = {})),
  (function(t) {
    (t.CUSTOM_MESSAGE = 'custom'),
      (t.GET_CONTEXT = 'luigi.get-context'),
      (t.SEND_CONTEXT_HANDSHAKE = 'luigi.init'),
      (t.CONTEXT_RECEIVED = 'luigi.init.ok'),
      (t.NAVIGATION_REQUEST = 'luigi.navigation.open'),
      (t.ALERT_REQUEST = 'luigi.ux.alert.show'),
      (t.ALERT_CLOSED = 'luigi.ux.alert.hide'),
      (t.INITIALIZED = 'luigi.init.ok'),
      (t.ADD_SEARCH_PARAMS_REQUEST = 'luigi.addSearchParams'),
      (t.ADD_NODE_PARAMS_REQUEST = 'luigi.addNodeParams'),
      (t.SHOW_CONFIRMATION_MODAL_REQUEST = 'luigi.ux.confirmationModal.show'),
      (t.SHOW_LOADING_INDICATOR_REQUEST = 'luigi.show-loading-indicator'),
      (t.HIDE_LOADING_INDICATOR_REQUEST = 'luigi.hide-loading-indicator'),
      (t.SET_CURRENT_LOCALE_REQUEST = 'luigi.ux.set-current-locale'),
      (t.LOCAL_STORAGE_SET_REQUEST = 'storage'),
      (t.RUNTIME_ERROR_HANDLING_REQUEST = 'luigi-runtime-error-handling'),
      (t.SET_ANCHOR_LINK_REQUEST = 'luigi.setAnchor'),
      (t.SET_THIRD_PARTY_COOKIES_REQUEST = 'luigi.third-party-cookie'),
      (t.BACK_NAVIGATION_REQUEST = 'luigi.navigation.back'),
      (t.GET_CURRENT_ROUTE_REQUEST = 'luigi.navigation.currentRoute'),
      (t.SEND_CONTEXT_OBJECT = 'luigi.navigate'),
      (t.NAVIGATION_COMPLETED_REPORT = 'luigi.navigate.ok'),
      (t.UPDATE_MODAL_PATH_DATA_REQUEST = 'luigi.navigation.updateModalDataPath'),
      (t.CHECK_PATH_EXISTS_REQUEST = 'luigi.navigation.pathExists'),
      (t.SET_DIRTY_STATUS_REQUEST = 'luigi.set-page-dirty');
  })(M || (M = {}));
const H = new (class {
  isFunction(t) {
    return t && '[object Function]' === {}.toString.call(t);
  }
  isObject(t) {
    return !(!t || 'object' != typeof t || Array.isArray(t));
  }
  checkWebcomponentValue(t) {
    return 'string' == typeof t
      ? JSON.parse(t)
      : 'boolean' == typeof t || 'object' == typeof t
      ? t
      : void console.warn('Webcomponent value has a wrong type.');
  }
  resolveContext(t) {
    return t ? ('string' == typeof t ? JSON.parse(t) : t) : {};
  }
})();
class W {
  isVisible(t) {
    return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
  }
  sendCustomMessageToIframe(t, e, n) {
    const i = n || 'custom';
    if (t.iframe.contentWindow) {
      const n = new URL(t.iframe.src);
      'custom' === i
        ? t.iframe.contentWindow.postMessage({ msg: i, data: e }, n.origin)
        : t.iframe.contentWindow.postMessage(Object.assign({ msg: i }, e), n.origin);
    } else console.error('Message target could not be resolved');
  }
  dispatch(t, e, n, i, s) {
    const r = new CustomEvent(t, { detail: n });
    i &&
      H.isFunction(i) &&
      s &&
      (r[s] = t => {
        i(t);
      }),
      e.dispatchEvent(r);
  }
  getTargetContainer(t) {
    let e;
    return (
      globalThis.__luigi_container_manager.container.forEach(n => {
        var i;
        (null === (i = n.iframeHandle) || void 0 === i ? void 0 : i.iframe) &&
          n.iframeHandle.iframe.contentWindow === t.source &&
          (e = n);
      }),
      e
    );
  }
  getContainerManager() {
    return (
      globalThis.__luigi_container_manager ||
        ((globalThis.__luigi_container_manager = {
          container: [],
          messageListener: t => {
            var e, n;
            const i = this.getTargetContainer(t),
              s =
                null === (n = null === (e = null == i ? void 0 : i.iframeHandle) || void 0 === e ? void 0 : e.iframe) ||
                void 0 === n
                  ? void 0
                  : n.contentWindow;
            if (s && s === t.source) {
              const e = t.data.msg;
              switch (e) {
                case M.CUSTOM_MESSAGE:
                  {
                    const e = t.data.data,
                      n = e.id;
                    delete e.id, this.dispatch(Q.CUSTOM_MESSAGE, i, { id: n, _metaData: {}, data: e });
                  }
                  break;
                case M.GET_CONTEXT:
                  s.postMessage({ msg: M.SEND_CONTEXT_HANDSHAKE, context: i.context || {}, internal: {} }, '*');
                  break;
                case M.NAVIGATION_REQUEST:
                  this.dispatch(Q.NAVIGATION_REQUEST, i, t.data.params);
                  break;
                case M.ALERT_REQUEST:
                  this.dispatch(Q.ALERT_REQUEST, i, t);
                  break;
                case M.INITIALIZED:
                  this.dispatch(Q.INITIALIZED, i, t.data.params);
                  break;
                case M.ADD_SEARCH_PARAMS_REQUEST:
                  this.dispatch(Q.ADD_SEARCH_PARAMS_REQUEST, i, {
                    data: t.data.data,
                    keepBrowserHistory: t.data.keepBrowserHistory
                  });
                  break;
                case M.ADD_NODE_PARAMS_REQUEST:
                  this.dispatch(Q.ADD_NODE_PARAMS_REQUEST, i, {
                    data: t.data.data,
                    keepBrowserHistory: t.data.keepBrowserHistory
                  });
                  break;
                case M.SHOW_CONFIRMATION_MODAL_REQUEST:
                  this.dispatch(Q.SHOW_CONFIRMATION_MODAL_REQUEST, i, t.data.data);
                  break;
                case M.SHOW_LOADING_INDICATOR_REQUEST:
                  this.dispatch(Q.SHOW_LOADING_INDICATOR_REQUEST, i, t);
                  break;
                case M.HIDE_LOADING_INDICATOR_REQUEST:
                  this.dispatch(Q.HIDE_LOADING_INDICATOR_REQUEST, i, t);
                  break;
                case M.SET_CURRENT_LOCALE_REQUEST:
                  this.dispatch(Q.SET_CURRENT_LOCALE_REQUEST, i, t);
                  break;
                case M.LOCAL_STORAGE_SET_REQUEST:
                  this.dispatch(Q.LOCAL_STORAGE_SET_REQUEST, i, t);
                  break;
                case M.RUNTIME_ERROR_HANDLING_REQUEST:
                  this.dispatch(Q.RUNTIME_ERROR_HANDLING_REQUEST, i, t);
                  break;
                case M.SET_ANCHOR_LINK_REQUEST:
                  this.dispatch(Q.SET_ANCHOR_LINK_REQUEST, i, t);
                  break;
                case M.SET_THIRD_PARTY_COOKIES_REQUEST:
                  this.dispatch(Q.SET_THIRD_PARTY_COOKIES_REQUEST, i, t);
                  break;
                case M.BACK_NAVIGATION_REQUEST:
                  this.dispatch(Q.BACK_NAVIGATION_REQUEST, i, t);
                  break;
                case M.GET_CURRENT_ROUTE_REQUEST:
                  this.dispatch(Q.GET_CURRENT_ROUTE_REQUEST, i, t);
                  break;
                case M.NAVIGATION_COMPLETED_REPORT:
                  this.dispatch(Q.NAVIGATION_COMPLETED_REPORT, i, t);
                  break;
                case M.UPDATE_MODAL_PATH_DATA_REQUEST:
                  this.dispatch(Q.UPDATE_MODAL_PATH_DATA_REQUEST, i, t);
                  break;
                case M.CHECK_PATH_EXISTS_REQUEST:
                  this.dispatch(Q.CHECK_PATH_EXISTS_REQUEST, i, t);
                  break;
                case M.SET_DIRTY_STATUS_REQUEST:
                  this.dispatch(Q.SET_DIRTY_STATUS_REQUEST, i, t);
                  break;
                default:
                  console.warn('Functionality not yet implemented: ', e);
              }
            }
          }
        }),
        window.addEventListener('message', globalThis.__luigi_container_manager.messageListener)),
      globalThis.__luigi_container_manager
    );
  }
  registerContainer(t) {
    this.getContainerManager().container.push(t);
  }
}
const G = new W();
class B {
  constructor(t) {
    t ? ((this.rendererObject = t), (this.config = t.config || {})) : (this.config = {});
  }
  createCompoundContainer() {
    return document.createElement('div');
  }
  createCompoundItemContainer(t) {
    return document.createElement('div');
  }
  attachCompoundItem(t, e) {
    t.appendChild(e);
  }
}
class j extends B {
  constructor(t) {
    super(t || { use: {} }),
      t && t.use && t.use.extends && (this.superRenderer = V({ use: t.use.extends, config: t.config }));
  }
  createCompoundContainer() {
    return this.rendererObject.use.createCompoundContainer
      ? this.rendererObject.use.createCompoundContainer(this.config, this.superRenderer)
      : this.superRenderer
      ? this.superRenderer.createCompoundContainer()
      : super.createCompoundContainer();
  }
  createCompoundItemContainer(t) {
    return this.rendererObject.use.createCompoundItemContainer
      ? this.rendererObject.use.createCompoundItemContainer(t, this.config, this.superRenderer)
      : this.superRenderer
      ? this.superRenderer.createCompoundItemContainer(t)
      : super.createCompoundItemContainer(t);
  }
  attachCompoundItem(t, e) {
    this.rendererObject.use.attachCompoundItem
      ? this.rendererObject.use.attachCompoundItem(t, e, this.superRenderer)
      : this.superRenderer
      ? this.superRenderer.attachCompoundItem(t, e)
      : super.attachCompoundItem(t, e);
  }
}
class q extends B {
  createCompoundContainer() {
    const t = '__lui_compound_' + new Date().getTime(),
      e = document.createElement('div');
    e.classList.add(t);
    let n = '';
    return (
      this.config.layouts &&
        this.config.layouts.forEach(e => {
          if (e.minWidth || e.maxWidth) {
            let i = '@media only screen ';
            null != e.minWidth && (i += `and (min-width: ${e.minWidth}px) `),
              null != e.maxWidth && (i += `and (max-width: ${e.maxWidth}px) `),
              (i += `{\n            .${t} {\n              grid-template-columns: ${e.columns ||
                'auto'};\n              grid-template-rows: ${e.rows || 'auto'};\n              grid-gap: ${e.gap ||
                '0'};\n            }\n          }\n          `),
              (n += i);
          }
        }),
      (e.innerHTML = `\n        <style scoped>\n          .${t} {\n            display: grid;\n            grid-template-columns: ${this
        .config.columns || 'auto'};\n            grid-template-rows: ${this.config.rows ||
        'auto'};\n            grid-gap: ${this.config.gap || '0'};\n            min-height: ${this.config.minHeight ||
        'auto'};\n          }\n          ${n}\n        </style>\n    `),
      e
    );
  }
  createCompoundItemContainer(t) {
    const e = t || {},
      n = document.createElement('div');
    return n.setAttribute('style', `grid-row: ${e.row || 'auto'}; grid-column: ${e.column || 'auto'}`), n;
  }
}
const V = t => {
    const e = t.use;
    return e
      ? 'grid' === e
        ? new q(t)
        : e.createCompoundContainer || e.createCompoundItemContainer || e.attachCompoundItem
        ? new j(t)
        : new B(t)
      : new B(t);
  },
  F = (t, e, n, i) => {
    (null == e ? void 0 : e.eventListeners) &&
      e.eventListeners.forEach(e => {
        const s = e.source + '.' + e.name,
          r = t[s],
          o = { wcElementId: n, wcElement: i, action: e.action, converter: e.dataConverter };
        r ? r.push(o) : (t[s] = [o]);
      });
  };
function K(t) {
  return String(t)
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&sol;', '/');
}
class X {
  constructor() {
    this.containerService = new W();
  }
  dynamicImport(t) {
    return Object.freeze(import(/* webpackIgnore: true */ t));
  }
  processViewUrl(t, e) {
    return t;
  }
  attachWC(t, e, n, i, s, r, o) {
    if (n && n.contains(e)) {
      const a = document.createElement(t);
      r && a.setAttribute('nodeId', r),
        this.initWC(a, t, n, s, i, r, o),
        n.replaceChild(a, e),
        n._luigi_node && (n._luigi_mfe_webcomponent = a),
        n.dispatchEvent(new Event('wc_ready'));
    }
  }
  dispatchLuigiEvent(t, e, n) {
    this.containerService.dispatch(t, this.thisComponent, e, n);
  }
  createClientAPI(t, e, n, i, s) {
    return {
      linkManager: () => {
        let t = null,
          e = !1,
          n = !1,
          i = {};
        const s = {
          navigate: (s, r = {}) => {
            const o = Object.assign(
              { fromContext: t, fromClosestContext: e, fromVirtualTreeRoot: n, nodeParams: i },
              r
            );
            this.dispatchLuigiEvent(Q.NAVIGATION_REQUEST, Object.assign({ link: s }, o));
          },
          fromClosestContext: () => ((e = !0), s),
          fromContext: e => ((t = e), s),
          fromVirtualTreeRoot: () => ((n = !0), s),
          withParams: t => ((i = t), s),
          updateTopNavigation: () => {
            this.dispatchLuigiEvent(Q.UPDATE_TOP_NAVIGATION_REQUEST, {});
          },
          pathExists: () =>
            new Promise((t, e) => {
              this.containerService.dispatch(
                Q.PATH_EXISTS_REQUEST,
                this.thisComponent,
                {},
                n => {
                  n ? t(!0) : e(!1);
                },
                'callback'
              );
            }),
          openAsDrawer: (t, e = {}) => {
            s.navigate(t, { drawer: e });
          },
          openAsModal: (t, e = {}) => {
            s.navigate(t, { modal: e });
          },
          openAsSplitView: (t, e = {}) => {
            s.navigate(t, { splitView: e });
          },
          goBack: t => {
            this.dispatchLuigiEvent(Q.GO_BACK_REQUEST, t);
          },
          hasBack: () => !1
        };
        return s;
      },
      uxManager: () => ({
        showAlert: t => {
          this.dispatchLuigiEvent(Q.ALERT_REQUEST, t);
        },
        showConfirmationModal: async t =>
          new Promise((e, n) => {
            this.dispatchLuigiEvent(Q.SHOW_CONFIRMATION_MODAL_REQUEST, t, t => {
              t ? e(t) : n(new Error('No data'));
            });
          }),
        getCurrentTheme: () => this.thisComponent.theme,
        closeUserSettings: () => {
          this.dispatchLuigiEvent(Q.CLOSE_USER_SETTINGS_REQUEST, this.thisComponent.userSettings);
        },
        openUserSettings: () => {
          this.dispatchLuigiEvent(Q.OPEN_USER_SETTINGS_REQUEST, this.thisComponent.userSettings);
        },
        collapseLeftSideNav: () => {
          this.dispatchLuigiEvent(Q.COLLAPSE_LEFT_NAV_REQUEST, {});
        },
        getDirtyStatus: () => this.thisComponent.dirtyStatus || !1,
        getDocumentTitle: () => this.thisComponent.documentTitle,
        setDocumentTitle: t => {
          this.dispatchLuigiEvent(Q.SET_DOCUMENT_TITLE_REQUEST, t);
        },
        removeBackdrop: () => {
          this.dispatchLuigiEvent(Q.REMOVE_BACKDROP_REQUEST, {});
        },
        hideAppLoadingIndicator: () => {
          this.dispatchLuigiEvent(Q.HIDE_LOADING_INDICATOR_REQUEST, {});
        }
      }),
      getCurrentLocale: () => this.thisComponent.locale,
      getActiveFeatureToggles: () => this.thisComponent.activeFeatureToggleList || [],
      publishEvent: s => {
        t && t.eventBus && t.eventBus.onPublishEvent(s, e, n);
        const r = { id: s.type, _metaData: { nodeId: e, wc_id: n, src: i }, data: s.detail };
        this.dispatchLuigiEvent(Q.CUSTOM_MESSAGE, r);
      },
      luigiClientInit: () => {
        this.dispatchLuigiEvent(Q.INITIALIZED, {});
      },
      addNodeParams: (t, e) => {
        s || this.dispatchLuigiEvent(Q.ADD_NODE_PARAMS_REQUEST, { params: t, keepBrowserHistory: e });
      },
      getNodeParams: t => {
        return s
          ? {}
          : t
          ? ((e = this.thisComponent.nodeParams), Object.entries(e).reduce((t, e) => ((t[K(e[0])] = K(e[1])), t), {}))
          : this.thisComponent.nodeParams || {};
        var e;
      },
      setAnchor: t => {
        s || this.dispatchLuigiEvent(Q.SET_ANCHOR_LINK_REQUEST, t);
      },
      getAnchor: () => this.thisComponent.anchor || '',
      getCoreSearchParams: () => this.thisComponent.searchParams || {},
      getPathParams: () => this.thisComponent.pathParams || {},
      getClientPermissions: () => this.thisComponent.clientPermissions || {},
      getUserSettings: () => this.thisComponent.userSettings || {},
      setViewGroupData: t => {
        this.dispatchLuigiEvent(Q.SET_VIEW_GROUP_DATA_REQUEST, t);
      }
    };
  }
  initWC(t, e, n, i, s, r, o) {
    const a = this.createClientAPI(n, r, e, t, o);
    if (t.__postProcess) {
      const e =
        new URL(document.baseURI).origin === new URL(i, document.baseURI).origin
          ? new URL('./', new URL(i, document.baseURI))
          : new URL('./', i);
      t.__postProcess(s, a, e.origin + e.pathname);
    } else (t.context = s), (t.LuigiClient = a);
  }
  generateWCId(t) {
    let e = '';
    const n = new URL(t, encodeURI(location.href)).href;
    for (let t = 0; t < n.length; t++) e += n.charCodeAt(t).toString(16);
    return 'luigi-wc-' + e;
  }
  registerWCFromUrl(t, e) {
    const n = this.processViewUrl(t);
    return new Promise((t, i) => {
      if (this.checkWCUrl(n))
        this.dynamicImport(n)
          .then(n => {
            try {
              if (!window.customElements.get(e)) {
                let t = n.default;
                if (!HTMLElement.isPrototypeOf(t)) {
                  const e = Object.keys(n);
                  for (let i = 0; i < e.length && ((t = n[e[i]]), !HTMLElement.isPrototypeOf(t)); i++);
                }
                window.customElements.define(e, t);
              }
              t(1);
            } catch (t) {
              i(t);
            }
          })
          .catch(t => {
            i(t);
          });
      else {
        i(`Error: View URL '${n}' not allowed to be included`);
      }
    });
  }
  includeSelfRegisteredWCFromUrl(t, e, n) {
    if (this.checkWCUrl(e)) {
      this.containerService.getContainerManager()._registerWebcomponent ||
        (this.containerService.getContainerManager()._registerWebcomponent = (t, e) => {
          window.customElements.define(this.generateWCId(t), e);
        }),
        window.Luigi ||
          ((window.Luigi = {}),
          window.Luigi._registerWebcomponent ||
            (window.Luigi._registerWebcomponent = (t, e) => {
              this.containerService.getContainerManager()._registerWebcomponent(t, e);
            }));
      const i = document.createElement('script');
      i.setAttribute('src', e),
        'module' === t.webcomponent.type && i.setAttribute('type', 'module'),
        i.setAttribute('defer', 'true'),
        i.addEventListener('load', () => {
          n();
        }),
        document.body.appendChild(i);
    } else console.warn(`View URL '${e}' not allowed to be included`);
  }
  checkWCUrl(t) {
    return !0;
  }
  renderWebComponent(t, e, n, i, s, r) {
    var o;
    const a = this.processViewUrl(t, { context: n }),
      c =
        (null === (o = null == i ? void 0 : i.webcomponent) || void 0 === o ? void 0 : o.tagName) ||
        this.generateWCId(a),
      u = document.createElement('div');
    e.appendChild(u),
      (e._luigi_node = i),
      window.customElements.get(c)
        ? this.attachWC(c, u, e, n, a, s, r)
        : window.luigiWCFn
        ? window.luigiWCFn(a, c, u, () => {
            this.attachWC(c, u, e, n, a, s, r);
          })
        : i.webcomponent && i.webcomponent.selfRegistered
        ? this.includeSelfRegisteredWCFromUrl(i, a, () => {
            this.attachWC(c, u, e, n, a, s, r);
          })
        : this.registerWCFromUrl(a, c)
            .then(() => {
              this.attachWC(c, u, e, n, a, s, r);
            })
            .catch(t => {
              console.warn('ERROR =>', t),
                this.containerService.dispatch(Q.RUNTIME_ERROR_HANDLING_REQUEST, this.thisComponent, t);
            });
  }
  createCompoundContainerAsync(t, e, n) {
    return new Promise((i, s) => {
      var r;
      if (t.viewUrl)
        try {
          const s =
            (null === (r = null == n ? void 0 : n.webcomponent) || void 0 === r ? void 0 : r.tagName) ||
            this.generateWCId(t.viewUrl);
          n.webcomponent && n.webcomponent.selfRegistered
            ? this.includeSelfRegisteredWCFromUrl(n, t.viewUrl, () => {
                const n = document.createElement(s);
                this.initWC(n, s, n, t.viewUrl, e, '_root'), i(n);
              })
            : this.registerWCFromUrl(t.viewUrl, s)
                .then(() => {
                  const n = document.createElement(s);
                  this.initWC(n, s, n, t.viewUrl, e, '_root'), i(n);
                })
                .catch(t => {
                  console.warn('Error: ', t),
                    this.containerService.dispatch(Q.RUNTIME_ERROR_HANDLING_REQUEST, this.thisComponent, t);
                });
        } catch (t) {
          s(t);
        }
      else i(t.createCompoundContainer());
    });
  }
  renderWebComponentCompound(t, e, n) {
    var i;
    let s;
    return (
      t.webcomponent && t.viewUrl
        ? ((s = new B()),
          (s.viewUrl = this.processViewUrl(t.viewUrl, { context: n })),
          (s.createCompoundItemContainer = t => {
            const e = document.createElement('div');
            return t && t.slot && e.setAttribute('slot', t.slot), e;
          }))
        : (null === (i = t.compound) || void 0 === i ? void 0 : i.renderer) && (s = V(t.compound.renderer)),
      (s = s || new B()),
      new Promise(i => {
        this.createCompoundContainerAsync(s, n, t)
          .then(r => {
            var o;
            (e._luigi_mfe_webcomponent = r), (e._luigi_node = t);
            const a = {};
            (r.eventBus = {
              listeners: a,
              onPublishEvent: (t, e, n) => {
                const i = a[e + '.' + t.type] || [];
                i.push(...(a['*.' + t.type] || [])),
                  i.forEach(e => {
                    const n = e.wcElement || r.querySelector('[nodeId=' + e.wcElementId + ']');
                    n
                      ? n.dispatchEvent(
                          new CustomEvent(e.action, { detail: e.converter ? e.converter(t.detail) : t.detail })
                        )
                      : console.debug('Could not find event target', e);
                  });
              }
            }),
              null === (o = t.compound) ||
                void 0 === o ||
                o.children.forEach((t, e) => {
                  const i = Object.assign(Object.assign({}, n), t.context),
                    o = s.createCompoundItemContainer(t.layoutConfig);
                  (o.eventBus = r.eventBus), s.attachCompoundItem(r, o);
                  const c = t.id || 'gen_' + e;
                  this.renderWebComponent(t.viewUrl, o, i, t, c, !0), F(a, t, c);
                }),
              e.appendChild(r),
              F(a, t.compound, '_root', r),
              i(r);
          })
          .catch(t => {
            console.warn('Error: ', t),
              this.containerService.dispatch(Q.RUNTIME_ERROR_HANDLING_REQUEST, this.thisComponent, t);
          });
      })
    );
  }
}
const z = new (class {
    constructor() {
      (this.updateContext = (t, e, n) => {
        if (n) {
          const i = e || {};
          G.sendCustomMessageToIframe(n, { context: t, internal: i, withoutSync: !0 }, M.SEND_CONTEXT_OBJECT);
        } else console.warn('Attempting to update context on inexisting iframe');
      }),
        (this.sendCustomMessage = (t, e, n, i, s) => {
          if (n && e._luigi_mfe_webcomponent) G.dispatch(t, e._luigi_mfe_webcomponent, s);
          else {
            const e = Object.assign({}, s);
            e.id && console.warn('Property "id" is reserved and can not be used in custom message data'),
              (e.id = t),
              G.sendCustomMessageToIframe(i, e);
          }
        });
    }
    closeAlert(t, e, n) {
      G.sendCustomMessageToIframe(n, { id: t, dismissKey: e }, M.ALERT_CLOSED);
    }
  })(),
  Z = t => {
    if (!t) return;
    const e = t;
    return (
      e.forEach((n, i) => {
        (e[i] = n + (-1 != n.indexOf(';') ? '' : ';')), (e[i] = t[i].replaceAll('"', "'"));
      }),
      e.join(' ')
    );
  };
function J(t) {
  l(
    t,
    'svelte-nm2qba',
    'main.svelte-nm2qba,iframe.svelte-nm2qba{width:100%;height:100%;border:none}main.lui-isolated.svelte-nm2qba{line-height:0}'
  );
}
function Y(t) {
  let e,
    n = (!t[2] || 'false' === t[2]) && tt(t);
  return {
    c() {
      n && n.c(), (e = p());
    },
    m(t, i) {
      n && n.m(t, i), d(t, e, i);
    },
    p(t, i) {
      t[2] && 'false' !== t[2] ? n && (n.d(1), (n = null)) : n ? n.p(t, i) : ((n = tt(t)), n.c(), n.m(e.parentNode, e));
    },
    d(t) {
      t && h(e), n && n.d(t);
    }
  };
}
function tt(t) {
  let e, n, i, s;
  return {
    c() {
      (e = m('iframe')),
        c(e.src, (n = t[0])) || E(e, 'src', n),
        E(e, 'title', t[1]),
        E(e, 'allow', (i = Z(t[3]))),
        E(e, 'sandbox', (s = t[4] ? t[4].join(' ') : void 0)),
        E(e, 'class', 'svelte-nm2qba');
    },
    m(n, i) {
      d(n, e, i), t[24](e);
    },
    p(t, r) {
      1 & r && !c(e.src, (n = t[0])) && E(e, 'src', n),
        2 & r && E(e, 'title', t[1]),
        8 & r && i !== (i = Z(t[3])) && E(e, 'allow', i),
        16 & r && s !== (s = t[4] ? t[4].join(' ') : void 0) && E(e, 'sandbox', s);
    },
    d(n) {
      n && h(e), t[24](null);
    }
  };
}
function et(e) {
  let n,
    i,
    s = e[7] && Y(e);
  return {
    c() {
      (n = m('main')), s && s.c(), E(n, 'class', (i = u(e[2] ? void 0 : 'lui-isolated') + ' svelte-nm2qba'));
    },
    m(t, i) {
      d(t, n, i), s && s.m(n, null), e[25](n);
    },
    p(t, [e]) {
      t[7] ? (s ? s.p(t, e) : ((s = Y(t)), s.c(), s.m(n, null))) : s && (s.d(1), (s = null)),
        4 & e && i !== (i = u(t[2] ? void 0 : 'lui-isolated') + ' svelte-nm2qba') && E(n, 'class', i);
    },
    i: t,
    o: t,
    d(t) {
      t && h(n), s && s.d(), e[25](null);
    }
  };
}
function nt(t, e, n) {
  let { viewurl: i } = e,
    { context: s } = e,
    { label: r } = e,
    { webcomponent: o } = e,
    { deferInit: a } = e,
    { locale: c } = e,
    { theme: u } = e,
    { activeFeatureToggleList: l } = e,
    { skipInitCheck: d } = e,
    { nodeParams: h } = e,
    { searchParams: m } = e,
    { pathParams: p } = e,
    { clientPermissions: E } = e,
    { dirtyStatus: _ } = e,
    { hasBack: T } = e,
    { documentTitle: S } = e,
    { allowRules: C } = e,
    { sandboxRules: R } = e,
    { userSettings: b } = e,
    { anchor: A } = e;
  const I = {};
  let w,
    v = !1;
  const O = new X(),
    U = t => {
      if (!v) {
        (t.sendCustomMessage = (t, e) => {
          z.sendCustomMessage(t, w, !!o, I, e);
        }),
          (t.updateContext = (t, e) => {
            o ? n(6, (w._luigi_mfe_webcomponent.context = t), w) : z.updateContext(t, e, I);
          }),
          (t.closeAlert = (t, e) => {
            z.closeAlert(t, e, I);
          }),
          G.registerContainer(t),
          (O.thisComponent = t);
        const e = H.resolveContext(s);
        if (o && 'false' != o) {
          n(6, (w.innerHTML = ''), w);
          const t = H.checkWebcomponentValue(o);
          O.renderWebComponent(i, w, e, 'object' == typeof t ? { webcomponent: t } : {});
        }
        d
          ? ((t.initialized = !0),
            setTimeout(() => {
              O.dispatchLuigiEvent(Q.INITIALIZED, {});
            }))
          : o &&
            w.addEventListener('wc_ready', () => {
              var e;
              (null === (e = w._luigi_mfe_webcomponent) || void 0 === e ? void 0 : e.deferLuigiClientWCInit) ||
                ((t.initialized = !0), O.dispatchLuigiEvent(Q.INITIALIZED, {}));
            }),
          n(7, (v = !0)),
          (t.containerInitialized = !0);
      }
    };
  var N;
  return (
    $(async () => {
      const t = w.getRootNode().host;
      (t.iframeHandle = I),
        (t.init = () => {
          U(t);
        }),
        a || U(t);
    }),
    (N = async () => {}),
    g().$$.on_destroy.push(N),
    (t.$$set = t => {
      'viewurl' in t && n(0, (i = t.viewurl)),
        'context' in t && n(8, (s = t.context)),
        'label' in t && n(1, (r = t.label)),
        'webcomponent' in t && n(2, (o = t.webcomponent)),
        'deferInit' in t && n(9, (a = t.deferInit)),
        'locale' in t && n(10, (c = t.locale)),
        'theme' in t && n(11, (u = t.theme)),
        'activeFeatureToggleList' in t && n(12, (l = t.activeFeatureToggleList)),
        'skipInitCheck' in t && n(13, (d = t.skipInitCheck)),
        'nodeParams' in t && n(14, (h = t.nodeParams)),
        'searchParams' in t && n(15, (m = t.searchParams)),
        'pathParams' in t && n(16, (p = t.pathParams)),
        'clientPermissions' in t && n(17, (E = t.clientPermissions)),
        'dirtyStatus' in t && n(18, (_ = t.dirtyStatus)),
        'hasBack' in t && n(19, (T = t.hasBack)),
        'documentTitle' in t && n(20, (S = t.documentTitle)),
        'allowRules' in t && n(3, (C = t.allowRules)),
        'sandboxRules' in t && n(4, (R = t.sandboxRules)),
        'userSettings' in t && n(21, (b = t.userSettings)),
        'anchor' in t && n(22, (A = t.anchor));
    }),
    [
      i,
      r,
      o,
      C,
      R,
      I,
      w,
      v,
      s,
      a,
      c,
      u,
      l,
      d,
      h,
      m,
      p,
      E,
      _,
      T,
      S,
      b,
      A,
      () => c && u && l && h && m && p && E && b && A && _ && T && S && C && R,
      function(t) {
        f[t ? 'unshift' : 'push'](() => {
          (I.iframe = t), n(5, I);
        });
      },
      function(t) {
        f[t ? 'unshift' : 'push'](() => {
          (w = t), n(6, w);
        });
      }
    ]
  );
}
class it extends k {
  constructor(t) {
    super(),
      L(
        this,
        t,
        nt,
        et,
        r,
        {
          viewurl: 0,
          context: 8,
          label: 1,
          webcomponent: 2,
          deferInit: 9,
          locale: 10,
          theme: 11,
          activeFeatureToggleList: 12,
          skipInitCheck: 13,
          nodeParams: 14,
          searchParams: 15,
          pathParams: 16,
          clientPermissions: 17,
          dirtyStatus: 18,
          hasBack: 19,
          documentTitle: 20,
          allowRules: 3,
          sandboxRules: 4,
          userSettings: 21,
          anchor: 22,
          unwarn: 23
        },
        J
      );
  }
  get viewurl() {
    return this.$$.ctx[0];
  }
  set viewurl(t) {
    this.$$set({ viewurl: t }), v();
  }
  get context() {
    return this.$$.ctx[8];
  }
  set context(t) {
    this.$$set({ context: t }), v();
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(t) {
    this.$$set({ label: t }), v();
  }
  get webcomponent() {
    return this.$$.ctx[2];
  }
  set webcomponent(t) {
    this.$$set({ webcomponent: t }), v();
  }
  get deferInit() {
    return this.$$.ctx[9];
  }
  set deferInit(t) {
    this.$$set({ deferInit: t }), v();
  }
  get locale() {
    return this.$$.ctx[10];
  }
  set locale(t) {
    this.$$set({ locale: t }), v();
  }
  get theme() {
    return this.$$.ctx[11];
  }
  set theme(t) {
    this.$$set({ theme: t }), v();
  }
  get activeFeatureToggleList() {
    return this.$$.ctx[12];
  }
  set activeFeatureToggleList(t) {
    this.$$set({ activeFeatureToggleList: t }), v();
  }
  get skipInitCheck() {
    return this.$$.ctx[13];
  }
  set skipInitCheck(t) {
    this.$$set({ skipInitCheck: t }), v();
  }
  get nodeParams() {
    return this.$$.ctx[14];
  }
  set nodeParams(t) {
    this.$$set({ nodeParams: t }), v();
  }
  get searchParams() {
    return this.$$.ctx[15];
  }
  set searchParams(t) {
    this.$$set({ searchParams: t }), v();
  }
  get pathParams() {
    return this.$$.ctx[16];
  }
  set pathParams(t) {
    this.$$set({ pathParams: t }), v();
  }
  get clientPermissions() {
    return this.$$.ctx[17];
  }
  set clientPermissions(t) {
    this.$$set({ clientPermissions: t }), v();
  }
  get dirtyStatus() {
    return this.$$.ctx[18];
  }
  set dirtyStatus(t) {
    this.$$set({ dirtyStatus: t }), v();
  }
  get hasBack() {
    return this.$$.ctx[19];
  }
  set hasBack(t) {
    this.$$set({ hasBack: t }), v();
  }
  get documentTitle() {
    return this.$$.ctx[20];
  }
  set documentTitle(t) {
    this.$$set({ documentTitle: t }), v();
  }
  get allowRules() {
    return this.$$.ctx[3];
  }
  set allowRules(t) {
    this.$$set({ allowRules: t }), v();
  }
  get sandboxRules() {
    return this.$$.ctx[4];
  }
  set sandboxRules(t) {
    this.$$set({ sandboxRules: t }), v();
  }
  get userSettings() {
    return this.$$.ctx[21];
  }
  set userSettings(t) {
    this.$$set({ userSettings: t }), v();
  }
  get anchor() {
    return this.$$.ctx[22];
  }
  set anchor(t) {
    this.$$set({ anchor: t }), v();
  }
  get unwarn() {
    return this.$$.ctx[23];
  }
}
function st(t) {
  l(t, 'svelte-1buc46y', 'main.svelte-1buc46y{width:100%;height:100%;border:none}');
}
function rt(e) {
  let n;
  return {
    c() {
      (n = m('main')), E(n, 'class', 'svelte-1buc46y');
    },
    m(t, i) {
      d(t, n, i), e[16](n);
    },
    p: t,
    i: t,
    o: t,
    d(t) {
      t && h(n), e[16](null);
    }
  };
}
function ot(t, e, n) {
  let i,
    s,
    { viewurl: r } = e,
    { webcomponent: o } = e,
    { context: a } = e,
    { deferInit: c } = e,
    { compoundConfig: u } = e,
    { nodeParams: l } = e,
    { searchParams: d } = e,
    { pathParams: h } = e,
    { clientPermissions: m } = e,
    { userSettings: p } = e,
    { anchor: E } = e,
    { dirtyStatus: _ } = e,
    { hasBack: g } = e,
    { documentTitle: T } = e,
    S = !1;
  const C = new W(),
    R = new X(),
    b = t => {
      if (!u || S) return;
      t.updateContext = (t, e) => {
        n(0, (i._luigi_mfe_webcomponent.context = t), i);
      };
      const e = H.resolveContext(a);
      n(1, (c = !1));
      const l = { compound: u, viewUrl: r, webcomponent: H.checkWebcomponentValue(o) || !0 };
      R.renderWebComponentCompound(l, i, e).then(e => {
        (s = e),
          t.hasAttribute('skip-init-check') || !l.viewUrl
            ? ((t.initialized = !0),
              setTimeout(() => {
                R.dispatchLuigiEvent(Q.INITIALIZED, {});
              }))
            : s.LuigiClient &&
              !s.deferLuigiClientWCInit &&
              ((t.initialized = !0), R.dispatchLuigiEvent(Q.INITIALIZED, {}));
      }),
        (S = !0),
        (t.containerInitialized = !0);
    };
  return (
    $(async () => {
      const t = i.getRootNode().host;
      (t.init = () => {
        b(t);
      }),
        c || b(t),
        C.registerContainer(t),
        (R.thisComponent = t);
    }),
    (t.$$set = t => {
      'viewurl' in t && n(2, (r = t.viewurl)),
        'webcomponent' in t && n(3, (o = t.webcomponent)),
        'context' in t && n(4, (a = t.context)),
        'deferInit' in t && n(1, (c = t.deferInit)),
        'compoundConfig' in t && n(5, (u = t.compoundConfig)),
        'nodeParams' in t && n(6, (l = t.nodeParams)),
        'searchParams' in t && n(7, (d = t.searchParams)),
        'pathParams' in t && n(8, (h = t.pathParams)),
        'clientPermissions' in t && n(9, (m = t.clientPermissions)),
        'userSettings' in t && n(10, (p = t.userSettings)),
        'anchor' in t && n(11, (E = t.anchor)),
        'dirtyStatus' in t && n(12, (_ = t.dirtyStatus)),
        'hasBack' in t && n(13, (g = t.hasBack)),
        'documentTitle' in t && n(14, (T = t.documentTitle));
    }),
    [
      i,
      c,
      r,
      o,
      a,
      u,
      l,
      d,
      h,
      m,
      p,
      E,
      _,
      g,
      T,
      () => l && d && h && m && p && E && _ && g && T,
      function(t) {
        f[t ? 'unshift' : 'push'](() => {
          (i = t), n(0, i);
        });
      }
    ]
  );
}
D(
  it,
  {
    viewurl: { type: 'String', reflect: !1, attribute: 'viewurl' },
    context: { type: 'String', reflect: !1, attribute: 'context' },
    label: { type: 'String', reflect: !1, attribute: 'label' },
    webcomponent: { type: 'String', reflect: !1, attribute: 'webcomponent' },
    deferInit: { type: 'Boolean', attribute: 'defer-init' },
    locale: { type: 'String', reflect: !1, attribute: 'locale' },
    theme: { type: 'String', reflect: !1, attribute: 'theme' },
    activeFeatureToggleList: { type: 'Array', reflect: !1, attribute: 'active-feature-toggle-list' },
    skipInitCheck: { type: 'Boolean', reflect: !1, attribute: 'skip-init-check' },
    nodeParams: { type: 'Object', reflect: !1, attribute: 'node-params' },
    searchParams: { type: 'Object', reflect: !1, attribute: 'search-params' },
    pathParams: { type: 'Object', reflect: !1, attribute: 'path-params' },
    clientPermissions: { type: 'Object', reflect: !1, attribute: 'client-permissions' },
    dirtyStatus: { type: 'Boolean', reflect: !1, attribute: 'dirty-status' },
    hasBack: { type: 'Boolean', reflect: !1, attribute: 'has-back' },
    documentTitle: { type: 'String', reflect: !1, attribute: 'document-title' },
    allowRules: { type: 'Array', reflect: !1, attribute: 'allow-rules' },
    sandboxRules: { type: 'Array', reflect: !1, attribute: 'sandbox-rules' },
    userSettings: { type: 'Object', reflect: !1, attribute: 'user-settings' },
    anchor: { type: 'String', reflect: !1, attribute: 'anchor' }
  },
  [],
  ['unwarn'],
  !0,
  t => {
    let e = t => () =>
      console.warn(t + " can't be called on luigi-container before its micro frontend is attached to the DOM.");
    return class extends t {
      sendCustomMessage = e('sendCustomMessage');
      updateContext = e('updateContext');
      closeAlert = e('closeAlert');
      attributeChangedCallback(t, e, n) {
        this.containerInitialized && 'context' === t && this.updateContext(JSON.parse(n));
      }
    };
  }
);
class at extends k {
  constructor(t) {
    super(),
      L(
        this,
        t,
        ot,
        rt,
        r,
        {
          viewurl: 2,
          webcomponent: 3,
          context: 4,
          deferInit: 1,
          compoundConfig: 5,
          nodeParams: 6,
          searchParams: 7,
          pathParams: 8,
          clientPermissions: 9,
          userSettings: 10,
          anchor: 11,
          dirtyStatus: 12,
          hasBack: 13,
          documentTitle: 14,
          unwarn: 15
        },
        st
      );
  }
  get viewurl() {
    return this.$$.ctx[2];
  }
  set viewurl(t) {
    this.$$set({ viewurl: t }), v();
  }
  get webcomponent() {
    return this.$$.ctx[3];
  }
  set webcomponent(t) {
    this.$$set({ webcomponent: t }), v();
  }
  get context() {
    return this.$$.ctx[4];
  }
  set context(t) {
    this.$$set({ context: t }), v();
  }
  get deferInit() {
    return this.$$.ctx[1];
  }
  set deferInit(t) {
    this.$$set({ deferInit: t }), v();
  }
  get compoundConfig() {
    return this.$$.ctx[5];
  }
  set compoundConfig(t) {
    this.$$set({ compoundConfig: t }), v();
  }
  get nodeParams() {
    return this.$$.ctx[6];
  }
  set nodeParams(t) {
    this.$$set({ nodeParams: t }), v();
  }
  get searchParams() {
    return this.$$.ctx[7];
  }
  set searchParams(t) {
    this.$$set({ searchParams: t }), v();
  }
  get pathParams() {
    return this.$$.ctx[8];
  }
  set pathParams(t) {
    this.$$set({ pathParams: t }), v();
  }
  get clientPermissions() {
    return this.$$.ctx[9];
  }
  set clientPermissions(t) {
    this.$$set({ clientPermissions: t }), v();
  }
  get userSettings() {
    return this.$$.ctx[10];
  }
  set userSettings(t) {
    this.$$set({ userSettings: t }), v();
  }
  get anchor() {
    return this.$$.ctx[11];
  }
  set anchor(t) {
    this.$$set({ anchor: t }), v();
  }
  get dirtyStatus() {
    return this.$$.ctx[12];
  }
  set dirtyStatus(t) {
    this.$$set({ dirtyStatus: t }), v();
  }
  get hasBack() {
    return this.$$.ctx[13];
  }
  set hasBack(t) {
    this.$$set({ hasBack: t }), v();
  }
  get documentTitle() {
    return this.$$.ctx[14];
  }
  set documentTitle(t) {
    this.$$set({ documentTitle: t }), v();
  }
  get unwarn() {
    return this.$$.ctx[15];
  }
}
D(
  at,
  {
    viewurl: { type: 'String', reflect: !1, attribute: 'viewurl' },
    webcomponent: {},
    context: { type: 'String', reflect: !1, attribute: 'context' },
    deferInit: { type: 'Boolean', attribute: 'defer-init' },
    compoundConfig: { type: 'Object', reflect: !1, attribute: 'compound-config' },
    nodeParams: { type: 'Object', reflect: !1, attribute: 'node-params' },
    searchParams: { type: 'Object', reflect: !1, attribute: 'search-params' },
    pathParams: { type: 'Object', reflect: !1, attribute: 'path-params' },
    clientPermissions: { type: 'Object', reflect: !1, attribute: 'client-permissions' },
    userSettings: { type: 'Object', reflect: !1, attribute: 'user-settings' },
    anchor: { type: 'String', reflect: !1, attribute: 'anchor' },
    dirtyStatus: { type: 'Boolean', reflect: !1, attribute: 'dirty-status' },
    hasBack: { type: 'Boolean', reflect: !1, attribute: 'has-back' },
    documentTitle: { type: 'String', reflect: !1, attribute: 'document-title' }
  },
  [],
  ['unwarn'],
  !0,
  t =>
    class extends t {
      updateContext = (t => () =>
        console.warn(t + " can't be called on luigi-container before its micro frontend is attached to the DOM."))(
        'updateContext'
      );
      attributeChangedCallback(t, e, n) {
        this.containerInitialized && 'context' === t && this.updateContext(JSON.parse(n));
      }
    }
);
var ct = Q;
customElements.get('luigi-container') || customElements.define('luigi-container', it.element),
  customElements.get('luigi-compound-container') || customElements.define('luigi-compound-container', at.element);
export { at as LuigiCompoundContainer, it as LuigiContainer, ct as default };
//# sourceMappingURL=bundle.js.map
