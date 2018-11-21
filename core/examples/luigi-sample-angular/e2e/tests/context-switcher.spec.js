describe('Context switcher', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.login('tets@email.com', 'tets');
  });

  it('Clicking around the context switcher', () => {
    // default label
    cy.get('.context-switcher')
      .contains('Select Environment ...')
      .click();

    // click an action
    cy.get('.context-switcher .fd-popover__body')
      .contains('New Environment (bottom)')
      .click();

    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/create-environment');
    });

    // default label
    cy.get('.context-switcher')
      .contains('Select Environment ...')
      .click();

    // click an action
    cy.get('.context-switcher .fd-popover__body')
      .contains('Environment 1')
      .click();

    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/environments/env1');
    });

    // check label
    cy.get('.context-switcher .fd-popover__control button').should(
      'contain',
      'Environment 1'
    );

    // Overview
    cy.goToOverviewPage();

    // check label
    cy.get('.context-switcher .fd-popover__control button').should(
      'contain',
      'Select Environment ...'
    );
  });
});
