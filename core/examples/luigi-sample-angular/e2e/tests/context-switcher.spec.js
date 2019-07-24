describe('Context switcher', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('tets@email.com', 'tets');
  });

  it('Clicking around the context switcher', () => {
    cy.selectContextSwitcherItem('New Environment (top)');

    cy.expectPathToBe('/create-environment');

    cy.selectContextSwitcherItem('Environment 1');

    cy.expectPathToBe('/environments/env1');

    // check label
    cy.get('.fd-product-menu .fd-popover__control button').should(
      'contain',
      'Environment 1'
    );
  });

  it('Add and remove project with context switcher', () => {
    cy.goToProjectsPage();

    cy.get('.fd-app__sidebar').should('contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Project Two');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project 3');

    cy.goToOverviewPage();
    cy.expectPathToBe('/overview');

    cy.get('[data-cy=luigi-alert]').should('not.exist');

    // add project

    cy.selectContextSwitcherItem('New Project');

    cy.expectPathToBe('/projects');

    cy.get('.fd-app__sidebar').should('contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Project Two');
    cy.get('.fd-app__sidebar').should('contain', 'Project 3');

    cy.get('[data-cy=luigi-alert]').should(
      'have.class',
      'fd-alert--information'
    );

    cy.get('[data-cy=luigi-alert]').should('contain', 'Project 3 created.');

    cy.goToOverviewPage();
    cy.expectPathToBe('/overview');

    // remove project

    cy.selectContextSwitcherItem('Remove Project');

    cy.expectPathToBe('/projects');

    cy.get('.fd-app__sidebar').should('contain', 'Project One');
    cy.get('.fd-app__sidebar').should('contain', 'Project Two');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project 3');

    // remove all projects

    cy.selectContextSwitcherItem('Remove Project');

    cy.expectPathToBe('/projects');

    cy.selectContextSwitcherItem('Remove Project');

    cy.expectPathToBe('/projects');

    cy.get('.fd-app__sidebar').should('not.contain', 'Project One');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project Two');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project 3');

    cy.get('.fd-product-menu .fd-popover__body').should(
      'not.contain',
      'Remove Project'
    );

    // add projects again

    cy.selectContextSwitcherItem('New Project');

    cy.expectPathToBe('/projects');

    cy.get('.fd-app__sidebar').should('contain', 'Project 1');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project 2');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project 3');

    cy.get('.fd-product-menu .fd-popover__body').should(
      'contain',
      'Remove Project'
    );

    cy.selectContextSwitcherItem('New Project');

    cy.expectPathToBe('/projects');

    cy.get('.fd-app__sidebar').should('contain', 'Project 1');
    cy.get('.fd-app__sidebar').should('contain', 'Project 2');
    cy.get('.fd-app__sidebar').should('not.contain', 'Project 3');

    cy.get('.fd-product-menu .fd-popover__body').should(
      'contain',
      'Remove Project'
    );

    cy.expectPathToBe('/projects');
  });
});
