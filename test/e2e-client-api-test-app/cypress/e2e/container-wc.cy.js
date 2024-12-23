describe('Core WC Test', () => {
  describe('LuigiClient API', () => {
    const containerSelector = '.wcContainer > *';
    let stub;

    beforeEach(() => {
      cy.visit('http://127.0.0.1:3000/#/home/core-wc');
      stub = cy.stub();
    });

    it('getCurrentLocale, getActiveFeatureToggles, getCurrentTheme', () => {
      const alertMessages = [
        'LuigiClient.getCurrentLocale()=en',
        'LuigiClient.getActiveFeatureToggles()=,0',
        'LuigiClient.uxManager().getCurrentTheme()=false'
      ];

      cy.get(containerSelector)
        .shadow()
        .contains('getCurrentLocale(), getActiveFeatureToggles, getCurrentTheme()')
        .click()
        .then(() => {
          cy.get('.fd-message-strip--information')
            .should('have.length', alertMessages.length)
            .each(($div, index) => {
              expect($div.find('p')).to.contain(alertMessages[index]);
            });
        });
    });

    it('getCoreSearchParams', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getCoreSearchParams')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{}');
        });
    });

    it('getPathParams', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getPathParams')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{}');
        });
    });

    it('getClientPermissions', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getClientPermissions')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('{}');
        });
    });

    it('getUserSettings', () => {
      const alertMessages = ['LuigiClient.getUserSettings()={}'];

      cy.get(containerSelector)
        .shadow()
        .contains('getUserSettings')
        .click()
        .then(() => {
          cy.get('.fd-message-strip--information')
            .should('have.length', alertMessages.length)
            .each(($div, index) => {
              expect($div.find('p')).to.contain(alertMessages[index]);
            });
        });
    });

    it('getAnchor', () => {
      const alertMessages = ['LuigiClient.getAnchor()=""'];

      cy.get(containerSelector)
        .shadow()
        .contains('getAnchor')
        .click()
        .then(() => {
          cy.get('.fd-message-strip--information')
            .should('have.length', alertMessages.length)
            .each(($div, index) => {
              expect($div.find('p')).to.contain(alertMessages[index]);
            });
        });
    });

    it('getCurrentRoute', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getCurrentRoute')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('current route: /home/core-wc');
        });
    });

    it('navigateToIntent', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('navigateToIntent')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('navigated to: #?intent=Sales-settings');
        });
    });

    it('linkManagerChainRequests for navigation', () => {
      const alertMessages = ['LuigiClient.linkManager().navigate()'];

      cy.get(containerSelector)
        .shadow()
        .get('#linkManagerChainRequests')
        .click()
        .then(() => {
          cy.get('.fd-message-strip--information')
            .should('have.length', alertMessages.length)
            .each(($div, index) => {
              expect($div.find('p')).to.contain(alertMessages[index]);
            });
          cy.hash().should('eq', '#/home');
        });
    });

    it('openAsModal webcomponent container', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .get('#openAsModalBtn')
        .click()
        .then(() => {
          cy.hash().should('eq', '#/home/core-wc');
        });
    });

    it('openAsDrawer webcomponent container', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .get('#openAsDrawerBtn')
        .click()
        .then(() => {
          cy.hash().should('eq', '#/home/core-wc');
        });
    });

    it('openAsSplitview webcomponent container', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .get('#openAsSplitviewBtn')
        .click()
        .then(() => {
          cy.hash().should('eq', '#/home/core-wc');
        });
    });

    it('pathExists, goBack, updateTopNavigation', () => {
      const alertMessages = [
        'LuigiClient.linkManager().pathExists()=true\nthis.LuigiClient.linkManager().hasBack()=false'
      ];

      cy.get(containerSelector)
        .shadow()
        .get('#linkManagerUpdateTopPathExistsBack')
        .click()
        .then(() => {
          cy.get('.fd-message-strip--information')
            .should('have.length', alertMessages.length)
            .each(($div, index) => {
              expect($div.find('p')).to.contain(alertMessages[index]);
            });
        });
    });

    it('showAlert', () => {
      const alertMessages = ['uxManager().showAlert() test'];

      cy.get(containerSelector)
        .shadow()
        .get('#showAlert')
        .click()
        .then(() => {
          cy.get('.fd-message-strip--information')
            .should('have.length', alertMessages.length)
            .each(($div, index) => {
              expect($div.find('p')).to.contain(alertMessages[index]);
            });
        });
    });

    it('showConfirmationModal', () => {
      const alertMessages = ['LuigiClient.uxManager().showConfirmationModal()'];

      cy.get(containerSelector)
        .shadow()
        .contains('showConfirmationModal')
        .click()
        .then(() => {
          cy.get('.fd-message-box__content').then(($box) => {
            expect($box.find('.fd-message-box__body')).to.contain('Are you sure you want to do this?');
            cy.get('.confirm-button')
              .click()
              .then(() => {
                cy.get('.fd-message-strip--information')
                  .should('have.length', alertMessages.length)
                  .each(($div, index) => {
                    expect($div.find('p')).to.contain(alertMessages[index]);
                  });
              });
          });
        });
    });

    it('receive custom message from WC', () => {
      const alertMessages = ['LuigiClient.uxManager().publishEvent()'];

      cy.get(containerSelector)
        .shadow()
        .contains('Publish event')
        .click()
        .then(() => {
          cy.get('.fd-message-strip--information')
            .should('have.length', alertMessages.length)
            .each(($div, index) => {
              expect($div.find('p')).to.contain(alertMessages[index]);
            });
        });
    });

    it('uxManagerChainRequests', () => {
      const alertMessages = ['LuigiClient.uxManager().getDocumentTitle()=my-title'];

      cy.get(containerSelector)
        .shadow()
        .get('#uxManagerManyRequests')
        .click()
        .then(() => {
          cy.get('.fd-message-strip--information')
            .should('have.length', alertMessages.length)
            .each(($div, index) => {
              expect($div.find('p')).to.contain(alertMessages[index]);
            });
        });
    });
  });
});

