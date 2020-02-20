import {
  navigationPermissionChecker,
  projectsNavProviderFn,
  projectsCounterFn,
  addProject,
  removeProject,
  getProjectCount,
  projectExists
} from './helpers';

class Navigation {
  constructor(navigationPermissionChecker, projectsNavProviderFn) {
    this.navigationPermissionChecker = navigationPermissionChecker;
    this.projectsNavProviderFn = projectsNavProviderFn;
  }

  addNavHrefs = true;
  preloadViewGroups = false;
  viewGroupSettings = {
    tets: {
      preloadUrl: '/sampleapp.html#/preload'
    }
  };
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
      viewUrl: '/sampleapp.html#/projects',
      children: projectsNavProviderFn,
      badgeCounter: {
        label: 'Number of projects',
        count: projectsCounterFn
      }
    }
  ];

  getContextSwitcherActions = () => {
    const actions = [
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
      },
      {
        label: '+ New Project',
        link: '/projects',
        position: 'bottom',
        clickHandler: node => {
          const p = addProject();
          Luigi.configChanged('navigation');
          Luigi.showAlert({
            text: `${p.name} created.`,
            type: 'info',
            closeAfter: 3000
          });
          return true;
        }
      }
    ];

    if (getProjectCount() > 0) {
      actions.push({
        label: '\u2212 Remove Project',
        link: '/projects',
        position: 'bottom',
        clickHandler: node => {
          const p = removeProject();
          Luigi.configChanged('navigation');
          Luigi.showAlert({
            text: `${p.name} removed.`,
            type: 'info',
            closeAfter: 3000
          });
          return true;
        }
      });
    }

    return actions;
  };

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
    actions: this.getContextSwitcherActions,

    /**
     * fallbackLabelResolver
     * Resolve what do display in the context switcher (Label) in case the activated
     * context (option) is not listed in available options (eg kyma-system namespace),
     * or if options have not been fetched yet
     */
    fallbackLabelResolver: id => id.replace(/\b\w/g, l => l.toUpperCase())
  };

  getProductSwitcherItems = () => {
    const items = [
      {
        icon:
          'https://pbs.twimg.com/profile_images/1143452953858183170/QLk-HGmK_bigger.png',
        label: 'hybris',
        externalLink: {
          url: 'https://www.hybris.com',
          sameWindow: false
        }
      }
    ];
    if (projectExists('pr1')) {
      items.push({
        icon:
          'https://pbs.twimg.com/profile_images/1143452953858183170/QLk-HGmK_bigger.png',
        label: 'Project 1',
        link: '/projects/pr1'
      });
    }
    if (projectExists('pr2')) {
      items.push({
        icon:
          'https://pbs.twimg.com/profile_images/1143452953858183170/QLk-HGmK_bigger.png',
        label: 'Project 2',
        link: '/projects/pr2'
      });
    }
    if (projectExists('pr3')) {
      items.push({
        icon:
          'https://pbs.twimg.com/profile_images/1143452953858183170/QLk-HGmK_bigger.png',
        label: 'Project 3',
        link: '/projects/pr3'
      });
    }
    if (projectExists('pr4')) {
      items.push({
        icon:
          'https://pbs.twimg.com/profile_images/1143452953858183170/QLk-HGmK_bigger.png',
        label: 'Project 4',
        link: '/projects/pr4'
      });
    }
    return items;
  };

  // The following configuration will be used to render a product switcher at the end of the top navigation
  productSwitcher = {
    label: 'My Products',
    icon: 'grid',
    // icon: '/assets/favicon-sap.ico',
    items: this.getProductSwitcherItems
  };

  getProfileItems = () => {
    const items = [
      {
        label: 'Luigi in Github',
        externalLink: {
          url: 'https://github.com/SAP/luigi',
          sameWindow: false
        }
      }
    ];
    if (projectExists('pr1')) {
      items.push({
        icon: '',
        label: 'Project 1',
        link: '/projects/pr1'
      });
    }
    if (projectExists('pr2')) {
      items.push({
        icon: '',
        label: 'Project 2',
        link: '/projects/pr2'
      });
    }
    if (projectExists('pr3')) {
      items.push({
        label: 'Project 3',
        link: '/projects/pr3'
      });
    }
    return items;
  };

  profile = {
    logout: {
      label: 'End session'
      // icon: "sys-cancel",
    },
    items: this.getProfileItems,
    staticUserInfoFn: () => {
      return new Promise(resolve => {
        resolve({
          name: 'Luigi Static User',
          email: 'other.luigi.user@example.com',
          picture: '/assets/github-logo.png'
        });
      });
    }
  };

  appSwitcher = {
    showMainAppEntry: true,
    items: [
      {
        title: 'Application One',
        subTitle: 'the first app',
        link: '/projects/pr1'
      },
      {
        title: 'Application Two',
        link: '/projects/pr2',
        subTitle: 'the second app'
      },
      {
        title: 'Application Three',
        link: '/environments',
        subTitle: 'the third app'
      }
    ]
  };
}

export const navigation = new Navigation(
  navigationPermissionChecker,
  projectsNavProviderFn
);
