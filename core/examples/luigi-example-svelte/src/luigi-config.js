const baseUrl = 'http://localhost:5101';
Luigi.setConfig({
  navigation: {
    contextSwitcher: false,
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: baseUrl + '/home',
        children: [
          {
            pathSegment: 'sample1',
            label: 'First',
            icon: 'nutrition-activity',
            viewUrl: baseUrl + '/home/sample1'
          },
          {
            pathSegment: 'sample2',
            label: 'Second',
            icon: 'paper-plane',
            viewUrl: baseUrl + '/home/sample2'
          },
          {
            category: { label: 'Links', icon: 'cloud' },
            label: 'Luigi Project',
            externalLink: {
              url: 'https://luigi-project.io/'
            }
          },
          {
            category: 'Links',
            label: 'Svelte',
            externalLink: {
              url: 'https://svelte.dev/'
            }
          }
        ]
      }
    ]
  },
  settings: {
    header: {
      title: 'Luigi Svelte App',
      logo: '/logo.png',
      favicon: '/favicon.ico'
    },
    responsiveNavigation: 'simpleMobileOnly'
  }
});
