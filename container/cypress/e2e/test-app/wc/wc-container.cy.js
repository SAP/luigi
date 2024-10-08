describe('Web Container Test', () => {
  describe('LuigiClient API LuigiContainer', () => {
    const containerSelector = '[data-test-id="luigi-client-api-test-01"]';
    let stub;

    beforeEach(() => {
      cy.visit('http://localhost:8080/wc/clientAPI.html');
      stub = cy.stub();
    });

    it('getCurrentLocale, getActiveFeatureToggles, getCurrentTheme', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('Click me')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getCurrentLocale()=en');
          expect(stub.getCall(1)).to.be.calledWith('LuigiClient.getActiveFeatureToggles()=ft1,ft2,2');
          expect(stub.getCall(2)).to.be.calledWith('LuigiClient.uxManager().getCurrentTheme()=sap_fiori_3');
        });
    });

    it('getCoreSearchParams', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getCoreSearchParams')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{"test":"searchParam1"}');
        });
    });

    it('getPathParams', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getPathParams')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{"path":"param"}');
        });
    });

    it('getClientPermissions', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getClientPermissions')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{"permission":"testPermission"}');
        });
    });

    it('LuigiClient API getUserSettings for LuigiContainer', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getUserSettings')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getUserSettings()={"language":"de","date":""}');
        });
    });

    it('LuigiClient API getAnchor for LuigiContainer', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getAnchor')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getAnchor()="testanchor"');
        });
    });

    it('defer-init flag for webcomponent container', () => {
      // the initialized webcomponent has id="defer-init-flag"
      cy.get('#defer-init-flag').should('not.exist');
      // click button that calls container.init()
      cy.get('#init-button').click();

      cy.get('#defer-init-flag').should('exist');
    });

    it('LuigiClient API getCurrentRoute for LuigiContainer', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getCurrentRoute')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('current route: /wc/clientAPI.html');
        });
    });

    it('LuigiClient API navigateToIntent for LuigiContainer', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('navigateToIntent')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('navigated to: #?intent=Sales-settings');
        });
    });

    it('updateContext', () => {
      cy.on('window:alert', stub);

      cy.wait(500);
      cy.get('#luigi-update-context')
        .click()
        .then(() => {
          cy.get(containerSelector)
            .shadow()
            .contains('updateContext')
            .click()
            .then(() => {
              expect(stub.getCall(0)).to.be.calledWith('WC.ctx={"newContextData":"some data"}');
            });
        });
    });

    it('sendCustomMessage', () => {
      cy.get(containerSelector)
        .shadow()
        .find('#customMessageDiv')
        .should('have.text', 'Received Custom Message: ');

      cy.get('#sendCustomMessageBtn').click();
      cy.get(containerSelector)
        .shadow()
        .find('#customMessageDiv')
        .should('have.text', 'Received Custom Message: cool custom Message');
    });

    it('pathExists', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .get('#linkManagerUpdateTopPathExistsBack')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            'LuigiClient.linkManager().pathExists()=true\nthis.LuigiClient.linkManager().hasBack()=false'
          );
        });
    });

    it('showConfirmationModal', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('showConfirmationModal')
        .click()
        .then(() => {
          cy.on('window:confirm', str => {
            expect(str).to.equal('Are you sure you want to do this?');
          });
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.uxManager().showConfirmationModal()');
        });
    });

    it('receive custom message from WC', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('Publish event')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('My Custom Message from Microfrontend');
        });
    });
  });
});
