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
        cy.window().then(win => {
          const config = win.Luigi.getConfig();
          config.routing.showModalPathInUrl = true;
          win.Luigi.configChanged('routing');
        });
      });
    });

    it('update modalPath fromClosestContext', () => {
      cy.expectPathToBe('/projects/pr2');

      cy.wrap($iframeBody)
        .find('[data-testid=open-modal-virtual-tree]')
        .click();

      cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).contains('Settings of pr2');

        cy.expectSearchToBe('?modal=%2Fprojects%2Fpr2%2Fdevelopers%2Finternal%2FvirtualTree&historyState=4');
        cy.wrap($iframeBody)
          .find('[data-testid=update-modal-path-closest-context]')
          .click();

        cy.expectSearchToBe('?modal=%2Fprojects%2Fpr2%2Fxyz&historyState=4');
      });
    });
  });
});
