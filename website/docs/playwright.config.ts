import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run build && npm run core',
    timeout: 120 * 1000,
    url: 'http://localhost:4000'
  },
  use: {
    baseURL: 'http://localhost:4000'
  },
  testDir: 'tests'
});
