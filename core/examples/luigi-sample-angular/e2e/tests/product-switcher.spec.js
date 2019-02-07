describe('ProductSwitcher', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('tets@email.com', 'tets');
  });

  it('Clicking around the product switcher', () => {
    //check if hybris is there
    cy.get('.fd-product-switcher')
      .click()
      .contains('hybris');

    //check if internal link is there
    cy.get('.fd-product-switcher .fd-product-switcher__body')
      .contains('Project 1')
      .click();

    cy.expectPathToBe('/projects/pr1');
  });
});
