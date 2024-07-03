describe('Iframe Container Test', () => {
  const containerSelector = '[data-test-id="iframe-based-container-test"]';
  let stub;

  beforeEach(() => {
    cy.visit('http://localhost:8080/iframe/iframeContainer.html');
    stub = cy.stub();
  });

  it('navigation sent', () => {
    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then(iframe => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('test navigate')
          .click();

        cy.location().should(loc => {
          expect(loc.href).to.eq('http://localhost:8080/');
        });
      });
  });

  it('custom message sent', () => {
    cy.on('window:alert', stub);

    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then(iframe => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('test custom message')
          .click()
          .then(() => {
            cy.wrap(stub).should(
              'have.been.calledWith',
              'Custom message recieved: {"id":"my.customMessage","_metaData":{},"data":{"bar":"foo"}}'
            );
          });
      });
  });

  it('updateContext', () => {
    cy.on('window:alert', stub);

    cy.get('#update-ctx')
      .click()
      .then(() => {
        cy.get(containerSelector)
          .shadow()
          .get('iframe')
          .then(iframe => {
            const $body = iframe.contents().find('body');

            cy.wrap($body)
              .contains('Get Context')
              .click()
              .then(() => {
                cy.wrap(stub).should(
                  'have.been.calledWith',
                  'Custom message recieved: {"id":"my.contextMessage","_metaData":{},"data":{"myContext":"some context data"}}'
                );
              });
          });
      });
  });
});
