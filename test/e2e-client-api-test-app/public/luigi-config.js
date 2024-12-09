Luigi.setConfig({
  navigation: {
    contextSwitcher: false,
    collapsedNavigation: false,
    validWebcomponentUrls: ['.*?'],
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: '/views/home.html',
        children: [
          {
            pathSegment: 'intro',
            label: 'Intro',
            viewUrl: '/views/intro.html',
            loadingIndicator: {
              enabled: false
            }
          },
          {
            category: {
              label: 'Core app',
              icon: 'unfavorite'
            },
            pathSegment: 'core-overview',
            label: 'Overview',
            viewUrl: '/views/core/index.html',
            userSettingsGroup: 'account',
            loadingIndicator: {
              enabled: false
            }
          },
          {
            category: 'Core app',
            pathSegment: 'core-wc',
            label: 'WC test',
            viewUrl: '/views/helloWorldWC.js',
            userSettingsGroup: 'account',
            webcomponent: true,
            openNodeInModal: false,
            loadingIndicator: {
              enabled: false
            }
          },
          {
            category: {
              label: 'Container app',
              icon: 'sap-box'
            },
            pathSegment: 'container-overview',
            label: 'Overview',
            viewUrl: '/views/container/index.html',
            loadingIndicator: {
              enabled: false
            }
          },
          {
            category: 'Container app',
            pathSegment: 'container-wc',
            label: 'WC test',
            viewUrl: '/views/container/wc.html',
            loadingIndicator: {
              enabled: false
            }
          },
          {
            category: {
              label: 'External links',
              icon: 'cloud'
            },
            label: 'Luigi Project',
            externalLink: {
              url: 'https://luigi-project.io/'
            }
          },
          {
            category: 'External links',
            label: 'JavaScript',
            externalLink: {
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
            }
          }
        ]
      }
    ]
  },
  routing: {
    useHashRouting: true
  },
  userSettings: {
    userSettingGroups:{
      account: {
        label: 'Account',
        sublabel: 'account',
        icon: 'account',
        title: 'Account Settings',
        initials: 'AA',
        settings: {
          date: '',
          language: 'de'
        }
      }
    }
  },
  settings: {
    header: {
      title: 'Luigi Client API',
      logo: '/logo.png',
      favicon: '/favicon.ico'
    },
    responsiveNavigation: 'simpleMobileOnly',
    appLoadingIndicator: {
      hideAutomatically: true
    }
  }
});
