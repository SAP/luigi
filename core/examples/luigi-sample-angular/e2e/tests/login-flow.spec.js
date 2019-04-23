describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login', () => {
    cy.login('tets@email.com', 'tets');
  });

  it('Username in profile dropdown', () => {
    cy.login('tets@email.com', 'tets');

    cy.get('.sap-icon--customer').click();
    cy.get('.fd-menu__item').should('contain', 'Luigi User');
  });

  it('Logout and login again', () => {
    cy.login('tets@email.com', 'tets');

    //logout
    cy.get('.sap-icon--customer').click();
    cy.contains('Logout').click();
    cy.get('#headline').should('contain', 'You have successfully logged out');
    cy.get('#message').should(
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
