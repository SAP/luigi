const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    fixturesFolder: "cypress/e2e/fixtures",
    specPattern: "cypress/e2e/tests/0-js-test-app",
    supportFile: "cypress/e2e/support/index.js",
    videosFolder: "cypress/e2e/videos",
    screenshotsFolder: "cypress/screenshots",
    chromeWebSecurity: false,
    viewportWidth: 1250,
    viewportHeight: 790,
    baseUrl: "http://localhost:4500/"
  }
});