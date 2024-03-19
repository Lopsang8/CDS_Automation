const { defineConfig } = require("cypress");

module.exports = defineConfig({
  fixturesFolder: false,
  env: {
    FOO: 'bar',
  },

  e2e: 
  {
    baseUrl: "https://dev-sellandparker.webo.dev/",
    // baseUrl: "https://stg-cds.webo.dev/",
    viewportHeight: 1080,
    viewportWidth: 1920,
    defaultCommandTimeout: 7000,
    experimentalModifyObstructiveThirdPartyCode: true,
    chromeWebSecurity: true,

    setupNodeEvents(on, config) {

      // implement node event listeners here
    },
  },
});
