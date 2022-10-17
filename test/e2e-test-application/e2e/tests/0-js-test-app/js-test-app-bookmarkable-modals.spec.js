import defaultLuigiConfig from '../../configs/default';
import { cloneDeep } from 'lodash';

describe('JS-TEST-APP 2', () => {
  const localRetries = {
    retries: {
      runMode: 4,
      openMode: 4
    }
  };

  describe('Bookmarkable micro frontends', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = cloneDeep(defaultLuigiConfig);
    });

    it('Hash routing with showModalPathInUrl enabled and custom modalPathParam and node params', () => {
      newConfig.routing.showModalPathInUrl = true;
      newConfig.routing.modalPathParam = 'mymodal';
      newConfig.routing.useHashRouting = true;
      newConfig.tag = 'bookmarkable-mf-1';

      cy.visitTestApp('/home', newConfig);
      cy.get('#app[configversion="bookmarkable-mf-1"]');
      cy.window().then(win => {
        win.Luigi.navigation()
          .withParams({ mp: 'one' })
          .openAsModal('/home/one');
      });

      cy.expectPathToBe('/home?mymodal=' + encodeURIComponent('/home/one?~mp=one') + '&historyState=4');
    });

    it('Path routing with showModalPathInUrl enabled and custom modalPathParam and node params', () => {
      newConfig.routing.showModalPathInUrl = true;
      newConfig.routing.modalPathParam = 'mymodal';
      newConfig.routing.useHashRouting = false;
      newConfig.tag = 'bookmarkable-mf-2';

      cy.visitTestApp('/home', newConfig);
      cy.get('#app[configversion="bookmarkable-mf-2"]');
      cy.window().then(win => {
        win.Luigi.navigation()
          .withParams({ mp: 'one' })
          .openAsModal('/home/one');
      });

      cy.expectPathToBe('/home');
      cy.location().should(location => {
        expect(location.search).to.eq('?mymodal=' + encodeURIComponent('/home/one?~mp=one') + '&historyState=7');
      });
    });
  });
});
