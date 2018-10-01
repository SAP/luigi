describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Click around using navigation', () => {
    cy.login('tets@email.com', 'tets');

    //overview page
    cy.get('.fd-ui__header')
      .contains('Projects')
      .click();

    //projects page
    cy.get('.fd-app__sidebar').should('contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Project Two');
    cy.get('.fd-app__sidebar')
      .contains('Project One')
      .click();

    //project one page
    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/projects/pr1');
    });
    cy.get('.fd-app__sidebar').should('not.contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Miscellaneous2');
    cy.get('.fd-app__sidebar')
      .contains('Default Child Node Example')
      .click();

    //default child node example
    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/projects/pr1/dps/dps2');
    });
    cy.get('.fd-app__sidebar').should('contain', 'First Child');
    cy.get('.fd-app__sidebar').should('contain', 'Second Child');
  });
});
