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
      icon: 'settings'
    },
    {
      label: 'Open Google in this tab',

      externalLink: {
        url: 'http://google.com',
        sameWindow: true
      }
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
      [...Array(10).keys()].filter(n => n !== 0).map(n => ({
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
}

export const navigation = new Navigation(
  navigationPermissionChecker,
  projectsNavProviderFn
);
