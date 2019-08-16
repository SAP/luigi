Cypress.env('RETRIES', 2);
describe('Clock based tests', () => {
  beforeEach(() => {
    cy.clock(null, ['setInterval']);
    cy.visit('/');
    cy.tick(3000);
    cy.login('tets@email.com', 'tets');
  });

  it('Triggers badge count update with Core Api', () => {
    cy.getIframeBody().then($iframeBody => {
      const initialBadgeCount = Cypress.$(
        "button[title='Messages'] .fd-counter--notification"
      ).text();
      cy.log('initial badge count: ' + initialBadgeCount);
      cy.get("button[title='Messages'] .fd-counter--notification").should(
        'contain',
        initialBadgeCount
      );

      cy.tick(10000);

      cy.wrap($iframeBody)
        .contains('Update Header Navigation')
        .click();

      cy.log('clicked updateHeaderNavigation');

      cy.get("button[title='Messages'] .fd-counter--notification").should(
        'not.contain',
        initialBadgeCount
      );
      cy.get("button[title='Messages'] .fd-counter--notification").should(
        'contain',
        9
      );
    });
  });
});
