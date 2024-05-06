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

    // cy.get('[data-test-id="luigi-container-element"]')
    // .shadow()
    // .contains('This is a webcomponent based microfrontend container  -- some content --')

    cy.get('luigi-container')
      .shadow()
      .get(
        'luigi-wc-687474703a2f2f6c6f63616c686f73743a323232322f636f6e7461696e65722d77632f636f6e7461696e65722d77632f6d79576562636f6d706f6e656e742e6a73'
      )
      .shadow()
      // .shadow()
      .find('h2')
      .should('contain.text', 'This is a webcomponent based microfrontend container  -- some content --');
  });
});
