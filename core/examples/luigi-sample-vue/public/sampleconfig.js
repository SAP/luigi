var isHashRoute = true;

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
      ]);
    } else {
      resolve([
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
        category: 'User Management',
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
                pathSegment: 'stakeholders',
                label: 'Stakeholders',
                viewUrl:
                  '/sampleapp.html#/projects/' +
                  projectId +
                  '/users/groups/stakeholders'
              },
              {
                pathSegment: 'customers',
                label: 'Customers',
                viewUrl:
                  '/sampleapp.html#/projects/' +
                  projectId +
                  '/users/groups/customers'
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
        category: 'User Management',
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
        label: 'Miscellaneous',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/miscellaneous'
      },
      {
        pathSegment: 'miscellaneous2',
        label: 'Miscellaneous2',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/miscellaneous2'
      }
    ];
    getProjectPlugins(projectId).then(result => {
      result.forEach(plugin => {
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
    getAllProjects().then(result => {
      var children = [];
      result.forEach(project => {
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
    use: 'oAuth2ImplicitGrant',
    openIdConnect: {
      authority: 'https://example-authority.com',
      client_id: 'client',
      scope: 'audience:server:client_id:client openid profile email groups',
      logoutUrl: 'https://example-url.com/logout',
      redirect_uri: '',
      post_logout_redirect_uri: '',
      automaticSilentRenew: true,
      loadUserInfo: false
    },
    oAuth2ImplicitGrant: {
      authorizeUrl: `${window.location.origin}/auth/auth-mock/login-mock.html`,
      logoutUrl: `${window.location.origin}/auth/auth-mock/logout-mock.html`,
      post_logout_redirect_uri: '/logout.html',
      authorizeMethod: 'GET',
      oAuthData: {
        client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp'
        // optional: redirect_uri and response_type are provided by default
        // scope: '',
        // redirect_uri: '/luigi-core/auth/oauth2/callback.html'
        // response_type: 'id_token token',

        // all specified values inside oAuthData will be added to the oauth call, i.e display="popup",
      },
      accessTokenExpiringNotificationTime: 60, //in seconds
      expirationCheckInterval: 5,
      userInfoFn: () => {
        return new Promise(resolve => {
          resolve({
            name: 'Luigi User',
            email: 'luigi.user@example.com'
          });
        });
      }
      // }
      // optional , will be provided by default
      // nonceFn: () => {
      //   console.info('custom nonce function called');
      //   return 1;
      // },
      // logoutFn: (settings, authData, logoutCallback) => {
      //   console.info('logoutFn called');
      //   // auth example
      //   const logoutreq = `${settings.logoutUrl}?id_token_hint=${
      //     authData.idToken
      //     }&client_id=${settings.oauthData.client_id}&post_logout_redirect_uri=${
      //     window.location.origin
      //     }/auth/logout.html`;
      //   const request = new XMLHttpRequest();
      //   request.open('GET', logoutreq);
      //   request.addEventListener('load', function (event) {
      //     if (request.status >= 200 && request.status < 300) {
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
      onLogout: () => {
        console.log('onLogout');
      },
      onAuthSuccessful: data => {
        console.log('onAuthSuccessful', data);
      },
      onAuthExpired: () => {
        console.log('onAuthExpired');
      },
      // TODO: define luigi-client api for getting errors
      onAuthError: err => {
        console.log('authErrorHandler 1', err);
      }
    }
  },
  navigation: {
    nodes: () => [
      {
        pathSegment: 'overview',
        label: 'Overview',
        viewUrl: '/sampleapp.html#/projects'
      },
      {
        pathSegment: 'projects',
        label: 'Projects',
        viewUrl: '/sampleapp.html#/projects',
        children: projectsNavProviderFn
      },
      {
        hideFromNav: true,
        pathSegment: 'hidden-sample',
        label: 'Hidden',
        viewUrl: '/sampleapp.html#/projects'
      },
      {
        pathSegment: 'ext',
        label: 'External Page',
        viewUrl: '/sampleexternal.html#ext',
        children: [
          {
            pathSegment: 'one',
            label: 'One',
            viewUrl: '/sampleexternal.html#one'
          },
          {
            pathSegment: 'two',
            label: 'Two',
            viewUrl: '/sampleexternal.html#two'
          }
        ]
      }
    ],
    hideNav: false
  }
});
