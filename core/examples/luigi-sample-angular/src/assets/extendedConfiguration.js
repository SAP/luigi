var navigationPermissionChecker = function(
  nodeToCheckPermissionFor,
  parentNode,
  currentContext
) {
  // depending on the current path and context returns true or false
  // true means the current node is accessible, false the opposite
  var mockCurrentUserGroups = ['admins'];
  if (nodeToCheckPermissionFor.constraints) {
    // check if user has required groups
    return (
      nodeToCheckPermissionFor.constraints.filter(function(c) {
        return mockCurrentUserGroups.indexOf(c) !== -1;
      }).length !== 0
    );
  }

  return true;
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

var getAllProjects = function() {
  return new Promise(function(resolve) {
    resolve([
      {
        id: 'pr1',
        name: 'Project One'
      },
      {
        id: 'pr2',
        name: 'Project Two'
      }
    ]);
  });
};

var getProjectPlugins = function(projectId) {
  return new Promise(function(resolve) {
    if (projectId === 'pr2') {
      resolve([
        {
          category: 'ExternalViews',
          viewId: 'viewX',
          label: 'This is X',
          viewUrl: 'https://this.is.x/index.html'
        },
        {
          category: 'ExternalViews',
          viewId: 'viewY',
          label: 'This is Y',
          viewUrl: 'https://this.is.y/index.html'
        }
      ]);
    } else {
      resolve([
        {
          category: 'ExternalViews',
          viewId: 'abc',
          label: 'A B C',
          viewUrl: 'https://a.b.c/index.html'
        },
        {
          category: 'ExternalViews',
          viewId: 'def',
          label: 'D E F',
          viewUrl: 'https://d.e.f/index.html',
          context: {
            aaaaa: 'hiiiiii'
          }
        }
      ]);
    }
  });
};

var projectDetailNavProviderFn = function(context) {
  return new Promise(function(resolve) {
    var projectId = context.currentProject;
    var children = [
      {
        category: 'Usermanagement',
        pathSegment: 'users',
        label: 'Users and Groups',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/users',
        children: [
          {
            category: 'Groups',
            pathSegment: 'groups',
            label: 'Groups',
            viewUrl: '/sampleapp.html#/projects/' + projectId + '/users/groups',
            children: [
              {
                pathSegment: ':group',
                viewUrl:
                  '/sampleapp.html#/projects/' +
                  projectId +
                  '/users/groups/:group',
                context: {
                  currentGroup: ':group'
                },
                children: [
                  {
                    label: 'Group Settings',
                    pathSegment: 'settings',
                    viewUrl:
                      '/sampleapp.html#/projects/' +
                      projectId +
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
              '/sampleapp.html#/projects/' + projectId + '/users/usersoverview'
          }
        ]
      },
      {
        category: 'Usermanagement',
        pathSegment: 'developers',
        label: 'Developers',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/developers'
      },
      {
        category: 'Settings',
        pathSegment: 'settings',
        label: 'Project Settings',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/settings'
      },
      {
        pathSegment: 'miscellaneous',
        constraints: ['unicorns'],
        label: 'Miscellaneous',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/miscellaneous'
      },
      {
        pathSegment: 'miscellaneous2',
        label: 'Miscellaneous2',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/miscellaneous2'
      },
      {
        pathSegment: 'misc2-isolated',
        label: 'Miscellaneous2 (Isolated View)',
        isolateView: true,
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/miscellaneous2'
      },
      {
        pathSegment: 'dps',
        label: 'Default Child node Example',
        defaultChildNode: 'dps2',
        children: [
          {
            pathSegment: 'dps1',
            label: 'First Child',
            viewUrl: '/sampleapp.html#/projects/' + projectId + '/dps/dps1'
          },
          {
            pathSegment: 'dps2',
            label: 'Second Child',
            viewUrl: '/sampleapp.html#/projects/' + projectId + '/dps/dps2'
          }
        ]
      },
      {
        pathSegment: 'avengers',
        label: 'Keep Selected Example',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/dynamic/avengers',
        keepSelectedForChildren: true,
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
        ].map(name => ({
          pathSegment: name
            .toLowerCase()
            .split(' ')
            .join('-'),
          label: name,
          context: {
            label: name,
            links: ['Super Power']
          },
          viewUrl:
            '/sampleapp.html#/projects/' +
            projectId +
            '/dynamic/' +
            name
              .toLowerCase()
              .split(' ')
              .join('-'),
          children: [
            {
              label: 'Super Power',
              pathSegment: 'super-power',
              context: {
                label: 'Super Power',
                links: ['Details']
              },
              viewUrl:
                '/sampleapp.html#/projects/' +
                projectId +
                '/dynamic/super-power',
              children: [
                {
                  label: 'Details',
                  pathSegment: 'details',
                  context: {
                    label: 'Details',
                    links: false
                  },
                  viewUrl:
                    '/sampleapp.html#/projects/' +
                    projectId +
                    '/dynamic/details'
                }
              ]
            }
          ]
        }))
      },
      {
        label: 'Open Github in new tab',
        category: 'Super useful Github links',
        externalLink: {
          url: 'http://github.com',
          sameWindow: false
        }
      },
      {
        label: 'Open Github in this tab',
        category: 'Super useful Github links',
        externalLink: {
          url: 'http://github.com',
          sameWindow: true
        }
      }
    ];
    getProjectPlugins(projectId).then(function(result) {
      result.forEach(function(plugin) {
        children.push({
          category: plugin.category,
          pathSegment: plugin.viewId,
          label: plugin.label,
          viewUrl: plugin.viewUrl,
          context: plugin.context
        });
      });
      resolve(children);
    });
  });
};

var projectsNavProviderFn = function(context) {
  return new Promise(function(resolve) {
    getAllProjects().then(function(result) {
      var children = [];
      result.forEach(function(project) {
        children.push({
          /**
           * navigationContext:
           * Use it for dynamic nodes in order to navigate
           * within a specific context (project in this case)
           * Besides navigate and navigateRelative,
           * LuigiClient provides fromClosestContext().navigate(path)
           * and fromContext(navigationContext).navigate(path) functions
           * which can be used to go upwards multiple context levels
           * eg. /home/:environment/projects/:project/ to go to /home/:environment/settings
           */
          navigationContext: 'project',
          pathSegment: project.id,
          label: project.name,
          viewUrl: '/sampleapp.html#/projects/' + project.id,
          context: {
            currentProject: project.id
          },
          children: projectDetailNavProviderFn
        });
      });
      resolve(children);
    });
  });
};

Luigi.setConfig({
  /**
   * auth identity provider settings
   *
   * use: enum of already implemented providers:
   *  - openIdConnect (eg. DEX)
   *  - oAuth2ImplicitGrant
   * custom:
   *  - customIdpProvider (if you provide a class to Luigi.config.auth.customIdpProvider)
   *
   */
  auth: {
    use: 'mockAuth',
    disableAutoLogin: false,
    mockAuth: {
      authorizeUrl: `${
        window.location.origin
      }/assets/auth-mock/login-mock.html`,
      logoutUrl: `${window.location.origin}/assets/auth-mock/logout-mock.html`,
      post_logout_redirect_uri: '/logout.html',
      authorizeMethod: 'GET',
      oAuthData: {
        client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp'
      }
    },
    openIdConnect: {
      authority: 'https://example-authority.com',
      client_id: 'client',
      scope: 'audience:server:client_id:client openid profile email groups',
      logoutUrl: 'https://example-url.com/logout'
      // optional parameters
      // redirect_uri: '',
      // post_logout_redirect_uri: '/logout.html',
      // automaticSilentRenew: true,
      // loadUserInfo: false // returned metadata must contain userinfo_endpoint
    },
    oAuth2ImplicitGrant: {
      authorizeUrl: 'https://example-url.com/authorize',
      logoutUrl: 'https://example-url.com/logout',
      post_logout_redirect_uri: '/logout.html',
      authorizeMethod: 'GET',
      oAuthData: {
        client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp'

        // optional: redirect_uri and response_type are provided by default
        // scope: '',
        // redirect_uri: '/luigi-core/auth/oauth2/callback.html'
        // response_type: 'id_token token',

        // all specified values inside oAuthData will be added to the oauth call, i.e display="popup",
      }
      // optional , will be provided by default
      // nonceFn: () => {
      //   console.log('custom nonce function called');
      //   return 1;
      // },
      // logoutFn: (settings, authData, logoutCallback) => {
      //   console.log('logoutFn called');
      //   // auth example
      //   var logoutreq = `${settings.logoutUrl}?id_token_hint=${
      //     authData.idToken
      //     }&client_id=${settings.oauthData.client_id}&post_logout_redirect_uri=${
      //     window.location.origin
      //     }/auth/logout.html`;
      //   var request = new XMLHttpRequest();
      //   request.open('GET', logoutreq);
      //   request.addEventListener('load', function (event) {
      //     if (request.status >= 200 && request.status < 300) {
      //       console.log(request.responseText);
      //       logoutCallback();
      //     } else {
      //       console.warn(request.statusText, request.responseText);
      //       logoutCallback();
      //     }
      //   });
      //   request.send();
      // }
      // TODO: logout parameters (GET/POST?)
    },

    events: {
      onLogout: function() {
        console.log('onLogout');
      },
      onAuthSuccessful: function(data) {
        console.log('onAuthSuccessful', data);
      },
      onAuthExpired: function() {
        console.log('onAuthExpired');
      },
      // TODO: define luigi-client api for getting errors
      onAuthError: function(err) {
        console.log('authErrorHandler 1', err);
      }
    }
  },
  navigation: {
    nodeAccessibilityResolver: navigationPermissionChecker,
    nodes: function() {
      return [
        {
          pathSegment: 'overview',
          label: 'Overview',
          viewUrl: '/sampleapp.html#/overview'
        },
        {
          pathSegment: 'projects',
          label: 'Projects',
          viewUrl: '/sampleapp.html#/projects/overview',
          children: projectsNavProviderFn
        },
        {
          hideFromNav: true,
          pathSegment: 'hidden-sample',
          label: 'Hidden',
          viewUrl: '/sampleapp.html#/projects/overview'
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
          externalLink: {
            url: 'http://google.com',
            sameWindow: true
          }
        },
        {
          pathSegment: 'ext',
          label: 'External Page',
          loadingIndicator: {
            hideAutomatically: false
          },
          viewUrl: '/assets/sampleexternal.html#ext',
          children: [
            {
              pathSegment: 'one',
              label: 'One',
              loadingIndicator: {
                hideAutomatically: false
              },
              viewUrl: '/assets/sampleexternal.html#one'
            },
            {
              pathSegment: 'two',
              label: 'Two',
              loadingIndicator: {
                hideAutomatically: false
              },
              viewUrl: '/assets/sampleexternal.html#two'
            }
          ]
        }
      ];
    }
  },

  routing: {
    /**
     * Development:
     * For hash routing, set to true and run `npm run start`
     * For path routing, set to false and run `npm run startWebpack`
     */
    useHashRouting: true
  },
  settings: {
    header: () => ({
      logo:
        'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MTIuMzggMjA0Ij48ZGVmcz48c3R5bGU+LmNscy0xLC5jbHMtMntmaWxsLXJ1bGU6ZXZlbm9kZH0uY2xzLTF7ZmlsbDp1cmwoI2xpbmVhci1ncmFkaWVudCl9LmNscy0ye2ZpbGw6I2ZmZn08L3N0eWxlPjxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50IiB4MT0iMjA2LjE5IiB4Mj0iMjA2LjE5IiB5Mj0iMjA0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDBiOGYxIi8+PHN0b3Agb2Zmc2V0PSIuMDIiIHN0b3AtY29sb3I9IiMwMWI2ZjAiLz48c3RvcCBvZmZzZXQ9Ii4zMSIgc3RvcC1jb2xvcj0iIzBkOTBkOSIvPjxzdG9wIG9mZnNldD0iLjU4IiBzdG9wLWNvbG9yPSIjMTc3NWM4Ii8+PHN0b3Agb2Zmc2V0PSIuODIiIHN0b3AtY29sb3I9IiMxYzY1YmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxZTVmYmIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48dGl0bGU+U0FQX2dyYWRfUl9zY3JuX1plaWNoZW5mbMOkY2hlIDE8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTAgMjA0aDIwOC40MUw0MTIuMzggMEgwdjIwNCIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTI0NC43MyAzOC4zNmgtNDAuNnY5Ni41MmwtMzUuNDYtOTYuNTVoLTM1LjE2bC0zMC4yNyA4MC43MkMxMDAgOTguNyA3OSA5MS42NyA2Mi40IDg2LjQgNTEuNDYgODIuODkgMzkuODUgNzcuNzIgNDAgNzJjLjA5LTQuNjggNi4yMy05IDE4LjM4LTguMzggOC4xNy40MyAxNS4zNyAxLjA5IDI5LjcxIDhsMTQuMS0yNC41NUM4OS4wNiA0MC40MiA3MSAzNi4yMSA1Ni4xNyAzNi4xOWgtLjA5Yy0xNy4yOCAwLTMxLjY4IDUuNi00MC42IDE0LjgzQTM0LjIzIDM0LjIzIDAgMCAwIDUuNzcgNzQuN0M1LjU0IDg3LjE1IDEwLjExIDk2IDE5LjcxIDEwM2M4LjEgNS45NCAxOC40NiA5Ljc5IDI3LjYgMTIuNjIgMTEuMjcgMy40OSAyMC40NyA2LjUzIDIwLjM2IDEzQTkuNTcgOS41NyAwIDAgMSA2NSAxMzVjLTIuODEgMi45LTcuMTMgNC0xMy4wOSA0LjEtMTEuNDkuMjQtMjAtMS41Ni0zMy42MS05LjU5TDUuNzcgMTU0LjQyYTkzLjc3IDkzLjc3IDAgMCAwIDQ2IDEyLjIyaDIuMTFjMTQuMjQtLjI1IDI1Ljc0LTQuMzEgMzQuOTItMTEuNzEuNTMtLjQxIDEtLjg0IDEuNDktMS4yOGwtNC4xMiAxMC44NUgxMjNsNi4xOS0xOC44MmE2Ny40NiA2Ny40NiAwIDAgMCAyMS42OCAzLjQzIDY4LjMzIDY4LjMzIDAgMCAwIDIxLjE2LTMuMjVsNiAxOC42NGg2MC4xNHYtMzloMTMuMTFjMzEuNzEgMCA1MC40Ni0xNi4xNSA1MC40Ni00My4yIDAtMzAuMTEtMTguMjItNDMuOTQtNTcuMDEtNDMuOTR6TTE1MC45MSAxMjFhMzYuOTMgMzYuOTMgMCAwIDEtMTMtMi4yOGwxMi44Ny00MC41OWguMjJsMTIuNjUgNDAuNzFhMzguNSAzOC41IDAgMCAxLTEyLjc0IDIuMTZ6bTk2LjItMjMuMzNoLTguOTRWNjQuOTFoOC45NGMxMS45MyAwIDIxLjQ0IDQgMjEuNDQgMTYuMTQgMCAxMi42LTkuNTEgMTYuNTctMjEuNDQgMTYuNTciLz48L3N2Zz4=',
      title: 'Luigi Demo',
      favicon: '/assets/favicon.ico'
      // favicon: 'data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAC/v78AWFhYAElJSQA6OjoAKysrABwcHAC9vb0AVlZWACkpKQCBgYEAGhoaAAsLCwCsrKwARUVFADY2NgD19fUAJycnAH9/fwAYGBgAcHBwAAkJCQBhYWEAubm5AFJSUgDz8/MANDQ0ACUlJQB9fX0AFhYWAG5ubgAHBwcAX19fALe3twBQUFAAQUFBACMjIwAUFBQAXV1dAE5OTgCmpqYAPz8/AP7+/gAwMDAAISEhABISEgBqamoAW1tbAExMTAA9PT0ALi4uAB8fHwDe3t4Ad3d'
    })
    // hideNavigation: true
    // backdropDisabled: true
  }
});
