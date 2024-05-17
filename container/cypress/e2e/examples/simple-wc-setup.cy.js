describe('Simple Examples Iframe Container Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:2222/container-wc/index.html');
  });

  it('wc contains text', () => {

 cy.get('[data-test-id="luigi-client-api-test-01"]')
       .shadow()
      .contains('This is a webcomponent based microfrontend container');
  });
});
