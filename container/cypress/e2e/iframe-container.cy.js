describe('Iframe Container Test', () => {
  it('navigation sent', () => {
    cy.visit('http://localhost:8080/iframeContainer.html');

    cy.get('[data-test-id="iframe-based-container-test"]')
      .shadow()
      .get('iframe')
      .then(iframe => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('test navigate')
          .click();

        cy.location().should(loc => {
          expect(loc.href).to.eq('http://localhost:8080/iframeContainer.html#/test');
        });
      });
  });

  it('custom message sent', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.visit('http://localhost:8080/iframeContainer.html');

    cy.get('[data-test-id="iframe-based-container-test"]')
        .shadow()
        .get('iframe')
        .then(iframe => {
            const $body = iframe.contents().find('body');
            cy.wrap($body)
                .contains('test custom message')
                .click()
                .then(() => {
                    cy.wrap(stub).should('have.been.calledWith', 'Custom message recieved: {"id":"my.customMessage","_metaData":{},"data":{"bar":"foo"}}');
                });
        });
  });
});
