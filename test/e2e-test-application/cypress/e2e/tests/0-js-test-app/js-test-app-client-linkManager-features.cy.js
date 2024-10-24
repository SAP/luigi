import defaultLuigiConfig from '../../configs/default';
describe('JS-TEST-APP', () => {
  const localRetries = {
    retries: {
      runMode: 4,
      openMode: 4
    }
  };
  describe('Configure x btn for a modal', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = structuredClone(defaultLuigiConfig);
      newConfig.navigation.nodes[0].children.push({
        pathSegment: 'openNodeInModal',
        label: 'Open Node in Modal',
        viewUrl: '/examples/microfrontends/multipurpose.html',
        openNodeInModal: {
          title: 'Title for modal',
          hideXBtn: true
        }
      });
      newConfig.tag = 'js-test-app-modal-test';
    });
    it('x-btn not visible', () => {
      cy.visitTestApp('/', newConfig);
      cy.get('[configversion="js-test-app-modal-test"]');
      cy.get('.fd-navigation')
        .contains('Open Node in Modal')
        .click();
      cy.get('.lui-modal-mf .lui-modal-header').should('not.have.attr', 'aria-label', 'close');
    });
    it('x-btn visible, hideXBtn=false', () => {
      newConfig.navigation.nodes[0].children[2].openNodeInModal.hideXBtn = false;
      cy.visitTestApp('/', newConfig);
      cy.get('[configversion="js-test-app-modal-test"]');
      cy.get('.fd-navigation')
        .contains('Open Node in Modal')
        .click();
      cy.get('.lui-modal-mf [aria-label="close"]').should('have.attr', 'data-testid', 'lui-modal-index-0');
    });
    it('x-btn visible, hideXBtn not defined', () => {
      delete newConfig.navigation.nodes[0].children[2].openNodeInModal.hideXBtn;
      cy.visitTestApp('/', newConfig);
      cy.get('[configversion="js-test-app-modal-test"]');
      cy.get('.fd-navigation')
        .contains('Open Node in Modal')
        .click();
      cy.get('.lui-modal-mf [aria-label="close"]').should('have.attr', 'data-testid', 'lui-modal-index-0');
    });
  });
});
