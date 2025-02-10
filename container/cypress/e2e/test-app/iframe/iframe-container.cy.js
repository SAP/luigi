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

  it('showAlert', () => {
    cy.on('window:alert', stub);

    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then((iframe) => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('test showAlert')
          .click()
          .then(() => {
            cy.wrap(stub).should('have.been.calledWith', 'show-alert-request message received: {"isTrusted":true}');
          });
      });
  });

  it('goBack', () => {
    cy.on('window:alert', stub);

    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then((iframe) => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('test goBack')
          .click()
          .then(() => {
            console.log(cy.wrap(stub));
            cy.wrap(stub).should('have.been.calledWith', 'navigate-back-request');
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

                //Test if context property on luigi container is also updated
                cy.get('#container-ctx')
                  .invoke('html')
                  .then((innerHtml) => {
                    expect(innerHtml).to.include('{"myContext":"some context data"}');
                  });
              });
          });
      });
  });

  it('update viewUrl', () => {
    cy.on('window:alert', stub);

    cy.get('#update-view-url')
      .click()
      .then(() => {
        cy.get(containerSelector)
          .shadow()
          .get('iframe')
          .then((iframe) => {
            const $body = iframe.contents().find('body');

            cy.wrap($body)
              .contains('test history state')
              .click()
              .then(() => {
                cy.wrap(stub).should(
                  'have.been.calledWith',
                  'Custom message received: {"id":"my.historyMessage","_metaData":{},"data":{"state":{"luigiInduced":true}}}'
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
  it('getPathParams', () => {
    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then((iframe) => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('test get path params')
          .click()
          .then(() => {
            cy.wrap($body).contains('pathParams: {"path":"param"}');
          });
      });
  });
  
  it('getCoreSearchParams', () => {
    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then((iframe) => {
        const $body = iframe.contents().find('body');
        cy.wrap($body)
          .contains('test get core search params')
          .click()
          .then(() => {
            cy.wrap($body).contains('searchParams: {"search":"param"}');
          });
      });
  });
});
