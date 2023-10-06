describe('Client-support-angular-lib', () => {
  describe('context', () => {
    it('getContextAsync', () => {
      cy.visitLoggedIn('/projects/pr1/developers');
      cy.getIframeBody().then($iframeBody => {
        cy.wrap($iframeBody)
          .find('.contextAsyncBtn')
          .click();
        cy.wrap($iframeBody)
          .find('.contextAsync')
          .contains('pr1');
      });
    });
  });
});
