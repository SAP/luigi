describe('Luigi client ux manger features', () => {
  let $iframe;
  let $iframeBody;
  beforeEach(() => {
    //"clear" variables to make sure they are not reused and throw error in case something goes wrong
    $iframe = undefined;
    $iframeBody = undefined;
    cy.visit('/');
    cy.login('tets', 'tets');

    cy.get('iframe').then(ifr => {
      $iframe = ifr;
      $iframeBody = ifr.contents().find('body');
    });

    //wait for the iFrame to be loaded
    cy.wait(1000);
  });

  describe('uxManager', () => {
    it('backdrop', () => {
      cy.wait(500);
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

    it('Luigi Client generic confirmation modal', () => {
      cy.goToUxManagerMethods($iframeBody);

      cy.get('[data-cy=luigi-confirmation-modal]').should('not.be.visible');

      cy.wrap($iframeBody)
        .find('[data-cy=show-luigi-confirmation-modal]')
        .click();
      cy.get('[data-cy=luigi-confirmation-modal]').should('be.visible');

      cy.get('[data-cy=luigi-modal-dismiss]').click();
      cy.get('[data-cy=luigi-confirmation-modal]').should('not.be.visible');
      cy.wrap($iframeBody)
        .find('[data-cy=luigi-confirmation-modal-result]')
        .contains('Luigi confirmation modal has been dismissed');

      cy.wrap($iframeBody)
        .find('[data-cy=show-luigi-confirmation-modal]')
        .click();
      cy.get('[data-cy=luigi-confirmation-modal]').should('be.visible');

      cy.get('[data-cy=luigi-modal-confirm]').click();
      cy.get('[data-cy=luigi-confirmation-modal]').should('not.be.visible');
      cy.wrap($iframeBody)
        .find('[data-cy=luigi-confirmation-modal-result]')
        .contains('Luigi confirmation modal has been confirmed');
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
      });
    });

    describe('Unsaved changes', () => {
      it("shouldn't proceed when 'No' was pressed in modal", () => {

        cy.wrap($iframeBody)
          .find('[data-cy=toggle-dirty-state]')
          .click();

        cy.get('button')
          .contains('Projects')
          .click();

        cy.get('[data-cy=luigi-confirmation-modal]').should('be.visible');

        cy.expectPathToBe('/overview'); //the location is unchanged

        cy.get('[data-cy=luigi-modal-dismiss]').click();

        cy.get('[data-cy=luigi-confirmation-modal]').should('not.be.visible');

        cy.expectPathToBe('/overview'); //the location is still unchanged after "No" clicked

      });

      it("should proceed when 'Yes' was pressed in modal", () => {

        cy.wrap($iframeBody)
          .find('[data-cy=toggle-dirty-state]')
          .click();

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

    describe('Luigi Client generic alert', () => {
      it('success and info alerts with dismiss button', () => {
        cy.goToUxManagerMethods($iframeBody);

        cy.get('[data-cy=luigi-alert]').should('not.exist');

        cy.wrap($iframeBody)
          .find('[data-cy=luigi-alert-type]')
          .select('success');
        cy.wrap($iframeBody)
          .find('[data-cy=show-luigi-alert]')
          .click();

        cy.get('[data-cy=luigi-alert]').should(
          'have.class',
          'fd-alert--success'
        );

        cy.get('[data-cy=luigi-alert-dismiss]').click();
        cy.get('[data-cy=luigi-alert]').should('not.exist');
        cy.wrap($iframeBody)
          .find('[data-cy=luigi-alert-result]')
          .contains('has been dismissed');

        cy.wrap($iframeBody)
          .find('[data-cy=luigi-alert-type]')
          .select('info');
        cy.wrap($iframeBody)
          .find('[data-cy=show-luigi-alert]')
          .click();

        cy.get('[data-cy=luigi-alert]').should(
          'have.class',
          'fd-alert--information'
        );

      });
      it('hides Alert after specified time', () => {
        const closeAfter = 500;
        cy.goToUxManagerMethods($iframeBody);

        cy.get('[data-cy=luigi-alert]').should('not.exist');

        cy.wrap($iframeBody)
          .find('[data-cy=luigi-alert-close-after]').type(closeAfter);

        cy.wrap($iframeBody)
          .find('[data-cy=show-luigi-alert]')
          .click();

        cy.wait(closeAfter - 100); //the time may not be one-millisecond perfect so give it some 'flexibility'
        cy.get('[data-cy=luigi-alert]').should('exist');

        cy.wait(101); //desired time + 1 ms = the alert shouldn't exist anymore
        cy.get('[data-cy=luigi-alert]').should('not.exist');


      });

      it.only('can quque Alerts', () => {
        const numberOfAlerts = 3;

        cy.goToUxManagerMethods($iframeBody);

        cy.get('[data-cy=luigi-alert]').should('not.exist');

        for (let i = 0; i < numberOfAlerts; i++) {
          //click "Show alert" few times
          cy.wrap($iframeBody)
            .find('[data-cy=show-luigi-alert]')
            .click();
        }

        cy.get('[data-cy=luigi-alert]').should('have.length', numberOfAlerts);


        for (let i = 0; i < numberOfAlerts; i++) {
          //clean up. click({multiple: true}) desn't work here.
          cy.get('[data-cy=luigi-alert-dismiss]')
            .first()
            .click();
        }
      });

      it('warning alert with links and unsaved changes', () => {

        cy.goToUxManagerMethods($iframeBody);

        cy.get('[data-cy=luigi-alert]').should('not.exist');

        cy.wrap($iframeBody)
          .find('[data-cy=luigi-alert-type]')
          .select('warning');
        cy.wrap($iframeBody)
          .find('[data-cy=luigi-alert-links]')
          .check();
        cy.wrap($iframeBody)
          .find('[data-cy=show-luigi-alert]')
          .click();
        cy.wrap($iframeBody)
          .find('[data-cy=toggle-dirty-state]')
          .click();

        cy.get('[data-cy=luigi-alert]').should(
          'have.class',
          'fd-alert--warning'
        );

        cy.get('#_luigi_alert_link_relativePath').click();
        cy.expectPathToBe('/projects/pr1');
        cy.get('[data-cy=luigi-confirmation-modal]').should('be.visible');
        cy.get('[data-cy=luigi-modal-dismiss]').click();
        cy.expectPathToBe('/projects/pr1');
        cy.get('#_luigi_alert_link_relativePath').click();
        cy.get('[data-cy=luigi-confirmation-modal]').should('be.visible');
        cy.get('[data-cy=luigi-modal-confirm]').click();
        cy.expectPathToBe('/projects/pr1/hideSideNav');

        cy.get('#_luigi_alert_link_goToOtherProject')
          .click()
          .expectPathToBe('/projects/pr2');

        cy.get('#_luigi_alert_link_goToHome')
          .click()
          .expectPathToBe('/overview');

      });

      it('error alert without links and protected against XSS', () => {

        cy.goToUxManagerMethods($iframeBody);

        cy.get('[data-cy=luigi-alert]').should('not.exist');

        cy.wrap($iframeBody)
          .find('[data-cy=luigi-alert-type]')
          .select('error');
        cy.wrap($iframeBody)
          .find('[data-cy=luigi-alert-links]')
          .uncheck();
        cy.wrap($iframeBody)
          .find('[data-cy=show-luigi-alert]')
          .click();

        cy.get('[data-cy=luigi-alert]')
          .should('have.class', 'fd-alert--error')
          .should('contain', "<b onmouseover=alert('Wufff!')>click me!</b>");

        cy.get('[data-cy=luigi-alert]')
          .find('a')
          .should('not.exist');

      });

      it('alert is not displayed if it does not have any text', () => {
        cy.goToUxManagerMethods($iframeBody);

        cy.get('[data-cy=luigi-alert]').should('not.exist');

        cy.wrap($iframeBody)
          .find('[data-cy=luigi-alert-text]')
          .uncheck();
        cy.wrap($iframeBody)
          .find('[data-cy=show-luigi-alert]')
          .click();

        cy.get('[data-cy=luigi-alert]').should('not.exist');

      });
    });
  });
});
