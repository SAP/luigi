import fiddleConfig from '../../configs/default';
import { cloneDeep } from 'lodash';

describe('Fiddle', () => {
  describe('Navigation', () => {
    describe('Core api navigation test', () => {
      beforeEach(() => {
        cy.visitWithFiddleConfig('/');
      });
      it('Core API navigate and open and close modal', () => {
        cy.window().then(win => {
          win.Luigi.navigation().navigate('/home/two');
        });
        cy.expectPathToBe('/home/two');

        cy.window().then(win => {
          win.Luigi.navigation().openAsModal('/settings', {
            title: 'Preserved View',
            size: 'm'
          });
        });

        cy.contains('Preserved View');
        cy.get('body')
          .find('[aria-label="close"]', { timeout: 5000 })
          .click();
        cy.expectPathToBe('/home/two');
      });
      it('Open modal via core api with "px"', () => {
        cy.window().then(win => {
          win.Luigi.navigation().openAsModal('/home/two', { width: '500px', height: '500px' });
        });
        cy.get('.lui-modal-mf').should('exist');
        cy.get('.lui-modal-mf')
          .should('have.css', 'width', '500px')
          .and('have.css', 'height', '500px');
        cy.get('[aria-label="close"]').click();
      });
      it('Open modal via core api with "%"', () => {
        cy.window().then(win => {
          win.Luigi.navigation().openAsModal('/home/two', { width: '20%', height: '40%' });
        });
        cy.get('.lui-modal-mf').should('exist');
        cy.get('.lui-modal-mf').should('have.attr', 'style', 'width:20%;height:40%;');
        cy.get('[aria-label="close"]').click();
      });
      it('Open modal via core api with "rem"', () => {
        cy.window().then(win => {
          win.Luigi.navigation().openAsModal('/home/two', { width: '33rem', height: '70rem' });
        });
        cy.get('.lui-modal-mf').should('exist');
        cy.get('.lui-modal-mf').should('have.attr', 'style', 'width:33rem;height:70rem;');
        cy.get('[aria-label="close"]').click();
      });
      it('Open modal via core api with "rem"', () => {
        cy.window().then(win => {
          win.Luigi.navigation().openAsModal('/home/two', { width: '34psx', height: '70rm' });
        });
        cy.get('.lui-modal-mf').should('exist');
        cy.get('.lui-modal-mf').should('have.attr', 'style', 'width:80%;height:80%;');
        cy.get('[aria-label="close"]').click();
      });
    });
    describe('Normal navigation', () => {
      beforeEach(() => {
        const newConfig = cloneDeep(fiddleConfig);
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
    describe('virtualTree with fromVirtualTreeRoot', () => {
      beforeEach(() => {
        const newConfig = cloneDeep(fiddleConfig);

        newConfig.navigation.nodes.push({
          pathSegment: 'virtual',
          label: 'Virtual',
          virtualTree: true,
          viewUrl: '/examples/microfrontends/multipurpose.html#',
          context: {
            content:
              '<button  onClick="LuigiClient.linkManager().fromVirtualTreeRoot().navigate(\'/this/is/a/tree\')">virtual</button>'
          }
        });
        cy.visitWithFiddleConfig('/virtual', newConfig);
      });
      it('navigate', () => {
        cy.getIframeBody().then($body => {
          cy.wrap($body)
            .find('button')
            .contains('virtual')
            .click();

          cy.expectPathToBe('/virtual/this/is/a/tree');
        });
      });
    });
    describe('ContextSwitcher', () => {
      let newConfig;
      beforeEach(() => {
        newConfig = cloneDeep(fiddleConfig);
        newConfig.navigation.nodes.push({
          hideFromNav: true,
          pathSegment: 'environments',
          viewUrl: '/examples/microfrontends/multipurpose.html',
          children: [
            {
              pathSegment: ':environmentId',
              viewUrl: '/examples/microfrontends/multipurpose.html'
            }
          ]
        });
        newConfig.navigation.contextSwitcher = {
          defaultLabel: 'Select Environment',
          parentNodePath: '/environments',
          lazyloadOptions: true,
          options: () => {
            return [
              {
                label: 'Environment 1',
                pathValue: 'env1',
                customRendererCategory: 'production'
              },
              {
                label: 'Environment 2',
                pathValue: 'env2',
                customRendererCategory: 'stage'
              }
            ];
          },
          customSelectedOptionRenderer: option => {
            if (option.customRendererCategory === 'production') {
              return `<label style='color: rgb(136, 255, 0); font-weight:700'>
                    ${option.label}
                    </label>`;
            } else if (option.customRendererCategory === 'stage') {
              return `<label style='color: rgb(0, 136, 255); font-weight:700'>
                        ${option.label}
                        </label>`;
            }
          }
        };
      });
      it('custom selected option renderer', () => {
        cy.visitWithFiddleConfig('/', newConfig);

        cy.contains('Select Environment')
          .should('exist')
          .click();
        cy.contains('Environment 1')
          .should('exist')
          .click();
        cy.get('[data-testid=luigi-contextswitcher-button]')
          .find('label')
          .should('have.css', 'color', 'rgb(136, 255, 0)')
          .and('have.css', 'font-weight', '700');

        cy.get('[data-testid=luigi-contextswitcher-button]')
          .should('exist')
          .click();
        cy.contains('Environment 2')
          .should('exist')
          .click();
        cy.get('[data-testid=luigi-contextswitcher-button]')
          .find('label')
          .should('have.css', 'color', 'rgb(0, 136, 255)')
          .and('have.css', 'font-weight', '700');

        // checks if there is only one selected item
        cy.get('#context_menu_middle .is-selected').should('have.length', 1);
      });

      it('using fallbackLabelResolver', () => {
        newConfig.navigation.contextSwitcher.customSelectedOptionRenderer = undefined;
        newConfig.navigation.contextSwitcher.fallbackLabelResolver = id => id.toUpperCase();
        newConfig.navigation.contextSwitcher.options = [{ pathValue: 'env1' }, { pathValue: 'env2' }];

        cy.visitWithFiddleConfig('/', newConfig);

        cy.get('#context_menu_middle .is-selected').should('have.length', 0);

        cy.contains('Select Environment').click();
        cy.contains('ENV1').click(); // fb label resolver used

        // checks if there is only one selected item
        cy.get('#context_menu_middle .is-selected').should('have.length', 1);
      });
    });
  });
  describe('Unload and load Luigi', () => {
    beforeEach(() => {
      const newConfig = cloneDeep(fiddleConfig);
      cy.visitWithFiddleConfig('/home/two', newConfig);
    });
    it('Core API unload', () => {
      let config;
      cy.window().then(win => {
        config = win.Luigi.getConfig();
        config.navigation.nodes = [
          {
            label: 'Luigi',
            pathSegment: 'luigi',
            viewUrl: '/examples/microfrontends/multipurpose.html'
          }
        ];
      });

      cy.get('.fd-shellbar').should('be.visible');

      cy.window().then(win => {
        win.Luigi.unload();
      });

      cy.get('.fd-shellbar').should('not.exist');

      cy.window().then(win => {
        win.Luigi.setConfig(config);
      });

      cy.get('.fd-shellbar').should('be.visible');
    });
  });
  describe('Show-hide of Logout & Login Buttons', () => {
    const loginLink = () => {
      return cy.get('[data-testid="login-btn"]');
    };
    const logoutLink = () => {
      return cy.get('[data-testid="logout-btn"]');
    };
    describe('No Auth', () => {
      beforeEach(() => {
        const newConfig = cloneDeep(fiddleConfig);
        newConfig.auth = undefined;
        newConfig.navigation.profile = {
          logout: {
            label: 'Bye bye',
            icon: 'sys-cancel'
          }
        };
        cy.visitWithFiddleConfig('/home/two', newConfig);
      });
      it('Static profile, and logging out with customLogoutFn', () => {
        cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
        logoutLink().should('exist');
        loginLink().should('not.exist');

        let profileLogout;
        cy.window().then(win => {
          const config = win.Luigi.getConfig();
          profileLogout = config.navigation.profile.logout;
          profileLogout.customLogoutFn = () => {
            return true;
          };
          cy.spy(profileLogout, 'customLogoutFn');
          win.Luigi.setConfig(config);
          win.Luigi.configChanged('navigation.profile');
        });

        // Verify profile value
        logoutLink()
          .contains('Bye bye')
          .click();

        // need to wrap 'expect' into some cypress function, else it executes immediately
        cy.window().then(win => {
          expect(profileLogout.customLogoutFn).to.be.called;
        });
      });
    });
    describe('With Auth', () => {
      let newConfig;

      const visitLoggedInWithAuthConfig = (path = '/', newConfig) => {
        const strConfig = JSON.stringify(newConfig).replace('"OAUTH2_PROVIDER"', 'window.LuigiAuthOAuth2'); // workaround else it would just be undefined
        cy.visitLoggedInWithFiddleConfig(path, strConfig);
      };
      const visitWithAuthConfig = (path = '/', newConfig) => {
        const strConfig = JSON.stringify(newConfig).replace('"OAUTH2_PROVIDER"', 'window.LuigiAuthOAuth2'); // workaround else it would just be undefined
        cy.visitWithFiddleConfigString(path, strConfig);
      };

      beforeEach(() => {
        newConfig = cloneDeep(fiddleConfig);
        newConfig.auth = {
          use: 'myOAuth2',
          myOAuth2: {
            idpProvider: 'OAUTH2_PROVIDER',
            authorizeUrl: '/auth/idpmock/implicit.html',
            logoutUrl: '/auth/idpmock/logout.html',
            post_logout_redirect_uri: '/auth/logout.html',
            authorizeMethod: 'GET',
            oAuthData: {
              client_id: 'egDuozijY5SVr0NSIowUP1dT6RVqHnlp',
              redirect_uri: '/auth/callback.html'
            }
          }
        };
        newConfig.navigation.profile = {
          logout: {
            label: 'Bye bye'
          },
          staticUserInfoFn: () => ({
            name: 'Static User',
            initials: 'LU',
            email: 'other.luigi.user@example.com',
            picture: '/assets/favicon-sap.ico',
            icon: false
          })
        };
      });

      it('Profile, no auto-login, logged out', () => {
        newConfig.auth.disableAutoLogin = true;
        visitWithAuthConfig('/', newConfig);

        cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
        logoutLink().should('not.exist');
        loginLink().should('exist');
      });

      it('No Profile, no auto-login, logged out and login', () => {
        newConfig.auth.disableAutoLogin = true;
        newConfig.navigation.profile = undefined;
        visitWithAuthConfig('/', newConfig);

        // Logged out
        cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
        logoutLink().should('not.exist');
        loginLink().should('exist');

        // Log in
        loginLink().click();
        cy.login('tets@email.com', 'tets', true);

        // Logged in
        cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
        loginLink().should('not.exist');
        logoutLink().should('exist');

        // Verify default value
        logoutLink().contains('Sign Out');
      });

      it('Profile, logged in', () => {
        newConfig.navigation.profile = {
          logout: {
            label: 'Bye bye',
            icon: 'sys-cancel'
          }
        };
        newConfig.auth.disableAutoLogin = false;
        visitLoggedInWithAuthConfig('/', newConfig);

        cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
        logoutLink().should('exist');
        loginLink().should('not.exist');

        // Verify profile value
        logoutLink().contains('Bye bye');
      });

      it('No profile, logged in', () => {
        newConfig.navigation.profile = undefined;
        newConfig.auth.disableAutoLogin = false;
        visitLoggedInWithAuthConfig('/', newConfig);

        cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
        logoutLink().should('exist');
        loginLink().should('not.exist');

        // Verify default value
        logoutLink().contains('Sign Out');
      });

      it('Trigger Login and Logout with Core API', () => {
        newConfig.navigation.profile = undefined;
        newConfig.auth.disableAutoLogin = true;
        visitWithAuthConfig('/', newConfig);

        cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
        loginLink().should('exist');

        cy.window().then(win => {
          cy.log('Trigger auth().login()');
          win.Luigi.auth().login();
        });

        cy.login('tets@email.com', 'tets', true);

        cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
        logoutLink().should('exist');

        cy.window().then(win => {
          cy.log('Trigger auth().logout()');
          win.Luigi.auth().logout();
        });

        cy.contains('Login again');
      });

      it('User settings in profile menu with custom label', () => {
        newConfig.settings = {
          userSettings: {
            userSettingsProfileMenuEntry: {
              label: 'My UserSettings',
              icon: 'settings'
            }
          }
        };
        visitLoggedInWithAuthConfig('/', newConfig);
        cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
        cy.get('[data-testid="settings-link"]').should('exist');
        cy.get('[data-testid="settings-link"]').contains('My UserSettings');
      });

      it('User settings in profile menu with default label', () => {
        newConfig.settings = {
          userSettings: {}
        };
        visitLoggedInWithAuthConfig('/', newConfig);
        cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
        cy.get('[data-testid="settings-link"]').should('exist');
        cy.get('[data-testid="settings-link"]').contains('Settings');
      });

      it('User settings not in the profile menu, if not configured', () => {
        newConfig.navigation.profile = {
          logout: {
            label: 'Bye bye',
            icon: 'sys-cancel'
          }
        };
        newConfig.auth.disableAutoLogin = false;
        visitLoggedInWithAuthConfig('/', newConfig);

        cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
        logoutLink().should('exist');
        cy.get('[data-testid="settings-link"]').should('not.exist');
      });
    });
  });

  describe('Theming', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = cloneDeep(fiddleConfig);
      newConfig.settings.theming = {
        themes: () => [{ id: 'light', name: 'Fiori3 Light' }, { id: 'dark', name: 'Fiori3 Dark' }],
        defaultTheme: 'light'
        // nodeViewURLDecorator: {
        //   queryStringParameter: {
        //     keyName: 'sap-theme'
        //     // optional
        //     // value: themeId => {
        //     //   return themeId + 'YES';
        //     // }
        //   }
        // }
      };
      newConfig.navigation.nodes.push({
        pathSegment: 'theming',
        label: 'Theming Test',
        viewUrl: '/examples/microfrontends/multipurpose.html#',
        context: {
          title: 'Welcome <h2 id="themeText"></h2>',
          content: `<img src="empty.gif" onerror='document.getElementById("themeText").innerHTML = LuigiClient.uxManager().getCurrentTheme();' />`
        }
      });
    });

    it('Client get and set theme', () => {
      cy.visitWithFiddleConfig('/theming', newConfig);

      cy.getIframeBody().then($body => {
        cy.wrap($body)
          .find('h2')
          .contains('light');
      });
    });
    it('Iframe Url should get set with value by default', () => {
      newConfig.settings.theming.nodeViewURLDecorator = {
        queryStringParameter: {
          keyName: 'sap-theme'
        }
      };
      cy.visitWithFiddleConfig('/', newConfig);

      cy.get('iframe').then(ifr => {
        const url = new URL(ifr.attr('src'));
        expect(`${url.pathname}${url.search}${url.hash}`).to.equal(
          '/examples/microfrontends/multipurpose.html?sap-theme=light'
        );
      });
    });
    it('Iframe Url should get set with custom value', () => {
      newConfig.settings.theming.nodeViewURLDecorator = {
        queryStringParameter: {
          keyName: 'sap-theme',
          value: themeId => {
            return themeId + 'LUIGI';
          }
        }
      };
      cy.visitWithFiddleConfig('/', newConfig);

      cy.get('iframe').then(ifr => {
        const url = new URL(ifr.attr('src'));
        expect(`${url.pathname}${url.search}${url.hash}`).to.equal(
          '/examples/microfrontends/multipurpose.html?sap-theme=lightLUIGI'
        );
      });
    });
  });

  describe('semiCollapsible settings of Left Side Navigation', () => {
    let newConfig;

    beforeEach(() => {
      newConfig = cloneDeep(fiddleConfig);
      newConfig.settings.responsiveNavigation = 'semiCollapsible';
      cy.window().then(win => {
        win.Luigi.configChanged('settings');
      });
    });
    it('should check if the btn hide/show left side nav visible', () => {
      cy.get('[data-testid="semiCollapsibleButton"]').should('be.visible');
    });

    it('should collapse the left sidde nav on btn click', () => {
      cy.get('[data-testid="semiCollapsibleButton"]').click();
      cy.get('[data-testid="semiCollapsibleLeftNav"]').should('have.class', 'fd-side-nav--condensed');

      cy.reload().wait(1000);

      cy.get('[data-testid="semiCollapsibleLeftNav"]').should('have.class', 'fd-side-nav--condensed');
    });

    it('should execute Core API function collapseLeftSideNav() and open the nav', () => {
      cy.window().then(win => {
        win.Luigi.ux().collapseLeftSideNav(false);
      });
      cy.reload().wait(1000);
      cy.get('[data-testid="semiCollapsibleLeftNav"]').should('not.have.class', 'fd-side-nav--condensed');
    });
  });

  describe('Fiori3 settings of Left Side Navigation', () => {
    let newConfig;

    beforeEach(() => {
      newConfig = cloneDeep(fiddleConfig);
      newConfig.settings.responsiveNavigation = 'Fiori3';
      cy.window().then(win => {
        win.Luigi.configChanged('settings');
      });
      cy.visitWithFiddleConfig('/', newConfig);
    });

    it('should check if the burger btn exist', () => {
      cy.get('button.lui-burger').should('be.visible');
    });

    it('should collapse the left sidde nav on burger click', () => {
      cy.get('button.lui-burger').click();
      cy.get('[data-testid="semiCollapsibleLeftNav"]').should('have.class', 'fd-side-nav--condensed');

      cy.reload().wait(1000);

      cy.get('[data-testid="semiCollapsibleLeftNav"]').should('have.class', 'fd-side-nav--condensed');
    });

    it('should execute Core API function collapseLeftSideNav() and open the nav in Fiori3 settings', () => {
      cy.window().then(win => {
        win.Luigi.ux().collapseLeftSideNav(false);
      });
      cy.reload().wait(1000);
      cy.get('[data-testid="semiCollapsibleLeftNav"]').should('not.have.class', 'fd-side-nav--condensed');
    });
  });
  describe('User settings dialog', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = cloneDeep(fiddleConfig);
      newConfig.userSettings = {
        userSettingGroups: {
          userAccount: {
            label: 'User Account',
            sublabel: 'username',
            icon: 'settings',
            title: 'User Account',
            settings: {
              name: { type: 'string', label: 'Name', isEditable: true },
              email: { type: 'string', label: 'E-Mail', isEditable: false },
              server: { type: 'string', label: 'Server', isEditable: false }
            }
          },
          language: {
            label: 'Language & Region',
            sublabel: 'EN | Time Format: 12h',
            icon: '/assets/github-logo.png',
            title: 'Language & Region',
            settings: {
              language: {
                type: 'enum',
                label: 'Language and Region',
                options: [
                  { value: 'de', label: 'Deutsch' },
                  { value: 'en', label: 'English' },
                  '简体中文',
                  { value: 'fr', label: 'Français' }
                ],
                description:
                  'After you save your settings, the browser will refresh for the new language to take effect.'
              },
              date: { type: 'string', label: 'Date Format' },
              time: {
                type: 'enum',
                label: 'Time Format',
                options: ['12 h', '24 h']
              }
            }
          },
          theming: {
            label: 'Theme',
            sublabel: 'Theme',
            icon: '/assets/github-logo.png',
            title: 'Theming',
            viewUrl: 'http://localhost:8080/examples/microfrontends/customUserSettingsMf.html',
            settings: {
              theme: {
                type: 'enum',
                label: 'Theme',
                options: ['red', 'green'],
                description: 'Choose a theme'
              }
            }
          }
        }
      };
    });
    it('User settings dialog', () => {
      cy.visitWithFiddleConfig('/', newConfig);
      cy.wait(1000);
      cy.window().then(win => {
        win.Luigi.ux().openUserSettings();
      });
      cy.get('.lui-usersettings-dialog').should('be.visible');

      cy.get('.lui-usersettings-left-nav .lui-us-navlist__item')
        .eq(1)
        .should('contain', 'Language & Region');
      cy.get('.lui-usersettings-left-nav .lui-us-navlist__item')
        .eq(1)
        .click();

      cy.get('[data-testid="lui-us-language-dropdown"]')
        .eq(0)
        .click();
      cy.get('[data-testid="lui-us-option0_0"]').click();
      cy.get('[data-testid="lui-us-input0"]')
        .should('exist')
        .should('contain', 'Deutsch');

      cy.get('[data-testid="lui-us-input0"]').click();
      cy.get('[data-testid="lui-us-option0_1"]').click();
      cy.get('[data-testid="lui-us-input0"]')
        .should('exist')
        .should('contain', 'English');

      cy.get('[data-testid="lui-us-language-dropdown"]')
        .eq(0)
        .click();
      cy.get('[data-testid="lui-us-language-dropdown"]').should('be.visible');
      cy.get('[data-testid="lui-us-language-dropdown"]')
        .eq(0)
        .click();
      cy.wait(500);
      cy.get('[data-testid="lui-us-option0_0"]').should('not.be.visible');

      cy.get('[data-testid="lui-us-dismissBtn"]').click();
      cy.get('.lui-usersettings-dialog').should('not.be.visible');
    });
    it('Check if external mf is loaded in custom user settings editor', () => {
      cy.visitWithFiddleConfig('/', newConfig);
      cy.wait(1000);
      cy.window().then(win => {
        win.Luigi.ux().openUserSettings();
      });

      cy.get('.lui-usersettings-left-nav .lui-us-navlist__item')
        .eq(2)
        .should('contain', 'Theme');
      cy.get('.lui-usersettings-left-nav .lui-us-navlist__item')
        .eq(2)
        .click();

      cy.get('.iframeUserSettingsCtn iframe').then(ifr => {
        expect(ifr[0].src).to.equal('http://localhost:8080/examples/microfrontends/customUserSettingsMf.html');
      });
    });
  });

  describe('Bookmarkable micro frontends', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = cloneDeep(fiddleConfig);
    });

    it('Hash routing with showModalPathInUrl enabled and custom modalPathParam and node params', () => {
      newConfig.routing.showModalPathInUrl = true;
      newConfig.routing.modalPathParam = 'mymodal';
      newConfig.routing.useHashRouting = true;

      cy.visitWithFiddleConfig('/home', newConfig);

      cy.window().then(win => {
        win.Luigi.navigation()
          .withParams({ mp: 'one' })
          .openAsModal('/home/one');
      });

      // cy.wait(150); // it takes some time for the nodeParams be available

      // TODO - Accessing LuigiCLient directly results in flaky behavoir, skip for now
      // cy.getModalWindow().then(win => {
      //   assert.deepEqual(win.LuigiClient.getNodeParams(), { mp: 'one' });
      // });

      cy.expectPathToBe('/home?mymodal=' + encodeURIComponent('/home/one?~mp=one'));
    });

    it('Path routing with showModalPathInUrl enabled and custom modalPathParam and node params', () => {
      newConfig.routing.showModalPathInUrl = true;
      newConfig.routing.modalPathParam = 'mymodal';
      newConfig.routing.useHashRouting = false;

      cy.visitWithFiddleConfig('/home', newConfig);

      cy.window().then(win => {
        win.Luigi.navigation()
          .withParams({ mp: 'one' })
          .openAsModal('/home/one');
      });

      // cy.wait(150); // it takes some time for the nodeParams be available
      // TODO - Accessing LuigiCLient directly results in flaky behavoir, skip for now
      // cy.getModalWindow().then(win => {
      //   assert.deepEqual(win.LuigiClient.getNodeParams(), { mp: 'one' });
      // });

      cy.expectPathToBe('/home');
      cy.location().should(location => {
        expect(location.search).to.eq('?mymodal=' + encodeURIComponent('/home/one?~mp=one'));
      });
    });
  });

  describe('GlobalSearchCentered', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = cloneDeep(fiddleConfig);
      newConfig.globalSearch = {
        searchFieldCentered: true,
        searchProvider: {}
      };
      newConfig.settings = {
        experimental: {
          globalSearchCentered: true
        }
      };

      cy.visitWithFiddleConfig('/home', newConfig);
    });
    context('Desktop', () => {
      it('Search on large viewport', () => {
        cy.get('.lui-global-search-btn').should('not.be.visible');
        cy.get('.lui-global-search-cancel-btn').should('not.be.visible');
        cy.get('.lui-global-search-input').should('be.visible');
      });
    });
    context('Mobile', () => {
      it('Search on smaller viewport', () => {
        cy.viewport('iphone-6');
        cy.get('.lui-global-search-btn').should('be.visible');
        cy.get('.lui-global-search-cancel-btn').should('not.be.visible');
        cy.get('.lui-global-search-input').should('not.be.visible');

        cy.get('.lui-global-search-btn').click();

        cy.get('.lui-global-search-btn').should('not.be.visible');
        cy.get('.lui-global-search-cancel-btn').should('be.visible');
        cy.get('.lui-global-search-input').should('be.visible');

        cy.get('.lui-global-search-cancel-btn').click();

        cy.get('.lui-global-search-btn').should('be.visible');
        cy.get('.lui-global-search-cancel-btn').should('not.be.visible');
        cy.get('.lui-global-search-input').should('not.be.visible');
      });
    });
  });

  describe('BreadCrumb and NavHeader', () => {
    let newConfig;
    var breadcrumbsConfig = {
      clearBeforeRender: true,
      renderer: (el, items, clickHandler) => {
        el.classList.add('myBreadcrumb');
        let breadcrumbs = document.createElement('ol');
        breadcrumbs.setAttribute('style', 'top: 0;position: absolute;left: 0;');
        items.forEach((item, index) => {
          if (item.label) {
            let itemCmp = document.createElement('li');
            itemCmp.setAttribute('style', 'display:inline; margin: 0 10px;');
            itemCmp.setAttribute('data-testid', `breadcrumb_${item.label}_index${index}`);
            itemCmp.innerHTML = item.label;
            itemCmp._item = item;
            breadcrumbs.appendChild(itemCmp);
          }
        });
        breadcrumbs.addEventListener('click', event => {
          clickHandler(event.detail.item._item);
        });
        el.appendChild(breadcrumbs);
        return breadcrumbs;
      }
    };

    beforeEach(() => {
      newConfig = cloneDeep(fiddleConfig);
      newConfig.settings = {
        experimental: {
          navHeader: true,
          breadcrumbs: true
        }
      };

      newConfig.navigation = {
        breadcrumbs: breadcrumbsConfig,
        nodes: [
          {
            pathSegment: 'home',
            label: 'Home',
            globalNav: true,
            icon: 'home',
            children: [
              {
                pathSegment: 'dyn',
                label: 'dyn',
                children: [
                  {
                    pathSegment: ':someid',
                    navHeader: {
                      label: ':someid',
                      icon: 'sys-help'
                    },
                    children: [
                      {
                        label: '1',
                        pathSegment: '1',
                        viewUrl: 'https://fiddle.luigi-project.io/examples/microfrontends/multipurpose.html'
                      },
                      {
                        label: '2',
                        pathSegment: '2',
                        viewUrl: 'https://fiddle.luigi-project.io/examples/microfrontends/multipurpose.html'
                      },
                      {
                        label: '3',
                        pathSegment: '3',
                        viewUrl: 'https://fiddle.luigi-project.io/examples/microfrontends/multipurpose.html'
                      },
                      {
                        label: '4',
                        pathSegment: '4',
                        viewUrl: 'https://fiddle.luigi-project.io/examples/microfrontends/multipurpose.html'
                      }
                    ]
                  }
                ]
              },
              {
                label: 'static',
                pathSegment: 'static',
                label: 'static',
                viewUrl: 'https://fiddle.luigi-project.io/examples/microfrontends/multipurpose.html'
              },
              {
                pathSegment: 'virtual-tree',
                label: 'VirtualTree',
                viewUrl: 'https://fiddle.luigi-project.io/examples/microfrontends/multipurpose.html',
                virtualTree: true
              }
            ]
          }
        ]
      };
    });
    it('Breadcrumb container visible with static nodes', () => {
      cy.visitWithFiddleConfig('/home', newConfig);
      cy.wait(1000);
      cy.get('.lui-breadcrumb-container').should('be.visible');
      cy.get('[data-testid=breadcrumb_Home_index0]').should('be.visible');
      cy.get('[data-testid=breadcrumb_static_index1]').should('be.visible');
    });
    it('Breadcrumbs with dynamic nodes', () => {
      cy.visitWithFiddleConfig('/home/dyn/dynValue', newConfig);
      cy.wait(1000);
      cy.get('.lui-breadcrumb-container').should('be.visible');
      cy.get('[data-testid=breadcrumb_Home_index0]').should('be.visible');
      cy.get('[data-testid=breadcrumb_dyn_index1]').should('be.visible');
      cy.get('[data-testid=breadcrumb_dynValue_index2]').should('be.visible');
      cy.get('[data-testid=breadcrumb_1_index3]').should('be.visible');
    });
    it('Breadcrumbs with virtual nodes', () => {
      cy.visitWithFiddleConfig('/home/virtual-tree/virtualValue/test', newConfig);
      cy.wait(1000);
      cy.get('.lui-breadcrumb-container').should('be.visible');
      cy.get('[data-testid=breadcrumb_Home_index0]').should('be.visible');
      cy.get('[data-testid=breadcrumb_VirtualTree_index1]').should('be.visible');
      cy.get('[data-testid=breadcrumb_virtualValue_index2]').should('be.visible');
      cy.get('[data-testid=breadcrumb_test_index3]').should('be.visible');
    });
    it('dynamic nav header', () => {
      cy.visitWithFiddleConfig('/home/dyn/dynValue', newConfig);
      cy.get('.lui-nav-title .fd-nested-list__title').should('contain', 'dynValue');
    });
    it('static nav header', () => {
      newConfig.navigation.nodes[0].children[0].children[0].navHeader.label = 'test';
      cy.visitWithFiddleConfig('/home/dyn/dynValue', newConfig);
      cy.get('.lui-nav-title .fd-nested-list__title').should('contain', 'test');
    });
  });

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
      cy.expectPathToBe('/home/mynode?~luigi=rocks');
    });
  });
  describe('LuigiClient add and delete node and search paramstest', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = cloneDeep(fiddleConfig);
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
    
    it('Add and delete search params path routing enabled', () => {
      newConfig.routing.useHashRouting = false;
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
          .find('[data-testid="lui-get-search-params"]')
          .invoke('show');
        cy.wrap($body)
          .contains('get search params')
          .click();
        cy.wrap($body)
          .find('#currentSearchParams').should('have.text', '{"luigi":"rocks","q":"test"}')
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
