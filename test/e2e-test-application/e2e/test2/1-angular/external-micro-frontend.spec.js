Cypress.env('RETRIES', 1);
describe('Navigation', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });
  describe('Normal navigating', () => {
    it('Check if external micro frontend is available and  by open an alert.', () => {
      cy.visit('/projects/pr1/externalmf');
      cy.wait(1000);
      cy.get('[data-testid=luigi-alert]').should(
        'have.class',
        'fd-message-strip--success'
      );
    });
  });
});
