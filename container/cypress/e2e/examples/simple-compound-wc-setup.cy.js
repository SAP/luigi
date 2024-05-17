describe('Simple Examples Compound Container Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:2222');
  });

  it('Compound WebComponent Container loading inner text', () => {
    cy.visit('http://localhost:2222/compound-container/index.html');

    cy.get('luigi-compound-container')
      .shadow()
      .find('h2')
      .should(
        'contain.text',
        ' Hello From Web Component 1  -- some content -- Hello From Web Component 2  Hello From Web Component 3  Hello From Web Component 4 '
      );
  });
});
