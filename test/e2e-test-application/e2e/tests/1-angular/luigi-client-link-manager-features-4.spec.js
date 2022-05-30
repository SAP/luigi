describe('Luigi client linkManager webcomponent drawer', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
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

  describe('Split View', () => {
    let $iframeBody;
    beforeEach(() => {
      cy.visitLoggedIn('/projects/pr2');
      cy.getIframeBody().then(result => {
        $iframeBody = result;
        cy.goToLinkManagerMethods($iframeBody);
        cy.expectPathToBe('/projects/pr2');
        cy.get('.lui-split-view').should('not.exist');
      });
    });

    it('Open Split View component with default settings', () => {
      cy.wrap($iframeBody)
        .contains('open view in split view with params')
        .click();

      cy.get('.lui-split-view').should('exist');
      cy.expectPathToBe('/projects/pr2');
    });

    it('Check main iframe height after open Split View component with default settings', () => {
      cy.window().then(win => {
        cy.get('.fd-page.iframeContainer').then($iframe => {
          const iframeHeight = parseFloat(win.getComputedStyle($iframe[0]).height);

          cy.get('.iframeContainer')
            .invoke('height')
            .should('eq', iframeHeight);

          cy.wrap($iframeBody)
            .contains('open view in split view with params')
            .click();

          cy.wait(500);

          cy.get('.splitViewContainer').then($splitViewContainer => {
            const splitViewHeight = parseFloat(win.getComputedStyle($splitViewContainer[0]).height);

            cy.get('.splitViewContainer')
              .invoke('height')
              .should('eq', splitViewHeight);

            if (`${splitViewHeight}px` === win.getComputedStyle($iframe[0]).marginBottom) {
              cy.log('Positive');
            } else {
              cy.error('Negative');
            }
            cy.expectPathToBe('/projects/pr2');
          });
        });
      });
    });

    it('Check main iframe height after open and close Split View component with default settings', () => {
      cy.window().then(win => {
        cy.get('.fd-page.iframeContainer').then($iframe => {
          const iframeHeight = parseFloat(win.getComputedStyle($iframe[0]).height);

          cy.get('.iframeContainer')
            .invoke('height')
            .should('eq', iframeHeight);

          cy.wrap($iframeBody)
            .contains('open view in split view with params')
            .click();

          cy.wait(500);

          cy.get('.splitViewContainer').then($splitViewContainer => {
            cy.get('.lui-collapse-btn').click();

            cy.wait(500);

            const splitViewHeight = parseFloat(win.getComputedStyle($splitViewContainer[0]).height);

            if (`${splitViewHeight}px` === win.getComputedStyle($iframe[0]).marginBottom) {
              cy.log('Positive');
            } else {
              cy.error('Negative');
            }
            cy.expectPathToBe('/projects/pr2');
          });
        });
      });
    });
  });

  describe('Webcomponent visibleForFeatureToggles test', () => {
    beforeEach(() => {
      cy.visitLoggedIn('/projects/pr1/wc_grid');
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
    });

    it('open webcomponent btn', () => {
      cy.window().then(win => {
        cy.wait(700);
        cy.get('.wcContainer>div>div>*').then(container => {
          cy.wait(500);
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

          const wcContentStart = container.children().prevObject[1].shadowRoot.querySelector('p').innerText;

          rootBtn.querySelector('button').click();
          const wcContent = rootBtn.querySelector('button').innerText;
          expect(wcContent).to.equal('Start');

          cy.wait(500);
          const wcContentStop = container.children().prevObject[1].shadowRoot.querySelector('p').innerText;
          expect(wcContentStart).to.not.equal(wcContentStop);
        });
      });
    });
  });

});
