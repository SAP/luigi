describe('Navigation', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('url'));
  });
  describe('iFrame check', () => {
    it('Check if iFrame exists in running application.', () => {
      cy.wait(5000);
      cy.get('ui5-dance-module');
    });
  });
});
