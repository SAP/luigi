/*!
 *
 *       Don't be afraid!
 *       This file was generated automatically and you should not modify it.
 *       The documentation (located in /docs) will tell you how to modify Luigi configuration with pleasure.
 *
 */ !(function(e) {
  var t = {};
  function n(i) {
    if (t[i]) return t[i].exports;
    var o = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
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
      if (
        (n.r(i),
        Object.defineProperty(i, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
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
    n((n.s = 1));
})([
  ,
  function(e, t, n) {
    'use strict';
    function i(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = n),
        e
      );
    }
    n.r(t);
    var o = new function e() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, e),
          i(this, 'use', 'mockAuth'),
          i(this, 'disableAutoLogin', !1),
          i(this, 'mockAuth', {
            authorizeUrl: ''.concat(
              window.location.origin,
              '/assets/auth-mock/login-mock.html'
            ),
            logoutUrl: ''.concat(
              window.location.origin,
              '/assets/auth-mock/logout-mock.html'
            ),
            post_logout_redirect_uri: '/logout.html',
            authorizeMethod: 'GET',
            oAuthData: { client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp' }
          }),
          i(this, 'openIdConnect', {
            authority: 'https://example-authority.com',
            client_id: 'client',
            scope: 'openid profile email',
            logoutUrl: 'https://example-url.com/logout'
          }),
          i(this, 'oAuth2ImplicitGrant', {
            authorizeUrl: 'https://example-url.com/authorize',
            logoutUrl: 'https://example-url.com/logout',
            post_logout_redirect_uri: '/logout.html',
            authorizeMethod: 'GET',
            oAuthData: {
              client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp',
              redirect_uri: '/luigi-core/auth/oauth2/callback.html',
              scope: 'openid profile email groups'
            }
          }),
          i(this, 'events', {
            onLogout: function() {
              console.log('onLogout');
            },
            onAuthSuccessful: function(e) {
              console.log('onAuthSuccessful', e);
            },
            onAuthExpired: function() {
              console.log('onAuthExpired');
            },
            onAuthError: function(e) {
              console.log('authErrorHandler 1', e);
            }
          });
      }(),
      l = function(e) {
        return new Promise(function(t) {
          var n = e.currentProject,
            i = (function(e) {
              return [
                {
                  category: {
                    label: 'User Management',
                    icon: 'person-placeholder'
                  },
                  pathSegment: 'users',
                  label: 'Users and Groups',
                  viewUrl: '/sampleapp.html#/projects/' + e + '/users',
                  icon: 'group',
                  children: [
                    {
                      category: { label: 'Groups', icon: 'group' },
                      pathSegment: 'groups',
                      label: 'Groups',
                      icon: 'group',
                      viewUrl:
                        '/sampleapp.html#/projects/' + e + '/users/groups',
                      children: [
                        {
                          pathSegment: ':group',
                          viewUrl:
                            '/sampleapp.html#/projects/' +
                            e +
                            '/users/groups/:group',
                          context: { currentGroup: ':group' },
                          children: [
                            {
                              label: 'Group Settings',
                              pathSegment: 'settings',
                              icon: 'user-settings',
                              viewUrl:
                                '/sampleapp.html#/projects/' +
                                e +
                                '/users/groups/:group/settings'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      pathSegment: 'usersoverview',
                      label: 'Users Overview',
                      icon: 'employee',
                      viewUrl:
                        '/sampleapp.html#/projects/' +
                        e +
                        '/users/usersoverview'
                    }
                  ]
                },
                {
                  category: 'User Management',
                  pathSegment: 'developers',
                  label: 'Developers',
                  viewUrl: '/sampleapp.html#/projects/' + e + '/developers',
                  icon: '/assets/favicon-sap.ico'
                },
                {
                  category: { label: 'Settings', icon: 'action-settings' },
                  pathSegment: 'settings',
                  label: 'Project Settings',
                  viewUrl: '/sampleapp.html#/projects/' + e + '/settings',
                  icon: 'settings'
                },
                {
                  pathSegment: 'miscellaneous',
                  constraints: ['unicorns'],
                  label: 'Miscellaneous',
                  viewUrl: '/sampleapp.html#/projects/' + e + '/miscellaneous',
                  icon: 'sys-help'
                },
                {
                  pathSegment: 'miscellaneous2',
                  label: 'Miscellaneous2',
                  viewUrl: '/sampleapp.html#/projects/' + e + '/miscellaneous2',
                  icon: 'sys-help'
                },
                {
                  pathSegment: 'misc2-isolated',
                  label: 'Miscellaneous2 (Isolated View)',
                  isolateView: !0,
                  viewUrl: '/sampleapp.html#/projects/' + e + '/miscellaneous2',
                  icon: 'sys-help-2'
                },
                {
                  pathSegment: 'dps',
                  label: 'Default Child node Example',
                  defaultChildNode: 'dps2',
                  icon: 'checklist',
                  children: [
                    {
                      pathSegment: 'dps1',
                      label: 'First Child',
                      viewUrl: '/sampleapp.html#/projects/' + e + '/dps/dps1',
                      icon: 'physical-activity'
                    },
                    {
                      pathSegment: 'dps2',
                      label: 'Second Child',
                      viewUrl: '/sampleapp.html#/projects/' + e + '/dps/dps2',
                      icon: 'physical-activity'
                    }
                  ]
                },
                {
                  link: '/settings',
                  label: 'Go to absolute path',
                  icon: 'switch-views'
                },
                {
                  link: 'dps/dps1',
                  label: 'Go to relative path',
                  icon: 'switch-views'
                },
                {
                  pathSegment: 'avengers',
                  label: 'Keep Selected Example',
                  viewUrl:
                    '/sampleapp.html#/projects/' + e + '/dynamic/avengers',
                  keepSelectedForChildren: !0,
                  icon: 'accept',
                  context: {
                    label: 'Avengers',
                    links: [
                      'Captain America',
                      'Iron Man',
                      'Thor',
                      'Hulk',
                      'Black Widow',
                      'Hawkeye',
                      'Loki'
                    ]
                  },
                  children: [
                    'Captain America',
                    'Iron Man',
                    'Thor',
                    'Hulk',
                    'Black Widow',
                    'Hawkeye',
                    'Loki'
                  ].map(function(t) {
                    return {
                      pathSegment: t
                        .toLowerCase()
                        .split(' ')
                        .join('-'),
                      label: t,
                      context: { label: t, links: ['Super Power'] },
                      viewUrl:
                        '/sampleapp.html#/projects/' +
                        e +
                        '/dynamic/' +
                        t
                          .toLowerCase()
                          .split(' ')
                          .join('-'),
                      children: [
                        {
                          label: 'Super Power',
                          pathSegment: 'super-power',
                          context: { label: 'Super Power', links: ['Details'] },
                          viewUrl:
                            '/sampleapp.html#/projects/' +
                            e +
                            '/dynamic/super-power',
                          children: [
                            {
                              label: 'Details',
                              pathSegment: 'details',
                              context: { label: 'Details', links: !1 },
                              viewUrl:
                                '/sampleapp.html#/projects/' +
                                e +
                                '/dynamic/details'
                            }
                          ]
                        }
                      ]
                    };
                  })
                },
                {
                  pathSegment: 'hideSideNav',
                  label: 'Hide left navigation',
                  viewUrl: '/sampleapp.html#/projects/' + e + '/hideSideNav',
                  hideSideNav: !0,
                  icon: 'full-screen'
                },
                {
                  label: 'Open Github in new tab',
                  category: {
                    label: 'Super useful Github links',
                    icon: '/assets/github-logo.png'
                  },
                  externalLink: { url: 'http://github.com', sameWindow: !1 },
                  icon: 'internet-browser'
                },
                {
                  label: 'Open Github in this tab',
                  category: 'Super useful Github links',
                  externalLink: { url: 'http://github.com', sameWindow: !0 },
                  icon: 'globe'
                }
              ];
            })(n);
          (function(e) {
            return new Promise(function(t) {
              t(
                'pr2' === e
                  ? [
                      {
                        category: 'External Views',
                        viewId: 'viewX',
                        label: 'This is X',
                        viewUrl: 'https://this.is.x/index.html'
                      },
                      {
                        category: 'External Views',
                        viewId: 'viewY',
                        label: 'This is Y',
                        viewUrl: 'https://this.is.y/index.html'
                      }
                    ]
                  : [
                      {
                        category: 'External Views',
                        viewId: 'abc',
                        label: 'A B C',
                        viewUrl: 'https://a.b.c/index.html'
                      },
                      {
                        category: 'External Views',
                        viewId: 'def',
                        label: 'D E F',
                        viewUrl: 'https://d.e.f/index.html',
                        context: { aaaaa: 'hiiiiii' }
                      }
                    ]
              );
            });
          })(n).then(function(e) {
            e.forEach(function(e) {
              i.push({
                category: e.category,
                pathSegment: e.viewId,
                label: e.label,
                viewUrl: e.viewUrl,
                context: e.context
              });
            }),
              t(i);
          });
        });
      },
      r = function(e) {
        return new Promise(function(e) {
          new Promise(function(e) {
            e([
              { id: 'pr1', name: 'Project One' },
              { id: 'pr2', name: 'Project Two' }
            ]);
          }).then(function(t) {
            var n = [];
            t.forEach(function(e) {
              n.push({
                navigationContext: 'project',
                pathSegment: e.id,
                label: e.name,
                viewUrl: '/sampleapp.html#/projects/' + e.id,
                context: { currentProject: e.id },
                icon: 'folder-blank',
                children: l
              });
            }),
              e(n);
          });
        });
      },
      a = function(e, t, n) {
        var i = ['admins'];
        return (
          !e.constraints ||
          0 !==
            e.constraints.filter(function(e) {
              return -1 !== i.indexOf(e);
            }).length
        );
      };
    function s(e) {
      return (
        (function(e) {
          if (Array.isArray(e)) {
            for (var t = 0, n = new Array(e.length); t < e.length; t++)
              n[t] = e[t];
            return n;
          }
        })(e) ||
        (function(e) {
          if (
            Symbol.iterator in Object(e) ||
            '[object Arguments]' === Object.prototype.toString.call(e)
          )
            return Array.from(e);
        })(e) ||
        (function() {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance'
          );
        })()
      );
    }
    function c(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = n),
        e
      );
    }
    var u = new function e(t, n) {
      !(function(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      })(this, e),
        c(this, 'nodeAccessibilityResolver', a),
        c(this, 'nodes', [
          {
            pathSegment: 'overview',
            label: 'Overview',
            viewUrl: '/sampleapp.html#/overview',
            hideSideNav: !0
          },
          {
            pathSegment: 'projects',
            label: 'Projects',
            viewUrl: '/sampleapp.html#/projects/overview',
            children: r
          },
          {
            hideFromNav: !0,
            pathSegment: 'create-environment',
            viewUrl: '/sampleapp.html#/create/environment',
            context: { label: 'Create Environment' }
          },
          {
            hideFromNav: !0,
            pathSegment: 'environments',
            viewUrl: '/sampleapp.html#/environments',
            children: [
              {
                pathSegment: ':environmentId',
                viewUrl: '/sampleapp.html#/environments/:environmentId'
              }
            ]
          },
          {
            pathSegment: 'forbidden-sample',
            label: 'Forbidden',
            viewUrl: '/sampleapp.html#/restricted',
            constraints: ['unicorns']
          },
          {
            pathSegment: 'settings',
            label: 'Settings',
            viewUrl: '/sampleapp.html#/settings',
            icon: 'settings'
          },
          {
            label: 'Open Google in this tab',
            externalLink: { url: 'http://google.com', sameWindow: !0 }
          },
          {
            pathSegment: 'ext',
            label: 'External Page',
            loadingIndicator: { hideAutomatically: !1 },
            viewUrl: '/assets/sampleexternal.html#ext',
            children: [
              {
                pathSegment: 'one',
                label: 'One',
                loadingIndicator: { hideAutomatically: !1 },
                icon: 'drill-up',
                viewUrl: '/assets/sampleexternal.html#one'
              },
              {
                pathSegment: 'two',
                label: 'Two',
                loadingIndicator: { hideAutomatically: !1 },
                icon: 'drill-down',
                viewUrl: '/assets/sampleexternal.html#two'
              }
            ]
          }
        ]),
        c(this, 'contextSwitcher', {
          defaultLabel: 'Select Environment ...',
          parentNodePath: '/environments',
          lazyloadOptions: !0,
          options: function() {
            return s(Array(10).keys())
              .filter(function(e) {
                return 0 !== e;
              })
              .map(function(e) {
                return { label: 'Environment ' + e, pathValue: 'env' + e };
              });
          },
          actions: [
            { label: '+ New Environment (top)', link: '/create-environment' },
            {
              label: '+ New Environment (bottom)',
              link: '/create-environment',
              position: 'bottom',
              clickHandler: function(e) {
                return !0;
              }
            }
          ],
          fallbackLabelResolver: function(e) {
            return e.replace(/\b\w/g, function(e) {
              return e.toUpperCase();
            });
          }
        }),
        (this.navigationPermissionChecker = t),
        (this.projectsNavProviderFn = n);
    }(a, r);
    function p(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = n),
        e
      );
    }
    var m = new function e() {
      !(function(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      })(this, e),
        p(this, 'useHashRouting', !1),
        p(this, 'nodeParamPrefix', '~'),
        p(this, 'skipRoutingForUrlPatterns', [/access_token=/, /id_token=/]);
    }();
    var g = new function e() {
      !(function(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      })(this, e),
        (function(e, t, n) {
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = n);
        })(this, 'header', {
          logo:
            'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MTIuMzggMjA0Ij48ZGVmcz48c3R5bGU+LmNscy0xLC5jbHMtMntmaWxsLXJ1bGU6ZXZlbm9kZH0uY2xzLTF7ZmlsbDp1cmwoI2xpbmVhci1ncmFkaWVudCl9LmNscy0ye2ZpbGw6I2ZmZn08L3N0eWxlPjxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50IiB4MT0iMjA2LjE5IiB4Mj0iMjA2LjE5IiB5Mj0iMjA0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDBiOGYxIi8+PHN0b3Agb2Zmc2V0PSIuMDIiIHN0b3AtY29sb3I9IiMwMWI2ZjAiLz48c3RvcCBvZmZzZXQ9Ii4zMSIgc3RvcC1jb2xvcj0iIzBkOTBkOSIvPjxzdG9wIG9mZnNldD0iLjU4IiBzdG9wLWNvbG9yPSIjMTc3NWM4Ii8+PHN0b3Agb2Zmc2V0PSIuODIiIHN0b3AtY29sb3I9IiMxYzY1YmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxZTVmYmIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48dGl0bGU+U0FQX2dyYWRfUl9zY3JuX1plaWNoZW5mbMOkY2hlIDE8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTAgMjA0aDIwOC40MUw0MTIuMzggMEgwdjIwNCIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTI0NC43MyAzOC4zNmgtNDAuNnY5Ni41MmwtMzUuNDYtOTYuNTVoLTM1LjE2bC0zMC4yNyA4MC43MkMxMDAgOTguNyA3OSA5MS42NyA2Mi40IDg2LjQgNTEuNDYgODIuODkgMzkuODUgNzcuNzIgNDAgNzJjLjA5LTQuNjggNi4yMy05IDE4LjM4LTguMzggOC4xNy40MyAxNS4zNyAxLjA5IDI5LjcxIDhsMTQuMS0yNC41NUM4OS4wNiA0MC40MiA3MSAzNi4yMSA1Ni4xNyAzNi4xOWgtLjA5Yy0xNy4yOCAwLTMxLjY4IDUuNi00MC42IDE0LjgzQTM0LjIzIDM0LjIzIDAgMCAwIDUuNzcgNzQuN0M1LjU0IDg3LjE1IDEwLjExIDk2IDE5LjcxIDEwM2M4LjEgNS45NCAxOC40NiA5Ljc5IDI3LjYgMTIuNjIgMTEuMjcgMy40OSAyMC40NyA2LjUzIDIwLjM2IDEzQTkuNTcgOS41NyAwIDAgMSA2NSAxMzVjLTIuODEgMi45LTcuMTMgNC0xMy4wOSA0LjEtMTEuNDkuMjQtMjAtMS41Ni0zMy42MS05LjU5TDUuNzcgMTU0LjQyYTkzLjc3IDkzLjc3IDAgMCAwIDQ2IDEyLjIyaDIuMTFjMTQuMjQtLjI1IDI1Ljc0LTQuMzEgMzQuOTItMTEuNzEuNTMtLjQxIDEtLjg0IDEuNDktMS4yOGwtNC4xMiAxMC44NUgxMjNsNi4xOS0xOC44MmE2Ny40NiA2Ny40NiAwIDAgMCAyMS42OCAzLjQzIDY4LjMzIDY4LjMzIDAgMCAwIDIxLjE2LTMuMjVsNiAxOC42NGg2MC4xNHYtMzloMTMuMTFjMzEuNzEgMCA1MC40Ni0xNi4xNSA1MC40Ni00My4yIDAtMzAuMTEtMTguMjItNDMuOTQtNTcuMDEtNDMuOTR6TTE1MC45MSAxMjFhMzYuOTMgMzYuOTMgMCAwIDEtMTMtMi4yOGwxMi44Ny00MC41OWguMjJsMTIuNjUgNDAuNzFhMzguNSAzOC41IDAgMCAxLTEyLjc0IDIuMTZ6bTk2LjItMjMuMzNoLTguOTRWNjQuOTFoOC45NGMxMS45MyAwIDIxLjQ0IDQgMjEuNDQgMTYuMTQgMCAxMi42LTkuNTEgMTYuNTctMjEuNDQgMTYuNTciLz48L3N2Zz4=',
          title: 'Luigi Demo',
          favicon: '/assets/favicon-sap.ico'
        });
    }();
    Luigi.setConfig({ auth: o, navigation: u, routing: m, settings: g });
  }
]);
