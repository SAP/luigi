const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalSourceRewriting: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
