describe('SplitView', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('tets@email.com', 'tets', true);
    cy.visit('/projects/pr2');
  });

  it('Opens a Split View and collapses and expands', () => {
    cy.get('iframe').then($iframe => {
      const $iframeBody = $iframe.contents().find('body');

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
    cy.get('iframe').then($iframe => {
      const $iframeBody = $iframe.contents().find('body');

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
        test.buttonsVisible.forEach((enabled, index) => {
          cy.splitViewButtons($iframeBody)
            .contains(buttons[index])
            .should(enabled ? 'not.be.disabled' : 'be.disabled');
        });
        cy.splitViewButtons($iframeBody)
          .contains(test.buttonToClick)
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
