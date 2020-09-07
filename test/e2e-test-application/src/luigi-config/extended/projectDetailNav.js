export const projectDetailNavStructure = projectId => [
  {
    category: { label: 'User Management', icon: 'person-placeholder' },
    pathSegment: 'users',
    label: 'Users and Groups',
    viewUrl: '/sampleapp.html#/projects/' + projectId + '/users',
    icon: 'group',
    children: [
      {
        category: { label: 'Groups', icon: 'group' },
        pathSegment: 'groups',
        label: 'Groups',
        icon: 'group',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/users/groups',
        children: [
          {
            pathSegment: ':group',
            viewUrl:
              '/sampleapp.html#/projects/' + projectId + '/users/groups/:group',
            context: {
              currentGroup: ':group'
            },
            children: [
              {
                label: 'Group Settings',
                pathSegment: 'settings',
                keepSelectedForChildren: true,
                icon: 'user-settings',
                viewUrl:
                  '/sampleapp.html#/projects/' +
                  projectId +
                  '/users/groups/:group/settings',
                children: [
                  {
                    label: 'Multi Path Params',
                    pathSegment: ':dynamic',
                    viewUrl:
                      '/sampleapp.html#/projects/' +
                      projectId +
                      '/users/groups/:group/settings/:dynamic',
                    context: {
                      label: ':dynamic'
                    }
                  }
                ]
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
          '/sampleapp.html#/projects/' + projectId + '/users/usersoverview'
      }
    ]
  },
  {
    category: 'User Management',
    pathSegment: 'developers',
    label: 'Developers',
    viewUrl: '/sampleapp.html#/projects/' + projectId + '/developers',
    icon: 'employee',
    badgeCounter: {
      label: 'Number of developers',
      count: () => Math.floor(Math.random() * 100)
    }
  },
  {
    pathSegment: 'clientPermissionsTets',
    label: 'ClientPermissionsTets',
    viewUrl: '/sampleapp.html#/projects/pr1',
    hideFromNav: true
  },
  {
    pathSegment: 'on-node-activation',
    label: 'Node with node activation hook',
    icon: 'activate',
    viewUrl: '/sampleapp.html#/on-node-activation',
    children: [
      {
        pathSegment: 'not-navigated',
        label: 'Prevent navigation',
        icon: 'stop',
        viewUrl: '/sampleapp.html#/on-node-activation/not-navigated',
        onNodeActivation: node => {
          Luigi.showAlert({
            text: `Showing an alert instead of navigating.`,
            type: 'info',
            closeAfter: 3000
          });
          return false;
        }
      },
      {
        pathSegment: 'navigated',
        label: 'Prevent navigation conditionally',
        icon: 'question-mark',
        viewUrl: '/sampleapp.html#/on-node-activation/conditionally-navigated',
        openNodeInModal: true,
        onNodeActivation: node => {
          return Luigi.showConfirmationModal({}).then(() => true, () => false);
        }
      }
    ]
  },
  {
    category: { label: 'Settings', icon: 'action-settings' },
    pathSegment: 'settings',
    label: 'Project Settings',
    viewUrl: '/sampleapp.html#/projects/' + projectId + '/settings',
    icon: 'settings',
    testId: 'myTestId'
  },
  {
    category: { label: 'Feature Toggle: Settings 2', icon: 'action-settings' },
    pathSegment: 'settings_ft',
    label: 'Project Settings 2',
    viewUrl: '/sampleapp.html#/projects/' + projectId + '/settings',
    icon: 'settings',
    testId: 'myTestId',
    visibleForFeatureToggles: ['ft1']
  },
  {
    category: { label: 'Feature Toggle: Settings 3', icon: 'action-settings' },
    pathSegment: 'settings_ft3',
    label: 'Project Settings 3',
    viewUrl: '/sampleapp.html#/projects/' + projectId + '/settings',
    icon: 'settings',
    testId: 'myTestId',
    visibleForFeatureToggles: ['!ft1']
  },
  {
    pathSegment: 'externalmf',
    label: 'External micro frontend',
    viewUrl: 'http://localhost:8090/index.html'
  },
  {
    pathSegment: 'miscellaneous',
    constraints: ['unicorns'],
    label: 'Miscellaneous',
    viewUrl: '/sampleapp.html#/projects/' + projectId + '/miscellaneous',
    icon: 'sys-help'
  },
  {
    pathSegment: 'miscellaneous2',
    label: 'Miscellaneous2',
    viewUrl: '/sampleapp.html#/projects/' + projectId + '/miscellaneous2',
    icon: 'sys-help',
    openNodeInModal: true
  },
  {
    pathSegment: 'misc2-isolated',
    label: 'Miscellaneous2 (Isolated View)',
    isolateView: true,
    viewUrl: '/sampleapp.html#/projects/' + projectId + '/miscellaneous2',
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
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/dps/dps1',
        icon: 'physical-activity'
      },
      {
        pathSegment: 'dps2',
        label: 'Second Child',
        viewUrl: '/sampleapp.html#/projects/' + projectId + '/dps/dps2',
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
    viewUrl: '/sampleapp.html#/projects/' + projectId + '/dynamic/avengers',
    keepSelectedForChildren: true,
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
            '/sampleapp.html#/projects/' + projectId + '/dynamic/super-power',
          children: [
            {
              label: 'Details',
              pathSegment: 'details',
              context: {
                label: 'Details',
                links: false
              },
              viewUrl:
                '/sampleapp.html#/projects/' + projectId + '/dynamic/details'
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
    hideSideNav: true,
    icon: 'full-screen'
  },
  {
    pathSegment: 'virtual-tree',
    label: 'VirtualTree',
    icon: 'tree',
    viewUrl: '/sampleapp.html#/projects/' + projectId + '/dynamic',
    navigationContext: 'virt',
    context: {
      label: 'VirtualTree - add segments to the url',
      links: false
    },
    virtualTree: true
  },
  {
    pathSegment: 'nav-sync',
    label: 'Nav Sync',
    icon: 'synchronize',
    navigationContext: 'navSync',
    children: ['one', 'two', 'three', 'four'].map(seg => ({
      label: seg,
      pathSegment: seg,
      viewUrl: '/sampleapp.html#/nav-sync-example/' + seg
    }))
  },
  {
    label: 'Open Github in new tab',
    category: {
      label: 'Super useful Github links',
      icon: '/assets/github-logo.png',
      collapsible: true
    },
    externalLink: {
      url: 'http://github.com',
      sameWindow: false
    },
    icon: 'internet-browser'
  },
  {
    label: 'Open Github in this tab',
    category: 'Super useful Github links',
    externalLink: {
      url: 'http://github.com',
      sameWindow: true
    },
    icon: 'globe'
  }
];
