describe('ProductSwitcher', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.login('tets@email.com', 'tets');
  });

  it('Clicking around the product switcher', () => {
    //check if hybris is there
    cy.get('.fd-product-switcher')
      .click()
      .contains('hybris');

    //check if internal link is there
    cy.get('.fd-product-switcher')
      .click()
      .contains('Project 1')
      .click();

    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/projects/pr1');
    });
  });
});
