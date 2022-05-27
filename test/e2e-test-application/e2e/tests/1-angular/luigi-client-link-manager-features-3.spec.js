describe('Luigi client linkManager', () => {
  const localRetries = {
    retries: {
      runMode: 3,
      openMode: 3
    }
  };

  beforeEach(() => {
    cy.visitLoggedIn('/');
  });
  
  describe('Goes back and pass data ', () => {
    let $iframeBody;
    const $inputTypeNormal = 'Buongiorno Luigi';
    const $inputTypeModal = 'Buona notte Luigi';
    beforeEach(() => {
      cy.visitLoggedIn('/projects/pr2');
      cy.getIframeBody().then(result => {
        $iframeBody = result;
      });
    });

    it('goes to Settings and comes back with data', () => {
      cy.expectPathToBe('/projects/pr2');

      // navigate to settings
      cy.wrap($iframeBody)
        .contains(' with params: project to global settings and back')
        .click();

      cy.expectPathToBe('/settings');

      cy.getIframeBody().then($body => {
        // type buongiorno into input
        cy.wrap($body)
          .find('input')
          .clear()
          .type($inputTypeNormal);

        cy.wrap($body)
          .find('button')
          .click();

        cy.expectPathToBe('/projects/pr2');

        cy.wrap($iframeBody).should('contain', $inputTypeNormal);
      });
    });

    it('goes to Settings with modal and back with data', () => {
      cy.expectPathToBe('/projects/pr2');

      cy.wrap($iframeBody)
        .contains('rendered in a modal')
        .click();

      // navigate to the modal's iframe
      cy.get('[data-testid=modal-mf] iframe')
        .eq(0)
        .iframe()
        .then($modal => {
          cy.wrap($modal)
            .find('input')
            .clear()
            .type($inputTypeModal);

          cy.wrap($modal)
            .contains('Click here')
            .click();
        });
      cy.wrap($iframeBody).should('contain', $inputTypeModal);
    });
  });

  describe('linkManager navigation from a modal', () => {
    let $iframeBody;
    beforeEach(() => {
      cy.getIframeBody().then(result => {
        $iframeBody = result;
        cy.goToLinkManagerMethods($iframeBody);
      });
    });
    it('absolute path navigation', () => {
      cy.goToOverviewPage();
      cy.wrap($iframeBody)
        .find('[data-testid=open-pr1-settings-modal]')
        .click();

      cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody)
          .contains('absolute: to overview')
          .click();
        cy.expectPathToBe('/overview');
      });
    });
    it('relative path navigation', () => {
      cy.goToOverviewPage();
      cy.wrap($iframeBody)
        .find('[data-testid=open-pr1-settings-modal]')
        .click();

      cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody)
          .contains('relative: to stakeholders')
          .click();
        cy.get('.fd-message-strip').contains(
          'Could not map the exact target node for the requested route projects/pr1/settings/users/groups/stakeholders.'
        );
      });
    });
    it('fromCloestContext navigation', () => {
      cy.goToOverviewPage();
      cy.wrap($iframeBody)
        .find('[data-testid=open-pr1-settings-modal]')
        .click();

      cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody)
          .contains('closest parent: to stakeholders')
          .click();
        cy.expectPathToBe('/projects/pr1/users/groups/stakeholders');
      });
    });
    it('fromContext navigation', () => {
      cy.goToOverviewPage();
      cy.wrap($iframeBody)
        .find('[data-testid=open-pr1-settings-modal]')
        .click();

      cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody)
          .contains('parent by name: project to settings')
          .click();
        cy.expectPathToBe('/projects/pr1/settings');
      });
    });
    it('fromClosestContext navigation with node params', () => {
      cy.goToOverviewPage();
      cy.wrap($iframeBody)
        .find('[data-testid=open-pr1-settings-modal]')
        .click();

      cy.getIframeBody({}, 0, '.iframeModalCtn._modal').then(result => {
        $iframeBody = result;
        cy.wrap($iframeBody)
          .contains('project to settings with params (foo=bar)')
          .click();
      });
      cy.expectPathToBe('/projects/pr1/settings');
      cy.wrap($iframeBody).should('contain', 'Called with params:');
      cy.wrap($iframeBody).should('contain', '"foo": "bar"');

      cy.expectSearchToBe('?~foo=bar');
    });
  });

  describe('linkManager wrong paths navigation', () => {
    let $iframeBody;
    beforeEach(() => {
      cy.getIframeBody().then(result => {
        $iframeBody = result;
        cy.goToLinkManagerMethods($iframeBody);
      });
    });
    it('navigate to a partly wrong link', () => {
      cy.wrap($iframeBody)
        .contains('Partly wrong link')
        .click();
      cy.expectPathToBe('/projects/pr2/miscellaneous2');

      cy.get('.fd-message-strip').contains(
        'Could not map the exact target node for the requested route projects/pr2/miscellaneous2/maskopatol'
      );

      // navigate somewhere else
      cy.goToProjectsPage();

      // alert disappears
      cy.get('.fd-message-strip').should('not.exist');
    });

    it('navigate to a totally wrong link', () => {
      cy.wrap($iframeBody)
        .contains('Totally wrong link')
        .click();
      cy.expectPathToBe('/overview');

      cy.get('.fd-message-strip').contains('Could not find the requested route maskopatol/has/a/child');

      // navigate somewhere else
      cy.goToProjectsPage();

      // alert disappears
      cy.get('.fd-message-strip').should('not.exist');
    });
  });
});
