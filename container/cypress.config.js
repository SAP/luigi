const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'czq7qc',
  includeShadowDom: true,
  e2e: {
    viewportWidth: 1250,
    viewportHeight: 790,
    chromeWebSecurity: false,
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)

      return config
    }
  }
});
