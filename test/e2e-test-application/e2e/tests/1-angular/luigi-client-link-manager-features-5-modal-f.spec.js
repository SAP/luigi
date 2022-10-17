describe('Luigi Client linkManager Modal', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });

  describe('linkManager open multiple modals: keepPrevious=true', () => {
    let $iframeBody;
    beforeEach(() => {
      cy.getIframeBody().then(result => {
        $iframeBody = result;
        cy.goToLinkManagerMethods($iframeBody);
      });
    });

    it('multiple modals modalpath params enabled', () => {
      cy.window().then(win => {
        const config = win.Luigi.getConfig();
        config.routing.showModalPathInUrl = true;
        win.Luigi.configChanged('routing');

        cy.expectPathToBe('/projects/pr2');

        cy.wrap($iframeBody)
          .find('[data-testid=open-modal-to-settings-fullscreen]')
          .click();

        // first modal - fullscreen
        cy.getIframeBody({}, 0, '[modal-container-index=0]').then(result => {
          $iframeBody = result;
          cy.wrap($iframeBody).contains('Settings of pr2');

          cy.expectSearchToBe(
            '?modal=%2Fprojects%2Fpr2%2Fsettings&modalParams=%7B%22title%22%3A%22microfrontend%20in%20a%20modal%22%2C%22size%22%3A%22fullscreen%22%2C%22keepPrevious%22%3Atrue%7D&historyState=4'
          );

          cy.wrap($iframeBody)
            .find('[data-testid=open-modal-pr2-large]')
            .click();

          cy.expectSearchToBe(
            '?modal=%2Fprojects%2Fpr2%2Fsettings&modalParams=%7B%22title%22%3A%22microfrontend%20in%20a%20modal%22%2C%22size%22%3A%22fullscreen%22%2C%22keepPrevious%22%3Atrue%7D&historyState=4'
          );

          // second modal - large
          cy.getIframeBody({}, 0, '[modal-container-index=1]').then(result => {
            $iframeBody = result;
            cy.wrap($iframeBody).contains('LuigiClient linkManager methods');

            cy.wrap($iframeBody)
              .find('[data-testid=open-modal-to-settings-medium]')
              .click();

            cy.expectSearchToBe(
              '?modal=%2Fprojects%2Fpr2%2Fsettings&modalParams=%7B%22title%22%3A%22microfrontend%20in%20a%20modal%22%2C%22size%22%3A%22fullscreen%22%2C%22keepPrevious%22%3Atrue%7D&historyState=4'
            );

            // thrid modal - medium
            cy.getIframeBody({}, 0, '[modal-container-index=2]').then(result => {
              $iframeBody = result;
              cy.wrap($iframeBody).contains('Settings of pr2');

              cy.wrap($iframeBody)
                .find('[data-testid=open-modal-pr2-s]')
                .click();

              cy.expectSearchToBe(
                '?modal=%2Fprojects%2Fpr2%2Fsettings&modalParams=%7B%22title%22%3A%22microfrontend%20in%20a%20modal%22%2C%22size%22%3A%22fullscreen%22%2C%22keepPrevious%22%3Atrue%7D&historyState=4'
              );

              // fourth modal - small
              cy.getIframeBody({}, 0, '[modal-container-index=3]').then(result => {
                $iframeBody = result;
                cy.wrap($iframeBody).contains('LuigiClient linkManager methods');
              });
              cy.get('.lui-modal-index-3').should('exist');
              cy.get('.lui-modal-index-3 [aria-label="close"]').click();
              cy.expectSearchToBe(
                '?modal=%2Fprojects%2Fpr2%2Fsettings&modalParams=%7B%22title%22%3A%22microfrontend%20in%20a%20modal%22%2C%22size%22%3A%22fullscreen%22%2C%22keepPrevious%22%3Atrue%7D&historyState=4'
              );
              cy.get('.lui-modal-index-2').should('exist');
              cy.get('.lui-modal-index-2 [aria-label="close"]').click();
              cy.expectSearchToBe(
                '?modal=%2Fprojects%2Fpr2%2Fsettings&modalParams=%7B%22title%22%3A%22microfrontend%20in%20a%20modal%22%2C%22size%22%3A%22fullscreen%22%2C%22keepPrevious%22%3Atrue%7D&historyState=4'
              );
            });
          });
        });
      });
    });
  });
});
