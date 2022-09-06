describe('Navigation', () => {
  beforeEach(() => {
    cy.visitLoggedIn('/');
  });

  describe('Collapsible Categories / Accordion', () => {
    it('It should have multiple categories collapsed', () => {
      cy.visit('/projects/pr2/collapsibles');

      cy.get('li[data-testid="superusefulgithublinks"]>ul.fd-nested-list').should('not.be.visible');
      cy.get('li[data-testid="usermanagement"]>ul.fd-nested-list').should('not.be.visible');

      cy.get('li[data-testid="superusefulgithublinks"] a[title="Super useful Github links"]').click();
      cy.get('li[data-testid="usermanagement"] a[title="User Management"]').click();

      cy.get('li[data-testid="superusefulgithublinks"]>ul.fd-nested-list').should('be.visible');
      cy.get('li[data-testid="usermanagement"]>ul.fd-nested-list').should('be.visible');

      cy.get('li[data-testid="superusefulgithublinks"] a[title="Super useful Github links"]').click();
      cy.get('li[data-testid="usermanagement"] a[title="User Management"]').click();

      cy.get('li[data-testid="superusefulgithublinks"]>ul.fd-nested-list').should('not.be.visible');
      cy.get('li[data-testid="usermanagement"]>ul.fd-nested-list').should('not.be.visible');
    });

    it('It should have a local side nav accordion mode', () => {
      cy.visit('/projects/pr2/sidenavaccordionmode');

      // All is closed
      cy.get('li[data-testid="superusefulgithublinks"]>ul.fd-nested-list').should('not.be.visible');
      cy.get('li[data-testid="usermanagement"]>ul.fd-nested-list').should('not.be.visible');

      cy.get('li[data-testid="superusefulgithublinks"] a[title="Super useful Github links"]').click();

      // First one is open only
      cy.get('li[data-testid="superusefulgithublinks"]>ul.fd-nested-list').should('be.visible');
      cy.get('li[data-testid="usermanagement"]>ul.fd-nested-list').should('not.be.visible');

      cy.get('li[data-testid="usermanagement"] a[title="User Management"]').click();

      // Second one is open only
      cy.get('li[data-testid="superusefulgithublinks"]>ul.fd-nested-list').should('not.be.visible');
      cy.get('li[data-testid="usermanagement"]>ul.fd-nested-list').should('be.visible');

      cy.get('li[data-testid="usermanagement"] a[title="User Management"]').click();

      // All is closed
      cy.get('li[data-testid="superusefulgithublinks"]>ul.fd-nested-list').should('not.be.visible');
      cy.get('li[data-testid="usermanagement"]>ul.fd-nested-list').should('not.be.visible');
    });

    it('It should have a global side nav accordion mode', () => {
      cy.visit('/projects/pr2/collapsibles');
      cy.window().then(win => {
        const config = win.Luigi.getConfig();
        config.navigation.defaults = {
          sideNavAccordionMode: true
        };
        config.tag = 'accordion';
        win.Luigi.configChanged();
        cy.get('#app[configversion="accordion"]');
        // All is closed
        cy.get('li[data-testid="superusefulgithublinks"]>ul.fd-nested-list').should('not.be.visible');
        cy.get('li[data-testid="usermanagement"]>ul.fd-nested-list').should('not.be.visible');

        cy.get('li[data-testid="superusefulgithublinks"] a[title="Super useful Github links"]').click();

        // First one is open only
        cy.get('li[data-testid="superusefulgithublinks"]>ul.fd-nested-list').should('be.visible');
        cy.get('li[data-testid="usermanagement"]>ul.fd-nested-list').should('not.be.visible');

        cy.get('li[data-testid="usermanagement"] a[title="User Management"]').click();

        // Second one is open only
        cy.get('li[data-testid="superusefulgithublinks"]>ul.fd-nested-list').should('not.be.visible');
        cy.get('li[data-testid="usermanagement"]>ul.fd-nested-list').should('be.visible');

        cy.get('li[data-testid="usermanagement"] a[title="User Management"]').click();

        // All is closed
        cy.get('li[data-testid="superusefulgithublinks"]>ul.fd-nested-list').should('not.be.visible');
        cy.get('li[data-testid="usermanagement"]>ul.fd-nested-list').should('not.be.visible');
      });
    });
  });

  describe('Link withoutSync/withSync', () => {
    beforeEach(() => {
      cy.visitLoggedIn('/projects/pr2');
    });

    it('withoutSync -> it should remain on the current page, highlight tree menu and remain in same page', () => {
      cy.expectPathToBe('/projects/pr2');
      cy.getIframeBody().then(result => {
        // Link on Main page PR2 exist
        cy.wrap(result).contains(' with params: project to global settings and back');

        // checking if we have NOT highlighted  menu item
        cy.get('a[href="/projects/pr2/virtual-tree"]')
          .should('exist')
          .not('.is-selected');

        // CLICK ON navigate-withoutSync-virtual-tree
        // linkManager().withoutSync().navigate('/projects/pr2/virtual-tree')
        cy.wrap(result)
          .find('a[data-testid="navigate-withoutSync-virtual-tree"]')
          .click();

        // Url should changed in the main window
        cy.expectPathToBe('/projects/pr2/virtual-tree');
        // Click link is still here (we haven't changed page)
        cy.wrap(result).find('a[data-testid="navigate-withoutSync-virtual-tree"]');
        // checking if we have highlighted  menu item
        cy.get('a[href="/projects/pr2/virtual-tree"]')
          .should('exist')
          .should('have.class', 'is-selected');

        // checking if we have NOT highlighted  menu item
        cy.get('a[href="/projects/pr2/settings"]')
          .should('exist')
          .not('.is-selected');

        // CLICK ON navigate-withoutSync-virtual-tree
        // linkManager().withoutSync().navigate('/projects/pr2/virtual-tree')
        cy.wrap(result)
          .find('a[data-testid="navigate-withoutSync-settings"]')
          .click();

        // Url should changed in the main window
        cy.expectPathToBe('/projects/pr2/settings');
        // Click link is still here (we haven't changed page)
        cy.wrap(result).find('a[data-testid="navigate-withoutSync-virtual-tree"]');
        // checking if we have highlighted  menu item
        cy.get('a[href="/projects/pr2/settings"]')
          .should('exist')
          .should('have.class', 'is-selected');
      });
    });

    it('withSync -> it should change page', () => {
      cy.expectPathToBe('/projects/pr2');
      cy.getIframeBody().then(result => {
        // Link on Main page PR2 exist
        cy.wrap(result).contains(' with params: project to global settings and back');

        // checking if we have NOT highlighted  menu item
        cy.get('a[href="/projects/pr2/virtual-tree"]')
          .should('exist')
          .not('.is-selected');

        // CLICK ON navigate-withoutSync-virtual-tree
        // linkManager().withoutSync().navigate('/projects/pr2/virtual-tree')
        cy.wrap(result)
          .find('a[data-testid="navigate-withSync-virtual-tree"]')
          .click();

        // Url should changed in the main window
        cy.expectPathToBe('/projects/pr2/virtual-tree');

        // Check we have changed page
        cy.wrap(result)
          .contains(' with params: project to global settings and back')
          .should('not.exist');
        // checking if we have highlighted  menu item
        cy.get('a[href="/projects/pr2/virtual-tree"]')
          .should('exist')
          .should('have.class', 'is-selected');

        cy.wrap(result).contains('Add Segments To The Url content');
      });
    });
  });

  describe('Link withOptions', () => {
    beforeEach(() => {
      cy.visitLoggedIn('/projects/pr2');
    });

    it('withOptions - no context updated -> it should remain on the current page', () => {
      cy.expectPathToBe('/projects/pr2');
      cy.getIframeBody().then(result => {
        // Link on Main page PR2 exists
        cy.wrap(result).contains('LuigiClient - withOptions()');
        cy.wrap(result)
          .find('a[data-testid="navigate-withOptions-no-context"]')
          .click();

        // URL should be changed in the main window
        cy.expectPathToBe('/projects');
        cy.wrap(result).contains('LuigiClient - withOptions()');
        cy.get('[data-testid="pr1_projectone"]').should('exist');
        cy.get('[data-testid="storage_storage"]').should('exist');
      });
    });

    it('withOptions - no history kept', () => {
      cy.expectPathToBe('/projects/pr2');
      cy.getIframeBody().then(result => {
        // Link on Main page PR2 exist
        cy.wrap(result).contains('LuigiClient - withOptions()');

        cy.wrap(result)
          .find('a[data-testid="navigate-withOptions-no-history"]')
          .click();

        cy.expectPathToBe('/overview');
        cy.go('back');
        cy.expectPathToBe('/overview');
      });
    });
  });

  describe('ProfileMenu Fiori 3 Style', () => {
    context('Desktop', () => {
      it('not render Fiori3 profile in Shellbar when profileType is equal "simple"', () => {
        cy.window().then(win => {
          const config = win.Luigi.getConfig();
          config.settings.profileType = 'simple';
          win.Luigi.configChanged();

          cy.get('[data-testid="luigi-topnav-profile-btn"]')
            .should('exist')
            .click();
          cy.get('.lui-user-menu-fiori').should('not.be.visible');
          cy.get('.lui-profile-simple-menu').should('be.visible');
        });
      });

      it('not render Fiori3 profile in Shellbar when experimental is equal false', () => {
        cy.window().then(win => {
          const config = win.Luigi.getConfig();
          config.settings.profileType = 'Fiori3';
          config.settings.experimental = { profileMenuFiori3: false };
          win.Luigi.configChanged();

          cy.get('[data-testid="luigi-topnav-profile-btn"]')
            .should('exist')
            .click();
          cy.get('.lui-user-menu-fiori').should('not.be.visible');
          cy.get('.lui-profile-simple-menu').should('be.visible');
        });
      });

      it('should render Fiori3 profile in Shellbar when profileType is equal "Fiori3"', () => {
        cy.window().then(win => {
          const config = win.Luigi.getConfig();
          config.settings.profileType = 'Fiori3';
          config.settings.experimental = { profileMenuFiori3: true };
          win.Luigi.configChanged();
          cy.wait(1000);

          cy.get('[data-testid="luigi-topnav-profile-btn"]').should('exist');
          cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
          cy.get('.lui-user-menu-fiori').should('be.visible');
          cy.get('.lui-profile-simple-menu').should('not.be.visible');
        });
      });

      it('should have User Description and Avatar when Fiori3 Profile Menu is enabled', () => {
        cy.window().then(win => {
          const config = win.Luigi.getConfig();
          config.settings.profileType = 'Fiori3';
          config.settings.experimental = { profileMenuFiori3: true };
          win.Luigi.configChanged();

          cy.wait(1000);

          cy.get('[data-testid="luigi-topnav-profile-btn"]').should('exist');
          cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
          cy.get('[data-testid="luigi-topnav-profile-avatar"]').should('exist');
          cy.get('[data-testid="luigi-topnav-profile-initials"]').should('not.exist');
          cy.get('[data-testid="luigi-topnav-profile-icon"]').should('not.exist');
        });
      });
    });
  });

  describe('External Link', () => {
    beforeEach(() => {
      cy.visitLoggedIn('/projects/pr2');
    });

    it('with context templating', () => {
      cy.expectPathToBe('/projects/pr2');
      cy.get('[data-testid="superusefulgithublinks"]').click();
      cy.get('a[data-testid="contextvaluereplacement-externallink"]')
        .should("have.attr", "href", "http://sap.com/en?foo=bar");
    });
  });
});
