Cypress.env('RETRIES', 1);
describe('Navigation', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });

  it('Click around using navigation', () => {
    // projects page
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

    cy.get('.fd-app__sidebar').should('not.contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Miscellaneous2');
    cy.get('.fd-app__sidebar')
      .contains('Default Child node Example')
      .click();

    //default child node example
    cy.expectPathToBe('/projects/pr1/dps/dps2');

    cy.get('.fd-app__sidebar').should('contain', 'First Child');
    cy.get('.fd-app__sidebar').should('contain', 'Second Child');
  });

  it('Find configured testid on navigation node', () => {
    cy.visit('/projects/pr1/settings');
    cy.get('a[data-testid="myTestId"]').should('exist');
  });

  it('Set default testid on navigation node', () => {
    cy.visit('/projects/pr1/developers');
    cy.get('a[data-testid="developers_developers"]').should('exist');
  });

  it('Check if active node is selected', () => {
    cy.visit('/projects');
    cy.get('.fd-shellbar')
      .contains('Projects')
      .should('have.class', 'is-selected');

    cy.visit('projects/pr1');
    cy.get('.fd-side-nav__subitem')
      .contains('Project Settings')
      .click()
      .should('have.class', 'is-selected');
  });

  it('Check if active node reloads page', () => {
    cy.visit('/projects/pr1/developers');
    cy.getIframeBody().then($iframeBody => {
      cy.wrap($iframeBody)
        .should('contain', 'Developers content')
        .find('[title="visitors: 1"]');
      cy.get('.fd-app__sidebar')
        .contains('Project Settings')
        .click();
      cy.get('.fd-app__sidebar')
        .contains('Developers')
        .click();
      cy.wrap($iframeBody).find('[title="visitors: 2"]');
    });
    cy.get('.fd-app__sidebar')
      .contains('Developers')
      .click();
    cy.getIframeBody().then($iframeBody => {
      cy.wrap($iframeBody).find('[title="visitors: 1"]');
    });
  });

  it('Browser back works with Default Child mechanism', () => {
    cy.getIframeBody().then($iframeBody => {
      cy.wrap($iframeBody)
        .contains('defaultChildNode')
        .click();
      cy.expectPathToBe('/projects/pr1/dps/dps2');

      cy.window().historyBack();
      cy.expectPathToBe('/overview');
    });
  });

  it('Icon instead of label in TopNav', () => {
    cy.get('button[title="Settings"]>.fd-top-nav__icon').should('exist');
    cy.get('button[title="Settings"]').should('contain', '');
  });

  it('Icon with label in LeftNav', () => {
    cy.get('.fd-shellbar')
      .contains('Projects')
      .click();
    cy.get('.fd-app__sidebar .fd-side-nav__item')
      .contains('Project One')
      .click();

    cy.get('.fd-side-nav__subitem')
      .contains('Project Settings')
      .find('.fd-side-nav__icon')
      .should('exist');
  });

  it('Shows Kyma version in LeftNav', () => {
    // projects page
    cy.get('.fd-shellbar')
      .contains('Projects')
      .click();

    cy.get('.fd-app__sidebar .lui-side-nav__footer')
      .contains('Luigi Client:')
      .should('be.visible');

    cy.window().then(win => {
      const config = win.Luigi.getConfig();
      config.settings.sideNavFooterText = 'Hello from tets.';
      win.Luigi.configChanged('settings.footer');

      cy.get('.fd-app__sidebar .lui-side-nav__footer')
        .contains('Hello from tets.')
        .should('be.visible');
    });
  });

  describe('Node activation hook', () => {
    const nodeActivationPath = '/projects/pr1/on-node-activation';
    it('does not navigate - synchronously', () => {
      cy.visitLoggedIn(nodeActivationPath);

      cy.getIframeBody().then($iframeBody => {
        cy.wrap($iframeBody)
          .find('[data-testid="node-activation-no-navigation"]')
          .click();

        cy.expectPathToBe(nodeActivationPath);
        cy.get('[data-testid="luigi-alert"]').contains(
          'Showing an alert instead of navigating'
        );
      });
    });

    it('does not navigate - asynchronously (from left navigation)', () => {
      cy.visitLoggedIn(nodeActivationPath);

      cy.get('.sap-icon--question-mark').click();

      cy.get('[data-testid=luigi-modal-dismiss]').click();

      cy.expectPathToBe(nodeActivationPath);
    });

    it('navigates - asynchronously', () => {
      cy.visitLoggedIn(nodeActivationPath);

      cy.getIframeBody().then($iframeBody => {
        // wrap the body of your iframe with cy so as to do cy actions inside iframe elements
        cy.wrap($iframeBody)
          .find('[data-testid="node-activation-conditional-navigation"]')
          .click();

        cy.get('[data-testid=luigi-modal-confirm]').click();

        cy.expectPathToBe(`${nodeActivationPath}/navigated`);
      });
    });
  });

  // Disabled, since it only works if autologin is false
  /*
  it('Anonymous content', () => {
    cy.get('.fd-shellbar')
      .contains('Visible for all users')
      .should('exist');

    cy.get('.fd-shellbar')
      .contains('Visible for anonymous users only')
      .should('not.exist');
  });
  */

  describe('features', () => {
    it('keepSelectedForChildren', () => {
      // keep selected for children example
      Cypress.currentTest.retries(3);
      cy.get('.fd-shellbar')
        .contains('Overview')
        .click();

      cy.wait(500);
      // dig into the iframe

      cy.getIframeBody().then($iframeBody => {
        cy.wrap($iframeBody)
          .find('.fd-list-group__item')
          .contains('keepSelectedForChildren')
          .click();
        cy.wait(500);
      });

      cy.expectPathToBe('/projects/pr1/avengers');

      //the iframe is has been replaced with another one, we need to "get" it again
      cy.getIframeBody().then($iframeBody => {
        // wrap this body with cy so as to do cy actions inside iframe elements
        cy.wrap($iframeBody)
          .find('.fd-list-group__item')
          .contains('Thor')
          .click();
        cy.wait(500);
      });
      cy.expectPathToBe('/projects/pr1/avengers/thor');

      cy.get('.fd-app__sidebar').should('contain', 'Keep Selected Example');
    });

    it('Node with link to another node', () => {
      const goToAnotherNodeFeature = () => {
        cy.get('.fd-shellbar')
          .contains('Overview')
          .click();

        cy.wait(500);
        cy.getIframeBody().then($iframeBody => {
          cy.wrap($iframeBody)
            .find('.fd-list-group__item strong')
            .contains('Node with link to another node')
            .click();
        });
      };

      //go to absolute path
      goToAnotherNodeFeature();
      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Go to absolute path')
        .click();

      cy.expectPathToBe('/settings');

      //go to relative path from the parent node
      goToAnotherNodeFeature();
      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Go to relative path')
        .click();

      cy.expectPathToBe('/projects/pr2/dps/dps1');

      //go to relative path from node that is a sibiling
      goToAnotherNodeFeature();
      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Keep Selected Example')
        .click();

      cy.expectPathToBe('/projects/pr2/avengers');

      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Go to relative path')
        .click();

      cy.expectPathToBe('/projects/pr2/dps/dps1');
    });

    it('Left navigation hidden', () => {
      cy.get('.fd-shellbar')
        .contains('Projects')
        .click();
      cy.get('.fd-app__sidebar .fd-side-nav__item')
        .contains('Project One')
        .click();

      cy.get('.fd-app__sidebar')
        .contains('Hide left navigation')
        .click();

      cy.get('.no-side-nav').should('exist');
      cy.get('.fd-app__sidebar').should('not.be.visible');
    });

    it('Open navigation node in a modal', () => {
      // projects page
      cy.get('.fd-shellbar')
        .contains('Projects')
        .click();

      //projects page
      cy.get('.fd-app__sidebar')
        .contains('Project Two')
        .click();

      //project two page
      cy.expectPathToBe('/projects/pr2');

      cy.get('.fd-app__sidebar')
        .contains('Miscellaneous2')
        .click();

      cy.get('[data-testid=modal-mf]').should('be.visible');

      cy.get('[data-testid=modal-mf] [aria-label=close]').click();

      cy.get('[data-testid=modal-mf]').should('not.be.visible');
    });
  });
  describe('Horizontal Navigation', () => {
    it('Open horizontal navigation', () => {
      cy.get('.fd-shellbar')
        .contains('Projects')
        .click();

      cy.get('.fd-app__sidebar')
        .contains('Horizontal Navigation Example')
        .click();

      cy.expectPathToBe('/projects/tabNav');

      cy.get('.fd-tabs')
        .contains('Node with node activation hook')
        .click();
      cy.expectPathToBe('/projects/tabNav/on-node-activation');

      cy.get('.fd-tabs')
        .contains('Settings')
        .click();
      cy.get('.fd-menu__item')
        .contains('Project Settings')
        .click();

      cy.get('.fd-tabs')
        .contains('More')
        .click();

      cy.get('.fd-menu')
        .contains('Default Child node Example')
        .click();

      cy.get('.fd-side-nav__subitem')
        .contains('First Child')
        .click();
      cy.expectPathToBe('/projects/tabNav/dps1');
    });
  });
});
