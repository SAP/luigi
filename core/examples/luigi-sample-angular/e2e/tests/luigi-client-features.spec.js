describe('Luigi client features', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('linkManager features', () => {
    cy.login('tets', 'tets');

    //wait for the iFrame to be loaded
    cy.wait(3000);
    cy.get('iframe').then($iframe => {
      const $iframeBody = $iframe.contents().find('body');
      cy.goToFeaturesPage($iframeBody);

      //navigate using absolute path
      cy.wrap($iframeBody)
        .contains('absolute: to overview')
        .click();
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/overview');
      });
      cy.goToFeaturesPage($iframeBody);

      //navigate using relative path
      cy.wrap($iframeBody)
        .contains('relative: to stakeholders')
        .click();
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/projects/pr2/users/groups/stakeholders');
      });
      cy.goToOverviewPage();
      cy.goToFeaturesPage($iframeBody);

      //navigate using closest context
      cy.wrap($iframeBody)
        .contains('closest parent: to stakeholders')
        .click();
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/projects/pr2/users/groups/stakeholders');
      });
      cy.goToOverviewPage();
      cy.goToFeaturesPage($iframeBody);

      //navigate using context
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

      //navigate with params
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

      //don't navigate
      cy.wrap($iframeBody)
        .contains('parent by name: with nonexisting context')
        .click();
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/projects/pr2');
      });

      //navigate with preserve view functionality
      cy.wrap($iframeBody)
        .contains('with preserved view: project to global settings and back')
        .click();
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/settings');
      });

      //wait for the second iFrame to be loaded
      cy.wait(1000);
      cy.get('iframe')
        .first()
        .then($preserveViewiFrame => {
          const $preserveViewiFrameBody = $preserveViewiFrame
            .contents()
            .find('body');
          cy.wrap($preserveViewiFrameBody)
            .find('input')
            .clear()
            .type('tets');
          cy.wrap($preserveViewiFrameBody)
            .find('button')
            .click();
          cy.location().should(loc => {
            expect(loc.hash).to.eq('#/projects/pr2');
          });
        });
    });
  });

  it('uxManager features', () => {
    cy.login('tets', 'tets');

    //wait for the iFrame to be loaded
    cy.wait(3000);
    cy.get('iframe').then($iframe => {
      const $iframeBody = $iframe.contents().find('body');
      cy.goToFeaturesPage($iframeBody);
      cy.wrap($iframeBody).should('not.contain', 'Lorem tipsum dolor sit amet');
      cy.get('.fd-ui__overlay').should('not.exist');

      //open modal with backdrop
      cy.wrap($iframeBody)
        .contains('Add backdrop')
        .click();
      cy.wrap($iframeBody).should('contain', 'Lorem tipsum dolor sit amet');
      cy.get('.fd-ui__overlay').should('exist');

      //close modal
      cy.wrap($iframeBody)
        .contains('Confirm')
        .click();
      cy.wrap($iframeBody).should('not.contain', 'Lorem tipsum dolor sit amet');
      cy.get('.fd-ui__overlay').should('not.exist');
    });
  });
});
