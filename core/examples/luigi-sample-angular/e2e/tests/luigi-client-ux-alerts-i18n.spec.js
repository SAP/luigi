describe('Luigi Client UX Alerts + Localization', () => {
  let $iframeBody;
  beforeEach(() => {
    //"clear" variables to make sure they are not reused and throw error in case something goes wrong
    $iframeBody = undefined;
    cy.visit('/');
    cy.login('tets', 'tets');

    cy.getIframeBody().then(result => {
      $iframeBody = result;
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

      cy.get('[data-cy=luigi-alert]').should('have.class', 'fd-alert--success');

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
        .find('[data-cy=luigi-alert-close-after]')
        .type(closeAfter);

      cy.wrap($iframeBody)
        .find('[data-cy=show-luigi-alert]')
        .click();

      cy.wait(closeAfter - 100); //the time may not be one-millisecond perfect so give it some 'flexibility'
      cy.get('[data-cy=luigi-alert]').should('exist');

      cy.wait(101); //desired time + 1 ms = the alert shouldn't exist anymore
      cy.get('[data-cy=luigi-alert]').should('not.exist');
    });

    it('can queue Alerts', () => {
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

      cy.get('[data-cy=luigi-alert]').should('have.class', 'fd-alert--warning');

      cy.get('*[id$=_link_relativePath]').click();
      cy.expectPathToBe('/projects/pr1');
      cy.get('[data-cy=luigi-confirmation-modal]').should('be.visible');
      cy.get('[data-cy=luigi-modal-dismiss]').click();
      cy.expectPathToBe('/projects/pr1');
      cy.get('*[id$=_link_relativePath]').click();
      cy.get('[data-cy=luigi-confirmation-modal]').should('be.visible');
      cy.get('[data-cy=luigi-modal-confirm]').click();
      cy.expectPathToBe('/projects/pr1/hideSideNav');

      cy.get('*[id$=_link_goToOtherProject]')
        .click()
        .expectPathToBe('/projects/pr2');

      cy.get('*[id$=_link_goToHome]')
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

  describe('Luigi Client Localization', () => {
    it('set localization in client', () => {
      cy.goToUxManagerMethods($iframeBody);

      cy.wrap($iframeBody)
        .find('[data-cy=luigi-current-locale]')
        .should('contain', "'en'");

      cy.wrap($iframeBody)
        .find('[data-cy=luigi-input-locale]')
        .type('pl_PL');

      cy.wrap($iframeBody)
        .find('[data-cy=set-current-locale]')
        .click();

      cy.wrap($iframeBody)
        .find('[data-cy=luigi-current-locale]')
        .should('contain', "'pl_PL'");
    });

    it('clientPermissions: check if set localization in client is disabled', () => {
      cy.visit('/projects/pr1/clientPermissionsTets')
        .getIframeBody()
        .then(body => {
          cy.wrap(body)
            .find('[data-cy=luigi-input-locale]')
            .should('be.disabled');

          cy.wrap(body)
            .find('[data-cy=set-current-locale]')
            .should('be.disabled');
        });
    });
  });
});
