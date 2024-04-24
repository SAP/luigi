describe('Simple Examples Iframe Container Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:2222');
  });

  it('Iframe Container Test', () => {
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
    cy.visit('http://localhost:2222');
    cy.visit('http://localhost:2222/container-wc/index.html');

    // cy.get('luigi-container').shadow();
    const a = cy
      .get('luigi-container')
      .shadow()
      .then(t => {
        console.log('luigi-container', t);

        console.log('luigi-container[0]', t[0]);

        console.log('luigi-container[0].innerHtml', t[0].innerHTML);
        console.log('luigi-container[0].children[1]', t[0].children[1]);
      });

    // console.log(
    //   JSON.stringify(a)
    //   )
    cy.get('luigi-container')
      .shadow()
      .find('main');

    cy.get('luigi-container')
      .shadow()
      .find('h2')
      .should('contain.text', 'This is a webcomponent based microfrontend container  -- some content --');
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
