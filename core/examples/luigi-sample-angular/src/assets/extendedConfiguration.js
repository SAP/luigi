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
        label: 'Default Child Node Example',
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
    use: 'openIdConnect',
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
      authority: 'https://accounts.google.com',
      client_id:
        '326008160752-bfc0vipcghr5m6vlcrlq685sv02pk1d0.apps.googleusercontent.com',
      scope: 'openid profile email',
      logoutUrl: `${window.location.origin}/logout.html`
      // optional parameters
      // redirect_uri: '',
      // post_logout_redirect_uri: '/logout.html',
      // automaticSilentRenew: true,
      // loadUserInfo: false // returned metadata must contain userinfo_endpoint
    },
    oAuth2ImplicitGrant: {
      authorizeUrl: 'https://dex.swinka.cluster.kyma.cx/auth',
      logoutUrl: 'http://luigi.com:4200/logout.html',
      post_logout_redirect_uri: '/logout.html',
      authorizeMethod: 'GET',
      oAuthData: {
        client_id: 'luigi',
        redirect_uri: '/luigi-core/auth/oauth2/callback.html',
        scope: 'openid profile email groups'

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
    // hideNavigation: true
    // backdropDisabled: true
  }
});
