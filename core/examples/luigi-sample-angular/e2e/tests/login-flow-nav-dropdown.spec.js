Cypress.env('RETRIES', 1);
describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad: () => cy.clearLocalStorage()
    });
  });

  it('Login', () => {
    cy.login('tets@email.com', 'tets');
  });

  it('Username in profile dropdown', () => {
    cy.login('tets@email.com', 'tets');

    cy.get('[data-testid="luigi-topnav-profile"]').click();
    cy.get('[data-testid="luigi-topnav-profile-username"]').should(
      'contain',
      'Luigi User'
    );
  });

  it('Link in profile dropdown', () => {
    cy.login('tets@email.com', 'tets');

    cy.get('[data-testid="luigi-topnav-profile"]').click();
    cy.get('[data-testid="luigi-topnav-profile-item"]')
      .contains('Project 1')
      .click();

    cy.expectPathToBe('/projects/pr1');

    cy.goToOverviewPage();
    cy.expectPathToBe('/overview');

    // remove projects
    cy.selectContextSwitcherItem('Remove Project');
    cy.expectPathToBe('/projects');
    cy.selectContextSwitcherItem('Remove Project');
    cy.expectPathToBe('/projects');

    cy.get('[data-testid="luigi-topnav-profile"]').click();
    cy.get('[data-testid="luigi-topnav-profile-item"]').should(
      'not.contain',
      'Project 1'
    );

    // add project
    cy.selectContextSwitcherItem('New Project');
    cy.expectPathToBe('/projects');

    cy.get('[data-testid="luigi-topnav-profile-item"]').should(
      'contain',
      'Project 1'
    );
  });

  it('Change title and logo', () => {
    cy.login('tets@email.com', 'tets');

    const testTitle = 'This is not my sandwich';
    const testLogo =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0WCn/HgAD8gHpXMQ+4AAAAABJRU5ErkJggg==';

    cy.get('[data-testid="luigi-topnav-title"]').should('contain', 'Luigi Demo');
    cy.get('[data-testid="luigi-topnav-title"]').should(
      'not.have.attr',
      'src',
      testLogo
    );

    cy.window().then(win => {
      const config = win.Luigi.getConfig();
      config.settings.header.title = testTitle;
      config.settings.header.logo = testLogo;
      win.Luigi.configChanged('settings.header');

      cy.get('[data-testid="luigi-topnav-title"]').should('contain', testTitle);
      cy.get('[data-testid="luigi-topnav-logo"]').should(
        'have.attr',
        'src',
        testLogo
      );
    });
  });

  it('Logout and login again', () => {
    cy.login('tets@email.com', 'tets');

    //logout
    cy.get('[data-testid="luigi-topnav-profile"]').click();
    cy.contains('End session').click();
    cy.get('[data-testid="logout-headline"]').should(
      'contain',
      'You have successfully logged out'
    );
    cy.get('[data-testid="logout-message"]').should(
      'contain',
      'Sign in again to continue working on awesome things!'
    );
    cy.expectPathToBe('/logout.html');

    //login again
    cy.contains('Re-Login').click();
    cy.get('body').should('contain', 'Login to Luigi sample app');
    cy.login('tets@email.com', 'tets');
  });
});

describe('TopNavDropDown', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });
  context('Desktop', () => {
    beforeEach(() => {
      // run these tests as if in a desktop
      cy.viewport('macbook-15');
    });

    it('Clicking around drop down in TopNav', () => {
      //check if google is there
      cy.get('[data-testid="misc"]').click();

      cy.get('[data-testid="opengoogleinthistab"]').contains(
        'Open Google in this tab'
      );

      cy.get('[data-testid="all-users_visibleforallusers"]')
        .contains('Visible for all users')
        .click();

      cy.expectPathToBe('/all-users');
    });
  });

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
    });

    it('Should be able to select product', () => {
      cy.get('[data-testid="mobile-menu"]').click();

      //open mobile topnav dropdown
      cy.get(
        '[data-e2e="mobile-topnav-dropdown-category"][title="Misc"]'
      ).click();

      cy.get('[data-e2e="mobile-topnav-dropdown-item"]')
        .contains('Visible for all users')
        .click();

      cy.expectPathToBe('/all-users');
    });

    it('Should be able to close', () => {
      cy.get('[data-testid="mobile-menu"]').click();

      //open mobile topnav dropdown
      cy.get(
        '[data-e2e="mobile-topnav-dropdown-category"][title="Misc"]'
      ).click();

      //close mobile topnav dropdown
      cy.get('[data-testid="mobile-topnav-dropdown-close"]').click();

      //no mobile topnav dropdown is visible
      cy.get('.fd-product-switcher').should('not.be.visible');

      //the path wasn't changed
      cy.expectPathToBe('/overview');
    });
  });
});
