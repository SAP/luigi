class Navigation {
  nodes = [
    {
      label: 'Home',
      pathSegment: 'home',
      viewUrl: '/mf.html#entry',
      isolateView: true,
      navigationContext: 'home',
      children: [
        ...[
          'Authentication',
          'Database',
          'Storage',
          'Hosting',
          'Functions',
          'ML Kit'
        ].map(label => {
          const category = 'Develop';
          const pathSegment = label.toLowerCase().replace(' ', '-');
          return {
            label: label,
            pathSegment,
            category,
            isolateView: true,
            viewUrl: '/mf.html#' + pathSegment,
            keepSelectedForChildren: true
          };
        }),

        ...['Analytics', 'Performance', 'Test Lab'].map(label => {
          const category = 'Quality';
          const pathSegment = label.toLowerCase().replace(' ', '-');
          return {
            label: label,
            pathSegment,
            category,
            isolateView: true,
            viewUrl: '/mf.html#' + pathSegment,
            keepSelectedForChildren: true
          };
        })
      ]
    },
    {
      pathSegment: 'settings',
      label: 'Settings',
      isolateView: true,
      viewUrl: '/mf.html#settings',
      navigationContext: 'settings',
      children: [
        ...['Analytics', 'Language', 'Profile'].map(label => {
          const category = 'General Settings';
          const pathSegment = label.toLowerCase().replace(' ', '-');
          return {
            label: label,
            pathSegment,
            category,
            isolateView: true,
            viewUrl: '/mf.html#' + pathSegment,
            keepSelectedForChildren: true
          };
        })
      ]
    }
  ];

  profile = {
    logout: {
      label: 'Sign out',
      customLogoutFn: () => {
        console.log('Logout is not implemented.');
      }
    },
    items: [
      ...['Storage', 'Performance', 'Analytics'].map(label => ({
        label,
        link:
          '/home/' +
          label
            .toLowerCase()
            .split(' ')
            .join('-')
      }))
    ],
    staticUserInfoFn: () => {
      return {
        name: 'Mario Plumber',
        email: 'noreply@luigi-project.io',
        picture: '/static/images/avatar/1.jpg'
      };
    }
  };
}
export const navigation = new Navigation();
