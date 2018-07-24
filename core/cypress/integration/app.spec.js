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
    cy.get('li').should('have.length', 2);
  });

  it('Overview page', () => {
    cy.get('li')
      .first()
      .click();
    cy.get('li').should('have.length', 2);
  });

  it('Projects page', () => {
    cy.get('li')
      .first()
      .next()
      .click();
    cy.get('li').should('have.length', 4);
  });
});
