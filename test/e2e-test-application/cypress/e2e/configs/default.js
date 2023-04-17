export default {
  navigation: {
    nodes: [
      {
        pathSegment: 'home',
        label: 'Home',
        viewUrl: '/examples/microfrontends/multipurpose.html',
        defaultChildNode: 'two',
        children: [
          {
            pathSegment: 'one',
            label: 'Section one',
            viewUrl: '/examples/microfrontends/multipurpose.html'
          },
          {
            pathSegment: 'two',
            label: 'Section two',
            viewUrl: '/examples/microfrontends/multipurpose.html'
          }
        ]
      },
      {
        label: 'Settings',
        pathSegment: 'settings',
        viewUrl: '/examples/microfrontends/multipurpose.html',
        hideFromNav: true
      }
    ]
  },
  routing: {
    useHashRouting: true
  },
  settings: {
    responsiveNavigation: 'semiCollapsible',
    header: {
      title: 'Luigi E2E'
    }
  }
};
