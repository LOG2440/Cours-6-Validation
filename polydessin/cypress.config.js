import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/src",
    setupNodeEvents(on, config) { },
    supportFile: "cypress/support/e2e.js"
  },
  defaultCommandTimeout: 1000,
  video: false,
  viewportHeight: 1000,
  viewportWidth: 1600,
  projectId: 'ae1v3',
});
