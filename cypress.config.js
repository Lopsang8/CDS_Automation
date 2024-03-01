const { defineConfig } = require("cypress");

module.exports = defineConfig({

  // hosts: {
  //   'auth.corp.com': '127.0.0.1',
  // },
  fixturesFolder: false,

  e2e: 
  {
    baseUrl: "https://dev-sellandparker.webo.dev/",
    // baseUrl: "https://stg-cds.webo.dev/",
    // experimentalStudio: true,
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 7000,
    experimentalModifyObstructiveThirdPartyCode: true,
    chromeWebSecurity: true,

    setupNodeEvents(on, config) {

      // implement node event listeners here
    },
  },
});
