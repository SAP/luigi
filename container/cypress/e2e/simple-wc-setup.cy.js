describe('Simple Examples Iframe Container Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:2222');
  });

  // it('Iframe Container Test', () => {
  //   cy.visit('http://localhost:2222/container-iframe/index.html');

  //   cy.get('luigi-container')
  //     .shadow()
  //     .get('iframe')
  //     .then(iframe => {
  //       const $body = iframe.contents().find('body');
  //       cy.wrap($body).contains('This is an iframe based microfrontend container');
  //     });
  // });

  it('WebComponent Container Test', () => {
    cy.visit('http://localhost:2222/container-wc/index.html');

     cy.get('luigi-container')
      .shadow()
      .find('h2')
      .should('contain.text', 'This is a webcomponent based microfrontend container  -- some content --');
  });
});
