describe('Web Container Test', () => {
  describe('LuigiClient API LuigiContainer', () => {
    let stub;
    beforeEach(() => {
      cy.visit('http://localhost:8080');
      cy.visit('http://localhost:8080/#hello-world-wc');
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
          expect(stub.getCall(1)).to.be.calledWith('LuigiClient.getActiveFeatureToggles()=["ft1","ft2"]');
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
  });

  describe('LuigiClient API LuigiCompoundContainer', () => {
    let stub;
    beforeEach(() => {
      cy.visit('http://localhost:8080/#dashboard');
      stub = cy.stub();
    });

    it('LuigiClient API getUserSettings for LuigiCompoundContainer', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get('[data-test-id="luigi-client-api-test-compound-01"]')
        .shadow()
        .contains('getUserSettings')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getUserSettings()={"language":"it","date":""}');
        });
    });
    it('LuigiClient API getAnchor for LuigiCompoundContainer', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get('[data-test-id="luigi-client-api-test-compound-01"]')
        .shadow()
        .contains('getAnchor')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getAnchor()="testAnchorCompound"');
        });
    });
  });
});
