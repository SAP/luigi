Luigi.setConfig({
  navigation: {
    nodes: [
      {
        pathSegment: 'home',
        hideFromNav: true,
        hideSideNav: false,
        icon: 'home',
        loadingIndicator: {
          enabled: false
        },
        viewUrl: 'http://localhost:5173/docs'
      }
    ]
  },
  settings: {
    responsiveNavigation: 'simpleMobileOnly'
  },
  routing: {
    useHashRouting: false
  }
});
