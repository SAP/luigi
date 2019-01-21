describe('ProductSwitcher', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.login('tets@email.com', 'tets');
  });

  it('Clicking around the product switcher', () => {
    //check if google is there
    cy.get('.fd-product-switcher')
      .click()
      .contains('hybris');

    //check if internal link is there
    cy.get('.fd-product-switcher')
      .click()
      .contains('Project 1');
  });
});
