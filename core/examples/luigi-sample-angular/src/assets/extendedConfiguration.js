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
          pathSegment: 'create-environment',
          viewUrl: '/sampleapp.html#/create/environment',
          context: {
            label: 'Create Environment'
          }
        },
        {
          hideFromNav: true,
          pathSegment: 'environments',
          children: [
            {
              pathSegment: ':environmentId',
              viewUrl: '/sampleapp.html#/environments/:environmentId',
              context: {
                label: ':environmentId',
                links: ['Overview']
              },
              children: ['Overview'].map(name => ({
                pathSegment: name
                  .toLowerCase()
                  .split(' ')
                  .join('-'),
                label: name,
                context: {
                  label: name
                },
                viewUrl:
                  '/sampleapp.html#/environments/:environmentId/' +
                  name
                    .toLowerCase()
                    .split(' ')
                    .join('-')
              }))
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
    },
    // The following configuration will be used to render the context switcher component
    contextSwitcher: {
      defaultLabel: 'Select Environment ...',
      parentNodePath: '/environments', // absolute path
      lazyloadOptions: true, // load options on click instead on page load
      options: () => {
        return [...Array(10).keys()].filter(n => n !== 0).map(n => ({
          label: 'Environment ' + n, // (i.e mapping between what the user sees and what is taken to replace the dynamic part for the dynamic node)
          pathValue: 'env' + n // will be used to replace dynamic part
        }));
      },
      actions: [
        {
          label: '+ New Simple',
          link: '/create-environment'
        },
        {
          label: '+ New Environment',
          link: '/create-environment',
          position: 'bottom', // top or bottom
          clickHandler: node => {
            // called BEFORE route change
            return true; // route change will be done using link value (if defined)
            // return false // route change will not be done even if link attribute is defined
          }
        }
      ],

      /**
       * fallbackLabelResolver
       * Resolve what do display in the context switcher (Label) in case the activated
       * context (option) is not listed in available options (eg kyma-system namespace),
       * or if options have not been fetched yet
       */
      fallbackLabelResolver: id => {
        return id.replace(/\b\w/g, l => l.toUpperCase());
      }
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
      favicon: '/assets/favicon-sap.ico'
      // favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0QjU1QkE5OENDODQxMUU4QURDRUZCOEE3ODIzNTRFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0QjU1QkE5OUNDODQxMUU4QURDRUZCOEE3ODIzNTRFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRCNTVCQTk2Q0M4NDExRThBRENFRkI4QTc4MjM1NEVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRCNTVCQTk3Q0M4NDExRThBRENFRkI4QTc4MjM1NEVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YoKa3gAABKVJREFUeNrsVltMHFUY/mZ2lp1dFsICu8Cy0BZpuAkoYGkhoFa0kLSC1bY22tgHbdLE2HDzgRp9MRotxYYGH0wkpNUYYqKYGm9pCGiV2EaEamm0IdysdLkusAvMXmb8zwxdwIq2L/Zl/+Rkz57zn/N9+1++s5yiKLibxoUIhAiECNxtAkJR1+SLPdP+fRDwPzHhAEXhIckJlQn6WgE+fyEkqRQyDwQUbXCMGq993jRGT17hyHPa3tq1lbvBcavnlFuxIdNYCqAiyfB5baLwjaD3B6awIAHLfsAowBAuQPLRyVkf4CNvi0Ej4/GtXqjjVF/4aX85sIYkOfjZj6D1iDDAoFtPkE3JvzgurPFYkqHeSZDCFAN3S6gvisP+1EhkWUS4fQH0Ti3jR+cSGgdmsTC6gJcetOMg7TN74+cpnLs0CUdKBD4uT9Y4rQRwzO3DhfFFNPdNE2laMAkaMQbulZFnDWs5GK+vnySiMkVLmCACTWV2VOfGBokaBQG7kszqONF9nZUq3nogFqJep+6/khuDc51jEJVwbI8zrovydpsR+1IiUbXJjJ0fXdNiztJC4FkW3Tt7rULNDAVNlLUA8TvjjUHwD67OgHu1B/aWy2j4YRyPdgzCPTyHh9Iig+DMtsWbYEw0YWxqKbjGzpae7kPbwIz6/WGHGXsyooAJD1iKcwi8LDasZorS61VWy4TnZTl4SU6sEftzYnHDtYQ3237F+W/HADOPI2kWdf+624vJJb86P5xlgeRaJfDTuBvfnR3A0a+GgmtbqZ4wvYhsa1jzrnixZp5y5FPW1zbfOejCqYvjGgGrEe1PbYV8vBAd1XmIiNADeg5PZ0Sr+w1dY3iv16nOD6VFI8osUL1pRVZiN6PquQx0VN4TvLxndB5RDlNTuSP82Cwhs5rm/q4DNgOH6rbLGHJ6UFfiQFKUqG5UZsSg82guPrs6TSnk1Do68+UgDAlmHC9OxA5HBCo2R2JkTkIKFe7e9Gh13LSz/RO48ud8y7P322pnKf8+Isr9kxDZRAqT14/m1j40d/yGLXRx04FMVGXGoiDerA6tgxS8fSAdZua/YodzbZD8WgqdlJ5hqolpaudPfpnA+dH5k09kxNTJLOwbgKsE+v+Yw+5iB/Zk2/Bu1wiGh1xwery3OPIUhfrS5HVrj6Va1MuZtV4aR0PzRWo7PXSbo1peKHLU8QTr8QbUJthQimNEHT48lI1IEpsjBQkbOp7oHkEMCdDioh8JlO8n77Wp63peu93K+t0jIbMk+dTu++KrZygiPhKkfwNXCVgMBPx+Lx7Pt2PblihYTGG4Rq3zaf8NpFO+U6JNmKSIvNzaS+1EkaEuCM+Ng+X5vLUvGr6+4oS9MPFkeU5c3YyHgSv/Ca4S4CmC7V/8jvauYYAVIFMHBsTSYNRrXizMTFqjRVVUPHPLeOT1bk1gmOySkibnO04/U5Za55qX6Hm5PXCVQCCgWGExqrlT+8TLBJpIRBvX6zibS4HVR0VckdjFALJ2bGqsyE+sZ+Bev3zb4CoBk57/XhQFOy8KAYh3+LIu+fiU7IQL5QWO11ws53cIHvpHFCIQIhAiwOwvAQYAgVjy36N7Pc4AAAAASUVORK5CYII='
    })
    // hideNavigation: true
    // backdropDisabled: true
  }
});
