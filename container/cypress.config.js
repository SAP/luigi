const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'czq7qc',
  includeShadowDom: true,
  e2e: {
    viewportWidth: 1250,
    viewportHeight: 790,
    chromeWebSecurity: false,
    supportFile: false
  }
});
