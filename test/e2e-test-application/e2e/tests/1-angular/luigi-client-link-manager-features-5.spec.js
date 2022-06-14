describe('Luigi Client linkManager Modal', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });

  describe('linkManager updateModalPathInternalNavigation', () => {
    let $iframeBody;
    beforeEach(() => {
      cy.getIframeBody().then(result => {
        $iframeBody = result;
        cy.goToLinkManagerMethods($iframeBody);
      });
    });
    it('updateModalPathInternalNavigation', () => {
      cy.expectPathToBe('/projects/pr2');

      cy.wrap($iframeBody)
        .find('[data-testid=open-modal-virtual-tree]')
        .click();

      cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).contains('Settings of pr2');
      });
    });
  });
});
