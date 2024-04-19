describe('Simple Examples Iframe Container Test', () => {
  it.only('Iframe Container Test', () => {
    cy.visit('http://localhost:2222/container-iframe/index.html');

    cy.get('luigi-container')
      .shadow()
      .get('iframe')
      .then(iframe => {
        const $body = iframe.contents().find('body');
        cy.wrap($body).contains('This is an iframe based microfrontend container');
      });
  });

  it.only('WebComponent Container Test', () => {
    cy.visit('http://localhost:2222/container-wc/index.html');

    cy.get('luigi-container')
      .shadow()
      .then(container => {

        cy.wrap(container)
        .get('luigi-wc-687474703a2f2f6c6f63616c686f73743a323232322f636f6e7461696e65722d77632f636f6e7461696e65722d77632f6d79576562636f6d706f6e656e742e6a73')
        .shadow()
        .then(shadowRoot =>{
          const $content = shadowRoot.contents()
          cy.wrap($content).should('contain','This is a webcomponent based microfrontend container  -- some content --')
        })
      });
  });

// TODO
  it.only('Compound WebComponent Container Test', () => {
    cy.visit('http://localhost:2222/container-wc/index.html');

    cy.get('luigi-container')
      .shadow()
      .then(container => {

        cy.wrap(container)
        .get('luigi-wc-687474703a2f2f6c6f63616c686f73743a323232322f636f6e7461696e65722d77632f636f6e7461696e65722d77632f6d79576562636f6d706f6e656e742e6a73')
        .shadow()
        .then(shadowRoot =>{
          const $content = shadowRoot.contents()
          cy.wrap($content).should('contain','This is a webcomponent based microfrontend container  -- some content --')
        })
      });
  });

  // it('WebComponent Container Test', () => {
  //   cy.visit('http://localhost:8080/index2.html');

  //   cy.get('[data-test-id="iframe-mf-w-messages"]')
  //     .shadow()
  //     .get('iframe')
  //     .then(iframe => {
  //       const $body = iframe.contents().find('body');
  //       cy.wrap($body)
  //         .contains('test custom message')
  //         .click()
  //         .then(() => {
  //           expect(stub.getCall(0)).to.be.calledWith('set-third-party-cookies-request');
  //           expect(stub.getCall(1)).to.be.calledWith(
  //             'Custom message recieved: {"id":"my.customMessage","_metaData":{},"data":{"bar":"foo"}}'
  //           );
  //         });
  //     });
  // });

  // it('Compound WC Container Test', () => {
  //   cy.visit('http://localhost:8080/index2.html');

  //   cy.get('[data-test-id="iframe-mf-w-messages"]')
  //     .shadow()
  //     .get('iframe')
  //     .then(iframe => {
  //       const $body = iframe.contents().find('body');
  //       cy.wrap($body)
  //         .contains('test custom message')
  //         .click()
  //         .then(() => {
  //           expect(stub.getCall(0)).to.be.calledWith('set-third-party-cookies-request');
  //           expect(stub.getCall(1)).to.be.calledWith(
  //             'Custom message recieved: {"id":"my.customMessage","_metaData":{},"data":{"bar":"foo"}}'
  //           );
  //         });
  //     });
  // });
});
