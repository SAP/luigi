describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login', () => {
    cy.login('tets@email.com', 'tets');
  });

  it('Logout and login again', () => {
    cy.login('tets@email.com', 'tets');

    //logout
    cy.get('.sap-icon--customer').click();
    cy.contains('Logout').click();
    cy.get('body').should('contain', 'Logout successful');
    cy.expectPathToBe('/logout.html');

    //login again
    cy.contains('Login again').click();
    cy.get('body').should('contain', 'Login to Luigi sample app');
    cy.login('tets@email.com', 'tets');
  });
});
