const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://dev-sellandparker.webo.dev",
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 7000,


    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
