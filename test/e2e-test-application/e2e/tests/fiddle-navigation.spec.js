import fiddleConfig from '../configs/default';
Cypress.env('RETRIES', 0);
describe('Navigation with Fiddle', () => {
  describe('Core api navigation test', () => {
    beforeEach(() => {
      cy.visitWithFiddleConfig('/');
    });
    it('Core API navigate', () => {
      cy.window().then(win => {
        win.Luigi.navigation().navigate('/home/two');
        cy.expectPathToBe('/home/two');
      });
    });
    it('Core API open in modal', () => {
      cy.window().then(win => {
        win.Luigi.navigation().openAsModal('/settings', {
          title: 'Preserved View',
          size: 'm'
        });

        cy.get('.fd-modal__header:visible .fd-modal__close').click();
        cy.expectPathToBe('/home');
      });
    });
  });
  describe('Normal navigation', () => {
    beforeEach(() => {
      const newConfig = Object.assign({}, fiddleConfig);
      newConfig.navigation.nodes[0].viewUrl = null;
      cy.visitWithFiddleConfig('/', newConfig);
    });
    it('defaultChildNode', () => {
      cy.window().then(win => {
        win.Luigi.navigation().navigate('/home');
        cy.expectPathToBe('/home/two');
      });
    });
  });
});
