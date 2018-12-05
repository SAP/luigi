!(function(e) {
  var t = {};
  function l(i) {
    if (t[i]) return t[i].exports;
    var n = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(n.exports, n, n.exports, l), (n.l = !0), n.exports;
  }
  (l.m = e),
    (l.c = t),
    (l.d = function(e, t, i) {
      l.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (l.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (l.t = function(e, t) {
      if ((1 & t && (e = l(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (l.r(i),
        Object.defineProperty(i, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var n in e)
          l.d(
            i,
            n,
            function(t) {
              return e[t];
            }.bind(null, n)
          );
      return i;
    }),
    (l.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return l.d(t, 'a', t), t;
    }),
    (l.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (l.p = ''),
    l((l.s = 0));
})([
  function(e, t, l) {
    'use strict';
    l.r(t);
    var i = function(e) {
        return new Promise(function(t) {
          var l = e.currentProject,
            i = [
              {
                category: {
                  label: 'User Management',
                  icon: 'person-placeholder'
                },
                pathSegment: 'users',
                label: 'Users and Groups',
                viewUrl: '/sampleapp.html#/projects/' + l + '/users',
                children: [
                  {
                    category: { label: 'Groups', icon: 'group' },
                    pathSegment: 'groups',
                    label: 'Groups',
                    viewUrl: '/sampleapp.html#/projects/' + l + '/users/groups',
                    children: [
                      {
                        pathSegment: ':group',
                        viewUrl:
                          '/sampleapp.html#/projects/' +
                          l +
                          '/users/groups/:group',
                        context: { currentGroup: ':group' },
                        children: [
                          {
                            label: 'Group Settings',
                            pathSegment: 'settings',
                            viewUrl:
                              '/sampleapp.html#/projects/' +
                              l +
                              '/users/groups/:group/settings'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    pathSegment: 'usersoverview',
                    label: 'Users Overview',
                    viewUrl:
                      '/sampleapp.html#/projects/' + l + '/users/usersoverview'
                  }
                ]
              },
              {
                category: 'User Management',
                pathSegment: 'developers',
                label: 'Developers',
                viewUrl: '/sampleapp.html#/projects/' + l + '/developers'
              },
              {
                category: { label: 'Settings', icon: 'action-settings' },
                pathSegment: 'settings',
                label: 'Project Settings',
                viewUrl: '/sampleapp.html#/projects/' + l + '/settings'
              },
              {
                pathSegment: 'miscellaneous',
                constraints: ['unicorns'],
                label: 'Miscellaneous',
                viewUrl: '/sampleapp.html#/projects/' + l + '/miscellaneous'
              },
              {
                pathSegment: 'miscellaneous2',
                label: 'Miscellaneous2',
                viewUrl: '/sampleapp.html#/projects/' + l + '/miscellaneous2'
              },
              {
                pathSegment: 'misc2-isolated',
                label: 'Miscellaneous2 (Isolated View)',
                isolateView: !0,
                viewUrl: '/sampleapp.html#/projects/' + l + '/miscellaneous2'
              },
              {
                pathSegment: 'dps',
                label: 'Default Child node Example',
                defaultChildNode: 'dps2',
                children: [
                  {
                    pathSegment: 'dps1',
                    label: 'First Child',
                    viewUrl: '/sampleapp.html#/projects/' + l + '/dps/dps1'
                  },
                  {
                    pathSegment: 'dps2',
                    label: 'Second Child',
                    viewUrl: '/sampleapp.html#/projects/' + l + '/dps/dps2'
                  }
                ]
              },
              { link: '/settings', label: 'Go to absolute path' },
              { link: 'dps/dps1', label: 'Go to relative path' },
              {
                pathSegment: 'avengers',
                label: 'Keep Selected Example',
                viewUrl: '/sampleapp.html#/projects/' + l + '/dynamic/avengers',
                keepSelectedForChildren: !0,
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
                ].map(e => ({
                  pathSegment: e
                    .toLowerCase()
                    .split(' ')
                    .join('-'),
                  label: e,
                  context: { label: e, links: ['Super Power'] },
                  viewUrl:
                    '/sampleapp.html#/projects/' +
                    l +
                    '/dynamic/' +
                    e
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
                        l +
                        '/dynamic/super-power',
                      children: [
                        {
                          label: 'Details',
                          pathSegment: 'details',
                          context: { label: 'Details', links: !1 },
                          viewUrl:
                            '/sampleapp.html#/projects/' +
                            l +
                            '/dynamic/details'
                        }
                      ]
                    }
                  ]
                }))
              },
              {
                pathSegment: 'hideSideNav',
                label: 'Hide left navigation',
                viewUrl: '/sampleapp.html#/projects/' + l + '/hideSideNav',
                hideSideNav: !0
              },
              {
                label: 'Open Github in new tab',
                category: { label: 'Super useful Github links', icon: 'world' },
                externalLink: { url: 'http://github.com', sameWindow: !1 }
              },
              {
                label: 'Open Github in this tab',
                category: 'Super useful Github links',
                externalLink: { url: 'http://github.com', sameWindow: !0 }
              }
            ];
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
          })(l).then(function(e) {
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
      n = function(e) {
        return new Promise(function(e) {
          new Promise(function(e) {
            e([
              { id: 'pr1', name: 'Project One' },
              { id: 'pr2', name: 'Project Two' }
            ]);
          }).then(function(t) {
            var l = [];
            t.forEach(function(e) {
              l.push({
                navigationContext: 'project',
                pathSegment: e.id,
                label: e.name,
                viewUrl: '/sampleapp.html#/projects/' + e.id,
                context: { currentProject: e.id },
                children: i
              });
            }),
              e(l);
          });
        });
      };
    Luigi.setConfig({
      auth: {
        use: 'mockAuth',
        disableAutoLogin: !1,
        mockAuth: {
          authorizeUrl: `${
            window.location.origin
          }/assets/auth-mock/login-mock.html`,
          logoutUrl: `${
            window.location.origin
          }/assets/auth-mock/logout-mock.html`,
          post_logout_redirect_uri: '/logout.html',
          authorizeMethod: 'GET',
          oAuthData: { client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp' }
        },
        openIdConnect: {
          authority: 'https://example-authority.com',
          client_id: 'client',
          scope: 'openid profile email',
          logoutUrl: 'https://example-url.com/logout'
        },
        oAuth2ImplicitGrant: {
          authorizeUrl: 'https://example-url.com/authorize',
          logoutUrl: 'https://example-url.com/logout',
          post_logout_redirect_uri: '/logout.html',
          authorizeMethod: 'GET',
          oAuthData: {
            client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp',
            redirect_uri: '/luigi-core/auth/oauth2/callback.html',
            scope: 'openid profile email groups'
          }
        },
        events: {
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
        }
      },
      navigation: {
        nodeAccessibilityResolver: function(e, t, l) {
          var i = ['admins'];
          return (
            !e.constraints ||
            0 !==
              e.constraints.filter(function(e) {
                return -1 !== i.indexOf(e);
              }).length
          );
        },
        nodes: function() {
          return [
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
              children: n
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
              viewUrl: '/sampleapp.html#/settings'
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
                  viewUrl: '/assets/sampleexternal.html#one'
                },
                {
                  pathSegment: 'two',
                  label: 'Two',
                  loadingIndicator: { hideAutomatically: !1 },
                  viewUrl: '/assets/sampleexternal.html#two'
                }
              ]
            }
          ];
        },
        contextSwitcher: {
          defaultLabel: 'Select Environment ...',
          parentNodePath: '/environments',
          lazyloadOptions: !0,
          options: () =>
            [...Array(10).keys()]
              .filter(e => 0 !== e)
              .map(e => ({ label: 'Environment ' + e, pathValue: 'env' + e })),
          actions: [
            { label: '+ New Environment (top)', link: '/create-environment' },
            {
              label: '+ New Environment (bottom)',
              link: '/create-environment',
              position: 'bottom',
              clickHandler: e => !0
            }
          ],
          fallbackLabelResolver: e => e.replace(/\b\w/g, e => e.toUpperCase())
        }
      },
      routing: {
        useHashRouting: !0,
        nodeParamPrefix: '~',
        skipRoutingForUrlPatterns: [/access_token=/, /id_token=/]
      },
      settings: {
        header: () => ({
          logo:
            'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MTIuMzggMjA0Ij48ZGVmcz48c3R5bGU+LmNscy0xLC5jbHMtMntmaWxsLXJ1bGU6ZXZlbm9kZH0uY2xzLTF7ZmlsbDp1cmwoI2xpbmVhci1ncmFkaWVudCl9LmNscy0ye2ZpbGw6I2ZmZn08L3N0eWxlPjxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50IiB4MT0iMjA2LjE5IiB4Mj0iMjA2LjE5IiB5Mj0iMjA0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDBiOGYxIi8+PHN0b3Agb2Zmc2V0PSIuMDIiIHN0b3AtY29sb3I9IiMwMWI2ZjAiLz48c3RvcCBvZmZzZXQ9Ii4zMSIgc3RvcC1jb2xvcj0iIzBkOTBkOSIvPjxzdG9wIG9mZnNldD0iLjU4IiBzdG9wLWNvbG9yPSIjMTc3NWM4Ii8+PHN0b3Agb2Zmc2V0PSIuODIiIHN0b3AtY29sb3I9IiMxYzY1YmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxZTVmYmIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48dGl0bGU+U0FQX2dyYWRfUl9zY3JuX1plaWNoZW5mbMOkY2hlIDE8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTAgMjA0aDIwOC40MUw0MTIuMzggMEgwdjIwNCIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTI0NC43MyAzOC4zNmgtNDAuNnY5Ni41MmwtMzUuNDYtOTYuNTVoLTM1LjE2bC0zMC4yNyA4MC43MkMxMDAgOTguNyA3OSA5MS42NyA2Mi40IDg2LjQgNTEuNDYgODIuODkgMzkuODUgNzcuNzIgNDAgNzJjLjA5LTQuNjggNi4yMy05IDE4LjM4LTguMzggOC4xNy40MyAxNS4zNyAxLjA5IDI5LjcxIDhsMTQuMS0yNC41NUM4OS4wNiA0MC40MiA3MSAzNi4yMSA1Ni4xNyAzNi4xOWgtLjA5Yy0xNy4yOCAwLTMxLjY4IDUuNi00MC42IDE0LjgzQTM0LjIzIDM0LjIzIDAgMCAwIDUuNzcgNzQuN0M1LjU0IDg3LjE1IDEwLjExIDk2IDE5LjcxIDEwM2M4LjEgNS45NCAxOC40NiA5Ljc5IDI3LjYgMTIuNjIgMTEuMjcgMy40OSAyMC40NyA2LjUzIDIwLjM2IDEzQTkuNTcgOS41NyAwIDAgMSA2NSAxMzVjLTIuODEgMi45LTcuMTMgNC0xMy4wOSA0LjEtMTEuNDkuMjQtMjAtMS41Ni0zMy42MS05LjU5TDUuNzcgMTU0LjQyYTkzLjc3IDkzLjc3IDAgMCAwIDQ2IDEyLjIyaDIuMTFjMTQuMjQtLjI1IDI1Ljc0LTQuMzEgMzQuOTItMTEuNzEuNTMtLjQxIDEtLjg0IDEuNDktMS4yOGwtNC4xMiAxMC44NUgxMjNsNi4xOS0xOC44MmE2Ny40NiA2Ny40NiAwIDAgMCAyMS42OCAzLjQzIDY4LjMzIDY4LjMzIDAgMCAwIDIxLjE2LTMuMjVsNiAxOC42NGg2MC4xNHYtMzloMTMuMTFjMzEuNzEgMCA1MC40Ni0xNi4xNSA1MC40Ni00My4yIDAtMzAuMTEtMTguMjItNDMuOTQtNTcuMDEtNDMuOTR6TTE1MC45MSAxMjFhMzYuOTMgMzYuOTMgMCAwIDEtMTMtMi4yOGwxMi44Ny00MC41OWguMjJsMTIuNjUgNDAuNzFhMzguNSAzOC41IDAgMCAxLTEyLjc0IDIuMTZ6bTk2LjItMjMuMzNoLTguOTRWNjQuOTFoOC45NGMxMS45MyAwIDIxLjQ0IDQgMjEuNDQgMTYuMTQgMCAxMi42LTkuNTEgMTYuNTctMjEuNDQgMTYuNTciLz48L3N2Zz4=',
          title: 'Luigi Demo',
          favicon: '/assets/favicon-sap.ico'
        })
      }
    });
  }
]);
