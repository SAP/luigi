Cypress.Commands.add('login', (email, password) => {
  cy.get('.form-input')
    .first()
    .clear()
    .type('tets@email.com')
    .should('have.value', 'tets@email.com');

  cy.get('.form-input')
    .last()
    .clear()
    .type('tets')
    .should('have.value', 'tets');

  cy.get('#login-button').click();
  cy.get('.fd-global-nav').contains('Overview');
});

Cypress.Commands.add('goToFeaturesPage', iframe => {
  cy.wrap(iframe)
    .contains('linkManager()')
    .click();
  cy.location().should(loc => {
    expect(loc.hash).to.eq('#/projects/pr2');
  });
  cy.wrap(iframe).should('contain', 'LuigiClient uxManager methods:');
  cy.wrap(iframe).should('contain', 'LuigiClient linkManager methods:');
});

Cypress.Commands.add('goToOverviewPage', () => {
  cy.get('.fd-global-nav__product-name').click();
});
