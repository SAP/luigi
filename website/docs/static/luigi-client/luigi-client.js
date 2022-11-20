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
    function n(i) {
      if (t[i]) return t[i].exports;
      var o = (t[i] = { i: i, l: !1, exports: {} });
      return e[i].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function(e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
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
        var i = Object.create(null);
        if ((n.r(i), Object.defineProperty(i, 'default', { enumerable: !0, value: e }), 2 & t && 'string' != typeof e))
          for (var o in e)
            n.d(
              i,
              o,
              function(t) {
                return e[t];
              }.bind(null, o)
            );
        return i;
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
        '{"name":"@luigi-project/client","version":"1.4.0","description":"Javascript library supporting consumers of the Luigi framework","license":"Apache-2.0","main":"luigi-client.js","repository":{"type":"git","url":"ssh://github.com/SAP/luigi.git"},"publishConfig":{"tag":"luigi-client"},"keywords":["luigi","UI","extensibility","micro-frontends","microfrontends"]}'
      );
    },
    function(e, t, n) {
      'use strict';
      function i(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            'value' in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i);
        }
      }
      n.r(t);
      var o = (function() {
        function e() {
          !(function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, e),
            (this.promises = {});
        }
        var t, n, o;
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
          ]) && i(t.prototype, n),
          o && i(t, o),
          e
        );
      })();
      function r(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            'value' in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i);
        }
      }
      var a = new ((function() {
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
        var t, n, i;
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
              key: 'getLuigiCoreDomain',
              value: function() {
                return this.origin;
              }
            },
            {
              key: 'setLuigiCoreDomain',
              value: function(e) {
                e && (this.origin = e);
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
                this.origin
                  ? window.parent.postMessage(e, this.origin)
                  : console.warn(
                      'There is no target origin set. You can specify the target origin by calling LuigiClient.setTargetOrigin("targetorigin") in your micro frontend.'
                    );
              }
            }
          ]) && r(t.prototype, n),
          i && r(t, i),
          e
        );
      })())();
      function s(e) {
        return (s =
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
          var i = t[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            'value' in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i);
        }
      }
      function l(e, t) {
        return !t || ('object' !== s(t) && 'function' != typeof t)
          ? (function(e) {
              if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return e;
            })(e)
          : t;
      }
      function c(e) {
        return (c = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function f(e, t) {
        return (f =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      var d = new ((function(e) {
        function t() {
          var e;
          !(function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, t),
            ((e = l(this, c(t).call(this))).luigiInitialized = !1),
            (e.defaultContextKeys = ['context', 'internal', 'nodeParams', 'pathParams']),
            e.setCurrentContext(
              e.defaultContextKeys.reduce(function(e, t) {
                return (e[t] = {}), e;
              }, {})
            ),
            (e._onContextUpdatedFns = {}),
            (e._onInactiveFns = {}),
            (e._onInitFns = {}),
            (e.authData = {});
          var i, o;
          return (
            (i = function(t) {
              for (var n = 0; n < e.defaultContextKeys.length; n++) {
                var i = e.defaultContextKeys[n];
                try {
                  'string' == typeof t[i] && (t[i] = JSON.parse(t[i]));
                } catch (e) {
                  console.info('unable to parse luigi context data for', i, t[i], e);
                }
              }
              e.setCurrentContext(t);
            }),
            (o = function(t) {
              t && (e.authData = t);
            }),
            a.addEventListener('luigi.init', function(t) {
              i(t.data),
                o(t.data.authData),
                a.setLuigiCoreDomain(t.origin),
                (e.luigiInitialized = !0),
                e._notifyInit(t.origin),
                a.sendPostMessageToLuigiCore({ msg: 'luigi.init.ok' });
            }),
            a.addEventListener('luigi-client.inactive-microfrontend', function(t) {
              e._notifyInactive(t.origin);
            }),
            a.addEventListener('luigi.auth.tokenIssued', function(e) {
              o(e.data.authData);
            }),
            a.addEventListener('luigi.navigate', function(t) {
              i(t.data),
                e.currentContext.internal.isNavigateBack ||
                  (history.replaceState(null, '', t.data.viewUrl),
                  window.dispatchEvent(new PopStateEvent('popstate', { state: 'luiginavigation' }))),
                e._notifyUpdate(),
                a.sendPostMessageToLuigiCore({ msg: 'luigi.navigate.ok' });
            }),
            window.parent.postMessage({ msg: 'luigi.get-context', clientVersion: n(0).version }, '*'),
            e._tpcCheck(),
            e
          );
        }
        var i, o, r;
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError('Super expression must either be null or a function');
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 }
            })),
              t && f(e, t);
          })(t, e),
          (i = t),
          (o = [
            {
              key: '_tpcCheck',
              value: function() {
                var e,
                  t,
                  n = 'enabled',
                  i = document.cookie;
                i &&
                  (e = i
                    .split(';')
                    .map(function(e) {
                      return e.trim();
                    })
                    .find(function(e) {
                      return 'luigiCookie=true' == e;
                    })),
                  'luigiCookie=true' === e && ((t = e.split('=')[0]), (document.cookie = t + '=; Max-Age=-99999999;')),
                  (document.cookie = 'luigiCookie=true'),
                  (i = document.cookie) &&
                    (e = i
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
                for (var i in e) e.hasOwnProperty(i) && a.isFunction(e[i]) && e[i](t, n);
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
                var t = a.getRandomId();
                return (
                  (this._onInitFns[t] = e),
                  this.luigiInitialized && a.isFunction(e) && e(this.currentContext.context, a.getLuigiCoreDomain()),
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
                var t = a.getRandomId();
                return (
                  (this._onContextUpdatedFns[t] = e),
                  this.luigiInitialized && a.isFunction(e) && e(this.currentContext.context),
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
                var t = a.getRandomId();
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
                return a.addEventListener(e, function(e, n) {
                  return t(e, n);
                });
              }
            },
            {
              key: 'removeCustomMessageListener',
              value: function(e) {
                return a.removeEventListener(e);
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
              key: 'getNodeParams',
              value: function() {
                return this.currentContext.nodeParams;
              }
            },
            {
              key: 'getPathParams',
              value: function() {
                return this.currentContext.pathParams;
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
                a.setTargetOrigin(e);
              }
            },
            {
              key: 'sendCustomMessage',
              value: function(e) {
                var t = a.convertCustomMessageUserToInternal(e);
                a.sendPostMessageToLuigiCore(t);
              }
            }
          ]) && u(i.prototype, o),
          r && u(i, r),
          t
        );
      })(o))();
      function v(e) {
        return (v =
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
      function p(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            'value' in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i);
        }
      }
      function g(e, t) {
        return !t || ('object' !== v(t) && 'function' != typeof t)
          ? (function(e) {
              if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return e;
            })(e)
          : t;
      }
      function y(e) {
        return (y = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function m(e, t) {
        return (m =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      var h = (function(e) {
        function t(e) {
          var n;
          !(function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, t),
            ((n = g(this, y(t).call(this))).validSplitViewEvents = ['expand', 'collapse', 'resize', 'close']),
            (n.splitView = { exists: !0, size: 40, collapsed: !1 }),
            Object.assign(n.splitView, e);
          return (
            (n.splitView.listeners = [
              a.addEventListener('luigi.navigation.splitview.internal', function(e) {
                Object.assign(n.splitView, e.data.data);
              })
            ]),
            n.on('resize', function(e) {
              n.splitView.size = e;
            }),
            n.on('close', function() {
              n.splitView.listeners.forEach(function(e) {
                return a.removeEventListener(e);
              });
            }),
            n
          );
        }
        var n, i, o;
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError('Super expression must either be null or a function');
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 }
            })),
              t && m(e, t);
          })(t, e),
          (n = t),
          (i = [
            {
              key: 'sendSplitViewEvent',
              value: function(e, t) {
                a.sendPostMessageToLuigiCore({ msg: 'luigi.navigation.splitview.'.concat(e), data: t });
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
                var n = a.addEventListener('luigi.navigation.splitview.'.concat(e, '.ok'), function(e) {
                  return t(e.data.data);
                });
                return this.splitView.listeners.push(n), n;
              }
            },
            {
              key: 'removeEventListener',
              value: function(e) {
                return a.removeEventListener(e);
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
          ]) && p(n.prototype, i),
          o && p(n, o),
          t
        );
      })(o);
      function b(e) {
        return (b =
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
      function k(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            'value' in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i);
        }
      }
      function C(e) {
        return (C = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function w(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
      }
      function x(e, t) {
        return (x =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      var P = (function(e) {
        function t(e) {
          var n, i, o;
          return (
            (function(e, t) {
              if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
            })(this, t),
            (i = this),
            (n = !(o = C(t).call(this)) || ('object' !== b(o) && 'function' != typeof o) ? w(i) : o),
            Object.assign(w(n), e),
            (n.options = {
              preserveView: !1,
              nodeParams: {},
              errorSkipNavigation: !1,
              fromContext: null,
              fromClosestContext: !1,
              fromVirtualTreeRoot: !1,
              fromParent: !1,
              relative: !1,
              link: ''
            }),
            n
          );
        }
        var n, i, o;
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError('Super expression must either be null or a function');
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 }
            })),
              t && x(e, t);
          })(t, e),
          (n = t),
          (i = [
            {
              key: 'navigate',
              value: function(e, t, n, i, o) {
                if (this.options.errorSkipNavigation) this.options.errorSkipNavigation = !1;
                else {
                  i &&
                    o &&
                    console.warn(
                      'modalSettings and splitViewSettings cannot be used together. Only modal setting will be taken into account.'
                    ),
                    (this.options.preserveView = n);
                  var r = '/' !== e[0],
                    s = {
                      msg: 'luigi.navigation.open',
                      sessionId: t,
                      params: Object.assign(this.options, { link: e, relative: r, modal: i, splitView: o })
                    };
                  a.sendPostMessageToLuigiCore(s);
                }
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
              key: 'openAsSplitView',
              value: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return this.navigate(e, 0, !0, void 0, t), new h(t);
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
              key: 'pathExists',
              value: function(e) {
                var t = Date.now(),
                  n = this.getPromise('pathExistsPromises') || {};
                (n[t] = {
                  resolveFn: function() {},
                  then: function(e) {
                    this.resolveFn = e;
                  }
                }),
                  this.setPromise('pathExistsPromises', n),
                  a.addEventListener(
                    'luigi.navigation.pathExists.answer',
                    function(e, t) {
                      var n = e.data.data,
                        i = this.getPromise('pathExistsPromises') || {};
                      i[n.correlationId] &&
                        (i[n.correlationId].resolveFn(n.pathExists),
                        delete i[n.correlationId],
                        this.setPromise('pathExistsPromises', i)),
                        a.removeEventListener(t);
                    }.bind(this)
                  );
                var i = { msg: 'luigi.navigation.pathExists', data: { id: t, link: e, relative: '/' !== e[0] } };
                return a.sendPostMessageToLuigiCore(i), n[t];
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
                a.sendPostMessageToLuigiCore({ msg: 'luigi.navigation.back', goBackContext: e && JSON.stringify(e) });
              }
            },
            {
              key: 'withoutSync',
              value: function() {
                return (this.options.withoutSync = !0), this;
              }
            }
          ]) && k(n.prototype, i),
          o && k(n, o),
          t
        );
      })(o);
      function L(e) {
        return (L =
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
      function O(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            'value' in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i);
        }
      }
      function _(e, t) {
        return !t || ('object' !== L(t) && 'function' != typeof t)
          ? (function(e) {
              if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return e;
            })(e)
          : t;
      }
      function E(e) {
        return (E = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function S(e, t) {
        return (S =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      var M = new ((function(e) {
        function t() {
          var e;
          return (
            (function(e, t) {
              if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
            })(this, t),
            (e = _(this, E(t).call(this))),
            a.addEventListener('luigi.current-locale-changed', function(e) {
              var t;
              e.data.currentLocale &&
                (null === (t = d.currentContext) || void 0 === t ? void 0 : t.internal) &&
                ((d.currentContext.internal.currentLocale = e.data.currentLocale), d._notifyUpdate());
            }),
            e
          );
        }
        var n, i, o;
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError('Super expression must either be null or a function');
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 }
            })),
              t && S(e, t);
          })(t, e),
          (n = t),
          (i = [
            {
              key: 'showLoadingIndicator',
              value: function() {
                a.sendPostMessageToLuigiCore({ msg: 'luigi.show-loading-indicator' });
              }
            },
            {
              key: 'hideLoadingIndicator',
              value: function() {
                a.sendPostMessageToLuigiCore({ msg: 'luigi.hide-loading-indicator' });
              }
            },
            {
              key: 'closeCurrentModal',
              value: function() {
                a.sendPostMessageToLuigiCore({ msg: 'luigi.close-modal' });
              }
            },
            {
              key: 'addBackdrop',
              value: function() {
                a.sendPostMessageToLuigiCore({ msg: 'luigi.add-backdrop' });
              }
            },
            {
              key: 'removeBackdrop',
              value: function() {
                a.sendPostMessageToLuigiCore({ msg: 'luigi.remove-backdrop' });
              }
            },
            {
              key: 'setDirtyStatus',
              value: function(e) {
                a.sendPostMessageToLuigiCore({ msg: 'luigi.set-page-dirty', dirty: e });
              }
            },
            {
              key: 'showConfirmationModal',
              value: function(e) {
                var t = this;
                a.addEventListener('luigi.ux.confirmationModal.hide', function(e, n) {
                  t.hideConfirmationModal(e.data.data), a.removeEventListener(n);
                }),
                  a.sendPostMessageToLuigiCore({ msg: 'luigi.ux.confirmationModal.show', data: { settings: e } });
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
                a.addEventListener('luigi.ux.alert.hide', function(e, n) {
                  t.hideAlert(e.data.id), a.removeEventListener(n);
                }),
                  (e.id = a.getRandomId()),
                  (null == e ? void 0 : e.closeAfter) < 100 &&
                    (console.warn(
                      "Message with id='".concat(
                        e.id,
                        "' has too small 'closeAfter' value. It needs to be at least 100ms."
                      )
                    ),
                    (e.closeAfter = void 0)),
                  a.sendPostMessageToLuigiCore({ msg: 'luigi.ux.alert.show', data: { settings: e } });
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
                var t = this.getPromise('alerts');
                e && t[e] && (t[e].resolveFn(e), delete t[e], this.setPromise('alerts', t));
              }
            },
            {
              key: 'getCurrentLocale',
              value: function() {
                var e, t;
                return null === (e = d.currentContext) || void 0 === e || null === (t = e.internal) || void 0 === t
                  ? void 0
                  : t.currentLocale;
              }
            },
            {
              key: 'setCurrentLocale',
              value: function(e) {
                e && a.sendPostMessageToLuigiCore({ msg: 'luigi.ux.set-current-locale', data: { currentLocale: e } });
              }
            },
            {
              key: 'isSplitView',
              value: function() {
                var e, t;
                return null === (e = d.currentContext) || void 0 === e || null === (t = e.internal) || void 0 === t
                  ? void 0
                  : t.splitView;
              }
            },
            {
              key: 'isModal',
              value: function() {
                var e, t;
                return null === (e = d.currentContext) || void 0 === e || null === (t = e.internal) || void 0 === t
                  ? void 0
                  : t.modal;
              }
            },
            {
              key: 'getCurrentTheme',
              value: function() {
                var e, t;
                return null === (e = d.currentContext) || void 0 === e || null === (t = e.internal) || void 0 === t
                  ? void 0
                  : t.currentTheme;
              }
            }
          ]) && O(n.prototype, i),
          o && O(n, o),
          t
        );
      })(o))();
      function T(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            'value' in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i);
        }
      }
      var I = (function() {
        function e() {
          !(function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, e);
        }
        var t, n, i;
        return (
          (t = e),
          (n = [
            {
              key: 'addInitListener',
              value: function(e) {
                return d.addInitListener(e);
              }
            },
            {
              key: 'removeInitListener',
              value: function(e) {
                return d.removeInitListener(e);
              }
            },
            {
              key: 'addContextUpdateListener',
              value: function(e) {
                return d.addContextUpdateListener(e);
              }
            },
            {
              key: 'removeContextUpdateListener',
              value: function(e) {
                return d.removeContextUpdateListener(e);
              }
            },
            {
              key: 'getToken',
              value: function() {
                return d.getToken();
              }
            },
            {
              key: 'getEventData',
              value: function() {
                return d.getEventData();
              }
            },
            {
              key: 'getContext',
              value: function() {
                return d.getContext();
              }
            },
            {
              key: 'getNodeParams',
              value: function() {
                return d.getNodeParams();
              }
            },
            {
              key: 'getActiveFeatureToggles',
              value: function() {
                return d.getActiveFeatureToggles();
              }
            },
            {
              key: 'getPathParams',
              value: function() {
                return d.getPathParams();
              }
            },
            {
              key: 'getClientPermissions',
              value: function() {
                return d.getClientPermissions();
              }
            },
            {
              key: 'sendCustomMessage',
              value: function(e) {
                return d.sendCustomMessage(e);
              }
            },
            {
              key: 'addCustomMessageListener',
              value: function(e, t) {
                return d.addCustomMessageListener(e, t);
              }
            },
            {
              key: 'removeCustomMessageListener',
              value: function(e) {
                return d.removeCustomMessageListener(e);
              }
            },
            {
              key: 'addInactiveListener',
              value: function(e, t) {
                return d.addInactiveListener(e, t);
              }
            },
            {
              key: 'removeInactiveListener',
              value: function(e) {
                return d.removeInactiveListener(e);
              }
            },
            {
              key: 'setTargetOrigin',
              value: function(e) {
                return d.setTargetOrigin(e);
              }
            },
            {
              key: 'linkManager',
              value: function() {
                return new P({ currentContext: d.currentContext });
              }
            },
            {
              key: 'uxManager',
              value: function() {
                return M;
              }
            },
            {
              key: 'lifecycleManager',
              value: function() {
                return d;
              }
            }
          ]) && T(t.prototype, n),
          i && T(t, i),
          e
        );
      })();
      t.default = I = new I();
    }
  ]).default;
});
