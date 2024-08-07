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

  it('update context', () => {
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

  it('defer-init flag for iframe container', () => {
    cy.get('#defer-init-test').then(iframe => {
      const $body = iframe.contents().find('main');
      expect($body.children()).to.have.length(0);

      // click button that calls container.init()
      cy.get('#init-button').click();

      cy.get('#defer-init-test')
        .shadow()
        .get('iframe')
        .then(iframe => {
          const $body = iframe.contents().find('body');
          cy.wrap($body)
            .contains('defer-init test for iframes')
            .should('exist');
        });
    });
  });

  it('set auth token', () => {
    cy.on('window:alert', stub);

    cy.get('button[id="update-token"]').click();

    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then(iframe => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('test get token')
          .click()
          .then(() => {
            cy.wrap(stub).should(
              'have.been.calledWith',
              'Custom message recieved: {"id":"token.updated","_metaData":{},"data":{"value":"updated token"}}'
            );
          });
      });
  });

  it('set sandbox rules by property', () => {
    cy.get('button[id="sandbox-rules"]').click();

    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then(elements => {
        cy.get(elements.first())
          .invoke('attr', 'sandbox')
          .should('eq', 'allow-modals allow-popups');
      });
  });

  it('set sandbox rules by attribute', () => {
    cy.get('#sandbox-rules-test')
      .shadow()
      .get('iframe')
      .then(elements => {
        cy.get(elements.last())
          .invoke('attr', 'sandbox')
          .should('eq', 'allow-scripts allow-same-origin');
      });
  });
});
