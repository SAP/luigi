describe('addBackdrop, removeBackdrop', () => {
  beforeEach(() => {
    newConfig.tag = 'addBackdrop';
  });
  it('addBackDrop', () => {
    let $iframeBody;
    cy.visitTestApp('/home/one', newConfig);
    cy.get('#app[configversion="addBackdrop"]');
    cy.get('.lui-backdrop').should('not.exist');
    cy.getIframeBody({}, 0, '.iframeContainer').then((result) => {
      $iframeBody = result;
      cy.wrap($iframeBody).find('.addBackdrop').contains('add backdrop').click();
    });
    cy.get('.lui-backdrop').should('exist');
    cy.get('[data-testid="home_home"]').then(($btn) => {
      cy.get('.lui-backdrop').then(($overlay) => {
        const btnRect = $btn[0].getBoundingClientRect();
        const overlayRect = $overlay[0].getBoundingClientRect();

        expect(overlayRect.top).to.be.at.most(btnRect.top);
        expect(overlayRect.left).to.be.at.most(btnRect.left);
        expect(overlayRect.bottom).to.be.at.least(btnRect.bottom);
        expect(overlayRect.right).to.be.at.least(btnRect.right);
      });
    });

    cy.getIframeBody({}, 0, '.iframeContainer').then((result) => {
      $iframeBody = result;
      cy.wrap($iframeBody).find('.removeBackdrop').contains('remove backdrop').click();
    });
    cy.get('.lui-backdrop').should('not.exist');
  });
});
