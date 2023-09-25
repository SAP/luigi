const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    experimentalSourceRewriting: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
