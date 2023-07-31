import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'czq7qc',
  e2e: {
    viewportWidth: 1250,
    viewportHeight: 790,
    chromeWebSecurity: false,
    baseUrl: 'http://localhost:8080/'
  }
});
