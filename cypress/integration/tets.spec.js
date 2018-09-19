context('Luigi Sample Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
  });

  it('tets', () => {
    cy.get('.form-input')
      .first()
      .clear()
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');

    cy.get('.form-input')
      .last()
      .clear()
      .type('tets')
      .should('have.value', 'tets');

    cy.get('#login-button').click();

    cy.get('.fd-global-nav')
      .first()
      .contains('Overview');
  });
});
