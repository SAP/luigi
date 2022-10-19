!(function(e) {
  var t = {};
  function n(i) {
    if (t[i]) return t[i].exports;
    var r = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
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
        for (var r in e)
          n.d(
            i,
            r,
            function(t) {
              return e[t];
            }.bind(null, r)
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
    n((n.s = 141));
})([
  function(e, t, n) {
    var i = n(2),
      r = n(16).f,
      o = n(13),
      a = n(14),
      s = n(81),
      l = n(104),
      c = n(54);
    e.exports = function(e, t) {
      var n,
        d,
        u,
        f,
        p,
        h = e.target,
        g = e.global,
        m = e.stat;
      if ((n = g ? i : m ? i[h] || s(h, {}) : (i[h] || {}).prototype))
        for (d in t) {
          if (
            ((f = t[d]),
            (u = e.noTargetGet ? (p = r(n, d)) && p.value : n[d]),
            !c(g ? d : h + (m ? '.' : '#') + d, e.forced) && void 0 !== u)
          ) {
            if (typeof f == typeof u) continue;
            l(f, u);
          }
          (e.sham || (u && u.sham)) && o(f, 'sham', !0), a(n, d, f, e);
        }
    };
  },
  function(e, t) {
    e.exports = function(e) {
      try {
        return !!e();
      } catch (e) {
        return !0;
      }
    };
  },
  function(e, t, n) {
    (function(t) {
      var n = function(e) {
        return e && e.Math == Math && e;
      };
      e.exports =
        n('object' == typeof globalThis && globalThis) ||
        n('object' == typeof window && window) ||
        n('object' == typeof self && self) ||
        n('object' == typeof t && t) ||
        Function('return this')();
    }.call(this, n(166)));
  },
  function(e, t) {
    e.exports = function(e) {
      return 'object' == typeof e ? null !== e : 'function' == typeof e;
    };
  },
  function(e, t, n) {
    var i = n(3);
    e.exports = function(e) {
      if (!i(e)) throw TypeError(String(e) + ' is not an object');
      return e;
    };
  },
  function(e, t, n) {
    'use strict';
    var i,
      r = n(6),
      o = n(2),
      a = n(3),
      s = n(11),
      l = n(60),
      c = n(13),
      d = n(14),
      u = n(9).f,
      f = n(27),
      p = n(45),
      h = n(7),
      g = n(51),
      m = o.DataView,
      v = m && m.prototype,
      b = o.Int8Array,
      w = b && b.prototype,
      S = o.Uint8ClampedArray,
      y = S && S.prototype,
      _ = b && f(b),
      C = w && f(w),
      x = Object.prototype,
      I = x.isPrototypeOf,
      T = h('toStringTag'),
      N = g('TYPED_ARRAY_TAG'),
      k = !(!o.ArrayBuffer || !m),
      $ = k && !!p && 'Opera' !== l(o.opera),
      P = !1,
      E = {
        Int8Array: 1,
        Uint8Array: 1,
        Uint8ClampedArray: 1,
        Int16Array: 2,
        Uint16Array: 2,
        Int32Array: 4,
        Uint32Array: 4,
        Float32Array: 4,
        Float64Array: 8
      },
      L = function(e) {
        return a(e) && s(E, l(e));
      };
    for (i in E) o[i] || ($ = !1);
    if (
      (!$ || 'function' != typeof _ || _ === Function.prototype) &&
      ((_ = function() {
        throw TypeError('Incorrect invocation');
      }),
      $)
    )
      for (i in E) o[i] && p(o[i], _);
    if ((!$ || !C || C === x) && ((C = _.prototype), $)) for (i in E) o[i] && p(o[i].prototype, C);
    if (($ && f(y) !== C && p(y, C), r && !s(C, T)))
      for (i in ((P = !0),
      u(C, T, {
        get: function() {
          return a(this) ? this[N] : void 0;
        }
      }),
      E))
        o[i] && c(o[i], N, i);
    k && p && f(v) !== x && p(v, x),
      (e.exports = {
        NATIVE_ARRAY_BUFFER: k,
        NATIVE_ARRAY_BUFFER_VIEWS: $,
        TYPED_ARRAY_TAG: P && N,
        aTypedArray: function(e) {
          if (L(e)) return e;
          throw TypeError('Target is not a typed array');
        },
        aTypedArrayConstructor: function(e) {
          if (p) {
            if (I.call(_, e)) return e;
          } else
            for (var t in E)
              if (s(E, i)) {
                var n = o[t];
                if (n && (e === n || I.call(n, e))) return e;
              }
          throw TypeError('Target is not a typed array constructor');
        },
        exportProto: function(e, t, n) {
          if (r) {
            if (n)
              for (var i in E) {
                var a = o[i];
                a && s(a.prototype, e) && delete a.prototype[e];
              }
            (C[e] && !n) || d(C, e, n ? t : ($ && w[e]) || t);
          }
        },
        exportStatic: function(e, t, n) {
          var i, a;
          if (r) {
            if (p) {
              if (n) for (i in E) (a = o[i]) && s(a, e) && delete a[e];
              if (_[e] && !n) return;
              try {
                return d(_, e, n ? t : ($ && b[e]) || t);
              } catch (e) {}
            }
            for (i in E) !(a = o[i]) || (a[e] && !n) || d(a, e, t);
          }
        },
        isView: function(e) {
          var t = l(e);
          return 'DataView' === t || s(E, t);
        },
        isTypedArray: L,
        TypedArray: _,
        TypedArrayPrototype: C
      });
  },
  function(e, t, n) {
    var i = n(1);
    e.exports = !i(function() {
      return (
        7 !=
        Object.defineProperty({}, 'a', {
          get: function() {
            return 7;
          }
        }).a
      );
    });
  },
  function(e, t, n) {
    var i = n(2),
      r = n(50),
      o = n(51),
      a = n(106),
      s = i.Symbol,
      l = r('wks');
    e.exports = function(e) {
      return l[e] || (l[e] = (a && s[e]) || (a ? s : o)('Symbol.' + e));
    };
  },
  function(e, t, n) {
    var i = n(23),
      r = Math.min;
    e.exports = function(e) {
      return e > 0 ? r(i(e), 9007199254740991) : 0;
    };
  },
  function(e, t, n) {
    var i = n(6),
      r = n(101),
      o = n(4),
      a = n(25),
      s = Object.defineProperty;
    t.f = i
      ? s
      : function(e, t, n) {
          if ((o(e), (t = a(t, !0)), o(n), r))
            try {
              return s(e, t, n);
            } catch (e) {}
          if ('get' in n || 'set' in n) throw TypeError('Accessors not supported');
          return 'value' in n && (e[t] = n.value), e;
        };
  },
  function(e, t, n) {
    var i = n(15);
    e.exports = function(e) {
      return Object(i(e));
    };
  },
  function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
      return n.call(e, t);
    };
  },
  function(e, t, n) {
    var i = n(35),
      r = n(49),
      o = n(10),
      a = n(8),
      s = n(56),
      l = [].push,
      c = function(e) {
        var t = 1 == e,
          n = 2 == e,
          c = 3 == e,
          d = 4 == e,
          u = 6 == e,
          f = 5 == e || u;
        return function(p, h, g, m) {
          for (
            var v,
              b,
              w = o(p),
              S = r(w),
              y = i(h, g, 3),
              _ = a(S.length),
              C = 0,
              x = m || s,
              I = t ? x(p, _) : n ? x(p, 0) : void 0;
            _ > C;
            C++
          )
            if ((f || C in S) && ((b = y((v = S[C]), C, w)), e))
              if (t) I[C] = b;
              else if (b)
                switch (e) {
                  case 3:
                    return !0;
                  case 5:
                    return v;
                  case 6:
                    return C;
                  case 2:
                    l.call(I, v);
                }
              else if (d) return !1;
          return u ? -1 : c || d ? d : I;
        };
      };
    e.exports = { forEach: c(0), map: c(1), filter: c(2), some: c(3), every: c(4), find: c(5), findIndex: c(6) };
  },
  function(e, t, n) {
    var i = n(6),
      r = n(9),
      o = n(38);
    e.exports = i
      ? function(e, t, n) {
          return r.f(e, t, o(1, n));
        }
      : function(e, t, n) {
          return (e[t] = n), e;
        };
  },
  function(e, t, n) {
    var i = n(2),
      r = n(50),
      o = n(13),
      a = n(11),
      s = n(81),
      l = n(102),
      c = n(20),
      d = c.get,
      u = c.enforce,
      f = String(l).split('toString');
    r('inspectSource', function(e) {
      return l.call(e);
    }),
      (e.exports = function(e, t, n, r) {
        var l = !!r && !!r.unsafe,
          c = !!r && !!r.enumerable,
          d = !!r && !!r.noTargetGet;
        'function' == typeof n &&
          ('string' != typeof t || a(n, 'name') || o(n, 'name', t),
          (u(n).source = f.join('string' == typeof t ? t : ''))),
          e !== i ? (l ? !d && e[t] && (c = !0) : delete e[t], c ? (e[t] = n) : o(e, t, n)) : c ? (e[t] = n) : s(t, n);
      })(Function.prototype, 'toString', function() {
        return ('function' == typeof this && d(this).source) || l.call(this);
      });
  },
  function(e, t) {
    e.exports = function(e) {
      if (null == e) throw TypeError("Can't call method on " + e);
      return e;
    };
  },
  function(e, t, n) {
    var i = n(6),
      r = n(64),
      o = n(38),
      a = n(19),
      s = n(25),
      l = n(11),
      c = n(101),
      d = Object.getOwnPropertyDescriptor;
    t.f = i
      ? d
      : function(e, t) {
          if (((e = a(e)), (t = s(t, !0)), c))
            try {
              return d(e, t);
            } catch (e) {}
          if (l(e, t)) return o(!r.f.call(e, t), e[t]);
        };
  },
  function(e, t, n) {
    var i = n(43),
      r = n(11),
      o = n(109),
      a = n(9).f;
    e.exports = function(e) {
      var t = i.Symbol || (i.Symbol = {});
      r(t, e) || a(t, e, { value: o.f(e) });
    };
  },
  function(e, t) {
    e.exports = function(e) {
      if ('function' != typeof e) throw TypeError(String(e) + ' is not a function');
      return e;
    };
  },
  function(e, t, n) {
    var i = n(49),
      r = n(15);
    e.exports = function(e) {
      return i(r(e));
    };
  },
  function(e, t, n) {
    var i,
      r,
      o,
      a = n(103),
      s = n(2),
      l = n(3),
      c = n(13),
      d = n(11),
      u = n(65),
      f = n(52),
      p = s.WeakMap;
    if (a) {
      var h = new p(),
        g = h.get,
        m = h.has,
        v = h.set;
      (i = function(e, t) {
        return v.call(h, e, t), t;
      }),
        (r = function(e) {
          return g.call(h, e) || {};
        }),
        (o = function(e) {
          return m.call(h, e);
        });
    } else {
      var b = u('state');
      (f[b] = !0),
        (i = function(e, t) {
          return c(e, b, t), t;
        }),
        (r = function(e) {
          return d(e, b) ? e[b] : {};
        }),
        (o = function(e) {
          return d(e, b);
        });
    }
    e.exports = {
      set: i,
      get: r,
      has: o,
      enforce: function(e) {
        return o(e) ? r(e) : i(e, {});
      },
      getterFor: function(e) {
        return function(t) {
          var n;
          if (!l(t) || (n = r(t)).type !== e) throw TypeError('Incompatible receiver, ' + e + ' required');
          return n;
        };
      }
    };
  },
  function(e, t, n) {
    var i = n(15),
      r = /"/g;
    e.exports = function(e, t, n, o) {
      var a = String(i(e)),
        s = '<' + t;
      return '' !== n && (s += ' ' + n + '="' + String(o).replace(r, '&quot;') + '"'), s + '>' + a + '</' + t + '>';
    };
  },
  function(e, t, n) {
    var i = n(1);
    e.exports = function(e) {
      return i(function() {
        var t = ''[e]('"');
        return t !== t.toLowerCase() || t.split('"').length > 3;
      });
    };
  },
  function(e, t) {
    var n = Math.ceil,
      i = Math.floor;
    e.exports = function(e) {
      return isNaN((e = +e)) ? 0 : (e > 0 ? i : n)(e);
    };
  },
  function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
      return n.call(e).slice(8, -1);
    };
  },
  function(e, t, n) {
    var i = n(3);
    e.exports = function(e, t) {
      if (!i(e)) return e;
      var n, r;
      if (t && 'function' == typeof (n = e.toString) && !i((r = n.call(e)))) return r;
      if ('function' == typeof (n = e.valueOf) && !i((r = n.call(e)))) return r;
      if (!t && 'function' == typeof (n = e.toString) && !i((r = n.call(e)))) return r;
      throw TypeError("Can't convert object to primitive value");
    };
  },
  function(e, t, n) {
    var i = n(9).f,
      r = n(11),
      o = n(7)('toStringTag');
    e.exports = function(e, t, n) {
      e && !r((e = n ? e : e.prototype), o) && i(e, o, { configurable: !0, value: t });
    };
  },
  function(e, t, n) {
    var i = n(11),
      r = n(10),
      o = n(65),
      a = n(87),
      s = o('IE_PROTO'),
      l = Object.prototype;
    e.exports = a
      ? Object.getPrototypeOf
      : function(e) {
          return (
            (e = r(e)),
            i(e, s)
              ? e[s]
              : 'function' == typeof e.constructor && e instanceof e.constructor
              ? e.constructor.prototype
              : e instanceof Object
              ? l
              : null
          );
        };
  },
  function(e, t) {
    e.exports = !1;
  },
  function(e, t, n) {
    'use strict';
    var i = n(1);
    e.exports = function(e, t) {
      var n = [][e];
      return (
        !n ||
        !i(function() {
          n.call(
            null,
            t ||
              function() {
                throw 1;
              },
            1
          );
        })
      );
    };
  },
  function(e, t, n) {
    var i = n(4),
      r = n(18),
      o = n(7)('species');
    e.exports = function(e, t) {
      var n,
        a = i(e).constructor;
      return void 0 === a || null == (n = i(a)[o]) ? t : r(n);
    };
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(2),
      o = n(6),
      a = n(100),
      s = n(5),
      l = n(79),
      c = n(37),
      d = n(38),
      u = n(13),
      f = n(8),
      p = n(135),
      h = n(136),
      g = n(25),
      m = n(11),
      v = n(60),
      b = n(3),
      w = n(34),
      S = n(45),
      y = n(39).f,
      _ = n(137),
      C = n(12).forEach,
      x = n(46),
      I = n(9),
      T = n(16),
      N = n(20),
      k = N.get,
      $ = N.set,
      P = I.f,
      E = T.f,
      L = Math.round,
      R = r.RangeError,
      A = l.ArrayBuffer,
      D = l.DataView,
      O = s.NATIVE_ARRAY_BUFFER_VIEWS,
      V = s.TYPED_ARRAY_TAG,
      M = s.TypedArray,
      F = s.TypedArrayPrototype,
      j = s.aTypedArrayConstructor,
      U = s.isTypedArray,
      B = function(e, t) {
        for (var n = 0, i = t.length, r = new (j(e))(i); i > n; ) r[n] = t[n++];
        return r;
      },
      z = function(e, t) {
        P(e, t, {
          get: function() {
            return k(this)[t];
          }
        });
      },
      W = function(e) {
        var t;
        return e instanceof A || 'ArrayBuffer' == (t = v(e)) || 'SharedArrayBuffer' == t;
      },
      G = function(e, t) {
        return U(e) && 'symbol' != typeof t && t in e && String(+t) == String(t);
      },
      H = function(e, t) {
        return G(e, (t = g(t, !0))) ? d(2, e[t]) : E(e, t);
      },
      q = function(e, t, n) {
        return !(G(e, (t = g(t, !0))) && b(n) && m(n, 'value')) ||
          m(n, 'get') ||
          m(n, 'set') ||
          n.configurable ||
          (m(n, 'writable') && !n.writable) ||
          (m(n, 'enumerable') && !n.enumerable)
          ? P(e, t, n)
          : ((e[t] = n.value), e);
      };
    o
      ? (O || ((T.f = H), (I.f = q), z(F, 'buffer'), z(F, 'byteOffset'), z(F, 'byteLength'), z(F, 'length')),
        i({ target: 'Object', stat: !0, forced: !O }, { getOwnPropertyDescriptor: H, defineProperty: q }),
        (e.exports = function(e, t, n, o) {
          var s = e + (o ? 'Clamped' : '') + 'Array',
            l = 'get' + e,
            d = 'set' + e,
            g = r[s],
            m = g,
            v = m && m.prototype,
            I = {},
            T = function(e, n) {
              P(e, n, {
                get: function() {
                  return (function(e, n) {
                    var i = k(e);
                    return i.view[l](n * t + i.byteOffset, !0);
                  })(this, n);
                },
                set: function(e) {
                  return (function(e, n, i) {
                    var r = k(e);
                    o && (i = (i = L(i)) < 0 ? 0 : i > 255 ? 255 : 255 & i), r.view[d](n * t + r.byteOffset, i, !0);
                  })(this, n, e);
                },
                enumerable: !0
              });
            };
          O
            ? a &&
              ((m = n(function(e, n, i, r) {
                return (
                  c(e, m, s),
                  b(n)
                    ? W(n)
                      ? void 0 !== r
                        ? new g(n, h(i, t), r)
                        : void 0 !== i
                        ? new g(n, h(i, t))
                        : new g(n)
                      : U(n)
                      ? B(m, n)
                      : _.call(m, n)
                    : new g(p(n))
                );
              })),
              S && S(m, M),
              C(y(g), function(e) {
                e in m || u(m, e, g[e]);
              }),
              (m.prototype = v))
            : ((m = n(function(e, n, i, r) {
                c(e, m, s);
                var o,
                  a,
                  l,
                  d = 0,
                  u = 0;
                if (b(n)) {
                  if (!W(n)) return U(n) ? B(m, n) : _.call(m, n);
                  (o = n), (u = h(i, t));
                  var g = n.byteLength;
                  if (void 0 === r) {
                    if (g % t) throw R('Wrong length');
                    if ((a = g - u) < 0) throw R('Wrong length');
                  } else if ((a = f(r) * t) + u > g) throw R('Wrong length');
                  l = a / t;
                } else (l = p(n)), (o = new A((a = l * t)));
                for ($(e, { buffer: o, byteOffset: u, byteLength: a, length: l, view: new D(o) }); d < l; ) T(e, d++);
              })),
              S && S(m, M),
              (v = m.prototype = w(F))),
            v.constructor !== m && u(v, 'constructor', m),
            V && u(v, V, s),
            (I[s] = m),
            i({ global: !0, forced: m != g, sham: !O }, I),
            'BYTES_PER_ELEMENT' in m || u(m, 'BYTES_PER_ELEMENT', t),
            'BYTES_PER_ELEMENT' in v || u(v, 'BYTES_PER_ELEMENT', t),
            x(s);
        }))
      : (e.exports = function() {});
  },
  function(e, t, n) {
    var i = n(43),
      r = n(2),
      o = function(e) {
        return 'function' == typeof e ? e : void 0;
      };
    e.exports = function(e, t) {
      return arguments.length < 2 ? o(i[e]) || o(r[e]) : (i[e] && i[e][t]) || (r[e] && r[e][t]);
    };
  },
  function(e, t, n) {
    var i = n(23),
      r = Math.max,
      o = Math.min;
    e.exports = function(e, t) {
      var n = i(e);
      return n < 0 ? r(n + t, 0) : o(n, t);
    };
  },
  function(e, t, n) {
    var i = n(4),
      r = n(85),
      o = n(83),
      a = n(52),
      s = n(107),
      l = n(80),
      c = n(65)('IE_PROTO'),
      d = function() {},
      u = function() {
        var e,
          t = l('iframe'),
          n = o.length;
        for (
          t.style.display = 'none',
            s.appendChild(t),
            t.src = String('javascript:'),
            (e = t.contentWindow.document).open(),
            e.write('<script>document.F=Object</script>'),
            e.close(),
            u = e.F;
          n--;

        )
          delete u.prototype[o[n]];
        return u();
      };
    (e.exports =
      Object.create ||
      function(e, t) {
        var n;
        return (
          null !== e ? ((d.prototype = i(e)), (n = new d()), (d.prototype = null), (n[c] = e)) : (n = u()),
          void 0 === t ? n : r(n, t)
        );
      }),
      (a[c] = !0);
  },
  function(e, t, n) {
    var i = n(18);
    e.exports = function(e, t, n) {
      if ((i(e), void 0 === t)) return e;
      switch (n) {
        case 0:
          return function() {
            return e.call(t);
          };
        case 1:
          return function(n) {
            return e.call(t, n);
          };
        case 2:
          return function(n, i) {
            return e.call(t, n, i);
          };
        case 3:
          return function(n, i, r) {
            return e.call(t, n, i, r);
          };
      }
      return function() {
        return e.apply(t, arguments);
      };
    };
  },
  function(e, t, n) {
    var i = n(7),
      r = n(34),
      o = n(13),
      a = i('unscopables'),
      s = Array.prototype;
    null == s[a] && o(s, a, r(null)),
      (e.exports = function(e) {
        s[a][e] = !0;
      });
  },
  function(e, t) {
    e.exports = function(e, t, n) {
      if (!(e instanceof t)) throw TypeError('Incorrect ' + (n ? n + ' ' : '') + 'invocation');
      return e;
    };
  },
  function(e, t) {
    e.exports = function(e, t) {
      return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
    };
  },
  function(e, t, n) {
    var i = n(105),
      r = n(83).concat('length', 'prototype');
    t.f =
      Object.getOwnPropertyNames ||
      function(e) {
        return i(e, r);
      };
  },
  function(e, t, n) {
    var i = n(24);
    e.exports =
      Array.isArray ||
      function(e) {
        return 'Array' == i(e);
      };
  },
  function(e, t, n) {
    var i = n(52),
      r = n(3),
      o = n(11),
      a = n(9).f,
      s = n(51),
      l = n(57),
      c = s('meta'),
      d = 0,
      u =
        Object.isExtensible ||
        function() {
          return !0;
        },
      f = function(e) {
        a(e, c, { value: { objectID: 'O' + ++d, weakData: {} } });
      },
      p = (e.exports = {
        REQUIRED: !1,
        fastKey: function(e, t) {
          if (!r(e)) return 'symbol' == typeof e ? e : ('string' == typeof e ? 'S' : 'P') + e;
          if (!o(e, c)) {
            if (!u(e)) return 'F';
            if (!t) return 'E';
            f(e);
          }
          return e[c].objectID;
        },
        getWeakData: function(e, t) {
          if (!o(e, c)) {
            if (!u(e)) return !0;
            if (!t) return !1;
            f(e);
          }
          return e[c].weakData;
        },
        onFreeze: function(e) {
          return l && p.REQUIRED && u(e) && !o(e, c) && f(e), e;
        }
      });
    i[c] = !0;
  },
  function(e, t, n) {
    'use strict';
    var i = n(25),
      r = n(9),
      o = n(38);
    e.exports = function(e, t, n) {
      var a = i(t);
      a in e ? r.f(e, a, o(0, n)) : (e[a] = n);
    };
  },
  function(e, t, n) {
    e.exports = n(2);
  },
  function(e, t, n) {
    var i = n(4),
      r = n(86),
      o = n(8),
      a = n(35),
      s = n(59),
      l = n(112),
      c = function(e, t) {
        (this.stopped = e), (this.result = t);
      };
    (e.exports = function(e, t, n, d, u) {
      var f,
        p,
        h,
        g,
        m,
        v,
        b,
        w = a(t, n, d ? 2 : 1);
      if (u) f = e;
      else {
        if ('function' != typeof (p = s(e))) throw TypeError('Target is not iterable');
        if (r(p)) {
          for (h = 0, g = o(e.length); g > h; h++)
            if ((m = d ? w(i((b = e[h]))[0], b[1]) : w(e[h])) && m instanceof c) return m;
          return new c(!1);
        }
        f = p.call(e);
      }
      for (v = f.next; !(b = v.call(f)).done; )
        if ('object' == typeof (m = l(f, w, b.value, d)) && m && m instanceof c) return m;
      return new c(!1);
    }).stop = function(e) {
      return new c(!0, e);
    };
  },
  function(e, t, n) {
    var i = n(4),
      r = n(114);
    e.exports =
      Object.setPrototypeOf ||
      ('__proto__' in {}
        ? (function() {
            var e,
              t = !1,
              n = {};
            try {
              (e = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set).call(n, []),
                (t = n instanceof Array);
            } catch (e) {}
            return function(n, o) {
              return i(n), r(o), t ? e.call(n, o) : (n.__proto__ = o), n;
            };
          })()
        : void 0);
  },
  function(e, t, n) {
    'use strict';
    var i = n(32),
      r = n(9),
      o = n(7),
      a = n(6),
      s = o('species');
    e.exports = function(e) {
      var t = i(e),
        n = r.f;
      a &&
        t &&
        !t[s] &&
        n(t, s, {
          configurable: !0,
          get: function() {
            return this;
          }
        });
    };
  },
  function(e, t, n) {
    var i = n(15),
      r = '[' + n(76) + ']',
      o = RegExp('^' + r + r + '*'),
      a = RegExp(r + r + '*$'),
      s = function(e) {
        return function(t) {
          var n = String(i(t));
          return 1 & e && (n = n.replace(o, '')), 2 & e && (n = n.replace(a, '')), n;
        };
      };
    e.exports = { start: s(1), end: s(2), trim: s(3) };
  },
  function(e, t, n) {
    var i = n(14);
    e.exports = function(e, t, n) {
      for (var r in t) i(e, r, t[r], n);
      return e;
    };
  },
  function(e, t, n) {
    var i = n(1),
      r = n(24),
      o = ''.split;
    e.exports = i(function() {
      return !Object('z').propertyIsEnumerable(0);
    })
      ? function(e) {
          return 'String' == r(e) ? o.call(e, '') : Object(e);
        }
      : Object;
  },
  function(e, t, n) {
    var i = n(28),
      r = n(167);
    (e.exports = function(e, t) {
      return r[e] || (r[e] = void 0 !== t ? t : {});
    })('versions', []).push({
      version: '3.3.2',
      mode: i ? 'pure' : 'global',
      copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
    });
  },
  function(e, t) {
    var n = 0,
      i = Math.random();
    e.exports = function(e) {
      return 'Symbol(' + String(void 0 === e ? '' : e) + ')_' + (++n + i).toString(36);
    };
  },
  function(e, t) {
    e.exports = {};
  },
  function(e, t, n) {
    var i = n(19),
      r = n(8),
      o = n(33),
      a = function(e) {
        return function(t, n, a) {
          var s,
            l = i(t),
            c = r(l.length),
            d = o(a, c);
          if (e && n != n) {
            for (; c > d; ) if ((s = l[d++]) != s) return !0;
          } else for (; c > d; d++) if ((e || d in l) && l[d] === n) return e || d || 0;
          return !e && -1;
        };
      };
    e.exports = { includes: a(!0), indexOf: a(!1) };
  },
  function(e, t, n) {
    var i = n(1),
      r = /#|\.prototype\./,
      o = function(e, t) {
        var n = s[a(e)];
        return n == c || (n != l && ('function' == typeof t ? i(t) : !!t));
      },
      a = (o.normalize = function(e) {
        return String(e)
          .replace(r, '.')
          .toLowerCase();
      }),
      s = (o.data = {}),
      l = (o.NATIVE = 'N'),
      c = (o.POLYFILL = 'P');
    e.exports = o;
  },
  function(e, t, n) {
    var i = n(105),
      r = n(83);
    e.exports =
      Object.keys ||
      function(e) {
        return i(e, r);
      };
  },
  function(e, t, n) {
    var i = n(3),
      r = n(40),
      o = n(7)('species');
    e.exports = function(e, t) {
      var n;
      return (
        r(e) &&
          ('function' != typeof (n = e.constructor) || (n !== Array && !r(n.prototype))
            ? i(n) && null === (n = n[o]) && (n = void 0)
            : (n = void 0)),
        new (void 0 === n ? Array : n)(0 === t ? 0 : t)
      );
    };
  },
  function(e, t, n) {
    var i = n(1);
    e.exports = !i(function() {
      return Object.isExtensible(Object.preventExtensions({}));
    });
  },
  function(e, t) {
    e.exports = {};
  },
  function(e, t, n) {
    var i = n(60),
      r = n(58),
      o = n(7)('iterator');
    e.exports = function(e) {
      if (null != e) return e[o] || e['@@iterator'] || r[i(e)];
    };
  },
  function(e, t, n) {
    var i = n(24),
      r = n(7)('toStringTag'),
      o =
        'Arguments' ==
        i(
          (function() {
            return arguments;
          })()
        );
    e.exports = function(e) {
      var t, n, a;
      return void 0 === e
        ? 'Undefined'
        : null === e
        ? 'Null'
        : 'string' ==
          typeof (n = (function(e, t) {
            try {
              return e[t];
            } catch (e) {}
          })((t = Object(e)), r))
        ? n
        : o
        ? i(t)
        : 'Object' == (a = i(t)) && 'function' == typeof t.callee
        ? 'Arguments'
        : a;
    };
  },
  function(e, t, n) {
    var i = n(1),
      r = n(7)('species');
    e.exports = function(e) {
      return !i(function() {
        var t = [];
        return (
          ((t.constructor = {})[r] = function() {
            return { foo: 1 };
          }),
          1 !== t[e](Boolean).foo
        );
      });
    };
  },
  function(e, t, n) {
    'use strict';
    var i = n(4);
    e.exports = function() {
      var e = i(this),
        t = '';
      return (
        e.global && (t += 'g'),
        e.ignoreCase && (t += 'i'),
        e.multiline && (t += 'm'),
        e.dotAll && (t += 's'),
        e.unicode && (t += 'u'),
        e.sticky && (t += 'y'),
        t
      );
    };
  },
  function(e, t, n) {
    var i = n(32);
    e.exports = i('navigator', 'userAgent') || '';
  },
  function(e, t, n) {
    'use strict';
    var i = {}.propertyIsEnumerable,
      r = Object.getOwnPropertyDescriptor,
      o = r && !i.call({ 1: 2 }, 1);
    t.f = o
      ? function(e) {
          var t = r(this, e);
          return !!t && t.enumerable;
        }
      : i;
  },
  function(e, t, n) {
    var i = n(50),
      r = n(51),
      o = i('keys');
    e.exports = function(e) {
      return o[e] || (o[e] = r(e));
    };
  },
  function(e, t, n) {
    'use strict';
    var i = n(28),
      r = n(2),
      o = n(1);
    e.exports =
      i ||
      !o(function() {
        var e = Math.random();
        __defineSetter__.call(null, e, function() {}), delete r[e];
      });
  },
  function(e, t, n) {
    var i = n(7)('iterator'),
      r = !1;
    try {
      var o = 0,
        a = {
          next: function() {
            return { done: !!o++ };
          },
          return: function() {
            r = !0;
          }
        };
      (a[i] = function() {
        return this;
      }),
        Array.from(a, function() {
          throw 2;
        });
    } catch (e) {}
    e.exports = function(e, t) {
      if (!t && !r) return !1;
      var n = !1;
      try {
        var o = {};
        (o[i] = function() {
          return {
            next: function() {
              return { done: (n = !0) };
            }
          };
        }),
          e(o);
      } catch (e) {}
      return n;
    };
  },
  function(e, t, n) {
    var i = n(18),
      r = n(10),
      o = n(49),
      a = n(8),
      s = function(e) {
        return function(t, n, s, l) {
          i(n);
          var c = r(t),
            d = o(c),
            u = a(c.length),
            f = e ? u - 1 : 0,
            p = e ? -1 : 1;
          if (s < 2)
            for (;;) {
              if (f in d) {
                (l = d[f]), (f += p);
                break;
              }
              if (((f += p), e ? f < 0 : u <= f)) throw TypeError('Reduce of empty array with no initial value');
            }
          for (; e ? f >= 0 : u > f; f += p) f in d && (l = n(l, d[f], f, c));
          return l;
        };
      };
    e.exports = { left: s(!1), right: s(!0) };
  },
  function(e, t, n) {
    'use strict';
    var i = n(19),
      r = n(36),
      o = n(58),
      a = n(20),
      s = n(89),
      l = a.set,
      c = a.getterFor('Array Iterator');
    (e.exports = s(
      Array,
      'Array',
      function(e, t) {
        l(this, { type: 'Array Iterator', target: i(e), index: 0, kind: t });
      },
      function() {
        var e = c(this),
          t = e.target,
          n = e.kind,
          i = e.index++;
        return !t || i >= t.length
          ? ((e.target = void 0), { value: void 0, done: !0 })
          : 'keys' == n
          ? { value: i, done: !1 }
          : 'values' == n
          ? { value: t[i], done: !1 }
          : { value: [i, t[i]], done: !1 };
      },
      'values'
    )),
      (o.Arguments = o.Array),
      r('keys'),
      r('values'),
      r('entries');
  },
  function(e, t, n) {
    var i = n(23),
      r = n(15),
      o = function(e) {
        return function(t, n) {
          var o,
            a,
            s = String(r(t)),
            l = i(n),
            c = s.length;
          return l < 0 || l >= c
            ? e
              ? ''
              : void 0
            : (o = s.charCodeAt(l)) < 55296 ||
              o > 56319 ||
              l + 1 === c ||
              (a = s.charCodeAt(l + 1)) < 56320 ||
              a > 57343
            ? e
              ? s.charAt(l)
              : o
            : e
            ? s.slice(l, l + 2)
            : a - 56320 + ((o - 55296) << 10) + 65536;
        };
      };
    e.exports = { codeAt: o(!1), charAt: o(!0) };
  },
  function(e, t, n) {
    var i = n(3),
      r = n(24),
      o = n(7)('match');
    e.exports = function(e) {
      var t;
      return i(e) && (void 0 !== (t = e[o]) ? !!t : 'RegExp' == r(e));
    };
  },
  function(e, t, n) {
    'use strict';
    var i = n(13),
      r = n(14),
      o = n(1),
      a = n(7),
      s = n(73),
      l = a('species'),
      c = !o(function() {
        var e = /./;
        return (
          (e.exec = function() {
            var e = [];
            return (e.groups = { a: '7' }), e;
          }),
          '7' !== ''.replace(e, '$<a>')
        );
      }),
      d = !o(function() {
        var e = /(?:)/,
          t = e.exec;
        e.exec = function() {
          return t.apply(this, arguments);
        };
        var n = 'ab'.split(e);
        return 2 !== n.length || 'a' !== n[0] || 'b' !== n[1];
      });
    e.exports = function(e, t, n, u) {
      var f = a(e),
        p = !o(function() {
          var t = {};
          return (
            (t[f] = function() {
              return 7;
            }),
            7 != ''[e](t)
          );
        }),
        h =
          p &&
          !o(function() {
            var t = !1,
              n = /a/;
            return (
              (n.exec = function() {
                return (t = !0), null;
              }),
              'split' === e &&
                ((n.constructor = {}),
                (n.constructor[l] = function() {
                  return n;
                })),
              n[f](''),
              !t
            );
          });
      if (!p || !h || ('replace' === e && !c) || ('split' === e && !d)) {
        var g = /./[f],
          m = n(f, ''[e], function(e, t, n, i, r) {
            return t.exec === s
              ? p && !r
                ? { done: !0, value: g.call(t, n, i) }
                : { done: !0, value: e.call(n, t, i) }
              : { done: !1 };
          }),
          v = m[0],
          b = m[1];
        r(String.prototype, e, v),
          r(
            RegExp.prototype,
            f,
            2 == t
              ? function(e, t) {
                  return b.call(e, this, t);
                }
              : function(e) {
                  return b.call(e, this);
                }
          ),
          u && i(RegExp.prototype[f], 'sham', !0);
      }
    };
  },
  function(e, t, n) {
    'use strict';
    var i,
      r,
      o = n(62),
      a = RegExp.prototype.exec,
      s = String.prototype.replace,
      l = a,
      c = ((i = /a/), (r = /b*/g), a.call(i, 'a'), a.call(r, 'a'), 0 !== i.lastIndex || 0 !== r.lastIndex),
      d = void 0 !== /()??/.exec('')[1];
    (c || d) &&
      (l = function(e) {
        var t,
          n,
          i,
          r,
          l = this;
        return (
          d && (n = new RegExp('^' + l.source + '$(?!\\s)', o.call(l))),
          c && (t = l.lastIndex),
          (i = a.call(l, e)),
          c && i && (l.lastIndex = l.global ? i.index + i[0].length : t),
          d &&
            i &&
            i.length > 1 &&
            s.call(i[0], n, function() {
              for (r = 1; r < arguments.length - 2; r++) void 0 === arguments[r] && (i[r] = void 0);
            }),
          i
        );
      }),
      (e.exports = l);
  },
  function(e, t, n) {
    'use strict';
    var i = n(70).charAt;
    e.exports = function(e, t, n) {
      return t + (n ? i(e, t).length : 1);
    };
  },
  function(e, t, n) {
    var i = n(24),
      r = n(73);
    e.exports = function(e, t) {
      var n = e.exec;
      if ('function' == typeof n) {
        var o = n.call(e, t);
        if ('object' != typeof o) throw TypeError('RegExp exec method returned something other than an Object or null');
        return o;
      }
      if ('RegExp' !== i(e)) throw TypeError('RegExp#exec called on incompatible receiver');
      return r.call(e, t);
    };
  },
  function(e, t) {
    e.exports = '\t\n\v\f\r                　\u2028\u2029\ufeff';
  },
  function(e, t) {
    var n = Math.expm1,
      i = Math.exp;
    e.exports =
      !n || n(10) > 22025.465794806718 || n(10) < 22025.465794806718 || -2e-17 != n(-2e-17)
        ? function(e) {
            return 0 == (e = +e) ? e : e > -1e-6 && e < 1e-6 ? e + (e * e) / 2 : i(e) - 1;
          }
        : n;
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(2),
      o = n(54),
      a = n(14),
      s = n(41),
      l = n(44),
      c = n(37),
      d = n(3),
      u = n(1),
      f = n(67),
      p = n(26),
      h = n(96);
    e.exports = function(e, t, n, g, m) {
      var v = r[e],
        b = v && v.prototype,
        w = v,
        S = g ? 'set' : 'add',
        y = {},
        _ = function(e) {
          var t = b[e];
          a(
            b,
            e,
            'add' == e
              ? function(e) {
                  return t.call(this, 0 === e ? 0 : e), this;
                }
              : 'delete' == e
              ? function(e) {
                  return !(m && !d(e)) && t.call(this, 0 === e ? 0 : e);
                }
              : 'get' == e
              ? function(e) {
                  return m && !d(e) ? void 0 : t.call(this, 0 === e ? 0 : e);
                }
              : 'has' == e
              ? function(e) {
                  return !(m && !d(e)) && t.call(this, 0 === e ? 0 : e);
                }
              : function(e, n) {
                  return t.call(this, 0 === e ? 0 : e, n), this;
                }
          );
        };
      if (
        o(
          e,
          'function' != typeof v ||
            !(
              m ||
              (b.forEach &&
                !u(function() {
                  new v().entries().next();
                }))
            )
        )
      )
        (w = n.getConstructor(t, e, g, S)), (s.REQUIRED = !0);
      else if (o(e, !0)) {
        var C = new w(),
          x = C[S](m ? {} : -0, 1) != C,
          I = u(function() {
            C.has(1);
          }),
          T = f(function(e) {
            new v(e);
          }),
          N =
            !m &&
            u(function() {
              for (var e = new v(), t = 5; t--; ) e[S](t, t);
              return !e.has(-0);
            });
        T ||
          (((w = t(function(t, n) {
            c(t, w, e);
            var i = h(new v(), t, w);
            return null != n && l(n, i[S], i, g), i;
          })).prototype = b),
          (b.constructor = w)),
          (I || N) && (_('delete'), _('has'), g && _('get')),
          (N || x) && _(S),
          m && b.clear && delete b.clear;
      }
      return (y[e] = w), i({ global: !0, forced: w != v }, y), p(w, e), m || n.setStrong(w, e, g), w;
    };
  },
  function(e, t, n) {
    'use strict';
    var i = n(2),
      r = n(6),
      o = n(5).NATIVE_ARRAY_BUFFER,
      a = n(13),
      s = n(48),
      l = n(1),
      c = n(37),
      d = n(23),
      u = n(8),
      f = n(135),
      p = n(39).f,
      h = n(9).f,
      g = n(88),
      m = n(26),
      v = n(20),
      b = v.get,
      w = v.set,
      S = i.ArrayBuffer,
      y = S,
      _ = i.DataView,
      C = i.Math,
      x = i.RangeError,
      I = C.abs,
      T = C.pow,
      N = C.floor,
      k = C.log,
      $ = C.LN2,
      P = function(e, t, n) {
        var i,
          r,
          o,
          a = new Array(n),
          s = 8 * n - t - 1,
          l = (1 << s) - 1,
          c = l >> 1,
          d = 23 === t ? T(2, -24) - T(2, -77) : 0,
          u = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0,
          f = 0;
        for (
          (e = I(e)) != e || e === 1 / 0
            ? ((r = e != e ? 1 : 0), (i = l))
            : ((i = N(k(e) / $)),
              e * (o = T(2, -i)) < 1 && (i--, (o *= 2)),
              (e += i + c >= 1 ? d / o : d * T(2, 1 - c)) * o >= 2 && (i++, (o /= 2)),
              i + c >= l
                ? ((r = 0), (i = l))
                : i + c >= 1
                ? ((r = (e * o - 1) * T(2, t)), (i += c))
                : ((r = e * T(2, c - 1) * T(2, t)), (i = 0)));
          t >= 8;
          a[f++] = 255 & r, r /= 256, t -= 8
        );
        for (i = (i << t) | r, s += t; s > 0; a[f++] = 255 & i, i /= 256, s -= 8);
        return (a[--f] |= 128 * u), a;
      },
      E = function(e, t) {
        var n,
          i = e.length,
          r = 8 * i - t - 1,
          o = (1 << r) - 1,
          a = o >> 1,
          s = r - 7,
          l = i - 1,
          c = e[l--],
          d = 127 & c;
        for (c >>= 7; s > 0; d = 256 * d + e[l], l--, s -= 8);
        for (n = d & ((1 << -s) - 1), d >>= -s, s += t; s > 0; n = 256 * n + e[l], l--, s -= 8);
        if (0 === d) d = 1 - a;
        else {
          if (d === o) return n ? NaN : c ? -1 / 0 : 1 / 0;
          (n += T(2, t)), (d -= a);
        }
        return (c ? -1 : 1) * n * T(2, d - t);
      },
      L = function(e) {
        return (e[3] << 24) | (e[2] << 16) | (e[1] << 8) | e[0];
      },
      R = function(e) {
        return [255 & e];
      },
      A = function(e) {
        return [255 & e, (e >> 8) & 255];
      },
      D = function(e) {
        return [255 & e, (e >> 8) & 255, (e >> 16) & 255, (e >> 24) & 255];
      },
      O = function(e) {
        return P(e, 23, 4);
      },
      V = function(e) {
        return P(e, 52, 8);
      },
      M = function(e, t) {
        h(e.prototype, t, {
          get: function() {
            return b(this)[t];
          }
        });
      },
      F = function(e, t, n, i) {
        var r = f(+n),
          o = b(e);
        if (r + t > o.byteLength) throw x('Wrong index');
        var a = b(o.buffer).bytes,
          s = r + o.byteOffset,
          l = a.slice(s, s + t);
        return i ? l : l.reverse();
      },
      j = function(e, t, n, i, r, o) {
        var a = f(+n),
          s = b(e);
        if (a + t > s.byteLength) throw x('Wrong index');
        for (var l = b(s.buffer).bytes, c = a + s.byteOffset, d = i(+r), u = 0; u < t; u++)
          l[c + u] = d[o ? u : t - u - 1];
      };
    if (o) {
      if (
        !l(function() {
          S(1);
        }) ||
        !l(function() {
          new S(-1);
        }) ||
        l(function() {
          return new S(), new S(1.5), new S(NaN), 'ArrayBuffer' != S.name;
        })
      ) {
        for (
          var U,
            B = ((y = function(e) {
              return c(this, y), new S(f(e));
            }).prototype = S.prototype),
            z = p(S),
            W = 0;
          z.length > W;

        )
          (U = z[W++]) in y || a(y, U, S[U]);
        B.constructor = y;
      }
      var G = new _(new y(2)),
        H = _.prototype.setInt8;
      G.setInt8(0, 2147483648),
        G.setInt8(1, 2147483649),
        (!G.getInt8(0) && G.getInt8(1)) ||
          s(
            _.prototype,
            {
              setInt8: function(e, t) {
                H.call(this, e, (t << 24) >> 24);
              },
              setUint8: function(e, t) {
                H.call(this, e, (t << 24) >> 24);
              }
            },
            { unsafe: !0 }
          );
    } else
      (y = function(e) {
        c(this, y, 'ArrayBuffer');
        var t = f(e);
        w(this, { bytes: g.call(new Array(t), 0), byteLength: t }), r || (this.byteLength = t);
      }),
        (_ = function(e, t, n) {
          c(this, _, 'DataView'), c(e, y, 'DataView');
          var i = b(e).byteLength,
            o = d(t);
          if (o < 0 || o > i) throw x('Wrong offset');
          if (o + (n = void 0 === n ? i - o : u(n)) > i) throw x('Wrong length');
          w(this, { buffer: e, byteLength: n, byteOffset: o }),
            r || ((this.buffer = e), (this.byteLength = n), (this.byteOffset = o));
        }),
        r && (M(y, 'byteLength'), M(_, 'buffer'), M(_, 'byteLength'), M(_, 'byteOffset')),
        s(_.prototype, {
          getInt8: function(e) {
            return (F(this, 1, e)[0] << 24) >> 24;
          },
          getUint8: function(e) {
            return F(this, 1, e)[0];
          },
          getInt16: function(e) {
            var t = F(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
            return (((t[1] << 8) | t[0]) << 16) >> 16;
          },
          getUint16: function(e) {
            var t = F(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
            return (t[1] << 8) | t[0];
          },
          getInt32: function(e) {
            return L(F(this, 4, e, arguments.length > 1 ? arguments[1] : void 0));
          },
          getUint32: function(e) {
            return L(F(this, 4, e, arguments.length > 1 ? arguments[1] : void 0)) >>> 0;
          },
          getFloat32: function(e) {
            return E(F(this, 4, e, arguments.length > 1 ? arguments[1] : void 0), 23);
          },
          getFloat64: function(e) {
            return E(F(this, 8, e, arguments.length > 1 ? arguments[1] : void 0), 52);
          },
          setInt8: function(e, t) {
            j(this, 1, e, R, t);
          },
          setUint8: function(e, t) {
            j(this, 1, e, R, t);
          },
          setInt16: function(e, t) {
            j(this, 2, e, A, t, arguments.length > 2 ? arguments[2] : void 0);
          },
          setUint16: function(e, t) {
            j(this, 2, e, A, t, arguments.length > 2 ? arguments[2] : void 0);
          },
          setInt32: function(e, t) {
            j(this, 4, e, D, t, arguments.length > 2 ? arguments[2] : void 0);
          },
          setUint32: function(e, t) {
            j(this, 4, e, D, t, arguments.length > 2 ? arguments[2] : void 0);
          },
          setFloat32: function(e, t) {
            j(this, 4, e, O, t, arguments.length > 2 ? arguments[2] : void 0);
          },
          setFloat64: function(e, t) {
            j(this, 8, e, V, t, arguments.length > 2 ? arguments[2] : void 0);
          }
        });
    m(y, 'ArrayBuffer'), m(_, 'DataView'), (e.exports = { ArrayBuffer: y, DataView: _ });
  },
  function(e, t, n) {
    var i = n(2),
      r = n(3),
      o = i.document,
      a = r(o) && r(o.createElement);
    e.exports = function(e) {
      return a ? o.createElement(e) : {};
    };
  },
  function(e, t, n) {
    var i = n(2),
      r = n(13);
    e.exports = function(e, t) {
      try {
        r(i, e, t);
      } catch (n) {
        i[e] = t;
      }
      return t;
    };
  },
  function(e, t, n) {
    var i = n(32),
      r = n(39),
      o = n(84),
      a = n(4);
    e.exports =
      i('Reflect', 'ownKeys') ||
      function(e) {
        var t = r.f(a(e)),
          n = o.f;
        return n ? t.concat(n(e)) : t;
      };
  },
  function(e, t) {
    e.exports = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ];
  },
  function(e, t) {
    t.f = Object.getOwnPropertySymbols;
  },
  function(e, t, n) {
    var i = n(6),
      r = n(9),
      o = n(4),
      a = n(55);
    e.exports = i
      ? Object.defineProperties
      : function(e, t) {
          o(e);
          for (var n, i = a(t), s = i.length, l = 0; s > l; ) r.f(e, (n = i[l++]), t[n]);
          return e;
        };
  },
  function(e, t, n) {
    var i = n(7),
      r = n(58),
      o = i('iterator'),
      a = Array.prototype;
    e.exports = function(e) {
      return void 0 !== e && (r.Array === e || a[o] === e);
    };
  },
  function(e, t, n) {
    var i = n(1);
    e.exports = !i(function() {
      function e() {}
      return (e.prototype.constructor = null), Object.getPrototypeOf(new e()) !== e.prototype;
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(10),
      r = n(33),
      o = n(8);
    e.exports = function(e) {
      for (
        var t = i(this),
          n = o(t.length),
          a = arguments.length,
          s = r(a > 1 ? arguments[1] : void 0, n),
          l = a > 2 ? arguments[2] : void 0,
          c = void 0 === l ? n : r(l, n);
        c > s;

      )
        t[s++] = e;
      return t;
    };
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(90),
      o = n(27),
      a = n(45),
      s = n(26),
      l = n(13),
      c = n(14),
      d = n(7),
      u = n(28),
      f = n(58),
      p = n(121),
      h = p.IteratorPrototype,
      g = p.BUGGY_SAFARI_ITERATORS,
      m = d('iterator'),
      v = function() {
        return this;
      };
    e.exports = function(e, t, n, d, p, b, w) {
      r(n, t, d);
      var S,
        y,
        _,
        C = function(e) {
          if (e === p && k) return k;
          if (!g && e in T) return T[e];
          switch (e) {
            case 'keys':
            case 'values':
            case 'entries':
              return function() {
                return new n(this, e);
              };
          }
          return function() {
            return new n(this);
          };
        },
        x = t + ' Iterator',
        I = !1,
        T = e.prototype,
        N = T[m] || T['@@iterator'] || (p && T[p]),
        k = (!g && N) || C(p),
        $ = ('Array' == t && T.entries) || N;
      if (
        ($ &&
          ((S = o($.call(new e()))),
          h !== Object.prototype &&
            S.next &&
            (u || o(S) === h || (a ? a(S, h) : 'function' != typeof S[m] && l(S, m, v)),
            s(S, x, !0, !0),
            u && (f[x] = v))),
        'values' == p &&
          N &&
          'values' !== N.name &&
          ((I = !0),
          (k = function() {
            return N.call(this);
          })),
        (u && !w) || T[m] === k || l(T, m, k),
        (f[t] = k),
        p)
      )
        if (((y = { values: C('values'), keys: b ? k : C('keys'), entries: C('entries') }), w))
          for (_ in y) (!g && !I && _ in T) || c(T, _, y[_]);
        else i({ target: t, proto: !0, forced: g || I }, y);
      return y;
    };
  },
  function(e, t, n) {
    'use strict';
    var i = n(121).IteratorPrototype,
      r = n(34),
      o = n(38),
      a = n(26),
      s = n(58),
      l = function() {
        return this;
      };
    e.exports = function(e, t, n) {
      var c = t + ' Iterator';
      return (e.prototype = r(i, { next: o(1, n) })), a(e, c, !1, !0), (s[c] = l), e;
    };
  },
  function(e, t, n) {
    var i = n(71);
    e.exports = function(e) {
      if (i(e)) throw TypeError("The method doesn't accept regular expressions");
      return e;
    };
  },
  function(e, t, n) {
    var i = n(7)('match');
    e.exports = function(e) {
      var t = /./;
      try {
        '/./'[e](t);
      } catch (n) {
        try {
          return (t[i] = !1), '/./'[e](t);
        } catch (e) {}
      }
      return !1;
    };
  },
  function(e, t, n) {
    var i = n(8),
      r = n(94),
      o = n(15),
      a = Math.ceil,
      s = function(e) {
        return function(t, n, s) {
          var l,
            c,
            d = String(o(t)),
            u = d.length,
            f = void 0 === s ? ' ' : String(s),
            p = i(n);
          return p <= u || '' == f
            ? d
            : ((l = p - u), (c = r.call(f, a(l / f.length))).length > l && (c = c.slice(0, l)), e ? d + c : c + d);
        };
      };
    e.exports = { start: s(!1), end: s(!0) };
  },
  function(e, t, n) {
    'use strict';
    var i = n(23),
      r = n(15);
    e.exports =
      ''.repeat ||
      function(e) {
        var t = String(r(this)),
          n = '',
          o = i(e);
        if (o < 0 || o == 1 / 0) throw RangeError('Wrong number of repetitions');
        for (; o > 0; (o >>>= 1) && (t += t)) 1 & o && (n += t);
        return n;
      };
  },
  function(e, t, n) {
    var i = n(1),
      r = n(76);
    e.exports = function(e) {
      return i(function() {
        return !!r[e]() || '​᠎' != '​᠎'[e]() || r[e].name !== e;
      });
    };
  },
  function(e, t, n) {
    var i = n(3),
      r = n(45);
    e.exports = function(e, t, n) {
      var o, a;
      return (
        r &&
          'function' == typeof (o = t.constructor) &&
          o !== n &&
          i((a = o.prototype)) &&
          a !== n.prototype &&
          r(e, a),
        e
      );
    };
  },
  function(e, t) {
    e.exports =
      Math.sign ||
      function(e) {
        return 0 == (e = +e) || e != e ? e : e < 0 ? -1 : 1;
      };
  },
  function(e, t, n) {
    var i,
      r,
      o,
      a = n(2),
      s = n(1),
      l = n(24),
      c = n(35),
      d = n(107),
      u = n(80),
      f = n(63),
      p = a.location,
      h = a.setImmediate,
      g = a.clearImmediate,
      m = a.process,
      v = a.MessageChannel,
      b = a.Dispatch,
      w = 0,
      S = {},
      y = function(e) {
        if (S.hasOwnProperty(e)) {
          var t = S[e];
          delete S[e], t();
        }
      },
      _ = function(e) {
        return function() {
          y(e);
        };
      },
      C = function(e) {
        y(e.data);
      },
      x = function(e) {
        a.postMessage(e + '', p.protocol + '//' + p.host);
      };
    (h && g) ||
      ((h = function(e) {
        for (var t = [], n = 1; arguments.length > n; ) t.push(arguments[n++]);
        return (
          (S[++w] = function() {
            ('function' == typeof e ? e : Function(e)).apply(void 0, t);
          }),
          i(w),
          w
        );
      }),
      (g = function(e) {
        delete S[e];
      }),
      'process' == l(m)
        ? (i = function(e) {
            m.nextTick(_(e));
          })
        : b && b.now
        ? (i = function(e) {
            b.now(_(e));
          })
        : v && !/(iphone|ipod|ipad).*applewebkit/i.test(f)
        ? ((o = (r = new v()).port2), (r.port1.onmessage = C), (i = c(o.postMessage, o, 1)))
        : !a.addEventListener || 'function' != typeof postMessage || a.importScripts || s(x)
        ? (i =
            'onreadystatechange' in u('script')
              ? function(e) {
                  d.appendChild(u('script')).onreadystatechange = function() {
                    d.removeChild(this), y(e);
                  };
                }
              : function(e) {
                  setTimeout(_(e), 0);
                })
        : ((i = x), a.addEventListener('message', C, !1))),
      (e.exports = { set: h, clear: g });
  },
  function(e, t, n) {
    'use strict';
    var i = n(18),
      r = function(e) {
        var t, n;
        (this.promise = new e(function(e, i) {
          if (void 0 !== t || void 0 !== n) throw TypeError('Bad Promise constructor');
          (t = e), (n = i);
        })),
          (this.resolve = i(t)),
          (this.reject = i(n));
      };
    e.exports.f = function(e) {
      return new r(e);
    };
  },
  function(e, t, n) {
    var i = n(2),
      r = n(1),
      o = n(67),
      a = n(5).NATIVE_ARRAY_BUFFER_VIEWS,
      s = i.ArrayBuffer,
      l = i.Int8Array;
    e.exports =
      !a ||
      !r(function() {
        l(1);
      }) ||
      !r(function() {
        new l(-1);
      }) ||
      !o(function(e) {
        new l(), new l(null), new l(1.5), new l(e);
      }, !0) ||
      r(function() {
        return 1 !== new l(new s(2), 1, void 0).length;
      });
  },
  function(e, t, n) {
    var i = n(6),
      r = n(1),
      o = n(80);
    e.exports =
      !i &&
      !r(function() {
        return (
          7 !=
          Object.defineProperty(o('div'), 'a', {
            get: function() {
              return 7;
            }
          }).a
        );
      });
  },
  function(e, t, n) {
    var i = n(50);
    e.exports = i('native-function-to-string', Function.toString);
  },
  function(e, t, n) {
    var i = n(2),
      r = n(102),
      o = i.WeakMap;
    e.exports = 'function' == typeof o && /native code/.test(r.call(o));
  },
  function(e, t, n) {
    var i = n(11),
      r = n(82),
      o = n(16),
      a = n(9);
    e.exports = function(e, t) {
      for (var n = r(t), s = a.f, l = o.f, c = 0; c < n.length; c++) {
        var d = n[c];
        i(e, d) || s(e, d, l(t, d));
      }
    };
  },
  function(e, t, n) {
    var i = n(11),
      r = n(19),
      o = n(53).indexOf,
      a = n(52);
    e.exports = function(e, t) {
      var n,
        s = r(e),
        l = 0,
        c = [];
      for (n in s) !i(a, n) && i(s, n) && c.push(n);
      for (; t.length > l; ) i(s, (n = t[l++])) && (~o(c, n) || c.push(n));
      return c;
    };
  },
  function(e, t, n) {
    var i = n(1);
    e.exports =
      !!Object.getOwnPropertySymbols &&
      !i(function() {
        return !String(Symbol());
      });
  },
  function(e, t, n) {
    var i = n(32);
    e.exports = i('document', 'documentElement');
  },
  function(e, t, n) {
    var i = n(19),
      r = n(39).f,
      o = {}.toString,
      a = 'object' == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
    e.exports.f = function(e) {
      return a && '[object Window]' == o.call(e)
        ? (function(e) {
            try {
              return r(e);
            } catch (e) {
              return a.slice();
            }
          })(e)
        : r(i(e));
    };
  },
  function(e, t, n) {
    t.f = n(7);
  },
  function(e, t, n) {
    'use strict';
    var i = n(6),
      r = n(1),
      o = n(55),
      a = n(84),
      s = n(64),
      l = n(10),
      c = n(49),
      d = Object.assign;
    e.exports =
      !d ||
      r(function() {
        var e = {},
          t = {},
          n = Symbol();
        return (
          (e[n] = 7),
          'abcdefghijklmnopqrst'.split('').forEach(function(e) {
            t[e] = e;
          }),
          7 != d({}, e)[n] || 'abcdefghijklmnopqrst' != o(d({}, t)).join('')
        );
      })
        ? function(e, t) {
            for (var n = l(e), r = arguments.length, d = 1, u = a.f, f = s.f; r > d; )
              for (var p, h = c(arguments[d++]), g = u ? o(h).concat(u(h)) : o(h), m = g.length, v = 0; m > v; )
                (p = g[v++]), (i && !f.call(h, p)) || (n[p] = h[p]);
            return n;
          }
        : d;
  },
  function(e, t, n) {
    var i = n(6),
      r = n(55),
      o = n(19),
      a = n(64).f,
      s = function(e) {
        return function(t) {
          for (var n, s = o(t), l = r(s), c = l.length, d = 0, u = []; c > d; )
            (n = l[d++]), (i && !a.call(s, n)) || u.push(e ? [n, s[n]] : s[n]);
          return u;
        };
      };
    e.exports = { entries: s(!0), values: s(!1) };
  },
  function(e, t, n) {
    var i = n(4);
    e.exports = function(e, t, n, r) {
      try {
        return r ? t(i(n)[0], n[1]) : t(n);
      } catch (t) {
        var o = e.return;
        throw (void 0 !== o && i(o.call(e)), t);
      }
    };
  },
  function(e, t) {
    e.exports =
      Object.is ||
      function(e, t) {
        return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
      };
  },
  function(e, t, n) {
    var i = n(3);
    e.exports = function(e) {
      if (!i(e) && null !== e) throw TypeError("Can't set " + String(e) + ' as a prototype');
      return e;
    };
  },
  function(e, t, n) {
    'use strict';
    var i = n(18),
      r = n(3),
      o = [].slice,
      a = {},
      s = function(e, t, n) {
        if (!(t in a)) {
          for (var i = [], r = 0; r < t; r++) i[r] = 'a[' + r + ']';
          a[t] = Function('C,a', 'return new C(' + i.join(',') + ')');
        }
        return a[t](e, n);
      };
    e.exports =
      Function.bind ||
      function(e) {
        var t = i(this),
          n = o.call(arguments, 1),
          a = function() {
            var i = n.concat(o.call(arguments));
            return this instanceof a ? s(t, i.length, i) : t.apply(e, i);
          };
        return r(t.prototype) && (a.prototype = t.prototype), a;
      };
  },
  function(e, t, n) {
    'use strict';
    var i = n(35),
      r = n(10),
      o = n(112),
      a = n(86),
      s = n(8),
      l = n(42),
      c = n(59);
    e.exports = function(e) {
      var t,
        n,
        d,
        u,
        f,
        p = r(e),
        h = 'function' == typeof this ? this : Array,
        g = arguments.length,
        m = g > 1 ? arguments[1] : void 0,
        v = void 0 !== m,
        b = 0,
        w = c(p);
      if ((v && (m = i(m, g > 2 ? arguments[2] : void 0, 2)), null == w || (h == Array && a(w))))
        for (n = new h((t = s(p.length))); t > b; b++) l(n, b, v ? m(p[b], b) : p[b]);
      else
        for (f = (u = w.call(p)).next, n = new h(); !(d = f.call(u)).done; b++)
          l(n, b, v ? o(u, m, [d.value, b], !0) : d.value);
      return (n.length = b), n;
    };
  },
  function(e, t, n) {
    'use strict';
    var i = n(10),
      r = n(33),
      o = n(8),
      a = Math.min;
    e.exports =
      [].copyWithin ||
      function(e, t) {
        var n = i(this),
          s = o(n.length),
          l = r(e, s),
          c = r(t, s),
          d = arguments.length > 2 ? arguments[2] : void 0,
          u = a((void 0 === d ? s : r(d, s)) - c, s - l),
          f = 1;
        for (c < l && l < c + u && ((f = -1), (c += u - 1), (l += u - 1)); u-- > 0; )
          c in n ? (n[l] = n[c]) : delete n[l], (l += f), (c += f);
        return n;
      };
  },
  function(e, t, n) {
    'use strict';
    var i = n(40),
      r = n(8),
      o = n(35),
      a = function(e, t, n, s, l, c, d, u) {
        for (var f, p = l, h = 0, g = !!d && o(d, u, 3); h < s; ) {
          if (h in n) {
            if (((f = g ? g(n[h], h, t) : n[h]), c > 0 && i(f))) p = a(e, t, f, r(f.length), p, c - 1) - 1;
            else {
              if (p >= 9007199254740991) throw TypeError('Exceed the acceptable array length');
              e[p] = f;
            }
            p++;
          }
          h++;
        }
        return p;
      };
    e.exports = a;
  },
  function(e, t, n) {
    'use strict';
    var i = n(12).forEach,
      r = n(29);
    e.exports = r('forEach')
      ? function(e) {
          return i(this, e, arguments.length > 1 ? arguments[1] : void 0);
        }
      : [].forEach;
  },
  function(e, t, n) {
    'use strict';
    var i = n(19),
      r = n(23),
      o = n(8),
      a = n(29),
      s = Math.min,
      l = [].lastIndexOf,
      c = !!l && 1 / [1].lastIndexOf(1, -0) < 0,
      d = a('lastIndexOf');
    e.exports =
      c || d
        ? function(e) {
            if (c) return l.apply(this, arguments) || 0;
            var t = i(this),
              n = o(t.length),
              a = n - 1;
            for (arguments.length > 1 && (a = s(a, r(arguments[1]))), a < 0 && (a = n + a); a >= 0; a--)
              if (a in t && t[a] === e) return a || 0;
            return -1;
          }
        : l;
  },
  function(e, t, n) {
    'use strict';
    var i,
      r,
      o,
      a = n(27),
      s = n(13),
      l = n(11),
      c = n(7),
      d = n(28),
      u = c('iterator'),
      f = !1;
    [].keys && ('next' in (o = [].keys()) ? (r = a(a(o))) !== Object.prototype && (i = r) : (f = !0)),
      null == i && (i = {}),
      d ||
        l(i, u) ||
        s(i, u, function() {
          return this;
        }),
      (e.exports = { IteratorPrototype: i, BUGGY_SAFARI_ITERATORS: f });
  },
  function(e, t, n) {
    var i = n(63);
    e.exports = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);
  },
  function(e, t, n) {
    'use strict';
    var i = n(70).charAt,
      r = n(20),
      o = n(89),
      a = r.set,
      s = r.getterFor('String Iterator');
    o(
      String,
      'String',
      function(e) {
        a(this, { type: 'String Iterator', string: String(e), index: 0 });
      },
      function() {
        var e,
          t = s(this),
          n = t.string,
          r = t.index;
        return r >= n.length
          ? { value: void 0, done: !0 }
          : ((e = i(n, r)), (t.index += e.length), { value: e, done: !1 });
      }
    );
  },
  function(e, t, n) {
    var i = n(2),
      r = n(47).trim,
      o = n(76),
      a = i.parseInt,
      s = /^[+-]?0[Xx]/,
      l = 8 !== a(o + '08') || 22 !== a(o + '0x16');
    e.exports = l
      ? function(e, t) {
          var n = r(String(e));
          return a(n, t >>> 0 || (s.test(n) ? 16 : 10));
        }
      : a;
  },
  function(e, t, n) {
    var i = n(2),
      r = n(47).trim,
      o = n(76),
      a = i.parseFloat,
      s = 1 / a(o + '-0') != -1 / 0;
    e.exports = s
      ? function(e) {
          var t = r(String(e)),
            n = a(t);
          return 0 === n && '-' == t.charAt(0) ? -0 : n;
        }
      : a;
  },
  function(e, t, n) {
    var i = n(3),
      r = Math.floor;
    e.exports = function(e) {
      return !i(e) && isFinite(e) && r(e) === e;
    };
  },
  function(e, t, n) {
    var i = n(24);
    e.exports = function(e) {
      if ('number' != typeof e && 'Number' != i(e)) throw TypeError('Incorrect invocation');
      return +e;
    };
  },
  function(e, t) {
    var n = Math.log;
    e.exports =
      Math.log1p ||
      function(e) {
        return (e = +e) > -1e-8 && e < 1e-8 ? e - (e * e) / 2 : n(1 + e);
      };
  },
  function(e, t, n) {
    var i = n(2);
    e.exports = i.Promise;
  },
  function(e, t, n) {
    var i,
      r,
      o,
      a,
      s,
      l,
      c,
      d,
      u = n(2),
      f = n(16).f,
      p = n(24),
      h = n(98).set,
      g = n(63),
      m = u.MutationObserver || u.WebKitMutationObserver,
      v = u.process,
      b = u.Promise,
      w = 'process' == p(v),
      S = f(u, 'queueMicrotask'),
      y = S && S.value;
    y ||
      ((i = function() {
        var e, t;
        for (w && (e = v.domain) && e.exit(); r; ) {
          (t = r.fn), (r = r.next);
          try {
            t();
          } catch (e) {
            throw (r ? a() : (o = void 0), e);
          }
        }
        (o = void 0), e && e.enter();
      }),
      w
        ? (a = function() {
            v.nextTick(i);
          })
        : m && !/(iphone|ipod|ipad).*applewebkit/i.test(g)
        ? ((s = !0),
          (l = document.createTextNode('')),
          new m(i).observe(l, { characterData: !0 }),
          (a = function() {
            l.data = s = !s;
          }))
        : b && b.resolve
        ? ((c = b.resolve(void 0)),
          (d = c.then),
          (a = function() {
            d.call(c, i);
          }))
        : (a = function() {
            h.call(u, i);
          })),
      (e.exports =
        y ||
        function(e) {
          var t = { fn: e, next: void 0 };
          o && (o.next = t), r || ((r = t), a()), (o = t);
        });
  },
  function(e, t, n) {
    var i = n(4),
      r = n(3),
      o = n(99);
    e.exports = function(e, t) {
      if ((i(e), r(t) && t.constructor === e)) return t;
      var n = o.f(e);
      return (0, n.resolve)(t), n.promise;
    };
  },
  function(e, t) {
    e.exports = function(e) {
      try {
        return { error: !1, value: e() };
      } catch (e) {
        return { error: !0, value: e };
      }
    };
  },
  function(e, t, n) {
    'use strict';
    var i = n(9).f,
      r = n(34),
      o = n(48),
      a = n(35),
      s = n(37),
      l = n(44),
      c = n(89),
      d = n(46),
      u = n(6),
      f = n(41).fastKey,
      p = n(20),
      h = p.set,
      g = p.getterFor;
    e.exports = {
      getConstructor: function(e, t, n, c) {
        var d = e(function(e, i) {
            s(e, d, t),
              h(e, { type: t, index: r(null), first: void 0, last: void 0, size: 0 }),
              u || (e.size = 0),
              null != i && l(i, e[c], e, n);
          }),
          p = g(t),
          m = function(e, t, n) {
            var i,
              r,
              o = p(e),
              a = v(e, t);
            return (
              a
                ? (a.value = n)
                : ((o.last = a = {
                    index: (r = f(t, !0)),
                    key: t,
                    value: n,
                    previous: (i = o.last),
                    next: void 0,
                    removed: !1
                  }),
                  o.first || (o.first = a),
                  i && (i.next = a),
                  u ? o.size++ : e.size++,
                  'F' !== r && (o.index[r] = a)),
              e
            );
          },
          v = function(e, t) {
            var n,
              i = p(e),
              r = f(t);
            if ('F' !== r) return i.index[r];
            for (n = i.first; n; n = n.next) if (n.key == t) return n;
          };
        return (
          o(d.prototype, {
            clear: function() {
              for (var e = p(this), t = e.index, n = e.first; n; )
                (n.removed = !0),
                  n.previous && (n.previous = n.previous.next = void 0),
                  delete t[n.index],
                  (n = n.next);
              (e.first = e.last = void 0), u ? (e.size = 0) : (this.size = 0);
            },
            delete: function(e) {
              var t = p(this),
                n = v(this, e);
              if (n) {
                var i = n.next,
                  r = n.previous;
                delete t.index[n.index],
                  (n.removed = !0),
                  r && (r.next = i),
                  i && (i.previous = r),
                  t.first == n && (t.first = i),
                  t.last == n && (t.last = r),
                  u ? t.size-- : this.size--;
              }
              return !!n;
            },
            forEach: function(e) {
              for (
                var t, n = p(this), i = a(e, arguments.length > 1 ? arguments[1] : void 0, 3);
                (t = t ? t.next : n.first);

              )
                for (i(t.value, t.key, this); t && t.removed; ) t = t.previous;
            },
            has: function(e) {
              return !!v(this, e);
            }
          }),
          o(
            d.prototype,
            n
              ? {
                  get: function(e) {
                    var t = v(this, e);
                    return t && t.value;
                  },
                  set: function(e, t) {
                    return m(this, 0 === e ? 0 : e, t);
                  }
                }
              : {
                  add: function(e) {
                    return m(this, (e = 0 === e ? 0 : e), e);
                  }
                }
          ),
          u &&
            i(d.prototype, 'size', {
              get: function() {
                return p(this).size;
              }
            }),
          d
        );
      },
      setStrong: function(e, t, n) {
        var i = t + ' Iterator',
          r = g(t),
          o = g(i);
        c(
          e,
          t,
          function(e, t) {
            h(this, { type: i, target: e, state: r(e), kind: t, last: void 0 });
          },
          function() {
            for (var e = o(this), t = e.kind, n = e.last; n && n.removed; ) n = n.previous;
            return e.target && (e.last = n = n ? n.next : e.state.first)
              ? 'keys' == t
                ? { value: n.key, done: !1 }
                : 'values' == t
                ? { value: n.value, done: !1 }
                : { value: [n.key, n.value], done: !1 }
              : ((e.target = void 0), { value: void 0, done: !0 });
          },
          n ? 'entries' : 'values',
          !n,
          !0
        ),
          d(t);
      }
    };
  },
  function(e, t, n) {
    'use strict';
    var i = n(48),
      r = n(41).getWeakData,
      o = n(4),
      a = n(3),
      s = n(37),
      l = n(44),
      c = n(12),
      d = n(11),
      u = n(20),
      f = u.set,
      p = u.getterFor,
      h = c.find,
      g = c.findIndex,
      m = 0,
      v = function(e) {
        return e.frozen || (e.frozen = new b());
      },
      b = function() {
        this.entries = [];
      },
      w = function(e, t) {
        return h(e.entries, function(e) {
          return e[0] === t;
        });
      };
    (b.prototype = {
      get: function(e) {
        var t = w(this, e);
        if (t) return t[1];
      },
      has: function(e) {
        return !!w(this, e);
      },
      set: function(e, t) {
        var n = w(this, e);
        n ? (n[1] = t) : this.entries.push([e, t]);
      },
      delete: function(e) {
        var t = g(this.entries, function(t) {
          return t[0] === e;
        });
        return ~t && this.entries.splice(t, 1), !!~t;
      }
    }),
      (e.exports = {
        getConstructor: function(e, t, n, c) {
          var u = e(function(e, i) {
              s(e, u, t), f(e, { type: t, id: m++, frozen: void 0 }), null != i && l(i, e[c], e, n);
            }),
            h = p(t),
            g = function(e, t, n) {
              var i = h(e),
                a = r(o(t), !0);
              return !0 === a ? v(i).set(t, n) : (a[i.id] = n), e;
            };
          return (
            i(u.prototype, {
              delete: function(e) {
                var t = h(this);
                if (!a(e)) return !1;
                var n = r(e);
                return !0 === n ? v(t).delete(e) : n && d(n, t.id) && delete n[t.id];
              },
              has: function(e) {
                var t = h(this);
                if (!a(e)) return !1;
                var n = r(e);
                return !0 === n ? v(t).has(e) : n && d(n, t.id);
              }
            }),
            i(
              u.prototype,
              n
                ? {
                    get: function(e) {
                      var t = h(this);
                      if (a(e)) {
                        var n = r(e);
                        return !0 === n ? v(t).get(e) : n ? n[t.id] : void 0;
                      }
                    },
                    set: function(e, t) {
                      return g(this, e, t);
                    }
                  }
                : {
                    add: function(e) {
                      return g(this, e, !0);
                    }
                  }
            ),
            u
          );
        }
      });
  },
  function(e, t, n) {
    var i = n(23),
      r = n(8);
    e.exports = function(e) {
      if (void 0 === e) return 0;
      var t = i(e),
        n = r(t);
      if (t !== n) throw RangeError('Wrong length or index');
      return n;
    };
  },
  function(e, t, n) {
    var i = n(329);
    e.exports = function(e, t) {
      var n = i(e);
      if (n % t) throw RangeError('Wrong offset');
      return n;
    };
  },
  function(e, t, n) {
    var i = n(10),
      r = n(8),
      o = n(59),
      a = n(86),
      s = n(35),
      l = n(5).aTypedArrayConstructor;
    e.exports = function(e) {
      var t,
        n,
        c,
        d,
        u,
        f,
        p = i(e),
        h = arguments.length,
        g = h > 1 ? arguments[1] : void 0,
        m = void 0 !== g,
        v = o(p);
      if (null != v && !a(v)) for (f = (u = v.call(p)).next, p = []; !(d = f.call(u)).done; ) p.push(d.value);
      for (m && h > 2 && (g = s(g, arguments[2], 2)), n = r(p.length), c = new (l(this))(n), t = 0; n > t; t++)
        c[t] = m ? g(p[t], t) : p[t];
      return c;
    };
  },
  function(e, t) {
    e.exports = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
    };
  },
  function(e, t, n) {
    var i = n(1),
      r = n(7),
      o = n(28),
      a = r('iterator');
    e.exports = !i(function() {
      var e = new URL('b?a=1&b=2&c=3', 'http://a'),
        t = e.searchParams,
        n = '';
      return (
        (e.pathname = 'c%20d'),
        t.forEach(function(e, i) {
          t.delete('b'), (n += i + e);
        }),
        (o && !e.toJSON) ||
          !t.sort ||
          'http://a/c%20d?a=1&c=3' !== e.href ||
          '3' !== t.get('c') ||
          'a=1' !== String(new URLSearchParams('?a=1')) ||
          !t[a] ||
          'a' !== new URL('https://a@b').username ||
          'b' !== new URLSearchParams(new URLSearchParams('a=b')).get('a') ||
          'xn--e1aybc' !== new URL('http://тест').host ||
          '#%D0%B1' !== new URL('http://a#б').hash ||
          'a1c3' !== n ||
          'x' !== new URL('http://x', void 0).host
      );
    });
  },
  function(e, t, n) {
    'use strict';
    n(69);
    var i = n(0),
      r = n(139),
      o = n(14),
      a = n(48),
      s = n(26),
      l = n(90),
      c = n(20),
      d = n(37),
      u = n(11),
      f = n(35),
      p = n(4),
      h = n(3),
      g = n(384),
      m = n(59),
      v = n(7)('iterator'),
      b = c.set,
      w = c.getterFor('URLSearchParams'),
      S = c.getterFor('URLSearchParamsIterator'),
      y = /\+/g,
      _ = Array(4),
      C = function(e) {
        return _[e - 1] || (_[e - 1] = RegExp('((?:%[\\da-f]{2}){' + e + '})', 'gi'));
      },
      x = function(e) {
        try {
          return decodeURIComponent(e);
        } catch (t) {
          return e;
        }
      },
      I = function(e) {
        var t = e.replace(y, ' '),
          n = 4;
        try {
          return decodeURIComponent(t);
        } catch (e) {
          for (; n; ) t = t.replace(C(n--), x);
          return t;
        }
      },
      T = /[!'()~]|%20/g,
      N = { '!': '%21', "'": '%27', '(': '%28', ')': '%29', '~': '%7E', '%20': '+' },
      k = function(e) {
        return N[e];
      },
      $ = function(e) {
        return encodeURIComponent(e).replace(T, k);
      },
      P = function(e, t) {
        if (t)
          for (var n, i, r = t.split('&'), o = 0; o < r.length; )
            (n = r[o++]).length && ((i = n.split('=')), e.push({ key: I(i.shift()), value: I(i.join('=')) }));
      },
      E = function(e) {
        (this.entries.length = 0), P(this.entries, e);
      },
      L = function(e, t) {
        if (e < t) throw TypeError('Not enough arguments');
      },
      R = l(
        function(e, t) {
          b(this, { type: 'URLSearchParamsIterator', iterator: g(w(e).entries), kind: t });
        },
        'Iterator',
        function() {
          var e = S(this),
            t = e.kind,
            n = e.iterator.next(),
            i = n.value;
          return n.done || (n.value = 'keys' === t ? i.key : 'values' === t ? i.value : [i.key, i.value]), n;
        }
      ),
      A = function() {
        d(this, A, 'URLSearchParams');
        var e,
          t,
          n,
          i,
          r,
          o,
          a,
          s,
          l,
          c = arguments.length > 0 ? arguments[0] : void 0,
          f = this,
          v = [];
        if (
          (b(f, { type: 'URLSearchParams', entries: v, updateURL: function() {}, updateSearchParams: E }), void 0 !== c)
        )
          if (h(c))
            if ('function' == typeof (e = m(c)))
              for (n = (t = e.call(c)).next; !(i = n.call(t)).done; ) {
                if ((a = (o = (r = g(p(i.value))).next).call(r)).done || (s = o.call(r)).done || !o.call(r).done)
                  throw TypeError('Expected sequence with length 2');
                v.push({ key: a.value + '', value: s.value + '' });
              }
            else for (l in c) u(c, l) && v.push({ key: l, value: c[l] + '' });
          else P(v, 'string' == typeof c ? ('?' === c.charAt(0) ? c.slice(1) : c) : c + '');
      },
      D = A.prototype;
    a(
      D,
      {
        append: function(e, t) {
          L(arguments.length, 2);
          var n = w(this);
          n.entries.push({ key: e + '', value: t + '' }), n.updateURL();
        },
        delete: function(e) {
          L(arguments.length, 1);
          for (var t = w(this), n = t.entries, i = e + '', r = 0; r < n.length; ) n[r].key === i ? n.splice(r, 1) : r++;
          t.updateURL();
        },
        get: function(e) {
          L(arguments.length, 1);
          for (var t = w(this).entries, n = e + '', i = 0; i < t.length; i++) if (t[i].key === n) return t[i].value;
          return null;
        },
        getAll: function(e) {
          L(arguments.length, 1);
          for (var t = w(this).entries, n = e + '', i = [], r = 0; r < t.length; r++)
            t[r].key === n && i.push(t[r].value);
          return i;
        },
        has: function(e) {
          L(arguments.length, 1);
          for (var t = w(this).entries, n = e + '', i = 0; i < t.length; ) if (t[i++].key === n) return !0;
          return !1;
        },
        set: function(e, t) {
          L(arguments.length, 1);
          for (var n, i = w(this), r = i.entries, o = !1, a = e + '', s = t + '', l = 0; l < r.length; l++)
            (n = r[l]).key === a && (o ? r.splice(l--, 1) : ((o = !0), (n.value = s)));
          o || r.push({ key: a, value: s }), i.updateURL();
        },
        sort: function() {
          var e,
            t,
            n,
            i = w(this),
            r = i.entries,
            o = r.slice();
          for (r.length = 0, n = 0; n < o.length; n++) {
            for (e = o[n], t = 0; t < n; t++)
              if (r[t].key > e.key) {
                r.splice(t, 0, e);
                break;
              }
            t === n && r.push(e);
          }
          i.updateURL();
        },
        forEach: function(e) {
          for (
            var t, n = w(this).entries, i = f(e, arguments.length > 1 ? arguments[1] : void 0, 3), r = 0;
            r < n.length;

          )
            i((t = n[r++]).value, t.key, this);
        },
        keys: function() {
          return new R(this, 'keys');
        },
        values: function() {
          return new R(this, 'values');
        },
        entries: function() {
          return new R(this, 'entries');
        }
      },
      { enumerable: !0 }
    ),
      o(D, v, D.entries),
      o(
        D,
        'toString',
        function() {
          for (var e, t = w(this).entries, n = [], i = 0; i < t.length; )
            (e = t[i++]), n.push($(e.key) + '=' + $(e.value));
          return n.join('&');
        },
        { enumerable: !0 }
      ),
      s(A, 'URLSearchParams'),
      i({ global: !0, forced: !r }, { URLSearchParams: A }),
      (e.exports = { URLSearchParams: A, getState: w });
  },
  function(e, t, n) {
    n(142),
      n(143),
      n(144),
      n(145),
      n(146),
      n(147),
      n(148),
      n(149),
      n(150),
      n(151),
      n(152),
      n(153),
      n(154),
      n(155),
      n(156),
      n(157),
      n(158),
      n(159),
      n(160),
      n(161),
      n(162),
      n(163),
      n(386),
      (e.exports = n(405));
  },
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {
    n(164), n(376), (e.exports = n(43));
  },
  function(e, t, n) {
    n(165),
      n(168),
      n(169),
      n(170),
      n(171),
      n(172),
      n(173),
      n(174),
      n(175),
      n(176),
      n(177),
      n(178),
      n(179),
      n(180),
      n(181),
      n(182),
      n(183),
      n(184),
      n(185),
      n(186),
      n(187),
      n(188),
      n(189),
      n(190),
      n(191),
      n(192),
      n(193),
      n(194),
      n(195),
      n(196),
      n(197),
      n(198),
      n(199),
      n(200),
      n(201),
      n(202),
      n(204),
      n(205),
      n(206),
      n(207),
      n(208),
      n(209),
      n(210),
      n(211),
      n(212),
      n(213),
      n(214),
      n(215),
      n(216),
      n(217),
      n(218),
      n(219),
      n(220),
      n(221),
      n(222),
      n(223),
      n(224),
      n(225),
      n(226),
      n(227),
      n(228),
      n(229),
      n(230),
      n(231),
      n(232),
      n(233),
      n(234),
      n(235),
      n(236),
      n(237),
      n(238),
      n(239),
      n(69),
      n(240),
      n(241),
      n(242),
      n(243),
      n(244),
      n(245),
      n(246),
      n(247),
      n(248),
      n(249),
      n(250),
      n(251),
      n(252),
      n(253),
      n(254),
      n(255),
      n(256),
      n(123),
      n(257),
      n(258),
      n(259),
      n(260),
      n(261),
      n(262),
      n(263),
      n(264),
      n(265),
      n(266),
      n(267),
      n(268),
      n(269),
      n(270),
      n(271),
      n(272),
      n(273),
      n(274),
      n(275),
      n(276),
      n(277),
      n(278),
      n(280),
      n(281),
      n(282),
      n(283),
      n(284),
      n(285),
      n(286),
      n(287),
      n(288),
      n(289),
      n(290),
      n(291),
      n(292),
      n(293),
      n(294),
      n(295),
      n(296),
      n(298),
      n(299),
      n(300),
      n(301),
      n(302),
      n(303),
      n(304),
      n(305),
      n(306),
      n(307),
      n(308),
      n(309),
      n(310),
      n(312),
      n(313),
      n(315),
      n(316),
      n(318),
      n(319),
      n(320),
      n(321),
      n(322),
      n(323),
      n(324),
      n(325),
      n(326),
      n(327),
      n(328),
      n(330),
      n(331),
      n(332),
      n(333),
      n(334),
      n(335),
      n(336),
      n(337),
      n(338),
      n(339),
      n(340),
      n(341),
      n(342),
      n(343),
      n(344),
      n(345),
      n(346),
      n(347),
      n(348),
      n(349),
      n(350),
      n(351),
      n(352),
      n(353),
      n(354),
      n(355),
      n(356),
      n(357),
      n(358),
      n(359),
      n(360),
      n(361),
      n(362),
      n(363),
      n(364),
      n(365),
      n(366),
      n(367),
      n(368),
      n(369),
      n(370),
      n(371),
      n(372),
      n(373),
      n(374),
      n(375),
      (e.exports = n(43));
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(2),
      o = n(28),
      a = n(6),
      s = n(106),
      l = n(1),
      c = n(11),
      d = n(40),
      u = n(3),
      f = n(4),
      p = n(10),
      h = n(19),
      g = n(25),
      m = n(38),
      v = n(34),
      b = n(55),
      w = n(39),
      S = n(108),
      y = n(84),
      _ = n(16),
      C = n(9),
      x = n(64),
      I = n(13),
      T = n(14),
      N = n(50),
      k = n(65),
      $ = n(52),
      P = n(51),
      E = n(7),
      L = n(109),
      R = n(17),
      A = n(26),
      D = n(20),
      O = n(12).forEach,
      V = k('hidden'),
      M = E('toPrimitive'),
      F = D.set,
      j = D.getterFor('Symbol'),
      U = Object.prototype,
      B = r.Symbol,
      z = r.JSON,
      W = z && z.stringify,
      G = _.f,
      H = C.f,
      q = S.f,
      K = x.f,
      J = N('symbols'),
      Y = N('op-symbols'),
      Q = N('string-to-symbol-registry'),
      X = N('symbol-to-string-registry'),
      Z = N('wks'),
      ee = r.QObject,
      te = !ee || !ee.prototype || !ee.prototype.findChild,
      ne =
        a &&
        l(function() {
          return (
            7 !=
            v(
              H({}, 'a', {
                get: function() {
                  return H(this, 'a', { value: 7 }).a;
                }
              })
            ).a
          );
        })
          ? function(e, t, n) {
              var i = G(U, t);
              i && delete U[t], H(e, t, n), i && e !== U && H(U, t, i);
            }
          : H,
      ie = function(e, t) {
        var n = (J[e] = v(B.prototype));
        return F(n, { type: 'Symbol', tag: e, description: t }), a || (n.description = t), n;
      },
      re =
        s && 'symbol' == typeof B.iterator
          ? function(e) {
              return 'symbol' == typeof e;
            }
          : function(e) {
              return Object(e) instanceof B;
            },
      oe = function(e, t, n) {
        e === U && oe(Y, t, n), f(e);
        var i = g(t, !0);
        return (
          f(n),
          c(J, i)
            ? (n.enumerable
                ? (c(e, V) && e[V][i] && (e[V][i] = !1), (n = v(n, { enumerable: m(0, !1) })))
                : (c(e, V) || H(e, V, m(1, {})), (e[V][i] = !0)),
              ne(e, i, n))
            : H(e, i, n)
        );
      },
      ae = function(e, t) {
        f(e);
        var n = h(t),
          i = b(n).concat(de(n));
        return (
          O(i, function(t) {
            (a && !se.call(n, t)) || oe(e, t, n[t]);
          }),
          e
        );
      },
      se = function(e) {
        var t = g(e, !0),
          n = K.call(this, t);
        return (
          !(this === U && c(J, t) && !c(Y, t)) && (!(n || !c(this, t) || !c(J, t) || (c(this, V) && this[V][t])) || n)
        );
      },
      le = function(e, t) {
        var n = h(e),
          i = g(t, !0);
        if (n !== U || !c(J, i) || c(Y, i)) {
          var r = G(n, i);
          return !r || !c(J, i) || (c(n, V) && n[V][i]) || (r.enumerable = !0), r;
        }
      },
      ce = function(e) {
        var t = q(h(e)),
          n = [];
        return (
          O(t, function(e) {
            c(J, e) || c($, e) || n.push(e);
          }),
          n
        );
      },
      de = function(e) {
        var t = e === U,
          n = q(t ? Y : h(e)),
          i = [];
        return (
          O(n, function(e) {
            !c(J, e) || (t && !c(U, e)) || i.push(J[e]);
          }),
          i
        );
      };
    s ||
      (T(
        (B = function() {
          if (this instanceof B) throw TypeError('Symbol is not a constructor');
          var e = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0,
            t = P(e),
            n = function(e) {
              this === U && n.call(Y, e), c(this, V) && c(this[V], t) && (this[V][t] = !1), ne(this, t, m(1, e));
            };
          return a && te && ne(U, t, { configurable: !0, set: n }), ie(t, e);
        }).prototype,
        'toString',
        function() {
          return j(this).tag;
        }
      ),
      (x.f = se),
      (C.f = oe),
      (_.f = le),
      (w.f = S.f = ce),
      (y.f = de),
      a &&
        (H(B.prototype, 'description', {
          configurable: !0,
          get: function() {
            return j(this).description;
          }
        }),
        o || T(U, 'propertyIsEnumerable', se, { unsafe: !0 })),
      (L.f = function(e) {
        return ie(E(e), e);
      })),
      i({ global: !0, wrap: !0, forced: !s, sham: !s }, { Symbol: B }),
      O(b(Z), function(e) {
        R(e);
      }),
      i(
        { target: 'Symbol', stat: !0, forced: !s },
        {
          for: function(e) {
            var t = String(e);
            if (c(Q, t)) return Q[t];
            var n = B(t);
            return (Q[t] = n), (X[n] = t), n;
          },
          keyFor: function(e) {
            if (!re(e)) throw TypeError(e + ' is not a symbol');
            if (c(X, e)) return X[e];
          },
          useSetter: function() {
            te = !0;
          },
          useSimple: function() {
            te = !1;
          }
        }
      ),
      i(
        { target: 'Object', stat: !0, forced: !s, sham: !a },
        {
          create: function(e, t) {
            return void 0 === t ? v(e) : ae(v(e), t);
          },
          defineProperty: oe,
          defineProperties: ae,
          getOwnPropertyDescriptor: le
        }
      ),
      i({ target: 'Object', stat: !0, forced: !s }, { getOwnPropertyNames: ce, getOwnPropertySymbols: de }),
      i(
        {
          target: 'Object',
          stat: !0,
          forced: l(function() {
            y.f(1);
          })
        },
        {
          getOwnPropertySymbols: function(e) {
            return y.f(p(e));
          }
        }
      ),
      z &&
        i(
          {
            target: 'JSON',
            stat: !0,
            forced:
              !s ||
              l(function() {
                var e = B();
                return '[null]' != W([e]) || '{}' != W({ a: e }) || '{}' != W(Object(e));
              })
          },
          {
            stringify: function(e) {
              for (var t, n, i = [e], r = 1; arguments.length > r; ) i.push(arguments[r++]);
              if (((n = t = i[1]), (u(t) || void 0 !== e) && !re(e)))
                return (
                  d(t) ||
                    (t = function(e, t) {
                      if (('function' == typeof n && (t = n.call(this, e, t)), !re(t))) return t;
                    }),
                  (i[1] = t),
                  W.apply(z, i)
                );
            }
          }
        ),
      B.prototype[M] || I(B.prototype, M, B.prototype.valueOf),
      A(B, 'Symbol'),
      ($[V] = !0);
  },
  function(e, t) {
    var n;
    n = (function() {
      return this;
    })();
    try {
      n = n || new Function('return this')();
    } catch (e) {
      'object' == typeof window && (n = window);
    }
    e.exports = n;
  },
  function(e, t, n) {
    var i = n(2),
      r = n(81),
      o = i['__core-js_shared__'] || r('__core-js_shared__', {});
    e.exports = o;
  },
  function(e, t, n) {
    n(17)('asyncIterator');
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(6),
      o = n(2),
      a = n(11),
      s = n(3),
      l = n(9).f,
      c = n(104),
      d = o.Symbol;
    if (r && 'function' == typeof d && (!('description' in d.prototype) || void 0 !== d().description)) {
      var u = {},
        f = function() {
          var e = arguments.length < 1 || void 0 === arguments[0] ? void 0 : String(arguments[0]),
            t = this instanceof f ? new d(e) : void 0 === e ? d() : d(e);
          return '' === e && (u[t] = !0), t;
        };
      c(f, d);
      var p = (f.prototype = d.prototype);
      p.constructor = f;
      var h = p.toString,
        g = 'Symbol(test)' == String(d('test')),
        m = /^Symbol\((.*)\)[^)]+$/;
      l(p, 'description', {
        configurable: !0,
        get: function() {
          var e = s(this) ? this.valueOf() : this,
            t = h.call(e);
          if (a(u, e)) return '';
          var n = g ? t.slice(7, -1) : t.replace(m, '$1');
          return '' === n ? void 0 : n;
        }
      }),
        i({ global: !0, forced: !0 }, { Symbol: f });
    }
  },
  function(e, t, n) {
    n(17)('hasInstance');
  },
  function(e, t, n) {
    n(17)('isConcatSpreadable');
  },
  function(e, t, n) {
    n(17)('iterator');
  },
  function(e, t, n) {
    n(17)('match');
  },
  function(e, t, n) {
    n(17)('matchAll');
  },
  function(e, t, n) {
    n(17)('replace');
  },
  function(e, t, n) {
    n(17)('search');
  },
  function(e, t, n) {
    n(17)('species');
  },
  function(e, t, n) {
    n(17)('split');
  },
  function(e, t, n) {
    n(17)('toPrimitive');
  },
  function(e, t, n) {
    n(17)('toStringTag');
  },
  function(e, t, n) {
    n(17)('unscopables');
  },
  function(e, t, n) {
    var i = n(0),
      r = n(110);
    i({ target: 'Object', stat: !0, forced: Object.assign !== r }, { assign: r });
  },
  function(e, t, n) {
    n(0)({ target: 'Object', stat: !0, sham: !n(6) }, { create: n(34) });
  },
  function(e, t, n) {
    var i = n(0),
      r = n(6);
    i({ target: 'Object', stat: !0, forced: !r, sham: !r }, { defineProperty: n(9).f });
  },
  function(e, t, n) {
    var i = n(0),
      r = n(6);
    i({ target: 'Object', stat: !0, forced: !r, sham: !r }, { defineProperties: n(85) });
  },
  function(e, t, n) {
    var i = n(0),
      r = n(111).entries;
    i(
      { target: 'Object', stat: !0 },
      {
        entries: function(e) {
          return r(e);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(57),
      o = n(1),
      a = n(3),
      s = n(41).onFreeze,
      l = Object.freeze;
    i(
      {
        target: 'Object',
        stat: !0,
        forced: o(function() {
          l(1);
        }),
        sham: !r
      },
      {
        freeze: function(e) {
          return l && a(e) ? l(s(e)) : e;
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(44),
      o = n(42);
    i(
      { target: 'Object', stat: !0 },
      {
        fromEntries: function(e) {
          var t = {};
          return (
            r(
              e,
              function(e, n) {
                o(t, e, n);
              },
              void 0,
              !0
            ),
            t
          );
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(1),
      o = n(19),
      a = n(16).f,
      s = n(6),
      l = r(function() {
        a(1);
      });
    i(
      { target: 'Object', stat: !0, forced: !s || l, sham: !s },
      {
        getOwnPropertyDescriptor: function(e, t) {
          return a(o(e), t);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(6),
      o = n(82),
      a = n(19),
      s = n(16),
      l = n(42);
    i(
      { target: 'Object', stat: !0, sham: !r },
      {
        getOwnPropertyDescriptors: function(e) {
          for (var t, n, i = a(e), r = s.f, c = o(i), d = {}, u = 0; c.length > u; )
            void 0 !== (n = r(i, (t = c[u++]))) && l(d, t, n);
          return d;
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(1),
      o = n(108).f;
    i(
      {
        target: 'Object',
        stat: !0,
        forced: r(function() {
          return !Object.getOwnPropertyNames(1);
        })
      },
      { getOwnPropertyNames: o }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(1),
      o = n(10),
      a = n(27),
      s = n(87);
    i(
      {
        target: 'Object',
        stat: !0,
        forced: r(function() {
          a(1);
        }),
        sham: !s
      },
      {
        getPrototypeOf: function(e) {
          return a(o(e));
        }
      }
    );
  },
  function(e, t, n) {
    n(0)({ target: 'Object', stat: !0 }, { is: n(113) });
  },
  function(e, t, n) {
    var i = n(0),
      r = n(1),
      o = n(3),
      a = Object.isExtensible;
    i(
      {
        target: 'Object',
        stat: !0,
        forced: r(function() {
          a(1);
        })
      },
      {
        isExtensible: function(e) {
          return !!o(e) && (!a || a(e));
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(1),
      o = n(3),
      a = Object.isFrozen;
    i(
      {
        target: 'Object',
        stat: !0,
        forced: r(function() {
          a(1);
        })
      },
      {
        isFrozen: function(e) {
          return !o(e) || (!!a && a(e));
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(1),
      o = n(3),
      a = Object.isSealed;
    i(
      {
        target: 'Object',
        stat: !0,
        forced: r(function() {
          a(1);
        })
      },
      {
        isSealed: function(e) {
          return !o(e) || (!!a && a(e));
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(10),
      o = n(55);
    i(
      {
        target: 'Object',
        stat: !0,
        forced: n(1)(function() {
          o(1);
        })
      },
      {
        keys: function(e) {
          return o(r(e));
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(3),
      o = n(41).onFreeze,
      a = n(57),
      s = n(1),
      l = Object.preventExtensions;
    i(
      {
        target: 'Object',
        stat: !0,
        forced: s(function() {
          l(1);
        }),
        sham: !a
      },
      {
        preventExtensions: function(e) {
          return l && r(e) ? l(o(e)) : e;
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(3),
      o = n(41).onFreeze,
      a = n(57),
      s = n(1),
      l = Object.seal;
    i(
      {
        target: 'Object',
        stat: !0,
        forced: s(function() {
          l(1);
        }),
        sham: !a
      },
      {
        seal: function(e) {
          return l && r(e) ? l(o(e)) : e;
        }
      }
    );
  },
  function(e, t, n) {
    n(0)({ target: 'Object', stat: !0 }, { setPrototypeOf: n(45) });
  },
  function(e, t, n) {
    var i = n(0),
      r = n(111).values;
    i(
      { target: 'Object', stat: !0 },
      {
        values: function(e) {
          return r(e);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(14),
      r = n(203),
      o = Object.prototype;
    r !== o.toString && i(o, 'toString', r, { unsafe: !0 });
  },
  function(e, t, n) {
    'use strict';
    var i = n(60),
      r = {};
    (r[n(7)('toStringTag')] = 'z'),
      (e.exports =
        '[object z]' !== String(r)
          ? function() {
              return '[object ' + i(this) + ']';
            }
          : r.toString);
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(6),
      o = n(66),
      a = n(10),
      s = n(18),
      l = n(9);
    r &&
      i(
        { target: 'Object', proto: !0, forced: o },
        {
          __defineGetter__: function(e, t) {
            l.f(a(this), e, { get: s(t), enumerable: !0, configurable: !0 });
          }
        }
      );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(6),
      o = n(66),
      a = n(10),
      s = n(18),
      l = n(9);
    r &&
      i(
        { target: 'Object', proto: !0, forced: o },
        {
          __defineSetter__: function(e, t) {
            l.f(a(this), e, { set: s(t), enumerable: !0, configurable: !0 });
          }
        }
      );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(6),
      o = n(66),
      a = n(10),
      s = n(25),
      l = n(27),
      c = n(16).f;
    r &&
      i(
        { target: 'Object', proto: !0, forced: o },
        {
          __lookupGetter__: function(e) {
            var t,
              n = a(this),
              i = s(e, !0);
            do {
              if ((t = c(n, i))) return t.get;
            } while ((n = l(n)));
          }
        }
      );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(6),
      o = n(66),
      a = n(10),
      s = n(25),
      l = n(27),
      c = n(16).f;
    r &&
      i(
        { target: 'Object', proto: !0, forced: o },
        {
          __lookupSetter__: function(e) {
            var t,
              n = a(this),
              i = s(e, !0);
            do {
              if ((t = c(n, i))) return t.set;
            } while ((n = l(n)));
          }
        }
      );
  },
  function(e, t, n) {
    n(0)({ target: 'Function', proto: !0 }, { bind: n(115) });
  },
  function(e, t, n) {
    var i = n(6),
      r = n(9).f,
      o = Function.prototype,
      a = o.toString,
      s = /^\s*function ([^ (]*)/;
    !i ||
      'name' in o ||
      r(o, 'name', {
        configurable: !0,
        get: function() {
          try {
            return a.call(this).match(s)[1];
          } catch (e) {
            return '';
          }
        }
      });
  },
  function(e, t, n) {
    'use strict';
    var i = n(3),
      r = n(9),
      o = n(27),
      a = n(7)('hasInstance'),
      s = Function.prototype;
    a in s ||
      r.f(s, a, {
        value: function(e) {
          if ('function' != typeof this || !i(e)) return !1;
          if (!i(this.prototype)) return e instanceof this;
          for (; (e = o(e)); ) if (this.prototype === e) return !0;
          return !1;
        }
      });
  },
  function(e, t, n) {
    n(0)({ global: !0 }, { globalThis: n(2) });
  },
  function(e, t, n) {
    var i = n(0),
      r = n(116);
    i(
      {
        target: 'Array',
        stat: !0,
        forced: !n(67)(function(e) {
          Array.from(e);
        })
      },
      { from: r }
    );
  },
  function(e, t, n) {
    n(0)({ target: 'Array', stat: !0 }, { isArray: n(40) });
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(1),
      o = n(42);
    i(
      {
        target: 'Array',
        stat: !0,
        forced: r(function() {
          function e() {}
          return !(Array.of.call(e) instanceof e);
        })
      },
      {
        of: function() {
          for (var e = 0, t = arguments.length, n = new ('function' == typeof this ? this : Array)(t); t > e; )
            o(n, e, arguments[e++]);
          return (n.length = t), n;
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(1),
      o = n(40),
      a = n(3),
      s = n(10),
      l = n(8),
      c = n(42),
      d = n(56),
      u = n(61),
      f = n(7)('isConcatSpreadable'),
      p = !r(function() {
        var e = [];
        return (e[f] = !1), e.concat()[0] !== e;
      }),
      h = u('concat'),
      g = function(e) {
        if (!a(e)) return !1;
        var t = e[f];
        return void 0 !== t ? !!t : o(e);
      };
    i(
      { target: 'Array', proto: !0, forced: !p || !h },
      {
        concat: function(e) {
          var t,
            n,
            i,
            r,
            o,
            a = s(this),
            u = d(a, 0),
            f = 0;
          for (t = -1, i = arguments.length; t < i; t++)
            if (((o = -1 === t ? a : arguments[t]), g(o))) {
              if (f + (r = l(o.length)) > 9007199254740991) throw TypeError('Maximum allowed index exceeded');
              for (n = 0; n < r; n++, f++) n in o && c(u, f, o[n]);
            } else {
              if (f >= 9007199254740991) throw TypeError('Maximum allowed index exceeded');
              c(u, f++, o);
            }
          return (u.length = f), u;
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(117),
      o = n(36);
    i({ target: 'Array', proto: !0 }, { copyWithin: r }), o('copyWithin');
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(12).every;
    i(
      { target: 'Array', proto: !0, forced: n(29)('every') },
      {
        every: function(e) {
          return r(this, e, arguments.length > 1 ? arguments[1] : void 0);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(88),
      o = n(36);
    i({ target: 'Array', proto: !0 }, { fill: r }), o('fill');
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(12).filter;
    i(
      { target: 'Array', proto: !0, forced: !n(61)('filter') },
      {
        filter: function(e) {
          return r(this, e, arguments.length > 1 ? arguments[1] : void 0);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(12).find,
      o = n(36),
      a = !0;
    'find' in [] &&
      Array(1).find(function() {
        a = !1;
      }),
      i(
        { target: 'Array', proto: !0, forced: a },
        {
          find: function(e) {
            return r(this, e, arguments.length > 1 ? arguments[1] : void 0);
          }
        }
      ),
      o('find');
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(12).findIndex,
      o = n(36),
      a = !0;
    'findIndex' in [] &&
      Array(1).findIndex(function() {
        a = !1;
      }),
      i(
        { target: 'Array', proto: !0, forced: a },
        {
          findIndex: function(e) {
            return r(this, e, arguments.length > 1 ? arguments[1] : void 0);
          }
        }
      ),
      o('findIndex');
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(118),
      o = n(10),
      a = n(8),
      s = n(23),
      l = n(56);
    i(
      { target: 'Array', proto: !0 },
      {
        flat: function() {
          var e = arguments.length ? arguments[0] : void 0,
            t = o(this),
            n = a(t.length),
            i = l(t, 0);
          return (i.length = r(i, t, t, n, 0, void 0 === e ? 1 : s(e))), i;
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(118),
      o = n(10),
      a = n(8),
      s = n(18),
      l = n(56);
    i(
      { target: 'Array', proto: !0 },
      {
        flatMap: function(e) {
          var t,
            n = o(this),
            i = a(n.length);
          return s(e), ((t = l(n, 0)).length = r(t, n, n, i, 0, 1, e, arguments.length > 1 ? arguments[1] : void 0)), t;
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(119);
    i({ target: 'Array', proto: !0, forced: [].forEach != r }, { forEach: r });
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(53).includes,
      o = n(36);
    i(
      { target: 'Array', proto: !0 },
      {
        includes: function(e) {
          return r(this, e, arguments.length > 1 ? arguments[1] : void 0);
        }
      }
    ),
      o('includes');
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(53).indexOf,
      o = n(29),
      a = [].indexOf,
      s = !!a && 1 / [1].indexOf(1, -0) < 0,
      l = o('indexOf');
    i(
      { target: 'Array', proto: !0, forced: s || l },
      {
        indexOf: function(e) {
          return s ? a.apply(this, arguments) || 0 : r(this, e, arguments.length > 1 ? arguments[1] : void 0);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(49),
      o = n(19),
      a = n(29),
      s = [].join,
      l = r != Object,
      c = a('join', ',');
    i(
      { target: 'Array', proto: !0, forced: l || c },
      {
        join: function(e) {
          return s.call(o(this), void 0 === e ? ',' : e);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(120);
    i({ target: 'Array', proto: !0, forced: r !== [].lastIndexOf }, { lastIndexOf: r });
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(12).map;
    i(
      { target: 'Array', proto: !0, forced: !n(61)('map') },
      {
        map: function(e) {
          return r(this, e, arguments.length > 1 ? arguments[1] : void 0);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(68).left;
    i(
      { target: 'Array', proto: !0, forced: n(29)('reduce') },
      {
        reduce: function(e) {
          return r(this, e, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(68).right;
    i(
      { target: 'Array', proto: !0, forced: n(29)('reduceRight') },
      {
        reduceRight: function(e) {
          return r(this, e, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(40),
      o = [].reverse,
      a = [1, 2];
    i(
      { target: 'Array', proto: !0, forced: String(a) === String(a.reverse()) },
      {
        reverse: function() {
          return r(this) && (this.length = this.length), o.call(this);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(3),
      o = n(40),
      a = n(33),
      s = n(8),
      l = n(19),
      c = n(42),
      d = n(61),
      u = n(7)('species'),
      f = [].slice,
      p = Math.max;
    i(
      { target: 'Array', proto: !0, forced: !d('slice') },
      {
        slice: function(e, t) {
          var n,
            i,
            d,
            h = l(this),
            g = s(h.length),
            m = a(e, g),
            v = a(void 0 === t ? g : t, g);
          if (
            o(h) &&
            ('function' != typeof (n = h.constructor) || (n !== Array && !o(n.prototype))
              ? r(n) && null === (n = n[u]) && (n = void 0)
              : (n = void 0),
            n === Array || void 0 === n)
          )
            return f.call(h, m, v);
          for (i = new (void 0 === n ? Array : n)(p(v - m, 0)), d = 0; m < v; m++, d++) m in h && c(i, d, h[m]);
          return (i.length = d), i;
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(12).some;
    i(
      { target: 'Array', proto: !0, forced: n(29)('some') },
      {
        some: function(e) {
          return r(this, e, arguments.length > 1 ? arguments[1] : void 0);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(18),
      o = n(10),
      a = n(1),
      s = n(29),
      l = [].sort,
      c = [1, 2, 3],
      d = a(function() {
        c.sort(void 0);
      }),
      u = a(function() {
        c.sort(null);
      }),
      f = s('sort');
    i(
      { target: 'Array', proto: !0, forced: d || !u || f },
      {
        sort: function(e) {
          return void 0 === e ? l.call(o(this)) : l.call(o(this), r(e));
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(33),
      o = n(23),
      a = n(8),
      s = n(10),
      l = n(56),
      c = n(42),
      d = n(61),
      u = Math.max,
      f = Math.min;
    i(
      { target: 'Array', proto: !0, forced: !d('splice') },
      {
        splice: function(e, t) {
          var n,
            i,
            d,
            p,
            h,
            g,
            m = s(this),
            v = a(m.length),
            b = r(e, v),
            w = arguments.length;
          if (
            (0 === w ? (n = i = 0) : 1 === w ? ((n = 0), (i = v - b)) : ((n = w - 2), (i = f(u(o(t), 0), v - b))),
            v + n - i > 9007199254740991)
          )
            throw TypeError('Maximum allowed length exceeded');
          for (d = l(m, i), p = 0; p < i; p++) (h = b + p) in m && c(d, p, m[h]);
          if (((d.length = i), n < i)) {
            for (p = b; p < v - i; p++) (g = p + n), (h = p + i) in m ? (m[g] = m[h]) : delete m[g];
            for (p = v; p > v - i + n; p--) delete m[p - 1];
          } else if (n > i)
            for (p = v - i; p > b; p--) (g = p + n - 1), (h = p + i - 1) in m ? (m[g] = m[h]) : delete m[g];
          for (p = 0; p < n; p++) m[p + b] = arguments[p + 2];
          return (m.length = v - i + n), d;
        }
      }
    );
  },
  function(e, t, n) {
    n(46)('Array');
  },
  function(e, t, n) {
    n(36)('flat');
  },
  function(e, t, n) {
    n(36)('flatMap');
  },
  function(e, t, n) {
    var i = n(0),
      r = n(33),
      o = String.fromCharCode,
      a = String.fromCodePoint;
    i(
      { target: 'String', stat: !0, forced: !!a && 1 != a.length },
      {
        fromCodePoint: function(e) {
          for (var t, n = [], i = arguments.length, a = 0; i > a; ) {
            if (((t = +arguments[a++]), r(t, 1114111) !== t)) throw RangeError(t + ' is not a valid code point');
            n.push(t < 65536 ? o(t) : o(55296 + ((t -= 65536) >> 10), (t % 1024) + 56320));
          }
          return n.join('');
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(19),
      o = n(8);
    i(
      { target: 'String', stat: !0 },
      {
        raw: function(e) {
          for (var t = r(e.raw), n = o(t.length), i = arguments.length, a = [], s = 0; n > s; )
            a.push(String(t[s++])), s < i && a.push(String(arguments[s]));
          return a.join('');
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(70).codeAt;
    i(
      { target: 'String', proto: !0 },
      {
        codePointAt: function(e) {
          return r(this, e);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(8),
      o = n(91),
      a = n(15),
      s = n(92),
      l = ''.endsWith,
      c = Math.min;
    i(
      { target: 'String', proto: !0, forced: !s('endsWith') },
      {
        endsWith: function(e) {
          var t = String(a(this));
          o(e);
          var n = arguments.length > 1 ? arguments[1] : void 0,
            i = r(t.length),
            s = void 0 === n ? i : c(r(n), i),
            d = String(e);
          return l ? l.call(t, d, s) : t.slice(s - d.length, s) === d;
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(91),
      o = n(15);
    i(
      { target: 'String', proto: !0, forced: !n(92)('includes') },
      {
        includes: function(e) {
          return !!~String(o(this)).indexOf(r(e), arguments.length > 1 ? arguments[1] : void 0);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(72),
      r = n(4),
      o = n(8),
      a = n(15),
      s = n(74),
      l = n(75);
    i('match', 1, function(e, t, n) {
      return [
        function(t) {
          var n = a(this),
            i = null == t ? void 0 : t[e];
          return void 0 !== i ? i.call(t, n) : new RegExp(t)[e](String(n));
        },
        function(e) {
          var i = n(t, e, this);
          if (i.done) return i.value;
          var a = r(e),
            c = String(this);
          if (!a.global) return l(a, c);
          var d = a.unicode;
          a.lastIndex = 0;
          for (var u, f = [], p = 0; null !== (u = l(a, c)); ) {
            var h = String(u[0]);
            (f[p] = h), '' === h && (a.lastIndex = s(c, o(a.lastIndex), d)), p++;
          }
          return 0 === p ? null : f;
        }
      ];
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(90),
      o = n(15),
      a = n(8),
      s = n(18),
      l = n(4),
      c = n(60),
      d = n(71),
      u = n(62),
      f = n(13),
      p = n(1),
      h = n(7),
      g = n(30),
      m = n(74),
      v = n(20),
      b = n(28),
      w = h('matchAll'),
      S = v.set,
      y = v.getterFor('RegExp String Iterator'),
      _ = RegExp.prototype,
      C = _.exec,
      x = ''.matchAll,
      I =
        !!x &&
        !p(function() {
          'a'.matchAll(/./);
        }),
      T = r(
        function(e, t, n, i) {
          S(this, { type: 'RegExp String Iterator', regexp: e, string: t, global: n, unicode: i, done: !1 });
        },
        'RegExp String',
        function() {
          var e = y(this);
          if (e.done) return { value: void 0, done: !0 };
          var t = e.regexp,
            n = e.string,
            i = (function(e, t) {
              var n,
                i = e.exec;
              if ('function' == typeof i) {
                if ('object' != typeof (n = i.call(e, t))) throw TypeError('Incorrect exec result');
                return n;
              }
              return C.call(e, t);
            })(t, n);
          return null === i
            ? { value: void 0, done: (e.done = !0) }
            : e.global
            ? ('' == String(i[0]) && (t.lastIndex = m(n, a(t.lastIndex), e.unicode)), { value: i, done: !1 })
            : ((e.done = !0), { value: i, done: !1 });
        }
      ),
      N = function(e) {
        var t,
          n,
          i,
          r,
          o,
          s,
          c = l(this),
          d = String(e);
        return (
          (t = g(c, RegExp)),
          void 0 === (n = c.flags) && c instanceof RegExp && !('flags' in _) && (n = u.call(c)),
          (i = void 0 === n ? '' : String(n)),
          (r = new t(t === RegExp ? c.source : c, i)),
          (o = !!~i.indexOf('g')),
          (s = !!~i.indexOf('u')),
          (r.lastIndex = a(c.lastIndex)),
          new T(r, d, o, s)
        );
      };
    i(
      { target: 'String', proto: !0, forced: I },
      {
        matchAll: function(e) {
          var t,
            n,
            i,
            r = o(this);
          if (null != e) {
            if (d(e) && !~String(o('flags' in _ ? e.flags : u.call(e))).indexOf('g'))
              throw TypeError('`.matchAll` does not allow non-global regexes');
            if (I) return x.apply(r, arguments);
            if ((void 0 === (n = e[w]) && b && 'RegExp' == c(e) && (n = N), null != n)) return s(n).call(e, r);
          } else if (I) return x.apply(r, arguments);
          return (t = String(r)), (i = new RegExp(e, 'g')), b ? N.call(i, t) : i[w](t);
        }
      }
    ),
      b || w in _ || f(_, w, N);
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(93).end;
    i(
      { target: 'String', proto: !0, forced: n(122) },
      {
        padEnd: function(e) {
          return r(this, e, arguments.length > 1 ? arguments[1] : void 0);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(93).start;
    i(
      { target: 'String', proto: !0, forced: n(122) },
      {
        padStart: function(e) {
          return r(this, e, arguments.length > 1 ? arguments[1] : void 0);
        }
      }
    );
  },
  function(e, t, n) {
    n(0)({ target: 'String', proto: !0 }, { repeat: n(94) });
  },
  function(e, t, n) {
    'use strict';
    var i = n(72),
      r = n(4),
      o = n(10),
      a = n(8),
      s = n(23),
      l = n(15),
      c = n(74),
      d = n(75),
      u = Math.max,
      f = Math.min,
      p = Math.floor,
      h = /\$([$&'`]|\d\d?|<[^>]*>)/g,
      g = /\$([$&'`]|\d\d?)/g;
    i('replace', 2, function(e, t, n) {
      return [
        function(n, i) {
          var r = l(this),
            o = null == n ? void 0 : n[e];
          return void 0 !== o ? o.call(n, r, i) : t.call(String(r), n, i);
        },
        function(e, o) {
          var l = n(t, e, this, o);
          if (l.done) return l.value;
          var p = r(e),
            h = String(this),
            g = 'function' == typeof o;
          g || (o = String(o));
          var m = p.global;
          if (m) {
            var v = p.unicode;
            p.lastIndex = 0;
          }
          for (var b = []; ; ) {
            var w = d(p, h);
            if (null === w) break;
            if ((b.push(w), !m)) break;
            '' === String(w[0]) && (p.lastIndex = c(h, a(p.lastIndex), v));
          }
          for (var S, y = '', _ = 0, C = 0; C < b.length; C++) {
            w = b[C];
            for (var x = String(w[0]), I = u(f(s(w.index), h.length), 0), T = [], N = 1; N < w.length; N++)
              T.push(void 0 === (S = w[N]) ? S : String(S));
            var k = w.groups;
            if (g) {
              var $ = [x].concat(T, I, h);
              void 0 !== k && $.push(k);
              var P = String(o.apply(void 0, $));
            } else P = i(x, h, I, T, k, o);
            I >= _ && ((y += h.slice(_, I) + P), (_ = I + x.length));
          }
          return y + h.slice(_);
        }
      ];
      function i(e, n, i, r, a, s) {
        var l = i + e.length,
          c = r.length,
          d = g;
        return (
          void 0 !== a && ((a = o(a)), (d = h)),
          t.call(s, d, function(t, o) {
            var s;
            switch (o.charAt(0)) {
              case '$':
                return '$';
              case '&':
                return e;
              case '`':
                return n.slice(0, i);
              case "'":
                return n.slice(l);
              case '<':
                s = a[o.slice(1, -1)];
                break;
              default:
                var d = +o;
                if (0 === d) return t;
                if (d > c) {
                  var u = p(d / 10);
                  return 0 === u ? t : u <= c ? (void 0 === r[u - 1] ? o.charAt(1) : r[u - 1] + o.charAt(1)) : t;
                }
                s = r[d - 1];
            }
            return void 0 === s ? '' : s;
          })
        );
      }
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(72),
      r = n(4),
      o = n(15),
      a = n(113),
      s = n(75);
    i('search', 1, function(e, t, n) {
      return [
        function(t) {
          var n = o(this),
            i = null == t ? void 0 : t[e];
          return void 0 !== i ? i.call(t, n) : new RegExp(t)[e](String(n));
        },
        function(e) {
          var i = n(t, e, this);
          if (i.done) return i.value;
          var o = r(e),
            l = String(this),
            c = o.lastIndex;
          a(c, 0) || (o.lastIndex = 0);
          var d = s(o, l);
          return a(o.lastIndex, c) || (o.lastIndex = c), null === d ? -1 : d.index;
        }
      ];
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(72),
      r = n(71),
      o = n(4),
      a = n(15),
      s = n(30),
      l = n(74),
      c = n(8),
      d = n(75),
      u = n(73),
      f = n(1),
      p = [].push,
      h = Math.min,
      g = !f(function() {
        return !RegExp(4294967295, 'y');
      });
    i(
      'split',
      2,
      function(e, t, n) {
        var i;
        return (
          (i =
            'c' == 'abbc'.split(/(b)*/)[1] ||
            4 != 'test'.split(/(?:)/, -1).length ||
            2 != 'ab'.split(/(?:ab)*/).length ||
            4 != '.'.split(/(.?)(.?)/).length ||
            '.'.split(/()()/).length > 1 ||
            ''.split(/.?/).length
              ? function(e, n) {
                  var i = String(a(this)),
                    o = void 0 === n ? 4294967295 : n >>> 0;
                  if (0 === o) return [];
                  if (void 0 === e) return [i];
                  if (!r(e)) return t.call(i, e, o);
                  for (
                    var s,
                      l,
                      c,
                      d = [],
                      f =
                        (e.ignoreCase ? 'i' : '') +
                        (e.multiline ? 'm' : '') +
                        (e.unicode ? 'u' : '') +
                        (e.sticky ? 'y' : ''),
                      h = 0,
                      g = new RegExp(e.source, f + 'g');
                    (s = u.call(g, i)) &&
                    !(
                      (l = g.lastIndex) > h &&
                      (d.push(i.slice(h, s.index)),
                      s.length > 1 && s.index < i.length && p.apply(d, s.slice(1)),
                      (c = s[0].length),
                      (h = l),
                      d.length >= o)
                    );

                  )
                    g.lastIndex === s.index && g.lastIndex++;
                  return (
                    h === i.length ? (!c && g.test('')) || d.push('') : d.push(i.slice(h)),
                    d.length > o ? d.slice(0, o) : d
                  );
                }
              : '0'.split(void 0, 0).length
              ? function(e, n) {
                  return void 0 === e && 0 === n ? [] : t.call(this, e, n);
                }
              : t),
          [
            function(t, n) {
              var r = a(this),
                o = null == t ? void 0 : t[e];
              return void 0 !== o ? o.call(t, r, n) : i.call(String(r), t, n);
            },
            function(e, r) {
              var a = n(i, e, this, r, i !== t);
              if (a.done) return a.value;
              var u = o(e),
                f = String(this),
                p = s(u, RegExp),
                m = u.unicode,
                v = (u.ignoreCase ? 'i' : '') + (u.multiline ? 'm' : '') + (u.unicode ? 'u' : '') + (g ? 'y' : 'g'),
                b = new p(g ? u : '^(?:' + u.source + ')', v),
                w = void 0 === r ? 4294967295 : r >>> 0;
              if (0 === w) return [];
              if (0 === f.length) return null === d(b, f) ? [f] : [];
              for (var S = 0, y = 0, _ = []; y < f.length; ) {
                b.lastIndex = g ? y : 0;
                var C,
                  x = d(b, g ? f : f.slice(y));
                if (null === x || (C = h(c(b.lastIndex + (g ? 0 : y)), f.length)) === S) y = l(f, y, m);
                else {
                  if ((_.push(f.slice(S, y)), _.length === w)) return _;
                  for (var I = 1; I <= x.length - 1; I++) if ((_.push(x[I]), _.length === w)) return _;
                  y = S = C;
                }
              }
              return _.push(f.slice(S)), _;
            }
          ]
        );
      },
      !g
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(8),
      o = n(91),
      a = n(15),
      s = n(92),
      l = ''.startsWith,
      c = Math.min;
    i(
      { target: 'String', proto: !0, forced: !s('startsWith') },
      {
        startsWith: function(e) {
          var t = String(a(this));
          o(e);
          var n = r(c(arguments.length > 1 ? arguments[1] : void 0, t.length)),
            i = String(e);
          return l ? l.call(t, i, n) : t.slice(n, n + i.length) === i;
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(47).trim;
    i(
      { target: 'String', proto: !0, forced: n(95)('trim') },
      {
        trim: function() {
          return r(this);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(47).start,
      o = n(95)('trimStart'),
      a = o
        ? function() {
            return r(this);
          }
        : ''.trimStart;
    i({ target: 'String', proto: !0, forced: o }, { trimStart: a, trimLeft: a });
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(47).end,
      o = n(95)('trimEnd'),
      a = o
        ? function() {
            return r(this);
          }
        : ''.trimEnd;
    i({ target: 'String', proto: !0, forced: o }, { trimEnd: a, trimRight: a });
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(21);
    i(
      { target: 'String', proto: !0, forced: n(22)('anchor') },
      {
        anchor: function(e) {
          return r(this, 'a', 'name', e);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(21);
    i(
      { target: 'String', proto: !0, forced: n(22)('big') },
      {
        big: function() {
          return r(this, 'big', '', '');
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(21);
    i(
      { target: 'String', proto: !0, forced: n(22)('blink') },
      {
        blink: function() {
          return r(this, 'blink', '', '');
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(21);
    i(
      { target: 'String', proto: !0, forced: n(22)('bold') },
      {
        bold: function() {
          return r(this, 'b', '', '');
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(21);
    i(
      { target: 'String', proto: !0, forced: n(22)('fixed') },
      {
        fixed: function() {
          return r(this, 'tt', '', '');
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(21);
    i(
      { target: 'String', proto: !0, forced: n(22)('fontcolor') },
      {
        fontcolor: function(e) {
          return r(this, 'font', 'color', e);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(21);
    i(
      { target: 'String', proto: !0, forced: n(22)('fontsize') },
      {
        fontsize: function(e) {
          return r(this, 'font', 'size', e);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(21);
    i(
      { target: 'String', proto: !0, forced: n(22)('italics') },
      {
        italics: function() {
          return r(this, 'i', '', '');
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(21);
    i(
      { target: 'String', proto: !0, forced: n(22)('link') },
      {
        link: function(e) {
          return r(this, 'a', 'href', e);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(21);
    i(
      { target: 'String', proto: !0, forced: n(22)('small') },
      {
        small: function() {
          return r(this, 'small', '', '');
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(21);
    i(
      { target: 'String', proto: !0, forced: n(22)('strike') },
      {
        strike: function() {
          return r(this, 'strike', '', '');
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(21);
    i(
      { target: 'String', proto: !0, forced: n(22)('sub') },
      {
        sub: function() {
          return r(this, 'sub', '', '');
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(21);
    i(
      { target: 'String', proto: !0, forced: n(22)('sup') },
      {
        sup: function() {
          return r(this, 'sup', '', '');
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(6),
      r = n(2),
      o = n(54),
      a = n(96),
      s = n(9).f,
      l = n(39).f,
      c = n(71),
      d = n(62),
      u = n(14),
      f = n(1),
      p = n(46),
      h = n(7)('match'),
      g = r.RegExp,
      m = g.prototype,
      v = /a/g,
      b = /a/g,
      w = new g(v) !== v;
    if (
      i &&
      o(
        'RegExp',
        !w ||
          f(function() {
            return (b[h] = !1), g(v) != v || g(b) == b || '/a/i' != g(v, 'i');
          })
      )
    ) {
      for (
        var S = function(e, t) {
            var n = this instanceof S,
              i = c(e),
              r = void 0 === t;
            return !n && i && e.constructor === S && r
              ? e
              : a(
                  w ? new g(i && !r ? e.source : e, t) : g((i = e instanceof S) ? e.source : e, i && r ? d.call(e) : t),
                  n ? this : m,
                  S
                );
          },
          y = function(e) {
            (e in S) ||
              s(S, e, {
                configurable: !0,
                get: function() {
                  return g[e];
                },
                set: function(t) {
                  g[e] = t;
                }
              });
          },
          _ = l(g),
          C = 0;
        _.length > C;

      )
        y(_[C++]);
      (m.constructor = S), (S.prototype = m), u(r, 'RegExp', S);
    }
    p('RegExp');
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(73);
    i({ target: 'RegExp', proto: !0, forced: /./.exec !== r }, { exec: r });
  },
  function(e, t, n) {
    var i = n(6),
      r = n(9),
      o = n(62);
    i && 'g' != /./g.flags && r.f(RegExp.prototype, 'flags', { configurable: !0, get: o });
  },
  function(e, t, n) {
    'use strict';
    var i = n(14),
      r = n(4),
      o = n(1),
      a = n(62),
      s = RegExp.prototype,
      l = s.toString,
      c = o(function() {
        return '/a/b' != l.call({ source: 'a', flags: 'b' });
      }),
      d = 'toString' != l.name;
    (c || d) &&
      i(
        RegExp.prototype,
        'toString',
        function() {
          var e = r(this),
            t = String(e.source),
            n = e.flags;
          return '/' + t + '/' + String(void 0 === n && e instanceof RegExp && !('flags' in s) ? a.call(e) : n);
        },
        { unsafe: !0 }
      );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(124);
    i({ global: !0, forced: parseInt != r }, { parseInt: r });
  },
  function(e, t, n) {
    var i = n(0),
      r = n(125);
    i({ global: !0, forced: parseFloat != r }, { parseFloat: r });
  },
  function(e, t, n) {
    'use strict';
    var i = n(6),
      r = n(2),
      o = n(54),
      a = n(14),
      s = n(11),
      l = n(24),
      c = n(96),
      d = n(25),
      u = n(1),
      f = n(34),
      p = n(39).f,
      h = n(16).f,
      g = n(9).f,
      m = n(47).trim,
      v = r.Number,
      b = v.prototype,
      w = 'Number' == l(f(b)),
      S = function(e) {
        var t,
          n,
          i,
          r,
          o,
          a,
          s,
          l,
          c = d(e, !1);
        if ('string' == typeof c && c.length > 2)
          if (43 === (t = (c = m(c)).charCodeAt(0)) || 45 === t) {
            if (88 === (n = c.charCodeAt(2)) || 120 === n) return NaN;
          } else if (48 === t) {
            switch (c.charCodeAt(1)) {
              case 66:
              case 98:
                (i = 2), (r = 49);
                break;
              case 79:
              case 111:
                (i = 8), (r = 55);
                break;
              default:
                return +c;
            }
            for (a = (o = c.slice(2)).length, s = 0; s < a; s++) if ((l = o.charCodeAt(s)) < 48 || l > r) return NaN;
            return parseInt(o, i);
          }
        return +c;
      };
    if (o('Number', !v(' 0o1') || !v('0b1') || v('+0x1'))) {
      for (
        var y,
          _ = function(e) {
            var t = arguments.length < 1 ? 0 : e,
              n = this;
            return n instanceof _ &&
              (w
                ? u(function() {
                    b.valueOf.call(n);
                  })
                : 'Number' != l(n))
              ? c(new v(S(t)), n, _)
              : S(t);
          },
          C = i
            ? p(v)
            : 'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'.split(
                ','
              ),
          x = 0;
        C.length > x;
        x++
      )
        s(v, (y = C[x])) && !s(_, y) && g(_, y, h(v, y));
      (_.prototype = b), (b.constructor = _), a(r, 'Number', _);
    }
  },
  function(e, t, n) {
    n(0)({ target: 'Number', stat: !0 }, { EPSILON: Math.pow(2, -52) });
  },
  function(e, t, n) {
    n(0)({ target: 'Number', stat: !0 }, { isFinite: n(279) });
  },
  function(e, t, n) {
    var i = n(2).isFinite;
    e.exports =
      Number.isFinite ||
      function(e) {
        return 'number' == typeof e && i(e);
      };
  },
  function(e, t, n) {
    n(0)({ target: 'Number', stat: !0 }, { isInteger: n(126) });
  },
  function(e, t, n) {
    n(0)(
      { target: 'Number', stat: !0 },
      {
        isNaN: function(e) {
          return e != e;
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(126),
      o = Math.abs;
    i(
      { target: 'Number', stat: !0 },
      {
        isSafeInteger: function(e) {
          return r(e) && o(e) <= 9007199254740991;
        }
      }
    );
  },
  function(e, t, n) {
    n(0)({ target: 'Number', stat: !0 }, { MAX_SAFE_INTEGER: 9007199254740991 });
  },
  function(e, t, n) {
    n(0)({ target: 'Number', stat: !0 }, { MIN_SAFE_INTEGER: -9007199254740991 });
  },
  function(e, t, n) {
    var i = n(0),
      r = n(125);
    i({ target: 'Number', stat: !0, forced: Number.parseFloat != r }, { parseFloat: r });
  },
  function(e, t, n) {
    var i = n(0),
      r = n(124);
    i({ target: 'Number', stat: !0, forced: Number.parseInt != r }, { parseInt: r });
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(23),
      o = n(127),
      a = n(94),
      s = n(1),
      l = (1).toFixed,
      c = Math.floor,
      d = function(e, t, n) {
        return 0 === t ? n : t % 2 == 1 ? d(e, t - 1, n * e) : d(e * e, t / 2, n);
      };
    i(
      {
        target: 'Number',
        proto: !0,
        forced:
          (l &&
            ('0.000' !== (8e-5).toFixed(3) ||
              '1' !== (0.9).toFixed(0) ||
              '1.25' !== (1.255).toFixed(2) ||
              '1000000000000000128' !== (0xde0b6b3a7640080).toFixed(0))) ||
          !s(function() {
            l.call({});
          })
      },
      {
        toFixed: function(e) {
          var t,
            n,
            i,
            s,
            l = o(this),
            u = r(e),
            f = [0, 0, 0, 0, 0, 0],
            p = '',
            h = '0',
            g = function(e, t) {
              for (var n = -1, i = t; ++n < 6; ) (i += e * f[n]), (f[n] = i % 1e7), (i = c(i / 1e7));
            },
            m = function(e) {
              for (var t = 6, n = 0; --t >= 0; ) (n += f[t]), (f[t] = c(n / e)), (n = (n % e) * 1e7);
            },
            v = function() {
              for (var e = 6, t = ''; --e >= 0; )
                if ('' !== t || 0 === e || 0 !== f[e]) {
                  var n = String(f[e]);
                  t = '' === t ? n : t + a.call('0', 7 - n.length) + n;
                }
              return t;
            };
          if (u < 0 || u > 20) throw RangeError('Incorrect fraction digits');
          if (l != l) return 'NaN';
          if (l <= -1e21 || l >= 1e21) return String(l);
          if ((l < 0 && ((p = '-'), (l = -l)), l > 1e-21))
            if (
              ((n =
                (t =
                  (function(e) {
                    for (var t = 0, n = e; n >= 4096; ) (t += 12), (n /= 4096);
                    for (; n >= 2; ) (t += 1), (n /= 2);
                    return t;
                  })(l * d(2, 69, 1)) - 69) < 0
                  ? l * d(2, -t, 1)
                  : l / d(2, t, 1)),
              (n *= 4503599627370496),
              (t = 52 - t) > 0)
            ) {
              for (g(0, n), i = u; i >= 7; ) g(1e7, 0), (i -= 7);
              for (g(d(10, i, 1), 0), i = t - 1; i >= 23; ) m(1 << 23), (i -= 23);
              m(1 << i), g(1, 1), m(2), (h = v());
            } else g(0, n), g(1 << -t, 0), (h = v() + a.call('0', u));
          return (h =
            u > 0
              ? p + ((s = h.length) <= u ? '0.' + a.call('0', u - s) + h : h.slice(0, s - u) + '.' + h.slice(s - u))
              : p + h);
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(1),
      o = n(127),
      a = (1).toPrecision;
    i(
      {
        target: 'Number',
        proto: !0,
        forced:
          r(function() {
            return '1' !== a.call(1, void 0);
          }) ||
          !r(function() {
            a.call({});
          })
      },
      {
        toPrecision: function(e) {
          return void 0 === e ? a.call(o(this)) : a.call(o(this), e);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(128),
      o = Math.acosh,
      a = Math.log,
      s = Math.sqrt,
      l = Math.LN2;
    i(
      { target: 'Math', stat: !0, forced: !o || 710 != Math.floor(o(Number.MAX_VALUE)) || o(1 / 0) != 1 / 0 },
      {
        acosh: function(e) {
          return (e = +e) < 1 ? NaN : e > 94906265.62425156 ? a(e) + l : r(e - 1 + s(e - 1) * s(e + 1));
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = Math.asinh,
      o = Math.log,
      a = Math.sqrt;
    i(
      { target: 'Math', stat: !0, forced: !(r && 1 / r(0) > 0) },
      {
        asinh: function e(t) {
          return isFinite((t = +t)) && 0 != t ? (t < 0 ? -e(-t) : o(t + a(t * t + 1))) : t;
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = Math.atanh,
      o = Math.log;
    i(
      { target: 'Math', stat: !0, forced: !(r && 1 / r(-0) < 0) },
      {
        atanh: function(e) {
          return 0 == (e = +e) ? e : o((1 + e) / (1 - e)) / 2;
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(97),
      o = Math.abs,
      a = Math.pow;
    i(
      { target: 'Math', stat: !0 },
      {
        cbrt: function(e) {
          return r((e = +e)) * a(o(e), 1 / 3);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = Math.floor,
      o = Math.log,
      a = Math.LOG2E;
    i(
      { target: 'Math', stat: !0 },
      {
        clz32: function(e) {
          return (e >>>= 0) ? 31 - r(o(e + 0.5) * a) : 32;
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(77),
      o = Math.cosh,
      a = Math.abs,
      s = Math.E;
    i(
      { target: 'Math', stat: !0, forced: !o || o(710) === 1 / 0 },
      {
        cosh: function(e) {
          var t = r(a(e) - 1) + 1;
          return (t + 1 / (t * s * s)) * (s / 2);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(77);
    i({ target: 'Math', stat: !0, forced: r != Math.expm1 }, { expm1: r });
  },
  function(e, t, n) {
    n(0)({ target: 'Math', stat: !0 }, { fround: n(297) });
  },
  function(e, t, n) {
    var i = n(97),
      r = Math.abs,
      o = Math.pow,
      a = o(2, -52),
      s = o(2, -23),
      l = o(2, 127) * (2 - s),
      c = o(2, -126);
    e.exports =
      Math.fround ||
      function(e) {
        var t,
          n,
          o = r(e),
          d = i(e);
        return o < c
          ? d * (o / c / s + 1 / a - 1 / a) * c * s
          : (n = (t = (1 + s / a) * o) - (t - o)) > l || n != n
          ? d * (1 / 0)
          : d * n;
      };
  },
  function(e, t, n) {
    var i = n(0),
      r = Math.hypot,
      o = Math.abs,
      a = Math.sqrt;
    i(
      { target: 'Math', stat: !0, forced: !!r && r(1 / 0, NaN) !== 1 / 0 },
      {
        hypot: function(e, t) {
          for (var n, i, r = 0, s = 0, l = arguments.length, c = 0; s < l; )
            c < (n = o(arguments[s++])) ? ((r = r * (i = c / n) * i + 1), (c = n)) : (r += n > 0 ? (i = n / c) * i : n);
          return c === 1 / 0 ? 1 / 0 : c * a(r);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(1),
      o = Math.imul;
    i(
      {
        target: 'Math',
        stat: !0,
        forced: r(function() {
          return -5 != o(4294967295, 5) || 2 != o.length;
        })
      },
      {
        imul: function(e, t) {
          var n = +e,
            i = +t,
            r = 65535 & n,
            o = 65535 & i;
          return 0 | (r * o + ((((65535 & (n >>> 16)) * o + r * (65535 & (i >>> 16))) << 16) >>> 0));
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = Math.log,
      o = Math.LOG10E;
    i(
      { target: 'Math', stat: !0 },
      {
        log10: function(e) {
          return r(e) * o;
        }
      }
    );
  },
  function(e, t, n) {
    n(0)({ target: 'Math', stat: !0 }, { log1p: n(128) });
  },
  function(e, t, n) {
    var i = n(0),
      r = Math.log,
      o = Math.LN2;
    i(
      { target: 'Math', stat: !0 },
      {
        log2: function(e) {
          return r(e) / o;
        }
      }
    );
  },
  function(e, t, n) {
    n(0)({ target: 'Math', stat: !0 }, { sign: n(97) });
  },
  function(e, t, n) {
    var i = n(0),
      r = n(1),
      o = n(77),
      a = Math.abs,
      s = Math.exp,
      l = Math.E;
    i(
      {
        target: 'Math',
        stat: !0,
        forced: r(function() {
          return -2e-17 != Math.sinh(-2e-17);
        })
      },
      {
        sinh: function(e) {
          return a((e = +e)) < 1 ? (o(e) - o(-e)) / 2 : (s(e - 1) - s(-e - 1)) * (l / 2);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(77),
      o = Math.exp;
    i(
      { target: 'Math', stat: !0 },
      {
        tanh: function(e) {
          var t = r((e = +e)),
            n = r(-e);
          return t == 1 / 0 ? 1 : n == 1 / 0 ? -1 : (t - n) / (o(e) + o(-e));
        }
      }
    );
  },
  function(e, t, n) {
    n(26)(Math, 'Math', !0);
  },
  function(e, t, n) {
    var i = n(0),
      r = Math.ceil,
      o = Math.floor;
    i(
      { target: 'Math', stat: !0 },
      {
        trunc: function(e) {
          return (e > 0 ? o : r)(e);
        }
      }
    );
  },
  function(e, t, n) {
    n(0)(
      { target: 'Date', stat: !0 },
      {
        now: function() {
          return new Date().getTime();
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(1),
      o = n(10),
      a = n(25);
    i(
      {
        target: 'Date',
        proto: !0,
        forced: r(function() {
          return (
            null !== new Date(NaN).toJSON() ||
            1 !==
              Date.prototype.toJSON.call({
                toISOString: function() {
                  return 1;
                }
              })
          );
        })
      },
      {
        toJSON: function(e) {
          var t = o(this),
            n = a(t);
          return 'number' != typeof n || isFinite(n) ? t.toISOString() : null;
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(311);
    i({ target: 'Date', proto: !0, forced: Date.prototype.toISOString !== r }, { toISOString: r });
  },
  function(e, t, n) {
    'use strict';
    var i = n(1),
      r = n(93).start,
      o = Math.abs,
      a = Date.prototype,
      s = a.getTime,
      l = a.toISOString;
    e.exports =
      i(function() {
        return '0385-07-25T07:06:39.999Z' != l.call(new Date(-5e13 - 1));
      }) ||
      !i(function() {
        l.call(new Date(NaN));
      })
        ? function() {
            if (!isFinite(s.call(this))) throw RangeError('Invalid time value');
            var e = this.getUTCFullYear(),
              t = this.getUTCMilliseconds(),
              n = e < 0 ? '-' : e > 9999 ? '+' : '';
            return (
              n +
              r(o(e), n ? 6 : 4, 0) +
              '-' +
              r(this.getUTCMonth() + 1, 2, 0) +
              '-' +
              r(this.getUTCDate(), 2, 0) +
              'T' +
              r(this.getUTCHours(), 2, 0) +
              ':' +
              r(this.getUTCMinutes(), 2, 0) +
              ':' +
              r(this.getUTCSeconds(), 2, 0) +
              '.' +
              r(t, 3, 0) +
              'Z'
            );
          }
        : l;
  },
  function(e, t, n) {
    var i = n(14),
      r = Date.prototype,
      o = r.toString,
      a = r.getTime;
    new Date(NaN) + '' != 'Invalid Date' &&
      i(r, 'toString', function() {
        var e = a.call(this);
        return e == e ? o.call(this) : 'Invalid Date';
      });
  },
  function(e, t, n) {
    var i = n(13),
      r = n(314),
      o = n(7)('toPrimitive'),
      a = Date.prototype;
    o in a || i(a, o, r);
  },
  function(e, t, n) {
    'use strict';
    var i = n(4),
      r = n(25);
    e.exports = function(e) {
      if ('string' !== e && 'number' !== e && 'default' !== e) throw TypeError('Incorrect hint');
      return r(i(this), 'number' !== e);
    };
  },
  function(e, t, n) {
    var i = n(2);
    n(26)(i.JSON, 'JSON', !0);
  },
  function(e, t, n) {
    'use strict';
    var i,
      r,
      o,
      a,
      s = n(0),
      l = n(28),
      c = n(2),
      d = n(43),
      u = n(129),
      f = n(14),
      p = n(48),
      h = n(26),
      g = n(46),
      m = n(3),
      v = n(18),
      b = n(37),
      w = n(24),
      S = n(44),
      y = n(67),
      _ = n(30),
      C = n(98).set,
      x = n(130),
      I = n(131),
      T = n(317),
      N = n(99),
      k = n(132),
      $ = n(63),
      P = n(20),
      E = n(54),
      L = n(7)('species'),
      R = 'Promise',
      A = P.get,
      D = P.set,
      O = P.getterFor(R),
      V = u,
      M = c.TypeError,
      F = c.document,
      j = c.process,
      U = c.fetch,
      B = j && j.versions,
      z = (B && B.v8) || '',
      W = N.f,
      G = W,
      H = 'process' == w(j),
      q = !!(F && F.createEvent && c.dispatchEvent),
      K = E(R, function() {
        var e = V.resolve(1),
          t = function() {},
          n = ((e.constructor = {})[L] = function(e) {
            e(t, t);
          });
        return !(
          (H || 'function' == typeof PromiseRejectionEvent) &&
          (!l || e.finally) &&
          e.then(t) instanceof n &&
          0 !== z.indexOf('6.6') &&
          -1 === $.indexOf('Chrome/66')
        );
      }),
      J =
        K ||
        !y(function(e) {
          V.all(e).catch(function() {});
        }),
      Y = function(e) {
        var t;
        return !(!m(e) || 'function' != typeof (t = e.then)) && t;
      },
      Q = function(e, t, n) {
        if (!t.notified) {
          t.notified = !0;
          var i = t.reactions;
          x(function() {
            for (var r = t.value, o = 1 == t.state, a = 0; i.length > a; ) {
              var s,
                l,
                c,
                d = i[a++],
                u = o ? d.ok : d.fail,
                f = d.resolve,
                p = d.reject,
                h = d.domain;
              try {
                u
                  ? (o || (2 === t.rejection && te(e, t), (t.rejection = 1)),
                    !0 === u ? (s = r) : (h && h.enter(), (s = u(r)), h && (h.exit(), (c = !0))),
                    s === d.promise ? p(M('Promise-chain cycle')) : (l = Y(s)) ? l.call(s, f, p) : f(s))
                  : p(r);
              } catch (e) {
                h && !c && h.exit(), p(e);
              }
            }
            (t.reactions = []), (t.notified = !1), n && !t.rejection && Z(e, t);
          });
        }
      },
      X = function(e, t, n) {
        var i, r;
        q
          ? (((i = F.createEvent('Event')).promise = t), (i.reason = n), i.initEvent(e, !1, !0), c.dispatchEvent(i))
          : (i = { promise: t, reason: n }),
          (r = c['on' + e]) ? r(i) : 'unhandledrejection' === e && T('Unhandled promise rejection', n);
      },
      Z = function(e, t) {
        C.call(c, function() {
          var n,
            i = t.value;
          if (
            ee(t) &&
            ((n = k(function() {
              H ? j.emit('unhandledRejection', i, e) : X('unhandledrejection', e, i);
            })),
            (t.rejection = H || ee(t) ? 2 : 1),
            n.error)
          )
            throw n.value;
        });
      },
      ee = function(e) {
        return 1 !== e.rejection && !e.parent;
      },
      te = function(e, t) {
        C.call(c, function() {
          H ? j.emit('rejectionHandled', e) : X('rejectionhandled', e, t.value);
        });
      },
      ne = function(e, t, n, i) {
        return function(r) {
          e(t, n, r, i);
        };
      },
      ie = function(e, t, n, i) {
        t.done || ((t.done = !0), i && (t = i), (t.value = n), (t.state = 2), Q(e, t, !0));
      },
      re = function(e, t, n, i) {
        if (!t.done) {
          (t.done = !0), i && (t = i);
          try {
            if (e === n) throw M("Promise can't be resolved itself");
            var r = Y(n);
            r
              ? x(function() {
                  var i = { done: !1 };
                  try {
                    r.call(n, ne(re, e, i, t), ne(ie, e, i, t));
                  } catch (n) {
                    ie(e, i, n, t);
                  }
                })
              : ((t.value = n), (t.state = 1), Q(e, t, !1));
          } catch (n) {
            ie(e, { done: !1 }, n, t);
          }
        }
      };
    K &&
      ((V = function(e) {
        b(this, V, R), v(e), i.call(this);
        var t = A(this);
        try {
          e(ne(re, this, t), ne(ie, this, t));
        } catch (e) {
          ie(this, t, e);
        }
      }),
      ((i = function(e) {
        D(this, { type: R, done: !1, notified: !1, parent: !1, reactions: [], rejection: !1, state: 0, value: void 0 });
      }).prototype = p(V.prototype, {
        then: function(e, t) {
          var n = O(this),
            i = W(_(this, V));
          return (
            (i.ok = 'function' != typeof e || e),
            (i.fail = 'function' == typeof t && t),
            (i.domain = H ? j.domain : void 0),
            (n.parent = !0),
            n.reactions.push(i),
            0 != n.state && Q(this, n, !1),
            i.promise
          );
        },
        catch: function(e) {
          return this.then(void 0, e);
        }
      })),
      (r = function() {
        var e = new i(),
          t = A(e);
        (this.promise = e), (this.resolve = ne(re, e, t)), (this.reject = ne(ie, e, t));
      }),
      (N.f = W = function(e) {
        return e === V || e === o ? new r(e) : G(e);
      }),
      l ||
        'function' != typeof u ||
        ((a = u.prototype.then),
        f(
          u.prototype,
          'then',
          function(e, t) {
            var n = this;
            return new V(function(e, t) {
              a.call(n, e, t);
            }).then(e, t);
          },
          { unsafe: !0 }
        ),
        'function' == typeof U &&
          s(
            { global: !0, enumerable: !0, forced: !0 },
            {
              fetch: function(e) {
                return I(V, U.apply(c, arguments));
              }
            }
          ))),
      s({ global: !0, wrap: !0, forced: K }, { Promise: V }),
      h(V, R, !1, !0),
      g(R),
      (o = d.Promise),
      s(
        { target: R, stat: !0, forced: K },
        {
          reject: function(e) {
            var t = W(this);
            return t.reject.call(void 0, e), t.promise;
          }
        }
      ),
      s(
        { target: R, stat: !0, forced: l || K },
        {
          resolve: function(e) {
            return I(l && this === o ? V : this, e);
          }
        }
      ),
      s(
        { target: R, stat: !0, forced: J },
        {
          all: function(e) {
            var t = this,
              n = W(t),
              i = n.resolve,
              r = n.reject,
              o = k(function() {
                var n = v(t.resolve),
                  o = [],
                  a = 0,
                  s = 1;
                S(e, function(e) {
                  var l = a++,
                    c = !1;
                  o.push(void 0),
                    s++,
                    n.call(t, e).then(function(e) {
                      c || ((c = !0), (o[l] = e), --s || i(o));
                    }, r);
                }),
                  --s || i(o);
              });
            return o.error && r(o.value), n.promise;
          },
          race: function(e) {
            var t = this,
              n = W(t),
              i = n.reject,
              r = k(function() {
                var r = v(t.resolve);
                S(e, function(e) {
                  r.call(t, e).then(n.resolve, i);
                });
              });
            return r.error && i(r.value), n.promise;
          }
        }
      );
  },
  function(e, t, n) {
    var i = n(2);
    e.exports = function(e, t) {
      var n = i.console;
      n && n.error && (1 === arguments.length ? n.error(e) : n.error(e, t));
    };
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(18),
      o = n(99),
      a = n(132),
      s = n(44);
    i(
      { target: 'Promise', stat: !0 },
      {
        allSettled: function(e) {
          var t = this,
            n = o.f(t),
            i = n.resolve,
            l = n.reject,
            c = a(function() {
              var n = r(t.resolve),
                o = [],
                a = 0,
                l = 1;
              s(e, function(e) {
                var r = a++,
                  s = !1;
                o.push(void 0),
                  l++,
                  n.call(t, e).then(
                    function(e) {
                      s || ((s = !0), (o[r] = { status: 'fulfilled', value: e }), --l || i(o));
                    },
                    function(e) {
                      s || ((s = !0), (o[r] = { status: 'rejected', reason: e }), --l || i(o));
                    }
                  );
              }),
                --l || i(o);
            });
          return c.error && l(c.value), n.promise;
        }
      }
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(28),
      o = n(129),
      a = n(32),
      s = n(30),
      l = n(131),
      c = n(14);
    i(
      { target: 'Promise', proto: !0, real: !0 },
      {
        finally: function(e) {
          var t = s(this, a('Promise')),
            n = 'function' == typeof e;
          return this.then(
            n
              ? function(n) {
                  return l(t, e()).then(function() {
                    return n;
                  });
                }
              : e,
            n
              ? function(n) {
                  return l(t, e()).then(function() {
                    throw n;
                  });
                }
              : e
          );
        }
      }
    ),
      r || 'function' != typeof o || o.prototype.finally || c(o.prototype, 'finally', a('Promise').prototype.finally);
  },
  function(e, t, n) {
    'use strict';
    var i = n(78),
      r = n(133);
    e.exports = i(
      'Map',
      function(e) {
        return function() {
          return e(this, arguments.length ? arguments[0] : void 0);
        };
      },
      r,
      !0
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(78),
      r = n(133);
    e.exports = i(
      'Set',
      function(e) {
        return function() {
          return e(this, arguments.length ? arguments[0] : void 0);
        };
      },
      r
    );
  },
  function(e, t, n) {
    'use strict';
    var i,
      r = n(2),
      o = n(48),
      a = n(41),
      s = n(78),
      l = n(134),
      c = n(3),
      d = n(20).enforce,
      u = n(103),
      f = !r.ActiveXObject && 'ActiveXObject' in r,
      p = Object.isExtensible,
      h = function(e) {
        return function() {
          return e(this, arguments.length ? arguments[0] : void 0);
        };
      },
      g = (e.exports = s('WeakMap', h, l, !0, !0));
    if (u && f) {
      (i = l.getConstructor(h, 'WeakMap', !0)), (a.REQUIRED = !0);
      var m = g.prototype,
        v = m.delete,
        b = m.has,
        w = m.get,
        S = m.set;
      o(m, {
        delete: function(e) {
          if (c(e) && !p(e)) {
            var t = d(this);
            return t.frozen || (t.frozen = new i()), v.call(this, e) || t.frozen.delete(e);
          }
          return v.call(this, e);
        },
        has: function(e) {
          if (c(e) && !p(e)) {
            var t = d(this);
            return t.frozen || (t.frozen = new i()), b.call(this, e) || t.frozen.has(e);
          }
          return b.call(this, e);
        },
        get: function(e) {
          if (c(e) && !p(e)) {
            var t = d(this);
            return t.frozen || (t.frozen = new i()), b.call(this, e) ? w.call(this, e) : t.frozen.get(e);
          }
          return w.call(this, e);
        },
        set: function(e, t) {
          if (c(e) && !p(e)) {
            var n = d(this);
            n.frozen || (n.frozen = new i()), b.call(this, e) ? S.call(this, e, t) : n.frozen.set(e, t);
          } else S.call(this, e, t);
          return this;
        }
      });
    }
  },
  function(e, t, n) {
    'use strict';
    n(78)(
      'WeakSet',
      function(e) {
        return function() {
          return e(this, arguments.length ? arguments[0] : void 0);
        };
      },
      n(134),
      !1,
      !0
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(2),
      o = n(79),
      a = n(46),
      s = o.ArrayBuffer;
    i({ global: !0, forced: r.ArrayBuffer !== s }, { ArrayBuffer: s }), a('ArrayBuffer');
  },
  function(e, t, n) {
    var i = n(0),
      r = n(5);
    i({ target: 'ArrayBuffer', stat: !0, forced: !r.NATIVE_ARRAY_BUFFER_VIEWS }, { isView: r.isView });
  },
  function(e, t, n) {
    'use strict';
    var i = n(0),
      r = n(1),
      o = n(79),
      a = n(4),
      s = n(33),
      l = n(8),
      c = n(30),
      d = o.ArrayBuffer,
      u = o.DataView,
      f = d.prototype.slice;
    i(
      {
        target: 'ArrayBuffer',
        proto: !0,
        unsafe: !0,
        forced: r(function() {
          return !new d(2).slice(1, void 0).byteLength;
        })
      },
      {
        slice: function(e, t) {
          if (void 0 !== f && void 0 === t) return f.call(a(this), e);
          for (
            var n = a(this).byteLength,
              i = s(e, n),
              r = s(void 0 === t ? n : t, n),
              o = new (c(this, d))(l(r - i)),
              p = new u(this),
              h = new u(o),
              g = 0;
            i < r;

          )
            h.setUint8(g++, p.getUint8(i++));
          return o;
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(79);
    i({ global: !0, forced: !n(5).NATIVE_ARRAY_BUFFER }, { DataView: r.DataView });
  },
  function(e, t, n) {
    n(31)('Int8', 1, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i);
      };
    });
  },
  function(e, t, n) {
    var i = n(23);
    e.exports = function(e) {
      var t = i(e);
      if (t < 0) throw RangeError("The argument can't be less than 0");
      return t;
    };
  },
  function(e, t, n) {
    n(31)('Uint8', 1, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i);
      };
    });
  },
  function(e, t, n) {
    n(31)(
      'Uint8',
      1,
      function(e) {
        return function(t, n, i) {
          return e(this, t, n, i);
        };
      },
      !0
    );
  },
  function(e, t, n) {
    n(31)('Int16', 2, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i);
      };
    });
  },
  function(e, t, n) {
    n(31)('Uint16', 2, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i);
      };
    });
  },
  function(e, t, n) {
    n(31)('Int32', 4, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i);
      };
    });
  },
  function(e, t, n) {
    n(31)('Uint32', 4, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i);
      };
    });
  },
  function(e, t, n) {
    n(31)('Float32', 4, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i);
      };
    });
  },
  function(e, t, n) {
    n(31)('Float64', 8, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i);
      };
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(100),
      r = n(5),
      o = n(137);
    r.exportStatic('from', o, i);
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(100),
      o = i.aTypedArrayConstructor;
    i.exportStatic(
      'of',
      function() {
        for (var e = 0, t = arguments.length, n = new (o(this))(t); t > e; ) n[e] = arguments[e++];
        return n;
      },
      r
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(117),
      o = i.aTypedArray;
    i.exportProto('copyWithin', function(e, t) {
      return r.call(o(this), e, t, arguments.length > 2 ? arguments[2] : void 0);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(12).every,
      o = i.aTypedArray;
    i.exportProto('every', function(e) {
      return r(o(this), e, arguments.length > 1 ? arguments[1] : void 0);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(88),
      o = i.aTypedArray;
    i.exportProto('fill', function(e) {
      return r.apply(o(this), arguments);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(12).filter,
      o = n(30),
      a = i.aTypedArray,
      s = i.aTypedArrayConstructor;
    i.exportProto('filter', function(e) {
      for (
        var t = r(a(this), e, arguments.length > 1 ? arguments[1] : void 0),
          n = o(this, this.constructor),
          i = 0,
          l = t.length,
          c = new (s(n))(l);
        l > i;

      )
        c[i] = t[i++];
      return c;
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(12).find,
      o = i.aTypedArray;
    i.exportProto('find', function(e) {
      return r(o(this), e, arguments.length > 1 ? arguments[1] : void 0);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(12).findIndex,
      o = i.aTypedArray;
    i.exportProto('findIndex', function(e) {
      return r(o(this), e, arguments.length > 1 ? arguments[1] : void 0);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(12).forEach,
      o = i.aTypedArray;
    i.exportProto('forEach', function(e) {
      r(o(this), e, arguments.length > 1 ? arguments[1] : void 0);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(53).includes,
      o = i.aTypedArray;
    i.exportProto('includes', function(e) {
      return r(o(this), e, arguments.length > 1 ? arguments[1] : void 0);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(53).indexOf,
      o = i.aTypedArray;
    i.exportProto('indexOf', function(e) {
      return r(o(this), e, arguments.length > 1 ? arguments[1] : void 0);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(2),
      r = n(5),
      o = n(69),
      a = n(7)('iterator'),
      s = i.Uint8Array,
      l = o.values,
      c = o.keys,
      d = o.entries,
      u = r.aTypedArray,
      f = r.exportProto,
      p = s && s.prototype[a],
      h = !!p && ('values' == p.name || null == p.name),
      g = function() {
        return l.call(u(this));
      };
    f('entries', function() {
      return d.call(u(this));
    }),
      f('keys', function() {
        return c.call(u(this));
      }),
      f('values', g, !h),
      f(a, g, !h);
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = i.aTypedArray,
      o = [].join;
    i.exportProto('join', function(e) {
      return o.apply(r(this), arguments);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(120),
      o = i.aTypedArray;
    i.exportProto('lastIndexOf', function(e) {
      return r.apply(o(this), arguments);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(12).map,
      o = n(30),
      a = i.aTypedArray,
      s = i.aTypedArrayConstructor;
    i.exportProto('map', function(e) {
      return r(a(this), e, arguments.length > 1 ? arguments[1] : void 0, function(e, t) {
        return new (s(o(e, e.constructor)))(t);
      });
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(68).left,
      o = i.aTypedArray;
    i.exportProto('reduce', function(e) {
      return r(o(this), e, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(68).right,
      o = i.aTypedArray;
    i.exportProto('reduceRight', function(e) {
      return r(o(this), e, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = i.aTypedArray,
      o = Math.floor;
    i.exportProto('reverse', function() {
      for (var e, t = r(this).length, n = o(t / 2), i = 0; i < n; )
        (e = this[i]), (this[i++] = this[--t]), (this[t] = e);
      return this;
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(8),
      o = n(136),
      a = n(10),
      s = n(1),
      l = i.aTypedArray,
      c = s(function() {
        new Int8Array(1).set({});
      });
    i.exportProto(
      'set',
      function(e) {
        l(this);
        var t = o(arguments.length > 1 ? arguments[1] : void 0, 1),
          n = this.length,
          i = a(e),
          s = r(i.length),
          c = 0;
        if (s + t > n) throw RangeError('Wrong length');
        for (; c < s; ) this[t + c] = i[c++];
      },
      c
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(30),
      o = n(1),
      a = i.aTypedArray,
      s = i.aTypedArrayConstructor,
      l = [].slice,
      c = o(function() {
        new Int8Array(1).slice();
      });
    i.exportProto(
      'slice',
      function(e, t) {
        for (
          var n = l.call(a(this), e, t), i = r(this, this.constructor), o = 0, c = n.length, d = new (s(i))(c);
          c > o;

        )
          d[o] = n[o++];
        return d;
      },
      c
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(12).some,
      o = i.aTypedArray;
    i.exportProto('some', function(e) {
      return r(o(this), e, arguments.length > 1 ? arguments[1] : void 0);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = i.aTypedArray,
      o = [].sort;
    i.exportProto('sort', function(e) {
      return o.call(r(this), e);
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(5),
      r = n(8),
      o = n(33),
      a = n(30),
      s = i.aTypedArray;
    i.exportProto('subarray', function(e, t) {
      var n = s(this),
        i = n.length,
        l = o(e, i);
      return new (a(n, n.constructor))(
        n.buffer,
        n.byteOffset + l * n.BYTES_PER_ELEMENT,
        r((void 0 === t ? i : o(t, i)) - l)
      );
    });
  },
  function(e, t, n) {
    'use strict';
    var i = n(2),
      r = n(5),
      o = n(1),
      a = i.Int8Array,
      s = r.aTypedArray,
      l = [].toLocaleString,
      c = [].slice,
      d =
        !!a &&
        o(function() {
          l.call(new a(1));
        }),
      u =
        o(function() {
          return [1, 2].toLocaleString() != new a([1, 2]).toLocaleString();
        }) ||
        !o(function() {
          a.prototype.toLocaleString.call([1, 2]);
        });
    r.exportProto(
      'toLocaleString',
      function() {
        return l.apply(d ? c.call(s(this)) : s(this), arguments);
      },
      u
    );
  },
  function(e, t, n) {
    'use strict';
    var i = n(2),
      r = n(5),
      o = n(1),
      a = i.Uint8Array,
      s = a && a.prototype,
      l = [].toString,
      c = [].join;
    o(function() {
      l.call({});
    }) &&
      (l = function() {
        return c.call(this);
      }),
      r.exportProto('toString', l, (s || {}).toString != l);
  },
  function(e, t, n) {
    var i = n(0),
      r = n(32),
      o = n(18),
      a = n(4),
      s = n(1),
      l = r('Reflect', 'apply'),
      c = Function.apply;
    i(
      {
        target: 'Reflect',
        stat: !0,
        forced: !s(function() {
          l(function() {});
        })
      },
      {
        apply: function(e, t, n) {
          return o(e), a(n), l ? l(e, t, n) : c.call(e, t, n);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(32),
      o = n(18),
      a = n(4),
      s = n(3),
      l = n(34),
      c = n(115),
      d = n(1),
      u = r('Reflect', 'construct'),
      f = d(function() {
        function e() {}
        return !(u(function() {}, [], e) instanceof e);
      }),
      p = !d(function() {
        u(function() {});
      }),
      h = f || p;
    i(
      { target: 'Reflect', stat: !0, forced: h, sham: h },
      {
        construct: function(e, t) {
          o(e), a(t);
          var n = arguments.length < 3 ? e : o(arguments[2]);
          if (p && !f) return u(e, t, n);
          if (e == n) {
            switch (t.length) {
              case 0:
                return new e();
              case 1:
                return new e(t[0]);
              case 2:
                return new e(t[0], t[1]);
              case 3:
                return new e(t[0], t[1], t[2]);
              case 4:
                return new e(t[0], t[1], t[2], t[3]);
            }
            var i = [null];
            return i.push.apply(i, t), new (c.apply(e, i))();
          }
          var r = n.prototype,
            d = l(s(r) ? r : Object.prototype),
            h = Function.apply.call(e, d, t);
          return s(h) ? h : d;
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(6),
      o = n(4),
      a = n(25),
      s = n(9);
    i(
      {
        target: 'Reflect',
        stat: !0,
        forced: n(1)(function() {
          Reflect.defineProperty(s.f({}, 1, { value: 1 }), 1, { value: 2 });
        }),
        sham: !r
      },
      {
        defineProperty: function(e, t, n) {
          o(e);
          var i = a(t, !0);
          o(n);
          try {
            return s.f(e, i, n), !0;
          } catch (e) {
            return !1;
          }
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(4),
      o = n(16).f;
    i(
      { target: 'Reflect', stat: !0 },
      {
        deleteProperty: function(e, t) {
          var n = o(r(e), t);
          return !(n && !n.configurable) && delete e[t];
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(3),
      o = n(4),
      a = n(11),
      s = n(16),
      l = n(27);
    i(
      { target: 'Reflect', stat: !0 },
      {
        get: function e(t, n) {
          var i,
            c,
            d = arguments.length < 3 ? t : arguments[2];
          return o(t) === d
            ? t[n]
            : (i = s.f(t, n))
            ? a(i, 'value')
              ? i.value
              : void 0 === i.get
              ? void 0
              : i.get.call(d)
            : r((c = l(t)))
            ? e(c, n, d)
            : void 0;
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(6),
      o = n(4),
      a = n(16);
    i(
      { target: 'Reflect', stat: !0, sham: !r },
      {
        getOwnPropertyDescriptor: function(e, t) {
          return a.f(o(e), t);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(4),
      o = n(27);
    i(
      { target: 'Reflect', stat: !0, sham: !n(87) },
      {
        getPrototypeOf: function(e) {
          return o(r(e));
        }
      }
    );
  },
  function(e, t, n) {
    n(0)(
      { target: 'Reflect', stat: !0 },
      {
        has: function(e, t) {
          return t in e;
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(4),
      o = Object.isExtensible;
    i(
      { target: 'Reflect', stat: !0 },
      {
        isExtensible: function(e) {
          return r(e), !o || o(e);
        }
      }
    );
  },
  function(e, t, n) {
    n(0)({ target: 'Reflect', stat: !0 }, { ownKeys: n(82) });
  },
  function(e, t, n) {
    var i = n(0),
      r = n(32),
      o = n(4);
    i(
      { target: 'Reflect', stat: !0, sham: !n(57) },
      {
        preventExtensions: function(e) {
          o(e);
          try {
            var t = r('Object', 'preventExtensions');
            return t && t(e), !0;
          } catch (e) {
            return !1;
          }
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(4),
      o = n(3),
      a = n(11),
      s = n(9),
      l = n(16),
      c = n(27),
      d = n(38);
    i(
      { target: 'Reflect', stat: !0 },
      {
        set: function e(t, n, i) {
          var u,
            f,
            p = arguments.length < 4 ? t : arguments[3],
            h = l.f(r(t), n);
          if (!h) {
            if (o((f = c(t)))) return e(f, n, i, p);
            h = d(0);
          }
          if (a(h, 'value')) {
            if (!1 === h.writable || !o(p)) return !1;
            if ((u = l.f(p, n))) {
              if (u.get || u.set || !1 === u.writable) return !1;
              (u.value = i), s.f(p, n, u);
            } else s.f(p, n, d(0, i));
            return !0;
          }
          return void 0 !== h.set && (h.set.call(p, i), !0);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(4),
      o = n(114),
      a = n(45);
    a &&
      i(
        { target: 'Reflect', stat: !0 },
        {
          setPrototypeOf: function(e, t) {
            r(e), o(t);
            try {
              return a(e, t), !0;
            } catch (e) {
              return !1;
            }
          }
        }
      );
  },
  function(e, t, n) {
    n(377), n(378), n(379), n(380), n(381), n(382), n(385), n(140), (e.exports = n(43));
  },
  function(e, t, n) {
    var i = n(2),
      r = n(138),
      o = n(119),
      a = n(13);
    for (var s in r) {
      var l = i[s],
        c = l && l.prototype;
      if (c && c.forEach !== o)
        try {
          a(c, 'forEach', o);
        } catch (e) {
          c.forEach = o;
        }
    }
  },
  function(e, t, n) {
    var i = n(2),
      r = n(138),
      o = n(69),
      a = n(13),
      s = n(7),
      l = s('iterator'),
      c = s('toStringTag'),
      d = o.values;
    for (var u in r) {
      var f = i[u],
        p = f && f.prototype;
      if (p) {
        if (p[l] !== d)
          try {
            a(p, l, d);
          } catch (e) {
            p[l] = d;
          }
        if ((p[c] || a(p, c, u), r[u]))
          for (var h in o)
            if (p[h] !== o[h])
              try {
                a(p, h, o[h]);
              } catch (e) {
                p[h] = o[h];
              }
      }
    }
  },
  function(e, t, n) {
    var i = n(2),
      r = n(98),
      o = !i.setImmediate || !i.clearImmediate;
    n(0)({ global: !0, bind: !0, enumerable: !0, forced: o }, { setImmediate: r.set, clearImmediate: r.clear });
  },
  function(e, t, n) {
    var i = n(0),
      r = n(2),
      o = n(130),
      a = n(24),
      s = r.process,
      l = 'process' == a(s);
    i(
      { global: !0, enumerable: !0, noTargetGet: !0 },
      {
        queueMicrotask: function(e) {
          var t = l && s.domain;
          o(t ? t.bind(e) : e);
        }
      }
    );
  },
  function(e, t, n) {
    var i = n(0),
      r = n(2),
      o = n(63),
      a = [].slice,
      s = function(e) {
        return function(t, n) {
          var i = arguments.length > 2,
            r = i ? a.call(arguments, 2) : void 0;
          return e(
            i
              ? function() {
                  ('function' == typeof t ? t : Function(t)).apply(this, r);
                }
              : t,
            n
          );
        };
      };
    i(
      { global: !0, bind: !0, forced: /MSIE .\./.test(o) },
      { setTimeout: s(r.setTimeout), setInterval: s(r.setInterval) }
    );
  },
  function(e, t, n) {
    'use strict';
    n(123);
    var i,
      r = n(0),
      o = n(6),
      a = n(139),
      s = n(2),
      l = n(85),
      c = n(14),
      d = n(37),
      u = n(11),
      f = n(110),
      p = n(116),
      h = n(70).codeAt,
      g = n(383),
      m = n(26),
      v = n(140),
      b = n(20),
      w = s.URL,
      S = v.URLSearchParams,
      y = v.getState,
      _ = b.set,
      C = b.getterFor('URL'),
      x = Math.floor,
      I = Math.pow,
      T = /[A-Za-z]/,
      N = /[\d+\-.A-Za-z]/,
      k = /\d/,
      $ = /^(0x|0X)/,
      P = /^[0-7]+$/,
      E = /^\d+$/,
      L = /^[\dA-Fa-f]+$/,
      R = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,
      A = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/,
      D = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,
      O = /[\u0009\u000A\u000D]/g,
      V = function(e, t) {
        var n, i, r;
        if ('[' == t.charAt(0)) {
          if (']' != t.charAt(t.length - 1)) return 'Invalid host';
          if (!(n = F(t.slice(1, -1)))) return 'Invalid host';
          e.host = n;
        } else if (q(e)) {
          if (((t = g(t)), R.test(t))) return 'Invalid host';
          if (null === (n = M(t))) return 'Invalid host';
          e.host = n;
        } else {
          if (A.test(t)) return 'Invalid host';
          for (n = '', i = p(t), r = 0; r < i.length; r++) n += G(i[r], U);
          e.host = n;
        }
      },
      M = function(e) {
        var t,
          n,
          i,
          r,
          o,
          a,
          s,
          l = e.split('.');
        if ((l.length && '' == l[l.length - 1] && l.pop(), (t = l.length) > 4)) return e;
        for (n = [], i = 0; i < t; i++) {
          if ('' == (r = l[i])) return e;
          if (
            ((o = 10),
            r.length > 1 && '0' == r.charAt(0) && ((o = $.test(r) ? 16 : 8), (r = r.slice(8 == o ? 1 : 2))),
            '' === r)
          )
            a = 0;
          else {
            if (!(10 == o ? E : 8 == o ? P : L).test(r)) return e;
            a = parseInt(r, o);
          }
          n.push(a);
        }
        for (i = 0; i < t; i++)
          if (((a = n[i]), i == t - 1)) {
            if (a >= I(256, 5 - t)) return null;
          } else if (a > 255) return null;
        for (s = n.pop(), i = 0; i < n.length; i++) s += n[i] * I(256, 3 - i);
        return s;
      },
      F = function(e) {
        var t,
          n,
          i,
          r,
          o,
          a,
          s,
          l = [0, 0, 0, 0, 0, 0, 0, 0],
          c = 0,
          d = null,
          u = 0,
          f = function() {
            return e.charAt(u);
          };
        if (':' == f()) {
          if (':' != e.charAt(1)) return;
          (u += 2), (d = ++c);
        }
        for (; f(); ) {
          if (8 == c) return;
          if (':' != f()) {
            for (t = n = 0; n < 4 && L.test(f()); ) (t = 16 * t + parseInt(f(), 16)), u++, n++;
            if ('.' == f()) {
              if (0 == n) return;
              if (((u -= n), c > 6)) return;
              for (i = 0; f(); ) {
                if (((r = null), i > 0)) {
                  if (!('.' == f() && i < 4)) return;
                  u++;
                }
                if (!k.test(f())) return;
                for (; k.test(f()); ) {
                  if (((o = parseInt(f(), 10)), null === r)) r = o;
                  else {
                    if (0 == r) return;
                    r = 10 * r + o;
                  }
                  if (r > 255) return;
                  u++;
                }
                (l[c] = 256 * l[c] + r), (2 != ++i && 4 != i) || c++;
              }
              if (4 != i) return;
              break;
            }
            if (':' == f()) {
              if ((u++, !f())) return;
            } else if (f()) return;
            l[c++] = t;
          } else {
            if (null !== d) return;
            u++, (d = ++c);
          }
        }
        if (null !== d) for (a = c - d, c = 7; 0 != c && a > 0; ) (s = l[c]), (l[c--] = l[d + a - 1]), (l[d + --a] = s);
        else if (8 != c) return;
        return l;
      },
      j = function(e) {
        var t, n, i, r;
        if ('number' == typeof e) {
          for (t = [], n = 0; n < 4; n++) t.unshift(e % 256), (e = x(e / 256));
          return t.join('.');
        }
        if ('object' == typeof e) {
          for (
            t = '',
              i = (function(e) {
                for (var t = null, n = 1, i = null, r = 0, o = 0; o < 8; o++)
                  0 !== e[o] ? (r > n && ((t = i), (n = r)), (i = null), (r = 0)) : (null === i && (i = o), ++r);
                return r > n && ((t = i), (n = r)), t;
              })(e),
              n = 0;
            n < 8;
            n++
          )
            (r && 0 === e[n]) ||
              (r && (r = !1),
              i === n ? ((t += n ? ':' : '::'), (r = !0)) : ((t += e[n].toString(16)), n < 7 && (t += ':')));
          return '[' + t + ']';
        }
        return e;
      },
      U = {},
      B = f({}, U, { ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1 }),
      z = f({}, B, { '#': 1, '?': 1, '{': 1, '}': 1 }),
      W = f({}, z, { '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1 }),
      G = function(e, t) {
        var n = h(e, 0);
        return n > 32 && n < 127 && !u(t, e) ? e : encodeURIComponent(e);
      },
      H = { ftp: 21, file: null, gopher: 70, http: 80, https: 443, ws: 80, wss: 443 },
      q = function(e) {
        return u(H, e.scheme);
      },
      K = function(e) {
        return '' != e.username || '' != e.password;
      },
      J = function(e) {
        return !e.host || e.cannotBeABaseURL || 'file' == e.scheme;
      },
      Y = function(e, t) {
        var n;
        return 2 == e.length && T.test(e.charAt(0)) && (':' == (n = e.charAt(1)) || (!t && '|' == n));
      },
      Q = function(e) {
        var t;
        return (
          e.length > 1 &&
          Y(e.slice(0, 2)) &&
          (2 == e.length || '/' === (t = e.charAt(2)) || '\\' === t || '?' === t || '#' === t)
        );
      },
      X = function(e) {
        var t = e.path,
          n = t.length;
        !n || ('file' == e.scheme && 1 == n && Y(t[0], !0)) || t.pop();
      },
      Z = function(e) {
        return '.' === e || '%2e' === e.toLowerCase();
      },
      ee = {},
      te = {},
      ne = {},
      ie = {},
      re = {},
      oe = {},
      ae = {},
      se = {},
      le = {},
      ce = {},
      de = {},
      ue = {},
      fe = {},
      pe = {},
      he = {},
      ge = {},
      me = {},
      ve = {},
      be = {},
      we = {},
      Se = {},
      ye = function(e, t, n, r) {
        var o,
          a,
          s,
          l,
          c,
          d = n || ee,
          f = 0,
          h = '',
          g = !1,
          m = !1,
          v = !1;
        for (
          n ||
            ((e.scheme = ''),
            (e.username = ''),
            (e.password = ''),
            (e.host = null),
            (e.port = null),
            (e.path = []),
            (e.query = null),
            (e.fragment = null),
            (e.cannotBeABaseURL = !1),
            (t = t.replace(D, ''))),
            t = t.replace(O, ''),
            o = p(t);
          f <= o.length;

        ) {
          switch (((a = o[f]), d)) {
            case ee:
              if (!a || !T.test(a)) {
                if (n) return 'Invalid scheme';
                d = ne;
                continue;
              }
              (h += a.toLowerCase()), (d = te);
              break;
            case te:
              if (a && (N.test(a) || '+' == a || '-' == a || '.' == a)) h += a.toLowerCase();
              else {
                if (':' != a) {
                  if (n) return 'Invalid scheme';
                  (h = ''), (d = ne), (f = 0);
                  continue;
                }
                if (
                  n &&
                  (q(e) != u(H, h) || ('file' == h && (K(e) || null !== e.port)) || ('file' == e.scheme && !e.host))
                )
                  return;
                if (((e.scheme = h), n)) return void (q(e) && H[e.scheme] == e.port && (e.port = null));
                (h = ''),
                  'file' == e.scheme
                    ? (d = pe)
                    : q(e) && r && r.scheme == e.scheme
                    ? (d = ie)
                    : q(e)
                    ? (d = se)
                    : '/' == o[f + 1]
                    ? ((d = re), f++)
                    : ((e.cannotBeABaseURL = !0), e.path.push(''), (d = be));
              }
              break;
            case ne:
              if (!r || (r.cannotBeABaseURL && '#' != a)) return 'Invalid scheme';
              if (r.cannotBeABaseURL && '#' == a) {
                (e.scheme = r.scheme),
                  (e.path = r.path.slice()),
                  (e.query = r.query),
                  (e.fragment = ''),
                  (e.cannotBeABaseURL = !0),
                  (d = Se);
                break;
              }
              d = 'file' == r.scheme ? pe : oe;
              continue;
            case ie:
              if ('/' != a || '/' != o[f + 1]) {
                d = oe;
                continue;
              }
              (d = le), f++;
              break;
            case re:
              if ('/' == a) {
                d = ce;
                break;
              }
              d = ve;
              continue;
            case oe:
              if (((e.scheme = r.scheme), a == i))
                (e.username = r.username),
                  (e.password = r.password),
                  (e.host = r.host),
                  (e.port = r.port),
                  (e.path = r.path.slice()),
                  (e.query = r.query);
              else if ('/' == a || ('\\' == a && q(e))) d = ae;
              else if ('?' == a)
                (e.username = r.username),
                  (e.password = r.password),
                  (e.host = r.host),
                  (e.port = r.port),
                  (e.path = r.path.slice()),
                  (e.query = ''),
                  (d = we);
              else {
                if ('#' != a) {
                  (e.username = r.username),
                    (e.password = r.password),
                    (e.host = r.host),
                    (e.port = r.port),
                    (e.path = r.path.slice()),
                    e.path.pop(),
                    (d = ve);
                  continue;
                }
                (e.username = r.username),
                  (e.password = r.password),
                  (e.host = r.host),
                  (e.port = r.port),
                  (e.path = r.path.slice()),
                  (e.query = r.query),
                  (e.fragment = ''),
                  (d = Se);
              }
              break;
            case ae:
              if (!q(e) || ('/' != a && '\\' != a)) {
                if ('/' != a) {
                  (e.username = r.username), (e.password = r.password), (e.host = r.host), (e.port = r.port), (d = ve);
                  continue;
                }
                d = ce;
              } else d = le;
              break;
            case se:
              if (((d = le), '/' != a || '/' != h.charAt(f + 1))) continue;
              f++;
              break;
            case le:
              if ('/' != a && '\\' != a) {
                d = ce;
                continue;
              }
              break;
            case ce:
              if ('@' == a) {
                g && (h = '%40' + h), (g = !0), (s = p(h));
                for (var b = 0; b < s.length; b++) {
                  var w = s[b];
                  if (':' != w || v) {
                    var S = G(w, W);
                    v ? (e.password += S) : (e.username += S);
                  } else v = !0;
                }
                h = '';
              } else if (a == i || '/' == a || '?' == a || '#' == a || ('\\' == a && q(e))) {
                if (g && '' == h) return 'Invalid authority';
                (f -= p(h).length + 1), (h = ''), (d = de);
              } else h += a;
              break;
            case de:
            case ue:
              if (n && 'file' == e.scheme) {
                d = ge;
                continue;
              }
              if (':' != a || m) {
                if (a == i || '/' == a || '?' == a || '#' == a || ('\\' == a && q(e))) {
                  if (q(e) && '' == h) return 'Invalid host';
                  if (n && '' == h && (K(e) || null !== e.port)) return;
                  if ((l = V(e, h))) return l;
                  if (((h = ''), (d = me), n)) return;
                  continue;
                }
                '[' == a ? (m = !0) : ']' == a && (m = !1), (h += a);
              } else {
                if ('' == h) return 'Invalid host';
                if ((l = V(e, h))) return l;
                if (((h = ''), (d = fe), n == ue)) return;
              }
              break;
            case fe:
              if (!k.test(a)) {
                if (a == i || '/' == a || '?' == a || '#' == a || ('\\' == a && q(e)) || n) {
                  if ('' != h) {
                    var y = parseInt(h, 10);
                    if (y > 65535) return 'Invalid port';
                    (e.port = q(e) && y === H[e.scheme] ? null : y), (h = '');
                  }
                  if (n) return;
                  d = me;
                  continue;
                }
                return 'Invalid port';
              }
              h += a;
              break;
            case pe:
              if (((e.scheme = 'file'), '/' == a || '\\' == a)) d = he;
              else {
                if (!r || 'file' != r.scheme) {
                  d = ve;
                  continue;
                }
                if (a == i) (e.host = r.host), (e.path = r.path.slice()), (e.query = r.query);
                else if ('?' == a) (e.host = r.host), (e.path = r.path.slice()), (e.query = ''), (d = we);
                else {
                  if ('#' != a) {
                    Q(o.slice(f).join('')) || ((e.host = r.host), (e.path = r.path.slice()), X(e)), (d = ve);
                    continue;
                  }
                  (e.host = r.host), (e.path = r.path.slice()), (e.query = r.query), (e.fragment = ''), (d = Se);
                }
              }
              break;
            case he:
              if ('/' == a || '\\' == a) {
                d = ge;
                break;
              }
              r &&
                'file' == r.scheme &&
                !Q(o.slice(f).join('')) &&
                (Y(r.path[0], !0) ? e.path.push(r.path[0]) : (e.host = r.host)),
                (d = ve);
              continue;
            case ge:
              if (a == i || '/' == a || '\\' == a || '?' == a || '#' == a) {
                if (!n && Y(h)) d = ve;
                else if ('' == h) {
                  if (((e.host = ''), n)) return;
                  d = me;
                } else {
                  if ((l = V(e, h))) return l;
                  if (('localhost' == e.host && (e.host = ''), n)) return;
                  (h = ''), (d = me);
                }
                continue;
              }
              h += a;
              break;
            case me:
              if (q(e)) {
                if (((d = ve), '/' != a && '\\' != a)) continue;
              } else if (n || '?' != a)
                if (n || '#' != a) {
                  if (a != i && ((d = ve), '/' != a)) continue;
                } else (e.fragment = ''), (d = Se);
              else (e.query = ''), (d = we);
              break;
            case ve:
              if (a == i || '/' == a || ('\\' == a && q(e)) || (!n && ('?' == a || '#' == a))) {
                if (
                  ('..' === (c = (c = h).toLowerCase()) || '%2e.' === c || '.%2e' === c || '%2e%2e' === c
                    ? (X(e), '/' == a || ('\\' == a && q(e)) || e.path.push(''))
                    : Z(h)
                    ? '/' == a || ('\\' == a && q(e)) || e.path.push('')
                    : ('file' == e.scheme &&
                        !e.path.length &&
                        Y(h) &&
                        (e.host && (e.host = ''), (h = h.charAt(0) + ':')),
                      e.path.push(h)),
                  (h = ''),
                  'file' == e.scheme && (a == i || '?' == a || '#' == a))
                )
                  for (; e.path.length > 1 && '' === e.path[0]; ) e.path.shift();
                '?' == a ? ((e.query = ''), (d = we)) : '#' == a && ((e.fragment = ''), (d = Se));
              } else h += G(a, z);
              break;
            case be:
              '?' == a
                ? ((e.query = ''), (d = we))
                : '#' == a
                ? ((e.fragment = ''), (d = Se))
                : a != i && (e.path[0] += G(a, U));
              break;
            case we:
              n || '#' != a
                ? a != i && ("'" == a && q(e) ? (e.query += '%27') : (e.query += '#' == a ? '%23' : G(a, U)))
                : ((e.fragment = ''), (d = Se));
              break;
            case Se:
              a != i && (e.fragment += G(a, B));
          }
          f++;
        }
      },
      _e = function(e) {
        var t,
          n,
          i = d(this, _e, 'URL'),
          r = arguments.length > 1 ? arguments[1] : void 0,
          a = String(e),
          s = _(i, { type: 'URL' });
        if (void 0 !== r)
          if (r instanceof _e) t = C(r);
          else if ((n = ye((t = {}), String(r)))) throw TypeError(n);
        if ((n = ye(s, a, null, t))) throw TypeError(n);
        var l = (s.searchParams = new S()),
          c = y(l);
        c.updateSearchParams(s.query),
          (c.updateURL = function() {
            s.query = String(l) || null;
          }),
          o ||
            ((i.href = xe.call(i)),
            (i.origin = Ie.call(i)),
            (i.protocol = Te.call(i)),
            (i.username = Ne.call(i)),
            (i.password = ke.call(i)),
            (i.host = $e.call(i)),
            (i.hostname = Pe.call(i)),
            (i.port = Ee.call(i)),
            (i.pathname = Le.call(i)),
            (i.search = Re.call(i)),
            (i.searchParams = Ae.call(i)),
            (i.hash = De.call(i)));
      },
      Ce = _e.prototype,
      xe = function() {
        var e = C(this),
          t = e.scheme,
          n = e.username,
          i = e.password,
          r = e.host,
          o = e.port,
          a = e.path,
          s = e.query,
          l = e.fragment,
          c = t + ':';
        return (
          null !== r
            ? ((c += '//'), K(e) && (c += n + (i ? ':' + i : '') + '@'), (c += j(r)), null !== o && (c += ':' + o))
            : 'file' == t && (c += '//'),
          (c += e.cannotBeABaseURL ? a[0] : a.length ? '/' + a.join('/') : ''),
          null !== s && (c += '?' + s),
          null !== l && (c += '#' + l),
          c
        );
      },
      Ie = function() {
        var e = C(this),
          t = e.scheme,
          n = e.port;
        if ('blob' == t)
          try {
            return new URL(t.path[0]).origin;
          } catch (e) {
            return 'null';
          }
        return 'file' != t && q(e) ? t + '://' + j(e.host) + (null !== n ? ':' + n : '') : 'null';
      },
      Te = function() {
        return C(this).scheme + ':';
      },
      Ne = function() {
        return C(this).username;
      },
      ke = function() {
        return C(this).password;
      },
      $e = function() {
        var e = C(this),
          t = e.host,
          n = e.port;
        return null === t ? '' : null === n ? j(t) : j(t) + ':' + n;
      },
      Pe = function() {
        var e = C(this).host;
        return null === e ? '' : j(e);
      },
      Ee = function() {
        var e = C(this).port;
        return null === e ? '' : String(e);
      },
      Le = function() {
        var e = C(this),
          t = e.path;
        return e.cannotBeABaseURL ? t[0] : t.length ? '/' + t.join('/') : '';
      },
      Re = function() {
        var e = C(this).query;
        return e ? '?' + e : '';
      },
      Ae = function() {
        return C(this).searchParams;
      },
      De = function() {
        var e = C(this).fragment;
        return e ? '#' + e : '';
      },
      Oe = function(e, t) {
        return { get: e, set: t, configurable: !0, enumerable: !0 };
      };
    if (
      (o &&
        l(Ce, {
          href: Oe(xe, function(e) {
            var t = C(this),
              n = String(e),
              i = ye(t, n);
            if (i) throw TypeError(i);
            y(t.searchParams).updateSearchParams(t.query);
          }),
          origin: Oe(Ie),
          protocol: Oe(Te, function(e) {
            var t = C(this);
            ye(t, String(e) + ':', ee);
          }),
          username: Oe(Ne, function(e) {
            var t = C(this),
              n = p(String(e));
            if (!J(t)) {
              t.username = '';
              for (var i = 0; i < n.length; i++) t.username += G(n[i], W);
            }
          }),
          password: Oe(ke, function(e) {
            var t = C(this),
              n = p(String(e));
            if (!J(t)) {
              t.password = '';
              for (var i = 0; i < n.length; i++) t.password += G(n[i], W);
            }
          }),
          host: Oe($e, function(e) {
            var t = C(this);
            t.cannotBeABaseURL || ye(t, String(e), de);
          }),
          hostname: Oe(Pe, function(e) {
            var t = C(this);
            t.cannotBeABaseURL || ye(t, String(e), ue);
          }),
          port: Oe(Ee, function(e) {
            var t = C(this);
            J(t) || ('' == (e = String(e)) ? (t.port = null) : ye(t, e, fe));
          }),
          pathname: Oe(Le, function(e) {
            var t = C(this);
            t.cannotBeABaseURL || ((t.path = []), ye(t, e + '', me));
          }),
          search: Oe(Re, function(e) {
            var t = C(this);
            '' == (e = String(e))
              ? (t.query = null)
              : ('?' == e.charAt(0) && (e = e.slice(1)), (t.query = ''), ye(t, e, we)),
              y(t.searchParams).updateSearchParams(t.query);
          }),
          searchParams: Oe(Ae),
          hash: Oe(De, function(e) {
            var t = C(this);
            '' != (e = String(e))
              ? ('#' == e.charAt(0) && (e = e.slice(1)), (t.fragment = ''), ye(t, e, Se))
              : (t.fragment = null);
          })
        }),
      c(
        Ce,
        'toJSON',
        function() {
          return xe.call(this);
        },
        { enumerable: !0 }
      ),
      c(
        Ce,
        'toString',
        function() {
          return xe.call(this);
        },
        { enumerable: !0 }
      ),
      w)
    ) {
      var Ve = w.createObjectURL,
        Me = w.revokeObjectURL;
      Ve &&
        c(_e, 'createObjectURL', function(e) {
          return Ve.apply(w, arguments);
        }),
        Me &&
          c(_e, 'revokeObjectURL', function(e) {
            return Me.apply(w, arguments);
          });
    }
    m(_e, 'URL'), r({ global: !0, forced: !a, sham: !o }, { URL: _e });
  },
  function(e, t, n) {
    'use strict';
    var i = /[^\0-\u007E]/,
      r = /[.\u3002\uFF0E\uFF61]/g,
      o = 'Overflow: input needs wider integers to process',
      a = Math.floor,
      s = String.fromCharCode,
      l = function(e) {
        return e + 22 + 75 * (e < 26);
      },
      c = function(e, t, n) {
        var i = 0;
        for (e = n ? a(e / 700) : e >> 1, e += a(e / t); e > 455; i += 36) e = a(e / 35);
        return a(i + (36 * e) / (e + 38));
      },
      d = function(e) {
        var t,
          n,
          i = [],
          r = (e = (function(e) {
            for (var t = [], n = 0, i = e.length; n < i; ) {
              var r = e.charCodeAt(n++);
              if (r >= 55296 && r <= 56319 && n < i) {
                var o = e.charCodeAt(n++);
                56320 == (64512 & o) ? t.push(((1023 & r) << 10) + (1023 & o) + 65536) : (t.push(r), n--);
              } else t.push(r);
            }
            return t;
          })(e)).length,
          d = 128,
          u = 0,
          f = 72;
        for (t = 0; t < e.length; t++) (n = e[t]) < 128 && i.push(s(n));
        var p = i.length,
          h = p;
        for (p && i.push('-'); h < r; ) {
          var g = 2147483647;
          for (t = 0; t < e.length; t++) (n = e[t]) >= d && n < g && (g = n);
          var m = h + 1;
          if (g - d > a((2147483647 - u) / m)) throw RangeError(o);
          for (u += (g - d) * m, d = g, t = 0; t < e.length; t++) {
            if ((n = e[t]) < d && ++u > 2147483647) throw RangeError(o);
            if (n == d) {
              for (var v = u, b = 36; ; b += 36) {
                var w = b <= f ? 1 : b >= f + 26 ? 26 : b - f;
                if (v < w) break;
                var S = v - w,
                  y = 36 - w;
                i.push(s(l(w + (S % y)))), (v = a(S / y));
              }
              i.push(s(l(v))), (f = c(u, m, h == p)), (u = 0), ++h;
            }
          }
          ++u, ++d;
        }
        return i.join('');
      };
    e.exports = function(e) {
      var t,
        n,
        o = [],
        a = e
          .toLowerCase()
          .replace(r, '.')
          .split('.');
      for (t = 0; t < a.length; t++) (n = a[t]), o.push(i.test(n) ? 'xn--' + d(n) : n);
      return o.join('.');
    };
  },
  function(e, t, n) {
    var i = n(4),
      r = n(59);
    e.exports = function(e) {
      var t = r(e);
      if ('function' != typeof t) throw TypeError(String(e) + ' is not iterable');
      return i(t.call(e));
    };
  },
  function(e, t, n) {
    'use strict';
    n(0)(
      { target: 'URL', proto: !0, enumerable: !0 },
      {
        toJSON: function() {
          return URL.prototype.toString.call(this);
        }
      }
    );
  },
  function(e, t, n) {
    var i = (function(e) {
      'use strict';
      var t,
        n = Object.prototype,
        i = n.hasOwnProperty,
        r = 'function' == typeof Symbol ? Symbol : {},
        o = r.iterator || '@@iterator',
        a = r.asyncIterator || '@@asyncIterator',
        s = r.toStringTag || '@@toStringTag';
      function l(e, t, n, i) {
        var r = t && t.prototype instanceof g ? t : g,
          o = Object.create(r.prototype),
          a = new N(i || []);
        return (
          (o._invoke = (function(e, t, n) {
            var i = d;
            return function(r, o) {
              if (i === f) throw new Error('Generator is already running');
              if (i === p) {
                if ('throw' === r) throw o;
                return $();
              }
              for (n.method = r, n.arg = o; ; ) {
                var a = n.delegate;
                if (a) {
                  var s = x(a, n);
                  if (s) {
                    if (s === h) continue;
                    return s;
                  }
                }
                if ('next' === n.method) n.sent = n._sent = n.arg;
                else if ('throw' === n.method) {
                  if (i === d) throw ((i = p), n.arg);
                  n.dispatchException(n.arg);
                } else 'return' === n.method && n.abrupt('return', n.arg);
                i = f;
                var l = c(e, t, n);
                if ('normal' === l.type) {
                  if (((i = n.done ? p : u), l.arg === h)) continue;
                  return { value: l.arg, done: n.done };
                }
                'throw' === l.type && ((i = p), (n.method = 'throw'), (n.arg = l.arg));
              }
            };
          })(e, n, a)),
          o
        );
      }
      function c(e, t, n) {
        try {
          return { type: 'normal', arg: e.call(t, n) };
        } catch (e) {
          return { type: 'throw', arg: e };
        }
      }
      e.wrap = l;
      var d = 'suspendedStart',
        u = 'suspendedYield',
        f = 'executing',
        p = 'completed',
        h = {};
      function g() {}
      function m() {}
      function v() {}
      var b = {};
      b[o] = function() {
        return this;
      };
      var w = Object.getPrototypeOf,
        S = w && w(w(k([])));
      S && S !== n && i.call(S, o) && (b = S);
      var y = (v.prototype = g.prototype = Object.create(b));
      function _(e) {
        ['next', 'throw', 'return'].forEach(function(t) {
          e[t] = function(e) {
            return this._invoke(t, e);
          };
        });
      }
      function C(e) {
        var t;
        this._invoke = function(n, r) {
          function o() {
            return new Promise(function(t, o) {
              !(function t(n, r, o, a) {
                var s = c(e[n], e, r);
                if ('throw' !== s.type) {
                  var l = s.arg,
                    d = l.value;
                  return d && 'object' == typeof d && i.call(d, '__await')
                    ? Promise.resolve(d.__await).then(
                        function(e) {
                          t('next', e, o, a);
                        },
                        function(e) {
                          t('throw', e, o, a);
                        }
                      )
                    : Promise.resolve(d).then(
                        function(e) {
                          (l.value = e), o(l);
                        },
                        function(e) {
                          return t('throw', e, o, a);
                        }
                      );
                }
                a(s.arg);
              })(n, r, t, o);
            });
          }
          return (t = t ? t.then(o, o) : o());
        };
      }
      function x(e, n) {
        var i = e.iterator[n.method];
        if (i === t) {
          if (((n.delegate = null), 'throw' === n.method)) {
            if (e.iterator.return && ((n.method = 'return'), (n.arg = t), x(e, n), 'throw' === n.method)) return h;
            (n.method = 'throw'), (n.arg = new TypeError("The iterator does not provide a 'throw' method"));
          }
          return h;
        }
        var r = c(i, e.iterator, n.arg);
        if ('throw' === r.type) return (n.method = 'throw'), (n.arg = r.arg), (n.delegate = null), h;
        var o = r.arg;
        return o
          ? o.done
            ? ((n[e.resultName] = o.value),
              (n.next = e.nextLoc),
              'return' !== n.method && ((n.method = 'next'), (n.arg = t)),
              (n.delegate = null),
              h)
            : o
          : ((n.method = 'throw'), (n.arg = new TypeError('iterator result is not an object')), (n.delegate = null), h);
      }
      function I(e) {
        var t = { tryLoc: e[0] };
        1 in e && (t.catchLoc = e[1]), 2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])), this.tryEntries.push(t);
      }
      function T(e) {
        var t = e.completion || {};
        (t.type = 'normal'), delete t.arg, (e.completion = t);
      }
      function N(e) {
        (this.tryEntries = [{ tryLoc: 'root' }]), e.forEach(I, this), this.reset(!0);
      }
      function k(e) {
        if (e) {
          var n = e[o];
          if (n) return n.call(e);
          if ('function' == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var r = -1,
              a = function n() {
                for (; ++r < e.length; ) if (i.call(e, r)) return (n.value = e[r]), (n.done = !1), n;
                return (n.value = t), (n.done = !0), n;
              };
            return (a.next = a);
          }
        }
        return { next: $ };
      }
      function $() {
        return { value: t, done: !0 };
      }
      return (
        (m.prototype = y.constructor = v),
        (v.constructor = m),
        (v[s] = m.displayName = 'GeneratorFunction'),
        (e.isGeneratorFunction = function(e) {
          var t = 'function' == typeof e && e.constructor;
          return !!t && (t === m || 'GeneratorFunction' === (t.displayName || t.name));
        }),
        (e.mark = function(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, v)
              : ((e.__proto__ = v), s in e || (e[s] = 'GeneratorFunction')),
            (e.prototype = Object.create(y)),
            e
          );
        }),
        (e.awrap = function(e) {
          return { __await: e };
        }),
        _(C.prototype),
        (C.prototype[a] = function() {
          return this;
        }),
        (e.AsyncIterator = C),
        (e.async = function(t, n, i, r) {
          var o = new C(l(t, n, i, r));
          return e.isGeneratorFunction(n)
            ? o
            : o.next().then(function(e) {
                return e.done ? e.value : o.next();
              });
        }),
        _(y),
        (y[s] = 'Generator'),
        (y[o] = function() {
          return this;
        }),
        (y.toString = function() {
          return '[object Generator]';
        }),
        (e.keys = function(e) {
          var t = [];
          for (var n in e) t.push(n);
          return (
            t.reverse(),
            function n() {
              for (; t.length; ) {
                var i = t.pop();
                if (i in e) return (n.value = i), (n.done = !1), n;
              }
              return (n.done = !0), n;
            }
          );
        }),
        (e.values = k),
        (N.prototype = {
          constructor: N,
          reset: function(e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = 'next'),
              (this.arg = t),
              this.tryEntries.forEach(T),
              !e)
            )
              for (var n in this) 't' === n.charAt(0) && i.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t);
          },
          stop: function() {
            this.done = !0;
            var e = this.tryEntries[0].completion;
            if ('throw' === e.type) throw e.arg;
            return this.rval;
          },
          dispatchException: function(e) {
            if (this.done) throw e;
            var n = this;
            function r(i, r) {
              return (s.type = 'throw'), (s.arg = e), (n.next = i), r && ((n.method = 'next'), (n.arg = t)), !!r;
            }
            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
              var a = this.tryEntries[o],
                s = a.completion;
              if ('root' === a.tryLoc) return r('end');
              if (a.tryLoc <= this.prev) {
                var l = i.call(a, 'catchLoc'),
                  c = i.call(a, 'finallyLoc');
                if (l && c) {
                  if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                } else if (l) {
                  if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                } else {
                  if (!c) throw new Error('try statement without catch or finally');
                  if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function(e, t) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var r = this.tryEntries[n];
              if (r.tryLoc <= this.prev && i.call(r, 'finallyLoc') && this.prev < r.finallyLoc) {
                var o = r;
                break;
              }
            }
            o && ('break' === e || 'continue' === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
            var a = o ? o.completion : {};
            return (
              (a.type = e), (a.arg = t), o ? ((this.method = 'next'), (this.next = o.finallyLoc), h) : this.complete(a)
            );
          },
          complete: function(e, t) {
            if ('throw' === e.type) throw e.arg;
            return (
              'break' === e.type || 'continue' === e.type
                ? (this.next = e.arg)
                : 'return' === e.type
                ? ((this.rval = this.arg = e.arg), (this.method = 'return'), (this.next = 'end'))
                : 'normal' === e.type && t && (this.next = t),
              h
            );
          },
          finish: function(e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var n = this.tryEntries[t];
              if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), T(n), h;
            }
          },
          catch: function(e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var n = this.tryEntries[t];
              if (n.tryLoc === e) {
                var i = n.completion;
                if ('throw' === i.type) {
                  var r = i.arg;
                  T(n);
                }
                return r;
              }
            }
            throw new Error('illegal catch attempt');
          },
          delegateYield: function(e, n, i) {
            return (
              (this.delegate = { iterator: k(e), resultName: n, nextLoc: i }),
              'next' === this.method && (this.arg = t),
              h
            );
          }
        }),
        e
      );
    })(e.exports);
    try {
      regeneratorRuntime = i;
    } catch (e) {
      Function('r', 'regeneratorRuntime = r')(i);
    }
  },
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {},
  function(e, t, n) {
    'use strict';
    function i() {}
    n.r(t),
      n.d(t, 'store', function() {
        return Es;
      }),
      n.d(t, 'getTranslation', function() {
        return Ls;
      });
    const r = e => e;
    function o(e, t) {
      for (const n in t) e[n] = t[n];
      return e;
    }
    function a(e) {
      return e();
    }
    function s() {
      return Object.create(null);
    }
    function l(e) {
      e.forEach(a);
    }
    function c(e) {
      return 'function' == typeof e;
    }
    function d(e, t) {
      return e != e ? t == t : e !== t || (e && 'object' == typeof e) || 'function' == typeof e;
    }
    function u(e, t) {
      const n = e.subscribe(t);
      return n.unsubscribe ? () => n.unsubscribe() : n;
    }
    function f(e) {
      let t;
      return u(e, e => (t = e))(), t;
    }
    function p(e, t, n) {
      e.$$.on_destroy.push(u(t, n));
    }
    function h(e, t, n) {
      return e[1] ? o({}, o(t.$$scope.ctx, e[1](n ? n(t) : {}))) : t.$$scope.ctx;
    }
    function g(e) {
      return null == e ? '' : e;
    }
    const m = 'undefined' != typeof window;
    let v = m ? () => window.performance.now() : () => Date.now(),
      b = m ? e => requestAnimationFrame(e) : i;
    const w = new Set();
    let S,
      y = !1;
    function _() {
      w.forEach(e => {
        e[0](v()) || (w.delete(e), e[1]());
      }),
        (y = w.size > 0) && b(_);
    }
    function C(e) {
      let t;
      return (
        y || ((y = !0), b(_)),
        {
          promise: new Promise(n => {
            w.add((t = [e, n]));
          }),
          abort() {
            w.delete(t);
          }
        }
      );
    }
    function x(e, t) {
      e.appendChild(t);
    }
    function I(e, t, n) {
      e.insertBefore(t, n || null);
    }
    function T(e) {
      e.parentNode.removeChild(e);
    }
    function N(e, t) {
      for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
    }
    function k(e) {
      return document.createElement(e);
    }
    function $(e) {
      return document.createTextNode(e);
    }
    function P() {
      return $(' ');
    }
    function E() {
      return $('');
    }
    function L(e, t, n, i) {
      return e.addEventListener(t, n, i), () => e.removeEventListener(t, n, i);
    }
    function R(e) {
      return function(t) {
        return t.preventDefault(), e.call(this, t);
      };
    }
    function A(e) {
      return function(t) {
        return t.stopPropagation(), e.call(this, t);
      };
    }
    function D(e, t, n) {
      null == n ? e.removeAttribute(t) : e.setAttribute(t, n);
    }
    function O(e, t) {
      (t = '' + t), e.data !== t && (e.data = t);
    }
    function V(e, t) {
      const n = document.createEvent('CustomEvent');
      return n.initCustomEvent(e, !1, !1, t), n;
    }
    class M {
      constructor(e, t = null) {
        (this.e = k('div')), (this.a = t), this.u(e);
      }
      m(e, t = null) {
        for (let n = 0; n < this.n.length; n += 1) I(e, this.n[n], t);
        this.t = e;
      }
      u(e) {
        (this.e.innerHTML = e), (this.n = Array.from(this.e.childNodes));
      }
      p(e) {
        this.d(), this.u(e), this.m(this.t, this.a);
      }
      d() {
        this.n.forEach(T);
      }
    }
    let F,
      j = 0,
      U = {};
    function B(e, t, n, i, r, o, a, s = 0) {
      const l = 16.666 / i;
      let c = '{\n';
      for (let e = 0; e <= 1; e += l) {
        const i = t + (n - t) * o(e);
        c += 100 * e + `%{${a(i, 1 - i)}}\n`;
      }
      const d = c + `100% {${a(n, 1 - n)}}\n}`,
        u = `__svelte_${(function(e) {
          let t = 5381,
            n = e.length;
          for (; n--; ) t = ((t << 5) - t) ^ e.charCodeAt(n);
          return t >>> 0;
        })(d)}_${s}`;
      if (!U[u]) {
        if (!S) {
          const e = k('style');
          document.head.appendChild(e), (S = e.sheet);
        }
        (U[u] = !0), S.insertRule(`@keyframes ${u} ${d}`, S.cssRules.length);
      }
      const f = e.style.animation || '';
      return (e.style.animation = `${f ? `${f}, ` : ''}${u} ${i}ms linear ${r}ms 1 both`), (j += 1), u;
    }
    function z(e, t) {
      (e.style.animation = (e.style.animation || '')
        .split(', ')
        .filter(t ? e => e.indexOf(t) < 0 : e => -1 === e.indexOf('__svelte'))
        .join(', ')),
        t &&
          !--j &&
          b(() => {
            if (j) return;
            let e = S.cssRules.length;
            for (; e--; ) S.deleteRule(e);
            U = {};
          });
    }
    function W(e) {
      F = e;
    }
    function G() {
      if (!F) throw new Error('Function called outside component initialization');
      return F;
    }
    function H(e) {
      G().$$.before_update.push(e);
    }
    function q(e) {
      G().$$.on_mount.push(e);
    }
    function K(e) {
      G().$$.after_update.push(e);
    }
    function J(e) {
      G().$$.on_destroy.push(e);
    }
    function Y() {
      const e = F;
      return (t, n) => {
        const i = e.$$.callbacks[t];
        if (i) {
          const r = V(t, n);
          i.slice().forEach(t => {
            t.call(e, r);
          });
        }
      };
    }
    function Q(e, t) {
      G().$$.context.set(e, t);
    }
    function X(e) {
      return G().$$.context.get(e);
    }
    function Z(e, t) {
      const n = e.$$.callbacks[t.type];
      n && n.slice().forEach(e => e(t));
    }
    const ee = [],
      te = [],
      ne = [],
      ie = [],
      re = Promise.resolve();
    let oe,
      ae = !1;
    function se() {
      ae || ((ae = !0), re.then(de));
    }
    function le(e) {
      ne.push(e);
    }
    function ce(e) {
      ie.push(e);
    }
    function de() {
      const e = new Set();
      do {
        for (; ee.length; ) {
          const e = ee.shift();
          W(e), ue(e.$$);
        }
        for (; te.length; ) te.pop()();
        for (let t = 0; t < ne.length; t += 1) {
          const n = ne[t];
          e.has(n) || (n(), e.add(n));
        }
        ne.length = 0;
      } while (ee.length);
      for (; ie.length; ) ie.pop()();
      ae = !1;
    }
    function ue(e) {
      e.fragment &&
        (e.update(e.dirty),
        l(e.before_update),
        e.fragment.p(e.dirty, e.ctx),
        (e.dirty = null),
        e.after_update.forEach(le));
    }
    function fe() {
      return (
        oe ||
          (oe = Promise.resolve()).then(() => {
            oe = null;
          }),
        oe
      );
    }
    function pe(e, t, n) {
      e.dispatchEvent(V(`${t ? 'intro' : 'outro'}${n}`));
    }
    const he = new Set();
    let ge;
    function me() {
      ge = { r: 0, c: [], p: ge };
    }
    function ve() {
      ge.r || l(ge.c), (ge = ge.p);
    }
    function be(e, t) {
      e && e.i && (he.delete(e), e.i(t));
    }
    function we(e, t, n, i) {
      if (e && e.o) {
        if (he.has(e)) return;
        he.add(e),
          ge.c.push(() => {
            he.delete(e), i && (n && e.d(1), i());
          }),
          e.o(t);
      }
    }
    const Se = { duration: 0 };
    function ye(e, t, n) {
      let o,
        a,
        s = t(e, n),
        l = !1,
        d = 0;
      function u() {
        o && z(e, o);
      }
      function f() {
        const { delay: t = 0, duration: n = 300, easing: c = r, tick: f = i, css: p } = s || Se;
        p && (o = B(e, 0, 1, n, t, c, p, d++)), f(0, 1);
        const h = v() + t,
          g = h + n;
        a && a.abort(),
          (l = !0),
          le(() => pe(e, !0, 'start')),
          (a = C(t => {
            if (l) {
              if (t >= g) return f(1, 0), pe(e, !0, 'end'), u(), (l = !1);
              if (t >= h) {
                const e = c((t - h) / n);
                f(e, 1 - e);
              }
            }
            return l;
          }));
      }
      let p = !1;
      return {
        start() {
          p || (z(e), c(s) ? ((s = s()), fe().then(f)) : f());
        },
        invalidate() {
          p = !1;
        },
        end() {
          l && (u(), (l = !1));
        }
      };
    }
    function _e(e, t, n) {
      let o,
        a = t(e, n),
        s = !0;
      const d = ge;
      function u() {
        const { delay: t = 0, duration: n = 300, easing: c = r, tick: u = i, css: f } = a || Se;
        f && (o = B(e, 1, 0, n, t, c, f));
        const p = v() + t,
          h = p + n;
        le(() => pe(e, !1, 'start')),
          C(t => {
            if (s) {
              if (t >= h) return u(0, 1), pe(e, !1, 'end'), --d.r || l(d.c), !1;
              if (t >= p) {
                const e = c((t - p) / n);
                u(1 - e, e);
              }
            }
            return s;
          });
      }
      return (
        (d.r += 1),
        c(a)
          ? fe().then(() => {
              (a = a()), u();
            })
          : u(),
        {
          end(t) {
            t && a.tick && a.tick(1, 0), s && (o && z(e, o), (s = !1));
          }
        }
      );
    }
    function Ce(e, t) {
      const n = (t.token = {});
      function i(e, i, r, a) {
        if (t.token !== n) return;
        t.resolved = r && { [r]: a };
        const s = o(o({}, t.ctx), t.resolved),
          l = e && (t.current = e)(s);
        t.block &&
          (t.blocks
            ? t.blocks.forEach((e, n) => {
                n !== i &&
                  e &&
                  (me(),
                  we(e, 1, 1, () => {
                    t.blocks[n] = null;
                  }),
                  ve());
              })
            : t.block.d(1),
          l.c(),
          be(l, 1),
          l.m(t.mount(), t.anchor),
          de()),
          (t.block = l),
          t.blocks && (t.blocks[i] = l);
      }
      if ((r = e) && 'object' == typeof r && 'function' == typeof r.then) {
        const n = G();
        if (
          (e.then(
            e => {
              W(n), i(t.then, 1, t.value, e), W(null);
            },
            e => {
              W(n), i(t.catch, 2, t.error, e), W(null);
            }
          ),
          t.current !== t.pending)
        )
          return i(t.pending, 0), !0;
      } else {
        if (t.current !== t.then) return i(t.then, 1, t.value, e), !0;
        t.resolved = { [t.value]: e };
      }
      var r;
    }
    const xe = 'undefined' != typeof window ? window : global;
    let Ie;
    function Te(e, t, n) {
      -1 !== e.$$.props.indexOf(t) && ((e.$$.bound[t] = n), n(e.$$.ctx[t]));
    }
    function Ne(e, t, n) {
      const { fragment: i, on_mount: r, on_destroy: o, after_update: s } = e.$$;
      i.m(t, n),
        le(() => {
          const t = r.map(a).filter(c);
          o ? o.push(...t) : l(t), (e.$$.on_mount = []);
        }),
        s.forEach(le);
    }
    function ke(e, t) {
      e.$$.fragment &&
        (l(e.$$.on_destroy), e.$$.fragment.d(t), (e.$$.on_destroy = e.$$.fragment = null), (e.$$.ctx = {}));
    }
    function $e(e, t, n, r, o, a) {
      const c = F;
      W(e);
      const d = t.props || {},
        u = (e.$$ = {
          fragment: null,
          ctx: null,
          props: a,
          update: i,
          not_equal: o,
          bound: s(),
          on_mount: [],
          on_destroy: [],
          before_update: [],
          after_update: [],
          context: new Map(c ? c.$$.context : []),
          callbacks: s(),
          dirty: null
        });
      let f = !1;
      var p;
      (u.ctx = n
        ? n(
            e,
            d,
            (t, n, i = n) => (
              u.ctx &&
                o(u.ctx[t], (u.ctx[t] = i)) &&
                (u.bound[t] && u.bound[t](i),
                f &&
                  (function(e, t) {
                    e.$$.dirty || (ee.push(e), se(), (e.$$.dirty = s())), (e.$$.dirty[t] = !0);
                  })(e, t)),
              n
            )
          )
        : d),
        u.update(),
        (f = !0),
        l(u.before_update),
        (u.fragment = r(u.ctx)),
        t.target &&
          (t.hydrate ? u.fragment.l(((p = t.target), Array.from(p.childNodes))) : u.fragment.c(),
          t.intro && be(e.$$.fragment),
          Ne(e, t.target, t.anchor),
          de()),
        W(c);
    }
    'undefined' != typeof HTMLElement &&
      (Ie = class extends HTMLElement {
        constructor() {
          super(), this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
          for (const e in this.$$.slotted) this.appendChild(this.$$.slotted[e]);
        }
        attributeChangedCallback(e, t, n) {
          this[e] = n;
        }
        $destroy() {
          ke(this, 1), (this.$destroy = i);
        }
        $on(e, t) {
          const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
          return (
            n.push(t),
            () => {
              const e = n.indexOf(t);
              -1 !== e && n.splice(e, 1);
            }
          );
        }
        $set() {}
      });
    class Pe {
      $destroy() {
        ke(this, 1), (this.$destroy = i);
      }
      $on(e, t) {
        const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
        return (
          n.push(t),
          () => {
            const e = n.indexOf(t);
            -1 !== e && n.splice(e, 1);
          }
        );
      }
      $set() {}
    }
    const Ee = new (class {
      constructor() {
        (this.handles = {}), (this.keyExistencyTimeout = 2e4), (this.keyExistencyCheckInterval = 50);
      }
      waitForKeyExistency(e, t, n = this.keyExistencyTimeout) {
        const i = Date.now();
        return new Promise((r, o) => {
          this.handles[t] = setInterval(
            () =>
              e[t]
                ? r(!0)
                : Date.now() - i > n
                ? (clearInterval(this.handles[t]), o(`${t} did not appear in object within ${n / 1e3} seconds.`))
                : void 0,
            this.keyExistencyCheckInterval
          );
        });
      }
      wrapAsPromise(e) {
        return new Promise(t => {
          t(e);
        });
      }
      applyFunctionPromisified(e, t) {
        return (e = e.apply(this, t)), _t.isPromise(e) ? e : this.wrapAsPromise(e);
      }
      getConfigValueFromObjectAsync(e, t, ...n) {
        let i = _t.getConfigValueFromObject(e, t);
        return _t.isFunction(i) ? this.applyFunctionPromisified(i, n) : this.wrapAsPromise(i);
      }
    })();
    const Le = new (class {
      convertCustomMessageInternalToUser(e) {
        return e.data;
      }
      convertCustomMessageUserToInternal(e) {
        return { msg: 'custom', data: e };
      }
    })();
    const Re = new (class {
      constructor() {
        (this.configReadyCallback = function() {}), (this.initialized = !1);
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
              mt.luigiAfterInit(), await this.executeConfigFnAsync('lifecycleHooks.luigiAfterInit');
            }));
      }
      getConfig() {
        return this.config;
      }
      configChanged(...e) {
        const t = Tt.optimizeScope(e);
        t.length > 0
          ? t.forEach(e => {
              window.Luigi._store.fire(e, { current: window.Luigi._store });
            })
          : window.Luigi._store.update(e => e);
      }
      setErrorMessage(e) {
        var t = document.createTextNode(e),
          n = document.createElement('div');
        n.setAttribute('class', 'fd-ui'), n.setAttribute('style', 'text-align: center;');
        var i = document.createElement('div');
        i.setAttribute('class', 'fd-message-strip fd-message-strip--error'),
          i.setAttribute('style', 'max-width: 800px; display: inline-block; margin-top: 40px;'),
          i.appendChild(t),
          n.appendChild(i),
          tt.getLuigiContainer().appendChild(n);
      }
      getConfigValue(e) {
        return _t.getConfigValueFromObject(this.getConfig(), e);
      }
      getConfigBooleanValue(e) {
        const t = _t.getConfigValueFromObject(this.getConfig(), e);
        return !0 === t || 'true' === t;
      }
      getConfigValueAsync(e, ...t) {
        return Ee.getConfigValueFromObjectAsync(this.getConfig(), e, t);
      }
      async executeConfigFnAsync(e, t = !1, ...n) {
        const i = this.getConfigValue(e);
        if (_t.isFunction(i))
          try {
            return await Ee.applyFunctionPromisified(i, n);
          } catch (e) {
            if (t) return Promise.reject(e);
          }
        return Promise.resolve(void 0);
      }
      isAuthorizationEnabled() {
        return et.isAuthorizationEnabled();
      }
      unload() {
        (this.initialized = !1), bt.unload(), Nt.removeAllEventListeners();
        const e = tt.getLuigiContainer();
        for (; e.firstChild; ) e.removeChild(e.lastChild);
      }
    })();
    const Ae = new (class {
        constructor() {}
        isAuthorizationEnabled() {
          return !!Ze.getConfigValue('auth.use');
        }
        async handleAuthEvent(e, t, n, i) {
          const r = await Ze.executeConfigFnAsync('auth.events.' + e, !1, t, n);
          let o = void 0 === r || !!r;
          if (!o || !i) return o;
          window.location.href = i;
        }
        get store() {
          return (
            Ze.initialized ||
              console.warn(
                'Luigi Core is not initialized yet. Consider moving your code to the luigiAfterInit lifecycle hook. Documentation: https://docs.luigi-project.io/docs/lifecycle-hooks'
              ),
            {
              getStorageKey: () => vt.getStorageKey(),
              getStorageType: () => vt.getStorageType(),
              getAuthData: () => vt.getAuthData(),
              setAuthData: e => vt.setAuthData(e),
              removeAuthData: () => vt.removeAuthData(),
              setNewlyAuthorized: () => vt.setNewlyAuthorized()
            }
          );
        }
      })(),
      De = { desktopMinWidth: 600 },
      Oe = [
        { type: 'main', selector: '.iframeContainer iframe' },
        { type: 'split-view', selector: '.iframeSplitViewCnt iframe' },
        { type: 'modal', selector: '.iframeModalCtn iframe' }
      ],
      Ve = { cssSelector: '[luigi-app-root]' },
      Me = { cssSelector: '[luigi-app-loading-indicator]' };
    const Fe = new (class {
      getLuigiContainer() {
        return this.getCustomLuigiContainer() || this.getDefaultLuigiContainer();
      }
      isCustomLuigiContainer() {
        return Boolean(this.getLuigiContainer() === this.getCustomLuigiContainer());
      }
      getCustomLuigiContainer() {
        return document.querySelector(Ve.cssSelector);
      }
      getDefaultLuigiContainer() {
        return document.querySelector('body');
      }
      getShellbar() {
        return document.getElementsByClassName('fd-shellbar')[0];
      }
      getShellbarActions() {
        return document.getElementsByClassName('fd-shellbar__group--actions')[0];
      }
      getMicrofrontends() {
        return Ct.getMicrofrontendsInDom();
      }
      getMicrofrontendIframes() {
        return Ct.getMicrofrontendIframes();
      }
      getCurrentMicrofrontendIframe() {
        return Ct.getCurrentMicrofrontendIframe();
      }
    })();
    class je {
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
    class Ue extends je {
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
      navigate(e, t, n, i) {
        if (this.options.errorSkipNavigation) return void (this.options.errorSkipNavigation = !1);
        this.options.preserveView = t;
        const r = '/' !== e[0],
          o = {
            msg: 'luigi.navigation.open',
            params: Object.assign(this.options, { link: e, relative: r, modal: n, splitView: i })
          };
        this.sendPostMessageToLuigiCore(o);
      }
      openAsModal(e, t = {}) {
        this.navigate(e, !0, t);
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
        if (_t.isFunction(Luigi.pathExists)) return Luigi.pathExists(e);
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
    const Be = new (class {
        constructor() {}
        updateTopNavigation() {
          window.postMessage({ msg: 'luigi.navigation.update-badge-counters' }, '*');
        }
        navigate(e, t, n, i) {
          return new Ue().navigate(e, t, n, i);
        }
        openAsModal(e, t) {
          return new Ue().openAsModal(e, t);
        }
        openAsSplitView(e, t = {}) {
          return Luigi.splitView.openAsSplitView(e, t), Luigi.splitView.splitViewHandle;
        }
        fromContext(e) {
          return new Ue().fromContext(e);
        }
        fromClosestContext() {
          return new Ue().fromClosestContext();
        }
        fromVirtualTreeRoot() {
          return new Ue().fromVirtualTreeRoot();
        }
        withParams(e) {
          return new Ue().withParams(e);
        }
        pathExists(e) {
          return new Ue().pathExists(e);
        }
        hasBack() {
          return new Ue().hasBack();
        }
        goBack(e) {
          return new Ue().goBack(e);
        }
      })(),
      ze = {
        luigi: {
          unsavedChangesAlert: {
            header: 'Unsaved changes detected',
            body: 'Unsaved changes will be lost. Do you want to continue?'
          },
          confirmationModal: { header: 'Confirmation', body: 'Are you sure you want to do this?' },
          button: { dismiss: 'No', confirm: 'Yes' },
          requestedRouteNotFound: 'Could not find the requested route {route}.',
          notExactTargetNode: 'Could not map the exact target node for the requested route {route}.'
        }
      };
    const We = new (class {
      constructor() {
        (this.currentLocaleStorageKey = 'luigi.currentLocale'),
          (this.defaultLocale = 'en'),
          (this.translationTable = ze),
          (this.listeners = {});
      }
      _init() {
        Tt.doOnStoreChange(
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
        if (_t.isFunction(e)) {
          const t = _t.getRandomId();
          return (this.listeners[t] = e), t;
        }
        console.error('Provided locale change listener is not a function.');
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
          Re.configChanged();
      }
      _initCustomImplementation() {
        (this.translationImpl = Re.getConfigValue('settings.customTranslationImplementation')),
          _t.isFunction(this.translationImpl) && (this.translationImpl = this.translationImpl());
      }
      getTranslation(e, t, n) {
        if (!e) return '';
        if (this.translationImpl) {
          const i = this.translationImpl.getTranslation(e, t, n);
          if (i !== e) return i;
        }
        const i = this.findTranslation(e, this.translationTable, t);
        return i || e;
      }
      findTranslation(e, t, n) {
        let i = e.split('.');
        for (let e = 0; e < i.length; e++) {
          let r = i[e];
          if (!t.hasOwnProperty(r) || 'object' != typeof t[r]) return n ? this.findInterpolations(t[r], n) : t[r];
          t = t[r];
        }
      }
      findInterpolations(e, t) {
        return (
          Object.keys(t).forEach(n => {
            e = e.replace(new RegExp('{' + yt.escapeKeyForRegexp(n) + '}', 'gi'), t[n]);
          }),
          e
        );
      }
    })();
    const Ge = new (class {
        sendToAll(e) {
          const t = Le.convertCustomMessageUserToInternal(e);
          Ct.getMicrofrontendsInDom()
            .map(e => e.container)
            .map(e => Ct.sendMessageToIframe(e, t));
        }
        send(e, t) {
          const n = Le.convertCustomMessageUserToInternal(t);
          Ct.getMicrofrontendsInDom()
            .filter(t => t.id === e)
            .map(e => e.container)
            .map(e => Ct.sendMessageToIframe(e, n));
        }
      })(),
      He = [];
    function qe(e, t) {
      return { subscribe: Ke(e, t).subscribe };
    }
    function Ke(e, t = i) {
      let n;
      const r = [];
      function o(t) {
        if (d(e, t) && ((e = t), n)) {
          const t = !He.length;
          for (let t = 0; t < r.length; t += 1) {
            const n = r[t];
            n[1](), He.push(n, e);
          }
          if (t) {
            for (let e = 0; e < He.length; e += 2) He[e][0](He[e + 1]);
            He.length = 0;
          }
        }
      }
      return {
        set: o,
        update: function(t) {
          o(t(e));
        },
        subscribe: function(a, s = i) {
          const l = [a, s];
          return (
            r.push(l),
            1 === r.length && (n = t(o) || i),
            a(e),
            () => {
              const e = r.indexOf(l);
              -1 !== e && r.splice(e, 1), 0 === r.length && (n(), (n = null));
            }
          );
        }
      };
    }
    const Je = new (class {
      constructor() {
        this.documentTitle = Ke();
      }
      hideAppLoadingIndicator() {
        const e = document.querySelector(Me.cssSelector);
        e &&
          (e.classList.add('hidden'),
          setTimeout(() => {
            e.parentNode && e.parentNode.removeChild(e);
          }, 500));
      }
      showAlert(e) {
        if (_t.isFunction(Luigi.showAlert)) return Luigi.showAlert(e);
        console.error(
          'Luigi.ux().showAlert() is only available inside your configuration, after the configuration was initialized with Luigi.setConfig().'
        );
      }
      showConfirmationModal(e) {
        if (_t.isFunction(Luigi.showConfirmationModal)) return Luigi.showConfirmationModal(e);
        console.error(
          'Luigi.ux().showConfirmationModal() is only available inside your configuration, after the configuration was initialized with Luigi.setConfig().'
        );
      }
      setDocumentTitle(e) {
        this.documentTitle.set(e), Luigi.configChanged('settings.header');
      }
      getDocumentTitle() {
        return f(this.documentTitle);
      }
    })();
    const Ye = new (class {
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
    })();
    const Qe = new (class {
      constructor() {
        this.currentTheme;
      }
      async getAvailableThemes() {
        return await Ze.getConfigValueAsync('settings.theming.themes');
      }
      setCurrentTheme(e) {
        this.currentTheme = e;
      }
      async getThemeObject(e) {
        const t = await this.getAvailableThemes();
        return t && t.find(t => t.id === e);
      }
      getCurrentTheme() {
        if (!this.isThemingAvailable()) return !1;
        if (this.currentTheme) return this.currentTheme;
        const e = Ze.getConfigValue('settings.theming');
        return (
          e.defaultTheme ||
            console.error(
              '[Theming] getCurrentTheme() error. No theme set and no defaultTheme found in configuration',
              e
            ),
          e.defaultTheme
        );
      }
      isThemingAvailable() {
        return !!Ze.getConfigValue('settings.theming');
      }
      _init() {
        const e = () => {
          const e = Ze.getConfigValue('settings.theming');
          e &&
            e.nodeViewURLDecorator &&
            e.nodeViewURLDecorator.queryStringParameter &&
            wt.add({
              type: 'queryString',
              uid: 'theming',
              key: e.nodeViewURLDecorator.queryStringParameter.keyName,
              valueFn: () => {
                const t = this.getCurrentTheme(),
                  n = e.nodeViewURLDecorator.queryStringParameter.value;
                return n ? n(t) : t;
              }
            });
        };
        Tt.doOnStoreChange(
          window.Luigi._store,
          () => {
            e();
          },
          ['settings.theming']
        );
      }
    })();
    const Xe = new (class {
        constructor() {
          this.featureToggleList = Ke([]);
        }
        setFeatureToggle(e) {
          e && 'string' == typeof e
            ? f(this.featureToggleList).includes(e)
              ? console.warn('Feature toggle name already exists')
              : f(this.featureToggleList).push(e)
            : console.warn('Feature toggle name is empty or not a type of string');
        }
        unsetFeatureToggle(e) {
          if (e && 'string' == typeof e)
            if (f(this.featureToggleList).includes(e)) {
              let t = f(this.featureToggleList).indexOf(e);
              t > -1 && f(this.featureToggleList).splice(t, 1);
            } else console.warn('Feature toggle name is not in the list.');
          else console.warn('Feature toggle name is empty or not a type of string');
        }
        getActiveFeatureToggleList() {
          return [...f(this.featureToggleList)];
        }
      })(),
      Ze = Re,
      et = Ae,
      tt = Fe,
      nt = We,
      it = Je,
      rt = Ye,
      ot = Qe,
      at = Xe;
    (window.Luigi = Re),
      (window.Luigi.auth = () => Ae),
      (window.Luigi.elements = () => Fe),
      (window.Luigi.navigation = () => Be),
      (window.Luigi.i18n = () => We),
      (window.Luigi.customMessages = () => Ge),
      (window.Luigi.ux = () => Je),
      (window.Luigi.globalSearch = () => Ye),
      (window.Luigi.theming = () => Qe),
      (window.Luigi.featureToggles = () => Xe);
    const st = new (class {
      constructor() {
        (this.iframeNavFallbackTimeout = 2e3), this.timeoutHandle;
      }
      getActiveIframe(e) {
        return [...e.children].filter(e => 'IFRAME' === e.tagName).find(_t.isElementVisible);
      }
      setActiveIframeToPrevious(e) {
        const t = Ct.getMainIframes(),
          n = this.getPreservedViewsInDom(t);
        if (0 === n.length) return;
        const i = this.getActiveIframe(e);
        Ct.hideElementChildren(e), i && e.removeChild(i), (n[0].pv = void 0), (n[0].style.display = 'block');
      }
      removeInactiveIframes(e) {
        Array.from(e.children).forEach(t => {
          _t.isElementVisible(t) || t.vg || 'IFRAME' !== t.tagName || e.removeChild(t);
        });
      }
      hasIsolatedView(e, t, n) {
        return e || (n && !(!1 === e) && !t);
      }
      getPreservedViewsInDom(e) {
        return e.filter(e => e.pv);
      }
      getAllViewGroupSettings() {
        return Ze.getConfigValue('navigation.viewGroupSettings');
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
          internal: JSON.stringify({ currentLocale: nt.getCurrentLocale() })
        };
        Ct.sendMessageToVisibleIframes(e);
      }
      switchActiveIframe(e, t, n) {
        const i = this.getActiveIframe(e);
        if (i !== t) {
          let r = !1;
          Array.from(e.children).forEach(o => {
            if (o === i)
              if (n) e.removeChild(o);
              else {
                const e = this.getViewGroupSettings(o.vg);
                if ((e && this.notifyInactiveIframes(), (o.style.display = 'none'), e.preloadUrl)) {
                  const t = {
                    msg: 'luigi.navigate',
                    viewUrl: e.preloadUrl,
                    context: JSON.stringify({}),
                    nodeParams: JSON.stringify({}),
                    pathParams: JSON.stringify({}),
                    internal: JSON.stringify({ currentLocale: nt.getCurrentLocale() })
                  };
                  Ct.sendMessageToIframe(o, t);
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
            : (Ct.removeIframe(e.iframe, n),
              (e.iframe = void 0),
              (e.isFallbackFrame = !0),
              console.info('navigate: luigi-client did not respond, using fallback by replacing iframe'),
              this.navigateIframe(e, t, n));
        }, this.iframeNavFallbackTimeout);
      }
      checkIframe(e, t, n, i, r) {
        this.timeoutHandle = setTimeout(() => {
          t.get().showLoadingIndicator &&
            (e.viewUrl
              ? ((n = e.viewUrl),
                t.set({ viewUrl: n }),
                (this.iframeNavFallbackTimeout = 0),
                this.setOkResponseHandler(i, t, r))
              : xt.handleUnresponsiveClient(e));
        }, e.timeout);
      }
      initHandshakeFailed(e) {
        if (!(e && e.iframe && e.iframe.luigi)) return !0;
        const t = e.iframe.luigi.clientVersion;
        return (
          void 0 === e.iframe.luigi.initOk || (!(!t || -1 !== _t.semverCompare('1.1.1', t)) && !e.iframe.luigi.initOk)
        );
      }
      navigateIframe(e, t, n) {
        clearTimeout(this.timeoutHandle);
        const i = t.get();
        let r = i.viewUrl;
        r && (r = It.substituteViewUrl(r, i));
        const o = Ct.isSameViewGroup(e, t),
          a = this.hasIsolatedView(i.previousNodeValues.isolateView, o, e.isolateAllViews),
          s = this.hasIsolatedView(i.isolateView, o, e.isolateAllViews),
          l = Ct.canReuseIframe(e, t);
        let c = this.getActiveIframe(n);
        const d = Ct.getMainIframes(),
          u = this.getPreservedViewsInDom(d);
        let f = void 0,
          p = !1;
        if (
          (u.length > 0 && (f = u.shift()) === c && ((p = !0), (c = void 0), (e.iframe = void 0)),
          !p && !t.get().isNavigateBack)
        ) {
          let t;
          if (
            (c && a && (c = this.switchActiveIframe(n, void 0, !0)),
            c && s && (c = this.switchActiveIframe(n, void 0, !c.vg)),
            !s && i.viewGroup)
          ) {
            const e = Ct.getMainIframes().filter(e => e.vg === i.viewGroup);
            e.length > 0 && ((t = e[0]), (c = this.switchActiveIframe(n, t, c && !c.vg)));
          }
          c &&
            !t &&
            (c.vg ? (c = this.switchActiveIframe(n, void 0, !1)) : l || (c = this.switchActiveIframe(n, void 0, !0))),
            (e.iframe = c);
        }
        if (!e.iframe || this.initHandshakeFailed(e)) {
          if (
            (e.iframe && n.removeChild(e.iframe),
            p ? (this.notifyInactiveIframes(), Ct.hideElementChildren(n)) : Ct.removeElementChildren(n),
            i.viewUrl)
          ) {
            !1 !== _t.getConfigValueFromObject(i, 'currentNode.loadingIndicator.enabled')
              ? t.set({ showLoadingIndicator: !0 })
              : t.set({ showLoadingIndicator: !1 }),
              (e.navigateOk = void 0);
            const o = i.viewGroup && !s && this.canCache(i.viewGroup);
            (e.iframe = Ct.createIframe(r, o ? i.viewGroup : void 0, t.get().currentNode, 'main')),
              n.insertBefore(e.iframe, n.firstChild),
              e.builderCompatibilityMode
                ? e.iframe.addEventListener('load', () => {
                    e.iframe._ready = !0;
                    const t = ['init', JSON.stringify(i.context)];
                    Ct.sendMessageToIframe(e.iframe, t);
                  })
                : e.iframe.addEventListener('load', () => {
                    e.iframe._ready = !0;
                  });
            const a = i.currentNode.pageErrorHandler;
            a
              ? this.checkIframe(a, t, r, e, n)
              : e.defaultPageErrorHandler && this.checkIframe(e.defaultPageErrorHandler, t, r, e, n);
          }
        } else {
          t.set({ showLoadingIndicator: !1 });
          const o = t.get().goBackContext;
          (e.iframe.style.display = 'block'),
            (e.iframe.luigi.nextViewUrl = r),
            (e.iframe.luigi.nextClientPermissions = t.get().currentNode.clientPermissions),
            (e.iframe.vg = this.canCache(i.viewGroup) ? i.viewGroup : void 0);
          const a = {
            msg: 'luigi.navigate',
            viewUrl: r,
            context: JSON.stringify(Object.assign({}, i.context, { goBackContext: o })),
            nodeParams: JSON.stringify(Object.assign({}, i.nodeParams)),
            pathParams: JSON.stringify(Object.assign({}, i.pathParams)),
            internal: JSON.stringify(t.prepareInternalData(e))
          };
          i.isNavigationSyncEnabled
            ? (Ct.sendMessageToIframe(e.iframe, a), this.setOkResponseHandler(e, t, n))
            : t.set({ isNavigationSyncEnabled: !0 }),
            t.set({ goBackContext: void 0, isNavigateBack: !1 });
        }
      }
    })();
    const lt = new (class {
      constructor() {
        (this.preloadBatchSize = 1), (this.shouldPreload = !1);
      }
      preloadViewGroups(e = 3) {
        if (!1 === Ze.getConfigValue('navigation.preloadViewGroups')) return;
        const t = st.getAllViewGroupSettings();
        if (!t) return;
        const n = Ct.getIframeContainer(),
          i = Ct.getMainIframes(),
          r = new Date().getTime();
        if (i.filter(e => e.luigi && e.luigi.preloading && r - e.luigi.createdAt < 3e4).length > 0)
          return void console.debug('skipping view group preloading (busy)');
        const o = i.map(e => e.vg).filter(Boolean);
        Object.entries(t)
          .filter(([e, t]) => !o.includes(e))
          .filter(([e, t]) => t && t.preloadUrl)
          .filter((t, n) => n < e)
          .forEach(([e, t]) => {
            console.debug('preloading view group ' + e + ' - ' + t.preloadUrl);
            const i = Ct.createIframe(t.preloadUrl, e, null, 'main');
            (i.style.display = 'none'), (i.luigi.preloading = !0), n.appendChild(i);
          });
      }
      preload() {
        this.shouldPreload &&
          setTimeout(() => {
            this.preloadViewGroups(this.preloadBatchSize);
          }),
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
    })();
    const ct = new (class {
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
          for (let e = 0; e < t.length; e++) this.deleteNodesRecursively(t[e]);
        }
        this.dataManagement.delete(e);
      }
    })();
    const dt = new (class {
        async getNavigationPath(e, t = '') {
          try {
            const n = _t.getTrimmedUrl(t);
            if (!e) return console.error('No navigation nodes provided in the configuration.'), [{}];
            let i;
            if ((ct.hasRootNode() && (i = ct.getRootNode().node), !i)) {
              const t = await e;
              _t.isObject(t)
                ? (i = t).pathSegment &&
                  ((i.pathSegment = ''),
                  console.warn('Root node must have an empty path segment. Provided path segment will be ignored.'))
                : (i = { children: t }),
                await this.getChildren(i),
                ct.setRootNode(i);
            }
            const r = n.split('/'),
              o = await this.buildNode(r, [i], i.children, i.context || {}),
              a = o.navigationPath.filter(e => e.pathSegment).map(e => e.pathSegment);
            o.isExistingRoute = !n || r.length === a.length;
            const s = n.split('/');
            return (o.matchedPath = s.filter((e, t) => (a[t] && a[t].startsWith(':')) || a[t] === e).join('/')), o;
          } catch (e) {
            console.error('Failed to load top navigation nodes.', e);
          }
        }
        async getChildren(e, t) {
          if (!e) return [];
          let n = [];
          if (ct.hasChildren(e)) {
            let t = ct.getChildren(e);
            t && (n = t.children);
          } else
            try {
              void 0 === (n = await Ee.getConfigValueFromObjectAsync(e, 'children', t || e.context)) && (n = []),
                (n = n.map(e => this.getExpandStructuralPathSegment(e)).map(t => this.bindChildToParent(t, e)) || []);
            } catch (e) {
              console.error('Could not lazy-load children for node', e);
            }
          let i = this.getAccessibleNodes(e, n, t);
          return ct.setChildren(e, { children: n, filteredChildren: i }), i;
        }
        async getFilteredChildren(e) {
          return ct.hasChildren(e) ? dt.getChildrenFromCache(e) : await dt.getChildren(e);
        }
        getChildrenFromCache(e) {
          let t = ct.getChildren(e);
          return t ? t.filteredChildren : [];
        }
        getAccessibleNodes(e, t, n) {
          return t ? t.filter(t => xt.isNodeAccessPermitted(t, e, n)) : [];
        }
        bindChildToParent(e, t) {
          return t && t.pathSegment && (e.parent = t), e;
        }
        getExpandStructuralPathSegment(e) {
          if (e && e.pathSegment && -1 !== e.pathSegment.indexOf('/')) {
            const t = e.pathSegment.split('/'),
              n = { ...e },
              i = (e, t) => {
                const r = e.shift();
                let o = {};
                return (
                  e.length
                    ? ((o.pathSegment = r), t.hideFromNav && (o.hideFromNav = t.hideFromNav), (o.children = [i(e, t)]))
                    : ((o = n).pathSegment = r),
                  o
                );
              };
            return i(t, e);
          }
          return e;
        }
        async buildNode(e, t, n, i, r = {}) {
          i.parentNavigationContexts || (i.parentNavigationContexts = []);
          let o = { navigationPath: t, context: i, pathParams: r };
          if (e.length > 0 && n && n.length > 0) {
            const a = e[0],
              s = this.findMatchingNode(a, n);
            if (s) {
              t.push(s);
              let n = xt.applyContext(i, s.context, s.navigationContext);
              s.pathSegment.startsWith(':') && (r[s.pathSegment.replace(':', '')] = yt.sanitizeParam(a)),
                (n = It.substituteDynamicParamsInObject(n, r));
              try {
                this.buildVirtualTree(s, e, r);
                let i = await this.getChildren(s, n);
                const a = e.slice(1);
                o = this.buildNode(a, t, i, n, r);
              } catch (e) {
                console.error('Error getting nodes children', e);
              }
            }
          }
          return o;
        }
        buildVirtualViewUrl(e, t, n) {
          let i = '';
          for (const e in t) e.startsWith('virtualSegment') && (i += ':' + e + '/');
          return n ? e + '/' + (i += ':virtualSegment_' + n + '/') : e;
        }
        buildVirtualTree(e, t, n) {
          const i = e.virtualTree,
            r = e._virtualTree,
            o = e._virtualViewUrl || e.viewUrl;
          if ((i || r) && t[0]) {
            let t = e._virtualPathIndex;
            if ((i && ((t = 0), (e.keepSelectedForChildren = !0)), t > 50)) return;
            t++;
            const r = ['_*', 'virtualTree', 'parent', 'children', 'keepSelectedForChildren', 'navigationContext'],
              a = _t.removeProperties(e, r);
            Object.assign(a, {
              pathSegment: ':virtualSegment_' + t,
              label: ':virtualSegment_' + t,
              viewUrl: _t.trimTrailingSlash(this.buildVirtualViewUrl(o, n, t)),
              _virtualTree: !0,
              _virtualPathIndex: t,
              _virtualViewUrl: o
            }),
              (e.children = [a]);
          }
        }
        findMatchingNode(e, t) {
          let n = null;
          const i = t.filter(e => !!e.pathSegment).length,
            r = t.filter(e => e.pathSegment && e.pathSegment.startsWith(':')).length;
          return i > 1 &&
            (1 === r &&
              (console.warn(
                'Invalid node setup detected. \nStatic and dynamic nodes cannot be used together on the same level. Static node gets cleaned up. \nRemove the static node from the configuration to resolve this warning. \nAffected pathSegment:',
                e,
                'Children:',
                t
              ),
              (t = t.filter(e => e.pathSegment && e.pathSegment.startsWith(':')))),
            r > 1)
            ? (console.error(
                'Invalid node setup detected. \nMultiple dynamic nodes are not allowed on the same level. Stopped navigation. \nInvalid Children:',
                t
              ),
              null)
            : (t.some(t => {
                if (t.pathSegment === e || (t.pathSegment && t.pathSegment.startsWith(':'))) return (n = t), !0;
              }),
              n);
        }
        onNodeChange(e, t) {
          const n = Ze.getConfigValue('navigation.nodeChangeHook');
          'function' == typeof n ? n(e, t) : void 0 !== n && console.warn('nodeChangeHook is not a function!');
        }
        getNodesToDisplay(e, t) {
          if (e && e.length > 0) return e;
          if (t.length > 2) {
            let e = t[t.length - 2];
            if (ct.hasChildren(e)) return this.getChildrenFromCache(e);
          }
          return [];
        }
        getGroupedChildren(e, t) {
          const n = this.getNodesToDisplay(e, t.pathData);
          return xt.groupNodesBy(n, 'category', !0);
        }
        getTruncatedChildren(e) {
          let t = !1;
          const n = [];
          return (
            e.forEach(e => {
              t || ((e.keepSelectedForChildren || e.tabNav) && (t = !0), n.push(e));
            }),
            n
          );
        }
        async getLeftNavData(e, t) {
          const n = {};
          if (e.pathData && 1 < e.pathData.length) {
            const i = this.getTruncatedChildren(t.pathData);
            let r,
              o = [...i].pop();
            (o.keepSelectedForChildren || o.tabNav) && ((r = o), i.pop(), (o = [...i].pop()));
            const a = await this.getChildren(o, t.context),
              s = this.getGroupedChildren(a, e);
            (n.hasCategoriesWithIcon = !1),
              Object.values(s).forEach(e => {
                !n.hasCategoriesWithIcon && e && e.metaInfo && e.metaInfo.icon && (n.hasCategoriesWithIcon = !0);
              }),
              (n.selectedNode = r || o),
              (n.children = s);
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
            let i = [...this.getTruncatedChildrenForTabNav(t.pathData)].pop();
            const r = await this.getChildren(i.tabNav ? i : i.parent, t.context),
              o = this.getGroupedChildren(r, e);
            (n.selectedNode = i), (n.selectedNodeForTabNav = i), (n.children = o);
          }
          return n;
        }
        async extractDataFromPath(e) {
          const t = await this.getNavigationPath(Ze.getConfigValueAsync('navigation.nodes'), e);
          return { nodeObject: It.getLastNodeObject(t), pathData: t };
        }
        async shouldPreventNavigation(e) {
          return !(!e || !_t.isFunction(e.onNodeActivation) || !1 !== (await e.onNodeActivation(e)));
        }
      })(),
      ut = { logout: { label: 'Sign Out', icon: 'log' } },
      ft = { externalLink: { sameWindow: !1 } };
    const pt = new (class {
      constructor() {}
      dynamicImport(e) {
        return import(e);
      }
      attachWC(e, t, n, i) {
        if (n && n.contains(t)) {
          const n = document.createElement(e);
          (n.context = i), (n.luigi = window.Luigi), t.appendChild(n);
        }
      }
      generateWCId(e) {
        let t = '';
        for (let n = 0; n < e.length; n++) t += e.charCodeAt(n).toString(16);
        return 'luigi-wc-' + t;
      }
      registerWCFromUrl(e, t) {
        return new Promise((n, i) => {
          this.dynamicImport(e)
            .then(e => {
              try {
                window.customElements.define(t, e.default), n();
              } catch (e) {
                i(e);
              }
            })
            .catch(e => i(e));
        });
      }
      renderWebComponent(e, t, n) {
        const i = this.generateWCId(e),
          r = document.createElement('div');
        t.appendChild(r),
          window.customElements.get(i)
            ? this.attachWC(i, r, t, n)
            : window.luigiWCFn
            ? window.luigiWCFn(e, i, r, () => {
                this.attachWC(i, r, t, n);
              })
            : this.registerWCFromUrl(e, i).then(() => {
                this.attachWC(i, r, t, n);
              });
      }
    })();
    const ht = new (class {
      getNodePath(e, t) {
        return e ? It.buildRoute(e, e.pathSegment ? '/' + e.pathSegment : '', t) : '';
      }
      concatenatePath(e, t) {
        let n = _t.getPathWithoutHash(e);
        return n
          ? t
            ? (n.endsWith('/') && (n = n.substring(0, n.length - 1)), t.startsWith('/') || (n += '/'), (n += t))
            : n
          : t;
      }
      async navigateTo(e, t = !0) {
        const { nodeObject: n } = await dt.extractDataFromPath(e);
        if (await dt.shouldPreventNavigation(n)) return;
        if (_t.trimLeadingSlash(this.getWindowPath()) === _t.trimLeadingSlash(e)) return;
        if (Ze.getConfigValue('routing.useHashRouting')) return void (window.location.hash = e);
        const i = t ? 'pushState' : 'replaceState';
        let r;
        window.history[i]({ path: e }, '', e),
          _t.isIE()
            ? (r = document.createEvent('Event')).initEvent('popstate', !0, !0)
            : (r = new CustomEvent('popstate')),
          window.dispatchEvent(r);
      }
      getWindowPath() {
        return Ze.getConfigValue('routing.useHashRouting')
          ? _t.getPathWithoutHash(window.location.hash)
          : window.location.pathname.concat(window.location.search);
      }
      buildFromRelativePath(e) {
        let t = this.getWindowPath();
        if (e.parent && e.parent.pathSegment) {
          const n = _t.trimLeadingSlash(this.getNodePath(e.parent)).split('/'),
            i = _t.trimLeadingSlash(t).split('/');
          i.length > n.length && (t = i.slice(0, n.length).join('/'));
        }
        return _t.addLeadingSlash(this.concatenatePath(t, e.link));
      }
      getHashPath(e = window.location.hash) {
        return e.split('#/')[1];
      }
      getModifiedPathname() {
        return ((window.history.state && window.history.state.path) || window.location.pathname)
          .split('/')
          .slice(1)
          .join('/');
      }
      getCurrentPath() {
        return Ze.getConfigValue('routing.useHashRouting')
          ? window.location.hash.replace('#', '')
          : window.location.search
          ? _t.trimLeadingSlash(window.location.pathname) + window.location.search
          : _t.trimLeadingSlash(window.location.pathname);
      }
      async handleRouteChange(e, t, n, i) {
        if (
          !(
            0 !==
            (Ze.getConfigValue('routing.skipRoutingForUrlPatterns') || [/access_token=/, /id_token=/]).filter(e =>
              window.location.href.match(e)
            ).length
          )
        )
          try {
            if (t.shouldShowUnsavedChangesModal()) {
              const r = window.location.href,
                o = t.get().unsavedChanges.persistUrl;
              return (
                o && history.replaceState(window.state, '', o),
                void t.showUnsavedChangesModal().then(
                  () => {
                    e && this.handleRouteChange(e, t, n, i) && history.replaceState(window.state, '', r);
                  },
                  () => {}
                )
              );
            }
            const r = Ze.getConfigValue('settings.featureToggles.queryStringParam')
              ? Ze.getConfigValue('settings.featureToggles.queryStringParam')
              : void 0;
            r && It.setFeatureToggles(r, e);
            const o = t.get();
            this.checkInvalidateCache(o, e);
            const a = e && e.length ? _t.getPathWithoutHash(e) : '',
              { nodeObject: s, pathData: l } = await dt.extractDataFromPath(e),
              c = s.viewUrl || '';
            if (!c) {
              const n = await It.getDefaultChildNode(l, async (e, t) => await dt.getChildren(e, t));
              if (l.isExistingRoute) {
                const i = _t.getTrimmedUrl(e);
                this.navigateTo(`${i ? `/${i}` : ''}/${n}`, !1), t.set({ navigationPath: [] });
              } else {
                if (n && l.navigationPath.length > 1)
                  return void this.showPageNotFoundError(t, _t.trimTrailingSlash(l.matchedPath) + '/' + n, a, !0);
                const e = await dt.getNavigationPath(Ze.getConfigValueAsync('navigation.nodes'), '/'),
                  i = await It.getDefaultChildNode(e);
                this.showPageNotFoundError(t, i, a);
              }
              return;
            }
            if (!l.isExistingRoute) return void this.showPageNotFoundError(t, l.matchedPath, a, !0);
            const d = Ze.getConfigBooleanValue('settings.hideNavigation'),
              u = It.parseParams(a.split('?')[1]),
              f = It.getNodeParams(u),
              p = It.findViewGroup(s),
              h = decodeURIComponent(a.split('?')[1] || ''),
              g =
                l.navigationPath && l.navigationPath.length > 0 ? l.navigationPath[l.navigationPath.length - 1] : null;
            let m = !1,
              v = g;
            for (; v; ) {
              if (!0 === v.tabNav) {
                m = !0;
                break;
              }
              if (!1 === v.tabNav) {
                m = !1;
                break;
              }
              v = v.parent;
            }
            let b = g,
              w = s.hideSideNav;
            for (; b; ) {
              if (b.tabNav && !0 === b.hideSideNav) {
                w = !0;
                break;
              }
              if (!1 === b.hideSideNav) {
                w = !1;
                break;
              }
              b = b.parent;
            }
            const S = {
              hideNav: d,
              viewUrl: c,
              nodeParams: f,
              viewGroup: p,
              urlParamsRaw: h,
              currentNode: g,
              navigationPath: l.navigationPath,
              context: It.substituteDynamicParamsInObject(Object.assign({}, l.context, g.context), l.pathParams),
              pathParams: l.pathParams,
              hideSideNav: w || !1,
              isolateView: s.isolateView || !1,
              tabNav: m
            };
            t.set(
              Object.assign({}, S, {
                previousNodeValues: o ? { viewUrl: o.viewUrl, isolateView: o.isolateView, viewGroup: o.viewGroup } : {}
              })
            );
            let y = document.getElementsByClassName('iframeContainer')[0];
            if (
              (y &&
                (m
                  ? y.classList.add('iframeContainerTabNav')
                  : y.classList.contains('iframeContainerTabNav') && y.classList.remove('iframeContainerTabNav')),
              null !== i.iframe)
            ) {
              const t = i.iframe.luigi.viewUrl.split('/').pop();
              if (e !== t) {
                const { nodeObject: e, pathData: n } = await dt.extractDataFromPath(t),
                  i = e;
                dt.onNodeChange(i, g);
              }
            }
            s.webcomponent
              ? (y && y.classList.add('lui-webComponent'), this.navigateWebComponent(i, t, n, s, y))
              : (y && y.classList.remove('lui-webComponent'), st.navigateIframe(i, t, n));
          } catch (e) {
            console.info('Could not handle route change', e);
          }
      }
      checkInvalidateCache(e, t) {
        let n = t.split('/');
        if (e.navigationPath && e.navigationPath.length > 0) {
          let t = e.navigationPath.slice(1),
            i = !0;
          for (let r = 0; r < t.length; r++) {
            let o = n.length > r ? n[r] : void 0,
              a = t[r];
            if (o !== a.pathSegment || !i)
              if (It.isDynamicNode(a)) {
                if (!i || o !== It.getDynamicNodeValue(a, e.pathParams)) {
                  ct.deleteNodesRecursively(a);
                  break;
                }
              } else i = !1;
          }
        }
      }
      handleRouteClick(e, t) {
        const n = It.getRouteLink(e, t.get().pathParams);
        if (e.externalLink && e.externalLink.url) this.navigateToExternalLink(n);
        else if (e.link) this.navigateTo(n);
        else {
          if (_t.trimLeadingSlash(this.getWindowPath()) === _t.trimLeadingSlash(n)) {
            const e = Ct.getIframeContainer(),
              t = st.getActiveIframe(e);
            t && t.vg && st.canCache(t.vg)
              ? (st.switchActiveIframe(Ct.getIframeContainer(), void 0, !1),
                setTimeout(() => {
                  st.switchActiveIframe(Ct.getIframeContainer(), t, !1),
                    window.postMessage({ msg: 'refreshRoute' }, '*');
                }))
              : (t && e.removeChild(t), window.postMessage({ msg: 'refreshRoute' }, '*'));
          } else this.navigateTo(n);
        }
      }
      async showPageNotFoundError(e, t, n, i = !1) {
        const r = Ze.getConfigValue('routing.pageNotFoundHandler');
        if ('function' == typeof r) {
          const e = r(n, i);
          return void (e && e.redirectTo && this.navigateTo(e.redirectTo));
        }
        const o = {
          text: nt.getTranslation(i ? 'luigi.notExactTargetNode' : 'luigi.requestedRouteNotFound', { route: n }),
          type: 'error',
          ttl: 1
        };
        e.showAlert(o, !1), this.navigateTo(_t.addLeadingSlash(t));
      }
      navigateToLink(e) {
        e.externalLink && e.externalLink.url ? this.navigateToExternalLink(e.externalLink) : this.navigateTo(e.link);
      }
      navigateToExternalLink(e) {
        const t = { ...ft.externalLink, ...e };
        window.open(t.url, t.sameWindow ? '_self' : '_blank').focus();
      }
      navigateWebComponent(e, t, n, i, r) {
        const o = t.get(),
          a = document.querySelector('.wcContainer');
        for (; a.lastChild; ) a.lastChild.remove();
        pt.renderWebComponent(o.viewUrl, a, o.context);
      }
    })();
    const gt = new (class {
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
        e && (e = It.substituteViewUrl(e, t));
        const i = Ct.createIframe(e, void 0, n.get().lastNode, 'split-view');
        return document.querySelector('.iframeSplitViewCnt').appendChild(i), i;
      }
      async prepareSplitViewData(e, t) {
        const n = t && t.length ? _t.getPathWithoutHash(t) : '',
          i = await dt.getNavigationPath(Ze.getConfigValueAsync('navigation.nodes'), t),
          r = It.parseParams(n.split('?')[1]),
          o = It.getNodeParams(r),
          a = It.getLastNodeObject(i),
          s = e.get().splitViewSettings;
        s.title || (s.title = a.label);
        const l = s.collapsed || !1;
        e.set({ splitViewSettings: s, lastNode: a, pathData: i, nodeParams: o, collapsed: l, isDataPrepared: !0 });
      }
      createAndSetView(e) {
        const { nodeParams: t, lastNode: n, pathData: i } = e.get(),
          r = {
            splitViewIframe: this.setIframe(
              n.viewUrl,
              { context: i.context, pathParams: i.pathParams, nodeParams: t },
              e
            ),
            splitViewIframeData: { ...i, nodeParams: t }
          };
        e.set(r), e.dispatch('iframeCreated', { ...r, collapsed: !1 }), this.fixIOSscroll();
      }
      fixIOSscroll() {
        if (!(!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform))) return;
        const e = document.querySelector('.iframeSplitViewCnt iframe');
        e &&
          e.addEventListener('load', () => {
            (document.querySelector('.iframeSplitViewCnt').style.overflow = 'hidden'),
              setTimeout(() => {
                document.querySelector('.iframeSplitViewCnt').style.overflow = 'auto';
              });
          });
      }
      calculateInitialValues(e, t) {
        if (t) {
          const n = e || 40,
            i = e ? 100 - e : 60;
          return {
            percent: n,
            bottom: parseInt(_t.computePxFromPercent(t, n)),
            top: parseInt(_t.computePxFromPercent(t, i))
          };
        }
      }
      calculateAndSetSplitViewValues(e, t) {
        const n = parseInt(_t.computePxFromPercent(t.rightContentHeight, 100 - e)) + tt.getShellbar().clientHeight;
        this.splitViewValues = this.enforceTresholds(n, t.innerHeight - n, t);
      }
      enforceTresholds(e, t) {
        const n = this.internalValues;
        return (
          e <= n.thresholdTop
            ? ((e = n.thresholdTop), (t = n.innerHeight - n.thresholdTop))
            : t <= n.thresholdBottom && ((e = n.innerHeight - n.thresholdBottom), (t = n.thresholdBottom)),
          { top: e, bottom: t, percent: _t.computePercentFromPx(n.rightContentHeight, t) }
        );
      }
      open(e, t, n) {
        const i = { displayed: !0, collapsed: !0 === n.collapsed, nodepath: t, settings: n };
        (this.splitViewValues = this.calculateInitialValues(i.settings && i.settings.size, _t.getContentAreaHeight())),
          this.sendMessageToClients('internal', {
            exists: !0,
            size: this.splitViewValues.percent,
            collapsed: i.collapsed
          }),
          e.set({ mfSplitView: i, splitViewValues: this.splitViewValues });
      }
      close(e) {
        e.get().splitViewIframe &&
          e.getUnsavedChangesModalPromise(e.get().splitViewIframe.contentWindow).then(() => {
            e.get().mfSplitView &&
              ((e.get().mfSplitView.displayed = !1),
              (e.get().mfSplitView.collapsed = !1),
              e.set({ mfSplitView: e.get().mfSplitView })),
              e.dispatch('statusChanged', { displayed: !1 }),
              (Ct.getIframeContainer().style.paddingBottom = ''),
              gt.sendMessageToClients('close.ok');
          });
      }
      async expand(e) {
        this.sendMessageToClients('internal', { exists: !0, size: this.splitViewValues.percent, collapsed: !1 }),
          this.sendMessageToClients('expand.ok'),
          e.dispatch('statusChanged', { displayed: !0, collapsed: !1 }),
          (this.getContainer().style.top = `${this.splitViewValues.top}px`),
          (Ct.getIframeContainer().style.paddingBottom = `${this.splitViewValues.bottom}px`),
          setTimeout(() => {
            this.getDragger().style.top = `${this.splitViewValues.top}px`;
          });
      }
      collapse(e) {
        e.get().splitViewIframe &&
          e.getUnsavedChangesModalPromise(e.get().splitViewIframe.contentWindow).then(() => {
            this.sendMessageToClients('internal', { exists: !0, size: this.splitViewValues.percent, collapsed: !0 }),
              this.sendMessageToClients('collapse.ok'),
              e.dispatch('statusChanged', { displayed: !0, collapsed: !0 }),
              (this.getContainer().style.top = ''),
              (Ct.getIframeContainer().style.paddingBottom = '');
          });
      }
      sendMessageToClients(e, t) {
        Ct.sendMessageToVisibleIframes({ msg: `luigi.navigation.splitview.${e}`, data: t });
      }
    })();
    const mt = new (class {
      luigiAfterInit() {
        Ze.getConfigBooleanValue('settings.appLoadingIndicator.hideAutomatically') &&
          setTimeout(() => {
            it.hideAppLoadingIndicator();
          }, 0);
      }
    })();
    const vt = new (class {
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
          this._storageType || (this._storageType = Ze.getConfigValue('auth.storage') || this._defaultStorage),
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
            void 0 !== t
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
        } catch (e) {
          console.warn('Error parsing authorization data. Auto-logout might not work!');
        }
      }
    })();
    const bt = new (class {
      constructor() {
        return (this._userInfoStore = Ke({})), (this._loggedInStore = Ke(!1)), this;
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
        const e = Ze.getConfigValue('auth.use');
        if (!e) return Promise.resolve(!0);
        const t = Ze.getConfigValue(`auth.${e}`),
          n = St.parseUrlAuthErrors() || {};
        return (await St.handleUrlAuthErrors(t, n.error, n.errorDescription))
          ? ((this.idpProviderInstance = this.getIdpProviderInstance(e, t)),
            _t.isPromise(this.idpProviderInstance)
              ? this.idpProviderInstance
                  .then(e => ((this.idpProviderInstance = e), this.checkAuth(t)))
                  .catch(e => {
                    const t = `Error: ${e.message || e}`;
                    console.error(t, e.message && e), Ze.setErrorMessage(t);
                  })
              : this.checkAuth(t))
          : void 0;
      }
      async checkAuth(e) {
        const t = St.getStoredAuthData();
        if (!t || !St.isLoggedIn()) {
          if (Ze.getConfigValue('auth.disableAutoLogin')) return;
          let n = !0;
          return t && (n = await et.handleAuthEvent('onAuthExpired', e)), n ? this.startAuthorization() : void 0;
        }
        this.idpProviderInstance.settings && _t.isFunction(this.idpProviderInstance.settings.userInfoFn)
          ? this.idpProviderInstance.settings.userInfoFn(this.idpProviderInstance.settings, t).then(e => {
              this.setUserInfo(e), this.setLoggedIn(!0);
            })
          : _t.isFunction(this.idpProviderInstance.userInfo)
          ? this.idpProviderInstance.userInfo(e).then(e => {
              this.setUserInfo(e), this.setLoggedIn(!0);
            })
          : (this.setLoggedIn(!0), this.setUserInfo(f(this._userInfoStore))),
          _t.isFunction(Ze.getConfigValue('auth.events.onAuthSuccessful')) &&
            vt.isNewlyAuthorized() &&
            (await et.handleAuthEvent('onAuthSuccessful', e, t)),
          vt.removeNewlyAuthorized(),
          _t.isFunction(this.idpProviderInstance.setTokenExpirationAction) &&
            this.idpProviderInstance.setTokenExpirationAction(),
          _t.isFunction(this.idpProviderInstance.setTokenExpireSoonAction) &&
            this.idpProviderInstance.setTokenExpireSoonAction();
      }
      async startAuthorization() {
        if (this.idpProviderInstance)
          return this.idpProviderInstance.login().then(e => {
            vt.setNewlyAuthorized(), e && console.error(e);
          });
      }
      logout() {
        const e = St.getStoredAuthData(),
          t = async e => {
            await et.handleAuthEvent('onLogout', this.idpProviderInstance.settings, void 0, e), vt.removeAuthData();
          },
          n = Ze.getConfigValue(`auth.${Ze.getConfigValue('auth.use')}.logoutFn`);
        _t.isFunction(n)
          ? n(this.idpProviderInstance.settings, e, t)
          : _t.isFunction(this.idpProviderInstance.logout)
          ? this.idpProviderInstance.logout(e, t)
          : this._profileLogoutFn
          ? this._profileLogoutFn(e, t)
          : t(this.idpProviderInstance.settings.logoutUrl);
      }
      IdpProviderException(e) {
        return { message: e, name: 'IdpProviderException' };
      }
      async getIdpProviderInstance(e, t) {
        const n = _t.getConfigValueFromObject(t, 'idpProvider');
        if (n) {
          const i = await new n(t);
          return (
            ['login'].forEach(t => {
              if (!_t.isFunction(i[t]))
                throw this.IdpProviderException(`${t} function does not exist in custom IDP Provider ${e}`);
            }),
            i
          );
        }
        if (!_t.isFunction(Ze.getConfigValue('auth.events.onAuthConfigError')))
          throw this.IdpProviderException(`IDP Provider ${e} does not exist.`);
        await et.handleAuthEvent('onAuthConfigError', { idpProviderName: e, type: 'IdpProviderException' });
      }
      unload() {
        this.idpProviderInstance && _t.isFunction(this.idpProviderInstance.unload) && this.idpProviderInstance.unload();
      }
    })();
    const wt = new (class {
      constructor() {
        this.decorators = [];
      }
      hasDecorators() {
        return this.decorators.length > 0;
      }
      add(e) {
        this.decorators = this.decorators.filter(t => t.uid !== e.uid).concat(e);
      }
      applyDecorators(e) {
        const t = new URL(_t.prependOrigin(e)),
          n = this.decorators.filter(e => 'queryString' === e.type);
        for (let e = 0; e < n.length; e++) {
          const i = n[e];
          t.searchParams.has(i.key) && t.searchParams.delete(i.key);
          const r = i.valueFn();
          t.searchParams.append(i.key, r);
        }
        return t.href;
      }
    })();
    const St = new (class {
      getStoredAuthData() {
        return vt.getAuthData();
      }
      isLoggedIn() {
        const e = this.getStoredAuthData();
        return e && (() => e.accessTokenExpirationDate > Number(new Date()))();
      }
      parseUrlAuthErrors() {
        const e = _t.getUrlParameter('error'),
          t = _t.getUrlParameter('errorDescription');
        if (e) return { error: e, errorDescription: t };
      }
      async handleUrlAuthErrors(e, t, n) {
        return (
          !t ||
          (await et.handleAuthEvent(
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
          ))
        );
      }
    })();
    const yt = new (class {
      sanitizeHtml(e) {
        return e
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/javascript:/g, '');
      }
      restoreSanitizedBrs(e) {
        return e
          .replace(/&lt;br\/&gt;/g, '<br>')
          .replace(/&lt;br \/&gt;/g, '<br>')
          .replace(/&lt;br&gt;/g, '<br>')
          .replace(/&lt;br &gt;/g, '<br>');
      }
      sanitizeParam(e) {
        return String(e)
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/\//g, '&sol;');
      }
      escapeKeyForRegexp(e) {
        return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      }
      processTextAndLinks(e, t, n) {
        let i = { sanitizedText: this.restoreSanitizedBrs(this.sanitizeHtml(e)), links: [] };
        return t
          ? Object.entries(t).reduce((e, [t, i]) => {
              const r = `_luigi_alert_${n}_link_${this.sanitizeParam(t)}`,
                o = `<a id="${r}">${this.restoreSanitizedBrs(this.sanitizeHtml(i.text))}</a>`,
                a = this.escapeKeyForRegexp(t),
                s = new RegExp(`({${a}})`, 'g');
              return {
                sanitizedText: e.sanitizedText.replace(s, o),
                links: e.links.concat({ elemId: r, url: encodeURI(this.sanitizeHtml(i.url)) })
              };
            }, i)
          : i;
      }
    })();
    const _t = new (class {
      getRandomId() {
        return (window.crypto || window.msCrypto).getRandomValues(new Uint32Array(1))[0];
      }
      isFunction(e) {
        return e && '[object Function]' === {}.toString.call(e);
      }
      isPromise(e) {
        return e && this.isFunction(e.then);
      }
      isIE() {
        const e = navigator.userAgent;
        return Boolean(e.includes('MSIE ') || e.includes('Trident/'));
      }
      isObject(e) {
        return e && 'object' == typeof e && !Array.isArray(e);
      }
      deepMerge(e, ...t) {
        if (!t.length) return e;
        const n = t.shift();
        if (this.isObject(e) && this.isObject(n))
          for (const t in n)
            this.isObject(n[t])
              ? (e[t] || Object.assign(e, { [t]: {} }), this.deepMerge(e[t], n[t]))
              : Object.assign(e, { [t]: n[t] });
        return this.deepMerge(e, ...t);
      }
      getUrlWithoutHash(e) {
        if (!e) return !1;
        const t = e.split('#')[0];
        return t.startsWith('http') ? t : window.location.origin + (t.startsWith('/') ? '' : '/') + t;
      }
      hasHash(e) {
        return e && 0 === e.search(/^[#\/].*$/);
      }
      getPathWithoutHash(e) {
        for (; this.hasHash(e); ) e = e.substr(1);
        return e;
      }
      getUrlParameter(e) {
        e = e.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var t = new RegExp('[\\?&]' + e + '=([^&#]*)').exec(window.location.search);
        return (t && decodeURIComponent(t[1].replace(/\+/g, ' '))) || '';
      }
      prependOrigin(e) {
        if (e.startsWith('http')) return e;
        const t = e.startsWith('/');
        return e.length ? window.location.origin + (t ? '' : '/') + e : window.location.origin;
      }
      addLeadingSlash(e) {
        return (e.startsWith('/') ? '' : '/') + e;
      }
      addTrailingSlash(e) {
        return 'string' != typeof e ? e : e.replace(/\/?$/, '/');
      }
      trimLeadingSlash(e) {
        return e.replace(/^\/+/g, '');
      }
      trimTrailingSlash(e) {
        return e.replace(/\/+$/, '');
      }
      getTrimmedUrl(e) {
        const t = 0 < e.length ? this.getPathWithoutHash(e) : e;
        return this.trimTrailingSlash(t.split('?')[0]);
      }
      normalizePath(e) {
        return 'string' != typeof e ? e : this.addLeadingSlash(this.addTrailingSlash(e));
      }
      getConfigValueFromObject(e, t) {
        let n = 0,
          i = e;
        const r = t.split('.');
        for (; i && n < r.length; ) i = i[r[n++]];
        return i;
      }
      canComponentHandleModal(e) {
        return e && 'function' == typeof e.get;
      }
      escapeRegExp(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      replaceVars(e, t, n, i = !0) {
        let r = e;
        return (
          t &&
            Object.entries(t).forEach(e => {
              r = r.replace(
                new RegExp(this.escapeRegExp((i ? '{' : '') + n + e[0] + (i ? '}' : '')), 'g'),
                encodeURIComponent(e[1])
              );
            }),
          i && (r = r.replace(new RegExp('\\{' + this.escapeRegExp(n) + '[^\\}]+\\}', 'g'), '')),
          r
        );
      }
      getInnerHeight() {
        return tt.isCustomLuigiContainer() ? tt.getLuigiContainer().clientHeight : window.innerHeight;
      }
      getContentAreaHeight() {
        return this.getInnerHeight() - tt.getShellbar().clientHeight;
      }
      computePxFromPercent(e, t) {
        return (e / 100) * t;
      }
      computePercentFromPx(e, t) {
        return Math.floor((100 * t) / e);
      }
      isElementVisible(e) {
        return 'none' !== window.getComputedStyle(e, null).getPropertyValue('display');
      }
      removeInternalProperties(e) {
        return (
          (e &&
            Object.keys(e)
              .filter(e => !e.startsWith('_'))
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
        for (const i in e)
          if (e.hasOwnProperty(i)) {
            const r = 0 === t.filter(e => i.includes(e)).length,
              o =
                0 ===
                t
                  .filter(e => e.endsWith('*'))
                  .map(e => e.slice(0, -1))
                  .filter(e => i.startsWith(e)).length;
            r && o && (n[i] = e[i]);
          }
        return n;
      }
      semverCompare(e, t) {
        for (var n = e.split('-')[0].split('.'), i = t.split('-')[0].split('.'), r = 0; r < 3; r++) {
          var o = Number(n[r]),
            a = Number(i[r]);
          if (o > a) return 1;
          if (a > o) return -1;
          if (!isNaN(o) && isNaN(a)) return 1;
          if (isNaN(o) && !isNaN(a)) return -1;
        }
        return 0;
      }
    })();
    const Ct = new (class {
      get specialIframeTypes() {
        return [
          { iframeKey: 'modalIframe', dataKey: 'modalIframeData', iframeConfigKey: 'modal' },
          { iframeKey: 'splitViewIframe', dataKey: 'splitViewIframeData', iframeConfigKey: 'splitView' }
        ];
      }
      hideElementChildren(e) {
        e.children &&
          Array.from(e.children).forEach(e => {
            'IFRAME' === e.tagName && (e.style.display = 'none');
          });
      }
      removeElementChildren(e) {
        [...e.children].forEach(t => {
          t.vg || 'IFRAME' !== t.tagName || e.removeChild(t);
        });
      }
      removeIframe(e, t) {
        Array.from(t.children).forEach(n => {
          n === e && t.removeChild(n);
        });
      }
      replaceVars(e, t, n, i = !0) {
        let r = e;
        return (
          t &&
            Object.entries(t).forEach(e => {
              r = r.replace(
                new RegExp(_t.escapeRegExp((i ? '{' : '') + n + e[0] + (i ? '}' : '')), 'g'),
                encodeURIComponent(e[1])
              );
            }),
          i && (r = r.replace(new RegExp('\\{' + _t.escapeRegExp(n) + '[^\\}]+\\}', 'g'), '')),
          r
        );
      }
      isSameDomain(e, t) {
        if (e.iframe) {
          const e = t.get(),
            n = _t.getUrlWithoutHash(e.previousNodeValues.viewUrl),
            i = _t.getUrlWithoutHash(e.viewUrl),
            r = e.previousNodeValues.viewGroup,
            o = e.viewGroup;
          if (n === i && !r && !o) return !0;
        }
        return !1;
      }
      isSameViewGroup(e, t) {
        if (e.iframe) {
          const e = t.get(),
            n = _t.getUrlWithoutHash(e.previousNodeValues.viewUrl),
            i = _t.getUrlWithoutHash(e.viewUrl);
          if (this.getLocation(n) === this.getLocation(i)) {
            const t = e.previousNodeValues.viewGroup,
              n = e.viewGroup;
            if (t && n && t === n) return !0;
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
        return this.getLocation(e) === t;
      }
      iframeIsSameDomain(e, t) {
        return this.urlMatchesTheDomain(e, t);
      }
      getIframeContainer() {
        const e = Array.from(document.querySelectorAll('.iframeContainer'));
        return e.length > 0 ? e[0] : void 0;
      }
      getMicrofrontendsInDom() {
        return Oe.map(({ type: e, selector: t }) =>
          Array.from(document.querySelectorAll(t)).map(t => ({
            id: t.luigi.id,
            container: t,
            active: _t.isElementVisible(t),
            type: e
          }))
        ).reduce((e, t) => e.concat(t), []);
      }
      getMicrofrontendIframes() {
        return this.getMicrofrontendsInDom().map(e => e.container);
      }
      getCurrentMicrofrontendIframe() {
        const e = this.getModalIframes(),
          t = this.getMainIframes().filter(_t.isElementVisible);
        return e[0] || t[0] || null;
      }
      getIframesWithType(e) {
        return this.getMicrofrontendsInDom()
          .filter(t => t.type === e)
          .map(e => e.container);
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
        '' !== n && e.contentWindow && e.contentWindow.postMessage(t, n);
      }
      sendMessageToVisibleIframes(e) {
        this.getVisibleIframes().forEach(t => this.sendMessageToIframe(t, e));
      }
      broadcastMessageToAllIframes(e) {
        Ct.getMicrofrontendIframes().forEach(t => this.sendMessageToIframe(t, e));
      }
      createIframe(e, t, n, i) {
        const r = [
            'allow-forms',
            'allow-modals',
            'allow-popups',
            'allow-popups-to-escape-sandbox',
            'allow-same-origin',
            'allow-scripts'
          ],
          o = Ze.getConfigValue('settings.customSandboxRules'),
          a = Ze.getConfigValue('settings.allowRules'),
          s = o ? [...new Set([...r, ...o])] : r,
          l = document.createElement('iframe');
        (l.src = wt.hasDecorators() ? wt.applyDecorators(e) : e),
          a && (l.allow = a.join(' ')),
          (l.sandbox = s.join(' ')),
          (l.luigi = { viewUrl: e, currentNode: n, createdAt: new Date().getTime(), id: _t.getRandomId() }),
          t && (l.vg = t),
          n && n.clientPermissions && (l.luigi.clientPermissions = n.clientPermissions);
        const c = Ze.getConfigValue('settings.iframeCreationInterceptor');
        if (_t.isFunction(c))
          try {
            c(l, t, n, i);
          } catch (e) {
            console.error('Error applying iframe creation interceptor: ', e);
          }
        return l;
      }
      isMessageSource(e, t) {
        return t && t.contentWindow === e.source;
      }
      getValidMessageSource(e) {
        const t = [
          ...Ct.getMicrofrontendIframes(),
          { contentWindow: window, luigi: { viewUrl: window.location.href } }
        ].find(t => this.isMessageSource(e, t));
        if (!t || !t.luigi || !t.luigi.viewUrl) return;
        const n = 'luigi.navigate.ok' === e.data.msg;
        if (n && !t.luigi.nextViewUrl) return;
        const i = n ? t.luigi.nextViewUrl : t.luigi.viewUrl;
        return this.iframeIsSameDomain(i, e.origin) ? t : void 0;
      }
    })();
    const xt = new (class {
      constructor() {
        (this.EXP_CAT_KEY = 'luigi.preferences.navigation.expandedCategories'),
          (this.COL_NAV_KEY = 'luigi.preferences.navigation.collapsedNavigation'),
          (this.virtualGroupPrefix = '___');
      }
      getProductSwitcherConfig() {
        const e = Ze.getConfigValue('navigation.productSwitcher');
        return Object.assign({ icon: 'grid', label: 'My Products' }, e);
      }
      getProductSwitcherColumnsNumber() {
        return 3 === this.getProductSwitcherConfig().columns ? 3 : 4;
      }
      prepareForTests(...e) {
        let t = '';
        return (
          e.forEach(e => {
            e &&
              (t +=
                (t ? '_' : '') +
                encodeURIComponent(
                  e
                    .toLowerCase()
                    .split(' ')
                    .join('')
                ));
          }),
          t
        );
      }
      isNodeAccessPermitted(e, t, n) {
        if (et.isAuthorizationEnabled()) {
          const t = St.isLoggedIn(),
            n = e.anonymousAccess;
          if ((t && 'exclusive' === n) || (!t && 'exclusive' !== n && !0 !== n)) return !1;
        }
        if (e && e.visibleForFeatureToggles) {
          let t = at.getActiveFeatureToggleList();
          for (let n of e.visibleForFeatureToggles)
            if (n.startsWith('!')) {
              if (t.includes(n.slice(1))) return !1;
            } else if (!t.includes(n)) return !1;
        }
        const i = Ze.getConfigValue('navigation.nodeAccessibilityResolver');
        return 'function' != typeof i || i(e, t, n);
      }
      applyContext(e, t, n) {
        if (t) for (var i in t) e[i] = t[i];
        return n && e.parentNavigationContexts.unshift(n), e;
      }
      getNodePath(e) {
        return e.parent ? this.getNodePath(e.parent) + '/' + e.pathSegment : e.pathSegment;
      }
      groupNodesBy(e, t, n) {
        const i = {};
        let r = 0,
          o = 0;
        return (
          e.forEach(e => {
            let a, s;
            const l = e[t];
            l && 'object' == typeof l
              ? ((a = l.label), (s = Object.assign({}, l)))
              : ((a = l), n && !l && (a = this.virtualGroupPrefix + o), (s = { label: a }));
            let c = i[a];
            c ||
              (n && l && o++,
              (void 0 !== s.order && null !== s.order && '' !== s.order) || (s.order = a ? r++ : -1),
              (c = []),
              (i[a] = c)),
              c.metaInfo || (c.metaInfo = s),
              !c.metaInfo.categoryUid &&
                a &&
                c.metaInfo.collapsible &&
                (c.metaInfo.categoryUid = e.parent ? this.getNodePath(e.parent) + ':' + a : a),
              e.hideFromNav || c.push(e);
          }),
          Object.keys(i).forEach(e => {
            (e => {
              e.sort((e, t) => {
                return (e.order || 0) - (t.order || 0);
              });
            })(i[e]),
              0 === i[e].length && delete i[e];
          }),
          i
        );
      }
      async generateTopNavNodes(e) {
        const t = await dt.getFilteredChildren(e[0]);
        let n = null,
          i = 0,
          r = {};
        const o = [];
        let a = [];
        for (const s of t) {
          let t;
          e.forEach(e => {
            n || e !== s || (n = s);
          }),
            s.hideFromNav || i++;
          const l = !!s.badgeCounter;
          if ((l && (t = await s.badgeCounter.count()), s.category)) {
            const e = s.category.label || s.category;
            if (r[e]) {
              if (
                (r[e].icon || ((r[e].icon = s.category.icon), (r[e].altText = s.category.altText)),
                l && !r[e].badgeCounter)
              )
                r[e].badgeCounter = { label: '', count: () => t };
              else if (l) {
                const n = r[e].badgeCounter.count() + t;
                r[e].badgeCounter.count = () => n;
              }
            } else
              (r[e] = {
                isCat: !0,
                label: e,
                icon: s.category.icon,
                altText: s.category.altText,
                children: [],
                badgeCounter: l && { label: '', count: () => t }
              }),
                o.push(r[e]);
            r[e].children.push(s);
          } else o.push(s);
          t && a.push(t);
        }
        const s = { children: o, selectedNode: n, visibleNodeCount: i };
        if (a.length) {
          const e = a.reduce((e, t) => e + t);
          s.totalBadgeNode = { badgeCounter: { count: () => e, label: '' } };
        }
        return s;
      }
      loadExpandedCategories() {
        let e = [];
        const t = localStorage.getItem(this.EXP_CAT_KEY);
        if (t)
          try {
            e = JSON.parse(t);
          } catch (e) {
            console.warn('Preference data corrupted, using default');
          }
        return e;
      }
      storeExpandedState(e, t) {
        const n = this.loadExpandedCategories();
        if (t) n.indexOf(e) < 0 && n.push(e);
        else {
          let t = n.indexOf(e);
          t >= 0 && n.splice(t, 1);
        }
        return localStorage.setItem(this.EXP_CAT_KEY, JSON.stringify(n)), n;
      }
      isOpenUIiconName(e) {
        return /^[a-z0-9\-]+$/i.test(e);
      }
      handleUnresponsiveClient(e) {
        if (e.errorFn) e.errorFn();
        else {
          console.warn('Something went wrong with a client! You will be redirected to another page.');
          const t = e.redirectPath || '/';
          ht.navigateTo(t);
        }
      }
    })();
    const It = new (class {
      constructor() {
        this.defaultContentViewParamPrefix = '~';
      }
      getLastNodeObject(e) {
        const t = [...e.navigationPath].pop();
        return t || {};
      }
      async getDefaultChildNode(e, t) {
        const n = e.navigationPath[e.navigationPath.length - 1],
          i = t ? await t(n, e.context) : await Ee.getConfigValueFromObjectAsync(n, 'children', e.context),
          r = i.find(e => e.pathSegment === n.defaultChildNode);
        if (n.defaultChildNode && r) return n.defaultChildNode;
        if (i && i.length) {
          if (1 === e.navigationPath.length) {
            const e = i.find(e => e.pathSegment);
            return (
              (e && e.pathSegment) ||
              console.error('At least one navigation node in the root hierarchy must have a pathSegment.')
            );
          }
          const t = i.find(e => e.pathSegment && (e.viewUrl || (e.externalLink && e.externalLink.url)));
          if (t) return t.pathSegment;
        }
        return '';
      }
      parseParams(e) {
        const t = {},
          n = e ? e.split('&') : null;
        return (
          n &&
            n.forEach(e => {
              const n = e.split('=');
              n && n.length > 0 && (t[decodeURIComponent(n[0])] = decodeURIComponent(n[1]));
            }),
          t
        );
      }
      getNodeParams(e) {
        const t = {},
          n = this.getContentViewParamPrefix();
        return (
          e &&
            Object.entries(e).forEach(e => {
              if (e[0].startsWith(n)) {
                const i = e[0].substr(n.length);
                t[i] = e[1];
              }
            }),
          this.sanitizeParamsMap(t)
        );
      }
      applyPathParams(e, t) {
        let n = e;
        return (
          t &&
            Object.entries(t).forEach(([e, t]) => {
              n = n.replace(new RegExp(':' + e, 'g'), t);
            }),
          n
        );
      }
      findViewGroup(e) {
        return e.viewGroup ? e.viewGroup : e.parent ? this.findViewGroup(e.parent) : void 0;
      }
      getContentViewParamPrefix() {
        let e = Ze.getConfigValue('routing.nodeParamPrefix');
        return !1 === e ? (e = '') : e || (e = this.defaultContentViewParamPrefix), e;
      }
      addRouteChangeListener(e) {
        const t = Ze.getConfigValue('routing.useHashRouting');
        if (
          (Nt.addEventListener('message', n => {
            if ('refreshRoute' === n.data.msg && n.origin === window.origin) {
              const n = t ? ht.getHashPath() : ht.getModifiedPathname();
              e(n);
            }
          }),
          t)
        )
          return Nt.addEventListener('hashchange', t => {
            e(ht.getHashPath(t.newURL));
          });
        Nt.addEventListener('popstate', () => {
          e(ht.getModifiedPathname());
        });
      }
      buildRoute(e, t, n) {
        return e.parent ? this.buildRoute(e.parent, `/${e.parent.pathSegment}${t}`, n) : t + (n ? '?' + n : '');
      }
      getRouteLink(e, t) {
        if (e.externalLink && e.externalLink.url) return e.externalLink;
        if (e.link) {
          return e.link.startsWith('/') ? e.link : ht.buildFromRelativePath(e);
        }
        let n = It.buildRoute(e, `/${e.pathSegment}`);
        return _t.replaceVars(n, t, ':', !1);
      }
      getNodeHref(e, t) {
        if (Ze.getConfigBooleanValue('navigation.addNavHrefs')) {
          const n = It.getRouteLink(e, t);
          return n.url || n;
        }
        return 'javascript:void(0)';
      }
      substituteDynamicParamsInObject(e, t, n = ':') {
        return Object.entries(e)
          .map(([e, i]) => {
            let r = Object.keys(t).find(e => i === n + e);
            return [e, r ? t[r] : i];
          })
          .reduce((e, [t, n]) => Object.assign(e, { [t]: n }), {});
      }
      isDynamicNode(e) {
        return e.pathSegment && e.pathSegment.length > 0 && ':' === e.pathSegment[0];
      }
      getDynamicNodeValue(e, t) {
        return this.isDynamicNode(e) ? t[e.pathSegment.substring(1)] : void 0;
      }
      substituteViewUrl(e, t) {
        return (
          (e = _t.replaceVars(e, t.pathParams, ':', !1)),
          (e = _t.replaceVars(e, t.context, 'context.')),
          (e = _t.replaceVars(e, t.nodeParams, 'nodeParams.'))
        );
      }
      sanitizeParamsMap(e) {
        return Object.entries(e).reduce((e, t) => ((e[yt.sanitizeParam(t[0])] = yt.sanitizeParam(t[1])), e), {});
      }
      setFeatureToggles(e, t) {
        let n,
          i = this.sanitizeParamsMap(this.parseParams(t.split('?')[1]));
        if ((i[e] && (n = i[e]), !n)) return;
        let r = n.split(',');
        r.length > 0 && '' !== r[0] && r.forEach(e => at.setFeatureToggle(e));
      }
    })();
    const Tt = new (class {
      optimizeScope(e) {
        let t = '';
        const n = [];
        return (
          [...e].sort().forEach(e => {
            e && !n.includes(e) && ((t && 0 === e.indexOf(t)) || (n.push(e), (t = e)));
          }),
          n
        );
      }
      expandScope(e) {
        const t = [];
        return (
          e.forEach(e => {
            let n = '';
            e.split('.').forEach(e => {
              (n = n + (n ? '.' : '') + e), t.push(n);
            });
          }),
          [...new Set(t)]
        );
      }
      doOnStoreChange(e, t, n = []) {
        e.subscribe(t),
          this.expandScope(n).forEach(n => {
            e.subscribeToScope(t, n);
          });
      }
    })();
    const Nt = new (class {
      constructor() {
        (this.listeners = []), (window.onunload = () => this.removeAllEventListeners());
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
    })();
    n(387);
    function kt(e, t, n) {
      const i = Object.create(e);
      return (i.al = t[n]), i;
    }
    function $t(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l = e.al.dataSanitized ? e.al.settings.text : '';
      function c() {
        return e.click_handler(e);
      }
      return {
        c() {
          (t = k('div')),
            (n = k('p')),
            (i = P()),
            (r = k('button')),
            (o = P()),
            D(n, 'class', 'fd-message-strip__text svelte-1qmxmi6'),
            D(r, 'class', 'fd-button fd-button--transparent fd-button--compact fd-message-strip__close'),
            D(r, 'aria-label', 'Close'),
            D(r, 'aria-controls', 'j2ALl423'),
            D(r, 'data-testid', 'luigi-alert-dismiss'),
            D(
              t,
              'class',
              (a =
                'fd-message-strip fd-message-strip--' +
                e.alertTypeMap[e.al.settings.type] +
                ' fd-message-strip--dismissible svelte-1qmxmi6')
            ),
            D(t, 'role', 'alert'),
            D(t, 'id', 'j2ALl423'),
            D(t, 'data-testid', 'luigi-alert'),
            (s = L(r, 'click', c));
        },
        m(e, a) {
          I(e, t, a), x(t, n), (n.innerHTML = l), x(t, i), x(t, r), x(t, o);
        },
        p(i, r) {
          (e = r),
            i.alertQueue && l !== (l = e.al.dataSanitized ? e.al.settings.text : '') && (n.innerHTML = l),
            (i.alertTypeMap || i.alertQueue) &&
              a !==
                (a =
                  'fd-message-strip fd-message-strip--' +
                  e.alertTypeMap[e.al.settings.type] +
                  ' fd-message-strip--dismissible svelte-1qmxmi6') &&
              D(t, 'class', a);
        },
        d(e) {
          e && T(t), s();
        }
      };
    }
    function Pt(e) {
      var t;
      let n = e.alertQueue,
        r = [];
      for (let t = 0; t < n.length; t += 1) r[t] = $t(kt(e, n, t));
      return {
        c() {
          t = k('div');
          for (let e = 0; e < r.length; e += 1) r[e].c();
          D(t, 'class', 'fd-shell__overlay luigi-alert--overlay svelte-1qmxmi6'), D(t, 'aria-hidden', 'false');
        },
        m(e, n) {
          I(e, t, n);
          for (let e = 0; e < r.length; e += 1) r[e].m(t, null);
        },
        p(e, i) {
          if (e.alertTypeMap || e.alertQueue) {
            let o;
            for (n = i.alertQueue, o = 0; o < n.length; o += 1) {
              const a = kt(i, n, o);
              r[o] ? r[o].p(e, a) : ((r[o] = $t(a)), r[o].c(), r[o].m(t, null));
            }
            for (; o < r.length; o += 1) r[o].d(1);
            r.length = n.length;
          }
        },
        i: i,
        o: i,
        d(e) {
          e && T(t), N(r, e);
        }
      };
    }
    function Et(e, t, n) {
      const i = Y();
      let {
        alertQueue: r,
        alertTypeMap: o = { info: 'information', success: 'success', warning: 'warning', error: 'error' }
      } = t;
      const a = X('getUnsavedChangesModalPromise'),
        s = X('handleNavigation');
      function l(e, t) {
        try {
          document.getElementById(t).addEventListener('click', t => {
            const n = !e.startsWith('/');
            t.stopPropagation(),
              a().then(() => {
                s({ params: { link: e, relative: n } });
              });
          });
        } catch (e) {
          console.error('Error on Alert::addClickListener', e);
        }
      }
      H(() => {
        if (!r || !r.length) return void console.warn('There are no alerts to display');
        if (r.processed) return;
        const e = r.map(e => {
          const { text: t, links: n, closeAfter: i } = e.settings,
            r = yt.processTextAndLinks(t, n, e.settings.id);
          return (
            setTimeout(() => {
              r.links.forEach(e => {
                l(e.url, e.elemId);
              });
            }),
            { settings: { ...e.settings, text: r.sanitizedText }, dataSanitized: !0 }
          );
        });
        (e.processed = !0), n('alertQueue', (r = e));
      }),
        q(() => {});
      return (
        (e.$set = e => {
          'alertQueue' in e && n('alertQueue', (r = e.alertQueue)),
            'alertTypeMap' in e && n('alertTypeMap', (o = e.alertTypeMap));
        }),
        {
          dispatch: i,
          alertQueue: r,
          alertTypeMap: o,
          addClickListener: l,
          click_handler: ({ al: e }) => i('alertDismiss', { id: e.settings.id })
        }
      );
    }
    var Lt = class extends Pe {
      constructor(e) {
        super(), $e(this, e, Et, Pt, d, ['alertQueue', 'alertTypeMap', 'addClickListener']);
      }
      get addClickListener() {
        return this.$$.ctx.addClickListener;
      }
    };
    const Rt = 38,
      At = 40,
      Dt = 13,
      Ot = 27;
    n(388);
    function Vt(e) {
      var t,
        n,
        r,
        o,
        a,
        s,
        c,
        d,
        u,
        f,
        p,
        h,
        g,
        m,
        v,
        b,
        w,
        S,
        y,
        _,
        C,
        N = e.settings.header + '',
        E = e.settings.body + '',
        R = e.settings.buttonConfirm + '',
        A = e.settings.buttonDismiss + '';
      return {
        c() {
          (t = k('div')),
            (n = k('div')),
            (r = k('header')),
            (o = k('div')),
            (a = k('div')),
            (s = k('h3')),
            (c = $(N)),
            (d = P()),
            (u = k('div')),
            (f = $(E)),
            (p = P()),
            (h = k('footer')),
            (g = k('div')),
            (m = k('div')),
            (v = k('button')),
            (b = $(R)),
            (w = P()),
            (S = k('div')),
            (y = k('button')),
            (_ = $(A)),
            D(s, 'class', 'fd-dialog__title'),
            D(a, 'class', 'fd-bar__element'),
            D(o, 'class', 'fd-bar__left'),
            D(r, 'class', 'fd-dialog__header fd-bar fd-bar--header'),
            D(u, 'class', 'fd-dialog__body svelte-py0zuw'),
            D(v, 'data-testid', 'luigi-modal-confirm'),
            D(
              v,
              'class',
              'fd-dialog__decisive-button fd-button fd-button--emphasized fd-button--compact confirm-button'
            ),
            D(m, 'class', 'fd-bar__element'),
            D(y, 'data-testid', 'luigi-modal-dismiss'),
            D(y, 'class', 'fd-dialog__decisive-button fd-button fd-button--transparent fd-button--compact'),
            D(S, 'class', 'fd-bar__element'),
            D(g, 'class', 'fd-bar__right'),
            D(h, 'class', 'fd-dialog__footer fd-bar fd-bar--footer'),
            D(n, 'class', 'fd-dialog__content fd-dialog__content--s svelte-py0zuw'),
            D(t, 'class', 'fd-dialog fd-dialog--active'),
            D(t, 'data-testid', 'luigi-confirmation-modal'),
            (C = [
              L(window, 'keydown', e.handleKeydown),
              L(v, 'click', e.click_handler),
              L(y, 'click', e.click_handler_1)
            ]);
        },
        m(e, i) {
          I(e, t, i),
            x(t, n),
            x(n, r),
            x(r, o),
            x(o, a),
            x(a, s),
            x(s, c),
            x(n, d),
            x(n, u),
            x(u, f),
            x(n, p),
            x(n, h),
            x(h, g),
            x(g, m),
            x(m, v),
            x(v, b),
            x(g, w),
            x(g, S),
            x(S, y),
            x(y, _);
        },
        p(e, t) {
          e.settings && N !== (N = t.settings.header + '') && O(c, N),
            e.settings && E !== (E = t.settings.body + '') && O(f, E),
            e.settings && R !== (R = t.settings.buttonConfirm + '') && O(b, R),
            e.settings && A !== (A = t.settings.buttonDismiss + '') && O(_, A);
        },
        i: i,
        o: i,
        d(e) {
          e && T(t), l(C);
        }
      };
    }
    function Mt(e, t, n) {
      const i = Y();
      let { settings: r } = t;
      q(() => {
        const e = {
          header: nt.getTranslation('luigi.confirmationModal.header'),
          body: nt.getTranslation('luigi.confirmationModal.body'),
          buttonDismiss: nt.getTranslation('luigi.button.dismiss'),
          buttonConfirm: nt.getTranslation('luigi.button.confirm')
        };
        n('settings', (r = Object.assign(e, r)));
        try {
          document.querySelector('.confirm-button').focus();
        } catch (e) {
          console.warn("Couldn't focus confirmation button in modal");
        }
      });
      return (
        (e.$set = e => {
          'settings' in e && n('settings', (r = e.settings));
        }),
        {
          dispatch: i,
          settings: r,
          handleKeydown: function(e) {
            e.keyCode === Ot && i('modalDismiss');
          },
          click_handler: () => i('modalConfirm'),
          click_handler_1: () => i('modalDismiss')
        }
      );
    }
    var Ft = class extends Pe {
      constructor(e) {
        super(), $e(this, e, Mt, Vt, d, ['settings', 'handleKeydown']);
      }
      get handleKeydown() {
        return this.$$.ctx.handleKeydown;
      }
    };
    function jt(e, { delay: t = 0, duration: n = 400 }) {
      const i = +getComputedStyle(e).opacity;
      return { delay: t, duration: n, css: e => `opacity: ${e * i}` };
    }
    n(389);
    function Ut(e) {
      var t,
        n,
        i = e.modalSettings.title + '';
      return {
        c() {
          (t = k('h3')), (n = $(i)), D(t, 'class', 'fd-dialog__title');
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, t) {
          e.modalSettings && i !== (i = t.modalSettings.title + '') && O(n, i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Bt(e) {
      var t, n, i, r;
      return {
        c() {
          ((t = k('div')).innerHTML =
            '<div class="fd-busy-indicator--m" aria-hidden="false" aria-label="Loading" data-testid="luigi-loading-spinner"><div class="fd-busy-indicator--circle-0"></div> <div class="fd-busy-indicator--circle-1"></div> <div class="fd-busy-indicator--circle-2"></div></div>'),
            D(t, 'class', 'fd-page spinnerContainer svelte-15erppw'),
            D(t, 'aria-hidden', 'false'),
            D(t, 'aria-label', 'Loading');
        },
        m(e, n) {
          I(e, t, n), (r = !0);
        },
        i(e) {
          r ||
            (le(() => {
              i && i.end(1), n || (n = ye(t, jt, { delay: 250, duration: 250 })), n.start();
            }),
            (r = !0));
        },
        o(e) {
          n && n.invalidate(), (i = _e(t, jt, { duration: 250 })), (r = !1);
        },
        d(e) {
          e && (T(t), i && i.end());
        }
      };
    }
    function zt(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d,
        u,
        f,
        p,
        h,
        g,
        m = e.modalSettings.title && Ut(e),
        v = e.showLoadingIndicator && Bt();
      return {
        c() {
          var l, h, b;
          (t = k('div')),
            (n = k('div')),
            (i = k('div')),
            (r = k('div')),
            (o = k('div')),
            m && m.c(),
            (a = P()),
            (s = k('div')),
            (c = k('div')),
            (d = k('button')),
            (u = P()),
            ((f = k('div')).innerHTML = '<div class="iframeModalCtn svelte-15erppw"></div>'),
            (p = P()),
            v && v.c(),
            D(o, 'class', 'fd-bar__element'),
            D(r, 'class', 'fd-bar__left'),
            D(d, 'class', 'fd-button fd-button--transparent fd-button--compact fd-dialog__close sap-icon--decline'),
            D(d, 'aria-label', 'close'),
            D(c, 'class', 'fd-bar__element'),
            D(s, 'class', 'fd-bar__right'),
            D(i, 'class', 'fd-dialog__header fd-bar fd-bar--header'),
            D(f, 'class', 'fd-dialog__body svelte-15erppw'),
            D(n, 'class', 'fd-dialog__content lui-modal-mf svelte-15erppw'),
            D(n, 'data-testid', 'modal-mf'),
            D(t, 'class', 'fd-dialog fd-dialog--active'),
            (l = 'z-index'),
            (h = '999'),
            t.style.setProperty(l, h, b ? 'important' : ''),
            (g = [L(window, 'keydown', e.handleKeydown), L(d, 'click', e.click_handler)]);
        },
        m(e, l) {
          I(e, t, l),
            x(t, n),
            x(n, i),
            x(i, r),
            x(r, o),
            m && m.m(o, null),
            x(i, a),
            x(i, s),
            x(s, c),
            x(c, d),
            x(n, u),
            x(n, f),
            x(n, p),
            v && v.m(n, null),
            (h = !0);
        },
        p(e, t) {
          t.modalSettings.title ? (m ? m.p(e, t) : ((m = Ut(t)).c(), m.m(o, null))) : m && (m.d(1), (m = null)),
            t.showLoadingIndicator
              ? v
                ? be(v, 1)
                : ((v = Bt()).c(), be(v, 1), v.m(n, null))
              : v &&
                (me(),
                we(v, 1, 1, () => {
                  v = null;
                }),
                ve());
        },
        i(e) {
          h || (be(v), (h = !0));
        },
        o(e) {
          we(v), (h = !1);
        },
        d(e) {
          e && T(t), m && m.d(), v && v.d(), l(g);
        }
      };
    }
    function Wt(e, t, n) {
      const i = Y();
      let r,
        o,
        a,
        { modalSettings: s, isDataPrepared: l = !1, nodepath: c } = t,
        d = !1,
        u = !0;
      const f = async e => {
          if (!d)
            if (l) {
              const e = await p(r.viewUrl, { context: o.context, pathParams: o.pathParams, nodeParams: a });
              i('iframeCreated', { modalIframe: e, modalIframeData: { ...o, nodeParams: a } }), (d = !0);
            } else
              await (async e => {
                const t = e && e.length ? _t.getPathWithoutHash(e) : '',
                  i = It.parseParams(t.split('?')[1]);
                a = It.getNodeParams(i);
                const c = await dt.extractDataFromPath(e);
                (r = c.nodeObject),
                  (o = c.pathData),
                  s.title || n('modalSettings', (s.title = r.label), s),
                  n('isDataPrepared', (l = !0));
              })(e);
        },
        p = async (e, t) => {
          const n = document.getElementsByClassName('lui-modal-mf');
          let i = '80%';
          s.size && ('l' === s.size ? (i = '80%') : 'm' === s.size ? (i = '60%') : 's' === s.size && (i = '40%')),
            n[0].setAttribute('style', `width:${i};height:${i}`),
            e && (e = It.substituteViewUrl(e, t));
          const o = await Ct.createIframe(e, void 0, r, 'modal');
          return document.querySelector('.iframeModalCtn').appendChild(o), o;
        };
      K(() => {
        f(c);
      });
      const h = async e => {
        if (
          ('luigi.show-loading-indicator' === e.data.msg && n('showLoadingIndicator', (u = !0)),
          'luigi.hide-loading-indicator' === e.data.msg && n('showLoadingIndicator', (u = !1)),
          'luigi.get-context' === e.data.msg)
        ) {
          (!r || !r.loadingIndicator || !1 !== r.loadingIndicator.hideAutomatically) &&
            n('showLoadingIndicator', (u = !1));
        }
        'luigi.close-modal' === e.data.msg && i('close');
      };
      q(() => {
        Nt.addEventListener('message', h);
      }),
        J(() => {
          Nt.removeEventListener('message', h);
        });
      return (
        (e.$set = e => {
          'modalSettings' in e && n('modalSettings', (s = e.modalSettings)),
            'isDataPrepared' in e && n('isDataPrepared', (l = e.isDataPrepared)),
            'nodepath' in e && n('nodepath', (c = e.nodepath));
        }),
        {
          dispatch: i,
          modalSettings: s,
          isDataPrepared: l,
          nodepath: c,
          showLoadingIndicator: u,
          handleKeydown: function(e) {
            e.keyCode === Ot && i('close');
          },
          click_handler: () => i('close')
        }
      );
    }
    var Gt = class extends Pe {
      constructor(e) {
        super(), $e(this, e, Wt, zt, d, ['modalSettings', 'isDataPrepared', 'nodepath', 'handleKeydown']);
      }
      get handleKeydown() {
        return this.$$.ctx.handleKeydown;
      }
    };
    n(390);
    function Ht(e) {
      var t, n, i, r;
      const a = e.$$slots.default,
        s = (function(e, t, n) {
          if (e) {
            const i = h(e, t, n);
            return e[0](i);
          }
        })(a, e, null);
      return {
        c() {
          (t = k('div')),
            s && s.c(),
            D(t, 'class', (n = g(e.backdropClass) + ' svelte-vthf9s')),
            D(t, 'aria-hidden', 'false'),
            D(t, 'style', (i = 'main' === e.area ? 'z-index: 0;' : ''));
        },
        l(e) {
          s && s.l(div_nodes);
        },
        m(e, n) {
          I(e, t, n), s && s.m(t, null), (r = !0);
        },
        p(e, l) {
          s &&
            s.p &&
            e.$$scope &&
            s.p(
              (function(e, t, n, i) {
                return e[1] ? o({}, o(t.$$scope.changed || {}, e[1](i ? i(n) : {}))) : t.$$scope.changed || {};
              })(a, l, e, null),
              h(a, l, null)
            ),
            (r && !e.backdropClass) || n === (n = g(l.backdropClass) + ' svelte-vthf9s') || D(t, 'class', n),
            (r && !e.area) || i === (i = 'main' === l.area ? 'z-index: 0;' : '') || D(t, 'style', i);
        },
        i(e) {
          r || (be(s, e), (r = !0));
        },
        o(e) {
          we(s, e), (r = !1);
        },
        d(e) {
          e && T(t), s && s.d(e);
        }
      };
    }
    function qt(e, t, n) {
      const i = Y();
      let { backdropClass: r = '', backdropActive: o = !1 } = t,
        a = !1,
        s = {},
        { area: l } = t;
      const c = () => {
        o
          ? s.data && s.data.heightCssClass
            ? n('backdropClass', (r = 'lui-backdrop ' + s.data.heightCssClass))
            : n('backdropClass', (r = 'lui-backdrop height-auto'))
          : n('backdropClass', (r = ''));
      };
      q(() => {
        Ze.getConfigValue('settings.backdropDisabled') ||
          (c(),
          Nt.addEventListener('message', e => {
            Ct.getValidMessageSource(e) &&
              ('luigi.add-backdrop' === e.data.msg &&
                ((e => {
                  if (!l) return !0;
                  const t = [
                    ...Ct.getMicrofrontendsInDom(),
                    { contentWindow: window, luigi: { viewUrl: window.location.href } }
                  ].find(t => t.container && t.container.contentWindow === e.source);
                  return !t || l !== t.type;
                })(e)
                  ? n('backdropActive', (o = !0))
                  : n('backdropActive', (o = !1)),
                i('stateChanged', { backdropActive: !0 })),
              'luigi.remove-backdrop' === e.data.msg &&
                (n('backdropActive', (o = !1)), i('stateChanged', { backdropActive: !1 })));
          }));
      }),
        H(() => {
          o !== a && ((a = o), c());
        });
      let { $$slots: d = {}, $$scope: u } = t;
      return (
        (e.$set = e => {
          'backdropClass' in e && n('backdropClass', (r = e.backdropClass)),
            'backdropActive' in e && n('backdropActive', (o = e.backdropActive)),
            'area' in e && n('area', (l = e.area)),
            '$$scope' in e && n('$$scope', (u = e.$$scope));
        }),
        { backdropClass: r, backdropActive: o, area: l, $$slots: d, $$scope: u }
      );
    }
    var Kt = class extends Pe {
      constructor(e) {
        super(), $e(this, e, qt, Ht, d, ['backdropClass', 'backdropActive', 'area']);
      }
    };
    n(391);
    const { window: Jt } = xe;
    function Yt(e) {
      var t;
      return {
        c() {
          D((t = k('div')), 'class', 'iframeSplitViewCnt svelte-y6nqff');
        },
        m(e, n) {
          I(e, t, n);
        },
        p: i,
        d(e) {
          e && T(t);
        }
      };
    }
    function Qt(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s = e.splitViewSettings.title + '';
      return {
        c() {
          (t = k('div')),
            ((n = k('a')).innerHTML = '<span class="sap-icon--navigation-up-arrow"></span>'),
            (i = P()),
            (r = k('h1')),
            (o = $(s)),
            D(n, 'class', 'lui-collapse-btn svelte-y6nqff'),
            D(t, 'id', 'splitViewDraggerCollapsed'),
            D(t, 'class', 'splitViewSeparator isCollapsed svelte-y6nqff'),
            D(r, 'class', 'fd-splitView__title svelte-y6nqff'),
            (a = L(n, 'click', A(R(e.expand))));
        },
        m(e, a) {
          I(e, t, a), x(t, n), I(e, i, a), I(e, r, a), x(r, o);
        },
        p(e, t) {
          e.splitViewSettings && s !== (s = t.splitViewSettings.title + '') && O(o, s);
        },
        d(e) {
          e && (T(t), T(i), T(r)), a();
        }
      };
    }
    function Xt(e) {
      var t, n, i, r, o, a, s;
      return {
        c() {
          (t = k('div')),
            (n = P()),
            (i = k('div')),
            (r = k('div')),
            (o = P()),
            ((a = k('a')).innerHTML = '<span class="sap-icon--navigation-down-arrow"></span>'),
            D(t, 'id', 'splitViewDraggerBackdrop'),
            D(r, 'class', 'splitViewSeparator'),
            D(a, 'class', 'lui-collapse-btn svelte-y6nqff'),
            D(i, 'id', 'splitViewDragger'),
            (s = [L(a, 'click', A(R(e.collapse))), L(i, 'mousedown', A(e.onDragStart))]);
        },
        m(e, s) {
          I(e, t, s), I(e, n, s), I(e, i, s), x(i, r), x(i, o), x(i, a);
        },
        d(e) {
          e && (T(t), T(n), T(i)), l(s);
        }
      };
    }
    function Zt(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c = new Kt({ props: { area: 'split-view' } });
      function d(e, t) {
        return t.collapsed ? Qt : Yt;
      }
      c.$on('stateChanged', e.backdropStateChanged);
      var u = d(0, e),
        f = u(e),
        p = !e.collapsed && Xt(e);
      return {
        c() {
          (t = k('div')),
            c.$$.fragment.c(),
            (n = P()),
            (i = k('div')),
            f.c(),
            (o = P()),
            p && p.c(),
            (a = E()),
            D(i, 'class', 'lui-split-view svelte-y6nqff'),
            D(t, 'id', 'splitViewContainer'),
            D(t, 'class', (r = 'splitViewContainer ' + (e.collapsed ? 'lui-collapsed' : '') + ' svelte-y6nqff')),
            (l = L(Jt, 'resize', e.updateSizes));
        },
        m(e, r) {
          I(e, t, r), Ne(c, t, null), x(t, n), x(t, i), f.m(i, null), I(e, o, r), p && p.m(e, r), I(e, a, r), (s = !0);
        },
        p(e, n) {
          u === (u = d(0, n)) && f ? f.p(e, n) : (f.d(1), (f = u(n)) && (f.c(), f.m(i, null))),
            (s && !e.collapsed) ||
              r === (r = 'splitViewContainer ' + (n.collapsed ? 'lui-collapsed' : '') + ' svelte-y6nqff') ||
              D(t, 'class', r),
            n.collapsed ? p && (p.d(1), (p = null)) : p || ((p = Xt(n)).c(), p.m(a.parentNode, a));
        },
        i(e) {
          s || (be(c.$$.fragment, e), (s = !0));
        },
        o(e) {
          we(c.$$.fragment, e), (s = !1);
        },
        d(e) {
          e && T(t), ke(c), f.d(), e && T(o), p && p.d(e), e && T(a), l();
        }
      };
    }
    function en(e, t, n) {
      const i = Y();
      let r,
        o,
        a,
        s,
        l,
        c,
        d,
        u = { draggable: null, iframe: null, split: null },
        { nodepath: f, collapsed: p, splitViewSettings: h = {}, isDataPrepared: g = !1 } = t,
        m = !1,
        v = X('getUnsavedChangesModalPromise');
      const b = () => ({
          get: () => ({
            collapsed: p,
            splitViewSettings: h,
            isDataPrepared: g,
            lastNode: r,
            pathData: o,
            nodeParams: a,
            currentNode: s,
            splitViewIframe: c,
            splitViewIframeData: d
          }),
          set: e => {
            e &&
              Object.getOwnPropertyNames(e).forEach(t => {
                'splitViewSettings' === t
                  ? n('splitViewSettings', (h = e.splitViewSettings))
                  : 'lastNode' === t
                  ? (r = e.lastNode)
                  : 'pathData' === t
                  ? (o = e.pathData)
                  : 'nodeParams' === t
                  ? (a = e.nodeParams)
                  : 'collapsed' === t
                  ? n('collapsed', (p = e.collapsed))
                  : 'isDataPrepared' === t
                  ? n('isDataPrepared', (g = e.isDataPrepared))
                  : 'currentNode' === t
                  ? (s = e.currentNode)
                  : 'splitViewIframe' === t
                  ? (c = e.splitViewIframe)
                  : 'splitViewIframeData' === t && (d = e.splitViewIframeData);
              });
          },
          dispatch: i,
          getUnsavedChangesModalPromise: v
        }),
        w = () => {
          (u.split = gt.getContainer()), (u.iframe = Ct.getIframeContainer()), (u.draggable = gt.getDragger());
        },
        S = () => {
          const e = gt.getDraggerBackdrop();
          e && (e.style.display = 'none'),
            w(),
            u.draggable && (u.draggable.style.top = `${gt.splitViewValues.top}px`),
            (u.split.style.top = `${gt.splitViewValues.top}px`),
            (u.iframe.style.paddingBottom = `${gt.splitViewValues.bottom}px`);
        };
      function y(e) {
        if (
          Ct.getValidMessageSource(e) &&
          ('luigi.navigation.splitview.close' === e.data.msg && gt.close(b()),
          'luigi.navigation.splitview.collapse' === e.data.msg && _(),
          'luigi.navigation.splitview.expand' === e.data.msg && C(),
          'luigi.navigation.splitview.resize' === e.data.msg)
        ) {
          const t = parseInt(e.data.data);
          if ((gt.calculateAndSetSplitViewValues(t, gt.internalValues), p)) return;
          S(), gt.sendMessageToClients('resize.ok', gt.splitViewValues.percent);
        }
      }
      function _() {
        gt.collapse(b());
      }
      async function C() {
        await gt.expand(b()), u.draggerBackdrop && (u.draggerBackdrop.style.display = 'none');
      }
      function x() {
        const e = tt.getShellbar().clientHeight;
        (gt.internalValues.innerHeight = _t.getInnerHeight()),
          (gt.internalValues.rightContentHeight = gt.internalValues.innerHeight - e),
          (gt.internalValues.thresholdBottom = 30),
          (gt.internalValues.thresholdTop = e + 30),
          gt.calculateAndSetSplitViewValues(gt.splitViewValues.percent, gt.internalValues),
          p || S();
      }
      q(() => {
        x(), (l = y.bind(this)), Nt.addEventListener('message', l);
      }),
        K(() => {
          (async () => {
            g ? p || gt.createAndSetView(b()) : await gt.prepareSplitViewData(b(), f);
          })(),
            m === g || p || ((m = g), S());
        }),
        J(() => {
          window.removeEventListener('message', l);
        });
      return (
        (e.$set = e => {
          'nodepath' in e && n('nodepath', (f = e.nodepath)),
            'collapsed' in e && n('collapsed', (p = e.collapsed)),
            'splitViewSettings' in e && n('splitViewSettings', (h = e.splitViewSettings)),
            'isDataPrepared' in e && n('isDataPrepared', (g = e.isDataPrepared));
        }),
        {
          nodepath: f,
          collapsed: p,
          splitViewSettings: h,
          isDataPrepared: g,
          collapse: _,
          expand: C,
          updateSizes: x,
          onDragStart: function(e) {
            let t = e.y,
              n = {};
            const i = function(e) {
                const i = t - e.y,
                  r = parseInt(getComputedStyle(u.draggable, '').top);
                if (isNaN(r) || 0 === i) return;
                const o = r - i,
                  a = gt.internalValues.innerHeight - o,
                  s = gt.enforceTresholds(o, a);
                o < s.top || a < s.bottom || ((n = s), (t = e.y), (u.draggable.style.top = `${n.top}px`));
              },
              r = function() {
                o(),
                  n.top && n.bottom && n.top != gt.internalValues.m_pos_prev
                    ? ((gt.internalValues.m_pos_prev = n.top),
                      (gt.splitViewValues = n),
                      S(),
                      gt.sendMessageToClients('resize.ok', n.percent))
                    : (gt.getDraggerBackdrop().style.display = 'none');
              },
              o = function() {
                document.removeEventListener('mouseup', r), document.removeEventListener('mousemove', i);
              };
            w(),
              o(),
              document.addEventListener('mouseup', r),
              document.addEventListener('mousemove', i),
              (gt.getDraggerBackdrop().style.display = 'block');
          },
          backdropStateChanged: e => {
            (e => {
              let t = gt.getDraggerButton();
              t && (t.style.display = e ? 'block' : 'none'),
                (t = gt.getCollapsedDraggerButton()) && (t.style.display = e ? 'block' : 'none');
            })(!e.detail || !0 !== e.detail.backdropActive);
          }
        }
      );
    }
    var tn = class extends Pe {
      constructor(e) {
        super(),
          $e(this, e, en, Zt, d, [
            'nodepath',
            'collapsed',
            'splitViewSettings',
            'isDataPrepared',
            'collapse',
            'expand',
            'updateSizes',
            'onDragStart'
          ]);
      }
      get collapse() {
        return this.$$.ctx.collapse;
      }
      get expand() {
        return this.$$.ctx.expand;
      }
      get updateSizes() {
        return this.$$.ctx.updateSizes;
      }
      get onDragStart() {
        return this.$$.ctx.onDragStart;
      }
    };
    const nn = new (class {
      initial() {
        (this.responsiveNavSetting = Ze.getConfigValue('settings.responsiveNavigation')),
          (this.semiCollapsible =
            'semiCollapsible' === this.responsiveNavSetting || 'Fiori3' === this.responsiveNavSetting);
        let e = void 0 === this.isSemiCollapsed;
        return (
          this.semiCollapsible && 0 !== window.innerWidth && window.innerWidth < De.desktopMinWidth
            ? (this.isSemiCollapsed = !!e || this.getCollapsed())
            : (this.isSemiCollapsed = !e && this.getCollapsed()),
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
            0 !== window.innerWidth &&
            window.innerWidth < De.desktopMinWidth &&
            this.previousWindowWidth >= De.desktopMinWidth,
          n =
            0 !== window.innerWidth &&
            window.innerWidth > De.desktopMinWidth &&
            this.previousWindowWidth >= De.desktopMinWidth;
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
          t && localStorage.setItem(xt.COL_NAV_KEY, e),
          this.valueChangedFns instanceof Array &&
            this.valueChangedFns.forEach(e => e({ isSemiCollapsed: this.isSemiCollapsed }));
      }
      isStoredCollapsed() {
        return JSON.parse(localStorage.getItem(xt.COL_NAV_KEY));
      }
      getCollapsed() {
        return !!this.isStoredCollapsed() || this.isSemiCollapsed;
      }
      closePopupMenu(e) {
        return (
          e && ((e = null), document.getElementsByClassName('fd-app__sidebar')[0].classList.remove('isBlocked')), e
        );
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
    })();
    n(392);
    function rn(e) {
      var t, n;
      let i = { ctx: e, current: null, token: null, pending: ln, then: an, catch: on, value: 'count', error: 'error' };
      return (
        Ce((n = e.node.badgeCounter.count()), i),
        {
          c() {
            (t = E()), i.block.c();
          },
          m(e, n) {
            I(e, t, n), i.block.m(e, (i.anchor = n)), (i.mount = () => t.parentNode), (i.anchor = t);
          },
          p(t, r) {
            (e = r),
              (i.ctx = e),
              ('node' in t && n !== (n = e.node.badgeCounter.count()) && Ce(n, i)) ||
                i.block.p(t, o(o({}, e), i.resolved));
          },
          d(e) {
            e && T(t), i.block.d(e), (i.token = null), (i = null);
          }
        }
      );
    }
    function on(e) {
      return { c: i, m: i, p: i, d: i };
    }
    function an(e) {
      var t,
        n = e.count > 0 && sn(e);
      return {
        c() {
          n && n.c(), (t = E());
        },
        m(e, i) {
          n && n.m(e, i), I(e, t, i);
        },
        p(e, i) {
          i.count > 0 ? (n ? n.p(e, i) : ((n = sn(i)).c(), n.m(t.parentNode, t))) : n && (n.d(1), (n = null));
        },
        d(e) {
          n && n.d(e), e && T(t);
        }
      };
    }
    function sn(e) {
      var t,
        n,
        i,
        r = e.count + '';
      return {
        c() {
          (t = k('span')),
            (n = $(r)),
            D(t, 'class', 'fd-counter fd-counter--notification svelte-1iur8aq'),
            D(t, 'aria-label', (i = e.node.badgeCounter.label));
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, o) {
          e.node && r !== (r = o.count + '') && O(n, r),
            e.node && i !== (i = o.node.badgeCounter.label) && D(t, 'aria-label', i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function ln(e) {
      return { c: i, m: i, p: i, d: i };
    }
    function cn(e) {
      var t,
        n = e.node && e.node.badgeCounter && rn(e);
      return {
        c() {
          n && n.c(), (t = E());
        },
        m(e, i) {
          n && n.m(e, i), I(e, t, i);
        },
        p(e, i) {
          i.node && i.node.badgeCounter
            ? n
              ? n.p(e, i)
              : ((n = rn(i)).c(), n.m(t.parentNode, t))
            : n && (n.d(1), (n = null));
        },
        i: i,
        o: i,
        d(e) {
          n && n.d(e), e && T(t);
        }
      };
    }
    function dn(e, t, n) {
      let { node: i } = t;
      return (
        (e.$set = e => {
          'node' in e && n('node', (i = e.node));
        }),
        { node: i }
      );
    }
    var un = class extends Pe {
      constructor(e) {
        super(), $e(this, e, dn, cn, d, ['node']);
      }
    };
    n(393);
    const { Boolean: fn, Object: pn, window: hn } = xe;
    function gn(e, t, n) {
      const i = pn.create(e);
      return (i.node = t[n]), i;
    }
    function mn(e, t, n) {
      const i = pn.create(e);
      return (i.node = t[n]), i;
    }
    function vn(e, t, n) {
      const i = pn.create(e);
      return (i.node = t[n]), i;
    }
    function bn(e, t, n) {
      const i = pn.create(e);
      return (i.node = t[n]), i;
    }
    function wn(e, t, n) {
      const i = pn.create(e);
      return (i.key = t[n][0]), (i.nodes = t[n][1]), i;
    }
    function Sn(e) {
      var t, n, i, r, o;
      let a = e.sortedChildrenEntries,
        s = [];
      for (let t = 0; t < a.length; t += 1) s[t] = oi(wn(e, a, t));
      const l = e =>
        we(s[e], 1, 1, () => {
          s[e] = null;
        });
      return {
        c() {
          (t = k('div')), (n = k('div')), (i = k('ul'));
          for (let e = 0; e < s.length; e += 1) s[e].c();
          D(i, 'class', (r = g(e.sideNavClass) + ' svelte-1n63pbo')),
            D(n, 'class', 'lui-fd-side-nav-wrapper svelte-1n63pbo'),
            D(t, 'class', 'fd-side-nav__main-navigation svelte-1n63pbo');
        },
        m(e, r) {
          I(e, t, r), x(t, n), x(n, i);
          for (let e = 0; e < s.length; e += 1) s[e].m(i, null);
          o = !0;
        },
        p(e, t) {
          if (
            e.sortedChildrenEntries ||
            e.virtualGroupPrefix ||
            e.getRouteLink ||
            e.$getTranslation ||
            e.selectedNode ||
            e.getTestId ||
            e.isOpenUIiconName ||
            e.isSemiCollapsed ||
            e.getTestIdForCat ||
            e.selectedCategory ||
            e.isExpanded ||
            e.expandedCategories ||
            e.hasCategoriesWithIcon
          ) {
            let n;
            for (a = t.sortedChildrenEntries, n = 0; n < a.length; n += 1) {
              const r = wn(t, a, n);
              s[n] ? (s[n].p(e, r), be(s[n], 1)) : ((s[n] = oi(r)), s[n].c(), be(s[n], 1), s[n].m(i, null));
            }
            for (me(), n = a.length; n < s.length; n += 1) l(n);
            ve();
          }
          (o && !e.sideNavClass) || r === (r = g(t.sideNavClass) + ' svelte-1n63pbo') || D(i, 'class', r);
        },
        i(e) {
          if (!o) {
            for (let e = 0; e < a.length; e += 1) be(s[e]);
            o = !0;
          }
        },
        o(e) {
          s = s.filter(fn);
          for (let e = 0; e < s.length; e += 1) we(s[e]);
          o = !1;
        },
        d(e) {
          e && T(t), N(s, e);
        }
      };
    }
    function yn(e) {
      var t,
        n,
        i,
        r,
        o = [xn, Cn],
        a = [];
      function s(e, t) {
        return t.nodes.metaInfo.collapsible ? 0 : 1;
      }
      return (
        (t = s(0, e)),
        (n = a[t] = o[t](e)),
        {
          c() {
            n.c(), (i = E());
          },
          m(e, n) {
            a[t].m(e, n), I(e, i, n), (r = !0);
          },
          p(e, r) {
            var l = t;
            (t = s(0, r)) === l
              ? a[t].p(e, r)
              : (me(),
                we(a[l], 1, 1, () => {
                  a[l] = null;
                }),
                ve(),
                (n = a[t]) || (n = a[t] = o[t](r)).c(),
                be(n, 1),
                n.m(i.parentNode, i));
          },
          i(e) {
            r || (be(n), (r = !0));
          },
          o(e) {
            we(n), (r = !1);
          },
          d(e) {
            a[t].d(e), e && T(i);
          }
        }
      );
    }
    function _n(e) {
      var t, n;
      let i = e.nodes,
        r = [];
      for (let t = 0; t < i.length; t += 1) r[t] = ri(bn(e, i, t));
      const o = e =>
        we(r[e], 1, 1, () => {
          r[e] = null;
        });
      return {
        c() {
          for (let e = 0; e < r.length; e += 1) r[e].c();
          t = E();
        },
        m(e, i) {
          for (let t = 0; t < r.length; t += 1) r[t].m(e, i);
          I(e, t, i), (n = !0);
        },
        p(e, n) {
          if (
            e.sortedChildrenEntries ||
            e.getRouteLink ||
            e.$getTranslation ||
            e.selectedNode ||
            e.getTestId ||
            e.isOpenUIiconName ||
            e.isSemiCollapsed
          ) {
            let a;
            for (i = n.nodes, a = 0; a < i.length; a += 1) {
              const o = bn(n, i, a);
              r[a] ? (r[a].p(e, o), be(r[a], 1)) : ((r[a] = ri(o)), r[a].c(), be(r[a], 1), r[a].m(t.parentNode, t));
            }
            for (me(), a = i.length; a < r.length; a += 1) o(a);
            ve();
          }
        },
        i(e) {
          if (!n) {
            for (let e = 0; e < i.length; e += 1) be(r[e]);
            n = !0;
          }
        },
        o(e) {
          r = r.filter(fn);
          for (let e = 0; e < r.length; e += 1) we(r[e]);
          n = !1;
        },
        d(e) {
          N(r, e), e && T(t);
        }
      };
    }
    function Cn(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c = e.$getTranslation(e.key) + '',
        d = e.hasCategoriesWithIcon && e.nodes.metaInfo.icon && In(e);
      let u = e.nodes,
        f = [];
      for (let t = 0; t < u.length; t += 1) f[t] = On(gn(e, u, t));
      const p = e =>
        we(f[e], 1, 1, () => {
          f[e] = null;
        });
      return {
        c() {
          (t = k('li')), d && d.c(), (n = P()), (i = $(c)), (a = P());
          for (let e = 0; e < f.length; e += 1) f[e].c();
          (s = E()),
            D(t, 'class', 'fd-nested-list__group-header lui-category svelte-1n63pbo'),
            D(t, 'title', (r = e.$getTranslation(e.key))),
            D(t, 'data-testid', (o = fi(e.nodes.metaInfo, e.key)));
        },
        m(e, r) {
          I(e, t, r), d && d.m(t, null), x(t, n), x(t, i), I(e, a, r);
          for (let t = 0; t < f.length; t += 1) f[t].m(e, r);
          I(e, s, r), (l = !0);
        },
        p(e, a) {
          if (
            (a.hasCategoriesWithIcon && a.nodes.metaInfo.icon
              ? d
                ? d.p(e, a)
                : ((d = In(a)).c(), d.m(t, n))
              : d && (d.d(1), (d = null)),
            (l && !e.$getTranslation && !e.sortedChildrenEntries) ||
              c === (c = a.$getTranslation(a.key) + '') ||
              O(i, c),
            (l && !e.$getTranslation && !e.sortedChildrenEntries) ||
              r === (r = a.$getTranslation(a.key)) ||
              D(t, 'title', r),
            (l && !e.sortedChildrenEntries) || o === (o = fi(a.nodes.metaInfo, a.key)) || D(t, 'data-testid', o),
            e.sortedChildrenEntries ||
              e.$getTranslation ||
              e.getRouteLink ||
              e.selectedNode ||
              e.getTestId ||
              e.isOpenUIiconName ||
              e.isSemiCollapsed)
          ) {
            let t;
            for (u = a.nodes, t = 0; t < u.length; t += 1) {
              const n = gn(a, u, t);
              f[t] ? (f[t].p(e, n), be(f[t], 1)) : ((f[t] = On(n)), f[t].c(), be(f[t], 1), f[t].m(s.parentNode, s));
            }
            for (me(), t = u.length; t < f.length; t += 1) p(t);
            ve();
          }
        },
        i(e) {
          if (!l) {
            for (let e = 0; e < u.length; e += 1) be(f[e]);
            l = !0;
          }
        },
        o(e) {
          f = f.filter(fn);
          for (let e = 0; e < f.length; e += 1) we(f[e]);
          l = !1;
        },
        d(e) {
          e && T(t), d && d.d(), e && T(a), N(f, e), e && T(s);
        }
      };
    }
    function xn(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d,
        u,
        f,
        p,
        h,
        g,
        m,
        v,
        b,
        w,
        S,
        y,
        _,
        C = e.$getTranslation(e.key) + '';
      function E(e, t) {
        return (null == r || e.sortedChildrenEntries) && (r = !!ci(t.nodes.metaInfo.icon)), r ? Mn : Vn;
      }
      var V = E(null, e),
        M = V(e);
      function F() {
        return e.click_handler_1(e);
      }
      function j() {
        return e.click_handler_2(e);
      }
      let U = e.nodes,
        B = [];
      for (let t = 0; t < U.length; t += 1) B[t] = zn(vn(e, U, t));
      const z = e =>
        we(B[e], 1, 1, () => {
          B[e] = null;
        });
      var W = e.nodes.metaInfo && e.nodes.metaInfo.label === e.selectedCategory && Wn(e);
      function G() {
        return e.click_handler_5(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('div')),
            (i = k('a')),
            M.c(),
            (o = P()),
            (a = k('span')),
            (s = $(C)),
            (f = P()),
            (p = k('button')),
            (g = P()),
            (m = k('ul'));
          for (let e = 0; e < B.length; e += 1) B[e].c();
          (b = P()),
            W && W.c(),
            (w = P()),
            D(a, 'class', 'fd-nested-list__title svelte-1n63pbo'),
            D(i, 'href', 'javascript:void(null)'),
            D(i, 'title', (c = e.$getTranslation(e.key))),
            D(
              i,
              'class',
              (d =
                'fd-nested-list__link ' + (di(e.nodes, e.expandedCategories) ? 'is-expanded' : '') + ' svelte-1n63pbo')
            ),
            D(i, 'tabindex', '-1'),
            D(i, 'aria-haspopup', 'true'),
            D(i, 'aria-expanded', (u = di(e.nodes, e.expandedCategories))),
            D(p, 'class', 'fd-button fd-nested-list__button svelte-1n63pbo'),
            D(p, 'href', '#'),
            D(p, 'tabindex', '-1'),
            D(p, 'aria-label', 'Expand categories'),
            D(p, 'aria-haspopup', 'true'),
            D(p, 'aria-expanded', (h = di(e.nodes, e.expandedCategories))),
            D(n, 'class', 'fd-nested-list__content has-child svelte-1n63pbo'),
            D(n, 'tabindex', '0'),
            D(m, 'class', 'fd-nested-list fd-nested-list--text-only level-2 svelte-1n63pbo'),
            D(m, 'aria-hidden', (v = !di(e.nodes, e.expandedCategories))),
            D(t, 'class', 'fd-nested-list__item lui-collapsible-item svelte-1n63pbo'),
            D(t, 'data-testid', (S = fi(e.nodes.metaInfo, e.key))),
            (_ = [L(i, 'click', R(F)), L(p, 'click', R(j)), L(t, 'click', A(G))]);
        },
        m(e, r) {
          I(e, t, r), x(t, n), x(n, i), M.m(i, null), x(i, o), x(i, a), x(a, s), x(n, f), x(n, p), x(t, g), x(t, m);
          for (let e = 0; e < B.length; e += 1) B[e].m(m, null);
          x(t, b), W && W.m(t, null), x(t, w), (y = !0);
        },
        p(n, r) {
          if (
            (V === (V = E(n, (e = r))) && M ? M.p(n, e) : (M.d(1), (M = V(e)) && (M.c(), M.m(i, o))),
            (y && !n.$getTranslation && !n.sortedChildrenEntries) ||
              C === (C = e.$getTranslation(e.key) + '') ||
              O(s, C),
            (y && !n.$getTranslation && !n.sortedChildrenEntries) ||
              c === (c = e.$getTranslation(e.key)) ||
              D(i, 'title', c),
            (y && !n.sortedChildrenEntries && !n.expandedCategories) ||
              d ===
                (d =
                  'fd-nested-list__link ' +
                  (di(e.nodes, e.expandedCategories) ? 'is-expanded' : '') +
                  ' svelte-1n63pbo') ||
              D(i, 'class', d),
            (y && !n.sortedChildrenEntries && !n.expandedCategories) ||
              u === (u = di(e.nodes, e.expandedCategories)) ||
              D(i, 'aria-expanded', u),
            (y && !n.sortedChildrenEntries && !n.expandedCategories) ||
              h === (h = di(e.nodes, e.expandedCategories)) ||
              D(p, 'aria-expanded', h),
            n.sortedChildrenEntries || n.getRouteLink || n.selectedNode || n.getTestId || n.$getTranslation)
          ) {
            let t;
            for (U = e.nodes, t = 0; t < U.length; t += 1) {
              const i = vn(e, U, t);
              B[t] ? (B[t].p(n, i), be(B[t], 1)) : ((B[t] = zn(i)), B[t].c(), be(B[t], 1), B[t].m(m, null));
            }
            for (me(), t = U.length; t < B.length; t += 1) z(t);
            ve();
          }
          (y && !n.sortedChildrenEntries && !n.expandedCategories) ||
            v === (v = !di(e.nodes, e.expandedCategories)) ||
            D(m, 'aria-hidden', v),
            e.nodes.metaInfo && e.nodes.metaInfo.label === e.selectedCategory
              ? W
                ? (W.p(n, e), be(W, 1))
                : ((W = Wn(e)).c(), be(W, 1), W.m(t, w))
              : W &&
                (me(),
                we(W, 1, 1, () => {
                  W = null;
                }),
                ve()),
            (y && !n.sortedChildrenEntries) || S === (S = fi(e.nodes.metaInfo, e.key)) || D(t, 'data-testid', S);
        },
        i(e) {
          if (!y) {
            for (let e = 0; e < U.length; e += 1) be(B[e]);
            be(W), (y = !0);
          }
        },
        o(e) {
          B = B.filter(fn);
          for (let e = 0; e < B.length; e += 1) we(B[e]);
          we(W), (y = !1);
        },
        d(e) {
          e && T(t), M.d(), N(B, e), W && W.d(), l(_);
        }
      };
    }
    function In(e) {
      var t, n;
      function i(e, n) {
        return (null == t || e.sortedChildrenEntries) && (t = !!ci(n.nodes.metaInfo.icon)), t ? Nn : Tn;
      }
      var r = i(null, e),
        o = r(e);
      return {
        c() {
          o.c(), (n = E());
        },
        m(e, t) {
          o.m(e, t), I(e, n, t);
        },
        p(e, t) {
          r === (r = i(e, t)) && o ? o.p(e, t) : (o.d(1), (o = r(t)) && (o.c(), o.m(n.parentNode, n)));
        },
        d(e) {
          o.d(e), e && T(n);
        }
      };
    }
    function Tn(e) {
      var t, n, i, r;
      return {
        c() {
          (t = k('span')),
            D((n = k('img')), 'src', (i = e.nodes.metaInfo.icon)),
            D(n, 'alt', (r = e.nodes.metaInfo.altText ? e.nodes.metaInfo.altText : '')),
            D(n, 'class', 'svelte-1n63pbo'),
            D(t, 'class', 'fd-nested-list__icon svelte-1n63pbo');
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, t) {
          e.sortedChildrenEntries && i !== (i = t.nodes.metaInfo.icon) && D(n, 'src', i),
            e.sortedChildrenEntries &&
              r !== (r = t.nodes.metaInfo.altText ? t.nodes.metaInfo.altText : '') &&
              D(n, 'alt', r);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Nn(e) {
      var t, n;
      return {
        c() {
          D(
            (t = k('span')),
            'class',
            (n =
              'fd-nested-list__icon ' +
              (e.nodes.metaInfo.icon ? 'sap-icon--' + e.nodes.metaInfo.icon : '') +
              ' svelte-1n63pbo')
          ),
            D(t, 'role', 'presentation');
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          e.sortedChildrenEntries &&
            n !==
              (n =
                'fd-nested-list__icon ' +
                (i.nodes.metaInfo.icon ? 'sap-icon--' + i.nodes.metaInfo.icon : '') +
                ' svelte-1n63pbo') &&
            D(t, 'class', n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function kn(e) {
      var t,
        n,
        i = e.node.label && $n(e);
      return {
        c() {
          i && i.c(), (t = E());
        },
        m(e, r) {
          i && i.m(e, r), I(e, t, r), (n = !0);
        },
        p(e, n) {
          n.node.label
            ? i
              ? (i.p(e, n), be(i, 1))
              : ((i = $n(n)).c(), be(i, 1), i.m(t.parentNode, t))
            : i &&
              (me(),
              we(i, 1, 1, () => {
                i = null;
              }),
              ve());
        },
        i(e) {
          n || (be(i), (n = !0));
        },
        o(e) {
          we(i), (n = !1);
        },
        d(e) {
          i && i.d(e), e && T(t);
        }
      };
    }
    function $n(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c,
        d,
        u,
        f,
        p,
        h,
        g = e.$getTranslation(e.node.label) + '';
      function m(e, t) {
        return t.node.icon ? En : Pn;
      }
      var v = m(0, e),
        b = v(e),
        w = e.node.externalLink && e.node.externalLink.url && An(e),
        S = e.node.badgeCounter && Dn(e);
      function y() {
        return e.click_handler_6(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            b.c(),
            (i = P()),
            (r = k('span')),
            (o = $(g)),
            (a = P()),
            w && w.c(),
            (s = P()),
            S && S.c(),
            (u = P()),
            D(r, 'class', 'fd-nested-list__title svelte-1n63pbo'),
            D(n, 'href', (l = e.getRouteLink(e.node))),
            D(
              n,
              'class',
              (c = 'fd-nested-list__link ' + (e.node === e.selectedNode ? 'is-selected' : '') + ' svelte-1n63pbo')
            ),
            D(n, 'data-testid', (d = ui(e.node))),
            D(t, 'class', 'fd-nested-list__item svelte-1n63pbo'),
            D(t, 'title', (f = e.$getTranslation(e.node.label))),
            (h = L(n, 'click', R(y)));
        },
        m(e, l) {
          I(e, t, l),
            x(t, n),
            b.m(n, null),
            x(n, i),
            x(n, r),
            x(r, o),
            x(n, a),
            w && w.m(n, null),
            x(n, s),
            S && S.m(n, null),
            x(t, u),
            (p = !0);
        },
        p(r, a) {
          v === (v = m(0, (e = a))) && b ? b.p(r, e) : (b.d(1), (b = v(e)) && (b.c(), b.m(n, i))),
            (p && !r.$getTranslation && !r.sortedChildrenEntries) ||
              g === (g = e.$getTranslation(e.node.label) + '') ||
              O(o, g),
            e.node.externalLink && e.node.externalLink.url
              ? w || ((w = An(e)).c(), w.m(n, s))
              : w && (w.d(1), (w = null)),
            e.node.badgeCounter
              ? S
                ? (S.p(r, e), be(S, 1))
                : ((S = Dn(e)).c(), be(S, 1), S.m(n, null))
              : S &&
                (me(),
                we(S, 1, 1, () => {
                  S = null;
                }),
                ve()),
            (p && !r.sortedChildrenEntries) || l === (l = e.getRouteLink(e.node)) || D(n, 'href', l),
            (p && !r.sortedChildrenEntries && !r.selectedNode) ||
              c ===
                (c = 'fd-nested-list__link ' + (e.node === e.selectedNode ? 'is-selected' : '') + ' svelte-1n63pbo') ||
              D(n, 'class', c),
            (p && !r.sortedChildrenEntries) || d === (d = ui(e.node)) || D(n, 'data-testid', d),
            (p && !r.$getTranslation && !r.sortedChildrenEntries) ||
              f === (f = e.$getTranslation(e.node.label)) ||
              D(t, 'title', f);
        },
        i(e) {
          p || (be(S), (p = !0));
        },
        o(e) {
          we(S), (p = !1);
        },
        d(e) {
          e && T(t), b.d(), w && w.d(), S && S.d(), h();
        }
      };
    }
    function Pn(e) {
      var t, n;
      return {
        c() {
          D(
            (t = k('span')),
            'class',
            (n =
              'fd-nested-list__icon ' + (e.isSemiCollapsed ? 'sap-icon--rhombus-milestone-2' : '') + ' svelte-1n63pbo')
          );
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          e.isSemiCollapsed &&
            n !==
              (n =
                'fd-nested-list__icon ' +
                (i.isSemiCollapsed ? 'sap-icon--rhombus-milestone-2' : '') +
                ' svelte-1n63pbo') &&
            D(t, 'class', n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function En(e) {
      var t, n;
      function i(e, n) {
        return (null == t || e.sortedChildrenEntries) && (t = !!ci(n.node.icon)), t ? Rn : Ln;
      }
      var r = i(null, e),
        o = r(e);
      return {
        c() {
          o.c(), (n = E());
        },
        m(e, t) {
          o.m(e, t), I(e, n, t);
        },
        p(e, t) {
          r === (r = i(e, t)) && o ? o.p(e, t) : (o.d(1), (o = r(t)) && (o.c(), o.m(n.parentNode, n)));
        },
        d(e) {
          o.d(e), e && T(n);
        }
      };
    }
    function Ln(e) {
      var t, n, i, r;
      return {
        c() {
          (t = k('span')),
            D((n = k('img')), 'src', (i = e.node.icon)),
            D(n, 'alt', (r = e.node.altText ? e.node.altText : '')),
            D(n, 'class', 'svelte-1n63pbo'),
            D(t, 'class', 'fd-nested-list__icon svelte-1n63pbo');
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, t) {
          e.sortedChildrenEntries && i !== (i = t.node.icon) && D(n, 'src', i),
            e.sortedChildrenEntries && r !== (r = t.node.altText ? t.node.altText : '') && D(n, 'alt', r);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Rn(e) {
      var t, n;
      return {
        c() {
          D((t = k('span')), 'class', (n = 'fd-nested-list__icon sap-icon--' + e.node.icon + ' svelte-1n63pbo'));
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          e.sortedChildrenEntries &&
            n !== (n = 'fd-nested-list__icon sap-icon--' + i.node.icon + ' svelte-1n63pbo') &&
            D(t, 'class', n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function An(e) {
      var t;
      return {
        c() {
          D((t = k('span')), 'class', 'sap-icon--action svelte-1n63pbo');
        },
        m(e, n) {
          I(e, t, n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Dn(e) {
      var t,
        n = new un({ props: { node: e.node } });
      return {
        c() {
          n.$$.fragment.c();
        },
        m(e, i) {
          Ne(n, e, i), (t = !0);
        },
        p(e, t) {
          var i = {};
          e.sortedChildrenEntries && (i.node = t.node), n.$set(i);
        },
        i(e) {
          t || (be(n.$$.fragment, e), (t = !0));
        },
        o(e) {
          we(n.$$.fragment, e), (t = !1);
        },
        d(e) {
          ke(n, e);
        }
      };
    }
    function On(e) {
      var t,
        n,
        i = !e.node.hideFromNav && kn(e);
      return {
        c() {
          i && i.c(), (t = E());
        },
        m(e, r) {
          i && i.m(e, r), I(e, t, r), (n = !0);
        },
        p(e, n) {
          n.node.hideFromNav
            ? i &&
              (me(),
              we(i, 1, 1, () => {
                i = null;
              }),
              ve())
            : i
            ? (i.p(e, n), be(i, 1))
            : ((i = kn(n)).c(), be(i, 1), i.m(t.parentNode, t));
        },
        i(e) {
          n || (be(i), (n = !0));
        },
        o(e) {
          we(i), (n = !1);
        },
        d(e) {
          i && i.d(e), e && T(t);
        }
      };
    }
    function Vn(e) {
      var t, n, i, r;
      return {
        c() {
          (t = k('span')),
            D((n = k('img')), 'src', (i = e.nodes.metaInfo.icon)),
            D(n, 'alt', (r = e.nodes.metaInfo.altText ? e.nodes.metaInfo.altText : '')),
            D(n, 'class', 'svelte-1n63pbo'),
            D(t, 'class', 'fd-nested-list__icon svelte-1n63pbo');
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, t) {
          e.sortedChildrenEntries && i !== (i = t.nodes.metaInfo.icon) && D(n, 'src', i),
            e.sortedChildrenEntries &&
              r !== (r = t.nodes.metaInfo.altText ? t.nodes.metaInfo.altText : '') &&
              D(n, 'alt', r);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Mn(e) {
      var t, n;
      return {
        c() {
          D(
            (t = k('span')),
            'class',
            (n =
              'fd-nested-list__icon sap-icon--' +
              e.nodes.metaInfo.icon +
              ' ' +
              (e.isSemiCollapsed && !e.nodes.metaInfo.icon ? 'sap-icon--rhombus-milestone-2' : '') +
              ' svelte-1n63pbo')
          ),
            D(t, 'role', 'presentation');
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          (e.sortedChildrenEntries || e.isSemiCollapsed) &&
            n !==
              (n =
                'fd-nested-list__icon sap-icon--' +
                i.nodes.metaInfo.icon +
                ' ' +
                (i.isSemiCollapsed && !i.nodes.metaInfo.icon ? 'sap-icon--rhombus-milestone-2' : '') +
                ' svelte-1n63pbo') &&
            D(t, 'class', n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Fn(e) {
      var t,
        n,
        i = e.node.label && jn(e);
      return {
        c() {
          i && i.c(), (t = E());
        },
        m(e, r) {
          i && i.m(e, r), I(e, t, r), (n = !0);
        },
        p(e, n) {
          n.node.label
            ? i
              ? (i.p(e, n), be(i, 1))
              : ((i = jn(n)).c(), be(i, 1), i.m(t.parentNode, t))
            : i &&
              (me(),
              we(i, 1, 1, () => {
                i = null;
              }),
              ve());
        },
        i(e) {
          n || (be(i), (n = !0));
        },
        o(e) {
          we(i), (n = !1);
        },
        d(e) {
          i && i.d(e), e && T(t);
        }
      };
    }
    function jn(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c,
        d,
        u,
        f,
        p,
        h = e.$getTranslation(e.node.label) + '',
        g = e.node.externalLink && e.node.externalLink.url && Un(e),
        m = e.node.badgeCounter && Bn(e);
      function v() {
        return e.click_handler_3(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            (i = k('span')),
            (r = $(h)),
            (o = P()),
            g && g.c(),
            (a = P()),
            m && m.c(),
            (u = P()),
            D(i, 'class', 'fd-nested-list__title svelte-1n63pbo'),
            D(n, 'href', (s = e.getRouteLink(e.node))),
            D(
              n,
              'class',
              (l = 'fd-nested-list__link ' + (e.node === e.selectedNode ? 'is-selected' : '') + ' svelte-1n63pbo')
            ),
            D(n, 'data-testid', (c = ui(e.node))),
            D(n, 'title', (d = e.$getTranslation(e.node.label))),
            D(t, 'class', 'fd-nested-list__item svelte-1n63pbo'),
            (p = L(n, 'click', R(v)));
        },
        m(e, s) {
          I(e, t, s),
            x(t, n),
            x(n, i),
            x(i, r),
            x(n, o),
            g && g.m(n, null),
            x(n, a),
            m && m.m(n, null),
            x(t, u),
            (f = !0);
        },
        p(t, i) {
          (e = i),
            (f && !t.$getTranslation && !t.sortedChildrenEntries) ||
              h === (h = e.$getTranslation(e.node.label) + '') ||
              O(r, h),
            e.node.externalLink && e.node.externalLink.url
              ? g || ((g = Un(e)).c(), g.m(n, a))
              : g && (g.d(1), (g = null)),
            e.node.badgeCounter
              ? m
                ? (m.p(t, e), be(m, 1))
                : ((m = Bn(e)).c(), be(m, 1), m.m(n, null))
              : m &&
                (me(),
                we(m, 1, 1, () => {
                  m = null;
                }),
                ve()),
            (f && !t.sortedChildrenEntries) || s === (s = e.getRouteLink(e.node)) || D(n, 'href', s),
            (f && !t.sortedChildrenEntries && !t.selectedNode) ||
              l ===
                (l = 'fd-nested-list__link ' + (e.node === e.selectedNode ? 'is-selected' : '') + ' svelte-1n63pbo') ||
              D(n, 'class', l),
            (f && !t.sortedChildrenEntries) || c === (c = ui(e.node)) || D(n, 'data-testid', c),
            (f && !t.$getTranslation && !t.sortedChildrenEntries) ||
              d === (d = e.$getTranslation(e.node.label)) ||
              D(n, 'title', d);
        },
        i(e) {
          f || (be(m), (f = !0));
        },
        o(e) {
          we(m), (f = !1);
        },
        d(e) {
          e && T(t), g && g.d(), m && m.d(), p();
        }
      };
    }
    function Un(e) {
      var t;
      return {
        c() {
          D((t = k('span')), 'class', 'sap-icon--action svelte-1n63pbo');
        },
        m(e, n) {
          I(e, t, n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Bn(e) {
      var t,
        n = new un({ props: { node: e.node } });
      return {
        c() {
          n.$$.fragment.c();
        },
        m(e, i) {
          Ne(n, e, i), (t = !0);
        },
        p(e, t) {
          var i = {};
          e.sortedChildrenEntries && (i.node = t.node), n.$set(i);
        },
        i(e) {
          t || (be(n.$$.fragment, e), (t = !0));
        },
        o(e) {
          we(n.$$.fragment, e), (t = !1);
        },
        d(e) {
          ke(n, e);
        }
      };
    }
    function zn(e) {
      var t,
        n,
        i = !e.node.hideFromNav && Fn(e);
      return {
        c() {
          i && i.c(), (t = E());
        },
        m(e, r) {
          i && i.m(e, r), I(e, t, r), (n = !0);
        },
        p(e, n) {
          n.node.hideFromNav
            ? i &&
              (me(),
              we(i, 1, 1, () => {
                i = null;
              }),
              ve())
            : i
            ? (i.p(e, n), be(i, 1))
            : ((i = Fn(n)).c(), be(i, 1), i.m(t.parentNode, t));
        },
        i(e) {
          n || (be(i), (n = !0));
        },
        o(e) {
          we(i), (n = !1);
        },
        d(e) {
          i && i.d(e), e && T(t);
        }
      };
    }
    function Wn(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l = e.$getTranslation(e.key) + '';
      let c = e.nodes,
        d = [];
      for (let t = 0; t < c.length; t += 1) d[t] = Jn(mn(e, c, t));
      const u = e =>
        we(d[e], 1, 1, () => {
          d[e] = null;
        });
      return {
        c() {
          (t = k('div')), (n = k('div')), (i = k('h5')), (r = $(l)), (o = P()), (a = k('ul'));
          for (let e = 0; e < d.length; e += 1) d[e].c();
          D(i, 'class', 'lui-flyout-sublist__title fd-has-type-minus-1 fd-has-color-text-4 svelte-1n63pbo'),
            D(a, 'class', 'fd-nested-list fd-nested-list--text-only svelte-1n63pbo'),
            D(n, 'class', 'lui-flyout-sublist__wrapper svelte-1n63pbo'),
            D(t, 'class', 'lui-flyout-sublist svelte-1n63pbo');
        },
        m(e, l) {
          I(e, t, l), x(t, n), x(n, i), x(i, r), x(n, o), x(n, a);
          for (let e = 0; e < d.length; e += 1) d[e].m(a, null);
          s = !0;
        },
        p(e, t) {
          if (
            ((s && !e.$getTranslation && !e.sortedChildrenEntries) ||
              l === (l = t.$getTranslation(t.key) + '') ||
              O(r, l),
            e.sortedChildrenEntries || e.getRouteLink || e.selectedNode || e.getTestId || e.$getTranslation)
          ) {
            let n;
            for (c = t.nodes, n = 0; n < c.length; n += 1) {
              const i = mn(t, c, n);
              d[n] ? (d[n].p(e, i), be(d[n], 1)) : ((d[n] = Jn(i)), d[n].c(), be(d[n], 1), d[n].m(a, null));
            }
            for (me(), n = c.length; n < d.length; n += 1) u(n);
            ve();
          }
        },
        i(e) {
          if (!s) {
            for (let e = 0; e < c.length; e += 1) be(d[e]);
            s = !0;
          }
        },
        o(e) {
          d = d.filter(fn);
          for (let e = 0; e < d.length; e += 1) we(d[e]);
          s = !1;
        },
        d(e) {
          e && T(t), N(d, e);
        }
      };
    }
    function Gn(e) {
      var t,
        n,
        i = e.node.label && Hn(e);
      return {
        c() {
          i && i.c(), (t = E());
        },
        m(e, r) {
          i && i.m(e, r), I(e, t, r), (n = !0);
        },
        p(e, n) {
          n.node.label
            ? i
              ? (i.p(e, n), be(i, 1))
              : ((i = Hn(n)).c(), be(i, 1), i.m(t.parentNode, t))
            : i &&
              (me(),
              we(i, 1, 1, () => {
                i = null;
              }),
              ve());
        },
        i(e) {
          n || (be(i), (n = !0));
        },
        o(e) {
          we(i), (n = !1);
        },
        d(e) {
          i && i.d(e), e && T(t);
        }
      };
    }
    function Hn(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c,
        d,
        u,
        f,
        p,
        h = e.$getTranslation(e.node.label) + '',
        g = e.node.externalLink && e.node.externalLink.url && qn(e),
        m = e.node.badgeCounter && Kn(e);
      function v() {
        return e.click_handler_4(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            (i = k('span')),
            (r = $(h)),
            (o = P()),
            g && g.c(),
            (a = P()),
            m && m.c(),
            (u = P()),
            D(i, 'class', 'fd-nested-list__title svelte-1n63pbo'),
            D(n, 'href', (s = e.getRouteLink(e.node))),
            D(
              n,
              'class',
              (l = 'fd-nested-list__link ' + (e.node === e.selectedNode ? 'is-selected' : '') + ' svelte-1n63pbo')
            ),
            D(n, 'data-testid', (c = ui(e.node))),
            D(n, 'title', (d = e.$getTranslation(e.node.label))),
            D(t, 'class', 'fd-nested-list__item svelte-1n63pbo'),
            (p = L(n, 'click', R(v)));
        },
        m(e, s) {
          I(e, t, s),
            x(t, n),
            x(n, i),
            x(i, r),
            x(n, o),
            g && g.m(n, null),
            x(n, a),
            m && m.m(n, null),
            x(t, u),
            (f = !0);
        },
        p(t, i) {
          (e = i),
            (f && !t.$getTranslation && !t.sortedChildrenEntries) ||
              h === (h = e.$getTranslation(e.node.label) + '') ||
              O(r, h),
            e.node.externalLink && e.node.externalLink.url
              ? g || ((g = qn(e)).c(), g.m(n, a))
              : g && (g.d(1), (g = null)),
            e.node.badgeCounter
              ? m
                ? (m.p(t, e), be(m, 1))
                : ((m = Kn(e)).c(), be(m, 1), m.m(n, null))
              : m &&
                (me(),
                we(m, 1, 1, () => {
                  m = null;
                }),
                ve()),
            (f && !t.sortedChildrenEntries) || s === (s = e.getRouteLink(e.node)) || D(n, 'href', s),
            (f && !t.sortedChildrenEntries && !t.selectedNode) ||
              l ===
                (l = 'fd-nested-list__link ' + (e.node === e.selectedNode ? 'is-selected' : '') + ' svelte-1n63pbo') ||
              D(n, 'class', l),
            (f && !t.sortedChildrenEntries) || c === (c = ui(e.node)) || D(n, 'data-testid', c),
            (f && !t.$getTranslation && !t.sortedChildrenEntries) ||
              d === (d = e.$getTranslation(e.node.label)) ||
              D(n, 'title', d);
        },
        i(e) {
          f || (be(m), (f = !0));
        },
        o(e) {
          we(m), (f = !1);
        },
        d(e) {
          e && T(t), g && g.d(), m && m.d(), p();
        }
      };
    }
    function qn(e) {
      var t;
      return {
        c() {
          D((t = k('span')), 'class', 'sap-icon--action svelte-1n63pbo');
        },
        m(e, n) {
          I(e, t, n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Kn(e) {
      var t,
        n = new un({ props: { node: e.node } });
      return {
        c() {
          n.$$.fragment.c();
        },
        m(e, i) {
          Ne(n, e, i), (t = !0);
        },
        p(e, t) {
          var i = {};
          e.sortedChildrenEntries && (i.node = t.node), n.$set(i);
        },
        i(e) {
          t || (be(n.$$.fragment, e), (t = !0));
        },
        o(e) {
          we(n.$$.fragment, e), (t = !1);
        },
        d(e) {
          ke(n, e);
        }
      };
    }
    function Jn(e) {
      var t,
        n,
        i = !e.node.hideFromNav && Gn(e);
      return {
        c() {
          i && i.c(), (t = E());
        },
        m(e, r) {
          i && i.m(e, r), I(e, t, r), (n = !0);
        },
        p(e, n) {
          n.node.hideFromNav
            ? i &&
              (me(),
              we(i, 1, 1, () => {
                i = null;
              }),
              ve())
            : i
            ? (i.p(e, n), be(i, 1))
            : ((i = Gn(n)).c(), be(i, 1), i.m(t.parentNode, t));
        },
        i(e) {
          n || (be(i), (n = !0));
        },
        o(e) {
          we(i), (n = !1);
        },
        d(e) {
          i && i.d(e), e && T(t);
        }
      };
    }
    function Yn(e) {
      var t,
        n,
        i = e.node.label && Qn(e);
      return {
        c() {
          i && i.c(), (t = E());
        },
        m(e, r) {
          i && i.m(e, r), I(e, t, r), (n = !0);
        },
        p(e, n) {
          n.node.label
            ? i
              ? (i.p(e, n), be(i, 1))
              : ((i = Qn(n)).c(), be(i, 1), i.m(t.parentNode, t))
            : i &&
              (me(),
              we(i, 1, 1, () => {
                i = null;
              }),
              ve());
        },
        i(e) {
          n || (be(i), (n = !0));
        },
        o(e) {
          we(i), (n = !1);
        },
        d(e) {
          i && i.d(e), e && T(t);
        }
      };
    }
    function Qn(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c,
        d,
        u,
        f,
        p,
        h,
        g = e.$getTranslation(e.node.label) + '';
      function m(e, t) {
        return t.node.icon ? Zn : Xn;
      }
      var v = m(0, e),
        b = v(e),
        w = e.node.externalLink && e.node.externalLink.url && ni(e),
        S = e.node.badgeCounter && ii(e);
      function y() {
        return e.click_handler(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            b.c(),
            (i = P()),
            (r = k('span')),
            (o = $(g)),
            (a = P()),
            w && w.c(),
            (s = P()),
            S && S.c(),
            (f = P()),
            D(r, 'class', 'fd-nested-list__title svelte-1n63pbo'),
            D(n, 'href', (l = e.getRouteLink(e.node))),
            D(n, 'title', (c = e.$getTranslation(e.node.label))),
            D(
              n,
              'class',
              (d = 'fd-nested-list__link ' + (e.node === e.selectedNode ? 'is-selected' : '') + ' svelte-1n63pbo')
            ),
            D(n, 'data-testid', (u = ui(e.node))),
            D(t, 'class', 'fd-nested-list__item svelte-1n63pbo'),
            (h = L(n, 'click', R(y)));
        },
        m(e, l) {
          I(e, t, l),
            x(t, n),
            b.m(n, null),
            x(n, i),
            x(n, r),
            x(r, o),
            x(n, a),
            w && w.m(n, null),
            x(n, s),
            S && S.m(n, null),
            x(t, f),
            (p = !0);
        },
        p(t, r) {
          v === (v = m(0, (e = r))) && b ? b.p(t, e) : (b.d(1), (b = v(e)) && (b.c(), b.m(n, i))),
            (p && !t.$getTranslation && !t.sortedChildrenEntries) ||
              g === (g = e.$getTranslation(e.node.label) + '') ||
              O(o, g),
            e.node.externalLink && e.node.externalLink.url
              ? w || ((w = ni(e)).c(), w.m(n, s))
              : w && (w.d(1), (w = null)),
            e.node.badgeCounter
              ? S
                ? (S.p(t, e), be(S, 1))
                : ((S = ii(e)).c(), be(S, 1), S.m(n, null))
              : S &&
                (me(),
                we(S, 1, 1, () => {
                  S = null;
                }),
                ve()),
            (p && !t.sortedChildrenEntries) || l === (l = e.getRouteLink(e.node)) || D(n, 'href', l),
            (p && !t.$getTranslation && !t.sortedChildrenEntries) ||
              c === (c = e.$getTranslation(e.node.label)) ||
              D(n, 'title', c),
            (p && !t.sortedChildrenEntries && !t.selectedNode) ||
              d ===
                (d = 'fd-nested-list__link ' + (e.node === e.selectedNode ? 'is-selected' : '') + ' svelte-1n63pbo') ||
              D(n, 'class', d),
            (p && !t.sortedChildrenEntries) || u === (u = ui(e.node)) || D(n, 'data-testid', u);
        },
        i(e) {
          p || (be(S), (p = !0));
        },
        o(e) {
          we(S), (p = !1);
        },
        d(e) {
          e && T(t), b.d(), w && w.d(), S && S.d(), h();
        }
      };
    }
    function Xn(e) {
      var t, n;
      return {
        c() {
          D(
            (t = k('span')),
            'class',
            (n =
              'fd-nested-list__icon ' + (e.isSemiCollapsed ? 'sap-icon--rhombus-milestone-2' : '') + ' svelte-1n63pbo')
          );
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          e.isSemiCollapsed &&
            n !==
              (n =
                'fd-nested-list__icon ' +
                (i.isSemiCollapsed ? 'sap-icon--rhombus-milestone-2' : '') +
                ' svelte-1n63pbo') &&
            D(t, 'class', n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Zn(e) {
      var t, n;
      function i(e, n) {
        return (null == t || e.sortedChildrenEntries) && (t = !!ci(n.node.icon)), t ? ti : ei;
      }
      var r = i(null, e),
        o = r(e);
      return {
        c() {
          o.c(), (n = E());
        },
        m(e, t) {
          o.m(e, t), I(e, n, t);
        },
        p(e, t) {
          r === (r = i(e, t)) && o ? o.p(e, t) : (o.d(1), (o = r(t)) && (o.c(), o.m(n.parentNode, n)));
        },
        d(e) {
          o.d(e), e && T(n);
        }
      };
    }
    function ei(e) {
      var t, n, i, r;
      return {
        c() {
          (t = k('span')),
            D((n = k('img')), 'src', (i = e.node.icon)),
            D(n, 'alt', (r = e.node.altText ? e.node.altText : '')),
            D(n, 'class', 'svelte-1n63pbo'),
            D(t, 'class', 'fd-nested-list__icon svelte-1n63pbo');
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, t) {
          e.sortedChildrenEntries && i !== (i = t.node.icon) && D(n, 'src', i),
            e.sortedChildrenEntries && r !== (r = t.node.altText ? t.node.altText : '') && D(n, 'alt', r);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function ti(e) {
      var t, n;
      return {
        c() {
          D((t = k('span')), 'class', (n = 'fd-nested-list__icon sap-icon--' + e.node.icon + ' svelte-1n63pbo'));
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          e.sortedChildrenEntries &&
            n !== (n = 'fd-nested-list__icon sap-icon--' + i.node.icon + ' svelte-1n63pbo') &&
            D(t, 'class', n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function ni(e) {
      var t;
      return {
        c() {
          D((t = k('span')), 'class', 'sap-icon--action svelte-1n63pbo');
        },
        m(e, n) {
          I(e, t, n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function ii(e) {
      var t,
        n = new un({ props: { node: e.node } });
      return {
        c() {
          n.$$.fragment.c();
        },
        m(e, i) {
          Ne(n, e, i), (t = !0);
        },
        p(e, t) {
          var i = {};
          e.sortedChildrenEntries && (i.node = t.node), n.$set(i);
        },
        i(e) {
          t || (be(n.$$.fragment, e), (t = !0));
        },
        o(e) {
          we(n.$$.fragment, e), (t = !1);
        },
        d(e) {
          ke(n, e);
        }
      };
    }
    function ri(e) {
      var t,
        n,
        i = !e.node.hideFromNav && Yn(e);
      return {
        c() {
          i && i.c(), (t = E());
        },
        m(e, r) {
          i && i.m(e, r), I(e, t, r), (n = !0);
        },
        p(e, n) {
          n.node.hideFromNav
            ? i &&
              (me(),
              we(i, 1, 1, () => {
                i = null;
              }),
              ve())
            : i
            ? (i.p(e, n), be(i, 1))
            : ((i = Yn(n)).c(), be(i, 1), i.m(t.parentNode, t));
        },
        i(e) {
          n || (be(i), (n = !0));
        },
        o(e) {
          we(i), (n = !1);
        },
        d(e) {
          i && i.d(e), e && T(t);
        }
      };
    }
    function oi(e) {
      var t,
        n,
        i,
        r,
        o,
        a = [_n, yn],
        s = [];
      function l(e, n) {
        return (
          (null == t || e.sortedChildrenEntries || e.virtualGroupPrefix) &&
            (t = !('undefined' !== n.key && !n.key.startsWith(n.virtualGroupPrefix))),
          t ? 0 : 1
        );
      }
      return (
        (n = l(null, e)),
        (i = s[n] = a[n](e)),
        {
          c() {
            i.c(), (r = E());
          },
          m(e, t) {
            s[n].m(e, t), I(e, r, t), (o = !0);
          },
          p(e, t) {
            var o = n;
            (n = l(e, t)) === o
              ? s[n].p(e, t)
              : (me(),
                we(s[o], 1, 1, () => {
                  s[o] = null;
                }),
                ve(),
                (i = s[n]) || (i = s[n] = a[n](t)).c(),
                be(i, 1),
                i.m(r.parentNode, r));
          },
          i(e) {
            o || (be(i), (o = !0));
          },
          o(e) {
            we(i), (o = !1);
          },
          d(e) {
            s[n].d(e), e && T(r);
          }
        }
      );
    }
    function ai(e) {
      var t,
        n,
        i,
        r,
        o,
        a = e.footerText ? e.footerText : '',
        s = e.semiCollapsibleButton && si(e);
      return {
        c() {
          (t = k('div')),
            (n = k('span')),
            (i = k('span')),
            (r = $(a)),
            (o = P()),
            s && s.c(),
            D(i, 'class', 'lui-side-nav__footer--text fd-has-type-minus-1 svelte-1n63pbo'),
            D(n, 'class', 'lui-side-nav__footer svelte-1n63pbo'),
            D(t, 'class', 'fd-side-nav__utility svelte-1n63pbo');
        },
        m(e, a) {
          I(e, t, a), x(t, n), x(n, i), x(i, r), x(n, o), s && s.m(n, null);
        },
        p(e, t) {
          e.footerText && a !== (a = t.footerText ? t.footerText : '') && O(r, a),
            t.semiCollapsibleButton ? (s ? s.p(e, t) : ((s = si(t)).c(), s.m(n, null))) : s && (s.d(1), (s = null));
        },
        d(e) {
          e && T(t), s && s.d();
        }
      };
    }
    function si(e) {
      var t, n, i;
      return {
        c() {
          D(
            (t = k('span')),
            'class',
            (n =
              'lui-side-nav__footer--icon ' +
              (e.isSemiCollapsed ? 'sap-icon--open-command-field' : 'sap-icon--close-command-field') +
              ' svelte-1n63pbo')
          ),
            D(t, 'data-testid', 'semiCollapsibleButton'),
            (i = L(t, 'click', e.click_handler_7));
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          e.isSemiCollapsed &&
            n !==
              (n =
                'lui-side-nav__footer--icon ' +
                (i.isSemiCollapsed ? 'sap-icon--open-command-field' : 'sap-icon--close-command-field') +
                ' svelte-1n63pbo') &&
            D(t, 'class', n);
        },
        d(e) {
          e && T(t), i();
        }
      };
    }
    function li(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c = e.children && e.pathData.length > 1 && Sn(e),
        d = (e.footerText || e.semiCollapsibleButton) && ai(e);
      return {
        c() {
          (t = k('div')),
            (n = k('nav')),
            c && c.c(),
            (i = P()),
            d && d.c(),
            D(
              n,
              'class',
              (r = 'fd-side-nav ' + (e.isSemiCollapsed ? 'fd-side-nav--condensed' : '') + ' svelte-1n63pbo')
            ),
            D(
              t,
              'class',
              (o =
                'fd-app__sidebar ' +
                (e.hideNavComponent ? 'hideNavComponent' : '') +
                ' ' +
                (e.footerText || e.semiCollapsibleButton ? 'hasFooter' : '') +
                ' ' +
                (e.footerText && !e.semiCollapsibleButton ? 'hasOnlyFooterText' : '') +
                ' svelte-1n63pbo')
            ),
            (s = [
              L(hn, 'resize', e.onResize),
              L(hn, 'click', e.closePopupMenu),
              L(hn, 'blur', e.closePopupMenu),
              L(n, 'keyup', hi)
            ]);
        },
        m(e, r) {
          I(e, t, r), x(t, n), c && c.m(n, null), x(n, i), d && d.m(n, null), (a = !0);
        },
        p(e, s) {
          s.children && s.pathData.length > 1
            ? c
              ? (c.p(e, s), be(c, 1))
              : ((c = Sn(s)).c(), be(c, 1), c.m(n, i))
            : c &&
              (me(),
              we(c, 1, 1, () => {
                c = null;
              }),
              ve()),
            s.footerText || s.semiCollapsibleButton
              ? d
                ? d.p(e, s)
                : ((d = ai(s)).c(), d.m(n, null))
              : d && (d.d(1), (d = null)),
            (a && !e.isSemiCollapsed) ||
              r === (r = 'fd-side-nav ' + (s.isSemiCollapsed ? 'fd-side-nav--condensed' : '') + ' svelte-1n63pbo') ||
              D(n, 'class', r),
            (!a || e.hideNavComponent || e.footerText || e.semiCollapsibleButton) &&
              o !==
                (o =
                  'fd-app__sidebar ' +
                  (s.hideNavComponent ? 'hideNavComponent' : '') +
                  ' ' +
                  (s.footerText || s.semiCollapsibleButton ? 'hasFooter' : '') +
                  ' ' +
                  (s.footerText && !s.semiCollapsibleButton ? 'hasOnlyFooterText' : '') +
                  ' svelte-1n63pbo') &&
              D(t, 'class', o);
        },
        i(e) {
          a || (be(c), (a = !0));
        },
        o(e) {
          we(c), (a = !1);
        },
        d(e) {
          e && T(t), c && c.d(), d && d.d(), l(s);
        }
      };
    }
    function ci(e) {
      return xt.isOpenUIiconName(e);
    }
    function di(e, t) {
      return t && t.indexOf(e.metaInfo.categoryUid) >= 0;
    }
    function ui(e) {
      return e.testId ? e.testId : xt.prepareForTests(e.pathSegment, e.label);
    }
    function fi(e, t) {
      return e && e.testId ? e.testId : xt.prepareForTests(t || e.label);
    }
    function pi(e) {
      const t = e.closest('.fd-nested-list__item'),
        n = t.offsetTop,
        i = tt.getShellbar().offsetHeight;
      let r;
      (r = tt.isCustomLuigiContainer() ? tt.getCustomLuigiContainer().clientHeight : window.innerHeight),
        setTimeout(() => {
          const o = t.getElementsByClassName('lui-flyout-sublist')[0],
            a = e.closest('.lui-fd-side-nav-wrapper').scrollTop,
            s = n + i - a,
            l = r - n - t.offsetHeight + a - i;
          s + o.offsetHeight >= r
            ? ((o.style.bottom = l + 'px'), (o.className += ' has-bottom-position'))
            : (o.style.top = s - i + 'px');
        });
    }
    function hi(e) {
      if ('ArrowRight' === e.code) {
        const e = Ct.getCurrentMicrofrontendIframe();
        e && e.contentWindow && e.contentWindow.focus();
      }
    }
    function gi(e, t, n) {
      let i;
      const r = () => ({
          children: d,
          hideNavComponent: u,
          footerText: f,
          semiCollapsible: h,
          pathData: m,
          virtualGroupPrefix: b,
          isSemiCollapsed: w,
          selectedNode: S,
          selectedCategory: y,
          expandedCategories: _,
          hasCategoriesWithIcon: C
        }),
        o = e => {
          e &&
            Object.getOwnPropertyNames(e).forEach(t => {
              'pathData' === t
                ? n('pathData', (m = e.pathData))
                : 'context' === t
                ? (l = e.context)
                : 'children' === t
                ? n('children', (d = e.children))
                : 'selectedNode' === t
                ? n('selectedNode', (S = e.selectedNode))
                : 'hasCategoriesWithIcon' === t && n('hasCategoriesWithIcon', (C = e.hasCategoriesWithIcon));
            });
        },
        a = Y();
      let s,
        l,
        c,
        {
          children: d,
          hideNavComponent: u,
          footerText: f,
          semiCollapsible: h,
          semiCollapsibleButton: g,
          pathData: m,
          pathParams: v
        } = t,
        {
          virtualGroupPrefix: b = xt.virtualGroupPrefix,
          isSemiCollapsed: w,
          selectedNode: S,
          selectedCategory: y = null,
          expandedCategories: _,
          hasCategoriesWithIcon: C,
          sideNavClass: x
        } = t,
        I = X('store'),
        T = X('getTranslation');
      p(e, T, e => {
        n('$getTranslation', (i = e));
      });
      const N = async () => {
        const e = r(),
          t = await dt.getLeftNavData({ ...e }, e);
        t && (o(t), (s = m), (window.LEFTNAVDATA = t.children));
      };
      q(() => {
        n('semiCollapsibleButton', (g = 'semiCollapsible' === Ze.getConfigValue('settings.responsiveNavigation'))),
          n('hideNavComponent', (u = Ze.getConfigBooleanValue('settings.hideNavigation'))),
          (c = Ze.getConfigBooleanValue('settings.sideNavCompactMode')),
          n('expandedCategories', (_ = xt.loadExpandedCategories())),
          Tt.doOnStoreChange(
            I,
            () => {
              n('footerText', (f = Ze.getConfigValue('settings.sideNavFooterText')));
            },
            ['settings.footer']
          ),
          Boolean(c)
            ? n('sideNavClass', (x = 'fd-nested-list fd-nested-list--compact'))
            : n('sideNavClass', (x = 'fd-nested-list'));
        let e = nn.initial();
        n('isSemiCollapsed', (w = e.isSemiCollapsed)),
          n('semiCollapsible', (h = e.semiCollapsible)),
          nn.onValueChanged(e => {
            n('isSemiCollapsed', (w = e.isSemiCollapsed));
          }),
          Nt.addEventListener('message', e => {
            'luigi.navigation.update-badge-counters' === e.data.msg && N();
          });
      }),
        H(() => {
          (s && s == m) || N();
        });
      let { sortedChildrenEntries: k } = t;
      function $(e) {
        a('handleClick', { node: e });
      }
      function P(e, t) {
        if (nn.getCollapsed()) {
          let i,
            r = document.getElementsByClassName('fd-app__sidebar')[0];
          if (
            ((i = e.metaInfo && e.metaInfo.label ? e.metaInfo.label : (e.category && e.category.label) || e.category),
            r.classList.contains('isBlocked') || (r.className += ' isBlocked'),
            i === y)
          )
            return void n('selectedCategory', (y = nn.closePopupMenu(y)));
          n('selectedCategory', (y = i)), pi(t);
        }
      }
      function E(e, t) {
        nn.getCollapsed() || n('expandedCategories', (_ = xt.storeExpandedState(e.metaInfo.categoryUid, t)));
      }
      function L(e) {
        n('isSemiCollapsed', (w = nn.buttonClicked())),
          document.getElementsByClassName('fd-tabs').length > 0 && a('resizeTabNav', {});
      }
      return (
        (e.$set = e => {
          'children' in e && n('children', (d = e.children)),
            'hideNavComponent' in e && n('hideNavComponent', (u = e.hideNavComponent)),
            'footerText' in e && n('footerText', (f = e.footerText)),
            'semiCollapsible' in e && n('semiCollapsible', (h = e.semiCollapsible)),
            'semiCollapsibleButton' in e && n('semiCollapsibleButton', (g = e.semiCollapsibleButton)),
            'pathData' in e && n('pathData', (m = e.pathData)),
            'pathParams' in e && n('pathParams', (v = e.pathParams)),
            'virtualGroupPrefix' in e && n('virtualGroupPrefix', (b = e.virtualGroupPrefix)),
            'isSemiCollapsed' in e && n('isSemiCollapsed', (w = e.isSemiCollapsed)),
            'selectedNode' in e && n('selectedNode', (S = e.selectedNode)),
            'selectedCategory' in e && n('selectedCategory', (y = e.selectedCategory)),
            'expandedCategories' in e && n('expandedCategories', (_ = e.expandedCategories)),
            'hasCategoriesWithIcon' in e && n('hasCategoriesWithIcon', (C = e.hasCategoriesWithIcon)),
            'sideNavClass' in e && n('sideNavClass', (x = e.sideNavClass)),
            'sortedChildrenEntries' in e && n('sortedChildrenEntries', (k = e.sortedChildrenEntries));
        }),
        (e.$$.update = (e = { children: 1 }) => {
          if (e.children && d) {
            const e = Object.entries(d);
            e.sort((e, t) => e[1].metaInfo.order - t[1].metaInfo.order), n('sortedChildrenEntries', (k = e));
          }
        }),
        {
          children: d,
          hideNavComponent: u,
          footerText: f,
          semiCollapsible: h,
          semiCollapsibleButton: g,
          pathData: m,
          pathParams: v,
          virtualGroupPrefix: b,
          isSemiCollapsed: w,
          selectedNode: S,
          selectedCategory: y,
          expandedCategories: _,
          hasCategoriesWithIcon: C,
          sideNavClass: x,
          getTranslation: T,
          sortedChildrenEntries: k,
          getRouteLink: function(e) {
            return It.getNodeHref(e, v);
          },
          handleClick: $,
          handleIconClick: P,
          onResize: function() {
            if (h) {
              let e = nn.onResize(y);
              n('isSemiCollapsed', (w = e.isSemiCollapsed)), n('selectedCategory', (y = e.selectedCategory));
            }
          },
          setExpandedState: E,
          closePopupMenu: function() {
            n('selectedCategory', (y = nn.closePopupMenu(y)));
          },
          semiCollapsibleButtonClicked: L,
          $getTranslation: i,
          click_handler: ({ node: e }) => $(e),
          click_handler_1: ({ nodes: e }) => E(e, !di(e, _)),
          click_handler_2: ({ nodes: e }) => E(e, !di(e, _)),
          click_handler_3: ({ node: e }) => $(e),
          click_handler_4: ({ node: e }) => $(e),
          click_handler_5: ({ nodes: e }) => P(e, event.currentTarget),
          click_handler_6: ({ node: e }) => $(e),
          click_handler_7: () => L()
        }
      );
    }
    var mi = class extends Pe {
      constructor(e) {
        super(),
          $e(this, e, gi, li, d, [
            'children',
            'hideNavComponent',
            'footerText',
            'semiCollapsible',
            'semiCollapsibleButton',
            'pathData',
            'pathParams',
            'virtualGroupPrefix',
            'isSemiCollapsed',
            'selectedNode',
            'selectedCategory',
            'expandedCategories',
            'hasCategoriesWithIcon',
            'sideNavClass',
            'sortedChildrenEntries',
            'handleClick',
            'handleIconClick',
            'calculateFlyoutPosition',
            'onResize',
            'handleKey',
            'setExpandedState',
            'closePopupMenu'
          ]);
      }
      get handleClick() {
        return this.$$.ctx.handleClick;
      }
      get handleIconClick() {
        return this.$$.ctx.handleIconClick;
      }
      get calculateFlyoutPosition() {
        return pi;
      }
      get onResize() {
        return this.$$.ctx.onResize;
      }
      get handleKey() {
        return hi;
      }
      get setExpandedState() {
        return this.$$.ctx.setExpandedState;
      }
      get closePopupMenu() {
        return this.$$.ctx.closePopupMenu;
      }
    };
    const vi = e => {
        Tt.doOnStoreChange(
          e.store,
          () => {
            const t = Ze.getConfigValue('navigation.appSwitcher');
            return (
              t && (e.set({ appSwitcherItems: t.items }), e.set({ showMainAppEntry: t.showMainAppEntry })),
              e.set({
                hasApps: e.get().showMainAppEntry || (e.get().appSwitcherItems && e.get().appSwitcherItems.length > 0)
              }),
              Ze.getConfigValueAsync('settings.header').then(t => {
                if (!t) return;
                t.title &&
                  (e.set({ defaultTitle: t.title || '' }), e.set({ defaultSubTitle: t.subTitle || '' }), bi(e));
                const n = Boolean(t.logo);
                if (
                  (e.set({ hasLogo: n }),
                  setTimeout(() => {
                    n && e.get().logo && ((e.get().logo.src = t.logo), t.altText && (e.get().logo.alt = t.altText));
                  }),
                  t.favicon)
                ) {
                  !t.favicon.split('?')[0].endsWith('.ico') &&
                    !t.favicon.startsWith('data:image') &&
                    console.warn('Favicon is not an .ico filetype and might get displayed wrong.');
                  const e = Object.assign(document.createElement('link'), {
                      type: 'image/x-icon',
                      rel: 'shortcut icon',
                      href: t.favicon
                    }),
                    n = document.getElementsByTagName('head')[0];
                  for (const e of n.childNodes) 'shortcut icon' === e.rel && e.remove();
                  n.appendChild(e);
                }
              })
            );
          },
          ['settings.header']
        );
      },
      bi = e => {
        const t = e.get().appSwitcherItems,
          n = e.get().pathData,
          i = e.get().pathParams;
        let r;
        t &&
          n &&
          [...t]
            .sort((e, t) => (t.link || '').localeCompare(e.link || ''))
            .some(e => {
              let t = !0;
              return (
                _t
                  .trimTrailingSlash(_t.trimLeadingSlash(e.link))
                  .split('/')
                  .forEach((e, r) => {
                    t &&
                      (r + 1 >= n.length
                        ? (t = !1)
                        : (n[r + 1].pathSegment &&
                            ((e, t, n) => e === t || !(!t.startsWith(':') || !n || n[t.substr(1)] !== e))(
                              e,
                              n[r + 1].pathSegment,
                              i
                            )) ||
                          (t = !1));
                  }),
                t && (r = e),
                t
              );
            }),
          e.set({ selectedItem: r });
        const o = r && r.title ? r.title : e.get().defaultTitle,
          a = it.getDocumentTitle() || o;
        e.set({ title: o }), (document.title = nt.getTranslation(a));
        const s = r ? r.subTitle || '' : e.get().defaultSubTitle;
        e.set({ subTitle: s });
      };
    n(394);
    const { Object: wi } = xe;
    function Si(e, t, n) {
      const i = wi.create(e);
      return (i.item = t[n]), i;
    }
    function yi(e) {
      var t, n;
      return {
        c() {
          D((t = k('img')), 'data-testid', 'luigi-topnav-logo'),
            D(t, 'alt', ''),
            D(t, 'class', 'svelte-1wb6qrg'),
            (n = L(t, 'click', e.click_handler));
        },
        m(n, i) {
          I(n, t, i), e.img_binding(t);
        },
        p: i,
        d(i) {
          i && T(t), e.img_binding(null), n();
        }
      };
    }
    function _i(e) {
      var t, n;
      function i(e, t) {
        return t.hasApps ? Ci : xi;
      }
      var r = i(0, e),
        o = r(e),
        a = e.subTitle && $i(e);
      return {
        c() {
          o.c(), (t = P()), a && a.c(), (n = E());
        },
        m(e, i) {
          o.m(e, i), I(e, t, i), a && a.m(e, i), I(e, n, i);
        },
        p(e, s) {
          r === (r = i(0, s)) && o ? o.p(e, s) : (o.d(1), (o = r(s)) && (o.c(), o.m(t.parentNode, t))),
            s.subTitle ? (a ? a.p(e, s) : ((a = $i(s)).c(), a.m(n.parentNode, n))) : a && (a.d(1), (a = null));
        },
        d(e) {
          o.d(e), e && T(t), a && a.d(e), e && T(n);
        }
      };
    }
    function Ci(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d,
        u,
        f,
        p,
        h,
        g = e.$getTranslation(e.title) + '',
        m = e.showMainAppEntry && e.selectedItem && Ii(e),
        v = e.appSwitcherItems && e.appSwitcherItems.length > 0 && Ti(e);
      return {
        c() {
          (t = k('div')),
            (n = k('div')),
            (i = k('button')),
            (r = k('div')),
            (o = $(g)),
            (s = P()),
            (c = k('div')),
            (d = k('nav')),
            (u = k('ul')),
            m && m.c(),
            (f = P()),
            v && v.c(),
            D(r, 'class', 'fd-shellbar__title svelte-1wb6qrg'),
            D(r, 'data-testid', 'luigi-topnav-title'),
            D(i, 'class', 'fd-button fd-shellbar__button--menu fd-button--transparent fd-button--menu'),
            D(i, 'aria-haspopup', 'true'),
            D(i, 'aria-expanded', (a = e.dropDownStates.appSwitcherPopover || !1)),
            D(i, 'data-testid', 'app-switcher'),
            D(n, 'class', 'fd-popover__control'),
            D(u, 'class', 'fd-menu__list fd-menu__list--no-shadow'),
            D(d, 'class', 'fd-menu'),
            D(c, 'class', 'fd-popover__body fd-popover__body--left'),
            D(c, 'aria-hidden', (p = !e.dropDownStates.appSwitcherPopover)),
            D(c, 'id', 'appSwitcherPopover'),
            D(t, 'class', 'fd-popover fd-popover--left'),
            (h = [L(i, 'click', A(e.click_handler_2)), L(n, 'click', A(Ai))]);
        },
        m(e, a) {
          I(e, t, a),
            x(t, n),
            x(n, i),
            x(i, r),
            x(r, o),
            x(t, s),
            x(t, c),
            x(c, d),
            x(d, u),
            m && m.m(u, null),
            x(u, f),
            v && v.m(u, null);
        },
        p(e, t) {
          (e.$getTranslation || e.title) && g !== (g = t.$getTranslation(t.title) + '') && O(o, g),
            e.dropDownStates && a !== (a = t.dropDownStates.appSwitcherPopover || !1) && D(i, 'aria-expanded', a),
            t.showMainAppEntry && t.selectedItem
              ? m
                ? m.p(e, t)
                : ((m = Ii(t)).c(), m.m(u, f))
              : m && (m.d(1), (m = null)),
            t.appSwitcherItems && t.appSwitcherItems.length > 0
              ? v
                ? v.p(e, t)
                : ((v = Ti(t)).c(), v.m(u, null))
              : v && (v.d(1), (v = null)),
            e.dropDownStates && p !== (p = !t.dropDownStates.appSwitcherPopover) && D(c, 'aria-hidden', p);
        },
        d(e) {
          e && T(t), m && m.d(), v && v.d(), l(h);
        }
      };
    }
    function xi(e) {
      var t,
        n,
        i,
        r = e.$getTranslation(e.title) + '';
      return {
        c() {
          (t = k('div')),
            (n = $(r)),
            D(t, 'class', 'fd-shellbar__title svelte-1wb6qrg'),
            D(t, 'data-testid', 'luigi-topnav-title'),
            (i = L(t, 'click', e.click_handler_1));
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, t) {
          (e.$getTranslation || e.title) && r !== (r = t.$getTranslation(t.title) + '') && O(n, r);
        },
        d(e) {
          e && T(t), i();
        }
      };
    }
    function Ii(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s = e.$getTranslation(e.defaultTitle) + '';
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            (i = k('span')),
            (r = $(s)),
            D(i, 'class', 'fd-menu__title'),
            D(n, 'role', 'button'),
            D(n, 'class', 'fd-menu__link'),
            D(n, 'href', '/'),
            D(n, 'data-testid', (o = Ei(e.defaultTitle))),
            D(t, 'class', 'fd-menu__item'),
            (a = L(n, 'click', R(e.goToRoot)));
        },
        m(e, o) {
          I(e, t, o), x(t, n), x(n, i), x(i, r);
        },
        p(e, t) {
          (e.$getTranslation || e.defaultTitle) && s !== (s = t.$getTranslation(t.defaultTitle) + '') && O(r, s),
            e.defaultTitle && o !== (o = Ei(t.defaultTitle)) && D(n, 'data-testid', o);
        },
        d(e) {
          e && T(t), a();
        }
      };
    }
    function Ti(e) {
      var t;
      let n = e.appSwitcherItems,
        i = [];
      for (let t = 0; t < n.length; t += 1) i[t] = ki(Si(e, n, t));
      return {
        c() {
          for (let e = 0; e < i.length; e += 1) i[e].c();
          t = E();
        },
        m(e, n) {
          for (let t = 0; t < i.length; t += 1) i[t].m(e, n);
          I(e, t, n);
        },
        p(e, r) {
          if (
            e.appSwitcherItems ||
            e.selectedItem ||
            e.hasValidLink ||
            e.pathParams ||
            e.getRouteLink ||
            e.getTestId ||
            e.$getTranslation
          ) {
            let o;
            for (n = r.appSwitcherItems, o = 0; o < n.length; o += 1) {
              const a = Si(r, n, o);
              i[o] ? i[o].p(e, a) : ((i[o] = ki(a)), i[o].c(), i[o].m(t.parentNode, t));
            }
            for (; o < i.length; o += 1) i[o].d(1);
            i.length = n.length;
          }
        },
        d(e) {
          N(i, e), e && T(t);
        }
      };
    }
    function Ni(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c = e.$getTranslation(e.item.title) + '';
      function d() {
        return e.click_handler_4(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            (i = k('span')),
            (r = $(c)),
            (s = P()),
            D(i, 'class', 'fd-menu__title'),
            D(n, 'role', 'button'),
            D(n, 'class', 'fd-menu__link'),
            D(n, 'href', (o = Ri(e.item, e.pathParams))),
            D(n, 'data-testid', (a = Ei(e.item))),
            D(t, 'class', 'fd-menu__item'),
            (l = L(n, 'click', R(d)));
        },
        m(e, o) {
          I(e, t, o), x(t, n), x(n, i), x(i, r), x(t, s);
        },
        p(t, i) {
          (e = i),
            (t.$getTranslation || t.appSwitcherItems) && c !== (c = e.$getTranslation(e.item.title) + '') && O(r, c),
            (t.appSwitcherItems || t.pathParams) && o !== (o = Ri(e.item, e.pathParams)) && D(n, 'href', o),
            t.appSwitcherItems && a !== (a = Ei(e.item)) && D(n, 'data-testid', a);
        },
        d(e) {
          e && T(t), l();
        }
      };
    }
    function ki(e) {
      var t,
        n = e.item !== e.selectedItem && Li(e.item, e.pathParams),
        i = n && Ni(e);
      return {
        c() {
          i && i.c(), (t = E());
        },
        m(e, n) {
          i && i.m(e, n), I(e, t, n);
        },
        p(e, r) {
          (e.appSwitcherItems || e.selectedItem || e.pathParams) &&
            (n = r.item !== r.selectedItem && Li(r.item, r.pathParams)),
            n ? (i ? i.p(e, r) : ((i = Ni(r)).c(), i.m(t.parentNode, t))) : i && (i.d(1), (i = null));
        },
        d(e) {
          i && i.d(e), e && T(t);
        }
      };
    }
    function $i(e) {
      var t,
        n,
        i = e.$getTranslation(e.subTitle) + '';
      return {
        c() {
          (t = k('div')), (n = $(i)), D(t, 'class', 'fd-shellbar__subtitle svelte-1wb6qrg');
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, t) {
          (e.$getTranslation || e.subTitle) && i !== (i = t.$getTranslation(t.subTitle) + '') && O(n, i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Pi(e) {
      var t,
        n,
        r,
        o,
        a = e.hasLogo && yi(e),
        s = e.title && _i(e);
      return {
        c() {
          (t = k('div')),
            a && a.c(),
            (r = P()),
            s && s.c(),
            (o = E()),
            D(
              t,
              'class',
              (n =
                'fd-shellbar__logo ' +
                (e.hasLogo ? '' : 'fd-shellbar__logo--image-replaced') +
                ' ' +
                (e.hasLogo ? 'lui-customlogo' : '') +
                ' svelte-1wb6qrg')
            ),
            D(t, 'aria-label', 'SAP');
        },
        m(e, n) {
          I(e, t, n), a && a.m(t, null), I(e, r, n), s && s.m(e, n), I(e, o, n);
        },
        p(e, i) {
          i.hasLogo ? (a ? a.p(e, i) : ((a = yi(i)).c(), a.m(t, null))) : a && (a.d(1), (a = null)),
            e.hasLogo &&
              n !==
                (n =
                  'fd-shellbar__logo ' +
                  (i.hasLogo ? '' : 'fd-shellbar__logo--image-replaced') +
                  ' ' +
                  (i.hasLogo ? 'lui-customlogo' : '') +
                  ' svelte-1wb6qrg') &&
              D(t, 'class', n),
            i.title ? (s ? s.p(e, i) : ((s = _i(i)).c(), s.m(o.parentNode, o))) : s && (s.d(1), (s = null));
        },
        i: i,
        o: i,
        d(e) {
          e && T(t), a && a.d(), e && T(r), s && s.d(e), e && T(o);
        }
      };
    }
    function Ei(e) {
      return e.testId ? e.testId : xt.prepareForTests(e.title || e);
    }
    function Li(e, t) {
      if (e.link) {
        const n = It.applyPathParams(e.link, t);
        if (0 !== n.indexOf(':') && -1 === n.indexOf('/:')) return !0;
      }
      return !1;
    }
    function Ri(e) {
      return It.getNodeHref(e);
    }
    const Ai = () => {};
    function Di(e, t, n) {
      let i;
      const r = Y();
      let o,
        {
          logo: a,
          hasLogo: s,
          title: l,
          hasApps: c,
          dropDownStates: d = {},
          showMainAppEntry: u,
          selectedItem: f,
          defaultTitle: h,
          appSwitcherItems: g,
          pathParams: m,
          subTitle: v,
          defaultSubTitle: b,
          pathData: w
        } = t,
        S = X('getUnsavedChangesModalPromise'),
        y = X('getTranslation');
      p(e, y, e => {
        n('$getTranslation', (i = e));
      });
      let _ = X('store');
      const C = () => ({
        get: () => ({
          pathData: w,
          pathParams: m,
          appSwitcherItems: g,
          selectedItem: f,
          defaultTitle: h,
          title: l,
          subTitle: v,
          defaultSubTitle: b,
          showMainAppEntry: u,
          hasApps: c,
          hasLogo: s,
          logo: a
        }),
        set: e => {
          e &&
            Object.getOwnPropertyNames(e).forEach(t => {
              'pathData' === t
                ? n('pathData', (w = e.pathData))
                : 'appSwitcherItems' === t
                ? n('appSwitcherItems', (g = e.appSwitcherItems))
                : 'pathParams' === t
                ? n('pathParams', (m = e.pathParams))
                : 'selectedItem' === t
                ? n('selectedItem', (f = e.selectedItem))
                : 'title' === t
                ? n('title', (l = e.title))
                : 'defaultSubTitle' === t
                ? n('defaultSubTitle', (b = e.defaultSubTitle))
                : 'subTitle' === t
                ? n('subTitle', (v = e.subTitle))
                : 'defaultTitle' === t
                ? n('defaultTitle', (h = e.defaultTitle))
                : 'subTitle' === t
                ? n('subTitle', (v = e.subTitle))
                : 'showMainAppEntry' === t
                ? n('showMainAppEntry', (u = e.showMainAppEntry))
                : 'hasApps' === t
                ? n('hasApps', (c = e.hasApps))
                : 'hasLogo' === t && n('hasLogo', (s = e.hasLogo));
            });
        },
        store: _
      });
      function x(e) {
        S().then(() => {
          ht.navigateTo(It.applyPathParams(e, m));
        });
      }
      function I(e) {
        r('toggleDropdownState', { name: e });
      }
      q(() => {
        vi(C());
      }),
        H(() => {
          (o && o == w) || (bi(C()), (o = w));
        });
      return (
        (e.$set = e => {
          'logo' in e && n('logo', (a = e.logo)),
            'hasLogo' in e && n('hasLogo', (s = e.hasLogo)),
            'title' in e && n('title', (l = e.title)),
            'hasApps' in e && n('hasApps', (c = e.hasApps)),
            'dropDownStates' in e && n('dropDownStates', (d = e.dropDownStates)),
            'showMainAppEntry' in e && n('showMainAppEntry', (u = e.showMainAppEntry)),
            'selectedItem' in e && n('selectedItem', (f = e.selectedItem)),
            'defaultTitle' in e && n('defaultTitle', (h = e.defaultTitle)),
            'appSwitcherItems' in e && n('appSwitcherItems', (g = e.appSwitcherItems)),
            'pathParams' in e && n('pathParams', (m = e.pathParams)),
            'subTitle' in e && n('subTitle', (v = e.subTitle)),
            'defaultSubTitle' in e && n('defaultSubTitle', (b = e.defaultSubTitle)),
            'pathData' in e && n('pathData', (w = e.pathData));
        }),
        {
          logo: a,
          hasLogo: s,
          title: l,
          hasApps: c,
          dropDownStates: d,
          showMainAppEntry: u,
          selectedItem: f,
          defaultTitle: h,
          appSwitcherItems: g,
          pathParams: m,
          subTitle: v,
          defaultSubTitle: b,
          pathData: w,
          getTranslation: y,
          goTo: x,
          goToRoot: function() {
            S().then(() => {
              ht.navigateTo('/');
            });
          },
          handleClick: function(e) {
            r('handleClick', { node: e }), I('appSwitcherPopover');
          },
          toggleDropdownState: I,
          $getTranslation: i,
          img_binding: function(e) {
            te[e ? 'unshift' : 'push'](() => {
              n('logo', (a = e));
            });
          },
          click_handler: () => x('/'),
          click_handler_1: () => x('/'),
          click_handler_2: () => I('appSwitcherPopover'),
          click_handler_4: ({ item: e }) => x(e.link)
        }
      );
    }
    var Oi = class extends Pe {
      constructor(e) {
        super(),
          $e(this, e, Di, Pi, d, [
            'logo',
            'hasLogo',
            'title',
            'hasApps',
            'dropDownStates',
            'showMainAppEntry',
            'selectedItem',
            'defaultTitle',
            'appSwitcherItems',
            'pathParams',
            'subTitle',
            'defaultSubTitle',
            'pathData',
            'goTo',
            'goToRoot',
            'handleClick',
            'toggleDropdownState'
          ]);
      }
      get goTo() {
        return this.$$.ctx.goTo;
      }
      get goToRoot() {
        return this.$$.ctx.goToRoot;
      }
      get handleClick() {
        return this.$$.ctx.handleClick;
      }
      get toggleDropdownState() {
        return this.$$.ctx.toggleDropdownState;
      }
    };
    n(395);
    function Vi(e, t, n) {
      const i = Object.create(e);
      return (i.profileItem = t[n]), i;
    }
    function Mi(e) {
      var t,
        n,
        i,
        r,
        o = e.showUserInfo && Fi(e);
      let a = e.profileNav.items,
        s = [];
      for (let t = 0; t < a.length; t += 1) s[t] = zi(Vi(e, a, t));
      var l = (e.isAuthorizationEnabled || e.isProfileLogoutItem) && Wi(e);
      return {
        c() {
          (t = k('nav')), (n = k('ul')), o && o.c(), (i = P());
          for (let e = 0; e < s.length; e += 1) s[e].c();
          (r = P()), l && l.c(), D(n, 'class', 'fd-menu__list fd-menu__list--no-shadow'), D(t, 'class', 'fd-menu');
        },
        m(e, a) {
          I(e, t, a), x(t, n), o && o.m(n, null), x(n, i);
          for (let e = 0; e < s.length; e += 1) s[e].m(n, null);
          x(n, r), l && l.m(n, null);
        },
        p(e, t) {
          if (
            (t.showUserInfo ? (o ? o.p(e, t) : ((o = Fi(t)).c(), o.m(n, i))) : o && (o.d(1), (o = null)),
            e.getTestId || e.profileNav || e.getRouteLink || e.$getTranslation || e.hasOpenUIicon)
          ) {
            let i;
            for (a = t.profileNav.items, i = 0; i < a.length; i += 1) {
              const o = Vi(t, a, i);
              s[i] ? s[i].p(e, o) : ((s[i] = zi(o)), s[i].c(), s[i].m(n, r));
            }
            for (; i < s.length; i += 1) s[i].d(1);
            s.length = a.length;
          }
          t.isAuthorizationEnabled || t.isProfileLogoutItem
            ? l
              ? l.p(e, t)
              : ((l = Wi(t)).c(), l.m(n, null))
            : l && (l.d(1), (l = null));
        },
        d(e) {
          e && T(t), o && o.d(), N(s, e), l && l.d();
        }
      };
    }
    function Fi(e) {
      var t,
        n,
        i,
        r = e.userInfo.name ? e.userInfo.name : e.userInfo.email + '';
      return {
        c() {
          (t = k('li')),
            (n = k('span')),
            (i = $(r)),
            D(n, 'aria-label', 'Username'),
            D(n, 'id', 'username'),
            D(n, 'class', 'lui-username fd-has-type-1 svelte-1vfisis'),
            D(n, 'data-testid', 'luigi-topnav-profile-username'),
            D(t, 'class', 'fd-menu__item');
        },
        m(e, r) {
          I(e, t, r), x(t, n), x(n, i);
        },
        p(e, t) {
          e.userInfo && r !== (r = t.userInfo.name ? t.userInfo.name : t.userInfo.email + '') && O(i, r);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function ji(e) {
      var t, n;
      function i(e, n) {
        return (null == t || e.profileNav) && (t = !!Xi(n.profileItem)), t ? Bi : Ui;
      }
      var r = i(null, e),
        o = r(e);
      return {
        c() {
          o.c(), (n = E());
        },
        m(e, t) {
          o.m(e, t), I(e, n, t);
        },
        p(e, t) {
          r === (r = i(e, t)) && o ? o.p(e, t) : (o.d(1), (o = r(t)) && (o.c(), o.m(n.parentNode, n)));
        },
        d(e) {
          o.d(e), e && T(n);
        }
      };
    }
    function Ui(e) {
      var t, n, i;
      return {
        c() {
          D((t = k('img')), 'class', 'fd-top-nav__icon nav-icon svelte-1vfisis'),
            D(t, 'src', (n = e.profileItem.icon)),
            D(t, 'alt', (i = e.profileItem.altText ? e.profileItem.altText : ''));
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, r) {
          e.profileNav && n !== (n = r.profileItem.icon) && D(t, 'src', n),
            e.profileNav && i !== (i = r.profileItem.altText ? r.profileItem.altText : '') && D(t, 'alt', i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Bi(e) {
      var t, n;
      return {
        c() {
          D((t = k('span')), 'class', (n = 'fd-top-nav__icon sap-icon--' + e.profileItem.icon + ' svelte-1vfisis'));
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          e.profileNav &&
            n !== (n = 'fd-top-nav__icon sap-icon--' + i.profileItem.icon + ' svelte-1vfisis') &&
            D(t, 'class', n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function zi(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d = e.$getTranslation(e.profileItem.label) + '',
        u = e.profileItem.icon && ji(e);
      function f() {
        return e.click_handler_1(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            u && u.c(),
            (i = P()),
            (r = k('span')),
            (o = $(d)),
            D(r, 'class', 'fd-menu__title'),
            D(n, 'class', 'fd-menu__link'),
            D(n, 'data-testid', 'luigi-topnav-profile-item'),
            D(n, 'href', (a = er(e.profileItem))),
            D(t, 'class', 'fd-menu__item'),
            D(t, 'data-testid', (s = Zi(e.profileItem))),
            (c = [L(n, 'click', R(nr)), L(t, 'click', f)]);
        },
        m(e, a) {
          I(e, t, a), x(t, n), u && u.m(n, null), x(n, i), x(n, r), x(r, o);
        },
        p(r, l) {
          (e = l).profileItem.icon ? (u ? u.p(r, e) : ((u = ji(e)).c(), u.m(n, i))) : u && (u.d(1), (u = null)),
            (r.$getTranslation || r.profileNav) && d !== (d = e.$getTranslation(e.profileItem.label) + '') && O(o, d),
            r.profileNav && a !== (a = er(e.profileItem)) && D(n, 'href', a),
            r.profileNav && s !== (s = Zi(e.profileItem)) && D(t, 'data-testid', s);
        },
        d(e) {
          e && T(t), u && u.d(), l(c);
        }
      };
    }
    function Wi(e) {
      var t,
        n,
        i = (e.isLoggedIn || (!e.isAuthorizationEnabled && e.isProfileLogoutItem)) && Gi(e),
        r = e.isAuthorizationEnabled && !e.isLoggedIn && Ji(e);
      return {
        c() {
          i && i.c(), (t = P()), r && r.c(), (n = E());
        },
        m(e, o) {
          i && i.m(e, o), I(e, t, o), r && r.m(e, o), I(e, n, o);
        },
        p(e, o) {
          o.isLoggedIn || (!o.isAuthorizationEnabled && o.isProfileLogoutItem)
            ? i
              ? i.p(e, o)
              : ((i = Gi(o)).c(), i.m(t.parentNode, t))
            : i && (i.d(1), (i = null)),
            o.isAuthorizationEnabled && !o.isLoggedIn
              ? r || ((r = Ji(o)).c(), r.m(n.parentNode, n))
              : r && (r.d(1), (r = null));
        },
        d(e) {
          i && i.d(e), e && T(t), r && r.d(e), e && T(n);
        }
      };
    }
    function Gi(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l = e.$getTranslation(e.profileNav.logout.label) + '',
        c = e.profileNav.logout.icon && Hi(e);
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            c && c.c(),
            (i = P()),
            (r = k('span')),
            (o = $(l)),
            D(r, 'class', 'fd-menu__title'),
            D(n, 'aria-label', 'Logout'),
            D(n, 'class', 'fd-menu__link'),
            D(n, 'data-testid', 'logout-link'),
            D(t, 'class', 'fd-menu__item'),
            D(t, 'data-testid', (a = Zi(e.profileNav.logout))),
            (s = L(t, 'click', e.onLogoutClick));
        },
        m(e, a) {
          I(e, t, a), x(t, n), c && c.m(n, null), x(n, i), x(n, r), x(r, o);
        },
        p(e, r) {
          r.profileNav.logout.icon ? (c ? c.p(e, r) : ((c = Hi(r)).c(), c.m(n, i))) : c && (c.d(1), (c = null)),
            (e.$getTranslation || e.profileNav) &&
              l !== (l = r.$getTranslation(r.profileNav.logout.label) + '') &&
              O(o, l),
            e.profileNav && a !== (a = Zi(r.profileNav.logout)) && D(t, 'data-testid', a);
        },
        d(e) {
          e && T(t), c && c.d(), s();
        }
      };
    }
    function Hi(e) {
      var t, n;
      function i(e, n) {
        return (null == t || e.profileNav) && (t = !!Xi(n.profileNav.logout)), t ? Ki : qi;
      }
      var r = i(null, e),
        o = r(e);
      return {
        c() {
          o.c(), (n = E());
        },
        m(e, t) {
          o.m(e, t), I(e, n, t);
        },
        p(e, t) {
          r === (r = i(e, t)) && o ? o.p(e, t) : (o.d(1), (o = r(t)) && (o.c(), o.m(n.parentNode, n)));
        },
        d(e) {
          o.d(e), e && T(n);
        }
      };
    }
    function qi(e) {
      var t, n, i;
      return {
        c() {
          D((t = k('img')), 'class', 'fd-top-nav__icon nav-icon svelte-1vfisis'),
            D(t, 'src', (n = e.profileNav.logout.icon)),
            D(t, 'alt', (i = e.profileNav.logout.altText ? e.profileNav.logout.altText : ''));
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, r) {
          e.profileNav && n !== (n = r.profileNav.logout.icon) && D(t, 'src', n),
            e.profileNav &&
              i !== (i = r.profileNav.logout.altText ? r.profileNav.logout.altText : '') &&
              D(t, 'alt', i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Ki(e) {
      var t, n;
      return {
        c() {
          D(
            (t = k('span')),
            'class',
            (n = 'fd-top-nav__icon sap-icon--' + e.profileNav.logout.icon + ' svelte-1vfisis')
          );
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          e.profileNav &&
            n !== (n = 'fd-top-nav__icon sap-icon--' + i.profileNav.logout.icon + ' svelte-1vfisis') &&
            D(t, 'class', n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Ji(e) {
      var t, n;
      return {
        c() {
          ((t = k('li')).innerHTML =
            '<a aria-label="Login" class="fd-menu__link" data-testid="login-link"><span class="fd-menu__title">Login</span></a>'),
            D(t, 'class', 'fd-menu__item'),
            (n = L(t, 'click', Qi));
        },
        m(e, n) {
          I(e, t, n);
        },
        d(e) {
          e && T(t), n();
        }
      };
    }
    function Yi(e) {
      var t,
        n = !e.isHidden && Mi(e);
      return {
        c() {
          n && n.c(), (t = E());
        },
        m(e, i) {
          n && n.m(e, i), I(e, t, i);
        },
        p(e, i) {
          i.isHidden ? n && (n.d(1), (n = null)) : n ? n.p(e, i) : ((n = Mi(i)).c(), n.m(t.parentNode, t));
        },
        i: i,
        o: i,
        d(e) {
          n && n.d(e), e && T(t);
        }
      };
    }
    function Qi() {
      bt.startAuthorization();
    }
    function Xi(e) {
      return xt.isOpenUIiconName(e.icon);
    }
    function Zi(e) {
      return e.testId ? e.testId : xt.prepareForTests(e.label);
    }
    function er(e) {
      return It.getNodeHref(e);
    }
    function tr() {
      bt.logout();
    }
    const nr = () => {};
    function ir(e, t, n) {
      let i;
      const r = Y();
      let o,
        a,
        s,
        l,
        c,
        d,
        { isHidden: u = !1 } = t,
        f = { logout: {}, items: [] },
        h = X('store'),
        g = X('getTranslation');
      p(e, g, e => {
        n('$getTranslation', (i = e));
      });
      let m = X('getUnsavedChangesModalPromise'),
        v = X('openViewInModal');
      function b() {
        c ||
          (Tt.doOnStoreChange(
            h,
            async () => {
              const e = await Ze.getConfigValueAsync('navigation.profile.logout'),
                t = { items: (await Ze.getConfigValueAsync('navigation.profile.items')) || [] };
              (t.logout = { ...ut.logout, ...e }),
                n('isProfileLogoutItem', (l = Boolean(e))),
                (d = !1),
                bt.setProfileLogoutFn(null),
                e && _t.isFunction(e.customLogoutFn) && ((d = !0), bt.setProfileLogoutFn(e.customLogoutFn)),
                n('profileNav', (f = t));
            },
            ['navigation.profile']
          ),
          (c = !0));
      }
      async function w() {
        const e = await Ze.getConfigValueAsync('navigation.profile.staticUserInfoFn');
        e && (bt.setUserInfo(o), n('userInfo', (o = e)), r('userInfoUpdated', o));
      }
      function S(e) {
        m().then(() => {
          if (e.openNodeInModal) {
            const t = It.buildRoute(e, `${e.link}`);
            v(t, !0 === e.openNodeInModal ? {} : e.openNodeInModal);
          } else ht.navigateToLink(e);
        }),
          r('toggleDropdownState');
      }
      q(async () => {
        et.isAuthorizationEnabled()
          ? n('isAuthorizationEnabled', (s = !0))
          : (n('isAuthorizationEnabled', (s = !1)), w()),
          b(),
          bt.getLoggedInStore().subscribe(e => {
            n('isLoggedIn', (a = e));
          }),
          bt.getUserInfoStore().subscribe(e => {
            n('userInfo', (o = e)), r('userInfoUpdated', o);
          });
      });
      let { showUserInfo: y } = t;
      return (
        (e.$set = e => {
          'isHidden' in e && n('isHidden', (u = e.isHidden)),
            'showUserInfo' in e && n('showUserInfo', (y = e.showUserInfo));
        }),
        (e.$$.update = (e = { userInfo: 1 }) => {
          e.userInfo && n('showUserInfo', (y = Boolean(o && (o.name || o.email))));
        }),
        {
          isHidden: u,
          userInfo: o,
          isLoggedIn: a,
          profileNav: f,
          isAuthorizationEnabled: s,
          isProfileLogoutItem: l,
          getTranslation: g,
          setProfileNavData: b,
          setProfileUserData: w,
          onActionClick: S,
          onLogoutClick: function() {
            m().then(() => {
              s
                ? tr()
                : l && d
                ? f.logout.customLogoutFn()
                : console.error('No IDP provider or profile.customLogoutFn is defined.');
            });
          },
          showUserInfo: y,
          $getTranslation: i,
          click_handler_1: ({ profileItem: e }) => S(e)
        }
      );
    }
    var rr = class extends Pe {
      constructor(e) {
        super(),
          $e(this, e, ir, Yi, d, [
            'isHidden',
            'setProfileNavData',
            'setProfileUserData',
            'onActionClick',
            'onLogoutClick',
            'logout',
            'showUserInfo'
          ]);
      }
      get setProfileNavData() {
        return this.$$.ctx.setProfileNavData;
      }
      get setProfileUserData() {
        return this.$$.ctx.setProfileUserData;
      }
      get onActionClick() {
        return this.$$.ctx.onActionClick;
      }
      get onLogoutClick() {
        return this.$$.ctx.onLogoutClick;
      }
      get logout() {
        return tr;
      }
    };
    n(396);
    function or(e, t, n) {
      const i = Object.create(e);
      return (i.node = t[n]), i;
    }
    function ar(e) {
      var t, n;
      let i = e.nodes,
        r = [];
      for (let t = 0; t < i.length; t += 1) r[t] = cr(or(e, i, t));
      const o = e =>
        we(r[e], 1, 1, () => {
          r[e] = null;
        });
      return {
        c() {
          for (let e = 0; e < r.length; e += 1) r[e].c();
          t = E();
        },
        m(e, i) {
          for (let t = 0; t < r.length; t += 1) r[t].m(e, i);
          I(e, t, i), (n = !0);
        },
        p(e, n) {
          if (e.noSubTitle || e.nodes || e.getTestId || e.getNodeSubtitle || e.getNodeLabel || e.hasOpenUIicon) {
            let a;
            for (i = n.nodes, a = 0; a < i.length; a += 1) {
              const o = or(n, i, a);
              r[a] ? (r[a].p(e, o), be(r[a], 1)) : ((r[a] = cr(o)), r[a].c(), be(r[a], 1), r[a].m(t.parentNode, t));
            }
            for (me(), a = i.length; a < r.length; a += 1) o(a);
            ve();
          }
        },
        i(e) {
          if (!n) {
            for (let e = 0; e < i.length; e += 1) be(r[e]);
            n = !0;
          }
        },
        o(e) {
          r = r.filter(Boolean);
          for (let e = 0; e < r.length; e += 1) we(r[e]);
          n = !1;
        },
        d(e) {
          N(r, e), e && T(t);
        }
      };
    }
    function sr(e) {
      var t, n, i;
      return {
        c() {
          D((t = k('img')), 'src', (n = e.node.icon)),
            D(t, 'alt', (i = e.node.altText ? e.node.altText : '')),
            D(t, 'class', 'svelte-1p3wdig');
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, r) {
          e.nodes && n !== (n = r.node.icon) && D(t, 'src', n),
            e.nodes && i !== (i = r.node.altText ? r.node.altText : '') && D(t, 'alt', i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function lr(e) {
      var t,
        n,
        i = e.getNodeSubtitle(e.node) + '';
      return {
        c() {
          (t = k('div')), (n = $(i)), D(t, 'class', 'fd-product-switch__subtitle');
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, t) {
          (e.getNodeSubtitle || e.nodes) && i !== (i = t.getNodeSubtitle(t.node) + '') && O(n, i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function cr(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c,
        d,
        u,
        f,
        p,
        h,
        g = !e.hasOpenUIicon(e.node),
        m = e.getNodeLabel(e.node) + '',
        v = e.getNodeSubtitle(e.node),
        b = g && sr(e),
        w = new un({ props: { node: e.node } }),
        S = v && lr(e);
      function y() {
        return e.click_handler_1(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('div')),
            b && b.c(),
            (i = P()),
            w.$$.fragment.c(),
            (o = P()),
            (a = k('div')),
            (s = k('div')),
            (l = $(m)),
            (c = P()),
            S && S.c(),
            (d = P()),
            D(
              n,
              'class',
              (r =
                'fd-product-switch__icon ' +
                (e.node.icon && e.hasOpenUIicon(e.node) ? 'sap-icon--' + e.node.icon : '') +
                ' svelte-1p3wdig')
            ),
            D(s, 'class', 'fd-product-switch__title svelte-1p3wdig'),
            D(a, 'class', 'fd-product-switch__text svelte-1p3wdig'),
            D(
              t,
              'class',
              (u =
                'fd-product-switch__item ' +
                ('true' == e.noSubTitle ? 'y-has-no-subtitle' : '') +
                ' ' +
                (e.node.selected ? 'selected' : '') +
                ' svelte-1p3wdig')
            ),
            D(t, 'data-e2e', 'mobile-topnav-item'),
            D(t, 'data-testid', (f = e.getTestId(e.node))),
            (h = L(t, 'click', y));
        },
        m(e, r) {
          I(e, t, r),
            x(t, n),
            b && b.m(n, null),
            x(n, i),
            Ne(w, n, null),
            x(t, o),
            x(t, a),
            x(a, s),
            x(s, l),
            x(a, c),
            S && S.m(a, null),
            x(t, d),
            (p = !0);
        },
        p(o, s) {
          (e = s),
            (o.hasOpenUIicon || o.nodes) && (g = !e.hasOpenUIicon(e.node)),
            g ? (b ? b.p(o, e) : ((b = sr(e)).c(), b.m(n, i))) : b && (b.d(1), (b = null));
          var c = {};
          o.nodes && (c.node = e.node),
            w.$set(c),
            (p && !o.nodes && !o.hasOpenUIicon) ||
              r ===
                (r =
                  'fd-product-switch__icon ' +
                  (e.node.icon && e.hasOpenUIicon(e.node) ? 'sap-icon--' + e.node.icon : '') +
                  ' svelte-1p3wdig') ||
              D(n, 'class', r),
            (p && !o.getNodeLabel && !o.nodes) || m === (m = e.getNodeLabel(e.node) + '') || O(l, m),
            (o.getNodeSubtitle || o.nodes) && (v = e.getNodeSubtitle(e.node)),
            v ? (S ? S.p(o, e) : ((S = lr(e)).c(), S.m(a, null))) : S && (S.d(1), (S = null)),
            (p && !o.noSubTitle && !o.nodes) ||
              u ===
                (u =
                  'fd-product-switch__item ' +
                  ('true' == e.noSubTitle ? 'y-has-no-subtitle' : '') +
                  ' ' +
                  (e.node.selected ? 'selected' : '') +
                  ' svelte-1p3wdig') ||
              D(t, 'class', u),
            (p && !o.getTestId && !o.nodes) || f === (f = e.getTestId(e.node)) || D(t, 'data-testid', f);
        },
        i(e) {
          p || (be(w.$$.fragment, e), (p = !0));
        },
        o(e) {
          we(w.$$.fragment, e), (p = !1);
        },
        d(e) {
          e && T(t), b && b.d(), ke(w), S && S.d(), h();
        }
      };
    }
    function dr(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d,
        u,
        f,
        p,
        h,
        g,
        m,
        v,
        b,
        w,
        S = e.nodes && ar(e);
      return {
        c() {
          (t = k('div')),
            (n = k('div')),
            (i = k('div')),
            (r = k('div')),
            (o = k('div')),
            (a = k('h3')),
            (s = $(e.label)),
            (c = P()),
            (d = k('div')),
            (u = k('div')),
            (f = k('ul')),
            S && S.c(),
            (p = P()),
            (h = k('footer')),
            (g = k('div')),
            (m = k('div')),
            ((v = k('button')).textContent = 'Cancel'),
            D(a, 'class', 'fd-dialog__title'),
            D(o, 'class', 'fd-bar__element'),
            D(r, 'class', 'fd-bar__left'),
            D(i, 'class', 'fd-dialog__header fd-bar fd-bar--header'),
            D(f, 'class', 'fd-product-switch__list'),
            D(u, 'class', 'fd-product-switch__body fd-product-switch__body--mobile svelte-1p3wdig'),
            D(d, 'class', 'fd-dialog__body fd-dialog__body--no-vertical-padding'),
            D(v, 'class', 'fd-button fd-button--light fd-dialog__decisive-button'),
            D(v, 'data-testid', 'mobile-topnav-close'),
            D(m, 'class', 'fd-bar__element'),
            D(g, 'class', 'fd-bar__right'),
            D(h, 'class', 'fd-dialog__footer fd-bar fd-bar--cosy fd-bar--footer'),
            D(n, 'class', 'fd-dialog__content fd-dialog__content--mobile'),
            D(t, 'class', 'fd-dialog fd-dialog--active'),
            (w = [L(v, 'click', e.click_handler), L(t, 'click', A(ur))]);
        },
        m(e, l) {
          I(e, t, l),
            x(t, n),
            x(n, i),
            x(i, r),
            x(r, o),
            x(o, a),
            x(a, s),
            x(n, c),
            x(n, d),
            x(d, u),
            x(u, f),
            S && S.m(f, null),
            x(n, p),
            x(n, h),
            x(h, g),
            x(g, m),
            x(m, v),
            (b = !0);
        },
        p(e, t) {
          (b && !e.label) || O(s, t.label),
            t.nodes
              ? S
                ? (S.p(e, t), be(S, 1))
                : ((S = ar(t)).c(), be(S, 1), S.m(f, null))
              : S &&
                (me(),
                we(S, 1, 1, () => {
                  S = null;
                }),
                ve());
        },
        i(e) {
          b || (be(S), (b = !0));
        },
        o(e) {
          we(S), (b = !1);
        },
        d(e) {
          e && T(t), S && S.d(), l(w);
        }
      };
    }
    const ur = () => {};
    function fr(e, t, n) {
      const i = Y();
      let {
        label: r,
        nodes: o,
        getTestId: a,
        hasOpenUIicon: s,
        getNodeLabel: l,
        getNodeSubtitle: c,
        noSubTitle: d
      } = t;
      function u(e) {
        i('listClick', e);
      }
      return (
        (e.$set = e => {
          'label' in e && n('label', (r = e.label)),
            'nodes' in e && n('nodes', (o = e.nodes)),
            'getTestId' in e && n('getTestId', (a = e.getTestId)),
            'hasOpenUIicon' in e && n('hasOpenUIicon', (s = e.hasOpenUIicon)),
            'getNodeLabel' in e && n('getNodeLabel', (l = e.getNodeLabel)),
            'getNodeSubtitle' in e && n('getNodeSubtitle', (c = e.getNodeSubtitle)),
            'noSubTitle' in e && n('noSubTitle', (d = e.noSubTitle));
        }),
        {
          label: r,
          nodes: o,
          getTestId: a,
          hasOpenUIicon: s,
          getNodeLabel: l,
          getNodeSubtitle: c,
          noSubTitle: d,
          onActionClick: u,
          click_handler: function(t) {
            Z(e, t);
          },
          click_handler_1: ({ node: e }) => u(e)
        }
      );
    }
    var pr = class extends Pe {
      constructor(e) {
        super(),
          $e(this, e, fr, dr, d, [
            'label',
            'nodes',
            'getTestId',
            'hasOpenUIicon',
            'getNodeLabel',
            'getNodeSubtitle',
            'noSubTitle',
            'onActionClick'
          ]);
      }
      get onActionClick() {
        return this.$$.ctx.onActionClick;
      }
    };
    n(397);
    const { window: hr } = xe;
    function gr(e, t, n) {
      const i = Object.create(e);
      return (i.node = t[n]), i;
    }
    function mr(e) {
      var t,
        n,
        i,
        r = e.children && vr(e);
      return {
        c() {
          (t = k('nav')),
            (n = k('ul')),
            r && r.c(),
            D(n, 'class', 'fd-menu__list fd-menu__list--top fd-menu__list--no-shadow'),
            D(t, 'class', 'fd-menu');
        },
        m(e, o) {
          I(e, t, o), x(t, n), r && r.m(n, null), (i = !0);
        },
        p(e, t) {
          t.children
            ? r
              ? (r.p(e, t), be(r, 1))
              : ((r = vr(t)).c(), be(r, 1), r.m(n, null))
            : r &&
              (me(),
              we(r, 1, 1, () => {
                r = null;
              }),
              ve());
        },
        i(e) {
          i || (be(r), (i = !0));
        },
        o(e) {
          we(r), (i = !1);
        },
        d(e) {
          e && T(t), r && r.d();
        }
      };
    }
    function vr(e) {
      var t, n;
      let i = e.children,
        r = [];
      for (let t = 0; t < i.length; t += 1) r[t] = wr(gr(e, i, t));
      const o = e =>
        we(r[e], 1, 1, () => {
          r[e] = null;
        });
      return {
        c() {
          for (let e = 0; e < r.length; e += 1) r[e].c();
          t = E();
        },
        m(e, i) {
          for (let t = 0; t < r.length; t += 1) r[t].m(e, i);
          I(e, t, i), (n = !0);
        },
        p(e, n) {
          if (e.getTestId || e.children || e.getRouteLink || e.getNodeLabel || e.hasOpenUIicon) {
            let a;
            for (i = n.children, a = 0; a < i.length; a += 1) {
              const o = gr(n, i, a);
              r[a] ? (r[a].p(e, o), be(r[a], 1)) : ((r[a] = wr(o)), r[a].c(), be(r[a], 1), r[a].m(t.parentNode, t));
            }
            for (me(), a = i.length; a < r.length; a += 1) o(a);
            ve();
          }
        },
        i(e) {
          if (!n) {
            for (let e = 0; e < i.length; e += 1) be(r[e]);
            n = !0;
          }
        },
        o(e) {
          r = r.filter(Boolean);
          for (let e = 0; e < r.length; e += 1) we(r[e]);
          n = !1;
        },
        d(e) {
          N(r, e), e && T(t);
        }
      };
    }
    function br(e) {
      var t, n, i;
      return {
        c() {
          D((t = k('img')), 'src', (n = e.node.icon)),
            D(t, 'alt', (i = e.node.altText ? e.node.altText : '')),
            D(t, 'class', 'svelte-1rq7dhj');
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, r) {
          e.children && n !== (n = r.node.icon) && D(t, 'src', n),
            e.children && i !== (i = r.node.altText ? r.node.altText : '') && D(t, 'alt', i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function wr(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d,
        u,
        f,
        p,
        h,
        g = !Cr(e.node),
        m = xr(e.node) + '',
        v = g && br(e),
        b = new un({ props: { node: e.node } });
      function w() {
        return e.click_handler_1(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            (i = k('span')),
            v && v.c(),
            (r = P()),
            b.$$.fragment.c(),
            (a = P()),
            (s = k('span')),
            (c = $(m)),
            (u = P()),
            D(
              i,
              'class',
              (o =
                'fd-top-nav__icon ' + (e.node.icon && Cr(e.node) ? 'sap-icon--' + e.node.icon : '') + ' svelte-1rq7dhj')
            ),
            D(s, 'class', 'fd-menu__title'),
            D(n, 'href', (d = e.getRouteLink(e.node))),
            D(n, 'class', 'fd-menu__link'),
            D(t, 'class', 'fd-menu__item'),
            D(t, 'data-testid', (f = Ir(e.node))),
            (h = [L(n, 'click', R(Tr)), L(t, 'click', w)]);
        },
        m(e, o) {
          I(e, t, o),
            x(t, n),
            x(n, i),
            v && v.m(i, null),
            x(i, r),
            Ne(b, i, null),
            x(n, a),
            x(n, s),
            x(s, c),
            x(t, u),
            (p = !0);
        },
        p(a, s) {
          (e = s),
            a.children && (g = !Cr(e.node)),
            g ? (v ? v.p(a, e) : ((v = br(e)).c(), v.m(i, r))) : v && (v.d(1), (v = null));
          var l = {};
          a.children && (l.node = e.node),
            b.$set(l),
            (p && !a.children) ||
              o ===
                (o =
                  'fd-top-nav__icon ' +
                  (e.node.icon && Cr(e.node) ? 'sap-icon--' + e.node.icon : '') +
                  ' svelte-1rq7dhj') ||
              D(i, 'class', o),
            (p && !a.children) || m === (m = xr(e.node) + '') || O(c, m),
            (p && !a.children) || d === (d = e.getRouteLink(e.node)) || D(n, 'href', d),
            (p && !a.children) || f === (f = Ir(e.node)) || D(t, 'data-testid', f);
        },
        i(e) {
          p || (be(b.$$.fragment, e), (p = !0));
        },
        o(e) {
          we(b.$$.fragment, e), (p = !1);
        },
        d(e) {
          e && T(t), v && v.d(), ke(b), l(h);
        }
      };
    }
    function Sr(e) {
      var t,
        n = new pr({
          props: {
            nodes: e.node.children,
            label: xr(e.node),
            hasOpenUIicon: Cr,
            getNodeLabel: xr,
            getNodeSubtitle: e.getNodeSubtitle,
            getTestId: Ir,
            noSubTitle: 'true'
          }
        });
      return (
        n.$on('click', e.closeSubNav),
        n.$on('listClick', e.onActionClickExternal),
        {
          c() {
            n.$$.fragment.c();
          },
          m(e, i) {
            Ne(n, e, i), (t = !0);
          },
          p(e, t) {
            var i = {};
            e.node && (i.nodes = t.node.children), e.node && (i.label = xr(t.node)), n.$set(i);
          },
          i(e) {
            t || (be(n.$$.fragment, e), (t = !0));
          },
          o(e) {
            we(n.$$.fragment, e), (t = !1);
          },
          d(e) {
            ke(n, e);
          }
        }
      );
    }
    function yr(e) {
      var t,
        n,
        i,
        r,
        o = !e.isMobile && mr(e),
        a = e.isMobile && Sr(e);
      return {
        c() {
          o && o.c(), (t = P()), a && a.c(), (n = E()), (r = L(hr, 'resize', _r));
        },
        m(e, r) {
          o && o.m(e, r), I(e, t, r), a && a.m(e, r), I(e, n, r), (i = !0);
        },
        p(e, i) {
          i.isMobile
            ? o &&
              (me(),
              we(o, 1, 1, () => {
                o = null;
              }),
              ve())
            : o
            ? (o.p(e, i), be(o, 1))
            : ((o = mr(i)).c(), be(o, 1), o.m(t.parentNode, t)),
            i.isMobile
              ? a
                ? (a.p(e, i), be(a, 1))
                : ((a = Sr(i)).c(), be(a, 1), a.m(n.parentNode, n))
              : a &&
                (me(),
                we(a, 1, 1, () => {
                  a = null;
                }),
                ve());
        },
        i(e) {
          i || (be(o), be(a), (i = !0));
        },
        o(e) {
          we(o), we(a), (i = !1);
        },
        d(e) {
          o && o.d(e), e && T(t), a && a.d(e), e && T(n), r();
        }
      };
    }
    function _r() {
      let e = 0.01 * window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${e}px`);
    }
    function Cr(e) {
      return xt.isOpenUIiconName(e.icon);
    }
    function xr(e) {
      return nt.getTranslation(e.label);
    }
    function Ir(e) {
      return e.testId ? e.testId : xt.prepareForTests(e.pathSegment, e.label);
    }
    const Tr = () => {};
    function Nr(e, t, n) {
      const i = Y();
      let r,
        { isMobile: o, children: a, node: s } = t,
        l = X('getUnsavedChangesModalPromise'),
        c = X('openViewInModal');
      const d = () => ({ get: () => ({ pathParams: r }), set: e => {} });
      function u(e) {
        l().then(() => {
          if (e.openNodeInModal) {
            const t = It.buildRoute(e, `/${e.pathSegment}`);
            c(t, !0 === e.openNodeInModal ? {} : e.openNodeInModal);
          } else ht.handleRouteClick(e, d());
        }),
          f();
      }
      function f() {
        i('close');
      }
      q(async () => {
        _r();
      }),
        H(async () => {
          a || n('children', (a = await dt.getChildren(s))), n('children', a);
        });
      return (
        (e.$set = e => {
          'isMobile' in e && n('isMobile', (o = e.isMobile)),
            'children' in e && n('children', (a = e.children)),
            'node' in e && n('node', (s = e.node));
        }),
        {
          isMobile: o,
          children: a,
          node: s,
          getNodeSubtitle: () => {},
          onActionClick: u,
          onActionClickExternal: function(e) {
            u(e.detail);
          },
          closeSubNav: f,
          getRouteLink: function(e) {
            return It.getNodeHref(e, r);
          },
          click_handler_1: ({ node: e }) => u(e)
        }
      );
    }
    var kr = class extends Pe {
      constructor(e) {
        super(),
          $e(this, e, Nr, yr, d, [
            'isMobile',
            'children',
            'node',
            'onActionClick',
            'onActionClickExternal',
            'closeSubNav',
            'setViewportHeightVariable'
          ]);
      }
      get onActionClick() {
        return this.$$.ctx.onActionClick;
      }
      get onActionClickExternal() {
        return this.$$.ctx.onActionClickExternal;
      }
      get closeSubNav() {
        return this.$$.ctx.closeSubNav;
      }
      get setViewportHeightVariable() {
        return _r;
      }
    };
    const $r = {
      _fallbackLabels: new Map(),
      resetFallbackLabelCache() {
        this._fallbackLabels.clear();
      },
      getPreparedParentNodePath: e => (
        (e.parentNodePath && e.parentNodePath.startsWith('/')) ||
          console.error(
            'Luigi Config Error: navigation.contextSwitcher.parentNodePath must be defined as an absolute path.'
          ),
        e.parentNodePath ? _t.addTrailingSlash(e.parentNodePath) : e.parentNodePath
      ),
      generateSwitcherNav(e, t) {
        const n = this.getPreparedParentNodePath(e);
        return t.map(e => ({
          label: e.label,
          link: (n || '/') + e.pathValue,
          id: e.pathValue,
          testId: e.testId,
          customRendererCategory: e.customRendererCategory
        }));
      },
      getNodePathFromCurrentPath(e, t) {
        const n = _t.addLeadingSlash(ht.getCurrentPath()),
          i = _t.addLeadingSlash(t.link);
        return n.startsWith(i) ? e.link + _t.addLeadingSlash(n.substring(i.length)) : e.link;
      },
      getOptionById: (e, t) => e.find(e => e.id === t),
      getLabelFromOptions(e, t) {
        const n = e.find(e => e.id === t);
        return n && n.label;
      },
      isContextSwitcherDetailsView(e, t) {
        const n = _t.normalizePath(e),
          i = _t.normalizePath(t);
        return Boolean(t && n && n.startsWith(i) && n !== i);
      },
      async getFallbackLabel(e, t) {
        if (!e) return t;
        const n = Ze.getConfigBooleanValue('navigation.contextSwitcher.useFallbackLabelCache'),
          i = $r._fallbackLabels;
        if (n && i.has(t)) return i.get(t);
        const r = await e(t);
        return n && i.set(t, r), r;
      },
      getSelectedId(e, t, n) {
        if (((e = _t.normalizePath(e)), (n = _t.normalizePath(n)), $r.isContextSwitcherDetailsView(e, n)))
          return e
            .replace(n, '')
            .split('/')[0]
            .split('?')[0];
      },
      async getSelectedOption(e, t, n) {
        let i;
        const r = this.getSelectedId(e, t, n);
        return r && t && (i = $r.getOptionById(t, r)), i;
      },
      async getSelectedLabel(e, t, n, i) {
        const r = this.getSelectedId(e, t, n);
        if (!r) return;
        let o = await this.getSelectedOption(e, t, n);
        return (o ? o.label : void 0) || (await $r.getFallbackLabel(i, r));
      },
      async fetchOptions(e = []) {
        const t = Ze.getConfigValue('navigation.contextSwitcher');
        if (!t.lazyloadOptions && e.length) return e;
        const n = await Ze.getConfigValueAsync('navigation.contextSwitcher.options');
        return await $r.generateSwitcherNav(t, n);
      }
    };
    n(398);
    function Pr(e, t, n) {
      const i = Object.create(e);
      return (i.node = t[n]), i;
    }
    function Er(e, t, n) {
      const i = Object.create(e);
      return (i.node = t[n]), i;
    }
    function Lr(e, t, n) {
      const i = Object.create(e);
      return (i.node = t[n]), i;
    }
    function Rr(e) {
      var t;
      let n = e.actions,
        i = [];
      for (let t = 0; t < n.length; t += 1) i[t] = Dr(Lr(e, n, t));
      return {
        c() {
          t = k('ul');
          for (let e = 0; e < i.length; e += 1) i[e].c();
          D(t, 'class', 'fd-menu__list fd-menu__list--top svelte-syxx60');
        },
        m(e, n) {
          I(e, t, n);
          for (let e = 0; e < i.length; e += 1) i[e].m(t, null);
        },
        p(e, r) {
          if (e.actions || e.getTestId || e.getRouteLink || e.$getTranslation) {
            let o;
            for (n = r.actions, o = 0; o < n.length; o += 1) {
              const a = Lr(r, n, o);
              i[o] ? i[o].p(e, a) : ((i[o] = Dr(a)), i[o].c(), i[o].m(t, null));
            }
            for (; o < i.length; o += 1) i[o].d(1);
            i.length = n.length;
          }
        },
        d(e) {
          e && T(t), N(i, e);
        }
      };
    }
    function Ar(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d = e.$getTranslation(e.node.label) + '';
      function u() {
        return e.click_handler_1(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            (i = k('span')),
            (r = $(d)),
            (a = P()),
            D(i, 'class', 'fd-menu__title'),
            D(n, 'href', (o = e.getRouteLink(e.node))),
            D(n, 'class', 'fd-menu__link'),
            D(t, 'class', 'fd-menu__item'),
            D(t, 'data-testid', (s = e.getTestId(e.node))),
            (c = [L(n, 'click', R(Kr)), L(t, 'click', u)]);
        },
        m(e, o) {
          I(e, t, o), x(t, n), x(n, i), x(i, r), x(t, a);
        },
        p(i, a) {
          (e = a),
            (i.$getTranslation || i.actions) && d !== (d = e.$getTranslation(e.node.label) + '') && O(r, d),
            (i.getRouteLink || i.actions) && o !== (o = e.getRouteLink(e.node)) && D(n, 'href', o),
            (i.getTestId || i.actions) && s !== (s = e.getTestId(e.node)) && D(t, 'data-testid', s);
        },
        d(e) {
          e && T(t), l(c);
        }
      };
    }
    function Dr(e) {
      var t,
        n = 'top' === e.node.position || !['top', 'bottom'].includes(e.node.position),
        i = n && Ar(e);
      return {
        c() {
          i && i.c(), (t = E());
        },
        m(e, n) {
          i && i.m(e, n), I(e, t, n);
        },
        p(e, r) {
          e.actions && (n = 'top' === r.node.position || !['top', 'bottom'].includes(r.node.position)),
            n ? (i ? i.p(e, r) : ((i = Ar(r)).c(), i.m(t.parentNode, t))) : i && (i.d(1), (i = null));
        },
        d(e) {
          i && i.d(e), e && T(t);
        }
      };
    }
    function Or(e) {
      var t;
      return {
        c() {
          ((t = k('li')).innerHTML =
            '<div class="fd-busy-indicator" aria-hidden="false" aria-label="Loading"><div class="fd-busy-indicator--circle-0"></div> <div class="fd-busy-indicator--circle-1"></div> <div class="fd-busy-indicator--circle-2"></div></div>'),
            D(t, 'class', 'lui-contextswitcher-indicator');
        },
        m(e, n) {
          I(e, t, n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Vr(e) {
      var t;
      let n = e.options,
        i = [];
      for (let t = 0; t < n.length; t += 1) i[t] = zr(Er(e, n, t));
      return {
        c() {
          for (let e = 0; e < i.length; e += 1) i[e].c();
          t = E();
        },
        m(e, n) {
          for (let t = 0; t < i.length; t += 1) i[t].m(e, n);
          I(e, t, n);
        },
        p(e, r) {
          if (
            e.getNodeName ||
            e.options ||
            e.config ||
            e.getTestId ||
            e.customOptionsRenderer ||
            e.selectedLabel ||
            e.getRouteLink
          ) {
            let o;
            for (n = r.options, o = 0; o < n.length; o += 1) {
              const a = Er(r, n, o);
              i[o] ? i[o].p(e, a) : ((i[o] = zr(a)), i[o].c(), i[o].m(t.parentNode, t));
            }
            for (; o < i.length; o += 1) i[o].d(1);
            i.length = n.length;
          }
        },
        d(e) {
          N(i, e), e && T(t);
        }
      };
    }
    function Mr(e) {
      return { c: i, m: i, p: i, d: i };
    }
    function Fr(e) {
      var t, n, i, r;
      function o(e, t) {
        return t.customOptionsRenderer ? Ur : jr;
      }
      var a = o(0, e),
        s = a(e);
      function l() {
        return e.click_handler_3(e);
      }
      return {
        c() {
          (t = k('li')),
            s.c(),
            (i = P()),
            D(t, 'class', 'fd-menu__item'),
            D(t, 'data-testid', (n = e.getTestId(e.node))),
            (r = L(t, 'click', l));
        },
        m(e, n) {
          I(e, t, n), s.m(t, null), I(e, i, n);
        },
        p(i, r) {
          a === (a = o(0, (e = r))) && s ? s.p(i, e) : (s.d(1), (s = a(e)) && (s.c(), s.m(t, null))),
            (i.getTestId || i.options) && n !== (n = e.getTestId(e.node)) && D(t, 'data-testid', n);
        },
        d(e) {
          e && T(t), s.d(), e && T(i), r();
        }
      };
    }
    function jr(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l = e.label + '';
      return {
        c() {
          (t = k('a')),
            (n = k('span')),
            (i = $(l)),
            D(n, 'class', 'fd-menu__title'),
            D(t, 'href', (r = e.getRouteLink(e.node))),
            D(
              t,
              'class',
              (o = 'fd-menu__link ' + (e.label === e.selectedLabel ? 'is-selected' : '') + ' svelte-syxx60')
            ),
            D(t, 'title', (a = e.label)),
            (s = L(t, 'click', R(Jr)));
        },
        m(e, r) {
          I(e, t, r), x(t, n), x(n, i);
        },
        p(e, n) {
          (e.getNodeName || e.options || e.config) && l !== (l = n.label + '') && O(i, l),
            (e.getRouteLink || e.options) && r !== (r = n.getRouteLink(n.node)) && D(t, 'href', r),
            (e.getNodeName || e.options || e.config || e.selectedLabel) &&
              o !== (o = 'fd-menu__link ' + (n.label === n.selectedLabel ? 'is-selected' : '') + ' svelte-syxx60') &&
              D(t, 'class', o),
            (e.getNodeName || e.options || e.config) && a !== (a = n.label) && D(t, 'title', a);
        },
        d(e) {
          e && T(t), s();
        }
      };
    }
    function Ur(e) {
      var t,
        n = e.customOptionsRenderer(e.node, e.label === e.selectedLabel) + '';
      return {
        c() {
          t = new M(n, null);
        },
        m(e, n) {
          t.m(e, n);
        },
        p(e, i) {
          (e.customOptionsRenderer || e.options || e.getNodeName || e.config || e.selectedLabel) &&
            n !== (n = i.customOptionsRenderer(i.node, i.label === i.selectedLabel) + '') &&
            t.p(n);
        },
        d(e) {
          e && t.d();
        }
      };
    }
    function Br(e) {
      return { c: i, m: i, p: i, d: i };
    }
    function zr(e) {
      var t, n;
      let i = { ctx: e, current: null, token: null, pending: Br, then: Fr, catch: Mr, value: 'label', error: 'null' };
      return (
        Ce((n = e.getNodeName(e.node.label, e.config.fallbackLabelResolver, e.node.id)), i),
        {
          c() {
            (t = E()), i.block.c();
          },
          m(e, n) {
            I(e, t, n), i.block.m(e, (i.anchor = n)), (i.mount = () => t.parentNode), (i.anchor = t);
          },
          p(t, r) {
            (e = r),
              (i.ctx = e),
              (('getNodeName' in t || 'options' in t || 'config' in t) &&
                n !== (n = e.getNodeName(e.node.label, e.config.fallbackLabelResolver, e.node.id)) &&
                Ce(n, i)) ||
                i.block.p(t, o(o({}, e), i.resolved));
          },
          d(e) {
            e && T(t), i.block.d(e), (i.token = null), (i = null);
          }
        }
      );
    }
    function Wr(e) {
      var t;
      let n = e.actions,
        i = [];
      for (let t = 0; t < n.length; t += 1) i[t] = Hr(Pr(e, n, t));
      return {
        c() {
          t = k('ul');
          for (let e = 0; e < i.length; e += 1) i[e].c();
          D(t, 'class', 'fd-menu__list fd-menu__list--bottom svelte-syxx60');
        },
        m(e, n) {
          I(e, t, n);
          for (let e = 0; e < i.length; e += 1) i[e].m(t, null);
        },
        p(e, r) {
          if (e.actions || e.getTestId || e.getRouteLink || e.$getTranslation) {
            let o;
            for (n = r.actions, o = 0; o < n.length; o += 1) {
              const a = Pr(r, n, o);
              i[o] ? i[o].p(e, a) : ((i[o] = Hr(a)), i[o].c(), i[o].m(t, null));
            }
            for (; o < i.length; o += 1) i[o].d(1);
            i.length = n.length;
          }
        },
        d(e) {
          e && T(t), N(i, e);
        }
      };
    }
    function Gr(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d = e.$getTranslation(e.node.label) + '';
      function u() {
        return e.click_handler_5(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            (i = k('span')),
            (r = $(d)),
            (a = P()),
            D(i, 'class', 'fd-menu__title'),
            D(n, 'href', (o = e.getRouteLink(e.node))),
            D(n, 'class', 'fd-menu__link'),
            D(t, 'class', 'fd-menu__item'),
            D(t, 'data-testid', (s = e.getTestId(e.node))),
            (c = [L(n, 'click', R(Yr)), L(t, 'click', u)]);
        },
        m(e, o) {
          I(e, t, o), x(t, n), x(n, i), x(i, r), x(t, a);
        },
        p(i, a) {
          (e = a),
            (i.$getTranslation || i.actions) && d !== (d = e.$getTranslation(e.node.label) + '') && O(r, d),
            (i.getRouteLink || i.actions) && o !== (o = e.getRouteLink(e.node)) && D(n, 'href', o),
            (i.getTestId || i.actions) && s !== (s = e.getTestId(e.node)) && D(t, 'data-testid', s);
        },
        d(e) {
          e && T(t), l(c);
        }
      };
    }
    function Hr(e) {
      var t,
        n = 'bottom' === e.node.position && Gr(e);
      return {
        c() {
          n && n.c(), (t = E());
        },
        m(e, i) {
          n && n.m(e, i), I(e, t, i);
        },
        p(e, i) {
          'bottom' === i.node.position
            ? n
              ? n.p(e, i)
              : ((n = Gr(i)).c(), n.m(t.parentNode, t))
            : n && (n.d(1), (n = null));
        },
        d(e) {
          n && n.d(e), e && T(t);
        }
      };
    }
    function qr(e) {
      var t,
        n,
        r,
        o,
        a,
        s,
        l = e.actions && e.actions.length && Rr(e),
        c = e.options && 0 === e.options.length && Or(),
        d = e.options && e.options.length && Vr(e),
        u = e.actions && e.actions.length && Wr(e);
      return {
        c() {
          (t = k('nav')),
            l && l.c(),
            (n = P()),
            (r = k('ul')),
            c && c.c(),
            (o = P()),
            d && d.c(),
            (a = P()),
            u && u.c(),
            D(r, 'class', 'fd-menu__list'),
            D(r, 'id', 'context_menu_middle'),
            D(
              t,
              'class',
              (s = 'fd-menu lui-ctx-switch-nav ' + (e.isMobile ? 'fd-menu--mobile' : '') + ' svelte-syxx60')
            );
        },
        m(e, i) {
          I(e, t, i),
            l && l.m(t, null),
            x(t, n),
            x(t, r),
            c && c.m(r, null),
            x(r, o),
            d && d.m(r, null),
            x(t, a),
            u && u.m(t, null);
        },
        p(e, i) {
          i.actions && i.actions.length ? (l ? l.p(e, i) : ((l = Rr(i)).c(), l.m(t, n))) : l && (l.d(1), (l = null)),
            i.options && 0 === i.options.length ? c || ((c = Or()).c(), c.m(r, o)) : c && (c.d(1), (c = null)),
            i.options && i.options.length
              ? d
                ? d.p(e, i)
                : ((d = Vr(i)).c(), d.m(r, null))
              : d && (d.d(1), (d = null)),
            i.actions && i.actions.length
              ? u
                ? u.p(e, i)
                : ((u = Wr(i)).c(), u.m(t, null))
              : u && (u.d(1), (u = null)),
            e.isMobile &&
              s !== (s = 'fd-menu lui-ctx-switch-nav ' + (i.isMobile ? 'fd-menu--mobile' : '') + ' svelte-syxx60') &&
              D(t, 'class', s);
        },
        i: i,
        o: i,
        d(e) {
          e && T(t), l && l.d(), c && c.d(), d && d.d(), u && u.d();
        }
      };
    }
    const Kr = () => {},
      Jr = () => {},
      Yr = () => {};
    function Qr(e, t, n) {
      let i;
      const r = Y();
      let {
        actions: o = [],
        config: a = {},
        customOptionsRenderer: s,
        options: l = [],
        selectedLabel: c,
        selectedOption: d,
        isMobile: u,
        getNodeName: f,
        getRouteLink: h,
        getTestId: g,
        getTranslation: m
      } = t;
      function v(e) {
        r('onActionClick', { node: e });
      }
      function b(e, t) {
        r('goToOption', { option: e, selectedOption: t });
      }
      p(e, m, e => {
        n('$getTranslation', (i = e));
      });
      return (
        (e.$set = e => {
          'actions' in e && n('actions', (o = e.actions)),
            'config' in e && n('config', (a = e.config)),
            'customOptionsRenderer' in e && n('customOptionsRenderer', (s = e.customOptionsRenderer)),
            'options' in e && n('options', (l = e.options)),
            'selectedLabel' in e && n('selectedLabel', (c = e.selectedLabel)),
            'selectedOption' in e && n('selectedOption', (d = e.selectedOption)),
            'isMobile' in e && n('isMobile', (u = e.isMobile)),
            'getNodeName' in e && n('getNodeName', (f = e.getNodeName)),
            'getRouteLink' in e && n('getRouteLink', (h = e.getRouteLink)),
            'getTestId' in e && n('getTestId', (g = e.getTestId)),
            'getTranslation' in e && n('getTranslation', (m = e.getTranslation));
        }),
        {
          actions: o,
          config: a,
          customOptionsRenderer: s,
          options: l,
          selectedLabel: c,
          selectedOption: d,
          isMobile: u,
          getNodeName: f,
          getRouteLink: h,
          getTestId: g,
          getTranslation: m,
          onActionClick: v,
          goToOption: b,
          $getTranslation: i,
          click_handler_1: ({ node: e }) => v(e),
          click_handler_3: ({ node: e }) => b(e, d),
          click_handler_5: ({ node: e }) => v(e)
        }
      );
    }
    var Xr = class extends Pe {
      constructor(e) {
        super(),
          $e(this, e, Qr, qr, d, [
            'actions',
            'config',
            'customOptionsRenderer',
            'options',
            'selectedLabel',
            'selectedOption',
            'isMobile',
            'getNodeName',
            'getRouteLink',
            'getTestId',
            'getTranslation',
            'onActionClick',
            'goToOption'
          ]);
      }
      get onActionClick() {
        return this.$$.ctx.onActionClick;
      }
      get goToOption() {
        return this.$$.ctx.goToOption;
      }
    };
    n(399);
    function Zr(e) {
      var t,
        n,
        i,
        r = !e.isMobile && eo(e),
        o = e.isMobile && e.dropDownStates.contextSwitcherPopover && e.renderAsDropdown && ro(e);
      return {
        c() {
          r && r.c(), (t = P()), o && o.c(), (n = E());
        },
        m(e, a) {
          r && r.m(e, a), I(e, t, a), o && o.m(e, a), I(e, n, a), (i = !0);
        },
        p(e, i) {
          i.isMobile
            ? r &&
              (me(),
              we(r, 1, 1, () => {
                r = null;
              }),
              ve())
            : r
            ? (r.p(e, i), be(r, 1))
            : ((r = eo(i)).c(), be(r, 1), r.m(t.parentNode, t)),
            i.isMobile && i.dropDownStates.contextSwitcherPopover && i.renderAsDropdown
              ? o
                ? (o.p(e, i), be(o, 1))
                : ((o = ro(i)).c(), be(o, 1), o.m(n.parentNode, n))
              : o &&
                (me(),
                we(o, 1, 1, () => {
                  o = null;
                }),
                ve());
        },
        i(e) {
          i || (be(r), be(o), (i = !0));
        },
        o(e) {
          we(r), we(o), (i = !1);
        },
        d(e) {
          r && r.d(e), e && T(t), o && o.d(e), e && T(n);
        }
      };
    }
    function eo(e) {
      var t, n, i, r, o, a, s, c, d, u, f, p;
      function h(e, t) {
        return t.selectedOption && t.customSelectedOptionRenderer ? io : t.selectedLabel ? to : no;
      }
      var g = h(0, e),
        m = g(e),
        v = new Xr({
          props: {
            actions: e.actions,
            config: e.config,
            customOptionsRenderer: e.customOptionsRenderer,
            options: e.options,
            selectedLabel: e.selectedLabel,
            selectedOption: e.selectedOption,
            getNodeName: lo,
            getRouteLink: e.getRouteLink,
            getTestId: co,
            getTranslation: e.getTranslation,
            isMobile: e.isMobile
          }
        });
      return (
        v.$on('onActionClick', e.onActionClick),
        v.$on('goToOption', e.goToOption),
        {
          c() {
            (t = k('div')),
              (n = k('div')),
              (i = k('div')),
              (r = k('button')),
              m.c(),
              (c = P()),
              (d = k('div')),
              v.$$.fragment.c(),
              D(
                r,
                'class',
                'fd-button fd-button--transparent fd-button--menu fd-shellbar__button--menu lui-ctx-switch-menu svelte-ukk530'
              ),
              D(r, 'aria-expanded', (o = e.dropDownStates.contextSwitcherPopover || !1)),
              D(r, 'aria-haspopup', 'true'),
              D(r, 'title', (a = e.selectedLabel ? e.selectedLabel : e.config.defaultLabel)),
              D(r, 'aria-disabled', (s = !e.renderAsDropdown)),
              D(r, 'data-testid', 'luigi-contextswitcher-button'),
              D(i, 'class', 'fd-popover__control'),
              D(d, 'class', 'fd-popover__body fd-popover__body--right svelte-ukk530'),
              D(d, 'aria-hidden', (u = !e.dropDownStates.contextSwitcherPopover)),
              D(d, 'id', 'contextSwitcherPopover'),
              D(d, 'data-testid', 'luigi-contextswitcher-popover'),
              D(n, 'class', 'fd-popover fd-popover--right svelte-ukk530'),
              D(t, 'class', 'fd-shellbar__action fd-shellbar__action--desktop'),
              (p = [L(r, 'click', e.click_handler), L(i, 'click', A(uo))]);
          },
          m(e, o) {
            I(e, t, o), x(t, n), x(n, i), x(i, r), m.m(r, null), x(n, c), x(n, d), Ne(v, d, null), (f = !0);
          },
          p(e, t) {
            g === (g = h(0, t)) && m ? m.p(e, t) : (m.d(1), (m = g(t)) && (m.c(), m.m(r, null))),
              (f && !e.dropDownStates) ||
                o === (o = t.dropDownStates.contextSwitcherPopover || !1) ||
                D(r, 'aria-expanded', o),
              (f && !e.selectedLabel && !e.config) ||
                a === (a = t.selectedLabel ? t.selectedLabel : t.config.defaultLabel) ||
                D(r, 'title', a),
              (f && !e.renderAsDropdown) || s === (s = !t.renderAsDropdown) || D(r, 'aria-disabled', s);
            var n = {};
            e.actions && (n.actions = t.actions),
              e.config && (n.config = t.config),
              e.customOptionsRenderer && (n.customOptionsRenderer = t.customOptionsRenderer),
              e.options && (n.options = t.options),
              e.selectedLabel && (n.selectedLabel = t.selectedLabel),
              e.selectedOption && (n.selectedOption = t.selectedOption),
              e.isMobile && (n.isMobile = t.isMobile),
              v.$set(n),
              (f && !e.dropDownStates) ||
                u === (u = !t.dropDownStates.contextSwitcherPopover) ||
                D(d, 'aria-hidden', u);
          },
          i(e) {
            f || (be(v.$$.fragment, e), (f = !0));
          },
          o(e) {
            we(v.$$.fragment, e), (f = !1);
          },
          d(e) {
            e && T(t), m.d(), ke(v), l(p);
          }
        }
      );
    }
    function to(e) {
      var t;
      return {
        c() {
          t = $(e.selectedLabel);
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, n) {
          e.selectedLabel && O(t, n.selectedLabel);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function no(e) {
      var t,
        n = e.$getTranslation(e.config.defaultLabel) + '';
      return {
        c() {
          t = $(n);
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          (e.$getTranslation || e.config) && n !== (n = i.$getTranslation(i.config.defaultLabel) + '') && O(t, n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function io(e) {
      var t,
        n = e.customSelectedOptionRenderer(e.selectedOption) + '';
      return {
        c() {
          t = new M(n, null);
        },
        m(e, n) {
          t.m(e, n);
        },
        p(e, i) {
          (e.customSelectedOptionRenderer || e.selectedOption) &&
            n !== (n = i.customSelectedOptionRenderer(i.selectedOption) + '') &&
            t.p(n);
        },
        d(e) {
          e && t.d();
        }
      };
    }
    function ro(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d,
        u,
        f,
        p,
        h,
        g,
        m,
        v,
        b = !e.selectedLabel && oo(e),
        w = e.selectedLabel && ao(e),
        S = new Xr({
          props: {
            actions: e.actions,
            config: e.config,
            customOptionsRenderer: e.customOptionsRenderer,
            options: e.options,
            selectedLabel: e.selectedLabel,
            selectedOption: e.selectedOption,
            getNodeName: lo,
            getRouteLink: e.getRouteLink,
            getTestId: co,
            getTranslation: e.getTranslation,
            isMobile: e.isMobile
          }
        });
      return (
        S.$on('onActionClick', e.onActionClick),
        S.$on('goToOption', e.goToOption),
        {
          c() {
            (t = k('div')),
              (n = k('div')),
              (i = k('div')),
              (r = k('div')),
              (o = k('div')),
              (a = k('h3')),
              b && b.c(),
              (s = P()),
              w && w.c(),
              (c = P()),
              (d = k('div')),
              S.$$.fragment.c(),
              (u = P()),
              (f = k('footer')),
              (p = k('div')),
              (h = k('div')),
              ((g = k('button')).textContent = 'Cancel'),
              D(a, 'class', 'fd-dialog__title'),
              D(o, 'class', 'fd-bar__element'),
              D(r, 'class', 'fd-bar__left'),
              D(i, 'class', 'fd-dialog__header fd-bar fd-bar--header'),
              D(d, 'class', 'fd-dialog__body fd-dialog__body--no-vertical-padding'),
              D(g, 'class', 'fd-button fd-button--light fd-dialog__decisive-button'),
              D(g, 'data-testid', 'mobile-topnav-close'),
              D(h, 'class', 'fd-bar__element'),
              D(p, 'class', 'fd-bar__right'),
              D(f, 'class', 'fd-dialog__footer fd-bar fd-bar--cosy fd-bar--footer'),
              D(n, 'class', 'fd-dialog__content fd-dialog__content--mobile'),
              D(t, 'class', 'fd-dialog fd-dialog--active'),
              (v = [L(g, 'click', e.toggleDropdownState), L(t, 'click', A(fo))]);
          },
          m(e, l) {
            I(e, t, l),
              x(t, n),
              x(n, i),
              x(i, r),
              x(r, o),
              x(o, a),
              b && b.m(a, null),
              x(a, s),
              w && w.m(a, null),
              x(n, c),
              x(n, d),
              Ne(S, d, null),
              x(n, u),
              x(n, f),
              x(f, p),
              x(p, h),
              x(h, g),
              (m = !0);
          },
          p(e, t) {
            t.selectedLabel ? b && (b.d(1), (b = null)) : b ? b.p(e, t) : ((b = oo(t)).c(), b.m(a, s)),
              t.selectedLabel ? (w ? w.p(e, t) : ((w = ao(t)).c(), w.m(a, null))) : w && (w.d(1), (w = null));
            var n = {};
            e.actions && (n.actions = t.actions),
              e.config && (n.config = t.config),
              e.customOptionsRenderer && (n.customOptionsRenderer = t.customOptionsRenderer),
              e.options && (n.options = t.options),
              e.selectedLabel && (n.selectedLabel = t.selectedLabel),
              e.selectedOption && (n.selectedOption = t.selectedOption),
              e.isMobile && (n.isMobile = t.isMobile),
              S.$set(n);
          },
          i(e) {
            m || (be(S.$$.fragment, e), (m = !0));
          },
          o(e) {
            we(S.$$.fragment, e), (m = !1);
          },
          d(e) {
            e && T(t), b && b.d(), w && w.d(), ke(S), l(v);
          }
        }
      );
    }
    function oo(e) {
      var t,
        n = e.$getTranslation(e.config.defaultLabel) + '';
      return {
        c() {
          t = $(n);
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          (e.$getTranslation || e.config) && n !== (n = i.$getTranslation(i.config.defaultLabel) + '') && O(t, n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function ao(e) {
      var t;
      return {
        c() {
          t = $(e.selectedLabel);
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, n) {
          e.selectedLabel && O(t, n.selectedLabel);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function so(e) {
      var t,
        n,
        i = e.contextSwitcherEnabled && Zr(e);
      return {
        c() {
          i && i.c(), (t = E());
        },
        m(e, r) {
          i && i.m(e, r), I(e, t, r), (n = !0);
        },
        p(e, n) {
          n.contextSwitcherEnabled
            ? i
              ? (i.p(e, n), be(i, 1))
              : ((i = Zr(n)).c(), be(i, 1), i.m(t.parentNode, t))
            : i &&
              (me(),
              we(i, 1, 1, () => {
                i = null;
              }),
              ve());
        },
        i(e) {
          n || (be(i), (n = !0));
        },
        o(e) {
          we(i), (n = !1);
        },
        d(e) {
          i && i.d(e), e && T(t);
        }
      };
    }
    function lo(e, t, n) {
      return e ? Promise.resolve(e) : $r.getFallbackLabel(t, n);
    }
    function co(e) {
      return e.testId ? e.testId : xt.prepareForTests(e.pathSegment, e.label);
    }
    const uo = () => {},
      fo = () => {};
    function po(e, t, n) {
      let i;
      const r = Y();
      let o,
        {
          contextSwitcherEnabled: a = !1,
          dropDownStates: s = {},
          selectedLabel: l = null,
          config: c = {},
          actions: d = [],
          options: u = null
        } = t,
        f = !0,
        {
          selectedOption: h,
          fallbackLabelResolver: g = null,
          pathParams: m,
          customOptionsRenderer: v,
          customSelectedOptionRenderer: b,
          isMobile: w,
          contextSwitcherToggle: S = !1,
          defaultLabel: y
        } = t,
        _ = X('getUnsavedChangesModalPromise'),
        C = X('store'),
        x = X('getTranslation');
      p(e, x, e => {
        n('$getTranslation', (i = e));
      });
      let I = !1;
      async function T() {
        n('options', (u = await $r.fetchOptions(u)));
        const e = c || {},
          t = e.parentNodePath,
          i = e.fallbackLabelResolver,
          r = ht.getCurrentPath();
        n('selectedOption', (h = await $r.getSelectedOption(r, u, t))),
          n('selectedLabel', (l = await $r.getSelectedLabel(r, u, t, i))),
          (o = e.preserveSubPathOnSwitch);
      }
      async function N(e) {
        const t = c || {},
          i = t.parentNodePath,
          r = t.fallbackLabelResolver;
        n('selectedOption', (h = await $r.getSelectedOption(e, u, i))),
          n('selectedLabel', (l = await $r.getSelectedLabel(e, u, i, r)));
      }
      function k(e) {
        _().then(() => {
          ht.navigateTo(e);
        });
      }
      function $() {
        r('toggleDropdownState');
        const e = s || {};
        JSON.parse(e.contextSwitcherPopover) && T();
      }
      q(async () => {
        Tt.doOnStoreChange(
          C,
          async () => {
            const e = Ze.getConfigValue('navigation.contextSwitcher');
            if (
              (n('contextSwitcherEnabled', (a = !!e)),
              a &&
                (n(
                  'customOptionsRenderer',
                  (v = _t.isFunction(e.customOptionsRenderer) ? e.customOptionsRenderer : void 0)
                ),
                n(
                  'customSelectedOptionRenderer',
                  (b = _t.isFunction(e.customSelectedOptionRenderer) ? e.customSelectedOptionRenderer : void 0)
                ),
                n('config', (c = e)),
                n('options', (u = void 0)),
                e))
            ) {
              n('alwaysShowDropdown', (f = !1 !== e.alwaysShowDropdown)),
                n('actions', (d = await Ze.getConfigValueAsync('navigation.contextSwitcher.actions')));
              const t = ht.getCurrentPath();
              n('fallbackLabelResolver', (g = e.fallbackLabelResolver)),
                $r.resetFallbackLabelCache(),
                e.lazyloadOptions || (await T()),
                $r.isContextSwitcherDetailsView(t, e.parentNodePath) && (await N(t));
            }
          },
          ['navigation.contextSwitcher']
        ),
          It.addRouteChangeListener(e => N(e)),
          Nt.addEventListener('message', e => {
            Ct.getValidMessageSource(e) &&
              e.data &&
              'luigi.refresh-context-switcher' === e.data.msg &&
              (n('options', (u = null)), T());
          }),
          n('defaultLabel', (y = c.defaultLabel));
      }),
        H(() => {
          I !== S && ((I = S), T());
        });
      let P;
      return (
        (e.$set = e => {
          'contextSwitcherEnabled' in e && n('contextSwitcherEnabled', (a = e.contextSwitcherEnabled)),
            'dropDownStates' in e && n('dropDownStates', (s = e.dropDownStates)),
            'selectedLabel' in e && n('selectedLabel', (l = e.selectedLabel)),
            'config' in e && n('config', (c = e.config)),
            'actions' in e && n('actions', (d = e.actions)),
            'options' in e && n('options', (u = e.options)),
            'selectedOption' in e && n('selectedOption', (h = e.selectedOption)),
            'fallbackLabelResolver' in e && n('fallbackLabelResolver', (g = e.fallbackLabelResolver)),
            'pathParams' in e && n('pathParams', (m = e.pathParams)),
            'customOptionsRenderer' in e && n('customOptionsRenderer', (v = e.customOptionsRenderer)),
            'customSelectedOptionRenderer' in e &&
              n('customSelectedOptionRenderer', (b = e.customSelectedOptionRenderer)),
            'isMobile' in e && n('isMobile', (w = e.isMobile)),
            'contextSwitcherToggle' in e && n('contextSwitcherToggle', (S = e.contextSwitcherToggle)),
            'defaultLabel' in e && n('defaultLabel', (y = e.defaultLabel));
        }),
        (e.$$.update = (e = { alwaysShowDropdown: 1, actions: 1, options: 1, selectedOption: 1 }) => {
          (e.alwaysShowDropdown || e.actions || e.options || e.selectedOption) &&
            n('renderAsDropdown', (P = f || (d && d.length > 0) || (u && u.length > 1) || !h));
        }),
        {
          contextSwitcherEnabled: a,
          dropDownStates: s,
          selectedLabel: l,
          config: c,
          actions: d,
          options: u,
          selectedOption: h,
          fallbackLabelResolver: g,
          pathParams: m,
          customOptionsRenderer: v,
          customSelectedOptionRenderer: b,
          isMobile: w,
          contextSwitcherToggle: S,
          defaultLabel: y,
          getTranslation: x,
          getRouteLink: function(e) {
            return It.getNodeHref(e, m);
          },
          fetchOptions: T,
          setSelectedContext: N,
          onActionClick: async function(e) {
            let t = e.detail.node;
            if (t.clickHandler) {
              if (!(await t.clickHandler(t))) return;
            }
            setTimeout(() => {
              k(t.link);
            }),
              w && r('toggleDropdownState');
          },
          goToPath: k,
          goToOption: function(e) {
            let t = e.detail.option,
              n = e.detail.selectedOption;
            _().then(() => {
              o && n ? ht.navigateTo($r.getNodePathFromCurrentPath(t, n)) : ht.navigateTo(t.link),
                w && r('toggleDropdownState');
            });
          },
          toggleDropdownState: $,
          renderAsDropdown: P,
          $getTranslation: i,
          click_handler: () => {
            P && $();
          }
        }
      );
    }
    var ho = class extends Pe {
      constructor(e) {
        super(),
          $e(this, e, po, so, d, [
            'contextSwitcherEnabled',
            'dropDownStates',
            'selectedLabel',
            'config',
            'actions',
            'options',
            'selectedOption',
            'fallbackLabelResolver',
            'pathParams',
            'customOptionsRenderer',
            'customSelectedOptionRenderer',
            'isMobile',
            'contextSwitcherToggle',
            'defaultLabel',
            'fetchOptions',
            'setSelectedContext',
            'onActionClick',
            'goToPath',
            'goToOption',
            'toggleDropdownState'
          ]);
      }
      get fetchOptions() {
        return this.$$.ctx.fetchOptions;
      }
      get setSelectedContext() {
        return this.$$.ctx.setSelectedContext;
      }
      get onActionClick() {
        return this.$$.ctx.onActionClick;
      }
      get goToPath() {
        return this.$$.ctx.goToPath;
      }
      get goToOption() {
        return this.$$.ctx.goToOption;
      }
      get toggleDropdownState() {
        return this.$$.ctx.toggleDropdownState;
      }
    };
    n(400);
    const { window: go } = xe;
    function mo(e, t, n) {
      const i = Object.create(e);
      return (i.productSwitcherItem = t[n]), i;
    }
    function vo(e) {
      var t,
        n,
        i,
        r = !e.isMobile && bo(e),
        o = e.isMobile && e.dropDownStates.productSwitcherPopover && Io(e);
      return {
        c() {
          r && r.c(), (t = P()), o && o.c(), (n = E());
        },
        m(e, a) {
          r && r.m(e, a), I(e, t, a), o && o.m(e, a), I(e, n, a), (i = !0);
        },
        p(e, i) {
          i.isMobile ? r && (r.d(1), (r = null)) : r ? r.p(e, i) : ((r = bo(i)).c(), r.m(t.parentNode, t)),
            i.isMobile && i.dropDownStates.productSwitcherPopover
              ? o
                ? (o.p(e, i), be(o, 1))
                : ((o = Io(i)).c(), be(o, 1), o.m(n.parentNode, n))
              : o &&
                (me(),
                we(o, 1, 1, () => {
                  o = null;
                }),
                ve());
        },
        i(e) {
          i || (be(o), (i = !0));
        },
        o(e) {
          we(o), (i = !1);
        },
        d(e) {
          r && r.d(e), e && T(t), o && o.d(e), e && T(n);
        }
      };
    }
    function bo(e) {
      var t, n, i, r, o, a, s, l, c, d, u;
      function f(e, t) {
        return (null == o || e.config) && (o = !!ko(t.config)), o ? So : wo;
      }
      var p = f(null, e),
        h = p(e);
      let g = e.productSwitcherItems,
        m = [];
      for (let t = 0; t < g.length; t += 1) m[t] = xo(mo(e, g, t));
      return {
        c() {
          (t = k('div')),
            (n = k('div')),
            (i = k('div')),
            (r = k('div')),
            h.c(),
            (a = P()),
            (s = k('div')),
            (l = k('div')),
            (c = k('ul'));
          for (let e = 0; e < m.length; e += 1) m[e].c();
          D(r, 'class', 'fd-popover__control'),
            D(c, 'class', 'fd-product-switch__list'),
            D(l, 'class', e.columnsClass),
            D(s, 'class', 'fd-popover__body fd-popover__body--right'),
            D(s, 'aria-hidden', (d = !e.dropDownStates.productSwitcherPopover)),
            D(s, 'id', 'productSwitcherPopover'),
            D(i, 'class', 'fd-popover fd-popover--right'),
            D(n, 'class', 'fd-product-switch'),
            D(t, 'class', 'fd-shellbar__action fd-shellbar__action--desktop'),
            (u = L(r, 'click', A(Lo)));
        },
        m(e, o) {
          I(e, t, o), x(t, n), x(n, i), x(i, r), h.m(r, null), x(i, a), x(i, s), x(s, l), x(l, c);
          for (let e = 0; e < m.length; e += 1) m[e].m(c, null);
        },
        p(e, t) {
          if (
            (p === (p = f(e, t)) && h ? h.p(e, t) : (h.d(1), (h = p(t)) && (h.c(), h.m(r, null))),
            e.productSwitcherItems || e.getTestId || e.getNodeSubtitle || e.getNodeLabel || e.hasOpenUIicon)
          ) {
            let n;
            for (g = t.productSwitcherItems, n = 0; n < g.length; n += 1) {
              const i = mo(t, g, n);
              m[n] ? m[n].p(e, i) : ((m[n] = xo(i)), m[n].c(), m[n].m(c, null));
            }
            for (; n < m.length; n += 1) m[n].d(1);
            m.length = g.length;
          }
          e.columnsClass && D(l, 'class', t.columnsClass),
            e.dropDownStates && d !== (d = !t.dropDownStates.productSwitcherPopover) && D(s, 'aria-hidden', d);
        },
        d(e) {
          e && T(t), h.d(), N(m, e), u();
        }
      };
    }
    function wo(e) {
      var t, n, i, r, o, a, s, l;
      return {
        c() {
          (t = k('button')),
            D((n = k('img')), 'src', (i = e.config.icon)),
            D(n, 'alt', (r = e.config.altText ? e.config.altText : '')),
            D(t, 'class', 'fd-button fd-button--transparent fd-product-switch__control'),
            D(t, 'aria-expanded', (o = e.dropDownStates.productSwitcherPopover || !1)),
            D(t, 'aria-haspopup', 'true'),
            D(t, 'title', (a = e.config.label)),
            D(t, 'data-testid', (s = Eo(e.config))),
            (l = L(t, 'click', A(e.toggleDropdownState)));
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, l) {
          e.config && i !== (i = l.config.icon) && D(n, 'src', i),
            e.config && r !== (r = l.config.altText ? l.config.altText : '') && D(n, 'alt', r),
            e.dropDownStates && o !== (o = l.dropDownStates.productSwitcherPopover || !1) && D(t, 'aria-expanded', o),
            e.config && a !== (a = l.config.label) && D(t, 'title', a),
            e.config && s !== (s = Eo(l.config)) && D(t, 'data-testid', s);
        },
        d(e) {
          e && T(t), l();
        }
      };
    }
    function So(e) {
      var t, n, i, r, o, a;
      return {
        c() {
          D(
            (t = k('button')),
            'class',
            (n = 'fd-button fd-button--transparent fd-product-switch__control sap-icon--' + e.config.icon)
          ),
            D(t, 'aria-expanded', (i = e.dropDownStates.productSwitcherPopover || !1)),
            D(t, 'aria-haspopup', 'true'),
            D(t, 'title', (r = e.config.label)),
            D(t, 'data-testid', (o = Eo(e.config))),
            (a = L(t, 'click', A(e.toggleDropdownState)));
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, a) {
          e.config &&
            n !== (n = 'fd-button fd-button--transparent fd-product-switch__control sap-icon--' + a.config.icon) &&
            D(t, 'class', n),
            e.dropDownStates && i !== (i = a.dropDownStates.productSwitcherPopover || !1) && D(t, 'aria-expanded', i),
            e.config && r !== (r = a.config.label) && D(t, 'title', r),
            e.config && o !== (o = Eo(a.config)) && D(t, 'data-testid', o);
        },
        d(e) {
          e && T(t), a();
        }
      };
    }
    function yo(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c,
        d,
        u,
        f,
        p = !ko(e.productSwitcherItem),
        h = $o(e.productSwitcherItem) + '',
        g = Po(e.productSwitcherItem),
        m = p && _o(e),
        v = g && Co(e);
      function b() {
        return e.click_handler_1(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('div')),
            m && m.c(),
            (r = P()),
            (o = k('div')),
            (a = k('div')),
            (s = $(h)),
            (l = P()),
            v && v.c(),
            (c = P()),
            D(
              n,
              'class',
              (i =
                'fd-product-switch__icon ' +
                (e.productSwitcherItem.icon && ko(e.productSwitcherItem)
                  ? 'sap-icon--' + e.productSwitcherItem.icon
                  : '') +
                ' svelte-k1m3jl')
            ),
            D(a, 'class', 'fd-product-switch__title'),
            D(o, 'class', 'fd-product-switch__text'),
            D(t, 'class', (d = 'fd-product-switch__item ' + (e.productSwitcherItem.selected ? 'selected' : ''))),
            D(t, 'data-testid', (u = Eo(e.productSwitcherItem))),
            (f = L(t, 'click', b));
        },
        m(e, i) {
          I(e, t, i),
            x(t, n),
            m && m.m(n, null),
            x(t, r),
            x(t, o),
            x(o, a),
            x(a, s),
            x(o, l),
            v && v.m(o, null),
            x(t, c);
        },
        p(r, a) {
          (e = a),
            r.productSwitcherItems && (p = !ko(e.productSwitcherItem)),
            p ? (m ? m.p(r, e) : ((m = _o(e)).c(), m.m(n, null))) : m && (m.d(1), (m = null)),
            r.productSwitcherItems &&
              i !==
                (i =
                  'fd-product-switch__icon ' +
                  (e.productSwitcherItem.icon && ko(e.productSwitcherItem)
                    ? 'sap-icon--' + e.productSwitcherItem.icon
                    : '') +
                  ' svelte-k1m3jl') &&
              D(n, 'class', i),
            r.productSwitcherItems && h !== (h = $o(e.productSwitcherItem) + '') && O(s, h),
            r.productSwitcherItems && (g = Po(e.productSwitcherItem)),
            g ? (v ? v.p(r, e) : ((v = Co(e)).c(), v.m(o, null))) : v && (v.d(1), (v = null)),
            r.productSwitcherItems &&
              d !== (d = 'fd-product-switch__item ' + (e.productSwitcherItem.selected ? 'selected' : '')) &&
              D(t, 'class', d),
            r.productSwitcherItems && u !== (u = Eo(e.productSwitcherItem)) && D(t, 'data-testid', u);
        },
        d(e) {
          e && T(t), m && m.d(), v && v.d(), f();
        }
      };
    }
    function _o(e) {
      var t, n, i;
      return {
        c() {
          D((t = k('img')), 'src', (n = e.productSwitcherItem.icon)),
            D(t, 'alt', (i = e.productSwitcherItem.altText ? e.productSwitcherItem.altText : '')),
            D(t, 'class', 'svelte-k1m3jl');
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, r) {
          e.productSwitcherItems && n !== (n = r.productSwitcherItem.icon) && D(t, 'src', n),
            e.productSwitcherItems &&
              i !== (i = r.productSwitcherItem.altText ? r.productSwitcherItem.altText : '') &&
              D(t, 'alt', i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Co(e) {
      var t,
        n,
        i = Po(e.productSwitcherItem) + '';
      return {
        c() {
          (t = k('div')), (n = $(i)), D(t, 'class', 'fd-product-switch__subtitle');
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, t) {
          e.productSwitcherItems && i !== (i = Po(t.productSwitcherItem) + '') && O(n, i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function xo(e) {
      var t,
        n = e.productSwitcherItem.label && yo(e);
      return {
        c() {
          n && n.c(), (t = E());
        },
        m(e, i) {
          n && n.m(e, i), I(e, t, i);
        },
        p(e, i) {
          i.productSwitcherItem.label
            ? n
              ? n.p(e, i)
              : ((n = yo(i)).c(), n.m(t.parentNode, t))
            : n && (n.d(1), (n = null));
        },
        d(e) {
          n && n.d(e), e && T(t);
        }
      };
    }
    function Io(e) {
      var t,
        n = new pr({
          props: {
            nodes: e.productSwitcherItems,
            label: e.config.label,
            hasOpenUIicon: ko,
            getNodeLabel: $o,
            getNodeSubtitle: Po,
            getTestId: Eo
          }
        });
      return (
        n.$on('click', e.toggleDropdownState),
        n.$on('listClick', e.onActionClickExternal),
        {
          c() {
            n.$$.fragment.c();
          },
          m(e, i) {
            Ne(n, e, i), (t = !0);
          },
          p(e, t) {
            var i = {};
            e.productSwitcherItems && (i.nodes = t.productSwitcherItems),
              e.config && (i.label = t.config.label),
              n.$set(i);
          },
          i(e) {
            t || (be(n.$$.fragment, e), (t = !0));
          },
          o(e) {
            we(n.$$.fragment, e), (t = !1);
          },
          d(e) {
            ke(n, e);
          }
        }
      );
    }
    function To(e) {
      var t,
        n,
        i,
        r = e.productSwitcherItems && e.productSwitcherItems.length && Object.keys(e.productSwitcherItems[0]).length,
        o = r && vo(e);
      return {
        c() {
          o && o.c(), (t = E()), (i = L(go, 'resize', No));
        },
        m(e, i) {
          o && o.m(e, i), I(e, t, i), (n = !0);
        },
        p(e, n) {
          e.productSwitcherItems &&
            (r =
              n.productSwitcherItems && n.productSwitcherItems.length && Object.keys(n.productSwitcherItems[0]).length),
            r
              ? o
                ? (o.p(e, n), be(o, 1))
                : ((o = vo(n)).c(), be(o, 1), o.m(t.parentNode, t))
              : o &&
                (me(),
                we(o, 1, 1, () => {
                  o = null;
                }),
                ve());
        },
        i(e) {
          n || (be(o), (n = !0));
        },
        o(e) {
          we(o), (n = !1);
        },
        d(e) {
          o && o.d(e), e && T(t), i();
        }
      };
    }
    function No() {
      let e = 0.01 * window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${e}px`);
    }
    function ko(e) {
      return xt.isOpenUIiconName(e.icon);
    }
    function $o(e) {
      return nt.getTranslation(e.label);
    }
    function Po(e) {
      return nt.getTranslation(e.subTitle);
    }
    function Eo(e) {
      return e.testId ? e.testId : xt.prepareForTests(e.label);
    }
    const Lo = () => {};
    function Ro(e, t, n) {
      const i = Y();
      let r,
        { productSwitcherItems: o, isMobile: a, config: s, dropDownStates: l } = t,
        c = X('store'),
        d = X('getUnsavedChangesModalPromise');
      function u(e) {
        d().then(() => {
          ht.navigateToLink(e);
        }),
          f();
      }
      function f() {
        i('toggleDropdownState');
      }
      q(async () => {
        Tt.doOnStoreChange(
          c,
          async () => {
            n('config', (s = xt.getProductSwitcherConfig())),
              s &&
                (n('productSwitcherItems', (o = await Ze.getConfigValueAsync('navigation.productSwitcher.items'))),
                3 === xt.getProductSwitcherColumnsNumber()
                  ? n('columnsClass', (r = 'fd-product-switch__body fd-product-switch__body--col-3'))
                  : n('columnsClass', (r = 'fd-product-switch__body'))),
              No();
          },
          ['navigation.productSwitcher']
        );
      });
      return (
        (e.$set = e => {
          'productSwitcherItems' in e && n('productSwitcherItems', (o = e.productSwitcherItems)),
            'isMobile' in e && n('isMobile', (a = e.isMobile)),
            'config' in e && n('config', (s = e.config)),
            'dropDownStates' in e && n('dropDownStates', (l = e.dropDownStates));
        }),
        {
          productSwitcherItems: o,
          isMobile: a,
          config: s,
          dropDownStates: l,
          columnsClass: r,
          onActionClick: u,
          onActionClickExternal: function(e) {
            u(e.detail);
          },
          toggleDropdownState: f,
          click_handler_1: ({ productSwitcherItem: e }) => u(e)
        }
      );
    }
    var Ao = class extends Pe {
      constructor(e) {
        super(),
          $e(this, e, Ro, To, d, [
            'productSwitcherItems',
            'isMobile',
            'config',
            'dropDownStates',
            'onActionClick',
            'onActionClickExternal',
            'toggleDropdownState',
            'setViewportHeightVariable'
          ]);
      }
      get onActionClick() {
        return this.$$.ctx.onActionClick;
      }
      get onActionClickExternal() {
        return this.$$.ctx.onActionClickExternal;
      }
      get toggleDropdownState() {
        return this.$$.ctx.toggleDropdownState;
      }
      get setViewportHeightVariable() {
        return No;
      }
    };
    n(401);
    function Do(e, t, n) {
      const i = Object.create(e);
      return (i.result = t[n]), (i.index = n), i;
    }
    function Oo(e) {
      var t;
      return {
        c() {
          t = k('div');
        },
        m(n, i) {
          I(n, t, i), e.div_binding(t);
        },
        p: i,
        d(n) {
          n && T(t), e.div_binding(null);
        }
      };
    }
    function Vo(e) {
      var t,
        n,
        i,
        r = e.searchResult && Mo(e);
      return {
        c() {
          (t = k('div')),
            (n = k('nav')),
            r && r.c(),
            D(n, 'class', 'fd-menu svelte-1i1w6fs'),
            D(t, 'class', 'fd-popover__body fd-popover__body--right luigi-search-popover__body svelte-1i1w6fs'),
            D(t, 'aria-hidden', (i = !e.displaySearchResult));
        },
        m(e, i) {
          I(e, t, i), x(t, n), r && r.m(n, null);
        },
        p(e, o) {
          o.searchResult ? (r ? r.p(e, o) : ((r = Mo(o)).c(), r.m(n, null))) : r && (r.d(1), (r = null)),
            e.displaySearchResult && i !== (i = !o.displaySearchResult) && D(t, 'aria-hidden', i);
        },
        d(e) {
          e && T(t), r && r.d();
        }
      };
    }
    function Mo(e) {
      var t;
      let n = e.searchResult,
        i = [];
      for (let t = 0; t < n.length; t += 1) i[t] = Uo(Do(e, n, t));
      return {
        c() {
          t = k('ul');
          for (let e = 0; e < i.length; e += 1) i[e].c();
          D(t, 'class', 'fd-menu__list fd-menu__list--top');
        },
        m(n, r) {
          I(n, t, r);
          for (let e = 0; e < i.length; e += 1) i[e].m(t, null);
          e.ul_binding(t);
        },
        p(e, r) {
          if (
            e.isCustomSearchResultItemRenderer ||
            e.searchResult ||
            e.renderCustomSearchItem ||
            e.luigiCustomSearchItemRenderer__slotContainer
          ) {
            let o;
            for (n = r.searchResult, o = 0; o < n.length; o += 1) {
              const a = Do(r, n, o);
              i[o] ? i[o].p(e, a) : ((i[o] = Uo(a)), i[o].c(), i[o].m(t, null));
            }
            for (; o < i.length; o += 1) i[o].d(1);
            i.length = n.length;
          }
        },
        d(n) {
          n && T(t), N(i, n), e.ul_binding(null);
        }
      };
    }
    function Fo(e) {
      var t,
        n = e.renderCustomSearchItem(e.result, e.luigiCustomSearchItemRenderer__slotContainer, e.index) + '';
      return {
        c() {
          t = new M(n, null);
        },
        m(e, n) {
          t.m(e, n);
        },
        p(e, i) {
          (e.searchResult || e.luigiCustomSearchItemRenderer__slotContainer) &&
            n !==
              (n = i.renderCustomSearchItem(i.result, i.luigiCustomSearchItemRenderer__slotContainer, i.index) + '') &&
            t.p(n);
        },
        d(e) {
          e && t.d();
        }
      };
    }
    function jo(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c = e.result.label + '',
        d = e.result.description + '';
      return {
        c() {
          (t = k('a')),
            (n = k('div')),
            (i = k('div')),
            (r = $(c)),
            (o = P()),
            (a = k('div')),
            (s = $(d)),
            D(i, 'class', 'fd-product-switch__title svelte-1i1w6fs'),
            D(a, 'class', 'fd-product-switch__subtitle'),
            D(n, 'class', 'fd-product-switch__text'),
            D(t, 'class', 'fd-menu__link svelte-1i1w6fs'),
            (l = L(t, 'click', R(zo)));
        },
        m(e, l) {
          I(e, t, l), x(t, n), x(n, i), x(i, r), x(n, o), x(n, a), x(a, s);
        },
        p(e, t) {
          e.searchResult && c !== (c = t.result.label + '') && O(r, c),
            e.searchResult && d !== (d = t.result.description + '') && O(s, d);
        },
        d(e) {
          e && T(t), l();
        }
      };
    }
    function Uo(e) {
      var t, n, i;
      function r(e, t) {
        return t.isCustomSearchResultItemRenderer ? Fo : jo;
      }
      var o = r(0, e),
        a = o(e);
      function s(...t) {
        return e.click_handler_1(e, ...t);
      }
      function c(...t) {
        return e.keyup_handler_1(e, ...t);
      }
      return {
        c() {
          (t = k('li')),
            a.c(),
            (n = P()),
            D(t, 'class', 'fd-menu__item luigi-search-result-item__' + e.index + ' svelte-1i1w6fs'),
            D(t, 'tabindex', '0'),
            (i = [L(t, 'click', s), L(t, 'keyup', c)]);
        },
        m(e, i) {
          I(e, t, i), a.m(t, null), x(t, n);
        },
        p(i, s) {
          o === (o = r(0, (e = s))) && a ? a.p(i, e) : (a.d(1), (a = o(e)) && (a.c(), a.m(t, n)));
        },
        d(e) {
          e && T(t), a.d(), l(i);
        }
      };
    }
    function Bo(e) {
      var t, n, r, o, a, s, c, d, u, f, p, h, g, m;
      function v(e, t) {
        return t.isCustomSearchRenderer ? Oo : Vo;
      }
      var b = v(0, e),
        w = b(e);
      return {
        c() {
          (t = k('div')),
            (n = k('div')),
            (r = k('div')),
            (o = k('div')),
            (a = k('input')),
            (s = P()),
            w.c(),
            (u = P()),
            (f = k('div')),
            (p = k('div')),
            (h = k('button')),
            D(a, 'type', 'text'),
            D(
              a,
              'class',
              'fd-input fd-input-group__input fd-shellbar__input-group__input luigi-search__input svelte-1i1w6fs'
            ),
            D(a, 'data-testid', 'luigi-search-input'),
            (a.autofocus = !0),
            D(o, 'class', 'fd-input-group fd-shellbar__input-group'),
            D(r, 'class', 'fd-popover__control luigi-search svelte-1i1w6fs'),
            D(r, 'aria-hidden', (c = !e.isSearchFieldVisible)),
            D(r, 'aria-haspopup', 'true'),
            D(n, 'class', 'fd-popover svelte-1i1w6fs'),
            D(
              t,
              'class',
              (d =
                'fd-shellbar__action ' +
                (e.isSearchFieldVisible ? 'luigi-search-shell__mobile' : '') +
                ' svelte-1i1w6fs')
            ),
            D(h, 'class', 'fd-button fd-shellbar__button sap-icon--search'),
            D(h, 'aria-haspopup', 'true'),
            D(h, 'aria-expanded', (g = !e.isSearchFieldVisible)),
            D(h, 'data-testid', 'luigi-search-btn-desktop'),
            D(f, 'class', 'fd-shellbar__action fd-shellbar__action--desktop'),
            (m = [
              L(window, 'click', e.closeSearchResult),
              L(window, 'blur', e.closeSearchResult),
              L(a, 'keyup', e.keyup_handler),
              L(r, 'click', A(Wo)),
              L(h, 'click', e.toggleSearch),
              L(p, 'click', A(Go))
            ]);
        },
        m(i, l) {
          I(i, t, l),
            x(t, n),
            x(n, r),
            x(r, o),
            x(o, a),
            e.input_binding(a),
            x(r, s),
            w.m(r, null),
            I(i, u, l),
            I(i, f, l),
            x(f, p),
            x(p, h),
            a.focus();
        },
        p(e, n) {
          b === (b = v(0, n)) && w ? w.p(e, n) : (w.d(1), (w = b(n)) && (w.c(), w.m(r, null))),
            e.isSearchFieldVisible && c !== (c = !n.isSearchFieldVisible) && D(r, 'aria-hidden', c),
            e.isSearchFieldVisible &&
              d !==
                (d =
                  'fd-shellbar__action ' +
                  (n.isSearchFieldVisible ? 'luigi-search-shell__mobile' : '') +
                  ' svelte-1i1w6fs') &&
              D(t, 'class', d),
            e.isSearchFieldVisible && g !== (g = !n.isSearchFieldVisible) && D(h, 'aria-expanded', g);
        },
        i: i,
        o: i,
        d(n) {
          n && T(t), e.input_binding(null), w.d(), n && (T(u), T(f)), l(m);
        }
      };
    }
    const zo = () => {},
      Wo = () => {},
      Go = () => {};
    function Ho(e, t, n) {
      let {
        isSearchFieldVisible: i,
        searchResult: r = [],
        displaySearchResult: o,
        displayCustomSearchResult: a,
        inputElem: s,
        luigiCustomSearchRenderer__slot: l,
        luigiCustomSearchItemRenderer__slotContainer: c
      } = t;
      const d = Y(),
        u = {
          fireItemSelected: e => {
            f.searchProvider.onSearchResultItemSelected(e);
          }
        };
      let f, p, h;
      function g({ keyCode: e }) {
        f
          ? _t.isFunction(f.searchProvider.onEnter) && e === Dt
            ? f.searchProvider.onEnter()
            : _t.isFunction(f.searchProvider.onEscape) && e === Ot
            ? f.searchProvider.onEscape()
            : e === At
            ? o &&
              (document
                .querySelector('.luigi-search-result-item__0')
                .childNodes[0].setAttribute('aria-selected', 'true'),
              document.querySelector('.luigi-search-result-item__0').focus())
            : _t.isFunction(f.searchProvider.onInput) && f.searchProvider.onInput()
          : console.warn('GlobalSearch is not available.');
      }
      function m(e) {
        f && _t.isFunction(f.searchProvider.onSearchResultItemSelected)
          ? f.searchProvider.onSearchResultItemSelected(e)
          : _t.isFunction(f.searchProvider.onEscape) && event.keyCode === Ot && f.searchProvider.onEscape();
      }
      function v(e, { keyCode: t }) {
        t === Dt && f.searchProvider.onSearchResultItemSelected(e),
          t === Rt || t === At
            ? (function(e) {
                let t = c.children;
                if (t)
                  for (let n = 0; n < t.length; n++) {
                    let i,
                      { childNodes: r, nextSibling: o, previousSibling: a } = t[n];
                    if ('true' === r[0].getAttribute('aria-selected')) {
                      e === At && (i = null !== o ? o : t[0]),
                        e === Rt && (i = null !== a ? a : t[t.length - 1]),
                        r[0].setAttribute('aria-selected', 'false'),
                        i.childNodes[0].setAttribute('aria-selected', 'true'),
                        i.focus();
                      break;
                    }
                  }
              })(t)
            : _t.isFunction(f.searchProvider.onEscape) &&
              t === Ot &&
              (!(function() {
                let e = c.children;
                if (e)
                  for (let t = 0; t < e.length; t++) {
                    let n = e[t];
                    'true' === n.childNodes[0].getAttribute('aria-selected') &&
                      n.childNodes[0].setAttribute('aria-selected', 'false');
                  }
              })(),
              setTimeout(() => {
                s.focus();
              }),
              f.searchProvider.onEscape());
      }
      q(async () => {
        f = await Ze.getConfigValueAsync('globalSearch');
        n('isCustomSearchRenderer', (p = _t.isFunction(f.searchProvider.customSearchResultRenderer))),
          n('isCustomSearchResultItemRenderer', (h = _t.isFunction(f.searchProvider.customSearchResultItemRenderer)));
      });
      return (
        (e.$set = e => {
          'isSearchFieldVisible' in e && n('isSearchFieldVisible', (i = e.isSearchFieldVisible)),
            'searchResult' in e && n('searchResult', (r = e.searchResult)),
            'displaySearchResult' in e && n('displaySearchResult', (o = e.displaySearchResult)),
            'displayCustomSearchResult' in e && n('displayCustomSearchResult', (a = e.displayCustomSearchResult)),
            'inputElem' in e && n('inputElem', (s = e.inputElem)),
            'luigiCustomSearchRenderer__slot' in e &&
              n('luigiCustomSearchRenderer__slot', (l = e.luigiCustomSearchRenderer__slot)),
            'luigiCustomSearchItemRenderer__slotContainer' in e &&
              n('luigiCustomSearchItemRenderer__slotContainer', (c = e.luigiCustomSearchItemRenderer__slotContainer));
        }),
        {
          isSearchFieldVisible: i,
          searchResult: r,
          displaySearchResult: o,
          displayCustomSearchResult: a,
          inputElem: s,
          luigiCustomSearchRenderer__slot: l,
          luigiCustomSearchItemRenderer__slotContainer: c,
          isCustomSearchRenderer: p,
          isCustomSearchResultItemRenderer: h,
          renderCustomSearchItem: function(e, t, n) {
            return (
              setTimeout(() => {
                f.searchProvider.customSearchResultItemRenderer(e, t.children[n], u);
              }),
              ''
            );
          },
          closeSearchResult: function() {
            d('closeSearchResult');
          },
          onKeyUp: g,
          onSearchResultItemSelected: m,
          handleKeydown: v,
          onActionClick: function(e) {
            let t = e.pathObject;
            t.externalLink ? ht.navigateToLink(t) : d('handleSearchNavigation', { node: t });
          },
          toggleSearch: function() {
            i
              ? n('displaySearchResult', (o = !1))
              : setTimeout(() => {
                  s && s.focus();
                }),
              d('toggleSearch', { isSearchFieldVisible: i, inputElem: s, luigiCustomSearchRenderer__slot: l });
          },
          input_binding: function(e) {
            te[e ? 'unshift' : 'push'](() => {
              n('inputElem', (s = e));
            });
          },
          keyup_handler: e => g(e),
          click_handler_1: ({ result: e }, t) => m(e),
          keyup_handler_1: ({ result: e }, t) => v(e, t),
          ul_binding: function(e) {
            te[e ? 'unshift' : 'push'](() => {
              n('luigiCustomSearchItemRenderer__slotContainer', (c = e));
            });
          },
          div_binding: function(e) {
            te[e ? 'unshift' : 'push'](() => {
              n('luigiCustomSearchRenderer__slot', (l = e));
            });
          }
        }
      );
    }
    var qo = class extends Pe {
      constructor(e) {
        super(),
          $e(this, e, Ho, Bo, d, [
            'isSearchFieldVisible',
            'searchResult',
            'displaySearchResult',
            'displayCustomSearchResult',
            'inputElem',
            'luigiCustomSearchRenderer__slot',
            'luigiCustomSearchItemRenderer__slotContainer',
            'onActionClick',
            'toggleSearch'
          ]);
      }
      get onActionClick() {
        return this.$$.ctx.onActionClick;
      }
      get toggleSearch() {
        return this.$$.ctx.toggleSearch;
      }
    };
    n(402);
    const { Boolean: Ko, Object: Jo, window: Yo } = xe;
    function Qo(e, t, n) {
      const i = Jo.create(e);
      return (i.node = t[n]), (i.i = n), i;
    }
    function Xo(e, t, n) {
      const i = Jo.create(e);
      return (i.node = t[n]), (i.i = n), i;
    }
    function Zo(e) {
      var t,
        n = new rr({ props: { isHidden: !0 } });
      return (
        n.$on('toggleDropdownState', e.toggleDropdownState_handler_5),
        {
          c() {
            n.$$.fragment.c();
          },
          m(e, i) {
            Ne(n, e, i), (t = !0);
          },
          p: i,
          i(e) {
            t || (be(n.$$.fragment, e), (t = !0));
          },
          o(e) {
            we(n.$$.fragment, e), (t = !1);
          },
          d(e) {
            ke(n, e);
          }
        }
      );
    }
    function ea(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c,
        d,
        u,
        f =
          ('simple' === e.responsiveNavSetting ||
            'simpleMobileOnly' === e.responsiveNavSetting ||
            'Fiori3' === e.responsiveNavSetting) &&
          ta(e);
      function p(t) {
        e.logotitle_dropDownStates_binding.call(null, t), (r = !0), ce(() => (r = !1));
      }
      let h = { pathData: e.pathData, pathParams: e.pathParams };
      void 0 !== e.dropDownStates && (h.dropDownStates = e.dropDownStates);
      var g = new Oi({ props: h });
      te.push(() => Te(g, 'dropDownStates', p)),
        g.$on('toggleDropdownState', e.toggleDropdownStateExternal),
        g.$on('handleClick', e.handleClickExternal);
      var m = (!e.authorizationEnabled || e.isLoggedIn) && na(e),
        v = e.children && e.pathData.length > 0 && ra(e),
        b = (e.authorizationEnabled || e.profileItemsAvailable) && La(e),
        w = e.isProductSwitcherAvailable && Ra(e);
      return {
        c() {
          (t = k('div')),
            (n = k('div')),
            f && f.c(),
            (i = P()),
            g.$$.fragment.c(),
            (o = P()),
            (a = k('div')),
            m && m.c(),
            (s = P()),
            v && v.c(),
            (l = P()),
            b && b.c(),
            (c = P()),
            w && w.c(),
            D(n, 'class', 'fd-shellbar__group fd-shellbar__group--product'),
            D(a, 'class', 'fd-shellbar__group fd-shellbar__group--actions'),
            D(t, 'class', (d = 'fd-shellbar ' + (e.hideNavComponent ? 'hideNavComponent' : '') + ' svelte-1ymj575'));
        },
        m(e, r) {
          I(e, t, r),
            x(t, n),
            f && f.m(n, null),
            x(n, i),
            Ne(g, n, null),
            x(t, o),
            x(t, a),
            m && m.m(a, null),
            x(a, s),
            v && v.m(a, null),
            x(a, l),
            b && b.m(a, null),
            x(a, c),
            w && w.m(a, null),
            (u = !0);
        },
        p(e, o) {
          'simple' === o.responsiveNavSetting ||
          'simpleMobileOnly' === o.responsiveNavSetting ||
          'Fiori3' === o.responsiveNavSetting
            ? f || ((f = ta(o)).c(), f.m(n, i))
            : f && (f.d(1), (f = null));
          var p = {};
          e.pathData && (p.pathData = o.pathData),
            e.pathParams && (p.pathParams = o.pathParams),
            !r && e.dropDownStates && (p.dropDownStates = o.dropDownStates),
            g.$set(p),
            !o.authorizationEnabled || o.isLoggedIn
              ? m
                ? (m.p(e, o), be(m, 1))
                : ((m = na(o)).c(), be(m, 1), m.m(a, s))
              : m &&
                (me(),
                we(m, 1, 1, () => {
                  m = null;
                }),
                ve()),
            o.children && o.pathData.length > 0
              ? v
                ? (v.p(e, o), be(v, 1))
                : ((v = ra(o)).c(), be(v, 1), v.m(a, l))
              : v &&
                (me(),
                we(v, 1, 1, () => {
                  v = null;
                }),
                ve()),
            o.authorizationEnabled || o.profileItemsAvailable
              ? b
                ? (b.p(e, o), be(b, 1))
                : ((b = La(o)).c(), be(b, 1), b.m(a, c))
              : b &&
                (me(),
                we(b, 1, 1, () => {
                  b = null;
                }),
                ve()),
            o.isProductSwitcherAvailable
              ? w
                ? (w.p(e, o), be(w, 1))
                : ((w = Ra(o)).c(), be(w, 1), w.m(a, null))
              : w &&
                (me(),
                we(w, 1, 1, () => {
                  w = null;
                }),
                ve()),
            (u && !e.hideNavComponent) ||
              d === (d = 'fd-shellbar ' + (o.hideNavComponent ? 'hideNavComponent' : '') + ' svelte-1ymj575') ||
              D(t, 'class', d);
        },
        i(e) {
          u || (be(g.$$.fragment, e), be(m), be(v), be(b), be(w), (u = !0));
        },
        o(e) {
          we(g.$$.fragment, e), we(m), we(v), we(b), we(w), (u = !1);
        },
        d(e) {
          e && T(t), f && f.d(), ke(g), m && m.d(), v && v.d(), b && b.d(), w && w.d();
        }
      };
    }
    function ta(e) {
      var t, n;
      return {
        c() {
          D((t = k('span')), 'class', 'sap-icon--menu2 lui-burger svelte-1ymj575'),
            (n = L(t, 'click', e.burgerClickHandler));
        },
        m(e, n) {
          I(e, t, n);
        },
        d(e) {
          e && T(t), n();
        }
      };
    }
    function na(e) {
      var t,
        n,
        i,
        r = e.isGlobalSearchAvailable && ia(e);
      function o(t) {
        e.contextswitcher_dropDownStates_binding.call(null, t), (n = !0), ce(() => (n = !1));
      }
      let a = { isMobile: !1 };
      void 0 !== e.dropDownStates && (a.dropDownStates = e.dropDownStates);
      var s = new ho({ props: a });
      return (
        te.push(() => Te(s, 'dropDownStates', o)),
        s.$on('toggleDropdownState', e.toggleDropdownState_handler),
        {
          c() {
            r && r.c(), (t = P()), s.$$.fragment.c();
          },
          m(e, n) {
            r && r.m(e, n), I(e, t, n), Ne(s, e, n), (i = !0);
          },
          p(e, i) {
            i.isGlobalSearchAvailable
              ? r
                ? (r.p(e, i), be(r, 1))
                : ((r = ia(i)).c(), be(r, 1), r.m(t.parentNode, t))
              : r &&
                (me(),
                we(r, 1, 1, () => {
                  r = null;
                }),
                ve());
            var o = {};
            !n && e.dropDownStates && (o.dropDownStates = i.dropDownStates), s.$set(o);
          },
          i(e) {
            i || (be(r), be(s.$$.fragment, e), (i = !0));
          },
          o(e) {
            we(r), we(s.$$.fragment, e), (i = !1);
          },
          d(e) {
            r && r.d(e), e && T(t), ke(s, e);
          }
        }
      );
    }
    function ia(e) {
      var t, n, i, r, o, a, s;
      function l(n) {
        e.globalsearch_isSearchFieldVisible_binding.call(null, n), (t = !0), ce(() => (t = !1));
      }
      function c(t) {
        e.globalsearch_searchResult_binding.call(null, t), (n = !0), ce(() => (n = !1));
      }
      function d(t) {
        e.globalsearch_displaySearchResult_binding.call(null, t), (i = !0), ce(() => (i = !1));
      }
      function u(t) {
        e.globalsearch_displayCustomSearchResult_binding.call(null, t), (r = !0), ce(() => (r = !1));
      }
      function f(t) {
        e.globalsearch_inputElem_binding.call(null, t), (o = !0), ce(() => (o = !1));
      }
      function p(t) {
        e.globalsearch_luigiCustomSearchRenderer__slot_binding.call(null, t), (a = !0), ce(() => (a = !1));
      }
      let h = {};
      void 0 !== e.isSearchFieldVisible && (h.isSearchFieldVisible = e.isSearchFieldVisible),
        void 0 !== e.searchResult && (h.searchResult = e.searchResult),
        void 0 !== e.displaySearchResult && (h.displaySearchResult = e.displaySearchResult),
        void 0 !== e.displayCustomSearchResult && (h.displayCustomSearchResult = e.displayCustomSearchResult),
        void 0 !== e.inputElem && (h.inputElem = e.inputElem),
        void 0 !== e.luigiCustomSearchRenderer__slot &&
          (h.luigiCustomSearchRenderer__slot = e.luigiCustomSearchRenderer__slot);
      var g = new qo({ props: h });
      return (
        te.push(() => Te(g, 'isSearchFieldVisible', l)),
        te.push(() => Te(g, 'searchResult', c)),
        te.push(() => Te(g, 'displaySearchResult', d)),
        te.push(() => Te(g, 'displayCustomSearchResult', u)),
        te.push(() => Te(g, 'inputElem', f)),
        te.push(() => Te(g, 'luigiCustomSearchRenderer__slot', p)),
        g.$on('toggleSearch', e.toggleSearch_handler),
        g.$on('handleSearchNavigation', e.handleSearchNavigation_handler),
        g.$on('closeSearchResult', e.closeSearchResult_handler),
        {
          c() {
            g.$$.fragment.c();
          },
          m(e, t) {
            Ne(g, e, t), (s = !0);
          },
          p(e, s) {
            var l = {};
            !t && e.isSearchFieldVisible && (l.isSearchFieldVisible = s.isSearchFieldVisible),
              !n && e.searchResult && (l.searchResult = s.searchResult),
              !i && e.displaySearchResult && (l.displaySearchResult = s.displaySearchResult),
              !r && e.displayCustomSearchResult && (l.displayCustomSearchResult = s.displayCustomSearchResult),
              !o && e.inputElem && (l.inputElem = s.inputElem),
              !a &&
                e.luigiCustomSearchRenderer__slot &&
                (l.luigiCustomSearchRenderer__slot = s.luigiCustomSearchRenderer__slot),
              g.$set(l);
          },
          i(e) {
            s || (be(g.$$.fragment, e), (s = !0));
          },
          o(e) {
            we(g.$$.fragment, e), (s = !1);
          },
          d(e) {
            ke(g, e);
          }
        }
      );
    }
    function ra(e) {
      var t, n, i;
      let r = e.children,
        o = [];
      for (let t = 0; t < r.length; t += 1) o[t] = ma(Xo(e, r, t));
      const a = e =>
        we(o[e], 1, 1, () => {
          o[e] = null;
        });
      var s = (e.visibleNodeCount > 0 || e.isProductSwitcherAvailable || e.contextSwitcherConfig) && va(e);
      return {
        c() {
          for (let e = 0; e < o.length; e += 1) o[e].c();
          (t = P()), s && s.c(), (n = E());
        },
        m(e, r) {
          for (let t = 0; t < o.length; t += 1) o[t].m(e, r);
          I(e, t, r), s && s.m(e, r), I(e, n, r), (i = !0);
        },
        p(e, i) {
          if (
            e.children ||
            e.dropDownStates ||
            e.pathParams ||
            e.getNodeLabel ||
            e.selectedNode ||
            e.getTestId ||
            e.hasOpenUIicon
          ) {
            let n;
            for (r = i.children, n = 0; n < r.length; n += 1) {
              const a = Xo(i, r, n);
              o[n] ? (o[n].p(e, a), be(o[n], 1)) : ((o[n] = ma(a)), o[n].c(), be(o[n], 1), o[n].m(t.parentNode, t));
            }
            for (me(), n = r.length; n < o.length; n += 1) a(n);
            ve();
          }
          i.visibleNodeCount > 0 || i.isProductSwitcherAvailable || i.contextSwitcherConfig
            ? s
              ? (s.p(e, i), be(s, 1))
              : ((s = va(i)).c(), be(s, 1), s.m(n.parentNode, n))
            : s &&
              (me(),
              we(s, 1, 1, () => {
                s = null;
              }),
              ve());
        },
        i(e) {
          if (!i) {
            for (let e = 0; e < r.length; e += 1) be(o[e]);
            be(s), (i = !0);
          }
        },
        o(e) {
          o = o.filter(Ko);
          for (let e = 0; e < o.length; e += 1) we(o[e]);
          we(s), (i = !1);
        },
        d(e) {
          N(o, e), e && T(t), s && s.d(e), e && T(n);
        }
      };
    }
    function oa(e) {
      var t,
        n,
        i,
        r,
        o = [sa, aa],
        a = [];
      function s(e, t) {
        return t.node.isCat ? 0 : 1;
      }
      return (
        (t = s(0, e)),
        (n = a[t] = o[t](e)),
        {
          c() {
            n.c(), (i = E());
          },
          m(e, n) {
            a[t].m(e, n), I(e, i, n), (r = !0);
          },
          p(e, r) {
            var l = t;
            (t = s(0, r)) === l
              ? a[t].p(e, r)
              : (me(),
                we(a[l], 1, 1, () => {
                  a[l] = null;
                }),
                ve(),
                (n = a[t]) || (n = a[t] = o[t](r)).c(),
                be(n, 1),
                n.m(i.parentNode, i));
          },
          i(e) {
            r || (be(n), (r = !0));
          },
          o(e) {
            we(n), (r = !1);
          },
          d(e) {
            a[t].d(e), e && T(i);
          }
        }
      );
    }
    function aa(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c,
        d,
        u = e.node.icon && la(e),
        f = (!e.node.icon || e.node.showLabel) && ua(e),
        p = new un({ props: { node: e.node } });
      function h() {
        return e.click_handler_2(e);
      }
      return {
        c() {
          (t = k('div')),
            (n = k('button')),
            u && u.c(),
            (i = P()),
            f && f.c(),
            (r = P()),
            p.$$.fragment.c(),
            (l = P()),
            D(n, 'title', (o = Oa(e.node))),
            D(
              n,
              'class',
              (a =
                'fd-shellbar__button fd-button ' + (e.node === e.selectedNode ? 'is-selected' : '') + ' svelte-1ymj575')
            ),
            D(n, 'aria-controls', '0AcWE812'),
            D(n, 'aria-expanded', 'false'),
            D(n, 'aria-haspopup', 'true'),
            D(n, 'data-testid', (s = Va(e.node))),
            D(t, 'class', 'fd-shellbar__action fd-shellbar__action--hide fd-shellbar__action--desktop'),
            (d = L(n, 'click', h));
        },
        m(e, o) {
          I(e, t, o),
            x(t, n),
            u && u.m(n, null),
            x(n, i),
            f && f.m(n, null),
            x(n, r),
            Ne(p, n, null),
            x(t, l),
            (c = !0);
        },
        p(t, l) {
          (e = l).node.icon ? (u ? u.p(t, e) : ((u = la(e)).c(), u.m(n, i))) : u && (u.d(1), (u = null)),
            !e.node.icon || e.node.showLabel
              ? f
                ? f.p(t, e)
                : ((f = ua(e)).c(), f.m(n, r))
              : f && (f.d(1), (f = null));
          var d = {};
          t.children && (d.node = e.node),
            p.$set(d),
            (c && !t.children) || o === (o = Oa(e.node)) || D(n, 'title', o),
            (c && !t.children && !t.selectedNode) ||
              a ===
                (a =
                  'fd-shellbar__button fd-button ' +
                  (e.node === e.selectedNode ? 'is-selected' : '') +
                  ' svelte-1ymj575') ||
              D(n, 'class', a),
            (c && !t.children) || s === (s = Va(e.node)) || D(n, 'data-testid', s);
        },
        i(e) {
          c || (be(p.$$.fragment, e), (c = !0));
        },
        o(e) {
          we(p.$$.fragment, e), (c = !1);
        },
        d(e) {
          e && T(t), u && u.d(), f && f.d(), ke(p), d();
        }
      };
    }
    function sa(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d,
        u,
        f,
        p,
        h,
        g,
        m,
        v,
        b = e.node.icon && fa(e),
        w = (!e.node.icon || e.node.showLabel) && ga(e),
        S = new un({ props: { node: e.node } });
      function y() {
        return e.click_handler(e);
      }
      var _ = new kr({ props: { node: e.node, isMobile: !1, pathParams: e.pathParams } });
      return {
        c() {
          (t = k('div')),
            (n = k('div')),
            (i = k('div')),
            (r = k('button')),
            b && b.c(),
            (o = P()),
            w && w.c(),
            (a = P()),
            S.$$.fragment.c(),
            (f = P()),
            (p = k('div')),
            _.$$.fragment.c(),
            (g = P()),
            D(r, 'title', (s = Oa(e.node))),
            D(
              r,
              'class',
              (c =
                'fd-shellbar__button fd-button ' + (e.node === e.selectedNode ? 'is-selected' : '') + ' svelte-1ymj575')
            ),
            D(r, 'aria-controls', 'dropDownPopover-' + e.i),
            D(r, 'aria-expanded', (d = e.dropDownStates[`dropDownPopover-${e.i}`] || !1)),
            D(r, 'aria-haspopup', 'true'),
            D(r, 'data-testid', (u = Va(e.node))),
            D(i, 'class', 'fd-popover__control'),
            D(p, 'class', 'fd-popover__body fd-popover__body--right svelte-1ymj575'),
            D(p, 'aria-hidden', (h = !e.dropDownStates[`dropDownPopover-${e.i}`])),
            D(p, 'id', 'dropDownPopover-' + e.i),
            D(n, 'class', 'fd-popover fd-popover--right svelte-1ymj575'),
            D(t, 'class', 'fd-shellbar__action fd-shellbar__action--hide fd-shellbar__action--desktop'),
            (v = [L(r, 'click', y), L(i, 'click', A(Ma))]);
        },
        m(e, s) {
          I(e, t, s),
            x(t, n),
            x(n, i),
            x(i, r),
            b && b.m(r, null),
            x(r, o),
            w && w.m(r, null),
            x(r, a),
            Ne(S, r, null),
            x(n, f),
            x(n, p),
            Ne(_, p, null),
            x(t, g),
            (m = !0);
        },
        p(t, n) {
          (e = n).node.icon ? (b ? b.p(t, e) : ((b = fa(e)).c(), b.m(r, o))) : b && (b.d(1), (b = null)),
            !e.node.icon || e.node.showLabel
              ? w
                ? w.p(t, e)
                : ((w = ga(e)).c(), w.m(r, a))
              : w && (w.d(1), (w = null));
          var i = {};
          t.children && (i.node = e.node),
            S.$set(i),
            (m && !t.children) || s === (s = Oa(e.node)) || D(r, 'title', s),
            (m && !t.children && !t.selectedNode) ||
              c ===
                (c =
                  'fd-shellbar__button fd-button ' +
                  (e.node === e.selectedNode ? 'is-selected' : '') +
                  ' svelte-1ymj575') ||
              D(r, 'class', c),
            (m && !t.dropDownStates) ||
              d === (d = e.dropDownStates[`dropDownPopover-${e.i}`] || !1) ||
              D(r, 'aria-expanded', d),
            (m && !t.children) || u === (u = Va(e.node)) || D(r, 'data-testid', u);
          var l = {};
          t.children && (l.node = e.node),
            t.pathParams && (l.pathParams = e.pathParams),
            _.$set(l),
            (m && !t.dropDownStates) ||
              h === (h = !e.dropDownStates[`dropDownPopover-${e.i}`]) ||
              D(p, 'aria-hidden', h);
        },
        i(e) {
          m || (be(S.$$.fragment, e), be(_.$$.fragment, e), (m = !0));
        },
        o(e) {
          we(S.$$.fragment, e), we(_.$$.fragment, e), (m = !1);
        },
        d(e) {
          e && T(t), b && b.d(), w && w.d(), ke(S), ke(_), l(v);
        }
      };
    }
    function la(e) {
      var t, n;
      function i(e, n) {
        return (null == t || e.children) && (t = !!Da(n.node)), t ? da : ca;
      }
      var r = i(null, e),
        o = r(e);
      return {
        c() {
          o.c(), (n = E());
        },
        m(e, t) {
          o.m(e, t), I(e, n, t);
        },
        p(e, t) {
          r === (r = i(e, t)) && o ? o.p(e, t) : (o.d(1), (o = r(t)) && (o.c(), o.m(n.parentNode, n)));
        },
        d(e) {
          o.d(e), e && T(n);
        }
      };
    }
    function ca(e) {
      var t, n, i;
      return {
        c() {
          D((t = k('img')), 'class', 'fd-top-nav__icon nav-icon svelte-1ymj575'),
            D(t, 'src', (n = e.node.icon)),
            D(t, 'alt', (i = e.node.altText ? e.node.altText : ''));
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, r) {
          e.children && n !== (n = r.node.icon) && D(t, 'src', n),
            e.children && i !== (i = r.node.altText ? r.node.altText : '') && D(t, 'alt', i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function da(e) {
      var t, n;
      return {
        c() {
          D((t = k('span')), 'class', (n = 'fd-top-nav__icon sap-icon--' + e.node.icon + ' svelte-1ymj575'));
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          e.children && n !== (n = 'fd-top-nav__icon sap-icon--' + i.node.icon + ' svelte-1ymj575') && D(t, 'class', n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function ua(e) {
      var t,
        n,
        i = Oa(e.node) + '';
      return {
        c() {
          (t = k('span')), (n = $(i));
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, t) {
          e.children && i !== (i = Oa(t.node) + '') && O(n, i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function fa(e) {
      var t, n;
      function i(e, n) {
        return (null == t || e.children) && (t = !!Da(n.node)), t ? ha : pa;
      }
      var r = i(null, e),
        o = r(e);
      return {
        c() {
          o.c(), (n = E());
        },
        m(e, t) {
          o.m(e, t), I(e, n, t);
        },
        p(e, t) {
          r === (r = i(e, t)) && o ? o.p(e, t) : (o.d(1), (o = r(t)) && (o.c(), o.m(n.parentNode, n)));
        },
        d(e) {
          o.d(e), e && T(n);
        }
      };
    }
    function pa(e) {
      var t, n, i;
      return {
        c() {
          D((t = k('img')), 'class', 'fd-top-nav__icon nav-icon svelte-1ymj575'),
            D(t, 'src', (n = e.node.icon)),
            D(t, 'alt', (i = e.node.altText ? e.node.altText : ''));
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, r) {
          e.children && n !== (n = r.node.icon) && D(t, 'src', n),
            e.children && i !== (i = r.node.altText ? r.node.altText : '') && D(t, 'alt', i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function ha(e) {
      var t, n;
      return {
        c() {
          D((t = k('span')), 'class', (n = 'fd-top-nav__icon sap-icon--' + e.node.icon + ' svelte-1ymj575'));
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          e.children && n !== (n = 'fd-top-nav__icon sap-icon--' + i.node.icon + ' svelte-1ymj575') && D(t, 'class', n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function ga(e) {
      var t,
        n,
        i = Oa(e.node) + '';
      return {
        c() {
          (t = k('span')), (n = $(i));
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, t) {
          e.children && i !== (i = Oa(t.node) + '') && O(n, i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function ma(e) {
      var t,
        n,
        i = !e.node.hideFromNav && oa(e);
      return {
        c() {
          i && i.c(), (t = E());
        },
        m(e, r) {
          i && i.m(e, r), I(e, t, r), (n = !0);
        },
        p(e, n) {
          n.node.hideFromNav
            ? i &&
              (me(),
              we(i, 1, 1, () => {
                i = null;
              }),
              ve())
            : i
            ? (i.p(e, n), be(i, 1))
            : ((i = oa(n)).c(), be(i, 1), i.m(t.parentNode, t));
        },
        i(e) {
          n || (be(i), (n = !0));
        },
        o(e) {
          we(i), (n = !1);
        },
        d(e) {
          i && i.d(e), e && T(t);
        }
      };
    }
    function va(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d,
        u,
        f,
        p,
        h,
        g,
        m,
        v,
        b,
        w,
        S,
        y,
        _ = new un({ props: { node: e.totalBadgeNode, special: 'true' } }),
        C = e.isGlobalSearchAvailable && ba(e),
        $ = e.contextSwitcherConfig && (!e.authorizationEnabled || e.isLoggedIn) && wa(e);
      let E = e.children,
        R = [];
      for (let t = 0; t < E.length; t += 1) R[t] = Ia(Qo(e, E, t));
      const O = e =>
        we(R[e], 1, 1, () => {
          R[e] = null;
        });
      var V = e.isProductSwitcherAvailable && Ta(e),
        M = e.isProductSwitcherAvailable && $a(e),
        F = e.openMobileDropDown && Pa(e),
        j = (!e.authorizationEnabled || e.isLoggedIn) && Ea(e);
      return {
        c() {
          (t = k('div')),
            (n = k('div')),
            (i = k('div')),
            (r = k('div')),
            (o = k('div')),
            (a = k('button')),
            _.$$.fragment.c(),
            (c = P()),
            (d = k('div')),
            (u = k('nav')),
            (f = k('ul')),
            C && C.c(),
            (p = P()),
            $ && $.c(),
            (h = P());
          for (let e = 0; e < R.length; e += 1) R[e].c();
          (g = P()),
            V && V.c(),
            (v = P()),
            M && M.c(),
            (b = P()),
            F && F.c(),
            (w = P()),
            j && j.c(),
            D(a, 'class', 'fd-shellbar__button fd-button sap-icon--overflow'),
            D(a, 'aria-controls', 'overflowPopover'),
            D(a, 'aria-expanded', (s = e.dropDownStates.overflowPopover || !1)),
            D(a, 'aria-haspopup', 'true'),
            D(a, 'data-testid', 'mobile-menu'),
            D(o, 'class', 'fd-shellbar-collapse--control'),
            D(o, 'aria-controls', 'eYVEJ960'),
            D(o, 'aria-expanded', 'false'),
            D(o, 'aria-haspopup', 'true'),
            D(o, 'role', 'button'),
            D(r, 'class', 'fd-popover__control'),
            D(f, 'class', 'fd-menu__list fd-menu__list--no-shadow'),
            D(u, 'class', 'fd-menu'),
            D(d, 'class', 'fd-popover__body fd-popover__body--right svelte-1ymj575'),
            D(d, 'aria-hidden', (m = !e.dropDownStates.overflowPopover)),
            D(d, 'id', 'overflowPopover'),
            D(i, 'class', 'fd-popover fd-popover--right svelte-1ymj575'),
            D(n, 'class', 'fd-shellbar-collapse'),
            D(t, 'class', 'fd-shellbar__action fd-shellbar__action--mobile'),
            (y = [L(a, 'click', e.click_handler_3), L(r, 'click', A(Fa))]);
        },
        m(e, s) {
          I(e, t, s),
            x(t, n),
            x(n, i),
            x(i, r),
            x(r, o),
            x(o, a),
            Ne(_, a, null),
            x(i, c),
            x(i, d),
            x(d, u),
            x(u, f),
            C && C.m(f, null),
            x(f, p),
            $ && $.m(f, null),
            x(f, h);
          for (let e = 0; e < R.length; e += 1) R[e].m(f, null);
          x(f, g),
            V && V.m(f, null),
            x(i, v),
            M && M.m(i, null),
            x(i, b),
            F && F.m(i, null),
            x(i, w),
            j && j.m(i, null),
            (S = !0);
        },
        p(e, t) {
          var n = {};
          if (
            (e.totalBadgeNode && (n.node = t.totalBadgeNode),
            _.$set(n),
            (S && !e.dropDownStates) || s === (s = t.dropDownStates.overflowPopover || !1) || D(a, 'aria-expanded', s),
            t.isGlobalSearchAvailable ? C || ((C = ba(t)).c(), C.m(f, p)) : C && (C.d(1), (C = null)),
            !t.contextSwitcherConfig || (t.authorizationEnabled && !t.isLoggedIn)
              ? $ && ($.d(1), ($ = null))
              : $
              ? $.p(e, t)
              : (($ = wa(t)).c(), $.m(f, h)),
            e.children || e.getRouteLink || e.selectedNode || e.getTestId || e.getNodeLabel || e.hasOpenUIicon)
          ) {
            let n;
            for (E = t.children, n = 0; n < E.length; n += 1) {
              const i = Qo(t, E, n);
              R[n] ? (R[n].p(e, i), be(R[n], 1)) : ((R[n] = Ia(i)), R[n].c(), be(R[n], 1), R[n].m(f, g));
            }
            for (me(), n = E.length; n < R.length; n += 1) O(n);
            ve();
          }
          t.isProductSwitcherAvailable ? (V ? V.p(e, t) : ((V = Ta(t)).c(), V.m(f, null))) : V && (V.d(1), (V = null)),
            (S && !e.dropDownStates) || m === (m = !t.dropDownStates.overflowPopover) || D(d, 'aria-hidden', m),
            t.isProductSwitcherAvailable
              ? M
                ? (M.p(e, t), be(M, 1))
                : ((M = $a(t)).c(), be(M, 1), M.m(i, b))
              : M &&
                (me(),
                we(M, 1, 1, () => {
                  M = null;
                }),
                ve()),
            t.openMobileDropDown
              ? F
                ? (F.p(e, t), be(F, 1))
                : ((F = Pa(t)).c(), be(F, 1), F.m(i, w))
              : F &&
                (me(),
                we(F, 1, 1, () => {
                  F = null;
                }),
                ve()),
            !t.authorizationEnabled || t.isLoggedIn
              ? j
                ? (j.p(e, t), be(j, 1))
                : ((j = Ea(t)).c(), be(j, 1), j.m(i, null))
              : j &&
                (me(),
                we(j, 1, 1, () => {
                  j = null;
                }),
                ve());
        },
        i(e) {
          if (!S) {
            be(_.$$.fragment, e);
            for (let e = 0; e < E.length; e += 1) be(R[e]);
            be(M), be(F), be(j), (S = !0);
          }
        },
        o(e) {
          we(_.$$.fragment, e), (R = R.filter(Ko));
          for (let e = 0; e < R.length; e += 1) we(R[e]);
          we(M), we(F), we(j), (S = !1);
        },
        d(e) {
          e && T(t), ke(_), C && C.d(), $ && $.d(), N(R, e), V && V.d(), M && M.d(), F && F.d(), j && j.d(), l(y);
        }
      };
    }
    function ba(e) {
      var t, n, i;
      return {
        c() {
          (t = k('li')),
            ((n = k('a')).innerHTML =
              '<span class="fd-top-nav__icon sap-icon--search svelte-1ymj575"></span> <span class="fd-menu__title">Search</span>'),
            D(n, 'class', 'fd-menu__link'),
            D(n, 'data-testid', 'luigi-search-btn-mobile'),
            D(t, 'class', 'fd-menu__item'),
            (i = L(n, 'click', A(e.click_handler_5)));
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        d(e) {
          e && T(t), i();
        }
      };
    }
    function wa(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l = e.selectedLabel ? e.selectedLabel : e.defaultLabelContextSwitcher + '';
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            (i = k('span')),
            (r = P()),
            (o = k('span')),
            (a = $(l)),
            D(
              i,
              'class',
              'fd-top-nav__icon ' +
                (e.contextSwitcherConfig.icon && Da(e.contextSwitcherConfig)
                  ? 'sap-icon--' + e.contextSwitcherConfig.icon
                  : 'sap-icon--switch-views') +
                ' svelte-1ymj575'
            ),
            D(o, 'class', 'fd-menu__title'),
            D(n, 'class', 'fd-menu__link'),
            D(t, 'class', 'fd-menu__item'),
            (s = L(n, 'click', A(e.openMobileContextSwitcher)));
        },
        m(e, s) {
          I(e, t, s), x(t, n), x(n, i), x(n, r), x(n, o), x(o, a);
        },
        p(e, t) {
          (e.selectedLabel || e.defaultLabelContextSwitcher) &&
            l !== (l = t.selectedLabel ? t.selectedLabel : t.defaultLabelContextSwitcher + '') &&
            O(a, l);
        },
        d(e) {
          e && T(t), s();
        }
      };
    }
    function Sa(e) {
      var t,
        n,
        i,
        r,
        o = [_a, ya],
        a = [];
      function s(e, t) {
        return t.node.isCat ? 1 : 0;
      }
      return (
        (t = s(0, e)),
        (n = a[t] = o[t](e)),
        {
          c() {
            n.c(), (i = E());
          },
          m(e, n) {
            a[t].m(e, n), I(e, i, n), (r = !0);
          },
          p(e, r) {
            var l = t;
            (t = s(0, r)) === l
              ? a[t].p(e, r)
              : (me(),
                we(a[l], 1, 1, () => {
                  a[l] = null;
                }),
                ve(),
                (n = a[t]) || (n = a[t] = o[t](r)).c(),
                be(n, 1),
                n.m(i.parentNode, i));
          },
          i(e) {
            r || (be(n), (r = !0));
          },
          o(e) {
            we(n), (r = !1);
          },
          d(e) {
            a[t].d(e), e && T(i);
          }
        }
      );
    }
    function ya(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c,
        d,
        u,
        f,
        p = !Da(e.node),
        h = Oa(e.node) + '',
        g = p && Ca(e),
        m = new un({ props: { node: e.node } });
      function v() {
        return e.click_handler_7(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            (i = k('span')),
            g && g.c(),
            (r = P()),
            m.$$.fragment.c(),
            (a = P()),
            (s = k('span')),
            (l = $(h)),
            D(
              i,
              'class',
              (o =
                'fd-top-nav__icon ' + (e.node.icon && Da(e.node) ? 'sap-icon--' + e.node.icon : '') + ' svelte-1ymj575')
            ),
            D(s, 'class', 'fd-list__title'),
            D(n, 'href', (c = e.getRouteLink(e.node))),
            D(n, 'title', (d = Oa(e.node))),
            D(n, 'class', 'fd-menu__link'),
            D(n, 'data-e2e', 'mobile-topnav-dropdown-category'),
            D(t, 'class', 'fd-menu__item'),
            (f = L(n, 'click', R(v)));
        },
        m(e, o) {
          I(e, t, o), x(t, n), x(n, i), g && g.m(i, null), x(i, r), Ne(m, i, null), x(n, a), x(n, s), x(s, l), (u = !0);
        },
        p(t, a) {
          (e = a),
            t.children && (p = !Da(e.node)),
            p ? (g ? g.p(t, e) : ((g = Ca(e)).c(), g.m(i, r))) : g && (g.d(1), (g = null));
          var s = {};
          t.children && (s.node = e.node),
            m.$set(s),
            (u && !t.children) ||
              o ===
                (o =
                  'fd-top-nav__icon ' +
                  (e.node.icon && Da(e.node) ? 'sap-icon--' + e.node.icon : '') +
                  ' svelte-1ymj575') ||
              D(i, 'class', o),
            (u && !t.children) || h === (h = Oa(e.node) + '') || O(l, h),
            (u && !t.children) || c === (c = e.getRouteLink(e.node)) || D(n, 'href', c),
            (u && !t.children) || d === (d = Oa(e.node)) || D(n, 'title', d);
        },
        i(e) {
          u || (be(m.$$.fragment, e), (u = !0));
        },
        o(e) {
          we(m.$$.fragment, e), (u = !1);
        },
        d(e) {
          e && T(t), g && g.d(), ke(m), f();
        }
      };
    }
    function _a(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c,
        d,
        u,
        f,
        p,
        h = !Da(e.node),
        g = Oa(e.node) + '',
        m = h && xa(e),
        v = new un({ props: { node: e.node } });
      function b() {
        return e.click_handler_6(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            (i = k('span')),
            m && m.c(),
            (r = P()),
            v.$$.fragment.c(),
            (a = P()),
            (s = k('span')),
            (l = $(g)),
            D(
              i,
              'class',
              (o =
                'fd-top-nav__icon ' + (e.node.icon && Da(e.node) ? 'sap-icon--' + e.node.icon : '') + ' svelte-1ymj575')
            ),
            D(s, 'class', 'fd-menu__title'),
            D(n, 'href', (c = e.getRouteLink(e.node))),
            D(
              n,
              'class',
              (d = 'fd-menu__link ' + (e.node === e.selectedNode ? 'is-selected' : '') + ' svelte-1ymj575')
            ),
            D(n, 'data-testid', (u = Va(e.node))),
            D(t, 'class', 'fd-menu__item'),
            (p = L(n, 'click', R(b)));
        },
        m(e, o) {
          I(e, t, o), x(t, n), x(n, i), m && m.m(i, null), x(i, r), Ne(v, i, null), x(n, a), x(n, s), x(s, l), (f = !0);
        },
        p(t, a) {
          (e = a),
            t.children && (h = !Da(e.node)),
            h ? (m ? m.p(t, e) : ((m = xa(e)).c(), m.m(i, r))) : m && (m.d(1), (m = null));
          var s = {};
          t.children && (s.node = e.node),
            v.$set(s),
            (f && !t.children) ||
              o ===
                (o =
                  'fd-top-nav__icon ' +
                  (e.node.icon && Da(e.node) ? 'sap-icon--' + e.node.icon : '') +
                  ' svelte-1ymj575') ||
              D(i, 'class', o),
            (f && !t.children) || g === (g = Oa(e.node) + '') || O(l, g),
            (f && !t.children) || c === (c = e.getRouteLink(e.node)) || D(n, 'href', c),
            (f && !t.children && !t.selectedNode) ||
              d === (d = 'fd-menu__link ' + (e.node === e.selectedNode ? 'is-selected' : '') + ' svelte-1ymj575') ||
              D(n, 'class', d),
            (f && !t.children) || u === (u = Va(e.node)) || D(n, 'data-testid', u);
        },
        i(e) {
          f || (be(v.$$.fragment, e), (f = !0));
        },
        o(e) {
          we(v.$$.fragment, e), (f = !1);
        },
        d(e) {
          e && T(t), m && m.d(), ke(v), p();
        }
      };
    }
    function Ca(e) {
      var t, n, i;
      return {
        c() {
          D((t = k('img')), 'src', (n = e.node.icon)),
            D(t, 'alt', (i = e.node.altText ? e.node.altText : '')),
            D(t, 'class', 'svelte-1ymj575');
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, r) {
          e.children && n !== (n = r.node.icon) && D(t, 'src', n),
            e.children && i !== (i = r.node.altText ? r.node.altText : '') && D(t, 'alt', i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function xa(e) {
      var t, n, i;
      return {
        c() {
          D((t = k('img')), 'src', (n = e.node.icon)),
            D(t, 'alt', (i = e.node.altText ? e.node.altText : '')),
            D(t, 'class', 'svelte-1ymj575');
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, r) {
          e.children && n !== (n = r.node.icon) && D(t, 'src', n),
            e.children && i !== (i = r.node.altText ? r.node.altText : '') && D(t, 'alt', i);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function Ia(e) {
      var t,
        n,
        i = !e.node.hideFromNav && Sa(e);
      return {
        c() {
          i && i.c(), (t = E());
        },
        m(e, r) {
          i && i.m(e, r), I(e, t, r), (n = !0);
        },
        p(e, n) {
          n.node.hideFromNav
            ? i &&
              (me(),
              we(i, 1, 1, () => {
                i = null;
              }),
              ve())
            : i
            ? (i.p(e, n), be(i, 1))
            : ((i = Sa(n)).c(), be(i, 1), i.m(t.parentNode, t));
        },
        i(e) {
          n || (be(i), (n = !0));
        },
        o(e) {
          we(i), (n = !1);
        },
        d(e) {
          i && i.d(e), e && T(t);
        }
      };
    }
    function Ta(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l = e.productSwitcherConfig.label + '';
      function c(e, t) {
        return (
          (null == i || e.productSwitcherConfig) &&
            (i = !(!Da(t.productSwitcherConfig) && t.productSwitcherConfig.icon)),
          i ? ka : Na
        );
      }
      var d = c(null, e),
        u = d(e);
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            u.c(),
            (r = P()),
            (o = k('span')),
            (a = $(l)),
            D(o, 'class', 'fd-menu__title'),
            D(n, 'class', 'fd-menu__link'),
            D(n, 'data-testid', 'mobile-product-switcher'),
            D(t, 'class', 'fd-menu__item'),
            (s = L(n, 'click', A(e.openMobileProductSwitcher)));
        },
        m(e, i) {
          I(e, t, i), x(t, n), u.m(n, null), x(n, r), x(n, o), x(o, a);
        },
        p(e, t) {
          d === (d = c(e, t)) && u ? u.p(e, t) : (u.d(1), (u = d(t)) && (u.c(), u.m(n, r))),
            e.productSwitcherConfig && l !== (l = t.productSwitcherConfig.label + '') && O(a, l);
        },
        d(e) {
          e && T(t), u.d(), s();
        }
      };
    }
    function Na(e) {
      var t, n, i, r;
      return {
        c() {
          (t = k('span')),
            D((n = k('img')), 'src', (i = e.productSwitcherConfig.icon)),
            D(n, 'alt', (r = e.productSwitcherConfig.altText ? e.productSwitcherConfig.altText : '')),
            D(n, 'class', 'svelte-1ymj575'),
            D(t, 'class', 'fd-top-nav__icon svelte-1ymj575');
        },
        m(e, i) {
          I(e, t, i), x(t, n);
        },
        p(e, t) {
          e.productSwitcherConfig && i !== (i = t.productSwitcherConfig.icon) && D(n, 'src', i),
            e.productSwitcherConfig &&
              r !== (r = t.productSwitcherConfig.altText ? t.productSwitcherConfig.altText : '') &&
              D(n, 'alt', r);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function ka(e) {
      var t, n;
      return {
        c() {
          D(
            (t = k('span')),
            'class',
            (n = 'fd-top-nav__icon sap-icon--' + (e.productSwitcherConfig.icon || 'grid') + ' svelte-1ymj575')
          );
        },
        m(e, n) {
          I(e, t, n);
        },
        p(e, i) {
          e.productSwitcherConfig &&
            n !== (n = 'fd-top-nav__icon sap-icon--' + (i.productSwitcherConfig.icon || 'grid') + ' svelte-1ymj575') &&
            D(t, 'class', n);
        },
        d(e) {
          e && T(t);
        }
      };
    }
    function $a(e) {
      var t, n;
      function i(n) {
        e.productswitcher_dropDownStates_binding.call(null, n), (t = !0), ce(() => (t = !1));
      }
      let r = { isMobile: !0 };
      void 0 !== e.dropDownStates && (r.dropDownStates = e.dropDownStates);
      var o = new Ao({ props: r });
      return (
        te.push(() => Te(o, 'dropDownStates', i)),
        o.$on('toggleDropdownState', e.toggleDropdownState_handler_1),
        {
          c() {
            o.$$.fragment.c();
          },
          m(e, t) {
            Ne(o, e, t), (n = !0);
          },
          p(e, n) {
            var i = {};
            !t && e.dropDownStates && (i.dropDownStates = n.dropDownStates), o.$set(i);
          },
          i(e) {
            n || (be(o.$$.fragment, e), (n = !0));
          },
          o(e) {
            we(o.$$.fragment, e), (n = !1);
          },
          d(e) {
            ke(o, e);
          }
        }
      );
    }
    function Pa(e) {
      var t,
        n = new kr({ props: { node: e.nodeForMobile, isMobile: !0, pathParams: e.pathParams } });
      return (
        n.$on('close', e.closeMobileTopNavDropDown),
        {
          c() {
            n.$$.fragment.c();
          },
          m(e, i) {
            Ne(n, e, i), (t = !0);
          },
          p(e, t) {
            var i = {};
            e.nodeForMobile && (i.node = t.nodeForMobile), e.pathParams && (i.pathParams = t.pathParams), n.$set(i);
          },
          i(e) {
            t || (be(n.$$.fragment, e), (t = !0));
          },
          o(e) {
            we(n.$$.fragment, e), (t = !1);
          },
          d(e) {
            ke(n, e);
          }
        }
      );
    }
    function Ea(e) {
      var t, n, i, r;
      function o(n) {
        e.contextswitcher_dropDownStates_binding_1.call(null, n), (t = !0), ce(() => (t = !1));
      }
      function a(t) {
        e.contextswitcher_selectedLabel_binding.call(null, t), (n = !0), ce(() => (n = !1));
      }
      function s(t) {
        e.contextswitcher_defaultLabel_binding.call(null, t), (i = !0), ce(() => (i = !1));
      }
      let l = { isMobile: !0, contextSwitcherToggle: e.contextSwitcherToggle };
      void 0 !== e.dropDownStates && (l.dropDownStates = e.dropDownStates),
        void 0 !== e.selectedLabel && (l.selectedLabel = e.selectedLabel),
        void 0 !== e.defaultLabelContextSwitcher && (l.defaultLabel = e.defaultLabelContextSwitcher);
      var c = new ho({ props: l });
      return (
        te.push(() => Te(c, 'dropDownStates', o)),
        te.push(() => Te(c, 'selectedLabel', a)),
        te.push(() => Te(c, 'defaultLabel', s)),
        c.$on('toggleDropdownState', e.toggleDropdownState_handler_2),
        {
          c() {
            c.$$.fragment.c();
          },
          m(e, t) {
            Ne(c, e, t), (r = !0);
          },
          p(e, r) {
            var o = {};
            e.contextSwitcherToggle && (o.contextSwitcherToggle = r.contextSwitcherToggle),
              !t && e.dropDownStates && (o.dropDownStates = r.dropDownStates),
              !n && e.selectedLabel && (o.selectedLabel = r.selectedLabel),
              !i && e.defaultLabelContextSwitcher && (o.defaultLabel = r.defaultLabelContextSwitcher),
              c.$set(o);
          },
          i(e) {
            r || (be(c.$$.fragment, e), (r = !0));
          },
          o(e) {
            we(c.$$.fragment, e), (r = !1);
          },
          d(e) {
            ke(c, e);
          }
        }
      );
    }
    function La(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d,
        u,
        f,
        p,
        h,
        m,
        v,
        b,
        w = new rr({});
      return (
        w.$on('toggleDropdownState', e.toggleDropdownState_handler_3),
        w.$on('userInfoUpdated', e.userInfoUpdate),
        {
          c() {
            (t = k('div')),
              (n = k('div')),
              (i = k('div')),
              (r = k('div')),
              (o = k('div')),
              (a = k('button')),
              (p = P()),
              (h = k('div')),
              w.$$.fragment.c(),
              D(
                a,
                'class',
                (s =
                  'fd-shellbar__button fd-button ' +
                  (e.userInfo.picture
                    ? 'fd-identifier fd-identifier--xs fd-identifier--circle'
                    : 'sap-icon--customer') +
                  ' svelte-1ymj575')
              ),
              D(
                a,
                'style',
                (c = e.userInfo.picture
                  ? `background-image: url('${e.userInfo.picture}');background-size:30px;background-repeat: no-repeat;background-position: center;`
                  : '')
              ),
              D(a, 'aria-expanded', (d = e.dropDownStates.profilePopover || !1)),
              D(a, 'aria-haspopup', 'true'),
              D(a, 'title', (u = e.userInfo.name ? e.userInfo.name : e.userInfo.email)),
              D(o, 'class', (f = g(e.userInfo.picture ? 'fd-shellbar__button--user-menu' : '') + ' svelte-1ymj575')),
              D(h, 'class', 'fd-popover__body fd-popover__body--right svelte-1ymj575'),
              D(h, 'aria-hidden', (m = !e.dropDownStates.profilePopover)),
              D(h, 'id', 'profilePopover'),
              D(r, 'class', 'fd-popover__control'),
              D(i, 'class', 'fd-popover svelte-1ymj575'),
              D(n, 'class', 'fd-user-menu'),
              D(t, 'class', 'fd-shellbar__action fd-shellbar__action--show-always'),
              D(t, 'data-testid', 'luigi-topnav-profile'),
              (b = [L(a, 'click', e.click_handler_8), L(r, 'click', A(ja))]);
          },
          m(e, s) {
            I(e, t, s), x(t, n), x(n, i), x(i, r), x(r, o), x(o, a), x(r, p), x(r, h), Ne(w, h, null), (v = !0);
          },
          p(e, t) {
            (v && !e.userInfo) ||
              s ===
                (s =
                  'fd-shellbar__button fd-button ' +
                  (t.userInfo.picture
                    ? 'fd-identifier fd-identifier--xs fd-identifier--circle'
                    : 'sap-icon--customer') +
                  ' svelte-1ymj575') ||
              D(a, 'class', s),
              (v && !e.userInfo) ||
                c ===
                  (c = t.userInfo.picture
                    ? `background-image: url('${t.userInfo.picture}');background-size:30px;background-repeat: no-repeat;background-position: center;`
                    : '') ||
                D(a, 'style', c),
              (v && !e.dropDownStates) || d === (d = t.dropDownStates.profilePopover || !1) || D(a, 'aria-expanded', d),
              (v && !e.userInfo) ||
                u === (u = t.userInfo.name ? t.userInfo.name : t.userInfo.email) ||
                D(a, 'title', u),
              (v && !e.userInfo) ||
                f === (f = g(t.userInfo.picture ? 'fd-shellbar__button--user-menu' : '') + ' svelte-1ymj575') ||
                D(o, 'class', f),
              (v && !e.dropDownStates) || m === (m = !t.dropDownStates.profilePopover) || D(h, 'aria-hidden', m);
          },
          i(e) {
            v || (be(w.$$.fragment, e), (v = !0));
          },
          o(e) {
            we(w.$$.fragment, e), (v = !1);
          },
          d(e) {
            e && T(t), ke(w), l(b);
          }
        }
      );
    }
    function Ra(e) {
      var t, n;
      function i(n) {
        e.productswitcher_dropDownStates_binding_1.call(null, n), (t = !0), ce(() => (t = !1));
      }
      let r = { isMobile: !1 };
      void 0 !== e.dropDownStates && (r.dropDownStates = e.dropDownStates);
      var o = new Ao({ props: r });
      return (
        te.push(() => Te(o, 'dropDownStates', i)),
        o.$on('toggleDropdownState', e.toggleDropdownState_handler_4),
        {
          c() {
            o.$$.fragment.c();
          },
          m(e, t) {
            Ne(o, e, t), (n = !0);
          },
          p(e, n) {
            var i = {};
            !t && e.dropDownStates && (i.dropDownStates = n.dropDownStates), o.$set(i);
          },
          i(e) {
            n || (be(o.$$.fragment, e), (n = !0));
          },
          o(e) {
            we(o.$$.fragment, e), (n = !1);
          },
          d(e) {
            ke(o, e);
          }
        }
      );
    }
    function Aa(e) {
      var t,
        n,
        i,
        r,
        o,
        a = [ea, Zo],
        s = [];
      function c(e, t) {
        return t.showTopNav ? 0 : 1;
      }
      return (
        (t = c(0, e)),
        (n = s[t] = a[t](e)),
        {
          c() {
            n.c(), (i = E()), (o = [L(Yo, 'click', e.closeAllDropdowns), L(Yo, 'blur', e.closeAllDropdowns)]);
          },
          m(e, n) {
            s[t].m(e, n), I(e, i, n), (r = !0);
          },
          p(e, r) {
            var o = t;
            (t = c(0, r)) === o
              ? s[t].p(e, r)
              : (me(),
                we(s[o], 1, 1, () => {
                  s[o] = null;
                }),
                ve(),
                (n = s[t]) || (n = s[t] = a[t](r)).c(),
                be(n, 1),
                n.m(i.parentNode, i));
          },
          i(e) {
            r || (be(n), (r = !0));
          },
          o(e) {
            we(n), (r = !1);
          },
          d(e) {
            s[t].d(e), e && T(i), l(o);
          }
        }
      );
    }
    function Da(e) {
      return xt.isOpenUIiconName(e.icon);
    }
    function Oa(e) {
      return nt.getTranslation(e.label);
    }
    function Va(e) {
      return e.testId ? e.testId : xt.prepareForTests(e.pathSegment, e.label);
    }
    const Ma = () => {},
      Fa = () => {},
      ja = () => {};
    function Ua(e, t, n) {
      const i = Y();
      let r,
        o,
        a,
        {
          authorizationEnabled: s,
          autologinEnabled: l,
          isLoggedIn: c = !1,
          hideNavComponent: d,
          responsiveNavSetting: u,
          pathData: f
        } = t,
        {
          pathParams: p,
          dropDownStates: h = {},
          children: g,
          selectedNode: m,
          visibleNodeCount: v,
          totalBadgeNode: b,
          isProductSwitcherAvailable: w,
          productSwitcherConfig: S,
          openMobileDropDown: y,
          nodeForMobile: _,
          profileItemsAvailable: C,
          userInfo: x = {},
          urlAuthError: I,
          isGlobalSearchAvailable: T,
          isSearchFieldVisible: N,
          inputElem: k,
          luigiCustomSearchRenderer__slot: $,
          displaySearchResult: P,
          displayCustomSearchResult: E,
          searchResult: L
        } = t,
        R = X('store'),
        A = !1,
        D = Ze.getConfigValue('navigation.contextSwitcher');
      const O = async () => {
        if (f && 0 < f.length) {
          const e = await xt.generateTopNavNodes(f);
          n('children', (g = e.children)),
            n('selectedNode', (m = e.selectedNode)),
            n('visibleNodeCount', (v = e.visibleNodeCount)),
            n('totalBadgeNode', (b = e.totalBadgeNode)),
            (window.TOPNAVDATA = e.children),
            (r = f);
        }
      };
      q(() => {
        Tt.doOnStoreChange(
          R,
          () => {
            n('authorizationEnabled', (s = et.isAuthorizationEnabled())),
              n('profileItemsAvailable', (C = Ze.getConfigValue('navigation.profile'))),
              n('autologinEnabled', (l = !Boolean(Ze.getConfigValue('auth.disableAutoLogin')))),
              n('isProductSwitcherAvailable', (w = Ze.getConfigValue('navigation.productSwitcher'))),
              n('hideNavComponent', (d = Ze.getConfigBooleanValue('settings.hideNavigation'))),
              n('responsiveNavSetting', (u = Ze.getConfigValue('settings.responsiveNavigation'))),
              n('productSwitcherConfig', (S = xt.getProductSwitcherConfig())),
              n('isGlobalSearchAvailable', (T = Ze.getConfigValue('globalSearch')));
          },
          ['navigation']
        ),
          Nt.addEventListener('message', e => {
            'luigi.navigation.update-badge-counters' === e.data.msg && O();
          });
      }),
        H(() => {
          (r && r == f) || O(), n('isLoggedIn', (c = St.isLoggedIn()));
        });
      let { showTopNav: V } = t;
      function M(e) {
        n('openMobileDropDown', (y = !0)), n('nodeForMobile', (_ = e));
      }
      function F() {
        n('openMobileDropDown', (y = !1));
      }
      function j(e) {
        i('handleClick', { node: e });
      }
      function U(e) {
        const t = h || {},
          i = !t[e];
        z(), F(), (t[e] = i), n('dropDownStates', (h = t));
      }
      function B() {
        N ||
          setTimeout(() => {
            k && k.focus();
          }),
          i('toggleSearch', { isSearchFieldVisible: N, inputElem: k, luigiCustomSearchRenderer__slot: $ });
      }
      function z() {
        const e = h || {},
          t = Object.keys(e);
        t &&
          t.length > 0 &&
          t.forEach(t => {
            (e[t] = !1), n('dropDownStates', (h = e));
          });
      }
      function W() {
        document.body.classList.toggle('lui-leftNavToggle'),
          document.getElementsByClassName('fd-tabs').length > 0 && i('resizeTabNav', {});
      }
      function G() {
        nn.buttonClicked(), document.getElementsByClassName('fd-tabs').length > 0 && i('resizeTabNav', {});
      }
      return (
        (e.$set = e => {
          'authorizationEnabled' in e && n('authorizationEnabled', (s = e.authorizationEnabled)),
            'autologinEnabled' in e && n('autologinEnabled', (l = e.autologinEnabled)),
            'isLoggedIn' in e && n('isLoggedIn', (c = e.isLoggedIn)),
            'hideNavComponent' in e && n('hideNavComponent', (d = e.hideNavComponent)),
            'responsiveNavSetting' in e && n('responsiveNavSetting', (u = e.responsiveNavSetting)),
            'pathData' in e && n('pathData', (f = e.pathData)),
            'pathParams' in e && n('pathParams', (p = e.pathParams)),
            'dropDownStates' in e && n('dropDownStates', (h = e.dropDownStates)),
            'children' in e && n('children', (g = e.children)),
            'selectedNode' in e && n('selectedNode', (m = e.selectedNode)),
            'visibleNodeCount' in e && n('visibleNodeCount', (v = e.visibleNodeCount)),
            'totalBadgeNode' in e && n('totalBadgeNode', (b = e.totalBadgeNode)),
            'isProductSwitcherAvailable' in e && n('isProductSwitcherAvailable', (w = e.isProductSwitcherAvailable)),
            'productSwitcherConfig' in e && n('productSwitcherConfig', (S = e.productSwitcherConfig)),
            'openMobileDropDown' in e && n('openMobileDropDown', (y = e.openMobileDropDown)),
            'nodeForMobile' in e && n('nodeForMobile', (_ = e.nodeForMobile)),
            'profileItemsAvailable' in e && n('profileItemsAvailable', (C = e.profileItemsAvailable)),
            'userInfo' in e && n('userInfo', (x = e.userInfo)),
            'urlAuthError' in e && n('urlAuthError', (I = e.urlAuthError)),
            'isGlobalSearchAvailable' in e && n('isGlobalSearchAvailable', (T = e.isGlobalSearchAvailable)),
            'isSearchFieldVisible' in e && n('isSearchFieldVisible', (N = e.isSearchFieldVisible)),
            'inputElem' in e && n('inputElem', (k = e.inputElem)),
            'luigiCustomSearchRenderer__slot' in e &&
              n('luigiCustomSearchRenderer__slot', ($ = e.luigiCustomSearchRenderer__slot)),
            'displaySearchResult' in e && n('displaySearchResult', (P = e.displaySearchResult)),
            'displayCustomSearchResult' in e && n('displayCustomSearchResult', (E = e.displayCustomSearchResult)),
            'searchResult' in e && n('searchResult', (L = e.searchResult)),
            'showTopNav' in e && n('showTopNav', (V = e.showTopNav));
        }),
        (e.$$.update = (e = { authorizationEnabled: 1, autologinEnabled: 1, isLoggedIn: 1 }) => {
          (e.authorizationEnabled || e.autologinEnabled || e.isLoggedIn) &&
            n('showTopNav', (V = (s && (!l || c)) || !s));
        }),
        {
          authorizationEnabled: s,
          autologinEnabled: l,
          isLoggedIn: c,
          hideNavComponent: d,
          responsiveNavSetting: u,
          pathData: f,
          pathParams: p,
          dropDownStates: h,
          children: g,
          selectedNode: m,
          visibleNodeCount: v,
          totalBadgeNode: b,
          isProductSwitcherAvailable: w,
          productSwitcherConfig: S,
          openMobileDropDown: y,
          nodeForMobile: _,
          profileItemsAvailable: C,
          userInfo: x,
          urlAuthError: I,
          isGlobalSearchAvailable: T,
          isSearchFieldVisible: N,
          inputElem: k,
          luigiCustomSearchRenderer__slot: $,
          displaySearchResult: P,
          displayCustomSearchResult: E,
          searchResult: L,
          contextSwitcherToggle: A,
          selectedLabel: o,
          defaultLabelContextSwitcher: a,
          contextSwitcherConfig: D,
          showTopNav: V,
          getRouteLink: function(e) {
            return It.getNodeHref(e, p);
          },
          openMobileProductSwitcher: function() {
            U('productSwitcherPopover');
          },
          openMobileContextSwitcher: function() {
            n('contextSwitcherToggle', (A = !A)), U('contextSwitcherPopover');
          },
          openMobileTopNavDropDown: M,
          closeMobileTopNavDropDown: F,
          handleClick: j,
          handleSearchNavigation: function(e) {
            i('handleSearchNavigation', { node: e });
          },
          handleClickExternal: function(e) {
            j(e.detail.node);
          },
          toggleDropdownState: U,
          toggleDropdownStateExternal: function(e) {
            U(e.detail.name);
          },
          toggleSearch: B,
          closeAllDropdowns: z,
          burgerClickHandler: function() {
            'simple' === u || 'simpleMobileOnly' === u ? W() : G();
          },
          simpleNav: W,
          semicollapsedNav: G,
          userInfoUpdate: function(e) {
            const t = e.detail;
            n('userInfo', (x = t || {}));
          },
          toggleSearch_handler: function(t) {
            Z(e, t);
          },
          handleSearchNavigation_handler: function(t) {
            Z(e, t);
          },
          closeSearchResult_handler: function(t) {
            Z(e, t);
          },
          logotitle_dropDownStates_binding: function(e) {
            n('dropDownStates', (h = e));
          },
          globalsearch_isSearchFieldVisible_binding: function(e) {
            n('isSearchFieldVisible', (N = e));
          },
          globalsearch_searchResult_binding: function(e) {
            n('searchResult', (L = e));
          },
          globalsearch_displaySearchResult_binding: function(e) {
            n('displaySearchResult', (P = e));
          },
          globalsearch_displayCustomSearchResult_binding: function(e) {
            n('displayCustomSearchResult', (E = e));
          },
          globalsearch_inputElem_binding: function(e) {
            n('inputElem', (k = e));
          },
          globalsearch_luigiCustomSearchRenderer__slot_binding: function(e) {
            n('luigiCustomSearchRenderer__slot', ($ = e));
          },
          contextswitcher_dropDownStates_binding: function(e) {
            n('dropDownStates', (h = e));
          },
          toggleDropdownState_handler: () => U('contextSwitcherPopover'),
          click_handler: ({ i: e }) => U(`dropDownPopover-${e}`),
          click_handler_2: ({ node: e }) => j(e),
          click_handler_3: () => U('overflowPopover'),
          click_handler_5: () => {
            B(), U('overflowPopover');
          },
          click_handler_6: ({ node: e }) => j(e),
          click_handler_7: ({ node: e }) => M(e),
          productswitcher_dropDownStates_binding: function(e) {
            n('dropDownStates', (h = e));
          },
          toggleDropdownState_handler_1: () => U('productSwitcherPopover'),
          contextswitcher_dropDownStates_binding_1: function(e) {
            n('dropDownStates', (h = e));
          },
          contextswitcher_selectedLabel_binding: function(e) {
            n('selectedLabel', (o = e));
          },
          contextswitcher_defaultLabel_binding: function(e) {
            n('defaultLabelContextSwitcher', (a = e));
          },
          toggleDropdownState_handler_2: () => U('contextSwitcherPopover'),
          click_handler_8: () => U('profilePopover'),
          toggleDropdownState_handler_3: () => U('profilePopover'),
          productswitcher_dropDownStates_binding_1: function(e) {
            n('dropDownStates', (h = e));
          },
          toggleDropdownState_handler_4: () => U('productSwitcherPopover'),
          toggleDropdownState_handler_5: () => U('profilePopover')
        }
      );
    }
    var Ba = class extends Pe {
      constructor(e) {
        super(),
          $e(this, e, Ua, Aa, d, [
            'authorizationEnabled',
            'autologinEnabled',
            'isLoggedIn',
            'hideNavComponent',
            'responsiveNavSetting',
            'pathData',
            'pathParams',
            'dropDownStates',
            'children',
            'selectedNode',
            'visibleNodeCount',
            'totalBadgeNode',
            'isProductSwitcherAvailable',
            'productSwitcherConfig',
            'openMobileDropDown',
            'nodeForMobile',
            'profileItemsAvailable',
            'userInfo',
            'urlAuthError',
            'isGlobalSearchAvailable',
            'isSearchFieldVisible',
            'inputElem',
            'luigiCustomSearchRenderer__slot',
            'displaySearchResult',
            'displayCustomSearchResult',
            'searchResult',
            'showTopNav',
            'openMobileProductSwitcher',
            'openMobileContextSwitcher',
            'openMobileTopNavDropDown',
            'closeMobileTopNavDropDown',
            'handleClick',
            'handleSearchNavigation',
            'handleClickExternal',
            'toggleDropdownState',
            'toggleDropdownStateExternal',
            'toggleSearch',
            'closeAllDropdowns',
            'simpleNav',
            'semicollapsedNav',
            'userInfoUpdate'
          ]);
      }
      get openMobileProductSwitcher() {
        return this.$$.ctx.openMobileProductSwitcher;
      }
      get openMobileContextSwitcher() {
        return this.$$.ctx.openMobileContextSwitcher;
      }
      get openMobileTopNavDropDown() {
        return this.$$.ctx.openMobileTopNavDropDown;
      }
      get closeMobileTopNavDropDown() {
        return this.$$.ctx.closeMobileTopNavDropDown;
      }
      get handleClick() {
        return this.$$.ctx.handleClick;
      }
      get handleSearchNavigation() {
        return this.$$.ctx.handleSearchNavigation;
      }
      get handleClickExternal() {
        return this.$$.ctx.handleClickExternal;
      }
      get toggleDropdownState() {
        return this.$$.ctx.toggleDropdownState;
      }
      get toggleDropdownStateExternal() {
        return this.$$.ctx.toggleDropdownStateExternal;
      }
      get toggleSearch() {
        return this.$$.ctx.toggleSearch;
      }
      get closeAllDropdowns() {
        return this.$$.ctx.closeAllDropdowns;
      }
      get simpleNav() {
        return this.$$.ctx.simpleNav;
      }
      get semicollapsedNav() {
        return this.$$.ctx.semicollapsedNav;
      }
      get userInfoUpdate() {
        return this.$$.ctx.userInfoUpdate;
      }
    };
    n(403);
    const { Object: za, window: Wa } = xe;
    function Ga(e, t, n) {
      const i = za.create(e);
      return (i.node = t[n]), i;
    }
    function Ha(e, t, n) {
      const i = za.create(e);
      return (i.node = t[n]), (i.index2 = n), i;
    }
    function qa(e, t, n) {
      const i = za.create(e);
      return (i.key = t[n][0]), (i.nodes = t[n][1]), (i.index = n), i;
    }
    function Ka(e, t, n) {
      const i = za.create(e);
      return (i.node = t[n]), i;
    }
    function Ja(e, t, n) {
      const i = za.create(e);
      return (i.node = t[n]), (i.index2 = n), i;
    }
    function Ya(e, t, n) {
      const i = za.create(e);
      return (i.key = t[n][0]), (i.nodes = t[n][1]), (i.index = n), i;
    }
    function Qa(e) {
      var t, n, i, r, o, a, s, c, d, u, f, p, h;
      let g = e.Object.entries(e.children),
        m = [];
      for (let t = 0; t < g.length; t += 1) m[t] = as(Ya(e, g, t));
      let v = e.Object.entries(e.children),
        b = [];
      for (let t = 0; t < v.length; t += 1) b[t] = us(qa(e, v, t));
      return {
        c() {
          (t = k('nav')), (n = k('div')), (i = k('div'));
          for (let e = 0; e < m.length; e += 1) m[e].c();
          (r = P()),
            (o = k('div')),
            (a = k('span')),
            (s = k('div')),
            ((c = k('a')).innerHTML =
              '<span class="label fd-tabs__tag svelte-194k4id">More</span> <span class="sap-icon--dropdown luigi-icon--dropdown svelte-194k4id"></span>'),
            (d = P()),
            (u = k('div')),
            (f = k('ul'));
          for (let e = 0; e < b.length; e += 1) b[e].c();
          D(i, 'class', 'tabsContainer luigi-tabsContainer svelte-194k4id'),
            D(n, 'class', 'tabsContainerWrapper svelte-194k4id'),
            D(c, 'class', 'fd-tabs__link fd-popover__control has-child luigi__more svelte-194k4id'),
            D(c, 'aria-expanded', 'false'),
            D(c, 'role', 'tab'),
            D(f, 'class', 'fd-nested-list fd-nested-list--compact fd-nested-list--text-only svelte-194k4id'),
            D(u, 'class', 'fd-popover__body fd-popover__body--right fd-popover__body--no-arrow'),
            D(u, 'aria-hidden', (p = !e.isMoreBtnExpanded)),
            D(s, 'class', 'fd-popover fd-popover--right'),
            D(a, 'class', 'fd-tabs__item svelte-194k4id'),
            D(o, 'class', 'luigi-tabsMoreButton svelte-194k4id'),
            D(t, 'class', 'fd-tabs fd-tabs--l svelte-194k4id'),
            D(t, 'role', 'tablist'),
            D(t, 'id', 'tabsContainer'),
            (h = [
              L(c, 'click', R(e.toggleMoreBtn)),
              L(a, 'click', gs),
              L(t, 'toggleDropdownState', e.toggleDropdownState_handler)
            ]);
        },
        m(e, l) {
          I(e, t, l), x(t, n), x(n, i);
          for (let e = 0; e < m.length; e += 1) m[e].m(i, null);
          x(t, r), x(t, o), x(o, a), x(a, s), x(s, c), x(s, d), x(s, u), x(u, f);
          for (let e = 0; e < b.length; e += 1) b[e].m(f, null);
        },
        p(e, t) {
          if (
            e.Object ||
            e.children ||
            e.virtualGroupPrefix ||
            e.selectedNodeForTabNav ||
            e.getRouteLink ||
            e.$getTranslation ||
            e.isSelectedCat ||
            e.dropDownStates
          ) {
            let n;
            for (g = t.Object.entries(t.children), n = 0; n < g.length; n += 1) {
              const r = Ya(t, g, n);
              m[n] ? m[n].p(e, r) : ((m[n] = as(r)), m[n].c(), m[n].m(i, null));
            }
            for (; n < m.length; n += 1) m[n].d(1);
            m.length = g.length;
          }
          if (
            e.Object ||
            e.children ||
            e.virtualGroupPrefix ||
            e.getRouteLink ||
            e.selectedNodeForTabNav ||
            e.$getTranslation ||
            e.dropDownStates ||
            e.isSelectedCat
          ) {
            let n;
            for (v = t.Object.entries(t.children), n = 0; n < v.length; n += 1) {
              const i = qa(t, v, n);
              b[n] ? b[n].p(e, i) : ((b[n] = us(i)), b[n].c(), b[n].m(f, null));
            }
            for (; n < b.length; n += 1) b[n].d(1);
            b.length = v.length;
          }
          e.isMoreBtnExpanded && p !== (p = !t.isMoreBtnExpanded) && D(u, 'aria-hidden', p);
        },
        d(e) {
          e && T(t), N(m, e), N(b, e), l(h);
        }
      };
    }
    function Xa(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d,
        u,
        f,
        p,
        h,
        g,
        m,
        v,
        b,
        w = e.$getTranslation(e.key) + '';
      function S() {
        return e.click_handler_1(e);
      }
      let y = e.nodes,
        _ = [];
      for (let t = 0; t < y.length; t += 1) _[t] = ns(Ka(e, y, t));
      return {
        c() {
          (t = k('span')),
            (n = k('div')),
            (i = k('div')),
            (r = k('a')),
            (o = k('span')),
            (a = $(w)),
            (s = P()),
            (c = k('span')),
            (u = P()),
            (f = k('div')),
            (p = k('nav')),
            (h = k('ul'));
          for (let e = 0; e < _.length; e += 1) _[e].c();
          (m = P()),
            D(o, 'class', 'label fd-tabs__tag svelte-194k4id'),
            D(c, 'class', 'sap-icon--dropdown luigi-icon--dropdown svelte-194k4id'),
            D(r, 'class', 'fd-tabs__link has-child svelte-194k4id'),
            D(r, 'aria-expanded', 'false'),
            D(r, 'role', 'tab'),
            D(r, 'aria-selected', (d = ps(e.key, e.selectedNodeForTabNav))),
            D(i, 'class', 'fd-popover__control'),
            D(h, 'class', 'fd-menu__list fd-menu__list--no-shadow'),
            D(p, 'class', 'fd-menu'),
            D(f, 'class', 'fd-popover__body fd-popover__body--no-arrow'),
            D(f, 'aria-hidden', (g = !e.dropDownStates[e.key])),
            D(n, 'class', 'fd-popover'),
            D(t, 'class', 'fd-tabs__item svelte-194k4id'),
            D(t, 'uid', e.index + '-0'),
            D(t, 'isselected', (v = ps(e.key, e.selectedNodeForTabNav))),
            (b = [L(r, 'click', R(S)), L(t, 'click', hs)]);
        },
        m(e, l) {
          I(e, t, l), x(t, n), x(n, i), x(i, r), x(r, o), x(o, a), x(r, s), x(r, c), x(n, u), x(n, f), x(f, p), x(p, h);
          for (let e = 0; e < _.length; e += 1) _[e].m(h, null);
          x(t, m);
        },
        p(n, i) {
          if (
            ((e = i),
            (n.$getTranslation || n.children) && w !== (w = e.$getTranslation(e.key) + '') && O(a, w),
            (n.children || n.selectedNodeForTabNav) &&
              d !== (d = ps(e.key, e.selectedNodeForTabNav)) &&
              D(r, 'aria-selected', d),
            n.Object || n.children || n.getRouteLink || n.selectedNodeForTabNav || n.$getTranslation)
          ) {
            let t;
            for (y = e.nodes, t = 0; t < y.length; t += 1) {
              const i = Ka(e, y, t);
              _[t] ? _[t].p(n, i) : ((_[t] = ns(i)), _[t].c(), _[t].m(h, null));
            }
            for (; t < _.length; t += 1) _[t].d(1);
            _.length = y.length;
          }
          (n.dropDownStates || n.children) && g !== (g = !e.dropDownStates[e.key]) && D(f, 'aria-hidden', g),
            (n.children || n.selectedNodeForTabNav) &&
              v !== (v = ps(e.key, e.selectedNodeForTabNav)) &&
              D(t, 'isselected', v);
        },
        d(e) {
          e && T(t), N(_, e), l(b);
        }
      };
    }
    function Za(e) {
      var t;
      let n = e.nodes,
        i = [];
      for (let t = 0; t < n.length; t += 1) i[t] = os(Ja(e, n, t));
      return {
        c() {
          for (let e = 0; e < i.length; e += 1) i[e].c();
          t = E();
        },
        m(e, n) {
          for (let t = 0; t < i.length; t += 1) i[t].m(e, n);
          I(e, t, n);
        },
        p(e, r) {
          if (e.Object || e.children || e.selectedNodeForTabNav || e.getRouteLink || e.$getTranslation) {
            let o;
            for (n = r.nodes, o = 0; o < n.length; o += 1) {
              const a = Ja(r, n, o);
              i[o] ? i[o].p(e, a) : ((i[o] = os(a)), i[o].c(), i[o].m(t.parentNode, t));
            }
            for (; o < i.length; o += 1) i[o].d(1);
            i.length = n.length;
          }
        },
        d(e) {
          N(i, e), e && T(t);
        }
      };
    }
    function es(e) {
      var t,
        n = e.node.label && ts(e);
      return {
        c() {
          n && n.c(), (t = E());
        },
        m(e, i) {
          n && n.m(e, i), I(e, t, i);
        },
        p(e, i) {
          i.node.label ? (n ? n.p(e, i) : ((n = ts(i)).c(), n.m(t.parentNode, t))) : n && (n.d(1), (n = null));
        },
        d(e) {
          n && n.d(e), e && T(t);
        }
      };
    }
    function ts(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c = e.$getTranslation(e.node.label) + '';
      function d() {
        return e.click_handler_2(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            (i = k('span')),
            (r = $(c)),
            (s = P()),
            D(i, 'class', 'fd-menu__title'),
            D(n, 'href', (o = e.getRouteLink(e.node))),
            D(n, 'class', 'fd-menu__link'),
            D(n, 'aria-selected', (a = e.node === e.selectedNodeForTabNav)),
            D(t, 'class', 'fd-menu__item'),
            (l = L(n, 'click', R(d)));
        },
        m(e, o) {
          I(e, t, o), x(t, n), x(n, i), x(i, r), x(t, s);
        },
        p(t, i) {
          (e = i),
            (t.$getTranslation || t.children) && c !== (c = e.$getTranslation(e.node.label) + '') && O(r, c),
            t.children && o !== (o = e.getRouteLink(e.node)) && D(n, 'href', o),
            (t.children || t.selectedNodeForTabNav) &&
              a !== (a = e.node === e.selectedNodeForTabNav) &&
              D(n, 'aria-selected', a);
        },
        d(e) {
          e && T(t), l();
        }
      };
    }
    function ns(e) {
      var t,
        n = !e.node.hideFromNav && es(e);
      return {
        c() {
          n && n.c(), (t = E());
        },
        m(e, i) {
          n && n.m(e, i), I(e, t, i);
        },
        p(e, i) {
          i.node.hideFromNav ? n && (n.d(1), (n = null)) : n ? n.p(e, i) : ((n = es(i)).c(), n.m(t.parentNode, t));
        },
        d(e) {
          n && n.d(e), e && T(t);
        }
      };
    }
    function is(e) {
      var t,
        n = e.node.label && rs(e);
      return {
        c() {
          n && n.c(), (t = E());
        },
        m(e, i) {
          n && n.m(e, i), I(e, t, i);
        },
        p(e, i) {
          i.node.label ? (n ? n.p(e, i) : ((n = rs(i)).c(), n.m(t.parentNode, t))) : n && (n.d(1), (n = null));
        },
        d(e) {
          n && n.d(e), e && T(t);
        }
      };
    }
    function rs(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c,
        d = e.$getTranslation(e.node.label) + '';
      function u() {
        return e.click_handler(e);
      }
      return {
        c() {
          (t = k('span')),
            (n = k('a')),
            (i = k('span')),
            (r = $(d)),
            (s = P()),
            D(i, 'class', 'fd-tabs__tag'),
            D(n, 'class', 'fd-tabs__link'),
            D(n, 'href', (o = e.getRouteLink(e.node))),
            D(n, 'role', 'tab'),
            D(n, 'aria-selected', (a = e.node === e.selectedNodeForTabNav)),
            D(t, 'class', 'fd-tabs__item svelte-194k4id'),
            D(t, 'uid', e.index + '-' + e.index2),
            D(t, 'isselected', (l = e.node === e.selectedNodeForTabNav)),
            (c = L(n, 'click', R(u)));
        },
        m(e, o) {
          I(e, t, o), x(t, n), x(n, i), x(i, r), x(t, s);
        },
        p(i, s) {
          (e = s),
            (i.$getTranslation || i.children) && d !== (d = e.$getTranslation(e.node.label) + '') && O(r, d),
            i.children && o !== (o = e.getRouteLink(e.node)) && D(n, 'href', o),
            (i.children || i.selectedNodeForTabNav) &&
              a !== (a = e.node === e.selectedNodeForTabNav) &&
              D(n, 'aria-selected', a),
            (i.children || i.selectedNodeForTabNav) &&
              l !== (l = e.node === e.selectedNodeForTabNav) &&
              D(t, 'isselected', l);
        },
        d(e) {
          e && T(t), c();
        }
      };
    }
    function os(e) {
      var t,
        n = !e.node.hideFromNav && is(e);
      return {
        c() {
          n && n.c(), (t = E());
        },
        m(e, i) {
          n && n.m(e, i), I(e, t, i);
        },
        p(e, i) {
          i.node.hideFromNav ? n && (n.d(1), (n = null)) : n ? n.p(e, i) : ((n = is(i)).c(), n.m(t.parentNode, t));
        },
        d(e) {
          n && n.d(e), e && T(t);
        }
      };
    }
    function as(e) {
      var t, n;
      function i(e, n) {
        return (
          (null == t || e.children || e.virtualGroupPrefix) &&
            (t = !('undefined' !== n.key && 0 !== n.key.indexOf(n.virtualGroupPrefix))),
          t ? Za : Xa
        );
      }
      var r = i(null, e),
        o = r(e);
      return {
        c() {
          o.c(), (n = E());
        },
        m(e, t) {
          o.m(e, t), I(e, n, t);
        },
        p(e, t) {
          r === (r = i(e, t)) && o ? o.p(e, t) : (o.d(1), (o = r(t)) && (o.c(), o.m(n.parentNode, n)));
        },
        d(e) {
          o.d(e), e && T(n);
        }
      };
    }
    function ss(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        c,
        d,
        u,
        f,
        p,
        h,
        g,
        m,
        v = e.$getTranslation(e.key) + '';
      function b() {
        return e.click_handler_5(e);
      }
      function w() {
        return e.click_handler_6(e);
      }
      let S = e.nodes,
        y = [];
      for (let t = 0; t < S.length; t += 1) y[t] = cs(Ga(e, S, t));
      return {
        c() {
          (t = k('li')),
            (n = k('div')),
            (i = k('a')),
            (r = k('span')),
            (o = $(v)),
            (c = P()),
            (d = k('button')),
            (f = P()),
            (p = k('ul'));
          for (let e = 0; e < y.length; e += 1) y[e].c();
          (g = P()),
            D(r, 'class', 'fd-nested-list__title'),
            D(i, 'href', 'javascript:void(null)'),
            D(i, 'tabindex', '-1'),
            D(i, 'class', 'fd-nested-list__link'),
            D(i, 'aria-haspopup', 'true'),
            D(i, 'aria-expanded', (a = e.dropDownStates[e.key + e.index])),
            D(i, 'aria-selected', (s = ps(e.key, e.selectedNodeForTabNav))),
            D(d, 'class', 'fd-button fd-nested-list__button'),
            D(d, 'href', '#'),
            D(d, 'tabindex', '-1'),
            D(d, 'aria-label', 'Expand submenu'),
            D(d, 'aria-haspopup', 'true'),
            D(d, 'aria-expanded', (u = e.dropDownStates[e.key + e.index])),
            D(n, 'class', 'fd-nested-list__content has-child svelte-194k4id'),
            D(n, 'tabindex', '0'),
            D(p, 'class', 'fd-nested-list level-2'),
            D(p, 'aria-hidden', (h = !e.dropDownStates[e.key + e.index])),
            D(t, 'class', 'fd-nested-list__item'),
            D(t, 'uid', e.index + '-0'),
            (m = [L(i, 'click', R(b)), L(d, 'click', R(w))]);
        },
        m(e, a) {
          I(e, t, a), x(t, n), x(n, i), x(i, r), x(r, o), x(n, c), x(n, d), x(t, f), x(t, p);
          for (let e = 0; e < y.length; e += 1) y[e].m(p, null);
          x(t, g);
        },
        p(t, n) {
          if (
            ((e = n),
            (t.$getTranslation || t.children) && v !== (v = e.$getTranslation(e.key) + '') && O(o, v),
            (t.dropDownStates || t.children) &&
              a !== (a = e.dropDownStates[e.key + e.index]) &&
              D(i, 'aria-expanded', a),
            (t.children || t.selectedNodeForTabNav) &&
              s !== (s = ps(e.key, e.selectedNodeForTabNav)) &&
              D(i, 'aria-selected', s),
            (t.dropDownStates || t.children) &&
              u !== (u = e.dropDownStates[e.key + e.index]) &&
              D(d, 'aria-expanded', u),
            t.getRouteLink || t.Object || t.children || t.selectedNodeForTabNav || t.$getTranslation)
          ) {
            let n;
            for (S = e.nodes, n = 0; n < S.length; n += 1) {
              const i = Ga(e, S, n);
              y[n] ? y[n].p(t, i) : ((y[n] = cs(i)), y[n].c(), y[n].m(p, null));
            }
            for (; n < y.length; n += 1) y[n].d(1);
            y.length = S.length;
          }
          (t.dropDownStates || t.children) && h !== (h = !e.dropDownStates[e.key + e.index]) && D(p, 'aria-hidden', h);
        },
        d(e) {
          e && T(t), N(y, e), l(m);
        }
      };
    }
    function ls(e) {
      var t;
      let n = e.nodes,
        i = [];
      for (let t = 0; t < n.length; t += 1) i[t] = ds(Ha(e, n, t));
      return {
        c() {
          for (let e = 0; e < i.length; e += 1) i[e].c();
          t = E();
        },
        m(e, n) {
          for (let t = 0; t < i.length; t += 1) i[t].m(e, n);
          I(e, t, n);
        },
        p(e, r) {
          if (e.getRouteLink || e.Object || e.children || e.selectedNodeForTabNav || e.$getTranslation) {
            let o;
            for (n = r.nodes, o = 0; o < n.length; o += 1) {
              const a = Ha(r, n, o);
              i[o] ? i[o].p(e, a) : ((i[o] = ds(a)), i[o].c(), i[o].m(t.parentNode, t));
            }
            for (; o < i.length; o += 1) i[o].d(1);
            i.length = n.length;
          }
        },
        d(e) {
          N(i, e), e && T(t);
        }
      };
    }
    function cs(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c = e.$getTranslation(e.node.label) + '';
      function d() {
        return e.click_handler_7(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            (i = k('span')),
            (r = $(c)),
            (s = P()),
            D(i, 'class', 'fd-nested-list__title'),
            D(n, 'class', 'fd-nested-list__link'),
            D(n, 'href', (o = e.getRouteLink(e.node))),
            D(n, 'aria-selected', (a = e.node === e.selectedNodeForTabNav)),
            D(t, 'class', 'fd-nested-list__item'),
            (l = L(n, 'click', R(d)));
        },
        m(e, o) {
          I(e, t, o), x(t, n), x(n, i), x(i, r), x(t, s);
        },
        p(t, i) {
          (e = i),
            (t.$getTranslation || t.children) && c !== (c = e.$getTranslation(e.node.label) + '') && O(r, c),
            t.children && o !== (o = e.getRouteLink(e.node)) && D(n, 'href', o),
            (t.children || t.selectedNodeForTabNav) &&
              a !== (a = e.node === e.selectedNodeForTabNav) &&
              D(n, 'aria-selected', a);
        },
        d(e) {
          e && T(t), l();
        }
      };
    }
    function ds(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c = e.$getTranslation(e.node.label) + '';
      function d() {
        return e.click_handler_4(e);
      }
      return {
        c() {
          (t = k('li')),
            (n = k('a')),
            (i = k('span')),
            (r = $(c)),
            (s = P()),
            D(i, 'class', 'fd-nested-list__title'),
            D(n, 'href', (o = e.getRouteLink(e.node))),
            D(n, 'class', 'fd-nested-list__link'),
            D(n, 'aria-selected', (a = e.node === e.selectedNodeForTabNav)),
            D(t, 'class', 'fd-nested-list__item'),
            D(t, 'uid', e.index + '-' + e.index2),
            (l = L(n, 'click', R(d)));
        },
        m(e, o) {
          I(e, t, o), x(t, n), x(n, i), x(i, r), x(t, s);
        },
        p(t, i) {
          (e = i),
            (t.$getTranslation || t.children) && c !== (c = e.$getTranslation(e.node.label) + '') && O(r, c),
            t.children && o !== (o = e.getRouteLink(e.node)) && D(n, 'href', o),
            (t.children || t.selectedNodeForTabNav) &&
              a !== (a = e.node === e.selectedNodeForTabNav) &&
              D(n, 'aria-selected', a);
        },
        d(e) {
          e && T(t), l();
        }
      };
    }
    function us(e) {
      var t, n;
      function i(e, n) {
        return (
          (null == t || e.children || e.virtualGroupPrefix) &&
            (t = !('undefined' !== n.key && 0 !== n.key.indexOf(n.virtualGroupPrefix))),
          t ? ls : ss
        );
      }
      var r = i(null, e),
        o = r(e);
      return {
        c() {
          o.c(), (n = E());
        },
        m(e, t) {
          o.m(e, t), I(e, n, t);
        },
        p(e, t) {
          r === (r = i(e, t)) && o ? o.p(e, t) : (o.d(1), (o = r(t)) && (o.c(), o.m(n.parentNode, n)));
        },
        d(e) {
          o.d(e), e && T(n);
        }
      };
    }
    function fs(e) {
      var t,
        n,
        r = e.children && e.pathData.length > 1 && Qa(e);
      return {
        c() {
          r && r.c(),
            (t = E()),
            (n = [
              L(Wa, 'click', e.closeAllDropdowns),
              L(Wa, 'blur', e.closeAllDropdowns),
              L(Wa, 'resize', e.onResize)
            ]);
        },
        m(e, n) {
          r && r.m(e, n), I(e, t, n);
        },
        p(e, n) {
          n.children && n.pathData.length > 1
            ? r
              ? r.p(e, n)
              : ((r = Qa(n)).c(), r.m(t.parentNode, t))
            : r && (r.d(1), (r = null));
        },
        i: i,
        o: i,
        d(e) {
          r && r.d(e), e && T(t), l(n);
        }
      };
    }
    function ps(e, t) {
      return t && t.category && (t.category === e || t.category.label === e);
    }
    const hs = e => e.stopPropagation(),
      gs = e => e.stopPropagation();
    function ms(e, t, n) {
      let i,
        r,
        o,
        a,
        { children: s, pathData: l, pathParams: c } = t,
        { hideNavComponent: d, virtualGroupPrefix: u = xt.virtualGroupPrefix } = t,
        { selectedNodeForTabNav: f, dropDownStates: h = {}, isMoreBtnExpanded: g = !1, resizeTabNavToggle: m } = t,
        v = X('getTranslation');
      p(e, v, e => {
        n('$getTranslation', (i = e));
      });
      const b = () => ({
          children: s,
          pathData: l,
          hideNavComponent: d,
          virtualGroupPrefix: u,
          selectedNode: o,
          selectedNodeForTabNav: f,
          dropDownStates: h,
          isMoreBtnExpanded: g
        }),
        w = e => {
          e &&
            Object.getOwnPropertyNames(e).forEach(t => {
              'pathData' === t
                ? n('pathData', (l = e.pathData))
                : 'context' === t
                ? (context = e.context)
                : 'children' === t
                ? n('children', (s = e.children))
                : 'selectedNode' === t
                ? (o = e.selectedNode)
                : 'selectedNodeForTabNav' === t && n('selectedNodeForTabNav', (f = e.selectedNodeForTabNav));
            });
        },
        S = Y(),
        y = async () => {
          const e = b();
          [...l].pop();
          const t = await dt.getTabNavData({ ...e }, e);
          t && (w({ ...t }), (r = l), (window.LEFTNAVDATA = t.groupedChildren), setTimeout(_));
        },
        _ = () => {
          C();
          let e,
            t,
            n,
            i = document.getElementsByClassName('luigi-tabsContainer')[0],
            r = document.getElementsByClassName('luigi-tabsMoreButton')[0],
            o = document.getElementsByClassName('luigi__more')[0],
            a = 0,
            s = !1,
            l = b();
          l.pathData[l.pathData.length - 1];
          if ((o.setAttribute('aria-selected', 'false'), i)) {
            (e = i.offsetWidth),
              [...i.children].forEach(i => {
                (t = i.currentStyle || window.getComputedStyle(i)),
                  (n = parseFloat(t.marginLeft) + parseFloat(t.marginRight)),
                  (a += i.offsetWidth + n);
                let r = i.getAttribute('uid');
                a >= e
                  ? (i.classList.add('hide_element'),
                    'true' === i.getAttribute('isSelected') && o.setAttribute('aria-selected', 'true'),
                    document.querySelector('li[uid="' + r + '"]').classList.remove('hide_element'),
                    (s = !0))
                  : document.querySelector('li[uid="' + r + '"]').classList.add('hide_element');
              }),
              s ? r.classList.remove('hide_element') : r.classList.add('hide_element');
          }
        },
        C = () => {
          let e = document.getElementsByClassName('luigi-tabsContainer')[0];
          document.getElementsByClassName('luigi__more')[0];
          [...e.children].forEach(e => {
            e.classList.remove('hide_element');
          });
        };
      function x(e) {
        T(), S('handleClick', { node: e });
      }
      function I(e) {
        let t = {};
        h[e] || (t[e] = !0), n('dropDownStates', (h = t));
      }
      function T() {
        n('dropDownStates', (h = {})), n('isMoreBtnExpanded', (g = !1));
      }
      q(() => {
        n('hideNavComponent', (d = Ze.getConfigBooleanValue('settings.hideNavigation')));
      }),
        H(() => {
          (r && r == l) || y(), (void 0 !== a && a === m) || ((a = m), y());
        });
      return (
        (e.$set = e => {
          'children' in e && n('children', (s = e.children)),
            'pathData' in e && n('pathData', (l = e.pathData)),
            'pathParams' in e && n('pathParams', (c = e.pathParams)),
            'hideNavComponent' in e && n('hideNavComponent', (d = e.hideNavComponent)),
            'virtualGroupPrefix' in e && n('virtualGroupPrefix', (u = e.virtualGroupPrefix)),
            'selectedNodeForTabNav' in e && n('selectedNodeForTabNav', (f = e.selectedNodeForTabNav)),
            'dropDownStates' in e && n('dropDownStates', (h = e.dropDownStates)),
            'isMoreBtnExpanded' in e && n('isMoreBtnExpanded', (g = e.isMoreBtnExpanded)),
            'resizeTabNavToggle' in e && n('resizeTabNavToggle', (m = e.resizeTabNavToggle));
        }),
        {
          children: s,
          pathData: l,
          pathParams: c,
          hideNavComponent: d,
          virtualGroupPrefix: u,
          selectedNodeForTabNav: f,
          dropDownStates: h,
          isMoreBtnExpanded: g,
          resizeTabNavToggle: m,
          getTranslation: v,
          getRouteLink: function(e) {
            return It.getNodeHref(e, c);
          },
          handleClick: x,
          toggleDropdownState: I,
          closeAllDropdowns: T,
          onResize: function() {
            C(), _();
          },
          toggleMoreBtn: function() {
            n('isMoreBtnExpanded', (g = !g));
          },
          Object: Object,
          $getTranslation: i,
          click_handler: ({ node: e }) => x(e),
          click_handler_1: ({ key: e }) => I(e),
          click_handler_2: ({ node: e }) => x(e),
          click_handler_4: ({ node: e }) => x(e),
          click_handler_5: ({ key: e, index: t }) => I(e + t),
          click_handler_6: ({ key: e, index: t }) => I(e + t),
          click_handler_7: ({ node: e }) => x(e),
          toggleDropdownState_handler: e => I(e.name)
        }
      );
    }
    var vs = class extends Pe {
      constructor(e) {
        super(),
          $e(this, e, ms, fs, d, [
            'children',
            'pathData',
            'pathParams',
            'hideNavComponent',
            'virtualGroupPrefix',
            'selectedNodeForTabNav',
            'dropDownStates',
            'isMoreBtnExpanded',
            'resizeTabNavToggle',
            'handleClick',
            'toggleDropdownState',
            'closeAllDropdowns',
            'onResize',
            'toggleMoreBtn'
          ]);
      }
      get handleClick() {
        return this.$$.ctx.handleClick;
      }
      get toggleDropdownState() {
        return this.$$.ctx.toggleDropdownState;
      }
      get closeAllDropdowns() {
        return this.$$.ctx.closeAllDropdowns;
      }
      get onResize() {
        return this.$$.ctx.onResize;
      }
      get toggleMoreBtn() {
        return this.$$.ctx.toggleMoreBtn;
      }
    };
    let bs = 'not_checked';
    Nt.addEventListener(
      'message',
      function(e) {
        'luigi.tpcDisabled' === e.data
          ? (console.warn('Third party cookies are not supported! Silent token renewal might not work!'),
            (bs = 'disabled'))
          : 'luigi.tpcEnabled' === e.data && (bs = 'enabled');
      },
      !1
    );
    n(404);
    const { window: ws } = xe;
    function Ss(e) {
      var t,
        n = new Ft({ props: { settings: e.confirmationModal.settings } });
      return (
        n.$on('modalConfirm', e.modalConfirm_handler),
        n.$on('modalDismiss', e.modalDismiss_handler),
        {
          c() {
            n.$$.fragment.c();
          },
          m(e, i) {
            Ne(n, e, i), (t = !0);
          },
          p(e, t) {
            var i = {};
            e.confirmationModal && (i.settings = t.confirmationModal.settings), n.$set(i);
          },
          i(e) {
            t || (be(n.$$.fragment, e), (t = !0));
          },
          o(e) {
            we(n.$$.fragment, e), (t = !1);
          },
          d(e) {
            ke(n, e);
          }
        }
      );
    }
    function ys(e) {
      var t,
        n = new Lt({ props: { alertQueue: e.alerts } });
      return (
        n.$on('alertDismiss', e.handleAlertDismissExternal),
        {
          c() {
            n.$$.fragment.c();
          },
          m(e, i) {
            Ne(n, e, i), (t = !0);
          },
          p(e, t) {
            var i = {};
            e.alerts && (i.alertQueue = t.alerts), n.$set(i);
          },
          i(e) {
            t || (be(n.$$.fragment, e), (t = !0));
          },
          o(e) {
            we(n.$$.fragment, e), (t = !1);
          },
          d(e) {
            ke(n, e);
          }
        }
      );
    }
    function _s(e) {
      var t,
        n = new Gt({ props: { modalSettings: e.mfModal.modalSettings, nodepath: e.mfModal.nodepath } });
      return (
        n.$on('close', e.closeModal),
        n.$on('iframeCreated', e.modalIframeCreated),
        {
          c() {
            n.$$.fragment.c();
          },
          m(e, i) {
            Ne(n, e, i), (t = !0);
          },
          p(e, t) {
            var i = {};
            e.mfModal && (i.modalSettings = t.mfModal.modalSettings),
              e.mfModal && (i.nodepath = t.mfModal.nodepath),
              n.$set(i);
          },
          i(e) {
            t || (be(n.$$.fragment, e), (t = !0));
          },
          o(e) {
            we(n.$$.fragment, e), (t = !1);
          },
          d(e) {
            ke(n, e);
          }
        }
      );
    }
    function Cs(e) {
      var t,
        n = new tn({
          props: {
            splitViewSettings: e.mfSplitView.settings,
            collapsed: e.mfSplitView.collapsed,
            nodepath: e.mfSplitView.nodepath
          }
        });
      return (
        n.$on('iframeCreated', e.splitViewIframeCreated),
        n.$on('statusChanged', e.splitViewStatusChanged),
        {
          c() {
            n.$$.fragment.c();
          },
          m(e, i) {
            Ne(n, e, i), (t = !0);
          },
          p(e, t) {
            var i = {};
            e.mfSplitView && (i.splitViewSettings = t.mfSplitView.settings),
              e.mfSplitView && (i.collapsed = t.mfSplitView.collapsed),
              e.mfSplitView && (i.nodepath = t.mfSplitView.nodepath),
              n.$set(i);
          },
          i(e) {
            t || (be(n.$$.fragment, e), (t = !0));
          },
          o(e) {
            we(n.$$.fragment, e), (t = !1);
          },
          d(e) {
            ke(n, e);
          }
        }
      );
    }
    function xs(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c = new Kt({ props: { area: 'main' } }),
        d = e.mfSplitView.displayed && Cs(e);
      return {
        c() {
          (t = k('div')),
            c.$$.fragment.c(),
            (n = P()),
            (i = k('div')),
            (a = P()),
            d && d.c(),
            (s = E()),
            D(i, 'class', 'wcContainer svelte-1evov4x'),
            D(
              t,
              'class',
              (r =
                'fd-page iframeContainer ' +
                (e.mfSplitView.displayed ? 'lui-split-view' : '') +
                ' ' +
                (e.mfSplitView.collapsed ? 'lui-collapsed' : '') +
                ' svelte-1evov4x')
            );
        },
        m(r, u) {
          I(r, t, u),
            Ne(c, t, null),
            x(t, n),
            x(t, i),
            (o = e.init.call(null, t) || {}),
            I(r, a, u),
            d && d.m(r, u),
            I(r, s, u),
            (l = !0);
        },
        p(e, n) {
          (l && !e.mfSplitView) ||
            r ===
              (r =
                'fd-page iframeContainer ' +
                (n.mfSplitView.displayed ? 'lui-split-view' : '') +
                ' ' +
                (n.mfSplitView.collapsed ? 'lui-collapsed' : '') +
                ' svelte-1evov4x') ||
            D(t, 'class', r),
            n.mfSplitView.displayed
              ? d
                ? (d.p(e, n), be(d, 1))
                : ((d = Cs(n)).c(), be(d, 1), d.m(s.parentNode, s))
              : d &&
                (me(),
                we(d, 1, 1, () => {
                  d = null;
                }),
                ve());
        },
        i(e) {
          l || (be(c.$$.fragment, e), be(d), (l = !0));
        },
        o(e) {
          we(c.$$.fragment, e), we(d), (l = !1);
        },
        d(e) {
          e && T(t), ke(c), o && 'function' == typeof o.destroy && o.destroy(), e && T(a), d && d.d(e), e && T(s);
        }
      };
    }
    function Is(e) {
      var t, n, i, r;
      return {
        c() {
          ((t = k('div')).innerHTML =
            '<div class="fd-busy-indicator--m svelte-1evov4x" aria-hidden="false" aria-label="Loading" data-testid="luigi-loading-spinner"><div class="fd-busy-indicator--circle-0 svelte-1evov4x"></div> <div class="fd-busy-indicator--circle-1 svelte-1evov4x"></div> <div class="fd-busy-indicator--circle-2 svelte-1evov4x"></div></div>'),
            D(t, 'class', 'fd-page spinnerContainer svelte-1evov4x'),
            D(t, 'aria-hidden', 'false'),
            D(t, 'aria-label', 'Loading');
        },
        m(e, n) {
          I(e, t, n), (r = !0);
        },
        i(e) {
          r ||
            (le(() => {
              i && i.end(1), n || (n = ye(t, jt, { delay: 250, duration: 250 })), n.start();
            }),
            (r = !0));
        },
        o(e) {
          n && n.invalidate(), (i = _e(t, jt, { duration: 250 })), (r = !1);
        },
        d(e) {
          e && (T(t), i && i.end());
        }
      };
    }
    function Ts(e) {
      var t,
        n = new mi({ props: { pathData: e.navigationPath, pathParams: e.pathParams } });
      return (
        n.$on('handleClick', e.handleNavClick),
        n.$on('resizeTabNav', e.onResizeTabNav),
        {
          c() {
            n.$$.fragment.c();
          },
          m(e, i) {
            Ne(n, e, i), (t = !0);
          },
          p(e, t) {
            var i = {};
            e.navigationPath && (i.pathData = t.navigationPath),
              e.pathParams && (i.pathParams = t.pathParams),
              n.$set(i);
          },
          i(e) {
            t || (be(n.$$.fragment, e), (t = !0));
          },
          o(e) {
            we(n.$$.fragment, e), (t = !1);
          },
          d(e) {
            ke(n, e);
          }
        }
      );
    }
    function Ns(e) {
      var t,
        n = new vs({
          props: { pathData: e.navigationPath, pathParams: e.pathParams, resizeTabNavToggle: e.resizeTabNavToggle }
        });
      return (
        n.$on('handleClick', e.handleNavClick),
        {
          c() {
            n.$$.fragment.c();
          },
          m(e, i) {
            Ne(n, e, i), (t = !0);
          },
          p(e, t) {
            var i = {};
            e.navigationPath && (i.pathData = t.navigationPath),
              e.pathParams && (i.pathParams = t.pathParams),
              e.resizeTabNavToggle && (i.resizeTabNavToggle = t.resizeTabNavToggle),
              n.$set(i);
          },
          i(e) {
            t || (be(n.$$.fragment, e), (t = !0));
          },
          o(e) {
            we(n.$$.fragment, e), (t = !1);
          },
          d(e) {
            ke(n, e);
          }
        }
      );
    }
    function ks(e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s,
        l,
        c,
        d,
        u,
        f,
        p,
        h,
        g,
        m,
        v,
        b = e.confirmationModal.displayed && Ss(e),
        w = e.alerts && e.alerts.length && ys(e),
        S = e.mfModal.displayed && _s(e),
        y = new Kt({ props: { $$slots: { default: [xs] }, $$scope: { ctx: e } } }),
        _ = e.showLoadingIndicator && Is();
      function C(t) {
        e.topnav_isSearchFieldVisible_binding.call(null, t), (s = !0), ce(() => (s = !1));
      }
      function N(t) {
        e.topnav_displaySearchResult_binding.call(null, t), (l = !0), ce(() => (l = !1));
      }
      function $(t) {
        e.topnav_displayCustomSearchResult_binding.call(null, t), (c = !0), ce(() => (c = !1));
      }
      function E(t) {
        e.topnav_searchResult_binding.call(null, t), (d = !0), ce(() => (d = !1));
      }
      function R(t) {
        e.topnav_inputElem_binding.call(null, t), (u = !0), ce(() => (u = !1));
      }
      function A(t) {
        e.topnav_luigiCustomSearchRenderer__slot_binding.call(null, t), (f = !0), ce(() => (f = !1));
      }
      let O = { pathData: e.navigationPath, pathParams: e.pathParams };
      void 0 !== e.isSearchFieldVisible && (O.isSearchFieldVisible = e.isSearchFieldVisible),
        void 0 !== e.displaySearchResult && (O.displaySearchResult = e.displaySearchResult),
        void 0 !== e.displayCustomSearchResult && (O.displayCustomSearchResult = e.displayCustomSearchResult),
        void 0 !== e.searchResult && (O.searchResult = e.searchResult),
        void 0 !== e.inputElem && (O.inputElem = e.inputElem),
        void 0 !== e.luigiCustomSearchRenderer__slot &&
          (O.luigiCustomSearchRenderer__slot = e.luigiCustomSearchRenderer__slot);
      var V = new Ba({ props: O });
      te.push(() => Te(V, 'isSearchFieldVisible', C)),
        te.push(() => Te(V, 'displaySearchResult', N)),
        te.push(() => Te(V, 'displayCustomSearchResult', $)),
        te.push(() => Te(V, 'searchResult', E)),
        te.push(() => Te(V, 'inputElem', R)),
        te.push(() => Te(V, 'luigiCustomSearchRenderer__slot', A)),
        V.$on('handleClick', e.handleNavClick),
        V.$on('resizeTabNav', e.onResizeTabNav),
        V.$on('toggleSearch', e.toggleSearch),
        V.$on('closeSearchResult', e.closeSearchResult),
        V.$on('handleSearchNavigation', e.handleSearchNavigation);
      var M = !(e.hideNav || e.hideSideNav) && Ts(e),
        F = e.tabNav && !e.hideNav && Ns(e);
      return {
        c() {
          (t = k('div')),
            b && b.c(),
            (n = P()),
            w && w.c(),
            (i = P()),
            S && S.c(),
            (r = P()),
            y.$$.fragment.c(),
            (o = P()),
            _ && _.c(),
            (a = P()),
            V.$$.fragment.c(),
            (p = P()),
            M && M.c(),
            (h = P()),
            F && F.c(),
            D(t, 'id', 'app'),
            D(
              t,
              'class',
              (g = (e.hideNav ? 'no-nav' : '') + ' ' + (e.hideSideNav ? 'no-side-nav' : '') + ' svelte-1evov4x')
            ),
            (v = L(ws, 'resize', e.onResize));
        },
        m(e, s) {
          I(e, t, s),
            b && b.m(t, null),
            x(t, n),
            w && w.m(t, null),
            x(t, i),
            S && S.m(t, null),
            x(t, r),
            Ne(y, t, null),
            x(t, o),
            _ && _.m(t, null),
            x(t, a),
            Ne(V, t, null),
            x(t, p),
            M && M.m(t, null),
            x(t, h),
            F && F.m(t, null),
            (m = !0);
        },
        p(e, o) {
          o.confirmationModal.displayed
            ? b
              ? (b.p(e, o), be(b, 1))
              : ((b = Ss(o)).c(), be(b, 1), b.m(t, n))
            : b &&
              (me(),
              we(b, 1, 1, () => {
                b = null;
              }),
              ve()),
            o.alerts && o.alerts.length
              ? w
                ? (w.p(e, o), be(w, 1))
                : ((w = ys(o)).c(), be(w, 1), w.m(t, i))
              : w &&
                (me(),
                we(w, 1, 1, () => {
                  w = null;
                }),
                ve()),
            o.mfModal.displayed
              ? S
                ? (S.p(e, o), be(S, 1))
                : ((S = _s(o)).c(), be(S, 1), S.m(t, r))
              : S &&
                (me(),
                we(S, 1, 1, () => {
                  S = null;
                }),
                ve());
          var p = {};
          (e.$$scope || e.mfSplitView) && (p.$$scope = { changed: e, ctx: o }),
            y.$set(p),
            o.showLoadingIndicator
              ? _
                ? be(_, 1)
                : ((_ = Is()).c(), be(_, 1), _.m(t, a))
              : _ &&
                (me(),
                we(_, 1, 1, () => {
                  _ = null;
                }),
                ve());
          var v = {};
          e.navigationPath && (v.pathData = o.navigationPath),
            e.pathParams && (v.pathParams = o.pathParams),
            !s && e.isSearchFieldVisible && (v.isSearchFieldVisible = o.isSearchFieldVisible),
            !l && e.displaySearchResult && (v.displaySearchResult = o.displaySearchResult),
            !c && e.displayCustomSearchResult && (v.displayCustomSearchResult = o.displayCustomSearchResult),
            !d && e.searchResult && (v.searchResult = o.searchResult),
            !u && e.inputElem && (v.inputElem = o.inputElem),
            !f &&
              e.luigiCustomSearchRenderer__slot &&
              (v.luigiCustomSearchRenderer__slot = o.luigiCustomSearchRenderer__slot),
            V.$set(v),
            o.hideNav || o.hideSideNav
              ? M &&
                (me(),
                we(M, 1, 1, () => {
                  M = null;
                }),
                ve())
              : M
              ? (M.p(e, o), be(M, 1))
              : ((M = Ts(o)).c(), be(M, 1), M.m(t, h)),
            o.tabNav && !o.hideNav
              ? F
                ? (F.p(e, o), be(F, 1))
                : ((F = Ns(o)).c(), be(F, 1), F.m(t, null))
              : F &&
                (me(),
                we(F, 1, 1, () => {
                  F = null;
                }),
                ve()),
            (m && !e.hideNav && !e.hideSideNav) ||
              g ===
                (g = (o.hideNav ? 'no-nav' : '') + ' ' + (o.hideSideNav ? 'no-side-nav' : '') + ' svelte-1evov4x') ||
              D(t, 'class', g);
        },
        i(e) {
          m || (be(b), be(w), be(S), be(y.$$.fragment, e), be(_), be(V.$$.fragment, e), be(M), be(F), (m = !0));
        },
        o(e) {
          we(b), we(w), we(S), we(y.$$.fragment, e), we(_), we(V.$$.fragment, e), we(M), we(F), (m = !1);
        },
        d(e) {
          e && T(t), b && b.d(), w && w.d(), S && S.d(), ke(y), _ && _.d(), ke(V), M && M.d(), F && F.d(), v();
        }
      };
    }
    function $s(e, t, n) {
      const i = Y();
      let r,
        o,
        a,
        s,
        l,
        c,
        d,
        u,
        f,
        p,
        h,
        g,
        m,
        v,
        b,
        w,
        S,
        y,
        _,
        C,
        x,
        I,
        T,
        N,
        k,
        $,
        { store: P, getTranslation: E } = t,
        L = !1,
        R = { displayed: !1 },
        A = !0,
        D = !1,
        O = [],
        V = { isDirty: !1, persistUrl: null },
        M = !1,
        {
          isSearchFieldVisible: F,
          inputElem: j,
          luigiCustomSearchRenderer__slot: U,
          displaySearchResult: B,
          displayCustomSearchResult: z = !0,
          searchResult: W
        } = t;
      const G = e => {
          const t = e.iframe.luigi;
          $ = at.getActiveFeatureToggleList();
          const n = {
            isNavigateBack: D,
            viewStackSize: O.length,
            activeFeatureToggleList: $,
            currentLocale: nt.getCurrentLocale(),
            currentTheme: ot.getCurrentTheme(),
            clientPermissions: t.nextViewUrl ? t.nextClientPermissions : t.clientPermissions
          };
          return (
            Ct.specialIframeTypes
              .map(e => e.iframeConfigKey)
              .forEach(t => {
                n[t] = e[t] || !1;
              }),
            n
          );
        },
        H = async (e, t = {}) => {
          if (!e.iframe) return void console.info('iframe does not exist, not able to send context.');
          const n = G(e),
            i = {
              msg: 'luigi.init',
              context: JSON.stringify(Object.assign({}, e.context || u, t)),
              nodeParams: JSON.stringify(Object.assign({}, e.nodeParams || f)),
              pathParams: JSON.stringify(Object.assign({}, e.pathParams || p)),
              internal: JSON.stringify(n),
              authData: St.getStoredAuthData()
            };
          Ct.sendMessageToIframe(e.iframe, i);
        },
        J = e => {
          const t = { msg: 'luigi.auth.tokenIssued', authData: e };
          Ct.broadcastMessageToAllIframes(t);
        },
        X = (e, t) => {
          let n = re(e.params);
          (n = _t.addLeadingSlash(n)),
            ((e, t) => {
              if (e.params.preserveView || e.params.viewgroup) {
                const n = re(e.params);
                O.push({ path: ht.getNodePath(g, h), nextPath: n.startsWith('/') ? n : '/' + n, context: u }),
                  (t.iframe.pv = 'pv');
              }
            })(e, t),
            ht.navigateTo(n);
        },
        Z = e => e.split('?')[0],
        ee = e =>
          new Promise(t => {
            ye(e)
              ? _e().then(
                  () => {
                    V && V.dirtySet && (e ? V.dirtySet.delete(e) : V.dirtySet.clear()), t();
                  },
                  () => {}
                )
              : t();
          }),
        te = () => ({
          get: () => ({
            unsavedChanges: V,
            hideNav: ce,
            viewUrl: m,
            nodeParams: f,
            viewGroup: v,
            urlParamsRaw: h,
            currentNode: g,
            navigationPath: _,
            context: u,
            pathParams: p,
            hideSideNav: de,
            isolateView: b,
            pageErrorHandler: w,
            previousNodeValues: S,
            mfSplitView: R,
            splitViewValues: r,
            splitViewIframe: l,
            showLoadingIndicator: L,
            tabNav: T,
            isNavigateBack: D,
            goBackContext: y,
            isNavigationSyncEnabled: A
          }),
          set: e => {
            e &&
              Object.getOwnPropertyNames(e).forEach(t => {
                'hideNav' === t
                  ? n('hideNav', (ce = e.hideNav))
                  : 'viewUrl' === t
                  ? (m = e.viewUrl)
                  : 'nodeParams' === t
                  ? (f = e.nodeParams)
                  : 'viewGroup' === t
                  ? (v = e.viewGroup)
                  : 'urlParamsRaw' === t
                  ? (h = e.urlParamsRaw)
                  : 'currentNode' === t
                  ? (g = e.currentNode)
                  : 'navigationPath' === t
                  ? n('navigationPath', (_ = e.navigationPath))
                  : 'context' === t
                  ? (u = e.context)
                  : 'pathParams' === t
                  ? n('pathParams', (p = e.pathParams))
                  : 'hideSideNav' === t
                  ? n('hideSideNav', (de = e.hideSideNav))
                  : 'isolateView' === t
                  ? (b = e.isolateView)
                  : 'pageErrorHandler' === t
                  ? (w = e.pageErrorHandler)
                  : 'previousNodeValues' === t
                  ? (S = e.previousNodeValues)
                  : 'mfSplitView' === t
                  ? n('mfSplitView', (R = e.mfSplitView))
                  : 'splitViewValues' === t
                  ? (r = e.splitViewValues)
                  : 'splitViewIframe' === t
                  ? (l = e.splitViewIframe)
                  : 'showLoadingIndicator' === t
                  ? n('showLoadingIndicator', (L = e.showLoadingIndicator))
                  : 'tabNav' === t
                  ? n('tabNav', (T = e.tabNav))
                  : 'isNavigateBack' === t
                  ? (D = e.isNavigateBack)
                  : 'goBackContext' === t
                  ? (y = e.goBackContext)
                  : 'isNavigationSyncEnabled' === t && (A = e.isNavigationSyncEnabled);
              });
          },
          shouldShowUnsavedChangesModal: ye,
          getUnsavedChangesModalPromise: ee,
          showUnsavedChangesModal: _e,
          showAlert: ge,
          prepareInternalData: G,
          dispatch: i
        }),
        ne = (e, t) => {
          Tt.doOnStoreChange(
            P,
            () => {
              ct.deleteCache();
              const n = ht.getCurrentPath();
              ht.handleRouteChange(n, te(), e, t);
            },
            ['navigation.nodes']
          ),
            It.addRouteChangeListener(n => {
              ((e, t) => {
                if (0 === e.length) return !1;
                const n = t.startsWith('/') ? t : `/${t}`,
                  i = [...e].pop();
                return [Z(i.path), Z(i.nextPath)].includes(Z(n));
              })(O, n) || ((O = []), st.removeInactiveIframes(e)),
                Te(),
                le(),
                ht.handleRouteChange(n, te(), e, t);
            });
        },
        ie = e => _t.replaceVars(ht.getNodePath(e), p, ':', !1),
        re = e => {
          let t = e.link;
          if (e.fromVirtualTreeRoot) {
            const n = [..._].reverse().find(e => e.virtualTree);
            if (!n)
              return void console.error(
                'LuigiClient Error: fromVirtualTreeRoot() is not possible, not inside a virtualTree navigation. Docs: https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=virtualtree'
              );
            t = ht.concatenatePath(ie(n), e.link);
          } else if (e.fromParent) t = ht.concatenatePath(ie(g.parent), e.link);
          else if (e.fromClosestContext) {
            const n = [..._].reverse().find(e => e.navigationContext && e.navigationContext.length > 0);
            t = ht.concatenatePath(ie(n), e.link);
          } else if (e.fromContext) {
            const n = e.fromContext,
              i = _.find(e => n === e.navigationContext);
            t = ht.concatenatePath(ie(i), e.link);
          } else e.relative && (t = ht.concatenatePath(ie(g), e.link));
          return (
            e.nodeParams &&
              Object.keys(e.nodeParams).length &&
              ((t += t.includes('?') ? '&' : '?'),
              Object.entries(e.nodeParams).forEach((n, i) => {
                t +=
                  encodeURIComponent(It.getContentViewParamPrefix() + n[0]) +
                  '=' +
                  encodeURIComponent(n[1]) +
                  (i < Object.keys(e.nodeParams).length - 1 ? '&' : '');
              })),
            t
          );
        };
      Q('handleNavigation', X);
      const oe = e => !!e || (console.warn('No search provider defined.'), !1),
        ae = () => {
          if (oe(k) && (n('displaySearchResult', (B = !1)), n('searchResult', (W = [])), U))
            for (; U.lastElementChild; ) U.removeChild(U.lastElementChild);
        },
        se = (e, t) => {
          R.displayed ? console.warn('Only one splitview can be oppened at a time') : gt.open(te(), e, t);
        },
        le = () => {
          gt.close(te());
        };
      let ce, de, ue;
      const fe = () => {
        document.body.classList.remove('lui-leftNavToggle');
      };
      let pe = [];
      const he = (e, t) => {
          if (e && e.length) return e.filter(e => e.settings.id === t)[0];
        },
        ge = (e, t = !1) => {
          const i = pe;
          return (
            e.id || (e.id = _t.getRandomId()),
            e.id && i && he(i, e.id)
              ? (console.error(
                  `The alert with id '${e.id}' already exists in a queue, therefore it won't be displayed `
                ),
                Promise.reject())
              : (e.closeAfter &&
                  setTimeout(() => {
                    he(pe, e.id) && me(e.id);
                  }, e.closeAfter),
                new Promise((r, o) => {
                  n(
                    'alerts',
                    (pe = [...(i || []), { displayed: !0, settings: e, openFromClient: t, promise: { resolve: r } }])
                  );
                }))
          );
        },
        me = e => {
          const t = he(pe, e);
          if (!t) return void console.error('An unexisting alert has been dismissed.', pe, e);
          const i = t.openFromClient;
          if ((n('alerts', (pe = pe.filter(t => t.settings.id !== e))), i)) {
            const t = st.getActiveIframe(C),
              n = { msg: 'luigi.ux.alert.hide', id: e };
            Ct.sendMessageToIframe(t, n);
          }
        };
      let ve;
      const be = () => {
        n('confirmationModal', (ve = { displayed: !1, content: {}, openFromClient: !1, promise: null }));
      };
      be();
      const we = (e, t = !1) =>
          new Promise((i, r) => {
            n(
              'confirmationModal',
              (ve = { displayed: !0, settings: e, openFromClient: t, promise: { resolve: i, reject: r } })
            );
          }),
        Se = e => {
          const { promise: t, openFromClient: n } = ve;
          if ((be(), e ? t.resolve() : t.reject(), n)) {
            const t = st.getActiveIframe(C),
              n = { msg: 'luigi.ux.confirmationModal.hide', data: { confirmed: e } };
            Ct.sendMessageToIframe(t, n);
          }
        },
        ye = e => {
          if (V.dirtySet) {
            if (e) return V.dirtySet.has(e);
            if (V.dirtySet.size > 0) return !0;
          }
          return !1;
        },
        _e = () =>
          we({
            header: nt.getTranslation('luigi.unsavedChangesAlert.header'),
            body: nt.getTranslation('luigi.unsavedChangesAlert.body'),
            buttonDismiss: nt.getTranslation('luigi.button.dismiss'),
            buttonConfirm: nt.getTranslation('luigi.button.confirm')
          });
      Q('getUnsavedChangesModalPromise', ee);
      let Ce = {};
      const xe = () => {
        n('mfModal', (Ce.displayed = !1), Ce),
          n('mfModal', (Ce.nodepath = void 0), Ce),
          n('mfModal', (Ce.modalSettings = {}), Ce);
      };
      xe();
      const Ie = async (e, t) => {
          const { nodeObject: i } = await dt.extractDataFromPath(e);
          (await dt.shouldPreventNavigation(i)) ||
            (n('mfModal', (Ce.displayed = !0), Ce),
            n('mfModal', (Ce.nodepath = e), Ce),
            n('mfModal', (Ce.modalSettings = t), Ce));
        },
        Te = () => {
          o &&
            ee(o.contentWindow).then(() => {
              xe();
            });
        };
      Q('openViewInModal', Ie), Q('store', P), Q('getTranslation', E);
      const Ne = e => {
        N &&
          N.thirdPartyCookieErrorHandling &&
          _t.isFunction(N.thirdPartyCookieErrorHandling) &&
          N.thirdPartyCookieErrorHandling();
      };
      q(() => {
        ot._init(),
          (k = Ze.getConfigValue('globalSearch.searchProvider')),
          (I = Ze.getConfigValue('settings.responsiveNavigation')),
          (ue = window.innerWidth),
          'simple' === I
            ? (document.body.classList.add('lui-simpleSlideInNav'), (x = !0))
            : 'simpleMobileOnly' === I
            ? (document.body.classList.add('lui-simpleSlideInNav', 'lui-mobileOnly'), (x = !0))
            : document.body.classList.add('lui-semiCollapsible'),
          (N = Ze.getConfigValue('settings.thirdPartyCookieCheck')) &&
            N.thirdPartyCookieScriptLocation &&
            setTimeout(() => {
              let e = document.createElement('iframe');
              (e.width = '0px'),
                (e.height = '0px'),
                (e.src = N.thirdPartyCookieScriptLocation),
                document.body.appendChild(e),
                (e.onload = function() {
                  setTimeout(() => {
                    'disabled' === bs && Ne(N);
                  }),
                    document.body.removeChild(e);
                });
            });
      }),
        K(() => {});
      return (
        (e.$set = e => {
          'store' in e && n('store', (P = e.store)),
            'getTranslation' in e && n('getTranslation', (E = e.getTranslation)),
            'isSearchFieldVisible' in e && n('isSearchFieldVisible', (F = e.isSearchFieldVisible)),
            'inputElem' in e && n('inputElem', (j = e.inputElem)),
            'luigiCustomSearchRenderer__slot' in e &&
              n('luigiCustomSearchRenderer__slot', (U = e.luigiCustomSearchRenderer__slot)),
            'displaySearchResult' in e && n('displaySearchResult', (B = e.displaySearchResult)),
            'displayCustomSearchResult' in e && n('displayCustomSearchResult', (z = e.displayCustomSearchResult)),
            'searchResult' in e && n('searchResult', (W = e.searchResult));
        }),
        {
          store: P,
          getTranslation: E,
          showLoadingIndicator: L,
          mfSplitView: R,
          pathParams: p,
          navigationPath: _,
          tabNav: T,
          resizeTabNavToggle: M,
          isSearchFieldVisible: F,
          inputElem: j,
          luigiCustomSearchRenderer__slot: U,
          displaySearchResult: B,
          displayCustomSearchResult: z,
          searchResult: W,
          handleNavClick: e => {
            const t = e.detail.node;
            ee().then(() => {
              if ((fe(), t.openNodeInModal)) {
                const e = It.buildRoute(t, `/${t.pathSegment}`);
                Ie(e, !0 === t.openNodeInModal ? {} : t.openNodeInModal);
              } else te().set({ isNavigationSyncEnabled: !0 }), ht.handleRouteClick(t, te());
            });
          },
          onResizeTabNav: () => {
            n('resizeTabNavToggle', (M = !M));
          },
          closeSearchField: () => {
            oe(k) && n('isSearchFieldVisible', (F = !1));
          },
          openSearchField: () => {
            oe(k) && j && (n('isSearchFieldVisible', (F = !0)), j.focus());
          },
          clearSearchField: () => {
            oe(k) && j && (n('inputElem', (j.value = ''), j), ae());
          },
          toggleSearch: () => {
            n('isSearchFieldVisible', (F = !F)), rt.clearSearchField();
          },
          getGlobalSearchString: () => {
            if (oe(k) && j) return j.value;
          },
          setGlobalSearchString: e => {
            oe(k) &&
              j &&
              (n('inputElem', (j.value = e), j),
              _t.isFunction(k.onInput)
                ? k.onInput()
                : console.error('onInput is not a function. Please check the global search configuration.'));
          },
          showSearchResult: e => {
            if (oe(k))
              if (e && e.length > 0)
                if (_t.isFunction(k.customSearchResultRenderer)) {
                  n('displayCustomSearchResult', (z = !0));
                  let t = {
                    fireItemSelected: e => {
                      k.onSearchResultItemSelected(e);
                    }
                  };
                  k.customSearchResultRenderer(e, U, t);
                } else n('displaySearchResult', (B = !0)), n('searchResult', (W = e));
              else console.warn('Search result array is empty.');
          },
          closeSearchResult: ae,
          handleSearchNavigation: e => {
            let t = e.detail.node,
              n = { params: { link: t.link, nodeParams: t.params } };
            X(n);
          },
          openSplitView: se,
          closeSplitView: le,
          collapseSplitView: () => {
            gt.collapse(te()), n('mfSplitView', (R.collapsed = !0), R);
          },
          expandSplitView: () => {
            gt.expand(te()), n('mfSplitView', (R.collapsed = !1), R);
          },
          isSplitViewCollapsed: () => !!R.displayed && R.collapsed,
          isSplitViewExpanded: () => !!R.displayed && !R.collapsed,
          existsSplitView: () => R.displayed,
          splitViewIframeCreated: e => {
            (l = e.detail.splitViewIframe),
              (c = e.detail.splitViewIframeData),
              n('mfSplitView', (R.collapsed = e.detail.collapsed), R);
          },
          splitViewStatusChanged: e => {
            void 0 !== e.detail.displayed && n('mfSplitView', (R.displayed = e.detail.displayed), R),
              void 0 !== e.detail.collapsed && n('mfSplitView', (R.collapsed = e.detail.collapsed), R);
          },
          hideNav: ce,
          hideSideNav: de,
          onResize: () => {
            const e = window.innerWidth >= De.desktopMinWidth && ue < De.desktopMinWidth,
              t = window.innerWidth < De.desktopMinWidth && ue >= De.desktopMinWidth;
            (e || t) && fe(), (ue = window.innerWidth);
          },
          alerts: pe,
          showAlert: ge,
          handleAlertDismissExternal: e => {
            me(e.detail.id);
          },
          confirmationModal: ve,
          showModal: we,
          handleModalResult: Se,
          mfModal: Ce,
          modalIframeCreated: e => {
            (o = e.detail.modalIframe), (a = e.detail.modalIframeData);
          },
          closeModal: Te,
          init: function(e) {
            const t = Ze.getConfigValue('navigation.defaults.isolateView'),
              i = Ze.getConfigValue('navigation.defaults.pageErrorHandler'),
              r = {
                iframe: null,
                navigateOk: null,
                builderCompatibilityMode: Boolean(window.builderCompatibilityMode),
                isolateAllViews: t,
                defaultPageErrorHandler: i
              };
            nt.addCurrentLocaleChangeListener(e => {
              const t = { msg: 'luigi.current-locale-changed', currentLocale: e };
              Ct.broadcastMessageToAllIframes(t);
            }),
              Nt.addEventListener('popstate', async e => {
                const t = pe;
                if (!t || !t.length) return;
                const i = t
                  .map(e => {
                    if (e && !e.openFromClient && 'number' == typeof e.settings.ttl) {
                      if (0 === e.settings.ttl) return null;
                      e.settings.ttl--;
                    }
                    return e;
                  })
                  .filter(e => e);
                n('alerts', (pe = i));
              }),
              Nt.addEventListener('message', async t => {
                const i = Ct.getValidMessageSource(t);
                if (i) {
                  if (((i._ready = !0), 'custom' === t.data.msg)) {
                    const e = Ze.getConfigValue('communication.customMessagesListeners') || {},
                      n = Le.convertCustomMessageInternalToUser(t.data),
                      r = e[n.id];
                    if ('function' == typeof r) {
                      r(
                        n,
                        tt.getMicrofrontends().find(e => Ct.isMessageSource(t, e.container)),
                        _t.removeInternalProperties(i.luigi.currentNode)
                      );
                    } else
                      console.warn(
                        `Warning: Custom message with id: '${n.id}' does not exist. Make sure you provided the same id as in the config file. Documentation: https://docs.luigi-project.io/docs/communication?section=custom-messages`
                      );
                  }
                  if (
                    ('luigi.init.ok' === t.data.msg && (r.iframe.luigi.initOk = !0),
                    'luigi.navigate.ok' === t.data.msg &&
                      ((i.luigi.viewUrl = i.luigi.nextViewUrl),
                      (i.luigi.nextViewUrl = ''),
                      (i.luigi.clientPermissions = i.luigi.nextClientPermissions),
                      delete i.luigi.nextClientPermissions,
                      (r.navigateOk = !0),
                      lt.preload()),
                    'luigi.get-context' === t.data.msg)
                  ) {
                    (r.iframe.luigi.clientVersion = t.data.clientVersion), (r.iframe.luigi.initOk = !1);
                    const e = {
                        modalIframe: o,
                        modalIframeData: a,
                        modal: s,
                        splitViewIframe: l,
                        splitViewIframeData: c,
                        splitView: d
                      },
                      u = Ct.specialIframeTypes.filter(n => Ct.isMessageSource(t, e[n.iframeKey]));
                    if (u.length)
                      u.forEach(async t => {
                        let n = e[t.dataKey].context;
                        const i = {
                          ...r,
                          iframe: e[t.iframeKey],
                          context: n,
                          pathParams: e[t.dataKey].pathParams,
                          nodeParams: e[t.dataKey].nodeParams,
                          modal: t.iframeKey.startsWith('modal'),
                          splitView: t.iframeKey.startsWith('splitView')
                        };
                        await H(i, {});
                      });
                    else if (r.iframe && Ct.isMessageSource(t, r.iframe)) {
                      await H(r, {}),
                        (!g || !g.loadingIndicator || !1 !== g.loadingIndicator.hideAutomatically) &&
                          n('showLoadingIndicator', (L = !1)),
                        lt.preload();
                    } else
                      i.luigi.preloading &&
                        (await H({ iframe: i, context: {}, nodeParams: {}, pathParams: {}, internal: {} }, {}));
                    lt.viewGroupLoaded(i);
                  }
                  if (
                    ('luigi.show-loading-indicator' === t.data.msg && n('showLoadingIndicator', (L = !0)),
                    'luigi.hide-loading-indicator' === t.data.msg && n('showLoadingIndicator', (L = !1)),
                    'luigi.navigation.open' === t.data.msg)
                  )
                    if (((D = !1), void 0 !== t.data.params.modal)) {
                      let n = re(t.data.params);
                      (n = _t.addLeadingSlash(n)), (C = e), xe(), Ie(n, t.data.params.modal);
                    } else if (void 0 !== t.data.params.splitView) {
                      let i = re(t.data.params);
                      (i = _t.addLeadingSlash(i)),
                        (C = e),
                        n('mfSplitView', (R = gt.getDefaultData().mfSplitView)),
                        se(i, t.data.params.splitView);
                    } else
                      ee().then(() => {
                        (A = !t.data.params.withoutSync), X(t.data, r), Te(), le();
                      });
                  if (
                    ('luigi.navigation.back' === t.data.msg &&
                      (Ct.isMessageSource(t, o)
                        ? (Te(),
                          await H(r, { goBackContext: t.data.goBackContext && JSON.parse(t.data.goBackContext) }))
                        : Ct.isMessageSource(t, l)
                        ? (le(),
                          await H(r, { goBackContext: t.data.goBackContext && JSON.parse(t.data.goBackContext) }))
                        : O && O.length
                        ? ee().then(() => {
                            st.setActiveIframeToPrevious(e);
                            const n = O.pop();
                            (r.iframe = st.getActiveIframe(e)),
                              (D = !0),
                              (O = O),
                              (y = t.data.goBackContext && JSON.parse(t.data.goBackContext)),
                              X({ params: { link: n.path } }, r);
                          })
                        : (t.data.goBackContext &&
                            console.warn(
                              'Warning: goBack() does not support goBackContext value. This is available only when using preserved views feature. Documentation: https://docs.luigi-project.io/docs/luigi-client-api.md#navigate'
                            ),
                          window.history.back())),
                    'luigi.auth.tokenIssued' === t.data.msg && J(t.data.authData),
                    'luigi.navigation.pathExists' === t.data.msg)
                  ) {
                    const e = t.data.data,
                      n = re(e),
                      r = await dt.getNavigationPath(Ze.getConfigValueAsync('navigation.nodes'), n),
                      o = {
                        msg: 'luigi.navigation.pathExists.answer',
                        data: { correlationId: e.id, pathExists: r.isExistingRoute }
                      };
                    Ct.sendMessageToIframe(i, o);
                  }
                  if ('luigi.set-page-dirty' === t.data.msg) {
                    if (!V.dirtySet) {
                      const e = new Set();
                      e.add(t.source), (V = { dirtySet: e });
                    }
                    (V.persistUrl = window.location.href),
                      t.data.dirty ? V.dirtySet.add(t.source) : V.dirtySet.delete(t.source);
                  }
                  if ('luigi.ux.confirmationModal.show' === t.data.msg) {
                    const n = t.data.data.settings;
                    (C = e), be(), we(n, !0).catch(() => {});
                  }
                  if ('luigi.ux.alert.show' === t.data.msg) {
                    const { settings: n } = t.data.data;
                    if (!n.text)
                      return void console.error(
                        "Luigi Client alert: 'text' field for alert is empty or not present, therefore alert will not be displayed"
                      );
                    (C = e), ge(n, !0).catch(() => {});
                  }
                  if ('luigi.ux.set-current-locale' === t.data.msg)
                    if (i.luigi.clientPermissions && i.luigi.clientPermissions.changeCurrentLocale) {
                      const { currentLocale: e } = t.data.data;
                      e && nt.setCurrentLocale(e);
                    } else
                      console.error(
                        'Current local change from client declined because client permission changeCurrentLocale is not set for this view.'
                      );
                  N &&
                    !N.thirdPartyCookieScriptLocation &&
                    'luigi.third-party-cookie' === t.data.msg &&
                    'disabled' === t.data.tpc &&
                    Ne(N);
                }
              }),
              ne(e, r);
          },
          pathExists: async e => {
            const t = { link: e, relative: '/' !== e[0] },
              n = re(t);
            return (await dt.getNavigationPath(Ze.getConfigValueAsync('navigation.nodes'), n)).isExistingRoute;
          },
          hasBack: () => (Ce && Ce.displayed) || 0 !== O.length,
          modalConfirm_handler: () => Se(!0),
          modalDismiss_handler: () => Se(!1),
          topnav_isSearchFieldVisible_binding: function(e) {
            n('isSearchFieldVisible', (F = e));
          },
          topnav_displaySearchResult_binding: function(e) {
            n('displaySearchResult', (B = e));
          },
          topnav_displayCustomSearchResult_binding: function(e) {
            n('displayCustomSearchResult', (z = e));
          },
          topnav_searchResult_binding: function(e) {
            n('searchResult', (W = e));
          },
          topnav_inputElem_binding: function(e) {
            n('inputElem', (j = e));
          },
          topnav_luigiCustomSearchRenderer__slot_binding: function(e) {
            n('luigiCustomSearchRenderer__slot', (U = e));
          }
        }
      );
    }
    var Ps = class extends Pe {
      constructor(e) {
        super(),
          $e(this, e, $s, ks, d, [
            'store',
            'getTranslation',
            'isSearchFieldVisible',
            'inputElem',
            'luigiCustomSearchRenderer__slot',
            'displaySearchResult',
            'displayCustomSearchResult',
            'searchResult',
            'closeSearchField',
            'openSearchField',
            'clearSearchField',
            'toggleSearch',
            'getGlobalSearchString',
            'setGlobalSearchString',
            'showSearchResult',
            'closeSearchResult',
            'handleSearchNavigation',
            'openSplitView',
            'closeSplitView',
            'collapseSplitView',
            'expandSplitView',
            'isSplitViewCollapsed',
            'isSplitViewExpanded',
            'existsSplitView',
            'showAlert',
            'showModal',
            'pathExists',
            'hasBack'
          ]);
      }
      get closeSearchField() {
        return this.$$.ctx.closeSearchField;
      }
      get openSearchField() {
        return this.$$.ctx.openSearchField;
      }
      get clearSearchField() {
        return this.$$.ctx.clearSearchField;
      }
      get toggleSearch() {
        return this.$$.ctx.toggleSearch;
      }
      get getGlobalSearchString() {
        return this.$$.ctx.getGlobalSearchString;
      }
      get setGlobalSearchString() {
        return this.$$.ctx.setGlobalSearchString;
      }
      get showSearchResult() {
        return this.$$.ctx.showSearchResult;
      }
      get closeSearchResult() {
        return this.$$.ctx.closeSearchResult;
      }
      get handleSearchNavigation() {
        return this.$$.ctx.handleSearchNavigation;
      }
      get openSplitView() {
        return this.$$.ctx.openSplitView;
      }
      get closeSplitView() {
        return this.$$.ctx.closeSplitView;
      }
      get collapseSplitView() {
        return this.$$.ctx.collapseSplitView;
      }
      get expandSplitView() {
        return this.$$.ctx.expandSplitView;
      }
      get isSplitViewCollapsed() {
        return this.$$.ctx.isSplitViewCollapsed;
      }
      get isSplitViewExpanded() {
        return this.$$.ctx.isSplitViewExpanded;
      }
      get existsSplitView() {
        return this.$$.ctx.existsSplitView;
      }
      get showAlert() {
        return this.$$.ctx.showAlert;
      }
      get showModal() {
        return this.$$.ctx.showModal;
      }
      get pathExists() {
        return this.$$.ctx.pathExists;
      }
      get hasBack() {
        return this.$$.ctx.hasBack;
      }
    };
    const Es = (() => {
        const { subscribe: e, update: t, reset: n } = Ke({}),
          i = {};
        return {
          subscribe: e,
          update: t,
          reset: n,
          subscribeToScope: (e, t) => {
            let n = i[t];
            n || ((n = new Set()), (i[t] = n)), n.add(e);
          },
          fire: (e, t) => {
            let n = i[e];
            n &&
              [...n].forEach(e => {
                e(t);
              });
          }
        };
      })(),
      Ls = qe((e, t, n) => nt.getTranslation(e, t, n));
    Luigi._store = Es;
    Ze.setConfigCallbacks(
      () =>
        new Promise(e => {
          nt._init(),
            bt.init().then(() => {
              setTimeout(() => {
                let t;
                tt.isCustomLuigiContainer() &&
                  document.getElementsByTagName('html')[0].classList.add('luigi-app-in-custom-container'),
                  (t = new Ps({ target: tt.getLuigiContainer(), props: { store: Es, getTranslation: Ls } })),
                  (Luigi.showAlert = e => t.$$.ctx.showAlert(e)),
                  (Luigi.showConfirmationModal = e => t.$$.ctx.showModal(e)),
                  (Luigi.closeSearchField = () => t.$$.ctx.closeSearchField()),
                  (Luigi.openSearchField = () => t.$$.ctx.openSearchField()),
                  (Luigi.getGlobalSearchString = () => t.$$.ctx.getGlobalSearchString()),
                  (Luigi.setGlobalSearchString = e => {
                    t.$$.ctx.setGlobalSearchString(e);
                  }),
                  (Luigi.showSearchResult = e => t.$$.ctx.showSearchResult(e)),
                  (Luigi.closeSearchResult = () => {
                    t.$$.ctx.closeSearchResult();
                  }),
                  (Luigi.clearSearchField = () => {
                    t.$$.ctx.clearSearchField();
                  }),
                  (Luigi.splitView = {
                    openAsSplitView: (e, n) => t.$$.ctx.openSplitView(e, n),
                    splitViewHandle: {
                      close: () => t.$$.ctx.closeSplitView(),
                      collapse: () => t.$$.ctx.collapseSplitView(),
                      expand: () => t.$$.ctx.expandSplitView(),
                      isCollapsed: () => t.$$.ctx.isSplitViewCollapsed(),
                      isExpanded: () => t.$$.ctx.isSplitViewExpanded(),
                      exists: () => t.$$.ctx.existsSplitView()
                    }
                  }),
                  (Luigi.pathExists = e => t.$$.ctx.pathExists(e)),
                  (Luigi.hasBack = () => t.$$.ctx.hasBack()),
                  e();
              });
            });
        })
    );
  }
]);
