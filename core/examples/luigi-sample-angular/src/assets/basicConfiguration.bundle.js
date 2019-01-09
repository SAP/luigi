/*!
 *
 *       Don't be afraid!
 *       This file was generated automatically and you should not modify it.
 *       The documentation (located in /docs) will tell you how to modify Luigi configuration with pleasure.
 *
 */ !(function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
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
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
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
    n((n.s = 0));
})([
  function(e, t) {
    Luigi.setConfig({
      navigation: {
        nodes: function() {
          return [
            {
              pathSegment: 'home',
              label: 'Home',
              children: [
                {
                  pathSegment: 'hw',
                  label: 'Hello World!',
                  viewUrl: '/assets/basicexternal.html'
                },
                {
                  pathSegment: 'one',
                  label: 'Section one',
                  viewUrl: '/assets/basicexternal.html#one'
                },
                {
                  pathSegment: 'two',
                  label: 'Section two',
                  viewUrl: '/assets/basicexternal.html#two'
                }
              ]
            }
          ];
        }
      },
      routing: { useHashRouting: !0 }
    });
  }
]);
