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
  cy.get('.fd-shellbar').contains('Overview');
  cy.expectPathToBe('/overview');
});

Cypress.Commands.add('goToFeaturesPage', iframe => {
  cy.wrap(iframe)
    .contains('linkManager()')
    .click();
  cy.expectPathToBe('/projects/pr2');

  cy.wrap(iframe).should('contain', 'LuigiClient uxManager methods:');
  cy.wrap(iframe).should('contain', 'LuigiClient linkManager methods:');
});

Cypress.Commands.add('goToOverviewPage', () => {
  cy.get('button')
    .contains('Overview')
    .click();
});

Cypress.Commands.add('expectPathToBe', pathWithoutHash => {
  const appWindow = cy.state('window');
  const { useHashRouting } =
    appWindow && appWindow.Luigi && appWindow.Luigi.config
      ? appWindow.Luigi.config.routing
      : false;

  // notice that location.hash DOES keep url params ('?a=b') while location.pathname does NOT
  return cy.location().should(location => {
    const actualPath = useHashRouting ? location.hash : location.pathname;
    const pathToCheck = useHashRouting
      ? '#' + pathWithoutHash
      : pathWithoutHash;
    expect(actualPath).to.eq(pathToCheck);
  });
});
