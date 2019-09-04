Cypress.env('RETRIES', 1);
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

      cy.wrap($iframeBody).should('not.contain', 'Lorem tipsum dolor sit amet');
      cy.get('.fd-ui__overlay').should('not.exist');
    });

    it('Luigi Client generic confirmation modal', () => {
      cy.goToUxManagerMethods($iframeBody);

      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');

      cy.wrap($iframeBody)
        .find('[data-testid=show-luigi-confirmation-modal]')
        .click();
      cy.get('[data-testid=luigi-confirmation-modal]').should('be.visible');

      cy.get('[data-testid=luigi-modal-dismiss]').click();
      cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');
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

    it('loading indicator', () => {
      Cypress.currentTest.retries(3);
      cy.get('[data-testid="misc"]').click();

      cy.get('[data-testid="ext_externalpage"]')
        .contains('External Page')
        .click();

      cy.get('.spinnerContainer .fd-spinner').should('exist');

      cy.wait(250); // give it some time to hide

      cy.get('.spinnerContainer .fd-spinner').should('not.be.visible');

      // show loading indicator
      cy.getIframeBody().then($iframeBody => {
        cy.wrap($iframeBody)
          .contains('Show loading indicator')
          .click();

        cy.get('.spinnerContainer .fd-spinner').should('exist');
        cy.wait(250); // give it some time to hide
        // wait for programmatic hide of loading indicator
        cy.get('.spinnerContainer .fd-spinner').should('not.be.visible');
      });
    });

    describe('Unsaved changes', () => {
      it("shouldn't proceed when 'No' was pressed in modal", () => {
        cy.wrap($iframeBody)
          .find('[data-testid=toggle-dirty-state]')
          .click();

        cy.get('button')
          .contains('Projects')
          .click();

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

        cy.get('button')
          .contains('Projects')
          .click();

        cy.get('[data-testid=luigi-confirmation-modal]').should('be.visible');

        cy.expectPathToBe('/overview'); //the location is unchanged

        cy.get('[data-testid=luigi-modal-confirm]').click();

        cy.get('[data-testid=luigi-confirmation-modal]').should('not.be.visible');

        cy.expectPathToBe('/projects'); //the location is changed after "Yes" clicked
      });
    });
  });
});
