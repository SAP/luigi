describe('Iframe Cookies Test', () => {
  const containerSelector = '[data-test-id="iframe-based-container-test"]';
  let stub;

  beforeEach(() => {
    cy.visit('http://localhost:8080/iframe/iframe-cookies.html');
    stub = cy.stub();
  });

  it('should not sent third party cookies request', () => {
    cy.on('window:alert', stub);

    cy.get(containerSelector).should('have.attr', 'skip-cookie-check').and('match', /true/);
    cy.get(containerSelector)
      .shadow()
      .get('iframe')
      .then(() => {
        cy.wrap(stub).should('not.have.been.calledWith', 'set-third-party-cookies-request');
        cy.getCookie('luigiCookie').should('not.exist');
      });
  });
});
