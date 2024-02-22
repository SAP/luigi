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
        cy.getIframeBody().then($iframeBody => {
          cy.wrap($iframeBody)
            .find('button.openSplitView')
            .click();
        });

        cy.get('div.fd-page.iframeContainer')
          .invoke('width')
          .then(iframeContainerWidth => {
            cy.get('div#splitViewContainer')
              .invoke('width')
              .then(splitViewContainerWidth => {
                cy.get('div#splitViewDragger')
                  .invoke('width')
                  .then(splitViewDraggerWidth => {
                    expect(iframeContainerWidth).to.equal(splitViewContainerWidth);
                    expect(iframeContainerWidth).to.equal(splitViewDraggerWidth);
                  });
              });
          });
      });
    });
  });
});
