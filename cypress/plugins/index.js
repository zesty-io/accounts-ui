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

const path = require('path')
const dotenv = require('dotenv')
const os = require('os')

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  if (os.userInfo().username === 'runner') {
    const ciEnvConfig = dotenv.config({
      path: path.join(__dirname, '../../', 'ci/.env')
    }).parsed

    // source the user credentials from the ci environment config
    config.env.validEmail = ciEnvConfig.TEST_USER_EMAIL
    config.env.validPassword = ciEnvConfig.TEST_USER_PASSWORD
    return config
  }
}
