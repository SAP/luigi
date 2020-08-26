Cypress.env('RETRIES', 1);
describe('Modal Microfrontend', () => {
  let $iframeBody;
  beforeEach(() => {
    cy.visitLoggedIn('/');

    cy.getIframeBody().then(result => {
      $iframeBody = result;
    });
  });

  describe('Behaviour when used in LinkManager', () => {
    beforeEach(() => {
      cy.goToLinkManagerMethods($iframeBody);
    });

    it(`doesn't change URL when opened`, () => {
      cy.expectPathToBe('/projects/pr2');

      cy.wrap($iframeBody)
        .contains('rendered in a modal')
        .click();

      cy.expectPathToBe('/projects/pr2');
    });

    it(`can be closed by Close Button`, () => {
      cy.wrap($iframeBody)
        .contains('rendered in a modal')
        .click();

      cy.wrap($iframeBody)
        .get('[data-testid=modal-mf]')
        .should('be.visible');

      cy.wrap($iframeBody)
        .get('[data-testid=modal-mf] [aria-label=close]')
        .click();

      cy.wrap($iframeBody)
        .get('[data-testid=modal-mf]')
        .should('not.be.visible');
    });

    it(`can be closed by the Luigi client`, () => {
      cy.wrap($iframeBody)
        .contains('rendered in a modal')
        .click();

      cy.wrap($iframeBody)
        .get('[data-testid=modal-mf]')
        .should('be.visible');

      cy.get('[data-testid=modal-mf] iframe').then(ifr => {
        cy.wrap(ifr[0].contentDocument)
          .its('body')
          .contains('Close modal')
          .click();

        cy.wrap($iframeBody)
          .get('[data-testid=modal-mf]')
          .should('not.be.visible');
      });
    });

    it(`sets proper URL inside iframe`, () => {
      cy.wrap($iframeBody)
        .contains('rendered in a modal')
        .click();

      cy.get('[data-testid=modal-mf] iframe').then(ifr => {
        expect(ifr.attr('src')).to.equal('/sampleapp.html#/settings');
      });
    });

    it(`has the size set directly`, () => {
      cy.wrap($iframeBody)
        .contains('rendered in a modal')
        .click();

      cy.get('[data-testid=modal-mf]').then(modal => {
        expect(modal.attr('style')).to.contain('width:');
        expect(modal.attr('style')).to.contain('height:');
      });
    });

    it(`go back closes the modal`, () => {
      cy.wrap($iframeBody)
        .contains('rendered in a modal')
        .click();

      cy.get('[data-testid=modal-mf] iframe')
        .iframe()
        .then(modal => {
          cy.wrap(modal)
            .contains('Go back')
            .click();
        });

      cy.expectPathToBe('/projects/pr2');
    });
  });
});

describe('SplitView Microfrontend', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/projects/pr2');
  });

  it('Opens a Split View and collapses and expands', () => {
    cy.getIframeBody().then($iframeBody => {
      cy.wrap($iframeBody)
        .contains('open view in split view')
        .click();
      cy.expectPathToBe('/projects/pr2');

      cy.get('.iframeSplitViewCnt iframe').should('exist');

      cy.get('.lui-collapse-btn').click();

      cy.get('.iframeSplitViewCnt iframe').should('not.exist');

      cy.get('.fd-splitView__title').should('contain', 'Logs');

      cy.get('.lui-collapse-btn').click();

      cy.get('.iframeSplitViewCnt iframe').should('exist');
    });
  });

  it('using Client API', () => {
    cy.getIframeBody().then($iframeBody => {
      cy.wrap($iframeBody)
        .contains('open view in split view')
        .click();
      cy.expectPathToBe('/projects/pr2');

      cy.splitViewButtons($iframeBody)
        .contains('close')
        .scrollIntoView();

      const buttons = ['expand', 'collapse', 'setSize', 'close'];
      // button states, same order as buttons array
      const tests = [
        {
          buttonsVisible: [false, true, true, true],
          buttonToClick: 'collapse'
        },
        {
          buttonsVisible: [true, false, false, true],
          buttonToClick: 'expand'
        },
        {
          buttonsVisible: [false, true, true, true],
          buttonToClick: 'setSize'
        },
        {
          buttonsVisible: [false, true, true, true],
          buttonToClick: 'close'
        }
      ];
      tests.forEach(test => {
        cy.wait(50);
        test.buttonsVisible.forEach((enabled, index) => {
          cy.splitViewButtons($iframeBody)
            .contains(buttons[index])
            .should(enabled ? 'not.be.disabled' : 'be.disabled');
        });
        cy.splitViewButtons($iframeBody)
          .contains(test.buttonToClick)
          .should('be.visible')
          .click();
      });

      // after close
      cy.splitViewButtons($iframeBody)
        .contains('close')
        .should('be.disabled');

      cy.get('.iframeSplitViewCnt iframe').should('not.exist');
    });
  });
});

describe('iframeCreationInterceptor test', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/projects/pr2');
    cy.window().then(win => {
      const config = win.Luigi.getConfig();
      config.settings.iframeCreationInterceptor = (
        iframe,
        viewGroup,
        navigationNode,
        microFrontendType
      ) => {
        const style = 'border: 3px dashed ';
        switch (microFrontendType) {
          case 'main':
            console.log(microFrontendType);
            iframe.style.cssText = style + ' green';
            break;
          case 'split-view':
            console.log(microFrontendType);
            iframe.style.cssText = style + ' red';
            break;
          case 'modal':
            console.log(microFrontendType);
            iframe.style.cssText = style + ' blue';
            break;
        }
      };
      win.Luigi.configChanged('settings.header');
    });
  });

  it(`main iframe intercepted`, () => {
    cy.get('iframe').should('have.attr', 'style', 'border: 3px dashed green;');
  });

  it(`split-view iframe intercepted`, () => {
    cy.getIframeBody().then($iframeBody => {
      cy.wrap($iframeBody)
        .contains('open view in split view')
        .click();
      cy.get('#splitViewContainer iframe').should(
        'have.attr',
        'style',
        'border: 3px dashed red;'
      );
    });
  });

  it(`modal iframe intercepted`, () => {
    cy.getIframeBody().then($iframeBody => {
      cy.wrap($iframeBody)
        .contains('rendered in a modal')
        .click();
      cy.get('[data-testid=modal-mf] iframe').should(
        'have.attr',
        'style',
        'border: 3px dashed blue;'
      );
    });
  });
});
