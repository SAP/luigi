const getProjectPlugins = projectId =>
  new Promise(resolve => {
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

const getAllProjects = () =>
  new Promise(resolve => {
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

const projectDetailNavProviderFn = context =>
  new Promise(resolve => {
    const projectId = context.currentProject;
    const children = [
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

export const projectsNavProviderFn = context =>
  new Promise(resolve => {
    getAllProjects().then(result => {
      const children = [];
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

export const navigationPermissionChecker = (
  nodeToCheckPermissionFor,
  parentNode,
  currentContext
) => {
  // depending on the current path and context returns true or false
  // true means the current node is accessible, false the opposite
  const mockCurrentUserGroups = ['admins'];
  if (nodeToCheckPermissionFor.constraints) {
    // check if user has required groups
    return (
      nodeToCheckPermissionFor.constraints.filter(
        c => mockCurrentUserGroups.indexOf(c) !== -1
      ).length !== 0
    );
  }

  return true;
};
