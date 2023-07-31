describe('Iframe Container Test', () => {
  it('Test Navigate', () => {
    cy.visit('http://localhost:8080');
    cy.visit('http://localhost:8080/#projects');

    cy.get('[data-test-id="iframe-based-container-test"]')
      .shadow()
      .get('iframe')
      .then(iframe => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('test navigate')
          .click();

        cy.location().should(loc => {
          expect(loc.href).to.eq('http://localhost:8080/#/');
        });
      });
  });
});
