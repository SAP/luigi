export const projectDetailNavStructure = projectId => [
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
              '/sampleapp.html#/projects/' + projectId + '/users/groups/:group',
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
