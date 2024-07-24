describe('Compound Container Tests', () => {
  describe('LuigiClient API - LuigiCompoundContainer', () => {
    const containerSelector = '[data-test-id="luigi-client-api-test-compound-01"]';
    let stub;

    beforeEach(() => {
      cy.visit('http://localhost:8080/compound/compoundClientAPI.html');
      stub = cy.stub();
    });

    it('LuigiClient API getUserSettings for LuigiCompoundContainer', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getUserSettings')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getUserSettings()={"language":"it","date":""}');
        });
    });

    it('LuigiClient API getAnchor for LuigiCompoundContainer', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getAnchor')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getAnchor()="testAnchorCompound"');
        });
    });

    it('LuigiClient API updateContext', () => {
      cy.on('window:alert', stub);

      cy.wait(500);
      cy.get('#luigi-update-context')
        .click()
        .then(() => {
          cy.get(container)
            .shadow()
            .contains('updateContext')
            .click()
            .then(() => {
              expect(stub.getCall(0)).to.be.calledWith('compoundWC.ctx={"newContextData":"some data"}');
            });
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
