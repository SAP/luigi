/*!
 *
 *       Don't be afraid!
 *       This file was generated automatically and you should not modify it.
 *       The documentation (located in /docs) will tell you how to modify Luigi configuration with pleasure.
 *
 */ !(function(t) {
  var e = {};
  function r(n) {
    if (e[n]) return e[n].exports;
    var a = (e[n] = { i: n, l: !1, exports: {} });
    return t[n].call(a.exports, a, a.exports, r), (a.l = !0), a.exports;
  }
  (r.m = t),
    (r.c = e),
    (r.d = function(t, e, n) {
      r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (r.r = function(t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (r.t = function(t, e) {
      if ((1 & e && (t = r(t)), 8 & e)) return t;
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if ((r.r(n), Object.defineProperty(n, 'default', { enumerable: !0, value: t }), 2 & e && 'string' != typeof t))
        for (var a in t)
          r.d(
            n,
            a,
            function(e) {
              return t[e];
            }.bind(null, a)
          );
      return n;
    }),
    (r.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return r.d(e, 'a', e), e;
    }),
    (r.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (r.p = ''),
    r((r.s = 8));
})([
  function(t, e) {
    (t.exports = function(t, e, r) {
      return (
        e in t ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = r),
        t
      );
    }),
      (t.exports.default = t.exports),
      (t.exports.__esModule = !0);
  },
  function(t, e) {
    (t.exports = function(t, e) {
      if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
    }),
      (t.exports.default = t.exports),
      (t.exports.__esModule = !0);
  },
  function(t, e) {
    function r(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          'value' in n && (n.writable = !0),
          Object.defineProperty(t, n.key, n);
      }
    }
    (t.exports = function(t, e, n) {
      return e && r(t.prototype, e), n && r(t, n), t;
    }),
      (t.exports.default = t.exports),
      (t.exports.__esModule = !0);
  },
  function(t, e, r) {
    var n = r(5);
    (n.Template = r(6).Template), (n.template = n.Template), (t.exports = n);
  },
  function(t, e, r) {
    /*! algoliasearch.umd.js | 4.6.0 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript */
    t.exports = (function() {
      'use strict';
      function t(t, e, r) {
        return (
          e in t
            ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
            : (t[e] = r),
          t
        );
      }
      function e(t, e) {
        var r = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(t);
          e &&
            (n = n.filter(function(e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function r(r) {
        for (var n = 1; n < arguments.length; n++) {
          var a = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? e(Object(a), !0).forEach(function(e) {
                t(r, e, a[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(a))
            : e(Object(a)).forEach(function(t) {
                Object.defineProperty(r, t, Object.getOwnPropertyDescriptor(a, t));
              });
        }
        return r;
      }
      function n(t, e) {
        if (null == t) return {};
        var r,
          n,
          a = (function(t, e) {
            if (null == t) return {};
            var r,
              n,
              a = {},
              i = Object.keys(t);
            for (n = 0; n < i.length; n++) (r = i[n]), e.indexOf(r) >= 0 || (a[r] = t[r]);
            return a;
          })(t, e);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(t);
          for (n = 0; n < i.length; n++)
            (r = i[n]), e.indexOf(r) >= 0 || (Object.prototype.propertyIsEnumerable.call(t, r) && (a[r] = t[r]));
        }
        return a;
      }
      function a(t, e) {
        return (
          (function(t) {
            if (Array.isArray(t)) return t;
          })(t) ||
          (function(t, e) {
            if (Symbol.iterator in Object(t) || '[object Arguments]' === Object.prototype.toString.call(t)) {
              var r = [],
                n = !0,
                a = !1,
                i = void 0;
              try {
                for (
                  var o, s = t[Symbol.iterator]();
                  !(n = (o = s.next()).done) && (r.push(o.value), !e || r.length !== e);
                  n = !0
                );
              } catch (t) {
                (a = !0), (i = t);
              } finally {
                try {
                  n || null == s.return || s.return();
                } finally {
                  if (a) throw i;
                }
              }
              return r;
            }
          })(t, e) ||
          (function() {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
          })()
        );
      }
      function i(t) {
        return (
          (function(t) {
            if (Array.isArray(t)) {
              for (var e = 0, r = new Array(t.length); e < t.length; e++) r[e] = t[e];
              return r;
            }
          })(t) ||
          (function(t) {
            if (Symbol.iterator in Object(t) || '[object Arguments]' === Object.prototype.toString.call(t))
              return Array.from(t);
          })(t) ||
          (function() {
            throw new TypeError('Invalid attempt to spread non-iterable instance');
          })()
        );
      }
      function o(t) {
        var e,
          r = 'algoliasearch-client-js-'.concat(t.key),
          n = function() {
            return void 0 === e && (e = t.localStorage || window.localStorage), e;
          },
          i = function() {
            return JSON.parse(n().getItem(r) || '{}');
          };
        return {
          get: function(t, e) {
            var r =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {
                    miss: function() {
                      return Promise.resolve();
                    }
                  };
            return Promise.resolve()
              .then(function() {
                var r = JSON.stringify(t),
                  n = i()[r];
                return Promise.all([n || e(), void 0 !== n]);
              })
              .then(function(t) {
                var e = a(t, 2),
                  n = e[0],
                  i = e[1];
                return Promise.all([n, i || r.miss(n)]);
              })
              .then(function(t) {
                return a(t, 1)[0];
              });
          },
          set: function(t, e) {
            return Promise.resolve().then(function() {
              var a = i();
              return (a[JSON.stringify(t)] = e), n().setItem(r, JSON.stringify(a)), e;
            });
          },
          delete: function(t) {
            return Promise.resolve().then(function() {
              var e = i();
              delete e[JSON.stringify(t)], n().setItem(r, JSON.stringify(e));
            });
          },
          clear: function() {
            return Promise.resolve().then(function() {
              n().removeItem(r);
            });
          }
        };
      }
      function s(t) {
        var e = i(t.caches),
          r = e.shift();
        return void 0 === r
          ? {
              get: function(t, e) {
                var r =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : {
                          miss: function() {
                            return Promise.resolve();
                          }
                        },
                  n = e();
                return n
                  .then(function(t) {
                    return Promise.all([t, r.miss(t)]);
                  })
                  .then(function(t) {
                    return a(t, 1)[0];
                  });
              },
              set: function(t, e) {
                return Promise.resolve(e);
              },
              delete: function(t) {
                return Promise.resolve();
              },
              clear: function() {
                return Promise.resolve();
              }
            }
          : {
              get: function(t, n) {
                var a =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {
                        miss: function() {
                          return Promise.resolve();
                        }
                      };
                return r.get(t, n, a).catch(function() {
                  return s({ caches: e }).get(t, n, a);
                });
              },
              set: function(t, n) {
                return r.set(t, n).catch(function() {
                  return s({ caches: e }).set(t, n);
                });
              },
              delete: function(t) {
                return r.delete(t).catch(function() {
                  return s({ caches: e }).delete(t);
                });
              },
              clear: function() {
                return r.clear().catch(function() {
                  return s({ caches: e }).clear();
                });
              }
            };
      }
      function u() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { serializable: !0 },
          e = {};
        return {
          get: function(r, n) {
            var a =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {
                      miss: function() {
                        return Promise.resolve();
                      }
                    },
              i = JSON.stringify(r);
            if (i in e) return Promise.resolve(t.serializable ? JSON.parse(e[i]) : e[i]);
            var o = n(),
              s =
                (a && a.miss) ||
                function() {
                  return Promise.resolve();
                };
            return o
              .then(function(t) {
                return s(t);
              })
              .then(function() {
                return o;
              });
          },
          set: function(r, n) {
            return (e[JSON.stringify(r)] = t.serializable ? JSON.stringify(n) : n), Promise.resolve(n);
          },
          delete: function(t) {
            return delete e[JSON.stringify(t)], Promise.resolve();
          },
          clear: function() {
            return (e = {}), Promise.resolve();
          }
        };
      }
      function c(t, e, r) {
        var n = { 'x-algolia-api-key': r, 'x-algolia-application-id': e };
        return {
          headers: function() {
            return t === m.WithinHeaders ? n : {};
          },
          queryParameters: function() {
            return t === m.WithinQueryParameters ? n : {};
          }
        };
      }
      function l(t) {
        var e = 0;
        return t(function r() {
          return (
            e++,
            new Promise(function(n) {
              setTimeout(function() {
                n(t(r));
              }, Math.min(100 * e, 1e3));
            })
          );
        });
      }
      function f(t) {
        var e =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : function(t, e) {
                return Promise.resolve();
              };
        return Object.assign(t, {
          wait: function(r) {
            return f(
              t
                .then(function(t) {
                  return Promise.all([e(t, r), t]);
                })
                .then(function(t) {
                  return t[1];
                })
            );
          }
        });
      }
      function h(t) {
        for (var e = t.length - 1; e > 0; e--) {
          var r = Math.floor(Math.random() * (e + 1)),
            n = t[e];
          (t[e] = t[r]), (t[r] = n);
        }
        return t;
      }
      function d(t, e) {
        return e
          ? (Object.keys(e).forEach(function(r) {
              t[r] = e[r](t);
            }),
            t)
          : t;
      }
      function p(t) {
        for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++) r[n - 1] = arguments[n];
        var a = 0;
        return t.replace(/%s/g, function() {
          return encodeURIComponent(r[a++]);
        });
      }
      var m = { WithinQueryParameters: 0, WithinHeaders: 1 };
      function g(t, e) {
        var r = t || {},
          n = r.data || {};
        return (
          Object.keys(r).forEach(function(t) {
            -1 === ['timeout', 'headers', 'queryParameters', 'data', 'cacheable'].indexOf(t) && (n[t] = r[t]);
          }),
          {
            data: Object.entries(n).length > 0 ? n : void 0,
            timeout: r.timeout || e,
            headers: r.headers || {},
            queryParameters: r.queryParameters || {},
            cacheable: r.cacheable
          }
        );
      }
      var v = { Read: 1, Write: 2, Any: 3 };
      function y(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return r(r({}, t), {}, { status: e, lastUpdate: Date.now() });
      }
      function b(t) {
        return 'string' == typeof t
          ? { protocol: 'https', url: t, accept: v.Any }
          : { protocol: t.protocol || 'https', url: t.url, accept: t.accept || v.Any };
      }
      var w = 'DELETE',
        x = 'GET',
        k = 'POST';
      function P(t, e, n, a) {
        var o = [],
          s = (function(t, e) {
            if (t.method !== x && (void 0 !== t.data || void 0 !== e.data)) {
              var n = Array.isArray(t.data) ? t.data : r(r({}, t.data), e.data);
              return JSON.stringify(n);
            }
          })(n, a),
          u = (function(t, e) {
            var n = r(r({}, t.headers), e.headers),
              a = {};
            return (
              Object.keys(n).forEach(function(t) {
                var e = n[t];
                a[t.toLowerCase()] = e;
              }),
              a
            );
          })(t, a),
          c = n.method,
          l = n.method !== x ? {} : r(r({}, n.data), a.data),
          f = r(r(r({ 'x-algolia-agent': t.userAgent.value }, t.queryParameters), l), a.queryParameters),
          h = 0,
          d = function e(r, i) {
            var l = r.pop();
            if (void 0 === l)
              throw {
                name: 'RetryError',
                message:
                  'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
                transporterStackTrace: T(o)
              };
            var d = {
                data: s,
                headers: u,
                method: c,
                url: j(l, n.path, f),
                connectTimeout: i(h, t.timeouts.connect),
                responseTimeout: i(h, a.timeout)
              },
              p = function(t) {
                var e = { request: d, response: t, host: l, triesLeft: r.length };
                return o.push(e), e;
              },
              m = {
                onSucess: function(t) {
                  return (function(t) {
                    try {
                      return JSON.parse(t.content);
                    } catch (e) {
                      throw (function(t, e) {
                        return { name: 'DeserializationError', message: t, response: e };
                      })(e.message, t);
                    }
                  })(t);
                },
                onRetry: function(n) {
                  var a = p(n);
                  return (
                    n.isTimedOut && h++,
                    Promise.all([
                      t.logger.info('Retryable failure', q(a)),
                      t.hostsCache.set(l, y(l, n.isTimedOut ? 3 : 2))
                    ]).then(function() {
                      return e(r, i);
                    })
                  );
                },
                onFail: function(t) {
                  throw (p(t),
                  (function(t, e) {
                    var r = t.content,
                      n = t.status,
                      a = r;
                    try {
                      a = JSON.parse(r).message;
                    } catch (t) {}
                    return (function(t, e, r) {
                      return { name: 'ApiError', message: t, status: e, transporterStackTrace: r };
                    })(a, n, e);
                  })(t, T(o)));
                }
              };
            return t.requester.send(d).then(function(t) {
              return (function(t, e) {
                return (function(t) {
                  var e = t.status;
                  return (
                    t.isTimedOut ||
                    (function(t) {
                      var e = t.isTimedOut,
                        r = t.status;
                      return !e && 0 == ~~r;
                    })(t) ||
                    (2 != ~~(e / 100) && 4 != ~~(e / 100))
                  );
                })(t)
                  ? e.onRetry(t)
                  : 2 == ~~(t.status / 100)
                  ? e.onSucess(t)
                  : e.onFail(t);
              })(t, m);
            });
          };
        return (function(t, e) {
          return Promise.all(
            e.map(function(e) {
              return t.get(e, function() {
                return Promise.resolve(y(e));
              });
            })
          ).then(function(t) {
            var r = t.filter(function(t) {
                return (function(t) {
                  return 1 === t.status || Date.now() - t.lastUpdate > 12e4;
                })(t);
              }),
              n = t.filter(function(t) {
                return (function(t) {
                  return 3 === t.status && Date.now() - t.lastUpdate <= 12e4;
                })(t);
              }),
              a = [].concat(i(r), i(n));
            return {
              getTimeout: function(t, e) {
                return (0 === n.length && 0 === t ? 1 : n.length + 3 + t) * e;
              },
              statelessHosts:
                a.length > 0
                  ? a.map(function(t) {
                      return b(t);
                    })
                  : e
            };
          });
        })(t.hostsCache, e).then(function(t) {
          return d(i(t.statelessHosts).reverse(), t.getTimeout);
        });
      }
      function S(t) {
        var e = t.hostsCache,
          r = t.logger,
          n = t.requester,
          i = t.requestsCache,
          o = t.responsesCache,
          s = t.timeouts,
          u = t.userAgent,
          c = t.hosts,
          l = t.queryParameters,
          f = {
            hostsCache: e,
            logger: r,
            requester: n,
            requestsCache: i,
            responsesCache: o,
            timeouts: s,
            userAgent: u,
            headers: t.headers,
            queryParameters: l,
            hosts: c.map(function(t) {
              return b(t);
            }),
            read: function(t, e) {
              var r = g(e, f.timeouts.read),
                n = function() {
                  return P(
                    f,
                    f.hosts.filter(function(t) {
                      return 0 != (t.accept & v.Read);
                    }),
                    t,
                    r
                  );
                };
              if (!0 !== (void 0 !== r.cacheable ? r.cacheable : t.cacheable)) return n();
              var i = {
                request: t,
                mappedRequestOptions: r,
                transporter: { queryParameters: f.queryParameters, headers: f.headers }
              };
              return f.responsesCache.get(
                i,
                function() {
                  return f.requestsCache.get(i, function() {
                    return f.requestsCache
                      .set(i, n())
                      .then(
                        function(t) {
                          return Promise.all([f.requestsCache.delete(i), t]);
                        },
                        function(t) {
                          return Promise.all([f.requestsCache.delete(i), Promise.reject(t)]);
                        }
                      )
                      .then(function(t) {
                        var e = a(t, 2);
                        return e[0], e[1];
                      });
                  });
                },
                {
                  miss: function(t) {
                    return f.responsesCache.set(i, t);
                  }
                }
              );
            },
            write: function(t, e) {
              return P(
                f,
                f.hosts.filter(function(t) {
                  return 0 != (t.accept & v.Write);
                }),
                t,
                g(e, f.timeouts.write)
              );
            }
          };
        return f;
      }
      function O(t) {
        var e = {
          value: 'Algolia for JavaScript ('.concat(t, ')'),
          add: function(t) {
            var r = '; '.concat(t.segment).concat(void 0 !== t.version ? ' ('.concat(t.version, ')') : '');
            return -1 === e.value.indexOf(r) && (e.value = ''.concat(e.value).concat(r)), e;
          }
        };
        return e;
      }
      function j(t, e, r) {
        var n = I(r),
          a = ''
            .concat(t.protocol, '://')
            .concat(t.url, '/')
            .concat('/' === e.charAt(0) ? e.substr(1) : e);
        return n.length && (a += '?'.concat(n)), a;
      }
      function I(t) {
        return Object.keys(t)
          .map(function(e) {
            return p(
              '%s=%s',
              e,
              ((r = t[e]),
              '[object Object]' === Object.prototype.toString.call(r) ||
              '[object Array]' === Object.prototype.toString.call(r)
                ? JSON.stringify(t[e])
                : t[e])
            );
            var r;
          })
          .join('&');
      }
      function T(t) {
        return t.map(function(t) {
          return q(t);
        });
      }
      function q(t) {
        var e = t.request.headers['x-algolia-api-key'] ? { 'x-algolia-api-key': '*****' } : {};
        return r(r({}, t), {}, { request: r(r({}, t.request), {}, { headers: r(r({}, t.request.headers), e) }) });
      }
      var D = function(t) {
          return function(e, r) {
            return t.transporter.write({ method: k, path: '2/abtests', data: e }, r);
          };
        },
        R = function(t) {
          return function(e, r) {
            return t.transporter.write({ method: w, path: p('2/abtests/%s', e) }, r);
          };
        },
        A = function(t) {
          return function(e, r) {
            return t.transporter.read({ method: x, path: p('2/abtests/%s', e) }, r);
          };
        },
        E = function(t) {
          return function(e) {
            return t.transporter.read({ method: x, path: '2/abtests' }, e);
          };
        },
        N = function(t) {
          return function(e, r) {
            return t.transporter.write({ method: k, path: p('2/abtests/%s/stop', e) }, r);
          };
        },
        C = function(t) {
          return function(e) {
            return t.transporter.read({ method: x, path: '1/strategies/personalization' }, e);
          };
        },
        _ = function(t) {
          return function(e, r) {
            return t.transporter.write({ method: k, path: '1/strategies/personalization', data: e }, r);
          };
        };
      function L(t) {
        return (function e(r) {
          return t.request(r).then(function(n) {
            if ((void 0 !== t.batch && t.batch(n.hits), !t.shouldStop(n)))
              return n.cursor ? e({ cursor: n.cursor }) : e({ page: (r.page || 0) + 1 });
          });
        })({});
      }
      var U = function(t) {
          return function(e, a) {
            var i = a || {},
              o = i.queryParameters,
              s = n(i, ['queryParameters']),
              u = r({ acl: e }, void 0 !== o ? { queryParameters: o } : {});
            return f(t.transporter.write({ method: k, path: '1/keys', data: u }, s), function(e, r) {
              return l(function(n) {
                return B(t)(e.key, r).catch(function(t) {
                  if (404 !== t.status) throw t;
                  return n();
                });
              });
            });
          };
        },
        $ = function(t) {
          return function(e, r, n) {
            var a = g(n);
            return (
              (a.queryParameters['X-Algolia-User-ID'] = e),
              t.transporter.write({ method: k, path: '1/clusters/mapping', data: { cluster: r } }, a)
            );
          };
        },
        M = function(t) {
          return function(e, r, n) {
            return t.transporter.write(
              { method: k, path: '1/clusters/mapping/batch', data: { users: e, cluster: r } },
              n
            );
          };
        },
        F = function(t) {
          return function(e, r, n) {
            return f(
              t.transporter.write(
                { method: k, path: p('1/indexes/%s/operation', e), data: { operation: 'copy', destination: r } },
                n
              ),
              function(r, n) {
                return X(t)(e, { methods: { waitTask: Qt } }).waitTask(r.taskID, n);
              }
            );
          };
        },
        H = function(t) {
          return function(e, n, a) {
            return F(t)(e, n, r(r({}, a), {}, { scope: [Xt.Rules] }));
          };
        },
        K = function(t) {
          return function(e, n, a) {
            return F(t)(e, n, r(r({}, a), {}, { scope: [Xt.Settings] }));
          };
        },
        J = function(t) {
          return function(e, n, a) {
            return F(t)(e, n, r(r({}, a), {}, { scope: [Xt.Synonyms] }));
          };
        },
        z = function(t) {
          return function(e, r) {
            return f(t.transporter.write({ method: w, path: p('1/keys/%s', e) }, r), function(r, n) {
              return l(function(r) {
                return B(t)(e, n)
                  .then(r)
                  .catch(function(t) {
                    if (404 !== t.status) throw t;
                  });
              });
            });
          };
        },
        B = function(t) {
          return function(e, r) {
            return t.transporter.read({ method: x, path: p('1/keys/%s', e) }, r);
          };
        },
        G = function(t) {
          return function(e) {
            return t.transporter.read({ method: x, path: '1/logs' }, e);
          };
        },
        W = function(t) {
          return function(e) {
            return t.transporter.read({ method: x, path: '1/clusters/mapping/top' }, e);
          };
        },
        Q = function(t) {
          return function(e, r) {
            return t.transporter.read({ method: x, path: p('1/clusters/mapping/%s', e) }, r);
          };
        },
        V = function(t) {
          return function(e) {
            var r = e || {},
              a = r.retrieveMappings,
              i = n(r, ['retrieveMappings']);
            return (
              !0 === a && (i.getClusters = !0), t.transporter.read({ method: x, path: '1/clusters/mapping/pending' }, i)
            );
          };
        },
        X = function(t) {
          return function(e) {
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = { transporter: t.transporter, appId: t.appId, indexName: e };
            return d(n, r.methods);
          };
        },
        Y = function(t) {
          return function(e) {
            return t.transporter.read({ method: x, path: '1/keys' }, e);
          };
        },
        Z = function(t) {
          return function(e) {
            return t.transporter.read({ method: x, path: '1/clusters' }, e);
          };
        },
        tt = function(t) {
          return function(e) {
            return t.transporter.read({ method: x, path: '1/indexes' }, e);
          };
        },
        et = function(t) {
          return function(e) {
            return t.transporter.read({ method: x, path: '1/clusters/mapping' }, e);
          };
        },
        rt = function(t) {
          return function(e, r, n) {
            return f(
              t.transporter.write(
                { method: k, path: p('1/indexes/%s/operation', e), data: { operation: 'move', destination: r } },
                n
              ),
              function(r, n) {
                return X(t)(e, { methods: { waitTask: Qt } }).waitTask(r.taskID, n);
              }
            );
          };
        },
        nt = function(t) {
          return function(e, r) {
            return f(t.transporter.write({ method: k, path: '1/indexes/*/batch', data: { requests: e } }, r), function(
              e,
              r
            ) {
              return Promise.all(
                Object.keys(e.taskID).map(function(n) {
                  return X(t)(n, { methods: { waitTask: Qt } }).waitTask(e.taskID[n], r);
                })
              );
            });
          };
        },
        at = function(t) {
          return function(e, r) {
            return t.transporter.read({ method: k, path: '1/indexes/*/objects', data: { requests: e } }, r);
          };
        },
        it = function(t) {
          return function(e, n) {
            var a = e.map(function(t) {
              return r(r({}, t), {}, { params: I(t.params || {}) });
            });
            return t.transporter.read(
              { method: k, path: '1/indexes/*/queries', data: { requests: a }, cacheable: !0 },
              n
            );
          };
        },
        ot = function(t) {
          return function(e, a) {
            return Promise.all(
              e.map(function(e) {
                var i = e.params,
                  o = i.facetName,
                  s = i.facetQuery,
                  u = n(i, ['facetName', 'facetQuery']);
                return X(t)(e.indexName, { methods: { searchForFacetValues: zt } }).searchForFacetValues(
                  o,
                  s,
                  r(r({}, a), u)
                );
              })
            );
          };
        },
        st = function(t) {
          return function(e, r) {
            var n = g(r);
            return (
              (n.queryParameters['X-Algolia-User-ID'] = e),
              t.transporter.write({ method: w, path: '1/clusters/mapping' }, n)
            );
          };
        },
        ut = function(t) {
          return function(e, r) {
            return f(t.transporter.write({ method: k, path: p('1/keys/%s/restore', e) }, r), function(r, n) {
              return l(function(r) {
                return B(t)(e, n).catch(function(t) {
                  if (404 !== t.status) throw t;
                  return r();
                });
              });
            });
          };
        },
        ct = function(t) {
          return function(e, r) {
            return t.transporter.read({ method: k, path: '1/clusters/mapping/search', data: { query: e } }, r);
          };
        },
        lt = function(t) {
          return function(e, r) {
            var a = Object.assign({}, r),
              i = r || {},
              o = i.queryParameters,
              s = n(i, ['queryParameters']),
              u = o ? { queryParameters: o } : {},
              c = [
                'acl',
                'indexes',
                'referers',
                'restrictSources',
                'queryParameters',
                'description',
                'maxQueriesPerIPPerHour',
                'maxHitsPerQuery'
              ];
            return f(t.transporter.write({ method: 'PUT', path: p('1/keys/%s', e), data: u }, s), function(r, n) {
              return l(function(r) {
                return B(t)(e, n).then(function(t) {
                  return (function(t) {
                    return Object.keys(a)
                      .filter(function(t) {
                        return -1 !== c.indexOf(t);
                      })
                      .every(function(e) {
                        return t[e] === a[e];
                      });
                  })(t)
                    ? Promise.resolve()
                    : r();
                });
              });
            });
          };
        },
        ft = function(t) {
          return function(e, r) {
            return f(
              t.transporter.write({ method: k, path: p('1/indexes/%s/batch', t.indexName), data: { requests: e } }, r),
              function(e, r) {
                return Qt(t)(e.taskID, r);
              }
            );
          };
        },
        ht = function(t) {
          return function(e) {
            return L(
              r(
                r(
                  {
                    shouldStop: function(t) {
                      return void 0 === t.cursor;
                    }
                  },
                  e
                ),
                {},
                {
                  request: function(r) {
                    return t.transporter.read({ method: k, path: p('1/indexes/%s/browse', t.indexName), data: r }, e);
                  }
                }
              )
            );
          };
        },
        dt = function(t) {
          return function(e) {
            var n = r({ hitsPerPage: 1e3 }, e);
            return L(
              r(
                r(
                  {
                    shouldStop: function(t) {
                      return t.hits.length < n.hitsPerPage;
                    }
                  },
                  n
                ),
                {},
                {
                  request: function(e) {
                    return Bt(t)('', r(r({}, n), e)).then(function(t) {
                      return r(
                        r({}, t),
                        {},
                        {
                          hits: t.hits.map(function(t) {
                            return delete t._highlightResult, t;
                          })
                        }
                      );
                    });
                  }
                }
              )
            );
          };
        },
        pt = function(t) {
          return function(e) {
            var n = r({ hitsPerPage: 1e3 }, e);
            return L(
              r(
                r(
                  {
                    shouldStop: function(t) {
                      return t.hits.length < n.hitsPerPage;
                    }
                  },
                  n
                ),
                {},
                {
                  request: function(e) {
                    return Gt(t)('', r(r({}, n), e)).then(function(t) {
                      return r(
                        r({}, t),
                        {},
                        {
                          hits: t.hits.map(function(t) {
                            return delete t._highlightResult, t;
                          })
                        }
                      );
                    });
                  }
                }
              )
            );
          };
        },
        mt = function(t) {
          return function(e, r, a) {
            var i = a || {},
              o = i.batchSize,
              s = n(i, ['batchSize']),
              u = { taskIDs: [], objectIDs: [] };
            return f(
              (function n() {
                var a,
                  i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                  c = [];
                for (a = i; a < e.length && (c.push(e[a]), c.length !== (o || 1e3)); a++);
                return 0 === c.length
                  ? Promise.resolve(u)
                  : ft(t)(
                      c.map(function(t) {
                        return { action: r, body: t };
                      }),
                      s
                    ).then(function(t) {
                      return (u.objectIDs = u.objectIDs.concat(t.objectIDs)), u.taskIDs.push(t.taskID), a++, n(a);
                    });
              })(),
              function(e, r) {
                return Promise.all(
                  e.taskIDs.map(function(e) {
                    return Qt(t)(e, r);
                  })
                );
              }
            );
          };
        },
        gt = function(t) {
          return function(e) {
            return f(t.transporter.write({ method: k, path: p('1/indexes/%s/clear', t.indexName) }, e), function(e, r) {
              return Qt(t)(e.taskID, r);
            });
          };
        },
        vt = function(t) {
          return function(e) {
            var r = e || {},
              a = r.forwardToReplicas,
              i = g(n(r, ['forwardToReplicas']));
            return (
              a && (i.queryParameters.forwardToReplicas = 1),
              f(t.transporter.write({ method: k, path: p('1/indexes/%s/rules/clear', t.indexName) }, i), function(
                e,
                r
              ) {
                return Qt(t)(e.taskID, r);
              })
            );
          };
        },
        yt = function(t) {
          return function(e) {
            var r = e || {},
              a = r.forwardToReplicas,
              i = g(n(r, ['forwardToReplicas']));
            return (
              a && (i.queryParameters.forwardToReplicas = 1),
              f(t.transporter.write({ method: k, path: p('1/indexes/%s/synonyms/clear', t.indexName) }, i), function(
                e,
                r
              ) {
                return Qt(t)(e.taskID, r);
              })
            );
          };
        },
        bt = function(t) {
          return function(e, r) {
            return f(
              t.transporter.write({ method: k, path: p('1/indexes/%s/deleteByQuery', t.indexName), data: e }, r),
              function(e, r) {
                return Qt(t)(e.taskID, r);
              }
            );
          };
        },
        wt = function(t) {
          return function(e) {
            return f(t.transporter.write({ method: w, path: p('1/indexes/%s', t.indexName) }, e), function(e, r) {
              return Qt(t)(e.taskID, r);
            });
          };
        },
        xt = function(t) {
          return function(e, r) {
            return f(
              kt(t)([e], r).then(function(t) {
                return { taskID: t.taskIDs[0] };
              }),
              function(e, r) {
                return Qt(t)(e.taskID, r);
              }
            );
          };
        },
        kt = function(t) {
          return function(e, r) {
            var n = e.map(function(t) {
              return { objectID: t };
            });
            return mt(t)(n, Vt.DeleteObject, r);
          };
        },
        Pt = function(t) {
          return function(e, r) {
            var a = r || {},
              i = a.forwardToReplicas,
              o = g(n(a, ['forwardToReplicas']));
            return (
              i && (o.queryParameters.forwardToReplicas = 1),
              f(t.transporter.write({ method: w, path: p('1/indexes/%s/rules/%s', t.indexName, e) }, o), function(
                e,
                r
              ) {
                return Qt(t)(e.taskID, r);
              })
            );
          };
        },
        St = function(t) {
          return function(e, r) {
            var a = r || {},
              i = a.forwardToReplicas,
              o = g(n(a, ['forwardToReplicas']));
            return (
              i && (o.queryParameters.forwardToReplicas = 1),
              f(t.transporter.write({ method: w, path: p('1/indexes/%s/synonyms/%s', t.indexName, e) }, o), function(
                e,
                r
              ) {
                return Qt(t)(e.taskID, r);
              })
            );
          };
        },
        Ot = function(t) {
          return function(e) {
            return Rt(t)(e)
              .then(function() {
                return !0;
              })
              .catch(function(t) {
                if (404 !== t.status) throw t;
                return !1;
              });
          };
        },
        jt = function(t) {
          return function(e, i) {
            var o = i || {},
              s = o.query,
              u = o.paginate,
              c = n(o, ['query', 'paginate']),
              l = 0;
            return (function n() {
              return Jt(t)(s || '', r(r({}, c), {}, { page: l })).then(function(t) {
                for (var r = 0, i = Object.entries(t.hits); r < i.length; r++) {
                  var o = a(i[r], 2),
                    s = o[0],
                    c = o[1];
                  if (e(c)) return { object: c, position: parseInt(s, 10), page: l };
                }
                if ((l++, !1 === u || l >= t.nbPages))
                  throw { name: 'ObjectNotFoundError', message: 'Object not found.' };
                return n();
              });
            })();
          };
        },
        It = function(t) {
          return function(e, r) {
            return t.transporter.read({ method: x, path: p('1/indexes/%s/%s', t.indexName, e) }, r);
          };
        },
        Tt = function() {
          return function(t, e) {
            for (var r = 0, n = Object.entries(t.hits); r < n.length; r++) {
              var i = a(n[r], 2),
                o = i[0];
              if (i[1].objectID === e) return parseInt(o, 10);
            }
            return -1;
          };
        },
        qt = function(t) {
          return function(e, a) {
            var i = a || {},
              o = i.attributesToRetrieve,
              s = n(i, ['attributesToRetrieve']),
              u = e.map(function(e) {
                return r({ indexName: t.indexName, objectID: e }, o ? { attributesToRetrieve: o } : {});
              });
            return t.transporter.read({ method: k, path: '1/indexes/*/objects', data: { requests: u } }, s);
          };
        },
        Dt = function(t) {
          return function(e, r) {
            return t.transporter.read({ method: x, path: p('1/indexes/%s/rules/%s', t.indexName, e) }, r);
          };
        },
        Rt = function(t) {
          return function(e) {
            return t.transporter.read(
              { method: x, path: p('1/indexes/%s/settings', t.indexName), data: { getVersion: 2 } },
              e
            );
          };
        },
        At = function(t) {
          return function(e, r) {
            return t.transporter.read({ method: x, path: p('1/indexes/%s/synonyms/%s', t.indexName, e) }, r);
          };
        },
        Et = function(t) {
          return function(e, r) {
            return f(
              Nt(t)([e], r).then(function(t) {
                return { objectID: t.objectIDs[0], taskID: t.taskIDs[0] };
              }),
              function(e, r) {
                return Qt(t)(e.taskID, r);
              }
            );
          };
        },
        Nt = function(t) {
          return function(e, r) {
            var a = r || {},
              i = a.createIfNotExists,
              o = n(a, ['createIfNotExists']),
              s = i ? Vt.PartialUpdateObject : Vt.PartialUpdateObjectNoCreate;
            return mt(t)(e, s, o);
          };
        },
        Ct = function(t) {
          return function(e, o) {
            var s = o || {},
              u = s.safe,
              c = s.autoGenerateObjectIDIfNotExist,
              l = s.batchSize,
              h = n(s, ['safe', 'autoGenerateObjectIDIfNotExist', 'batchSize']),
              d = function(e, r, n, a) {
                return f(
                  t.transporter.write(
                    { method: k, path: p('1/indexes/%s/operation', e), data: { operation: n, destination: r } },
                    a
                  ),
                  function(e, r) {
                    return Qt(t)(e.taskID, r);
                  }
                );
              },
              m = Math.random()
                .toString(36)
                .substring(7),
              g = ''.concat(t.indexName, '_tmp_').concat(m),
              v = $t({ appId: t.appId, transporter: t.transporter, indexName: g }),
              y = [],
              b = d(t.indexName, g, 'copy', r(r({}, h), {}, { scope: ['settings', 'synonyms', 'rules'] }));
            return (
              y.push(b),
              f(
                (u ? b.wait(h) : b)
                  .then(function() {
                    var t = v(e, r(r({}, h), {}, { autoGenerateObjectIDIfNotExist: c, batchSize: l }));
                    return y.push(t), u ? t.wait(h) : t;
                  })
                  .then(function() {
                    var e = d(g, t.indexName, 'move', h);
                    return y.push(e), u ? e.wait(h) : e;
                  })
                  .then(function() {
                    return Promise.all(y);
                  })
                  .then(function(t) {
                    var e = a(t, 3),
                      r = e[0],
                      n = e[1],
                      o = e[2];
                    return { objectIDs: n.objectIDs, taskIDs: [r.taskID].concat(i(n.taskIDs), [o.taskID]) };
                  }),
                function(t, e) {
                  return Promise.all(
                    y.map(function(t) {
                      return t.wait(e);
                    })
                  );
                }
              )
            );
          };
        },
        _t = function(t) {
          return function(e, n) {
            return Ft(t)(e, r(r({}, n), {}, { clearExistingRules: !0 }));
          };
        },
        Lt = function(t) {
          return function(e, n) {
            return Kt(t)(e, r(r({}, n), {}, { replaceExistingSynonyms: !0 }));
          };
        },
        Ut = function(t) {
          return function(e, r) {
            return f(
              $t(t)([e], r).then(function(t) {
                return { objectID: t.objectIDs[0], taskID: t.taskIDs[0] };
              }),
              function(e, r) {
                return Qt(t)(e.taskID, r);
              }
            );
          };
        },
        $t = function(t) {
          return function(e, r) {
            var a = r || {},
              i = a.autoGenerateObjectIDIfNotExist,
              o = n(a, ['autoGenerateObjectIDIfNotExist']),
              s = i ? Vt.AddObject : Vt.UpdateObject;
            if (s === Vt.UpdateObject) {
              var u = !0,
                c = !1,
                l = void 0;
              try {
                for (var h, d = e[Symbol.iterator](); !(u = (h = d.next()).done); u = !0)
                  if (void 0 === h.value.objectID)
                    return f(
                      Promise.reject({
                        name: 'MissingObjectIDError',
                        message:
                          "All objects must have an unique objectID (like a primary key) to be valid. Algolia is also able to generate objectIDs automatically but *it's not recommended*. To do it, use the `{'autoGenerateObjectIDIfNotExist': true}` option."
                      })
                    );
              } catch (t) {
                (c = !0), (l = t);
              } finally {
                try {
                  u || null == d.return || d.return();
                } finally {
                  if (c) throw l;
                }
              }
            }
            return mt(t)(e, s, o);
          };
        },
        Mt = function(t) {
          return function(e, r) {
            return Ft(t)([e], r);
          };
        },
        Ft = function(t) {
          return function(e, r) {
            var a = r || {},
              i = a.forwardToReplicas,
              o = a.clearExistingRules,
              s = g(n(a, ['forwardToReplicas', 'clearExistingRules']));
            return (
              i && (s.queryParameters.forwardToReplicas = 1),
              o && (s.queryParameters.clearExistingRules = 1),
              f(
                t.transporter.write({ method: k, path: p('1/indexes/%s/rules/batch', t.indexName), data: e }, s),
                function(e, r) {
                  return Qt(t)(e.taskID, r);
                }
              )
            );
          };
        },
        Ht = function(t) {
          return function(e, r) {
            return Kt(t)([e], r);
          };
        },
        Kt = function(t) {
          return function(e, r) {
            var a = r || {},
              i = a.forwardToReplicas,
              o = a.replaceExistingSynonyms,
              s = g(n(a, ['forwardToReplicas', 'replaceExistingSynonyms']));
            return (
              i && (s.queryParameters.forwardToReplicas = 1),
              o && (s.queryParameters.replaceExistingSynonyms = 1),
              f(
                t.transporter.write({ method: k, path: p('1/indexes/%s/synonyms/batch', t.indexName), data: e }, s),
                function(e, r) {
                  return Qt(t)(e.taskID, r);
                }
              )
            );
          };
        },
        Jt = function(t) {
          return function(e, r) {
            return t.transporter.read(
              { method: k, path: p('1/indexes/%s/query', t.indexName), data: { query: e }, cacheable: !0 },
              r
            );
          };
        },
        zt = function(t) {
          return function(e, r, n) {
            return t.transporter.read(
              {
                method: k,
                path: p('1/indexes/%s/facets/%s/query', t.indexName, e),
                data: { facetQuery: r },
                cacheable: !0
              },
              n
            );
          };
        },
        Bt = function(t) {
          return function(e, r) {
            return t.transporter.read(
              { method: k, path: p('1/indexes/%s/rules/search', t.indexName), data: { query: e } },
              r
            );
          };
        },
        Gt = function(t) {
          return function(e, r) {
            return t.transporter.read(
              { method: k, path: p('1/indexes/%s/synonyms/search', t.indexName), data: { query: e } },
              r
            );
          };
        },
        Wt = function(t) {
          return function(e, r) {
            var a = r || {},
              i = a.forwardToReplicas,
              o = g(n(a, ['forwardToReplicas']));
            return (
              i && (o.queryParameters.forwardToReplicas = 1),
              f(
                t.transporter.write({ method: 'PUT', path: p('1/indexes/%s/settings', t.indexName), data: e }, o),
                function(e, r) {
                  return Qt(t)(e.taskID, r);
                }
              )
            );
          };
        },
        Qt = function(t) {
          return function(e, r) {
            return l(function(n) {
              return (function(t) {
                return function(e, r) {
                  return t.transporter.read(
                    { method: x, path: p('1/indexes/%s/task/%s', t.indexName, e.toString()) },
                    r
                  );
                };
              })(t)(e, r).then(function(t) {
                return 'published' !== t.status ? n() : void 0;
              });
            });
          };
        },
        Vt = {
          AddObject: 'addObject',
          UpdateObject: 'updateObject',
          PartialUpdateObject: 'partialUpdateObject',
          PartialUpdateObjectNoCreate: 'partialUpdateObjectNoCreate',
          DeleteObject: 'deleteObject',
          DeleteIndex: 'delete',
          ClearIndex: 'clear'
        },
        Xt = { Settings: 'settings', Synonyms: 'synonyms', Rules: 'rules' };
      function Yt(t, e, n) {
        var a = {
          appId: t,
          apiKey: e,
          timeouts: { connect: 1, read: 2, write: 30 },
          requester: {
            send: function(t) {
              return new Promise(function(e) {
                var r = new XMLHttpRequest();
                r.open(t.method, t.url, !0),
                  Object.keys(t.headers).forEach(function(e) {
                    return r.setRequestHeader(e, t.headers[e]);
                  });
                var n,
                  a = function(t, n) {
                    return setTimeout(function() {
                      r.abort(), e({ status: 0, content: n, isTimedOut: !0 });
                    }, 1e3 * t);
                  },
                  i = a(t.connectTimeout, 'Connection timeout');
                (r.onreadystatechange = function() {
                  r.readyState > r.OPENED &&
                    void 0 === n &&
                    (clearTimeout(i), (n = a(t.responseTimeout, 'Socket timeout')));
                }),
                  (r.onerror = function() {
                    0 === r.status &&
                      (clearTimeout(i),
                      clearTimeout(n),
                      e({ content: r.responseText || 'Network request failed', status: r.status, isTimedOut: !1 }));
                  }),
                  (r.onload = function() {
                    clearTimeout(i), clearTimeout(n), e({ content: r.responseText, status: r.status, isTimedOut: !1 });
                  }),
                  r.send(t.data);
              });
            }
          },
          logger: {
            debug: function(t, e) {
              return Promise.resolve();
            },
            info: function(t, e) {
              return Promise.resolve();
            },
            error: function(t, e) {
              return console.error(t, e), Promise.resolve();
            }
          },
          responsesCache: u(),
          requestsCache: u({ serializable: !1 }),
          hostsCache: s({ caches: [o({ key: ''.concat('4.6.0', '-').concat(t) }), u()] }),
          userAgent: O('4.6.0').add({ segment: 'Browser' })
        };
        return (function(t) {
          var e = t.appId,
            n = c(void 0 !== t.authMode ? t.authMode : m.WithinHeaders, e, t.apiKey),
            a = S(
              r(
                r(
                  {
                    hosts: [
                      { url: ''.concat(e, '-dsn.algolia.net'), accept: v.Read },
                      { url: ''.concat(e, '.algolia.net'), accept: v.Write }
                    ].concat(
                      h([
                        { url: ''.concat(e, '-1.algolianet.com') },
                        { url: ''.concat(e, '-2.algolianet.com') },
                        { url: ''.concat(e, '-3.algolianet.com') }
                      ])
                    )
                  },
                  t
                ),
                {},
                {
                  headers: r(r(r({}, n.headers()), { 'content-type': 'application/x-www-form-urlencoded' }), t.headers),
                  queryParameters: r(r({}, n.queryParameters()), t.queryParameters)
                }
              )
            );
          return d(
            {
              transporter: a,
              appId: e,
              addAlgoliaAgent: function(t, e) {
                a.userAgent.add({ segment: t, version: e });
              },
              clearCache: function() {
                return Promise.all([a.requestsCache.clear(), a.responsesCache.clear()]).then(function() {});
              }
            },
            t.methods
          );
        })(
          r(
            r(r({}, a), n),
            {},
            {
              methods: {
                search: it,
                searchForFacetValues: ot,
                multipleBatch: nt,
                multipleGetObjects: at,
                multipleQueries: it,
                copyIndex: F,
                copySettings: K,
                copySynonyms: J,
                copyRules: H,
                moveIndex: rt,
                listIndices: tt,
                getLogs: G,
                listClusters: Z,
                multipleSearchForFacetValues: ot,
                getApiKey: B,
                addApiKey: U,
                listApiKeys: Y,
                updateApiKey: lt,
                deleteApiKey: z,
                restoreApiKey: ut,
                assignUserID: $,
                assignUserIDs: M,
                getUserID: Q,
                searchUserIDs: ct,
                listUserIDs: et,
                getTopUserIDs: W,
                removeUserID: st,
                hasPendingMappings: V,
                initIndex: function(t) {
                  return function(e) {
                    return X(t)(e, {
                      methods: {
                        batch: ft,
                        delete: wt,
                        getObject: It,
                        getObjects: qt,
                        saveObject: Ut,
                        saveObjects: $t,
                        search: Jt,
                        searchForFacetValues: zt,
                        waitTask: Qt,
                        setSettings: Wt,
                        getSettings: Rt,
                        partialUpdateObject: Et,
                        partialUpdateObjects: Nt,
                        deleteObject: xt,
                        deleteObjects: kt,
                        deleteBy: bt,
                        clearObjects: gt,
                        browseObjects: ht,
                        getObjectPosition: Tt,
                        findObject: jt,
                        exists: Ot,
                        saveSynonym: Ht,
                        saveSynonyms: Kt,
                        getSynonym: At,
                        searchSynonyms: Gt,
                        browseSynonyms: pt,
                        deleteSynonym: St,
                        clearSynonyms: yt,
                        replaceAllObjects: Ct,
                        replaceAllSynonyms: Lt,
                        searchRules: Bt,
                        getRule: Dt,
                        deleteRule: Pt,
                        saveRule: Mt,
                        saveRules: Ft,
                        replaceAllRules: _t,
                        browseRules: dt,
                        clearRules: vt
                      }
                    });
                  };
                },
                initAnalytics: function() {
                  return function(t) {
                    return (function(t) {
                      var e = t.region || 'us',
                        n = c(m.WithinHeaders, t.appId, t.apiKey),
                        a = S(
                          r(
                            r({ hosts: [{ url: 'analytics.'.concat(e, '.algolia.com') }] }, t),
                            {},
                            {
                              headers: r(r(r({}, n.headers()), { 'content-type': 'application/json' }), t.headers),
                              queryParameters: r(r({}, n.queryParameters()), t.queryParameters)
                            }
                          )
                        );
                      return d({ appId: t.appId, transporter: a }, t.methods);
                    })(
                      r(
                        r(r({}, a), t),
                        {},
                        { methods: { addABTest: D, getABTest: A, getABTests: E, stopABTest: N, deleteABTest: R } }
                      )
                    );
                  };
                },
                initRecommendation: function() {
                  return function(t) {
                    return (function(t) {
                      var e = t.region || 'us',
                        n = c(m.WithinHeaders, t.appId, t.apiKey),
                        a = S(
                          r(
                            r({ hosts: [{ url: 'recommendation.'.concat(e, '.algolia.com') }] }, t),
                            {},
                            {
                              headers: r(r(r({}, n.headers()), { 'content-type': 'application/json' }), t.headers),
                              queryParameters: r(r({}, n.queryParameters()), t.queryParameters)
                            }
                          )
                        );
                      return d({ appId: t.appId, transporter: a }, t.methods);
                    })(
                      r(
                        r(r({}, a), t),
                        {},
                        { methods: { getPersonalizationStrategy: C, setPersonalizationStrategy: _ } }
                      )
                    );
                  };
                }
              }
            }
          )
        );
      }
      return (Yt.version = '4.6.0'), Yt;
    })();
  },
  function(t, e, r) {
    !(function(t) {
      var e = /\S/,
        r = /\"/g,
        n = /\n/g,
        a = /\r/g,
        i = /\\/g,
        o = /\u2028/,
        s = /\u2029/;
      function u(t) {
        '}' === t.n.substr(t.n.length - 1) && (t.n = t.n.substring(0, t.n.length - 1));
      }
      function c(t) {
        return t.trim ? t.trim() : t.replace(/^\s*|\s*$/g, '');
      }
      function l(t, e, r) {
        if (e.charAt(r) != t.charAt(0)) return !1;
        for (var n = 1, a = t.length; n < a; n++) if (e.charAt(r + n) != t.charAt(n)) return !1;
        return !0;
      }
      (t.tags = { '#': 1, '^': 2, '<': 3, $: 4, '/': 5, '!': 6, '>': 7, '=': 8, _v: 9, '{': 10, '&': 11, _t: 12 }),
        (t.scan = function(r, n) {
          var a = r.length,
            i = 0,
            o = null,
            s = null,
            f = '',
            h = [],
            d = !1,
            p = 0,
            m = 0,
            g = '{{',
            v = '}}';
          function y() {
            f.length > 0 && (h.push({ tag: '_t', text: new String(f) }), (f = ''));
          }
          function b(r, n) {
            if (
              (y(),
              r &&
                (function() {
                  for (var r = !0, n = m; n < h.length; n++)
                    if (!(r = t.tags[h[n].tag] < t.tags._v || ('_t' == h[n].tag && null === h[n].text.match(e))))
                      return !1;
                  return r;
                })())
            )
              for (var a, i = m; i < h.length; i++)
                h[i].text && ((a = h[i + 1]) && '>' == a.tag && (a.indent = h[i].text.toString()), h.splice(i, 1));
            else n || h.push({ tag: '\n' });
            (d = !1), (m = h.length);
          }
          function w(t, e) {
            var r = '=' + v,
              n = t.indexOf(r, e),
              a = c(t.substring(t.indexOf('=', e) + 1, n)).split(' ');
            return (g = a[0]), (v = a[a.length - 1]), n + r.length - 1;
          }
          for (n && ((n = n.split(' ')), (g = n[0]), (v = n[1])), p = 0; p < a; p++)
            0 == i
              ? l(g, r, p)
                ? (--p, y(), (i = 1))
                : '\n' == r.charAt(p)
                ? b(d)
                : (f += r.charAt(p))
              : 1 == i
              ? ((p += g.length - 1),
                '=' == (o = (s = t.tags[r.charAt(p + 1)]) ? r.charAt(p + 1) : '_v')
                  ? ((p = w(r, p)), (i = 0))
                  : (s && p++, (i = 2)),
                (d = p))
              : l(v, r, p)
              ? (h.push({ tag: o, n: c(f), otag: g, ctag: v, i: '/' == o ? d - g.length : p + v.length }),
                (f = ''),
                (p += v.length - 1),
                (i = 0),
                '{' == o && ('}}' == v ? p++ : u(h[h.length - 1])))
              : (f += r.charAt(p));
          return b(d, !0), h;
        });
      var f = { _t: !0, '\n': !0, $: !0, '/': !0 };
      function h(t, e) {
        for (var r = 0, n = e.length; r < n; r++) if (e[r].o == t.n) return (t.tag = '#'), !0;
      }
      function d(t, e, r) {
        for (var n = 0, a = r.length; n < a; n++) if (r[n].c == t && r[n].o == e) return !0;
      }
      function p(t) {
        var e = [];
        for (var r in t.partials)
          e.push('"' + g(r) + '":{name:"' + g(t.partials[r].name) + '", ' + p(t.partials[r]) + '}');
        return (
          'partials: {' +
          e.join(',') +
          '}, subs: ' +
          (function(t) {
            var e = [];
            for (var r in t) e.push('"' + g(r) + '": function(c,p,t,i) {' + t[r] + '}');
            return '{ ' + e.join(',') + ' }';
          })(t.subs)
        );
      }
      t.stringify = function(e, r, n) {
        return '{code: function (c,p,i) { ' + t.wrapMain(e.code) + ' },' + p(e) + '}';
      };
      var m = 0;
      function g(t) {
        return t
          .replace(i, '\\\\')
          .replace(r, '\\"')
          .replace(n, '\\n')
          .replace(a, '\\r')
          .replace(o, '\\u2028')
          .replace(s, '\\u2029');
      }
      function v(t) {
        return ~t.indexOf('.') ? 'd' : 'f';
      }
      function y(t, e) {
        var r = '<' + (e.prefix || '') + t.n + m++;
        return (
          (e.partials[r] = { name: t.n, partials: {} }),
          (e.code += 't.b(t.rp("' + g(r) + '",c,p,"' + (t.indent || '') + '"));'),
          r
        );
      }
      function b(t, e) {
        e.code += 't.b(t.t(t.' + v(t.n) + '("' + g(t.n) + '",c,p,0)));';
      }
      function w(t) {
        return 't.b(' + t + ');';
      }
      (t.generate = function(e, r, n) {
        m = 0;
        var a = { code: '', subs: {}, partials: {} };
        return t.walk(e, a), n.asString ? this.stringify(a, r, n) : this.makeTemplate(a, r, n);
      }),
        (t.wrapMain = function(t) {
          return 'var t=this;t.b(i=i||"");' + t + 'return t.fl();';
        }),
        (t.template = t.Template),
        (t.makeTemplate = function(t, e, r) {
          var n = this.makePartials(t);
          return (n.code = new Function('c', 'p', 'i', this.wrapMain(t.code))), new this.template(n, e, this, r);
        }),
        (t.makePartials = function(t) {
          var e,
            r = { subs: {}, partials: t.partials, name: t.name };
          for (e in r.partials) r.partials[e] = this.makePartials(r.partials[e]);
          for (e in t.subs) r.subs[e] = new Function('c', 'p', 't', 'i', t.subs[e]);
          return r;
        }),
        (t.codegen = {
          '#': function(e, r) {
            (r.code +=
              'if(t.s(t.' +
              v(e.n) +
              '("' +
              g(e.n) +
              '",c,p,1),c,p,0,' +
              e.i +
              ',' +
              e.end +
              ',"' +
              e.otag +
              ' ' +
              e.ctag +
              '")){t.rs(c,p,function(c,p,t){'),
              t.walk(e.nodes, r),
              (r.code += '});c.pop();}');
          },
          '^': function(e, r) {
            (r.code += 'if(!t.s(t.' + v(e.n) + '("' + g(e.n) + '",c,p,1),c,p,1,0,0,"")){'),
              t.walk(e.nodes, r),
              (r.code += '};');
          },
          '>': y,
          '<': function(e, r) {
            var n = { partials: {}, code: '', subs: {}, inPartial: !0 };
            t.walk(e.nodes, n);
            var a = r.partials[y(e, r)];
            (a.subs = n.subs), (a.partials = n.partials);
          },
          $: function(e, r) {
            var n = { subs: {}, code: '', partials: r.partials, prefix: e.n };
            t.walk(e.nodes, n), (r.subs[e.n] = n.code), r.inPartial || (r.code += 't.sub("' + g(e.n) + '",c,p,i);');
          },
          '\n': function(t, e) {
            e.code += w('"\\n"' + (t.last ? '' : ' + i'));
          },
          _v: function(t, e) {
            e.code += 't.b(t.v(t.' + v(t.n) + '("' + g(t.n) + '",c,p,0)));';
          },
          _t: function(t, e) {
            e.code += w('"' + g(t.text) + '"');
          },
          '{': b,
          '&': b
        }),
        (t.walk = function(e, r) {
          for (var n, a = 0, i = e.length; a < i; a++) (n = t.codegen[e[a].tag]) && n(e[a], r);
          return r;
        }),
        (t.parse = function(e, r, n) {
          return (function e(r, n, a, i) {
            var o,
              s = [],
              u = null,
              c = null;
            for (o = a[a.length - 1]; r.length > 0; ) {
              if (((c = r.shift()), o && '<' == o.tag && !(c.tag in f)))
                throw new Error('Illegal content in < super tag.');
              if (t.tags[c.tag] <= t.tags.$ || h(c, i)) a.push(c), (c.nodes = e(r, c.tag, a, i));
              else {
                if ('/' == c.tag) {
                  if (0 === a.length) throw new Error('Closing tag without opener: /' + c.n);
                  if (((u = a.pop()), c.n != u.n && !d(c.n, u.n, i)))
                    throw new Error('Nesting error: ' + u.n + ' vs. ' + c.n);
                  return (u.end = c.i), s;
                }
                '\n' == c.tag && (c.last = 0 == r.length || '\n' == r[0].tag);
              }
              s.push(c);
            }
            if (a.length > 0) throw new Error('missing closing tag: ' + a.pop().n);
            return s;
          })(e, 0, [], (n = n || {}).sectionTags || []);
        }),
        (t.cache = {}),
        (t.cacheKey = function(t, e) {
          return [t, !!e.asString, !!e.disableLambda, e.delimiters, !!e.modelGet].join('||');
        }),
        (t.compile = function(e, r) {
          r = r || {};
          var n = t.cacheKey(e, r),
            a = this.cache[n];
          if (a) {
            var i = a.partials;
            for (var o in i) delete i[o].instance;
            return a;
          }
          return (a = this.generate(this.parse(this.scan(e, r.delimiters), e, r), e, r)), (this.cache[n] = a);
        });
    })(e);
  },
  function(t, e, r) {
    !(function(t) {
      function e(t, e, r) {
        var n;
        return (
          e &&
            'object' == typeof e &&
            (void 0 !== e[t] ? (n = e[t]) : r && e.get && 'function' == typeof e.get && (n = e.get(t))),
          n
        );
      }
      (t.Template = function(t, e, r, n) {
        (t = t || {}),
          (this.r = t.code || this.r),
          (this.c = r),
          (this.options = n || {}),
          (this.text = e || ''),
          (this.partials = t.partials || {}),
          (this.subs = t.subs || {}),
          (this.buf = '');
      }),
        (t.Template.prototype = {
          r: function(t, e, r) {
            return '';
          },
          v: function(t) {
            return (
              (t = u(t)),
              s.test(t)
                ? t
                    .replace(r, '&amp;')
                    .replace(n, '&lt;')
                    .replace(a, '&gt;')
                    .replace(i, '&#39;')
                    .replace(o, '&quot;')
                : t
            );
          },
          t: u,
          render: function(t, e, r) {
            return this.ri([t], e || {}, r);
          },
          ri: function(t, e, r) {
            return this.r(t, e, r);
          },
          ep: function(t, e) {
            var r = this.partials[t],
              n = e[r.name];
            if (r.instance && r.base == n) return r.instance;
            if ('string' == typeof n) {
              if (!this.c) throw new Error('No compiler available.');
              n = this.c.compile(n, this.options);
            }
            if (!n) return null;
            if (((this.partials[t].base = n), r.subs)) {
              for (key in (e.stackText || (e.stackText = {}), r.subs))
                e.stackText[key] ||
                  (e.stackText[key] =
                    void 0 !== this.activeSub && e.stackText[this.activeSub] ? e.stackText[this.activeSub] : this.text);
              n = (function(t, e, r, n, a, i) {
                function o() {}
                function s() {}
                var u;
                (o.prototype = t), (s.prototype = t.subs);
                var c = new o();
                for (u in ((c.subs = new s()),
                (c.subsText = {}),
                (c.buf = ''),
                (n = n || {}),
                (c.stackSubs = n),
                (c.subsText = i),
                e))
                  n[u] || (n[u] = e[u]);
                for (u in n) c.subs[u] = n[u];
                for (u in ((a = a || {}), (c.stackPartials = a), r)) a[u] || (a[u] = r[u]);
                for (u in a) c.partials[u] = a[u];
                return c;
              })(n, r.subs, r.partials, this.stackSubs, this.stackPartials, e.stackText);
            }
            return (this.partials[t].instance = n), n;
          },
          rp: function(t, e, r, n) {
            var a = this.ep(t, r);
            return a ? a.ri(e, r, n) : '';
          },
          rs: function(t, e, r) {
            var n = t[t.length - 1];
            if (c(n)) for (var a = 0; a < n.length; a++) t.push(n[a]), r(t, e, this), t.pop();
            else r(t, e, this);
          },
          s: function(t, e, r, n, a, i, o) {
            var s;
            return (
              (!c(t) || 0 !== t.length) &&
              ('function' == typeof t && (t = this.ms(t, e, r, n, a, i, o)),
              (s = !!t),
              !n && s && e && e.push('object' == typeof t ? t : e[e.length - 1]),
              s)
            );
          },
          d: function(t, r, n, a) {
            var i,
              o = t.split('.'),
              s = this.f(o[0], r, n, a),
              u = this.options.modelGet,
              l = null;
            if ('.' === t && c(r[r.length - 2])) s = r[r.length - 1];
            else for (var f = 1; f < o.length; f++) void 0 !== (i = e(o[f], s, u)) ? ((l = s), (s = i)) : (s = '');
            return !(a && !s) && (a || 'function' != typeof s || (r.push(l), (s = this.mv(s, r, n)), r.pop()), s);
          },
          f: function(t, r, n, a) {
            for (var i = !1, o = !1, s = this.options.modelGet, u = r.length - 1; u >= 0; u--)
              if (void 0 !== (i = e(t, r[u], s))) {
                o = !0;
                break;
              }
            return o ? (a || 'function' != typeof i || (i = this.mv(i, r, n)), i) : !a && '';
          },
          ls: function(t, e, r, n, a) {
            var i = this.options.delimiters;
            return (
              (this.options.delimiters = a), this.b(this.ct(u(t.call(e, n)), e, r)), (this.options.delimiters = i), !1
            );
          },
          ct: function(t, e, r) {
            if (this.options.disableLambda) throw new Error('Lambda features disabled.');
            return this.c.compile(t, this.options).render(e, r);
          },
          b: function(t) {
            this.buf += t;
          },
          fl: function() {
            var t = this.buf;
            return (this.buf = ''), t;
          },
          ms: function(t, e, r, n, a, i, o) {
            var s,
              u = e[e.length - 1],
              c = t.call(u);
            return 'function' == typeof c
              ? !!n ||
                  ((s =
                    this.activeSub && this.subsText && this.subsText[this.activeSub]
                      ? this.subsText[this.activeSub]
                      : this.text),
                  this.ls(c, u, r, s.substring(a, i), o))
              : c;
          },
          mv: function(t, e, r) {
            var n = e[e.length - 1],
              a = t.call(n);
            return 'function' == typeof a ? this.ct(u(a.call(n)), n, r) : a;
          },
          sub: function(t, e, r, n) {
            var a = this.subs[t];
            a && ((this.activeSub = t), a(e, r, this, n), (this.activeSub = !1));
          }
        });
      var r = /&/g,
        n = /</g,
        a = />/g,
        i = /\'/g,
        o = /\"/g,
        s = /[&<>\"\']/;
      function u(t) {
        return String(null == t ? '' : t);
      }
      var c =
        Array.isArray ||
        function(t) {
          return '[object Array]' === Object.prototype.toString.call(t);
        };
    })(e);
  },
  ,
  function(t, e, r) {
    'use strict';
    r.r(e);
    var n,
      a = r(1),
      i = r.n(a),
      o = r(0),
      s = r.n(o);
    n = '4000' == location.port ? location.protocol + '//' + location.hostname + ':4001' : '/docu-microfrontend';
    var u = new (function t() {
        i()(this, t),
          s()(this, 'addNavHrefs', !0),
          s()(this, 'nodes', {
            defaultChildNode: 'docs',
            children: [
              { label: 'About Luigi', externalLink: { url: 'https://luigi-project.io/about', sameWindow: !0 } },
              {
                pathSegment: 'docs',
                label: 'Documentation',
                children: fetch('/navigation-generated.json', {
                  headers: { 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload' }
                })
                  .then(function(t) {
                    return t.json();
                  })
                  .then(function(t) {
                    return t.map(function(t) {
                      return (t.viewUrl = t.viewUrl.replace('__BASE_URL__', n)), t;
                    });
                  })
                  .catch(function(t) {
                    console.error('Error: '.concat(t));
                  }),
                context: { coreBaseUrl: window.location.origin }
              },
              { label: 'Blog', externalLink: { url: 'https://luigi-project.io/blog', sameWindow: !0 } },
              { label: 'Twitter', externalLink: { url: 'https://twitter.com/luigiprojectio' }, icon: 'twitter' },
              { label: 'Slack', externalLink: { url: 'https://slack.luigi-project.io' }, icon: 'slack' },
              { label: 'Github', externalLink: { url: 'https://github.com/SAP/luigi' }, icon: 'github' }
            ]
          }),
          s()(this, 'getProductSwitcherItems', function() {
            return [
              {
                icon: 'https://pbs.twimg.com/profile_images/1143452953858183170/QLk-HGmK_bigger.png',
                label: 'hybris',
                externalLink: { url: 'https://www.hybris.com', sameWindow: !1 }
              }
            ];
          }),
          s()(this, 'getProfileItems', function() {
            return [
              { label: 'Luigi in Github', externalLink: { url: 'https://github.com/SAP/luigi', sameWindow: !1 } }
            ];
          });
      })(),
      c = new (function t() {
        i()(this, t),
          s()(this, 'useHashRouting', !1),
          s()(this, 'nodeParamPrefix', !1),
          s()(this, 'skipRoutingForUrlPatterns', [/access_token=/, /id_token=/]);
      })(),
      l = new (function t() {
        i()(this, t),
          s()(this, 'header', {
            title: 'Documentation - Luigi - The Enterprise-Ready Micro Frontend Framework',
            logo: '/logo.svg',
            favicon: '/favicon.png'
          }),
          s()(this, 'responsiveNavigation', 'simpleMobileOnly'),
          s()(this, 'sideNavFooterText', ' '),
          s()(this, 'customSandboxRules', ['allow-presentation']);
      })(),
      f = r(2),
      h = r.n(f),
      d = r(3),
      p = r.n(d);
    function m() {}
    function g(t) {
      return t();
    }
    function v(t) {
      t.forEach(g);
    }
    function y(t) {
      return 'function' == typeof t;
    }
    function b(t) {
      return 0 === Object.keys(t).length;
    }
    new Set();
    new Map();
    Promise.resolve();
    new Set();
    new Set();
    'undefined' != typeof window ? window : 'undefined' != typeof globalThis ? globalThis : global;
    new Set([
      'allowfullscreen',
      'allowpaymentrequest',
      'async',
      'autofocus',
      'autoplay',
      'checked',
      'controls',
      'default',
      'defer',
      'disabled',
      'formnovalidate',
      'hidden',
      'ismap',
      'loop',
      'multiple',
      'muted',
      'nomodule',
      'novalidate',
      'open',
      'playsinline',
      'readonly',
      'required',
      'reversed',
      'selected'
    ]);
    let w;
    function x(t, e) {
      const r = t.$$;
      null !== r.fragment &&
        (v(r.on_destroy), r.fragment && r.fragment.d(e), (r.on_destroy = r.fragment = null), (r.ctx = []));
    }
    'function' == typeof HTMLElement &&
      (w = class extends HTMLElement {
        constructor() {
          super(), this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
          const { on_mount: t } = this.$$;
          this.$$.on_disconnect = t.map(g).filter(y);
          for (const t in this.$$.slotted) this.appendChild(this.$$.slotted[t]);
        }
        attributeChangedCallback(t, e, r) {
          this[t] = r;
        }
        disconnectedCallback() {
          v(this.$$.on_disconnect);
        }
        $destroy() {
          x(this, 1), (this.$destroy = m);
        }
        $on(t, e) {
          const r = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
          return (
            r.push(e),
            () => {
              const t = r.indexOf(e);
              -1 !== t && r.splice(t, 1);
            }
          );
        }
        $set(t) {
          this.$$set && !b(t) && ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
        }
      });
    var k = !1,
      P = [],
      S = 0,
      O = '';
    function j(t) {
      13 != t.keyCode || 0 === S
        ? (40 !== t.keyCode && 38 !== t.keyCode) ||
          (40 === t.keyCode ? S++ : S--,
          -1 === S && (S = P.length),
          (S %= P.length + 1),
          (function() {
            if (
              (P.forEach(function(t) {
                return t.classList.remove('ds-cursor');
              }),
              0 === S)
            )
              return;
            P[S - 1].classList.add('ds-cursor');
          })())
        : P[S - 1].click();
    }
    var I = (function() {
        function t(e, r) {
          i()(this, t), (this.query = e), (this.results = r), this.addKeyEvent();
        }
        return (
          h()(t, [
            {
              key: 'addKeyEvent',
              value: function() {
                k || (document.querySelector('input.luigi-search__input').addEventListener('keyup', j), (k = !0));
              }
            },
            {
              key: 'buildDomResults',
              value: function() {
                (P = []), this.query !== O && ((S = 0), (O = this.query)), this.cleanResults();
                var t = this.buildContainer(),
                  e = t.resultSpan,
                  r = t.container;
                return 0 === this.results.length ? this.domEmpty(e) : this.domResults(e), r;
              }
            },
            {
              key: 'cleanResults',
              value: function() {
                var t = document.querySelector('span.algolia-autocomplete');
                t && t.remove();
              }
            },
            {
              key: 'domResults',
              value: function(t) {
                var e = p.a.compile(
                    '\n       <div class="ds-suggestion" role="option" id="option-27550019" aria-selected="true">\n        <a class="algolia-docsearch-suggestion algolia-docsearch-suggestion__main algolia-docsearch-suggestion__secondary" style="white-space: normal;">\n          <div class="algolia-docsearch-suggestion--category-header">\n              <span class="algolia-docsearch-suggestion--category-header-lvl0">\n               {{{title1}}}\n              </span>\n          </div>\n          <div class="algolia-docsearch-suggestion--wrapper">\n            <div class="algolia-docsearch-suggestion--subcategory-column">\n              <span class="algolia-docsearch-suggestion--subcategory-column-text">{{{title2}}}</span>\n            </div>\n            <div class="algolia-docsearch-suggestion--content">\n              <div class=\'algolia-docsearch-suggestion--subcategory-inline\'>{{{title2}}}</div>\n              <div class="algolia-docsearch-suggestion--title">{{{title3}}}</div>\n              <div class="algolia-docsearch-suggestion--text">{{{description}}}</div>\n            </div>\n          </div>\n        </a>\n    </div>\n        '
                  ),
                  r = !0,
                  n = !1,
                  a = void 0;
                try {
                  for (var i, o = this.results[Symbol.iterator](); !(r = (i = o.next()).done); r = !0) {
                    var s = i.value,
                      u = this.dataTemplate(s),
                      c = this.renderResult(e, u),
                      l = this.htmlToElement(c);
                    this.attachItemEvents(l, s), P.push(l), t.appendChild(l);
                  }
                } catch (t) {
                  (n = !0), (a = t);
                } finally {
                  try {
                    r || null == o.return || o.return();
                  } finally {
                    if (n) throw a;
                  }
                }
              }
            },
            {
              key: 'domEmpty',
              value: function(t) {
                var e = p.a.compile(
                    '\n  <div class="algolia-docsearch">\n    <div class="algolia-docsearch--wrapper">\n        <div class="algolia-docsearch--content algolia-docsearch--no-results">\n            <div class="algolia-docsearch--title">\n                <div class="algolia-docsearch--text">\n                    No results found for query <b>"{{query}}"</b>\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n  '
                  ),
                  r = { query: this.query },
                  n = e.render(r),
                  a = this.htmlToElement(n);
                t.appendChild(a);
              }
            },
            {
              key: 'shortText',
              value: function(t) {
                var e = t;
                if (e.length > 80) {
                  var r = e.substring(80).indexOf(' ') + 80;
                  e = e.substring(0, r) + '..';
                }
                return this.highlightKeyword(e);
              }
            },
            {
              key: 'dataTemplate',
              value: function(t) {
                return {
                  label: this.shortText(t.label),
                  description: this.shortText(t.description),
                  title1: this.shortText(t.title1),
                  title2: this.shortText(t.title2),
                  title3: this.shortText(t.title3)
                };
              }
            },
            {
              key: 'renderResult',
              value: function(t, e) {
                return t.render(e);
              }
            },
            {
              key: 'highlightKeyword',
              value: function(t) {
                return (
                  this.perm(this.query).forEach(function(e) {
                    var r = '<span class="algolia-docsearch-suggestion--highlight">' + e + '</span>';
                    t = t.replaceAll(e, r);
                  }),
                  t
                );
              }
            },
            {
              key: 'attachItemEvents',
              value: function(t, e) {
                t.addEventListener('click', function(t) {
                  t.preventDefault(),
                    Luigi.navigation()
                      .withParams(e.pathObject.params)
                      .navigate(e.pathObject.link),
                    Luigi.globalSearch().closeSearchResult(),
                    Luigi.globalSearch().clearSearchField();
                }),
                  t.addEventListener('mouseover', function(e) {
                    e.preventDefault(), t.set, t.classList.add('ds-cursor');
                  }),
                  t.addEventListener('mouseout', function(e) {
                    e.preventDefault(), t.classList.remove('ds-cursor');
                  });
              }
            },
            {
              key: 'buildContainer',
              value: function() {
                var t = this.createAttribute('span', {
                    class: 'algolia-autocomplete algolia-autocomplete-right',
                    style: 'position: relative; display: inline-block; direction: ltr;'
                  }),
                  e = this.createAttribute('span', {
                    class: 'ds-dropdown-menu ds-with-1',
                    role: 'listbox',
                    id: 'algolia-autocomplete-listbox-0',
                    style: 'position: absolute; top: 100%; z-index: 100; left: 0px; right: auto; display: block;'
                  }),
                  r = this.createAttribute('div', { class: 'ds-dataset-1' }),
                  n = this.createAttribute('span', { class: 'ds-suggestions', style: 'display: block;' }),
                  a = this.htmlToElement(
                    '<div class="algolia-docsearch-footer">Search by <a class="algolia-docsearch-footer--logo" href="https://www.algolia.com/docsearch">Algolia</a></div>'
                  );
                return (
                  t.appendChild(e),
                  e.appendChild(r),
                  r.appendChild(n),
                  r.appendChild(a),
                  { container: t, resultSpan: n }
                );
              }
            },
            {
              key: 'createAttribute',
              value: function(t, e) {
                var r = document.createElement(t);
                return e
                  ? (Object.keys(e).forEach(function(t) {
                      return r.setAttribute(t, e[t]);
                    }),
                    r)
                  : r;
              }
            },
            {
              key: 'htmlToElement',
              value: function(t) {
                return new DOMParser().parseFromString(t, 'text/html').body.firstChild;
              }
            },
            {
              key: 'perm',
              value: function(t) {
                for (var e = [], r = t.split(''), n = Math.pow(r.length, 2), a = 0; a < n; a++) {
                  for (var i = 0, o = a; i < r.length; i++, o >>= 1)
                    r[i] = 1 & o ? r[i].toUpperCase() : r[i].toLowerCase();
                  var s = r.join('');
                  e.push(s);
                }
                return e;
              }
            },
            {
              key: 'createAttribute',
              value: function(t, e) {
                var r = document.createElement(t);
                return e
                  ? (Object.keys(e).forEach(function(t) {
                      return r.setAttribute(t, e[t]);
                    }),
                    r)
                  : r;
              }
            }
          ]),
          t
        );
      })(),
      T = r(4),
      q = r.n(T),
      D = new ((function() {
        function t() {
          i()(this, t),
            (this.client = q()('BH4D9OD16A', '5ab04e0673d89f07c964afcf1522ad3a')),
            (this.index = this.client.initIndex('luigi-project')),
            (this.searchResult = 8),
            (this.isDevelop = 4e3 === parseInt(window.location.port)),
            (this.coreBaseUrl = window.location.origin);
        }
        return (
          h()(t, [
            {
              key: 'executeSearch',
              value: function(t) {
                var e = this;
                this.index
                  .search(t, { hitsPerPage: this.searchResult })
                  .then(function(r) {
                    var n = r.hits;
                    (n = n.map(e.transformUrls.bind(e)).map(e.transformContent)),
                      Luigi.globalSearch().showSearchResult([t].concat(n));
                  })
                  .catch(function(t) {
                    console.log('Error in executing the query ' + t);
                  });
              }
            },
            {
              key: 'transformUrls',
              value: function(t) {
                return (
                  (t.url = t.url.replace('https://docs.luigi-project.io', '')),
                  (t.url = t.url.replace('/docu-microfrontend', '')),
                  t
                );
              }
            },
            {
              key: 'transformContent',
              value: function(t) {
                var e = t.url,
                  r = {};
                -1 != e.indexOf('#') &&
                  ((r = { section: e.substring(e.indexOf('#') + 1) }), (e = e.substring(0, e.indexOf('#'))));
                var n = t.hierarchy.lvl0,
                  a = t.hierarchy.lvl1 || t.hierarchy.lvl0,
                  i = t.hierarchy.lvl2 || t.hierarchy.lvl0;
                return {
                  pathObject: { link: e, params: r },
                  label: t.hierarchy.lvl0,
                  description: t.content,
                  title1: n,
                  title2: a,
                  title3: i,
                  hit: t
                };
              }
            }
          ]),
          t
        );
      })())(),
      R = new (function t() {
        var e = this;
        i()(this, t),
          s()(this, 'searchProvider', {
            onInput: function() {
              var t = Luigi.globalSearch().getSearchString();
              t.length < e.minSearchLength ? Luigi.globalSearch().closeSearchResult() : D.executeSearch(t);
            },
            onEscape: function() {
              Luigi.globalSearch().closeSearchResult(), Luigi.globalSearch().clearSearchField();
            },
            customSearchResultRenderer: function(t, e, r) {
              var n = t.shift(),
                a = new I(n, t).buildDomResults();
              e.appendChild(a);
            },
            disableInputHandlers: { type: !1 }
          }),
          (this.minSearchLength = 3);
      })(),
      A = new (function t() {
        i()(this, t),
          s()(this, 'customMessagesListeners', {
            'search.tag.keyword': function(t, e, r) {
              Luigi.globalSearch().openSearchField(), Luigi.globalSearch().setSearchString(t.keyword);
            }
          });
      })();
    Luigi.setConfig({ navigation: u, routing: c, settings: l, globalSearch: R, communication: A });
  }
]);
