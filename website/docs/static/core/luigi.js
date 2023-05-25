function Ue() {}
const Lo = i => i;
function hw(i, e) {
  for (const t in e) i[t] = e[t];
  return i;
}
function gw(i) {
  return !!i && (typeof i == 'object' || typeof i == 'function') && typeof i.then == 'function';
}
function Zg(i) {
  return i();
}
function zf() {
  return Object.create(null);
}
function Ze(i) {
  i.forEach(Zg);
}
function Fi(i) {
  return typeof i == 'function';
}
function It(i, e) {
  return i != i ? e == e : i !== e || (i && typeof i == 'object') || typeof i == 'function';
}
let Xs;
function rt(i, e) {
  return Xs || (Xs = document.createElement('a')), (Xs.href = e), i === Xs.href;
}
function _w(i) {
  return Object.keys(i).length === 0;
}
function Ao(i, ...e) {
  if (i == null) return Ue;
  const t = i.subscribe(...e);
  return t.unsubscribe ? () => t.unsubscribe() : t;
}
function rl(i) {
  let e;
  return Ao(i, t => (e = t))(), e;
}
function mi(i, e, t) {
  i.$$.on_destroy.push(Ao(e, t));
}
function Xg(i, e, t, n) {
  if (i) {
    const l = $g(i, e, t, n);
    return i[0](l);
  }
}
function $g(i, e, t, n) {
  return i[1] && n ? hw(t.ctx.slice(), i[1](n(e))) : t.ctx;
}
function xg(i, e, t, n) {
  if (i[2] && n) {
    const l = i[2](n(t));
    if (e.dirty === void 0) return l;
    if (typeof l == 'object') {
      const r = [],
        s = Math.max(e.dirty.length, l.length);
      for (let o = 0; o < s; o += 1) r[o] = e.dirty[o] | l[o];
      return r;
    }
    return e.dirty | l;
  }
  return e.dirty;
}
function e_(i, e, t, n, l, r) {
  if (l) {
    const s = $g(e, t, n, r);
    i.p(s, l);
  }
}
function t_(i) {
  if (i.ctx.length > 32) {
    const e = [],
      t = i.ctx.length / 32;
    for (let n = 0; n < t; n++) e[n] = -1;
    return e;
  }
  return -1;
}
function yn(i) {
  return i == null ? '' : i;
}
function pw(i) {
  return i && Fi(i.destroy) ? i.destroy : Ue;
}
const n_ = typeof window < 'u';
let i_ = n_ ? () => window.performance.now() : () => Date.now(),
  Ro = n_ ? i => requestAnimationFrame(i) : Ue;
const ar = new Set();
function l_(i) {
  ar.forEach(e => {
    e.c(i) || (ar.delete(e), e.f());
  }),
    ar.size !== 0 && Ro(l_);
}
function r_(i) {
  let e;
  return (
    ar.size === 0 && Ro(l_),
    {
      promise: new Promise(t => {
        ar.add((e = { c: i, f: t }));
      }),
      abort() {
        ar.delete(e);
      }
    }
  );
}
function w(i, e) {
  i.appendChild(e);
}
function s_(i) {
  if (!i) return document;
  const e = i.getRootNode ? i.getRootNode() : i.ownerDocument;
  return e && e.host ? e : i.ownerDocument;
}
function mw(i) {
  const e = S('style');
  return bw(s_(i), e), e.sheet;
}
function bw(i, e) {
  return w(i.head || i, e), e.sheet;
}
function R(i, e, t) {
  i.insertBefore(e, t || null);
}
function A(i) {
  i.parentNode && i.parentNode.removeChild(i);
}
function ct(i, e) {
  for (let t = 0; t < i.length; t += 1) i[t] && i[t].d(e);
}
function S(i) {
  return document.createElement(i);
}
function vw(i) {
  return document.createElementNS('http://www.w3.org/2000/svg', i);
}
function Pe(i) {
  return document.createTextNode(i);
}
function q() {
  return Pe(' ');
}
function ye() {
  return Pe('');
}
function ne(i, e, t, n) {
  return i.addEventListener(e, t, n), () => i.removeEventListener(e, t, n);
}
function Tt(i) {
  return function(e) {
    return e.preventDefault(), i.call(this, e);
  };
}
function Ot(i) {
  return function(e) {
    return e.stopPropagation(), i.call(this, e);
  };
}
function f(i, e, t) {
  t == null ? i.removeAttribute(e) : i.getAttribute(e) !== t && i.setAttribute(e, t);
}
function ww(i) {
  return Array.from(i.childNodes);
}
function Ne(i, e) {
  (e = '' + e), i.wholeText !== e && (i.data = e);
}
function qf(i, e) {
  i.value = e == null ? '' : e;
}
function li(i, e, t, n) {
  t === null ? i.style.removeProperty(e) : i.style.setProperty(e, t, n ? 'important' : '');
}
function hi(i, e, t) {
  i.classList[t ? 'add' : 'remove'](e);
}
function a_(i, e, { bubbles: t = !1, cancelable: n = !1 } = {}) {
  const l = document.createEvent('CustomEvent');
  return l.initCustomEvent(i, t, n, e), l;
}
class dr {
  constructor(e = !1) {
    (this.is_svg = !1), (this.is_svg = e), (this.e = this.n = null);
  }
  c(e) {
    this.h(e);
  }
  m(e, t, n = null) {
    this.e || (this.is_svg ? (this.e = vw(t.nodeName)) : (this.e = S(t.nodeName)), (this.t = t), this.c(e)), this.i(n);
  }
  h(e) {
    (this.e.innerHTML = e), (this.n = Array.from(this.e.childNodes));
  }
  i(e) {
    for (let t = 0; t < this.n.length; t += 1) R(this.t, this.n[t], e);
  }
  p(e) {
    this.d(), this.h(e), this.i(this.a);
  }
  d() {
    this.n.forEach(A);
  }
}
const ta = new Map();
let na = 0;
function kw(i) {
  let e = 5381,
    t = i.length;
  for (; t--; ) e = ((e << 5) - e) ^ i.charCodeAt(t);
  return e >>> 0;
}
function Sw(i, e) {
  const t = { stylesheet: mw(e), rules: {} };
  return ta.set(i, t), t;
}
function o_(i, e, t, n, l, r, s, o = 0) {
  const c = 16.666 / n;
  let g = `{
`;
  for (let y = 0; y <= 1; y += c) {
    const C = e + (t - e) * r(y);
    g +=
      y * 100 +
      `%{${s(C, 1 - C)}}
`;
  }
  const h =
      g +
      `100% {${s(t, 1 - t)}}
}`,
    _ = `__svelte_${kw(h)}_${o}`,
    p = s_(i),
    { stylesheet: m, rules: v } = ta.get(p) || Sw(p, i);
  v[_] || ((v[_] = !0), m.insertRule(`@keyframes ${_} ${h}`, m.cssRules.length));
  const k = i.style.animation || '';
  return (i.style.animation = `${k ? `${k}, ` : ''}${_} ${n}ms linear ${l}ms 1 both`), (na += 1), _;
}
function Po(i, e) {
  const t = (i.style.animation || '').split(', '),
    n = t.filter(e ? r => r.indexOf(e) < 0 : r => r.indexOf('__svelte') === -1),
    l = t.length - n.length;
  l && ((i.style.animation = n.join(', ')), (na -= l), na || Cw());
}
function Cw() {
  Ro(() => {
    na ||
      (ta.forEach(i => {
        const { ownerNode: e } = i.stylesheet;
        e && A(e);
      }),
      ta.clear());
  });
}
let Qr;
function Mi(i) {
  Qr = i;
}
function fl() {
  if (!Qr) throw new Error('Function called outside component initialization');
  return Qr;
}
function On(i) {
  fl().$$.before_update.push(i);
}
function Kt(i) {
  fl().$$.on_mount.push(i);
}
function Eo(i) {
  fl().$$.after_update.push(i);
}
function ha(i) {
  fl().$$.on_destroy.push(i);
}
function Wt() {
  const i = fl();
  return (e, t, { cancelable: n = !1 } = {}) => {
    const l = i.$$.callbacks[e];
    if (l) {
      const r = a_(e, t, { cancelable: n });
      return (
        l.slice().forEach(s => {
          s.call(i, r);
        }),
        !r.defaultPrevented
      );
    }
    return !0;
  };
}
function Jr(i, e) {
  return fl().$$.context.set(i, e), e;
}
function vt(i) {
  return fl().$$.context.get(i);
}
function Ll(i, e) {
  const t = i.$$.callbacks[e.type];
  t && t.slice().forEach(n => n.call(this, e));
}
const lr = [],
  xe = [],
  xs = [],
  No = [],
  yw = Promise.resolve();
let Io = !1;
function Pw() {
  Io || ((Io = !0), yw.then(Do));
}
function Rl(i) {
  xs.push(i);
}
function mt(i) {
  No.push(i);
}
const Co = new Set();
let tr = 0;
function Do() {
  if (tr !== 0) return;
  const i = Qr;
  do {
    try {
      for (; tr < lr.length; ) {
        const e = lr[tr];
        tr++, Mi(e), Nw(e.$$);
      }
    } catch (e) {
      throw ((lr.length = 0), (tr = 0), e);
    }
    for (Mi(null), lr.length = 0, tr = 0; xe.length; ) xe.pop()();
    for (let e = 0; e < xs.length; e += 1) {
      const t = xs[e];
      Co.has(t) || (Co.add(t), t());
    }
    xs.length = 0;
  } while (lr.length);
  for (; No.length; ) No.pop()();
  (Io = !1), Co.clear(), Mi(i);
}
function Nw(i) {
  if (i.fragment !== null) {
    i.update(), Ze(i.before_update);
    const e = i.dirty;
    (i.dirty = [-1]), i.fragment && i.fragment.p(i.ctx, e), i.after_update.forEach(Rl);
  }
}
let jr;
function u_() {
  return (
    jr ||
      ((jr = Promise.resolve()),
      jr.then(() => {
        jr = null;
      })),
    jr
  );
}
function ia(i, e, t) {
  i.dispatchEvent(a_(`${e ? 'intro' : 'outro'}${t}`));
}
const ea = new Set();
let ol;
function Ee() {
  ol = { r: 0, c: [], p: ol };
}
function De() {
  ol.r || Ze(ol.c), (ol = ol.p);
}
function B(i, e) {
  i && i.i && (ea.delete(i), i.i(e));
}
function G(i, e, t, n) {
  if (i && i.o) {
    if (ea.has(i)) return;
    ea.add(i),
      ol.c.push(() => {
        ea.delete(i), n && (t && i.d(1), n());
      }),
      i.o(e);
  } else n && n();
}
const f_ = { duration: 0 };
function c_(i, e, t) {
  const n = { direction: 'in' };
  let l = e(i, t, n),
    r = !1,
    s,
    o,
    c = 0;
  function g() {
    s && Po(i, s);
  }
  function h() {
    const { delay: p = 0, duration: m = 300, easing: v = Lo, tick: k = Ue, css: y } = l || f_;
    y && (s = o_(i, 0, 1, m, p, v, y, c++)), k(0, 1);
    const C = i_() + p,
      T = C + m;
    o && o.abort(),
      (r = !0),
      Rl(() => ia(i, !0, 'start')),
      (o = r_(N => {
        if (r) {
          if (N >= T) return k(1, 0), ia(i, !0, 'end'), g(), (r = !1);
          if (N >= C) {
            const D = v((N - C) / m);
            k(D, 1 - D);
          }
        }
        return r;
      }));
  }
  let _ = !1;
  return {
    start() {
      _ || ((_ = !0), Po(i), Fi(l) ? ((l = l(n)), u_().then(h)) : h());
    },
    invalidate() {
      _ = !1;
    },
    end() {
      r && (g(), (r = !1));
    }
  };
}
function d_(i, e, t) {
  const n = { direction: 'out' };
  let l = e(i, t, n),
    r = !0,
    s;
  const o = ol;
  o.r += 1;
  function c() {
    const { delay: g = 0, duration: h = 300, easing: _ = Lo, tick: p = Ue, css: m } = l || f_;
    m && (s = o_(i, 1, 0, h, g, _, m));
    const v = i_() + g,
      k = v + h;
    Rl(() => ia(i, !1, 'start')),
      r_(y => {
        if (r) {
          if (y >= k) return p(0, 1), ia(i, !1, 'end'), --o.r || Ze(o.c), !1;
          if (y >= v) {
            const C = _((y - v) / h);
            p(1 - C, C);
          }
        }
        return r;
      });
  }
  return (
    Fi(l)
      ? u_().then(() => {
          (l = l(n)), c();
        })
      : c(),
    {
      end(g) {
        g && l.tick && l.tick(1, 0), r && (s && Po(i, s), (r = !1));
      }
    }
  );
}
function la(i, e) {
  const t = (e.token = {});
  function n(l, r, s, o) {
    if (e.token !== t) return;
    e.resolved = o;
    let c = e.ctx;
    s !== void 0 && ((c = c.slice()), (c[s] = o));
    const g = l && (e.current = l)(c);
    let h = !1;
    e.block &&
      (e.blocks
        ? e.blocks.forEach((_, p) => {
            p !== r &&
              _ &&
              (Ee(),
              G(_, 1, 1, () => {
                e.blocks[p] === _ && (e.blocks[p] = null);
              }),
              De());
          })
        : e.block.d(1),
      g.c(),
      B(g, 1),
      g.m(e.mount(), e.anchor),
      (h = !0)),
      (e.block = g),
      e.blocks && (e.blocks[r] = g),
      h && Do();
  }
  if (gw(i)) {
    const l = fl();
    if (
      (i.then(
        r => {
          Mi(l), n(e.then, 1, e.value, r), Mi(null);
        },
        r => {
          if ((Mi(l), n(e.catch, 2, e.error, r), Mi(null), !e.hasCatch)) throw r;
        }
      ),
      e.current !== e.pending)
    )
      return n(e.pending, 0), !0;
  } else {
    if (e.current !== e.then) return n(e.then, 1, e.value, i), !0;
    e.resolved = i;
  }
}
function h_(i, e, t) {
  const n = e.slice(),
    { resolved: l } = i;
  i.current === i.then && (n[i.value] = l), i.current === i.catch && (n[i.error] = l), i.block.p(n, t);
}
const Ui = typeof window < 'u' ? window : typeof globalThis < 'u' ? globalThis : global;
function bt(i, e, t) {
  const n = i.$$.props[e];
  n !== void 0 && ((i.$$.bound[n] = t), t(i.$$.ctx[n]));
}
function Ge(i) {
  i && i.c();
}
function He(i, e, t, n) {
  const { fragment: l, after_update: r } = i.$$;
  l && l.m(e, t),
    n ||
      Rl(() => {
        const s = i.$$.on_mount.map(Zg).filter(Fi);
        i.$$.on_destroy ? i.$$.on_destroy.push(...s) : Ze(s), (i.$$.on_mount = []);
      }),
    r.forEach(Rl);
}
function ze(i, e) {
  const t = i.$$;
  t.fragment !== null &&
    (Ze(t.on_destroy), t.fragment && t.fragment.d(e), (t.on_destroy = t.fragment = null), (t.ctx = []));
}
function Iw(i, e) {
  i.$$.dirty[0] === -1 && (lr.push(i), Pw(), i.$$.dirty.fill(0)), (i.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function Lt(i, e, t, n, l, r, s, o = [-1]) {
  const c = Qr;
  Mi(i);
  const g = (i.$$ = {
    fragment: null,
    ctx: [],
    props: r,
    update: Ue,
    not_equal: l,
    bound: zf(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (c ? c.$$.context : [])),
    callbacks: zf(),
    dirty: o,
    skip_bound: !1,
    root: e.target || c.$$.root
  });
  s && s(g.root);
  let h = !1;
  if (
    ((g.ctx = t
      ? t(i, e.props || {}, (_, p, ...m) => {
          const v = m.length ? m[0] : p;
          return (
            g.ctx && l(g.ctx[_], (g.ctx[_] = v)) && (!g.skip_bound && g.bound[_] && g.bound[_](v), h && Iw(i, _)), p
          );
        })
      : []),
    g.update(),
    (h = !0),
    Ze(g.before_update),
    (g.fragment = n ? n(g.ctx) : !1),
    e.target)
  ) {
    if (e.hydrate) {
      const _ = ww(e.target);
      g.fragment && g.fragment.l(_), _.forEach(A);
    } else g.fragment && g.fragment.c();
    e.intro && B(i.$$.fragment), He(i, e.target, e.anchor, e.customElement), Do();
  }
  Mi(c);
}
class At {
  $destroy() {
    ze(this, 1), (this.$destroy = Ue);
  }
  $on(e, t) {
    if (!Fi(t)) return Ue;
    const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return (
      n.push(t),
      () => {
        const l = n.indexOf(t);
        l !== -1 && n.splice(l, 1);
      }
    );
  }
  $set(e) {
    this.$$set && !_w(e) && ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
  }
}
class Tw {
  constructor() {
    (this.handles = {}), (this.keyExistencyTimeout = 2e4), (this.keyExistencyCheckInterval = 50);
  }
  wrapAsPromise(e) {
    return new Promise(t => {
      t(e);
    });
  }
  applyFunctionPromisified(e, t) {
    return (e = e.apply(this, t)), ee.isPromise(e) ? e : this.wrapAsPromise(e);
  }
  getConfigValueFromObjectAsync(e, t, ...n) {
    let l = ee.getConfigValueFromObject(e, t);
    return ee.isFunction(l) ? this.applyFunctionPromisified(l, n) : this.wrapAsPromise(l);
  }
}
const ra = new Tw();
class Lw {
  convertCustomMessageInternalToUser(e) {
    return e.data;
  }
  convertCustomMessageUserToInternal(e) {
    return { msg: 'custom', data: e };
  }
}
const sa = new Lw();
class Aw {
  constructor() {
    this.dataManagement = new Map();
  }
  setChildren(e, t) {
    this.dataManagement.set(e, t), (this.navPath = '');
  }
  getChildren(e) {
    return e ? this.dataManagement.get(e) : {};
  }
  hasChildren(e) {
    const t = this.getChildren(e);
    return t && t.hasOwnProperty('children');
  }
  setRootNode(e) {
    this.dataManagement.set('_luigiRootNode', { node: e });
  }
  getRootNode() {
    return this.dataManagement.get('_luigiRootNode');
  }
  hasRootNode() {
    return !!this.getRootNode();
  }
  deleteCache() {
    this.dataManagement.clear();
  }
  deleteNodesRecursively(e) {
    if (this.hasChildren(e)) {
      let t = this.getChildren(e).children;
      for (let n = 0; n < t.length; n++) this.deleteNodesRecursively(t[n]);
    }
    this.dataManagement.delete(e);
  }
}
const Vn = new Aw();
class Rw {
  constructor() {
    (this.configReadyCallback = function() {}),
      (this.initialized = !1),
      (this.USER_SETTINGS_KEY = 'luigi.preferences.userSettings');
  }
  setConfigCallbacks(e) {
    this.configReadyCallback = e;
  }
  async setConfig(e) {
    (this.config = e),
      window.Luigi._store.update(() => ({ config: e })),
      (this._configModificationTimestamp = new Date()),
      this.initialized ||
        ((this.initialized = !0),
        this.configReadyCallback().then(async () => {
          o2.luigiAfterInit(), await this.executeConfigFnAsync('lifecycleHooks.luigiAfterInit');
        }));
  }
  getConfig() {
    return this.config;
  }
  configChanged(...e) {
    const t = Fn.optimizeScope(e);
    t.length > 0
      ? t.forEach(n => {
          window.Luigi._store.fire(n, { current: window.Luigi._store });
        })
      : window.Luigi._store.update(n => n);
  }
  setErrorMessage(e) {
    var t = document.createTextNode(e),
      n = document.createElement('div');
    n.setAttribute('class', 'fd-ui'), n.setAttribute('style', 'text-align: center;');
    var l = document.createElement('div');
    l.setAttribute('class', 'fd-message-strip fd-message-strip--error'),
      l.setAttribute('style', 'max-width: 800px; display: inline-block; margin-top: 40px;'),
      l.appendChild(t),
      n.appendChild(l),
      Mn.getLuigiContainer().appendChild(n);
  }
  getConfigValue(e) {
    return ee.getConfigValueFromObject(this.getConfig(), e);
  }
  getConfigBooleanValue(e) {
    const t = ee.getConfigValueFromObject(this.getConfig(), e);
    return t === !0 || t === 'true';
  }
  getConfigValueAsync(e, ...t) {
    return ra.getConfigValueFromObjectAsync(this.getConfig(), e, t);
  }
  async executeConfigFnAsync(e, t = !1, ...n) {
    const l = this.getConfigValue(e);
    if (ee.isFunction(l))
      try {
        return await ra.applyFunctionPromisified(l, n);
      } catch (r) {
        if (t) return Promise.reject(r);
      }
    return Promise.resolve(void 0);
  }
  isAuthorizationEnabled() {
    return gi.isAuthorizationEnabled();
  }
  unload() {
    (this.initialized = !1), en.unload(), Pn.removeAllEventListeners();
    const e = Mn.getLuigiContainer();
    for (; e.firstChild; ) e.removeChild(e.lastChild);
  }
  async readUserSettings() {
    const e = await this.getConfigValueAsync('userSettings'),
      t = e || (await this.getConfigValueAsync('settings.userSettings'));
    if (t && ee.isFunction(t.readUserSettings)) return t.readUserSettings();
    const n = localStorage.getItem(this.USER_SETTINGS_KEY);
    return n && JSON.parse(n);
  }
  async storeUserSettings(e, t) {
    const n = await this.getConfigValueAsync('userSettings'),
      l = n || (await this.getConfigValueAsync('settings.userSettings'));
    if (l && ee.isFunction(l.storeUserSettings)) return l.storeUserSettings(e, t);
    localStorage.setItem(this.USER_SETTINGS_KEY, JSON.stringify(e)), this.configChanged();
  }
  reset() {
    const e = this.getConfig();
    this.unload(), this.setConfig(e);
  }
  clearNavigationCache() {
    Vn.deleteCache();
    const e = t => {
      t &&
        t.forEach &&
        t.forEach(n => {
          n.titleResolver && n.titleResolver._cache && (n.titleResolver._cache = void 0), n.children && e(n.children);
        });
    };
    e(this.getConfig().navigation.nodes);
  }
}
const aa = new Rw();
class Ew {
  constructor() {}
  isAuthorizationEnabled() {
    return !!re.getConfigValue('auth.use');
  }
  login() {
    this.isAuthorizationEnabled() && en.startAuthorization();
  }
  logout() {
    this.isAuthorizationEnabled() && en.logout();
  }
  async handleAuthEvent(e, t, n, l) {
    const r = await re.executeConfigFnAsync('auth.events.' + e, !1, t, n);
    let s = r === void 0 || !!r;
    if (s && l) {
      window.location.href = l;
      return;
    }
    return s;
  }
  get store() {
    return (
      re.initialized ||
        console.warn(
          'Luigi Core is not initialized yet. Consider moving your code to the luigiAfterInit lifecycle hook. Documentation: https://docs.luigi-project.io/docs/lifecycle-hooks'
        ),
      {
        getStorageKey: () => ii.getStorageKey(),
        getStorageType: () => ii.getStorageType(),
        getAuthData: () => ii.getAuthData(),
        setAuthData: e => ii.setAuthData(e),
        removeAuthData: () => ii.removeAuthData(),
        setNewlyAuthorized: () => ii.setNewlyAuthorized()
      }
    );
  }
}
const g_ = new Ew(),
  Xt = { desktopMinWidth: 600 },
  Dw = [
    { type: 'main', selector: '.iframeContainer iframe' },
    { type: 'split-view', selector: '.iframeSplitViewCnt iframe' },
    { type: 'modal', selector: '.iframeModalCtn._modal iframe' },
    { type: 'drawer', selector: '.iframeModalCtn._drawer iframe' },
    { type: 'user-settings', selector: '.iframeUserSettingsCtn iframe' }
  ],
  Vw = { cssSelector: '[luigi-app-root]' },
  Mw = { cssSelector: '[luigi-app-loading-indicator]' };
class Ow {
  getLuigiContainer() {
    return this.getCustomLuigiContainer() || this.getDefaultLuigiContainer();
  }
  isCustomLuigiContainer() {
    return Boolean(this.getLuigiContainer() === this.getCustomLuigiContainer());
  }
  getCustomLuigiContainer() {
    return document.querySelector(Vw.cssSelector);
  }
  getDefaultLuigiContainer() {
    return document.querySelector('body');
  }
  getShellbar() {
    return document.getElementsByClassName('lui-shellbar-wrapper')[0];
  }
  getShellbarActions() {
    return document.getElementsByClassName('lui-shellbar_group--actions')[0];
  }
  getMicrofrontends() {
    return Ie.getMicrofrontendsInDom();
  }
  getMicrofrontendIframes() {
    return Ie.getMicrofrontendIframes();
  }
  getCurrentMicrofrontendIframe() {
    return Ie.getCurrentMicrofrontendIframe();
  }
  getNavFooterContainer() {
    return document.getElementsByClassName('lui-side-nav__footer')[0];
  }
}
const __ = new Ow();
class Fw {
  constructor() {
    this.promises = {};
  }
  setPromise(e, t) {
    this.promises[e] = t;
  }
  getPromise(e) {
    return this.promises[e];
  }
}
class Yn extends Fw {
  constructor(e) {
    super(),
      Object.assign(this, e),
      (this.options = {
        preserveView: !1,
        nodeParams: {},
        errorSkipNavigation: !1,
        fromContext: null,
        fromClosestContext: !1,
        relative: !1,
        link: ''
      });
  }
  async navigate(e, t, n, l, r) {
    if (this.options.errorSkipNavigation)
      return (this.options.errorSkipNavigation = !1), Promise.reject(new Error('navigation skipped'));
    this.options.preserveView = t;
    const s = e[0] !== '/';
    if (e === '/' && (n || l || r))
      return (
        console.warn('Navigation with an absolute path prevented.'),
        Promise.reject(new Error('Navigation with an absolute path prevented.'))
      );
    const o = ee.createRemotePromise(),
      c = {
        msg: 'luigi.navigation.open',
        params: Object.assign(this.options, { link: e, relative: s, modal: n, splitView: l, drawer: r }),
        remotePromiseId: o.id
      };
    return this.sendPostMessageToLuigiCore(c), o;
  }
  openAsModal(e, t = {}, n) {
    if (ee.isFunction(n)) {
      const l = ee.createRemotePromise();
      l.then(r => {
        n(r);
      }),
        (t.onClosePromiseId = l.id);
    }
    return this.navigate(e, !0, t);
  }
  openAsDrawer(e, t = {}) {
    return this.navigate(e, !0, void 0, void 0, t);
  }
  openAsSplitView(e, t = {}) {
    return this.navigate(e, !0, void 0, t), Luigi.splitView.splitViewHandle;
  }
  fromContext(e) {
    return (this.options.fromContext = e), this;
  }
  fromClosestContext() {
    return (this.options.fromContext = null), (this.options.fromClosestContext = !0), this;
  }
  fromVirtualTreeRoot() {
    return (
      (this.options.fromContext = null),
      (this.options.fromClosestContext = !1),
      (this.options.fromVirtualTreeRoot = !0),
      this
    );
  }
  withParams(e) {
    return e && Object.assign(this.options.nodeParams, e), this;
  }
  pathExists(e) {
    if (ee.isFunction(Luigi.pathExists)) return Luigi.pathExists(e);
    console.error(
      'Luigi.navigation().pathExists(path) is only available inside your configuration, after the configuration was initialized with Luigi.setConfig().'
    );
  }
  hasBack() {
    return Luigi.hasBack();
  }
  goBack(e) {
    this.sendPostMessageToLuigiCore({ msg: 'luigi.navigation.back', goBackContext: e && JSON.stringify(e) });
  }
  sendPostMessageToLuigiCore(e) {
    window.postMessage(e, '*');
  }
}
class Uw {
  constructor() {}
  updateTopNavigation() {
    window.postMessage({ msg: 'luigi.navigation.update-badge-counters' }, '*');
  }
  navigate(e, t, n, l, r) {
    return new Yn().navigate(e, t, n, l, r);
  }
  openAsModal(e, t, n) {
    return new Yn().openAsModal(e, t, n);
  }
  openAsSplitView(e, t = {}) {
    if (e === '/') {
      console.warn('Navigation with an absolute path prevented.');
      return;
    }
    return new Yn().openAsSplitView(e, t);
  }
  openAsDrawer(e, t) {
    return new Yn().openAsDrawer(e, t);
  }
  fromContext(e) {
    return new Yn().fromContext(e);
  }
  fromClosestContext() {
    return new Yn().fromClosestContext();
  }
  fromVirtualTreeRoot() {
    return new Yn().fromVirtualTreeRoot();
  }
  withParams(e) {
    return new Yn().withParams(e);
  }
  pathExists(e) {
    return new Yn().pathExists(e);
  }
  hasBack() {
    return new Yn().hasBack();
  }
  goBack(e) {
    return new Yn().goBack(e);
  }
}
const p_ = new Uw(),
  Bw = {
    luigi: {
      unsavedChangesAlert: {
        header: 'Unsaved changes detected',
        body: 'Unsaved changes will be lost. Do you want to continue?'
      },
      confirmationModal: { header: 'Confirmation', body: 'Are you sure you want to do this?' },
      button: { dismiss: 'No', confirm: 'Yes' },
      requestedRouteNotFound: 'Could not find the requested route {route}.',
      notExactTargetNode: 'Could not map the exact target node for the requested route {route}.',
      navigation: { up: 'Up' }
    }
  },
  Ww = Bw;
class Hw {
  constructor() {
    (this.currentLocaleStorageKey = 'luigi.currentLocale'),
      (this.defaultLocale = 'en'),
      (this.translationTable = Ww),
      (this.listeners = {});
  }
  _init() {
    Fn.doOnStoreChange(
      window.Luigi._store,
      () => {
        this._initCustomImplementation();
      },
      ['settings']
    );
  }
  getCurrentLocale() {
    return sessionStorage.getItem(this.currentLocaleStorageKey) || this.defaultLocale;
  }
  setCurrentLocale(e) {
    e && (sessionStorage.setItem(this.currentLocaleStorageKey, e), this._notifyLocaleChange(e));
  }
  addCurrentLocaleChangeListener(e) {
    if (ee.isFunction(e)) {
      const t = ee.getRandomId();
      return (this.listeners[t] = e), t;
    } else console.error('Provided locale change listener is not a function.');
  }
  removeCurrentLocaleChangeListener(e) {
    e && this.listeners[e]
      ? delete this.listeners[e]
      : console.error('Unable to remove locale change listener - no listener registered for given ID.');
  }
  _notifyLocaleChange(e) {
    Object.getOwnPropertyNames(this.listeners).forEach(t => {
      this.listeners[t](e);
    }),
      aa.configChanged();
  }
  _initCustomImplementation() {
    (this.translationImpl = aa.getConfigValue('settings.customTranslationImplementation')),
      ee.isFunction(this.translationImpl) && (this.translationImpl = this.translationImpl());
  }
  getTranslation(e, t = void 0, n = void 0) {
    if (!e) return '';
    if (this.translationImpl) {
      const r = this.translationImpl.getTranslation(e, t, n);
      if (r !== e) return r;
    }
    const l = this.findTranslation(e, this.translationTable, t);
    return l || e;
  }
  findTranslation(e, t, n) {
    let l = e.split('.');
    for (let r = 0; r < l.length; r++) {
      let s = l[r];
      if (t.hasOwnProperty(s) && typeof t[s] == 'object') t = t[s];
      else return n ? this.findInterpolations(t[s], n) : t[s];
    }
  }
  findInterpolations(e, t) {
    return (
      Object.keys(t).forEach(n => {
        e = e.replace(new RegExp('{' + fr.escapeKeyForRegexp(n) + '}', 'gi'), t[n]);
      }),
      e
    );
  }
}
const m_ = new Hw();
class zw {
  sendToAll(e) {
    const t = sa.convertCustomMessageUserToInternal(e);
    Ie.getMicrofrontendsInDom()
      .map(n => n.container)
      .map(n => Ie.sendMessageToIframe(n, t));
  }
  send(e, t) {
    const n = sa.convertCustomMessageUserToInternal(t);
    Ie.getMicrofrontendsInDom()
      .filter(l => l.id === e)
      .map(l => l.container)
      .map(l => Ie.sendMessageToIframe(l, n));
  }
}
const qw = new zw(),
  nr = [];
function Gw(i, e) {
  return { subscribe: or(i, e).subscribe };
}
function or(i, e = Ue) {
  let t;
  const n = new Set();
  function l(o) {
    if (It(i, o) && ((i = o), t)) {
      const c = !nr.length;
      for (const g of n) g[1](), nr.push(g, i);
      if (c) {
        for (let g = 0; g < nr.length; g += 2) nr[g][0](nr[g + 1]);
        nr.length = 0;
      }
    }
  }
  function r(o) {
    l(o(i));
  }
  function s(o, c = Ue) {
    const g = [o, c];
    return (
      n.add(g),
      n.size === 1 && (t = e(l) || Ue),
      o(i),
      () => {
        n.delete(g), n.size === 0 && (t(), (t = null));
      }
    );
  }
  return { set: l, update: r, subscribe: s };
}
class Kw {
  initial() {
    this.responsiveNavSetting = re.getConfigValue('settings.responsiveNavigation');
    const e = this.responsiveNavSetting === 'semiCollapsible' || this.responsiveNavSetting === 'Fiori3';
    JSON.parse(localStorage.getItem(Te.COL_NAV_KEY)) !== !1 && e && (this.isSemiCollapsed = this.getCollapsed()),
      (this.semiCollapsible = !!e);
    let t = this.isSemiCollapsed === void 0;
    return (
      this.semiCollapsible && window.innerWidth !== 0 && window.innerWidth < Xt.desktopMinWidth
        ? (this.isSemiCollapsed = t ? !0 : this.getCollapsed())
        : (this.isSemiCollapsed = t ? !1 : this.getCollapsed()),
      this.setCollapsed(this.isSemiCollapsed),
      (this.previousWindowWidth = window.innerWidth),
      { isSemiCollapsed: this.isSemiCollapsed, semiCollapsible: this.semiCollapsible }
    );
  }
  onValueChanged(e) {
    this.valueChangedFns ? this.valueChangedFns.push(e) : (this.valueChangedFns = [e]);
  }
  onResize(e) {
    const t =
        window.innerWidth !== 0 &&
        window.innerWidth < Xt.desktopMinWidth &&
        this.previousWindowWidth >= Xt.desktopMinWidth,
      n =
        window.innerWidth !== 0 &&
        window.innerWidth > Xt.desktopMinWidth &&
        this.previousWindowWidth >= Xt.desktopMinWidth;
    return (
      t && this.setCollapsed(!0, !1),
      !this.isStoredCollapsed() && n && this.setCollapsed(!1, !1),
      (e = this.closePopupMenu(e)),
      { isSemiCollapsed: this.isSemiCollapsed, selectedCategory: e }
    );
  }
  setCollapsed(e, t = !0) {
    document.body.classList.remove('semiCollapsed'),
      e && document.body.classList.add('semiCollapsed'),
      (this.isSemiCollapsed = e),
      t && localStorage.setItem(Te.COL_NAV_KEY, e),
      this.valueChangedFns instanceof Array &&
        this.valueChangedFns.forEach(n => n({ isSemiCollapsed: this.isSemiCollapsed }));
  }
  isStoredCollapsed() {
    return JSON.parse(localStorage.getItem(Te.COL_NAV_KEY));
  }
  getCollapsed() {
    return this.isStoredCollapsed() ? !0 : this.isSemiCollapsed;
  }
  closePopupMenu(e) {
    return e && ((e = null), document.getElementsByClassName('fd-app__sidebar')[0].classList.remove('isBlocked')), e;
  }
  buttonClicked(e) {
    return (
      this.closePopupMenu(),
      this.getCollapsed()
        ? this.setCollapsed(!1)
        : (this.setCollapsed(!0),
          document.getElementsByClassName('lui-fd-side-nav-wrapper')[0].setAttribute('style', 'overflow-y:hidden;'),
          window.setTimeout(function() {
            document.getElementsByClassName('lui-fd-side-nav-wrapper')[0].setAttribute('style', 'overflow-y:auto;');
          })),
      this.isSemiCollapsed
    );
  }
}
const di = new Kw();
class Jw {
  constructor() {
    this.documentTitle = or();
  }
  hideAppLoadingIndicator() {
    const e = document.querySelector(Mw.cssSelector);
    e &&
      (e.classList.add('hidden'),
      setTimeout(() => {
        e.parentNode && e.parentNode.removeChild(e);
      }, 500));
  }
  showAlert(e) {
    if (ee.isFunction(Luigi.showAlert)) return Luigi.showAlert(e);
    console.error(
      'Luigi.ux().showAlert() is only available inside your configuration, after the configuration was initialized with Luigi.setConfig().'
    );
  }
  showConfirmationModal(e) {
    if (ee.isFunction(Luigi.showConfirmationModal)) return Luigi.showConfirmationModal(e);
    console.error(
      'Luigi.ux().showConfirmationModal() is only available inside your configuration, after the configuration was initialized with Luigi.setConfig().'
    );
  }
  setDocumentTitle(e) {
    this.documentTitle.set(e), Luigi.configChanged('settings.header');
  }
  getDocumentTitle() {
    return rl(this.documentTitle);
  }
  collapseLeftSideNav(e) {
    di.setCollapsed(e);
  }
  openUserSettings() {
    Luigi.openUserSettings();
  }
  closeUserSettings() {
    Luigi.closeUserSettings();
  }
  removeBackdrop() {
    new Yn().sendPostMessageToLuigiCore({ msg: 'luigi.remove-backdrop' });
  }
}
const b_ = new Jw();
class jw {
  openSearchField() {
    Luigi.openSearchField();
  }
  closeSearchField() {
    Luigi.closeSearchField();
  }
  clearSearchField() {
    Luigi.clearSearchField();
  }
  showSearchResult(e) {
    Luigi.showSearchResult(e);
  }
  closeSearchResult() {
    Luigi.closeSearchResult();
  }
  getSearchString() {
    return Luigi.getGlobalSearchString();
  }
  setSearchString(e) {
    Luigi.setGlobalSearchString(e);
  }
  setSearchInputPlaceholder(e) {
    Luigi.setSearchInputPlaceholder(e);
  }
}
const v_ = new jw();
class Yw {
  constructor() {
    this.currentTheme;
  }
  async getAvailableThemes() {
    return await re.getConfigValueAsync('settings.theming.themes');
  }
  setCurrentTheme(e) {
    this.currentTheme = e;
  }
  async getThemeObject(e) {
    const t = await this.getAvailableThemes();
    return t && t.find(n => n.id === e);
  }
  getCurrentTheme() {
    if (!this.isThemingAvailable()) return !1;
    if (this.currentTheme) return this.currentTheme;
    const e = re.getConfigValue('settings.theming');
    return (
      e.defaultTheme ||
        console.error('[Theming] getCurrentTheme() error. No theme set and no defaultTheme found in configuration', e),
      e.defaultTheme
    );
  }
  isThemingAvailable() {
    return !!re.getConfigValue('settings.theming');
  }
  _init() {
    const e = () => {
      const t = re.getConfigValue('settings.theming');
      t &&
        t.nodeViewURLDecorator &&
        t.nodeViewURLDecorator.queryStringParameter &&
        Zr.add({
          type: 'queryString',
          uid: 'theming',
          key: t.nodeViewURLDecorator.queryStringParameter.keyName,
          valueFn: () => {
            const n = this.getCurrentTheme(),
              l = t.nodeViewURLDecorator.queryStringParameter.value;
            return l ? l(n) : n;
          }
        }),
        t && t.useFioriScrollbars === !0 && document.body.classList.add('fioriScrollbars');
    };
    Fn.doOnStoreChange(
      window.Luigi._store,
      () => {
        e();
      },
      ['settings.theming']
    );
  }
}
const w_ = new Yw();
class Qw {
  constructor() {
    this.featureToggleList = or([]);
  }
  setFeatureToggle(e, t = !1) {
    !this.isValid(e) ||
      (e.startsWith('!') && !t) ||
      this.isDuplicatedOrDisabled(e) ||
      rl(this.featureToggleList).push(e);
  }
  unsetFeatureToggle(e) {
    if (!this.isValid(e)) return;
    const t = rl(this.featureToggleList).indexOf(e);
    if (t === -1) {
      console.warn('Feature toggle name is not in the list.');
      return;
    }
    rl(this.featureToggleList).splice(t, 1);
  }
  getActiveFeatureToggleList() {
    return [...rl(this.featureToggleList)].filter(e => !e.startsWith('!'));
  }
  isValid(e) {
    return ee.isString(e) ? !0 : (console.warn("Feature toggle name is not valid or not of type 'string'"), !1);
  }
  isDuplicatedOrDisabled(e) {
    return rl(this.featureToggleList).includes(e)
      ? (console.warn('Feature toggle name already exists'), !0)
      : rl(this.featureToggleList).includes(`!${e}`)
      ? (console.warn('Disabled feature toggle can not be activated'), !0)
      : !1;
  }
}
const k_ = new Qw();
class Zw {
  constructor() {}
  getSearchParams() {
    const e = {},
      t = new URL(location);
    if (re.getConfigValue('routing.useHashRouting'))
      for (const [n, l] of new URLSearchParams(t.hash.split('?')[1])) e[n] = l;
    else for (const [n, l] of t.searchParams.entries()) e[n] = l;
    return e;
  }
  addSearchParams(e, t) {
    if (!ee.isObject(e)) {
      console.log('Params argument must be an object');
      return;
    }
    const n = new URL(location);
    re.getConfigValue('routing.useHashRouting')
      ? (n.hash = pe.addParamsOnHashRouting(e, n.hash))
      : pe.modifySearchParams(e, n.searchParams),
      this.handleBrowserHistory(t, n),
      re.configChanged();
  }
  addNodeParams(e, t) {
    if (!ee.isObject(e)) {
      console.log('Params argument must be an object');
      return;
    }
    const n = pe.getContentViewParamPrefix(),
      l = new URL(location);
    re.getConfigValue('routing.useHashRouting')
      ? (l.hash = pe.addParamsOnHashRouting(e, l.hash, n))
      : pe.modifySearchParams(e, l.searchParams, n),
      this.handleBrowserHistory(t, l),
      re.configChanged();
  }
  sanitizeUrl(e) {
    return new URL(location).origin === new URL(e).origin ? e : void 0;
  }
  handleBrowserHistory(e, t) {
    const n = this.sanitizeUrl(t.href);
    if (!n) {
      console.warn('invalid url: ' + n);
      return;
    }
    e ? window.history.pushState({}, '', n) : window.history.replaceState({}, '', n);
  }
  getAnchor() {
    const { hash: e } = new URL(location);
    return re.getConfigValue('routing.useHashRouting') && e.split('#').length === 2 ? '' : e.split('#').pop();
  }
  setAnchor(e) {
    if (re.getConfigValue('routing.useHashRouting')) {
      const { hash: t } = new URL(location),
        n = t.split('#'),
        r = n.length > 2 ? n.slice(0, -1) : n;
      window.location.hash = [...r, e].join('#');
    } else window.location.hash = e;
  }
}
const S_ = new Zw(),
  re = aa,
  gi = g_,
  Mn = __,
  C_ = p_,
  ht = m_,
  Xr = b_,
  Xw = v_,
  y_ = w_,
  Vo = k_,
  sl = S_;
window.Luigi = aa;
window.Luigi.auth = () => g_;
window.Luigi.elements = () => __;
window.Luigi.navigation = () => p_;
window.Luigi.i18n = () => m_;
window.Luigi.customMessages = () => qw;
window.Luigi.ux = () => b_;
window.Luigi.globalSearch = () => v_;
window.Luigi.theming = () => w_;
window.Luigi.featureToggles = () => k_;
window.Luigi.routing = () => S_;
class $w {
  constructor() {
    (this.iframeNavFallbackTimeout = 2e3), this.timeoutHandle;
  }
  getActiveIframe(e) {
    return [...e.children].filter(n => n.tagName === 'IFRAME').find(ee.isElementVisible);
  }
  setActiveIframeToPrevious(e) {
    const t = Ie.getMainIframes(),
      n = this.getPreservedViewsInDom(t);
    if (n.length === 0) return;
    const l = this.getActiveIframe(e);
    Ie.hideElementChildren(e), l && e.removeChild(l), (n[0].pv = void 0), (n[0].style.display = 'block');
  }
  removeInactiveIframes(e) {
    Array.from(e.children).forEach(n => {
      !ee.isElementVisible(n) && !n.vg && n.tagName === 'IFRAME' && e.removeChild(n);
    });
  }
  hasIsolatedView(e, t, n) {
    return e || (n && e !== !1 && !t);
  }
  getPreservedViewsInDom(e) {
    return e.filter(t => t.pv);
  }
  getAllViewGroupSettings() {
    return re.getConfigValue('navigation.viewGroupSettings');
  }
  getViewGroupSettings(e) {
    const t = this.getAllViewGroupSettings();
    return e && t && t[e] ? t[e] : {};
  }
  canCache(e) {
    const t = this.getViewGroupSettings(e);
    return t && t.preloadUrl;
  }
  notifyInactiveIframes() {
    const e = {
      msg: 'luigi-client.inactive-microfrontend',
      context: JSON.stringify({}),
      nodeParams: JSON.stringify({}),
      pathParams: JSON.stringify({}),
      internal: JSON.stringify({ currentLocale: ht.getCurrentLocale() })
    };
    Ie.sendMessageToVisibleIframes(e);
  }
  switchActiveIframe(e, t, n) {
    const l = this.getActiveIframe(e);
    if (l !== t) {
      let r = !1;
      Array.from(e.children).forEach(o => {
        if (o === l)
          if (n) e.removeChild(o);
          else {
            const c = this.getViewGroupSettings(o.vg);
            if ((c && this.notifyInactiveIframes(), (o.style.display = 'none'), c.preloadUrl)) {
              const g = {
                msg: 'luigi.navigate',
                viewUrl: c.preloadUrl,
                context: JSON.stringify({}),
                nodeParams: JSON.stringify({}),
                pathParams: JSON.stringify({}),
                internal: JSON.stringify({ currentLocale: ht.getCurrentLocale() })
              };
              Ie.sendMessageToIframe(o, g);
            }
          }
        o === t && (r = !0);
      }),
        t && ((t.style.display = 'block'), r || e.insertBefore(t, e.firstChild));
    }
    return t;
  }
  setOkResponseHandler(e, t, n) {
    this.timeoutHandle = setTimeout(async () => {
      e.navigateOk
        ? (e.navigateOk = void 0)
        : (Ie.removeIframe(e.iframe, n),
          (e.iframe = void 0),
          (e.isFallbackFrame = !0),
          console.info('navigate: luigi-client did not respond, using fallback by replacing iframe'),
          await this.navigateIframe(e, t, n));
    }, this.iframeNavFallbackTimeout);
  }
  checkIframe(e, t, n, l, r) {
    this.timeoutHandle = setTimeout(() => {
      t.get().showLoadingIndicator &&
        (e.viewUrl
          ? ((n = e.viewUrl),
            t.set({ viewUrl: n }),
            (this.iframeNavFallbackTimeout = 0),
            this.setOkResponseHandler(l, t, r))
          : Te.handleUnresponsiveClient(e));
    }, e.timeout);
  }
  initHandshakeFailed(e) {
    if (!(e && e.iframe && e.iframe.luigi)) return !0;
    const t = e.iframe.luigi.clientVersion;
    return e.iframe.luigi.initOk === void 0
      ? !0
      : !t || ee.semverCompare('1.1.1', t) !== -1
      ? !1
      : !e.iframe.luigi.initOk;
  }
  async navigateIframe(e, t, n) {
    clearTimeout(this.timeoutHandle);
    const l = t.get();
    let r = l.viewUrl;
    r && (r = pe.substituteViewUrl(r, l));
    const s = Ie.isSameViewGroup(e, t),
      o = this.hasIsolatedView(l.previousNodeValues.isolateView, s, e.isolateAllViews),
      c = this.hasIsolatedView(l.isolateView, s, e.isolateAllViews),
      g = Ie.canReuseIframe(e, t);
    let h = this.getActiveIframe(n);
    const _ = Ie.getMainIframes(),
      p = this.getPreservedViewsInDom(_);
    let m,
      v = !1;
    if (
      (p.length > 0 && ((m = p.shift()), m === h && ((v = !0), (h = void 0), (e.iframe = void 0))),
      !v && !t.get().isNavigateBack)
    ) {
      h && o && (h = this.switchActiveIframe(n, void 0, !0)), h && c && (h = this.switchActiveIframe(n, void 0, !h.vg));
      let k;
      if (!c && l.viewGroup) {
        const C = Ie.getMainIframes().filter(T => T.vg === l.viewGroup);
        C.length > 0 && ((k = C[0]), (h = this.switchActiveIframe(n, k, h && !h.vg)));
      }
      h &&
        !k &&
        (h.vg ? (h = this.switchActiveIframe(n, void 0, !1)) : g || (h = this.switchActiveIframe(n, void 0, !0))),
        (e.iframe = h);
    }
    if (!e.iframe || this.initHandshakeFailed(e)) {
      if (
        (e.iframe && n.removeChild(e.iframe),
        v ? (this.notifyInactiveIframes(), Ie.hideElementChildren(n)) : Ie.removeElementChildren(n),
        l.viewUrl)
      ) {
        ee.getConfigValueFromObject(l, 'currentNode.loadingIndicator.enabled') !== !1
          ? t.set({ showLoadingIndicator: !0 })
          : t.set({ showLoadingIndicator: !1 }),
          (e.navigateOk = void 0);
        const k = l.viewGroup && !c && this.canCache(l.viewGroup);
        (e.iframe = Ie.createIframe(r, k ? l.viewGroup : void 0, t.get().currentNode, 'main', l)),
          n.insertBefore(e.iframe, n.firstChild),
          e.builderCompatibilityMode
            ? e.iframe.addEventListener('load', () => {
                e.iframe._ready = !0;
                const C = ['init', JSON.stringify(l.context)];
                Ie.sendMessageToIframe(e.iframe, C);
              })
            : e.iframe.addEventListener('load', () => {
                e.iframe._ready = !0;
              });
        const y = l.currentNode.pageErrorHandler;
        y
          ? this.checkIframe(y, t, r, e, n)
          : e.defaultPageErrorHandler && this.checkIframe(e.defaultPageErrorHandler, t, r, e, n);
      }
    } else {
      t.set({ showLoadingIndicator: !1 });
      const k = t.get().goBackContext;
      (e.iframe.style.display = 'block'),
        (e.iframe.luigi.nextViewUrl = r),
        (e.iframe.luigi.nextClientPermissions = t.get().currentNode.clientPermissions),
        (e.iframe.vg = this.canCache(l.viewGroup) ? l.viewGroup : void 0),
        (e.iframe.luigi.currentNode = l.currentNode);
      const y = await t.prepareInternalData(e),
        C = {
          msg: 'luigi.navigate',
          viewUrl: r,
          context: JSON.stringify(Object.assign({}, l.context, { goBackContext: k })),
          nodeParams: JSON.stringify(Object.assign({}, l.nodeParams)),
          pathParams: JSON.stringify(Object.assign({}, l.pathParams)),
          searchParams: JSON.stringify(Object.assign({}, pe.prepareSearchParamsForClient(e.iframe.luigi.currentNode))),
          internal: JSON.stringify(y)
        };
      l.isNavigationSyncEnabled
        ? (Ie.getVisibleIframes().forEach(N => {
            N !== e.iframe &&
              (N.userSettingsGroup
                ? Luigi.readUserSettings().then(D => {
                    Ie.sendMessageToIframe(N, {
                      msg: 'luigi.navigate',
                      context: { userSettingsData: D[N.userSettingsGroup] },
                      internal: Ie.applyCoreStateData(N.luigi._lastUpdatedMessage.internal)
                    });
                  })
                : Ie.sendMessageToIframe(N, {
                    msg: 'luigi.navigate',
                    context: N.luigi._lastUpdatedMessage.context,
                    nodeParams: N.luigi._lastUpdatedMessage.nodeParams,
                    pathParams: JSON.stringify(Object.assign({}, N.luigi.pathParams)),
                    searchParams: JSON.stringify(
                      Object.assign({}, pe.prepareSearchParamsForClient(e.iframe.luigi.currentNode))
                    ),
                    internal: Ie.applyCoreStateData(N.luigi._lastUpdatedMessage.internal)
                  }));
          }),
          Ie.sendMessageToIframe(e.iframe, C),
          this.setOkResponseHandler(e, t, n))
        : t.set({ isNavigationSyncEnabled: !0 }),
        t.set({ goBackContext: void 0, isNavigateBack: !1 });
    }
  }
}
const Qn = new $w();
class xw {
  constructor() {
    (this.preloadBatchSize = 1), (this.shouldPreload = !1);
  }
  preloadViewGroups(e = 3, t) {
    if (re.getConfigValue('navigation.preloadViewGroups') === !1) return;
    const l = Qn.getAllViewGroupSettings();
    if (!l) return;
    const r = Ie.getIframeContainer(),
      s = Ie.getMainIframes(),
      o = new Date().getTime();
    if (s.filter(_ => _.luigi && _.luigi.preloading && o - _.luigi.createdAt < 3e4).length > 0) {
      console.debug('skipping view group preloading (busy)');
      return;
    }
    const g = s.map(_ => _.vg).filter(Boolean),
      h = Object.entries(l)
        .filter(([_, p]) => !g.includes(_))
        .filter(([_, p]) => p && p.preloadUrl);
    t &&
      h.forEach(([_, p]) => {
        p.loadOnStartup && this.preloadIframeOnBackground(p, _, r);
      }),
      !t &&
        h
          .filter((_, p) => p < e)
          .forEach(([_, p]) => {
            console.debug('preloading view group ' + _ + ' - ' + p.preloadUrl), this.preloadIframeOnBackground(p, _, r);
          });
  }
  preloadIframeOnBackground(e, t, n) {
    const l = Ie.createIframe(e.preloadUrl, t, null, 'main');
    (l.style.display = 'none'), (l.luigi.preloading = !0), n.appendChild(l);
  }
  preload(e) {
    this.shouldPreload &&
      setTimeout(() => {
        this.preloadViewGroups(this.preloadBatchSize, e);
      }, e),
      (this.shouldPreload = !0);
  }
  viewGroupLoaded(e) {
    if (e.luigi.preloading) {
      const t = new Date().getTime() - e.luigi.createdAt;
      let n = 1;
      t < 500 ? (n = 3) : t < 1e3 && (n = 2),
        (this.preloadBatchSize = n),
        console.debug('preload batch size: ' + this.preloadBatchSize),
        setTimeout(
          () => {
            e.luigi.preloading = !1;
          },
          this.preloadBatchSize > 2 ? 500 : 1e3
        );
    }
  }
}
const ir = new xw();
class e2 {
  async getNavigationPath(e, t = '') {
    try {
      const n = ee.getTrimmedUrl(t);
      if (!e) return console.error('No navigation nodes provided in the configuration.'), [{}];
      let l;
      if ((Vn.hasRootNode() && (l = Vn.getRootNode().node), !l)) {
        const g = await e;
        ee.isObject(g)
          ? ((l = g),
            l.pathSegment &&
              ((l.pathSegment = ''),
              console.warn('Root node must have an empty path segment. Provided path segment will be ignored.')))
          : (l = { children: g }),
          (l.children = await this.getChildren(l)),
          Vn.setRootNode(l);
      }
      const r = n.split('/'),
        s = await this.buildNode(r, [l], l.children, l.context || {}),
        o = s.navigationPath.filter(g => g.pathSegment).map(g => g.pathSegment);
      s.isExistingRoute = !n || r.length === o.length;
      const c = n.split('/');
      return (s.matchedPath = c.filter((g, h) => (o[h] && o[h].startsWith(':')) || o[h] === g).join('/')), s;
    } catch (n) {
      console.error('Failed to load top navigation nodes.', n);
    }
  }
  async getChildren(e, t) {
    if (!e) return [];
    let n = [];
    if (Vn.hasChildren(e)) {
      let r = Vn.getChildren(e);
      r && (n = r.children);
    } else
      try {
        (n = await ra.getConfigValueFromObjectAsync(e, 'children', t || e.context)),
          n == null && (n = []),
          (n = n.map(r => this.getExpandStructuralPathSegment(r)).map(r => this.bindChildToParent(r, e)) || []);
      } catch (r) {
        console.error('Could not lazy-load children for node', r);
      }
    let l = this.getAccessibleNodes(e, n, t);
    return Vn.setChildren(e, { children: n, filteredChildren: l }), l;
  }
  async getFilteredChildren(e) {
    return Vn.hasChildren(e) ? Mt.getChildrenFromCache(e) : await Mt.getChildren(e);
  }
  getChildrenFromCache(e) {
    let t = Vn.getChildren(e);
    return t ? t.filteredChildren : [];
  }
  getAccessibleNodes(e, t, n) {
    return t ? t.filter(l => Te.isNodeAccessPermitted(l, e, n)) : [];
  }
  bindChildToParent(e, t) {
    return t && t.pathSegment && (e.parent = t), e;
  }
  getExpandStructuralPathSegment(e) {
    if (e && e.pathSegment && e.pathSegment.indexOf('/') !== -1) {
      const t = e.pathSegment.split('/'),
        n = { ...e },
        l = (r, s) => {
          const o = r.shift();
          let c = {};
          return (
            r.length
              ? ((c.pathSegment = o), s.hideFromNav && (c.hideFromNav = s.hideFromNav), (c.children = [l(r, s)]))
              : ((c = n), (c.pathSegment = o)),
            c
          );
        };
      return l(t, e);
    }
    return e;
  }
  async buildNode(e, t, n, l, r = {}) {
    l.parentNavigationContexts || (l.parentNavigationContexts = []);
    let s = { navigationPath: t, context: l, pathParams: r };
    if (e.length > 0 && n && n.length > 0) {
      const o = e[0],
        c = this.findMatchingNode(o, n);
      if (c) {
        t.push(c);
        let g = Te.applyContext(l, c.context, c.navigationContext);
        c.pathSegment.startsWith(':') && (r[c.pathSegment.replace(':', '')] = fr.sanitizeParam(o)),
          (g = pe.substituteDynamicParamsInObject(g, r));
        try {
          this.buildVirtualTree(c, e, r);
          let h = await this.getChildren(c, g);
          const _ = e.slice(1);
          s = this.buildNode(_, t, h, g, r);
        } catch (h) {
          console.error('Error getting nodes children', h);
        }
      }
    }
    return s;
  }
  buildVirtualViewUrl(e, t, n) {
    let l = '';
    for (const r in t) r.startsWith('virtualSegment') && (l += ':' + r + '/');
    return n ? ((l += ':virtualSegment_' + n + '/'), e + '/' + l) : e;
  }
  buildVirtualTree(e, t, n) {
    const l = e.virtualTree,
      r = e._virtualTree,
      s = e._virtualViewUrl || e.viewUrl;
    if ((l || r) && t[0]) {
      let o = e._virtualPathIndex;
      if ((l && ((o = 0), (e.keepSelectedForChildren = !0)), o > 50)) return;
      o++;
      const g = ['_*', 'virtualTree', 'parent', 'children', 'keepSelectedForChildren', 'navigationContext'],
        h = ee.removeProperties(e, g);
      Object.assign(h, {
        pathSegment: ':virtualSegment_' + o,
        label: ':virtualSegment_' + o,
        viewUrl: ee.trimTrailingSlash(this.buildVirtualViewUrl(s, n, o)),
        _virtualTree: !0,
        _virtualPathIndex: o,
        _virtualViewUrl: s
      });
      const _ = Array.isArray(e.children) && e.children.length > 0 ? e.children[0]._virtualTree : !1;
      e.children &&
        !_ &&
        console.warn(`Found both virtualTree and children nodes defined on a navigation node. 
Children nodes are redundant and ignored when virtualTree is enabled. 
Please refer to documentation`),
        (e.children = [h]);
    }
  }
  findMatchingNode(e, t) {
    let n = null;
    const l = t.filter(s => !!s.pathSegment).length,
      r = t.filter(s => s.pathSegment && s.pathSegment.startsWith(':')).length;
    return (
      (e = e.includes('#') ? e.split('#').shift() : e),
      l > 1 &&
      (r === 1 &&
        (console.warn(
          `Invalid node setup detected. 
Static and dynamic nodes cannot be used together on the same level. Static node gets cleaned up. 
Remove the static node from the configuration to resolve this warning. 
Affected pathSegment:`,
          e,
          'Children:',
          t
        ),
        (t = t.filter(s => s.pathSegment && s.pathSegment.startsWith(':')))),
      r > 1)
        ? (console.error(
            `Invalid node setup detected. 
Multiple dynamic nodes are not allowed on the same level. Stopped navigation. 
Invalid Children:`,
            t
          ),
          null)
        : (t.some(s => {
            if (s.pathSegment === e || (s.pathSegment && s.pathSegment.startsWith(':'))) return (n = s), !0;
          }),
          n)
    );
  }
  onNodeChange(e, t) {
    const n = re.getConfigValue('navigation.nodeChangeHook');
    typeof n == 'function' ? n(e, t) : n !== void 0 && console.warn('nodeChangeHook is not a function!');
  }
  getNodesToDisplay(e, t) {
    if (e && e.length > 0) return { children: e };
    if (t.length > 2) {
      const n = t[t.length - 2];
      if (Vn.hasChildren(n)) return { children: this.getChildrenFromCache(n), parent: n };
    }
    return { children: [] };
  }
  getGroupedChildren(e, t) {
    const n = this.getNodesToDisplay(e, t.pathData);
    return Array.isArray(n)
      ? Te.groupNodesBy(n, 'category', !0)
      : { children: Te.groupNodesBy(n.children, 'category', !0), parent: n.parent };
  }
  getTruncatedChildren(e) {
    let t = !1,
      n = [];
    return (
      e
        .slice()
        .reverse()
        .forEach(l => {
          (!t || l.tabNav) &&
            (l.keepSelectedForChildren === !1
              ? (t = !0)
              : (l.keepSelectedForChildren || l.tabNav) && ((t = !0), (n = []))),
            n.push(l);
        }),
      n.reverse()
    );
  }
  async getLeftNavData(e, t) {
    const n = {};
    if (e.pathData && 1 < e.pathData.length) {
      const l = this.getTruncatedChildren(t.pathData);
      let r = [...l].pop(),
        s;
      (r.keepSelectedForChildren || r.tabNav) && ((s = r), l.pop(), (r = [...l].pop()));
      const o = await this.getChildren(r, t.context),
        c = this.getGroupedChildren(o, e);
      (n.navParent = c.parent || r), (n.context = e.pathData._context), (n.hasCategoriesWithIcon = !1);
      const g = c.children;
      Object.values(g).forEach(h => {
        !n.hasCategoriesWithIcon && h && h.metaInfo && h.metaInfo.icon && (n.hasCategoriesWithIcon = !0);
      }),
        (n.selectedNode = s || r),
        (n.children = g);
    }
    return n;
  }
  getTruncatedChildrenForTabNav(e) {
    const t = [];
    for (let n = 0; n < e.length; n++)
      if ((t.push(e[n]), e[n].tabNav)) {
        n < e.length - 1 && t.push(e[n + 1]);
        break;
      }
    return t;
  }
  async getTabNavData(e, t) {
    const n = {};
    if (e.pathData && 1 < e.pathData.length) {
      let r = [...this.getTruncatedChildrenForTabNav(t.pathData)].pop();
      const s = await this.getChildren(r.tabNav ? r : r.parent, t.context),
        o = this.getGroupedChildren(s, e).children;
      (n.selectedNode = r), (n.selectedNodeForTabNav = r), (n.children = o);
    }
    return n;
  }
  async extractDataFromPath(e) {
    const t = await this.getNavigationPath(re.getConfigValueAsync('navigation.nodes'), e);
    return { nodeObject: pe.getLastNodeObject(t), pathData: t };
  }
  async shouldPreventNavigation(e) {
    return !!(e && ee.isFunction(e.onNodeActivation) && (await e.onNodeActivation(e)) === !1);
  }
}
const Mt = new e2(),
  ul = {
    logout: { label: 'Sign Out', icon: 'log' },
    userSettingsProfileMenuEntry: { label: 'Settings', icon: 'settings' },
    userSettingsDialog: { dialogHeader: 'User Settings', saveBtn: 'Save', dismissBtn: 'Cancel' },
    globalSearchCenteredCancelButton: 'Cancel'
  },
  t2 = { externalLink: { sameWindow: !1 } };
class ur {
  constructor(e) {
    e ? ((this.rendererObject = e), (this.config = e.config || {})) : (this.config = {});
  }
  createCompoundContainer() {
    return document.createElement('div');
  }
  createCompoundItemContainer() {
    return document.createElement('div');
  }
  attachCompoundItem(e, t) {
    e.appendChild(t);
  }
}
class n2 extends ur {
  constructor(e) {
    super(e || { use: {} }),
      e && e.use && e.use.extends && (this.superRenderer = P_({ use: e.use.extends, config: e.config }));
  }
  createCompoundContainer() {
    return this.rendererObject.use.createCompoundContainer
      ? this.rendererObject.use.createCompoundContainer(this.config, this.superRenderer)
      : this.superRenderer
      ? this.superRenderer.createCompoundContainer()
      : super.createCompoundContainer();
  }
  createCompoundItemContainer(e) {
    return this.rendererObject.use.createCompoundItemContainer
      ? this.rendererObject.use.createCompoundItemContainer(e, this.config, this.superRenderer)
      : this.superRenderer
      ? this.superRenderer.createCompoundItemContainer(e)
      : super.createCompoundItemContainer(e);
  }
  attachCompoundItem(e, t) {
    this.rendererObject.use.attachCompoundItem
      ? this.rendererObject.use.attachCompoundItem(e, t, this.superRenderer)
      : this.superRenderer
      ? this.superRenderer.attachCompoundItem(e, t)
      : super.attachCompoundItem(e, t);
  }
}
class i2 extends ur {
  createCompoundContainer() {
    const e = '__lui_compound_' + new Date().getTime(),
      t = document.createElement('div');
    t.classList.add(e);
    let n = '';
    return (
      this.config.layouts &&
        this.config.layouts.forEach(l => {
          if (l.minWidth || l.maxWidth) {
            let r = '@media only screen ';
            l.minWidth != null && (r += `and (min-width: ${l.minWidth}px) `),
              l.maxWidth != null && (r += `and (max-width: ${l.maxWidth}px) `),
              (r += `{
            .${e} {
              grid-template-columns: ${l.columns || 'auto'};
              grid-template-rows: ${l.rows || 'auto'};
              grid-gap: ${l.gap || '0'};
            }
          }
          `),
              (n += r);
          }
        }),
      (t.innerHTML = `
        <style scoped>
          .${e} {
            display: grid;
            grid-template-columns: ${this.config.columns || 'auto'};
            grid-template-rows: ${this.config.rows || 'auto'};
            grid-gap: ${this.config.gap || '0'};
            min-height: ${this.config.minHeight || 'auto'};
          }
          ${n}
        </style>
    `),
      t
    );
  }
  createCompoundItemContainer(e) {
    const t = e || {},
      n = document.createElement('div');
    return n.setAttribute('style', `grid-row: ${t.row || 'auto'}; grid-column: ${t.column || 'auto'}`), n;
  }
}
const P_ = i => {
    const e = i.use;
    if (e) {
      if (e === 'grid') return new i2(i);
      if (e.createCompoundContainer || e.createCompoundItemContainer || e.attachCompoundItem) return new n2(i);
    } else return new ur(i);
    return new ur(i);
  },
  Gf = (i, e, t, n) => {
    e.eventListeners &&
      e.eventListeners.forEach(l => {
        const r = l.source + '.' + l.name,
          s = i[r],
          o = { wcElementId: t, wcElement: n, action: l.action, converter: l.dataConverter };
        s ? s.push(o) : (i[r] = [o]);
      });
  };
class l2 {
  constructor() {}
  dynamicImport(e) {
    return import(/* webpackIgnore: true */ e);
  }
  attachWC(e, t, n, l, r, s) {
    if (n && n.contains(t)) {
      const o = document.createElement(e);
      s && o.setAttribute('nodeId', s), this.initWC(o, e, n, r, l, s), n.replaceChild(o, t);
    }
  }
  initWC(e, t, n, l, r, s) {
    const o = {
      linkManager: window.Luigi.navigation,
      uxManager: window.Luigi.ux,
      getCurrentLocale: () => window.Luigi.i18n().getCurrentLocale(),
      publishEvent: c => {
        n.eventBus && n.eventBus.onPublishEvent(c, s, t);
      },
      getActiveFeatureToggleList: () => window.Luigi.featureToggles().getActiveFeatureToggleList(),
      getActiveFeatureToggles: () => window.Luigi.featureToggles().getActiveFeatureToggleList()
    };
    if (e.__postProcess) {
      const c =
        new URL(document.baseURI).origin === new URL(l, document.baseURI).origin
          ? new URL(l, document.baseURI)
          : new URL('./', l);
      e.__postProcess(r, o, c.origin + c.pathname);
    } else (e.context = r), (e.LuigiClient = o);
  }
  generateWCId(e) {
    let t = '';
    for (let n = 0; n < e.length; n++) t += e.charCodeAt(n).toString(16);
    return 'luigi-wc-' + t;
  }
  registerWCFromUrl(e, t) {
    const n = pe.getI18nViewUrl(e);
    return new Promise((l, r) => {
      this.checkWCUrl(n)
        ? this.dynamicImport(n)
            .then(s => {
              try {
                if (!window.customElements.get(t)) {
                  let o = s.default;
                  if (!HTMLElement.isPrototypeOf(o)) {
                    let c = Object.keys(s);
                    for (let g = 0; g < c.length && ((o = s[c[g]]), !HTMLElement.isPrototypeOf(o)); g++);
                  }
                  window.customElements.define(t, o);
                }
                l();
              } catch (o) {
                r(o);
              }
            })
            .catch(s => r(s))
        : (console.warn(`View URL '${n}' not allowed to be included`), r(`View URL '${n}' not allowed`));
    });
  }
  includeSelfRegisteredWCFromUrl(e, t, n) {
    if (this.checkWCUrl(t)) {
      window.Luigi._registerWebcomponent ||
        (window.Luigi._registerWebcomponent = (r, s) => {
          window.customElements.define(this.generateWCId(r), s);
        });
      let l = document.createElement('script');
      l.setAttribute('src', t),
        e.webcomponent.type === 'module' && l.setAttribute('type', 'module'),
        l.setAttribute('defer', !0),
        l.addEventListener('load', () => {
          n();
        }),
        document.body.appendChild(l);
    } else console.warn(`View URL '${t}' not allowed to be included`);
  }
  checkWCUrl(e) {
    if (e.indexOf('://') > 0 || e.trim().indexOf('//') === 0) {
      if (new URL(e).host === window.location.host) return !0;
      const n = re.getConfigValue('navigation.validWebcomponentUrls');
      if (n && n.length > 0)
        for (let l of n)
          try {
            if (new RegExp(l).test(e)) return !0;
          } catch (r) {
            console.error(r);
          }
      return !1;
    }
    return !0;
  }
  renderWebComponent(e, t, n, l, r) {
    const s = pe.substituteViewUrl(e, { context: n }),
      o = l.webcomponent && l.webcomponent.tagName ? l.webcomponent.tagName : this.generateWCId(s),
      c = document.createElement('div');
    t.appendChild(c),
      (t._luigi_node = l),
      window.customElements.get(o)
        ? this.attachWC(o, c, t, n, s, r)
        : window.luigiWCFn
        ? window.luigiWCFn(s, o, c, () => {
            this.attachWC(o, c, t, n, s, r);
          })
        : l.webcomponent && l.webcomponent.selfRegistered
        ? this.includeSelfRegisteredWCFromUrl(l, s, () => {
            this.attachWC(o, c, t, n, s, r);
          })
        : this.registerWCFromUrl(s, o).then(() => {
            this.attachWC(o, c, t, n, s, r);
          });
  }
  createCompoundContainerAsync(e, t) {
    return new Promise((n, l) => {
      if (e.viewUrl)
        try {
          const r = this.generateWCId(e.viewUrl);
          this.registerWCFromUrl(e.viewUrl, r).then(() => {
            const s = document.createElement(r);
            this.initWC(s, r, s, e.viewUrl, t, '_root'), n(s);
          });
        } catch (r) {
          l(r);
        }
      else n(e.createCompoundContainer());
    });
  }
  renderWebComponentCompound(e, t, n) {
    let l;
    return (
      e.webcomponent && e.viewUrl
        ? ((l = new ur()),
          (l.viewUrl = pe.substituteViewUrl(e.viewUrl, { context: n })),
          (l.createCompoundItemContainer = r => {
            var s = document.createElement('div');
            return r && r.slot && s.setAttribute('slot', r.slot), s;
          }))
        : e.compound.renderer && (l = P_(e.compound.renderer)),
      (l = l || new ur()),
      new Promise(r => {
        this.createCompoundContainerAsync(l, n).then(s => {
          const o = {};
          (s.eventBus = {
            listeners: o,
            onPublishEvent: (c, g, h) => {
              const _ = o[g + '.' + c.type] || [];
              _.push(...(o['*.' + c.type] || [])),
                _.forEach(p => {
                  const m = p.wcElement || s.querySelector('[nodeId=' + p.wcElementId + ']');
                  m
                    ? m.dispatchEvent(
                        new CustomEvent(p.action, { detail: p.converter ? p.converter(c.detail) : c.detail })
                      )
                    : console.debug('Could not find event target', p);
                });
            }
          }),
            e.compound.children.forEach((c, g) => {
              const h = { ...n, ...c.context },
                _ = l.createCompoundItemContainer(c.layoutConfig);
              (_.eventBus = s.eventBus), l.attachCompoundItem(s, _);
              const p = c.id || 'gen_' + g;
              this.renderWebComponent(c.viewUrl, _, h, c, p), Gf(o, c, p);
            }),
            t.appendChild(s),
            Gf(o, e.compound, '_root', s),
            r(s);
        });
      })
    );
  }
}
const oa = new l2();
class r2 {
  getNodePath(e, t) {
    return e ? pe.buildRoute(e, e.pathSegment ? '/' + e.pathSegment : '', t) : '';
  }
  normalizePath(e) {
    const t = e.indexOf('/') === 0;
    let n = new URL(e, 'http://valid.url');
    const l = n.pathname + n.search + n.hash;
    return !t && l.indexOf('/') === 0 ? l.substr(1) : l;
  }
  concatenatePath(e, t) {
    let n = ee.getPathWithoutHash(e);
    return n
      ? (t && (n.endsWith('/') && (n = n.substring(0, n.length - 1)), t.startsWith('/') || (n += '/'), (n += t)), n)
      : t;
  }
  async navigateTo(e, t = {}) {
    const { nodeObject: n } = await Mt.extractDataFromPath(e),
      { keepBrowserHistory: l = !0, navSync: r = !0, preventContextUpdate: s = !1 } = t;
    if ((await Mt.shouldPreventNavigation(n)) || ee.trimLeadingSlash(this.getWindowPath()) === ee.trimLeadingSlash(e))
      return;
    const c = re.getConfigValue('routing.useHashRouting'),
      g = re.getConfigValue('routing.preserveQueryParams');
    let h = new URL(location.href);
    (e = g ? pe.composeSearchParamsToRoute(e) : e), c && (h.hash = e);
    const _ = l ? 'pushState' : 'replaceState',
      p = re.getConfigValue('routing.disableBrowserHistory') ? 'replaceState' : _;
    window.history[p]({ path: c ? h.hash : e }, '', c ? h.hash : e);
    let m;
    if (ee.isIE()) m = new Event('popstate', { bubbles: !0, cancelable: !0 });
    else {
      const v = { detail: { preventContextUpdate: s, withoutSync: !r } };
      m = new CustomEvent('popstate', v);
    }
    window.dispatchEvent(m);
  }
  getWindowPath() {
    return re.getConfigValue('routing.useHashRouting')
      ? ee.getPathWithoutHash(window.location.hash)
      : window.location.pathname.concat(window.location.search);
  }
  buildFromRelativePath(e) {
    let t = this.getWindowPath();
    if (e.parent && e.parent.pathSegment) {
      const n = ee.trimLeadingSlash(this.getNodePath(e.parent)).split('/'),
        l = ee.trimLeadingSlash(t).split('/');
      l.length > n.length && (t = l.slice(0, n.length).join('/'));
    }
    return this.normalizePath(ee.addLeadingSlash(this.concatenatePath(t, e.link)));
  }
  getHashPath(e = window.location.hash) {
    if (e && /\?intent=/i.test(e)) {
      const t = e.replace('#/#', '#'),
        n = pe.getIntentPath(t.split('#')[1]);
      if (n) return n;
    }
    return e.split('#/')[1];
  }
  getModifiedPathname() {
    if (window.location.hash && /\?intent=/i.test(window.location.hash)) {
      const n = window.location.hash.replace('#/#', '').replace('#', ''),
        l = pe.getIntentPath(n);
      return l || '/';
    }
    const e = window.location.search ? window.location.search : '';
    return ((window.history.state && window.history.state.path) || window.location.pathname + e)
      .split('/')
      .slice(1)
      .join('/');
  }
  getCurrentPath() {
    if (/\?intent=/i.test(window.location.hash)) {
      const e = window.location.hash.replace('#/#', '').replace('#', ''),
        t = pe.getIntentPath(e);
      if (t) return Luigi.getConfigValue('routing.replaceIntentRoute') && history.replaceState(window.state, '', t), t;
    }
    return re.getConfigValue('routing.useHashRouting')
      ? window.location.hash.replace('#', '')
      : window.location.search
      ? ee.trimLeadingSlash(window.location.pathname) + window.location.search
      : ee.trimLeadingSlash(window.location.pathname);
  }
  setFeatureToggle(e) {
    const t = re.getConfigValue('settings.featureToggles.queryStringParam');
    t && typeof e == 'string' && pe.setFeatureToggles(t, e);
  }
  shouldSkipRoutingForUrlPatterns() {
    const e = [/access_token=/, /id_token=/];
    return (
      (re.getConfigValue('routing.skipRoutingForUrlPatterns') || e).filter(n => location.href.match(n)).length !== 0
    );
  }
  handleUnsavedChangesModal(e, t, n, l) {
    const r = window.location.href,
      s = t.get().unsavedChanges.persistUrl;
    return (
      s && history.pushState(window.state, '', s),
      t
        .getUnsavedChangesModalPromise()
        .then(
          () => {
            this.resolveUnsavedChanges(e, t, n, l, r);
          },
          () => {}
        )
        .catch(() => {})
    );
  }
  resolveUnsavedChanges(e, t, n, l, r) {
    e && (this.handleRouteChange(e, t, n, l), history.replaceState(window.state, '', r));
  }
  async shouldShowModalPathInUrl() {
    re.getConfigValue('routing.showModalPathInUrl') && (await this.handleBookmarkableModalPath());
  }
  async handleViewUrlMisconfigured(e, t, n, l, r) {
    const { children: s, intendToHaveEmptyViewUrl: o, compound: c } = e,
      g = (s && Array.isArray(s) && s.length > 0) || s || !1;
    if (!c && t.trim() === '' && !g && !o) {
      if (
        (console.warn(
          "The intended target route can't be accessed since it has neither a viewUrl nor children. This is most likely a misconfiguration."
        ),
        !(n && (n.viewUrl || (n.currentNode && n.currentNode.compound))))
      ) {
        const h = await Mt.getNavigationPath(re.getConfigValueAsync('navigation.nodes'), '/'),
          _ = await pe.getDefaultChildNode(h);
        this.showPageNotFoundError(r, _, l), this.navigateTo(_);
      }
      return !0;
    }
    return !1;
  }
  async handlePageNotFound(e, t, n, l, r, s, o) {
    if (!t && !e.compound) {
      const c = await pe.getDefaultChildNode(n, async (g, h) => await Mt.getChildren(g, h));
      if (n.isExistingRoute) {
        const g = ee.getTrimmedUrl(l);
        this.navigateTo(`${g ? `/${g}` : ''}/${c}`, { keepBrowserHistory: !1 }), r.set({ navigationPath: [] });
      } else {
        if (c && n.navigationPath.length > 1)
          return this.showPageNotFoundError(r, ee.trimTrailingSlash(n.matchedPath) + '/' + c, s, !0), !0;
        const g = await Mt.getNavigationPath(re.getConfigValueAsync('navigation.nodes'), '/'),
          h = await pe.getDefaultChildNode(g);
        this.showPageNotFoundError(r, h, s, !1, o);
      }
      return !0;
    }
    return n.isExistingRoute ? !1 : (this.showPageNotFoundError(r, n.matchedPath, s, !0), !0);
  }
  async handleRouteChange(e, t, n, l, r, s = !1) {
    if (e.external) {
      this.navigateToExternalLink({ url: e.url, sameWindow: !e.openInNewTab });
      return;
    }
    if ((this.setFeatureToggle(e), !this.shouldSkipRoutingForUrlPatterns())) {
      if (window.Luigi.preventLoadingModalData) {
        window.Luigi.preventLoadingModalData = !1;
        return;
      }
      try {
        if (t.shouldShowUnsavedChangesModal()) {
          await this.handleUnsavedChangesModal(e, t, n, l);
          return;
        }
        await this.shouldShowModalPathInUrl();
        const o = t.get();
        this.checkInvalidateCache(o, e);
        const c = e && e.length ? ee.getPathWithoutHash(e) : '',
          { nodeObject: g, pathData: h } = await Mt.extractDataFromPath(e),
          _ = g.viewUrl || '';
        if (
          (await this.handleViewUrlMisconfigured(g, _, o, c, t)) ||
          (await this.handlePageNotFound(g, _, h, e, t, c, l))
        )
          return;
        const p = re.getConfigBooleanValue('settings.hideNavigation'),
          m = pe.parseParams(c.split('?')[1]),
          v = pe.getNodeParams(m),
          k = pe.findViewGroup(g),
          y = decodeURIComponent(c.split('?')[1] || ''),
          C = h.navigationPath && h.navigationPath.length > 0 ? h.navigationPath[h.navigationPath.length - 1] : null;
        let T = !1,
          N = C;
        for (; N; ) {
          if (N.tabNav === !0) {
            T = !0;
            break;
          } else if (N.tabNav === !1) {
            T = !1;
            break;
          } else if (ee.isObject(N.tabNav))
            if ('hideTabNavAutomatically' in N.tabNav && N.children)
              if (N.tabNav.hideTabNavAutomatically === !0 && N.children.length === 1) {
                T = !1;
                break;
              } else {
                T = !0;
                break;
              }
            else console.warn('tabNav:{hideTabNavAutomatically:true|false} is not configured correctly.');
          N = N.parent;
        }
        let D = C,
          I = g.hideSideNav;
        if (I === void 0)
          for (; D; ) {
            if (D.tabNav && D.hideSideNav === !0) {
              I = !0;
              break;
            }
            if (D.hideSideNav === !1) {
              I = !1;
              break;
            }
            D = D.parent;
          }
        const L = pe.substituteDynamicParamsInObject(Object.assign({}, h.context, C.context), h.pathParams);
        h.navigationPath._context = L;
        const M = {
          hideNav: p,
          viewUrl: _,
          nodeParams: v,
          viewGroup: k,
          urlParamsRaw: y,
          currentNode: C,
          navigationPath: h.navigationPath,
          context: L,
          pathParams: h.pathParams,
          hideSideNav: I || !1,
          isolateView: g.isolateView || !1,
          tabNav: T
        };
        t.set(
          Object.assign({}, M, {
            previousNodeValues: o ? { viewUrl: o.viewUrl, isolateView: o.isolateView, viewGroup: o.viewGroup } : {}
          })
        );
        let F = document.getElementsByClassName('iframeContainer')[0];
        if (
          (F &&
            (T
              ? F.classList.add('iframeContainerTabNav')
              : F.classList.contains('iframeContainerTabNav') && F.classList.remove('iframeContainerTabNav')),
          g.compound)
        )
          Qn.switchActiveIframe(n, void 0, !1),
            F && F.classList.add('lui-webComponent'),
            this.navigateWebComponentCompound(t, g);
        else if (g.webcomponent)
          Qn.switchActiveIframe(n, void 0, !1),
            F && F.classList.add('lui-webComponent'),
            this.navigateWebComponent(t, g);
        else if ((F && F.classList.remove('lui-webComponent'), !s))
          if (!r) await Qn.navigateIframe(l, t, n);
          else {
            const O = t.get(),
              j = await t.prepareInternalData(l);
            Ie.sendMessageToIframe(l.iframe, {
              msg: 'luigi.navigate',
              viewUrl: _,
              context: JSON.stringify(O.context),
              nodeParams: JSON.stringify(O.nodeParams),
              pathParams: JSON.stringify(O.pathParams),
              searchParams: JSON.stringify(pe.prepareSearchParamsForClient(l.iframe.luigi.currentNode)),
              internal: JSON.stringify(j),
              withoutSync: !0
            });
          }
        Mt.onNodeChange(o.currentNode, C);
      } catch (o) {
        console.info('Could not handle route change', o);
      }
    }
  }
  async handleBookmarkableModalPath() {
    const e = pe.getModalPathFromPath();
    if (e) {
      const t = pe.getModalParamsFromPath(),
        { nodeObject: n } = await Mt.extractDataFromPath(e);
      C_.openAsModal(e, n.openNodeInModal || t);
    }
  }
  checkInvalidateCache(e, t) {
    let n = t.split('/');
    if (e.navigationPath && e.navigationPath.length > 0) {
      let l = e.navigationPath.slice(1),
        r = !0;
      for (let s = 0; s < l.length; s++) {
        let o = n.length > s ? n[s] : void 0,
          c = l[s];
        if (o !== c.pathSegment || !r)
          if (pe.isDynamicNode(c)) {
            if (!r || o !== pe.getDynamicNodeValue(c, e.pathParams)) {
              Vn.deleteNodesRecursively(c);
              break;
            }
          } else r = !1;
      }
    } else Vn.deleteCache();
  }
  handleRouteClick(e, t) {
    const n = pe.getRouteLink(e, t.get().pathParams);
    if (e.externalLink && e.externalLink.url) this.navigateToExternalLink(n, e, t.get().pathParams);
    else if (e.link) this.navigateTo(n);
    else if (ee.trimLeadingSlash(this.getWindowPath()) === ee.trimLeadingSlash(n)) {
      const r = Ie.getIframeContainer(),
        s = Qn.getActiveIframe(r);
      s && s.vg && Qn.canCache(s.vg)
        ? (Qn.switchActiveIframe(Ie.getIframeContainer(), void 0, !1),
          setTimeout(() => {
            Qn.switchActiveIframe(Ie.getIframeContainer(), s, !1), window.postMessage({ msg: 'refreshRoute' }, '*');
          }))
        : (s && r.removeChild(s), window.postMessage({ msg: 'refreshRoute' }, '*'));
    } else this.navigateTo(n);
  }
  async showPageNotFoundError(e, t, n, l = !1, r = {}) {
    const s = pe.getPageNotFoundRedirectResult(n, l),
      o = s.path;
    if (o) {
      s.keepURL ? this.handleRouteChange(o, e, Ie.getIframeContainer(), r) : this.navigateTo(o);
      return;
    }
    pe.showRouteNotFoundAlert(e, n, l), this.navigateTo(ee.addLeadingSlash(t));
  }
  navigateToLink(e) {
    e.externalLink && e.externalLink.url ? this.navigateToExternalLink(e.externalLink) : this.navigateTo(e.link);
  }
  navigateToExternalLink(e, t, n) {
    const l = { ...t2.externalLink, ...e };
    t && (l.url = pe.calculateNodeHref(t, n)), window.open(l.url, l.sameWindow ? '_self' : '_blank').focus();
  }
  navigateWebComponent(e, t) {
    const n = this.removeLastChildFromWCContainer();
    if (!n) return;
    const l = e.get();
    oa.renderWebComponent(l.viewUrl, n, l.context, t);
  }
  navigateWebComponentCompound(e, t) {
    const n = this.removeLastChildFromWCContainer();
    if (!n) return;
    const l = e.get(),
      { compound: r } = t;
    r && r.children && (r.children = r.children.filter(s => Te.checkVisibleForFeatureToggles(s))),
      oa.renderWebComponentCompound(t, n, l.context);
  }
  removeLastChildFromWCContainer() {
    const e = document.querySelector('.wcContainer');
    if (!!e) {
      for (; e.lastChild; ) e.lastChild.remove();
      return e;
    }
  }
  updateModalDataInUrl(e, t, n) {
    let l = pe.getHashQueryParamSeparator();
    const r = pe.getQueryParams(),
      s = pe.getModalViewParamName();
    (r[s] = e), t && Object.keys(t).length && (r[`${s}Params`] = JSON.stringify(t));
    const o = new URL(location.href);
    if (re.getConfigBooleanValue('routing.useHashRouting')) {
      const g = location.hash.indexOf(l);
      g !== -1 && (o.hash = o.hash.slice(0, g)), (o.hash = `${o.hash}${l}${pe.encodeParams(r)}`);
    } else o.search = `?${pe.encodeParams(r)}`;
    n ? history.pushState(window.state, '', o.href) : history.replaceState(window.state, '', o.href);
  }
  appendModalDataToUrl(e, t) {
    let n = pe.getHashQueryParamSeparator();
    const l = pe.getQueryParams(),
      r = pe.getModalViewParamName(),
      s = l[r],
      o = new URL(location.href),
      c = re.getConfigBooleanValue('routing.useHashRouting');
    let g = history.state,
      h,
      _;
    if (c) {
      let [p, m] = o.hash.split('?');
      (h = p), (_ = pe.getURLWithoutModalData(m, r)), _ && (h += '?' + _);
    } else
      (h = o.pathname),
        (_ = pe.getURLWithoutModalData(o.search, r)),
        _ && (h += '?' + pe.getURLWithoutModalData(o.search, r));
    if (((g = pe.handleHistoryState(g, h)), s !== e)) {
      if (((l[r] = e), t && Object.keys(t).length && (l[`${r}Params`] = JSON.stringify(t)), c)) {
        const p = location.hash.indexOf(n);
        p !== -1 && (o.hash = o.hash.slice(0, p)), (o.hash = `${o.hash}${n}${pe.encodeParams(l)}`);
      } else o.search = `?${pe.encodeParams(l)}`;
      history.pushState(g, '', o.href);
    } else {
      const p = new URL(o);
      if (c) {
        let m = p.hash.split('?')[0];
        (p.hash = m), _ && (p.hash += '?' + _);
      } else p.search = _;
      history.replaceState({}, '', p.href), history.pushState(g, '', o.href);
    }
  }
  removeModalDataFromUrl(e) {
    const t = pe.getQueryParams(),
      n = pe.getModalViewParamName();
    let l = new URL(location.href);
    if (re.getConfigBooleanValue('routing.useHashRouting')) {
      let s = {};
      t[n] && (s[n] = t[n]), t[`${n}Params`] && (s[`${n}Params`] = t[`${n}Params`]);
      let o = pe.encodeParams(s);
      l.hash.includes(`?${o}`)
        ? (l.hash = l.hash.replace(`?${o}`, ''))
        : l.hash.includes(`&${o}`) && (l.hash = l.hash.replace(`&${o}`, ''));
    } else {
      let s = new URLSearchParams(l.search.slice(1));
      s.delete(n), s.delete(`${n}Params`);
      let o = '';
      Array.from(s.keys()).forEach(c => {
        o += (o === '' ? '?' : '&') + c + '=' + s.get(c);
      }),
        (l.search = o);
    }
    if (history.state && history.state.modalHistoryLength >= 0 && e) {
      history.state.modalHistoryLength;
      const s = history.state.pathBeforeHistory;
      let o = !1;
      if (
        (window.addEventListener(
          'popstate',
          c => {
            o
              ? (history.replaceState({}, '', s), history.pushState({}, '', s), history.back())
              : (history.pushState({}, '', s), history.back());
          },
          { once: !0 }
        ),
        history.state.historygap === history.length - history.state.modalHistoryLength)
      )
        history.go(-history.state.modalHistoryLength);
      else if (history.state.modalHistoryLength > history.length) {
        const c = history.length - 1;
        (o = !0), history.go(-c), (window.Luigi.preventLoadingModalData = !0);
      } else {
        const c = history.state.modalHistoryLength;
        history.go(-c);
      }
    } else history.pushState({}, '', l.href);
  }
}
const it = new r2();
class s2 {
  constructor() {
    this.splitViewValues,
      (this.internalValues = {
        innerHeight: null,
        rightContentHeight: null,
        thresholdTop: null,
        thresholdBottom: null,
        m_pos_prev: null
      });
  }
  getContainer() {
    return document.getElementById('splitViewContainer');
  }
  getDragger() {
    return document.getElementById('splitViewDragger');
  }
  getDraggerButton() {
    return document.querySelector('#splitViewDragger>.lui-collapse-btn');
  }
  getCollapsedDraggerButton() {
    return document.querySelector('#splitViewDraggerCollapsed>.lui-collapse-btn');
  }
  getDraggerBackdrop() {
    return document.getElementById('splitViewDraggerBackdrop');
  }
  getDefaultData() {
    return { mfSplitView: { displayed: !1, settings: {} } };
  }
  setIframe(e, t, n) {
    e && (e = pe.substituteViewUrl(e, t));
    const l = Ie.createIframe(e, void 0, n.get().lastNode, 'split-view', t);
    return document.querySelector('.iframeSplitViewCnt').appendChild(l), l;
  }
  async prepareSplitViewData(e, t) {
    const n = t && t.length ? ee.getPathWithoutHash(t) : '',
      l = await Mt.getNavigationPath(re.getConfigValueAsync('navigation.nodes'), t),
      r = pe.parseParams(n.split('?')[1]),
      s = pe.getNodeParams(r),
      o = pe.getLastNodeObject(l),
      c = e.get().splitViewSettings;
    c.title || (c.title = o.label);
    const g = c.collapsed || !1;
    e.set({ splitViewSettings: c, lastNode: o, pathData: l, nodeParams: s, collapsed: g, isDataPrepared: !0 });
  }
  createAndSetView(e) {
    const { nodeParams: t, lastNode: n, pathData: l } = e.get();
    if (n.webcomponent) {
      oa.renderWebComponent(n.viewUrl, document.querySelector('.iframeSplitViewCnt'), l.context, n);
      const r = {
        splitViewWC: document.querySelector('.iframeSplitViewCnt'),
        splitViewWCData: { ...l, nodeParams: t }
      };
      e.set(r), e.dispatch('wcCreated', { ...r, collapsed: !1 });
      const s = document.querySelector('.wcContainer');
      if (s && s.childElementCount) {
        const o = document.getElementsByClassName('iframeContainer')[0];
        o && o.classList.add('lui-webComponent');
      }
    } else {
      const s = {
        splitViewIframe: this.setIframe(n.viewUrl, { context: l.context, pathParams: l.pathParams, nodeParams: t }, e),
        splitViewIframeData: { ...l, nodeParams: t }
      };
      e.set(s), e.dispatch('iframeCreated', { ...s, collapsed: !1 });
    }
    this.fixIOSscroll();
  }
  fixIOSscroll() {
    if (!(!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform))) return;
    const t = document.querySelector('.iframeSplitViewCnt iframe');
    t &&
      t.addEventListener('load', () => {
        (document.querySelector('.iframeSplitViewCnt').style.overflow = 'hidden'),
          setTimeout(() => {
            document.querySelector('.iframeSplitViewCnt').style.overflow = 'auto';
          });
      });
  }
  calculateInitialValues(e, t) {
    if (t) {
      const n = e || 40,
        l = parseInt(ee.computePxFromPercent(t, n)),
        r = e ? 100 - e : 60,
        s = parseInt(ee.computePxFromPercent(t, r));
      return { percent: n, bottom: l, top: s };
    }
  }
  calculateAndSetSplitViewValues(e, t) {
    const n = parseInt(ee.computePxFromPercent(t.rightContentHeight, 100 - e)) + Mn.getShellbar().clientHeight;
    this.splitViewValues = this.enforceTresholds(n, t.innerHeight - n, t);
  }
  enforceTresholds(e, t) {
    const n = this.internalValues;
    return (
      e <= n.thresholdTop
        ? ((e = n.thresholdTop), (t = n.innerHeight - n.thresholdTop))
        : t <= n.thresholdBottom && ((e = n.innerHeight - n.thresholdBottom), (t = n.thresholdBottom)),
      { top: e, bottom: t, percent: ee.computePercentFromPx(n.rightContentHeight, t) }
    );
  }
  open(e, t, n) {
    const l = { displayed: !0, collapsed: n.collapsed === !0, nodepath: t, settings: n };
    (this.splitViewValues = this.calculateInitialValues(l.settings && l.settings.size, ee.getContentAreaHeight())),
      this.sendMessageToClients('internal', { exists: !0, size: this.splitViewValues.percent, collapsed: l.collapsed }),
      e.set({ mfSplitView: l, splitViewValues: this.splitViewValues });
  }
  close(e) {
    e.get().splitViewIframe || e.get().splitViewWC
      ? e
          .getUnsavedChangesModalPromise(
            e.get().splitViewWC ? e.get().splitViewWC : e.get().splitViewIframe.contentWindow
          )
          .then(() => {
            e.get().mfSplitView &&
              ((e.get().mfSplitView.displayed = !1),
              (e.get().mfSplitView.collapsed = !1),
              e.set({ mfSplitView: e.get().mfSplitView })),
              e.dispatch('statusChanged', { displayed: !1 }),
              (Ie.getIframeContainer().style.marginBottom = ''),
              at.sendMessageToClients('close.ok');
          })
      : e.get().mfSplitView.displayed &&
        ((e.get().mfSplitView.displayed = !1), e.set({ mfSplitView: e.get().mfSplitView }));
  }
  async expand(e) {
    this.sendMessageToClients('internal', { exists: !0, size: this.splitViewValues.percent, collapsed: !1 }),
      this.sendMessageToClients('expand.ok'),
      e.dispatch('statusChanged', { displayed: !0, collapsed: !1 }),
      (this.getContainer().style.top = `${this.splitViewValues.top}px`),
      (Ie.getIframeContainer().style.marginBottom = `${this.splitViewValues.bottom}px`),
      setTimeout(() => {
        this.getDragger().style.top = `${this.splitViewValues.top}px`;
      });
  }
  collapse(e) {
    (e.get().splitViewIframe || e.get().splitViewWC) &&
      e
        .getUnsavedChangesModalPromise(
          e.get().splitViewWC ? e.get().splitViewWC : e.get().splitViewIframe.contentWindow
        )
        .then(() => {
          this.sendMessageToClients('internal', { exists: !0, size: this.splitViewValues.percent, collapsed: !0 }),
            this.sendMessageToClients('collapse.ok'),
            e.dispatch('statusChanged', { displayed: !0, collapsed: !0 }),
            (this.getContainer().style.top = ''),
            (Ie.getIframeContainer().style.marginBottom = '');
        });
  }
  sendMessageToClients(e, t) {
    Ie.sendMessageToVisibleIframes({ msg: `luigi.navigation.splitview.${e}`, data: t });
  }
}
const at = new s2();
class a2 {
  luigiAfterInit() {
    re.getConfigBooleanValue('settings.appLoadingIndicator.hideAutomatically') &&
      setTimeout(() => {
        Xr.hideAppLoadingIndicator();
      }, 0);
  }
}
const o2 = new a2();
class u2 {
  constructor() {
    (this._defaultStorage = 'localStorage'),
      (this._authKey = 'luigi.auth'),
      (this._newlyAuthorizedKey = 'luigi.newlyAuthorized'),
      (this._invalidStorageMsg =
        'Configuration Error: Invalid auth.storage value defined. Must be one of localStorage, sessionStorage or none.');
  }
  getStorageKey() {
    return this._authKey;
  }
  getStorageType() {
    return (
      this._storageType || (this._storageType = re.getConfigValue('auth.storage') || this._defaultStorage),
      this._storageType
    );
  }
  getAuthData() {
    return this._getStore(this.getStorageKey());
  }
  setAuthData(e) {
    this._setStore(this.getStorageKey(), e);
  }
  removeAuthData() {
    this._setStore(this.getStorageKey(), void 0);
  }
  isNewlyAuthorized() {
    return !!this._getStore(this._newlyAuthorizedKey);
  }
  setNewlyAuthorized() {
    this._setStore(this._newlyAuthorizedKey, !0);
  }
  removeNewlyAuthorized() {
    this._setStore(this._newlyAuthorizedKey, void 0);
  }
  _setStore(e, t) {
    switch (this.getStorageType()) {
      case 'localStorage':
      case 'sessionStorage':
        t !== void 0
          ? window[this.getStorageType()].setItem(e, JSON.stringify(t))
          : window[this.getStorageType()].removeItem(e);
        break;
      case 'none':
        this[e] = t;
        break;
      default:
        console.error(this._invalidStorageMsg);
    }
  }
  _getStore(e) {
    try {
      switch (this.getStorageType()) {
        case 'localStorage':
        case 'sessionStorage':
          return JSON.parse(window[this.getStorageType()].getItem(e));
        case 'none':
          return this[e];
        default:
          console.error(this._invalidStorageMsg);
      }
    } catch {
      console.warn('Error parsing authorization data. Auto-logout might not work!');
    }
  }
}
const ii = new u2();
class f2 {
  constructor() {
    return (this._userInfoStore = or({})), (this._loggedInStore = or(!1)), this;
  }
  setUserInfo(e) {
    this._userInfoStore.set(e);
  }
  setLoggedIn(e) {
    this._loggedInStore.set(e);
  }
  getUserInfoStore() {
    return this._userInfoStore;
  }
  getLoggedInStore() {
    return this._loggedInStore;
  }
  setProfileLogoutFn(e) {
    this._profileLogoutFn = e;
  }
  async init() {
    const e = re.getConfigValue('auth.use');
    if (!e) return Promise.resolve(!0);
    const t = re.getConfigValue(`auth.${e}`),
      n = al.parseUrlAuthErrors() || {};
    if (!!(await al.handleUrlAuthErrors(t, n.error, n.errorDescription)))
      return (
        (this.idpProviderInstance = this.getIdpProviderInstance(e, t)),
        ee.isPromise(this.idpProviderInstance)
          ? this.idpProviderInstance
              .then(r => ((this.idpProviderInstance = r), this.checkAuth(t)))
              .catch(r => {
                const s = `Error: ${r.message || r}`;
                console.error(s, r.message && r), re.setErrorMessage(s);
              })
          : this.checkAuth(t)
      );
  }
  async checkAuth(e) {
    const t = al.getStoredAuthData();
    if (!t || !al.isLoggedIn()) {
      if (re.getConfigValue('auth.disableAutoLogin')) return;
      let l = !0;
      return t && (l = await gi.handleAuthEvent('onAuthExpired', e)), l ? this.startAuthorization() : void 0;
    }
    this.idpProviderInstance.settings && ee.isFunction(this.idpProviderInstance.settings.userInfoFn)
      ? this.idpProviderInstance.settings.userInfoFn(this.idpProviderInstance.settings, t).then(l => {
          this.setUserInfo(l), this.setLoggedIn(!0);
        })
      : ee.isFunction(this.idpProviderInstance.userInfo)
      ? this.idpProviderInstance.userInfo(e).then(l => {
          this.setUserInfo(l), this.setLoggedIn(!0);
        })
      : (this.setLoggedIn(!0), this.setUserInfo(rl(this._userInfoStore))),
      ee.isFunction(re.getConfigValue('auth.events.onAuthSuccessful')) &&
        ii.isNewlyAuthorized() &&
        (await gi.handleAuthEvent('onAuthSuccessful', e, t)),
      ii.removeNewlyAuthorized(),
      ee.isFunction(this.idpProviderInstance.setTokenExpirationAction) &&
        this.idpProviderInstance.setTokenExpirationAction(),
      ee.isFunction(this.idpProviderInstance.setTokenExpireSoonAction) &&
        this.idpProviderInstance.setTokenExpireSoonAction();
  }
  async startAuthorization() {
    if (this.idpProviderInstance)
      return this.idpProviderInstance.login().then(e => {
        ii.setNewlyAuthorized(), e && console.error(e);
      });
  }
  logout() {
    const e = al.getStoredAuthData(),
      t = async l => {
        await gi.handleAuthEvent('onLogout', this.idpProviderInstance.settings, void 0, l), ii.removeAuthData();
      },
      n = re.getConfigValue(`auth.${re.getConfigValue('auth.use')}.logoutFn`);
    ee.isFunction(n)
      ? n(this.idpProviderInstance.settings, e, t)
      : ee.isFunction(this.idpProviderInstance.logout)
      ? this.idpProviderInstance.logout(e, t)
      : this._profileLogoutFn
      ? this._profileLogoutFn(e, t)
      : t(this.idpProviderInstance.settings.logoutUrl);
  }
  IdpProviderException(e) {
    return { message: e, name: 'IdpProviderException' };
  }
  async getIdpProviderInstance(e, t) {
    const n = ee.getConfigValueFromObject(t, 'idpProvider');
    if (n) {
      const r = await new n(t);
      return (
        ['login'].forEach(s => {
          if (!ee.isFunction(r[s]))
            throw this.IdpProviderException(`${s} function does not exist in custom IDP Provider ${e}`);
        }),
        r
      );
    }
    if (ee.isFunction(re.getConfigValue('auth.events.onAuthConfigError')))
      await gi.handleAuthEvent('onAuthConfigError', { idpProviderName: e, type: 'IdpProviderException' });
    else throw this.IdpProviderException(`IDP Provider ${e} does not exist.`);
  }
  unload() {
    this.idpProviderInstance && ee.isFunction(this.idpProviderInstance.unload) && this.idpProviderInstance.unload();
  }
}
const en = new f2();
class c2 {
  constructor() {
    this.decorators = [];
  }
  hasDecorators() {
    return this.decorators.length > 0;
  }
  add(e) {
    this.decorators = this.decorators.filter(t => t.uid !== e.uid).concat(e);
  }
  applyDecorators(e, t) {
    if (!e) return e;
    const n = new URL(ee.prependOrigin(e)),
      l = this.decorators.filter(r => r.type === 'queryString');
    for (let r = 0; r < l.length; r++) {
      const s = l[r];
      n.searchParams.has(s.key) && n.searchParams.delete(s.key);
      const o = s.valueFn();
      n.searchParams.append(s.key, o);
    }
    return t && (n.search = decodeURIComponent(n.search)), n.href;
  }
}
const Zr = new c2();
class d2 {
  getStoredAuthData() {
    return ii.getAuthData();
  }
  isLoggedIn() {
    const e = this.getStoredAuthData();
    return e && (() => e.accessTokenExpirationDate > Number(new Date()))();
  }
  parseUrlAuthErrors() {
    const e = ee.getUrlParameter('error'),
      t = ee.getUrlParameter('errorDescription');
    if (e) return { error: e, errorDescription: t };
  }
  async handleUrlAuthErrors(e, t, n) {
    return t
      ? await gi.handleAuthEvent(
          'onAuthError',
          e,
          { error: t, errorDescription: n },
          e.logoutUrl +
            '?post_logout_redirect_uri=' +
            e.post_logout_redirect_uri +
            '&error=' +
            t +
            '&errorDescription=' +
            n
        )
      : !0;
  }
}
const al = new d2();
class h2 {
  sanitizeHtml(e = '') {
    return e
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/javascript:/g, '');
  }
  restoreSanitizedBrs(e = '') {
    return e
      .replace(/&lt;br\/&gt;/g, '<br>')
      .replace(/&lt;br \/&gt;/g, '<br>')
      .replace(/&lt;br&gt;/g, '<br>')
      .replace(/&lt;br &gt;/g, '<br>');
  }
  restoreSanitizedElements(e = '') {
    let t = e;
    const n = ['i', 'b', 'br', 'mark', 'strong', 'em', 'small', 'del', 'ins', 'sub', 'sup'];
    for (let l = 0; l < n.length; l++) {
      const r = new RegExp(`&lt;${n[l]}/&gt;`, 'g'),
        s = new RegExp(`&lt;${n[l]} /&gt;`, 'g'),
        o = new RegExp(`&lt;${n[l]}&gt;`, 'g'),
        c = new RegExp(`&lt;${n[l]} &gt;`, 'g'),
        g = new RegExp(`&lt;/${n[l]}[/]&gt;`, 'g'),
        h = new RegExp(`&lt;/${n[l]} [/]&gt;`, 'g'),
        _ = new RegExp(`&lt;[/]${n[l]}&gt;`, 'g'),
        p = new RegExp(`&lt;[/]${n[l]} &gt;`, 'g');
      t = t
        .replace(r, `<${n[l]}>`)
        .replace(s, `<${n[l]}>`)
        .replace(o, `<${n[l]}>`)
        .replace(c, `<${n[l]}>`)
        .replace(g, `</${n[l]}>`)
        .replace(h, `</${n[l]}>`)
        .replace(_, `</${n[l]}>`)
        .replace(p, `</${n[l]}>`);
    }
    return t;
  }
  sanatizeHtmlExceptTextFormatting(e = '') {
    return this.restoreSanitizedElements(this.sanitizeHtml(e));
  }
  sanitizeParam(e = '') {
    return String(e)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\//g, '&sol;');
  }
  escapeKeyForRegexp(e = '') {
    return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }
  processTextAndLinks(e = '', t, n) {
    let r = { sanitizedText: this.restoreSanitizedBrs(this.sanitizeHtml(e)), links: [] };
    return t
      ? Object.entries(t).reduce((s, [o, c]) => {
          const g = `_luigi_alert_${n}_link_${this.sanitizeParam(o)}`,
            h = this.restoreSanitizedBrs(this.sanitizeHtml(c.text)),
            _ = `<a id="${g}">${h}</a>`,
            p = this.escapeKeyForRegexp(o),
            m = new RegExp(`({${p}})`, 'g');
          return {
            sanitizedText: s.sanitizedText.replace(m, _),
            links: s.links.concat({
              elemId: g,
              url: c.url ? encodeURI(this.sanitizeHtml(c.url)) : void 0,
              dismissKey: c.dismissKey ? encodeURI(this.sanitizeHtml(c.dismissKey)) : void 0
            })
          };
        }, r)
      : r;
  }
}
const fr = new h2();
var Yr =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : typeof self < 'u'
      ? self
      : {},
  cr = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ (function(i, e) {
  (function() {
    var t,
      n = '4.17.21',
      l = 200,
      r = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
      s = 'Expected a function',
      o = 'Invalid `variable` option passed into `_.template`',
      c = '__lodash_hash_undefined__',
      g = 500,
      h = '__lodash_placeholder__',
      _ = 1,
      p = 2,
      m = 4,
      v = 1,
      k = 2,
      y = 1,
      C = 2,
      T = 4,
      N = 8,
      D = 16,
      I = 32,
      L = 64,
      M = 128,
      F = 256,
      O = 512,
      j = 30,
      fe = '...',
      X = 800,
      Q = 16,
      ce = 1,
      Ce = 2,
      H = 3,
      ae = 1 / 0,
      $ = 9007199254740991,
      K = 17976931348623157e292,
      le = 0 / 0,
      ve = 4294967295,
      ue = ve - 1,
      x = ve >>> 1,
      be = [
        ['ary', M],
        ['bind', y],
        ['bindKey', C],
        ['curry', N],
        ['curryRight', D],
        ['flip', O],
        ['partial', I],
        ['partialRight', L],
        ['rearg', F]
      ],
      ke = '[object Arguments]',
      we = '[object Array]',
      ie = '[object AsyncFunction]',
      Re = '[object Boolean]',
      Le = '[object Date]',
      _e = '[object DOMException]',
      tt = '[object Error]',
      Ft = '[object Function]',
      Jt = '[object GeneratorFunction]',
      Rt = '[object Map]',
      Un = '[object Number]',
      Bi = '[object Null]',
      zt = '[object Object]',
      bi = '[object Promise]',
      Wi = '[object Proxy]',
      $t = '[object RegExp]',
      jt = '[object Set]',
      Xn = '[object String]',
      dt = '[object Symbol]',
      dn = '[object Undefined]',
      $n = '[object WeakMap]',
      tn = '[object WeakSet]',
      nn = '[object ArrayBuffer]',
      Bn = '[object DataView]',
      vi = '[object Float32Array]',
      ln = '[object Float64Array]',
      te = '[object Int8Array]',
      Ve = '[object Int16Array]',
      gt = '[object Int32Array]',
      yt = '[object Uint8Array]',
      Pt = '[object Uint8ClampedArray]',
      wt = '[object Uint16Array]',
      an = '[object Uint32Array]',
      Nn = /\b__p \+= '';/g,
      ri = /\b(__p \+=) '' \+/g,
      Hi = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
      cl = /&(?:amp|lt|gt|quot|#39);/g,
      wi = /[&<>"']/g,
      hr = RegExp(cl.source),
      gr = RegExp(wi.source),
      _r = /<%-([\s\S]+?)%>/g,
      pr = /<%([\s\S]+?)%>/g,
      El = /<%=([\s\S]+?)%>/g,
      mr = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      br = /^\w*$/,
      vr = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      ki = /[\\^$.*+?()[\]{}|]/g,
      zi = RegExp(ki.source),
      Si = /^\s+/,
      qi = /\s/,
      Dl = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      Vl = /\{\n\/\* \[wrapped with (.+)\] \*/,
      Ml = /,? & /,
      wr = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
      mn = /[()=,{}\[\]\/\s]/,
      dl = /\\(\\)?/g,
      hl = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      gl = /\w*$/,
      kr = /^[-+]0x[0-9a-f]+$/i,
      Gi = /^0b[01]+$/i,
      _l = /^\[object .+?Constructor\]$/,
      pl = /^0o[0-7]+$/i,
      ml = /^(?:0|[1-9]\d*)$/,
      Ol = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
      Ci = /($^)/,
      St = /['\n\r\u2028\u2029\\]/g,
      si = '\\ud800-\\udfff',
      bl = '\\u0300-\\u036f',
      Fl = '\\ufe20-\\ufe2f',
      Ul = '\\u20d0-\\u20ff',
      ai = bl + Fl + Ul,
      Ut = '\\u2700-\\u27bf',
      yi = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      J = '\\xac\\xb1\\xd7\\xf7',
      Et = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      on = '\\u2000-\\u206f',
      Pi =
        ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      es = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      ts = '\\ufe0e\\ufe0f',
      Bl = J + Et + on + Pi,
      Sr = "['\u2019]",
      _a = '[' + si + ']',
      ns = '[' + Bl + ']',
      Wl = '[' + ai + ']',
      is = '\\d+',
      ls = '[' + Ut + ']',
      Cr = '[' + yi + ']',
      rs = '[^' + si + Bl + is + Ut + yi + es + ']',
      yr = '\\ud83c[\\udffb-\\udfff]',
      pa = '(?:' + Wl + '|' + yr + ')',
      ss = '[^' + si + ']',
      Pr = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      Nr = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      Ki = '[' + es + ']',
      as = '\\u200d',
      os = '(?:' + Cr + '|' + rs + ')',
      ma = '(?:' + Ki + '|' + rs + ')',
      us = '(?:' + Sr + '(?:d|ll|m|re|s|t|ve))?',
      fs = '(?:' + Sr + '(?:D|LL|M|RE|S|T|VE))?',
      cs = pa + '?',
      U = '[' + ts + ']?',
      oe = '(?:' + as + '(?:' + [ss, Pr, Nr].join('|') + ')' + U + cs + ')*',
      Me = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
      je = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      Fe = U + cs + oe,
      Se = '(?:' + [ls, Pr, Nr].join('|') + ')' + Fe,
      Oe = '(?:' + [ss + Wl + '?', Wl, Pr, Nr, _a].join('|') + ')',
      _t = RegExp(Sr, 'g'),
      Dt = RegExp(Wl, 'g'),
      vl = RegExp(yr + '(?=' + yr + ')|' + Oe + Fe, 'g'),
      Ji = RegExp(
        [
          Ki + '?' + Cr + '+' + us + '(?=' + [ns, Ki, '$'].join('|') + ')',
          ma + '+' + fs + '(?=' + [ns, Ki + os, '$'].join('|') + ')',
          Ki + '?' + os + '+' + us,
          Ki + '+' + fs,
          je,
          Me,
          is,
          Se
        ].join('|'),
        'g'
      ),
      Ir = RegExp('[' + as + si + ai + ts + ']'),
      ji = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
      Tr = [
        'Array',
        'Buffer',
        'DataView',
        'Date',
        'Error',
        'Float32Array',
        'Float64Array',
        'Function',
        'Int8Array',
        'Int16Array',
        'Int32Array',
        'Map',
        'Math',
        'Object',
        'Promise',
        'RegExp',
        'Set',
        'String',
        'Symbol',
        'TypeError',
        'Uint8Array',
        'Uint8ClampedArray',
        'Uint16Array',
        'Uint32Array',
        'WeakMap',
        '_',
        'clearTimeout',
        'isFinite',
        'parseInt',
        'setTimeout'
      ],
      qe = -1,
      Ke = {};
    (Ke[vi] = Ke[ln] = Ke[te] = Ke[Ve] = Ke[gt] = Ke[yt] = Ke[Pt] = Ke[wt] = Ke[an] = !0),
      (Ke[ke] = Ke[we] = Ke[nn] = Ke[Re] = Ke[Bn] = Ke[Le] = Ke[tt] = Ke[Ft] = Ke[Rt] = Ke[Un] = Ke[zt] = Ke[$t] = Ke[
        jt
      ] = Ke[Xn] = Ke[$n] = !1);
    var Xe = {};
    (Xe[ke] = Xe[we] = Xe[nn] = Xe[Bn] = Xe[Re] = Xe[Le] = Xe[vi] = Xe[ln] = Xe[te] = Xe[Ve] = Xe[gt] = Xe[Rt] = Xe[
      Un
    ] = Xe[zt] = Xe[$t] = Xe[jt] = Xe[Xn] = Xe[dt] = Xe[yt] = Xe[Pt] = Xe[wt] = Xe[an] = !0),
      (Xe[tt] = Xe[Ft] = Xe[$n] = !1);
    var Wn = {
        À: 'A',
        Á: 'A',
        Â: 'A',
        Ã: 'A',
        Ä: 'A',
        Å: 'A',
        à: 'a',
        á: 'a',
        â: 'a',
        ã: 'a',
        ä: 'a',
        å: 'a',
        Ç: 'C',
        ç: 'c',
        Ð: 'D',
        ð: 'd',
        È: 'E',
        É: 'E',
        Ê: 'E',
        Ë: 'E',
        è: 'e',
        é: 'e',
        ê: 'e',
        ë: 'e',
        Ì: 'I',
        Í: 'I',
        Î: 'I',
        Ï: 'I',
        ì: 'i',
        í: 'i',
        î: 'i',
        ï: 'i',
        Ñ: 'N',
        ñ: 'n',
        Ò: 'O',
        Ó: 'O',
        Ô: 'O',
        Õ: 'O',
        Ö: 'O',
        Ø: 'O',
        ò: 'o',
        ó: 'o',
        ô: 'o',
        õ: 'o',
        ö: 'o',
        ø: 'o',
        Ù: 'U',
        Ú: 'U',
        Û: 'U',
        Ü: 'U',
        ù: 'u',
        ú: 'u',
        û: 'u',
        ü: 'u',
        Ý: 'Y',
        ý: 'y',
        ÿ: 'y',
        Æ: 'Ae',
        æ: 'ae',
        Þ: 'Th',
        þ: 'th',
        ß: 'ss',
        Ā: 'A',
        Ă: 'A',
        Ą: 'A',
        ā: 'a',
        ă: 'a',
        ą: 'a',
        Ć: 'C',
        Ĉ: 'C',
        Ċ: 'C',
        Č: 'C',
        ć: 'c',
        ĉ: 'c',
        ċ: 'c',
        č: 'c',
        Ď: 'D',
        Đ: 'D',
        ď: 'd',
        đ: 'd',
        Ē: 'E',
        Ĕ: 'E',
        Ė: 'E',
        Ę: 'E',
        Ě: 'E',
        ē: 'e',
        ĕ: 'e',
        ė: 'e',
        ę: 'e',
        ě: 'e',
        Ĝ: 'G',
        Ğ: 'G',
        Ġ: 'G',
        Ģ: 'G',
        ĝ: 'g',
        ğ: 'g',
        ġ: 'g',
        ģ: 'g',
        Ĥ: 'H',
        Ħ: 'H',
        ĥ: 'h',
        ħ: 'h',
        Ĩ: 'I',
        Ī: 'I',
        Ĭ: 'I',
        Į: 'I',
        İ: 'I',
        ĩ: 'i',
        ī: 'i',
        ĭ: 'i',
        į: 'i',
        ı: 'i',
        Ĵ: 'J',
        ĵ: 'j',
        Ķ: 'K',
        ķ: 'k',
        ĸ: 'k',
        Ĺ: 'L',
        Ļ: 'L',
        Ľ: 'L',
        Ŀ: 'L',
        Ł: 'L',
        ĺ: 'l',
        ļ: 'l',
        ľ: 'l',
        ŀ: 'l',
        ł: 'l',
        Ń: 'N',
        Ņ: 'N',
        Ň: 'N',
        Ŋ: 'N',
        ń: 'n',
        ņ: 'n',
        ň: 'n',
        ŋ: 'n',
        Ō: 'O',
        Ŏ: 'O',
        Ő: 'O',
        ō: 'o',
        ŏ: 'o',
        ő: 'o',
        Ŕ: 'R',
        Ŗ: 'R',
        Ř: 'R',
        ŕ: 'r',
        ŗ: 'r',
        ř: 'r',
        Ś: 'S',
        Ŝ: 'S',
        Ş: 'S',
        Š: 'S',
        ś: 's',
        ŝ: 's',
        ş: 's',
        š: 's',
        Ţ: 'T',
        Ť: 'T',
        Ŧ: 'T',
        ţ: 't',
        ť: 't',
        ŧ: 't',
        Ũ: 'U',
        Ū: 'U',
        Ŭ: 'U',
        Ů: 'U',
        Ű: 'U',
        Ų: 'U',
        ũ: 'u',
        ū: 'u',
        ŭ: 'u',
        ů: 'u',
        ű: 'u',
        ų: 'u',
        Ŵ: 'W',
        ŵ: 'w',
        Ŷ: 'Y',
        ŷ: 'y',
        Ÿ: 'Y',
        Ź: 'Z',
        Ż: 'Z',
        Ž: 'Z',
        ź: 'z',
        ż: 'z',
        ž: 'z',
        Ĳ: 'IJ',
        ĳ: 'ij',
        Œ: 'Oe',
        œ: 'oe',
        ŉ: "'n",
        ſ: 's'
      },
      oi = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' },
      Yi = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" },
      wl = { '\\': '\\', "'": "'", '\n': 'n', '\r': 'r', '\u2028': 'u2028', '\u2029': 'u2029' },
      Lr = parseFloat,
      Hl = parseInt,
      ba = typeof Yr == 'object' && Yr && Yr.Object === Object && Yr,
      Ar = typeof self == 'object' && self && self.Object === Object && self,
      Yt = ba || Ar || Function('return this')(),
      Qi = e && !e.nodeType && e,
      In = Qi && !0 && i && !i.nodeType && i,
      rn = In && In.exports === Qi,
      bn = rn && ba.process,
      vn = (function() {
        try {
          var Y = In && In.require && In.require('util').types;
          return Y || (bn && bn.binding && bn.binding('util'));
        } catch {}
      })(),
      Oo = vn && vn.isArrayBuffer,
      Fo = vn && vn.isDate,
      Uo = vn && vn.isMap,
      Bo = vn && vn.isRegExp,
      Wo = vn && vn.isSet,
      Ho = vn && vn.isTypedArray;
    function Tn(Y, de, se) {
      switch (se.length) {
        case 0:
          return Y.call(de);
        case 1:
          return Y.call(de, se[0]);
        case 2:
          return Y.call(de, se[0], se[1]);
        case 3:
          return Y.call(de, se[0], se[1], se[2]);
      }
      return Y.apply(de, se);
    }
    function O_(Y, de, se, Be) {
      for (var $e = -1, pt = Y == null ? 0 : Y.length; ++$e < pt; ) {
        var Qt = Y[$e];
        de(Be, Qt, se(Qt), Y);
      }
      return Be;
    }
    function Hn(Y, de) {
      for (var se = -1, Be = Y == null ? 0 : Y.length; ++se < Be && de(Y[se], se, Y) !== !1; );
      return Y;
    }
    function F_(Y, de) {
      for (var se = Y == null ? 0 : Y.length; se-- && de(Y[se], se, Y) !== !1; );
      return Y;
    }
    function zo(Y, de) {
      for (var se = -1, Be = Y == null ? 0 : Y.length; ++se < Be; ) if (!de(Y[se], se, Y)) return !1;
      return !0;
    }
    function Zi(Y, de) {
      for (var se = -1, Be = Y == null ? 0 : Y.length, $e = 0, pt = []; ++se < Be; ) {
        var Qt = Y[se];
        de(Qt, se, Y) && (pt[$e++] = Qt);
      }
      return pt;
    }
    function ds(Y, de) {
      var se = Y == null ? 0 : Y.length;
      return !!se && zl(Y, de, 0) > -1;
    }
    function va(Y, de, se) {
      for (var Be = -1, $e = Y == null ? 0 : Y.length; ++Be < $e; ) if (se(de, Y[Be])) return !0;
      return !1;
    }
    function Vt(Y, de) {
      for (var se = -1, Be = Y == null ? 0 : Y.length, $e = Array(Be); ++se < Be; ) $e[se] = de(Y[se], se, Y);
      return $e;
    }
    function Xi(Y, de) {
      for (var se = -1, Be = de.length, $e = Y.length; ++se < Be; ) Y[$e + se] = de[se];
      return Y;
    }
    function wa(Y, de, se, Be) {
      var $e = -1,
        pt = Y == null ? 0 : Y.length;
      for (Be && pt && (se = Y[++$e]); ++$e < pt; ) se = de(se, Y[$e], $e, Y);
      return se;
    }
    function U_(Y, de, se, Be) {
      var $e = Y == null ? 0 : Y.length;
      for (Be && $e && (se = Y[--$e]); $e--; ) se = de(se, Y[$e], $e, Y);
      return se;
    }
    function ka(Y, de) {
      for (var se = -1, Be = Y == null ? 0 : Y.length; ++se < Be; ) if (de(Y[se], se, Y)) return !0;
      return !1;
    }
    var B_ = Sa('length');
    function W_(Y) {
      return Y.split('');
    }
    function H_(Y) {
      return Y.match(wr) || [];
    }
    function qo(Y, de, se) {
      var Be;
      return (
        se(Y, function($e, pt, Qt) {
          if (de($e, pt, Qt)) return (Be = pt), !1;
        }),
        Be
      );
    }
    function hs(Y, de, se, Be) {
      for (var $e = Y.length, pt = se + (Be ? 1 : -1); Be ? pt-- : ++pt < $e; ) if (de(Y[pt], pt, Y)) return pt;
      return -1;
    }
    function zl(Y, de, se) {
      return de === de ? x_(Y, de, se) : hs(Y, Go, se);
    }
    function z_(Y, de, se, Be) {
      for (var $e = se - 1, pt = Y.length; ++$e < pt; ) if (Be(Y[$e], de)) return $e;
      return -1;
    }
    function Go(Y) {
      return Y !== Y;
    }
    function Ko(Y, de) {
      var se = Y == null ? 0 : Y.length;
      return se ? ya(Y, de) / se : le;
    }
    function Sa(Y) {
      return function(de) {
        return de == null ? t : de[Y];
      };
    }
    function Ca(Y) {
      return function(de) {
        return Y == null ? t : Y[de];
      };
    }
    function Jo(Y, de, se, Be, $e) {
      return (
        $e(Y, function(pt, Qt, Nt) {
          se = Be ? ((Be = !1), pt) : de(se, pt, Qt, Nt);
        }),
        se
      );
    }
    function q_(Y, de) {
      var se = Y.length;
      for (Y.sort(de); se--; ) Y[se] = Y[se].value;
      return Y;
    }
    function ya(Y, de) {
      for (var se, Be = -1, $e = Y.length; ++Be < $e; ) {
        var pt = de(Y[Be]);
        pt !== t && (se = se === t ? pt : se + pt);
      }
      return se;
    }
    function Pa(Y, de) {
      for (var se = -1, Be = Array(Y); ++se < Y; ) Be[se] = de(se);
      return Be;
    }
    function G_(Y, de) {
      return Vt(de, function(se) {
        return [se, Y[se]];
      });
    }
    function jo(Y) {
      return Y && Y.slice(0, Xo(Y) + 1).replace(Si, '');
    }
    function Ln(Y) {
      return function(de) {
        return Y(de);
      };
    }
    function Na(Y, de) {
      return Vt(de, function(se) {
        return Y[se];
      });
    }
    function Rr(Y, de) {
      return Y.has(de);
    }
    function Yo(Y, de) {
      for (var se = -1, Be = Y.length; ++se < Be && zl(de, Y[se], 0) > -1; );
      return se;
    }
    function Qo(Y, de) {
      for (var se = Y.length; se-- && zl(de, Y[se], 0) > -1; );
      return se;
    }
    function K_(Y, de) {
      for (var se = Y.length, Be = 0; se--; ) Y[se] === de && ++Be;
      return Be;
    }
    var J_ = Ca(Wn),
      j_ = Ca(oi);
    function Y_(Y) {
      return '\\' + wl[Y];
    }
    function Q_(Y, de) {
      return Y == null ? t : Y[de];
    }
    function ql(Y) {
      return Ir.test(Y);
    }
    function Z_(Y) {
      return ji.test(Y);
    }
    function X_(Y) {
      for (var de, se = []; !(de = Y.next()).done; ) se.push(de.value);
      return se;
    }
    function Ia(Y) {
      var de = -1,
        se = Array(Y.size);
      return (
        Y.forEach(function(Be, $e) {
          se[++de] = [$e, Be];
        }),
        se
      );
    }
    function Zo(Y, de) {
      return function(se) {
        return Y(de(se));
      };
    }
    function $i(Y, de) {
      for (var se = -1, Be = Y.length, $e = 0, pt = []; ++se < Be; ) {
        var Qt = Y[se];
        (Qt === de || Qt === h) && ((Y[se] = h), (pt[$e++] = se));
      }
      return pt;
    }
    function gs(Y) {
      var de = -1,
        se = Array(Y.size);
      return (
        Y.forEach(function(Be) {
          se[++de] = Be;
        }),
        se
      );
    }
    function $_(Y) {
      var de = -1,
        se = Array(Y.size);
      return (
        Y.forEach(function(Be) {
          se[++de] = [Be, Be];
        }),
        se
      );
    }
    function x_(Y, de, se) {
      for (var Be = se - 1, $e = Y.length; ++Be < $e; ) if (Y[Be] === de) return Be;
      return -1;
    }
    function ep(Y, de, se) {
      for (var Be = se + 1; Be--; ) if (Y[Be] === de) return Be;
      return Be;
    }
    function Gl(Y) {
      return ql(Y) ? np(Y) : B_(Y);
    }
    function xn(Y) {
      return ql(Y) ? ip(Y) : W_(Y);
    }
    function Xo(Y) {
      for (var de = Y.length; de-- && qi.test(Y.charAt(de)); );
      return de;
    }
    var tp = Ca(Yi);
    function np(Y) {
      for (var de = (vl.lastIndex = 0); vl.test(Y); ) ++de;
      return de;
    }
    function ip(Y) {
      return Y.match(vl) || [];
    }
    function lp(Y) {
      return Y.match(Ji) || [];
    }
    var rp = function Y(de) {
        de = de == null ? Yt : Kl.defaults(Yt.Object(), de, Kl.pick(Yt, Tr));
        var se = de.Array,
          Be = de.Date,
          $e = de.Error,
          pt = de.Function,
          Qt = de.Math,
          Nt = de.Object,
          Ta = de.RegExp,
          sp = de.String,
          zn = de.TypeError,
          _s = se.prototype,
          ap = pt.prototype,
          Jl = Nt.prototype,
          ps = de['__core-js_shared__'],
          ms = ap.toString,
          Ct = Jl.hasOwnProperty,
          op = 0,
          $o = (function() {
            var a = /[^.]+$/.exec((ps && ps.keys && ps.keys.IE_PROTO) || '');
            return a ? 'Symbol(src)_1.' + a : '';
          })(),
          bs = Jl.toString,
          up = ms.call(Nt),
          fp = Yt._,
          cp = Ta(
            '^' +
              ms
                .call(Ct)
                .replace(ki, '\\$&')
                .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
              '$'
          ),
          vs = rn ? de.Buffer : t,
          xi = de.Symbol,
          ws = de.Uint8Array,
          xo = vs ? vs.allocUnsafe : t,
          ks = Zo(Nt.getPrototypeOf, Nt),
          eu = Nt.create,
          tu = Jl.propertyIsEnumerable,
          Ss = _s.splice,
          nu = xi ? xi.isConcatSpreadable : t,
          Er = xi ? xi.iterator : t,
          kl = xi ? xi.toStringTag : t,
          Cs = (function() {
            try {
              var a = Nl(Nt, 'defineProperty');
              return a({}, '', {}), a;
            } catch {}
          })(),
          dp = de.clearTimeout !== Yt.clearTimeout && de.clearTimeout,
          hp = Be && Be.now !== Yt.Date.now && Be.now,
          gp = de.setTimeout !== Yt.setTimeout && de.setTimeout,
          ys = Qt.ceil,
          Ps = Qt.floor,
          La = Nt.getOwnPropertySymbols,
          _p = vs ? vs.isBuffer : t,
          iu = de.isFinite,
          pp = _s.join,
          mp = Zo(Nt.keys, Nt),
          Zt = Qt.max,
          un = Qt.min,
          bp = Be.now,
          vp = de.parseInt,
          lu = Qt.random,
          wp = _s.reverse,
          Aa = Nl(de, 'DataView'),
          Dr = Nl(de, 'Map'),
          Ra = Nl(de, 'Promise'),
          jl = Nl(de, 'Set'),
          Vr = Nl(de, 'WeakMap'),
          Mr = Nl(Nt, 'create'),
          Ns = Vr && new Vr(),
          Yl = {},
          kp = Il(Aa),
          Sp = Il(Dr),
          Cp = Il(Ra),
          yp = Il(jl),
          Pp = Il(Vr),
          Is = xi ? xi.prototype : t,
          Or = Is ? Is.valueOf : t,
          ru = Is ? Is.toString : t;
        function E(a) {
          if (Ht(a) && !et(a) && !(a instanceof ut)) {
            if (a instanceof qn) return a;
            if (Ct.call(a, '__wrapped__')) return af(a);
          }
          return new qn(a);
        }
        var Ql = (function() {
          function a() {}
          return function(u) {
            if (!Bt(u)) return {};
            if (eu) return eu(u);
            a.prototype = u;
            var d = new a();
            return (a.prototype = t), d;
          };
        })();
        function Ts() {}
        function qn(a, u) {
          (this.__wrapped__ = a),
            (this.__actions__ = []),
            (this.__chain__ = !!u),
            (this.__index__ = 0),
            (this.__values__ = t);
        }
        (E.templateSettings = { escape: _r, evaluate: pr, interpolate: El, variable: '', imports: { _: E } }),
          (E.prototype = Ts.prototype),
          (E.prototype.constructor = E),
          (qn.prototype = Ql(Ts.prototype)),
          (qn.prototype.constructor = qn);
        function ut(a) {
          (this.__wrapped__ = a),
            (this.__actions__ = []),
            (this.__dir__ = 1),
            (this.__filtered__ = !1),
            (this.__iteratees__ = []),
            (this.__takeCount__ = ve),
            (this.__views__ = []);
        }
        function Np() {
          var a = new ut(this.__wrapped__);
          return (
            (a.__actions__ = wn(this.__actions__)),
            (a.__dir__ = this.__dir__),
            (a.__filtered__ = this.__filtered__),
            (a.__iteratees__ = wn(this.__iteratees__)),
            (a.__takeCount__ = this.__takeCount__),
            (a.__views__ = wn(this.__views__)),
            a
          );
        }
        function Ip() {
          if (this.__filtered__) {
            var a = new ut(this);
            (a.__dir__ = -1), (a.__filtered__ = !0);
          } else (a = this.clone()), (a.__dir__ *= -1);
          return a;
        }
        function Tp() {
          var a = this.__wrapped__.value(),
            u = this.__dir__,
            d = et(a),
            b = u < 0,
            P = d ? a.length : 0,
            V = Wm(0, P, this.__views__),
            W = V.start,
            z = V.end,
            Z = z - W,
            he = b ? z : W - 1,
            ge = this.__iteratees__,
            me = ge.length,
            Ae = 0,
            We = un(Z, this.__takeCount__);
          if (!d || (!b && P == Z && We == Z)) return Lu(a, this.__actions__);
          var Ye = [];
          e: for (; Z-- && Ae < We; ) {
            he += u;
            for (var lt = -1, Qe = a[he]; ++lt < me; ) {
              var ot = ge[lt],
                ft = ot.iteratee,
                En = ot.type,
                _n = ft(Qe);
              if (En == Ce) Qe = _n;
              else if (!_n) {
                if (En == ce) continue e;
                break e;
              }
            }
            Ye[Ae++] = Qe;
          }
          return Ye;
        }
        (ut.prototype = Ql(Ts.prototype)), (ut.prototype.constructor = ut);
        function Sl(a) {
          var u = -1,
            d = a == null ? 0 : a.length;
          for (this.clear(); ++u < d; ) {
            var b = a[u];
            this.set(b[0], b[1]);
          }
        }
        function Lp() {
          (this.__data__ = Mr ? Mr(null) : {}), (this.size = 0);
        }
        function Ap(a) {
          var u = this.has(a) && delete this.__data__[a];
          return (this.size -= u ? 1 : 0), u;
        }
        function Rp(a) {
          var u = this.__data__;
          if (Mr) {
            var d = u[a];
            return d === c ? t : d;
          }
          return Ct.call(u, a) ? u[a] : t;
        }
        function Ep(a) {
          var u = this.__data__;
          return Mr ? u[a] !== t : Ct.call(u, a);
        }
        function Dp(a, u) {
          var d = this.__data__;
          return (this.size += this.has(a) ? 0 : 1), (d[a] = Mr && u === t ? c : u), this;
        }
        (Sl.prototype.clear = Lp),
          (Sl.prototype.delete = Ap),
          (Sl.prototype.get = Rp),
          (Sl.prototype.has = Ep),
          (Sl.prototype.set = Dp);
        function Ni(a) {
          var u = -1,
            d = a == null ? 0 : a.length;
          for (this.clear(); ++u < d; ) {
            var b = a[u];
            this.set(b[0], b[1]);
          }
        }
        function Vp() {
          (this.__data__ = []), (this.size = 0);
        }
        function Mp(a) {
          var u = this.__data__,
            d = Ls(u, a);
          if (d < 0) return !1;
          var b = u.length - 1;
          return d == b ? u.pop() : Ss.call(u, d, 1), --this.size, !0;
        }
        function Op(a) {
          var u = this.__data__,
            d = Ls(u, a);
          return d < 0 ? t : u[d][1];
        }
        function Fp(a) {
          return Ls(this.__data__, a) > -1;
        }
        function Up(a, u) {
          var d = this.__data__,
            b = Ls(d, a);
          return b < 0 ? (++this.size, d.push([a, u])) : (d[b][1] = u), this;
        }
        (Ni.prototype.clear = Vp),
          (Ni.prototype.delete = Mp),
          (Ni.prototype.get = Op),
          (Ni.prototype.has = Fp),
          (Ni.prototype.set = Up);
        function Ii(a) {
          var u = -1,
            d = a == null ? 0 : a.length;
          for (this.clear(); ++u < d; ) {
            var b = a[u];
            this.set(b[0], b[1]);
          }
        }
        function Bp() {
          (this.size = 0), (this.__data__ = { hash: new Sl(), map: new (Dr || Ni)(), string: new Sl() });
        }
        function Wp(a) {
          var u = Hs(this, a).delete(a);
          return (this.size -= u ? 1 : 0), u;
        }
        function Hp(a) {
          return Hs(this, a).get(a);
        }
        function zp(a) {
          return Hs(this, a).has(a);
        }
        function qp(a, u) {
          var d = Hs(this, a),
            b = d.size;
          return d.set(a, u), (this.size += d.size == b ? 0 : 1), this;
        }
        (Ii.prototype.clear = Bp),
          (Ii.prototype.delete = Wp),
          (Ii.prototype.get = Hp),
          (Ii.prototype.has = zp),
          (Ii.prototype.set = qp);
        function Cl(a) {
          var u = -1,
            d = a == null ? 0 : a.length;
          for (this.__data__ = new Ii(); ++u < d; ) this.add(a[u]);
        }
        function Gp(a) {
          return this.__data__.set(a, c), this;
        }
        function Kp(a) {
          return this.__data__.has(a);
        }
        (Cl.prototype.add = Cl.prototype.push = Gp), (Cl.prototype.has = Kp);
        function ei(a) {
          var u = (this.__data__ = new Ni(a));
          this.size = u.size;
        }
        function Jp() {
          (this.__data__ = new Ni()), (this.size = 0);
        }
        function jp(a) {
          var u = this.__data__,
            d = u.delete(a);
          return (this.size = u.size), d;
        }
        function Yp(a) {
          return this.__data__.get(a);
        }
        function Qp(a) {
          return this.__data__.has(a);
        }
        function Zp(a, u) {
          var d = this.__data__;
          if (d instanceof Ni) {
            var b = d.__data__;
            if (!Dr || b.length < l - 1) return b.push([a, u]), (this.size = ++d.size), this;
            d = this.__data__ = new Ii(b);
          }
          return d.set(a, u), (this.size = d.size), this;
        }
        (ei.prototype.clear = Jp),
          (ei.prototype.delete = jp),
          (ei.prototype.get = Yp),
          (ei.prototype.has = Qp),
          (ei.prototype.set = Zp);
        function su(a, u) {
          var d = et(a),
            b = !d && Tl(a),
            P = !d && !b && ll(a),
            V = !d && !b && !P && xl(a),
            W = d || b || P || V,
            z = W ? Pa(a.length, sp) : [],
            Z = z.length;
          for (var he in a)
            (u || Ct.call(a, he)) &&
              !(
                W &&
                (he == 'length' ||
                  (P && (he == 'offset' || he == 'parent')) ||
                  (V && (he == 'buffer' || he == 'byteLength' || he == 'byteOffset')) ||
                  Ri(he, Z))
              ) &&
              z.push(he);
          return z;
        }
        function au(a) {
          var u = a.length;
          return u ? a[za(0, u - 1)] : t;
        }
        function Xp(a, u) {
          return zs(wn(a), yl(u, 0, a.length));
        }
        function $p(a) {
          return zs(wn(a));
        }
        function Ea(a, u, d) {
          ((d !== t && !ti(a[u], d)) || (d === t && !(u in a))) && Ti(a, u, d);
        }
        function Fr(a, u, d) {
          var b = a[u];
          (!(Ct.call(a, u) && ti(b, d)) || (d === t && !(u in a))) && Ti(a, u, d);
        }
        function Ls(a, u) {
          for (var d = a.length; d--; ) if (ti(a[d][0], u)) return d;
          return -1;
        }
        function xp(a, u, d, b) {
          return (
            el(a, function(P, V, W) {
              u(b, P, d(P), W);
            }),
            b
          );
        }
        function ou(a, u) {
          return a && fi(u, xt(u), a);
        }
        function em(a, u) {
          return a && fi(u, Sn(u), a);
        }
        function Ti(a, u, d) {
          u == '__proto__' && Cs ? Cs(a, u, { configurable: !0, enumerable: !0, value: d, writable: !0 }) : (a[u] = d);
        }
        function Da(a, u) {
          for (var d = -1, b = u.length, P = se(b), V = a == null; ++d < b; ) P[d] = V ? t : go(a, u[d]);
          return P;
        }
        function yl(a, u, d) {
          return a === a && (d !== t && (a = a <= d ? a : d), u !== t && (a = a >= u ? a : u)), a;
        }
        function Gn(a, u, d, b, P, V) {
          var W,
            z = u & _,
            Z = u & p,
            he = u & m;
          if ((d && (W = P ? d(a, b, P, V) : d(a)), W !== t)) return W;
          if (!Bt(a)) return a;
          var ge = et(a);
          if (ge) {
            if (((W = zm(a)), !z)) return wn(a, W);
          } else {
            var me = fn(a),
              Ae = me == Ft || me == Jt;
            if (ll(a)) return Eu(a, z);
            if (me == zt || me == ke || (Ae && !P)) {
              if (((W = Z || Ae ? {} : Xu(a)), !z)) return Z ? Rm(a, em(W, a)) : Am(a, ou(W, a));
            } else {
              if (!Xe[me]) return P ? a : {};
              W = qm(a, me, z);
            }
          }
          V || (V = new ei());
          var We = V.get(a);
          if (We) return We;
          V.set(a, W),
            If(a)
              ? a.forEach(function(Qe) {
                  W.add(Gn(Qe, u, d, Qe, a, V));
                })
              : Pf(a) &&
                a.forEach(function(Qe, ot) {
                  W.set(ot, Gn(Qe, u, d, ot, a, V));
                });
          var Ye = he ? (Z ? xa : $a) : Z ? Sn : xt,
            lt = ge ? t : Ye(a);
          return (
            Hn(lt || a, function(Qe, ot) {
              lt && ((ot = Qe), (Qe = a[ot])), Fr(W, ot, Gn(Qe, u, d, ot, a, V));
            }),
            W
          );
        }
        function tm(a) {
          var u = xt(a);
          return function(d) {
            return uu(d, a, u);
          };
        }
        function uu(a, u, d) {
          var b = d.length;
          if (a == null) return !b;
          for (a = Nt(a); b--; ) {
            var P = d[b],
              V = u[P],
              W = a[P];
            if ((W === t && !(P in a)) || !V(W)) return !1;
          }
          return !0;
        }
        function fu(a, u, d) {
          if (typeof a != 'function') throw new zn(s);
          return Gr(function() {
            a.apply(t, d);
          }, u);
        }
        function Ur(a, u, d, b) {
          var P = -1,
            V = ds,
            W = !0,
            z = a.length,
            Z = [],
            he = u.length;
          if (!z) return Z;
          d && (u = Vt(u, Ln(d))), b ? ((V = va), (W = !1)) : u.length >= l && ((V = Rr), (W = !1), (u = new Cl(u)));
          e: for (; ++P < z; ) {
            var ge = a[P],
              me = d == null ? ge : d(ge);
            if (((ge = b || ge !== 0 ? ge : 0), W && me === me)) {
              for (var Ae = he; Ae--; ) if (u[Ae] === me) continue e;
              Z.push(ge);
            } else V(u, me, b) || Z.push(ge);
          }
          return Z;
        }
        var el = Fu(ui),
          cu = Fu(Ma, !0);
        function nm(a, u) {
          var d = !0;
          return (
            el(a, function(b, P, V) {
              return (d = !!u(b, P, V)), d;
            }),
            d
          );
        }
        function As(a, u, d) {
          for (var b = -1, P = a.length; ++b < P; ) {
            var V = a[b],
              W = u(V);
            if (W != null && (z === t ? W === W && !Rn(W) : d(W, z)))
              var z = W,
                Z = V;
          }
          return Z;
        }
        function im(a, u, d, b) {
          var P = a.length;
          for (
            d = nt(d),
              d < 0 && (d = -d > P ? 0 : P + d),
              b = b === t || b > P ? P : nt(b),
              b < 0 && (b += P),
              b = d > b ? 0 : Lf(b);
            d < b;

          )
            a[d++] = u;
          return a;
        }
        function du(a, u) {
          var d = [];
          return (
            el(a, function(b, P, V) {
              u(b, P, V) && d.push(b);
            }),
            d
          );
        }
        function sn(a, u, d, b, P) {
          var V = -1,
            W = a.length;
          for (d || (d = Km), P || (P = []); ++V < W; ) {
            var z = a[V];
            u > 0 && d(z) ? (u > 1 ? sn(z, u - 1, d, b, P) : Xi(P, z)) : b || (P[P.length] = z);
          }
          return P;
        }
        var Va = Uu(),
          hu = Uu(!0);
        function ui(a, u) {
          return a && Va(a, u, xt);
        }
        function Ma(a, u) {
          return a && hu(a, u, xt);
        }
        function Rs(a, u) {
          return Zi(u, function(d) {
            return Ei(a[d]);
          });
        }
        function Pl(a, u) {
          u = nl(u, a);
          for (var d = 0, b = u.length; a != null && d < b; ) a = a[ci(u[d++])];
          return d && d == b ? a : t;
        }
        function gu(a, u, d) {
          var b = u(a);
          return et(a) ? b : Xi(b, d(a));
        }
        function hn(a) {
          return a == null ? (a === t ? dn : Bi) : kl && kl in Nt(a) ? Bm(a) : $m(a);
        }
        function Oa(a, u) {
          return a > u;
        }
        function lm(a, u) {
          return a != null && Ct.call(a, u);
        }
        function rm(a, u) {
          return a != null && u in Nt(a);
        }
        function sm(a, u, d) {
          return a >= un(u, d) && a < Zt(u, d);
        }
        function Fa(a, u, d) {
          for (var b = d ? va : ds, P = a[0].length, V = a.length, W = V, z = se(V), Z = 1 / 0, he = []; W--; ) {
            var ge = a[W];
            W && u && (ge = Vt(ge, Ln(u))),
              (Z = un(ge.length, Z)),
              (z[W] = !d && (u || (P >= 120 && ge.length >= 120)) ? new Cl(W && ge) : t);
          }
          ge = a[0];
          var me = -1,
            Ae = z[0];
          e: for (; ++me < P && he.length < Z; ) {
            var We = ge[me],
              Ye = u ? u(We) : We;
            if (((We = d || We !== 0 ? We : 0), !(Ae ? Rr(Ae, Ye) : b(he, Ye, d)))) {
              for (W = V; --W; ) {
                var lt = z[W];
                if (!(lt ? Rr(lt, Ye) : b(a[W], Ye, d))) continue e;
              }
              Ae && Ae.push(Ye), he.push(We);
            }
          }
          return he;
        }
        function am(a, u, d, b) {
          return (
            ui(a, function(P, V, W) {
              u(b, d(P), V, W);
            }),
            b
          );
        }
        function Br(a, u, d) {
          (u = nl(u, a)), (a = tf(a, u));
          var b = a == null ? a : a[ci(Jn(u))];
          return b == null ? t : Tn(b, a, d);
        }
        function _u(a) {
          return Ht(a) && hn(a) == ke;
        }
        function om(a) {
          return Ht(a) && hn(a) == nn;
        }
        function um(a) {
          return Ht(a) && hn(a) == Le;
        }
        function Wr(a, u, d, b, P) {
          return a === u
            ? !0
            : a == null || u == null || (!Ht(a) && !Ht(u))
            ? a !== a && u !== u
            : fm(a, u, d, b, Wr, P);
        }
        function fm(a, u, d, b, P, V) {
          var W = et(a),
            z = et(u),
            Z = W ? we : fn(a),
            he = z ? we : fn(u);
          (Z = Z == ke ? zt : Z), (he = he == ke ? zt : he);
          var ge = Z == zt,
            me = he == zt,
            Ae = Z == he;
          if (Ae && ll(a)) {
            if (!ll(u)) return !1;
            (W = !0), (ge = !1);
          }
          if (Ae && !ge) return V || (V = new ei()), W || xl(a) ? Yu(a, u, d, b, P, V) : Fm(a, u, Z, d, b, P, V);
          if (!(d & v)) {
            var We = ge && Ct.call(a, '__wrapped__'),
              Ye = me && Ct.call(u, '__wrapped__');
            if (We || Ye) {
              var lt = We ? a.value() : a,
                Qe = Ye ? u.value() : u;
              return V || (V = new ei()), P(lt, Qe, d, b, V);
            }
          }
          return Ae ? (V || (V = new ei()), Um(a, u, d, b, P, V)) : !1;
        }
        function cm(a) {
          return Ht(a) && fn(a) == Rt;
        }
        function Ua(a, u, d, b) {
          var P = d.length,
            V = P,
            W = !b;
          if (a == null) return !V;
          for (a = Nt(a); P--; ) {
            var z = d[P];
            if (W && z[2] ? z[1] !== a[z[0]] : !(z[0] in a)) return !1;
          }
          for (; ++P < V; ) {
            z = d[P];
            var Z = z[0],
              he = a[Z],
              ge = z[1];
            if (W && z[2]) {
              if (he === t && !(Z in a)) return !1;
            } else {
              var me = new ei();
              if (b) var Ae = b(he, ge, Z, a, u, me);
              if (!(Ae === t ? Wr(ge, he, v | k, b, me) : Ae)) return !1;
            }
          }
          return !0;
        }
        function pu(a) {
          if (!Bt(a) || jm(a)) return !1;
          var u = Ei(a) ? cp : _l;
          return u.test(Il(a));
        }
        function dm(a) {
          return Ht(a) && hn(a) == $t;
        }
        function hm(a) {
          return Ht(a) && fn(a) == jt;
        }
        function gm(a) {
          return Ht(a) && Ys(a.length) && !!Ke[hn(a)];
        }
        function mu(a) {
          return typeof a == 'function'
            ? a
            : a == null
            ? Cn
            : typeof a == 'object'
            ? et(a)
              ? wu(a[0], a[1])
              : vu(a)
            : Wf(a);
        }
        function Ba(a) {
          if (!qr(a)) return mp(a);
          var u = [];
          for (var d in Nt(a)) Ct.call(a, d) && d != 'constructor' && u.push(d);
          return u;
        }
        function _m(a) {
          if (!Bt(a)) return Xm(a);
          var u = qr(a),
            d = [];
          for (var b in a) (b == 'constructor' && (u || !Ct.call(a, b))) || d.push(b);
          return d;
        }
        function Wa(a, u) {
          return a < u;
        }
        function bu(a, u) {
          var d = -1,
            b = kn(a) ? se(a.length) : [];
          return (
            el(a, function(P, V, W) {
              b[++d] = u(P, V, W);
            }),
            b
          );
        }
        function vu(a) {
          var u = to(a);
          return u.length == 1 && u[0][2]
            ? xu(u[0][0], u[0][1])
            : function(d) {
                return d === a || Ua(d, a, u);
              };
        }
        function wu(a, u) {
          return io(a) && $u(u)
            ? xu(ci(a), u)
            : function(d) {
                var b = go(d, a);
                return b === t && b === u ? _o(d, a) : Wr(u, b, v | k);
              };
        }
        function Es(a, u, d, b, P) {
          a !== u &&
            Va(
              u,
              function(V, W) {
                if ((P || (P = new ei()), Bt(V))) pm(a, u, W, d, Es, b, P);
                else {
                  var z = b ? b(ro(a, W), V, W + '', a, u, P) : t;
                  z === t && (z = V), Ea(a, W, z);
                }
              },
              Sn
            );
        }
        function pm(a, u, d, b, P, V, W) {
          var z = ro(a, d),
            Z = ro(u, d),
            he = W.get(Z);
          if (he) {
            Ea(a, d, he);
            return;
          }
          var ge = V ? V(z, Z, d + '', a, u, W) : t,
            me = ge === t;
          if (me) {
            var Ae = et(Z),
              We = !Ae && ll(Z),
              Ye = !Ae && !We && xl(Z);
            (ge = Z),
              Ae || We || Ye
                ? et(z)
                  ? (ge = z)
                  : qt(z)
                  ? (ge = wn(z))
                  : We
                  ? ((me = !1), (ge = Eu(Z, !0)))
                  : Ye
                  ? ((me = !1), (ge = Du(Z, !0)))
                  : (ge = [])
                : Kr(Z) || Tl(Z)
                ? ((ge = z), Tl(z) ? (ge = Af(z)) : (!Bt(z) || Ei(z)) && (ge = Xu(Z)))
                : (me = !1);
          }
          me && (W.set(Z, ge), P(ge, Z, b, V, W), W.delete(Z)), Ea(a, d, ge);
        }
        function ku(a, u) {
          var d = a.length;
          if (!!d) return (u += u < 0 ? d : 0), Ri(u, d) ? a[u] : t;
        }
        function Su(a, u, d) {
          u.length
            ? (u = Vt(u, function(V) {
                return et(V)
                  ? function(W) {
                      return Pl(W, V.length === 1 ? V[0] : V);
                    }
                  : V;
              }))
            : (u = [Cn]);
          var b = -1;
          u = Vt(u, Ln(Je()));
          var P = bu(a, function(V, W, z) {
            var Z = Vt(u, function(he) {
              return he(V);
            });
            return { criteria: Z, index: ++b, value: V };
          });
          return q_(P, function(V, W) {
            return Lm(V, W, d);
          });
        }
        function mm(a, u) {
          return Cu(a, u, function(d, b) {
            return _o(a, b);
          });
        }
        function Cu(a, u, d) {
          for (var b = -1, P = u.length, V = {}; ++b < P; ) {
            var W = u[b],
              z = Pl(a, W);
            d(z, W) && Hr(V, nl(W, a), z);
          }
          return V;
        }
        function bm(a) {
          return function(u) {
            return Pl(u, a);
          };
        }
        function Ha(a, u, d, b) {
          var P = b ? z_ : zl,
            V = -1,
            W = u.length,
            z = a;
          for (a === u && (u = wn(u)), d && (z = Vt(a, Ln(d))); ++V < W; )
            for (var Z = 0, he = u[V], ge = d ? d(he) : he; (Z = P(z, ge, Z, b)) > -1; )
              z !== a && Ss.call(z, Z, 1), Ss.call(a, Z, 1);
          return a;
        }
        function yu(a, u) {
          for (var d = a ? u.length : 0, b = d - 1; d--; ) {
            var P = u[d];
            if (d == b || P !== V) {
              var V = P;
              Ri(P) ? Ss.call(a, P, 1) : Ka(a, P);
            }
          }
          return a;
        }
        function za(a, u) {
          return a + Ps(lu() * (u - a + 1));
        }
        function vm(a, u, d, b) {
          for (var P = -1, V = Zt(ys((u - a) / (d || 1)), 0), W = se(V); V--; ) (W[b ? V : ++P] = a), (a += d);
          return W;
        }
        function qa(a, u) {
          var d = '';
          if (!a || u < 1 || u > $) return d;
          do u % 2 && (d += a), (u = Ps(u / 2)), u && (a += a);
          while (u);
          return d;
        }
        function st(a, u) {
          return so(ef(a, u, Cn), a + '');
        }
        function wm(a) {
          return au(er(a));
        }
        function km(a, u) {
          var d = er(a);
          return zs(d, yl(u, 0, d.length));
        }
        function Hr(a, u, d, b) {
          if (!Bt(a)) return a;
          u = nl(u, a);
          for (var P = -1, V = u.length, W = V - 1, z = a; z != null && ++P < V; ) {
            var Z = ci(u[P]),
              he = d;
            if (Z === '__proto__' || Z === 'constructor' || Z === 'prototype') return a;
            if (P != W) {
              var ge = z[Z];
              (he = b ? b(ge, Z, z) : t), he === t && (he = Bt(ge) ? ge : Ri(u[P + 1]) ? [] : {});
            }
            Fr(z, Z, he), (z = z[Z]);
          }
          return a;
        }
        var Pu = Ns
            ? function(a, u) {
                return Ns.set(a, u), a;
              }
            : Cn,
          Sm = Cs
            ? function(a, u) {
                return Cs(a, 'toString', { configurable: !0, enumerable: !1, value: mo(u), writable: !0 });
              }
            : Cn;
        function Cm(a) {
          return zs(er(a));
        }
        function Kn(a, u, d) {
          var b = -1,
            P = a.length;
          u < 0 && (u = -u > P ? 0 : P + u),
            (d = d > P ? P : d),
            d < 0 && (d += P),
            (P = u > d ? 0 : (d - u) >>> 0),
            (u >>>= 0);
          for (var V = se(P); ++b < P; ) V[b] = a[b + u];
          return V;
        }
        function ym(a, u) {
          var d;
          return (
            el(a, function(b, P, V) {
              return (d = u(b, P, V)), !d;
            }),
            !!d
          );
        }
        function Ds(a, u, d) {
          var b = 0,
            P = a == null ? b : a.length;
          if (typeof u == 'number' && u === u && P <= x) {
            for (; b < P; ) {
              var V = (b + P) >>> 1,
                W = a[V];
              W !== null && !Rn(W) && (d ? W <= u : W < u) ? (b = V + 1) : (P = V);
            }
            return P;
          }
          return Ga(a, u, Cn, d);
        }
        function Ga(a, u, d, b) {
          var P = 0,
            V = a == null ? 0 : a.length;
          if (V === 0) return 0;
          u = d(u);
          for (var W = u !== u, z = u === null, Z = Rn(u), he = u === t; P < V; ) {
            var ge = Ps((P + V) / 2),
              me = d(a[ge]),
              Ae = me !== t,
              We = me === null,
              Ye = me === me,
              lt = Rn(me);
            if (W) var Qe = b || Ye;
            else
              he
                ? (Qe = Ye && (b || Ae))
                : z
                ? (Qe = Ye && Ae && (b || !We))
                : Z
                ? (Qe = Ye && Ae && !We && (b || !lt))
                : We || lt
                ? (Qe = !1)
                : (Qe = b ? me <= u : me < u);
            Qe ? (P = ge + 1) : (V = ge);
          }
          return un(V, ue);
        }
        function Nu(a, u) {
          for (var d = -1, b = a.length, P = 0, V = []; ++d < b; ) {
            var W = a[d],
              z = u ? u(W) : W;
            if (!d || !ti(z, Z)) {
              var Z = z;
              V[P++] = W === 0 ? 0 : W;
            }
          }
          return V;
        }
        function Iu(a) {
          return typeof a == 'number' ? a : Rn(a) ? le : +a;
        }
        function An(a) {
          if (typeof a == 'string') return a;
          if (et(a)) return Vt(a, An) + '';
          if (Rn(a)) return ru ? ru.call(a) : '';
          var u = a + '';
          return u == '0' && 1 / a == -ae ? '-0' : u;
        }
        function tl(a, u, d) {
          var b = -1,
            P = ds,
            V = a.length,
            W = !0,
            z = [],
            Z = z;
          if (d) (W = !1), (P = va);
          else if (V >= l) {
            var he = u ? null : Mm(a);
            if (he) return gs(he);
            (W = !1), (P = Rr), (Z = new Cl());
          } else Z = u ? [] : z;
          e: for (; ++b < V; ) {
            var ge = a[b],
              me = u ? u(ge) : ge;
            if (((ge = d || ge !== 0 ? ge : 0), W && me === me)) {
              for (var Ae = Z.length; Ae--; ) if (Z[Ae] === me) continue e;
              u && Z.push(me), z.push(ge);
            } else P(Z, me, d) || (Z !== z && Z.push(me), z.push(ge));
          }
          return z;
        }
        function Ka(a, u) {
          return (u = nl(u, a)), (a = tf(a, u)), a == null || delete a[ci(Jn(u))];
        }
        function Tu(a, u, d, b) {
          return Hr(a, u, d(Pl(a, u)), b);
        }
        function Vs(a, u, d, b) {
          for (var P = a.length, V = b ? P : -1; (b ? V-- : ++V < P) && u(a[V], V, a); );
          return d ? Kn(a, b ? 0 : V, b ? V + 1 : P) : Kn(a, b ? V + 1 : 0, b ? P : V);
        }
        function Lu(a, u) {
          var d = a;
          return (
            d instanceof ut && (d = d.value()),
            wa(
              u,
              function(b, P) {
                return P.func.apply(P.thisArg, Xi([b], P.args));
              },
              d
            )
          );
        }
        function Ja(a, u, d) {
          var b = a.length;
          if (b < 2) return b ? tl(a[0]) : [];
          for (var P = -1, V = se(b); ++P < b; )
            for (var W = a[P], z = -1; ++z < b; ) z != P && (V[P] = Ur(V[P] || W, a[z], u, d));
          return tl(sn(V, 1), u, d);
        }
        function Au(a, u, d) {
          for (var b = -1, P = a.length, V = u.length, W = {}; ++b < P; ) {
            var z = b < V ? u[b] : t;
            d(W, a[b], z);
          }
          return W;
        }
        function ja(a) {
          return qt(a) ? a : [];
        }
        function Ya(a) {
          return typeof a == 'function' ? a : Cn;
        }
        function nl(a, u) {
          return et(a) ? a : io(a, u) ? [a] : sf(kt(a));
        }
        var Pm = st;
        function il(a, u, d) {
          var b = a.length;
          return (d = d === t ? b : d), !u && d >= b ? a : Kn(a, u, d);
        }
        var Ru =
          dp ||
          function(a) {
            return Yt.clearTimeout(a);
          };
        function Eu(a, u) {
          if (u) return a.slice();
          var d = a.length,
            b = xo ? xo(d) : new a.constructor(d);
          return a.copy(b), b;
        }
        function Qa(a) {
          var u = new a.constructor(a.byteLength);
          return new ws(u).set(new ws(a)), u;
        }
        function Nm(a, u) {
          var d = u ? Qa(a.buffer) : a.buffer;
          return new a.constructor(d, a.byteOffset, a.byteLength);
        }
        function Im(a) {
          var u = new a.constructor(a.source, gl.exec(a));
          return (u.lastIndex = a.lastIndex), u;
        }
        function Tm(a) {
          return Or ? Nt(Or.call(a)) : {};
        }
        function Du(a, u) {
          var d = u ? Qa(a.buffer) : a.buffer;
          return new a.constructor(d, a.byteOffset, a.length);
        }
        function Vu(a, u) {
          if (a !== u) {
            var d = a !== t,
              b = a === null,
              P = a === a,
              V = Rn(a),
              W = u !== t,
              z = u === null,
              Z = u === u,
              he = Rn(u);
            if ((!z && !he && !V && a > u) || (V && W && Z && !z && !he) || (b && W && Z) || (!d && Z) || !P) return 1;
            if ((!b && !V && !he && a < u) || (he && d && P && !b && !V) || (z && d && P) || (!W && P) || !Z) return -1;
          }
          return 0;
        }
        function Lm(a, u, d) {
          for (var b = -1, P = a.criteria, V = u.criteria, W = P.length, z = d.length; ++b < W; ) {
            var Z = Vu(P[b], V[b]);
            if (Z) {
              if (b >= z) return Z;
              var he = d[b];
              return Z * (he == 'desc' ? -1 : 1);
            }
          }
          return a.index - u.index;
        }
        function Mu(a, u, d, b) {
          for (
            var P = -1, V = a.length, W = d.length, z = -1, Z = u.length, he = Zt(V - W, 0), ge = se(Z + he), me = !b;
            ++z < Z;

          )
            ge[z] = u[z];
          for (; ++P < W; ) (me || P < V) && (ge[d[P]] = a[P]);
          for (; he--; ) ge[z++] = a[P++];
          return ge;
        }
        function Ou(a, u, d, b) {
          for (
            var P = -1,
              V = a.length,
              W = -1,
              z = d.length,
              Z = -1,
              he = u.length,
              ge = Zt(V - z, 0),
              me = se(ge + he),
              Ae = !b;
            ++P < ge;

          )
            me[P] = a[P];
          for (var We = P; ++Z < he; ) me[We + Z] = u[Z];
          for (; ++W < z; ) (Ae || P < V) && (me[We + d[W]] = a[P++]);
          return me;
        }
        function wn(a, u) {
          var d = -1,
            b = a.length;
          for (u || (u = se(b)); ++d < b; ) u[d] = a[d];
          return u;
        }
        function fi(a, u, d, b) {
          var P = !d;
          d || (d = {});
          for (var V = -1, W = u.length; ++V < W; ) {
            var z = u[V],
              Z = b ? b(d[z], a[z], z, d, a) : t;
            Z === t && (Z = a[z]), P ? Ti(d, z, Z) : Fr(d, z, Z);
          }
          return d;
        }
        function Am(a, u) {
          return fi(a, no(a), u);
        }
        function Rm(a, u) {
          return fi(a, Qu(a), u);
        }
        function Ms(a, u) {
          return function(d, b) {
            var P = et(d) ? O_ : xp,
              V = u ? u() : {};
            return P(d, a, Je(b, 2), V);
          };
        }
        function Zl(a) {
          return st(function(u, d) {
            var b = -1,
              P = d.length,
              V = P > 1 ? d[P - 1] : t,
              W = P > 2 ? d[2] : t;
            for (
              V = a.length > 3 && typeof V == 'function' ? (P--, V) : t,
                W && gn(d[0], d[1], W) && ((V = P < 3 ? t : V), (P = 1)),
                u = Nt(u);
              ++b < P;

            ) {
              var z = d[b];
              z && a(u, z, b, V);
            }
            return u;
          });
        }
        function Fu(a, u) {
          return function(d, b) {
            if (d == null) return d;
            if (!kn(d)) return a(d, b);
            for (var P = d.length, V = u ? P : -1, W = Nt(d); (u ? V-- : ++V < P) && b(W[V], V, W) !== !1; );
            return d;
          };
        }
        function Uu(a) {
          return function(u, d, b) {
            for (var P = -1, V = Nt(u), W = b(u), z = W.length; z--; ) {
              var Z = W[a ? z : ++P];
              if (d(V[Z], Z, V) === !1) break;
            }
            return u;
          };
        }
        function Em(a, u, d) {
          var b = u & y,
            P = zr(a);
          function V() {
            var W = this && this !== Yt && this instanceof V ? P : a;
            return W.apply(b ? d : this, arguments);
          }
          return V;
        }
        function Bu(a) {
          return function(u) {
            u = kt(u);
            var d = ql(u) ? xn(u) : t,
              b = d ? d[0] : u.charAt(0),
              P = d ? il(d, 1).join('') : u.slice(1);
            return b[a]() + P;
          };
        }
        function Xl(a) {
          return function(u) {
            return wa(Uf(Ff(u).replace(_t, '')), a, '');
          };
        }
        function zr(a) {
          return function() {
            var u = arguments;
            switch (u.length) {
              case 0:
                return new a();
              case 1:
                return new a(u[0]);
              case 2:
                return new a(u[0], u[1]);
              case 3:
                return new a(u[0], u[1], u[2]);
              case 4:
                return new a(u[0], u[1], u[2], u[3]);
              case 5:
                return new a(u[0], u[1], u[2], u[3], u[4]);
              case 6:
                return new a(u[0], u[1], u[2], u[3], u[4], u[5]);
              case 7:
                return new a(u[0], u[1], u[2], u[3], u[4], u[5], u[6]);
            }
            var d = Ql(a.prototype),
              b = a.apply(d, u);
            return Bt(b) ? b : d;
          };
        }
        function Dm(a, u, d) {
          var b = zr(a);
          function P() {
            for (var V = arguments.length, W = se(V), z = V, Z = $l(P); z--; ) W[z] = arguments[z];
            var he = V < 3 && W[0] !== Z && W[V - 1] !== Z ? [] : $i(W, Z);
            if (((V -= he.length), V < d)) return Gu(a, u, Os, P.placeholder, t, W, he, t, t, d - V);
            var ge = this && this !== Yt && this instanceof P ? b : a;
            return Tn(ge, this, W);
          }
          return P;
        }
        function Wu(a) {
          return function(u, d, b) {
            var P = Nt(u);
            if (!kn(u)) {
              var V = Je(d, 3);
              (u = xt(u)),
                (d = function(z) {
                  return V(P[z], z, P);
                });
            }
            var W = a(u, d, b);
            return W > -1 ? P[V ? u[W] : W] : t;
          };
        }
        function Hu(a) {
          return Ai(function(u) {
            var d = u.length,
              b = d,
              P = qn.prototype.thru;
            for (a && u.reverse(); b--; ) {
              var V = u[b];
              if (typeof V != 'function') throw new zn(s);
              if (P && !W && Ws(V) == 'wrapper') var W = new qn([], !0);
            }
            for (b = W ? b : d; ++b < d; ) {
              V = u[b];
              var z = Ws(V),
                Z = z == 'wrapper' ? eo(V) : t;
              Z && lo(Z[0]) && Z[1] == (M | N | I | F) && !Z[4].length && Z[9] == 1
                ? (W = W[Ws(Z[0])].apply(W, Z[3]))
                : (W = V.length == 1 && lo(V) ? W[z]() : W.thru(V));
            }
            return function() {
              var he = arguments,
                ge = he[0];
              if (W && he.length == 1 && et(ge)) return W.plant(ge).value();
              for (var me = 0, Ae = d ? u[me].apply(this, he) : ge; ++me < d; ) Ae = u[me].call(this, Ae);
              return Ae;
            };
          });
        }
        function Os(a, u, d, b, P, V, W, z, Z, he) {
          var ge = u & M,
            me = u & y,
            Ae = u & C,
            We = u & (N | D),
            Ye = u & O,
            lt = Ae ? t : zr(a);
          function Qe() {
            for (var ot = arguments.length, ft = se(ot), En = ot; En--; ) ft[En] = arguments[En];
            if (We)
              var _n = $l(Qe),
                Dn = K_(ft, _n);
            if ((b && (ft = Mu(ft, b, P, We)), V && (ft = Ou(ft, V, W, We)), (ot -= Dn), We && ot < he)) {
              var Gt = $i(ft, _n);
              return Gu(a, u, Os, Qe.placeholder, d, ft, Gt, z, Z, he - ot);
            }
            var ni = me ? d : this,
              Vi = Ae ? ni[a] : a;
            return (
              (ot = ft.length),
              z ? (ft = xm(ft, z)) : Ye && ot > 1 && ft.reverse(),
              ge && Z < ot && (ft.length = Z),
              this && this !== Yt && this instanceof Qe && (Vi = lt || zr(Vi)),
              Vi.apply(ni, ft)
            );
          }
          return Qe;
        }
        function zu(a, u) {
          return function(d, b) {
            return am(d, a, u(b), {});
          };
        }
        function Fs(a, u) {
          return function(d, b) {
            var P;
            if (d === t && b === t) return u;
            if ((d !== t && (P = d), b !== t)) {
              if (P === t) return b;
              typeof d == 'string' || typeof b == 'string' ? ((d = An(d)), (b = An(b))) : ((d = Iu(d)), (b = Iu(b))),
                (P = a(d, b));
            }
            return P;
          };
        }
        function Za(a) {
          return Ai(function(u) {
            return (
              (u = Vt(u, Ln(Je()))),
              st(function(d) {
                var b = this;
                return a(u, function(P) {
                  return Tn(P, b, d);
                });
              })
            );
          });
        }
        function Us(a, u) {
          u = u === t ? ' ' : An(u);
          var d = u.length;
          if (d < 2) return d ? qa(u, a) : u;
          var b = qa(u, ys(a / Gl(u)));
          return ql(u) ? il(xn(b), 0, a).join('') : b.slice(0, a);
        }
        function Vm(a, u, d, b) {
          var P = u & y,
            V = zr(a);
          function W() {
            for (
              var z = -1,
                Z = arguments.length,
                he = -1,
                ge = b.length,
                me = se(ge + Z),
                Ae = this && this !== Yt && this instanceof W ? V : a;
              ++he < ge;

            )
              me[he] = b[he];
            for (; Z--; ) me[he++] = arguments[++z];
            return Tn(Ae, P ? d : this, me);
          }
          return W;
        }
        function qu(a) {
          return function(u, d, b) {
            return (
              b && typeof b != 'number' && gn(u, d, b) && (d = b = t),
              (u = Di(u)),
              d === t ? ((d = u), (u = 0)) : (d = Di(d)),
              (b = b === t ? (u < d ? 1 : -1) : Di(b)),
              vm(u, d, b, a)
            );
          };
        }
        function Bs(a) {
          return function(u, d) {
            return (typeof u == 'string' && typeof d == 'string') || ((u = jn(u)), (d = jn(d))), a(u, d);
          };
        }
        function Gu(a, u, d, b, P, V, W, z, Z, he) {
          var ge = u & N,
            me = ge ? W : t,
            Ae = ge ? t : W,
            We = ge ? V : t,
            Ye = ge ? t : V;
          (u |= ge ? I : L), (u &= ~(ge ? L : I)), u & T || (u &= ~(y | C));
          var lt = [a, u, P, We, me, Ye, Ae, z, Z, he],
            Qe = d.apply(t, lt);
          return lo(a) && nf(Qe, lt), (Qe.placeholder = b), lf(Qe, a, u);
        }
        function Xa(a) {
          var u = Qt[a];
          return function(d, b) {
            if (((d = jn(d)), (b = b == null ? 0 : un(nt(b), 292)), b && iu(d))) {
              var P = (kt(d) + 'e').split('e'),
                V = u(P[0] + 'e' + (+P[1] + b));
              return (P = (kt(V) + 'e').split('e')), +(P[0] + 'e' + (+P[1] - b));
            }
            return u(d);
          };
        }
        var Mm =
          jl && 1 / gs(new jl([, -0]))[1] == ae
            ? function(a) {
                return new jl(a);
              }
            : wo;
        function Ku(a) {
          return function(u) {
            var d = fn(u);
            return d == Rt ? Ia(u) : d == jt ? $_(u) : G_(u, a(u));
          };
        }
        function Li(a, u, d, b, P, V, W, z) {
          var Z = u & C;
          if (!Z && typeof a != 'function') throw new zn(s);
          var he = b ? b.length : 0;
          if (
            (he || ((u &= ~(I | L)), (b = P = t)),
            (W = W === t ? W : Zt(nt(W), 0)),
            (z = z === t ? z : nt(z)),
            (he -= P ? P.length : 0),
            u & L)
          ) {
            var ge = b,
              me = P;
            b = P = t;
          }
          var Ae = Z ? t : eo(a),
            We = [a, u, d, b, P, ge, me, V, W, z];
          if (
            (Ae && Zm(We, Ae),
            (a = We[0]),
            (u = We[1]),
            (d = We[2]),
            (b = We[3]),
            (P = We[4]),
            (z = We[9] = We[9] === t ? (Z ? 0 : a.length) : Zt(We[9] - he, 0)),
            !z && u & (N | D) && (u &= ~(N | D)),
            !u || u == y)
          )
            var Ye = Em(a, u, d);
          else
            u == N || u == D
              ? (Ye = Dm(a, u, z))
              : (u == I || u == (y | I)) && !P.length
              ? (Ye = Vm(a, u, d, b))
              : (Ye = Os.apply(t, We));
          var lt = Ae ? Pu : nf;
          return lf(lt(Ye, We), a, u);
        }
        function Ju(a, u, d, b) {
          return a === t || (ti(a, Jl[d]) && !Ct.call(b, d)) ? u : a;
        }
        function ju(a, u, d, b, P, V) {
          return Bt(a) && Bt(u) && (V.set(u, a), Es(a, u, t, ju, V), V.delete(u)), a;
        }
        function Om(a) {
          return Kr(a) ? t : a;
        }
        function Yu(a, u, d, b, P, V) {
          var W = d & v,
            z = a.length,
            Z = u.length;
          if (z != Z && !(W && Z > z)) return !1;
          var he = V.get(a),
            ge = V.get(u);
          if (he && ge) return he == u && ge == a;
          var me = -1,
            Ae = !0,
            We = d & k ? new Cl() : t;
          for (V.set(a, u), V.set(u, a); ++me < z; ) {
            var Ye = a[me],
              lt = u[me];
            if (b) var Qe = W ? b(lt, Ye, me, u, a, V) : b(Ye, lt, me, a, u, V);
            if (Qe !== t) {
              if (Qe) continue;
              Ae = !1;
              break;
            }
            if (We) {
              if (
                !ka(u, function(ot, ft) {
                  if (!Rr(We, ft) && (Ye === ot || P(Ye, ot, d, b, V))) return We.push(ft);
                })
              ) {
                Ae = !1;
                break;
              }
            } else if (!(Ye === lt || P(Ye, lt, d, b, V))) {
              Ae = !1;
              break;
            }
          }
          return V.delete(a), V.delete(u), Ae;
        }
        function Fm(a, u, d, b, P, V, W) {
          switch (d) {
            case Bn:
              if (a.byteLength != u.byteLength || a.byteOffset != u.byteOffset) return !1;
              (a = a.buffer), (u = u.buffer);
            case nn:
              return !(a.byteLength != u.byteLength || !V(new ws(a), new ws(u)));
            case Re:
            case Le:
            case Un:
              return ti(+a, +u);
            case tt:
              return a.name == u.name && a.message == u.message;
            case $t:
            case Xn:
              return a == u + '';
            case Rt:
              var z = Ia;
            case jt:
              var Z = b & v;
              if ((z || (z = gs), a.size != u.size && !Z)) return !1;
              var he = W.get(a);
              if (he) return he == u;
              (b |= k), W.set(a, u);
              var ge = Yu(z(a), z(u), b, P, V, W);
              return W.delete(a), ge;
            case dt:
              if (Or) return Or.call(a) == Or.call(u);
          }
          return !1;
        }
        function Um(a, u, d, b, P, V) {
          var W = d & v,
            z = $a(a),
            Z = z.length,
            he = $a(u),
            ge = he.length;
          if (Z != ge && !W) return !1;
          for (var me = Z; me--; ) {
            var Ae = z[me];
            if (!(W ? Ae in u : Ct.call(u, Ae))) return !1;
          }
          var We = V.get(a),
            Ye = V.get(u);
          if (We && Ye) return We == u && Ye == a;
          var lt = !0;
          V.set(a, u), V.set(u, a);
          for (var Qe = W; ++me < Z; ) {
            Ae = z[me];
            var ot = a[Ae],
              ft = u[Ae];
            if (b) var En = W ? b(ft, ot, Ae, u, a, V) : b(ot, ft, Ae, a, u, V);
            if (!(En === t ? ot === ft || P(ot, ft, d, b, V) : En)) {
              lt = !1;
              break;
            }
            Qe || (Qe = Ae == 'constructor');
          }
          if (lt && !Qe) {
            var _n = a.constructor,
              Dn = u.constructor;
            _n != Dn &&
              'constructor' in a &&
              'constructor' in u &&
              !(typeof _n == 'function' && _n instanceof _n && typeof Dn == 'function' && Dn instanceof Dn) &&
              (lt = !1);
          }
          return V.delete(a), V.delete(u), lt;
        }
        function Ai(a) {
          return so(ef(a, t, ff), a + '');
        }
        function $a(a) {
          return gu(a, xt, no);
        }
        function xa(a) {
          return gu(a, Sn, Qu);
        }
        var eo = Ns
          ? function(a) {
              return Ns.get(a);
            }
          : wo;
        function Ws(a) {
          for (var u = a.name + '', d = Yl[u], b = Ct.call(Yl, u) ? d.length : 0; b--; ) {
            var P = d[b],
              V = P.func;
            if (V == null || V == a) return P.name;
          }
          return u;
        }
        function $l(a) {
          var u = Ct.call(E, 'placeholder') ? E : a;
          return u.placeholder;
        }
        function Je() {
          var a = E.iteratee || bo;
          return (a = a === bo ? mu : a), arguments.length ? a(arguments[0], arguments[1]) : a;
        }
        function Hs(a, u) {
          var d = a.__data__;
          return Jm(u) ? d[typeof u == 'string' ? 'string' : 'hash'] : d.map;
        }
        function to(a) {
          for (var u = xt(a), d = u.length; d--; ) {
            var b = u[d],
              P = a[b];
            u[d] = [b, P, $u(P)];
          }
          return u;
        }
        function Nl(a, u) {
          var d = Q_(a, u);
          return pu(d) ? d : t;
        }
        function Bm(a) {
          var u = Ct.call(a, kl),
            d = a[kl];
          try {
            a[kl] = t;
            var b = !0;
          } catch {}
          var P = bs.call(a);
          return b && (u ? (a[kl] = d) : delete a[kl]), P;
        }
        var no = La
            ? function(a) {
                return a == null
                  ? []
                  : ((a = Nt(a)),
                    Zi(La(a), function(u) {
                      return tu.call(a, u);
                    }));
              }
            : ko,
          Qu = La
            ? function(a) {
                for (var u = []; a; ) Xi(u, no(a)), (a = ks(a));
                return u;
              }
            : ko,
          fn = hn;
        ((Aa && fn(new Aa(new ArrayBuffer(1))) != Bn) ||
          (Dr && fn(new Dr()) != Rt) ||
          (Ra && fn(Ra.resolve()) != bi) ||
          (jl && fn(new jl()) != jt) ||
          (Vr && fn(new Vr()) != $n)) &&
          (fn = function(a) {
            var u = hn(a),
              d = u == zt ? a.constructor : t,
              b = d ? Il(d) : '';
            if (b)
              switch (b) {
                case kp:
                  return Bn;
                case Sp:
                  return Rt;
                case Cp:
                  return bi;
                case yp:
                  return jt;
                case Pp:
                  return $n;
              }
            return u;
          });
        function Wm(a, u, d) {
          for (var b = -1, P = d.length; ++b < P; ) {
            var V = d[b],
              W = V.size;
            switch (V.type) {
              case 'drop':
                a += W;
                break;
              case 'dropRight':
                u -= W;
                break;
              case 'take':
                u = un(u, a + W);
                break;
              case 'takeRight':
                a = Zt(a, u - W);
                break;
            }
          }
          return { start: a, end: u };
        }
        function Hm(a) {
          var u = a.match(Vl);
          return u ? u[1].split(Ml) : [];
        }
        function Zu(a, u, d) {
          u = nl(u, a);
          for (var b = -1, P = u.length, V = !1; ++b < P; ) {
            var W = ci(u[b]);
            if (!(V = a != null && d(a, W))) break;
            a = a[W];
          }
          return V || ++b != P ? V : ((P = a == null ? 0 : a.length), !!P && Ys(P) && Ri(W, P) && (et(a) || Tl(a)));
        }
        function zm(a) {
          var u = a.length,
            d = new a.constructor(u);
          return u && typeof a[0] == 'string' && Ct.call(a, 'index') && ((d.index = a.index), (d.input = a.input)), d;
        }
        function Xu(a) {
          return typeof a.constructor == 'function' && !qr(a) ? Ql(ks(a)) : {};
        }
        function qm(a, u, d) {
          var b = a.constructor;
          switch (u) {
            case nn:
              return Qa(a);
            case Re:
            case Le:
              return new b(+a);
            case Bn:
              return Nm(a, d);
            case vi:
            case ln:
            case te:
            case Ve:
            case gt:
            case yt:
            case Pt:
            case wt:
            case an:
              return Du(a, d);
            case Rt:
              return new b();
            case Un:
            case Xn:
              return new b(a);
            case $t:
              return Im(a);
            case jt:
              return new b();
            case dt:
              return Tm(a);
          }
        }
        function Gm(a, u) {
          var d = u.length;
          if (!d) return a;
          var b = d - 1;
          return (
            (u[b] = (d > 1 ? '& ' : '') + u[b]),
            (u = u.join(d > 2 ? ', ' : ' ')),
            a.replace(
              Dl,
              `{
/* [wrapped with ` +
                u +
                `] */
`
            )
          );
        }
        function Km(a) {
          return et(a) || Tl(a) || !!(nu && a && a[nu]);
        }
        function Ri(a, u) {
          var d = typeof a;
          return (
            (u = u == null ? $ : u),
            !!u && (d == 'number' || (d != 'symbol' && ml.test(a))) && a > -1 && a % 1 == 0 && a < u
          );
        }
        function gn(a, u, d) {
          if (!Bt(d)) return !1;
          var b = typeof u;
          return (b == 'number' ? kn(d) && Ri(u, d.length) : b == 'string' && u in d) ? ti(d[u], a) : !1;
        }
        function io(a, u) {
          if (et(a)) return !1;
          var d = typeof a;
          return d == 'number' || d == 'symbol' || d == 'boolean' || a == null || Rn(a)
            ? !0
            : br.test(a) || !mr.test(a) || (u != null && a in Nt(u));
        }
        function Jm(a) {
          var u = typeof a;
          return u == 'string' || u == 'number' || u == 'symbol' || u == 'boolean' ? a !== '__proto__' : a === null;
        }
        function lo(a) {
          var u = Ws(a),
            d = E[u];
          if (typeof d != 'function' || !(u in ut.prototype)) return !1;
          if (a === d) return !0;
          var b = eo(d);
          return !!b && a === b[0];
        }
        function jm(a) {
          return !!$o && $o in a;
        }
        var Ym = ps ? Ei : So;
        function qr(a) {
          var u = a && a.constructor,
            d = (typeof u == 'function' && u.prototype) || Jl;
          return a === d;
        }
        function $u(a) {
          return a === a && !Bt(a);
        }
        function xu(a, u) {
          return function(d) {
            return d == null ? !1 : d[a] === u && (u !== t || a in Nt(d));
          };
        }
        function Qm(a) {
          var u = Js(a, function(b) {
              return d.size === g && d.clear(), b;
            }),
            d = u.cache;
          return u;
        }
        function Zm(a, u) {
          var d = a[1],
            b = u[1],
            P = d | b,
            V = P < (y | C | M),
            W =
              (b == M && d == N) ||
              (b == M && d == F && a[7].length <= u[8]) ||
              (b == (M | F) && u[7].length <= u[8] && d == N);
          if (!(V || W)) return a;
          b & y && ((a[2] = u[2]), (P |= d & y ? 0 : T));
          var z = u[3];
          if (z) {
            var Z = a[3];
            (a[3] = Z ? Mu(Z, z, u[4]) : z), (a[4] = Z ? $i(a[3], h) : u[4]);
          }
          return (
            (z = u[5]),
            z && ((Z = a[5]), (a[5] = Z ? Ou(Z, z, u[6]) : z), (a[6] = Z ? $i(a[5], h) : u[6])),
            (z = u[7]),
            z && (a[7] = z),
            b & M && (a[8] = a[8] == null ? u[8] : un(a[8], u[8])),
            a[9] == null && (a[9] = u[9]),
            (a[0] = u[0]),
            (a[1] = P),
            a
          );
        }
        function Xm(a) {
          var u = [];
          if (a != null) for (var d in Nt(a)) u.push(d);
          return u;
        }
        function $m(a) {
          return bs.call(a);
        }
        function ef(a, u, d) {
          return (
            (u = Zt(u === t ? a.length - 1 : u, 0)),
            function() {
              for (var b = arguments, P = -1, V = Zt(b.length - u, 0), W = se(V); ++P < V; ) W[P] = b[u + P];
              P = -1;
              for (var z = se(u + 1); ++P < u; ) z[P] = b[P];
              return (z[u] = d(W)), Tn(a, this, z);
            }
          );
        }
        function tf(a, u) {
          return u.length < 2 ? a : Pl(a, Kn(u, 0, -1));
        }
        function xm(a, u) {
          for (var d = a.length, b = un(u.length, d), P = wn(a); b--; ) {
            var V = u[b];
            a[b] = Ri(V, d) ? P[V] : t;
          }
          return a;
        }
        function ro(a, u) {
          if (!(u === 'constructor' && typeof a[u] == 'function') && u != '__proto__') return a[u];
        }
        var nf = rf(Pu),
          Gr =
            gp ||
            function(a, u) {
              return Yt.setTimeout(a, u);
            },
          so = rf(Sm);
        function lf(a, u, d) {
          var b = u + '';
          return so(a, Gm(b, e1(Hm(b), d)));
        }
        function rf(a) {
          var u = 0,
            d = 0;
          return function() {
            var b = bp(),
              P = Q - (b - d);
            if (((d = b), P > 0)) {
              if (++u >= X) return arguments[0];
            } else u = 0;
            return a.apply(t, arguments);
          };
        }
        function zs(a, u) {
          var d = -1,
            b = a.length,
            P = b - 1;
          for (u = u === t ? b : u; ++d < u; ) {
            var V = za(d, P),
              W = a[V];
            (a[V] = a[d]), (a[d] = W);
          }
          return (a.length = u), a;
        }
        var sf = Qm(function(a) {
          var u = [];
          return (
            a.charCodeAt(0) === 46 && u.push(''),
            a.replace(vr, function(d, b, P, V) {
              u.push(P ? V.replace(dl, '$1') : b || d);
            }),
            u
          );
        });
        function ci(a) {
          if (typeof a == 'string' || Rn(a)) return a;
          var u = a + '';
          return u == '0' && 1 / a == -ae ? '-0' : u;
        }
        function Il(a) {
          if (a != null) {
            try {
              return ms.call(a);
            } catch {}
            try {
              return a + '';
            } catch {}
          }
          return '';
        }
        function e1(a, u) {
          return (
            Hn(be, function(d) {
              var b = '_.' + d[0];
              u & d[1] && !ds(a, b) && a.push(b);
            }),
            a.sort()
          );
        }
        function af(a) {
          if (a instanceof ut) return a.clone();
          var u = new qn(a.__wrapped__, a.__chain__);
          return (u.__actions__ = wn(a.__actions__)), (u.__index__ = a.__index__), (u.__values__ = a.__values__), u;
        }
        function t1(a, u, d) {
          (d ? gn(a, u, d) : u === t) ? (u = 1) : (u = Zt(nt(u), 0));
          var b = a == null ? 0 : a.length;
          if (!b || u < 1) return [];
          for (var P = 0, V = 0, W = se(ys(b / u)); P < b; ) W[V++] = Kn(a, P, (P += u));
          return W;
        }
        function n1(a) {
          for (var u = -1, d = a == null ? 0 : a.length, b = 0, P = []; ++u < d; ) {
            var V = a[u];
            V && (P[b++] = V);
          }
          return P;
        }
        function i1() {
          var a = arguments.length;
          if (!a) return [];
          for (var u = se(a - 1), d = arguments[0], b = a; b--; ) u[b - 1] = arguments[b];
          return Xi(et(d) ? wn(d) : [d], sn(u, 1));
        }
        var l1 = st(function(a, u) {
            return qt(a) ? Ur(a, sn(u, 1, qt, !0)) : [];
          }),
          r1 = st(function(a, u) {
            var d = Jn(u);
            return qt(d) && (d = t), qt(a) ? Ur(a, sn(u, 1, qt, !0), Je(d, 2)) : [];
          }),
          s1 = st(function(a, u) {
            var d = Jn(u);
            return qt(d) && (d = t), qt(a) ? Ur(a, sn(u, 1, qt, !0), t, d) : [];
          });
        function a1(a, u, d) {
          var b = a == null ? 0 : a.length;
          return b ? ((u = d || u === t ? 1 : nt(u)), Kn(a, u < 0 ? 0 : u, b)) : [];
        }
        function o1(a, u, d) {
          var b = a == null ? 0 : a.length;
          return b ? ((u = d || u === t ? 1 : nt(u)), (u = b - u), Kn(a, 0, u < 0 ? 0 : u)) : [];
        }
        function u1(a, u) {
          return a && a.length ? Vs(a, Je(u, 3), !0, !0) : [];
        }
        function f1(a, u) {
          return a && a.length ? Vs(a, Je(u, 3), !0) : [];
        }
        function c1(a, u, d, b) {
          var P = a == null ? 0 : a.length;
          return P ? (d && typeof d != 'number' && gn(a, u, d) && ((d = 0), (b = P)), im(a, u, d, b)) : [];
        }
        function of(a, u, d) {
          var b = a == null ? 0 : a.length;
          if (!b) return -1;
          var P = d == null ? 0 : nt(d);
          return P < 0 && (P = Zt(b + P, 0)), hs(a, Je(u, 3), P);
        }
        function uf(a, u, d) {
          var b = a == null ? 0 : a.length;
          if (!b) return -1;
          var P = b - 1;
          return d !== t && ((P = nt(d)), (P = d < 0 ? Zt(b + P, 0) : un(P, b - 1))), hs(a, Je(u, 3), P, !0);
        }
        function ff(a) {
          var u = a == null ? 0 : a.length;
          return u ? sn(a, 1) : [];
        }
        function d1(a) {
          var u = a == null ? 0 : a.length;
          return u ? sn(a, ae) : [];
        }
        function h1(a, u) {
          var d = a == null ? 0 : a.length;
          return d ? ((u = u === t ? 1 : nt(u)), sn(a, u)) : [];
        }
        function g1(a) {
          for (var u = -1, d = a == null ? 0 : a.length, b = {}; ++u < d; ) {
            var P = a[u];
            b[P[0]] = P[1];
          }
          return b;
        }
        function cf(a) {
          return a && a.length ? a[0] : t;
        }
        function _1(a, u, d) {
          var b = a == null ? 0 : a.length;
          if (!b) return -1;
          var P = d == null ? 0 : nt(d);
          return P < 0 && (P = Zt(b + P, 0)), zl(a, u, P);
        }
        function p1(a) {
          var u = a == null ? 0 : a.length;
          return u ? Kn(a, 0, -1) : [];
        }
        var m1 = st(function(a) {
            var u = Vt(a, ja);
            return u.length && u[0] === a[0] ? Fa(u) : [];
          }),
          b1 = st(function(a) {
            var u = Jn(a),
              d = Vt(a, ja);
            return u === Jn(d) ? (u = t) : d.pop(), d.length && d[0] === a[0] ? Fa(d, Je(u, 2)) : [];
          }),
          v1 = st(function(a) {
            var u = Jn(a),
              d = Vt(a, ja);
            return (u = typeof u == 'function' ? u : t), u && d.pop(), d.length && d[0] === a[0] ? Fa(d, t, u) : [];
          });
        function w1(a, u) {
          return a == null ? '' : pp.call(a, u);
        }
        function Jn(a) {
          var u = a == null ? 0 : a.length;
          return u ? a[u - 1] : t;
        }
        function k1(a, u, d) {
          var b = a == null ? 0 : a.length;
          if (!b) return -1;
          var P = b;
          return (
            d !== t && ((P = nt(d)), (P = P < 0 ? Zt(b + P, 0) : un(P, b - 1))),
            u === u ? ep(a, u, P) : hs(a, Go, P, !0)
          );
        }
        function S1(a, u) {
          return a && a.length ? ku(a, nt(u)) : t;
        }
        var C1 = st(df);
        function df(a, u) {
          return a && a.length && u && u.length ? Ha(a, u) : a;
        }
        function y1(a, u, d) {
          return a && a.length && u && u.length ? Ha(a, u, Je(d, 2)) : a;
        }
        function P1(a, u, d) {
          return a && a.length && u && u.length ? Ha(a, u, t, d) : a;
        }
        var N1 = Ai(function(a, u) {
          var d = a == null ? 0 : a.length,
            b = Da(a, u);
          return (
            yu(
              a,
              Vt(u, function(P) {
                return Ri(P, d) ? +P : P;
              }).sort(Vu)
            ),
            b
          );
        });
        function I1(a, u) {
          var d = [];
          if (!(a && a.length)) return d;
          var b = -1,
            P = [],
            V = a.length;
          for (u = Je(u, 3); ++b < V; ) {
            var W = a[b];
            u(W, b, a) && (d.push(W), P.push(b));
          }
          return yu(a, P), d;
        }
        function ao(a) {
          return a == null ? a : wp.call(a);
        }
        function T1(a, u, d) {
          var b = a == null ? 0 : a.length;
          return b
            ? (d && typeof d != 'number' && gn(a, u, d)
                ? ((u = 0), (d = b))
                : ((u = u == null ? 0 : nt(u)), (d = d === t ? b : nt(d))),
              Kn(a, u, d))
            : [];
        }
        function L1(a, u) {
          return Ds(a, u);
        }
        function A1(a, u, d) {
          return Ga(a, u, Je(d, 2));
        }
        function R1(a, u) {
          var d = a == null ? 0 : a.length;
          if (d) {
            var b = Ds(a, u);
            if (b < d && ti(a[b], u)) return b;
          }
          return -1;
        }
        function E1(a, u) {
          return Ds(a, u, !0);
        }
        function D1(a, u, d) {
          return Ga(a, u, Je(d, 2), !0);
        }
        function V1(a, u) {
          var d = a == null ? 0 : a.length;
          if (d) {
            var b = Ds(a, u, !0) - 1;
            if (ti(a[b], u)) return b;
          }
          return -1;
        }
        function M1(a) {
          return a && a.length ? Nu(a) : [];
        }
        function O1(a, u) {
          return a && a.length ? Nu(a, Je(u, 2)) : [];
        }
        function F1(a) {
          var u = a == null ? 0 : a.length;
          return u ? Kn(a, 1, u) : [];
        }
        function U1(a, u, d) {
          return a && a.length ? ((u = d || u === t ? 1 : nt(u)), Kn(a, 0, u < 0 ? 0 : u)) : [];
        }
        function B1(a, u, d) {
          var b = a == null ? 0 : a.length;
          return b ? ((u = d || u === t ? 1 : nt(u)), (u = b - u), Kn(a, u < 0 ? 0 : u, b)) : [];
        }
        function W1(a, u) {
          return a && a.length ? Vs(a, Je(u, 3), !1, !0) : [];
        }
        function H1(a, u) {
          return a && a.length ? Vs(a, Je(u, 3)) : [];
        }
        var z1 = st(function(a) {
            return tl(sn(a, 1, qt, !0));
          }),
          q1 = st(function(a) {
            var u = Jn(a);
            return qt(u) && (u = t), tl(sn(a, 1, qt, !0), Je(u, 2));
          }),
          G1 = st(function(a) {
            var u = Jn(a);
            return (u = typeof u == 'function' ? u : t), tl(sn(a, 1, qt, !0), t, u);
          });
        function K1(a) {
          return a && a.length ? tl(a) : [];
        }
        function J1(a, u) {
          return a && a.length ? tl(a, Je(u, 2)) : [];
        }
        function j1(a, u) {
          return (u = typeof u == 'function' ? u : t), a && a.length ? tl(a, t, u) : [];
        }
        function oo(a) {
          if (!(a && a.length)) return [];
          var u = 0;
          return (
            (a = Zi(a, function(d) {
              if (qt(d)) return (u = Zt(d.length, u)), !0;
            })),
            Pa(u, function(d) {
              return Vt(a, Sa(d));
            })
          );
        }
        function hf(a, u) {
          if (!(a && a.length)) return [];
          var d = oo(a);
          return u == null
            ? d
            : Vt(d, function(b) {
                return Tn(u, t, b);
              });
        }
        var Y1 = st(function(a, u) {
            return qt(a) ? Ur(a, u) : [];
          }),
          Q1 = st(function(a) {
            return Ja(Zi(a, qt));
          }),
          Z1 = st(function(a) {
            var u = Jn(a);
            return qt(u) && (u = t), Ja(Zi(a, qt), Je(u, 2));
          }),
          X1 = st(function(a) {
            var u = Jn(a);
            return (u = typeof u == 'function' ? u : t), Ja(Zi(a, qt), t, u);
          }),
          $1 = st(oo);
        function x1(a, u) {
          return Au(a || [], u || [], Fr);
        }
        function eb(a, u) {
          return Au(a || [], u || [], Hr);
        }
        var tb = st(function(a) {
          var u = a.length,
            d = u > 1 ? a[u - 1] : t;
          return (d = typeof d == 'function' ? (a.pop(), d) : t), hf(a, d);
        });
        function gf(a) {
          var u = E(a);
          return (u.__chain__ = !0), u;
        }
        function nb(a, u) {
          return u(a), a;
        }
        function qs(a, u) {
          return u(a);
        }
        var ib = Ai(function(a) {
          var u = a.length,
            d = u ? a[0] : 0,
            b = this.__wrapped__,
            P = function(V) {
              return Da(V, a);
            };
          return u > 1 || this.__actions__.length || !(b instanceof ut) || !Ri(d)
            ? this.thru(P)
            : ((b = b.slice(d, +d + (u ? 1 : 0))),
              b.__actions__.push({ func: qs, args: [P], thisArg: t }),
              new qn(b, this.__chain__).thru(function(V) {
                return u && !V.length && V.push(t), V;
              }));
        });
        function lb() {
          return gf(this);
        }
        function rb() {
          return new qn(this.value(), this.__chain__);
        }
        function sb() {
          this.__values__ === t && (this.__values__ = Tf(this.value()));
          var a = this.__index__ >= this.__values__.length,
            u = a ? t : this.__values__[this.__index__++];
          return { done: a, value: u };
        }
        function ab() {
          return this;
        }
        function ob(a) {
          for (var u, d = this; d instanceof Ts; ) {
            var b = af(d);
            (b.__index__ = 0), (b.__values__ = t), u ? (P.__wrapped__ = b) : (u = b);
            var P = b;
            d = d.__wrapped__;
          }
          return (P.__wrapped__ = a), u;
        }
        function ub() {
          var a = this.__wrapped__;
          if (a instanceof ut) {
            var u = a;
            return (
              this.__actions__.length && (u = new ut(this)),
              (u = u.reverse()),
              u.__actions__.push({ func: qs, args: [ao], thisArg: t }),
              new qn(u, this.__chain__)
            );
          }
          return this.thru(ao);
        }
        function fb() {
          return Lu(this.__wrapped__, this.__actions__);
        }
        var cb = Ms(function(a, u, d) {
          Ct.call(a, d) ? ++a[d] : Ti(a, d, 1);
        });
        function db(a, u, d) {
          var b = et(a) ? zo : nm;
          return d && gn(a, u, d) && (u = t), b(a, Je(u, 3));
        }
        function hb(a, u) {
          var d = et(a) ? Zi : du;
          return d(a, Je(u, 3));
        }
        var gb = Wu(of),
          _b = Wu(uf);
        function pb(a, u) {
          return sn(Gs(a, u), 1);
        }
        function mb(a, u) {
          return sn(Gs(a, u), ae);
        }
        function bb(a, u, d) {
          return (d = d === t ? 1 : nt(d)), sn(Gs(a, u), d);
        }
        function _f(a, u) {
          var d = et(a) ? Hn : el;
          return d(a, Je(u, 3));
        }
        function pf(a, u) {
          var d = et(a) ? F_ : cu;
          return d(a, Je(u, 3));
        }
        var vb = Ms(function(a, u, d) {
          Ct.call(a, d) ? a[d].push(u) : Ti(a, d, [u]);
        });
        function wb(a, u, d, b) {
          (a = kn(a) ? a : er(a)), (d = d && !b ? nt(d) : 0);
          var P = a.length;
          return d < 0 && (d = Zt(P + d, 0)), Qs(a) ? d <= P && a.indexOf(u, d) > -1 : !!P && zl(a, u, d) > -1;
        }
        var kb = st(function(a, u, d) {
            var b = -1,
              P = typeof u == 'function',
              V = kn(a) ? se(a.length) : [];
            return (
              el(a, function(W) {
                V[++b] = P ? Tn(u, W, d) : Br(W, u, d);
              }),
              V
            );
          }),
          Sb = Ms(function(a, u, d) {
            Ti(a, d, u);
          });
        function Gs(a, u) {
          var d = et(a) ? Vt : bu;
          return d(a, Je(u, 3));
        }
        function Cb(a, u, d, b) {
          return a == null
            ? []
            : (et(u) || (u = u == null ? [] : [u]), (d = b ? t : d), et(d) || (d = d == null ? [] : [d]), Su(a, u, d));
        }
        var yb = Ms(
          function(a, u, d) {
            a[d ? 0 : 1].push(u);
          },
          function() {
            return [[], []];
          }
        );
        function Pb(a, u, d) {
          var b = et(a) ? wa : Jo,
            P = arguments.length < 3;
          return b(a, Je(u, 4), d, P, el);
        }
        function Nb(a, u, d) {
          var b = et(a) ? U_ : Jo,
            P = arguments.length < 3;
          return b(a, Je(u, 4), d, P, cu);
        }
        function Ib(a, u) {
          var d = et(a) ? Zi : du;
          return d(a, js(Je(u, 3)));
        }
        function Tb(a) {
          var u = et(a) ? au : wm;
          return u(a);
        }
        function Lb(a, u, d) {
          (d ? gn(a, u, d) : u === t) ? (u = 1) : (u = nt(u));
          var b = et(a) ? Xp : km;
          return b(a, u);
        }
        function Ab(a) {
          var u = et(a) ? $p : Cm;
          return u(a);
        }
        function Rb(a) {
          if (a == null) return 0;
          if (kn(a)) return Qs(a) ? Gl(a) : a.length;
          var u = fn(a);
          return u == Rt || u == jt ? a.size : Ba(a).length;
        }
        function Eb(a, u, d) {
          var b = et(a) ? ka : ym;
          return d && gn(a, u, d) && (u = t), b(a, Je(u, 3));
        }
        var Db = st(function(a, u) {
            if (a == null) return [];
            var d = u.length;
            return (
              d > 1 && gn(a, u[0], u[1]) ? (u = []) : d > 2 && gn(u[0], u[1], u[2]) && (u = [u[0]]), Su(a, sn(u, 1), [])
            );
          }),
          Ks =
            hp ||
            function() {
              return Yt.Date.now();
            };
        function Vb(a, u) {
          if (typeof u != 'function') throw new zn(s);
          return (
            (a = nt(a)),
            function() {
              if (--a < 1) return u.apply(this, arguments);
            }
          );
        }
        function mf(a, u, d) {
          return (u = d ? t : u), (u = a && u == null ? a.length : u), Li(a, M, t, t, t, t, u);
        }
        function bf(a, u) {
          var d;
          if (typeof u != 'function') throw new zn(s);
          return (
            (a = nt(a)),
            function() {
              return --a > 0 && (d = u.apply(this, arguments)), a <= 1 && (u = t), d;
            }
          );
        }
        var uo = st(function(a, u, d) {
            var b = y;
            if (d.length) {
              var P = $i(d, $l(uo));
              b |= I;
            }
            return Li(a, b, u, d, P);
          }),
          vf = st(function(a, u, d) {
            var b = y | C;
            if (d.length) {
              var P = $i(d, $l(vf));
              b |= I;
            }
            return Li(u, b, a, d, P);
          });
        function wf(a, u, d) {
          u = d ? t : u;
          var b = Li(a, N, t, t, t, t, t, u);
          return (b.placeholder = wf.placeholder), b;
        }
        function kf(a, u, d) {
          u = d ? t : u;
          var b = Li(a, D, t, t, t, t, t, u);
          return (b.placeholder = kf.placeholder), b;
        }
        function Sf(a, u, d) {
          var b,
            P,
            V,
            W,
            z,
            Z,
            he = 0,
            ge = !1,
            me = !1,
            Ae = !0;
          if (typeof a != 'function') throw new zn(s);
          (u = jn(u) || 0),
            Bt(d) &&
              ((ge = !!d.leading),
              (me = 'maxWait' in d),
              (V = me ? Zt(jn(d.maxWait) || 0, u) : V),
              (Ae = 'trailing' in d ? !!d.trailing : Ae));
          function We(Gt) {
            var ni = b,
              Vi = P;
            return (b = P = t), (he = Gt), (W = a.apply(Vi, ni)), W;
          }
          function Ye(Gt) {
            return (he = Gt), (z = Gr(ot, u)), ge ? We(Gt) : W;
          }
          function lt(Gt) {
            var ni = Gt - Z,
              Vi = Gt - he,
              Hf = u - ni;
            return me ? un(Hf, V - Vi) : Hf;
          }
          function Qe(Gt) {
            var ni = Gt - Z,
              Vi = Gt - he;
            return Z === t || ni >= u || ni < 0 || (me && Vi >= V);
          }
          function ot() {
            var Gt = Ks();
            if (Qe(Gt)) return ft(Gt);
            z = Gr(ot, lt(Gt));
          }
          function ft(Gt) {
            return (z = t), Ae && b ? We(Gt) : ((b = P = t), W);
          }
          function En() {
            z !== t && Ru(z), (he = 0), (b = Z = P = z = t);
          }
          function _n() {
            return z === t ? W : ft(Ks());
          }
          function Dn() {
            var Gt = Ks(),
              ni = Qe(Gt);
            if (((b = arguments), (P = this), (Z = Gt), ni)) {
              if (z === t) return Ye(Z);
              if (me) return Ru(z), (z = Gr(ot, u)), We(Z);
            }
            return z === t && (z = Gr(ot, u)), W;
          }
          return (Dn.cancel = En), (Dn.flush = _n), Dn;
        }
        var Mb = st(function(a, u) {
            return fu(a, 1, u);
          }),
          Ob = st(function(a, u, d) {
            return fu(a, jn(u) || 0, d);
          });
        function Fb(a) {
          return Li(a, O);
        }
        function Js(a, u) {
          if (typeof a != 'function' || (u != null && typeof u != 'function')) throw new zn(s);
          var d = function() {
            var b = arguments,
              P = u ? u.apply(this, b) : b[0],
              V = d.cache;
            if (V.has(P)) return V.get(P);
            var W = a.apply(this, b);
            return (d.cache = V.set(P, W) || V), W;
          };
          return (d.cache = new (Js.Cache || Ii)()), d;
        }
        Js.Cache = Ii;
        function js(a) {
          if (typeof a != 'function') throw new zn(s);
          return function() {
            var u = arguments;
            switch (u.length) {
              case 0:
                return !a.call(this);
              case 1:
                return !a.call(this, u[0]);
              case 2:
                return !a.call(this, u[0], u[1]);
              case 3:
                return !a.call(this, u[0], u[1], u[2]);
            }
            return !a.apply(this, u);
          };
        }
        function Ub(a) {
          return bf(2, a);
        }
        var Bb = Pm(function(a, u) {
            u = u.length == 1 && et(u[0]) ? Vt(u[0], Ln(Je())) : Vt(sn(u, 1), Ln(Je()));
            var d = u.length;
            return st(function(b) {
              for (var P = -1, V = un(b.length, d); ++P < V; ) b[P] = u[P].call(this, b[P]);
              return Tn(a, this, b);
            });
          }),
          fo = st(function(a, u) {
            var d = $i(u, $l(fo));
            return Li(a, I, t, u, d);
          }),
          Cf = st(function(a, u) {
            var d = $i(u, $l(Cf));
            return Li(a, L, t, u, d);
          }),
          Wb = Ai(function(a, u) {
            return Li(a, F, t, t, t, u);
          });
        function Hb(a, u) {
          if (typeof a != 'function') throw new zn(s);
          return (u = u === t ? u : nt(u)), st(a, u);
        }
        function zb(a, u) {
          if (typeof a != 'function') throw new zn(s);
          return (
            (u = u == null ? 0 : Zt(nt(u), 0)),
            st(function(d) {
              var b = d[u],
                P = il(d, 0, u);
              return b && Xi(P, b), Tn(a, this, P);
            })
          );
        }
        function qb(a, u, d) {
          var b = !0,
            P = !0;
          if (typeof a != 'function') throw new zn(s);
          return (
            Bt(d) && ((b = 'leading' in d ? !!d.leading : b), (P = 'trailing' in d ? !!d.trailing : P)),
            Sf(a, u, { leading: b, maxWait: u, trailing: P })
          );
        }
        function Gb(a) {
          return mf(a, 1);
        }
        function Kb(a, u) {
          return fo(Ya(u), a);
        }
        function Jb() {
          if (!arguments.length) return [];
          var a = arguments[0];
          return et(a) ? a : [a];
        }
        function jb(a) {
          return Gn(a, m);
        }
        function Yb(a, u) {
          return (u = typeof u == 'function' ? u : t), Gn(a, m, u);
        }
        function Qb(a) {
          return Gn(a, _ | m);
        }
        function Zb(a, u) {
          return (u = typeof u == 'function' ? u : t), Gn(a, _ | m, u);
        }
        function Xb(a, u) {
          return u == null || uu(a, u, xt(u));
        }
        function ti(a, u) {
          return a === u || (a !== a && u !== u);
        }
        var $b = Bs(Oa),
          xb = Bs(function(a, u) {
            return a >= u;
          }),
          Tl = _u(
            (function() {
              return arguments;
            })()
          )
            ? _u
            : function(a) {
                return Ht(a) && Ct.call(a, 'callee') && !tu.call(a, 'callee');
              },
          et = se.isArray,
          ev = Oo ? Ln(Oo) : om;
        function kn(a) {
          return a != null && Ys(a.length) && !Ei(a);
        }
        function qt(a) {
          return Ht(a) && kn(a);
        }
        function tv(a) {
          return a === !0 || a === !1 || (Ht(a) && hn(a) == Re);
        }
        var ll = _p || So,
          nv = Fo ? Ln(Fo) : um;
        function iv(a) {
          return Ht(a) && a.nodeType === 1 && !Kr(a);
        }
        function lv(a) {
          if (a == null) return !0;
          if (kn(a) && (et(a) || typeof a == 'string' || typeof a.splice == 'function' || ll(a) || xl(a) || Tl(a)))
            return !a.length;
          var u = fn(a);
          if (u == Rt || u == jt) return !a.size;
          if (qr(a)) return !Ba(a).length;
          for (var d in a) if (Ct.call(a, d)) return !1;
          return !0;
        }
        function rv(a, u) {
          return Wr(a, u);
        }
        function sv(a, u, d) {
          d = typeof d == 'function' ? d : t;
          var b = d ? d(a, u) : t;
          return b === t ? Wr(a, u, t, d) : !!b;
        }
        function co(a) {
          if (!Ht(a)) return !1;
          var u = hn(a);
          return u == tt || u == _e || (typeof a.message == 'string' && typeof a.name == 'string' && !Kr(a));
        }
        function av(a) {
          return typeof a == 'number' && iu(a);
        }
        function Ei(a) {
          if (!Bt(a)) return !1;
          var u = hn(a);
          return u == Ft || u == Jt || u == ie || u == Wi;
        }
        function yf(a) {
          return typeof a == 'number' && a == nt(a);
        }
        function Ys(a) {
          return typeof a == 'number' && a > -1 && a % 1 == 0 && a <= $;
        }
        function Bt(a) {
          var u = typeof a;
          return a != null && (u == 'object' || u == 'function');
        }
        function Ht(a) {
          return a != null && typeof a == 'object';
        }
        var Pf = Uo ? Ln(Uo) : cm;
        function ov(a, u) {
          return a === u || Ua(a, u, to(u));
        }
        function uv(a, u, d) {
          return (d = typeof d == 'function' ? d : t), Ua(a, u, to(u), d);
        }
        function fv(a) {
          return Nf(a) && a != +a;
        }
        function cv(a) {
          if (Ym(a)) throw new $e(r);
          return pu(a);
        }
        function dv(a) {
          return a === null;
        }
        function hv(a) {
          return a == null;
        }
        function Nf(a) {
          return typeof a == 'number' || (Ht(a) && hn(a) == Un);
        }
        function Kr(a) {
          if (!Ht(a) || hn(a) != zt) return !1;
          var u = ks(a);
          if (u === null) return !0;
          var d = Ct.call(u, 'constructor') && u.constructor;
          return typeof d == 'function' && d instanceof d && ms.call(d) == up;
        }
        var ho = Bo ? Ln(Bo) : dm;
        function gv(a) {
          return yf(a) && a >= -$ && a <= $;
        }
        var If = Wo ? Ln(Wo) : hm;
        function Qs(a) {
          return typeof a == 'string' || (!et(a) && Ht(a) && hn(a) == Xn);
        }
        function Rn(a) {
          return typeof a == 'symbol' || (Ht(a) && hn(a) == dt);
        }
        var xl = Ho ? Ln(Ho) : gm;
        function _v(a) {
          return a === t;
        }
        function pv(a) {
          return Ht(a) && fn(a) == $n;
        }
        function mv(a) {
          return Ht(a) && hn(a) == tn;
        }
        var bv = Bs(Wa),
          vv = Bs(function(a, u) {
            return a <= u;
          });
        function Tf(a) {
          if (!a) return [];
          if (kn(a)) return Qs(a) ? xn(a) : wn(a);
          if (Er && a[Er]) return X_(a[Er]());
          var u = fn(a),
            d = u == Rt ? Ia : u == jt ? gs : er;
          return d(a);
        }
        function Di(a) {
          if (!a) return a === 0 ? a : 0;
          if (((a = jn(a)), a === ae || a === -ae)) {
            var u = a < 0 ? -1 : 1;
            return u * K;
          }
          return a === a ? a : 0;
        }
        function nt(a) {
          var u = Di(a),
            d = u % 1;
          return u === u ? (d ? u - d : u) : 0;
        }
        function Lf(a) {
          return a ? yl(nt(a), 0, ve) : 0;
        }
        function jn(a) {
          if (typeof a == 'number') return a;
          if (Rn(a)) return le;
          if (Bt(a)) {
            var u = typeof a.valueOf == 'function' ? a.valueOf() : a;
            a = Bt(u) ? u + '' : u;
          }
          if (typeof a != 'string') return a === 0 ? a : +a;
          a = jo(a);
          var d = Gi.test(a);
          return d || pl.test(a) ? Hl(a.slice(2), d ? 2 : 8) : kr.test(a) ? le : +a;
        }
        function Af(a) {
          return fi(a, Sn(a));
        }
        function wv(a) {
          return a ? yl(nt(a), -$, $) : a === 0 ? a : 0;
        }
        function kt(a) {
          return a == null ? '' : An(a);
        }
        var kv = Zl(function(a, u) {
            if (qr(u) || kn(u)) {
              fi(u, xt(u), a);
              return;
            }
            for (var d in u) Ct.call(u, d) && Fr(a, d, u[d]);
          }),
          Rf = Zl(function(a, u) {
            fi(u, Sn(u), a);
          }),
          Zs = Zl(function(a, u, d, b) {
            fi(u, Sn(u), a, b);
          }),
          Sv = Zl(function(a, u, d, b) {
            fi(u, xt(u), a, b);
          }),
          Cv = Ai(Da);
        function yv(a, u) {
          var d = Ql(a);
          return u == null ? d : ou(d, u);
        }
        var Pv = st(function(a, u) {
            a = Nt(a);
            var d = -1,
              b = u.length,
              P = b > 2 ? u[2] : t;
            for (P && gn(u[0], u[1], P) && (b = 1); ++d < b; )
              for (var V = u[d], W = Sn(V), z = -1, Z = W.length; ++z < Z; ) {
                var he = W[z],
                  ge = a[he];
                (ge === t || (ti(ge, Jl[he]) && !Ct.call(a, he))) && (a[he] = V[he]);
              }
            return a;
          }),
          Nv = st(function(a) {
            return a.push(t, ju), Tn(Ef, t, a);
          });
        function Iv(a, u) {
          return qo(a, Je(u, 3), ui);
        }
        function Tv(a, u) {
          return qo(a, Je(u, 3), Ma);
        }
        function Lv(a, u) {
          return a == null ? a : Va(a, Je(u, 3), Sn);
        }
        function Av(a, u) {
          return a == null ? a : hu(a, Je(u, 3), Sn);
        }
        function Rv(a, u) {
          return a && ui(a, Je(u, 3));
        }
        function Ev(a, u) {
          return a && Ma(a, Je(u, 3));
        }
        function Dv(a) {
          return a == null ? [] : Rs(a, xt(a));
        }
        function Vv(a) {
          return a == null ? [] : Rs(a, Sn(a));
        }
        function go(a, u, d) {
          var b = a == null ? t : Pl(a, u);
          return b === t ? d : b;
        }
        function Mv(a, u) {
          return a != null && Zu(a, u, lm);
        }
        function _o(a, u) {
          return a != null && Zu(a, u, rm);
        }
        var Ov = zu(function(a, u, d) {
            u != null && typeof u.toString != 'function' && (u = bs.call(u)), (a[u] = d);
          }, mo(Cn)),
          Fv = zu(function(a, u, d) {
            u != null && typeof u.toString != 'function' && (u = bs.call(u)),
              Ct.call(a, u) ? a[u].push(d) : (a[u] = [d]);
          }, Je),
          Uv = st(Br);
        function xt(a) {
          return kn(a) ? su(a) : Ba(a);
        }
        function Sn(a) {
          return kn(a) ? su(a, !0) : _m(a);
        }
        function Bv(a, u) {
          var d = {};
          return (
            (u = Je(u, 3)),
            ui(a, function(b, P, V) {
              Ti(d, u(b, P, V), b);
            }),
            d
          );
        }
        function Wv(a, u) {
          var d = {};
          return (
            (u = Je(u, 3)),
            ui(a, function(b, P, V) {
              Ti(d, P, u(b, P, V));
            }),
            d
          );
        }
        var Hv = Zl(function(a, u, d) {
            Es(a, u, d);
          }),
          Ef = Zl(function(a, u, d, b) {
            Es(a, u, d, b);
          }),
          zv = Ai(function(a, u) {
            var d = {};
            if (a == null) return d;
            var b = !1;
            (u = Vt(u, function(V) {
              return (V = nl(V, a)), b || (b = V.length > 1), V;
            })),
              fi(a, xa(a), d),
              b && (d = Gn(d, _ | p | m, Om));
            for (var P = u.length; P--; ) Ka(d, u[P]);
            return d;
          });
        function qv(a, u) {
          return Df(a, js(Je(u)));
        }
        var Gv = Ai(function(a, u) {
          return a == null ? {} : mm(a, u);
        });
        function Df(a, u) {
          if (a == null) return {};
          var d = Vt(xa(a), function(b) {
            return [b];
          });
          return (
            (u = Je(u)),
            Cu(a, d, function(b, P) {
              return u(b, P[0]);
            })
          );
        }
        function Kv(a, u, d) {
          u = nl(u, a);
          var b = -1,
            P = u.length;
          for (P || ((P = 1), (a = t)); ++b < P; ) {
            var V = a == null ? t : a[ci(u[b])];
            V === t && ((b = P), (V = d)), (a = Ei(V) ? V.call(a) : V);
          }
          return a;
        }
        function Jv(a, u, d) {
          return a == null ? a : Hr(a, u, d);
        }
        function jv(a, u, d, b) {
          return (b = typeof b == 'function' ? b : t), a == null ? a : Hr(a, u, d, b);
        }
        var Vf = Ku(xt),
          Mf = Ku(Sn);
        function Yv(a, u, d) {
          var b = et(a),
            P = b || ll(a) || xl(a);
          if (((u = Je(u, 4)), d == null)) {
            var V = a && a.constructor;
            P ? (d = b ? new V() : []) : Bt(a) ? (d = Ei(V) ? Ql(ks(a)) : {}) : (d = {});
          }
          return (
            (P ? Hn : ui)(a, function(W, z, Z) {
              return u(d, W, z, Z);
            }),
            d
          );
        }
        function Qv(a, u) {
          return a == null ? !0 : Ka(a, u);
        }
        function Zv(a, u, d) {
          return a == null ? a : Tu(a, u, Ya(d));
        }
        function Xv(a, u, d, b) {
          return (b = typeof b == 'function' ? b : t), a == null ? a : Tu(a, u, Ya(d), b);
        }
        function er(a) {
          return a == null ? [] : Na(a, xt(a));
        }
        function $v(a) {
          return a == null ? [] : Na(a, Sn(a));
        }
        function xv(a, u, d) {
          return (
            d === t && ((d = u), (u = t)),
            d !== t && ((d = jn(d)), (d = d === d ? d : 0)),
            u !== t && ((u = jn(u)), (u = u === u ? u : 0)),
            yl(jn(a), u, d)
          );
        }
        function e0(a, u, d) {
          return (u = Di(u)), d === t ? ((d = u), (u = 0)) : (d = Di(d)), (a = jn(a)), sm(a, u, d);
        }
        function t0(a, u, d) {
          if (
            (d && typeof d != 'boolean' && gn(a, u, d) && (u = d = t),
            d === t && (typeof u == 'boolean' ? ((d = u), (u = t)) : typeof a == 'boolean' && ((d = a), (a = t))),
            a === t && u === t ? ((a = 0), (u = 1)) : ((a = Di(a)), u === t ? ((u = a), (a = 0)) : (u = Di(u))),
            a > u)
          ) {
            var b = a;
            (a = u), (u = b);
          }
          if (d || a % 1 || u % 1) {
            var P = lu();
            return un(a + P * (u - a + Lr('1e-' + ((P + '').length - 1))), u);
          }
          return za(a, u);
        }
        var n0 = Xl(function(a, u, d) {
          return (u = u.toLowerCase()), a + (d ? Of(u) : u);
        });
        function Of(a) {
          return po(kt(a).toLowerCase());
        }
        function Ff(a) {
          return (a = kt(a)), a && a.replace(Ol, J_).replace(Dt, '');
        }
        function i0(a, u, d) {
          (a = kt(a)), (u = An(u));
          var b = a.length;
          d = d === t ? b : yl(nt(d), 0, b);
          var P = d;
          return (d -= u.length), d >= 0 && a.slice(d, P) == u;
        }
        function l0(a) {
          return (a = kt(a)), a && gr.test(a) ? a.replace(wi, j_) : a;
        }
        function r0(a) {
          return (a = kt(a)), a && zi.test(a) ? a.replace(ki, '\\$&') : a;
        }
        var s0 = Xl(function(a, u, d) {
            return a + (d ? '-' : '') + u.toLowerCase();
          }),
          a0 = Xl(function(a, u, d) {
            return a + (d ? ' ' : '') + u.toLowerCase();
          }),
          o0 = Bu('toLowerCase');
        function u0(a, u, d) {
          (a = kt(a)), (u = nt(u));
          var b = u ? Gl(a) : 0;
          if (!u || b >= u) return a;
          var P = (u - b) / 2;
          return Us(Ps(P), d) + a + Us(ys(P), d);
        }
        function f0(a, u, d) {
          (a = kt(a)), (u = nt(u));
          var b = u ? Gl(a) : 0;
          return u && b < u ? a + Us(u - b, d) : a;
        }
        function c0(a, u, d) {
          (a = kt(a)), (u = nt(u));
          var b = u ? Gl(a) : 0;
          return u && b < u ? Us(u - b, d) + a : a;
        }
        function d0(a, u, d) {
          return d || u == null ? (u = 0) : u && (u = +u), vp(kt(a).replace(Si, ''), u || 0);
        }
        function h0(a, u, d) {
          return (d ? gn(a, u, d) : u === t) ? (u = 1) : (u = nt(u)), qa(kt(a), u);
        }
        function g0() {
          var a = arguments,
            u = kt(a[0]);
          return a.length < 3 ? u : u.replace(a[1], a[2]);
        }
        var _0 = Xl(function(a, u, d) {
          return a + (d ? '_' : '') + u.toLowerCase();
        });
        function p0(a, u, d) {
          return (
            d && typeof d != 'number' && gn(a, u, d) && (u = d = t),
            (d = d === t ? ve : d >>> 0),
            d
              ? ((a = kt(a)),
                a && (typeof u == 'string' || (u != null && !ho(u))) && ((u = An(u)), !u && ql(a))
                  ? il(xn(a), 0, d)
                  : a.split(u, d))
              : []
          );
        }
        var m0 = Xl(function(a, u, d) {
          return a + (d ? ' ' : '') + po(u);
        });
        function b0(a, u, d) {
          return (a = kt(a)), (d = d == null ? 0 : yl(nt(d), 0, a.length)), (u = An(u)), a.slice(d, d + u.length) == u;
        }
        function v0(a, u, d) {
          var b = E.templateSettings;
          d && gn(a, u, d) && (u = t), (a = kt(a)), (u = Zs({}, u, b, Ju));
          var P = Zs({}, u.imports, b.imports, Ju),
            V = xt(P),
            W = Na(P, V),
            z,
            Z,
            he = 0,
            ge = u.interpolate || Ci,
            me = "__p += '",
            Ae = Ta(
              (u.escape || Ci).source +
                '|' +
                ge.source +
                '|' +
                (ge === El ? hl : Ci).source +
                '|' +
                (u.evaluate || Ci).source +
                '|$',
              'g'
            ),
            We =
              '//# sourceURL=' +
              (Ct.call(u, 'sourceURL')
                ? (u.sourceURL + '').replace(/\s/g, ' ')
                : 'lodash.templateSources[' + ++qe + ']') +
              `
`;
          a.replace(Ae, function(Qe, ot, ft, En, _n, Dn) {
            return (
              ft || (ft = En),
              (me += a.slice(he, Dn).replace(St, Y_)),
              ot &&
                ((z = !0),
                (me +=
                  `' +
__e(` +
                  ot +
                  `) +
'`)),
              _n &&
                ((Z = !0),
                (me +=
                  `';
` +
                  _n +
                  `;
__p += '`)),
              ft &&
                (me +=
                  `' +
((__t = (` +
                  ft +
                  `)) == null ? '' : __t) +
'`),
              (he = Dn + Qe.length),
              Qe
            );
          }),
            (me += `';
`);
          var Ye = Ct.call(u, 'variable') && u.variable;
          if (!Ye)
            me =
              `with (obj) {
` +
              me +
              `
}
`;
          else if (mn.test(Ye)) throw new $e(o);
          (me = (Z ? me.replace(Nn, '') : me).replace(ri, '$1').replace(Hi, '$1;')),
            (me =
              'function(' +
              (Ye || 'obj') +
              `) {
` +
              (Ye
                ? ''
                : `obj || (obj = {});
`) +
              "var __t, __p = ''" +
              (z ? ', __e = _.escape' : '') +
              (Z
                ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`
                : `;
`) +
              me +
              `return __p
}`);
          var lt = Bf(function() {
            return pt(V, We + 'return ' + me).apply(t, W);
          });
          if (((lt.source = me), co(lt))) throw lt;
          return lt;
        }
        function w0(a) {
          return kt(a).toLowerCase();
        }
        function k0(a) {
          return kt(a).toUpperCase();
        }
        function S0(a, u, d) {
          if (((a = kt(a)), a && (d || u === t))) return jo(a);
          if (!a || !(u = An(u))) return a;
          var b = xn(a),
            P = xn(u),
            V = Yo(b, P),
            W = Qo(b, P) + 1;
          return il(b, V, W).join('');
        }
        function C0(a, u, d) {
          if (((a = kt(a)), a && (d || u === t))) return a.slice(0, Xo(a) + 1);
          if (!a || !(u = An(u))) return a;
          var b = xn(a),
            P = Qo(b, xn(u)) + 1;
          return il(b, 0, P).join('');
        }
        function y0(a, u, d) {
          if (((a = kt(a)), a && (d || u === t))) return a.replace(Si, '');
          if (!a || !(u = An(u))) return a;
          var b = xn(a),
            P = Yo(b, xn(u));
          return il(b, P).join('');
        }
        function P0(a, u) {
          var d = j,
            b = fe;
          if (Bt(u)) {
            var P = 'separator' in u ? u.separator : P;
            (d = 'length' in u ? nt(u.length) : d), (b = 'omission' in u ? An(u.omission) : b);
          }
          a = kt(a);
          var V = a.length;
          if (ql(a)) {
            var W = xn(a);
            V = W.length;
          }
          if (d >= V) return a;
          var z = d - Gl(b);
          if (z < 1) return b;
          var Z = W ? il(W, 0, z).join('') : a.slice(0, z);
          if (P === t) return Z + b;
          if ((W && (z += Z.length - z), ho(P))) {
            if (a.slice(z).search(P)) {
              var he,
                ge = Z;
              for (P.global || (P = Ta(P.source, kt(gl.exec(P)) + 'g')), P.lastIndex = 0; (he = P.exec(ge)); )
                var me = he.index;
              Z = Z.slice(0, me === t ? z : me);
            }
          } else if (a.indexOf(An(P), z) != z) {
            var Ae = Z.lastIndexOf(P);
            Ae > -1 && (Z = Z.slice(0, Ae));
          }
          return Z + b;
        }
        function N0(a) {
          return (a = kt(a)), a && hr.test(a) ? a.replace(cl, tp) : a;
        }
        var I0 = Xl(function(a, u, d) {
            return a + (d ? ' ' : '') + u.toUpperCase();
          }),
          po = Bu('toUpperCase');
        function Uf(a, u, d) {
          return (a = kt(a)), (u = d ? t : u), u === t ? (Z_(a) ? lp(a) : H_(a)) : a.match(u) || [];
        }
        var Bf = st(function(a, u) {
            try {
              return Tn(a, t, u);
            } catch (d) {
              return co(d) ? d : new $e(d);
            }
          }),
          T0 = Ai(function(a, u) {
            return (
              Hn(u, function(d) {
                (d = ci(d)), Ti(a, d, uo(a[d], a));
              }),
              a
            );
          });
        function L0(a) {
          var u = a == null ? 0 : a.length,
            d = Je();
          return (
            (a = u
              ? Vt(a, function(b) {
                  if (typeof b[1] != 'function') throw new zn(s);
                  return [d(b[0]), b[1]];
                })
              : []),
            st(function(b) {
              for (var P = -1; ++P < u; ) {
                var V = a[P];
                if (Tn(V[0], this, b)) return Tn(V[1], this, b);
              }
            })
          );
        }
        function A0(a) {
          return tm(Gn(a, _));
        }
        function mo(a) {
          return function() {
            return a;
          };
        }
        function R0(a, u) {
          return a == null || a !== a ? u : a;
        }
        var E0 = Hu(),
          D0 = Hu(!0);
        function Cn(a) {
          return a;
        }
        function bo(a) {
          return mu(typeof a == 'function' ? a : Gn(a, _));
        }
        function V0(a) {
          return vu(Gn(a, _));
        }
        function M0(a, u) {
          return wu(a, Gn(u, _));
        }
        var O0 = st(function(a, u) {
            return function(d) {
              return Br(d, a, u);
            };
          }),
          F0 = st(function(a, u) {
            return function(d) {
              return Br(a, d, u);
            };
          });
        function vo(a, u, d) {
          var b = xt(u),
            P = Rs(u, b);
          d == null && !(Bt(u) && (P.length || !b.length)) && ((d = u), (u = a), (a = this), (P = Rs(u, xt(u))));
          var V = !(Bt(d) && 'chain' in d) || !!d.chain,
            W = Ei(a);
          return (
            Hn(P, function(z) {
              var Z = u[z];
              (a[z] = Z),
                W &&
                  (a.prototype[z] = function() {
                    var he = this.__chain__;
                    if (V || he) {
                      var ge = a(this.__wrapped__),
                        me = (ge.__actions__ = wn(this.__actions__));
                      return me.push({ func: Z, args: arguments, thisArg: a }), (ge.__chain__ = he), ge;
                    }
                    return Z.apply(a, Xi([this.value()], arguments));
                  });
            }),
            a
          );
        }
        function U0() {
          return Yt._ === this && (Yt._ = fp), this;
        }
        function wo() {}
        function B0(a) {
          return (
            (a = nt(a)),
            st(function(u) {
              return ku(u, a);
            })
          );
        }
        var W0 = Za(Vt),
          H0 = Za(zo),
          z0 = Za(ka);
        function Wf(a) {
          return io(a) ? Sa(ci(a)) : bm(a);
        }
        function q0(a) {
          return function(u) {
            return a == null ? t : Pl(a, u);
          };
        }
        var G0 = qu(),
          K0 = qu(!0);
        function ko() {
          return [];
        }
        function So() {
          return !1;
        }
        function J0() {
          return {};
        }
        function j0() {
          return '';
        }
        function Y0() {
          return !0;
        }
        function Q0(a, u) {
          if (((a = nt(a)), a < 1 || a > $)) return [];
          var d = ve,
            b = un(a, ve);
          (u = Je(u)), (a -= ve);
          for (var P = Pa(b, u); ++d < a; ) u(d);
          return P;
        }
        function Z0(a) {
          return et(a) ? Vt(a, ci) : Rn(a) ? [a] : wn(sf(kt(a)));
        }
        function X0(a) {
          var u = ++op;
          return kt(a) + u;
        }
        var $0 = Fs(function(a, u) {
            return a + u;
          }, 0),
          x0 = Xa('ceil'),
          ew = Fs(function(a, u) {
            return a / u;
          }, 1),
          tw = Xa('floor');
        function nw(a) {
          return a && a.length ? As(a, Cn, Oa) : t;
        }
        function iw(a, u) {
          return a && a.length ? As(a, Je(u, 2), Oa) : t;
        }
        function lw(a) {
          return Ko(a, Cn);
        }
        function rw(a, u) {
          return Ko(a, Je(u, 2));
        }
        function sw(a) {
          return a && a.length ? As(a, Cn, Wa) : t;
        }
        function aw(a, u) {
          return a && a.length ? As(a, Je(u, 2), Wa) : t;
        }
        var ow = Fs(function(a, u) {
            return a * u;
          }, 1),
          uw = Xa('round'),
          fw = Fs(function(a, u) {
            return a - u;
          }, 0);
        function cw(a) {
          return a && a.length ? ya(a, Cn) : 0;
        }
        function dw(a, u) {
          return a && a.length ? ya(a, Je(u, 2)) : 0;
        }
        return (
          (E.after = Vb),
          (E.ary = mf),
          (E.assign = kv),
          (E.assignIn = Rf),
          (E.assignInWith = Zs),
          (E.assignWith = Sv),
          (E.at = Cv),
          (E.before = bf),
          (E.bind = uo),
          (E.bindAll = T0),
          (E.bindKey = vf),
          (E.castArray = Jb),
          (E.chain = gf),
          (E.chunk = t1),
          (E.compact = n1),
          (E.concat = i1),
          (E.cond = L0),
          (E.conforms = A0),
          (E.constant = mo),
          (E.countBy = cb),
          (E.create = yv),
          (E.curry = wf),
          (E.curryRight = kf),
          (E.debounce = Sf),
          (E.defaults = Pv),
          (E.defaultsDeep = Nv),
          (E.defer = Mb),
          (E.delay = Ob),
          (E.difference = l1),
          (E.differenceBy = r1),
          (E.differenceWith = s1),
          (E.drop = a1),
          (E.dropRight = o1),
          (E.dropRightWhile = u1),
          (E.dropWhile = f1),
          (E.fill = c1),
          (E.filter = hb),
          (E.flatMap = pb),
          (E.flatMapDeep = mb),
          (E.flatMapDepth = bb),
          (E.flatten = ff),
          (E.flattenDeep = d1),
          (E.flattenDepth = h1),
          (E.flip = Fb),
          (E.flow = E0),
          (E.flowRight = D0),
          (E.fromPairs = g1),
          (E.functions = Dv),
          (E.functionsIn = Vv),
          (E.groupBy = vb),
          (E.initial = p1),
          (E.intersection = m1),
          (E.intersectionBy = b1),
          (E.intersectionWith = v1),
          (E.invert = Ov),
          (E.invertBy = Fv),
          (E.invokeMap = kb),
          (E.iteratee = bo),
          (E.keyBy = Sb),
          (E.keys = xt),
          (E.keysIn = Sn),
          (E.map = Gs),
          (E.mapKeys = Bv),
          (E.mapValues = Wv),
          (E.matches = V0),
          (E.matchesProperty = M0),
          (E.memoize = Js),
          (E.merge = Hv),
          (E.mergeWith = Ef),
          (E.method = O0),
          (E.methodOf = F0),
          (E.mixin = vo),
          (E.negate = js),
          (E.nthArg = B0),
          (E.omit = zv),
          (E.omitBy = qv),
          (E.once = Ub),
          (E.orderBy = Cb),
          (E.over = W0),
          (E.overArgs = Bb),
          (E.overEvery = H0),
          (E.overSome = z0),
          (E.partial = fo),
          (E.partialRight = Cf),
          (E.partition = yb),
          (E.pick = Gv),
          (E.pickBy = Df),
          (E.property = Wf),
          (E.propertyOf = q0),
          (E.pull = C1),
          (E.pullAll = df),
          (E.pullAllBy = y1),
          (E.pullAllWith = P1),
          (E.pullAt = N1),
          (E.range = G0),
          (E.rangeRight = K0),
          (E.rearg = Wb),
          (E.reject = Ib),
          (E.remove = I1),
          (E.rest = Hb),
          (E.reverse = ao),
          (E.sampleSize = Lb),
          (E.set = Jv),
          (E.setWith = jv),
          (E.shuffle = Ab),
          (E.slice = T1),
          (E.sortBy = Db),
          (E.sortedUniq = M1),
          (E.sortedUniqBy = O1),
          (E.split = p0),
          (E.spread = zb),
          (E.tail = F1),
          (E.take = U1),
          (E.takeRight = B1),
          (E.takeRightWhile = W1),
          (E.takeWhile = H1),
          (E.tap = nb),
          (E.throttle = qb),
          (E.thru = qs),
          (E.toArray = Tf),
          (E.toPairs = Vf),
          (E.toPairsIn = Mf),
          (E.toPath = Z0),
          (E.toPlainObject = Af),
          (E.transform = Yv),
          (E.unary = Gb),
          (E.union = z1),
          (E.unionBy = q1),
          (E.unionWith = G1),
          (E.uniq = K1),
          (E.uniqBy = J1),
          (E.uniqWith = j1),
          (E.unset = Qv),
          (E.unzip = oo),
          (E.unzipWith = hf),
          (E.update = Zv),
          (E.updateWith = Xv),
          (E.values = er),
          (E.valuesIn = $v),
          (E.without = Y1),
          (E.words = Uf),
          (E.wrap = Kb),
          (E.xor = Q1),
          (E.xorBy = Z1),
          (E.xorWith = X1),
          (E.zip = $1),
          (E.zipObject = x1),
          (E.zipObjectDeep = eb),
          (E.zipWith = tb),
          (E.entries = Vf),
          (E.entriesIn = Mf),
          (E.extend = Rf),
          (E.extendWith = Zs),
          vo(E, E),
          (E.add = $0),
          (E.attempt = Bf),
          (E.camelCase = n0),
          (E.capitalize = Of),
          (E.ceil = x0),
          (E.clamp = xv),
          (E.clone = jb),
          (E.cloneDeep = Qb),
          (E.cloneDeepWith = Zb),
          (E.cloneWith = Yb),
          (E.conformsTo = Xb),
          (E.deburr = Ff),
          (E.defaultTo = R0),
          (E.divide = ew),
          (E.endsWith = i0),
          (E.eq = ti),
          (E.escape = l0),
          (E.escapeRegExp = r0),
          (E.every = db),
          (E.find = gb),
          (E.findIndex = of),
          (E.findKey = Iv),
          (E.findLast = _b),
          (E.findLastIndex = uf),
          (E.findLastKey = Tv),
          (E.floor = tw),
          (E.forEach = _f),
          (E.forEachRight = pf),
          (E.forIn = Lv),
          (E.forInRight = Av),
          (E.forOwn = Rv),
          (E.forOwnRight = Ev),
          (E.get = go),
          (E.gt = $b),
          (E.gte = xb),
          (E.has = Mv),
          (E.hasIn = _o),
          (E.head = cf),
          (E.identity = Cn),
          (E.includes = wb),
          (E.indexOf = _1),
          (E.inRange = e0),
          (E.invoke = Uv),
          (E.isArguments = Tl),
          (E.isArray = et),
          (E.isArrayBuffer = ev),
          (E.isArrayLike = kn),
          (E.isArrayLikeObject = qt),
          (E.isBoolean = tv),
          (E.isBuffer = ll),
          (E.isDate = nv),
          (E.isElement = iv),
          (E.isEmpty = lv),
          (E.isEqual = rv),
          (E.isEqualWith = sv),
          (E.isError = co),
          (E.isFinite = av),
          (E.isFunction = Ei),
          (E.isInteger = yf),
          (E.isLength = Ys),
          (E.isMap = Pf),
          (E.isMatch = ov),
          (E.isMatchWith = uv),
          (E.isNaN = fv),
          (E.isNative = cv),
          (E.isNil = hv),
          (E.isNull = dv),
          (E.isNumber = Nf),
          (E.isObject = Bt),
          (E.isObjectLike = Ht),
          (E.isPlainObject = Kr),
          (E.isRegExp = ho),
          (E.isSafeInteger = gv),
          (E.isSet = If),
          (E.isString = Qs),
          (E.isSymbol = Rn),
          (E.isTypedArray = xl),
          (E.isUndefined = _v),
          (E.isWeakMap = pv),
          (E.isWeakSet = mv),
          (E.join = w1),
          (E.kebabCase = s0),
          (E.last = Jn),
          (E.lastIndexOf = k1),
          (E.lowerCase = a0),
          (E.lowerFirst = o0),
          (E.lt = bv),
          (E.lte = vv),
          (E.max = nw),
          (E.maxBy = iw),
          (E.mean = lw),
          (E.meanBy = rw),
          (E.min = sw),
          (E.minBy = aw),
          (E.stubArray = ko),
          (E.stubFalse = So),
          (E.stubObject = J0),
          (E.stubString = j0),
          (E.stubTrue = Y0),
          (E.multiply = ow),
          (E.nth = S1),
          (E.noConflict = U0),
          (E.noop = wo),
          (E.now = Ks),
          (E.pad = u0),
          (E.padEnd = f0),
          (E.padStart = c0),
          (E.parseInt = d0),
          (E.random = t0),
          (E.reduce = Pb),
          (E.reduceRight = Nb),
          (E.repeat = h0),
          (E.replace = g0),
          (E.result = Kv),
          (E.round = uw),
          (E.runInContext = Y),
          (E.sample = Tb),
          (E.size = Rb),
          (E.snakeCase = _0),
          (E.some = Eb),
          (E.sortedIndex = L1),
          (E.sortedIndexBy = A1),
          (E.sortedIndexOf = R1),
          (E.sortedLastIndex = E1),
          (E.sortedLastIndexBy = D1),
          (E.sortedLastIndexOf = V1),
          (E.startCase = m0),
          (E.startsWith = b0),
          (E.subtract = fw),
          (E.sum = cw),
          (E.sumBy = dw),
          (E.template = v0),
          (E.times = Q0),
          (E.toFinite = Di),
          (E.toInteger = nt),
          (E.toLength = Lf),
          (E.toLower = w0),
          (E.toNumber = jn),
          (E.toSafeInteger = wv),
          (E.toString = kt),
          (E.toUpper = k0),
          (E.trim = S0),
          (E.trimEnd = C0),
          (E.trimStart = y0),
          (E.truncate = P0),
          (E.unescape = N0),
          (E.uniqueId = X0),
          (E.upperCase = I0),
          (E.upperFirst = po),
          (E.each = _f),
          (E.eachRight = pf),
          (E.first = cf),
          vo(
            E,
            (function() {
              var a = {};
              return (
                ui(E, function(u, d) {
                  Ct.call(E.prototype, d) || (a[d] = u);
                }),
                a
              );
            })(),
            { chain: !1 }
          ),
          (E.VERSION = n),
          Hn(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(a) {
            E[a].placeholder = E;
          }),
          Hn(['drop', 'take'], function(a, u) {
            (ut.prototype[a] = function(d) {
              d = d === t ? 1 : Zt(nt(d), 0);
              var b = this.__filtered__ && !u ? new ut(this) : this.clone();
              return (
                b.__filtered__
                  ? (b.__takeCount__ = un(d, b.__takeCount__))
                  : b.__views__.push({ size: un(d, ve), type: a + (b.__dir__ < 0 ? 'Right' : '') }),
                b
              );
            }),
              (ut.prototype[a + 'Right'] = function(d) {
                return this.reverse()
                  [a](d)
                  .reverse();
              });
          }),
          Hn(['filter', 'map', 'takeWhile'], function(a, u) {
            var d = u + 1,
              b = d == ce || d == H;
            ut.prototype[a] = function(P) {
              var V = this.clone();
              return V.__iteratees__.push({ iteratee: Je(P, 3), type: d }), (V.__filtered__ = V.__filtered__ || b), V;
            };
          }),
          Hn(['head', 'last'], function(a, u) {
            var d = 'take' + (u ? 'Right' : '');
            ut.prototype[a] = function() {
              return this[d](1).value()[0];
            };
          }),
          Hn(['initial', 'tail'], function(a, u) {
            var d = 'drop' + (u ? '' : 'Right');
            ut.prototype[a] = function() {
              return this.__filtered__ ? new ut(this) : this[d](1);
            };
          }),
          (ut.prototype.compact = function() {
            return this.filter(Cn);
          }),
          (ut.prototype.find = function(a) {
            return this.filter(a).head();
          }),
          (ut.prototype.findLast = function(a) {
            return this.reverse().find(a);
          }),
          (ut.prototype.invokeMap = st(function(a, u) {
            return typeof a == 'function'
              ? new ut(this)
              : this.map(function(d) {
                  return Br(d, a, u);
                });
          })),
          (ut.prototype.reject = function(a) {
            return this.filter(js(Je(a)));
          }),
          (ut.prototype.slice = function(a, u) {
            a = nt(a);
            var d = this;
            return d.__filtered__ && (a > 0 || u < 0)
              ? new ut(d)
              : (a < 0 ? (d = d.takeRight(-a)) : a && (d = d.drop(a)),
                u !== t && ((u = nt(u)), (d = u < 0 ? d.dropRight(-u) : d.take(u - a))),
                d);
          }),
          (ut.prototype.takeRightWhile = function(a) {
            return this.reverse()
              .takeWhile(a)
              .reverse();
          }),
          (ut.prototype.toArray = function() {
            return this.take(ve);
          }),
          ui(ut.prototype, function(a, u) {
            var d = /^(?:filter|find|map|reject)|While$/.test(u),
              b = /^(?:head|last)$/.test(u),
              P = E[b ? 'take' + (u == 'last' ? 'Right' : '') : u],
              V = b || /^find/.test(u);
            !P ||
              (E.prototype[u] = function() {
                var W = this.__wrapped__,
                  z = b ? [1] : arguments,
                  Z = W instanceof ut,
                  he = z[0],
                  ge = Z || et(W),
                  me = function(ot) {
                    var ft = P.apply(E, Xi([ot], z));
                    return b && Ae ? ft[0] : ft;
                  };
                ge && d && typeof he == 'function' && he.length != 1 && (Z = ge = !1);
                var Ae = this.__chain__,
                  We = !!this.__actions__.length,
                  Ye = V && !Ae,
                  lt = Z && !We;
                if (!V && ge) {
                  W = lt ? W : new ut(this);
                  var Qe = a.apply(W, z);
                  return Qe.__actions__.push({ func: qs, args: [me], thisArg: t }), new qn(Qe, Ae);
                }
                return Ye && lt ? a.apply(this, z) : ((Qe = this.thru(me)), Ye ? (b ? Qe.value()[0] : Qe.value()) : Qe);
              });
          }),
          Hn(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(a) {
            var u = _s[a],
              d = /^(?:push|sort|unshift)$/.test(a) ? 'tap' : 'thru',
              b = /^(?:pop|shift)$/.test(a);
            E.prototype[a] = function() {
              var P = arguments;
              if (b && !this.__chain__) {
                var V = this.value();
                return u.apply(et(V) ? V : [], P);
              }
              return this[d](function(W) {
                return u.apply(et(W) ? W : [], P);
              });
            };
          }),
          ui(ut.prototype, function(a, u) {
            var d = E[u];
            if (d) {
              var b = d.name + '';
              Ct.call(Yl, b) || (Yl[b] = []), Yl[b].push({ name: u, func: d });
            }
          }),
          (Yl[Os(t, C).name] = [{ name: 'wrapper', func: t }]),
          (ut.prototype.clone = Np),
          (ut.prototype.reverse = Ip),
          (ut.prototype.value = Tp),
          (E.prototype.at = ib),
          (E.prototype.chain = lb),
          (E.prototype.commit = rb),
          (E.prototype.next = sb),
          (E.prototype.plant = ob),
          (E.prototype.reverse = ub),
          (E.prototype.toJSON = E.prototype.valueOf = E.prototype.value = fb),
          (E.prototype.first = E.prototype.head),
          Er && (E.prototype[Er] = ab),
          E
        );
      },
      Kl = rp();
    In ? (((In.exports = Kl)._ = Kl), (Qi._ = Kl)) : (Yt._ = Kl);
  }.call(Yr));
})(cr, cr.exports);
class g2 {
  getRandomId() {
    return (window.crypto || window.msCrypto).getRandomValues(new Uint32Array(1))[0];
  }
  isFunction(e) {
    return e && {}.toString.call(e) === '[object Function]';
  }
  isPromise(e) {
    return e && this.isFunction(e.then);
  }
  isString(e) {
    return typeof e == 'string' || e instanceof String;
  }
  isIE() {
    const e = navigator.userAgent;
    return Boolean(e.includes('MSIE ') || e.includes('Trident/'));
  }
  isObject(e) {
    return !!(e && typeof e == 'object' && !Array.isArray(e));
  }
  isEmptyObject(e) {
    return this.isObject(e) && Object.keys(e).length === 0;
  }
  deepMerge(e, ...t) {
    if (!t.length) return e;
    const n = t.shift();
    if (this.isObject(e) && this.isObject(n))
      for (const l in n)
        this.isObject(n[l])
          ? (e[l] || Object.assign(e, { [l]: {} }), this.deepMerge(e[l], n[l]))
          : Object.assign(e, { [l]: n[l] });
    return this.deepMerge(e, ...t);
  }
  getUrlWithoutHash(e) {
    if (!e) return !1;
    const t = e.split('#')[0];
    return t.startsWith('http') ? t : window.location.origin + (t.startsWith('/') ? '' : '/') + t;
  }
  hasHash(e) {
    return e && e.search(/^[#\/].*$/) === 0;
  }
  getPathWithoutHash(e) {
    for (; this.hasHash(e); ) e = e.substr(1);
    return e;
  }
  getUrlParameter(e) {
    e = e.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const n = new RegExp('[\\?&]' + e + '=([^&#]*)').exec(window.location.search);
    return (n && decodeURIComponent(n[1].replace(/\+/g, ' '))) || '';
  }
  prependOrigin(e) {
    if (!e || e.startsWith('http')) return e;
    const t = e.startsWith('/');
    return e.length ? window.location.origin + (t ? '' : '/') + e : window.location.origin;
  }
  addLeadingSlash(e) {
    return (e.startsWith('/') ? '' : '/') + e;
  }
  addTrailingSlash(e) {
    return typeof e != 'string' ? e : e.replace(/\/?$/, '/');
  }
  trimLeadingSlash(e) {
    return this.isString(e) ? e.replace(/^\/+/g, '') : '';
  }
  trimTrailingSlash(e) {
    return this.isString(e) ? e.replace(/\/+$/, '') : '';
  }
  getTrimmedUrl(e) {
    const t = e.length > 0 ? this.getPathWithoutHash(e) : e;
    return this.trimTrailingSlash(t.split('?')[0]);
  }
  normalizePath(e) {
    return typeof e != 'string' ? e : this.addLeadingSlash(this.addTrailingSlash(e));
  }
  getConfigValueFromObject(e, t) {
    let n = 0,
      l = e;
    const r = t.split('.');
    for (; l && n < r.length; ) l = l[r[n++]];
    return l;
  }
  canComponentHandleModal(e) {
    return e && typeof e.get == 'function';
  }
  escapeRegExp(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  replaceVars(e, t, n, l = !0) {
    let r = e;
    return (
      t &&
        (l
          ? (r = cr.exports.replace(r, /{([\s\S]+?)}/g, s => {
              let o = s.slice(1, -1).trim();
              return o.indexOf(n) === 0 && (o = o.substring(n.length)), cr.exports.get(t, o, s);
            }))
          : Object.entries(t).forEach(s => {
              r = r.replace(new RegExp(this.escapeRegExp(n + s[0]), 'g'), encodeURIComponent(s[1]));
            })),
      l && (r = r.replace(new RegExp('\\{' + this.escapeRegExp(n) + '[^\\}]+\\}', 'g'), '')),
      r
    );
  }
  getInnerHeight() {
    return Mn.isCustomLuigiContainer() ? Mn.getLuigiContainer().clientHeight : window.innerHeight;
  }
  getContentAreaHeight() {
    return this.getInnerHeight() - Mn.getShellbar().clientHeight;
  }
  computePxFromPercent(e, t) {
    return (e / 100) * t;
  }
  computePercentFromPx(e, t) {
    return Math.floor((100 * t) / e);
  }
  isElementVisible(e) {
    return window.getComputedStyle(e, null).getPropertyValue('display') !== 'none';
  }
  removeInternalProperties(e) {
    return (
      (e &&
        Object.keys(e)
          .filter(t => !t.startsWith('_'))
          .reduce((t, n) => ((t[n] = e[n]), t), {})) ||
      e
    );
  }
  removeProperties(e, t) {
    const n = {};
    if (!t instanceof Array || !t.length)
      return (
        console.error('[ERROR] removeProperties requires second parameter: array of keys to remove from object.'), e
      );
    for (const l in e)
      if (e.hasOwnProperty(l)) {
        const r = t.filter(o => l.includes(o)).length === 0,
          s =
            t
              .filter(o => o.endsWith('*'))
              .map(o => o.slice(0, -1))
              .filter(o => l.startsWith(o)).length === 0;
        r && s && (n[l] = e[l]);
      }
    return n;
  }
  semverCompare(e, t) {
    const n = e.split('-')[0].split('.'),
      l = t.split('-')[0].split('.');
    for (let r = 0; r < 3; r++) {
      const s = Number(n[r]),
        o = Number(l[r]);
      if (s > o) return 1;
      if (o > s) return -1;
      if (!isNaN(s) && isNaN(o)) return 1;
      if (isNaN(s) && !isNaN(o)) return -1;
    }
    return 0;
  }
  requestExperimentalFeature(e, t) {
    const n = Boolean(re.getConfigValue('settings.experimental.' + e));
    return t && !n && console.warn('Experimental feature not enabled: ', e), n;
  }
  createRemotePromise() {
    let e, t;
    const n = new Promise(r => {
      (e = s => {
        r(s || !0);
      }),
        (t = () => {
          r(!1);
        });
    });
    let l = re._remotePromises;
    return (
      l || ((l = { counter: 0, promises: [] }), (re._remotePromises = l)),
      (n.id = l.counter++),
      (l.promises[n.id] = n),
      (n.doResolve = r => {
        delete l.promises[n.id], e(r);
      }),
      (n.doReject = () => {
        delete l.promises[n.id], t();
      }),
      n
    );
  }
  getRemotePromise(e) {
    return re._remotePromises ? re._remotePromises.promises[e] : void 0;
  }
  isString(e) {
    return typeof e == 'string' || e instanceof String;
  }
}
const ee = new g2();
class _2 {
  get specialIframeTypes() {
    return [
      { iframeKey: 'modalIframe', dataKey: 'modalIframeData', iframeConfigKey: 'modal' },
      { iframeKey: 'drawerIframe', dataKey: 'drawerIframeData', iframeConfigKey: 'drawer' },
      { iframeKey: 'splitViewIframe', dataKey: 'splitViewIframeData', iframeConfigKey: 'splitView' }
    ];
  }
  hideElementChildren(e) {
    e.children &&
      Array.from(e.children).forEach(t => {
        t.tagName === 'IFRAME' && (t.style.display = 'none');
      });
  }
  removeElementChildren(e) {
    [...e.children].forEach(n => {
      !n.vg && n.tagName === 'IFRAME' && e.removeChild(n);
    });
  }
  removeIframe(e, t) {
    Array.from(t.children).forEach(l => {
      l === e && t.removeChild(l);
    });
  }
  isSameDomain(e, t) {
    if (e.iframe) {
      const n = t.get(),
        l = ee.getUrlWithoutHash(n.previousNodeValues.viewUrl),
        r = ee.getUrlWithoutHash(n.viewUrl),
        s = n.previousNodeValues.viewGroup,
        o = n.viewGroup;
      if (l === r && !s && !o) return !0;
    }
    return !1;
  }
  isSameViewGroup(e, t) {
    if (e.iframe) {
      const n = t.get(),
        l = ee.getUrlWithoutHash(n.previousNodeValues.viewUrl),
        r = ee.getUrlWithoutHash(n.viewUrl),
        s = this.getLocation(l),
        o = this.getLocation(r);
      if (s === o) {
        const c = n.previousNodeValues.viewGroup,
          g = n.viewGroup;
        if (c && g && c === g) return !0;
      }
    }
    return !1;
  }
  canReuseIframe(e, t) {
    return this.isSameDomain(e, t) || this.isSameViewGroup(e, t);
  }
  getLocation(e) {
    const t = document.createElement('a');
    return (
      (t.href = e), t.origin ? t.origin : t.protocol && t.host ? `${t.protocol}//${t.host}` : window.location.origin
    );
  }
  urlMatchesTheDomain(e = '', t) {
    return this.getLocation(e) === this.getLocation(t);
  }
  iframeIsSameDomain(e, t) {
    return this.urlMatchesTheDomain(e, t);
  }
  getIframeContainer() {
    const e = Array.from(document.querySelectorAll('.iframeContainer'));
    return e.length > 0 ? e[0] : void 0;
  }
  getMicrofrontendsInDom() {
    return Dw.map(({ type: e, selector: t }) =>
      Array.from(document.querySelectorAll(t)).map(n => ({
        id: n.luigi.id,
        container: n,
        active: ee.isElementVisible(n),
        type: e
      }))
    ).reduce((e, t) => e.concat(t), []);
  }
  getMicrofrontendIframes() {
    return this.getMicrofrontendsInDom().map(e => e.container);
  }
  getCurrentWebcomponentCtnInDom() {
    return document.querySelector('.iframeContainer.lui-webComponent');
  }
  getCurrentMicrofrontendIframe() {
    const e = this.getModalIframes(),
      t = this.getMainIframes().filter(ee.isElementVisible),
      n = this.getCurrentWebcomponentCtnInDom();
    return e[0] || t[0] || n || null;
  }
  getIframesWithType(e) {
    return this.getMicrofrontendsInDom()
      .filter(t => t.type === e)
      .map(t => t.container);
  }
  getMainIframes() {
    return this.getIframesWithType('main');
  }
  getModalIframes() {
    return this.getIframesWithType('modal');
  }
  getVisibleIframes() {
    return this.getMicrofrontendsInDom()
      .filter(e => e.active)
      .map(e => e.container);
  }
  sendMessageToIframe(e, t) {
    if (!(e.luigi && e.luigi.viewUrl && e._ready)) return;
    const n = this.getLocation(e.luigi.viewUrl);
    n !== '' && e.contentWindow && e.contentWindow.postMessage(t, n);
  }
  sendMessageToVisibleIframes(e) {
    this.getVisibleIframes().forEach(t => this.sendMessageToIframe(t, e));
  }
  broadcastMessageToAllIframes(e) {
    Ie.getMicrofrontendIframes().forEach(t => this.sendMessageToIframe(t, e));
  }
  createIframe(e, t, n, l, r) {
    const s = [
        'allow-forms',
        'allow-modals',
        'allow-popups',
        'allow-popups-to-escape-sandbox',
        'allow-same-origin',
        'allow-scripts'
      ],
      o = re.getConfigValue('settings.customSandboxRules'),
      c = re.getConfigValue('settings.allowRules'),
      g = o ? [...new Set([...s, ...o])] : s,
      h = document.createElement('iframe');
    (h.src = Zr.hasDecorators() ? Zr.applyDecorators(e, n ? n.decodeViewUrl : void 0) : e),
      c &&
        (c.forEach((p, m) => {
          c[m] = p + (p.indexOf(';') != -1 ? '' : ';');
        }),
        (h.allow = c.join(' '))),
      (h.sandbox = g.join(' ')),
      (h.luigi = {
        viewUrl: e,
        currentNode: n,
        createdAt: new Date().getTime(),
        id: ee.getRandomId(),
        pathParams: r ? r.pathParams : void 0
      }),
      t && (h.vg = t),
      n && n.clientPermissions && (h.luigi.clientPermissions = n.clientPermissions);
    const _ = re.getConfigValue('settings.iframeCreationInterceptor');
    if (ee.isFunction(_))
      try {
        _(h, t, n, l);
      } catch (p) {
        console.error('Error applying iframe creation interceptor: ', p);
      }
    return h;
  }
  isMessageSource(e, t) {
    return t && t.contentWindow === e.source;
  }
  getValidMessageSource(e) {
    const n = [
      ...Ie.getMicrofrontendIframes(),
      { contentWindow: window, luigi: { viewUrl: window.location.href } }
    ].find(s => this.isMessageSource(e, s));
    if (!n || !n.luigi || !n.luigi.viewUrl) return;
    const l = e.data.msg === 'luigi.navigate.ok';
    if (l && !n.luigi.nextViewUrl) return;
    const r = l ? n.luigi.nextViewUrl : n.luigi.viewUrl;
    if (!!this.iframeIsSameDomain(r, e.origin)) return n;
  }
  getSpecialIframeMessageSource(e, t) {
    return Ie.specialIframeTypes.filter(n => Ie.isMessageSource(e, t[n.iframeKey]));
  }
  disableA11yOfInactiveIframe(e) {
    [...document.querySelectorAll('*')].forEach(n => {
      n.getAttribute('oldTab') || n.setAttribute('oldTab', n.getAttribute('tabindex')),
        n !== e && n.setAttribute('tabindex', '-1');
    });
  }
  enableA11yOfInactiveIframe() {
    [...document.querySelectorAll('*')].forEach(t => {
      const n = t.getAttribute('oldTab');
      t.getAttribute('oldTab') === 'null' && t.removeAttribute('tabindex'),
        t.removeAttribute('oldTab'),
        n && n !== 'null' && t.setAttribute('tabindex', n);
    });
  }
  disableA11YKeyboardExceptClassName(e) {
    [...document.querySelectorAll('*')].forEach(n => {
      const l = !n.closest(e),
        r = n.getAttribute('tabindex');
      (r || r === 0) && l && !n.hasAttribute('oldtab') && n.setAttribute('oldtab', r),
        l && n.setAttribute('tabindex', '-1');
    });
  }
  enableA11YKeyboardBackdropExceptClassName(e) {
    [...document.querySelectorAll('*')].forEach(n => {
      const l = n.getAttribute('oldtab');
      !n.closest(e) && n.removeAttribute('tabindex'),
        l && l !== 'null' && (n.setAttribute('tabindex', l), n.removeAttribute('oldtab'));
    });
  }
  applyCoreStateData(e) {
    return {
      ...e,
      activeFeatureToggleList: Vo.getActiveFeatureToggleList(),
      currentLocale: ht.getCurrentLocale(),
      currentTheme: y_.getCurrentTheme()
    };
  }
}
const Ie = new _2();
class p2 {
  constructor() {
    (this.EXP_CAT_KEY = 'luigi.preferences.navigation.expandedCategories'),
      (this.COL_NAV_KEY = 'luigi.preferences.navigation.collapsedNavigation'),
      (this.virtualGroupPrefix = '___');
  }
  getProductSwitcherConfig() {
    const e = re.getConfigValue('navigation.productSwitcher');
    return Object.assign({ icon: 'grid', label: 'My Products' }, e);
  }
  getProductSwitcherColumnsNumber() {
    const e = this.getProductSwitcherConfig();
    if (!e.items) return;
    let t = e.columns,
      n;
    return (
      ee.isFunction(e.items) ? (n = e.items().length) : (n = e.items.length),
      t === 'auto' ? (n <= 6 ? (e.columns = 3) : (e.columns = 4)) : e.columns === 3 ? 3 : 4
    );
  }
  prepareForTests(...e) {
    let t = '';
    return (
      e.forEach(n => {
        n &&
          (t +=
            (t ? '_' : '') +
            encodeURIComponent(
              n
                .toLowerCase()
                .split(' ')
                .join('')
            ));
      }),
      t
    );
  }
  checkVisibleForFeatureToggles(e) {
    if (e && e.visibleForFeatureToggles) {
      const t = Vo.getActiveFeatureToggleList();
      for (const n of e.visibleForFeatureToggles)
        if (n.startsWith('!')) {
          if (t.includes(n.slice(1))) return !1;
        } else if (!t.includes(n)) return !1;
    }
    return !0;
  }
  isNodeAccessPermitted(e, t, n) {
    if (gi.isAuthorizationEnabled()) {
      const r = al.isLoggedIn(),
        s = e.anonymousAccess;
      if ((r && s === 'exclusive') || (!r && s !== 'exclusive' && s !== !0)) return !1;
    }
    if (!this.checkVisibleForFeatureToggles(e)) return !1;
    const l = re.getConfigValue('navigation.nodeAccessibilityResolver');
    return typeof l != 'function' ? !0 : l(e, t, n);
  }
  applyContext(e, t, n) {
    if (t) for (var l in t) e[l] = t[l];
    return n && e.parentNavigationContexts.unshift(n), e;
  }
  getNodePath(e) {
    return e.parent ? this.getNodePath(e.parent) + '/' + e.pathSegment : e.pathSegment;
  }
  groupNodesBy(e, t, n) {
    const l = re.getConfigValue('navigation.defaults.category');
    let r = {},
      s = 0,
      o = 0;
    const c = g => {
      g.sort((h, _) => {
        const p = h.order || 0,
          m = _.order || 0;
        return p - m;
      });
    };
    return (
      e.forEach(g => {
        let h, _;
        const p = g[t];
        ee.isObject(p)
          ? ((h = p.id ? p.id : p.label), (_ = Object.assign({}, p)))
          : ((h = p), n && !p && (h = this.virtualGroupPrefix + o), (_ = { label: h, _fromString: !0 }));
        let m = r[h];
        m ||
          (n && p && o++,
          (_.order === void 0 || _.order === null || _.order === '') && (_.order = h ? s++ : -1),
          (m = []),
          (r[h] = m)),
          m.metaInfo || (m.metaInfo = _),
          ee.isObject(p) &&
            m.metaInfo._fromString &&
            (delete m.metaInfo._fromString, (m.metaInfo = { ...m.metaInfo, ...p })),
          ee.isObject(p) &&
            l &&
            (p.titleExpandButton
              ? (m.metaInfo.titleExpandButton = p.titleExpandButton)
              : (m.metaInfo.titleExpandButton = l.titleExpandButton),
            p.titleCollapseButton
              ? (m.metaInfo.titleCollapseButton = p.titleCollapseButton)
              : (m.metaInfo.titleCollapseButton = l.titleCollapseButton)),
          !m.metaInfo.categoryUid &&
            h &&
            m.metaInfo.collapsible &&
            (m.metaInfo.categoryUid = g.parent ? this.getNodePath(g.parent) + ':' + h : h),
          g.hideFromNav || m.push(g);
      }),
      Object.keys(r).forEach(g => {
        const h = r[g].metaInfo;
        h && h.id && ((r[h.label] = r[h.id]), delete r[h.id]);
      }),
      Object.keys(r).forEach(g => {
        c(r[g]), r[g].length === 0 && delete r[g];
      }),
      r
    );
  }
  generateTooltipText(e, t) {
    let n = e.tooltipText;
    return (
      n === void 0 && (n = re.getConfigValue('navigation.defaults.tooltipText')),
      n === void 0 ? t : n === !1 ? '' : ht.getTranslation(n)
    );
  }
  async generateTopNavNodes(e) {
    const t = await Mt.getFilteredChildren(e[0]);
    let n = null,
      l = 0,
      r = 0,
      s = {};
    const o = [];
    let c = [];
    for (const h of t) {
      e.forEach(m => {
        !n && m === h && (n = h);
      }),
        h.hideFromNav || (l++, h.globalNav && r++);
      let _;
      const p = !!h.badgeCounter;
      if ((p && (_ = await h.badgeCounter.count()), h.category)) {
        const m = h.category.label || h.category;
        if (s[m]) {
          if (
            (s[m].icon || ((s[m].icon = h.category.icon), (s[m].altText = h.category.altText)), p && !s[m].badgeCounter)
          )
            s[m].badgeCounter = { label: '', count: () => _ };
          else if (p) {
            const v = s[m].badgeCounter.count() + _;
            s[m].badgeCounter.count = () => v;
          }
        } else
          (s[m] = {
            isCat: !0,
            label: m,
            icon: h.category.icon,
            altText: h.category.altText,
            children: [],
            badgeCounter: p && { label: '', count: () => _ }
          }),
            o.push(s[m]);
        s[m].children.push(h);
      } else o.push(h);
      _ && c.push(_);
    }
    const g = { children: o, selectedNode: n, visibleNodeCount: l, globalNavNodeCount: r };
    if (c.length) {
      const h = c.reduce((_, p) => _ + p);
      g.totalBadgeNode = { badgeCounter: { count: () => h, label: '' } };
    }
    return g;
  }
  loadExpandedCategories() {
    let e = [];
    const t = localStorage.getItem(this.EXP_CAT_KEY);
    if (t)
      try {
        e = JSON.parse(t);
      } catch {
        console.warn('Preference data corrupted, using default');
      }
    return e;
  }
  storeExpandedState(e, t, n = !1) {
    let l = this.loadExpandedCategories(),
      r = e.split(':')[0];
    if (t) n && (l = l.filter(s => s.indexOf(r + ':') === -1)), l.indexOf(e) < 0 && l.push(e);
    else {
      let s = l.indexOf(e);
      s >= 0 && l.splice(s, 1);
    }
    return localStorage.setItem(this.EXP_CAT_KEY, JSON.stringify(l)), l;
  }
  isOpenUIiconName(e) {
    return /^[a-z0-9\-]+$/i.test(e);
  }
  renderIconClassName(e) {
    if (!e) return '';
    let t = 'sap-icon-';
    return e.startsWith('businessSuiteInAppSymbols') || e.startsWith('TNT') ? (t += e) : (t += '-' + e), t;
  }
  handleUnresponsiveClient(e) {
    if (e.errorFn) e.errorFn();
    else {
      console.warn('Something went wrong with a client! You will be redirected to another page.');
      const t = e.redirectPath || '/';
      it.navigateTo(t);
    }
  }
  getBurgerTooltipConfig() {
    const e = re.getConfigValue('settings.burgerTooltip');
    if (ee.isObject(e) || e === !0) {
      const t = e.navExpanded ? ht.getTranslation(e.navExpanded) : 'Collapse navigation';
      return [e.navCollapsed ? ht.getTranslation(e.navCollapsed) : 'Expand navigation', t];
    }
  }
  stripNode(e) {
    const t = { ...e };
    return delete t.parent, delete t.children, delete t.navHeader, t;
  }
  async shouldPreventNavigationForPath(e) {
    const { nodeObject: t } = await Mt.extractDataFromPath(e);
    return !!(await Mt.shouldPreventNavigation(t));
  }
  getPropertyChainValue(e, t, n) {
    return !t || !e ? n : cr.exports.get(e, t, n);
  }
  substituteVars(e, t) {
    const l = JSON.stringify(e).replace(/\$\{[a-zA-Z0-9$_.]+\}/g, r => {
      const s = r.substr(2, r.length - 3);
      return this.getPropertyChainValue(t, s) || r;
    });
    return JSON.parse(l);
  }
  _fetch(e, t) {
    return fetch(e, t);
  }
  processTitleData(e, t) {
    let n = this.getPropertyChainValue(e, t.titlePropertyChain);
    return (
      n && (n = n.trim()),
      n && t.titleDecorator && (n = t.titleDecorator.replace('%s', n)),
      { label: n || t.fallbackTitle, icon: this.getPropertyChainValue(e, t.iconPropertyChain, t.fallbackIcon) }
    );
  }
  async fetchNodeTitleData(e, t) {
    return new Promise((n, l) => {
      if (!e.titleResolver) {
        l(new Error('No title resolver defined at node'));
        return;
      }
      const r = { ...e.titleResolver };
      delete r._cache;
      const s = this.substituteVars(r, t),
        o = JSON.stringify(s);
      if (e.titleResolver._cache && e.titleResolver._cache.key === o) {
        n(e.titleResolver._cache.value);
        return;
      }
      const c = s.request;
      this._fetch(c.url, { method: c.method, headers: c.headers, body: JSON.stringify(c.body) })
        .then(g => {
          g.json().then(h => {
            try {
              const _ = this.processTitleData(h, s, e);
              (e.titleResolver._cache = { key: o, value: _ }), n(_);
            } catch (_) {
              l(_);
            }
          });
        })
        .catch(g => {
          l(g);
        });
    }).catch(n => {
      cr.exports.reject(n);
    });
  }
  handleNavAnchorClickedWithoutMetaKey(e) {
    return e.ctrlKey || e.metaKey || e.shiftKey ? (e.stopPropagation(), !1) : (e.preventDefault(), !0);
  }
}
const Te = new p2();
class m2 {
  constructor() {
    (this.defaultContentViewParamPrefix = '~'),
      (this.defaultQueryParamSeparator = '?'),
      (this.defaultModalViewParamName = 'modal');
  }
  getLastNodeObject(e) {
    return [...e.navigationPath].pop() || {};
  }
  async getDefaultChildNode(e, t) {
    const n = e.navigationPath[e.navigationPath.length - 1],
      l = t ? await t(n, e.context) : await ra.getConfigValueFromObjectAsync(n, 'children', e.context),
      r = l.find(s => s.pathSegment === n.defaultChildNode);
    if (n.defaultChildNode && r) return n.defaultChildNode;
    if (l && l.length) {
      if (e.navigationPath.length === 1) {
        const c = l.find(g => g.pathSegment);
        return (
          (c && c.pathSegment) ||
          console.error('At least one navigation node in the root hierarchy must have a pathSegment.')
        );
      }
      const o = l.find(c => c.pathSegment && (c.viewUrl || c.compound || (c.externalLink && c.externalLink.url)));
      if (o) return o.pathSegment;
    }
    return '';
  }
  parseParams(e) {
    if (!e) return {};
    const t = {},
      n = e.replace(/\+/g, ' '),
      l = n ? n.split('&') : null;
    return (
      l &&
        l.forEach(r => {
          const s = r.split('=');
          s && s.length > 0 && (t[decodeURIComponent(s[0])] = decodeURIComponent(s[1]));
        }),
      t
    );
  }
  encodeParams(e) {
    const t = [];
    for (const n in e) t.push(encodeURIComponent(n) + '=' + encodeURIComponent(e[n]));
    return t.join('&');
  }
  getNodeParams(e) {
    const t = {},
      n = this.getContentViewParamPrefix();
    return (
      e &&
        Object.entries(e).forEach(l => {
          if (l[0].startsWith(n)) {
            const r = l[0].substr(n.length);
            t[r] = l[1];
          }
        }),
      this.sanitizeParamsMap(t)
    );
  }
  applyPathParams(e, t) {
    let n = e;
    return (
      t &&
        Object.entries(t).forEach(([l, r]) => {
          n = n.replace(new RegExp(':' + l, 'g'), r);
        }),
      n
    );
  }
  findViewGroup(e, t) {
    if (e.viewGroup)
      return t && t !== e
        ? e.viewUrl && t.viewUrl && Ie.getLocation(e.viewUrl) === Ie.getLocation(t.viewUrl)
          ? e.viewGroup
          : void 0
        : e.viewGroup;
    if (e.parent) return this.findViewGroup(e.parent, t || e);
  }
  getContentViewParamPrefix() {
    let e = re.getConfigValue('routing.nodeParamPrefix');
    return e === !1 ? (e = '') : e || (e = this.defaultContentViewParamPrefix), e;
  }
  getModalViewParamName() {
    let e = re.getConfigValue('routing.modalPathParam');
    return e || (e = this.defaultModalViewParamName), e;
  }
  getHashQueryParamSeparator() {
    return this.defaultQueryParamSeparator;
  }
  getQueryParam(e) {
    return this.getQueryParams()[e];
  }
  getQueryParams() {
    return re.getConfigBooleanValue('routing.useHashRouting')
      ? this.getLocationHashQueryParams()
      : this.getLocationSearchQueryParams();
  }
  getLocation() {
    return location;
  }
  getLocationHashQueryParams() {
    const e = pe.getLocation().hash.indexOf(this.defaultQueryParamSeparator);
    return e !== -1 ? pe.parseParams(pe.getLocation().hash.slice(e + 1)) : {};
  }
  getLocationSearchQueryParams() {
    return pe.getLocation().search ? pe.parseParams(pe.getLocation().search.slice(1)) : {};
  }
  composeSearchParamsToRoute(e) {
    if (re.getConfigBooleanValue('routing.useHashRouting')) {
      const n = location.hash.indexOf(this.defaultQueryParamSeparator);
      return n !== -1 ? e + location.hash.slice(n) : e;
    }
    return location.search ? e + location.search : e;
  }
  getModalPathFromPath() {
    return this.getQueryParam(this.getModalViewParamName());
  }
  getModalParamsFromPath() {
    const e = this.getQueryParam(`${this.getModalViewParamName()}Params`);
    return e && JSON.parse(e);
  }
  addRouteChangeListener(e) {
    const t = re.getConfigValue('routing.useHashRouting');
    Pn.addEventListener('message', n => {
      if (n.data.msg === 'refreshRoute' && n.origin === window.origin) {
        const l = t ? it.getHashPath() : it.getModifiedPathname();
        e(l);
      }
    }),
      Pn.addEventListener('popstate', n => {
        const l = t ? it.getHashPath(location.href) : it.getModifiedPathname();
        e(l, n.detail);
      });
  }
  buildRoute(e, t, n) {
    return e.parent ? this.buildRoute(e.parent, `/${e.parent.pathSegment}${t}`, n) : t + (n ? '?' + n : '');
  }
  getContext(e, t) {
    return t == null ? this.getContext(e, e.context || {}) : e.parent ? { ...this.getContext(e.parent), ...t } : t;
  }
  getRouteLink(e, t, n) {
    const l = n || '';
    if (e.externalLink && e.externalLink.url) {
      const s = e.externalLink.url,
        o = { context: pe.substituteDynamicParamsInObject(this.getContext(e), t), pathParams: t, nodeParams: {} };
      return this.substituteViewUrl(s, o);
    } else if (e.link) {
      const s = e.link.startsWith('/') ? e.link : it.buildFromRelativePath(e);
      return l + s;
    }
    const r = pe.buildRoute(e, `/${e.pathSegment}`);
    return l + ee.replaceVars(r, t, ':', !1);
  }
  calculateNodeHref(e, t) {
    const n = pe.getRouteLink(e, t, re.getConfigValue('routing.useHashRouting') ? '#' : '');
    return this.getI18nViewUrl(n.url) || n;
  }
  getNodeHref(e, t) {
    if (re.getConfigBooleanValue('navigation.addNavHrefs')) return this.calculateNodeHref(e, t);
  }
  substituteDynamicParamsInObject(e, t, n = ':', l = !1) {
    return Object.entries(e)
      .map(([r, s]) => {
        const o = l ? Object.keys(t).find(c => s && s.indexOf(n + c) >= 0) : Object.keys(t).find(c => s === n + c);
        return [r, o ? (l ? s.replace(n + o, t[o]) : t[o]) : s];
      })
      .reduce((r, [s, o]) => Object.assign(r, { [s]: o }), {});
  }
  mapPathToNode(e, t) {
    if (!e || !t) return;
    const n = ee.trimLeadingSlash(e).split('/'),
      l = pe.buildRoute(t, `/${t.pathSegment}`),
      r = ee.trimLeadingSlash(l).split('/');
    if (n.length < r.length) return;
    let s = '';
    for (let o = 0; o < r.length; o++) {
      if (n[o] !== r[o] && r[o].indexOf(':') !== 0) return;
      s += '/' + n[o];
    }
    return s;
  }
  isDynamicNode(e) {
    return e.pathSegment && e.pathSegment.length > 0 && e.pathSegment[0] === ':';
  }
  getDynamicNodeValue(e, t) {
    return this.isDynamicNode(e) ? t[e.pathSegment.substring(1)] : void 0;
  }
  getI18nViewUrl(e) {
    const t = '{i18n.currentLocale}',
      n = ht.getCurrentLocale();
    return e && e.includes(t) ? e.replace(t, n) : e;
  }
  substituteViewUrl(e, t) {
    const n = 'context.',
      l = 'nodeParams.',
      r = 'routing.queryParams';
    if (
      ((e = ee.replaceVars(e, t.pathParams, ':', !1)),
      (e = ee.replaceVars(e, t.context, n)),
      (e = ee.replaceVars(e, t.nodeParams, l)),
      (e = this.getI18nViewUrl(e)),
      e && e.includes(r))
    ) {
      const s = e.split('?')[1];
      if (s) {
        const o = s.split('=')[0];
        sl.getSearchParams()[o]
          ? (e = e.replace(`{${r}.${o}}`, sl.getSearchParams()[o]))
          : (e = e.replace(`?${o}={${r}.${o}}`, ''));
      }
    }
    return e;
  }
  sanitizeParamsMap(e) {
    return Object.entries(e).reduce((t, n) => ((t[fr.sanitizeParam(n[0])] = fr.sanitizeParam(n[1])), t), {});
  }
  setFeatureToggles(e, t) {
    let n;
    const l = this.sanitizeParamsMap(this.parseParams(t.split('?')[1]));
    if ((l[e] && (n = l[e]), !n)) return;
    const r = n.split(',');
    r.length > 0 && r[0] !== '' && r.forEach(s => Vo.setFeatureToggle(s, !0));
  }
  getIntentObject(e) {
    const t = e.split('?intent=')[1];
    if (t) {
      const n = t.split('?'),
        l = n[0].split('-'),
        r = Object.fromEntries(new URLSearchParams(n[1]).entries());
      return { semanticObject: l[0], action: l[1], params: r };
    }
  }
  getIntentPath(e) {
    const t = re.getConfigValue('navigation.intentMapping');
    if (t && t.length > 0) {
      const n = e.replace(/\?intent=/i, '?intent='),
        l = this.getIntentObject(n);
      if (l) {
        let r = t.find(o => o.semanticObject === l.semanticObject && o.action === l.action);
        if (!r) return !1;
        if (r.externalLink) return { ...r.externalLink, external: !0 };
        r = r.pathSegment;
        const s = Object.entries(l.params);
        if (s && s.length > 0) {
          r = this.resolveDynamicIntentPath(r, l.params);
          let o = re.getConfigValue('routing.nodeParamPrefix');
          (o = o || '~'),
            (r = r.concat(`?${o}`)),
            s.forEach(([c, g], h) => {
              r += `${h > 0 ? '&' + o : ''}${c}=${g}`;
            });
        }
        return r;
      } else console.warn('Could not parse given intent link.');
    } else console.warn('No intent mappings are defined in Luigi configuration.');
    return !1;
  }
  resolveDynamicIntentPath(e, t) {
    if (!t) return e;
    let n = e;
    for (const [l, r] of Object.entries(t)) {
      const s = new RegExp('/:' + l + '(/|$)', 'g');
      n = n.replace(s, `/${r}/`);
    }
    return (n = n.replace(/\/$/, '')), n;
  }
  prepareSearchParamsForClient(e) {
    const t = {};
    return (
      e &&
        e.clientPermissions &&
        e.clientPermissions.urlParameters &&
        Object.keys(e.clientPermissions.urlParameters).forEach(n => {
          n in sl.getSearchParams() &&
            e.clientPermissions.urlParameters[n].read === !0 &&
            (t[n] = sl.getSearchParams()[n]);
        }),
      t
    );
  }
  addSearchParamsFromClient(e, t, n) {
    const l = { ...t };
    if (!!ee.isObject(l) && e && e.clientPermissions && e.clientPermissions.urlParameters) {
      const r = {};
      Object.keys(e.clientPermissions.urlParameters).forEach(s => {
        s in l && e.clientPermissions.urlParameters[s].write === !0 && ((r[s] = l[s]), delete l[s]);
      });
      for (const s in l) console.warn(`No permission to add the search param "${s}" to the url`);
      Object.keys(r).length > 0 && sl.addSearchParams(r, n);
    }
  }
  hasIntent(e) {
    return !!e && e.toLowerCase().includes('#?intent=');
  }
  getPageNotFoundRedirectResult(e, t = !1) {
    const n = re.getConfigValue('routing.pageNotFoundHandler');
    if (typeof n == 'function') {
      const l = n(e, t);
      if (l && l.redirectTo) return { path: l.redirectTo, keepURL: l.keepURL };
    }
    return {};
  }
  async handlePageNotFoundAndRetrieveRedirectPath(e, t, n) {
    if (n) return t;
    const l = this.getPageNotFoundRedirectResult(t).path;
    if (l !== void 0) return l;
    this.showRouteNotFoundAlert(e, t), console.warn(`Could not find the requested route: ${t}`);
  }
  showRouteNotFoundAlert(e, t, n = !1) {
    const l = {
      text: ht.getTranslation(n ? 'luigi.notExactTargetNode' : 'luigi.requestedRouteNotFound', { route: t }),
      type: 'error',
      ttl: 1
    };
    e.showAlert(l, !1);
  }
  modifySearchParams(e, t, n) {
    for (const [l, r] of Object.entries(e)) {
      const s = n ? `${n}${l}` : l;
      t.set(s, r), r === void 0 && t.delete(s);
    }
  }
  addParamsOnHashRouting(e, t, n) {
    let l = t;
    const [r, s] = l.split('?'),
      o = new URLSearchParams(s);
    return this.modifySearchParams(e, o, n), (l = r), o.toString() !== '' && (l += `?${o.toString()}`), l;
  }
  getURLWithoutModalData(e, t) {
    let n = new URLSearchParams(e);
    return n.delete(t), n.delete(`${t}Params`), n.toString();
  }
  handleHistoryState(e, t) {
    return (
      e && e.modalHistoryLength
        ? (e.modalHistoryLength += 1)
        : (e = { modalHistoryLength: 1, historygap: history.length, pathBeforeHistory: t }),
      e
    );
  }
}
const pe = new m2();
class b2 {
  optimizeScope(e) {
    let t = '';
    const n = [];
    return (
      [...e].sort().forEach(l => {
        l && !n.includes(l) && (!t || l.indexOf(t) !== 0) && (n.push(l), (t = l));
      }),
      n
    );
  }
  expandScope(e) {
    const t = [];
    return (
      e.forEach(n => {
        let l = '';
        n.split('.').forEach(r => {
          (l = l + (l ? '.' : '') + r), t.push(l);
        });
      }),
      [...new Set(t)]
    );
  }
  doOnStoreChange(e, t, n = []) {
    e.subscribe(t),
      this.expandScope(n).forEach(l => {
        e.subscribeToScope(t, l);
      });
  }
}
const Fn = new b2();
class v2 {
  constructor() {
    (this.listeners = []), (this.hashChangeWithoutSync = !1), (window.onunload = () => this.removeAllEventListeners());
  }
  addEventListener(e, t) {
    this.listeners.push({ type: e, listenerFn: t }), window.addEventListener(e, t);
  }
  removeEventListener(e, t) {
    (this.listeners = this.listeners.filter(n => !(n.type === e && n.listenerFn === t))),
      window.removeEventListener(e, t);
  }
  removeAllEventListeners() {
    this.listeners.forEach(e => {
      window.removeEventListener(e.type, e.listenerFn);
    }),
      (this.listeners = []);
  }
}
const Pn = new v2();
class w2 {
  constructor() {
    (this.init = !1), (this.storage = void 0), (this.browseSupported = void 0);
  }
  checkInit() {
    this.init ||
      ((this.storage = window.localStorage), (this.browseSupported = this.supportLocalStorage()), (this.init = !0));
  }
  supportLocalStorage() {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch {
      return !1;
    }
  }
  checkStorageBrowserSupport() {
    if (!this.browseSupported) throw 'Browser does not support local storage';
  }
  process(e, t, n, l, r) {
    try {
      this.checkInit(), this.checkStorageBrowserSupport();
      const s = this[l];
      if (typeof s != 'function') throw l + ' is not a supported operation for the storage';
      const o = s.bind(this, this.cleanHostname(t), r)();
      this.sendBackOperation(e, n, 'OK', o);
    } catch (s) {
      console.log(s), this.sendBackOperation(e, n, 'ERROR', s);
    }
  }
  cleanHostname(e) {
    return e.replace('http://', '').replace('https://', '');
  }
  setItem(e, t) {
    this.checkKey(t);
    const n = this.stringifyValue(t.value),
      l = this.buildKey(e, t.key);
    this.storage.setItem(l, n);
  }
  getItem(e, t) {
    this.checkKey(t);
    const n = this.buildKey(e, t.key),
      l = this.storage.getItem(n);
    if (l) return this.parseJsonIfPossible(l);
  }
  buildKey(e, t) {
    return this.buildPrefix(e) + t.trim();
  }
  buildPrefix(e) {
    return 'Luigi#' + e + '#';
  }
  removeItem(e, t) {
    this.checkKey(t);
    const n = this.buildKey(e, t.key),
      l = this.storage.getItem(n);
    if (l) return this.storage.removeItem(n), l;
  }
  clear(e, t) {
    const n = this.buildPrefix(e);
    Object.keys(this.storage)
      .filter(l => l.startsWith(n))
      .forEach(l => this.storage.removeItem(l));
  }
  has(e, t) {
    this.checkKey(t);
    const n = this.buildKey(e, t.key);
    return !!this.storage.getItem(n);
  }
  getAllKeys(e, t) {
    const n = this.buildPrefix(e);
    return Object.keys(this.storage)
      .filter(l => l.startsWith(n))
      .map(l => l.substring(n.length));
  }
  checkKey(e) {
    if (!e.key || e.key.trim().length === 0) throw 'Missing key, we cannot execute storage operation';
  }
  parseJsonIfPossible(e) {
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
  }
  stringifyValue(e) {
    if (!e) throw 'Value is empty';
    if (typeof e == 'string' || e instanceof String) return e;
    try {
      return JSON.stringify(e);
    } catch (t) {
      throw 'Value cannot be stringify, error: ' + t;
    }
  }
  sendBackOperation(e, t, n, l) {
    let r = { msg: 'storage', data: { id: t, status: n, result: l } };
    Ie.getMicrofrontendsInDom()
      .filter(s => s.id === e)
      .map(s => s.container)
      .map(s => Ie.sendMessageToIframe(s, r));
  }
}
const k2 = new w2();
class S2 {
  constructor() {}
  processUserSettingGroups() {
    const e = [],
      t = re.getConfigValue('userSettings.userSettingGroups'),
      n = re.getConfigValue('settings.userSettings.userSettingGroups'),
      l = t || n;
    if (ee.isObject(l)) {
      for (const r in l) {
        let s = {};
        (s[r] = l[r]), e.push(s);
      }
      return e;
    }
    return e;
  }
  createIframe(e, t) {
    const n = Ie.createIframe(e, void 0, void 0, 'usersettings'),
      l = document.querySelector('.iframeUserSettingsCtn');
    return n.setAttribute('userSettingsGroup', t), (n.userSettingsGroup = t), l.appendChild(n), n;
  }
  getUserSettingsIframesInDom() {
    const e = document.querySelector('.iframeUserSettingsCtn');
    return e ? [...e.children] : [];
  }
  hideUserSettingsIframe() {
    this.getUserSettingsIframesInDom().forEach(e => {
      e.style.display = 'none';
    });
  }
  findActiveCustomUserSettingsIframe(e) {
    let t = document.querySelectorAll('[userSettingsGroup]');
    for (let n = 0; n < t.length; n++) if (t[n].contentWindow === e) return t[n];
    return null;
  }
}
const rr = new S2();
class C2 {
  constructor() {}
  handleVisibilityGlobalSearch() {
    if (!document.querySelector('.lui-global-search')) return;
    const e = document.querySelector('.lui-global-search'),
      t = e.offsetWidth <= 384;
    e.classList.toggle('lui-global-search-toggle', t);
  }
}
const Kf = new C2();
function Jf(i, e, t) {
  const n = i.slice();
  return (n[9] = e[t]), n;
}
function jf(i) {
  let e,
    t,
    n = (i[9].dataSanitized ? i[9].settings.text : '') + '',
    l,
    r,
    s,
    o,
    c,
    g;
  function h() {
    return i[4](i[9]);
  }
  return {
    c() {
      (e = S('div')),
        (t = S('p')),
        (l = q()),
        (r = S('button')),
        (r.innerHTML = '<i class="sap-icon sap-icon--decline"></i>'),
        (s = q()),
        f(t, 'class', 'fd-message-strip__text svelte-1jc9s1u'),
        f(r, 'class', 'fd-button fd-button--transparent fd-button--compact fd-message-strip__close'),
        f(r, 'aria-label', 'Close'),
        f(r, 'aria-controls', 'j2ALl423'),
        f(r, 'data-testid', 'luigi-alert-dismiss'),
        f(
          e,
          'class',
          (o =
            'fd-message-strip fd-message-strip--' +
            i[1][i[9].settings.type] +
            ' fd-message-strip--dismissible svelte-1jc9s1u')
        ),
        f(e, 'role', 'alert'),
        f(e, 'id', 'j2ALl423'),
        f(e, 'data-testid', 'luigi-alert');
    },
    m(_, p) {
      R(_, e, p), w(e, t), (t.innerHTML = n), w(e, l), w(e, r), w(e, s), c || ((g = ne(r, 'click', h)), (c = !0));
    },
    p(_, p) {
      (i = _),
        p & 1 && n !== (n = (i[9].dataSanitized ? i[9].settings.text : '') + '') && (t.innerHTML = n),
        p & 3 &&
          o !==
            (o =
              'fd-message-strip fd-message-strip--' +
              i[1][i[9].settings.type] +
              ' fd-message-strip--dismissible svelte-1jc9s1u') &&
          f(e, 'class', o);
    },
    d(_) {
      _ && A(e), (c = !1), g();
    }
  };
}
function y2(i) {
  let e,
    t = i[0],
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = jf(Jf(i, t, l));
  return {
    c() {
      e = S('div');
      for (let l = 0; l < n.length; l += 1) n[l].c();
      f(e, 'class', 'fd-shell__overlay luigi-alert--overlay svelte-1jc9s1u'), f(e, 'aria-hidden', 'false');
    },
    m(l, r) {
      R(l, e, r);
      for (let s = 0; s < n.length; s += 1) n[s].m(e, null);
      i[5](e);
    },
    p(l, [r]) {
      if (r & 11) {
        t = l[0];
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = Jf(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = jf(o)), n[s].c(), n[s].m(e, null));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    i: Ue,
    o: Ue,
    d(l) {
      l && A(e), ct(n, l), i[5](null);
    }
  };
}
function P2(i, e, t) {
  const n = Wt();
  let { alertQueue: l } = e,
    { alertTypeMap: r = { info: 'information', success: 'success', warning: 'warning', error: 'error' } } = e,
    s;
  const o = vt('getUnsavedChangesModalPromise'),
    c = vt('handleNavigation');
  On(() => {
    if (!l || !l.length) {
      console.warn('There are no alerts to display');
      return;
    }
    if (l.processed) return;
    const p = l.map(m => {
      const { text: v, links: k, closeAfter: y } = m.settings,
        C = fr.processTextAndLinks(v, k, m.settings.id);
      if (
        (setTimeout(() => {
          C.links.forEach(T => {
            g(T, m.settings.id);
          });
        }),
        m.settings.afterInit)
      ) {
        const T = s;
        m.settings.afterInit({
          dismiss: () => {
            T && T.isConnected
              ? n('alertDismiss', { id: m.settings.id })
              : console.debug('Alert already dismissed: ', T);
          },
          element: T
        });
      }
      return { settings: { ...m.settings, text: C.sanitizedText }, dataSanitized: !0 };
    });
    (p.processed = !0), t(0, (l = p));
  }),
    Kt(() => {});
  function g(p, m) {
    try {
      const v = document.getElementById(p.elemId);
      v.dismissListener && v.removeEventListener('click', v.dismissListener);
      const k = y => {
        if (p.url) {
          const C = !p.url.startsWith('/');
          y.stopPropagation(),
            o().then(() => {
              const T = { params: { link: p.url, relative: C } };
              c(T);
            });
        } else p.dismissKey && n('alertDismiss', { id: m, dismissKey: p.dismissKey });
      };
      v.addEventListener('click', k), (v.dismissListener = k);
    } catch (v) {
      console.error('Error on Alert::addClickListener', v);
    }
  }
  const h = p => n('alertDismiss', { id: p.settings.id });
  function _(p) {
    xe[p ? 'unshift' : 'push'](() => {
      (s = p), t(2, s);
    });
  }
  return (
    (i.$$set = p => {
      'alertQueue' in p && t(0, (l = p.alertQueue)), 'alertTypeMap' in p && t(1, (r = p.alertTypeMap));
    }),
    [l, r, s, n, h, _]
  );
}
class N2 extends At {
  constructor(e) {
    super(), Lt(this, e, P2, y2, It, { alertQueue: 0, alertTypeMap: 1 });
  }
}
const Al = 38,
  Oi = 40,
  pi = 13,
  _i = 27,
  ga = 32,
  I2 = 36,
  T2 = 35;
function Yf(i) {
  let e, t;
  return {
    c() {
      (e = S('i')), f(e, 'class', (t = yn(i[3](i[0].icon)) + ' svelte-1d21c96'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l & 1 && t !== (t = yn(n[3](n[0].icon)) + ' svelte-1d21c96') && f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Qf(i) {
  let e,
    t,
    n = i[0].buttonConfirm + '',
    l,
    r,
    s;
  return {
    c() {
      (e = S('div')),
        (t = S('button')),
        (l = Pe(n)),
        f(t, 'data-testid', 'luigi-modal-confirm'),
        f(
          t,
          'class',
          'fd-button fd-button--emphasized fd-button--compact fd-message-box__decisive-button confirm-button'
        ),
        f(e, 'class', 'fd-bar__element');
    },
    m(o, c) {
      R(o, e, c), w(e, t), w(t, l), r || ((s = ne(t, 'click', i[4])), (r = !0));
    },
    p(o, c) {
      c & 1 && n !== (n = o[0].buttonConfirm + '') && Ne(l, n);
    },
    d(o) {
      o && A(e), (r = !1), s();
    }
  };
}
function L2(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o,
    c = i[0].header + '',
    g,
    h,
    _,
    p = i[0].body + '',
    m,
    v,
    k,
    y,
    C,
    T,
    N = i[0].buttonDismiss + '',
    D,
    I,
    L,
    M,
    F,
    O = i[0].type && Yf(i),
    j = i[0].buttonConfirm !== !1 && Qf(i);
  return {
    c() {
      (e = S('div')),
        (t = S('section')),
        (n = S('header')),
        (l = S('div')),
        (r = S('div')),
        O && O.c(),
        (s = q()),
        (o = S('h2')),
        (g = Pe(c)),
        (h = q()),
        (_ = S('div')),
        (m = q()),
        (v = S('footer')),
        (k = S('div')),
        j && j.c(),
        (y = q()),
        (C = S('div')),
        (T = S('button')),
        (D = Pe(N)),
        f(o, 'class', 'fd-title fd-title--h5'),
        f(r, 'class', 'fd-bar__element'),
        f(l, 'class', 'fd-bar__left'),
        f(n, 'class', 'fd-bar fd-bar--header fd-message-box__header'),
        f(_, 'class', 'fd-message-box__body svelte-1d21c96'),
        f(T, 'data-testid', 'luigi-modal-dismiss'),
        f(
          T,
          'class',
          (I =
            'fd-button ' +
            (i[0].buttonConfirm === !1 ? 'fd-button--emphasized' : 'fd-button--transparent') +
            ' fd-button--compact fd-message-box__decisive-button dismiss-button')
        ),
        f(C, 'class', 'fd-bar__element'),
        f(k, 'class', 'fd-bar__right'),
        f(v, 'class', 'fd-bar fd-bar--footer fd-message-box__footer'),
        f(t, 'class', 'fd-message-box__content svelte-1d21c96'),
        f(
          e,
          'class',
          (L =
            'fd-message-box-docs-static fd-message-box fd-message-box--' +
            i[0].type +
            ' fd-message-box--active svelte-1d21c96')
        ),
        f(e, 'data-testid', 'luigi-confirmation-modal');
    },
    m(fe, X) {
      R(fe, e, X),
        w(e, t),
        w(t, n),
        w(n, l),
        w(l, r),
        O && O.m(r, null),
        w(r, s),
        w(r, o),
        w(o, g),
        w(t, h),
        w(t, _),
        (_.innerHTML = p),
        w(t, m),
        w(t, v),
        w(v, k),
        j && j.m(k, null),
        w(k, y),
        w(k, C),
        w(C, T),
        w(T, D),
        M || ((F = [ne(window, 'keydown', i[1]), ne(T, 'click', i[5])]), (M = !0));
    },
    p(fe, [X]) {
      fe[0].type ? (O ? O.p(fe, X) : ((O = Yf(fe)), O.c(), O.m(r, s))) : O && (O.d(1), (O = null)),
        X & 1 && c !== (c = fe[0].header + '') && Ne(g, c),
        X & 1 && p !== (p = fe[0].body + '') && (_.innerHTML = p),
        fe[0].buttonConfirm !== !1 ? (j ? j.p(fe, X) : ((j = Qf(fe)), j.c(), j.m(k, y))) : j && (j.d(1), (j = null)),
        X & 1 && N !== (N = fe[0].buttonDismiss + '') && Ne(D, N),
        X & 1 &&
          I !==
            (I =
              'fd-button ' +
              (fe[0].buttonConfirm === !1 ? 'fd-button--emphasized' : 'fd-button--transparent') +
              ' fd-button--compact fd-message-box__decisive-button dismiss-button') &&
          f(T, 'class', I),
        X & 1 &&
          L !==
            (L =
              'fd-message-box-docs-static fd-message-box fd-message-box--' +
              fe[0].type +
              ' fd-message-box--active svelte-1d21c96') &&
          f(e, 'class', L);
    },
    i: Ue,
    o: Ue,
    d(fe) {
      fe && A(e), O && O.d(), j && j.d(), (M = !1), Ze(F);
    }
  };
}
function A2(i, e, t) {
  const n = Wt();
  let { settings: l } = e;
  const r = {
    confirmation: 'question-mark',
    information: 'message-information',
    warning: 'message-warning',
    error: 'message-error',
    success: 'message-success'
  };
  ha(() => {
    Ie.enableA11YKeyboardBackdropExceptClassName('.fd-message-box-docs-static');
  }),
    Kt(() => {
      const h = {
        icon: r[l.type],
        header: ht.getTranslation('luigi.confirmationModal.header'),
        body: ht.getTranslation('luigi.confirmationModal.body'),
        buttonDismiss: ht.getTranslation('luigi.button.dismiss'),
        buttonConfirm: ht.getTranslation('luigi.button.confirm')
      };
      t(0, (l = { ...l, body: fr.sanatizeHtmlExceptTextFormatting(l.body) })),
        t(0, (l = Object.assign(h, l))),
        Ie.disableA11YKeyboardExceptClassName('.fd-message-box-docs-static');
      const _ = l.buttonConfirm ? 'confirm-button' : 'dismiss-button';
      try {
        document.querySelector(`.${_}`).focus();
      } catch {
        console.warn(`Couldn't focus ${_} in modal`);
      }
    });
  function s(h) {
    return Te.renderIconClassName(h);
  }
  function o(h) {
    h.keyCode === _i && n('modalDismiss');
  }
  const c = () => n('modalConfirm'),
    g = () => n('modalDismiss');
  return (
    (i.$$set = h => {
      'settings' in h && t(0, (l = h.settings));
    }),
    [l, o, n, s, c, g]
  );
}
class R2 extends At {
  constructor(e) {
    super(), Lt(this, e, A2, L2, It, { settings: 0, handleKeydown: 1 });
  }
  get handleKeydown() {
    return this.$$.ctx[1];
  }
}
function E2(i) {
  let e, t, n, l;
  const r = i[5].default,
    s = Xg(r, i, i[4], null);
  return {
    c() {
      (e = S('div')),
        s && s.c(),
        f(e, 'class', (t = yn(i[0]) + ' svelte-6s1fu6')),
        f(e, 'aria-hidden', 'false'),
        f(e, 'style', (n = i[1] === 'main' ? 'z-index: 0;' : ''));
    },
    m(o, c) {
      R(o, e, c), s && s.m(e, null), (l = !0);
    },
    p(o, [c]) {
      s && s.p && (!l || c & 16) && e_(s, r, o, o[4], l ? xg(r, o[4], c, null) : t_(o[4]), null),
        (!l || (c & 1 && t !== (t = yn(o[0]) + ' svelte-6s1fu6'))) && f(e, 'class', t),
        (!l || (c & 2 && n !== (n = o[1] === 'main' ? 'z-index: 0;' : ''))) && f(e, 'style', n);
    },
    i(o) {
      l || (B(s, o), (l = !0));
    },
    o(o) {
      G(s, o), (l = !1);
    },
    d(o) {
      o && A(e), s && s.d(o);
    }
  };
}
function D2(i, e, t) {
  let { $$slots: n = {}, $$scope: l } = e;
  const r = Wt();
  let { backdropClass: s = '' } = e,
    { backdropActive: o = !1 } = e,
    c = !1,
    g = {},
    { area: h } = e,
    { disable: _ } = e;
  const p = () => {
      const v = 'lui-backdrop ';
      o
        ? g.data && g.data.heightCssClass
          ? t(0, (s = v + g.data.heightCssClass))
          : t(0, (s = v + 'height-auto'))
        : t(0, (s = ''));
    },
    m = v => {
      if (!h) return !0;
      const y = [
        ...Ie.getMicrofrontendsInDom(),
        { contentWindow: window, luigi: { viewUrl: window.location.href } }
      ].find(C => C.container && C.container.contentWindow === v.source);
      return !(y && h === y.type);
    };
  return (
    Kt(() => {
      re.getConfigValue('settings.backdropDisabled') ||
        (p(),
        Pn.addEventListener('message', k => {
          const y = Ie.getValidMessageSource(k);
          !y ||
            (_ !== !0 &&
              (k.data.msg === 'luigi.add-backdrop' &&
                (t(2, (o = m(k))), r('stateChanged', { backdropActive: !0 }), Ie.disableA11yOfInactiveIframe(y)),
              k.data.msg === 'luigi.remove-backdrop' &&
                (t(2, (o = !1)), r('stateChanged', { backdropActive: !1 }), c && Ie.enableA11yOfInactiveIframe())));
        }));
    }),
    On(() => {
      o !== c && ((c = o), p());
    }),
    (i.$$set = v => {
      'backdropClass' in v && t(0, (s = v.backdropClass)),
        'backdropActive' in v && t(2, (o = v.backdropActive)),
        'area' in v && t(1, (h = v.area)),
        'disable' in v && t(3, (_ = v.disable)),
        '$$scope' in v && t(4, (l = v.$$scope));
    }),
    [s, h, o, _, l, n]
  );
}
class $r extends At {
  constructor(e) {
    super(), Lt(this, e, D2, E2, It, { backdropClass: 0, backdropActive: 2, area: 1, disable: 3 });
  }
}
function ua(i, { delay: e = 0, duration: t = 400, easing: n = Lo } = {}) {
  const l = +getComputedStyle(i).opacity;
  return { delay: e, duration: t, easing: n, css: r => `opacity: ${r * l}` };
}
const { window: V2 } = Ui;
function Zf(i) {
  let e, t, n, l, r, s, o, c, g, h, _, p;
  t = new $r({ props: { disable: i[2] } });
  let m = i[0].title && Xf(i);
  return {
    c() {
      (e = S('div')),
        Ge(t.$$.fragment),
        (n = q()),
        (l = S('div')),
        (r = S('div')),
        m && m.c(),
        (s = q()),
        (o = S('div')),
        (c = S('div')),
        (g = S('button')),
        (g.innerHTML = '<i class="sap-icon sap-icon--decline"></i>'),
        f(r, 'class', 'fd-bar__element'),
        f(l, 'class', 'fd-bar__left'),
        f(g, 'class', 'fd-button fd-button--transparent fd-button--compact'),
        f(g, 'aria-label', 'close'),
        f(c, 'class', 'fd-bar__element'),
        f(o, 'class', 'fd-bar__right'),
        f(e, 'class', 'lui-modal-header fd-dialog__header fd-bar fd-bar--header svelte-10o42af');
    },
    m(v, k) {
      R(v, e, k),
        He(t, e, null),
        w(e, n),
        w(e, l),
        w(l, r),
        m && m.m(r, null),
        w(e, s),
        w(e, o),
        w(o, c),
        w(c, g),
        (h = !0),
        _ || ((p = ne(g, 'click', i[12])), (_ = !0));
    },
    p(v, k) {
      const y = {};
      k & 4 && (y.disable = v[2]),
        t.$set(y),
        v[0].title ? (m ? m.p(v, k) : ((m = Xf(v)), m.c(), m.m(r, null))) : m && (m.d(1), (m = null));
    },
    i(v) {
      h || (B(t.$$.fragment, v), (h = !0));
    },
    o(v) {
      G(t.$$.fragment, v), (h = !1);
    },
    d(v) {
      v && A(e), ze(t), m && m.d(), (_ = !1), p();
    }
  };
}
function Xf(i) {
  let e,
    t = i[0].title + '',
    n;
  return {
    c() {
      (e = S('h2')), (n = Pe(t)), f(e, 'class', 'fd-title fd-title--h5'), f(e, 'id', 'dialog-title-1');
    },
    m(l, r) {
      R(l, e, r), w(e, n);
    },
    p(l, r) {
      r & 1 && t !== (t = l[0].title + '') && Ne(n, t);
    },
    d(l) {
      l && A(e);
    }
  };
}
function $f(i) {
  let e;
  const t = i[11].default,
    n = Xg(t, i, i[10], null);
  return {
    c() {
      n && n.c();
    },
    m(l, r) {
      n && n.m(l, r), (e = !0);
    },
    p(l, r) {
      n && n.p && (!e || r & 1024) && e_(n, t, l, l[10], e ? xg(t, l[10], r, null) : t_(l[10]), null);
    },
    i(l) {
      e || (B(n, l), (e = !0));
    },
    o(l) {
      G(n, l), (e = !1);
    },
    d(l) {
      n && n.d(l);
    }
  };
}
function xf(i) {
  let e, t, n, l;
  return {
    c() {
      (e = S('div')),
        (e.innerHTML = `<div class="fd-busy-indicator--m" aria-hidden="false" aria-label="Loading" data-testid="luigi-loading-spinner"><div class="fd-busy-indicator--circle-0"></div> 
          <div class="fd-busy-indicator--circle-1"></div> 
          <div class="fd-busy-indicator--circle-2"></div></div>`),
        f(e, 'class', 'fd-page spinnerContainer svelte-10o42af'),
        f(e, 'aria-hidden', 'false'),
        f(e, 'aria-label', 'Loading');
    },
    m(r, s) {
      R(r, e, s), (l = !0);
    },
    i(r) {
      l ||
        (Rl(() => {
          n && n.end(1), (t = c_(e, ua, { delay: 250, duration: 250 })), t.start();
        }),
        (l = !0));
    },
    o(r) {
      t && t.invalidate(), (n = d_(e, ua, { duration: 250 })), (l = !1);
    },
    d(r) {
      r && A(e), r && n && n.end();
    }
  };
}
function M2(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C = (i[6] || (i[5] && i[0].header)) && Zf(i),
    T = i[5] && $f(i),
    N = i[4] && xf();
  return {
    c() {
      (e = S('div')),
        (t = S('div')),
        C && C.c(),
        (n = q()),
        (l = S('div')),
        T && T.c(),
        (r = q()),
        (s = S('div')),
        (g = q()),
        N && N.c(),
        f(s, 'class', (o = 'iframeModalCtn ' + (i[5] ? '_drawer' : '_modal') + ' svelte-10o42af')),
        f(s, 'modal-container-index', (c = i[5] ? void 0 : i[1])),
        f(l, 'class', 'fd-dialog__body svelte-10o42af'),
        f(
          t,
          'class',
          (h =
            'fd-dialog__content ' +
            (i[5]
              ? i[0].backdrop
                ? 'drawer drawer-dialog__content drawer__backdrop'
                : 'drawer drawer-dialog__content'
              : 'lui-modal-mf lui-modal-index-' + i[1]) +
            ' svelte-10o42af')
        ),
        f(t, 'data-testid', (_ = i[6] ? 'modal-mf' : 'drawer-mf')),
        f(t, 'role', 'dialog'),
        f(t, 'aria-modal', 'true'),
        f(t, 'aria-labelledby', 'dialog-title-1'),
        f(
          e,
          'class',
          (p =
            yn(i[6] || (i[5] && i[0].backdrop) ? 'fd-dialog fd-dialog--active' : 'drawer-dialog') + ' svelte-10o42af')
        ),
        f(e, 'style', (m = i[6] ? 'z-index:1001' : ''));
    },
    m(D, I) {
      R(D, e, I),
        w(e, t),
        C && C.m(t, null),
        w(t, n),
        w(t, l),
        T && T.m(l, null),
        w(l, r),
        w(l, s),
        w(t, g),
        N && N.m(t, null),
        (v = !0),
        k || ((y = ne(V2, 'keydown', i[3])), (k = !0));
    },
    p(D, [I]) {
      D[6] || (D[5] && D[0].header)
        ? C
          ? (C.p(D, I), I & 97 && B(C, 1))
          : ((C = Zf(D)), C.c(), B(C, 1), C.m(t, n))
        : C &&
          (Ee(),
          G(C, 1, 1, () => {
            C = null;
          }),
          De()),
        D[5]
          ? T
            ? (T.p(D, I), I & 32 && B(T, 1))
            : ((T = $f(D)), T.c(), B(T, 1), T.m(l, r))
          : T &&
            (Ee(),
            G(T, 1, 1, () => {
              T = null;
            }),
            De()),
        (!v || (I & 32 && o !== (o = 'iframeModalCtn ' + (D[5] ? '_drawer' : '_modal') + ' svelte-10o42af'))) &&
          f(s, 'class', o),
        (!v || (I & 34 && c !== (c = D[5] ? void 0 : D[1]))) && f(s, 'modal-container-index', c),
        D[4]
          ? N
            ? I & 16 && B(N, 1)
            : ((N = xf()), N.c(), B(N, 1), N.m(t, null))
          : N &&
            (Ee(),
            G(N, 1, 1, () => {
              N = null;
            }),
            De()),
        (!v ||
          (I & 35 &&
            h !==
              (h =
                'fd-dialog__content ' +
                (D[5]
                  ? D[0].backdrop
                    ? 'drawer drawer-dialog__content drawer__backdrop'
                    : 'drawer drawer-dialog__content'
                  : 'lui-modal-mf lui-modal-index-' + D[1]) +
                ' svelte-10o42af'))) &&
          f(t, 'class', h),
        (!v || (I & 64 && _ !== (_ = D[6] ? 'modal-mf' : 'drawer-mf'))) && f(t, 'data-testid', _),
        (!v ||
          (I & 97 &&
            p !==
              (p =
                yn(D[6] || (D[5] && D[0].backdrop) ? 'fd-dialog fd-dialog--active' : 'drawer-dialog') +
                ' svelte-10o42af'))) &&
          f(e, 'class', p),
        (!v || (I & 64 && m !== (m = D[6] ? 'z-index:1001' : ''))) && f(e, 'style', m);
    },
    i(D) {
      v || (B(C), B(T), B(N), (v = !0));
    },
    o(D) {
      G(C), G(T), G(N), (v = !1);
    },
    d(D) {
      D && A(e), C && C.d(), T && T.d(), N && N.d(), (k = !1), y();
    }
  };
}
function O2(i, e, t) {
  let { $$slots: n = {}, $$scope: l } = e,
    { settings: r } = e,
    { isDataPrepared: s = !1 } = e,
    { nodepath: o } = e,
    { modalIndex: c } = e,
    { disableBackdrop: g } = e;
  const h = Wt();
  let _,
    p,
    m,
    v = !1,
    k = !1,
    y = !0,
    C = !1,
    T = !0,
    N;
  const D = async X => {
      const Q = X && X.length ? ee.getPathWithoutHash(X) : '',
        ce = pe.parseParams(Q.split('?')[1]);
      m = pe.getNodeParams(ce);
      const Ce = await Mt.extractDataFromPath(X);
      (_ = Ce.nodeObject),
        t(5, (C = r.isDrawer || typeof _.drawer == 'object')),
        (N = C ? '._drawer' : `[modal-container-index="${c}"]`),
        C
          ? (t(6, (T = !1)),
            r.header === void 0
              ? (t(0, (r.header = !0), r), t(0, (r.title = _.label), r))
              : r.header && r.header.title && t(0, (r.title = r.header.title), r),
            (r.backdrop === void 0 || !r.backdrop) &&
              (t(0, (r.backdrop = !1), r), h('drawerState', { activeDrawer: !0 })),
            r.size || t(0, (r.size = 's'), r),
            r.overlap === void 0 && t(0, (r.overlap = !0), r))
          : r.title || t(0, (r.title = _.label), r),
        (p = Ce.pathData),
        t(8, (s = !0));
    },
    I = async X => {
      if (!(v || k))
        if (s)
          if (_.webcomponent)
            t(4, (y = !1)),
              C ? await F() : await L(),
              oa.renderWebComponent(_.viewUrl, document.querySelector(N), p.context, _),
              h('wcCreated', { modalWC: document.querySelector(N), modalWCData: { ...p, nodeParams: m } }),
              (k = !0);
          else {
            t(4, (y = _.loadingIndicator ? _.loadingIndicator.enabled : !0));
            const Q = await M(_.viewUrl, { context: p.context, pathParams: p.pathParams, nodeParams: m });
            h('iframeCreated', { modalIframe: Q, modalIframeData: { ...p, nodeParams: m } }), (v = !0);
          }
        else await D(X);
    },
    L = async () => {
      let X, Q;
      const ce = document.querySelector('.lui-modal-index-' + c),
        { size: Ce, width: H, height: ae } = r,
        $ = /^.?[0-9]{1,3}(%|px|rem|em|vh|vw)$/;
      if (H && H.match($) && ae && ae.match($)) (X = ae), (Q = H);
      else
        switch (Ce) {
          case 'fullscreen':
            (X = '100vh'), (Q = '100vw'), ce.classList.add('lui-modal-fullscreen');
            break;
          case 'm':
            (X = '80%'), (Q = '60%');
            break;
          case 's':
            (X = '80%'), (Q = '40%');
            break;
          default:
            (X = '80%'), (Q = '80%');
        }
      ce.setAttribute('style', `width:${Q};height:${X};`);
    },
    M = async (X, Q) => {
      C ? await F() : await L(), X && (X = pe.substituteViewUrl(X, Q));
      const ce = await Ie.createIframe(X, void 0, _, 'modal', Q);
      return document.querySelector(N).appendChild(ce), ce;
    };
  async function F(X) {
    let Q = '';
    const ce = document.getElementsByClassName('drawer'),
      Ce = document.getElementsByClassName('drawer-dialog');
    r.size &&
      (r.size === 'l'
        ? (Q = 'width:75%;')
        : r.size === 'm'
        ? (Q = 'width:50%;')
        : r.size === 's'
        ? (Q = 'width:25%;')
        : r.size === 'xs' && (Q = 'width:15.5%;')),
      r.backdrop
        ? ce[0].setAttribute('style', Q)
        : (Ce[0].setAttribute('style', Q), ce[0].setAttribute('style', 'width:100%'));
  }
  Eo(() => {
    I(o);
  });
  const O = async X => {
    X.data.msg === 'luigi.show-loading-indicator' && t(4, (y = !0)),
      X.data.msg === 'luigi.hide-loading-indicator' && t(4, (y = !1)),
      X.data.msg === 'luigi.get-context' &&
        (!_ || !_.loadingIndicator || _.loadingIndicator.hideAutomatically !== !1) &&
        t(4, (y = !1)),
      X.data.msg === 'luigi.close-modal' && h('close', { type: 'modal' }),
      X.data.msg === 'luigi.navigation.updateModalSettings' &&
        ((X.data.updatedModalSettings.title || X.data.updatedModalSettings.title === '') &&
          t(0, (r.title = X.data.updatedModalSettings.title), r),
        X.data.updatedModalSettings.size && (t(0, (r.size = X.data.updatedModalSettings.size), r), await L()));
  };
  Kt(() => {
    Pn.addEventListener('message', O),
      (r.isDrawer && !r.backdrop) || Ie.disableA11YKeyboardExceptClassName('.lui-modal-index-' + c),
      window.focus();
  }),
    ha(() => {
      Pn.removeEventListener('message', O),
        (r.isDrawer && !r.backdrop) || Ie.enableA11YKeyboardBackdropExceptClassName('.lui-modal-index-' + c);
    });
  function j(X) {
    X.keyCode === _i && h('close');
  }
  const fe = () => h('close', { activeDrawer: !1 });
  return (
    (i.$$set = X => {
      'settings' in X && t(0, (r = X.settings)),
        'isDataPrepared' in X && t(8, (s = X.isDataPrepared)),
        'nodepath' in X && t(9, (o = X.nodepath)),
        'modalIndex' in X && t(1, (c = X.modalIndex)),
        'disableBackdrop' in X && t(2, (g = X.disableBackdrop)),
        '$$scope' in X && t(10, (l = X.$$scope));
    }),
    [r, c, g, j, y, C, T, h, s, o, l, n, fe]
  );
}
class N_ extends At {
  constructor(e) {
    super(),
      Lt(this, e, O2, M2, It, {
        settings: 0,
        isDataPrepared: 8,
        nodepath: 9,
        modalIndex: 1,
        disableBackdrop: 2,
        handleKeydown: 3
      });
  }
  get handleKeydown() {
    return this.$$.ctx[3];
  }
}
function ec(i, e, t) {
  const n = i.slice();
  return (n[29] = e[t][0]), (n[30] = e[t][1]), (n[31] = e), (n[32] = t), n;
}
function tc(i, e, t) {
  const n = i.slice();
  return (n[33] = e[t]), (n[35] = t), n;
}
function nc(i, e, t) {
  const n = i.slice();
  return (n[33] = e[t]), (n[35] = t), n;
}
function ic(i) {
  let e,
    t = i[1][1].settings && lc(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, l) {
      n[1][1].settings ? (t ? t.p(n, l) : ((t = lc(n)), t.c(), t.m(e.parentNode, e))) : t && (t.d(1), (t = null));
    },
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function lc(i) {
  let e,
    t,
    n = Object.entries(i[1][1].settings),
    l = [];
  for (let r = 0; r < n.length; r += 1) l[r] = hc(ec(i, n, r));
  return {
    c() {
      (e = S('div')), (t = S('div'));
      for (let r = 0; r < l.length; r += 1) l[r].c();
      f(t, 'class', 'fd-container fd-form-layout-grid-container'), f(e, 'class', 'fd-page__content');
    },
    m(r, s) {
      R(r, e, s), w(e, t);
      for (let o = 0; o < l.length; o += 1) l[o].m(t, null);
    },
    p(r, s) {
      if (s[0] & 16191) {
        n = Object.entries(r[1][1].settings);
        let o;
        for (o = 0; o < n.length; o += 1) {
          const c = ec(r, n, o);
          l[o] ? l[o].p(c, s) : ((l[o] = hc(c)), l[o].c(), l[o].m(t, null));
        }
        for (; o < l.length; o += 1) l[o].d(1);
        l.length = n.length;
      }
    },
    d(r) {
      r && A(e), ct(l, r);
    }
  };
}
function rc(i) {
  let e;
  function t(r, s) {
    return r[30].isEditable || r[30].isEditable === void 0 ? U2 : F2;
  }
  let n = t(i),
    l = n(i);
  return {
    c() {
      l.c(), (e = ye());
    },
    m(r, s) {
      l.m(r, s), R(r, e, s);
    },
    p(r, s) {
      n === (n = t(r)) && l ? l.p(r, s) : (l.d(1), (l = n(r)), l && (l.c(), l.m(e.parentNode, e)));
    },
    d(r) {
      l.d(r), r && A(e);
    }
  };
}
function F2(i) {
  let e,
    t = i[0][i[1][0]][i[29]] + '',
    n,
    l;
  return {
    c() {
      (e = S('div')),
        (n = Pe(t)),
        f(e, 'class', 'fd-text'),
        f(e, 'data-testid', 'lui-us-input' + i[32]),
        f(e, 'id', 'fd-form-input-' + i[32]),
        f(e, 'disabled', (l = !(i[30].isEditable === void 0 || i[30].isEditable)));
    },
    m(r, s) {
      R(r, e, s), w(e, n);
    },
    p(r, s) {
      s[0] & 3 && t !== (t = r[0][r[1][0]][r[29]] + '') && Ne(n, t),
        s[0] & 2 && l !== (l = !(r[30].isEditable === void 0 || r[30].isEditable)) && f(e, 'disabled', l);
    },
    d(r) {
      r && A(e);
    }
  };
}
function U2(i) {
  let e, t, n, l, r;
  function s() {
    i[18].call(e, i[29]);
  }
  return {
    c() {
      (e = S('input')),
        f(e, 'class', 'fd-input fd-input--compact'),
        f(e, 'type', 'text'),
        f(e, 'aria-label', 'Image label'),
        f(e, 'placeholder', (t = i[5](i[30].placeholder))),
        f(e, 'data-testid', 'lui-us-input' + i[32]),
        f(e, 'id', 'fd-form-input-' + i[32]),
        (e.disabled = n = !(i[30].isEditable === void 0 || i[30].isEditable));
    },
    m(o, c) {
      R(o, e, c), qf(e, i[0][i[1][0]][i[29]]), l || ((r = ne(e, 'input', s)), (l = !0));
    },
    p(o, c) {
      (i = o),
        c[0] & 34 && t !== (t = i[5](i[30].placeholder)) && f(e, 'placeholder', t),
        c[0] & 2 && n !== (n = !(i[30].isEditable === void 0 || i[30].isEditable)) && (e.disabled = n),
        c[0] & 3 && e.value !== i[0][i[1][0]][i[29]] && qf(e, i[0][i[1][0]][i[29]]);
    },
    d(o) {
      o && A(e), (l = !1), r();
    }
  };
}
function sc(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o = i[11](i[0][i[1][0]][i[29]], i[30].options) + '',
    c,
    g,
    h,
    _,
    p,
    m,
    v = Array.isArray(i[30].options),
    k,
    y;
  function C(...D) {
    return i[19](i[29], i[32], i[30], ...D);
  }
  function T() {
    return i[20](i[30]);
  }
  let N = v && ac(i);
  return {
    c() {
      (e = S('div')),
        (t = S('div')),
        (n = S('div')),
        (l = S('div')),
        (r = S('button')),
        (s = S('span')),
        (c = Pe(o)),
        (h = q()),
        (_ = S('span')),
        (_.innerHTML = '<i class="sap-icon--slim-arrow-down"></i>'),
        (p = q()),
        (m = S('div')),
        N && N.c(),
        f(s, 'class', 'fd-select__text-content'),
        f(s, 'data-testid', 'lui-us-input' + i[32]),
        f(s, 'disabled', (g = !(i[30].isEditable === void 0 || i[30].isEditable))),
        f(_, 'class', 'fd-button fd-button--transparent fd-select__button lui-activate-language-dropdown'),
        f(r, 'tabindex', '0'),
        f(r, 'aria-expanded', 'false'),
        f(r, 'aria-haspopup', 'listbox'),
        f(r, 'aria-label', 'Language'),
        f(r, 'class', 'fd-select__control lui-anchor-node svelte-1tiapr5'),
        f(r, 'data-testid', 'lui-us-language-dropdown'),
        f(r, 'id', 'fd-form-input-' + i[32]),
        f(l, 'class', 'fd-select fd-select--compact'),
        f(n, 'class', 'fd-popover__control'),
        f(n, 'aria-expanded', 'false'),
        f(n, 'aria-haspopup', 'true'),
        f(
          m,
          'class',
          'fd-popover__body fd-popover__body--no-arrow fd-popover__body--dropdown fd-popover__body--dropdown-fill'
        ),
        f(m, 'aria-hidden', 'true'),
        f(t, 'class', 'fd-popover'),
        f(e, 'class', 'fd-form-item');
    },
    m(D, I) {
      R(D, e, I),
        w(e, t),
        w(t, n),
        w(n, l),
        w(l, r),
        w(r, s),
        w(s, c),
        w(r, h),
        w(r, _),
        w(t, p),
        w(t, m),
        N && N.m(m, null),
        k || ((y = [ne(r, 'keydown', C), ne(n, 'click', Ot(T))]), (k = !0));
    },
    p(D, I) {
      (i = D),
        I[0] & 3 && o !== (o = i[11](i[0][i[1][0]][i[29]], i[30].options) + '') && Ne(c, o),
        I[0] & 2 && g !== (g = !(i[30].isEditable === void 0 || i[30].isEditable)) && f(s, 'disabled', g),
        I[0] & 2 && (v = Array.isArray(i[30].options)),
        v ? (N ? N.p(i, I) : ((N = ac(i)), N.c(), N.m(m, null))) : N && (N.d(1), (N = null));
    },
    d(D) {
      D && A(e), N && N.d(), (k = !1), Ze(y);
    }
  };
}
function ac(i) {
  let e,
    t = i[30].options,
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = oc(nc(i, t, l));
  return {
    c() {
      e = S('ul');
      for (let l = 0; l < n.length; l += 1) n[l].c();
      f(e, 'class', 'fd-list fd-list--compact fd-list--dropdown'),
        f(e, 'id', 'fd-form-input-dropdown-' + i[32]),
        f(e, 'role', 'listbox');
    },
    m(l, r) {
      R(l, e, r);
      for (let s = 0; s < n.length; s += 1) n[s].m(e, null);
    },
    p(l, r) {
      if (r[0] & 4634) {
        t = l[30].options;
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = nc(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = oc(o)), n[s].c(), n[s].m(e, null));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    d(l) {
      l && A(e), ct(n, l);
    }
  };
}
function oc(i) {
  let e,
    t,
    n = i[12](i[33]) + '',
    l,
    r,
    s,
    o;
  function c() {
    return i[21](i[29], i[33], i[35]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('span')),
        (l = Pe(n)),
        (r = q()),
        f(t, 'class', 'fd-list__title'),
        f(e, 'role', 'option'),
        f(e, 'class', 'fd-list__item'),
        f(e, 'data-testid', 'lui-us-option' + i[32] + '_' + i[35]),
        f(e, 'tabindex', '0'),
        hi(e, 'is-selected', i[4] === i[35]),
        hi(e, 'is-focus', i[4] === i[35]);
    },
    m(g, h) {
      R(g, e, h), w(e, t), w(t, l), w(e, r), s || ((o = [ne(e, 'click', c), ne(e, 'keydown', i[22])]), (s = !0));
    },
    p(g, h) {
      (i = g),
        h[0] & 2 && n !== (n = i[12](i[33]) + '') && Ne(l, n),
        h[0] & 16 && hi(e, 'is-selected', i[4] === i[35]),
        h[0] & 16 && hi(e, 'is-focus', i[4] === i[35]);
    },
    d(g) {
      g && A(e), (s = !1), Ze(o);
    }
  };
}
function uc(i) {
  let e,
    t,
    n,
    l = i[30].options,
    r = [];
  for (let s = 0; s < l.length; s += 1) r[s] = fc(tc(i, l, s));
  return {
    c() {
      (e = S('div')), (t = S('div'));
      for (let s = 0; s < r.length; s += 1) r[s].c();
      f(t, 'class', (n = 'fd-segmented-button enum-buttons-container-' + i[29] + ' svelte-1tiapr5')),
        f(t, 'role', 'group'),
        f(t, 'aria-label', 'Group label'),
        f(e, 'class', 'fd-form-item');
    },
    m(s, o) {
      R(s, e, o), w(e, t);
      for (let c = 0; c < r.length; c += 1) r[c].m(t, null);
    },
    p(s, o) {
      if (o[0] & 13315) {
        l = s[30].options;
        let c;
        for (c = 0; c < l.length; c += 1) {
          const g = tc(s, l, c);
          r[c] ? r[c].p(g, o) : ((r[c] = fc(g)), r[c].c(), r[c].m(t, null));
        }
        for (; c < r.length; c += 1) r[c].d(1);
        r.length = l.length;
      }
      o[0] & 2 &&
        n !== (n = 'fd-segmented-button enum-buttons-container-' + s[29] + ' svelte-1tiapr5') &&
        f(t, 'class', n);
    },
    d(s) {
      s && A(e), ct(r, s);
    }
  };
}
function fc(i) {
  let e,
    t = i[12](i[33]) + '',
    n,
    l,
    r,
    s,
    o,
    c,
    g,
    h;
  function _() {
    return i[23](i[29], i[33]);
  }
  return {
    c() {
      (e = S('button')),
        (n = Pe(t)),
        (l = q()),
        f(
          e,
          'class',
          (r =
            'lui-fd-enum-button fd-button fd-button--compact ' +
            (i[0][i[1][0]][i[29]] === (i[33].value || i[33]) ? 'is-selected' : ''))
        ),
        f(e, 'id', (s = i[13]('lui-us-enum_button', i[29], i[33]))),
        f(e, 'data-testid', (o = i[13]('lui-us-enum_button', i[29], i[33]))),
        (e.disabled = c = !(i[30].isEditable === void 0 || i[30].isEditable));
    },
    m(p, m) {
      R(p, e, m), w(e, n), w(e, l), g || ((h = ne(e, 'click', _)), (g = !0));
    },
    p(p, m) {
      (i = p),
        m[0] & 2 && t !== (t = i[12](i[33]) + '') && Ne(n, t),
        m[0] & 3 &&
          r !==
            (r =
              'lui-fd-enum-button fd-button fd-button--compact ' +
              (i[0][i[1][0]][i[29]] === (i[33].value || i[33]) ? 'is-selected' : '')) &&
          f(e, 'class', r),
        m[0] & 2 && s !== (s = i[13]('lui-us-enum_button', i[29], i[33])) && f(e, 'id', s),
        m[0] & 2 && o !== (o = i[13]('lui-us-enum_button', i[29], i[33])) && f(e, 'data-testid', o),
        m[0] & 2 && c !== (c = !(i[30].isEditable === void 0 || i[30].isEditable)) && (e.disabled = c);
    },
    d(p) {
      p && A(e), (g = !1), h();
    }
  };
}
function cc(i) {
  let e, t, n, l, r, s, o, c, g, h;
  function _() {
    i[24].call(n, i[29]);
  }
  return {
    c() {
      (e = S('label')),
        (t = S('span')),
        (n = S('input')),
        (s = q()),
        (o = S('div')),
        (o.innerHTML =
          '<div class="fd-switch__track"><span class="fd-switch__handle" role="presentation"></span></div>'),
        f(n, 'class', 'fd-switch__input'),
        f(n, 'type', 'checkbox'),
        f(n, 'aria-labelledby', 'label1'),
        f(n, 'data-testid', (l = 'lui-us-checkbox-switch_' + i[29])),
        (n.disabled = r = !(i[30].isEditable === void 0 || i[30].isEditable)),
        f(o, 'class', 'fd-switch__slider'),
        f(t, 'class', 'fd-switch__control'),
        f(e, 'class', 'fd-switch fd-switch--compact'),
        f(e, 'data-testid', (c = 'lui-us-label-switch_' + i[29]));
    },
    m(p, m) {
      R(p, e, m),
        w(e, t),
        w(t, n),
        (n.checked = i[0][i[1][0]][i[29]]),
        w(t, s),
        w(t, o),
        g || ((h = ne(n, 'change', _)), (g = !0));
    },
    p(p, m) {
      (i = p),
        m[0] & 2 && l !== (l = 'lui-us-checkbox-switch_' + i[29]) && f(n, 'data-testid', l),
        m[0] & 2 && r !== (r = !(i[30].isEditable === void 0 || i[30].isEditable)) && (n.disabled = r),
        m[0] & 3 && (n.checked = i[0][i[1][0]][i[29]]),
        m[0] & 2 && c !== (c = 'lui-us-label-switch_' + i[29]) && f(e, 'data-testid', c);
    },
    d(p) {
      p && A(e), (g = !1), h();
    }
  };
}
function dc(i) {
  let e, t, n, l;
  function r() {
    i[25].call(e, i[29]);
  }
  return {
    c() {
      (e = S('input')),
        f(e, 'type', 'checkbox'),
        f(e, 'class', 'fd-checkbox'),
        (e.disabled = t = !(i[30].isEditable === void 0 || i[30].isEditable));
    },
    m(s, o) {
      R(s, e, o), (e.checked = i[0][i[1][0]][i[29]]), n || ((l = ne(e, 'change', r)), (n = !0));
    },
    p(s, o) {
      (i = s),
        o[0] & 2 && t !== (t = !(i[30].isEditable === void 0 || i[30].isEditable)) && (e.disabled = t),
        o[0] & 3 && (e.checked = i[0][i[1][0]][i[29]]);
    },
    d(s) {
      s && A(e), (n = !1), l();
    }
  };
}
function hc(i) {
  let e,
    t,
    n,
    l = i[5](i[30].label) + '',
    r,
    s,
    o,
    c,
    g,
    h,
    _ = i[30].type === 'enum' && i[30].style === 'button' && Array.isArray(i[30].options),
    p,
    m,
    v,
    k = i[30].type === 'string' && rc(i),
    y = i[30].type === 'enum' && (i[30].style === void 0 || i[30].style === 'list') && sc(i),
    C = _ && uc(i),
    T = i[30].type === 'boolean' && (!i[30].style || i[30].style === 'switch') && cc(i),
    N = i[30].type === 'boolean' && i[30].style === 'checkbox' && dc(i);
  return {
    c() {
      (e = S('div')),
        (t = S('div')),
        (n = S('label')),
        (r = Pe(l)),
        (s = Pe(':')),
        (o = q()),
        (c = S('div')),
        k && k.c(),
        (g = q()),
        y && y.c(),
        (h = q()),
        C && C.c(),
        (p = q()),
        T && T.c(),
        (m = q()),
        N && N.c(),
        (v = q()),
        f(n, 'class', 'fd-form-label svelte-1tiapr5'),
        f(n, 'for', 'fd-form-input-' + i[32]),
        f(t, 'class', 'fd-col fd-col--4 svelte-1tiapr5'),
        f(c, 'class', 'fd-col fd-col--8 svelte-1tiapr5'),
        f(e, 'class', 'fd-row svelte-1tiapr5');
    },
    m(D, I) {
      R(D, e, I),
        w(e, t),
        w(t, n),
        w(n, r),
        w(n, s),
        w(e, o),
        w(e, c),
        k && k.m(c, null),
        w(c, g),
        y && y.m(c, null),
        w(c, h),
        C && C.m(c, null),
        w(c, p),
        T && T.m(c, null),
        w(c, m),
        N && N.m(c, null),
        w(e, v);
    },
    p(D, I) {
      I[0] & 34 && l !== (l = D[5](D[30].label) + '') && Ne(r, l),
        D[30].type === 'string' ? (k ? k.p(D, I) : ((k = rc(D)), k.c(), k.m(c, g))) : k && (k.d(1), (k = null)),
        D[30].type === 'enum' && (D[30].style === void 0 || D[30].style === 'list')
          ? y
            ? y.p(D, I)
            : ((y = sc(D)), y.c(), y.m(c, h))
          : y && (y.d(1), (y = null)),
        I[0] & 2 && (_ = D[30].type === 'enum' && D[30].style === 'button' && Array.isArray(D[30].options)),
        _ ? (C ? C.p(D, I) : ((C = uc(D)), C.c(), C.m(c, p))) : C && (C.d(1), (C = null)),
        D[30].type === 'boolean' && (!D[30].style || D[30].style === 'switch')
          ? T
            ? T.p(D, I)
            : ((T = cc(D)), T.c(), T.m(c, m))
          : T && (T.d(1), (T = null)),
        D[30].type === 'boolean' && D[30].style === 'checkbox'
          ? N
            ? N.p(D, I)
            : ((N = dc(D)), N.c(), N.m(c, null))
          : N && (N.d(1), (N = null));
    },
    d(D) {
      D && A(e), k && k.d(), y && y.d(), C && C.d(), T && T.d(), N && N.d();
    }
  };
}
function B2(i) {
  let e,
    t,
    n,
    l = i[1] && i[1][0] && i[1][1] && ic(i);
  return {
    c() {
      (e = S('div')), l && l.c(), f(e, 'class', 'lui-usersettings-content svelte-1tiapr5');
    },
    m(r, s) {
      R(r, e, s), l && l.m(e, null), t || ((n = [ne(window, 'click', i[7]), ne(window, 'blur', i[7])]), (t = !0));
    },
    p(r, s) {
      r[1] && r[1][0] && r[1][1] ? (l ? l.p(r, s) : ((l = ic(r)), l.c(), l.m(e, null))) : l && (l.d(1), (l = null));
    },
    i: Ue,
    o: Ue,
    d(r) {
      r && A(e), l && l.d(), (t = !1), Ze(n);
    }
  };
}
function W2(i, e, t) {
  let n,
    { userSettingGroup: l } = e,
    { userSettingsGroupKey: r } = e,
    { storedUserSettingData: s } = e;
  const o = Wt();
  let c = vt('getTranslation');
  mi(i, c, H => t(5, (n = H)));
  let g,
    { isComboOpen: h } = e;
  function _() {
    o('updateSettingsObject', { storedUserSettingData: s });
  }
  const p = () => {
    m();
  };
  function m(H) {
    document.querySelectorAll('.lui-usersettings-content .fd-popover__control').forEach(ae => {
      y(ae, !1);
    });
  }
  function v(H, ae, $) {
    if (H && $ > 0)
      return ee.isIE()
        ? H.msMatchesSelector(ae)
          ? H
          : v(H.parentNode, ae, $ - 1)
        : H.matches(ae)
        ? H
        : v(H.parentNode, ae, $ - 1);
  }
  function k(H, ae) {
    let $ = v(H.target, '.fd-popover__control', 20),
      K = $.getAttribute('aria-expanded') === 'true';
    (ae || ae === void 0) && (m(), y($, !K));
  }
  function y(H, ae) {
    const $ = H.querySelector('.lui-activate-language-dropdown'),
      K = H.parentNode.querySelector('.fd-popover__body'),
      le = H.parentNode.querySelector('.fd-select__control');
    H.setAttribute('aria-expanded', ae),
      K.setAttribute('aria-hidden', !ae),
      le.setAttribute('aria-expanded', ae),
      $.setAttribute('aria-expanded', ae),
      t(14, (h = ae));
  }
  function C(H, ae, $) {
    t(4, (g = $)), t(0, (s[l[0]][H] = ae.value || ae), s);
  }
  function T(H, ae) {
    document.querySelectorAll('.enum-buttons-container-' + H + ' button').forEach($ => {
      const K = $.getAttribute('id'),
        le = `lui-us-enum_button_${H}_option`;
      K === le ? $.classList.add('fd-button--emphasized') : $.classList.remove('fd-button--emphasized');
    }),
      t(0, (s[l[0]][H] = ae.value || ae), s);
  }
  function N(H, ae) {
    let $;
    if (Array.isArray(ae)) {
      for (let K = 0; K < ae.length; K++)
        if (ee.isObject(ae[K])) {
          if (ae[K].value && ae[K].value === H) {
            ($ = ae[K].label), t(4, (g = K));
            break;
          }
        } else {
          ($ = H), t(4, (g = ae.indexOf(H)));
          break;
        }
      return n($);
    }
  }
  function D(H) {
    return n(ee.isObject(H) ? H.label : H);
  }
  function I(H, ae, $) {
    return ee.isObject($) ? `${H}_${ae}_${$.value}` : `${H}_${ae}_${$}`;
  }
  function L(H, ae, $, K) {
    let le = v(H.target, '.lui-anchor-node', 20);
    const ve = document.getElementById(`fd-form-input-dropdown-${$}`).children;
    let ue = -1;
    if (
      ([...ve].forEach((x, be) => {
        x.classList.contains('is-focus') && (ue = be);
      }),
      h)
    ) {
      if ((H.keyCode === Al && H.altKey && (le.click(), le.focus()), H.keyCode === Oi && !H.altKey)) {
        if (ue === -1) {
          (ue = 0), ve.item(ue).classList.add('is-focus');
          return;
        }
        ue < K.options.length - 1 &&
          (ve.item(ue).classList.remove('is-focus'), (ue += 1), ve.item(ue).classList.add('is-focus'));
      }
      if (H.keyCode === Al && !H.altKey) {
        if (ue === -1) {
          (ue = ue.length - 1), ve.item(ue).classList.add('is-focus');
          return;
        }
        ue > 0 &&
          ue < K.options.length &&
          (ve.item(ue).classList.remove('is-focus'), (ue -= 1), ve.item(ue).classList.add('is-focus'));
      }
      H.keyCode === pi && C(ae, K.options[ue], ue);
    } else
      le.focus(),
        H.keyCode === Oi && H.altKey && le.click(),
        H.keyCode === Oi && !H.altKey && ue < K.options.length - 1 && C(ae, K.options[ue + 1], ue + 1),
        H.keyCode === Al && !H.altKey && ue > 0 && ue < K.options.length && C(ae, K.options[ue - 1], ue - 1);
  }
  function M(H) {
    if (h) {
      let ae = v(H.target, '.fd-popover', 20);
      ae.blur(),
        (H.keyCode === ga || H.keyCode === pi) &&
          (H.target.click(),
          m(),
          setTimeout(() => {
            ae.focus();
          }, 0));
    }
  }
  N();
  function F(H) {
    (s[l[0]][H] = this.value), t(0, s);
  }
  const O = (H, ae, $, K) => L(K, H, ae, $),
    j = H => k(event, H.isEditable),
    fe = (H, ae, $) => C(H, ae, $),
    X = H => M(H),
    Q = (H, ae) => T(H, ae);
  function ce(H) {
    (s[l[0]][H] = this.checked), t(0, s);
  }
  function Ce(H) {
    (s[l[0]][H] = this.checked), t(0, s);
  }
  return (
    (i.$$set = H => {
      'userSettingGroup' in H && t(1, (l = H.userSettingGroup)),
        'userSettingsGroupKey' in H && t(15, (r = H.userSettingsGroupKey)),
        'storedUserSettingData' in H && t(0, (s = H.storedUserSettingData)),
        'isComboOpen' in H && t(14, (h = H.isComboOpen));
    }),
    [s, l, L, M, g, n, c, m, k, C, T, N, D, I, h, r, _, p, F, O, j, fe, X, Q, ce, Ce]
  );
}
class H2 extends At {
  constructor(e) {
    super(),
      Lt(
        this,
        e,
        W2,
        B2,
        It,
        {
          userSettingGroup: 1,
          userSettingsGroupKey: 15,
          storedUserSettingData: 0,
          isComboOpen: 14,
          updateSettingsObject: 16,
          closeDropDown: 17,
          handleKeyListDropdown: 2,
          keyPressDropdownNode: 3
        },
        null,
        [-1, -1]
      );
  }
  get updateSettingsObject() {
    return this.$$.ctx[16];
  }
  get closeDropDown() {
    return this.$$.ctx[17];
  }
  get handleKeyListDropdown() {
    return this.$$.ctx[2];
  }
  get keyPressDropdownNode() {
    return this.$$.ctx[3];
  }
}
const { window: gc } = Ui;
function _c(i, e, t) {
  const n = i.slice();
  return (n[31] = e[t][0]), (n[11] = e[t][1]), (n[38] = t), n;
}
function pc(i, e, t) {
  const n = i.slice();
  return (n[39] = e[t]), n;
}
function mc(i) {
  let e, t, n;
  function l(o, c) {
    return c[0] & 2 && (e = null), e == null && (e = !!o[19](o[39][1])), e ? q2 : z2;
  }
  let r = l(i, [-1, -1]),
    s = r(i);
  return {
    c() {
      s.c(), (t = q()), (n = S('i')), f(n, 'role', 'presentation'), f(n, 'class', 'sap-icon');
    },
    m(o, c) {
      s.m(o, c), R(o, t, c), R(o, n, c);
    },
    p(o, c) {
      r === (r = l(o, c)) && s ? s.p(o, c) : (s.d(1), (s = r(o)), s && (s.c(), s.m(t.parentNode, t)));
    },
    d(o) {
      s.d(o), o && A(t), o && A(n);
    }
  };
}
function z2(i) {
  let e,
    t,
    n,
    l,
    r,
    s = i[39][1].initials && bc(i);
  return {
    c() {
      (e = S('span')),
        (l = q()),
        s && s.c(),
        (r = ye()),
        f(e, 'class', (t = yn(i[39][1].iconClassAttribute || 'fd-image--s fd-list__thumbnail') + ' svelte-yylqtk')),
        f(e, 'aria-label', (n = i[39][1].altText ? i[39][1].altText : '')),
        li(e, 'background-image', "url('" + i[39][1].icon + "')"),
        li(e, 'background-size', 'cover');
    },
    m(o, c) {
      R(o, e, c), R(o, l, c), s && s.m(o, c), R(o, r, c);
    },
    p(o, c) {
      c[0] & 2 &&
        t !== (t = yn(o[39][1].iconClassAttribute || 'fd-image--s fd-list__thumbnail') + ' svelte-yylqtk') &&
        f(e, 'class', t),
        c[0] & 2 && n !== (n = o[39][1].altText ? o[39][1].altText : '') && f(e, 'aria-label', n),
        c[0] & 2 && li(e, 'background-image', "url('" + o[39][1].icon + "')"),
        o[39][1].initials ? (s ? s.p(o, c) : ((s = bc(o)), s.c(), s.m(r.parentNode, r))) : s && (s.d(1), (s = null));
    },
    d(o) {
      o && A(e), o && A(l), s && s.d(o), o && A(r);
    }
  };
}
function q2(i) {
  let e, t, n;
  return {
    c() {
      (e = S('span')),
        (t = S('i')),
        f(t, 'role', 'presentation'),
        f(t, 'class', (n = yn(i[18](i[39][1].icon)) + ' svelte-yylqtk')),
        f(e, 'class', 'fd-list__thumbnail');
    },
    m(l, r) {
      R(l, e, r), w(e, t);
    },
    p(l, r) {
      r[0] & 2 && n !== (n = yn(l[18](l[39][1].icon)) + ' svelte-yylqtk') && f(t, 'class', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function bc(i) {
  let e,
    t = (i[39][1].initials ? i[39][1].initials : '') + '',
    n,
    l,
    r;
  return {
    c() {
      (e = S('span')),
        (n = Pe(t)),
        f(
          e,
          'class',
          (l =
            yn(i[39][1].iconClassAttribute + ' lui-profile-initials' || 'fd-image--s fd-list__thumbnail') +
            ' svelte-yylqtk')
        ),
        f(e, 'aria-label', (r = i[39][1].altText ? i[39][1].altText : ''));
    },
    m(s, o) {
      R(s, e, o), w(e, n);
    },
    p(s, o) {
      o[0] & 2 && t !== (t = (s[39][1].initials ? s[39][1].initials : '') + '') && Ne(n, t),
        o[0] & 2 &&
          l !==
            (l =
              yn(s[39][1].iconClassAttribute + ' lui-profile-initials' || 'fd-image--s fd-list__thumbnail') +
              ' svelte-yylqtk') &&
          f(e, 'class', l),
        o[0] & 2 && r !== (r = s[39][1].altText ? s[39][1].altText : '') && f(e, 'aria-label', r);
    },
    d(s) {
      s && A(e);
    }
  };
}
function vc(i) {
  let e,
    t,
    n,
    l,
    r,
    s = i[10](i[39][1].label ? i[39][1].label : '') + '',
    o,
    c,
    g,
    h = i[10](i[39][1].sublabel ? i[39][1].sublabel : '') + '',
    _,
    p,
    m,
    v,
    k = i[39][1].icon && mc(i);
  function y() {
    return i[22](i[39]);
  }
  function C(...T) {
    return i[23](i[38], ...T);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        k && k.c(),
        (n = q()),
        (l = S('div')),
        (r = S('div')),
        (o = Pe(s)),
        (c = q()),
        (g = S('div')),
        (_ = Pe(h)),
        (p = q()),
        f(r, 'class', 'fd-list__title'),
        f(g, 'class', 'fd-list__byline svelte-yylqtk'),
        f(l, 'class', 'fd-list__content'),
        f(t, 'tabindex', '-1'),
        f(t, 'class', 'fd-list__link'),
        f(t, 'href', '#'),
        f(e, 'role', 'listitem'),
        f(e, 'class', 'fd-list__item fd-list__item--link lui-us-navlist__item'),
        f(e, 'data-testid', 'us-navigation-item'),
        f(e, 'tabindex', '0');
    },
    m(T, N) {
      R(T, e, N),
        w(e, t),
        k && k.m(t, null),
        w(t, n),
        w(t, l),
        w(l, r),
        w(r, o),
        w(l, c),
        w(l, g),
        w(g, _),
        w(e, p),
        m || ((v = [ne(e, 'click', Tt(y)), ne(e, 'keydown', C)]), (m = !0));
    },
    p(T, N) {
      (i = T),
        i[39][1].icon ? (k ? k.p(i, N) : ((k = mc(i)), k.c(), k.m(t, n))) : k && (k.d(1), (k = null)),
        N[0] & 1026 && s !== (s = i[10](i[39][1].label ? i[39][1].label : '') + '') && Ne(o, s),
        N[0] & 1026 && h !== (h = i[10](i[39][1].sublabel ? i[39][1].sublabel : '') + '') && Ne(_, h);
    },
    d(T) {
      T && A(e), k && k.d(), (m = !1), Ze(v);
    }
  };
}
function wc(i) {
  let e,
    t = Object.entries(i[11]),
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = vc(pc(i, t, l));
  return {
    c() {
      for (let l = 0; l < n.length; l += 1) n[l].c();
      e = ye();
    },
    m(l, r) {
      for (let s = 0; s < n.length; s += 1) n[s].m(l, r);
      R(l, e, r);
    },
    p(l, r) {
      if (r[0] & 803846) {
        t = Object.entries(l[11]);
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = pc(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = vc(o)), n[s].c(), n[s].m(e.parentNode, e));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    d(l) {
      ct(n, l), l && A(e);
    }
  };
}
function kc(i) {
  let e, t, n, l;
  function r(c) {
    i[24](c);
  }
  function s(c) {
    i[25](c);
  }
  let o = { storedUserSettingData: i[0], userSettingGroup: i[11] };
  return (
    i[9] !== void 0 && (o.closeDropDown = i[9]),
    i[8] !== void 0 && (o.isComboOpen = i[8]),
    (e = new H2({ props: o })),
    xe.push(() => bt(e, 'closeDropDown', r)),
    xe.push(() => bt(e, 'isComboOpen', s)),
    e.$on('updateSettingsObject', i[15]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(c, g) {
        He(e, c, g), (l = !0);
      },
      p(c, g) {
        const h = {};
        g[0] & 1 && (h.storedUserSettingData = c[0]),
          g[0] & 2048 && (h.userSettingGroup = c[11]),
          !t && g[0] & 512 && ((t = !0), (h.closeDropDown = c[9]), mt(() => (t = !1))),
          !n && g[0] & 256 && ((n = !0), (h.isComboOpen = c[8]), mt(() => (n = !1))),
          e.$set(h);
      },
      i(c) {
        l || (B(e.$$.fragment, c), (l = !0));
      },
      o(c) {
        G(e.$$.fragment, c), (l = !1);
      },
      d(c) {
        ze(e, c);
      }
    }
  );
}
function G2(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o,
    c = i[10](i[4]) + '',
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C,
    T = i[10](i[7]) + '',
    N,
    D,
    I,
    L,
    M,
    F,
    O,
    j,
    fe,
    X,
    Q,
    ce = i[10](i[5]) + '',
    Ce,
    H,
    ae,
    $,
    K = i[10](i[6]) + '',
    le,
    ve,
    ue,
    x,
    be = Object.entries(i[1]),
    ke = [];
  for (let ie = 0; ie < be.length; ie += 1) ke[ie] = wc(_c(i, be, ie));
  let we = i[11] && kc(i);
  return {
    c() {
      (e = S('div')),
        (t = S('div')),
        (n = S('div')),
        (l = S('div')),
        (r = S('div')),
        (s = S('div')),
        (o = S('h2')),
        (g = Pe(c)),
        (h = q()),
        (_ = S('div')),
        (p = S('ul'));
      for (let ie = 0; ie < ke.length; ie += 1) ke[ie].c();
      (m = q()),
        (v = S('div')),
        (k = S('button')),
        (k.innerHTML = '<i class="sap-icon--navigation-left-arrow"></i>'),
        (y = q()),
        (C = S('h2')),
        (N = Pe(T)),
        (D = q()),
        (I = S('div')),
        (L = S('div')),
        we && we.c(),
        (M = q()),
        (F = S('div')),
        (O = q()),
        (j = S('footer')),
        (fe = S('div')),
        (X = S('div')),
        (Q = S('button')),
        (Ce = Pe(ce)),
        (H = q()),
        (ae = S('div')),
        ($ = S('button')),
        (le = Pe(K)),
        f(o, 'class', 'fd-title fd-title--h5 svelte-yylqtk'),
        f(o, 'id', 'dialog-title-2'),
        f(s, 'class', 'fd-side-nav__group-header svelte-yylqtk'),
        f(p, 'class', 'fd-list fd-list--byline fd-list--navigation lui-us-list'),
        f(p, 'role', 'list'),
        f(_, 'class', 'fd-side-nav__main-navigation lui-fd-side-nav__main-navigation svelte-yylqtk'),
        f(r, 'class', 'fd-side-nav svelte-yylqtk'),
        f(l, 'class', 'lui-usersettings-left-nav svelte-yylqtk'),
        f(
          k,
          'class',
          'fd-button fd-button--transparent fd-button--compact lui-usersettings-content-header__back-btn svelte-yylqtk'
        ),
        f(C, 'class', 'fd-title fd-title--h5 svelte-yylqtk'),
        f(v, 'class', 'fd-side-nav__group-header lui-usersettings-dialog-sub-header svelte-yylqtk'),
        f(L, 'class', 'usersettingseditor mf-wrapper svelte-yylqtk'),
        f(F, 'class', 'iframeUserSettingsCtn iframe-wrapper svelte-yylqtk'),
        f(I, 'class', 'lui-usersettings-content svelte-yylqtk'),
        f(n, 'class', 'fd-dialog__body lui-usersettings-body svelte-yylqtk'),
        f(Q, 'data-testid', 'lui-us-saveBtn'),
        f(Q, 'class', 'fd-dialog__decisive-button fd-button fd-button--emphasized fd-button--compact confirm-button'),
        f(X, 'class', 'fd-bar__element'),
        f($, 'data-testid', 'lui-us-dismissBtn'),
        f($, 'class', 'fd-dialog__decisive-button fd-button fd-button--transparent fd-button--compact'),
        f(ae, 'class', 'fd-bar__element'),
        f(fe, 'class', 'fd-bar__right'),
        f(j, 'class', 'fd-dialog__footer fd-bar fd-bar--footer'),
        f(t, 'class', 'fd-dialog__content lui-usersettings-dialog-size svelte-yylqtk'),
        f(t, 'role', 'dialog'),
        f(t, 'aria-modal', 'true'),
        f(t, 'aria-labelledby', 'dialog-title-2'),
        f(e, 'class', 'fd-dialog fd-dialog--active lui-usersettings-dialog svelte-yylqtk'),
        f(e, 'tabindex', '0');
    },
    m(ie, Re) {
      R(ie, e, Re), w(e, t), w(t, n), w(n, l), w(l, r), w(r, s), w(s, o), w(o, g), w(r, h), w(r, _), w(_, p);
      for (let Le = 0; Le < ke.length; Le += 1) ke[Le].m(p, null);
      w(n, m),
        w(n, v),
        w(v, k),
        w(v, y),
        w(v, C),
        w(C, N),
        w(n, D),
        w(n, I),
        w(I, L),
        we && we.m(L, null),
        w(I, M),
        w(I, F),
        w(t, O),
        w(t, j),
        w(j, fe),
        w(fe, X),
        w(X, Q),
        w(Q, Ce),
        w(fe, H),
        w(fe, ae),
        w(ae, $),
        w($, le),
        (ve = !0),
        ue ||
          ((x = [
            ne(gc, 'resize', i[20]),
            ne(gc, 'keydown', i[3]),
            ne(k, 'click', i[17]),
            ne(Q, 'click', i[26]),
            ne($, 'click', i[27])
          ]),
          (ue = !0));
    },
    p(ie, Re) {
      if (((!ve || Re[0] & 1040) && c !== (c = ie[10](ie[4]) + '') && Ne(g, c), Re[0] & 803846)) {
        be = Object.entries(ie[1]);
        let Le;
        for (Le = 0; Le < be.length; Le += 1) {
          const _e = _c(ie, be, Le);
          ke[Le] ? ke[Le].p(_e, Re) : ((ke[Le] = wc(_e)), ke[Le].c(), ke[Le].m(p, null));
        }
        for (; Le < ke.length; Le += 1) ke[Le].d(1);
        ke.length = be.length;
      }
      (!ve || Re[0] & 1152) && T !== (T = ie[10](ie[7]) + '') && Ne(N, T),
        ie[11]
          ? we
            ? (we.p(ie, Re), Re[0] & 2048 && B(we, 1))
            : ((we = kc(ie)), we.c(), B(we, 1), we.m(L, null))
          : we &&
            (Ee(),
            G(we, 1, 1, () => {
              we = null;
            }),
            De()),
        (!ve || Re[0] & 1056) && ce !== (ce = ie[10](ie[5]) + '') && Ne(Ce, ce),
        (!ve || Re[0] & 1088) && K !== (K = ie[10](ie[6]) + '') && Ne(le, K);
    },
    i(ie) {
      ve || (B(we), (ve = !0));
    },
    o(ie) {
      G(we), (ve = !1);
    },
    d(ie) {
      ie && A(e), ct(ke, ie), we && we.d(), (ue = !1), Ze(x);
    }
  };
}
function Sc(i, e) {
  let t = {};
  return (
    i.forEach(n => {
      for (let l in n) {
        for (let r in n[l].settings) n[l].settings[r] = '';
        t[l] = { ...n[l].settings, ...e[l] };
      }
    }),
    t
  );
}
function K2() {
  (document.querySelector('.iframeUserSettingsCtn').style.display = 'block'),
    (document.querySelector('.usersettingseditor').style.display = 'none');
}
function J2() {
  (document.querySelector('.iframeUserSettingsCtn').style.display = 'none'),
    (document.querySelector('.usersettingseditor').style.display = 'block');
}
function Cc() {
  document.querySelector('.usersettings-leftNavVisible')
    ? (document.querySelector('.confirm-button').style.display = 'block')
    : (document.querySelector('.confirm-button').style.display = 'none');
}
function j2(i, e, t) {
  let n,
    { schemaObj: l } = e,
    { userSettingGroups: r } = e;
  const s = Wt();
  let o,
    { storedUserSettings: c = {} } = e,
    g = {},
    h = vt('getTranslation');
  mi(i, h, ue => t(10, (n = ue)));
  let _ = ul.userSettingsDialog.dialogHeader,
    p = ul.userSettingsDialog.saveBtn,
    m = ul.userSettingsDialog.dismissBtn,
    v = {},
    k,
    y,
    C,
    T;
  ha(() => {
    Ie.enableA11YKeyboardBackdropExceptClassName('.lui-usersettings-dialog');
  }),
    Kt(() => {
      const ue = re.getConfigValue('userSettings.userSettingsDialog'),
        x = ue || re.getConfigValue('settings.userSettings.userSettingsDialog');
      x &&
        (t(4, (_ = x.dialogHeader ? x.dialogHeader : _)),
        t(5, (p = x.saveBtn ? x.saveBtn : p)),
        t(6, (m = x.dismissBtn ? x.dismissBtn : m))),
        (k = Object.keys(r[0]).length > 0 ? Object.keys(r[0])[0] : void 0),
        Pn.addEventListener('message', be => {
          const ke = Ie.getValidMessageSource(be);
          if (!ke || be.data.msg !== 'custom') return;
          ke._ready = !0;
          const we = sa.convertCustomMessageInternalToUser(be.data),
            ie = 'luigi.updateUserSettings';
          if (we.id === ie) {
            const Re = rr.findActiveCustomUserSettingsIframe(be.source);
            if (Re) {
              let Le = Re.getAttribute('userSettingsGroup');
              t(0, (c[Le] = we.data), c);
            }
          }
          we.id === 'luigi.navBackMobile' &&
            window.window.innerWidth !== 0 &&
            window.innerWidth < Xt.desktopMinWidth &&
            O();
        }),
        re
          .readUserSettings()
          .then(be => {
            (g = JSON.parse(JSON.stringify(be))),
              be === null
                ? t(0, (c = Sc(JSON.parse(JSON.stringify(r)), {})))
                : t(0, (c = Sc(JSON.parse(JSON.stringify(r)), be))),
              D([k, r[0][k]]);
          })
          .catch(be => {
            be && be.message && console.error(be.message), be && be.closeDialog && s('close');
          }),
        Ie.disableA11YKeyboardExceptClassName('.lui-usersettings-dialog');
    });
  function N(ue) {
    if ((t(7, (y = ue.title ? ue.title : '')), !!ee.isObject(ue.settings)))
      for (let x in ue.settings) {
        let be = ue.settings[x];
        be.type === 'enum'
          ? Array.isArray(be.options) ||
            console.error(`There is no options array for '${x}' defined in the Luigi userSettings config.`)
          : be.type === void 0 &&
            console.error(`There is no data type defined for '${x}' in the Luigi userSettings config.`);
      }
  }
  function D(ue, x) {
    t(11, (o = ue));
    let be = ue[0],
      ke = ue[1];
    if (
      (N(ke),
      x
        ? (document.querySelectorAll('.lui-us-list .lui-us-navlist__item').forEach(ie => {
            ie.classList.remove('is-selected');
          }),
          M(x.target, '.lui-us-navlist__item', 20).classList.add('is-selected'),
          window.innerWidth < Xt.desktopMinWidth && F())
        : (document.querySelectorAll('.lui-us-list .lui-us-navlist__item')[0].classList.add('is-selected'),
          window.innerWidth !== 0 && window.innerWidth < Xt.desktopMinWidth && Cc()),
      ke.viewUrl)
    ) {
      if ((rr.hideUserSettingsIframe(), v.hasOwnProperty(be)))
        rr.getUserSettingsIframesInDom().forEach(we => {
          we.userSettingsGroup === be && (we.style.display = 'block');
        });
      else {
        const we = Zr.hasDecorators() ? Zr.applyDecorators(ke.viewUrl) : ke.viewUrl;
        let ie = rr.createIframe(we, be);
        v[be] = ie;
      }
      K2();
    } else J2();
  }
  const I = ue => {
    t(0, (c = ue.detail.userSettings));
  };
  function L() {
    re.storeUserSettings(c, g)
      .then(() => {
        s('close');
      })
      .catch(ue => {
        ue && ue.message && console.error(ue.message), ue && ue.closeDialog && s('close');
      });
  }
  function M(ue, x, be) {
    if (ue && be > 0)
      return ee.isIE()
        ? ue.msMatchesSelector(x)
          ? ue
          : M(ue.parentNode, x, be - 1)
        : ue.matches(x)
        ? ue
        : M(ue.parentNode, x, be - 1);
  }
  function F() {
    O();
  }
  function O() {
    document.querySelector('.lui-usersettings-dialog').classList.toggle('usersettings-leftNavVisible'),
      window.innerWidth !== 0 && window.innerWidth < Xt.desktopMinWidth && Cc();
  }
  function j(ue) {
    return Te.renderIconClassName(ue);
  }
  function fe(ue) {
    return Te.isOpenUIiconName(ue.icon);
  }
  let X;
  const Q = () => {
    const ue = window.innerWidth >= Xt.desktopMinWidth && X < Xt.desktopMinWidth;
    if (
      (window.innerWidth < Xt.desktopMinWidth &&
        X >= Xt.desktopMinWidth &&
        (document.querySelector('.lui-usersettings-dialog').classList.toggle('usersettings-leftNavVisible'),
        document.querySelector('.usersettings-leftNavVisible')
          ? (document.querySelector('.confirm-button').style.display = 'block')
          : (document.querySelector('.confirm-button').style.display = 'none')),
      ue && (document.querySelector('.confirm-button').style.display = 'block'),
      !X)
    ) {
      let be = document.querySelector('.confirm-button');
      window.innerWidth < Xt.desktopMinWidth ? (be.style.display = 'none') : (be.style.display = 'block');
    }
    X = window.innerWidth;
  };
  function ce(ue, x) {
    let be = document.querySelectorAll('.lui-us-list .lui-us-navlist__item');
    (ue.keyCode === pi || ue.keyCode === ga) && be[x].click(),
      ue.keyCode === T2 && be[Object.keys(r).length - 1].focus(),
      ue.keyCode === I2 && be[0].focus();
  }
  function Ce(ue) {
    ue.keyCode === _i && C ? T() : ue.keyCode === _i && !C && s('close');
  }
  const H = ue => D(ue, event),
    ae = (ue, x) => ce(x, [ue]);
  function $(ue) {
    (T = ue), t(9, T);
  }
  function K(ue) {
    (C = ue), t(8, C);
  }
  const le = () => L(),
    ve = () => s('close');
  return (
    (i.$$set = ue => {
      'schemaObj' in ue && t(21, (l = ue.schemaObj)),
        'userSettingGroups' in ue && t(1, (r = ue.userSettingGroups)),
        'storedUserSettings' in ue && t(0, (c = ue.storedUserSettings));
    }),
    [c, r, ce, Ce, _, p, m, y, C, T, n, o, s, h, D, I, L, O, j, fe, Q, l, H, ae, $, K, le, ve]
  );
}
class Y2 extends At {
  constructor(e) {
    super(),
      Lt(
        this,
        e,
        j2,
        G2,
        It,
        { schemaObj: 21, userSettingGroups: 1, storedUserSettings: 0, handleKeyUp: 2, handleKeyDown: 3 },
        null,
        [-1, -1]
      );
  }
  get handleKeyUp() {
    return this.$$.ctx[2];
  }
  get handleKeyDown() {
    return this.$$.ctx[3];
  }
}
const { window: Q2 } = Ui;
function Z2(i) {
  let e;
  return {
    c() {
      (e = S('div')), f(e, 'class', 'iframeSplitViewCnt svelte-je1rr');
    },
    m(t, n) {
      R(t, e, n);
    },
    p: Ue,
    d(t) {
      t && A(e);
    }
  };
}
function X2(i) {
  let e,
    t,
    n,
    l,
    r = i[1].title + '',
    s,
    o,
    c;
  return {
    c() {
      (e = S('div')),
        (t = S('a')),
        (t.innerHTML = '<i class="sap-icon sap-icon--navigation-up-arrow"></i>'),
        (n = q()),
        (l = S('h1')),
        (s = Pe(r)),
        f(t, 'class', 'lui-collapse-btn svelte-je1rr'),
        f(e, 'id', 'splitViewDraggerCollapsed'),
        f(e, 'class', 'splitViewSeparator isCollapsed svelte-je1rr'),
        f(l, 'class', 'fd-splitView__title svelte-je1rr');
    },
    m(g, h) {
      R(g, e, h), w(e, t), R(g, n, h), R(g, l, h), w(l, s), o || ((c = ne(t, 'click', Ot(Tt(i[4])))), (o = !0));
    },
    p(g, h) {
      h & 2 && r !== (r = g[1].title + '') && Ne(s, r);
    },
    d(g) {
      g && A(e), g && A(n), g && A(l), (o = !1), c();
    }
  };
}
function yc(i) {
  let e, t, n, l, r, s, o, c;
  return {
    c() {
      (e = S('div')),
        (t = q()),
        (n = S('div')),
        (l = S('div')),
        (r = q()),
        (s = S('a')),
        (s.innerHTML = '<i class="sap-icon sap-icon--navigation-down-arrow"></i>'),
        f(e, 'id', 'splitViewDraggerBackdrop'),
        f(l, 'class', 'splitViewSeparator'),
        f(s, 'class', 'lui-collapse-btn svelte-je1rr'),
        f(n, 'id', 'splitViewDragger');
    },
    m(g, h) {
      R(g, e, h),
        R(g, t, h),
        R(g, n, h),
        w(n, l),
        w(n, r),
        w(n, s),
        o || ((c = [ne(s, 'click', Ot(Tt(i[3]))), ne(n, 'mousedown', Ot(i[6]))]), (o = !0));
    },
    p: Ue,
    d(g) {
      g && A(e), g && A(t), g && A(n), (o = !1), Ze(c);
    }
  };
}
function $2(i) {
  let e, t, n, l, r, s, o, c, g, h;
  (t = new $r({ props: { area: 'split-view', disable: i[2] } })), t.$on('stateChanged', i[7]);
  function _(k, y) {
    return k[0] ? X2 : Z2;
  }
  let p = _(i),
    m = p(i),
    v = !i[0] && yc(i);
  return {
    c() {
      (e = S('div')),
        Ge(t.$$.fragment),
        (n = q()),
        (l = S('div')),
        m.c(),
        (s = q()),
        v && v.c(),
        (o = ye()),
        f(l, 'class', 'lui-split-view svelte-je1rr'),
        f(e, 'id', 'splitViewContainer'),
        f(e, 'class', (r = 'fd-page splitViewContainer ' + (i[0] ? 'lui-collapsed' : '')));
    },
    m(k, y) {
      R(k, e, y),
        He(t, e, null),
        w(e, n),
        w(e, l),
        m.m(l, null),
        R(k, s, y),
        v && v.m(k, y),
        R(k, o, y),
        (c = !0),
        g || ((h = ne(Q2, 'resize', i[5])), (g = !0));
    },
    p(k, [y]) {
      const C = {};
      y & 4 && (C.disable = k[2]),
        t.$set(C),
        p === (p = _(k)) && m ? m.p(k, y) : (m.d(1), (m = p(k)), m && (m.c(), m.m(l, null))),
        (!c || (y & 1 && r !== (r = 'fd-page splitViewContainer ' + (k[0] ? 'lui-collapsed' : '')))) &&
          f(e, 'class', r),
        k[0] ? v && (v.d(1), (v = null)) : v ? v.p(k, y) : ((v = yc(k)), v.c(), v.m(o.parentNode, o));
    },
    i(k) {
      c || (B(t.$$.fragment, k), (c = !0));
    },
    o(k) {
      G(t.$$.fragment, k), (c = !1);
    },
    d(k) {
      k && A(e), ze(t), m.d(), k && A(s), v && v.d(k), k && A(o), (g = !1), h();
    }
  };
}
function x2(i, e, t) {
  const n = Wt();
  let l = { draggable: null, iframe: null, split: null },
    r,
    s,
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    { nodepath: v } = e,
    { collapsed: k } = e,
    { splitViewSettings: y = {} } = e,
    { isDataPrepared: C = !1 } = e,
    { disableBackdrop: T } = e,
    N = !1,
    D = vt('getUnsavedChangesModalPromise');
  const I = () => ({
      get: () => ({
        collapsed: k,
        splitViewSettings: y,
        isDataPrepared: C,
        lastNode: r,
        pathData: s,
        nodeParams: o,
        currentNode: c,
        splitViewIframe: h,
        splitViewIframeData: _,
        splitViewWC: p,
        splitViewWCData: m
      }),
      set: H => {
        H &&
          Object.getOwnPropertyNames(H).forEach(ae => {
            ae === 'splitViewSettings'
              ? t(1, (y = H.splitViewSettings))
              : ae === 'lastNode'
              ? (r = H.lastNode)
              : ae === 'pathData'
              ? (s = H.pathData)
              : ae === 'nodeParams'
              ? (o = H.nodeParams)
              : ae === 'collapsed'
              ? t(0, (k = H.collapsed))
              : ae === 'isDataPrepared'
              ? t(8, (C = H.isDataPrepared))
              : ae === 'currentNode'
              ? (c = H.currentNode)
              : ae === 'splitViewIframe'
              ? (h = H.splitViewIframe)
              : ae === 'splitViewIframeData'
              ? (_ = H.splitViewIframeData)
              : ae === 'splitViewWC'
              ? (p = H.splitViewWC)
              : ae === 'splitViewWCData' && (m = H.splitViewWCData);
          });
      },
      dispatch: n,
      getUnsavedChangesModalPromise: D
    }),
    L = async () => {
      C ? k || at.createAndSetView(I()) : await at.prepareSplitViewData(I(), v);
    },
    M = () => {
      (l.split = at.getContainer()), (l.iframe = Ie.getIframeContainer()), (l.draggable = at.getDragger());
    },
    F = () => {
      const H = at.getDraggerBackdrop();
      H && (H.style.display = 'none'),
        M(),
        l.draggable && (l.draggable.style.top = `${at.splitViewValues.top}px`),
        (l.split.style.top = `${at.splitViewValues.top}px`),
        (l.iframe.style.marginBottom = `${at.splitViewValues.bottom}px`);
    };
  function O(H) {
    if (
      !!Ie.getValidMessageSource(H) &&
      (H.data.msg === 'luigi.navigation.splitview.close' && at.close(I()),
      H.data.msg === 'luigi.navigation.splitview.collapse' && j(),
      H.data.msg === 'luigi.navigation.splitview.expand' && fe(),
      H.data.msg === 'luigi.navigation.splitview.resize')
    ) {
      const ae = parseInt(H.data.data);
      if ((at.calculateAndSetSplitViewValues(ae, at.internalValues), k)) return;
      F(), at.sendMessageToClients('resize.ok', at.splitViewValues.percent);
    }
  }
  Kt(() => {
    X(), (g = O.bind(this)), Pn.addEventListener('message', g);
  }),
    Eo(() => {
      L(), N !== C && !k && ((N = C), F());
    }),
    ha(() => {
      window.removeEventListener('message', g);
    });
  function j() {
    at.collapse(I());
  }
  async function fe() {
    await at.expand(I()), l.draggerBackdrop && (l.draggerBackdrop.style.display = 'none');
  }
  function X() {
    const H = Mn.getShellbar().clientHeight;
    (at.internalValues.innerHeight = ee.getInnerHeight()),
      (at.internalValues.rightContentHeight = at.internalValues.innerHeight - H),
      (at.internalValues.thresholdBottom = 30),
      (at.internalValues.thresholdTop = H + 30),
      at.calculateAndSetSplitViewValues(at.splitViewValues.percent, at.internalValues),
      k || F();
  }
  function Q(H) {
    let ae = H.y,
      $ = {};
    const K = function(be) {
        const ke = ae - be.y,
          we = parseInt(getComputedStyle(l.draggable, '').top);
        if (isNaN(we) || ke === 0) return;
        const ie = we - ke,
          Re = at.internalValues.innerHeight - ie,
          Le = at.enforceTresholds(ie, Re);
        ie < Le.top || Re < Le.bottom || (($ = Le), (ae = be.y), (l.draggable.style.top = `${$.top}px`));
      },
      le = function() {
        if ((ve(), !$.top || !$.bottom || $.top == at.internalValues.m_pos_prev)) {
          at.getDraggerBackdrop().style.display = 'none';
          return;
        }
        (at.internalValues.m_pos_prev = $.top),
          (at.splitViewValues = $),
          F(),
          at.sendMessageToClients('resize.ok', $.percent);
      },
      ve = function() {
        document.removeEventListener('mouseup', le), document.removeEventListener('mousemove', K);
      },
      ue = function() {
        document.addEventListener('mouseup', le), document.addEventListener('mousemove', K);
      };
    M(), ve(), ue(), (at.getDraggerBackdrop().style.display = 'block');
  }
  const ce = H => {
      let ae = at.getDraggerButton();
      ae && (ae.style.display = H ? 'block' : 'none'),
        (ae = at.getCollapsedDraggerButton()),
        ae && (ae.style.display = H ? 'block' : 'none');
    },
    Ce = H => {
      ce(!H.detail || H.detail.backdropActive !== !0);
    };
  return (
    (i.$$set = H => {
      'nodepath' in H && t(9, (v = H.nodepath)),
        'collapsed' in H && t(0, (k = H.collapsed)),
        'splitViewSettings' in H && t(1, (y = H.splitViewSettings)),
        'isDataPrepared' in H && t(8, (C = H.isDataPrepared)),
        'disableBackdrop' in H && t(2, (T = H.disableBackdrop));
    }),
    [k, y, T, j, fe, X, Q, Ce, C, v]
  );
}
class ek extends At {
  constructor(e) {
    super(),
      Lt(this, e, x2, $2, It, {
        nodepath: 9,
        collapsed: 0,
        splitViewSettings: 1,
        isDataPrepared: 8,
        disableBackdrop: 2,
        collapse: 3,
        expand: 4,
        updateSizes: 5,
        onDragStart: 6
      });
  }
  get collapse() {
    return this.$$.ctx[3];
  }
  get expand() {
    return this.$$.ctx[4];
  }
  get updateSizes() {
    return this.$$.ctx[5];
  }
  get onDragStart() {
    return this.$$.ctx[6];
  }
}
function Pc(i) {
  let e,
    t,
    n = { ctx: i, current: null, token: null, hasCatch: !1, pending: ik, then: nk, catch: tk, value: 1 };
  return (
    la((t = i[0].badgeCounter.count()), n),
    {
      c() {
        (e = ye()), n.block.c();
      },
      m(l, r) {
        R(l, e, r), n.block.m(l, (n.anchor = r)), (n.mount = () => e.parentNode), (n.anchor = e);
      },
      p(l, r) {
        (i = l), (n.ctx = i), (r & 1 && t !== (t = i[0].badgeCounter.count()) && la(t, n)) || h_(n, i, r);
      },
      d(l) {
        l && A(e), n.block.d(l), (n.token = null), (n = null);
      }
    }
  );
}
function tk(i) {
  return { c: Ue, m: Ue, p: Ue, d: Ue };
}
function nk(i) {
  let e,
    t = i[1] > 0 && Nc(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, l) {
      n[1] > 0 ? (t ? t.p(n, l) : ((t = Nc(n)), t.c(), t.m(e.parentNode, e))) : t && (t.d(1), (t = null));
    },
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function Nc(i) {
  let e,
    t = i[1] + '',
    n,
    l;
  return {
    c() {
      (e = S('span')),
        (n = Pe(t)),
        f(e, 'class', 'fd-counter fd-counter--notification fd-shellbar__counter--notification svelte-1jffokm'),
        f(e, 'aria-label', (l = i[0].badgeCounter.label));
    },
    m(r, s) {
      R(r, e, s), w(e, n);
    },
    p(r, s) {
      s & 1 && t !== (t = r[1] + '') && Ne(n, t), s & 1 && l !== (l = r[0].badgeCounter.label) && f(e, 'aria-label', l);
    },
    d(r) {
      r && A(e);
    }
  };
}
function ik(i) {
  return { c: Ue, m: Ue, p: Ue, d: Ue };
}
function lk(i) {
  let e,
    t = i[0] && i[0].badgeCounter && Pc(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, [l]) {
      n[0] && n[0].badgeCounter
        ? t
          ? t.p(n, l)
          : ((t = Pc(n)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    i: Ue,
    o: Ue,
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function rk(i, e, t) {
  let { node: n } = e;
  return (
    (i.$$set = l => {
      'node' in l && t(0, (n = l.node));
    }),
    [n]
  );
}
class Zn extends At {
  constructor(e) {
    super(), Lt(this, e, rk, lk, It, { node: 0 });
  }
}
function Ic(i) {
  let e,
    t,
    n = i[0].statusBadge.label + '',
    l;
  return {
    c() {
      (e = S('span')),
        (t = S('span')),
        (l = Pe(n)),
        f(t, 'class', 'fd-object-status__text'),
        f(e, 'class', 'fd-object-status fd-object-status--' + i[1] + ' fd-object-status--inverted svelte-1c6n42g');
    },
    m(r, s) {
      R(r, e, s), w(e, t), w(t, l);
    },
    p(r, s) {
      s & 1 && n !== (n = r[0].statusBadge.label + '') && Ne(l, n);
    },
    d(r) {
      r && A(e);
    }
  };
}
function sk(i) {
  let e,
    t = i[0].statusBadge && i[0].statusBadge.label && Ic(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, [l]) {
      n[0].statusBadge && n[0].statusBadge.label
        ? t
          ? t.p(n, l)
          : ((t = Ic(n)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    i: Ue,
    o: Ue,
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function ak(i, e, t) {
  let { node: n } = e;
  const l = ['negative', 'positive', 'critical', 'informative'],
    r = n && n.statusBadge && n.statusBadge.type,
    s = l.includes(r) ? r : 'neutral';
  return (
    (i.$$set = o => {
      'node' in o && t(0, (n = o.node));
    }),
    [n, s]
  );
}
class xr extends At {
  constructor(e) {
    super(), Lt(this, e, ak, sk, It, { node: 0 });
  }
}
const { window: $s } = Ui;
function Tc(i, e, t) {
  const n = i.slice();
  return (n[64] = e[t][0]), (n[65] = e[t][1]), (n[67] = t), n;
}
function Lc(i, e, t) {
  const n = i.slice();
  return (n[68] = e[t]), n;
}
function Ac(i, e, t) {
  const n = i.slice();
  return (n[68] = e[t]), n;
}
function Rc(i, e, t) {
  const n = i.slice();
  return (n[68] = e[t]), n;
}
function Ec(i, e, t) {
  const n = i.slice();
  return (n[68] = e[t]), n;
}
function Dc(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o = i[23](i[11].label) + '',
    c,
    g,
    h,
    _ = i[11].icon && Vc(i),
    p = i[11].showUpLink && Mc(i);
  return {
    c() {
      (e = S('div')),
        (t = S('ul')),
        (n = S('li')),
        (l = S('a')),
        _ && _.c(),
        (r = q()),
        (s = S('span')),
        (c = Pe(o)),
        (g = q()),
        p && p.c(),
        f(s, 'class', 'fd-nested-list__title svelte-1b792v2'),
        f(l, 'class', 'fd-nested-list__link svelte-1b792v2'),
        f(l, 'title', (h = i[30](i[11], i[23](i[11].label)))),
        f(n, 'class', 'fd-nested-list__item svelte-1b792v2'),
        f(t, 'class', 'fd-nested-list svelte-1b792v2'),
        f(e, 'class', 'lui-nav-title svelte-1b792v2');
    },
    m(m, v) {
      R(m, e, v), w(e, t), w(t, n), w(n, l), _ && _.m(l, null), w(l, r), w(l, s), w(s, c), w(l, g), p && p.m(l, null);
    },
    p(m, v) {
      m[11].icon ? (_ ? _.p(m, v) : ((_ = Vc(m)), _.c(), _.m(l, r))) : _ && (_.d(1), (_ = null)),
        v[0] & 8390656 && o !== (o = m[23](m[11].label) + '') && Ne(c, o),
        m[11].showUpLink ? (p ? p.p(m, v) : ((p = Mc(m)), p.c(), p.m(l, null))) : p && (p.d(1), (p = null)),
        v[0] & 8390656 && h !== (h = m[30](m[11], m[23](m[11].label))) && f(l, 'title', h);
    },
    d(m) {
      m && A(e), _ && _.d(), p && p.d();
    }
  };
}
function Vc(i) {
  let e, t;
  function n(s, o) {
    return o[0] & 2048 && (e = null), e == null && (e = !!s[26](s[11].icon)), e ? uk : ok;
  }
  let l = n(i, [-1, -1, -1]),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function ok(i) {
  let e, t, n, l;
  return {
    c() {
      (e = S('span')),
        (t = S('img')),
        rt(t.src, (n = i[11].icon)) || f(t, 'src', n),
        f(t, 'alt', (l = i[11].altText ? i[11].altText : '')),
        f(t, 'class', 'svelte-1b792v2'),
        f(e, 'class', 'fd-nested-list__icon sap-icon svelte-1b792v2');
    },
    m(r, s) {
      R(r, e, s), w(e, t);
    },
    p(r, s) {
      s[0] & 2048 && !rt(t.src, (n = r[11].icon)) && f(t, 'src', n),
        s[0] & 2048 && l !== (l = r[11].altText ? r[11].altText : '') && f(t, 'alt', l);
    },
    d(r) {
      r && A(e);
    }
  };
}
function uk(i) {
  let e, t;
  return {
    c() {
      (e = S('i')),
        f(e, 'class', (t = 'lui-header-icon fd-nested-list__icon sap-icon ' + i[25](i[11].icon) + ' svelte-1b792v2')),
        f(e, 'role', 'presentation');
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 2048 &&
        t !== (t = 'lui-header-icon fd-nested-list__icon sap-icon ' + n[25](n[11].icon) + ' svelte-1b792v2') &&
        f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Mc(i) {
  let e, t, n, l;
  return {
    c() {
      (e = S('i')),
        f(e, 'class', 'lui-nav-up fd-nested-list__icon sap-icon sap-icon--navigation-up-arrow svelte-1b792v2'),
        f(e, 'role', 'presentation'),
        f(e, 'title', (t = i[23]('luigi.navigation.up')));
    },
    m(r, s) {
      R(r, e, s), n || ((l = ne(e, 'click', Tt(i[18]))), (n = !0));
    },
    p(r, s) {
      s[0] & 8388608 && t !== (t = r[23]('luigi.navigation.up')) && f(e, 'title', t);
    },
    d(r) {
      r && A(e), (n = !1), l();
    }
  };
}
function Oc(i) {
  let e,
    t,
    n,
    l,
    r = i[12],
    s = [];
  for (let c = 0; c < r.length; c += 1) s[c] = sd(Tc(i, r, c));
  const o = c =>
    G(s[c], 1, 1, () => {
      s[c] = null;
    });
  return {
    c() {
      (e = S('div')), (t = S('ul'));
      for (let c = 0; c < s.length; c += 1) s[c].c();
      f(
        t,
        'class',
        (n =
          'fd-nested-list ' + (i[21] ? 'fd-nested-list fd-nested-list--compact' : 'fd-nested-list') + ' svelte-1b792v2')
      ),
        f(e, 'class', 'lui-fd-side-nav-wrapper svelte-1b792v2');
    },
    m(c, g) {
      R(c, e, g), w(e, t);
      for (let h = 0; h < s.length; h += 1) s[h].m(t, null);
      l = !0;
    },
    p(c, g) {
      if ((g[0] & 2127098848) | (g[1] & 56)) {
        r = c[12];
        let h;
        for (h = 0; h < r.length; h += 1) {
          const _ = Tc(c, r, h);
          s[h] ? (s[h].p(_, g), B(s[h], 1)) : ((s[h] = sd(_)), s[h].c(), B(s[h], 1), s[h].m(t, null));
        }
        for (Ee(), h = r.length; h < s.length; h += 1) o(h);
        De();
      }
      (!l ||
        (g[0] & 2097152 &&
          n !==
            (n =
              'fd-nested-list ' +
              (c[21] ? 'fd-nested-list fd-nested-list--compact' : 'fd-nested-list') +
              ' svelte-1b792v2'))) &&
        f(t, 'class', n);
    },
    i(c) {
      if (!l) {
        for (let g = 0; g < r.length; g += 1) B(s[g]);
        l = !0;
      }
    },
    o(c) {
      s = s.filter(Boolean);
      for (let g = 0; g < s.length; g += 1) G(s[g]);
      l = !1;
    },
    d(c) {
      c && A(e), ct(s, c);
    }
  };
}
function fk(i) {
  let e, t, n, l;
  const r = [hk, dk],
    s = [];
  function o(c, g) {
    return c[65].metaInfo.collapsible ? 0 : 1;
  }
  return (
    (e = o(i)),
    (t = s[e] = r[e](i)),
    {
      c() {
        t.c(), (n = ye());
      },
      m(c, g) {
        s[e].m(c, g), R(c, n, g), (l = !0);
      },
      p(c, g) {
        let h = e;
        (e = o(c)),
          e === h
            ? s[e].p(c, g)
            : (Ee(),
              G(s[h], 1, 1, () => {
                s[h] = null;
              }),
              De(),
              (t = s[e]),
              t ? t.p(c, g) : ((t = s[e] = r[e](c)), t.c()),
              B(t, 1),
              t.m(n.parentNode, n));
      },
      i(c) {
        l || (B(t), (l = !0));
      },
      o(c) {
        G(t), (l = !1);
      },
      d(c) {
        s[e].d(c), c && A(n);
      }
    }
  );
}
function ck(i) {
  let e,
    t,
    n = i[65],
    l = [];
  for (let s = 0; s < n.length; s += 1) l[s] = rd(Ec(i, n, s));
  const r = s =>
    G(l[s], 1, 1, () => {
      l[s] = null;
    });
  return {
    c() {
      for (let s = 0; s < l.length; s += 1) l[s].c();
      e = ye();
    },
    m(s, o) {
      for (let c = 0; c < l.length; c += 1) l[c].m(s, o);
      R(s, e, o), (t = !0);
    },
    p(s, o) {
      if ((o[0] & 1589661792) | (o[1] & 16)) {
        n = s[65];
        let c;
        for (c = 0; c < n.length; c += 1) {
          const g = Ec(s, n, c);
          l[c] ? (l[c].p(g, o), B(l[c], 1)) : ((l[c] = rd(g)), l[c].c(), B(l[c], 1), l[c].m(e.parentNode, e));
        }
        for (Ee(), c = n.length; c < l.length; c += 1) r(c);
        De();
      }
    },
    i(s) {
      if (!t) {
        for (let o = 0; o < n.length; o += 1) B(l[o]);
        t = !0;
      }
    },
    o(s) {
      l = l.filter(Boolean);
      for (let o = 0; o < l.length; o += 1) G(l[o]);
      t = !1;
    },
    d(s) {
      ct(l, s), s && A(e);
    }
  };
}
function dk(i) {
  let e,
    t,
    n = i[23](i[64]) + '',
    l,
    r,
    s,
    o,
    c,
    g,
    h = i[9] && i[65].metaInfo.icon && Fc(i),
    _ = i[65],
    p = [];
  for (let v = 0; v < _.length; v += 1) p[v] = qc(Lc(i, _, v));
  const m = v =>
    G(p[v], 1, 1, () => {
      p[v] = null;
    });
  return {
    c() {
      (e = S('li')), h && h.c(), (t = q()), (l = Pe(n)), (o = q());
      for (let v = 0; v < p.length; v += 1) p[v].c();
      (c = ye()),
        f(e, 'class', 'fd-nested-list__group-header lui-category svelte-1b792v2'),
        f(e, 'title', (r = i[30](i[65], i[23](i[64])))),
        f(e, 'data-testid', (s = i[29](i[65].metaInfo, i[64]))),
        f(e, 'id', 'category_list_level1_' + i[67]);
    },
    m(v, k) {
      R(v, e, k), h && h.m(e, null), w(e, t), w(e, l), R(v, o, k);
      for (let y = 0; y < p.length; y += 1) p[y].m(v, k);
      R(v, c, k), (g = !0);
    },
    p(v, k) {
      if (
        (v[9] && v[65].metaInfo.icon ? (h ? h.p(v, k) : ((h = Fc(v)), h.c(), h.m(e, t))) : h && (h.d(1), (h = null)),
        (!g || k[0] & 8392704) && n !== (n = v[23](v[64]) + '') && Ne(l, n),
        (!g || (k[0] & 8392704 && r !== (r = v[30](v[65], v[23](v[64]))))) && f(e, 'title', r),
        (!g || (k[0] & 4096 && s !== (s = v[29](v[65].metaInfo, v[64])))) && f(e, 'data-testid', s),
        (k[0] & 1589661792) | (k[1] & 16))
      ) {
        _ = v[65];
        let y;
        for (y = 0; y < _.length; y += 1) {
          const C = Lc(v, _, y);
          p[y] ? (p[y].p(C, k), B(p[y], 1)) : ((p[y] = qc(C)), p[y].c(), B(p[y], 1), p[y].m(c.parentNode, c));
        }
        for (Ee(), y = _.length; y < p.length; y += 1) m(y);
        De();
      }
    },
    i(v) {
      if (!g) {
        for (let k = 0; k < _.length; k += 1) B(p[k]);
        g = !0;
      }
    },
    o(v) {
      p = p.filter(Boolean);
      for (let k = 0; k < p.length; k += 1) G(p[k]);
      g = !1;
    },
    d(v) {
      v && A(e), h && h.d(), v && A(o), ct(p, v), v && A(c);
    }
  };
}
function hk(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o = i[23](i[64]) + '',
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C,
    T,
    N,
    D,
    I,
    L,
    M,
    F,
    O,
    j,
    fe,
    X,
    Q;
  function ce(ke, we) {
    return we[0] & 4096 && (l = null), l == null && (l = !!ke[26](ke[65].metaInfo.icon)), l ? kk : wk;
  }
  let Ce = ce(i, [-1, -1, -1]),
    H = Ce(i);
  function ae() {
    return i[44](i[65]);
  }
  function $() {
    return i[45](i[65]);
  }
  function K(...ke) {
    return i[46](i[65], ...ke);
  }
  let le = i[65],
    ve = [];
  for (let ke = 0; ke < le.length; ke += 1) ve[ke] = Yc(Rc(i, le, ke));
  const ue = ke =>
    G(ve[ke], 1, 1, () => {
      ve[ke] = null;
    });
  let x = i[65].metaInfo && i[65].metaInfo.label === i[7] && Qc(i);
  function be() {
    return i[51](i[65]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('div')),
        (n = S('a')),
        H.c(),
        (r = q()),
        (s = S('span')),
        (c = Pe(o)),
        (v = q()),
        (k = S('button')),
        (y = S('i')),
        (I = q()),
        (L = S('ul'));
      for (let ke = 0; ke < ve.length; ke += 1) ve[ke].c();
      (F = q()),
        x && x.c(),
        (O = q()),
        f(s, 'class', 'fd-nested-list__title svelte-1b792v2'),
        f(n, 'title', (g = i[30](i[65], i[23](i[64])))),
        f(n, 'class', (h = 'fd-nested-list__link ' + (pn(i[65], i[8]) ? 'is-expanded' : '') + ' svelte-1b792v2')),
        f(n, 'tabindex', (_ = i[5] ? '-1' : '0')),
        f(n, 'role', (p = i[22] ? void 0 : 'button')),
        f(n, 'id', 'collapsible_listnode_' + i[67]),
        f(n, 'aria-haspopup', 'true'),
        f(n, 'aria-expanded', (m = pn(i[65], i[8]))),
        f(y, 'class', (C = pn(i[65], i[8]) ? 'sap-icon--navigation-down-arrow' : 'sap-icon--navigation-right-arrow')),
        f(y, 'role', 'presentation'),
        f(k, 'class', 'fd-button fd-nested-list__button svelte-1b792v2'),
        f(k, 'href', '#'),
        f(k, 'tabindex', '0'),
        f(k, 'aria-label', 'Expand categories'),
        f(k, 'aria-haspopup', 'true'),
        f(k, 'aria-expanded', (T = pn(i[65], i[8]))),
        f(k, 'title', (N = i[36](i[65], i[8]))),
        f(t, 'class', 'fd-nested-list__content has-child svelte-1b792v2'),
        f(t, 'tabindex', (D = i[5] ? '0' : '-1')),
        f(L, 'class', 'fd-nested-list fd-nested-list--text-only level-2 svelte-1b792v2'),
        f(L, 'aria-hidden', (M = !pn(i[65], i[8]))),
        f(e, 'class', 'fd-nested-list__item lui-collapsible-item'),
        f(e, 'data-testid', (j = i[29](i[65].metaInfo, i[64]))),
        hi(e, 'lui-item-expanded', pn(i[65], i[8]));
    },
    m(ke, we) {
      R(ke, e, we),
        w(e, t),
        w(t, n),
        H.m(n, null),
        w(n, r),
        w(n, s),
        w(s, c),
        w(t, v),
        w(t, k),
        w(k, y),
        w(e, I),
        w(e, L);
      for (let ie = 0; ie < ve.length; ie += 1) ve[ie].m(L, null);
      w(e, F),
        x && x.m(e, null),
        w(e, O),
        (fe = !0),
        X ||
          ((Q = [ne(n, 'click', Tt(ae)), ne(k, 'click', Tt($)), ne(t, 'keypress', K), ne(e, 'click', Ot(be))]),
          (X = !0));
    },
    p(ke, we) {
      if (
        ((i = ke),
        Ce === (Ce = ce(i, we)) && H ? H.p(i, we) : (H.d(1), (H = Ce(i)), H && (H.c(), H.m(n, r))),
        (!fe || we[0] & 8392704) && o !== (o = i[23](i[64]) + '') && Ne(c, o),
        (!fe || (we[0] & 8392704 && g !== (g = i[30](i[65], i[23](i[64]))))) && f(n, 'title', g),
        (!fe ||
          (we[0] & 4352 &&
            h !== (h = 'fd-nested-list__link ' + (pn(i[65], i[8]) ? 'is-expanded' : '') + ' svelte-1b792v2'))) &&
          f(n, 'class', h),
        (!fe || (we[0] & 32 && _ !== (_ = i[5] ? '-1' : '0'))) && f(n, 'tabindex', _),
        (!fe || (we[0] & 4194304 && p !== (p = i[22] ? void 0 : 'button'))) && f(n, 'role', p),
        (!fe || (we[0] & 4352 && m !== (m = pn(i[65], i[8])))) && f(n, 'aria-expanded', m),
        (!fe ||
          (we[0] & 4352 &&
            C !== (C = pn(i[65], i[8]) ? 'sap-icon--navigation-down-arrow' : 'sap-icon--navigation-right-arrow'))) &&
          f(y, 'class', C),
        (!fe || (we[0] & 4352 && T !== (T = pn(i[65], i[8])))) && f(k, 'aria-expanded', T),
        (!fe || (we[0] & 4352 && N !== (N = i[36](i[65], i[8])))) && f(k, 'title', N),
        (!fe || (we[0] & 32 && D !== (D = i[5] ? '0' : '-1'))) && f(t, 'tabindex', D),
        (we[0] & 1488998464) | (we[1] & 16))
      ) {
        le = i[65];
        let ie;
        for (ie = 0; ie < le.length; ie += 1) {
          const Re = Rc(i, le, ie);
          ve[ie] ? (ve[ie].p(Re, we), B(ve[ie], 1)) : ((ve[ie] = Yc(Re)), ve[ie].c(), B(ve[ie], 1), ve[ie].m(L, null));
        }
        for (Ee(), ie = le.length; ie < ve.length; ie += 1) ue(ie);
        De();
      }
      (!fe || (we[0] & 4352 && M !== (M = !pn(i[65], i[8])))) && f(L, 'aria-hidden', M),
        i[65].metaInfo && i[65].metaInfo.label === i[7]
          ? x
            ? (x.p(i, we), we[0] & 4224 && B(x, 1))
            : ((x = Qc(i)), x.c(), B(x, 1), x.m(e, O))
          : x &&
            (Ee(),
            G(x, 1, 1, () => {
              x = null;
            }),
            De()),
        (!fe || (we[0] & 4096 && j !== (j = i[29](i[65].metaInfo, i[64])))) && f(e, 'data-testid', j),
        (!fe || we[0] & 4352) && hi(e, 'lui-item-expanded', pn(i[65], i[8]));
    },
    i(ke) {
      if (!fe) {
        for (let we = 0; we < le.length; we += 1) B(ve[we]);
        B(x), (fe = !0);
      }
    },
    o(ke) {
      ve = ve.filter(Boolean);
      for (let we = 0; we < ve.length; we += 1) G(ve[we]);
      G(x), (fe = !1);
    },
    d(ke) {
      ke && A(e), H.d(), ct(ve, ke), x && x.d(), (X = !1), Ze(Q);
    }
  };
}
function Fc(i) {
  let e, t;
  function n(s, o) {
    return o[0] & 4096 && (e = null), e == null && (e = !!s[26](s[65].metaInfo.icon)), e ? _k : gk;
  }
  let l = n(i, [-1, -1, -1]),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function gk(i) {
  let e, t, n, l;
  return {
    c() {
      (e = S('span')),
        (t = S('img')),
        rt(t.src, (n = i[65].metaInfo.icon)) || f(t, 'src', n),
        f(t, 'alt', (l = i[65].metaInfo.altText ? i[65].metaInfo.altText : '')),
        f(t, 'class', 'svelte-1b792v2'),
        f(e, 'class', 'fd-nested-list__icon sap-icon svelte-1b792v2');
    },
    m(r, s) {
      R(r, e, s), w(e, t);
    },
    p(r, s) {
      s[0] & 4096 && !rt(t.src, (n = r[65].metaInfo.icon)) && f(t, 'src', n),
        s[0] & 4096 && l !== (l = r[65].metaInfo.altText ? r[65].metaInfo.altText : '') && f(t, 'alt', l);
    },
    d(r) {
      r && A(e);
    }
  };
}
function _k(i) {
  let e, t;
  return {
    c() {
      (e = S('i')),
        f(
          e,
          'class',
          (t =
            'fd-nested-list__icon sap-icon ' +
            (i[65].metaInfo.icon ? i[25](i[65].metaInfo.icon) : '') +
            ' svelte-1b792v2')
        ),
        f(e, 'role', 'presentation');
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 4096 &&
        t !==
          (t =
            'fd-nested-list__icon sap-icon ' +
            (n[65].metaInfo.icon ? n[25](n[65].metaInfo.icon) : '') +
            ' svelte-1b792v2') &&
        f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Uc(i) {
  let e,
    t,
    n = i[68].label && Bc(i);
  return {
    c() {
      n && n.c(), (e = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, e, r), (t = !0);
    },
    p(l, r) {
      l[68].label
        ? n
          ? (n.p(l, r), r[0] & 4096 && B(n, 1))
          : ((n = Bc(l)), n.c(), B(n, 1), n.m(e.parentNode, e))
        : n &&
          (Ee(),
          G(n, 1, 1, () => {
            n = null;
          }),
          De());
    },
    i(l) {
      t || (B(n), (t = !0));
    },
    o(l) {
      G(n), (t = !1);
    },
    d(l) {
      n && n.d(l), l && A(e);
    }
  };
}
function Bc(i) {
  let e,
    t,
    n,
    l,
    r = i[23](i[68].label) + '',
    s,
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C,
    T,
    N;
  function D(X, Q) {
    return X[68].icon ? mk : pk;
  }
  let I = D(i),
    L = I(i),
    M = i[68].statusBadge && Wc(i),
    F = i[68].externalLink && i[68].externalLink.url && Hc(),
    O = i[68].badgeCounter && zc(i);
  function j(...X) {
    return i[52](i[68], ...X);
  }
  function fe(...X) {
    return i[53](i[68], ...X);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        L.c(),
        (n = q()),
        (l = S('span')),
        (s = Pe(r)),
        (o = q()),
        M && M.c(),
        (g = q()),
        F && F.c(),
        (h = q()),
        O && O.c(),
        (k = q()),
        f(
          l,
          'class',
          (c =
            'fd-nested-list__title badge-align-' +
            (i[68].statusBadge && i[68].statusBadge.align === 'right' ? 'right' : 'left') +
            ' svelte-1b792v2')
        ),
        f(t, 'href', (_ = i[28](i[68]))),
        f(t, 'tabindex', '0'),
        f(t, 'class', (p = 'fd-nested-list__link ' + (i[68] === i[6] ? 'is-selected' : '') + ' svelte-1b792v2')),
        f(t, 'role', (m = i[22] ? void 0 : 'button')),
        f(t, 'data-testid', (v = i[27](i[68]))),
        f(e, 'class', 'fd-nested-list__item'),
        f(e, 'title', (y = i[30](i[68], i[23](i[68].label)))),
        f(e, 'aria-labelledby', 'category_list_level1_' + i[67]);
    },
    m(X, Q) {
      R(X, e, Q),
        w(e, t),
        L.m(t, null),
        w(t, n),
        w(t, l),
        w(l, s),
        w(l, o),
        M && M.m(l, null),
        w(t, g),
        F && F.m(t, null),
        w(t, h),
        O && O.m(t, null),
        w(e, k),
        (C = !0),
        T ||
          ((N = [
            ne(t, 'click', j),
            ne(t, 'keyup', function() {
              Fi(i[22] ? void 0 : fe) && (i[22] ? void 0 : fe).apply(this, arguments);
            })
          ]),
          (T = !0));
    },
    p(X, Q) {
      (i = X),
        I === (I = D(i)) && L ? L.p(i, Q) : (L.d(1), (L = I(i)), L && (L.c(), L.m(t, n))),
        (!C || Q[0] & 8392704) && r !== (r = i[23](i[68].label) + '') && Ne(s, r),
        i[68].statusBadge
          ? M
            ? (M.p(i, Q), Q[0] & 4096 && B(M, 1))
            : ((M = Wc(i)), M.c(), B(M, 1), M.m(l, null))
          : M &&
            (Ee(),
            G(M, 1, 1, () => {
              M = null;
            }),
            De()),
        (!C ||
          (Q[0] & 4096 &&
            c !==
              (c =
                'fd-nested-list__title badge-align-' +
                (i[68].statusBadge && i[68].statusBadge.align === 'right' ? 'right' : 'left') +
                ' svelte-1b792v2'))) &&
          f(l, 'class', c),
        i[68].externalLink && i[68].externalLink.url ? F || ((F = Hc()), F.c(), F.m(t, h)) : F && (F.d(1), (F = null)),
        i[68].badgeCounter
          ? O
            ? (O.p(i, Q), Q[0] & 4096 && B(O, 1))
            : ((O = zc(i)), O.c(), B(O, 1), O.m(t, null))
          : O &&
            (Ee(),
            G(O, 1, 1, () => {
              O = null;
            }),
            De()),
        (!C || (Q[0] & 4096 && _ !== (_ = i[28](i[68])))) && f(t, 'href', _),
        (!C ||
          (Q[0] & 4160 &&
            p !== (p = 'fd-nested-list__link ' + (i[68] === i[6] ? 'is-selected' : '') + ' svelte-1b792v2'))) &&
          f(t, 'class', p),
        (!C || (Q[0] & 4194304 && m !== (m = i[22] ? void 0 : 'button'))) && f(t, 'role', m),
        (!C || (Q[0] & 4096 && v !== (v = i[27](i[68])))) && f(t, 'data-testid', v),
        (!C || (Q[0] & 8392704 && y !== (y = i[30](i[68], i[23](i[68].label))))) && f(e, 'title', y);
    },
    i(X) {
      C || (B(M), B(O), (C = !0));
    },
    o(X) {
      G(M), G(O), (C = !1);
    },
    d(X) {
      X && A(e), L.d(), M && M.d(), F && F.d(), O && O.d(), (T = !1), Ze(N);
    }
  };
}
function pk(i) {
  let e,
    t,
    n,
    l,
    r = i[5] ? 'sap-icon--rhombus-milestone-2' : '',
    s;
  return {
    c() {
      (e = S('i')),
        (n = q()),
        (l = S('span')),
        (s = Pe(r)),
        f(e, 'class', (t = 'fd-nested-list__icon sap-icon ' + (i[5] ? 'sap-icon--rhombus-milestone-2' : '')));
    },
    m(o, c) {
      R(o, e, c), R(o, n, c), R(o, l, c), w(l, s);
    },
    p(o, c) {
      c[0] & 32 &&
        t !== (t = 'fd-nested-list__icon sap-icon ' + (o[5] ? 'sap-icon--rhombus-milestone-2' : '')) &&
        f(e, 'class', t),
        c[0] & 32 && r !== (r = o[5] ? 'sap-icon--rhombus-milestone-2' : '') && Ne(s, r);
    },
    d(o) {
      o && A(e), o && A(n), o && A(l);
    }
  };
}
function mk(i) {
  let e, t;
  function n(s, o) {
    return o[0] & 4096 && (e = null), e == null && (e = !!s[26](s[68].icon)), e ? vk : bk;
  }
  let l = n(i, [-1, -1, -1]),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function bk(i) {
  let e, t, n, l;
  return {
    c() {
      (e = S('span')),
        (t = S('img')),
        rt(t.src, (n = i[68].icon)) || f(t, 'src', n),
        f(t, 'alt', (l = i[68].altText ? i[68].altText : '')),
        f(t, 'class', 'svelte-1b792v2'),
        f(e, 'class', 'fd-nested-list__icon sap-icon svelte-1b792v2');
    },
    m(r, s) {
      R(r, e, s), w(e, t);
    },
    p(r, s) {
      s[0] & 4096 && !rt(t.src, (n = r[68].icon)) && f(t, 'src', n),
        s[0] & 4096 && l !== (l = r[68].altText ? r[68].altText : '') && f(t, 'alt', l);
    },
    d(r) {
      r && A(e);
    }
  };
}
function vk(i) {
  let e, t;
  return {
    c() {
      (e = S('i')), f(e, 'class', (t = 'fd-nested-list__icon sap-icon ' + i[25](i[68].icon) + ' svelte-1b792v2'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 4096 &&
        t !== (t = 'fd-nested-list__icon sap-icon ' + n[25](n[68].icon) + ' svelte-1b792v2') &&
        f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Wc(i) {
  let e, t;
  return (
    (e = new xr({ props: { node: i[68] } })),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 4096 && (r.node = n[68]), e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function Hc(i) {
  let e;
  return {
    c() {
      (e = S('i')), f(e, 'class', 'sap-icon--action');
    },
    m(t, n) {
      R(t, e, n);
    },
    d(t) {
      t && A(e);
    }
  };
}
function zc(i) {
  let e, t;
  return (
    (e = new Zn({ props: { node: i[68] } })),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 4096 && (r.node = n[68]), e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function qc(i) {
  let e,
    t,
    n = !i[68].hideFromNav && Uc(i);
  return {
    c() {
      n && n.c(), (e = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, e, r), (t = !0);
    },
    p(l, r) {
      l[68].hideFromNav
        ? n &&
          (Ee(),
          G(n, 1, 1, () => {
            n = null;
          }),
          De())
        : n
        ? (n.p(l, r), r[0] & 4096 && B(n, 1))
        : ((n = Uc(l)), n.c(), B(n, 1), n.m(e.parentNode, e));
    },
    i(l) {
      t || (B(n), (t = !0));
    },
    o(l) {
      G(n), (t = !1);
    },
    d(l) {
      n && n.d(l), l && A(e);
    }
  };
}
function wk(i) {
  let e, t, n, l;
  return {
    c() {
      (e = S('span')),
        (t = S('img')),
        rt(t.src, (n = i[65].metaInfo.icon)) || f(t, 'src', n),
        f(t, 'alt', (l = i[65].metaInfo.altText ? i[65].metaInfo.altText : '')),
        f(t, 'class', 'svelte-1b792v2'),
        f(e, 'class', 'fd-nested-list__icon sap-icon svelte-1b792v2');
    },
    m(r, s) {
      R(r, e, s), w(e, t);
    },
    p(r, s) {
      s[0] & 4096 && !rt(t.src, (n = r[65].metaInfo.icon)) && f(t, 'src', n),
        s[0] & 4096 && l !== (l = r[65].metaInfo.altText ? r[65].metaInfo.altText : '') && f(t, 'alt', l);
    },
    d(r) {
      r && A(e);
    }
  };
}
function kk(i) {
  let e, t;
  return {
    c() {
      (e = S('i')),
        f(
          e,
          'class',
          (t =
            'fd-nested-list__icon sap-icon ' +
            i[25](i[65].metaInfo.icon) +
            ' ' +
            (i[5] && !i[65].metaInfo.icon ? 'sap-icon--rhombus-milestone-2' : '') +
            ' svelte-1b792v2')
        ),
        f(e, 'role', 'presentation');
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 4128 &&
        t !==
          (t =
            'fd-nested-list__icon sap-icon ' +
            n[25](n[65].metaInfo.icon) +
            ' ' +
            (n[5] && !n[65].metaInfo.icon ? 'sap-icon--rhombus-milestone-2' : '') +
            ' svelte-1b792v2') &&
        f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Gc(i) {
  let e,
    t,
    n = i[68].label && Kc(i);
  return {
    c() {
      n && n.c(), (e = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, e, r), (t = !0);
    },
    p(l, r) {
      l[68].label
        ? n
          ? (n.p(l, r), r[0] & 4096 && B(n, 1))
          : ((n = Kc(l)), n.c(), B(n, 1), n.m(e.parentNode, e))
        : n &&
          (Ee(),
          G(n, 1, 1, () => {
            n = null;
          }),
          De());
    },
    i(l) {
      t || (B(n), (t = !0));
    },
    o(l) {
      G(n), (t = !1);
    },
    d(l) {
      n && n.d(l), l && A(e);
    }
  };
}
function Kc(i) {
  let e,
    t,
    n,
    l = i[23](i[68].label) + '',
    r,
    s,
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C,
    T,
    N;
  o = new xr({ props: { node: i[68] } });
  let D = i[68].externalLink && i[68].externalLink.url && Jc(),
    I = i[68].badgeCounter && jc(i);
  function L(...F) {
    return i[47](i[68], ...F);
  }
  function M(...F) {
    return i[48](i[68], ...F);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('span')),
        (r = Pe(l)),
        (s = q()),
        Ge(o.$$.fragment),
        (g = q()),
        D && D.c(),
        (h = q()),
        I && I.c(),
        (y = q()),
        f(
          n,
          'class',
          (c =
            'fd-nested-list__title badge-align-' +
            (i[68].statusBadge && i[68].statusBadge.align === 'right' ? 'right' : 'left') +
            ' svelte-1b792v2')
        ),
        f(t, 'href', (_ = i[28](i[68]))),
        f(t, 'class', (p = 'fd-nested-list__link ' + (i[68] === i[6] ? 'is-selected' : '') + ' svelte-1b792v2')),
        f(t, 'role', (m = i[22] ? void 0 : 'button')),
        f(t, 'tabindex', '0'),
        f(t, 'data-testid', (v = i[27](i[68]))),
        f(t, 'title', (k = i[30](i[68], i[23](i[68].label)))),
        f(e, 'class', 'fd-nested-list__item'),
        f(e, 'aria-labelledby', 'collapsible_listnode_' + i[67]);
    },
    m(F, O) {
      R(F, e, O),
        w(e, t),
        w(t, n),
        w(n, r),
        w(n, s),
        He(o, n, null),
        w(t, g),
        D && D.m(t, null),
        w(t, h),
        I && I.m(t, null),
        w(e, y),
        (C = !0),
        T ||
          ((N = [
            ne(t, 'click', L),
            ne(t, 'keyup', function() {
              Fi(i[22] ? void 0 : M) && (i[22] ? void 0 : M).apply(this, arguments);
            })
          ]),
          (T = !0));
    },
    p(F, O) {
      (i = F), (!C || O[0] & 8392704) && l !== (l = i[23](i[68].label) + '') && Ne(r, l);
      const j = {};
      O[0] & 4096 && (j.node = i[68]),
        o.$set(j),
        (!C ||
          (O[0] & 4096 &&
            c !==
              (c =
                'fd-nested-list__title badge-align-' +
                (i[68].statusBadge && i[68].statusBadge.align === 'right' ? 'right' : 'left') +
                ' svelte-1b792v2'))) &&
          f(n, 'class', c),
        i[68].externalLink && i[68].externalLink.url ? D || ((D = Jc()), D.c(), D.m(t, h)) : D && (D.d(1), (D = null)),
        i[68].badgeCounter
          ? I
            ? (I.p(i, O), O[0] & 4096 && B(I, 1))
            : ((I = jc(i)), I.c(), B(I, 1), I.m(t, null))
          : I &&
            (Ee(),
            G(I, 1, 1, () => {
              I = null;
            }),
            De()),
        (!C || (O[0] & 4096 && _ !== (_ = i[28](i[68])))) && f(t, 'href', _),
        (!C ||
          (O[0] & 4160 &&
            p !== (p = 'fd-nested-list__link ' + (i[68] === i[6] ? 'is-selected' : '') + ' svelte-1b792v2'))) &&
          f(t, 'class', p),
        (!C || (O[0] & 4194304 && m !== (m = i[22] ? void 0 : 'button'))) && f(t, 'role', m),
        (!C || (O[0] & 4096 && v !== (v = i[27](i[68])))) && f(t, 'data-testid', v),
        (!C || (O[0] & 8392704 && k !== (k = i[30](i[68], i[23](i[68].label))))) && f(t, 'title', k);
    },
    i(F) {
      C || (B(o.$$.fragment, F), B(I), (C = !0));
    },
    o(F) {
      G(o.$$.fragment, F), G(I), (C = !1);
    },
    d(F) {
      F && A(e), ze(o), D && D.d(), I && I.d(), (T = !1), Ze(N);
    }
  };
}
function Jc(i) {
  let e;
  return {
    c() {
      (e = S('i')), f(e, 'class', 'sap-icon--action');
    },
    m(t, n) {
      R(t, e, n);
    },
    d(t) {
      t && A(e);
    }
  };
}
function jc(i) {
  let e, t;
  return (
    (e = new Zn({ props: { node: i[68] } })),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 4096 && (r.node = n[68]), e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function Yc(i) {
  let e,
    t,
    n = !i[68].hideFromNav && Gc(i);
  return {
    c() {
      n && n.c(), (e = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, e, r), (t = !0);
    },
    p(l, r) {
      l[68].hideFromNav
        ? n &&
          (Ee(),
          G(n, 1, 1, () => {
            n = null;
          }),
          De())
        : n
        ? (n.p(l, r), r[0] & 4096 && B(n, 1))
        : ((n = Gc(l)), n.c(), B(n, 1), n.m(e.parentNode, e));
    },
    i(l) {
      t || (B(n), (t = !0));
    },
    o(l) {
      G(n), (t = !1);
    },
    d(l) {
      n && n.d(l), l && A(e);
    }
  };
}
function Qc(i) {
  let e,
    t,
    n,
    l = i[23](i[64]) + '',
    r,
    s,
    o,
    c,
    g = i[65],
    h = [];
  for (let p = 0; p < g.length; p += 1) h[p] = ed(Ac(i, g, p));
  const _ = p =>
    G(h[p], 1, 1, () => {
      h[p] = null;
    });
  return {
    c() {
      (e = S('div')), (t = S('div')), (n = S('h5')), (r = Pe(l)), (s = q()), (o = S('ul'));
      for (let p = 0; p < h.length; p += 1) h[p].c();
      f(n, 'class', 'lui-flyout-sublist__title fd-has-type-minus-1 fd-has-color-text-4 svelte-1b792v2'),
        f(o, 'class', 'fd-nested-list fd-nested-list--text-only svelte-1b792v2'),
        f(t, 'class', 'lui-flyout-sublist__wrapper svelte-1b792v2'),
        f(e, 'class', 'lui-flyout-sublist svelte-1b792v2');
    },
    m(p, m) {
      R(p, e, m), w(e, t), w(t, n), w(n, r), w(t, s), w(t, o);
      for (let v = 0; v < h.length; v += 1) h[v].m(o, null);
      c = !0;
    },
    p(p, m) {
      if (((!c || m[0] & 8392704) && l !== (l = p[23](p[64]) + '') && Ne(r, l), (m[0] & 1488998464) | (m[1] & 16))) {
        g = p[65];
        let v;
        for (v = 0; v < g.length; v += 1) {
          const k = Ac(p, g, v);
          h[v] ? (h[v].p(k, m), B(h[v], 1)) : ((h[v] = ed(k)), h[v].c(), B(h[v], 1), h[v].m(o, null));
        }
        for (Ee(), v = g.length; v < h.length; v += 1) _(v);
        De();
      }
    },
    i(p) {
      if (!c) {
        for (let m = 0; m < g.length; m += 1) B(h[m]);
        c = !0;
      }
    },
    o(p) {
      h = h.filter(Boolean);
      for (let m = 0; m < h.length; m += 1) G(h[m]);
      c = !1;
    },
    d(p) {
      p && A(e), ct(h, p);
    }
  };
}
function Zc(i) {
  let e,
    t,
    n = i[68].label && Xc(i);
  return {
    c() {
      n && n.c(), (e = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, e, r), (t = !0);
    },
    p(l, r) {
      l[68].label
        ? n
          ? (n.p(l, r), r[0] & 4096 && B(n, 1))
          : ((n = Xc(l)), n.c(), B(n, 1), n.m(e.parentNode, e))
        : n &&
          (Ee(),
          G(n, 1, 1, () => {
            n = null;
          }),
          De());
    },
    i(l) {
      t || (B(n), (t = !0));
    },
    o(l) {
      G(n), (t = !1);
    },
    d(l) {
      n && n.d(l), l && A(e);
    }
  };
}
function Xc(i) {
  let e,
    t,
    n,
    l = i[23](i[68].label) + '',
    r,
    s,
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C,
    T,
    N;
  o = new xr({ props: { node: i[68] } });
  let D = i[68].externalLink && i[68].externalLink.url && $c(),
    I = i[68].badgeCounter && xc(i);
  function L(...F) {
    return i[49](i[68], ...F);
  }
  function M(...F) {
    return i[50](i[68], ...F);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('span')),
        (r = Pe(l)),
        (s = q()),
        Ge(o.$$.fragment),
        (g = q()),
        D && D.c(),
        (h = q()),
        I && I.c(),
        (y = q()),
        f(
          n,
          'class',
          (c =
            'fd-nested-list__title badge-align-' +
            (i[68].statusBadge && i[68].statusBadge.align === 'right' ? 'right' : 'left') +
            ' svelte-1b792v2')
        ),
        f(t, 'href', (_ = i[28](i[68]))),
        f(t, 'class', (p = 'fd-nested-list__link ' + (i[68] === i[6] ? 'is-selected' : '') + ' svelte-1b792v2')),
        f(t, 'tabindex', '0'),
        f(t, 'role', (m = i[22] ? void 0 : 'button')),
        f(t, 'data-testid', (v = i[27](i[68]))),
        f(t, 'title', (k = i[30](i[68], i[23](i[68].label)))),
        f(e, 'class', 'fd-nested-list__item');
    },
    m(F, O) {
      R(F, e, O),
        w(e, t),
        w(t, n),
        w(n, r),
        w(n, s),
        He(o, n, null),
        w(t, g),
        D && D.m(t, null),
        w(t, h),
        I && I.m(t, null),
        w(e, y),
        (C = !0),
        T ||
          ((N = [
            ne(t, 'click', L),
            ne(t, 'keyup', function() {
              Fi(i[22] ? void 0 : M) && (i[22] ? void 0 : M).apply(this, arguments);
            })
          ]),
          (T = !0));
    },
    p(F, O) {
      (i = F), (!C || O[0] & 8392704) && l !== (l = i[23](i[68].label) + '') && Ne(r, l);
      const j = {};
      O[0] & 4096 && (j.node = i[68]),
        o.$set(j),
        (!C ||
          (O[0] & 4096 &&
            c !==
              (c =
                'fd-nested-list__title badge-align-' +
                (i[68].statusBadge && i[68].statusBadge.align === 'right' ? 'right' : 'left') +
                ' svelte-1b792v2'))) &&
          f(n, 'class', c),
        i[68].externalLink && i[68].externalLink.url ? D || ((D = $c()), D.c(), D.m(t, h)) : D && (D.d(1), (D = null)),
        i[68].badgeCounter
          ? I
            ? (I.p(i, O), O[0] & 4096 && B(I, 1))
            : ((I = xc(i)), I.c(), B(I, 1), I.m(t, null))
          : I &&
            (Ee(),
            G(I, 1, 1, () => {
              I = null;
            }),
            De()),
        (!C || (O[0] & 4096 && _ !== (_ = i[28](i[68])))) && f(t, 'href', _),
        (!C ||
          (O[0] & 4160 &&
            p !== (p = 'fd-nested-list__link ' + (i[68] === i[6] ? 'is-selected' : '') + ' svelte-1b792v2'))) &&
          f(t, 'class', p),
        (!C || (O[0] & 4194304 && m !== (m = i[22] ? void 0 : 'button'))) && f(t, 'role', m),
        (!C || (O[0] & 4096 && v !== (v = i[27](i[68])))) && f(t, 'data-testid', v),
        (!C || (O[0] & 8392704 && k !== (k = i[30](i[68], i[23](i[68].label))))) && f(t, 'title', k);
    },
    i(F) {
      C || (B(o.$$.fragment, F), B(I), (C = !0));
    },
    o(F) {
      G(o.$$.fragment, F), G(I), (C = !1);
    },
    d(F) {
      F && A(e), ze(o), D && D.d(), I && I.d(), (T = !1), Ze(N);
    }
  };
}
function $c(i) {
  let e;
  return {
    c() {
      (e = S('i')), f(e, 'class', 'sap-icon--action');
    },
    m(t, n) {
      R(t, e, n);
    },
    d(t) {
      t && A(e);
    }
  };
}
function xc(i) {
  let e, t;
  return (
    (e = new Zn({ props: { node: i[68] } })),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 4096 && (r.node = n[68]), e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function ed(i) {
  let e,
    t,
    n = !i[68].hideFromNav && Zc(i);
  return {
    c() {
      n && n.c(), (e = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, e, r), (t = !0);
    },
    p(l, r) {
      l[68].hideFromNav
        ? n &&
          (Ee(),
          G(n, 1, 1, () => {
            n = null;
          }),
          De())
        : n
        ? (n.p(l, r), r[0] & 4096 && B(n, 1))
        : ((n = Zc(l)), n.c(), B(n, 1), n.m(e.parentNode, e));
    },
    i(l) {
      t || (B(n), (t = !0));
    },
    o(l) {
      G(n), (t = !1);
    },
    d(l) {
      n && n.d(l), l && A(e);
    }
  };
}
function td(i) {
  let e,
    t,
    n = i[68].label && nd(i);
  return {
    c() {
      n && n.c(), (e = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, e, r), (t = !0);
    },
    p(l, r) {
      l[68].label
        ? n
          ? (n.p(l, r), r[0] & 4096 && B(n, 1))
          : ((n = nd(l)), n.c(), B(n, 1), n.m(e.parentNode, e))
        : n &&
          (Ee(),
          G(n, 1, 1, () => {
            n = null;
          }),
          De());
    },
    i(l) {
      t || (B(n), (t = !0));
    },
    o(l) {
      G(n), (t = !1);
    },
    d(l) {
      n && n.d(l), l && A(e);
    }
  };
}
function nd(i) {
  let e,
    t,
    n,
    l,
    r = i[23](i[68].label) + '',
    s,
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C,
    T,
    N,
    D;
  function I(X, Q) {
    return X[68].icon ? Ck : Sk;
  }
  let L = I(i),
    M = L(i);
  c = new xr({ props: { node: i[68] } });
  let F = i[68].externalLink && i[68].externalLink.url && id(),
    O = i[68].badgeCounter && ld(i);
  function j(...X) {
    return i[42](i[68], ...X);
  }
  function fe(...X) {
    return i[43](i[68], ...X);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        M.c(),
        (n = q()),
        (l = S('span')),
        (s = Pe(r)),
        (o = q()),
        Ge(c.$$.fragment),
        (h = q()),
        F && F.c(),
        (_ = q()),
        O && O.c(),
        (C = q()),
        f(
          l,
          'class',
          (g =
            'fd-nested-list__title badge-align-' +
            (i[68].statusBadge && i[68].statusBadge.align === 'right' ? 'right' : 'left') +
            ' svelte-1b792v2')
        ),
        f(t, 'href', (p = i[28](i[68]))),
        f(t, 'title', (m = i[30](i[68], i[23](i[68].label)))),
        f(t, 'class', (v = 'fd-nested-list__link ' + (i[68] === i[6] ? 'is-selected' : '') + ' svelte-1b792v2')),
        f(t, 'tabindex', '0'),
        f(t, 'role', (k = i[22] ? void 0 : 'button')),
        f(t, 'data-testid', (y = i[27](i[68]))),
        f(e, 'class', 'fd-nested-list__item');
    },
    m(X, Q) {
      R(X, e, Q),
        w(e, t),
        M.m(t, null),
        w(t, n),
        w(t, l),
        w(l, s),
        w(l, o),
        He(c, l, null),
        w(t, h),
        F && F.m(t, null),
        w(t, _),
        O && O.m(t, null),
        w(e, C),
        (T = !0),
        N ||
          ((D = [
            ne(t, 'click', j),
            ne(t, 'keyup', function() {
              Fi(i[22] ? void 0 : fe) && (i[22] ? void 0 : fe).apply(this, arguments);
            })
          ]),
          (N = !0));
    },
    p(X, Q) {
      (i = X),
        L === (L = I(i)) && M ? M.p(i, Q) : (M.d(1), (M = L(i)), M && (M.c(), M.m(t, n))),
        (!T || Q[0] & 8392704) && r !== (r = i[23](i[68].label) + '') && Ne(s, r);
      const ce = {};
      Q[0] & 4096 && (ce.node = i[68]),
        c.$set(ce),
        (!T ||
          (Q[0] & 4096 &&
            g !==
              (g =
                'fd-nested-list__title badge-align-' +
                (i[68].statusBadge && i[68].statusBadge.align === 'right' ? 'right' : 'left') +
                ' svelte-1b792v2'))) &&
          f(l, 'class', g),
        i[68].externalLink && i[68].externalLink.url ? F || ((F = id()), F.c(), F.m(t, _)) : F && (F.d(1), (F = null)),
        i[68].badgeCounter
          ? O
            ? (O.p(i, Q), Q[0] & 4096 && B(O, 1))
            : ((O = ld(i)), O.c(), B(O, 1), O.m(t, null))
          : O &&
            (Ee(),
            G(O, 1, 1, () => {
              O = null;
            }),
            De()),
        (!T || (Q[0] & 4096 && p !== (p = i[28](i[68])))) && f(t, 'href', p),
        (!T || (Q[0] & 8392704 && m !== (m = i[30](i[68], i[23](i[68].label))))) && f(t, 'title', m),
        (!T ||
          (Q[0] & 4160 &&
            v !== (v = 'fd-nested-list__link ' + (i[68] === i[6] ? 'is-selected' : '') + ' svelte-1b792v2'))) &&
          f(t, 'class', v),
        (!T || (Q[0] & 4194304 && k !== (k = i[22] ? void 0 : 'button'))) && f(t, 'role', k),
        (!T || (Q[0] & 4096 && y !== (y = i[27](i[68])))) && f(t, 'data-testid', y);
    },
    i(X) {
      T || (B(c.$$.fragment, X), B(O), (T = !0));
    },
    o(X) {
      G(c.$$.fragment, X), G(O), (T = !1);
    },
    d(X) {
      X && A(e), M.d(), ze(c), F && F.d(), O && O.d(), (N = !1), Ze(D);
    }
  };
}
function Sk(i) {
  let e, t;
  return {
    c() {
      (e = S('i')),
        f(e, 'class', (t = 'fd-nested-list__icon sap-icon ' + (i[5] ? 'sap-icon--rhombus-milestone-2' : ''))),
        f(e, 'role', 'presentation');
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 32 &&
        t !== (t = 'fd-nested-list__icon sap-icon ' + (n[5] ? 'sap-icon--rhombus-milestone-2' : '')) &&
        f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Ck(i) {
  let e, t;
  function n(s, o) {
    return o[0] & 4096 && (e = null), e == null && (e = !!s[26](s[68].icon)), e ? Pk : yk;
  }
  let l = n(i, [-1, -1, -1]),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function yk(i) {
  let e, t, n, l;
  return {
    c() {
      (e = S('span')),
        (t = S('img')),
        rt(t.src, (n = i[68].icon)) || f(t, 'src', n),
        f(t, 'alt', (l = i[68].altText ? i[68].altText : '')),
        f(t, 'class', 'svelte-1b792v2'),
        f(e, 'class', 'fd-nested-list__icon sap-icon svelte-1b792v2');
    },
    m(r, s) {
      R(r, e, s), w(e, t);
    },
    p(r, s) {
      s[0] & 4096 && !rt(t.src, (n = r[68].icon)) && f(t, 'src', n),
        s[0] & 4096 && l !== (l = r[68].altText ? r[68].altText : '') && f(t, 'alt', l);
    },
    d(r) {
      r && A(e);
    }
  };
}
function Pk(i) {
  let e, t;
  return {
    c() {
      (e = S('i')),
        f(e, 'class', (t = 'fd-nested-list__icon sap-icon ' + i[25](i[68].icon) + ' svelte-1b792v2')),
        f(e, 'role', 'presentation');
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 4096 &&
        t !== (t = 'fd-nested-list__icon sap-icon ' + n[25](n[68].icon) + ' svelte-1b792v2') &&
        f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function id(i) {
  let e;
  return {
    c() {
      (e = S('i')), f(e, 'class', 'fd-nested-list__icon sap-icon sap-icon--action'), f(e, 'role', 'presentation');
    },
    m(t, n) {
      R(t, e, n);
    },
    d(t) {
      t && A(e);
    }
  };
}
function ld(i) {
  let e, t;
  return (
    (e = new Zn({ props: { node: i[68] } })),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 4096 && (r.node = n[68]), e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function rd(i) {
  let e,
    t,
    n = !i[68].hideFromNav && td(i);
  return {
    c() {
      n && n.c(), (e = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, e, r), (t = !0);
    },
    p(l, r) {
      l[68].hideFromNav
        ? n &&
          (Ee(),
          G(n, 1, 1, () => {
            n = null;
          }),
          De())
        : n
        ? (n.p(l, r), r[0] & 4096 && B(n, 1))
        : ((n = td(l)), n.c(), B(n, 1), n.m(e.parentNode, e));
    },
    i(l) {
      t || (B(n), (t = !0));
    },
    o(l) {
      G(n), (t = !1);
    },
    d(l) {
      n && n.d(l), l && A(e);
    }
  };
}
function sd(i) {
  let e, t, n, l, r, s;
  const o = [ck, fk],
    c = [];
  function g(h, _) {
    return (
      _[0] & 12288 && (e = null),
      _[0] & 4096 && (t = null),
      e == null && (e = !!(h[64] === 'undefined' || h[64].startsWith(h[13]))),
      e ? 0 : (t == null && (t = h[65].filter(Ik).length > 0), t ? 1 : -1)
    );
  }
  return (
    ~(n = g(i, [-1, -1, -1])) && (l = c[n] = o[n](i)),
    {
      c() {
        l && l.c(), (r = ye());
      },
      m(h, _) {
        ~n && c[n].m(h, _), R(h, r, _), (s = !0);
      },
      p(h, _) {
        let p = n;
        (n = g(h, _)),
          n === p
            ? ~n && c[n].p(h, _)
            : (l &&
                (Ee(),
                G(c[p], 1, 1, () => {
                  c[p] = null;
                }),
                De()),
              ~n
                ? ((l = c[n]), l ? l.p(h, _) : ((l = c[n] = o[n](h)), l.c()), B(l, 1), l.m(r.parentNode, r))
                : (l = null));
      },
      i(h) {
        s || (B(l), (s = !0));
      },
      o(h) {
        G(l), (s = !1);
      },
      d(h) {
        ~n && c[n].d(h), h && A(r);
      }
    }
  );
}
function ad(i) {
  let e,
    t,
    n,
    l = (i[2] ? i[2] : '') + '',
    r,
    s,
    o = i[3] && od(i);
  return {
    c() {
      (e = S('div')),
        (t = S('span')),
        (n = S('span')),
        (r = Pe(l)),
        (s = q()),
        o && o.c(),
        f(n, 'class', 'lui-side-nav__footer--text fd-has-type-minus-1 svelte-1b792v2'),
        f(n, 'data-testid', 'lui-side-nav__footer--text'),
        f(t, 'class', 'lui-side-nav__footer svelte-1b792v2'),
        f(t, 'data-testid', 'lui-side-nav__footer'),
        f(e, 'class', 'fd-side-nav__utility svelte-1b792v2');
    },
    m(c, g) {
      R(c, e, g), w(e, t), w(t, n), w(n, r), w(t, s), o && o.m(t, null);
    },
    p(c, g) {
      g[0] & 4 && l !== (l = (c[2] ? c[2] : '') + '') && Ne(r, l),
        c[3] ? (o ? o.p(c, g) : ((o = od(c)), o.c(), o.m(t, null))) : o && (o.d(1), (o = null));
    },
    d(c) {
      c && A(e), o && o.d();
    }
  };
}
function od(i) {
  let e, t, n, l;
  return {
    c() {
      (e = S('i')),
        f(
          e,
          'class',
          (t =
            'lui-side-nav__footer--icon ' +
            (i[5] ? 'sap-icon--open-command-field' : 'sap-icon--close-command-field') +
            ' svelte-1b792v2')
        ),
        f(e, 'data-testid', 'semiCollapsibleButton'),
        f(e, 'title', i[10]),
        f(e, 'tabindex', '0');
    },
    m(r, s) {
      R(r, e, s), n || ((l = [ne(e, 'click', i[54]), ne(e, 'keydown', i[55])]), (n = !0));
    },
    p(r, s) {
      s[0] & 32 &&
        t !==
          (t =
            'lui-side-nav__footer--icon ' +
            (r[5] ? 'sap-icon--open-command-field' : 'sap-icon--close-command-field') +
            ' svelte-1b792v2') &&
        f(e, 'class', t),
        s[0] & 1024 && f(e, 'title', r[10]);
    },
    d(r) {
      r && A(e), (n = !1), Ze(l);
    }
  };
}
function Nk(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o,
    c,
    g,
    h,
    _ = i[11] && Dc(i),
    p = i[0] && i[4].length > 1 && Oc(i),
    m = (i[2] || i[3]) && ad(i);
  return {
    c() {
      (e = S('div')),
        _ && _.c(),
        (t = q()),
        (n = S('nav')),
        (l = S('div')),
        p && p.c(),
        (r = q()),
        m && m.c(),
        f(l, 'class', 'fd-side-nav__main-navigation svelte-1b792v2'),
        f(
          n,
          'class',
          (s =
            'fd-side-nav ' +
            (i[5] ? 'fd-side-nav--condensed' : '') +
            ' ' +
            (i[11] ? 'lui-nav-header-visible' : '') +
            ' svelte-1b792v2')
        ),
        f(n, 'data-testid', 'semiCollapsibleLeftNav'),
        f(
          e,
          'class',
          (o =
            'fd-app__sidebar ' +
            (i[1] ? 'hideNavComponent' : '') +
            ' ' +
            (i[2] || i[3] ? 'hasFooter' : '') +
            ' ' +
            (i[2] && !i[3] ? 'hasOnlyFooterText' : '') +
            ' svelte-1b792v2')
        );
    },
    m(v, k) {
      R(v, e, k),
        _ && _.m(e, null),
        w(e, t),
        w(e, n),
        w(n, l),
        p && p.m(l, null),
        w(n, r),
        m && m.m(n, null),
        (c = !0),
        g ||
          ((h = [
            ne($s, 'resize', i[16]),
            ne($s, 'click', i[20]),
            ne($s, 'blur', i[20]),
            ne($s, 'keydown', i[31]),
            ne(n, 'keyup', i[17])
          ]),
          (g = !0));
    },
    p(v, k) {
      v[11] ? (_ ? _.p(v, k) : ((_ = Dc(v)), _.c(), _.m(e, t))) : _ && (_.d(1), (_ = null)),
        v[0] && v[4].length > 1
          ? p
            ? (p.p(v, k), k[0] & 17 && B(p, 1))
            : ((p = Oc(v)), p.c(), B(p, 1), p.m(l, null))
          : p &&
            (Ee(),
            G(p, 1, 1, () => {
              p = null;
            }),
            De()),
        v[2] || v[3] ? (m ? m.p(v, k) : ((m = ad(v)), m.c(), m.m(n, null))) : m && (m.d(1), (m = null)),
        (!c ||
          (k[0] & 2080 &&
            s !==
              (s =
                'fd-side-nav ' +
                (v[5] ? 'fd-side-nav--condensed' : '') +
                ' ' +
                (v[11] ? 'lui-nav-header-visible' : '') +
                ' svelte-1b792v2'))) &&
          f(n, 'class', s),
        (!c ||
          (k[0] & 14 &&
            o !==
              (o =
                'fd-app__sidebar ' +
                (v[1] ? 'hideNavComponent' : '') +
                ' ' +
                (v[2] || v[3] ? 'hasFooter' : '') +
                ' ' +
                (v[2] && !v[3] ? 'hasOnlyFooterText' : '') +
                ' svelte-1b792v2'))) &&
          f(e, 'class', o);
    },
    i(v) {
      c || (B(p), (c = !0));
    },
    o(v) {
      G(p), (c = !1);
    },
    d(v) {
      v && A(e), _ && _.d(), p && p.d(), m && m.d(), (g = !1), Ze(h);
    }
  };
}
function pn(i, e) {
  return e && e.indexOf(i.metaInfo.categoryUid) >= 0;
}
const Ik = i => !i.hideFromNav && i.label;
function Tk(i, e, t) {
  let n;
  const l = {
      get: () => ({
        children: s,
        hideNavComponent: o,
        footerText: c,
        semiCollapsible: g,
        pathData: _,
        virtualGroupPrefix: m,
        isSemiCollapsed: v,
        selectedNode: k,
        sideNavAccordionMode: N,
        selectedCategory: y,
        expandedCategories: C,
        hasCategoriesWithIcon: T,
        navParentNode: L
      }),
      set: async te => {
        if (te) {
          Object.getOwnPropertyNames(te).forEach(async gt => {
            if (gt === 'pathData') t(4, (_ = te.pathData));
            else if (gt === 'context') M = te.context;
            else if (gt === 'children') t(0, (s = te.children));
            else if (gt === 'selectedNode') t(6, (k = te.selectedNode));
            else if (gt === 'hasCategoriesWithIcon') t(9, (T = te.hasCategoriesWithIcon));
            else if (gt === 'navParent') {
              t(11, (I = void 0));
              let yt = te.navParent;
              if ((t(39, (L = yt)), yt && yt.navHeader && ee.requestExperimentalFeature('navHeader', !0))) {
                let Pt = yt.navHeader,
                  wt = yt;
                if (Pt === 'inherit') {
                  for (wt = yt.parent; wt && wt.navHeader === 'inherit'; ) wt = wt.parent;
                  Pt = wt ? wt.navHeader : void 0;
                }
                if (Pt instanceof Function) {
                  t(11, (I = {}));
                  let an = Pt(Te.stripNode(yt), Te.stripNode(wt), M);
                  an instanceof Promise
                    ? an.then(Nn => {
                        t(11, (I = Nn));
                      })
                    : t(11, (I = an));
                } else if (Pt === 'auto') t(11, (I = { label: yt.label, icon: yt.icon }));
                else if (Pt && Pt.useTitleResolver && wt.titleResolver) {
                  wt.titleResolver.prerenderFallback
                    ? t(
                        11,
                        (I = {
                          ...Pt,
                          label: wt.titleResolver.fallbackTitle || '',
                          icon: wt.titleResolver.fallbackIcon
                        })
                      )
                    : t(11, (I = Pt));
                  const an = pe.mapPathToNode(it.getCurrentPath(), wt);
                  Mt.extractDataFromPath(an).then(Nn => {
                    const ri = pe.substituteDynamicParamsInObject(
                      Object.assign({}, Nn.pathData.context, wt.context),
                      Nn.pathData.pathParams
                    );
                    Te.fetchNodeTitleData(wt, ri)
                      .then(Hi => {
                        t(11, (I = { ...Pt, ...Hi }));
                      })
                      .catch(Hi => {
                        console.error('Error while retrieving title, fallback to node label'),
                          t(11, (I = { ...Pt, label: yt.label, icon: yt.icon }));
                      });
                  });
                } else t(11, (I = await le(Pt, wt)));
              }
            }
          });
          let Ve = (k && k.sideNavAccordionMode) || (k && k.parent && k.parent.sideNavAccordionMode);
          typeof Ve < 'u'
            ? t(38, (N = Ve))
            : t(38, (N = re.getConfigBooleanValue('navigation.defaults.sideNavAccordionMode')));
        }
      }
    },
    r = Wt();
  let { children: s } = e,
    { hideNavComponent: o } = e,
    { footerText: c } = e,
    { semiCollapsible: g } = e,
    { semiCollapsibleButton: h } = e,
    { pathData: _ } = e,
    { pathParams: p } = e,
    { virtualGroupPrefix: m = Te.virtualGroupPrefix } = e,
    { isSemiCollapsed: v } = e,
    { selectedNode: k } = e,
    { selectedCategory: y = null } = e,
    { expandedCategories: C } = e,
    { hasCategoriesWithIcon: T } = e,
    { sideNavAccordionMode: N } = e,
    { burgerTooltip: D } = e,
    { navHeader: I } = e,
    { navParentNode: L } = e,
    M,
    F,
    O,
    j = vt('store'),
    fe = vt('getTranslation');
  mi(i, fe, te => t(23, (n = te)));
  let X = !1;
  const Q = async () => {
    const te = l.get(),
      Ve = await Mt.getLeftNavData({ ...te }, te);
    !Ve || (l.set(Ve), (F = _), (window.LEFTNAVDATA = Ve.children));
  };
  Kt(() => {
    t(3, (h = re.getConfigValue('settings.responsiveNavigation') === 'semiCollapsible')),
      t(22, (X = re.getConfigValue('navigation.addNavHrefs'))),
      t(1, (o = re.getConfigBooleanValue('settings.hideNavigation'))),
      t(21, (O = re.getConfigBooleanValue('settings.sideNavCompactMode'))),
      t(8, (C = Te.loadExpandedCategories())),
      Fn.doOnStoreChange(
        j,
        () => {
          t(2, (c = re.getConfigValue('settings.sideNavFooterText')));
        },
        ['settings.footer']
      );
    let te = di.initial();
    t(5, (v = te.isSemiCollapsed)),
      t(37, (g = te.semiCollapsible)),
      di.onValueChanged(Ve => {
        t(5, (v = Ve.isSemiCollapsed));
      }),
      Pn.addEventListener('message', Ve => {
        Ve.data.msg === 'luigi.navigation.update-badge-counters' && Q();
      });
  }),
    On(() => {
      (!F || F != _) && Q(),
        t(21, (O = re.getConfigBooleanValue('settings.sideNavCompactMode'))),
        t(3, (h = re.getConfigValue('settings.responsiveNavigation') === 'semiCollapsible'));
    });
  let { sortedChildrenEntries: ce } = e;
  function Ce(te) {
    return Te.renderIconClassName(te);
  }
  function H(te) {
    return Te.isOpenUIiconName(te);
  }
  function ae(te) {
    return te.testId ? te.testId : Te.prepareForTests(te.pathSegment, te.label);
  }
  function $(te) {
    return pe.getNodeHref(te, p);
  }
  function K(te, Ve) {
    return te && te.testId ? te.testId : Te.prepareForTests(Ve || te.label);
  }
  async function le(te, Ve) {
    const gt = pe.mapPathToNode(it.getCurrentPath(), Ve),
      Pt = (await Mt.extractDataFromPath(gt)).pathData.pathParams;
    return pe.substituteDynamicParamsInObject(te, Pt);
  }
  function ve(te, Ve) {
    return Te.generateTooltipText(te, Ve);
  }
  function ue(te) {
    r('handleClick', { node: te });
  }
  function x(te, Ve) {
    if (di.getCollapsed()) {
      let gt,
        yt = document.getElementsByClassName('fd-app__sidebar')[0];
      if (
        (te.metaInfo && te.metaInfo.label
          ? (gt = te.metaInfo.label)
          : (gt = (te.category && te.category.label) || te.category),
        yt.classList.contains('isBlocked') || (yt.className += ' isBlocked'),
        gt === y)
      ) {
        t(7, (y = di.closePopupMenu(y)));
        return;
      }
      t(7, (y = gt)), be(Ve);
    }
  }
  function be(te) {
    const Ve = te.closest('.fd-nested-list__item'),
      gt = Ve.offsetTop,
      yt = Mn.getShellbar().offsetHeight;
    let Pt;
    Mn.isCustomLuigiContainer() ? (Pt = Mn.getCustomLuigiContainer().clientHeight) : (Pt = window.innerHeight),
      setTimeout(() => {
        const wt = Ve.getElementsByClassName('lui-flyout-sublist')[0],
          an = te.closest('.lui-fd-side-nav-wrapper').scrollTop,
          Nn = gt + yt - an,
          ri = Pt - gt - Ve.offsetHeight + an - yt;
        Nn + wt.offsetHeight >= Pt
          ? ((wt.style.bottom = ri + 'px'), (wt.className += ' has-bottom-position'))
          : (wt.style.top = Nn - yt + 'px');
      });
  }
  function ke() {
    if (g) {
      let te = di.onResize(y);
      t(5, (v = te.isSemiCollapsed)), t(7, (y = te.selectedCategory));
    }
  }
  function we(te) {
    if (te.code === 'ArrowRight') {
      const gt = Ie.getCurrentMicrofrontendIframe();
      gt && gt.contentWindow && gt.contentWindow.focus();
    }
  }
  function ie(te) {
    let Ve = L ? L.parent : void 0;
    for (; Ve; ) {
      if (Ve.pathSegment && Ve.pathSegment.trim().indexOf(':') !== 0) {
        r('handleClick', { node: Ve });
        return;
      }
      Ve = Ve.parent;
    }
    console.warn('Could not resolve "up"-node, redirecting to root'), C_.navigate('/');
  }
  function Re(te, Ve) {
    di.getCollapsed() || t(8, (C = Te.storeExpandedState(te.metaInfo.categoryUid, Ve, N)));
  }
  function Le() {
    t(7, (y = di.closePopupMenu(y)));
  }
  function _e(te) {
    te && te.code === 'Escape' && Le();
  }
  function tt() {
    t(5, (v = di.buttonClicked())),
      document.getElementsByClassName('fd-tabs').length > 0 && r('resizeTabNav', {}),
      Un();
  }
  function Ft(te) {
    const Ve = te.code;
    (Ve === 'Enter' || Ve === 'Space') && tt();
  }
  function Jt(te, Ve) {
    (te.code === 'Enter' || te === 'Space') && x(Ve, te.currentTarget);
  }
  function Rt(te, Ve) {
    te.keyCode === pi && Te.handleNavAnchorClickedWithoutMetaKey(te) && ue(Ve);
  }
  function Un() {
    if (!Te.getBurgerTooltipConfig()) return;
    const [te, Ve] = Te.getBurgerTooltipConfig(),
      gt = document.body.classList.contains('lui-semiCollapsible');
    te && Ve && gt && t(10, (D = document.body.classList.contains('semiCollapsed') ? te : Ve));
  }
  function Bi(te, Ve) {
    return pn(te, Ve)
      ? te.metaInfo.titleCollapseButton
        ? n(te.metaInfo.titleCollapseButton)
        : void 0
      : te.metaInfo.titleExpandButton
      ? n(te.metaInfo.titleExpandButton)
      : void 0;
  }
  const zt = (te, Ve) => {
      Te.handleNavAnchorClickedWithoutMetaKey(Ve) && ue(te);
    },
    bi = (te, Ve) => Rt(Ve, te),
    Wi = te => Re(te, !pn(te, C)),
    $t = te => Re(te, !pn(te, C)),
    jt = (te, Ve) => Jt(Ve, te),
    Xn = (te, Ve) => {
      Te.handleNavAnchorClickedWithoutMetaKey(Ve) && ue(te);
    },
    dt = (te, Ve) => Rt(Ve, te),
    dn = (te, Ve) => {
      Te.handleNavAnchorClickedWithoutMetaKey(Ve) && ue(te);
    },
    $n = (te, Ve) => Rt(Ve, te),
    tn = te => x(te, event.currentTarget),
    nn = (te, Ve) => {
      Te.handleNavAnchorClickedWithoutMetaKey(Ve) && ue(te);
    },
    Bn = (te, Ve) => Rt(Ve, te),
    vi = te => tt(),
    ln = te => Ft(te);
  return (
    (i.$$set = te => {
      'children' in te && t(0, (s = te.children)),
        'hideNavComponent' in te && t(1, (o = te.hideNavComponent)),
        'footerText' in te && t(2, (c = te.footerText)),
        'semiCollapsible' in te && t(37, (g = te.semiCollapsible)),
        'semiCollapsibleButton' in te && t(3, (h = te.semiCollapsibleButton)),
        'pathData' in te && t(4, (_ = te.pathData)),
        'pathParams' in te && t(40, (p = te.pathParams)),
        'virtualGroupPrefix' in te && t(13, (m = te.virtualGroupPrefix)),
        'isSemiCollapsed' in te && t(5, (v = te.isSemiCollapsed)),
        'selectedNode' in te && t(6, (k = te.selectedNode)),
        'selectedCategory' in te && t(7, (y = te.selectedCategory)),
        'expandedCategories' in te && t(8, (C = te.expandedCategories)),
        'hasCategoriesWithIcon' in te && t(9, (T = te.hasCategoriesWithIcon)),
        'sideNavAccordionMode' in te && t(38, (N = te.sideNavAccordionMode)),
        'burgerTooltip' in te && t(10, (D = te.burgerTooltip)),
        'navHeader' in te && t(11, (I = te.navHeader)),
        'navParentNode' in te && t(39, (L = te.navParentNode)),
        'sortedChildrenEntries' in te && t(12, (ce = te.sortedChildrenEntries));
    }),
    (i.$$.update = () => {
      if (i.$$.dirty[0] & 1 && s) {
        const te = Object.entries(s);
        te.sort((Ve, gt) => Ve[1].metaInfo.order - gt[1].metaInfo.order), t(12, (ce = te));
      }
    }),
    [
      s,
      o,
      c,
      h,
      _,
      v,
      k,
      y,
      C,
      T,
      D,
      I,
      ce,
      m,
      ue,
      x,
      ke,
      we,
      ie,
      Re,
      Le,
      O,
      X,
      n,
      fe,
      Ce,
      H,
      ae,
      $,
      K,
      ve,
      _e,
      tt,
      Ft,
      Jt,
      Rt,
      Bi,
      g,
      N,
      L,
      p,
      be,
      zt,
      bi,
      Wi,
      $t,
      jt,
      Xn,
      dt,
      dn,
      $n,
      tn,
      nn,
      Bn,
      vi,
      ln
    ]
  );
}
class Lk extends At {
  constructor(e) {
    super(),
      Lt(
        this,
        e,
        Tk,
        Nk,
        It,
        {
          children: 0,
          hideNavComponent: 1,
          footerText: 2,
          semiCollapsible: 37,
          semiCollapsibleButton: 3,
          pathData: 4,
          pathParams: 40,
          virtualGroupPrefix: 13,
          isSemiCollapsed: 5,
          selectedNode: 6,
          selectedCategory: 7,
          expandedCategories: 8,
          hasCategoriesWithIcon: 9,
          sideNavAccordionMode: 38,
          burgerTooltip: 10,
          navHeader: 11,
          navParentNode: 39,
          sortedChildrenEntries: 12,
          handleClick: 14,
          handleIconClick: 15,
          calculateFlyoutPosition: 41,
          onResize: 16,
          handleKey: 17,
          handleUp: 18,
          setExpandedState: 19,
          closePopupMenu: 20
        },
        null,
        [-1, -1, -1]
      );
  }
  get handleClick() {
    return this.$$.ctx[14];
  }
  get handleIconClick() {
    return this.$$.ctx[15];
  }
  get calculateFlyoutPosition() {
    return this.$$.ctx[41];
  }
  get onResize() {
    return this.$$.ctx[16];
  }
  get handleKey() {
    return this.$$.ctx[17];
  }
  get handleUp() {
    return this.$$.ctx[18];
  }
  get setExpandedState() {
    return this.$$.ctx[19];
  }
  get closePopupMenu() {
    return this.$$.ctx[20];
  }
}
const Ak = i => {
    Fn.doOnStoreChange(
      i.store,
      () => {
        const e = re.getConfigValue('navigation.appSwitcher');
        return (
          e &&
            (i.set({ appSwitcherItems: e.items }),
            i.set({ showMainAppEntry: e.showMainAppEntry }),
            i.set({ itemRenderer: e.itemRenderer })),
          i.set({
            hasApps: i.get().showMainAppEntry || (i.get().appSwitcherItems && i.get().appSwitcherItems.length > 0)
          }),
          re.getConfigValueAsync('settings.header').then(t => {
            if (
              (t && (i.set({ defaultTitle: t.title || '' }), i.set({ defaultSubTitle: t.subTitle || '' })), I_(i), !t)
            )
              return;
            const n = Boolean(t.logo);
            if (
              (i.set({ hasLogo: n }),
              setTimeout(() => {
                n && i.get().logo && ((i.get().logo.src = t.logo), t.altText && (i.get().logo.alt = t.altText));
              }),
              t.favicon)
            ) {
              !t.favicon.split('?')[0].endsWith('.ico') &&
                !t.favicon.startsWith('data:image') &&
                console.warn('Favicon is not an .ico filetype and might get displayed wrong.');
              const r = Object.assign(document.createElement('link'), {
                  type: 'image/x-icon',
                  rel: 'shortcut icon',
                  href: t.favicon
                }),
                s = document.getElementsByTagName('head')[0];
              for (const o of s.childNodes) o.rel === 'shortcut icon' && o.remove();
              s.appendChild(r);
            }
          })
        );
      },
      ['settings.header']
    );
  },
  Rk = (i, e, t) => !!(i === e || (e.startsWith(':') && t && t[e.substr(1)] === i)),
  I_ = i => {
    const e = i.get().appSwitcherItems,
      t = i.get().pathData,
      n = i.get().pathParams;
    let l;
    e &&
      t &&
      [...e]
        .sort((c, g) => (g.link || '').localeCompare(c.link || ''))
        .some(c => {
          let g = !0;
          return (
            ee
              .trimTrailingSlash(ee.trimLeadingSlash(c.link))
              .split('/')
              .forEach((h, _) => {
                g && (_ + 1 >= t.length || !t[_ + 1].pathSegment || !Rk(h, t[_ + 1].pathSegment, n)) && (g = !1);
              }),
            g && (l = c),
            g
          );
        }),
      i.set({ selectedItem: l });
    const r = l && l.title ? l.title : i.get().defaultTitle,
      s = Xr.getDocumentTitle() || r;
    i.set({ title: r }), (document.title = ht.getTranslation(s));
    const o = l ? l.subTitle || '' : i.get().defaultSubTitle;
    i.set({ subTitle: o });
  };
function ud(i, e, t) {
  const n = i.slice();
  return (n[43] = e[t]), (n[45] = t), n;
}
function fd(i, e, t) {
  const n = i.slice();
  return (n[43] = e[t]), n;
}
function Ek(i) {
  let e,
    t,
    n,
    l,
    r = i[1] && cd(i);
  return {
    c() {
      (e = S('span')),
        r && r.c(),
        f(
          e,
          'class',
          (t =
            'fd-shellbar__logo ' +
            (i[1] ? '' : 'fd-shellbar__logo--image-replaced') +
            ' ' +
            (i[1] ? 'lui-customlogo' : '') +
            ' svelte-sikqr4')
        ),
        f(e, 'aria-label', i[2]),
        f(e, 'role', 'button'),
        f(e, 'tabindex', '0');
    },
    m(s, o) {
      R(s, e, o), r && r.m(e, null), n || ((l = ne(e, 'click', i[29])), (n = !0));
    },
    p(s, o) {
      s[1] ? (r ? r.p(s, o) : ((r = cd(s)), r.c(), r.m(e, null))) : r && (r.d(1), (r = null)),
        o[0] & 2 &&
          t !==
            (t =
              'fd-shellbar__logo ' +
              (s[1] ? '' : 'fd-shellbar__logo--image-replaced') +
              ' ' +
              (s[1] ? 'lui-customlogo' : '') +
              ' svelte-sikqr4') &&
          f(e, 'class', t),
        o[0] & 4 && f(e, 'aria-label', s[2]);
    },
    d(s) {
      s && A(e), r && r.d(), (n = !1), l();
    }
  };
}
function Dk(i) {
  let e,
    t,
    n,
    l,
    r = i[1] && dd(i);
  return {
    c() {
      (e = S('a')),
        r && r.c(),
        f(
          e,
          'class',
          (t =
            'fd-shellbar__logo ' +
            (i[1] ? '' : 'fd-shellbar__logo--image-replaced') +
            ' ' +
            (i[1] ? 'lui-customlogo' : '') +
            ' svelte-sikqr4')
        ),
        f(e, 'aria-label', i[2]),
        f(e, 'href', '/'),
        f(e, 'role', 'button'),
        f(e, 'tabindex', '0');
    },
    m(s, o) {
      R(s, e, o), r && r.m(e, null), n || ((l = ne(e, 'click', i[27])), (n = !0));
    },
    p(s, o) {
      s[1] ? (r ? r.p(s, o) : ((r = dd(s)), r.c(), r.m(e, null))) : r && (r.d(1), (r = null)),
        o[0] & 2 &&
          t !==
            (t =
              'fd-shellbar__logo ' +
              (s[1] ? '' : 'fd-shellbar__logo--image-replaced') +
              ' ' +
              (s[1] ? 'lui-customlogo' : '') +
              ' svelte-sikqr4') &&
          f(e, 'class', t),
        o[0] & 4 && f(e, 'aria-label', s[2]);
    },
    d(s) {
      s && A(e), r && r.d(), (n = !1), l();
    }
  };
}
function cd(i) {
  let e;
  return {
    c() {
      (e = S('img')), f(e, 'data-testid', 'luigi-topnav-logo'), f(e, 'alt', i[2]), f(e, 'class', 'svelte-sikqr4');
    },
    m(t, n) {
      R(t, e, n), i[28](e);
    },
    p(t, n) {
      n[0] & 4 && f(e, 'alt', t[2]);
    },
    d(t) {
      t && A(e), i[28](null);
    }
  };
}
function dd(i) {
  let e;
  return {
    c() {
      (e = S('img')), f(e, 'data-testid', 'luigi-topnav-logo'), f(e, 'alt', i[2]), f(e, 'class', 'svelte-sikqr4');
    },
    m(t, n) {
      R(t, e, n), i[26](e);
    },
    p(t, n) {
      n[0] & 4 && f(e, 'alt', t[2]);
    },
    d(t) {
      t && A(e), i[26](null);
    }
  };
}
function hd(i) {
  let e, t;
  function n(o, c) {
    return o[3] ? Vk : Mk;
  }
  let l = n(i),
    r = l(i),
    s = i[10] && Cd(i);
  return {
    c() {
      r.c(), (e = q()), s && s.c(), (t = ye());
    },
    m(o, c) {
      r.m(o, c), R(o, e, c), s && s.m(o, c), R(o, t, c);
    },
    p(o, c) {
      l === (l = n(o)) && r ? r.p(o, c) : (r.d(1), (r = l(o)), r && (r.c(), r.m(e.parentNode, e))),
        o[10] ? (s ? s.p(o, c) : ((s = Cd(o)), s.c(), s.m(t.parentNode, t))) : s && (s.d(1), (s = null));
    },
    d(o) {
      r.d(o), o && A(e), s && s.d(o), o && A(t);
    }
  };
}
function Vk(i) {
  let e, t, n, l, r, s, o, c, g, h;
  function _(y, C) {
    return y[12] ? Fk : Ok;
  }
  let p = _(i),
    m = p(i),
    v = i[4] && i[5] && vd(i),
    k = i[7] && i[7].length > 0 && wd(i);
  return {
    c() {
      (e = S('div')),
        (t = S('div')),
        m.c(),
        (n = q()),
        (l = S('div')),
        (r = S('nav')),
        (s = S('ul')),
        v && v.c(),
        (o = q()),
        k && k.c(),
        f(t, 'class', 'fd-popover__control'),
        f(s, 'class', 'fd-menu__list fd-menu__list--no-shadow'),
        f(r, 'class', 'fd-menu'),
        f(l, 'class', 'fd-popover__body fd-popover__body--left'),
        f(l, 'aria-hidden', (c = !i[11].appSwitcherPopover)),
        f(l, 'id', 'appSwitcherPopover'),
        f(e, 'class', 'fd-popover');
    },
    m(y, C) {
      R(y, e, C),
        w(e, t),
        m.m(t, null),
        w(e, n),
        w(e, l),
        w(l, r),
        w(r, s),
        v && v.m(s, null),
        w(s, o),
        k && k.m(s, null),
        i[36](s),
        g || ((h = ne(t, 'click', Ot(qk))), (g = !0));
    },
    p(y, C) {
      p === (p = _(y)) && m ? m.p(y, C) : (m.d(1), (m = p(y)), m && (m.c(), m.m(t, null))),
        y[4] && y[5] ? (v ? v.p(y, C) : ((v = vd(y)), v.c(), v.m(s, o))) : v && (v.d(1), (v = null)),
        y[7] && y[7].length > 0 ? (k ? k.p(y, C) : ((k = wd(y)), k.c(), k.m(s, null))) : k && (k.d(1), (k = null)),
        C[0] & 2048 && c !== (c = !y[11].appSwitcherPopover) && f(l, 'aria-hidden', c);
    },
    d(y) {
      y && A(e), m.d(), v && v.d(), k && k.d(), i[36](null), (g = !1), h();
    }
  };
}
function Mk(i) {
  let e;
  function t(r, s) {
    return r[12] ? Hk : Wk;
  }
  let n = t(i),
    l = n(i);
  return {
    c() {
      l.c(), (e = ye());
    },
    m(r, s) {
      l.m(r, s), R(r, e, s);
    },
    p(r, s) {
      n === (n = t(r)) && l ? l.p(r, s) : (l.d(1), (l = n(r)), l && (l.c(), l.m(e.parentNode, e)));
    },
    d(r) {
      l.d(r), r && A(e);
    }
  };
}
function Ok(i) {
  let e,
    t,
    n = i[17](i[2]) + '',
    l,
    r,
    s,
    o,
    c,
    g;
  return {
    c() {
      (e = S('button')),
        (t = S('span')),
        (l = Pe(n)),
        (r = q()),
        (s = S('i')),
        f(t, 'class', 'fd-shellbar__title svelte-sikqr4'),
        f(t, 'data-testid', 'luigi-topnav-title'),
        f(s, 'class', 'sap-icon sap-icon--megamenu fd-shellbar__button--icon'),
        f(
          e,
          'class',
          'fd-button fd-button--transparent fd-button--menu fd-shellbar__button fd-shellbar__button--menu lui-app-switch'
        ),
        f(e, 'aria-haspopup', 'true'),
        f(e, 'aria-expanded', (o = i[11].appSwitcherPopover || !1)),
        f(e, 'data-testid', 'app-switcher');
    },
    m(h, _) {
      R(h, e, _), w(e, t), w(t, l), w(e, r), w(e, s), c || ((g = ne(e, 'click', Ot(i[34]))), (c = !0));
    },
    p(h, _) {
      _[0] & 131076 && n !== (n = h[17](h[2]) + '') && Ne(l, n),
        _[0] & 2048 && o !== (o = h[11].appSwitcherPopover || !1) && f(e, 'aria-expanded', o);
    },
    d(h) {
      h && A(e), (c = !1), g();
    }
  };
}
function Fk(i) {
  let e,
    t,
    n,
    l = i[7] && i[7].length === 1 && gd(i),
    r = i[7] && i[7].length > 1 && _d(i),
    s = i[7].length > 1 && !i[5] && bd(i);
  return {
    c() {
      l && l.c(), (e = q()), r && r.c(), (t = q()), s && s.c(), (n = ye());
    },
    m(o, c) {
      l && l.m(o, c), R(o, e, c), r && r.m(o, c), R(o, t, c), s && s.m(o, c), R(o, n, c);
    },
    p(o, c) {
      o[7] && o[7].length === 1
        ? l
          ? l.p(o, c)
          : ((l = gd(o)), l.c(), l.m(e.parentNode, e))
        : l && (l.d(1), (l = null)),
        o[7] && o[7].length > 1
          ? r
            ? r.p(o, c)
            : ((r = _d(o)), r.c(), r.m(t.parentNode, t))
          : r && (r.d(1), (r = null)),
        o[7].length > 1 && !o[5]
          ? s
            ? s.p(o, c)
            : ((s = bd(o)), s.c(), s.m(n.parentNode, n))
          : s && (s.d(1), (s = null));
    },
    d(o) {
      l && l.d(o), o && A(e), r && r.d(o), o && A(t), s && s.d(o), o && A(n);
    }
  };
}
function gd(i) {
  let e,
    t,
    n = i[17](i[7][0].title) + '',
    l,
    r;
  return {
    c() {
      (e = S('a')),
        (t = S('span')),
        (l = Pe(n)),
        f(e, 'href', (r = i[22](i[7][0]))),
        f(e, 'class', 'fd-shellbar__title lui-shellbar-single-app-title svelte-sikqr4');
    },
    m(s, o) {
      R(s, e, o), w(e, t), w(t, l);
    },
    p(s, o) {
      o[0] & 131200 && n !== (n = s[17](s[7][0].title) + '') && Ne(l, n),
        o[0] & 128 && r !== (r = s[22](s[7][0])) && f(e, 'href', r);
    },
    d(s) {
      s && A(e);
    }
  };
}
function _d(i) {
  let e,
    t = i[7],
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = md(fd(i, t, l));
  return {
    c() {
      for (let l = 0; l < n.length; l += 1) n[l].c();
      e = ye();
    },
    m(l, r) {
      for (let s = 0; s < n.length; s += 1) n[s].m(l, r);
      R(l, e, r);
    },
    p(l, r) {
      if (r[0] & 6458020) {
        t = l[7];
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = fd(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = md(o)), n[s].c(), n[s].m(e.parentNode, e));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    d(l) {
      ct(n, l), l && A(e);
    }
  };
}
function pd(i) {
  let e,
    t,
    n = i[17](i[2]) + '',
    l,
    r,
    s,
    o,
    c,
    g,
    h,
    _;
  return {
    c() {
      (e = S('a')),
        (t = S('span')),
        (l = Pe(n)),
        (r = q()),
        (s = S('i')),
        (o = q()),
        f(t, 'class', 'fd-shellbar__title svelte-sikqr4'),
        f(t, 'data-testid', 'luigi-topnav-title'),
        f(s, 'class', 'sap-icon sap-icon--megamenu fd-shellbar__button--icon'),
        f(e, 'href', (c = i[22](i[43]))),
        f(
          e,
          'class',
          'fd-button fd-button--transparent fd-button--menu fd-shellbar__button fd-shellbar__button--menu lui-app-switch'
        ),
        f(e, 'aria-haspopup', 'true'),
        f(e, 'aria-expanded', (g = i[11].appSwitcherPopover || !1)),
        f(e, 'data-testid', 'app-switcher');
    },
    m(p, m) {
      R(p, e, m), w(e, t), w(t, l), w(e, r), w(e, s), w(e, o), h || ((_ = ne(e, 'click', Tt(i[32]))), (h = !0));
    },
    p(p, m) {
      m[0] & 131076 && n !== (n = p[17](p[2]) + '') && Ne(l, n),
        m[0] & 128 && c !== (c = p[22](p[43])) && f(e, 'href', c),
        m[0] & 2048 && g !== (g = p[11].appSwitcherPopover || !1) && f(e, 'aria-expanded', g);
    },
    d(p) {
      p && A(e), (h = !1), _();
    }
  };
}
function md(i) {
  let e = i[43] === i[5] && i[21](i[43], i[9]),
    t,
    n = e && pd(i);
  return {
    c() {
      n && n.c(), (t = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, t, r);
    },
    p(l, r) {
      r[0] & 672 && (e = l[43] === l[5] && l[21](l[43], l[9])),
        e ? (n ? n.p(l, r) : ((n = pd(l)), n.c(), n.m(t.parentNode, t))) : n && (n.d(1), (n = null));
    },
    d(l) {
      n && n.d(l), l && A(t);
    }
  };
}
function bd(i) {
  let e,
    t,
    n = i[17](i[2]) + '',
    l,
    r,
    s,
    o,
    c,
    g;
  return {
    c() {
      (e = S('a')),
        (t = S('span')),
        (l = Pe(n)),
        (r = q()),
        (s = S('i')),
        f(t, 'class', 'fd-shellbar__title svelte-sikqr4'),
        f(t, 'data-testid', 'luigi-topnav-title'),
        f(s, 'class', 'sap-icon sap-icon--megamenu fd-shellbar__button--icon'),
        f(e, 'href', '/'),
        f(
          e,
          'class',
          'fd-button fd-button--transparent fd-button--menu fd-shellbar__button fd-shellbar__button--menu lui-app-switch'
        ),
        f(e, 'aria-haspopup', 'true'),
        f(e, 'aria-expanded', (o = i[11].appSwitcherPopover || !1)),
        f(e, 'data-testid', 'app-switcher');
    },
    m(h, _) {
      R(h, e, _), w(e, t), w(t, l), w(e, r), w(e, s), c || ((g = ne(e, 'click', Tt(i[33]))), (c = !0));
    },
    p(h, _) {
      _[0] & 131076 && n !== (n = h[17](h[2]) + '') && Ne(l, n),
        _[0] & 2048 && o !== (o = h[11].appSwitcherPopover || !1) && f(e, 'aria-expanded', o);
    },
    d(h) {
      h && A(e), (c = !1), g();
    }
  };
}
function vd(i) {
  let e,
    t,
    n,
    l = i[17](i[6]) + '',
    r,
    s,
    o,
    c;
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('span')),
        (r = Pe(l)),
        f(n, 'class', 'fd-menu__title'),
        f(t, 'href', '/'),
        f(t, 'role', 'button'),
        f(t, 'class', 'fd-menu__link'),
        f(t, 'data-testid', (s = i[20](i[6]))),
        f(e, 'class', 'fd-menu__item');
    },
    m(g, h) {
      R(g, e, h), w(e, t), w(t, n), w(n, r), o || ((c = ne(t, 'click', Tt(i[14]))), (o = !0));
    },
    p(g, h) {
      h[0] & 131136 && l !== (l = g[17](g[6]) + '') && Ne(r, l),
        h[0] & 64 && s !== (s = g[20](g[6])) && f(t, 'data-testid', s);
    },
    d(g) {
      g && A(e), (o = !1), c();
    }
  };
}
function wd(i) {
  let e,
    t = i[7],
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = Sd(ud(i, t, l));
  return {
    c() {
      for (let l = 0; l < n.length; l += 1) n[l].c();
      e = ye();
    },
    m(l, r) {
      for (let s = 0; s < n.length; s += 1) n[s].m(l, r);
      R(l, e, r);
    },
    p(l, r) {
      if (r[0] & 8074144) {
        t = l[7];
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = ud(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = Sd(o)), n[s].c(), n[s].m(e.parentNode, e));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    d(l) {
      ct(n, l), l && A(e);
    }
  };
}
function Uk(i) {
  let e,
    t,
    n,
    l = i[17](i[43].title) + '',
    r,
    s,
    o,
    c,
    g,
    h;
  function _(...p) {
    return i[35](i[43], ...p);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('span')),
        (r = Pe(l)),
        (c = q()),
        f(n, 'class', 'fd-menu__title'),
        f(t, 'role', 'button'),
        f(t, 'class', 'fd-menu__link'),
        f(t, 'href', (s = i[12] ? i[22](i[43], i[9]) : void 0)),
        f(t, 'data-testid', (o = i[20](i[43]))),
        f(e, 'class', 'fd-menu__item');
    },
    m(p, m) {
      R(p, e, m), w(e, t), w(t, n), w(n, r), w(e, c), g || ((h = ne(t, 'click', _)), (g = !0));
    },
    p(p, m) {
      (i = p),
        m[0] & 131200 && l !== (l = i[17](i[43].title) + '') && Ne(r, l),
        m[0] & 4736 && s !== (s = i[12] ? i[22](i[43], i[9]) : void 0) && f(t, 'href', s),
        m[0] & 128 && o !== (o = i[20](i[43])) && f(t, 'data-testid', o);
    },
    d(p) {
      p && A(e), (g = !1), h();
    }
  };
}
function Bk(i) {
  let e,
    t = i[16] && kd(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, l) {
      n[16] ? (t ? t.p(n, l) : ((t = kd(n)), t.c(), t.m(e.parentNode, e))) : t && (t.d(1), (t = null));
    },
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function kd(i) {
  let e,
    t,
    n = i[19](i[43], i[16], i[45]) + '',
    l;
  return {
    c() {
      (e = S('li')), (t = new dr(!1)), (l = q()), (t.a = l), f(e, 'class', 'fd-menu__item'), f(e, 'tabindex', '0');
    },
    m(r, s) {
      R(r, e, s), t.m(n, e), w(e, l);
    },
    p(r, s) {
      s[0] & 65664 && n !== (n = r[19](r[43], r[16], r[45]) + '') && t.p(n);
    },
    d(r) {
      r && A(e);
    }
  };
}
function Sd(i) {
  let e, t, n;
  function l(o, c) {
    if ((c[0] & 256 && (e = null), c[0] & 672 && (t = null), e == null && (e = !!ee.isFunction(o[8])), e)) return Bk;
    if ((t == null && (t = !!(o[43] !== o[5] && o[21](o[43], o[9]))), t)) return Uk;
  }
  let r = l(i, [-1, -1]),
    s = r && r(i);
  return {
    c() {
      s && s.c(), (n = ye());
    },
    m(o, c) {
      s && s.m(o, c), R(o, n, c);
    },
    p(o, c) {
      r === (r = l(o, c)) && s ? s.p(o, c) : (s && s.d(1), (s = r && r(o)), s && (s.c(), s.m(n.parentNode, n)));
    },
    d(o) {
      s && s.d(o), o && A(n);
    }
  };
}
function Wk(i) {
  let e,
    t,
    n = i[17](i[2]) + '',
    l,
    r,
    s;
  return {
    c() {
      (e = S('span')),
        (t = S('span')),
        (l = Pe(n)),
        f(e, 'class', 'fd-shellbar__title lui-shellbar-single-app-title svelte-sikqr4'),
        f(e, 'data-testid', 'luigi-topnav-title');
    },
    m(o, c) {
      R(o, e, c), w(e, t), w(t, l), r || ((s = ne(e, 'click', i[31])), (r = !0));
    },
    p(o, c) {
      c[0] & 131076 && n !== (n = o[17](o[2]) + '') && Ne(l, n);
    },
    d(o) {
      o && A(e), (r = !1), s();
    }
  };
}
function Hk(i) {
  let e,
    t,
    n = i[17](i[2]) + '',
    l,
    r,
    s;
  return {
    c() {
      (e = S('a')),
        (t = S('span')),
        (l = Pe(n)),
        f(e, 'class', 'fd-shellbar__title lui-shellbar-single-app-title svelte-sikqr4'),
        f(e, 'data-testid', 'luigi-topnav-title'),
        f(e, 'href', '/');
    },
    m(o, c) {
      R(o, e, c), w(e, t), w(t, l), r || ((s = ne(e, 'click', i[30])), (r = !0));
    },
    p(o, c) {
      c[0] & 131076 && n !== (n = o[17](o[2]) + '') && Ne(l, n);
    },
    d(o) {
      o && A(e), (r = !1), s();
    }
  };
}
function Cd(i) {
  let e,
    t = i[17](i[10]) + '',
    n;
  return {
    c() {
      (e = S('div')), (n = Pe(t)), f(e, 'class', 'fd-shellbar__subtitle svelte-sikqr4');
    },
    m(l, r) {
      R(l, e, r), w(e, n);
    },
    p(l, r) {
      r[0] & 132096 && t !== (t = l[17](l[10]) + '') && Ne(n, t);
    },
    d(l) {
      l && A(e);
    }
  };
}
function zk(i) {
  let e, t;
  function n(o, c) {
    return o[12] ? Dk : Ek;
  }
  let l = n(i),
    r = l(i),
    s = i[2] && hd(i);
  return {
    c() {
      r.c(), (e = q()), s && s.c(), (t = ye());
    },
    m(o, c) {
      r.m(o, c), R(o, e, c), s && s.m(o, c), R(o, t, c);
    },
    p(o, c) {
      l === (l = n(o)) && r ? r.p(o, c) : (r.d(1), (r = l(o)), r && (r.c(), r.m(e.parentNode, e))),
        o[2] ? (s ? s.p(o, c) : ((s = hd(o)), s.c(), s.m(t.parentNode, t))) : s && (s.d(1), (s = null));
    },
    i: Ue,
    o: Ue,
    d(o) {
      r.d(o), o && A(e), s && s.d(o), o && A(t);
    }
  };
}
const qk = () => {};
function Gk(i, e, t) {
  let n;
  const l = Wt();
  let { logo: r } = e,
    { hasLogo: s } = e,
    { title: o } = e,
    { hasApps: c } = e,
    { dropDownStates: g = {} } = e,
    { showMainAppEntry: h } = e,
    { selectedItem: _ } = e,
    { defaultTitle: p } = e,
    { appSwitcherItems: m } = e,
    { itemRenderer: v } = e,
    { pathParams: k } = e,
    { subTitle: y } = e,
    { defaultSubTitle: C } = e,
    { pathData: T } = e,
    { addNavHrefForAnchor: N } = e,
    D,
    I,
    L = vt('getUnsavedChangesModalPromise'),
    M = vt('getTranslation');
  mi(i, M, _e => t(17, (n = _e)));
  let F = vt('store');
  const O = {
      closeDropDown: () => {
        Ce('appSwitcherPopover');
      }
    },
    j = () => ({
      get: () => ({
        pathData: T,
        pathParams: k,
        appSwitcherItems: m,
        itemRenderer: v,
        selectedItem: _,
        defaultTitle: p,
        title: o,
        subTitle: y,
        defaultSubTitle: C,
        showMainAppEntry: h,
        hasApps: c,
        hasLogo: s,
        logo: r
      }),
      set: _e => {
        _e &&
          Object.getOwnPropertyNames(_e).forEach(tt => {
            tt === 'pathData'
              ? t(24, (T = _e.pathData))
              : tt === 'appSwitcherItems'
              ? t(7, (m = _e.appSwitcherItems))
              : tt === 'itemRenderer'
              ? t(8, (v = _e.itemRenderer))
              : tt === 'pathParams'
              ? t(9, (k = _e.pathParams))
              : tt === 'selectedItem'
              ? t(5, (_ = _e.selectedItem))
              : tt === 'title'
              ? t(2, (o = _e.title))
              : tt === 'defaultSubTitle'
              ? t(23, (C = _e.defaultSubTitle))
              : tt === 'subTitle'
              ? t(10, (y = _e.subTitle))
              : tt === 'defaultTitle'
              ? t(6, (p = _e.defaultTitle))
              : tt === 'subTitle'
              ? t(10, (y = _e.subTitle))
              : tt === 'showMainAppEntry'
              ? t(4, (h = _e.showMainAppEntry))
              : tt === 'hasApps'
              ? t(3, (c = _e.hasApps))
              : tt === 'hasLogo' && t(1, (s = _e.hasLogo));
          });
      },
      store: F
    });
  Kt(() => {
    Ak(j());
  }),
    On(() => {
      (!I || I != T) && (I_(j()), (I = T));
    });
  function fe(_e, tt, Ft) {
    return (
      setTimeout(() => {
        tt && v(_e, tt.children[Ft], O);
      }),
      ''
    );
  }
  function X(_e) {
    L().then(() => {
      it.navigateTo(pe.applyPathParams(_e, k));
    });
  }
  function Q() {
    L().then(() => {
      it.navigateTo('/');
    });
  }
  function ce(_e) {
    l('handleClick', { node: _e }), Ce('appSwitcherPopover');
  }
  function Ce(_e) {
    l('toggleDropdownState', { name: _e });
  }
  function H(_e) {
    return _e.testId ? _e.testId : Te.prepareForTests(_e.title || _e);
  }
  function ae(_e, tt) {
    if (_e.link) {
      const Ft = pe.applyPathParams(_e.link, tt);
      if (Ft.indexOf(':') !== 0 && Ft.indexOf('/:') === -1) return !0;
    }
    return !1;
  }
  function $(_e) {
    return pe.getNodeHref(_e);
  }
  function K(_e) {
    xe[_e ? 'unshift' : 'push'](() => {
      (r = _e), t(0, r);
    });
  }
  const le = _e => {
    Te.handleNavAnchorClickedWithoutMetaKey(_e) && X('/');
  };
  function ve(_e) {
    xe[_e ? 'unshift' : 'push'](() => {
      (r = _e), t(0, r);
    });
  }
  const ue = () => X('/'),
    x = _e => {
      Te.handleNavAnchorClickedWithoutMetaKey(_e) && X('/');
    },
    be = () => X('/'),
    ke = () => Ce('appSwitcherPopover'),
    we = () => Ce('appSwitcherPopover'),
    ie = () => Ce('appSwitcherPopover'),
    Re = (_e, tt) => {
      Te.handleNavAnchorClickedWithoutMetaKey(tt) && X(_e.link);
    };
  function Le(_e) {
    xe[_e ? 'unshift' : 'push'](() => {
      (D = _e), t(16, D);
    });
  }
  return (
    (i.$$set = _e => {
      'logo' in _e && t(0, (r = _e.logo)),
        'hasLogo' in _e && t(1, (s = _e.hasLogo)),
        'title' in _e && t(2, (o = _e.title)),
        'hasApps' in _e && t(3, (c = _e.hasApps)),
        'dropDownStates' in _e && t(11, (g = _e.dropDownStates)),
        'showMainAppEntry' in _e && t(4, (h = _e.showMainAppEntry)),
        'selectedItem' in _e && t(5, (_ = _e.selectedItem)),
        'defaultTitle' in _e && t(6, (p = _e.defaultTitle)),
        'appSwitcherItems' in _e && t(7, (m = _e.appSwitcherItems)),
        'itemRenderer' in _e && t(8, (v = _e.itemRenderer)),
        'pathParams' in _e && t(9, (k = _e.pathParams)),
        'subTitle' in _e && t(10, (y = _e.subTitle)),
        'defaultSubTitle' in _e && t(23, (C = _e.defaultSubTitle)),
        'pathData' in _e && t(24, (T = _e.pathData)),
        'addNavHrefForAnchor' in _e && t(12, (N = _e.addNavHrefForAnchor));
    }),
    [
      r,
      s,
      o,
      c,
      h,
      _,
      p,
      m,
      v,
      k,
      y,
      g,
      N,
      X,
      Q,
      Ce,
      D,
      n,
      M,
      fe,
      H,
      ae,
      $,
      C,
      T,
      ce,
      K,
      le,
      ve,
      ue,
      x,
      be,
      ke,
      we,
      ie,
      Re,
      Le
    ]
  );
}
class Kk extends At {
  constructor(e) {
    super(),
      Lt(
        this,
        e,
        Gk,
        zk,
        It,
        {
          logo: 0,
          hasLogo: 1,
          title: 2,
          hasApps: 3,
          dropDownStates: 11,
          showMainAppEntry: 4,
          selectedItem: 5,
          defaultTitle: 6,
          appSwitcherItems: 7,
          itemRenderer: 8,
          pathParams: 9,
          subTitle: 10,
          defaultSubTitle: 23,
          pathData: 24,
          addNavHrefForAnchor: 12,
          goTo: 13,
          goToRoot: 14,
          handleClick: 25,
          toggleDropdownState: 15
        },
        null,
        [-1, -1]
      );
  }
  get goTo() {
    return this.$$.ctx[13];
  }
  get goToRoot() {
    return this.$$.ctx[14];
  }
  get handleClick() {
    return this.$$.ctx[25];
  }
  get toggleDropdownState() {
    return this.$$.ctx[15];
  }
}
function yd(i, e, t) {
  const n = i.slice();
  return (n[34] = e[t]), n;
}
function Pd(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o = i[0] && Nd(i),
    c = (i[10] || i[11]) && Dd(i);
  return {
    c() {
      (e = S('div')),
        o && o.c(),
        (t = q()),
        (n = S('div')),
        (l = S('div')),
        (r = S('div')),
        (s = S('div')),
        c && c.c(),
        f(e, 'class', 'fd-user-menu__body lui-user-menu-fiori svelte-x3xwcc'),
        f(s, 'class', 'fd-bar__element'),
        f(r, 'class', 'fd-bar__right'),
        f(l, 'class', 'fd-bar fd-bar--footer'),
        f(n, 'class', 'fd-popover__body-footer');
    },
    m(g, h) {
      R(g, e, h), o && o.m(e, null), R(g, t, h), R(g, n, h), w(n, l), w(l, r), w(r, s), c && c.m(s, null);
    },
    p(g, h) {
      g[0] ? (o ? o.p(g, h) : ((o = Nd(g)), o.c(), o.m(e, null))) : o && (o.d(1), (o = null)),
        g[10] || g[11] ? (c ? c.p(g, h) : ((c = Dd(g)), c.c(), c.m(s, null))) : c && (c.d(1), (c = null));
    },
    d(g) {
      g && A(e), o && o.d(), g && A(t), g && A(n), c && c.d();
    }
  };
}
function Nd(i) {
  let e, t, n, l, r, s, o;
  function c(y, C) {
    return y[7].picture ? jk : Jk;
  }
  let g = c(i),
    h = g(i),
    _ = i[7].name && Id(i),
    p = i[7].description && Td(i),
    m = i[9].items,
    v = [];
  for (let y = 0; y < m.length; y += 1) v[y] = Ad(yd(i, m, y));
  let k = i[12] && Rd(i);
  return {
    c() {
      (e = S('div')), h.c(), (t = q()), (n = S('div')), _ && _.c(), (l = q()), p && p.c(), (r = q()), (s = S('ul'));
      for (let y = 0; y < v.length; y += 1) v[y].c();
      (o = q()),
        k && k.c(),
        f(e, 'class', 'fd-user-menu__header'),
        f(n, 'class', 'fd-user-menu__subheader'),
        f(s, 'class', 'fd-list fd-list--compact fd-list--navigation fd-list--navigation-indication fd-list--no-border'),
        f(s, 'role', 'list');
    },
    m(y, C) {
      R(y, e, C),
        h.m(e, null),
        R(y, t, C),
        R(y, n, C),
        _ && _.m(n, null),
        w(n, l),
        p && p.m(n, null),
        R(y, r, C),
        R(y, s, C);
      for (let T = 0; T < v.length; T += 1) v[T].m(s, null);
      w(s, o), k && k.m(s, null);
    },
    p(y, C) {
      if (
        (g === (g = c(y)) && h ? h.p(y, C) : (h.d(1), (h = g(y)), h && (h.c(), h.m(e, null))),
        y[7].name ? (_ ? _.p(y, C) : ((_ = Id(y)), _.c(), _.m(n, l))) : _ && (_.d(1), (_ = null)),
        y[7].description ? (p ? p.p(y, C) : ((p = Td(y)), p.c(), p.m(n, null))) : p && (p.d(1), (p = null)),
        C[0] & 991884)
      ) {
        m = y[9].items;
        let T;
        for (T = 0; T < m.length; T += 1) {
          const N = yd(y, m, T);
          v[T] ? v[T].p(N, C) : ((v[T] = Ad(N)), v[T].c(), v[T].m(s, o));
        }
        for (; T < v.length; T += 1) v[T].d(1);
        v.length = m.length;
      }
      y[12] ? (k ? k.p(y, C) : ((k = Rd(y)), k.c(), k.m(s, null))) : k && (k.d(1), (k = null));
    },
    d(y) {
      y && A(e), h.d(), y && A(t), y && A(n), _ && _.d(), p && p.d(), y && A(r), y && A(s), ct(v, y), k && k.d();
    }
  };
}
function Jk(i) {
  let e,
    t = (i[7].initials ? i[7].initials : '') + '',
    n;
  return {
    c() {
      (e = S('span')),
        (n = Pe(t)),
        f(e, 'class', 'fd-avatar fd-avatar--xl fd-avatar--circle fd-avatar--thumbnail fd-user-menu__avatar'),
        f(e, 'aria-label', 'Avatar');
    },
    m(l, r) {
      R(l, e, r), w(e, n);
    },
    p(l, r) {
      r[0] & 128 && t !== (t = (l[7].initials ? l[7].initials : '') + '') && Ne(n, t);
    },
    d(l) {
      l && A(e);
    }
  };
}
function jk(i) {
  let e;
  return {
    c() {
      (e = S('span')),
        f(e, 'class', 'fd-avatar fd-avatar--xl fd-avatar--circle fd-avatar--thumbnail fd-user-menu__avatar'),
        f(e, 'aria-label', 'Avatar'),
        f(e, 'data-testid', 'luigi-topnav-profile-avatar'),
        li(e, 'background-image', "url('" + i[7].picture + "')");
    },
    m(t, n) {
      R(t, e, n);
    },
    p(t, n) {
      n[0] & 128 && li(e, 'background-image', "url('" + t[7].picture + "')");
    },
    d(t) {
      t && A(e);
    }
  };
}
function Id(i) {
  let e,
    t = i[7].name + '',
    n;
  return {
    c() {
      (e = S('div')),
        (n = Pe(t)),
        f(e, 'class', 'fd-user-menu__user-name svelte-x3xwcc'),
        f(e, 'id', 'username'),
        f(e, 'data-testid', 'luigi-topnav-profile-username');
    },
    m(l, r) {
      R(l, e, r), w(e, n);
    },
    p(l, r) {
      r[0] & 128 && t !== (t = l[7].name + '') && Ne(n, t);
    },
    d(l) {
      l && A(e);
    }
  };
}
function Td(i) {
  let e,
    t = i[7].description + '',
    n;
  return {
    c() {
      (e = S('div')),
        (n = Pe(t)),
        f(e, 'class', 'fd-user-menu__user-role svelte-x3xwcc'),
        f(e, 'data-testid', 'luigi-topnav-profile-description');
    },
    m(l, r) {
      R(l, e, r), w(e, n);
    },
    p(l, r) {
      r[0] & 128 && t !== (t = l[7].description + '') && Ne(n, t);
    },
    d(l) {
      l && A(e);
    }
  };
}
function Ld(i) {
  let e, t;
  function n(s, o) {
    return o[0] & 512 && (e = null), e == null && (e = !!s[17](s[34])), e ? Qk : Yk;
  }
  let l = n(i, [-1, -1]),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function Yk(i) {
  let e, t;
  return {
    c() {
      (e = S('img')),
        f(e, 'class', 'fd-top-nav__icon nav-icon svelte-x3xwcc'),
        li(e, 'background-image', "url('" + i[7].icon + "')"),
        f(e, 'alt', (t = i[34].altText ? i[34].altText : ''));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 128 && li(e, 'background-image', "url('" + n[7].icon + "')"),
        l[0] & 512 && t !== (t = n[34].altText ? n[34].altText : '') && f(e, 'alt', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Qk(i) {
  let e, t;
  return {
    c() {
      (e = S('i')),
        f(e, 'role', 'presentation'),
        f(e, 'class', (t = 'fd-list__icon ' + i[16](i[34].icon) + ' svelte-x3xwcc'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 512 && t !== (t = 'fd-list__icon ' + n[16](n[34].icon) + ' svelte-x3xwcc') && f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Ad(i) {
  let e,
    t,
    n,
    l,
    r = i[13](i[34].label) + '',
    s,
    o,
    c,
    g,
    h,
    _ = i[34].icon && Ld(i);
  function p() {
    return i[24](i[34]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        _ && _.c(),
        (n = q()),
        (l = S('span')),
        (s = Pe(r)),
        f(l, 'class', 'fd-list__title svelte-x3xwcc'),
        f(t, 'tabindex', '0'),
        f(t, 'class', 'fd-list__link'),
        f(t, 'data-testid', 'luigi-topnav-profile-item'),
        f(t, 'href', (o = i[2] ? i[19](i[34]) : void 0)),
        f(e, 'tabindex', '-1'),
        f(e, 'role', 'listitem'),
        f(e, 'class', 'fd-list__item fd-list__item--link'),
        f(e, 'data-testid', (c = i[18](i[34])));
    },
    m(m, v) {
      R(m, e, v),
        w(e, t),
        _ && _.m(t, null),
        w(t, n),
        w(t, l),
        w(l, s),
        g || ((h = [ne(t, 'click', i[23]), ne(e, 'click', p)]), (g = !0));
    },
    p(m, v) {
      (i = m),
        i[34].icon ? (_ ? _.p(i, v) : ((_ = Ld(i)), _.c(), _.m(t, n))) : _ && (_.d(1), (_ = null)),
        v[0] & 8704 && r !== (r = i[13](i[34].label) + '') && Ne(s, r),
        v[0] & 516 && o !== (o = i[2] ? i[19](i[34]) : void 0) && f(t, 'href', o),
        v[0] & 512 && c !== (c = i[18](i[34])) && f(e, 'data-testid', c);
    },
    d(m) {
      m && A(e), _ && _.d(), (g = !1), Ze(h);
    }
  };
}
function Rd(i) {
  let e,
    t,
    n,
    l,
    r = i[13](i[9].settings.label) + '',
    s,
    o,
    c,
    g = i[9].settings.icon && Ed(i);
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        g && g.c(),
        (n = q()),
        (l = S('span')),
        (s = Pe(r)),
        f(l, 'class', 'fd-list__title svelte-x3xwcc'),
        f(t, 'tabindex', '0'),
        f(t, 'class', 'fd-list__link'),
        f(t, 'title', 'User Settings'),
        f(t, 'data-testid', 'settings-link'),
        f(e, 'tabindex', '-1'),
        f(e, 'role', 'listitem'),
        f(e, 'class', 'fd-list__item fd-list__item--link lui-anchor-node');
    },
    m(h, _) {
      R(h, e, _),
        w(e, t),
        g && g.m(t, null),
        w(t, n),
        w(t, l),
        w(l, s),
        o || ((c = [ne(e, 'click', Tt(i[5])), ne(e, 'keyup', i[25])]), (o = !0));
    },
    p(h, _) {
      h[9].settings.icon ? (g ? g.p(h, _) : ((g = Ed(h)), g.c(), g.m(t, n))) : g && (g.d(1), (g = null)),
        _[0] & 8704 && r !== (r = h[13](h[9].settings.label) + '') && Ne(s, r);
    },
    d(h) {
      h && A(e), g && g.d(), (o = !1), Ze(c);
    }
  };
}
function Ed(i) {
  let e, t;
  function n(s, o) {
    return o[0] & 512 && (e = null), e == null && (e = !!s[17](s[9].settings)), e ? Xk : Zk;
  }
  let l = n(i, [-1, -1]),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function Zk(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')),
        f(e, 'class', 'fd-top-nav__icon nav-icon svelte-x3xwcc'),
        rt(e.src, (t = i[9].settings.icon)) || f(e, 'src', t),
        f(e, 'alt', (n = i[9].settings.altText ? i[9].settings.altText : ''));
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r[0] & 512 && !rt(e.src, (t = l[9].settings.icon)) && f(e, 'src', t),
        r[0] & 512 && n !== (n = l[9].settings.altText ? l[9].settings.altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function Xk(i) {
  let e, t;
  return {
    c() {
      (e = S('i')),
        f(e, 'role', 'presentation'),
        f(e, 'class', (t = 'fd-list__icon ' + i[16](i[9].settings.icon) + ' svelte-x3xwcc'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 512 && t !== (t = 'fd-list__icon ' + n[16](n[9].settings.icon) + ' svelte-x3xwcc') && f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Dd(i) {
  let e,
    t,
    n = (i[8] || (!i[10] && i[11])) && Vd(i),
    l = i[10] && !i[8] && Md(i);
  return {
    c() {
      n && n.c(), (e = q()), l && l.c(), (t = ye());
    },
    m(r, s) {
      n && n.m(r, s), R(r, e, s), l && l.m(r, s), R(r, t, s);
    },
    p(r, s) {
      r[8] || (!r[10] && r[11])
        ? n
          ? n.p(r, s)
          : ((n = Vd(r)), n.c(), n.m(e.parentNode, e))
        : n && (n.d(1), (n = null)),
        r[10] && !r[8] ? (l ? l.p(r, s) : ((l = Md(r)), l.c(), l.m(t.parentNode, t))) : l && (l.d(1), (l = null));
    },
    d(r) {
      n && n.d(r), r && A(e), l && l.d(r), r && A(t);
    }
  };
}
function Vd(i) {
  let e,
    t,
    n = i[13](i[9].logout.label) + '',
    l,
    r,
    s,
    o;
  return {
    c() {
      (e = S('div')),
        (t = S('button')),
        (l = Pe(n)),
        f(t, 'class', 'fd-button fd-button--transparent fd-button--compact'),
        f(t, 'tabindex', '0'),
        f(t, 'data-testid', 'logout-btn'),
        f(e, 'class', 'fd-bar__element'),
        f(e, 'data-testid', (r = i[18](i[9].logout)));
    },
    m(c, g) {
      R(c, e, g), w(e, t), w(t, l), s || ((o = ne(t, 'click', i[4])), (s = !0));
    },
    p(c, g) {
      g[0] & 8704 && n !== (n = c[13](c[9].logout.label) + '') && Ne(l, n),
        g[0] & 512 && r !== (r = c[18](c[9].logout)) && f(e, 'data-testid', r);
    },
    d(c) {
      c && A(e), (s = !1), o();
    }
  };
}
function Md(i) {
  let e, t, n, l, r;
  return {
    c() {
      (e = S('button')),
        (e.textContent = 'Login'),
        (t = q()),
        (n = S('button')),
        (n.textContent = 'Login'),
        f(e, 'class', 'fd-button fd-button--transparent fd-button--compact'),
        f(e, 'tabindex', '0'),
        f(e, 'data-testid', 'login-btn'),
        f(n, 'class', 'fd-button fd-button--transparent fd-button--compact'),
        f(n, 'tabindex', '0'),
        f(n, 'data-testid', 'login-btn');
    },
    m(s, o) {
      R(s, e, o), R(s, t, o), R(s, n, o), l || ((r = [ne(e, 'click', i[15]), ne(n, 'click', i[15])]), (l = !0));
    },
    p: Ue,
    d(s) {
      s && A(e), s && A(t), s && A(n), (l = !1), Ze(r);
    }
  };
}
function $k(i) {
  let e,
    t = !i[1] && Pd(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, l) {
      n[1] ? t && (t.d(1), (t = null)) : t ? t.p(n, l) : ((t = Pd(n)), t.c(), t.m(e.parentNode, e));
    },
    i: Ue,
    o: Ue,
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function xk(i, e, t) {
  let n;
  const l = Wt();
  let { isHidden: r = !1 } = e,
    { addNavHrefForAnchor: s } = e,
    o,
    c,
    g = { logout: {}, items: [], settings: {} },
    h,
    _,
    p,
    m,
    v,
    k = vt('store'),
    y = vt('getTranslation');
  mi(i, y, K => t(13, (n = K)));
  let C = vt('getUnsavedChangesModalPromise'),
    T = vt('openViewInModal');
  Kt(async () => {
    gi.isAuthorizationEnabled() ? t(10, (h = !0)) : (t(10, (h = !1)), O()),
      F(),
      en.getLoggedInStore().subscribe(K => {
        t(8, (c = K));
      }),
      en.getUserInfoStore().subscribe(K => {
        t(7, (o = K)), l('userInfoUpdated', o);
      });
  });
  function N() {
    en.startAuthorization();
  }
  function D(K) {
    return Te.renderIconClassName(K);
  }
  function I(K) {
    return Te.isOpenUIiconName(K.icon);
  }
  function L(K) {
    return K.testId ? K.testId : Te.prepareForTests(K.label);
  }
  function M(K) {
    return pe.getNodeHref(K);
  }
  function F() {
    m ||
      (Fn.doOnStoreChange(
        k,
        async () => {
          const K = await re.getConfigValueAsync('navigation.profile.logout'),
            le = await re.getConfigValueAsync('userSettings'),
            ve = le || (await re.getConfigValueAsync('settings.userSettings')),
            ue = { items: (await re.getConfigValueAsync('navigation.profile.items')) || [] };
          if (Boolean(ve)) {
            const x = ve.userSettingsProfileMenuEntry;
            ue.settings = { ...ul.userSettingsProfileMenuEntry, ...x };
          }
          (ue.logout = { ...ul.logout, ...K }),
            t(11, (_ = Boolean(K))),
            (v = !1),
            en.setProfileLogoutFn(null),
            K && ee.isFunction(K.customLogoutFn) && ((v = !0), en.setProfileLogoutFn(K.customLogoutFn)),
            t(9, (g = ue)),
            t(12, (p = Boolean(ve)));
        },
        ['navigation.profile']
      ),
      (m = !0));
  }
  async function O() {
    const K = await re.getConfigValueAsync('navigation.profile.staticUserInfoFn');
    K && (en.setUserInfo(o), t(7, (o = K)), l('userInfoUpdated', o));
  }
  function j(K) {
    C().then(() => {
      if (K.openNodeInModal) {
        const le = pe.buildRoute(K, `${K.link}`);
        T(le, K.openNodeInModal === !0 ? {} : K.openNodeInModal);
      } else it.navigateToLink(K);
    }),
      l('toggleDropdownState');
  }
  function fe() {
    C().then(() => {
      h
        ? Q()
        : _ && v
        ? g.logout.customLogoutFn()
        : console.error('No IDP provider or profile.customLogoutFn is defined.');
    });
  }
  function X() {
    Xr.openUserSettings(), l('toggleDropdownState');
  }
  function Q() {
    en.logout();
  }
  function ce({ keyCode: K }) {
    (K === pi || K === ga) && document.querySelector('.lui-anchor-node>.fd-list__link').click();
  }
  let { showUserInfo: Ce } = e;
  const H = K => {
      Te.handleNavAnchorClickedWithoutMetaKey(K);
    },
    ae = K => j(K),
    $ = K => ce(K);
  return (
    (i.$$set = K => {
      'isHidden' in K && t(1, (r = K.isHidden)),
        'addNavHrefForAnchor' in K && t(2, (s = K.addNavHrefForAnchor)),
        'showUserInfo' in K && t(0, (Ce = K.showUserInfo));
    }),
    (i.$$.update = () => {
      i.$$.dirty[0] & 128 && t(0, (Ce = Boolean(o && (o.name || o.email))));
    }),
    [Ce, r, s, j, fe, X, ce, o, c, g, h, _, p, n, y, N, D, I, L, M, F, O, Q, H, ae, $]
  );
}
class eS extends At {
  constructor(e) {
    super(),
      Lt(
        this,
        e,
        xk,
        $k,
        It,
        {
          isHidden: 1,
          addNavHrefForAnchor: 2,
          setProfileNavData: 20,
          setProfileUserData: 21,
          onActionClick: 3,
          onLogoutClick: 4,
          onUserSettingsClick: 5,
          logout: 22,
          handleKeyUp: 6,
          showUserInfo: 0
        },
        null,
        [-1, -1]
      );
  }
  get setProfileNavData() {
    return this.$$.ctx[20];
  }
  get setProfileUserData() {
    return this.$$.ctx[21];
  }
  get onActionClick() {
    return this.$$.ctx[3];
  }
  get onLogoutClick() {
    return this.$$.ctx[4];
  }
  get onUserSettingsClick() {
    return this.$$.ctx[5];
  }
  get logout() {
    return this.$$.ctx[22];
  }
  get handleKeyUp() {
    return this.$$.ctx[6];
  }
}
function Od(i, e, t) {
  const n = i.slice();
  return (n[34] = e[t]), n;
}
function Fd(i) {
  let e,
    t,
    n,
    l,
    r,
    s = i[0] && Ud(i),
    o = i[9].items,
    c = [];
  for (let _ = 0; _ < o.length; _ += 1) c[_] = Wd(Od(i, o, _));
  let g = i[12] && Hd(i),
    h = (i[10] || i[11]) && qd(i);
  return {
    c() {
      (e = S('nav')), (t = S('ul')), s && s.c(), (n = q());
      for (let _ = 0; _ < c.length; _ += 1) c[_].c();
      (l = q()),
        g && g.c(),
        (r = q()),
        h && h.c(),
        f(t, 'class', 'fd-menu__list fd-menu__list--no-shadow'),
        f(e, 'class', 'fd-menu lui-profile-simple-menu svelte-1lwfozx');
    },
    m(_, p) {
      R(_, e, p), w(e, t), s && s.m(t, null), w(t, n);
      for (let m = 0; m < c.length; m += 1) c[m].m(t, null);
      w(t, l), g && g.m(t, null), w(t, r), h && h.m(t, null);
    },
    p(_, p) {
      if ((_[0] ? (s ? s.p(_, p) : ((s = Ud(_)), s.c(), s.m(t, n))) : s && (s.d(1), (s = null)), p[0] & 991756)) {
        o = _[9].items;
        let m;
        for (m = 0; m < o.length; m += 1) {
          const v = Od(_, o, m);
          c[m] ? c[m].p(v, p) : ((c[m] = Wd(v)), c[m].c(), c[m].m(t, l));
        }
        for (; m < c.length; m += 1) c[m].d(1);
        c.length = o.length;
      }
      _[12] ? (g ? g.p(_, p) : ((g = Hd(_)), g.c(), g.m(t, r))) : g && (g.d(1), (g = null)),
        _[10] || _[11] ? (h ? h.p(_, p) : ((h = qd(_)), h.c(), h.m(t, null))) : h && (h.d(1), (h = null));
    },
    d(_) {
      _ && A(e), s && s.d(), ct(c, _), g && g.d(), h && h.d();
    }
  };
}
function Ud(i) {
  let e,
    t,
    n = (i[7].name ? i[7].name : i[7].email) + '',
    l;
  return {
    c() {
      (e = S('li')),
        (t = S('span')),
        (l = Pe(n)),
        f(t, 'aria-label', 'Username'),
        f(t, 'id', 'username'),
        f(t, 'class', 'lui-username fd-has-type-1 svelte-1lwfozx'),
        f(t, 'data-testid', 'luigi-topnav-profile-username'),
        f(e, 'class', 'fd-menu__item');
    },
    m(r, s) {
      R(r, e, s), w(e, t), w(t, l);
    },
    p(r, s) {
      s[0] & 128 && n !== (n = (r[7].name ? r[7].name : r[7].email) + '') && Ne(l, n);
    },
    d(r) {
      r && A(e);
    }
  };
}
function Bd(i) {
  let e, t;
  function n(s, o) {
    return o[0] & 512 && (e = null), e == null && (e = !!s[17](s[34])), e ? nS : tS;
  }
  let l = n(i, [-1, -1]),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function tS(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')),
        f(e, 'class', 'fd-top-nav__icon nav-icon svelte-1lwfozx'),
        rt(e.src, (t = i[34].icon)) || f(e, 'src', t),
        f(e, 'alt', (n = i[34].altText ? i[34].altText : ''));
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r[0] & 512 && !rt(e.src, (t = l[34].icon)) && f(e, 'src', t),
        r[0] & 512 && n !== (n = l[34].altText ? l[34].altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function nS(i) {
  let e, t;
  return {
    c() {
      (e = S('span')), f(e, 'class', (t = 'fd-top-nav__icon ' + i[16](i[34].icon) + ' svelte-1lwfozx'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 512 && t !== (t = 'fd-top-nav__icon ' + n[16](n[34].icon) + ' svelte-1lwfozx') && f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Wd(i) {
  let e,
    t,
    n,
    l,
    r = i[13](i[34].label) + '',
    s,
    o,
    c,
    g,
    h,
    _ = i[34].icon && Bd(i);
  function p() {
    return i[24](i[34]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        _ && _.c(),
        (n = q()),
        (l = S('span')),
        (s = Pe(r)),
        f(l, 'class', 'fd-menu__title'),
        f(t, 'class', 'fd-menu__link'),
        f(t, 'data-testid', 'luigi-topnav-profile-item'),
        f(t, 'href', (o = i[2] ? i[19](i[34]) : void 0)),
        f(e, 'class', 'fd-menu__item'),
        f(e, 'data-testid', (c = i[18](i[34])));
    },
    m(m, v) {
      R(m, e, v),
        w(e, t),
        _ && _.m(t, null),
        w(t, n),
        w(t, l),
        w(l, s),
        g || ((h = [ne(t, 'click', i[23]), ne(e, 'click', p)]), (g = !0));
    },
    p(m, v) {
      (i = m),
        i[34].icon ? (_ ? _.p(i, v) : ((_ = Bd(i)), _.c(), _.m(t, n))) : _ && (_.d(1), (_ = null)),
        v[0] & 8704 && r !== (r = i[13](i[34].label) + '') && Ne(s, r),
        v[0] & 516 && o !== (o = i[2] ? i[19](i[34]) : void 0) && f(t, 'href', o),
        v[0] & 512 && c !== (c = i[18](i[34])) && f(e, 'data-testid', c);
    },
    d(m) {
      m && A(e), _ && _.d(), (g = !1), Ze(h);
    }
  };
}
function Hd(i) {
  let e,
    t,
    n,
    l,
    r = i[13](i[9].settings.label) + '',
    s,
    o,
    c,
    g,
    h = i[9].settings.icon && zd(i);
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        h && h.c(),
        (n = q()),
        (l = S('span')),
        (s = Pe(r)),
        f(l, 'class', 'fd-menu__title'),
        f(t, 'tabindex', '0'),
        f(t, 'title', 'User Settings'),
        f(t, 'class', 'fd-menu__link'),
        f(t, 'data-testid', 'settings-link'),
        f(e, 'tabindex', '-1'),
        f(e, 'class', 'fd-menu__item lui-anchor-node'),
        f(e, 'data-testid', (o = i[18](i[9].settings)));
    },
    m(_, p) {
      R(_, e, p),
        w(e, t),
        h && h.m(t, null),
        w(t, n),
        w(t, l),
        w(l, s),
        c || ((g = [ne(e, 'click', Tt(i[5])), ne(e, 'keyup', i[25])]), (c = !0));
    },
    p(_, p) {
      _[9].settings.icon ? (h ? h.p(_, p) : ((h = zd(_)), h.c(), h.m(t, n))) : h && (h.d(1), (h = null)),
        p[0] & 8704 && r !== (r = _[13](_[9].settings.label) + '') && Ne(s, r),
        p[0] & 512 && o !== (o = _[18](_[9].settings)) && f(e, 'data-testid', o);
    },
    d(_) {
      _ && A(e), h && h.d(), (c = !1), Ze(g);
    }
  };
}
function zd(i) {
  let e, t;
  function n(s, o) {
    return o[0] & 512 && (e = null), e == null && (e = !!s[17](s[9].settings)), e ? lS : iS;
  }
  let l = n(i, [-1, -1]),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function iS(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')),
        f(e, 'class', 'fd-top-nav__icon nav-icon svelte-1lwfozx'),
        rt(e.src, (t = i[9].settings.icon)) || f(e, 'src', t),
        f(e, 'alt', (n = i[9].settings.altText ? i[9].settings.altText : ''));
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r[0] & 512 && !rt(e.src, (t = l[9].settings.icon)) && f(e, 'src', t),
        r[0] & 512 && n !== (n = l[9].settings.altText ? l[9].settings.altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function lS(i) {
  let e, t;
  return {
    c() {
      (e = S('i')), f(e, 'class', (t = 'fd-top-nav__icon ' + i[16](i[9].settings.icon) + ' svelte-1lwfozx'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 512 && t !== (t = 'fd-top-nav__icon ' + n[16](n[9].settings.icon) + ' svelte-1lwfozx') && f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function qd(i) {
  let e,
    t,
    n = (i[8] || (!i[10] && i[11])) && Gd(i),
    l = i[10] && !i[8] && Jd(i);
  return {
    c() {
      n && n.c(), (e = q()), l && l.c(), (t = ye());
    },
    m(r, s) {
      n && n.m(r, s), R(r, e, s), l && l.m(r, s), R(r, t, s);
    },
    p(r, s) {
      r[8] || (!r[10] && r[11])
        ? n
          ? n.p(r, s)
          : ((n = Gd(r)), n.c(), n.m(e.parentNode, e))
        : n && (n.d(1), (n = null)),
        r[10] && !r[8] ? (l ? l.p(r, s) : ((l = Jd(r)), l.c(), l.m(t.parentNode, t))) : l && (l.d(1), (l = null));
    },
    d(r) {
      n && n.d(r), r && A(e), l && l.d(r), r && A(t);
    }
  };
}
function Gd(i) {
  let e,
    t,
    n,
    l,
    r = i[13](i[9].logout.label) + '',
    s,
    o,
    c,
    g,
    h = i[9].logout.icon && Kd(i);
  return {
    c() {
      (e = S('li')),
        (t = S('button')),
        h && h.c(),
        (n = q()),
        (l = S('span')),
        (s = Pe(r)),
        f(l, 'class', 'fd-menu__title'),
        f(t, 'title', 'Logout'),
        f(t, 'class', 'fd-menu__link lui-logout-btn svelte-1lwfozx'),
        f(t, 'data-testid', 'logout-btn'),
        f(e, 'class', 'fd-menu__item svelte-1lwfozx'),
        f(e, 'data-testid', (o = i[18](i[9].logout)));
    },
    m(_, p) {
      R(_, e, p), w(e, t), h && h.m(t, null), w(t, n), w(t, l), w(l, s), c || ((g = ne(e, 'click', i[4])), (c = !0));
    },
    p(_, p) {
      _[9].logout.icon ? (h ? h.p(_, p) : ((h = Kd(_)), h.c(), h.m(t, n))) : h && (h.d(1), (h = null)),
        p[0] & 8704 && r !== (r = _[13](_[9].logout.label) + '') && Ne(s, r),
        p[0] & 512 && o !== (o = _[18](_[9].logout)) && f(e, 'data-testid', o);
    },
    d(_) {
      _ && A(e), h && h.d(), (c = !1), g();
    }
  };
}
function Kd(i) {
  let e, t;
  function n(s, o) {
    return o[0] & 512 && (e = null), e == null && (e = !!s[17](s[9].logout)), e ? sS : rS;
  }
  let l = n(i, [-1, -1]),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function rS(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')),
        f(e, 'class', 'fd-top-nav__icon nav-icon svelte-1lwfozx'),
        rt(e.src, (t = i[9].logout.icon)) || f(e, 'src', t),
        f(e, 'alt', (n = i[9].logout.altText ? i[9].logout.altText : ''));
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r[0] & 512 && !rt(e.src, (t = l[9].logout.icon)) && f(e, 'src', t),
        r[0] & 512 && n !== (n = l[9].logout.altText ? l[9].logout.altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function sS(i) {
  let e, t;
  return {
    c() {
      (e = S('i')), f(e, 'class', (t = 'fd-top-nav__icon ' + i[16](i[9].logout.icon) + ' svelte-1lwfozx'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 512 && t !== (t = 'fd-top-nav__icon ' + n[16](n[9].logout.icon) + ' svelte-1lwfozx') && f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Jd(i) {
  let e, t, n;
  return {
    c() {
      (e = S('li')),
        (e.innerHTML =
          '<a aria-label="Login" class="fd-menu__link" data-testid="login-btn"><span class="fd-menu__title">Login</span></a>'),
        f(e, 'class', 'fd-menu__item');
    },
    m(l, r) {
      R(l, e, r), t || ((n = ne(e, 'click', i[15])), (t = !0));
    },
    p: Ue,
    d(l) {
      l && A(e), (t = !1), n();
    }
  };
}
function aS(i) {
  let e,
    t = !i[1] && Fd(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, l) {
      n[1] ? t && (t.d(1), (t = null)) : t ? t.p(n, l) : ((t = Fd(n)), t.c(), t.m(e.parentNode, e));
    },
    i: Ue,
    o: Ue,
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function oS(i, e, t) {
  let n;
  const l = Wt();
  let { isHidden: r = !1 } = e,
    { addNavHrefForAnchor: s } = e,
    o,
    c,
    g = { logout: {}, items: [], settings: {} },
    h,
    _,
    p,
    m,
    v,
    k = vt('store'),
    y = vt('getTranslation');
  mi(i, y, K => t(13, (n = K)));
  let C = vt('getUnsavedChangesModalPromise'),
    T = vt('openViewInModal');
  Kt(async () => {
    gi.isAuthorizationEnabled() ? t(10, (h = !0)) : (t(10, (h = !1)), O()),
      F(),
      en.getLoggedInStore().subscribe(K => {
        t(8, (c = K));
      }),
      en.getUserInfoStore().subscribe(K => {
        t(7, (o = K)), l('userInfoUpdated', o);
      });
  });
  function N() {
    en.startAuthorization();
  }
  function D(K) {
    return Te.renderIconClassName(K);
  }
  function I(K) {
    return Te.isOpenUIiconName(K.icon);
  }
  function L(K) {
    return K.testId ? K.testId : Te.prepareForTests(K.label);
  }
  function M(K) {
    return pe.getNodeHref(K);
  }
  function F() {
    m ||
      (Fn.doOnStoreChange(
        k,
        async () => {
          const K = await re.getConfigValueAsync('navigation.profile.logout'),
            le = await re.getConfigValueAsync('userSettings'),
            ve = le || (await re.getConfigValueAsync('settings.userSettings'));
          t(12, (p = Boolean(ve)));
          const ue = { items: (await re.getConfigValueAsync('navigation.profile.items')) || [] };
          if (p) {
            const x = ve.userSettingsProfileMenuEntry;
            ue.settings = { ...ul.userSettingsProfileMenuEntry, ...x };
          }
          (ue.logout = { ...ul.logout, ...K }),
            t(11, (_ = Boolean(K))),
            (v = !1),
            en.setProfileLogoutFn(null),
            K && ee.isFunction(K.customLogoutFn) && ((v = !0), en.setProfileLogoutFn(K.customLogoutFn)),
            t(9, (g = ue));
        },
        ['navigation.profile']
      ),
      (m = !0));
  }
  async function O() {
    const K = await re.getConfigValueAsync('navigation.profile.staticUserInfoFn');
    K && (en.setUserInfo(o), t(7, (o = K)), l('userInfoUpdated', o));
  }
  function j(K) {
    C().then(() => {
      if (K.openNodeInModal) {
        const le = pe.buildRoute(K, `${K.link}`);
        T(le, K.openNodeInModal === !0 ? {} : K.openNodeInModal);
      } else it.navigateToLink(K);
    }),
      l('toggleDropdownState');
  }
  function fe() {
    C().then(() => {
      h
        ? Q()
        : _ && v
        ? g.logout.customLogoutFn()
        : console.error('No IDP provider or profile.customLogoutFn is defined.');
    });
  }
  function X() {
    Xr.openUserSettings(), l('toggleDropdownState');
  }
  function Q() {
    en.logout();
  }
  function ce({ keyCode: K }) {
    (K === pi || K === ga) && document.querySelector('.lui-anchor-node>.fd-menu__link').click();
  }
  let { showUserInfo: Ce } = e;
  const H = K => {
      Te.handleNavAnchorClickedWithoutMetaKey(K);
    },
    ae = K => j(K),
    $ = K => ce(K);
  return (
    (i.$$set = K => {
      'isHidden' in K && t(1, (r = K.isHidden)),
        'addNavHrefForAnchor' in K && t(2, (s = K.addNavHrefForAnchor)),
        'showUserInfo' in K && t(0, (Ce = K.showUserInfo));
    }),
    (i.$$.update = () => {
      i.$$.dirty[0] & 128 && t(0, (Ce = Boolean(o && (o.name || o.email))));
    }),
    [Ce, r, s, j, fe, X, ce, o, c, g, h, _, p, n, y, N, D, I, L, M, F, O, Q, H, ae, $]
  );
}
class T_ extends At {
  constructor(e) {
    super(),
      Lt(
        this,
        e,
        oS,
        aS,
        It,
        {
          isHidden: 1,
          addNavHrefForAnchor: 2,
          setProfileNavData: 20,
          setProfileUserData: 21,
          onActionClick: 3,
          onLogoutClick: 4,
          onUserSettingsClick: 5,
          logout: 22,
          handleKeyUp: 6,
          showUserInfo: 0
        },
        null,
        [-1, -1]
      );
  }
  get setProfileNavData() {
    return this.$$.ctx[20];
  }
  get setProfileUserData() {
    return this.$$.ctx[21];
  }
  get onActionClick() {
    return this.$$.ctx[3];
  }
  get onLogoutClick() {
    return this.$$.ctx[4];
  }
  get onUserSettingsClick() {
    return this.$$.ctx[5];
  }
  get logout() {
    return this.$$.ctx[22];
  }
  get handleKeyUp() {
    return this.$$.ctx[6];
  }
}
function jd(i, e, t) {
  const n = i.slice();
  return (n[12] = e[t]), n;
}
function Yd(i) {
  let e,
    t,
    n = i[1],
    l = [];
  for (let s = 0; s < n.length; s += 1) l[s] = Zd(jd(i, n, s));
  const r = s =>
    G(l[s], 1, 1, () => {
      l[s] = null;
    });
  return {
    c() {
      for (let s = 0; s < l.length; s += 1) l[s].c();
      e = ye();
    },
    m(s, o) {
      for (let c = 0; c < l.length; c += 1) l[c].m(s, o);
      R(s, e, o), (t = !0);
    },
    p(s, o) {
      if (o & 510) {
        n = s[1];
        let c;
        for (c = 0; c < n.length; c += 1) {
          const g = jd(s, n, c);
          l[c] ? (l[c].p(g, o), B(l[c], 1)) : ((l[c] = Zd(g)), l[c].c(), B(l[c], 1), l[c].m(e.parentNode, e));
        }
        for (Ee(), c = n.length; c < l.length; c += 1) r(c);
        De();
      }
    },
    i(s) {
      if (!t) {
        for (let o = 0; o < n.length; o += 1) B(l[o]);
        t = !0;
      }
    },
    o(s) {
      l = l.filter(Boolean);
      for (let o = 0; o < l.length; o += 1) G(l[o]);
      t = !1;
    },
    d(s) {
      ct(l, s), s && A(e);
    }
  };
}
function uS(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')),
        rt(e.src, (t = i[12].icon)) || f(e, 'src', t),
        f(e, 'alt', (n = i[12].altText ? i[12].altText : '')),
        f(e, 'class', 'svelte-503htr');
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r & 2 && !rt(e.src, (t = l[12].icon)) && f(e, 'src', t),
        r & 2 && n !== (n = l[12].altText ? l[12].altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function fS(i) {
  let e, t;
  return {
    c() {
      (e = S('i')),
        f(e, 'class', (t = 'sap-icon ' + (i[12].icon && i[3](i[12]) ? i[8](i[12].icon) : '') + ' svelte-503htr'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l & 10 &&
        t !== (t = 'sap-icon ' + (n[12].icon && n[3](n[12]) ? n[8](n[12].icon) : '') + ' svelte-503htr') &&
        f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Qd(i) {
  let e,
    t = i[5](i[12]) + '',
    n;
  return {
    c() {
      (e = S('div')), (n = Pe(t)), f(e, 'class', 'fd-product-switch__subtitle');
    },
    m(l, r) {
      R(l, e, r), w(e, n);
    },
    p(l, r) {
      r & 34 && t !== (t = l[5](l[12]) + '') && Ne(n, t);
    },
    d(l) {
      l && A(e);
    }
  };
}
function Zd(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o,
    c,
    g = i[4](i[12]) + '',
    h,
    _,
    p = i[5](i[12]),
    m,
    v,
    k,
    y,
    C,
    T;
  function N(F, O) {
    return O & 10 && (n = null), n == null && (n = !!F[3](F[12])), n ? fS : uS;
  }
  let D = N(i, -1),
    I = D(i);
  r = new Zn({ props: { node: i[12] } });
  let L = p && Qd(i);
  function M() {
    return i[10](i[12]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('div')),
        I.c(),
        (l = q()),
        Ge(r.$$.fragment),
        (s = q()),
        (o = S('div')),
        (c = S('div')),
        (h = Pe(g)),
        (_ = q()),
        L && L.c(),
        (m = q()),
        f(t, 'class', 'lui-product-switch__icon svelte-503htr'),
        f(c, 'class', 'fd-product-switch__title svelte-503htr'),
        f(o, 'class', 'fd-product-switch__text svelte-503htr'),
        f(
          e,
          'class',
          (v =
            'fd-product-switch__item ' +
            (i[6] == 'true' ? 'y-has-no-subtitle' : '') +
            ' ' +
            (i[12].selected ? 'selected' : '') +
            ' svelte-503htr')
        ),
        f(e, 'data-e2e', 'mobile-topnav-item'),
        f(e, 'data-testid', (k = i[2](i[12])));
    },
    m(F, O) {
      R(F, e, O),
        w(e, t),
        I.m(t, null),
        w(t, l),
        He(r, t, null),
        w(e, s),
        w(e, o),
        w(o, c),
        w(c, h),
        w(o, _),
        L && L.m(o, null),
        w(e, m),
        (y = !0),
        C || ((T = ne(e, 'click', M)), (C = !0));
    },
    p(F, O) {
      (i = F), D === (D = N(i, O)) && I ? I.p(i, O) : (I.d(1), (I = D(i)), I && (I.c(), I.m(t, l)));
      const j = {};
      O & 2 && (j.node = i[12]),
        r.$set(j),
        (!y || O & 18) && g !== (g = i[4](i[12]) + '') && Ne(h, g),
        O & 34 && (p = i[5](i[12])),
        p ? (L ? L.p(i, O) : ((L = Qd(i)), L.c(), L.m(o, null))) : L && (L.d(1), (L = null)),
        (!y ||
          (O & 66 &&
            v !==
              (v =
                'fd-product-switch__item ' +
                (i[6] == 'true' ? 'y-has-no-subtitle' : '') +
                ' ' +
                (i[12].selected ? 'selected' : '') +
                ' svelte-503htr'))) &&
          f(e, 'class', v),
        (!y || (O & 6 && k !== (k = i[2](i[12])))) && f(e, 'data-testid', k);
    },
    i(F) {
      y || (B(r.$$.fragment, F), (y = !0));
    },
    o(F) {
      G(r.$$.fragment, F), (y = !1);
    },
    d(F) {
      F && A(e), I.d(), ze(r), L && L.d(), (C = !1), T();
    }
  };
}
function cS(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C,
    T,
    N,
    D = i[1] && Yd(i);
  return {
    c() {
      (e = S('div')),
        (t = S('div')),
        (n = S('div')),
        (l = S('div')),
        (r = S('div')),
        (s = S('h2')),
        (o = Pe(i[0])),
        (c = q()),
        (g = S('div')),
        (h = S('div')),
        (_ = S('ul')),
        D && D.c(),
        (p = q()),
        (m = S('footer')),
        (v = S('div')),
        (k = S('div')),
        (y = S('button')),
        (y.textContent = 'Cancel'),
        f(s, 'class', 'fd-title fd-title--h5'),
        f(s, 'id', 'dialog-title-4'),
        f(r, 'class', 'fd-bar__element'),
        f(l, 'class', 'fd-bar__left'),
        f(n, 'class', 'fd-dialog__header fd-bar fd-bar--header'),
        f(_, 'class', 'fd-product-switch__list'),
        f(h, 'class', 'fd-product-switch__body fd-product-switch__body--mobile svelte-503htr'),
        f(g, 'class', 'fd-dialog__body fd-dialog__body--no-vertical-padding'),
        f(y, 'class', 'fd-button fd-button--light fd-dialog__decisive-button'),
        f(y, 'data-testid', 'mobile-topnav-close'),
        f(k, 'class', 'fd-bar__element'),
        f(v, 'class', 'fd-bar__right'),
        f(m, 'class', 'fd-dialog__footer fd-bar fd-bar--cosy fd-bar--footer'),
        f(t, 'class', 'fd-dialog__content fd-dialog__content--mobile'),
        f(t, 'role', 'dialog'),
        f(t, 'aria-modal', 'true'),
        f(t, 'aria-labelledby', 'dialog-title-4'),
        f(e, 'class', 'fd-dialog fd-dialog--active');
    },
    m(I, L) {
      R(I, e, L),
        w(e, t),
        w(t, n),
        w(n, l),
        w(l, r),
        w(r, s),
        w(s, o),
        w(t, c),
        w(t, g),
        w(g, h),
        w(h, _),
        D && D.m(_, null),
        w(t, p),
        w(t, m),
        w(m, v),
        w(v, k),
        w(k, y),
        (C = !0),
        T || ((N = [ne(y, 'click', i[9]), ne(e, 'click', Ot(dS))]), (T = !0));
    },
    p(I, [L]) {
      (!C || L & 1) && Ne(o, I[0]),
        I[1]
          ? D
            ? (D.p(I, L), L & 2 && B(D, 1))
            : ((D = Yd(I)), D.c(), B(D, 1), D.m(_, null))
          : D &&
            (Ee(),
            G(D, 1, 1, () => {
              D = null;
            }),
            De());
    },
    i(I) {
      C || (B(D), (C = !0));
    },
    o(I) {
      G(D), (C = !1);
    },
    d(I) {
      I && A(e), D && D.d(), (T = !1), Ze(N);
    }
  };
}
const dS = () => {};
function hS(i, e, t) {
  const n = Wt();
  let { label: l } = e,
    { nodes: r } = e,
    { getTestId: s } = e,
    { hasOpenUIicon: o } = e,
    { getNodeLabel: c } = e,
    { getNodeSubtitle: g } = e,
    { noSubTitle: h } = e;
  function _(k) {
    return Te.renderIconClassName(k);
  }
  function p(k) {
    n('listClick', k);
  }
  function m(k) {
    Ll.call(this, i, k);
  }
  const v = k => p(k);
  return (
    (i.$$set = k => {
      'label' in k && t(0, (l = k.label)),
        'nodes' in k && t(1, (r = k.nodes)),
        'getTestId' in k && t(2, (s = k.getTestId)),
        'hasOpenUIicon' in k && t(3, (o = k.hasOpenUIicon)),
        'getNodeLabel' in k && t(4, (c = k.getNodeLabel)),
        'getNodeSubtitle' in k && t(5, (g = k.getNodeSubtitle)),
        'noSubTitle' in k && t(6, (h = k.noSubTitle));
    }),
    [l, r, s, o, c, g, h, p, _, m, v]
  );
}
class L_ extends At {
  constructor(e) {
    super(),
      Lt(this, e, hS, cS, It, {
        label: 0,
        nodes: 1,
        getTestId: 2,
        hasOpenUIicon: 3,
        getNodeLabel: 4,
        getNodeSubtitle: 5,
        noSubTitle: 6,
        onActionClick: 7
      });
  }
  get onActionClick() {
    return this.$$.ctx[7];
  }
}
const { window: gS } = Ui;
function Xd(i, e, t) {
  const n = i.slice();
  return (n[6] = e[t]), n;
}
function $d(i) {
  let e,
    t,
    n,
    l = i[0] && xd(i);
  return {
    c() {
      (e = S('nav')),
        (t = S('ul')),
        l && l.c(),
        f(t, 'class', 'fd-menu__list fd-menu__list--top fd-menu__list--no-shadow'),
        f(e, 'class', 'fd-menu');
    },
    m(r, s) {
      R(r, e, s), w(e, t), l && l.m(t, null), (n = !0);
    },
    p(r, s) {
      r[0]
        ? l
          ? (l.p(r, s), s & 1 && B(l, 1))
          : ((l = xd(r)), l.c(), B(l, 1), l.m(t, null))
        : l &&
          (Ee(),
          G(l, 1, 1, () => {
            l = null;
          }),
          De());
    },
    i(r) {
      n || (B(l), (n = !0));
    },
    o(r) {
      G(l), (n = !1);
    },
    d(r) {
      r && A(e), l && l.d();
    }
  };
}
function xd(i) {
  let e,
    t,
    n = i[0],
    l = [];
  for (let s = 0; s < n.length; s += 1) l[s] = eh(Xd(i, n, s));
  const r = s =>
    G(l[s], 1, 1, () => {
      l[s] = null;
    });
  return {
    c() {
      for (let s = 0; s < l.length; s += 1) l[s].c();
      e = ye();
    },
    m(s, o) {
      for (let c = 0; c < l.length; c += 1) l[c].m(s, o);
      R(s, e, o), (t = !0);
    },
    p(s, o) {
      if (o & 16005) {
        n = s[0];
        let c;
        for (c = 0; c < n.length; c += 1) {
          const g = Xd(s, n, c);
          l[c] ? (l[c].p(g, o), B(l[c], 1)) : ((l[c] = eh(g)), l[c].c(), B(l[c], 1), l[c].m(e.parentNode, e));
        }
        for (Ee(), c = n.length; c < l.length; c += 1) r(c);
        De();
      }
    },
    i(s) {
      if (!t) {
        for (let o = 0; o < n.length; o += 1) B(l[o]);
        t = !0;
      }
    },
    o(s) {
      l = l.filter(Boolean);
      for (let o = 0; o < l.length; o += 1) G(l[o]);
      t = !1;
    },
    d(s) {
      ct(l, s), s && A(e);
    }
  };
}
function _S(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')),
        f(e, 'class', 'sap-icon svelte-1gqx0dl'),
        rt(e.src, (t = i[6].icon)) || f(e, 'src', t),
        f(e, 'alt', (n = i[6].altText ? i[6].altText : ''));
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r & 1 && !rt(e.src, (t = l[6].icon)) && f(e, 'src', t),
        r & 1 && n !== (n = l[6].altText ? l[6].altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function pS(i) {
  let e, t;
  return {
    c() {
      (e = S('i')), f(e, 'class', (t = 'sap-icon ' + i[10](i[6].icon)));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l & 1 && t !== (t = 'sap-icon ' + n[10](n[6].icon)) && f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function eh(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o,
    c,
    g = i[11](i[6]) + '',
    h,
    _,
    p,
    m,
    v,
    k,
    y;
  function C(I, L) {
    return L & 1 && (l = null), l == null && (l = !!(I[6].icon && I[9](I[6]))), l ? pS : _S;
  }
  let T = C(i, -1),
    N = T(i);
  s = new Zn({ props: { node: i[6] } });
  function D() {
    return i[15](i[6]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('span')),
        N.c(),
        (r = q()),
        Ge(s.$$.fragment),
        (o = q()),
        (c = S('span')),
        (h = Pe(g)),
        (p = q()),
        f(n, 'class', 'fd-top-nav__icon svelte-1gqx0dl'),
        f(c, 'class', 'fd-menu__title'),
        f(t, 'href', (_ = i[7] ? i[13](i[6]) : void 0)),
        f(t, 'class', 'fd-menu__link'),
        f(e, 'class', 'fd-menu__item'),
        f(e, 'data-testid', (m = i[12](i[6])));
    },
    m(I, L) {
      R(I, e, L),
        w(e, t),
        w(t, n),
        N.m(n, null),
        w(n, r),
        He(s, n, null),
        w(t, o),
        w(t, c),
        w(c, h),
        w(e, p),
        (v = !0),
        k || ((y = [ne(t, 'click', i[14]), ne(e, 'click', D)]), (k = !0));
    },
    p(I, L) {
      (i = I), T === (T = C(i, L)) && N ? N.p(i, L) : (N.d(1), (N = T(i)), N && (N.c(), N.m(n, r)));
      const M = {};
      L & 1 && (M.node = i[6]),
        s.$set(M),
        (!v || L & 1) && g !== (g = i[11](i[6]) + '') && Ne(h, g),
        (!v || (L & 1 && _ !== (_ = i[7] ? i[13](i[6]) : void 0))) && f(t, 'href', _),
        (!v || (L & 1 && m !== (m = i[12](i[6])))) && f(e, 'data-testid', m);
    },
    i(I) {
      v || (B(s.$$.fragment, I), (v = !0));
    },
    o(I) {
      G(s.$$.fragment, I), (v = !1);
    },
    d(I) {
      I && A(e), N.d(), ze(s), (k = !1), Ze(y);
    }
  };
}
function th(i) {
  let e, t;
  return (
    (e = new L_({
      props: {
        nodes: i[6].children,
        label: i[11](i[6]),
        hasOpenUIicon: i[9],
        getNodeLabel: i[11],
        getNodeSubtitle: i[8],
        getTestId: i[12],
        noSubTitle: 'true'
      }
    })),
    e.$on('click', i[4]),
    e.$on('listClick', i[3]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l & 64 && (r.nodes = n[6].children), l & 64 && (r.label = n[11](n[6])), e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function mS(i) {
  let e,
    t,
    n,
    l,
    r,
    s = !i[1] && $d(i),
    o = i[1] && th(i);
  return {
    c() {
      s && s.c(), (e = q()), o && o.c(), (t = ye());
    },
    m(c, g) {
      s && s.m(c, g), R(c, e, g), o && o.m(c, g), R(c, t, g), (n = !0), l || ((r = ne(gS, 'resize', fa)), (l = !0));
    },
    p(c, [g]) {
      c[1]
        ? s &&
          (Ee(),
          G(s, 1, 1, () => {
            s = null;
          }),
          De())
        : s
        ? (s.p(c, g), g & 2 && B(s, 1))
        : ((s = $d(c)), s.c(), B(s, 1), s.m(e.parentNode, e)),
        c[1]
          ? o
            ? (o.p(c, g), g & 2 && B(o, 1))
            : ((o = th(c)), o.c(), B(o, 1), o.m(t.parentNode, t))
          : o &&
            (Ee(),
            G(o, 1, 1, () => {
              o = null;
            }),
            De());
    },
    i(c) {
      n || (B(s), B(o), (n = !0));
    },
    o(c) {
      G(s), G(o), (n = !1);
    },
    d(c) {
      s && s.d(c), c && A(e), o && o.d(c), c && A(t), (l = !1), r();
    }
  };
}
function fa() {
  let i = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${i}px`);
}
function bS(i, e, t) {
  const n = Wt();
  let { isMobile: l } = e,
    { children: r } = e,
    { node: s } = e,
    o,
    c = vt('getUnsavedChangesModalPromise'),
    g = vt('openViewInModal'),
    h;
  const _ = () => {},
    p = () => ({ get: () => ({ pathParams: o }), set: M => {} });
  Kt(async () => {
    fa();
  }),
    On(async () => {
      r || t(0, (r = await Mt.getChildren(s))), t(0, r);
    });
  function m(M) {
    c().then(() => {
      if (M.openNodeInModal) {
        const F = pe.buildRoute(M, `/${M.pathSegment}`);
        g(F, M.openNodeInModal === !0 ? {} : M.openNodeInModal);
      } else it.handleRouteClick(M, p());
    }),
      k();
  }
  function v(M) {
    m(M.detail);
  }
  function k() {
    n('close');
  }
  function y(M) {
    return Te.isOpenUIiconName(M.icon);
  }
  function C(M) {
    return Te.renderIconClassName(M);
  }
  function T(M) {
    return ht.getTranslation(M.label);
  }
  function N(M) {
    return M.testId ? M.testId : Te.prepareForTests(M.pathSegment, M.label);
  }
  function D(M) {
    return pe.getNodeHref(M, o);
  }
  const I = M => {
      Te.handleNavAnchorClickedWithoutMetaKey(M);
    },
    L = M => m(M);
  return (
    (i.$$set = M => {
      'isMobile' in M && t(1, (l = M.isMobile)),
        'children' in M && t(0, (r = M.children)),
        'node' in M && t(6, (s = M.node));
    }),
    [r, l, m, v, k, fa, s, h, _, y, C, T, N, D, I, L]
  );
}
class A_ extends At {
  constructor(e) {
    super(),
      Lt(this, e, bS, mS, It, {
        isMobile: 1,
        children: 0,
        node: 6,
        onActionClick: 2,
        onActionClickExternal: 3,
        closeSubNav: 4,
        setViewportHeightVariable: 5
      });
  }
  get onActionClick() {
    return this.$$.ctx[2];
  }
  get onActionClickExternal() {
    return this.$$.ctx[3];
  }
  get closeSubNav() {
    return this.$$.ctx[4];
  }
  get setViewportHeightVariable() {
    return fa;
  }
}
const cn = {
  _fallbackLabels: new Map(),
  resetFallbackLabelCache() {
    this._fallbackLabels.clear();
  },
  getPreparedParentNodePath(i) {
    return (
      (!i.parentNodePath || !i.parentNodePath.startsWith('/')) &&
        console.error(
          'Luigi Config Error: navigation.contextSwitcher.parentNodePath must be defined as an absolute path.'
        ),
      i.parentNodePath ? ee.addTrailingSlash(i.parentNodePath) : i.parentNodePath
    );
  },
  generateSwitcherNav(i, e) {
    const t = this.getPreparedParentNodePath(i);
    return e.map(n => ({
      label: n.label,
      link: (t || '/') + n.pathValue,
      id: n.pathValue,
      testId: n.testId,
      customRendererCategory: n.customRendererCategory
    }));
  },
  getNodePathFromCurrentPath(i, e) {
    const t = ee.addLeadingSlash(it.getCurrentPath()),
      n = ee.addLeadingSlash(e.link);
    return t.startsWith(n) ? i.link + ee.addLeadingSlash(t.substring(n.length)) : i.link;
  },
  getOptionById(i, e) {
    return i.find(t => t.id === e);
  },
  getLabelFromOptions(i, e) {
    const t = i.find(n => n.id === e);
    return t && t.label;
  },
  isContextSwitcherDetailsView(i, e) {
    const t = ee.normalizePath(i),
      n = ee.normalizePath(e);
    return Boolean(e && t && typeof t == 'string' && t.startsWith(n) && t !== n);
  },
  async getFallbackLabel(i, e) {
    if (!i) return e;
    const t = re.getConfigBooleanValue('navigation.contextSwitcher.useFallbackLabelCache'),
      n = cn._fallbackLabels;
    if (t && n.has(e)) return n.get(e);
    const l = await i(e);
    return t && n.set(e, l), l;
  },
  getSelectedId(i, e, t) {
    if (((i = ee.normalizePath(i)), (t = ee.normalizePath(t)), !!cn.isContextSwitcherDetailsView(i, t)))
      return i
        .replace(t, '')
        .split('/')[0]
        .split('?')[0];
  },
  async getSelectedOption(i, e, t) {
    let n;
    const l = this.getSelectedId(i, e, t);
    return l && e && (n = cn.getOptionById(e, l)), n;
  },
  async getSelectedLabel(i, e, t, n) {
    const l = this.getSelectedId(i, e, t);
    if (!l) return;
    const r = await this.getSelectedOption(i, e, t);
    return (r ? r.label : void 0) || (await cn.getFallbackLabel(n, l));
  },
  async getSelectedNode(i, e, t) {
    if (!this.getSelectedId(i, e, t)) return;
    let l = await this.getSelectedOption(i, e, t);
    return l ? l.link : void 0;
  },
  async fetchOptions(i = []) {
    const e = re.getConfigValue('navigation.contextSwitcher');
    if (!e.lazyloadOptions && i.length) return i;
    const t = await re.getConfigValueAsync('navigation.contextSwitcher.options');
    return await cn.generateSwitcherNav(e, t);
  }
};
function nh(i, e, t) {
  const n = i.slice();
  return (n[20] = e[t]), n;
}
function ih(i, e, t) {
  const n = i.slice();
  return (n[20] = e[t]), n;
}
function lh(i, e, t) {
  const n = i.slice();
  return (n[20] = e[t]), n;
}
function rh(i) {
  let e,
    t = i[0],
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = ah(lh(i, t, l));
  return {
    c() {
      e = S('ul');
      for (let l = 0; l < n.length; l += 1) n[l].c();
      f(e, 'class', 'fd-menu__list fd-menu__list--top svelte-qht2wo');
    },
    m(l, r) {
      R(l, e, r);
      for (let s = 0; s < n.length; s += 1) n[s].m(e, null);
    },
    p(l, r) {
      if (r & 11009) {
        t = l[0];
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = lh(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = ah(o)), n[s].c(), n[s].m(e, null));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    d(l) {
      l && A(e), ct(n, l);
    }
  };
}
function sh(i) {
  let e,
    t,
    n,
    l = i[13](i[20].label) + '',
    r,
    s,
    o,
    c,
    g,
    h;
  function _() {
    return i[14](i[20]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('span')),
        (r = Pe(l)),
        (o = q()),
        f(n, 'class', 'fd-menu__title'),
        f(t, 'href', (s = i[8](i[20]))),
        f(t, 'class', 'fd-menu__link'),
        f(e, 'class', 'fd-menu__item'),
        f(e, 'data-testid', (c = i[9](i[20])));
    },
    m(p, m) {
      R(p, e, m),
        w(e, t),
        w(t, n),
        w(n, r),
        w(e, o),
        g || ((h = [ne(t, 'click', Tt(PS)), ne(e, 'click', _)]), (g = !0));
    },
    p(p, m) {
      (i = p),
        m & 8193 && l !== (l = i[13](i[20].label) + '') && Ne(r, l),
        m & 257 && s !== (s = i[8](i[20])) && f(t, 'href', s),
        m & 513 && c !== (c = i[9](i[20])) && f(e, 'data-testid', c);
    },
    d(p) {
      p && A(e), (g = !1), Ze(h);
    }
  };
}
function ah(i) {
  let e = i[20].position === 'top' || !['top', 'bottom'].includes(i[20].position),
    t,
    n = e && sh(i);
  return {
    c() {
      n && n.c(), (t = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, t, r);
    },
    p(l, r) {
      r & 1 && (e = l[20].position === 'top' || !['top', 'bottom'].includes(l[20].position)),
        e ? (n ? n.p(l, r) : ((n = sh(l)), n.c(), n.m(t.parentNode, t))) : n && (n.d(1), (n = null));
    },
    d(l) {
      n && n.d(l), l && A(t);
    }
  };
}
function oh(i) {
  let e;
  return {
    c() {
      (e = S('li')),
        (e.innerHTML = `<div class="fd-busy-indicator" aria-hidden="false" aria-label="Loading"><div class="fd-busy-indicator--circle-0"></div> 
          <div class="fd-busy-indicator--circle-1"></div> 
          <div class="fd-busy-indicator--circle-2"></div></div>`),
        f(e, 'class', 'lui-contextswitcher-indicator');
    },
    m(t, n) {
      R(t, e, n);
    },
    d(t) {
      t && A(e);
    }
  };
}
function uh(i) {
  let e,
    t = i[3],
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = fh(ih(i, t, l));
  return {
    c() {
      for (let l = 0; l < n.length; l += 1) n[l].c();
      e = ye();
    },
    m(l, r) {
      for (let s = 0; s < n.length; s += 1) n[s].m(l, r);
      R(l, e, r);
    },
    p(l, r) {
      if (r & 5054) {
        t = l[3];
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = ih(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = fh(o)), n[s].c(), n[s].m(e.parentNode, e));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    d(l) {
      ct(n, l), l && A(e);
    }
  };
}
function vS(i) {
  return { c: Ue, m: Ue, p: Ue, d: Ue };
}
function wS(i) {
  let e, t, n, l, r;
  function s(h, _) {
    return h[2] ? SS : kS;
  }
  let o = s(i),
    c = o(i);
  function g() {
    return i[16](i[20]);
  }
  return {
    c() {
      (e = S('li')), c.c(), (n = q()), f(e, 'class', 'fd-menu__item'), f(e, 'data-testid', (t = i[9](i[20])));
    },
    m(h, _) {
      R(h, e, _), c.m(e, null), R(h, n, _), l || ((r = ne(e, 'click', g)), (l = !0));
    },
    p(h, _) {
      (i = h),
        o === (o = s(i)) && c ? c.p(i, _) : (c.d(1), (c = o(i)), c && (c.c(), c.m(e, null))),
        _ & 520 && t !== (t = i[9](i[20])) && f(e, 'data-testid', t);
    },
    d(h) {
      h && A(e), c.d(), h && A(n), (l = !1), r();
    }
  };
}
function kS(i) {
  let e,
    t,
    n = i[25] + '',
    l,
    r,
    s,
    o,
    c,
    g;
  return {
    c() {
      (e = S('a')),
        (t = S('span')),
        (l = Pe(n)),
        f(t, 'class', 'fd-menu__title'),
        f(e, 'href', (r = i[8](i[20]))),
        f(e, 'class', (s = 'fd-menu__link ' + (i[25] === i[4] ? 'is-selected' : ''))),
        f(e, 'title', (o = i[25]));
    },
    m(h, _) {
      R(h, e, _), w(e, t), w(t, l), c || ((g = ne(e, 'click', i[15])), (c = !0));
    },
    p(h, _) {
      _ & 138 && n !== (n = h[25] + '') && Ne(l, n),
        _ & 264 && r !== (r = h[8](h[20])) && f(e, 'href', r),
        _ & 154 && s !== (s = 'fd-menu__link ' + (h[25] === h[4] ? 'is-selected' : '')) && f(e, 'class', s),
        _ & 138 && o !== (o = h[25]) && f(e, 'title', o);
    },
    d(h) {
      h && A(e), (c = !1), g();
    }
  };
}
function SS(i) {
  let e,
    t = i[2](i[20], i[25] === i[4]) + '',
    n;
  return {
    c() {
      (e = new dr(!1)), (n = ye()), (e.a = n);
    },
    m(l, r) {
      e.m(t, l, r), R(l, n, r);
    },
    p(l, r) {
      r & 158 && t !== (t = l[2](l[20], l[25] === l[4]) + '') && e.p(t);
    },
    d(l) {
      l && A(n), l && e.d();
    }
  };
}
function CS(i) {
  return { c: Ue, m: Ue, p: Ue, d: Ue };
}
function fh(i) {
  let e,
    t,
    n = { ctx: i, current: null, token: null, hasCatch: !1, pending: CS, then: wS, catch: vS, value: 25 };
  return (
    la((t = i[7](i[20].label, i[1].fallbackLabelResolver, i[20].id)), n),
    {
      c() {
        (e = ye()), n.block.c();
      },
      m(l, r) {
        R(l, e, r), n.block.m(l, (n.anchor = r)), (n.mount = () => e.parentNode), (n.anchor = e);
      },
      p(l, r) {
        (i = l),
          (n.ctx = i),
          (r & 138 && t !== (t = i[7](i[20].label, i[1].fallbackLabelResolver, i[20].id)) && la(t, n)) || h_(n, i, r);
      },
      d(l) {
        l && A(e), n.block.d(l), (n.token = null), (n = null);
      }
    }
  );
}
function ch(i) {
  let e,
    t = i[0],
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = hh(nh(i, t, l));
  return {
    c() {
      e = S('ul');
      for (let l = 0; l < n.length; l += 1) n[l].c();
      f(e, 'class', 'fd-menu__list fd-menu__list--bottom svelte-qht2wo');
    },
    m(l, r) {
      R(l, e, r);
      for (let s = 0; s < n.length; s += 1) n[s].m(e, null);
    },
    p(l, r) {
      if (r & 11009) {
        t = l[0];
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = nh(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = hh(o)), n[s].c(), n[s].m(e, null));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    d(l) {
      l && A(e), ct(n, l);
    }
  };
}
function dh(i) {
  let e,
    t,
    n,
    l = i[13](i[20].label) + '',
    r,
    s,
    o,
    c,
    g,
    h;
  function _() {
    return i[18](i[20]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('span')),
        (r = Pe(l)),
        (o = q()),
        f(n, 'class', 'fd-menu__title'),
        f(t, 'href', (s = i[8](i[20]))),
        f(t, 'class', 'fd-menu__link'),
        f(e, 'class', 'fd-menu__item'),
        f(e, 'data-testid', (c = i[9](i[20])));
    },
    m(p, m) {
      R(p, e, m), w(e, t), w(t, n), w(n, r), w(e, o), g || ((h = [ne(t, 'click', i[17]), ne(e, 'click', _)]), (g = !0));
    },
    p(p, m) {
      (i = p),
        m & 8193 && l !== (l = i[13](i[20].label) + '') && Ne(r, l),
        m & 257 && s !== (s = i[8](i[20])) && f(t, 'href', s),
        m & 513 && c !== (c = i[9](i[20])) && f(e, 'data-testid', c);
    },
    d(p) {
      p && A(e), (g = !1), Ze(h);
    }
  };
}
function hh(i) {
  let e,
    t = i[20].position === 'bottom' && dh(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, l) {
      n[20].position === 'bottom'
        ? t
          ? t.p(n, l)
          : ((t = dh(n)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function yS(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o = i[0] && i[0].length && rh(i),
    c = i[3] && i[3].length === 0 && oh(),
    g = i[3] && i[3].length && uh(i),
    h = i[0] && i[0].length && ch(i);
  return {
    c() {
      (e = S('nav')),
        o && o.c(),
        (t = q()),
        (n = S('ul')),
        c && c.c(),
        (l = q()),
        g && g.c(),
        (r = q()),
        h && h.c(),
        f(n, 'class', 'fd-menu__list'),
        f(n, 'id', 'context_menu_middle'),
        f(e, 'class', (s = 'fd-menu lui-ctx-switch-nav ' + (i[6] ? 'fd-menu--mobile' : '') + ' svelte-qht2wo'));
    },
    m(_, p) {
      R(_, e, p),
        o && o.m(e, null),
        w(e, t),
        w(e, n),
        c && c.m(n, null),
        w(n, l),
        g && g.m(n, null),
        w(e, r),
        h && h.m(e, null);
    },
    p(_, [p]) {
      _[0] && _[0].length ? (o ? o.p(_, p) : ((o = rh(_)), o.c(), o.m(e, t))) : o && (o.d(1), (o = null)),
        _[3] && _[3].length === 0 ? c || ((c = oh()), c.c(), c.m(n, l)) : c && (c.d(1), (c = null)),
        _[3] && _[3].length ? (g ? g.p(_, p) : ((g = uh(_)), g.c(), g.m(n, null))) : g && (g.d(1), (g = null)),
        _[0] && _[0].length ? (h ? h.p(_, p) : ((h = ch(_)), h.c(), h.m(e, null))) : h && (h.d(1), (h = null)),
        p & 64 &&
          s !== (s = 'fd-menu lui-ctx-switch-nav ' + (_[6] ? 'fd-menu--mobile' : '') + ' svelte-qht2wo') &&
          f(e, 'class', s);
    },
    i: Ue,
    o: Ue,
    d(_) {
      _ && A(e), o && o.d(), c && c.d(), g && g.d(), h && h.d();
    }
  };
}
const PS = () => {};
function NS(i, e, t) {
  let n,
    l = Ue,
    r = () => (l(), (l = Ao(y, O => t(13, (n = O)))), y);
  i.$$.on_destroy.push(() => l());
  let { actions: s = [] } = e,
    { config: o = {} } = e,
    { customOptionsRenderer: c } = e,
    { options: g = [] } = e,
    { selectedLabel: h } = e,
    { selectedOption: _ } = e,
    { isMobile: p } = e,
    { getNodeName: m } = e,
    { getRouteLink: v } = e,
    { getTestId: k } = e,
    { getTranslation: y } = e;
  r();
  const C = Wt();
  function T(O) {
    C('onActionClick', { node: O });
  }
  function N(O, j) {
    C('goToOption', { option: O, selectedOption: j });
  }
  const D = O => T(O),
    I = O => {
      Te.handleNavAnchorClickedWithoutMetaKey(O);
    },
    L = O => N(O, _),
    M = O => {
      Te.handleNavAnchorClickedWithoutMetaKey(O);
    },
    F = O => T(O);
  return (
    (i.$$set = O => {
      'actions' in O && t(0, (s = O.actions)),
        'config' in O && t(1, (o = O.config)),
        'customOptionsRenderer' in O && t(2, (c = O.customOptionsRenderer)),
        'options' in O && t(3, (g = O.options)),
        'selectedLabel' in O && t(4, (h = O.selectedLabel)),
        'selectedOption' in O && t(5, (_ = O.selectedOption)),
        'isMobile' in O && t(6, (p = O.isMobile)),
        'getNodeName' in O && t(7, (m = O.getNodeName)),
        'getRouteLink' in O && t(8, (v = O.getRouteLink)),
        'getTestId' in O && t(9, (k = O.getTestId)),
        'getTranslation' in O && r(t(10, (y = O.getTranslation)));
    }),
    [s, o, c, g, h, _, p, m, v, k, y, T, N, n, D, I, L, M, F]
  );
}
class R_ extends At {
  constructor(e) {
    super(),
      Lt(this, e, NS, yS, It, {
        actions: 0,
        config: 1,
        customOptionsRenderer: 2,
        options: 3,
        selectedLabel: 4,
        selectedOption: 5,
        isMobile: 6,
        getNodeName: 7,
        getRouteLink: 8,
        getTestId: 9,
        getTranslation: 10,
        onActionClick: 11,
        goToOption: 12
      });
  }
  get onActionClick() {
    return this.$$.ctx[11];
  }
  get goToOption() {
    return this.$$.ctx[12];
  }
}
function gh(i) {
  let e,
    t,
    n,
    l = !i[9] && _h(i),
    r = i[9] && i[8].contextSwitcherPopover && i[14] && ph(i);
  return {
    c() {
      l && l.c(), (e = q()), r && r.c(), (t = ye());
    },
    m(s, o) {
      l && l.m(s, o), R(s, e, o), r && r.m(s, o), R(s, t, o), (n = !0);
    },
    p(s, o) {
      s[9]
        ? l &&
          (Ee(),
          G(l, 1, 1, () => {
            l = null;
          }),
          De())
        : l
        ? (l.p(s, o), o[0] & 512 && B(l, 1))
        : ((l = _h(s)), l.c(), B(l, 1), l.m(e.parentNode, e)),
        s[9] && s[8].contextSwitcherPopover && s[14]
          ? r
            ? (r.p(s, o), o[0] & 17152 && B(r, 1))
            : ((r = ph(s)), r.c(), B(r, 1), r.m(t.parentNode, t))
          : r &&
            (Ee(),
            G(r, 1, 1, () => {
              r = null;
            }),
            De());
    },
    i(s) {
      n || (B(l), B(r), (n = !0));
    },
    o(s) {
      G(l), G(r), (n = !1);
    },
    d(s) {
      l && l.d(s), s && A(e), r && r.d(s), s && A(t);
    }
  };
}
function _h(i) {
  let e, t, n, l, r, s, o, c, g, h;
  function _(v, k) {
    return v[17] && v[2] !== v[5].defaultLabel ? TS : IS;
  }
  let p = _(i),
    m = p(i);
  return (
    (s = new R_({
      props: {
        actions: i[0],
        config: i[5],
        customOptionsRenderer: i[6],
        options: i[1],
        selectedLabel: i[4],
        selectedOption: i[2],
        getNodeName: i[18],
        getRouteLink: i[20],
        getTestId: i[19],
        getTranslation: i[16],
        isMobile: i[9]
      }
    })),
    s.$on('onActionClick', i[10]),
    s.$on('goToOption', i[11]),
    {
      c() {
        (e = S('div')),
          (t = S('div')),
          (n = S('div')),
          m.c(),
          (l = q()),
          (r = S('div')),
          Ge(s.$$.fragment),
          f(n, 'class', 'fd-popover__control'),
          f(r, 'class', 'fd-popover__body fd-popover__body--right svelte-11j1get'),
          f(r, 'aria-hidden', (o = !i[8].contextSwitcherPopover)),
          f(r, 'id', 'contextSwitcherPopover'),
          f(r, 'data-testid', 'luigi-contextswitcher-popover'),
          f(t, 'class', 'fd-popover fd-popover--right svelte-11j1get'),
          f(e, 'class', 'fd-shellbar__action fd-shellbar__action--desktop');
      },
      m(v, k) {
        R(v, e, k),
          w(e, t),
          w(t, n),
          m.m(n, null),
          w(t, l),
          w(t, r),
          He(s, r, null),
          (c = !0),
          g || ((h = ne(n, 'click', Ot(US))), (g = !0));
      },
      p(v, k) {
        p === (p = _(v)) && m ? m.p(v, k) : (m.d(1), (m = p(v)), m && (m.c(), m.m(n, null)));
        const y = {};
        k[0] & 1 && (y.actions = v[0]),
          k[0] & 32 && (y.config = v[5]),
          k[0] & 64 && (y.customOptionsRenderer = v[6]),
          k[0] & 2 && (y.options = v[1]),
          k[0] & 16 && (y.selectedLabel = v[4]),
          k[0] & 4 && (y.selectedOption = v[2]),
          k[0] & 512 && (y.isMobile = v[9]),
          s.$set(y),
          (!c || (k[0] & 256 && o !== (o = !v[8].contextSwitcherPopover))) && f(r, 'aria-hidden', o);
      },
      i(v) {
        c || (B(s.$$.fragment, v), (c = !0));
      },
      o(v) {
        G(s.$$.fragment, v), (c = !1);
      },
      d(v) {
        v && A(e), m.d(), ze(s), (g = !1), h();
      }
    }
  );
}
function IS(i) {
  let e, t, n, l, r, s;
  function o(h, _) {
    return h[2] && h[7] ? AS : LS;
  }
  let c = o(i),
    g = c(i);
  return {
    c() {
      (e = S('button')),
        g.c(),
        f(
          e,
          'class',
          'fd-button fd-button--transparent fd-button--menu fd-shellbar__button fd-shellbar__button--menu lui-ctx-switch-menu svelte-11j1get'
        ),
        f(e, 'aria-expanded', (t = i[8].contextSwitcherPopover || !1)),
        f(e, 'aria-haspopup', 'true'),
        f(e, 'title', (n = i[4] ? i[4] : i[5].defaultLabel)),
        f(e, 'aria-disabled', (l = !i[14])),
        f(e, 'data-testid', 'luigi-contextswitcher-button');
    },
    m(h, _) {
      R(h, e, _), g.m(e, null), r || ((s = ne(e, 'click', i[30])), (r = !0));
    },
    p(h, _) {
      c === (c = o(h)) && g ? g.p(h, _) : (g.d(1), (g = c(h)), g && (g.c(), g.m(e, null))),
        _[0] & 256 && t !== (t = h[8].contextSwitcherPopover || !1) && f(e, 'aria-expanded', t),
        _[0] & 48 && n !== (n = h[4] ? h[4] : h[5].defaultLabel) && f(e, 'title', n),
        _[0] & 16384 && l !== (l = !h[14]) && f(e, 'aria-disabled', l);
    },
    d(h) {
      h && A(e), g.d(), (r = !1), s();
    }
  };
}
function TS(i) {
  let e, t, n, l, r, s;
  function o(h, _) {
    return h[2] && h[7] ? VS : DS;
  }
  let c = o(i),
    g = c(i);
  return {
    c() {
      (e = S('a')),
        g.c(),
        f(e, 'href', i[13]),
        f(
          e,
          'class',
          'fd-button fd-button--transparent fd-shellbar__button fd-button--menu fd-shellbar__button--menu lui-ctx-switch-menu svelte-11j1get'
        ),
        f(e, 'aria-expanded', (t = i[8].contextSwitcherPopover || !1)),
        f(e, 'aria-haspopup', 'true'),
        f(e, 'title', (n = i[4] ? i[4] : i[5].defaultLabel)),
        f(e, 'aria-disabled', (l = !i[14])),
        f(e, 'data-testid', 'luigi-contextswitcher-button');
    },
    m(h, _) {
      R(h, e, _), g.m(e, null), r || ((s = ne(e, 'click', Tt(i[29]))), (r = !0));
    },
    p(h, _) {
      c === (c = o(h)) && g ? g.p(h, _) : (g.d(1), (g = c(h)), g && (g.c(), g.m(e, null))),
        _[0] & 8192 && f(e, 'href', h[13]),
        _[0] & 256 && t !== (t = h[8].contextSwitcherPopover || !1) && f(e, 'aria-expanded', t),
        _[0] & 48 && n !== (n = h[4] ? h[4] : h[5].defaultLabel) && f(e, 'title', n),
        _[0] & 16384 && l !== (l = !h[14]) && f(e, 'aria-disabled', l);
    },
    d(h) {
      h && A(e), g.d(), (r = !1), s();
    }
  };
}
function LS(i) {
  let e, t;
  function n(s, o) {
    return s[4] ? RS : ES;
  }
  let l = n(i),
    r = l(i);
  return {
    c() {
      r.c(), (e = q()), (t = S('i')), f(t, 'class', 'sap-icon--megamenu fd-shellbar__button--icon');
    },
    m(s, o) {
      r.m(s, o), R(s, e, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(e.parentNode, e)));
    },
    d(s) {
      r.d(s), s && A(e), s && A(t);
    }
  };
}
function AS(i) {
  let e,
    t = i[7](i[2]) + '',
    n;
  return {
    c() {
      (e = new dr(!1)), (n = ye()), (e.a = n);
    },
    m(l, r) {
      e.m(t, l, r), R(l, n, r);
    },
    p(l, r) {
      r[0] & 132 && t !== (t = l[7](l[2]) + '') && e.p(t);
    },
    d(l) {
      l && A(n), l && e.d();
    }
  };
}
function RS(i) {
  let e;
  return {
    c() {
      e = Pe(i[4]);
    },
    m(t, n) {
      R(t, e, n);
    },
    p(t, n) {
      n[0] & 16 && Ne(e, t[4]);
    },
    d(t) {
      t && A(e);
    }
  };
}
function ES(i) {
  let e = i[15](i[5].defaultLabel) + '',
    t;
  return {
    c() {
      t = Pe(e);
    },
    m(n, l) {
      R(n, t, l);
    },
    p(n, l) {
      l[0] & 32800 && e !== (e = n[15](n[5].defaultLabel) + '') && Ne(t, e);
    },
    d(n) {
      n && A(t);
    }
  };
}
function DS(i) {
  let e, t;
  function n(s, o) {
    return s[4] ? MS : OS;
  }
  let l = n(i),
    r = l(i);
  return {
    c() {
      r.c(), (e = q()), (t = S('i')), f(t, 'class', 'sap-icon--megamenu fd-shellbar__button--icon');
    },
    m(s, o) {
      r.m(s, o), R(s, e, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(e.parentNode, e)));
    },
    d(s) {
      r.d(s), s && A(e), s && A(t);
    }
  };
}
function VS(i) {
  let e,
    t = i[7](i[2]) + '',
    n;
  return {
    c() {
      (e = new dr(!1)), (n = ye()), (e.a = n);
    },
    m(l, r) {
      e.m(t, l, r), R(l, n, r);
    },
    p(l, r) {
      r[0] & 132 && t !== (t = l[7](l[2]) + '') && e.p(t);
    },
    d(l) {
      l && A(n), l && e.d();
    }
  };
}
function MS(i) {
  let e;
  return {
    c() {
      e = Pe(i[4]);
    },
    m(t, n) {
      R(t, e, n);
    },
    p(t, n) {
      n[0] & 16 && Ne(e, t[4]);
    },
    d(t) {
      t && A(e);
    }
  };
}
function OS(i) {
  let e = i[15](i[5].defaultLabel) + '',
    t;
  return {
    c() {
      t = Pe(e);
    },
    m(n, l) {
      R(n, t, l);
    },
    p(n, l) {
      l[0] & 32800 && e !== (e = n[15](n[5].defaultLabel) + '') && Ne(t, e);
    },
    d(n) {
      n && A(t);
    }
  };
}
function ph(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C,
    T,
    N = !i[4] && mh(i),
    D = i[4] && bh(i);
  return (
    (h = new R_({
      props: {
        actions: i[0],
        config: i[5],
        customOptionsRenderer: i[6],
        options: i[1],
        selectedLabel: i[4],
        selectedOption: i[2],
        getNodeName: i[18],
        getRouteLink: i[20],
        getTestId: i[19],
        getTranslation: i[16],
        isMobile: i[9]
      }
    })),
    h.$on('onActionClick', i[10]),
    h.$on('goToOption', i[11]),
    {
      c() {
        (e = S('div')),
          (t = S('div')),
          (n = S('div')),
          (l = S('div')),
          (r = S('div')),
          (s = S('h2')),
          N && N.c(),
          (o = q()),
          D && D.c(),
          (c = q()),
          (g = S('div')),
          Ge(h.$$.fragment),
          (_ = q()),
          (p = S('footer')),
          (m = S('div')),
          (v = S('div')),
          (k = S('button')),
          (k.textContent = 'Cancel'),
          f(s, 'class', 'fd-title fd-title--h5'),
          f(s, 'id', 'dialog-title-3'),
          f(r, 'class', 'fd-bar__element'),
          f(l, 'class', 'fd-bar__left'),
          f(n, 'class', 'fd-dialog__header fd-bar fd-bar--header'),
          f(g, 'class', 'fd-dialog__body fd-dialog__body--no-vertical-padding'),
          f(k, 'class', 'fd-button fd-button--light fd-dialog__decisive-button'),
          f(k, 'data-testid', 'mobile-topnav-close'),
          f(v, 'class', 'fd-bar__element'),
          f(m, 'class', 'fd-bar__right'),
          f(p, 'class', 'fd-dialog__footer fd-bar fd-bar--cosy fd-bar--footer'),
          f(t, 'class', 'fd-dialog__content fd-dialog__content--mobile'),
          f(t, 'role', 'dialog'),
          f(t, 'aria-modal', 'true'),
          f(t, 'aria-labelledby', 'dialog-title-3'),
          f(e, 'class', 'fd-dialog fd-dialog--active');
      },
      m(I, L) {
        R(I, e, L),
          w(e, t),
          w(t, n),
          w(n, l),
          w(l, r),
          w(r, s),
          N && N.m(s, null),
          w(s, o),
          D && D.m(s, null),
          w(t, c),
          w(t, g),
          He(h, g, null),
          w(t, _),
          w(t, p),
          w(p, m),
          w(m, v),
          w(v, k),
          (y = !0),
          C || ((T = [ne(k, 'click', i[12]), ne(e, 'click', Ot(BS))]), (C = !0));
      },
      p(I, L) {
        I[4] ? N && (N.d(1), (N = null)) : N ? N.p(I, L) : ((N = mh(I)), N.c(), N.m(s, o)),
          I[4] ? (D ? D.p(I, L) : ((D = bh(I)), D.c(), D.m(s, null))) : D && (D.d(1), (D = null));
        const M = {};
        L[0] & 1 && (M.actions = I[0]),
          L[0] & 32 && (M.config = I[5]),
          L[0] & 64 && (M.customOptionsRenderer = I[6]),
          L[0] & 2 && (M.options = I[1]),
          L[0] & 16 && (M.selectedLabel = I[4]),
          L[0] & 4 && (M.selectedOption = I[2]),
          L[0] & 512 && (M.isMobile = I[9]),
          h.$set(M);
      },
      i(I) {
        y || (B(h.$$.fragment, I), (y = !0));
      },
      o(I) {
        G(h.$$.fragment, I), (y = !1);
      },
      d(I) {
        I && A(e), N && N.d(), D && D.d(), ze(h), (C = !1), Ze(T);
      }
    }
  );
}
function mh(i) {
  let e = i[15](i[5].defaultLabel) + '',
    t;
  return {
    c() {
      t = Pe(e);
    },
    m(n, l) {
      R(n, t, l);
    },
    p(n, l) {
      l[0] & 32800 && e !== (e = n[15](n[5].defaultLabel) + '') && Ne(t, e);
    },
    d(n) {
      n && A(t);
    }
  };
}
function bh(i) {
  let e;
  return {
    c() {
      e = Pe(i[4]);
    },
    m(t, n) {
      R(t, e, n);
    },
    p(t, n) {
      n[0] & 16 && Ne(e, t[4]);
    },
    d(t) {
      t && A(e);
    }
  };
}
function FS(i) {
  let e,
    t,
    n = i[3] && gh(i);
  return {
    c() {
      n && n.c(), (e = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, e, r), (t = !0);
    },
    p(l, r) {
      l[3]
        ? n
          ? (n.p(l, r), r[0] & 8 && B(n, 1))
          : ((n = gh(l)), n.c(), B(n, 1), n.m(e.parentNode, e))
        : n &&
          (Ee(),
          G(n, 1, 1, () => {
            n = null;
          }),
          De());
    },
    i(l) {
      t || (B(n), (t = !0));
    },
    o(l) {
      G(n), (t = !1);
    },
    d(l) {
      n && n.d(l), l && A(e);
    }
  };
}
const US = () => {},
  BS = () => {};
function WS(i, e, t) {
  let n, l;
  const r = Wt();
  let { contextSwitcherEnabled: s = !1 } = e,
    { dropDownStates: o = {} } = e,
    { selectedLabel: c = null } = e,
    { config: g = {} } = e,
    { actions: h = [] } = e,
    { options: _ = null } = e,
    p = !0,
    { selectedOption: m } = e,
    { fallbackLabelResolver: v = null } = e,
    { pathParams: k } = e,
    { customOptionsRenderer: y } = e,
    { customSelectedOptionRenderer: C } = e,
    { isMobile: T } = e,
    { contextSwitcherToggle: N = !1 } = e,
    { defaultLabel: D } = e,
    I,
    L = vt('getUnsavedChangesModalPromise'),
    M = vt('store'),
    F = vt('getTranslation');
  mi(i, F, x => t(15, (l = x)));
  let O = !1,
    j,
    fe;
  Kt(async () => {
    Fn.doOnStoreChange(
      M,
      async () => {
        const x = re.getConfigValue('navigation.contextSwitcher');
        if (
          (t(3, (s = !!x)),
          !!s &&
            (t(6, (y = ee.isFunction(x.customOptionsRenderer) ? x.customOptionsRenderer : void 0)),
            t(7, (C = ee.isFunction(x.customSelectedOptionRenderer) ? x.customSelectedOptionRenderer : void 0)),
            t(5, (g = x)),
            t(1, (_ = void 0)),
            x))
        ) {
          t(28, (p = x.alwaysShowDropdown !== !1)),
            t(0, (h = await re.getConfigValueAsync('navigation.contextSwitcher.actions')));
          const be = it.getCurrentPath();
          t(21, (v = x.fallbackLabelResolver)),
            cn.resetFallbackLabelCache(),
            x.lazyloadOptions || (await Ce()),
            cn.isContextSwitcherDetailsView(be, x.parentNodePath) && (await H(be));
        }
      },
      ['navigation.contextSwitcher']
    ),
      pe.addRouteChangeListener(x => H(x)),
      Pn.addEventListener('message', x => {
        !Ie.getValidMessageSource(x) ||
          (x.data && x.data.msg === 'luigi.refresh-context-switcher' && (t(1, (_ = null)), Ce()));
      }),
      t(22, (D = g.defaultLabel));
  }),
    On(() => {
      O !== N && ((O = N), Ce());
    });
  function X(x, be, ke) {
    return x ? Promise.resolve(x) : cn.getFallbackLabel(be, ke);
  }
  function Q(x) {
    return x.testId ? x.testId : Te.prepareForTests(x.pathSegment, x.label);
  }
  function ce(x) {
    return pe.getNodeHref(x, k);
  }
  async function Ce() {
    t(1, (_ = await cn.fetchOptions(_)));
    const x = g || {},
      be = x.parentNodePath,
      ke = x.fallbackLabelResolver,
      we = it.getCurrentPath();
    t(2, (m = await cn.getSelectedOption(we, _, be))),
      t(4, (c = await cn.getSelectedLabel(we, _, be, ke))),
      t(13, (j = await cn.getSelectedNode(we, _, be))),
      (I = x.preserveSubPathOnSwitch);
  }
  async function H(x) {
    const be = g || {},
      ke = be.parentNodePath,
      we = be.fallbackLabelResolver;
    t(2, (m = await cn.getSelectedOption(x, _, ke))),
      t(4, (c = await cn.getSelectedLabel(x, _, ke, we))),
      t(13, (j = await cn.getSelectedNode(x, _, ke)));
  }
  async function ae(x) {
    let be = x.detail.node;
    (be.clickHandler && !(await be.clickHandler(be))) ||
      (setTimeout(() => {
        $(be.link);
      }),
      T && r('toggleDropdownState'));
  }
  function $(x) {
    L().then(() => {
      it.navigateTo(x);
    });
  }
  function K(x) {
    let be = x.detail.option,
      ke = x.detail.selectedOption;
    L().then(() => {
      I && ke ? it.navigateTo(cn.getNodePathFromCurrentPath(be, ke)) : it.navigateTo(be.link),
        T && r('toggleDropdownState');
    });
  }
  function le() {
    r('toggleDropdownState');
    const x = o || {};
    JSON.parse(x.contextSwitcherPopover) && Ce();
  }
  const ve = () => {
      n && le();
    },
    ue = () => {
      n && le();
    };
  return (
    (i.$$set = x => {
      'contextSwitcherEnabled' in x && t(3, (s = x.contextSwitcherEnabled)),
        'dropDownStates' in x && t(8, (o = x.dropDownStates)),
        'selectedLabel' in x && t(4, (c = x.selectedLabel)),
        'config' in x && t(5, (g = x.config)),
        'actions' in x && t(0, (h = x.actions)),
        'options' in x && t(1, (_ = x.options)),
        'selectedOption' in x && t(2, (m = x.selectedOption)),
        'fallbackLabelResolver' in x && t(21, (v = x.fallbackLabelResolver)),
        'pathParams' in x && t(23, (k = x.pathParams)),
        'customOptionsRenderer' in x && t(6, (y = x.customOptionsRenderer)),
        'customSelectedOptionRenderer' in x && t(7, (C = x.customSelectedOptionRenderer)),
        'isMobile' in x && t(9, (T = x.isMobile)),
        'contextSwitcherToggle' in x && t(24, (N = x.contextSwitcherToggle)),
        'defaultLabel' in x && t(22, (D = x.defaultLabel));
    }),
    (i.$$.update = () => {
      i.$$.dirty[0] & 268435463 && t(14, (n = p || (h && h.length > 0) || (_ && _.length > 1) || !m));
    }),
    [h, _, m, s, c, g, y, C, o, T, ae, K, le, j, n, l, F, fe, X, Q, ce, v, D, k, N, Ce, H, $, p, ve, ue]
  );
}
class E_ extends At {
  constructor(e) {
    super(),
      Lt(
        this,
        e,
        WS,
        FS,
        It,
        {
          contextSwitcherEnabled: 3,
          dropDownStates: 8,
          selectedLabel: 4,
          config: 5,
          actions: 0,
          options: 1,
          selectedOption: 2,
          fallbackLabelResolver: 21,
          pathParams: 23,
          customOptionsRenderer: 6,
          customSelectedOptionRenderer: 7,
          isMobile: 9,
          contextSwitcherToggle: 24,
          defaultLabel: 22,
          fetchOptions: 25,
          setSelectedContext: 26,
          onActionClick: 10,
          goToPath: 27,
          goToOption: 11,
          toggleDropdownState: 12
        },
        null,
        [-1, -1]
      );
  }
  get fetchOptions() {
    return this.$$.ctx[25];
  }
  get setSelectedContext() {
    return this.$$.ctx[26];
  }
  get onActionClick() {
    return this.$$.ctx[10];
  }
  get goToPath() {
    return this.$$.ctx[27];
  }
  get goToOption() {
    return this.$$.ctx[11];
  }
  get toggleDropdownState() {
    return this.$$.ctx[12];
  }
}
const { window: HS } = Ui;
function vh(i, e, t) {
  const n = i.slice();
  return (n[22] = e[t]), n;
}
function wh(i) {
  let e,
    t,
    n,
    l = !i[2] && kh(i),
    r = i[2] && i[3].productSwitcherPopover && Nh(i);
  return {
    c() {
      l && l.c(), (e = q()), r && r.c(), (t = ye());
    },
    m(s, o) {
      l && l.m(s, o), R(s, e, o), r && r.m(s, o), R(s, t, o), (n = !0);
    },
    p(s, o) {
      s[2] ? l && (l.d(1), (l = null)) : l ? l.p(s, o) : ((l = kh(s)), l.c(), l.m(e.parentNode, e)),
        s[2] && s[3].productSwitcherPopover
          ? r
            ? (r.p(s, o), o & 12 && B(r, 1))
            : ((r = Nh(s)), r.c(), B(r, 1), r.m(t.parentNode, t))
          : r &&
            (Ee(),
            G(r, 1, 1, () => {
              r = null;
            }),
            De());
    },
    i(s) {
      n || (B(r), (n = !0));
    },
    o(s) {
      G(r), (n = !1);
    },
    d(s) {
      l && l.d(s), s && A(e), r && r.d(s), s && A(t);
    }
  };
}
function kh(i) {
  let e, t, n, l, r, s, o, c, g, h, _, p, m, v, k, y, C;
  function T(M, F) {
    return F & 2 && (s = null), s == null && (s = !!M[11](M[1])), s ? qS : zS;
  }
  let N = T(i, -1),
    D = N(i),
    I = i[0],
    L = [];
  for (let M = 0; M < I.length; M += 1) L[M] = Ph(vh(i, I, M));
  return {
    c() {
      (e = S('div')),
        (t = S('div')),
        (n = S('div')),
        (l = S('div')),
        (r = S('button')),
        D.c(),
        (h = q()),
        (_ = S('div')),
        (p = S('div')),
        (m = S('ul'));
      for (let M = 0; M < L.length; M += 1) L[M].c();
      f(r, 'class', 'fd-button fd-button--transparent fd-shellbar__button fd-product-switch__control'),
        f(r, 'aria-expanded', (o = i[3].productSwitcherPopover || !1)),
        f(r, 'aria-haspopup', 'true'),
        f(r, 'title', (c = i[1].label)),
        f(r, 'data-testid', (g = i[14](i[1]))),
        f(l, 'class', 'fd-popover__control'),
        f(m, 'class', 'fd-product-switch__list'),
        f(p, 'class', (v = yn(i[9]) + ' svelte-1e1qi56')),
        f(_, 'class', 'fd-popover__body fd-popover__body--right'),
        f(_, 'aria-hidden', (k = !i[3].productSwitcherPopover)),
        f(_, 'id', 'productSwitcherPopover'),
        f(n, 'class', 'fd-popover fd-popover--right'),
        f(t, 'class', 'fd-product-switch'),
        f(e, 'class', 'fd-shellbar__action fd-shellbar__action--desktop');
    },
    m(M, F) {
      R(M, e, F), w(e, t), w(t, n), w(n, l), w(l, r), D.m(r, null), w(n, h), w(n, _), w(_, p), w(p, m);
      for (let O = 0; O < L.length; O += 1) L[O].m(m, null);
      y || ((C = [ne(r, 'click', Ot(i[7])), ne(l, 'click', Ot(XS))]), (y = !0));
    },
    p(M, F) {
      if (
        (N === (N = T(M, F)) && D ? D.p(M, F) : (D.d(1), (D = N(M)), D && (D.c(), D.m(r, null))),
        F & 8 && o !== (o = M[3].productSwitcherPopover || !1) && f(r, 'aria-expanded', o),
        F & 2 && c !== (c = M[1].label) && f(r, 'title', c),
        F & 2 && g !== (g = M[14](M[1])) && f(r, 'data-testid', g),
        F & 64561)
      ) {
        I = M[0];
        let O;
        for (O = 0; O < I.length; O += 1) {
          const j = vh(M, I, O);
          L[O] ? L[O].p(j, F) : ((L[O] = Ph(j)), L[O].c(), L[O].m(m, null));
        }
        for (; O < L.length; O += 1) L[O].d(1);
        L.length = I.length;
      }
      F & 512 && v !== (v = yn(M[9]) + ' svelte-1e1qi56') && f(p, 'class', v),
        F & 8 && k !== (k = !M[3].productSwitcherPopover) && f(_, 'aria-hidden', k);
    },
    d(M) {
      M && A(e), D.d(), ct(L, M), (y = !1), Ze(C);
    }
  };
}
function zS(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')), rt(e.src, (t = i[1].icon)) || f(e, 'src', t), f(e, 'alt', (n = i[1].altText ? i[1].altText : ''));
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r & 2 && !rt(e.src, (t = l[1].icon)) && f(e, 'src', t),
        r & 2 && n !== (n = l[1].altText ? l[1].altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function qS(i) {
  let e, t;
  return {
    c() {
      (e = S('i')), f(e, 'class', (t = 'sap-icon ' + i[10](i[1].icon)));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l & 2 && t !== (t = 'sap-icon ' + n[10](n[1].icon)) && f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Sh(i) {
  let e, t, n, l, r, s;
  function o(_, p) {
    return _[4] ? KS : GS;
  }
  let c = o(i),
    g = c(i);
  function h() {
    return i[17](i[22]);
  }
  return {
    c() {
      (e = S('li')),
        g.c(),
        (t = q()),
        f(e, 'class', (n = 'fd-product-switch__item ' + (i[22].selected ? 'selected' : ''))),
        f(e, 'data-testid', (l = i[14](i[22])));
    },
    m(_, p) {
      R(_, e, p), g.m(e, null), w(e, t), r || ((s = ne(e, 'click', h)), (r = !0));
    },
    p(_, p) {
      (i = _),
        c === (c = o(i)) && g ? g.p(i, p) : (g.d(1), (g = c(i)), g && (g.c(), g.m(e, t))),
        p & 1 && n !== (n = 'fd-product-switch__item ' + (i[22].selected ? 'selected' : '')) && f(e, 'class', n),
        p & 1 && l !== (l = i[14](i[22])) && f(e, 'data-testid', l);
    },
    d(_) {
      _ && A(e), g.d(), (r = !1), s();
    }
  };
}
function GS(i) {
  let e,
    t,
    n,
    l,
    r,
    s = i[12](i[22]) + '',
    o,
    c,
    g = i[13](i[22]);
  function h(v, k) {
    return k & 1 && (t = null), t == null && (t = !!v[11](v[22])), t ? jS : JS;
  }
  let _ = h(i, -1),
    p = _(i),
    m = g && Ch(i);
  return {
    c() {
      (e = S('div')),
        p.c(),
        (n = q()),
        (l = S('div')),
        (r = S('div')),
        (o = Pe(s)),
        (c = q()),
        m && m.c(),
        f(e, 'class', 'lui-product-switch__icon svelte-1e1qi56'),
        f(r, 'class', 'fd-product-switch__title'),
        f(l, 'class', 'fd-product-switch__text');
    },
    m(v, k) {
      R(v, e, k), p.m(e, null), R(v, n, k), R(v, l, k), w(l, r), w(r, o), w(l, c), m && m.m(l, null);
    },
    p(v, k) {
      _ === (_ = h(v, k)) && p ? p.p(v, k) : (p.d(1), (p = _(v)), p && (p.c(), p.m(e, null))),
        k & 1 && s !== (s = v[12](v[22]) + '') && Ne(o, s),
        k & 1 && (g = v[13](v[22])),
        g ? (m ? m.p(v, k) : ((m = Ch(v)), m.c(), m.m(l, null))) : m && (m.d(1), (m = null));
    },
    d(v) {
      v && A(e), p.d(), v && A(n), v && A(l), m && m.d();
    }
  };
}
function KS(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o = i[12](i[22]) + '',
    c,
    g,
    h = i[13](i[22]),
    _,
    p,
    m;
  function v(T, N) {
    return N & 1 && (n = null), n == null && (n = !!T[11](T[22])), n ? QS : YS;
  }
  let k = v(i, -1),
    y = k(i),
    C = h && yh(i);
  return {
    c() {
      (e = S('a')),
        (t = S('div')),
        y.c(),
        (l = q()),
        (r = S('div')),
        (s = S('div')),
        (c = Pe(o)),
        (g = q()),
        C && C.c(),
        f(t, 'class', 'lui-product-switch__icon svelte-1e1qi56'),
        f(s, 'class', 'fd-product-switch__title'),
        f(r, 'class', 'fd-product-switch__text'),
        f(e, 'href', (_ = i[15](i[22]))),
        f(e, 'class', 'fd-menu__link');
    },
    m(T, N) {
      R(T, e, N),
        w(e, t),
        y.m(t, null),
        w(e, l),
        w(e, r),
        w(r, s),
        w(s, c),
        w(r, g),
        C && C.m(r, null),
        p || ((m = ne(e, 'click', i[16])), (p = !0));
    },
    p(T, N) {
      k === (k = v(T, N)) && y ? y.p(T, N) : (y.d(1), (y = k(T)), y && (y.c(), y.m(t, null))),
        N & 1 && o !== (o = T[12](T[22]) + '') && Ne(c, o),
        N & 1 && (h = T[13](T[22])),
        h ? (C ? C.p(T, N) : ((C = yh(T)), C.c(), C.m(r, null))) : C && (C.d(1), (C = null)),
        N & 1 && _ !== (_ = T[15](T[22])) && f(e, 'href', _);
    },
    d(T) {
      T && A(e), y.d(), C && C.d(), (p = !1), m();
    }
  };
}
function JS(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')),
        rt(e.src, (t = i[22].icon)) || f(e, 'src', t),
        f(e, 'alt', (n = i[22].altText ? i[22].altText : '')),
        f(e, 'class', 'svelte-1e1qi56');
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r & 1 && !rt(e.src, (t = l[22].icon)) && f(e, 'src', t),
        r & 1 && n !== (n = l[22].altText ? l[22].altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function jS(i) {
  let e, t;
  return {
    c() {
      (e = S('i')),
        f(e, 'class', (t = 'sap-icon ' + (i[22].icon && i[11](i[22]) ? i[10](i[22].icon) : '') + ' svelte-1e1qi56'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l & 1 &&
        t !== (t = 'sap-icon ' + (n[22].icon && n[11](n[22]) ? n[10](n[22].icon) : '') + ' svelte-1e1qi56') &&
        f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Ch(i) {
  let e,
    t = i[13](i[22]) + '',
    n;
  return {
    c() {
      (e = S('div')), (n = Pe(t)), f(e, 'class', 'fd-product-switch__subtitle');
    },
    m(l, r) {
      R(l, e, r), w(e, n);
    },
    p(l, r) {
      r & 1 && t !== (t = l[13](l[22]) + '') && Ne(n, t);
    },
    d(l) {
      l && A(e);
    }
  };
}
function YS(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')),
        rt(e.src, (t = i[22].icon)) || f(e, 'src', t),
        f(e, 'alt', (n = i[22].altText ? i[22].altText : '')),
        f(e, 'class', 'svelte-1e1qi56');
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r & 1 && !rt(e.src, (t = l[22].icon)) && f(e, 'src', t),
        r & 1 && n !== (n = l[22].altText ? l[22].altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function QS(i) {
  let e, t;
  return {
    c() {
      (e = S('i')),
        f(e, 'class', (t = 'sap-icon ' + (i[22].icon && i[11](i[22]) ? i[10](i[22].icon) : '') + ' svelte-1e1qi56'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l & 1 &&
        t !== (t = 'sap-icon ' + (n[22].icon && n[11](n[22]) ? n[10](n[22].icon) : '') + ' svelte-1e1qi56') &&
        f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function yh(i) {
  let e,
    t = i[13](i[22]) + '',
    n;
  return {
    c() {
      (e = S('div')), (n = Pe(t)), f(e, 'class', 'fd-product-switch__subtitle');
    },
    m(l, r) {
      R(l, e, r), w(e, n);
    },
    p(l, r) {
      r & 1 && t !== (t = l[13](l[22]) + '') && Ne(n, t);
    },
    d(l) {
      l && A(e);
    }
  };
}
function Ph(i) {
  let e,
    t = i[22].label && Sh(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, l) {
      n[22].label ? (t ? t.p(n, l) : ((t = Sh(n)), t.c(), t.m(e.parentNode, e))) : t && (t.d(1), (t = null));
    },
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function Nh(i) {
  let e, t;
  return (
    (e = new L_({
      props: {
        nodes: i[0],
        label: i[1].label,
        hasOpenUIicon: i[11],
        getNodeLabel: i[12],
        getNodeSubtitle: i[13],
        getTestId: i[14]
      }
    })),
    e.$on('click', i[7]),
    e.$on('listClick', i[6]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l & 1 && (r.nodes = n[0]), l & 2 && (r.label = n[1].label), e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function ZS(i) {
  let e = i[0] && i[0].length && Object.keys(i[0][0]).length,
    t,
    n,
    l,
    r,
    s = e && wh(i);
  return {
    c() {
      s && s.c(), (t = ye());
    },
    m(o, c) {
      s && s.m(o, c), R(o, t, c), (n = !0), l || ((r = ne(HS, 'resize', ca)), (l = !0));
    },
    p(o, [c]) {
      c & 1 && (e = o[0] && o[0].length && Object.keys(o[0][0]).length),
        e
          ? s
            ? (s.p(o, c), c & 1 && B(s, 1))
            : ((s = wh(o)), s.c(), B(s, 1), s.m(t.parentNode, t))
          : s &&
            (Ee(),
            G(s, 1, 1, () => {
              s = null;
            }),
            De());
    },
    i(o) {
      n || (B(s), (n = !0));
    },
    o(o) {
      G(s), (n = !1);
    },
    d(o) {
      s && s.d(o), o && A(t), (l = !1), r();
    }
  };
}
function ca() {
  let i = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${i}px`);
}
const XS = () => {};
function $S(i, e, t) {
  const n = Wt();
  let { productSwitcherItems: l } = e,
    { isMobile: r } = e,
    { config: s } = e,
    { dropDownStates: o } = e,
    c = vt('store'),
    g = vt('getUnsavedChangesModalPromise'),
    h,
    { addNavHrefForAnchor: _ } = e;
  Kt(async () => {
    Fn.doOnStoreChange(
      c,
      async () => {
        t(1, (s = Te.getProductSwitcherConfig())),
          s && (t(0, (l = await re.getConfigValueAsync('navigation.productSwitcher.items'))), N()),
          ca();
      },
      ['navigation.productSwitcher']
    );
  });
  function p(F) {
    g().then(() => {
      it.navigateToLink(F);
    }),
      v();
  }
  function m(F) {
    p(F.detail);
  }
  function v() {
    n('toggleDropdownState');
  }
  function k(F) {
    return Te.renderIconClassName(F);
  }
  function y(F) {
    return Te.isOpenUIiconName(F.icon);
  }
  function C(F) {
    return ht.getTranslation(F.label);
  }
  function T(F) {
    return ht.getTranslation(F.subTitle);
  }
  function N() {
    Te.getProductSwitcherColumnsNumber() === 3
      ? t(9, (h = 'fd-product-switch__body fd-product-switch__body--col-3'))
      : t(9, (h = 'fd-product-switch__body'));
  }
  function D(F) {
    return F.testId ? F.testId : Te.prepareForTests(F.label);
  }
  function I(F) {
    return pe.getNodeHref(F);
  }
  const L = F => {
      Te.handleNavAnchorClickedWithoutMetaKey(F);
    },
    M = F => p(F);
  return (
    (i.$$set = F => {
      'productSwitcherItems' in F && t(0, (l = F.productSwitcherItems)),
        'isMobile' in F && t(2, (r = F.isMobile)),
        'config' in F && t(1, (s = F.config)),
        'dropDownStates' in F && t(3, (o = F.dropDownStates)),
        'addNavHrefForAnchor' in F && t(4, (_ = F.addNavHrefForAnchor));
    }),
    [l, s, r, o, _, p, m, v, ca, h, k, y, C, T, D, I, L, M]
  );
}
class D_ extends At {
  constructor(e) {
    super(),
      Lt(this, e, $S, ZS, It, {
        productSwitcherItems: 0,
        isMobile: 2,
        config: 1,
        dropDownStates: 3,
        addNavHrefForAnchor: 4,
        onActionClick: 5,
        onActionClickExternal: 6,
        toggleDropdownState: 7,
        setViewportHeightVariable: 8
      });
  }
  get onActionClick() {
    return this.$$.ctx[5];
  }
  get onActionClickExternal() {
    return this.$$.ctx[6];
  }
  get toggleDropdownState() {
    return this.$$.ctx[7];
  }
  get setViewportHeightVariable() {
    return ca;
  }
}
function Ih(i, e, t) {
  const n = i.slice();
  return (n[31] = e[t]), (n[33] = t), n;
}
function xS(i) {
  let e, t, n;
  return {
    c() {
      (e = S('input')),
        f(e, 'type', 'text'),
        f(
          e,
          'class',
          'fd-input fd-input-group__input fd-shellbar__input-group-input luigi-search__input svelte-1jkaxo8'
        ),
        f(e, 'data-testid', 'luigi-search-input'),
        (e.autofocus = !0);
    },
    m(l, r) {
      R(l, e, r), i[19](e), e.focus(), t || ((n = ne(e, 'keyup', i[18])), (t = !0));
    },
    p: Ue,
    d(l) {
      l && A(e), i[19](null), (t = !1), n();
    }
  };
}
function eC(i) {
  let e;
  return {
    c() {
      (e = S('input')),
        f(e, 'type', 'text'),
        f(
          e,
          'class',
          'fd-input fd-input-group__input fd-shellbar__input-group-input luigi-search__input svelte-1jkaxo8'
        ),
        f(e, 'data-testid', 'luigi-search-input__no-handlers'),
        (e.autofocus = !0);
    },
    m(t, n) {
      R(t, e, n), e.focus();
    },
    p: Ue,
    d(t) {
      t && A(e);
    }
  };
}
function tC(i) {
  let e;
  return {
    c() {
      e = S('div');
    },
    m(t, n) {
      R(t, e, n), i[23](e);
    },
    p: Ue,
    d(t) {
      t && A(e), i[23](null);
    }
  };
}
function nC(i) {
  let e,
    t,
    n,
    l = i[5] && Th(i);
  return {
    c() {
      (e = S('div')),
        (t = S('nav')),
        l && l.c(),
        f(t, 'class', 'fd-menu svelte-1jkaxo8'),
        f(e, 'class', 'fd-popover__body fd-popover__body--right luigi-search-popover__body svelte-1jkaxo8'),
        f(e, 'aria-hidden', (n = !i[0]));
    },
    m(r, s) {
      R(r, e, s), w(e, t), l && l.m(t, null);
    },
    p(r, s) {
      r[5] ? (l ? l.p(r, s) : ((l = Th(r)), l.c(), l.m(t, null))) : l && (l.d(1), (l = null)),
        s[0] & 1 && n !== (n = !r[0]) && f(e, 'aria-hidden', n);
    },
    d(r) {
      r && A(e), l && l.d();
    }
  };
}
function Th(i) {
  let e,
    t = i[5],
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = Lh(Ih(i, t, l));
  return {
    c() {
      e = S('ul');
      for (let l = 0; l < n.length; l += 1) n[l].c();
      f(e, 'class', 'fd-menu__list fd-menu__list--top');
    },
    m(l, r) {
      R(l, e, r);
      for (let s = 0; s < n.length; s += 1) n[s].m(e, null);
      i[22](e);
    },
    p(l, r) {
      if (r[0] & 26152) {
        t = l[5];
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = Ih(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = Lh(o)), n[s].c(), n[s].m(e, null));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    d(l) {
      l && A(e), ct(n, l), i[22](null);
    }
  };
}
function iC(i) {
  let e,
    t = i[10](i[31], i[3], i[33]) + '',
    n;
  return {
    c() {
      (e = new dr(!1)), (n = ye()), (e.a = n);
    },
    m(l, r) {
      e.m(t, l, r), R(l, n, r);
    },
    p(l, r) {
      r[0] & 40 && t !== (t = l[10](l[31], l[3], l[33]) + '') && e.p(t);
    },
    d(l) {
      l && A(n), l && e.d();
    }
  };
}
function lC(i) {
  let e,
    t,
    n,
    l = i[31].label + '',
    r,
    s,
    o,
    c = i[31].description + '',
    g,
    h,
    _;
  return {
    c() {
      (e = S('a')),
        (t = S('div')),
        (n = S('div')),
        (r = Pe(l)),
        (s = q()),
        (o = S('div')),
        (g = Pe(c)),
        f(n, 'class', 'fd-product-switch__title svelte-1jkaxo8'),
        f(o, 'class', 'fd-product-switch__subtitle'),
        f(t, 'class', 'fd-product-switch__text'),
        f(e, 'class', 'fd-menu__link svelte-1jkaxo8');
    },
    m(p, m) {
      R(p, e, m), w(e, t), w(t, n), w(n, r), w(t, s), w(t, o), w(o, g), h || ((_ = ne(e, 'click', Tt(sC))), (h = !0));
    },
    p(p, m) {
      m[0] & 32 && l !== (l = p[31].label + '') && Ne(r, l),
        m[0] & 32 && c !== (c = p[31].description + '') && Ne(g, c);
    },
    d(p) {
      p && A(e), (h = !1), _();
    }
  };
}
function Lh(i) {
  let e, t, n, l;
  function r(h, _) {
    return h[9] ? iC : lC;
  }
  let s = r(i),
    o = s(i);
  function c(...h) {
    return i[20](i[31], ...h);
  }
  function g(...h) {
    return i[21](i[31], ...h);
  }
  return {
    c() {
      (e = S('li')),
        o.c(),
        (t = q()),
        f(e, 'class', 'fd-menu__item luigi-search-result-item__' + i[33] + ' svelte-1jkaxo8'),
        f(e, 'tabindex', '0');
    },
    m(h, _) {
      R(h, e, _), o.m(e, null), w(e, t), n || ((l = [ne(e, 'click', c), ne(e, 'keyup', g)]), (n = !0));
    },
    p(h, _) {
      (i = h), s === (s = r(i)) && o ? o.p(i, _) : (o.d(1), (o = s(i)), o && (o.c(), o.m(e, t)));
    },
    d(h) {
      h && A(e), o.d(), (n = !1), Ze(l);
    }
  };
}
function rC(i) {
  let e, t, n, l, r, s, o, c, g, h, _, p, m, v, k;
  function y(L, M) {
    return L[7] && L[7].disableInputHandlers ? eC : xS;
  }
  let C = y(i),
    T = C(i);
  function N(L, M) {
    return L[8] ? tC : nC;
  }
  let D = N(i),
    I = D(i);
  return {
    c() {
      (e = S('div')),
        (t = S('div')),
        (n = S('div')),
        (l = S('div')),
        T.c(),
        (r = q()),
        I.c(),
        (c = q()),
        (g = S('div')),
        (h = S('div')),
        (_ = S('button')),
        (p = S('i')),
        f(l, 'class', 'fd-input-group fd-shellbar__input-group'),
        f(n, 'class', 'fd-popover__control luigi-search svelte-1jkaxo8'),
        f(n, 'aria-hidden', (s = !i[4])),
        f(n, 'aria-haspopup', 'true'),
        f(t, 'class', 'fd-popover svelte-1jkaxo8'),
        f(e, 'class', (o = 'fd-shellbar__action ' + (i[4] ? 'luigi-search-shell__mobile' : '') + ' svelte-1jkaxo8')),
        f(p, 'class', 'sap-icon sap-icon--search'),
        f(_, 'class', 'fd-button fd-button--transparent fd-shellbar__button'),
        f(_, 'aria-haspopup', 'true'),
        f(_, 'aria-expanded', (m = !i[4])),
        f(_, 'data-testid', 'luigi-search-btn-desktop'),
        f(g, 'class', 'fd-shellbar__action fd-shellbar__action--desktop');
    },
    m(L, M) {
      R(L, e, M),
        w(e, t),
        w(t, n),
        w(n, l),
        T.m(l, null),
        w(n, r),
        I.m(n, null),
        R(L, c, M),
        R(L, g, M),
        w(g, h),
        w(h, _),
        w(_, p),
        v ||
          ((k = [
            ne(window, 'click', i[11]),
            ne(window, 'blur', i[11]),
            ne(n, 'click', Ot(aC)),
            ne(_, 'click', i[6]),
            ne(h, 'click', Ot(oC))
          ]),
          (v = !0));
    },
    p(L, M) {
      C === (C = y(L)) && T ? T.p(L, M) : (T.d(1), (T = C(L)), T && (T.c(), T.m(l, null))),
        D === (D = N(L)) && I ? I.p(L, M) : (I.d(1), (I = D(L)), I && (I.c(), I.m(n, null))),
        M[0] & 16 && s !== (s = !L[4]) && f(n, 'aria-hidden', s),
        M[0] & 16 &&
          o !== (o = 'fd-shellbar__action ' + (L[4] ? 'luigi-search-shell__mobile' : '') + ' svelte-1jkaxo8') &&
          f(e, 'class', o),
        M[0] & 16 && m !== (m = !L[4]) && f(_, 'aria-expanded', m);
    },
    i: Ue,
    o: Ue,
    d(L) {
      L && A(e), T.d(), I.d(), L && A(c), L && A(g), (v = !1), Ze(k);
    }
  };
}
const sC = () => {},
  aC = () => {},
  oC = () => {};
function uC(i, e, t) {
  let { isSearchFieldVisible: n } = e,
    { searchResult: l = [] } = e,
    { displaySearchResult: r } = e,
    { displayCustomSearchResult: s } = e,
    { inputElem: o } = e,
    { luigiCustomSearchRenderer__slot: c } = e,
    { luigiCustomSearchItemRenderer__slotContainer: g } = e,
    { globalSearchConfig: h } = e;
  const _ = Wt(),
    p = {
      fireItemSelected: $ => {
        m.searchProvider.onSearchResultItemSelected($);
      }
    };
  let m = {},
    v,
    k;
  Kt(async () => {
    t(7, (m = h));
    let $ = o;
    const K = C(m.searchProvider);
    K && ($.placeholder = K), y();
  }),
    On(() => {
      t(7, (m = h)), y();
    });
  function y() {
    !m.searchProvider ||
      (t(8, (v = ee.isFunction(m.searchProvider.customSearchResultRenderer))),
      t(9, (k = ee.isFunction(m.searchProvider.customSearchResultItemRenderer))));
  }
  function C($) {
    if (!$ || !$.inputPlaceholder) return;
    const K = ht.getCurrentLocale();
    if (ee.isFunction($.inputPlaceholder)) return $.inputPlaceholder();
    if (typeof $.inputPlaceholder == 'string') {
      const le = ht.getTranslation($.inputPlaceholder);
      return !!le && le.trim().length > 0 ? le : $.inputPlaceholder;
    }
    if (typeof $.inputPlaceholder == 'object') return $.inputPlaceholder[K];
  }
  function T($, K, le) {
    return (
      setTimeout(() => {
        m.searchProvider.customSearchResultItemRenderer($, K.children[le], p);
      }),
      ''
    );
  }
  function N() {
    _('closeSearchResult');
  }
  function D({ keyCode: $ }) {
    m && m.searchProvider
      ? ee.isFunction(m.searchProvider.onEnter) && $ === pi
        ? m.searchProvider.onEnter()
        : ee.isFunction(m.searchProvider.onEscape) && $ === _i
        ? m.searchProvider.onEscape()
        : $ === Oi
        ? r &&
          (document.querySelector('.luigi-search-result-item__0').childNodes[0].setAttribute('aria-selected', 'true'),
          document.querySelector('.luigi-search-result-item__0').focus())
        : ee.isFunction(m.searchProvider.onInput) && m.searchProvider.onInput()
      : console.warn('GlobalSearch is not available.');
  }
  function I($) {
    let K = g.children;
    if (K)
      for (let le = 0; le < K.length; le++) {
        let { childNodes: ve, nextSibling: ue, previousSibling: x } = K[le],
          be;
        if (ve[0].getAttribute('aria-selected') === 'true') {
          $ === Oi && (be = ue !== null ? ue : K[0]),
            $ === Al && (be = x !== null ? x : K[K.length - 1]),
            ve[0].setAttribute('aria-selected', 'false'),
            be.childNodes[0].setAttribute('aria-selected', 'true'),
            be.focus();
          break;
        }
      }
  }
  function L() {
    let $ = g.children;
    if ($)
      for (let K = 0; K < $.length; K++) {
        let le = $[K];
        le.childNodes[0].getAttribute('aria-selected') === 'true' &&
          le.childNodes[0].setAttribute('aria-selected', 'false');
      }
  }
  function M($) {
    m && ee.isFunction(m.searchProvider.onSearchResultItemSelected)
      ? m.searchProvider.onSearchResultItemSelected($)
      : ee.isFunction(m.searchProvider.onEscape) && event.keyCode === _i && m.searchProvider.onEscape();
  }
  function F($, { keyCode: K }) {
    K === pi && m.searchProvider.onSearchResultItemSelected($),
      K === Al || K === Oi
        ? I(K)
        : ee.isFunction(m.searchProvider.onEscape) &&
          K === _i &&
          (L(),
          setTimeout(() => {
            o.focus();
          }),
          m.searchProvider.onEscape());
  }
  function O($) {
    let K = $.pathObject;
    K.externalLink ? it.navigateToLink(K) : _('handleSearchNavigation', { node: K });
  }
  function j() {
    o && o.focus();
  }
  function fe() {
    if (
      (n
        ? t(0, (r = !1))
        : setTimeout(() => {
            j();
          }),
      _('toggleSearch', { isSearchFieldVisible: n, inputElem: o, luigiCustomSearchRenderer__slot: c }),
      m && m.searchProvider && ee.isFunction(m.searchProvider.toggleSearch))
    ) {
      const $ = n === void 0 ? !0 : !n;
      m.searchProvider.toggleSearch(o, $);
    }
  }
  const X = $ => D($);
  function Q($) {
    xe[$ ? 'unshift' : 'push'](() => {
      (o = $), t(1, o);
    });
  }
  const ce = ($, K) => M($),
    Ce = ($, K) => F($, K);
  function H($) {
    xe[$ ? 'unshift' : 'push'](() => {
      (g = $), t(3, g);
    });
  }
  function ae($) {
    xe[$ ? 'unshift' : 'push'](() => {
      (c = $), t(2, c);
    });
  }
  return (
    (i.$$set = $ => {
      'isSearchFieldVisible' in $ && t(4, (n = $.isSearchFieldVisible)),
        'searchResult' in $ && t(5, (l = $.searchResult)),
        'displaySearchResult' in $ && t(0, (r = $.displaySearchResult)),
        'displayCustomSearchResult' in $ && t(15, (s = $.displayCustomSearchResult)),
        'inputElem' in $ && t(1, (o = $.inputElem)),
        'luigiCustomSearchRenderer__slot' in $ && t(2, (c = $.luigiCustomSearchRenderer__slot)),
        'luigiCustomSearchItemRenderer__slotContainer' in $ &&
          t(3, (g = $.luigiCustomSearchItemRenderer__slotContainer)),
        'globalSearchConfig' in $ && t(16, (h = $.globalSearchConfig));
    }),
    [r, o, c, g, n, l, fe, m, v, k, T, N, D, M, F, s, h, O, X, Q, ce, Ce, H, ae]
  );
}
class fC extends At {
  constructor(e) {
    super(),
      Lt(
        this,
        e,
        uC,
        rC,
        It,
        {
          isSearchFieldVisible: 4,
          searchResult: 5,
          displaySearchResult: 0,
          displayCustomSearchResult: 15,
          inputElem: 1,
          luigiCustomSearchRenderer__slot: 2,
          luigiCustomSearchItemRenderer__slotContainer: 3,
          globalSearchConfig: 16,
          onActionClick: 17,
          toggleSearch: 6
        },
        null,
        [-1, -1]
      );
  }
  get onActionClick() {
    return this.$$.ctx[17];
  }
  get toggleSearch() {
    return this.$$.ctx[6];
  }
}
function Ah(i, e, t) {
  const n = i.slice();
  return (n[40] = e[t]), (n[42] = t), n;
}
function cC(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o,
    c = i[11] && Rh(i);
  return {
    c() {
      (e = S('input')),
        (t = q()),
        (n = S('span')),
        c && c.c(),
        (l = q()),
        (r = S('button')),
        (r.innerHTML = '<i class="sap-icon--search"></i>'),
        f(e, 'type', 'text'),
        f(
          e,
          'class',
          'fd-input fd-input-group__input fd-shellbar__input-group-input luigi-search__input svelte-1yci3dk'
        ),
        f(e, 'data-testid', 'luigi-search-input'),
        f(r, 'aria-label', 'button-search'),
        f(r, 'class', 'fd-shellbar__button fd-button fd-button--transparent lui-search-btn svelte-1yci3dk'),
        f(
          n,
          'class',
          'fd-input-group__addon fd-shellbar__input-group__addon fd-input-group__addon--button lui-search-btn-ctn svelte-1yci3dk'
        );
    },
    m(g, h) {
      R(g, e, h),
        i[26](e),
        R(g, t, h),
        R(g, n, h),
        c && c.m(n, null),
        w(n, l),
        w(n, r),
        s || ((o = [ne(e, 'keyup', i[25]), ne(e, 'input', i[27]), ne(r, 'click', i[17])]), (s = !0));
    },
    p(g, h) {
      g[11] ? (c ? c.p(g, h) : ((c = Rh(g)), c.c(), c.m(n, l))) : c && (c.d(1), (c = null));
    },
    d(g) {
      g && A(e), i[26](null), g && A(t), g && A(n), c && c.d(), (s = !1), Ze(o);
    }
  };
}
function dC(i) {
  let e;
  return {
    c() {
      (e = S('input')),
        f(e, 'type', 'text'),
        f(
          e,
          'class',
          'fd-input fd-input-group__input fd-shellbar__input-group-input luigi-search__input svelte-1yci3dk'
        ),
        f(e, 'data-testid', 'luigi-search-input__no-handlers');
    },
    m(t, n) {
      R(t, e, n);
    },
    p: Ue,
    d(t) {
      t && A(e);
    }
  };
}
function Rh(i) {
  let e, t, n;
  return {
    c() {
      (e = S('button')),
        (e.innerHTML = '<i class="sap-icon--decline lui-clear-search svelte-1yci3dk"></i>'),
        f(e, 'aria-label', 'button-decline'),
        f(e, 'class', 'fd-shellbar__button fd-button fd-button--transparent svelte-1yci3dk');
    },
    m(l, r) {
      R(l, e, r), t || ((n = ne(e, 'click', i[19])), (t = !0));
    },
    p: Ue,
    d(l) {
      l && A(e), (t = !1), n();
    }
  };
}
function hC(i) {
  let e;
  return {
    c() {
      e = S('div');
    },
    m(t, n) {
      R(t, e, n), i[31](e);
    },
    p: Ue,
    d(t) {
      t && A(e), i[31](null);
    }
  };
}
function gC(i) {
  let e,
    t,
    n,
    l = i[4] && Eh(i);
  return {
    c() {
      (e = S('div')),
        (t = S('nav')),
        l && l.c(),
        f(t, 'class', 'fd-menu'),
        f(e, 'class', 'fd-popover__body fd-popover__body--right luigi-search-popover__body svelte-1yci3dk'),
        f(e, 'aria-hidden', (n = !i[0]));
    },
    m(r, s) {
      R(r, e, s), w(e, t), l && l.m(t, null);
    },
    p(r, s) {
      r[4] ? (l ? l.p(r, s) : ((l = Eh(r)), l.c(), l.m(t, null))) : l && (l.d(1), (l = null)),
        s[0] & 1 && n !== (n = !r[0]) && f(e, 'aria-hidden', n);
    },
    d(r) {
      r && A(e), l && l.d();
    }
  };
}
function Eh(i) {
  let e,
    t = i[4],
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = Dh(Ah(i, t, l));
  return {
    c() {
      e = S('ul');
      for (let l = 0; l < n.length; l += 1) n[l].c();
      f(e, 'class', 'fd-menu__list fd-menu__list--top');
    },
    m(l, r) {
      R(l, e, r);
      for (let s = 0; s < n.length; s += 1) n[s].m(e, null);
      i[30](e);
    },
    p(l, r) {
      if (r[0] & 3163160) {
        t = l[4];
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = Ah(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = Dh(o)), n[s].c(), n[s].m(e, null));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    d(l) {
      l && A(e), ct(n, l), i[30](null);
    }
  };
}
function _C(i) {
  let e,
    t = i[14](i[40], i[3], i[42]) + '',
    n;
  return {
    c() {
      (e = new dr(!1)), (n = ye()), (e.a = n);
    },
    m(l, r) {
      e.m(t, l, r), R(l, n, r);
    },
    p(l, r) {
      r[0] & 24 && t !== (t = l[14](l[40], l[3], l[42]) + '') && e.p(t);
    },
    d(l) {
      l && A(n), l && e.d();
    }
  };
}
function pC(i) {
  let e,
    t,
    n,
    l = i[40].label + '',
    r,
    s,
    o,
    c = i[40].description + '',
    g,
    h,
    _;
  return {
    c() {
      (e = S('a')),
        (t = S('div')),
        (n = S('div')),
        (r = Pe(l)),
        (s = q()),
        (o = S('div')),
        (g = Pe(c)),
        f(n, 'class', 'fd-product-switch__title'),
        f(o, 'class', 'fd-product-switch__subtitle'),
        f(t, 'class', 'fd-product-switch__text'),
        f(e, 'class', 'fd-menu__link');
    },
    m(p, m) {
      R(p, e, m), w(e, t), w(t, n), w(n, r), w(t, s), w(t, o), w(o, g), h || ((_ = ne(e, 'click', Tt(bC))), (h = !0));
    },
    p(p, m) {
      m[0] & 16 && l !== (l = p[40].label + '') && Ne(r, l),
        m[0] & 16 && c !== (c = p[40].description + '') && Ne(g, c);
    },
    d(p) {
      p && A(e), (h = !1), _();
    }
  };
}
function Dh(i) {
  let e, t, n, l;
  function r(h, _) {
    return h[10] ? _C : pC;
  }
  let s = r(i),
    o = s(i);
  function c(...h) {
    return i[28](i[40], ...h);
  }
  function g(...h) {
    return i[29](i[40], ...h);
  }
  return {
    c() {
      (e = S('li')),
        o.c(),
        (t = q()),
        f(e, 'class', 'fd-menu__item luigi-search-result-item__' + i[42] + ' svelte-1yci3dk'),
        f(e, 'tabindex', '0');
    },
    m(h, _) {
      R(h, e, _), o.m(e, null), w(e, t), n || ((l = [ne(e, 'click', c), ne(e, 'keyup', g)]), (n = !0));
    },
    p(h, _) {
      (i = h), s === (s = r(i)) && o ? o.p(i, _) : (o.d(1), (o = s(i)), o && (o.c(), o.m(e, t)));
    },
    d(h) {
      h && A(e), o.d(), (n = !1), Ze(l);
    }
  };
}
function Vh(i) {
  let e, t, n, l, r, s, o;
  return {
    c() {
      (e = S('div')),
        (t = S('div')),
        (n = S('button')),
        (l = S('i')),
        f(l, 'class', 'sap-icon sap-icon--search'),
        f(n, 'class', 'fd-button fd-button--transparent fd-shellbar__button'),
        f(n, 'aria-haspopup', 'true'),
        f(n, 'aria-expanded', (r = !i[5])),
        f(n, 'data-testid', 'luigi-search-btn-desktop'),
        f(t, 'class', 'fd-shellbar__group'),
        f(e, 'class', 'lui-global-search-btn svelte-1yci3dk');
    },
    m(c, g) {
      R(c, e, g), w(e, t), w(t, n), w(n, l), s || ((o = [ne(n, 'click', i[6]), ne(t, 'click', Ot(wC))]), (s = !0));
    },
    p(c, g) {
      g[0] & 32 && r !== (r = !c[5]) && f(n, 'aria-expanded', r);
    },
    d(c) {
      c && A(e), (s = !1), Ze(o);
    }
  };
}
function Mh(i) {
  let e,
    t,
    n = i[12](i[7]) + '',
    l,
    r,
    s,
    o,
    c;
  return {
    c() {
      (e = S('div')),
        (t = S('button')),
        (l = Pe(n)),
        f(t, 'class', 'fd-button fd-button--transparent fd-shellbar__button svelte-1yci3dk'),
        f(t, 'aria-haspopup', 'true'),
        f(t, 'aria-expanded', (r = !i[5])),
        f(t, 'data-testid', 'luigi-search-cancel-btn'),
        f(
          e,
          'class',
          (s =
            'fd-shellbar__group lui-global-search-cancel-btn ' +
            (i[5] ? 'lui-global-search-cancel-btn--active' : '') +
            ' svelte-1yci3dk')
        );
    },
    m(g, h) {
      R(g, e, h), w(e, t), w(t, l), o || ((c = ne(t, 'click', Ot(i[32]))), (o = !0));
    },
    p(g, h) {
      h[0] & 4224 && n !== (n = g[12](g[7]) + '') && Ne(l, n),
        h[0] & 32 && r !== (r = !g[5]) && f(t, 'aria-expanded', r),
        h[0] & 32 &&
          s !==
            (s =
              'fd-shellbar__group lui-global-search-cancel-btn ' +
              (g[5] ? 'lui-global-search-cancel-btn--active' : '') +
              ' svelte-1yci3dk') &&
          f(e, 'class', s);
    },
    d(g) {
      g && A(e), (o = !1), c();
    }
  };
}
function mC(i) {
  let e, t, n, l, r, s, o, c, g, h, _, p;
  function m(I, L) {
    return I[8] && I[8].disableInputHandlers ? dC : cC;
  }
  let v = m(i),
    k = v(i);
  function y(I, L) {
    return I[9] ? hC : gC;
  }
  let C = y(i),
    T = C(i),
    N = !i[5] && Vh(i),
    D = i[5] && Mh(i);
  return {
    c() {
      (e = S('div')),
        (t = S('div')),
        (n = S('div')),
        (l = S('div')),
        k.c(),
        (r = q()),
        T.c(),
        (c = q()),
        N && N.c(),
        (g = q()),
        D && D.c(),
        (h = ye()),
        f(l, 'class', 'fd-input-group fd-shellbar__input-group luigi-search-input-ctn svelte-1yci3dk'),
        f(n, 'class', 'fd-popover__control luigi-search fd-shellbar__group svelte-1yci3dk'),
        f(n, 'aria-hidden', (s = !i[5])),
        f(n, 'aria-haspopup', 'true'),
        f(t, 'class', 'fd-popover svelte-1yci3dk'),
        f(
          e,
          'class',
          (o =
            'fd-shellbar__action lui-global-search-input ' +
            (i[5] ? 'lui-global-search-mobile--active' : '') +
            ' svelte-1yci3dk')
        );
    },
    m(I, L) {
      R(I, e, L),
        w(e, t),
        w(t, n),
        w(n, l),
        k.m(l, null),
        w(n, r),
        T.m(n, null),
        R(I, c, L),
        N && N.m(I, L),
        R(I, g, L),
        D && D.m(I, L),
        R(I, h, L),
        _ || ((p = [ne(window, 'click', i[15]), ne(window, 'blur', i[15]), ne(n, 'click', Ot(vC))]), (_ = !0));
    },
    p(I, L) {
      v === (v = m(I)) && k ? k.p(I, L) : (k.d(1), (k = v(I)), k && (k.c(), k.m(l, null))),
        C === (C = y(I)) && T ? T.p(I, L) : (T.d(1), (T = C(I)), T && (T.c(), T.m(n, null))),
        L[0] & 32 && s !== (s = !I[5]) && f(n, 'aria-hidden', s),
        L[0] & 32 &&
          o !==
            (o =
              'fd-shellbar__action lui-global-search-input ' +
              (I[5] ? 'lui-global-search-mobile--active' : '') +
              ' svelte-1yci3dk') &&
          f(e, 'class', o),
        I[5] ? N && (N.d(1), (N = null)) : N ? N.p(I, L) : ((N = Vh(I)), N.c(), N.m(g.parentNode, g)),
        I[5] ? (D ? D.p(I, L) : ((D = Mh(I)), D.c(), D.m(h.parentNode, h))) : D && (D.d(1), (D = null));
    },
    i: Ue,
    o: Ue,
    d(I) {
      I && A(e), k.d(), T.d(), I && A(c), N && N.d(I), I && A(g), D && D.d(I), I && A(h), (_ = !1), Ze(p);
    }
  };
}
const bC = () => {},
  vC = () => {},
  wC = () => {};
function kC(i, e, t) {
  let n,
    { searchResult: l = [] } = e,
    { displaySearchResult: r } = e,
    { displayCustomSearchResult: s } = e,
    { inputElem: o } = e,
    { luigiCustomSearchRenderer__slot: c } = e,
    { luigiCustomSearchItemRenderer__slotContainer: g } = e,
    { globalSearchConfig: h } = e;
  const _ = Wt(),
    p = {
      fireItemSelected: ie => {
        k.searchProvider.onSearchResultItemSelected(ie);
      }
    };
  let m = ul.globalSearchCenteredCancelButton,
    { isSearchFieldVisible: v } = e,
    k = {},
    y,
    C,
    T = !1,
    N = vt('getTranslation');
  mi(i, N, ie => t(12, (n = ie))),
    Kt(async () => {
      t(8, (k = h)), t(7, (m = k.globalSearchCenteredCancelButton ? k.globalSearchCenteredCancelButton : m));
      let ie = o;
      const Re = I(k.searchProvider);
      Re && (ie.placeholder = Re), D(), Kf.handleVisibilityGlobalSearch();
      const Le = document.querySelector('.lui-global-search');
      Le &&
        new ResizeObserver(tt => {
          Kf.handleVisibilityGlobalSearch();
        }).observe(Le);
    }),
    On(() => {
      t(8, (k = h)), D(), j();
    });
  function D() {
    t(9, (y = k.searchProvider && ee.isFunction(k.searchProvider.customSearchResultRenderer))),
      t(10, (C = k.searchProvider && ee.isFunction(k.searchProvider.customSearchResultItemRenderer)));
  }
  function I(ie) {
    if (!ie || !ie.inputPlaceholder) return;
    const Re = ht.getCurrentLocale();
    if (ee.isFunction(ie.inputPlaceholder)) return ie.inputPlaceholder();
    if (typeof ie.inputPlaceholder == 'string') {
      const Le = ht.getTranslation(ie.inputPlaceholder);
      return !!Le && Le.trim().length > 0 ? Le : ie.inputPlaceholder;
    }
    if (typeof ie.inputPlaceholder == 'object') return ie.inputPlaceholder[Re];
  }
  function L(ie, Re, Le) {
    return (
      setTimeout(() => {
        k.searchProvider.customSearchResultItemRenderer(ie, Re.children[Le], p);
      }),
      ''
    );
  }
  function M() {
    _('closeSearchResult');
  }
  function F({ keyCode: ie }) {
    k
      ? ee.isFunction(k.searchProvider.onEnter) && ie === pi
        ? k.searchProvider.onEnter()
        : ee.isFunction(k.searchProvider.onEscape) && ie === _i
        ? k.searchProvider.onEscape()
        : ie === Oi
        ? r &&
          (document.querySelector('.luigi-search-result-item__0').childNodes[0].setAttribute('aria-selected', 'true'),
          document.querySelector('.luigi-search-result-item__0').focus())
        : ee.isFunction(k.searchProvider.onInput) && k.searchProvider.onInput()
      : console.warn('GlobalSearchCentered is not available.');
  }
  function O() {
    k && ee.isFunction(k.searchProvider.onSearchBtnClick) && k.searchProvider.onSearchBtnClick();
  }
  function j() {
    o && o.value ? t(11, (T = !0)) : t(11, (T = !1));
  }
  function fe() {
    t(1, (o.value = ''), o), M(), t(11, (T = !1));
  }
  function X(ie) {
    let Re = g.children;
    if (Re)
      for (let Le = 0; Le < Re.length; Le++) {
        let { childNodes: _e, nextSibling: tt, previousSibling: Ft } = Re[Le],
          Jt;
        if (_e[0].getAttribute('aria-selected') === 'true') {
          ie === Oi && (Jt = tt !== null ? tt : Re[0]),
            ie === Al && (Jt = Ft !== null ? Ft : Re[Re.length - 1]),
            _e[0].setAttribute('aria-selected', 'false'),
            Jt.childNodes[0].setAttribute('aria-selected', 'true'),
            Jt.focus();
          break;
        }
      }
  }
  function Q() {
    let ie = g.children;
    if (ie)
      for (let Re = 0; Re < ie.length; Re++) {
        let Le = ie[Re];
        Le.childNodes[0].getAttribute('aria-selected') === 'true' &&
          Le.childNodes[0].setAttribute('aria-selected', 'false');
      }
  }
  function ce(ie) {
    k && ee.isFunction(k.searchProvider.onSearchResultItemSelected)
      ? k.searchProvider.onSearchResultItemSelected(ie)
      : ee.isFunction(k.searchProvider.onEscape) && event.keyCode === _i && k.searchProvider.onEscape();
  }
  function Ce(ie, { keyCode: Re }) {
    Re === pi && k.searchProvider.onSearchResultItemSelected(ie),
      Re === Al || Re === Oi
        ? X(Re)
        : ee.isFunction(k.searchProvider.onEscape) &&
          Re === _i &&
          (Q(),
          setTimeout(() => {
            o.focus();
          }),
          k.searchProvider.onEscape());
  }
  function H(ie) {
    let Re = ie.pathObject;
    Re.externalLink ? it.navigateToLink(Re) : _('handleSearchNavigation', { node: Re });
  }
  function ae() {
    o && o.focus();
  }
  function $() {
    if (
      (v
        ? t(0, (r = !1))
        : setTimeout(() => {
            ae();
          }),
      _('toggleSearch', { isSearchFieldVisible: v, inputElem: o, luigiCustomSearchRenderer__slot: c }),
      ee.isFunction(k.searchProvider.toggleSearch))
    ) {
      const ie = v === void 0 ? !0 : !v;
      k.searchProvider.toggleSearch(o, ie);
    }
  }
  const K = ie => F(ie);
  function le(ie) {
    xe[ie ? 'unshift' : 'push'](() => {
      (o = ie), t(1, o);
    });
  }
  const ve = () => j(),
    ue = (ie, Re) => ce(ie),
    x = (ie, Re) => Ce(ie, Re);
  function be(ie) {
    xe[ie ? 'unshift' : 'push'](() => {
      (g = ie), t(3, g);
    });
  }
  function ke(ie) {
    xe[ie ? 'unshift' : 'push'](() => {
      (c = ie), t(2, c);
    });
  }
  const we = () => $();
  return (
    (i.$$set = ie => {
      'searchResult' in ie && t(4, (l = ie.searchResult)),
        'displaySearchResult' in ie && t(0, (r = ie.displaySearchResult)),
        'displayCustomSearchResult' in ie && t(22, (s = ie.displayCustomSearchResult)),
        'inputElem' in ie && t(1, (o = ie.inputElem)),
        'luigiCustomSearchRenderer__slot' in ie && t(2, (c = ie.luigiCustomSearchRenderer__slot)),
        'luigiCustomSearchItemRenderer__slotContainer' in ie &&
          t(3, (g = ie.luigiCustomSearchItemRenderer__slotContainer)),
        'globalSearchConfig' in ie && t(23, (h = ie.globalSearchConfig)),
        'isSearchFieldVisible' in ie && t(5, (v = ie.isSearchFieldVisible));
    }),
    [r, o, c, g, l, v, $, m, k, y, C, T, n, N, L, M, F, O, j, fe, ce, Ce, s, h, H, K, le, ve, ue, x, be, ke, we]
  );
}
class SC extends At {
  constructor(e) {
    super(),
      Lt(
        this,
        e,
        kC,
        mC,
        It,
        {
          searchResult: 4,
          displaySearchResult: 0,
          displayCustomSearchResult: 22,
          inputElem: 1,
          luigiCustomSearchRenderer__slot: 2,
          luigiCustomSearchItemRenderer__slotContainer: 3,
          globalSearchConfig: 23,
          isSearchFieldVisible: 5,
          onActionClick: 24,
          toggleSearch: 6
        },
        null,
        [-1, -1]
      );
  }
  get onActionClick() {
    return this.$$.ctx[24];
  }
  get toggleSearch() {
    return this.$$.ctx[6];
  }
}
function Oh(i) {
  let e, t;
  function n(s, o) {
    return o & 1 && (e = null), e == null && (e = !!s[1](s[0])), e ? yC : CC;
  }
  let l = n(i, -1),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function CC(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')),
        f(e, 'class', 'fd-top-nav__icon sap-icon'),
        rt(e.src, (t = i[0].icon)) || f(e, 'src', t),
        f(e, 'alt', (n = i[0].altText ? i[0].altText : ''));
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r & 1 && !rt(e.src, (t = l[0].icon)) && f(e, 'src', t),
        r & 1 && n !== (n = l[0].altText ? l[0].altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function yC(i) {
  let e, t;
  return {
    c() {
      (e = S('span')), f(e, 'class', (t = 'fd-top-nav__icon sap-icon ' + i[2](i[0].icon)));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l & 1 && t !== (t = 'fd-top-nav__icon sap-icon ' + n[2](n[0].icon)) && f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Fh(i) {
  let e,
    t = i[3](i[0]) + '',
    n,
    l,
    r,
    s;
  return (
    (r = new xr({ props: { node: i[0] } })),
    {
      c() {
        (e = S('span')), (n = Pe(t)), (l = q()), Ge(r.$$.fragment);
      },
      m(o, c) {
        R(o, e, c), w(e, n), w(e, l), He(r, e, null), (s = !0);
      },
      p(o, c) {
        (!s || c & 1) && t !== (t = o[3](o[0]) + '') && Ne(n, t);
        const g = {};
        c & 1 && (g.node = o[0]), r.$set(g);
      },
      i(o) {
        s || (B(r.$$.fragment, o), (s = !0));
      },
      o(o) {
        G(r.$$.fragment, o), (s = !1);
      },
      d(o) {
        o && A(e), ze(r);
      }
    }
  );
}
function PC(i) {
  let e,
    t,
    n,
    l = i[0].icon && Oh(i),
    r = (!i[0].icon || i[0].showLabel) && Fh(i);
  return {
    c() {
      l && l.c(), (e = q()), r && r.c(), (t = ye());
    },
    m(s, o) {
      l && l.m(s, o), R(s, e, o), r && r.m(s, o), R(s, t, o), (n = !0);
    },
    p(s, [o]) {
      s[0].icon ? (l ? l.p(s, o) : ((l = Oh(s)), l.c(), l.m(e.parentNode, e))) : l && (l.d(1), (l = null)),
        !s[0].icon || s[0].showLabel
          ? r
            ? (r.p(s, o), o & 1 && B(r, 1))
            : ((r = Fh(s)), r.c(), B(r, 1), r.m(t.parentNode, t))
          : r &&
            (Ee(),
            G(r, 1, 1, () => {
              r = null;
            }),
            De());
    },
    i(s) {
      n || (B(r), (n = !0));
    },
    o(s) {
      G(r), (n = !1);
    },
    d(s) {
      l && l.d(s), s && A(e), r && r.d(s), s && A(t);
    }
  };
}
function NC(i, e, t) {
  let { node: n } = e;
  function l(o) {
    return Te.isOpenUIiconName(o.icon);
  }
  function r(o) {
    return Te.renderIconClassName(o);
  }
  function s(o) {
    return ht.getTranslation(o.label);
  }
  return (
    (i.$$set = o => {
      'node' in o && t(0, (n = o.node));
    }),
    [n, l, r, s]
  );
}
class Mo extends At {
  constructor(e) {
    super(), Lt(this, e, NC, PC, It, { node: 0 });
  }
}
const { Boolean: V_, window: Uh } = Ui;
function Bh(i, e, t) {
  const n = i.slice();
  return (n[111] = e[t]), (n[113] = t), n;
}
function Wh(i, e, t) {
  const n = i.slice();
  return (n[111] = e[t]), (n[114] = e), (n[113] = t), n;
}
function IC(i) {
  let e, t;
  return (
    (e = new T_({ props: { isHidden: !0, addNavHrefForAnchor: i[28] } })),
    e.$on('toggleDropdownState', i[103]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 268435456 && (r.addNavHrefForAnchor = n[28]), e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function TC(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v = (i[3] === 'simple' || i[3] === 'simpleMobileOnly' || i[3] === 'Fiori3') && Hh(i);
  function k(L) {
    i[59](L);
  }
  let y = { pathData: i[30], pathParams: i[31], addNavHrefForAnchor: i[28] };
  i[6] !== void 0 && (y.dropDownStates = i[6]),
    (l = new Kk({ props: y })),
    xe.push(() => bt(l, 'dropDownStates', k)),
    l.$on('toggleDropdownState', i[39]),
    l.$on('handleClick', i[37]);
  let C = i[18] && i[19] && zh(i),
    T = (!i[0] || i[1]) && qh(i),
    N = (i[18] || (i[7] && i[30].length > 0)) && Kh(i),
    D = (i[0] || i[16]) && sg(i),
    I = i[12] && ag(i);
  return {
    c() {
      (e = S('div')),
        (t = S('div')),
        v && v.c(),
        (n = q()),
        Ge(l.$$.fragment),
        (s = q()),
        C && C.c(),
        (o = q()),
        (c = S('div')),
        T && T.c(),
        (g = q()),
        N && N.c(),
        (h = q()),
        D && D.c(),
        (_ = q()),
        I && I.c(),
        f(t, 'class', 'fd-shellbar__group fd-shellbar__group--product'),
        f(c, 'class', 'fd-shellbar__group fd-shellbar__group--actions lui-shellbar_group--actions'),
        f(
          e,
          'class',
          (p =
            'fd-shellbar ' +
            (i[27] ? 'fd-shellbar--responsive-paddings' : '') +
            ' lui-shellbar-wrapper ' +
            (i[2] ? 'hideNavComponent' : '') +
            ' svelte-1q5ghii')
        ),
        f(e, 'tabindex', '0');
    },
    m(L, M) {
      R(L, e, M),
        w(e, t),
        v && v.m(t, null),
        w(t, n),
        He(l, t, null),
        w(e, s),
        C && C.m(e, null),
        w(e, o),
        w(e, c),
        T && T.m(c, null),
        w(c, g),
        N && N.m(c, null),
        w(c, h),
        D && D.m(c, null),
        w(c, _),
        I && I.m(c, null),
        (m = !0);
    },
    p(L, M) {
      L[3] === 'simple' || L[3] === 'simpleMobileOnly' || L[3] === 'Fiori3'
        ? v
          ? v.p(L, M)
          : ((v = Hh(L)), v.c(), v.m(t, n))
        : v && (v.d(1), (v = null));
      const F = {};
      M[0] & 1073741824 && (F.pathData = L[30]),
        M[1] & 1 && (F.pathParams = L[31]),
        M[0] & 268435456 && (F.addNavHrefForAnchor = L[28]),
        !r && M[0] & 64 && ((r = !0), (F.dropDownStates = L[6]), mt(() => (r = !1))),
        l.$set(F),
        L[18] && L[19]
          ? C
            ? (C.p(L, M), M[0] & 786432 && B(C, 1))
            : ((C = zh(L)), C.c(), B(C, 1), C.m(e, o))
          : C &&
            (Ee(),
            G(C, 1, 1, () => {
              C = null;
            }),
            De()),
        !L[0] || L[1]
          ? T
            ? (T.p(L, M), M[0] & 3 && B(T, 1))
            : ((T = qh(L)), T.c(), B(T, 1), T.m(c, g))
          : T &&
            (Ee(),
            G(T, 1, 1, () => {
              T = null;
            }),
            De()),
        L[18] || (L[7] && L[30].length > 0)
          ? N
            ? (N.p(L, M), M[0] & 1074004096 && B(N, 1))
            : ((N = Kh(L)), N.c(), B(N, 1), N.m(c, h))
          : N &&
            (Ee(),
            G(N, 1, 1, () => {
              N = null;
            }),
            De()),
        L[0] || L[16]
          ? D
            ? (D.p(L, M), M[0] & 65537 && B(D, 1))
            : ((D = sg(L)), D.c(), B(D, 1), D.m(c, _))
          : D &&
            (Ee(),
            G(D, 1, 1, () => {
              D = null;
            }),
            De()),
        L[12]
          ? I
            ? (I.p(L, M), M[0] & 4096 && B(I, 1))
            : ((I = ag(L)), I.c(), B(I, 1), I.m(c, null))
          : I &&
            (Ee(),
            G(I, 1, 1, () => {
              I = null;
            }),
            De()),
        (!m ||
          (M[0] & 134217732 &&
            p !==
              (p =
                'fd-shellbar ' +
                (L[27] ? 'fd-shellbar--responsive-paddings' : '') +
                ' lui-shellbar-wrapper ' +
                (L[2] ? 'hideNavComponent' : '') +
                ' svelte-1q5ghii'))) &&
          f(e, 'class', p);
    },
    i(L) {
      m || (B(l.$$.fragment, L), B(C), B(T), B(N), B(D), B(I), (m = !0));
    },
    o(L) {
      G(l.$$.fragment, L), G(C), G(T), G(N), G(D), G(I), (m = !1);
    },
    d(L) {
      L && A(e), v && v.d(), ze(l), C && C.d(), T && T.d(), N && N.d(), D && D.d(), I && I.d();
    }
  };
}
function Hh(i) {
  let e, t, n, l;
  return {
    c() {
      (e = S('button')),
        (t = S('i')),
        f(t, 'class', 'sap-icon sap-icon--menu2'),
        f(e, 'class', 'fd-shellbar__button fd-button fd-button--transparent lui-burger svelte-1q5ghii'),
        f(e, 'tabindex', '0'),
        f(e, 'title', i[26]);
    },
    m(r, s) {
      R(r, e, s), w(e, t), n || ((l = ne(e, 'click', i[53])), (n = !0));
    },
    p(r, s) {
      s[0] & 67108864 && f(e, 'title', r[26]);
    },
    d(r) {
      r && A(e), (n = !1), l();
    }
  };
}
function zh(i) {
  let e, t, n, l, r, s, o, c, g;
  function h(C) {
    i[60](C);
  }
  function _(C) {
    i[61](C);
  }
  function p(C) {
    i[62](C);
  }
  function m(C) {
    i[63](C);
  }
  function v(C) {
    i[64](C);
  }
  function k(C) {
    i[65](C);
  }
  let y = { globalSearchConfig: i[18] };
  return (
    i[20] !== void 0 && (y.isSearchFieldVisible = i[20]),
    i[25] !== void 0 && (y.searchResult = i[25]),
    i[23] !== void 0 && (y.displaySearchResult = i[23]),
    i[24] !== void 0 && (y.displayCustomSearchResult = i[24]),
    i[21] !== void 0 && (y.inputElem = i[21]),
    i[22] !== void 0 && (y.luigiCustomSearchRenderer__slot = i[22]),
    (t = new SC({ props: y })),
    xe.push(() => bt(t, 'isSearchFieldVisible', h)),
    xe.push(() => bt(t, 'searchResult', _)),
    xe.push(() => bt(t, 'displaySearchResult', p)),
    xe.push(() => bt(t, 'displayCustomSearchResult', m)),
    xe.push(() => bt(t, 'inputElem', v)),
    xe.push(() => bt(t, 'luigiCustomSearchRenderer__slot', k)),
    t.$on('toggleSearch', i[66]),
    t.$on('handleSearchNavigation', i[67]),
    t.$on('closeSearchResult', i[68]),
    {
      c() {
        (e = S('div')), Ge(t.$$.fragment), f(e, 'class', 'lui-global-search');
      },
      m(C, T) {
        R(C, e, T), He(t, e, null), (g = !0);
      },
      p(C, T) {
        const N = {};
        T[0] & 262144 && (N.globalSearchConfig = C[18]),
          !n && T[0] & 1048576 && ((n = !0), (N.isSearchFieldVisible = C[20]), mt(() => (n = !1))),
          !l && T[0] & 33554432 && ((l = !0), (N.searchResult = C[25]), mt(() => (l = !1))),
          !r && T[0] & 8388608 && ((r = !0), (N.displaySearchResult = C[23]), mt(() => (r = !1))),
          !s && T[0] & 16777216 && ((s = !0), (N.displayCustomSearchResult = C[24]), mt(() => (s = !1))),
          !o && T[0] & 2097152 && ((o = !0), (N.inputElem = C[21]), mt(() => (o = !1))),
          !c && T[0] & 4194304 && ((c = !0), (N.luigiCustomSearchRenderer__slot = C[22]), mt(() => (c = !1))),
          t.$set(N);
      },
      i(C) {
        g || (B(t.$$.fragment, C), (g = !0));
      },
      o(C) {
        G(t.$$.fragment, C), (g = !1);
      },
      d(C) {
        C && A(e), ze(t);
      }
    }
  );
}
function qh(i) {
  let e,
    t,
    n,
    l,
    r = i[18] && !i[19] && Gh(i);
  function s(c) {
    i[78](c);
  }
  let o = { isMobile: !1, addNavHrefForAnchor: i[28] };
  return (
    i[6] !== void 0 && (o.dropDownStates = i[6]),
    (t = new E_({ props: o })),
    xe.push(() => bt(t, 'dropDownStates', s)),
    t.$on('toggleDropdownState', i[79]),
    {
      c() {
        r && r.c(), (e = q()), Ge(t.$$.fragment);
      },
      m(c, g) {
        r && r.m(c, g), R(c, e, g), He(t, c, g), (l = !0);
      },
      p(c, g) {
        c[18] && !c[19]
          ? r
            ? (r.p(c, g), g[0] & 786432 && B(r, 1))
            : ((r = Gh(c)), r.c(), B(r, 1), r.m(e.parentNode, e))
          : r &&
            (Ee(),
            G(r, 1, 1, () => {
              r = null;
            }),
            De());
        const h = {};
        g[0] & 268435456 && (h.addNavHrefForAnchor = c[28]),
          !n && g[0] & 64 && ((n = !0), (h.dropDownStates = c[6]), mt(() => (n = !1))),
          t.$set(h);
      },
      i(c) {
        l || (B(r), B(t.$$.fragment, c), (l = !0));
      },
      o(c) {
        G(r), G(t.$$.fragment, c), (l = !1);
      },
      d(c) {
        r && r.d(c), c && A(e), ze(t, c);
      }
    }
  );
}
function Gh(i) {
  let e, t, n, l, r, s, o, c;
  function g(y) {
    i[69](y);
  }
  function h(y) {
    i[70](y);
  }
  function _(y) {
    i[71](y);
  }
  function p(y) {
    i[72](y);
  }
  function m(y) {
    i[73](y);
  }
  function v(y) {
    i[74](y);
  }
  let k = { globalSearchConfig: i[18] };
  return (
    i[20] !== void 0 && (k.isSearchFieldVisible = i[20]),
    i[25] !== void 0 && (k.searchResult = i[25]),
    i[23] !== void 0 && (k.displaySearchResult = i[23]),
    i[24] !== void 0 && (k.displayCustomSearchResult = i[24]),
    i[21] !== void 0 && (k.inputElem = i[21]),
    i[22] !== void 0 && (k.luigiCustomSearchRenderer__slot = i[22]),
    (e = new fC({ props: k })),
    xe.push(() => bt(e, 'isSearchFieldVisible', g)),
    xe.push(() => bt(e, 'searchResult', h)),
    xe.push(() => bt(e, 'displaySearchResult', _)),
    xe.push(() => bt(e, 'displayCustomSearchResult', p)),
    xe.push(() => bt(e, 'inputElem', m)),
    xe.push(() => bt(e, 'luigiCustomSearchRenderer__slot', v)),
    e.$on('toggleSearch', i[75]),
    e.$on('handleSearchNavigation', i[76]),
    e.$on('closeSearchResult', i[77]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(y, C) {
        He(e, y, C), (c = !0);
      },
      p(y, C) {
        const T = {};
        C[0] & 262144 && (T.globalSearchConfig = y[18]),
          !t && C[0] & 1048576 && ((t = !0), (T.isSearchFieldVisible = y[20]), mt(() => (t = !1))),
          !n && C[0] & 33554432 && ((n = !0), (T.searchResult = y[25]), mt(() => (n = !1))),
          !l && C[0] & 8388608 && ((l = !0), (T.displaySearchResult = y[23]), mt(() => (l = !1))),
          !r && C[0] & 16777216 && ((r = !0), (T.displayCustomSearchResult = y[24]), mt(() => (r = !1))),
          !s && C[0] & 2097152 && ((s = !0), (T.inputElem = y[21]), mt(() => (s = !1))),
          !o && C[0] & 4194304 && ((o = !0), (T.luigiCustomSearchRenderer__slot = y[22]), mt(() => (o = !1))),
          e.$set(T);
      },
      i(y) {
        c || (B(e.$$.fragment, y), (c = !0));
      },
      o(y) {
        G(e.$$.fragment, y), (c = !1);
      },
      d(y) {
        ze(e, y);
      }
    }
  );
}
function Kh(i) {
  let e,
    t,
    n,
    l = i[7] && i[30].length > 0 && Jh(i),
    r = (i[9] - i[10] > 0 || i[12] || i[46] || i[18]) && Qh(i);
  return {
    c() {
      l && l.c(), (e = q()), r && r.c(), (t = ye());
    },
    m(s, o) {
      l && l.m(s, o), R(s, e, o), r && r.m(s, o), R(s, t, o), (n = !0);
    },
    p(s, o) {
      s[7] && s[30].length > 0
        ? l
          ? (l.p(s, o), o[0] & 1073741952 && B(l, 1))
          : ((l = Jh(s)), l.c(), B(l, 1), l.m(e.parentNode, e))
        : l &&
          (Ee(),
          G(l, 1, 1, () => {
            l = null;
          }),
          De()),
        s[9] - s[10] > 0 || s[12] || s[46] || s[18]
          ? r
            ? (r.p(s, o), (o[0] & 267776) | (o[1] & 32768) && B(r, 1))
            : ((r = Qh(s)), r.c(), B(r, 1), r.m(t.parentNode, t))
          : r &&
            (Ee(),
            G(r, 1, 1, () => {
              r = null;
            }),
            De());
    },
    i(s) {
      n || (B(l), B(r), (n = !0));
    },
    o(s) {
      G(l), G(r), (n = !1);
    },
    d(s) {
      l && l.d(s), s && A(e), r && r.d(s), s && A(t);
    }
  };
}
function Jh(i) {
  let e,
    t,
    n = i[7],
    l = [];
  for (let s = 0; s < n.length; s += 1) l[s] = Yh(Wh(i, n, s));
  const r = s =>
    G(l[s], 1, 1, () => {
      l[s] = null;
    });
  return {
    c() {
      for (let s = 0; s < l.length; s += 1) l[s].c();
      e = ye();
    },
    m(s, o) {
      for (let c = 0; c < l.length; c += 1) l[c].m(s, o);
      R(s, e, o), (t = !0);
    },
    p(s, o) {
      if ((o[0] & 268435936) | (o[1] & 3932321)) {
        n = s[7];
        let c;
        for (c = 0; c < n.length; c += 1) {
          const g = Wh(s, n, c);
          l[c] ? (l[c].p(g, o), B(l[c], 1)) : ((l[c] = Yh(g)), l[c].c(), B(l[c], 1), l[c].m(e.parentNode, e));
        }
        for (Ee(), c = n.length; c < l.length; c += 1) r(c);
        De();
      }
    },
    i(s) {
      if (!t) {
        for (let o = 0; o < n.length; o += 1) B(l[o]);
        t = !0;
      }
    },
    o(s) {
      l = l.filter(V_);
      for (let o = 0; o < l.length; o += 1) G(l[o]);
      t = !1;
    },
    d(s) {
      ct(l, s), s && A(e);
    }
  };
}
function jh(i) {
  let e, t, n, l;
  const r = [AC, LC],
    s = [];
  function o(c, g) {
    return c[111].isCat ? 0 : 1;
  }
  return (
    (e = o(i)),
    (t = s[e] = r[e](i)),
    {
      c() {
        t.c(), (n = ye());
      },
      m(c, g) {
        s[e].m(c, g), R(c, n, g), (l = !0);
      },
      p(c, g) {
        let h = e;
        (e = o(c)),
          e === h
            ? s[e].p(c, g)
            : (Ee(),
              G(s[h], 1, 1, () => {
                s[h] = null;
              }),
              De(),
              (t = s[e]),
              t ? t.p(c, g) : ((t = s[e] = r[e](c)), t.c()),
              B(t, 1),
              t.m(n.parentNode, n));
      },
      i(c) {
        l || (B(t), (l = !0));
      },
      o(c) {
        G(t), (l = !1);
      },
      d(c) {
        s[e].d(c), c && A(n);
      }
    }
  );
}
function LC(i) {
  let e, t, n, l, r;
  const s = [EC, RC],
    o = [];
  function c(g, h) {
    return g[28] ? 0 : 1;
  }
  return (
    (t = c(i)),
    (n = o[t] = s[t](i)),
    {
      c() {
        (e = S('div')),
          n.c(),
          (l = q()),
          f(e, 'class', 'fd-shellbar__action fd-shellbar__action--hide fd-shellbar__action--desktop');
      },
      m(g, h) {
        R(g, e, h), o[t].m(e, null), w(e, l), (r = !0);
      },
      p(g, h) {
        let _ = t;
        (t = c(g)),
          t === _
            ? o[t].p(g, h)
            : (Ee(),
              G(o[_], 1, 1, () => {
                o[_] = null;
              }),
              De(),
              (n = o[t]),
              n ? n.p(g, h) : ((n = o[t] = s[t](g)), n.c()),
              B(n, 1),
              n.m(e, l));
      },
      i(g) {
        r || (B(n), (r = !0));
      },
      o(g) {
        G(n), (r = !1);
      },
      d(g) {
        g && A(e), o[t].d();
      }
    }
  );
}
function AC(i) {
  let e, t, n, l, r, s, o, c, g, h, _, p, m, v, k, y, C, T, N, D;
  function I(F) {
    i[80](F, i[111], i[114], i[113]);
  }
  let L = {};
  i[111] !== void 0 && (L.node = i[111]),
    (r = new Mo({ props: L })),
    xe.push(() => bt(r, 'node', I)),
    (c = new Zn({ props: { node: i[111] } }));
  function M() {
    return i[81](i[113]);
  }
  return (
    (k = new A_({ props: { node: i[111], isMobile: !1, pathParams: i[31], addNavHrefForAnchor: i[28] } })),
    {
      c() {
        (e = S('div')),
          (t = S('div')),
          (n = S('div')),
          (l = S('button')),
          Ge(r.$$.fragment),
          (o = q()),
          Ge(c.$$.fragment),
          (m = q()),
          (v = S('div')),
          Ge(k.$$.fragment),
          (C = q()),
          f(l, 'title', (g = i[52](i[111], i[49](i[111])))),
          f(
            l,
            'class',
            (h = 'fd-shellbar__button fd-button fd-button--transparent ' + (i[111] === i[8] ? 'is-selected' : ''))
          ),
          f(l, 'aria-controls', 'dropDownPopover-' + i[113]),
          f(l, 'aria-expanded', (_ = i[6][`dropDownPopover-${i[113]}`] || !1)),
          f(l, 'aria-haspopup', 'true'),
          f(l, 'data-testid', (p = i[50](i[111]))),
          f(n, 'class', 'fd-popover__control'),
          f(v, 'class', 'fd-popover__body fd-popover__body--right'),
          f(v, 'aria-hidden', (y = !i[6][`dropDownPopover-${i[113]}`])),
          f(v, 'id', 'dropDownPopover-' + i[113]),
          f(t, 'class', 'fd-popover fd-popover--right'),
          f(e, 'class', 'fd-shellbar__action fd-shellbar__action--hide fd-shellbar__action--desktop');
      },
      m(F, O) {
        R(F, e, O),
          w(e, t),
          w(t, n),
          w(n, l),
          He(r, l, null),
          w(l, o),
          He(c, l, null),
          w(t, m),
          w(t, v),
          He(k, v, null),
          w(e, C),
          (T = !0),
          N || ((D = [ne(l, 'click', M), ne(n, 'click', Ot(JC))]), (N = !0));
      },
      p(F, O) {
        i = F;
        const j = {};
        !s && O[0] & 128 && ((s = !0), (j.node = i[111]), mt(() => (s = !1))), r.$set(j);
        const fe = {};
        O[0] & 128 && (fe.node = i[111]),
          c.$set(fe),
          (!T || (O[0] & 128 && g !== (g = i[52](i[111], i[49](i[111]))))) && f(l, 'title', g),
          (!T ||
            (O[0] & 384 &&
              h !==
                (h =
                  'fd-shellbar__button fd-button fd-button--transparent ' + (i[111] === i[8] ? 'is-selected' : '')))) &&
            f(l, 'class', h),
          (!T || (O[0] & 64 && _ !== (_ = i[6][`dropDownPopover-${i[113]}`] || !1))) && f(l, 'aria-expanded', _),
          (!T || (O[0] & 128 && p !== (p = i[50](i[111])))) && f(l, 'data-testid', p);
        const X = {};
        O[0] & 128 && (X.node = i[111]),
          O[1] & 1 && (X.pathParams = i[31]),
          O[0] & 268435456 && (X.addNavHrefForAnchor = i[28]),
          k.$set(X),
          (!T || (O[0] & 64 && y !== (y = !i[6][`dropDownPopover-${i[113]}`]))) && f(v, 'aria-hidden', y);
      },
      i(F) {
        T || (B(r.$$.fragment, F), B(c.$$.fragment, F), B(k.$$.fragment, F), (T = !0));
      },
      o(F) {
        G(r.$$.fragment, F), G(c.$$.fragment, F), G(k.$$.fragment, F), (T = !1);
      },
      d(F) {
        F && A(e), ze(r), ze(c), ze(k), (N = !1), Ze(D);
      }
    }
  );
}
function RC(i) {
  let e, t, n, l, r, s, o, c, g, h, _;
  function p(k) {
    i[84](k, i[111], i[114], i[113]);
  }
  let m = {};
  i[111] !== void 0 && (m.node = i[111]),
    (t = new Mo({ props: m })),
    xe.push(() => bt(t, 'node', p)),
    (r = new Zn({ props: { node: i[111] } }));
  function v() {
    return i[85](i[111]);
  }
  return {
    c() {
      (e = S('button')),
        Ge(t.$$.fragment),
        (l = q()),
        Ge(r.$$.fragment),
        f(e, 'title', (s = i[52](i[111], i[49](i[111])))),
        f(
          e,
          'class',
          (o = 'fd-shellbar__button fd-button fd-button--transparent ' + (i[111] === i[8] ? 'is-selected' : ''))
        ),
        f(e, 'aria-expanded', 'false'),
        f(e, 'aria-haspopup', 'true'),
        f(e, 'data-testid', (c = i[50](i[111])));
    },
    m(k, y) {
      R(k, e, y), He(t, e, null), w(e, l), He(r, e, null), (g = !0), h || ((_ = ne(e, 'click', v)), (h = !0));
    },
    p(k, y) {
      i = k;
      const C = {};
      !n && y[0] & 128 && ((n = !0), (C.node = i[111]), mt(() => (n = !1))), t.$set(C);
      const T = {};
      y[0] & 128 && (T.node = i[111]),
        r.$set(T),
        (!g || (y[0] & 128 && s !== (s = i[52](i[111], i[49](i[111]))))) && f(e, 'title', s),
        (!g ||
          (y[0] & 384 &&
            o !==
              (o =
                'fd-shellbar__button fd-button fd-button--transparent ' + (i[111] === i[8] ? 'is-selected' : '')))) &&
          f(e, 'class', o),
        (!g || (y[0] & 128 && c !== (c = i[50](i[111])))) && f(e, 'data-testid', c);
    },
    i(k) {
      g || (B(t.$$.fragment, k), B(r.$$.fragment, k), (g = !0));
    },
    o(k) {
      G(t.$$.fragment, k), G(r.$$.fragment, k), (g = !1);
    },
    d(k) {
      k && A(e), ze(t), ze(r), (h = !1), _();
    }
  };
}
function EC(i) {
  let e, t, n, l, r, s, o, c, g, h, _, p;
  function m(y) {
    i[82](y, i[111], i[114], i[113]);
  }
  let v = {};
  i[111] !== void 0 && (v.node = i[111]),
    (t = new Mo({ props: v })),
    xe.push(() => bt(t, 'node', m)),
    (r = new Zn({ props: { node: i[111] } }));
  function k(...y) {
    return i[83](i[111], ...y);
  }
  return {
    c() {
      (e = S('a')),
        Ge(t.$$.fragment),
        (l = q()),
        Ge(r.$$.fragment),
        f(e, 'href', (s = i[51](i[111]))),
        f(
          e,
          'class',
          (o = 'fd-shellbar__button fd-button fd-button--transparent ' + (i[111] === i[8] ? 'is-selected' : ''))
        ),
        f(e, 'title', (c = i[52](i[111], i[49](i[111])))),
        f(e, 'aria-expanded', 'false'),
        f(e, 'aria-haspopup', 'true'),
        f(e, 'data-testid', (g = i[50](i[111])));
    },
    m(y, C) {
      R(y, e, C), He(t, e, null), w(e, l), He(r, e, null), (h = !0), _ || ((p = ne(e, 'click', k)), (_ = !0));
    },
    p(y, C) {
      i = y;
      const T = {};
      !n && C[0] & 128 && ((n = !0), (T.node = i[111]), mt(() => (n = !1))), t.$set(T);
      const N = {};
      C[0] & 128 && (N.node = i[111]),
        r.$set(N),
        (!h || (C[0] & 128 && s !== (s = i[51](i[111])))) && f(e, 'href', s),
        (!h ||
          (C[0] & 384 &&
            o !==
              (o =
                'fd-shellbar__button fd-button fd-button--transparent ' + (i[111] === i[8] ? 'is-selected' : '')))) &&
          f(e, 'class', o),
        (!h || (C[0] & 128 && c !== (c = i[52](i[111], i[49](i[111]))))) && f(e, 'title', c),
        (!h || (C[0] & 128 && g !== (g = i[50](i[111])))) && f(e, 'data-testid', g);
    },
    i(y) {
      h || (B(t.$$.fragment, y), B(r.$$.fragment, y), (h = !0));
    },
    o(y) {
      G(t.$$.fragment, y), G(r.$$.fragment, y), (h = !1);
    },
    d(y) {
      y && A(e), ze(t), ze(r), (_ = !1), p();
    }
  };
}
function Yh(i) {
  let e,
    t,
    n = !(i[111].hideFromNav || (i[5] && i[111].globalNav)) && jh(i);
  return {
    c() {
      n && n.c(), (e = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, e, r), (t = !0);
    },
    p(l, r) {
      l[111].hideFromNav || (l[5] && l[111].globalNav)
        ? n &&
          (Ee(),
          G(n, 1, 1, () => {
            n = null;
          }),
          De())
        : n
        ? (n.p(l, r), r[0] & 160 && B(n, 1))
        : ((n = jh(l)), n.c(), B(n, 1), n.m(e.parentNode, e));
    },
    i(l) {
      t || (B(n), (t = !0));
    },
    o(l) {
      G(n), (t = !1);
    },
    d(l) {
      n && n.d(l), l && A(e);
    }
  };
}
function Qh(i) {
  let e, t, n, l, r, s, o, c, g, h, _, p, m, v, k, y, C, T, N, D, I, L, M, F;
  g = new Zn({ props: { node: i[11], special: 'true' } });
  let O = i[18] && !i[19] && Zh(i),
    j = i[46] && (!i[0] || i[1]) && Xh(i),
    fe = i[7] && $h(i),
    X = i[12] && ng(i),
    Q = i[12] && ig(i),
    ce = i[14] && lg(i),
    Ce = (!i[0] || i[1]) && rg(i);
  return {
    c() {
      (e = S('div')),
        (t = S('div')),
        (n = S('div')),
        (l = S('div')),
        (r = S('div')),
        (s = S('button')),
        (o = S('i')),
        (c = q()),
        Ge(g.$$.fragment),
        (_ = q()),
        (p = S('div')),
        (m = S('nav')),
        (v = S('ul')),
        O && O.c(),
        (k = q()),
        j && j.c(),
        (y = q()),
        fe && fe.c(),
        (C = q()),
        X && X.c(),
        (N = q()),
        Q && Q.c(),
        (D = q()),
        ce && ce.c(),
        (I = q()),
        Ce && Ce.c(),
        f(o, 'class', 'sap-icon sap-icon--overflow'),
        f(s, 'class', 'fd-shellbar__button fd-button fd-button--transparent'),
        f(s, 'aria-controls', 'overflowPopover'),
        f(s, 'aria-expanded', (h = i[6].overflowPopover || !1)),
        f(s, 'aria-haspopup', 'true'),
        f(s, 'data-testid', 'mobile-menu'),
        f(r, 'class', 'fd-shellbar-collapse--control'),
        f(r, 'aria-expanded', 'false'),
        f(r, 'aria-haspopup', 'true'),
        f(r, 'role', 'button'),
        f(l, 'class', 'fd-popover__control'),
        f(v, 'class', 'fd-menu__list fd-menu__list--no-shadow'),
        f(m, 'class', 'fd-menu'),
        f(p, 'class', 'fd-popover__body fd-popover__body--right'),
        f(p, 'aria-hidden', (T = !i[6].overflowPopover)),
        f(p, 'id', 'overflowPopover'),
        f(n, 'class', 'fd-popover fd-popover--right svelte-1q5ghii'),
        f(t, 'class', 'fd-shellbar-collapse'),
        f(e, 'class', 'fd-shellbar__action fd-shellbar__action--mobile');
    },
    m(H, ae) {
      R(H, e, ae),
        w(e, t),
        w(t, n),
        w(n, l),
        w(l, r),
        w(r, s),
        w(s, o),
        w(s, c),
        He(g, s, null),
        w(n, _),
        w(n, p),
        w(p, m),
        w(m, v),
        O && O.m(v, null),
        w(v, k),
        j && j.m(v, null),
        w(v, y),
        fe && fe.m(v, null),
        w(v, C),
        X && X.m(v, null),
        w(n, N),
        Q && Q.m(n, null),
        w(n, D),
        ce && ce.m(n, null),
        w(n, I),
        Ce && Ce.m(n, null),
        (L = !0),
        M || ((F = [ne(s, 'click', i[86]), ne(l, 'click', Ot(jC))]), (M = !0));
    },
    p(H, ae) {
      const $ = {};
      ae[0] & 2048 && ($.node = H[11]),
        g.$set($),
        (!L || (ae[0] & 64 && h !== (h = H[6].overflowPopover || !1))) && f(s, 'aria-expanded', h),
        H[18] && !H[19] ? (O ? O.p(H, ae) : ((O = Zh(H)), O.c(), O.m(v, k))) : O && (O.d(1), (O = null)),
        H[46] && (!H[0] || H[1]) ? (j ? j.p(H, ae) : ((j = Xh(H)), j.c(), j.m(v, y))) : j && (j.d(1), (j = null)),
        H[7]
          ? fe
            ? (fe.p(H, ae), ae[0] & 128 && B(fe, 1))
            : ((fe = $h(H)), fe.c(), B(fe, 1), fe.m(v, C))
          : fe &&
            (Ee(),
            G(fe, 1, 1, () => {
              fe = null;
            }),
            De()),
        H[12] ? (X ? X.p(H, ae) : ((X = ng(H)), X.c(), X.m(v, null))) : X && (X.d(1), (X = null)),
        (!L || (ae[0] & 64 && T !== (T = !H[6].overflowPopover))) && f(p, 'aria-hidden', T),
        H[12]
          ? Q
            ? (Q.p(H, ae), ae[0] & 4096 && B(Q, 1))
            : ((Q = ig(H)), Q.c(), B(Q, 1), Q.m(n, D))
          : Q &&
            (Ee(),
            G(Q, 1, 1, () => {
              Q = null;
            }),
            De()),
        H[14]
          ? ce
            ? (ce.p(H, ae), ae[0] & 16384 && B(ce, 1))
            : ((ce = lg(H)), ce.c(), B(ce, 1), ce.m(n, I))
          : ce &&
            (Ee(),
            G(ce, 1, 1, () => {
              ce = null;
            }),
            De()),
        !H[0] || H[1]
          ? Ce
            ? (Ce.p(H, ae), ae[0] & 3 && B(Ce, 1))
            : ((Ce = rg(H)), Ce.c(), B(Ce, 1), Ce.m(n, null))
          : Ce &&
            (Ee(),
            G(Ce, 1, 1, () => {
              Ce = null;
            }),
            De());
    },
    i(H) {
      L || (B(g.$$.fragment, H), B(fe), B(Q), B(ce), B(Ce), (L = !0));
    },
    o(H) {
      G(g.$$.fragment, H), G(fe), G(Q), G(ce), G(Ce), (L = !1);
    },
    d(H) {
      H && A(e),
        ze(g),
        O && O.d(),
        j && j.d(),
        fe && fe.d(),
        X && X.d(),
        Q && Q.d(),
        ce && ce.d(),
        Ce && Ce.d(),
        (M = !1),
        Ze(F);
    }
  };
}
function Zh(i) {
  let e, t, n, l;
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (t.innerHTML = `<i class="sap-icon sap-icon--search fd-top-nav__icon svelte-1q5ghii"></i> 
                            <span class="fd-menu__title">Search</span>`),
        f(t, 'class', 'fd-menu__link'),
        f(t, 'data-testid', 'luigi-search-btn-mobile'),
        f(e, 'class', 'fd-menu__item');
    },
    m(r, s) {
      R(r, e, s), w(e, t), n || ((l = ne(t, 'click', Ot(i[87]))), (n = !0));
    },
    p: Ue,
    d(r) {
      r && A(e), (n = !1), l();
    }
  };
}
function Xh(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o = (i[44] ? i[44] : i[45]) + '',
    c,
    g,
    h;
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('i')),
        (r = q()),
        (s = S('span')),
        (c = Pe(o)),
        f(
          n,
          'class',
          (l =
            'sap-icon fd-top-nav__icon ' +
            (i[46].icon && i[48](i[46]) ? i[47](i[46].icon) : 'sap-icon--switch-views') +
            ' svelte-1q5ghii')
        ),
        f(s, 'class', 'fd-menu__title'),
        f(t, 'class', 'fd-menu__link'),
        f(e, 'class', 'fd-menu__item');
    },
    m(_, p) {
      R(_, e, p), w(e, t), w(t, n), w(t, r), w(t, s), w(s, c), g || ((h = ne(t, 'click', Ot(i[33]))), (g = !0));
    },
    p(_, p) {
      p[1] & 32768 &&
        l !==
          (l =
            'sap-icon fd-top-nav__icon ' +
            (_[46].icon && _[48](_[46]) ? _[47](_[46].icon) : 'sap-icon--switch-views') +
            ' svelte-1q5ghii') &&
        f(n, 'class', l),
        p[1] & 24576 && o !== (o = (_[44] ? _[44] : _[45]) + '') && Ne(c, o);
    },
    d(_) {
      _ && A(e), (g = !1), h();
    }
  };
}
function $h(i) {
  let e,
    t,
    n = i[7],
    l = [];
  for (let s = 0; s < n.length; s += 1) l[s] = tg(Bh(i, n, s));
  const r = s =>
    G(l[s], 1, 1, () => {
      l[s] = null;
    });
  return {
    c() {
      for (let s = 0; s < l.length; s += 1) l[s].c();
      e = ye();
    },
    m(s, o) {
      for (let c = 0; c < l.length; c += 1) l[c].m(s, o);
      R(s, e, o), (t = !0);
    },
    p(s, o) {
      if ((o[0] & 416) | (o[1] & 4128808)) {
        n = s[7];
        let c;
        for (c = 0; c < n.length; c += 1) {
          const g = Bh(s, n, c);
          l[c] ? (l[c].p(g, o), B(l[c], 1)) : ((l[c] = tg(g)), l[c].c(), B(l[c], 1), l[c].m(e.parentNode, e));
        }
        for (Ee(), c = n.length; c < l.length; c += 1) r(c);
        De();
      }
    },
    i(s) {
      if (!t) {
        for (let o = 0; o < n.length; o += 1) B(l[o]);
        t = !0;
      }
    },
    o(s) {
      l = l.filter(V_);
      for (let o = 0; o < l.length; o += 1) G(l[o]);
      t = !1;
    },
    d(s) {
      ct(l, s), s && A(e);
    }
  };
}
function xh(i) {
  let e, t, n, l;
  const r = [VC, DC],
    s = [];
  function o(c, g) {
    return c[111].isCat ? 1 : 0;
  }
  return (
    (e = o(i)),
    (t = s[e] = r[e](i)),
    {
      c() {
        t.c(), (n = ye());
      },
      m(c, g) {
        s[e].m(c, g), R(c, n, g), (l = !0);
      },
      p(c, g) {
        let h = e;
        (e = o(c)),
          e === h
            ? s[e].p(c, g)
            : (Ee(),
              G(s[h], 1, 1, () => {
                s[h] = null;
              }),
              De(),
              (t = s[e]),
              t ? t.p(c, g) : ((t = s[e] = r[e](c)), t.c()),
              B(t, 1),
              t.m(n.parentNode, n));
      },
      i(c) {
        l || (B(t), (l = !0));
      },
      o(c) {
        G(t), (l = !1);
      },
      d(c) {
        s[e].d(c), c && A(n);
      }
    }
  );
}
function DC(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o,
    c,
    g = i[49](i[111]) + '',
    h,
    _,
    p,
    m,
    v,
    k,
    y;
  function C(I, L) {
    return L[0] & 128 && (l = null), l == null && (l = !!I[48](I[111])), l ? OC : MC;
  }
  let T = C(i, [-1, -1, -1, -1]),
    N = T(i);
  s = new Zn({ props: { node: i[111] } });
  function D() {
    return i[89](i[111]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('span')),
        N.c(),
        (r = q()),
        Ge(s.$$.fragment),
        (o = q()),
        (c = S('span')),
        (h = Pe(g)),
        (m = q()),
        f(n, 'class', 'fd-top-nav__icon svelte-1q5ghii'),
        f(c, 'class', 'fd-list__title'),
        f(t, 'href', (_ = i[51](i[111]))),
        f(t, 'title', (p = i[52](i[111], i[49](i[111])))),
        f(t, 'class', 'fd-menu__link'),
        f(t, 'data-e2e', 'mobile-topnav-dropdown-category'),
        f(e, 'class', 'fd-menu__item');
    },
    m(I, L) {
      R(I, e, L),
        w(e, t),
        w(t, n),
        N.m(n, null),
        w(n, r),
        He(s, n, null),
        w(t, o),
        w(t, c),
        w(c, h),
        w(e, m),
        (v = !0),
        k || ((y = ne(t, 'click', Tt(D))), (k = !0));
    },
    p(I, L) {
      (i = I), T === (T = C(i, L)) && N ? N.p(i, L) : (N.d(1), (N = T(i)), N && (N.c(), N.m(n, r)));
      const M = {};
      L[0] & 128 && (M.node = i[111]),
        s.$set(M),
        (!v || L[0] & 128) && g !== (g = i[49](i[111]) + '') && Ne(h, g),
        (!v || (L[0] & 128 && _ !== (_ = i[51](i[111])))) && f(t, 'href', _),
        (!v || (L[0] & 128 && p !== (p = i[52](i[111], i[49](i[111]))))) && f(t, 'title', p);
    },
    i(I) {
      v || (B(s.$$.fragment, I), (v = !0));
    },
    o(I) {
      G(s.$$.fragment, I), (v = !1);
    },
    d(I) {
      I && A(e), N.d(), ze(s), (k = !1), y();
    }
  };
}
function VC(i) {
  let e,
    t,
    n,
    l = !i[48](i[111]),
    r,
    s,
    o,
    c,
    g,
    h = i[49](i[111]) + '',
    _,
    p,
    m,
    v,
    k,
    y,
    C,
    T,
    N = l && eg(i);
  s = new Zn({ props: { node: i[111] } });
  function D() {
    return i[88](i[111]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('span')),
        N && N.c(),
        (r = q()),
        Ge(s.$$.fragment),
        (c = q()),
        (g = S('span')),
        (_ = Pe(h)),
        (k = q()),
        f(
          n,
          'class',
          (o =
            'fd-top-nav__icon sap-icon ' + (i[111].icon && i[48](i[111]) ? i[47](i[111].icon) : '') + ' svelte-1q5ghii')
        ),
        f(g, 'class', 'fd-menu__title'),
        f(t, 'href', (p = i[51](i[111]))),
        f(t, 'class', (m = 'fd-menu__link ' + (i[111] === i[8] ? 'is-selected' : ''))),
        f(t, 'data-testid', (v = i[50](i[111]) + '-mobile')),
        f(e, 'class', 'fd-menu__item');
    },
    m(I, L) {
      R(I, e, L),
        w(e, t),
        w(t, n),
        N && N.m(n, null),
        w(n, r),
        He(s, n, null),
        w(t, c),
        w(t, g),
        w(g, _),
        w(e, k),
        (y = !0),
        C || ((T = ne(t, 'click', Tt(D))), (C = !0));
    },
    p(I, L) {
      (i = I),
        L[0] & 128 && (l = !i[48](i[111])),
        l ? (N ? N.p(i, L) : ((N = eg(i)), N.c(), N.m(n, r))) : N && (N.d(1), (N = null));
      const M = {};
      L[0] & 128 && (M.node = i[111]),
        s.$set(M),
        (!y ||
          (L[0] & 128 &&
            o !==
              (o =
                'fd-top-nav__icon sap-icon ' +
                (i[111].icon && i[48](i[111]) ? i[47](i[111].icon) : '') +
                ' svelte-1q5ghii'))) &&
          f(n, 'class', o),
        (!y || L[0] & 128) && h !== (h = i[49](i[111]) + '') && Ne(_, h),
        (!y || (L[0] & 128 && p !== (p = i[51](i[111])))) && f(t, 'href', p),
        (!y || (L[0] & 384 && m !== (m = 'fd-menu__link ' + (i[111] === i[8] ? 'is-selected' : '')))) &&
          f(t, 'class', m),
        (!y || (L[0] & 128 && v !== (v = i[50](i[111]) + '-mobile'))) && f(t, 'data-testid', v);
    },
    i(I) {
      y || (B(s.$$.fragment, I), (y = !0));
    },
    o(I) {
      G(s.$$.fragment, I), (y = !1);
    },
    d(I) {
      I && A(e), N && N.d(), ze(s), (C = !1), T();
    }
  };
}
function MC(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')),
        rt(e.src, (t = i[111].icon)) || f(e, 'src', t),
        f(e, 'alt', (n = i[111].altText ? i[111].altText : '')),
        f(e, 'class', 'svelte-1q5ghii');
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r[0] & 128 && !rt(e.src, (t = l[111].icon)) && f(e, 'src', t),
        r[0] & 128 && n !== (n = l[111].altText ? l[111].altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function OC(i) {
  let e, t;
  return {
    c() {
      (e = S('i')),
        f(e, 'class', (t = 'sap-icon ' + (i[111].icon && i[48](i[111]) ? i[47](i[111].icon) : '') + ' svelte-1q5ghii'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 128 &&
        t !== (t = 'sap-icon ' + (n[111].icon && n[48](n[111]) ? n[47](n[111].icon) : '') + ' svelte-1q5ghii') &&
        f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function eg(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')),
        rt(e.src, (t = i[111].icon)) || f(e, 'src', t),
        f(e, 'alt', (n = i[111].altText ? i[111].altText : '')),
        f(e, 'class', 'svelte-1q5ghii');
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r[0] & 128 && !rt(e.src, (t = l[111].icon)) && f(e, 'src', t),
        r[0] & 128 && n !== (n = l[111].altText ? l[111].altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function tg(i) {
  let e,
    t,
    n = !(i[111].hideFromNav || (i[5] && i[111].globalNav)) && xh(i);
  return {
    c() {
      n && n.c(), (e = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, e, r), (t = !0);
    },
    p(l, r) {
      l[111].hideFromNav || (l[5] && l[111].globalNav)
        ? n &&
          (Ee(),
          G(n, 1, 1, () => {
            n = null;
          }),
          De())
        : n
        ? (n.p(l, r), r[0] & 160 && B(n, 1))
        : ((n = xh(l)), n.c(), B(n, 1), n.m(e.parentNode, e));
    },
    i(l) {
      t || (B(n), (t = !0));
    },
    o(l) {
      G(n), (t = !1);
    },
    d(l) {
      n && n.d(l), l && A(e);
    }
  };
}
function ng(i) {
  let e,
    t,
    n,
    l,
    r,
    s = i[13].label + '',
    o,
    c,
    g;
  function h(m, v) {
    return v[0] & 8192 && (n = null), n == null && (n = !!(m[48](m[13]) || !m[13].icon)), n ? UC : FC;
  }
  let _ = h(i, [-1, -1, -1, -1]),
    p = _(i);
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        p.c(),
        (l = q()),
        (r = S('span')),
        (o = Pe(s)),
        f(r, 'class', 'fd-menu__title'),
        f(t, 'class', 'fd-menu__link'),
        f(t, 'data-testid', 'mobile-product-switcher'),
        f(e, 'class', 'fd-menu__item');
    },
    m(m, v) {
      R(m, e, v), w(e, t), p.m(t, null), w(t, l), w(t, r), w(r, o), c || ((g = ne(t, 'click', Ot(i[32]))), (c = !0));
    },
    p(m, v) {
      _ === (_ = h(m, v)) && p ? p.p(m, v) : (p.d(1), (p = _(m)), p && (p.c(), p.m(t, l))),
        v[0] & 8192 && s !== (s = m[13].label + '') && Ne(o, s);
    },
    d(m) {
      m && A(e), p.d(), (c = !1), g();
    }
  };
}
function FC(i) {
  let e, t, n, l;
  return {
    c() {
      (e = S('span')),
        (t = S('img')),
        rt(t.src, (n = i[13].icon)) || f(t, 'src', n),
        f(t, 'alt', (l = i[13].altText ? i[13].altText : '')),
        f(t, 'class', 'svelte-1q5ghii'),
        f(e, 'class', 'fd-top-nav__icon sap-icon svelte-1q5ghii');
    },
    m(r, s) {
      R(r, e, s), w(e, t);
    },
    p(r, s) {
      s[0] & 8192 && !rt(t.src, (n = r[13].icon)) && f(t, 'src', n),
        s[0] & 8192 && l !== (l = r[13].altText ? r[13].altText : '') && f(t, 'alt', l);
    },
    d(r) {
      r && A(e);
    }
  };
}
function UC(i) {
  let e, t;
  return {
    c() {
      (e = S('i')), f(e, 'class', (t = 'fd-top-nav__icon sap-icon ' + i[47](i[13].icon || 'grid') + ' svelte-1q5ghii'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 8192 &&
        t !== (t = 'fd-top-nav__icon sap-icon ' + n[47](n[13].icon || 'grid') + ' svelte-1q5ghii') &&
        f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function ig(i) {
  let e, t, n;
  function l(s) {
    i[90](s);
  }
  let r = { isMobile: !0 };
  return (
    i[6] !== void 0 && (r.dropDownStates = i[6]),
    (e = new D_({ props: r })),
    xe.push(() => bt(e, 'dropDownStates', l)),
    e.$on('toggleDropdownState', i[91]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(s, o) {
        He(e, s, o), (n = !0);
      },
      p(s, o) {
        const c = {};
        !t && o[0] & 64 && ((t = !0), (c.dropDownStates = s[6]), mt(() => (t = !1))), e.$set(c);
      },
      i(s) {
        n || (B(e.$$.fragment, s), (n = !0));
      },
      o(s) {
        G(e.$$.fragment, s), (n = !1);
      },
      d(s) {
        ze(e, s);
      }
    }
  );
}
function lg(i) {
  let e, t;
  return (
    (e = new A_({ props: { node: i[15], isMobile: !0, pathParams: i[31] } })),
    e.$on('close', i[35]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 32768 && (r.node = n[15]), l[1] & 1 && (r.pathParams = n[31]), e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function rg(i) {
  let e, t, n, l, r;
  function s(h) {
    i[92](h);
  }
  function o(h) {
    i[93](h);
  }
  function c(h) {
    i[94](h);
  }
  let g = { isMobile: !0, contextSwitcherToggle: i[43] };
  return (
    i[6] !== void 0 && (g.dropDownStates = i[6]),
    i[44] !== void 0 && (g.selectedLabel = i[44]),
    i[45] !== void 0 && (g.defaultLabel = i[45]),
    (e = new E_({ props: g })),
    xe.push(() => bt(e, 'dropDownStates', s)),
    xe.push(() => bt(e, 'selectedLabel', o)),
    xe.push(() => bt(e, 'defaultLabel', c)),
    e.$on('toggleDropdownState', i[95]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(h, _) {
        He(e, h, _), (r = !0);
      },
      p(h, _) {
        const p = {};
        _[1] & 4096 && (p.contextSwitcherToggle = h[43]),
          !t && _[0] & 64 && ((t = !0), (p.dropDownStates = h[6]), mt(() => (t = !1))),
          !n && _[1] & 8192 && ((n = !0), (p.selectedLabel = h[44]), mt(() => (n = !1))),
          !l && _[1] & 16384 && ((l = !0), (p.defaultLabel = h[45]), mt(() => (l = !1))),
          e.$set(p);
      },
      i(h) {
        r || (B(e.$$.fragment, h), (r = !0));
      },
      o(h) {
        G(e.$$.fragment, h), (r = !1);
      },
      d(h) {
        ze(e, h);
      }
    }
  );
}
function sg(i) {
  let e, t, n, l, r;
  const s = [WC, BC],
    o = [];
  function c(g, h) {
    return (
      h[0] & 16 && (t = null),
      t == null && (t = !!(g[4] === 'Fiori3' && ee.requestExperimentalFeature('profileMenuFiori3', !0))),
      t ? 0 : 1
    );
  }
  return (
    (n = c(i, [-1, -1, -1, -1])),
    (l = o[n] = s[n](i)),
    {
      c() {
        (e = S('div')),
          l.c(),
          f(e, 'class', 'fd-shellbar__action fd-shellbar__action--show-always'),
          f(e, 'data-testid', 'luigi-topnav-profile');
      },
      m(g, h) {
        R(g, e, h), o[n].m(e, null), (r = !0);
      },
      p(g, h) {
        let _ = n;
        (n = c(g, h)),
          n === _
            ? o[n].p(g, h)
            : (Ee(),
              G(o[_], 1, 1, () => {
                o[_] = null;
              }),
              De(),
              (l = o[n]),
              l ? l.p(g, h) : ((l = o[n] = s[n](g)), l.c()),
              B(l, 1),
              l.m(e, null));
      },
      i(g) {
        r || (B(l), (r = !0));
      },
      o(g) {
        G(l), (r = !1);
      },
      d(g) {
        g && A(e), o[n].d();
      }
    }
  );
}
function BC(i) {
  let e, t, n, l, r, s, o, c, g, h, _, p, m, v, k;
  function y(N, D) {
    return N[17].picture ? zC : HC;
  }
  let C = y(i),
    T = C(i);
  return (
    (_ = new T_({ props: { addNavHrefForAnchor: i[28] } })),
    _.$on('toggleDropdownState', i[100]),
    _.$on('userInfoUpdated', i[42]),
    {
      c() {
        (e = S('div')),
          (t = S('div')),
          (n = S('div')),
          (l = S('div')),
          (r = S('button')),
          T.c(),
          (g = q()),
          (h = S('div')),
          Ge(_.$$.fragment),
          f(r, 'class', 'fd-button fd-button--transparent fd-shellbar__button svelte-1q5ghii'),
          f(r, 'aria-expanded', (s = i[6].profilePopover || !1)),
          f(r, 'aria-haspopup', 'true'),
          f(r, 'aria-controls', 'profilePopover'),
          f(r, 'title', (o = i[17].name ? i[17].name : void 0)),
          f(r, 'tabindex', '0'),
          f(r, 'data-testid', 'luigi-topnav-profile-btn'),
          f(l, 'class', (c = i[17].picture ? 'fd-shellbar__button--user-menu' : '')),
          f(n, 'class', 'fd-popover__control'),
          f(h, 'class', 'fd-popover__body fd-popover__body--right'),
          f(h, 'aria-hidden', (p = !i[6].profilePopover)),
          f(h, 'id', 'profilePopover'),
          f(t, 'class', 'fd-popover'),
          f(e, 'class', 'fd-user-menu svelte-1q5ghii');
      },
      m(N, D) {
        R(N, e, D),
          w(e, t),
          w(t, n),
          w(n, l),
          w(l, r),
          T.m(r, null),
          w(t, g),
          w(t, h),
          He(_, h, null),
          (m = !0),
          v || ((k = [ne(r, 'click', i[99]), ne(n, 'click', Ot(QC))]), (v = !0));
      },
      p(N, D) {
        C === (C = y(N)) && T ? T.p(N, D) : (T.d(1), (T = C(N)), T && (T.c(), T.m(r, null))),
          (!m || (D[0] & 64 && s !== (s = N[6].profilePopover || !1))) && f(r, 'aria-expanded', s),
          (!m || (D[0] & 131072 && o !== (o = N[17].name ? N[17].name : void 0))) && f(r, 'title', o),
          (!m || (D[0] & 131072 && c !== (c = N[17].picture ? 'fd-shellbar__button--user-menu' : ''))) &&
            f(l, 'class', c);
        const I = {};
        D[0] & 268435456 && (I.addNavHrefForAnchor = N[28]),
          _.$set(I),
          (!m || (D[0] & 64 && p !== (p = !N[6].profilePopover))) && f(h, 'aria-hidden', p);
      },
      i(N) {
        m || (B(_.$$.fragment, N), (m = !0));
      },
      o(N) {
        G(_.$$.fragment, N), (m = !1);
      },
      d(N) {
        N && A(e), T.d(), ze(_), (v = !1), Ze(k);
      }
    }
  );
}
function WC(i) {
  let e, t, n, l, r, s, o, c, g;
  function h(m, v) {
    return m[17].picture ? GC : qC;
  }
  let _ = h(i),
    p = _(i);
  return (
    (r = new eS({ props: { addNavHrefForAnchor: i[28] } })),
    r.$on('toggleDropdownState', i[98]),
    r.$on('userInfoUpdated', i[42]),
    {
      c() {
        (e = S('div')),
          (t = S('div')),
          p.c(),
          (n = q()),
          (l = S('div')),
          Ge(r.$$.fragment),
          f(t, 'class', 'fd-popover__control'),
          f(l, 'class', 'fd-popover__body fd-popover__body--right'),
          f(l, 'aria-hidden', (s = !i[6].profilePopover)),
          f(l, 'id', 'profilePopover'),
          f(e, 'class', 'fd-popover fd-popover--right fd-user-menu svelte-1q5ghii');
      },
      m(m, v) {
        R(m, e, v),
          w(e, t),
          p.m(t, null),
          w(e, n),
          w(e, l),
          He(r, l, null),
          (o = !0),
          c || ((g = ne(t, 'click', Ot(YC))), (c = !0));
      },
      p(m, v) {
        _ === (_ = h(m)) && p ? p.p(m, v) : (p.d(1), (p = _(m)), p && (p.c(), p.m(t, null)));
        const k = {};
        v[0] & 268435456 && (k.addNavHrefForAnchor = m[28]),
          r.$set(k),
          (!o || (v[0] & 64 && s !== (s = !m[6].profilePopover))) && f(l, 'aria-hidden', s);
      },
      i(m) {
        o || (B(r.$$.fragment, m), (o = !0));
      },
      o(m) {
        G(r.$$.fragment, m), (o = !1);
      },
      d(m) {
        m && A(e), p.d(), ze(r), (c = !1), g();
      }
    }
  );
}
function HC(i) {
  let e, t;
  return {
    c() {
      (e = S('i')),
        f(
          e,
          'class',
          (t =
            'sap-icon ' +
            (i[17].picture ? 'fd-identifier fd-identifier--xs fd-identifier--circle' : 'sap-icon--customer'))
        );
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l[0] & 131072 &&
        t !==
          (t =
            'sap-icon ' +
            (n[17].picture ? 'fd-identifier fd-identifier--xs fd-identifier--circle' : 'sap-icon--customer')) &&
        f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function zC(i) {
  let e;
  return {
    c() {
      (e = S('span')),
        f(e, 'class', 'fd-avatar fd-avatar--xs fd-avatar--circle svelte-1q5ghii'),
        li(e, 'background-image', "url('" + i[17].picture + "')");
    },
    m(t, n) {
      R(t, e, n);
    },
    p(t, n) {
      n[0] & 131072 && li(e, 'background-image', "url('" + t[17].picture + "')");
    },
    d(t) {
      t && A(e);
    }
  };
}
function qC(i) {
  let e,
    t = (i[17].initials ? i[17].initials : '') + '',
    n,
    l,
    r,
    s;
  return {
    c() {
      (e = S('button')),
        (n = Pe(t)),
        f(e, 'class', 'fd-avatar fd-avatar--xs fd-avatar--circle fd-avatar--thumbnail svelte-1q5ghii'),
        f(e, 'aria-expanded', 'true'),
        f(e, 'aria-haspopup', 'true'),
        f(e, 'title', (l = i[17].name ? i[17].name : void 0)),
        f(e, 'tabindex', '0'),
        f(e, 'data-testid', 'luigi-topnav-profile-initials');
    },
    m(o, c) {
      R(o, e, c), w(e, n), r || ((s = ne(e, 'click', i[97])), (r = !0));
    },
    p(o, c) {
      c[0] & 131072 && t !== (t = (o[17].initials ? o[17].initials : '') + '') && Ne(n, t),
        c[0] & 131072 && l !== (l = o[17].name ? o[17].name : void 0) && f(e, 'title', l);
    },
    d(o) {
      o && A(e), (r = !1), s();
    }
  };
}
function GC(i) {
  let e, t, n, l;
  return {
    c() {
      (e = S('button')),
        f(e, 'class', 'fd-avatar fd-avatar--xs fd-avatar--circle fd-avatar--thumbnail svelte-1q5ghii'),
        f(e, 'aria-controls', 'profilePopover'),
        f(e, 'aria-expanded', 'true'),
        f(e, 'aria-haspopup', 'true'),
        f(e, 'title', (t = i[17].name ? i[17].name : void 0)),
        f(e, 'tabindex', '0'),
        li(e, 'background-image', "url('" + i[17].picture + "')"),
        f(e, 'data-testid', 'luigi-topnav-profile-btn');
    },
    m(r, s) {
      R(r, e, s), n || ((l = ne(e, 'click', i[96])), (n = !0));
    },
    p(r, s) {
      s[0] & 131072 && t !== (t = r[17].name ? r[17].name : void 0) && f(e, 'title', t),
        s[0] & 131072 && li(e, 'background-image', "url('" + r[17].picture + "')");
    },
    d(r) {
      r && A(e), (n = !1), l();
    }
  };
}
function ag(i) {
  let e, t, n;
  function l(s) {
    i[101](s);
  }
  let r = { isMobile: !1, addNavHrefForAnchor: i[28] };
  return (
    i[6] !== void 0 && (r.dropDownStates = i[6]),
    (e = new D_({ props: r })),
    xe.push(() => bt(e, 'dropDownStates', l)),
    e.$on('toggleDropdownState', i[102]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(s, o) {
        He(e, s, o), (n = !0);
      },
      p(s, o) {
        const c = {};
        o[0] & 268435456 && (c.addNavHrefForAnchor = s[28]),
          !t && o[0] & 64 && ((t = !0), (c.dropDownStates = s[6]), mt(() => (t = !1))),
          e.$set(c);
      },
      i(s) {
        n || (B(e.$$.fragment, s), (n = !0));
      },
      o(s) {
        G(e.$$.fragment, s), (n = !1);
      },
      d(s) {
        ze(e, s);
      }
    }
  );
}
function KC(i) {
  let e, t, n, l, r, s;
  const o = [TC, IC],
    c = [];
  function g(h, _) {
    return h[29] ? 0 : 1;
  }
  return (
    (e = g(i)),
    (t = c[e] = o[e](i)),
    {
      c() {
        t.c(), (n = ye());
      },
      m(h, _) {
        c[e].m(h, _), R(h, n, _), (l = !0), r || ((s = [ne(Uh, 'click', i[41]), ne(Uh, 'blur', i[41])]), (r = !0));
      },
      p(h, _) {
        let p = e;
        (e = g(h)),
          e === p
            ? c[e].p(h, _)
            : (Ee(),
              G(c[p], 1, 1, () => {
                c[p] = null;
              }),
              De(),
              (t = c[e]),
              t ? t.p(h, _) : ((t = c[e] = o[e](h)), t.c()),
              B(t, 1),
              t.m(n.parentNode, n));
      },
      i(h) {
        l || (B(t), (l = !0));
      },
      o(h) {
        G(t), (l = !1);
      },
      d(h) {
        c[e].d(h), h && A(n), (r = !1), Ze(s);
      }
    }
  );
}
const JC = () => {},
  jC = () => {},
  YC = () => {},
  QC = () => {};
function ZC(i, e, t) {
  const n = Wt();
  let { authorizationEnabled: l } = e,
    { autologinEnabled: r } = e,
    { isLoggedIn: s = !1 } = e,
    { hideNavComponent: o } = e,
    { responsiveNavSetting: c } = e,
    { profileTypeSettings: g } = e,
    { showGlobalNav: h } = e,
    { pathData: _ } = e,
    p,
    { pathParams: m } = e,
    { dropDownStates: v = {} } = e,
    { children: k } = e,
    { selectedNode: y } = e,
    { visibleNodeCount: C } = e,
    { globalNavNodeCount: T } = e,
    { totalBadgeNode: N } = e,
    { isProductSwitcherAvailable: D } = e,
    { productSwitcherConfig: I } = e,
    { openMobileDropDown: L } = e,
    { nodeForMobile: M } = e,
    { profileItemsAvailable: F } = e,
    { userInfo: O = {} } = e,
    { urlAuthError: j } = e,
    { globalSearchConfig: fe } = e,
    { isGlobalSearchCentered: X } = e,
    { isSearchFieldVisible: Q } = e,
    { inputElem: ce } = e,
    { luigiCustomSearchRenderer__slot: Ce } = e,
    { displaySearchResult: H } = e,
    { displayCustomSearchResult: ae } = e,
    { searchResult: $ } = e,
    { burgerTooltip: K } = e,
    { responsiveShellbarPadding: le } = e,
    ve = vt('store'),
    ue = !1,
    x,
    be,
    ke = re.getConfigValue('navigation.contextSwitcher'),
    { addNavHrefForAnchor: we = re.getConfigBooleanValue('navigation.addNavHrefs') } = e;
  const ie = async () => {
      if (_ && 0 < _.length) {
        const J = await Te.generateTopNavNodes(_);
        t(7, (k = J.children)),
          t(8, (y = J.selectedNode)),
          t(9, (C = J.visibleNodeCount)),
          t(11, (N = J.totalBadgeNode)),
          t(10, (T = J.globalNavNodeCount)),
          (window.TOPNAVDATA = J.children),
          (p = _);
      }
    },
    Re = () => {
      t(1, (s = al.isLoggedIn()));
    };
  Kt(() => {
    Fn.doOnStoreChange(
      ve,
      () => {
        t(0, (l = gi.isAuthorizationEnabled())),
          t(16, (F = re.getConfigValue('navigation.profile'))),
          t(54, (r = !Boolean(re.getConfigValue('auth.disableAutoLogin')))),
          t(12, (D = re.getConfigValue('navigation.productSwitcher'))),
          t(2, (o = re.getConfigBooleanValue('settings.hideNavigation'))),
          t(3, (c = re.getConfigValue('settings.responsiveNavigation'))),
          t(4, (g = re.getConfigValue('settings.profileType'))),
          t(27, (le = re.getConfigValue('settings.header.responsiveShellbarPaddings'))),
          t(13, (I = Te.getProductSwitcherConfig())),
          t(18, (fe = re.getConfigValue('globalSearch'))),
          t(19, (X = fe && fe.searchFieldCentered && ee.requestExperimentalFeature('globalSearchCentered', !0))),
          t(
            5,
            (h =
              re.getConfigBooleanValue('settings.globalSideNavigation') &&
              ee.requestExperimentalFeature('globalNav', !0))
          ),
          t(28, (we = re.getConfigBooleanValue('navigation.addNavHrefs'))),
          t(46, (ke = re.getConfigValue('navigation.contextSwitcher')));
      },
      ['navigation']
    ),
      Pn.addEventListener('message', J => {
        J.data.msg === 'luigi.navigation.update-badge-counters' && ie();
      });
  }),
    On(() => {
      (!p || p != _) && ie(), Re();
    });
  let { showTopNav: Le } = e;
  function _e(J) {
    return Te.renderIconClassName(J);
  }
  function tt(J) {
    return Te.isOpenUIiconName(J.icon);
  }
  function Ft(J) {
    return ht.getTranslation(J.label);
  }
  function Jt(J) {
    return J.testId ? J.testId : Te.prepareForTests(J.pathSegment, J.label);
  }
  function Rt(J) {
    return pe.getNodeHref(J, m);
  }
  function Un(J, Et) {
    return Te.generateTooltipText(J, Et);
  }
  function Bi() {
    dt('productSwitcherPopover');
  }
  function zt() {
    t(43, (ue = !ue)), dt('contextSwitcherPopover');
  }
  function bi(J) {
    t(14, (L = !0)), t(15, (M = J));
  }
  function Wi() {
    t(14, (L = !1));
  }
  function $t(J) {
    n('handleClick', { node: J });
  }
  function jt(J) {
    n('handleSearchNavigation', { node: J });
  }
  function Xn(J) {
    $t(J.detail.node);
  }
  function dt(J) {
    const Et = v || {},
      on = !Et[J];
    nn(), Wi(), (Et[J] = on), t(6, (v = Et));
  }
  function dn(J) {
    dt(J.detail.name);
  }
  function $n() {
    ce && ce.focus();
  }
  function tn() {
    Q ||
      setTimeout(() => {
        $n();
      }),
      n('toggleSearch', { isSearchFieldVisible: Q, inputElem: ce, luigiCustomSearchRenderer__slot: Ce });
  }
  function nn() {
    const J = v || {},
      Et = Object.keys(J);
    Et &&
      Et.length > 0 &&
      Et.forEach(on => {
        (J[on] = !1), t(6, (v = J));
      });
  }
  function Bn() {
    c === 'simple' || c === 'simpleMobileOnly' ? ln() : te(), vi();
  }
  function vi() {
    if (!Te.getBurgerTooltipConfig()) return;
    const [J, Et] = Te.getBurgerTooltipConfig();
    J &&
      Et &&
      (document.body.classList.contains('lui-simpleSlideInNav') &&
        t(26, (K = document.body.classList.contains('lui-leftNavToggle') ? J : Et)),
      document.body.classList.contains('lui-semiCollapsible') &&
        t(26, (K = document.body.classList.contains('semiCollapsed') ? J : Et)));
  }
  function ln() {
    document.body.classList.toggle('lui-leftNavToggle'),
      document.getElementsByClassName('fd-tabs').length > 0 && n('resizeTabNav', {});
  }
  function te() {
    di.buttonClicked(), document.getElementsByClassName('fd-tabs').length > 0 && n('resizeTabNav', {});
  }
  function Ve(J) {
    const Et = J.detail;
    t(17, (O = Et || {}));
  }
  function gt(J) {
    (v = J), t(6, v);
  }
  function yt(J) {
    (Q = J), t(20, Q);
  }
  function Pt(J) {
    ($ = J), t(25, $);
  }
  function wt(J) {
    (H = J), t(23, H);
  }
  function an(J) {
    (ae = J), t(24, ae);
  }
  function Nn(J) {
    (ce = J), t(21, ce);
  }
  function ri(J) {
    (Ce = J), t(22, Ce);
  }
  function Hi(J) {
    Ll.call(this, i, J);
  }
  function cl(J) {
    Ll.call(this, i, J);
  }
  function wi(J) {
    Ll.call(this, i, J);
  }
  function hr(J) {
    (Q = J), t(20, Q);
  }
  function gr(J) {
    ($ = J), t(25, $);
  }
  function _r(J) {
    (H = J), t(23, H);
  }
  function pr(J) {
    (ae = J), t(24, ae);
  }
  function El(J) {
    (ce = J), t(21, ce);
  }
  function mr(J) {
    (Ce = J), t(22, Ce);
  }
  function br(J) {
    Ll.call(this, i, J);
  }
  function vr(J) {
    Ll.call(this, i, J);
  }
  function ki(J) {
    Ll.call(this, i, J);
  }
  function zi(J) {
    (v = J), t(6, v);
  }
  const Si = () => dt('contextSwitcherPopover');
  function qi(J, Et, on, Pi) {
    (on[Pi] = J), t(7, k);
  }
  const Dl = J => dt(`dropDownPopover-${J}`);
  function Vl(J, Et, on, Pi) {
    (on[Pi] = J), t(7, k);
  }
  const Ml = (J, Et) => {
    Te.handleNavAnchorClickedWithoutMetaKey(Et) && $t(J);
  };
  function wr(J, Et, on, Pi) {
    (on[Pi] = J), t(7, k);
  }
  const mn = J => $t(J),
    dl = () => dt('overflowPopover'),
    hl = () => {
      tn(), dt('overflowPopover');
    },
    gl = J => $t(J),
    kr = J => bi(J);
  function Gi(J) {
    (v = J), t(6, v);
  }
  const _l = () => dt('productSwitcherPopover');
  function pl(J) {
    (v = J), t(6, v);
  }
  function ml(J) {
    (x = J), t(44, x);
  }
  function Ol(J) {
    (be = J), t(45, be);
  }
  const Ci = () => dt('contextSwitcherPopover'),
    St = () => dt('profilePopover'),
    si = () => dt('profilePopover'),
    bl = () => dt('profilePopover'),
    Fl = () => dt('profilePopover'),
    Ul = () => dt('profilePopover');
  function ai(J) {
    (v = J), t(6, v);
  }
  const Ut = () => dt('productSwitcherPopover'),
    yi = () => dt('profilePopover');
  return (
    (i.$$set = J => {
      'authorizationEnabled' in J && t(0, (l = J.authorizationEnabled)),
        'autologinEnabled' in J && t(54, (r = J.autologinEnabled)),
        'isLoggedIn' in J && t(1, (s = J.isLoggedIn)),
        'hideNavComponent' in J && t(2, (o = J.hideNavComponent)),
        'responsiveNavSetting' in J && t(3, (c = J.responsiveNavSetting)),
        'profileTypeSettings' in J && t(4, (g = J.profileTypeSettings)),
        'showGlobalNav' in J && t(5, (h = J.showGlobalNav)),
        'pathData' in J && t(30, (_ = J.pathData)),
        'pathParams' in J && t(31, (m = J.pathParams)),
        'dropDownStates' in J && t(6, (v = J.dropDownStates)),
        'children' in J && t(7, (k = J.children)),
        'selectedNode' in J && t(8, (y = J.selectedNode)),
        'visibleNodeCount' in J && t(9, (C = J.visibleNodeCount)),
        'globalNavNodeCount' in J && t(10, (T = J.globalNavNodeCount)),
        'totalBadgeNode' in J && t(11, (N = J.totalBadgeNode)),
        'isProductSwitcherAvailable' in J && t(12, (D = J.isProductSwitcherAvailable)),
        'productSwitcherConfig' in J && t(13, (I = J.productSwitcherConfig)),
        'openMobileDropDown' in J && t(14, (L = J.openMobileDropDown)),
        'nodeForMobile' in J && t(15, (M = J.nodeForMobile)),
        'profileItemsAvailable' in J && t(16, (F = J.profileItemsAvailable)),
        'userInfo' in J && t(17, (O = J.userInfo)),
        'urlAuthError' in J && t(55, (j = J.urlAuthError)),
        'globalSearchConfig' in J && t(18, (fe = J.globalSearchConfig)),
        'isGlobalSearchCentered' in J && t(19, (X = J.isGlobalSearchCentered)),
        'isSearchFieldVisible' in J && t(20, (Q = J.isSearchFieldVisible)),
        'inputElem' in J && t(21, (ce = J.inputElem)),
        'luigiCustomSearchRenderer__slot' in J && t(22, (Ce = J.luigiCustomSearchRenderer__slot)),
        'displaySearchResult' in J && t(23, (H = J.displaySearchResult)),
        'displayCustomSearchResult' in J && t(24, (ae = J.displayCustomSearchResult)),
        'searchResult' in J && t(25, ($ = J.searchResult)),
        'burgerTooltip' in J && t(26, (K = J.burgerTooltip)),
        'responsiveShellbarPadding' in J && t(27, (le = J.responsiveShellbarPadding)),
        'addNavHrefForAnchor' in J && t(28, (we = J.addNavHrefForAnchor)),
        'showTopNav' in J && t(29, (Le = J.showTopNav));
    }),
    (i.$$.update = () => {
      (i.$$.dirty[0] & 3) | (i.$$.dirty[1] & 8388608) && t(29, (Le = (l && (!r || s)) || !l));
    }),
    [
      l,
      s,
      o,
      c,
      g,
      h,
      v,
      k,
      y,
      C,
      T,
      N,
      D,
      I,
      L,
      M,
      F,
      O,
      fe,
      X,
      Q,
      ce,
      Ce,
      H,
      ae,
      $,
      K,
      le,
      we,
      Le,
      _,
      m,
      Bi,
      zt,
      bi,
      Wi,
      $t,
      Xn,
      dt,
      dn,
      tn,
      nn,
      Ve,
      ue,
      x,
      be,
      ke,
      _e,
      tt,
      Ft,
      Jt,
      Rt,
      Un,
      Bn,
      r,
      j,
      jt,
      ln,
      te,
      gt,
      yt,
      Pt,
      wt,
      an,
      Nn,
      ri,
      Hi,
      cl,
      wi,
      hr,
      gr,
      _r,
      pr,
      El,
      mr,
      br,
      vr,
      ki,
      zi,
      Si,
      qi,
      Dl,
      Vl,
      Ml,
      wr,
      mn,
      dl,
      hl,
      gl,
      kr,
      Gi,
      _l,
      pl,
      ml,
      Ol,
      Ci,
      St,
      si,
      bl,
      Fl,
      Ul,
      ai,
      Ut,
      yi
    ]
  );
}
class XC extends At {
  constructor(e) {
    super(),
      Lt(
        this,
        e,
        ZC,
        KC,
        It,
        {
          authorizationEnabled: 0,
          autologinEnabled: 54,
          isLoggedIn: 1,
          hideNavComponent: 2,
          responsiveNavSetting: 3,
          profileTypeSettings: 4,
          showGlobalNav: 5,
          pathData: 30,
          pathParams: 31,
          dropDownStates: 6,
          children: 7,
          selectedNode: 8,
          visibleNodeCount: 9,
          globalNavNodeCount: 10,
          totalBadgeNode: 11,
          isProductSwitcherAvailable: 12,
          productSwitcherConfig: 13,
          openMobileDropDown: 14,
          nodeForMobile: 15,
          profileItemsAvailable: 16,
          userInfo: 17,
          urlAuthError: 55,
          globalSearchConfig: 18,
          isGlobalSearchCentered: 19,
          isSearchFieldVisible: 20,
          inputElem: 21,
          luigiCustomSearchRenderer__slot: 22,
          displaySearchResult: 23,
          displayCustomSearchResult: 24,
          searchResult: 25,
          burgerTooltip: 26,
          responsiveShellbarPadding: 27,
          addNavHrefForAnchor: 28,
          showTopNav: 29,
          openMobileProductSwitcher: 32,
          openMobileContextSwitcher: 33,
          openMobileTopNavDropDown: 34,
          closeMobileTopNavDropDown: 35,
          handleClick: 36,
          handleSearchNavigation: 56,
          handleClickExternal: 37,
          toggleDropdownState: 38,
          toggleDropdownStateExternal: 39,
          toggleSearch: 40,
          closeAllDropdowns: 41,
          simpleNav: 57,
          semicollapsedNav: 58,
          userInfoUpdate: 42
        },
        null,
        [-1, -1, -1, -1]
      );
  }
  get openMobileProductSwitcher() {
    return this.$$.ctx[32];
  }
  get openMobileContextSwitcher() {
    return this.$$.ctx[33];
  }
  get openMobileTopNavDropDown() {
    return this.$$.ctx[34];
  }
  get closeMobileTopNavDropDown() {
    return this.$$.ctx[35];
  }
  get handleClick() {
    return this.$$.ctx[36];
  }
  get handleSearchNavigation() {
    return this.$$.ctx[56];
  }
  get handleClickExternal() {
    return this.$$.ctx[37];
  }
  get toggleDropdownState() {
    return this.$$.ctx[38];
  }
  get toggleDropdownStateExternal() {
    return this.$$.ctx[39];
  }
  get toggleSearch() {
    return this.$$.ctx[40];
  }
  get closeAllDropdowns() {
    return this.$$.ctx[41];
  }
  get simpleNav() {
    return this.$$.ctx[57];
  }
  get semicollapsedNav() {
    return this.$$.ctx[58];
  }
  get userInfoUpdate() {
    return this.$$.ctx[42];
  }
}
const { window: yo } = Ui;
function og(i, e, t) {
  const n = i.slice();
  return (n[34] = e[t][0]), (n[35] = e[t][1]), (n[37] = t), n;
}
function ug(i, e, t) {
  const n = i.slice();
  return (n[38] = e[t]), n;
}
function fg(i, e, t) {
  const n = i.slice();
  return (n[38] = e[t]), (n[40] = t), n;
}
function cg(i, e, t) {
  const n = i.slice();
  return (n[34] = e[t][0]), (n[35] = e[t][1]), (n[37] = t), n;
}
function dg(i, e, t) {
  const n = i.slice();
  return (n[38] = e[t]), n;
}
function hg(i, e, t) {
  const n = i.slice();
  return (n[38] = e[t]), (n[40] = t), n;
}
function gg(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k = Object.entries(i[0]),
    y = [];
  for (let N = 0; N < k.length; N += 1) y[N] = kg(cg(i, k, N));
  let C = Object.entries(i[0]),
    T = [];
  for (let N = 0; N < C.length; N += 1) T[N] = yg(og(i, C, N));
  return {
    c() {
      (e = S('nav')), (t = S('div')), (n = S('div'));
      for (let N = 0; N < y.length; N += 1) y[N].c();
      (l = q()),
        (r = S('div')),
        (s = S('span')),
        (o = S('div')),
        (c = S('a')),
        (c.innerHTML = `<span class="label fd-tabs__tag svelte-1kb8g8n">More</span> 
            <span class="sap-icon--dropdown luigi-icon--dropdown svelte-1kb8g8n"></span>`),
        (g = q()),
        (h = S('div')),
        (_ = S('ul'));
      for (let N = 0; N < T.length; N += 1) T[N].c();
      f(n, 'class', 'tabsContainer luigi-tabsContainer svelte-1kb8g8n'),
        f(t, 'class', 'tabsContainerWrapper svelte-1kb8g8n'),
        f(c, 'class', 'fd-tabs__link fd-popover__control has-child luigi__more svelte-1kb8g8n'),
        f(c, 'aria-expanded', 'false'),
        f(c, 'role', 'tab'),
        f(_, 'class', 'fd-nested-list fd-nested-list--compact fd-nested-list--text-only svelte-1kb8g8n'),
        f(h, 'class', 'fd-popover__body fd-popover__body--right fd-popover__body--no-arrow svelte-1kb8g8n'),
        f(h, 'aria-hidden', (p = !i[4])),
        f(o, 'class', 'fd-popover fd-popover--right'),
        f(s, 'class', 'fd-tabs__item svelte-1kb8g8n'),
        f(r, 'class', 'luigi-tabsMoreButton svelte-1kb8g8n'),
        f(e, 'class', 'fd-tabs fd-tabs--l svelte-1kb8g8n'),
        f(e, 'role', 'tablist'),
        f(e, 'id', 'tabsContainer');
    },
    m(N, D) {
      R(N, e, D), w(e, t), w(t, n);
      for (let I = 0; I < y.length; I += 1) y[I].m(n, null);
      w(e, l), w(e, r), w(r, s), w(s, o), w(o, c), w(o, g), w(o, h), w(h, _);
      for (let I = 0; I < T.length; I += 1) T[I].m(_, null);
      m || ((v = [ne(c, 'click', Tt(i[10])), ne(s, 'click', ly), ne(e, 'toggleDropdownState', i[24])]), (m = !0));
    },
    p(N, D) {
      if (D[0] & 10477) {
        k = Object.entries(N[0]);
        let I;
        for (I = 0; I < k.length; I += 1) {
          const L = cg(N, k, I);
          y[I] ? y[I].p(L, D) : ((y[I] = kg(L)), y[I].c(), y[I].m(n, null));
        }
        for (; I < y.length; I += 1) y[I].d(1);
        y.length = k.length;
      }
      if (D[0] & 10477) {
        C = Object.entries(N[0]);
        let I;
        for (I = 0; I < C.length; I += 1) {
          const L = og(N, C, I);
          T[I] ? T[I].p(L, D) : ((T[I] = yg(L)), T[I].c(), T[I].m(_, null));
        }
        for (; I < T.length; I += 1) T[I].d(1);
        T.length = C.length;
      }
      D[0] & 16 && p !== (p = !N[4]) && f(h, 'aria-hidden', p);
    },
    d(N) {
      N && A(e), ct(y, N), ct(T, N), (m = !1), Ze(v);
    }
  };
}
function $C(i) {
  let e,
    t,
    n,
    l,
    r,
    s = i[11](i[34]) + '',
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C,
    T,
    N;
  function D() {
    return i[18](i[34]);
  }
  let I = i[35],
    L = [];
  for (let M = 0; M < I.length; M += 1) L[M] = mg(dg(i, I, M));
  return {
    c() {
      (e = S('span')),
        (t = S('div')),
        (n = S('div')),
        (l = S('a')),
        (r = S('span')),
        (o = Pe(s)),
        (c = q()),
        (g = S('span')),
        (_ = q()),
        (p = S('div')),
        (m = S('nav')),
        (v = S('ul'));
      for (let M = 0; M < L.length; M += 1) L[M].c();
      (y = q()),
        f(r, 'class', 'label fd-tabs__tag svelte-1kb8g8n'),
        f(g, 'class', 'sap-icon--dropdown luigi-icon--dropdown svelte-1kb8g8n'),
        f(l, 'class', 'fd-tabs__link has-child svelte-1kb8g8n'),
        f(l, 'aria-expanded', 'false'),
        f(l, 'role', 'tab'),
        f(l, 'aria-selected', (h = sr(i[34], i[2]))),
        f(n, 'class', 'fd-popover__control'),
        f(v, 'class', 'fd-menu__list fd-menu__list--no-shadow'),
        f(m, 'class', 'fd-menu'),
        f(p, 'class', 'fd-popover__body fd-popover__body--no-arrow'),
        f(p, 'aria-hidden', (k = !i[3][i[34]])),
        f(t, 'class', 'fd-popover'),
        f(e, 'class', 'fd-tabs__item svelte-1kb8g8n'),
        f(e, 'uid', i[37] + '-0'),
        f(e, 'isselected', (C = sr(i[34], i[2])));
    },
    m(M, F) {
      R(M, e, F), w(e, t), w(t, n), w(n, l), w(l, r), w(r, o), w(l, c), w(l, g), w(t, _), w(t, p), w(p, m), w(m, v);
      for (let O = 0; O < L.length; O += 1) L[O].m(v, null);
      w(e, y), T || ((N = [ne(l, 'click', Tt(D)), ne(e, 'click', iy)]), (T = !0));
    },
    p(M, F) {
      if (
        ((i = M),
        F[0] & 2049 && s !== (s = i[11](i[34]) + '') && Ne(o, s),
        F[0] & 5 && h !== (h = sr(i[34], i[2])) && f(l, 'aria-selected', h),
        F[0] & 10309)
      ) {
        I = i[35];
        let O;
        for (O = 0; O < I.length; O += 1) {
          const j = dg(i, I, O);
          L[O] ? L[O].p(j, F) : ((L[O] = mg(j)), L[O].c(), L[O].m(v, null));
        }
        for (; O < L.length; O += 1) L[O].d(1);
        L.length = I.length;
      }
      F[0] & 9 && k !== (k = !i[3][i[34]]) && f(p, 'aria-hidden', k),
        F[0] & 5 && C !== (C = sr(i[34], i[2])) && f(e, 'isselected', C);
    },
    d(M) {
      M && A(e), ct(L, M), (T = !1), Ze(N);
    }
  };
}
function xC(i) {
  let e,
    t = i[35],
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = wg(hg(i, t, l));
  return {
    c() {
      for (let l = 0; l < n.length; l += 1) n[l].c();
      e = ye();
    },
    m(l, r) {
      for (let s = 0; s < n.length; s += 1) n[s].m(l, r);
      R(l, e, r);
    },
    p(l, r) {
      if (r[0] & 10309) {
        t = l[35];
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = hg(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = wg(o)), n[s].c(), n[s].m(e.parentNode, e));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    d(l) {
      ct(n, l), l && A(e);
    }
  };
}
function _g(i) {
  let e,
    t = i[38].label && pg(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, l) {
      n[38].label ? (t ? t.p(n, l) : ((t = pg(n)), t.c(), t.m(e.parentNode, e))) : t && (t.d(1), (t = null));
    },
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function pg(i) {
  let e,
    t,
    n,
    l = i[11](i[38].label) + '',
    r,
    s,
    o,
    c,
    g,
    h;
  function _() {
    return i[19](i[38]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('span')),
        (r = Pe(l)),
        (c = q()),
        f(n, 'class', 'fd-menu__title'),
        f(t, 'href', (s = i[13](i[38]))),
        f(t, 'class', 'fd-menu__link'),
        f(t, 'aria-selected', (o = i[38] === i[2])),
        f(e, 'class', 'fd-menu__item');
    },
    m(p, m) {
      R(p, e, m), w(e, t), w(t, n), w(n, r), w(e, c), g || ((h = ne(t, 'click', Tt(_))), (g = !0));
    },
    p(p, m) {
      (i = p),
        m[0] & 2049 && l !== (l = i[11](i[38].label) + '') && Ne(r, l),
        m[0] & 1 && s !== (s = i[13](i[38])) && f(t, 'href', s),
        m[0] & 5 && o !== (o = i[38] === i[2]) && f(t, 'aria-selected', o);
    },
    d(p) {
      p && A(e), (g = !1), h();
    }
  };
}
function mg(i) {
  let e,
    t = !i[38].hideFromNav && _g(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, l) {
      n[38].hideFromNav ? t && (t.d(1), (t = null)) : t ? t.p(n, l) : ((t = _g(n)), t.c(), t.m(e.parentNode, e));
    },
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function bg(i) {
  let e,
    t = i[38].label && vg(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, l) {
      n[38].label ? (t ? t.p(n, l) : ((t = vg(n)), t.c(), t.m(e.parentNode, e))) : t && (t.d(1), (t = null));
    },
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function vg(i) {
  let e,
    t,
    n,
    l = i[11](i[38].label) + '',
    r,
    s,
    o,
    c,
    g,
    h,
    _,
    p;
  function m() {
    return i[17](i[38]);
  }
  return {
    c() {
      (e = S('span')),
        (t = S('a')),
        (n = S('span')),
        (r = Pe(l)),
        (c = q()),
        f(n, 'class', 'fd-tabs__tag'),
        f(t, 'class', 'fd-tabs__link'),
        f(t, 'href', (s = i[13](i[38]))),
        f(t, 'role', 'tab'),
        f(t, 'aria-selected', (o = i[38] === i[2])),
        f(e, 'class', (g = 'fd-tabs__item ' + (i[38] === i[2] ? 'is-selected' : '') + ' svelte-1kb8g8n')),
        f(e, 'uid', i[37] + '-' + i[40]),
        f(e, 'isselected', (h = i[38] === i[2]));
    },
    m(v, k) {
      R(v, e, k), w(e, t), w(t, n), w(n, r), w(e, c), _ || ((p = ne(t, 'click', Tt(m))), (_ = !0));
    },
    p(v, k) {
      (i = v),
        k[0] & 2049 && l !== (l = i[11](i[38].label) + '') && Ne(r, l),
        k[0] & 1 && s !== (s = i[13](i[38])) && f(t, 'href', s),
        k[0] & 5 && o !== (o = i[38] === i[2]) && f(t, 'aria-selected', o),
        k[0] & 5 &&
          g !== (g = 'fd-tabs__item ' + (i[38] === i[2] ? 'is-selected' : '') + ' svelte-1kb8g8n') &&
          f(e, 'class', g),
        k[0] & 5 && h !== (h = i[38] === i[2]) && f(e, 'isselected', h);
    },
    d(v) {
      v && A(e), (_ = !1), p();
    }
  };
}
function wg(i) {
  let e,
    t = !i[38].hideFromNav && bg(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, l) {
      n[38].hideFromNav ? t && (t.d(1), (t = null)) : t ? t.p(n, l) : ((t = bg(n)), t.c(), t.m(e.parentNode, e));
    },
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function kg(i) {
  let e, t;
  function n(s, o) {
    return o[0] & 33 && (e = null), e == null && (e = s[34] === 'undefined' || s[34].indexOf(s[5]) === 0), e ? xC : $C;
  }
  let l = n(i, [-1, -1]),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function ey(i) {
  let e,
    t,
    n,
    l,
    r = i[11](i[34]) + '',
    s,
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C,
    T,
    N;
  function D() {
    return i[21](i[34], i[37]);
  }
  function I() {
    return i[22](i[34], i[37]);
  }
  let L = i[35],
    M = [];
  for (let F = 0; F < L.length; F += 1) M[F] = Sg(ug(i, L, F));
  return {
    c() {
      (e = S('li')),
        (t = S('div')),
        (n = S('a')),
        (l = S('span')),
        (s = Pe(r)),
        (g = q()),
        (h = S('button')),
        (_ = S('i')),
        (v = q()),
        (k = S('ul'));
      for (let F = 0; F < M.length; F += 1) M[F].c();
      (C = q()),
        f(l, 'class', 'fd-nested-list__title'),
        f(n, 'href', 'javascript:void(null)'),
        f(n, 'tabindex', '-1'),
        f(n, 'class', 'fd-nested-list__link'),
        f(n, 'id', 'tabnav_list_level1_' + i[37]),
        f(n, 'aria-haspopup', 'true'),
        f(n, 'aria-expanded', (o = i[3][i[34] + i[37]])),
        f(n, 'aria-selected', (c = sr(i[34], i[2]))),
        f(
          _,
          'class',
          (p = i[3][i[34] + i[37]] ? 'sap-icon--navigation-down-arrow' : 'sap-icon--navigation-right-arrow')
        ),
        f(_, 'role', 'presentation'),
        f(h, 'class', 'fd-button fd-nested-list__button'),
        f(h, 'href', '#'),
        f(h, 'tabindex', '-1'),
        f(h, 'aria-label', 'Expand submenu'),
        f(h, 'aria-haspopup', 'true'),
        f(h, 'aria-expanded', (m = i[3][i[34] + i[37]])),
        f(t, 'class', 'fd-nested-list__content has-child svelte-1kb8g8n'),
        f(t, 'tabindex', '0'),
        f(k, 'class', 'fd-nested-list level-2'),
        f(k, 'aria-hidden', (y = !i[3][i[34] + i[37]])),
        f(e, 'class', 'fd-nested-list__item'),
        f(e, 'uid', i[37] + '-0');
    },
    m(F, O) {
      R(F, e, O), w(e, t), w(t, n), w(n, l), w(l, s), w(t, g), w(t, h), w(h, _), w(e, v), w(e, k);
      for (let j = 0; j < M.length; j += 1) M[j].m(k, null);
      w(e, C), T || ((N = [ne(n, 'click', Tt(D)), ne(h, 'click', Tt(I))]), (T = !0));
    },
    p(F, O) {
      if (
        ((i = F),
        O[0] & 2049 && r !== (r = i[11](i[34]) + '') && Ne(s, r),
        O[0] & 9 && o !== (o = i[3][i[34] + i[37]]) && f(n, 'aria-expanded', o),
        O[0] & 5 && c !== (c = sr(i[34], i[2])) && f(n, 'aria-selected', c),
        O[0] & 9 &&
          p !== (p = i[3][i[34] + i[37]] ? 'sap-icon--navigation-down-arrow' : 'sap-icon--navigation-right-arrow') &&
          f(_, 'class', p),
        O[0] & 9 && m !== (m = i[3][i[34] + i[37]]) && f(h, 'aria-expanded', m),
        O[0] & 10309)
      ) {
        L = i[35];
        let j;
        for (j = 0; j < L.length; j += 1) {
          const fe = ug(i, L, j);
          M[j] ? M[j].p(fe, O) : ((M[j] = Sg(fe)), M[j].c(), M[j].m(k, null));
        }
        for (; j < M.length; j += 1) M[j].d(1);
        M.length = L.length;
      }
      O[0] & 9 && y !== (y = !i[3][i[34] + i[37]]) && f(k, 'aria-hidden', y);
    },
    d(F) {
      F && A(e), ct(M, F), (T = !1), Ze(N);
    }
  };
}
function ty(i) {
  let e,
    t = i[35],
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = Cg(fg(i, t, l));
  return {
    c() {
      for (let l = 0; l < n.length; l += 1) n[l].c();
      e = ye();
    },
    m(l, r) {
      for (let s = 0; s < n.length; s += 1) n[s].m(l, r);
      R(l, e, r);
    },
    p(l, r) {
      if (r[0] & 10309) {
        t = l[35];
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = fg(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = Cg(o)), n[s].c(), n[s].m(e.parentNode, e));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    d(l) {
      ct(n, l), l && A(e);
    }
  };
}
function Sg(i) {
  let e,
    t,
    n,
    l = i[11](i[38].label) + '',
    r,
    s,
    o,
    c,
    g,
    h;
  function _() {
    return i[23](i[38]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('span')),
        (r = Pe(l)),
        (c = q()),
        f(n, 'class', 'fd-nested-list__title'),
        f(t, 'class', 'fd-nested-list__link'),
        f(t, 'href', (s = i[13](i[38]))),
        f(t, 'aria-selected', (o = i[38] === i[2])),
        f(e, 'class', 'fd-nested-list__item'),
        f(e, 'aria-labelledby', 'tabnav_list_level1_' + i[37]);
    },
    m(p, m) {
      R(p, e, m), w(e, t), w(t, n), w(n, r), w(e, c), g || ((h = ne(t, 'click', Tt(_))), (g = !0));
    },
    p(p, m) {
      (i = p),
        m[0] & 2049 && l !== (l = i[11](i[38].label) + '') && Ne(r, l),
        m[0] & 1 && s !== (s = i[13](i[38])) && f(t, 'href', s),
        m[0] & 5 && o !== (o = i[38] === i[2]) && f(t, 'aria-selected', o);
    },
    d(p) {
      p && A(e), (g = !1), h();
    }
  };
}
function Cg(i) {
  let e,
    t,
    n,
    l = i[11](i[38].label) + '',
    r,
    s,
    o,
    c,
    g,
    h;
  function _() {
    return i[20](i[38]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('span')),
        (r = Pe(l)),
        (c = q()),
        f(n, 'class', 'fd-nested-list__title'),
        f(t, 'href', (s = i[13](i[38]))),
        f(t, 'class', 'fd-nested-list__link'),
        f(t, 'aria-selected', (o = i[38] === i[2])),
        f(e, 'class', 'fd-nested-list__item'),
        f(e, 'uid', i[37] + '-' + i[40]);
    },
    m(p, m) {
      R(p, e, m), w(e, t), w(t, n), w(n, r), w(e, c), g || ((h = ne(t, 'click', Tt(_))), (g = !0));
    },
    p(p, m) {
      (i = p),
        m[0] & 2049 && l !== (l = i[11](i[38].label) + '') && Ne(r, l),
        m[0] & 1 && s !== (s = i[13](i[38])) && f(t, 'href', s),
        m[0] & 5 && o !== (o = i[38] === i[2]) && f(t, 'aria-selected', o);
    },
    d(p) {
      p && A(e), (g = !1), h();
    }
  };
}
function yg(i) {
  let e, t;
  function n(s, o) {
    return o[0] & 33 && (e = null), e == null && (e = s[34] === 'undefined' || s[34].indexOf(s[5]) === 0), e ? ty : ey;
  }
  let l = n(i, [-1, -1]),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function ny(i) {
  let e,
    t,
    n,
    l = i[0] && i[1].length > 1 && gg(i);
  return {
    c() {
      l && l.c(), (e = ye());
    },
    m(r, s) {
      l && l.m(r, s),
        R(r, e, s),
        t || ((n = [ne(yo, 'click', i[8]), ne(yo, 'blur', i[8]), ne(yo, 'resize', i[9])]), (t = !0));
    },
    p(r, s) {
      r[0] && r[1].length > 1
        ? l
          ? l.p(r, s)
          : ((l = gg(r)), l.c(), l.m(e.parentNode, e))
        : l && (l.d(1), (l = null));
    },
    i: Ue,
    o: Ue,
    d(r) {
      l && l.d(r), r && A(e), (t = !1), Ze(n);
    }
  };
}
function sr(i, e) {
  return e && e.category && (e.category === i || e.category.label === i);
}
const iy = i => i.stopPropagation(),
  ly = i => i.stopPropagation();
function ry(i, e, t) {
  let n,
    { children: l } = e,
    { pathData: r } = e,
    { pathParams: s } = e,
    o,
    { hideNavComponent: c } = e,
    { virtualGroupPrefix: g = Te.virtualGroupPrefix } = e,
    h,
    { selectedNodeForTabNav: _ } = e,
    { dropDownStates: p = {} } = e,
    { isMoreBtnExpanded: m = !1 } = e,
    { resizeTabNavToggle: v } = e,
    k,
    y = vt('getTranslation');
  mi(i, y, le => t(11, (n = le)));
  const C = {
      get: () => ({
        children: l,
        pathData: r,
        hideNavComponent: c,
        virtualGroupPrefix: g,
        selectedNode: h,
        selectedNodeForTabNav: _,
        dropDownStates: p,
        isMoreBtnExpanded: m
      }),
      set: le => {
        le &&
          Object.getOwnPropertyNames(le).forEach(ve => {
            ve === 'pathData'
              ? t(1, (r = le.pathData))
              : ve === 'context'
              ? (context = le.context)
              : ve === 'children'
              ? t(0, (l = le.children))
              : ve === 'selectedNode'
              ? (h = le.selectedNode)
              : ve === 'selectedNodeForTabNav' && t(2, (_ = le.selectedNodeForTabNav));
          });
      }
    },
    T = Wt(),
    N = async () => {
      const le = C.get(),
        ve = await Mt.getTabNavData({ ...le }, le);
      !ve || (C.set({ ...ve }), (o = r), (window.LEFTNAVDATA = ve.groupedChildren), setTimeout(D));
    },
    D = () => {
      I();
      let le = document.getElementsByClassName('luigi-tabsContainer')[0],
        ve = document.getElementsByClassName('luigi-tabsMoreButton')[0],
        ue = document.getElementsByClassName('luigi__more')[0],
        x,
        be = 0,
        ke = !1,
        we,
        ie;
      ue && ue.setAttribute('aria-selected', 'false'),
        le &&
          ((x = le.offsetWidth),
          [...le.children].forEach(Le => {
            (we = Le.currentStyle || window.getComputedStyle(Le)),
              (ie = parseFloat(we.marginLeft) + parseFloat(we.marginRight)),
              (be += Le.offsetWidth + ie);
            let _e = Le.getAttribute('uid');
            be >= x
              ? (Le.classList.add('hide_element'),
                Le.getAttribute('isSelected') === 'true' && ue.setAttribute('aria-selected', 'true'),
                document.querySelector('li[uid="' + _e + '"]').classList.remove('hide_element'),
                (ke = !0))
              : document.querySelector('li[uid="' + _e + '"]').classList.add('hide_element');
          }),
          ke ? ve.classList.remove('hide_element') : ve.classList.add('hide_element'));
    },
    I = () => {
      let le = document.getElementsByClassName('luigi-tabsContainer')[0];
      le !== void 0 &&
        [...le.children].forEach(ue => {
          ue.classList.remove('hide_element');
        });
    };
  Kt(() => {
    t(14, (c = re.getConfigBooleanValue('settings.hideNavigation')));
  }),
    On(() => {
      (!o || o != r) && N(), (k === void 0 || k !== v) && ((k = v), N());
    });
  function L(le) {
    return pe.getNodeHref(le, s);
  }
  function M(le) {
    O(), T('handleClick', { node: le });
  }
  function F(le) {
    let ve = {};
    p[le] || (ve[le] = !0), t(3, (p = ve));
  }
  function O() {
    t(3, (p = {})), t(4, (m = !1));
  }
  function j() {
    I(), D();
  }
  function fe() {
    t(4, (m = !m));
  }
  const X = le => M(le),
    Q = le => F(le),
    ce = le => M(le),
    Ce = le => M(le),
    H = (le, ve) => F(le + ve),
    ae = (le, ve) => F(le + ve),
    $ = le => M(le),
    K = le => F(le.name);
  return (
    (i.$$set = le => {
      'children' in le && t(0, (l = le.children)),
        'pathData' in le && t(1, (r = le.pathData)),
        'pathParams' in le && t(15, (s = le.pathParams)),
        'hideNavComponent' in le && t(14, (c = le.hideNavComponent)),
        'virtualGroupPrefix' in le && t(5, (g = le.virtualGroupPrefix)),
        'selectedNodeForTabNav' in le && t(2, (_ = le.selectedNodeForTabNav)),
        'dropDownStates' in le && t(3, (p = le.dropDownStates)),
        'isMoreBtnExpanded' in le && t(4, (m = le.isMoreBtnExpanded)),
        'resizeTabNavToggle' in le && t(16, (v = le.resizeTabNavToggle));
    }),
    [l, r, _, p, m, g, M, F, O, j, fe, n, y, L, c, s, v, X, Q, ce, Ce, H, ae, $, K]
  );
}
class sy extends At {
  constructor(e) {
    super(),
      Lt(
        this,
        e,
        ry,
        ny,
        It,
        {
          children: 0,
          pathData: 1,
          pathParams: 15,
          hideNavComponent: 14,
          virtualGroupPrefix: 5,
          selectedNodeForTabNav: 2,
          dropDownStates: 3,
          isMoreBtnExpanded: 4,
          resizeTabNavToggle: 16,
          handleClick: 6,
          toggleDropdownState: 7,
          closeAllDropdowns: 8,
          onResize: 9,
          toggleMoreBtn: 10
        },
        null,
        [-1, -1]
      );
  }
  get handleClick() {
    return this.$$.ctx[6];
  }
  get toggleDropdownState() {
    return this.$$.ctx[7];
  }
  get closeAllDropdowns() {
    return this.$$.ctx[8];
  }
  get onResize() {
    return this.$$.ctx[9];
  }
  get toggleMoreBtn() {
    return this.$$.ctx[10];
  }
}
function Pg(i, e, t) {
  const n = i.slice();
  return (n[24] = e[t]), (n[26] = t), n;
}
function Ng(i, e, t) {
  const n = i.slice();
  return (n[24] = e[t]), (n[26] = t), n;
}
function Ig(i) {
  let e,
    t,
    n,
    l,
    r,
    s = i[0] && i[3].length > 0 && Tg(i),
    o = i[0] && i[3].length > 0 && Eg(i);
  return {
    c() {
      (e = S('div')),
        (t = S('nav')),
        (n = S('div')),
        s && s.c(),
        (l = q()),
        (r = S('div')),
        o && o.c(),
        f(n, 'class', 'fd-side-nav__main-navigation'),
        f(r, 'class', 'fd-side-nav__utility svelte-174hcxg'),
        f(r, 'aria-label', 'Utility Menu'),
        f(t, 'class', 'fd-side-nav fd-side-nav--condensed svelte-174hcxg'),
        f(e, 'class', 'lui-globalnav svelte-174hcxg');
    },
    m(c, g) {
      R(c, e, g), w(e, t), w(t, n), s && s.m(n, null), w(t, l), w(t, r), o && o.m(r, null);
    },
    p(c, g) {
      c[0] && c[3].length > 0 ? (s ? s.p(c, g) : ((s = Tg(c)), s.c(), s.m(n, null))) : s && (s.d(1), (s = null)),
        c[0] && c[3].length > 0 ? (o ? o.p(c, g) : ((o = Eg(c)), o.c(), o.m(r, null))) : o && (o.d(1), (o = null));
    },
    d(c) {
      c && A(e), s && s.d(), o && o.d();
    }
  };
}
function Tg(i) {
  let e,
    t = i[0],
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = Rg(Ng(i, t, l));
  return {
    c() {
      e = S('ul');
      for (let l = 0; l < n.length; l += 1) n[l].c();
      f(e, 'class', 'fd-nested-list svelte-174hcxg');
    },
    m(l, r) {
      R(l, e, r);
      for (let s = 0; s < n.length; s += 1) n[s].m(e, null);
    },
    p(l, r) {
      if (r & 16083) {
        t = l[0];
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = Ng(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = Rg(o)), n[s].c(), n[s].m(e, null));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    d(l) {
      l && A(e), ct(n, l);
    }
  };
}
function Lg(i) {
  let e,
    t,
    n,
    l,
    r,
    s = i[11](i[24]) + '',
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C = i[24].icon && Ag(i);
  function T(...N) {
    return i[18](i[24], ...N);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('div')),
        C && C.c(),
        (l = q()),
        (r = S('div')),
        (o = Pe(s)),
        (c = q()),
        (g = S('div')),
        (p = q()),
        f(r, 'class', 'lui-text svelte-174hcxg'),
        f(g, 'class', 'lui-indicator svelte-174hcxg'),
        f(n, 'class', 'lui-fd-nested-list__content svelte-174hcxg'),
        f(t, 'href', (h = i[6] ? i[13](i[24]) : void 0)),
        f(t, 'title', (_ = i[7](i[24].label))),
        f(t, 'role', 'button'),
        f(t, 'tabindex', '0'),
        f(t, 'class', 'svelte-174hcxg'),
        f(e, 'class', (m = 'fd-nested-list__item ' + (i[24] === i[1] ? 'is-selected' : '') + ' svelte-174hcxg')),
        f(e, 'data-testid', (v = i[12](i[24])));
    },
    m(N, D) {
      R(N, e, D),
        w(e, t),
        w(t, n),
        C && C.m(n, null),
        w(n, l),
        w(n, r),
        w(r, o),
        w(n, c),
        w(n, g),
        w(e, p),
        k || ((y = ne(t, 'click', T)), (k = !0));
    },
    p(N, D) {
      (i = N),
        i[24].icon ? (C ? C.p(i, D) : ((C = Ag(i)), C.c(), C.m(n, l))) : C && (C.d(1), (C = null)),
        D & 1 && s !== (s = i[11](i[24]) + '') && Ne(o, s),
        D & 65 && h !== (h = i[6] ? i[13](i[24]) : void 0) && f(t, 'href', h),
        D & 129 && _ !== (_ = i[7](i[24].label)) && f(t, 'title', _),
        D & 3 &&
          m !== (m = 'fd-nested-list__item ' + (i[24] === i[1] ? 'is-selected' : '') + ' svelte-174hcxg') &&
          f(e, 'class', m),
        D & 1 && v !== (v = i[12](i[24])) && f(e, 'data-testid', v);
    },
    d(N) {
      N && A(e), C && C.d(), (k = !1), y();
    }
  };
}
function Ag(i) {
  let e, t;
  function n(s, o) {
    return o & 1 && (e = null), e == null && (e = !!s[10](s[24])), e ? oy : ay;
  }
  let l = n(i, -1),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function ay(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')),
        f(e, 'class', 'fd-top-nav__icon nav-icon svelte-174hcxg'),
        rt(e.src, (t = i[24].icon)) || f(e, 'src', t),
        f(e, 'alt', (n = i[24].altText ? i[24].altText : ''));
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r & 1 && !rt(e.src, (t = l[24].icon)) && f(e, 'src', t),
        r & 1 && n !== (n = l[24].altText ? l[24].altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function oy(i) {
  let e, t;
  return {
    c() {
      (e = S('span')), f(e, 'class', (t = 'lui-text fd-top-nav__icon ' + i[9](i[24].icon) + ' svelte-174hcxg'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l & 1 && t !== (t = 'lui-text fd-top-nav__icon ' + n[9](n[24].icon) + ' svelte-174hcxg') && f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Rg(i) {
  let e,
    t = i[24].globalNav === !0 && !i[24].separator && Lg(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, l) {
      n[24].globalNav === !0 && !n[24].separator
        ? t
          ? t.p(n, l)
          : ((t = Lg(n)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function Eg(i) {
  let e,
    t = i[0],
    n = [];
  for (let l = 0; l < t.length; l += 1) n[l] = Mg(Pg(i, t, l));
  return {
    c() {
      e = S('ul');
      for (let l = 0; l < n.length; l += 1) n[l].c();
      f(e, 'class', 'fd-nested-list svelte-174hcxg');
    },
    m(l, r) {
      R(l, e, r);
      for (let s = 0; s < n.length; s += 1) n[s].m(e, null);
    },
    p(l, r) {
      if (r & 16083) {
        t = l[0];
        let s;
        for (s = 0; s < t.length; s += 1) {
          const o = Pg(l, t, s);
          n[s] ? n[s].p(o, r) : ((n[s] = Mg(o)), n[s].c(), n[s].m(e, null));
        }
        for (; s < n.length; s += 1) n[s].d(1);
        n.length = t.length;
      }
    },
    d(l) {
      l && A(e), ct(n, l);
    }
  };
}
function Dg(i) {
  let e,
    t,
    n,
    l,
    r,
    s = i[11](i[24]) + '',
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C = i[24].icon && Vg(i);
  function T() {
    return i[19](i[24]);
  }
  return {
    c() {
      (e = S('li')),
        (t = S('a')),
        (n = S('div')),
        C && C.c(),
        (l = q()),
        (r = S('div')),
        (o = Pe(s)),
        (c = q()),
        (g = S('div')),
        (p = q()),
        f(r, 'class', 'lui-text svelte-174hcxg'),
        f(g, 'class', 'lui-indicator svelte-174hcxg'),
        f(n, 'class', 'lui-fd-nested-list__content svelte-174hcxg'),
        f(t, 'href', (h = i[6] ? i[13](i[24]) : void 0)),
        f(t, 'title', (_ = i[7](i[24].label))),
        f(t, 'class', 'svelte-174hcxg'),
        f(e, 'class', (m = 'fd-nested-list__item ' + (i[24] === i[1] ? 'is-selected' : '') + ' svelte-174hcxg')),
        f(e, 'data-testid', (v = i[12](i[24])));
    },
    m(N, D) {
      R(N, e, D),
        w(e, t),
        w(t, n),
        C && C.m(n, null),
        w(n, l),
        w(n, r),
        w(r, o),
        w(n, c),
        w(n, g),
        w(e, p),
        k || ((y = ne(n, 'click', Tt(T))), (k = !0));
    },
    p(N, D) {
      (i = N),
        i[24].icon ? (C ? C.p(i, D) : ((C = Vg(i)), C.c(), C.m(n, l))) : C && (C.d(1), (C = null)),
        D & 1 && s !== (s = i[11](i[24]) + '') && Ne(o, s),
        D & 65 && h !== (h = i[6] ? i[13](i[24]) : void 0) && f(t, 'href', h),
        D & 129 && _ !== (_ = i[7](i[24].label)) && f(t, 'title', _),
        D & 3 &&
          m !== (m = 'fd-nested-list__item ' + (i[24] === i[1] ? 'is-selected' : '') + ' svelte-174hcxg') &&
          f(e, 'class', m),
        D & 1 && v !== (v = i[12](i[24])) && f(e, 'data-testid', v);
    },
    d(N) {
      N && A(e), C && C.d(), (k = !1), y();
    }
  };
}
function Vg(i) {
  let e, t;
  function n(s, o) {
    return o & 1 && (e = null), e == null && (e = !!s[10](s[24])), e ? fy : uy;
  }
  let l = n(i, -1),
    r = l(i);
  return {
    c() {
      r.c(), (t = ye());
    },
    m(s, o) {
      r.m(s, o), R(s, t, o);
    },
    p(s, o) {
      l === (l = n(s, o)) && r ? r.p(s, o) : (r.d(1), (r = l(s)), r && (r.c(), r.m(t.parentNode, t)));
    },
    d(s) {
      r.d(s), s && A(t);
    }
  };
}
function uy(i) {
  let e, t, n;
  return {
    c() {
      (e = S('img')),
        f(e, 'class', 'fd-top-nav__icon nav-icon svelte-174hcxg'),
        rt(e.src, (t = i[24].icon)) || f(e, 'src', t),
        f(e, 'alt', (n = i[24].altText ? i[24].altText : ''));
    },
    m(l, r) {
      R(l, e, r);
    },
    p(l, r) {
      r & 1 && !rt(e.src, (t = l[24].icon)) && f(e, 'src', t),
        r & 1 && n !== (n = l[24].altText ? l[24].altText : '') && f(e, 'alt', n);
    },
    d(l) {
      l && A(e);
    }
  };
}
function fy(i) {
  let e, t;
  return {
    c() {
      (e = S('span')), f(e, 'class', (t = 'lui-text fd-top-nav__icon ' + i[9](i[24].icon) + ' svelte-174hcxg'));
    },
    m(n, l) {
      R(n, e, l);
    },
    p(n, l) {
      l & 1 && t !== (t = 'lui-text fd-top-nav__icon ' + n[9](n[24].icon) + ' svelte-174hcxg') && f(e, 'class', t);
    },
    d(n) {
      n && A(e);
    }
  };
}
function Mg(i) {
  let e,
    t = i[24].globalNav === 'bottom' && !i[24].separator && Dg(i);
  return {
    c() {
      t && t.c(), (e = ye());
    },
    m(n, l) {
      t && t.m(n, l), R(n, e, l);
    },
    p(n, l) {
      n[24].globalNav === 'bottom' && !n[24].separator
        ? t
          ? t.p(n, l)
          : ((t = Dg(n)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    d(n) {
      t && t.d(n), n && A(e);
    }
  };
}
function cy(i) {
  let e,
    t,
    n,
    l = i[2] && Ig(i);
  return {
    c() {
      l && l.c(), (e = ye());
    },
    m(r, s) {
      l && l.m(r, s), R(r, e, s), t || ((n = [ne(window, 'click', da), ne(window, 'blur', da)]), (t = !0));
    },
    p(r, [s]) {
      r[2] ? (l ? l.p(r, s) : ((l = Ig(r)), l.c(), l.m(e.parentNode, e))) : l && (l.d(1), (l = null));
    },
    i: Ue,
    o: Ue,
    d(r) {
      l && l.d(r), r && A(e), (t = !1), Ze(n);
    }
  };
}
function da() {}
function dy(i, e, t) {
  let n;
  const l = Wt();
  let { pathData: r } = e,
    s,
    { pathParams: o } = e,
    { children: c } = e,
    { selectedNode: g } = e,
    h = vt('store'),
    _ = vt('getTranslation');
  mi(i, _, j => t(7, (n = j)));
  let { showGlobalNav: p } = e,
    { hideNavComponent: m } = e,
    { responsiveNavSetting: v } = e,
    k = re.getConfigBooleanValue('navigation.addNavHrefs');
  const y = async () => {
    if (r && 0 < r.length) {
      const j = await Te.generateTopNavNodes(r);
      t(0, (c = j.children)), t(1, (g = j.selectedNode)), (s = r);
    }
  };
  Kt(() => {
    Fn.doOnStoreChange(
      h,
      () => {
        t(14, (m = re.getConfigBooleanValue('settings.hideNavigation'))),
          t(15, (v = re.getConfigValue('settings.responsiveNavigation'))),
          t(
            2,
            (p =
              re.getConfigBooleanValue('settings.globalSideNavigation') &&
              ee.requestExperimentalFeature('globalNav', !0))
          ),
          document.body.classList.toggle('lui-global-nav-visible', p);
      },
      ['navigation']
    );
  }),
    On(() => {
      (!s || s != r) && y(), t(6, (k = re.getConfigBooleanValue('navigation.addNavHrefs')));
    });
  function C(j) {
    return Te.renderIconClassName(j);
  }
  function T(j) {
    return Te.isOpenUIiconName(j.icon);
  }
  function N(j) {
    return ht.getTranslation(j.label);
  }
  function D(j) {
    return j.testId ? j.testId : Te.prepareForTests(j.pathSegment, j.label);
  }
  function I(j) {
    return pe.getNodeHref(j, o);
  }
  function L(j) {
    l('handleClick', { node: j });
  }
  function M(j) {
    L(j.detail.node);
  }
  const F = (j, fe) => {
      Te.handleNavAnchorClickedWithoutMetaKey(fe) && L(j);
    },
    O = j => L(j);
  return (
    (i.$$set = j => {
      'pathData' in j && t(3, (r = j.pathData)),
        'pathParams' in j && t(16, (o = j.pathParams)),
        'children' in j && t(0, (c = j.children)),
        'selectedNode' in j && t(1, (g = j.selectedNode)),
        'showGlobalNav' in j && t(2, (p = j.showGlobalNav)),
        'hideNavComponent' in j && t(14, (m = j.hideNavComponent)),
        'responsiveNavSetting' in j && t(15, (v = j.responsiveNavSetting));
    }),
    [c, g, p, r, L, da, k, n, _, C, T, N, D, I, m, v, o, M, F, O]
  );
}
class hy extends At {
  constructor(e) {
    super(),
      Lt(this, e, dy, cy, It, {
        pathData: 3,
        pathParams: 16,
        children: 0,
        selectedNode: 1,
        showGlobalNav: 2,
        hideNavComponent: 14,
        responsiveNavSetting: 15,
        handleClick: 4,
        handleClickExternal: 17,
        closeAllDropdowns: 5
      });
  }
  get handleClick() {
    return this.$$.ctx[4];
  }
  get handleClickExternal() {
    return this.$$.ctx[17];
  }
  get closeAllDropdowns() {
    return da;
  }
}
function gy(i) {
  let e;
  return {
    c() {
      (e = S('div')), f(e, 'class', 'lui-breadcrumb-container svelte-fl7dhk');
    },
    m(t, n) {
      R(t, e, n), i[6](e);
    },
    p: Ue,
    i: Ue,
    o: Ue,
    d(t) {
      t && A(e), i[6](null);
    }
  };
}
function _y(i, e, t) {
  const n = Wt();
  let { pathData: l } = e,
    r,
    s = {},
    o,
    c = vt('store'),
    { showBreadcrumb: g } = e,
    { hideNavComponent: h } = e,
    { responsiveNavSetting: _ } = e;
  re.getConfigBooleanValue('navigation.addNavHrefs');
  const p = async () => {
      l && 0 < l.length && (r = l);
    },
    m = C => {
      C.last || k(C.node);
    };
  Kt(() => {
    Fn.doOnStoreChange(c, () => {}, ['navigation']);
  }),
    On(async () => {
      if (l && (!r || r != l)) {
        if ((p(), l.length === 0)) return;
        const C = re.getConfigValue('navigation.breadcrumbs');
        if (
          (t(1, (g = !!C)),
          g &&
            l.forEach(T => {
              T.showBreadcrumbs === !1 ? t(1, (g = !1)) : T.showBreadcrumbs === !0 && t(1, (g = !0));
            }),
          g)
        )
          if ((re.getConfigBooleanValue('navigation.addNavHrefs'), C.renderer)) {
            let T = [];
            const N = C.omitRoot ? 2 : 1,
              D = it.getCurrentPath();
            for (let I = N; I < l.length; I++) {
              const L = l[I],
                M = pe.mapPathToNode(D, L);
              if (s[M]) T.push(s[M]);
              else if (L.label || L.pathSegment || L.titleResolver)
                if ((document.body.classList.add('lui-breadcrumb'), L.titleResolver))
                  T.push({
                    label:
                      L.titleResolver.prerenderFallback && L.titleResolver.fallbackTitle
                        ? ht.getTranslation(L.titleResolver.fallbackTitle)
                        : C.pendingItemLabel || '',
                    node: L,
                    route: M,
                    pending: !0
                  });
                else {
                  const F = await v(L);
                  F && T.push({ label: F, node: L, route: M });
                }
            }
            C.clearBeforeRender && t(0, (o.innerHTML = ''), o), C.renderer(o, T, m), (T = []);
            for (let I = N; I < l.length; I++) {
              const L = l[I],
                M = pe.mapPathToNode(D, L);
              if (L.titleResolver) {
                const O = await Mt.extractDataFromPath(M),
                  j = pe.substituteDynamicParamsInObject(
                    Object.assign({}, O.pathData.context, L.context),
                    O.pathData.pathParams
                  );
                try {
                  const fe = await Te.fetchNodeTitleData(L, j);
                  T.push({ label: fe.label, node: L, route: M });
                  continue;
                } catch {}
              }
              const F = await v(L);
              F && T.push({ label: F, node: L, route: M });
            }
            D === it.getCurrentPath() &&
              (C.clearBeforeRender && t(0, (o.innerHTML = ''), o),
              T.length > 1
                ? ((T[T.length - 1].last = !0), document.body.classList.add('lui-breadcrumb'), C.renderer(o, T, m))
                : C.autoHide && document.body.classList.remove('lui-breadcrumb'),
              (s = {}),
              T.map(I => {
                s[I.route] = I;
              }));
          } else
            document.body.classList.remove('lui-breadcrumb'),
              console.warn('No breadcrumb container renderer specified');
        else t(0, (o.innerHTML = ''), o), document.body.classList.remove('lui-breadcrumb');
      }
    });
  async function v(C) {
    if (C.label && !C._virtualTree) return ht.getTranslation(C.label) || C.label;
    if (C.pathSegment && C.pathSegment.indexOf(':') === 0) {
      const T = pe.mapPathToNode(it.getCurrentPath(), C),
        N = await Mt.extractDataFromPath(T);
      return pe.getDynamicNodeValue(C, N.pathData.pathParams);
    }
    return C.pathSegment ? C.pathSegment : '';
  }
  function k(C) {
    n('handleClick', { node: C });
  }
  function y(C) {
    xe[C ? 'unshift' : 'push'](() => {
      (o = C), t(0, o);
    });
  }
  return (
    (i.$$set = C => {
      'pathData' in C && t(2, (l = C.pathData)),
        'showBreadcrumb' in C && t(1, (g = C.showBreadcrumb)),
        'hideNavComponent' in C && t(3, (h = C.hideNavComponent)),
        'responsiveNavSetting' in C && t(4, (_ = C.responsiveNavSetting));
    }),
    [o, g, l, h, _, k, y]
  );
}
class py extends At {
  constructor(e) {
    super(),
      Lt(this, e, _y, gy, It, {
        pathData: 2,
        showBreadcrumb: 1,
        hideNavComponent: 3,
        responsiveNavSetting: 4,
        handleClick: 5
      });
  }
  get handleClick() {
    return this.$$.ctx[5];
  }
}
let To = 'not_checked';
Pn.addEventListener(
  'message',
  function(i) {
    i.data === 'luigi.tpcDisabled'
      ? (console.warn('Third party cookies are not supported! Silent token renewal might not work!'), (To = 'disabled'))
      : i.data === 'luigi.tpcEnabled' && (To = 'enabled');
  },
  !1
);
function my() {
  return To;
}
const { Boolean: by, window: vy } = Ui;
function Og(i, e, t) {
  const n = i.slice();
  return (n[142] = e[t]), (n[144] = t), n;
}
function Fg(i) {
  let e, t;
  return (
    (e = new N2({ props: { alertQueue: i[26] } })),
    e.$on('alertDismiss', i[36]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 67108864 && (r.alertQueue = n[26]), e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function Ug(i) {
  let e, t;
  function n() {
    return i[67](i[144]);
  }
  function l(...s) {
    return i[68](i[144], ...s);
  }
  function r(...s) {
    return i[69](i[144], ...s);
  }
  return (
    (e = new N_({
      props: {
        settings: i[142].mfModal.settings,
        nodepath: i[142].mfModal.nodepath,
        modalIndex: i[144],
        disableBackdrop: i[13]
      }
    })),
    e.$on('close', n),
    e.$on('iframeCreated', l),
    e.$on('wcCreated', r),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(s, o) {
        He(e, s, o), (t = !0);
      },
      p(s, o) {
        i = s;
        const c = {};
        o[0] & 268435456 && (c.settings = i[142].mfModal.settings),
          o[0] & 268435456 && (c.nodepath = i[142].mfModal.nodepath),
          o[0] & 8192 && (c.disableBackdrop = i[13]),
          e.$set(c);
      },
      i(s) {
        t || (B(e.$$.fragment, s), (t = !0));
      },
      o(s) {
        G(e.$$.fragment, s), (t = !1);
      },
      d(s) {
        ze(e, s);
      }
    }
  );
}
function Bg(i) {
  let e,
    t,
    n = i[142].mfModal.displayed && Ug(i);
  return {
    c() {
      n && n.c(), (e = ye());
    },
    m(l, r) {
      n && n.m(l, r), R(l, e, r), (t = !0);
    },
    p(l, r) {
      l[142].mfModal.displayed
        ? n
          ? (n.p(l, r), r[0] & 268435456 && B(n, 1))
          : ((n = Ug(l)), n.c(), B(n, 1), n.m(e.parentNode, e))
        : n &&
          (Ee(),
          G(n, 1, 1, () => {
            n = null;
          }),
          De());
    },
    i(l) {
      t || (B(n), (t = !0));
    },
    o(l) {
      G(n), (t = !1);
    },
    d(l) {
      n && n.d(l), l && A(e);
    }
  };
}
function Wg(i) {
  let e, t;
  return (
    (e = new N_({
      props: { settings: i[29].settings, nodepath: i[29].nodepath, $$slots: { default: [wy] }, $$scope: { ctx: i } }
    })),
    e.$on('close', i[44]),
    e.$on('drawerState', i[43]),
    e.$on('iframeCreated', i[41]),
    e.$on('wcCreated', i[42]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 536870912 && (r.settings = n[29].settings),
          l[0] & 536870912 && (r.nodepath = n[29].nodepath),
          (l[0] & 8192) | (l[4] & 2097152) && (r.$$scope = { dirty: l, ctx: n }),
          e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function wy(i) {
  let e, t;
  return (
    (e = new $r({ props: { area: 'drawer', disable: i[13] } })),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 8192 && (r.disable = n[13]), e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function Hg(i) {
  let e, t;
  return (
    (e = new R2({ props: { settings: i[27].settings } })),
    e.$on('modalConfirm', i[70]),
    e.$on('modalDismiss', i[71]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 134217728 && (r.settings = n[27].settings), e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function zg(i) {
  let e, t, n;
  function l(s) {
    i[72](s);
  }
  let r = { userSettingGroups: i[18].userSettingGroups };
  return (
    i[6] !== void 0 && (r.storedUserSettings = i[6]),
    (e = new Y2({ props: r })),
    xe.push(() => bt(e, 'storedUserSettings', l)),
    e.$on('close', i[10]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(s, o) {
        He(e, s, o), (n = !0);
      },
      p(s, o) {
        const c = {};
        o[0] & 262144 && (c.userSettingGroups = s[18].userSettingGroups),
          !t && o[0] & 64 && ((t = !0), (c.storedUserSettings = s[6]), mt(() => (t = !1))),
          e.$set(c);
      },
      i(s) {
        n || (B(e.$$.fragment, s), (n = !0));
      },
      o(s) {
        G(e.$$.fragment, s), (n = !1);
      },
      d(s) {
        ze(e, s);
      }
    }
  );
}
function qg(i) {
  let e, t;
  return (
    (e = new ek({
      props: {
        splitViewSettings: i[12].settings,
        collapsed: i[12].collapsed,
        nodepath: i[12].nodepath,
        disableBackdrop: i[13]
      }
    })),
    e.$on('iframeCreated', i[32]),
    e.$on('statusChanged', i[33]),
    e.$on('wcCreated', i[34]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 4096 && (r.splitViewSettings = n[12].settings),
          l[0] & 4096 && (r.collapsed = n[12].collapsed),
          l[0] & 4096 && (r.nodepath = n[12].nodepath),
          l[0] & 8192 && (r.disableBackdrop = n[13]),
          e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function ky(i) {
  let e, t, n, l, r, s, o, c, g;
  t = new $r({ props: { area: 'main', disable: i[13] } });
  let h = i[12].displayed && qg(i);
  return {
    c() {
      (e = S('div')),
        Ge(t.$$.fragment),
        (n = q()),
        (l = S('div')),
        (r = q()),
        h && h.c(),
        (s = ye()),
        f(l, 'class', 'wcContainer svelte-1m7a6br'),
        f(e, 'class', 'fd-page iframeContainer svelte-1m7a6br'),
        f(e, 'tabindex', '0'),
        hi(e, 'lui-split-view', i[12].displayed),
        hi(e, 'lui-collapsed', i[12].collapsed);
    },
    m(_, p) {
      R(_, e, p),
        He(t, e, null),
        w(e, n),
        w(e, l),
        R(_, r, p),
        h && h.m(_, p),
        R(_, s, p),
        (o = !0),
        c || ((g = pw(i[45].call(null, e))), (c = !0));
    },
    p(_, p) {
      const m = {};
      p[0] & 8192 && (m.disable = _[13]),
        t.$set(m),
        (!o || p[0] & 4096) && hi(e, 'lui-split-view', _[12].displayed),
        (!o || p[0] & 4096) && hi(e, 'lui-collapsed', _[12].collapsed),
        _[12].displayed
          ? h
            ? (h.p(_, p), p[0] & 4096 && B(h, 1))
            : ((h = qg(_)), h.c(), B(h, 1), h.m(s.parentNode, s))
          : h &&
            (Ee(),
            G(h, 1, 1, () => {
              h = null;
            }),
            De());
    },
    i(_) {
      o || (B(t.$$.fragment, _), B(h), (o = !0));
    },
    o(_) {
      G(t.$$.fragment, _), G(h), (o = !1);
    },
    d(_) {
      _ && A(e), ze(t), _ && A(r), h && h.d(_), _ && A(s), (c = !1), g();
    }
  };
}
function Gg(i) {
  let e, t, n, l;
  return {
    c() {
      (e = S('div')),
        (e.innerHTML = `<div class="fd-busy-indicator--m svelte-1m7a6br" aria-hidden="false" aria-label="Loading" data-testid="luigi-loading-spinner"><div class="fd-busy-indicator--circle-0 svelte-1m7a6br"></div> 
        <div class="fd-busy-indicator--circle-1 svelte-1m7a6br"></div> 
        <div class="fd-busy-indicator--circle-2 svelte-1m7a6br"></div></div>`),
        f(e, 'class', 'fd-page spinnerContainer svelte-1m7a6br'),
        f(e, 'aria-hidden', 'false'),
        f(e, 'aria-label', 'Loading');
    },
    m(r, s) {
      R(r, e, s), (l = !0);
    },
    i(r) {
      l ||
        (Rl(() => {
          n && n.end(1), (t = c_(e, ua, { delay: 250, duration: 250 })), t.start();
        }),
        (l = !0));
    },
    o(r) {
      t && t.invalidate(), (n = d_(e, ua, { duration: 250 })), (l = !1);
    },
    d(r) {
      r && A(e), r && n && n.end();
    }
  };
}
function Kg(i) {
  let e, t, n, l, r, s, o, c;
  function g(y) {
    i[73](y);
  }
  function h(y) {
    i[74](y);
  }
  function _(y) {
    i[75](y);
  }
  function p(y) {
    i[76](y);
  }
  function m(y) {
    i[77](y);
  }
  function v(y) {
    i[78](y);
  }
  let k = { pathData: i[15], pathParams: i[14], burgerTooltip: i[19] };
  return (
    i[0] !== void 0 && (k.isSearchFieldVisible = i[0]),
    i[3] !== void 0 && (k.displaySearchResult = i[3]),
    i[4] !== void 0 && (k.displayCustomSearchResult = i[4]),
    i[5] !== void 0 && (k.searchResult = i[5]),
    i[1] !== void 0 && (k.inputElem = i[1]),
    i[2] !== void 0 && (k.luigiCustomSearchRenderer__slot = i[2]),
    (e = new XC({ props: k })),
    xe.push(() => bt(e, 'isSearchFieldVisible', g)),
    xe.push(() => bt(e, 'displaySearchResult', h)),
    xe.push(() => bt(e, 'displayCustomSearchResult', _)),
    xe.push(() => bt(e, 'searchResult', p)),
    xe.push(() => bt(e, 'inputElem', m)),
    xe.push(() => bt(e, 'luigiCustomSearchRenderer__slot', v)),
    e.$on('handleClick', i[30]),
    e.$on('resizeTabNav', i[31]),
    e.$on('toggleSearch', i[7]),
    e.$on('closeSearchResult', i[8]),
    e.$on('handleSearchNavigation', i[9]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(y, C) {
        He(e, y, C), (c = !0);
      },
      p(y, C) {
        const T = {};
        C[0] & 32768 && (T.pathData = y[15]),
          C[0] & 16384 && (T.pathParams = y[14]),
          C[0] & 524288 && (T.burgerTooltip = y[19]),
          !t && C[0] & 1 && ((t = !0), (T.isSearchFieldVisible = y[0]), mt(() => (t = !1))),
          !n && C[0] & 8 && ((n = !0), (T.displaySearchResult = y[3]), mt(() => (n = !1))),
          !l && C[0] & 16 && ((l = !0), (T.displayCustomSearchResult = y[4]), mt(() => (l = !1))),
          !r && C[0] & 32 && ((r = !0), (T.searchResult = y[5]), mt(() => (r = !1))),
          !s && C[0] & 2 && ((s = !0), (T.inputElem = y[1]), mt(() => (s = !1))),
          !o && C[0] & 4 && ((o = !0), (T.luigiCustomSearchRenderer__slot = y[2]), mt(() => (o = !1))),
          e.$set(T);
      },
      i(y) {
        c || (B(e.$$.fragment, y), (c = !0));
      },
      o(y) {
        G(e.$$.fragment, y), (c = !1);
      },
      d(y) {
        ze(e, y);
      }
    }
  );
}
function Jg(i) {
  let e, t, n, l;
  (e = new hy({ props: { pathData: i[15], pathParams: i[14] } })), e.$on('handleClick', i[30]);
  let r = i[20] && jg(i);
  return {
    c() {
      Ge(e.$$.fragment), (t = q()), r && r.c(), (n = ye());
    },
    m(s, o) {
      He(e, s, o), R(s, t, o), r && r.m(s, o), R(s, n, o), (l = !0);
    },
    p(s, o) {
      const c = {};
      o[0] & 32768 && (c.pathData = s[15]),
        o[0] & 16384 && (c.pathParams = s[14]),
        e.$set(c),
        s[20]
          ? r
            ? (r.p(s, o), o[0] & 1048576 && B(r, 1))
            : ((r = jg(s)), r.c(), B(r, 1), r.m(n.parentNode, n))
          : r &&
            (Ee(),
            G(r, 1, 1, () => {
              r = null;
            }),
            De());
    },
    i(s) {
      l || (B(e.$$.fragment, s), B(r), (l = !0));
    },
    o(s) {
      G(e.$$.fragment, s), G(r), (l = !1);
    },
    d(s) {
      ze(e, s), s && A(t), r && r.d(s), s && A(n);
    }
  };
}
function jg(i) {
  let e, t;
  return (
    (e = new py({ props: { pathData: i[15], pathParams: i[14] } })),
    e.$on('handleClick', i[30]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 32768 && (r.pathData = n[15]), l[0] & 16384 && (r.pathParams = n[14]), e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function Yg(i) {
  let e, t;
  return (
    (e = new Lk({ props: { pathData: i[15], pathParams: i[14], burgerTooltip: i[19] } })),
    e.$on('handleClick', i[30]),
    e.$on('resizeTabNav', i[31]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 32768 && (r.pathData = n[15]),
          l[0] & 16384 && (r.pathParams = n[14]),
          l[0] & 524288 && (r.burgerTooltip = n[19]),
          e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function Qg(i) {
  let e, t;
  return (
    (e = new sy({ props: { pathData: i[15], pathParams: i[14], resizeTabNavToggle: i[17] } })),
    e.$on('handleClick', i[30]),
    {
      c() {
        Ge(e.$$.fragment);
      },
      m(n, l) {
        He(e, n, l), (t = !0);
      },
      p(n, l) {
        const r = {};
        l[0] & 32768 && (r.pathData = n[15]),
          l[0] & 16384 && (r.pathParams = n[14]),
          l[0] & 131072 && (r.resizeTabNavToggle = n[17]),
          e.$set(r);
      },
      i(n) {
        t || (B(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        G(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        ze(e, n);
      }
    }
  );
}
function Sy(i) {
  let e,
    t,
    n,
    l,
    r,
    s,
    o,
    c,
    g,
    h,
    _,
    p,
    m,
    v,
    k,
    y,
    C = i[26] && i[26].length && Fg(i),
    T = i[28],
    N = [];
  for (let Q = 0; Q < T.length; Q += 1) N[Q] = Bg(Og(i, T, Q));
  const D = Q =>
    G(N[Q], 1, 1, () => {
      N[Q] = null;
    });
  let I = i[29].displayed && i[29].settings.isDrawer && Wg(i),
    L = i[27].displayed && Hg(i),
    M = i[18].displayed && zg(i);
  o = new $r({ props: { disable: i[13], $$slots: { default: [ky] }, $$scope: { ctx: i } } });
  let F = i[11] && Gg(),
    O = !i[25] && Kg(i),
    j = !i[21] && Jg(i),
    fe = !(i[21] || i[22]) && Yg(i),
    X = i[16] && !i[21] && Qg(i);
  return {
    c() {
      (e = S('div')), C && C.c(), (t = q());
      for (let Q = 0; Q < N.length; Q += 1) N[Q].c();
      (n = q()),
        I && I.c(),
        (l = q()),
        L && L.c(),
        (r = q()),
        M && M.c(),
        (s = q()),
        Ge(o.$$.fragment),
        (c = q()),
        F && F.c(),
        (g = q()),
        O && O.c(),
        (h = q()),
        j && j.c(),
        (_ = q()),
        fe && fe.c(),
        (p = q()),
        X && X.c(),
        f(e, 'id', 'app'),
        f(
          e,
          'class',
          (m =
            (i[21] ? 'no-nav' : '') +
            ' ' +
            (i[22] ? 'no-side-nav' : '') +
            ' ' +
            (i[25] ? 'no-top-nav' : '') +
            ' ' +
            (i[23] ? 'no-animation' : '') +
            ' svelte-1m7a6br')
        ),
        f(e, 'configversion', i[24]);
    },
    m(Q, ce) {
      R(Q, e, ce), C && C.m(e, null), w(e, t);
      for (let Ce = 0; Ce < N.length; Ce += 1) N[Ce].m(e, null);
      w(e, n),
        I && I.m(e, null),
        w(e, l),
        L && L.m(e, null),
        w(e, r),
        M && M.m(e, null),
        w(e, s),
        He(o, e, null),
        w(e, c),
        F && F.m(e, null),
        w(e, g),
        O && O.m(e, null),
        w(e, h),
        j && j.m(e, null),
        w(e, _),
        fe && fe.m(e, null),
        w(e, p),
        X && X.m(e, null),
        (v = !0),
        k || ((y = ne(vy, 'resize', i[35])), (k = !0));
    },
    p(Q, ce) {
      if (
        (Q[26] && Q[26].length
          ? C
            ? (C.p(Q, ce), ce[0] & 67108864 && B(C, 1))
            : ((C = Fg(Q)), C.c(), B(C, 1), C.m(e, t))
          : C &&
            (Ee(),
            G(C, 1, 1, () => {
              C = null;
            }),
            De()),
        (ce[0] & 268443648) | (ce[1] & 896))
      ) {
        T = Q[28];
        let H;
        for (H = 0; H < T.length; H += 1) {
          const ae = Og(Q, T, H);
          N[H] ? (N[H].p(ae, ce), B(N[H], 1)) : ((N[H] = Bg(ae)), N[H].c(), B(N[H], 1), N[H].m(e, n));
        }
        for (Ee(), H = T.length; H < N.length; H += 1) D(H);
        De();
      }
      Q[29].displayed && Q[29].settings.isDrawer
        ? I
          ? (I.p(Q, ce), ce[0] & 536870912 && B(I, 1))
          : ((I = Wg(Q)), I.c(), B(I, 1), I.m(e, l))
        : I &&
          (Ee(),
          G(I, 1, 1, () => {
            I = null;
          }),
          De()),
        Q[27].displayed
          ? L
            ? (L.p(Q, ce), ce[0] & 134217728 && B(L, 1))
            : ((L = Hg(Q)), L.c(), B(L, 1), L.m(e, r))
          : L &&
            (Ee(),
            G(L, 1, 1, () => {
              L = null;
            }),
            De()),
        Q[18].displayed
          ? M
            ? (M.p(Q, ce), ce[0] & 262144 && B(M, 1))
            : ((M = zg(Q)), M.c(), B(M, 1), M.m(e, s))
          : M &&
            (Ee(),
            G(M, 1, 1, () => {
              M = null;
            }),
            De());
      const Ce = {};
      ce[0] & 8192 && (Ce.disable = Q[13]),
        (ce[0] & 12288) | (ce[4] & 2097152) && (Ce.$$scope = { dirty: ce, ctx: Q }),
        o.$set(Ce),
        Q[11]
          ? F
            ? ce[0] & 2048 && B(F, 1)
            : ((F = Gg()), F.c(), B(F, 1), F.m(e, g))
          : F &&
            (Ee(),
            G(F, 1, 1, () => {
              F = null;
            }),
            De()),
        Q[25]
          ? O &&
            (Ee(),
            G(O, 1, 1, () => {
              O = null;
            }),
            De())
          : O
          ? (O.p(Q, ce), ce[0] & 33554432 && B(O, 1))
          : ((O = Kg(Q)), O.c(), B(O, 1), O.m(e, h)),
        Q[21]
          ? j &&
            (Ee(),
            G(j, 1, 1, () => {
              j = null;
            }),
            De())
          : j
          ? (j.p(Q, ce), ce[0] & 2097152 && B(j, 1))
          : ((j = Jg(Q)), j.c(), B(j, 1), j.m(e, _)),
        Q[21] || Q[22]
          ? fe &&
            (Ee(),
            G(fe, 1, 1, () => {
              fe = null;
            }),
            De())
          : fe
          ? (fe.p(Q, ce), ce[0] & 6291456 && B(fe, 1))
          : ((fe = Yg(Q)), fe.c(), B(fe, 1), fe.m(e, p)),
        Q[16] && !Q[21]
          ? X
            ? (X.p(Q, ce), ce[0] & 2162688 && B(X, 1))
            : ((X = Qg(Q)), X.c(), B(X, 1), X.m(e, null))
          : X &&
            (Ee(),
            G(X, 1, 1, () => {
              X = null;
            }),
            De()),
        (!v ||
          (ce[0] & 48234496 &&
            m !==
              (m =
                (Q[21] ? 'no-nav' : '') +
                ' ' +
                (Q[22] ? 'no-side-nav' : '') +
                ' ' +
                (Q[25] ? 'no-top-nav' : '') +
                ' ' +
                (Q[23] ? 'no-animation' : '') +
                ' svelte-1m7a6br'))) &&
          f(e, 'class', m),
        (!v || ce[0] & 16777216) && f(e, 'configversion', Q[24]);
    },
    i(Q) {
      if (!v) {
        B(C);
        for (let ce = 0; ce < T.length; ce += 1) B(N[ce]);
        B(I), B(L), B(M), B(o.$$.fragment, Q), B(F), B(O), B(j), B(fe), B(X), (v = !0);
      }
    },
    o(Q) {
      G(C), (N = N.filter(by));
      for (let ce = 0; ce < N.length; ce += 1) G(N[ce]);
      G(I), G(L), G(M), G(o.$$.fragment, Q), G(F), G(O), G(j), G(fe), G(X), (v = !1);
    },
    d(Q) {
      Q && A(e),
        C && C.d(),
        ct(N, Q),
        I && I.d(),
        L && L.d(),
        M && M.d(),
        ze(o),
        F && F.d(),
        O && O.d(),
        j && j.d(),
        fe && fe.d(),
        X && X.d(),
        (k = !1),
        y();
    }
  };
}
function Cy(i, e, t) {
  const n = Wt();
  let { store: l } = e,
    { getTranslation: r } = e,
    s = !1,
    o = { displayed: !1 },
    c,
    g,
    h = !1,
    _,
    p,
    m,
    v,
    k,
    y,
    C,
    T,
    N,
    D,
    I,
    L,
    M,
    F,
    O,
    j,
    fe,
    X,
    Q,
    ce = !0,
    Ce = !1,
    H,
    ae,
    $,
    K = [],
    le = { isDirty: !1, persistUrl: null },
    ve,
    ue,
    x = !1,
    be,
    ke,
    we = {},
    ie,
    { isSearchFieldVisible: Re } = e,
    { inputElem: Le } = e,
    { luigiCustomSearchRenderer__slot: _e } = e,
    { displaySearchResult: tt } = e,
    { displayCustomSearchResult: Ft = !0 } = e,
    { searchResult: Jt } = e,
    { storedUserSettings: Rt } = e,
    Un;
  const Bi = async U => {
      const oe = U.iframe.luigi,
        Me = oe.currentNode && oe.currentNode.userSettingsGroup,
        je = await re.readUserSettings(),
        Fe = Me && typeof je == 'object' && je !== null,
        Se = Ie.applyCoreStateData({
          isNavigateBack: Ce,
          viewStackSize: K.length,
          clientPermissions: oe.nextViewUrl ? oe.nextClientPermissions : oe.clientPermissions,
          userSettings: Fe ? je[Me] : null,
          anchor: sl.getAnchor()
        });
      return (
        Ie.specialIframeTypes
          .map(Oe => Oe.iframeConfigKey)
          .forEach(Oe => {
            Se[Oe] = U[Oe] || !1;
          }),
        Se
      );
    },
    zt = async (U, oe = {}) => {
      if (!U.iframe) {
        console.debug('iframe does not exist, not able to send context.');
        return;
      }
      const Me = {
        msg: 'luigi.init',
        context: JSON.stringify(Object.assign({}, U.context || D, oe)),
        nodeParams: JSON.stringify(Object.assign({}, U.nodeParams || I)),
        pathParams: JSON.stringify(Object.assign({}, U.pathParams || L)),
        searchParams: JSON.stringify(Object.assign({}, pe.prepareSearchParamsForClient(U.iframe.luigi.currentNode))),
        internal: JSON.stringify(await Bi(U)),
        authData: al.getStoredAuthData()
      };
      (U.iframe.luigi._lastUpdatedMessage = Me), Ie.sendMessageToIframe(U.iframe, Me);
    },
    bi = U => {
      const oe = { msg: 'luigi.auth.tokenIssued', authData: U };
      Ie.broadcastMessageToAllIframes(oe);
    },
    Wi = (U, oe) => {
      if (U.params.preserveView || U.params.viewgroup) {
        const Me = nn(U.params),
          je = it.getNodePath(F, M);
        K.push({
          path:
            oe.iframe.luigi && oe.iframe.luigi.pathParams
              ? ee.replaceVars(je, oe.iframe.luigi.pathParams, ':', !1)
              : je,
          nextPath: Me.startsWith('/') ? Me : '/' + Me,
          context: D
        }),
          (oe.iframe.pv = 'pv');
      }
    },
    $t = (U, oe, Me, je) => {
      let Fe = nn(U.params, Me, je);
      const { preventHistoryEntry: Se, preserveQueryParams: Oe, preventContextUpdate: _t } = U.params,
        Dt = { keepBrowserHistory: !Se, navSync: ce, preventContextUpdate: _t };
      return (
        (Fe = ee.addLeadingSlash(Fe)),
        (Fe = Oe ? pe.composeSearchParamsToRoute(Fe) : Fe),
        Wi(U, oe),
        it.navigateTo(Fe, Dt)
      );
    },
    jt = U => U.split('?')[0],
    Xn = (U, oe) => {
      if (U.length === 0) return !1;
      const Me = oe.startsWith('/') ? oe : `/${oe}`,
        je = [...U].pop();
      return [jt(je.path), jt(je.nextPath)].includes(jt(Me));
    },
    dt = U =>
      new Promise((oe, Me) => {
        Ol(U)
          ? Ci().then(
              () => {
                le && le.dirtySet && (U ? le.dirtySet.delete(U) : le.dirtySet.clear()), oe();
              },
              () => {
                Me();
              }
            )
          : oe();
      }),
    dn = () => ({
      get: () => ({
        unsavedChanges: le,
        hideNav: ki,
        viewUrl: O,
        nodeParams: I,
        viewGroup: j,
        urlParamsRaw: M,
        currentNode: F,
        navigationPath: ae,
        context: D,
        pathParams: L,
        hideSideNav: zi,
        isolateView: fe,
        pageErrorHandler: X,
        previousNodeValues: Q,
        mfSplitView: o,
        splitViewValues: c,
        splitViewIframe: y,
        splitViewWC: T,
        showLoadingIndicator: s,
        tabNav: ue,
        isNavigateBack: Ce,
        goBackContext: H,
        isNavigationSyncEnabled: ce
      }),
      set: U => {
        U &&
          (t(23, (Si = !1)),
          Object.getOwnPropertyNames(U).forEach(oe => {
            oe === 'hideNav'
              ? t(21, (ki = U.hideNav))
              : oe === 'viewUrl'
              ? (O = U.viewUrl)
              : oe === 'nodeParams'
              ? (I = U.nodeParams)
              : oe === 'viewGroup'
              ? (j = U.viewGroup)
              : oe === 'urlParamsRaw'
              ? (M = U.urlParamsRaw)
              : oe === 'currentNode'
              ? (F = U.currentNode)
              : oe === 'navigationPath'
              ? t(15, (ae = U.navigationPath))
              : oe === 'context'
              ? (D = U.context)
              : oe === 'pathParams'
              ? t(14, (L = U.pathParams))
              : oe === 'hideSideNav'
              ? (zi != U.hideSideNav &&
                  (t(23, (Si = !0)),
                  setTimeout(() => {
                    const Me = document.querySelector('#app');
                    Me && Me.classList.remove('no-animation');
                  })),
                t(22, (zi = U.hideSideNav)))
              : oe === 'isolateView'
              ? (fe = U.isolateView)
              : oe === 'pageErrorHandler'
              ? (X = U.pageErrorHandler)
              : oe === 'previousNodeValues'
              ? (Q = U.previousNodeValues)
              : oe === 'mfSplitView'
              ? t(12, (o = U.mfSplitView))
              : oe === 'splitViewValues'
              ? (c = U.splitViewValues)
              : oe === 'splitViewIframe'
              ? (y = U.splitViewIframe)
              : oe == 'splitViewWC'
              ? (T = U.splitViewWC)
              : oe === 'showLoadingIndicator'
              ? t(11, (s = U.showLoadingIndicator))
              : oe === 'tabNav'
              ? t(16, (ue = U.tabNav))
              : oe === 'isNavigateBack'
              ? (Ce = U.isNavigateBack)
              : oe === 'goBackContext'
              ? (H = U.goBackContext)
              : oe === 'isNavigationSyncEnabled' && (ce = U.isNavigationSyncEnabled);
          }));
      },
      shouldShowUnsavedChangesModal: Ol,
      getUnsavedChangesModalPromise: dt,
      showUnsavedChangesModal: Ci,
      showAlert: hl,
      prepareInternalData: Bi,
      dispatch: n
    }),
    $n = (U, oe) => {
      Fn.doOnStoreChange(
        l,
        () => {
          Vn.deleteCache();
          const Me = it.getCurrentPath();
          it.handleRouteChange(Me, dn(), U, oe);
        },
        ['navigation.nodes']
      ),
        pe.addRouteChangeListener((Me, je) => {
          const { withoutSync: Fe, preventContextUpdate: Se } = je || {};
          Xn(K, Me) || ((K = []), Qn.removeInactiveIframes(U));
          for (let _t = St.length; _t--; ) ai(_t);
          Xr.removeBackdrop(), wi(), it.handleRouteChange(Me, dn(), U, oe, Fe, Se);
        });
    },
    tn = (U, oe) => ee.replaceVars(it.getNodePath(U), oe, ':', !1),
    nn = (U, oe, Me) => {
      const je = oe || F,
        Fe = Me || L;
      let Se = ae;
      if (oe) {
        let _t = oe.parent;
        for (Se = [oe]; _t; ) Se.push(_t), (_t = _t.parent);
        Se = [...Se].reverse();
      }
      let Oe = U.link;
      if (U.fromVirtualTreeRoot) {
        const _t = [...Se].reverse().find(Dt => Dt.virtualTree);
        if (!_t) {
          console.error(
            'LuigiClient Error: fromVirtualTreeRoot() is not possible because you are not inside a Luigi virtualTree navigation node.'
          );
          return;
        }
        Oe = it.concatenatePath(tn(_t, Fe), U.link);
      } else if (U.fromParent) Oe = it.concatenatePath(tn(je.parent, Fe), U.link);
      else if (U.fromClosestContext) {
        const _t = [...Se].reverse().find(Dt => Dt.navigationContext && Dt.navigationContext.length > 0);
        Oe = it.concatenatePath(tn(_t, Fe), U.link);
      } else if (U.fromContext) {
        const _t = U.fromContext,
          Dt = [...Se].reverse().find(vl => _t === vl.navigationContext);
        Oe = it.concatenatePath(tn(Dt, Fe), U.link);
      } else U.intent ? (Oe = pe.getIntentPath(U.link)) : U.relative && (Oe = it.concatenatePath(tn(je, Fe), U.link));
      return (
        U.nodeParams &&
          Object.keys(U.nodeParams).length > 0 &&
          ((Oe += Oe.includes('?') ? '&' : '?'),
          Object.entries(U.nodeParams).forEach((_t, Dt) => {
            Oe +=
              encodeURIComponent(pe.getContentViewParamPrefix() + _t[0]) +
              '=' +
              encodeURIComponent(_t[1]) +
              (Dt < Object.keys(U.nodeParams).length - 1 ? '&' : '');
          })),
        Oe
      );
    },
    Bn = U => {
      const oe = U.detail.node;
      dt().then(() => {
        if ((Ml(), oe.openNodeInModal)) {
          const Me = pe.buildRoute(oe, `/${oe.pathSegment}`);
          bl(Me, oe.openNodeInModal === !0 ? {} : oe.openNodeInModal);
        } else if (oe.drawer) {
          const Me = pe.buildRoute(oe, `/${oe.pathSegment}`);
          (oe.drawer.isDrawer = !0), J(Me, oe.drawer);
        } else dn().set({ isNavigationSyncEnabled: !0 }), it.handleRouteClick(oe, dn());
      });
    },
    vi = () => {
      t(17, (x = !x));
    };
  Jr('handleNavigation', $t);
  const ln = U => (U ? !0 : (console.warn('No search provider defined.'), !1)),
    te = () => {
      ln(ke) && t(0, (Re = !1));
    },
    Ve = () => {
      ln(ke) && Le && (t(0, (Re = !0)), Le.focus());
    },
    gt = () => {
      ln(ke) && Le && (t(1, (Le.value = ''), Le), ri());
    },
    yt = () => {
      t(0, (Re = !Re)), Xw.clearSearchField();
    },
    Pt = () => {
      if (ln(ke) && Le) return Le.value;
    },
    wt = U => {
      ln(ke) &&
        Le &&
        (t(1, (Le.value = U), Le),
        ee.isFunction(ke.onInput)
          ? ke.onInput()
          : console.error('onInput is not a function. Please check the global search configuration.'));
    },
    an = U => {
      ln(ke) && Le && t(1, (Le.placeholder = U), Le);
    },
    Nn = U => {
      if (ln(ke))
        if (U && U.length > 0)
          if (ee.isFunction(ke.customSearchResultRenderer)) {
            t(4, (Ft = !0));
            let oe = {
              fireItemSelected: Me => {
                ke.onSearchResultItemSelected(Me);
              }
            };
            ke.customSearchResultRenderer(U, _e, oe);
          } else t(3, (tt = !0)), t(5, (Jt = U));
        else console.warn('Search result array is empty.');
    },
    ri = () => {
      if (ln(ke) && (t(3, (tt = !1)), t(5, (Jt = [])), _e))
        for (; _e.lastElementChild; ) _e.removeChild(_e.lastElementChild);
    },
    Hi = U => {
      let oe = U.detail.node,
        Me = { params: { link: oe.link, nodeParams: oe.params } };
      $t(Me);
    },
    cl = (U, oe) => {
      if (o.displayed) {
        console.warn('Only one splitview can be opened at a time');
        return;
      }
      t(12, (o = at.getDefaultData().mfSplitView)), at.open(dn(), U, oe);
    },
    wi = () => {
      at.close(dn());
    },
    hr = () => {
      at.collapse(dn()), t(12, (o.collapsed = !0), o);
    },
    gr = () => {
      at.expand(dn()), t(12, (o.collapsed = !1), o);
    },
    _r = () => (o.displayed ? o.collapsed : !1),
    pr = () => (o.displayed ? !o.collapsed : !1),
    El = () => o.displayed,
    mr = U => {
      (y = U.detail.splitViewIframe), (C = U.detail.splitViewIframeData), t(12, (o.collapsed = U.detail.collapsed), o);
    },
    br = U => {
      U.detail.displayed !== void 0 && t(12, (o.displayed = U.detail.displayed), o),
        U.detail.collapsed !== void 0 && t(12, (o.collapsed = U.detail.collapsed), o);
    },
    vr = U => {
      (T = U.detail.splitViewWC), U.detail.splitViewWCData, t(12, (o.collapsed = U.detail.collapsed), o);
    };
  let ki, zi, Si, qi, Dl, Vl;
  const Ml = () => {
      document.body.classList.remove('lui-leftNavToggle');
    },
    wr = () => {
      on();
      const U = window.innerWidth >= Xt.desktopMinWidth && qi < Xt.desktopMinWidth,
        oe = window.innerWidth < Xt.desktopMinWidth && qi >= Xt.desktopMinWidth;
      (U || oe) && Ml(), (qi = window.innerWidth);
    };
  let mn = [];
  const dl = (U, oe) => {
      if (!(!U || !(U.length > 0))) return U.filter(Me => Me.settings.id === oe)[0];
    },
    hl = (U, oe = !1) => {
      const Me = re.getConfigValue('settings.customAlertHandler');
      if (ee.isFunction(Me)) {
        const Fe = Me(U, oe);
        if (Fe !== !1) return Fe;
      }
      const je = mn;
      return (
        U.id || (U.id = ee.getRandomId()),
        U.id && je && dl(je, U.id)
          ? (console.error(`The alert with id '${U.id}' already exists in a queue, therefore it won't be displayed `),
            Promise.reject())
          : (U.closeAfter &&
              setTimeout(() => {
                dl(mn, U.id) && gl(U.id);
              }, U.closeAfter),
            new Promise((Fe, Se) => {
              t(
                26,
                (mn = [...(je || []), { displayed: !0, settings: U, openFromClient: oe, promise: { resolve: Fe } }])
              );
            }))
      );
    },
    gl = (U, oe) => {
      const Me = dl(mn, U);
      if (!Me) {
        console.error('An unexisting alert has been dismissed.', mn, U);
        return;
      }
      if ((t(26, (mn = mn.filter(je => je.settings.id !== U))), Me.openFromClient)) {
        const je = Qn.getActiveIframe($),
          Fe = { msg: 'luigi.ux.alert.hide', id: U, dismissKey: oe };
        Ie.sendMessageToIframe(je, Fe);
      } else Me.promise && Me.promise.resolve(oe || U);
    },
    kr = U => {
      gl(U.detail.id, U.detail.dismissKey);
    };
  let Gi;
  const _l = () => {
    t(27, (Gi = { displayed: !1, content: {}, openFromClient: !1, promise: null }));
  };
  _l();
  const pl = (U, oe = !1, Me) =>
      new Promise((je, Fe) => {
        t(
          27,
          (Gi = {
            displayed: !0,
            settings: U,
            openFromClient: oe,
            promise: { resolve: je, reject: Fe },
            targetIframe: Me
          })
        );
      }),
    ml = U => {
      const { promise: oe, openFromClient: Me, targetIframe: je } = Gi;
      if ((_l(), U ? oe.resolve() : oe.reject(), Me && je)) {
        const Fe = { msg: 'luigi.ux.confirmationModal.hide', data: { confirmed: U } };
        Ie.sendMessageToIframe(je, Fe);
      }
    },
    Ol = U => {
      if (le.dirtySet) {
        if (U) return le.dirtySet.has(U);
        if (le.dirtySet.size > 0) return !0;
      }
      return !1;
    },
    Ci = () =>
      pl({
        header: ht.getTranslation('luigi.unsavedChangesAlert.header'),
        body: ht.getTranslation('luigi.unsavedChangesAlert.body'),
        buttonDismiss: ht.getTranslation('luigi.button.dismiss'),
        buttonConfirm: ht.getTranslation('luigi.button.confirm')
      });
  Jr('getUnsavedChangesModalPromise', dt);
  let St = [];
  const si = U => {
    if (typeof U > 'u') {
      t(28, (St = []));
      return;
    }
    t(28, (St = St.filter((oe, Me) => U !== Me)));
  };
  si();
  const bl = async (U, oe) => {
      if (await Te.shouldPreventNavigationForPath(U)) return;
      const Me = { mfModal: { displayed: !0, nodepath: U, settings: oe } };
      t(28, (St = [...St, Me])),
        re.getConfigBooleanValue('routing.showModalPathInUrl') && St.length === 1 && it.appendModalDataToUrl(U, oe);
    },
    Fl = (U, oe) => {
      t(28, (St[oe].modalIframe = U.detail.modalIframe), St),
        t(28, (St[oe].modalIframeData = U.detail.modalIframeData), St);
    },
    Ul = (U, oe) => {
      t(28, (St[oe].modalWC = U.detail.modalWC), St), t(28, (St[oe].modalWCData = U.detail.modalWCData), St);
    },
    ai = (U, oe, Me) => {
      const je = (Oe, _t) => {
          re.getConfigBooleanValue('routing.showModalPathInUrl') && St.length === 1 && it.removeModalDataFromUrl(_t),
            si(Oe);
        },
        Fe = St[U],
        Se = ee.getRemotePromise(Fe.mfModal.settings.onClosePromiseId);
      Fe && Fe.modalIframe
        ? dt(Fe.modalIframe.contentWindow).then(() => {
            je(U, oe), Se && Se.doResolve(Me);
          })
        : Fe && Fe.modalWC && (je(U, oe), Se && Se.doResolve(Me));
    };
  Jr('openViewInModal', bl);
  let Ut = {};
  const yi = () => {
    t(29, (Ut.displayed = !1), Ut), t(29, (Ut.nodepath = void 0), Ut), t(29, (Ut.settings = {}), Ut), t(13, (_ = !1));
  };
  yi();
  const J = async (U, oe) => {
      (await Te.shouldPreventNavigationForPath(U)) ||
        (t(29, (Ut.displayed = !0), Ut),
        t(29, (Ut.nodepath = U), Ut),
        t(29, (Ut.settings = oe), Ut),
        Ut.settings && Ut.settings.backdrop && t(13, (_ = !0)));
    },
    Et = () => window.innerWidth >= Xt.desktopMinWidth && Ut.displayed && Ut.settings && !Ut.settings.overlap,
    on = () => {
      if (!Et()) return;
      const U = document.querySelector('.iframeModalCtn._drawer'),
        oe = Ie.getCurrentMicrofrontendIframe();
      if (U && oe) {
        oe.removeAttribute('style'), document.querySelector('div.iframeContainer').removeAttribute('style');
        const { width: Me } = getComputedStyle(U),
          je = oe.clientWidth;
        oe.setAttribute('style', `width: calc(${je}px - ${Me})`);
      }
    },
    Pi = U => {
      (p = U.detail.modalIframe), (m = U.detail.modalIframeData), on();
    },
    es = U => {
      (v = U.detail.modalWC), U.detail.modalWCData, on();
    },
    ts = U => {
      h = U.detail.activeDrawer;
    },
    Bl = U => {
      if (
        (U && U.detail && U.detail.activeDrawer !== void 0 && (h = U.detail.activeDrawer),
        !h || (U && U.detail && U.detail.type !== 'modal'))
      )
        try {
          p
            ? dt(p.contentWindow).then(() => {
                yi();
              })
            : v &&
              dt().then(() => {
                yi();
              }),
            Ie.getCurrentMicrofrontendIframe().removeAttribute('style');
        } catch (oe) {
          console.log(oe);
        }
    },
    Sr = () => {
      const U = rr.processUserSettingGroups();
      Array.isArray(U) && U.length > 0
        ? (t(18, (we.userSettingGroups = [...U]), we), t(18, (we.displayed = !0), we))
        : console.info('There are no user setting groups in the settings section of the luigi config defined.');
    },
    _a = () => {
      t(18, (we.displayed = !1), we);
    },
    ns = async U => {
      if (await Te.shouldPreventNavigationForPath(U)) return;
      re.getConfigValue('routing.useHashRouting') && (U = '#' + U), window.open(U, '_blank', 'noopener,noreferrer');
    },
    Wl = U => {
      let oe = ae;
      if (F) {
        let Fe = F.parent;
        for (oe = [F]; Fe; ) oe.push(Fe), (Fe = Fe.parent);
        oe = [...oe].reverse();
      }
      let Me = U.link,
        je = tn(F, L);
      if (U.fromVirtualTreeRoot) {
        const Fe = [...oe].reverse().find(Oe => Oe.virtualTree);
        if (!Fe) {
          console.error(
            'LuigiClient Error: fromVirtualTreeRoot() is not possible because you are not inside a Luigi virtualTree navigation node.'
          );
          return;
        }
        const Se = tn(Fe, L);
        Me = je.split(Se).join('');
      } else if (U.fromParent) {
        const Fe = tn(F.parent, L);
        Me = je.split(Fe).join('');
      } else if (U.fromClosestContext) {
        const Fe = [...oe].reverse().find(Oe => Oe.navigationContext && Oe.navigationContext.length > 0),
          Se = tn(Fe, L);
        Me = je.split(Se).join('');
      } else if (U.fromContext) {
        const Fe = U.fromContext,
          Se = [...oe].reverse().find(_t => Fe === _t.navigationContext),
          Oe = tn(Se, L);
        Me = je.split(Oe).join('');
      } else Me = je;
      return Me;
    };
  function is(U) {
    sessionStorage.removeItem('historyState'), (ir.shouldPreload = !0), ir.preload(!0), (ir.shouldPreload = !1);
    const oe = re.getConfigValue('navigation.defaults.isolateView'),
      Me = re.getConfigValue('navigation.defaults.pageErrorHandler'),
      je = re.getConfigValue('navigation.defaults.runTimeErrorHandler'),
      Fe = {
        iframe: null,
        navigateOk: null,
        builderCompatibilityMode: Boolean(window.builderCompatibilityMode),
        isolateAllViews: oe,
        defaultPageErrorHandler: Me
      };
    ht.addCurrentLocaleChangeListener(Se => {
      const Oe = { msg: 'luigi.current-locale-changed', currentLocale: Se };
      Ie.broadcastMessageToAllIframes(Oe);
    }),
      Pn.addEventListener('popstate', async Se => {
        const Oe = mn;
        if (!Oe || !(Oe.length > 0)) return;
        const _t = Oe.map(Dt => {
          if (Dt && !Dt.openFromClient && typeof Dt.settings.ttl == 'number') {
            if (Dt.settings.ttl === 0) return null;
            Dt.settings.ttl--;
          }
          return Dt;
        }).filter(Dt => Dt);
        t(26, (mn = _t));
      }),
      Pn.addEventListener('message', async Se => {
        const Oe = Ie.getValidMessageSource(Se),
          _t = St[St.length - 1],
          Dt = _t && _t.modalIframe,
          vl = _t && _t.modalIframeData,
          Ji = {
            modalIframe: Dt,
            modalIframeData: vl,
            drawerIframe: p,
            drawerIframeData: m,
            drawer: k,
            modal: g,
            splitViewIframe: y,
            splitViewIframeData: C,
            splitView: N
          };
        if (!Oe) return;
        Oe._ready = !0;
        const Ir = Ie.getSpecialIframeMessageSource(Se, Ji),
          ji = Ir && Ir.length > 0,
          Tr = re.getConfigValue('communication.skipEventsWhenInactive');
        if (
          Tr &&
          Tr.length > 0 &&
          !ji &&
          Oe.contentWindow !== window &&
          !ee.isElementVisible(Oe) &&
          Tr.includes(Se.data.msg)
        ) {
          console.debug(`EVENT '${Se.data.msg}' from inactive iframe -> SKIPPED`);
          return;
        }
        if (Se.data.msg === 'custom') {
          const qe = re.getConfigValue('communication.customMessagesListeners') || {},
            Ke = sa.convertCustomMessageInternalToUser(Se.data),
            Xe = qe[Ke.id],
            Wn = 'luigi.updateUserSettings';
          if (we && Ke.id === Wn) {
            Xe && console.warn(`The key "${Wn}" is not allowed to use for custom messages.`);
            return;
          }
          if (typeof Xe == 'function') {
            const oi = Mn.getMicrofrontends().find(Yi => Ie.isMessageSource(Se, Yi.container));
            Xe(Ke, oi, ee.removeInternalProperties(Oe.luigi.currentNode));
          } else
            console.warn(
              `Warning: Custom message with id: '${Ke.id}' does not exist. Make sure you provided the same id as in the config file.`
            );
        }
        if (
          (Se.data.msg === 'luigi.init.ok' && (Oe.luigi.initOk = !0),
          Se.data.msg === 'luigi.navigate.ok' &&
            ((Oe.luigi.viewUrl = Oe.luigi.nextViewUrl),
            (Oe.luigi.nextViewUrl = ''),
            (Oe.luigi.clientPermissions = Oe.luigi.nextClientPermissions),
            delete Oe.luigi.nextClientPermissions,
            (Fe.navigateOk = !0),
            ir.preload()),
          Se.data.msg === 'luigi.get-context')
        ) {
          if (((Oe.luigi.clientVersion = Se.data.clientVersion), (Oe.luigi.initOk = !1), ji))
            Ir.forEach(async qe => {
              let Ke = Ji[qe.dataKey].context;
              const Xe = {
                ...Fe,
                iframe: Ji[qe.iframeKey],
                context: Ke,
                pathParams: Ji[qe.dataKey].pathParams,
                nodeParams: Ji[qe.dataKey].nodeParams,
                searchParams: pe.prepareSearchParamsForClient(Ji[qe.iframeKey].luigi.currentNode),
                modal: qe.iframeKey.startsWith('modal'),
                drawer: qe.iframeKey.startsWith('drawer'),
                splitView: qe.iframeKey.startsWith('splitView')
              };
              await zt(Xe, {});
            });
          else if (Fe.iframe && Ie.isMessageSource(Se, Fe.iframe))
            await zt(Fe, {}),
              (!F || !F.loadingIndicator || F.loadingIndicator.hideAutomatically !== !1) && t(11, (s = !1)),
              ir.preload();
          else if (Oe.luigi.preloading)
            await zt({ iframe: Oe, context: {}, nodeParams: {}, pathParams: {}, internal: {} }, {});
          else {
            let qe = rr.findActiveCustomUserSettingsIframe(Se.source);
            if (qe) {
              let Ke = qe.getAttribute('userSettingsGroup'),
                Xe = { context: { userSettingsData: Rt[Ke] }, iframe: qe };
              await zt(Xe);
            }
          }
          ir.viewGroupLoaded(Oe);
        }
        if (
          (Se.data.msg === 'luigi.show-loading-indicator' && t(11, (s = !0)),
          Se.data.msg === 'luigi.hide-loading-indicator' && t(11, (s = !1)),
          Se.data.msg === 'luigi.navigation.open')
        ) {
          Ce = !1;
          const qe = window.location.href,
            Ke = ji ? Oe.luigi.currentNode : void 0,
            Xe = ji ? Oe.luigi.pathParams : void 0,
            Wn = Se.data.params,
            { intent: oi, newTab: Yi, modal: wl, splitView: Lr, drawer: Hl, withoutSync: ba } = Wn;
          let Ar = Yi || wl || Lr || Hl;
          const Yt = () => {
              const bn = ee.getRemotePromise(Se.data.remotePromiseId);
              bn && bn.doResolve();
            },
            Qi = () => {
              const bn = ee.getRemotePromise(Se.data.remotePromiseId);
              bn && bn.doReject();
            },
            In = bn => {
              !bn || qe !== window.location.href ? Yt() : Qi();
            };
          Se.source !== window && !oi && Wn.link && (Wn.link = Wn.link.split('?')[0]);
          let rn = nn(Se.data.params, Ke, Xe);
          if (((Ar = Ar || (oi && rn.external)), !Ar))
            dt()
              .then(() => {
                (ce = !Se.data.params.withoutSync),
                  $t(Se.data, Fe, Ke, Xe)
                    .then(() => {
                      In(!0);
                    })
                    .catch(() => {
                      Qi();
                    }),
                  St.forEach((bn, vn) => {
                    ai(vn);
                  }),
                  wi(),
                  Bl(),
                  (ce = !0);
              })
              .catch(() => {
                Qi();
              });
          else {
            if (oi && rn.external) {
              it.navigateToExternalLink({ url: rn.url, sameWindow: !rn.openInNewTab });
              return;
            }
            if (((rn = ee.addLeadingSlash(rn)), Yi)) {
              await ns(rn), In();
              return;
            }
            const bn = await Cr(rn);
            if (((rn = await pe.handlePageNotFoundAndRetrieveRedirectPath(dn(), rn, bn)), !rn)) {
              Qi();
              return;
            }
            ($ = U),
              wl !== void 0
                ? (!wl.keepPrevious && si(), await bl(rn, wl === !0 ? {} : wl), In())
                : Lr !== void 0
                ? (await cl(rn, Lr), In())
                : Hl !== void 0 && (yi(), (Hl.isDrawer = !0), await J(rn, Hl), In());
          }
        }
        if (Se.data.msg === 'luigi.navigation.back') {
          const qe = St[St.length - 1],
            Ke = Se.data.goBackContext && JSON.parse(Se.data.goBackContext);
          Ie.isMessageSource(Se, qe && qe.modalIframe)
            ? (ai(St.length - 1, !0, Ke), Fe.iframe && (await zt(Fe, { goBackContext: Ke })))
            : Ie.isMessageSource(Se, y)
            ? (wi(), Fe.iframe && (await zt(Fe, { goBackContext: Ke })))
            : Ie.isMessageSource(Se, p)
            ? (h && (h = !h), Bl(), Fe.iframe && (await zt(Fe, { goBackContext: Ke })))
            : K && K.length > 0
            ? dt().then(() => {
                Qn.setActiveIframeToPrevious(U);
                const Xe = K.pop();
                (Fe.iframe = Qn.getActiveIframe(U)),
                  (Ce = !0),
                  (K = K),
                  (H = Ke),
                  $t({ params: { link: Xe.path } }, Fe);
              })
            : (Ke &&
                console.warn(
                  'Warning: goBack() does not support goBackContext value. This is available only when using the Luigi preserveView feature.'
                ),
              window.history.back());
        }
        if (Se.data.msg === 'luigi.navigation.currentRoute') {
          const qe = Se.data.data,
            Xe = { msg: 'luigi.navigation.currentRoute.answer', data: { route: Wl(qe), correlationId: qe.id } };
          Ie.sendMessageToIframe(Oe, Xe);
        }
        if (
          (Se.data.msg === 'luigi.auth.tokenIssued' && bi(Se.data.authData),
          Se.data.msg === 'luigi.navigation.updateModalDataPath')
        )
          if (ji) {
            const qe = ee.addLeadingSlash(nn(Se.data.params, Oe.luigi.currentNode, Oe.luigi.pathParams));
            it.updateModalDataInUrl(qe, Se.data.params.modal, Se.data.params.history);
          } else console.warn('updateModalDataPath can only be called from modal, ignoring.');
        if (Se.data.msg === 'luigi.navigation.pathExists') {
          const qe = Oe.luigi.currentNode,
            Ke = Oe.luigi.pathParams,
            Xe = Se.data.data,
            Wn = nn(Xe, qe, Ke),
            oi = Wn ? await Mt.getNavigationPath(re.getConfigValueAsync('navigation.nodes'), Wn) : !1,
            Yi = {
              msg: 'luigi.navigation.pathExists.answer',
              data: { correlationId: Xe.id, pathExists: oi ? oi.isExistingRoute : !1 }
            };
          Ie.sendMessageToIframe(Oe, Yi);
        }
        if (Se.data.msg === 'luigi.set-page-dirty') {
          if (!le.dirtySet) {
            const qe = new Set();
            qe.add(Se.source), (le = { dirtySet: qe });
          }
          (le.persistUrl = window.location.href),
            Se.data.dirty ? le.dirtySet.add(Se.source) : le.dirtySet.delete(Se.source);
        }
        if (Se.data.msg === 'luigi.ux.confirmationModal.show') {
          const qe = Se.data.data.settings;
          ($ = U), _l(), pl(qe, !0, Oe).catch(() => {});
        }
        if (Se.data.msg === 'luigi.ux.alert.show') {
          const { settings: qe } = Se.data.data;
          if (!qe.text && !ee.isFunction(re.getConfigValue('settings.customAlertHandler'))) {
            console.error(
              "Luigi Client alert: 'text' field for alert is empty or not present, therefore alert will not be displayed"
            );
            return;
          }
          ($ = U), hl(qe, !0).catch(() => {});
        }
        if (Se.data.msg === 'luigi.ux.set-current-locale')
          if (Oe.luigi.clientPermissions && Oe.luigi.clientPermissions.changeCurrentLocale) {
            const { currentLocale: qe } = Se.data.data;
            qe && ht.setCurrentLocale(qe);
          } else
            console.error(
              'Current local change from client declined because client permission changeCurrentLocale is not set for this view.'
            );
        if (
          (be &&
            !be.thirdPartyCookieScriptLocation &&
            Se.data.msg === 'luigi.third-party-cookie' &&
            Se.data.tpc === 'disabled' &&
            ls(),
          Se.data.msg === 'storage' &&
            k2.process(Oe.luigi.id, Se.origin, Se.data.data.id, Se.data.data.operation, Se.data.data.params),
          Se.data.msg === 'luigi-runtime-error-handling')
        ) {
          let qe = Oe.luigi.currentNode;
          qe && qe.runTimeErrorHandler && ee.isFunction(qe.runTimeErrorHandler.errorFn)
            ? qe.runTimeErrorHandler.errorFn(Se.data.errorObj, qe)
            : je && ee.isFunction(je.errorFn) && je.errorFn(Se.data.errorObj, qe);
        }
        if (Se.data.msg === 'luigi.addSearchParams')
          if (Oe.luigi.currentNode.clientPermissions && Oe.luigi.currentNode.clientPermissions.urlParameters) {
            const { data: qe, keepBrowserHistory: Ke } = Se.data;
            pe.addSearchParamsFromClient(Oe.luigi.currentNode, qe, Ke);
          } else console.warn('No client permissions to add url parameter for this node.');
        if (Se.data.msg === 'luigi.addNodeParams') {
          if (ji) return;
          const { data: qe, keepBrowserHistory: Ke } = Se.data;
          sl.addNodeParams(qe, Ke);
        }
        if (Se.data.msg === 'luigi.setAnchor') {
          const { anchor: qe } = Se.data;
          sl.setAnchor(qe);
        }
      }),
      $n(U, Fe);
  }
  Jr('store', l), Jr('getTranslation', r);
  const ls = U => {
      be &&
        be.thirdPartyCookieErrorHandling &&
        ee.isFunction(be.thirdPartyCookieErrorHandling) &&
        be.thirdPartyCookieErrorHandling();
    },
    Cr = async U => {
      const oe = { link: U, relative: U[0] !== '/', intent: pe.hasIntent(U) },
        Me = nn(oe),
        je = Me ? await Mt.getNavigationPath(re.getConfigValueAsync('navigation.nodes'), Me) : !1;
      return je ? je.isExistingRoute : !1;
    },
    rs = () => St.length > 0 || K.length !== 0;
  Kt(() => {
    if (
      (y_._init(),
      (ke = re.getConfigValue('globalSearch.searchProvider')),
      (ve = re.getConfigValue('settings.responsiveNavigation')),
      (qi = window.innerWidth),
      ve === 'simple')
    ) {
      if ((document.body.classList.add('lui-simpleSlideInNav'), Te.getBurgerTooltipConfig())) {
        const [U, oe] = Te.getBurgerTooltipConfig();
        U && oe && t(19, (ie = document.body.classList.contains('lui-leftNavToggle') ? U : oe));
      }
    } else if (ve === 'simpleMobileOnly') document.body.classList.add('lui-simpleSlideInNav', 'lui-mobileOnly');
    else {
      if (Te.getBurgerTooltipConfig()) {
        const [U, oe] = Te.getBurgerTooltipConfig();
        if (U && oe) {
          const Me = JSON.parse(localStorage.getItem(Te.COL_NAV_KEY));
          t(19, (ie = Me ? U : oe));
        }
      }
      document.body.classList.add('lui-semiCollapsible');
    }
    (be = re.getConfigValue('settings.thirdPartyCookieCheck')),
      be &&
        be.thirdPartyCookieScriptLocation &&
        setTimeout(() => {
          let U = document.createElement('iframe');
          (U.width = '0px'),
            (U.height = '0px'),
            (U.src = be.thirdPartyCookieScriptLocation),
            document.body.appendChild(U),
            (U.onload = function() {
              setTimeout(() => {
                my() === 'disabled' && ls();
              }),
                document.body.removeChild(U);
            });
        });
  }),
    Eo(() => {
      on();
    }),
    On(() => {
      t(20, (Un = ee.requestExperimentalFeature('breadcrumbs'))),
        (ke = re.getConfigValue('globalSearch.searchProvider')),
        t(24, (Dl = re.getConfigValue('tag'))),
        t(25, (Vl = re.getConfigValue('settings.header.disabled')));
    });
  const yr = U => ai(U, !0),
    pa = (U, oe) => Fl(oe, U),
    ss = (U, oe) => Ul(oe, U),
    Pr = () => ml(!0),
    Nr = () => ml(!1);
  function Ki(U) {
    (Rt = U), t(6, Rt);
  }
  function as(U) {
    (Re = U), t(0, Re);
  }
  function os(U) {
    (tt = U), t(3, tt);
  }
  function ma(U) {
    (Ft = U), t(4, Ft);
  }
  function us(U) {
    (Jt = U), t(5, Jt);
  }
  function fs(U) {
    (Le = U), t(1, Le);
  }
  function cs(U) {
    (_e = U), t(2, _e);
  }
  return (
    (i.$$set = U => {
      'store' in U && t(46, (l = U.store)),
        'getTranslation' in U && t(47, (r = U.getTranslation)),
        'isSearchFieldVisible' in U && t(0, (Re = U.isSearchFieldVisible)),
        'inputElem' in U && t(1, (Le = U.inputElem)),
        'luigiCustomSearchRenderer__slot' in U && t(2, (_e = U.luigiCustomSearchRenderer__slot)),
        'displaySearchResult' in U && t(3, (tt = U.displaySearchResult)),
        'displayCustomSearchResult' in U && t(4, (Ft = U.displayCustomSearchResult)),
        'searchResult' in U && t(5, (Jt = U.searchResult)),
        'storedUserSettings' in U && t(6, (Rt = U.storedUserSettings));
    }),
    [
      Re,
      Le,
      _e,
      tt,
      Ft,
      Jt,
      Rt,
      yt,
      ri,
      Hi,
      _a,
      s,
      o,
      _,
      L,
      ae,
      ue,
      x,
      we,
      ie,
      Un,
      ki,
      zi,
      Si,
      Dl,
      Vl,
      mn,
      Gi,
      St,
      Ut,
      Bn,
      vi,
      mr,
      br,
      vr,
      wr,
      kr,
      ml,
      Fl,
      Ul,
      ai,
      Pi,
      es,
      ts,
      Bl,
      is,
      l,
      r,
      te,
      Ve,
      gt,
      Pt,
      wt,
      an,
      Nn,
      cl,
      wi,
      hr,
      gr,
      _r,
      pr,
      El,
      hl,
      pl,
      Sr,
      Cr,
      rs,
      yr,
      pa,
      ss,
      Pr,
      Nr,
      Ki,
      as,
      os,
      ma,
      us,
      fs,
      cs
    ]
  );
}
class yy extends At {
  constructor(e) {
    super(),
      Lt(
        this,
        e,
        Cy,
        Sy,
        It,
        {
          store: 46,
          getTranslation: 47,
          isSearchFieldVisible: 0,
          inputElem: 1,
          luigiCustomSearchRenderer__slot: 2,
          displaySearchResult: 3,
          displayCustomSearchResult: 4,
          searchResult: 5,
          storedUserSettings: 6,
          closeSearchField: 48,
          openSearchField: 49,
          clearSearchField: 50,
          toggleSearch: 7,
          getGlobalSearchString: 51,
          setGlobalSearchString: 52,
          setSearchInputPlaceholder: 53,
          showSearchResult: 54,
          closeSearchResult: 8,
          handleSearchNavigation: 9,
          openSplitView: 55,
          closeSplitView: 56,
          collapseSplitView: 57,
          expandSplitView: 58,
          isSplitViewCollapsed: 59,
          isSplitViewExpanded: 60,
          existsSplitView: 61,
          showAlert: 62,
          showModal: 63,
          openUserSettings: 64,
          closeUserSettings: 10,
          pathExists: 65,
          hasBack: 66
        },
        null,
        [-1, -1, -1, -1, -1]
      );
  }
  get closeSearchField() {
    return this.$$.ctx[48];
  }
  get openSearchField() {
    return this.$$.ctx[49];
  }
  get clearSearchField() {
    return this.$$.ctx[50];
  }
  get toggleSearch() {
    return this.$$.ctx[7];
  }
  get getGlobalSearchString() {
    return this.$$.ctx[51];
  }
  get setGlobalSearchString() {
    return this.$$.ctx[52];
  }
  get setSearchInputPlaceholder() {
    return this.$$.ctx[53];
  }
  get showSearchResult() {
    return this.$$.ctx[54];
  }
  get closeSearchResult() {
    return this.$$.ctx[8];
  }
  get handleSearchNavigation() {
    return this.$$.ctx[9];
  }
  get openSplitView() {
    return this.$$.ctx[55];
  }
  get closeSplitView() {
    return this.$$.ctx[56];
  }
  get collapseSplitView() {
    return this.$$.ctx[57];
  }
  get expandSplitView() {
    return this.$$.ctx[58];
  }
  get isSplitViewCollapsed() {
    return this.$$.ctx[59];
  }
  get isSplitViewExpanded() {
    return this.$$.ctx[60];
  }
  get existsSplitView() {
    return this.$$.ctx[61];
  }
  get showAlert() {
    return this.$$.ctx[62];
  }
  get showModal() {
    return this.$$.ctx[63];
  }
  get openUserSettings() {
    return this.$$.ctx[64];
  }
  get closeUserSettings() {
    return this.$$.ctx[10];
  }
  get pathExists() {
    return this.$$.ctx[65];
  }
  get hasBack() {
    return this.$$.ctx[66];
  }
}
const Py = () => {
    const { subscribe: i, update: e, reset: t } = or({}),
      n = {};
    return {
      subscribe: i,
      update: e,
      reset: t,
      subscribeToScope: (l, r) => {
        let s = n[r];
        s || ((s = new Set()), (n[r] = s)), s.add(l);
      },
      fire: (l, r) => {
        let s = n[l];
        s &&
          [...s].forEach(o => {
            o(r);
          });
      }
    };
  },
  M_ = Py(),
  Ny = Gw((i, e, t) => ht.getTranslation(i, e, t));
Luigi._store = M_;
const Iy = () =>
  new Promise(i => {
    ht._init(),
      en.init().then(() => {
        setTimeout(() => {
          let e;
          Mn.isCustomLuigiContainer() &&
            document.getElementsByTagName('html')[0].classList.add('luigi-app-in-custom-container'),
            (e = new yy({ target: Mn.getLuigiContainer(), props: { store: M_, getTranslation: Ny } })),
            (Luigi.showAlert = t => e.showAlert(t)),
            (Luigi.showConfirmationModal = t => e.showModal(t)),
            (Luigi.closeSearchField = () => e.closeSearchField()),
            (Luigi.openSearchField = () => e.openSearchField()),
            (Luigi.getGlobalSearchString = () => e.getGlobalSearchString()),
            (Luigi.setGlobalSearchString = t => {
              e.setGlobalSearchString(t);
            }),
            (Luigi.showSearchResult = t => e.showSearchResult(t)),
            (Luigi.closeSearchResult = () => {
              e.closeSearchResult();
            }),
            (Luigi.clearSearchField = () => {
              e.clearSearchField();
            }),
            (Luigi.splitView = {
              splitViewHandle: {
                close: () => e.closeSplitView(),
                collapse: () => e.collapseSplitView(),
                expand: () => e.expandSplitView(),
                isCollapsed: () => e.isSplitViewCollapsed(),
                isExpanded: () => e.isSplitViewExpanded(),
                exists: () => e.existsSplitView()
              }
            }),
            (Luigi.pathExists = t => e.pathExists(t)),
            (Luigi.hasBack = () => e.hasBack()),
            (Luigi.openUserSettings = () => {
              e.openUserSettings();
            }),
            (Luigi.closeUserSettings = () => {
              e.closeUserSettings();
            }),
            i();
        });
      });
  });
re.setConfigCallbacks(Iy);
//# sourceMappingURL=luigi.js.map
