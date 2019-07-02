describe('TopNavDropDown', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('tets@email.com', 'tets');
  });
  context('Desktop', () => {
    beforeEach(() => {
      // run these tests as if in a desktop
      cy.viewport('macbook-15');
    });

    it('Clicking around drop down in TopNav', () => {
      //check if google is there
      cy.get('[data-e2e="topnav-category"]').click();

      cy.get('[data-e2e="topnav-dropdown-item"]').contains(
        'Open Google in this tab'
      );

      cy.get('[data-e2e="topnav-dropdown-item"]')
        .contains('Visible for all users')
        .click();

      cy.expectPathToBe('/all-users');
    });
  });

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
    });

    it('Should be able to select product', () => {
      cy.get('[data-cy="mobile-menu"]').click();

      //open mobile topnav dropdown
      cy.get('[data-cy="mobile-topnav-dropdown-category"]').click();

      cy.get('[data-cy="mobile-topnav-dropdown-item"]')
        .contains('Visible for all users')
        .click();

      cy.expectPathToBe('/all-users');
    });

    it('Should be able to close', () => {
      cy.get('[data-cy="mobile-menu"]').click();

      //open mobile topnav dropdown
      cy.get('[data-cy="mobile-topnav-dropdown-category"]').click();

      //close mobile topnav dropdown
      cy.get('[data-cy="mobile-topnav-dropdown-close"]').click();

      //no mobile topnav dropdown is visible
      cy.get('.fd-product-switcher').should('not.be.visible');

      //the path wasn't changed
      cy.expectPathToBe('/overview');
    });
  });
});
