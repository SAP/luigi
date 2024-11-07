describe('Iframe Container Test', () => {
  const containerSelector = '[data-test-id="iframe-based-container-test"]';
  let stub;

  beforeEach(() => {
    cy.visit('http://localhost:8080/iframe/iframeContainer.html');
    stub = cy.stub();
  });

  it('should sent third party cookies request', () => {
    cy.on('window:alert', stub);

    cy.get(containerSelector).should('not.have.attr', 'skip-cookie-check');
    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then(() => {
        cy.wrap(stub).should('have.been.calledWith', 'set-third-party-cookies-request');
        cy.getCookie('luigiCookie').should('not.exist');
      });
  });

  it('navigation sent', () => {
    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then((iframe) => {
        const $body = iframe.contents().find('body');
        cy.wrap($body).contains('test navigate').click();

        cy.location().should((loc) => {
          expect(loc.href).to.eq('http://localhost:8080/');
        });
      });
  });

  it('sendCustomMessage', () => {
    cy.get('#btn-1').click();
    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then((iframe) => {
        const $body = iframe.contents().find('body');
        cy.wrap($body).find('#content').should('have.text', 'Received Custom Message: some data');
      });
  });

  it('custom message sent', () => {
    cy.on('window:alert', stub);

    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then((iframe) => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('test custom message')
          .click()
          .then(() => {
            cy.wrap(stub).should(
              'have.been.calledWith',
              'Custom message received: {"id":"my.customMessage","_metaData":{},"data":{"bar":"foo"}}'
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
          .then((iframe) => {
            const $body = iframe.contents().find('body');

            cy.wrap($body)
              .contains('Get Context')
              .click()
              .then(() => {
                cy.wrap(stub).should(
                  'have.been.calledWith',
                  'Custom message received: {"id":"my.contextMessage","_metaData":{},"data":{"myContext":"some context data"}}'
                );
              });
          });
      });
  });

  it('set auth token', () => {
    cy.on('window:alert', stub);

    cy.get('button[id="update-token"]').click();

    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then((iframe) => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('test get token')
          .click()
          .then(() => {
            cy.wrap(stub).should(
              'have.been.calledWith',
              'Custom message received: {"id":"token.updated","_metaData":{},"data":{"value":"updated token"}}'
            );
          });
      });
  });

  it('openAsModal', () => {
    cy.on('window:confirm', () => false);

    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then((iframe) => {
        const $body = iframe.contents().find('body');
        cy.wrap($body).contains('test openAsModal()').click();

        cy.location().should((loc) => {
          expect(loc.hash).to.eq('#openAsModal-iframe');
        });
      });
  });

  it('openAsDrawer', () => {
    cy.on('window:confirm', () => false);

    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then((iframe) => {
        const $body = iframe.contents().find('body');
        cy.wrap($body).contains('test openAsDrawer').click();

        cy.location().should((loc) => {
          expect(loc.hash).to.eq('#openAsDrawer-iframe');
        });
      });
  });

  it('openAsSplitview', () => {
    cy.on('window:confirm', () => false);

    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then((iframe) => {
        const $body = iframe.contents().find('body');
        cy.wrap($body).contains('test openAsSplitview').click();

        cy.location().should((loc) => {
          expect(loc.hash).to.eq('#openAsSplitview-iframe');
        });
      });
  });
});
