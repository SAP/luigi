import defaultLuigiConfig from '../../configs/default';

describe('JS-TEST-APP with multi-click tab navigation', () => {
  let newConfig;
  let nodes;

  beforeEach(() => {
    nodes = [
      {
        pathSegment: 'one',
        label: 'Section one',
        viewUrl: '/examples/microfrontends/multipurpose.html',
        category: {
          label: 'Multi-Click Category A'
        }
      },
      {
        pathSegment: 'two',
        label: 'Section two',
        viewUrl: '/examples/microfrontends/multipurpose.html',
        category: 'Multi-Click Category A'
      }
    ];
    newConfig = structuredClone(defaultLuigiConfig);
    newConfig.tag = 'tab-navigation';
    newConfig.navigation.nodes[0].children.push({
      pathSegment: 'tabnav',
      label: 'Tab Navigation',
      viewUrl: '/examples/microfrontends/multipurpose.html',
      tabNav: true,
      children: nodes
    });
  });

  it('renders the tab as expected', () => {
    nodes[0].category.navigateOnClick = true;

    cy.visitTestApp('/home/tabnav', newConfig);

    cy.get('#app[configversion="tab-navigation"]');
    cy.get('.fd-icon-tab-bar__item.fd-icon-tab-bar__item--multi-click').as('tabA');
    cy.get('@tabA')
      .find('.fd-list__item')
      .should('have.length', 2);
  });

  it('navigates with the sub-items', () => {
    nodes[0].category.navigateOnClick = true;

    cy.visitTestApp('/home/tabnav', newConfig);
    cy.get('.fd-icon-tab-bar__item.fd-icon-tab-bar__item--multi-click').as('tabA');
    cy.get('@tabA')
      .find('button')
      .as('openPopover');

    cy.get('@openPopover').click();
    cy.get('@tabA')
      .contains('Section one')
      .click();
    cy.expectPathToBe('/home/tabnav/one');

    cy.get('@openPopover').click();
    cy.get('@tabA')
      .contains('Section two')
      .click();
    cy.expectPathToBe('/home/tabnav/two');

    cy.get('@openPopover').click();
    cy.get('@tabA')
      .contains('Section two')
      .should('have.attr', 'aria-selected', 'true');
    cy.get('@tabA')
      .contains('Section one')
      .should('have.attr', 'aria-selected', 'false');
  });

  it('navigates with the header if navigateOnClick is true for the first sub-item', () => {
    nodes[0].category.navigateOnClick = true;

    cy.visitTestApp('/home/tabnav', newConfig);
    cy.get('.fd-icon-tab-bar__item.fd-icon-tab-bar__item--multi-click').as('tabA');
    cy.get('@tabA')
      .find('a.fd-icon-tab-bar__tab')
      .click();
    cy.expectPathToBe('/home/tabnav/one');
  });

  describe.only('btpToolLayout', () => {
    beforeEach(() => {
      for (let i = 0; i < 9; i++) {
        newConfig.navigation.nodes[0].children[2].children.push({
          pathSegment: `node${i}`,
          label: `Node${i}`,
          viewUrl: '/examples/microfrontends/multipurpose.html'
        });
      }
      newConfig.navigation.nodes[0].children[2].children.push(
        {
          pathSegment: `node9`,
          label: `Node9`,
          viewUrl: '/examples/microfrontends/multipurpose.html',
          category: { label: 'myCat', collapsible: true }
        },
        {
          pathSegment: `Node11`,
          label: `Node11 with a suuuuuuuuuuuuuuppppper looooooooooooonnnng labelllll`,
          viewUrl: '/examples/microfrontends/multipurpose.html',
          category: 'myCat'
        }
      );
      newConfig.settings.btpToolLayout = true;
      newConfig.settings.experimental = {
        btpToolLayout: true
      };
    });
    it('popover opens to the left if not enough space to the right', () => {
      newConfig.tag = 'tabNavPopoverRight';
      cy.viewport(1500, 750);

      cy.visitTestApp('/home/tabnav', newConfig);
      cy.get('#app[configversion="tabNavPopoverRight"]');
      cy.get('[uid="2-0"]')
        .find('.fd-popover__body')
        .should('have.class', 'fd-popover__body--right');
    });
    it('enough space, render popover left', () => {
      newConfig.tag = 'tabNavPopoverLeft';
      cy.viewport(2000, 750);
      cy.visitTestApp('/home/tabnav', newConfig);
      cy.get('#app[configversion="tabNavPopoverLeft"]');
      cy.get('[uid="2-0"]')
        .find('.fd-popover__body')
        .should('not.have.class', 'fd-popover__body--right');
    });
  });
});
