import defaultLuigiConfig from '../../configs/default';
import { cloneDeep } from 'lodash';

describe('JS-TEST-APP', () => {
  const localRetries = {
    retries: {
      runMode: 4,
      openMode: 4
    }
  };
  describe('Navigation 2', () => {
    describe('Empty pathSegment in main node, hash routing', () => {
      let newConfig;
      beforeEach(() => {
        newConfig = cloneDeep(defaultLuigiConfig);
        newConfig.navigation.nodes[0].pathSegment = '';
        newConfig.tag = 'js-test-app-empty-pathSegement-in-main-node';
      });
      it('empty pathSegment navigate with core api', () => {
        cy.visitTestApp('/', newConfig);
        cy.get('#app[configversion="js-test-app-empty-pathSegement-in-main-node"]');

        cy.window().then(win => {
          win.Luigi.navigation().navigate('/two');
        });
        cy.expectPathToBe('/two');
      });
      it('empty pathSegment navigate with via clicking', () => {
        cy.visitTestApp('/', newConfig);
        cy.get('#app[configversion="js-test-app-empty-pathSegement-in-main-node"]');

        cy.get('.fd-app__sidebar')
          .contains('Section one')
          .click();
        cy.expectPathToBe('/one');
        cy.get('.fd-app__sidebar')
          .contains('Section two')
          .click();
        cy.expectPathToBe('/two');
      });
      it('empty path segment tabNav enabled, hide nodes left and top nav', () => {
        newConfig.navigation.nodes[0].tabNav = true;
        newConfig.navigation.nodes[0].hideFromNav = true;
        newConfig.navigation.nodes[0].hideSideNav = true;
        delete newConfig.navigation.nodes[0].viewUrl;
        cy.visitTestApp('/', newConfig);
        cy.get('#app[configversion="js-test-app-empty-pathSegement-in-main-node"]');
        cy.get('.fd-app__sidebar').should('not.exist');
        cy.get('.lui-tabs')
          .contains('Section one')
          .click();
        cy.expectPathToBe('/one');
        cy.get('.lui-tabs')
          .contains('Section two')
          .click();
        cy.expectPathToBe('/two');
      });
    });
    describe('Empty pathSegment in main node, path routing', () => {
      let newConfig;
      beforeEach(() => {
        newConfig = cloneDeep(defaultLuigiConfig);
        newConfig.routing.useHashRouting = false;
        newConfig.navigation.nodes[0].pathSegment = '';
        newConfig.tag = 'js-test-app-empty-pathSegement-in-main-node';
      });
      it('empty pathSegment navigate with core api', () => {
        cy.visitTestApp('/', newConfig);
        cy.get('#app[configversion="js-test-app-empty-pathSegement-in-main-node"]');

        cy.window().then(win => {
          win.Luigi.navigation().navigate('/two');
        });
        cy.expectPathToBe('/two');
      });
      it('empty pathSegment navigate with via clicking', () => {
        cy.visitTestApp('/', newConfig);
        cy.get('#app[configversion="js-test-app-empty-pathSegement-in-main-node"]');

        cy.get('.fd-app__sidebar')
          .contains('Section one')
          .click();
        cy.expectPathToBe('/one');
        cy.get('.fd-app__sidebar')
          .contains('Section two')
          .click();
        cy.expectPathToBe('/two');
      });
      it('empty path segment tabNav enabled, hide nodes left and top nav', () => {
        newConfig.navigation.nodes[0].tabNav = true;
        newConfig.navigation.nodes[0].hideFromNav = true;
        newConfig.navigation.nodes[0].hideSideNav = true;
        delete newConfig.navigation.nodes[0].viewUrl;
        cy.visitTestApp('/', newConfig);
        cy.get('#app[configversion="js-test-app-empty-pathSegement-in-main-node"]');
        cy.get('.fd-app__sidebar').should('not.exist');
        cy.get('.lui-tabs')
          .contains('Section one')
          .click();
        cy.expectPathToBe('/one');
        cy.get('.lui-tabs')
          .contains('Section two')
          .click();
        cy.expectPathToBe('/two');
      });
    });
  });
});
