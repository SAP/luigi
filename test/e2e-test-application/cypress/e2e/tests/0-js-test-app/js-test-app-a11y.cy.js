import defaultLuigiConfig from '../../configs/default';
require('cypress-plugin-tab');
describe('JS-TEST-APP 4', () => {
  describe('AY11', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = structuredClone(defaultLuigiConfig);
      newConfig.tag = 'user-settings-dialog';
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
                  { value: 'it', label: 'Italiano' },
                  '简体中文'
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
            viewUrl: 'http://localhost:4500/examples/microfrontends/customUserSettingsMf.html',
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
      newConfig.settings = {
        userSettings: {
          userSettingsProfileMenuEntry: {
            label: 'My UserSettings',
            icon: 'settings'
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
    it('Select language by pressing space', () => {
      cy.visitTestAppLoggedIn('/', newConfig);
      cy.get('[data-testid="luigi-topnav-profile-btn"]').click();
      cy.get('[data-testid="settings-link"]').should('exist');
      cy.get('[data-testid="settings-link"]').contains('Settings').click();
      cy.get('body').tab();
      cy.tab();
      cy.tab();
      cy.get('.lui-us-navlist__item .fd-list__title').contains('Language & Region').focused().type('{enter}');
      cy.tab();
      cy.tab();
      cy.get('[data-testid="lui-us-enum-0"]').click(); //workaround; Does not work with 'enter' or 'space'
      cy.get('[data-testid="lui-us-enum-0"]')
        .type('{downArrow}')
        .type('{downArrow}')
        .type('{downArrow}')
        .trigger('keydown', { keyCode: 32 });
      cy.get('[data-testid="lui-us-enum-0"]').contains('Italiano');
    });
  });

  describe('A11y left nav with btp layout enabled', () => {
    let newConfig;
    let $iframeBody;

    beforeEach(() => {
      newConfig = structuredClone(defaultLuigiConfig);
      newConfig.settings.experimental = {
        btpToolLayout: true
      };
      newConfig.navigation.nodes[0].children.push(
        {
          pathSegment: 'node1',
          label: 'Node 1',
          category: { label: 'My Cat', collapsible: true, id: 'mycat' },
          viewUrl: '/examples/microfrontends/multipurpose.html',
          context: {
            title: 'Node 1',
            content: 'Content of node 1'
          }
        },
        {
          pathSegment: 'node2',
          label: 'Node 2',
          category: 'mycat',
          viewUrl: '/examples/microfrontends/multipurpose.html',
          context: {
            title: 'Node 2',
            content: 'Content of node 2'
          }
        }
      );
      //generate nodes to get the "more items" button
      for (let i = 3; i < 23; i++) {
        newConfig.navigation.nodes[0].children.push({
          pathSegment: `node${i}`,
          label: `Node ${i}`,
          viewUrl: '/examples/microfrontends/multipurpose.html'
        });
      }

      newConfig.settings.responsiveNavigation = 'Fiori3';
      newConfig.settings.btpToolLayout = true;
    });
    it('Left nav a11y', () => {
      cy.visitTestApp('/home', newConfig);

      cy.get('.fd-navigation.fd-navigation--vertical').contains('Section one').click();
      cy.get('.fd-navigation__list-item.lui-nav-entry').contains('Node 1').should('not.be.visible');
      cy.tab();
      cy.tab();
      cy.get('.fd-navigation__list-item.lui-nav-entry').contains('My Cat').should('be.focused');
      cy.get('.fd-navigation__list-item.lui-nav-entry').contains('My Cat').focused().type('{enter}');
      cy.get('.fd-navigation__list-item.lui-nav-entry').contains('Node 1').should('be.visible');
      cy.tab();
      cy.get('.fd-navigation__list-item.lui-nav-entry').contains('Node 1').should('be.focused');
      cy.get('.fd-navigation__list-item.lui-nav-entry').contains('Node 1').click();
      cy.getIframeBody({}, 0, '.iframeContainer').then((result) => {
        $iframeBody = result;
        cy.wrap($iframeBody).find('#content').contains('Content of node 1').should('be.visible');
      });
    });
    it('More Btn in left nav', () => {
      cy.visitTestApp('/home', newConfig);
      cy.get('.fd-shellbar__button.fd-button.fd-button--transparent.lui-burger').click();
      cy.get('.fd-navigation.fd-navigation--vertical').should('have.class', 'fd-navigation--snapped');
      cy.get('.fd-navigation__list-container.fd-navigation__list-container--menu').should('not.be.visible');
      cy.get('.fd-navigation__item.lui-nav-more').click();
      cy.get('.fd-navigation__list-container.fd-navigation__list-container--menu').should('be.visible');
      cy.get('body').type('{esc}');
      cy.get('.fd-navigation__list-container.fd-navigation__list-container--menu').should('not.be.visible');
      cy.get('.lui-nav-more .fd-navigation__link').should('have.focus');
      cy.get('.lui-nav-more .fd-navigation__link').tab({ shift: true });
      cy.get('.lui-nav-more .fd-navigation__link').should('not.have.focus');
      cy.tab();
      cy.get('.lui-nav-more .fd-navigation__link').should('have.focus');
      cy.get('.lui-nav-more .fd-navigation__link').focused().type('{enter}');
      cy.get('.fd-navigation__list-container.fd-navigation__list-container--menu').should('be.visible');
      cy.tab();
      cy.get('.lui-moreItems .fd-navigation__list-item.lui-nav-entry .fd-navigation__link').should('have.focus');
    });
  });

  describe('Shellbar logo gets focused first', () => {
    let newConfig;
    beforeEach(() => {
      newConfig = structuredClone(defaultLuigiConfig);
      newConfig.navigation.addNavHrefs = true;
    });
    it('Shellbar logo gets focused first', () => {
      cy.visitTestApp('/home', newConfig);
      cy.window().then((win) => {
        win.focus();
      });
      cy.get('body').click();
      cy.tab();
      cy.get('.fd-shellbar__logo').should('have.focus');
    });
    it('Shellbar logo gets focused first with btpLayout', () => {
      newConfig.settings.btpToolLayout = true;
      newConfig.settings.experimental = {
        btpToolLayout: true
      };
      cy.visitTestApp('/home', newConfig);
      cy.window().then((win) => {
        win.focus();
      });
      cy.get('body').click();
      cy.tab();
      cy.tab();
      cy.get('.fd-shellbar__logo').should('have.focus');
    });
  });
});
