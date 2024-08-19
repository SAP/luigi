describe('Compound Container Tests', () => {
  describe('LuigiClient API - LuigiCompoundContainer', () => {
    const containerSelector = '[data-test-id="luigi-client-api-test-compound-01"]';
    let stub;

    beforeEach(() => {
      cy.visit('http://localhost:8080/compound/compoundClientAPI.html');
      stub = cy.stub();
    });

    it('LuigiClient API - getUserSettings', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getUserSettings')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getUserSettings()={"language":"it","date":""}');
        });
    });

    it('LuigiClient API - getAnchor', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getAnchor')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getAnchor()="testAnchorCompound"');
        });
    });

    it('LuigiClient API - getDirtyStatus', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getDirtyStatus')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.uxManager().getDirtyStatus()=false');
        });
    });

    it('LuigiClient API - getClientPermissions', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getClientPermissions')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{"permission":"testPermission"}');
        });
    });

    it('LuigiClient API - getNodeParams', () => {
      cy.on('window:alert', stub);

      // getNodeParams is not available for compound children, so default behavior should be to return empty {}
      cy.get(containerSelector)
        .shadow()
        .contains('get node params')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getNodeParams()={}');
        });
    });

    it('LuigiClient API - getPathParams', () => {
      cy.on('window:alert', stub);

      // getNodeParams is not available for compound children, so default behavior should be to return empty {}
      cy.get(containerSelector)
        .shadow()
        .contains('getPathParams')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{"path":"param"}');
        });
    });

    it('LuigiClient API - setViewGroupData', () => {
      cy.on('window:alert', stub);

      // getNodeParams is not available for compound children, so default behavior should be to return empty {}
      cy.get(containerSelector)
        .shadow()
        .contains('setViewGroupData')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{"vg":"some data"}');
        });
    });

    it('LuigiClient API - getCoreSearchParams', () => {
      cy.on('window:alert', stub);

      // getNodeParams is not available for compound children, so default behavior should be to return empty {}
      cy.get(containerSelector)
        .shadow()
        .contains('getCoreSearchParams')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{"test":"searchParam1"}');
        });
    });

    it('LuigiClient API updateContext', () => {
      cy.on('window:alert', stub);

      cy.wait(500);
      cy.get('#luigi-update-context')
        .click()
        .then(() => {
          cy.get(containerSelector)
            .shadow()
            .contains('retrieveContextValue')
            .click()
            .then(() => {
              expect(stub.getCall(0)).to.be.calledWith(
                'compoundWC.ctx={"label":"Dashboard","title":"Some input","instant":true,"newContextData":"some data"}'
              );
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
