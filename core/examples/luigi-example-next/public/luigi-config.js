Luigi.setConfig({
  navigation: {
    contextSwitcher: false,
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: '/home',
        loadingIndicator: {
          enabled: false
        },
        children: [
          {
            pathSegment: 'sample1',
            label: 'First',
            icon: 'nutrition-activity',
            viewUrl: '/sample1',
            loadingIndicator: {
              enabled: false
            }
          },
          {
            pathSegment: 'sample2',
            label: 'Second',
            icon: 'paper-plane',
            viewUrl: '/sample2',
            loadingIndicator: {
              enabled: false
            }
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
            label: 'Next.js',
            externalLink: {
              url: 'https://nextjs.org/'
            }
          }
        ]
      }
    ]
  },
  routing: {
    useHashRouting: true
  },
  settings: {
    header: {
      title: 'Luigi Nextjs',
      favicon: '/favicon.ico'
    },
    responsiveNavigation: 'simpleMobileOnly',
    appLoadingIndicator: {
      hideAutomatically: true
    }
  }
});
