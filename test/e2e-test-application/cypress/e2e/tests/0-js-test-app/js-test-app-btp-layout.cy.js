import defaultLuigiConfig from '../../configs/default';

describe('JS-TEST-APP with BTP layout', () => {
  let newConfig;

  beforeEach(() => {
    newConfig = structuredClone(defaultLuigiConfig);
    newConfig.settings.experimental = {
      btpToolLayout: true
    };
    newConfig.settings.btpToolLayout = true;
  });

  describe('Navigation', () => {
    describe('Split view', () => {
      beforeEach(() => {
        newConfig.tag = 'split-view';
      });

      it('renders the split view separator and dragger with the correct width', () => {
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="split-view"]');
        cy.getIframeBody().then(($iframeBody) => {
          cy.wrap($iframeBody).find('button.openSplitView').click();
        });

        cy.get('div.fd-page.iframeContainer')
          .invoke('width')
          .then((iframeContainerWidth) => {
            cy.get('div#splitViewContainer')
              .invoke('width')
              .then((splitViewContainerWidth) => {
                cy.get('div#splitViewDragger')
                  .invoke('width')
                  .then((splitViewDraggerWidth) => {
                    expect(iframeContainerWidth).to.equal(splitViewContainerWidth);
                    expect(iframeContainerWidth).to.equal(splitViewDraggerWidth);
                  });
              });
          });
      });
    });
  });

  describe('addBackdrop, removeBackdrop btpLayout', () => {
    let newConfig;
    beforeEach(() => {
      newConfig.tag = 'addBackdrop';
    });
    it('addBackDrop, removeBackdrop', () => {
      let $iframeBody;
      cy.visitTestApp('/home/one', newConfig);
      cy.get('#app[configversion="addBackdrop"]');
      cy.get('.lui-backdrop').should('not.exist');
      cy.getIframeBody({}, 0, '.iframeContainer').then((result) => {
        $iframeBody = result;
        cy.wrap($iframeBody).find('.addBackdrop').contains('add backdrop').click();
      });
      cy.get('.lui-backdrop').should('exist');
      cy.get('[data-testid="home_home"]').then(($btn) => {
        cy.get('.lui-backdrop').then(($overlay) => {
          const btnRect = $btn[0].getBoundingClientRect();
          const overlayRect = $overlay[0].getBoundingClientRect();

          expect(overlayRect.top).to.be.at.most(btnRect.top);
          expect(overlayRect.left).to.be.at.most(btnRect.left);
          expect(overlayRect.bottom).to.be.at.least(btnRect.bottom);
          expect(overlayRect.right).to.be.at.least(btnRect.right);
        });
      });

      cy.getIframeBody({}, 0, '.iframeContainer').then((result) => {
        $iframeBody = result;
        cy.wrap($iframeBody).find('.removeBackdrop').contains('remove backdrop').click();
      });
      cy.get('.lui-backdrop').should('not.exist');
    });
  });
});
