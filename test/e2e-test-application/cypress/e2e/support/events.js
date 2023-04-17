Cypress.on('uncaught:exception', (err, runnable) => {
  // https://docs.cypress.io/api/events/catalog-of-events.html#To-turn-off-all-uncaught-exception-handling
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
