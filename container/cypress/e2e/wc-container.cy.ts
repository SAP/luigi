describe('General Test', () => {
  it('Test App Runs', () => {
    cy.visit('http://localhost:8080');
    cy.visit('http://localhost:8080/#hello-world-wc');
    cy.get('[data-test-id="luigi-client-api-test-01"]')
      .shadow()
      .contains('Click me')
      .click();
  });
});
