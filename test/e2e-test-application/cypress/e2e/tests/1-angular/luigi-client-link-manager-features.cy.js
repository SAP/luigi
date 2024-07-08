describe('Luigi client linkManager', () => {
  const localRetries = {
    retries: {
      runMode: 3,
      openMode: 3
    }
  };

  describe('linkManager navigation calls', () => {
    let $iframeBody;
    beforeEach(() => {
      // "clear" variables to make sure they are not reused and throw error in case something goes wrong
      $iframeBody = undefined;
      cy.visitLoggedIn('/projects/pr2');
      cy.getIframeBody().then(result => {
        $iframeBody = result;
      });
    });

    it('navigate using absolute path', localRetries, () => {
      // navigate using absolute path
      cy.wrap($iframeBody)
        .contains('absolute: to overview')
        .click();
      cy.expectPathToBe('/overview');
    });

    it('navigate using relative path', localRetries, () => {
      // navigate using relative path
      cy.wrap($iframeBody)
        .contains('relative: to stakeholders')
        .click();
      cy.expectPathToBe('/projects/pr2/users/groups/stakeholders');
    });

    it('navigate using closest context', localRetries, () => {
      // navigate using closest context
      cy.wrap($iframeBody)
        .contains('closest parent: to stakeholders')
        .click();
      cy.expectPathToBe('/projects/pr2/users/groups/stakeholders');
    });

    it('navigate using context', localRetries, () => {
      // navigate using context
      cy.wrap($iframeBody)
        .contains('parent by name: project to settings')
        .click();
      cy.expectPathToBe('/projects/pr2/settings');

      cy.wrap($iframeBody).should('contain', 'Settings');
      cy.wrap($iframeBody)
        .contains('Click here')
        .click();
      cy.expectPathToBe('/projects/pr2');
    });

    it('navigate to sibling through parent', localRetries, () => {
      // navigate to sibling through parent
      cy.wrap($iframeBody)
        .contains('from parent: to sibling')
        .click();
      cy.expectPathToBe('/projects/pr1');
    });

    it('navigate with params', localRetries, () => {
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
    });

    it('dont navigate with nonexisting context', localRetries, () => {
      cy.wrap($iframeBody)
        .contains('parent by name: with nonexisting context')
        .click();
      cy.expectPathToBe('/projects/pr2');
    });
  });

  describe('linkManager - intent navigation', () => {
    let $iframeBody;

    beforeEach(() => {
      // "clear" variables to make sure they are not reused and throw error in case something goes wrong
      $iframeBody = undefined;
      cy.visitLoggedIn('/projects/pr2');
      cy.getIframeBody().then(result => {
        $iframeBody = result;
      });
    });

    it('open webcomponent in splitview', localRetries, () => {
      cy.expectPathToBe('/projects/pr2');
      cy.goToLinkManagerMethods($iframeBody);
      // open webcomponent in splitview
      cy.wrap($iframeBody)
        .contains('Open webcomponent in splitView')
        .click();
      cy.get('.iframeSplitViewCnt>')
        .shadow()
        .as('shw')
        .find('p')
        .should('contain', 'Hello WebComponent!');
      cy.get('@shw')
        .find('button')
        .eq(0)
        .click();
      cy.get('[data-testid=luigi-alert]').should('have.class', 'fd-message-strip--information');
      cy.get('[data-testid=luigi-alert]').should('contain', 'Hello from uxManager in Web Component, Language:en');
    });

    it('should be able to list active featureToggles from WC "API"', localRetries, () => {
      cy.expectPathToBe('/projects/pr2');
      cy.goToLinkManagerMethods($iframeBody);
      // open webcomponent in splitview
      cy.wrap($iframeBody)
        .contains('Open webcomponent in splitView')
        .click();
      cy.get('.iframeSplitViewCnt>')
        .shadow()
        .as('shw')
        .find('p')
        .should('contain', 'Hello WebComponent!');
      cy.get('@shw')
        .find('button')
        .eq(0)
        .click();
      cy.get('[data-testid=luigi-alert]').should('contain', 'Active feature toggles list: ft1');
      cy.get('[data-testid=luigi-alert]').should('contain', 'Active feature toggles: ft1');
    });

    it('navigate with intent', localRetries, () => {
      // navigate with intent
      cy.wrap($iframeBody)
        .contains('navigate to settings with intent with parameters')
        .click();
      cy.expectPathToBe('/projects/pr2/settings');
      cy.expectSearchToBe('?~param1=abc&~param2=bcd');
    });

    it('navigate with intent - second api option', localRetries, () => {
      // navigate with intent - second option
      cy.wrap($iframeBody)
        .contains('navigate to settings of project 1 with alternative intent method')
        .click();
      cy.expectPathToBe('/projects/pr1/settings');
      cy.expectSearchToBe('?~project=pr1&~param2=22');
    });
  });
});
