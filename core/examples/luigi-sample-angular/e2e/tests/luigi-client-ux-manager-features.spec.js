describe('Luigi client ux manger features', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('tets', 'tets');

    //wait for the iFrame to be loaded
    cy.wait(1000);
  });

  describe('uxManager', () => {
    it('backdrop', () => {
      cy.wait(500);
      cy.get('iframe').then($iframe => {
        const $iframeBody = $iframe.contents().find('body');
        cy.goToUxManagerMethods($iframeBody);
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
          .find('.fd-modal__footer')
          .contains('Confirm')
          .click();

        cy.wrap($iframeBody).should(
          'not.contain',
          'Lorem tipsum dolor sit amet'
        );
        cy.get('.fd-ui__overlay').should('not.exist');
      });
    });

    it('confirmation modal', () => {
      cy.get('iframe').then($iframe => {
        const $iframeBody = $iframe.contents().find('body');

        cy.goToUxManagerMethods($iframeBody);

        cy.get('[data-cy=luigi-alert]').should('not.be.visible');

        cy.wrap($iframeBody)
          .find('[data-cy=show-luigi-confirmation-modal]')
          .click();
        cy.get('[data-cy=luigi-alert]').should('be.visible');

        cy.get('[data-cy=luigi-modal-dismiss]').click();
        cy.get('[data-cy=luigi-alert]').should('not.be.visible');
        cy.wrap($iframeBody)
          .find('[data-cy=luigi-confirmation-modal-result]')
          .contains('Luigi confirmation modal has been dismissed');

        cy.wrap($iframeBody)
          .find('[data-cy=show-luigi-confirmation-modal]')
          .click();
        cy.get('[data-cy=luigi-alert]').should('be.visible');

        cy.get('[data-cy=luigi-modal-confirm]').click();
        cy.get('[data-cy=luigi-alert]').should('not.be.visible');
        cy.wrap($iframeBody)
          .find('[data-cy=luigi-confirmation-modal-result]')
          .contains('Luigi confirmation modal has been confirmed');
      });
    });

    it('loading indicator', () => {
      cy.get('.fd-shellbar')
        .contains('External Page')
        .click();

      cy.get('.spinnerContainer .fd-spinner').should('exist');

      cy.get('.spinnerContainer .fd-spinner').should('not.exist');

      cy.wait(250);
      cy.get('iframe').then($iframe => {
        const $iframeBody = $iframe.contents().find('body');

        // show loading indicator
        cy.wrap($iframeBody)
          .contains('Show loading indicator')
          .click();

        cy.get('.spinnerContainer .fd-spinner').should('exist');

        // wait for programmatic hide of loading indicator
        cy.get('.spinnerContainer .fd-spinner').should('not.exist');
      });
    });

    it("Unsaved changes - shouldn't proceed when 'No' was pressed in modal", () => {
      cy.get('iframe').then($iframe => {
        const $iframeBody = $iframe.contents().find('body');

        cy.wrap($iframeBody)
          .find('[data-cy=toggle-dirty-state]')
          .check();

        cy.get('button')
          .contains('Projects')
          .click();

        cy.get('[data-cy=luigi-confirmation-modal]').should('be.visible');

        cy.expectPathToBe('/overview'); //the location is unchanged

        cy.get('[data-cy=luigi-modal-dismiss]').click();

        cy.get('[data-cy=luigi-confirmation-modal]').should('not.be.visible');

        cy.expectPathToBe('/overview'); //the location is still unchanged after "No" clicked
      });
    });

    it("Unsaved changes - should proceed when 'Yes' was pressed in modal", () => {
      cy.get('iframe').then($iframe => {
        const $iframeBody = $iframe.contents().find('body');

        cy.wrap($iframeBody)
          .find('[data-cy=toggle-dirty-state]')
          .check();

        cy.get('button')
          .contains('Projects')
          .click();

        cy.get('[data-cy=luigi-confirmation-modal]').should('be.visible');

        cy.expectPathToBe('/overview'); //the location is unchanged

        cy.get('[data-cy=luigi-modal-confirm]').click();

        cy.get('[data-cy=luigi-confirmation-modal]').should('not.be.visible');

        cy.expectPathToBe('/projects'); //the location is changed after "Yes" clicked
      });
    });

    describe('Generic alert', () => {
      xit('success alert with dismiss button', () => {
        // check success
        cy.get('iframe').then($iframe => {
          const $iframeBody = $iframe.contents().find('body');

          cy.goToUxManagerMethods($iframeBody);

          cy.wrap($iframeBody)
            .find('[data-cy=luigi-alert-type]')
            .select('success');
          cy.wrap($iframeBody)
            .find('[data-cy=luigi-alert-dismiss-button]')
            .check();

          cy.get('[data-cy=luigi-alert]').should('not.be.visible');
          cy.wrap($iframeBody)
            .find('[data-cy=show-luigi-alert]')
            .click();

          cy.get('[data-cy=luigi-alert]')
            .should('be.visible')
            .should('have.class', 'fd-alert--success');

          cy.get('[data-cy=luigi-alert-dismiss]').click();
          cy.get('[data-cy=luigi-alert]').should('not.be.visible');
          cy.wrap($iframeBody)
            .find('[data-cy=luigi-alert-result]')
            .contains('Luigi alert has been dismissed');
        });
      });

      xit('info alert without dismiss button', () => {
        // check info
        // check no dismiss button +  refresh + check alert is gone
        cy.get('iframe').then($iframe => {
          const $iframeBody = $iframe.contents().find('body');

          cy.goToUxManagerMethods($iframeBody);

          cy.wrap($iframeBody)
            .find('[data-cy=luigi-alert-type]')
            .select('info')
            .wait(5000);

          // cy.get('[data-cy=luigi-alert]').should('not.be.visible');
          // cy.wrap($iframeBody)
          //   .find('[data-cy=show-luigi-alert]')
          //   .click();

          // cy.get('[data-cy=luigi-alert]')
          //   .should('be.visible')
          //   .should('have.class', 'fd-alert--info')

          // cy.get('[data-cy=luigi-alert-dismiss]').should('exist');
        });
      });

      it('warning alert with links', () => {
        // check success
        cy.get('iframe').then($iframe => {
          const $iframeBody = $iframe.contents().find('body');

          cy.goToUxManagerMethods($iframeBody);

          cy.wrap($iframeBody)
            .find('[data-cy=luigi-alert-type]')
            .select('warning');
          cy.wrap($iframeBody)
            .find('[data-cy=luigi-alert-dismiss-button]')
            .check();

          cy.get('[data-cy=luigi-alert]').should('not.be.visible');
          cy.wrap($iframeBody)
            .find('[data-cy=show-luigi-alert]')
            .click();

          cy.get('[data-cy=luigi-alert]')
            .should('be.visible')
            .should('have.class', 'fd-alert--warning');

          cy.get('#relativePath')
            .click()
            .wait(1000);
          cy.get('#goToOtherProject')
            .click()
            .wait(1000);
          cy.get('#goToHome')
            .click()
            .wait(1000);

          // cy.get('[data-cy=luigi-alert-dismiss]').click();
          // cy.get('[data-cy=luigi-alert]').should('not.be.visible');
          // cy.wrap($iframeBody)
          //   .find('[data-cy=luigi-alert-result]')
          //   .contains('Luigi alert has been dismissed');
        });

        // check warning
        // click links and check location for each one
      });

      xit('error alert protected against XSS', () => {
        // check error
        // click links and check location for each one
      });
    });
  });
});
