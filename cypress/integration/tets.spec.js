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

  describe('Navigation', () => {
    it('Click around using navigation', () => {
      cy.login('tets@email.com', 'tets');

      //overview page
      cy.get('.fd-global-nav').contains('Overview');
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/overview');
      });
      cy.get('.fd-ui__header')
        .contains('Projects')
        .click();

      //projects page
      cy.get('.fd-app__sidebar').should('contain', 'Project One');
      cy.get('.fd-app__sidebar').should('contain', 'Project Two');
      cy.get('.fd-app__sidebar')
        .contains('Project One')
        .click();

      //project one page
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/projects/pr1');
      });
      cy.get('.fd-app__sidebar').should('not.contain', 'Project One');
      cy.get('.fd-app__sidebar').should('contain', 'Miscellaneous2');
      cy.get('.fd-app__sidebar')
        .contains('Default Child Node Example')
        .click();

      //default child node example
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/projects/pr1/dps/dps2');
      });
      cy.get('.fd-app__sidebar').should('contain', 'First Child');
      cy.get('.fd-app__sidebar').should('contain', 'Second Child');
    });
  });

  describe('Luigi client features', () => {
    it('linkManager features', () => {
      cy.login('tets', 'tets');
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/overview');
      });

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
          .contains('with preserved view: project to settings and back')
          .click();
        cy.location().should(loc => {
          expect(loc.hash).to.eq('#/projects/pr2/settings');
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
      cy.location().should(loc => {
        expect(loc.hash).to.eq('#/overview');
      });

      //wait for the iFrame to be loaded
      cy.wait(3000);
      cy.get('iframe').then($iframe => {
        const $iframeBody = $iframe.contents().find('body');
        cy.goToFeaturesPage($iframeBody);
        cy.wrap($iframeBody).should(
          'not.contain',
          'Lorem tipsum dolor sit amet'
        );
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
        cy.wrap($iframeBody).should(
          'not.contain',
          'Lorem tipsum dolor sit amet'
        );
        cy.get('.fd-ui__overlay').should('not.exist');
      });
    });
  });

  describe('Logout', () => {
    it('Logout and login again', () => {
      cy.login('tets@email.com', 'tets');

      //logout
      cy.get('.sap-icon--customer').click();
      cy.contains('Logout').click();
      cy.get('body').should('contain', 'Logout successful');
      cy.location().should(loc => {
        expect(loc.pathname).to.eq('/logout.html');
      });

      //login again
      cy.contains('Login again').click();
      cy.get('body').should('contain', 'Login to Luigi sample app');
    });
  });
});
