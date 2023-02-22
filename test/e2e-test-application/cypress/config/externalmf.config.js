const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    fixturesFolder: "cypress/e2e/fixtures",
    specPattern: "cypress/e2e/test2",
    supportFile: "cypress/e2e/support/index.js",
    videosFolder: "cypress/e2e/videos",
    screenshotsFolder: "cypress/screenshots",
    chromeWebSecurity: true,
    viewportWidth: 1250,
    viewportHeight: 790,
    baseUrl: "http://localhost:4200/"
  }
});