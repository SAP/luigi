context('Luigi Sample Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
  });

  it('Login', () => {
    cy.login('tets@email.com', 'tets');
    cy.get('.fd-global-nav').contains('Overview');
    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/overview');
    });
  });

  it('Go to subpage with uxManager features', () => {
    cy.login('tets', 'tets');
    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/overview');
    });
    cy.wait(3000);
    cy.get('iframe').then($iframe => {
      const $iframeBody = $iframe.contents().find('body');
      cy.wrap($iframeBody)
        .contains('uxManager()')
        .click();
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/projects/pr2');
      });
      cy.wait(2000);
      cy.wrap($iframeBody).should('contain', 'LuigiClient uxManager methods:');
      cy.wrap($iframeBody).should(
        'contain',
        'LuigiClient linkManager methods:'
      );
      cy.wrap($iframeBody)
        .contains('absolute: to overview')
        .click();
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/overview');
      });
    });
  });
});
