const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://dev-sellandparker.webo.dev/",
    defaultCommandTimeout: 7000,


    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
