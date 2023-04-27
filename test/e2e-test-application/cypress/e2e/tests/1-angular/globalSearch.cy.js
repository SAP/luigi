describe('Global Search', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });

  describe('Open search field ', () => {
    it('Click on field', () => {
      // Input should be not visible
      cy.get('input[data-testid="luigi-search-input"]').should('not.be.visible');

      // Click on Search Button
      cy.get('button[data-testid="luigi-search-btn-desktop"]')
        .should('exist')
        .click();

      // Input should be visible
      cy.get('input[data-testid="luigi-search-input"]').should('be.visible');

      // Click on Search Button
      cy.get('button[data-testid="luigi-search-btn-desktop"]')
        .should('exist')
        .click();

      // Input should be not visible
      cy.get('input[data-testid="luigi-search-input"]').should('not.be.visible');
    });
  });

  describe('Check Placeholder ', () => {
    it('Does it have placeholder?', () => {
      // It should have placeholder
      cy.get('input[data-testid="luigi-search-input"]').should(
        'have.attr',
        'placeholder',
        'Digit here text to search....'
      );
    });
  });

  describe('Check toggleSearch function ', () => {
    it('toggleSearch had been executed?', () => {
      // Click on Search Button
      cy.get('button[data-testid="luigi-search-btn-desktop"]')
        .should('exist')
        .click();

      // toggleSearch function should had been executed... input value should be open
      cy.get('input[data-testid="luigi-search-input"]').should('have.attr', 'data-togglesearch', 'open');

      // Click on Search Button
      cy.get('button[data-testid="luigi-search-btn-desktop"]')
        .should('exist')
        .click();

      // toggleSearch function should had been executed...input value should be close
      cy.get('input[data-testid="luigi-search-input"]').should('have.attr', 'data-togglesearch', 'close');
    });
  });

  describe('Get results', () => {
    it('Type something and get results', () => {
      // Click on Search Button
      cy.get('button[data-testid="luigi-search-btn-desktop"]')
        .should('exist')
        .click();

      // Type Luigi in search input textbox
      cy.get('input[data-testid="luigi-search-input"]')
        .should('be.visible')
        .type('De');

      // We should get 5 results
      cy.get('.luigi-search-popover__body .fd-menu .fd-menu__list')
        .should('be.visible')
        .children()
        .should('have.length', 8);
    });

    it('Click on Projects result', () => {
      // Click on Search Button
      cy.get('button[data-testid="luigi-search-btn-desktop"]')
        .should('exist')
        .click();

      // Type Luigi in search input textbox
      cy.get('input[data-testid="luigi-search-input"]')
        .should('be.visible')
        .type('Overview');

      // Click on first result
      cy.get('.luigi-search-popover__body .fd-menu .fd-menu__list')
        .contains('Overview')
        .click();

      // Url should be changed
      cy.expectPathToBe('/overview');
    });
  });
});
