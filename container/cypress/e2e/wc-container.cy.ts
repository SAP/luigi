describe('Web Container Test', () => {
  it('LuigiClient API', () => {
    cy.visit('http://localhost:8080');
    cy.visit('http://localhost:8080/#hello-world-wc');

    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('[data-test-id="luigi-client-api-test-01"]')
      .shadow()
      .contains('Click me')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getCurrentLocale()=en');
        expect(stub.getCall(1)).to.be.calledWith("LuigiClient.getActiveFeatureToggles()=['ft1','ft2']");
        expect(stub.getCall(2)).to.be.calledWith('LuigiClient.uxManager().getCurrentTheme()=sap_fiori_3');
      });
  });
});
