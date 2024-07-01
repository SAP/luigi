describe('Web Container Test', () => {
  describe('LuigiClient API LuigiContainer', () => {
    let stub;
    beforeEach(() => {
      cy.visit('http://localhost:8080/wc/clientAPI.html');
      stub = cy.stub();
    });

    it('getCurrentLocale, getActiveFeatureToggles, getCurrentTheme', () => {
      cy.on('window:alert', stub);

      cy.get('[data-test-id="luigi-client-api-test-01"]')
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
      const stub = cy.stub();

      cy.on('window:alert', stub);

      cy.get('[data-test-id="luigi-client-api-test-01"]')
        .shadow()
        .contains('getCoreSearchParams')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{"test":"searchParam1"}');
        });
    });

    it('getPathParams', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get('[data-test-id="luigi-client-api-test-01"]')
        .shadow()
        .contains('getPathParams')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{"path":"param"}');
        });
    });

    it('getClientPermissions', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get('[data-test-id="luigi-client-api-test-01"]')
        .shadow()
        .contains('getClientPermissions')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{"permission":"testPermission"}');
        });
    });

    it('LuigiClient API getUserSettings for LuigiContainer', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get('[data-test-id="luigi-client-api-test-01"]')
        .shadow()
        .contains('getUserSettings')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getUserSettings()={"language":"de","date":""}');
        });
    });

    it('LuigiClient API getAnchor for LuigiContainer', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get('[data-test-id="luigi-client-api-test-01"]')
        .shadow()
        .contains('getAnchor')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getAnchor()="testanchor"');
        });
    });
    it('LuigiClient API getCurrentRoute for LuigiContainer', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get('[data-test-id="luigi-client-api-test-01"]')
        .shadow()
        .contains('getCurrentRoute')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('current route: /wc/clientAPI.html');
        });
    });
  });
});
