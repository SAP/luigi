describe('Context switcher', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('tets@email.com', 'tets');
  });

  it('Clicking around the context switcher', () => {
    // default label
    cy.get('.fd-product-menu')
      .contains('Select Environment ...')
      .click();

    // click an action
    cy.get('.fd-product-menu .fd-popover__body')
      .contains('New Environment (top)')
      .click();

    cy.expectPathToBe('/create-environment');

    // default label
    cy.get('.fd-product-menu')
      .contains('Select Environment ...')
      .click();

    // click an action
    cy.get('.fd-product-menu .fd-popover__body')
      .contains('Environment 1')
      .click();

    cy.expectPathToBe('/environments/env1');

    // check label
    cy.get('.fd-product-menu .fd-popover__control button').should(
      'contain',
      'Environment 1'
    );

    // Overview
    cy.goToOverviewPage();

    cy.get('[data-cy=luigi-alert]').should('not.exist');

    // check label
    cy.get('.fd-product-menu .fd-popover__control button').should(
      'contain',
      'Select Environment ...'
    );

    cy.get('.fd-product-menu')
      .contains('Select Environment ...')
      .click();

    // click an action
    cy.get('.fd-product-menu .fd-popover__body')
      .contains('New Environment (bottom)')
      .click();

    cy.get('[data-cy=luigi-alert]').should(
      'have.class',
      'fd-alert--information'
    );

    cy.get('[data-cy=luigi-alert-dismiss]').click();
    cy.get('[data-cy=luigi-alert]').should('not.exist');
  });
});
