describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login', () => {
    cy.login('tets@email.com', 'tets');
  });

  it('Username in profile dropdown', () => {
    cy.login('tets@email.com', 'tets');

    cy.get('[data-cy="luigi-topnav-profile"]').click();
    cy.get('[data-cy="luigi-topnav-profile-username"]').should(
      'contain',
      'Luigi User'
    );
  });

  it('Link in profile dropwdown', () => {
    cy.login('tets@email.com', 'tets');

    cy.get('[data-cy="luigi-topnav-profile"]').click();
    cy.get('[data-cy="luigi-topnav-profile-item"]')
      .contains('Project 1')
      .click();

    cy.expectPathToBe('/projects/pr1');
  });

  it('Logout and login again', () => {
    cy.login('tets@email.com', 'tets');

    //logout
    cy.get('[data-cy="luigi-topnav-profile"]').click();
    cy.contains('End session').click();
    cy.get('[data-cy="logout-headline"]').should(
      'contain',
      'You have successfully logged out'
    );
    cy.get('[data-cy="logout-message"]').should(
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
