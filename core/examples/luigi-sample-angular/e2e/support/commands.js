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

Cypress.Commands.add('goToUxManagerMethods', iframe => {
  cy.wrap(iframe)
    .contains('uxManager()')
    .click();

  cy.expectPathToBe('/projects/pr1');

  cy.wrap(iframe).should('contain', 'LuigiClient uxManager methods');
});

Cypress.Commands.add('goToLinkManagerMethods', iframe => {
  cy.wait(0);
  cy.wrap(iframe)
    .contains('linkManager()')
    .click();

  cy.expectPathToBe('/projects/pr2');
  cy.wrap(iframe).should('contain', 'LuigiClient linkManager methods');
});

Cypress.Commands.add('goToOverviewPage', () => {
  cy.get('button')
    .contains('Overview')
    .click();
});

Cypress.Commands.add('goToProjectsPage', () => {
  cy.get('button')
    .contains('Projects')
    .click();
});

Cypress.Commands.add('selectContextSwitcherItem', (item, currentLabel) => {
  // default label
  cy.get('.fd-product-menu')
    .contains(currentLabel || 'Select Environment ...')
    .click();

  // click an action
  cy.get('.fd-product-menu .fd-popover__body')
    .contains(item)
    .click();
});

const isHashRoutingOn = () => {
  const appWindow = cy.state('window');
  const { useHashRouting } =
    appWindow && appWindow.Luigi && appWindow.Luigi.config
      ? appWindow.Luigi.config.routing
      : false;
  return useHashRouting;
};

Cypress.Commands.add('expectPathToBe', (pathWithoutHash, timeout = undefined) =>
  cy.location({ timeout }).should(location => {
    const useHashRouting = isHashRoutingOn();
    const actualPath = useHashRouting ? location.hash : location.pathname;
    const pathToCheck = useHashRouting
      ? '#' + pathWithoutHash
      : pathWithoutHash;
    expect(actualPath).to.eq(pathToCheck);
  })
);

Cypress.Commands.add('expectSearchToBe', (searchString, a) => {
  // notice that location.hash DOES keep url params ('?a=b') while location.pathname does NOT
  cy.location().should(locationContext => {
    const useHashRouting = isHashRoutingOn();
    const actualPath = useHashRouting
      ? locationContext.hash
      : locationContext.pathname;
    if (useHashRouting) {
      expect('?' + actualPath.split('?')[1]).to.eq(searchString);
    } else {
      expect(locationContext.search).to.eq(searchString);
    }
  });
});
