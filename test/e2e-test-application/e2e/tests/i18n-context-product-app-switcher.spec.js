Cypress.env('RETRIES', 1);

describe('Context switcher', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });

  it('Clicking around the context switcher', () => {
    cy.selectContextSwitcherItem('New Environment (top)');

    cy.expectPathToBe('/create-environment');

    cy.selectContextSwitcherItem('Environment 1');

    cy.expectPathToBe('/environments/env1');

    // check label
    cy.get('.fd-product-menu .fd-popover__control button').should(
      'contain',
      'Environment 1'
    );
  });

  it('Add and remove project with context switcher', () => {
    cy.goToProjectsPage();

    cy.get('.fd-app__sidebar').should('contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Project Two');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project 3');

    cy.goToOverviewPage();
    cy.expectPathToBe('/overview');

    cy.get('[data-testid=luigi-alert]').should('not.exist');

    // add project

    cy.selectContextSwitcherItem('New Project');

    cy.expectPathToBe('/projects');

    cy.get('.fd-app__sidebar').should('contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Project Two');
    cy.get('.fd-app__sidebar').should('contain', 'Project 4');

    cy.get('[data-testid=luigi-alert]').should(
      'have.class',
      'fd-alert--information'
    );

    cy.get('[data-testid=luigi-alert]').should('contain', 'Project 4 created.');

    cy.goToOverviewPage();
    cy.expectPathToBe('/overview');

    // remove project

    cy.selectContextSwitcherItem('Remove Project');

    cy.expectPathToBe('/projects');

    cy.get('.fd-app__sidebar').should('contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Project Two');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project 3');

    // remove all projects

    cy.selectContextSwitcherItem('Remove Project');

    cy.expectPathToBe('/projects');

    cy.selectContextSwitcherItem('Remove Project');

    cy.expectPathToBe('/projects');

    cy.selectContextSwitcherItem('Remove Project');

    cy.expectPathToBe('/projects');

    cy.get('.fd-app__sidebar').should('not.contain', 'Project One');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project Two');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project 3');

    cy.get('.fd-product-menu .fd-popover__body').should(
      'not.contain',
      'Remove Project'
    );

    // add projects again

    cy.selectContextSwitcherItem('New Project');

    cy.expectPathToBe('/projects');

    cy.get('.fd-app__sidebar').should('contain', 'Project 1');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project 2');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project 3');

    cy.get('.fd-product-menu .fd-popover__body').should(
      'contain',
      'Remove Project'
    );

    cy.selectContextSwitcherItem('New Project');

    cy.expectPathToBe('/projects');

    cy.get('.fd-app__sidebar').should('contain', 'Project 1');
    cy.get('.fd-app__sidebar').should('contain', 'Project 2');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project 3');

    cy.get('.fd-product-menu .fd-popover__body').should(
      'contain',
      'Remove Project'
    );

    cy.expectPathToBe('/projects');
  });

  it('Preserve sub path on switch', () => {
    cy.window().then(win => {
      const config = win.Luigi.getConfig();
      config.navigation.contextSwitcher.preserveSubPathOnSwitch = true;
      const environmentsNode = config.navigation.nodes.find(
        element => element.pathSegment === 'environments'
      );
      environmentsNode.hideFromNav = false;
      const environmentNode = environmentsNode.children[0];
      environmentNode.children = [
        {
          pathSegment: 'tets1',
          label: 'Tets 1',
          viewUrl: '/sampleapp.html#/environments/:environmentId'
        },
        {
          pathSegment: 'tets2',
          label: 'Tets 2',
          viewUrl: '/sampleapp.html#/environments/:environmentId'
        }
      ];
      win.Luigi.configChanged('navigation');

      cy.selectContextSwitcherItem('Environment 1');

      cy.expectPathToBe('/environments/env1');

      cy.get('.fd-app__sidebar')
        .contains('Tets 2')
        .click();

      cy.expectPathToBe('/environments/env1/tets2');

      cy.selectContextSwitcherItem('Environment 3', 'Environment 1');

      cy.expectPathToBe('/environments/env3/tets2');

      cy.getIframeBody().then($iframeBody => {
        cy.wrap($iframeBody).should('contain', 'Env3 content.');
      });
    });
  });

  it('aways show dropdown option - many options', () => {
    cy.window().then(win => {
      const config = win.Luigi.getConfig();
      config.navigation.contextSwitcher.alwaysShowDropdown = false;
      win.Luigi.configChanged('navigation');

      cy.selectContextSwitcherItem('Environment 1');

      cy.expectPathToBe('/environments/env1');

      cy.get('.lui-ctx-switch-menu[aria-disabled="false"]')
        .should('exist')
        .click();

      cy.get('#contextSwitcherPopover[aria-hidden="false"]').should('exist');
    });
  });

  it('aways show dropdown option - one option only', () => {
    cy.window().then(win => {
      const config = win.Luigi.getConfig();
      config.navigation.contextSwitcher.alwaysShowDropdown = false;
      config.navigation.contextSwitcher.options = [
        {
          label: 'Environment 1',
          pathValue: 'env1'
        }
      ];
      config.navigation.contextSwitcher.actions = [];
      win.Luigi.configChanged('navigation');

      cy.selectContextSwitcherItem('Environment 1');

      cy.expectPathToBe('/environments/env1');

      cy.get('.lui-ctx-switch-menu[aria-disabled="true"]')
        .should('exist')
        .click();

      cy.get('#contextSwitcherPopover[aria-hidden="true"]').should('exist');
    });
  });
});

