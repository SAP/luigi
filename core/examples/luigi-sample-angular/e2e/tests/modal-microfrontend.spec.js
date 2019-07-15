describe('Modal Microfrontend', () => {
  let iframeBody;
  beforeEach(() => {
    cy.visit('/');
    cy.login('tets', 'tets');

    //wait for the iFrame to be loaded
    cy.get('iframe', { timeout: 1000 }).then(ifr => {
      iframeBody = ifr.contents().find('body');
    });
  });

  describe('Behaviour when used in LinkManager', () => {
    beforeEach(() => {
      cy.goToLinkManagerMethods(iframeBody);
    });

    it(`doesn't change URL when opened`, () => {
      cy.expectPathToBe('/projects/pr2');

      cy.wrap(iframeBody)
        .contains('rendered in a modal')
        .click();

      cy.expectPathToBe('/projects/pr2');
    });

    it(`can be closed by Close Button`, () => {
      cy.wrap(iframeBody)
        .contains('rendered in a modal')
        .click();

      cy.wrap(iframeBody)
        .get('[data-e2e=modal-mf]')
        .should('be.visible');

      cy.wrap(iframeBody)
        .get('[data-e2e=modal-mf] [aria-label=close]')
        .click();

      cy.wrap(iframeBody)
        .get('[data-e2e=modal-mf]')
        .should('not.be.visible');
    });

    it(`sets proper URL inside iframe`, () => {
      cy.wrap(iframeBody)
        .contains('rendered in a modal')
        .click();

      cy.get('[data-e2e=modal-mf] iframe').then(ifr => {
        expect(ifr.attr('src')).to.equal('/sampleapp.html#/settings');
      });
    });

    it(`has the size set directly`, () => {
      cy.wrap(iframeBody)
        .contains('rendered in a modal')
        .click();

      cy.get('[data-e2e=modal-mf]').then(modal => {
        expect(modal.attr('style')).to.contain('width:');
        expect(modal.attr('style')).to.contain('size:');
      });
    });

    it(`go back closes the modal`, () => {
      cy.wrap(iframeBody)
        .contains('rendered in a modal')
        .click();

      cy.get('[data-e2e=modal-mf] iframe')
        .iframe()
        .then(modal => {
          cy.wrap(modal)
            .contains('Go back')
            .click();
        });

      cy.expectPathToBe('/projects/pr2');
    });
  });
});
