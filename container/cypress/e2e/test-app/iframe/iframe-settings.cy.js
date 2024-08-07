describe('Iframe Container Test', () => {
  let stub;

  beforeEach(() => {
    cy.visit('http://localhost:8080/iframe/iframe-settings.html');
    stub = cy.stub();
  });

  it('defer-init flag for iframe container', () => {
    cy.get('#defer-init-test').then(iframe => {
      const $body = iframe.contents().find('main');
      expect($body.children()).to.have.length(0);

      // click button that calls container.init()
      cy.get('#init-button').click();

      cy.get('#defer-init-test')
        .shadow()
        .get('iframe')
        .then(iframe => {
          const $body = iframe.contents().find('body');
          cy.wrap($body)
            .contains('defer-init test for iframes')
            .should('exist');
        });
    });
  });

  it('set sandbox rules by property', () => {
    cy.get('#init-button').click();
    cy.get('button[id="sandbox-rules"]').click();

    cy.get('#defer-init-test')
      .shadow()
      .get('iframe')
      .then(elements => {
        cy.get(elements.first())
          .invoke('attr', 'sandbox')
          .should('eq', 'allow-modals allow-popups');
      });
  });

  it('set sandbox rules by attribute', () => {
    cy.get('#init-button').click();
    cy.get('#sandbox-rules-test')
      .shadow()
      .get('iframe')
      .then(elements => {
        cy.get(elements.last())
          .invoke('attr', 'sandbox')
          .should('eq', 'allow-scripts allow-same-origin');
      });
  });
});
