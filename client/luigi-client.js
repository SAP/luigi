!(function(t, n) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
      ? define([], n)
      : 'object' == typeof exports
        ? (exports.LuigiClient = n())
        : (t.LuigiClient = n());
})(window, function() {
  return (function(t) {
    var n = {};
    function e(o) {
      if (n[o]) return n[o].exports;
      var i = (n[o] = { i: o, l: !1, exports: {} });
      return t[o].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
    }
    return (
      (e.m = t),
      (e.c = n),
      (e.d = function(t, n, o) {
        e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: o });
      }),
      (e.r = function(t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 });
      }),
      (e.t = function(t, n) {
        if ((1 & n && (t = e(t)), 8 & n)) return t;
        if (4 & n && 'object' == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (
          (e.r(o),
          Object.defineProperty(o, 'default', { enumerable: !0, value: t }),
          2 & n && 'string' != typeof t)
        )
          for (var i in t)
            e.d(
              o,
              i,
              function(n) {
                return t[n];
              }.bind(null, i)
            );
        return o;
      }),
      (e.n = function(t) {
        var n =
          t && t.__esModule
            ? function() {
                return t.default;
              }
            : function() {
                return t;
              };
        return e.d(n, 'a', n), n;
      }),
      (e.o = function(t, n) {
        return Object.prototype.hasOwnProperty.call(t, n);
      }),
      (e.p = ''),
      e((e.s = 0))
    );
  })([
    function(t, n, e) {
      'use strict';
      e.r(n);
      var o = !1,
        i = ['context', 'internal', 'nodeParams', 'pathParams'],
        a = i.reduce(function(t, n) {
          return (t[n] = {}), t;
        }, {}),
        r = {},
        s = {},
        u = {},
        c = {};
      function d() {
        return Math.floor(1e9 * Math.random()) + '';
      }
      function f(t) {
        return 'function' == typeof t;
      }
      function g(t, n) {
        for (var e in t) t.hasOwnProperty(e) && f(t[e]) && t[e](n);
      }
      !(function() {
        function t(t) {
          for (var n = 0; n < i.length; n++) {
            var e = i[n];
            try {
              'string' == typeof t[e] && (t[e] = JSON.parse(t[e]));
            } catch (n) {
              console.info(
                'unable to parse luigi context data for',
                e,
                t[e],
                n
              );
            }
          }
          a = t;
        }
        function n(t) {
          t && (u = t);
        }
        window.addEventListener('message', function(e) {
          if (
            ('luigi.init' === e.data.msg
              ? (t(e.data), n(e.data.authData), (o = !0), g(s, a.context))
              : 'luigi.navigate' === e.data.msg
                ? (t(e.data),
                  a.internal.isNavigateBack ||
                    window.location.replace(e.data.viewUrl),
                  g(r, a.context),
                  window.parent.postMessage({ msg: 'luigi.navigate.ok' }, '*'))
                : 'luigi.auth.tokenIssued' === e.data.msg && n(e.data.authData),
            'luigi.navigation.pathExists.answer' === e.data.msg)
          ) {
            var i = e.data.data;
            c[i.correlationId].resolveFn(i.pathExists),
              delete c[i.correlationId];
          }
        }),
          window.parent.postMessage({ msg: 'luigi.get-context' }, '*');
      })();
      var l = {
        addInitListener: function(t) {
          var n = d();
          return (s[n] = t), o && f(t) && t(a.context), n;
        },
        removeInitListener: function(t) {
          return !!s[t] && ((s[t] = void 0), !0);
        },
        addContextUpdateListener: function(t) {
          var n = d();
          return (r[n] = t), o && f(t) && t(a.context), n;
        },
        removeContextUpdateListener: function(t) {
          return !!r[t] && ((r[t] = void 0), !0);
        },
        getToken: function() {
          return u.accessToken;
        },
        getEventData: function() {
          return a.context;
        },
        getNodeParams: function() {
          return a.nodeParams;
        },
        getPathParams: function() {
          return a.pathParams;
        },
        linkManager: function() {
          var t = {
            preserveView: !1,
            nodeParams: {},
            errorSkipNavigation: !1,
            fromContext: null,
            fromClosestContext: !1,
            relative: !1,
            link: ''
          };
          return {
            navigate: function(n, e, o) {
              if (t.errorSkipNavigation) t.errorSkipNavigation = !1;
              else {
                t.preserveView = o;
                var i = '/' !== n[0],
                  a = {
                    msg: 'luigi.navigation.open',
                    sessionId: e,
                    params: Object.assign(t, { link: n, relative: i })
                  };
                window.parent.postMessage(a, '*');
              }
            },
            fromContext: function(n) {
              return (
                -1 !== a.context.parentNavigationContexts.indexOf(n)
                  ? (t.fromContext = n)
                  : ((t.errorSkipNavigation = !0),
                    console.error(
                      'Navigation not possible, navigationContext ' +
                        n +
                        ' not found.'
                    )),
                this
              );
            },
            fromClosestContext: function() {
              return (
                a.context.parentNavigationContexts.length > 0
                  ? ((t.fromContext = null), (t.fromClosestContext = !0))
                  : console.error(
                      'Navigation not possible, no parent navigationContext found.'
                    ),
                this
              );
            },
            withParams: function(n) {
              return n && Object.assign(t.nodeParams, n), this;
            },
            pathExists: function(t) {
              var n = Date.now();
              c[n] = {
                resolveFn: function() {},
                then: function(t) {
                  this.resolveFn = t;
                }
              };
              var e = {
                msg: 'luigi.navigation.pathExists',
                data: { id: n, link: t, relative: '/' !== t[0] }
              };
              return window.parent.postMessage(e, '*'), c[n];
            },
            hasBack: function() {
              return Boolean(0 !== a.internal.viewStackSize);
            },
            goBack: function(t) {
              this.hasBack() &&
                window.parent.postMessage(
                  {
                    msg: 'luigi.navigation.back',
                    goBackContext: t && JSON.stringify(t)
                  },
                  '*'
                );
            }
          };
        },
        uxManager: function() {
          return {
            showLoadingIndicator: function() {
              window.parent.postMessage(
                { msg: 'luigi.show-loading-indicator' },
                '*'
              );
            },
            hideLoadingIndicator: function() {
              window.parent.postMessage(
                { msg: 'luigi.hide-loading-indicator' },
                '*'
              );
            },
            addBackdrop: function() {
              window.parent.postMessage({ msg: 'luigi.add-backdrop' }, '*');
            },
            removeBackdrop: function() {
              window.parent.postMessage({ msg: 'luigi.remove-backdrop' }, '*');
            },
            setDirtyStatus: function(t) {
              window.parent.postMessage(
                { msg: 'luigi.set-page-dirty', dirty: t },
                '*'
              );
            }
          };
        }
      };
      n.default = l;
    }
  ]).default;
});
