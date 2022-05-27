describe('Luigi client linkManager features', () => {
  const localRetries = {
    retries: {
      runMode: 3,
      openMode: 3
    }
  };

  beforeEach(() => {
    cy.visitLoggedIn('/');
  });

  describe('linkManager preserve view, pathExists', () => {
    let $iframeBody;
    beforeEach(() => {
      // "clear" variables to make sure they are not reused and throw error in case something goes wrong
      $iframeBody = undefined;
      cy.visitLoggedIn('/projects/pr2');
      cy.getIframeBody().then(result => {
        $iframeBody = result;
      });
    });


    it('navigate with preserve view functionality', localRetries, () => {
      // navigate with preserve view functionality
      cy.wrap($iframeBody)
        .contains('with preserved view: project to global settings and back')
        .click();
      cy.expectPathToBe('/settings');

      // wait for the alert coming from an inactive iFrame to be shown and second iFrame to be loaded
      cy.get('.fd-message-strip').should('contain', 'Information alert sent from an inactive iFrame');

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
    });

    it('navigate with preserve view and goBack dynamic context', localRetries, () => {
      //navigate with preserve view functionality
      cy.wrap($iframeBody)
        .contains('with preserved view: to dynamic node and go back')
        .click();
      cy.expectPathToBe('/projects/pr1/users/groups/test1/settings');

      cy.getIframeBody().then($iframeBody => {
        cy.wrap($iframeBody)
          .contains('projects/pr1/users/groups/test2/settings')
          .click();
        cy.expectPathToBe('/projects/pr1/users/groups/test2/settings');

        cy.getIframeBody().then($iframeBody => {
          cy.wrap($iframeBody)
            .contains('Go Back')
            .click();
          cy.expectPathToBe('/projects/pr1/users/groups/test1/settings');
        });
      });
    });

    it('path exists check', localRetries, () => {
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
        // existent path with intent
        {
          path: '#?intent=Sales-settings',
          successExpected: true
        },
        // existent path with intent and parameters
        {
          path: '#?intent=Sales-settings?param1=abc&param2=bcd',
          successExpected: true
        },
        // nonexistent path with intent and not-mapped intent configuration
        {
          path: '#?intent=Sales-fake?param1=abc&param2=bcd',
          successExpected: false
        },
        // existent path with intent and no mapped intent key name
        {
          path: '#?international=Sales-fake?param1=abc&param2=bcd',
          successExpected: false
        },
        // existent relative path
        { path: 'developers', successExpected: true }
      ].forEach(data => {
        const msgExpected = data.successExpected ? `Path ${data.path} exists` : `Path ${data.path} does not exist`;
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
    });

    it('go back', localRetries, () => {
      // go back
      cy.expectPathToBe('/projects/pr2');
      cy.wrap($iframeBody)
        .contains('go back: single iframe')
        .click();
      cy.expectPathToBe('/overview');
    });
  });

  describe('linkManager preserveQueryParams features', () => {
    let $iframeBody;
    beforeEach(() => {
      // "clear" variables to make sure they are not reused and throw error in case something goes wrong
      $iframeBody = undefined;
      cy.visitLoggedIn('/projects/pr1/settings?query=test&ft=ft1');
      cy.getIframeBody().then(result => {
        $iframeBody = result;
      });
    });

    it('Naviage to pr2 with query parameters', () => {
      cy.wrap($iframeBody)
        .contains('navigate to project 2 with query parameters')
        .click();
      cy.expectPathToBe('/projects/pr2');
      cy.expectSearchToBe('?query=test&ft=ft1');
    });

    it('Naviage to pr2 without query parameters', () => {
      cy.wrap($iframeBody)
        .contains('navigate to project 2 without query parameters')
        .click();
      cy.expectPathToBe('/projects/pr2');
      cy.expectSearchToBe('');
    });
  });
});
