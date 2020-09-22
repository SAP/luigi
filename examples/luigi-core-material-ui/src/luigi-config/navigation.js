class Navigation {
  nodes = [
    {
      label: 'Home',
      pathSegment: 'home',
      viewUrl: '/mf.html',
      navigationContext: 'home',
      children: [
        {
          label: 'Sub 1',
          pathSegment: 'sub1',
          viewUrl: '/mf.html'
        },
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
            viewUrl: '/mf.html#' + pathSegment,
            keepSelectedForChildren: true
          };
        })
      ]
    },
    {
      pathSegment: 'settings',
      label: 'settings',
      viewUrl: '/mf.html#settings',
      hideSideNav: true
    }
  ];
}
export const navigation = new Navigation();
