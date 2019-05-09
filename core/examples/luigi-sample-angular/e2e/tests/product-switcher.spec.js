describe('ProductSwitcher', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('tets@email.com', 'tets');
  });
  context('Desktop', () => {
    beforeEach(() => {
      // run these tests as if in a desktop
      cy.viewport('macbook-15');
    });

    it('Clicking around the product switcher', () => {
      //check if hybris is there
      cy.get('.fd-product-switcher')
        .click()
        .contains('hybris');

      //check if internal link is there
      cy.get(
        '.fd-product-switcher .fd-product-switcher__body .fd-product-switcher__product-title'
      )
        .contains('Project 1')
        .click();

      cy.expectPathToBe('/projects/pr1');
    });

    it('Mobile Product Switcher is not visible', () => {
      cy.get('[data-cy="mobile-product-switcher"]').should('not.be.visible');
    });
  });

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
    });

    it('Desktop Product Switcher is not visible', () => {
      cy.get('[data-cy="desktop-product-switcher"]').should('not.be.visible');
    });

    it('Should be able to select product', () => {
      cy.get('[data-cy="mobile-menu"]').click();

      //open mobile product switcher
      cy.get('[data-cy="mobile-product-switcher"]').click();

      //check if internal link is there
      cy.get('.y-full-width-list__title')
        .contains('Project 1')
        .click();

      cy.expectPathToBe('/projects/pr1');
    });

    it('Should be able to close', () => {
      cy.get('[data-cy="mobile-menu"]').click();

      //open mobile product switcher
      cy.get('[data-cy="mobile-product-switcher"]').click();

      //close mobile product switcher
      cy.get('[data-cy="mobile-product-switcher-close"]').click();

      //no product switcher is visible
      cy.get('.fd-product-switcher').should('not.be.visible');

      //the path wasn't changed
      cy.expectPathToBe('/overview');
    });
  });
});
