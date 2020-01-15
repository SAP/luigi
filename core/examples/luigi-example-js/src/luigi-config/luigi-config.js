//you can now use ES6 goodies here
Luigi.setConfig({
  navigation: {
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: '/assets/home.html',
        children: [
          {
            pathSegment: 'sample1',
            label: 'First',
            icon: 'nutrition-activity',
            viewUrl: '/assets/sample1.html'
          },
          {
            pathSegment: 'sample2',
            label: 'Second',
            icon: 'paper-plane',
            viewUrl: '/assets/sample2.html'
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
            label: 'Javascript',
            externalLink: {
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
            }
          }
        ]
      }
    ]
  },
  routing: {
    /**
     * Development:
     * For path routing, set to false
     * For hash routing, set to true
     */
    useHashRouting: true
  },
  settings: {
    header: {
      title: 'Luigi Vanilla JS',
      logo: '/logo.png'
    },
    responsiveNavigation: 'simpleMobileOnly',
    appLoadingIndicator: {
      hideAutomatically: true
    }
  }
});
