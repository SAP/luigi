import fiddleConfig from '../../configs/default';
import { cloneDeep } from 'lodash';

describe('Fiddle 3', () => {
  const localRetries = {
    retries: {
      runMode: 4,
      openMode: 4
    }
  };
  describe('LuigiClient add and delete node and search params', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = cloneDeep(fiddleConfig);
      newConfig.routing.useHashRouting = true;
      const node = {
        pathSegment: 'mynode',
        label: 'MyNode',
        viewUrl: '/examples/microfrontends/luigi-client-test.html',
        clientPermissions: {
          urlParameters: {
            luigi: {
              read: true,
              write: true
            },
            q: {
              read: true,
              write: true
            }
          }
        }
      };
      newConfig.navigation.nodes[0].children.push(node);
    });

    it('Add and delete search params hash routing enabled', () => {
      cy.visitWithFiddleConfig('/home/mynode', newConfig);
      cy.getIframeBody().then($body => {
        cy.wrap($body)
          .find('[data-testid="lui-add-search-params"]')
          .invoke('show');
        cy.wrap($body)
          .contains('add search params')
          .click();
      });
      cy.expectPathToBe('/home/mynode?luigi=rocks&q=test');
      cy.getIframeBody().then($body => {
        cy.wrap($body)
          .find('[data-testid="lui-delete-search-params"]')
          .invoke('show');
        cy.wrap($body)
          .contains('delete search params')
          .click();
      });
      cy.expectPathToBe('/home/mynode?luigi=rocks');
    });
    it('Add and delete node params hash routing enabled', () => {
      cy.visitWithFiddleConfig('/home/mynode', newConfig);
      cy.getIframeBody().then($body => {
        cy.wrap($body)
          .find('[data-testid="lui-add-node-params"]')
          .invoke('show');
        cy.wrap($body)
          .contains('add node params')
          .click();
      });
      cy.expectPathToBe('/home/mynode?%7Eq=test&%7Eluigi=rocks');
      cy.getIframeBody().then($body => {
        cy.wrap($body)
          .find('[data-testid="lui-delete-node-params"]')
          .invoke('show');
        cy.wrap($body)
          .contains('delete node params')
          .click();
      });
      cy.expectPathToBe('/home/mynode?%7Eluigi=rocks');
    });
  });

  describe('LuigiClient add and delete node and search paramstest', () => {
    let newConfig = cloneDeep(fiddleConfig);
    beforeEach(() => {
      newConfig.routing.useHashRouting = false;
      const node = {
        pathSegment: 'mynode',
        label: 'MyNode',
        viewUrl: '/examples/microfrontends/luigi-client-test.html',
        clientPermissions: {
          urlParameters: {
            luigi: {
              read: true,
              write: true
            },
            q: {
              read: true,
              write: true
            }
          }
        }
      };
      newConfig.navigation.nodes[0].children.push(node);
    });

    it('Add and delete search params path routing enabled', localRetries, () => {
      cy.visitFiddleConfigWithPathRouting('', newConfig);

      cy.get('.fd-side-nav__main-navigation')
        .contains('MyNode')
        .click();
      cy.getIframeBody().then($body => {
        cy.wrap($body)
          .find('[data-testid="lui-add-search-params"]')
          .invoke('show');
        cy.wrap($body)
          .contains('add search params')
          .click();
      });
      cy.location().should(location => {
        expect(location.pathname + location.search).to.eq('/home/mynode?luigi=rocks&q=test');
      });

      cy.getIframeBody().then($body => {
        cy.wrap($body)
          .find('[data-testid="lui-delete-search-params"]')
          .invoke('show');
        cy.wrap($body)
          .contains('delete search params')
          .click();
      });
      cy.location().should(location => {
        expect(location.pathname + location.search).to.eq('/home/mynode?luigi=rocks');
      });
    });
  });

  describe('Custom text in the footer', () => {
    it('checks if the text in footer exist, defined by settings', () => {
      cy.window().then(win => {
        //define Footer text as part of the global config
        const config = win.Luigi.getConfig();
        config.settings.sideNavFooterText = 'Luigi Footer';
        win.Luigi.configChanged();

        cy.get('[data-testid="lui-side-nav__footer--text"]').should('exist');
        cy.get('[data-testid="lui-side-nav__footer--text"]').contains('Luigi Footer');
      });
    });

    it('checks if getNavFooterContainer() working', () => {
      cy.window().then(win => {
        //define Footer text as part of the global config
        const config = win.Luigi.getConfig();
        config.settings.sideNavFooterText = 'Luigi Footer';
        win.Luigi.configChanged();

        //Checks if the DOM element required by getNavFooterContainer() exist
        cy.get('[data-testid="lui-side-nav__footer"]').should('exist');

        const FooterContainer = win.Luigi.elements().getNavFooterContainer();

        //Checks if Luigi.elements().getNavFooterContainer() reads the appropriate DOM element.
        cy.get(FooterContainer).contains('Luigi Footer');
      });
    });
  });
});
