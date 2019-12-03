Cypress.env('RETRIES', 1);
describe('Go back with param data', () => {
  let $iframeBody;
  let $stringBuongiorno = 'Buongiorno Luigi';
  beforeEach(() => {
    cy.visitLoggedIn('/projects/pr2');

    cy.getIframeBody().then(result => {
      $iframeBody = result;
    });
  });

  describe('Behaviour when passing to Settings from LinkManager', () => {
    beforeEach(() => {
      cy.goToLinkManagerMethods($iframeBody);
    });

    it(`changes url to settings`, () => {
      cy.expectPathToBe('/projects/pr2');

      cy.wrap($iframeBody)
        .contains(' with params: project to global settings and back')
        .click();

      cy.expectPathToBe('/settings');

      console.log($iframeBody);

      cy.getIframeBody().then($body => {
        // type buongiorno into input
        cy.wrap($body)
          .find('input')
          .clear()
          .type($stringBuongiorno);

        cy.wrap($body)
          .find('button')
          .click();

        cy.expectPathToBe('/projects/pr2');

        // buongiorno should be there when going back to pr2
        cy.wrap($iframeBody).should('contain', $stringBuongiorno);
      });
    });
  });
});
