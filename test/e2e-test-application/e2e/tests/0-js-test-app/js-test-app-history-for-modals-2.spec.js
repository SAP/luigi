import defaultLuigiConfig from '../../configs/default';
import { cloneDeep } from 'lodash';

describe('JS-TEST-APP', () => {
  const localRetries = {
    retries: {
      runMode: 4,
      openMode: 4
    }
  };
  const clickingAroundInNavigation = () => {
    cy.get('.fd-app__sidebar')
      .contains('Section one')
      .click();
    cy.expectPathToBe('/home/one');
    cy.get('.fd-app__sidebar')
      .contains('Section two')
      .click();
    cy.expectPathToBe('/home/two');
    cy.get('.fd-shellbar')
      .contains('Home')
      .click();
    cy.expectPathToBe('/home');
  };

  const simulateMultipleWizardNavigation = () => {
    let $iframeBody;
    cy.getIframeBody({}, 0, '[modal-container-index=0]').then(result => {
      $iframeBody = result;
      cy.wrap($iframeBody)
        .contains('open US')
        .click();
    });
    cy.getIframeBody({}, 0, '[modal-container-index=0]').then(result => {
      $iframeBody = result;
      cy.wrap($iframeBody)
        .contains('go back to modalMf')
        .click();
    });
  };

  const openModal = hash => {
    cy.get('.fd-app__sidebar')
      .contains('Modal MF')
      .click();
    if (hash) {
      cy.expectPathToBe('/home?modal=' + encodeURIComponent('/home/modalMf'));
    } else {
      cy.expectPathToBe('/home');
      cy.location().should(location => {
        expect(location.search).to.eq('?modal=' + encodeURIComponent('/home/modalMf'));
      });
    }
  };

  const closeModal = () => {
    cy.get('.lui-modal-index-0 .fd-button').click();
  };

  describe('History handling for modals', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = cloneDeep(defaultLuigiConfig);
      newConfig.routing.showModalPathInUrl = true;
      newConfig.routing.useHashRouting = false;
      newConfig.tag = 'js-test-app-history-handling-modals-1';
      newConfig.navigation.nodes[0].children.push({
        pathSegment: 'modalMf',
        label: 'Modal MF',
        viewUrl: '/examples/microfrontends/multipurpose.html',
        openNodeInModal: true
      });
    });

    it('Go back when history is 50 and modalHistoryLength > historygap', () => {
      newConfig.navigation.nodes[0].children.push({
        pathSegment: 'usersettings',
        label: 'Usersettings MF',
        viewUrl: '/examples/microfrontends/customUserSettingsMf.html'
      });
      cy.visitTestApp('/home', newConfig);
      cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
      for (let i = 0; i < 17; i++) {
        clickingAroundInNavigation();
      }
      cy.window()
        .its('history')
        .and('have.property', 'length')
        .should('eq', 50);
      openModal();
      cy.window()
        .its('history')
        .and('have.property', 'state')
        .should('deep.include', {
          modalHistoryLength: 1,
          historygap: 50,
          pathBeforeHistory: '/home'
        });
      for (let i = 0; i < 27; i++) {
        simulateMultipleWizardNavigation();
      }
      cy.window()
        .its('history')
        .and('have.property', 'state')
        .should('deep.include', {
          modalHistoryLength: 55,
          historygap: 50,
          pathBeforeHistory: '/home'
        });
      closeModal();
      cy.expectPathToBe('/home');
    });
  });
});
