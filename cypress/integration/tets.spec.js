describe('Luigi Sample Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
  });

  describe('Login', () => {
    it('Login', () => {
      cy.login('tets@email.com', 'tets');
      cy.get('.fd-global-nav').contains('Overview');
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/overview');
      });
    });
  });
  describe('Luigi client features', () => {
    it('linkManager features', () => {
      cy.login('tets', 'tets');
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/overview');
      });
      cy.wait(3000);
      cy.get('iframe').then($iframe => {
        const $iframeBody = $iframe.contents().find('body');
        //first
        cy.goToFeaturesPage($iframeBody);
        cy.wrap($iframeBody)
          .contains('absolute: to overview')
          .click();
        cy.location().should(loc => {
          expect(loc.hash).to.eq('#/overview');
        });
        //second
        cy.goToFeaturesPage($iframeBody);
        cy.wrap($iframeBody)
          .contains('relative: to stakeholders')
          .click();
        cy.location().should(loc => {
          expect(loc.hash).to.eq('#/projects/pr2/users/groups/stakeholders');
        });
        //third
        cy.goToOverviewPage();
        cy.goToFeaturesPage($iframeBody);
        cy.wrap($iframeBody)
          .contains('closest parent: to stakeholders')
          .click();
        cy.location().should(loc => {
          expect(loc.hash).to.eq('#/projects/pr2/users/groups/stakeholders');
        });
        //forth
        cy.goToOverviewPage();
        cy.goToFeaturesPage($iframeBody);
        cy.wrap($iframeBody)
          .contains('parent by name: project to settings')
          .click();
        cy.location().should(loc => {
          expect(loc.hash).to.eq('#/projects/pr2/settings');
        });
        cy.wrap($iframeBody).should('contain', 'Settings');
        cy.wrap($iframeBody)
          .contains('Click here')
          .click();
        cy.location().should(loc => {
          expect(loc.hash).to.eq('#/projects/pr2');
        });
        //fifth
        cy.wrap($iframeBody)
          .contains('project to settings with params (foo=bar)')
          .click();
        cy.wrap($iframeBody).should('contain', 'Called with params:');
        cy.wrap($iframeBody).should('contain', '"foo": "bar"');
        cy.location().should(loc => {
          expect(loc.hash).to.eq('#/projects/pr2/settings?~foo=bar&');
        });
        cy.wrap($iframeBody)
          .contains('Click here')
          .click();
        cy.location().should(loc => {
          expect(loc.hash).to.eq('#/projects/pr2');
        });
        //sixth
        cy.wrap($iframeBody)
          .contains('parent by name: with nonexisting context')
          .click();
        cy.location().should(loc => {
          expect(loc.hash).to.eq('#/projects/pr2');
        });
        //seventh
        cy.wrap($iframeBody)
          .contains('with preserved view: project to settings and back')
          .click();
        cy.location().should(loc => {
          expect(loc.hash).to.eq('#/projects/pr2/settings');
        });
        cy.wrap($iframeBody).should('contain', 'Settings');
        //   .clear()
        //   .type('test value');
        // cy.wrap($iframeBody)
        //   .contains('Click here')
        //   .click();
      });
    });
  });
});
