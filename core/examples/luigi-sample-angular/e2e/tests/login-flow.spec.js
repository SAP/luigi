describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login', () => {
    cy.login('tets@email.com', 'tets');
  });

  it('Username in profile dropdown', () => {
    cy.login('tets@email.com', 'tets');

    cy.get('[data-e2e="luigi-topnav-profile"]').click();
    cy.get('[data-e2e="luigi-topnav-profile-username"]').should(
      'contain',
      'Luigi User'
    );
  });

  it('Link in profile dropdown', () => {
    cy.login('tets@email.com', 'tets');

    cy.get('[data-e2e="luigi-topnav-profile"]').click();
    cy.get('[data-e2e="luigi-topnav-profile-item"]')
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

    cy.get('[data-e2e="luigi-topnav-profile"]').click();
    cy.get('[data-e2e="luigi-topnav-profile-item"]').should(
      'not.contain',
      'Project 1'
    );

    // add project
    cy.selectContextSwitcherItem('New Project');
    cy.expectPathToBe('/projects');

    cy.get('[data-e2e="luigi-topnav-profile-item"]').should(
      'contain',
      'Project 1'
    );
  });

  it('Logout and login again', () => {
    cy.login('tets@email.com', 'tets');

    //logout
    cy.get('[data-e2e="luigi-topnav-profile"]').click();
    cy.contains('End session').click();
    cy.get('[data-e2e="logout-headline"]').should(
      'contain',
      'You have successfully logged out'
    );
    cy.get('[data-e2e="logout-message"]').should(
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
