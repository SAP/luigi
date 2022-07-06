import fiddleConfig from '../../configs/default';
import { cloneDeep } from 'lodash';

describe('Fiddle 2', () => {
  const localRetries = {
    retries: {
      runMode: 5,
      openMode: 5
    }
  };
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
    it('Breadcrumb container visible with static nodes', localRetries, () => {
      cy.visitWithFiddleConfig('/home', newConfig);
      cy.wait(1000);
      cy.get('.lui-breadcrumb-container').should('be.visible');
      cy.get('[data-testid=breadcrumb_Home_index0]').should('be.visible');
      cy.get('[data-testid=breadcrumb_static_index1]').should('be.visible');
    });
    it('Breadcrumbs with dynamic nodes', localRetries, () => {
      cy.visitWithFiddleConfig('/home/dyn/dynValue', newConfig);
      cy.wait(1000);
      cy.get('.lui-breadcrumb-container').should('be.visible');
      cy.get('[data-testid=breadcrumb_Home_index0]').should('be.visible');
      cy.get('[data-testid=breadcrumb_dyn_index1]').should('be.visible');
      cy.get('[data-testid=breadcrumb_dynValue_index2]').should('be.visible');
      cy.get('[data-testid=breadcrumb_1_index3]').should('be.visible');
    });
    it('Breadcrumbs with virtual nodes', localRetries, () => {
      cy.visitWithFiddleConfig('/home/virtual-tree/virtualValue/test', newConfig);
      cy.wait(1000);
      cy.get('.lui-breadcrumb-container').should('be.visible');
      cy.get('[data-testid=breadcrumb_Home_index0]').should('be.visible');
      cy.get('[data-testid=breadcrumb_VirtualTree_index1]').should('be.visible');
      cy.get('[data-testid=breadcrumb_virtualValue_index2]').should('be.visible');
      cy.get('[data-testid=breadcrumb_test_index3]').should('be.visible');
    });
    it('dynamic nav header', localRetries, () => {
      cy.visitWithFiddleConfig('/home/dyn/dynValue', newConfig);
      cy.get('.lui-nav-title .fd-nested-list__title').should('contain', 'dynValue');
    });
    it('static nav header', localRetries, () => {
      newConfig.navigation.nodes[0].children[0].children[0].navHeader.label = 'test';
      cy.visitWithFiddleConfig('/home/dyn/dynValue', newConfig);
      cy.get('.lui-nav-title .fd-nested-list__title').should('contain', 'test');
    });
  });
});
