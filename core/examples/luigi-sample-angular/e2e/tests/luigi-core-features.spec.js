describe('Luigi core features', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.login('tets', 'tets');

    //wait for the iFrame to be loaded
    cy.wait(1000);
  });

  it("shouldn't proceed redirection when page is dirty", () => {
    cy.get('iframe').then($iframe => {
      const $iframeBody = $iframe.contents().find('body');

      //navigate using absolute path
      cy.wrap($iframeBody)
        .contains('unsaved changes')
        .click();
      cy.get('button')
        .contains('Projects')
        .click();

      cy.get('.fd-modal').should('be.visible');

      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/overview'); //the location is unchanged
      });

      cy.get('.fd-modal__actions button')
        .contains('No')
        .click();

      cy.get('.fd-modal').should('not.be.visible');

      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/overview'); //the location is still unchanged after "No" clicked
      });
    });
  });
  it('should proceed redirection when page is dirty & modal is confirmed', () => {
    cy.get('iframe').then($iframe => {
      const $iframeBody = $iframe.contents().find('body');

      //navigate using absolute path
      cy.wrap($iframeBody)
        .contains('unsaved changes')
        .click();
      cy.get('button')
        .contains('Projects')
        .click();

      cy.get('.fd-modal').should('be.visible');

      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/overview'); //the location is unchanged
      });

      cy.get('.fd-modal__actions button')
        .contains('Yes')
        .click();

      cy.get('.fd-modal').should('not.be.visible');

      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/projects');
      });
    });
  });
});
