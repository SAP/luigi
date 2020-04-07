import fiddleConfig from '../../configs/default';
Cypress.env('RETRIES', 0);
describe('Navigation with Fiddle', () => {
  describe('context switcher', () => {
    beforeEach(() => {
      let newConfig = Object.assign({}, fiddleConfig);
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
      newConfig.navigation.contextSwitcher = 5;
      newConfig = JSON.stringify(newConfig).replace(
        `"contextSwitcher":5`,
        `contextSwitcher : {
                defaultLabel: 'Select Environment ...',
                lazyloadOptions: true,
                parentNodePath: '/environments', 
                options: function options() {
                    return [{
                        label : 'Environment 1',
                        pathValue: 'env1',
                        customRendererCategory: 'production'
                    },
                    {
                        label : 'Environment 2',
                        pathValue: 'env2',
                        customRendererCategory: 'stage'
                    }]
                },
                customSelectedOptionRenderer : (option) => { 
                    if (option.customRendererCategory === 'production') {
                        return ${`"<label style='color: rgb(136, 255, 0); font-weight:700'>" +
                        option.label +
                        "</label>"`};
                    } else if (option.customRendererCategory === 'stage') {
                        return ${`"<label style='color: rgb(0, 136, 255); font-weight:700'>" +
                        option.label +
                        "</label>"`};
                    }
                }
              }`
      );
      cy.visitWithFiddleConfig('/', newConfig);
    });
    it('custom selected option renderer', () => {
      cy.contains('Select Environment').click();
      cy.contains('Environment 1').click();
      cy.get('.fd-button--light')
        .find('label')
        .should('have.css', 'color', 'rgb(136, 255, 0)')
        .and('have.css', 'font-weight', '700');
      cy.contains('Environment 1').click();
      cy.contains('Environment 2').click();
      cy.get('.fd-button--light')
        .find('label')
        .should('have.css', 'color', 'rgb(0, 136, 255)')
        .and('have.css', 'font-weight', '700');
    });
  });
});
