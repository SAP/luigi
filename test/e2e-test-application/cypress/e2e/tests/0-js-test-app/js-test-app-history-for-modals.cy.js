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
      cy.expectPathToBe('/home?modal=' + encodeURIComponent('/home/usersettings'));
    } else {
      cy.expectPathToBe('/home');
      cy.location().should(location => {
        expect(location.search).to.eq('?modal=' + encodeURIComponent('/home/usersettings'));
      });
    }
  };

  const expectedPathAfterForward = path => {
    cy.go('forward');
    cy.expectPathToBe(path, 100);
    cy.location().should(location => {
      expect(location.search).to.eq('');
    });
  };

  const expectedPathAfterBack = path => {
    cy.go('back');
    cy.expectPathToBe(path, 100);
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
          loadingIndicator: { enabled: false },
          viewUrl: '/examples/microfrontends/multipurpose.html',
          openNodeInModal: true
        });
      });
      it('Path routing, open modal and close via [X]', () => {
        cy.vistTestAppPathRouting('/', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        openModal();
        closeModal();
        expectedPathAfterForward('/home');
        expectedPathAfterBack('/home');
      });
      it('Path routing, visit luigi with modal data', () => {
        cy.vistTestAppPathRouting('?modal=' + encodeURIComponent('/home/modalMf'), newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        closeModal();
        expectedPathAfterForward('/home');
        expectedPathAfterBack('/home');
      });
      it('Path routing, navigate few times and than open modal and close via [X]', () => {
        cy.vistTestAppPathRouting('/', newConfig);
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
        cy.vistTestAppPathRouting('/', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        openModal();
        simulateWizardNavigation();
        closeModal();
        expectedPathAfterBack('blank');
      });
      it('Path routing, open modal and close via browswer back', () => {
        cy.vistTestAppPathRouting('/', newConfig);
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
      });
      it('Path routing, navigate few times and than open modal and close via browser back', () => {
        cy.vistTestAppPathRouting('/', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        clickingAroundInNavigation();
        openModal();
        closeModal();
        cy.go('forward');
        cy.expectPathToBe('/home', 100);
        cy.go('back');
        cy.expectPathToBe('/home', 100);
      });
      it('Path routing, open modal, navigate through a wizard and close the modal via browser back', () => {
        newConfig.navigation.nodes[0].children.push({
          pathSegment: 'usersettings',
          label: 'Usersettings MF',
          viewUrl: '/examples/microfrontends/customUserSettingsMf.html'
        });
        cy.vistTestAppPathRouting('/', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        openModal();
        simulateWizardNavigation();
        closeModal();
        cy.go('forward');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('/home');
      });
      it('Path routing, open and close and open and close the modal', () => {
        cy.vistTestAppPathRouting('/', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-1"]');
        openModal();
        closeModal();
        openModal();
        closeModal();
        cy.expectPathToBe('/home');
      });
    });
    describe('Hash routing, history handling for a single modal', () => {
      let newConfig;
      beforeEach(() => {
        newConfig = cloneDeep(defaultLuigiConfig);
        newConfig.routing.showModalPathInUrl = true;
        newConfig.routing.useHashRouting = true;
        newConfig.tag = 'js-test-app-history-handling-modals-2';
        newConfig.navigation.nodes[0].children.push({
          pathSegment: 'modalMf',
          label: 'Modal MF',
          viewUrl: '/examples/microfrontends/multipurpose.html',
          openNodeInModal: true
        });
      });
      it('Hash routing, open modal and close via [X]', () => {
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-2"]');
        openModal(true);
        closeModal();
        expectedPathAfterForward('/home');
        expectedPathAfterBack('/home');
      });
      it('Hash routing, visit luigi with modal data', () => {
        cy.visitTestApp('/home?modal=' + encodeURIComponent('/home/modalMf'), newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-2"]');
        closeModal();
        expectedPathAfterForward('/home');
        expectedPathAfterBack('/home');
      });
      it('Hash routing, visit luigi with modal data and search params', () => {
        cy.visitTestApp('/home?~test=tets&modal=' + encodeURIComponent('/home/modalMf'), newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-2"]');
        closeModal();
        expectedPathAfterForward('/home?%7Etest=tets');
        expectedPathAfterBack('/home?%7Etest=tets');
      });
      it('Hash routing, navigate few times and than open modal and close via [X]', () => {
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-2"]');
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
        cy.get('#app[configversion="js-test-app-history-handling-modals-2"]');
        openModal(true);
        simulateWizardNavigation(true);
        closeModal();
        expectedPathAfterForward('/home');
        expectedPathAfterBack('/home');
      });
      it('Hash routing, open modal and close via browswer back', () => {
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-2"]');
        openModal(true);
        cy.go('back');
        cy.expectPathToBe('/home');
        cy.go('forward');
        cy.expectPathToBe('/home');
      });
      it('Hash routing, navigate few times and than open modal and close via browser back', () => {
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-2"]');
        clickingAroundInNavigation();
        openModal(true);
        closeModal();
        cy.go('forward');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('/home');
      });
      it('Hash routing, open modal, navigate through a wizard and close the modal via browser back', () => {
        newConfig.navigation.nodes[0].children.push({
          pathSegment: 'usersettings',
          label: 'Usersettings MF',
          viewUrl: '/examples/microfrontends/customUserSettingsMf.html'
        });
        cy.visitTestApp('/home', newConfig);
        cy.get('#app[configversion="js-test-app-history-handling-modals-2"]');
        openModal(true);
        simulateWizardNavigation(true);
        closeModal();
        cy.go('forward');
        cy.expectPathToBe('/home');
        cy.go('back');
        cy.expectPathToBe('/home');
      });
    });
  });
});
