(() => {
  var $n = Object.create;
  var ae = Object.defineProperty;
  var jn = Object.getOwnPropertyDescriptor;
  var An = Object.getOwnPropertyNames;
  var qn = Object.getPrototypeOf,
    Nn = Object.prototype.hasOwnProperty;
  var Pt = (d, s) => () => (s || d((s = { exports: {} }).exports, s), s.exports);
  var Rn = (d, s, i, y) => {
    if ((s && typeof s == 'object') || typeof s == 'function')
      for (let P of An(s))
        !Nn.call(d, P) && P !== i && ae(d, P, { get: () => s[P], enumerable: !(y = jn(s, P)) || y.enumerable });
    return d;
  };
  var ue = (d, s, i) => (
    (i = d != null ? $n(qn(d)) : {}),
    Rn(s || !d || !d.__esModule ? ae(i, 'default', { value: d, enumerable: !0 }) : i, d)
  );
  var de = Pt(Ut => {
    (function(d) {
      var s = /\S/,
        i = /\"/g,
        y = /\n/g,
        P = /\r/g,
        N = /\\/g,
        W = /\u2028/,
        G = /\u2029/;
      (d.tags = { '#': 1, '^': 2, '<': 3, $: 4, '/': 5, '!': 6, '>': 7, '=': 8, _v: 9, '{': 10, '&': 11, _t: 12 }),
        (d.scan = function(u, f) {
          var S = u.length,
            U = 0,
            J = 1,
            ot = 2,
            $ = U,
            ut = null,
            dt = null,
            rt = '',
            z = [],
            ct = !1,
            R = 0,
            _t = 0,
            st = '{{',
            it = '}}';
          function kt() {
            rt.length > 0 && (z.push({ tag: '_t', text: new String(rt) }), (rt = ''));
          }
          function Dt() {
            for (var Z = !0, Q = _t; Q < z.length; Q++)
              if (((Z = d.tags[z[Q].tag] < d.tags._v || (z[Q].tag == '_t' && z[Q].text.match(s) === null)), !Z))
                return !1;
            return Z;
          }
          function ht(Z, Q) {
            if ((kt(), Z && Dt()))
              for (var H = _t, tt; H < z.length; H++)
                z[H].text && ((tt = z[H + 1]) && tt.tag == '>' && (tt.indent = z[H].text.toString()), z.splice(H, 1));
            else
              Q ||
                z.push({
                  tag: `
`
                });
            (ct = !1), (_t = z.length);
          }
          function Ft(Z, Q) {
            var H = '=' + it,
              tt = Z.indexOf(H, Q),
              bt = X(Z.substring(Z.indexOf('=', Q) + 1, tt)).split(' ');
            return (st = bt[0]), (it = bt[bt.length - 1]), tt + H.length - 1;
          }
          for (f && ((f = f.split(' ')), (st = f[0]), (it = f[1])), R = 0; R < S; R++)
            $ == U
              ? Y(st, u, R)
                ? (--R, kt(), ($ = J))
                : u.charAt(R) ==
                  `
`
                ? ht(ct)
                : (rt += u.charAt(R))
              : $ == J
              ? ((R += st.length - 1),
                (dt = d.tags[u.charAt(R + 1)]),
                (ut = dt ? u.charAt(R + 1) : '_v'),
                ut == '=' ? ((R = Ft(u, R)), ($ = U)) : (dt && R++, ($ = ot)),
                (ct = R))
              : Y(it, u, R)
              ? (z.push({ tag: ut, n: X(rt), otag: st, ctag: it, i: ut == '/' ? ct - st.length : R + it.length }),
                (rt = ''),
                (R += it.length - 1),
                ($ = U),
                ut == '{' && (it == '}}' ? R++ : nt(z[z.length - 1])))
              : (rt += u.charAt(R));
          return ht(ct, !0), z;
        });
      function nt(a) {
        a.n.substr(a.n.length - 1) === '}' && (a.n = a.n.substring(0, a.n.length - 1));
      }
      function X(a) {
        return a.trim ? a.trim() : a.replace(/^\s*|\s*$/g, '');
      }
      function Y(a, u, f) {
        if (u.charAt(f) != a.charAt(0)) return !1;
        for (var S = 1, U = a.length; S < U; S++) if (u.charAt(f + S) != a.charAt(S)) return !1;
        return !0;
      }
      var O = { _t: !0, '\n': !0, $: !0, '/': !0 };
      function g(a, u, f, S) {
        var U = [],
          J = null,
          ot = null,
          $ = null;
        for (ot = f[f.length - 1]; a.length > 0; ) {
          if ((($ = a.shift()), ot && ot.tag == '<' && !($.tag in O)))
            throw new Error('Illegal content in < super tag.');
          if (d.tags[$.tag] <= d.tags.$ || _($, S)) f.push($), ($.nodes = g(a, $.tag, f, S));
          else if ($.tag == '/') {
            if (f.length === 0) throw new Error('Closing tag without opener: /' + $.n);
            if (((J = f.pop()), $.n != J.n && !h($.n, J.n, S)))
              throw new Error('Nesting error: ' + J.n + ' vs. ' + $.n);
            return (J.end = $.i), U;
          } else
            $.tag ==
              `
` &&
              ($.last =
                a.length == 0 ||
                a[0].tag ==
                  `
`);
          U.push($);
        }
        if (f.length > 0) throw new Error('missing closing tag: ' + f.pop().n);
        return U;
      }
      function _(a, u) {
        for (var f = 0, S = u.length; f < S; f++) if (u[f].o == a.n) return (a.tag = '#'), !0;
      }
      function h(a, u, f) {
        for (var S = 0, U = f.length; S < U; S++) if (f[S].c == a && f[S].o == u) return !0;
      }
      function w(a) {
        var u = [];
        for (var f in a) u.push('"' + T(f) + '": function(c,p,t,i) {' + a[f] + '}');
        return '{ ' + u.join(',') + ' }';
      }
      function x(a) {
        var u = [];
        for (var f in a.partials)
          u.push('"' + T(f) + '":{name:"' + T(a.partials[f].name) + '", ' + x(a.partials[f]) + '}');
        return 'partials: {' + u.join(',') + '}, subs: ' + w(a.subs);
      }
      d.stringify = function(a, u, f) {
        return '{code: function (c,p,i) { ' + d.wrapMain(a.code) + ' },' + x(a) + '}';
      };
      var j = 0;
      (d.generate = function(a, u, f) {
        j = 0;
        var S = { code: '', subs: {}, partials: {} };
        return d.walk(a, S), f.asString ? this.stringify(S, u, f) : this.makeTemplate(S, u, f);
      }),
        (d.wrapMain = function(a) {
          return 'var t=this;t.b(i=i||"");' + a + 'return t.fl();';
        }),
        (d.template = d.Template),
        (d.makeTemplate = function(a, u, f) {
          var S = this.makePartials(a);
          return (S.code = new Function('c', 'p', 'i', this.wrapMain(a.code))), new this.template(S, u, this, f);
        }),
        (d.makePartials = function(a) {
          var u,
            f = { subs: {}, partials: a.partials, name: a.name };
          for (u in f.partials) f.partials[u] = this.makePartials(f.partials[u]);
          for (u in a.subs) f.subs[u] = new Function('c', 'p', 't', 'i', a.subs[u]);
          return f;
        });
      function T(a) {
        return a
          .replace(N, '\\\\')
          .replace(i, '\\"')
          .replace(y, '\\n')
          .replace(P, '\\r')
          .replace(W, '\\u2028')
          .replace(G, '\\u2029');
      }
      function L(a) {
        return ~a.indexOf('.') ? 'd' : 'f';
      }
      function F(a, u) {
        var f = '<' + (u.prefix || ''),
          S = f + a.n + j++;
        return (
          (u.partials[S] = { name: a.n, partials: {} }),
          (u.code += 't.b(t.rp("' + T(S) + '",c,p,"' + (a.indent || '') + '"));'),
          S
        );
      }
      d.codegen = {
        '#': function(a, u) {
          (u.code +=
            'if(t.s(t.' +
            L(a.n) +
            '("' +
            T(a.n) +
            '",c,p,1),c,p,0,' +
            a.i +
            ',' +
            a.end +
            ',"' +
            a.otag +
            ' ' +
            a.ctag +
            '")){t.rs(c,p,function(c,p,t){'),
            d.walk(a.nodes, u),
            (u.code += '});c.pop();}');
        },
        '^': function(a, u) {
          (u.code += 'if(!t.s(t.' + L(a.n) + '("' + T(a.n) + '",c,p,1),c,p,1,0,0,"")){'),
            d.walk(a.nodes, u),
            (u.code += '};');
        },
        '>': F,
        '<': function(a, u) {
          var f = { partials: {}, code: '', subs: {}, inPartial: !0 };
          d.walk(a.nodes, f);
          var S = u.partials[F(a, u)];
          (S.subs = f.subs), (S.partials = f.partials);
        },
        $: function(a, u) {
          var f = { subs: {}, code: '', partials: u.partials, prefix: a.n };
          d.walk(a.nodes, f), (u.subs[a.n] = f.code), u.inPartial || (u.code += 't.sub("' + T(a.n) + '",c,p,i);');
        },
        '\n': function(a, u) {
          u.code += yt('"\\n"' + (a.last ? '' : ' + i'));
        },
        _v: function(a, u) {
          u.code += 't.b(t.v(t.' + L(a.n) + '("' + T(a.n) + '",c,p,0)));';
        },
        _t: function(a, u) {
          u.code += yt('"' + T(a.text) + '"');
        },
        '{': A,
        '&': A
      };
      function A(a, u) {
        u.code += 't.b(t.t(t.' + L(a.n) + '("' + T(a.n) + '",c,p,0)));';
      }
      function yt(a) {
        return 't.b(' + a + ');';
      }
      (d.walk = function(a, u) {
        for (var f, S = 0, U = a.length; S < U; S++) (f = d.codegen[a[S].tag]), f && f(a[S], u);
        return u;
      }),
        (d.parse = function(a, u, f) {
          return (f = f || {}), g(a, '', [], f.sectionTags || []);
        }),
        (d.cache = {}),
        (d.cacheKey = function(a, u) {
          return [a, !!u.asString, !!u.disableLambda, u.delimiters, !!u.modelGet].join('||');
        }),
        (d.compile = function(a, u) {
          u = u || {};
          var f = d.cacheKey(a, u),
            S = this.cache[f];
          if (S) {
            var U = S.partials;
            for (var J in U) delete U[J].instance;
            return S;
          }
          return (S = this.generate(this.parse(this.scan(a, u.delimiters), a, u), a, u)), (this.cache[f] = S);
        });
    })(typeof Ut < 'u' ? Ut : Hogan);
  });
  var he = Pt(zt => {
    var Ln = {};
    (function(d) {
      (d.Template = function(g, _, h, w) {
        (g = g || {}),
          (this.r = g.code || this.r),
          (this.c = h),
          (this.options = w || {}),
          (this.text = _ || ''),
          (this.partials = g.partials || {}),
          (this.subs = g.subs || {}),
          (this.buf = '');
      }),
        (d.Template.prototype = {
          r: function(g, _, h) {
            return '';
          },
          v: Y,
          t: X,
          render: function(_, h, w) {
            return this.ri([_], h || {}, w);
          },
          ri: function(g, _, h) {
            return this.r(g, _, h);
          },
          ep: function(g, _) {
            var h = this.partials[g],
              w = _[h.name];
            if (h.instance && h.base == w) return h.instance;
            if (typeof w == 'string') {
              if (!this.c) throw new Error('No compiler available.');
              w = this.c.compile(w, this.options);
            }
            if (!w) return null;
            if (((this.partials[g].base = w), h.subs)) {
              _.stackText || (_.stackText = {});
              for (key in h.subs)
                _.stackText[key] ||
                  (_.stackText[key] =
                    this.activeSub !== void 0 && _.stackText[this.activeSub] ? _.stackText[this.activeSub] : this.text);
              w = i(w, h.subs, h.partials, this.stackSubs, this.stackPartials, _.stackText);
            }
            return (this.partials[g].instance = w), w;
          },
          rp: function(g, _, h, w) {
            var x = this.ep(g, h);
            return x ? x.ri(_, h, w) : '';
          },
          rs: function(g, _, h) {
            var w = g[g.length - 1];
            if (!O(w)) {
              h(g, _, this);
              return;
            }
            for (var x = 0; x < w.length; x++) g.push(w[x]), h(g, _, this), g.pop();
          },
          s: function(g, _, h, w, x, j, T) {
            var L;
            return O(g) && g.length === 0
              ? !1
              : (typeof g == 'function' && (g = this.ms(g, _, h, w, x, j, T)),
                (L = !!g),
                !w && L && _ && _.push(typeof g == 'object' ? g : _[_.length - 1]),
                L);
          },
          d: function(g, _, h, w) {
            var x,
              j = g.split('.'),
              T = this.f(j[0], _, h, w),
              L = this.options.modelGet,
              F = null;
            if (g === '.' && O(_[_.length - 2])) T = _[_.length - 1];
            else for (var A = 1; A < j.length; A++) (x = s(j[A], T, L)), x !== void 0 ? ((F = T), (T = x)) : (T = '');
            return w && !T ? !1 : (!w && typeof T == 'function' && (_.push(F), (T = this.mv(T, _, h)), _.pop()), T);
          },
          f: function(g, _, h, w) {
            for (var x = !1, j = null, T = !1, L = this.options.modelGet, F = _.length - 1; F >= 0; F--)
              if (((j = _[F]), (x = s(g, j, L)), x !== void 0)) {
                T = !0;
                break;
              }
            return T ? (!w && typeof x == 'function' && (x = this.mv(x, _, h)), x) : w ? !1 : '';
          },
          ls: function(g, _, h, w, x) {
            var j = this.options.delimiters;
            return (
              (this.options.delimiters = x), this.b(this.ct(X(g.call(_, w)), _, h)), (this.options.delimiters = j), !1
            );
          },
          ct: function(g, _, h) {
            if (this.options.disableLambda) throw new Error('Lambda features disabled.');
            return this.c.compile(g, this.options).render(_, h);
          },
          b: function(g) {
            this.buf += g;
          },
          fl: function() {
            var g = this.buf;
            return (this.buf = ''), g;
          },
          ms: function(g, _, h, w, x, j, T) {
            var L,
              F = _[_.length - 1],
              A = g.call(F);
            return typeof A == 'function'
              ? w
                ? !0
                : ((L =
                    this.activeSub && this.subsText && this.subsText[this.activeSub]
                      ? this.subsText[this.activeSub]
                      : this.text),
                  this.ls(A, F, h, L.substring(x, j), T))
              : A;
          },
          mv: function(g, _, h) {
            var w = _[_.length - 1],
              x = g.call(w);
            return typeof x == 'function' ? this.ct(X(x.call(w)), w, h) : x;
          },
          sub: function(g, _, h, w) {
            var x = this.subs[g];
            x && ((this.activeSub = g), x(_, h, this, w), (this.activeSub = !1));
          }
        });
      function s(g, _, h) {
        var w;
        return (
          _ &&
            typeof _ == 'object' &&
            (_[g] !== void 0 ? (w = _[g]) : h && _.get && typeof _.get == 'function' && (w = _.get(g))),
          w
        );
      }
      function i(g, _, h, w, x, j) {
        function T() {}
        T.prototype = g;
        function L() {}
        L.prototype = g.subs;
        var F,
          A = new T();
        (A.subs = new L()), (A.subsText = {}), (A.buf = ''), (w = w || {}), (A.stackSubs = w), (A.subsText = j);
        for (F in _) w[F] || (w[F] = _[F]);
        for (F in w) A.subs[F] = w[F];
        (x = x || {}), (A.stackPartials = x);
        for (F in h) x[F] || (x[F] = h[F]);
        for (F in x) A.partials[F] = x[F];
        return A;
      }
      var y = /&/g,
        P = /</g,
        N = />/g,
        W = /\'/g,
        G = /\"/g,
        nt = /[&<>\"\']/;
      function X(g) {
        return String(g ?? '');
      }
      function Y(g) {
        return (
          (g = X(g)),
          nt.test(g)
            ? g
                .replace(y, '&amp;')
                .replace(P, '&lt;')
                .replace(N, '&gt;')
                .replace(W, '&#39;')
                .replace(G, '&quot;')
            : g
        );
      }
      var O =
        Array.isArray ||
        function(g) {
          return Object.prototype.toString.call(g) === '[object Array]';
        };
    })(typeof zt < 'u' ? zt : Ln);
  });
  var me = Pt((or, pe) => {
    var Tt = de();
    Tt.Template = he().Template;
    Tt.template = Tt.Template;
    pe.exports = Tt;
  });
  var Ee = Pt((Wt, Gt) => {
    (function(d, s) {
      typeof Wt == 'object' && typeof Gt < 'u'
        ? (Gt.exports = s())
        : typeof define == 'function' && define.amd
        ? define(s)
        : ((d = d || self).algoliasearch = s());
    })(Wt, function() {
      'use strict';
      function d(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 })
            : (t[e] = n),
          t
        );
      }
      function s(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          e &&
            (r = r.filter(function(o) {
              return Object.getOwnPropertyDescriptor(t, o).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function i(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] != null ? arguments[e] : {};
          e % 2
            ? s(Object(n), !0).forEach(function(r) {
                d(t, r, n[r]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
            : s(Object(n)).forEach(function(r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
              });
        }
        return t;
      }
      function y(t, e) {
        if (t == null) return {};
        var n,
          r,
          o = (function(p, l) {
            if (p == null) return {};
            var m,
              v,
              b = {},
              k = Object.keys(p);
            for (v = 0; v < k.length; v++) (m = k[v]), l.indexOf(m) >= 0 || (b[m] = p[m]);
            return b;
          })(t, e);
        if (Object.getOwnPropertySymbols) {
          var c = Object.getOwnPropertySymbols(t);
          for (r = 0; r < c.length; r++)
            (n = c[r]), e.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(t, n) && (o[n] = t[n]));
        }
        return o;
      }
      function P(t, e) {
        return (
          (function(n) {
            if (Array.isArray(n)) return n;
          })(t) ||
          (function(n, r) {
            if (Symbol.iterator in Object(n) || Object.prototype.toString.call(n) === '[object Arguments]') {
              var o = [],
                c = !0,
                p = !1,
                l = void 0;
              try {
                for (
                  var m, v = n[Symbol.iterator]();
                  !(c = (m = v.next()).done) && (o.push(m.value), !r || o.length !== r);
                  c = !0
                );
              } catch (b) {
                (p = !0), (l = b);
              } finally {
                try {
                  c || v.return == null || v.return();
                } finally {
                  if (p) throw l;
                }
              }
              return o;
            }
          })(t, e) ||
          (function() {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
          })()
        );
      }
      function N(t) {
        return (
          (function(e) {
            if (Array.isArray(e)) {
              for (var n = 0, r = new Array(e.length); n < e.length; n++) r[n] = e[n];
              return r;
            }
          })(t) ||
          (function(e) {
            if (Symbol.iterator in Object(e) || Object.prototype.toString.call(e) === '[object Arguments]')
              return Array.from(e);
          })(t) ||
          (function() {
            throw new TypeError('Invalid attempt to spread non-iterable instance');
          })()
        );
      }
      function W(t) {
        var e,
          n = 'algoliasearch-client-js-'.concat(t.key),
          r = function() {
            return e === void 0 && (e = t.localStorage || window.localStorage), e;
          },
          o = function() {
            return JSON.parse(r().getItem(n) || '{}');
          };
        return {
          get: function(c, p) {
            var l =
              arguments.length > 2 && arguments[2] !== void 0
                ? arguments[2]
                : {
                    miss: function() {
                      return Promise.resolve();
                    }
                  };
            return Promise.resolve()
              .then(function() {
                var m = JSON.stringify(c),
                  v = o()[m];
                return Promise.all([v || p(), v !== void 0]);
              })
              .then(function(m) {
                var v = P(m, 2),
                  b = v[0],
                  k = v[1];
                return Promise.all([b, k || l.miss(b)]);
              })
              .then(function(m) {
                return P(m, 1)[0];
              });
          },
          set: function(c, p) {
            return Promise.resolve().then(function() {
              var l = o();
              return (l[JSON.stringify(c)] = p), r().setItem(n, JSON.stringify(l)), p;
            });
          },
          delete: function(c) {
            return Promise.resolve().then(function() {
              var p = o();
              delete p[JSON.stringify(c)], r().setItem(n, JSON.stringify(p));
            });
          },
          clear: function() {
            return Promise.resolve().then(function() {
              r().removeItem(n);
            });
          }
        };
      }
      function G(t) {
        var e = N(t.caches),
          n = e.shift();
        return n === void 0
          ? {
              get: function(r, o) {
                var c =
                    arguments.length > 2 && arguments[2] !== void 0
                      ? arguments[2]
                      : {
                          miss: function() {
                            return Promise.resolve();
                          }
                        },
                  p = o();
                return p
                  .then(function(l) {
                    return Promise.all([l, c.miss(l)]);
                  })
                  .then(function(l) {
                    return P(l, 1)[0];
                  });
              },
              set: function(r, o) {
                return Promise.resolve(o);
              },
              delete: function(r) {
                return Promise.resolve();
              },
              clear: function() {
                return Promise.resolve();
              }
            }
          : {
              get: function(r, o) {
                var c =
                  arguments.length > 2 && arguments[2] !== void 0
                    ? arguments[2]
                    : {
                        miss: function() {
                          return Promise.resolve();
                        }
                      };
                return n.get(r, o, c).catch(function() {
                  return G({ caches: e }).get(r, o, c);
                });
              },
              set: function(r, o) {
                return n.set(r, o).catch(function() {
                  return G({ caches: e }).set(r, o);
                });
              },
              delete: function(r) {
                return n.delete(r).catch(function() {
                  return G({ caches: e }).delete(r);
                });
              },
              clear: function() {
                return n.clear().catch(function() {
                  return G({ caches: e }).clear();
                });
              }
            };
      }
      function nt() {
        var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : { serializable: !0 },
          e = {};
        return {
          get: function(n, r) {
            var o =
                arguments.length > 2 && arguments[2] !== void 0
                  ? arguments[2]
                  : {
                      miss: function() {
                        return Promise.resolve();
                      }
                    },
              c = JSON.stringify(n);
            if (c in e) return Promise.resolve(t.serializable ? JSON.parse(e[c]) : e[c]);
            var p = r(),
              l =
                (o && o.miss) ||
                function() {
                  return Promise.resolve();
                };
            return p
              .then(function(m) {
                return l(m);
              })
              .then(function() {
                return p;
              });
          },
          set: function(n, r) {
            return (e[JSON.stringify(n)] = t.serializable ? JSON.stringify(r) : r), Promise.resolve(r);
          },
          delete: function(n) {
            return delete e[JSON.stringify(n)], Promise.resolve();
          },
          clear: function() {
            return (e = {}), Promise.resolve();
          }
        };
      }
      function X(t, e, n) {
        var r = { 'x-algolia-api-key': n, 'x-algolia-application-id': e };
        return {
          headers: function() {
            return t === w.WithinHeaders ? r : {};
          },
          queryParameters: function() {
            return t === w.WithinQueryParameters ? r : {};
          }
        };
      }
      function Y(t) {
        var e = 0;
        return t(function n() {
          return (
            e++,
            new Promise(function(r) {
              setTimeout(function() {
                r(t(n));
              }, Math.min(100 * e, 1e3));
            })
          );
        });
      }
      function O(t) {
        var e =
          arguments.length > 1 && arguments[1] !== void 0
            ? arguments[1]
            : function(n, r) {
                return Promise.resolve();
              };
        return Object.assign(t, {
          wait: function(n) {
            return O(
              t
                .then(function(r) {
                  return Promise.all([e(r, n), r]);
                })
                .then(function(r) {
                  return r[1];
                })
            );
          }
        });
      }
      function g(t) {
        for (var e = t.length - 1; e > 0; e--) {
          var n = Math.floor(Math.random() * (e + 1)),
            r = t[e];
          (t[e] = t[n]), (t[n] = r);
        }
        return t;
      }
      function _(t, e) {
        return (
          e &&
            Object.keys(e).forEach(function(n) {
              t[n] = e[n](t);
            }),
          t
        );
      }
      function h(t) {
        for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
        var o = 0;
        return t.replace(/%s/g, function() {
          return encodeURIComponent(n[o++]);
        });
      }
      var w = { WithinQueryParameters: 0, WithinHeaders: 1 };
      function x(t, e) {
        var n = t || {},
          r = n.data || {};
        return (
          Object.keys(n).forEach(function(o) {
            ['timeout', 'headers', 'queryParameters', 'data', 'cacheable'].indexOf(o) === -1 && (r[o] = n[o]);
          }),
          {
            data: Object.entries(r).length > 0 ? r : void 0,
            timeout: n.timeout || e,
            headers: n.headers || {},
            queryParameters: n.queryParameters || {},
            cacheable: n.cacheable
          }
        );
      }
      var j = { Read: 1, Write: 2, Any: 3 },
        T = 1,
        L = 2,
        F = 3;
      function A(t) {
        var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : T;
        return i(i({}, t), {}, { status: e, lastUpdate: Date.now() });
      }
      function yt(t) {
        return typeof t == 'string'
          ? { protocol: 'https', url: t, accept: j.Any }
          : { protocol: t.protocol || 'https', url: t.url, accept: t.accept || j.Any };
      }
      var a = 'DELETE',
        u = 'GET',
        f = 'POST',
        S = 'PUT';
      function U(t, e) {
        return Promise.all(
          e.map(function(n) {
            return t.get(n, function() {
              return Promise.resolve(A(n));
            });
          })
        ).then(function(n) {
          var r = n.filter(function(p) {
              return (function(l) {
                return l.status === T || Date.now() - l.lastUpdate > 12e4;
              })(p);
            }),
            o = n.filter(function(p) {
              return (function(l) {
                return l.status === F && Date.now() - l.lastUpdate <= 12e4;
              })(p);
            }),
            c = [].concat(N(r), N(o));
          return {
            getTimeout: function(p, l) {
              return (o.length === 0 && p === 0 ? 1 : o.length + 3 + p) * l;
            },
            statelessHosts:
              c.length > 0
                ? c.map(function(p) {
                    return yt(p);
                  })
                : e
          };
        });
      }
      function J(t, e, n, r) {
        var o = [],
          c = (function(E, I) {
            if (!(E.method === u || (E.data === void 0 && I.data === void 0))) {
              var D = Array.isArray(E.data) ? E.data : i(i({}, E.data), I.data);
              return JSON.stringify(D);
            }
          })(n, r),
          p = (function(E, I) {
            var D = i(i({}, E.headers), I.headers),
              q = {};
            return (
              Object.keys(D).forEach(function(C) {
                var V = D[C];
                q[C.toLowerCase()] = V;
              }),
              q
            );
          })(t, r),
          l = n.method,
          m = n.method !== u ? {} : i(i({}, n.data), r.data),
          v = i(i(i({ 'x-algolia-agent': t.userAgent.value }, t.queryParameters), m), r.queryParameters),
          b = 0,
          k = function E(I, D) {
            var q = I.pop();
            if (q === void 0)
              throw {
                name: 'RetryError',
                message:
                  'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
                transporterStackTrace: rt(o)
              };
            var C = {
                data: c,
                headers: p,
                method: l,
                url: ut(q, n.path, v),
                connectTimeout: D(b, t.timeouts.connect),
                responseTimeout: D(b, r.timeout)
              },
              V = function(K) {
                var B = { request: C, response: K, host: q, triesLeft: I.length };
                return o.push(B), B;
              },
              xt = {
                onSuccess: function(K) {
                  return (function(B) {
                    try {
                      return JSON.parse(B.content);
                    } catch (lt) {
                      throw (function(at, gt) {
                        return { name: 'DeserializationError', message: at, response: gt };
                      })(lt.message, B);
                    }
                  })(K);
                },
                onRetry: function(K) {
                  var B = V(K);
                  return (
                    K.isTimedOut && b++,
                    Promise.all([
                      t.logger.info('Retryable failure', z(B)),
                      t.hostsCache.set(q, A(q, K.isTimedOut ? F : L))
                    ]).then(function() {
                      return E(I, D);
                    })
                  );
                },
                onFail: function(K) {
                  throw (V(K),
                  (function(B, lt) {
                    var at = B.content,
                      gt = B.status,
                      St = at;
                    try {
                      St = JSON.parse(at).message;
                    } catch {}
                    return (function(Ot, Nt, In) {
                      return { name: 'ApiError', message: Ot, status: Nt, transporterStackTrace: In };
                    })(St, gt, lt);
                  })(K, rt(o)));
                }
              };
            return t.requester.send(C).then(function(K) {
              return (function(B, lt) {
                return (function(at) {
                  var gt = at.status;
                  return (
                    at.isTimedOut ||
                    (function(St) {
                      var Ot = St.isTimedOut,
                        Nt = St.status;
                      return !Ot && ~~Nt == 0;
                    })(at) ||
                    (~~(gt / 100) != 2 && ~~(gt / 100) != 4)
                  );
                })(B)
                  ? lt.onRetry(B)
                  : ~~(B.status / 100) == 2
                  ? lt.onSuccess(B)
                  : lt.onFail(B);
              })(K, xt);
            });
          };
        return U(t.hostsCache, e).then(function(E) {
          return k(N(E.statelessHosts).reverse(), E.getTimeout);
        });
      }
      function ot(t) {
        var e = t.hostsCache,
          n = t.logger,
          r = t.requester,
          o = t.requestsCache,
          c = t.responsesCache,
          p = t.timeouts,
          l = t.userAgent,
          m = t.hosts,
          v = t.queryParameters,
          b = {
            hostsCache: e,
            logger: n,
            requester: r,
            requestsCache: o,
            responsesCache: c,
            timeouts: p,
            userAgent: l,
            headers: t.headers,
            queryParameters: v,
            hosts: m.map(function(k) {
              return yt(k);
            }),
            read: function(k, E) {
              var I = x(E, b.timeouts.read),
                D = function() {
                  return J(
                    b,
                    b.hosts.filter(function(C) {
                      return (C.accept & j.Read) != 0;
                    }),
                    k,
                    I
                  );
                };
              if ((I.cacheable !== void 0 ? I.cacheable : k.cacheable) !== !0) return D();
              var q = {
                request: k,
                mappedRequestOptions: I,
                transporter: { queryParameters: b.queryParameters, headers: b.headers }
              };
              return b.responsesCache.get(
                q,
                function() {
                  return b.requestsCache.get(q, function() {
                    return b.requestsCache
                      .set(q, D())
                      .then(
                        function(C) {
                          return Promise.all([b.requestsCache.delete(q), C]);
                        },
                        function(C) {
                          return Promise.all([b.requestsCache.delete(q), Promise.reject(C)]);
                        }
                      )
                      .then(function(C) {
                        var V = P(C, 2);
                        return V[0], V[1];
                      });
                  });
                },
                {
                  miss: function(C) {
                    return b.responsesCache.set(q, C);
                  }
                }
              );
            },
            write: function(k, E) {
              return J(
                b,
                b.hosts.filter(function(I) {
                  return (I.accept & j.Write) != 0;
                }),
                k,
                x(E, b.timeouts.write)
              );
            }
          };
        return b;
      }
      function $(t) {
        var e = {
          value: 'Algolia for JavaScript ('.concat(t, ')'),
          add: function(n) {
            var r = '; '.concat(n.segment).concat(n.version !== void 0 ? ' ('.concat(n.version, ')') : '');
            return e.value.indexOf(r) === -1 && (e.value = ''.concat(e.value).concat(r)), e;
          }
        };
        return e;
      }
      function ut(t, e, n) {
        var r = dt(n),
          o = ''
            .concat(t.protocol, '://')
            .concat(t.url, '/')
            .concat(e.charAt(0) === '/' ? e.substr(1) : e);
        return r.length && (o += '?'.concat(r)), o;
      }
      function dt(t) {
        return Object.keys(t)
          .map(function(e) {
            return h(
              '%s=%s',
              e,
              ((n = t[e]),
              Object.prototype.toString.call(n) === '[object Object]' ||
              Object.prototype.toString.call(n) === '[object Array]'
                ? JSON.stringify(t[e])
                : t[e])
            );
            var n;
          })
          .join('&');
      }
      function rt(t) {
        return t.map(function(e) {
          return z(e);
        });
      }
      function z(t) {
        var e = t.request.headers['x-algolia-api-key'] ? { 'x-algolia-api-key': '*****' } : {};
        return i(i({}, t), {}, { request: i(i({}, t.request), {}, { headers: i(i({}, t.request.headers), e) }) });
      }
      var ct = function(t) {
          return function(e, n) {
            return t.transporter.write({ method: f, path: '2/abtests', data: e }, n);
          };
        },
        R = function(t) {
          return function(e, n) {
            return t.transporter.write({ method: a, path: h('2/abtests/%s', e) }, n);
          };
        },
        _t = function(t) {
          return function(e, n) {
            return t.transporter.read({ method: u, path: h('2/abtests/%s', e) }, n);
          };
        },
        st = function(t) {
          return function(e) {
            return t.transporter.read({ method: u, path: '2/abtests' }, e);
          };
        },
        it = function(t) {
          return function(e, n) {
            return t.transporter.write({ method: f, path: h('2/abtests/%s/stop', e) }, n);
          };
        },
        kt = function(t) {
          return function(e) {
            return t.transporter.read({ method: u, path: '1/strategies/personalization' }, e);
          };
        },
        Dt = function(t) {
          return function(e, n) {
            return t.transporter.write({ method: f, path: '1/strategies/personalization', data: e }, n);
          };
        };
      function ht(t) {
        return (function e(n) {
          return t.request(n).then(function(r) {
            if ((t.batch !== void 0 && t.batch(r.hits), !t.shouldStop(r)))
              return r.cursor ? e({ cursor: r.cursor }) : e({ page: (n.page || 0) + 1 });
          });
        })({});
      }
      var Ft = function(t) {
          return function(e, n) {
            var r = n || {},
              o = r.queryParameters,
              c = y(r, ['queryParameters']),
              p = i({ acl: e }, o !== void 0 ? { queryParameters: o } : {});
            return O(t.transporter.write({ method: f, path: '1/keys', data: p }, c), function(l, m) {
              return Y(function(v) {
                return vt(t)(l.key, m).catch(function(b) {
                  if (b.status !== 404) throw b;
                  return v();
                });
              });
            });
          };
        },
        Z = function(t) {
          return function(e, n, r) {
            var o = x(r);
            return (
              (o.queryParameters['X-Algolia-User-ID'] = e),
              t.transporter.write({ method: f, path: '1/clusters/mapping', data: { cluster: n } }, o)
            );
          };
        },
        Q = function(t) {
          return function(e, n, r) {
            return t.transporter.write(
              { method: f, path: '1/clusters/mapping/batch', data: { users: e, cluster: n } },
              r
            );
          };
        },
        H = function(t) {
          return function(e, n) {
            return O(
              t.transporter.write(
                {
                  method: f,
                  path: h('/1/dictionaries/%s/batch', e),
                  data: { clearExistingDictionaryEntries: !0, requests: { action: 'addEntry', body: [] } }
                },
                n
              ),
              function(r, o) {
                return pt(t)(r.taskID, o);
              }
            );
          };
        },
        tt = function(t) {
          return function(e, n, r) {
            return O(
              t.transporter.write(
                { method: f, path: h('1/indexes/%s/operation', e), data: { operation: 'copy', destination: n } },
                r
              ),
              function(o, c) {
                return wt(t)(e, { methods: { waitTask: M } }).waitTask(o.taskID, c);
              }
            );
          };
        },
        bt = function(t) {
          return function(e, n, r) {
            return tt(t)(e, n, i(i({}, r), {}, { scope: [qt.Rules] }));
          };
        },
        De = function(t) {
          return function(e, n, r) {
            return tt(t)(e, n, i(i({}, r), {}, { scope: [qt.Settings] }));
          };
        },
        Fe = function(t) {
          return function(e, n, r) {
            return tt(t)(e, n, i(i({}, r), {}, { scope: [qt.Synonyms] }));
          };
        },
        Ie = function(t) {
          return function(e, n) {
            return e.method === u ? t.transporter.read(e, n) : t.transporter.write(e, n);
          };
        },
        $e = function(t) {
          return function(e, n) {
            return O(t.transporter.write({ method: a, path: h('1/keys/%s', e) }, n), function(r, o) {
              return Y(function(c) {
                return vt(t)(e, o)
                  .then(c)
                  .catch(function(p) {
                    if (p.status !== 404) throw p;
                  });
              });
            });
          };
        },
        je = function(t) {
          return function(e, n, r) {
            var o = n.map(function(c) {
              return { action: 'deleteEntry', body: { objectID: c } };
            });
            return O(
              t.transporter.write(
                {
                  method: f,
                  path: h('/1/dictionaries/%s/batch', e),
                  data: { clearExistingDictionaryEntries: !1, requests: o }
                },
                r
              ),
              function(c, p) {
                return pt(t)(c.taskID, p);
              }
            );
          };
        },
        vt = function(t) {
          return function(e, n) {
            return t.transporter.read({ method: u, path: h('1/keys/%s', e) }, n);
          };
        },
        Vt = function(t) {
          return function(e, n) {
            return t.transporter.read({ method: u, path: h('1/task/%s', e.toString()) }, n);
          };
        },
        Ae = function(t) {
          return function(e) {
            return t.transporter.read({ method: u, path: '/1/dictionaries/*/settings' }, e);
          };
        },
        qe = function(t) {
          return function(e) {
            return t.transporter.read({ method: u, path: '1/logs' }, e);
          };
        },
        Ne = function(t) {
          return function(e) {
            return t.transporter.read({ method: u, path: '1/clusters/mapping/top' }, e);
          };
        },
        Re = function(t) {
          return function(e, n) {
            return t.transporter.read({ method: u, path: h('1/clusters/mapping/%s', e) }, n);
          };
        },
        Ce = function(t) {
          return function(e) {
            var n = e || {},
              r = n.retrieveMappings,
              o = y(n, ['retrieveMappings']);
            return (
              r === !0 && (o.getClusters = !0), t.transporter.read({ method: u, path: '1/clusters/mapping/pending' }, o)
            );
          };
        },
        wt = function(t) {
          return function(e) {
            var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
              r = { transporter: t.transporter, appId: t.appId, indexName: e };
            return _(r, n.methods);
          };
        },
        Le = function(t) {
          return function(e) {
            return t.transporter.read({ method: u, path: '1/keys' }, e);
          };
        },
        Me = function(t) {
          return function(e) {
            return t.transporter.read({ method: u, path: '1/clusters' }, e);
          };
        },
        Ue = function(t) {
          return function(e) {
            return t.transporter.read({ method: u, path: '1/indexes' }, e);
          };
        },
        ze = function(t) {
          return function(e) {
            return t.transporter.read({ method: u, path: '1/clusters/mapping' }, e);
          };
        },
        Be = function(t) {
          return function(e, n, r) {
            return O(
              t.transporter.write(
                { method: f, path: h('1/indexes/%s/operation', e), data: { operation: 'move', destination: n } },
                r
              ),
              function(o, c) {
                return wt(t)(e, { methods: { waitTask: M } }).waitTask(o.taskID, c);
              }
            );
          };
        },
        We = function(t) {
          return function(e, n) {
            return O(t.transporter.write({ method: f, path: '1/indexes/*/batch', data: { requests: e } }, n), function(
              r,
              o
            ) {
              return Promise.all(
                Object.keys(r.taskID).map(function(c) {
                  return wt(t)(c, { methods: { waitTask: M } }).waitTask(r.taskID[c], o);
                })
              );
            });
          };
        },
        Ge = function(t) {
          return function(e, n) {
            return t.transporter.read({ method: f, path: '1/indexes/*/objects', data: { requests: e } }, n);
          };
        },
        Xt = function(t) {
          return function(e, n) {
            var r = e.map(function(o) {
              return i(i({}, o), {}, { params: dt(o.params || {}) });
            });
            return t.transporter.read(
              { method: f, path: '1/indexes/*/queries', data: { requests: r }, cacheable: !0 },
              n
            );
          };
        },
        Yt = function(t) {
          return function(e, n) {
            return Promise.all(
              e.map(function(r) {
                var o = r.params,
                  c = o.facetName,
                  p = o.facetQuery,
                  l = y(o, ['facetName', 'facetQuery']);
                return wt(t)(r.indexName, { methods: { searchForFacetValues: re } }).searchForFacetValues(
                  c,
                  p,
                  i(i({}, n), l)
                );
              })
            );
          };
        },
        Ke = function(t) {
          return function(e, n) {
            var r = x(n);
            return (
              (r.queryParameters['X-Algolia-User-ID'] = e),
              t.transporter.write({ method: a, path: '1/clusters/mapping' }, r)
            );
          };
        },
        Je = function(t) {
          return function(e, n, r) {
            var o = n.map(function(c) {
              return { action: 'addEntry', body: c };
            });
            return O(
              t.transporter.write(
                {
                  method: f,
                  path: h('/1/dictionaries/%s/batch', e),
                  data: { clearExistingDictionaryEntries: !0, requests: o }
                },
                r
              ),
              function(c, p) {
                return pt(t)(c.taskID, p);
              }
            );
          };
        },
        Qe = function(t) {
          return function(e, n) {
            return O(t.transporter.write({ method: f, path: h('1/keys/%s/restore', e) }, n), function(r, o) {
              return Y(function(c) {
                return vt(t)(e, o).catch(function(p) {
                  if (p.status !== 404) throw p;
                  return c();
                });
              });
            });
          };
        },
        Ve = function(t) {
          return function(e, n, r) {
            var o = n.map(function(c) {
              return { action: 'addEntry', body: c };
            });
            return O(
              t.transporter.write(
                {
                  method: f,
                  path: h('/1/dictionaries/%s/batch', e),
                  data: { clearExistingDictionaryEntries: !1, requests: o }
                },
                r
              ),
              function(c, p) {
                return pt(t)(c.taskID, p);
              }
            );
          };
        },
        Xe = function(t) {
          return function(e, n, r) {
            return t.transporter.read(
              { method: f, path: h('/1/dictionaries/%s/search', e), data: { query: n }, cacheable: !0 },
              r
            );
          };
        },
        Ye = function(t) {
          return function(e, n) {
            return t.transporter.read({ method: f, path: '1/clusters/mapping/search', data: { query: e } }, n);
          };
        },
        Ze = function(t) {
          return function(e, n) {
            return O(t.transporter.write({ method: S, path: '/1/dictionaries/*/settings', data: e }, n), function(
              r,
              o
            ) {
              return pt(t)(r.taskID, o);
            });
          };
        },
        He = function(t) {
          return function(e, n) {
            var r = Object.assign({}, n),
              o = n || {},
              c = o.queryParameters,
              p = y(o, ['queryParameters']),
              l = c ? { queryParameters: c } : {},
              m = [
                'acl',
                'indexes',
                'referers',
                'restrictSources',
                'queryParameters',
                'description',
                'maxQueriesPerIPPerHour',
                'maxHitsPerQuery'
              ];
            return O(t.transporter.write({ method: S, path: h('1/keys/%s', e), data: l }, p), function(v, b) {
              return Y(function(k) {
                return vt(t)(e, b).then(function(E) {
                  return (function(I) {
                    return Object.keys(r)
                      .filter(function(D) {
                        return m.indexOf(D) !== -1;
                      })
                      .every(function(D) {
                        return I[D] === r[D];
                      });
                  })(E)
                    ? Promise.resolve()
                    : k();
                });
              });
            });
          };
        },
        pt = function(t) {
          return function(e, n) {
            return Y(function(r) {
              return Vt(t)(e, n).then(function(o) {
                return o.status !== 'published' ? r() : void 0;
              });
            });
          };
        },
        Zt = function(t) {
          return function(e, n) {
            return O(
              t.transporter.write({ method: f, path: h('1/indexes/%s/batch', t.indexName), data: { requests: e } }, n),
              function(r, o) {
                return M(t)(r.taskID, o);
              }
            );
          };
        },
        tn = function(t) {
          return function(e) {
            return ht(
              i(
                i(
                  {
                    shouldStop: function(n) {
                      return n.cursor === void 0;
                    }
                  },
                  e
                ),
                {},
                {
                  request: function(n) {
                    return t.transporter.read({ method: f, path: h('1/indexes/%s/browse', t.indexName), data: n }, e);
                  }
                }
              )
            );
          };
        },
        en = function(t) {
          return function(e) {
            var n = i({ hitsPerPage: 1e3 }, e);
            return ht(
              i(
                i(
                  {
                    shouldStop: function(r) {
                      return r.hits.length < n.hitsPerPage;
                    }
                  },
                  n
                ),
                {},
                {
                  request: function(r) {
                    return ie(t)('', i(i({}, n), r)).then(function(o) {
                      return i(
                        i({}, o),
                        {},
                        {
                          hits: o.hits.map(function(c) {
                            return delete c._highlightResult, c;
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
        nn = function(t) {
          return function(e) {
            var n = i({ hitsPerPage: 1e3 }, e);
            return ht(
              i(
                i(
                  {
                    shouldStop: function(r) {
                      return r.hits.length < n.hitsPerPage;
                    }
                  },
                  n
                ),
                {},
                {
                  request: function(r) {
                    return oe(t)('', i(i({}, n), r)).then(function(o) {
                      return i(
                        i({}, o),
                        {},
                        {
                          hits: o.hits.map(function(c) {
                            return delete c._highlightResult, c;
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
        It = function(t) {
          return function(e, n, r) {
            var o = r || {},
              c = o.batchSize,
              p = y(o, ['batchSize']),
              l = { taskIDs: [], objectIDs: [] };
            return O(
              (function m() {
                var v,
                  b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0,
                  k = [];
                for (v = b; v < e.length && (k.push(e[v]), k.length !== (c || 1e3)); v++);
                return k.length === 0
                  ? Promise.resolve(l)
                  : Zt(t)(
                      k.map(function(E) {
                        return { action: n, body: E };
                      }),
                      p
                    ).then(function(E) {
                      return (l.objectIDs = l.objectIDs.concat(E.objectIDs)), l.taskIDs.push(E.taskID), v++, m(v);
                    });
              })(),
              function(m, v) {
                return Promise.all(
                  m.taskIDs.map(function(b) {
                    return M(t)(b, v);
                  })
                );
              }
            );
          };
        },
        rn = function(t) {
          return function(e) {
            return O(t.transporter.write({ method: f, path: h('1/indexes/%s/clear', t.indexName) }, e), function(n, r) {
              return M(t)(n.taskID, r);
            });
          };
        },
        on = function(t) {
          return function(e) {
            var n = e || {},
              r = n.forwardToReplicas,
              o = x(y(n, ['forwardToReplicas']));
            return (
              r && (o.queryParameters.forwardToReplicas = 1),
              O(t.transporter.write({ method: f, path: h('1/indexes/%s/rules/clear', t.indexName) }, o), function(
                c,
                p
              ) {
                return M(t)(c.taskID, p);
              })
            );
          };
        },
        sn = function(t) {
          return function(e) {
            var n = e || {},
              r = n.forwardToReplicas,
              o = x(y(n, ['forwardToReplicas']));
            return (
              r && (o.queryParameters.forwardToReplicas = 1),
              O(t.transporter.write({ method: f, path: h('1/indexes/%s/synonyms/clear', t.indexName) }, o), function(
                c,
                p
              ) {
                return M(t)(c.taskID, p);
              })
            );
          };
        },
        an = function(t) {
          return function(e, n) {
            return O(
              t.transporter.write({ method: f, path: h('1/indexes/%s/deleteByQuery', t.indexName), data: e }, n),
              function(r, o) {
                return M(t)(r.taskID, o);
              }
            );
          };
        },
        un = function(t) {
          return function(e) {
            return O(t.transporter.write({ method: a, path: h('1/indexes/%s', t.indexName) }, e), function(n, r) {
              return M(t)(n.taskID, r);
            });
          };
        },
        cn = function(t) {
          return function(e, n) {
            return O(
              Ht(t)([e], n).then(function(r) {
                return { taskID: r.taskIDs[0] };
              }),
              function(r, o) {
                return M(t)(r.taskID, o);
              }
            );
          };
        },
        Ht = function(t) {
          return function(e, n) {
            var r = e.map(function(o) {
              return { objectID: o };
            });
            return It(t)(r, mt.DeleteObject, n);
          };
        },
        ln = function(t) {
          return function(e, n) {
            var r = n || {},
              o = r.forwardToReplicas,
              c = x(y(r, ['forwardToReplicas']));
            return (
              o && (c.queryParameters.forwardToReplicas = 1),
              O(t.transporter.write({ method: a, path: h('1/indexes/%s/rules/%s', t.indexName, e) }, c), function(
                p,
                l
              ) {
                return M(t)(p.taskID, l);
              })
            );
          };
        },
        fn = function(t) {
          return function(e, n) {
            var r = n || {},
              o = r.forwardToReplicas,
              c = x(y(r, ['forwardToReplicas']));
            return (
              o && (c.queryParameters.forwardToReplicas = 1),
              O(t.transporter.write({ method: a, path: h('1/indexes/%s/synonyms/%s', t.indexName, e) }, c), function(
                p,
                l
              ) {
                return M(t)(p.taskID, l);
              })
            );
          };
        },
        dn = function(t) {
          return function(e) {
            return te(t)(e)
              .then(function() {
                return !0;
              })
              .catch(function(n) {
                if (n.status !== 404) throw n;
                return !1;
              });
          };
        },
        hn = function(t) {
          return function(e, n, r) {
            return t.transporter.read(
              {
                method: f,
                path: h('1/answers/%s/prediction', t.indexName),
                data: { query: e, queryLanguages: n },
                cacheable: !0
              },
              r
            );
          };
        },
        pn = function(t) {
          return function(e, n) {
            var r = n || {},
              o = r.query,
              c = r.paginate,
              p = y(r, ['query', 'paginate']),
              l = 0;
            return (function m() {
              return ne(t)(o || '', i(i({}, p), {}, { page: l })).then(function(v) {
                for (var b = 0, k = Object.entries(v.hits); b < k.length; b++) {
                  var E = P(k[b], 2),
                    I = E[0],
                    D = E[1];
                  if (e(D)) return { object: D, position: parseInt(I, 10), page: l };
                }
                if ((l++, c === !1 || l >= v.nbPages))
                  throw { name: 'ObjectNotFoundError', message: 'Object not found.' };
                return m();
              });
            })();
          };
        },
        mn = function(t) {
          return function(e, n) {
            return t.transporter.read({ method: u, path: h('1/indexes/%s/%s', t.indexName, e) }, n);
          };
        },
        gn = function() {
          return function(t, e) {
            for (var n = 0, r = Object.entries(t.hits); n < r.length; n++) {
              var o = P(r[n], 2),
                c = o[0];
              if (o[1].objectID === e) return parseInt(c, 10);
            }
            return -1;
          };
        },
        yn = function(t) {
          return function(e, n) {
            var r = n || {},
              o = r.attributesToRetrieve,
              c = y(r, ['attributesToRetrieve']),
              p = e.map(function(l) {
                return i({ indexName: t.indexName, objectID: l }, o ? { attributesToRetrieve: o } : {});
              });
            return t.transporter.read({ method: f, path: '1/indexes/*/objects', data: { requests: p } }, c);
          };
        },
        _n = function(t) {
          return function(e, n) {
            return t.transporter.read({ method: u, path: h('1/indexes/%s/rules/%s', t.indexName, e) }, n);
          };
        },
        te = function(t) {
          return function(e) {
            return t.transporter.read(
              { method: u, path: h('1/indexes/%s/settings', t.indexName), data: { getVersion: 2 } },
              e
            );
          };
        },
        bn = function(t) {
          return function(e, n) {
            return t.transporter.read({ method: u, path: h('1/indexes/%s/synonyms/%s', t.indexName, e) }, n);
          };
        },
        vn = function(t) {
          return function(e, n) {
            return O(
              ee(t)([e], n).then(function(r) {
                return { objectID: r.objectIDs[0], taskID: r.taskIDs[0] };
              }),
              function(r, o) {
                return M(t)(r.taskID, o);
              }
            );
          };
        },
        ee = function(t) {
          return function(e, n) {
            var r = n || {},
              o = r.createIfNotExists,
              c = y(r, ['createIfNotExists']),
              p = o ? mt.PartialUpdateObject : mt.PartialUpdateObjectNoCreate;
            return It(t)(e, p, c);
          };
        },
        wn = function(t) {
          return function(e, n) {
            var r = n || {},
              o = r.safe,
              c = r.autoGenerateObjectIDIfNotExist,
              p = r.batchSize,
              l = y(r, ['safe', 'autoGenerateObjectIDIfNotExist', 'batchSize']),
              m = function(D, q, C, V) {
                return O(
                  t.transporter.write(
                    { method: f, path: h('1/indexes/%s/operation', D), data: { operation: C, destination: q } },
                    V
                  ),
                  function(xt, K) {
                    return M(t)(xt.taskID, K);
                  }
                );
              },
              v = Math.random()
                .toString(36)
                .substring(7),
              b = ''.concat(t.indexName, '_tmp_').concat(v),
              k = $t({ appId: t.appId, transporter: t.transporter, indexName: b }),
              E = [],
              I = m(t.indexName, b, 'copy', i(i({}, l), {}, { scope: ['settings', 'synonyms', 'rules'] }));
            return (
              E.push(I),
              O(
                (o ? I.wait(l) : I)
                  .then(function() {
                    var D = k(e, i(i({}, l), {}, { autoGenerateObjectIDIfNotExist: c, batchSize: p }));
                    return E.push(D), o ? D.wait(l) : D;
                  })
                  .then(function() {
                    var D = m(b, t.indexName, 'move', l);
                    return E.push(D), o ? D.wait(l) : D;
                  })
                  .then(function() {
                    return Promise.all(E);
                  })
                  .then(function(D) {
                    var q = P(D, 3),
                      C = q[0],
                      V = q[1],
                      xt = q[2];
                    return { objectIDs: V.objectIDs, taskIDs: [C.taskID].concat(N(V.taskIDs), [xt.taskID]) };
                  }),
                function(D, q) {
                  return Promise.all(
                    E.map(function(C) {
                      return C.wait(q);
                    })
                  );
                }
              )
            );
          };
        },
        xn = function(t) {
          return function(e, n) {
            return jt(t)(e, i(i({}, n), {}, { clearExistingRules: !0 }));
          };
        },
        Sn = function(t) {
          return function(e, n) {
            return At(t)(e, i(i({}, n), {}, { clearExistingSynonyms: !0 }));
          };
        },
        En = function(t) {
          return function(e, n) {
            return O(
              $t(t)([e], n).then(function(r) {
                return { objectID: r.objectIDs[0], taskID: r.taskIDs[0] };
              }),
              function(r, o) {
                return M(t)(r.taskID, o);
              }
            );
          };
        },
        $t = function(t) {
          return function(e, n) {
            var r = n || {},
              o = r.autoGenerateObjectIDIfNotExist,
              c = y(r, ['autoGenerateObjectIDIfNotExist']),
              p = o ? mt.AddObject : mt.UpdateObject;
            if (p === mt.UpdateObject) {
              var l = !0,
                m = !1,
                v = void 0;
              try {
                for (var b, k = e[Symbol.iterator](); !(l = (b = k.next()).done); l = !0)
                  if (b.value.objectID === void 0)
                    return O(
                      Promise.reject({
                        name: 'MissingObjectIDError',
                        message:
                          "All objects must have an unique objectID (like a primary key) to be valid. Algolia is also able to generate objectIDs automatically but *it's not recommended*. To do it, use the `{'autoGenerateObjectIDIfNotExist': true}` option."
                      })
                    );
              } catch (E) {
                (m = !0), (v = E);
              } finally {
                try {
                  l || k.return == null || k.return();
                } finally {
                  if (m) throw v;
                }
              }
            }
            return It(t)(e, p, c);
          };
        },
        kn = function(t) {
          return function(e, n) {
            return jt(t)([e], n);
          };
        },
        jt = function(t) {
          return function(e, n) {
            var r = n || {},
              o = r.forwardToReplicas,
              c = r.clearExistingRules,
              p = x(y(r, ['forwardToReplicas', 'clearExistingRules']));
            return (
              o && (p.queryParameters.forwardToReplicas = 1),
              c && (p.queryParameters.clearExistingRules = 1),
              O(
                t.transporter.write({ method: f, path: h('1/indexes/%s/rules/batch', t.indexName), data: e }, p),
                function(l, m) {
                  return M(t)(l.taskID, m);
                }
              )
            );
          };
        },
        On = function(t) {
          return function(e, n) {
            return At(t)([e], n);
          };
        },
        At = function(t) {
          return function(e, n) {
            var r = n || {},
              o = r.forwardToReplicas,
              c = r.clearExistingSynonyms,
              p = r.replaceExistingSynonyms,
              l = x(y(r, ['forwardToReplicas', 'clearExistingSynonyms', 'replaceExistingSynonyms']));
            return (
              o && (l.queryParameters.forwardToReplicas = 1),
              (p || c) && (l.queryParameters.replaceExistingSynonyms = 1),
              O(
                t.transporter.write({ method: f, path: h('1/indexes/%s/synonyms/batch', t.indexName), data: e }, l),
                function(m, v) {
                  return M(t)(m.taskID, v);
                }
              )
            );
          };
        },
        ne = function(t) {
          return function(e, n) {
            return t.transporter.read(
              { method: f, path: h('1/indexes/%s/query', t.indexName), data: { query: e }, cacheable: !0 },
              n
            );
          };
        },
        re = function(t) {
          return function(e, n, r) {
            return t.transporter.read(
              {
                method: f,
                path: h('1/indexes/%s/facets/%s/query', t.indexName, e),
                data: { facetQuery: n },
                cacheable: !0
              },
              r
            );
          };
        },
        ie = function(t) {
          return function(e, n) {
            return t.transporter.read(
              { method: f, path: h('1/indexes/%s/rules/search', t.indexName), data: { query: e } },
              n
            );
          };
        },
        oe = function(t) {
          return function(e, n) {
            return t.transporter.read(
              { method: f, path: h('1/indexes/%s/synonyms/search', t.indexName), data: { query: e } },
              n
            );
          };
        },
        Pn = function(t) {
          return function(e, n) {
            var r = n || {},
              o = r.forwardToReplicas,
              c = x(y(r, ['forwardToReplicas']));
            return (
              o && (c.queryParameters.forwardToReplicas = 1),
              O(t.transporter.write({ method: S, path: h('1/indexes/%s/settings', t.indexName), data: e }, c), function(
                p,
                l
              ) {
                return M(t)(p.taskID, l);
              })
            );
          };
        },
        M = function(t) {
          return function(e, n) {
            return Y(function(r) {
              return (function(o) {
                return function(c, p) {
                  return o.transporter.read(
                    { method: u, path: h('1/indexes/%s/task/%s', o.indexName, c.toString()) },
                    p
                  );
                };
              })(t)(e, n).then(function(o) {
                return o.status !== 'published' ? r() : void 0;
              });
            });
          };
        },
        mt = {
          AddObject: 'addObject',
          UpdateObject: 'updateObject',
          PartialUpdateObject: 'partialUpdateObject',
          PartialUpdateObjectNoCreate: 'partialUpdateObjectNoCreate',
          DeleteObject: 'deleteObject',
          DeleteIndex: 'delete',
          ClearIndex: 'clear'
        },
        qt = { Settings: 'settings', Synonyms: 'synonyms', Rules: 'rules' },
        Tn = 1,
        Dn = 2,
        Fn = 3;
      function se(t, e, n) {
        var r,
          o = {
            appId: t,
            apiKey: e,
            timeouts: { connect: 1, read: 2, write: 30 },
            requester: {
              send: function(l) {
                return new Promise(function(m) {
                  var v = new XMLHttpRequest();
                  v.open(l.method, l.url, !0),
                    Object.keys(l.headers).forEach(function(I) {
                      return v.setRequestHeader(I, l.headers[I]);
                    });
                  var b,
                    k = function(I, D) {
                      return setTimeout(function() {
                        v.abort(), m({ status: 0, content: D, isTimedOut: !0 });
                      }, 1e3 * I);
                    },
                    E = k(l.connectTimeout, 'Connection timeout');
                  (v.onreadystatechange = function() {
                    v.readyState > v.OPENED &&
                      b === void 0 &&
                      (clearTimeout(E), (b = k(l.responseTimeout, 'Socket timeout')));
                  }),
                    (v.onerror = function() {
                      v.status === 0 &&
                        (clearTimeout(E),
                        clearTimeout(b),
                        m({ content: v.responseText || 'Network request failed', status: v.status, isTimedOut: !1 }));
                    }),
                    (v.onload = function() {
                      clearTimeout(E),
                        clearTimeout(b),
                        m({ content: v.responseText, status: v.status, isTimedOut: !1 });
                    }),
                    v.send(l.data);
                });
              }
            },
            logger:
              ((r = Fn),
              {
                debug: function(l, m) {
                  return Tn >= r && console.debug(l, m), Promise.resolve();
                },
                info: function(l, m) {
                  return Dn >= r && console.info(l, m), Promise.resolve();
                },
                error: function(l, m) {
                  return console.error(l, m), Promise.resolve();
                }
              }),
            responsesCache: nt(),
            requestsCache: nt({ serializable: !1 }),
            hostsCache: G({ caches: [W({ key: ''.concat('4.17.0', '-').concat(t) }), nt()] }),
            userAgent: $('4.17.0').add({ segment: 'Browser' })
          },
          c = i(i({}, o), n),
          p = function() {
            return function(l) {
              return (function(m) {
                var v = m.region || 'us',
                  b = X(w.WithinHeaders, m.appId, m.apiKey),
                  k = ot(
                    i(
                      i({ hosts: [{ url: 'personalization.'.concat(v, '.algolia.com') }] }, m),
                      {},
                      {
                        headers: i(i(i({}, b.headers()), { 'content-type': 'application/json' }), m.headers),
                        queryParameters: i(i({}, b.queryParameters()), m.queryParameters)
                      }
                    )
                  );
                return _({ appId: m.appId, transporter: k }, m.methods);
              })(
                i(i(i({}, o), l), {}, { methods: { getPersonalizationStrategy: kt, setPersonalizationStrategy: Dt } })
              );
            };
          };
        return (function(l) {
          var m = l.appId,
            v = X(l.authMode !== void 0 ? l.authMode : w.WithinHeaders, m, l.apiKey),
            b = ot(
              i(
                i(
                  {
                    hosts: [
                      { url: ''.concat(m, '-dsn.algolia.net'), accept: j.Read },
                      { url: ''.concat(m, '.algolia.net'), accept: j.Write }
                    ].concat(
                      g([
                        { url: ''.concat(m, '-1.algolianet.com') },
                        { url: ''.concat(m, '-2.algolianet.com') },
                        { url: ''.concat(m, '-3.algolianet.com') }
                      ])
                    )
                  },
                  l
                ),
                {},
                {
                  headers: i(i(i({}, v.headers()), { 'content-type': 'application/x-www-form-urlencoded' }), l.headers),
                  queryParameters: i(i({}, v.queryParameters()), l.queryParameters)
                }
              )
            );
          return _(
            {
              transporter: b,
              appId: m,
              addAlgoliaAgent: function(k, E) {
                b.userAgent.add({ segment: k, version: E });
              },
              clearCache: function() {
                return Promise.all([b.requestsCache.clear(), b.responsesCache.clear()]).then(function() {});
              }
            },
            l.methods
          );
        })(
          i(
            i({}, c),
            {},
            {
              methods: {
                search: Xt,
                searchForFacetValues: Yt,
                multipleBatch: We,
                multipleGetObjects: Ge,
                multipleQueries: Xt,
                copyIndex: tt,
                copySettings: De,
                copySynonyms: Fe,
                copyRules: bt,
                moveIndex: Be,
                listIndices: Ue,
                getLogs: qe,
                listClusters: Me,
                multipleSearchForFacetValues: Yt,
                getApiKey: vt,
                addApiKey: Ft,
                listApiKeys: Le,
                updateApiKey: He,
                deleteApiKey: $e,
                restoreApiKey: Qe,
                assignUserID: Z,
                assignUserIDs: Q,
                getUserID: Re,
                searchUserIDs: Ye,
                listUserIDs: ze,
                getTopUserIDs: Ne,
                removeUserID: Ke,
                hasPendingMappings: Ce,
                clearDictionaryEntries: H,
                deleteDictionaryEntries: je,
                getDictionarySettings: Ae,
                getAppTask: Vt,
                replaceDictionaryEntries: Je,
                saveDictionaryEntries: Ve,
                searchDictionaryEntries: Xe,
                setDictionarySettings: Ze,
                waitAppTask: pt,
                customRequest: Ie,
                initIndex: function(l) {
                  return function(m) {
                    return wt(l)(m, {
                      methods: {
                        batch: Zt,
                        delete: un,
                        findAnswers: hn,
                        getObject: mn,
                        getObjects: yn,
                        saveObject: En,
                        saveObjects: $t,
                        search: ne,
                        searchForFacetValues: re,
                        waitTask: M,
                        setSettings: Pn,
                        getSettings: te,
                        partialUpdateObject: vn,
                        partialUpdateObjects: ee,
                        deleteObject: cn,
                        deleteObjects: Ht,
                        deleteBy: an,
                        clearObjects: rn,
                        browseObjects: tn,
                        getObjectPosition: gn,
                        findObject: pn,
                        exists: dn,
                        saveSynonym: On,
                        saveSynonyms: At,
                        getSynonym: bn,
                        searchSynonyms: oe,
                        browseSynonyms: nn,
                        deleteSynonym: fn,
                        clearSynonyms: sn,
                        replaceAllObjects: wn,
                        replaceAllSynonyms: Sn,
                        searchRules: ie,
                        getRule: _n,
                        deleteRule: ln,
                        saveRule: kn,
                        saveRules: jt,
                        replaceAllRules: xn,
                        browseRules: en,
                        clearRules: on
                      }
                    });
                  };
                },
                initAnalytics: function() {
                  return function(l) {
                    return (function(m) {
                      var v = m.region || 'us',
                        b = X(w.WithinHeaders, m.appId, m.apiKey),
                        k = ot(
                          i(
                            i({ hosts: [{ url: 'analytics.'.concat(v, '.algolia.com') }] }, m),
                            {},
                            {
                              headers: i(i(i({}, b.headers()), { 'content-type': 'application/json' }), m.headers),
                              queryParameters: i(i({}, b.queryParameters()), m.queryParameters)
                            }
                          )
                        );
                      return _({ appId: m.appId, transporter: k }, m.methods);
                    })(
                      i(
                        i(i({}, o), l),
                        {},
                        { methods: { addABTest: ct, getABTest: _t, getABTests: st, stopABTest: it, deleteABTest: R } }
                      )
                    );
                  };
                },
                initPersonalization: p,
                initRecommendation: function() {
                  return function(l) {
                    return (
                      c.logger.info(
                        'The `initRecommendation` method is deprecated. Use `initPersonalization` instead.'
                      ),
                      p()(l)
                    );
                  };
                }
              }
            }
          )
        );
      }
      return (se.version = '4.17.0'), se;
    });
  });
  var Rt;
  location.port == '4000'
    ? (Rt = location.protocol + '//' + location.hostname + ':4001')
    : (Rt = '/docu-microfrontend');
  var Cn = () =>
      fetch('/navigation-generated.json', {
        headers: { 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload' }
      })
        .then(function(d) {
          return d.json();
        })
        .then(function(d) {
          return d.map(s => ((s.viewUrl = s.viewUrl.replace('__BASE_URL__', Rt)), s));
        })
        .catch(function(d) {
          console.error(`Error: ${d}`);
        }),
    Ct = class {
      addNavHrefs = !0;
      nodes = {
        defaultChildNode: 'docs',
        children: [
          { label: 'About Luigi', externalLink: { url: 'https://luigi-project.io/about', sameWindow: !0 } },
          {
            pathSegment: 'docs',
            label: 'Documentation',
            children: Cn(),
            context: { coreBaseUrl: window.location.origin }
          },
          { label: 'Blog', externalLink: { url: 'https://luigi-project.io/blog', sameWindow: !0 } },
          { label: 'Twitter', externalLink: { url: 'https://twitter.com/luigiprojectio' }, icon: 'twitter' },
          { label: 'Slack', externalLink: { url: 'https://slack.luigi-project.io' }, icon: 'slack' },
          { label: 'Github', externalLink: { url: 'https://github.com/SAP/luigi' }, icon: 'github' }
        ]
      };
      getProductSwitcherItems = () => [
        {
          icon: 'https://pbs.twimg.com/profile_images/1143452953858183170/QLk-HGmK_bigger.png',
          label: 'hybris',
          externalLink: { url: 'https://www.hybris.com', sameWindow: !1 }
        }
      ];
      getProfileItems = () => [
        { label: 'Luigi in Github', externalLink: { url: 'https://github.com/SAP/luigi', sameWindow: !1 } }
      ];
    },
    ce = new Ct();
  var Lt = class {
      useHashRouting = !1;
      nodeParamPrefix = !1;
      skipRoutingForUrlPatterns = [/access_token=/, /id_token=/];
    },
    le = new Lt();
  var Mt = class {
      header = {
        title: 'Documentation - Luigi - The Enterprise-Ready Micro Frontend Framework',
        logo: '/logo.svg',
        favicon: '/favicon.png'
      };
      responsiveNavigation = 'simpleMobileOnly';
      sideNavFooterText = ' ';
      customSandboxRules = ['allow-presentation'];
    },
    fe = new Mt();
  var Bt = ue(me(), 1);
  function ge() {}
  function be(d) {
    return d();
  }
  function ve(d) {
    d.forEach(be);
  }
  function ye(d) {
    return typeof d == 'function';
  }
  function Mn(d) {
    return Object.keys(d).length === 0;
  }
  var _e = [];
  function Un(d) {
    let s = [],
      i = [];
    _e.forEach(y => (d.indexOf(y) === -1 ? s.push(y) : i.push(y))), i.forEach(y => y()), (_e = s);
  }
  var sr = typeof window < 'u' ? window : typeof globalThis < 'u' ? globalThis : global;
  var zn = [
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
      'inert',
      'ismap',
      'itemscope',
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
    ],
    ar = new Set([...zn]);
  function Bn(d, s) {
    let i = d.$$;
    i.fragment !== null &&
      (Un(i.after_update),
      ve(i.on_destroy),
      i.fragment && i.fragment.d(s),
      (i.on_destroy = i.fragment = null),
      (i.ctx = []));
  }
  var Wn;
  typeof HTMLElement == 'function' &&
    (Wn = class extends HTMLElement {
      constructor() {
        super(), this.attachShadow({ mode: 'open' });
      }
      connectedCallback() {
        let { on_mount: d } = this.$$;
        this.$$.on_disconnect = d.map(be).filter(ye);
        for (let s in this.$$.slotted) this.appendChild(this.$$.slotted[s]);
      }
      attributeChangedCallback(d, s, i) {
        this[d] = i;
      }
      disconnectedCallback() {
        ve(this.$$.on_disconnect);
      }
      $destroy() {
        Bn(this, 1), (this.$destroy = ge);
      }
      $on(d, s) {
        if (!ye(s)) return ge;
        let i = this.$$.callbacks[d] || (this.$$.callbacks[d] = []);
        return (
          i.push(s),
          () => {
            let y = i.indexOf(s);
            y !== -1 && i.splice(y, 1);
          }
        );
      }
      $set(d) {
        this.$$set && !Mn(d) && ((this.$$.skip_bound = !0), this.$$set(d), (this.$$.skip_bound = !1));
      }
    });
  var Gn = `
       <div class="ds-suggestion" role="option" id="option-27550019" aria-selected="true">
        <a class="algolia-docsearch-suggestion algolia-docsearch-suggestion__main algolia-docsearch-suggestion__secondary" style="white-space: normal;">
          <div class="algolia-docsearch-suggestion--category-header">
              <span class="algolia-docsearch-suggestion--category-header-lvl0">
               {{{title1}}}
              </span>
          </div>
          <div class="algolia-docsearch-suggestion--wrapper">
            <div class="algolia-docsearch-suggestion--subcategory-column">
              <span class="algolia-docsearch-suggestion--subcategory-column-text">{{{title2}}}</span>
            </div>
            <div class="algolia-docsearch-suggestion--content">
              <div class='algolia-docsearch-suggestion--subcategory-inline'>{{{title2}}}</div>
              <div class="algolia-docsearch-suggestion--title">{{{title3}}}</div>
              <div class="algolia-docsearch-suggestion--text">{{{description}}}</div>
            </div>
          </div>
        </a>
    </div>
        `,
    Kn = `
  <div class="algolia-docsearch">
    <div class="algolia-docsearch--wrapper">
        <div class="algolia-docsearch--content algolia-docsearch--no-results">
            <div class="algolia-docsearch--title">
                <div class="algolia-docsearch--text">
                    No results found for query <b>"{{query}}"</b>
                </div>
            </div>
        </div>
    </div>
  </div>
  `,
    Jn = 38,
    we = 40,
    Qn = 13,
    xe = !1,
    ft = [],
    et = 0,
    Se = '';
  function Vn(d) {
    if (d.keyCode == Qn && et !== 0) {
      ft[et - 1].click();
      return;
    }
    (d.keyCode !== we && d.keyCode !== Jn) ||
      (d.keyCode === we ? et++ : et--, et === -1 && (et = ft.length), (et = et % (ft.length + 1)), Xn());
  }
  function Xn() {
    ft.forEach(d => d.classList.remove('ds-cursor')), et !== 0 && ft[et - 1].classList.add('ds-cursor');
  }
  var Et = class {
    constructor(s, i) {
      (this.query = s), (this.results = i), this.addKeyEvent();
    }
    addKeyEvent() {
      if (xe) return;
      document.querySelector('input.luigi-search__input').addEventListener('keyup', Vn), (xe = !0);
    }
    buildDomResults() {
      (ft = []), this.query !== Se && ((et = 0), (Se = this.query)), this.cleanResults();
      let { resultSpan: s, container: i } = this.buildContainer();
      return this.results.length === 0 ? this.domEmpty(s) : this.domResults(s), i;
    }
    cleanResults() {
      let s = document.querySelector('span.algolia-autocomplete');
      s && s.remove();
    }
    domResults(s) {
      let i = Bt.default.compile(Gn);
      for (let y of this.results) {
        let P = this.dataTemplate(y),
          N = this.renderResult(i, P),
          W = this.htmlToElement(N);
        this.attachItemEvents(W, y), ft.push(W), s.appendChild(W);
      }
    }
    domEmpty(s) {
      let i = Bt.default.compile(Kn),
        y = { query: this.query },
        P = i.render(y),
        N = this.htmlToElement(P);
      s.appendChild(N);
    }
    shortText(s) {
      let i = s;
      if (i.length > 80) {
        let y = i.substring(80).indexOf(' ') + 80;
        i = i.substring(0, y) + '..';
      }
      return this.highlightKeyword(i);
    }
    dataTemplate(s) {
      return {
        label: this.shortText(s.label),
        description: this.shortText(s.description),
        title1: this.shortText(s.title1),
        title2: this.shortText(s.title2),
        title3: this.shortText(s.title3)
      };
    }
    renderResult(s, i) {
      return s.render(i);
    }
    highlightKeyword(s) {
      return (
        this.perm(this.query).forEach(i => {
          let y = '<span class="algolia-docsearch-suggestion--highlight">' + i + '</span>';
          s = s.replaceAll(i, y);
        }),
        s
      );
    }
    attachItemEvents(s, i) {
      s.addEventListener('click', y => {
        y.preventDefault(),
          Luigi.navigation()
            .withParams(i.pathObject.params)
            .navigate(i.pathObject.link),
          Luigi.globalSearch().closeSearchResult(),
          Luigi.globalSearch().clearSearchField();
      }),
        s.addEventListener('mouseover', y => {
          y.preventDefault(), s.set, s.classList.add('ds-cursor');
        }),
        s.addEventListener('mouseout', y => {
          y.preventDefault(), s.classList.remove('ds-cursor');
        });
    }
    buildContainer() {
      let s = this.createAttribute('span', {
          class: 'algolia-autocomplete algolia-autocomplete-right',
          style: 'position: relative; display: inline-block; direction: ltr;'
        }),
        i = this.createAttribute('span', {
          class: 'ds-dropdown-menu ds-with-1',
          role: 'listbox',
          id: 'algolia-autocomplete-listbox-0',
          style: 'position: absolute; top: 100%; z-index: 100; left: 0px; right: auto; display: block;'
        }),
        y = this.createAttribute('div', { class: 'ds-dataset-1' }),
        P = this.createAttribute('span', { class: 'ds-suggestions', style: 'display: block;' }),
        N = this.htmlToElement(
          '<div class="algolia-docsearch-footer">Search by <a class="algolia-docsearch-footer--logo" href="https://www.algolia.com/docsearch">Algolia</a></div>'
        );
      return s.appendChild(i), i.appendChild(y), y.appendChild(P), y.appendChild(N), { container: s, resultSpan: P };
    }
    createAttribute(s, i) {
      let y = document.createElement(s);
      return i && Object.keys(i).forEach(P => y.setAttribute(P, i[P])), y;
    }
    htmlToElement(s) {
      return new DOMParser().parseFromString(s, 'text/html').body.firstChild;
    }
    perm(s) {
      let i = [],
        y = s.split(''),
        P = Math.pow(y.length, 2);
      for (let N = 0; N < P; N++) {
        for (let G = 0, nt = N; G < y.length; G++, nt >>= 1) y[G] = nt & 1 ? y[G].toUpperCase() : y[G].toLowerCase();
        let W = y.join('');
        i.push(W);
      }
      return i;
    }
    createAttribute(s, i) {
      let y = document.createElement(s);
      return i && Object.keys(i).forEach(P => y.setAttribute(P, i[P])), y;
    }
  };
  var ke = ue(Ee(), 1),
    Yn = 'BH4D9OD16A',
    Zn = '5ab04e0673d89f07c964afcf1522ad3a',
    Kt = class {
      constructor() {
        (this.client = (0, ke.default)(Yn, Zn)),
          (this.index = this.client.initIndex('luigi-project')),
          (this.searchResult = 8),
          (this.isDevelop = parseInt(window.location.port) === 4e3),
          (this.coreBaseUrl = window.location.origin);
      }
      executeSearch(s) {
        this.index
          .search(s, { hitsPerPage: this.searchResult })
          .then(({ hits: i }) => {
            (i = i.map(this.transformUrls.bind(this)).map(this.transformContent)),
              Luigi.globalSearch().showSearchResult([s].concat(i));
          })
          .catch(i => {
            console.log('Error in executing the query ' + i);
          });
      }
      transformUrls(s) {
        return (
          (s.url = s.url.replace('https://docs.luigi-project.io', '')),
          (s.url = s.url.replace('/docu-microfrontend', '')),
          s
        );
      }
      transformContent(s) {
        let i = s.url,
          y = {};
        i.indexOf('#') != -1 &&
          ((y = { section: i.substring(i.indexOf('#') + 1) }), (i = i.substring(0, i.indexOf('#'))));
        let P = s.hierarchy.lvl0,
          N = s.hierarchy.lvl1 || s.hierarchy.lvl0,
          W = s.hierarchy.lvl2 || s.hierarchy.lvl0;
        return {
          pathObject: { link: i, params: y },
          label: s.hierarchy.lvl0,
          description: s.content,
          title1: P,
          title2: N,
          title3: W,
          hit: s
        };
      }
    },
    Oe = new Kt();
  var Jt = class {
      constructor() {
        this.minSearchLength = 3;
      }
      searchProvider = {
        onInput: () => {
          let s = Luigi.globalSearch().getSearchString();
          if (s.length < this.minSearchLength) {
            Luigi.globalSearch().closeSearchResult();
            return;
          }
          Oe.executeSearch(s);
        },
        onEscape: () => {
          Luigi.globalSearch().closeSearchResult(), Luigi.globalSearch().clearSearchField();
        },
        customSearchResultRenderer: (s, i, y) => {
          let P = s.shift(),
            W = new Et(P, s).buildDomResults();
          i.appendChild(W);
        },
        disableInputHandlers: { type: !1 }
      };
    },
    Pe = new Jt();
  var Qt = class {
      customMessagesListeners = {
        'search.tag.keyword': (s, i, y) => {
          Luigi.globalSearch().openSearchField(), Luigi.globalSearch().setSearchString(s.keyword);
        }
      };
    },
    Te = new Qt();
  Luigi.setConfig({ navigation: ce, routing: le, settings: fe, globalSearch: Pe, communication: Te });
})();
/*! Bundled license information:

algoliasearch/dist/algoliasearch.umd.js:
  (*! algoliasearch.umd.js | 4.17.0 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript *)
*/
