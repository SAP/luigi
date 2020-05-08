Luigi.setConfig({
  navigation: {
      nodes: [{
          pathSegment: 'home',
          hideFromNav: true,
          hideSideNav: true,
          loadingIndicator: {
            enabled: false
          },
          viewUrl: '/microfrontend.html'
      }],
  },
  settings: {
      responsiveNavigation: 'Fiori3',
      header: {
          title: 'Luigi Simple Dev'
      }
  }
});
