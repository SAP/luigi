!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.LuigiClient = t())
    : (e.LuigiClient = t());
})(window, function() {
  return (function(e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var o = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (n.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (n.t = function(e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if ((n.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: e }), 2 & t && 'string' != typeof e))
          for (var o in e)
            n.d(
              r,
              o,
              function(t) {
                return e[t];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return n.d(t, 'a', t), t;
      }),
      (n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ''),
      n((n.s = 1))
    );
  })([
    function(e) {
      e.exports = JSON.parse(
        '{"name":"@luigi-project/client","description":"Javascript library supporting consumers of the Luigi framework","license":"Apache-2.0","main":"luigi-client.js","repository":{"type":"git","url":"ssh://github.com/SAP/luigi.git"},"publishConfig":{"tag":"luigi-client"},"keywords":["luigi","UI","extensibility","micro-frontends","microfrontends"],"version":"2.0.1"}'
      );
    },
    function(e, t, n) {
      'use strict';
      function r(e) {
        return (r =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              })(e);
      }
      function o(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            'value' in o && (o.writable = !0),
            Object.defineProperty(
              e,
              ((i = o.key),
              (a = void 0),
              (a = (function(e, t) {
                if ('object' !== r(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var o = n.call(e, t || 'default');
                  if ('object' !== r(o)) return o;
                  throw new TypeError('@@toPrimitive must return a primitive value.');
                }
                return ('string' === t ? String : Number)(e);
              })(i, 'string')),
              'symbol' === r(a) ? a : String(a)),
              o
            );
        }
        var i, a;
      }
      n.r(t);
      var i = (function() {
        function e() {
          !(function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, e),
            (this.promises = {});
        }
        var t, n, r;
        return (
          (t = e),
          (n = [
            {
              key: 'setPromise',
              value: function(e, t) {
                this.promises[e] = t;
              }
            },
            {
              key: 'getPromise',
              value: function(e) {
                return this.promises[e];
              }
            }
          ]) && o(t.prototype, n),
          r && o(t, r),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          e
        );
      })();
      function a(e) {
        return (a =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              })(e);
      }
      function u(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(
              e,
              ((o = r.key),
              (i = void 0),
              (i = (function(e, t) {
                if ('object' !== a(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(e, t || 'default');
                  if ('object' !== a(r)) return r;
                  throw new TypeError('@@toPrimitive must return a primitive value.');
                }
                return ('string' === t ? String : Number)(e);
              })(o, 'string')),
              'symbol' === a(i) ? i : String(i)),
              r
            );
        }
        var o, i;
      }
      var s = new ((function() {
        function e() {
          !(function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, e),
            (this.listeners = []),
            (this.origin = '');
          var t = function(e) {
            if (e.data.msg)
              if ('custom' === e.data.msg) {
                var t = this.convertCustomMessageInternalToUser(e.data);
                this.listeners
                  .filter(function(e) {
                    return e.name === t.id;
                  })
                  .map(function(e) {
                    return e.eventFn(t, e.listenerId);
                  });
              } else
                this.listeners
                  .filter(function(t) {
                    return t.name === e.data.msg;
                  })
                  .map(function(t) {
                    return t.eventFn(e, t.listenerId);
                  });
          }.bind(this);
          window.addEventListener('message', t);
        }
        var t, n, r;
        return (
          (t = e),
          (n = [
            {
              key: 'convertCustomMessageInternalToUser',
              value: function(e) {
                return e.data;
              }
            },
            {
              key: 'convertCustomMessageUserToInternal',
              value: function(e) {
                return { msg: 'custom', data: e };
              }
            },
            {
              key: 'convertStorageMessageToInternal',
              value: function(e) {
                return { msg: 'storage', data: e };
              }
            },
            {
              key: 'addEventListener',
              value: function(e, t) {
                var n = this.getRandomId();
                return this.listeners.push({ name: e, eventFn: t, listenerId: n }), n;
              }
            },
            {
              key: 'removeEventListener',
              value: function(e) {
                return (
                  !!Boolean(
                    this.listeners.find(function(t) {
                      return t.listenerId === e;
                    })
                  ) &&
                  ((this.listeners = this.listeners.filter(function(t) {
                    return t.listenerId !== e;
                  })),
                  !0)
                );
              }
            },
            {
              key: 'getRandomId',
              value: function() {
                return (window.crypto || window.msCrypto).getRandomValues(new Uint32Array(1))[0];
              }
            },
            {
              key: 'isFunction',
              value: function(e) {
                return 'function' == typeof e;
              }
            },
            {
              key: 'isObject',
              value: function(e) {
                return '[object Object]' === Object.prototype.toString.call(e);
              }
            },
            {
              key: 'getLuigiCoreDomain',
              value: function() {
                return this.origin;
              }
            },
            {
              key: 'setLuigiCoreDomain',
              value: function(e) {
                e && 'null' !== e && (this.origin = e);
              }
            },
            {
              key: 'setTargetOrigin',
              value: function(e) {
                this.setLuigiCoreDomain(e);
              }
            },
            {
              key: 'sendPostMessageToLuigiCore',
              value: function(e) {
                if (this.origin)
                  try {
                    window.parent.postMessage(e, this.origin);
                  } catch (t) {
                    console.warn(
                      'Unable to post message ' + e + ' to Luigi Core from origin ' + this.origin + ': ' + t
                    );
                  }
                else
                  console.warn(
                    'There is no target origin set. You can specify the target origin by calling LuigiClient.setTargetOrigin("targetorigin") in your micro frontend.'
                  );
              }
            },
            {
              key: 'hasIntent',
              value: function(e) {
                return !!e && e.toLowerCase().includes('#?intent=');
              }
            },
            {
              key: 'deSanitizeParamsMap',
              value: function(e) {
                var t = this;
                return Object.entries(e).reduce(function(e, n) {
                  return (e[t.deSanitizeParam(n[0])] = t.deSanitizeParam(n[1])), e;
                }, {});
              }
            },
            {
              key: 'deSanitizeParam',
              value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '';
                return String(e)
                  .replaceAll('&lt;', '<')
                  .replaceAll('&gt;', '>')
                  .replaceAll('&quot;', '"')
                  .replaceAll('&#39;', "'")
                  .replaceAll('&sol;', '/');
              }
            }
          ]) && u(t.prototype, n),
          r && u(t, r),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          e
        );
      })())();
      function c(e) {
        return (c =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              })(e);
      }
      function l(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(
              e,
              ((o = r.key),
              (i = void 0),
              (i = (function(e, t) {
                if ('object' !== c(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(e, t || 'default');
                  if ('object' !== c(r)) return r;
                  throw new TypeError('@@toPrimitive must return a primitive value.');
                }
                return ('string' === t ? String : Number)(e);
              })(o, 'string')),
              'symbol' === c(i) ? i : String(i)),
              r
            );
        }
        var o, i;
      }
      function f(e, t) {
        return (f = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function(e, t) {
              return (e.__proto__ = t), e;
            })(e, t);
      }
      function v(e) {
        var t = (function() {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
          } catch (e) {
            return !1;
          }
        })();
        return function() {
          var n,
            r = y(e);
          if (t) {
            var o = y(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return d(this, n);
        };
      }
      function d(e, t) {
        if (t && ('object' === c(t) || 'function' == typeof t)) return t;
        if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
        return (function(e) {
          if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e;
        })(e);
      }
      function y(e) {
        return (y = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      var p = new ((function(e) {
        !(function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError('Super expression must either be null or a function');
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 }
          })),
            Object.defineProperty(e, 'prototype', { writable: !1 }),
            t && f(e, t);
        })(a, e);
        var t,
          r,
          o,
          i = v(a);
        function a() {
          var e;
          return (
            (function(e, t) {
              if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
            })(this, a),
            ((e = i.call(this)).luigiInitialized = !1),
            (e.defaultContextKeys = ['context', 'internal', 'nodeParams', 'pathParams', 'searchParams']),
            e.setCurrentContext(
              e.defaultContextKeys.reduce(function(e, t) {
                return (e[t] = {}), e;
              }, {})
            ),
            (e._onContextUpdatedFns = {}),
            (e._onInactiveFns = {}),
            (e._onInitFns = {}),
            (e.authData = {}),
            e._isDeferInitDefined() || e.luigiClientInit(),
            e
          );
        }
        return (
          (t = a),
          (r = [
            {
              key: '_isDeferInitDefined',
              value: function() {
                return window.document.head.hasAttribute('defer-luigi-init');
              }
            },
            {
              key: 'isLuigiClientInitialized',
              value: function() {
                return this.luigiInitialized;
              }
            },
            {
              key: 'luigiClientInit',
              value: function() {
                var e = this;
                if (this.luigiInitialized) console.warn('Luigi Client has been already initialized');
                else {
                  var t = function(t) {
                      for (var n = 0; n < e.defaultContextKeys.length; n++) {
                        var r = e.defaultContextKeys[n];
                        try {
                          'string' == typeof t[r] && (t[r] = JSON.parse(t[r]));
                        } catch (e) {
                          console.info('unable to parse luigi context data for', r, t[r], e);
                        }
                      }
                      e.setCurrentContext(t);
                    },
                    r = function(t) {
                      t && (e.authData = t);
                    };
                  s.addEventListener('luigi.init', function(n) {
                    t(n.data),
                      r(n.data.authData),
                      s.setLuigiCoreDomain(n.origin),
                      (e.luigiInitialized = !0),
                      e._notifyInit(n.origin),
                      s.sendPostMessageToLuigiCore({ msg: 'luigi.init.ok' });
                  }),
                    s.addEventListener('luigi-client.inactive-microfrontend', function(t) {
                      e._notifyInactive(t.origin);
                    }),
                    s.addEventListener('luigi.auth.tokenIssued', function(e) {
                      r(e.data.authData);
                    }),
                    s.addEventListener('luigi.navigate', function(n) {
                      if ((t(n.data), !e.currentContext.internal.isNavigateBack && !e.currentContext.withoutSync)) {
                        var r = window.location.hash;
                        history.replaceState({ luigiInduced: !0 }, '', n.data.viewUrl),
                          window.dispatchEvent(new PopStateEvent('popstate', { state: 'luiginavigation' })),
                          window.location.hash !== r && window.dispatchEvent(new HashChangeEvent('hashchange'));
                      }
                      e.currentContext.withoutSync &&
                        Object.assign(e.currentContext.context, {
                          viewUrl: n.data.viewUrl ? n.data.viewUrl : void 0,
                          pathParams: n.data.pathParams ? n.data.pathParams : void 0
                        }),
                        e._notifyUpdate(),
                        s.sendPostMessageToLuigiCore({ msg: 'luigi.navigate.ok' });
                    }),
                    window.parent.postMessage({ msg: 'luigi.get-context', clientVersion: n(0).version }, '*'),
                    this._tpcCheck();
                }
              }
            },
            {
              key: '_tpcCheck',
              value: function() {
                var e,
                  t,
                  n = 'enabled',
                  r = document.cookie;
                r &&
                  (e = r
                    .split(';')
                    .map(function(e) {
                      return e.trim();
                    })
                    .find(function(e) {
                      return 'luigiCookie=true' == e;
                    })),
                  'luigiCookie=true' === e && ((t = e.split('=')[0]), (document.cookie = t + '=; Max-Age=-99999999;')),
                  (document.cookie = 'luigiCookie=true; SameSite=None; Secure'),
                  (r = document.cookie) &&
                    (e = r
                      .split(';')
                      .map(function(e) {
                        return e.trim();
                      })
                      .find(function(e) {
                        return 'luigiCookie=true' == e;
                      })),
                  'luigiCookie=true' === e
                    ? (window.parent.postMessage({ msg: 'luigi.third-party-cookie', tpc: n }, '*'),
                      (document.cookie = t + '=; Max-Age=-99999999;'))
                    : ((n = 'disabled'),
                      window.parent.postMessage({ msg: 'luigi.third-party-cookie', tpc: n }, '*'),
                      console.warn('Third party cookies are not supported!'));
              }
            },
            {
              key: '_callAllFns',
              value: function(e, t, n) {
                for (var r in e) e.hasOwnProperty(r) && s.isFunction(e[r]) && e[r](t, n);
              }
            },
            {
              key: '_notifyInit',
              value: function(e) {
                this._callAllFns(this._onInitFns, this.currentContext.context, e);
              }
            },
            {
              key: '_notifyUpdate',
              value: function() {
                this._callAllFns(this._onContextUpdatedFns, this.currentContext.context);
              }
            },
            {
              key: '_notifyInactive',
              value: function() {
                this._callAllFns(this._onInactiveFns);
              }
            },
            {
              key: 'setCurrentContext',
              value: function(e) {
                this.currentContext = e;
              }
            },
            {
              key: 'addInitListener',
              value: function(e) {
                var t = s.getRandomId();
                return (
                  (this._onInitFns[t] = e),
                  this.luigiInitialized && s.isFunction(e) && e(this.currentContext.context, s.getLuigiCoreDomain()),
                  t
                );
              }
            },
            {
              key: 'removeInitListener',
              value: function(e) {
                return !!this._onInitFns[e] && ((this._onInitFns[e] = void 0), !0);
              }
            },
            {
              key: 'addContextUpdateListener',
              value: function(e) {
                var t = s.getRandomId();
                return (
                  (this._onContextUpdatedFns[t] = e),
                  this.luigiInitialized && s.isFunction(e) && e(this.currentContext.context),
                  t
                );
              }
            },
            {
              key: 'removeContextUpdateListener',
              value: function(e) {
                return !!this._onContextUpdatedFns[e] && ((this._onContextUpdatedFns[e] = void 0), !0);
              }
            },
            {
              key: 'addInactiveListener',
              value: function(e) {
                var t = s.getRandomId();
                return (this._onInactiveFns[t] = e), t;
              }
            },
            {
              key: 'removeInactiveListener',
              value: function(e) {
                return !!this._onInactiveFns[e] && ((this._onInactiveFns[e] = void 0), !0);
              }
            },
            {
              key: 'addCustomMessageListener',
              value: function(e, t) {
                return s.addEventListener(e, function(e, n) {
                  return t(e, n);
                });
              }
            },
            {
              key: 'removeCustomMessageListener',
              value: function(e) {
                return s.removeEventListener(e);
              }
            },
            {
              key: 'getToken',
              value: function() {
                return this.authData.accessToken;
              }
            },
            {
              key: 'getContext',
              value: function() {
                return this.getEventData();
              }
            },
            {
              key: 'getEventData',
              value: function() {
                return this.currentContext.context;
              }
            },
            {
              key: 'getActiveFeatureToggles',
              value: function() {
                return this.currentContext.internal.activeFeatureToggleList;
              }
            },
            {
              key: 'addNodeParams',
              value: function(e) {
                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                e && s.sendPostMessageToLuigiCore({ msg: 'luigi.addNodeParams', data: e, keepBrowserHistory: t });
              }
            },
            {
              key: 'getNodeParams',
              value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return e ? s.deSanitizeParamsMap(this.currentContext.nodeParams) : this.currentContext.nodeParams;
              }
            },
            {
              key: 'getPathParams',
              value: function() {
                return this.currentContext.pathParams;
              }
            },
            {
              key: 'getCoreSearchParams',
              value: function() {
                return this.currentContext.searchParams || {};
              }
            },
            {
              key: 'addCoreSearchParams',
              value: function(e) {
                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                e && s.sendPostMessageToLuigiCore({ msg: 'luigi.addSearchParams', data: e, keepBrowserHistory: t });
              }
            },
            {
              key: 'getClientPermissions',
              value: function() {
                return this.currentContext.internal.clientPermissions || {};
              }
            },
            {
              key: 'setTargetOrigin',
              value: function(e) {
                s.setTargetOrigin(e);
              }
            },
            {
              key: 'sendCustomMessage',
              value: function(e) {
                var t = s.convertCustomMessageUserToInternal(e);
                s.sendPostMessageToLuigiCore(t);
              }
            },
            {
              key: 'getUserSettings',
              value: function() {
                return this.currentContext.internal.userSettings;
              }
            },
            {
              key: 'getAnchor',
              value: function() {
                return this.currentContext.internal.anchor || '';
              }
            },
            {
              key: 'setAnchor',
              value: function(e) {
                s.sendPostMessageToLuigiCore({ msg: 'luigi.setAnchor', anchor: e });
              }
            }
          ]) && l(t.prototype, r),
          o && l(t, o),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          a
        );
      })(i))();
      function g(e) {
        return (g =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              })(e);
      }
      function m(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(
              e,
              ((o = r.key),
              (i = void 0),
              (i = (function(e, t) {
                if ('object' !== g(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(e, t || 'default');
                  if ('object' !== g(r)) return r;
                  throw new TypeError('@@toPrimitive must return a primitive value.');
                }
                return ('string' === t ? String : Number)(e);
              })(o, 'string')),
              'symbol' === g(i) ? i : String(i)),
              r
            );
        }
        var o, i;
      }
      function h(e, t) {
        return (h = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function(e, t) {
              return (e.__proto__ = t), e;
            })(e, t);
      }
      function b(e) {
        var t = (function() {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
          } catch (e) {
            return !1;
          }
        })();
        return function() {
          var n,
            r = k(e);
          if (t) {
            var o = k(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return w(this, n);
        };
      }
      function w(e, t) {
        if (t && ('object' === g(t) || 'function' == typeof t)) return t;
        if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
        return (function(e) {
          if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e;
        })(e);
      }
      function k(e) {
        return (k = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      var P = (function(e) {
        !(function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError('Super expression must either be null or a function');
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 }
          })),
            Object.defineProperty(e, 'prototype', { writable: !1 }),
            t && h(e, t);
        })(i, e);
        var t,
          n,
          r,
          o = b(i);
        function i(e) {
          var t;
          !(function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, i),
            ((t = o.call(this)).validSplitViewEvents = ['expand', 'collapse', 'resize', 'close']),
            (t.splitView = { exists: !0, size: 40, collapsed: !1 }),
            Object.assign(t.splitView, e);
          return (
            (t.splitView.listeners = [
              s.addEventListener('luigi.navigation.splitview.internal', function(e) {
                Object.assign(t.splitView, e.data.data);
              })
            ]),
            t.on('resize', function(e) {
              t.splitView.size = e;
            }),
            t.on('close', function() {
              t.splitView.listeners.forEach(function(e) {
                return s.removeEventListener(e);
              });
            }),
            t
          );
        }
        return (
          (t = i),
          (n = [
            {
              key: 'sendSplitViewEvent',
              value: function(e, t) {
                s.sendPostMessageToLuigiCore({ msg: 'luigi.navigation.splitview.'.concat(e), data: t });
              }
            },
            {
              key: 'collapse',
              value: function() {
                this.sendSplitViewEvent('collapse');
              }
            },
            {
              key: 'expand',
              value: function() {
                this.sendSplitViewEvent('expand');
              }
            },
            {
              key: 'close',
              value: function() {
                this.sendSplitViewEvent('close');
              }
            },
            {
              key: 'setSize',
              value: function(e) {
                this.sendSplitViewEvent('resize', e);
              }
            },
            {
              key: 'on',
              value: function(e, t) {
                if (!this.validSplitViewEvents.includes(e))
                  return console.warn(e + ' is not a valid split view event'), !1;
                var n = s.addEventListener('luigi.navigation.splitview.'.concat(e, '.ok'), function(e) {
                  var n = 'number' == typeof e.data.data ? e.data.data : void 0;
                  t(n);
                });
                return this.splitView.listeners.push(n), n;
              }
            },
            {
              key: 'removeEventListener',
              value: function(e) {
                return s.removeEventListener(e);
              }
            },
            {
              key: 'exists',
              value: function() {
                return this.splitView.exists;
              }
            },
            {
              key: 'getSize',
              value: function() {
                return this.splitView.size;
              }
            },
            {
              key: 'isCollapsed',
              value: function() {
                return this.splitView.collapsed;
              }
            },
            {
              key: 'isExpanded',
              value: function() {
                return !this.splitView.collapsed;
              }
            }
          ]) && m(t.prototype, n),
          r && m(t, r),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          i
        );
      })(i);
      function C(e) {
        return (C =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              })(e);
      }
      function S(e, t) {
        return (
          (function(e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function(e, t) {
            var n = null == e ? null : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
            if (null != n) {
              var r,
                o,
                i,
                a,
                u = [],
                s = !0,
                c = !1;
              try {
                if (((i = (n = n.call(e)).next), 0 === t)) {
                  if (Object(n) !== n) return;
                  s = !1;
                } else for (; !(s = (r = i.call(n)).done) && (u.push(r.value), u.length !== t); s = !0);
              } catch (e) {
                (c = !0), (o = e);
              } finally {
                try {
                  if (!s && null != n.return && ((a = n.return()), Object(a) !== a)) return;
                } finally {
                  if (c) throw o;
                }
              }
              return u;
            }
          })(e, t) ||
          O(e, t) ||
          (function() {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            );
          })()
        );
      }
      function x(e, t) {
        var n = ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
        if (!n) {
          if (Array.isArray(e) || (n = O(e)) || (t && e && 'number' == typeof e.length)) {
            n && (e = n);
            var r = 0,
              o = function() {};
            return {
              s: o,
              n: function() {
                return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
              },
              e: function(e) {
                throw e;
              },
              f: o
            };
          }
          throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          );
        }
        var i,
          a = !0,
          u = !1;
        return {
          s: function() {
            n = n.call(e);
          },
          n: function() {
            var e = n.next();
            return (a = e.done), e;
          },
          e: function(e) {
            (u = !0), (i = e);
          },
          f: function() {
            try {
              a || null == n.return || n.return();
            } finally {
              if (u) throw i;
            }
          }
        };
      }
      function O(e, t) {
        if (e) {
          if ('string' == typeof e) return j(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return (
            'Object' === n && e.constructor && (n = e.constructor.name),
            'Map' === n || 'Set' === n
              ? Array.from(e)
              : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? j(e, t)
              : void 0
          );
        }
      }
      function j(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function L(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(
              e,
              ((o = r.key),
              (i = void 0),
              (i = (function(e, t) {
                if ('object' !== C(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(e, t || 'default');
                  if ('object' !== C(r)) return r;
                  throw new TypeError('@@toPrimitive must return a primitive value.');
                }
                return ('string' === t ? String : Number)(e);
              })(o, 'string')),
              'symbol' === C(i) ? i : String(i)),
              r
            );
        }
        var o, i;
      }
      function E(e, t) {
        return (E = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function(e, t) {
              return (e.__proto__ = t), e;
            })(e, t);
      }
      function I(e) {
        var t = (function() {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
          } catch (e) {
            return !1;
          }
        })();
        return function() {
          var n,
            r = _(e);
          if (t) {
            var o = _(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return T(this, n);
        };
      }
      function T(e, t) {
        if (t && ('object' === C(t) || 'function' == typeof t)) return t;
        if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
        return M(e);
      }
      function M(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
      }
      function _(e) {
        return (_ = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      var R = (function(e) {
        !(function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError('Super expression must either be null or a function');
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 }
          })),
            Object.defineProperty(e, 'prototype', { writable: !1 }),
            t && E(e, t);
        })(i, e);
        var t,
          n,
          r,
          o = I(i);
        function i(e) {
          var t;
          return (
            (function(e, t) {
              if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
            })(this, i),
            (t = o.call(this)),
            Object.assign(M(t), e),
            (t.options = {
              preserveView: !1,
              nodeParams: {},
              errorSkipNavigation: !1,
              fromContext: null,
              fromClosestContext: !1,
              fromVirtualTreeRoot: !1,
              fromParent: !1,
              relative: !1,
              link: '',
              newTab: !1,
              preserveQueryParams: !1,
              anchor: '',
              preventContextUpdate: !1,
              preventHistoryEntry: !1
            }),
            t
          );
        }
        return (
          (t = i),
          (n = [
            {
              key: 'navigate',
              value: function(e, t, n, r, o, i) {
                if (this.options.errorSkipNavigation) this.options.errorSkipNavigation = !1;
                else {
                  r &&
                    o &&
                    i &&
                    console.warn(
                      'modalSettings, splitViewSettings and drawerSettings cannot be used together. Only modal setting will be taken into account.'
                    ),
                    (this.options.preserveView = n);
                  var a = '/' !== e[0];
                  if ('/' === e && (r || o || i)) console.warn('Navigation with an absolute path prevented.');
                  else {
                    var u = {
                      msg: 'luigi.navigation.open',
                      sessionId: t,
                      params: Object.assign(this.options, {
                        link: e,
                        relative: a,
                        intent: s.hasIntent(e),
                        modal: r,
                        splitView: o,
                        drawer: i
                      })
                    };
                    s.sendPostMessageToLuigiCore(u);
                  }
                }
              }
            },
            {
              key: 'updateModalPathInternalNavigation',
              value: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                  n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                if (e) {
                  var r = {
                    msg: 'luigi.navigation.updateModalDataPath',
                    params: Object.assign(this.options, { link: e, modal: t, history: n })
                  };
                  s.sendPostMessageToLuigiCore(r);
                } else
                  console.warn('Updating path of the modal upon internal navigation prevented. No path specified.');
              }
            },
            {
              key: 'navigateToIntent',
              value: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                  n = '#?intent=';
                if (((n += e), t)) {
                  var r = Object.entries(t);
                  if (r.length > 0) {
                    n += '?';
                    var o,
                      i = x(r);
                    try {
                      for (i.s(); !(o = i.n()).done; ) {
                        var a = S(o.value, 2),
                          u = a[0],
                          s = a[1];
                        n += u + '=' + s + '&';
                      }
                    } catch (e) {
                      i.e(e);
                    } finally {
                      i.f();
                    }
                    n = n.slice(0, -1);
                  }
                }
                this.navigate(n);
              }
            },
            {
              key: 'openAsModal',
              value: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                this.navigate(e, 0, !0, t);
              }
            },
            {
              key: 'updateModalSettings',
              value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  t = { msg: 'luigi.navigation.updateModalSettings', updatedModalSettings: e };
                s.sendPostMessageToLuigiCore(t);
              }
            },
            {
              key: 'openAsSplitView',
              value: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return this.navigate(e, 0, !0, void 0, t), new P(t);
              }
            },
            {
              key: 'openAsDrawer',
              value: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                this.navigate(e, 0, !0, void 0, void 0, t);
              }
            },
            {
              key: 'fromContext',
              value: function(e) {
                return (
                  this.currentContext.context.parentNavigationContexts &&
                  -1 !== this.currentContext.context.parentNavigationContexts.indexOf(e)
                    ? (this.options.fromContext = e)
                    : ((this.options.errorSkipNavigation = !0),
                      console.error('Navigation not possible, navigationContext ' + e + ' not found.')),
                  this
                );
              }
            },
            {
              key: 'fromClosestContext',
              value: function() {
                return (
                  this.currentContext && this.currentContext.context.parentNavigationContexts.length > 0
                    ? ((this.options.fromContext = null), (this.options.fromClosestContext = !0))
                    : console.error('Navigation not possible, no parent navigationContext found.'),
                  this
                );
              }
            },
            {
              key: 'fromVirtualTreeRoot',
              value: function() {
                return (
                  (this.options.fromContext = null),
                  (this.options.fromClosestContext = !1),
                  (this.options.fromVirtualTreeRoot = !0),
                  this
                );
              }
            },
            {
              key: 'fromParent',
              value: function() {
                return (this.options.fromParent = !0), this;
              }
            },
            {
              key: 'withParams',
              value: function(e) {
                return e && Object.assign(this.options.nodeParams, e), this;
              }
            },
            {
              key: 'withOptions',
              value: function(e) {
                return s.isObject(e)
                  ? (void 0 !== e.preventHistoryEntry && (this.options.preventHistoryEntry = e.preventHistoryEntry),
                    void 0 !== e.preventContextUpdate && (this.options.preventContextUpdate = e.preventContextUpdate),
                    this)
                  : this;
              }
            },
            {
              key: 'pathExists',
              value: function(e) {
                var t = s.getRandomId(),
                  n = this.getPromise('pathExistsPromises') || {};
                (n[t] = {
                  resolveFn: function() {},
                  then: function(e) {
                    this.resolveFn = e;
                  }
                }),
                  this.setPromise('pathExistsPromises', n),
                  s.addEventListener(
                    'luigi.navigation.pathExists.answer',
                    function(e, n) {
                      var r = e.data.data,
                        o = this.getPromise('pathExistsPromises') || {};
                      r.correlationId === t &&
                        (o[r.correlationId] &&
                          (o[r.correlationId].resolveFn(r.pathExists),
                          delete o[r.correlationId],
                          this.setPromise('pathExistsPromises', o)),
                        s.removeEventListener(n));
                    }.bind(this)
                  );
                var r = {
                  msg: 'luigi.navigation.pathExists',
                  data: Object.assign(this.options, { id: t, link: e, intent: s.hasIntent(e), relative: '/' !== e[0] })
                };
                return s.sendPostMessageToLuigiCore(r), n[t];
              }
            },
            {
              key: 'hasBack',
              value: function() {
                return !!this.currentContext.internal.modal || 0 !== this.currentContext.internal.viewStackSize;
              }
            },
            {
              key: 'goBack',
              value: function(e) {
                s.sendPostMessageToLuigiCore({ msg: 'luigi.navigation.back', goBackContext: e && JSON.stringify(e) });
              }
            },
            {
              key: 'withoutSync',
              value: function() {
                return (this.options.withoutSync = !0), this;
              }
            },
            {
              key: 'newTab',
              value: function() {
                return (this.options.newTab = !0), this;
              }
            },
            {
              key: 'preserveQueryParams',
              value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return (this.options.preserveQueryParams = e), this;
              }
            },
            {
              key: 'getCurrentRoute',
              value: function() {
                var e = this,
                  t = s.getRandomId(),
                  n = this.getPromise('getCurrentRoute') || {};
                return (
                  (n[t] = {
                    resolveFn: function() {},
                    then: function(e) {
                      this.resolveFn = e;
                    }
                  }),
                  this.setPromise('getCurrentRoute', n),
                  s.addEventListener('luigi.navigation.currentRoute.answer', function(n, r) {
                    var o = n.data.data,
                      i = e.getPromise('getCurrentRoute') || {};
                    o.correlationId === t &&
                      (i[o.correlationId] &&
                        (i[o.correlationId].resolveFn(o.route),
                        delete i[o.correlationId],
                        e.setPromise('getCurrentRoute', i)),
                      s.removeEventListener(r)),
                      s.removeEventListener(r);
                  }),
                  s.sendPostMessageToLuigiCore({
                    msg: 'luigi.navigation.currentRoute',
                    data: Object.assign(this.options, { id: t })
                  }),
                  n[t]
                );
              }
            }
          ]) && L(t.prototype, n),
          r && L(t, r),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          i
        );
      })(i);
      function A(e) {
        return (A =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              })(e);
      }
      function F(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(
              e,
              ((o = r.key),
              (i = void 0),
              (i = (function(e, t) {
                if ('object' !== A(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(e, t || 'default');
                  if ('object' !== A(r)) return r;
                  throw new TypeError('@@toPrimitive must return a primitive value.');
                }
                return ('string' === t ? String : Number)(e);
              })(o, 'string')),
              'symbol' === A(i) ? i : String(i)),
              r
            );
        }
        var o, i;
      }
      function U(e, t) {
        return (U = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function(e, t) {
              return (e.__proto__ = t), e;
            })(e, t);
      }
      function N(e) {
        var t = (function() {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
          } catch (e) {
            return !1;
          }
        })();
        return function() {
          var n,
            r = D(e);
          if (t) {
            var o = D(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return V(this, n);
        };
      }
      function V(e, t) {
        if (t && ('object' === A(t) || 'function' == typeof t)) return t;
        if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
        return (function(e) {
          if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e;
        })(e);
      }
      function D(e) {
        return (D = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      var z = new ((function(e) {
        !(function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError('Super expression must either be null or a function');
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 }
          })),
            Object.defineProperty(e, 'prototype', { writable: !1 }),
            t && U(e, t);
        })(i, e);
        var t,
          n,
          r,
          o = N(i);
        function i() {
          var e;
          return (
            (function(e, t) {
              if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
            })(this, i),
            (e = o.call(this)),
            s.addEventListener('luigi.current-locale-changed', function(e) {
              var t;
              e.data.currentLocale &&
                null !== (t = p.currentContext) &&
                void 0 !== t &&
                t.internal &&
                ((p.currentContext.internal.currentLocale = e.data.currentLocale), p._notifyUpdate());
            }),
            e
          );
        }
        return (
          (t = i),
          (n = [
            {
              key: 'showLoadingIndicator',
              value: function() {
                s.sendPostMessageToLuigiCore({ msg: 'luigi.show-loading-indicator' });
              }
            },
            {
              key: 'hideLoadingIndicator',
              value: function() {
                s.sendPostMessageToLuigiCore({ msg: 'luigi.hide-loading-indicator' });
              }
            },
            {
              key: 'closeCurrentModal',
              value: function() {
                s.sendPostMessageToLuigiCore({ msg: 'luigi.close-modal' });
              }
            },
            {
              key: 'addBackdrop',
              value: function() {
                s.sendPostMessageToLuigiCore({ msg: 'luigi.add-backdrop' });
              }
            },
            {
              key: 'removeBackdrop',
              value: function() {
                s.sendPostMessageToLuigiCore({ msg: 'luigi.remove-backdrop' });
              }
            },
            {
              key: 'setDirtyStatus',
              value: function(e) {
                s.sendPostMessageToLuigiCore({ msg: 'luigi.set-page-dirty', dirty: e });
              }
            },
            {
              key: 'showConfirmationModal',
              value: function(e) {
                var t = this;
                s.addEventListener('luigi.ux.confirmationModal.hide', function(e, n) {
                  t.hideConfirmationModal(e.data.data), s.removeEventListener(n);
                }),
                  s.sendPostMessageToLuigiCore({ msg: 'luigi.ux.confirmationModal.show', data: { settings: e } });
                var n = {};
                return (
                  (n.promise = new Promise(function(e, t) {
                    (n.resolveFn = e), (n.rejectFn = t);
                  })),
                  this.setPromise('confirmationModal', n),
                  n.promise
                );
              }
            },
            {
              key: 'hideConfirmationModal',
              value: function(e) {
                var t = this.getPromise('confirmationModal');
                t && (e.confirmed ? t.resolveFn() : t.rejectFn(), this.setPromise('confirmationModal', void 0));
              }
            },
            {
              key: 'showAlert',
              value: function(e) {
                var t = this;
                (e.id = s.getRandomId()),
                  s.addEventListener('luigi.ux.alert.hide', function(n, r) {
                    n.data.id === e.id && (t.hideAlert(n.data), s.removeEventListener(r));
                  }),
                  (null == e ? void 0 : e.closeAfter) < 100 &&
                    (console.warn(
                      "Message with id='".concat(
                        e.id,
                        "' has too small 'closeAfter' value. It needs to be at least 100ms."
                      )
                    ),
                    (e.closeAfter = void 0)),
                  s.sendPostMessageToLuigiCore({ msg: 'luigi.ux.alert.show', data: { settings: e } });
                var n = this.getPromise('alerts') || {};
                return (
                  (n[e.id] = {}),
                  (n[e.id].promise = new Promise(function(t) {
                    n[e.id].resolveFn = t;
                  })),
                  this.setPromise('alerts', n),
                  n[e.id].promise
                );
              }
            },
            {
              key: 'hideAlert',
              value: function(e) {
                var t = e.id,
                  n = e.dismissKey,
                  r = this.getPromise('alerts');
                t && r[t] && (r[t].resolveFn(n || t), delete r[t], this.setPromise('alerts', r));
              }
            },
            {
              key: 'getCurrentLocale',
              value: function() {
                var e, t;
                return null === (e = p.currentContext) || void 0 === e || null === (t = e.internal) || void 0 === t
                  ? void 0
                  : t.currentLocale;
              }
            },
            {
              key: 'setCurrentLocale',
              value: function(e) {
                e && s.sendPostMessageToLuigiCore({ msg: 'luigi.ux.set-current-locale', data: { currentLocale: e } });
              }
            },
            {
              key: 'isSplitView',
              value: function() {
                var e, t;
                return null === (e = p.currentContext) || void 0 === e || null === (t = e.internal) || void 0 === t
                  ? void 0
                  : t.splitView;
              }
            },
            {
              key: 'isModal',
              value: function() {
                var e, t;
                return null === (e = p.currentContext) || void 0 === e || null === (t = e.internal) || void 0 === t
                  ? void 0
                  : t.modal;
              }
            },
            {
              key: 'isDrawer',
              value: function() {
                var e, t;
                return null === (e = p.currentContext) || void 0 === e || null === (t = e.internal) || void 0 === t
                  ? void 0
                  : t.drawer;
              }
            },
            {
              key: 'getCurrentTheme',
              value: function() {
                var e, t;
                return null === (e = p.currentContext) || void 0 === e || null === (t = e.internal) || void 0 === t
                  ? void 0
                  : t.currentTheme;
              }
            }
          ]) && F(t.prototype, n),
          r && F(t, r),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          i
        );
      })(i))();
      function B(e) {
        return (B =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              })(e);
      }
      function H(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      }
      function K(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(
              e,
              ((o = r.key),
              (i = void 0),
              (i = (function(e, t) {
                if ('object' !== B(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(e, t || 'default');
                  if ('object' !== B(r)) return r;
                  throw new TypeError('@@toPrimitive must return a primitive value.');
                }
                return ('string' === t ? String : Number)(e);
              })(o, 'string')),
              'symbol' === B(i) ? i : String(i)),
              r
            );
        }
        var o, i;
      }
      function J(e, t, n) {
        return t && K(e.prototype, t), n && K(e, n), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
      }
      function Q(e, t) {
        return (Q = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function(e, t) {
              return (e.__proto__ = t), e;
            })(e, t);
      }
      function q(e) {
        var t = (function() {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
          } catch (e) {
            return !1;
          }
        })();
        return function() {
          var n,
            r = $(e);
          if (t) {
            var o = $(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return Y(this, n);
        };
      }
      function Y(e, t) {
        if (t && ('object' === B(t) || 'function' == typeof t)) return t;
        if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
        return (function(e) {
          if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e;
        })(e);
      }
      function $(e) {
        return ($ = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      var G = new Map(),
        W = (function(e) {
          !(function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError('Super expression must either be null or a function');
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 }
            })),
              Object.defineProperty(e, 'prototype', { writable: !1 }),
              t && Q(e, t);
          })(n, e);
          var t = q(n);
          function n() {
            var e;
            return (
              H(this, n),
              ((e = t.call(this)).storageEventProcessor = new X()),
              s.addEventListener('storage', function(t, n) {
                return e.storageEventProcessor.processEvent(t, n);
              }),
              e
            );
          }
          return (
            J(n, [
              {
                key: 'setItem',
                value: function(e, t) {
                  var n = this;
                  return new Promise(function(r, o) {
                    n.storageEventProcessor.execute(r, o, 'setItem', { key: e, value: t });
                  });
                }
              },
              {
                key: 'getItem',
                value: function(e) {
                  var t = this;
                  return new Promise(function(n, r) {
                    t.storageEventProcessor.execute(n, r, 'getItem', { key: e });
                  });
                }
              },
              {
                key: 'removeItem',
                value: function(e) {
                  var t = this;
                  return new Promise(function(n, r) {
                    t.storageEventProcessor.execute(n, r, 'removeItem', { key: e });
                  });
                }
              },
              {
                key: 'clear',
                value: function() {
                  var e = this;
                  return new Promise(function(t, n) {
                    e.storageEventProcessor.execute(t, n, 'clear', {});
                  });
                }
              },
              {
                key: 'has',
                value: function(e) {
                  var t = this;
                  return new Promise(function(n, r) {
                    t.storageEventProcessor.execute(n, r, 'has', { key: e });
                  });
                }
              },
              {
                key: 'getAllKeys',
                value: function() {
                  var e = this;
                  return new Promise(function(t, n) {
                    e.storageEventProcessor.execute(t, n, 'getAllKeys', {});
                  });
                }
              }
            ]),
            n
          );
        })(i),
        X = (function() {
          function e() {
            H(this, e);
          }
          return (
            J(e, [
              {
                key: 'processEvent',
                value: function(e, t) {
                  try {
                    var n = e.data.data;
                    if (!G.has(n.id)) return void console.log('Impossible to find Promise method for message ' + n.id);
                    var r = G.get(n.id);
                    'ERROR' === n.status ? r.reject(n.result) : r.resolve(n.result), G.delete(n.id);
                  } catch (e) {
                    console.error(e);
                  }
                }
              },
              {
                key: 'waitForSyncResult',
                value: function(e) {
                  for (var t = new Date().getTime(); !syncOperation.has(e); ) {
                    if (new Date().getTime() - t > 1e4)
                      throw 'Storage operation is taking more than 1 second...Some problem with Luigi Core communication';
                  }
                  var n = syncOperation.get(e);
                  return G.delete(e), n;
                }
              },
              {
                key: 'execute',
                value: function(e, t, n, r) {
                  var o = s.getRandomId();
                  this.createPendingOperation(o, e, t), this.sendMessage(o, n, r);
                }
              },
              {
                key: 'createPendingOperation',
                value: function(e, t, n) {
                  G.set(e, { resolve: t, reject: n });
                }
              },
              {
                key: 'sendMessage',
                value: function(e, t, n) {
                  s.sendPostMessageToLuigiCore({ msg: 'storage', data: { id: e, operation: t, params: n } });
                }
              }
            ]),
            e
          );
        })(),
        Z = new W();
      function ee(e) {
        return (ee =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              })(e);
      }
      function te(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(
              e,
              ((o = r.key),
              (i = void 0),
              (i = (function(e, t) {
                if ('object' !== ee(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(e, t || 'default');
                  if ('object' !== ee(r)) return r;
                  throw new TypeError('@@toPrimitive must return a primitive value.');
                }
                return ('string' === t ? String : Number)(e);
              })(o, 'string')),
              'symbol' === ee(i) ? i : String(i)),
              r
            );
        }
        var o, i;
      }
      var ne = (function() {
        function e() {
          !(function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, e),
            window !== window.top &&
              ('true' !== window.document.head.getAttribute('disable-luigi-history-handling') &&
                (history.pushState = history.replaceState.bind(history)),
              'true' !== window.document.head.getAttribute('disable-luigi-runtime-error-handling') &&
                window.addEventListener('error', function(e) {
                  var t = {
                    msg: 'luigi-runtime-error-handling',
                    errorObj: {
                      filename: e.filename,
                      message: e.message,
                      lineno: e.lineno,
                      colno: e.colno,
                      error: e.error
                    }
                  };
                  s.sendPostMessageToLuigiCore(t);
                }));
        }
        var t, n, r;
        return (
          (t = e),
          (n = [
            {
              key: 'addInitListener',
              value: function(e) {
                return p.addInitListener(e);
              }
            },
            {
              key: 'removeInitListener',
              value: function(e) {
                return p.removeInitListener(e);
              }
            },
            {
              key: 'addContextUpdateListener',
              value: function(e) {
                return p.addContextUpdateListener(e);
              }
            },
            {
              key: 'removeContextUpdateListener',
              value: function(e) {
                return p.removeContextUpdateListener(e);
              }
            },
            {
              key: 'getToken',
              value: function() {
                return p.getToken();
              }
            },
            {
              key: 'getEventData',
              value: function() {
                return p.getEventData();
              }
            },
            {
              key: 'getContext',
              value: function() {
                return p.getContext();
              }
            },
            {
              key: 'addNodeParams',
              value: function(e, t) {
                return p.addNodeParams(e, t);
              }
            },
            {
              key: 'getNodeParams',
              value: function(e) {
                return p.getNodeParams(e);
              }
            },
            {
              key: 'getActiveFeatureToggles',
              value: function() {
                return p.getActiveFeatureToggles();
              }
            },
            {
              key: 'getPathParams',
              value: function() {
                return p.getPathParams();
              }
            },
            {
              key: 'getCoreSearchParams',
              value: function() {
                return p.getCoreSearchParams();
              }
            },
            {
              key: 'addCoreSearchParams',
              value: function(e, t) {
                return p.addCoreSearchParams(e, t);
              }
            },
            {
              key: 'getClientPermissions',
              value: function() {
                return p.getClientPermissions();
              }
            },
            {
              key: 'sendCustomMessage',
              value: function(e) {
                return p.sendCustomMessage(e);
              }
            },
            {
              key: 'addCustomMessageListener',
              value: function(e, t) {
                return p.addCustomMessageListener(e, t);
              }
            },
            {
              key: 'removeCustomMessageListener',
              value: function(e) {
                return p.removeCustomMessageListener(e);
              }
            },
            {
              key: 'addInactiveListener',
              value: function(e, t) {
                return p.addInactiveListener(e, t);
              }
            },
            {
              key: 'removeInactiveListener',
              value: function(e) {
                return p.removeInactiveListener(e);
              }
            },
            {
              key: 'setTargetOrigin',
              value: function(e) {
                return p.setTargetOrigin(e);
              }
            },
            {
              key: 'getUserSettings',
              value: function() {
                return p.getUserSettings();
              }
            },
            {
              key: 'isLuigiClientInitialized',
              value: function() {
                return p.isLuigiClientInitialized();
              }
            },
            {
              key: 'luigiClientInit',
              value: function() {
                return p.luigiClientInit();
              }
            },
            {
              key: 'getAnchor',
              value: function() {
                return p.getAnchor();
              }
            },
            {
              key: 'setAnchor',
              value: function(e) {
                return p.setAnchor(e);
              }
            },
            {
              key: 'linkManager',
              value: function() {
                return new R({ currentContext: p.currentContext });
              }
            },
            {
              key: 'uxManager',
              value: function() {
                return z;
              }
            },
            {
              key: 'lifecycleManager',
              value: function() {
                return p;
              }
            },
            {
              key: 'storageManager',
              value: function() {
                return Z;
              }
            }
          ]) && te(t.prototype, n),
          r && te(t, r),
          Object.defineProperty(t, 'prototype', { writable: !1 }),
          e
        );
      })();
      t.default = ne = new ne();
    }
  ]).default;
});
//# sourceMappingURL=luigi-client.js.map
