describe('Navigation', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });

  describe('Normal navigating', () => {
    it('Check if external micro frontend is available and an alert will be shown.', () => {
      cy.visit('/projects/pr1/externalmf');
      cy.get('[data-testid=luigi-alert]', { timeout: 5000 }).should('have.class', 'fd-message-strip--success');
      cy.get('[data-testid=luigi-alert]', { timeout: 5000 }).contains(
        'This is just a test alert for external micro frontend.'
      );
    });
  });
});
