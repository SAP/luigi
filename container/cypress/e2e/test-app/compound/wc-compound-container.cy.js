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

    it('LuigiClient API - getCurrentLocale', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getCurrentLocale')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getCurrentLocale()=en');
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

      cy.get(containerSelector)
        .shadow()
        .contains('getCoreSearchParams')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{"test":"searchParam1"}');
        });
    });

    it('LuigiClient API - getSkipInitCheck', () => {
      cy.get(containerSelector)
        .invoke('attr', 'skip-init-check')
        .should('eq', 'true');
    });

    it('LuigiClient API - getActiveFeatureToggles', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getFeatureToggleList')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getActiveFeatureToggles()=["ft1","ft2"]');
        });
    });

    it('LuigiClient API - getCurrentTheme', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getTheme')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getCurrentTheme()="sap_fiori_3"');
        });
    });

    it('LuigiClient API - updateContext', () => {
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

    it('LuigiClient API - pathExists', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .get('#linkManagerUpdateTopPathExistsBack')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.linkManager().pathExists()=true\nthis.LuigiClient.linkManager().hasBack()=false');
        });
    });

    it('LuigiClient API - showConfirmationModal', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('showConfirmationModal')
        .click()
        .then(() => {
          cy.on('window:confirm', (str) => {
            expect(str).to.equal('Are you sure you want to do this?');
          });
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.uxManager().showConfirmationModal()');
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
