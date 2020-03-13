import fiddleConfig from '../../configs/default';
Cypress.env('RETRIES', 0);
describe('Navigation with Fiddle', () => {
  describe('Core api navigation test', () => {
    beforeEach(() => {
      cy.visitWithFiddleConfig('/');
    });
    it('Core API navigate and open and close modal', () => {
      cy.wait(500);
      cy.window().then(win => {
        win.Luigi.navigation().navigate('/home/two');
        cy.expectPathToBe('/home/two');

        win.Luigi.navigation().openAsModal('/settings', {
          title: 'Preserved View',
          size: 'm'
        });
        // cy.wait(2000)
        // win.Luigi.navigation().openAsModal('/settings', {
        //   title: 'Preserved View 2',
        //   size: 'm'
        // });
        // cy.contains('Preserved View')
        cy.get('body')
          .find('.fd-modal__close', { timeout: 5000 })
          .click();
        cy.expectPathToBe('/home/two');
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
