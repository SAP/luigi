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
      cy.get('[data-testid="settings-link"]')
        .contains('Settings')
        .click();
      cy.get('body').tab();
      cy.tab();
      cy.tab();
      cy.get('.lui-us-navlist__item .fd-list__title')
        .contains('Language & Region')
        .focused()
        .type('{enter}');
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
});
