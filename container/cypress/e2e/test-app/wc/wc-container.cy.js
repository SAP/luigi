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
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get(containerSelector)
        .shadow()
        .contains('getCurrentRoute')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('current route: /wc/clientAPI.html');
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
  });
});
