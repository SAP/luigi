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

        cy.contains('Select Environment').click();
        cy.contains('Environment 1').click();
        cy.get('[data-testid=luigi-contextswitcher-button]')
          .find('label')
          .should('have.css', 'color', 'rgb(136, 255, 0)')
          .and('have.css', 'font-weight', '700');
        cy.contains('Environment 1').click();
        cy.contains('Environment 2').click();
        cy.get('[data-testid=luigi-contextswitcher-button]')
          .find('label')
          .should('have.css', 'color', 'rgb(0, 136, 255)')
          .and('have.css', 'font-weight', '700');

        // checks if there is only one selected item
        cy.get('#context_menu_middle .is-selected').should('have.length', 1);
      });

      it('using fallbackLabelResolver', () => {
        newConfig.navigation.contextSwitcher.customSelectedOptionRenderer = undefined;
        newConfig.navigation.contextSwitcher.fallbackLabelResolver = id =>
          id.toUpperCase();
        newConfig.navigation.contextSwitcher.options = [
          { pathValue: 'env1' },
          { pathValue: 'env2' }
        ];

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
      return cy.get('[data-testid="login-link"]');
    };
    const logoutLink = () => {
      return cy.get('[data-testid="logout-link"]');
    };
    describe('No Auth', () => {
      beforeEach(() => {
        const newConfig = cloneDeep(fiddleConfig);
        newConfig.auth = undefined;
        newConfig.navigation.profile = {
          logout: {
            label: 'Bye bye',
            icon: 'sys-cancel'
          },
          staticUserInfoFn: () => ({
            name: 'Static User',
            email: 'other.luigi.user@example.com',
            picture: '/assets/github-logo.png'
          })
        };
        cy.visitWithFiddleConfig('/home/two', newConfig);
      });
      it('Static profile, and logging out with customLogoutFn', () => {
        cy.get('[data-testid="luigi-topnav-profile"] button').click();
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
        const strConfig = JSON.stringify(newConfig).replace(
          '"OAUTH2_PROVIDER"',
          'window.LuigiAuthOAuth2'
        ); // workaround else it would just be undefined
        cy.visitLoggedInWithFiddleConfig(path, strConfig);
      };
      const visitWithAuthConfig = (path = '/', newConfig) => {
        const strConfig = JSON.stringify(newConfig).replace(
          '"OAUTH2_PROVIDER"',
          'window.LuigiAuthOAuth2'
        ); // workaround else it would just be undefined
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
            label: 'Bye bye',
            icon: 'sys-cancel'
          }
        };
      });

      it('Profile, no auto-login, logged out', () => {
        newConfig.auth.disableAutoLogin = true;
        visitWithAuthConfig('/', newConfig);

        cy.get('[data-testid="luigi-topnav-profile"] button').click();
        logoutLink().should('not.exist');
        loginLink().should('exist');
      });
      it('No Profile, no auto-login, logged out and login', () => {
        newConfig.auth.disableAutoLogin = true;
        newConfig.navigation.profile = undefined;
        visitWithAuthConfig('/', newConfig);

        // Logged out
        cy.get('[data-testid="luigi-topnav-profile"] button').click();
        logoutLink().should('not.exist');
        loginLink().should('exist');

        // Log in
        loginLink().click();
        cy.login('tets@email.com', 'tets', true);

        // Logged in
        cy.get('[data-testid="luigi-topnav-profile"] button').click();
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

        cy.get('[data-testid="luigi-topnav-profile"] button').click();
        logoutLink().should('exist');
        loginLink().should('not.exist');

        // Verify profile value
        logoutLink().contains('Bye bye');
      });
      it('No profile, logged in', () => {
        newConfig.navigation.profile = undefined;
        newConfig.auth.disableAutoLogin = false;
        visitLoggedInWithAuthConfig('/', newConfig);

        cy.get('[data-testid="luigi-topnav-profile"] button').click();
        logoutLink().should('exist');
        loginLink().should('not.exist');

        // Verify default value
        logoutLink().contains('Sign Out');
      });
      it('Trigger Login and Logout with Core API', () => {
        newConfig.navigation.profile = undefined;
        newConfig.auth.disableAutoLogin = true;
        visitWithAuthConfig('/', newConfig);

        cy.get('[data-testid="luigi-topnav-profile"] button').click();
        loginLink().should('exist');

        cy.window().then(win => {
          cy.log('Trigger auth().login()');
          win.Luigi.auth().login();
        });

        cy.login('tets@email.com', 'tets', true);

        cy.get('[data-testid="luigi-topnav-profile"] button').click();
        logoutLink().should('exist');

        cy.window().then(win => {
          cy.log('Trigger auth().logout()');
          win.Luigi.auth().logout();
        });

        cy.contains('Login again');
      });
    });
  });

  describe('Theming', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = cloneDeep(fiddleConfig);
      newConfig.settings.theming = {
        themes: () => [
          { id: 'light', name: 'Fiori3 Light' },
          { id: 'dark', name: 'Fiori3 Dark' }
        ],
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
      cy.get('[data-testid="semiCollapsibleLeftNav"]').should(
        'have.class',
        'fd-side-nav--condensed'
      );

      cy.reload().wait(1000);

      cy.get('[data-testid="semiCollapsibleLeftNav"]').should(
        'have.class',
        'fd-side-nav--condensed'
      );
    });

    it('should execute Core API function collapseLeftSideNav() and open the nav', () => {
      cy.window().then(win => {
        win.Luigi.ux().collapseLeftSideNav(false);
      });
      cy.reload().wait(1000);
      cy.get('[data-testid="semiCollapsibleLeftNav"]').should(
        'not.have.class',
        'fd-side-nav--condensed'
      );
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
      cy.get('[data-testid="semiCollapsibleLeftNav"]').should(
        'have.class',
        'fd-side-nav--condensed'
      );

      cy.reload().wait(1000);

      cy.get('[data-testid="semiCollapsibleLeftNav"]').should(
        'have.class',
        'fd-side-nav--condensed'
      );
    });

    it('should execute Core API function collapseLeftSideNav() and open the nav in Fiori3 settings', () => {
      cy.window().then(win => {
        win.Luigi.ux().collapseLeftSideNav(false);
      });
      cy.reload().wait(1000);
      cy.get('[data-testid="semiCollapsibleLeftNav"]').should(
        'not.have.class',
        'fd-side-nav--condensed'
      );
    });
  });
});
