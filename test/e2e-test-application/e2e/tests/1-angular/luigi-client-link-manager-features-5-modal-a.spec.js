describe('Luigi Client linkManager Modal', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });

  describe('linkManager updateModalPathInternalNavigation', () => {
    let $iframeBody;
    beforeEach(() => {
      cy.getIframeBody().then(result => {
        $iframeBody = result;
        cy.goToLinkManagerMethods($iframeBody);
        cy.window().then(win => {
          const config = win.Luigi.getConfig();
          config.routing.showModalPathInUrl = true;
          win.Luigi.configChanged('routing');
        });
      });
    });
    it('update modalPath fromVirtualTreeRoot', () => {
      cy.expectPathToBe('/projects/pr2');

      cy.wrap($iframeBody)
        .find('[data-testid=open-modal-virtual-tree]')
        .click();

      cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody).contains('Settings of pr2');

        cy.expectSearchToBe('?modal=%2Fprojects%2Fpr2%2Fdevelopers%2Finternal%2FvirtualTree&historyState=4');

        cy.wrap($iframeBody)
          .find('[data-testid=update-modal-path-virtual-tree]')
          .click();

        cy.expectSearchToBe('?modal=%2Fprojects%2Fpr2%2Fdevelopers%2Fxyz&historyState=4');
      });
    });

    // it('update modalPath fromContext', () => {
    //   cy.expectPathToBe('/projects/pr2');

    //   cy.wrap($iframeBody)
    //     .find('[data-testid=open-modal-virtual-tree]')
    //     .click();

    //   cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
    //     $iframeBody = result;
    //     cy.wrap($iframeBody).contains('Settings of pr2');

    //     cy.expectSearchToBe('?modal=%2Fprojects%2Fpr2%2Fdevelopers%2Finternal%2FvirtualTree');
    //     cy.wrap($iframeBody)
    //       .find('[data-testid=update-modal-path-from-context]')
    //       .click();

    //     cy.expectSearchToBe('?modal=%2Fprojects%2Fpr2%2Fxyz');
    //   });
    // });

    // it('update modalPath fromClosestContext', () => {
    //   cy.expectPathToBe('/projects/pr2');

    //   cy.wrap($iframeBody)
    //     .find('[data-testid=open-modal-virtual-tree]')
    //     .click();

    //   cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
    //     $iframeBody = result;
    //     cy.wrap($iframeBody).contains('Settings of pr2');

    //     cy.expectSearchToBe('?modal=%2Fprojects%2Fpr2%2Fdevelopers%2Finternal%2FvirtualTree');
    //     cy.wrap($iframeBody)
    //       .find('[data-testid=update-modal-path-closest-context]')
    //       .click();

    //     cy.expectSearchToBe('?modal=%2Fprojects%2Fpr2%2Fxyz');
    //   });
    // });

    // it('update modalPath fromParent', () => {
    //   cy.expectPathToBe('/projects/pr2');

    //   cy.wrap($iframeBody)
    //     .find('[data-testid=open-modal-virtual-tree]')
    //     .click();

    //   cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
    //     $iframeBody = result;
    //     cy.wrap($iframeBody).contains('Settings of pr2');

    //     cy.expectSearchToBe('?modal=%2Fprojects%2Fpr2%2Fdevelopers%2Finternal%2FvirtualTree');
    //     cy.wrap($iframeBody)
    //       .find('[data-testid=update-modal-path-from-parent]')
    //       .click();

    //     cy.expectSearchToBe('?modal=%2Fprojects%2Fpr2%2Fdevelopers%2Finternal%2Fxyz');
    //   });
    // });
  });

  // describe('linkManager open multiple modals: keepPrevious=true', () => {
  //   let $iframeBody;
  //   beforeEach(() => {
  //     cy.getIframeBody().then(result => {
  //       $iframeBody = result;
  //       cy.goToLinkManagerMethods($iframeBody);
  //     });
  //   });
  //   it('multiple modals back and forth', () => {
  //     cy.expectPathToBe('/projects/pr2');

  //     cy.wrap($iframeBody)
  //       .find('[data-testid=open-modal-to-settings-fullscreen]')
  //       .click();

  //     // first modal - fullscreen
  //     cy.getIframeBody({}, 0, '[modal-container-index=0]').then(result => {
  //       $iframeBody = result;
  //       cy.wrap($iframeBody).contains('Settings of pr2');

  //       cy.expectPathToBe('/projects/pr2');

  //       cy.wrap($iframeBody)
  //         .find('[data-testid=open-modal-pr2-large]')
  //         .click();

  //       // second modal - large
  //       cy.getIframeBody({}, 0, '[modal-container-index=1]').then(result => {
  //         $iframeBody = result;
  //         cy.wrap($iframeBody).contains('LuigiClient linkManager methods');

  //         cy.wrap($iframeBody)
  //           .find('[data-testid=open-modal-to-settings-medium]')
  //           .click();

  //         // thrid modal - medium
  //         cy.getIframeBody({}, 0, '[modal-container-index=2]').then(result => {
  //           $iframeBody = result;
  //           cy.wrap($iframeBody).contains('Settings of pr2');

  //           cy.wrap($iframeBody)
  //             .find('[data-testid=open-modal-pr2-s]')
  //             .click();

  //           // fourth modal - small
  //           cy.getIframeBody({}, 0, '[modal-container-index=3]').then(result => {
  //             $iframeBody = result;
  //             cy.wrap($iframeBody).contains('LuigiClient linkManager methods');
  //           });
  //         });
  //       });
  //     });
  //   });

  //   it('multiple modals modalpath params enabled', () => {
  //     cy.window().then(win => {
  //       const config = win.Luigi.getConfig();
  //       config.routing.showModalPathInUrl = true;
  //       win.Luigi.configChanged('routing');

  //       cy.expectPathToBe('/projects/pr2');

  //       cy.wrap($iframeBody)
  //         .find('[data-testid=open-modal-to-settings-fullscreen]')
  //         .click();

  //       // first modal - fullscreen
  //       cy.getIframeBody({}, 0, '[modal-container-index=0]').then(result => {
  //         $iframeBody = result;
  //         cy.wrap($iframeBody).contains('Settings of pr2');

  //         cy.expectSearchToBe(
  //           '?modal=%2Fprojects%2Fpr2%2Fsettings&modalParams=%7B%22title%22%3A%22microfrontend%20in%20a%20modal%22%2C%22size%22%3A%22fullscreen%22%2C%22keepPrevious%22%3Atrue%7D'
  //         );

  //         cy.wrap($iframeBody)
  //           .find('[data-testid=open-modal-pr2-large]')
  //           .click();

  //         cy.expectSearchToBe(
  //           '?modal=%2Fprojects%2Fpr2&modalParams=%7B%22title%22%3A%22microfrontend%20in%20a%20modal%22%2C%22size%22%3A%22l%22%2C%22keepPrevious%22%3Atrue%7D'
  //         );

  //         // second modal - large
  //         cy.getIframeBody({}, 0, '[modal-container-index=1]').then(result => {
  //           $iframeBody = result;
  //           cy.wrap($iframeBody).contains('LuigiClient linkManager methods');

  //           cy.wrap($iframeBody)
  //             .find('[data-testid=open-modal-to-settings-medium]')
  //             .click();

  //           cy.expectSearchToBe(
  //             '?modal=%2Fprojects%2Fpr2%2Fsettings&modalParams=%7B%22title%22%3A%22microfrontend%20in%20a%20modal%22%2C%22size%22%3A%22m%22%2C%22keepPrevious%22%3Atrue%7D'
  //           );

  //           // thrid modal - medium
  //           cy.getIframeBody({}, 0, '[modal-container-index=2]').then(result => {
  //             $iframeBody = result;
  //             cy.wrap($iframeBody).contains('Settings of pr2');

  //             cy.wrap($iframeBody)
  //               .find('[data-testid=open-modal-pr2-s]')
  //               .click();

  //             cy.expectSearchToBe(
  //               '?modal=%2Fprojects%2Fpr2&modalParams=%7B%22title%22%3A%22microfrontend%20in%20a%20modal%22%2C%22size%22%3A%22s%22%2C%22keepPrevious%22%3Atrue%7D'
  //             );

  //             // fourth modal - small
  //             cy.getIframeBody({}, 0, '[modal-container-index=3]').then(result => {
  //               $iframeBody = result;
  //               cy.wrap($iframeBody).contains('LuigiClient linkManager methods');
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });
});
