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

  const simulateWizardNavigation = hash => {
    let $iframeBody;
    cy.getIframeBody({}, 0, '[modal-container-index=0]').then(result => {
      $iframeBody = result;
      cy.wrap($iframeBody)
        .contains('open US')
        .click();
      cy.getIframeBody({}, 0, '[modal-container-index=0]').then(result => {
        cy.wrap(result).contains('Red');
      });
    });
    if (hash) {
      cy.expectPathToBe('/home?modal=' + encodeURIComponent('/home/modalMf'));
    } else {
      cy.expectPathToBe('/home');
      cy.location().should(location => {
        expect(location.search).to.eq('?modal=' + encodeURIComponent('/home/modalMf'));
      });
    }
  };

  const expectedPathAfterForward = path => {
    cy.go('forward');
    cy.expectPathToBe(path);
    cy.location().should(location => {
      expect(location.search).to.eq('');
    });
  };

  const expectedPathAfterBack = path => {
    cy.go('back');
    cy.expectPathToBe(path);
    cy.location().should(location => {
      expect(location.search).to.eq('');
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
    describe('Path routing, history handling for a single modal', () => {
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
      it('Path routing, open modal and close via [X]', () => {
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        openModal();
        closeModal();
        expectedPathAfterForward('/home');
        expectedPathAfterBack('/home');
      });
      it('Path routing, navigate few times and than open modal and close via [X]', () => {
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        clickingAroundInNavigation();
        openModal();
        closeModal();
        expectedPathAfterBack('/home/two');
        expectedPathAfterForward('/home');
      });
      it('Path routing, open modal, navigate through a wizard and close the modal via [x]', () => {
        newConfig.navigation.nodes[0].children.push({
          pathSegment: 'usersettings',
          label: 'Usersettings MF',
          viewUrl: '/examples/microfrontends/customUserSettingsMf.html'
        });
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        openModal();
        simulateWizardNavigation();
        closeModal();
        expectedPathAfterForward('/home');
        expectedPathAfterBack('/home');
      });
      it('Path routing, open modal and close via browswer back', () => {
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        openModal();
        cy.go('back');
        cy.expectPathToBe('/home');
        cy.location().should(location => {
          expect(location.search).to.eq('');
        });
        cy.go('forward');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('blank');
      });
      it('Path routing, navigate few times and than open modal and close via browser back', () => {
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        clickingAroundInNavigation();
        openModal();
        closeModal();
        cy.go('forward');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('/home/two');
      });
      it('Path routing, open modal, navigate through a wizard and close the modal via browser back', () => {
        newConfig.navigation.nodes[0].children.push({
          pathSegment: 'usersettings',
          label: 'Usersettings MF',
          viewUrl: '/examples/microfrontends/customUserSettingsMf.html'
        });
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        openModal();
        simulateWizardNavigation();
        closeModal();
        cy.go('forward');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('blank');
      });
    });
    describe('Hash routing, history handling for a single modal', () => {
      let newConfig;
      beforeEach(() => {
        newConfig = cloneDeep(defaultLuigiConfig);
        newConfig.routing.showModalPathInUrl = true;
        newConfig.routing.useHashRouting = true;
        newConfig.tag = 'js-test-app-history-handling-modals-1';
        newConfig.navigation.nodes[0].children.push({
          pathSegment: 'modalMf',
          label: 'Modal MF',
          viewUrl: '/examples/microfrontends/multipurpose.html',
          openNodeInModal: true
        });
      });
      it('Hash routing, open modal and close via [X]', () => {
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        openModal(true);
        closeModal();
        expectedPathAfterForward('/home');
        expectedPathAfterBack('/home');
      });
      it('Hash routing, navigate few times and than open modal and close via [X]', () => {
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        clickingAroundInNavigation();
        openModal(true);
        closeModal();
        expectedPathAfterBack('/home/two');
        expectedPathAfterForward('/home');
      });
      it('Hash routing, open modal, navigate through a wizard and close the modal via [x]', () => {
        newConfig.navigation.nodes[0].children.push({
          pathSegment: 'usersettings',
          label: 'Usersettings MF',
          viewUrl: '/examples/microfrontends/customUserSettingsMf.html'
        });
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        openModal(true);
        simulateWizardNavigation(true);
        closeModal();
        expectedPathAfterForward('/home');
        expectedPathAfterBack('/home');
      });
      it('Hash routing, open modal and close via browswer back', () => {
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        openModal(true);
        cy.go('back');
        cy.expectPathToBe('/home');
        cy.go('forward');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('blank');
      });
      it('Hash routing, navigate few times and than open modal and close via browser back', () => {
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        clickingAroundInNavigation();
        openModal(true);
        closeModal();
        cy.go('forward');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('/home/two');
      });
      it('Hash routing, open modal, navigate through a wizard and close the modal via browser back', () => {
        newConfig.navigation.nodes[0].children.push({
          pathSegment: 'usersettings',
          label: 'Usersettings MF',
          viewUrl: '/examples/microfrontends/customUserSettingsMf.html'
        });
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        openModal(true);
        simulateWizardNavigation(true);
        closeModal();
        cy.go('forward');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('blank');
      });
    });
  });
});
