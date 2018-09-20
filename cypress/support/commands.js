// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

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
