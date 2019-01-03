const navigationPermissionChecker = function(
  nodeToCheckPermissionFor,
  parentNode,
  currentContext
) {
  // depending on the current path and context returns true or false
  // true means the current node is accessible, false the opposite
  const mockCurrentUserGroups = ['admins'];
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

const getProjectPlugins = projectId =>
  new Promise(function(resolve) {
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

const toTitleCase = str =>
  str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

const getAllProjects = () =>
  new Promise(function(resolve) {
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

var projectDetailNavProviderFn = function(context) {
  return new Promise(function(resolve) {
    var projectId = context.currentProject;
    var children = [
      {
        category: { label: 'User Management', icon: 'person-placeholder' },
        pathSegment: 'users',
        label: 'Users and Groups',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/users',
        children: [
          {
            category: { label: 'Groups', icon: 'group' },
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
        category: 'User Management',
        pathSegment: 'developers',
        label: 'Developers',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/developers'
      },
      {
        category: { label: 'Settings', icon: 'action-settings' },
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
        link: '/settings',
        label: 'Go to absolute path'
      },
      {
        link: 'dps/dps1',
        label: 'Go to relative path'
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
        pathSegment: 'hideSideNav',
        label: 'Hide left navigation',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/hideSideNav',
        hideSideNav: true
      },
      {
        label: 'Open Github in new tab',
        category: { label: 'Super useful Github links', icon: 'world' },
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
const projectsNavProviderFn = context =>
  new Promise(function(resolve) {
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

class Navigation {
  constructor(navigationPermissionChecker, projectsNavProviderFn) {
    this.navigationPermissionChecker = navigationPermissionChecker;
    this.projectsNavProviderFn = projectsNavProviderFn;
  }
  get nodeAccessibilityResolver() {
    return this.navigationPermissionChecker;
  }
  get nodes() {
    return [
      {
        pathSegment: 'overview',
        label: 'Overview',
        viewUrl: '/sampleapp.html#/overview',
        hideSideNav: true
      },
      {
        pathSegment: 'projects',
        label: 'Projects',
        viewUrl: '/sampleapp.html#/projects/overview',
        children: this.projectsNavProviderFn
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

  // The following configuration will be used to render the context switcher component
  get contextSwitcher() {
    return {
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
          label: '+ New Environment (top)',
          link: '/create-environment'
        },
        {
          label: '+ New Environment (bottom)',
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
      fallbackLabelResolver(id) {
        return id.replace(/\b\w/g, l => l.toUpperCase());
      }
    };
  }
}

export const navigation = new Navigation(
  navigationPermissionChecker,
  projectsNavProviderFn
);
