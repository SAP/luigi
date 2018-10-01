describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Click around using navigation', () => {
    cy.login('tets@email.com', 'tets');

    // projects page
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

    // keep selected for children example
    cy.get('.fd-ui__header')
      .contains('Overview')
      .click();

    // dig into the iframe
    cy.wait(50);
    cy.get('iframe').then(function ($element) {
      // this gets the body of your iframe
      const $body = $element.contents().find('body');
      // wrap this body with cy so as to do cy actions inside iframe elements
      const cyElement = cy.wrap($body);
      //now you can forget about that you are in iframe. you can do necessary actions finding the elements inside the iframe
      // {cyElement is the cypress object here}
      cyElement.find('.fd-list-group__item strong')
        .contains('keepSelectedForChildren')
        .click();

      const $body2 = $element.contents().find('body');
      // wrap this body with cy so as to do cy actions inside iframe elements
      const cyElement2 = cy.wrap($body2);
      cyElement2.find('.fd-list-group__item')
        .contains('Thor')
        .click();
    });

    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/projects/pr1/avengers/thor');
    });

    cy.get('.fd-app__sidebar').should('contain', 'Keep Selected Example');
  });
});
