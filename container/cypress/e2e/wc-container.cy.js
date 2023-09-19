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
  });

  describe('LuigiClient API LuigiContainer', () => {
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
  });
});
