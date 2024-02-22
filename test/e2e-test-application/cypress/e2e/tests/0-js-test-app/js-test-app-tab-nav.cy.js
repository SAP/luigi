import defaultLuigiConfig from '../../configs/default';

describe('JS-TEST-APP with tab navigation', () => {
  let newConfig;

  beforeEach(() => {
    newConfig = structuredClone(defaultLuigiConfig);
    newConfig.tag = 'tab-navigation';
    newConfig.navigation.nodes[0].children.push({
      pathSegment: 'tabnav',
      label: 'Tab Navigation',
      viewUrl: '/examples/microfrontends/multipurpose.html',
      tabNav: true,
      children: [
        {
          pathSegment: 'one',
          label: 'Section one',
          viewUrl: '/examples/microfrontends/multipurpose.html',
          category: {
            label: 'Sections'
          }
        },
        {
          pathSegment: 'two',
          label: 'Section two',
          viewUrl: '/examples/microfrontends/multipurpose.html',
          category: {
            label: 'Sections'
          }
        }
      ]
    });
  });

  it('renders the tab navigation as expected', () => {
    cy.visitTestApp('/home/tabnav', newConfig);
    cy.get('#app[configversion="tab-navigation"]');
    cy.get('a.fd-tabs__link').as('tabMenu');
    cy.get('@tabMenu').should('have.length', 2);
    // cy.getIframeBody().then($iframeBody => {
    //   cy.wrap($iframeBody)
    //     .find('button.openSplitView')
    //     .click();
    // });

    // cy.get('div.fd-page.iframeContainer')
    //   .invoke('width')
    //   .then(iframeContainerWidth => {
    //     cy.get('div#splitViewContainer')
    //       .invoke('width')
    //       .then(splitViewContainerWidth => {
    //         cy.get('div#splitViewDragger')
    //           .invoke('width')
    //           .then(splitViewDraggerWidth => {
    //             expect(iframeContainerWidth).to.equal(splitViewContainerWidth);
    //             expect(iframeContainerWidth).to.equal(splitViewDraggerWidth);
    //           });
    //       });
    //   });
  });
});
