describe('Compound Container Tests', () => {
  describe('LuigiClient API - LuigiCompoundContainer', () => {
    let stub;
    beforeEach(() => {
      cy.visit('http://localhost:8080/compound/compoundClientAPI.html');
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
    it('defer-init flag for LuigiCompoundContainer', () => {
      // the initialized webcomponent has id="defer-init-flag"
      cy.get('#defer-init-flag').should('not.exist');
      // click button that calls container.init()
      cy.get('#init-button').click();

      cy.get('#defer-init-flag').should('exist');
    });
  });
});
