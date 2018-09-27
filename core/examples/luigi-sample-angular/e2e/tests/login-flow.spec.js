describe('Luigi Sample Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  describe('Login Flow', () => {
    it('Login', () => {
      cy.login('tets@email.com', 'tets');
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/overview');
      });
    });

    it('Logout and login again', () => {
      cy.login('tets@email.com', 'tets');

      //logout
      cy.get('.sap-icon--action-settings').click();
      cy.contains('Logout').click();
      cy.get('body').should('contain', 'Logout successful');
      cy.location().should(loc => {
        expect(loc.pathname).to.eq('/logout.html');
      });

      //login again
      cy.contains('Login again').click();
      cy.get('body').should('contain', 'Login to Luigi sample app');
      cy.login('tets@email.com', 'tets');
    });
  });
});
