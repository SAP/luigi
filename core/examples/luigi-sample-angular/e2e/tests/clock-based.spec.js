Cypress.env('RETRIES', 1);
describe('Clock based tests', () => {
  beforeEach(() => {
    cy.clock(null, ['setInterval']);
    cy.visitLoggedIn('/');
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

      cy.tick(11e3);

      cy.wrap($iframeBody)
        .contains('Update Header Navigation')
        .scrollIntoView()
        .click();

      // cy.wait(100);
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
