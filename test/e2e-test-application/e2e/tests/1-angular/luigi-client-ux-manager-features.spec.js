describe('Luigi Client ux manager features', () => {
  let $iframeBody;
  beforeEach(() => {
    //"clear" variables to make sure they are not reused and throw error in case something goes wrong
    $iframeBody = undefined;
    cy.visitLoggedIn('/');

    cy.getIframeBody().then(result => {
      $iframeBody = result;
    });
  });

  describe('uxManager', () => {
    it('backdrop', () => {
      cy.wait(500);
      cy.goToUxManagerMethods($iframeBody);
      cy.wrap($iframeBody).should('not.contain', 'Lorem tipsum dolor sit amet');
      cy.get('.lui-backdrop').should('not.exist');

      //open modal with backdrop
      cy.wrap($iframeBody)
        .contains('Add backdrop')
        .click();

      cy.wrap($iframeBody).should('contain', 'Lorem tipsum dolor sit amet');
      cy.get('.lui-backdrop').should('exist');
      //close modal
      cy.wrap($iframeBody)
        .find('.fd-dialog__footer')
        .contains('Confirm')
        .click();

      cy.wrap($iframeBody).should('not.contain', 'Lorem tipsum dolor sit amet');
      cy.get('.lui-backdrop').should('not.exist');
    });

    it('Luigi Client generic confirmation modal', () => {
      cy.goToUxManagerMethods($iframeBody);

      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');

      cy.wrap($iframeBody)
        .find('[data-testid=show-luigi-confirmation-modal]')
        .click();
      cy.get('[data-testid=luigi-confirmation-modal]').should('be.visible');
      cy.get('.sap-icon--question-mark').should('be.visible');

      cy.get('[data-testid=luigi-modal-dismiss]').click();
      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');
      cy.get('.sap-icon--question-mark').should('not.be.visible');
      cy.wrap($iframeBody)
        .find('[data-testid=luigi-confirmation-modal-result]')
        .contains('Luigi confirmation modal has been dismissed');

      cy.wrap($iframeBody)
        .find('[data-testid=show-luigi-confirmation-modal]')
        .click();
      cy.get('[data-testid=luigi-confirmation-modal]').should('be.visible');

      cy.get('[data-testid=luigi-modal-confirm]').click();
      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');
      cy.wrap($iframeBody)
        .find('[data-testid=luigi-confirmation-modal-result]')
        .contains('Luigi confirmation modal has been confirmed');
    });

    it('Luigi Client confirmation modal with warning type', () => {
      cy.goToUxManagerMethods($iframeBody);

      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');

      cy.wrap($iframeBody)
        .find('[data-testid=show-luigi-warning-modal]')
        .click();
      cy.get('[data-testid=luigi-confirmation-modal]').should('be.visible');
      cy.get('.sap-icon--message-warning').should('be.visible');
      cy.get('.luigi-modal-confirm').should('not.be.visible');
      cy.get('.fd-message-box__body')
        .get('b')
        .should('be.visible');
      cy.get('.fd-message-box__body')
        .get('mark')
        .should('be.visible');

      cy.get('[data-testid=luigi-modal-dismiss]').click();
      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');
      cy.get('.sap-icon--message-warning').should('not.be.visible');
    });

    it('Close Luigi Client generic confirmation modal by esc keypress', () => {
      cy.goToUxManagerMethods($iframeBody);

      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');
      cy.wrap($iframeBody)
        .find('[data-testid=show-luigi-confirmation-modal]')
        .click();
      cy.get('[data-testid=luigi-confirmation-modal]').should('be.visible');

      cy.get('[data-testid=luigi-modal-dismiss]').trigger('keydown', {
        keyCode: 27,
        which: 27
      });
      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');
      cy.wrap($iframeBody)
        .find('[data-testid=luigi-confirmation-modal-result]')
        .contains('Luigi confirmation modal has been dismissed');
    });

    it(
      'loading indicator',
      {
        retries: {
          runMode: 3,
          openMode: 3
        }
      },
      () => {
        cy.get('[data-testid="misc"]').click();

        cy.get('[data-testid="ext_externalpage"]')
          .contains('External Page')
          .click();

        cy.get('[data-testid=luigi-loading-spinner]').should('exist');

        cy.wait(250); // give it some time to hide

        cy.get('[data-testid=luigi-loading-spinner]').should('not.be.visible');

        // show loading indicator
        cy.getIframeBody().then($iframeBody => {
          cy.wrap($iframeBody)
            .contains('Show loading indicator')
            .click();

          cy.get('[data-testid=luigi-loading-spinner]').should('exist');
          cy.wait(250); // give it some time to hide
          // wait for programmatic hide of loading indicator
          cy.get('[data-testid=luigi-loading-spinner]').should('not.be.visible');
        });
      }
    );

    describe('Unsaved changes', () => {
      it("shouldn't proceed when 'No' was pressed in modal", () => {
        cy.wrap($iframeBody)
          .find('[data-testid=toggle-dirty-state]')
          .click();

        cy.goToProjectsPage();

        cy.get('[data-testid=luigi-confirmation-modal]').should('be.visible');

        cy.expectPathToBe('/overview'); //the location is unchanged

        cy.get('[data-testid=luigi-modal-dismiss]').click();

        cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');

        cy.expectPathToBe('/overview'); //the location is still unchanged after "No" clicked
      });

      it("should proceed when 'Yes' was pressed in modal", () => {
        cy.wrap($iframeBody)
          .find('[data-testid=toggle-dirty-state]')
          .click();

        cy.goToProjectsPage();

        cy.get('[data-testid=luigi-confirmation-modal]').should('be.visible');

        cy.expectPathToBe('/overview'); //the location is unchanged

        cy.get('[data-testid=luigi-modal-confirm]').click();

        cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');

        cy.expectPathToBe('/projects'); //the location is changed after "Yes" clicked
      });
    });
  });

  describe('Test if confirmation modal is visible', () => {
    it('Test confirmation modal opened from a modal', () => {
      let $iframeBody;
      cy.visit('/projects/pr1/');
      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');
      cy.get('.fd-app__sidebar').contains('Miscellaneous2').click();
      cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).should('contain', 'Misc 2 content');
        cy.wrap($iframeBody).contains('open confirmation modal').click();
      });
      cy.get('[data-testid=luigi-confirmation-modal]').should('be.visible');
      cy.get('.fd-message-box__body').should('contain', 'Just a confirmation modal');
      cy.get('[data-testid=luigi-modal-confirm]').click();
      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');
      cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).should('contain', 'Misc 2 content');
      });
    });

    it('Test confirmation modal opened from a drawer', () => {
      let $iframeBody;
      cy.visit('/projects/pr1/');
      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');
      cy.get('.fd-app__sidebar').contains('Drawer Example').click();
      cy.getIframeBody({}, 0, '.iframeModalCtn._drawer').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).should('contain', 'LuigiClient linkManager methods');
        cy.wrap($iframeBody).contains('open confirmation modal').click();
      });
      cy.get('[data-testid=luigi-confirmation-modal]').should('be.visible');
      cy.get('.fd-message-box__body').should('contain', 'Just a confirmation modal');
      cy.get('[data-testid=luigi-modal-confirm]').click();
      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');
      cy.getIframeBody({}, 0, '.iframeModalCtn._drawer').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).should('contain', 'LuigiClient linkManager methods');
      });
    });

    it('Test confirmation modal opened from modal from a drawer', () => {
      let $iframeBody;
      cy.visit('/projects/pr1/');
      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');
      cy.get('.fd-app__sidebar').contains('Drawer Example').click();
      cy.getIframeBody({}, 0, '.iframeModalCtn._drawer').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).should('contain', 'LuigiClient linkManager methods');
        cy.wrap($iframeBody).contains('open misc2 in modal').click();
      });
      cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).should('contain', 'Misc 2 content');
        cy.wrap($iframeBody).contains('open confirmation modal').click();
      });

      cy.get('[data-testid=luigi-confirmation-modal]').should('be.visible');
      cy.get('.fd-message-box__body').should('contain', 'Just a confirmation modal');
      cy.get('[data-testid=luigi-modal-confirm]').click();
      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');
      cy.getIframeBody({}, 0, '.iframeModalCtn._drawer').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).should('contain', 'LuigiClient linkManager methods');
      });
    });
  });
});
