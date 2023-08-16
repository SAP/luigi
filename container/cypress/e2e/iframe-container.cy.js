describe('Iframe Container Test', () => {
  it('navigation sent', () => {
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

  it('custom message sent', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

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
