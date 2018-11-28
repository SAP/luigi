// https://docs.cypress.io/api/introduction/api.html

describe('Luigi Wrapper Test', () => {
  it('check the top navigation', () => {
    cy.visit('/');
    cy.get('.fd-shellbar').contains('span', 'Overview');
    cy.get('.fd-shellbar').contains('span', 'Projects');
    cy.get('.fd-shellbar').contains('span', 'External Page');
    cy.get('.fd-shellbar').contains('span', 'Login');
  });

  it('open the overview page', () => {
    cy.visit('/');
    cy.get('.fd-shellbar')
      .contains('span', 'Overview')
      .click()
      .get('.iframeContainer iframe')
      .then(function($iframe) {
        const $body = $iframe.contents().find('body');

        cy.wrap($body).contains('button', 'Add backdrop');
      });
  });

  it('backdrop check', () => {
    cy.visit('/');
    cy.get('.fd-shellbar')
      .contains('span', 'Overview')
      .click()
      .get('.iframeContainer iframe')
      .then(function($iframe) {
        const $body = $iframe.contents().find('body');

        cy.wrap($body)
          .contains('button', 'Add backdrop')
          .click();

        cy.get('.fd-ui__overlay.fd-overlay.fd-overlay--modal');
      });
  });
});
