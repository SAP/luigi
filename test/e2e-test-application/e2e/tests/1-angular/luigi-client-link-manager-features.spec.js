Cypress.env('RETRIES', 1);
describe('Luigi client linkManager', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });

  it('linkManager features', () => {
    Cypress.currentTest.retries(2);
    cy.getIframeBody().then($iframeBody => {
      cy.goToLinkManagerMethods($iframeBody);

      //navigate using absolute path
      cy.wrap($iframeBody)
        .contains('absolute: to overview')
        .click();
      cy.expectPathToBe('/overview');

      cy.goToLinkManagerMethods($iframeBody);

      //navigate using relative path
      cy.wrap($iframeBody)
        .contains('relative: to stakeholders')
        .click();
      cy.expectPathToBe('/projects/pr2/users/groups/stakeholders');

      cy.goToOverviewPage();
      cy.goToLinkManagerMethods($iframeBody);

      //navigate using closest context
      cy.wrap($iframeBody)
        .contains('closest parent: to stakeholders')
        .click();
      cy.expectPathToBe('/projects/pr2/users/groups/stakeholders');

      cy.goToOverviewPage();
      cy.goToLinkManagerMethods($iframeBody);

      //navigate using context
      cy.wrap($iframeBody)
        .contains('parent by name: project to settings')
        .click();
      cy.expectPathToBe('/projects/pr2/settings');

      cy.wrap($iframeBody).should('contain', 'Settings');
      cy.wrap($iframeBody)
        .contains('Click here')
        .click();
      cy.expectPathToBe('/projects/pr2');

      //navigate to sibling through parent
      cy.wrap($iframeBody)
        .contains('from parent: to sibling')
        .click();
      cy.expectPathToBe('/projects/pr1');

      cy.goToOverviewPage();
      cy.goToLinkManagerMethods($iframeBody);

      //navigate with params
      cy.wrap($iframeBody)
        .contains('project to settings with params (foo=bar)')
        .click();
      cy.wrap($iframeBody).should('contain', 'Called with params:');
      cy.wrap($iframeBody).should('contain', '"foo": "bar"');

      cy.expectSearchToBe('?~foo=bar');

      cy.wrap($iframeBody)
        .contains('Click here')
        .click();
      cy.expectPathToBe('/projects/pr2');

      //don't navigate
      cy.wrap($iframeBody)
        .contains('parent by name: with nonexisting context')
        .click();
      cy.expectPathToBe('/projects/pr2');

      //navigate with preserve view functionality
      cy.wrap($iframeBody)
        .contains('with preserved view: project to global settings and back')
        .click();
      cy.expectPathToBe('/settings');

      //wait for the alert coming from an inactive iFrame to be shown and second iFrame to be loaded
      cy.wait(500);
      cy.get('.fd-message-strip').should(
        'contain',
        'Information alert sent from an inactive iFrame'
      );

      cy.getIframeBody().then($iframeBody => {
        cy.wrap($iframeBody)
          .find('input')
          .clear()
          .type('tets');
        cy.wrap($iframeBody)
          .find('button')
          .click();
        cy.expectPathToBe('/projects/pr2');
      });

      cy.visitLoggedIn('/');

      cy.getIframeBody().then($iframeBody => {
        // check if path exists
        cy.goToLinkManagerMethods($iframeBody);
        [
          // non-existent relative path
          { path: 'projects/pr2/', successExpected: false },
          // non-existent absolute path
          { path: '/developers', successExpected: false },
          // existent absolute path with '/' at the end
          { path: '/projects/pr2/', successExpected: true },
          // existent absolute path without '/' at the end
          { path: '/projects/pr2', successExpected: true },
          // existent path with two dynamic pathSegments
          {
            path: '/projects/pr1/users/groups/avengers/settings/dynamic-two',
            successExpected: true
          },
          // existent relative path
          { path: 'developers', successExpected: true }
        ].map(data => {
          const msgExpected = data.successExpected
            ? `Path ${data.path} exists`
            : `Path ${data.path} does not exist`;
          const checkPathSelector = '.link-manager .check-path';
          cy.wrap($iframeBody)
            .find(checkPathSelector + ' input')
            .clear()
            .type(data.path);
          cy.wrap($iframeBody)
            .find(checkPathSelector + ' button')
            .click();
          cy.wrap($iframeBody)
            .find(checkPathSelector + ' .check-path-result')
            .contains(msgExpected);
        });

        // go back
        cy.goToOverviewPage();
        cy.goToLinkManagerMethods($iframeBody);
        cy.expectPathToBe('/projects/pr2');
        cy.wrap($iframeBody)
          .contains('go back: single iframe')
          .click();
        cy.expectPathToBe('/overview');
      });
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

      //navigate somewhere else
      cy.get('button')
        .contains('Projects')
        .click();

      //alert disappears
      cy.get('.fd-message-strip').should('not.exist');
    });

    it('navigate to a totally wrong link', () => {
      cy.wrap($iframeBody)
        .contains('Totally wrong link')
        .click();
      cy.expectPathToBe('/overview');

      cy.get('.fd-message-strip').contains(
        'Could not find the requested route maskopatol/has/a/child'
      );

      //navigate somewhere else
      cy.get('button')
        .contains('Projects')
        .click();

      //alert disappears
      cy.get('.fd-message-strip').should('not.exist');
    });
  });

  describe('Goes back and pass data ', () => {
    let $iframeBody;
    let $inputTypeNormal = 'Buongiorno Luigi';
    let $inputTypeModal = 'Buona notte Luigi';
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
});
