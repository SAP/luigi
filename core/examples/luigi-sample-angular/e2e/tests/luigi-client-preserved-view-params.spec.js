Cypress.env('RETRIES', 1);
describe('Go back with param data', () => {
  let $iframeBody;
  let $inputTypeNormal = 'Buongiorno Luigi';
  let $inputTypeModal = 'Buona notte Luigi';
  beforeEach(() => {
    cy.visitLoggedIn('/projects/pr2');

    cy.getIframeBody().then(result => {
      $iframeBody = result;
    });
  });

  describe('Normal Preserved view go back test', () => {
    beforeEach(() => {
      cy.goToLinkManagerMethods($iframeBody);
    });

    it('goes to Settings and comes back with data', () => {
      cy.expectPathToBe('/projects/pr2');

      cy.wrap($iframeBody)
        .contains(' with params: project to global settings and back')
        .click();

      cy.expectPathToBe('/settings');

      cy.getIframeBody().then($body => {
        // type buongiorno into input
        console.log('Hello', $body);
        cy.wrap($body)
          .find('input')
          .clear()
          .type($inputTypeNormal);

        cy.wrap($body)
          .find('button')
          .click();

        cy.expectPathToBe('/projects/pr2');

        cy.wrap($iframeBody).should('contain', $inputTypeNormal);
      });
    });
  });

  describe('Modal Preserved view  go back test', () => {
    beforeEach(() => {
      cy.goToLinkManagerMethods($iframeBody);
    });

    it('goes to settings with modal and back with data', () => {
      cy.expectPathToBe('/projects/pr2');

      cy.wrap($iframeBody)
        .contains('rendered in a modal')
        .click();

      cy.get('[data-testid=modal-mf] iframe')
        .eq(0)
        .iframe()
        .then($modal => {
          cy.wrap($modal)
            .find('input')
            .clear()
            .type($inputTypeModal);

          cy.wrap($modal)
            .find('button')
            .click();
        });
      cy.wrap($iframeBody).should('contain', $inputTypeModal);
    });
  });
});
