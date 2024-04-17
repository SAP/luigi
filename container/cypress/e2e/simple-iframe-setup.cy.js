describe('Simple Examples Iframe Container Test', () => {
  it.only('Iframe Container Test', () => {
    cy.visit('http://localhost:2222/container-iframe/index.html');
    
    cy.get('luigi-container')
      .shadow()
      .get('iframe')
      .then(iframe => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('This is an iframe based microfrontend container')
      });
  });


  it.only('WebComponent Container Test', () => {
    cy.visit('http://localhost:2222/container-wc/index.html');
    
    cy.get('luigi-container')
    .shadow()
    .then($container => {
      const $content = $container.contents().find('main')

      
      // .contains();
      console.log($content)
        cy.wrap($content)
        
        // .shadow()
        // cy.wrap($content)
        // .contains(
        //   'This is a webcomponent based microfrontend container  -- some content --'
        // )
    });

  });

  it('WebComponent Container Test', () => {

    cy.visit('http://localhost:8080/index2.html');

    cy.get('[data-test-id="iframe-mf-w-messages"]')
      .shadow()
      .get('iframe')
      .then(iframe => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('test custom message')
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith('set-third-party-cookies-request');
            expect(stub.getCall(1)).to.be.calledWith(
              'Custom message recieved: {"id":"my.customMessage","_metaData":{},"data":{"bar":"foo"}}'
            );
          });
      });
  });

  it('Compound WC Container Test', () => {

    cy.visit('http://localhost:8080/index2.html');

    cy.get('[data-test-id="iframe-mf-w-messages"]')
      .shadow()
      .get('iframe')
      .then(iframe => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('test custom message')
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith('set-third-party-cookies-request');
            expect(stub.getCall(1)).to.be.calledWith(
              'Custom message recieved: {"id":"my.customMessage","_metaData":{},"data":{"bar":"foo"}}'
            );
          });
      });
  });
});
