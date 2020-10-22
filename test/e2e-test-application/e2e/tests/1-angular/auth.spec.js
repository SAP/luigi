describe('Authorization', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad: () => cy.clearLocalStorage()
    });
  });

  describe('Auth logout', () => {
    it('Should logout dynamically', () => {
      cy.login('tets@gmail.com', 'tets');

      //logout dynamically
      cy.window().then(win => {
        win.Luigi.auth().logout();
      });

      //confirm redirect to logout page
      cy.expectPathToBe('/logout.html');

      //try to visit site, to verify that user was really logged out
      cy.visit('/');
      cy.expectPathToBe('/assets/auth-mock/login-mock.html');
    });
  });
});
