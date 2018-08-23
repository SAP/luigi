import App from '../../src/App.html';
import mount from 'cypress-svelte-unit-test';
import LuigiConfig from '../fixtures/sample-navigation-config';
describe('Svelte', () => {
  beforeEach(() => {
    mount(App);
  });

  it('Main page', () => {
    cy.contains('LUIGI');
    cy.contains('Overview');
    cy.contains('Projects');
    cy.get('button').should('have.length', 2);
    cy.get('li').should('have.length', 0);
  });

  it('Overview page', () => {
    cy.contains('LUIGI');
    cy.contains('Overview');
    cy.contains('Projects');
    cy.get('button')
      .first()
      .click();
    cy.get('button').should('have.length', 2);
    cy.get('li').should('have.length', 0);
  });

  it('Projects page', () => {
    cy.contains('LUIGI');
    cy.contains('Overview');
    cy.contains('Projects');
    cy.get('button')
      .first()
      .next()
      .click();
    cy.get('button').should('have.length', 2);
    cy.get('li').should('have.length', 2);
    cy.contains('Project One');
    cy.contains('Project Two');
  });

  it('Project one page', () => {
    cy.contains('LUIGI');
    cy.contains('Overview');
    cy.contains('Projects');
    cy.contains('Project One');
    cy.contains('Project Two');
    cy.get('li')
      .first()
      .find('a')
      .click();
    cy.get('button').should('have.length', 2);
    cy.get('li').should('have.length', 7);
  });
});
