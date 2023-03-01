describe('Navigation', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });
  describe('Normal navigating', () => {
    it('Check if external micro frontend is available and an alert will be shown.', () => {
      cy.visit('/projects/pr1/externalmf');
      cy.wait(5000);
      cy.get('[data-testid=luigi-alert]').contains('This is just a test alert for external micro frontend.');
      cy.get('[data-testid=luigi-alert]').should('have.class', 'fd-message-strip--success');
    });
  });
});
