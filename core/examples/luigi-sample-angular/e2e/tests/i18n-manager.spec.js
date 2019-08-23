describe('I18n', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('tets@email.com', 'tets');
  });

  it('custom translation test', () => {
    cy.get('.fd-shellbar')
      .contains('Projects')
      .click();

    //projects page
    cy.get('.fd-app__sidebar').should('contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Project Two');
    cy.get('.fd-app__sidebar')
      .contains('Project One')
      .click();

    //project one page
    cy.expectPathToBe('/projects/pr1');

    cy.window().then(win => {
      let config = win.Luigi.getConfig();
      const mySettings = {
        customTranslationImplementation: () => {
          return {
            getTranslation: (key, interpolations, locale) => {
              return (
                '*' +
                key +
                '* ' +
                (locale || win.Luigi.i18n().getCurrentLocale())
              );
            }
          };
        }
      };
      config.settings = mySettings;
      win.Luigi.configChanged();
    });
    cy.get('.fd-app__sidebar').should('contain', '*Developers* en');

    cy.get('.fd-shellbar')
      .contains('Projects')
      .click();
    cy.get('.fd-app__sidebar').should('contain', '*Project One* en');
  });
});
