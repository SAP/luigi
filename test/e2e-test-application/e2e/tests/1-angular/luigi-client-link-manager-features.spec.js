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

  describe('linkManager features', () => {
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

  describe('linkManager features 2', () => {
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
      cy.get('.iframeSplitViewCnt>').then(container => {
        const root = container.children().prevObject[0].shadowRoot;
        const wcContent = root.querySelector('p').innerText;
        expect(wcContent).to.equal('Hello WebComponent!');
        root.querySelector('button').click();
        cy.get('[data-testid=luigi-alert]').should('have.class', 'fd-message-strip--information');
        cy.get('[data-testid=luigi-alert]').should('contain', 'Hello from uxManager in Web Component, Language:en');
      });
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

  describe('Drawer', () => {
    let $iframeBody;
    beforeEach(() => {
      cy.visitLoggedIn('/projects/pr2');
      cy.getIframeBody().then(result => {
        $iframeBody = result;
        cy.goToLinkManagerMethods($iframeBody);
        cy.expectPathToBe('/projects/pr2');
        cy.get('.drawer').should('not.exist');
      });
    });

    it('Open and close drawer component with default settings', () => {
      cy.wrap($iframeBody)
        .contains('Open drawer with default settings')
        .click();

      cy.get('.drawer').should('exist');
      cy.expectPathToBe('/projects/pr2');

      cy.get('.drawer-dialog button[aria-label="close"]')
        .should('exist')
        .click();
      cy.get('.drawer-dialog button[aria-label="close"]').should('not.exist');
      cy.get('.drawer').should('not.exist');
    });

    it('Open and close drawer component with go back button', () => {
      cy.wrap($iframeBody)
        .contains('Open view in drawer component')
        .click();
      cy.get('.drawer').should('exist');
      cy.expectPathToBe('/projects/pr2');
      cy.get('.drawer .fd-dialog__close').should('not.exist');
      cy.wrap($iframeBody)
        .contains('go back: single iframe, standard history back')
        .click();
      cy.get('.drawer').should('not.exist');
    });

    it('Open and close drawer component with webcomponent', () => {
      cy.window().then(win => {
        win.Luigi.navigation().openAsDrawer('/projects/pr1/webcomponent');
        cy.get('.drawer').should('exist');
        cy.expectPathToBe('/projects/pr2');

        cy.get('.drawer-dialog button[aria-label="close"]')
          .should('exist')
          .click();
        cy.get('.drawer').should('not.exist');
      });
    });

    it('Check main iframe width after Open and close drawer component with default settings', () => {
      cy.window().then(win => {
        cy.get('.fd-page.iframeContainer iframe').then($container => {
          cy.get('#app').then($page => {
            const containerWidth = parseFloat(win.getComputedStyle($container[0]).width);
            const pageWidth = parseFloat(win.getComputedStyle($page[0]).width);

            cy.get('.iframeContainer iframe')
              .invoke('width')
              .should('eq', containerWidth);

            cy.wrap($iframeBody)
              .contains('Open drawer with no overlap')
              .click();

            cy.wait(500);

            cy.get('.drawer-dialog')
              .invoke('width')
              .should('eq', pageWidth * 0.25);

            cy.get('.iframeContainer iframe')
              .invoke('width')
              .should('eq', containerWidth - pageWidth * 0.25);
            cy.expectPathToBe('/projects/pr2');

            // cy.get('.drawer-dialog button[aria-label="close"]')
            //   .should('exist')
            //   .click();

            // cy.get('.iframeContainer iframe')
            //   .invoke('width')
            //   .should('eq', containerWidth);
          });
        });
      });
    });

    it('Check main iframe width after Open and close drawer component with webcomponent', () => {
      cy.window().then(win => {
        cy.get('.fd-page.iframeContainer iframe').then($container => {
          cy.get('#app').then($page => {
            const containerWidth = parseFloat(win.getComputedStyle($container[0]).width);
            const pageWidth = parseFloat(win.getComputedStyle($page[0]).width);

            cy.get('.iframeContainer iframe')
              .invoke('width')
              .should('eq', containerWidth);

            win.Luigi.navigation().openAsDrawer('/projects/pr1/webcomponent', { overlap: false });

            cy.wait(300);

            cy.get('.drawer-dialog')
              .invoke('width')
              .should('eq', pageWidth * 0.25);

            cy.get('.iframeContainer iframe')
              .invoke('width')
              .should('eq', containerWidth - pageWidth * 0.25);
            cy.expectPathToBe('/projects/pr2');

            cy.get('.drawer-dialog button[aria-label="close"]')
              .should('exist')
              .click();

            cy.wait(300);

            cy.get('.iframeContainer iframe')
              .invoke('width')
              .should('eq', containerWidth);
          });
        });
      });
    });
  });

  describe('Webcomponent visibleForFeatureToggles test', () => {
    beforeEach(() => {
      cy.visitLoggedIn('/projects/pr1/wc_grid');
      cy.window().then(win => {
        const config = win.Luigi.getConfig();
        config.settings.experimental = { webcomponents: true };
        win.Luigi.configChanged();
      });
    });

    it('open webcomponent with visibleForFeatureToggles', () => {
      cy.window().then(win => {
        cy.wait(500);
        cy.get('.wcContainer>div>div>*').then(container => {
          const root = container.children().prevObject[0].shadowRoot;
          const wcContent = root.querySelector('p').innerText;
          expect(wcContent).to.equal('Some input text !ft');
        });
      });
    });
  });

  describe('Webcomponent compound view test', () => {
    beforeEach(() => {
      cy.visitLoggedIn('/projects/pr1/wc_grid_compound');
      cy.window().then(win => {
        const config = win.Luigi.getConfig();
        config.settings.experimental = { webcomponents: true };
        win.Luigi.configChanged();
      });
    });

    it('open webcomponent btn', () => {
      cy.window().then(win => {
        cy.wait(500);
        cy.get('.wcContainer>div>div>*').then(container => {
          const root = container.children().prevObject[0].shadowRoot;
          const wcContent = root.querySelector('button').innerText;

          expect(wcContent).to.equal('Start');
        });
      });
    });

    it('open webcomponent timer', () => {
      cy.window().then(win => {
        cy.wait(500);
        cy.get('.wcContainer>div>div>*').then(container => {
          const root = container.children().prevObject[1].shadowRoot;
          const wcContent = root.querySelector('p').innerText;

          expect(wcContent).to.equal('0');
        });
      });
    });

    it('click on webcomponent btn', () => {
      cy.window().then(win => {
        cy.wait(500);
        cy.get('.wcContainer>div>div>*').then(container => {
          const root = container.children().prevObject[0].shadowRoot;
          root.querySelector('button').click();
          const wcContent = root.querySelector('button').innerText;

          expect(wcContent).to.equal('Stop');
        });
      });
    });

    it('listener on webcomponent timer', () => {
      cy.window().then(win => {
        cy.wait(500);
        cy.get('.wcContainer>div>div>*').then(container => {
          const rootBtn = container.children().prevObject[0].shadowRoot;
          rootBtn.querySelector('button').click();
          const root = container.children().prevObject[1].shadowRoot;
          const wcContent = root.querySelector('p').innerText;

          expect(wcContent).to.equal('1');
        });
      });
    });

    it('click start timer on  webcomponent btn and reaction in webcomponent timer', () => {
      cy.window().then(win => {
        cy.wait(500);
        cy.get('.wcContainer>div>div>*').then(container => {
          const rootBtn = container.children().prevObject[0].shadowRoot;
          const wcContentStart = container.children().prevObject[1].shadowRoot.querySelector('p').innerText;
          rootBtn.querySelector('button').click();
          const wcContent = rootBtn.querySelector('button').innerText;
          expect(wcContent).to.equal('Stop');

          cy.wait(500);
          const wcContentStop = container.children().prevObject[1].shadowRoot.querySelector('p').innerText;
          expect(wcContentStart).to.not.equal(wcContentStop);
        });
      });
    });

    it('click start and stop timer on webcomponent btn and reaction in webcomponent timer', () => {
      cy.window().then(win => {
        cy.wait(500);
        cy.get('.wcContainer>div>div>*').then(container => {
          const rootBtn = container.children().prevObject[0].shadowRoot;
          rootBtn.querySelector('button').click();
          cy.wait(500);

          rootBtn.querySelector('button').click();
          const wcContent = rootBtn.querySelector('button').innerText;
          expect(wcContent).to.equal('Start');

          const wcContentStart = container.children().prevObject[1].shadowRoot.querySelector('p').innerText;
          cy.wait(500);
          const wcContentStop = container.children().prevObject[1].shadowRoot.querySelector('p').innerText;
          expect(wcContentStart).to.equal(wcContentStop);
        });
      });
    });
  });
});
