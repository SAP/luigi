describe('SplitView', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('tets@email.com', 'tets');
  });

  it('Opens a Split View and collapses and expands', () => {
    cy.get('iframe').then($iframe => {
      const $iframeBody = $iframe.contents().find('body');
      cy.goToLinkManagerMethods($iframeBody);

      //navigate using absolute path
      cy.wrap($iframeBody)
        .contains('linkManager()')
        .click();
      cy.expectPathToBe('/projects/pr2');

      cy.wrap($iframeBody)
        .contains('open view in split view')
        .click();
      cy.expectPathToBe('/projects/pr2');

      cy.get('.iframeSplitViewCnt iframe').then($splitIframe => {
        const $splitIframeBody = $splitIframe.contents().find('body');
        cy.log(JSON.stringify($splitIframeBody, null, 2));

        cy.wrap($splitIframeBody)
          .find('h1')
          .first()
          .should('contain', 'Global Settings');

        // Hover does not exist and mouseover does not work:
        // https://docs.cypress.io/api/commands/hover.html#Workarounds
        // cy.get('#splitViewDragger').trigger('mouseover');

        cy.get('.lui-collapse-btn').click({ force: true });

        cy.get('.iframeSplitViewCnt iframe').should('not.exist');

        cy.get('.fd-splitView__title').should('contain', 'Logs');

        cy.get('.lui-collapse-btn').click({ force: true });
      });

      cy.get('.iframeSplitViewCnt iframe').should('exist');
    });
  });
});
