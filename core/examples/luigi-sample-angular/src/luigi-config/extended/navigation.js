import { navigationPermissionChecker, projectsNavProviderFn } from './helpers';

class Navigation {
  constructor(navigationPermissionChecker, projectsNavProviderFn) {
    this.navigationPermissionChecker = navigationPermissionChecker;
    this.projectsNavProviderFn = projectsNavProviderFn;
  }

  nodeAccessibilityResolver = navigationPermissionChecker;
  nodes = [
    {
      pathSegment: 'overview',
      label: 'Overview',
      viewUrl: '/sampleapp.html#/overview',
      hideSideNav: true
    },
    {
      pathSegment: 'projects',
      label: 'Projects',
      viewUrl: '/sampleapp.html#/projects/overview',
      children: projectsNavProviderFn
    },
    {
      hideFromNav: true,
      pathSegment: 'create-environment',
      viewUrl: '/sampleapp.html#/create/environment',
      context: {
        label: 'Create Environment'
      }
    },
    {
      hideFromNav: true,
      pathSegment: 'environments',
      viewUrl: '/sampleapp.html#/environments',
      children: [
        {
          pathSegment: ':environmentId',
          viewUrl: '/sampleapp.html#/environments/:environmentId'
        }
      ]
    },
    {
      pathSegment: 'forbidden-sample',
      label: 'Forbidden',
      viewUrl: '/sampleapp.html#/restricted',
      constraints: ['unicorns']
    },
    {
      pathSegment: 'settings',
      label: 'Settings',
      viewUrl: '/sampleapp.html#/settings',
      icon: 'settings',
      viewGroup: 'tets'
    },
    {
      label: 'Open Google in this tab',

      externalLink: {
        url: 'http://google.com',
        sameWindow: true
      }
    }, // showing an anonymous content is possible only with auto login disabled
    {
      pathSegment: 'all-users',
      label: 'Visible for all users',
      anonymousAccess: true,
      viewUrl: '/sampleapp.html#/anonymous',
      hideSideNav: true
    },
    {
      pathSegment: 'anonymous',
      label: 'Visible for anonymous users only',
      anonymousAccess: 'exclusive',
      viewUrl: '/sampleapp.html#/anonymous?exclusive=true',
      hideSideNav: true
    },
    {
      pathSegment: 'ext',
      label: 'External Page',
      loadingIndicator: {
        hideAutomatically: false
      },
      viewUrl: '/assets/sampleexternal.html#ext',
      children: [
        {
          pathSegment: 'one',
          label: 'One',
          loadingIndicator: {
            hideAutomatically: false
          },
          icon: 'drill-up',
          viewUrl: '/assets/sampleexternal.html#one'
        },
        {
          pathSegment: 'two',
          label: 'Two',
          loadingIndicator: {
            hideAutomatically: false
          },
          icon: 'drill-down',
          viewUrl: '/assets/sampleexternal.html#two'
        }
      ]
    },
    {
      pathSegment: 'page-not-found',
      label: 'Page not found',
      viewUrl: '/assets/404.html',
      hideFromNav: true,
      hideSideNav: true
    }
  ];
  // The following configuration will be used to render the context switcher component
  contextSwitcher = {
    defaultLabel: 'Select Environment ...',
    parentNodePath: '/environments', // absolute path
    lazyloadOptions: true, // load options on click instead on page load
    options: () =>
      [...Array(10).keys()]
        .filter(n => n !== 0)
        .map(n => ({
          label: 'Environment ' + n, // (i.e mapping between what the user sees and what is taken to replace the dynamic part for the dynamic node)
          pathValue: 'env' + n // will be used to replace dynamic part
        })),
    actions: [
      {
        label: '+ New Environment (top)',
        link: '/create-environment'
      },
      {
        label: '+ New Environment (bottom)',
        link: '/create-environment',
        position: 'bottom', // top or bottom
        clickHandler: node => {
          // called BEFORE route change
          return true; // route change will be done using link value (if defined)
          // return false // route change will not be done even if link attribute is defined
        }
      }
    ],

    /**
     * fallbackLabelResolver
     * Resolve what do display in the context switcher (Label) in case the activated
     * context (option) is not listed in available options (eg kyma-system namespace),
     * or if options have not been fetched yet
     */
    fallbackLabelResolver: id => id.replace(/\b\w/g, l => l.toUpperCase())
  };
  // The following configuration will be used to render a product switcher component
  productSwitcher = {
    items: [
      {
        icon: 'https://sap.github.io/fundamental/images/products/06.png',
        label: 'hybris',
        externalLink: {
          url: 'https://www.hybris.com',
          sameWindow: false
        }
      },
      {
        icon: 'https://sap.github.io/fundamental/images/products/06.png',
        label: 'Project 1',
        link: '/projects/pr1'
      },
      {
        icon: 'https://sap.github.io/fundamental/images/products/06.png',
        label: 'Project 2',
        link: '/projects/pr2'
      },
      {
        icon: 'https://sap.github.io/fundamental/images/products/06.png',
        label: 'Project 3',
        link: '/projects/pr3'
      }
    ]
  };

  profile = {
    logout: {
      label: 'End session'
      // icon: "sys-cancel",
    },
    items: [
      {
        label: 'Luigi in Github',
        externalLink: {
          url: 'https://github.com/kyma-project/luigi',
          sameWindow: false
        }
      },
      {
        icon: '',
        label: 'Project 1',
        link: '/projects/pr1'
      },
      {
        label: 'Project 3',
        link: '/projects/pr3'
      }
    ]
  };
}

export const navigation = new Navigation(
  navigationPermissionChecker,
  projectsNavProviderFn
);
