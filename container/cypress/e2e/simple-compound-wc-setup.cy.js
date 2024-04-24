describe('Simple Examples Iframe Container Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:2222');
  });

  it('Compound WebComponent Container Test', () => {
    cy.visit('http://localhost:2222/compound-container/index.html');

    const a = cy
      .get('luigi-compound-container')
      .shadow()
      .then(t => {
        console.log('\n Compound 0', t);

        console.log('\n Compound 1', t[0]);

        console.log('\n Compound 2', t[0].innerHTML);
        console.log('Compound[0].children[1]', t[0].children[1]);
      });

    cy.get('luigi-compound-container')
      .shadow()
      .find('h2')
      .should('contain.text', 'Hello From Web Component 1 some extra content');

    cy.get('luigi-compound-container')
      .shadow()
      .find('h2')
      .should('contain.text', 'Hello From Web Component 2');

    cy.get('luigi-compound-container')
      .shadow()
      .find('h2')
      .should('contain.text', 'Hello From Web Component 3');

    cy.get('luigi-compound-container')
      .shadow()
      .find('h2')
      .should('contain.text', 'Hello From Web Component 4');
  });
});
