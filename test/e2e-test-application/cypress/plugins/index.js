const path = require('path');
const fs = require('fs-extra');
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  //console.log(config) // see what all is in here!
  let customConfigFile = getConfigurationFileByEnvName(
    `${config.env.configFile}.json`
  );
  return customConfigFile;
};

function getConfigurationFileByEnvName(envFile) {
  const fileLocation = path.resolve('cypress/config', envFile);
  return fs.readJson(fileLocation);
}
