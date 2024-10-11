window.onload = () => {
  window.Luigi.setConfig({
    navigation: {
      nodes: [
        {
          pathSegment: 'home',
          icon: 'home',
          viewUrl: '/microfrontend.html#home',
          children: [
            {
              pathSegment: 'c1',
              label: 'MFE1',
              icon: 'group',
              viewUrl: '/microfrontend.html#child1'
            },
            {
              pathSegment: 'c2',
              label: 'MFE2',
              icon: 'calendar',
              viewUrl: '/microfrontend.html#child2'
            },
            {
              pathSegment: 'c3',
              label: 'MFE3',
              icon: 'group',
              viewUrl: '/microfrontend.html#child3',
              category: {
                id: 'cat',
                label: 'Cat',
                icon: 'group'
              }
            },
            {
              pathSegment: 'c4',
              label: 'MFE4',
              icon: 'calendar',
              viewUrl: '/microfrontend.html#child4',
              category: 'cat'
            }
          ]
        },
        {
          pathSegment: 'help',
          icon: 'sys-help',
          viewUrl: '/microfrontend.html#help'
        }
      ]
    },
    routing: {
      useHashRouting: true
    },
    settings: {
      responsiveNavigation: 'Fiori3',
      header: {
        title: 'Luigi Headless POC',
        logo: 'https://fiddle.luigi-project.io/img/luigi.svg'
      }
    }
  });
};