describe('Container WC Test', () => {
  describe('LuigiClient API', () => {
    const containerSelector = '[data-test-id="luigi-client-api-test"]';
    let stub;

    beforeEach(() => {
      cy.visit('http://127.0.0.1:3000/views/container/wc.html');
      stub = cy.stub();
    });

    it('getCurrentLocale, getActiveFeatureToggles, getCurrentTheme', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getCurrentLocale(), getActiveFeatureToggles, getCurrentTheme()')
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

    it('getUserSettings', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getUserSettings')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getUserSettings()={"language":"de","date":""}');
        });
    });

    it('getAnchor', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getAnchor')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.getAnchor()="testanchor"');
        });
    });

    it('getCurrentRoute', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('getCurrentRoute')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('current route: /views/container/wc.html');
        });
    });

    it('navigateToIntent', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .contains('navigateToIntent')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('navigated to: #?intent=Sales-settings');
        });
    });

    it('linkManagerChainRequests for navigation', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .get('#linkManagerChainRequests')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('LuigiClient.linkManager().navigate()');
          cy.hash().should('eq', '#hello-world-wc');
        });
    });

    it('openAsModal webcomponent container', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .get('#openAsModalBtn')
        .click()
        .then(() => {
          cy.hash().should('eq', '#/home/intro');
        });
    });

    it('openAsDrawer webcomponent container', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .get('#openAsDrawerBtn')
        .click()
        .then(() => {
          cy.hash().should('eq', '#/home/intro');
        });
    });

    it('openAsSplitview webcomponent container', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .get('#openAsSplitviewBtn')
        .click()
        .then(() => {
          cy.hash().should('eq', '#/home/intro');
        });
    });

    it('pathExists, goBack, updateTopNavigation', () => {
      cy.on('window:alert', stub);

      const alertMessages = [
        'UPDATE_TOP_NAVIGATION_REQUEST event received',
        'LuigiClient.linkManager().pathExists()=true\nthis.LuigiClient.linkManager().hasBack()=false'
      ];

      cy.get(containerSelector)
        .shadow()
        .get('#linkManagerUpdateTopPathExistsBack')
        .click()
        .then(() => {
          alertMessages.forEach((msg, index) => {
            expect(stub.getCall(index)).to.be.calledWith(msg);
          });
        });
    });

    it('showAlert', () => {
      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .get('#showAlert')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('uxManager().showAlert() test');
        });
    });

    it('showConfirmationModal', () => {
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

    it('uxManagerChainRequests', () => {
      const alertMessages = [
        'LuigiClient.uxManager().openUserSettings()',
        'LuigiClient.uxManager().closeUserSettings()',
        'LuigiClient.uxManager().removeBackdrop()',
        'LuigiClient.uxManager().collapseLeftSideNav()',
        'LuigiClient.uxManager().hideAppLoadingIndicator()',
        'LuigiClient.uxManager().getDocumentTitle()=my-title'
      ];

      cy.on('window:alert', stub);

      cy.get(containerSelector)
        .shadow()
        .get('#uxManagerManyRequests')
        .click()
        .then(() => {
          alertMessages.forEach((msg, index) => {
            expect(stub.getCall(index)).to.be.calledWith(msg);
          });
        });
    });
  });
});
