describe('Luigi Client linkManager Modal', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });
  describe('linkManager open multiple modals: keepPrevious=true', () => {
    let $iframeBody;
    beforeEach(() => {
      cy.getIframeBody().then(result => {
        $iframeBody = result;
        cy.goToLinkManagerMethods($iframeBody);
      });
    });
    it('multiple modals back and forth', () => {
      cy.expectPathToBe('/projects/pr2');

      cy.wrap($iframeBody)
        .find('[data-testid=open-modal-to-settings-fullscreen]')
        .click();

      // first modal - fullscreen
      cy.getIframeBody({}, 0, '[modal-container-index=0]').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).contains('Settings of pr2');

        cy.expectPathToBe('/projects/pr2');

        cy.wrap($iframeBody)
          .find('[data-testid=open-modal-pr2-large]')
          .click();

        // second modal - large
        cy.getIframeBody({}, 0, '[modal-container-index=1]').then(result => {
          $iframeBody = result;
          cy.wrap($iframeBody).contains('LuigiClient linkManager methods');

          cy.wrap($iframeBody)
            .find('[data-testid=open-modal-to-settings-medium]')
            .click();

          // thrid modal - medium
          cy.getIframeBody({}, 0, '[modal-container-index=2]').then(result => {
            $iframeBody = result;
            cy.wrap($iframeBody).contains('Settings of pr2');

            cy.wrap($iframeBody)
              .find('[data-testid=open-modal-pr2-s]')
              .click();

            // fourth modal - small
            cy.getIframeBody({}, 0, '[modal-container-index=3]').then(result => {
              $iframeBody = result;
              cy.wrap($iframeBody).contains('LuigiClient linkManager methods');
            });
          });
        });
      });
    });
  });
});
