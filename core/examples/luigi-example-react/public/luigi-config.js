Luigi.setConfig({
  navigation: {
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: '/sampleapp.html#/home',
        children: [
          {
            pathSegment: 'sample1',
            label: 'First',
            icon: 'nutrition-activity',
            viewUrl: '/sampleapp.html#/sample1'
          },
          {
            pathSegment: 'sample2',
            label: 'Second',
            icon: 'paper-plane',
            viewUrl: '/sampleapp.html#/sample2'
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
            label: 'React.js',
            externalLink: {
              url: 'https://reactjs.org/'
            }
          }
        ]
      }
    ]
  },
  settings: {
    header: {
      title: 'Luigi React App',
      logo: '/logo.png'
    },
    responsiveNavigation: 'simpleMobileOnly'
  }
});
