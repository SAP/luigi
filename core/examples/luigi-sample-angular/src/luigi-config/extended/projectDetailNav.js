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
                icon: 'user-settings',
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
    icon: '/assets/favicon-sap.ico'
  },
  {
    category: { label: 'Settings', icon: 'action-settings' },
    pathSegment: 'settings',
    label: 'Project Settings',
    viewUrl: '/sampleapp.html#/projects/' + projectId + '/settings',
    icon: 'settings'
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
    icon: 'sys-help'
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
    label: 'Open Github in new tab',
    category: {
      label: 'Super useful Github links',
      icon: '/assets/github-logo.png'
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