describe('ProductSwitcher', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });
  context('Desktop', () => {
    beforeEach(() => {
      // run these tests as if in a desktop
      cy.viewport('macbook-15');
    });

    it('Clicking around the product switcher', () => {
      //check if hybris is there
      cy.get('.fd-product-switch')
        .click()
        .contains('hybris');

      //check if internal link is there
      cy.get('.fd-product-switch .fd-product-switch__title')
        .contains('Project 1')
        .click();

      cy.expectPathToBe('/projects/pr1');

      cy.get('.fd-product-switch .fd-product-switch__title').should(
        'not.contain',
        'Project 3'
      );

      cy.goToOverviewPage();
      cy.expectPathToBe('/overview');

      // add project
      cy.selectContextSwitcherItem('New Project');
      cy.expectPathToBe('/projects');

      cy.get('.fd-product-switch .fd-product-switch__title').should(
        'contain',
        'Project 4'
      );

      cy.get('.fd-product-switch').click();

      cy.get('.fd-product-switch .fd-product-switch__title')
        .contains('Project 4')
        .click();

      cy.expectPathToBe('/projects/pr4');
    });

    it('Mobile Product Switcher is not visible', () => {
      cy.get('[data-testid="mobile-product-switcher"]').should(
        'not.be.visible'
      );
    });
  });

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
    });

    it('Desktop Product Switcher is not visible', () => {
      cy.get('[data-testid="myproducts"]').should('not.be.visible');
    });

    it('Should be able to select product', () => {
      cy.get('[data-testid="mobile-menu"]').click();

      //open mobile product switcher
      cy.get('[data-testid="mobile-product-switcher"]').click();

      //check if internal link is there
      cy.get('.fd-product-switch__title')
        .contains('Project 1')
        .click();

      cy.expectPathToBe('/projects/pr1');
    });

    it('Should be able to close', () => {
      cy.get('[data-testid="mobile-menu"]').click();

      //open mobile product switcher
      cy.get('[data-testid="mobile-product-switcher"]').click();

      //close mobile product switcher
      cy.get('[data-testid="mobile-topnav-close"]').click();

      //no product switcher is visible
      cy.get('.fd-product-switch').should('not.be.visible');

      //the path wasn't changed
      cy.expectPathToBe('/overview');
    });
  });
});

describe('AppSwitcher', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });
  it('Clicking around the app switcher', () => {
    cy.window().then(win => {
      const config = win.Luigi.getConfig();

      // check initial title and subtitle
      cy.get('[data-testid="luigi-topnav-title"]').should(
        'contain',
        config.settings.header.title
      );
      cy.get('.fd-shellbar__subtitle').should(
        'contain',
        config.settings.header.subTitle
      );
      // check available dropdown items
      cy.get('[data-testid="app-switcher"]').click();
      cy.get('[data-testid="applicationtwo"]').should('exist');
      cy.get('[data-testid="applicationthree"]').should('exist');
      cy.get('[data-testid="applicationone"]').should('exist');
      cy.get(
        '[data-testid="' +
          config.settings.header.title
            .split(' ')
            .join('')
            .toLowerCase() +
          '"]'
      ).should('not.exist');

      // use app switcher to go to app 2
      cy.get('[data-testid="app-switcher"]').click();

      cy.get('[data-testid="applicationtwo"]')
        .contains('Application Two')
        .click();

      // check that we landed in project 2
      cy.expectPathToBe('/projects/pr2');

      // check the title and subtlitle
      cy.get('[data-testid="luigi-topnav-title"]').should(
        'contain',
        'Application Two'
      );
      cy.get('.fd-shellbar__subtitle').should('contain', 'the second app');

      // navigate to project 1 using plain navigation
      cy.visit('/projects/pr1/developers');

      // check if app switcher got updated
      cy.get('[data-testid="luigi-topnav-title"]').should(
        'contain',
        'Application One'
      );
      cy.get('.fd-shellbar__subtitle').should('contain', 'the first app');

      // check available dropdown items
      cy.get('[data-testid="app-switcher"]').click();
      cy.get(
        '[data-testid="' +
          config.settings.header.title
            .split(' ')
            .join('')
            .toLowerCase() +
          '"]'
      ).should('exist');
      cy.get('[data-testid="applicationtwo"]').should('exist');
      cy.get('[data-testid="applicationthree"]').should('exist');
      cy.get('[data-testid="applicationone"]').should('not.exist');
    });
  });
});

describe('I18N', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });

  it('custom translation test', () => {
    cy.get('.fd-shellbar')
      .contains('Projects')
      .click();

    //projects page
    cy.get('.fd-app__sidebar').should('contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Project Two');
    cy.get('.fd-app__sidebar')
      .contains('Project One')
      .click();

    //project one page
    cy.expectPathToBe('/projects/pr1');

    cy.window().then(win => {
      let config = win.Luigi.getConfig();
      const mySettings = {
        customTranslationImplementation: () => {
          return {
            getTranslation: (key, interpolations, locale) => {
              return (
                '*' +
                key +
                '* ' +
                (locale || win.Luigi.i18n().getCurrentLocale())
              );
            }
          };
        }
      };
      config.settings = mySettings;
      win.Luigi.configChanged();
    });
    cy.get('.fd-app__sidebar').should('contain', '*Developers* en');

    cy.get('.fd-shellbar')
      .contains('Projects')
      .click();
    cy.get('.fd-app__sidebar').should('contain', '*Project One* en');
  });
});
